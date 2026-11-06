"use client";

import { useSearchParams } from "next/navigation";
import { quoteLocationValue } from "@/lib/locationSearch";

export type QuoteCity = { slug: string; name: string };

export function QuoteLocationInputs({ individual, cityValue = "", postalCode = "" }: {
  individual: boolean;
  cityValue?: string;
  postalCode?: string;
}) {
  return <>
    <label className="quote-page-field">
      <span>{individual ? "Service city" : "Service city or postal code"}</span>
      <input key={cityValue || "unknown"} name="service_location" type="text" autoComplete="address-level2"
        placeholder={individual ? "City" : "City or postal code"} defaultValue={cityValue} minLength={2} maxLength={120} required />
    </label>
    {individual ? <label className="quote-page-field">
      <span>Postal code (optional)</span>
      <input key={postalCode || "unknown"} name="postal_code" type="text" autoComplete="postal-code"
        placeholder="e.g. L5G 1A1" defaultValue={postalCode} maxLength={10} />
    </label> : null}
  </>;
}

export default function QuoteLocationField({ cities, individual }: { cities: QuoteCity[]; individual: boolean }) {
  const params = useSearchParams();
  const city = cities.find((item) => item.slug === params.get("city"));
  const requestedLocation = quoteLocationValue(params.get("service_location"));
  const isPostalCode = /^[a-z]\d[a-z](?:\s?\d[a-z]\d)?$/i.test(requestedLocation);
  return <>
    <QuoteLocationInputs individual={individual}
      cityValue={city?.name || (individual && isPostalCode ? "" : requestedLocation)}
      postalCode={isPostalCode ? requestedLocation.toUpperCase() : ""} />
    {city ? <input type="hidden" name="source_city" value={city.slug} /> : null}
  </>;
}
