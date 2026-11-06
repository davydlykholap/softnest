import type { LocationFaq } from "@/content/locations";
import localCopy from "@/content/generated/localCopy.json";

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

// Reviewed fallback copy keeps local/seed builds complete. Published Studio
// wording overrides it after validation in content:sync.
// Use plain language and useful questions, not city-name swaps or invented
// local claims. Shared quote terms stay consistent across service areas.
export const reviewedCityPages: Record<string, CityPageCopy> = {
  "mississauga": {
    "metaTitle": "Upholstery & Carpet Cleaning Mississauga | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning in Mississauga, from City Centre condos to Streetsville homes. Suitable area rugs too. Request a free quote.",
    "heroDescription": "In-home sofa, upholstery and carpet cleaning across Mississauga. From one chair to furniture and rugs together, choose the items that need attention.",
    "introductionParagraphs": [
      "Our Mississauga coverage includes City Centre, Port Credit, Streetsville and Clarkson. We clean fabric furniture, carpets and suitable rugs where they are used, so there is no need to transport a sofa or chair.",
      "For a condo, tell us about loading access and elevator reservations. For a house, identify the floors where cleaning is needed. Those details help us plan the visit without leaving access questions until arrival."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "A loveseat, sofa bed or sectional can be cleaned as part of the visit. Tell us about the seating layout and any loose cushions. We inspect the upholstery before treating spills, marks and dirt on the agreed surfaces."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Choose the carpeted rooms, halls and stairs you want cleaned. Approximate measurements help with the quote. Let us know if furniture covers part of the floor so we can discuss what is reachable."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "A rug beneath the coffee table may need different care from the fitted carpet nearby. We check the fibre and backing, look for unstable colour and confirm whether it can be cleaned in your home."
      }
    ],
    "more": "Chairs, mattresses and pet stain treatment are also available. Mention these when you first get in touch so the appointment allows for more than the sofa.",
    "advantages": [
      {
        "title": "In-home service.",
        "description": "We come to the Mississauga address you provide. List the room and floor for each item, especially when furniture is spread through the home."
      },
      {
        "title": "Building details considered.",
        "description": "In City Centre or Port Credit, check your condo rules for loading, parking and elevator use. We discuss those arrangements with you before booking."
      },
      {
        "title": "Several items, one request.",
        "description": "Furniture, rugs and fitted carpets can be assessed together. Different materials still get separate checks before cleaning."
      },
      {
        "title": "A clear total.",
        "description": "We confirm the final price, including tax. Optional treatment and any additional items are discussed before you agree to them."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can you clean furniture in City Centre condos?",
        "answer": "Yes, with suitable access. Ask management about visitor parking, loading and elevator bookings, and tell us the rules. We confirm the arrangements before setting the visit."
      },
      {
        "question": "Do I need to take my sofa apart?",
        "answer": "No. Remove personal belongings and leave space to reach the piece. Tell us if cushions detach or parts recline, but don't move heavy sections without discussing it with us."
      },
      {
        "question": "Can a rug be included with carpet cleaning?",
        "answer": "Often. Give us its size and any care information. We check it separately because the backing, dyes and fibre can differ from the carpet underneath."
      },
      {
        "question": "How do I prepare rooms with furniture in them?",
        "answer": "Pick up small items and identify the floor areas you want cleaned. Tell us if heavy furniture needs moving so we can agree what is practical and safe."
      },
      {
        "question": "How long will upholstery stay damp?",
        "answer": "Most fabric seating dries in about six to eight hours. Thick cushions and humid rooms may need longer. Keep it uncovered and wait until it is completely dry before use."
      },
      {
        "question": "Is my Mississauga neighbourhood covered?",
        "answer": "We serve the areas listed below, including Meadowvale, Erin Mills, Cooksville and Mineola. If your address is elsewhere in Mississauga, send your postal code so we can check it."
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
    "coverage": "Furniture and carpet cleaning is available across these Mississauga neighbourhoods, in houses and multi-unit buildings.",
    "coverageClosing": "Have parking or entry instructions for your address? Include them when arranging the visit.",
    "ctaTitle": "Tell us what needs cleaning.",
    "ctaDescription": "Contact us for a free Mississauga quote. Describe the furniture, rooms or rugs; we'll discuss the work and available appointments.",
    "introductionHeading": "A visit planned for your home."
  },
  "toronto": {
    "metaTitle": "Upholstery & Carpet Cleaning Toronto | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa and carpet cleaning in Toronto homes and condos. Plan building access, carpeted rooms and drying time. Get a free quote from SoftNest.",
    "heroDescription": "Sofa and carpet cleaning for Toronto apartments, condos and houses. Arrange the cleaning and drying time around your building rules and the rooms you use.",
    "introductionParagraphs": [
      "SoftNest serves Toronto, including Downtown, North York, Scarborough, the Annex and the Beaches. We clean upholstery, fitted carpet and suitable area rugs, whether the request is for one couch or several items.",
      "If your building only allows service visits at certain hours, tell us before booking. An elevator slot is one part of the plan; the furniture and floors also need time to dry after the cleaning is finished."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "We clean apartment couches, sofa beds and larger seating. Fixed cushions and removable covers are checked before treatment. Tell us whether you want the whole accessible piece cleaned or have a particular spill or odour to address."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "You can request bedrooms, living spaces and connecting carpeted areas. Identify anything that must remain accessible during the work. We explain how to plan room use while the carpet dries."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Cleaning a rug in a furnished room requires access to it. Tell us the rug size and what sits on top. We assess the material and discuss any moving needed before deciding on the work."
      }
    ],
    "more": "Need a mattress or recliner cleaned as well? Mention it before booking, particularly if you need the bed or seating later that day.",
    "advantages": [
      {
        "title": "Building hours checked.",
        "description": "Tell us about loading-dock times, elevator reservations and service restrictions. We can discuss whether the requested work fits those arrangements."
      },
      {
        "title": "Useful drying advice.",
        "description": "We explain how airflow, cushion thickness and room conditions affect drying, rather than promising every item will be ready at one fixed time."
      },
      {
        "title": "Furniture assessed in place.",
        "description": "Material, care labels and existing condition guide the method. You do not need to choose a cleaning technique yourself."
      },
      {
        "title": "Contact without a form.",
        "description": "A phone call or text is fine. Describe the items and address, and we will confirm a tax-inclusive price before booking."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can you work within a condo elevator time slot?",
        "answer": "Tell us the available slot and the items to be cleaned before reserving it. We need to consider loading, access and the work itself before agreeing on a time."
      },
      {
        "question": "Can I use one room while another carpet dries?",
        "answer": "Tell us which rooms and routes you need. We can discuss the order of work, but cleaned carpet should be allowed to dry before normal use."
      },
      {
        "question": "Does a sofa bed need special preparation?",
        "answer": "Remove bedding and belongings. Tell us whether you want the upholstered seating, the mattress or both assessed; they are separate parts of the request."
      },
      {
        "question": "Do you cover North York and Scarborough?",
        "answer": "Yes. They are part of our Toronto coverage, along with the neighbourhoods below. Include your postal code and building access information when asking about an appointment."
      },
      {
        "question": "What if my loading area is far from the unit?",
        "answer": "Explain the route, including elevators and any stairs. Distance and building restrictions can affect access, so we check the arrangements before confirming the visit."
      },
      {
        "question": "Is the furniture ready as soon as cleaning ends?",
        "answer": "No. Most sofas need about six to eight hours to dry, and some take longer. Leave cushions uncovered and use the furniture only once it is fully dry."
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
    "coverage": "Toronto coverage includes the areas below. We visit houses, apartments, condos and townhouses.",
    "coverageClosing": "For a Toronto booking, the postal code helps identify the address; your building instructions help us plan access.",
    "ctaTitle": "Book cleaning around your day.",
    "ctaDescription": "Tell us what needs cleaning and any building time limits. We'll help you plan a Toronto appointment and explain the total price.",
    "introductionHeading": "Plan the work and the time."
  },
  "brampton": {
    "metaTitle": "Upholstery & Carpet Cleaning Brampton | Sofa & Rug | SoftNest",
    "metaDescription": "Carpet, sofa and upholstery cleaning in Brampton. Include rooms, staircases and furniture in one quote. Serving Bramalea, Heart Lake and nearby areas.",
    "heroDescription": "Carpet and upholstery cleaning in Brampton, from a single sofa to rooms and stairs. Get a quote based on the areas and items you actually need cleaned.",
    "introductionParagraphs": [
      "We clean sofas, sectionals, carpets and suitable rugs across Brampton, including Bramalea, Heart Lake, Springdale and Castlemore. Let us know if you want one room done or cleaning across several floors.",
      "A useful quote separates room carpet, stair flights and furniture. Describe the sizes and main concerns for each. You can do this by phone or text; there is no need to measure every cushion or send photos of everything."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "For a family-room sofa or sectional, include the chaise, ottoman and any extra cushions you want cleaned. We assess the fabric and treat everyday soil and suitable stains on the surfaces in your quote."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Stair flights, landings and rooms are counted separately so the work is clear. Let us know about basement access and carpet under furniture. We can discuss which areas are practical to clean."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Loose rugs are quoted by size and checked for cleaning suitability. A stain on the rug may need different treatment from one on the sofa, even if both came from the same spill."
      }
    ],
    "more": "Dining chairs and mattresses can go on the same list. If pets have affected more than one item, identify each spot so treatment is considered separately.",
    "advantages": [
      {
        "title": "Room-by-room quoting.",
        "description": "List each carpeted room and hallway instead of describing only the number of storeys. Add stairs and landings to complete the picture."
      },
      {
        "title": "Sectionals counted properly.",
        "description": "A chaise, corner section and ottoman change the size of the job. Describe the full seating arrangement before requesting a price."
      },
      {
        "title": "Treatment where needed.",
        "description": "Show us heavy-use areas and spills. We assess stains individually and explain when repeated accidents or wear may limit improvement."
      },
      {
        "title": "Changes agreed first.",
        "description": "The confirmed price includes tax. If another room or item is added, we discuss the new total before doing that work."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "How should I count carpeted stairs?",
        "answer": "Count the steps in each flight and note the landings separately. Include the hallway at the top or bottom if you want it cleaned too."
      },
      {
        "question": "Can I book a sectional and the basement carpet?",
        "answer": "Yes. Describe the sectional layout, carpeted rooms and access to the basement. We can quote them together and allow time for both."
      },
      {
        "question": "Are photos needed for a larger job?",
        "answer": "They can help show room layouts and furniture sizes, but they are optional. A list of items, approximate dimensions and a stair count is a useful starting point."
      },
      {
        "question": "Do I need to empty every room?",
        "answer": "Pick up loose belongings first. Tell us about beds, sofas or other heavy furniture covering carpet so we can agree on moving and reachable areas."
      },
      {
        "question": "What about stains that keep coming back?",
        "answer": "Tell us where the mark returns and whether it is from repeated spills or pet accidents. We can investigate and try treatment, but deeper contamination may not be fully removable."
      },
      {
        "question": "Can you quote just one room?",
        "answer": "Yes. Tell us the room size, what is on the carpet and your Brampton postal code. We'll confirm the work, price and appointment availability."
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
    "coverage": "Our Brampton service area includes the neighbourhoods below. Requests can include carpet cleaning, furniture or a mix of both.",
    "coverageClosing": "Not sure how to describe a larger job? Start with the rooms and floors, and we can work through the item list with you.",
    "ctaTitle": "Get a quote for your list.",
    "ctaDescription": "Send the Brampton address and the rooms or furniture you want cleaned. We'll confirm what is included and the price before you book.",
    "introductionHeading": "Start with the full list."
  },
  "etobicoke": {
    "metaTitle": "Upholstery & Carpet Cleaning Etobicoke | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning in Etobicoke, from Mimico and Long Branch to the Kingsway. Help with condo access and delicate fabrics. Free quotes.",
    "heroDescription": "Upholstery and carpet cleaning for Etobicoke condos, apartments and houses. We clean sofas, chairs and rugs, with building access arranged before the visit.",
    "introductionParagraphs": [
      "We serve Etobicoke homes in Mimico, the Kingsway, Islington, Alderwood and Long Branch, among other areas. A small apartment sofa and a large sectional need different amounts of work; tell us what you own and what needs attention.",
      "If your building has visitor parking, elevator bookings or contractor requirements, check those before choosing a date. We need to know how to reach your unit and whether the building limits service hours."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "A sofa can have removable seat covers, fixed cushions and different fabrics on the same piece. We check those details before cleaning. Tell us about food spills, body oils or previous spot cleaners so we can focus on the problem."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "We clean fitted carpet in rooms, connecting hallways and stairs. Identify the areas you want done and anything covering them. In an apartment, it also helps to know which rooms must stay usable while the carpet dries."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Wool, mixed fibres and dyed patterns need more than a quick surface check. We look at the rug's condition and backing before deciding on in-home cleaning. If it needs specialist care, we'll explain why."
      }
    ],
    "more": "An armchair, recliner or dining set can be added to the appointment. Mention powered controls or a different fabric so each piece gets the right assessment.",
    "advantages": [
      {
        "title": "Access discussed early.",
        "description": "For condos and apartments, we work from the parking, entry and elevator information you provide. Tell us about documents the building asks contractors to supply."
      },
      {
        "title": "A fabric check first.",
        "description": "Boucle, velvet and linen-look upholstery can need different care. We inspect and test the material rather than choosing a method from its appearance alone."
      },
      {
        "title": "Clear treatment limits.",
        "description": "Cleaning can improve dirt and many stains. We explain when faded colour, worn fabric or earlier treatment may affect the result."
      },
      {
        "title": "Your choice of contact.",
        "description": "Describe the job by phone, text or the form. A photo can help with a difficult fabric, but it is optional."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "What should I check with my condo management?",
        "answer": "Ask about parking, loading access, elevator reservations and permitted service hours. If contractor documents are required, tell us before booking so we can confirm whether those requirements can be met."
      },
      {
        "question": "Can you clean velvet or boucle upholstery?",
        "answer": "Often, but the fabric and its condition need checking first. A care label can help. We test a suitable approach and explain any concerns before treating the piece."
      },
      {
        "question": "Can you reach an apartment without an elevator?",
        "answer": "Tell us the floor, number of stairs and entrance arrangements. We'll check access with you before agreeing on the appointment; don't assume every staircase or entrance will work."
      },
      {
        "question": "Should I treat the stain before you arrive?",
        "answer": "Avoid trying another product just before the visit. Tell us what was spilled and which cleaners you've used. Mixing treatments or rubbing the fabric can make the mark harder to assess."
      },
      {
        "question": "Can I use the sofa that evening?",
        "answer": "Most sofas take about six to eight hours to dry, sometimes longer with thick cushions or poor airflow. Tell us if timing matters and wait until the fabric is fully dry."
      },
      {
        "question": "Do you cover both north and south Etobicoke?",
        "answer": "Coverage includes Rexdale and Humber Heights as well as Mimico, New Toronto and Long Branch. Send your postal code if you are unsure whether your address is covered."
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
    "coverage": "We provide in-home cleaning across the Etobicoke areas listed here, including houses as well as multi-unit buildings.",
    "coverageClosing": "When checking an Etobicoke address, include your unit and access arrangements if relevant.",
    "ctaTitle": "Arrange your Etobicoke visit.",
    "ctaDescription": "Call or message with the furniture or rooms you need cleaned. We'll discuss access and a total price, including tax.",
    "introductionHeading": "Cleaning that fits your building."
  },
  "burlington": {
    "metaTitle": "Upholstery & Carpet Cleaning Burlington | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, carpet and area rug cleaning in Burlington, including Aldershot, Roseland and Millcroft. Practical drying advice and free tax-inclusive quotes.",
    "heroDescription": "Sofa, carpet and rug cleaning in Burlington. Clean the furniture you use most, with practical advice on stains, preparation and when it can be used again.",
    "introductionParagraphs": [
      "SoftNest provides upholstery and carpet cleaning in Burlington, including downtown, Aldershot, Roseland, Millcroft and the Orchard. Sofas, upholstered chairs and suitable rugs can be included in the same visit.",
      "Think about which seating and rooms you will need afterwards. A clean item still needs drying time. Tell us if the sofa is your only seating or a bedroom needs to be ready that evening."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Seat fronts, arms and headrests can show dirt before the rest of a couch. We check these areas and treat ordinary spots before cleaning. Let us know whether a mark is a recent spill or an older problem."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "We clean carpeted rooms, hallways and stairs, including busy paths between rooms. Furniture movement is discussed first. Once the work is done, we explain how to help the carpet dry before returning to normal use."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "The size, pile and backing of a rug affect the cleaning plan. Share what you know about it; a missing label does not mean you need to guess the fibre. We inspect it before treatment."
      }
    ],
    "more": "We also clean upholstered dining chairs, recliners and mattress surfaces. If you need a whole dining set ready for a meal or gathering, discuss the date and drying time before booking.",
    "advantages": [
      {
        "title": "Use planned after cleaning.",
        "description": "We talk through when you need the rooms or seating again. Drying depends on the material and conditions, so there is no guaranteed ready-by time."
      },
      {
        "title": "Care around existing wear.",
        "description": "A worn arm or flattened carpet may remain visible after dirt is removed. We explain the difference between a clean surface and repaired material."
      },
      {
        "title": "Rugs checked separately.",
        "description": "A loose rug can have different dyes and backing from fitted carpet. We check whether in-home treatment is appropriate."
      },
      {
        "title": "A free quote to start.",
        "description": "Call, text or fill in the form. We give you the total with tax included before you decide on the appointment."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can I book before guests come over?",
        "answer": "Yes, but leave time for full drying rather than booking immediately before visitors arrive. Tell us the items and date so we can discuss a practical schedule."
      },
      {
        "question": "How can I help a sofa dry?",
        "answer": "Keep it uncovered and allow airflow around the cushions. Most sofas take about six to eight hours; thick padding or humidity can extend that. Wait until fully dry before use."
      },
      {
        "question": "Will carpet cleaning remove flattened walkways?",
        "answer": "It removes dirt and can improve appearance, but worn or crushed fibres may still look different. We check the carpet and explain what is realistic before cleaning."
      },
      {
        "question": "What if a rug has no care label?",
        "answer": "Tell us what you know about its material and history. We still assess its fibres, colour and backing before recommending in-home cleaning or a different type of care."
      },
      {
        "question": "Can you clean upholstered dining-chair backs?",
        "answer": "Yes, where the fabric is suitable. Tell us whether you want seats, backs or both, and include any bench seating or different chairs in the set."
      },
      {
        "question": "Do Burlington condo visits need advance arrangements?",
        "answer": "Check your building's parking and elevator rules. Tell us about reservations and service hours before booking so we can plan the visit with you."
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
    "coverage": "We visit Burlington houses, condos and apartments in the neighbourhoods listed here.",
    "coverageClosing": "For another part of Burlington, contact us with your postal code and the items you need cleaned.",
    "ctaTitle": "Plan your Burlington cleaning.",
    "ctaDescription": "Tell us what needs attention and when you need the space back in use. We can discuss a date, drying and a free quote.",
    "introductionHeading": "Keep everyday furniture in use."
  },
  "vaughan": {
    "metaTitle": "Upholstery & Carpet Cleaning Vaughan | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sectional and carpet cleaning in Vaughan, including Woodbridge, Maple and Kleinburg. Different fabrics checked individually. Free quotes.",
    "heroDescription": "Upholstery, sectional and carpet cleaning across Vaughan. Bring your furniture list together and get clear advice for each material, stain and room.",
    "introductionParagraphs": [
      "We serve Vaughan homes in Woodbridge, Maple, Kleinburg, Vellore Village and other areas below. You can request a sectional, several upholstered pieces or carpets on their own. Tell us what is fabric and what is leather.",
      "If furniture was bought at different times, its materials and condition may vary. We assess each piece before cleaning. A label or an optional photo can help us prepare, but you don't need to identify the fabric yourself."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Large sofas and sectionals are quoted by their full layout, including chaises and ottomans. Different cushion fabrics, reclining seats and visible wear are checked before we clean the agreed surfaces."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "For carpet in bedrooms, basements and on stairs, list the areas individually. Tell us if painting, sanding or other work is still happening so cleaning is not followed by another round of dust."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Include loose rugs as separate items with their approximate sizes. Hand-finished details, colour and backing can affect suitability. We will explain the approach before including a rug in the visit."
      }
    ],
    "more": "A leather chair, upholstered bench or mattress needs its own assessment. Mention mixed materials and extra pieces when you contact us so the quote describes the whole job.",
    "advantages": [
      {
        "title": "Each material checked.",
        "description": "We look at the fabric or leather on each item. Pieces in the same room do not automatically receive the same products or method."
      },
      {
        "title": "Whole seating layouts included.",
        "description": "Chaises, corner units and ottomans are easy to miss in a seat count. Tell us about them before the quote is confirmed."
      },
      {
        "title": "Work timed sensibly.",
        "description": "If you are renovating, discuss any dusty work still ahead. Cleaning is easier to plan when the rooms are ready and there is time for drying."
      },
      {
        "title": "Limits discussed openly.",
        "description": "We can try to improve old stains and marked areas. Permanent colour change or wear may remain, and we explain that before starting."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can fabric and leather furniture be cleaned in one visit?",
        "answer": "Often, yes. Identify the material of each piece when you get in touch. Leather cleaning and conditioning are different from fabric cleaning, so we assess and price them separately."
      },
      {
        "question": "Does an ottoman count as part of the sectional?",
        "answer": "Tell us about it explicitly. A matching ottoman, extra chaise or loose cushions should appear in the request so we can include the work in your quote."
      },
      {
        "question": "Should I book carpet cleaning during renovations?",
        "answer": "Wait until sanding, painting and other dusty work is finished where possible. Tell us what remains to be done and when the rooms need to be used."
      },
      {
        "question": "Do all items dry at the same rate?",
        "answer": "No. Fabric thickness, padding and airflow matter. Most sofas take about six to eight hours; leather products have their own settling time. We explain the advice for each item."
      },
      {
        "question": "Can you treat a stain left by another cleaner?",
        "answer": "We can assess it. Tell us which products or services were used and how the mark changed. Previous treatment can affect what is safe and how much improvement is possible."
      },
      {
        "question": "Is the price confirmed before the appointment?",
        "answer": "Yes. Describe the pieces and rooms, and we confirm the final price including tax before booking. Photos can help but you can request a quote without them."
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
    "coverage": "Vaughan coverage includes these neighbourhoods. Furniture, carpet and rug requests can be discussed together.",
    "coverageClosing": "For Thornhill, check that the address is on the Vaughan side, or send your postal code for us to confirm coverage.",
    "ctaTitle": "Ask about your Vaughan furniture.",
    "ctaDescription": "List the pieces and materials you want cleaned. We'll explain the work, discuss access and give you a tax-inclusive quote.",
    "introductionHeading": "Different pieces, different care."
  },
  "milton": {
    "metaTitle": "Upholstery & Carpet Cleaning Milton | Sofa & Rug | SoftNest",
    "metaDescription": "Upholstery, sofa and carpet cleaning in Milton, including Beaty, Ford and Old Milton. Book one item or several rooms. Free quotes with tax included.",
    "heroDescription": "Sofa, upholstery and carpet cleaning in Milton. Get help with a stained couch, carpeted stairs or several rooms before a move.",
    "introductionParagraphs": [
      "SoftNest cleans furniture, fitted carpets and suitable area rugs in Milton, including Old Milton, Beaty, Clarke, Ford and Harrison. You can book a single piece or put furniture and carpet cleaning in the same request.",
      "Moving in or having work done? Schedule cleaning after painting, sanding and other dusty work. Leave time for carpets and cushions to dry before moving furniture back or using the room."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "Armrests, seat cushions and a chaise can collect dirt at different rates. We check the whole sofa, treat spots and clean the surfaces included in your quote. Old marks can be treated too, although full removal isn't guaranteed."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Bedrooms, basement rooms, hallways and carpeted stairs can be cleaned together. Tell us the room sizes and number of steps. We pay attention to busy paths and explain where flattened or worn carpet may still look different."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "A loose rug needs its own assessment, even when it sits on fitted carpet. Its fibres, colours and backing affect how we clean it. Let us know its size and whether there is a care label."
      }
    ],
    "more": "Need the dining chairs or a mattress cleaned as well? Add them to your list before booking so there is enough time for the whole visit.",
    "advantages": [
      {
        "title": "A complete room list.",
        "description": "Include stairs, landings and basement rooms when asking for carpet cleaning. This helps avoid leaving part of the job out of the quote."
      },
      {
        "title": "Help with moving dates.",
        "description": "Tell us when the keys arrive and when the rooms need to be ready. We can discuss cleaning and drying around your schedule."
      },
      {
        "title": "Attention to everyday marks.",
        "description": "Point out drink spills, dark armrests or pet accidents. We choose treatment for the fabric and explain what may remain."
      },
      {
        "title": "A price before booking.",
        "description": "Your total includes tax. If you add another item, we discuss the extra work and price before cleaning it."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Should carpets be cleaned before or after moving?",
        "answer": "After dusty work and before furniture fills the rooms is often practical. Tell us your dates and which rooms will be empty. Freshly installed carpet may not need cleaning."
      },
      {
        "question": "Can you clean basement carpet and the stairs together?",
        "answer": "Yes. Count the steps and landings as well as the basement rooms. Mention a separate entrance or a narrow staircase so we can plan how to reach the carpet."
      },
      {
        "question": "How much drying time should I leave?",
        "answer": "Most sofas need about six to eight hours and most carpets about four to eight. Thick materials or a humid basement can take longer. Use them only when fully dry."
      },
      {
        "question": "What if a pet stain has been there for months?",
        "answer": "Tell us where it is and what you've already tried. We can assess and treat older marks, but accidents that soaked into padding or carpet backing may leave some staining or smell."
      },
      {
        "question": "Do I need to send photos of every room?",
        "answer": "No. Room sizes, a stair count and a description are enough to start. If you want to send photos, a wide view and a close-up of the main concern are useful."
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
    "coverage": "Our Milton coverage includes the neighbourhoods below. Cleaning takes place in your home; there is no need to bring furniture to us.",
    "coverageClosing": "For another Milton address, ask us to check your postal code and available dates.",
    "ctaTitle": "Need cleaning in Milton?",
    "ctaDescription": "Tell us the items, rooms and date you have in mind. We'll help you put the visit together and give you a free quote.",
    "introductionHeading": "One couch or several rooms."
  },
  "hamilton": {
    "metaTitle": "Upholstery & Carpet Cleaning Hamilton | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, upholstery and carpet cleaning in Hamilton, including Dundas, Ancaster, Stoney Creek and Waterdown. In-home service with free quotes.",
    "heroDescription": "In-home upholstery and carpet cleaning in Hamilton. Tell us about the furniture, floor levels and entry route so the visit can be planned before arrival.",
    "introductionParagraphs": [
      "SoftNest covers Hamilton addresses in Dundas, Ancaster, Westdale, Stoney Creek, Waterdown and the other areas below. We clean sofas, chairs, fitted carpets and suitable rugs, including requests across more than one floor.",
      "Describe exterior steps, basement entrances and any stairs between the door and the items. If you live in an apartment or condo, include entry and elevator requirements. We check these details with your address before arranging the appointment."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "We clean reachable upholstery on sofas and sectionals, checking the fabric and existing marks first. Tell us which room the piece is in and whether there is enough space around it to work."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Rooms, staircases and halls can be included in one carpet request. Count steps and landings separately, and identify narrow routes that need to stay clear. We discuss access during cleaning and while the carpet dries."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "A rug on a hard floor or under furniture needs an assessment of its own. Let us know its dimensions and condition. We check the backing and colours before recommending cleaning in your home."
      }
    ],
    "more": "You can also request dining chairs, an armchair or a mattress. Include the floor for each item and tell us about pet accidents that need extra attention.",
    "advantages": [
      {
        "title": "The entrance checked.",
        "description": "Outside steps and separate basement doors can affect access. Explain the route when asking for a quote so we can discuss it early."
      },
      {
        "title": "All floors considered.",
        "description": "List rooms and pieces by floor. That helps us plan the visit and identify stairs or hallways that also need cleaning."
      },
      {
        "title": "Advice for older marks.",
        "description": "Tell us the age of a stain and anything used on it. We can assess treatment without promising that worn or discoloured areas will look new."
      },
      {
        "title": "No transport needed.",
        "description": "Furniture cleaning takes place at your home. For rugs that need another kind of specialist care, we explain the limits before booking."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can you clean a room reached through a basement entrance?",
        "answer": "Explain the entrance, steps and room layout first. We check access before agreeing on the job; a photo is useful if you want to show a tight route."
      },
      {
        "question": "What should I tell you about exterior stairs?",
        "answer": "Give the approximate step count and describe the path from parking to the door. Mention narrow passages or shared entrances so we can discuss access."
      },
      {
        "question": "Can you include a hallway between rooms?",
        "answer": "Yes. List it separately with an approximate length and width. Include connecting stairs and landings if you want those cleaned too."
      },
      {
        "question": "What if the carpet is old but still usable?",
        "answer": "We can clean suitable older carpet and try to improve stains. Worn edges, flattened fibres or permanent colour changes may remain. We assess the condition before starting."
      },
      {
        "question": "When can carpeted stairs be used again?",
        "answer": "They often need about four to eight hours to dry. If they are the only route between floors, tell us beforehand so we can discuss safe access and timing."
      },
      {
        "question": "Do you serve Waterdown and Binbrook?",
        "answer": "They are included in our listed Hamilton coverage. Send the postal code and a description of the job so we can confirm the address and available appointments."
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
    "coverage": "We offer in-home cleaning in the Hamilton areas below. The postal code and entrance details help us check each request.",
    "coverageClosing": "If your Hamilton address is not listed, contact us to ask about coverage before planning the visit.",
    "ctaTitle": "Check your Hamilton appointment.",
    "ctaDescription": "Call, text or use the form with your address and item list. We'll discuss access and confirm a free quote with tax included.",
    "introductionHeading": "Know the rooms and the route."
  },
  "oakville": {
    "metaTitle": "Upholstery & Carpet Cleaning Oakville | Sofa & Rug | SoftNest",
    "metaDescription": "Sofa, carpet and upholstery cleaning in Oakville, including Bronte, Glen Abbey and Joshua Creek. Furniture sets and suitable rugs. Free tax-inclusive quotes.",
    "heroDescription": "Professional sofa, carpet and upholstery cleaning in Oakville. Book a couch, dining set or suitable rug, or have several pieces cleaned together.",
    "introductionParagraphs": [
      "SoftNest provides in-home cleaning across Oakville, including Bronte, Glen Abbey, River Oaks and Joshua Creek. We work on sofas, chairs, carpets and suitable rugs. A favourite chair can be booked on its own or with other items.",
      "Matching furniture does not always mean matching fabric. Seat covers, cushions and chair backs may need different care. We inspect the items, explain the cleaning plan and check the price with you before starting."
    ],
    "services": [
      {
        "title": "Sofas",
        "slug": "sofa-cleaning",
        "description": "We clean the agreed sofa surfaces, including accessible cushions and well-used arms. Point out the areas that bother you most. Cleaning can improve old marks, but it won't always restore worn fabric or lost colour."
      },
      {
        "title": "Carpets",
        "slug": "carpet-area-rug-cleaning",
        "description": "Carpet cleaning can cover a whole room or the accessible areas around furniture. Let us know which you want. We treat spots and clean busy paths, with drying advice for the pile and room conditions."
      },
      {
        "title": "Area rugs",
        "slug": "carpet-area-rug-cleaning",
        "description": "Tell us whether the rug is wool, synthetic or unknown, and whether it has a care label. We check the dyes and backing too. Rugs that need specialist off-site treatment are discussed before booking."
      }
    ],
    "more": "Dining-chair seats, upholstered backs and benches can be quoted as a set. Leather furniture and mattresses are separate services; include them if you want one appointment for several items.",
    "advantages": [
      {
        "title": "Each piece checked.",
        "description": "We look at fabric, trim and condition, including differences between pieces in a matching set. A single method may not suit everything."
      },
      {
        "title": "Seats and backs defined.",
        "description": "Your quote identifies the parts to be cleaned. Loose cushions, ottomans and upholstered chair backs should be included when you describe the job."
      },
      {
        "title": "Optional protection explained.",
        "description": "After cleaning, some fabrics can receive a protective treatment. We check suitability and explain what it can and cannot do."
      },
      {
        "title": "No price guessing.",
        "description": "Ask for a free quote before deciding. The agreed total includes tax, and extra items are priced with your approval."
      }
    ],
    "faqs": [
      {
        "question": "How do I get a quote?",
        "answer": "Call or text us, or use the website form. Tell us what needs cleaning and where you are. Photos are optional. We'll confirm the final price, tax included, before you book."
      },
      {
        "question": "Can a sofa and dining chairs be cleaned together?",
        "answer": "Yes. Give us the sofa size, chair count and whether the chair backs are upholstered. Mention any bench or ottoman separately so the quote covers everything you want cleaned."
      },
      {
        "question": "What if I do not know the fabric type?",
        "answer": "You don't need to identify it yourself. We check the material and care information. If you have a label, you can describe it or send a photo, but photos aren't required."
      },
      {
        "question": "Will cleaning fix worn areas on my sofa?",
        "answer": "Dirt and stains may improve, while wear, faded colour and damaged fibres can still show. We assess the area and explain what treatment is worth trying without promising restoration."
      },
      {
        "question": "Is fabric protection worth adding?",
        "answer": "It can make some spills easier to clean up on suitable fabrics. It doesn't make furniture stain-proof or replace routine care. Ask us to check whether it suits your piece."
      },
      {
        "question": "What needs arranging for an Oakville condo?",
        "answer": "Check parking, entry instructions and any elevator booking. Tell us about contractor paperwork or service-hour rules before choosing the appointment so we can confirm the arrangements."
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
    "coverage": "Oakville appointments are available for houses, townhouses, apartments and condos in the areas below.",
    "coverageClosing": "Outside these neighbourhoods but still in Oakville? Share your postal code when you contact us.",
    "ctaTitle": "Get an Oakville cleaning quote.",
    "ctaDescription": "Tell us which pieces or carpeted areas need attention. You can call, text or use the form, with or without photos.",
    "introductionHeading": "Care for the furniture you have."
  }
};

// Published Studio edits take precedence; the reviewed copy remains a fallback
// for a new dataset until its local-page records have been created.
export const cityPages: Record<string, CityPageCopy> = {
  ...reviewedCityPages,
  ...localCopy.cities as Record<string, CityPageCopy>,
};
