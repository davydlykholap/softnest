import Image from "next/image";
import Link from "next/link";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import LocationReviews from "@/components/locations/LocationReviews";
import { oakvillePage } from "@/content/oakvillePage";
import type { Location } from "@/content/locations";
import { getService } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
import styles from "./OakvillePageSections.module.css";

export default function OakvillePageSections({ location }: { location: Location }) {
  return (
    <>
      <section className={styles.introduction} aria-label="Our approach">
        <span className={styles.rule} aria-hidden="true" />
        <p>{oakvillePage.introduction}</p>
      </section>

      <section className={styles.services} id="services" aria-label="What we clean">
        {oakvillePage.services.map((item, index) => {
          const service = getService(item.slug);
          return (
            <article className={styles.service} key={item.title}>
              {service ? (
                <div className={styles.serviceImage}>
                  <Image
                    src={item.title === "Carpets" ? optimizedLocalImage("/img/rug_2.webp") : service.image}
                    alt={item.title === "Carpets" ? "Hot-water extraction of a carpet with professional cleaning equipment" : service.imageAlt}
                    fill
                    sizes="(max-width: 700px) 100vw, 45vw"
                  />
                </div>
              ) : null}
              <div className={styles.serviceCopy}>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <h2>
                  <Link href={`/services/${item.slug}/`}>
                    {item.title}<span className={styles.arrow} aria-hidden="true">↗</span>
                  </Link>
                </h2>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
        <div className={styles.more}>
          <h2>And more</h2>
          <p>{oakvillePage.more}</p>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="oakville-why-heading">
        <div className={styles.whyHeading}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="oakville-why-heading">Why Oakville<br /> books SoftNest</h2>
        </div>
        <div className={styles.advantages}>
          {oakvillePage.advantages.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <LocationReviews location={location} heading="What Oakville customers say" />

      <HomeFaqExplorer items={location.faq} />

      <section className={styles.coverage} aria-labelledby="oakville-coverage-heading">
        <div className={styles.coverageCopy}>
          <h2 id="oakville-coverage-heading">Serving all of Oakville</h2>
          <p>{oakvillePage.coverage}</p>
          <ul aria-label="Neighbourhoods we serve">
            {location.neighbourhoods.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <p>{oakvillePage.coverageClosing}</p>
        </div>
        <div className={`softnest-map ${styles.map}`}>
          <iframe
            title="SoftNest service map for Oakville"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`}
          />
        </div>
      </section>

      <DirectoryFinalCta
        id="quote-cta"
        kicker="Professional care for every room"
        title={oakvillePage.ctaTitle}
        description={oakvillePage.ctaDescription}
        action={{ href: "/quote/", label: siteConfig.quoteLabel }}
        image="/images/softnest-hero-room.webp"
        imageAlt="Bright living room with a deep green sofa"
        className={`site-final-cta ${styles.finalCta}`}
      />
    </>
  );
}
