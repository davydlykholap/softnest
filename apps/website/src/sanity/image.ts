import { createImageUrlBuilder } from "@sanity/image-url";
import type { BlogImage } from "@/content/posts";
import { sanityConfig } from "./config";

export function blogImageUrl(image: BlogImage | undefined, width = 1200, slug?: string) {
  if (!image?.asset?._ref) return image?.localPath;
  // The asset ID encodes dimensions; project settings are only read at build time.
  const builder = createImageUrlBuilder(sanityConfig)
    .image(image)
    .width(width)
    .fit("max")
    .format("webp");
  return (slug ? builder.vanityName(`${slug}.webp`) : builder).url();
}
