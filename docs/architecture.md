# Workspace architecture

| Application | Runtime | Static output | Deployment |
|---|---|---|---|
| website | Next.js / React | apps/website/out | Source repository's GitHub Actions Pages deployment |
| studio | Sanity / React | apps/studio/dist | Compiled branch in softnest-studio |
| sf0 | Vite / React | apps/sf0/dist | Compiled branch in softnest-sf0 |

The root package.json coordinates npm workspaces. Each app declares its dependencies; the root lockfile records all resolved versions. SF0's React version remains independent.

packages/content owns public CMS identifiers, work URL/video validation and work-page defaults. Consumers use package exports. The website owns generated Sanity query types. Studio's maintenance import scripts deliberately call the website content normalizer; runtime app source does not cross app boundaries.

Website content: Sanity published documents → sync/validation → ignored generated JSON → Next.js static export → Pages. Draft preview is local-only. SF0 is independent and currently uses sample or local CSV data.

Hostname mapping: ../infra/hosting/apps.json. DNS: ../infra/dns/records.yaml. Source-folder moves do not require DNS changes.

Keep app source/tests/scripts/config under apps/<name>, shared code under packages, original assets under assets, and local screenshots/reports/logs/releases under ignored artifacts. Preserve public URL paths.
