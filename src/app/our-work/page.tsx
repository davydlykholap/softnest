import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroActionButtons from "@/components/HeroActionButtons";
import WorkGallery from "@/components/WorkGallery";
import WorkAreaLinks from "@/components/WorkAreaLinks";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import { getWorkProjects } from "@/content/work";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { absoluteUrl, organizationId } from "@/lib/site";
import styles from "./page.module.css";
import "@/app/styles/location-page.css";

export const metadata = pageMetadata({
  title: "Our Work | Before & After Cleaning Results | SoftNest",
  description: "Explore documented SoftNest cleaning projects, with clear before-and-after photo context. Browse completed appointments by service and city.",
  path: "/our-work/",
});

export default function OurWorkPage() {
  const projects = getWorkProjects();
  const galleryServices = services.filter((service) => projects.some((project) => project.services.includes(service.slug)))
    .map(({ slug, name }) => ({ slug, name }));
  const galleryLocations = locations.filter((location) => projects.some((project) => project.locations.includes(location.slug)))
    .map(({ slug, name }) => ({ slug, name }));
  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl("/our-work/#collection"),
    name: "SoftNest before and after cleaning results", url: absoluteUrl("/our-work/"),
    about: { "@id": organizationId },
    mainEntity: { "@type": "ItemList", itemListElement: projects.map((project, index) => ({
      "@type": "ListItem", position: index + 1, url: absoluteUrl(`/our-work/#${project.id}`),
      item: { "@type": "ImageObject", contentUrl: absoluteUrl(project.image), caption: project.label, description: project.imageNote || project.label },
    })) },
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Our Work", item: absoluteUrl("/our-work/") },
  ] };

  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" /></div>
    <main className={`location-page-page ${styles.page}`}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <h1>Before &amp; after<br /><span>cleaning results.</span></h1>
          <div>
            <p>Browse documented customer cleaning projects. Any AI-reconstructed view is disclosed beside the photo. Select a city to see its actual jobs.</p>
            <HeroActionButtons primaryTone="gold" showReviews={false} />
          </div>
        </header>
        <WorkAreaLinks />
        <WorkGallery projects={projects} services={galleryServices} locations={galleryLocations} />
        <section className={styles.note} aria-labelledby="your-results-heading">
          <h2>What about your furniture?</h2>
          <p>Results depend on the material, condition and type of stain. Tell us what you want cleaned and we can discuss what may improve. Find your <Link href="/services/">cleaning service</Link> or check our <Link href="/location/">service areas</Link>.</p>
        </section>
      </div>
      <DirectoryFinalCta id="quote-cta" title="Ask about your cleaning." description="Call, text or use the form. Photos are optional, and we confirm a tax-inclusive price before booking." action={{ href: "/quote/", label: "Get a Quote" }} image="/images/softnest-hero-room.webp" imageAlt="Bright living room with a green sofa" />
    </main>
    <SiteFooter />
    {[schema, crumbs].map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(item) }} />)}
  </>;
}
