import { pageMetadata } from '@/seo/metadata';
import { serviceUrl } from '@/seo/urls';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { getService, services } from "@/content/services";

type ServiceRouteProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({title:service.metaTitle,description:service.metaDescription,path:serviceUrl(service.slug),image:service.image,imageAlt:service.imageAlt});
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServicePage service={service} />;
}
