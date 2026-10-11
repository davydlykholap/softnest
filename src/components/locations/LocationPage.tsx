import { jsonLd } from "@/seo/structuredData";
import { pageText } from "@/content/pages";
import Image from "next/image";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import HeroActionButtons from "@/components/HeroActionButtons";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import LocationReviews from "@/components/locations/LocationReviews";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/content/locations";
import { getService } from "@/content/services";
import { siteConfig } from "@/lib/site";
import { FeatureIcon, defaultLocalAdvantages, defaultProcessSteps } from "./locationPageDefaults";
import { getLocationPageSchemas } from "./locationPageSchemas";
import OakvillePageSections from "./OakvillePageSections";
import { oakvillePage } from "@/content/oakvillePage";

function copyText(location: Location, key: string, fallback: string) {
  const copy = location.expandedContent?.copy;
  return copy?.some((item) => item.key === key)
    ? pageText(copy, key, location.name)
    : fallback;
}

export default function LocationPage({
  location,
}: {
  location: Location;
}) {
  const localOverrides = location.expandedContent;
  const isOakville = location.slug === "oakville";
  const heroImage = localOverrides?.heroImage || siteConfig.heroImage;
  const processSteps = localOverrides?.processSteps ?? defaultProcessSteps;
  const localAdvantages = localOverrides?.localAdvantages ?? defaultLocalAdvantages;
  const locationFaqs = isOakville ? location.faq : localOverrides?.mississaugaFaqs ?? location.faq;
  const services = (
    localOverrides?.services ??
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
  );
  const schemas = getLocationPageSchemas(location, services, locationFaqs);

  return (
    <>
      <div className="new-hero-root location-page-header">
        <SiteHeader current="locations" />
      </div>

      <main className={`location-page-page${isOakville ? " location-page-page--oakville" : ""}`}>
        <section
          className={`location-page-hero ${location.slug === "mississauga" ? "location-page-hero--mississauga" : ""}`.trim()}
          aria-labelledby="location-page-hero-title"
        >
          <div className="location-page-hero__photo" aria-hidden="true">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="location-page-hero__wash" aria-hidden="true" />
          <div className="location-page-hero__copy">
            <h1 id="location-page-hero-title">
              {isOakville ? "Upholstery, sofa &" : copyText(location, "page-2", "Upholstery &")}<br />
              {isOakville ? "carpet cleaning" : copyText(location, "page-3", "Carpet Cleaning")}<span>{isOakville ? "in Oakville" : copyText(location, "page-4", `in ${location.name}`)}</span>
            </h1>
            <p className="location-page-hero__description">
              {isOakville ? oakvillePage.heroDescription : `Professional upholstery and carpet cleaning for ${location.name} homes and condos—using fabric-safe products, professional equipment, and meticulous care.`}</p>
            <HeroActionButtons
              primaryTone="gold"
              quoteAriaLabel={`Get a free upholstery and carpet cleaning quote in ${location.name}`}
            />
          </div>
        </section>

        {isOakville ? (
          <OakvillePageSections location={location} />
        ) : (
          <>
            <LocationReviews location={location} />

            <section className="location-page-process" aria-labelledby="location-page-process-heading">
              <div className="location-page-section-heading">
                <span className="location-page-section-rule" aria-hidden="true" />
                <h2 id="location-page-process-heading">How our cleaning works</h2>
                <p className="location-page-section-heading__intro">
                  A clear four-step process—from your photo estimate to cleaning, professional drying, and a final walkthrough.</p>
              </div>
              <ol>
                {processSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className="location-page-process__number">{index + 1}</span>
                    <span className="location-page-process__icon">
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

            <section className="location-page-coverage" aria-labelledby="location-page-coverage-heading">
              <div className="location-page-section-heading">
                <span className="location-page-section-rule" aria-hidden="true" />
                <h2 id="location-page-coverage-heading">Serving all of {location.name}</h2>
              </div>
              <div className="location-page-coverage__content">
                <div className="softnest-map location-page-map">
                  <iframe
                    title={`SoftNest service map for ${location.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`}
                  />
                </div>
                <div className="location-page-coverage__copy">
                  <p>
                    SoftNest provides upholstery and carpet cleaning throughout {location.name}, including condos, houses, apartments, and commercial spaces.</p>
                  <p className="location-page-coverage__detail">
                    These neighbourhoods are examples of areas we serve—not service boundaries.</p>
                  <p className="location-page-coverage__includes">Including:</p>
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

            <section className="location-page-local-value" aria-labelledby="location-page-local-value-heading">
              <div className="location-page-section-heading">
                <span className="location-page-section-rule" aria-hidden="true" />
                <h2 id="location-page-local-value-heading">
                  Why choose SoftNest in {location.name}</h2>
                <p className="location-page-section-heading__intro">
                  Fabric-aware methods, clear estimates, and practical scheduling for homes and condos across {location.name}.</p>
              </div>
              <div className="location-page-local-value__grid">
                {localAdvantages.map((advantage) => (
                  <article key={advantage.title}>
                    <span className="location-page-round-icon">
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
              title="Ready for a Fresher, Cleaner Home?"
              description="Get a quote today and experience the SoftNest difference."
              action={{ href: "/quote/", label: siteConfig.quoteLabel }}
              image="/images/softnest-hero-room.webp"
              imageAlt="Bright living room with a deep green sofa"
              className="site-final-cta"
            />
          </>
        )}
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
