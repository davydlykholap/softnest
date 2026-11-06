import "server-only";

import home from './generated/home.json';
import projects from './generated/projects.json';
import testimonials from './generated/testimonials.json';
import type { GalleryResult } from '@/components/HomeResultsCarousel';
import { siteConfig } from '@/lib/site';
import { optimizedLocalImage } from '@/lib/optimizedLocalImage';
import { selectLocationReviews } from '@/lib/locationReviews';
import { homeGalleryExamples } from '@/content/homeGallery';

export const homeContent = home;
export function getGoogleReviews() {
  const reviews = [
    ...testimonials.map((review) => ({
      initial: review.name.trim().charAt(0).toUpperCase(),
      name: review.name,
      text: review.text,
    })),
    ...home.heroReviews,
  ];
  const names = new Set<string>();
  const texts = new Set<string>();
  return reviews.filter((review) => {
    const name = review.name.trim().toLowerCase();
    const text = review.text.trim().toLowerCase().replace(/\s+/g, " ");
    if (names.has(name) || texts.has(text)) return false;
    names.add(name);
    texts.add(text);
    return true;
  });
}
export function pageText(copy: {key:string;text:string}[], key:string, city?:string) {
  const entry=copy.find(item=>item.key===key);
  if(!entry) throw new Error(`Missing page content: ${key}`);
  const values:Record<string,string>={phone:siteConfig.displayPhone,business:siteConfig.name,quote:siteConfig.quoteLabel,city:city||''};
  return entry.text.replace(/\{\{(phone|business|quote|city)\}\}/g,(_,name:string)=>values[name]);
}
export function getHomeGalleryResults(): GalleryResult[] {
  const appointments = projects.filter(project => project.featured).map(project => ({
    image: project.image,
    category: project.category,
    location: project.location,
    service: project.service,
    label: project.label,
    variant: project.variant as GalleryResult["variant"],
  }));
  return [...homeGalleryExamples, ...appointments].map(project => ({
    ...project, image: optimizedLocalImage(project.image),
  }));
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

  const candidates = selectLocationReviews(normalizedTestimonials, options.location);
  return options.limit === undefined ? candidates : candidates.slice(0, options.limit);
}
