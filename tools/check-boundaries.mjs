import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
let failures = 0;
function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (
      [
        "node_modules",
        "dist",
        "out",
        ".next",
        ".sanity",
        "artifacts",
        "public",
      ].includes(entry.name)
    )
      continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      inspect(file);
      continue;
    }
    if (!/\.(?:mjs|jsx?|tsx?)$/.test(entry.name)) continue;
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(
      /(?:from\s*|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g,
    )) {
      if (!match[1].startsWith(".")) continue;
      const resolved = path
        .relative(root, path.resolve(path.dirname(file), match[1]))
        .split(path.sep);
      const owner = path.relative(root, file).split(path.sep);
      if (
        resolved[0] === "apps" &&
        resolved[2] === "src" &&
        (owner[0] !== "apps" || owner[1] !== resolved[1])
      ) {
        console.error(
          `${path.relative(root, file)} imports another app's src/: ${match[1]}`,
        );
        failures++;
      }
      if (owner[0] === "packages" && resolved[0] === "apps") {
        console.error(
          `${path.relative(root, file)}: packages cannot depend on app internals`,
        );
        failures++;
      }
    }
  }
}
inspect(path.join(root, "apps"));
inspect(path.join(root, "packages"));
if (failures) process.exitCode = 1;
else
  console.log(
    "Application source boundaries verified. Shared contracts are imported through packages.",
  );
