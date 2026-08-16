import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import HomeSections from "@/components/HomeSections";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { homeFaqs } from "@/data/homeFaqs";
import { organizationId, siteConfig, websiteId } from "@/lib/site";
import "./styles/home-refinements.css";

export const metadata: Metadata = {
  title: "Upholstery & Carpet Cleaning Across the GTA | SoftNest",
  description:
    "Professional upholstery, sofa, couch, sectional and furniture cleaning across the GTA. Pet stain treatment, odour removal and fast-drying service.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Upholstery & Carpet Cleaning Across the GTA | SoftNest",
    description:
      "Professional upholstery and carpet cleaning across the Greater Toronto Area and Hamilton.",
    url: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: `${siteConfig.url}/`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  logo: siteConfig.logo,
  image: siteConfig.heroImage,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "customer service",
    areaServed: "CA",
    availableLanguage: siteConfig.languages,
  },
  areaServed: siteConfig.areasServed,
  sameAs: siteConfig.sameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: `${siteConfig.url}/`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  inLanguage: "en-CA",
  publisher: { "@id": organizationId },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <div className="new-hero-root">
        <SiteHeader home />
        <HomeHero />
      </div>
      <HomeSections />
      <SiteFooter />
      {[organizationSchema, websiteSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
