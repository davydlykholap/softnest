import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

function socialImageUrl(image: string) {
  return /^https?:\/\//i.test(image) ? image : absoluteUrl(image);
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
