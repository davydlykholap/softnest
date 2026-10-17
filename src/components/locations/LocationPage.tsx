import Image from "next/image";
import HeroActionButtons from "@/components/HeroActionButtons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cityPages } from "@/content/cityPages";
import type { Location } from "@/content/locations";
import { siteConfig } from "@/lib/site";
import { jsonLd } from "@/seo/structuredData";
import CityPageSections from "./CityPageSections";
import { getLocationPageSchemas } from "./locationPageSchemas";

export default function LocationPage({ location }: { location: Location }) {
  const copy = cityPages[location.slug];
  const quoteHref = `/quote/?city=${encodeURIComponent(location.slug)}`;
  const heroImage = location.expandedContent?.heroImage || siteConfig.heroImage;
  const heroImageMobile = location.expandedContent?.heroImageMobile
    ?? (heroImage === siteConfig.heroImage ? "/images/softnest-hero-room-mobile.webp" : undefined);
  const schemas = getLocationPageSchemas(location, copy.services, location.faq);

  return (
    <>
      <div className="new-hero-root location-page-header">
        <SiteHeader current="locations" quoteHref={quoteHref} />
      </div>
      <main className="location-page-page location-page-page--city">
        <section
          className={`location-page-hero ${location.slug === "mississauga" ? "location-page-hero--mississauga" : ""}`.trim()}
          aria-labelledby="location-page-hero-title"
        >
          <div className="location-page-hero__photo" aria-hidden="true">
            <picture className="location-page-hero__picture">
              {heroImageMobile ? (
                <source media="(max-width: 640px)" srcSet={heroImageMobile} />
              ) : null}
              <Image src={heroImage} alt="" fill priority sizes="100vw" />
            </picture>
          </div>
          <div className="location-page-hero__wash" aria-hidden="true" />
          <div className="location-page-hero__copy">
            <h1 id="location-page-hero-title">
              Upholstery, sofa &amp;<br />carpet cleaning<span>in {location.name}</span>
            </h1>
            <p className="location-page-hero__description">{copy.heroDescription}</p>
            <HeroActionButtons
              quoteHref={quoteHref}
              primaryTone="gold"
              quoteAriaLabel={`Get a free upholstery and carpet cleaning quote in ${location.name}`}
            />
          </div>
        </section>
        <CityPageSections location={location} copy={copy} />
      </main>
      <SiteFooter quoteHref={quoteHref} />
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
