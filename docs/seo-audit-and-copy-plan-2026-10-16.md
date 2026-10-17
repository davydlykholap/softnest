# SoftNest SEO audit and proposed copy

Reviewed October 16, 2026, America/Toronto.

This is the pre-implementation audit and copy proposal. The follow-up implementation preserves the homepage at the owner's request and does not add Hamilton emphasis. See `current-state.md` for the implemented linking, city copy, quote journey and GA4 setup. Website changes require deployment before they appear publicly.

## Conclusion

SoftNest already has a substantial SEO foundation. The attached plan combines existing capabilities, incomplete connections between those capabilities, editorial improvements, and business activities that cannot be verified from website code. It is not a list of 40 missing website features.

Keep the current site and URLs. Prioritize clearer homepage relevance, contextual internal links, useful local differentiation, and a reliable quote journey. Improve Google Business Profile and genuine local reputation alongside the website work. More words alone will not establish local authority or overcome searcher proximity in Maps.

## Scope and evidence

- Read the supplied “Complete SEO, Marketing & Website Improvement Plan,” current source files, generated published-content snapshots, and deployment configuration.
- Requested all 40 URLs in the live sitemap. All returned HTTP 200, each had one H1 and a matching self-referencing canonical URL, and none had a robots meta noindex directive. Every JSON-LD block encountered parsed successfully. This establishes a basic technical baseline, not schema eligibility, actual indexing, accessibility, speed, or rankings.
- Reviewed all nine city-page and ten service-page main-content link sets. Shared header/footer links were excluded from the contextual-link comparison; those shared links already provide useful navigation.
- Reviewed the 13 current blog records and their related-service links. All 13 live articles have related-service links in their main content.
- Examined the quote form and analytics code without submitting a real lead or changing integrations.
- Checked current Google documentation. No Search Console, GA4, Google Ads, GBP management data, keyword-volume dataset, booking history, or real-user performance measurements were available in this review.
- No production application files were changed. Existing local changes to `AnalyticsEvents.tsx` and the untracked `/card/` page were left intact.

## What is already present

| Area | Verified state | Implication |
| --- | --- | --- |
| City coverage | Nine enabled, indexable city pages: Mississauga, Toronto, Brampton, Oakville, Etobicoke, Burlington, Vaughan, Milton, Hamilton | Improve these pages rather than rebuilding the location system |
| Service catalog | Ten enabled service pages with individual titles, descriptions, inclusions, limitations and FAQs | Existing content can support broader service searches |
| Technical baseline | Working sitemap and robots.txt; canonical URLs; static page delivery; descriptive service/city titles | No demonstrated sitewide indexing block in the checks performed |
| Structured data | Organization/WebSite, Service, BreadcrumbList, BlogPosting and FAQPage in applicable templates | Markup exists; adding more is not the primary opportunity |
| City copy | Local introductions, neighbourhood coverage and some practical city distinctions | It is partially localized already, though substantial repeated language remains |
| Reviews | City-aware selection and honest general-review fallback already exist | Improve verified review data before rebuilding the component |
| Blog | Thirteen posts, each with links to related services | Strengthen relevance and first-hand usefulness; no need to invent a posting quota |
| Quote attribution | `?city=` prefill, hidden `source_city`, submission support, event parameters | Infrastructure is present; city-page CTAs do not supply the parameter |
| Form feedback | Success message, thank-you route, error handling and spam controls | A success state is not a missing feature |
| Analytics | Google Ads tag and quote/call/outbound events; UTM/session attribution code | Event code exists, but receipt and reporting configuration remain unverified |

## Status of all 40 recommendations

“Partial” means a foundation exists with a confirmed remaining gap. “Unverified” means code or public HTML cannot establish the business/account outcome.

