import fs from "node:fs";
import assert from "node:assert/strict";
import { createClient } from "@sanity/client";
import { normalizeContent } from "./normalize.mjs";
import { websiteContentQuery } from "../../src/sanity/queries.ts";

// Prepare locally first. --apply publishes only this reviewed article set and
// guards against overwriting editorial changes made since the saved backup.
process.loadEnvFile(".env.local");
const config = JSON.parse(fs.readFileSync("sanity.project.json", "utf8"));
const client = createClient({ ...config, apiVersion: "2026-09-01", useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, perspective: "published" });
const backup = JSON.parse(fs.readFileSync("content/backups/before-booking-guides-2026-10-24.json", "utf8"));
const originalPosts = backup.filter(d => d._type === "post" && !d._id.startsWith("drafts."));
const posts = structuredClone(originalPosts);
let key = 0;
function blocks(markdown) {
  return markdown.trim().split(/\n\s*\n/).flatMap(p => {
    const list = p.startsWith("- ");
    return (list ? p.split("\n") : [p]).map(line => {
      const style = line.startsWith("### ") ? "h3" : line.startsWith("## ") ? "h2" : "normal";
      const text = line.replace(/^#{2,3} /, "").replace(/^- /, "").replace(/\n/g, " ");
      const markDefs = [];
      const children = [];
      const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
      let start = 0;
      for (const match of text.matchAll(pattern)) {
        if (match.index > start) children.push({ _type: "span", _key: `s${key++}`, text: text.slice(start, match.index), marks: [] });
        const linkKey = `l${key++}`;
        markDefs.push({ _type: "link", _key: linkKey, href: match[2] });
        children.push({ _type: "span", _key: `s${key++}`, text: match[1], marks: [linkKey] });
        start = match.index + match[0].length;
      }
      if (start < text.length) children.push({ _type: "span", _key: `s${key++}`, text: text.slice(start), marks: [] });
      return { _type: "block", _key: `editorial-${key++}`, style, markDefs, children,
        ...(list ? { listItem: "bullet", level: 1 } : {}) };
    });
  });
}
const plain = b => b.children?.map(s => s.text).join("") || "";
const post = slug => { const p = posts.find(p => p.slug.current === slug); assert(p, slug); return p; };
const add = (slug, markdown) => {
  const p = post(slug);
  const faq = p.body.findIndex(b => b.style === "h2" && plain(b).toLowerCase() === "frequently asked questions");
  p.body.splice(faq < 0 ? p.body.length : faq, 0, ...blocks(markdown));
};
const replace = (slug, find, text) => {
  const p = post(slug);
  const b = p.body.find(b => plain(b).includes(find));
  assert(b, `${slug}: ${find}`);
  b.children = [{ _type: "span", _key: `s${key++}`, text, marks: [] }]; b.markDefs = [];
};

add("how-to-remove-stain-from-couch", `
## Not sure what to do next? You can ask before booking

You don't need to identify the fabric or find the perfect cleaning product before contacting us. Tell us what happened, roughly when it happened and what you've already tried. Everyday spills happen, and that information helps us plan the next step.

A wide photo and a close-up can help if you'd like to send them, but photos are optional. We can also talk through the furniture and the mark by phone or message. See [what our sofa cleaning includes](/blog/what-is-included-in-sofa-cleaning/) before deciding whether to book.
`);
add("why-did-my-couch-stain-come-back-after-cleaning", `
## If the stain returned after a SoftNest appointment

Get in touch and tell us when the mark became visible and whether the upholstery is fully dry. You can send a photo if that is convenient, but a description is fine too. Keep the area uncovered and avoid adding another spot remover while we discuss what you're seeing.

A returning mark deserves a look at the cause. Wicking, residue and changes in the fabric can need different next steps. Our [guide to stains or odours after professional cleaning](/blog/stains-or-odours-after-professional-cleaning/) explains what to check and how to contact us.
`);
add("what-cleaning-solution-can-i-use-on-my-couch", `
## No care label? You can still ask for advice

If the label is missing or hard to understand, you don't have to guess. Tell us about the sofa, the stain and any product already used. A care label or product photo is helpful when available, but it isn't a condition of asking for a quote.

At SoftNest, we assess the material and condition before choosing the cleaning approach. Our [sofa cleaning inclusions](/blog/what-is-included-in-sofa-cleaning/) explain the treatment, extraction, rinsing and drying support that make up the agreed service. If you have a sensitivity or a particular concern about products, mention it before the appointment so we can discuss it with you.
`);
add("why-sofa-armrests-get-dirty-faster", `
## Is extra attention to the armrests included?

Tell us about the darker arms, favourite seat or headrest when you ask for your quote. Our upholstery service includes stain treatment where needed and attention to the accessible areas agreed for cleaning. We confirm the work and written price before booking, rather than leaving the details until we're in your living room.

Both sides of removable cushions are included where accessible and suitable for the material. An extra armchair, loose pillow or another item should be listed separately so the quote covers what you actually want cleaned. Read [what's included in sofa cleaning](/blog/what-is-included-in-sofa-cleaning/) for the full picture.
`);
replace("does-vacuuming-clean-carpet", "The useful distinction is maintenance", "Vacuuming and professional carpet cleaning do different jobs. A suitable vacuum can remove a great deal of dry soil, including particles below the surface. Professional cleaning addresses suitable spots, oily buildup and residues that dry vacuuming alone may leave behind.");
add("does-vacuuming-clean-carpet", `
## Planning your first professional carpet clean

Start with the rooms or areas you'd like cleaned, approximate sizes and any concerns about spots, pets or busy walkways. List stairs and landings separately. We also clarify furniture movement and parking with you before the visit.

Our [residential carpet cleaning guide](/blog/what-to-expect-from-professional-carpet-cleaning/) walks through the appointment, from checking the material to rinsing, extraction and drying. You can request a written quote without committing to an appointment.
`);
add("how-to-remove-pet-urine-smell-from-couch", `
## What to tell us before we quote pet-odour treatment

Let us know whether it was one recent accident or a repeated problem, whether the cushions come off and which products you've tried. There's no need to feel awkward about it. The history helps us understand whether the concern is near the surface or may involve the padding below it.

Our upholstery clean includes deodorizing and sanitizing, with the products and handling chosen for the material. That doesn't tell us how deeply a particular accident has reached. We discuss any additional treatment needed and confirm the agreed work and written total before booking.

After the appointment, let the item dry before judging the final smell. If something still concerns you, [contact us about the result](/blog/stains-or-odours-after-professional-cleaning/) so we can review it with you.
`);
add("how-often-should-office-carpets-be-cleaned", `
## Plan the visit around the workplace

When you contact SoftNest, tell us which areas need cleaning, their approximate size and when they can be accessed. Mention service-elevator bookings, loading arrangements, parking and any documents your building requires. We can then check the practical details before agreeing a visit; don't assume a particular time slot or building requirement is available until it is confirmed.

Keep staff circulation and drying in the plan. If only the entrance and a few walkways need interim attention, identify them clearly so the written quote covers those areas. If you need a regular schedule, tell us about traffic and the building's carpet-care instructions rather than choosing an interval from appearance alone.

For the steps involved in an extraction clean, see [what to expect from carpet cleaning](/blog/what-to-expect-from-professional-carpet-cleaning/), or [request a business quote](/quote/).
`);
replace("how-long-does-a-couch-take-to-dry-after-cleaning", "Many professionally cleaned couches dry", "Most sofas we clean take about six to eight hours to dry. Thick cushions, the fabric, humidity and airflow can make it longer, so treat that as a planning estimate rather than a guaranteed ready-by time. We explain what to expect for your furniture before we leave.");
add("how-long-does-a-couch-take-to-dry-after-cleaning", `
## Cleaning time and drying time are different

Many sofa appointments take around one to two hours for the cleaning itself. A larger sectional, extra items or more involved treatment can take longer. The sofa still needs time to dry after we finish, so leave a comfortable gap before guests arrive or you need the seating again.

We use air movers while we work to help with drying; that isn't a promise that the cushions will be dry when we leave. Our [preparation guide](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) explains what to arrange before the visit. If the sofa is still damp beyond the estimate we gave you, contact us and describe which areas remain damp rather than covering them or applying strong heat.
`);
replace("how-to-know-when-your-sofa-needs-professional-cleaning", "Our cleaning process includes treatment", "Our upholstery service includes stain treatment where needed, deep cleaning with professional extraction equipment, a thorough rinse, deodorizing and sanitizing. We clean all accessible upholstered areas agreed for the visit, including both sides of removable cushions where suitable, and use air movers while we work to help with drying.");
add("how-to-know-when-your-sofa-needs-professional-cleaning", `
## Is cleaning still worth considering on an older sofa?

The useful question is what is making the sofa look tired. Everyday soil and body oils can respond to cleaning. A worn seam, flattened cushion or faded patch is a different concern and should be pointed out before you book.

You can ask us to assess the material and discuss what improvement is realistic. If you're weighing cleaning against repair or replacement, tell us what you hope to change. A clear expectation is more useful than a promise that an older sofa will look new. Our [appointment guide](/blog/what-to-expect-when-softnest-cleans-your-sofa/) explains the inspection and cleaning process.
`);

post("upholstery-cleaning-prices-toronto").body = blocks(`
If you're looking up upholstery cleaning prices in Toronto, you probably want a straightforward answer before you book. At SoftNest Fabric Care, we provide written quotes for your furniture rather than a fixed online price list. Tell us what you'd like cleaned and we'll confirm the work and total, including tax.

You can call, text or use our [quote form](/quote/). Photos can help us understand the layout or a particular stain, but they're optional. Asking for a quote doesn't book an appointment.

## What affects a sofa or sectional cleaning quote?

The size, material, condition and items you want cleaned all matter. A compact three-seat sofa and a large sectional with a chaise may have similar seat counts but very different amounts of upholstery.

Describe the whole piece, including corner sections, recliners, a chaise or an ottoman. If you're not sure how to count it, just describe the layout. We can clarify it with you instead of asking you to work out a price yourself.

Mention separate chairs, decorative pillows or other furniture you'd like included. For carpets, give approximate room or rug dimensions and list stairs and landings separately. Parking is confirmed with you as part of planning the visit.

## What's included in our upholstery cleaning price?

For the furniture and areas agreed in your quote, our service includes:

- Stain treatment where needed, suited to the fabric and the type of mark.
- Deep cleaning with professional extraction equipment.
- A thorough rinse to recover loosened soil and cleaning solution.
- Deodorizing and sanitizing with a fabric-appropriate approach.
- All accessible upholstered areas, including both sides of removable cushions where suitable.
- Air movers while we work to help the furniture begin drying.

We check the material and condition before choosing the method. Included stain treatment means we work on suitable marks; it doesn't mean every stain or colour change can disappear. Read [what's included in sofa cleaning](/blog/what-is-included-in-sofa-cleaning/) for details about surfaces and access.

## What if the job needs something different?

Tell us about pet accidents, previous cleaning attempts and any unusual concerns when you request the quote. If an item needs a different approach, we'll discuss it before agreeing the work. Additional furniture or a change in the requested treatment should be clarified with you first.

The written quote should make it easy to see which pieces and areas are covered. If something isn't clear, ask. You shouldn't have to wait until the equipment is set up to understand what you're buying.

## When do I pay?

Payment is collected after the service is complete. We confirm the total price, including tax, before booking. If you want to know which payment method to use, check with us when arranging the appointment.

## How to request a useful written quote

- Tell us your city and the furniture or carpet areas you want cleaned.
- Describe the size or layout, plus any extra pieces.
- Mention stains, odours and products already used.
- Share access or parking details that may affect the visit.
- Add photos if you'd like to; you can get started without them.

SoftNest serves Toronto and communities across the GTA and Hamilton. [Check our service areas](/location/) or contact us with your city or postal code if you're unsure about coverage.

## Frequently Asked Questions

### Do I have to send photos to get a quote?

No. Photos are useful for showing a sectional's layout or a mark, but you can describe the furniture by phone or message instead.

### Does the price include tax?

Yes. We confirm a tax-inclusive total for the agreed work before booking.

### Will you quote a sofa and carpet together?

Yes. List all the furniture and areas you want cleaned so we can confirm a combined written quote and allow enough time.

### Does requesting a price reserve an appointment?

No. We discuss the work, price and availability with you before an appointment is agreed.
`);

const processPost = post("what-to-expect-when-softnest-cleans-your-sofa");
processPost.body.splice(1, 0, ...blocks(`
## Before your appointment

We start with a written quote for the items and areas you want cleaned, with tax included. Tell us about the layout, any stains or pet odour and products already used. Photos are optional. We clarify parking and any furniture movement with you before the visit.

We'll remind you the day before your appointment and text around 20–30 minutes before arriving. Please arrange access to a sink with hot water or another suitable water supply. You can stay while we work or make an access plan with us if you'll be out. Our [preparation checklist](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) covers the practical details.
`));
add("what-to-expect-when-softnest-cleans-your-sofa", `
## What's included, and what happens afterwards?

The agreed upholstery clean includes stain treatment where needed, professional extraction, a thorough rinse, deodorizing and sanitizing. We clean accessible upholstered areas, including both sides of removable cushions where suitable, and use air movers while we work. See [the full inclusions guide](/blog/what-is-included-in-sofa-cleaning/) if you're planning several pieces.

We review the work and explain drying and aftercare. Payment is collected after the service. If a mark or smell concerns you once the furniture is dry, contact us so we can review it with you and discuss the next step. Our [after-cleaning guide](/blog/stains-or-odours-after-professional-cleaning/) explains what information helps.
`);

post("how-to-find-a-reliable-sofa-and-carpet-cleaning-company").body = blocks(`
Looking for a sofa and carpet cleaning company in Oakville, Milton, Burlington or Mississauga? Start with a few practical questions: what is included, what will it cost, how will the cleaner care for your home, and what happens after the visit?

You don't need to know the name of your fabric or the right cleaning method before you ask. A useful conversation should help you understand the job and decide whether the service fits your needs.

## Compare the written quote and the work it covers

Two quotes for sofa cleaning can cover different surfaces and treatments. Check the item list, accessible backs and sides, removable cushions, ordinary stain treatment, rinsing and drying assistance. Ask whether the total includes tax and clarify parking before the appointment.

At SoftNest, we provide written quotes rather than a fixed online price list. We confirm the agreed work and tax-inclusive total before booking. Photos are optional; you can describe the furniture by phone or message. Our [pricing and quote guide](/blog/upholstery-cleaning-prices-toronto/) explains what information helps.

## Ask how your material will be assessed

A light-coloured sectional, a wool rug and a delicate upholstered chair can need different care. The cleaner should consider the material, construction, care instructions, existing condition and previous products before choosing an approach.

Mention old marks, loose seams, colour changes and any attempt to clean them. That helps the technician distinguish everyday soil from concerns that cleaning may not fully change. You should understand the likely improvement before work begins.

## Check the practical details for your home

For a house, think about the route to the furniture and whether stairs or tight spaces affect access. In a condo, check parking, loading, elevator arrangements and building service hours. Clarify which furniture can be moved rather than assuming every piece will be shifted.

SoftNest confirms parking and any furniture movement with you. We ask for access to a sink with hot water or another suitable water supply. We'll send a reminder the day before and text around 20–30 minutes before arriving. See [how to prepare for the visit](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) for a simple checklist.

## Look for realistic answers about stains and drying

Included stain treatment isn't a promise that every mark will vanish. Worn fibres, changed colour and deeper contamination can affect the outcome. Ask what the cleaner expects to improve and how the result should be judged after drying.

Most sofas we clean take around six to eight hours to dry; most carpets take around four to eight hours. The material, padding, humidity and airflow can extend those estimates. We use air movers while working to help with drying and explain when the area is ready to use.

## Read reviews and know how to follow up

Look for details about communication, care inside the home, the agreed price and the result after drying. Independent reviews and genuine job documentation are useful alongside the company's own explanation of its service.

Before booking, make sure you know how to reach the company afterwards. If something concerns you after a SoftNest clean, call or message us so we can review it with you. Our [follow-up guide](/blog/stains-or-odours-after-professional-cleaning/) explains the first steps.

## A quick checklist before you book

- Is the furniture and carpet area list clear?
- Is the total price, including tax, confirmed in writing?
- Are the included treatment and accessible surfaces explained?
- Have access, parking and any movement been discussed?
- Do you understand the drying estimate and realistic result?
- Do you know how to contact the cleaner after the visit?

SoftNest provides upholstery and carpet cleaning across Oakville, Milton, Burlington, Mississauga and other GTA and Hamilton communities. [Find your service area](/location/) or [request a written quote](/quote/) when you're ready.
`);

post("fears-about-hiring-a-sofa-cleaner").body = blocks(`
Booking sofa cleaning should feel straightforward. You want to know what's included, what you'll pay and how the visit will fit around your day. It's completely reasonable to ask those questions before inviting a cleaning service into your home.

Here's how booking works at SoftNest Fabric Care, from the first message to using your sofa again.

## Can I ask for a quote without booking?

Yes. Call, text or use our [quote form](/quote/) with your city and what you'd like cleaned. We'll discuss the furniture, condition and next steps, then confirm a written price. An appointment is arranged only after the work, price and availability are agreed.

Photos are welcome if you'd like to share them, but they're optional. You don't need to find a care label or know how to count a corner sectional before getting in touch. Describe the layout and we'll clarify anything needed.

## What does the price cover?

Our upholstery cleaning includes stain treatment where needed, deep cleaning with professional extraction equipment, a thorough rinse, deodorizing and sanitizing. We clean all accessible upholstered areas agreed for the visit, including both sides of removable cushions where suitable, and use air movers while we work to help with drying.

We confirm the written total, including tax, before booking. Mention extra furniture, pet accidents or other concerns early so the quote reflects the work you want. Parking is confirmed with you. See [our quote guide](/blog/upholstery-cleaning-prices-toronto/) and [what's included](/blog/what-is-included-in-sofa-cleaning/) for more detail.

## Do I need to do anything before you arrive?

Clear small belongings and fragile items from the work area and leave a route to the furniture. There's no need to apply a stain remover first. We clarify furniture movement with you if it is needed.

Please arrange access to a sink with hot water or another suitable water supply. If your building needs an elevator booking or has service-hour rules, tell us before the appointment. You can stay home or agree access with us if you'll be out. Our [preparation guide](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) keeps all of this in one place.

## How will I know when you're coming?

We'll remind you the day before your appointment and text around 20–30 minutes before arriving. If access or your plans change, contact us so we can discuss it rather than leaving the details until arrival.

## How do you choose the cleaning method?

We look at the fabric, construction, care information, existing wear and marks before choosing the approach. We also ask what has already been used on the furniture. A home cleaning attempt isn't something to hide; it helps us understand what we're working with.

We explain the plan and any concerns before starting. Not every fabric suits the same product or amount of moisture. Our [sofa-cleaning process](/blog/what-to-expect-when-softnest-cleans-your-sofa/) explains the steps in everyday language.

## Will the sofa look new afterwards?

Cleaning can improve everyday soil, body oils and many common marks. The result still depends on the fabric, the stain and its history. Worn areas, changed colour or contamination below the accessible material may remain visible or need another approach.

We discuss what is realistic rather than promising the same outcome for every sofa. The final appearance should be judged after the upholstery dries, not only while it is damp.

## When can I use the sofa again?

Most sofas take about six to eight hours to dry, sometimes longer with thick cushions, high humidity or limited airflow. Air movers help while we're working, and we'll explain how to keep air moving afterwards. Wait until the upholstery is fully dry before sitting on it or putting throws back.

## What if I have a question after cleaning?

Call or message us and describe what you're noticing. If it's a mark or odour, tell us whether the sofa is fully dry and whether the concern is in the area we treated. Photos can help if you want to send them.

We'll review the concern with you and discuss the next step. Read [what to do about stains or odours after cleaning](/blog/stains-or-odours-after-professional-cleaning/) if you're unsure where to start.

## Ready to talk through your furniture?

SoftNest provides sofa, upholstery and carpet cleaning across the GTA and Hamilton. You can [request a written quote](/quote/) or [check your service area](/location/) without needing to know every technical detail first.
`);

// Keep the comparison guide's general checklist; make the SoftNest promises
// match the owner's confirmed service rather than open-ended guarantees.
replace("how-to-choose-an-upholstery-cleaning-company", "At SoftNest Fabric Care, we follow these principles", "At SoftNest Fabric Care, we confirm a written, tax-inclusive quote for the agreed work before booking. Our upholstery service includes stain treatment where needed, deep extraction cleaning, a thorough rinse, deodorizing and sanitizing. We clean accessible upholstered areas, including both sides of removable cushions where suitable, and use air movers while we work. Parking and any furniture movement are clarified with you. If something concerns you afterwards, contact us so we can review it together.");
add("how-to-choose-an-upholstery-cleaning-company", `
## Put the answers together before deciding

A clear quote, understandable inclusions and practical visit details should tell the same story. Use our [inclusions guide](/blog/what-is-included-in-sofa-cleaning/) to see what SoftNest's agreed upholstery clean covers, and our [preparation checklist](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) to plan access and drying. You can ask a question without making a booking.
`);

function create(slug, title, markdown, services) {
  posts.push({ _id: `post-${slug}`, _type: "post", slug: { _type: "slug", current: slug }, title,
    publishedAt: "2026-10-24T22:00:00Z", author: { _type: "reference", _ref: "author-softnest" },
    categories: [{ _type: "reference", _ref: "category-our-process" }],
    relatedServices: services.map(s => ({ _type: "reference", _ref: `service-${s}` })),
    order: Math.max(...posts.map(p => p.order || 0)) + 1, body: blocks(markdown), showCover: true });
}
create("what-is-included-in-sofa-cleaning", "What's Included in Sofa Cleaning at SoftNest?", `
When you book sofa cleaning, it helps to know exactly what the visit covers. At SoftNest Fabric Care, we confirm the furniture, accessible surfaces and written total before booking, so you can decide with a clear picture of the work.

Our upholstery clean includes stain treatment where needed, deep cleaning with professional extraction equipment, a thorough rinse, deodorizing and sanitizing. We clean all accessible upholstered areas agreed for the visit, including both sides of removable cushions where suitable, and use air movers while we work to help with drying.

## Which parts of the sofa do you clean?

The agreed clean covers accessible upholstered areas such as seats, backrests, armrests, sides, backs and the fabric around and beneath removable cushions. Both sides of removable cushions are included where the material can be cleaned safely.

Access matters. If a sofa sits tightly against a wall or a piece is heavy, tell us before the appointment. We clarify any movement needed rather than assuming you can lift it yourself. Mention a chaise, recliner, separate ottoman or decorative pillows when requesting the quote so the full item list is clear.

## Inspection and dry-soil removal come first

We check the material, construction, condition and areas of concern before choosing products and a method. The care label helps, and the condition of the upholstery matters too. Tell us about previous cleaning attempts, loose seams or colour changes you've noticed.

Vacuuming accessible areas removes loose dirt, hair and debris before the wet-cleaning stages. Heavily used arms and favourite seats may need more attention than lightly used panels. We adjust handling and agitation to the material rather than using the same approach on every piece.

## Stain treatment, extraction and rinsing

Stain treatment is included where needed. We assess the marks and use suitable products and handling to try to improve them. A thorough clean also recovers loosened soil and cleaning solution with professional extraction equipment and rinsing appropriate to the upholstery.

Included treatment isn't a guarantee that every mark will disappear. Older spills, previous products, colour changes and wear can affect the final appearance. We explain what is realistic before starting. Our [stain-removal guide](/blog/how-to-remove-stain-from-couch/) explains why the cause and fabric both matter.

## Deodorizing, sanitizing and drying assistance

Deodorizing and sanitizing are included, with products and handling selected for the material. Please mention sensitivities, pets or particular product concerns before the visit so we can discuss the approach with you.

We use air movers while we work to help the upholstery begin drying. Most sofas take around six to eight hours to dry, although thick cushions and room conditions can make it longer. We'll explain how to position cushions and keep air moving. See [how long a couch takes to dry](/blog/how-long-does-a-couch-take-to-dry-after-cleaning/) for practical aftercare.

## How do I know what my quote covers?

List the furniture and any additional pieces you'd like cleaned. Describe the size or layout, plus marks, odours or access concerns. Photos are helpful if you'd like to send them, but they're optional.

We provide a written total with tax included before booking. Parking and any furniture movement are clarified with you. If the requested items or treatment change, discuss the revised work before going ahead. Payment is collected after the service is complete.

## Planning a sofa-cleaning visit in the GTA?

SoftNest cleans sofas, sectionals and other suitable upholstered furniture across the GTA and Hamilton. [Request a written quote](/quote/) or [find your service area](/location/). Our [preparation guide](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) explains what to arrange before we arrive.

## Frequently Asked Questions

### Are both sides of removable cushions included?

Yes, where they are accessible and the material is suitable. Tell us about unusual cushions or construction when asking for the quote.

### Are stains included in the clean?

Stain treatment is included where needed. The result depends on the fabric, the mark and its history, so complete removal isn't guaranteed.

### Is the sofa dry when you leave?

Not necessarily. Air movers help while we work, but the furniture usually needs further drying time. Wait until it is fully dry before using it.
`, ["sofa-cleaning", "upholstery-cleaning", "sectional-furniture-cleaning"]);

create("how-to-prepare-for-upholstery-and-carpet-cleaning", "How to Prepare for Sofa and Carpet Cleaning", `
You don't need to clean the house before the cleaner arrives. A clear route, a few practical access details and room for the furniture to dry are the main things that help an upholstery or carpet-cleaning appointment run smoothly.

Here's how to prepare for a SoftNest visit, whether we're cleaning a sofa, a sectional or carpeted areas in your home.

## Before the appointment: confirm the items and access

Check that the furniture and carpet areas you want cleaned are listed in the written quote. Mention separate chairs, ottomans, decorative pillows, stairs and landings rather than assuming they're part of another item.

Tell us about parking, entry arrangements and any building rules. We confirm parking with you. For a condo, let us know about service elevators, loading access or permitted service hours before the appointment. We also clarify furniture movement if it's needed; there's no need to start lifting heavy pieces yourself.

## Clear small belongings and leave a route to the work area

Put away throws, toys, loose objects and fragile items near the furniture or carpet. Keep a clear route from the entrance to the areas being cleaned so equipment and hoses can be positioned carefully.

If you have loose cushions or pillows you want cleaned, leave them available and point them out. A removable cover shouldn't be taken off and washed just because it has a zip; follow the furniture care instructions and discuss it with us first.

## Don't pre-treat the stains

There's no need to add a spot remover before we arrive. If you've already tried something, tell us what it was and roughly when you used it. A photo of the product label can help, but a description is fine.

Point out areas that concern you, even if you don't know what caused them. Mention pet accidents, returning stains, colour changes, loose seams or previous water rings. That helps us assess the material and choose the approach. Our [sofa-cleaning process guide](/blog/what-to-expect-when-softnest-cleans-your-sofa/) explains the checks we make.

## Arrange water access and a plan for the home

Please provide access to a sink with hot water or another suitable water supply. If access is unusual, tell us beforehand so we can discuss the setup.

You can stay home while we work or arrange access with us if you'll be out. The important part is agreeing how we enter, which areas are being cleaned and how to reach you if a question comes up. Keep children and pets away from the work area and off damp upholstery or carpet until it is ready to use.

## Expect a reminder and a message before arrival

We'll remind you the day before the appointment and text around 20–30 minutes before arriving. Let us know if access or your plans change so we can discuss it before reaching the property.

Many sofa cleans take around one to two hours, although larger pieces, extra items and more involved treatment can take longer. Ask about your planned visit if timing is important, and leave space afterwards for drying.

## Plan for drying after the clean

Most sofas take around six to eight hours to dry; most carpets take around four to eight hours. The material, padding, humidity and airflow can extend those estimates. We use air movers while working and explain the drying plan before we leave.

Keep upholstery uncovered, follow our cushion-positioning advice and avoid replacing throws or walking furniture back across damp areas until advised. Use gentle room airflow rather than concentrated heat. Our [sofa drying guide](/blog/how-long-does-a-couch-take-to-dry-after-cleaning/) has more detail.

## A simple appointment checklist

- Check the quoted items and areas.
- Confirm parking, entry and any building arrangements.
- Clear small belongings and a route to the work area.
- Arrange access to a suitable water supply.
- Tell us about stains, previous products and any sensitivities.
- Agree access if you'll be out and leave time for drying.

If you're still planning the visit, [request a written quote](/quote/) for upholstery or carpet cleaning in the GTA and Hamilton. Photos are welcome, but optional.
`, ["sofa-cleaning", "upholstery-cleaning", "carpet-area-rug-cleaning", "stairs-hallways-cleaning"]);

create("stains-or-odours-after-professional-cleaning", "Stains or Odours After Cleaning? Here's What to Do", `
If a mark or smell concerns you after professional upholstery or carpet cleaning, get in touch with the cleaner rather than immediately adding another product. What you notice, when it appeared and whether the area is fully dry can help explain the next step.

After a SoftNest appointment, you can call or message us to talk through a concern. You don't need to diagnose the problem yourself. We'll review what you're seeing or smelling with you and discuss what happens next.

## First, check whether the area is still drying

Damp fabric can look darker, and cushion edges or seams may dry more slowly than the middle. The appearance during drying isn't always the final result. Use the estimate and aftercare advice we gave you for the item.

Most sofas take around six to eight hours to dry, and most carpets around four to eight hours, sometimes longer depending on conditions. If an area is staying damp beyond the estimate, contact us and describe where it is. Don't cover it with a throw or use a hair dryer or strong heat to speed things up.

## If a stain becomes visible again

A returning mark can have more than one cause. Moisture may carry material towards the surface during drying, previous cleaning-product residue may still affect the area, or a colour or texture change may become more noticeable as the fabric dries.

That is why it helps to look at the shape, colour and feel instead of treating every mark the same way. Our guide to [why couch stains come back](/blog/why-did-my-couch-stain-come-back-after-cleaning/) explains wicking and other possibilities. Let us know what changed before applying more cleaner.

## If an odour remains

Tell us whether the odour is in the area treated, whether it changed after drying and whether there have been repeated spills or pet accidents. An odour source can sometimes be below the accessible upholstery or carpet, which affects what another treatment may reach.

Our [pet-odour guide](/blog/how-to-remove-pet-urine-smell-from-couch/) explains why surface appearance and deeper contamination can tell different stories. Deodorizing and sanitizing are included in our upholstery clean, but the outcome for a particular accident still depends on its depth, history and the material.

## What to send or tell SoftNest

- Which item or area was cleaned and when.
- What concerns you: a mark, smell, damp patch or change in feel.
- Whether the area is fully dry and when you first noticed the concern.
- Whether anything has been applied or spilled there since the visit.
- A photo if convenient; it is optional.

A description is enough to start the conversation. If you've already tried another product, tell us which one so we can take that into account.

## How we discuss the next step

We review the concern with you in the context of the material, the work agreed and the original condition. Depending on what remains, we can discuss whether another assessment or treatment makes sense and clarify the proposed work before anything further is arranged.

Cleaning and restoration are different things. Everyday soil may improve while existing wear, colour loss or damage remains. We aim to explain those distinctions clearly rather than promising that every concern can be fixed with another cleaning pass.

## Keep the aftercare advice handy

Leave upholstery uncovered, keep people and pets away until the area is ready to use and follow the airflow advice given for your home. If you're unsure, ask us. The goal is a clear next step and a useful conversation, not leaving you to experiment with the furniture.

[Contact SoftNest about your cleaning](/card/). For a new appointment, [request a written quote](/quote/) or read [what our sofa cleaning includes](/blog/what-is-included-in-sofa-cleaning/).
`, ["sofa-cleaning", "upholstery-cleaning", "pet-stain-odour-removal", "carpet-area-rug-cleaning"]);

create("what-to-expect-from-professional-carpet-cleaning", "What to Expect from Professional Carpet Cleaning at Home", `
Professional carpet cleaning should leave you clear about the areas being cleaned, how the work is done and when you can use the rooms again. At SoftNest Fabric Care, we start with a written quote and practical access details, then choose the cleaning approach for the carpet and its condition.

This guide covers residential fitted carpet, stairs, hallways and suitable area rugs cleaned in your home across the GTA and Hamilton.

## Before booking: describe the areas you want cleaned

Give approximate room measurements or total carpeted area, plus separate rug dimensions. List stairs, landings and hallways rather than assuming they are included in a room count. If you don't know the measurements, tell us what you can and we'll clarify what is needed.

Mention spots, traffic lanes, pet accidents and previous cleaning products. Photos are welcome but optional. We confirm the agreed work and written total, including tax, before booking, and clarify parking and any furniture movement with you.

## Prepare access without moving heavy furniture yourself

Clear toys, small belongings and fragile items near the work area. Leave a route for equipment and hoses. Tell us which areas are covered by beds, loaded shelves or other heavy furniture so we can agree what is accessible.

Please arrange access to a sink with hot water or another suitable supply. For a condo, discuss elevator bookings, loading access and service-hour rules before the appointment. We remind you the day before and text around 20–30 minutes before arriving. Our [preparation checklist](/blog/how-to-prepare-for-upholstery-and-carpet-cleaning/) brings the details together.

## We check the material, backing and condition

Carpet fibre, backing, edges, installation and existing wear all affect the approach. Point out concerns when we arrive, including marks that have returned after earlier cleaning or patches where the colour has changed.

An area rug needs its own assessment. Some materials, dyes or backings aren't suitable for on-site cleaning. If a rug needs specialist care, we explain that before booking rather than treating every rug like fitted synthetic carpet.

## Dry soil, spots and busy walkways need different attention

Vacuuming first where needed helps remove dry debris. Suitable spots and heavily used areas receive treatment based on their condition. Appropriate agitation can help loosen soil before rinsing and extraction.

Dry vacuuming remains important between appointments. Professional cleaning adds treatment for suitable spots, oily buildup and residues that routine vacuuming may leave behind. Read [what vacuuming can and can't do](/blog/does-vacuuming-clean-carpet/) for that distinction.

## Rinsing and extraction recover the loosened material

Where hot-water extraction is suitable, professional equipment applies and recovers cleaning solution and moisture along with loosened soil. The method and handling should suit the carpet instead of relying on heavy saturation.

We pay attention to edges and transitions into other flooring and discuss the result and aftercare. Everyday soil can improve, while worn pile, colour changes or deeper contamination may still show. Included spot treatment is not a promise that every mark will disappear.

## How long does carpet take to dry?

Most carpets take around four to eight hours to dry, although thick pile, humidity and limited airflow can make it longer. We explain the estimate for your rooms and how to help air move through the space.

Keep children and pets away while we work and until the area is ready to use. Follow the advice about walking on the carpet and replacing furniture. Damp carpet next to smooth flooring needs extra care underfoot. Don't add covers or use concentrated heat to force drying.

## What if a mark or odour remains?

Contact us and describe what you notice, when it became visible and whether the carpet is fully dry. Avoid adding another spot remover while we discuss the concern. Our [after-cleaning guide](/blog/stains-or-odours-after-professional-cleaning/) explains what information helps us review the result with you.

## Request a carpet-cleaning quote

[Tell SoftNest what you'd like cleaned](/quote/) and your city or postal code. We serve homes across the GTA and Hamilton; [check our service areas](/location/) if you're unsure about your address. You can ask for a written quote before deciding on an appointment.
`, ["carpet-area-rug-cleaning", "stairs-hallways-cleaning", "pet-stain-odour-removal"]);

const metadata = {
  "how-to-remove-stain-from-couch": ["How to Remove a Stain from a Couch | SoftNest", "Blot a couch spill safely, avoid common fabric-cleaning mistakes and learn when to ask SoftNest for upholstery stain advice in the GTA."],
  "why-did-my-couch-stain-come-back-after-cleaning": ["Why Couch Stains Come Back After Cleaning | SoftNest", "Learn why couch stains return after drying, how wicking differs from residue, and what to do before adding another upholstery cleaner."],
  "what-cleaning-solution-can-i-use-on-my-couch": ["What Cleaner Can I Use on My Couch? | SoftNest", "Choose upholstery products with care. Understand fabric labels, hidden-area tests and residue before trying a cleaning solution on your couch."],
  "why-sofa-armrests-get-dirty-faster": ["Why Sofa Armrests Get Dirty Faster | SoftNest", "Dark sofa armrests can hold body oils and everyday soil. Learn why vacuuming has limits and how professional upholstery cleaning treats these areas."],
  "does-vacuuming-clean-carpet": ["Does Vacuuming Really Clean Carpet? | SoftNest", "See what vacuuming removes, what it can leave behind and when professional carpet cleaning can help with traffic lanes, spots and residues."],
  "how-to-remove-pet-urine-smell-from-couch": ["Pet Urine Smell in a Couch: What to Do | SoftNest", "Learn what to do after a pet accident on a sofa, why odours can return and how fabric and contamination depth affect upholstery treatment."],
  "how-often-should-office-carpets-be-cleaned": ["How Often Should Office Carpets Be Cleaned? | SoftNest", "Plan office carpet cleaning around traffic, GTA winters, access and drying. Learn what details help SoftNest prepare a written business quote."],
  "how-long-does-a-couch-take-to-dry-after-cleaning": ["How Long Does a Couch Take to Dry? | SoftNest", "Most sofas take about six to eight hours to dry after cleaning. Learn what can extend drying, how to help airflow and when to contact SoftNest."],
  "how-to-know-when-your-sofa-needs-professional-cleaning": ["Signs Your Sofa Needs Professional Cleaning | SoftNest", "Spot signs of sofa soil, odours and everyday buildup, understand cleaning limits and see what SoftNest includes in an upholstery-cleaning visit."],
  "upholstery-cleaning-prices-toronto": ["Upholstery Cleaning Prices in Toronto | Written Quotes", "Get a written SoftNest upholstery-cleaning quote for Toronto and the GTA. See what's included, what affects the price and how tax and parking are handled."],
  "what-to-expect-when-softnest-cleans-your-sofa": ["What to Expect from SoftNest Sofa Cleaning", "From your written quote and arrival message to extraction, rinsing and drying, see how a SoftNest sofa-cleaning appointment works."],
  "how-to-find-a-reliable-sofa-and-carpet-cleaning-company": ["Choosing a Sofa & Carpet Cleaner in Halton and Peel", "Compare sofa and carpet cleaners in Oakville, Milton, Burlington and Mississauga with clear checks for quotes, inclusions, access and drying."],
  "fears-about-hiring-a-sofa-cleaner": ["Questions Before Booking Sofa Cleaning | SoftNest", "Get clear answers about SoftNest sofa-cleaning quotes, included work, arrival messages, home preparation, drying and questions after your visit."],
  "how-to-choose-an-upholstery-cleaning-company": ["How to Choose an Upholstery Cleaning Company | SoftNest", "Compare upholstery cleaners by written price, included treatment, fabric assessment, care inside your home and clear follow-up before booking."],
  "what-is-included-in-sofa-cleaning": ["What's Included in Sofa Cleaning? | SoftNest", "See what's included in SoftNest sofa cleaning: accessible upholstery and cushions, stain treatment, extraction, rinsing, deodorizing and drying support."],
  "how-to-prepare-for-upholstery-and-carpet-cleaning": ["Prepare for Sofa & Carpet Cleaning | SoftNest", "Prepare for a SoftNest cleaning visit with simple advice on access, parking, water supply, furniture, pets, arrival messages and drying."],
  "stains-or-odours-after-professional-cleaning": ["Stains or Odours After Cleaning? | SoftNest", "Have a concern after upholstery or carpet cleaning? Learn what to check during drying, what details to share and how to contact SoftNest."],
  "what-to-expect-from-professional-carpet-cleaning": ["Professional Carpet Cleaning: What to Expect | SoftNest", "Plan carpet cleaning at home with SoftNest. Understand the quote, access, spots, extraction, suitable rugs, drying and what to do after the visit."],
};
post("upholstery-cleaning-prices-toronto").title = "Upholstery Cleaning Prices in Toronto: How Our Written Quotes Work";
post("fears-about-hiring-a-sofa-cleaner").title = "Your Questions Before Booking Sofa Cleaning with SoftNest";
post("how-to-find-a-reliable-sofa-and-carpet-cleaning-company").title = "Choosing a Sofa and Carpet Cleaner in Oakville, Milton, Burlington and Mississauga";

const imageSourcesPath = "artifacts/article-image-sources.json";
const images = fs.existsSync(imageSourcesPath) ? JSON.parse(fs.readFileSync(imageSourcesPath, "utf8")) : [];
for (const p of posts) {
  const slug = p.slug.current;
  const [seoTitle, description] = metadata[slug];
  p.seoTitle = seoTitle; p.seoDescription = description; p.excerpt = description;
  const folder = `content/articles/${slug}`;
  fs.mkdirSync(folder, { recursive: true });
  const coverPath = `${folder}/editorial-cover.webp`;
  const assetPath = `${folder}/cover-asset.json`;
  if (fs.existsSync(coverPath)) {
    const source = images.find(i => i.slug === slug);
    assert(source, `Missing image brief for ${slug}`);
    p.coverImage = { _type: "image", alt: source.alt,
      caption: "AI-generated editorial illustration; not a photograph of a SoftNest appointment.",
      width: 1536, height: 1024, ...(fs.existsSync(assetPath) ? { asset: JSON.parse(fs.readFileSync(assetPath, "utf8")) } : {}) };
    p.showCover = true;
  }
  fs.writeFileSync(`${folder}/post.json`, JSON.stringify(p, null, 2) + "\n");
  fs.writeFileSync(`${folder}/article.txt`, p.body.filter(b => b._type === "block").map(plain).join("\n\n") + "\n");
  fs.writeFileSync(`${folder}/README.md`, `# ${p.title}\n\nURL: /blog/${slug}/\n\nReviewed October 24, 2026. Natural-language editorial updates use the owner's confirmed written-quote, service-inclusion, preparation and arrival practices. No team profiles or fabricated project results. Cover: AI-generated editorial illustration, visibly disclosed on the article.\n`);
}
assert.equal(posts.length, 18);
const allDocuments = await client.fetch(websiteContentQuery);
const fabricServiceIds = new Set(["upholstery-cleaning", "sofa-cleaning", "sectional-furniture-cleaning", "dining-chair-cleaning", "armchair-cleaning"].map(slug => `service-${slug}`));
const serviceUpdates = allDocuments.filter(d => fabricServiceIds.has(d._id)).map(d => ({
  ...d, included: ["Checking the fabric and vacuuming accessible areas", "Stain treatment where needed", "Deep extraction cleaning and a thorough rinse", "Deodorizing and sanitizing suited to the material", "All accessible upholstery, including both sides of removable cushions where suitable", "Air movers while we work to help with drying"],
}));
const serviceBackupPath = "content/backups/before-booking-service-inclusions-2026-10-24.json";
if (!fs.existsSync(serviceBackupPath)) fs.writeFileSync(serviceBackupPath, JSON.stringify(allDocuments.filter(d => fabricServiceIds.has(d._id)), null, 2) + "\n");
const revisedIds = new Set(posts.map(p => p._id));
const merged = [...allDocuments.filter(d => !revisedIds.has(d._id) && !fabricServiceIds.has(d._id)), ...posts, ...serviceUpdates];
const normalized = normalizeContent(merged, config);
if (process.argv.includes("--preview")) {
  assert(!process.env.GITHUB_ACTIONS, "Editorial previews are local only.");
  const directory = "src/content/generated";
  fs.mkdirSync(directory, { recursive: true });
  for (const [name, value] of Object.entries(normalized)) fs.writeFileSync(`${directory}/${name}.json`, JSON.stringify(value, null, 2) + "\n");
  fs.writeFileSync(`${directory}/status.json`, JSON.stringify({ source: "editorial-preview", preview: true, generatedAt: new Date().toISOString() }) + "\n");
}
const seedPath = "content/migration/article-seed.json";
const oldSeed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const auxiliary = oldSeed.filter(d => d._type !== "post");
const knownAux = new Set(auxiliary.map(d => d._id));
for (const d of backup.filter(d => ["author", "category"].includes(d._type))) if (!knownAux.has(d._id)) { auxiliary.push(d); knownAux.add(d._id); }
fs.writeFileSync(seedPath, JSON.stringify([...posts, ...auxiliary], null, 2) + "\n");
const siteSeedPath = "content/migration/site-seed.json";
const siteSeed = JSON.parse(fs.readFileSync(siteSeedPath, "utf8"));
for (const document of siteSeed) {
  const revision = serviceUpdates.find(d => d._id === document._id);
  if (revision) document.included = revision.included;
}
fs.writeFileSync(siteSeedPath, JSON.stringify(siteSeed, null, 2) + "\n");

if (process.argv.includes("--apply")) {
  let transaction = client.transaction();
  for (const p of posts) {
    assert(p.coverImage?.asset?._ref, `Upload the new editorial cover first: ${p.slug.current}`);
    const old = originalPosts.find(d => d._id === p._id);
    if (old) {
      const { _id, _type, _rev, _createdAt, _updatedAt, _system, ...fields } = p;
      void _type; void _rev; void _createdAt; void _updatedAt; void _system;
      transaction = transaction.patch(_id, patch => patch.ifRevisionId(old._rev).set(fields));
    } else transaction = transaction.create(p);
  }
  for (const service of serviceUpdates) transaction = transaction.patch(service._id, patch => patch.ifRevisionId(service._rev).set({ included: service.included }));
  await transaction.commit();
  console.log("Published 14 revised articles and 4 new guides in one guarded transaction.");
} else console.log("Prepared 18 articles locally. CMS text has not been changed; use --apply after review and cover upload.");
