import Image from "next/image";
import Link from "next/link";
import { homeFaqs } from "@/data/homeFaqs";
import { getService } from "@/data/services";
import HomeResultsCarousel from "@/components/HomeResultsCarousel";
import HomeReviewsCarousel from "@/components/HomeReviewsCarousel";
import SocialMediaLinks from "@/components/SocialMediaLinks";

const homeServices = [
  "sofa-cleaning",
  "pet-stain-odour-removal",
  "sectional-furniture-cleaning",
  "carpet-area-rug-cleaning",
]
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<ReturnType<typeof getService>> => Boolean(service));

const galleryResults = [
  {
    image: "/img/sectional_3.webp",
    variant: "paired",
    category: "Sofa",
    location: "Mississauga, ON",
    service: "Pet stains & odour removal",
    label: "Compare sofa before and after cleaning",
  },
  {
    image: "/img/sectional_1.webp",
    variant: "paired",
    category: "Sectional Sofa",
    location: "Oakville, ON",
    service: "Deep cleaning",
    label: "Compare sectional sofa before and after cleaning",
  },
  {
    image: "/img/matress_cleaning.webp",
    variant: "paired",
    category: "Mattress",
    location: "Toronto, ON",
    service: "Stain & odour removal",
    label: "Compare mattress before and after cleaning",
  },
  {
    image: "/img/before_after_carpet_cleaning.webp",
    variant: "paired",
    category: "Carpet",
    location: "Brampton, ON",
    service: "Deep carpet cleaning",
    label: "Compare carpet before and after cleaning",
  },
  {
    image: "/img/gray_sofa_stain.png",
    variant: "paired",
    category: "Sofa",
    location: "GTA, ON",
    service: "Stain treatment",
    label: "Compare stained sofa before and after cleaning",
  },
  {
    image: "/img/dining_chairs.webp",
    variant: "paired",
    category: "Dining Chairs",
    location: "GTA, ON",
    service: "Upholstery cleaning",
    label: "Compare dining chairs before and after cleaning",
  },
  {
    image: "/img/sectional.png",
    variant: "paired",
    category: "Sectional",
    location: "GTA, ON",
    service: "Full sectional cleaning",
    label: "Compare sectional before and after cleaning",
  },
  {
    image: "/img/sectional_sofa.png",
    variant: "paired",
    category: "Sectional Sofa",
    location: "GTA, ON",
    service: "Deep fabric cleaning",
    label: "Compare sectional sofa before and after deep cleaning",
  },
] as const;

const homeReviews = [
  {
    name: "Kiko44",
    text: "Andrii’s upholstery deep cleaning was exceptional. he managed to completely remove stains in our fabric couch that had been there for years. He also cleaned 6 micro fiber dining chaises and made them look brand new. He is courteous, and thorough and I would use his services again. Highly recommend.",
  },
  {
    name: "Jeff A.",
    text: "It’s so refreshing to see a company that exceeds expectations. My carpets are over 15 years old with heavy traffic from my son and all his sports equipment. I thought for sure they were wasting their time trying to restore my carpets. But I was wrong. They brought them back to life. A lot of places are going to make a lot of promises this one delivers!! Great results and the friendliest people you will ever meet. 6 stars!!",
  },
  {
    name: "Julie Trakos",
    text: "Andrii and his son are incredible!!! They went above and beyond .. they are very very good and detailed. Left very comfortable with them. Would like to give them 10 out of 10 stars",
  },
  {
    name: "Ryan Wilson",
    text: "We had a pet urine issue on our couch and honestly didn’t think it could be cleaned this well. No smell, no stains — it honestly looks like a different couch. They showed up on time, explained what they were doing, and never rushed the job. You can tell they really care about the quality of their work. We’re very happy with the results and wouldn’t hesitate to call SoftNest Fabric Care again.",
  },
  { name: "Oleksandr Semenov", text: "Great service! I recommend it!" },
  {
    name: "Jamal PD",
    text: "Great service and fair price. Our sectional looks so much cleaner, and the team was friendly and professional. Paid $229 and couldn’t be happier. Thanks!",
  },
  {
    name: "Daniel Leblanc",
    text: "Honestly, my sofa and dining chairs were looking pretty tired, but Softnest Fabric Care completely refreshed them. They got out the stubborn stains and everything looks brand new again. If you’re on the fence about getting your furniture cleaned, just call them—you won’t regret it! Thanks again to the team!",
  },
] as const;

const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";

