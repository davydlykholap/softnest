"use client";

import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { useSyncExternalStore, type Dispatch, type SetStateAction } from "react";
import type { NavigationService } from "./navigationData";

const subscribeToHydration = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

type Props = {
  open: boolean;
  mobileServicesOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setMobileServicesOpen: Dispatch<SetStateAction<boolean>>;
  mobileServices: NavigationService[];
  quoteHref: string;
};

export function MobileHeaderNavigation({ open, mobileServicesOpen, setOpen, setMobileServicesOpen, mobileServices, quoteHref }: Props) {
  const isInteractive = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  return (
    <>
      <div className="mobile-header-actions">
        <Link prefetch={false}
          className="mobile-header-quote"
          href={quoteHref}
          onClick={() => {
            setOpen(false);
            setMobileServicesOpen(false);
          }}
        >
          {siteConfig.quoteLabel}
        </Link>
        <button
          type="button"
          className="menu-toggle"
          disabled={!isInteractive}
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
      </div>

      <nav
        className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-services">
          <div
            className={`mobile-services__trigger ${
              mobileServicesOpen ? "mobile-services__trigger--open" : ""
            }`}
          >
            <Link prefetch={false}
              href="/services/"
              onClick={() => {
                setOpen(false);
                setMobileServicesOpen(false);
              }}
            >
              Services
            </Link>
            <button
              type="button"
              aria-label={mobileServicesOpen ? "Close services menu" : "Open services menu"}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-links"
              onClick={() => setMobileServicesOpen((value) => !value)}
            >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
            </button>
          </div>
          <div
            id="mobile-services-links"
            className={`mobile-services__links ${
              mobileServicesOpen ? "mobile-services__links--open" : ""
            }`}
          >
            {mobileServices.map((service) => (
              <Link prefetch={false}
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
            <Link prefetch={false}
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
          <Link prefetch={false} href="/location/" onClick={() => setOpen(false)}>
            Locations
          </Link>
          <Link prefetch={false} href="/blog/" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link prefetch={false} href="/our-work/" onClick={() => setOpen(false)}>
            Our Work
          </Link>
          <Link prefetch={false} href="/about/" onClick={() => setOpen(false)}>
            About SoftNest
          </Link>
        </div>

        <div className="mobile-nav__utility">
          <span className="mobile-nav__utility-label">Prefer to message?</span>
          <a className="mobile-nav__phone" href={siteConfig.smsHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Text us
          </a>
          <a className="mobile-nav__phone" href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <Link prefetch={false}
            className="mobile-nav__quote quote-cta"
            href={quoteHref}
            onClick={() => setOpen(false)}
          >
            {siteConfig.quoteLabel}
          </Link>
        </div>
      </nav>
    </>
  );
}
