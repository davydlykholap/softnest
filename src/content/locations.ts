import records from "@/content/generated/locations.json";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  id: string;
  status: 'active' | 'limited' | 'not-served';
  pageEnabled: boolean;
  indexInSearch: boolean;
  showInFooter: boolean;
  expanded?: boolean;
  expandedContent?: {
    heroImage: string;
    mapImage?: string;
    mapAlt?: string;
    mapLabels?: {name:string;left:number;top:number}[];
    quickBenefits: {icon:string;title:string;description:string}[];
    services: {slug:string;title:string;description:string;image:string;alt:string}[];
    resultExamples?: {category:string;title:string;description:string;image:string;alt:string}[];
    processSteps: {icon:string;title:string;description:string}[];
    localAdvantages: {icon:string;title:string;description:string}[];
    mississaugaFaqs: LocationFaq[];
    copy: {key:string;text:string}[];
  };
  image: string;
  imageAlt: string;
  metaTitle?: string;
  metaDescription?: string;
  availableServices: string[];
  nearbyLocations: string[];
  slug: string;
  name: string;
  shortDescription: string;
  introduction: string;
  localConsiderations: string;
  neighbourhoods: string[];
  mapQuery: string;
  faq: LocationFaq[];
};


export const serviceAreas: Location[] = (records as Location[]).map((location) => ({
  ...location,
  image: optimizedLocalImage(location.image),
  expandedContent: location.expandedContent && {
    ...location.expandedContent,
    heroImage: location.slug === "mississauga"
      ? "/images/mississauga-cleaning-hero-v2.webp"
      : optimizedLocalImage(location.expandedContent.heroImage),
    mapImage: location.expandedContent.mapImage
      ? optimizedLocalImage(location.expandedContent.mapImage)
      : undefined,
    services: location.expandedContent.services.map((service) => ({
      ...service,
      image: optimizedLocalImage(service.image),
    })),
    resultExamples: location.expandedContent.resultExamples?.map((result) => ({
      ...result,
      image: optimizedLocalImage(result.image),
    })),
  },
}));
export const locations = serviceAreas.filter(
  (location) => location.pageEnabled && location.status !== "not-served",
);
export const footerLocations = locations.filter((location) => location.showInFooter);
export const nearbyLocationSlugs = Object.fromEntries(
  locations.map((location) => [location.slug, location.nearbyLocations]),
);

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
