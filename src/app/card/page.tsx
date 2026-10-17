import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Thank you for choosing SoftNest | SoftNest Fabric Care",
  description: "Share your experience, request a cleaning quote, or get in touch with SoftNest Fabric Care.",
  alternates: { canonical: "/card/" },
  robots: { index: false, follow: true },
};

export default function CardPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.brand} aria-label="SoftNest Fabric Care home">
          <Image src="/img/logo/header_logo.webp" alt="" width={64} height={64} priority />
          <span><strong>SoftNest</strong><small>Fabric Care</small></span>
        </Link>

        <header className={styles.intro}>
          <p className={styles.eyebrow}>A little care goes a long way</p>
          <h1>Thank you for<br />choosing SoftNest.</h1>
          <p>How did we do? We’d love to hear about your experience.</p>
        </header>

        <nav className={styles.actions} aria-label="Review and contact SoftNest">
          <a href="https://g.page/r/Cd_RH59XuU1QEBM/review" className={`${styles.action} ${styles.primary}`}>
            <span className={styles.icon} aria-hidden="true">☆</span>
            <span><strong>Leave a Google review</strong><small>Your feedback means a lot to our team.</small></span>
            <span aria-hidden="true">↗</span>
          </a>
          <Link href="/quote/" className={styles.action}>
            <span className={styles.icon} aria-hidden="true">＋</span>
            <span><strong>Get a cleaning quote</strong><small>Tell us what needs a little care.</small></span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" className={styles.action}>
            <span className={styles.icon} aria-hidden="true">⌂</span>
            <span><strong>Visit our website</strong><small>Explore our services and cleaning results.</small></span>
            <span aria-hidden="true">→</span>
          </Link>
          <a href={siteConfig.phoneHref} className={styles.action}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3v3c0 1-1 2-2 1C9 20 4 15 3 5c0-1 1-2 2-2Z" /></svg>
            <span><strong>Call us</strong><small>{siteConfig.displayPhone}</small></span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <footer className={styles.footer}>
          <a href={siteConfig.instagramUrl}>Follow our work on Instagram <span aria-hidden="true">↗</span></a>
          <p>Upholstery &amp; carpet cleaning across the GTA</p>
          <Link href="/privacy/">Privacy policy</Link>
        </footer>
      </div>
    </main>
  );
}
