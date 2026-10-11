import type { LocationFaq } from "@/content/locations";

export type CityPageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  introductionParagraphs: string[];
  services: { title: string; slug: string; description: string }[];
  more: string;
  advantages: { title: string; description: string }[];
  faqs: LocationFaq[];
  neighbourhoods: string[];
  coverage: string;
  coverageClosing: string;
  ctaTitle: string;
  ctaDescription: string;
};

// Reviewed city copy stays outside generated CMS snapshots so content:sync
// cannot replace the approved page text during deployment.
export const cityPages: Record<string, CityPageCopy> = {
  "mississauga": {
    "metaTitle": "Upholstery & Carpet Cleaning Mississauga | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Mississauga, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Mississauga homes, condos and townhouses — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Mississauga, Ontario — from City Centre condos to homes in Port Credit and Streetsville. Include parking and elevator-booking details with your photos so the visit can be planned around your building.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Loveseats, sofas and sectionals with chaise can be cleaned in houses, townhouses and condos across Mississauga. Send a full-item photo and the seat count for an exact quote. We identify the upholstery on site, assess individual stains and select chemistry and a rinse appropriate to the fabric. Include elevator and parking details for condo appointments."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Wall-to-wall carpet cleaning for rooms, hallways and stairs in Mississauga homes and condos. We assess the fibre and soiling, then use a suitable extraction method to lift embedded dirt. Include room dimensions and stair counts with your photos. Drying passes and air movers support drying; we explain when each area can be used again."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Area rugs can be included with sofa or carpet cleaning when their material and backing are suitable. Send a photo, dimensions and any care label from your Mississauga home. We check fibre, backing and colour stability first, then confirm the cleaning approach and price before booking."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Mississauga quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Planned around your building.",
        "description": "For City Centre, Square One-area and Port Credit condos, share parking instructions and elevator reservations before booking. We plan the appointment around the access details you provide."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Do you clean condos in Mississauga?",
        "answer": "Yes. For condos in City Centre, the Square One area and Port Credit, share parking instructions and elevator-booking details with your photos. We confirm the arrangements so the appointment fits your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Mississauga do you cover?",
        "answer": "We serve Mississauga, including City Centre, Port Credit, Streetsville, Clarkson and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "City Centre",
      "Port Credit",
      "Streetsville",
      "Clarkson",
      "Meadowvale",
      "Erin Mills",
      "Cooksville",
      "Mineola"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Mississauga — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Mississauga? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "toronto": {
    "metaTitle": "Upholstery & Carpet Cleaning Toronto | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Toronto, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, couches, upholstery, carpets and area rugs in Toronto homes, condos and apartments — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, couches, upholstery, carpets and area rugs across Toronto, Ontario — including downtown condos and homes in North York, Scarborough, the Annex and the Beaches. Share loading access, parking instructions and any elevator reservation when requesting your quote.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Sofas and couches come in many shapes, from compact apartment loveseats to large sectionals with chaise. Send photos showing the whole piece and its seat count for a quote. We assess the upholstery, treat suitable stains and choose a fabric-appropriate cleaning and rinse method. For Toronto condos, share loading access and elevator arrangements before the visit."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Carpeted bedrooms, living rooms, hallways and stairs can be included in your Toronto cleaning visit. Send photos and approximate dimensions so the quote covers the areas you need. We assess the carpet before extraction and finish with drying passes and air movers where appropriate. Building access and room airflow help us plan the appointment."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Have an area rug under the coffee table or in a bedroom? Include its dimensions, photos and care label with your Toronto quote request. We assess the fibre, backing and colour stability before choosing a method. If an in-home clean is unsuitable, we explain that before proceeding."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Toronto quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Condo access planned ahead.",
        "description": "Downtown parking, loading areas and elevator reservations can affect the visit. Share your building rules with the photo request so we can confirm the arrangements before arriving."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "What should I arrange for a downtown condo appointment?",
        "answer": "Check whether your building needs an elevator reservation or a loading-dock time slot. Share those details and the parking instructions with your quote request and we'll plan the visit around them."
      },
      {
        "question": "Can I sit on my sofa the same evening?",
        "answer": "Often, yes, if the upholstery has fully dried. Most sofas usually dry within six to eight hours, but thick cushions, limited airflow and humidity can extend that. We explain the expected timing on site; wait until the fabric is fully dry before sitting on it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "Can you clean a sofa and mattress in the same visit?",
        "answer": "Often, yes. Include photos and sizes of both items with your quote request so we can allow enough time."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Toronto do you cover?",
        "answer": "We serve Toronto, including Downtown, Annex, Leslieville, Beaches and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Downtown",
      "Annex",
      "Leslieville",
      "Beaches",
      "North York",
      "Scarborough",
      "East York",
      "Liberty Village"
    ],
    "coverage": "Sofa, couch, carpet, rug and upholstery cleaning throughout Toronto — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Toronto? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "brampton": {
    "metaTitle": "Upholstery & Carpet Cleaning Brampton | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Brampton, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Brampton family homes — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Brampton, Ontario — including Heart Lake, Springdale, Bramalea and Castlemore. For a larger household or a whole-house appointment, send photos of all the items and carpeted areas you want included.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Large sectionals, family-room sofas and loveseats can all be included in one Brampton appointment. Pricing is based on seat count, so photograph the complete piece, including the chaise. We inspect the fabric and stains before choosing the chemistry and cleaning method. Include any other furniture you want cleaned in the same quote request."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "For a whole-house Brampton quote, send photos of each carpeted room, approximate dimensions and the stair count. Bedrooms, basements, hallways and busy traffic lanes can be assessed together. Extraction removes treatable embedded soil, while permanent wear may remain visible. We finish with drying passes and explain airflow and after-care for each area."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include area rugs from living rooms, bedrooms or dining spaces in your Brampton quote request. Photos, dimensions and care labels help us understand the items before the visit. Fibre, backing and colour stability determine the approach; we confirm suitability and the price rather than treating every rug the same way."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Brampton quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "A clear whole-house scope.",
        "description": "Include sofas, carpeted rooms, stairs, chairs and mattresses in the same request. Photos and room dimensions let us confirm the items, timing and combined quote before booking."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Can you quote whole-house carpet cleaning from photos?",
        "answer": "Yes. Send photos of each carpeted room plus approximate room dimensions and stair count. We'll confirm the scope and your final price before booking."
      },
      {
        "question": "Do you clean large sectionals?",
        "answer": "Yes — sectionals with chaise are everyday work for us. Pricing is by seat count, so include the full sectional in your photos."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Brampton do you cover?",
        "answer": "We serve Brampton, including Bramalea, Heart Lake, Springdale, Castlemore and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Bramalea",
      "Heart Lake",
      "Springdale",
      "Castlemore",
      "Credit Valley",
      "Fletcher's Meadow",
      "Downtown Brampton",
      "Sandringham"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Brampton — detached homes, townhouses, semis and apartments.",
    "coverageClosing": "Elsewhere in Brampton? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "etobicoke": {
    "metaTitle": "Upholstery & Carpet Cleaning Etobicoke | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Etobicoke, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Etobicoke homes, condos and townhouses — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Etobicoke, Toronto — from the Kingsway and Islington to Mimico, Alderwood and Long Branch. Share fabric care labels, stain concerns and building-access details with your quote request.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "From a compact Mimico condo sofa to a larger Kingsway living-room sectional, the cleaning method starts with the material. We check fibre, construction and colour stability, then choose suitable chemistry, moisture and agitation. Send a full-item photo and seat count for a quote, and tell us about any fabric labels or existing damage."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Wall-to-wall carpets in bedrooms, living rooms, hallways and stairs are assessed for fibre, condition and stains before cleaning. Whether your Etobicoke appointment is in a condo or a house, send room photos and dimensions for the quote. Suitable extraction and drying passes help refresh the carpet, with timing explained on site."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Area rug cleaning depends on more than the visible surface. We assess fibre, dyes and backing before selecting a method for your Etobicoke appointment. Send photos of both sides where practical, dimensions and the care label. We will confirm whether the rug is suitable for the proposed in-home treatment."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Etobicoke quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Care for delicate upholstery.",
        "description": "Linen-look weaves, bouclé and velvet are assessed before treatment. Moisture, agitation and products are selected for the material and condition rather than the neighbourhood or price of the furniture."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Do you handle delicate upholstery fabrics?",
        "answer": "Yes. We identify the fabric on site first and adjust the method — lower moisture, softer agitation, fabric-appropriate chemistry — for linen-look weaves, bouclé, velvet and similar materials."
      },
      {
        "question": "Do you clean condos in Etobicoke?",
        "answer": "Yes. Share your parking and elevator-booking details with the quote request and we'll plan around your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Etobicoke do you cover?",
        "answer": "We serve Etobicoke, including Kingsway, Islington, Mimico, New Toronto and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Kingsway",
      "Islington",
      "Mimico",
      "New Toronto",
      "Long Branch",
      "Alderwood",
      "Rexdale",
      "Humber Heights"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Etobicoke — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Etobicoke? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "burlington": {
    "metaTitle": "Upholstery & Carpet Cleaning Burlington | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Burlington, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Burlington homes, condos and townhouses — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Burlington, Ontario — including downtown condos and homes in Millcroft, the Orchard and Roseland. Send photos of each piece and any care labels so we can assess the scope before booking.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Loveseats, sofas and sectionals in Burlington homes and condos receive a fabric assessment before cleaning. Linen-look weaves, bouclé and everyday microfibre need different handling; we select moisture, chemistry and agitation for the piece in front of us. Send clear photos, the seat count and any care label for your final quote."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Carpet cleaning can cover a single room or several areas of your Burlington home, including hallways and stairs. Send photos, room dimensions and any stain concerns before booking. We choose the cleaning approach after assessing the carpet and finish with extraction and drying passes as appropriate. Airflow and fibre type affect the drying time."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "For an area rug in your Burlington living room or condo, send its dimensions and clear photos, including a care label if available. We check the fibre, backing and colour stability to choose an appropriate method. The assessment guides both the cleaning approach and your final quote."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Burlington quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "The method follows the material.",
        "description": "Care labels and on-site checks guide the approach for everyday fabrics and delicate upholstery. We explain suitability and limitations before starting your Burlington appointment."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Is your method safe for expensive upholstery?",
        "answer": "Suitability depends on the fabric and construction, rather than its price. We check the care information, assess the material and test an appropriate method before cleaning. If a piece cannot be treated safely with the available method, we explain that before proceeding."
      },
      {
        "question": "Do you clean condos in Burlington?",
        "answer": "Yes. Share your parking and elevator-booking details with the quote request and we'll plan around your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Burlington do you cover?",
        "answer": "We serve Burlington, including Downtown Burlington, Aldershot, Roseland, Millcroft and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Downtown Burlington",
      "Aldershot",
      "Roseland",
      "Millcroft",
      "Orchard",
      "Headon Forest",
      "Tansley"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Burlington — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Burlington? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "vaughan": {
    "metaTitle": "Upholstery & Carpet Cleaning Vaughan | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Vaughan, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Vaughan homes, condos and townhouses — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Vaughan, Ontario — including Woodbridge, Maple, Kleinburg, Vellore Village and Carrville. If the appointment follows a move or renovation, tell us about any work still underway so we can plan the timing.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Book cleaning for a living-room sofa, a family-room sectional or several upholstered pieces in one visit. For Vaughan homes, send photos of each item and its seat count so we can quote the complete scope. On site, we inspect the upholstery, assess stains and select a method suited to the fabric and condition."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Carpeted bedrooms, basements, hallways and stairs can be quoted together for your Vaughan home. After a move or renovation, tell us whether any dusty work is still underway so we can plan the timing. We assess the fibre and soil before cleaning; extraction and drying passes address treatable buildup without promising to reverse wear."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Area rugs can be assessed alongside your sofas and fitted carpets during a Vaughan appointment. Include dimensions, photos and care-label details when requesting a combined quote. We check the fibre, colour stability and backing before confirming the method, so delicate and everyday rugs receive suitable handling."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Vaughan quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Practical move-in planning.",
        "description": "After moving or renovating, arrange cleaning around the remaining work. Send photos of carpeted rooms and upholstered items so we can confirm the scope and a suitable appointment."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "We just moved into a new build — when should the carpet be cleaned?",
        "answer": "Choose the timing based on the carpet condition and any work still underway. Send room photos and let us know about construction or renovation dust. We can advise whether cleaning is useful now or should follow the remaining dusty work; new carpet does not automatically need a deep clean."
      },
      {
        "question": "Do you clean condos in Vaughan?",
        "answer": "Yes. Share your parking and elevator-booking details with the quote request and we'll plan around your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Vaughan do you cover?",
        "answer": "We serve Vaughan, including Woodbridge, Maple, Kleinburg, Concord and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Woodbridge",
      "Maple",
      "Kleinburg",
      "Concord",
      "Vellore Village",
      "Carrville",
      "Thornhill (Vaughan side)",
      "Patterson"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Vaughan — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Vaughan? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "milton": {
    "metaTitle": "Upholstery & Carpet Cleaning Milton | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Milton, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Milton homes, townhouses and condos — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Milton, Ontario — including Old Milton, Beaty, Clarke, Dempsey, Ford and Harrison. For a move-in or post-renovation visit, include the rooms, furniture and project timing with your quote request.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Sofas, loveseats and sectionals with chaise can be included in the same Milton visit as carpet or chair cleaning. Send a complete photo of each piece and the seat count for a combined quote. We identify the upholstery on site and adjust the products and cleaning method to its material, condition and care requirements."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Book carpet cleaning for bedrooms, basements, hallways and stairs in Milton houses and townhouses. If you are moving in or finishing renovations, share the work schedule so cleaning can follow the dusty jobs. Room photos, dimensions and stair counts help us quote accurately. We assess the carpet, clean with an appropriate method and provide drying guidance."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Add an area rug to your Milton quote request with photos, dimensions and any care label. We assess its fibre, backing and colour stability before recommending cleaning. Combining suitable rugs with other items can help organize one appointment, with the approach and full price confirmed in advance."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Milton quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Cleaning around your move.",
        "description": "Share your move-in date or renovation schedule along with room and furniture photos. We can discuss timing so the clean follows dusty work and allows time for drying."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "We just bought a new build — should we clean the carpet right away?",
        "answer": "It depends on the carpet condition and whether building work is complete. For a Milton move-in appointment, send room photos and tell us about any remaining dusty work. We can advise on a suitable time; newly installed carpet does not automatically require deep cleaning."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Milton do you cover?",
        "answer": "We serve Milton, including Old Milton, Beaty, Clarke, Dempsey and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Old Milton",
      "Beaty",
      "Clarke",
      "Dempsey",
      "Scott",
      "Ford",
      "Harrison",
      "Timberlea",
      "Dorset Park"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Milton — houses, townhouses, semis and condos.",
    "coverageClosing": "Elsewhere in Milton? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "hamilton": {
    "metaTitle": "Upholstery & Carpet Cleaning Hamilton | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Hamilton, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Hamilton homes, condos and apartments — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Hamilton, Ontario — including Dundas, Westdale, Ancaster and Stoney Creek. Tell us about existing wear, older fabrics and persistent stains so we can discuss realistic expectations before the visit.",
      "We assess the fabric and its condition on site, including care labels and colour stability, before choosing chemistry and a cleaning method. Suitable extraction and individual stain treatment address the assessed soil, followed by drying passes and air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "A favourite sofa can need cleaning without needing replacement. We assess fabric, stains and existing wear before recommending an approach for your Hamilton home. Loveseats, sofas and sectionals are quoted by seat count from full-item photos. Cleaning can remove treatable soil; worn fibres and permanent colour loss will remain."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Older carpet can hold removable soil and also show permanent wear. For Hamilton rooms, hallways and stairs, we assess both before setting expectations. Suitable extraction can lift embedded dirt and debris, but it cannot restore worn fibres or lost colour. Send room photos, dimensions and stain details for a quote that covers the full scope."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "An area rug may need a different method from the fitted carpet beside it. For your Hamilton appointment, send its size, photos and any care information. We check fibre, backing and colour stability before recommending treatment, and explain any limitations before confirming the price."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Hamilton quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "Honest about older carpet.",
        "description": "Embedded soil may be treatable while worn fibres and colour loss remain. We assess the carpet first and explain the likely improvement rather than promising to make every older surface look new."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Can old carpet with years of buildup actually be cleaned?",
        "answer": "Often, yes. We assess the fibre, backing and condition first. Suitable extraction can remove treatable embedded soil, but permanent wear, damaged fibres and colour loss remain. Send photos of the carpet and any specific concerns so we can discuss the expected result."
      },
      {
        "question": "Can you remove dust and pet dander from carpet?",
        "answer": "Suitable extraction can remove trapped soil and some dust and pet dander from carpet and upholstery. Results depend on the material and condition. Cleaning is not a guarantee of allergy relief, and we explain what the treatment can realistically address."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Hamilton do you cover?",
        "answer": "We serve Hamilton, including Dundas, Ancaster, Westdale, Durand and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Dundas",
      "Ancaster",
      "Westdale",
      "Durand",
      "Corktown",
      "Stoney Creek",
      "Waterdown",
      "Binbrook"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Hamilton — houses, condos, townhouses and apartments.",
    "coverageClosing": "Elsewhere in Hamilton? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  },
  "oakville": {
    "metaTitle": "Upholstery & Carpet Cleaning Oakville | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa, carpet and rug cleaning in Oakville, ON. Fabric-appropriate methods, free photo quotes and one final price with tax included.",
    "heroDescription": "Deep cleaning for sofas, upholstery, carpets and area rugs in Oakville homes, townhouses and condos — fabric-safe chemistry, commercial-grade extraction, and one final price quoted from your photos.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and area rugs across Oakville, Ontario.",
      "We start every job by identifying your fabric on site — linen-look weaves, bouclé, microfibre, synthetics — and choose the chemistry and method to suit the material. Suitable extraction, individual stain treatment and drying passes follow the assessment, with air movers where appropriate.",
      "Send us photos and get one final price — tax included, no surprises."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Our main work. Loveseats, 3-seat and 4-seat sofas, sectionals with chaise — we price by the number of seats, so send a photo and get an exact quote. Every sofa gets on-site fabric identification, chemistry matched to the material and individual stain assessment, with a rinse suited to the fabric."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Wall-to-wall carpet cleaning for bedrooms, living rooms, hallways and stairs. Suitable extraction lifts embedded dirt and debris that routine vacuuming can leave behind. Drying passes and air movers support drying, and we explain when your floors can be used again based on the carpet and room conditions."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Deep cleaning for suitable area rugs of different sizes. We assess fibre, backing and colour stability first, then choose the right method. Send a photo and dimensions — we will confirm suitability, the approach and your final price."
      }
    ],
    "more": "Armchairs, dining chairs, mattresses, pet stain and odour treatment, and fabric protection for suitable materials can be included in your Oakville quote. Send photos of everything you want cleaned so we can confirm the scope and plan one visit.",
    "advantages": [
      {
        "title": "We read the fabric first.",
        "description": "Upholstery is assessed on site. Fibre, construction, care information and condition guide the cleaning method and products."
      },
      {
        "title": "One trip, everything planned.",
        "description": "Sofas, carpets, suitable rugs, chairs and mattresses can be included in one request. We confirm the scope and appointment time before booking."
      },
      {
        "title": "Straight talk on stains.",
        "description": "We explain which marks look treatable and where permanent wear, colour loss or fibre damage may remain before starting."
      },
      {
        "title": "One photo request, one price.",
        "description": "Send photos of all the items for a final quote with tax included. We confirm the scope before booking; any additional work is agreed with you first."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Send photos of what you want cleaned. You'll get a free, exact quote — one final price, tax included, no extra fees."
      },
      {
        "question": "Do you work in Oakville townhouses and condos?",
        "answer": "Yes. Include parking, entry and building-access details with your photos. For condos, check any elevator reservation requirements so we can plan the visit before confirming your appointment."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas usually dry within six to eight hours. Carpet drying varies with fibre, moisture, airflow and room conditions. We use drying passes and air movers where appropriate and explain the expected timing on site. Wait until the fabric is fully dry before use."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "Often, yes. We assess the contamination and choose a suitable treatment, which may include enzymes before extraction. Old urine can reach foam, backing or underlay and limit the result. We explain those limits before cleaning; complete stain or odour removal cannot be guaranteed."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment applied after cleaning to suitable materials. It can help resist some spills and make prompt cleanup easier, but it does not prevent every stain. We check compatibility and explain application and drying requirements before you decide."
      },
      {
        "question": "Which parts of Oakville do you cover?",
        "answer": "We serve Oakville, including Old Oakville, Bronte, Glen Abbey, Clearview and the other areas listed below. Send your postal code, the items you need cleaned and access details so we can confirm coverage and an appointment."
      }
    ],
    "neighbourhoods": [
      "Old Oakville",
      "Bronte",
      "Glen Abbey",
      "Clearview",
      "River Oaks",
      "West Oak Trails",
      "Palermo",
      "Joshua Creek"
    ],
    "coverage": "Sofa, carpet, rug and upholstery cleaning throughout Oakville — houses, townhouses, condos and apartments.",
    "coverageClosing": "Elsewhere in Oakville? Send your postal code and access details so we can confirm coverage and appointment availability.",
    "ctaTitle": "Ready for a cleaner home?",
    "ctaDescription": "Send a photo for a free quote — one final price, tax included."
  }
};
