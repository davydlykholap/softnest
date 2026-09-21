import { jsonLd } from "@/seo/structuredData";
import { pageText } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import HeroActionButtons from "@/components/HeroActionButtons";
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
  const services =
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
      }));
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
            <p className="miss-kicker">{copyText(location, "page-1", `Professional fabric care in ${location.name}`)}</p>
            <span className="miss-kicker-line" aria-hidden="true" />
            <h1 id="miss-hero-title">
              {copyText(location, "page-2", "Upholstery &")}<br />
              {copyText(location, "page-3", "Carpet Cleaning")}<span>{copyText(location, "page-4", `in ${location.name}`)}</span>
            </h1>
            <p className="miss-hero__description">
              {copyText(location, "page-5", location.shortDescription)}</p>
            <HeroActionButtons
              quoteAriaLabel={`Get a free upholstery and carpet cleaning quote in ${location.name}`}
            />
          </div>
        </section>

        <section className="miss-care-band" aria-labelledby="miss-care-heading">
          <div className="miss-care-band__intro">
            <p className="miss-kicker">{copyText(location, "page-6", `Care that fits ${location.name}`)}</p>
            <h2 id="miss-care-heading">{copyText(location, "page-7", "Local cleaning, planned before arrival")}</h2>
            <p>
              {copyText(location, "page-8", location.localConsiderations)}</p>
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
            <p className="miss-kicker">{copyText(location, "page-9", "Our services")}</p>
            <h2 id="miss-services-heading">{copyText(location, "page-10", `What we clean in ${location.name}`)}</h2>
            <p className="miss-section-heading__intro">
              {copyText(location, "page-11", location.introduction)}</p>
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
                  <p>{service.description}</p>
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
            <h2 id="miss-process-heading">{copyText(location, "page-17", "A simple, clear cleaning process")}</h2>
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
            <p className="miss-kicker">{copyText(location, "page-18", "Our service area")}</p>
            <h2 id="miss-coverage-heading">{copyText(location, "page-19", `Serving ${location.name} neighbourhoods`)}</h2>
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
                {copyText(location, "page-20", location.introduction)}</p>
              <p className="miss-coverage__detail">
                {copyText(location, "page-21", location.localConsiderations)}</p>
              <ul>
                {location.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span aria-hidden="true">✓</span>
                    {neighbourhood}
                  </li>
                ))}
              </ul>
              <small>
                {copyText(location, "page-22", "Nearby area? Send your postal code and we’ll confirm availability.")}</small>
            </div>
          </div>
        </section>

        <section className="miss-local-value" aria-labelledby="miss-local-value-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{copyText(location, "page-23", "Why choose SoftNest")}</p>
            <h2 id="miss-local-value-heading">
              {copyText(location, "page-24", `Why ${location.name} homeowners choose our cleaning service`)}</h2>
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

        <section className="miss-faq" id="faq" aria-labelledby="miss-faq-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{copyText(location, "page-25", "Frequently asked questions")}</p>
            <h2 id="miss-faq-heading">
              {copyText(location, "page-26", `${location.name} upholstery & carpet cleaning FAQs`)}</h2>
          </div>
          <div className="miss-faq__grid">
            {locationFaqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="miss-final-cta" aria-labelledby="miss-cta-heading">
          <div
            className="miss-phone"
            aria-label="A replaceable cleaning photo shown inside a phone"
          >
            <Image
              className="miss-phone__screen"
              src={heroImage}
              alt=""
              fill
              sizes="250px"
            />
            <Image
              className="miss-phone__frame"
              src="/img/mississauga/phone-frame.webp"
              alt=""
              fill
              sizes="250px"
            />
          </div>
          <div className="miss-final-cta__copy">
            <p className="miss-kicker">{copyText(location, "page-27", "Free photo estimates")}</p>
            <h2 id="miss-cta-heading">{copyText(location, "page-28", "Show us what needs cleaning")}</h2>
            <p>
              {copyText(location, "page-29", "Send clear photos of the full item and problem areas for a no-obligation estimate before booking.")}</p>
            <div className="hero__actions miss-final-actions">
              <Link
                className="button button--primary quote-cta quote-cta--pulse"
                href="/quote/"
              >
                {copyText(location, "page-30", siteConfig.quoteLabel)}<svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
              <a
                className="button button--secondary"
                href={siteConfig.phoneHref}
              >
                {copyText(location, "page-31", `Call ${siteConfig.displayPhone}`)}</a>
            </div>
          </div>
        </section>
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
