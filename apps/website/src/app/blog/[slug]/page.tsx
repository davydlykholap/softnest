import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Image from "@/components/ResponsiveImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import ArticleBody from "@/components/blog/ArticleBody";
import { getPost, getPosts, getReadingSuggestions } from "@/content/posts";
import { blogImageUrl } from "@/sanity/image";
import styles from "@/app/blog/blog.module.css";
import { getService } from "@/content/services";
import WorkVideo from "@/components/WorkVideo";
import { getArticleVideo } from "@/content/articleVideos";
import { workProjectHref } from "@softnest/content/work-urls";
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

  const image = blogImageUrl(post.coverImage, 1200, post.slug);
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
  const post = getPost(slug);
  if (!post) notFound();

  const articleVideo = getArticleVideo(post.slug);
  const cover = blogImageUrl(post.coverImage, 1200, post.slug);
  const related =
    post.relatedServices
      ?.map(getService)
      .filter((service) => service !== undefined) || [];

  const quoteHref = related[0] ? `/quote/?service=${encodeURIComponent(related[0].slug)}` : "/quote/";
  const quoteActions = (
    <div className={styles.quoteActions}>
      <Link className={styles.quotePrimary} href={quoteHref}>Get a free quote</Link>
      <a className={styles.quoteSecondary} href={siteConfig.phoneHref}>Call {siteConfig.displayPhone}</a>
    </div>
  );

  return (
    <>
      <div className="new-hero-root">
        <SiteHeader current="blog" />
      </div>
      <main id="main-content" className={styles.main}>
        <article className={styles.article}>
          <Link href="/blog/">← All articles</Link>
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
          <aside className={styles.quoteStrip} aria-label="Get a quote">
            <p>Need help with this now? Free written quote, tax included.</p>
            {quoteActions}
          </aside>
          {articleVideo ? (
            <figure className={styles.videoFigure}>
              <WorkVideo item={articleVideo.video} showTitle={false} />
              <figcaption>
                A SoftNest appointment in {articleVideo.project.location}. <Link href={workProjectHref(articleVideo.project)}>See the full project →</Link>
              </figcaption>
            </figure>
          ) : cover && post.showCover !== false ? (
            <figure className={styles.coverFigure}>
            <Image
              className={styles.cover}
              src={cover}
              alt={post.coverImage?.alt || ""}
              width={1200}
              height={800}
              unoptimized
            />
            {post.coverImage?.caption ? <figcaption>{post.coverImage.caption}</figcaption> : null}
            </figure>
          ) : null}
          <div className={styles.body}>
            <ArticleBody body={post.body} />
          </div>
          <aside className={styles.quoteBox} aria-labelledby="article-quote-heading">
            <h2 id="article-quote-heading">Want it done properly?</h2>
            <p>Tell us what needs cleaning and what you have already tried. We confirm the work and a written price, with tax included, before we start.</p>
            {quoteActions}
          </aside>
          {related.length ? (
            <nav
              className={styles.related}
              aria-label="Related cleaning services"
            >
              <p>Related cleaning services</p>
              {related.map((service) => (
                <Link key={service.slug} href={serviceUrl(service.slug)}>
                  {service.name} →
                </Link>
              ))}
            </nav>
          ) : null}
          <nav
            className={styles.related}
            aria-label="More fabric care articles"
          >
            <p>Keep reading</p>
            {getReadingSuggestions(post)
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
      <DirectoryFinalCta
        title="Need a little extra care?"
        description="Get professional fabric cleaning for your home."
        action={{ href: "/quote/", label: siteConfig.quoteLabel }}
        image="/images/home/softnest-sofa-living-room.webp"
        imageAlt="Bright living room with a deep green sofa"
      />
      <SiteFooter />
    </>
  );
}
