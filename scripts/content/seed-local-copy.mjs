import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createClient } from "@sanity/client";
import { normalizeContent } from "./normalize.mjs";
import { websiteContentQuery } from "../../src/sanity/queries.ts";

try { process.loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw error; }
if (!process.env.SANITY_API_WRITE_TOKEN) throw new Error("A local Sanity write token is required.");
const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const client = createClient({ ...config, apiVersion: "2026-09-01", useCdn: false, token: process.env.SANITY_API_WRITE_TOKEN });
const readCopy = (file, name) => {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const context = { exports: {}, require: () => ({ cities: {}, services: {} }) };
  vm.runInNewContext(source, context);
  return JSON.parse(JSON.stringify(context.exports[name]));
};
const cities = readCopy("src/content/cityPages.ts", "reviewedCityPages");
const services = readCopy("src/content/cityServiceEditorial.ts", "reviewedCityServiceEditorial");
const existing = await client.fetch(websiteContentQuery);
const find = (type, slug) => {
  const record = existing.find((item) => item._type === type && item.slug?.current === slug);
  if (!record) throw new Error(`Missing ${type}: ${slug}`);
  return { _type: "reference", _ref: record._id };
};
const keyed = (items) => items.map((item, index) => ({ ...item, _key: `item-${index}` }));
const records = Object.entries(cities).map(([city, copy]) => ({
  _id: `local-city-copy-${city}`, _type: "localCityCopy", city: find("location", city),
  ...copy, services: keyed(copy.services), advantages: keyed(copy.advantages), faqs: keyed(copy.faqs),
}));
for (const [city, pages] of Object.entries(services)) {
  for (const [service, copy] of Object.entries(pages)) records.push({
    _id: `local-service-copy-${city}-${service}`, _type: "localServiceCopy",
    city: find("location", city), service: find("service", service), ...copy,
  });
}
const missing = records.filter((record) => !existing.some((item) => item._id === record._id));
normalizeContent([...existing, ...missing], config);
if (process.argv.includes("--dry-run")) {
  console.log(`Validated ${records.length} local-copy records; ${missing.length} would be created. Existing edits are preserved.`);
} else {
  const transaction = client.transaction();
  for (const record of missing) transaction.createIfNotExists(record);
  if (missing.length) await transaction.commit();
  console.log(`Created ${missing.length} local-copy records. Existing Studio edits were preserved.`);
}
