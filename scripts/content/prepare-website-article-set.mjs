import fs from "node:fs";

const articles = [
  {
    slug: "why-sofa-armrests-get-dirty-faster",
    title: "Why Do Sofa Armrests Get Dirty Faster?",
    seoTitle: "Why Sofa Armrests Get Dirty Faster | SoftNest",
    description:
      "Learn why sofa armrests darken faster than the rest of the couch, what the buildup contains, and how to clean them without leaving a patchy result.",
    publishedAt: "2026-09-10T12:00:00Z",
    order: 3,
    services: ["sofa-cleaning", "upholstery-cleaning"],
    body: [
      { text: "Sofa armrests are touched more than almost any other part of the furniture. Hands, forearms, sleeves and bare skin repeatedly contact the same narrow area, so it often looks darker or feels slightly greasy while the seat and back still appear clean." },
      { text: "That colour change is not always a single stain. It is usually a gradual layer of body oil, hand cream, dust and everyday residue that has bonded to the fibres. Understanding that difference helps explain why a quick wipe rarely produces an even result." },
      { style: "h2", text: "What Builds Up on Sofa Armrests?" },
      { text: "Skin naturally transfers oil and perspiration. Moisturizer, hair products, food residue and soil from clothing can add to it. Once that slightly oily film is present, airborne dust sticks to the fabric more readily. The armrest slowly becomes darker than the surrounding upholstery." },
      { text: "The effect is especially noticeable on light fabrics and on the front edge of an arm, where hands tend to rest. A household with children, pets or frequent guests may see the change sooner, but even carefully used furniture develops high-contact areas over time." },
      { style: "h2", text: "Why Vacuuming Helps—but Does Not Remove the Dark Area" },
      { text: "Vacuuming is useful for crumbs, pet hair and loose dust. It should be part of regular sofa care. A vacuum does not, however, dissolve the oily film holding fine soil to the fibres. The arm can remain dark even after the surface debris is gone." },
      { text: "This is why an armrest may look cleaner immediately after vacuuming but still appear dull beside the seat cushion. The remaining problem is bonded soil, not simply material sitting on top of the fabric." },
      { style: "h2", text: "Why Spot-Cleaning One Small Patch Can Look Uneven" },
      { text: "Treating only the darkest point can create a clean spot surrounded by gradual buildup. Too much cleaner may also leave a ring, residue or a different texture. On some fabrics, aggressive rubbing can disturb the nap and make the treated area reflect light differently." },
      { text: "Before using any liquid product, check the furniture care label and test an inconspicuous area. Our guide to choosing a couch cleaner explains why the fabric code and the ability to rinse the product matter.", link: { phrase: "guide to choosing a couch cleaner", href: "/blog/what-cleaning-solution-can-i-use-on-my-couch/" } },
      { style: "h2", text: "How to Slow Down Armrest Buildup" },
      { list: [
        "Vacuum the arms and seams regularly with an upholstery attachment.",
        "Wipe hands after applying lotion, handling food or working with oily products.",
        "Wash removable arm covers according to their care instructions.",
        "Rotate how the sofa is used when practical so one seat does not receive all the contact.",
        "Arrange professional cleaning before the armrests become heavily compacted with soil."
      ] },
      { text: "Avoid covering an arm with a towel that transfers dye or traps moisture. A washable, colourfast arm cover made for the furniture is a better option when extra protection is needed." },
      { style: "h2", text: "How Professionals Clean High-Contact Areas" },
      { text: "During upholstery cleaning, armrests and headrests usually need more attention than lightly used panels. We inspect the fabric, choose an appropriate pre-treatment, allow time for the buildup to loosen, gently agitate where the material permits, and then rinse and extract the released soil." },
      { text: "The objective is an even overall result—not an unnaturally bright patch. That is why the surrounding panel may be cleaned along with the visibly dark area. Old dye loss, wear or permanent fibre damage can remain after the removable soil is gone, so realistic expectations still matter." },
      { style: "h2", text: "When Is It Time to Have the Sofa Cleaned?" },
      { text: "Consider a professional assessment when the arms feel tacky, look distinctly darker, hold an odour or no longer improve with vacuuming. It is also wise to stop experimenting if a home treatment creates a ring, fading or a rough patch." },
      { text: "SoftNest Fabric Care cleans sofas and upholstered furniture in Mississauga and across the Greater Toronto Area. Photos of the full sofa, the armrest and the care label help us understand the fabric and recommend a sensible next step." },
      { style: "h2", text: "Frequently Asked Questions" },
      { style: "h3", text: "Why is one sofa arm dirtier than the other?" },
      { text: "That is usually the side used most often or the side beside a walkway, table or favourite seat. Repeated contact concentrates body oils and soil in that area." },
      { style: "h3", text: "Can I use dish soap on a greasy armrest?" },
      { text: "Dish soap is not suitable for every upholstery fabric and can be difficult to rinse from a cushion. Follow the furniture and product instructions, test first and avoid saturating the arm." },
      { style: "h3", text: "Does a dark armrest always mean it is dirty?" },
      { text: "Not always. Wear, dye loss and a changed fabric nap can also look dark. Cleaning removes soil; it cannot always reverse permanent material changes." }
    ]
  },
  {
    slug: "does-vacuuming-clean-carpet",
    title: "Does Vacuuming Really Clean Carpet?",
    seoTitle: "Does Vacuuming Clean Carpet? What It Leaves Behind | SoftNest",
    description:
      "Vacuuming removes loose surface soil, but deeper residue can remain. Learn what regular vacuuming does well and when carpet needs professional cleaning.",
    publishedAt: "2026-09-11T12:00:00Z",
    order: 4,
    services: ["carpet-area-rug-cleaning", "stairs-hallways-cleaning"],
    body: [
      { text: "Regular vacuuming is the most important routine step for carpet care. It picks up crumbs, hair, grit and loose dust before they work farther into the pile. But a carpet can be thoroughly vacuumed and still hold oily residue, compacted soil and odour deeper in the fibres." },
      { text: "The useful distinction is maintenance versus restorative cleaning. A vacuum maintains the surface. Professional carpet cleaning is intended to release and recover material that ordinary dry vacuuming cannot remove." },
      { style: "h2", text: "What a Vacuum Removes Well" },
      { list: [
        "loose dust and dry soil near the surface;",
        "crumbs, lint and much of the visible pet hair;",
        "grit before it settles into traffic lanes;",
        "debris along open, accessible areas of the carpet."
      ] },
      { text: "A well-maintained vacuum, slow overlapping passes and the correct height setting all improve recovery. Edges, stairs and areas under furniture may need a crevice or upholstery tool rather than the main floor head." },
      { style: "h2", text: "What Vacuuming Commonly Leaves Behind" },
      { text: "Fine particles can settle near the base of the pile, especially where feet repeatedly press them down. Body oils, cooking residue, tracked-in moisture and old spotting products can bind soil to the fibres. Once the contamination is sticky or embedded, airflow alone may not lift it." },
      { text: "That remaining material can make carpet look grey, feel less soft or develop an odour even when no obvious debris is visible. High-traffic paths usually change first because they receive both more soil and more physical wear." },
      { style: "h2", text: "Why Traffic Lanes Stay Dark After Vacuuming" },
      { text: "A traffic lane can contain removable soil and permanent wear at the same time. Deep cleaning may improve the colour substantially by removing residue, but it cannot rebuild fibres that have been crushed, abraded or faded." },
      { text: "This is why the best time to clean is before the path becomes extremely dark. Waiting until the difference is dramatic can make it harder to separate soil from wear and may limit how even the final appearance can be." },
      { style: "h2", text: "What Professional Carpet Cleaning Adds" },
      { text: "A professional process begins with inspection and dry-soil removal. Spots and traffic areas are treated according to their condition, the carpet is agitated when appropriate, and controlled rinsing and extraction recover loosened soil, cleaning solution and moisture." },
      { text: "The word “professional” does not mean soaking the carpet. The cleaning method, chemistry and moisture level should match the fibre, construction and installation. Drying conditions are part of the plan as well." },
      { style: "h2", text: "Signs That Vacuuming Is No Longer Enough" },
      { list: [
        "traffic lanes remain dull immediately after vacuuming;",
        "the carpet feels sticky, stiff or less soft than before;",
        "spots return or attract soil quickly;",
        "odours remain after the room has been aired out;",
        "the carpet has gone a long time without a deeper clean."
      ] },
      { style: "h2", text: "How to Keep Carpet Cleaner Between Appointments" },
      { text: "Vacuum busy areas more frequently than rooms that are rarely used. Use entrance mats, remove outdoor footwear when practical, and blot fresh spills rather than scrubbing them into a wider area. Empty or replace vacuum filters and bags as recommended so airflow remains effective." },
      { text: "If you use a spot cleaner, follow the carpet and product instructions and apply as little as the task requires. Residue left after repeated spraying can make the area soil faster." },
      { style: "h2", text: "Carpet Cleaning in Mississauga and the GTA" },
      { text: "SoftNest Fabric Care provides carpet, area rug, stair and hallway cleaning across Mississauga and the Greater Toronto Area. For an estimate, send clear photos plus the approximate room or hallway dimensions and tell us about any stains, odours or previous treatments." },
      { style: "h2", text: "Frequently Asked Questions" },
      { style: "h3", text: "How often should carpet be vacuumed?" },
      { text: "Busy entrances, family rooms and pet areas may need several passes each week, while lower-use rooms may need less. The right schedule depends on traffic, occupants and how quickly dry soil appears." },
      { style: "h3", text: "Can professional cleaning remove every dark traffic lane?" },
      { text: "It can remove embedded soil, but permanent wear, fading and crushed fibres may remain. An inspection helps distinguish contamination from damage." },
      { style: "h3", text: "Should carpet be vacuumed before professional cleaning?" },
      { text: "Removing loose items and obvious debris is helpful. Ask your cleaner whether they want you to vacuum first, because the planned service may already include dry-soil removal." }
    ]
  },
  {
    slug: "how-to-remove-pet-urine-smell-from-couch",
    title: "How to Remove Pet Urine Smell from a Couch",
    seoTitle: "How to Remove Pet Urine Smell from a Couch | SoftNest",
    description:
      "Learn what to do after a pet accident on a couch, why urine odour returns, and when contamination inside the cushion needs professional treatment.",
    publishedAt: "2026-09-12T12:00:00Z",
    order: 5,
    services: ["pet-stain-odour-removal", "sofa-cleaning", "upholstery-cleaning"],
    body: [
      { text: "A pet accident on a sofa can travel farther than the visible wet spot. Urine may pass through the face fabric into the backing, batting and cushion foam. Cleaning only the surface can improve the appearance while leaving the source of the odour deeper inside." },
      { text: "The best response is prompt and controlled: absorb what you can, avoid spreading the liquid, check the furniture care instructions and resist the urge to cover the area with several different products." },
      { style: "h2", text: "What to Do Right After the Accident" },
      { list: [
        "Remove any washable cover only if the manufacturer says it can be removed and cleaned separately.",
        "Press clean white towels onto the wet area and replace them as they absorb moisture.",
        "Blot from the outside toward the centre instead of rubbing across the fabric.",
        "Check the upholstery care label before applying a liquid treatment.",
        "Keep pets and people off the cushion while it dries."
      ] },
      { text: "Do not press so hard that you drive more liquid into the foam. If the accident is large, the cushion feels wet below the surface or the urine reached a fixed seat, professional advice is usually more useful than repeated surface spraying." },
      { style: "h2", text: "Why the Urine Smell Comes Back" },
      { text: "The top fabric often dries first. Contamination that remains in the inner layers can continue producing odour, especially when humidity rises or the cushion is compressed during use. Fragrance may temporarily cover the smell without removing its source." },
      { text: "A returning odour can also mean the treated area was not rinsed and extracted. Cleaner, urine residue and moisture may all remain in the cushion. This is similar to a visible stain that reappears after drying, although odour treatment may need to reach deeper layers.", link: { phrase: "stain that reappears after drying", href: "/blog/why-did-my-couch-stain-come-back-after-cleaning/" } },
      { style: "h2", text: "Why More Product Is Not Always Better" },
      { text: "Pouring enzyme cleaner or deodorizer into a cushion can make it wetter without guaranteeing contact with every contaminated area. The product still needs to be suitable for the upholstery and used at the correct concentration. Excess residue can leave the fabric stiff, sticky or prone to resoiling." },
      { text: "Do not mix household cleaners. Besides creating unpredictable reactions, multiple products make it harder to determine what is inside the fabric when professional treatment becomes necessary." },
      { style: "h2", text: "Can an Enzyme Cleaner Remove Couch Urine?" },
      { text: "An upholstery-approved enzyme product can help with some organic contamination when used exactly as directed. It is not automatically safe for every fibre or dye, and a small surface application may not reach urine in the foam. Test a hidden area and follow both the furniture and product instructions." },
      { text: "If the sofa has an X cleaning code, the fabric is delicate or unknown, or colour transfers onto a white towel, stop before applying a water-based treatment." },
      { style: "h2", text: "What Professional Pet-Odour Treatment Involves" },
      { text: "The first step is assessing how far the accident travelled. Treatment may include a urine-specific product, appropriate dwell time, controlled rinsing and extraction, and additional attention to the cushion interior where access is possible." },
      { text: "No responsible cleaner should promise that every odour can be removed without seeing the furniture. Repeated accidents, inaccessible cushion cores, sensitive fabric and contamination that reached wood or other structural material can limit the result. In severe cases, replacing the cushion insert may be more practical than repeatedly wetting it." },
      { style: "h2", text: "When to Call for Help" },
      { list: [
        "the odour returns after the sofa dries;",
        "the cushion is wet or contaminated below the surface;",
        "several products have already been applied;",
        "a water ring, colour change or stiff patch is developing;",
        "the sofa has repeated accidents in the same area."
      ] },
      { style: "h2", text: "Pet Stain and Odour Treatment in the GTA" },
      { text: "SoftNest Fabric Care provides pet stain and odour treatment for sofas and upholstery in Mississauga and across the Greater Toronto Area. Send photos of the affected area and care label, describe when the accident happened, and list any products already used. That information helps us set realistic expectations before the visit." },
      { style: "h2", text: "Frequently Asked Questions" },
      { style: "h3", text: "Will the urine smell disappear when the couch dries?" },
      { text: "Surface moisture may dry while urine residue remains in the cushion. If the source is still present, the odour can return with humidity or use." },
      { style: "h3", text: "Can baking soda remove pet urine from a sofa?" },
      { text: "Baking soda may absorb some surface odour, but it does not reliably remove contamination inside a cushion and is not appropriate for every material. Follow the furniture care instructions." },
      { style: "h3", text: "Can an old pet urine stain still be treated?" },
      { text: "Often it can be improved, but age, previous products, dye change and depth all affect the outcome. Permanent discolouration or inaccessible contamination may remain." }
    ]
  },
  {
    slug: "how-often-should-office-carpets-be-cleaned",
    title: "How Often Should Office Carpets Be Professionally Cleaned?",
    seoTitle: "How Often Should Office Carpets Be Cleaned? | SoftNest",
    description:
      "A practical office carpet-cleaning schedule for low-, medium- and high-traffic workplaces, including winter conditions in the Greater Toronto Area.",
    publishedAt: "2026-09-13T12:00:00Z",
    order: 6,
    services: ["carpet-area-rug-cleaning", "stairs-hallways-cleaning"],
    body: [
      { text: "Most offices benefit from professional carpet cleaning every 6 to 12 months, but that range is only a starting point. A quiet private office and a busy reception area do not collect soil at the same rate. Entrances, hallways, shared kitchens and desk-chair zones often need attention sooner than low-traffic rooms." },
      { text: "The most useful plan is based on actual traffic, weather exposure and appearance—not a single date applied to the entire workplace." },
      { style: "h2", text: "A Practical Cleaning Schedule" },
      { list: [
        "Every 3–6 months: busy entrances, public-facing offices, medical or service environments, and workplaces with heavy foot traffic.",
        "Every 6–12 months: typical offices with steady daily use and effective vacuuming and entrance-mat programs.",
        "As needed between full cleanings: visible spots, salt marks, spills and heavily used paths before they spread or become difficult to remove."
      ] },
      { text: "These intervals are planning guides rather than guarantees. Carpet fibre, colour, installation, occupancy and building rules can all change the appropriate schedule." },
      { style: "h2", text: "Why GTA Winters Often Shorten the Interval" },
      { text: "Snow, slush, road salt and fine grit are tracked through entrances during Ontario winters. Moisture helps soil stick to fibres, while repeated foot traffic pushes particles deeper into the pile. Pale salt marks may remain even after dry vacuuming." },
      { text: "Good entrance matting and frequent vacuuming reduce the load, but they do not eliminate it. Scheduling an interim entrance and traffic-lane cleaning during winter can be more efficient than waiting for the entire office to look dull." },
      { style: "h2", text: "Signs the Carpet Needs Cleaning Earlier" },
      { list: [
        "traffic lanes remain grey after vacuuming;",
        "spots reappear or collect soil quickly;",
        "salt or moisture marks are visible near entrances;",
        "the carpet feels sticky or matted;",
        "odours remain in enclosed areas;",
        "an important client visit, inspection or tenant turnover is approaching."
      ] },
      { style: "h2", text: "Daily and Weekly Maintenance Still Matter" },
      { text: "Professional cleaning works best as part of a maintenance program. Vacuum high-traffic areas frequently, keep equipment filters and bags in good condition, use adequate entrance matting, and respond to spills promptly. A vacuum handles loose dry soil; deeper cleaning addresses residue and embedded contamination that vacuuming leaves behind.", link: { phrase: "vacuuming leaves behind", href: "/blog/does-vacuuming-clean-carpet/" } },
      { text: "Record recurring spots and the dates of previous cleanings. That history makes it easier to adjust the schedule and identify areas where a protective mat, furniture layout change or more frequent maintenance would help." },
      { style: "h2", text: "Clean the Whole Office or Only High-Traffic Areas?" },
      { text: "A full cleaning creates the most consistent appearance, but interim maintenance can target entrances, hallways and other busy zones. The right choice depends on how uneven the soil is, how long it has been since the last complete service and whether furniture must be moved." },
      { text: "For occupied offices, the cleaning plan should also consider access, noise, drying time and when employees can safely return to each area. After-hours or staged cleaning may reduce disruption." },
      { style: "h2", text: "What to Include When Requesting an Estimate" },
      { list: [
        "approximate carpeted square footage;",
        "photos of entrances, traffic lanes and major spots;",
        "the number of stairs, offices and open work areas;",
        "parking, elevator and after-hours access details;",
        "the preferred service window and any building requirements."
      ] },
      { style: "h2", text: "Office Carpet Cleaning Across the GTA" },
      { text: "SoftNest Fabric Care provides commercial carpet cleaning in Mississauga and surrounding Greater Toronto Area communities. We can help assess traffic patterns and build a practical plan for a one-time refresh or recurring maintenance." },
      { style: "h2", text: "Frequently Asked Questions" },
      { style: "h3", text: "Is annual carpet cleaning enough for an office?" },
      { text: "It may be enough for a lower-traffic workplace with strong routine maintenance. Busy entrances and public areas often need cleaning more frequently." },
      { style: "h3", text: "How long should office carpet dry?" },
      { text: "Drying time varies with the carpet, method, soil level, ventilation, temperature and humidity. Your cleaner should explain the expected conditions and when the area can return to normal use." },
      { style: "h3", text: "Can only the entrance and hallways be cleaned?" },
      { text: "Yes, targeted interim cleaning can maintain high-traffic areas between full services, provided the result will remain visually consistent with nearby carpet." }
    ]
  },
  {
    slug: "how-long-does-a-couch-take-to-dry-after-cleaning",
    title: "How Long Does a Couch Take to Dry After Cleaning?",
    seoTitle: "How Long Does a Couch Take to Dry After Cleaning? | SoftNest",
    description:
      "Most professionally cleaned couches dry the same day, but fabric, cushions and room conditions matter. Learn what affects drying and how to help safely.",
    publishedAt: "2026-09-14T12:00:00Z",
    order: 7,
    services: ["sofa-cleaning", "upholstery-cleaning", "sectional-furniture-cleaning"],
    body: [
      { text: "Many professionally cleaned couches dry later the same day, but there is no single drying time that applies to every sofa. Fabric thickness, cushion construction, the amount of soil, the cleaning method, airflow, temperature and humidity all affect how quickly moisture leaves the upholstery." },
      { text: "A responsible estimate is therefore a range explained after inspection, not a promise based only on the size of the couch." },
      { style: "h2", text: "What Affects Upholstery Drying Time?" },
      { style: "h3", text: "Fabric and cushion construction" },
      { text: "A thin synthetic fabric may release moisture faster than a dense natural fibre or a heavily padded cushion. Fixed seats, tufting, piping and layered materials can also slow airflow through parts of the furniture." },
      { style: "h3", text: "How much cleaning the sofa needs" },
      { text: "Heavily soiled arms, old spots or contamination below the surface may require additional treatment and rinsing. The aim is still controlled moisture, but a more involved cleaning can take longer to dry than a light maintenance service." },
      { style: "h3", text: "Room conditions" },
      { text: "Warm, dry moving air supports evaporation. High humidity, a cold room and closed windows with little air movement slow it down. Basement furniture often dries differently from a sofa in a bright, well-ventilated room." },
      { style: "h2", text: "Why Professional Extraction Matters" },
      { text: "Cleaning solution loosens contamination; extraction removes that solution along with suspended soil and moisture. Multiple dry extraction passes can recover more liquid without adding more water. This helps shorten drying time and reduces the amount left inside the fabric." },
      { text: "Faster is not the only goal. The upholstery must also be rinsed adequately so that loosened soil and cleaner are not left behind. Good cleaning balances treatment, rinsing, recovery and fabric safety." },
      { style: "h2", text: "Why We Use Air Movers" },
      { text: "Air movers keep dry air passing over damp upholstery. They can speed evaporation and help different parts of the sofa dry more evenly. Drying also gives the cleaner a chance to inspect the result as the true colour returns and any remaining spot becomes easier to see." },
      { text: "This final inspection matters because wet fabric often looks darker and can temporarily hide a water mark or returning stain. Our guide to couch-stain wicking explains why some marks become visible again during drying.", link: { phrase: "guide to couch-stain wicking", href: "/blog/why-did-my-couch-stain-come-back-after-cleaning/" } },
      { style: "h2", text: "How to Help Your Couch Dry Safely" },
      { list: [
        "Keep ceiling fans or room fans running when it is safe to do so.",
        "Use heating, air conditioning or a dehumidifier to maintain comfortable, dry indoor air.",
        "Leave removable cushions positioned as the cleaner recommends so air can reach more surfaces.",
        "Keep people, pets, blankets and protective covers off the upholstery until it is dry.",
        "Avoid placing damp cushions directly against wood, metal or another fabric that could transfer colour."
      ] },
      { text: "Do not use a hair dryer, space heater or other concentrated heat source on the fabric. Excessive heat can affect fibres, dyes, backing or foam and can create a safety risk." },
      { style: "h2", text: "How Can You Tell Whether the Sofa Is Dry?" },
      { text: "Check more than the centre of the seat. Feel the seams, piping, front edge, arms and the underside of removable cushions. The upholstery should feel consistent with the surrounding room—not cool or damp in isolated areas—and should not release moisture onto a clean dry towel pressed gently against it." },
      { text: "If one area remains damp much longer than expected, contact the cleaner rather than covering it or using strong heat. The cause may be limited airflow, deeper treatment or moisture retained in a cushion layer." },
      { style: "h2", text: "When Can You Sit on the Couch Again?" },
      { text: "Wait until the upholstery is fully dry. Sitting too soon compresses damp layers, slows airflow and can transfer colour from clothing. It may also disturb the fabric nap or leave temporary pressure marks." },
      { style: "h2", text: "Professional Sofa Cleaning in the GTA" },
      { text: "SoftNest Fabric Care cleans sofas, sectionals and upholstered furniture in Mississauga and across the Greater Toronto Area. We use controlled cleaning and extraction, assist drying where appropriate, and explain what to expect before we leave." },
      { style: "h2", text: "Frequently Asked Questions" },
      { style: "h3", text: "Can I open the windows after couch cleaning?" },
      { text: "Yes when outdoor air is reasonably dry and weather conditions are suitable. On humid or rainy days, air conditioning or a dehumidifier may be more effective." },
      { style: "h3", text: "Why does my couch feel cool after cleaning?" },
      { text: "Evaporation can make damp fabric feel cooler than the room. Check seams and cushion edges and allow more drying time before use." },
      { style: "h3", text: "Is it normal for different cushions to dry at different speeds?" },
      { text: "Yes. Cushion thickness, construction, treatment level and airflow can vary. Position cushions as instructed and keep air moving around them." }
    ]
  }
];

