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
import ServiceSearch from "@/components/ServiceSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { services } from "@/content/services";
import "@/app/styles/locations-hub.css";

export const metadata: Metadata = {
  title: "Services | SoftNest Fabric Care",
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
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` },
    ],
  };

  return (
    <>
      <div className="new-hero-root locations-header">
        <SiteHeader current="services" />
      </div>

      <main className="locations-hub-v2">
        <DirectoryHero
          id="services-heading"
          kicker="Upholstery & carpet care across the GTA"
          titleLines={[
            { text: "Professional Care," },
            { text: "For Every Room.", accent: true },
          ]}
          description="Explore SoftNest upholstery and carpet cleaning services for the items your home uses every day."
          mediaLabel="Professional upholstery and carpet cleaning equipment prepared in a home"
          className="locations-hub-hero--compact"
          media={
            <Image
              src="/images/services/services-hero-equipment.webp"
              alt="Professional upholstery and carpet cleaning equipment arranged in a living room"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 57vw"
            />
          }
        />

        <div className="locations-search-wrap">
          <ServiceSearch />
        </div>

        <section className="locations-cities" id="services">
          <header className="locations-section-heading">
            <h2>Cleaning Services</h2>
          </header>

          <div className="locations-bento">
            {services.map((service) => (
              <DirectoryCard
                href={`/services/${service.slug}/`}
                image={service.image}
                imageAlt={service.imageAlt}
                title={service.shortName}
                ariaLabel={`View ${service.name}`}
                className="locations-city-card--location"
                key={service.slug}
              />
            ))}
          </div>
        </section>

        <section className="locations-simple-support" id="not-sure-service">
          <div className="locations-simple-support__copy">
            <p className="locations-kicker">Need a hand?</p>
            <h2>Not sure which service?</h2>
            <span className="locations-kicker-line" aria-hidden="true" />
            <p>
              Tell us what furniture or carpet needs cleaning and note any
              stains, odours or other concerns. We&apos;ll confirm the right
              service when we reply.
            </p>
            <Link
              className="locations-pill locations-pill--solid locations-simple-support__action"
              href="/quote/"
            >
              Ask about your item
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
