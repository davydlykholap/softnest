import Image from "@/components/ResponsiveImage";
import Link from "next/link";
import { getCityWorkPreview, getWorkProjects } from "@/content/work";
import styles from "./LocalWorkEvidence.module.css";
import { workProjectHref } from "@/lib/workUrls";

export default function LocalWorkEvidence({ city, cityName, service, showPreview = false }: {
  city: string; cityName: string; service?: string; showPreview?: boolean;
}) {
  const selection = showPreview ? getCityWorkPreview(city) : { projects: getWorkProjects({ city, service }), isPreview: false };
  const projects = selection.projects.slice(0, 2);
  const galleryHref = `/our-work/${city}/${service ? `?service=${encodeURIComponent(service)}` : ""}`;
  if (!projects.length && !showPreview) return null;

  return <section id="local-work" className={`${styles.section} ${!projects.length ? styles.empty : ""}`} aria-labelledby="local-work-heading" data-local-evidence={city} data-work-preview={selection.isPreview || undefined}>
    <div className={styles.heading}>
      <h2 id="local-work-heading">{selection.isPreview ? "Our work" : `Our work in ${cityName}`}</h2>
      <Link prefetch={false} href={galleryHref}>View {cityName} cleaning results →</Link>
    </div>
    {projects.length ? <div className={`${styles.content} ${projects.length === 1 ? styles.featured : ""}`}>
      {projects.map(project => <article className={styles.project} key={project.id} data-project-id={project.id}>
        <div>
          <Link prefetch={false} href={workProjectHref(project)} aria-label={`See ${project.category.toLowerCase()} cleaning in ${project.location}`}>
            <div className={styles.image}>
              <Image src={project.image} alt={project.label} fill sizes="(max-width: 760px) 90vw, 45vw" />
            </div>
          </Link>
        </div>
        <div>
          <h3>{project.title}</h3>
          <p>{project.service} · {project.location}</p>
          {project.result ? <p>{project.result}</p> : null}
          <div className={styles.projectAction}>
            <Link prefetch={false} href={workProjectHref(project)}>View this appointment →</Link>
          </div>
        </div>
      </article>)}
    </div> : <p>Local appointment photos are coming. You can <Link href="/our-work/">browse our work across the service area</Link> while we add results from {cityName}.</p>}
  </section>;
}
