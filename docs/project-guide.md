# SoftNest project guide

For the current migration checkpoint and pending live steps, read [`current-state.md`](current-state.md) first.

## Where things belong

| Folder | Responsibility |
| --- | --- |
| `src/app` | Public page routes and page styling |
| `src/components` | Shared presentation and interactions; blog and location-specific pieces have their own folders |
| `src/content` | Website-facing content types, selectors and build snapshots |
| `src/sanity` | Sanity connection, query and generated schema/query types |
| `src/seo` | Page addresses, metadata and safe structured-data formatting |
| `src/domain` | Business workflows such as sending an enquiry |
| `studio` | Sanity editing application and content model |
| `content/inbox` | Original received files, local and ignored by Git |
| `content/articles` | Prepared article import records and editorial notes |
| `content/migration` | One-time import snapshot of existing public content |
| `content/backups` | Private, local backup taken before a CMS import |
| `docs` | Operating instructions and architectural decisions |
| `design/current` | Current design references; older references belong in `design/archive` |
| `public` | Assets intentionally served to website visitors |
| `scripts/content` | Import, validation, preview and publishing setup |

The repository root is for tool configuration and these folders. Do not put article uploads, ZIPs, screenshots or ad hoc notes there. Generated `.next`, `out`, `node_modules` and Studio build folders are tooling output, not source.

## Content ownership

Sanity owns public business information, service/location content, articles, FAQs, approved results, testimonials and editable homepage/About copy. React owns layout and interaction. Credentials belong in environment configuration. Supabase is reserved for a future private business-record workflow.

Migration JSON and prepared articles are import records after the first successful import. Make subsequent editorial changes in Sanity. Do not keep editing both copies. Imports use stable document IDs and never overwrite existing documents.

The site reads a complete validated content snapshot before each build. The generated files are ignored and must not be hand-edited. Normal builds read published Sanity content; an unavailable CMS or invalid content fails the build. There is no automatic fallback to old migration content.

`npm run content:seed -- dev` and `npm run content:seed -- check` are explicit local-only migration previews. They are forbidden in CI. Use them to inspect original migration content, not to preview new Sanity edits.

## Working practices

Keep changes focused, preserve existing page addresses, and run the checks relevant to the change. Never delete untracked work or generated-looking folders without identifying their owner. Preserve originals before editing received content. Use descriptive names for new images. Keep screenshots and temporary QA files outside committed source.

Document deliberate changes to the content model and regenerate TypeGen with `npm run content:types`. Website checks: `npm run check`. Editor checks: `npm run studio:check`. Content relationship and article-preservation checks: `npm run content:verify`.

Existing URLs must not change casually: Sanity references preserve relationships, but external links still depend on addresses. GitHub Pages does not provide request-time Next.js redirects. Agree on a hosting-compatible redirect strategy before changing a published slug.

Shared page copy uses fixed entries with descriptive labels. Keep existing entries and their keys. Tokens `{{phone}}`, `{{business}}`, `{{quote}}` and `{{city}}` pull shared values into text. Templates control the order and appearance; a general-purpose page builder is intentionally deferred. If a template deliberately adds or removes a `pageText` key, update the corresponding required-key contract in `scripts/content/normalize.mjs` and its migration data in the same change.
