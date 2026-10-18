import fs from "node:fs";
import { createClient } from "@sanity/client";

try { process.loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw error; }
const project = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const sanityToken = process.env.SANITY_WEBHOOK_MANAGEMENT_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const githubToken = process.env.GITHUB_WORKFLOW_TOKEN;
if (!sanityToken || !githubToken) {
  throw new Error("Provide SANITY_WEBHOOK_MANAGEMENT_TOKEN with webhook-management permission and GITHUB_WORKFLOW_TOKEN with Actions: write on davydlykholap/softnest. Do not commit these secrets.");
}
const client = createClient({ ...project, apiVersion: "2026-09-01", useCdn: false, token: sanityToken });
const path = `/hooks/projects/${project.projectId}`;
const name = "SoftNest — publish Sanity changes to GitHub Pages";
const existing = (await client.request({ url: path })).find((item) => item.name === name);
const body = {
  name, type: "document",
  description: "Build the public SoftNest website after published content changes. Drafts excluded.",
  url: "https://api.github.com/repos/davydlykholap/softnest/actions/workflows/deploy-pages.yml/dispatches",
  dataset: project.dataset,
  apiVersion: "v2026-09-01",
  httpMethod: "POST",
  isDisabledByUser: false,
  includeDrafts: false,
  includeAllVersions: false,
  rule: {
    on: ["create", "update", "delete"],
    filter: '!(_id in path("drafts.**")) && !(_id in path("versions.**")) && _type in ["siteSettings","service","location","localCityCopy","localServiceCopy","faq","testimonial","cleaningProject","quoteCategory","pageContent","post","author","category"]',
    projection: '{"ref":"main"}',
  },
  headers: {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
};
await client.request({
  url: existing ? `${path}/${existing.id}` : path,
  method: existing ? "PATCH" : "POST",
  body,
});
console.log("Sanity-to-GitHub automatic publishing webhook configured. Check webhook attempt logs and GitHub Actions to verify delivery.");
