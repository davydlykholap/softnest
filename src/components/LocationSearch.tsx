"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quoteLocationValue, resolveLocation, suggestLocations, type LocationSearchItem } from "@/lib/locationSearch";
import { trackEvent } from "@/lib/analytics";
import DirectorySearch, {
  type DirectorySearchOption,
} from "@/components/DirectorySearch";

export default function LocationSearch({
  locations,
}: {
  locations: readonly LocationSearchItem[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const filteredLocations = suggestLocations(locations, query);
  const options = filteredLocations.map((location) => ({
    id: location.slug,
    label: location.name,
    hint: "View local services",
  }));

  const chooseLocation = (option: DirectorySearchOption) => {
    setQuery(option.label);
    setMessage("");
  };

  const submit = () => {
    const match = resolveLocation(locations, query);

    if (match) {
      trackEvent("location_search", { outcome: "matched", source_city: match.slug });
      router.push(`/location/${match.slug}/`);
      return;
    }

    if (!query.trim()) {
      setMessage("Enter a city or neighbourhood to find local services.");
      return;
    }
    trackEvent("location_search", { outcome: "unconfirmed" });
    setMessage("Choose a listed city, or send us your location to confirm availability. Postal codes are confirmed individually.");
  };

  return (
    <DirectorySearch
      id="locations-city-search"
      label="Where can we help?"
      placeholder="Enter your city or neighbourhood"
      submitLabel="Check service area"
      value={query}
      options={options}
      optionsLabel="SoftNest service locations"
      emptyMessage="No listed city matches. Submit to request an availability check."
      message={message ? <>{message}{query.trim() ? <> <Link href={`/quote/?service_location=${encodeURIComponent(quoteLocationValue(query))}`}>Ask about this location</Link></> : null}</> : undefined}
      onChange={(value) => {
        setQuery(value);
        setMessage("");
      }}
      onChoose={chooseLocation}
      onSubmit={submit}
    />
  );
}
