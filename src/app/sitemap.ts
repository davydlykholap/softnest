import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { services } from "@/data/services";

export const dynamic = "force-static";

const siteUrl = "https://softnestcare.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/about/` },
    { url: `${siteUrl}/services/` },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}/`,
    })),
    { url: `${siteUrl}/location/` },
    ...locations.map((location) => ({
      url: `${siteUrl}/location/${location.slug}/`,
    })),
    { url: `${siteUrl}/quote/` },
    { url: `${siteUrl}/privacy/` },
    { url: `${siteUrl}/terms/` },
  ];
}
