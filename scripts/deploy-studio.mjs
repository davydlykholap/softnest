import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repository = "davydlykholap/softnest-studio";
const domain = "studio.softnestcare.ca";
const description = "SoftNest Content Studio hosting";
const root = resolve("studio/dist");
if (readFileSync(join(root, "CNAME"), "utf8").trim() !== domain) throw new Error("Prepare the Studio build first.");
const credentials = execFileSync("git", ["credential", "fill"], {
  input: "protocol=https\nhost=github.com\n\n", encoding: "utf8",
  env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "Never" }, timeout: 15000, stdio: ["pipe", "pipe", "pipe"],
});
const token = credentials.split("\n").find((line) => line.startsWith("password="))?.slice(9);
if (!token) throw new Error("Sign in to GitHub with Git Credential Manager before deploying Studio.");
const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
const api = async (route, method = "GET", body) => {
  const response = await fetch(`https://api.github.com${route}`, { method, headers, signal: AbortSignal.timeout(30000), ...(body ? { body: JSON.stringify(body) } : {}) });
  const data = response.status === 204 ? {} : await response.json();
  return { response, data };
};
let current = await api(`/repos/${repository}`);
let created = false;
if (current.response.status === 404) {
  current = await api("/user/repos", "POST", { name: "softnest-studio", description, private: false, auto_init: false });
  created = true;
}
if (!current.response.ok || current.data.description !== description) throw new Error("Studio hosting repository is unavailable or belongs to another purpose.");

// Only the compiled public Studio is uploaded, never the website source or env files.
try { process.loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw error; }
const secrets = [token, process.env.SANITY_API_WRITE_TOKEN, process.env.SANITY_API_READ_TOKEN].filter(Boolean);
const inspect = (directory) => {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name);
    if (statSync(file).isDirectory()) inspect(file);
    else if (secrets.some((secret) => readFileSync(file).includes(Buffer.from(secret)))) throw new Error("Deployment stopped: a private credential was detected in the Studio build.");
  }
};
inspect(root);
const workspace = mkdtempSync(join(tmpdir(), "softnest-studio-deploy-"));
// Use the already-resolved credential for this process only. Do not open a
// second Credential Manager prompt or persist a token in Git configuration.
const gitEnv = { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "Never",
  GIT_CONFIG_COUNT: "2", GIT_CONFIG_KEY_0: "credential.helper", GIT_CONFIG_VALUE_0: "",
  GIT_CONFIG_KEY_1: "http.https://github.com/.extraheader",
  GIT_CONFIG_VALUE_1: `Authorization: Basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`,
};
const gitOptions = { encoding: "utf8", env: gitEnv, timeout: 120000, stdio: ["ignore", "pipe", "pipe"] };
const git = (args) => execFileSync("git", args, { ...gitOptions, cwd: workspace });
if (created) {
  git(["init", "-b", "main"]);
  git(["remote", "add", "origin", `https://github.com/${repository}.git`]);
} else {
  execFileSync("git", ["clone", "--depth", "1", `https://github.com/${repository}.git`, workspace], gitOptions);
}
for (const name of readdirSync(root)) cpSync(join(root, name), join(workspace, name), { recursive: true });
git(["add", "."]);
if (git(["status", "--porcelain"]).trim()) {
  git(["commit", "-m", "Publish SoftNest content studio"]);
  git(["push", "origin", "main"]);
}
const pages = await api(`/repos/${repository}/pages`);
if (pages.response.status === 404) {
  const enabled = await api(`/repos/${repository}/pages`, "POST", { source: { branch: "main", path: "/" } });
  if (!enabled.response.ok) throw new Error(`Could not enable Studio Pages (${enabled.response.status}).`);
}
if (pages.data.cname !== domain || pages.data.source?.branch !== "main" || pages.data.source?.path !== "/") {
  const configured = await api(`/repos/${repository}/pages`, "PUT", { cname: domain, source: { branch: "main", path: "/" } });
  if (!configured.response.ok) throw new Error(`Could not configure Studio hostname (${configured.response.status}).`);
}
console.log(`Studio build published to https://${domain}. Verify DNS and the HTTPS certificate before handing it over.`);
