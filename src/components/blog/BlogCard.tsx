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

export default function BlogCard({ post, formattedDate }: Props) {
  const image = blogImageUrl(post.coverImage, 900);
  const cardClasses = [styles.card, image ? "" : styles.textOnly]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClasses}>
      {image ? (
        <Link
          className={styles.image}
          href={blogUrl(post.slug)}
          aria-label={`Read ${post.title}`}
        >
          <Image
            src={image}
            alt={post.coverImage?.alt || ""}
            width={900}
            height={600}
            sizes="(max-width: 700px) calc(100vw - 46px), (max-width: 1100px) 46vw, 30vw"
            unoptimized
          />
        </Link>
      ) : null}
      <div className={styles.copy}>
        <time dateTime={post.publishedAt}>{formattedDate}</time>
        <h3>
          <Link href={blogUrl(post.slug)}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link className={styles.readLink} href={blogUrl(post.slug)}>
          Read article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
