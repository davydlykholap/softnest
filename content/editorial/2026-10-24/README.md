# SoftNest booking and care-guide update

Four new guides accompany revisions to all fourteen existing articles. Existing published addresses stay unchanged. Each article has a distinct search purpose, descriptive search metadata, contextual reading links and a cover saved as `editorial-cover.webp` in its article folder.

## New guides

- `/blog/what-is-included-in-sofa-cleaning/`
- `/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/`
- `/blog/stains-or-odours-after-professional-cleaning/`
- `/blog/what-to-expect-from-professional-carpet-cleaning/`

## Confirmed business details

Use written quotes only, with tax included. Parking and furniture movement are clarified with the customer. Water access can be a sink with hot water or another suitable supply. Customers can stay or arrange access if out. A reminder is sent the day before and a text around 20–30 minutes before arrival.

The agreed upholstery service includes stain treatment where needed, professional extraction, a thorough rinse, deodorizing and sanitizing, accessible upholstered areas including both sides of removable cushions where suitable, and air movers while working. Payment after service is already stated in the website FAQ. Follow-up wording invites customers to get in touch so a concern can be reviewed; it does not add unconfirmed remedies or published deadlines.

No team profiles or invented case studies were created. Project documentation remains separate from these educational articles.

## Images

All eighteen covers were generated with the built-in image_gen tool and visually inspected. Two were corrected to remove misleading laundry-care symbols and to show realistic fabric decking beneath removed sofa cushions. The exact prompt set and selected asset paths are in `image-prompts.json`. Covers are optimized WebP files, uploaded to Sanity, with descriptive alt text and a visible editorial-illustration caption. They are not evidence of staff identity, a customer appointment or a cleaning result.

## Publishing and recovery

`scripts/content/refresh-booking-guides.mjs` prepares the reviewed records and validates relationships with the full current website snapshot. `--preview` compiles a local-only preview snapshot. `--apply` publishes the set in one transaction guarded by the original article revisions, together with the confirmed fabric-service inclusion lists. The original records and service records are saved in ignored `content/backups/` files before changes. Private backup files are required for the guarded one-time refresh and are not a CI dependency. Normal website builds continue to read published Sanity content.

The content-contract test compares article identities rather than a fixed historical article count. Browser checks cover article addresses, metadata and editorial captions, plus a quote submission with optional extra notes left empty.
