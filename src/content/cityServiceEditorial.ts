import localCopy from "@/content/generated/localCopy.json";

type LocalServiceCopy = {
  introduction: string;
  bookingNote: string;
  visit: string;
  question: { question: string; answer: string };
};

// Practical choices for each service and city, not claims about local jobs,
// building rules or neighbourhood demographics. Service facts stay in the CMS.
export const reviewedCityServiceEditorial: Record<string, Record<string, LocalServiceCopy>> = {
  "milton": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Milton can cover a sofa, chairs and an ottoman in one visit. We check each fabric, including pieces from different sets, before treating stains and cleaning the reachable surfaces.",
      "bookingNote": "Make a list by room. Separate fixed furniture from loose cushions and tell us which pieces need stain treatment rather than assuming everything needs the same work.",
      "visit": "If items are upstairs or in the basement, mention that when booking. Leave the route between the entrance and each room clear.",
      "question": {
        "question": "Should I clean furniture before moving it into another room?",
        "answer": "Discuss the move with us first. Furniture needs space around it for cleaning and time to dry afterwards. Avoid moving a heavy piece just to prepare for the appointment."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa cleaning in Milton tackles dirty arms, seat cushions and everyday spills. We inspect the couch first, then clean the surfaces in your quote and give extra attention to the marks you point out.",
      "bookingNote": "Describe the full couch, including a chaise or sofa-bed section. An optional wide photo helps show the layout; close-ups are useful for specific stains.",
      "visit": "Booking before a move? Tell us when the room will be clear and when the couch needs to be used again.",
      "question": {
        "question": "Can you treat a stain that has been on the couch for years?",
        "answer": "We can assess and try to improve older stains. Tell us what caused the mark and which cleaners were used. Age, wear and permanent colour change can limit the result."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet cleaning in Milton can include bedrooms, a basement and the connecting stairs. Area rugs are assessed separately because their fibres and backing may need a different approach from fitted carpet.",
      "bookingNote": "List carpeted rooms with approximate sizes, then add stair flights, landings and rug dimensions. Let us know which areas will be empty and which have furniture.",
      "visit": "For move-in cleaning, arrange the work after sanding or painting where possible. Leave enough time for the carpet to dry before furniture arrives.",
      "question": {
        "question": "Does new carpet need professional cleaning before moving in?",
        "answer": "Not necessarily. Tell us whether it is newly installed or already used, and whether there are spills or building dust. We can discuss whether cleaning would be useful now."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Milton includes the seating layout you agree with us, from a corner sofa to a chaise and ottoman. We check fabric, cushions and any reclining parts before cleaning.",
      "bookingNote": "Count the seats and chaise sections, but also describe corner units, footstools and extra cushions. A seat count alone can miss part of the piece.",
      "visit": "Tell us whether the sectional is on the main floor or reached by stairs. You do not need to pull heavy sections apart yourself.",
      "question": {
        "question": "Should the sectional be separated before the visit?",
        "answer": "Usually you can leave it as it is. Remove blankets and personal belongings, and tell us about tight access or powered sections. We will discuss what needs moving before starting."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather furniture cleaning in Milton removes surface dirt from suitable sofas and chairs, followed by conditioning and protection. We inspect the finish and explain how worn areas may look after treatment.",
      "bookingNote": "Point out dry-looking panels, dark armrests and any peeling. Tell us about polish, wipes or conditioner already applied so the finish can be assessed properly.",
      "visit": "If cleaning is part of a move or renovation, keep sanding and painting away from the furniture until that work is finished.",
      "question": {
        "question": "Will cleaning restore colour on a worn leather seat?",
        "answer": "Cleaning and conditioning may improve the overall appearance, but lost colour and physical damage can remain. We can assess the seat without promising recolouring or leather repair."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress cleaning in Milton focuses on the surface, everyday dirt and suitable stains. Tell us the bed size and the areas of concern so we can explain the work and its limits.",
      "bookingNote": "For several bedrooms, list each mattress separately. Mention whether both accessible sides need attention and whether a bed must be used that evening.",
      "visit": "Remove bedding before arrival and plan where the bed can stay uncovered afterwards. A basement room with limited airflow may need extra drying time.",
      "question": {
        "question": "Can a mattress be cleaned on moving day?",
        "answer": "It needs time to dry fully before bedding or wrapping goes back on. Tell us your moving schedule first; cleaning immediately before loading or sleeping may not leave enough time."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Milton covers upholstered seats, backs and suitable benches. We inspect the chairs individually, then treat food marks and clean the fabric areas included in your quote.",
      "bookingNote": "Count chairs and benches separately. Tell us about replacement chairs or different fabrics, even if they sit at the same table.",
      "visit": "Clear the table area and remove belongings from the seats. Let us know if the dining set is on another floor.",
      "question": {
        "question": "Can a bench be included with the dining chairs?",
        "answer": "Yes, if its upholstery is suitable. Give its length and say whether the seat, back or both need cleaning. We include it as a separate item in the quote."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair and recliner cleaning in Milton gives attention to the seat, arms and headrest you use every day. We work around seams, fixed cushions and moving parts after checking the fabric.",
      "bookingNote": "Say whether the chair reclines, swivels or has powered controls. Include any matching footstool and identify stains on the arms or seat.",
      "visit": "Leave space to reach the chair from the front and sides. Mention upstairs or basement seating when arranging the appointment.",
      "question": {
        "question": "Can a chair with a fixed cushion still be cleaned?",
        "answer": "Often, yes. We clean reachable fabric without needing every cushion to detach. Tell us about the chair design and any tight gaps so the included surfaces are clear."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair and hallway cleaning in Milton covers steps, landings and the paths between rooms. We focus on ordinary stains and dirt at step edges, while checking for existing wear.",
      "bookingNote": "Count each flight and landing. Add hallway measurements rather than describing the job only by the number of floors in the house.",
      "visit": "If the staircase is your only way to reach bedrooms or the basement, mention it before booking so access and drying can be discussed.",
      "question": {
        "question": "Can you include the basement stairs with the upper staircase?",
        "answer": "Yes. List both flights and any connecting landings. We quote the full route and discuss how you will move around the home while the cleaned carpet dries."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Milton starts with the affected sofa, carpet or other suitable fabric. We discuss repeat accidents and earlier cleaning before choosing treatment for the spots and smell.",
      "bookingNote": "Identify every affected area, including places that smell without a visible mark. Tell us whether the accident happened once or has been recurring.",
      "visit": "Keep pets away during treatment and drying. If several rooms are affected, describe them separately so the visit allows time for each.",
      "question": {
        "question": "Why does a pet smell return after the carpet seems dry?",
        "answer": "The source may extend into backing, underlay or other material below the surface. Treatment can help, but deeper or repeated contamination may not be fully reached by surface cleaning."
      }
    }
  },
  "oakville": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Oakville starts with the pieces you want to keep using: a couch, accent chairs or a dining set. We inspect the fabric and padding on each before deciding how to clean.",
      "bookingNote": "Mention differences between matching pieces. Replacement cushions, trim and chair backs may use different fabrics and need separate checks.",
      "visit": "For a house or townhouse, identify the rooms involved. In a condo, check service access and any elevator reservation before choosing the date.",
      "question": {
        "question": "Can matching furniture need different cleaning methods?",
        "answer": "Yes. Covers, cushion panels and other parts can differ even within a set. Care labels and a check of each piece help us choose treatment instead of assuming everything is identical."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa and couch cleaning in Oakville covers the agreed upholstery, cushions and arms. We treat everyday dirt and suitable stains, with an assessment of older marks and any worn areas before starting.",
      "bookingNote": "Tell us which cushions detach and whether you want accessible sides or backs cleaned. Mention anything against a wall that may limit access.",
      "visit": "If other seating is being cleaned at the same time, plan somewhere to sit while the upholstery dries. Leave room around the couch for access.",
      "question": {
        "question": "Are loose decorative cushions part of the sofa quote?",
        "answer": "Include them in your request rather than assuming they are. Their fabric and filling may differ from the sofa. We check suitability and agree on the pieces to be cleaned."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and area rug cleaning in Oakville is planned around the material as well as the floor area. Fitted bedroom carpet and a patterned living-room rug are checked separately before treatment.",
      "bookingNote": "Give room measurements for fitted carpet and dimensions for each rug. A label or optional backing photo is useful when a rug needs closer assessment.",
      "visit": "Tell us what sits on the rug or carpet. We agree on reachable areas and any furniture movement before the appointment.",
      "question": {
        "question": "Can every wool or patterned rug be cleaned at home?",
        "answer": "No single method suits every rug. We check the fibre, backing and colour stability. If specialist off-site care is needed, we explain that rather than including unsuitable in-home treatment."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Oakville treats a complete seating arrangement, including the chaise and cushions you request. We inspect high-use seats and different panels so the work matches the furniture you actually have.",
      "bookingNote": "An optional wide photo can show corner units, ottomans and reclining seats. Identify extra pieces individually, including loose cushions you want assessed.",
      "visit": "Before the visit, clear small items around the sectional. Tell us if a wall or narrow room prevents access to the back or sides.",
      "question": {
        "question": "Can you clean only the seats we use most?",
        "answer": "Describe the areas you want cleaned and we will discuss the work. Uneven wear and differences in dirt can affect appearance, so we explain what a partial clean may leave visible."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather upholstery cleaning in Oakville includes surface cleaning, conditioning and a protective treatment for suitable finishes. We check whether a mark is dirt, worn colour or physical damage before setting expectations.",
      "bookingNote": "Point out shiny arms, faded panels or scratches. Previous leather products matter, so tell us about conditioners, wipes and stain treatments already used.",
      "visit": "Leave access to the seating and keep throws off after treatment until the products have settled. We explain the timing for that particular finish.",
      "question": {
        "question": "Is conditioning the same as repairing leather?",
        "answer": "No. Conditioning is part of care for a suitable leather finish. It does not replace damaged material or guarantee restoration of colour, although cleaning and care can improve the overall appearance."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress surface cleaning in Oakville can improve everyday dirt, suitable spots and light odours. We inspect the surface and discuss older yellowing separately, without promising a return to the original colour.",
      "bookingNote": "Describe the mattress size, which sides can be reached and what caused the stains if you know. Do not include a bed base unless you want it assessed too.",
      "visit": "If the bed is needed that night, tell us in advance. Keep bedding off and leave airflow around it until the mattress is fully dry.",
      "question": {
        "question": "Does the service include the upholstered bed frame?",
        "answer": "A headboard or fabric base is a separate item. Mention it when requesting the mattress clean so we can assess its material, access and the additional work."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Oakville is quoted for the fabric parts of the set: seats, backs or both. We look at each chair for food marks, spills and differences in upholstery.",
      "bookingNote": "Count standard chairs, upholstered armchairs and any bench separately. If one chair has a replacement cover, point it out before the quote is agreed.",
      "visit": "Remove cushions or belongings that are not part of the job. Let us know when you need the set back in use so drying can be considered.",
      "question": {
        "question": "Do you clean the wooden table and chair frames as well?",
        "answer": "This service is for the upholstered areas agreed in the quote. If you are unsure which parts need attention, describe the set so the fabric work is clear before booking."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair cleaning in Oakville can cover a single accent chair or a recliner alongside other furniture. We check the seat, arms, seams and any moving parts before treating stains and cleaning.",
      "bookingNote": "Identify removable cushions and whether the footrest is upholstered. Include a matching ottoman separately and mention powered controls.",
      "visit": "Leave enough room to reach the chair. If it normally sits in a tight corner, discuss moving it rather than lifting heavy furniture yourself.",
      "question": {
        "question": "Can an accent chair be booked on its own?",
        "answer": "Yes. Tell us its size, fabric if known and the areas you want cleaned. We can quote a single chair without requiring you to add a sofa or other pieces."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair and hallway cleaning in Oakville gives attention to step fronts, edges and connecting paths. We assess ordinary stains and explain when flattened or worn fibres may still show after cleaning.",
      "bookingNote": "List flights, landings and hallway sizes. Include a runner only if it is carpeted and you want it assessed as part of the work.",
      "visit": "Pick up shoes and small objects from the whole route. Tell us which stairs people need to use while the carpet is drying.",
      "question": {
        "question": "Will cleaning make worn stair edges look new?",
        "answer": "Removing dirt can improve them, but wear and permanent fibre damage may remain. We check the edges first and explain what treatment can reasonably improve without promising restoration."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Oakville considers both the visible mark and the material beneath it. We assess furniture, carpet and suitable rugs to decide what treatment may improve the problem.",
      "bookingNote": "If the same accident affected a sofa and rug, list both. Tell us about repeat incidents and any deodoriser or spot cleaner already applied.",
      "visit": "Keep pets out of the treatment area until it is dry. If several pieces need attention, allow space to reach each one.",
      "question": {
        "question": "Can treatment remove a pet stain from a delicate rug?",
        "answer": "The rug needs checking first. Fibre, dye and backing can limit the safe options. We discuss in-home suitability and deeper contamination before promising any stain or odour result."
      }
    }
  },
  "etobicoke": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Etobicoke covers fabric furniture in apartments, condos and houses. We check each piece for material, stains and existing wear before choosing products and a suitable cleaning method.",
      "bookingNote": "Describe the furniture rather than trying to name the fabric. A label helps if available, but we still inspect the material and explain any concerns.",
      "visit": "For a condo in Mimico or elsewhere in Etobicoke, check elevator and visitor parking arrangements. Tell us about contractor documents before reserving the visit.",
      "question": {
        "question": "What if my building asks for contractor paperwork?",
        "answer": "Tell us what documents are needed before booking. We need to confirm whether we can meet the requirements, as well as checking service hours, loading and elevator access."
      }
    },
    "sofa-cleaning": {
      "introduction": "Couch cleaning in Etobicoke can treat drink spills, body oils and dirt on the upholstery. Fixed seats and removable cushions are checked first, with care taken around seams, trim and different fabrics.",
      "bookingNote": "Mention a sofa bed, reclining seats or cushions with a different cover. Tell us which products have already been used on any stains.",
      "visit": "In an apartment, identify the floor and entry route. Check elevator bookings and loading restrictions so access is settled before the cleaning day.",
      "question": {
        "question": "Should I use a supermarket stain remover first?",
        "answer": "Avoid adding another product before assessment. Describe the spill and any treatment already tried. Rubbing or mixing products can change a stain and make the fabric harder to treat safely."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and rug cleaning in Etobicoke starts with the areas you can actually reach. We assess fitted carpets and loose rugs separately, treating ordinary spots and dirt with a method suited to the material.",
      "bookingNote": "List rooms and rug sizes, and note beds or heavy furniture covering the floor. We agree what can be reached or moved before the work is priced.",
      "visit": "For multi-unit buildings, share service hours and access arrangements. Tell us if a carpeted hallway is the only route to the rest of your unit.",
      "question": {
        "question": "Can you clean carpet without moving all the furniture?",
        "answer": "Yes, accessible areas can be discussed. Identify what stays in place so the quote is clear. Do not assume heavy furniture will be moved without arranging it first."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Etobicoke includes the agreed seats, chaise and reachable cushions of your sofa. We assess the layout before quoting and work around reclining sections and powered controls.",
      "bookingNote": "A corner unit or extra chaise adds cleaning area even if the seat count looks small. Describe the complete piece, including any separate ottoman.",
      "visit": "If the room or doorway is tight, tell us in advance. We plan access to the furniture; you do not need to dismantle it to request a quote.",
      "question": {
        "question": "Can you clean a sectional that cannot be moved away from the wall?",
        "answer": "Tell us which sides are blocked. We can discuss reachable surfaces and any safe movement before booking. Areas we cannot access should not be assumed to be included."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather sofa and chair cleaning in Etobicoke depends on the finish, not just the colour of the furniture. We check suitable leather before surface cleaning, conditioning and applying protection.",
      "bookingNote": "Tell us about peeling, cracks, colour change and previous cleaners. If a piece has both leather and fabric panels, mention that too.",
      "visit": "Check apartment parking and elevator rules if relevant. Leave space around the furniture so the arms, seat and back can be inspected.",
      "question": {
        "question": "Can you clean furniture with both leather and fabric?",
        "answer": "We assess each material separately. Mixed panels may need different care, and damaged finishes can limit the result. Describe the piece so the quote includes the right work."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress cleaning in Etobicoke treats reachable surface areas for everyday dirt, suitable stains and light odours. We explain the likely result before cleaning, including limits on older yellowing or deep contamination.",
      "bookingNote": "Give the bed size and say which surface needs attention. Tell us if the mattress is on a loft bed or in a room with limited space.",
      "visit": "For an apartment or condo, include entry instructions and the floor. Plan to leave the bed uncovered while it dries, with room for air to circulate.",
      "question": {
        "question": "Can I make the bed straight after the appointment?",
        "answer": "No. A mattress needs several hours to dry fully, sometimes longer depending on conditions. Put the cover and bedding back only when the surface is completely dry."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Upholstered dining chair cleaning in Etobicoke can cover seats alone or fabric backs as well. We check padding, seams and any differences across the set before treating spills and everyday dirt.",
      "bookingNote": "State the chair count and which parts are upholstered. Include a dining bench separately; a close-up is optional if one chair has a stubborn mark.",
      "visit": "You can leave the chairs at home rather than transporting them. In a condo, tell us how to reach the unit and where service parking is permitted.",
      "question": {
        "question": "What if only two chairs in the set are stained?",
        "answer": "Say which chairs you want cleaned and whether the others need general cleaning. We quote the requested work and explain any visible differences caused by existing wear."
      }
    },
    "armchair-cleaning": {
      "introduction": "Recliner and armchair cleaning in Etobicoke covers reachable fabric on seats, arms and headrests. We inspect moving parts and work carefully around seams, footrests and powered mechanisms.",
      "bookingNote": "Let us know if the chair opens electrically and whether an ottoman belongs in the request. Remove blankets and small items from the seat.",
      "visit": "If the chair is upstairs without an elevator, describe the stairs before booking. Tight entry routes and building restrictions need checking in advance.",
      "question": {
        "question": "Do I need to disconnect or take apart a powered recliner?",
        "answer": "You do not need to dismantle it yourself. Tell us how it operates and about any faults. We discuss preparation and safe access to the upholstered parts before starting."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair cleaning in Etobicoke includes landings and hallways when requested. We check the step count, spot-treat suitable marks and clean the carpet without promising to reverse existing wear.",
      "bookingNote": "Describe whether the stairs are inside your home or in a shared area. Count carpeted steps and include the length and width of connecting halls.",
      "visit": "For shared stairs, check management permission and access rules first. We need to know who uses the route during cleaning and drying.",
      "question": {
        "question": "Can you clean carpet in a shared building hallway?",
        "answer": "Describe the area and confirm who can authorise the work. Building rules, access and the full area need checking before we agree on a visit; a unit booking does not automatically cover shared spaces."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain treatment in Etobicoke looks beyond a visible patch on the sofa or carpet. We ask about repeated accidents, the smell and earlier products before assessing how much the affected material may improve.",
      "bookingNote": "Identify every affected item and describe where the smell is strongest. Tell us if covers were washed or the area was treated already.",
      "visit": "In a smaller apartment, plan where pets can stay away from the treatment area. Leave access for cleaning and allow the fabric to dry fully.",
      "question": {
        "question": "Can a pet smell remain even when the stain is gone?",
        "answer": "Yes. Odour can come from padding or backing below a clean-looking surface. We assess and try suitable treatment, but a visible improvement does not guarantee complete odour removal."
      }
    }
  },
  "mississauga": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Mississauga can bring several fabric pieces into one appointment. We inspect the sofa, chairs and any extras individually, then treat stains and clean the areas you have asked us to include.",
      "bookingNote": "Start with an item list rather than a room count. Two chairs and a sofa may have different materials, so mention care labels if you have them.",
      "visit": "For City Centre or Port Credit condos, provide loading and elevator details. In a house, tell us which floors have furniture to be cleaned.",
      "question": {
        "question": "Do I need to bring furniture somewhere for cleaning?",
        "answer": "No. Upholstery cleaning takes place at your home with suitable access. Leave space to reach the items and tell us if anything heavy needs moving before the visit."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa cleaning in Mississauga includes a check of the fabric, cushion design and marks before treatment. We clean the couch in your home, focusing on the surfaces and stains agreed in your quote.",
      "bookingNote": "A sofa bed, loveseat and three-seat couch are different requests. Describe the design and include loose cushions or extra pieces you want cleaned.",
      "visit": "If the couch is in a condo, check the service entrance and elevator rules. Tell us when the building allows loading and unloading.",
      "question": {
        "question": "Do removable covers have to be taken off before cleaning?",
        "answer": "Leave them on unless we discuss otherwise. Removable covers still need a material and care-label check; they are not automatically suitable for separate washing."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and rug cleaning in Mississauga covers fitted rooms, busy walkways and suitable loose rugs. We check fibre, condition and backing before treating spots and removing loosened dirt with a suitable method.",
      "bookingNote": "Separate the room measurements from rug sizes. Add stairs and landings explicitly, and tell us which areas are covered by beds or other heavy furniture.",
      "visit": "For a condo, arrange any required service booking. For a multi-floor house, describe the route between the rooms being cleaned.",
      "question": {
        "question": "Should I measure a rug with or without the furniture on it?",
        "answer": "An approximate length and width is enough to start. Do not lift heavy furniture just to measure it. Tell us what sits on the rug so access can be discussed."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional and furniture cleaning in Mississauga is based on the whole arrangement, including corners and a chaise. We inspect the fabric, treat suitable stains and clean the accessible upholstery in the agreed work.",
      "bookingNote": "Include the number of sections, reclining seats and ottomans. If some cushions differ in material, identify them so the assessment covers more than the main fabric.",
      "visit": "Explain access to the room, especially when the sectional is upstairs. Check condo reservations early rather than after an appointment has been agreed.",
      "question": {
        "question": "Can another sofa be added to the sectional appointment?",
        "answer": "Often, yes. Describe the extra piece before booking so we can allow enough time and confirm the combined price. Each fabric is still assessed separately."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather cleaning in Mississauga combines suitable surface cleaning with conditioning and protection. We assess the finish before starting, separating dirt that may clean away from wear or damaged colour that may remain.",
      "bookingNote": "Describe the full item and affected panels. Mention the last conditioner or cleaning product used, even if it did not seem to change the stain.",
      "visit": "Let us know whether the furniture is in a house or condo. Keep access to the arms and back clear for assessment.",
      "question": {
        "question": "Should I apply leather conditioner before the visit?",
        "answer": "No extra product is needed beforehand. Tell us what has already been applied and let us inspect the finish. Conditioning is included where suitable as part of the agreed service."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress surface cleaning in Mississauga can treat everyday buildup and suitable spots on the accessible sides. We inspect the mattress first and explain the limits for old staining, yellowing or deeper odours.",
      "bookingNote": "State the bed size and whether more than one mattress needs cleaning. Note any fabric headboard or base as a separate item if you want it assessed.",
      "visit": "Strip the bed before arrival and keep a clear route to the bedroom. Tell us about condo access and when you need the mattress for sleeping.",
      "question": {
        "question": "Can several mattresses be cleaned in one appointment?",
        "answer": "Yes, subject to confirming the work and time. List the sizes and rooms separately, and make a drying plan for every bed rather than covering them straight after cleaning."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Mississauga treats food spills and everyday dirt on suitable upholstered seats and backs. We check each chair, including padding and fabric differences across a set, before cleaning.",
      "bookingNote": "Give the chair count and say whether the backs are fabric too. Include any bench, armchair or seat cushion separately so it appears in the quote.",
      "visit": "Clear small objects from around the table. If the dining area is in a condo, include visitor parking and elevator arrangements with your request.",
      "question": {
        "question": "Can you clean chairs with fabric seats and hard backs?",
        "answer": "Yes, the upholstered seat can be assessed on its own. Tell us which parts are fabric so the quote covers the right surfaces rather than assuming the whole chair needs upholstery cleaning."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair and recliner cleaning in Mississauga can target well-used arms, headrests and seats. We inspect the fabric and mechanisms, then clean reachable surfaces with attention to seams and moving parts.",
      "bookingNote": "Identify reclining functions, removable cushions and any ottoman. Tell us if the chair has a fault or a part that should not be moved.",
      "visit": "Leave enough space around the seating for access. We can discuss a chair in a bedroom or den as well as one beside the sofa.",
      "question": {
        "question": "Can an armchair be added to a carpet-cleaning visit?",
        "answer": "Often. Mention it when asking for the carpet quote so we can include the upholstery work and drying time. A separate fabric assessment is needed before the chair is cleaned."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stairs and hallway cleaning in Mississauga covers the route you specify, including landings. We inspect carpet condition, treat ordinary spots and clean dirt along steps and connecting walkways.",
      "bookingNote": "Count steps in each flight and estimate hallway dimensions. Include any small landing even when it does not seem like a full carpeted room.",
      "visit": "Clear the route from the entrance to the upper floors. If several people need to use the stairs during the visit, tell us so timing can be discussed.",
      "question": {
        "question": "Is the upstairs landing included in a stair count?",
        "answer": "List it separately. A step count does not describe the landing area, so its approximate size helps us include the full job in the quote."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Mississauga is assessed for each affected material. We look at marks on upholstery or carpet and discuss the smell, repeated accidents and what may have soaked below the surface.",
      "bookingNote": "List the furniture or rooms affected, not only the largest visible spot. Previous cleaners and deodorisers can change how the area needs to be treated.",
      "visit": "Keep pets and loose belongings away from the spots to be assessed. Tell us if access to more than one room is needed.",
      "question": {
        "question": "Should I show spots that no longer look stained?",
        "answer": "Yes, if they still smell or have been affected repeatedly. The visible surface does not show how far an accident has soaked in. That history helps us explain suitable treatment and its limits."
      }
    }
  },
  "toronto": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Toronto is planned around the pieces and rooms you need back in use. We assess fabric furniture individually and explain cleaning, stain treatment and drying before the appointment is agreed.",
      "bookingNote": "List the furniture and tell us which seating you use daily. A clear description helps us allow time without asking you to fill in a long inventory.",
      "visit": "Share condo service hours, loading access and elevator bookings. The permitted time needs to allow for entry, cleaning and leaving the building.",
      "question": {
        "question": "Can the visit fit a strict building service window?",
        "answer": "Give us the window and full item list before reserving it. We need to check the amount of work and access rather than promising any job will fit a short slot."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa and couch cleaning in Toronto handles everyday dirt and suitable stains without taking the furniture away. We check the fabric, fixed or loose cushions and any earlier spot treatment before cleaning.",
      "bookingNote": "Tell us if the couch doubles as a bed or is your only seating. Include any removable cushions or reclining parts in the description.",
      "visit": "Arrange loading and elevator access if the building requires it. Allow drying time after the visit, not just time for the cleaning itself.",
      "question": {
        "question": "Is sofa-bed mattress cleaning included with the couch?",
        "answer": "Mention the mattress separately if you want it cleaned. Upholstered seating and the sleeping surface have different requirements, so we confirm which parts and materials the quote covers."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet cleaning in Toronto can be arranged for selected rooms and reachable floor areas. Suitable rugs are checked separately, with treatment chosen for the fibre, backing and condition rather than the room name.",
      "bookingNote": "Identify paths you need during the visit, such as the route to a bedroom. Give rug dimensions and note furniture that covers the carpet.",
      "visit": "Tell us about building hours and any service-elevator slot. If rooms must be used soon afterwards, discuss the drying plan before booking.",
      "question": {
        "question": "Can carpet cleaning be split around rooms that are still in use?",
        "answer": "Describe what needs to stay accessible. We can discuss the order of work and reachable areas, but cleaned carpet still needs time to dry before normal use."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Toronto starts with the seating layout, not just the number of people it seats. We include the sections and cushions you request, checking the fabric and any reclining mechanisms first.",
      "bookingNote": "Tell us about a corner seat, chaise, ottoman or sofa-bed section. A full-item photo is useful if you wish to show how the pieces connect.",
      "visit": "Check building access and leave room around the furniture. If the sectional is the only seating available, plan for the time it stays damp.",
      "question": {
        "question": "How long should I leave between cleaning and having guests over?",
        "answer": "Most sectionals need about six to eight hours to dry, sometimes longer. Leave a margin rather than relying on a fixed ready-by time, and discuss the date when you book."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather furniture cleaning in Toronto includes assessment of the finish before suitable cleaning and conditioning. We address surface dirt while explaining where scratches, peeling or lost colour may remain visible.",
      "bookingNote": "Describe each leather piece and any fabric panels. Mention previous products, especially if a surface became sticky or changed appearance after treatment.",
      "visit": "For apartments and condos, provide service parking and loading instructions. Keep covers off afterwards until the products have settled as advised.",
      "question": {
        "question": "Can I sit on leather furniture as soon as cleaning ends?",
        "answer": "Wait for the conditioning and protective products to settle and dry. Timing varies with the finish and conditions; we give advice for the furniture rather than a universal waiting period."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress cleaning in Toronto is a surface service for suitable stains, light odours and everyday dirt. We discuss the mattress condition and drying needs before you plan to sleep on it again.",
      "bookingNote": "State the size and whether the bed is needed that night. Tell us if access is restricted by a frame, nearby furniture or a small room.",
      "visit": "In a condo, check elevator and service-hour rules. Remove bedding in advance and keep space for airflow around the mattress after the visit.",
      "question": {
        "question": "Can you guarantee the mattress will be dry for bedtime?",
        "answer": "No fixed ready-by time can be guaranteed. It needs several hours and can take longer depending on the material and room. Tell us your deadline before choosing an appointment."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Toronto can cover a compact set or additional upholstered seating. We check which seats and backs are fabric, treat suitable food marks and clean the areas included in your quote.",
      "bookingNote": "Tell us the number of chairs and benches, including any pieces in storage that you want done. Identify chairs with a different fabric or padding.",
      "visit": "Keep a clear working area near the dining set. If access is through a loading dock or booked elevator, include those arrangements before the visit.",
      "question": {
        "question": "Should chairs be taken out of storage before the appointment?",
        "answer": "They need to be accessible for inspection and cleaning. Let us know where they are and whether heavy items block them so preparation can be agreed without last-minute lifting."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair and recliner cleaning in Toronto treats accessible seats, arms and headrests in your home. We check the fabric and moving parts before cleaning, including powered footrests and fixed cushions.",
      "bookingNote": "Describe the chair type and any areas you want extra attention on. A loose footstool or second chair should be listed as another item.",
      "visit": "Tell us the room and building access rules. Plan another place to sit afterwards; the chair should stay unused until the fabric is fully dry.",
      "question": {
        "question": "Can you clean the footrest on a recliner?",
        "answer": "Reachable upholstered footrests can be included after assessment. Tell us how the chair opens and about powered controls or faults, so the agreed work accounts for the mechanism."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stairs and hallway cleaning in Toronto includes the flights and connecting areas you list. We treat ordinary stains and dirt while checking whether visible traffic marks are wear or removable soil.",
      "bookingNote": "Count steps, estimate landings and describe the hallway width. If the route is shared, establish who can approve the work before requesting a booking.",
      "visit": "Discuss access through the home and any building service restrictions. Clear small items from the steps before arrival and plan movement while they dry.",
      "question": {
        "question": "Is a hallway quoted by length alone?",
        "answer": "Length and width both help describe the area. Include landings and stairs separately, and identify furniture or stored items that limit what can be reached."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Toronto can address affected fabric furniture and carpets. We look at the accident history and depth as well as the visible mark before explaining suitable treatment.",
      "bookingNote": "Tell us which rooms or items are affected and whether cleaning was tried before. Smell without a visible stain is still worth mentioning.",
      "visit": "Arrange a place for pets away from the work, especially if there is limited spare space. Treated fabric needs to dry before normal use.",
      "question": {
        "question": "Can I judge the odour result while the fabric is still damp?",
        "answer": "Wait until the treated area is fully dry. If a smell remains, contact us to discuss it. Repeated accidents or contamination below the surface can limit what cleaning reaches."
      }
    }
  },
  "brampton": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Brampton can cover furniture across several rooms. We inspect fabric, treat ordinary spots and clean the surfaces you choose, with a separate assessment for items that have different materials.",
      "bookingNote": "List each sofa, chair and ottoman rather than saying a whole floor needs cleaning. Note any pieces with stains or odours that require closer attention.",
      "visit": "Identify the floor for each piece and describe basement entrances. We can plan the route once the full furniture list is clear.",
      "question": {
        "question": "Can you quote furniture in more than one room?",
        "answer": "Yes. Give an item list by room, including pieces upstairs or downstairs. The number of rooms alone does not tell us how much upholstery needs cleaning."
      }
    },
    "sofa-cleaning": {
      "introduction": "Couch cleaning in Brampton can treat dark arms, seat marks and suitable spills on sofas and loveseats. We inspect the upholstery before choosing treatment and explain where wear may still show.",
      "bookingNote": "State the seat count and mention a chaise, reclining section or loose cushions. If two couches need cleaning, describe each rather than counting them as one set.",
      "visit": "Give the room and entrance route for each sofa. Leave a path to the seating and tell us about anything heavy blocking access.",
      "question": {
        "question": "Can you clean just a loveseat rather than a large couch?",
        "answer": "Yes. A loveseat can be quoted on its own. Tell us its approximate size, fabric if known and the marks you want treated so the requested work is clear."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet cleaning in Brampton is quoted for the rooms, stairs and walkways you want done. We inspect the carpet and any loose rugs, then treat suitable marks and clean with an appropriate method.",
      "bookingNote": "List bedroom and basement dimensions separately. Add the stair count, landings and rug sizes so none of these are assumed to be part of a room price.",
      "visit": "Tell us about separate basement access and floors that need to stay reachable. Pick up shoes, toys and other small items before the visit.",
      "question": {
        "question": "Does a basement carpet quote automatically include the stairs?",
        "answer": "No. Include the stairs and landings in your request so the full work can be priced. Approximate room dimensions and a step count are useful without photos."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Brampton covers the sections, cushions and extras identified in your quote. We check stains and everyday soil across the seating, including pieces that see more use than the rest.",
      "bookingNote": "Include corner units, separate ottomans and powered seats. A wide photo is optional, but describe the full layout if you are requesting by phone.",
      "visit": "If some pieces are on another floor, say so before booking. Keep the space around the sectional clear without separating heavy sections yourself.",
      "question": {
        "question": "Is the chaise counted as another seat?",
        "answer": "Describe it as a chaise and give its approximate size rather than guessing a seat number. We use the full layout to agree the work and price."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather upholstery cleaning in Brampton can include sofas, chairs and sectionals with suitable finishes. We inspect each item, clean surface dirt and apply conditioning and protection as part of the agreed service.",
      "bookingNote": "Describe all the pieces, including panels that are fabric rather than leather. Show or describe damaged areas separately from ordinary dirt.",
      "visit": "List the room and floor for each item. Access to the back and sides helps us assess the furniture before cleaning begins.",
      "question": {
        "question": "Can a leather sectional and separate leather chair be quoted together?",
        "answer": "Yes. Identify both pieces and any differences in finish or condition. Matching colour does not mean identical leather, so each item still needs checking."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress surface cleaning in Brampton can be requested for one bed or several sizes together. We inspect the areas being cleaned and treat suitable spots, with clear limits for older discolouration and deeper contamination.",
      "bookingNote": "List each mattress size and location. Note whether the request is for the top only or other accessible surfaces, and mention any headboard separately.",
      "visit": "Remove bedding and leave a clear path to each bedroom. If several beds are being cleaned, plan enough drying time before they are needed.",
      "question": {
        "question": "Do both sides of every mattress need cleaning?",
        "answer": "Tell us which sides you want assessed. Mattress design and access matter, and a heavy mattress should not be flipped without discussing it. The quote identifies the surfaces included."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Brampton can include seats, upholstered backs and bench seating in one quote. Each chair is checked before stain treatment and cleaning, even when the set looks identical.",
      "bookingNote": "Count chairs and benches separately and say which parts are fabric. Point out the most affected seats rather than describing the whole set as stained.",
      "visit": "Clear belongings from the dining area and allow access to every chair. Let us know if part of the set is on a different floor.",
      "question": {
        "question": "Can I add extra chairs after receiving a quote?",
        "answer": "Tell us before the appointment if possible. More chairs mean extra work and drying space. We discuss the updated total with you before cleaning the additional pieces."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair and recliner cleaning in Brampton focuses on accessible upholstery, including well-used arms and headrests. We inspect moving parts and fabric before treating ordinary stains and cleaning the surfaces in your quote.",
      "bookingNote": "List each chair and matching footstool. Identify any powered features or cushions that differ from the main fabric.",
      "visit": "Tell us whether the seating is in the basement, living room or upstairs. A clear route and space around the chair help us reach the agreed areas.",
      "question": {
        "question": "Can two different recliners be cleaned in the same visit?",
        "answer": "Yes, subject to checking both. Describe their fabrics and mechanisms separately; the same treatment may not suit each chair even when both are recliners."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair cleaning in Brampton can cover several flights and the halls between them. We confirm step and landing counts, treat ordinary spots and clean the busy routes through your home.",
      "bookingNote": "Count the basement flight separately from stairs between upper floors. Add landing and hallway measurements rather than estimating from the number of storeys.",
      "visit": "Clear the full route of loose items. If a staircase is the only access between floors, tell us so cleaning and drying can be planned around that.",
      "question": {
        "question": "How do I describe a staircase that turns halfway up?",
        "answer": "Count all carpeted steps and note the turning area or landing separately. An optional photo helps show the layout, but a description and measurements are enough to start."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Brampton can address several affected rooms or furniture pieces. We assess each material and discuss repeated accidents before explaining what targeted treatment may improve.",
      "bookingNote": "Make a separate note for each spot, including when it happened and products already used. A stain on a sofa and one on carpet may need different treatment.",
      "visit": "Identify any basement or upstairs areas involved. Keep pets away during the work and until the treated surfaces are fully dry.",
      "question": {
        "question": "Can you treat more than one pet-affected room at once?",
        "answer": "Yes. List the rooms and approximate affected areas before booking. We need the full extent to allow time and discuss whether any contamination goes beyond surfaces that can be cleaned."
      }
    }
  },
  "burlington": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Burlington gives everyday furniture a deeper clean than routine vacuuming. We inspect fabrics, treat suitable spots and clean the agreed surfaces, with advice on using the pieces again after drying.",
      "bookingNote": "Tell us which sofa, chairs or cushions need attention and what you notice on them. General dirt, a food spill and a pet accident are different concerns.",
      "visit": "Plan which seating you will use while the cleaned pieces dry. If a room is needed for guests, discuss the date before booking.",
      "question": {
        "question": "Should I book all the seating in one room together?",
        "answer": "You can. Give us the complete list so there is time for each item. Remember that all treated fabric needs to dry before use, so plan another place to sit."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa cleaning in Burlington can address dirt on arms, seat fronts and headrests as well as suitable stains. We assess the couch and explain which marks may improve and which are existing wear.",
      "bookingNote": "Tell us whether the couch has thick cushions or a chaise and what caused the main marks. Include any matching pieces you want cleaned at the same time.",
      "visit": "Keep throws off afterwards and allow air around the cushions. If the sofa is needed for an event, leave a drying margin rather than a last-minute slot.",
      "question": {
        "question": "Why can one cushion take longer to dry than the rest?",
        "answer": "Padding thickness, fabric and the amount of cleaning needed can differ. Room airflow matters too. We give drying advice for the piece; use it only once all the fabric is dry."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and area rug cleaning in Burlington can improve everyday dirt and marks along busy paths. We check whether visible differences are soil, flattened fibres or wear before agreeing on suitable treatment.",
      "bookingNote": "Give the room and rug sizes, and point out walkways you want checked. Tell us about furniture that stays in place and any rug with a missing label.",
      "visit": "Think about when you need the room again. We discuss drying and furniture movement before the visit so freshly cleaned areas are not covered too soon.",
      "question": {
        "question": "Can cleaning remove every dark traffic mark?",
        "answer": "Some marks are dirt; others involve wear or permanent colour change. We assess the carpet and try to improve its appearance, but worn fibres may still look different after cleaning."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Burlington includes the seats, chaise and cushions listed in your request. We assess the areas used most and treat ordinary marks before cleaning the accessible upholstery.",
      "bookingNote": "Describe the layout and any ottoman. Tell us if one seat has a different stain or if cushions have already been spot-cleaned.",
      "visit": "Leave space around the sectional and decide where people can sit while it dries. Thick seat cushions may need longer than the lighter fabric parts.",
      "question": {
        "question": "Can one heavily used seat be dirtier than the rest?",
        "answer": "Yes. Point it out so we can give it attention. Differences in use, wear and earlier products can affect the result even when all sections are cleaned together."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather furniture cleaning in Burlington addresses surface soil before suitable conditioning and protection. We check the finish and distinguish ordinary dirt from scratches, faded colour and other damage that cleaning may not remove.",
      "bookingNote": "Tell us which panels look dull, dark or worn and whether conditioners have been used. An optional daylight photo can help show the concern.",
      "visit": "Clear the surfaces and nearby small items. After the work, wait for care products to settle as advised before replacing throws or using the furniture.",
      "question": {
        "question": "Can cleaning help darkened leather armrests?",
        "answer": "We can assess and treat suitable surface dirt. If the finish is worn or colour has changed, some difference may remain. We explain the likely improvement after checking the leather."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress cleaning in Burlington treats suitable surface stains and everyday buildup. We discuss the bed size, condition and drying needs first, especially if you plan to sleep on it the same day.",
      "bookingNote": "Describe the stain rather than applying another product before the visit. Tell us how long it has been there and whether the mattress cover was affected too.",
      "visit": "Remove sheets and covers, and keep the mattress uncovered while drying. An appointment needs to leave enough time before the bed is needed again.",
      "question": {
        "question": "Should I leave the mattress protector off afterwards?",
        "answer": "Yes, until the mattress is fully dry. Replacing a protector or bedding too soon traps moisture. We explain airflow and timing after assessing the material and room."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Burlington can treat food marks and general dirt on upholstered seats and backs. We inspect the set for fabric differences and clean the parts identified in your quote.",
      "bookingNote": "Give the chair count and mention benches or extra cushions. If a gathering is coming up, tell us the date so cleaning and drying can be discussed together.",
      "visit": "Keep the dining area accessible and plan to leave the chairs unused until dry. Do not put covers back on damp seats.",
      "question": {
        "question": "Can I book chair cleaning on the day of a dinner?",
        "answer": "Discuss the timing first. Padding and fabric affect drying, so we cannot guarantee the chairs will be ready for a meal at a fixed time. An earlier appointment date leaves more room."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair cleaning in Burlington can give attention to the arms, seat and headrest of everyday seating. Recliners are assessed for fabric and moving parts before suitable stain treatment and cleaning.",
      "bookingNote": "Tell us which areas feel or look dirty, and identify fixed cushions or an upholstered footrest. A matching ottoman should be added to the item list.",
      "visit": "Leave the chair uncovered after cleaning and allow airflow around it. If it is the main seat you use, plan another one during drying.",
      "question": {
        "question": "Should I cover a cleaned armchair to keep it clean while drying?",
        "answer": "No. Leave the fabric uncovered so moisture can escape. Wait until the chair is fully dry before putting blankets back or sitting on it."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Stair and hallway carpet cleaning in Burlington focuses on dirt along steps, edges and everyday walking routes. We assess stains and wear first, then clean the flights and areas you have requested.",
      "bookingNote": "Include step counts, landings and hallway sizes. Tell us about a route that must stay accessible and any marks that have already been treated.",
      "visit": "Clear shoes and small items before arrival. Plan movement through the home with drying in mind, especially if one staircase serves all the bedrooms.",
      "question": {
        "question": "Can a narrow strip of hallway be cleaned with the stairs?",
        "answer": "Yes. Give its length and width and explain how it connects to the steps. We include the agreed area in the quote rather than assuming every hall is part of the staircase."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Burlington addresses affected upholstery and carpet after an assessment. We consider how old the accident is and how deeply it may have soaked in, not only the visible spot.",
      "bookingNote": "Tell us about repeated accidents and any sprays already used. Mark the affected locations in an optional photo or describe them by room.",
      "visit": "Keep the area available for drying and pets away from it. The final smell should be judged once the fabric or carpet is fully dry.",
      "question": {
        "question": "What should I do if an odour is still there after drying?",
        "answer": "Call or text us and describe what remains. We can discuss the affected material and next step. Deeper contamination can limit treatment, so complete odour removal is not guaranteed."
      }
    }
  },
  "vaughan": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Vaughan considers each material in a furniture collection. We inspect sofas, chairs and loose pieces separately, treating suitable stains and cleaning the fabric surfaces included in your request.",
      "bookingNote": "Identify pieces bought at different times or covered in different fabrics. If you have labels, keep them available; photos can help but are not required.",
      "visit": "List the floor for each item and the entrance route. If work is still being done in a room, tell us before arranging cleaning there.",
      "question": {
        "question": "What if I cannot identify the upholstery fabric?",
        "answer": "You do not have to name it. We inspect the material and care information before choosing a method. Tell us about previous cleaning or a change in the fabric that concerns you."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa cleaning in Vaughan is planned for the couch design as well as the stains. We check the material, loose or fixed cushions and the reachable upholstery before cleaning everyday soil and suitable marks.",
      "bookingNote": "Say whether the piece is a loveseat, straight couch or sofa bed. Mention trim, contrasting cushion covers or other fabric differences that may affect treatment.",
      "visit": "Keep access to the room clear and identify the floor. If cleaning follows decorating, wait until dust-producing work is finished where possible.",
      "question": {
        "question": "Can cushions made from a different fabric be cleaned too?",
        "answer": "Include them for assessment. Different covers or filling may need different care, even when they came with the couch. We explain suitability before adding them to the work."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and rug cleaning in Vaughan separates fitted flooring from loose rugs and runners. We inspect the fibre and backing before treating spots and cleaning reachable areas, including rooms and stairs when requested.",
      "bookingNote": "List each area with dimensions and describe any construction or decorating still under way. A rug is a separate item even when it lies on carpet.",
      "visit": "If cleaning is for a move or renovation, discuss the sequence before booking. Carpet should not be covered by furniture while it is still damp.",
      "question": {
        "question": "Can I book cleaning before renovation work is finished?",
        "answer": "Tell us what remains. Sanding, painting and moving materials may leave more dirt afterwards. It is often more practical to finish dusty work before cleaning the carpet."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Vaughan covers the complete arrangement you describe, including large chaises and corner units. We inspect the upholstery and cushion types before treating everyday dirt and stains on accessible surfaces.",
      "bookingNote": "Identify recliners, separate ottomans and cushions in another fabric. A simple seat count can understate a large sectional, so describe its shape as well.",
      "visit": "Let us know about narrow access or items on another floor. Keep personal belongings out of the seating and leave heavy sections assembled unless discussed.",
      "question": {
        "question": "How should I describe a U-shaped or unusually large sectional?",
        "answer": "List each side, chaise and corner section. Approximate dimensions or an optional wide photo help us understand the layout so we can confirm the whole job rather than guess from seat count."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather cleaning and conditioning in Vaughan starts with the finish on each piece. We check for wear and product buildup before surface cleaning, conditioning and protection where suitable.",
      "bookingNote": "Tell us if sofas and chairs came from different sets. Similar colours can conceal different leather types or finishes that should not be treated as identical.",
      "visit": "Leave space for inspection around the arms and back. If furniture has just been moved, make sure dusty work in the room is finished before the visit.",
      "question": {
        "question": "Can two leather pieces in the same colour need different care?",
        "answer": "Yes. Finish, wear and earlier products matter as much as appearance. We inspect each item and explain any difference in the approach before cleaning."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress surface cleaning in Vaughan is assessed by size, condition and the marks you want treated. We clean suitable reachable surfaces and explain why older discolouration may remain after the dirt is removed.",
      "bookingNote": "List mattress sizes individually and mention an upholstered headboard separately. Tell us about earlier products, particularly when a stain changed colour after treatment.",
      "visit": "Clear the bedroom route and remove bedding. If rooms are being redecorated, plan the clean after dusty work and leave the bed uncovered for drying.",
      "question": {
        "question": "Can mattress cleaning be combined with an upholstered headboard?",
        "answer": "Often, but they are separate items. Describe the headboard and its fabric so we can assess it, allow the extra time and confirm the total price."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Vaughan accounts for differences within the set. We check fabric seats, padded backs and any replacement covers before treating food spills and cleaning the agreed upholstered areas.",
      "bookingNote": "Count chairs, armchairs and benches separately. Note any piece with a different fabric, especially if only some chairs have been reupholstered.",
      "visit": "Make every chair accessible without stacking heavy furniture. If the set is spread through the home, tell us where the pieces are.",
      "question": {
        "question": "Do reupholstered chairs need to be assessed separately?",
        "answer": "Yes. A new cover may differ from the original seats in fibre or care needs. Identify those chairs so treatment is chosen for the actual material, not the age of the set."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair and recliner cleaning in Vaughan can cover mixed seating in the same appointment. We inspect the fabric, seams and moving parts of each chair, then clean the accessible surfaces in your quote.",
      "bookingNote": "Tell us which chairs recline, have powered controls or include a footstool. Identify leather pieces separately from fabric ones.",
      "visit": "List room locations and explain stairs or narrow entrances. We can discuss access before anyone tries moving a heavy recliner.",
      "question": {
        "question": "Is a leather recliner part of the fabric-chair service?",
        "answer": "Leather requires its own cleaning and conditioning assessment. Tell us the material before booking so the correct service and work are included rather than assuming all recliners are alike."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair and hallway cleaning in Vaughan covers the flights and connecting carpet you select. We check step edges, ordinary spots and existing wear before cleaning the full agreed route.",
      "bookingNote": "Separate steps, landings and hallways in the request. Tell us if a runner or landing appears to use a different carpet from the rest.",
      "visit": "Schedule after dusty work if the stairs are part of a renovation. Keep tools and loose materials off the route before the appointment.",
      "question": {
        "question": "Can a stair runner need different treatment from the landing?",
        "answer": "Yes, the materials may differ. We check both, including their condition, before choosing a suitable approach and explaining which areas are in the quote."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Vaughan is chosen for the affected fabric or carpet. We assess the age and depth of the problem and ask about previous products before trying to improve stains and smell.",
      "bookingNote": "Identify each material affected, including rugs or loose cushions. Tell us whether the accident repeated and whether a previous treatment helped only briefly.",
      "visit": "Leave the spots reachable and plan a separate place for pets during drying. If furniture and carpet are both affected, allow access to both.",
      "question": {
        "question": "Can an earlier cleaning product affect pet stain treatment?",
        "answer": "Yes. Tell us what was used and how the area changed afterwards. Previous products can affect the safe options and expected improvement, particularly on delicate fabrics or dyed rugs."
      }
    }
  },
  "hamilton": {
    "upholstery-cleaning": {
      "introduction": "Upholstery cleaning in Hamilton can cover furniture on different floors of your home. We assess fabrics and existing marks, treat suitable spots and clean the surfaces agreed for each piece.",
      "bookingNote": "List the furniture by room and identify anything difficult to reach. Tell us about fixed cushions, previous cleaning and the main marks you want assessed.",
      "visit": "Describe exterior steps and the route from parking to the rooms. Basement doors and shared entrances should be mentioned before the visit is confirmed.",
      "question": {
        "question": "Can furniture be cleaned in the room where it normally sits?",
        "answer": "Yes, with suitable space and access. You do not need to move it downstairs or outside. Discuss anything blocking the surfaces and any heavy movement before the appointment."
      }
    },
    "sofa-cleaning": {
      "introduction": "Sofa and couch cleaning in Hamilton is carried out in your home. We inspect the fabric and stain history first, then clean reachable cushions, arms and other surfaces included in the agreed work.",
      "bookingNote": "State the sofa size and tell us whether it has a chaise or reclining seat. A description of the marks helps us distinguish general dirt from a particular spill.",
      "visit": "Explain any exterior stairs, narrow passages or basement entrance. Leave a clear route to the couch rather than moving heavy furniture without discussing it.",
      "question": {
        "question": "What if the sofa is in a basement room?",
        "answer": "Tell us how the room is reached, including steps and doorway restrictions. We check access before agreeing the visit and discuss airflow if the room may dry slowly."
      }
    },
    "carpet-area-rug-cleaning": {
      "introduction": "Carpet and rug cleaning in Hamilton can include rooms reached by interior or basement stairs. We assess material and condition, treat ordinary spots and clean the reachable areas identified in your quote.",
      "bookingNote": "Give room and rug dimensions, plus step counts where relevant. Tell us whether furniture covers the carpet and which areas you want left in place.",
      "visit": "Describe the route from the entrance through the home. If some areas have limited airflow, discuss that when planning when the rooms can be used again.",
      "question": {
        "question": "Will a basement carpet take longer to dry?",
        "answer": "It can if airflow is limited or humidity is high. Material and cleaning needs matter too. We give drying advice for the conditions and ask you to wait until the carpet is dry."
      }
    },
    "sectional-furniture-cleaning": {
      "introduction": "Sectional cleaning in Hamilton is planned for the furniture layout and the room it occupies. We check fabric and cushions, then treat suitable stains and clean the reachable surfaces you have requested.",
      "bookingNote": "List seats, corner sections, chaises and any matching ottoman. Mention powered mechanisms and parts that cannot easily be reached.",
      "visit": "Tell us which floor the sectional is on and whether stairs or tight entrances are involved. Access is checked before agreeing on the appointment.",
      "question": {
        "question": "Should I move the sectional downstairs for cleaning?",
        "answer": "No. Describe where it is and how the room is reached. We normally assess in-home access; do not move a heavy sectional between floors just to prepare for the visit."
      }
    },
    "leather-upholstery-cleaning": {
      "introduction": "Leather furniture cleaning in Hamilton includes a finish check before suitable cleaning, conditioning and protection. We discuss worn panels and marks separately so you know what care may improve and what may remain.",
      "bookingNote": "Describe each leather sofa or chair and any cracks, peeling or colour loss. Mention previous conditioners or wipes rather than applying more before assessment.",
      "visit": "Give the room location and entrance details. Keep the furniture uncovered after treatment until the products have settled as advised.",
      "question": {
        "question": "Can you assess worn leather without promising a repair?",
        "answer": "Yes. We explain whether cleaning and conditioning are suitable and what they may improve. Physical damage or lost colour can remain; repair and restoration are not guaranteed by cleaning."
      }
    },
    "mattress-cleaning": {
      "introduction": "Mattress cleaning in Hamilton covers suitable surface areas on the bed you describe. We assess ordinary stains and light odours, and explain limits where discolouration or contamination may go deeper than the surface.",
      "bookingNote": "Give the mattress size, floor and sides needing attention. Tell us if the bed is in a tight room or reached through a separate entrance.",
      "visit": "Remove bedding and clear the route to the bed. Leave space for airflow afterwards, especially if the room has limited ventilation.",
      "question": {
        "question": "Do I need to move the mattress off the bed frame?",
        "answer": "Leave it in place unless we discuss otherwise. Tell us which surfaces need attention and any access limits. Heavy lifting or flipping should be agreed rather than done just for the appointment."
      }
    },
    "dining-chair-cleaning": {
      "introduction": "Dining chair cleaning in Hamilton can cover upholstered seats, backs and benches at home. We inspect each material and treat suitable food or drink marks before cleaning the areas listed in the quote.",
      "bookingNote": "Give the chair count, include benches separately and say which parts are upholstered. Identify older stains or fabrics that have been replaced.",
      "visit": "Make the seating accessible and describe stairs between the entrance and dining area. There is no need to carry the chairs to the front door.",
      "question": {
        "question": "Should I bring the chairs outside before you arrive?",
        "answer": "No. Tell us where they are and clear space to reach them. We plan in-home cleaning with suitable access; moving them outside is not needed just to request or prepare for the service."
      }
    },
    "armchair-cleaning": {
      "introduction": "Armchair cleaning in Hamilton includes suitable recliners and accent seating, with attention to reachable arms, seats and headrests. We check the fabric and moving parts before treating stains and cleaning.",
      "bookingNote": "Tell us if the chair is powered, has a fixed cushion or comes with a footstool. Describe marks and any products already tried on them.",
      "visit": "Mention outside steps and the floor where the chair is used. Discuss narrow access before anyone attempts to shift a heavy piece.",
      "question": {
        "question": "Can a heavy recliner stay in its usual room?",
        "answer": "Yes, if there is suitable access and working space. Tell us about blocked sides, nearby furniture and mechanisms so we can agree which surfaces can be reached safely."
      }
    },
    "stairs-hallways-cleaning": {
      "introduction": "Carpeted stair and hallway cleaning in Hamilton includes steps, landings and connecting routes when requested. We check the carpet for wear and treat ordinary spots before detailed cleaning of the agreed areas.",
      "bookingNote": "Count each flight and include the hallway length and width. Identify which steps are carpeted and which parts of the entrance are hard flooring.",
      "visit": "Tell us if the stairs are the only route to bedrooms or a basement. Access during the work and drying needs planning before the appointment.",
      "question": {
        "question": "Can outside steps be included in this carpet-cleaning service?",
        "answer": "This service is for the carpeted areas agreed in your quote. Mention exterior steps as access information; do not assume hard outdoor steps are included in carpet cleaning."
      }
    },
    "pet-stain-odour-removal": {
      "introduction": "Pet stain and odour treatment in Hamilton considers where the accident has spread, from furniture covers to carpet backing. We assess suitable materials and explain treatment options before trying to improve the affected areas.",
      "bookingNote": "Describe visible marks and smell separately. Tell us how long the problem has lasted and whether the same area has been affected repeatedly.",
      "visit": "Identify upstairs, basement or separate-entry rooms involved. Keep access clear and pets away until treated surfaces have fully dried.",
      "question": {
        "question": "What if I can smell an accident but cannot find the mark?",
        "answer": "Tell us the room and where the smell seems strongest. We can assess the area, but hidden or deep contamination may be difficult to locate or reach completely with surface treatment."
      }
    }
  }
};

const publishedCopy = localCopy.services as Record<string, Record<string, LocalServiceCopy>>;
export const cityServiceEditorial: Record<string, Record<string, LocalServiceCopy>> = Object.fromEntries(
  Object.entries(reviewedCityServiceEditorial).map(([city, services]) => [
    city, { ...services, ...publishedCopy[city] },
  ]),
);
