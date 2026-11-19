import { jsonLd } from "@/seo/structuredData";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Upholstery & Carpet Cleaning Prices | SoftNest",
  description:
    "SoftNest cleaning prices across the GTA for sofas, carpet, chairs, mattresses and leather. Tax included, minimum visit $139, with a clear explanation of what changes the price.",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "Upholstery & Carpet Cleaning Prices | SoftNest",
    description:
      "Clear per-item prices for sofa, mattress, chair, leather and carpet cleaning in the GTA. Tax included.",
    url: "/pricing/",
  },
};

type Row = { label: string; price: string; note?: string };

const upholstery: Row[] = [
  { label: "Loveseat (2 seats)", price: "$89 – $109" },
  { label: "Sofa (3 seats)", price: "$119 – $129" },
  { label: "Sofa (4 seats)", price: "$159 – $179" },
  { label: "2-seat sofa with chaise", price: "$159 – $179" },
  { label: "3-seat sofa with chaise", price: "$199 – $219" },
  { label: "Sectional, 5 seats", price: "$199 – $219" },
  { label: "Sectional, 6 seats", price: "$219 – $239" },
  { label: "Sectional, 7 seats", price: "$249 – $269" },
  { label: "Ottoman", price: "$25 – $30", note: "depends on its size" },
  { label: "Decorative pillow", price: "$5" },
];

const leather: Row[] = [
  { label: "Armchair", price: "$59" },
  { label: "Loveseat", price: "$109" },
  { label: "Sofa (3 seats)", price: "$139" },
];

const chairs: Row[] = [
  { label: "Armchair", price: "$49" },
  { label: "Recliner", price: "$59" },
  { label: "Dining chair, seat only", price: "$10 – $15", note: "depending on how dirty it is" },
  { label: "Dining chair, seat and back", price: "$20 – $25" },
  { label: "Fully upholstered chair", price: "$25" },
];

const mattresses: Row[] = [
  { label: "Twin (single)", price: "$89", note: "one side" },
  { label: "Twin XL", price: "$89", note: "one side" },
  { label: "Double (full)", price: "$99", note: "one side" },
  { label: "Queen", price: "$109", note: "one side" },
  { label: "King", price: "$129", note: "one side" },
  { label: "California King", price: "$129", note: "one side" },];

const carpet: Row[] = [
  { label: "Room (standard size)", price: "$50" },
  { label: "Hallway", price: "$25 – $30" },
  { label: "Landing", price: "$25 – $30" },
  { label: "Stairs", price: "$5 per step" },
  { label: "Area rug", price: "$1.50 per sq. ft." },
];

