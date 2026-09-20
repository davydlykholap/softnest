import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { optimizedLocalImage } from "../src/lib/optimizedLocalImage";

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