| # | Report recommendation | Current status and remaining work |
| --- | --- | --- |
| 1 | Photo quote process | Partial. Residential/business form exists; no direct file input. Photos must be sent separately via Instagram/Facebook. Success feedback already exists. |
| 2 | Specific CTAs | Partial. Shared CTA component exists; free/tax-inclusive explanations appear on city pages. Better align the photo promise with the actual form journey. |
| 3 | Pricing and expectations | Partial. Drying, limitations and scope guidance exist. Confirm minimums, extras and the conditions of a final photo quote before strengthening promises. |
| 4 | Consistent contact details | Shared settings generate website contact links using the intended number. External directory/GBP consistency is unverified. |
| 5 | City-to-service links | Confirmed gap. All nine city-page main-content link sets contain no service-page links. Schema service URLs do not substitute for clickable body links. |
| 6 | Reverse/contextual links | Partial. Shared navigation/footer links and blog-to-service links exist. All ten service-page bodies lack city links and related-service links. |
| 7 | Locations directory | Already present, linked from navigation/footer, and linking to nine cities. Preserve it. |
| 8 | City-aware quote links | Partial. Quote form supports the parameter, but every city-page main-content quote destination is plain `/quote/`. |
| 9 | Actual keyword research | Unverified. Candidate phrases are reasonable hypotheses; search volume and query opportunities have not been established. |
| 10 | Existing city titles | Already present and descriptive. No urgent evidence requires replacing them. |
| 11 | Customer-oriented introductions | Partial. Service/city relevance is clear, but repeated chemistry, colour stability and extraction wording dominates several sections. |
| 12 | Individual city positioning | Partial. Milton move timing and Etobicoke condo access already appear. Oakville has less distinctive introductory copy. |
| 13 | Secondary services | Partial. Mentioned in “And more”; dedicated service pages exist, but city copy does not link to them. |
| 14 | Repeated advantages | Remaining editorial work. Fabric assessment, stain limits and photo pricing recur across multiple sections and cities. |
| 15 | FAQs | Already implemented with useful answers and an H2. Mobile native accordions include answers in HTML. Refine content rather than rebuilding structure. |
| 16 | Local reviews | Selection/fallback implemented. Current testimonial snapshot has no city-tagged reviews for Milton, Oakville or Etobicoke. Obtain or accurately tag genuine evidence. |
| 17 | Images | Responsive hero variants and descriptive image data exist. Authenticity, accuracy and measured payload efficiency still need normal review. |
| 18 | Maps | Lazy-loaded city map iframe exists on each city page. Its conversion/performance value is unmeasured; removal is not an SEO prerequisite. |
| 19 | Homepage relevance | Confirmed improvement. Live title is only “SoftNest Fabric Care”; hero text lacks a clear GTA/Hamilton service descriptor. A better default title exists in settings but is overridden. |
| 20 | Service-page quality | Substantially present: inclusions, suitability, drying, limits and FAQs. Add relevant local coverage and contextual navigation; refine repetitive generic passages. |
| 21 | Supporting blog | Already present: 13 articles and related-service links. Review factual support and add useful in-paragraph links where natural. |
| 22 | GBP audit | Unverified; requires profile/account inspection. A website profile link does not prove profile completeness. |
| 23 | GBP service areas | Website coverage exists; actual GBP entries and business operating limits are unverified. |
| 24 | Review workflow | Google review/profile links exist. Untracked `/card/` work also includes a review CTA. The operational after-job request process is unverified. |
| 25 | GBP photos | Unverified; cannot establish from repository imagery. |
| 26 | Citations | Unverified externally. Website settings alone do not confirm directory consistency. |
| 27 | Local authority | Unverified. Requires real partnerships, mentions and links, not additional city-name repetition. |
| 28 | Competitors | Not established by this review or a supplied keyword dataset. Compare organic and Maps competitors separately using location-aware results. |
| 29 | Performance measurement | No fresh Lighthouse, PSI or field measurements were run here. Static export does not prove good Core Web Vitals. |
| 30 | Image/embed optimization | Some optimizations exist, including mobile hero variants and lazy maps. Next Image is configured unoptimized; manually prepared assets must be evaluated on actual delivery. |
| 31 | Manual accessibility | Tests exist, but this audit did not repeat manual device, keyboard or screen-reader checks. Earlier scores are not current certification. |
| 32 | Reliable forms/uploads | Submission error/success handling and spam checks exist. End-to-end delivery remains unverified; upload-specific work becomes necessary if uploads are added. |
| 33 | Automated tests | Playwright/unit/accessibility checks and CI gates already exist. Add focused link/attribution assertions when implementing those changes. |
| 34 | Technical SEO maintenance | Basic sitemap/HTTP/canonical/meta/JSON parsing checks passed across all 40 sitemap URLs. Redirect variants, index selection and schema eligibility require additional validation. |
| 35 | Analytics configuration | Partial. Google Ads config and events exist; no explicit GA4 measurement-ID configuration is visible in the inspected setup. Connected destinations/account behavior remain unverified. |
| 36 | Search Console | Unverified; a repository cannot prove property setup or actual query performance. |
| 37 | Leads to bookings | Lead fields exist. No verified booking/revenue reporting connection was established. |
| 38 | City profitability | Not established; needs qualified leads, bookings, job value and travel/service costs. |
| 39 | Paid-ad improvements | Account results unverified. Evaluate with qualified bookings rather than treating website event code as proven campaign measurement. |
| 40 | Monthly optimization | A proposed operating process, not a website feature or demonstrated missing code component. |

