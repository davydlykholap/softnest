import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { getPosts } from "@/content/posts";
import { cityServicePages } from "@/content/cityServicePages";
import { getWorkProjects } from "@/content/work";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const siteUrl = siteConfig.url + "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/about/` },
    { url: `${siteUrl}/our-work/`, images: getWorkProjects().map(project => absoluteUrl(project.image)) },
    ...locations.filter(location => location.indexInSearch && getWorkProjects({ city: location.slug }).length > 0).map(location => ({
      url: siteUrl + "/our-work/" + location.slug + "/", images: getWorkProjects({city:location.slug}).map(project => absoluteUrl(project.image)),
    })),
    { url: `${siteUrl}/blog/` },
    ...posts.map(post => ({url: `${siteUrl}/blog/${post.slug}/`})),
    { url: `${siteUrl}/services/` },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}/`,
    })),
    { url: `${siteUrl}/location/` },
    ...locations.filter(location=>location.indexInSearch).map((location) => ({
      url: `${siteUrl}/location/${location.slug}/`,
    })),
    { url: `${siteUrl}/quote/` },
    ...cityServicePages.map((page) => ({ url: `${siteUrl}${page.path}` })),
    { url: `${siteUrl}/privacy/` },
    { url: `${siteUrl}/terms/` },
  ];
}
