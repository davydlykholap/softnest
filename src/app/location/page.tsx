import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Upholstery Cleaning Service Areas | SoftNest",
  description:
    "Explore SoftNest upholstery, sofa, sectional, carpet and rug cleaning service areas across Mississauga and the Greater Toronto Area.",
  alternates: { canonical: "/location/" },
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
      <div className="new-hero-root location-header">
        <SiteHeader />
      </div>
      <main className="location-page location-hub">
        <nav className="location-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Locations</span>
        </nav>
        <header className="location-hub__hero">
          <p className="location-eyebrow">Greater Toronto Area</p>
          <h1>Upholstery Cleaning Service Areas</h1>
          <p>
            SoftNest provides professional sofa, furniture, mattress, carpet
            and area rug cleaning across Mississauga and surrounding GTA
            communities.
          </p>
        </header>
        <section className="location-hub__grid" aria-label="Service locations">
          {locations.map((location, index) => (
            <article key={location.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{location.name}</h2>
              <p>{location.shortDescription}</p>
              <Link href={`/location/${location.slug}/`}>
                View {location.name} services
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </section>
        <section className="location-cta">
          <div>
            <p className="location-eyebrow">Don&apos;t see your community?</p>
            <h2>Ask us about your GTA address</h2>
            <p>
              Send your postal code, photos and the items you would like
              cleaned. We will confirm whether we can schedule your area.
            </p>
          </div>
          <div className="location-actions">
            <Link className="location-button location-button--light" href="/#quote-form">
              Request a free quote
            </Link>
            <a
              className="location-button location-button--outline"
              href="tel:+14167270287"
            >
              Call (416) 727-0287
            </a>
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
