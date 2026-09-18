import { jsonLd } from "@/seo/structuredData";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { organizationId, siteConfig } from "@/lib/site";
import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "About | SoftNest Fabric Care",
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
              cleaning company serving homes across the Greater Toronto Area.
            </p>
          </header>

          <section className={styles.story} aria-labelledby="our-approach">
            <h2 id="our-approach">A careful, straightforward approach</h2>
            <div className={styles.storyCopy}>
              <p>
                We focus on the furniture and soft surfaces people live with
                every day, including sofas, carpets, mattresses and suitable
                leather furniture. Each item is different, so we begin by
                looking at its material, construction, condition and the areas
                that need attention.
              </p>
              <p>
                From there, we choose the products, equipment and cleaning
                process that make sense for the work. We take our time with the
                confirmed scope and pay attention to the details and
                hard-to-reach areas where practical.
              </p>
              <p>
                We also believe in being clear about what cleaning can and
                cannot change. Soil and many stains can often be improved, but
                permanent wear, dye loss, cracking and physical damage cannot
                be reversed by cleaning. We would rather explain that honestly
                than promise a result the material cannot support.
              </p>
              <p className={styles.closing}>
                Our goal is simple: treat every home and every item with care,
                communicate clearly and leave the work feeling properly
                finished.
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
