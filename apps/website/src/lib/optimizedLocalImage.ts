import aliases from "./imageAliases.json" with { type: "json" };

const legacyImages: Record<string, string> = aliases;
const optimizedImages: Record<string, string> = {
  "/images/home/grey-sofa-living-room.png": "/images/home/grey-sofa-living-room.webp",
  "/images/work/beige-sectional-sofa-cleaning-before-after.png": "/images/work/beige-sectional-sofa-cleaning-before-after.webp",
  "/images/work/grey-sectional-sofa-cleaning-comparison.png": "/images/work/grey-sectional-sofa-cleaning-comparison.webp",
  "/images/work/stair-carpet-cleaning-comparison.png": "/images/work/stair-carpet-cleaning-comparison.webp",
};

export function optimizedLocalImage(path: string) {
  const canonical = legacyImages[path] ?? path;
  return optimizedImages[canonical] ?? canonical;
}