function PriceTable({ caption, rows }: { caption: string; rows: Row[] }) {
  return (
    <table className={styles.table}>
      <caption>{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">
              {row.label}
              {row.note ? <small>{row.note}</small> : null}
            </th>
            <td>{row.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const includedItems = [
  { title: "Fabric inspection and test", text: "Before we start, we look closely at your fabric and its care label and test in a hidden spot. Then we choose the right cleaning solution for your fabric and your stains from the many we bring with us." },
  { title: "Thorough vacuuming first", text: "We vacuum the whole piece first, including seams and crevices, so dry dust and crumbs are gone before any moisture touches the fabric." },
  { title: "UV check for hidden stains", text: "On delicate fabrics, and whenever it helps, we check with a UV light. It shows marks and soil that your eyes cannot see, so we can treat them too and your furniture is truly clean, not only clean-looking." },
  { title: "Deep cleaning and rinsing", text: "Stain pre-treatment, deep cleaning with professional extraction, and a thorough rinse to take out the loosened dirt and the cleaning solution." },
  { title: "Stain removal", text: "In a standard cleaning we remove the vast majority of stains, and it is included in the price." },
  { title: "The whole piece, not only the seats", text: "We clean both sides of removable cushions, and also the sides, the lower parts and, wherever we can reach, the back. We gently move the furniture a little away from the wall to get there. A special narrow tool lets us work along the seams, and we pay special attention to corners, cushion edges and armrests." },
  { title: "Deodorizing and sanitizing", text: "We treat the source of an odour, not just the surface, so we are not simply covering it with a fragrance. Sanitizing leaves your furniture fresh as well as clean." },
  { title: "Extra attention to dirty areas", text: "Armrests, headrests and other high-contact or delicate areas get extra care. If an area is especially dirty, we clean it again from the start, the whole cycle, and this is included. Sometimes it needs a third pass, though two are usually enough. The first extra hour is on us: it is built into our schedule and price in case the job needs it. If it is needed, we take it, because the result matters more to us than keeping to the schedule. If it is not needed, we simply do not use it." },
  { title: "Complimentary drying while we work", text: "Our air movers run the whole time we are in your home, as a small gift from us. The parts we clean first are almost dry by the time we finish. We switch them off when we leave, so the last area we clean is still damp. Full drying usually takes 6–8 hours." },
  { title: "Care for your home", text: "We lay waterproof drop cloths on the floor to protect the area where we work. Our equipment, including the extractor, stands on a soft blanket, so your floor does not get scratched. We change into clean shoes before we come in, and we keep an eye on this every time." },
  { title: "A repeat visit if stains come back", text: "If deep stains reappear within 48 hours, we come back to treat them. It is included, and you do not pay again." },
  { title: "An honest price, confirmed first", text: "We confirm the work and the final price in writing before we start, tax included, and you pay only after the service." },
];
const includedChips = ["Fabric inspection", "Vacuuming", "UV check for hidden stains", "Deep cleaning", "The whole piece, even the seams", "Dirtiest areas cleaned twice", "Stain removal", "Deodorizing and sanitizing", "Free drying while we work", "Floor protection"];

const faqs = [
  {
    q: "Why does the price of the same sofa change?",
    a: "Because of the cushions and the model. Two sofas of the same size can take about 1.5 hours or about 2.5 hours. If the cushions cannot be removed, the price is a little lower. If they come off and can be flipped, we clean both sides, there are more seams and corners to reach, and the job takes about an hour longer, so the price is a little higher. Not sure which applies? Send us a photo and we will tell you the exact price.",
  },
  {
    q: "Is tax included, and are the prices final?",
    a: "Prices are per item and include tax. We confirm the work and the final price in writing before we start. You pay after the service by cash or Interac e-Transfer. No deposit is needed.",
  },
  {
    q: "What is the minimum visit?",
    a: "$139, tax included. If your item costs less, add another item to get more from the same visit.",
  },
  {
    q: "Do you give a discount for several items?",
    a: "Yes. When you add a second item, we give you a discount, and with a third item the discount is even bigger. The exact discount depends on what you would like cleaned, so we talk about it directly. Message us with everything you have, and we will gladly work it out together.",
  },
  {
    q: "Is stain removal included?",
    a: "Yes. In a standard cleaning we remove the vast majority of stains, and it is included in the price. Only rare, stubborn stains that need a lot of extra work go beyond the first extra hour, which is on us. After that it is about $55 per hour, and we always agree it with you first.",
  },
  {
    q: "What if an area needs more than one pass?",
    a: "We do it, without any problem. If an area is especially dirty, such as an armrest or a headrest, we clean it again from the start, the whole cycle, and it is included in the price. The first extra hour is on us, because the result matters more to us than keeping to the schedule. If a stain needs more time than that, we agree it with you first.",
  },
  {
    q: "How long does drying take, and is it included?",
    a: "Drying with our air movers while we work is complimentary, and full drying usually takes 6–8 hours. The last area we clean is still damp when we leave, because we switch the air movers off. If you want it dried faster, extra air-mover time is $55 per hour.",
  },
  {
    q: "How can I help you prepare?",
    a: "Please set aside a parking space for our vehicle and let us bring in our equipment, which weighs over 100 kg (220 lb). In condos and downtown buildings, a loading elevator helps a lot. We need this to do our best work, and we are grateful for your help.",
  },
  {
    q: "Why is downtown more expensive?",
    a: "Downtown Toronto and other downtown areas add $30 to the price, so the minimum visit there is $169. A second technician is always needed, and we need an extra hour to prepare and carry the equipment.",
  },
  {
    q: "Do you travel outside the GTA?",
    a: "Yes, and we are happy to. We clean across the GTA, and we also travel farther, up to about 150 km beyond it, depending on the job: the order should be large enough to make the trip worthwhile. Depending on the order, a travel fee may or may not apply. We tell you before we book.",
  },
  {
    q: "What if a stain comes back?",
    a: "If deep stains reappear within 48 hours, a repeat visit to treat them is included.",
  },
  {
    q: "Will every stain come out?",
    a: "We do everything we can, and the vast majority come out. Honestly, fabric that has already been treated with harsh chemicals or bleach, or that has permanently changed colour, may not return to its original look. We always tell you honestly what to expect before we start.",
  },
];

export default function PricingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Pricing", item: `${siteConfig.url}/pricing/` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <div className="new-hero-root legal-header">
        <SiteHeader />
      </div>
      <main className={styles.page}>
        <div className={styles.shell}>
          <section className={styles.hero} aria-labelledby="pricing-heading">
            <p className={styles.eyebrow}>Pricing</p>
            <h1 id="pricing-heading">Upholstery &amp; Carpet Cleaning Prices</h1>
            <p className={styles.notice}>
              <strong>Minimum visit: $139</strong> (tax included)
              <span>This covers us coming to you with all our equipment. If your item costs less, we would be glad to clean another one in the same visit, so you get the most out of it.</span>
            </p>
            <p className={`${styles.notice} ${styles.noticeSecondary}`}>
              <strong>The more you clean, the more you save</strong>
              <span>
                When you add a second item, we give you a discount, and with a third item the
                discount is even bigger. The exact discount depends on what you would like
                cleaned, so let us talk about it directly: message us, and we will gladly work
                it out together.
              </span>
            </p>
            <p className={`${styles.notice} ${styles.noticeSecondary}`}>
              <strong>A little help from you</strong>
              <span>
                Please set aside a parking space for our vehicle and let us bring in our
                equipment, which weighs over 100 kg (220 lb). We need this to do our best work,
                especially in condos and downtown buildings. Thank you for arranging it.
              </span>
            </p>
            <p>
              We love what we do, and we want you to feel like a friend of ours, not just a
              customer. That is why our prices are honest, clear and tax included, and why we
              explain everything, so there are no surprises.
            </p>
            <p>
              <strong>Something unclear, or your item does not match the list?</strong> Just send
              us a photo or write to us. We will gladly answer any question, give you the exact
              price, confirm it and advise you. It is all free, and we are happy to do it.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/quote/">Get a free quote</Link>
              <a className={styles.secondary} href={siteConfig.smsHref}>Text us</a>
              <a className={styles.secondary} href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </section>

          <section className={styles.includedBand} aria-label="Included in every price">
            <strong>Included in every price</strong>
            <ul>
              {includedChips.map((chip) => (
                <li key={chip}>
                  <span aria-hidden="true">✓</span>
                  {chip}
                </li>
              ))}
            </ul>
            <a href="#included">See everything that is included</a>
          </section>

          <nav className={styles.jump} aria-label="Jump to a section">
            <a href="#upholstery-heading">Sofas</a>
            <a href="#carpet-heading">Carpet</a>
            <a href="#chairs-heading">Armchairs and chairs</a>
            <a href="#mattress-heading">Mattresses</a>
            <a href="#leather-heading">Leather</a>
            <a href="#included-heading">What is included</a>
            <a href="#faq-heading">Questions</a>
            <a href="#extra-heading">Extras</a>
          </nav>

          <section className={styles.section} aria-labelledby="upholstery-heading">
            <h2 id="upholstery-heading">Sofas</h2>
            <p>
              Price per item. The lower price is for cushions that cannot be removed. The higher
              price is for cushions that come off and can be flipped, so we clean both sides.
            </p>
            <PriceTable caption="Sofa cleaning prices" rows={upholstery} />
          </section>

          <section className={styles.section} aria-labelledby="carpet-heading">
            <h2 id="carpet-heading">Carpet</h2>
            <PriceTable caption="Carpet cleaning prices" rows={carpet} />
          </section>

          <section className={styles.section} aria-labelledby="chairs-heading">
            <h2 id="chairs-heading">Armchairs and chairs</h2>
            <p>Price per item.</p>
            <PriceTable caption="Armchair and chair cleaning prices" rows={chairs} />
          </section>

          <section className={styles.section} aria-labelledby="mattress-heading">
            <h2 id="mattress-heading">Mattresses</h2>
            <PriceTable caption="Mattress cleaning prices" rows={mattresses} />
            <p className={styles.note}>Prices are for cleaning one side. Other sizes or both sides: message us and we will give you a price.</p>
          </section>

          <section className={styles.section} aria-labelledby="leather-heading">
            <h2 id="leather-heading">Leather</h2>
            <p>Cleaning and conditioning included.</p>
            <PriceTable caption="Leather furniture cleaning prices" rows={leather} />
            <p className={styles.note}>Leather sectionals and other leather pieces: message us and we will give you a price.</p>
          </section>

          <section className={styles.included} id="included" aria-labelledby="included-heading">
            <h2 id="included-heading">Everything that is included in your price</h2>
            <p className={styles.includedLead}>No surprises, and nothing extra to pay for any of this.</p>
            <ul className={styles.includedGrid}>
              {includedItems.map((item) => (
                <li key={item.title}>
                  <span className={styles.includedCheck} aria-hidden="true">✓</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-heading">
            <h2 id="faq-heading">Pricing questions</h2>
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </section>

          <section className={styles.section} aria-labelledby="extra-heading">
            <h2 id="extra-heading">Extras, only if you want or need them</h2>
            <ul className={styles.list}>
              <li><strong>Rare, stubborn stains</strong> that need 2–3 hours of extra work: the first extra hour is on us, and the rest is about $55 per hour. We always talk to you first and agree before we start. Most jobs never need this.</li>
              <li><strong>Extra drying time</strong> with air movers: $55 per hour.</li>
              <li><strong>Whitening treatment</strong> for white and light fabric: dining chair $5, loveseat $20, most other items $30, 7-seat sectional $35.</li>
              <li><strong>Pilling removal:</strong> $15 per seat. A 3-seat sofa is $45.</li>
              <li><strong>Urine treatment:</strong> $25 per cushion.</li>
              <li><strong>Downtown Toronto and other downtown areas:</strong> $30 added to the price (so the minimum visit there is $169). Downtown visits need a second technician and extra time to prepare and carry the equipment. Parking and access for our equipment are essential there, as described at the top of the page.</li>
              <li><strong>Anything not listed here:</strong> message us and we will give you a price.</li>
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="exact-heading">
            <h2 id="exact-heading">Let us get to know you</h2>
            <p>Send us a photo of your furniture or carpet, or simply write to us, and we will reply personally. We will answer any question, give you the exact price, confirm it and advise you what is best for your item. All of this is free, and we are glad to do it. We would love to take care of your home like a friend would. See also <Link href="/location/">all the areas we serve</Link>.</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/quote/">Get a free quote</Link>
              <a className={styles.secondary} href={siteConfig.smsHref}>Text us</a>
              <a className={styles.secondary} href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
    </>
  );
}
