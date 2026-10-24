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
  assert.equal(content.posts.length, 13);
  assert.deepEqual(
    content.posts.find((post) => post.slug === "what-to-expect-when-softnest-cleans-your-sofa").categories,
    ["Our Process"],
  );

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
  assert.equal(result.projects.length, 0);
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

const localServiceFixture = (documents) => ({
  _id: "local-service-test", _type: "localServiceCopy",
  city: { _ref: documents.find((item) => item._type === "location")._id },
  service: { _ref: documents.find((item) => item._type === "service")._id },
  introduction: "An edited opening.", bookingNote: "Details to include.", visit: "Planning the appointment.",
  question: { question: "A practical question?", answer: "An edited answer." },
});

test("published local wording is included in the website content snapshot", () => {
  const documents = seed();
  const copy = localServiceFixture(documents);
  const city = documents.find((item) => item._id === copy.city._ref).slug.current;
  const service = documents.find((item) => item._id === copy.service._ref).slug.current;
  const snapshot = normalizeContent([...documents, copy], config);
  assert.equal(snapshot.localCopy.services[city][service].introduction, copy.introduction);
  assert.deepEqual(snapshot.localCopy.services[city][service].question, copy.question);
});

test("broken, incomplete and duplicate local wording cannot replace a working build", () => {
  const documents = seed();
  const copy = localServiceFixture(documents);
  assert.throws(() => normalizeContent([...documents, { ...copy, city: { _ref: "missing" } }], config), /invalid local service copy reference/);
  assert.throws(() => normalizeContent([...documents, { ...copy, visit: "" }], config), /Missing visit/);
  assert.throws(() => normalizeContent([...documents, { ...copy, question: undefined }], config), /Missing practical question/);
  assert.throws(() => normalizeContent([...documents, copy, { ...copy, _id: "duplicate-local-copy" }], config), /Duplicate city service copy/);
});

test("AI illustrations never become documented work and real jobs require verified cities", () => {
  const documents = seed();
  const item = documents.find((document) => document._type === "cleaningProject");
  const city = documents.find((document) => document._type === "location" && document.slug.current === "oakville");
  item.publicationStatus = "approved";
  item.sourceType = "ai-generated";
  assert.equal(normalizeContent(documents, config).projects.length, 0);
  item.sourceType = "camera-original";
  item.location = "Oakville, ON";
  item.locations = [{ _type: "reference", _ref: city._id }];
  assert.equal(normalizeContent(documents, config).projects.length, 1);
  item.locations = [];
  assert.throws(() => normalizeContent(documents, config), /appointment city/);
  item.locations = [{ _type: "reference", _ref: city._id }];
  item.sourceType = "reconstructed-before";
  delete item.imageNote;
  assert.throws(() => normalizeContent(documents, config), /photo context/);
  item.imageNote = "AI reconstructed before view; after photo is original.";
  assert.equal(normalizeContent(documents, config).projects.length, 1);
  item.sourceType = undefined;
  assert.throws(() => normalizeContent(documents, config), /photographic provenance/);
});

function approvedProjectFixture(documents) {
  const original = documents.find(document => document._type === "cleaningProject");
  const city = documents.find(document => document._type === "location" && document.slug.current === "oakville");
  const service = documents.find(document => document._type === "service" && document.slug.current === "mattress-cleaning");
  return { ...structuredClone(original), _id: "project-publishing-fixture", publicationStatus: "approved", sourceType: "camera-original", locations: [{ _ref: city._id }], services: [{ _ref: service._id }], location: "Wrong city label" };
}

test("publishing multiple new appointments grows the portfolio and derives the actual city label", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  const snapshot = normalizeContent([...documents, project, { ...project, _id: "another-real-job" }], config);
  assert.equal(snapshot.projects.length, 2);
  assert.ok(snapshot.projects.every(item => item.location === "Oakville"));
  assert.equal(snapshot.projects[0].sourceType, "camera-original");
});

test("an approved project needs a service and a valid optional appointment date", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  assert.throws(() => normalizeContent([...documents, { ...project, services: [] }], config), /at least one service/);
  assert.throws(() => normalizeContent([...documents, { ...project, date: "2026-02-30" }], config), /appointment date/);
  const snapshot = normalizeContent([...documents, { ...project, date: "2026-10-18" }], config);
  assert.equal(snapshot.projects[0].date, "2026-10-18");
});

