"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TbArrowUpRight } from "react-icons/tb";
import DirectorySearch, {
  type DirectorySearchOption,
} from "@/components/DirectorySearch";
import styles from "@/app/blog/blog-index.module.css";

export type BlogListingPost = {
  id: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  formattedDate: string;
  image?: string;
  imageAlt: string;
};

type Props = {
  posts: BlogListingPost[];
};

function ArticleImage({ post, priority = false }: { post: BlogListingPost; priority?: boolean }) {
  if (!post.image) return <span className={styles.imageFallback} aria-hidden="true" />;

  return (
    <Image
      src={post.image}
      alt={post.imageAlt}
      fill
      priority={priority}
      sizes={priority ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 26vw"}
      unoptimized
    />
  );
}

export default function BlogExplorer({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return posts.filter(
      (post) =>
        !normalizedQuery ||
        `${post.title} ${post.excerpt}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
    );
  }, [posts, query]);

  const searchOptions = filteredPosts.map((post) => ({
    id: post.slug,
    label: post.title,
    hint: post.formattedDate,
  }));

  const [featured, ...remaining] = filteredPosts;
  const companionPosts = remaining.slice(0, 4);
  const morePosts = remaining.slice(4);

  return (
    <>
      <div className="locations-search-wrap">
        <DirectorySearch
          id="journal-search"
          label="Find a care guide"
          placeholder="Search care guides"
          submitLabel="Find a guide"
          value={query}
          options={searchOptions}
          optionsLabel="SoftNest care guides"
          emptyMessage="No care guide matches that search yet."
          onChange={setQuery}
          onChoose={(option: DirectorySearchOption) => setQuery(option.label)}
          onSubmit={() =>
            document
              .querySelector("#journal-articles")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        />
      </div>

      <section
        className={styles.articles}
        id="journal-articles"
        aria-labelledby="article-heading"
      >
        <header className={styles.sectionHeading}>
          <h2 id="article-heading">Latest Care Guides</h2>
        </header>

        {featured ? (
          <div className={styles.articleLayout}>
            <div className={styles.articleGrid}>
              <article className={styles.featuredCard}>
                <Link href={featured.href} className={styles.cardLink}>
                  <span className={styles.featuredImage}>
                    <ArticleImage post={featured} priority />
                    <span className={styles.featuredLabel}>Featured guide</span>
                  </span>
                  <span className={styles.featuredCopy}>
                    <time dateTime={featured.publishedAt}>{featured.formattedDate}</time>
                    <h3>{featured.title}</h3>
                    <p>{featured.excerpt}</p>
                    <span className={styles.readLink}>
                      Read article <TbArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </article>

              <div className={styles.cardGrid}>
                {companionPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {morePosts.length ? (
              <div className={styles.moreGrid}>
                {morePosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No guides found</h3>
            <p>Try a different search or view all care guides.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
            >
              Show all guides
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function ArticleCard({ post }: { post: BlogListingPost }) {
  return (
    <article className={styles.articleCard}>
      <Link href={post.href} className={styles.cardLink}>
        <span className={styles.cardImage}>
          <ArticleImage post={post} />
        </span>
        <span className={styles.cardCopy}>
          <time dateTime={post.publishedAt}>{post.formattedDate}</time>
          <h3>{post.title}</h3>
          <span className={styles.cardArrow} aria-hidden="true">
            <TbArrowUpRight />
          </span>
        </span>
      </Link>
    </article>
  );
}
