<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SoftNest workspace

- apps/website: public Next.js website at softnestcare.ca.
- apps/studio: Sanity editor at studio.softnestcare.ca.
- apps/sf0: independent SF0 workspace at sf0.softnestcare.ca.
- packages/content: shared public CMS identifiers, URL helpers and defaults.
- infra/hosting/apps.json: deployment destinations. infra/dns/records.yaml: DNS inventory.
- Use npm workspaces from this root. npm ci installs all apps; npm run check validates the workspace.
- App-specific instructions stay in each app's AGENTS.md. Preserve SF0's product name and design.
- Apps must not import another app's src/ internals; npm run check:boundaries verifies this.
- Local credentials belong in ignored app-specific environment files. Reports, logs and release ZIPs belong under ignored artifacts/ folders.
- All three sites use GitHub Pages. Namecheap manages DNS only; there is no cPanel hosting account. Preserve separate compiled deployment repositories for Studio and SF0.
- deploy-pages.yml is part of the active Sanity publication webhook contract. Keep its filename stable unless the webhook is updated at the same time.
