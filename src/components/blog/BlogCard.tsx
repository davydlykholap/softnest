import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";
import { blogUrl } from "@/seo/urls";
import styles from "./BlogCard.module.css";

type Props = {
  post: Post;
  formattedDate: string;
};

const articleFallbackImages: Record<string, string> = {
  "why-did-my-couch-stain-come-back-after-cleaning": "/img/gray_sofa_stain.webp",
  "what-cleaning-solution-can-i-use-on-my-couch":
    "/images/blog/how-to-remove-stain-from-couch/blotting-a-couch-spill.webp",
  "why-sofa-armrests-get-dirty-faster": "/img/sofa.webp",
  "does-vacuuming-clean-carpet": "/img/rug_2.webp",
  "how-to-remove-pet-urine-smell-from-couch": "/img/pet_stain.jpg",
  "how-often-should-office-carpets-be-cleaned": "/img/carpet_staircase.webp",
  "how-long-does-a-couch-take-to-dry-after-cleaning":
    "/images/blog/how-to-remove-stain-from-couch/sofa-fabric-after-drying.webp",
};

export default function BlogCard({ post, formattedDate }: Props) {
  const image =
    blogImageUrl(post.coverImage, 900) || articleFallbackImages[post.slug];
  const cardClasses = [styles.card, image ? "" : styles.textOnly]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClasses}>
      <Link className={styles.cardLink} href={blogUrl(post.slug)}>
        {image ? (
          <span className={styles.image}>
            <Image
              src={image}
              alt={post.coverImage?.alt || ""}
              width={900}
              height={600}
              sizes="(max-width: 700px) 46vw, (max-width: 1100px) 46vw, 25vw"
              unoptimized
            />
          </span>
        ) : null}
        <span className={styles.copy}>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <h2>{post.title}</h2>
          <span className={styles.arrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M5 12h13M13 7l5 5-5 5" />
            </svg>
          </span>
        </span>
      </Link>
    </article>
  );
}
