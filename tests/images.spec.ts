import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { optimizedLocalImage } from "../src/lib/optimizedLocalImage";
import sharp from "sharp";

test("optimized local photos exist as actual WebP files", async () => {
  const photos = [
    "/img/sofa.png",
    "/img/sectional.png",
    "/img/sectional_sofa.png",
    "/img/gray_sofa_stain.png",
    "/img/dining_chairs.webp",
    "/img/matress_cleaning.webp",
  ];

  for (const photo of photos) {
    const path = optimizedLocalImage(photo);
    expect(path.endsWith(".webp")).toBe(true);
    const bytes = await readFile(resolve(process.cwd(), "public", path.slice(1)));
    expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
    expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
  }
});

test("responsive photo derivatives have truthful dimensions and smaller mobile payloads", async () => {
  const manifest = JSON.parse(await readFile(resolve("src/lib/responsiveImages.json"), "utf8")) as
    Record<string, { src: string; width: number }[]>;
  for (const [original, variants] of Object.entries(manifest)) {
    const source = await readFile(resolve("public", original.slice(1)));
    let previousWidth = 0;
    for (const variant of variants) {
      const bytes = await readFile(resolve("public", variant.src.slice(1)));
      const metadata = await sharp(bytes).metadata();
      expect(metadata.format, variant.src).toBe("webp");
      expect(metadata.width, variant.src).toBe(variant.width);
      expect(variant.width, variant.src).toBeGreaterThan(previousWidth);
      previousWidth = variant.width;
    }
    const mobile = variants.find((variant) => variant.width >= 480) ?? variants[0];
    const mobileBytes = await readFile(resolve("public", mobile.src.slice(1)));
    expect(mobileBytes.length, original).toBeLessThan(source.length);
  }
});
