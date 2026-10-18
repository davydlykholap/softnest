"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceResultCompare from "@/components/ServiceResultCompare";
import Image from "@/components/ResponsiveImage";
import type { WorkProject } from "@/content/work";
import { useHydrated } from "@/lib/useHydrated";
import styles from "./WorkGallery.module.css";

type Choice = { slug: string; name: string };

export default function WorkGallery({ projects, services, locations }: {
  projects: WorkProject[]; services: Choice[]; locations: Choice[];
}) {
  const [service, setService] = useState("");
  const isInteractive = useHydrated();
  const [city, setCity] = useState("");
  const visible = projects.filter((project) => (!service || project.services.includes(service)) &&
    (!city || project.locations.includes(city)));
  const reset = () => { setService(""); setCity(""); };

  return <section className={styles.section} aria-label="Cleaning results">
    <div className={styles.filters}>
      <label>Service<select aria-label="Service" disabled={!isInteractive} value={service} onChange={(event) => setService(event.target.value)}>
        <option value="">All services</option>
        {services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
      </select></label>
      <label>Area<select aria-label="Area" disabled={!isInteractive} value={city} onChange={(event) => setCity(event.target.value)}>
        <option value="">All areas</option>
        {locations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
      </select></label>
      <p role="status">{visible.length} {visible.length === 1 ? "result" : "results"}</p>
      {service || city ? <button type="button" onClick={reset}>Clear filters</button> : null}
    </div>
    {visible.length === 0 ? <div className={styles.empty}>
      <h2>No photos for this selection yet.</h2>
      <p>You can still ask about cleaning in your area, or view the other results.</p>
      <button type="button" onClick={reset}>Show all results</button>
      <Link href="/quote/">Ask for a quote</Link>
    </div> : <div className={styles.grid}>
      {visible.map((project) => <article className={styles.project} key={project.id} id={project.id} data-project-id={project.id}>
        <div className={styles.media}>
          {project.variant === "paired" ? <ServiceResultCompare image={project.image} label={project.label} variant={project.variant} />
            : <Image src={project.image} alt={project.label} fill sizes="(max-width: 760px) 90vw, 45vw" />}
        </div>
        <div className={styles.caption}>
          <h2>{project.category}</h2>
          <p>{project.service}{project.location ? ` · ${project.location}` : ""}</p>
          {project.imageNote ? <p className={styles.imageNote}>{project.imageNote}</p> : null}
          {project.fabric || project.problem || project.treatment || project.result ? <dl>
            {project.fabric ? <div><dt>Material</dt><dd>{project.fabric}</dd></div> : null}
            {project.problem ? <div><dt>Before cleaning</dt><dd>{project.problem}</dd></div> : null}
            {project.treatment ? <div><dt>The work</dt><dd>{project.treatment}</dd></div> : null}
            {project.result ? <div><dt>The result</dt><dd>{project.result}</dd></div> : null}
          </dl> : null}
          <div className={styles.links}>
            {services.filter((item) => project.services.includes(item.slug)).map((item) =>
              <Link key={item.slug} href={`/services/${item.slug}/`}>{item.name}</Link>)}
          </div>
        </div>
      </article>)}
    </div>}
  </section>;
}
