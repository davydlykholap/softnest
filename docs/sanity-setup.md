# Editing and publishing SoftNest

This document describes the current Sanity editor and publishing workflow as of 2026-10-18.

## Hosted Studio

Open **https://studio.softnestcare.ca** and sign in with the existing Sanity project account. Editing requires Sanity authentication and project permission. No API token is embedded in its assets.

Studio is hosted separately in `davydlykholap/softnest-studio` on GitHub Pages. Namecheap has a `studio` CNAME to `davydlykholap.github.io`. The exact Studio origin is allowed in Sanity CORS with credentials. Studio has a noindex tag and robots exclusion.

To update Studio code/schema, run `npm run studio:deploy` from the root. It validates/builds Studio, prepares the static SPA fallback and publishes only compiled public assets through the saved GitHub credentials. It does not deploy the main website. The external Sanity application is registered in `studio/sanity.cli.ts`.

## Start the editor

From the repository root:

```bash
npm run studio
```

Open http://localhost:3333 and sign in to the account with access to the saved SoftNest Sanity project/dataset.

The Studio navigation uses the website's plain-language names:

- **Pages:** Homepage and Our Work introductions (including the empty-city message).
- **Services:** cleaning service records and page content.
- **Locations:** Cities & coverage, City page text, City service page text.
- **Our Work:** All projects, Projects by city, Awaiting approval, Approved for website and Hidden projects.
- **Customer Reviews:** customer review records.
- **Blog:** Articles, Authors and Categories.
- **FAQs:** reusable questions and answers.
- **Settings:** Business & contact details and Quote form choices.
- **Publishing Help:** instructions using the same names as the sidebar.

These are views of existing document types, not separate storage folders or copied records. A project edited through a city or approval view is the same record shown in All projects. Creating through Projects by city prefills that city's reference and starts the project as pending, never automatically approved. Status views intentionally have no Create button; use All projects or Projects by city.

Project field labels include Image description, Cover image, Cover image layout, Before cleaning, What we did, The result and Website approval. Internal field names, document IDs and existing content remain compatible.

The About page is intentionally **not** editable in Sanity today. Its visible content lives in `src/app/about/page.tsx`. An old `page-content-about` document may remain in the dataset from the migration, but builds do not fetch it and Studio no longer presents it as an editing surface.

## Homepage editing

The Homepage document contains rows created during earlier site versions. Only the text keys used by the current React homepage are part of the production contract and generated snapshot.

Changing an old unused row will not change the website. When a new homepage fragment should become CMS-editable, connect it in React and add its key to `HOME_COPY_KEYS` in `scripts/content/normalize.mjs` as part of the same change.

Featured-service references and hero-review entries are also read from the Homepage document.

## Service editing

A service currently controls its public name/menu labels, slug/order/publication, search metadata, hero description, summary, image, service types, common concerns, included work, drying guidance, realistic limitations, FAQs and related services.

The older generic service fields `heroTitle`, `process`, `heroProofs`, `includedHeading`, `processHeading`, `afterCareEyebrow` and `afterCareHeading` were retired because the current shared service template does not render them. Existing records may retain those old values in Sanity storage, but they are not shown in Studio and are removed from the generated website snapshot.

Do not change a published service slug without a redirect plan.

## Service-area editing

The core controls are independent:

- **Service status** ? active, limited or not served;
- **Publish location page** ? whether a route exists;
- **Allow search indexing** ? whether the published page may appear in sitemap/search;
- **Show in footer** ? whether it is promoted in the footer.

A not-served area cannot publish a page. An unpublished page cannot be indexable or appear in the footer; content validation enforces those rules.

Every published city uses the shared `LocationPage` template. **City page text** owns the reviewed search title/description, introduction, service descriptions, reasons to book, neighbourhood coverage, local FAQs and final quote wording. All nine records are seeded.

**City service page text** contains 90 short records: opening description, booking details, visit guidance and one practical FAQ. Service facts, drying and treatment limits remain in **Services**. Coverage and indexability flags remain in **Cities & coverage**. Older local overrides are retained for existing hero/layout data; their old text is superseded by the reviewed wording records.

Published wording overrides the reviewed code fallback after `content:sync`. Do not edit generated JSON. `npm run content:seed-local-copy -- --dry-run` checks the seed; the command without `--dry-run` creates only missing records and preserves editor changes.

## Reviews and cleaning results

Testimonials and cleaning projects must be **Approved for website** before they enter the generated public snapshot. Pending/withheld records are excluded during normalization.

