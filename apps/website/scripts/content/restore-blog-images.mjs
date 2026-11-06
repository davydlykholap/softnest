import fs from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import sharp from "sharp";
import { createClient } from "@sanity/client";
import project from "@softnest/content/project.json" with { type: "json" };

try { process.loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw error; }
const apply = process.argv.includes("--apply");
const plan = JSON.parse(await fs.readFile("../../assets/images/blog/covers.json", "utf8"));
const client = createClient({...project, apiVersion: "2026-09-01", useCdn: false,
  perspective: "raw", token: process.env.SANITY_API_WRITE_TOKEN});
const documents = await client.fetch('*[_type == "post" && slug.current in $slugs]', {slugs: plan.map(item => item.slug)});
for (const item of plan) {
  if (!/^[a-z0-9-]+\.webp$/.test(item.file)) throw new Error(`Invalid filename: ${item.file}`);
  if (!documents.some(doc => !doc._id.startsWith("drafts.") && doc.slug.current === item.slug)) throw new Error(`Missing published article: ${item.slug}`);
  await fs.access(path.join("public/images/blog", item.file));
}
console.log(`${apply ? "Restoring" : "Would restore"} covers on ${plan.length} articles (${documents.length} published/draft documents). Article text and publication settings are preserved.`);
if (!apply) process.exit(0);
if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("SANITY_API_WRITE_TOKEN is required.");
const backupDirectory = `content/backups/blog-images-${new Date().toISOString().replaceAll(/[:.]/g, "-")}`;
await fs.mkdir(backupDirectory, {recursive: true});
await fs.writeFile(`${backupDirectory}/before.json`, JSON.stringify(documents, null, 2) + "\n");
const covers = new Map();
for (const item of plan) {
  const bytes = await fs.readFile(path.join("public/images/blog", item.file));
  const metadata = await sharp(bytes).metadata();
  const asset = await client.assets.upload("image", bytes, {filename: item.file, contentType: "image/webp"});
  covers.set(item.slug, {_type: "image", asset: {_type: "reference", _ref: asset._id}, width: metadata.width, height: metadata.height,
    alt: item.alt, caption: "Illustrative image; not a photograph of a SoftNest appointment."});
}
let transaction = client.transaction();
for (const doc of documents) transaction = transaction.patch(doc._id, patch => patch.ifRevisionId(doc._rev).set({coverImage: covers.get(doc.slug.current)}));
const result = await transaction.commit();
await fs.writeFile(`${backupDirectory}/result.json`, JSON.stringify({transactionId:result.transactionId,plan},null,2) + "\n");
const after = await client.fetch('*[_type == "post" && slug.current in $slugs]', {slugs: plan.map(item=>item.slug)});
for (const doc of after) {
  const previous = documents.find(item=>item._id===doc._id);
  const omit = ({_rev,_updatedAt,coverImage,...rest})=>{void _rev;void _updatedAt;void coverImage;return rest;};
  if (!isDeepStrictEqual(omit(previous), omit(doc))) throw new Error(`Concurrent article change detected: ${doc._id}; inspect backup.`);
  if (doc.coverImage.asset._ref !== covers.get(doc.slug.current).asset._ref) throw new Error(`Cover verification failed: ${doc._id}`);
}
console.log(`Restored and verified ${plan.length} covers. Backup: ${backupDirectory}`);
