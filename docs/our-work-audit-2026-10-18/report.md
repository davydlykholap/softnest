Website, Our Work and Studio functional audit — October 18, 2026

The city-gallery architecture is connected correctly, but the proof sections compete with each other. The immediate fix is to render customer reviews independently, have one project section per city page, and make the gallery adapt to how much content actually exists. Keep the hero first; place local work after the short introduction.

This review inspected current source, existing static exports, and live public pages in the in-app browser at mobile and desktop sizes. No application source, CMS records or deployments were changed. Screenshots and this report are the only added files.

**How content reaches the website**

1. Editors use the separately deployed Sanity Studio at https://studio.softnestcare.ca. The public landing screen requires a Sanity login. Authenticated editing was not exercised.
2. Articles are entered under Journal → Blog posts. Jobs are entered under Proof & answers → Cleaning results. Jobs need both Sanity publication and Approved for website status.
3. A publication is intended to trigger the GitHub Pages deployment through the Sanity webhook. This connection is documented as configured, but no publication or webhook test was performed during this audit.
4. `scripts/content/sync.mjs` fetches published Sanity content and normalizes it into `src/content/generated`. The website reads these snapshots, rather than querying Studio during a visitor's session.
5. Next builds a static export. The deployment workflow runs validation, builds and browser tests before uploading it. A failure leaves the prior public website in place.
6. `/our-work/` reads approved projects with a recognized photo source. City galleries filter by actual city references. City-service evidence requires both city and service references. These assignments are independent of the free-text location/service labels.

Publishing content therefore does not update the public website instantly. Saving a draft does not publish it. Studio code/schema changes and website code changes also have separate deployment paths. Hosted Website preview shows the published site; draft preview is local-only. An article's publication date is display metadata, not a scheduler.

Source anchors: [sync.mjs](C:/Users/davyd/source/softnest/scripts/content/sync.mjs), [work.ts](C:/Users/davyd/source/softnest/src/content/work.ts), [deployment workflow](C:/Users/davyd/source/softnest/.github/workflows/deploy-pages.yml), [publishing documentation](C:/Users/davyd/source/softnest/docs/sanity-setup.md).

**Current content and city coverage**

The current generated snapshot contains 13 articles, 24 approved testimonials and one public project. That project is the Oakville cream sofa, with an original after photo and a disclosed reconstructed before view. Its optional material/problem/treatment/result fields are all empty.

| City | Public projects | Assigned approved testimonials | Regular review carousel currently rendered |
|---|---:|---:|---|
| Mississauga | 0 | 3 | No |
| Toronto | 0 | 1 | No |
| Brampton | 0 | 2 | No |
| Oakville | 1 | 1 | No |
| Etobicoke | 0 | 2 | No |
| Burlington | 0 | 1 | No |
| Vaughan | 0 | 0 | Yes |
| Milton | 0 | 1 | No |
| Hamilton | 0 | 1 | No |

All nine existing static city-gallery exports have the expected canonical and a link from the matching city service-area page. Only Oakville appears in the gallery portion of the sitemap and is indexable. The other eight routes exist, are noindex, and show an explicit empty state. This is appropriate indexing behavior for the current content. Live Oakville and Milton pages corroborated the populated/empty flows; not every city URL was opened individually.

**Priority 1: adding content can stop deployment**

The production browser tests contain assumptions about the current CMS contents. `tests/e2e/work-and-card.spec.ts:116` requires exactly one project on the main gallery. The Oakville test requires exactly one particular project, and the Milton test requires zero projects. The general filter test also expects exactly one Oakville sofa result. The deployment runs this suite before upload.

Adding a second approved documented project will violate the global one-project assertion; adding jobs to Oakville or Milton breaks their fixed expectations too. Content validation can pass while the browser suite prevents the new content from going live.

Replace these expectations with counts/IDs derived from the same eligibility rules as the website. Use controlled fixtures for tests that specifically need an empty gallery or a reconstructed comparison. Keep live-content tests focused on invariants: correct city/service membership, visible disclosures when required, and working links. City-page tests must also be updated when reviews become independent: they currently enforce the either-local-proof-or-carousel behavior.

Source: [work-and-card.spec.ts](C:/Users/davyd/source/softnest/tests/e2e/work-and-card.spec.ts:116), [city-pages.spec.ts](C:/Users/davyd/source/softnest/tests/e2e/city-pages.spec.ts).

**Priority 2: the review disappearance is conditional rendering**

`LocalWorkEvidence` selects only the first matching project and first matching review. It returns `LocationReviews` only when neither exists and `fallbackReviews` is enabled. Thus even a city with one review and no project loses the regular review section. The data has not been removed: the general review pool still exists.

