"use client";

import { siteConfig } from "@/lib/site";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import type { NavigationService } from "./navigationData";

type Props = {
  open: boolean;
  mobileServicesOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMobileServicesOpen: Dispatch<SetStateAction<boolean>>;
  mobileServices: NavigationService[];
};

export function MobileHeaderNavigation({ open, mobileServicesOpen, setOpen, setMobileServicesOpen, mobileServices }: Props) {
  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg className="menu-icon-open" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg className="menu-icon-close" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <nav
        className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-services">
          <button
            type="button"
            className="mobile-services__trigger"
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((value) => !value)}
          >
            Services
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            className={`mobile-services__links ${
              mobileServicesOpen ? "mobile-services__links--open" : ""
            }`}
          >
            <p className="mobile-services__eyebrow">Popular services</p>
            {mobileServices.map((service) => (
              <Link
                href={`/services/${service.slug}/`}
                key={service.slug}
                onClick={() => {
                  setOpen(false);
                  setMobileServicesOpen(false);
                }}
              >
                <span>{service.menuLabel}</span>
              </Link>
            ))}
            <Link
              className="mobile-services__all"
              href="/services/"
              onClick={() => {
                setOpen(false);
                setMobileServicesOpen(false);
              }}
            >
              <span>View all services</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mobile-nav__primary">
          <Link href="/location/" onClick={() => setOpen(false)}>
            Locations
          </Link>
          <Link href="/blog/" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/about/" onClick={() => setOpen(false)}>
            About SoftNest
          </Link>
        </div>

        <div className="mobile-nav__utility">
          <span className="mobile-nav__utility-label">Prefer to talk?</span>
          <a className="mobile-nav__phone" href={siteConfig.phoneHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
            </svg>
            {siteConfig.displayPhone}
          </a>
          <Link
            className="mobile-nav__quote quote-cta"
            href="/quote/"
            onClick={() => setOpen(false)}
          >
            {siteConfig.quoteLabel}
          </Link>
        </div>
      </nav>
    </>
  );
}
