import { jsonLd } from "@/seo/structuredData";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DirectoryCard,
  DirectoryFinalCta,
  DirectoryHero,
} from "@/components/DirectoryHubSections";
import LocationSearch from "@/components/LocationSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { locations } from "@/content/locations";
import "@/app/styles/locations-hub.css";

export const metadata: Metadata = {
  title: "Locations | SoftNest Fabric Care",
  description:
    "Explore SoftNest upholstery, sofa, sectional, carpet and rug cleaning service areas across the Greater Toronto Area and Hamilton.",
  alternates: { canonical: "/location/" },
  openGraph: {
    title: "SoftNest Cleaning Services Across the GTA",
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
        item: siteConfig.url + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: siteConfig.url + "/location/",
      },
    ],
  };

  return (
    <>
      <div className="new-hero-root locations-header">
        <SiteHeader current="locations" />
      </div>

      <main className="locations-hub-v2">
        <DirectoryHero
          id="locations-heading"
          kicker="Serving the Greater Toronto Area"
          titleLines={[
            { text: "Professional Care," },
            { text: "Closer to Home.", accent: true },
          ]}
          description="Explore SoftNest upholstery and carpet cleaning services in your community."
          mediaLabel="SoftNest GTA service area"
          className="locations-hub-hero--compact"
          media={
            <Image
              src="/img/locations/location-hero-map-nine-cities.webp"
              alt="Illustrated service map showing Vaughan, Brampton, Toronto, Mississauga, Etobicoke, Milton, Oakville, Burlington and Hamilton"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 57vw"
            />
          }
        />

        <div className="locations-search-wrap">
          <LocationSearch />
        </div>

        <section className="locations-cities" id="cities">
          <header className="locations-section-heading">
            <h2>Cleaning Across the GTA</h2>
          </header>

          <div className="locations-bento">
            {locations.map((location) => (
              <DirectoryCard
                href={`/location/${location.slug}/`}
                image={location.image}
                imageAlt={cityPhotoAlt[location.slug]}
                title={location.name}
                ariaLabel={`View upholstery cleaning in ${location.name}`}
                className={`locations-city-card--location locations-city-card--${location.slug}`}
                key={location.slug}
              />
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

        <section className="locations-simple-support" id="ask-about-your-city">
          <div className="locations-simple-support__copy">
            <p className="locations-kicker">Still nearby?</p>
            <h2>Don&apos;t see your city?</h2>
            <span className="locations-kicker-line" aria-hidden="true" />
            <p>
              Send us your city or postal code and we&apos;ll confirm whether we
              can schedule service in your neighbourhood.
            </p>
            <Link
              className="locations-pill locations-pill--solid locations-simple-support__action"
              href="/quote/"
            >
              Ask about your city
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <DirectoryFinalCta
          kicker="Professional care, close to home"
          title="A fresher home is closer than you think."
          description="Trusted by homeowners across the GTA for professional, careful cleaning that makes a real difference."
          action={{ href: "/quote/", label: siteConfig.quoteLabel }}
          image="/images/softnest-hero-room.webp"
          imageAlt="SoftNest hero room with a deep green sofa"
          className="site-final-cta"
        />
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
    </>
  );
}
