import Image from "@/components/ResponsiveImage";
import Link from "next/link";
import HeroActionButtons from "@/components/HeroActionButtons";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LocalWorkEvidence from "@/components/LocalWorkEvidence";
import LocationReviews from "./LocationReviews";
import type { CityServicePageContent } from "@/content/cityServicePages";
import { absoluteUrl, organizationProvider } from "@/lib/site";
import { jsonLd } from "@/seo/structuredData";
import styles from "./CityServicePage.module.css";

export default function CityServicePage({ content }: { content: CityServicePageContent }) {
  const { location, service, profile, title, path, quoteHref, faqs } = content;
  const crumbs = [
    { name: "Home", path: "/" }, { name: "Service areas", path: "/location/" },
    { name: location.name, path: `/location/${location.slug}/` }, { name: profile.title, path },
  ];
  const schemas = [
    { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`,
      name: title, description: content.description, url: absoluteUrl(path), image: absoluteUrl(service.image),
      serviceType: service.serviceType, provider: organizationProvider(),
      areaServed: { "@type": "City", name: location.name } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => (
      { "@type": "ListItem", position: index + 1, name: crumb.name, item: absoluteUrl(crumb.path) }
    )) },
  ];
  const quoteButton = <HeroActionButtons quoteHref={quoteHref} quoteAriaLabel="Get a Quote" primaryTone="gold" showReviews={false} />;

  return <div className={styles.root}>
    <div className="new-hero-root location-page-header"><SiteHeader current="locations" quoteHref={quoteHref} /></div>
    <main className={`location-page-page ${styles.page}`}>
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="city-service-title">
          <div>
            <h1 id="city-service-title">{profile.title}{" "}<span>in {location.name}</span></h1>
            <p className={styles.lead}>{content.introduction}</p>
            <HeroActionButtons quoteHref={quoteHref} quoteAriaLabel="Get a Quote" primaryTone="gold" />
          </div>
          <div className={styles.photo}><Image src={service.image} alt={service.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 40vw" /></div>
        </section>
        <section className={styles.details} aria-labelledby="included-heading">
          <div>
            <h2 id="included-heading">What’s included</h2>
            <ul className={styles.included}>{content.included.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className={styles.pricing}><strong>How pricing works.</strong> {content.pricing}</p>
            <p>{content.localDetail}{content.reading ? <> {content.reading.before}<Link href={content.reading.href}>{content.reading.label}</Link>{content.reading.after}</> : null}</p>
          </div>
          <div className={styles.local}>
            <h2>Your {location.name} visit</h2>
            <p>{content.planning}</p>
            <p className={styles.coverage}>Coverage includes {location.neighbourhoods.slice(0, 4).join(", ")}. Send your postal code to confirm your appointment.</p>
          </div>
        </section>
        <section className={styles.questions} aria-labelledby="questions-heading">
          <h2 id="questions-heading">Before you book</h2>
          <div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </section>
      </div>
      <LocalWorkEvidence city={location.slug} cityName={location.name} service={service.slug} />
      <LocationReviews city={location.slug} cityName={location.name} service={service.slug} />
      <DirectoryFinalCta
        id="quote-cta"
        title="Get a cleaning quote."
        description="Call, text or use the form. Tell us what needs attention and we will discuss the work with you."
        action={{ href: quoteHref, label: "Get a quote" }}
        image="/images/softnest-hero-room.webp"
        imageAlt="Bright living room with a deep green sofa"
      />
      <div className={styles.mobileQuote} aria-label="Request your cleaning quote">{quoteButton}</div>
    </main>
    <SiteFooter quoteHref={quoteHref} />
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />)}
  </div>;
}
