import { jsonLd } from "@/seo/structuredData";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import ServicesExplorer from "@/components/ServicesExplorer";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { services } from "@/content/services";
import styles from "@/app/services/service-page.module.css";
import "@/app/styles/locations-hub.css";
import "@/app/styles/services-hub.css";

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

      <main className={styles.servicePage}>
        <ServicesExplorer services={services} />
        <DirectoryFinalCta
          kicker="Professional care for every room"
          title="A fresher home starts with the right service."
          description="Choose the service that best matches your furniture or carpet, or tell us what needs attention and we'll help you narrow it down."
          action={{ href: "/quote/", label: siteConfig.quoteLabel }}
          image="/images/softnest-hero-room.webp"
          imageAlt="Bright living room with a deep green sofa"
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
