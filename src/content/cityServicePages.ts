import "server-only";
import { locations, getLocation } from "@/content/locations";
import { services, getService } from "@/content/services";
import { cityServiceCoverage, cityServiceProfiles } from "./cityServiceConfig";
import { customerServiceText } from "./cityServiceCopy";

// Local booking guidance, not claims about completed jobs or branch offices.
const cityGuidance: Record<string, { planning: string; details: Record<string, string> }> = {
  mississauga: { planning: "For City Centre and Port Credit condos, include visitor parking and elevator reservation details. For houses in Streetsville or Erin Mills, tell us which floor needs attention.", details: {
    furniture: "For a Mississauga condo furniture visit, check your building's delivery or service access rules before selecting an appointment.",
    carpet: "For Mississauga carpet requests, separate rooms, hallways and stairs in your list so the complete floor area is clear.",
    leather: "For leather seating in Mississauga homes or offices, photograph high-contact armrests and seat panels as well as the complete piece.",
    mattress: "For a Mississauga mattress appointment, include the bedroom floor and any elevator requirements with the mattress size.",
    pet: "For pet treatment in Mississauga, identify every affected room or item so we can discuss the full contamination scope.",
  } },
  toronto: { planning: "For downtown Toronto appointments, share loading, parking and elevator booking instructions. Include any building restrictions on contractor access or service hours before we arrange the visit.", details: {
    furniture: "For Toronto apartment seating, tell us whether cushions can be accessed freely and whether the building requires a reserved service elevator.",
    carpet: "For Toronto condo carpet cleaning, list the accessible carpeted areas and any furniture that will remain in place.",
    leather: "For Toronto leather furniture, include finish close-ups and loading instructions together so suitability and building access can be reviewed.",
    mattress: "For a Toronto condo mattress visit, check service-hour restrictions and plan ventilation and bedding arrangements around drying.",
    pet: "For Toronto pet-odour requests, distinguish a single accident from recurring odour across several rooms or pieces of furniture.",
  } },
  brampton: { planning: "For Brampton visits in Bramalea, Mount Pleasant or Springdale, include all items in one request. Tell us about basement entrances, stairs and parking so we can plan access.", details: {
    furniture: "For a Brampton furniture request, count matching chairs and ottomans alongside the main sofa or sectional to avoid an incomplete estimate.",
    carpet: "For a Brampton basement or multi-floor carpet visit, include each room, staircase and landing rather than only a bedroom count.",
    leather: "For Brampton leather seating sets, photograph each piece separately; the condition of one seat may differ from the others.",
    mattress: "For a Brampton basement bedroom, mention access stairs and available ventilation when requesting mattress cleaning.",
    pet: "For Brampton basement carpet odours, tell us whether moisture or previous accidents may have reached the backing or underlay.",
  } },
  oakville: { planning: "We cover Oakville areas including Glen Abbey, Bronte and West Oak Trails. Share care labels, parking instructions and any condo access requirements when requesting your appointment.", details: {
    furniture: "For Oakville furniture appointments, include care-label photos for accent chairs and sofas so different materials can be considered separately.",
    carpet: "For Oakville rug and carpet requests, distinguish fitted carpet from loose rugs and share rug backing and label photos where practical.",
    leather: "For leather furniture in Oakville, highlight worn finishes or colour changes in your photos so cleaning expectations can be discussed first.",
    mattress: "For Oakville mattress cleaning, include the bed size and accessible sides; tell us if the mattress must be used that evening.",
    pet: "For an Oakville pet-treatment visit, include both the visible mark and the wider area where you notice odour.",
  } },
  etobicoke: { planning: "For Humber Bay and Mimico condos, check parking and elevator arrangements. For houses in the Kingsway or other Etobicoke neighbourhoods, include entrance and floor-level details with your request.", details: {
    furniture: "For Etobicoke condo seating, include the furniture dimensions and building access details together to help plan the visit.",
    carpet: "For Etobicoke carpet cleaning, tell us whether the work is in a condo, a house or a basement and list stairs separately.",
    leather: "For Etobicoke leather seating, send close-ups in good light so surface soil can be distinguished from possible finish damage.",
    mattress: "For an Etobicoke mattress visit, include elevator arrangements where needed and leave bedding off during the drying period.",
    pet: "For pet odours in Etobicoke furniture or carpet, explain where the smell is strongest and how long it has been present.",
  } },
  burlington: { planning: "For Burlington homes in Aldershot, Millcroft or the Orchard, list all rooms and furniture together. Share parking, entrance and condo elevator arrangements before booking.", details: {
    furniture: "For Burlington furniture sets, a photo of the complete arrangement helps us identify every chair, cushion and ottoman included in your request.",
    carpet: "For a Burlington whole-home carpet request, include approximate room sizes and separate stair and landing counts.",
    leather: "For Burlington leather furniture, mention previous conditioning products and photograph any areas with peeling or cracking.",
    mattress: "For Burlington mattress requests involving more than one bed, list each size separately and allow a drying window for every room.",
    pet: "For Burlington pet-treatment requests, identify whether the affected surface is carpet, a rug or furniture because treatment suitability differs.",
  } },
  vaughan: { planning: "For Vaughan appointments in Woodbridge, Maple or other covered neighbourhoods, include the full item list and floor levels. Share parking and entrance instructions for houses or condos.", details: {
    furniture: "For Vaughan sectional and seating arrangements, include every separate section and matching piece in the photos used for your estimate.",
    carpet: "For Vaughan carpet appointments across several floors, count each staircase and identify the rooms that will be ready for cleaning.",
    leather: "For leather seating in Vaughan, note which pieces share the same finish and photograph visibly different wear on individual seats.",
    mattress: "For a Vaughan mattress appointment, list the sizes and bedroom floors so access and the total work can be planned together.",
    pet: "For a Vaughan pet-odour request involving several areas, label the photos by room and explain which accidents are recent or repeated.",
  } },
  milton: { planning: "For Milton homes in Beaty, Scott, Willmott or nearby neighbourhoods, share floor levels and parking instructions. Include basement access and all requested items before we confirm the appointment.", details: {
    furniture: "For Milton furniture appointments, include sectionals, loose cushions and matching pieces in one photo set so the complete scope is clear.",
    carpet: "For Milton townhouse carpet cleaning, list bedrooms, connecting hallways and each flight of stairs rather than just the number of floors.",
    leather: "For Milton leather cleaning, include care information and close-ups of headrests and armrests where oils or finish wear may be visible.",
    mattress: "For Milton mattress cleaning, share bed sizes and any narrow access stairs, and plan to keep bedding off until fully dry.",
    pet: "For Milton homes with recurring pet accidents, explain which areas have been treated already and whether odour returns after drying.",
  } },
  hamilton: { planning: "For Hamilton appointments, include your postal code, parking and entrance details. Tell us about exterior steps, basement access or building reservations so availability and access can be confirmed.", details: {
    furniture: "For Hamilton furniture cleaning, photograph the complete item and explain whether the seating is on a main floor or reached by stairs.",
    carpet: "For Hamilton carpet requests, include stairs, landings and basement rooms in the area list to help define the full visit.",
    leather: "For Hamilton leather furniture, share the care label where available and identify damage that may require repair rather than cleaning.",
    mattress: "For Hamilton mattress visits, tell us about the bedroom location and ventilation so practical access and drying can be discussed.",
    pet: "For Hamilton pet-treatment requests, mention any previous saturation or repeated accidents that may have affected deeper materials.",
  } },
};

