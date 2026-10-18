import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroActionButtons from "@/components/HeroActionButtons";
import WorkGallery from "@/components/WorkGallery";
import WorkAreaLinks from "@/components/WorkAreaLinks";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import { getWorkProjects } from "@/content/work";
import { getLocation, locations } from "@/content/locations";
import { services } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { absoluteUrl, organizationId } from "@/lib/site";
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
  const projects = getWorkProjects({ city });
  const availableServices = services.filter(service => projects.some(project => project.services.includes(service.slug)))
    .map(({ slug, name }) => ({ slug, name }));
  const url = "/our-work/" + location.slug + "/";
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": absoluteUrl(url + "#collection"), url: absoluteUrl(url),
    name: "Documented cleaning work in " + location.name,
    about: { "@id": organizationId },
    mainEntity: {
      "@type": "ItemList", numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem", position: index + 1,
        url: absoluteUrl(url + "#" + project.id),
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
    <div className="new-hero-root location-page-header"><SiteHeader current="work" /></div>
    <main className={"location-page-page " + styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/our-work/">Our Work</Link><span aria-hidden="true"> / </span><span>{location.name}</span>
        </nav>
        <header className={styles.intro}>
          <h1>Cleaning work<br /><span>in {location.name}.</span></h1>
          <div>
            <p>See documented upholstery and carpet cleaning from {location.name}. We show original job photography and clearly explain when a comparison includes a reconstructed view.</p>
            <HeroActionButtons primaryTone="gold" showReviews={false} quoteHref={"/quote/?city=" + encodeURIComponent(city)} />
          </div>
        </header>
        <WorkAreaLinks activeCity={city} />
        {projects.length ? (
          <WorkGallery projects={projects} services={availableServices} locations={[]} />
        ) : (
          <section className={styles.emptyCity} aria-labelledby="no-city-work">
            <h2 id="no-city-work">More local photos are coming.</h2>
            <p>We haven’t published a documented cleaning project from {location.name} yet. We’d rather leave this gallery empty than show work from another city or an AI-generated example as a local appointment.</p>
            <p><Link href="/our-work/">See our documented work</Link> or visit our <Link href={"/location/" + city + "/"}>{location.name} cleaning services</Link> page.</p>
          </section>
        )}
        <section className={styles.note}>
          <h2>Cleaning in {location.name}?</h2>
          <p>Visit our <Link href={"/location/" + city + "/"}>{location.name} service area page</Link> for cleaning options and coverage. Every gallery project is assigned to its actual appointment location through our content studio.</p>
        </section>
      </div>
      <DirectoryFinalCta id="quote-cta" title={"Ask about cleaning in " + location.name + "."} description="Tell us about the material and condition. Photos are optional, and we confirm the price before booking." action={{ href: "/quote/?city=" + encodeURIComponent(city), label: "Get a Quote" }} image="/images/softnest-hero-room.webp" imageAlt="Living room with a green sofa" />
    </main>
    <SiteFooter />
    {projects.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /> : null}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
  </>;
}
