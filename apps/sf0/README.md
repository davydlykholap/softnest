# SF0 · SoftNest

Independent website and marketing workspace. Vite and React with compact neutral navigation, workspace-specific menus, and a local Auth.js/Express sign-in server. **The existing public snapshot at https://sf0.softnestcare.ca is not protected by this local server.**

## Run and verify

From the repository root:

```sh
npm ci
npm run dev:sf0
npm run check:sf0
npm run package:sf0
```

The app has its own dependencies and does not depend on the public website's Sanity sync or Next.js runtime. It uses React 19.2 independently of the other apps. See [AUTH.md](AUTH.md) to configure Google credentials. Without them, the local dashboard remains locked. Static SF0 publishing is blocked because Pages cannot run its authentication server.

## Features and data

Conversion funnel, website overview, acquisition, landing-page, event, search, content and schematic local-ranking reports; channel search/sorting/drill-downs, CSV export/import, workspace navigation and persistent preferences.

**No live Google provider is connected.** Reports use labeled sample data unless a channel CSV is imported. Site health displays an unconnected state. Date comparisons for sample reports are illustrative.

Integrations supports local account/property setup for GA4, Search Console, Business Profile, and Google Ads. Saved setup remains authorization-pending. See [CONNECTIONS.md](CONNECTIONS.md) for the live authorization and sync implementation plan.

CSV columns: channel,sessions,starts,quotes,users. Users is optional. Counts must be non-negative integers, quotes <= starts <= sessions, and channel names unique. Imports stay in browser storage on the current origin; they are never uploaded. Clearing storage or changing hostname starts a separate local dataset. Imported aggregates cannot be sliced into partial dates.

Authentication requires the local server and server-only Google OAuth configuration. Do not store credentials or private business/customer information in frontend builds. Signing in does not connect analytics providers.

## Existing GitHub Pages snapshot

The user clarified on November 4, 2026 that Namecheap supplies DNS only and there is no cPanel hosting account. This supersedes the earlier Namecheap upload plan.

- Source: apps/sf0/ in this workspace.
- Build: apps/sf0/dist/.
- Compiled hosting repository: davydlykholap/softnest-sf0, main at /.
- Pages custom domain: sf0.softnestcare.ca.
- Namecheap record: CNAME, host sf0, value davydlykholap.github.io, TTL Automatic.

`npm run sf0:deploy` now refuses static publication. The existing compiled repository and DNS have been preserved; no production changes were made. Local authentication does not protect the old public snapshot.

npm run package:sf0 also creates apps/sf0/artifacts/sf0-static.zip as a portable static release. The archive contains built files directly at its root, not source or credentials. The optional .htaccess file applies only on Apache and is ignored by Pages.

See ../../infra/hosting/README.md and ../../docs/operations.md. design-qa.md records the original visual and interaction checks. Unit tests cover CSV validation, safe export and period aggregation; static tests verify the build and archive.
