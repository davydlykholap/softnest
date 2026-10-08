# SoftNest current state

Last updated: 2026-10-07

This is the authoritative handoff for the production website. Read it before structural content, routing, CMS or deployment work. For folder ownership and day-to-day rules, continue with `project-guide.md`.

## Production architecture

- Next.js 16.4.0, React 19.3 and strict TypeScript power the public site.
- Production uses `output: "export"` and is deployed as static files to GitHub Pages.
- Sanity Studio in `studio/` manages public structured content.
- Every normal dev/build first reads published Sanity content, validates it, and writes a generated snapshot under `src/content/generated/`.
- React consumes that snapshot; public pages do not issue independent runtime Sanity requests.
- The current catalog contains 10 services, 9 service areas and 11 blog articles.
- Services, city routes and blog articles are generated at build time with `generateStaticParams()`.
- Supabase is intentionally not connected. Private leads/jobs remain a future system.

## Content ownership today

Sanity owns business settings, services, service-area records, shared FAQs, approved customer reviews, approved cleaning results, quote categories, blog content and the homepage text fragments that the current template actually reads.

React owns page structure, interactions and template prose that is intentionally part of the design. In particular:

- the About page is code-owned in `src/app/about/page.tsx`;
- the homepage uses a small validated set of Sanity text keys while its main headline/description and several section labels are code-owned;
- city pages use one shared `LocationPage` template, with optional city-specific overrides from Sanity;
- service pages use one shared `ServicePage`/`ServiceDetailPanel` template and no longer use the old CMS process/hero-heading fields.

Do not assume that every text value present in an old Sanity document is still rendered. The build contract now validates only content the current UI consumes.

## Compatibility cleanup completed 2026-10-02

Older Sanity records may still physically contain fields that are no longer part of the editor or generated public snapshot. They are harmless and can be migrated or removed later without urgency:

- `page-content-about` may remain in the dataset, but the website query and Studio navigation no longer use it;
- old service fields such as `heroTitle`, `process`, `heroProofs` and the old section-heading fields are ignored;
- an old location `expanded` boolean is ignored; the presence of `expandedContent` itself determines whether city-specific overrides exist;
- the local FAQ field keeps its legacy internal Sanity key `mississaugaFaqs` for data compatibility, but Studio labels it **Local FAQs** and the page treats it generically.

Generated snapshots are replaced as a set during content sync, so retired files such as the former `about.json` cannot linger and accidentally look authoritative.

## Client/server boundary

Static content selectors under `src/content` are server-only unless a module is explicitly designed for the browser. Interactive components receive small serializable props rather than importing full Sanity snapshots.

The location and service search controls now receive slim search records from their server pages. This prevents the roughly 40 KB location/service content files from being pulled into those client module graphs.

The site no longer depends on `react-icons`; the few UI icons used by interactive components are local SVG components in `src/components/UiIcons.tsx`.

## Quote and marketing flow

The quote UI lives under `src/components/quote/`. Validation and payload construction are separate from transport. `src/domain/quote.ts` submits directly from the browser to Web3Forms because GitHub Pages has no application server.

Both residential and business requests collect a service city or postal code. Submissions retain the originating city separately, and the lead analytics event includes only that public city slug. Photos are sent separately through Instagram or Facebook using the same name and city as the request.

A selected quote category can contain multiple independently configured entries. For example, one request can include a 2-seat sofa and a separate 3-seat sofa. Question choices use compact, shared-styled dropdowns; additional pieces/groups are added only when needed, so the common single-item path stays short. Item questions are type-aware: rugs collect dimensions/material/pile, wall-to-wall carpet can use dimensions or square footage, stairs collect stair/landing counts, and other furniture branches into the relevant size/description fields.

The form includes client validation, a honeypot, minimum-open-time filtering, duplicate-submit protection, a request timeout and a friendly phone fallback. These controls improve quality but are not server-side security enforcement.

Campaign attribution stores sanitized `utm_*`, `gclid`, `gbraid` and `wbraid` values in session storage and includes them with a successful quote request. Google Ads quote/phone conversion hooks are isolated in `src/lib/analytics.ts`.

All public integration settings are centralized in `src/lib/integrations.ts`: Google Ads, Web3Forms, the optional homepage video and optional YouTube URL.

## SEO and routing

Metadata, canonical URLs and structured-data helpers live under `src/seo`. The site generates sitemap and robots files at build time. Location sitemap inclusion respects `indexInSearch`.

The location finder matches city names/slugs and neighbourhoods, and leaves ambiguous matches for the customer to choose. Postal codes require an individual availability check. Unmatched input can be carried to the quote form through a bounded `service_location` query parameter; it never creates a `source_city` attribution. Search events record only the outcome and a validated matched city, never the entered query. Quote-click/start and phone-click events retain validated city context. These hooks use the existing Google tag; a GA4 property and Search Console reporting are not configured by this change.

Published slugs are external URLs and must remain stable. GitHub Pages cannot provide normal request-time Next.js redirects, rewrites or headers. Agree on a static-host-compatible redirect strategy before changing a published service, city or article slug.

## Validation

`npm run check` is the production website gate. It performs Sanity sync, ESLint, content-contract tests, focused Playwright tests, a production build, static-export preparation and exported-link verification.

After editing the Sanity schema, run:

```bash
npm run content:types
npm run studio:check
npm run check
```

The content-contract suite currently protects public IDs/references, unique slugs, required live template copy, relationship integrity, approval gating, image alt text, location publication/indexing consistency and article body preservation.

Rendered production checks are separate from the focused unit-style Playwright tests. `tests/e2e/` serves the generated `out/` directory in Chromium and verifies core navigation/search/quote behavior plus representative WCAG 2.x rules with Axe. Normal validation and deployment install Chromium and run these checks before a release can proceed.

## Operational safeguards

- Dependabot checks GitHub Actions, website npm dependencies and Studio npm dependencies weekly.
- `.github/workflows/security.yml` runs `npm run audit:dependencies` weekly for both dependency trees. New moderate-or-higher advisories fail; exact, version-scoped tooling exceptions expire on 2026-11-06.
- `.github/workflows/uptime.yml` checks the production homepage, quote page and sitemap twice per hour from a GitHub-hosted runner.
- `.github/workflows/backup-sanity.yml` creates a full weekly Sanity `prod` export with assets and retains the GitHub Actions artifact for 30 days.
- The Sanity export path has been tested against the production dataset; generated JSON snapshots are not treated as backups.

Recovery steps and the deliberately cautious restore procedure are documented in `recovery.md`.

## Deployment

`main` deploys through `.github/workflows/deploy-pages.yml`. A successful build uploads `out/` to GitHub Pages. A failed build leaves the currently published site untouched.

A Sanity webhook can send the `sanity-content-published` repository dispatch event so a publish triggers the same deployment workflow. Draft preview is local-only and is explicitly blocked in GitHub Actions.

## Known intentional limitations

- Default Next.js image optimization is unavailable on the static host, so `images.unoptimized` remains enabled. Local photography should therefore be pre-sized/compressed; Sanity image URLs can still request optimized remote renditions.
- There is no SoftNest-controlled server endpoint for quote validation/storage yet.
- There is no private CRM/job database yet.
- GitHub Pages cannot supply application-level security headers or request-time redirects.

See `supabase-plan.md` for the future private-record direction rather than adding unused backend dependencies now.