export function getCityServicePage(city: string, slug: string) {
  const location = getLocation(city);
  const service = getService(slug);
  const profile = cityServiceProfiles[slug];
  const local = cityGuidance[city];
  const coverage = cityServiceCoverage[city];
  if (!location || !service || !profile || !local || location.status !== "active" ||
    !location.indexInSearch || !coverage || (coverage !== "all" && !coverage.includes(slug))) return undefined;
  const title = `${profile.title} in ${location.name}`;
  const path = `/location/${city}/${slug}/`;
  return {
    location, service, profile, title, path,
    metaTitle: `${profile.title} ${location.name} | SoftNest`,
    description: `${profile.title} in ${location.name}, including ${location.neighbourhoods.slice(0, 2).join(" and ")}. Request a free quote with the work and tax-inclusive price confirmed before booking.`,
    introduction: customerServiceText(service.summary),
    included: service.included.slice(0, 4).map(customerServiceText),
    pricing: "Your price depends on what needs cleaning, its size and condition, and any extra treatment. We confirm the work and total price, including tax, before booking.",
    localDetail: local.details[profile.group], planning: local.planning,
    quoteHref: `/quote/?city=${encodeURIComponent(city)}&service=${encodeURIComponent(slug)}`,
    faqs: [
      { question: "What should I send for a quote?", answer: profile.quote },
      { question: "How long before I can use it again?", answer: service.drying },
      { question: "Can every stain or mark be removed?", answer: service.limitations },
      { question: `How do I request a ${location.name} appointment?`, answer: "Use the quote form with your city and the items you need cleaned, or message photos directly through Instagram or Facebook. We confirm suitability, availability and the agreed work before booking." },
    ],
  };
}

export const cityServicePages = locations.flatMap((location) => services.flatMap((service) => {
  const page = getCityServicePage(location.slug, service.slug);
  return page ? [page] : [];
}));

export type CityServicePageContent = NonNullable<ReturnType<typeof getCityServicePage>>;
