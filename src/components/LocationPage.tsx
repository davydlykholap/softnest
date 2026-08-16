import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Location } from "@/data/locations";
import { locations, nearbyLocationSlugs } from "@/data/locations";
import { getService } from "@/data/services";
import { organizationProvider, siteConfig } from "@/lib/site";

const locationServiceSlugs = [
  "sofa-cleaning",
  "sectional-furniture-cleaning",
  "pet-stain-odour-removal",
  "carpet-area-rug-cleaning",
];

const locationServices = locationServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

const locationProof: Record<
  string,
  { image: string; category: string; service: string; alt: string }
> = {
  mississauga: {
    image: "/img/sectional_3.webp",
    category: "Sofa",
    service: "Pet stains and odour removal",
    alt: "Before and after sofa cleaning result in Mississauga",
  },
  oakville: {
    image: "/img/sectional_1.webp",
    category: "Sectional sofa",
    service: "Deep cleaning",
    alt: "Before and after sectional cleaning result in Oakville",
  },
  toronto: {
    image: "/img/matress_cleaning.webp",
    category: "Mattress",
    service: "Stain and odour removal",
    alt: "Before and after mattress cleaning result in Toronto",
  },
  brampton: {
    image: "/img/before_after_carpet_cleaning.webp",
    category: "Carpet",
    service: "Deep carpet cleaning",
    alt: "Before and after carpet cleaning result in Brampton",
  },
};

type LocationPageProps = {
  location: Location;
};

export default function LocationPage({ location }: LocationPageProps) {
  const proof = locationProof[location.slug];
  const nearby = (nearbyLocationSlugs[location.slug] ?? [])
    .map((slug) => locations.find((item) => item.slug === slug))
    .filter((item): item is Location => Boolean(item));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Upholstery and Carpet Cleaning in ${location.name}`,
    url: `${siteConfig.url}/location/${location.slug}/`,
    serviceType: ["Upholstery cleaning", "Carpet cleaning"],
    description: location.shortDescription,
    provider: organizationProvider(),
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
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${siteConfig.url}/location/`,
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
        <section className="location-hero">
          <div className="location-hero__copy">
            <p className="location-eyebrow">
              Professional fabric care in {location.name}
            </p>
            <h1>
              Upholstery &amp; Carpet Cleaning
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
              <li>Commercial-grade equipment</li>
              <li>Professional drying included</li>
            </ul>
          </div>
          <div className="location-hero__image">
            <Image
              src="/img/sofa.png"
              alt={`Grey upholstered sofa in ${location.name}`}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
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
              Open a service page to see the process, included work, drying
              guidance and realistic limitations before requesting a quote.
            </p>
          </div>
          <div className="location-service-grid">
            {locationServices.map((service) => (
              <Link href={`/services/${service.slug}/`} key={service.slug}>
                <span className="location-service-grid__image">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 720px) 100vw, 50vw"
                  />
                </span>
                <span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                  <b>Learn more <span aria-hidden="true">→</span></b>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {proof ? (
          <section className="location-proof" aria-labelledby="location-proof-heading">
            <div className="location-proof__copy">
              <p className="location-eyebrow">Real local result</p>
              <h2 id="location-proof-heading">A completed {proof.category.toLowerCase()} cleaning in {location.name}</h2>
              <p>
                This before-and-after example is from our existing project gallery:
                {" "}{proof.service.toLowerCase()}. Actual results depend on the material,
                condition, staining and previous treatments.
              </p>
              <Link href="/#results">See more cleaning results <span aria-hidden="true">→</span></Link>
            </div>
            <div className="location-proof__image">
              <Image
                src={proof.image}
                alt={proof.alt}
                fill
                sizes="(max-width: 820px) 100vw, 52vw"
              />
              <span>{proof.category} · {location.name}</span>
            </div>
          </section>
        ) : null}

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
                and extract, then support drying with air movers.
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
            <h2>Upholstery and carpet cleaning in {location.name}: FAQ</h2>
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
