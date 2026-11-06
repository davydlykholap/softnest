import { siteConfig } from '@/lib/site';
export const serviceUrl=(slug:string)=>`/services/${slug}/`;
export const locationUrl=(slug:string)=>`/location/${slug}/`;
export const blogUrl=(slug:string)=>`/blog/${slug}/`;
export const quoteUrl=()=>'/quote/';
export const absoluteUrl=(path:string)=>new URL(path,`${siteConfig.url}/`).toString();
