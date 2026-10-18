import Image from "@/components/ResponsiveImage";
import Link from "next/link";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import LocalWorkEvidence from "@/components/LocalWorkEvidence";
import { getWorkProjects } from "@/content/work";
import HeroActionButtons from "@/components/HeroActionButtons";
import type { CityPageCopy } from "@/content/cityPages";
import type { Location } from "@/content/locations";
import { getService } from "@/content/services";
import { getLocation } from "@/content/locations";
import { cityServicePages, getCityServicePage } from "@/content/cityServicePages";
import { siteConfig } from "@/lib/site";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
import styles from "./CityPageSections.module.css";

export default function CityPageSections({ location, copy }: { location: Location; copy: CityPageCopy }) {
  const quoteHref = `/quote/?city=${encodeURIComponent(location.slug)}`;
  const localServices = cityServicePages.filter((page) => page.location.slug === location.slug);
  const nearbyLocations = location.nearbyLocations.map(getLocation).filter((item) => item?.indexInSearch);
  const additionalServices = ["sectional-furniture-cleaning", "mattress-cleaning", "pet-stain-odour-removal"]
    .map(getService).filter((service) => service !== undefined);
  return (
    <>
      <section className={styles.introduction} aria-labelledby="city-approach-heading">
        <h2 id="city-approach-heading">{copy.introductionHeading}</h2>
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
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {service ? (
                  <Link prefetch={false} className={styles.serviceLink} href={getCityServicePage(location.slug, service.slug)?.path ?? `/services/${service.slug}/`}>
                    {item.title === "Area rugs" ? "Explore carpet and area rug cleaning" : `Explore ${service.name.toLowerCase()}`}
                    <span aria-hidden="true"> →</span>
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
        <div className={styles.more}>
          <h2>And more</h2>
          <div className={styles.moreCopy}>
            <p>{copy.more}</p>
            <ul className={styles.relatedLinks} aria-label="More cleaning services">
              {additionalServices.map((service) => <li key={service.slug}><Link prefetch={false} href={getCityServicePage(location.slug, service.slug)?.path ?? `/services/${service.slug}/`}>{service.name}</Link></li>)}
            </ul>
          </div>
          <div className={styles.moreActions}>
            <HeroActionButtons primaryTone="gold" showReviews={false} quoteHref={quoteHref} />
          </div>
        </div>
      </section>

      {localServices.length > 0 ? <nav className={styles.localDirectory} aria-label={`Cleaning services in ${location.name}`}>
        <h2>Find your service in {location.name}</h2>
        <ul>{localServices.map((page) => <li key={page.path}><Link prefetch={false} href={page.path}>{page.profile.title}</Link></li>)}</ul>
      </nav> : null}

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

      <LocalWorkEvidence city={location.slug} cityName={location.name} fallbackReviews />
      <section className={styles.workDirectory} aria-label={"Cleaning results in " + location.name}>
        <h2>Our cleaning work in {location.name}</h2>
        <p>{getWorkProjects({city:location.slug}).length > 0
          ? "See documented cleaning appointments and photo details from this city."
          : "We will add local photos as we document completed appointments. We never label work from another city as a local result."}</p>
        <Link prefetch={false} href={"/our-work/" + location.slug + "/"}>View {location.name} cleaning results →</Link>
      </section>

      <section className={styles.coverage} aria-labelledby="city-coverage-heading">
        <div className={styles.coverageCopy}>
          <h2 id="city-coverage-heading">Serving all of {location.name}</h2>
          <p>{copy.coverage}</p>
          <ul aria-label="Neighbourhoods we serve">
            {location.neighbourhoods.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <p>{copy.coverageClosing}</p>
          <p className={styles.nearby}>
            Looking outside {location.name}?{" "}
            {nearbyLocations.slice(0, 3).map((nearby, index) => nearby ? (
              <span key={nearby.slug}>{index > 0 ? ", " : ""}<Link prefetch={false} href={`/location/${nearby.slug}/`}>{nearby.name}</Link></span>
            ) : null)}
            {" — or "}<Link prefetch={false} href="/location/">view all service areas</Link>.
          </p>
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
        action={{ href: quoteHref, label: siteConfig.quoteLabel }}
        image="/images/softnest-hero-room.webp"
        imageAlt="Bright living room with a deep green sofa"
      />
    </>
  );
}
