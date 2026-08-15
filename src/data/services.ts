export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  menuLabel: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  serviceType: string[];
  concerns: string[];
  included: string[];
  process: ServiceStep[];
  drying: string;
  limitations: string;
  faq: ServiceFaq[];
  relatedServices: string[];
  heroProofs?: string[];
  includedHeading?: string;
  processHeading?: string;
  afterCareEyebrow?: string;
  afterCareHeading?: string;
  featured?: boolean;
};

const standardProcess: ServiceStep[] = [
  {
    title: "Photo review and estimate",
    description:
      "Send clear photos of the complete item or area, along with close-ups of stains, wear or odour concerns.",
  },
  {
    title: "On-site inspection",
    description:
      "We confirm the material, construction, condition and colour stability before choosing the safest practical approach.",
  },
  {
    title: "Pre-treatment and cleaning",
    description:
      "Suitable areas are pre-treated, agitated where appropriate and professionally extracted with commercial-grade equipment.",
  },
  {
    title: "Drying and final review",
    description:
      "Air movers are used to support faster drying, followed by a walkthrough and practical after-care guidance.",
  },
];

export const services: Service[] = [
  {
    slug: "upholstery-cleaning",
    name: "Upholstery Cleaning",
    menuLabel: "Upholstery Cleaning",
    shortName: "Upholstery",
    metaTitle: "Professional Upholstery Cleaning in the GTA | SoftNest",
    metaDescription:
      "Professional upholstery cleaning for sofas, sectionals, chairs, ottomans and other fabric furniture across the GTA.",
    summary:
      "Fabric-appropriate deep cleaning for frequently used upholstered furniture, with stain treatment, extraction and professional drying included.",
    heroTitle: "Professional upholstery cleaning for a fresher, more comfortable home",
    heroDescription:
      "We clean sofas, sectionals, chairs, ottomans and other suitable upholstered furniture using a process selected for the fabric, construction and condition of each piece.",
    image: "/img/sofa.png",
    imageAlt: "Grey upholstered sofa in a natural home interior",
    serviceType: [
      "Upholstery cleaning",
      "Furniture cleaning",
      "Sofa cleaning",
      "Chair cleaning",
    ],
    concerns: [
      "Everyday soil and body oils",
      "Food and drink spills",
      "Pet hair, stains and odours",
      "Dust and embedded debris",
      "General dullness and uneven soiling",
      "Frequently used cushions and armrests",
    ],
    included: [
      "Pre-inspection and fabric assessment",
      "Commercial-grade cleaning equipment",
      "Standard spot and stain treatment",
      "Cleaning of accessible fabric surfaces",
      "Professional drying with air movers",
      "Final review and after-care guidance",
    ],
    process: standardProcess,
    drying:
      "Many upholstery items dry in approximately two to four hours. Fabric type, humidity, airflow, cushion density and soil level can change the timing.",
    limitations:
      "Age, permanent dye loss, fibre damage, wear, heat damage and previous cleaning products can limit improvement. We explain realistic expectations before work begins.",
    faq: [
      {
        question: "What furniture can you clean?",
        answer:
          "We clean many suitable sofas, sectionals, loveseats, dining chairs, armchairs, recliners, ottomans and other upholstered items after assessing the fabric and construction.",
      },
      {
        question: "Do you clean removable cushions on all sides?",
        answer:
          "When cushions are removable and the fabric is suitable, the accessible sides are included in the quoted scope. Photos help us confirm the construction before booking.",
      },
      {
        question: "Can every stain be removed?",
        answer:
          "No professional cleaner can guarantee every stain. Results depend on the substance, age, fabric, colour loss, wear and previous cleaning attempts.",
      },
      {
        question: "Is professional drying included?",
        answer:
          "Yes. We use air movers after cleaning to support faster and more even drying.",
      },
    ],
    relatedServices: ["sofa-cleaning", "sectional-furniture-cleaning", "dining-chair-cleaning"],
    featured: true,
  },
  {
    slug: "sofa-cleaning",
    name: "Sofa & Couch Cleaning",
    menuLabel: "Sofa & Couch Cleaning",
    shortName: "Sofas",
    metaTitle: "Sofa & Couch Cleaning Across the GTA | SoftNest",
    metaDescription:
      "Deep sofa and couch cleaning for body oils, spills, stains and everyday buildup. Free photo estimates and professional drying included.",
    summary:
      "Deep cleaning for sofas and couches affected by everyday soil, body oils, spills, stains and odours.",
    heroTitle: "Sofa and couch cleaning that goes beyond the surface",
    heroDescription:
      "Frequently used sofas collect body oils, dust, spills and embedded soil. We inspect the fabric first, then clean the accessible surfaces with professional equipment and fabric-appropriate products.",
    image: "/img/sofa.png",
    imageAlt: "Grey fabric sofa in a natural home interior",
    serviceType: ["Sofa cleaning", "Couch cleaning", "Upholstery cleaning"],
    concerns: [
      "Darkened armrests and headrests",
      "Body oils and everyday buildup",
      "Food and drink stains",
      "Pet hair and light odours",
      "Dust between cushions",
      "Unevenly soiled seat cushions",
    ],
    included: [
      "Fabric and condition inspection",
      "Vacuuming of accessible areas",
      "Standard pre-treatment and spot treatment",
      "Deep cleaning and extraction",
      "Accessible cushion sides included in the confirmed scope",
      "Professional drying with air movers",
    ],
    process: standardProcess,
    drying:
      "Most sofas dry in roughly two to four hours under normal indoor conditions, although dense cushions and humid rooms may take longer.",
    limitations:
      "Permanent fading, worn fabric, dye loss and old chemical damage cannot be reversed through cleaning. Some deeply set stains may improve without disappearing completely.",
    faq: [
      {
        question: "How is a sofa cleaning quote calculated?",
        answer:
          "The price depends on size, seat count, design, removable cushions, fabric and condition. Send photos of the full sofa and problem areas for an estimate.",
      },
      {
        question: "Do you clean the back and sides of the sofa?",
        answer:
          "Accessible upholstered exterior surfaces are included when they form part of the confirmed quote. Tell us if the sofa is against a wall or has unusual construction.",
      },
      {
        question: "Can you remove old sofa stains?",
        answer:
          "We treat suitable stains, but age, fibre damage, colour loss and previous products may limit the result. We provide realistic expectations after inspection.",
      },
      {
        question: "Can decorative pillows be cleaned too?",
        answer:
          "Often, yes. Include them in the photos so we can assess the fabric and add them to the quote.",
      },
    ],
    relatedServices: ["sectional-furniture-cleaning", "pet-stain-odour-removal", "upholstery-cleaning"],
    featured: true,
  },
  {
    slug: "leather-upholstery-cleaning",
    name: "Leather Upholstery Cleaning",
    menuLabel: "Leather Upholstery Cleaning",
    shortName: "Leather",
    metaTitle: "Leather Upholstery Cleaning Across the GTA | SoftNest",
    metaDescription:
      "Professional leather sofa and upholstery cleaning with conditioning and protective treatment across the GTA. Free photo estimates available.",
    summary:
      "Careful cleaning for suitable leather furniture, followed by a moisturizing conditioning treatment and protective solution to support the finish and everyday care.",
    heroTitle: "Leather upholstery cleaning, conditioning and protection",
    heroDescription:
      "We clean suitable leather sofas, sectionals and chairs using a leather-specific process. After cleaning, we apply a moisturizing conditioning treatment and a protective solution, with the approach confirmed after inspecting the leather and its condition.",
    image: "/images/softnest-hero-room.webp",
    imageAlt: "Clean furnished living room representing SoftNest leather upholstery care",
    serviceType: [
      "Leather upholstery cleaning",
      "Leather sofa cleaning",
      "Leather conditioning",
      "Leather protection",
    ],
    concerns: [
      "Everyday surface soil and body oils",
      "Dull or lightly soiled leather surfaces",
      "Frequently touched armrests and headrests",
      "Dry-feeling finished leather",
      "General maintenance cleaning",
      "Leather furniture needing conditioning and protection",
    ],
    included: [
      "Leather type and condition assessment",
      "Controlled surface cleaning",
      "Leather-appropriate cleaning products",
      "Moisturizing and conditioning treatment",
      "Protective solution application",
      "Final review and after-care guidance",
    ],
    process: [
      {
        title: "Photo review and estimate",
        description:
          "Send clear photos of the complete leather item and close-ups of any marks, wear, cracking, peeling or areas you want us to inspect.",
      },
      {
        title: "Leather and finish inspection",
        description:
          "We inspect the leather type, finish and existing condition before choosing the appropriate cleaning and care products.",
      },
      {
        title: "Controlled leather cleaning",
        description:
          "Suitable surfaces are cleaned carefully to remove everyday soil and residue without using the extraction process used for fabric upholstery.",
      },
      {
        title: "Condition and protect",
        description:
          "After cleaning, we apply a moisturizing conditioning treatment followed by a protective solution, then review the finished surfaces and after-care.",
      },
    ],
    drying:
      "Allow the conditioning and protective products to settle and dry before normal use. The technician will explain the practical after-care based on the leather, products used and room conditions.",
    limitations:
      "Cleaning and conditioning cannot repair cracking, peeling or delamination, deep scratches, permanent dye loss, worn finish, cuts or other physical damage. Some stains and colour changes may be permanent.",
    faq: [
      {
        question: "What does your leather upholstery service include?",
        answer:
          "The service includes careful cleaning of suitable leather surfaces, a moisturizing conditioning treatment and application of a protective solution, followed by after-care guidance.",
      },
      {
        question: "Do you clean every type of leather?",
        answer:
          "Not every leather uses the same process. We inspect the material and finish first. Suede, nubuck, heavily damaged leather and specialty finishes may require a different approach or may not be suitable for our standard service.",
      },
      {
        question: "Can leather cleaning remove scratches or peeling?",
        answer:
          "No. Cleaning can remove suitable surface soil and improve the overall appearance, but it cannot repair scratches, peeling, cracking, dye loss or worn protective finish.",
      },
      {
        question: "How do I get a leather sofa quote?",
        answer:
          "Send clear photos of the full sofa or chair and close-ups of any marks or worn areas. We use the photos to confirm the item, condition and expected service scope before booking.",
      },
    ],
    relatedServices: ["sofa-cleaning", "upholstery-cleaning", "sectional-furniture-cleaning"],
    heroProofs: [
      "Leather-appropriate cleaning",
      "Conditioning treatment",
      "Protective solution applied",
    ],
    includedHeading: "Cleaning, conditioning and protection in one service",
    processHeading: "From photos to cleaned, conditioned and protected leather",
    afterCareEyebrow: "After-care",
    afterCareHeading: "When the furniture can be used again",
    featured: true,
  },
  {
    slug: "sectional-furniture-cleaning",
    name: "Sectional & Furniture Cleaning",
    menuLabel: "Sectional & Furniture Cleaning",
    shortName: "Sectionals",
    metaTitle: "Sectional & Furniture Cleaning in the GTA | SoftNest",
    metaDescription:
      "Professional sectional, loveseat, recliner, ottoman and upholstered furniture cleaning across the GTA.",
    summary:
      "Detailed cleaning for large sectionals, loveseats, recliners, ottomans and other upholstered furniture.",
    heroTitle: "Thorough sectional and upholstered furniture cleaning",
    heroDescription:
      "Large sectionals need enough time, careful preparation and a clear item count. We clean each accessible section methodically, including removable cushions where suitable and included in the estimate.",
    image: "/img/sectional_furniture.webp",
    imageAlt: "Professional cleaning of a large upholstered sectional",
    serviceType: [
      "Sectional cleaning",
      "Furniture cleaning",
      "Loveseat cleaning",
      "Recliner cleaning",
    ],
    concerns: [
      "Large multi-seat sectionals",
      "Frequently used family-room furniture",
      "Removable seat and back cushions",
      "Recliners and upholstered armchairs",
      "Ottomans and upholstered benches",
      "Food, drink and pet-related soil",
    ],
    included: [
      "Accurate section and cushion count",
      "Fabric-specific pre-inspection",
      "Standard stain treatment",
      "Deep cleaning of accessible upholstery",
      "Commercial-grade extraction",
      "Professional drying with air movers",
    ],
    process: standardProcess,
    drying:
      "Sectionals commonly require two to four hours to dry, with thicker cushions or limited airflow sometimes extending the drying period.",
    limitations:
      "Wear patterns, permanent discoloration, damaged fibres and old stains may remain visible after the removable soil has been cleaned.",
    faq: [
      {
        question: "How do you count sectional seats?",
        answer:
          "We review the full shape, usable seating sections, chaise sections and cushion construction from photos. This is more accurate than relying only on the overall length.",
      },
      {
        question: "Do large sectionals take longer to clean?",
        answer:
          "Yes. More sections, cushions, staining and detailed edges increase the time required. We schedule enough time to complete the work without rushing.",
      },
      {
        question: "Can an ottoman be cleaned during the same visit?",
        answer:
          "Yes. Add a clear photo and dimensions or approximate size to the quote request.",
      },
      {
        question: "Can you clean recliners and accent furniture?",
        answer:
          "We can clean many suitable upholstered recliners and accent pieces after assessing the fabric, mechanism and condition.",
      },
    ],
    relatedServices: ["sofa-cleaning", "armchair-cleaning", "pet-stain-odour-removal"],
    featured: true,
  },
  {
    slug: "carpet-area-rug-cleaning",
    name: "Carpet & Area Rug Cleaning",
    menuLabel: "Carpet & Area Rug Cleaning",
    shortName: "Carpets & Rugs",
    metaTitle: "Carpet & Area Rug Cleaning Across the GTA | SoftNest",
    metaDescription:
      "Professional carpet, hallway, room and suitable area rug cleaning with stain treatment and commercial-grade extraction.",
    summary:
      "Professional extraction for wall-to-wall carpet, high-traffic areas and suitable area rugs after fibre and backing assessment.",
    heroTitle: "Professional carpet and area rug cleaning for lived-in homes",
    heroDescription:
      "We clean suitable residential carpets and area rugs to reduce embedded soil, traffic-lane buildup, spots and odours while avoiding unnecessary oversaturation.",
    image: "/img/rug_2.webp",
    imageAlt: "Professional carpet and area rug cleaning result",
    serviceType: ["Carpet cleaning", "Area rug cleaning", "Residential carpet cleaning"],
    concerns: [
      "Traffic lanes and entry areas",
      "Food and drink spots",
      "Pet-related staining and odours",
      "Embedded soil and dust",
      "Carpeted rooms and hallways",
      "Suitable on-site area rugs",
    ],
    included: [
      "Fibre and condition assessment",
      "Pre-vacuuming where required",
      "Standard spot treatment",
      "Professional hot-water extraction where suitable",
      "Care around edges and transitions",
      "Air movement and drying guidance",
    ],
    process: standardProcess,
    drying:
      "Residential carpets often dry in approximately four to eight hours. Ventilation, humidity, pile density and the cleaning scope affect the final timing.",
    limitations:
      "Some rugs require specialist off-site cleaning because of natural fibres, unstable dyes, delicate construction or backing concerns. Permanent colour loss and fibre wear cannot be cleaned away.",
    faq: [
      {
        question: "Do you clean wall-to-wall carpet and area rugs?",
        answer:
          "Yes, when the material and construction are suitable for on-site cleaning. Photos, room dimensions and rug dimensions help us prepare the estimate.",
      },
      {
        question: "Do you move furniture?",
        answer:
          "We discuss safe access and light-item movement before the appointment. Large, fragile or heavily loaded furniture may need to remain in place or be moved beforehand.",
      },
      {
        question: "Can you remove pet odour from carpet?",
        answer:
          "Targeted treatment may help, but the result depends on how far contamination has reached into the carpet, underlay and subfloor. We explain the likely limits before treatment.",
      },
      {
        question: "How long does carpet take to dry?",
        answer:
          "Many carpets dry in roughly four to eight hours, depending on pile, ventilation, humidity and the amount of cleaning required.",
      },
    ],
    relatedServices: ["stairs-hallways-cleaning", "pet-stain-odour-removal", "upholstery-cleaning"],
    featured: true,
  },
  {
    slug: "mattress-cleaning",
    name: "Mattress Cleaning",
    menuLabel: "Mattress Cleaning",
    shortName: "Mattresses",
    metaTitle: "Professional Mattress Cleaning in the GTA | SoftNest",
    metaDescription:
      "Professional mattress surface cleaning for everyday buildup, marks and odours across the GTA.",
    summary:
      "Professional mattress surface cleaning for everyday buildup, suitable spots, light odours and general freshening.",
    heroTitle: "A careful professional clean for your mattress",
    heroDescription:
      "Mattresses need controlled moisture, careful extraction and realistic stain expectations. We assess the surface, construction and staining before selecting the treatment.",
    image: "/img/matress_cleaning.webp",
    imageAlt: "Before and after professional mattress cleaning",
    serviceType: ["Mattress cleaning", "Upholstery cleaning"],
    concerns: [
      "Everyday surface buildup",
      "Body oils and perspiration marks",
      "Food or drink spots",
      "Light odours",
      "Dust on accessible surfaces",
      "One-side or two-side cleaning requests",
    ],
    included: [
      "Surface inspection",
      "Fabric-safe pre-treatment",
      "Standard spot treatment",
      "Controlled-moisture cleaning",
      "Professional extraction",
      "Air-mover drying support",
    ],
    process: standardProcess,
    drying:
      "Mattresses commonly need several hours to dry fully. Keep bedding off until the surface is completely dry and maintain good ventilation.",
    limitations:
      "Old yellowing, oxidation, dye changes and deeply set body-fluid stains may not return to the original colour even when the surface is thoroughly cleaned.",
    faq: [
      {
        question: "Do you clean one side or both sides of a mattress?",
        answer:
          "Both options may be available. Tell us the mattress size and whether you want one or two sides included so the estimate is accurate.",
      },
      {
        question: "Can every mattress stain be removed?",
        answer:
          "No. Older stains may have permanently changed the fibres or colour. We treat suitable spots and explain realistic expectations after inspection.",
      },
      {
        question: "Can I sleep on the mattress the same night?",
        answer:
          "Only after it is completely dry. Drying time varies, so schedule the cleaning early enough to allow proper ventilation and air movement.",
      },
      {
        question: "Do you clean box springs?",
        answer:
          "Suitable upholstered box springs can often be added. Include a photo so we can confirm the material and price.",
      },
    ],
    relatedServices: ["upholstery-cleaning", "pet-stain-odour-removal", "sofa-cleaning"],
  },
  {
    slug: "dining-chair-cleaning",
    name: "Dining Chair Cleaning",
    menuLabel: "Dining Chair Cleaning",
    shortName: "Dining Chairs",
    metaTitle: "Dining Chair Cleaning Across the GTA | SoftNest",
    metaDescription:
      "Professional upholstered dining chair cleaning for food marks, spills and everyday buildup across the GTA.",
    summary:
      "Detailed cleaning for upholstered dining-chair seats and backs affected by food, spills and everyday use.",
    heroTitle: "Upholstered dining chair cleaning for everyday marks and spills",
    heroDescription:
      "Dining chairs often collect food residue, drink spots and uneven soil. We clean suitable upholstered seats and backs with controlled moisture and careful extraction.",
    image: "/img/dining_chairs.webp",
    imageAlt: "Before and after cleaning of upholstered dining chairs",
    serviceType: ["Dining chair cleaning", "Chair upholstery cleaning"],
    concerns: [
      "Food and drink marks",
      "Darkened seat edges",
      "Everyday family use",
      "Upholstered seats and backs",
      "Matching chair sets",
      "Light odours and general buildup",
    ],
    included: [
      "Chair-by-chair inspection",
      "Fabric suitability check",
      "Standard spot treatment",
      "Cleaning of quoted upholstered areas",
      "Commercial extraction",
      "Professional drying support",
    ],
    process: standardProcess,
    drying:
      "Dining chairs usually dry faster than heavily cushioned sofas, but fabric, padding and airflow still affect the timing.",
    limitations:
      "Permanent food dye, faded fabric, worn edges and damaged foam or backing may remain visible after cleaning.",
    faq: [
      {
        question: "Do you clean both the seat and upholstered back?",
        answer:
          "Yes, when both areas are upholstered and included in the quote. Send photos from the front and back so we can confirm the scope.",
      },
      {
        question: "Can several dining chairs be cleaned together?",
        answer:
          "Yes. Tell us the total chair count and whether every chair has the same design and condition.",
      },
      {
        question: "Can food stains be removed?",
        answer:
          "Many improve significantly, but results depend on the food, dyes, age, fabric and previous cleaning products.",
      },
      {
        question: "How soon can the chairs be used?",
        answer:
          "Use them only after the upholstery is completely dry. Air movers help reduce drying time.",
      },
    ],
    relatedServices: ["armchair-cleaning", "upholstery-cleaning", "carpet-area-rug-cleaning"],
  },
  {
    slug: "armchair-cleaning",
    name: "Armchair & Recliner Cleaning",
    menuLabel: "Armchair Cleaning",
    shortName: "Armchairs",
    metaTitle: "Armchair & Recliner Cleaning in the GTA | SoftNest",
    metaDescription:
      "Professional armchair, recliner and accent-chair upholstery cleaning across the GTA.",
    summary:
      "Fabric-appropriate cleaning for armchairs, recliners and accent seating, including high-contact areas and suitable cushions.",
    heroTitle: "Professional cleaning for armchairs, recliners and accent seating",
    heroDescription:
      "We clean suitable upholstered armchairs and recliners with attention to high-contact arms, headrests, seat cushions, seams and moving components.",
    image: "/img/sectional_furniture.webp",
    imageAlt: "Professional upholstered armchair cleaning",
    serviceType: ["Armchair cleaning", "Recliner cleaning", "Chair upholstery cleaning"],
    concerns: [
      "Darkened headrests and arms",
      "Body oils and everyday soil",
      "Food or drink spots",
      "Recliner seat and footrest buildup",
      "Accent-chair freshening",
      "Pet hair and light odours",
    ],
    included: [
      "Fabric and mechanism inspection",
      "Standard stain treatment",
      "Cleaning of accessible quoted surfaces",
      "Care around seams and moving parts",
      "Professional extraction",
      "Air-mover drying support",
    ],
    process: standardProcess,
    drying:
      "Most armchairs and recliners dry in approximately two to four hours, depending on cushion thickness, fabric and airflow.",
    limitations:
      "Mechanical damage, worn finishes, permanent dye loss and fabric abrasion cannot be corrected through cleaning.",
    faq: [
      {
        question: "Can you clean a powered recliner?",
        answer:
          "Often, yes. We inspect the construction and protect electrical or mechanical components from unnecessary moisture.",
      },
      {
        question: "Are removable armchair cushions cleaned on both sides?",
        answer:
          "Suitable accessible sides can be included in the confirmed quote. Send photos showing whether the cushions detach.",
      },
      {
        question: "Can you clean delicate accent chairs?",
        answer:
          "We first assess the fabric, care information and colour stability. Some delicate materials may require a different method or specialist service.",
      },
      {
        question: "Can an armchair be added to a sofa appointment?",
        answer:
          "Yes. Include it in the original photo estimate so we can plan enough time and provide the combined total.",
      },
    ],
    relatedServices: ["dining-chair-cleaning", "sofa-cleaning", "sectional-furniture-cleaning"],
  },
  {
    slug: "stairs-hallways-cleaning",
    name: "Carpeted Stairs & Hallways",
    menuLabel: "Stairs & Hallways",
    shortName: "Stairs & Hallways",
    metaTitle: "Carpeted Stairs & Hallway Cleaning in the GTA | SoftNest",
    metaDescription:
      "Professional cleaning for carpeted stairs, landings and hallways across the GTA.",
    summary:
      "Focused cleaning for carpeted stairs, landings and hallways where traffic lanes and edge soil build up quickly.",
    heroTitle: "Detailed cleaning for carpeted stairs, landings and hallways",
    heroDescription:
      "Stairs and hallways receive concentrated foot traffic. We clean suitable carpeted steps, risers, landings and connecting hallways with tools sized for tighter areas.",
    image: "/img/before_after_carpet_cleaning.webp",
    imageAlt: "Before and after cleaning of a residential carpeted hallway",
    serviceType: ["Stair carpet cleaning", "Hallway carpet cleaning", "Carpet cleaning"],
    concerns: [
      "Dark traffic lanes",
      "Step edges and risers",
      "Landings and turns",
      "Tracked-in soil",
      "Spots on narrow pathways",
      "Hallways connecting carpeted rooms",
    ],
    included: [
      "Step and landing count review",
      "Pre-inspection",
      "Standard spot treatment",
      "Detailed cleaning with stair tools",
      "Professional extraction",
      "Drying and safe-use guidance",
    ],
    process: standardProcess,
    drying:
      "Drying often takes approximately four to eight hours. Avoid using damp stairs where possible and follow the on-site safety guidance.",
    limitations:
      "Worn step edges, flattened pile, permanent colour loss and damaged carpet may remain visible even after soil is removed.",
    faq: [
      {
        question: "How are carpeted stairs priced?",
        answer:
          "The estimate depends on the number of steps, whether risers are carpeted, landings, turns and overall condition. Send a full staircase photo and step count.",
      },
      {
        question: "Can hallways be cleaned with carpeted rooms?",
        answer:
          "Yes. Include the hallway length or approximate dimensions together with the rooms and stairs in the quote request.",
      },
      {
        question: "Do you clean the vertical risers?",
        answer:
          "Carpeted risers can be included when shown in the photos and confirmed in the scope.",
      },
      {
        question: "When can the stairs be used again?",
        answer:
          "Wait until the carpet is dry whenever possible. If access is unavoidable, follow the technician’s safety guidance carefully.",
      },
    ],
    relatedServices: ["carpet-area-rug-cleaning", "pet-stain-odour-removal", "upholstery-cleaning"],
  },
  {
    slug: "pet-stain-odour-removal",
    name: "Pet Stain & Odour Treatment",
    menuLabel: "Pet Stain & Odour Removal",
    shortName: "Pet Treatment",
    metaTitle: "Pet Stain & Odour Treatment for Upholstery and Carpet | SoftNest",
    metaDescription:
      "Targeted pet stain and odour treatment for suitable sofas, sectionals, carpets and rugs across the GTA.",
    summary:
      "Targeted treatment for pet accidents, visible staining and odour sources in suitable upholstery and carpet.",
    heroTitle: "Targeted pet stain and odour treatment with honest expectations",
    heroDescription:
      "Pet contamination can travel below the visible surface. We inspect the affected material, explain how far treatment can reasonably reach and recommend the appropriate cleaning approach.",
    image: "/img/pet_stain.jpg",
    imageAlt: "Pet stain and odour treatment for home upholstery",
    serviceType: [
      "Pet stain removal",
      "Pet odour treatment",
      "Upholstery cleaning",
      "Carpet cleaning",
    ],
    concerns: [
      "Recent pet accidents",
      "Visible urine staining",
      "Odour in sofa cushions",
      "Affected carpet areas",
      "Repeat contamination spots",
      "Uncertain contamination depth",
    ],
    included: [
      "Affected-area inspection",
      "Contamination-depth discussion",
      "Suitable targeted pre-treatment",
      "Cleaning and extraction",
      "Realistic odour expectations",
      "Professional drying support",
    ],
    process: [
      {
        title: "Identify the affected areas",
        description:
          "Send photos and describe where the accident occurred, how long ago it happened and whether odour remains when the material is dry.",
      },
      {
        title: "Assess likely depth",
        description:
          "We consider the fabric, cushion filling, carpet backing or underlay and whether contamination may have travelled beyond the cleanable surface.",
      },
      {
        title: "Treat and extract",
        description:
          "Suitable affected areas receive targeted treatment followed by controlled cleaning and extraction.",
      },
      {
        title: "Dry and reassess",
        description:
          "Air movers support drying. Final odour assessment is most reliable once the material is fully dry.",
      },
    ],
    drying:
      "Treated areas must dry completely before the final odour result can be assessed. Cushion filling, carpet underlay, humidity and contamination depth affect timing.",
    limitations:
      "Surface cleaning cannot always reach contamination that has entered deep foam, carpet underlay, wood or subfloor. Severe or repeated contamination may require replacement of affected materials.",
    faq: [
      {
        question: "Can pet urine odour always be removed?",
        answer:
          "No. Results depend on the depth, age and amount of contamination. We explain whether the source appears limited to the surface or may extend into materials that cannot be fully flushed on site.",
      },
      {
        question: "Should I use household products before the appointment?",
        answer:
          "Avoid adding more products unless necessary for immediate blotting. Some cleaners can set stains, leave residues or interfere with professional treatment.",
      },
      {
        question: "Can you treat only one affected area?",
        answer:
          "Yes, when appropriate, although the surrounding item or room may also need cleaning for an even overall result.",
      },
      {
        question: "When will I know whether the odour is gone?",
        answer:
          "The best assessment is after the material has dried fully. Moisture can temporarily change how odours are perceived.",
      },
    ],
    relatedServices: ["sofa-cleaning", "carpet-area-rug-cleaning", "sectional-furniture-cleaning"],
    featured: true,
  },
];

export const navigationServices = services.filter(
  (service) => service.slug !== "upholstery-cleaning",
);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
