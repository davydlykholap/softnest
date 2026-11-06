import manifest from "./responsiveImages.json";

type Variant = { width: number; src: string };
const images: Record<string, Variant[]> = manifest;

function variantsFor(src: string) {
  // CMS settings may store our own assets as absolute canonical URLs.
  const path = src.startsWith("https://softnestcare.ca/")
    ? new URL(src).pathname : src;
  return images[path];
}

export function responsiveImageSet(src: string) {
  return variantsFor(src)?.map((image) => `${image.src} ${image.width}w`).join(", ");
}

export function responsiveImageFallback(src: string) {
  const variants = variantsFor(src);
  return variants?.find((image) => image.width >= 768)?.src ?? src;
}

// Paired before/after photos need enough pixels for both halves of the panel.
export function responsiveBackground(src: string) {
  const variants = variantsFor(src);
  const image = variants?.find((variant) => variant.width >= 1200) ?? variants?.at(-1);
  return `url("${image?.src ?? src}")`;
}
