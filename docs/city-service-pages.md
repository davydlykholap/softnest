# City-service page system

The 90-page system was deployed on October 17, 2026. The same static route system also supplies the current editorial refinements.

One route (`src/app/location/[city]/[service]/page.tsx`) and one server-rendered template (`CityServicePage`) generate the service/city combinations during the normal static build. The current reviewed configuration generates 90 pages: 10 services across 9 active cities. Existing city and service URLs remain intact. Homepage copy, title, H1 and design are unchanged.

## Ownership and controls

- Sanity continues to own the service facts: summary, included work, drying guidance, limitations and related services. It also supplies location lifecycle and indexability flags.
- `src/content/cityServiceConfig.ts` owns the reviewed website coverage and service-specific quote prompts/public labels. `"all"` enables the configured service profiles for that city. Replace it with an explicit slug list to restrict a city, or `[]` to disable its service pages.
- This coverage was explicitly expanded to all current services/cities at the user's request. The legacy Sanity `availableServices` references contain only four initially seeded services per city and do not control these new pages. Do not silently revert the website coverage to that seed list.
- `src/content/cityServiceEditorial.ts` owns a reviewed introduction and booking note for each of the 90 combinations. `cityServicePages.ts` adds conditional city access guidance and composes the pages. Active, enabled, indexable city records and enabled service records are required. Unknown combinations return 404; missing authored content fails the build.
- A new service requires its own factual profile. A new city requires local guidance and a coverage entry. This prevents new records from automatically publishing generic local pages without review.
- Generated JSON snapshots must not be edited by hand. Content sync will replace them, while these reviewed configuration modules survive sync.

## SEO and customer experience

Each generated page has its own title, meta description, H1, self-canonical URL, Service schema and breadcrumbs. City and service hubs link to the new pages, and the sitemap uses the same page collection as the route generator. FAQs use native details/summary with answers present in static HTML. No FAQ rich-result eligibility or ranking benefit is promised.

The layout keeps the shared quote and reviews actions in the first screen. On mobile a compact fixed quote bar remains accessible with space reserved at the end of the page. Content combines service facts with local planning guidance; there are no fabricated projects, reviews, local offices, travel times or neighbourhood demographics. The service image illustrates the service and is not claimed as a local job photo. Optional factual FAQs provide detail without long visible paragraphs.

The October 17 copy refinement uses a descriptive “What’s included” heading and keeps pricing factors visible outside the FAQ. `cityServiceCopy.ts` supplies reviewed plain-language versions of known CMS phrases. A changed/unrecognized source phrase falls back to the current CMS wording, preventing stale rewording from overriding newly edited service facts. Drying guidance and limitations continue to come directly from service records. Prospective-customer validation is prepared in `customer-page-validation.md` and has not yet been conducted.

Each local service page includes one relevant inline care-guide or general-service link from `serviceReading.ts`. Articles link back to relevant local services through their Sanity body content. Related article recommendations are selected by topic in `posts.ts`.

Customers can call, message through Instagram or Facebook, or choose the website form. Both the form and photos are optional. Keep that choice clear in FAQs and preparation guidance. Difficult or older marks can be assessed and treated to try to improve appearance; complete removal, repair or restoration is not promised. Do not replace this with a blanket refusal or a universal restoration guarantee.

The city-service design uses the existing `HeroActionButtons` component and shared city-page colours, fonts, sizing and surface tokens. There are no eyebrow labels, visible breadcrumb row or extra bottom navigation row. Shared header/footer navigation and the links from city/service hubs remain the browsing paths. The structured breadcrumb hierarchy still describes the real route structure.

These are composed pages, not 90 manually maintained documents and not runtime AI-generated copy. Metadata uniqueness alone does not guarantee rankings; add genuine local evidence when available and refine pages using Search Console and lead results.

## Quote handoff

All quote links on a local service page carry `?city=<slug>&service=<slug>`. The existing city input remains editable. Specific service profiles preselect the corresponding item category, and carpeted stairs also preselect the stairs/landing subtype. Preselection does not add a service notice or contact-method block above the form. General upholstery, leather and pet treatment retain the requested service only in the submission data without guessing which furniture item the customer owns. Category presentation and user changes remain authoritative for the requested items.

The payload retains a validated `requested_service` and the original city-service `landing_page`, separately from the customer's editable service location and selected items. Unknown service query values are ignored. No new external submission service or tracking destination is added.

## Validation

Run `npm run check` and `npm run test:e2e:built`. The city-service browser suite checks all 90 exported URLs, unique metadata, self-canonicals, sitemap entries, structured data, invalid routes, discoverability, responsive actions, accessibility and a mocked end-to-end quote. Synthetic requests are intercepted and never sent to the business.

It also checks that introductions remain distinct after removing the city name, that optional contact wording is present, and that the pages retain their concise content budget. The word budget is a layout safeguard, not a Google word-count recommendation.

After deployment, inspect representative URLs and the sitemap in Search Console, then verify real analytics receipt. Indexing and ranking are not guaranteed by deployment or sitemap inclusion.
