import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getPosts } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";
import styles from "@/app/blog/blog.module.css";
import { blogUrl } from "@/seo/urls";

export const metadata: Metadata = {
  title: "Fabric Care Blog | SoftNest",
  description: "Fabric care advice and cleaning guides from SoftNest.",
  alternates: { canonical: "/blog/" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <>
      <div className="new-hero-root">
        <SiteHeader />
      </div>
      <main id="main-content" className={styles.main}>
        <p className={styles.eyebrow}>The SoftNest Journal</p>
        <h1>A little care goes a long way.</h1>
        <p className={styles.intro}>
          Fabric care advice, cleaning guides, and ideas for a fresher home.
        </p>

        {posts.length ? (
          <div className={styles.grid}>
            {posts.map((post) => {
              const image = blogImageUrl(post.coverImage, 720);
              return (
                <article key={post._id} className={styles.card}>
                  {image ? (
                    <Image
                      src={image}
                      alt={post.coverImage?.alt || ""}
                      width={720}
                      height={480}
                      unoptimized
                    />
                  ) : null}
                  <div>
                    <time className={styles.meta} dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <h2>
                      <Link href={blogUrl(post.slug)}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    <Link href={blogUrl(post.slug)}>Read article →</Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className={styles.empty}>
            Our first fabric care guides are on their way. Check back soon.
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
