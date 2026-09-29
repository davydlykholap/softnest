# SoftNest modernization status

Last updated: 2026-09-29

This is the handoff point for the current website/CMS architecture. Read it with `project-guide.md` and `sanity-setup.md` before making structural content or deployment changes.

## Current architecture

- Next.js 16 + React 19 + strict TypeScript power the public website.
- Production is currently a static export deployed through GitHub Pages.
- Sanity Studio in `studio/` is the source of truth for public editable content.
- The build reads Sanity once, validates the complete published dataset, and writes a generated snapshot under `src/content/generated/`.
- UI code consumes content through `src/content` selectors instead of issuing independent Sanity queries.
- The published catalog currently contains 10 services, 9 service areas, and 11 blog articles.
- Blog posts now come exclusively from the generated Sanity snapshot; the former local-post runtime fallback has been removed.
- Service and location pages use shared templates rather than separate page implementations.
- Quote submission transport remains isolated in `src/domain/quote.ts` so lead storage can be replaced later without rebuilding the form UI.
- SEO URL, metadata, sitemap, robots, breadcrumb, and structured-data helpers live under `src/seo`.

## Content ownership rules

Sanity owns public business settings, services, service areas, FAQs, testimonials, cleaning results, quote categories, page copy, and blog posts.

React owns layout, rendering, interaction, reusable components, and presentation logic. Avoid adding runtime text rewrites that silently change Sanity values. If public wording is wrong, correct the published Sanity record and keep the migration seed aligned.

Business settings are exposed through `src/lib/site.ts`; components should not duplicate phone, email, social URLs, or quote labels.

## Content safeguards

`npm run content:verify` validates the migration/content contract, including:

- expected service, location, and article catalogs;
- public Sanity IDs and references;
- duplicate service, location, and article slugs;
- broken relationships;
- required article body content and image alternative text;
- approval gating for testimonials and cleaning results;
- required and unique page-template copy keys;
- service-area publication/index/footer consistency;
- prevention of a public landing page for an area marked not served.

Archived `content/articles/<slug>/article.txt` files are fidelity references when present. Newer articles can live only in Sanity; the migration test validates their body without requiring a duplicate text archive.

## Sanity migration state

The original dotted/private document IDs were repaired on 2026-09-07. Public content uses root IDs such as `service-sofa-cleaning`, `location-mississauga`, and `page-content-home` so anonymous production reads work correctly.

On 2026-09-29, the two previously local-only articles were confirmed as published Sanity records and the generated snapshot was refreshed to include all 11 articles. Their local runtime fallback is no longer required.

Also on 2026-09-29, published quote wording and upholstery drying-time copy were reconciled in Sanity so the frontend no longer needs hidden string replacements. A pre-change Sanity backup was saved under `content/backups/`.

## Development and verification

Use `npm run check` before treating structural work as complete. It performs content sync, ESLint, content-contract tests, focused Playwright tests, the Next.js production build, static-export preparation, and exported-route verification.

The migration seed under `content/migration/` is a recovery/bootstrap snapshot, not an alternate runtime CMS. Keep it compatible with the published dataset when adding durable content records.

Line endings are standardized through `.gitattributes` so text files use LF across development and CI, while Windows batch/cmd files retain CRLF.

## Publishing automation

Source support exists for published Sanity changes to trigger the GitHub Pages deployment workflow. Before relying on it operationally, verify the repository variables, webhook configuration, a harmless publish-triggered deployment, and that draft-only edits never affect production.

Until that path has been verified end to end, publishing content and deploying the website should be treated as separate operational steps.

## Supabase — intentionally later

Do not add an unused Supabase SDK or empty database connection. The first worthwhile database feature remains private enquiry/job tracking with statuses such as New → Contacted → Quoted → Booked → Completed/Closed.

Private customer and operational records must stay out of the public Sanity dataset.
