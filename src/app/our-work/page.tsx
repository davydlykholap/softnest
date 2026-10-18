import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkCityRail from "@/components/WorkCityRail";
import WorkProjectCard from "@/components/WorkProjectCard";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import { getWorkProjects, workPageCopy } from "@/content/work";
import { locations } from "@/content/locations";
import { workProjectHref } from "@/lib/workUrls";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { absoluteUrl, organizationId } from "@/lib/site";
import styles from "./page.module.css";
import "@/app/styles/location-page.css";

export const metadata = pageMetadata({ title:"Our Work | Cleaning Projects by City | SoftNest", description:"Explore SoftNest upholstery and carpet cleaning projects by city. Open an appointment to see its photos, videos and cleaning story.", path:"/our-work/" });

export default function OurWorkPage() {
  const projects = getWorkProjects();
  const groups = locations.map(city => ({ city, projects: projects.filter(project => project.locations.includes(city.slug)).slice(0, 6) }))
    .sort((a,b) => Number(b.projects.length > 0) - Number(a.projects.length > 0));
  const schema = { "@context":"https://schema.org", "@type":"CollectionPage", "@id":absoluteUrl("/our-work/#collection"), name:"SoftNest cleaning projects by city", url:absoluteUrl("/our-work/"), about:{ "@id":organizationId }, mainEntity:{ "@type":"ItemList", itemListElement:groups.flatMap(group => group.projects).map((project,index) => ({ "@type":"ListItem", position:index+1, url:absoluteUrl(workProjectHref(project)), name:project.title })) } };
  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" /></div>
    <main id="main-content" className={`location-page-page ${styles.page}`}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <div><h1>{workPageCopy.heading} <span>{workPageCopy.headingAccent}</span></h1><p>{workPageCopy.description}</p></div>
        </header>
        {groups.map(({city,projects:preview},groupIndex) => <section key={city.slug} className={styles.citySection} data-work-city={city.slug} aria-labelledby={`work-${city.slug}-heading`}>
          <div className={styles.cityHeading}><h2 id={`work-${city.slug}-heading`}>{city.name}</h2><Link href={`/our-work/${city.slug}/`}>View all {city.name} projects →</Link></div>
          {preview.length ? <WorkCityRail city={city.slug} count={preview.length}>{preview.map((project,index) => <WorkProjectCard key={project.id} project={project} eager={groupIndex === 0 && index < 3} />)}</WorkCityRail>
            : <div className={styles.cityEmpty}><p>{workPageCopy.emptyCityDescription.replaceAll("{{city}}",city.name)}</p></div>}
        </section>)}
        {!groups.length ? <p className={styles.emptyCity}>New cleaning projects are coming. <Link href="/services/">Explore our services.</Link></p> : null}
      </div>
      <DirectoryFinalCta id="quote-cta" title="Ask about your cleaning." description="Tell us what needs attention. We confirm the price before booking." action={{href:"/quote/",label:"Get a Quote"}} image="/images/softnest-hero-room.webp" imageAlt="Bright living room with a green sofa" />
    </main>
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}} />
  </>;
}
