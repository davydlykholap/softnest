"use client";

import Image from "next/image";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Services", href: "#services", hasMenu: true },
  { label: "Reviews", href: "#reviews" },
  { label: "Before & After", href: "#results" },
  { label: "FAQ", href: "#faq" },
  { label: "About Us", href: "#about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#" className="brand" aria-label="SoftNest Fabric Care home">
        <span className="brand__mark">
          <Image
            src="/img/logo/header_logo.png"
            alt=""
            width={48}
            height={48}
            priority
          />
        </span>
        <span className="brand__name">
          <strong>SoftNest</strong>
          <small>Fabric Care</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
            {item.hasMenu && <ChevronDown size={14} aria-hidden="true" />}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <a className="header-phone" href="tel:+14167270287">
          <Phone size={21} aria-hidden="true" />
          <span>(416) 727-0287</span>
        </a>
        <a className="header-quote" href="#quote">
          Request a free quote
        </a>
      </div>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <a href={item.href} key={item.label} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="tel:+14167270287">Call (416) 727-0287</a>
        <a className="mobile-nav__quote" href="#quote">
          Request a free quote
        </a>
      </nav>
    </header>
  );
}
