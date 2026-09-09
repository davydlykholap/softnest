import records from "@/content/generated/locations.json";
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
    resultExamples: {category:string;title:string;description:string;image:string;alt:string}[];
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


export const serviceAreas = records as Location[];
export const locations = serviceAreas.filter(l=>l.pageEnabled && l.status!=="not-served");
export const footerLocations = locations.filter(l=>l.showInFooter);
export const nearbyLocationSlugs = Object.fromEntries(locations.map(l=>[l.slug,l.nearbyLocations]));
export function getLocation(slug:string) { return locations.find(l=>l.slug===slug); }
