import "server-only";

import records from "@/content/generated/services.json";
import { serviceImages } from "@/content/serviceImages";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  menuLabel: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  serviceType: string[];
  concerns: string[];
  included: string[];
  drying: string;
  limitations: string;
  faq: ServiceFaq[];
  relatedServices: string[];
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

export const navigationServices = services.filter(
  (service) => service.showInNavigation,
);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
