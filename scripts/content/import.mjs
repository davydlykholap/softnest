import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dryRun = process.argv.includes("--dry-run");
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const studioRoot = path.join(projectRoot, "studio");
const sanityBin = path.join(studioRoot, "node_modules", "sanity", "bin", "sanity");

const result = spawnSync(
  process.execPath,
  [sanityBin, "exec", "scripts/import-content.mjs", "--with-user-token"],
  {
    cwd: studioRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      ...(dryRun ? { CONTENT_IMPORT_DRY_RUN: "true" } : {}),
    },
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
