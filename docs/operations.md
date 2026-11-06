# Operations

Application type checks use TypeScript 7.0.2. Next.js 16.4.5 uses its project-local CLI integration; lint tooling retains TypeScript 6 as a compatibility dependency for the JavaScript compiler API. Node 26.13.0 and npm 12.2.2 are the shared local/CI toolchain.

Node 26.13.0 and npm 12.2.2 are pinned. npm ci installs all workspaces. npm run check runs boundaries, audit-policy tests, Studio typecheck/build, website content/lint/unit/build/export checks and SF0 build/package/tests. npm run test:e2e adds rendered website checks. npm run audit:dependencies audits the entire root lockfile.

Website publication retains deploy-pages.yml because the live Sanity webhook targets it. Studio and SF0 compiled assets publish independently with npm run studio:deploy and npm run sf0:deploy.

package-sf0.yml builds and uploads a portable release on SF0 changes. deploy-static-app.yml supports an optional manual CI publication after STATIC_PAGES_DEPLOY_TOKEN is configured with access to the compiled hosting repository. No personal token is copied into CI by the migration; local publication already uses the saved sign-in.

Website local secrets live in ignored apps/website/.env.local. Studio browser configuration uses only public identifiers. Local static deployment uses Git Credential Manager. A CI static release can supply GITHUB_TOKEN scoped to its destination repository; never put a credential in source or a public build.

Pages deployment repositories retain prior commits for recovery. A known-good compiled commit can be restored and republished. Failed website validation does not replace production. backup-sanity.yml exports the dataset into workflow artifacts retained 30 days; verify CLI authentication if backup fails.

Pre-existing documentation removals, public/og.jpg removal, SF0 source and config edits were preserved. The migration baseline is under ignored artifacts/project-organization-2026-11-04/baseline/.

See ../infra/hosting/README.md and ../infra/dns/README.md. Editing the DNS inventory does not update Namecheap.
