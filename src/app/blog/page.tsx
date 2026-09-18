import type { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getPosts } from "@/content/posts";
import styles from "@/app/blog/blog.module.css";

export const metadata: Metadata = {
  title: "Blog | SoftNest Fabric Care",
  description:
    "Practical upholstery and carpet care guides from SoftNest Fabric Care, covering stains, pet odours, fabric safety, drying and professional cleaning.",
  alternates: { canonical: "/blog/" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function BlogIndexPage() {
  const posts = [...getPosts()].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );

  return (
    <>
      <div className="new-hero-root">
        <SiteHeader current="blog" />
      </div>
      <main id="main-content" className={styles.indexMain}>
        {posts.length ? (
          <section className={styles.journalIndex} aria-labelledby="journal-title">
            <header className={styles.journalIntro}>
              <p className={styles.journalKicker}>SoftNest Journal</p>
              <span className={styles.kickerLine} aria-hidden="true" />
              <h1 id="journal-title">Practical Care Guides</h1>
              <p>
                Helpful advice for cleaner furniture, carpets, and a more
                comfortable home.
              </p>
            </header>
            <div className={styles.guideGrid}>
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  formattedDate={formatDate(post.publishedAt)}
                />
              ))}
            </div>
          </section>
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
