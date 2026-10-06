# Service-page research record

Historical research snapshot: 2026-09-19

Current implementation status reviewed: 2026-10-02

> This file preserves the reasoning behind the service-page redesign. It is **not** the current implementation specification. Use `current-state.md`, `project-guide.md`, `src/components/ServicePage.tsx` and `src/components/ServiceDetailPanel.tsx` for current behavior.

## Original research conclusion

The research recommended shorter, more service-specific pages rather than repeating a large generic cleaning process on every service. The enduring principles were:

- answer what is being cleaned and what customers commonly need help with;
- explain inspection/material considerations when they matter;
- show one relevant proof item when available;
- set realistic drying/result limitations;
- avoid unsupported stain/odour/health promises;
- make the quote path simple;
- let narrow services stay short rather than padding them for SEO.

## Current shared service-page system

Ten published Sanity service records feed one shared route/template:

```text
/services/[service]/page.tsx
        ?
ServicePage
        ?
ServiceDetailPanel
```

The current page structure is:

1. service hero image/name/description;
2. concise service overview;
3. ?what we look at first? inspection note;
4. what the confirmed cleaning includes;
5. common examples/concerns;
6. one tagged cleaning result when available, otherwise one relevant review when available;
7. drying/use and realistic-result guidance;
8. service FAQs;
9. final quote CTA.

The September proposal to keep a generic four-step service process in the CMS was not carried forward. The current UI uses service-specific inspection/inclusion/expectation content instead.

## Current service CMS contract

The website currently uses:

- `name`, `menuLabel`, `shortName`;
- `metaTitle`, `metaDescription`;
- `heroDescription`;
- image and alt text;
- `summary`;
- `serviceType`;
- `concerns`;
- `included`;
- `drying`;
- `limitations`;
- FAQs/shared FAQs;
- related-service references;
- publication/navigation controls.

The following old fields are retired from the Studio schema and stripped from the generated service snapshot if older Sanity documents still contain them:

- `heroTitle`;
- `process`;
- `heroProofs`;
- `includedHeading`;
- `processHeading`;
- `afterCareEyebrow`;
- `afterCareHeading`.

Do not restore those fields just to match this historical research document.

## Proof behavior

`ServiceDetailPanel` requests the first approved cleaning project tagged with the current service. If none exists, it can use a featured testimonial tagged with the service. If neither exists, the proof section is omitted rather than showing unrelated evidence.

This makes accurate tagging in Sanity useful. Add service/location references only when the underlying work/review genuinely supports them.

## Quote behavior

The quote form still does not upload photos directly. Customers are told they can send photos through Instagram or Facebook. The form collects service/item choices and details, then submits to Web3Forms.

A true photo-upload workflow would require an intentional transport/privacy/storage design; it should not be implied by this historical research.

## Service-specific editorial principles retained

The original page-by-page review remains directionally useful:

- upholstery: clarify broad fabric/furniture scope;
- sofa/sectional: emphasize high-contact areas, cushions and seat/module count;
- leather: distinguish cleaning/conditioning/protection from fabric extraction and from repair;
- carpet/rug: distinguish wall-to-wall carpet from suitable on-site rugs;
- mattress: state requested sides and drying/use expectations;
- dining chairs: distinguish seat-only versus upholstered backs and set quantity;
- armchair/recliner: account for mechanisms and high-contact areas;
- stairs/hallways: define steps/risers/landings/traffic wear;
- pet treatment: explain contamination depth and avoid guaranteed odour elimination.

These are editorial guidelines, not a mandate to add more sections or fields.

## Historical competitor/research use

The September study reviewed local GTA and larger North American cleaning sites for recurring patterns such as direct quote CTAs, material/process explanations, proof, pricing clarity and service-area content. Competitor claims were never treated as evidence for SoftNest claims.

Future service-page changes should prioritize SoftNest?s real workflow, approved proof and customer questions over matching competitor page length.

## Current source files

- `src/app/services/[service]/page.tsx`
- `src/components/ServicePage.tsx`
- `src/components/ServiceDetailPanel.tsx`
- `src/content/services.ts`
- `studio/schemaTypes/business.ts`
- `scripts/content/normalize.mjs`
- `src/components/quote/*`

For current content ownership and validation rules, see `project-guide.md`.
