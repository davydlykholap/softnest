import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import ServiceDetailPanel from "@/components/ServiceDetailPanel";
import Link from "next/link";
import { jsonLd } from "@/seo/structuredData";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Service } from "@/content/services";
import { getService } from "@/content/services";
import { cityServicePages } from "@/content/cityServicePages";
import { getRelatedPosts } from "@/content/posts";
import { absoluteUrl, organizationProvider, siteConfig } from "@/lib/site";
import styles from "@/app/services/service-page.module.css";
import "@/app/styles/locations-hub.css";

export default function ServicePage({ service }: { service: Service }) {
  const priorityCities = ["milton", "oakville", "etobicoke"];
  const localPages = cityServicePages.filter((page) => page.service.slug === service.slug);
  const serviceLocations = localPages.map((page) => page.location);
  const featuredLocations = priorityCities
    .map((slug) => serviceLocations.find((location) => location.slug === slug))
    .filter((location) => location !== undefined);
  const relatedServices = service.relatedServices.map(getService)
    .filter((related): related is Service => related !== undefined && related.slug !== service.slug);
  const relatedPosts = getRelatedPosts(service.slug).slice(0, 2);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}/#service`,
    name: service.name,
    url: `${siteConfig.url}/services/${service.slug}/`,
    image: absoluteUrl(service.image),
    description: service.metaDescription,
    serviceType: service.serviceType,
    provider: organizationProvider(),
    areaServed: siteConfig.areasServed,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${siteConfig.url}/services/${service.slug}/` },
    ],
  };

  return (
    <>
      <div className="new-hero-root service-header">
        <SiteHeader current="services" />
      </div>

      <main className={styles.servicePage}>
        <div className={styles.standaloneLayout}>
          <ServiceDetailPanel service={service} />
          <section className={styles.serviceConnections} aria-labelledby="service-areas-heading">
            <div>
              <h2 id="service-areas-heading">Plan a visit in your area</h2>
              <p>
                {featuredLocations.length > 0 ? <>This service is available in {featuredLocations.map((location, index) => (
                  <span key={location.slug}>{index > 0 ? index === featuredLocations.length - 1 ? " and " : ", " : ""}
                    <Link href={`/location/${location.slug}/${service.slug}/`}>{location.name}</Link>
                  </span>
                ))}. </> : null}
                <Link href="/location/">View all service areas</Link> and share your postal code,
                items and access details so we can confirm availability and the work for your address.
              </p>
              <p>Your quote depends on the size, condition and treatment required. We confirm the agreed scope and price before booking.</p>
              <Link href="/quote/">Request a free quote</Link>
              {localPages.length > 0 ? <nav aria-label={`${service.name} by city`}>
                <ul>{localPages.map((page) => <li key={page.path}><Link href={page.path}>{page.profile.title} in {page.location.name}</Link></li>)}</ul>
              </nav> : null}
            </div>
            {relatedServices.length > 0 ? (
              <nav aria-label="Related cleaning services">
                <h2>Cleaning other items?</h2>
                <ul>{relatedServices.map((related) => <li key={related.slug}><Link href={`/services/${related.slug}/`}>{related.name}</Link></li>)}</ul>
              </nav>
            ) : null}
            {relatedPosts.length > 0 ? (
              <nav aria-label="Related fabric care advice">
                <h2>Helpful care advice</h2>
                <ul>{relatedPosts.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}/`}>{post.title}</Link></li>)}</ul>
              </nav>
            ) : null}
          </section>
        </div>
        <DirectoryFinalCta
          id="quote-cta"
          title="Show us what needs cleaning."
          description="Tell us about the item or area and any stains or odours. We'll confirm the scope and price before cleaning."
          action={{ href: "/quote/", label: "Get a quote" }}
          image="/images/softnest-hero-room.webp"
          imageAlt="Bright living room with a deep green sofa"
          className="site-final-cta"
        />
      </main>

      <SiteFooter />
      {[serviceSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
