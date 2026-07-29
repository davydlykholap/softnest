# SoftNest Fabric Care

The SoftNest website is a statically exported Next.js application deployed to
GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production output

```bash
npm run build
```

Next.js writes the deployable website to `out/`. The GitHub Pages workflow
builds the application and uploads that generated directory automatically.

## Location pages

Location content is maintained in `src/data/locations.ts`. The shared
`src/app/location/[city]/page.tsx` route generates one static page for each
city during the production build.

URLs use the singular location prefix:

```text
/location/
/location/toronto/
/location/mississauga/
```

Adding a new entry to the location dataset automatically adds its generated
page, footer link, static route and sitemap entry.