## Highest-value next steps

### 1. Give each page a distinct search purpose

| Page type | Main purpose | Recommended copy emphasis |
| --- | --- | --- |
| Homepage | Brand and regional cleaning provider | Professional upholstery/carpet cleaning; GTA and Hamilton coverage; main services; trustworthy booking process |
| Service page | Explain a particular service across the operating area | Items treated, customer concerns, included work, limitations, pricing factors, related services, relevant cities |
| City page | Explain local availability and the practical visit | Service + city, actual coverage, access/planning details, local evidence, links to detailed services |
| Blog article | Answer an informational question | A direct useful answer, first-hand expertise, supported factual claims, a relevant next service step |
| Locations hub | Help visitors choose a service area | Clear coverage explanation and crawlable city links |

These are targeting hypotheses, not measured keyword priorities. Use Search Console queries/pages to refine them. Do not rename existing URLs merely to insert extra keywords, and do not create all 90 service/city combinations by default.

Keep the shared layout. Give each city a useful standalone answer to “Can you clean my items here, what should I expect, and what must I arrange?” A shared quote destination does not by itself make a useful city page a doorway page. The concern is low-value pages built primarily to capture near-identical searches.

### 2. Connect the existing pages in context

- City sofa text: link naturally to sofa cleaning, with a sectional link where the paragraph discusses sectionals.
- City carpet/rug text: link to the combined carpet/area rug service page without forcing identical links into every paragraph.
- “And more”: make mattress and pet-treatment mentions useful links; add other services only where relevant.
- Service pages: add a compact factual coverage paragraph linking to the appropriate city pages and the full locations hub.
- Service pages: render a small relevant selection from existing `relatedServices`. The data currently exists without a related-service block in the template.
- Blog: preserve existing related-service links; add an in-paragraph link where it genuinely helps. Do not attach three arbitrary city links to every general advice article.

