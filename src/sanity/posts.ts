import type { Post as SanityPost } from "./sanity.types";
import type { PortableTextBlock } from "@portabletext/react";
import posts from "@/content/generated/posts.json";

export type BlogImage = {
  localPath?: string;
  width?: number;
  height?: number;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};
export type Post = Omit<SanityPost, 'slug' | 'author' | 'categories' | 'body' | 'relatedServices' | '_createdAt' | '_updatedAt' | '_rev'> & {
  slug: string;
  author?: string;
  categories?: string[];
  relatedServices?: string[];
  body: PortableTextBlock[];
};

export async function getPosts(): Promise<Post[]> { return posts as unknown as Post[]; }
