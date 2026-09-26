import { jsonLd } from "@/seo/structuredData";
import { pageText } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import HeroActionButtons from "@/components/HeroActionButtons";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import LocationReviews from "@/components/locations/LocationReviews";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/content/locations";
import { getService } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { FeatureIcon, defaultLocalAdvantages, defaultProcessSteps, defaultQuickBenefits } from "./expandedLocationDefaults";
import { getExpandedLocationSchemas } from "./expandedLocationSchemas";













function copyText(location: Location, key: string, fallback: string) {
  const copy = location.expandedContent?.copy;
  return copy?.some((item) => item.key === key)
    ? pageText(copy, key, location.name)
    : fallback;
}

export default function ExpandedLocationPage({
  location,
}: {
  location: Location;
}) {
  const expanded = location.expandedContent;
  const heroImage = expanded?.heroImage || siteConfig.heroImage;
  const quickBenefits = expanded?.quickBenefits?.length ? expanded.quickBenefits : defaultQuickBenefits;
  const processSteps = expanded?.processSteps ?? defaultProcessSteps;
  const localAdvantages = expanded?.localAdvantages ?? defaultLocalAdvantages;
  const locationFaqs = expanded?.mississaugaFaqs ?? location.faq;
  const mapLabels = new Map(
    (expanded?.mapLabels ?? [])
      .filter((label) =>
        Number.isFinite(label.left) && label.left >= 0 && label.left <= 100 &&
        Number.isFinite(label.top) && label.top >= 0 && label.top <= 100,
      )
      .map((label) => [label.name, label] as const),
  );
  const services = (
    expanded?.services ??
    location.availableServices
      .map(getService)
      .filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service))
      .map((service) => ({
        slug: service.slug,
        title: service.name,
        description: service.summary,
        image: service.image,
        alt: service.imageAlt,
      }))
  ).map((service) => {
    const canonicalService = getService(service.slug);

    return {
      ...service,
      image: canonicalService?.image ?? service.image,
      alt: canonicalService?.imageAlt ?? service.alt,
    };
  });
  const schemas = getExpandedLocationSchemas(location, services, locationFaqs);

  return (
    <>
      <div className="new-hero-root miss-header">
        <SiteHeader current="locations" />
      </div>

      <main className="miss-page">
        <section
          className={`miss-hero ${location.slug === "mississauga" ? "miss-hero--mississauga" : ""}`.trim()}
          aria-labelledby="miss-hero-title"
        >
          <div className="miss-hero__photo" aria-hidden="true">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="miss-hero__wash" aria-hidden="true" />
          <div className="miss-hero__copy">
            <p className="miss-kicker">Proudly serving {location.name}</p>
            <span className="miss-kicker-line" aria-hidden="true" />
            <h1 id="miss-hero-title">
              {copyText(location, "page-2", "Upholstery &")}<br />
              {copyText(location, "page-3", "Carpet Cleaning")}<span>{copyText(location, "page-4", `in ${location.name}`)}</span>
            </h1>
            <p className="miss-hero__description">
              Professional upholstery and carpet cleaning for {location.name} homes and condos—using fabric-safe products, professional equipment, and meticulous care.</p>
            <HeroActionButtons
              quoteAriaLabel={`Get a free upholstery and carpet cleaning quote in ${location.name}`}
            />
          </div>
        </section>

        <section className="miss-care-band" aria-labelledby="miss-care-heading">
          <div className="miss-care-band__intro">
            <p className="miss-kicker">Care in {location.name}</p>
            <h2 id="miss-care-heading">Cleaning planned around your home</h2>
            <p>
              Share photos, fabric details, access notes, and the items you want cleaned. We’ll confirm the recommended service and scope before your appointment.</p>
          </div>
          <div className="miss-care-band__features">
            {quickBenefits.map((benefit) => (
              <article key={benefit.title}>
                <span className="miss-round-icon">
                  <FeatureIcon name={benefit.icon} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="miss-services"
          id="services"
          aria-labelledby="miss-services-heading"
        >
          <div className="miss-section-heading">
            <p className="miss-kicker">What we clean</p>
            <span className="miss-section-rule" aria-hidden="true" />
            <h2 id="miss-services-heading">Cleaning services in {location.name}</h2>
            <p className="miss-section-heading__intro">
              Explore upholstery and carpet cleaning services available across {location.name}, with methods selected for each material, condition, and concern.</p>
          </div>
          <div className="miss-service-grid">
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}/`}
                key={service.title}
                aria-label={`Learn about ${service.title.toLowerCase()}`}
              >
                <span className="miss-service-grid__image">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 25vw"
                  />
                </span>
                <span className="miss-service-grid__body">
                  <h3>{service.title}</h3>
                  <span className="miss-card-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <LocationReviews location={location} />

        <section className="miss-process" aria-labelledby="miss-process-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{copyText(location, "page-16", "Our process")}</p>
            <span className="miss-section-rule" aria-hidden="true" />
            <h2 id="miss-process-heading">How our cleaning works</h2>
            <p className="miss-section-heading__intro">
              A clear four-step process—from your photo estimate to cleaning, professional drying, and a final walkthrough.</p>
          </div>
          <ol>
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="miss-process__number">{index + 1}</span>
                <span className="miss-process__icon">
                  <FeatureIcon name={step.icon} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="miss-coverage" aria-labelledby="miss-coverage-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Our service area</p>
            <span className="miss-section-rule" aria-hidden="true" />
            <h2 id="miss-coverage-heading">Serving all of {location.name}</h2>
          </div>
          <div className="miss-coverage__content">
            {expanded?.mapImage ? <div className="miss-map">
              <Image
                src={expanded.mapImage}
                alt={expanded.mapAlt || `Service coverage in ${location.name}`}
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              {location.neighbourhoods.filter((name) => mapLabels.has(name)).map((neighbourhood) => {
                const label = mapLabels.get(neighbourhood)!;
                return (
                  <span
                    className="miss-map__label"
                    style={{ left: `${label.left}%`, top: `${label.top}%` }}
                    key={neighbourhood}
                  >
                    {neighbourhood}
                  </span>
                );
              })}
            </div> : <div className="softnest-map miss-map">
              <iframe
                title={`SoftNest service map for ${location.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`}
              />
            </div>}
            <div className="miss-coverage__copy">
              <p>
                SoftNest provides upholstery and carpet cleaning throughout {location.name}, including condos, houses, apartments, and commercial spaces.</p>
              <p className="miss-coverage__detail">
                These neighbourhoods are examples of areas we serve—not service boundaries.</p>
              <p className="miss-coverage__includes">Including:</p>
              <ul>
                {location.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span aria-hidden="true">✓</span>
                    {neighbourhood}
                  </li>
                ))}
              </ul>
              <small>
                Live elsewhere in {location.name}? You are still in our service
                area. Send your postal code and we’ll confirm your appointment.</small>
            </div>
          </div>
        </section>

        <section className="miss-local-value" aria-labelledby="miss-local-value-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{copyText(location, "page-23", "Why choose SoftNest")}</p>
            <span className="miss-section-rule" aria-hidden="true" />
            <h2 id="miss-local-value-heading">
              Why choose SoftNest in {location.name}</h2>
            <p className="miss-section-heading__intro">
              Fabric-aware methods, clear estimates, and practical scheduling for homes and condos across {location.name}.</p>
          </div>
          <div className="miss-local-value__grid">
            {localAdvantages.map((advantage) => (
              <article key={advantage.title}>
                <span className="miss-round-icon">
                  <FeatureIcon name={advantage.icon} />
                </span>
                <div>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <HomeFaqExplorer items={locationFaqs} />

        <DirectoryFinalCta
          id="quote-cta"
          kicker="Professional care for every room"
          title="Ready for a Fresher, Cleaner Home?"
          description="Get a quote today and experience the SoftNest difference."
          action={{ href: "/quote/", label: siteConfig.quoteLabel }}
          image="/images/softnest-hero-room.webp"
          imageAlt="Bright living room with a deep green sofa"
          className="site-final-cta"
        />
      </main>

      <SiteFooter />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
