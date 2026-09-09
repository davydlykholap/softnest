import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { normalizeContent } from "./normalize.mjs";

const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const seed = () =>
  ["site-seed", "article-seed"].flatMap((name) =>
    JSON.parse(fs.readFileSync(`content/migration/${name}.json`, "utf8")),
  );


test("migration IDs and references stay publicly readable", () => {
  const documents = seed();
  const dotted = [];
  const walk = (value, owner) => {
    if (Array.isArray(value)) return value.forEach((item) => walk(item, owner));
    if (!value || typeof value !== "object") return;
    if (typeof value._ref === "string" && value._ref.includes(".")) {
      dotted.push(`${owner} -> ${value._ref}`);
    }
    Object.values(value).forEach((item) => walk(item, owner));
  };
  for (const document of documents) {
    if (document._id.includes(".")) dotted.push(document._id);
    walk(document, document._id);
  }
  assert.deepEqual(dotted, []);
});

test("complete migration preserves catalogs and exactly two complete articles", () => {
  const content = normalizeContent(seed(), config);
  assert.equal(content.services.length, 10);
  assert.equal(content.locations.length, 9);
  assert.equal(content.posts.length, 2);

  const first = content.posts.find(
    (post) => post.slug === "how-to-remove-stain-from-couch",
  );
  const second = content.posts.find(
    (post) => post.slug === "why-did-my-couch-stain-come-back-after-cleaning",
  );
  assert.equal(first.body.filter((block) => block._type === "image").length, 5);
  assert.equal(second.body.filter((block) => block._type === "image").length, 0);

  for (const post of content.posts) {
    const source = fs
      .readFileSync(`content/articles/${post.slug}/article.txt`, "utf8")
      .replace(/\s+/g, " ")
      .trim();
    const rendered = post.body
      .filter((block) => block._type === "block")
      .flatMap((block) => block.children.map((child) => child.text))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(rendered, source);
  }
});

test("missing business settings fails instead of silently falling back", () =>
  assert.throws(
    () => normalizeContent(seed().filter((document) => document._id !== "siteSettings"), config),
    /settings are missing/,
  ));

test("duplicate article URLs fail the build", () => {
  const documents = seed();
  documents.push({
    ...documents.find((document) => document._type === "post"),
    _id: "post-duplicate",
  });
  assert.throws(() => normalizeContent(documents, config), /Duplicate slug/);
});

test("broken service relationships fail the build", () => {
  const documents = seed();
  documents
    .find((document) => document._type === "service")
    .relatedServices.push({ _ref: "service-missing" });
  assert.throws(
    () => normalizeContent(documents, config),
    /Broken relatedServices/,
  );
});

test("coverage can exist without publishing a page", () => {
  const documents = seed();
  const area = documents.find((document) => document._type === "location");
  area.pageEnabled = false;
  area.indexInSearch = false;
  area.showInFooter = false;
  const result = normalizeContent(documents, config);
  assert(result.settings.areasServed.includes(area.name));
  assert.equal(
    result.locations.find((location) => location.name === area.name).pageEnabled,
    false,
  );
});

test("unapproved results and reviews never appear in the public snapshot", () => {
  const documents = seed();
  documents.find((document) => document._type === "testimonial").publicationStatus =
    "withheld";
  documents.find(
    (document) => document._type === "cleaningProject",
  ).publicationStatus = "pending";
  const result = normalizeContent(documents, config);
  assert.equal(result.testimonials.length, 6);
  assert.equal(result.projects.length, 7);
});

test("an article image without alt text fails validation", () => {
  const documents = seed();
  delete documents
    .find((document) => document._type === "post" && document.order === 0)
    .body.find((block) => block._type === "image").alt;
  assert.throws(
    () => normalizeContent(documents, config),
    /alternative text/,
  );
});

test("template copy cannot lose a required key", () => {
  const documents = seed();
  const home = documents.find((document) => document._id === "page-content-home");
  home.copy = home.copy.filter((entry) => entry.key !== "hero-1");
  assert.throws(
    () => normalizeContent(documents, config),
    /Missing page-copy key: hero-1/,
  );
});

test("template copy cannot contain duplicate keys", () => {
  const documents = seed();
  const about = documents.find((document) => document._id === "page-content-about");
  about.copy.push({ ...about.copy[0] });
  assert.throws(
    () => normalizeContent(documents, config),
    /Duplicate page-copy key: page-1/,
  );
});

test("a location cannot be indexable without a published page", () => {
  const documents = seed();
  const area = documents.find((document) => document._type === "location");
  area.pageEnabled = false;
  area.indexInSearch = true;
  area.showInFooter = false;
  assert.throws(
    () => normalizeContent(documents, config),
    /Search indexing requires a published location page/,
  );
});

test("a not-served area cannot accidentally publish a landing page", () => {
  const documents = seed();
  const area = documents.find((document) => document._type === "location");
  area.status = "not-served";
  assert.throws(
    () => normalizeContent(documents, config),
    /not-served area cannot have a published page/,
  );
});
