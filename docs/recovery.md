# Recovery and operational safeguards

This document covers the lightweight production safeguards used by SoftNest and the steps to recover the public website or Sanity content.

## What is protected

- Source code and deployment history are stored in GitHub.
- Sanity `prod` is exported weekly as a restorable archive, including assets.
- GitHub Actions checks the live homepage, quote page and sitemap twice per hour.
- Dependabot checks npm and GitHub Actions dependencies weekly.
- A separate scheduled workflow runs `npm run audit:dependencies` for the website and Studio every Monday, including checks that temporary tooling exceptions have not expired.
- Browser smoke tests and automated WCAG checks must pass before normal validation/deployment succeeds.

The workflows live under `.github/workflows/`:

- `uptime.yml`
- `security.yml`
- `backup-sanity.yml`
- `validate.yml`
- `deploy-pages.yml`

## Recover the website source

Git is the source of truth for application code. From a clean machine, clone the repository, then run:

```bash
npm ci
npm ci --prefix studio
npm run check
npm run test:e2e:built
```

A successful `npm run check` recreates the production `out/` directory. The GitHub Pages deployment workflow can then be run manually if an automatic deployment needs to be repeated.

## Sanity backups

`.github/workflows/backup-sanity.yml` runs every Sunday and can also be started manually from GitHub Actions. It exports the real Sanity production dataset with its referenced assets and uploads the `.tar.gz` file as a GitHub Actions artifact for 30 days.

The export has been tested against the production dataset. The public dataset allows export without storing a Sanity credential in GitHub for this backup job.

Generated files under `src/content/generated/` are build snapshots, not backups. Do not use them as a replacement for a Sanity dataset export.

## Restore Sanity deliberately

A dataset import can replace existing records, so never restore an archive blindly over `prod`. Prefer this recovery process:

1. Download the desired `sanity-production-backup` artifact from the backup workflow run.
2. Create or choose a temporary recovery dataset in the Sanity project.
3. Import the archive into that temporary dataset and inspect the records/assets.
4. Confirm the archive is the intended recovery point.
5. Only then decide whether production requires replacement.

From `studio/`, the Sanity CLI import form is:

```bash
npx sanity datasets import <backup.tar.gz> <target-dataset> --replace -p u0x0al83
```

Importing into a writable dataset requires an authorized Sanity token. Keep it in the environment or pass it through the CLI when performing a manual recovery; never commit it.

## Domain and third-party configuration

The Git repository and Sanity archive do not back up registrar/DNS account access, GitHub account access, Web3Forms ownership or Google Ads account configuration. Keep those accounts protected with strong authentication and recovery methods.

Public build identifiers and integration wiring are documented in `.env.example` and `src/lib/integrations.ts`. Production values supplied through GitHub repository variables can be reapplied if the repository configuration is ever rebuilt.

## Operational response

A failed uptime, security, validation, deployment or backup workflow should be treated as something to inspect, not automatically as a customer-impacting outage. GitHub notifications must be enabled for the people who are expected to respond to failed Actions runs.

For an actual website outage:

1. Check the latest Pages deployment and uptime workflow.
2. Re-run the last known-good deployment if the source is healthy.
3. Check the custom-domain/DNS configuration if GitHub Pages itself is healthy.
4. Preserve the failing logs before changing several things at once.

For confidence in recovery, perform an occasional manual Sanity restore into a temporary dataset rather than waiting for a real incident to discover that a backup cannot be used.

## Confirm the deployed version

The static export includes `/release.json`, containing the Git commit and the SHA-256 hash of the exported quote page. Compare its commit with GitHub main to distinguish a saved commit from a published release. A failed workflow leaves the previous release live.
