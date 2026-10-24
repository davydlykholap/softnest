# SoftNest current state

Last updated: 2026-10-24

The October 24 refresh updates the dependency trees and the booking/care article library. Eighteen articles are published in Sanity: fourteen revised guides and four new guides covering service inclusions, appointment preparation, cleaning follow-up and residential carpet cleaning. Website publication still follows the validated GitHub Pages deployment workflow.

The shared city-service system, quote context and GA4 configuration are deployed. The October 17 refinements add reviewed copy for every city-service combination, contextual article links, topic-based reading recommendations and responsive local photo delivery. The homepage title, H1, hero copy and design are preserved. Production analytics receipt remains a separate account-side verification.

This is the authoritative handoff for the production website. Read it before structural content, routing, CMS or deployment work. For folder ownership and day-to-day rules, continue with `project-guide.md`.

## Production architecture

- Next.js 16.4.3, React 19.3.1 and strict TypeScript 6.0.3 power the public site.
- Production uses `output: "export"` and is deployed as static files to GitHub Pages.
- Sanity Studio in `studio/` manages public structured content.
- Every normal dev/build first reads published Sanity content, validates it, and writes a generated snapshot under `src/content/generated/`.
- React consumes that snapshot; public pages do not issue independent runtime Sanity requests.
- The current catalog contains 10 services, 9 service areas and 18 published Sanity blog articles.
- Services, city routes and blog articles are generated at build time with `generateStaticParams()`.
- One shared city-service route generates 90 concise pages (10 services × 9 active cities), with local/service hub links, sitemap entries and quote context. See `city-service-pages.md` for coverage controls and content ownership.
- Supabase is intentionally not connected. Private leads/jobs remain a future system.

## Content ownership today

Sanity owns business settings, services, service-area records, shared FAQs, approved customer reviews, approved cleaning results, quote categories, blog content and the homepage text fragments that the current template actually reads.

React owns page structure, interactions and template prose that is intentionally part of the design. In particular:

- the About page is code-owned in `src/app/about/page.tsx`;
- the homepage uses a small validated set of Sanity text keys while its main headline/description and several section labels are code-owned;
- city pages use one shared `LocationPage` template; reviewed copy in `src/content/cityPages.ts` overrides generated titles, descriptions, introductions, FAQs and neighbourhoods through `locations.ts`;
- service pages use one shared `ServicePage`/`ServiceDetailPanel` template and no longer use the old CMS process/hero-heading fields.

City-service introductions and booking notes are reviewed in `cityServiceEditorial.ts`; city access guidance and page composition live in `cityServicePages.ts`. Canonical service facts and FAQs, including the plain-language results policy, remain in Sanity. Customers may call, message or choose the optional form; photos are optional too. Difficult marks can be assessed and treated to try to improve appearance, with no promise of complete removal, repair or restoration.

`serviceReading.ts` supplies one relevant inline reference per local service. Blog body links are edited in Sanity; `posts.ts` chooses related reading by topic instead of repeating the same newest posts everywhere.

Local photos use committed WebP derivatives under `public/images/responsive/` and the manifest in `src/lib/responsiveImages.json`. `ResponsiveImage` supplies native responsive image selection on static hosting, preserves mobile portrait art direction, and prioritizes hero images. Run `npm run images:generate` after replacing source photos. Global navigation and bulk directories disable automatic route prefetching to reduce background downloads. Quote navigation and customer interactions remain normal Next.js links.

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

Both residential and business requests collect a service city or postal code. Every city-page quote link, including desktop/mobile navigation and footer links, passes `?city=<slug>`. Submissions retain the originating city separately from the editable service location. Lead analytics includes only that validated public city slug.

Local service pages also pass a validated `service` query parameter. The form retains this context, preselects an item category where the match is unambiguous and preserves the original city-service landing URL in the submission. Customers can still change the service location and requested items. General upholstery, leather and pet treatment do not guess an item category.