The city template then renders an additional `workDirectory` immediately after `LocalWorkEvidence`. Oakville gets two near-identical work headings/links; Toronto gets an Our Work heading containing only a review and another work section announcing that photos are coming. This is the main structural cause of the messy result.

Source: [fallback condition](C:/Users/davyd/source/softnest/src/components/LocalWorkEvidence.tsx:13), [adjacent sections](C:/Users/davyd/source/softnest/src/components/locations/CityPageSections.tsx:96).

**Recommended city-page order and behavior**

1. Existing hero: city/service promise, quote action and Google review link. An optional small “See our work” link can jump to the local-work section.
2. Short city introduction.
3. One compact “Our work in [City]” section. Show one or two genuine local projects with a link to `/our-work/[city]/`. Retain photo-context disclosures. With no projects, use a small honest availability message and link, rather than a large empty feature section. All city routes can remain connected.
4. Services and service directory.
5. Why book SoftNest.
6. Independent “What our customers say” carousel.
7. Coverage/map, FAQs and final quote action.

Render `LocationReviews` directly in the city template. Remove review fallback responsibility from the project section and remove the duplicate work directory, folding its link/empty state into the single project section. This keeps both proof types available as content changes.

For the restored carousel, the existing heading and wording “across our service area” truthfully describe the general review pool. Optionally prefer assigned local reviews, then supplement with general reviews under that same broad wording. Do not label the entire mixed pool as reviews from that city. Keep project reviews separate unless a testimonial is explicitly linked to the pictured job; city/service tags alone do not establish that connection.

Putting a full work block before the hero would delay the visitor's understanding of the service, location and booking action, particularly on mobile. Putting it just after the introduction gives the photos prominence without adding another opening screen. A compact jump link in the hero is sufficient for visitors looking for evidence immediately.

**Priority 2: gallery navigation exceeds the content**

The main gallery presents nine city links, then a separate Area dropdown, plus a service dropdown. City links navigate to dedicated URLs, whereas the Area dropdown filters in place without changing the URL. With one job, this consumes more than the initial desktop viewport and several mobile screens before the photograph. Eight city links lead to empty galleries. The empty-city introduction still promises projects and before/after details before announcing there are none.

Keep the dedicated city URLs and existing SEO rules. On the main page, prioritize cities with work and put other connected cities under an accurately labelled “More service areas — photos coming” disclosure or secondary navigation. With only one eligible service/city, hide redundant filter controls. With more content, choose one prominent city-navigation mechanism and make its navigation/filter behavior clear. URL-backed filters would also allow a selection to be shared and restored.

For a single result, use a deliberate featured-project layout; the current two-column grid leaves the desktop portfolio sparse. Add truthful material, concern, treatment and outcome descriptions using the fields already present in Studio. A short photo-source badge adjacent to the image would make the reconstruction disclosure clearer before interaction. Preserve the full explanatory caption.

Sources: [WorkAreaLinks](C:/Users/davyd/source/softnest/src/components/WorkAreaLinks.tsx), [WorkGallery](C:/Users/davyd/source/softnest/src/components/WorkGallery.tsx), [city gallery intro](C:/Users/davyd/source/softnest/src/app/our-work/[city]/page.tsx:80).

**Other concrete content and component gaps**

- **No job preview in Studio.** Preview-enabled types are only post, service, location and pageContent. Add a cleaning-project preview pointing to its city gallery and project anchor. Hosted preview must continue to explain that it shows deployed content.
- **Validation differs between editor and build.** A reconstructed job's missing Photo context fails normalization but has no equivalent conditional required rule in Studio. Align editor validation with the build so an editor can fix the problem before publication. Also require an image and at least one usable service reference when approving a job.
- **Location can contradict itself.** The authoritative city reference and separate free-text Location field can disagree. Derive the public city label from the reference, or validate their relationship. Similarly distinguish the service reference from the descriptive service text.
- **Disabled references need a policy.** Project normalization accepts existing service/location references without filtering them to public routes. A project associated with a subsequently disabled city can remain in All Work while losing its dedicated city route. Decide whether to withhold it or display it with accurate non-linked location text. Do not automatically move it to another city.
- **City context is lost on some quote actions.** The city gallery's main and final CTAs pass the city; its shared header and footer do not receive that same quote URL. A city-service evidence link also goes to the whole city gallery rather than a service-filtered gallery. Pass context consistently where the user expects it.
- **Job date exists but is not displayed.** Render an appropriate coarse date if useful for showing portfolio freshness; do not expose private appointment details.
- **Our Work introductions are code-owned.** Studio can add projects but does not control the main/city-gallery introduction text. This is a deliberate current limitation to explain to editors, or a small CMS extension if needed.
- **Projects currently have only anchor links.** This works for the current portfolio. A dedicated case-study page is optional once there is enough detail; it is not required to repair the city flow.
- **Accessibility checks need to include both city-gallery states.** The existing axe route list includes All Work but not populated and empty city galleries. The slider exposes an accessible name and responded to a value change. Full keyboard, screen-reader, contrast, zoom and touch testing were not completed in this review.