function textBlock(style, text, key, extra = {}) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
    ...extra,
  };
}

function linkedBlock(item, key) {
  const { phrase, href } = item.link;
  const index = item.text.indexOf(phrase);
  if (index === -1) throw new Error(`Missing linked phrase: ${phrase}`);
  const markKey = `${key}-link`;
  const parts = [
    item.text.slice(0, index),
    phrase,
    item.text.slice(index + phrase.length),
  ];
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [{ _type: "link", _key: markKey, href }],
    children: parts
      .filter(Boolean)
      .map((text, part) => ({
        _type: "span",
        _key: `${key}-span-${part}`,
        text,
        marks: text === phrase ? [markKey] : [],
      })),
  };
}

function bodyBlocks(items) {
  const blocks = [];
  for (const item of items) {
    if (item.list) {
      for (const text of item.list) {
        const key = `text-${blocks.length}`;
        blocks.push(textBlock("normal", text, key, { listItem: "bullet", level: 1 }));
      }
      continue;
    }
    const key = `text-${blocks.length}`;
    blocks.push(item.link ? linkedBlock(item, key) : textBlock(item.style || "normal", item.text, key));
  }
  return blocks;
}

function plainArticle(article) {
  return article.body
    .flatMap((item) => {
      if (item.list) return item.list.join("\n");
      return item.text;
    })
    .join("\n\n");
}

