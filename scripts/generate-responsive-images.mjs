import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Static hosting has no image optimizer. Keep originals and publish smaller
// derivatives with a manifest, so srcset works without an application server.
const output = "public/images/responsive";
await fs.mkdir(output, { recursive: true });
const manifest = {};
for (const directory of ["public/images", "public/img"]) {
  for (const relative of await fs.readdir(directory, { recursive: true })) {
    if (relative.startsWith("responsive") || !/\.webp$/i.test(relative)) continue;
    const source = path.join(directory, relative);
    if ((await fs.stat(source)).size < 20000) continue;
    const metadata = await sharp(source).metadata();
    if (!metadata.width || metadata.pages > 1) continue;
    const publicPath = "/" + source.slice("public".length + 1).replaceAll("\\", "/");
    const stem = publicPath.slice(1, -5).replaceAll("/", "-");
    const widths = [...new Set([240, 480, 768, 1200, 1600, metadata.width]
      .filter((width) => width <= metadata.width))].sort((a, b) => a - b);
    manifest[publicPath] = [];
    for (const width of widths) {
      const file = `${stem}-${width}.webp`;
      await sharp(source).resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 6 }).toFile(path.join(output, file));
      manifest[publicPath].push({ width, src: `/images/responsive/${file}` });
    }
  }
}
await fs.writeFile("src/lib/responsiveImages.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Prepared responsive variants for ${Object.keys(manifest).length} photos.`);
