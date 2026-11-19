import type { Metadata } from "next";
import QuotePageForm from "@/components/QuotePageForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "./quote-page.module.css";
import { locations } from "@/content/locations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote | SoftNest Fabric Care",
  description:
    "Request a free SoftNest quote for upholstery, sofa, carpet and furniture cleaning across the Greater Toronto Area.",
  alternates: { canonical: "/quote/" },
  openGraph: {
    title: "Request a Free Cleaning Quote | SoftNest",
    description:
      "Tell us what needs cleaning and receive a clear, no-obligation quote.",
    url: "/quote/",
  },
};

export default function QuotePage() {
  return (
    <>
      <div className="new-hero-root quote-header">
        <SiteHeader />
      </div>
      <main className={`quote-page ${styles.quotePage}`}>
        <section className="quote-page-shell">
          <div className="quote-page-card">
            <QuotePageForm cities={locations.map(({ slug, name }) => ({ slug, name }))} />
          </div>
          <div className={styles.booking}>
            <h2>Prefer to pick a time yourself?</h2>
            <p>Choose the day and start time that suits you. We confirm every request by text message.</p>
            <a href={siteConfig.bookingHref} target="_blank" rel="noopener noreferrer">Request a visit time</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
