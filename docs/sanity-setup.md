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

The Studio navigation currently exposes:

- Business settings and Homepage;
- Quote form choices;
- Services, Service areas, City page wording and City service wording;
- Cleaning results, Customer reviews and Common questions;
- Blog posts, Authors and Categories.

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

Every published city uses the shared `LocationPage` template. **City page wording** owns the reviewed search title/description, introduction, service descriptions, reasons to book, neighbourhood coverage, local FAQs and final quote wording. All nine records are seeded.

**City service wording** contains 90 short records: opening description, booking details, visit guidance and one practical FAQ. Service facts, drying and treatment limits remain in **Services**. Coverage and indexability flags remain in **Service areas**. Older local overrides are retained for existing hero/layout data; their old text is superseded by the reviewed wording records.

Published wording overrides the reviewed code fallback after `content:sync`. Do not edit generated JSON. `npm run content:seed-local-copy -- --dry-run` checks the seed; the command without `--dry-run` creates only missing records and preserves editor changes.

## Reviews and cleaning results

Testimonials and cleaning projects must be **Approved for website** before they enter the generated public snapshot. Pending/withheld records are excluded during normalization.

Attach accurate service/location references when they are known. Those references control which proof can appear on service or city pages. Do not add a city/service tag merely for marketing if the underlying job/review does not support it.

Google rating in Business settings is manually maintained. Verify the source before updating it.

## Blog editing

Open **Journal ? Blog posts**. Enter the title, excerpt, body, publication date and slug. Optional fields include cover image, separate search title, SEO description, author/categories and related services.

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

No publishing webhook was configured when checked on October 18. Use **Publishing help** in Studio to open the deployment workflow after publishing. A Sanity webhook can trigger `.github/workflows/deploy-pages.yml` using workflow dispatch. Configure it with `scripts/content/configure-webhook.mjs`. The setup script requires local tokens; those values must never be bundled into the site.

If the webhook is not operational, run the **Deploy SoftNest to GitHub Pages** workflow manually after publishing.

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

Approved cleaning results populate `/our-work/` automatically after a successful website build. Service/city filters use the assigned references. Material, problem, treatment, result and photo context appear when supplied. Use photo context for any reconstruction/editing that affects how a before/after comparison should be read. A single photo is never converted into a synthetic before view.

Card's three main actions go to the quote form, Our Work and Google reviews. Card is a QR/contact utility and remains noindex, follow. Both pages retain the existing website fonts, colours and components.

Deploy the main website source changes before new wording/gallery features become visible publicly. The hosted Studio is a separate deployment. Homepage copy/layout is deferred to a later pass.