Google recommends descriptive, crawlable contextual links, without an ideal link quota: [internal link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### 3. Correct the homepage title and first-screen service description

Proposed title: **Upholstery & Carpet Cleaning in the GTA & Hamilton | SoftNest**

Proposed meta description: **Professional sofa, upholstery, carpet and area rug cleaning across the GTA and Hamilton. Tell SoftNest what needs cleaning and request a free quote.**

The existing H1, “A Cleaner Home Feels Better,” can remain. Add a prominent service descriptor:

> Professional upholstery and carpet cleaning across the GTA and Hamilton.

Replace the supporting paragraph with:

> Refresh the sofas, sectionals, carpets and area rugs you use every day. SoftNest Fabric Care provides in-home cleaning, with the method matched to your furniture and clear advice about stains, drying and what to expect.

This makes the offering explicit without filling the hero with every city name. Publish “free quote” only if that remains the actual policy. Align the rest of the site with the real Hamilton coverage rather than implying Hamilton is part of the GTA.

### 4. Carry city context through the quote journey

Use `/quote/?city=milton`, `/quote/?city=oakville` and `/quote/?city=etobicoke` for the corresponding city CTAs. `HeroActionButtons` already accepts `quoteHref`; `QuoteLocationField` already reads the city parameter. This is mainly connecting existing features.

City-prefill and attribution are usability/measurement improvements; they are not direct ranking signals. Keep quote variants canonicalized to the main quote URL. Preserve original landing city separately from the service address a customer may edit.

Before adding more “send photos” copy, settle the actual submission flow. Today it requires a form plus a separate social message. Direct uploads or a clearly supported messaging flow can reduce that handoff. Do not claim the current form accepts photos.

## Proposed replacement city copy

These are editorial drafts based on current service/coverage records, not claims of newly verified jobs or customer demand. Preserve the existing reviews and page design. The drafts do not require a new before/after section. Confirm operational promises before publication, particularly tax treatment, quote conditions, rug suitability, minimum charges and access requirements. Existing city titles can remain during this first copy pass.

### Milton

**H1:** Upholstery, Sofa & Carpet Cleaning in Milton

**Hero:**

> Refresh well-used sofas, sectionals, carpets and area rugs with professional cleaning in Milton. Tell us what needs attention and request a free quote for your home, townhouse or condo.

**Introduction — Cleaning for the rooms you use every day**

> Everyday spills, pet accidents and busy family life can leave furniture and carpets needing more than routine vacuuming. SoftNest Fabric Care provides upholstery and carpet cleaning across Milton, including Old Milton, Beaty, Clarke, Dempsey, Ford and Harrison.
>
> Whether you need one couch cleaned or want to plan several rooms together, we confirm the items and areas before booking. Moving in or finishing renovations? Let us know your schedule so we can discuss cleaning after dusty work is complete and allow time for drying.

**Sofa and sectional cleaning**

> We clean sofas, loveseats and sectionals, paying attention to armrests, seat cushions and other areas where daily use leaves marks. Send a full photo of each piece, including the chaise, and point out any stains or odours. We assess the material before choosing the cleaning method and explain where permanent marks may remain.

Link “sofas” to `/services/sofa-cleaning/` and “sectionals” to `/services/sectional-furniture-cleaning/` in the implemented text.

**Carpet cleaning for rooms, hallways and stairs**

> Include bedrooms, basement carpets, hallways and carpeted stairs in your Milton request. Room dimensions, photos and stair counts help us understand the work. We explain the cleaning approach and expected drying conditions before you plan to use the area again.

Link the service mention to `/services/carpet-area-rug-cleaning/`; use the stairs service link where useful.

**Area rugs and other items**

> Want a rug cleaned during the same visit? Share its size, photos and care label so we can check whether it is suitable for in-home treatment. You can also ask about dining chairs, armchairs, mattress cleaning and pet stain or odour treatment when requesting your quote.

**Useful local FAQ — When should I schedule carpet cleaning around a move?**

> Tell us your move date and whether painting, flooring or other dusty work will still be happening. We can discuss a practical appointment time and the drying period to allow before furniture is placed back or rooms are used. A newly installed carpet does not automatically need deep cleaning.

**Coverage:**

> We serve Milton, including Old Milton, Beaty, Clarke, Dempsey, Scott, Ford, Harrison, Timberlea and Dorset Park. Send your postal code and any access details so we can confirm availability for your address.

**CTA:** Get a free Milton cleaning quote.

### Oakville

**H1:** Upholstery, Sofa & Carpet Cleaning in Oakville

**Hero:**

> Bring a fresher feel to your sofas, chairs, carpets and area rugs. SoftNest provides professional in-home cleaning across Oakville, with care matched to the material and clear expectations before work begins.

**Introduction — Practical care for well-used furniture**

> From a favourite couch in Glen Abbey to dining chairs in Bronte or a sectional in Joshua Creek, everyday furniture needs care that suits its material and condition. SoftNest Fabric Care offers upholstery, sofa and carpet cleaning across Oakville, including houses, townhouses and condos.
>
> Tell us about spills, visible marks, pet odours or general buildup. We assess what can reasonably be improved, explain the proposed work and confirm the scope before cleaning. You do not need to identify the fabric yourself; a photo of the care label helps us prepare.

These are examples of eligible items and coverage, not assertions that SoftNest completed jobs in those neighbourhoods.

**Sofa, couch and sectional cleaning**

> We clean loveseats, sofas and sectionals, including accessible cushions and high-use areas agreed in your quote. Send a photo of the whole piece and close-ups of any concerns. The material, construction and condition guide the treatment; some wear, colour loss and old stains can remain after cleaning.

**Carpets and area rugs**

> Ask about cleaning for bedrooms, living rooms, hallways and carpeted stairs. For area rugs, include the dimensions and care label so we can check the fibre and backing before recommending in-home treatment. We explain drying expectations and any limitations for the items you want cleaned.

**One request for several items**

> If you also need dining chairs, an armchair or a mattress cleaned, include them in the same request. Listing everything at the start helps us confirm the work and plan the appointment. Pet stain and odour treatment can be discussed for suitable furniture and carpets.

Link each relevant service mention to its existing detailed service page rather than creating extra Oakville service URLs.

**Useful local FAQ — What should I arrange for an Oakville condo appointment?**

> Include parking instructions, entry arrangements and any building rules with your request. Check whether your building requires an elevator reservation or documents from contractors, and tell us before booking so we can confirm whether the arrangements can be met.

**Coverage:**

> We serve Oakville, including Old Oakville, Bronte, Glen Abbey, Clearview, River Oaks, West Oak Trails, Palermo and Joshua Creek. Send your postal code to confirm service availability and appointment options.

**CTA:** Request your Oakville cleaning quote.

### Etobicoke

**H1:** Upholstery, Sofa & Carpet Cleaning in Etobicoke

**Hero:**

> Professional sofa, upholstery, carpet and area rug cleaning for Etobicoke houses, apartments and condos. Share what needs cleaning and your building-access details so we can plan the visit with you.

**Introduction — Cleaning planned around your home and access**

> SoftNest Fabric Care serves Etobicoke, including Mimico, the Kingsway, Islington, Alderwood and Long Branch. We clean everyday furniture and suitable carpets and rugs, whether you need one couch refreshed or several items treated in the same appointment.
>
> For apartments and condos, a little planning makes the visit easier. Tell us about parking, elevators, stairs and building time restrictions when requesting your quote. We confirm the work and access arrangements before booking, so you know what to prepare.

**Sofa and upholstery cleaning**

> From a compact apartment sofa to a larger living-room sectional, the cleaning method depends on the furniture in front of us. Send a full-item photo, the seat count and any care label. Point out spills, body-oil buildup or pet accidents so we can discuss realistic treatment and results.

**Carpet and area rug cleaning**

> We clean suitable carpets in bedrooms, living rooms, hallways and stairs. Share room sizes and photos to help us understand the scope. Area rugs need an additional check of their material, dyes and backing; we confirm suitability before recommending in-home cleaning.

**Mattresses, chairs and pet concerns**

> Include mattresses, dining chairs or armchairs if you want several items assessed together. For pet odours, tell us where the accident happened and whether it has been treated before. Contamination inside cushions or below carpet can limit the result, and we explain those limits before work begins.

Link sofa, carpet/rug, mattress and pet-treatment phrases to the relevant existing service pages.

**Useful local FAQ — Can you clean my furniture in an Etobicoke condo?**

> Yes, subject to confirming the work and suitable access. Include parking and loading instructions, your floor, any elevator reservation requirements and building restrictions. If your building needs contractor documents, tell us before booking so we can confirm whether we can meet its requirements.

**Coverage:**

> We serve Etobicoke, including the Kingsway, Islington, Mimico, New Toronto, Long Branch, Alderwood, Rexdale and Humber Heights. Send your postal code and access details to confirm availability for your address.

**CTA:** Get a free Etobicoke cleaning quote.

## Shared supporting copy and publication rules

Keep a concise shared FAQ set for genuine recurring questions: pricing factors, what is included, drying, preparation, realistic stain/odour limits and payment. Add local questions only when the answer contains useful local logistics. Do not rewrite every common answer simply to make it different.

Suggested pricing explanation, subject to owner confirmation:

> Your quote depends on the items, size, condition and treatment required. Include the full list of furniture or carpeted areas, your postal code and any access details. We confirm the agreed work and total price before booking; additional work is discussed with you first.

If the business policy is confirmed, add: “The agreed total includes tax.” Publish any minimum charge clearly where customers request a quote. Avoid “no extra fees” if parking, travel, changed scope or specialist treatments can change the agreed price.

Suggested service-page coverage paragraph:

> SoftNest provides this service across our GTA and Hamilton service area. Check availability in Milton, Oakville or Etobicoke, or view all service areas. Tell us your postal code and what needs cleaning so we can confirm the work and appointment options.

Link the three cities only on pages where those services are actually available there. The full locations hub can carry the complete list. Avoid repeating every city in every heading and every paragraph.

The other six city pages should follow the same editorial standard. Use verified coverage, actual access requirements, real job details and genuine customer questions. Do not assign invented demographic stories, typical problems or affluent-family positioning to a city without evidence.

## Local visibility beyond website wording

Organic city-page rankings and Google Maps rankings require related but different work. Google says local results depend mainly on relevance, distance and prominence/popularity. A good Milton page can help organic relevance; it cannot promise the same Maps reach as a business genuinely near every searcher. [Google local ranking guidance](https://support.google.com/business/answer/7091).

Audit the real GBP categories, services, hours, phone, website and coverage. Use an eligible service-area profile for the actual operating base; do not invent branches, storefronts or city addresses. [Business representation guidelines](https://support.google.com/business/answer/3038177).

Build a consistent request for honest reviews after completed jobs. Add accurate city tags only when customer/job records support them; do not rewrite reviews to add a location. Genuine team/process photos, useful local referrals, property-manager relationships and credible community mentions can strengthen trust without publishing more templated landing pages.

## Current SEO guidance that changes the emphasis

- FAQ rich results stopped appearing in Google Search on May 7, 2026; Google removed their documentation in June. Keep useful FAQs, but do not invest in FAQ schema expecting expanded search listings. Existing FAQPage markup is not an urgent defect. [Google documentation updates](https://developers.google.com/search/updates#may-2026).
- Titles should be descriptive and distinctive; the homepage has a clearer need than the already descriptive city titles. There is no need to chase a rigid character quota. [Title guidance](https://developers.google.com/search/docs/appearance/title-link).
- A custom meta description can help explain a page in search, but Google may generate a different snippet for a query. Write descriptions for relevance and customer choice rather than treating them as guaranteed displayed text. [Snippet guidance](https://developers.google.com/search/docs/appearance/snippet).
- Shared layouts are reasonable. Avoid low-value near-duplicate regional pages created primarily to capture searches and funnel visitors elsewhere. [Doorway abuse policy](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).
- Helpful original content and useful navigation matter more than an arbitrary word target. No copy change guarantees a number-one ranking. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Implementation locations

| Change | Actual source to edit |
| --- | --- |
| Homepage title/description | `src/app/page.tsx`; updating settings alone will not replace the current override |
| Homepage visible descriptor | `src/components/HomeHero.tsx` |
| City copy and FAQs | `src/content/cityPages.ts` |
| City-to-service links and final CTA | `src/components/locations/CityPageSections.tsx` |
| City hero quote destination | `src/components/locations/LocationPage.tsx`; pass the existing `quoteHref` prop |
| City prefill validation | `src/components/quote/QuoteLocationField.tsx` and quote submission tests |
| Service-page coverage/related links | `src/components/ServicePage.tsx` / `ServiceDetailPanel.tsx`, using existing service/location data |
| Service copy | Published Sanity records; generated JSON is overwritten during content sync |
| Reviews | Verify and update the testimonial records; existing selection logic supports local fallback |
| Analytics | `src/app/layout.tsx`, `src/lib/integrations.ts`, event/form code and the actual destination accounts |

The city copy file deliberately overrides generated location introductions, metadata, neighbourhoods and FAQs in `src/content/locations.ts`. Editing only those fields in Sanity will not change the overridden public copy. Keep one clear authoring owner or deliberately consolidate later. Do not hand-edit generated snapshots as a lasting fix.

Production is a static export on GitHub Pages. Content changes must pass through a successful build/deployment to appear publicly. Verify the deployed pages after publishing, not just the source or CMS preview.

## Suggested rollout and measurement

1. Establish Search Console page/query/indexing baselines for the homepage and the three target cities. Confirm what analytics actually receives before using events as performance evidence.
2. Implement contextual links and city-prefilled CTAs. Update homepage relevance. These changes do not require a redesign.
3. Review business promises, then publish the three city-copy improvements. Record the publication date. Preserve the existing URLs and accurate canonicals.
4. Resolve photo handoff friction, verify form delivery and confirm a single successful submission produces the intended conversion events. Test without creating duplicate production leads.
5. Improve genuine local reviews, GBP completeness and authoritative local mentions. Measure mobile performance on representative templates and fix demonstrated bottlenecks.
6. Compare query/page results over useful periods, such as 28-day windows and longer trends, considering seasonality, small samples and indexing timing. Track qualified leads, bookings and job economics alongside clicks. Make subsequent changes based on evidence.

Search Console page performance describes which page received clicks; it does not by itself prove the customer's home city. Likewise, a landing-page city is not necessarily the final service address. Keep these dimensions separate when judging which locations generate profitable jobs.

The work proposed here is a targeted improvement program. The current site is already organized and technically accessible in the checks performed; the opportunity is to make its existing content better connected, more useful and more credible locally.
