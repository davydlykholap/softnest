import "server-only";
import { locations, getLocation } from "@/content/locations";
import { services, getService } from "@/content/services";
import { cityServiceCoverage, cityServiceProfiles } from "./cityServiceConfig";
import { customerServiceText } from "./cityServiceCopy";
import { cityServiceEditorial } from "./cityServiceEditorial";
import { serviceReading } from "./serviceReading";
import { servicePreparation } from "./servicePreparation";

// Conditional access guidance, not claims about local jobs or branch offices.
const cityPlanning: Record<string, string> = {
  mississauga: "For City Centre or Port Credit condos, include parking and any elevator reservation. For a house in Streetsville, Erin Mills or elsewhere in Mississauga, tell us which floor the items are on.",
  toronto: "For a Toronto apartment or condo, share loading instructions, parking and any elevator booking. Include building service-hour limits before we arrange the visit; for houses, tell us about entrance steps and floor levels.",
  brampton: "For Brampton visits, include all requested items and rooms together. Tell us about a basement entrance, interior stairs or parking restrictions so we can plan the complete appointment.",
  oakville: "For an Oakville house, townhouse or condo, send your postal code and the room or floor where cleaning is needed. Share parking instructions and any building access requirements before we confirm the visit.",
  etobicoke: "For Mimico, Humber Bay or other Etobicoke condos, check visitor parking and elevator arrangements. For a house or apartment, explain entrance steps and floor levels so we can plan access with your quote.",
  burlington: "For a Burlington home or condo, list everything you want cleaned in one request. Include parking, entrance and any elevator arrangements, plus the rooms that need time to dry before normal use.",
  vaughan: "For a Vaughan appointment, identify the floor for each item or room and explain the entrance route. Let us know about parking restrictions or condo service bookings before we agree on the visit time.",
  milton: "For a Milton house, townhouse or apartment, include parking instructions and the floors where cleaning is needed. Mention basement entrances or narrow stairs when you send the complete item and room list.",
  hamilton: "For Hamilton visits, send your postal code with the items and rooms you want cleaned. Include exterior steps, basement access and any building reservations so coverage, access and appointment timing can be confirmed.",
};

export function getCityServicePage(city: string, slug: string) {
  const location = getLocation(city);
  const service = getService(slug);
  const profile = cityServiceProfiles[slug];
  const coverage = cityServiceCoverage[city];
  if (!location || !service || !profile || location.status !== "active" ||
    !location.pageEnabled || !location.indexInSearch || !coverage ||
    (coverage !== "all" && !coverage.includes(slug))) return undefined;

  const copy = cityServiceEditorial[city]?.[slug];
  const planning = cityPlanning[city];
  const preparation = servicePreparation[slug];
  if (!copy || !planning || !preparation) throw new Error(`Missing reviewed city-service copy: ${city}/${slug}`);
  const title = `${profile.title} in ${location.name}`;
  const path = `/location/${city}/${slug}/`;
  const firstSentence = copy.introduction.split(/(?<=[.!?])\s/)[0];
  const description = firstSentence.length <= 125
    ? `${firstSentence} Free quotes with a confirmed tax-inclusive price.`
    : firstSentence;
  return {
    location, service, profile, title, path,
    metaTitle: `${profile.title} ${location.name} | SoftNest`,
    description,
    introduction: copy.introduction,
    included: service.included.slice(0, 4).map(customerServiceText),
    pricing: "Your quote covers the agreed items or areas, their size and condition, and any extra treatment. We confirm the total price, including tax, before booking.",
    localDetail: copy.bookingNote,
    planning,
    reading: serviceReading[slug],
    quoteHref: `/quote/?city=${encodeURIComponent(city)}&service=${encodeURIComponent(slug)}`,
    faqs: [
      { question: "How can I get a quote?", answer: `Call or text us, or request a quote through our website. Tell us you're in ${location.name} and what you'd like cleaned. Photos can help, but you don't have to send any. We'll confirm the final price, tax included, before you book.` },
      { question: "How long before I can use it again?", answer: customerServiceText(service.drying) },
      { question: "Can every stain be removed?", answer: customerServiceText(service.limitations) },
      { question: "What should I do before you arrive?", answer: preparation },
    ],
  };
}

export const cityServicePages = locations.flatMap((location) => services.flatMap((service) => {
  const page = getCityServicePage(location.slug, service.slug);
  return page ? [page] : [];
}));

export type CityServicePageContent = NonNullable<ReturnType<typeof getCityServicePage>>;
