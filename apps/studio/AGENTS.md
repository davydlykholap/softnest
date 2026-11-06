# Content Studio

- This app edits the existing u0x0al83/prod Sanity project; do not create a replacement dataset during maintenance.
- Keep schemaTypes/ and components/ local to Studio. Shared defaults and URL helpers come from @softnest/content.
- npm run content:types at the root regenerates ../website/src/sanity/sanity.types.ts; include generated type changes when schemas change.
- Hosted Website preview shows deployed website content. Authenticated draft preview remains local to the website app.
- Build output is dist/. npm run studio:deploy publishes only compiled public files to davydlykholap/softnest-studio.
- Never place Sanity or GitHub credentials in Studio client configuration.
