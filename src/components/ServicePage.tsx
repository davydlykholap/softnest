import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import ServiceDetailPanel from "@/components/ServiceDetailPanel";
import { jsonLd } from "@/seo/structuredData";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { Service } from "@/content/services";
import { absoluteUrl, organizationProvider, siteConfig } from "@/lib/site";
import styles from "@/app/services/service-page.module.css";
import "@/app/styles/locations-hub.css";
import "@/app/styles/services-hub.css";

export default function ServicePage({ service }: { service: Service }) {
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
        </div>
        <DirectoryFinalCta
          kicker="Professional care for your home"
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
