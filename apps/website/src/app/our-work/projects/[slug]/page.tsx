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
import { getLocation } from "@/content/locations";
import { services } from "@/content/services";
import { workProjectHref } from "@softnest/content/work-urls";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { portCreditWatchPath, portCreditWatchVideo, projectBreadcrumbs, projectDescription, projectSchema, projectTitle } from "@/seo/work";
import { cityServicePages } from "@/content/cityServicePages";
import { getRelatedPosts } from "@/content/posts";
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
  const quoteHref = getLocation(city) ? `/quote/?city=${encodeURIComponent(city)}` : "/quote/";
  const schema = projectSchema(project,`/our-work/${city}/`);
  const crumbs = projectBreadcrumbs(project,city);
  const firstMedia = project.media[0];
  const leadVideo = firstMedia?.type === "video" && firstMedia.video ? firstMedia : undefined;
  const additionalMedia = leadVideo ? project.media.slice(1) : project.media;
  const serviceLinks = project.services.flatMap(slug => {
    const page = cityServicePages.find(item => item.location.slug === city && item.service.slug === slug);
    return page ? [{href:page.path,label:page.title}] : [];
  });
  const cityPage = project.services.map(slug => cityServicePages.find(item => item.location.slug === city && item.service.slug === slug)).find(Boolean);
  const faqs = (cityPage?.faqs ?? []).slice(1);
  const guides = [...new Map(project.services.flatMap(slug => getRelatedPosts(slug)).map(post => [post.slug, post])).values()].slice(0, 3);
  const sameCity = getWorkProjects({city}).filter(item => item.id !== project.id);
  const moreWork = [...sameCity.filter(item => item.services.some(slug => project.services.includes(slug))), ...sameCity].filter((item, index, all) => all.indexOf(item) === index).slice(0, 3);
  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" quoteHref={quoteHref} /></div>
    <main id="main-content" className={`location-page-page ${styles.page}`}>
      <article className={styles.shell}>
        <Link className={styles.back} href={`/our-work/${city}/`}>← More work in {project.location}</Link>
        <header className={styles.intro}>
          <h1>{project.title}</h1>
          <p>{project.service} · <Link href={`/our-work/${city}/`}>{project.location}</Link>{project.date ? <> · <time dateTime={project.date}>{new Intl.DateTimeFormat("en-CA",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(project.date))}</time></> : null}</p>
        </header>
        {leadVideo ? <div className={styles.cover} data-project-media="video">
          <WorkVideo item={leadVideo} />
          {portCreditWatchVideo(project) ? <Link className={styles.back} href={portCreditWatchPath}>Open the video page →</Link> : null}
        </div> : <div className={styles.cover}>
          {project.variant === "paired" ? <ServiceResultCompare image={project.image} label={project.label} variant="paired" eager /> : <WorkPhoto image={project.image} alt={project.label} />}
        </div>}
        {project.introduction || project.fabric || project.problem || project.treatment || project.result ? <section className={styles.story} aria-label="About this appointment">
          {project.introduction ? <p>{project.introduction}</p> : null}
          {project.fabric ? <p><strong>Material:</strong> {project.fabric}</p> : null}
          {[["Before cleaning",project.problem],["The work",project.treatment],["The result",project.result]].map(([title,body]) => body ? <div key={title}><h2>{title}</h2><p>{body}</p></div> : null)}
        </section> : null}
        <div className={styles.media}>
          {additionalMedia.map(item => <div key={item.id} data-project-media={item.type}>
            {item.type === "photo" ? <WorkPhoto image={item.image} alt={item.alt} /> : item.type === "comparison" ? <ServiceResultCompare image={item.before} before={item.before} after={item.after} label={item.alt} variant="paired" /> : <WorkVideo item={item} />}
          </div>)}
        </div>
        {faqs.length ? <section className={styles.extra} aria-labelledby="project-faq">
          <h2 id="project-faq">{project.service} in {project.location}: common questions</h2>
          {faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </section> : null}
        {guides.length ? <section className={styles.extra} aria-labelledby="project-guides">
          <h2 id="project-guides">Helpful guides</h2>
          <ul>{guides.map(post => <li key={post.slug}><Link href={`/blog/${post.slug}/`}>{post.title}</Link></li>)}</ul>
        </section> : null}
        {moreWork.length ? <section className={styles.extra} aria-labelledby="project-more-work">
          <h2 id="project-more-work">More cleaning work in {project.location}</h2>
          <ul>{moreWork.map(item => <li key={item.id}><Link href={workProjectHref(item)}>{item.title}</Link></li>)}</ul>
        </section> : null}
        <div className={styles.services}>
          {serviceLinks.map(link => <Link key={link.href} href={link.href}>{link.label} →</Link>)}
          {services.filter(service => project.services.includes(service.slug)).map(service => <Link key={service.slug} href={`/services/${service.slug}/`}>{service.name} →</Link>)}
        </div>
      </article>
      <DirectoryFinalCta id="quote-cta" title="What would you like cleaned?" description="Tell us what needs attention. We confirm the price before booking." action={{href:quoteHref,label:"Get a Quote"}} image={leadVideo?.poster || "/images/home/softnest-sofa-living-room.webp"} imageAlt={leadVideo?.poster ? project.label : "Living room with a green sofa"} />
    </main>
    <SiteFooter quoteHref={quoteHref} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(crumbs)}} />
  </>;
}
