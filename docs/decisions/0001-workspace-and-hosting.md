# 0001: Three applications, one source workspace

Accepted November 4, 2026. Use npm workspaces with apps/website, apps/studio and apps/sf0. Share the public contract through packages/content. Keep app dependencies, tests and deployments independent.

Preserve npm/Node and existing dependency versions during migration. Add build coordination only when measured costs justify it.

The user clarified that Namecheap provides DNS only, with no cPanel account. GitHub Pages hosting for SF0 supersedes its earlier Namecheap hosting plan. Keep compiled Studio/SF0 output in separate Pages repositories.

Preserve deploy-pages.yml as the active Sanity webhook target. Update paths rather than the filename. Document domains and hosting under infra/.
