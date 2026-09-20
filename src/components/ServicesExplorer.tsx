"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { Service } from "@/content/services";
import ServiceDetailPanel from "@/components/ServiceDetailPanel";
import styles from "@/app/services/service-page.module.css";

function serviceFromUrl(services: Service[]) {
  const slug = new URLSearchParams(window.location.search).get("service");
  return services.find((item) => item.slug === slug)?.slug ?? services[0].slug;
}

export default function ServicesExplorer({ services }: { services: Service[] }) {
  const [selectedSlug, setSelectedSlug] = useState(services[0].slug);
  const service = services.find((item) => item.slug === selectedSlug) ?? services[0];

  useEffect(() => {
    const syncSelection = () => setSelectedSlug(serviceFromUrl(services));
    syncSelection();
    window.addEventListener("popstate", syncSelection);
    return () => window.removeEventListener("popstate", syncSelection);
  }, [services]);

  function selectService(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (selectedSlug === slug) return;
    window.history.pushState({}, "", `/services/?service=${slug}`);
    setSelectedSlug(slug);
    document.getElementById("services-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.serviceLayout} id="services-explorer">
      <aside className={styles.serviceSidebar}>
        <p className={styles.eyebrow}>Explore our care</p>
        <h1>Cleaning services</h1>
        <nav aria-label="Cleaning services" className={styles.serviceNav}>
          {services.map((item) => (
            <a
              key={item.slug}
              href={`/services/${item.slug}/`}
              aria-current={item.slug === service.slug ? "true" : undefined}
              onClick={(event) => selectService(event, item.slug)}
            >
              {item.menuLabel}
            </a>
          ))}
        </nav>
      </aside>
      <ServiceDetailPanel key={service.slug} service={service} headingLevel={2} />
    </div>
  );
}
