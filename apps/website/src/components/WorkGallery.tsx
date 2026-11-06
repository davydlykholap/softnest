"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import WorkProjectCard from "@/components/WorkProjectCard";
import type { WorkProject } from "@/content/work";
import { useHydrated } from "@/lib/useHydrated";
import styles from "./WorkGallery.module.css";

type Choice = { slug: string; name: string };
const filterEvent = "softnest-work-filter";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(filterEvent, callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener(filterEvent, callback); };
}
const snapshot = () => window.location.search;
const serverSnapshot = () => "";

export default function WorkGallery({ projects, services, city }: { projects: WorkProject[]; services: Choice[]; city?: string }) {
  const search = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const selected = new URLSearchParams(search).get("service") || "";
  const service = services.some(item => item.slug === selected) ? selected : "";
  const interactive = useHydrated();
  const visible = projects.filter(project => !service || project.services.includes(service));
  function setService(value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("service", value);
    else url.searchParams.delete("service");
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event(filterEvent));
  }
  return <section className={styles.section} aria-label="Cleaning results">
    {(projects.length > 6 && services.length > 1) || service ? <div className={styles.filters}>
      {services.length > 1 ? <label>Service<select disabled={!interactive} value={service} onChange={event => setService(event.target.value)}>
        <option value="">All services</option>
        {services.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
      </select></label> : null}
      {service ? <button type="button" onClick={() => setService("")}>Clear filters</button> : null}
    </div> : null}
    {visible.length ? <div className={styles.grid}>
      {visible.map((project, index) => <WorkProjectCard key={project.id} project={project} eager={index < 3} />)}
    </div> : <div className={styles.empty}>
      <h2>No projects for this selection yet.</h2>
      <button type="button" onClick={() => setService("")}>Show all results</button>
      <Link href={`/quote/${city ? `?city=${encodeURIComponent(city)}` : ""}`}>Ask for a quote</Link>
    </div>}
  </section>;
}
