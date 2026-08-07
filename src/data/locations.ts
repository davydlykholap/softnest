export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  slug: string;
  name: string;
  shortDescription: string;
  introduction: string;
  localConsiderations: string;
  neighbourhoods: string[];
  mapQuery: string;
  faq: LocationFaq[];
};

export const locations: Location[] = [
  {
    slug: "mississauga",
    name: "Mississauga",
    shortDescription:
      "Local upholstery, sofa, sectional, carpet and area rug cleaning throughout Mississauga.",
    introduction:
      "SoftNest provides careful, fabric-appropriate cleaning throughout Mississauga for sofas, sectionals, dining chairs, mattresses, carpets and area rugs. We inspect the material and problem areas before choosing the treatment, so the process fits the furniture rather than relying on one method for everything.",
    localConsiderations:
      "Mississauga homes range from high-rise condos near the city centre to larger family homes in established neighbourhoods. When access, elevators or visitor parking need coordination, tell us when requesting your quote so the visit can be planned efficiently.",
    neighbourhoods: [
      "City Centre",
      "Port Credit",
      "Streetsville",
      "Clarkson",
      "Meadowvale",
      "Erin Mills",
      "Cooksville",
      "Mineola",
    ],
    mapQuery: "Mississauga, Ontario",
    faq: [
      {
        question: "Do you provide condo upholstery cleaning in Mississauga?",
        answer:
          "Yes. Let us know about elevator booking, loading access or parking instructions when you request a quote.",
      },
      {
        question: "Can you treat pet odours in sofas and sectionals?",
        answer:
          "Yes. We inspect how far the contamination has travelled and explain the realistic treatment options before starting.",
      },
      {
        question: "How long does upholstery take to dry?",
        answer:
          "Most upholstery dries in roughly two to four hours, although fabric type, airflow, humidity and soil level can change the timing.",
      },
    ],
  },
  {
    slug: "toronto",
    name: "Toronto",
    shortDescription:
      "Professional sofa and upholstery cleaning for Toronto condos, houses and apartments.",
    introduction:
      "SoftNest brings professional upholstery and carpet cleaning to Toronto homes with equipment and products selected for the material being cleaned. From everyday soil on a frequently used couch to stains and odours in a sectional, every job begins with an inspection and a clear explanation of the expected result.",
    localConsiderations:
      "Toronto appointments often involve condo elevators, limited loading areas or on-street parking. Sharing access details and photos in advance helps us recommend the right treatment and plan the visit around the building’s requirements.",
    neighbourhoods: [
      "Downtown",
      "The Annex",
      "Leslieville",
      "The Beaches",
      "North York",
      "East York",
      "Scarborough",
      "York",
    ],
    mapQuery: "Toronto, Ontario",
    faq: [
      {
        question: "Can you clean furniture in a Toronto condo?",
        answer:
          "Yes. Please include elevator, loading and parking details with your quote request so access can be planned in advance.",
      },
      {
        question: "Do I need to move my sofa before the appointment?",
        answer:
          "Usually not. Remove small items and fragile objects nearby; we will assess safe positioning when we arrive.",
      },
      {
        question: "Are your products suitable for homes with children or pets?",
        answer:
          "We select fabric-appropriate products for the material being cleaned and provide after-care guidance for the drying period.",
      },
    ],
  },
  {
    slug: "brampton",
    name: "Brampton",
    shortDescription:
      "Deep upholstery, sectional, mattress and carpet cleaning for Brampton homes.",
    introduction:
      "SoftNest serves Brampton households that need a deeper clean for sofas, sectionals, upholstered chairs, mattresses, carpets and rugs. Our process targets embedded soil, spills and odours while accounting for the fabric, construction and condition of each item.",
    localConsiderations:
      "Many Brampton appointments involve large sectionals, multiple dining chairs or several rooms of carpet. Photos and an accurate item count allow us to prepare the right equipment and provide a clearer quote before the visit.",
    neighbourhoods: [
      "Bramalea",
      "Heart Lake",
      "Springdale",
      "Mount Pleasant",
      "Credit Valley",
      "Fletcher's Meadow",
      "Castlemore",
      "Downtown Brampton",
    ],
    mapQuery: "Brampton, Ontario",
    faq: [
      {
        question: "Can you clean a large sectional in Brampton?",
        answer:
          "Yes. Send photos showing the full sectional and any stains so we can account for its size, fabric and condition.",
      },
      {
        question: "Can several dining chairs be cleaned during one visit?",
        answer:
          "Yes. Include the number of chairs and clear photos when asking for a quote.",
      },
      {
        question: "Do you offer carpet and upholstery cleaning together?",
        answer:
          "Yes, depending on the size and scope of the appointment. List everything you would like cleaned in the same request.",
      },
    ],
  },
  {
    slug: "oakville",
    name: "Oakville",
    shortDescription:
      "Fabric-safe furniture, upholstery, carpet and area rug cleaning in Oakville.",
    introduction:
      "SoftNest provides detail-focused upholstery and carpet cleaning for Oakville homes. We work with sofas, sectionals, accent chairs, dining seating, mattresses and rugs, selecting the cleaning approach after checking the fibres, construction, stains and overall condition.",
    localConsiderations:
      "Oakville homes often combine larger upholstered pieces with area rugs and delicate accent furniture. Identifying care labels and sharing close-up photos helps us flag materials that need a more cautious cleaning plan.",
    neighbourhoods: [
      "Old Oakville",
      "Bronte",
      "Glen Abbey",
      "River Oaks",
      "West Oak Trails",
      "Clearview",
      "Joshua Creek",
      "Uptown Core",
    ],
    mapQuery: "Oakville, Ontario",
    faq: [
      {
        question: "Do you clean delicate or natural-fibre upholstery?",
        answer:
          "We inspect the fabric and care information first. Some materials require a low-moisture method or may need a specialist recommendation.",
      },
      {
        question: "Can you clean area rugs in an Oakville home?",
        answer:
          "We clean suitable area rugs on site after assessing their fibre, backing, colour stability and condition.",
      },
      {
        question: "Will every old stain come out?",
        answer:
          "No cleaner can promise that. We explain what appears treatable and where age, dye loss or prior products may limit the result.",
      },
    ],
  },
  {
    slug: "etobicoke",
    name: "Etobicoke",
    shortDescription:
      "Convenient upholstery and sofa cleaning for Etobicoke houses, apartments and condos.",
    introduction:
      "SoftNest provides professional furniture and carpet cleaning across Etobicoke. We treat common concerns such as body oils, food spills, tracked-in soil, pet accidents and lingering odours using an approach matched to the item’s fabric and condition.",
    localConsiderations:
      "Etobicoke includes lakeside condos, apartments and detached homes, so access can vary considerably. Include parking, elevator and entrance information with your photos to help us plan a smooth appointment.",
    neighbourhoods: [
      "Mimico",
      "Long Branch",
      "New Toronto",
      "The Kingsway",
      "Islington",
      "Rexdale",
      "Alderwood",
      "Markland Wood",
    ],
    mapQuery: "Etobicoke, Ontario",
    faq: [
      {
        question: "Do you serve both south and north Etobicoke?",
        answer:
          "Coverage includes communities across Etobicoke. Send your postal code when requesting a quote so availability can be confirmed.",
      },
      {
        question: "Can you work in buildings with service-elevator rules?",
        answer:
          "Yes. Please arrange the booking with your building and tell us the available time window and loading instructions.",
      },
      {
        question: "Can you remove food and drink stains from a couch?",
        answer:
          "Many respond well to professional treatment, but results depend on the substance, fabric, age of the stain and previous cleaning attempts.",
      },
    ],
  },
  {
    slug: "burlington",
    name: "Burlington",
    shortDescription:
      "Professional sofa, furniture, carpet and rug cleaning for Burlington households.",
    introduction:
      "SoftNest serves Burlington homeowners looking for a careful, professional clean for upholstered furniture, mattresses, carpets and area rugs. We use commercial equipment and fabric-appropriate products to remove as much soil and contamination as the material safely allows.",
    localConsiderations:
      "For appointments involving multiple rooms, large sectionals or a mix of furniture and rugs, a complete photo set helps us estimate the scope and prepare for the visit. We will also confirm travel availability for your Burlington address.",
    neighbourhoods: [
      "Downtown Burlington",
      "Aldershot",
      "Brant Hills",
      "Headon Forest",
      "Millcroft",
      "Orchard",
      "Roseland",
      "Alton Village",
    ],
    mapQuery: "Burlington, Ontario",
    faq: [
      {
        question: "How do I confirm availability in Burlington?",
        answer:
          "Send your address or postal code, photos and preferred timing. We will confirm the service window with your quote.",
      },
      {
        question: "Can upholstery and area rugs be cleaned in one appointment?",
        answer:
          "Often, yes. Include photos and measurements for each rug as well as the furniture item count.",
      },
      {
        question: "Do you provide a quote before travelling to Burlington?",
        answer:
          "We can usually provide an initial quote from clear photos and details, subject to confirming the condition on arrival.",
      },
    ],
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    shortDescription:
      "Sofa, sectional, dining chair and carpet cleaning throughout Vaughan.",
    introduction:
      "SoftNest provides upholstery and carpet cleaning for Vaughan homes, including frequently used sofas, large sectionals, dining chairs, mattresses and rugs. We focus on careful preparation, thorough extraction and honest expectations for stains or wear that may be permanent.",
    localConsiderations:
      "Vaughan appointments may cover large furniture sets or several floors of a home. A room-by-room list and photos of access points help us understand the job and arrive with an appropriate plan.",
    neighbourhoods: [
      "Woodbridge",
      "Maple",
      "Kleinburg",
      "Concord",
      "Thornhill",
      "Vellore Village",
      "Patterson",
      "Vaughan Metropolitan Centre",
    ],
    mapQuery: "Vaughan, Ontario",
    faq: [
      {
        question: "Can you quote a full sectional from photos?",
        answer:
          "Usually. Send wide photos, the number of seats and close-ups of stains or damaged areas.",
      },
      {
        question: "Do you clean upholstered dining sets?",
        answer:
          "Yes. Tell us the number of chairs, fabric type if known, and whether there are specific stains.",
      },
      {
        question: "Is there a travel charge for Vaughan?",
        answer:
          "Any location-based minimum or travel consideration will be disclosed when availability and the quote are confirmed.",
      },
    ],
  },
  {
    slug: "milton",
    name: "Milton",
    shortDescription:
      "Family-home upholstery, sectional, carpet and mattress cleaning in Milton.",
    introduction:
      "SoftNest offers professional upholstery and carpet cleaning for Milton households. Our service is suited to busy family furniture, pet-related concerns, dining seating, mattresses, rugs and carpeted areas that need more than routine vacuuming.",
    localConsiderations:
      "Milton homes often have newer, open-plan living spaces with large sectionals and adjoining carpeted areas. Listing all requested items together helps us plan an efficient visit and explain the likely drying time.",
    neighbourhoods: [
      "Old Milton",
      "Clarke",
      "Coates",
      "Dempsey",
      "Ford",
      "Harrison",
      "Scott",
      "Willmott",
    ],
    mapQuery: "Milton, Ontario",
    faq: [
      {
        question: "Do you serve newer Milton neighbourhoods?",
        answer:
          "We assess requests throughout Milton. Send your postal code to confirm scheduling for your address.",
      },
      {
        question: "Can you treat pet accidents on upholstery?",
        answer:
          "Yes. The likely result depends on whether contamination remains near the surface or has reached internal foam and backing.",
      },
      {
        question: "How should I prepare carpeted rooms?",
        answer:
          "Remove small and fragile items. We can discuss furniture movement and access when confirming the scope of work.",
      },
    ],
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    shortDescription:
      "Professional upholstery, sofa, sectional, carpet and area rug cleaning for Hamilton homes.",
    introduction:
      "SoftNest provides detail-focused upholstery and carpet cleaning for Hamilton households. We clean sofas, sectionals, dining chairs, mattresses, carpets and suitable area rugs using equipment and products selected for the material, condition and type of soil.",
    localConsiderations:
      "Hamilton appointments can range from downtown apartments and converted homes to larger properties across the Mountain and surrounding communities. Send clear photos, your postal code and any parking, stair or building-access details so we can confirm availability and prepare for the visit.",
    neighbourhoods: [
      "Downtown Hamilton",
      "Westdale",
      "Durand",
      "Ancaster",
      "Dundas",
      "Stoney Creek",
      "Hamilton Mountain",
      "Waterdown",
    ],
    mapQuery: "Hamilton, Ontario",
    faq: [
      {
        question: "How do I confirm upholstery cleaning availability in Hamilton?",
        answer:
          "Send your Hamilton postal code, photos of each item and your preferred timing. We will confirm the service window with your quote.",
      },
      {
        question: "Can you clean sofas in Hamilton apartments or condos?",
        answer:
          "Yes. Include elevator, loading, parking and entry instructions so access can be planned before the appointment.",
      },
      {
        question: "Can carpet and upholstery be cleaned during the same visit?",
        answer:
          "Often, yes. List every furniture item and carpeted area in the same request so we can confirm the scope and timing.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export const nearbyLocationSlugs: Record<string, string[]> = {
  mississauga: ["oakville", "brampton", "etobicoke", "milton"],
  toronto: ["etobicoke", "vaughan", "mississauga", "brampton"],
  brampton: ["mississauga", "vaughan", "milton", "etobicoke"],
  oakville: ["mississauga", "burlington", "milton", "hamilton"],
  etobicoke: ["toronto", "mississauga", "vaughan", "brampton"],
  burlington: ["oakville", "hamilton", "milton", "mississauga"],
  vaughan: ["toronto", "brampton", "etobicoke", "mississauga"],
  milton: ["mississauga", "oakville", "burlington", "brampton"],
  hamilton: ["burlington", "oakville", "milton", "mississauga"],
};
