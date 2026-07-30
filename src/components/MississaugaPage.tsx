import Link from "next/link";
import type { CSSProperties } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/data/locations";

const services = [
  {
    title: "Sofas & Sectionals",
    description:
      "Deep cleaning for everyday soil, spills, body oils and fabric build-up.",
    image: "/img/sofa_cleaning.png",
    icon: "sofa",
  },
  {
    title: "Carpets & Stairs",
    description:
      "Thorough extraction for traffic lanes, embedded soil and carpeted steps.",
    image: "/img/carpet_staircase.png",
    icon: "stairs",
  },
  {
    title: "Dining Chairs",
    description:
      "Careful cleaning for upholstered seats, backs and frequently used sets.",
    image: "/img/dining_chairs.png",
    icon: "chair",
  },
  {
    title: "Area Rugs",
    description:
      "On-site care for suitable rugs after fibre, backing and colour checks.",
    image: "/img/rug_2.png",
    icon: "rug",
  },
];

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

// Change this one path whenever the photo shown inside the reusable phone changes.
const phoneScreenImage = "/images/softnest-hero-room.png";

function ServiceIcon({ name }: { name: string }) {
  if (name === "stairs") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 25h7v-6h7v-6h7V7h3" />
      </svg>
    );
  }
  if (name === "chair") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 15V7c0-2 1-3 3-3h6c2 0 3 1 3 3v8M8 15h16v7H8zM10 22v6M22 22v6" />
      </svg>
    );
  }
  if (name === "rug") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 6h20v20H6zM10 10h12v12H10zM3 9h3M3 15h3M3 21h3M26 9h3M26 15h3M26 21h3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 16V9c0-2 1-3 3-3h12c2 0 3 1 3 3v7M5 14c-2 0-3 2-3 4v7h28v-7c0-2-1-4-3-4M7 25v3M25 25v3M7 19h18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 12 4 4 8-9" />
    </svg>
  );
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
    url: "https://softnestcare.ca/location/mississauga/",
    serviceType: ["Upholstery cleaning", "Carpet cleaning"],
    description: location.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://softnestcare.ca/#business",
      name: "SoftNest Fabric Care",
      telephone: "+1-416-727-0287",
      email: "softnest.upholstery@outlook.com",
      url: "https://softnestcare.ca/",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mississauga",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Mississauga",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ontario",
      },
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
    mainEntity: location.faq.map((item) => ({
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
          <div className="miss-hero__photo" aria-hidden="true" />
          <div className="miss-hero__wash" aria-hidden="true" />
          <div className="miss-hero__copy">
            <nav className="miss-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/location/">Locations</Link>
              <span>/</span>
              <span>Mississauga</span>
            </nav>
            <p className="miss-kicker">Local fabric care, done right</p>
            <span className="miss-kicker-line" aria-hidden="true" />
            <h1 id="miss-hero-title">
              Upholstery &amp;
              <br />
              Carpet Cleaning
              <span>in Mississauga</span>
            </h1>
            <p className="miss-hero__description">
              Fabric-appropriate care for sofas, sectionals, chairs, carpets
              and area rugs—planned around your material, home and access.
            </p>
            <div className="miss-actions">
              <Link className="miss-button miss-button--solid" href="/quote/">
                Request a free quote <span aria-hidden="true">→</span>
              </Link>
              <a className="miss-button miss-button--outline" href="tel:+14167270287">
                <span aria-hidden="true">☎</span> Call (416) 727-0287
              </a>
            </div>
            <ul className="miss-hero__proofs" aria-label="Service assurances">
              <li>
                <CheckIcon />
                <span>Fabric-appropriate products</span>
              </li>
              <li>
                <CheckIcon />
                <span>Professional extraction</span>
              </li>
              <li>
                <CheckIcon />
                <span>Clear expectations</span>
              </li>
            </ul>
          </div>
          <div className="miss-hero__local">
            <span aria-hidden="true">⌖</span>
            Serving Mississauga
          </div>
        </section>

        <section className="miss-care-band" aria-labelledby="miss-care-heading">
          <div className="miss-care-band__icon" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <path d="M11 5h18v29H11zM16 12h8M16 18h8M16 24h5" />
              <path d="M27 31c2-7 6-9 9-9-1 6-4 9-9 9Z" />
            </svg>
          </div>
          <div>
            <p className="miss-kicker">Care before cleaning</p>
            <h2 id="miss-care-heading">
              Local fabric care, planned around your home
            </h2>
            <p>
              We inspect before treatment and recommend what your fabric or
              carpet actually needs. For condos, we coordinate around elevator,
              loading and parking details shared with your quote request.
            </p>
          </div>
          <ul>
            <li><CheckIcon /> Inspection before treatment</li>
            <li><CheckIcon /> Condo access and parking planning</li>
            <li><CheckIcon /> Respectful in-home care</li>
          </ul>
        </section>

        <section className="miss-services" id="services" aria-labelledby="miss-services-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Our services</p>
            <h2 id="miss-services-heading">What we clean in Mississauga</h2>
          </div>
          <div className="miss-service-grid">
            {services.map((service) => (
              <article key={service.title}>
                <img src={service.image} alt="" />
                <div>
                  <span className="miss-service-grid__icon">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="miss-results" id="results" aria-labelledby="miss-results-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Real results</p>
            <h2 id="miss-results-heading">Results you can inspect</h2>
          </div>
          <div className="miss-results__grid">
            <article>
              <span className="miss-results__category">Upholstery</span>
              <div className="miss-result-compare miss-result-compare--upholstery">
                <div className="miss-result-compare__half miss-result-compare__half--before" />
                <div className="miss-result-compare__half miss-result-compare__half--after" />
                <span className="miss-result-compare__line" aria-hidden="true">◆</span>
                <span className="miss-result-compare__label miss-result-compare__label--before">Before</span>
                <span className="miss-result-compare__label miss-result-compare__label--after">After</span>
              </div>
            </article>
            <article>
              <span className="miss-results__category">Carpet</span>
              <div className="miss-result-compare miss-result-compare--carpet">
                <div className="miss-result-compare__half miss-result-compare__half--before" />
                <div className="miss-result-compare__half miss-result-compare__half--after" />
                <span className="miss-result-compare__line" aria-hidden="true">◆</span>
                <span className="miss-result-compare__label miss-result-compare__label--before">Before</span>
                <span className="miss-result-compare__label miss-result-compare__label--after">After</span>
              </div>
            </article>
          </div>
          <p className="miss-results__note">
            Results vary by fibre, soil level and condition. We confirm what to
            expect after inspection.
          </p>
        </section>

        <section className="miss-process" aria-labelledby="miss-process-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Our process</p>
            <h2 id="miss-process-heading">A simple, clear process</h2>
          </div>
          <ol>
            <li>
              <span className="miss-process__number">1</span>
              <span className="miss-process__icon" aria-hidden="true">⌕</span>
              <div>
                <h3>Send photos</h3>
                <p>
                  Share photos of the areas you want cleaned and include stains
                  or concerns.
                </p>
              </div>
            </li>
            <li>
              <span className="miss-process__number">2</span>
              <span className="miss-process__icon" aria-hidden="true">✓</span>
              <div>
                <h3>Review the plan</h3>
                <p>
                  We review the material, recommend an approach and confirm
                  access needs.
                </p>
              </div>
            </li>
            <li>
              <span className="miss-process__number">3</span>
              <span className="miss-process__icon" aria-hidden="true">⌁</span>
              <div>
                <h3>Professional cleaning</h3>
                <p>
                  We inspect again, protect the work area, clean and provide
                  drying guidance.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="miss-coverage" aria-labelledby="miss-coverage-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">Our service area</p>
            <h2 id="miss-coverage-heading">Serving Mississauga neighbourhoods</h2>
          </div>
          <div className="miss-coverage__content">
            <div className="miss-map">
              <img
                src="/img/mississauga/service-area-map.webp"
                alt="Illustrated map of Mississauga and the Lake Ontario shoreline"
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
                From lakeside communities to high-rise condos, we plan service
                around Mississauga homes and building requirements.
              </p>
              <ul>
                {location.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood}>
                    <span aria-hidden="true">⌖</span>
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

        <section className="miss-faq" id="faq" aria-labelledby="miss-faq-heading">
          <div className="miss-section-heading">
            <p className="miss-kicker">FAQs</p>
            <h2 id="miss-faq-heading">
              Mississauga upholstery &amp; carpet cleaning FAQs
            </h2>
          </div>
          <div className="miss-faq__grid">
            {location.faq.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <details>
              <summary>Can carpet and upholstery be cleaned together?<span aria-hidden="true">+</span></summary>
              <p>
                Often, yes. Include every furniture item and carpeted area in
                your quote request so we can confirm the scope and timing.
              </p>
            </details>
            <details>
              <summary>Do you move furniture?<span aria-hidden="true">+</span></summary>
              <p>
                We discuss safe access and light-item movement before the visit.
                Large or fragile pieces may need to remain in place.
              </p>
            </details>
            <details>
              <summary>What if an old stain does not come out completely?<span aria-hidden="true">+</span></summary>
              <p>
                We explain realistic expectations before cleaning. Age, dye
                loss, fibre damage and previous products can limit improvement.
              </p>
            </details>
          </div>
        </section>

        <section className="miss-final-cta" aria-labelledby="miss-cta-heading">
          <div className="miss-phone" aria-label="A replaceable cleaning photo shown inside a phone">
            <img className="miss-phone__screen" src={phoneScreenImage} alt="" />
            <img
              className="miss-phone__frame"
              src="/img/mississauga/phone-frame.webp"
              alt=""
            />
          </div>
          <div className="miss-final-cta__copy">
            <p className="miss-kicker">Free photo estimate</p>
            <h2 id="miss-cta-heading">Show us what needs cleaning</h2>
            <p>Photos first. Clear scope. No pressure.</p>
            <div className="miss-actions">
              <Link className="miss-button miss-button--light" href="/quote/">
                Request a free quote <span aria-hidden="true">→</span>
              </Link>
              <a className="miss-button miss-button--ghost" href="tel:+14167270287">
                <span aria-hidden="true">☎</span> Call (416) 727-0287
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
