import { defineQuery } from 'groq';
import type {} from '@sanity/client';

// One published content read per build; preview builds use an authenticated draft perspective.
export const websiteContentQuery = defineQuery(`*[_type in ["siteSettings","service","location","faq","testimonial","cleaningProject","quoteCategory","pageContent","post","author","category"]] | order(_id asc)`);
