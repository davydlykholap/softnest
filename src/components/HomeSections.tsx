import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent, getProjects } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import { homeFaqs } from "@/content/homeFaqs";
import { getService } from "@/content/services";
import { DirectoryFinalCta } from "@/components/DirectoryHubSections";
import HomeResultsCarousel from "@/components/HomeResultsCarousel";
import FaqAccordion from "@/components/FaqAccordion";
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
        <h2 id="gallery-heading"><span className="gallery-heading__line gallery-heading__line--primary">See What a Deep Clean</span><br /><span className="gallery-heading__line">Can Do.</span></h2>
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
  <section id="services" className="py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-2">{"" + pageText(homeContent.copy, "sections-36") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight">{"" + pageText(homeContent.copy, "sections-37") + ""}</h2>
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
              <span>{service.summary}</span>
              <b>{"" + pageText(homeContent.copy, "sections-39") + " "}<span aria-hidden="true">→</span></b>
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
  <HomeVideoShowcase />
  {/* SECTION 7: FAQ AND EQUIPMENT */}
  <section id="faq" className="bg-creamLight/40 border-b border-forestGreen/5">
    <div className="faq-layout">
      <div className="faq-copy">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-79") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight mb-6">{"" + pageText(homeContent.copy, "sections-80") + ""}</h2>
        <FaqAccordion
          className="faq-list"
          defaultOpenIndex={0}
          items={homeFaqs}
        />
      </div>
      <div className="faq-equipment">
        <Image src="/img/faq_machine.webp" alt="" aria-hidden="true" width={1200} height={900} sizes="(max-width: 900px) 100vw, 50vw" />
        <div className="faq-equipment__card">
          <h3 className="font-serif font-bold text-forestGreen text-base uppercase mb-4">{"" + pageText(homeContent.copy, "sections-81") + ""}<br />{"" + pageText(homeContent.copy, "sections-82") + ""}</h3>
          <p className="text-sm text-stone-700 leading-relaxed mb-5">{"" + pageText(homeContent.copy, "sections-83") + ""}</p>
          <div className="flex gap-3 text-forestGreen"><svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h16M6 20v-4h12v4M8 16v-5h8v5M10 11V7h4v4" /></svg><svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 20V7a4 4 0 018 0v13" /><circle cx={17} cy={17} r={3} /></svg></div>
        </div>
      </div>
    </div>
  </section>
  <DirectoryFinalCta
    id="quote-cta"
    kicker="Professional care for every room"
    title={pageText(homeContent.copy, "sections-96")}
    description={pageText(homeContent.copy, "sections-97")}
    action={{ href: "/quote/", label: siteConfig.quoteLabel }}
    image="/images/softnest-hero-room.webp"
    imageAlt="Bright living room with a deep green sofa"
    className="home-final-cta"
  />
</div>

  );
}
