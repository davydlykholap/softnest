import { pageMetadata } from '@/seo/metadata';
import { locationUrl } from '@/seo/urls';
import { siteConfig } from '@/lib/site';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPage from "@/components/LocationPage";
import ExpandedLocationPage from "@/components/locations/ExpandedLocationPage";
import { getLocation, locations } from "@/content/locations";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) return {};

  return pageMetadata({title:location.metaTitle || `Upholstery & Carpet Cleaning in ${location.name} | ${siteConfig.alternateName}`, description:location.metaDescription || location.shortDescription,path:locationUrl(location.slug),image:location.expandedContent?.heroImage || location.image,imageAlt:location.imageAlt,index:location.indexInSearch});
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();

  if (location.expanded) {
    return <ExpandedLocationPage location={location} />;
  }

  return <LocationPage location={location} />;
}
