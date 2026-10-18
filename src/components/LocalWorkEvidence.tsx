import Image from "@/components/ResponsiveImage";
import Link from "next/link";
import { getWorkProjects, getWorkReviews, reviewExcerpt } from "@/content/work";
import { siteConfig } from "@/lib/site";
import LocationReviews from "@/components/locations/LocationReviews";
import styles from "./LocalWorkEvidence.module.css";

export default function LocalWorkEvidence({ city, cityName, service, fallbackReviews = false }: {
  city: string; cityName: string; service?: string; fallbackReviews?: boolean;
}) {
  const project = getWorkProjects({ city, service })[0];
  const review = getWorkReviews({ city, service })[0];
  if (!project && !review) return fallbackReviews ? <LocationReviews /> : null;

  return <section className={styles.section} aria-labelledby="local-work-heading" data-local-evidence={city}>
    <div className={styles.heading}>
      <h2 id="local-work-heading">{service ? "From a local appointment" : `Our work in ${cityName}`}</h2>
      <Link href="/our-work/">See more cleaning results</Link>
    </div>
    <div className={styles.content}>
      {project ? <article className={styles.project} data-project-id={project.id}>
        <Link href={`/our-work/#${project.id}`} aria-label={`See ${project.category.toLowerCase()} cleaning in ${cityName}`}>
          <div className={styles.image}>
            <Image src={project.image} alt={project.label} fill sizes="(max-width: 760px) 90vw, 45vw" />
          </div>
          <h3>{project.category} cleaning</h3>
        </Link>
        <p>{project.service} · {project.location}</p>
        {project.result ? <p>{project.result}</p> : null}
      </article> : null}
      {review ? <figure className={styles.review} data-review-author={review.name}>
        <blockquote><p>“{reviewExcerpt(review.text)}”</p></blockquote>
        <figcaption>
          <strong>{review.name}</strong>
          <span>{cityName} · {review.source || "Customer"} review{review.text.length > 300 ? " excerpt" : ""}</span>
          <a href={review.sourceUrl?.startsWith("https://") ? review.sourceUrl : siteConfig.googleProfileUrl}>View Google reviews</a>
        </figcaption>
      </figure> : null}
    </div>
  </section>;
}
