"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  home?: boolean;
  current?: "locations";
};

type ServiceIconName =
  | "sofa"
  | "paw"
  | "sectional"
  | "rug"
  | "mattress"
  | "chair"
  | "armchair"
  | "stairs";

type ServiceMenuItem = {
  label: string;
  description: string;
  icon: ServiceIconName;
  href: string;
};

const serviceMenuItems: ServiceMenuItem[] = [
  {
    label: "Sofa & Couch Cleaning",
    description:
      "Deep cleaning for everyday soil, body oils, spills and fabric build-up.",
    icon: "sofa",
    href: "/#services",
  },
  {
    label: "Pet Stain & Odour Removal",
    description:
      "Targeted treatment for affected areas, with clear expectations before service.",
    icon: "paw",
    href: "/#services",
  },
  {
    label: "Sectional & Furniture Cleaning",
    description:
      "Care for sectionals, loveseats, ottomans and other upholstered furniture.",
    icon: "sectional",
    href: "/#services",
  },
  {
    label: "Carpet & Area Rug Cleaning",
    description:
      "Professional cleaning for carpets, runners, area rugs and high-traffic zones.",
    icon: "rug",
    href: "/#services",
  },
  {
    label: "Mattress Cleaning",
    description:
      "A thorough surface clean for mattresses, including common marks and build-up.",
    icon: "mattress",
    href: "/#services",
  },
  {
    label: "Dining Chair Cleaning",
    description:
      "Fabric-seat and back cleaning for dining chairs used every day.",
    icon: "chair",
    href: "/#services",
  },
  {
    label: "Armchair Cleaning",
    description:
      "Fabric-appropriate cleaning for armchairs, recliners and accent seating.",
    icon: "armchair",
    href: "/#services",
  },
  {
    label: "Stairs & Hallways",
    description:
      "Cleaning for carpeted stairs, landings, hallways and other busy pathways.",
    icon: "stairs",
    href: "/#services",
  },
];

const navigation = [
  { label: "Reviews", hash: "reviews" },
  { label: "Before & After", hash: "results" },
  { label: "FAQ", hash: "faq" },
  { label: "About Us", hash: "about" },
];

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "paw":
      return (
        <svg {...commonProps}>
          <path d="M8.4 11.2c1.1-1.5 2.1-2.3 3.6-2.3s2.5.8 3.6 2.3c1.6 2.2 2.7 3.3 2.7 5.1 0 1.9-1.6 3.1-3.4 3.1-1.1 0-1.8-.5-2.9-.5s-1.8.5-2.9.5c-1.8 0-3.4-1.2-3.4-3.1 0-1.8 1.1-2.9 2.7-5.1Z" />
          <path d="M5.2 9.8c-1.2.1-2.2-1.1-2.3-2.6S3.5 4.4 4.7 4.3 6.9 5.4 7 6.9s-.6 2.8-1.8 2.9Z" />
          <path d="M9.6 7.3C8.4 7.2 7.6 6 7.8 4.5S9 1.9 10.2 2s2 1.3 1.8 2.8-1.2 2.6-2.4 2.5Z" />
          <path d="M14.4 7.3c1.2-.1 2-1.3 1.8-2.8S15 1.9 13.8 2s-2 1.3-1.8 2.8 1.2 2.6 2.4 2.5Z" />
          <path d="M18.8 9.8c1.2.1 2.2-1.1 2.3-2.6s-.6-2.8-1.8-2.9-2.2 1.1-2.3 2.6.6 2.8 1.8 2.9Z" />
        </svg>
      );
    case "rug":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" />
          <path d="M8 3.5v17M16 3.5v17M9.7 8.2h4.6M9.7 12h4.6M9.7 15.8h4.6" />
        </svg>
      );
    case "mattress":
      return (
        <svg {...commonProps}>
          <path d="M3 9.5h18v7H3zM5 6.5h14a2 2 0 0 1 2 2v1H3v-1a2 2 0 0 1 2-2Z" />
          <path d="M5 16.5v2M19 16.5v2M7 9.5v7M17 9.5v7" />
        </svg>
      );
    case "chair":
      return (
        <svg {...commonProps}>
          <path d="M7 4.5h10v8H7zM6 12.5h12v3H6zM8 15.5v4M16 15.5v4" />
        </svg>
      );
    case "armchair":
      return (
        <svg {...commonProps}>
          <path d="M7 8V5.5A2.5 2.5 0 0 1 9.5 3h5A2.5 2.5 0 0 1 17 5.5V8" />
          <path d="M6 8.5h12a2 2 0 0 1 2 2v5H4v-5a2 2 0 0 1 2-2Z" />
          <path d="M7 15.5v3M17 15.5v3M4 12.5h16" />
        </svg>
      );
    case "stairs":
      return (
        <svg {...commonProps}>
          <path d="M4 19h5v-4h4v-4h4V7h3" />
          <path d="M4 15h5M9 11h4M13 7h4" />
        </svg>
      );
    case "sectional":
      return (
        <svg {...commonProps}>
          <path d="M4 9V6.5A2.5 2.5 0 0 1 6.5 4H15a2 2 0 0 1 2 2v3" />
          <path d="M4 9h13a3 3 0 0 1 3 3v4H4z" />
          <path d="M9 9v7M4 16v2M18 16v2" />
        </svg>
      );
    case "sofa":
    default:
      return (
        <svg {...commonProps}>
          <path d="M5 10V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5V10" />
          <path d="M4 9.5a2 2 0 0 0-2 2v4.5h20v-4.5a2 2 0 0 0-2-2" />
          <path d="M7 10v6M17 10v6M5 16v2.5M19 16v2.5" />
        </svg>
      );
  }
}

