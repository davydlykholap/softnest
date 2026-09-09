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
