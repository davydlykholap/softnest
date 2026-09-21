"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileHeaderNavigation } from "@/components/navigation/MobileHeaderNavigation";
import { ServiceIcon, iconBySlug, mobileServiceSlugs, navigation, type NavigationService } from "@/components/navigation/navigationData";

type HeaderNavigationProps = {
  current?: "blog" | "locations" | "services";
  actions: ReactNode;
  services: NavigationService[];
};

const serviceMenuOrder = [
  "sofa-cleaning",
  "mattress-cleaning",
  "sectional-furniture-cleaning",
  "carpet-area-rug-cleaning",
  "leather-upholstery-cleaning",
  "stairs-hallways-cleaning",
  "dining-chair-cleaning",
  "pet-stain-odour-removal",
  "armchair-cleaning",
];

const serviceMenuLabels: Record<string, string> = {
  "sofa-cleaning": "Sofa & Couch",
  "mattress-cleaning": "Mattresses",
  "sectional-furniture-cleaning": "Sectional & Furniture",
  "carpet-area-rug-cleaning": "Carpet & Area Rugs",
  "leather-upholstery-cleaning": "Leather Upholstery",
  "stairs-hallways-cleaning": "Stairs & Hallways",
  "dining-chair-cleaning": "Dining Chairs",
  "pet-stain-odour-removal": "Pet Stains & Odours",
  "armchair-cleaning": "Armchairs",
};

export default function HeaderNavigation({
  current,
  actions,
  services,
}: HeaderNavigationProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesPosition, setServicesPosition] = useState({
    left: 24,
    top: 104,
    pointer: 180,
  });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLAnchorElement>(null);
  const servicesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuServices = [...services].sort(
    (left, right) => {
      const leftRank = serviceMenuOrder.indexOf(left.slug);
      const rightRank = serviceMenuOrder.indexOf(right.slug);
      return (leftRank < 0 ? Infinity : leftRank) -
        (rightRank < 0 ? Infinity : rightRank);
    },
  );
  const mobileServices = mobileServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NavigationService => Boolean(service));

  useEffect(() => {
    const root = document.documentElement;
    const updateScrollState = () => {
      root.classList.toggle("is-page-scrolled", window.scrollY > 48);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      root.classList.remove("is-page-scrolled");
    };
  }, []);

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
    const headerRect = trigger.closest(".site-header")?.getBoundingClientRect();
    const viewportPadding = 24;
    const desktopMenuMax = 650;
    const menuWidth = Math.min(
      desktopMenuMax,
      window.innerWidth - viewportPadding * 2,
    );
    const desiredPointer = 90;
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const maxLeft = Math.max(
      viewportPadding,
      window.innerWidth - menuWidth - viewportPadding,
    );
    const viewportLeft = Math.min(
      Math.max(triggerCenter - desiredPointer, viewportPadding),
      maxLeft,
    );
    const pointer = Math.min(
      Math.max(triggerCenter - viewportLeft, 34),
      menuWidth - 34,
    );

    setServicesPosition({
      // The header's backdrop-filter makes it the containing block for this
      // fixed-position menu, so convert viewport coordinates to header-local
      // coordinates before applying them.
      left: viewportLeft - (headerRect?.left ?? 0),
      top: triggerRect.bottom + 18 - (headerRect?.top ?? 0),
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
        setOpen(false);
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
    <>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div
          className={`services-menu ${servicesOpen ? "services-menu--open" : ""}`}
          ref={servicesRef}
          onMouseLeave={scheduleServicesClose}
        >
          <Link
            ref={servicesTriggerRef}
            href="/services/"
            className={`desktop-nav__services-trigger ${
              current === "services" ? "is-active" : ""
            }`}
            aria-expanded={servicesOpen}
            aria-controls="services-mega-menu"
            aria-haspopup="true"
            onMouseEnter={openServices}
            onClick={() => {
              cancelServicesClose();
              setServicesOpen(false);
            }}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) openServices();
            }}
          >
            Services
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Link>

          <div
            className="services-mega"
            id="services-mega-menu"
            aria-label="Cleaning services"
            aria-hidden={!servicesOpen}
            inert={!servicesOpen}
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
            <h2 className="services-mega__heading">Services</h2>
            <div className="services-mega__list">
              {menuServices.map((service) => (
                <Link
                  href={`/services/${service.slug}/`}
                  className="services-mega__item"
                  key={service.slug}
                  onClick={() => {
                    cancelServicesClose();
                    setServicesOpen(false);
                  }}
                >
                  <span className="services-mega__item-icon">
                    <ServiceIcon name={iconBySlug[service.slug] ?? "sofa"} />
                  </span>
                  <span>{serviceMenuLabels[service.slug] ?? service.menuLabel}</span>
                </Link>
              ))}
            </div>
            <div className="services-mega__footer">
              <Link
                className="services-mega__all"
                href="/services/"
                onClick={() => setServicesOpen(false)}
              >
                View all services <span aria-hidden="true">→</span>
              </Link>
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
          <Link
            href={item.href}
            key={item.label}
            className={
              current === "blog" && item.href === "/blog/"
                ? "is-active"
                : undefined
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {actions}

      <MobileHeaderNavigation
        open={open}
        mobileServicesOpen={mobileServicesOpen}
        setOpen={setOpen}
        setMobileServicesOpen={setMobileServicesOpen}
        mobileServices={mobileServices}
      />
    </>
  );
}
