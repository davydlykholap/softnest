# SoftNest Fabric Care

Production website for SoftNest Fabric Care, a GTA upholstery and carpet cleaning business.

## Stack

- Next.js 16 + React 19 + TypeScript
- static export hosted on GitHub Pages
- Sanity Studio for public structured content
- Web3Forms for current browser-side quote delivery
- Google Ads/attribution tracking

Published Sanity content is validated and converted into build snapshots under `src/content/generated/` before Next.js renders the site. Generated content is not hand-edited or committed.

## Development

```bash
npm ci
npm ci --prefix studio
npm run dev
```

Sanity Studio:

```bash
npm run studio
```

Production website validation:

```bash
npm run check
npm run test:e2e:built
```

`npm run test:e2e` runs the production build/check first and then executes the Chromium smoke and accessibility suite. CI/deployment runs the rendered checks automatically after the static export is built.

After a Sanity schema change:

```bash
npm run content:types
npm run studio:check
npm run check
```

## Documentation

Start with [`docs/README.md`](docs/README.md). `docs/current-state.md` is the authoritative architecture/status handoff. The two research/blueprint files are explicitly historical and are not current implementation specifications.

## Public site

[softnestcare.ca](https://softnestcare.ca/) ? [Get a quote](https://softnestcare.ca/quote/)

### Runtime and dependency checks

Use Node.js 24.16.0 (`.nvmrc`) and npm 11.14.1 for local and CI installs. Run `npm ci`, `npm ci --prefix studio`, and `npm run audit:dependencies`. The audit gate preserves temporary, exact-version exceptions for two unpatched CLI/lint advisories; it blocks new moderate-or-higher findings, critical findings, changed versions, and expired exceptions. Review `dependency-audit-exceptions.json` weekly.
