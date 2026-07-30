import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const exportRoot = resolve("out");

if (!existsSync(exportRoot)) {
  throw new Error("Static export is missing. Run `npm run build` first.");
}

const walk = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const htmlFiles = walk(exportRoot).filter((path) => path.endsWith("index.html"));
const references = new Set();
const failures = [];

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");

  if (html.includes("Loading questions...")) {
    failures.push(`${htmlFile} still contains the FAQ loading placeholder.`);
  }

  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
    references.add(match[1]);
  }
}

for (const reference of references) {
  const relative = reference.slice(1);
  const target =
    reference === "/"
      ? join(exportRoot, "index.html")
      : reference.endsWith("/")
        ? join(exportRoot, relative, "index.html")
        : join(exportRoot, relative);

  if (!existsSync(target)) {
    failures.push(`Missing exported target for ${reference}: ${target}`);
  }
}

const obsoleteExportPaths = [
  "js",
  "svg",
  join("img", "business_cards"),
  join("img", "locations", "source"),
];

for (const relative of obsoleteExportPaths) {
  const target = join(exportRoot, relative);
  if (existsSync(target)) {
    failures.push(`Obsolete public asset was copied into the export: ${target}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${htmlFiles.length} HTML pages and ${references.size} internal references.`,
  );
}
