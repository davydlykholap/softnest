"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DirectorySearch, {
  type DirectorySearchOption,
} from "@/components/DirectorySearch";
import { locations } from "@/content/locations";

export default function LocationSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(normalizedQuery),
  );
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
    const match = locations.find(
      (location) =>
        normalizedQuery === location.name.toLowerCase() ||
        normalizedQuery === location.slug ||
        normalizedQuery.includes(location.name.toLowerCase()),
    );

    if (match) {
      router.push(`/location/${match.slug}/`);
      return;
    }

    setMessage("Send us your city or postal code and we’ll confirm availability.");
    document
      .querySelector("#ask-about-your-city")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <DirectorySearch
      id="locations-city-search"
      label="Where can we help?"
      placeholder="Enter your city or postal code"
      submitLabel="Check service area"
      value={query}
      options={options}
      optionsLabel="SoftNest service locations"
      emptyMessage="No listed city matches yet. Enter your postal code to ask us."
      message={message}
      onChange={(value) => {
        setQuery(value);
        setMessage("");
      }}
      onChoose={chooseLocation}
      onSubmit={submit}
    />
  );
}
