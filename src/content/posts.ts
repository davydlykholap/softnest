import "server-only";

import type { PortableTextBlock } from "@portabletext/react";
import records from "@/content/generated/posts.json";
import type { Post as SanityPost } from "@/sanity/sanity.types";

export type BlogImage = {
  localPath?: string;
  width?: number;
  height?: number;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

export type Post = Omit<
  SanityPost,
  | "slug"
  | "author"
  | "categories"
  | "body"
  | "relatedServices"
  | "_createdAt"
  | "_updatedAt"
  | "_rev"
> & {
  slug: string;
  author?: string;
  categories?: string[];
  relatedServices?: string[];
  body: PortableTextBlock[];
};

const posts = records as unknown as Post[];

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(serviceSlug: string): Post[] {
  return posts.filter((post) => post.relatedServices?.includes(serviceSlug));
}

// Editorial next steps by topic, rather than the same two newest posts everywhere.
const readingTopics: Record<string, string[]> = {
  "how-to-remove-stain-from-couch": ["why-did-my-couch-stain-come-back-after-cleaning", "what-cleaning-solution-can-i-use-on-my-couch"],
  "why-did-my-couch-stain-come-back-after-cleaning": ["how-to-remove-stain-from-couch", "how-long-does-a-couch-take-to-dry-after-cleaning"],
  "what-cleaning-solution-can-i-use-on-my-couch": ["how-to-remove-stain-from-couch", "how-to-choose-an-upholstery-cleaning-company"],
  "why-sofa-armrests-get-dirty-faster": ["how-to-know-when-your-sofa-needs-professional-cleaning", "how-to-remove-stain-from-couch"],
  "does-vacuuming-clean-carpet": ["how-often-should-office-carpets-be-cleaned", "how-to-choose-an-upholstery-cleaning-company"],
  "how-often-should-office-carpets-be-cleaned": ["does-vacuuming-clean-carpet", "how-to-choose-an-upholstery-cleaning-company"],
  "how-to-remove-pet-urine-smell-from-couch": ["why-did-my-couch-stain-come-back-after-cleaning", "how-long-does-a-couch-take-to-dry-after-cleaning"],
  "how-long-does-a-couch-take-to-dry-after-cleaning": ["what-to-expect-when-softnest-cleans-your-sofa", "why-did-my-couch-stain-come-back-after-cleaning"],
  "how-to-know-when-your-sofa-needs-professional-cleaning": ["why-sofa-armrests-get-dirty-faster", "what-to-expect-when-softnest-cleans-your-sofa"],
  "upholstery-cleaning-prices-toronto": ["how-to-choose-an-upholstery-cleaning-company", "what-to-expect-when-softnest-cleans-your-sofa"],
  "what-to-expect-when-softnest-cleans-your-sofa": ["how-to-prepare-for-upholstery-and-carpet-cleaning", "what-is-included-in-sofa-cleaning"],
  "fears-about-hiring-a-sofa-cleaner": ["how-to-choose-an-upholstery-cleaning-company", "what-to-expect-when-softnest-cleans-your-sofa"],
  "how-to-choose-an-upholstery-cleaning-company": ["upholstery-cleaning-prices-toronto", "what-to-expect-when-softnest-cleans-your-sofa"],
  "how-to-find-a-reliable-sofa-and-carpet-cleaning-company": ["how-to-choose-an-upholstery-cleaning-company", "how-to-prepare-for-upholstery-and-carpet-cleaning"],
  "what-is-included-in-sofa-cleaning": ["upholstery-cleaning-prices-toronto", "how-to-prepare-for-upholstery-and-carpet-cleaning"],
  "how-to-prepare-for-upholstery-and-carpet-cleaning": ["what-to-expect-when-softnest-cleans-your-sofa", "how-long-does-a-couch-take-to-dry-after-cleaning"],
  "stains-or-odours-after-professional-cleaning": ["why-did-my-couch-stain-come-back-after-cleaning", "how-to-remove-pet-urine-smell-from-couch"],
  "what-to-expect-from-professional-carpet-cleaning": ["does-vacuuming-clean-carpet", "how-to-prepare-for-upholstery-and-carpet-cleaning"],
};

export function getReadingSuggestions(post: Post): Post[] {
  const curated = (readingTopics[post.slug] ?? []).map(getPost)
    .filter((item): item is Post => Boolean(item && item._id !== post._id));
  const candidates = posts.filter((item) => item._id !== post._id &&
    !curated.some((selected) => selected._id === item._id));
  const overlap = (item: Post) => item.relatedServices?.filter((slug) =>
    post.relatedServices?.includes(slug)).length ?? 0;
  candidates.sort((a, b) => overlap(b) - overlap(a));
  return [...curated, ...candidates].slice(0, 2);
}
