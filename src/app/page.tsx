import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleDollarSign,
  Droplets,
  Heart,
  Home as HomeIcon,
  Leaf,
  MapPin,
  Medal,
  PawPrint,
  Phone,
  Search,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
  Sun,
  Wind,
} from "lucide-react";
import CompareSlider from "@/components/CompareSlider";
import Header from "@/components/Header";

const googleReviews =
  "https://www.google.com/maps/place/SoftNest+Fabric+Care/";

const services = [
  {
    title: "Sofa & Couch Cleaning",
    description:
      "Remove dirt, body oils, stains, and everyday buildup from sofas, couches, and upholstered furniture.",
    image: "/img/sofa_cleaning.png",
    icon: Sofa,
  },
  {
    title: "Pet Stain & Odour Removal",
    description:
      "Treat pet accidents, odours, and stubborn stains safely and effectively.",
    image: "/img/pet_stain.jpg",
    icon: PawPrint,
  },
  {
    title: "Sectional & Furniture Cleaning",
    description:
      "Professional cleaning for sectionals, armchairs, recliners, ottomans, and other upholstered furniture.",
    image: "/img/sectional_furniture.png",
    icon: HomeIcon,
  },
  {
    title: "Carpet & Area Rug Cleaning",
    description:
      "Deep clean carpets and area rugs—removing embedded dirt, allergens, and stains without harsh soaking.",
    image: "/img/rug_2.png",
    icon: Sparkles,
  },
];

const trustPoints = [
  {
    title: "Fully Insured",
    description:
      "Your furniture and home are protected with full liability insurance.",
    icon: ShieldCheck,
  },
  {
    title: "Local & Family-Run",
    description:
      "We’re a small local team serving Mississauga and the GTA with care.",
    icon: HomeIcon,
  },
  {
    title: "Vetted Technicians",
    description:
      "Background-checked, trained, and experienced upholstery specialists.",
    icon: Medal,
  },
  {
    title: "Pay After Service",
    description:
      "No upfront charges. You only pay when you’re completely satisfied.",
    icon: CircleDollarSign,
  },
];

const process = [
  {
    title: "Inspection",
    description:
      "We check the fabric, identify stains and problem areas, and choose the best cleaning approach.",
    icon: Search,
  },
  {
    title: "Pre-Treat & Loosen",
    description:
      "We apply professional pre-treatments and agitate the fabric to break down dirt, oils, and stains.",
    icon: Droplets,
  },
  {
    title: "Deep Clean & Extract",
    description:
      "Hot water extraction removes deep-down dirt, allergens, and odours for a thorough clean.",
    icon: SprayCan,
  },
  {
    title: "Final Groom & Dry",
    description:
      "We groom the fabric, set the nap, and speed up drying so your furniture looks fresh.",
    icon: Sun,
  },
];

const reviews = [
  {
    name: "Kiko44",
    text: "Andrii’s upholstery deep cleaning was exceptional. He completely removed stains in our fabric couch that had been there for years and made six dining chairs look brand new.",
  },
  {
    name: "Jeff A.",
    text: "They brought our 15-year-old carpets back to life. This company delivers—great results and the friendliest people you will ever meet.",
  },
  {
    name: "Julie Trakos",
    text: "Andrii and his son are incredible. They went above and beyond, were very detailed, and made us feel completely comfortable.",
  },
  {
    name: "Ryan Wilson",
    text: "No smell, no stains—it honestly looks like a different couch. They showed up on time, explained everything, and never rushed the job.",
  },
];

const faqs = [
  {
    question: "Do you guarantee that every stain will be removed?",
    answer:
      "Many everyday stains lift well, but heat-set stains, dye transfer, fading, or deep contamination may be permanent. We inspect first and explain what is realistic before we start.",
  },
  {
    question: "Are your cleaning products safe for kids and pets?",
    answer:
      "Yes. We use fabric-appropriate, non-toxic, pH-balanced products. Once the furniture is dry, it is ready for normal family use.",
  },
  {
    question: "How often should I have my upholstery cleaned?",
    answer:
      "Most homes benefit every 12 to 18 months. With pets, kids, allergies, or heavy use, every 6 to 12 months is often better.",
  },
  {
    question: "How long does it take for upholstery to dry?",
    answer:
      "Most sofas take 1 to 2 hours to clean and usually dry within 2 to 4 hours, depending on fabric, airflow, and soil level.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We serve Mississauga, Oakville, Brampton, Etobicoke, and nearby GTA communities. If you are unsure, call or message us to confirm.",
  },
  {
    question: "Can you remove old pet urine stains and odours?",
    answer:
      "Often, yes. Older urine may reach foam or backing, which can limit results. We use enzyme treatment and give an honest assessment first.",
  },
  {
    question: "How should I prepare before your visit?",
    answer:
      "Please remove throws, small cushions, and fragile items nearby. No pre-treating is needed—just point out stains, odours, or concerns when we arrive.",
  },
];