const newDocuments = articles.map((article) => ({
  _id: `post-${article.slug}`,
  _type: "post",
  title: article.title,
  seoTitle: article.seoTitle,
  slug: { _type: "slug", current: article.slug },
  excerpt: article.description,
  seoDescription: article.description,
  publishedAt: article.publishedAt,
  author: { _type: "reference", _ref: "author-softnest" },
  categories: [{ _type: "reference", _ref: "category-fabric-care" }],
  relatedServices: article.services.map((slug) => ({
    _type: "reference",
    _ref: `service-${slug}`,
  })),
  body: bodyBlocks(article.body),
  order: article.order,
  showCover: false,
}));

for (const [index, document] of newDocuments.entries()) {
  const article = articles[index];
  const folder = `content/articles/${article.slug}`;
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(`${folder}/post.json`, `${JSON.stringify(document, null, 2)}\n`);
  fs.writeFileSync(`${folder}/article.txt`, `${plainArticle(article)}\n`);
  fs.writeFileSync(
    `${folder}/README.md`,
    `# ${article.title}\n\nWebsite-only article developed from SoftNest's first-hand Google Business Profile topic notes. The copy was expanded and reorganized for a distinct search intent; it is not a repost of the Google text.\n\nURL: /blog/${article.slug}/\n`,
  );
}

const seedPath = "content/migration/article-seed.json";
const existingSeed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const newIds = new Set(newDocuments.map((document) => document._id));
const utilityDocuments = existingSeed.filter((document) => document._type !== "post");
const existingPosts = existingSeed.filter(
  (document) => document._type === "post" && !newIds.has(document._id),
);
fs.writeFileSync(
  seedPath,
  `${JSON.stringify([...existingPosts, ...newDocuments, ...utilityDocuments], null, 2)}\n`,
);

console.log(`Prepared ${newDocuments.length} website-only articles and updated the article seed.`);
