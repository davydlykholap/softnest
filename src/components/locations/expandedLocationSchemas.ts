import type { Location } from "@/content/locations";
import { organizationProvider, siteConfig } from "@/lib/site";

export function getExpandedLocationSchemas(
  location: Location,
  services: { slug: string; title: string }[],
  locationFaqs: { question: string; answer: string }[],
) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Upholstery and Carpet Cleaning in ${location.name}`,
    url: `${siteConfig.url}/location/${location.slug}/`,
    image: siteConfig.heroImage,
    serviceType: [
      "Upholstery cleaning",
      "Sofa and sectional cleaning",
      "Carpet cleaning",
      "Area rug cleaning",
      "Dining chair cleaning",
      "Mattress cleaning",
      "Armchair cleaning",
      "Pet stain and odour removal",
    ],
    description:
      location.introduction,
    provider: organizationProvider(),
    areaServed: [
      {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
      },
      ...location.neighbourhoods.map((name) => ({
        "@type": "Place",
        name,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${location.name} cleaning services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${siteConfig.url}/services/${service.slug}/`,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: siteConfig.url + "/location/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `${siteConfig.url}/location/${location.slug}/`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locationFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [serviceSchema, breadcrumbSchema, faqSchema];
}
