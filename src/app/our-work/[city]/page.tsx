import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkGallery from "@/components/WorkGallery";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import { getWorkProjects, workPageCopy } from "@/content/work";
import { getLocation, locations } from "@/content/locations";
import { services } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { absoluteUrl, organizationId } from "@/lib/site";
import { workProjectHref } from "@/lib/workUrls";
import styles from "../page.module.css";
import "@/app/styles/location-page.css";

type Props = { params: Promise<{ city: string }> };
export function generateStaticParams() { return locations.map(({ slug }) => ({ city: slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) return {};
  const projects = getWorkProjects({ city });
  return pageMetadata({
    title: "Cleaning Results in " + location.name + " | Our Work | SoftNest",
    description: projects.length
      ? "Browse documented SoftNest upholstery and carpet cleaning work in " + location.name + ". View the photos, their context and the services used."
      : "Explore SoftNest cleaning services in " + location.name + " and see when documented cleaning projects are added to our gallery.",
    path: "/our-work/" + location.slug + "/",
    image: projects[0]?.image,
    imageAlt: projects[0]?.label,
    index: location.indexInSearch && projects.length > 0,
  });
}

export default async function CityWorkPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();
  const projects = getWorkProjects({city});
  const availableServices = services.filter(service => projects.some(project => project.services.includes(service.slug)))
    .map(({ slug, name }) => ({ slug, name }));
  const url = "/our-work/" + location.slug + "/";
  const quoteHref = `/quote/?city=${encodeURIComponent(city)}`;
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": absoluteUrl(url + "#collection"), url: absoluteUrl(url),
    name: "Documented cleaning work in " + location.name,
    about: { "@id": organizationId },
    mainEntity: {
      "@type": "ItemList", numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem", position: index + 1,
        url: absoluteUrl(workProjectHref(project)),
        item: { "@type": "ImageObject", contentUrl: absoluteUrl(project.image),
          caption: project.label, description: project.imageNote || project.label },
      })),
    },
  };
  const crumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Our Work", item: absoluteUrl("/our-work/") },
      { "@type": "ListItem", position: 3, name: location.name, item: absoluteUrl(url) },
    ],
  };
  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" quoteHref={quoteHref} /></div>
    <main id="main-content" className={"location-page-page " + styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href={`/our-work/#work-${city}-heading`}>← Back to Our Work</Link>
        <header className={styles.intro}>
          <div>
            <h1>Our Work<br /><span>in {location.name}.</span></h1>
            {projects.length ? <p>{workPageCopy.cityDescription.replaceAll("{{city}}",location.name)}</p> : null}
          </div>
        </header>
        {projects.length ? (
          <WorkGallery projects={projects} services={availableServices} city={city} />
        ) : (
          <section className={styles.cityEmpty} aria-label={`${location.name} projects`}>
            <p>{workPageCopy.emptyCityDescription.replaceAll("{{city}}",location.name)}</p>
          </section>
        )}
      </div>
      <DirectoryFinalCta id="quote-cta" title={"Ask about cleaning in " + location.name + "."} description="Tell us about the material and condition. Photos are optional, and we confirm the price before booking." action={{ href: "/quote/?city=" + encodeURIComponent(city), label: "Get a Quote" }} image="/images/softnest-hero-room.webp" imageAlt="Living room with a green sofa" />
    </main>
    <SiteFooter quoteHref={quoteHref} />
    {projects.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /> : null}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
  </>;
}
