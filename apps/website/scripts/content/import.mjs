import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const dryRun = process.argv.includes("--dry-run");
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const studioRoot = path.resolve(projectRoot, "../studio");
try {
  process.loadEnvFile(path.join(projectRoot, ".env.local"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const hasWriteToken = Boolean(process.env.SANITY_API_WRITE_TOKEN);
const studioRequire = createRequire(path.join(studioRoot, "package.json"));
const sanityBin = path.join(path.dirname(studioRequire.resolve("sanity/package.json")), "bin/sanity");
const args = hasWriteToken
  ? [path.join(studioRoot, "scripts", "import-content.mjs")]
  : [sanityBin, "exec", "scripts/import-content.mjs", "--with-user-token"];
const result = spawnSync(process.execPath, args, {
  cwd: studioRoot,
  stdio: "inherit",
  env: { ...process.env, ...(dryRun ? { CONTENT_IMPORT_DRY_RUN: "true" } : {}) },
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
