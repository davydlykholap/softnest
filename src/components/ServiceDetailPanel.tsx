import FaqAccordion from "@/components/FaqAccordion";
import Image from "next/image";
import ServiceResultCompare from "@/components/ServiceResultCompare";
import type { Service } from "@/content/services";
import { getProjects, getTestimonials } from "@/content/pages";
import styles from "@/app/services/service-page.module.css";

const inspectionNotes: Record<string, string> = {
  "upholstery-cleaning": "We first identify the fabric, backing, cushion construction and existing wear. That assessment guides the products, moisture level and extraction method used on each piece.",
  "sofa-cleaning": "We look closely at high-contact areas such as armrests, headrests, seat cushions and seams, then check removable cushions and hidden test areas before cleaning begins.",
  "leather-upholstery-cleaning": "Leather type and finish condition matter. We check for cracking, peeling, worn colour and previous products so cleaning and conditioning are limited to surfaces that can be treated safely.",
  "sectional-furniture-cleaning": "We confirm the number of sections, removable cushions, recliners and attached pieces before work begins. This keeps the quoted scope clear and allows each accessible area to be cleaned methodically.",
  "carpet-area-rug-cleaning": "Fibre type, backing, edge construction and installation all affect how carpet or a rug should be cleaned. Delicate or unstable rugs may need specialist off-site care instead.",
  "mattress-cleaning": "We assess the mattress surface, padding, staining and requested sides before selecting a controlled-moisture treatment. Deep discoloration can remain even when removable soil has been extracted.",
  "dining-chair-cleaning": "Chair sets can vary more than they appear to. We inspect each seat and back for fabric condition, food dye, edge wear and differences in padding before confirming the cleaning approach.",
  "armchair-cleaning": "We inspect the fabric, seams, cushions and any reclining mechanism first. Special care is taken around moving parts and the high-contact areas that usually hold the most body oils and soil.",
  "stairs-hallways-cleaning": "We review the number of steps, risers, landings and connected hallways, paying particular attention to worn edges, flattened pile and transitions into other flooring.",
  "pet-stain-odour-removal": "A visible mark does not always show how far contamination has travelled. We discuss the likely depth in fabric, foam, carpet backing or underlay before recommending a realistic treatment scope.",
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
  const project = getProjects({ service: service.slug })[0];
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
          <p className={styles.eyebrow}>Professional fabric care across the GTA</p>
          <HeroHeading id="service-heading">{service.name}</HeroHeading>
          <p>{service.heroDescription}</p>
        </div>
      </section>

      <section className={`${styles.serviceSection} ${styles.editorialSection}`} aria-labelledby="service-overview-heading">
        <div className={styles.editorialIntro}>
          <p className={styles.eyebrow}>About this service</p>
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
              The confirmed service can include {naturalList(service.included)}.
            </p>
            <p>
              We review the item with you before starting, confirm which accessible
              surfaces are included and adjust the approach when the material or
              condition calls for extra care.
            </p>
          </article>
        </div>

        <div className={styles.examplesNote}>
          <p className={styles.eyebrow}>Common examples</p>
          <NoteHeading>When this service may be a good fit</NoteHeading>
          <p>
            Homeowners commonly contact us about {naturalList(service.concerns)}.
            Photos help us understand the item and concern before we confirm the
            recommended service.
          </p>
        </div>
      </section>

      {project ? (
        <section className={styles.resultFeature} aria-labelledby="proof-heading">
          <div className={styles.resultFeatureCopy}>
            <p className={styles.eyebrow}>Real homes, real results</p>
            <span className={styles.resultFeatureRule} aria-hidden="true" />
            <SectionHeading id="proof-heading">
              <span>See the</span>
              <span>Difference.</span>
            </SectionHeading>
            <p className={styles.resultFeatureDescription}>
              A real SoftNest cleaning result from {project.location}.
            </p>
            <div className={styles.resultFeatureMeta}>
              <strong>{project.category} · {project.service}</strong>
              <span>{project.location}</span>
            </div>
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

      <section className={styles.expectationsSection} aria-labelledby="expectations-heading">
        <div className={styles.expectationsHeading}>
          <p className={styles.eyebrow}>Good to know</p>
          <SectionHeading id="expectations-heading">What to expect before you book</SectionHeading>
          <p>
            Send a few clear photos and describe the item, material if known, and
            the main stains, odours or areas of concern. We use that information to
            confirm the likely scope and explain anything that needs an on-site check.
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
          <p className={styles.eyebrow}>Questions we hear</p>
          <SectionHeading id="faq-heading">Frequently asked questions</SectionHeading>
        </div>
        <FaqAccordion items={service.faq} />
      </section>

    </div>
  );
}
