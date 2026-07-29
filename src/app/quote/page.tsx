import type { Metadata } from "next";
import QuotePageForm from "@/components/QuotePageForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Request a Free Upholstery Cleaning Quote | SoftNest",
  description:
    "Request a free SoftNest quote for upholstery, sofa, carpet and furniture cleaning in Mississauga and across the GTA.",
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
      <main className="quote-page">
        <section className="quote-page-shell">
          <div className="quote-page-intro">
            <div className="quote-page-intro__copy">
              <p className="quote-page-kicker">Professional care, close to home</p>
              <h2>A fresher home starts here.</h2>
              <p>
                Tell us about your furniture and we’ll help you choose the right
                care—thoughtful, transparent and tailored to your home.
              </p>
            </div>
            <div className="quote-page-photo" aria-hidden="true">
              <img src="/images/softnest-hero-room.png" alt="" />
              <span className="quote-page-photo__bubble quote-page-photo__bubble--one" />
              <span className="quote-page-photo__bubble quote-page-photo__bubble--two" />
              <div className="quote-page-photo__badge">
                <span>✓</span>
                <strong>Trusted &amp; local</strong>
              </div>
            </div>
            <div className="quote-page-promises">
              <div><span>01</span><strong>Fast response</strong><small>We’ll follow up promptly.</small></div>
              <div><span>02</span><strong>Clear advice</strong><small>The right care for each fabric.</small></div>
              <div><span>03</span><strong>No pressure</strong><small>A free, no-obligation quote.</small></div>
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
