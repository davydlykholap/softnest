# Hosting inventory

apps.json configures tools/deploy-pages.mjs. All apps use GitHub Pages; Namecheap supplies DNS only.

SF0 now has a local authentication server. Its existing Pages snapshot remains public, and new static SF0 publication is blocked by the deployment tool. No additional hosting has been provisioned. See ../../apps/sf0/AUTH.md before planning remote authenticated access.

- website: davydlykholap/softnest; Actions artifact apps/website/out.
- studio: apps/studio/dist → davydlykholap/softnest-studio, main at /.
- sf0: apps/sf0/dist → davydlykholap/softnest-sf0, main at /.

Pages supports one project site per repository. Studio and SF0 repositories contain compiled assets, not separate editable source.

Publishing checks the destination description/hostname and scans output for private tokens. It replaces tracked output only in a temporary clone and preserves prior commits.

Each Pages custom-domain setting must match its app's hostname. Namecheap CNAMEs point studio and sf0 to davydlykholap.github.io without a repository path. GitHub selects the Pages site by hostname. HTTPS provisioning may take time.