test("work assigned to an unpublished city or only retired services is withheld", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  const service = documents.find(document => document._id === project.services[0]._ref);
  service.pageEnabled = false;
  assert.equal(normalizeContent([...documents, project], config).projects.length, 0);
  service.pageEnabled = true;
  const city = documents.find(document => document._id === project.locations[0]._ref);
  city.pageEnabled = false;
  city.indexInSearch = false;
  city.showInFooter = false;
  assert.equal(normalizeContent([...documents, project], config).projects.length, 0);
});

test("Our Work copy has defaults and accepts a complete published singleton", () => {
  const documents = seed();
  const defaults = normalizeContent(documents, config).workPage;
  assert.ok(defaults.cityDescription.includes("{{city}}"));
  const copy = { _id: "work-page", _type: "workPage", ...defaults, heading: "Our latest work" };
  assert.equal(normalizeContent([...documents, copy], config).workPage.heading, "Our latest work");
  assert.throws(() => normalizeContent([...documents, { ...copy, description: "" }], config), /Missing description/);
});

test("project addresses stay stable for legacy jobs and duplicate or invalid slugs fail", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  const normalized = normalizeContent([...documents,project],config).projects[0];
  assert.equal(normalized.slug,"project-publishing-fixture");
  assert.equal(normalizeContent([...documents,{...project,title:"A renamed appointment"}],config).projects[0].slug,normalized.slug);
  assert.throws(() => normalizeContent([...documents,{...project,slug:{current:"../milton"}}],config),/Invalid project slug/);
  assert.throws(() => normalizeContent([...documents,{...project,slug:{current:"milton-sofa"}},{...project,_id:"another-job",slug:{current:"milton-sofa"}}],config),/Duplicate project slug/);
});

test("a project preserves ordered photos, comparisons and safe videos", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  const photo = {asset:{_ref:"image-1234567890abcdef-1200x900-jpg"},alt:"Cream sofa after cleaning"};
  project.media = [
    {_key:"after",_type:"projectPhoto",photo},
    {_key:"compare",_type:"projectComparison",label:"Sofa before and after",before:photo,after:photo},
    {_key:"video",_type:"projectVideo",title:"Cleaning in progress",url:"https://youtu.be/abcdefghijk"},
    {_key:"upload",_type:"projectVideo",title:"Detail video",file:{asset:{_ref:"file-123abc-mp4"}},poster:photo,transcript:"Cleaning the sofa armrest."},
  ];
  const {media} = normalizeContent([...documents,project],config).projects[0];
  assert.deepEqual(media.map(item => item.id),["after","compare","video","upload"]);
  assert.deepEqual(media.map(item => item.type),["photo","comparison","video","video"]);
  assert.match(media[0].image,/^https:\/\/cdn.sanity.io\/images\//);
  assert.equal(media[2].embed,"https://www.youtube-nocookie.com/embed/abcdefghijk");
  assert.equal(media[3].video,`https://cdn.sanity.io/files/${config.projectId}/${config.dataset}/123abc.mp4`);
  assert.equal(media[3].transcript,"Cleaning the sofa armrest.");
});

test("invalid media cannot become a published player or inaccessible photo", () => {
  const documents = seed();
  const project = approvedProjectFixture(documents);
  for(const url of ["javascript:alert(1)","https://youtube.com.evil.test/watch?v=abcdefghijk","https://example.com/embed","https://youtube.com/watch?v=../bad","https://user@youtu.be/abcdefghijk"]) {
    project.media = [{_type:"projectVideo",title:"Video",url}];
    assert.throws(() => normalizeContent([...documents,project],config),/Unsupported project video/);
  }
  project.media = [{_type:"projectPhoto",photo:{asset:{_ref:"image-1234567890abcdef-1200x900-jpg"}}}];
  assert.throws(() => normalizeContent([...documents,project],config),/alt text/);
  project.media = [{_type:"projectVideo",title:"Video",file:{asset:{_ref:"file-123-html"}}}];
  assert.throws(() => normalizeContent([...documents,project],config),/MP4 or WebM/);
  project.media = [{_type:"projectVideo",title:"Video",url:"https://vimeo.com/12345",file:{asset:{_ref:"file-123-mp4"}}}];
  assert.throws(() => normalizeContent([...documents,project],config),/exactly one/);
});
