import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent, getProjects, getTestimonials } from "@/content/pages";
import Image from "next/image";
import Link from "next/link";
import { homeFaqs } from "@/content/homeFaqs";
import { getService } from "@/content/services";
import HomeResultsCarousel from "@/components/HomeResultsCarousel";
import HomeReviewsCarousel from "@/components/HomeReviewsCarousel";
import SocialMediaLinks from "@/components/SocialMediaLinks";

const homeServices = homeContent.featuredServices.map(getService).filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

const galleryResults = getProjects();

const homeReviews = getTestimonials();

const googleProfileUrl = siteConfig.googleProfileUrl;

export default function HomeSections() {
  return (
<div className="home-sections">
  <section id="results" className="gallery-section-v2" aria-labelledby="gallery-heading">
    <Image className="gallery-leaves" src="/img/gallery-leaves.webp" alt="" aria-hidden="true" width={540} height={540} />
    <div className="gallery-intro">
      <div className="gallery-intro__copy">
        <p className="gallery-eyebrow">{"" + pageText(homeContent.copy, "sections-23") + ""}</p>
        <h2 id="gallery-heading">{"" + pageText(homeContent.copy, "sections-24") + ""}<br /><span>{"" + pageText(homeContent.copy, "sections-25") + ""}</span></h2>
        <p className="gallery-description">{"" + pageText(homeContent.copy, "sections-26") + ""}<br />{"" + pageText(homeContent.copy, "sections-27") + ""}</p>
      </div>
      <div className="gallery-intro__aside">
        <div className="gallery-social" aria-label="SoftNest social media">
          <p className="gallery-social__heading">{"" + pageText(homeContent.copy, "sections-28") + ""}</p>
          <SocialMediaLinks variant="gallery" />
        </div>
        <ul className="gallery-proofs" aria-label="SoftNest service assurances">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" /><path d="m9 12 2 2 4-4" /></svg>
            <span>{"" + pageText(homeContent.copy, "sections-29") + ""}<br />{"" + pageText(homeContent.copy, "sections-30") + ""}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 5-1 11-7 12m-1 6c0-3 1-7 5-10" /></svg>
            <span>{"" + pageText(homeContent.copy, "sections-31") + ""}<br />{"" + pageText(homeContent.copy, "sections-32") + ""}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
            <span>{"" + pageText(homeContent.copy, "sections-33") + ""}<br />{"" + pageText(homeContent.copy, "sections-34") + ""}</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="gallery-stage">
      <span className="gallery-stage__down" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="m7 9 5 5 5-5" /></svg>
      </span>
      <HomeResultsCarousel results={galleryResults} />
      <a className="gallery-more" href="#reviews">{"" + pageText(homeContent.copy, "sections-35") + " "}<span>→</span></a>
      <span className="gallery-sparkle" aria-hidden="true">✧</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {homeServices.map((service) => (
          <Link
            className="home-service-card bg-creamLight/60 border border-forestGreen/10 shadow-sm overflow-hidden"
            href={`/services/${service.slug}/`}
            key={service.slug}
            aria-label={`Learn about ${service.name.toLowerCase()}`}
          >
            <span className="home-service-card__image relative h-44 bg-stone-100 overflow-visible">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <span className="service-icon-badge absolute -bottom-6 left-5 z-10 w-12 h-12 rounded-full bg-forestGreen text-white flex items-center justify-center border-4 border-white shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12h16v7H4z" />
                  <path d="M6 12V9c0-2 1.5-3 3-3h6c1.5 0 3 1 3 3v3" />
                  <path d="M7 19v2M17 19v2" />
                </svg>
              </span>
            </span>
            <span className="home-service-card__body pt-9 p-5">
              <strong className="font-serif font-bold text-forestGreen text-base mb-2">{service.name}</strong>
              <span className="text-sm text-stone-600 leading-relaxed">{service.summary}</span>
              <b>{"" + pageText(homeContent.copy, "sections-39") + " "}<span aria-hidden="true">→</span></b>
            </span>
          </Link>
        ))}
      </div>
      <div className="home-services-all">
        <Link href="/services/">{"" + pageText(homeContent.copy, "sections-40") + " "}<span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </section>
  {/* SECTION 3: WHY HOMEOWNERS CHOOSE SOFTNEST */}
  <section id="why-softnest" className="why-softnest-section py-16 px-[6%] bg-creamLight/40 border-b border-forestGreen/5">
    <div className="why-softnest-layout max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="why-softnest-intro lg:col-span-4">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-41") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">{"" + pageText(homeContent.copy, "sections-42") + ""}<br />{"" + pageText(homeContent.copy, "sections-43") + ""}</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-6 max-w-sm">{"" + pageText(homeContent.copy, "sections-44") + ""}</p>
        <Link href="/about/" className="inline-flex items-center justify-center px-6 h-11 bg-forestGreen text-white font-serif font-bold text-xs uppercase tracking-wider hover:bg-mossGreen transition-colors no-underline">{"" + pageText(homeContent.copy, "sections-45") + ""}</Link>
      </div>
      <div className="why-softnest-benefits lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-forestGreen/10">
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M8.5 12.2l2.2 2.2 4.8-5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">{"" + pageText(homeContent.copy, "sections-46") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-47") + ""}</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">{"" + pageText(homeContent.copy, "sections-48") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-49") + ""}</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={8} r={5} /><path d="M8 13l-2 8 6-3 6 3-2-8" /><path d="M9.5 8l1.7 1.7L15 6" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">{"" + pageText(homeContent.copy, "sections-50") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-51") + ""}</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={12} r={9} /><path d="M12 7v10" /><path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.8 3 2 3 .8 3 2-1.3 2-3 2c-1.5 0-2.5-.5-3-1.5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">{"" + pageText(homeContent.copy, "sections-52") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-53") + ""}</p>
        </div>
      </div>
    </div>
  </section>
  {/* SECTION 4: CLEANING PROCESS */}
  <section id="trust" className="process-section py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto">
      <div className="process-section__header text-center mb-12">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-2">{"" + pageText(homeContent.copy, "sections-54") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight">{"" + pageText(homeContent.copy, "sections-55") + ""}</h2>
      </div>
      <div className="process-steps">
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={10} cy={10} r={6} /><path d="M14.5 14.5L20 20" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">1</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">{"" + pageText(homeContent.copy, "sections-56") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-57") + ""}</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={7} cy={14} r={4} /><circle cx={15} cy={8} r={3} /><circle cx={17} cy={16} r={2} /><circle cx={8} cy={6} r="1.5" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">2</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">{"" + pageText(homeContent.copy, "sections-58") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-59") + ""}</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 20V7a4 4 0 018 0v13" /><path d="M5 20h8" /><circle cx={17} cy={17} r={3} /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">3</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">{"" + pageText(homeContent.copy, "sections-60") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-61") + ""}</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={12} r={3} /><path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">4</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">{"" + pageText(homeContent.copy, "sections-62") + ""}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-63") + ""}</p>
        </div>
      </div>
    </div>
  </section>
  {/* SECTION 5: HEALTHIER HOME */}
  <section className="health-section">
    <div className="health-inner">
      <div className="health-visual">
        <Image src="/img/health.webp" alt="" aria-hidden="true" width={1200} height={900} sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className="health-copy">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-64") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">{"" + pageText(homeContent.copy, "sections-65") + ""}<br />{"" + pageText(homeContent.copy, "sections-66") + ""}</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-8">{"" + pageText(homeContent.copy, "sections-67") + ""}</p>
        <div className="home-benefits">
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 4c-8.2.5-13.5 5-14.6 11.6" /><path d="M20 4c.5 8.2-4.1 13.1-11.7 13.8" /><path d="M4 20c3.2-5.6 7-8.9 12-11" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">{"" + pageText(homeContent.copy, "sections-68") + ""}</h3><p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-69") + ""}</p></div>
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 4c2 3 0 5 0 8" /><path d="M12 4c2 3 0 5 0 8" /><path d="M17 4c2 3 0 5 0 8" /><path d="M5 18h14" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">{"" + pageText(homeContent.copy, "sections-70") + ""}</h3><p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-71") + ""}</p></div>
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M12 8v8M8 12h8" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">{"" + pageText(homeContent.copy, "sections-72") + ""}</h3><p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-73") + ""}</p></div>
        </div>
      </div>
    </div>
  </section>
  {/* SECTION 6: CLIENT REVIEWS (static, manually copied from Google) */}
  <section id="reviews" className="py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-3">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-74") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">{"" + pageText(homeContent.copy, "sections-75") + ""}<br />{"" + pageText(homeContent.copy, "sections-76") + ""}</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-6">{"" + pageText(homeContent.copy, "sections-77") + ""}</p>
        <a href={siteConfig.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 h-11 bg-forestGreen text-white font-serif font-bold text-xs uppercase tracking-wider hover:bg-mossGreen transition-colors no-underline">{"" + pageText(homeContent.copy, "sections-78") + ""}</a>
      </div>
      <div className="lg:col-span-9">
        <HomeReviewsCarousel reviews={homeReviews} googleProfileUrl={googleProfileUrl} />
      </div>
    </div>
  </section>
  {/* SECTION 7: FAQ AND EQUIPMENT */}
  <section id="faq" className="bg-creamLight/40 border-b border-forestGreen/5">
    <div className="faq-layout">
      <div className="faq-copy">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-79") + ""}</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight mb-6">{"" + pageText(homeContent.copy, "sections-80") + ""}</h2>
        <div id="faq-list" className="faq-list" role="list">
          {homeFaqs.map((item, index) => (
            <details
              className="faq-item"
              open={index === 0}
              key={item.question}
              role="listitem"
            >
              <summary className="faq-question">
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
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
  {/* SECTION 8: ABOUT SOFTNEST & MAP */}
  <section id="about" className="py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="about-visual lg:col-span-5">
          <Image src="/img/logo/logo1.webp" alt="SoftNest Fabric Care logo" width={860} height={520} sizes="(max-width: 900px) 88vw, 430px" />
        </div>
        <div className="lg:col-span-7">
          <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">{"" + pageText(homeContent.copy, "sections-84") + ""}</span>
          <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-4">{"" + pageText(homeContent.copy, "sections-85") + ""}<br />{"" + pageText(homeContent.copy, "sections-86") + ""}</h2>
          <p className="text-sm text-stone-700 leading-relaxed max-w-2xl mb-4">{"" + pageText(homeContent.copy, "sections-87") + ""}</p>
          <p className="text-sm text-stone-700 leading-relaxed max-w-2xl mb-6">{"" + pageText(homeContent.copy, "sections-88") + ""}</p>
          <div className="about-stats grid grid-cols-2 md:grid-cols-4 divide-x divide-forestGreen/10 border-t border-forestGreen/10 pt-7">
            <div className="about-stat px-4 first:pl-0 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M8.5 12.2l2.2 2.2 4.8-5" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">100%</div>
              <p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-89") + ""}</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={8} r={5} /><path d="M8 13l-2 8 6-3 6 3-2-8" /><path d="M9.5 8l1.7 1.7L15 6" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">{"" + pageText(homeContent.copy, "sections-90") + ""}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-91") + ""}</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">{"" + pageText(homeContent.copy, "sections-92") + ""}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-93") + ""}</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">{"" + pageText(homeContent.copy, "sections-94") + ""}</div>
              <p className="text-xs text-stone-600 leading-relaxed">{"" + pageText(homeContent.copy, "sections-95") + ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="softnest-map h-[330px] border border-forestGreen/10" aria-label="SoftNest service map focused on Toronto, Mississauga, Brampton, Vaughan, Markham, Etobicoke and Oakville">
        <iframe title="SoftNest service area map for Toronto, Mississauga, Brampton, Vaughan, Markham, Etobicoke and Oakville" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=43.66,-79.55&z=10&output=embed">
        </iframe>
        <div className="softnest-map__static-layer" aria-hidden="true" />
      </div>
    </div>
  </section>
  {/* SECTION 9: FINAL CTA */}
  <section id="quote-cta" className="px-[6%] py-12 bg-forestGreen text-white">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-6 text-center lg:text-left">
        <div className="hidden sm:flex w-20 h-20 rounded-full border border-white/40 items-center justify-center"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M8.5 12.2l2.2 2.2 4.8-5" /></svg></div>
        <div><h2 className="font-serif font-bold text-3xl mb-2">{"" + pageText(homeContent.copy, "sections-96") + ""}</h2><p className="text-creamLight/80">{"" + pageText(homeContent.copy, "sections-97") + ""}</p></div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <a href="/quote/" className="quote-cta quote-cta--light inline-flex items-center justify-center px-12 h-12 bg-white text-forestGreen font-serif font-bold text-xs uppercase tracking-wider no-underline">{"" + pageText(homeContent.copy, "sections-98") + ""}</a>
        <a href={siteConfig.phoneHref} className="font-serif font-bold text-xl text-white no-underline">{siteConfig.displayPhone}</a>
      </div>
    </div>
  </section>
</div>

  );
}
