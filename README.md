# SoftNest Fabric Care

SoftNest is a statically exported Next.js website with a separate Sanity Studio for public content management. The public site is deployed to GitHub Pages. Sanity owns editable website content; Next.js owns presentation and interaction. Supabase is intentionally reserved for future private business records such as enquiries, customers, quotes and jobs.

## Project layout

| Folder | Purpose |
| --- | --- |
| `src/app` | Public routes and route-level styling |
| `src/components` | Shared website presentation and interactions |
| `src/content` | Website-facing content selectors and generated build snapshots |
| `src/domain` | Business workflows such as quote submission |
| `src/sanity` | Sanity configuration, queries and generated query/schema types |
| `src/seo` | URL, metadata and structured-data helpers |
| `studio` | Sanity Studio application and content schemas |
| `content/articles` | Prepared article source/import records |
| `content/migration` | One-time migration snapshot for the first Sanity import |
| `docs` | Publishing, project and future-system documentation |
| `scripts/content` | Content validation, migration, preview and publishing automation |

See [`docs/project-guide.md`](docs/project-guide.md) for ownership rules and working practices.

## Install

The website and Studio have separate dependency locks:

```bash
npm ci
npm ci --prefix studio
```

## Website development

Normal development reads the current published Sanity dataset:

```bash
npm run dev
```

To inspect the original migration snapshot without touching Sanity:

```bash
npm run content:seed -- dev
```

The production-quality website check is:

```bash
npm run check
```

It validates content relationships, runs lint, builds the static export and verifies generated pages and internal links.

## Sanity Studio

Start the editor with:

```bash
npm run studio
```

Then open http://localhost:3333. The editor contains business settings, homepage/About content, services, service areas, FAQs, reviews, cleaning results, quote-form choices and blog content.

Studio validation:

```bash
npm run content:types
npm run studio:check
```

Follow [`docs/sanity-setup.md`](docs/sanity-setup.md) for the first import, the one-time public-ID repair (when applicable), draft preview and publishing workflow. Use `npm run content:import:check` before a first import into a new dataset.

## Content publishing

The intended workflow is:

```text
Edit in Sanity → Publish → GitHub Pages build/validation → softnestcare.ca
```

The repository includes a webhook setup script so published Sanity changes can trigger the deployment workflow automatically. Until that webhook is configured, run the GitHub Pages workflow manually after publishing.

Generated files under `src/content/generated/` are build snapshots. Do not edit them by hand.

## Services and locations

Services and service areas are CMS-managed records. A service area can exist operationally without publishing or indexing a landing page. Published page addresses remain:

```text
/services/<service>/
/location/<city>/
```

Do not casually change a published slug. GitHub Pages cannot provide normal Next.js request-time redirects, so URL changes need an explicit redirect strategy first.

## Blog

Blog posts are Sanity documents rendered through one shared article template. Prepared article source files are kept under `content/articles/` for migration traceability; after the first import, Sanity becomes the authoritative editable copy.

## Future Supabase use

Supabase is planned but deliberately not connected yet. See [`docs/supabase-plan.md`](docs/supabase-plan.md). It should be introduced with the first real private business-record workflow rather than as an unused dependency.
