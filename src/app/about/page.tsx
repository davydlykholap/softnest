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
        url: "/images/softnest-hero-room.webp",
        alt: "SoftNest Fabric Care professional upholstery cleaning",
      },
    ],
  },
};

const principles = [
  {
    title: "Inspect before we clean",
    text: "We consider the material, construction, condition and problem areas before choosing the cleaning approach.",
  },
  {
    title: "Use the right process",
    text: "Fabric and leather are treated differently. Products and methods are selected for the material and the work being performed.",
  },
  {
    title: "Work carefully, not hurriedly",
    text: "Our goal is thorough cleaning of the confirmed scope, including detailed and hard-to-reach areas where practical.",
  },
  {
    title: "Set honest expectations",
    text: "Cleaning can remove soil and improve many stains, but it cannot reverse permanent wear, dye loss, cracking or physical damage.",
  },
] as const;

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
            <p className={styles.kicker}>About SoftNest Fabric Care</p>
            <h1>
              Careful work. Clear expectations.
              <span>Professional fabric care.</span>
            </h1>
            <p className={styles.lead}>
              SoftNest Fabric Care is a local, family-run cleaning team serving homes across the Greater Toronto Area. We focus on upholstery, carpet, mattresses and suitable leather furniture, with the work planned around the material and condition of each item.
            </p>
            <p className={styles.sublead}>
              The standard is simple: inspect first, use professional equipment and appropriate products, clean thoroughly, and explain honestly what can and cannot be improved.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/quote/">
                Request a free quote
              </Link>
              <Link className={styles.secondaryButton} href="/services/">
                View our services
              </Link>
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
              <strong>Professional fabric care</strong>
              <span>Upholstery · carpet · mattresses · suitable leather</span>
            </div>
          </div>
        </section>

        <section className={styles.proofRail} aria-label="SoftNest service principles">
          <div className={styles.proofItem}>
            <strong>Local</strong>
            <span>Family-run team</span>
          </div>
          <div className={styles.proofItem}>
            <strong>Insured</strong>
            <span>Liability coverage</span>
          </div>
          <div className={styles.proofItem}>
            <strong>Professional</strong>
            <span>Commercial-grade equipment</span>
          </div>
          <div className={styles.proofItem}>
            <strong>Simple</strong>
            <span>Payment after service</span>
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.sectionCopy}>
            <p className={styles.kicker}>How we work</p>
            <h2>Quality comes from the process, not from rushing the job</h2>
            <p>
              Furniture and carpet do not all respond the same way. That is why our work starts with the item itself: its fabric or leather, construction, soil level, staining, previous treatments and any visible wear.
            </p>
            <p>
              We use commercial-grade equipment where appropriate, standard spot and stain treatment for suitable fabric, professional drying for wet-cleaned upholstery and carpet, and a separate cleaning, conditioning and protection process for suitable leather.
            </p>
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
                Professional equipment, selected for the material and job.
              </div>
            </div>

            <div className={styles.cleanCopy}>
              <p className={styles.kicker}>What we clean</p>
              <h2>Focused on the surfaces people use every day</h2>
              <p>
                Our work is centered on furniture and soft surfaces in the home. For a more accurate estimate, send photos of the complete item together with close-ups of stains, wear or other concerns.
              </p>
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
            <p className={styles.kicker}>Service area</p>
            <h2>Serving homes across the GTA</h2>
            <p>
              SoftNest serves Mississauga, Toronto, Brampton, Oakville, Burlington, Etobicoke, Vaughan, Milton, Hamilton and nearby communities. Send your location with the quote request so we can confirm service availability.
            </p>
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
              <p className={styles.kicker}>Free photo estimate</p>
              <h2>Show us what needs cleaning</h2>
              <p>
                Send the item details and any problem areas. We will review the scope and confirm the estimate before the work begins.
              </p>
            </div>
            <div className={styles.finalActions}>
              <Link className={styles.lightButton} href="/quote/">Request a free quote</Link>
              <a className={styles.outlineButton} href="tel:+14167270287">Call now</a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />

      {[aboutSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
