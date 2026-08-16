import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import HeroActionButtons from "@/components/HeroActionButtons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/data/locations";
import { organizationProvider, siteConfig } from "@/lib/site";

const quickBenefits = [
  {
    icon: "building",
    title: "Condo & high-rise access",
    description: "Visitor parking, elevators and loading details planned in advance.",
  },
  {
    icon: "fabric",
    title: "Fabric-specific cleaning",
    description: "Methods selected for upholstery, carpet and area-rug fibres.",
  },
  {
    icon: "dryer",
    title: "Professional drying",
    description: "Air movers included to support faster, more even drying.",
  },
  {
    icon: "camera",
    title: "Free photo estimates",
    description: "Send full-item photos and close-ups before booking.",
  },
] as const;

const services = [
  {
    slug: "sectional-furniture-cleaning",
    title: "Sofas & Sectionals",
    description:
      "Professional sofa and sectional cleaning for body oils, food spills, everyday soil and odours.",
    image: "/img/sofa.png",
    alt: "Grey upholstered sofa in a natural home interior",
  },
  {
    slug: "carpet-area-rug-cleaning",
    title: "Carpets & Area Rugs",
    description:
      "Residential carpet and suitable area-rug cleaning for traffic lanes, embedded dirt and frequently used rooms.",
    image: "/img/before_after_carpet_cleaning.webp",
    alt: "Before and after residential carpet and area rug cleaning",
  },
  {
    slug: "dining-chair-cleaning",
    title: "Dining Chairs & Armchairs",
    description:
      "Upholstered dining chair and armchair cleaning for seats, backs, food marks and everyday buildup.",
    image: "/img/dining_chairs.webp",
    alt: "Before and after cleaning of upholstered dining chairs and armchairs",
  },
  {
    slug: "pet-stain-odour-removal",
    title: "Pet Stain & Odour Removal",
    description:
      "Targeted treatment for pet accidents, visible staining and odour sources, with realistic expectations explained first.",
    image: "/img/pet_stain.jpg",
    alt: "Professional pet stain and odour treatment on upholstered furniture",
  },
] as const;

const resultExamples = [
  {
    category: "Sofa",
    title: "Sectional sofa cleaning",
    description: "Stain treatment and cleaning across the accessible fabric surfaces.",
    image: "/img/gray_sofa_stain.png",
    alt: "Before and after stain removal on a grey sectional sofa cushion",
  },
  {
    category: "Carpet",
    title: "Residential carpet cleaning",
    description: "High-traffic soil lifted for a cleaner, more even overall finish.",
    image: "/img/before_after_carpet_cleaning.webp",
    alt: "Before and after cleaning of a residential hallway carpet",
  },
  {
    category: "Dining chairs",
    title: "Upholstered chair cleaning",
    description: "Food marks and everyday buildup treated across the chair seats.",
    image: "/img/dining_chairs.webp",
    alt: "Before and after cleaning of two upholstered dining chairs",
  },
  {
    category: "Sectional",
    title: "Full sectional cleaning",
    description: "Cushions and accessible sections cleaned for a fresher overall result.",
    image: "/img/sectional.png",
    alt: "Before and after cleaning of a large light-coloured sectional sofa",
  },
] as const;

const processSteps = [
  {
    icon: "camera",
    title: "Send photos",
    description:
      "Show the full furniture item or carpeted area and include close-ups of stains or concerns.",
  },
  {
    icon: "estimate",
    title: "Receive a clear estimate",
    description:
      "We confirm the expected scope, included cleaning and any access details before booking.",
  },
  {
    icon: "cleaning",
    title: "Inspection & cleaning",
    description:
      "We inspect the material on site, prepare the work area and use an appropriate cleaning method.",
  },
  {
    icon: "sparkle",
    title: "Drying & final review",
    description:
      "Air movers support faster drying, followed by a final walkthrough and practical after-care guidance.",
  },
] as const;

