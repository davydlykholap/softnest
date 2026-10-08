# SoftNest system overview

SoftNest is a build-time CMS website: Sanity supplies validated public content, Next.js renders it into a static export, and GitHub Pages serves the result. There is no application server in production.

## Data flow

```text
Published Sanity documents
        ?
scripts/content/sync.mjs
        ?
normalizeContent() validation + normalization
        ?
src/content/generated/*.json
        ?
server-side content selectors in src/content
        ?
Next.js Server Components + small interactive Client Components
        ?
next build ? out/
        ?
GitHub Pages ? softnestcare.ca
```

A content error fails before the generated snapshot is replaced. The sync then recreates the generated directory so files belonging to retired content contracts cannot linger.

## Repository layout

| Folder | Responsibility |
| --- | --- |
| `src/app` | Public routes, route metadata and route-level styles |
| `src/components` | Shared rendering and interactive UI |
| `src/components/quote` | Quote option UI, answers, validation and payload construction |
| `src/components/locations` | Shared location-page template, defaults, reviews and schemas |
| `src/content` | Server-side selectors over generated build snapshots |
| `src/content/generated` | Rebuilt Sanity snapshot; never hand-edit or commit |
| `src/domain` | Business transport boundaries such as quote submission |
| `src/lib` | Shared site settings, public integrations, attribution and utilities |
| `src/sanity` | Sanity connection, query and generated schema/query types |
| `src/seo` | URL, metadata and JSON-LD helpers |
| `studio` | Sanity Studio and public content schema |
| `scripts/content` | Sanity sync/import/preview/validation/publishing automation |
| `content/migration` | Bootstrap/recovery import snapshot, not a runtime CMS |
| `content/articles` | Prepared article-source records retained for migration/editorial traceability |
| `docs` | Current operating documentation |

## Sanity content model

The production build fetches public structured records: business settings, services, service areas, FAQs, testimonials, cleaning projects, quote categories, the Homepage page-content document, blog posts, authors and categories.

The old About `pageContent` record is not fetched. The About page is a code-owned template today.

The normalizer validates relationships and converts references into website-friendly values before anything in `src/content` sees the records. Only approved testimonials/results enter the public snapshot.

### Homepage

The Homepage record still contains historical copy rows in Sanity, but the website contract intentionally keeps only the keys currently rendered. `home.json` contains the live copy fragments, hero reviews and featured service slugs?not the retired redesign text.

### Services

A service record supplies its name/menu labels, metadata, summary, hero description, imagery, service types, concerns, included work, drying guidance, limitations, FAQs and related-service references.

The old service `heroTitle`, `process`, `heroProofs` and retired section-heading fields are no longer editor fields or public snapshot requirements.

### Locations

Every published city uses the same `LocationPage` React template. Base location fields provide metadata, image, service availability, neighbourhoods, map query and FAQs.

`expandedContent` is an optional set of local overrides. Most cities currently use shared defaults; Mississauga has richer local overrides. The former `expanded` boolean is retired and ignored.

The local-FAQ storage key remains `mississaugaFaqs` only to avoid a destructive Sanity migration. Studio presents it as **Local FAQs** and application code treats it as generic local content.

### Blog

Published posts are normalized into `posts.json` and rendered through one article template using Portable Text. Article body images require alternative text. Blog runtime fallbacks to local article files do not exist.

## Server and client components

Pages/layouts remain Server Components by default. Client Components are limited to UI that needs state, event handling or browser APIs: navigation menus, search controls, carousels, FAQs, attribution and the quote form.

Do not import large `src/content` modules into Client Components. Pass the smallest serializable data shape needed from a Server Component. The service and location search controls follow this pattern.

`src/content/services.ts`, `locations.ts`, `pages.ts` and `posts.ts` are marked server-only so accidental future client imports fail early.

## Static hosting constraints

`next.config.ts` enables static export outside the development server, keeps trailing slashes and disables the default Next image optimizer. The output is `out/`.

Because production is static:

- there are no Server Actions or request-time API routes;
- there are no request-time redirects/rewrites/headers;
- dynamic routes must have `generateStaticParams()`;
- the browser submits the quote directly to Web3Forms;
- public `NEXT_PUBLIC_*` values are build-time browser configuration, not secrets.

`scripts/prepare-export.mjs` creates Windows-compatible aliases for static RSC route fragments when needed. `scripts/verify-export.mjs` then checks exported pages, internal references and fragment aliases.

## Quote submission

`QuotePageForm` owns interaction and user-facing validation. `quoteRequest.ts` owns item validation and the exact `FormData` payload. `src/domain/quote.ts` owns transport to Web3Forms.

Each selected category stores an array of quote entries rather than one shared answer set. Each entry owns its own dropdown/input answers and any exact quantity, allowing mixed configurations such as a 2-seat sofa plus a 3-seat sofa in one request. Additional entries are opt-in through the selected card rather than shown up front. Questions may be conditional on earlier answers, so carpet/rug entries reveal only the measurements relevant to area rugs, wall-to-wall carpet or stairs/landings.

This boundary is intentional: a future backend can replace the transport without redesigning the form.

Attribution data is sanitized before storage/submission. Referrers are reduced to safe origin/path information rather than sending arbitrary query strings or fragments.

## Analytics and public integrations

`src/lib/integrations.ts` is the single public configuration module for:

- Google Ads ID;
- quote conversion destination;
- phone conversion destination;
- Web3Forms access key;
- optional homepage video URL;
- optional YouTube URL.

`src/lib/analytics.ts` emits lead, quote-click/start, location-search, phone and selected outbound-link events. City context is validated against published city slugs; location-search events exclude the entered query. The existing Google tag receives these events; GA4 property setup and Search Console remain external configuration. `MarketingAttribution` captures campaign identifiers in session storage.

## SEO

`src/seo/metadata.ts`, `structuredData.ts` and `urls.ts` centralize page metadata, canonical URL generation and safe JSON-LD serialization. Homepage/service/location/article pages add appropriate Organization, WebSite, Service, BlogPosting, FAQ or breadcrumb structures.

Location search matches names/slugs and neighbourhoods, and carries unmatched availability inquiries to the quote form without assigning a city.

## Development commands

```bash
npm ci
npm ci --prefix studio
npm run dev
npm run studio
```

Production-quality website verification:

```bash
npm run check
```

Schema/editor verification:

```bash
npm run content:types
npm run studio:check
```

Local draft preview requires a Sanity read token and `npm run preview`. Seed mode is only for inspecting the migration snapshot and is blocked in CI.

## Future private system

Sanity is public editorial infrastructure, not a CRM. Customer addresses, private notes, enquiries, quotes, appointments and job history belong in a separate authenticated system. `supabase-plan.md` describes that future boundary.
