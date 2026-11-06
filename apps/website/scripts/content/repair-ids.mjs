import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const studioRoot = path.resolve(projectRoot, "../studio");
const studioRequire = createRequire(path.join(studioRoot, "package.json"));
const sanityBin = path.join(path.dirname(studioRequire.resolve("sanity/package.json")), "bin/sanity");

const result = spawnSync(
  process.execPath,
  [sanityBin, "exec", "scripts/repair-public-ids.mjs", "--with-user-token"],
  {
    cwd: studioRoot,
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
