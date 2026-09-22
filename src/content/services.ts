import records from "@/content/generated/services.json";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
import { serviceImages } from "@/content/serviceImages";
export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  menuLabel: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  serviceType: string[];
  concerns: string[];
  included: string[];
  process: ServiceStep[];
  drying: string;
  limitations: string;
  faq: ServiceFaq[];
  relatedServices: string[];
  heroProofs?: string[];
  includedHeading?: string;
  processHeading?: string;
  afterCareEyebrow?: string;
  afterCareHeading?: string;
  featured?: boolean;
  id: string;
  pageEnabled: boolean;
  showInNavigation: boolean;
};


export const services: Service[] = (records as Service[])
  .filter((service) => service.pageEnabled !== false)
  .map((service) => ({
    ...service,
    image: optimizedLocalImage(serviceImages[service.slug]?.image ?? service.image),
    imageAlt: serviceImages[service.slug]?.imageAlt ?? service.imageAlt,
  }));
export const navigationServices = services.filter((service) => service.showInNavigation);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
