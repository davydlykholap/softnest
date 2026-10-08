"use client";

import { useSearchParams } from "next/navigation";
import { quoteLocationValue } from "@/lib/locationSearch";

export type QuoteCity = { slug: string; name: string };

export default function QuoteLocationField({ cities }: { cities: QuoteCity[] }) {
  const params = useSearchParams();
  const city = cities.find((item) => item.slug === params.get("city"));
  const requestedLocation = city?.name || quoteLocationValue(params.get("service_location"));
  return <>
    <label className="quote-page-field">
      <span>Service city or postal code</span>
      <input key={requestedLocation || "unknown"} name="service_location" type="text" autoComplete="address-level2"
        placeholder="Where is the cleaning needed?" defaultValue={requestedLocation} minLength={2} maxLength={120} required />
    </label>
    {city ? <input type="hidden" name="source_city" value={city.slug} /> : null}
  </>;
}
