import type { Post } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";

const articleFallbackImages: Record<string, string> = {
  "how-to-know-when-your-sofa-needs-professional-cleaning":
    "/img/sectional_1.webp",
  "why-did-my-couch-stain-come-back-after-cleaning":
    "/img/gray_sofa_stain.webp",
  "what-cleaning-solution-can-i-use-on-my-couch":
    "/images/blog/how-to-remove-stain-from-couch/blotting-a-couch-spill.webp",
  "why-sofa-armrests-get-dirty-faster": "/img/sofa.webp",
  "does-vacuuming-clean-carpet": "/img/rug_2.webp",
  "how-to-remove-pet-urine-smell-from-couch": "/img/pet_stain.jpg",
  "how-often-should-office-carpets-be-cleaned": "/img/carpet_staircase.webp",
  "how-long-does-a-couch-take-to-dry-after-cleaning":
    "/images/blog/how-to-remove-stain-from-couch/sofa-fabric-after-drying.webp",
};

export function getArticleImage(
  post: Pick<Post, "coverImage" | "slug">,
  width = 1200,
) {
  return blogImageUrl(post.coverImage, width) || articleFallbackImages[post.slug];
}
