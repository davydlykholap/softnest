# SoftNest project guide

For the current production snapshot, read `current-state.md` first. This guide describes where changes belong and how to keep the architecture coherent.

## Ownership by folder

| Folder | Put this here |
| --- | --- |
| `src/app` | Routes, page metadata, route layouts and route-level CSS imports |
| `src/components` | Reusable UI and interactive behavior |
| `src/components/quote` | Quote presentation, answer rules and payload construction |
| `src/components/locations` | Shared city-page rendering and city-page defaults |
| `src/content` | Server-only selectors/adapters over generated Sanity JSON |
| `src/domain` | Replaceable business transports/workflows |
| `src/lib` | Shared configuration and small cross-cutting utilities |
| `src/sanity` | Sanity query/config/generated types |
| `src/seo` | Canonicals, metadata and structured data |
| `studio` | Sanity editing schema and desk structure |
| `scripts/content` | Content import, validation, sync, preview and webhook automation |
| `content/migration` | Bootstrap/recovery snapshot only |
| `docs` | Current operating docs plus explicitly historical research |

Do not put screenshots, source ZIPs, temporary QA output or received customer/editorial files in source folders. Existing local artifacts are ignored; preserve them unless you know who owns them.

## Content ownership rules

The current site intentionally uses a hybrid model rather than forcing every sentence into Sanity.

**Sanity owns** structured public records and fields that need editorial updates: business settings, service/location records, FAQs, approved proof, quote categories, selected homepage fragments and blog posts.

**React owns** layout, interaction and template prose that is part of the current design. The About page is code-owned. Several homepage and city/service headings/descriptions are also template copy.

If text is rendered through `pageText(...)` or a service/location/blog record field, edit the Sanity source. If the text is literal JSX in the template, edit the React source. Do not add runtime string-replacement hacks to make one source silently override the other.

## Generated content

Normal dev/build runs `scripts/content/sync.mjs`, which validates the complete published dataset and rebuilds `src/content/generated/`.

Rules:

- never hand-edit generated JSON;
- never commit it;
- do not add a migration-data fallback to production;
- a failed Sanity read or invalid dataset should fail the build;
- retired snapshot files are automatically removed on a successful sync.

`npm run content:seed -- dev` and `npm run content:seed -- check` are local migration previews only. CI rejects preview/seed shortcuts.

## Server/client boundary

Treat `src/content/services.ts`, `locations.ts`, `pages.ts` and `posts.ts` as server-only. A Client Component should receive the smallest serializable prop shape it needs.

For example, service/location search gets names/slugs/search terms from its page rather than importing the full service/location CMS snapshot. Follow that pattern when adding interactive filters or selectors.

Keep browser-only code (`window`, session storage, DOM listeners) inside Client Components/effects. Keep content assembly, SEO and large record processing on the server/build side.

## Services

Published service URLs are `/services/<slug>/`. The shared service template currently consumes:

- name/menu/short labels;
- SEO title/description;
- hero description and image;
- summary;
- service types and common concerns;
- included work;
- drying/limitation guidance;
- FAQs and related-service references.

Do not reintroduce the retired generic `process`, `heroTitle`, `heroProofs` or old section-heading fields unless the current template genuinely needs them. If a new field is necessary, add it to the Studio schema, normalization contract, TypeScript type and rendering code in one change.

## Service areas

Coverage status, page publication, search indexing and footer visibility are separate controls.

All published city pages use `src/components/locations/LocationPage.tsx`. Shared defaults cover the standard page. `expandedContent` in Sanity is optional local override data for richer city-specific content.

The old `expanded` boolean is retired. Do not build new logic around it.

The local FAQ field has the legacy internal name `mississaugaFaqs` in Sanity for compatibility; Studio labels it **Local FAQs**. Treat it as generic location data.

## Homepage and About

The homepage page-content document contains historical rows, but normalization keeps only the keys the current homepage calls through `pageText`. When adding a new editable homepage fragment:

1. add/use the key in the template;
2. add it to the `HOME_COPY_KEYS` contract in `scripts/content/normalize.mjs`;
3. ensure the Homepage Sanity document contains it;
4. update migration/bootstrap data if it must survive a fresh import.

The About page is currently code-owned. The legacy `page-content-about` Sanity document may still exist but is hidden from Studio navigation, not fetched for builds and not generated into website content.

## Quote form

Quote category IDs come from Sanity, while the current card imagery and quick-question presentation are defined in `src/components/quote/quoteOptions.ts`. A new enabled quote category therefore also needs a corresponding presentation entry in code; the build intentionally fails if one is missing.

Selected categories use an array of independently configured entries. Keep question choices as compact shared-styled dropdowns and preserve the opt-in “add another” pattern rather than rendering multiple item forms by default. Groupable categories such as chairs may use quantity within an entry; sofas, sectionals, mattresses and rugs can use separate entries when configurations differ. Type-specific questions may use `showWhen` conditions so only relevant measurements appear (for example area-rug dimensions vs wall-to-wall square footage vs stair counts).

Keep validation/payload rules in `quoteRequest.ts`, transport in `src/domain/quote.ts`, and UI state in the form/components. Do not duplicate submission logic across components.

## Public integration configuration

Use `src/lib/integrations.ts` instead of reading `NEXT_PUBLIC_*` environment values ad hoc in components. Add any new public build-time integration there and document it in `.env.example`.

Private tokens must never be placed in that module or use a `NEXT_PUBLIC_` prefix.

## URLs and redirects

Do not casually change published slugs. Sanity references preserve internal relationships, but external links/search indexes depend on the URL itself. GitHub Pages cannot perform normal Next.js request-time redirects.

If a URL truly must change, design and test a static-host-compatible redirect/alias strategy first.

## Tests and validation

Run the smallest relevant checks while editing, then the full gate before completion.

| Change | Minimum checks |
| --- | --- |
| React/CSS/content selector | `npx eslint .` plus relevant test/build |
| Content contract | `npm run content:verify` |
| Sanity schema | `npm run content:types` + `npm run studio:check` |
| Quote/attribution logic | `npm run test:unit` |
| Any structural/release change | `npm run check` |

`npm run check` must pass before treating production work as complete.

## Dependency changes

Prefer small patch/minor updates with a concrete reason. Keep `next` and `eslint-config-next` on compatible versions. Run `npm run audit:dependencies` after dependency work. CI blocks new moderate-or-higher advisories and expired exceptions. `dependency-audit-exceptions.json` records exact advisory URLs, package versions, scope, reasons, and expiry for unpatched build-tool dependencies. Raw `npm audit` still reports these advisories.

## Documentation rule

When architecture, ownership, commands or publishing behavior changes, update `current-state.md`, `system-overview.md`, this guide and any affected task-specific document in the same change. Historical research files must remain explicitly labelled historical.
