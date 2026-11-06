import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const name = process.argv[2];
const apps = JSON.parse(
  readFileSync(path.join(root, "infra/hosting/apps.json"), "utf8"),
);
if (!["studio", "sf0"].includes(name))
  throw Error(
    "Use deploy-pages.mjs studio or sf0. Website deployment stays in deploy-pages.yml.",
  );
const app = apps[name];
if (name === 'sf0') throw Error('SF0 now requires its authentication server. Static GitHub Pages publishing cannot protect it. Keep SF0 local until a protected production runtime is chosen.');
const output = path.resolve(root, app.output);
if (!output.startsWith(root) || !existsSync(path.join(output, "index.html")))
  throw Error(`Build ${name} before deploying.`);
if (readFileSync(path.join(output, "CNAME"), "utf8").trim() !== app.domain)
  throw Error("Build hostname does not match the deployment inventory.");

// The existing saved credential or CI token is used for this process only.
let token = process.env.GITHUB_TOKEN;
if (!token) {
  const credential = execFileSync("git", ["credential", "fill"], {
    input: "protocol=https\nhost=github.com\n\n",
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "Never" },
    timeout: 15000,
    stdio: ["pipe", "pipe", "pipe"],
  });
  token = credential
    .split("\n")
    .find((line) => line.startsWith("password="))
    ?.slice(9)
    .trim();
}
if (!token)
  throw Error(
    "Use the saved GitHub sign-in or supply a scoped GITHUB_TOKEN for the deployment repository.",
  );
try {
  process.loadEnvFile(path.join(root, "apps/website/.env.local"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const secrets = [
  token,
  ...Object.entries(process.env)
    .filter(([key]) => /SANITY.*TOKEN|GITHUB.*TOKEN/.test(key))
    .map(([, value]) => value),
].filter(Boolean);
function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = path.join(directory, name);
    if (statSync(file).isDirectory()) inspect(file);
    else {
      if (/^\.env/.test(name))
        throw Error("Environment files must never be published.");
      const bytes = readFileSync(file);
      if (secrets.some((secret) => bytes.includes(Buffer.from(secret))))
        throw Error("A private credential was detected in the static build.");
    }
  }
}
inspect(output);
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
async function api(route, method = "GET", body) {
  const response = await fetch(`https://api.github.com${route}`, {
    method,
    headers,
    signal: AbortSignal.timeout(30000),
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = response.status === 204 ? {} : await response.json();
  return { response, data };
}
let repo = await api(`/repos/${app.repository}`);
const created = repo.response.status === 404;
if (created)
  repo = await api("/user/repos", "POST", {
    name: app.repository.split("/")[1],
    description: app.description,
    private: false,
    auto_init: false,
  });
if (!repo.response.ok || repo.data.description !== app.description)
  throw Error(
    `Deployment repository is unavailable or has another purpose (${repo.response.status}).`,
  );
const temporary = mkdtempSync(path.join(tmpdir(), `softnest-${name}-deploy-`));
const gitEnv = {
  ...process.env,
  GIT_TERMINAL_PROMPT: "0",
  GCM_INTERACTIVE: "Never",
  GIT_CONFIG_COUNT: "2",
  GIT_CONFIG_KEY_0: "credential.helper",
  GIT_CONFIG_VALUE_0: "",
  GIT_CONFIG_KEY_1: "http.https://github.com/.extraheader",
  GIT_CONFIG_VALUE_1: `Authorization: Basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`,
};
const options = {
  encoding: "utf8",
  env: gitEnv,
  timeout: 120000,
  stdio: ["ignore", "pipe", "pipe"],
};
const git = (args) => {
  try {
    return execFileSync("git", args, { ...options, cwd: temporary });
  } catch {
    throw Error(
      `GitHub Pages ${name} publishing failed during git ${args[0]}. No credential was written to repository config.`,
    );
  }
};
if (created) {
  git(["init", "-b", "main"]);
  git(["remote", "add", "origin", `https://github.com/${app.repository}.git`]);
} else {
  try {
    execFileSync(
      "git",
      [
        "clone",
        "--depth",
        "1",
        `https://github.com/${app.repository}.git`,
        temporary,
      ],
      options,
    );
  } catch {
    throw Error("Could not clone the compiled deployment repository.");
  }
}
// Publish an exact current build. Git keeps previous deployments recoverable.
// Removing previously tracked output is scoped to this temporary clone only.
const resolvedTemporary = path.resolve(temporary);
if (!resolvedTemporary.startsWith(path.resolve(tmpdir()) + path.sep))
  throw Error("Temporary clone is outside the intended directory.");
if (!created && git(["ls-files"]).trim())
  git(["rm", "-r", "--ignore-unmatch", "."]);
for (const file of readdirSync(output))
  cpSync(path.join(output, file), path.join(temporary, file), {
    recursive: true,
  });
writeFileSync(path.join(temporary, ".nojekyll"), "");
git(["add", "."]);
if (git(["status", "--porcelain"]).trim()) {
  git(["commit", "-m", `Publish SoftNest ${name}`]);
  git(["push", "origin", "main"]);
}
const pages = await api(`/repos/${app.repository}/pages`);
if (pages.response.status === 404) {
  const result = await api(`/repos/${app.repository}/pages`, "POST", {
    source: { branch: "main", path: "/" },
  });
  if (!result.response.ok)
    throw Error(`Could not enable Pages (${result.response.status}).`);
} else if (!pages.response.ok)
  throw Error(`Could not read Pages configuration (${pages.response.status}).`);
if (
  pages.data.cname !== app.domain ||
  pages.data.source?.branch !== "main" ||
  pages.data.source?.path !== "/"
) {
  const result = await api(`/repos/${app.repository}/pages`, "PUT", {
    cname: app.domain,
    source: { branch: "main", path: "/" },
  });
  if (!result.response.ok)
    throw Error(
      `Could not configure the Pages hostname (${result.response.status}).`,
    );
}
const latest = await api(`/repos/${app.repository}/pages`);
if (
  latest.data.https_certificate?.state === "approved" &&
  !latest.data.https_enforced
)
  await api(`/repos/${app.repository}/pages`, "PUT", { https_enforced: true });
console.log(
  `Published compiled ${name} to ${app.repository}. Verify https://${app.domain}/ after Pages and HTTPS provisioning finish.`,
);
