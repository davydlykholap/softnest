# Homepage research record

Historical research snapshot: September 2026

Current implementation status reviewed: 2026-10-02

> This file is retained as design/research history. It is **not** the current homepage specification and must not be used to infer current architecture, section order or CMS ownership. For current behavior read `current-state.md` and `system-overview.md`.

## Original research goal

The September review asked how a local upholstery/carpet cleaning homepage could improve clarity, trust, proof, quote conversion, local relevance and realistic expectation-setting without turning into a long keyword-heavy sales page.

The useful conclusions were:

- state the service/area quickly;
- show real work early;
- make the primary quote path obvious;
- prefer concrete evidence over repeated trust adjectives;
- explain material/stain limitations honestly;
- keep service discovery simple;
- reduce duplicate reviews/process/trust messages;
- protect mobile performance and accessibility;
- avoid unsupported environmental, health or guaranteed-result claims.

Those principles still inform design decisions, but the detailed proposed layout from the original study has been superseded by subsequent implementation work.

## Current homepage implementation

The production homepage currently renders:

1. shared header/navigation;
2. photographic hero with a code-owned headline/description, selected Sanity-managed supporting fragments and quote/call actions;
3. Google rating/review experience;
4. real-result comparison carousel;
5. featured service cards driven by Sanity references;
6. optional cleaning-video showcase (or Instagram fallback);
7. interactive FAQ section;
8. final quote CTA;
9. shared footer.

`HomeHero.tsx` and `HomeSections.tsx` are the implementation authority for the current section order.

## Current content ownership

The homepage is intentionally hybrid:

- Sanity owns featured-service references, hero-review entries and the small set of copy keys actually read through `pageText(...)`;
- React owns the current main hero headline/description and other layout/template prose;
- `scripts/content/normalize.mjs` validates only the Sanity keys the current page consumes;
- historical unused Homepage copy rows can remain in the Sanity document but are excluded from generated `home.json`.

Do not assume an old `hero-*` or `sections-*` row changes the page merely because it still exists in the dataset.

## Recommendations that are not current requirements

The original research considered several ideas that are **not** current implementation requirements:

- replacing result/review carousels with static grids;
- publishing representative pricing/ranges;
- combining reviews and service-area proof into one section;
- adding a dedicated four-step homepage process section;
- moving city links closer to the hero;
- introducing a team/technician trust section;
- replacing the current hero copy with a more literal service/location H1.

These remain optional product/design hypotheses. Implement them only after a deliberate design/conversion decision, not because this historical file mentions them.

## Claims guidance that remains relevant

Public claims should be specific and supportable. Prefer practical statements about inspection, material-appropriate methods, professional extraction, realistic stain limitations and drying guidance over absolute phrases such as ?every stain,? ?like new,? broad health outcomes or vague environmental claims.

## Measurement principles

When evaluating future homepage changes, useful signals include:

- quote submissions and completion rate;
- phone clicks;
- service/location page navigation;
- campaign attribution;
- mobile versus desktop conversion;
- Core Web Vitals;
- qualified-lead and booked-job outcomes once a private lead system exists.

Visual preference alone is not evidence that a layout performs better.

## Research references retained from the original study

The original research drew directionally from sources including:

- Google Search Central people-first content and page-experience guidance;
- Google Business Profile guidance;
- Nielsen Norman Group homepage/carousel usability research;
- W3C accessibility guidance;
- Competition Bureau Canada guidance on environmental/performance claims;
- IICRC upholstery-cleaning standards/context;
- HomeStars, BrightLocal, Jobber and Tinuiti consumer/home-service research;
- local and North American upholstery/carpet cleaning competitor sites.

Those sources supported research direction; they do not define SoftNest operational promises. Any price, service boundary, guarantee, response time or cleaning claim must match current SoftNest operations before publication.

## Current source files

For the implemented homepage use:

- `src/app/page.tsx`
- `src/components/HomeHero.tsx`
- `src/components/HomeSections.tsx`
- `src/components/HomeResultsCarousel.tsx`
- `src/components/HomeVideoShowcase.tsx`
- `src/components/HomeFaqExplorer.tsx`
- `src/content/pages.ts`
- `scripts/content/normalize.mjs`

If these change materially, update the current docs first; this historical record only needs another status note if its relationship to production changes.
