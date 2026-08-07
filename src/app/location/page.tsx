import type { Metadata } from "next";
import Image from "next/image";
import {
  DirectoryCard,
  DirectoryFinalCta,
  DirectoryHero,
  DirectorySupportSection,
} from "@/components/DirectoryHubSections";
import LocationSearch from "@/components/LocationSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { locations } from "@/data/locations";
import "../styles/locations-hub.css";

export const metadata: Metadata = {
  title: "Upholstery Cleaning Service Areas | SoftNest",
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
        <DirectoryHero
          id="locations-heading"
          kicker="Serving the Greater Toronto Area"
          titleLines={[
            { text: "Professional Care," },
            { text: "Closer to Home.", accent: true },
          ]}
          description="Explore SoftNest upholstery and carpet cleaning services in your community."
          primaryAction={{ href: "#cities", label: "Find your city" }}
          secondaryAction={{ href: "/quote/", label: "Request a quote" }}
          mediaLabel="SoftNest GTA service area"
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
            <p className="locations-kicker">Areas we serve</p>
            <h2>Cleaning Services Across the GTA</h2>
          </header>

          <div className="locations-bento">
            {locations.map((location) => (
              <DirectoryCard
                href={`/location/${location.slug}/`}
                image={`/img/locations/${location.slug}.webp`}
                imageAlt={cityPhotoAlt[location.slug]}
                title={location.name}
                subtitle="Upholstery & carpet cleaning"
                ariaLabel={`View upholstery cleaning in ${location.name}`}
                className={`locations-city-card--${location.slug}`}
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

        <DirectorySupportSection
          id="ask-about-your-city"
          kicker="Still nearby?"
          title="Don't see your city?"
          description="Send us your city or postal code and we'll confirm whether we can schedule service in your neighbourhood."
          primaryAction={{ href: "/quote/", label: "Ask about your city" }}
          card={{
            title: "Fast, easy photo estimate.",
            description:
              "Show us what needs cleaning and we'll recommend the right solution.",
            link: { href: "/quote/", label: "No commitment. Just clarity." },
            image: "/img/sofa.png",
            imageAlt: "Grey upholstered sofa in a natural home interior",
          }}
        />

        <DirectoryFinalCta
          kicker="Professional care, close to home"
          title="A fresher home is closer than you think."
          description="Trusted by homeowners across the GTA for professional, careful cleaning that makes a real difference."
          action={{ href: "/quote/", label: "Request a free quote" }}
          image="/images/softnest-hero-room.webp"
          imageAlt="SoftNest hero room with a deep green sofa"
        />
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
