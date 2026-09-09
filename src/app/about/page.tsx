import { jsonLd } from "@/seo/structuredData";
import { pageText } from "@/content/pages";
import { aboutContent } from "@/content/pages";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { organizationId, siteConfig } from "@/lib/site";
import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "About SoftNest Fabric Care | Professional Cleaning Across the GTA",
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

const principles = aboutContent.principles;

const serviceLinks = [
  ["Sofa & Couch Cleaning", "/services/sofa-cleaning/"],
  ["Sectional & Furniture Cleaning", "/services/sectional-furniture-cleaning/"],
  ["Leather Upholstery Cleaning", "/services/leather-upholstery-cleaning/"],
  ["Carpet & Area Rug Cleaning", "/services/carpet-area-rug-cleaning/"],
  ["Mattress Cleaning", "/services/mattress-cleaning/"],
  ["Pet Stain & Odour Treatment", "/services/pet-stain-odour-removal/"],
] as const;

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
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{"" + pageText(aboutContent.copy, "page-1") + ""}</p>
            <h1>
              {" " + pageText(aboutContent.copy, "page-2") + " "}<span>{"" + pageText(aboutContent.copy, "page-3") + ""}</span>
            </h1>
            <p className={styles.lead}>
              {" " + pageText(aboutContent.copy, "page-4") + " "}</p>
            <p className={styles.sublead}>
              {" " + pageText(aboutContent.copy, "page-5") + " "}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/quote/">
                {" " + pageText(aboutContent.copy, "page-6") + " "}</Link>
              <Link className={styles.secondaryButton} href="/services/">
                {" " + pageText(aboutContent.copy, "page-7") + " "}</Link>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src="/images/softnest-hero-room.webp"
              alt="Clean home interior representing SoftNest Fabric Care service"
              fill
              priority
              sizes="(max-width: 980px) 88vw, 40vw"
              className="object-cover"
            />
            <div className={styles.heroNote}>
              <strong>{"" + pageText(aboutContent.copy, "page-8") + ""}</strong>
              <span>{"" + pageText(aboutContent.copy, "page-9") + ""}</span>
            </div>
          </div>
        </section>

        <section className={styles.proofRail} aria-label="SoftNest service principles">
          <div className={styles.proofItem}>
            <strong>{"" + pageText(aboutContent.copy, "page-10") + ""}</strong>
            <span>{"" + pageText(aboutContent.copy, "page-11") + ""}</span>
          </div>
          <div className={styles.proofItem}>
            <strong>{"" + pageText(aboutContent.copy, "page-12") + ""}</strong>
            <span>{"" + pageText(aboutContent.copy, "page-13") + ""}</span>
          </div>
          <div className={styles.proofItem}>
            <strong>{"" + pageText(aboutContent.copy, "page-14") + ""}</strong>
            <span>{"" + pageText(aboutContent.copy, "page-15") + ""}</span>
          </div>
          <div className={styles.proofItem}>
            <strong>{"" + pageText(aboutContent.copy, "page-16") + ""}</strong>
            <span>{"" + pageText(aboutContent.copy, "page-17") + ""}</span>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.sectionCopy}>
            <p className={styles.kicker}>{"" + pageText(aboutContent.copy, "page-18") + ""}</p>
            <h2>{"" + pageText(aboutContent.copy, "page-19") + ""}</h2>
            <p>
              {" " + pageText(aboutContent.copy, "page-20") + " "}</p>
            <p>
              {" " + pageText(aboutContent.copy, "page-21") + " "}</p>
          </div>

          <div className={styles.principlesGrid}>
            {principles.map((item, index) => (
              <article className={styles.principleCard} key={item.title}>
                <span className={styles.principleNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.cleanBand}>
          <section className={styles.cleanSection}>
            <div className={styles.equipmentWrap}>
              <div className={styles.equipmentImage}>
                <Image
                  src="/img/faq_machine.webp"
                  alt="Professional upholstery cleaning equipment used by SoftNest Fabric Care"
                  fill
                  sizes="(max-width: 980px) 88vw, 38vw"
                  className="object-cover"
                />
              </div>
              <div className={styles.equipmentLabel}>
                {" " + pageText(aboutContent.copy, "page-22") + " "}</div>
            </div>

            <div className={styles.cleanCopy}>
              <p className={styles.kicker}>{"" + pageText(aboutContent.copy, "page-23") + ""}</p>
              <h2>{"" + pageText(aboutContent.copy, "page-24") + ""}</h2>
              <p>
                {" " + pageText(aboutContent.copy, "page-25") + " "}</p>
              <div className={styles.serviceLinks}>
                {serviceLinks.map(([label, href]) => (
                  <Link className={styles.serviceLink} href={href} key={href}>
                    <span>{label}</span>
                    <span className={styles.arrowCircle} aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className={styles.areaSection}>
          <div className={styles.areaCopy}>
            <p className={styles.kicker}>{"" + pageText(aboutContent.copy, "page-26") + ""}</p>
            <h2>{"" + pageText(aboutContent.copy, "page-27") + ""}</h2>
            <p>
              {" " + pageText(aboutContent.copy, "page-28") + " "}</p>
          </div>

          <div className={styles.areaVisual} aria-label="Areas served">
            {siteConfig.areasServed.map((area) => (
              <span className={styles.areaChip} key={area}>{area}</span>
            ))}
          </div>
        </section>

        <div className={styles.finalCtaWrap}>
          <section className={styles.finalCta}>
            <div className={styles.finalCtaCopy}>
              <p className={styles.kicker}>{"" + pageText(aboutContent.copy, "page-29") + ""}</p>
              <h2>{"" + pageText(aboutContent.copy, "page-30") + ""}</h2>
              <p>
                {" " + pageText(aboutContent.copy, "page-31") + " "}</p>
            </div>
            <div className={styles.finalActions}>
              <Link className={styles.lightButton} href="/quote/">{"" + pageText(aboutContent.copy, "page-32") + ""}</Link>
              <a className={styles.outlineButton} href={siteConfig.phoneHref}>{"" + pageText(aboutContent.copy, "page-33") + ""}</a>
            </div>
          </section>
        </div>
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
