"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/data/locations";

export default function LocationSearch() {
  const router = useRouter();
  const listId = useId();
  const fieldRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  const chooseLocation = (location: (typeof locations)[number]) => {
    setQuery(location.name);
    setMessage("");
    setOpen(false);
    setActiveIndex(-1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();
    const match = locations.find(
      (location) =>
        normalized === location.name.toLowerCase() ||
        normalized === location.slug ||
        normalized.includes(location.name.toLowerCase()),
    );

    setOpen(false);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        filteredLocations.length
          ? Math.min(current + 1, filteredLocations.length - 1)
          : -1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        filteredLocations.length
          ? current <= 0
            ? filteredLocations.length - 1
            : current - 1
          : -1,
      );
      return;
    }

    if (
      event.key === "Enter" &&
      open &&
      activeIndex >= 0 &&
      filteredLocations[activeIndex]
    ) {
      event.preventDefault();
      chooseLocation(filteredLocations[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <form className="locations-search" onSubmit={submit}>
      <label htmlFor="locations-city-search">Where can we help?</label>
      <div className="locations-search__field" ref={fieldRef}>
        <span className="locations-search__pin" aria-hidden="true" />
        <input
          id="locations-city-search"
          name="city"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setMessage("");
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your city or postal code"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && activeIndex >= 0 && filteredLocations[activeIndex]
              ? `${listId}-${filteredLocations[activeIndex].slug}`
              : undefined
          }
          aria-describedby={message ? "locations-search-message" : undefined}
        />
        <button
          className="locations-search__toggle"
          type="button"
          aria-label={open ? "Close city list" : "Show city list"}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => {
            setOpen((value) => !value);
            setActiveIndex(-1);
          }}
        >
          <span aria-hidden="true" />
        </button>

        <div
          className={`locations-search__options ${
            open ? "locations-search__options--open" : ""
          }`}
          id={listId}
          role="listbox"
          aria-label="SoftNest service locations"
        >
          {filteredLocations.length ? (
            filteredLocations.map((location, index) => (
              <button
                id={`${listId}-${location.slug}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={
                  index === activeIndex
                    ? "locations-search__option locations-search__option--active"
                    : "locations-search__option"
                }
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => chooseLocation(location)}
                key={location.slug}
              >
                <span>{location.name}</span>
                <small>View local services</small>
              </button>
            ))
          ) : (
            <p className="locations-search__empty">
              No listed city matches yet. Enter your postal code to ask us.
            </p>
          )}
        </div>
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
