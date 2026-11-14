import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent } from "@/content/pages";
import { getWorkProjects } from "@/content/work";
import Link from "next/link";
import { homeFaqs } from "@/content/homeFaqs";
import { getService } from "@/content/services";
import { DirectoryCard, DirectoryFinalCta } from "@/components/DirectoryHubSections";
import WorkVideo from "@/components/WorkVideo";
import HomeFaqExplorer from "@/components/HomeFaqExplorer";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import HomeVideoShowcase from "@/components/HomeVideoShowcase";

const homeServices = homeContent.featuredServices.map(getService).filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

const oakvilleProject = getWorkProjects({ city: "oakville" })
  .find((project) => project.slug === "cream-sofa-and-loveseat-cleaning-oakville");
const oakvilleVideo = oakvilleProject?.media
  .find((item) => item.type === "video" && item.id === "e645c135d73a");

export default function HomeSections() {
  return (
<div className="home-sections">
  <section id="results" className="gallery-section-v2" aria-labelledby="gallery-heading">
    <div className="gallery-intro">
      <div className="gallery-intro__copy">
        <h2 id="gallery-heading"><span className="gallery-heading__line gallery-heading__line--primary">See The</span>{" "}<span className="gallery-heading__line">Difference.</span></h2>
        <p className="gallery-description">Take a closer look at the difference a professional cleaning can make.</p>
      </div>
      <div className="gallery-intro__aside">
        <div className="gallery-social" aria-label="SoftNest social media">
          <p className="gallery-social__heading">{"" + pageText(homeContent.copy, "sections-28") + ""}</p>
          <SocialMediaLinks variant="gallery" />
        </div>
      </div>
    </div>
    <div className="home-result-videos">
      {oakvilleVideo?.type === "video" ? <article>
        <h3>Cream Sofa &amp; Loveseat Cleaning · Oakville</h3>
        <WorkVideo item={oakvilleVideo} showTitle={false} />
      </article> : null}
      <article>
        <h3>Carpet Cleaning</h3>
        <WorkVideo item={{
          id: "carpet-cleaning-demo",
          type: "video",
          title: "SoftNest carpet extraction demonstration",
          video: "/videos/carpet-cleaning-demo.mp4",
          poster: "/videos/carpet-cleaning-demo.jpg",
          transcript: "A technician passes a carpet extraction wand across the carpet, leaving a lighter strip alongside the area ahead of the wand.",
        }} showTitle={false} />
      </article>
    </div>
    <p className="home-result-videos-link"><Link href="/our-work/">View more results →</Link></p>
  </section>
  {/* SECTION 2: SERVICES */}
  <section id="services" className="home-services-section">
    <div className="home-section-inner">
      <div className="home-section-heading">
        <span className="home-section-rule" aria-hidden="true" />
        <h2 className="home-section-title">{"" + pageText(homeContent.copy, "sections-37") + ""}</h2>
        <p className="home-services-intro">{"" + pageText(homeContent.copy, "sections-38") + ""}</p>
      </div>
      <div className="home-services-grid">
        {homeServices.map((service) => (
          <DirectoryCard
            href={`/services/${service.slug}/`}
            image={service.image}
            imageAlt={service.imageAlt}
            title={service.shortName}
            ariaLabel={`Learn about ${service.name.toLowerCase()}`}
            className="locations-city-card--location home-service-card"
            key={service.slug}
          />
        ))}
      </div>
    </div>
  </section>
  <HomeVideoShowcase />
  <HomeFaqExplorer items={homeFaqs} />
  <DirectoryFinalCta
    id="quote-cta"
    title={pageText(homeContent.copy, "sections-96")}
    description={pageText(homeContent.copy, "sections-97")}
    action={{ href: "/quote/", label: siteConfig.quoteLabel }}
    image="/images/home/softnest-sofa-living-room.webp"
    imageAlt="Bright living room with a deep green sofa"
    className="site-final-cta"
  />
</div>

  );
}