Attach accurate service/location references when they are known. Those references control which proof can appear on service or city pages. Do not add a city/service tag merely for marketing if the underlying job/review does not support it.

Google rating in Business settings is manually maintained. Verify the source before updating it.

## Blog editing

Open **Blog → Articles**. Enter the title, excerpt, body, publication date and slug. Optional fields include cover image, separate search title, SEO description, author/categories and related services.

Article body images require alternative text. A cover can be used only for listing/social previews by disabling ?Show cover above article.?

Publication date is display metadata, not a scheduler. Publish deliberately. Draft changes do not reach the public site until a successful deployment reads them.

## Local draft preview

Put `SANITY_API_READ_TOKEN` in ignored `.env.local`, then run:

```bash
npm run preview
```

The local preview uses the draft perspective and refreshes the generated snapshot while you edit. Invalid/incomplete draft data does not become a valid website build; correct the terminal-reported content error.

Draft preview is local-only and explicitly blocked in GitHub Actions. It is not a public hosted preview and does not provide click-to-edit overlays.

## Normal publishing

The production content path is:

```text
Edit ? Publish in Sanity ? GitHub Pages build ? validated static site
```

`npm run check` uses **published** Sanity data. If validation/build fails, the current deployed website remains in place.

A Sanity publication webhook is now active and verified (October 18, 2026). Pressing **Publish** in Studio (not saving drafts) automatically triggers the **Deploy SoftNest to GitHub Pages** workflow. The published site updates after the validated build completes, usually a few minutes later. A test published-content mutation returned HTTP 204 at the webhook and created GitHub workflow run 39167378759.

For security, the webhook's GitHub authorization is stored in Sanity webhook configuration, never in site code, the repository, or Studio assets. The current credential has wider GitHub access than needed; replace it with a dedicated fine-grained token limited to the SoftNest repository with Actions: write. The existing credential may expire or be revoked, in which case publishing will need reconnection.

To replace the credentials, set private SANITY_WEBHOOK_MANAGEMENT_TOKEN and GITHUB_WORKFLOW_TOKEN and run `node scripts/content/configure-webhook.mjs`. If the webhook fails, use Publishing help in Studio to run the deployment workflow manually. Check Sanity webhook attempt logs for HTTP errors.

## Schema changes

When changing `studio/schemaTypes`:

```bash
npm run content:types
npm run studio:check
npm run check
```

`content:types` regenerates `src/sanity/sanity.types.ts`. Commit that generated TypeScript file when it changes. `studio/schema.json` is local generated output and remains ignored.

## Initial/bootstrap import

`content/migration` is retained for recovery/bootstrap of a new dataset. It is not a second editorial source after migration.

Before importing into a new dataset, use `npm run content:import:check`. A real import creates only missing records and preserves stable IDs. The historical public-ID repair command exists only for the early September 2026 dotted-ID migration issue; do not run it on a healthy dataset without a specific reason.

## Public-data boundary

Sanity is a public website CMS. Never store customer addresses, private phone/email notes, credentials, job notes or other internal records there. Those belong in the future private business system described in `supabase-plan.md`.

## Build-time public configuration

Public browser/build settings are documented in `.env.example` and centralized in `src/lib/integrations.ts`:

- `NEXT_PUBLIC_GOOGLE_ADS_ID`;
- `NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION`;
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION`;
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`;
- optional `NEXT_PUBLIC_HOME_VIDEO_URL`;
- optional `NEXT_PUBLIC_YOUTUBE_URL`.

These are public identifiers/URLs, not private credentials. Sanity read/write tokens and the GitHub workflow token are private and must remain unprefixed/local or in the appropriate platform secret storage.

## Our Work and Card

Each approved cleaning appointment is one project with a permanent `/our-work/projects/[slug]/` page. `/our-work/` groups up to six project covers per actual city in manual horizontal rails, with overflow controls only when needed. City galleries at `/our-work/[city]/` use a regular photo grid; every cover opens the project. Project links and cover images exist in the initial HTML. All published cities have a section, with a centered empty-state message when no local projects exist. City pages have a Back to Our Work link returning to their city section; there is no city dropdown. Filters on city galleries become visible when there are more than six projects and multiple services. Existing `?service=` links remain supported. No descriptions appear beneath gallery cards.

