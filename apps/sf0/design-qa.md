# SF0 implementation QA

Date: 3 November 2026, America/Toronto.

## Target and evidence

Selected design: third image of the final ideation set, with the user's requested pale-green sidebar revision. Source: `C:/Users/davyd/.codex/generated_images/01a19f71-154a-7082-a546-208602594abc/exec-20f31c63-9dab-46d1-a4f3-6c193fb4ac97.png`.

Evidence directory: `C:/Users/davyd/.codex/visualizations/2026/11/03/01a19f71-154a-7082-a546-208602594abc/`.

- `sf0-approved.png`: approved reference, 1585 × 992.
- `sf0-desktop.jpg`: rendered conversion report, browser viewport 1585 × 992.
- `sf0-mobile.jpg`: rendered conversion report, browser viewport 390 × 844.
- `sf0-comparison.png`: source and normalized render together, reference on the left.
- `sf0-comparison-detail.png`: source and render funnel/detail regions together.

The browser supplies compressed JPEG evidence at approximately 1571 × 983 for the desktop viewport. The comparison normalizes it to the source dimensions. JPEG compression limits pixel-level antialiasing judgments; typography family and geometry were also checked through rendered DOM/computed styles. This is visual fidelity review, not a pixel-diff assertion.

## Iteration

Initial P2: the metric band, inspector and table accumulated excess height, putting the footer below the 992px viewport (observed footer at y1032). Reduced the metric band's vertical padding, inspector text spacing and desktop table-row padding. Final rendered footer bottom is y967, the document width equals 1585px and the complete report is visible. Re-captured and compared the full viewport and focused region after the changes.

Mobile P2: the offscreen menu initially remained available to keyboard/accessibility navigation. Closed mobile navigation now uses visibility:hidden; opening it restores visibility. Verified selection changes the report and closes the menu.

No outstanding P0/P1/P2 fidelity issues were identified in the final comparison.

## Required fidelity surfaces

- **Typography:** locally bundled Inter at 400/500/600 weights, restrained 30px desktop title, thin 13–14px controls and labels. Computed main font is Inter/Segoe UI/Arial. Minor generated-image glyph differences are expected; no serif or heavy display face was introduced.
- **Spacing/layout:** preserved the 68px rail, 214px contextual navigation, open three-metric band, proportional funnel, adjacent inspector and full-width channel table. Fine dividers and compact controls follow the reference. Verified both desktop and mobile, with tables scrolling inside their own container rather than overflowing the document.
- **Colors:** rail #dcebe1, context menu #eaf3ed (verified as rgb(234,243,237)), active row #cee3d5, dark green navigation text and white main surface. No dark sidebar or gold CTA was reintroduced.
- **Assets/icons:** real SoftNest emblem retained at small scale. Standard Phosphor icons match the thin line style; SF0 uses the library circle mark. No raster art was replaced by CSS illustration. The funnel uses semantic meter elements to represent data.
- **Copy/content:** primary title, explanatory text, metrics, funnel stages and channel totals follow the reference. Sample data is explicitly identified. Provider setup does not claim a working connection. Current-date metadata uses runtime date with the selected reporting timezone.

## Functional checks in the in-app browser

- Every navigation destination rendered meaningful content without browser errors or framework overlays.
- Journey dialog opens, shows aggregate totals and closes correctly.
- Channel filtering recalculates visible totals; Users changes the count and funnel denominator.
- Seven-day period selection changes the sample report totals.
- Invalid CSV with submissions greater than starts produces a validation error.
- Valid two-channel CSV changes the report to 150 sessions, 15 starts and 5 submissions, with an Imported data label.
- Reload retains imported totals. Users is disabled when the import omits that optional column.
- Restoring sample data resets the original report.
- Mobile menu opens and selecting Overview changes the report and hides navigation. The conversion screen has no document-level horizontal overflow.
- Overview chart loads through its lazy module; browser console checks returned no relevant errors or warnings.

## Validation and limits

- Original SF0 production build and eight data/runtime tests passed. The subsequent Namecheap migration replaced the Worker tests with static-output/archive checks; see the migration note below.
- Public-site `npm run check` passes: content validation, ESLint, focused tests, TypeScript, static build and exported-link verification.
- The schematic local-ranking grid is a deliberate sample view, not a real geographic scan. Live provider integration, server-side OAuth, scheduled sync and session-level path analysis remain future backend work.
- No automated whole-suite accessibility audit or private-data authorization testing is claimed. Keyboard controls, semantic tables, labelled inputs, native modal focus and mobile menu visibility were checked within the implemented flows.

Final implementation checklist: approved light navigation retained; reports and core controls functional; source labels honest; desktop/mobile layout checked; build/runtime/data tests passed.

final result: passed

## Hosting migration — 3 November 2026

The user selected Namecheap. Build output now consists of static `dist/` files, with a ready-to-upload ZIP. Removed the earlier hosting manifest, Worker and packaging helper. Visual layout and report behavior are unchanged. The help dialog now accurately explains that private access requires configuring Namecheap cPanel Directory Privacy, rather than assuming the previous provider's account protection. Hosting/DNS/SSL activation is pending and is not covered by the earlier visual pass.

Migration verification: `npm run package:namecheap` passed and all seven current data/static-build/archive tests passed. Opened the production static output at `http://127.0.0.1:4174/` in the in-app browser: conversion report rendered, help dialog showed the Namecheap Directory Privacy instructions, and console checks returned no errors or warnings. The former provider's custom-domain list is empty after removal of the pending association. No DNS records or Namecheap hosting account settings were changed.

## GitHub Pages hosting update — November 4, 2026

The user clarified that Namecheap supplies DNS only and no cPanel account exists. The earlier cPanel hosting section above is historical. SF0 now publishes compiled output to davydlykholap/softnest-sf0 at sf0.softnestcare.ca. The help note accurately describes public access and browser-local imports. Build/data/archive checks are included in the workspace validation.
