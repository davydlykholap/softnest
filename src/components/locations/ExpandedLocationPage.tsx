import { jsonLd } from "@/seo/structuredData";
import { pageText } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import HeroActionButtons from "@/components/HeroActionButtons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/content/locations";
import { organizationProvider, siteConfig } from "@/lib/site";













function FeatureIcon({ name }: { name: string }) {
  if (name === "building") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 28V6h18v22M11 10h3M18 10h3M11 15h3M18 15h3M11 20h3M18 20h3M14 28v-4h4v4" />
      </svg>
    );
  }
  if (name === "fabric") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 11c4-5 16-5 20 0v10c-4 5-16 5-20 0V11Z" />
        <path d="M6 12c5 4 15 4 20 0M10 24c2-5 10-5 12 0" />
      </svg>
    );
  }
  if (name === "dryer") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="4" />
        <path d="M16 12c-1-5 1-8 4-8 3 1 3 5 0 8M20 16c5-1 8 1 8 4-1 3-5 3-8 0M16 20c1 5-1 8-4 8-3-1-3-5 0-8M12 16c-5 1-8-1-8-4 1-3 5-3 8 0" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 10h6l2-3h6l2 3h6v16H5z" />
        <circle cx="16" cy="18" r="5" />
      </svg>
    );
  }
  if (name === "estimate") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 4h12l5 5v19H8zM20 4v6h6M12 15h9M12 20h9" />
      </svg>
    );
  }
  if (name === "cleaning") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M18 4 8 24M13 21l10 5M16 15l7 4M22 8c3 1 5 3 6 6" />
      </svg>
    );
  }
  if (name === "sparkle") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10ZM25 20c.6 3 1.4 3.8 4 4-2.6.2-3.4 1-4 4-.6-3-1.4-3.8-4-4 2.6-.2 3.4-1 4-4Z" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 28s8-7 8-15a8 8 0 1 0-16 0c0 8 8 15 8 15Z" />
        <circle cx="16" cy="13" r="3" />
      </svg>
    );
  }
  if (name === "equipment") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 5h16v20H8zM12 9h8M11 15h10M12 25v3M20 25v3" />
        <circle cx="13" cy="20" r="2" />
        <circle cx="19" cy="20" r="2" />
      </svg>
    );
  }
  if (name === "inspection") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="14" cy="14" r="7" />
        <path d="m19 19 8 8M10 14l3 3 5-6" />
      </svg>
    );
  }
  if (name === "home") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m4 15 12-10 12 10M8 13v14h16V13M13 27v-8h6v8" />
      </svg>
    );
  }
  return null;
}

