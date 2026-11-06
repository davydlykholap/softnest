import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { join, resolve, dirname, sep } from "node:path";
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
// GitHub Pages cannot redirect an image with an HTTP Location header. Preserve
// previous image URLs as byte-identical copies only in the deployment output.
const imageAliases = JSON.parse(await readFile("src/lib/imageAliases.json", "utf8"));
let imageAliasCount = 0;
function exportedImage(url) {
  if (!url.startsWith("/") || url.startsWith("//")) throw new Error(`Invalid image alias: ${url}`);
  const file = resolve(exportRoot, url.slice(1));
  if (!file.startsWith(exportRoot + sep)) throw new Error(`Image alias escapes export: ${url}`);
  return file;
}
for (const [oldUrl, newUrl] of Object.entries(imageAliases)) {
  const source = exportedImage(newUrl);
  const target = exportedImage(oldUrl);
  const contents = await readFile(source);
  try {
    const existing = await readFile(target);
    if (!existing.equals(contents)) throw new Error(`Image alias conflicts with ${oldUrl}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, contents);
    imageAliasCount++;
  }
}
const commit = process.env.GITHUB_SHA ?? execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error("Invalid release commit");
const quoteHtml = await readFile(join(exportRoot, "quote", "index.html"));
await writeFile(join(exportRoot, "release.json"), JSON.stringify({
  commit,
  builtAt: new Date().toISOString(),
  quoteSha256: createHash("sha256").update(quoteHtml).digest("hex"),
}, null, 2) + "\n");
console.log(`Prepared ${aliases} static route fragment aliases.`);
console.log(`Preserved ${imageAliasCount} previous image URLs.`);
