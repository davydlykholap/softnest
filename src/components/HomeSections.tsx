import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent, getProjects } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import { homeFaqs } from "@/content/homeFaqs";
import { getService } from "@/content/services";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import HomeResultsCarousel from "@/components/HomeResultsCarousel";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import HomeVideoShowcase from "@/components/HomeVideoShowcase";

const homeServices = homeContent.featuredServices.map(getService).filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

const galleryResults = getProjects();

export default function HomeSections() {
  return (
<div className="home-sections">
  <section id="results" className="gallery-section-v2" aria-labelledby="gallery-heading">
    <div className="gallery-intro">
      <div className="gallery-intro__copy">
        <p className="hero__eyebrow gallery-eyebrow">Real Homes. Real Results.</p>
        <span className="hero__eyebrow-line gallery-eyebrow-line" aria-hidden="true" />
        <h2 id="gallery-heading"><span className="gallery-heading__line gallery-heading__line--primary">See The</span>{" "}<span className="gallery-heading__line">Difference.</span></h2>
        <p className="gallery-description">Real before-and-after results from sofas and carpets cleaned across the GTA.</p>
      </div>
      <div className="gallery-intro__aside">
        <div className="gallery-social" aria-label="SoftNest social media">
          <p className="gallery-social__heading">{"" + pageText(homeContent.copy, "sections-28") + ""}</p>
          <SocialMediaLinks variant="gallery" />
        </div>
      </div>
    </div>
    <div className="gallery-stage">
      <HomeResultsCarousel results={galleryResults} />
    </div>
  </section>
  {/* SECTION 2: SERVICES */}
  <section id="services" className="home-services-section">
    <div className="home-section-inner">
      <div className="home-section-heading">
        <span className="home-section-kicker">{"" + pageText(homeContent.copy, "sections-36") + ""}</span>
        <span className="home-section-rule" aria-hidden="true" />
        <h2 className="home-section-title">{"" + pageText(homeContent.copy, "sections-37") + ""}</h2>
        <p className="home-services-intro">{"" + pageText(homeContent.copy, "sections-38") + ""}</p>
      </div>
      <div className="home-services-grid">
        {homeServices.map((service) => (
          <Link
            className="home-service-card"
            href={`/services/${service.slug}/`}
            key={service.slug}
            aria-label={`Learn about ${service.name.toLowerCase()}`}
          >
            <span className="home-service-card__image">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </span>
            <span className="home-service-card__body">
              <strong>{service.name}</strong>
              <span className="home-service-card__arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
  <HomeVideoShowcase />
  <HomeFaqExplorer items={homeFaqs} />
  <DirectoryFinalCta
    id="quote-cta"
    kicker="Professional care for every room"
    title={pageText(homeContent.copy, "sections-96")}
    description={pageText(homeContent.copy, "sections-97")}
    action={{ href: "/quote/", label: siteConfig.quoteLabel }}
    image="/images/softnest-hero-room.webp"
    imageAlt="Bright living room with a deep green sofa"
    className="site-final-cta"
  />
</div>

  );
}
