import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { normalizeContent } from "../../scripts/content/normalize.mjs";

async function main() {

  const root = path.resolve("..");
  try {
    process.loadEnvFile(path.join(root, ".env.local"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const dryRun = process.env.CONTENT_IMPORT_DRY_RUN === "true";
  const config = JSON.parse(
    fs.readFileSync(path.join(root, "sanity.project.json"), "utf8"),
  );
  config.projectId =
    process.env.SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    config.projectId;
  config.dataset =
    process.env.SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    config.dataset;
  const client = process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        ...config,
        apiVersion: "2026-09-01",
        useCdn: false,
        perspective: "raw",
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : getCliClient({ apiVersion: "2026-09-01" }).withConfig({
        projectId: config.projectId,
        dataset: config.dataset,
        useCdn: false,
        perspective: "raw",
      });

  const seed = ["site-seed", "article-seed"].flatMap((name) =>
    JSON.parse(
      fs.readFileSync(path.join(root, `content/migration/${name}.json`), "utf8"),
    ),
  );
  const ensurePublicIds = (value, owner) => {
    if (Array.isArray(value)) {
      for (const item of value) ensurePublicIds(item, owner);
      return;
    }
    if (!value || typeof value !== "object") return;
    if (typeof value._ref === "string" && value._ref.includes(".")) {
      throw new Error(
        `Migration reference ${owner} -> ${value._ref} uses a dotted/private Sanity ID.`,
      );
    }
    for (const item of Object.values(value)) ensurePublicIds(item, owner);
  };
  for (const document of seed) {
    if (document._id.includes(".")) {
      throw new Error(
        `Migration document ${document._id} uses a dotted/private Sanity ID. Public website content must use a root ID such as service-sofa-cleaning.`,
      );
    }
    ensurePublicIds(document, document._id);
  }

  const types = [...new Set(seed.map((document) => document._type))];
  const existing = await client.fetch("*[_type in $types]", { types });
  const existingIds = new Set(existing.map((document) => document._id));

  for (const document of seed) {
    const documentSlug = document.slug?.current;
    const conflict = existing.find(
      (candidate) =>
        candidate._type === document._type &&
        candidate.slug?.current === documentSlug &&
        documentSlug &&
        candidate._id.replace(/^drafts\./, "") !== document._id,
    );
    if (conflict) {
      throw new Error(
        `Existing content uses ${documentSlug} under a different ID. Reconcile before importing.`,
      );
    }
    if (
      existingIds.has(`drafts.${document._id}`) &&
      !existingIds.has(document._id)
    ) {
      throw new Error(
        `An existing draft needs review before migration: ${document._id}`,
      );
    }
  }

  const publishedExisting = existing.filter(
    (document) => !document._id.startsWith("drafts."),
  );
  const missing = seed.filter((document) => !existingIds.has(document._id));

  // Validate the exact published snapshot that would exist after creating missing records.
  normalizeContent(
    [
      ...publishedExisting,
      ...seed.filter((document) => !existingIds.has(document._id)),
    ],
    client.config(),
  );

  for (const document of missing) {
    const localImages = [];
    const walk = (value) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (!value || typeof value !== "object") return;
      if (value._type === "image" && value.localPath && !value.asset) {
        const file = path.resolve(root, "public", value.localPath.replace(/^\//, ""));
        if (!file.startsWith(path.join(root, "public") + path.sep)) {
          throw new Error(`Image path outside public folder: ${value.localPath}`);
        }
        if (!fs.existsSync(file)) throw new Error(`Missing migration image: ${file}`);
        localImages.push(file);
      }
      Object.values(value).forEach(walk);
    };
    walk(document);
    document.__localImageCount = localImages.length;
  }

  if (dryRun) {
    const imageCount = missing.reduce(
      (total, document) => total + (document.__localImageCount || 0),
      0,
    );
    console.log(
      `Import check passed. ${missing.length} records would be created, ${seed.length - missing.length} existing records would be preserved, and ${imageCount} local images would be uploaded. No data was changed.`,
    );
    return;
  }

  for (const document of missing) delete document.__localImageCount;

  const backupDir = path.join(root, "content/backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const backup = path.join(
    backupDir,
    `sanity-before-import-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
  );
  fs.writeFileSync(backup, `${JSON.stringify(existing, null, 2)}\n`);

  const uploaded = new Map();
  async function prepare(value, key = "root") {
    if (Array.isArray(value)) {
      return Promise.all(
        value.map((item, index) =>
          prepare(
            typeof item === "object" && item
              ? { _type: "object", ...item, _key: item._key || `${key}-${index}` }
              : item,
            `${key}-${index}`,
          ),
        ),
      );
    }
    if (!value || typeof value !== "object") return value;

    const result = { ...value };
    if (result._type === "image" && result.localPath && !result.asset) {
      const file = path.resolve(root, "public", result.localPath.replace(/^\//, ""));
      if (!file.startsWith(path.join(root, "public") + path.sep)) {
        throw new Error("Image path outside public folder");
      }
      if (!uploaded.has(file)) {
        uploaded.set(
          file,
          await client.assets.upload("image", fs.createReadStream(file), {
            filename: path.basename(file),
          }),
        );
      }
      result.asset = { _type: "reference", _ref: uploaded.get(file)._id };
      delete result.localPath;
    }

    for (const [name, item] of Object.entries(result)) {
      result[name] = await prepare(item, name);
    }
    return result;
  }

  const prepared = [];
  for (const document of missing) prepared.push(await prepare(document));

  if (prepared.length) {
    let transaction = client.transaction();
    for (const document of prepared) transaction = transaction.createIfNotExists(document);
    await transaction.commit();
  }

  console.log(
    `Imported ${prepared.length} published records; preserved ${seed.length - prepared.length} existing records. Uploaded ${uploaded.size} images. Backup saved locally.`,
  );
}

await main();
