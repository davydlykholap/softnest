import { notFound } from "next/navigation";
import { cityServicePages, getCityServicePage } from "@/content/cityServicePages";
import CityServicePage from "@/components/locations/CityServicePage";
import { pageMetadata } from "@/seo/metadata";

type Props = { params: Promise<{ city: string; service: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return cityServicePages.map((page) => ({ city: page.location.slug, service: page.service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { city, service } = await params;
  const page = getCityServicePage(city, service);
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.description, path: page.path,
    image: page.service.image, imageAlt: page.service.imageAlt });
}

export default async function Page({ params }: Props) {
  const { city, service } = await params;
  const page = getCityServicePage(city, service);
  if (!page) notFound();
  return <CityServicePage content={page} />;
}
