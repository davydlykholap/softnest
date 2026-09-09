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
  return entry.text.replace(/\{\{(phone|business|quote|city)\}\}/g,(_,name:string)=>values[name]);
}
export function getProjects(filters: {service?:string;location?:string} = {}): GalleryResult[] {
  return projects.filter(p=>(filters.service || filters.location || p.featured) && (!filters.service || (p.services as string[]).includes(filters.service)) && (!filters.location || (p.locations as string[]).includes(filters.location))).map(p=>({...p,variant:p.variant as GalleryResult['variant']}));
}
export function getTestimonials() { return testimonials.filter(t=>t.featured); }
