import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://softnestcare.ca/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://softnestcare.ca/location/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...locations.map((location) => ({
      url: `https://softnestcare.ca/location/${location.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
