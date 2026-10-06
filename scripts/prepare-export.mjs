import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const exportRoot = resolve("out");
let aliases = 0;

async function walk(directory, relativeParts = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const nextParts = [...relativeParts, entry.name];
    const source = join(exportRoot, ...nextParts);
    if (entry.isDirectory()) {
      await walk(source, nextParts);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;

    const fragmentIndex = relativeParts.findIndex((part) => part.startsWith("__next."));
    if (fragmentIndex < 0) continue;

    // On Windows, Next's export can store RSC fragments in directories while
    // the client requests dotted filenames. Add aliases for static previews.
    const routeParts = relativeParts.slice(0, fragmentIndex);
    const flattenedName = [...relativeParts.slice(fragmentIndex), entry.name].join(".");
    const target = join(exportRoot, ...routeParts, flattenedName);
    const contents = await readFile(source);
    try {
      const existing = await readFile(target);
      if (!existing.equals(contents)) {
        throw new Error(`Static route fragment alias conflicts with ${target}`);
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await writeFile(target, contents);
      aliases += 1;
    }
  }
}

await walk(exportRoot);
const commit = process.env.GITHUB_SHA ?? execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error("Invalid release commit");
const quoteHtml = await readFile(join(exportRoot, "quote", "index.html"));
await writeFile(join(exportRoot, "release.json"), JSON.stringify({
  commit,
  builtAt: new Date().toISOString(),
  quoteSha256: createHash("sha256").update(quoteHtml).digest("hex"),
}, null, 2) + "\n");
console.log(`Prepared ${aliases} static route fragment aliases.`);
