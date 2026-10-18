import FaqAccordion from "@/components/FaqAccordion";
import Image from "@/components/ResponsiveImage";
import ServiceResultCompare from "@/components/ServiceResultCompare";
import Link from "next/link";
import type { Service } from "@/content/services";
import { getTestimonials } from "@/content/pages";
import { getWorkProjects } from "@/content/work";
import styles from "@/app/services/service-page.module.css";

const inspectionNotes: Record<string, string> = {
  "upholstery-cleaning": "We check the fabric, backing, cushions and existing wear first. These checks guide the cleaning products, moisture level and method used on each piece.",
  "sofa-cleaning": "We look closely at high-contact areas such as armrests, headrests, seat cushions and seams, then check removable cushions and hidden test areas before cleaning begins.",
  "leather-upholstery-cleaning": "Leather type and finish condition matter. We check for cracking, peeling, worn colour and previous products so cleaning and conditioning are limited to surfaces that can be treated safely.",
  "sectional-furniture-cleaning": "We count the sections, removable cushions, recliners and attached pieces before work begins. This makes the agreed work clear and helps us give each reachable area the attention it needs.",
  "carpet-area-rug-cleaning": "The material, backing, edges and how carpet is fitted all affect how it should be cleaned. Delicate rugs or those with an unstable backing may need specialist care away from your home.",
  "mattress-cleaning": "We check the mattress surface, padding, stains and the sides you want cleaned before choosing a treatment with carefully controlled moisture. Deep colour changes may remain after dirt has been removed.",
  "dining-chair-cleaning": "Chair sets can vary more than they appear to. We inspect each seat and back for fabric condition, food dye, edge wear and differences in padding before confirming the cleaning approach.",
  "armchair-cleaning": "We inspect the fabric, seams, cushions and any reclining mechanism first. Special care is taken around moving parts and the high-contact areas that usually hold the most body oils and soil.",
  "stairs-hallways-cleaning": "We review the number of steps, risers, landings and connected hallways, paying particular attention to worn edges, flattened pile and transitions into other flooring.",
  "pet-stain-odour-removal": "A small visible mark can hide a deeper pet accident. We discuss how far it may have soaked into fabric, foam, carpet backing or underlay before explaining what treatment can reasonably reach.",
};

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function naturalList(items: string[]) {
  return new Intl.ListFormat("en-CA", {
    style: "long",
    type: "conjunction",
  }).format(items.map(lowerFirst));
}

export default function ServiceDetailPanel({
  service,
  headingLevel = 1,
}: {
  service: Service;
  headingLevel?: 1 | 2;
}) {
  const project = getWorkProjects({ service: service.slug })[0];
  const review = getTestimonials().find((item) =>
    (item.services as string[]).includes(service.slug),
  );
  const HeroHeading = headingLevel === 1 ? "h1" : "h2";
  const SectionHeading = headingLevel === 1 ? "h2" : "h3";
  const NoteHeading = headingLevel === 1 ? "h3" : "h4";
  const inspectionNote = inspectionNotes[service.slug] ??
    "We inspect the material, construction, condition and existing wear before confirming the safest practical cleaning approach.";

  return (
    <div className={styles.serviceContent} id="service-detail">
      <section className={styles.serviceHero} aria-labelledby="service-heading">
        <div className={styles.heroMedia}>
          <Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 820px) 100vw, 65vw" />
        </div>
        <div className={styles.heroCopy}>
          <HeroHeading id="service-heading">{service.name}</HeroHeading>
          <p>{service.heroDescription}</p>
        </div>
      </section>

      <section className={`${styles.serviceSection} ${styles.editorialSection}`} aria-labelledby="service-overview-heading">
        <div className={styles.editorialIntro}>
          <SectionHeading id="service-overview-heading">
            A closer look at {service.shortName.toLowerCase()}
          </SectionHeading>
          <p className={styles.editorialLead}>{service.summary}</p>
        </div>

        <div className={styles.editorialBody}>
          <article>
            <NoteHeading>What we look at first</NoteHeading>
            <p>{inspectionNote}</p>
          </article>
          <article>
            <NoteHeading>What the cleaning includes</NoteHeading>
            <p>
              Your cleaning can include {naturalList(service.included)}.
            </p>
            <p>
              We confirm the areas to be cleaned and explain the method before starting.
            </p>
          </article>
        </div>

        <div className={styles.examplesNote}>
          <NoteHeading>When this service may be a good fit</NoteHeading>
          <p>
            Ask us about {naturalList(service.concerns)}. You can describe the
            problem by phone or text. Photos are welcome but optional.
          </p>
        </div>
      </section>

      {project ? (
        <section className={styles.resultFeature} aria-labelledby="proof-heading">
          <div className={styles.resultFeatureCopy}>
            <span className={styles.resultFeatureRule} aria-hidden="true" />
            <SectionHeading id="proof-heading">
              <span>See the</span>
              <span>Difference.</span>
            </SectionHeading>
            <p className={styles.resultFeatureDescription}>
              {project.location ? `A SoftNest cleaning result from ${project.location}.` : "An example of our cleaning work."}
            </p>
            <div className={styles.resultFeatureMeta}>
              <strong>{project.category} · {project.service}</strong>
              <span>{project.location}</span>
            </div>
            <p><Link href="/our-work/">See more before-and-after results</Link></p>
          </div>
          <div className={styles.resultFeatureMedia}>
            <ServiceResultCompare
              image={project.image}
              label={project.label}
              variant={project.variant}
            />
          </div>
        </section>
      ) : review ? (
        <section className={`${styles.serviceSection} ${styles.proofSection}`} aria-labelledby="proof-heading">
          <div className={styles.proofInner}>
            <div className={styles.proofHeading}>
              <SectionHeading id="proof-heading">What a customer said</SectionHeading>
            </div>
            <blockquote className={styles.reviewCard}>
              <p>“{review.text}”</p>
              <footer>{review.name} · Google review</footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <section className={styles.expectationsSection} aria-labelledby="expectations-heading">
        <div className={styles.expectationsHeading}>
          <SectionHeading id="expectations-heading">What to expect before you book</SectionHeading>
          <p>
            Call, message us or use the quote form to describe the item and any
            stains or odours. The form and photos are optional. We confirm the
            work and price with you and explain anything that needs an on-site check.
          </p>
        </div>
        <div className={styles.expectationsCopy}>
          <div>
            <NoteHeading>Drying and use</NoteHeading>
            <p>{service.drying}</p>
          </div>
          <div>
            <NoteHeading>Realistic results</NoteHeading>
            <p>{service.limitations}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.serviceSection} ${styles.faqSection}`} id="faq" aria-labelledby="faq-heading">
        <div className={styles.faqHeading}>
          <SectionHeading id="faq-heading">Frequently asked questions</SectionHeading>
        </div>
        <FaqAccordion items={service.faq} />
      </section>

    </div>
  );
}