Sources: [preview types](C:/Users/davyd/source/softnest/studio/structure.ts:9), [project schema](C:/Users/davyd/source/softnest/studio/schemaTypes/business.ts:486), [normalization](C:/Users/davyd/source/softnest/scripts/content/normalize.mjs:312), [city gallery](C:/Users/davyd/source/softnest/src/app/our-work/[city]/page.tsx:71), [accessibility routes](C:/Users/davyd/source/softnest/tests/e2e/accessibility.spec.ts).

**Observed flow and screenshots**

| Step | Surface/action | Health |
|---|---|---|
| 1 | All Work on desktop and mobile | Loads; excessive navigation before the sole result |
| 2 | Comparison and Area selection/reset | Slider changed from 50 to 85; Oakville selection and Clear filters worked |
| 3 | Oakville gallery → Oakville service-area page | Connected; city page duplicates work promotion and omits regular reviews |
| 4 | Toronto city proof | Review appears under Our Work despite zero projects |
| 5 | Milton gallery | Honest empty state; overly prominent empty-city navigation |
| 6 | Studio landing | Login screen loads; authenticated editing untested |
| 7 | Blog index | Loads and lists the 13 articles; article link works |
| 8 | Article detail | Body, date, author, related services and further-reading links render |

Step 1 — desktop gallery opening:

![Desktop gallery navigation before the first project](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/08-work-desktop.png)

Step 1 — mobile city navigation and filters:

![Mobile gallery navigation and filters](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/01-work-mobile.png)

Step 2 — comparison and disclosure:

![Comparison photo and reconstructed-before disclosure](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/02-comparison-mobile.png)

Step 3 — Oakville project section and review:

![Oakville local project section](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/03-oakville-evidence-mobile.png)

![Oakville local testimonial after the photo](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/04-oakville-review-duplicate-mobile.png)

Step 4 — Toronto work heading with a review only:

![Toronto Our Work section containing only a review](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/07-toronto-review-only-mobile.png)

Step 5 — connected empty gallery:

![Milton gallery empty state](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/05-milton-empty-mobile.png)

Step 6 — Studio access screen:

![Sanity Studio login screen](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/06-studio-access.png)

Step 7 — blog listing:

![Blog index opening](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/09-blog-desktop.png)

Step 8 — article:

![Article rendering](C:/Users/davyd/source/softnest/docs/our-work-audit-2026-10-18/10-article-desktop.png)

**Verification and limits**

- Ran `node --test scripts/content/normalize.test.mjs`: 20 passed, zero failed.
- Ran `node scripts/verify-export.mjs` against the existing export: 144 HTML pages, 209 internal references and 142 route fragments verified. This does not establish the health of every external link or dynamic interaction.
- Checked all nine existing city-gallery exports for canonicals, indexing, sitemap inclusion and incoming city links. The existing export was inspected without rebuilding it or syncing CMS data.
- Live browser checks covered main gallery, slider, area selection/reset, Oakville gallery/service-area connection, Toronto proof, Milton empty gallery, Studio login, blog listing and one article.
- Did not run the complete browser suite, submit a quote, publish/unpublish CMS content, test the webhook, log in to Studio, or verify project roles/CORS/token settings.

The requested formal security scan could not start: the scan service returned `Could not read local file: .next\\dev\\lock`. No authoritative scan ID or security report was produced. The security skill requires surfacing this startup failure without inventing a replacement scan. No claim of a completed vulnerability audit or absence of vulnerabilities is made here. The functional review continued independently.

The repository's [publishing documentation](C:/Users/davyd/source/softnest/docs/sanity-setup.md:106) already records that the webhook credential has wider GitHub access than needed and recommends a dedicated fine-grained repository token with Actions write. Treat that as a documented follow-up requiring verification, not a newly validated exposure. The same documentation identifies Sanity as a public website CMS and prohibits private customer/internal data there. Approved-for-website filtering is a display/publication rule, not a substitute for private storage.

Recommended implementation sequence: repair content-dependent deployment tests; separate projects and reviews; merge duplicate work sections and move the single project section after the introduction; simplify gallery navigation/empty states; align Studio validation and add project preview; then complete the blocked security review with authenticated configuration checks in scope.
