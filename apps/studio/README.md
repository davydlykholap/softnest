# SoftNest Content Studio

- Address: https://studio.softnestcare.ca
- Project/dataset: u0x0al83 / prod.
- Output: apps/studio/dist/.
- Compiled hosting repository: davydlykholap/softnest-studio.

From the root: npm ci; npm run dev:studio; npm run content:types; npm run check:studio; npm run studio:deploy.

Deployment uses the saved GitHub sign-in and publishes compiled public assets only. DNS is a Namecheap CNAME for studio pointing to davydlykholap.github.io.

Public configuration overrides are documented in .env.example. Shared defaults and URL validation come from @softnest/content. Type generation writes the website's src/sanity/sanity.types.ts.

Hosted Website preview shows deployed content. Local website draft preview is a separate authenticated command. See ../../docs/publishing.md.
