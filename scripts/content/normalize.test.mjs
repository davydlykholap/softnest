import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { normalizeContent } from "./normalize.mjs";

const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const seed = () =>
  ["site-seed", "article-seed"].flatMap((name) =>
    JSON.parse(fs.readFileSync(`content/migration/${name}.json`, "utf8")),
  );

test("FAQ service links work in both regular and expanded city content", () => {
  const documents = seed();
  const service = documents.find((item) => item._type === "service" && item.slug.current === "sofa-cleaning");
  const regular = documents.find((item) => item._type === "location" && !item.expandedContent);
  const expanded = documents.find((item) => item._type === "location" && item.expandedContent);
  regular.faq[0].relatedService = { _type: "reference", _ref: service._id };
  expanded.expandedContent.mississaugaFaqs[0].relatedService = { _type: "reference", _ref: service._id };
  const content = normalizeContent(documents, config);
  for (const source of [regular, expanded]) {
    const location = content.locations.find((item) => item.id === source._id);
    const item = (location.expandedContent?.mississaugaFaqs ?? location.faq)[0];
    assert.equal(item.link.href, "/services/sofa-cleaning/");
    assert.equal(item.answer, (source.expandedContent?.mississaugaFaqs ?? source.faq)[0].answer);
  }
});

test("FAQ links cannot point to a missing or unpublished service", () => {
  const documents = seed();
  const location = documents.find((item) => item._type === "location" && !item.expandedContent);
  location.faq[0].relatedService = { _type: "reference", _ref: "missing-service" };
  assert.throws(() => normalizeContent(documents, config), /Broken FAQ service reference/);
  const service = documents.find((item) => item._type === "service");
  service.pageEnabled = false;
  location.faq[0].relatedService._ref = service._id;
  const content = normalizeContent(documents, config);
  assert.equal(content.locations.find((item) => item.id === location._id).faq[0].link, undefined);
});


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

test("complete migration preserves catalogs and all published articles", () => {
  const content = normalizeContent(seed(), config);
  assert.equal(content.services.length, 10);
  assert.equal(content.locations.length, 9);
  assert.equal(content.posts.length, 11);

  const first = content.posts.find(
    (post) => post.slug === "how-to-remove-stain-from-couch",
  );
  const second = content.posts.find(
    (post) => post.slug === "why-did-my-couch-stain-come-back-after-cleaning",
  );
  const third = content.posts.find(
    (post) => post.slug === "what-cleaning-solution-can-i-use-on-my-couch",
  );
  assert.equal(first.body.filter((block) => block._type === "image").length, 5);
  assert.equal(second.body.filter((block) => block._type === "image").length, 0);
  assert.equal(third.body.filter((block) => block._type === "image").length, 0);

  for (const post of content.posts) {
    assert(post.body.length > 0);
    const sourcePath = `content/articles/${post.slug}/article.txt`;
    if (!fs.existsSync(sourcePath)) continue;
    const archivedSource = fs
      .readFileSync(sourcePath, "utf8")
      .replace(/\s+/g, " ")
      .trim();
    const rendered = post.body
      .filter((block) => block._type === "block")
      .map((block) => block.children.map((child) => child.text).join(""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(rendered, archivedSource);
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
    .find(
      (document) =>
        document._type === "post" &&
        document.slug.current === "how-to-remove-stain-from-couch",
    )
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
  const home = documents.find((document) => document._id === "page-content-home");
  home.copy.push({ ...home.copy[0] });
  assert.throws(
    () => normalizeContent(documents, config),
    /Duplicate page-copy key: hero-1/,
  );
});

test("retired homepage copy is not part of the build contract", () => {
  const documents = seed();
  const home = documents.find((document) => document._id === "page-content-home");
  home.copy = home.copy.filter((entry) => entry.key !== "hero-2");
  assert.doesNotThrow(() => normalizeContent(documents, config));
});

test("retired service-template fields are optional", () => {
  const documents = seed();
  const service = documents.find((document) => document._type === "service");
  delete service.heroTitle;
  delete service.process;
  assert.doesNotThrow(() => normalizeContent(documents, config));
});

test("local page overrides do not depend on the retired expanded flag", () => {
  const documents = seed();
  const mississauga = documents.find(
    (document) => document._type === "location" && document.slug.current === "mississauga",
  );
  delete mississauga.expanded;
  const result = normalizeContent(documents, config);
  assert(result.locations.find((location) => location.slug === "mississauga").expandedContent);
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
