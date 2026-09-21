import type { Metadata } from "next";
import Image from "next/image";
import BlogExplorer, {
  type BlogListingPost,
} from "@/components/blog/BlogExplorer";
import { getArticleImage } from "@/components/blog/articleImages";
import { DirectoryFinalCta, DirectoryHero } from "@/components/DirectoryHubSections";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getPosts } from "@/content/posts";
import { siteConfig } from "@/lib/site";
import { blogUrl } from "@/seo/urls";
import styles from "@/app/blog/blog-index.module.css";
import "@/app/styles/locations-hub.css";

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
  const listingPosts: BlogListingPost[] = posts.map((post) => ({
    id: post._id,
    slug: post.slug,
    href: blogUrl(post.slug),
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    formattedDate: formatDate(post.publishedAt),
    image: getArticleImage(post),
    imageAlt: post.coverImage?.alt || "",
  }));

  return (
    <>
      <div className="new-hero-root locations-header">
        <SiteHeader current="blog" />
      </div>
      <main
        id="main-content"
        className={`locations-hub-v2 ${styles.indexMain}`}
      >
        {posts.length ? (
          <>
            <DirectoryHero
              id="journal-title"
              kicker="SoftNest Journal"
              titleLines={[
                { text: "Practical Care." },
                { text: "Comfortable Homes.", accent: true },
              ]}
              description="Clear, useful guidance for cleaner furniture, fresher carpets, and fabric that lasts longer."
              mediaLabel="A golden retriever resting on a clean cream sofa"
              className="locations-hub-hero--compact"
              media={
                <Image
                  src="/images/blog/journal-dog-hero.webp"
                  alt="A golden retriever sleeping on a cream sofa in a bright living room"
                  fill
                  priority
                  sizes="(max-width: 820px) 100vw, 57vw"
                />
              }
            />
            <BlogExplorer posts={listingPosts} />
          </>
        ) : (
          <p className={styles.empty}>
            Our first fabric care guides are on their way. Check back soon.
          </p>
        )}
        <DirectoryFinalCta
          kicker="Ready for professional care?"
          title="Put your new fabric care know-how to work."
          description="When your sofa or carpet needs more than everyday care, tell us what needs cleaning and we'll help you plan the next step."
          action={{ href: "/quote/", label: siteConfig.quoteLabel }}
          image="/images/softnest-hero-room.webp"
          imageAlt="Bright living room with a deep green sofa"
          className="site-final-cta"
        />
      </main>
      <SiteFooter />
    </>
  );
}
