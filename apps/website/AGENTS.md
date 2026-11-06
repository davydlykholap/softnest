# Public website

This is the Next.js static website for softnestcare.ca. Read the relevant installed guide in ../../node_modules/next/dist/docs/ (or this app's node_modules/next/dist/docs/) before changing Next.js code. APIs in this version may differ from prior versions.

- Keep Next.js routes under src/app/ and public URL paths stable during directory changes.
- Use npm run dev:website, check:website and test:e2e from the repository root.
- Sanity is the live editorial source; src/content/generated/ is rebuilt and ignored.
- Shared public content contracts live in @softnest/content. Do not import another app's src/ tree.
- Local environment values belong in this app's ignored .env.local; .env.example documents names and public defaults.
- Build output is out/. The existing deploy-pages.yml workflow and Sanity webhook publish this app.
