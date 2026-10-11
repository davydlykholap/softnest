# City-page removal and Oakville copy review

Reviewed the local website and `C:/Users/davyd/Downloads/softnest-oakville-page.md` on October 11, 2026.

## Change completed

Removed the white care card below the hero and the complete service section (heading, introduction and linked image tiles) from the shared city-page component. This applies to all nine enabled city pages. Reviews now follow the hero when reviews exist; otherwise the process section follows it.

The proposed full Oakville replacement has not been implemented in this first removal pass. Existing content records, metadata, FAQs and service structured data remain available.

## Measured word counts

Counts below use the initial desktop page's visible `main` text, including headings, buttons, review excerpts and FAQ questions. They exclude the header, footer, image alt text, metadata, structured data and FAQ answers that appear only after interaction. Words are whitespace-separated tokens containing a letter or number; standalone decorative symbols do not count. These are layout-copy measurements, not a measurement of Google's indexing.

| City | Before | Care card removed | Service section removed | After |
| --- | ---: | ---: | ---: | ---: |
| Mississauga | 635 | 73 | 32 | 530 |
| Toronto | 637 | 77 | 31 | 529 |
| Brampton | 633 | 77 | 31 | 525 |
| Oakville | 632 | 77 | 31 | 524 |
| Etobicoke | 643 | 77 | 31 | 535 |
| Burlington | 636 | 77 | 31 | 528 |
| Vaughan | 632 | 77 | 31 | 524 |
| Milton | 637 | 77 | 31 | 529 |
| Hamilton | 638 | 77 | 31 | 530 |

Oakville loses 108 words, approximately 17% of its initially visible main text. Most removed language was shared among cities, with the city name substituted. The service section displayed short tile titles rather than the service descriptions stored in the content records.

## Oakville draft

The draft contains approximately 618 words of proposed English page copy under the same token convention. This includes the H1, FAQ questions and answers, and CTA, but excludes editorial section labels, SEO metadata, Russian notes, photo/review placeholders and the Google review-link line. Final rendered headings and verified reviews will add words. This is not directly comparable to the initial-page counts above, which include existing review excerpts and exclude unopened FAQ answers.

| Draft copy block | Words |
| --- | ---: |
| H1 | 6 |
| Hero subheading | 27 |
| Introduction | 68 |
| Real Oakville work example | 39 |
| Sofas | 45 |
| Carpets | 38 |
| Area rugs | 32 |
| Other services | 25 |
| Why Oakville books SoftNest | 86 |
| FAQ questions and answers | 184 |
| Service area | 46 |
| CTA | 22 |

No explicit target word count or Muse acceptance criteria appears in the attachment. The draft's competitor and keyword research assertions have not been independently verified.

## SEO implications and copy recommendation

Google states that content length alone does not determine ranking and gives no magical word-count target, minimum or maximum. A Muse word target can be an editorial requirement, but it does not establish Google acceptance or guarantee rankings. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

The more useful distinction is meaningful local information. Google asks whether location-oriented pages provide useful value rather than duplicate pages that funnel people to the same destination. Reusing a layout alone does not establish a violation. [Google's doorway-page guidance](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages)

The draft provides clearer service explanations and specific fabric/treatment detail. Its strongest local differentiator is the actual Oakville job example, supported by real photos if available. Preserve that example, the introduction, service paragraphs, FAQs and neighbourhood coverage when implementing the full page. Repeating Oakville in otherwise shared text does not by itself make the content meaningfully local.

The current template does not display `location.introduction` or `location.localConsiderations` in its page body. The introduction is used in Service structured data, while the local-considerations paragraph is not used by this template. Counting those stored paragraphs as visible SEO copy would overstate the current page's content. Restore useful city-specific paragraphs as readable body copy in the future page design.

Before publishing the draft, substantiate its operational promises: final tax-inclusive pricing, unchanged quotes, drying expectations, sanitizing, enzyme treatment and protection performance. Verify that the job example and any reviews attributed to Oakville are accurate. The attachment's photo and review placeholders should be fulfilled with real evidence or omitted from the public page.

The service-tile removal also removes four body links to service pages on Oakville. Include relevant contextual service links in the replacement paragraphs so readers can still explore individual services.

## Verification

- All nine city routes returned HTTP 200 and contained neither removed section.
- Before/after text differences matched the removed sections on each route.
- Rendered JSON-LD parsed successfully on every city page.
- Inspected Oakville desktop and mobile screenshots; mobile had no horizontal document overflow.
- Targeted ESLint and TypeScript checks passed.
