import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, GlobeIcon, InstagramIcon, MessageIcon, PhoneIcon } from "@/components/UiIcons";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact & Cleaning Quotes | SoftNest Fabric Care",
  description: "Request a free cleaning quote, see before-and-after results, read Google reviews or call SoftNest Fabric Care.",
  alternates: { canonical: "/card/" },
  robots: { index: false, follow: true },
};

export default function CardPage() {
  return <main className={`${styles.page} new-hero-root`}>
    <div className={styles.shell}>
      <Link href="/" className={`brand ${styles.brand}`} aria-label="SoftNest Fabric Care home">
        <Image src="/img/logo/header_logo.webp" alt="" width={80} height={80} priority />
        <span className="brand__name"><strong>SoftNest</strong>{" "}<small>Fabric Care</small></span>
      </Link>
      <header className={styles.intro}>
        <h1>Upholstery &amp; carpet cleaning.</h1>
        <p>For homes across the GTA and Hamilton.</p>
      </header>
      <nav className={styles.actions} aria-label="Quotes, cleaning results and reviews">
        <Link href="/quote/" className={`${styles.action} ${styles.primary} quote-cta`}>
          <span className={styles.icon}><MessageIcon /></span>
          <span><strong>Get a free quote</strong><small>Tell us what needs cleaning. Photos are optional.</small></span>
          <ChevronRightIcon className={styles.arrow} />
        </Link>
        <a href={siteConfig.instagramUrl} className={styles.action}>
          <span className={styles.icon}><InstagramIcon /></span>
          <span><strong>See our work</strong><small>Before-and-after cleaning results on Instagram.</small></span>
          <ChevronRightIcon className={styles.arrow} />
        </a>
        <a href={siteConfig.googleProfileUrl} className={styles.action}>
          <span className={styles.icon}><Image src="/img/google-g-official.svg" alt="" width={32} height={32} /></span>
          <span><strong>Google reviews</strong><small>Read what our customers say.</small></span>
          <ChevronRightIcon className={styles.arrow} />
        </a>
      </nav>
      <section className={styles.contact} aria-label="Call or text SoftNest">
        <PhoneIcon className={styles.phoneIcon} />
        <div>
          <a className={styles.phone} href={siteConfig.phoneHref}>{siteConfig.displayPhone}</a>
          <p><a href={siteConfig.phoneHref}>Call</a> or <a href={`sms:${siteConfig.phoneHref.slice(4)}`}>text us</a>. We are happy to help.</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <Link className={styles.website} href="/"><GlobeIcon />softnestcare.ca</Link>
        <p>Thank you for supporting our family business.</p>
        <div className={styles.footerLinks}>
          <a href="https://g.page/r/Cd_RH59XuU1QEBM/review">Leave a Google review</a>
          <a href={siteConfig.instagramUrl}>Instagram</a>
          <Link href="/privacy/">Privacy</Link>
        </div>
      </footer>
    </div>
  </main>;
}