const localAdvantages = [
  {
    icon: "pin",
    title: "GTA-wide scheduling",
    description:
      "Appointments planned across Mississauga and other Greater Toronto Area communities.",
  },
  {
    icon: "equipment",
    title: "Commercial-grade equipment",
    description:
      "Professional extraction equipment selected for upholstery, carpet and suitable area rugs.",
  },
  {
    icon: "inspection",
    title: "Honest stain expectations",
    description:
      "We explain what appears treatable and where dye loss, wear or fibre damage may remain.",
  },
  {
    icon: "home",
    title: "Multiple items in one visit",
    description:
      "Combine sofas, chairs, mattresses, carpets, suitable rugs and pet treatment in one photo-estimate request.",
  },
] as const;

const mississaugaFaqs = [
  {
    question: "How much does upholstery cleaning cost in Mississauga?",
    answer:
      "Pricing depends on the item’s size, design, fabric and condition. Send clear photos of the full item and any problem areas, and we can usually provide an estimated price before booking.",
  },
  {
    question: "Do you provide condo upholstery cleaning in Mississauga?",
    answer:
      "Yes. Please share visitor-parking, loading, elevator-booking and access instructions with your quote request so the appointment can be planned around your building’s rules.",
  },
  {
    question: "Can you treat pet odours in sofas and sectionals?",
    answer:
      "Yes. We assess how far the contamination may have travelled and explain the suitable treatment options and realistic limitations before beginning.",
  },
  {
    question: "How long does upholstery take to dry?",
    answer:
      "Many upholstery items dry in roughly two to four hours, although fabric type, airflow, humidity and soil level affect the timing. Professional drying with our air movers is included.",
  },
  {
    question: "Can carpet and upholstery be cleaned in one appointment?",
    answer:
      "Often, yes. Include every sofa, chair, carpeted room, staircase or suitable area rug in the same request so we can confirm the scope, timing and estimated price.",
  },
  {
    question: "Do you move furniture before carpet cleaning?",
    answer:
      "We discuss safe access and light-item movement before the visit. Large, fragile or heavily loaded furniture may need to remain in place or be moved by the customer in advance.",
  },
  {
    question: "What if an old stain does not come out completely?",
    answer:
      "We provide realistic expectations after inspection. Age, dye loss, fibre damage, heat and previous cleaning products can permanently alter the material and limit improvement.",
  },
  {
    question: "Which Mississauga neighbourhoods do you serve?",
    answer:
      "We serve homes and condos across Mississauga, including City Centre, Port Credit, Streetsville, Clarkson, Meadowvale, Erin Mills, Cooksville and Mineola. Send your postal code to confirm availability.",
  },
] as const;

const neighbourhoodPositions: Record<string, CSSProperties> = {
  Meadowvale: { left: "24%", top: "18%" },
  Streetsville: { left: "28%", top: "42%" },
  "Erin Mills": { left: "43%", top: "31%" },
  "City Centre": { left: "59%", top: "37%" },
  Cooksville: { left: "61%", top: "52%" },
  Clarkson: { left: "29%", top: "70%" },
  Mineola: { left: "70%", top: "63%" },
  "Port Credit": { left: "63%", top: "77%" },
};

// Change this path whenever the photo shown inside the reusable phone changes.
const phoneScreenImage = "/images/softnest-hero-room.webp";

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

