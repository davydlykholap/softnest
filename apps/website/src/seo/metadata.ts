import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

// Social previews are wide (1.91:1). Portrait photos from the CMS are cropped by its image CDN, so Facebook,
// WhatsApp and search do not cut them in an unpredictable place.
export function socialImageUrl(image: string) {
  if (!/^https?:\/\//i.test(image)) return absoluteUrl(image);
  try {
    const url = new URL(image);
    if (url.hostname !== "cdn.sanity.io") return image;
    for (const key of ["w", "h", "fit", "crop"]) url.searchParams.delete(key);
    url.searchParams.set("w", "1200");
    url.searchParams.set("h", "630");
    url.searchParams.set("fit", "crop");
    return url.toString();
  } catch {
    return image;
  }
}

// Search results cut descriptions at about 160 characters. Keep whole sentences where possible.
export function fitDescription(text: string, limit = 158) {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= limit) return value;
  const sentences = value.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [];
  let result = "";
  for (const sentence of sentences) {
    const next = `${result}${result ? " " : ""}${sentence.trim()}`;
    if (next.length > limit) break;
    result = next;
  }
  if (result.length >= 70) return result;
  const cut = value.slice(0, limit - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 60)).replace(/[\s,;:.-]+$/, "")}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      ...(image
        ? { images: [{ url: socialImageUrl(image), alt: imageAlt || title }] }
        : {}),
    },
  };
}
