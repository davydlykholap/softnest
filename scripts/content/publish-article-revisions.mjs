import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

try {
  process.loadEnvFile(".env.local");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const apply = process.argv.includes("--apply");
const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const client = createClient({
  ...config,
  projectId: process.env.SANITY_PROJECT_ID || config.projectId,
  dataset: process.env.SANITY_DATASET || config.dataset,
  apiVersion: "2026-09-01",
  useCdn: false,
  perspective: "raw",
  token: process.env.SANITY_API_WRITE_TOKEN,
});

if (!client.config().token) {
  throw new Error("SANITY_API_WRITE_TOKEN is required to publish article revisions.");
}

const revised = JSON.parse(
  fs.readFileSync("content/migration/article-seed.json", "utf8"),
).filter((document) => document._type === "post");
const ids = revised.map((document) => document._id);
const existing = await client.fetch(
  "*[_id in $ids || _id in $draftIds]",
  { ids, draftIds: ids.map((id) => `drafts.${id}`) },
);

function prepareBody(body, currentBody) {
  const currentImages = currentBody.filter((item) => item._type === "image");
  return body.map((item) => {
    if (item._type !== "image") return item;
    const current = currentImages.find(
      (candidate) => candidate.alt === item.alt && candidate.asset?._ref,
    );
    if (!current) {
      throw new Error(`Could not match the existing Sanity image: ${item.alt}`);
    }
    const portableImage = { ...item };
    delete portableImage.localPath;
    return { ...portableImage, asset: current.asset };
  });
}

const patches = [];
for (const revision of revised) {
  const targets = existing.filter(
    (document) => document._id.replace(/^drafts\./, "") === revision._id,
  );
  if (!targets.length) throw new Error(`Missing Sanity article: ${revision._id}`);
  for (const target of targets) {
    patches.push({
      id: target._id,
      set: {
        title: revision.title,
        seoTitle: revision.seoTitle,
        excerpt: revision.excerpt,
        seoDescription: revision.seoDescription,
        body: prepareBody(revision.body, target.body || []),
      },
    });
  }
}

if (!apply) {
  console.log(
    `Revision check passed. ${patches.length} Sanity article record(s) would be updated. No data was changed.`,
  );
  process.exit(0);
}

const backupDir = "content/backups";
fs.mkdirSync(backupDir, { recursive: true });
const backupPath = path.join(
  backupDir,
  `sanity-before-article-rewrite-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
);
fs.writeFileSync(backupPath, `${JSON.stringify(existing, null, 2)}\n`);

let transaction = client.transaction();
for (const patch of patches) transaction = transaction.patch(patch.id, patch);
await transaction.commit();
console.log(
  `Published ${patches.length} revised Sanity article record(s). Backup: ${backupPath}`,
);