export default function MississaugaPage({
  location,
}: {
  location: Location;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Upholstery and Carpet Cleaning in Mississauga",
    url: `${siteConfig.url}/location/mississauga/`,
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
      "Professional upholstery and carpet cleaning in Mississauga for sofas, sectionals, chairs, mattresses, carpets and suitable area rugs, including pet stain and odour treatment, free photo estimates and professional drying.",
    provider: organizationProvider(),
    areaServed: [
      {
        "@type": "City",
        name: "Mississauga",
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
      name: "Mississauga cleaning services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `https://softnestcare.ca/services/${service.slug}/`,
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
        item: "https://softnestcare.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://softnestcare.ca/location/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mississauga",
        item: "https://softnestcare.ca/location/mississauga/",
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
              src="/images/softnest-hero-room.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="miss-hero__wash" aria-hidden="true" />
          <div className="miss-hero__copy">
            <p className="miss-kicker">Local fabric care, done right</p>
            <span className="miss-kicker-line" aria-hidden="true" />
            <h1 id="miss-hero-title">
              Upholstery &amp;
              <br />
              Carpet Cleaning
              <span>in Mississauga</span>
            </h1>
            <p className="miss-hero__description">
              Professional cleaning for sofas, sectionals, chairs, carpets and
              area rugs—planned around your fabric, home, condo access and
              preferred appointment time.
            </p>
            <HeroActionButtons
              quoteAriaLabel="Get a free upholstery and carpet cleaning quote in Mississauga"
            />
          </div>
        </section>

        <section className="miss-care-band" aria-labelledby="miss-care-heading">
          <div className="miss-care-band__intro">
            <p className="miss-kicker">Care that fits Mississauga</p>
            <h2 id="miss-care-heading">Local cleaning, planned before arrival</h2>
            <p>
              We review your photos, fabric, item count and access details so
              the appointment begins with a clear scope and an appropriate
              cleaning plan.
            </p>
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
            <p className="miss-kicker">Our services</p>
            <h2 id="miss-services-heading">What we clean in Mississauga</h2>
            <p className="miss-section-heading__intro">
              From frequently used furniture to carpets, area rugs and pet-related
              concerns, we select the cleaning approach after inspecting the
              material and condition.
            </p>
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
              <p className="miss-kicker">Real cleaning results</p>
              <h2 id="miss-results-heading">Before &amp; after results you can inspect</h2>
            </div>
            <p className="miss-section-heading__intro">
              Examples from sofa, chair and residential carpet cleaning. Final
              results depend on fibre type, condition, staining and previous
              treatments.
            </p>
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
              View more results <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="miss-process" aria-labelledby="miss-process-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Our process</p>
            <h2 id="miss-process-heading">A simple, clear cleaning process</h2>
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
            <h2 id="miss-coverage-heading">Serving Mississauga neighbourhoods</h2>
          </div>
          <div className="miss-coverage__content">
            <div className="miss-map">
              <Image
                src="/img/mississauga/service-area-map.webp"
                alt="Map showing SoftNest service coverage across Mississauga neighbourhoods"
                fill
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              {location.neighbourhoods.map((neighbourhood) => (
                <span
                  className="miss-map__label"
                  style={neighbourhoodPositions[neighbourhood]}
                  key={neighbourhood}
                >
                  {neighbourhood}
                </span>
              ))}
            </div>
            <div className="miss-coverage__copy">
              <p>
                We serve City Centre and Square One condos, Port Credit
                apartments, and family homes across Erin Mills, Meadowvale,
                Streetsville, Clarkson, Cooksville and Mineola.
              </p>
              <p className="miss-coverage__detail">
                For condo appointments, include visitor parking, loading access
                and elevator-booking requirements with your quote request.
              </p>
              <ul>
                {location.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span aria-hidden="true">✓</span>
                    {neighbourhood}
                  </li>
                ))}
              </ul>
              <small>
                Nearby area? Send your postal code and we’ll confirm availability.
              </small>
            </div>
          </div>
        </section>

        <section className="miss-local-value" aria-labelledby="miss-local-value-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Why choose SoftNest</p>
            <h2 id="miss-local-value-heading">
              Why Mississauga homeowners choose our cleaning service
            </h2>
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
            <p className="miss-kicker">Frequently asked questions</p>
            <h2 id="miss-faq-heading">
              Mississauga upholstery &amp; carpet cleaning FAQs
            </h2>
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
              src={phoneScreenImage}
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
            <p className="miss-kicker">Free photo estimates</p>
            <h2 id="miss-cta-heading">Show us what needs cleaning</h2>
            <p>
              Send clear photos of the full item and problem areas for a
              no-obligation estimate before booking.
            </p>
            <div className="hero__actions miss-final-actions">
              <Link
                className="button button--primary quote-cta quote-cta--pulse"
                href="/quote/"
              >
                Request a free quote
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
              <a
                className="button button--secondary"
                href="tel:+14167270287"
              >
                Call (416) 727-0287
              </a>
            </div>
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
