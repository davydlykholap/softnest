import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/data/locations";
import { locations } from "@/data/locations";

const services = [
  {
    title: "Sofa & Couch Cleaning",
    description:
      "Deep cleaning for everyday soil, body oils, spills and fabric-safe stain treatment.",
    image: "/img/sofa_cleaning.png",
  },
  {
    title: "Sectionals & Chairs",
    description:
      "Care for sectionals, recliners, dining chairs, ottomans and upholstered furniture.",
    image: "/img/sectional_furniture.png",
  },
  {
    title: "Pet Stains & Odours",
    description:
      "Targeted treatment for pet accidents and odours, with realistic expectations explained first.",
    image: "/img/pet_stain.jpg",
  },
  {
    title: "Carpets & Area Rugs",
    description:
      "Professional extraction for suitable carpets and rugs to reduce embedded soil and allergens.",
    image: "/img/rug_2.png",
  },
];

type LocationPageProps = {
  location: Location;
};

export default function LocationPage({ location }: LocationPageProps) {
  const nearby = locations
    .filter((item) => item.slug !== location.slug)
    .slice(0, 4);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Upholstery Cleaning in ${location.name}`,
    url: `https://softnestcare.ca/location/${location.slug}/`,
    serviceType: "Upholstery cleaning",
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
      name: location.name,
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
        name: location.name,
        item: `https://softnestcare.ca/location/${location.slug}/`,
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
      <div className="new-hero-root location-header">
        <SiteHeader current="locations" />
      </div>
      <main className="location-page">
        <nav className="location-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/location/">Locations</Link>
          <span aria-hidden="true">/</span>
          <span>{location.name}</span>
        </nav>

        <section className="location-hero">
          <div className="location-hero__copy">
            <p className="location-eyebrow">
              Professional fabric care in {location.name}
            </p>
            <h1>
              Upholstery Cleaning
              <span>in {location.name}</span>
            </h1>
            <p>{location.shortDescription}</p>
            <div className="location-actions">
              <Link className="location-button location-button--primary" href="/quote/">
                Request a free quote
              </Link>
              <a
                className="location-button location-button--secondary"
                href="tel:+14167270287"
              >
                Call (416) 727-0287
              </a>
            </div>
            <ul className="location-trust" aria-label="Service assurances">
              <li>Fabric-appropriate products</li>
              <li>Professional equipment</li>
              <li>Clear expectations before work begins</li>
            </ul>
          </div>
          <div className="location-hero__image">
            <img
              src="/img/sofa_cleaning.png"
              alt={`Professionally cleaned sofa in ${location.name}`}
            />
            <div>
              <strong>Local service</strong>
              <span>{location.name}, Ontario</span>
            </div>
          </div>
        </section>

        <section className="location-intro">
          <div>
            <p className="location-eyebrow">Care matched to your furniture</p>
            <h2>A thoughtful clean for {location.name} homes</h2>
          </div>
          <div className="location-intro__copy">
            <p>{location.introduction}</p>
            <p>{location.localConsiderations}</p>
          </div>
        </section>

        <section className="location-services" id="services">
          <div className="location-section-heading">
            <p className="location-eyebrow">What we clean</p>
            <h2>Cleaning services available in {location.name}</h2>
            <p>
              Send clear photos with your request so we can assess the material,
              size and visible concerns before confirming the visit.
            </p>
          </div>
          <div className="location-service-grid">
            {services.map((service) => (
              <article key={service.title}>
                <img src={service.image} alt="" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="location-process">
          <div className="location-section-heading">
            <p className="location-eyebrow">How it works</p>
            <h2>From photos to a fresher home</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <h3>Share the details</h3>
              <p>
                Send photos, your {location.name} address or postal code, the
                item count and your main concerns.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Review the plan</h3>
              <p>
                We confirm availability, explain the proposed treatment and
                provide the quote or any necessary conditions.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Professional cleaning</h3>
              <p>
                We inspect again on arrival, pre-treat appropriate areas, clean
                and extract, then provide drying guidance.
              </p>
            </li>
          </ol>
        </section>

        <section className="location-coverage">
          <div className="location-coverage__copy">
            <p className="location-eyebrow">Local coverage</p>
            <h2>Neighbourhoods around {location.name}</h2>
            <p>
              Service requests can include the communities below and nearby
              areas. Send your postal code to confirm scheduling for your
              address.
            </p>
            <ul>
              {location.neighbourhoods.map((neighbourhood) => (
                <li key={neighbourhood}>{neighbourhood}</li>
              ))}
            </ul>
          </div>
          <div className="softnest-map location-map">
            <iframe
              title={`SoftNest service map for ${location.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=11&output=embed`}
            />
          </div>
        </section>

        <section className="location-faq" id="faq">
          <div className="location-section-heading">
            <p className="location-eyebrow">Common questions</p>
            <h2>Upholstery cleaning in {location.name}: FAQ</h2>
          </div>
          <div>
            {location.faq.map((item, index) => (
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

        <section className="location-nearby">
          <div>
            <p className="location-eyebrow">More service areas</p>
            <h2>Nearby service areas</h2>
          </div>
          <div className="location-nearby__links">
            {nearby.map((item) => (
              <Link href={`/location/${item.slug}/`} key={item.slug}>
                {item.name}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
            <Link href="/location/">
              All locations
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="location-cta">
          <div>
            <p className="location-eyebrow">Free photo estimate</p>
            <h2>Ready to plan your {location.name} cleaning?</h2>
            <p>
              Send a few photos and tell us what you would like cleaned. We will
              confirm the next steps and availability.
            </p>
          </div>
          <div className="location-actions">
            <Link className="location-button location-button--light" href="/quote/">
              Request a free quote
            </Link>
            <a
              className="location-button location-button--outline"
              href="tel:+14167270287"
            >
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
