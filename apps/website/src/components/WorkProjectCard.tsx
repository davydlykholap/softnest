import Link from "next/link";
import Image from "@/components/ResponsiveImage";
import type { WorkProject } from "@/content/work";
import { workProjectHref } from "@softnest/content/work-urls";
import styles from "./WorkGallery.module.css";

export default function WorkProjectCard({ project, eager = false }: { project: WorkProject; eager?: boolean }) {
  const caption = project.cardCaption?.trim() || project.title;
  return <article className={styles.project} id={project.id} data-project-id={project.id}>
    <Link className={styles.cardLink} href={workProjectHref(project)} aria-label={caption}>
      <span className={styles.cover}>
        <Image src={project.image} alt={project.label} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" loading={eager ? "eager" : "lazy"} />
      </span>
      <span className={styles.caption}>{caption}</span>
    </Link>
  </article>;
}