In Studio, open Our Work → All projects → Create new. The editor has Project details, Photos & videos, Description & story, and Publishing tabs. Project description is an editable multiline field displayed on the individual project page. Generate Project address once and retain it after publication. Legacy projects without an explicit slug use a stable ID-derived address. Keep the main image as the cover; add any number of optional Photos, Before & after comparisons, and Videos in the ordered Additional photos & videos array. Photos require alt text. Videos accept MP4/WebM uploads or validated YouTube/Vimeo links; optionally upload English WebVTT captions and a poster, and add a transcript. External players are loaded only after pressing Play. Introduction, material, problem, treatment, result and appointment month are optional on the project page. No placeholder story is invented when fields are empty. Normalization rejects duplicate project addresses, unknown media types and unsupported video URLs or file types.

**Pages → Our Work introductions** controls the gallery heading/introduction and the populated/empty city-gallery introductions. Use `{{city}}` for the city name. Until that singleton is published, the website uses reviewed defaults. Cleaning results have a Website preview tab linking to the permanent individual project page. Hosted preview shows deployed content; it does not expose unpublished drafts.

City landing pages show one project section after the introduction and an independent general customer-review carousel after the reasons to book. Reviews are never replaced by newly published projects. City-service pages keep their matching project evidence and matching customer feedback as separate sections. Temporarily, a city without projects shows the first published appointment as a shared visual preview on its location landing page. Its Our Work gallery displays an empty state until actual local projects are published. Project details retain the actual appointment city; references are not reassigned. Only actual local projects affect indexing, image sitemaps and collection structured data. Local projects automatically replace the shared preview as they are published.

The public location label is derived from City, rather than the retired free-text Location field. Approved projects require a photo, at least one service and exactly one city. Recreated before views require internal Photo context in both Studio validation and the website build. If a city is unpublished or all a project's services are retired, the project is withheld until its references are usable again; it is never reassigned to another city.

The homepage retains its eight existing illustrative gallery comparisons alongside featured appointment photos. Those presentation assets are maintained in `src/content/homeGallery.ts`; they do not enter Our Work, city evidence or image sitemaps. Gallery cards have no text beneath the images. Photo context remains in the editorial record rather than being rendered as a card caption.

Card's three main actions go to the quote form, Our Work and Google reviews. Card is a QR/contact utility and remains noindex, follow. Both pages retain the existing website fonts, colours and components.

Deploy the main website source changes before new wording/gallery features become visible publicly. The hosted Studio is a separate deployment. Homepage copy/layout is deferred to a later pass.


## City galleries, photo authenticity, and image search

Each published service area has a reusable Our Work route at `/our-work/[city]/`. Every city page is connected to its existing `/location/[city]/` page, and the main gallery links to every published area. A city with no documented cleaning project is intentionally **noindex** and excluded from the sitemap; the URL still works and explains that new job photos will appear later.

For an actual appointment, use **Our Work → All projects → Create new** in Studio:

1. Add a truthful job title, category, visible service description, useful image alt label, and upload the photo.
2. Choose **Photo authenticity**. Pick *Original photos of a real appointment* for genuine images, or *Real job — recreated before view* only when the appointment was real but the original before photograph is unavailable. Explain reconstructions in **Photo context** in the editorial source record.
3. In **City**, select exactly one verified city reference. The website derives the location label from that city reference. Choose the correct **Services** reference too.
4. Choose **Paired before/after image** only for an existing side-by-side composite where the left is the before view and the right is the after view. Otherwise use single image.
5. Change **Publication status** to **Approved for website** and **Publish**; the website rebuild starts automatically after publishing.

Only approved customer jobs with an explicit authentic/reconstructed-photo source and one actual city become public. AI illustrations are retained in Studio as withheld records; they never appear as completed appointments or evidence on a location page. Do not assign cities to AI illustrations. The Oakville cream-sofa example is an actual cleaning appointment with an AI-reconstructed *before* and an original *after*, and its displayed caption discloses this.

Images used in search should have short, descriptive and accurate file names such as `oakville-cream-sofa-cleaning-before-after.webp`; avoid pretending an illustration is a real local job. Google image search also considers surrounding page text, crawlable HTML image elements, alt text and performance. The website includes only documented work imagery in the city image sitemaps. Sanity uploads are served on its image CDN; Studio does not currently provide a guaranteed custom filename for the resulting asset URL. Do not promise a filename conversion for images uploaded through Sanity. When a stable descriptive local filename is important, upload and deploy that asset through the website repository and select it using an appropriate migration/update.

The webhook requires a token with Sanity project webhook-management access and a GitHub Actions workflow token. Neither should be included in the public editor bundle or committed to Git. The webhook is active; manual deployment is only a fallback for failed delivery.