export default function HomeSections() {
  return (
<div className="home-sections">
  <section id="results" className="gallery-section-v2" aria-labelledby="gallery-heading">
    <Image className="gallery-leaves" src="/img/gallery-leaves.webp" alt="" aria-hidden="true" width={540} height={540} />
    <div className="gallery-intro">
      <div className="gallery-intro__copy">
        <p className="gallery-eyebrow">Real Results. Real Homes.</p>
        <h2 id="gallery-heading">Before &amp; After Results<br /><span>You Can See and Feel.</span></h2>
        <p className="gallery-description">From everyday messes to tough stains and odours,<br />see how we bring furniture and carpets back to life.</p>
      </div>
      <div className="gallery-intro__aside">
        <div className="gallery-social" aria-label="SoftNest social media">
          <p className="gallery-social__heading">Follow SoftNest</p>
          <SocialMediaLinks variant="gallery" />
        </div>
        <ul className="gallery-proofs" aria-label="SoftNest service assurances">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" /><path d="m9 12 2 2 4-4" /></svg>
            <span>Careful, Thorough<br />Service</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 5-1 11-7 12m-1 6c0-3 1-7 5-10" /></svg>
            <span>Fabric-Appropriate<br />Products</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
            <span>Professional<br />Equipment</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="gallery-stage">
      <span className="gallery-stage__down" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="m7 9 5 5 5-5" /></svg>
      </span>
      <HomeResultsCarousel results={galleryResults} />
      <a className="gallery-more" href="#reviews">View More Results <span>→</span></a>
      <span className="gallery-sparkle" aria-hidden="true">✧</span>
    </div>
  </section>
  {/* SECTION 2: SERVICES */}
  <section id="services" className="py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-2">What We Clean</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight">Our Cleaning Services</h2>
        <p className="home-services-intro">Explore what each service includes, how the process works and the results you can realistically expect.</p>
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
              <b>Learn more <span aria-hidden="true">→</span></b>
            </span>
          </Link>
        ))}
      </div>
      <div className="home-services-all">
        <Link href="/services/">View all cleaning services <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  </section>
  {/* SECTION 3: WHY HOMEOWNERS CHOOSE SOFTNEST */}
  <section id="why-softnest" className="why-softnest-section py-16 px-[6%] bg-creamLight/40 border-b border-forestGreen/5">
    <div className="why-softnest-layout max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="why-softnest-intro lg:col-span-4">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">Why Homeowners Choose SoftNest</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">Quality You Can See.<br />Care You Can Trust.</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-6 max-w-sm">We go beyond surface cleaning. Every detail matters because your home and furniture deserve the best.</p>
        <Link href="/about/" className="inline-flex items-center justify-center px-6 h-11 bg-forestGreen text-white font-serif font-bold text-xs uppercase tracking-wider hover:bg-mossGreen transition-colors no-underline">Learn More About Us</Link>
      </div>
      <div className="why-softnest-benefits lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-forestGreen/10">
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M8.5 12.2l2.2 2.2 4.8-5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">Fully Insured</h3>
          <p className="text-sm text-stone-600 leading-relaxed">Your furniture and home are protected with full liability insurance.</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">Local &amp; Family-Run</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We&apos;re a small local team serving communities across the GTA with care.</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={8} r={5} /><path d="M8 13l-2 8 6-3 6 3-2-8" /><path d="M9.5 8l1.7 1.7L15 6" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">Detail-Focused Care</h3>
          <p className="text-sm text-stone-600 leading-relaxed">Careful preparation, professional equipment, and attention to the material being cleaned.</p>
        </div>
        <div className="why-softnest-benefit px-6 py-6 text-center">
          <svg className="w-14 h-14 mx-auto mb-5 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={12} r={9} /><path d="M12 7v10" /><path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.8 3 2 3 .8 3 2-1.3 2-3 2c-1.5 0-2.5-.5-3-1.5" /></svg>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-3">Pay After Service</h3>
          <p className="text-sm text-stone-600 leading-relaxed">No upfront charges. Payment is collected after the cleaning service is complete.</p>
        </div>
      </div>
    </div>
  </section>
  {/* SECTION 4: CLEANING PROCESS */}
  <section id="trust" className="process-section py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto">
      <div className="process-section__header text-center mb-12">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-2">How It Works</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight">Our 4-Step Cleaning Process</h2>
      </div>
      <div className="process-steps">
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={10} cy={10} r={6} /><path d="M14.5 14.5L20 20" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">1</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">Inspection</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We check the fabric, identify stains and problem areas, and choose the best cleaning approach.</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={7} cy={14} r={4} /><circle cx={15} cy={8} r={3} /><circle cx={17} cy={16} r={2} /><circle cx={8} cy={6} r="1.5" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">2</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">Pre-Treat &amp; Loosen</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We apply professional pre-treatments and agitate the fabric to break down dirt, oils, and stains.</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 20V7a4 4 0 018 0v13" /><path d="M5 20h8" /><circle cx={17} cy={17} r={3} /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">3</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">Deep Clean &amp; Extract</h3>
          <p className="text-sm text-stone-600 leading-relaxed">Hot water extraction lifts embedded soil, residue, and suitable odour sources for a thorough clean.</p>
        </div>
        <div className="process-step">
          <div className="process-step__icon w-20 h-20 mx-auto mb-5 rounded-full bg-creamLight flex items-center justify-center text-forestGreen"><svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={12} r={3} /><path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2" /></svg></div>
          <span className="process-step__marker inline-flex w-8 h-8 items-center justify-center rounded-full bg-forestGreen text-white font-serif font-bold text-xs">4</span>
          <h3 className="font-serif font-bold text-forestGreen text-base mb-2">Final Groom &amp; Dry</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We groom the fabric, set the nap, and speed up drying so your furniture looks fresh.</p>
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
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">Healthier Home. Happier Family.</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">A Deeper Clean for the People<br />and Pets You Love</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-8">Our cleaning process lifts embedded soil, dust, dander, and suitable odour sources from cleanable upholstery fibres for a fresher home.</p>
        <div className="home-benefits">
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 4c-8.2.5-13.5 5-14.6 11.6" /><path d="M20 4c.5 8.2-4.1 13.1-11.7 13.8" /><path d="M4 20c3.2-5.6 7-8.9 12-11" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">Fabric-Appropriate Products</h3><p className="text-xs text-stone-600 leading-relaxed">Products are selected for the material and used according to the cleaning process.</p></div>
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 4c2 3 0 5 0 8" /><path d="M12 4c2 3 0 5 0 8" /><path d="M17 4c2 3 0 5 0 8" /><path d="M5 18h14" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">Odour Treatment</h3><p className="text-xs text-stone-600 leading-relaxed">Targets suitable odour sources rather than simply covering them with fragrance.</p></div>
          <div className="home-benefit"><svg className="w-9 h-9 text-forestGreen mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M12 8v8M8 12h8" /></svg><h3 className="font-serif font-bold text-forestGreen text-sm mb-1">Embedded Soil Removal</h3><p className="text-xs text-stone-600 leading-relaxed">Helps lift dust, dander, and everyday buildup from cleanable fibres.</p></div>
        </div>
      </div>
    </div>
  </section>
  {/* SECTION 6: CLIENT REVIEWS (static, manually copied from Google) */}
  <section id="reviews" className="py-16 px-[6%] bg-white border-b border-forestGreen/5">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-3">
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">Client Reviews</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-5">What Our Clients<br />Are Saying</h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-6">Real feedback from homeowners across the GTA.</p>
        <a href="https://maps.app.goo.gl/XHFbygUj49Suv9F48" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 h-11 bg-forestGreen text-white font-serif font-bold text-xs uppercase tracking-wider hover:bg-mossGreen transition-colors no-underline">See All Reviews on Google Maps</a>
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
        <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">FAQ</span>
        <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight mb-6">Frequently Asked Questions</h2>
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
          <h3 className="font-serif font-bold text-forestGreen text-base uppercase mb-4">Professional Equipment.<br />Superior Results.</h3>
          <p className="text-sm text-stone-700 leading-relaxed mb-5">We use commercial-grade equipment and proven techniques to deliver a deeper, longer-lasting clean.</p>
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
          <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-3">About SoftNest</span>
          <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight leading-tight mb-4">Careful Upholstery Cleaning,<br />Done with Standards</h2>
          <p className="text-sm text-stone-700 leading-relaxed max-w-2xl mb-4">SoftNest was built around a simple belief: quality should always come first. Every sofa, sectional, chair, and rug is treated with the same care we would expect in our own homes.</p>
          <p className="text-sm text-stone-700 leading-relaxed max-w-2xl mb-6">From fabric-safe products to professional equipment and careful technique, our goal is to deliver visible results you can trust without rushing the work.</p>
          <div className="about-stats grid grid-cols-2 md:grid-cols-4 divide-x divide-forestGreen/10 border-t border-forestGreen/10 pt-7">
            <div className="about-stat px-4 first:pl-0 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l7 3v5c0 4.9-2.9 8.2-7 10-4.1-1.8-7-5.1-7-10V6l7-3z" /><path d="M8.5 12.2l2.2 2.2 4.8-5" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">100%</div>
              <p className="text-xs text-stone-600 leading-relaxed">Satisfaction Focused</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx={12} cy={8} r={5} /><path d="M8 13l-2 8 6-3 6 3-2-8" /><path d="M9.5 8l1.7 1.7L15 6" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">Pro</div>
              <p className="text-xs text-stone-600 leading-relaxed">Equipment &amp; Technique</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">Local</div>
              <p className="text-xs text-stone-600 leading-relaxed">Across the GTA</p>
            </div>
            <div className="about-stat px-4 text-center">
              <svg className="w-11 h-11 mx-auto mb-3 text-forestGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
              <div className="font-serif font-bold text-forestGreen text-xl">Care</div>
              <p className="text-xs text-stone-600 leading-relaxed">For Your Home</p>
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
        <div><h2 className="font-serif font-bold text-3xl mb-2">Ready for a Fresher, Cleaner Home?</h2><p className="text-creamLight/80">Get a free quote today and experience the SoftNest difference.</p></div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <a href="/quote/" className="quote-cta quote-cta--light inline-flex items-center justify-center px-12 h-12 bg-white text-forestGreen font-serif font-bold text-xs uppercase tracking-wider no-underline">Get Your Free Quote</a>
        <a href="tel:+14167270287" className="font-serif font-bold text-xl text-white no-underline">(416) 727-0287</a>
      </div>
    </div>
  </section>
</div>

  );
}