export default function SiteHeader({
  home = false,
  current,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [servicesPosition, setServicesPosition] = useState({
    left: 24,
    top: 104,
    pointer: 180,
  });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const homeHref = (hash: string) => (home ? `#${hash}` : `/#${hash}`);
  const quoteHref = "/quote/";
  const selectedService = serviceMenuItems[activeService];

  const cancelServicesClose = useCallback(() => {
    if (servicesCloseTimerRef.current) {
      clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
  }, []);

  const updateServicesPosition = useCallback(() => {
    const trigger = servicesTriggerRef.current;
    if (!trigger || typeof window === "undefined") return;

    const triggerRect = trigger.getBoundingClientRect();
    const viewportPadding = 24;
    const desktopMenuMax = window.innerWidth <= 1180 ? 760 : 820;
    const menuWidth = Math.min(
      desktopMenuMax,
      window.innerWidth - viewportPadding * 2,
    );
    const desiredPointer = 190;
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const maxLeft = Math.max(
      viewportPadding,
      window.innerWidth - menuWidth - viewportPadding,
    );
    const left = Math.min(
      Math.max(triggerCenter - desiredPointer, viewportPadding),
      maxLeft,
    );
    const pointer = Math.min(
      Math.max(triggerCenter - left, 34),
      menuWidth - 34,
    );

    setServicesPosition({
      left,
      top: triggerRect.bottom + 18,
      pointer,
    });
  }, []);

  const openServices = useCallback(() => {
    cancelServicesClose();
    updateServicesPosition();
    setServicesOpen(true);
  }, [cancelServicesClose, updateServicesPosition]);

  const scheduleServicesClose = useCallback(() => {
    cancelServicesClose();
    servicesCloseTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, 360);
  }, [cancelServicesClose]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    const handleResize = () => {
      if (servicesOpen) updateServicesPosition();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
      cancelServicesClose();
    };
  }, [cancelServicesClose, servicesOpen, updateServicesPosition]);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="SoftNest Fabric Care home">
        <span className="brand__mark">
          <img src="/img/logo/header_logo.webp" alt="" />
        </span>
        <span className="brand__name">
          <strong>SoftNest</strong>
          <small>Fabric Care</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <div
          className={`services-menu ${servicesOpen ? "services-menu--open" : ""}`}
          ref={servicesRef}
          onMouseEnter={openServices}
          onMouseLeave={scheduleServicesClose}
        >
          <button
            ref={servicesTriggerRef}
            type="button"
            className="desktop-nav__services-trigger"
            aria-expanded={servicesOpen}
            aria-controls="services-mega-menu"
            onClick={() => {
              if (servicesOpen) {
                cancelServicesClose();
                setServicesOpen(false);
              } else {
                openServices();
              }
            }}
            onFocus={openServices}
          >
            Services
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            className="services-mega"
            id="services-mega-menu"
            aria-label="Cleaning services"
            onMouseEnter={cancelServicesClose}
            onMouseLeave={scheduleServicesClose}
            style={
              {
                "--services-left": `${servicesPosition.left}px`,
                "--services-top": `${servicesPosition.top}px`,
                "--services-pointer": `${servicesPosition.pointer}px`,
              } as CSSProperties
            }
          >
            <div className="services-mega__list-panel">
              <p className="services-mega__eyebrow">Our cleaning services</p>
              <div className="services-mega__list">
                {serviceMenuItems.map((item, index) => (
                  <Link
                    href={item.href}
                    className={`services-mega__item ${
                      activeService === index ? "is-active" : ""
                    }`}
                    key={item.label}
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                    onClick={() => {
                      cancelServicesClose();
                      setServicesOpen(false);
                    }}
                  >
                    <span className="services-mega__item-icon">
                      <ServiceIcon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    <span className="services-mega__item-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="services-mega__preview">
              <div className="services-mega__preview-copy">
                <p className="services-mega__preview-kicker">Featured service</p>
                <h2>{selectedService.label}</h2>
                <p>{selectedService.description}</p>
                <ul>
                  <li>Fabric-appropriate methods</li>
                  <li>Professional drying included</li>
                </ul>
                <Link
                  href={selectedService.href}
                  className="services-mega__learn"
                  onClick={() => {
                    cancelServicesClose();
                    setServicesOpen(false);
                  }}
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="services-mega__image-wrap">
                <img
                  src="/images/softnest-hero-room.webp"
                  alt="SoftNest upholstery cleaning service"
                />
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/location/"
          className={current === "locations" ? "is-active" : undefined}
        >
          Locations
        </Link>
        {navigation.map((item) => (
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
        <Link className="header-quote quote-cta" href={quoteHref}>
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
            {serviceMenuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                onClick={() => {
                  setOpen(false);
                  setMobileServicesOpen(false);
                }}
              >
                <span className="mobile-services__icon">
                  <ServiceIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/location/" onClick={() => setOpen(false)}>
          Locations
        </Link>
        {navigation.map((item) => (
          <Link
            href={homeHref(item.hash)}
            key={item.hash}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a href="tel:+14167270287">Call (416) 727-0287</a>
        <Link
          className="mobile-nav__quote quote-cta"
          href={quoteHref}
          onClick={() => setOpen(false)}
        >
          Request a free quote
        </Link>
      </nav>
    </header>
  );
}
