import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Service } from "@/data/services";
import { getService } from "@/data/services";
import { absoluteUrl, organizationProvider, siteConfig } from "@/lib/site";
import styles from "@/app/services/service-page.module.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ServicePage({ service }: { service: Service }) {
  const related = service.relatedServices
    .map((slug) => getService(slug))
    .filter((item): item is Service => Boolean(item));
  const heroProofs = service.heroProofs ?? [
    "Commercial-grade equipment",
    "Standard stain treatment",
    "Professional drying included",
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}/#service`,
    name: service.name,
    url: `${siteConfig.url}/services/${service.slug}/`,
    image: absoluteUrl(service.image),
    description: service.metaDescription,
    serviceType: service.serviceType,
    provider: organizationProvider(),
    areaServed: siteConfig.areasServed,
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
        name: "Services",
        item: `${siteConfig.url}/services/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${siteConfig.url}/services/${service.slug}/`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <div className="new-hero-root service-header">
        <SiteHeader current="services" />
      </div>

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="service-heading">
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services/">Services</Link>
              <span aria-hidden="true">/</span>
              <span>{service.shortName}</span>
            </nav>
            <p className={styles.eyebrow}>Professional fabric care across the GTA</p>
            <h1 id="service-heading">{service.heroTitle}</h1>
            <p className={styles.heroDescription}>{service.heroDescription}</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/quote/">
                Request a free quote <span aria-hidden="true">→</span>
              </Link>
              <a className={styles.secondaryButton} href="tel:+14167270287">
                Call (416) 727-0287
              </a>
            </div>
            <ul className={styles.heroProofs} aria-label="Service assurances">
              {heroProofs.map((proof) => (
                <li key={proof}><CheckIcon /> {proof}</li>
              ))}
            </ul>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className={styles.heroNote}>
              <strong>Free photo estimate</strong>
              <span>Send the full item and close-ups of problem areas.</span>
            </div>
          </div>
        </section>

        <section className={styles.introBand}>
          <div>
            <p className={styles.eyebrow}>What this service covers</p>
            <h2>Care planned around the material, condition and real concern</h2>
          </div>
          <p>{service.summary}</p>
        </section>

        <section className={styles.twoColumnSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Common concerns</p>
            <h2>What we commonly clean and treat</h2>
            <p>
              The final approach is confirmed after inspection. Photos help us
              identify the scope and flag anything that needs extra caution.
            </p>
          </div>
          <ul className={styles.concernGrid}>
            {service.concerns.map((concern) => (
              <li key={concern}>
                <CheckIcon />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.includedSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>What is included</p>
            <h2>{service.includedHeading ?? "A complete professional cleaning process"}</h2>
          </div>
          <div className={styles.includedGrid}>
            {service.included.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.processSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>How it works</p>
            <h2>{service.processHeading ?? "From photos to a cleaner, properly dried result"}</h2>
          </div>
          <ol className={styles.processList}>
            {service.process.map((step, index) => (
              <li key={step.title}>
                <span className={styles.processNumber}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.expectationsSection}>
          <article>
            <p className={styles.eyebrow}>{service.afterCareEyebrow ?? "Drying time"}</p>
            <h2>{service.afterCareHeading ?? "When the item can be used again"}</h2>
            <p>{service.drying}</p>
          </article>
          <article>
            <p className={styles.eyebrow}>Honest expectations</p>
            <h2>Cleaning cannot reverse permanent damage</h2>
            <p>{service.limitations}</p>
          </article>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Frequently asked questions</p>
            <h2>{service.name} FAQs</h2>
          </div>
          <div className={styles.faqList}>
            {service.faq.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Related services</p>
            <h2>Plan several items in one request</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link href={`/services/${item.slug}/`} key={item.slug}>
                <span className={styles.relatedImage}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </span>
                <span className={styles.relatedBody}>
                  <strong>{item.name}</strong>
                  <span>{item.summary}</span>
                  <b aria-hidden="true">→</b>
                </span>
              </Link>
            ))}
          </div>
          <Link className={styles.allServicesLink} href="/services/">
            View all cleaning services <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.finalCta}>
          <div>
            <p className={styles.eyebrow}>Free photo estimate</p>
            <h2>Show us what needs cleaning</h2>
            <p>
              Tell us what needs cleaning and add any stain, odour, access or
              timing notes. We will confirm the scope, price and available options.
            </p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.lightButton} href="/quote/">
              Request a free quote <span aria-hidden="true">→</span>
            </Link>
            <a className={styles.outlineButton} href="tel:+14167270287">
              Call now
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      {[serviceSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
