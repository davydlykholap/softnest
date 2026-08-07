import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import HomeSections from "@/components/HomeSections";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { homeFaqs } from "@/data/homeFaqs";
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
  "@id": "https://softnestcare.ca/#organization",
  name: "SoftNest Fabric Care",
  url: "https://softnestcare.ca/",
  telephone: "+1-416-727-0287",
  email: "softnest.upholstery@outlook.com",
  logo: "https://softnestcare.ca/img/logo/logo.webp",
  image: "https://softnestcare.ca/images/softnest-hero-room.webp",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-416-727-0287",
    contactType: "customer service",
    areaServed: "CA",
    availableLanguage: ["English", "Russian", "Ukrainian"],
  },
  areaServed: [
    "Brampton",
    "Burlington",
    "Etobicoke",
    "Hamilton",
    "Milton",
    "Mississauga",
    "Oakville",
    "Toronto",
    "Vaughan",
  ],
  sameAs: [
    "https://maps.app.goo.gl/XHFbygUj49Suv9F48",
    "https://www.instagram.com/softnestfabriccare/",
    "https://www.facebook.com/profile.php?id=61590622653207",
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
      {[organizationSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
