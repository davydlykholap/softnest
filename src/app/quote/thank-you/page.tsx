import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "@/app/quote/quote-page.module.css";

export const metadata: Metadata = {
  title: "Quote Request Received | SoftNest",
  description: "Your SoftNest cleaning quote request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuoteThankYouPage() {
  return (
    <>
      <div className="new-hero-root quote-header">
        <SiteHeader />
      </div>
      <main className={`quote-page ${styles.quotePage}`}>
        <section className="quote-page-shell">
          <div className="quote-page-card">
            <div className="quote-page-success" role="status">
              <span className="quote-page-success__icon" aria-hidden="true">✓</span>
              <p className="quote-page-kicker">Request received</p>
              <h1>Thank you.<br />We’ll be in touch soon.</h1>
              <p>
                We received your cleaning details. A SoftNest specialist will
                contact you to discuss the item, condition, and next steps.
              </p>
              <p className="quote-page-photo-channels">
                You can send your photos through{" "}
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{" "}
                or{" "}
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>.
              </p>
              <a href={siteConfig.phoneHref}>Need us sooner? Call {siteConfig.displayPhone}</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
