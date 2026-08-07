import type { Metadata } from "next";
import Image from "next/image";
import sectionalAfterCleaning from "@/assets/services-hero/sectional-after-cleaning.webp";
import carpetCleaningInProgress from "@/assets/services-hero/carpet-cleaning-in-progress.webp";
import upholsteredDiningChairs from "@/assets/services-hero/upholstered-dining-chairs.webp";
import {
  DirectoryCard,
  DirectoryFinalCta,
  DirectoryHero,
  DirectorySupportSection,
} from "@/components/DirectoryHubSections";
import ServiceSearch from "@/components/ServiceSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { services } from "@/data/services";
import "../styles/locations-hub.css";
import "../styles/services-hub.css";

export const metadata: Metadata = {
  title: "Upholstery & Carpet Cleaning Services | SoftNest",
  description:
    "Explore SoftNest sofa, sectional, upholstery, carpet, mattress, chair, stair and pet stain cleaning services across the GTA.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Professional Cleaning Services | SoftNest",
    description:
      "Explore professional upholstery, furniture and carpet cleaning services across the GTA.",
    url: "/services/",
  },
};

export default function ServicesPage() {
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
        name: "Services",
        item: "https://softnestcare.ca/services/",
      },
    ],
  };

  return (
    <>
      <div className="new-hero-root locations-header">
        <SiteHeader current="services" />
      </div>

      <main className="locations-hub-v2 services-hub">
        <DirectoryHero
          id="services-heading"
          kicker="Upholstery & carpet care across the GTA"
          titleLines={[
            { text: "Professional Cleaning" },
            { text: "For Every Room.", accent: true },
          ]}
          description="Explore SoftNest upholstery, furniture and carpet cleaning services for the items your home uses every day."
          primaryAction={{ href: "#services", label: "Find your service" }}
          secondaryAction={{ href: "/quote/", label: "Request a quote" }}
          mediaLabel="Examples of SoftNest upholstery and carpet cleaning services"
          className="services-hub-hero"
          media={
            <div className="services-hero-collage" aria-hidden="true">
              <div className="services-hero-collage__main">
                <Image
                  src={sectionalAfterCleaning}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 820px) 88vw, 35vw"
                />
              </div>
              <div className="services-hero-collage__top">
                <Image
                  src={upholsteredDiningChairs}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 820px) 42vw, 20vw"
                />
              </div>
              <div className="services-hero-collage__bottom">
                <Image
                  src={carpetCleaningInProgress}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 42vw, 20vw"
                />
              </div>
            </div>
          }
        />

        <div className="locations-search-wrap">
          <ServiceSearch />
        </div>

        <section className="locations-cities services-directory" id="services">
          <header className="locations-section-heading">
            <p className="locations-kicker">What we clean</p>
            <h2>Professional Cleaning Services</h2>
          </header>

          <div className="locations-bento services-bento">
            {services.map((service) => (
              <DirectoryCard
                href={`/services/${service.slug}/`}
                image={service.image}
                imageAlt={service.imageAlt}
                title={service.shortName}
                subtitle={service.summary}
                ariaLabel={`View ${service.name}`}
                className="services-directory-card"
                key={service.slug}
              />
            ))}
          </div>
        </section>

        <DirectorySupportSection
          id="not-sure-service"
          kicker="Need a hand?"
          title="Not sure which service?"
          description="Tell us what furniture or carpet needs cleaning and note any stains, odours or other concerns. We'll confirm the right service when we reply."
          primaryAction={{ href: "/quote/", label: "Ask about your item" }}
          className="services-support"
          card={{
            title: "Quick, clear estimate.",
            description:
              "Start with your name, phone number, furniture and notes. We'll follow up for photos when needed.",
            link: { href: "/quote/", label: "No commitment. Just clarity." },
            image: "/img/sofa.png",
            imageAlt: "Grey upholstered sofa in a natural home interior",
          }}
        />

        <DirectoryFinalCta
          kicker="Professional care for every room"
          title="A fresher home starts with the right service."
          description="Choose the service that best matches your furniture or carpet, or tell us what needs attention and we'll help you narrow it down."
          action={{ href: "/quote/", label: "Request a free quote" }}
          image="/images/softnest-hero-room.webp"
          imageAlt="Bright living room with a deep green sofa"
          className="services-final-cta"
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
