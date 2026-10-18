import "server-only";
import { locations, getLocation } from "@/content/locations";
import { services, getService } from "@/content/services";
import { cityServiceCoverage, cityServiceProfiles } from "./cityServiceConfig";
import { customerServiceText } from "./cityServiceCopy";
import { cityServiceEditorial } from "./cityServiceEditorial";
import { serviceReading } from "./serviceReading";

export function getCityServicePage(city: string, slug: string) {
  const location = getLocation(city);
  const service = getService(slug);
  const profile = cityServiceProfiles[slug];
  const coverage = cityServiceCoverage[city];
  if (!location || !service || !profile || location.status !== "active" ||
    !location.pageEnabled || !location.indexInSearch || !coverage ||
    (coverage !== "all" && !coverage.includes(slug))) return undefined;

  const copy = cityServiceEditorial[city]?.[slug];
  if (!copy?.introduction || !copy.bookingNote || !copy.visit ||
    !copy.question?.question || !copy.question.answer) {
    throw new Error(`Missing reviewed city-service copy: ${city}/${slug}`);
  }
  const title = `${profile.title} in ${location.name}`;
  const path = `/location/${city}/${slug}/`;
  const firstSentence = copy.introduction.split(/(?<=[.!?])\s/)[0];
  const description = firstSentence.length <= 105
    ? `${firstSentence} Get a free quote from SoftNest. Prices include tax.`
    : firstSentence;
  return {
    location, service, profile, title, path,
    metaTitle: `${profile.title} ${location.name} | SoftNest`,
    description,
    introduction: copy.introduction,
    included: service.included.slice(0, 4).map(customerServiceText),
    pricing: "Size, condition and the items or areas included affect the quote. We agree any extra treatment and confirm the total, including tax, before booking.",
    localDetail: copy.bookingNote,
    planning: copy.visit,
    reading: serviceReading[slug],
    quoteHref: `/quote/?city=${encodeURIComponent(city)}&service=${encodeURIComponent(slug)}`,
    faqs: [
      { question: "How can I get a quote?", answer: "Call or text us, or use the form. Photos can help, but you don't have to send any. We confirm the work and a tax-inclusive price before booking." },
      { question: "How long before I can use it again?", answer: customerServiceText(service.drying) },
      { question: "Can every stain be removed?", answer: customerServiceText(service.limitations) },
      copy.question,
    ],
  };
}

export const cityServicePages = locations.flatMap((location) => services.flatMap((service) => {
  const page = getCityServicePage(location.slug, service.slug);
  return page ? [page] : [];
}));

export type CityServicePageContent = NonNullable<ReturnType<typeof getCityServicePage>>;
