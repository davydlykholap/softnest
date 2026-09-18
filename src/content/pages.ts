import home from './generated/home.json';
import about from './generated/about.json';
import projects from './generated/projects.json';
import testimonials from './generated/testimonials.json';
import type { GalleryResult } from '@/components/HomeResultsCarousel';
import { siteConfig } from '@/lib/site';

export const homeContent = home;
export const aboutContent = about;
export function pageText(copy: {key:string;text:string}[], key:string, city?:string) {
  const entry=copy.find(item=>item.key===key);
  if(!entry) throw new Error(`Missing page content: ${key}`);
  const values:Record<string,string>={phone:siteConfig.displayPhone,business:siteConfig.name,quote:siteConfig.quoteLabel,city:city||''};
  return entry.text
    .replace(/\{\{(phone|business|quote|city)\}\}/g,(_,name:string)=>values[name])
    .replace(/Get a free quote/g, "Get a quote")
    .replace(/get a free quote/g, "get a quote")
    .replace(/Get Your Free Quote/g, "Get Your Quote")
    .replace(/Request a free quote/g, "Get a Quote");
}
export function getProjects(filters: {service?:string;location?:string} = {}): GalleryResult[] {
  return projects.filter(p=>(filters.service || filters.location || p.featured) && (!filters.service || (p.services as string[]).includes(filters.service)) && (!filters.location || (p.locations as string[]).includes(filters.location))).map(p=>({...p,variant:p.variant as GalleryResult['variant']}));
}
type TestimonialOptions = {
  location?: string;
  limit?: number;
};

export function getTestimonials(options: TestimonialOptions = {}) {
  const normalizedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    locations: testimonial.locations as string[],
  }));

  if (!options.location) {
    return normalizedTestimonials.filter((testimonial) => testimonial.featured);
  }

  const candidates = normalizedTestimonials
    .filter((testimonial) => testimonial.locationPageFeatured)
    .filter(
      (testimonial) =>
        testimonial.locations.length === 0 ||
        testimonial.locations.includes(options.location!),
    )
    .sort((left, right) => {
      const leftIsLocal = left.locations.includes(options.location!);
      const rightIsLocal = right.locations.includes(options.location!);
      return Number(rightIsLocal) - Number(leftIsLocal);
    });

  return candidates.slice(0, options.limit ?? 3);
}
