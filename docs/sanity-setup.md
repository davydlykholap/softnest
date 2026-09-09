# Editing and publishing SoftNest

## Start the editor

From the repository root, run `npm run studio`. Open http://localhost:3333 and sign in to the account with access to project `u0x0al83`, dataset `prod`.

The editor includes Business settings, Homepage, About, Blog posts, Services, Service areas, Common questions, Customer reviews, Cleaning results and Quote form choices.

## First content import

The source articles and existing website content have been prepared in `content/migration`. First run `npm run content:import:check` with `SANITY_API_WRITE_TOKEN` in the ignored `.env.local`, or log into the Studio CLI first. The check reads the current dataset, verifies relationships, slug conflicts and local image files, and reports what would be created without changing Sanity. Then run `npm run content:import` to perform the migration. The real import saves a local backup, uploads article images and creates only missing records in one transaction. Existing IDs are preserved. A different existing ID with the same article/service/location address stops the import for reconciliation.

**September 7 migration repair:** an early import used dotted document IDs. Sanity treats dotted IDs as private paths, which prevents the unauthenticated static website build from reading them. The corrected source uses hyphenated public IDs. If that early 57-record import has already been run, execute `npm run content:repair-ids` once before `npm run check`. The repair validates the anonymous website read before removing any legacy copies.

The prepared articles are:

1. **How to Remove a Stain from a Couch Without Making It Worse** — complete source text, five supplied images within the body, and a listing-card image.
2. **Why Did My Couch Stain Come Back After Cleaning?** — complete source text, text-only.

Original metadata proposed root-level addresses. These new articles use the established `/blog/` route. The source is kept in the inbox. The choosing-a-cleaner article and alternate drafts are retained but are not published by this import.

## Everyday article editing

Open **Journal → Blog posts**. Enter the title, excerpt, body, publication date and address. Use the separate Search title for a shorter search heading. Add body images between paragraphs, provide descriptive alternative text and optional captions. A cover can be used only for the blog card/social preview by turning off “Show cover above article.” Link related services through their reference fields.

Publication date is a display date, not a scheduler. Publish deliberately when the article is ready. Draft edits do not change the public website. New published articles appear on the blog listing and sitemap after the next successful deployment.

## Preview drafts locally

Run `npm run preview` in a second terminal, with a read token in `.env.local` (`SANITY_API_READ_TOKEN`). An existing write token can also be used locally. Then open Website preview in the editor, or http://localhost:3000. Outside localhost, the preview uses `SANITY_STUDIO_WEBSITE_URL` when set and otherwise opens the production site. The watcher refreshes the website content after saved edits. Incomplete drafts that fail validation leave the last valid local snapshot in place; read the terminal and correct the missing content. Restart the preview if its connection is lost.

This is a saved-draft page preview, not click-to-edit overlays or a public hosted preview. Hosted Studio previews show the published site. Draft preview is refused in GitHub Actions and must never be deployed publicly.

## Publishing the website

Normal builds use published Sanity content: `npm run check`. GitHub Pages runs the same checks before replacing the public site. Publishing requires a successful website deployment; the old site stays available if the build fails.

Automatic publishing is configured with `node scripts/content/configure-webhook.mjs`. It needs the Sanity token plus a fine-grained GitHub token in `.env.local` named `GITHUB_WORKFLOW_TOKEN`, restricted to this repository with **Actions: write**. Sanity stores the authorization header; it is never bundled into the website. The webhook triggers `deploy-pages.yml` on main for published creates, edits and deletions. It ignores drafts and release-version documents. Do not expose webhook configuration or share links containing its headers.

Until that webhook is configured, use the GitHub Actions “Deploy SoftNest to GitHub Pages” workflow's Run workflow control after publishing content. The run summary shows success or failure. Configure GitHub notification preferences for failed workflows if desired.

## Business records and content safeguards

Service-area coverage, published pages, search indexing and footer prominence are separate controls. Expanded cities need their own local content and map. Reviews/results only appear when approved; recorded cities and services must be accurate. Google rating is manually maintained and should be verified against its source. Hours should only be filled with actual business hours.

The production project is a public content dataset. Never store customer addresses, private notes, credentials or other internal records here. See `supabase-plan.md` for the separate future business system.

## Advertising configuration

The Google Ads tag and Web3Forms public identifiers have centralized defaults. Quote and phone conversions require their full `AW-…/label` destinations in GitHub repository variables matching `.env.example`. No conversion label is invented. A successful local form simulation does not verify real email delivery or Google Ads reporting.
