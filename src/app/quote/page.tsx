import type { Metadata } from "next";
import Image from "next/image";
import QuotePageForm from "@/components/QuotePageForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "./quote-page.module.css";

export const metadata: Metadata = {
  title: "Request a Free Upholstery Cleaning Quote | SoftNest",
  description:
    "Request a free SoftNest quote for upholstery, sofa, carpet and furniture cleaning across the Greater Toronto Area and Hamilton.",
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
          <div className="quote-page-intro">
            <div className="quote-page-intro__copy">
              <p className="quote-page-kicker">Professional care, close to home</p>
              <h1>A fresher home starts here.</h1>
              <p>
                Tell us about your furniture and we’ll help you choose the right
                care—thoughtful, transparent and tailored to your home.
              </p>
            </div>
            <div className="quote-page-photo" aria-hidden="true">
              <Image
                src="/images/softnest-hero-room.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 44vw"
              />
              <span className="quote-page-photo__bubble quote-page-photo__bubble--one" />
              <span className="quote-page-photo__bubble quote-page-photo__bubble--two" />
            </div>
          </div>
          <div className="quote-page-card">
            <QuotePageForm />
          </div>
        </section>
        <section className="quote-page-contact">
          <p>Prefer to talk?</p>
          <h2>We’re happy to help.</h2>
          <a href="tel:+14167270287">(416) 727-0287 <span aria-hidden="true">→</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
