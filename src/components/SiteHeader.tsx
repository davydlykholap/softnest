"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  home?: boolean;
  current?: "locations";
};

const navigation = [
  { label: "Services", hash: "services" },
  { label: "Reviews", hash: "reviews" },
  { label: "Before & After", hash: "results" },
  { label: "FAQ", hash: "faq" },
  { label: "About Us", hash: "about" },
];

export default function SiteHeader({
  home = false,
  current,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const homeHref = (hash: string) => (home ? `#${hash}` : `/#${hash}`);
  const quoteHref = "/quote/";

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="SoftNest Fabric Care home">
        <span className="brand__mark">
          <img src="/img/logo/header_logo.png" alt="" />
        </span>
        <span className="brand__name">
          <strong>SoftNest</strong>
          <small>Fabric Care</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href={homeHref("services")}>
          Services
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Link>
        <Link
          href="/location/"
          className={current === "locations" ? "is-active" : undefined}
        >
          Locations
        </Link>
        {navigation.slice(1).map((item) => (
          <Link href={homeHref(item.hash)} key={item.hash}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-header__actions">
        <a className="header-phone" href="tel:+14167270287">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>(416) 727-0287</span>
        </a>
        <Link className="header-quote" href={quoteHref}>
          Request a free quote
        </Link>
      </div>

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
        {navigation.map((item) => (
          <Link
            href={homeHref(item.hash)}
            key={item.hash}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/location/" onClick={() => setOpen(false)}>
          Locations
        </Link>
        <a href="tel:+14167270287">Call (416) 727-0287</a>
        <Link
          className="mobile-nav__quote"
          href={quoteHref}
          onClick={() => setOpen(false)}
        >
          Request a free quote
        </Link>
      </nav>
    </header>
  );
}
