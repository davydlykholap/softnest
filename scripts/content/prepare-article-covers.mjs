import fs from "node:fs";
import assert from "node:assert/strict";
import sharp from "sharp";
import { createClient } from "@sanity/client";

process.loadEnvFile(".env.local");
const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const client = createClient({ ...config, apiVersion: "2026-09-01", useCdn: false, token: process.env.SANITY_API_WRITE_TOKEN });
const sources = JSON.parse(fs.readFileSync("artifacts/article-image-sources.json", "utf8"));
assert.equal(sources.length, 18);
const prompts = [];
for (const source of sources) {
  assert(source.path && fs.existsSync(source.path), `Missing generated image: ${source.slug}`);
  const directory = `content/articles/${source.slug}`;
  fs.mkdirSync(directory, { recursive: true });
  const file = `${directory}/editorial-cover.webp`;
  if (!fs.existsSync(file)) await sharp(source.path).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(file);
  const metadata = await sharp(file).metadata();
  assert.equal(metadata.width, 1536); assert.equal(metadata.height, 1024);
  const assetPath = `${directory}/cover-asset.json`;
  if (!fs.existsSync(assetPath)) {
    const asset = await client.assets.upload("image", fs.createReadStream(file), { filename: `${source.slug}-editorial.webp`, contentType: "image/webp" });
    fs.writeFileSync(assetPath, JSON.stringify({ _type: "reference", _ref: asset._id }, null, 2) + "\n");
  }
  const { path, ...brief } = source; void path;
  prompts.push({ ...brief, file, generationMode: "built-in image_gen", disclosure: "AI-generated editorial illustration; not a photograph of a SoftNest appointment." });
  console.log(`Prepared and uploaded ${source.slug}`);
}
fs.mkdirSync("content/editorial/2026-10-24", { recursive: true });
fs.writeFileSync("content/editorial/2026-10-24/image-prompts.json", JSON.stringify(prompts, null, 2) + "\n");
