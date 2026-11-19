import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import BookingEstimator from "./BookingEstimator";
import styles from "./book.module.css";

export const metadata: Metadata = {
  title: "Estimate and Book a Cleaning Visit | SoftNest Fabric Care",
  description:
    "Choose what you would like cleaned, see an estimate from our price list, then pick the day and start time that suits you. We confirm every request by text message.",
  alternates: { canonical: "/book/" },
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <>
      <div className="new-hero-root legal-header">
        <SiteHeader />
      </div>
      <main className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Estimate and book</p>
            <h1>Choose what to clean, then pick a time</h1>
            <p>
              Add your items to see an estimate from our price list, then choose the day and start time that
              suits you. We confirm every request by text message.
            </p>
          </header>
          <BookingEstimator />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
