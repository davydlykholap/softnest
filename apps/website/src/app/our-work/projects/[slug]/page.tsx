import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ServiceResultCompare from "@/components/ServiceResultCompare";
import WorkPhoto from "@/components/WorkPhoto";
import WorkVideo from "@/components/WorkVideo";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import { getWorkProjects } from "@/content/work";
import { services } from "@/content/services";
import { workProjectHref } from "@softnest/content/work-urls";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { projectBreadcrumbs, projectDescription, projectSchema, projectTitle } from "@/seo/work";
import { cityServicePages } from "@/content/cityServicePages";
import styles from "../project.module.css";
import "@/app/styles/location-page.css";

type Props = {params:Promise<{slug:string}>};
export function generateStaticParams() { return getWorkProjects().map(({slug}) => ({slug})); }
export const dynamicParams = false;
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug} = await params;
  const project = getWorkProjects().find(item => item.slug === slug);
  if(!project) return {};
  return pageMetadata({title:projectTitle(project),description:projectDescription(project),path:workProjectHref(project),image:project.image,imageAlt:project.label});
}
export default async function WorkProjectPage({params}:Props) {
  const {slug} = await params;
  const project = getWorkProjects().find(item => item.slug === slug);
  if(!project) notFound();
  const city = project.locations[0];
  const quoteHref = `/quote/?city=${encodeURIComponent(city)}`;
  const schema = projectSchema(project,`/our-work/${city}/`);
  const crumbs = projectBreadcrumbs(project,city);
  const serviceLinks = project.services.flatMap(slug => {
    const page = cityServicePages.find(item => item.location.slug === city && item.service.slug === slug);
    return page ? [{href:page.path,label:page.title}] : [];
  });
  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" quoteHref={quoteHref} /></div>
    <main id="main-content" className={`location-page-page ${styles.page}`}>
      <article className={styles.shell}>
        <Link className={styles.back} href={`/our-work/${city}/`}>← More work in {project.location}</Link>
        <header className={styles.intro}>
          <h1>{project.title}</h1>
          <p>{project.service} · <Link href={`/our-work/${city}/`}>{project.location}</Link>{project.date ? <> · <time dateTime={project.date}>{new Intl.DateTimeFormat("en-CA",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(project.date))}</time></> : null}</p>
        </header>
        <div className={styles.cover}>
          {project.variant === "paired" ? <ServiceResultCompare image={project.image} label={project.label} variant="paired" eager /> : <WorkPhoto image={project.image} alt={project.label} />}
        </div>
        {project.introduction || project.fabric || project.problem || project.treatment || project.result ? <section className={styles.story} aria-label="About this appointment">
          {project.introduction ? <p>{project.introduction}</p> : null}
          {project.fabric ? <p><strong>Material:</strong> {project.fabric}</p> : null}
          {[["Before cleaning",project.problem],["The work",project.treatment],["The result",project.result]].map(([title,body]) => body ? <div key={title}><h2>{title}</h2><p>{body}</p></div> : null)}
        </section> : null}
        <div className={styles.media}>
          {project.media.map(item => <div key={item.id} data-project-media={item.type}>
            {item.type === "photo" ? <WorkPhoto image={item.image} alt={item.alt} /> : item.type === "comparison" ? <ServiceResultCompare image={item.before} before={item.before} after={item.after} label={item.alt} variant="paired" /> : <WorkVideo item={item} />}
          </div>)}
        </div>
        <div className={styles.services}>
          {serviceLinks.map(link => <Link key={link.href} href={link.href}>{link.label} →</Link>)}
          {services.filter(service => project.services.includes(service.slug)).map(service => <Link key={service.slug} href={`/services/${service.slug}/`}>{service.name} →</Link>)}
        </div>
      </article>
      <DirectoryFinalCta id="quote-cta" title="What would you like cleaned?" description="Tell us what needs attention. We confirm the price before booking." action={{href:quoteHref,label:"Get a Quote"}} image="/images/home/softnest-sofa-living-room.webp" imageAlt="Living room with a green sofa" />
    </main>
    <SiteFooter quoteHref={quoteHref} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(crumbs)}} />
  </>;
}
