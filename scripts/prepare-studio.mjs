import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve("studio/dist");
const entry = join(root, "index.html");
if (!existsSync(entry)) throw new Error("Build Studio before preparing its static export.");
let html = readFileSync(entry, "utf8");
if (!html.includes('name="robots"')) html = html.replace("</head>", '<meta name="robots" content="noindex, nofollow" /></head>');
writeFileSync(entry, html);
writeFileSync(join(root, "404.html"), html);
writeFileSync(join(root, ".nojekyll"), "");
writeFileSync(join(root, "CNAME"), "studio.softnestcare.ca\n");
writeFileSync(join(root, "robots.txt"), "User-agent: *\nDisallow: /\n");
console.log("Prepared Studio for studio.softnestcare.ca with SPA fallback and search exclusion.");
