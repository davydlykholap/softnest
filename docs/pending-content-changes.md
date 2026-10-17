# Pending FAQ wording — October 17, 2026

The user requested local review only. Do not publish or push these changes until asked.

The revised city and city-service FAQs are in the working tree. Homepage and service FAQ copy remains owned by Sanity and is saved in these **unpublished drafts**:

- `faq-home-1`, `faq-home-2`, `faq-home-5`, `faq-home-6`, `faq-home-7`, `faq-home-10` (each prefixed with `drafts.`).
- The ten `service-*` documents (each prefixed with `drafts.`).

The city-service FAQs now cover quotes, drying, stain treatment and service-specific preparation without repeating the booking answer. FAQ answers use plain language and explain useful next steps.

The drafts restore “Can every stain be removed?”, add a straightforward call/text/website quote FAQ, keep photos optional, and explain that cleaning usually removes stains while permanent discolouration, dye loss or wear may only improve.

Use `npm run preview` to load Sanity drafts locally. A normal `npm run dev` or `npm run check` syncs published content instead; it does not publish drafts. Draft preview requires a local Sanity token and is prohibited in production CI.

When publication is authorized, review and publish only these sixteen FAQ/service drafts and the gallery draft described below, then validate the published dataset with the code changes before deployment. Do not publish unrelated drafts. Remove this pending note once the changes are live.

## Pending gallery addition

`drafts.cleaning-project-cream-sofa-reconstructed` adds a ninth homepage gallery comparison, using `/img/cream-sofa-before-after-reconstructed.webp` (1536 × 1024). The left half is an AI reconstruction of the supplied before condition in the after photo's camera angle; the right half uses the original clean photo, resized only. The user requested no visible caption. No city is assigned. The existing gallery images and slider behavior remain unchanged. The draft is unpublished.
