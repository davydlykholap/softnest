import Image from "next/image";
import Link from "next/link";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import LocationReviews from "@/components/locations/LocationReviews";
import HeroActionButtons from "@/components/HeroActionButtons";
import type { CityPageCopy } from "@/content/cityPages";
import type { Location } from "@/content/locations";
import { getService } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
import styles from "./CityPageSections.module.css";

export default function CityPageSections({ location, copy }: { location: Location; copy: CityPageCopy }) {
  return (
    <>
      <section className={styles.introduction} aria-labelledby="city-approach-heading">
        <h2 id="city-approach-heading">Care matched to your fabric.</h2>
        <div className={styles.introductionCopy}>
          {copy.introductionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.services} id="services" aria-label="What we clean">
        {copy.services.map((item) => {
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
          <p>{copy.more}</p>
          <div className={styles.moreActions}>
            <HeroActionButtons primaryTone="gold" showReviews={false} />
          </div>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="city-why-heading">
        <div className={styles.whyHeading}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="city-why-heading">Why {location.name}<br /> books SoftNest</h2>
        </div>
        <div className={styles.advantages}>
          {copy.advantages.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <LocationReviews location={location} />

      <section className={styles.coverage} aria-labelledby="city-coverage-heading">
        <div className={styles.coverageCopy}>
          <h2 id="city-coverage-heading">Serving all of {location.name}</h2>
          <p>{copy.coverage}</p>
          <ul aria-label="Neighbourhoods we serve">
            {location.neighbourhoods.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <p>{copy.coverageClosing}</p>
        </div>
        <div className={`softnest-map ${styles.map}`}>
          <iframe
            title={`SoftNest service map for ${location.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`}
          />
        </div>
      </section>

      <HomeFaqExplorer items={location.faq} />

      <DirectoryFinalCta
        id="quote-cta"
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        action={{ href: "/quote/", label: siteConfig.quoteLabel }}
        image="/images/softnest-hero-room.webp"
        imageAlt="Bright living room with a deep green sofa"
      />
    </>
  );
}
