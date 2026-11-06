import type { Post } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";

const articleFallbackImages: Record<string, string> = {
  "how-to-know-when-your-sofa-needs-professional-cleaning":
    "/images/work/teal-sectional-sofa-cleaning-before-after.webp",
  "why-did-my-couch-stain-come-back-after-cleaning":
    "/images/work/stair-carpet-cleaning-comparison.webp",
  "what-cleaning-solution-can-i-use-on-my-couch":
    "/images/blog/how-to-remove-stain-from-couch/blotting-a-couch-spill.webp",
  "why-sofa-armrests-get-dirty-faster": "/images/home/grey-sofa-living-room.webp",
  "does-vacuuming-clean-carpet": "/images/services/carpet-extraction-cleaning.webp",
  "how-to-remove-pet-urine-smell-from-couch": "/images/services/dog-beside-carpet-stain.jpg",
  "how-often-should-office-carpets-be-cleaned": "/images/work/carpet-stain-removal-before-after.webp",
  "how-long-does-a-couch-take-to-dry-after-cleaning":
    "/images/blog/how-to-remove-stain-from-couch/sofa-fabric-after-drying.webp",
};

export function getArticleImage(
  post: Pick<Post, "coverImage" | "slug">,
  width = 1200,
) {
  return blogImageUrl(post.coverImage, width, post.slug) || articleFallbackImages[post.slug];
}