const gallery = [
  ["/img/sectional.png", "Before and after sectional cleaning"],
  ["/img/gray_sofa_stain.png", "Before and after sofa stain removal"],
  ["/img/dining_chairs.png", "Before and after dining chair cleaning"],
  ["/img/before_after_carpet_cleaning.png", "Before and after carpet cleaning"],
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="site-shell">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__photo" aria-hidden="true" />
          <div className="hero__wash" aria-hidden="true" />

          <div className="hero__content">
            <p className="hero__eyebrow">Serving Mississauga &amp; the GTA</p>
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <h1 id="hero-heading" className="hero__title">
              Expert Care For
              <br />
              Your Furniture
              <br />
              &amp; Carpets.
              <span>Results You&apos;ll Feel.</span>
            </h1>
            <p className="hero__description">
              Professional equipment, fabric-safe products, and meticulous
              techniques restore your home&apos;s comfort. From deep sofa
              cleaning to delicate rug care.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#quote">
                Get an instant estimate
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button--secondary" href="#reviews">
                <span className="google-g" aria-hidden="true">G</span>
                See our reviews
              </a>
            </div>
            <ul className="hero__benefits" aria-label="Service benefits">
              <li><Leaf aria-hidden="true" /><span>Eco-friendly products</span></li>
              <li><ShieldCheck aria-hidden="true" /><span>Safe for kids &amp; pets</span></li>
              <li><BadgeCheck aria-hidden="true" /><span>Satisfaction focused</span></li>
            </ul>
          </div>

          <div className="hero__trust-badge">
            <Check size={15} strokeWidth={3} aria-hidden="true" />
            Trusted &amp; local
          </div>
          <CompareSlider />
          <a className="hero__scroll legacy-hero-scroll" href="#results" aria-label="See our results">
            <ArrowDown size={22} aria-hidden="true" />
          </a>
        </section>

        <section className="legacy-section legacy-results" id="results">
          <div className="legacy-results__copy">
            <p className="legacy-kicker">Real results you can see</p>
            <h2>Before &amp; After<br />That Speak for Themselves</h2>
            <p>You might be surprised how much professional cleaning can restore.</p>
            <p>A deep clean often delivers results beyond what most people expect.</p>
            <a className="legacy-button" href="#reviews">View customer reviews</a>
          </div>
          <div className="legacy-gallery" aria-label="Recent cleaning results">
            {gallery.map(([src, alt], index) => (
              <figure className={index === 0 ? "legacy-gallery__featured" : ""} key={src}>
                <Image src={src} alt={alt} fill sizes={index === 0 ? "(max-width: 800px) 94vw, 48vw" : "(max-width: 800px) 46vw, 18vw"} />
              </figure>
            ))}
          </div>
        </section>

        <section className="legacy-section legacy-services" id="services">
          <div className="legacy-heading">
            <p className="legacy-kicker">What we clean</p>
            <h2>Our Upholstery Cleaning Services</h2>
          </div>
          <div className="legacy-service-grid">
            {services.map(({ title, description, image, icon: Icon }) => (
              <article className="legacy-service-card" key={title}>
                <div className="legacy-service-card__image">
                  <Image src={image} alt="" fill sizes="(max-width: 700px) 92vw, (max-width: 1050px) 45vw, 22vw" />
                </div>
                <span className="legacy-service-card__icon"><Icon aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="legacy-section legacy-trust" id="why-softnest">
          <div className="legacy-trust__intro">
            <p className="legacy-kicker">Why homeowners choose SoftNest</p>
            <h2>Quality You Can See.<br />Care You Can Trust.</h2>
            <p>We go beyond surface cleaning. Every detail matters because your home and furniture deserve the best.</p>
            <a className="legacy-button" href="#about">Learn more about us</a>
          </div>
          <div className="legacy-trust__grid">
            {trustPoints.map(({ title, description, icon: Icon }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="legacy-section legacy-process" id="process">
          <div className="legacy-heading">
            <p className="legacy-kicker">How it works</p>
            <h2>Our 4-Step Cleaning Process</h2>
          </div>
          <ol className="legacy-process__grid">
            {process.map(({ title, description, icon: Icon }, index) => (
              <li key={title}>
                <div className="legacy-process__icon"><Icon aria-hidden="true" /></div>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="legacy-health">
          <div className="legacy-health__image">
            <Image src="/img/health.png" alt="" fill sizes="(max-width: 800px) 100vw, 48vw" />
          </div>
          <div className="legacy-health__copy">
            <p className="legacy-kicker">Healthier home. Happier family.</p>
            <h2>A Deeper Clean for the People and Pets You Love</h2>
            <p>Our process removes dirt, bacteria, allergens, and odours trapped deep in your upholstery, creating a fresher, healthier environment.</p>
            <div className="legacy-health__benefits">
              <article><Leaf aria-hidden="true" /><h3>Safe Products</h3><p>Non-toxic and eco-friendly. Safe for kids and pets.</p></article>
              <article><Wind aria-hidden="true" /><h3>Odour Removal</h3><p>Eliminates odours at the source, not just masking them.</p></article>
              <article><ShieldCheck aria-hidden="true" /><h3>Allergen Reduction</h3><p>Removes dust, dander, and allergens for a healthier home.</p></article>
            </div>
          </div>
        </section>

        <section className="legacy-section legacy-reviews" id="reviews">
          <div className="legacy-reviews__intro">
            <p className="legacy-kicker">Client reviews</p>
            <h2>What Our Clients Are Saying</h2>
            <p>Real feedback from homeowners across Mississauga and the GTA.</p>
            <a className="legacy-button" href={googleReviews} target="_blank" rel="noreferrer">See all Google reviews</a>
          </div>
          <div className="legacy-review-track">
            {reviews.map(({ name, text }) => (
              <blockquote key={name}>
                <div className="legacy-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p>“{text}”</p>
                <cite>{name} <span>Google review</span></cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="legacy-faq" id="faq">
          <div className="legacy-faq__copy">
            <p className="legacy-kicker">FAQ</p>
            <h2>Frequently Asked Questions</h2>
            <div className="legacy-faq__list">
              {faqs.map(({ question, answer }, index) => (
                <details key={question} open={index === 0}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="legacy-equipment">
            <Image src="/img/faq_machine.png" alt="" fill sizes="(max-width: 800px) 100vw, 42vw" />
            <div>
              <Sparkles aria-hidden="true" />
              <h3>Professional Equipment.<br />Superior Results.</h3>
              <p>We use commercial-grade equipment and proven techniques to deliver a deeper, longer-lasting clean.</p>
            </div>
          </div>
        </section>

        <section className="legacy-section legacy-about" id="about">
          <div className="legacy-about__logo">
            <Image src="/img/logo/logo1.png" alt="SoftNest Fabric Care" width={420} height={420} />
          </div>
          <div className="legacy-about__copy">
            <p className="legacy-kicker">About SoftNest</p>
            <h2>Careful Upholstery Cleaning, Done with Standards</h2>
            <p>SoftNest was built around a simple belief: quality should always come first. Every sofa, sectional, chair, and rug is treated with the same care we would expect in our own homes.</p>
            <p>From fabric-safe products to professional equipment and careful technique, our goal is to deliver visible results you can trust without rushing the work.</p>
            <div className="legacy-about__stats">
              <div><BadgeCheck /><strong>100%</strong><span>Satisfaction focused</span></div>
              <div><Medal /><strong>Pro</strong><span>Equipment &amp; technique</span></div>
              <div><MapPin /><strong>Local</strong><span>Mississauga &amp; GTA</span></div>
              <div><Heart /><strong>Care</strong><span>For your home</span></div>
            </div>
          </div>
          <iframe
            className="legacy-map"
            title="SoftNest service area map centered on Mississauga"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=43.5890,-79.6441&z=10&output=embed"
          />
        </section>

        <section className="legacy-quote" id="quote">
          <div>
            <p className="legacy-kicker">Free quote</p>
            <h2>Ready for a Fresher, Cleaner Home?</h2>
            <p>Tell us what needs cleaning and we’ll help you plan the next step.</p>
          </div>
          <form className="legacy-quote__form" action="https://api.web3forms.com/submit" method="post">
            <input type="hidden" name="access_key" value="c204f6bb-0402-4dfe-8981-fc5080ce3ac4" />
            <input type="hidden" name="subject" value="New SoftNest quote request" />
            <input type="checkbox" name="botcheck" className="quote-botcheck" tabIndex={-1} aria-hidden="true" />
            <label>Name<input name="name" autoComplete="name" required /></label>
            <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
            <label className="legacy-quote__wide">What needs cleaning?<textarea name="details" rows={3} required /></label>
            <button type="submit">Request my free quote <ArrowRight size={18} /></button>
          </form>
        </section>
      </main>

      <footer className="legacy-footer">
        <div>
          <h2>SoftNest</h2>
          <p>Quality You Can See.<br />Care You Can Trust.</p>
          <p>Professional upholstery cleaning for homes across Mississauga and the GTA.</p>
        </div>
        <div><h3>Services</h3><a href="#services">Sofa &amp; Couch Cleaning</a><a href="#services">Pet Stain &amp; Odour Removal</a><a href="#services">Furniture Cleaning</a><a href="#services">Carpet &amp; Area Rug Cleaning</a></div>
        <div><h3>Company</h3><a href="#why-softnest">Why trust us</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a><a href="#about">About us</a></div>
        <div><h3>Contact</h3><a href="tel:+14167270287"><Phone size={16} /> (416) 727-0287</a><a href="mailto:softnest.upholstery@outlook.com">softnest.upholstery@outlook.com</a><p>Mississauga, Ontario<br />Serving the GTA</p></div>
        <p className="legacy-footer__bottom">© 2026 SoftNest Upholstery Care. All rights reserved.</p>
      </footer>
    </>
  );
}
