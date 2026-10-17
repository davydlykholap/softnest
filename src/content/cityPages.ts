import type { LocationFaq } from "@/content/locations";

export type CityPageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  introductionHeading: string;
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
    "metaDescription": "Sofa, upholstery and carpet cleaning in Mississauga homes and condos, including Port Credit and Streetsville. Free quotes with a confirmed tax-inclusive price.",
    "heroDescription": "Professional sofa, upholstery, carpet and area rug cleaning in Mississauga. Plan one item or several rooms, with a free quote and clear expectations before booking.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans sofas, upholstery, carpets and suitable area rugs across Mississauga, from City Centre condos to homes in Port Credit and Streetsville. Tell us which items or rooms need attention and what you would like to improve.",
      "For condo visits, include parking instructions and any elevator reservation requirements. For larger requests, list all the furniture, carpeted rooms and stairs together so we can confirm all the work and plan the appointment."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Refresh a loveseat, couch or sectional without guessing which treatment suits the fabric. We assess the material and condition, discuss visible marks and clean the agreed accessible areas. Share a full-item photo and seat count, along with any care label and condo access details. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Request carpet cleaning for rooms, hallways and stairs in your Mississauga home or condo. Photos, room dimensions and stair counts help us prepare an accurate quote. We explain realistic results for traffic marks and stains, plus how airflow and room conditions affect drying. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include an area rug with your furniture or carpet request by sharing its dimensions, photos and care label. We check its material and backing before confirming whether in-home cleaning is suitable. Rugs needing a different specialist treatment are discussed before work begins. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Planned around your building.",
        "description": "For City Centre, Square One-area and Port Credit condos, share parking instructions and elevator reservations before booking. We plan the appointment around the access details you provide."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Do you clean condos in Mississauga?",
        "answer": "Yes. For condos in City Centre, the Square One area and Port Credit, share parking instructions and elevator-booking details with your request. We confirm the arrangements so the appointment fits your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Mississauga?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Fresh care, with your visit planned."
  },
  "toronto": {
    "metaTitle": "Upholstery & Carpet Cleaning Toronto | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, couch, upholstery and carpet cleaning in Toronto homes and condos. Plan loading and elevator access and request a free tax-inclusive quote.",
    "heroDescription": "Sofa, couch, upholstery and carpet cleaning for Toronto homes, condos and apartments. Tell us about your items and building access for a free quote and a well-planned visit.",
    "introductionParagraphs": [
      "SoftNest Fabric Care provides in-home sofa, upholstery and carpet cleaning across Toronto, including North York, Scarborough, the Annex and the Beaches. We help with a single item or several pieces and carpeted areas in the same request.",
      "For downtown condos and apartments, share loading instructions, parking and any elevator booking or service-hour restrictions. Confirming access and the complete work in advance helps us plan an appointment that fits your home and building."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Compact loveseats, everyday couches and larger sectionals can all be assessed for cleaning. Share a full photo, the seat count and any stains or odours that concern you. We check the material and condition, then explain the treatment and its limits before starting. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include carpeted bedrooms, living rooms, hallways and stairs in your Toronto request. Approximate dimensions and photos help define the work. Tell us about building access and any furniture covering the carpet so we can confirm the areas to be cleaned. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Have a rug under the coffee table or in a bedroom? Share its dimensions, both sides where practical, and the care label. Fibre, backing and dye stability affect whether an in-home treatment is suitable; we confirm the approach before cleaning."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Condo access planned ahead.",
        "description": "Downtown parking, loading areas and elevator reservations can affect the visit. Share your building rules with your request so we can confirm the arrangements before arriving."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "What should I arrange for a downtown condo appointment?",
        "answer": "Check whether your building needs an elevator reservation or a loading-dock time slot. Share those details and the parking instructions with your quote request and we'll plan the visit around them."
      },
      {
        "question": "Can I sit on my sofa the same evening?",
        "answer": "Often, yes, once the fabric is completely dry. Most sofas dry in about six to eight hours, but thick cushions or a humid room can take longer. Tell us if you need the sofa that evening so we can help you plan the appointment and drying time."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "Can you clean a sofa and mattress in the same visit?",
        "answer": "Often, yes. Tell us the sofa and mattress sizes and what you'd like cleaned so we can allow enough time and confirm a total price. Photos are welcome if you'd like to send them. We'll also help you plan time for both items to dry."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Toronto?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Straightforward care for city homes."
  },
  "brampton": {
    "metaTitle": "Upholstery & Carpet Cleaning Brampton | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, sectional, upholstery and carpet cleaning in Brampton. Include rooms, stairs and furniture in one request for a free tax-inclusive quote.",
    "heroDescription": "Refresh sofas, sectionals, carpets and suitable rugs in your Brampton home. Include everything you want cleaned in one request for a free quote and a clearly planned visit.",
    "introductionParagraphs": [
      "SoftNest Fabric Care provides sofa, upholstery and carpet cleaning across Brampton, including Bramalea, Heart Lake, Springdale and Mount Pleasant. From one well-used couch to several rooms, we help you plan the work around the items that need attention.",
      "Tell us the items, room sizes and any carpeted stairs. Photos are optional. Tell us about spills, pet accidents or access concerns so the quote covers your request and we can explain what cleaning may improve."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "A family-room sectional, living-room sofa or loveseat can be included in your Brampton appointment. Share the complete piece, including a chaise, and note any stains or odours. We inspect the material and accessible cushions before confirming treatment and realistic results."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Book carpet cleaning for bedrooms, basements, hallways and stairs. Photos, dimensions and stair counts help us quote the areas you need. We address treatable soil and explain where wear may remain visible, along with drying and after-care guidance. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Add a rug to your request with its dimensions, photos and care label. We assess its material and backing before recommending in-home cleaning. If a rug needs specialist care, we explain the limitation rather than applying the same method to every item. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "A clear plan for the whole home.",
        "description": "Include sofas, carpeted rooms, stairs, chairs and mattresses in the same request. Photos and room dimensions let us confirm the items, timing and combined quote before booking. Photos are optional."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can you quote whole-house carpet cleaning from photos?",
        "answer": "Yes. Photos can help, but you can also call or text us with the number of rooms, approximate sizes and any stairs. We'll help you work out what needs cleaning and confirm the total price before booking."
      },
      {
        "question": "Do you clean large sectionals?",
        "answer": "Yes, including sectionals with a chaise. Tell us the number of seats and any separate pieces you'd like cleaned. If you're unsure how to count them, describe the layout or send a photo if you'd like. We'll help work it out and confirm the total price."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Brampton?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Plan the furniture and floors together."
  },
  "etobicoke": {
    "metaTitle": "Upholstery & Carpet Cleaning Etobicoke | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning for Etobicoke houses, apartments and condos. Discuss parking and access, and request a free tax-inclusive quote.",
    "heroDescription": "Professional sofa, upholstery, carpet and area rug cleaning for Etobicoke houses, apartments and condos. Share what needs cleaning and your access details so we can plan the visit with you.",
    "introductionParagraphs": [
      "SoftNest Fabric Care serves Etobicoke, including Mimico, the Kingsway, Islington, Alderwood and Long Branch. We clean everyday furniture and suitable carpets and rugs, whether you need one couch refreshed or several items treated in the same appointment.",
      "For apartments and condos, a little planning makes the visit easier. Tell us about parking, elevators, stairs and building time restrictions when requesting your quote. We confirm the work and access arrangements before booking, so you know what to prepare."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "From a compact apartment sofa to a larger living-room sectional, the cleaning method depends on the furniture in front of us. Share a full-item photo, the seat count and any care label. Point out spills, body-oil buildup or pet accidents so we can discuss realistic treatment and results. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "We clean suitable carpets in Etobicoke bedrooms, living rooms, hallways and stairs. Share room sizes, stair counts and photos to help us understand the work needed. We explain expected drying conditions and any limitations before you plan to use the area again. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Area rugs need a check of their material, dyes and backing before cleaning. Include dimensions, photos and a care label where available. We confirm suitability before recommending an in-home treatment and explain when specialist care would be more appropriate. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Care for delicate upholstery.",
        "description": "Linen-look weaves, bouclé and velvet are assessed before treatment. Moisture, agitation and products are selected for the material and condition rather than the neighbourhood or price of the furniture."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Do you handle delicate upholstery fabrics?",
        "answer": "We can clean many delicate fabrics, but the right method depends on the material and condition. Tell us about your furniture and any care label. We'll check and test the fabric before cleaning, and discuss the options if it needs a different approach."
      },
      {
        "question": "Do you clean condos in Etobicoke?",
        "answer": "Yes, subject to confirming the work and suitable access. Include parking and loading instructions, your floor, elevator reservation requirements and building restrictions. If your building needs contractor documents, tell us before booking so we can confirm whether we can meet its requirements."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your space in Etobicoke?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Cleaning planned around your home."
  },
  "burlington": {
    "metaTitle": "Upholstery & Carpet Cleaning Burlington | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery, carpet and area rug cleaning in Burlington, including Millcroft and the Orchard. Request a free quote with a confirmed tax-inclusive price.",
    "heroDescription": "Professional sofa, upholstery, carpet and area rug cleaning across Burlington. Refresh one favourite piece or plan several items together, with clear advice and a free quote.",
    "introductionParagraphs": [
      "SoftNest Fabric Care cleans upholstery and carpets in Burlington homes and condos, including downtown, Millcroft, the Orchard and Roseland. Tell us whether you need a couch refreshed, carpeted rooms cleaned or several items included in one visit.",
      "Photos, sizes and a short description of stains or odours help us understand your request. We confirm the work and discuss access, material suitability and expected results before booking."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Loveseats, sofas and sectionals need care suited to their material and condition. Share a full photo of each piece, the seat count and any care label. We assess stains and high-use areas before choosing treatment and explain what can realistically improve. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include rooms, hallways and carpeted stairs in your Burlington quote request. Approximate dimensions and photos help us understand the work needed. We discuss stains, accessible areas and drying conditions so you know how to prepare for the visit. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Suitable rugs can be assessed alongside your furniture or fitted carpets. Share dimensions, care information and photos showing the surface and backing. We confirm whether in-home cleaning is appropriate before the work is agreed. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "The method follows the material.",
        "description": "Care labels and on-site checks guide the approach for everyday fabrics and delicate upholstery. We explain suitability and limitations before starting your Burlington appointment."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Is your method safe for expensive upholstery?",
        "answer": "We'll check the fabric, care label and condition, then test a suitable method before cleaning. Tell us about any delicate materials or previous treatments when you get in touch. If the furniture needs a different approach, we'll explain the options before you decide."
      },
      {
        "question": "Do you clean condos in Burlington?",
        "answer": "Yes. Share your parking and elevator-booking details with the quote request and we'll plan around your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Burlington?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "A fresh start for everyday spaces."
  },
  "vaughan": {
    "metaTitle": "Upholstery & Carpet Cleaning Vaughan | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, sectional and carpet cleaning in Vaughan, including Woodbridge, Maple and Kleinburg. Plan your visit and request a free tax-inclusive quote.",
    "heroDescription": "Sofa, sectional, upholstery and carpet cleaning for Vaughan homes and condos. Plan the items you need cleaned together, with a free quote and clear expectations before the visit.",
    "introductionParagraphs": [
      "SoftNest Fabric Care provides upholstery and carpet cleaning across Vaughan, including Woodbridge, Maple, Kleinburg and Vellore Village. List your furniture, carpeted rooms and stairs together so we can confirm the complete work before booking.",
      "If you are moving or finishing renovations, tell us about any dusty work still underway. For condos, include parking and elevator details. We discuss practical timing, access and drying so the appointment fits the space."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Request cleaning for a living-room sofa, a sectional or several upholstered pieces. Share a complete photo and seat count for each item. We inspect the material and existing wear, assess stains and explain the proposed treatment before starting. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Carpeted bedrooms, basements, hallways and stairs can be quoted together for your Vaughan home. Include approximate dimensions and photos of marks or heavy-use areas. We explain what is treatable and provide drying guidance for the rooms being cleaned. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include photos, dimensions and any care label for an area rug you want assessed. The material, dyes and backing determine whether in-home cleaning is suitable. We confirm the approach before including the rug in the agreed work. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Practical move-in planning.",
        "description": "After moving or renovating, arrange cleaning around the remaining work. Send photos of carpeted rooms and upholstered items so we can confirm the work and a suitable appointment. Photos are optional."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "When should I clean the carpet in a new home?",
        "answer": "Tell us about the carpet's condition and any construction or decorating still underway. We'll help you decide whether cleaning would be useful now or better left until the dusty work is finished. You can describe the rooms by phone or text; photos are optional."
      },
      {
        "question": "Do you clean condos in Vaughan?",
        "answer": "Yes. Share your parking and elevator-booking details with the quote request and we'll plan around your building's rules."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Vaughan?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Furniture and carpet care, clearly planned."
  },
  "milton": {
    "metaTitle": "Upholstery & Carpet Cleaning Milton | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning in Milton. Plan furniture, room and stair cleaning together, with free quotes and a confirmed tax-inclusive price.",
    "heroDescription": "Refresh well-used sofas, sectionals, carpets and area rugs with professional cleaning in Milton. Request a free quote for your home, townhouse or condo.",
    "introductionParagraphs": [
      "Everyday spills, pet accidents and busy family life can leave furniture and carpets needing more than routine vacuuming. SoftNest Fabric Care provides upholstery and carpet cleaning across Milton, including Old Milton, Beaty, Clarke, Dempsey, Ford and Harrison.",
      "Whether you need one couch cleaned or want to plan several rooms together, we confirm the items and areas before booking. Moving in or finishing renovations? Let us know your schedule so we can discuss cleaning after dusty work is complete and allow time for drying."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "We clean sofas, loveseats and sectionals, paying attention to armrests, seat cushions and other areas where daily use leaves marks. Share a full photo of each piece, including the chaise, and point out stains or odours. We assess the material and can try to improve difficult or older marks, without promising complete removal. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include bedrooms, basement carpets, hallways and carpeted stairs in your Milton request. Room dimensions, photos and stair counts help us understand the work. We explain the cleaning approach and expected drying conditions before you plan to use the area again. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Want a rug cleaned during the same visit? Share its size, photos of both sides where practical, and the care label. We check the material and backing before confirming whether it is suitable for in-home treatment. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Cleaning around your move.",
        "description": "Share your move-in date or renovation schedule along with room and furniture photos. We can discuss timing so the clean follows dusty work and allows time for drying. Photos are optional."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "When should I schedule carpet cleaning around a move?",
        "answer": "Tell us your move date and whether painting or other dusty work is still happening. We'll help you choose a time that fits around the work and leaves enough drying time before furniture goes back. If the carpet is newly installed, we'll discuss whether it needs cleaning at all."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Milton?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Cleaning for the rooms you use every day."
  },
  "hamilton": {
    "metaTitle": "Upholstery & Carpet Cleaning Hamilton | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning in Hamilton homes, apartments and condos. Explain your cleaning needs and request a free tax-inclusive quote.",
    "heroDescription": "Professional sofa, upholstery and carpet cleaning in Hamilton homes, apartments and condos. Tell us what needs attention for a free quote and clear guidance before booking.",
    "introductionParagraphs": [
      "SoftNest Fabric Care offers sofa, upholstery and carpet cleaning in Hamilton. Include the furniture, carpeted rooms and suitable rugs you want assessed so we can confirm the work and appointment availability for your address.",
      "Tell us about stairs, parking or building access. Photos and care labels are welcome if you wish. We discuss what can reasonably be improved and explain drying expectations before you plan to use the cleaned items again."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Request cleaning for sofas, loveseats and sectionals, from a single piece to several items in one appointment. Share full-item photos and any stain or odour concerns. We check the upholstery and condition before choosing a method and explaining its limits. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include carpeted rooms, hallways and stairs in your Hamilton request. Photos, dimensions and stair counts help define the work. We assess treatable marks and existing wear, then provide drying and after-care advice for the cleaned areas. Photos are optional."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Area rugs need a material and backing check before treatment. Share their dimensions, photos and care labels where available. We confirm whether in-home cleaning is suitable and explain when another specialist approach would be needed. Photos are optional."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "Honest about older carpet.",
        "description": "Embedded soil may be treatable while worn fibres and colour loss remain. We assess the carpet first and explain the likely improvement rather than promising to make every older surface look new."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can old carpet with years of buildup actually be cleaned?",
        "answer": "Yes. Removing built-up dirt can often make older carpet look fresher. Show us the stains or worn-looking areas and tell us about any products you've tried so we can choose a treatment. Permanent wear or colour changes may still show, but we can try to improve the overall appearance and explain what to expect before starting."
      },
      {
        "question": "Can you remove dust and pet dander from carpet?",
        "answer": "Cleaning helps lift trapped dirt, dust and pet dander from carpet and fabric furniture. Tell us which rooms or pieces your pets use most so we can plan the cleaning around the areas that need attention. We'll explain the method and the drying time before we start."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Hamilton?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Care for the furniture you live with."
  },
  "oakville": {
    "metaTitle": "Upholstery & Carpet Cleaning Oakville | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa and carpet cleaning across Oakville, from Bronte to Glen Abbey and Joshua Creek. Request a free quote with a confirmed tax-inclusive price.",
    "heroDescription": "Bring a fresher feel to your sofas, chairs, carpets and area rugs. Professional cleaning across Oakville, with care matched to the material and clear expectations before work begins.",
    "introductionParagraphs": [
      "SoftNest Fabric Care offers upholstery, sofa and carpet cleaning across Oakville, including Bronte, Glen Abbey, River Oaks and Joshua Creek. We help with everyday furniture in houses, townhouses and condos, from a favourite couch to a dining-chair set or sectional.",
      "Tell us about spills, visible marks, pet odours or general buildup. We assess what can reasonably be improved, explain the proposed work and confirm the work before cleaning. You do not need to identify the fabric yourself; a photo of the care label helps us prepare."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "We clean loveseats, sofas and sectionals, including the accessible cushions and high-use areas agreed in your quote. Share a photo of the whole piece and close-ups of any concerns. Material and condition guide the treatment. We can try to improve old stains, wear or colour changes, without promising complete removal or restoration. Photos are optional."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Ask about carpet cleaning for bedrooms, living rooms, hallways and stairs in your Oakville home. Room sizes and stair counts help us quote the complete work. We discuss stains, access and expected drying conditions so you can plan around the visit."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Tell us your rug dimensions when requesting a quote. Care labels and photos are optional. We check the material, dyes and backing before recommending in-home cleaning. Some delicate or unstable rugs require specialist off-site care instead."
      }
    ],
    "more": "You can also ask about chairs, mattresses and pet stain or odour treatment. Include all the items and concerns in one request so we can confirm suitability, the complete work and appointment time.",
    "advantages": [
      {
        "title": "Care suited to the material.",
        "description": "We assess the fabric, condition and care information before choosing a treatment for each item."
      },
      {
        "title": "One trip, everything planned.",
        "description": "Sofas, carpets, suitable rugs, chairs and mattresses can be included in one request. We confirm the work and appointment time before booking."
      },
      {
        "title": "Realistic advice on results.",
        "description": "We explain which marks may improve and where wear, lost colour or spills deep in the material may limit the result."
      },
      {
        "title": "Clear quotes and pricing.",
        "description": "The agreed quote includes tax. Any additional items or treatments are discussed and agreed with you before work begins."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or request a quote through our website. Tell us your city and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "What should I arrange for an Oakville condo appointment?",
        "answer": "Include parking instructions, entry arrangements and any building rules with your request. Check whether your building requires an elevator reservation or documents from contractors, and tell us before booking so we can confirm whether the arrangements can be met."
      },
      {
        "question": "How long until it's dry?",
        "answer": "Most sofas dry in about six to eight hours. Carpet drying depends on the material, room conditions and how much cleaning is needed. We'll explain the expected timing and how to help the area dry. Wait until the fabric or carpet is fully dry before using it."
      },
      {
        "question": "Can you get pet stains and odour out?",
        "answer": "We can usually remove pet stains and odours. Older or repeated accidents may have soaked into cushions or carpet backing, so they can need more attention. Show us the affected areas and tell us about any products you've tried. We'll choose a suitable treatment and do our best to improve the stain and smell, without promising complete removal."
      },
      {
        "question": "What is fabric protection?",
        "answer": "Fabric protection is an optional treatment we can apply after cleaning if it suits the material. It can make some spills easier to clean up, but doesn't make fabric stain-proof. Ask us about it when you book and we'll check whether it's right for your furniture."
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
    "ctaTitle": "Ready to refresh your home in Oakville?",
    "ctaDescription": "Call, message us or request a free quote through the form. Photos are optional. We confirm the work and a tax-inclusive price before booking.",
    "introductionHeading": "Practical care for well-used furniture."
  }
};