export default function ExpandedLocationPage({
  location,
}: {
  location: Location;
}) {
  const { quickBenefits, services, resultExamples, processSteps, localAdvantages, mississaugaFaqs } = location.expandedContent!;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Upholstery and Carpet Cleaning in ${location.name}`,
    url: `${siteConfig.url}/location/${location.slug}/`,
    image: siteConfig.heroImage,
    serviceType: [
      "Upholstery cleaning",
      "Sofa and sectional cleaning",
      "Carpet cleaning",
      "Area rug cleaning",
      "Dining chair cleaning",
      "Mattress cleaning",
      "Armchair cleaning",
      "Pet stain and odour removal",
    ],
    description:
      location.introduction,
    provider: organizationProvider(),
    areaServed: [
      {
        "@type": "City",
        name: location.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Ontario",
        },
      },
      ...location.neighbourhoods.map((name) => ({
        "@type": "Place",
        name,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${location.name} cleaning services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${siteConfig.url}/services/${service.slug}/`,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: siteConfig.url + "/location/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `${siteConfig.url}/location/${location.slug}/`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mississaugaFaqs.map((item) => ({
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
      <div className="new-hero-root miss-header">
        <SiteHeader current="locations" />
      </div>

      <main className="miss-page">
        <section className="miss-hero" aria-labelledby="miss-hero-title">
          <div className="miss-hero__photo" aria-hidden="true">
            <Image
              src={location.expandedContent!.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="miss-hero__wash" aria-hidden="true" />
          <div className="miss-hero__copy">
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-1", location.name) + ""}</p>
            <span className="miss-kicker-line" aria-hidden="true" />
            <h1 id="miss-hero-title">
              {" " + pageText(location.expandedContent!.copy, "page-2", location.name) + " "}<br />
              {" " + pageText(location.expandedContent!.copy, "page-3", location.name) + " "}<span>{"" + pageText(location.expandedContent!.copy, "page-4", location.name) + ""}</span>
            </h1>
            <p className="miss-hero__description">
              {" " + pageText(location.expandedContent!.copy, "page-5", location.name) + " "}</p>
            <HeroActionButtons
              quoteAriaLabel={`Get a free upholstery and carpet cleaning quote in ${location.name}`}
            />
          </div>
        </section>

        <section className="miss-care-band" aria-labelledby="miss-care-heading">
          <div className="miss-care-band__intro">
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-6", location.name) + ""}</p>
            <h2 id="miss-care-heading">{"" + pageText(location.expandedContent!.copy, "page-7", location.name) + ""}</h2>
            <p>
              {" " + pageText(location.expandedContent!.copy, "page-8", location.name) + " "}</p>
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
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-9", location.name) + ""}</p>
            <h2 id="miss-services-heading">{"" + pageText(location.expandedContent!.copy, "page-10", location.name) + ""}</h2>
            <p className="miss-section-heading__intro">
              {" " + pageText(location.expandedContent!.copy, "page-11", location.name) + " "}</p>
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

        <section
          className="miss-results"
          id="results"
          aria-labelledby="miss-results-heading"
        >
          <div className="miss-section-heading miss-section-heading--split">
            <div>
              <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-12", location.name) + ""}</p>
              <h2 id="miss-results-heading">{"" + pageText(location.expandedContent!.copy, "page-13", location.name) + ""}</h2>
            </div>
            <p className="miss-section-heading__intro">
              {" " + pageText(location.expandedContent!.copy, "page-14", location.name) + " "}</p>
          </div>
          <div className="miss-results__grid">
            {resultExamples.map((result) => (
              <article key={result.title}>
                <BeforeAfterCompare
                  src={result.image}
                  alt={result.alt}
                  category={result.category}
                />
                <div className="miss-results__caption">
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="miss-results__action">
            <Link className="miss-button miss-button--outline" href="/#results">
              {" " + pageText(location.expandedContent!.copy, "page-15", location.name) + " "}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="miss-process" aria-labelledby="miss-process-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-16", location.name) + ""}</p>
            <h2 id="miss-process-heading">{"" + pageText(location.expandedContent!.copy, "page-17", location.name) + ""}</h2>
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
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-18", location.name) + ""}</p>
            <h2 id="miss-coverage-heading">{"" + pageText(location.expandedContent!.copy, "page-19", location.name) + ""}</h2>
          </div>
          <div className="miss-coverage__content">
            {location.expandedContent!.mapImage ? <div className="miss-map">
              <Image
                src={location.expandedContent!.mapImage!}
                alt={location.expandedContent!.mapAlt || `Service coverage in ${location.name}`}
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              {location.neighbourhoods.filter(name=>location.expandedContent!.mapLabels?.some(label=>label.name===name)).map((neighbourhood) => (
                <span
                  className="miss-map__label"
                  style={(() => { const label=location.expandedContent!.mapLabels?.find(item=>item.name===neighbourhood); return label?{left:`${label.left}%`,top:`${label.top}%`}:undefined; })()}
                  key={neighbourhood}
                >
                  {neighbourhood}
                </span>
              ))}
            </div> : null}
            <div className="miss-coverage__copy">
              <p>
                {" " + pageText(location.expandedContent!.copy, "page-20", location.name) + " "}</p>
              <p className="miss-coverage__detail">
                {" " + pageText(location.expandedContent!.copy, "page-21", location.name) + " "}</p>
              <ul>
                {location.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span aria-hidden="true">✓</span>
                    {neighbourhood}
                  </li>
                ))}
              </ul>
              <small>
                {" " + pageText(location.expandedContent!.copy, "page-22", location.name) + " "}</small>
            </div>
          </div>
        </section>

        <section className="miss-local-value" aria-labelledby="miss-local-value-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-23", location.name) + ""}</p>
            <h2 id="miss-local-value-heading">
              {" " + pageText(location.expandedContent!.copy, "page-24", location.name) + " "}</h2>
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
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-25", location.name) + ""}</p>
            <h2 id="miss-faq-heading">
              {" " + pageText(location.expandedContent!.copy, "page-26", location.name) + " "}</h2>
          </div>
          <div className="miss-faq__grid">
            {mississaugaFaqs.map((item) => (
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
              src={location.expandedContent!.heroImage}
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
            <p className="miss-kicker">{"" + pageText(location.expandedContent!.copy, "page-27", location.name) + ""}</p>
            <h2 id="miss-cta-heading">{"" + pageText(location.expandedContent!.copy, "page-28", location.name) + ""}</h2>
            <p>
              {" " + pageText(location.expandedContent!.copy, "page-29", location.name) + " "}</p>
            <div className="hero__actions miss-final-actions">
              <Link
                className="button button--primary quote-cta quote-cta--pulse"
                href="/quote/"
              >
                {" " + pageText(location.expandedContent!.copy, "page-30", location.name) + " "}<svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
              <a
                className="button button--secondary"
                href={siteConfig.phoneHref}
              >
                {" " + pageText(location.expandedContent!.copy, "page-31", location.name) + " "}</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {[serviceSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
