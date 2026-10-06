# SoftNest documentation

This folder separates current operating documentation from historical design research.

## Read these first

1. [`current-state.md`](current-state.md) - the current production architecture, ownership boundaries, compatibility notes and verification commands.
2. [`system-overview.md`](system-overview.md) - how Sanity, generated content, Next.js, the quote form, analytics and GitHub Pages fit together.
3. [`project-guide.md`](project-guide.md) - where code and content belong and the rules to follow when changing the site.
4. [`sanity-setup.md`](sanity-setup.md) - editing, previewing and publishing public content.
5. [`recovery.md`](recovery.md) - uptime, dependency checks, Sanity backups and recovery procedures.
6. [`supabase-plan.md`](supabase-plan.md) - the deliberately deferred private lead/job system.

When these documents and older notes disagree, `current-state.md` is authoritative.

## Historical research

The following files are retained as dated research records, not as descriptions of the current UI or architecture:

- [`homepage-research-and-blueprint.md`](homepage-research-and-blueprint.md)
- [`service-pages-research-and-blueprint.md`](service-pages-research-and-blueprint.md)

Each historical file now states what was implemented and which recommendations remain only ideas. Do not use their old screenshots, section descriptions or proposed layouts as implementation instructions.

## Source of truth by topic

| Topic | Source of truth |
| --- | --- |
| Public business settings, services, service areas, FAQs, approved reviews/results, quote categories, selected homepage text, blog posts | Sanity |
| Page layout, interactions, most current homepage/About/location/service template prose | React/Next.js source |
| Build-time website content | `src/content/generated/` (generated; never hand-edit) |
| Public integration configuration | `src/lib/integrations.ts` plus `NEXT_PUBLIC_*` build variables |
| Private customer/job records | Not implemented yet; future Supabase-backed workflow |
| Production hosting | GitHub Pages static export |

## Verification

For website work, run `npm run check`. For rendered browser behavior and accessibility, run `npm run test:e2e:built` against the generated `out/` export (or use `npm run test:e2e` to build first).

For a Sanity schema change, also run `npm run content:types` and `npm run studio:check`.

A change is not complete if the content contract, TypeScript build, static export, browser smoke tests, serious/critical automated accessibility checks or Studio build fails.
