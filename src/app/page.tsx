import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import HomeInteractions from "@/components/HomeInteractions";
import HomeSections from "@/components/HomeSections";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { homeFaqs } from "@/data/homeFaqs";

export const metadata: Metadata = {
  title: "SoftNest Upholstery Cleaning | Sofa Cleaning Mississauga",
  description:
    "Professional upholstery, sofa, couch, sectional and furniture cleaning in Mississauga and the GTA. Pet stain treatment, odour removal and fast-drying service.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SoftNest Fabric Care",
    description:
      "Professional upholstery and carpet cleaning across Mississauga and the GTA.",
    url: "/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://softnestcare.ca/#business",
  name: "SoftNest Fabric Care",
  url: "https://softnestcare.ca/",
  telephone: "+1-416-727-0287",
  email: "softnest.upholstery@outlook.com",
  image: "https://softnestcare.ca/img/logo/logo.webp",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    "Mississauga",
    "Toronto",
    "Brampton",
    "Oakville",
    "Etobicoke",
    "Burlington",
    "Vaughan",
    "Milton",
    "Hamilton",
  ],
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
      <HomeInteractions />
      {[localBusinessSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
