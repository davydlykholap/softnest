# SoftNest

One source workspace for the public website, content editor and SF0.

| App | Source | Address | Pages repository |
|---|---|---|---|
| Website | [apps/website](apps/website/README.md) | https://softnestcare.ca | softnest |
| Studio | [apps/studio](apps/studio/README.md) | https://studio.softnestcare.ca | softnest-studio |
| SF0 | [apps/sf0](apps/sf0/README.md) | https://sf0.softnestcare.ca | softnest-sf0 |

Namecheap manages DNS. Studio and SF0 publish compiled assets to separate hosting repositories.

## Start

Use Node **24.22.1** (.nvmrc) and npm **11.21.1** (packageManager).

```sh
npm ci
npm run dev:website
npm run dev:studio
npm run dev:sf0
```

Run each dev command in its own terminal. Default ports: website 3000, Studio 3333, SF0 5173.

## Working across computers

Clone the source repository on each PC:

```sh
git clone https://github.com/davydlykholap/softnest.git
cd softnest
npm ci
```

Before starting work, run `git pull --ff-only` from a clean `main` branch. Commit and push finished changes before switching PCs, then pull on the other PC. Use a feature branch for unfinished work and merge it into `main` when ready; website changes pushed to `main` trigger validation and publication.

Each PC needs its own ignored environment files. Copy the relevant app's `.env.example` to `.env.local` and configure local credentials separately. See [SF0 sign-in](apps/sf0/AUTH.md) for its required Google OAuth setup. Dependencies, generated builds, local reports and credentials are excluded from the source repository.

## Check and publish

```sh
npm run check                 # boundaries, policy tests and all application checks
npm run audit:dependencies    # full workspace dependency audit
npm run test:e2e              # website build and rendered checks
npm run content:types         # regenerate Sanity query types
npm run package:sf0           # apps/sf0/artifacts/sf0-static.zip
npm run studio:deploy         # publish compiled editor
npm run sf0:deploy            # build, test and publish SF0
```

Use check:website, check:studio or check:sf0 for one app. Existing dev, build, studio, content and website test commands remain root aliases.

## Directory map

- apps/: deployable applications and their own dependencies, scripts and tests.
- packages/: shared public contracts with explicit exports.
- infra/: DNS inventory and hosting configuration.
- tools/: repository checks and deployment orchestration.
- docs/: architecture, publishing, operations and decisions.
- assets/: original images and design references; website images stay in apps/website/public/images/.
- artifacts/: ignored reports, screenshots, logs and local releases.

Start with [architecture](docs/architecture.md), [publishing](docs/publishing.md), [operations](docs/operations.md), and [DNS](infra/dns/README.md).

See [images](docs/images.md) for image locations, filenames and original blog covers.

Sanity is the public website's editorial source. Generated snapshots are rebuilt before development/builds and are not edited manually. SF0 currently uses sample data or local CSV imports; no live analytics provider is connected.
