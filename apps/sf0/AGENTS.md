# Prototype Instructions

## SF0 product decisions

- November 5 sign-in: use Google identity restricted to the three accounts in server/auth.mjs, with verified email and server-enforced sessions. No public signup or browser-only allowlist. Run authentication locally; the user does not want additional hosting. Google OAuth client setup is required before live sign-in works. Existing public Pages snapshots remain separate; static SF0 publishing is blocked. Keep Studio's Sanity authentication unchanged. See AUTH.md.

- Header preferences: no report subtitle, breadcrumb path, or sample-data badge in the header; keep sample disclosures in reports/footer. Search belongs on the left and should be wide. Icon names appear in hover/focus tooltips. Navigation selection uses a background without a vertical marker. Enlarge the compact interface slightly (about 2px).
- Prepare external app setup for GA4, Search Console, Business Profile, and Google Ads. Account/property identifiers may be saved locally; live Google authorization and sync need a separately configured backend. Never label a saved identifier as a connected provider.

- November 5, 2026 updated design direction: implement locally without further image generation. Use neutral gray/white surfaces and restrained green accents; the former all-green appearance feels too childish. Make elements smaller and narrower, with tighter spacing and room for tools. This supersedes the earlier light-green Flow Studio mock's palette and proportions.
- Preserve the thin icon rail, contextual menu, compact Inter typography and generous white main canvas. Rail icons select workspaces: the adjacent menu must change to that workspace's options, with the active workspace and report clearly indicated. Remember the last report within each workspace when switching icons.
- Product name is SF0 (zero, inspired by OS rings). Intended domain: sf0.softnestcare.ca.
- Website and marketing first. Never imply that sample data is measured SoftNest performance or that a provider is connected without verification.
- Keep the public Next.js site independent. SF0 is a self-contained application with its own dependencies and hosting.
- Hosting is GitHub Pages in davydlykholap/softnest-sf0. The user clarified November 4, 2026 that Namecheap supplies DNS only and no cPanel account exists; this supersedes the earlier hosting plan. Publish compiled output only.
- The user added CNAME sf0 -> davydlykholap.github.io on November 4, 2026. Keep the Pages custom domain sf0.softnestcare.ca. No hosting IP or OpenAI verification record is needed.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. `npm run build` produces static files in `dist/`. From the root, `npm run check:sf0` builds/packages/tests and `npm run sf0:deploy` publishes to GitHub Pages. `npm run package:sf0` produces `apps/sf0/artifacts/sf0-static.zip`. Keep hosting instructions in README.md and ../../infra/hosting/README.md consistent.
