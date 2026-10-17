type LocalServiceCopy = { introduction: string; bookingNote: string };

// Authored booking guidance for each supported combination. These are service
// descriptions, not claims about local jobs, offices or neighbourhood conditions.
export const cityServiceEditorial: Record<string, Record<string, LocalServiceCopy>> = {
  milton: {
    "upholstery-cleaning": {
      introduction: "Arrange upholstery cleaning in Milton for sofas, chairs and other fabric furniture in one visit. We check each material before choosing a method, so pieces in the same room can receive different care.",
      bookingNote: "List every piece you want cleaned, including ottomans and loose cushions. For upstairs or basement furniture, mention the floor and any narrow stairs when requesting your quote.",
    },
    "sofa-cleaning": {
      introduction: "Sofa and couch cleaning in Milton starts with the fabric, seat count and the marks you want treated. We clean the agreed accessible surfaces and explain what cleaning can improve before work begins.",
      bookingNote: "Send a photo of the whole couch, then close-ups of spills or darkened arms. Include matching cushions and any recliner or sofa-bed sections so your quote covers the complete item. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Plan carpet and area rug cleaning in Milton by the rooms, walkways and rugs you need cleaned. We assess fitted carpet and loose rugs separately because their fibres and backing can require different care.",
      bookingNote: "For a visit covering several floors, list bedrooms, hallways and stairs individually. Give each rug's dimensions and label details instead of including it in the carpeted room count.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Sectional cleaning in Milton covers the agreed sections, chaise and accessible cushions of your seating arrangement. A full photo helps us understand the layout and allow for the size of the job.",
      bookingNote: "Count the seats, chaise sections and ottomans, and identify any powered or reclining parts. Tell us whether the sectional is upstairs or in a basement before we plan access.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Request leather furniture cleaning in Milton for suitable sofas, chairs and sectionals. We inspect the finish before cleaning and conditioning, and explain where wear or damage needs a different solution.",
      bookingNote: "You can share photos of headrests, armrests and worn seat panels in daylight. Tell us about previous cleaners or conditioners; we can assess peeling, cracks or lost colour and try to improve the appearance, without promising restoration. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Mattress cleaning in Milton focuses on the suitable surface areas in your quote. Share the bed size and the stains or light odours you want assessed so we can explain the likely results.",
      bookingNote: "If several beds need attention, list their sizes and room locations separately. Allow time for each mattress to dry fully and leave bedding off until it is ready for use.",
    },
    "dining-chair-cleaning": {
      introduction: "Dining chair cleaning in Milton can cover upholstered seats, backs or both. We inspect the fabric and padding on each chair, then confirm which areas are included before treating spills and everyday soil.",
      bookingNote: "Count the chairs and show one full chair plus close-ups of any different fabrics or marks. Include bench seating separately so it is assessed as part of the same request. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Book armchair and recliner cleaning in Milton for the fabric surfaces you use most. We check cushions, seams and moving parts before cleaning the accessible areas covered by your quote.",
      bookingNote: "Show the chair upright and, if it reclines, with the footrest open. Mention the room and floor level, and include an ottoman or loose cushion if you want it cleaned too. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Carpeted stair and hallway cleaning in Milton gives attention to step edges, landings and connecting walkways. We confirm the full route before quoting rather than estimating from the number of storeys alone.",
      bookingNote: "Count the carpeted steps in each flight and list landings separately. If the stairs are your only route between floors, tell us so we can discuss access during cleaning and drying.",
    },
    "pet-stain-odour-removal": {
      introduction: "Pet stain and odour treatment in Milton begins by finding the affected material and discussing how far an accident may have soaked in. We explain treatment options and limits before you book.",
      bookingNote: "Mark the affected spots in photos and mention repeated accidents or earlier treatments. Odour returning after drying can indicate a deeper source that surface cleaning may not reach. Photos are optional.",
    },
  },
  oakville: {
    "upholstery-cleaning": {
      introduction: "Upholstery cleaning in Oakville can bring sofas, accent chairs and other fabric pieces into one planned appointment. We check the care information and condition of each item before confirming suitable treatment.",
      bookingNote: "A matching furniture set may contain different fabrics. Share labels and photos for each piece, and list any dining chairs or ottomans you want included rather than assuming they are part of the sofa quote. Photos are optional.",
    },
    "sofa-cleaning": {
      introduction: "Book sofa and couch cleaning in Oakville for everyday dirt, spills and areas that need closer attention. We assess the upholstery first and agree on the surfaces and cushions to be cleaned.",
      bookingNote: "Tell us the seat count and show the front, sides and any removable cushions. If the sofa sits against a wall, mention which areas can be reached safely during your visit. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Carpet and area rug cleaning in Oakville is planned around the material and the area you want cleaned. A fitted bedroom carpet and a loose living-room rug need separate checks before treatment.",
      bookingNote: "Send room measurements for fitted carpet and dimensions for each rug. Include rug care labels and backing photos where possible; some delicate rugs need specialist care rather than in-home cleaning. Photos are optional.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Arrange sectional cleaning in Oakville with the whole seating layout included in your estimate. We assess the sections, chaise and cushions together, then clean the accessible areas agreed in your quote.",
      bookingNote: "Take one wide photo that shows the full sectional, plus any matching ottoman. Identify detachable sections, recliners and extra pillows so we can confirm the work without relying on a seat count alone. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Leather upholstery cleaning in Oakville includes care for suitable leather finishes, followed by conditioning and protection. We distinguish removable surface soil from worn colour, cracking or other damage before starting.",
      bookingNote: "Include close-ups of colour changes and shiny or worn areas, along with the full chair or sofa. Tell us about previous leather products so we can assess the finish and set realistic expectations. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Request mattress surface cleaning in Oakville for everyday buildup, suitable spots and light odours. We confirm the mattress size, condition and accessible sides before choosing a controlled-moisture approach.",
      bookingNote: "Mention whether you need to use the bed that evening. Drying time varies, so plan around the condition of the mattress and the advice given during the visit rather than a guaranteed ready-by time.",
    },
    "dining-chair-cleaning": {
      introduction: "Refresh suitable upholstered dining chairs in Oakville with a quote based on the whole set. We check seats and backs individually, including differences in fabric, food marks and edge wear.",
      bookingNote: "Show whether the backs are upholstered as well as the seats. If your set includes armchairs, a bench or replacement chairs in another fabric, identify them in the photos before we quote. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Armchair and recliner cleaning in Oakville focuses on accessible fabric, cushions and well-used contact areas. We inspect the chair's construction and take care around controls and reclining mechanisms.",
      bookingNote: "Include a photo of the complete chair and any care tag. Note whether cushions lift out, and add the footstool to your item list if you would like it assessed at the same time. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Plan carpeted stairs and hallway cleaning in Oakville with each flight, landing and connecting area clearly listed. We check the carpet and discuss worn edges and traffic marks before treatment.",
      bookingNote: "You can share photos of the stairs from a safe position and count steps and landings separately. Include hallway measurements and tell us which routes must remain accessible while the carpet is drying. Photos are optional.",
    },
    "pet-stain-odour-removal": {
      introduction: "For pet stain and odour treatment in Oakville, the visible spot is only part of the assessment. We discuss the affected furniture, rug or carpet and explain where deeper contamination can limit treatment.",
      bookingNote: "Show both the stain and the surrounding area where you notice the smell. Include how long it has been present and which products were used, even if the mark is no longer visible. Photos are optional.",
    },
  },
  etobicoke: {
    "upholstery-cleaning": {
      introduction: "Arrange upholstery cleaning in Etobicoke for fabric seating in houses, apartments and condos. We assess each item and its care label, then plan suitable cleaning alongside the access details for your building.",
      bookingNote: "List sofas, chairs and ottomans as separate items in one request. For an apartment or condo, include elevator reservations and parking information so the full furniture visit can be planned together.",
    },
    "sofa-cleaning": {
      introduction: "Sofa and couch cleaning in Etobicoke starts with a clear view of your seating and the areas that concern you. We confirm fabric suitability, accessible surfaces and the quote before arranging the visit.",
      bookingNote: "Send the sofa's seat count, full photo and stain close-ups together. Mention a sofa bed or recliner, and share any building service-hour restrictions before selecting an appointment. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Book carpet and area rug cleaning in Etobicoke for the rooms, walkways or loose rugs that need attention. We check fibres and backing before deciding which surfaces are suitable for in-home cleaning.",
      bookingNote: "Identify fitted carpet and loose rugs separately, with room sizes or rug dimensions. Tell us which furniture will remain in place and whether the work includes basement rooms or carpeted stairs.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Sectional cleaning in Etobicoke is quoted around the complete layout, including chaise sections and suitable cushions. We check the material and confirm the work so a large seating arrangement is clearly accounted for.",
      bookingNote: "You can share photos of the whole sectional rather than one seat. Include detachable pieces, ottomans and reclining parts, then tell us about loading access or elevator bookings if the furniture is in a condo. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Request leather sofa and chair cleaning in Etobicoke with the finish and condition assessed first. Suitable pieces receive leather-specific cleaning, conditioning and protection, with after-care advice for the treated surfaces.",
      bookingNote: "Use well-lit close-ups to show worn arms, seat panels and any peeling. We can assess a damaged finish and try to improve its appearance, without promising restoration; building access details can be sent with the same request. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Mattress cleaning in Etobicoke covers the suitable surface areas confirmed in your quote. We assess the size, staining and material, and discuss drying before you plan when to use the bed again.",
      bookingNote: "Tell us which sides need cleaning and whether they can be reached. For condo visits, include elevator arrangements and allow ventilation and bedding-free time after treatment.",
    },
    "dining-chair-cleaning": {
      introduction: "Dining chair cleaning in Etobicoke is planned chair by chair, with upholstered seats and backs assessed separately. We discuss ordinary spills, fabric condition and the areas your quote will include.",
      bookingNote: "Include the number of chairs and a clear view of their backs and seats. Tell us about different fabrics within the set and any building access limits when arranging a condo appointment. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Book armchair or recliner cleaning in Etobicoke for suitable upholstered seating. We inspect seams, cushions and moving parts before treating the agreed fabric surfaces and explaining the expected drying conditions.",
      bookingNote: "Show any powered controls or reclining footrest in your photos. Mention whether cushions are removable, and include the chair's floor level and any elevator requirement with the quote request. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Carpeted stair and hallway cleaning in Etobicoke covers the steps, landings and connecting walkways you identify. We assess carpet condition and worn areas before confirming the cleaning scope and access plan.",
      bookingNote: "Count each flight separately, including basement steps where relevant. If a hallway or staircase is your only entrance route, mention that when booking so cleaning and drying access can be discussed.",
    },
    "pet-stain-odour-removal": {
      introduction: "Pet stain and odour treatment in Etobicoke starts with the source of the problem, not just the visible mark. We assess suitable upholstery and carpet and explain how contamination depth affects the result.",
      bookingNote: "Describe where the smell is strongest and whether accidents have repeated. Photos, previous treatment details and the age of the problem help us assess the request before planning building access. Photos are optional.",
    },
  },
  mississauga: {
    "upholstery-cleaning": {
      introduction: "Bring your Mississauga upholstery cleaning request together with a list of the fabric furniture you want refreshed. We assess sofas, chairs and other suitable pieces individually before selecting their cleaning methods.",
      bookingNote: "Separate the item count from the room count. For a condo visit, send the complete furniture list with parking and elevator instructions so the quote and access arrangements cover the same work.",
    },
    "sofa-cleaning": {
      introduction: "Book sofa cleaning in Mississauga for a loveseat, everyday couch or larger fabric seating. We inspect the upholstery and treat suitable soil and stains within the surfaces agreed in your quote.",
      bookingNote: "A full sofa photo shows its design; close-ups show the marks. Include loose cushions, decorative pillows and whether the back is accessible, then share any condo service-access rules. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Carpet and area rug cleaning in Mississauga can cover selected rooms or several areas in the same appointment. We assess carpet fibres and rug backing before confirming the appropriate in-home treatment.",
      bookingNote: "List rooms, hallways and stairs separately, and add the dimensions of each loose rug. Identify areas covered by heavy furniture so the estimate reflects what can actually be reached.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Request sectional furniture cleaning in Mississauga with each section, chaise and cushion clearly included. We check the construction and fabric so the quote reflects the complete seating arrangement.",
      bookingNote: "Show the sectional from end to end and identify any separate ottoman. For condo appointments, include loading arrangements along with the section count rather than sending access details after booking. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Leather furniture cleaning in Mississauga begins with checking the leather type and finish. We clean suitable surfaces and apply conditioning and protection while explaining the limits of cosmetic improvement.",
      bookingNote: "You can share photos of both the full piece and high-contact seat and arm panels. Tell us which products have been applied previously and identify cracks or peeling so we can discuss possible improvement without promising restoration. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Arrange mattress cleaning in Mississauga for suitable surface stains, everyday soil and light odours. We check the mattress condition and clarify the requested sides before choosing how to clean it.",
      bookingNote: "Include the bed size, bedroom floor and any elevator reservation. Strip the bedding before the appointment and plan to keep it off until the treated mattress has dried completely.",
    },
    "dining-chair-cleaning": {
      introduction: "Dining chair cleaning in Mississauga can include fabric seats, upholstered backs and matching bench seating. We check each piece for spills, worn edges and material differences before agreeing on the work.",
      bookingNote: "Count chairs and benches separately and show which surfaces have fabric. If some chairs have replacement upholstery, include their labels or close-ups so we can assess them independently. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Refresh suitable fabric seating with armchair and recliner cleaning in Mississauga. We check the chair's material, cushions and mechanism before cleaning the accessible surfaces included in your estimate.",
      bookingNote: "Mention powered movement and show the footrest if it opens. Add any matching stool or loose cushion to the item list, and share building access requirements for apartment visits. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Stair and hallway carpet cleaning in Mississauga targets the carpeted routes between your rooms and floors. We check step edges, landings and traffic areas before confirming the areas to clean.",
      bookingNote: "Give a step count for each staircase and approximate hallway lengths. Include turns, extra landings and the route to a basement so the quote does not miss part of the carpeted access.",
    },
    "pet-stain-odour-removal": {
      introduction: "For pet stain and odour treatment in Mississauga, we assess the affected furniture, carpet or rug before recommending a method. Deeper contamination is discussed openly so you know the limits of surface treatment.",
      bookingNote: "Identify every affected item or room and explain any earlier cleaning attempts. Tell us if the smell returns when the material is damp or after it has dried.",
    },
  },
  toronto: {
    "upholstery-cleaning": {
      introduction: "Plan upholstery cleaning in Toronto for one fabric item or a mixed furniture set. We check materials and construction separately, then confirm the work around your home's access and building arrangements.",
      bookingNote: "You can share photos of each type of furniture and include its care information. For a downtown building, confirm loading instructions, service hours and any elevator reservation before choosing the visit time. Photos are optional.",
    },
    "sofa-cleaning": {
      introduction: "Toronto sofa and couch cleaning covers suitable fabric seating and the accessible areas agreed before booking. Share the design and condition of your couch so we can assess spills, everyday soil and drying needs.",
      bookingNote: "Include a full-item photo, seat count and cushion details. Mention limited space around the sofa and any building rules that affect equipment access to your apartment or condo. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Arrange carpet and area rug cleaning in Toronto with a clear list of fitted areas and loose rugs. We assess their materials and backing before confirming which surfaces can be cleaned in your home.",
      bookingNote: "Show the accessible floor area and note furniture that will remain in place. For rugs, send dimensions and labels; for apartment appointments, include loading and elevator requirements. Photos are optional.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Sectional cleaning in Toronto is planned around your furniture's actual layout rather than a standard sofa size. We confirm sections, chaise pieces and suitable removable cushions as part of the quoted work.",
      bookingNote: "Take photos wide enough to show both ends and the corner. Mention recliners, detached pieces and room access restrictions so the team can plan around the complete arrangement. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Book leather upholstery cleaning in Toronto for suitable leather sofas, chairs and seating sets. We inspect the finish, clean appropriate surfaces and follow with conditioning, protection and practical after-care guidance.",
      bookingNote: "Include close-ups of wear and the names of previous leather products, if known. Send loading instructions with the furniture photos so suitability and building access can be reviewed together. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Mattress surface cleaning in Toronto is assessed by bed size, material, staining and the sides you need cleaned. We discuss realistic results and drying arrangements before you commit to an appointment.",
      bookingNote: "Check service-hour restrictions if you live in a condo. Plan ventilation and bedding around drying, and tell us whether the bed can remain unused until the treated surface is fully dry.",
    },
    "dining-chair-cleaning": {
      introduction: "Request dining chair cleaning in Toronto for upholstered seats and backs, including mixed chair sets. We examine the fabric and padding on each piece before treating suitable spills and everyday marks.",
      bookingNote: "Send the chair count and show all fabric-covered areas. Include stools or a dining bench as separate items, plus any building reservation needed for the cleaning visit. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Armchair and recliner cleaning in Toronto covers the accessible upholstery specified in your quote. We inspect arms, headrests, cushions and mechanisms before deciding on a suitable cleaning approach.",
      bookingNote: "Tell us if the chair is powered or the seat cushions are fixed. Photos of the chair and its room position help define accessible areas without assuming furniture can be moved. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Book carpeted stair and hallway cleaning in Toronto for the connecting areas that see everyday foot traffic. We confirm steps, turns and landings and discuss where wear may affect the finished appearance.",
      bookingNote: "Describe the full carpeted route, including any shared entrance restrictions. Count flights and landings separately and explain which rooms can only be reached by the stairs being cleaned.",
    },
    "pet-stain-odour-removal": {
      introduction: "Pet stain and odour treatment in Toronto is tailored to the affected surface and the likely depth of the accident. We discuss whether cleaning can reach the source before confirming the appointment.",
      bookingNote: "Distinguish a single accident from odour across several items or rooms. Include the age of the problem and previous treatments, as well as building access details for the visit.",
    },
  },
  brampton: {
    "upholstery-cleaning": {
      introduction: "Book upholstery cleaning in Brampton for a complete furniture request, from fabric sofas to upholstered chairs. Each material is checked separately so suitable pieces can be included in one agreed visit.",
      bookingNote: "List matching chairs, benches and ottomans alongside the main sofa. Identify basement or upstairs items and explain the entrance route so the estimate includes both the furniture and access needs.",
    },
    "sofa-cleaning": {
      introduction: "Sofa cleaning in Brampton covers suitable couches, loveseats and their agreed cushions. We inspect the upholstery, assess the marks and explain the cleaning approach before confirming the work and price.",
      bookingNote: "Include the full couch and any matching pieces in your photos. Mention loose cushions, reclining seats and whether the sofa is reached through a basement entrance or interior stairs. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Request carpet cleaning in Brampton for rooms, basement areas, hallways and suitable rugs. We check the material and condition before choosing a method and confirming the areas in your quote.",
      bookingNote: "For several floors, provide a room list with approximate sizes, plus each staircase and landing. Add loose rug dimensions separately so carpet and rug work can be assessed accurately.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Brampton sectional furniture cleaning is quoted by the arrangement you actually have, including chaise sections and suitable cushions. We inspect the fabric and agree on the accessible work before cleaning begins.",
      bookingNote: "Show every section and count any matching ottoman separately. Explain whether the seating is on one floor or split between rooms so the appointment accounts for the full request. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Arrange leather furniture cleaning in Brampton for suitable seating that needs surface cleaning and conditioning. We check each finish and can try to improve older marks or worn areas, without promising restoration.",
      bookingNote: "You can share photos of every piece in the set, because one seat's wear may differ from another's. Include the care tag and any peeling or cracking rather than relying on a single room photo. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Mattress cleaning in Brampton focuses on the quoted surface areas of suitable beds. We consider size, staining and material condition, then discuss the cleaning method and the time needed for drying.",
      bookingNote: "For a basement bedroom, mention the stairs and available airflow. If you need several mattresses cleaned, give each size and location rather than one combined bed count.",
    },
    "dining-chair-cleaning": {
      introduction: "Dining chair cleaning in Brampton can address suitable fabric seats and backs across your dining set. We inspect each chair for food marks, worn edges and differences in upholstery before treatment.",
      bookingNote: "Count the chairs, show whether backs are fabric-covered, and identify any bench. Tell us which pieces have different fabrics or loose seat pads so the scope is clear before booking. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Request armchair and recliner cleaning in Brampton for accessible fabric surfaces and suitable cushions. We check the upholstery and any moving parts before confirming a treatment for everyday soil and marks.",
      bookingNote: "You can share photos of footrests, removable cushions and any powered mechanism. Mention a basement location or restricted entrance, and add matching stools individually to the list of items for your quote. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Carpeted stairs and hallway cleaning in Brampton is planned flight by flight. We assess step edges, landing areas and connecting carpet so your quote describes the full route being cleaned.",
      bookingNote: "Include basement stairs as well as upper flights, counting each landing separately. Let us know if family members need to pass through these areas during the appointment or drying period.",
    },
    "pet-stain-odour-removal": {
      introduction: "Pet stain and odour treatment in Brampton starts with the affected furniture or floor covering and the history of the accident. We explain what can be treated and where deeper materials may limit results.",
      bookingNote: "Mention repeated accidents, earlier soaking and any odour from carpet backing or underlay. Identify the material in each photo so a rug and a carpeted room are not treated as the same request. Photos are optional.",
    },
  },
  burlington: {
    "upholstery-cleaning": {
      introduction: "Arrange upholstery cleaning in Burlington for individual fabric pieces or a coordinated furniture set. We assess care labels, fabric condition and accessible areas before confirming suitable cleaning for each item.",
      bookingNote: "You can share photos of the complete furniture arrangement and list each piece you want included. If items are on different floors, identify their locations along with the parking or building access details. Photos are optional.",
    },
    "sofa-cleaning": {
      introduction: "Burlington sofa and couch cleaning begins with an assessment of the upholstery and everyday marks. We confirm the accessible surfaces, cushions and treatment limits before agreeing on your cleaning visit.",
      bookingNote: "Share photos of the whole sofa and the areas that need attention. Count seats and loose cushions, and show matching pillows or ottomans if you want them included in the same quote. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Book carpet and area rug cleaning in Burlington for the fitted areas and loose rugs you want assessed. Fibre, backing and condition guide the suitable cleaning method and the scope we confirm.",
      bookingNote: "For a whole-home request, list approximate room sizes and separate stair counts. Label rug photos with their dimensions and identify furniture covering carpet that will remain inaccessible. Photos are optional.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Sectional cleaning in Burlington accounts for the shape and size of your complete seating layout. We inspect the fabric and confirm sections, chaise pieces and suitable cushions before setting the work scope.",
      bookingNote: "Send a wide photo and note attached or separate ottomans. Include reclining sections and extra cushions, and tell us if parts of the arrangement are in another room or on a different floor. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Leather upholstery cleaning in Burlington combines suitable surface cleaning with conditioning and protection. We inspect the finish and discuss existing damage before deciding whether the furniture can receive our standard leather service.",
      bookingNote: "Mention previous conditioners and show any cracking, peeling or worn colour. Include each sofa or chair separately so differences within a leather set can be assessed before the appointment. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Book mattress cleaning in Burlington for suitable surface soil, spots and light odours. We confirm the bed size and requested sides and discuss how the mattress will be used after cleaning.",
      bookingNote: "When several beds need attention, list every size and room. Keep bedding off during drying and plan enough unused time for all treated mattresses, rather than assuming each will dry equally quickly.",
    },
    "dining-chair-cleaning": {
      introduction: "Burlington dining chair cleaning covers the fabric seats and backs included in your quote. We inspect chairs individually, checking food marks, material condition and any variations across the set.",
      bookingNote: "Show a full chair and close-ups of the fabric. Count benches and armchairs separately, and mention removable seat pads or mixed upholstery when sending the complete dining-set request. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Arrange armchair and recliner cleaning in Burlington for suitable seating and its accessible cushions. We assess the fabric, high-contact areas and chair mechanism before choosing the cleaning approach.",
      bookingNote: "Add a matching footstool to your list if it also needs cleaning. Photos of seams, headrests and the open recliner help us understand the item without assuming every surface is reachable. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Stair and hallway carpet cleaning in Burlington covers the connecting floor areas in your request. We inspect the carpet and agree on flights, landings and hallways before treating suitable soil and traffic marks.",
      bookingNote: "Separate the step count from hallway measurements, including turning landings. Mention any rooms that can only be reached through the area being cleaned so we can discuss practical access.",
    },
    "pet-stain-odour-removal": {
      introduction: "Request pet stain and odour treatment in Burlington with the affected surface clearly identified. We assess whether the problem is in furniture, a rug or fitted carpet and explain the realistic treatment options.",
      bookingNote: "Tell us which accidents are recent, which have repeated and what you have already applied. Label photos by item or room so the source and extent of the odour can be discussed clearly. Photos are optional.",
    },
  },
  vaughan: {
    "upholstery-cleaning": {
      introduction: "Plan upholstery cleaning in Vaughan for fabric seating across one room or several. We assess each item's material, care information and condition before confirming the cleaning work and any limitations.",
      bookingNote: "Include the full furniture list and floor levels in one request. Photos of sofas, chairs and matching pieces help us distinguish the items rather than estimate from a room description. Photos are optional.",
    },
    "sofa-cleaning": {
      introduction: "Request sofa cleaning in Vaughan for a fabric couch or loveseat that needs professional attention. We check the upholstery and discuss stains, cushions and accessible surfaces before agreeing on the service scope.",
      bookingNote: "Count seats and show the sofa's full shape, including a chaise or recliner if present. Identify which marks concern you and tell us whether stairs are needed to reach the room. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Carpet and area rug cleaning in Vaughan starts with the rooms and floor coverings you want assessed. We check fibres, rug backing and condition before selecting suitable cleaning for the agreed areas.",
      bookingNote: "For requests across several floors, list every carpeted room and staircase. Give rug dimensions separately and note which areas will be clear of small items when the appointment begins.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Book sectional furniture cleaning in Vaughan with all sections and matching pieces clearly counted. We inspect suitable upholstery and confirm accessible cushions and chaise areas as part of the complete quote.",
      bookingNote: "You can share photos of each separate section and the assembled arrangement. Include extra pillows and ottomans in your request, and identify powered parts or room access that could affect the work. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Vaughan leather furniture cleaning is assessed piece by piece before suitable surfaces are cleaned, conditioned and protected. We explain when worn finishes or physical damage need care beyond a cleaning service.",
      bookingNote: "Note which pieces share a leather finish and photograph different wear on each seat. Tell us about previous products, especially where colour, texture or surface condition has changed. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Arrange mattress surface cleaning in Vaughan with the size, material and requested areas confirmed first. We assess suitable spots and everyday buildup and explain what to expect during drying.",
      bookingNote: "List the size and bedroom floor for each mattress. Mention access stairs and whether one or both sides are requested, then plan to leave the treated surfaces uncovered until fully dry.",
    },
    "dining-chair-cleaning": {
      introduction: "Dining chair cleaning in Vaughan gives suitable upholstered seats and backs individual attention. We check fabric differences, food marks and edge wear before confirming the areas included for the set.",
      bookingNote: "Provide the count of chairs and any bench separately. A side and rear photo helps show which areas are upholstered, particularly if the chairs have arms or fabric-covered outer backs. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Armchair and recliner cleaning in Vaughan is planned around the chair's fabric and construction. We check cushions, headrests and moving parts before treating the accessible upholstery agreed in your quote.",
      bookingNote: "Show any removable cushion or extended footrest along with the whole chair. Include matching stools as separate items, and identify the room's floor level when you request an appointment. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Arrange carpeted stair and hallway cleaning in Vaughan with a clear count of each flight and landing. We inspect traffic areas and explain how existing wear may affect the cleaning result.",
      bookingNote: "List staircases individually for a multi-floor visit, then add hallway dimensions. Mention narrow turns or areas that must stay passable while we clean and discuss drying access.",
    },
    "pet-stain-odour-removal": {
      introduction: "Pet stain and odour treatment in Vaughan begins with an assessment of the affected material and the accident history. We discuss whether contamination appears limited to the surface or extends into deeper layers.",
      bookingNote: "Label photos by room or furniture item and distinguish recent accidents from repeated ones. Include earlier cleaning products and explain whether odour remains after the area has fully dried. Photos are optional.",
    },
  },
  hamilton: {
    "upholstery-cleaning": {
      introduction: "Request upholstery cleaning in Hamilton for fabric furniture that needs a suitable, clearly explained treatment. We assess each piece, agree on the accessible surfaces and confirm the visit details before booking.",
      bookingNote: "You can share photos of every item you want included and tell us whether it is on the main floor or reached by stairs. Your postal code and entrance details help us confirm the appointment arrangements. Photos are optional.",
    },
    "sofa-cleaning": {
      introduction: "Sofa and couch cleaning in Hamilton is planned around the upholstery, size and condition of your seating. We check stains and everyday soil, then explain the work and expected limits before starting.",
      bookingNote: "Show the whole couch, cushion layout and any problem areas. Include the seat count and note exterior steps or basement access, along with any matching items you would like quoted. Photos are optional.",
    },
    "carpet-area-rug-cleaning": {
      introduction: "Book carpet and area rug cleaning in Hamilton for suitable floor coverings and the areas you identify. We assess fibres, backing and condition before confirming the cleaning method and full scope.",
      bookingNote: "Include basement rooms, halls, stairs and landings in the area list. Give each loose rug's measurements and care label details so rug suitability is checked separately from fitted carpet.",
    },
    "sectional-furniture-cleaning": {
      introduction: "Arrange sectional cleaning in Hamilton with the complete seating layout described in advance. We inspect the fabric and confirm which sections, chaise pieces and accessible cushions belong in the quote.",
      bookingNote: "Count separate units and add any ottomans or extra pillows. Share photos of the full arrangement and explain stairs or entrance restrictions that affect access to the room. Photos are optional.",
    },
    "leather-upholstery-cleaning": {
      introduction: "Leather upholstery cleaning in Hamilton includes assessment, suitable surface cleaning and conditioning with protection. We discuss the finish first so worn colour or structural damage is not mistaken for removable soil.",
      bookingNote: "Send the care label if available and show any scratches, cracks or peeling. These details help us explain a suitable cleaning approach and what improvement to expect, without promising repair or restoration. Photos are optional.",
    },
    "mattress-cleaning": {
      introduction: "Hamilton mattress cleaning focuses on the suitable surface areas you want treated. We assess the bed size, material and staining, then explain realistic cleaning results and practical drying requirements.",
      bookingNote: "Tell us which bedroom and floor the mattress is on and how much of it can be reached. Mention ventilation and plan to keep bedding off until the treated surface is fully dry.",
    },
    "dining-chair-cleaning": {
      introduction: "Plan dining chair cleaning in Hamilton for upholstered seats, backs and suitable matching benches. We inspect each item for material differences and marks before agreeing on the work for the complete set.",
      bookingNote: "Count chairs and benches separately and show which surfaces contain fabric. Add close-ups of food spills or worn edges, and share the postal code and access details with the same request. Photos are optional.",
    },
    "armchair-cleaning": {
      introduction: "Request armchair or recliner cleaning in Hamilton for suitable upholstered seating and its agreed cushions. We check the fabric, seams and mechanism before choosing a method for accessible surfaces.",
      bookingNote: "Include a full chair photo and show reclining parts or loose cushions. Mention stairs to the room and list a matching footstool separately if it also needs cleaning. Photos are optional.",
    },
    "stairs-hallways-cleaning": {
      introduction: "Carpeted stair and hallway cleaning in Hamilton is quoted from the steps, landings and connecting areas involved. We assess the carpet first and explain what cleaning may improve in worn traffic paths.",
      bookingNote: "Count each flight and landing, including any carpeted basement route. Explain entrance steps or areas that must remain accessible so the appointment can be planned around the full route.",
    },
    "pet-stain-odour-removal": {
      introduction: "Arrange pet stain and odour treatment in Hamilton with the affected surface and accident history clearly described. We assess suitable materials and can try to improve deeper or older problems, without promising complete stain or odour removal.",
      bookingNote: "Mention repeated accidents or previous soaking, even if the visible mark is small. Identify whether odour is in furniture, carpet or a rug, and share any products already used on the area.",
    },
  },
};
