# SoftNest public website

- Address: https://softnestcare.ca
- Stack: Next.js 16, React 19, TypeScript, static export.
- Editorial source: Sanity u0x0al83 / prod.
- Output: apps/website/out/.
- Hosting: GitHub Pages in davydlykholap/softnest.

From the repository root: npm ci; npm run dev:website; npm run check:website; npm run test:e2e.

Copy .env.example to this app's ignored .env.local when overrides or local draft-preview tokens are required. Private tokens never use NEXT_PUBLIC_. Public defaults are in @softnest/content and src/lib/integrations.ts.

Routes live under src/app/. Content sync creates src/content/generated/ from published Sanity data. content/ contains editorial and recovery material rather than replacing the live CMS.

After changing local WebP assets, run npm run images:generate at the workspace root and include the responsive derivatives and manifest. Keep public URLs stable.

The existing deploy-pages.yml workflow publishes this app. Sanity Publish triggers that workflow automatically. See ../../docs/publishing.md.
