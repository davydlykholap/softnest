import type { Metadata } from "next";
import Link from "next/link";
import LocationSearch from "@/components/LocationSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Upholstery Cleaning Service Areas | SoftNest",
  description:
    "Explore SoftNest upholstery, sofa, sectional, carpet and rug cleaning service areas across Mississauga, the Greater Toronto Area and Hamilton.",
  alternates: { canonical: "/location/" },
  openGraph: {
    title: "SoftNest Cleaning Services Across the GTHA",
    description:
      "Find professional upholstery and carpet cleaning in your community.",
    url: "/location/",
  },
};

const cityPhotoAlt: Record<string, string> = {
  mississauga: "Mississauga skyline in Ontario",
  toronto: "Toronto skyline across the waterfront",
  oakville: "Oakville Harbour pier on Lake Ontario",
  brampton: "Brampton City Hall in downtown Brampton",
  etobicoke: "Humber Bay skyline reflected on the water in Etobicoke",
  burlington: "Spencer Smith Park in Burlington",
  vaughan: "Vaughan Metropolitan Centre skyline",
  milton: "Historic downtown Milton streetscape",
  hamilton: "Downtown Hamilton skyline from the Niagara Escarpment",
};

export default function LocationsPage() {
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
    ],
  };

  return (
    <>
      <div className="new-hero-root locations-header">
        <SiteHeader current="locations" />
      </div>

      <main className="locations-hub-v2">
        <section className="locations-hero" aria-labelledby="locations-heading">
          <div className="locations-hero__copy">
            <p className="locations-kicker">
              Serving the Greater Toronto &amp; Hamilton Area
            </p>
            <span className="locations-kicker-line" aria-hidden="true" />
            <h1 id="locations-heading">
              <span className="locations-hero__title-line">Professional Care,</span>
              <span className="locations-hero__title-line locations-hero__title-line--accent">
                Closer to Home.
              </span>
            </h1>
            <p className="locations-hero__description">
              Explore SoftNest upholstery and carpet cleaning services in your
              community.
            </p>
            <div className="locations-hero__actions">
              <a className="locations-pill locations-pill--solid" href="#cities">
                Find your city
                <span aria-hidden="true">→</span>
              </a>
              <Link
                className="locations-pill locations-pill--outline"
                href="/#quote-form"
              >
                Request a quote
              </Link>
            </div>
          </div>

          <div className="locations-hero__map" aria-label="SoftNest GTA service area">
            <img
              src="/img/locations/location-hero-map-nine-cities.webp"
              alt="Illustrated service map showing Vaughan, Brampton, Toronto, Mississauga, Etobicoke, Milton, Oakville, Burlington and Hamilton"
            />
          </div>
        </section>

        <div className="locations-search-wrap">
          <LocationSearch />
        </div>

        <section className="locations-cities" id="cities">
          <header className="locations-section-heading">
            <p className="locations-kicker">Areas we serve</p>
            <h2>Cleaning Services Across the GTHA</h2>
          </header>

          <div className="locations-bento">
            {locations.map((location) => (
              <article
                className={`locations-city-card locations-city-card--${location.slug}`}
                key={location.slug}
              >
                <img
                  src={`/img/locations/${location.slug}.webp`}
                  alt={cityPhotoAlt[location.slug]}
                />
                <div className="locations-city-card__body">
                  <h3>{location.name}</h3>
                  <p>Upholstery &amp; carpet cleaning</p>
                  <Link
                    href={`/location/${location.slug}/`}
                    aria-label={`View upholstery cleaning in ${location.name}`}
                  >
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <details className="locations-photo-credits">
            <summary>City photography credits</summary>
            <p>
              Mississauga: K2HWY · Toronto: Derek Tsang · Oakville: Ibagli ·
              Brampton: Sikander Iqbal · Etobicoke: Mykola Swarnyk ·
              Burlington: Municipal Affairs and Housing · Vaughan:
              Canmenwalker · Milton: XeresNelro · Hamilton: Rick Cordeiro.{" "}
              <a href="/img/locations/ATTRIBUTION.md">
                Sources and licences
              </a>
            </p>
          </details>
        </section>

        <section className="locations-missing" id="ask-about-your-city">
          <div className="locations-missing__copy">
            <p className="locations-kicker">Still nearby?</p>
            <h2>Don&apos;t see your city?</h2>
            <span className="locations-kicker-line" aria-hidden="true" />
            <p>
              Send us your city or postal code and we&apos;ll confirm whether we
              can schedule service in your neighbourhood.
            </p>
            <div className="locations-missing__actions">
              <Link
                className="locations-pill locations-pill--solid"
                href="/#quote-form"
              >
                Ask about your city
                <span aria-hidden="true">→</span>
              </Link>
              <a
                className="locations-phone-pill"
                href="tel:+14167270287"
              >
                <span aria-hidden="true">☎</span>
                (416) 727-0287
              </a>
            </div>
          </div>

          <div className="locations-estimate-card">
            <div className="locations-estimate-card__copy">
              <span className="locations-estimate-card__icon" aria-hidden="true">
                ◉
              </span>
              <h3>Fast, easy photo estimate.</h3>
              <p>
                Show us what needs cleaning and we&apos;ll recommend the right
                solution.
              </p>
              <Link href="/#quote-form">No commitment. Just clarity.</Link>
            </div>
            <div className="locations-estimate-card__image">
              <img
                src="/img/sofa_cleaning.png"
                alt="Freshly cleaned upholstered sofa"
              />
              <span aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="locations-final-cta">
          <div className="locations-final-cta__image">
            <img
              src="/images/softnest-hero-room.png"
              alt="SoftNest hero room with a deep green sofa"
            />
          </div>
          <div className="locations-final-cta__copy">
            <p className="locations-kicker">Professional care, close to home</p>
            <h2>A fresher home is closer than you think.</h2>
            <span className="locations-kicker-line" aria-hidden="true" />
            <p>
              Trusted by homeowners across the GTHA for professional, careful
              cleaning that makes a real difference.
            </p>
            <Link className="locations-pill locations-pill--light" href="/#quote-form">
              Request a free quote
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