Customers may request a photo quote directly through Instagram/Facebook without first completing the form. The detailed form remains available for residential and business requests; any needed photos can be requested during follow-up. Photo-channel clicks emit `photo_quote_click`, never `generate_lead`. Direct photo uploads are not offered.

The quote page now explains written, tax-inclusive quotes, optional photos and payment after service; extra notes are optional. Service pages link to preparation and follow-up guidance and explain the day-before reminder and text around 20–30 minutes before arrival. Parking and any furniture movement are clarified with the customer. Published follow-up wording invites contact without adding a fixed deadline or unconfirmed remedy.

All eighteen blog covers are AI-generated editorial illustrations with visible captions, separate from actual project evidence. Original WebP covers and the prompt set are archived under `content/articles/` and `content/editorial/2026-10-24/`. Existing article addresses are preserved. No team-profile section or invented case studies were added. See the editorial README for the reviewed content and guarded publication process.

A selected quote category can contain multiple independently configured entries. For example, one request can include a 2-seat sofa and a separate 3-seat sofa. Question choices use compact, shared-styled dropdowns; additional pieces/groups are added only when needed, so the common single-item path stays short. Item questions are type-aware: rugs collect dimensions/material/pile, wall-to-wall carpet can use dimensions or square footage, stairs collect stair/landing counts, and other furniture branches into the relevant size/description fields.

The form includes client validation, a honeypot, minimum-open-time filtering, duplicate-submit protection, a request timeout and a friendly phone fallback. These controls improve quality but are not server-side security enforcement.

Campaign attribution stores sanitized `utm_*`, `gclid`, `gbraid` and `wbraid` values in session storage and includes them with a successful quote request. Google Ads quote/phone conversion hooks are isolated in `src/lib/analytics.ts`.

All public integration settings are centralized in `src/lib/integrations.ts`: Google Ads, Web3Forms, the optional homepage video and optional YouTube URL.

## SEO and routing

Metadata, canonical URLs and structured-data helpers live under `src/seo`. The site generates sitemap and robots files at build time. Location sitemap inclusion respects `indexInSearch`.

The location finder matches city names/slugs and neighbourhoods, and leaves ambiguous matches for the customer to choose. Postal codes require an individual availability check. Unmatched input can be carried to the quote form through a bounded `service_location` query parameter; it never creates a `source_city` attribution. Search events record only the outcome and a validated matched city, never the entered query. Quote-click/start and phone-click events retain validated city context. These hooks use the existing Google tag. The SoftNest GA4 web stream `G-CM48WEXDDQ` is configured by default; `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` can override it (use `off` to disable). Localhost previews do not configure the GA4 destination. Do not duplicate a destination already connected to the Google tag. GA4 account 412323320 / property 559357252 / stream 16145916765 belongs to the SoftNest business Google account, with Toronto reporting time and CAD. `generate_lead` is registered as a code-based key event with no invented monetary value, and `source_city` is an event-scoped “Origin city page” dimension. Automatic form and site-search measurement are off. Query redaction excludes `service_location`, `email`, `phone`, `name` and `address`; email redaction remains enabled. Search Console domain property `softnestcare.ca` has a successful sitemap; the current public sitemap lists 130 URLs. Production GA4 receipt and Ads conversion destinations still require post-deployment verification. Tracking failures cannot interrupt a successful quote.

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

`scripts/serve-export.py` serves previews on loopback with a larger connection queue for parallel browser contexts and suppresses successful per-asset request logs. Browser tests stub the external Google tag; configuration and event payloads are still checked locally, without sending synthetic activity to Google.

## Operational safeguards

- Dependabot checks GitHub Actions, website npm dependencies and Studio npm dependencies weekly.
- `.github/workflows/security.yml` runs `npm run audit:dependencies` weekly for both dependency trees. Moderate-or-higher advisories fail. Both dependency trees report zero vulnerabilities as of October 24, 2026; no audit exceptions remain.
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
