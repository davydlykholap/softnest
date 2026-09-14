import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getPosts } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";
import styles from "@/app/blog/blog.module.css";
import { blogUrl } from "@/seo/urls";

export const metadata: Metadata = {
  title: "Fabric Care Blog | SoftNest",
  description:
    "Practical couch and upholstery care guides from SoftNest Fabric Care, covering stains, cleaning products, fabric safety and professional care.",
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
  const [featured, ...guides] = posts;

  return (
    <>
      <div className="new-hero-root">
        <SiteHeader current="blog" />
      </div>
      <main id="main-content" className={styles.indexMain}>
        {featured ? (
          <>
            <section className={styles.journalHero} aria-labelledby="journal-title">
              <Image
                className={styles.heroLeaves}
                src="/images/blog/softnest-journal-leaves.png"
                alt=""
                width={500}
                height={598}
                aria-hidden="true"
              />
              <div className={styles.journalHeroCopy}>
                <p className={styles.journalKicker}>SoftNest Journal</p>
                <span className={styles.kickerLine} aria-hidden="true" />
                <h1 id="journal-title">
                  <span>How to Remove a Stain</span>
                  <span>from a Couch Without</span>
                  <span className={styles.heroTitleAccent}>Making It Worse</span>
                </h1>
                <p className={styles.journalHeroDescription}>
                  Clear, professional advice for spills, stains, fabrics, and
                  everyday upholstery care.
                </p>
                <Link className={styles.primaryLink} href={blogUrl(featured.slug)}>
                  Read the guide
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              {blogImageUrl(featured.coverImage, 1400) ? (
                <div className={styles.journalHeroImage}>
                  <Image
                    src={blogImageUrl(featured.coverImage, 1400)!}
                    alt={featured.coverImage?.alt || ""}
                    width={1400}
                    height={900}
                    priority
                    unoptimized
                  />
                </div>
              ) : null}
            </section>

            <section className={styles.latest} aria-labelledby="latest-guides">
              <div className={styles.latestHeading}>
                <span className={styles.kickerLine} aria-hidden="true" />
                <h2 id="latest-guides">
                  Latest <span>fabric care guides</span>
                </h2>
                <p>
                  Helpful advice and practical tips for a cleaner, more
                  comfortable home.
                </p>
              </div>
              <div className={styles.guideGrid}>
                {guides.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    formattedDate={formatDate(post.publishedAt)}
                  />
                ))}
              </div>
            </section>
          </>
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
