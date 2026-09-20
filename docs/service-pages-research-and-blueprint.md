# SoftNest service pages: audit and recommended blueprint

Reviewed 2026-09-19. This is a content and layout recommendation, not a claim that competitors' cleaning results or promises are proven. It uses the current Next.js source, generated Sanity snapshot, quote form, and public service pages. See [project guide](project-guide.md) for content ownership.

## Recommendation in one sentence

Keep the shared service-page system, but make most pages substantially shorter. Give each item a direct answer, a compact scope and expectation note, one relevant proof point when available, and an easy quote action. Add more detail only when the service has a meaningful decision or risk to explain.

## What comparable companies do

| Company/page | Observed structure | Useful lesson for SoftNest |
| --- | --- | --- |
| [Chem-Dry Toronto upholstery](https://metro.chemdry.ca/services/upholstery-cleaning/) | Direct service promise and quote CTA, differentiators, method, special pet treatment, FAQs | Lead with a service-specific answer; cross-link a problem-based treatment when relevant. |
| [Chem-Dry Toronto pet odour](https://metro.chemdry.ca/services/pet-odor-removal/) | Problem and treatment in hero, process, local reviews, FAQs, service areas, repeated quote action | Explain the depth of contamination and show evidence tied to the concern. SoftNest should retain its more qualified outcome language. |
| [COIT Canada carpet](https://ca.coit.com/residential/carpet-cleaning) | Fibre and traffic-lane explanations, detailed process, visit/drying guidance, appointment preparation, optional treatments | Practical preparation and scope details can be more useful than another generic benefit list. |
| [Love Your Rug Toronto](https://www.loveyourrug.ca/rug-cleaning-toronto/) | Rug-specific logistics, pickup and return time, visible price examples, quote CTA | Be explicit about *on-site suitable rugs* versus specialist/off-site rug work. Explain pricing even if SoftNest does not publish fixed prices. |
| [Fabrifresh Toronto](https://www.fabrifresh.ca/) | Service categories, equipment/process explanation, customer reviews, service areas, quote CTA | Real reviews, real work, and a clear local identity are stronger than broad marketing adjectives. |
| [Fabrifresh dining chairs](https://www.fabrifresh.ca/services/dining-chair-cleaning-toronto/) and [armchairs](https://www.fabrifresh.ca/services/upholstered-chair-cleaning-toronto/) | Both pages repeat a long introduction, benefits, inclusions, and the same seven-step method | This is evidence that competitors often use long templates; it is not a reason for SoftNest to match their length. A visitor to a narrow item page needs a few specific answers. |

These are recurring patterns, not a template to copy. Some competitor pages make absolute stain, odour, health, or drying claims. SoftNest's qualified, fabric-specific language is a strength.

## Current SoftNest setup

- Ten published service records feed one `ServicePage` React template. Sanity owns editable service copy; React owns the layout. The site is a static Next.js export on GitHub Pages, so preserve published slugs while revising content.
- The current order is hero → intro summary → common concerns → included → four-step process → drying/limitations → FAQs → related services → final CTA → related guides. It is thorough, but the first three content blocks often restate the hero and one another.
- The hero uses the same generic three assurances on most pages. Some page images are reused or only loosely connected to the service: upholstery and sofa share an image; leather uses a room photo; armchairs use a sectional image; stairs use a carpet image.
- Eight approved cleaning projects and nineteen approved testimonials exist in the generated snapshot. The service template does not display either. Five service pages have a directly tagged project: sofa, sectional, carpet/rug, mattress, dining chairs. Other pages need new approved work or a carefully selected related example clearly labelled as such. Several testimonials are untagged; review their content before adding service references.
- The quote form asks for item categories and details, but it has no photo upload. Photos are requested through Instagram or Facebook. The service hero's “Free photo estimate” message should state that path plainly or the form should gain a supported upload channel. The form's “Carpet or rug” option covers stairs through a follow-up choice; pet odour is a notes field, not a visible option.
- Pricing information is mainly in a few FAQs. The pages do not give a consistent, visible explanation of quote factors, inclusions, optional work, or when the total is confirmed. Do not publish ranges or a fixed-price claim until the business confirms them.
- Related guides exist for sofa, upholstery, carpet, stairs, sectional, and pet treatment. There are no service-related guides for every page; the optional guide block should not be forced onto all pages.

## Lean shared page structure

Most pages need four compact parts, with no target word count:

1. **Hero:** exactly what SoftNest cleans, who it suits, GTA coverage, quote action and phone. Use a real image when possible.
2. **Scope and expectations:** a short list or paragraph covering what is included, the one or two likely exclusions, drying/use guidance, and the main price factors. This replaces separate summary, concern, inclusion, process, and limitation blocks.
3. **Proof when it fits:** one approved result *or* one relevant review, close to the service description. Link to the full gallery/reviews if useful. Omit this block when there is no matching evidence.
4. **Closing quote action:** tell visitors what details to send and how photos are actually submitted. Add two or three FAQs only when they answer questions not already covered above. Related service links can be small and secondary.

Longer content is warranted for carpet versus rug suitability, leather finish compatibility, mattress use after drying, and pet contamination depth. Those are real decisions. Dining chairs, armchairs and stairs generally need a short scope note rather than a standalone process section. The current 650px hero and multiple 104px-spaced sections make narrow pages feel longer than the information requires, especially on mobile.

## Page-by-page direction

| Page | Keep and emphasize | Add or change | Trim or avoid |
| --- | --- | --- | --- |
| **Upholstery cleaning** | Broad fabric assessment and what furniture qualifies | Make this the umbrella choice page: sofa, sectional, chairs, ottoman, headboard if actually offered; link to the specific pages; explain fabric suitability versus leather. | Avoid repeating the sofa page's exact concerns and process. It currently shares the sofa hero image. |
| **Sofa & couch** | Armrests/headrests, body oils, cushions, old stains, two-to-four-hour qualified drying | Show a tagged sofa result and sofa review; make cleaning scope explicit for back, sides, removable cushions, pillows; show quote factors near CTA. | Remove the duplicate summary band and broad generic assurance cards. |
| **Leather upholstery** | Cleaning, conditioning, protection as one confirmed service; limits around peeling, cracking, suede/nubuck | Show actual leather work and a leather image once available; explain suitable leather finishes and what each step does. Be clear it is not fabric extraction. | Do not use a generic living-room photo as service proof or imply conditioning repairs damaged finish. |
| **Sectional & furniture** | Piece/seat count, removable cushions, larger scope | Explain how modules, chaises, ottomans, recliners, and cushions affect the quote and visit; show a tagged sectional result/review. | Narrow the title/body so this page does not become another general upholstery page. |
| **Carpet & area rug** | Fibre/backing inspection, high-traffic soil, on-site extraction and specialist-rug limitation | Clearly split wall-to-wall carpet and *suitable on-site area rugs* within the page; explain furniture moving, room/area measurement, rug suitability, and preparation; show the tagged carpet result. | Avoid implying every area rug can be cleaned at home. Consider separate pages only if the services and evidence support distinct offers. |
| **Mattress** | Controlled moisture, sides quoted, drying before bedding | State top/both sides, box spring and bed-frame scope, whether same-night use is practical, and quote inputs; show the tagged result. | Avoid sanitization, allergen-removal, or sleep-health claims without evidence. |
| **Dining chairs** | Seat versus upholstered back, food marks, matching sets | Explain per-chair count, seats/backs, drying and when a set can be used; show the tagged chair result and review. | Cut the generic four-step process if it adds no chair-specific information. |
| **Armchair & recliner** | High-contact arms/headrests and care around mechanisms | Distinguish fixed armchairs from manual/powered recliners, footrests, access, and movable parts; collect a matching result. | Do not use a sectional photo or suggest mechanical repair. |
| **Carpeted stairs & hallways** | Treads, risers, landings, traffic wear, safe use while drying | Explain which step surfaces are quoted, stair count, access and temporary use guidance; obtain stairs-specific imagery/result. | Replace the generic carpet result hero image and repeated carpet process. |
| **Pet stain & odour** | Depth assessment, dry-state reassessment, replacement limits | Make the diagnostic path central: material, accident age, number of spots, previous products, underlay/foam risk, and when surface treatment may not solve the source. Add a visible pet-accident detail in the quote flow. | Avoid guaranteed odour elimination. A sofa project is pet-related but is only tagged as sofa; add a pet-service tag after verifying the record. |

## Priority and implementation fit

1. **Fix the promise-to-form gap first.** Change the photo-estimate instructions to the channels that work today, and make the service context carry into the quote request. A true upload feature can follow when the transport and privacy handling support it.
2. **Make proof and quote clarity compact and optional.** The CMS already has approved results and reviews with service references. Add one relevant item when available. A short quote-factor sentence is sufficient for most pages. Add structured fields only if a shared prose block cannot express the needed differences cleanly. Never hand-edit generated JSON.
3. **Rewrite the ten service records in Sanity to match their distinct intent.** Prioritize sofa, sectional, carpet/rug, mattress, dining chair, and pet treatment because those have existing work or strong customer questions. Confirm operational facts before publishing.
4. **Tighten the shared layout and mobile spacing.** Remove the duplicate intro summary and generic process grids. Merge concerns, inclusion, drying and limits into a concise scope/expectations block. Keep only genuinely useful FAQs.
5. **Fill proof gaps through normal jobs.** Capture permissioned before/after images and short job notes for leather, armchairs, stairs, and pet treatment. Use honest captions and show only approved material.

## Search and measurement note

Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) favours original experience and useful answers. This supports making each service page genuinely distinct, rather than expanding all ten with similar keyword copy. Keep FAQs only when they answer real customer questions. Google [ended FAQ rich results in 2026](https://developers.google.com/search/updates), so FAQ markup is not a search appearance opportunity. Measure qualified quote submissions and calls by service page after release, along with engagement with results and FAQs, instead of judging success by page length.
