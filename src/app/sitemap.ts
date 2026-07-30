import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://softnestcare.ca/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://softnestcare.ca/location/",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://softnestcare.ca/quote/",
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...locations.map((location) => ({
      url: `https://softnestcare.ca/location/${location.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
