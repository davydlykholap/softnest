import { siteConfig } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { footerLocations } from "@/content/locations";
import { navigationServices } from "@/content/services";
import SocialMediaLinks from "@/components/SocialMediaLinks";

export default function SiteFooter() {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim();

  return (
    <footer className="site-footer site-footer--refined bg-white px-[6%] py-12 border-b border-forestGreen/10">
      <div className="site-footer__grid max-w-6xl mx-auto grid grid-cols-1 gap-10">
        <div className="site-footer__brand">
          <div className="site-footer__desktop-brand">
            <h2 className="font-serif font-bold text-forestGreen text-xl uppercase mb-4">
              SoftNest
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Quality You Can See.
              <br />
              Care You Can Trust.
            </p>
            <p className="text-sm text-stone-700 leading-relaxed mt-4">
              Professional upholstery and carpet cleaning across the Greater Toronto Area.
            </p>
            <Link className="footer-location-all" href="/about/">
              About SoftNest
            </Link>
            <div className="footer-social-block">
              <p className="footer-social-heading">Follow our work</p>
              <SocialMediaLinks variant="footer" />
            </div>
          </div>

          <div className="site-footer__mobile-brand">
            <div className="site-footer__mobile-brand-row">
              <Link className="site-footer__mobile-logo" href="/" aria-label="SoftNest Fabric Care home">
                <Image src="/img/logo/header_logo.webp" alt="" width={64} height={64} />
                <span>
                  <strong>SoftNest</strong>
                  <small>Fabric Care</small>
                </span>
              </Link>
            </div>
            <p>Professional upholstery and carpet cleaning across the Greater Toronto Area.</p>
            <div className="site-footer__mobile-socials">
              <SocialMediaLinks variant="gallery" />
              {youtubeUrl ? (
                <a
                  className="site-footer__youtube"
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit SoftNest Fabric Care on YouTube"
                  title="YouTube"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.6 7.1a2.9 2.9 0 0 0-2-2.05C17.82 4.56 12 4.56 12 4.56s-5.82 0-7.6.49a2.9 2.9 0 0 0-2 2.05A30 30 0 0 0 1.91 12a30 30 0 0 0 .49 4.9 2.9 2.9 0 0 0 2 2.05c1.78.49 7.6.49 7.6.49s5.82 0 7.6-.49a2.9 2.9 0 0 0 2-2.05 30 30 0 0 0 .49-4.9 30 30 0 0 0-.49-4.9Z" />
                    <path className="site-footer__youtube-play" d="m9.8 15.2 5.2-3.2-5.2-3.2Z" />
                  </svg>
                </a>
              ) : (
                <span
                  className="site-footer__youtube"
                  role="img"
                  aria-label="SoftNest YouTube channel coming soon"
                  title="YouTube — coming soon"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.6 7.1a2.9 2.9 0 0 0-2-2.05C17.82 4.56 12 4.56 12 4.56s-5.82 0-7.6.49a2.9 2.9 0 0 0-2 2.05A30 30 0 0 0 1.91 12a30 30 0 0 0 .49 4.9 2.9 2.9 0 0 0 2 2.05c1.78.49 7.6.49 7.6.49s5.82 0 7.6-.49a2.9 2.9 0 0 0 2-2.05 30 30 0 0 0 .49-4.9 30 30 0 0 0-.49-4.9Z" />
                    <path className="site-footer__youtube-play" d="m9.8 15.2 5.2-3.2-5.2-3.2Z" />
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="footer-desktop-nav-column">
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Services
          </h3>
          <ul className="footer-service-list space-y-2 text-sm text-stone-700">
            {navigationServices.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`}>
                  {service.menuLabel}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="footer-location-all" href="/services/">
            View all services
          </Link>
        </div>

        <div className="footer-desktop-nav-column footer-desktop-nav-column--company">
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Company
          </h3>
          <ul className="footer-service-list space-y-2 text-sm text-stone-700">
            <li><Link href="/about/">About SoftNest</Link></li>
            <li><Link href="/#results">Our Results</Link></li>
            <li><Link href="/blog/">Care Journal</Link></li>
            <li><Link href="/quote/">Get a Quote</Link></li>
          </ul>
        </div>
        <div className="footer-desktop-nav-column">
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Areas We Serve
          </h3>
          <ul className="footer-location-list text-sm text-stone-700">
            {footerLocations.map((location) => (
              <li key={location.slug}>
                <Link href={`/location/${location.slug}/`}>
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="footer-location-all" href="/location/">
            View all locations
          </Link>
        </div>

        <div className="footer-mobile-nav" aria-label="Footer navigation">
          <details>
            <summary>Services</summary>
            <div className="footer-mobile-nav__content">
              <ul className="footer-service-list text-sm text-stone-700">
                {navigationServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/`}>
                      {service.menuLabel}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="footer-location-all" href="/services/">
                View all services
              </Link>
            </div>
          </details>

          <details>
            <summary>Areas We Serve</summary>
            <div className="footer-mobile-nav__content">
              <ul className="footer-location-list text-sm text-stone-700">
                {footerLocations.map((location) => (
                  <li key={location.slug}>
                    <Link href={`/location/${location.slug}/`}>
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link className="footer-location-all" href="/location/">
                View all locations
              </Link>
            </div>
          </details>

          <details>
            <summary>Company</summary>
            <div className="footer-mobile-nav__content">
              <ul className="footer-service-list text-sm text-stone-700">
                <li><Link href="/about/">About SoftNest</Link></li>
                <li><Link href="/#results">Our Results</Link></li>
                <li><Link href="/blog/">Care Journal</Link></li>
                <li><Link href="/quote/">Get a Quote</Link></li>
              </ul>
            </div>
          </details>
        </div>

        <div className="site-footer__contact site-footer__contact--desktop">
          <h3 className="font-serif font-bold text-forestGreen text-sm uppercase mb-4">
            Contact
          </h3>
          <p className="text-sm text-stone-700 mb-2">
            <a href={siteConfig.emailHref}>
              {siteConfig.email}
            </a>
          </p>
          <p className="text-sm text-stone-700">
            Greater Toronto Area
            <br />
            Ontario
          </p>
          <div
            className="softnest-map softnest-map--footer mt-6 h-28 border border-forestGreen/10"
            aria-label="SoftNest service radius map"
          >
            <iframe
              title="SoftNest service area map for Toronto and surrounding cities"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=43.66,-79.55&z=10&output=embed"
            />
            <div className="softnest-map__static-layer" aria-hidden="true" />
          </div>
        </div>

        <section className="site-footer__mobile-contact" aria-label="SoftNest contact details">
          <a className="site-footer__mobile-detail" href={siteConfig.emailHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {siteConfig.email}
          </a>
          <p className="site-footer__mobile-detail">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Greater Toronto Area, Ontario
          </p>
        </section>
      </div>
      <div className="site-footer__bottom max-w-6xl mx-auto mt-10 pt-6 border-t border-forestGreen/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 {siteConfig.name}<span className="site-footer__rights">. All rights reserved.</span></p>
        <p className="footer-legal-links">
          <Link href="/privacy/">Privacy<span className="site-footer__legal-suffix"> Policy</span></Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms/">Terms<span className="site-footer__legal-suffix"> of Service</span></Link>
        </p>
      </div>
    </footer>
  );
}
