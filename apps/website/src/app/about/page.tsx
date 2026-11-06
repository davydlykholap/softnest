import { jsonLd } from "@/seo/structuredData";
import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { organizationId, siteConfig } from "@/lib/site";
import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "About Our Family Cleaning Business | SoftNest Fabric Care",
  description:
    "Learn about SoftNest Fabric Care, our detail-focused approach to upholstery and carpet cleaning, professional equipment and service across the GTA.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About SoftNest Fabric Care",
    description:
      "A local, detail-focused upholstery and carpet cleaning team serving homes across the GTA.",
    url: "/about/",
    type: "website",
    images: [
      {
        url: siteConfig.heroImage,
        alt: "SoftNest Fabric Care professional upholstery cleaning",
      },
    ],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.url}/about/#aboutpage`,
  url: `${siteConfig.url}/about/`,
  name: "About SoftNest Fabric Care",
  description:
    "About SoftNest Fabric Care and our professional upholstery and carpet cleaning approach across the GTA.",
  inLanguage: "en-CA",
  mainEntity: { "@id": organizationId },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteConfig.url}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${siteConfig.url}/about/`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <div className="new-hero-root service-header">
        <SiteHeader />
      </div>

      <main className={styles.page}>
        <article className={styles.about}>
          <header className={styles.introduction}>
            <h1>
              About <span>SoftNest</span>
            </h1>
            <p>
              SoftNest Fabric Care is a family-run upholstery and carpet
              cleaning company serving homes across the Greater Toronto Area and Hamilton.
            </p>
          </header>

          <section className={styles.story} aria-labelledby="our-approach">
            <h2 id="our-approach">How we work</h2>
            <div className={styles.storyCopy}>
              <p>
                We focus on the furniture and soft surfaces people live with
                every day, including sofas, carpets, mattresses and suitable
                leather furniture. Each item is different, so we begin by
                looking at its material, construction, condition and the areas
                that need attention.
              </p>
              <p>
                We explain the cleaning method and the areas included before
                starting. You receive a quote with tax included, and any extra
                items or treatments are discussed with you first.
              </p>
              <p>
                Most suitable furniture and carpets can be cleaned, including
                many items with old or difficult marks. We assess the material
                and can try to improve its appearance, even when wear, colour
                changes or damage are involved. We explain what is realistic
                before starting; complete removal or restoration is not promised.
              </p>
              <p className={styles.closing}>
                You can call, text or use the quote form. Photos are optional.
                See examples of completed cleaning on our <Link href="/our-work/">Our Work page</Link>.
              </p>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />

      {[aboutSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
