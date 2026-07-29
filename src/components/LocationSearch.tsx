"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/data/locations";

export default function LocationSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    const match = locations.find(
      (location) =>
        normalized === location.name.toLowerCase() ||
        normalized === location.slug ||
        normalized.includes(location.name.toLowerCase()),
    );

    if (match) {
      router.push(`/location/${match.slug}/`);
      return;
    }

    setMessage(
      "Send us your city or postal code and we’ll confirm availability.",
    );
    document
      .querySelector("#ask-about-your-city")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <form className="locations-search" onSubmit={submit}>
      <label htmlFor="locations-city-search">Where can we help?</label>
      <div className="locations-search__field">
        <span className="locations-search__pin" aria-hidden="true" />
        <input
          id="locations-city-search"
          name="city"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setMessage("");
          }}
          list="softnest-locations"
          placeholder="Enter your city or postal code"
          autoComplete="postal-code"
          aria-describedby={message ? "locations-search-message" : undefined}
        />
        <datalist id="softnest-locations">
          {locations.map((location) => (
            <option value={location.name} key={location.slug} />
          ))}
        </datalist>
      </div>
      <button type="submit">Check service area</button>
      {message && (
        <p id="locations-search-message" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
