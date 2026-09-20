import Image from "next/image";
import type { Service } from "@/content/services";
import { getProjects, getTestimonials } from "@/content/pages";
import styles from "@/app/services/service-page.module.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ServiceDetailPanel({
  service,
  headingLevel = 1,
}: {
  service: Service;
  headingLevel?: 1 | 2;
}) {
  const project = getProjects({ service: service.slug })[0];
  const review = getTestimonials().find((item) =>
    (item.services as string[]).includes(service.slug),
  );
  const HeroHeading = headingLevel === 1 ? "h1" : "h2";
  const SectionHeading = headingLevel === 1 ? "h2" : "h3";
  const NoteHeading = headingLevel === 1 ? "h3" : "h4";

  return (
    <div className={styles.serviceContent} id="service-detail">
      <section className={styles.serviceHero} aria-labelledby="service-heading">
        <div className={styles.heroMedia}>
          <Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 820px) 100vw, 65vw" />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Professional fabric care across the GTA</p>
          <HeroHeading id="service-heading">{service.name}</HeroHeading>
          <p>{service.heroDescription}</p>
        </div>
      </section>

      <section className={`${styles.serviceSection} ${styles.scopeSection}`} aria-labelledby="scope-heading">
        <p className={styles.eyebrow}>Service scope</p>
        <SectionHeading id="scope-heading">What&apos;s included</SectionHeading>
        <ul className={styles.includedList}>
          {service.included.map((item) => (
            <li key={item}><CheckIcon /><span>{item}</span></li>
          ))}
        </ul>
      </section>

      {project ? (
        <section className={`${styles.serviceSection} ${styles.proofSection}`} aria-labelledby="proof-heading">
          <div className={styles.proofInner}>
            <div className={styles.proofHeading}>
              <p className={styles.eyebrow}>Real homes, real results</p>
              <SectionHeading id="proof-heading">See the work</SectionHeading>
            </div>
            <div className={styles.proofCard}>
              <div className={styles.proofImage}>
                <Image src={project.image} alt={project.label} fill sizes="(max-width: 820px) 100vw, 55vw" />
                {project.variant === "paired" ? (
                  <div className={styles.proofLabels} aria-hidden="true"><span>Before</span><span>After</span></div>
                ) : null}
              </div>
              <div className={styles.proofCaption}>
                <strong>{project.category} · {project.service}</strong>
                <span>{project.location}</span>
              </div>
            </div>
          </div>
        </section>
      ) : review ? (
        <section className={`${styles.serviceSection} ${styles.proofSection}`} aria-labelledby="proof-heading">
          <div className={styles.proofInner}>
            <div className={styles.proofHeading}>
              <p className={styles.eyebrow}>Customer feedback</p>
              <SectionHeading id="proof-heading">What a customer said</SectionHeading>
            </div>
            <blockquote className={styles.reviewCard}>
              <p>“{review.text}”</p>
              <footer>{review.name} · Google review</footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <section className={styles.bookingDetails} aria-labelledby="details-heading">
        <p className={styles.eyebrow}>Good to know</p>
        <SectionHeading id="details-heading">Before you book</SectionHeading>
        <div>
          <NoteHeading>{service.afterCareHeading ?? "Drying and use"}</NoteHeading>
          <p>{service.drying}</p>
        </div>
        <div>
          <NoteHeading>Realistic results</NoteHeading>
          <p>{service.limitations}</p>
        </div>
      </section>

      <section className={`${styles.serviceSection} ${styles.faqSection}`} id="faq" aria-labelledby="faq-heading">
        <div className={styles.faqHeading}>
          <p className={styles.eyebrow}>Questions we hear</p>
          <SectionHeading id="faq-heading">Frequently asked questions</SectionHeading>
        </div>
        <div className={styles.faqList}>
          {service.faq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
