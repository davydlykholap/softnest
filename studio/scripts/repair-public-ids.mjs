import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { normalizeContent } from "../../scripts/content/normalize.mjs";

const root = path.resolve("..");
try {
  process.loadEnvFile(path.join(root, ".env.local"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

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

const desired = ["site-seed", "article-seed"].flatMap((name) =>
  JSON.parse(
    fs.readFileSync(path.join(root, `content/migration/${name}.json`), "utf8"),
  ),
);

function legacyId(id) {
  if (id === "siteSettings") return id;
  if (id.startsWith("service-")) return `service.${id.slice("service-".length)}`;
  if (id.startsWith("location-")) return `location.${id.slice("location-".length)}`;
  if (id.startsWith("faq-home-")) return `faq.home.${id.slice("faq-home-".length)}`;
  if (id.startsWith("testimonial-home-")) return `testimonial.home.${id.slice("testimonial-home-".length)}`;
  if (id.startsWith("cleaning-project-home-")) return `cleaningProject.home.${id.slice("cleaning-project-home-".length)}`;
  if (id.startsWith("quote-category-")) return `quoteCategory.${id.slice("quote-category-".length)}`;
  if (id.startsWith("page-content-")) return `pageContent.${id.slice("page-content-".length)}`;
  if (id.startsWith("post-")) return `post.${id.slice("post-".length)}`;
  if (id === "author-softnest") return "author.softnest";
  if (id === "category-fabric-care") return "category.fabric-care";
  throw new Error(`No legacy ID mapping for ${id}`);
}

const idMap = new Map(
  desired
    .filter((document) => document._id !== "siteSettings")
    .map((document) => [legacyId(document._id), document._id]),
);
const legacyIds = [...idMap.keys()];
const publicIds = desired.map((document) => document._id);
const allIds = [...new Set([...legacyIds, ...publicIds])];
const existing = await client.fetch("*[_id in $ids]", { ids: allIds });
const byId = new Map(existing.map((document) => [document._id, document]));

function rewriteReferences(value) {
  if (Array.isArray(value)) return value.map(rewriteReferences);
  if (!value || typeof value !== "object") return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (["_rev", "_createdAt", "_updatedAt", "_originalId"].includes(key)) continue;
    result[key] = rewriteReferences(item);
  }
  if (typeof result._ref === "string" && idMap.has(result._ref)) {
    result._ref = idMap.get(result._ref);
  }
  return result;
}

const finalDocuments = [];
const toCreate = [];
for (const desiredDocument of desired) {
  const publicExisting = byId.get(desiredDocument._id);
  if (publicExisting) {
    finalDocuments.push(publicExisting);
    continue;
  }

  const oldId = legacyId(desiredDocument._id);
  const legacy = byId.get(oldId);
  if (!legacy) {
    throw new Error(
      `Missing both the public and legacy document for ${desiredDocument._id}. Stop and review before changing data.`,
    );
  }

  const copy = rewriteReferences(legacy);
  copy._id = desiredDocument._id;
  toCreate.push(copy);
  finalDocuments.push(copy);
}

normalizeContent(finalDocuments, client.config());

const backupDir = path.join(root, "content/backups");
fs.mkdirSync(backupDir, { recursive: true });
const backup = path.join(
  backupDir,
  `sanity-before-public-id-repair-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
);
fs.writeFileSync(backup, `${JSON.stringify(existing, null, 2)}\n`);

if (toCreate.length) {
  let transaction = client.transaction();
  for (const document of toCreate) {
    transaction = transaction.createIfNotExists(document);
  }
  await transaction.commit();
}

// Verify exactly the same unauthenticated published-content path used by the static website.
const publicClient = createClient({
  ...config,
  apiVersion: "2026-09-01",
  useCdn: false,
  perspective: "published",
});
const publicDocuments = await publicClient.fetch(
  '*[_type in ["siteSettings","service","location","faq","testimonial","cleaningProject","quoteCategory","pageContent","post","author","category"]] | order(_id asc)',
);
try {
  normalizeContent(publicDocuments, publicClient.config());
} catch (error) {
  console.error(
    "Public-ID copies were created, but the anonymous website read still does not validate. The old records were NOT deleted.",
  );
  throw error;
}

const oldExisting = legacyIds.filter((id) => byId.has(id));
if (oldExisting.length) {
  // First repoint references inside legacy documents so no private record keeps
  // another private record alive through Sanity's strong-reference checks.
  let repoint = client.transaction();
  for (const id of oldExisting) {
    const legacy = rewriteReferences(byId.get(id));
    legacy._id = id;
    repoint = repoint.createOrReplace(legacy);
  }
  await repoint.commit();

  let cleanup = client.transaction();
  for (const id of oldExisting) cleanup = cleanup.delete(id);
  try {
    await cleanup.commit();
  } catch (error) {
    console.warn(
      `Public content is valid, but ${oldExisting.length} legacy private records could not be deleted automatically. The website can build; review the legacy copies in Studio before removing them.`,
    );
    throw error;
  }
}

console.log(
  `Public-ID repair complete. Created ${toCreate.length} public records, verified the anonymous website read, and removed ${oldExisting.length} legacy private records. Backup saved locally.`,
);
