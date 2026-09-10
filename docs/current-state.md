# SoftNest modernization status

Last updated: 2026-09-07

This file is the handoff point for the current website/CMS modernization. Read it together with `project-guide.md` and `sanity-setup.md` before continuing migration work.

## Completed in source

- Next.js remains the public static-export website.
- Sanity Studio is included in `studio/` and is the intended source of truth for public editable content.
- Public business settings, services, service areas, FAQs, approved testimonials, approved cleaning results, quote-form categories, homepage/About copy and blog posts have a structured Sanity model.
- The website consumes one validated generated content snapshot through `src/content` selectors.
- Blog data now follows the same `src/content` boundary as the rest of the website rather than reading generated JSON from Sanity/UI modules directly.
- Three prepared blog articles are represented in `content/migration/article-seed.json`; the stain-removal article includes five prepared body images.
- Service-area coverage is separate from page publication, search indexing and footer visibility.
- The richer Mississauga presentation is handled by the reusable expanded-location component rather than a Mississauga-only page component.
- Business URLs/phone/social details are centralized rather than repeated through normal page components.
- Quote submission transport is isolated in `src/domain/quote.ts` so a later lead database can replace Web3Forms without rewriting the form UI.
- SEO URL, metadata and structured-data helpers are centralized under `src/seo`.
- Supabase is deliberately planned but not connected. See `supabase-plan.md`.
- Sanity Studio navigation is organized by Website, Services & areas, Proof & answers, and Journal.
- Page-copy rows have recognizable previews while their internal template keys remain fixed.
- Studio hides/clarifies controls that are derived elsewhere, including service-area coverage in Business settings.
- Website preview supports local draft preview and a configurable published-site URL.
- Confirmed unreferenced legacy React components have been removed.
- Clean-check ordering is reproducible: development, lint and production checks generate/validate the Sanity content snapshot before code that imports it is evaluated.

## Content safeguards

`npm run content:verify` validates the migration/content contract. It currently checks, among other things:

- exactly expected migrated catalogs and the three prepared articles;
- public Sanity document IDs/references never use dotted private paths;
- preservation of the original article prose;
- duplicate service/location/article slugs;
- broken references;
- required article image alt text;
- approval gating for testimonials and cleaning results;
- required and unique page-template copy keys;
- location page/index/footer publishing consistency;
- prevention of a public landing page for an area marked not served.

## Live Sanity migration status

The initial 57-record import was completed on 2026-09-07. A Sanity-specific ID issue was then discovered: the first snapshot used dotted IDs such as `service.sofa-cleaning` and `pageContent.home`. Sanity treats dotted document IDs as private paths, so the unauthenticated static-site content read could not see them.

The source snapshot now uses public hyphenated IDs such as `service-sofa-cleaning`, `location-mississauga` and `page-content-home`. The production dataset repair was completed successfully on 2026-09-07: 56 public records were created, anonymous website reads were verified, and 56 legacy dotted/private records were removed after backup.

`npm run content:types` and `npm run studio:check` pass. The live Sanity-backed website build also passes content sync, all 12 content-contract tests, Next.js compilation/TypeScript/static generation, and export verification.

For a brand-new dataset, the normal first-import path remains `npm run content:import:check` followed by `npm run content:import`; the corrected migration snapshot now creates public IDs from the start.

## Publishing automation still needs live verification

Source support exists for Sanity published-content changes to trigger the GitHub Pages deployment workflow. Before relying on it:

1. Confirm the required GitHub repository variables described in `.env.example`/`sanity-setup.md`.
2. Configure the Sanity webhook using `scripts/content/configure-webhook.mjs` and appropriately scoped tokens.
3. Publish a harmless test edit.
4. Confirm the GitHub deployment starts, passes content validation/build/export checks and updates the public page.
5. Confirm an intentionally invalid draft does not affect the public website.

Until this is verified, publishing in Sanity and deploying the website are still two operational steps.

## Blog milestone

The three intended article URLs are:

- `/blog/what-cleaning-solution-can-i-use-on-my-couch/`
- `/blog/how-to-remove-stain-from-couch/`
- `/blog/why-did-my-couch-stain-come-back-after-cleaning/`

After the live import, review these in Studio and on the real generated pages before adding more articles. Subsequent editorial changes should happen in Sanity, not by editing the prepared local import records.

## Supabase milestone — intentionally later

Do not add an unused Supabase SDK or empty database connection. The first worthwhile Supabase feature remains structured enquiry tracking with statuses such as New → Contacted → Quoted → Booked → Completed/Closed. Customer/private operational records must stay out of the public Sanity dataset.
