# Editing and publishing

## Articles

1. Open https://studio.softnestcare.ca and sign in to the existing project.
2. Open Blog → Articles → Create.
3. Enter title, slug, excerpt, publication date and body. Optionally add cover/alternative text, author, categories and related services.
4. The current deployment checks additionally expect an SEO description and at least two H2 headings (Heading in the style menu). These requirements were discovered during the November 4 manual workflow test.
5. Let the draft save, then press Publish.
6. The webhook starts deploy-pages.yml on main. Wait for a successful build/CDN refresh and verify the public article and listing.

Publication date is display metadata, not a scheduler. Hosted Website preview displays deployed content. Failed builds preserve the current production site. Keep published slugs stable unless redirects are planned.

For local draft preview, put SANITY_API_READ_TOKEN in apps/website/.env.local and run npm run preview from the root. Draft preview is blocked in CI.

## Studio schema

Run npm run content:types, npm run check:studio and npm run check:website. Include regenerated apps/website/src/sanity/sanity.types.ts when changed. npm run studio:deploy publishes compiled editor assets and registers the existing external Sanity app.

## SF0

npm run sf0:deploy builds, packages, tests and publishes apps/sf0/dist to davydlykholap/softnest-sf0. Namecheap supplies the CNAME; GitHub supplies hosting/HTTPS. No cPanel account is required.

SF0 has no application authentication and contains sample reports/local CSV imports. Publishing does not connect live providers. Search exclusion is included in its build.
