import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ArticleBody from "@/components/blog/ArticleBody";
import { getPost, getPosts } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";
import styles from "@/app/blog/blog.module.css";
import { getService } from "@/content/services";
import { blogUrl, serviceUrl, absoluteUrl } from "@/seo/urls";
import { jsonLd, breadcrumbs } from "@/seo/structuredData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const image = blogImageUrl(post.coverImage);
  return {
    title: post.seoTitle || `${post.title} | ${siteConfig.alternateName}`,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: blogUrl(post.slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      url: blogUrl(post.slug),
      publishedTime: post.publishedAt,
      ...(image
        ? { images: [{ url: image, alt: post.coverImage?.alt || "" }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      ...(image ? { images: [image] } : {}),
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const posts = getPosts();
  const post = getPost(slug);
  if (!post) notFound();

  const cover = blogImageUrl(post.coverImage);
  const related =
    post.relatedServices
      ?.map(getService)
      .filter((service) => service !== undefined) || [];

  return (
    <>
      <div className="new-hero-root">
        <SiteHeader />
      </div>
      <main id="main-content" className={styles.main}>
        <article className={styles.article}>
          <Link href="/blog/">← All articles</Link>
          <p className={styles.eyebrow}>SoftNest Journal</p>
          <h1>{post.title}</h1>
          <p className={styles.meta}>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.author ? ` · ${post.author}` : ""}
          </p>
          {post.categories?.length ? (
            <p className={styles.meta}>{post.categories.join(" · ")}</p>
          ) : null}
          <p className={styles.intro}>{post.excerpt}</p>
          {cover && post.showCover !== false ? (
            <Image
              className={styles.cover}
              src={cover}
              alt={post.coverImage?.alt || ""}
              width={1200}
              height={800}
              unoptimized
            />
          ) : null}
          <div className={styles.body}>
            <ArticleBody body={post.body} />
          </div>
          {related.length ? (
            <nav
              className={styles.related}
              aria-label="Related cleaning services"
            >
              <p>Professional help for your furniture</p>
              {related.map((service) => (
                <Link key={service.slug} href={serviceUrl(service.slug)}>
                  {service.name} →
                </Link>
              ))}
            </nav>
          ) : null}
          <aside className={styles.cta}>
            <h2>Need a little extra care?</h2>
            <p>Get professional fabric cleaning for your home.</p>
            <Link href="/quote/">{siteConfig.quoteLabel} →</Link>
          </aside>
          <nav
            className={styles.related}
            aria-label="More fabric care articles"
          >
            <p>Keep reading</p>
            {posts
              .filter((other) => other._id !== post._id)
              .slice(0, 2)
              .map((other) => (
                <Link key={other._id} href={blogUrl(other.slug)}>
                  {other.title} →
                </Link>
              ))}
          </nav>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                mainEntityOfPage: absoluteUrl(blogUrl(post.slug)),
                author: {
                  "@type":
                    post.author === siteConfig.name ? "Organization" : "Person",
                  name: post.author || siteConfig.name,
                },
                publisher: {
                  "@type": "Organization",
                  name: siteConfig.name,
                  url: siteConfig.url,
                },
                ...(cover
                  ? { image: cover.startsWith("/") ? absoluteUrl(cover) : cover }
                  : {}),
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd(
                breadcrumbs([
                  { name: "Home", url: absoluteUrl("/") },
                  { name: "Blog", url: absoluteUrl("/blog/") },
                  {
                    name: post.title,
                    url: absoluteUrl(blogUrl(post.slug)),
                  },
                ]),
              ),
            }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
