# Images

| Folder | Contents |
|---|---|
| `apps/website/public/images/blog/` | Website-ready blog covers and article images |
| `apps/website/public/images/services/` | Service-page images and equipment |
| `apps/website/public/images/work/` | Before/after comparisons |
| `apps/website/public/images/locations/` | City photographs, service-area maps and location-page images; photo credits in `ATTRIBUTION.md` |
| `apps/website/public/images/home/` | Living-room and homepage images |
| `apps/website/public/images/brand/` | Logos, Google marks and QR code |
| `apps/website/public/images/ui/` | Decorative leaves and phone frame |
| `apps/website/public/images/quote-options/` | Furniture illustrations used by the quote form |
| `apps/website/public/images/responsive/` | Generated WebP sizes; regenerate with `npm run images:generate` |
| `assets/images/blog/originals/` | 17 PNG originals: the owner's 12 supplied files and the older five-image article bundle; `sources.json` records their previous names |
| `assets/images/work/originals/` | Three gallery PNG source files previously mixed with maintenance scripts |
| `assets/design/current/` | Screenshots used as design references |
| `apps/website/content/articles/<slug>/` | Saved article packages; historical covers remain alongside their articles |
| `apps/website/content/inbox/` | Ignored private article texts, notes and original ZIP submissions |
| `apps/sf0/public/` | SF0's own app icon |

Sanity also stores uploaded images remotely. Studio edits those assets and article documents; the local folders are not a mirror of the CMS. Do not remove unused Sanity assets as part of filename cleanup.

## Names and search

Use lowercase words separated by hyphens. Describe the visible subject and add a useful distinction: `stair-carpet-cleaning-before-after.webp`, `darkened-sofa-armrest.webp`. Use a city only when the source establishes that location. City-view images are landmarks, not photographs of cleaning appointments. Decorative files retain simple names without cleaning keywords. Existing descriptive filenames do not need cosmetic renaming.

Alt text describes what a visitor sees. Decorative images have empty alt text. Do not repeat every service or city in filenames or alt text. Blog cover CDN URLs receive the article's descriptive slug; image sitemap entries cover articles, services, locations and approved work. Generated responsive sizes retain the descriptive filename and actual width.

`src/lib/imageAliases.json` preserves previous URLs. The normalizer translates saved CMS paths; `prepare:export` copies aliases into `out/`, and `verify:export` checks them byte for byte. Keep aliases when deploying to GitHub Pages, which cannot issue image redirects through application code. They are compatibility files in deployment output, not duplicate source folders.

## Original blog covers

`assets/images/blog/covers.json` records nine confidently matched covers and their alt text. Run `npm run images:restore-blog --workspace @softnest/website` from the root to inspect the plan. To apply it, run `node scripts/content/restore-blog-images.mjs --apply` from `apps/website/`. The script saves complete affected documents under ignored `content/backups/`, checks revisions and verifies that article text and publication settings did not change. Existing draft documents receive the same cover update without publishing their other edits.

The remaining supplied originals are preserved without assigning them to extra or merged articles. Other published covers remain in place where the screenshots did not establish a confident replacement. An illustrative image does not become evidence of a completed appointment merely because it appeared in a Google Business Profile post.

## Naming decisions and references

`assets/editorial/incoming` became `assets/images/blog/originals`; `packages/content-contract` became `packages/content`; old image prompts moved to `content/archive/image-prompts`. Standard names such as `apps`, `packages`, `src`, `public`, `components`, `docs` and `tools` remain. “Editorial” is a legitimate publishing term; it was less helpful than “images” for this owner's image folder.

- [32-Bit Cafe: Folder Structure 101](https://32bit.cafe/folderstructure101/) is a developer-written community guide recommending a simple image folder with subfolders when necessary.
- [Developers discussing file organization on r/webdev](https://www.reddit.com/r/webdev/comments/sxdg9t/how_do_i_organize_my_files/) describe grouping images, styles and scripts under assets. These are personal conventions, not one required layout.
- [MDN shared assets](https://github.com/mdn/shared-assets) is a real maintained repository that groups reusable media in plainly named image and diagram folders.
- [CodeStitch's Astro/Decap starter](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS) uses image directories in an actual agency website toolkit.
- [Google's image search guidance](https://developers.google.com/search/docs/appearance/google-images) recommends descriptive filenames, contextual alt text, accessible HTML images and image sitemaps. Filenames provide only a small signal; these changes cannot guarantee rankings.
