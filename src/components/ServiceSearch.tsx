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
import { services } from "@/data/services";

function serviceMatchesQuery(
  service: (typeof services)[number],
  normalizedQuery: string,
) {
  const searchable = [
    service.name,
    service.menuLabel,
    service.shortName,
    service.slug.replaceAll("-", " "),
    ...service.serviceType,
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalizedQuery);
}

export default function ServiceSearch() {
  const router = useRouter();
  const listId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredServices = services.filter((service) =>
    normalizedQuery ? serviceMatchesQuery(service, normalizedQuery) : true,
  );

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  const chooseService = (service: (typeof services)[number]) => {
    setQuery(service.name);
    setMessage("");
    setOpen(false);
    setActiveIndex(-1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const match = services.find((service) => {
      const exactNames = [
        service.name,
        service.menuLabel,
        service.shortName,
        service.slug,
        service.slug.replaceAll("-", " "),
      ].map((value) => value.toLowerCase());

      return (
        exactNames.includes(normalizedQuery) ||
        (normalizedQuery.length >= 3 &&
          serviceMatchesQuery(service, normalizedQuery))
      );
    });

    setOpen(false);

    if (match) {
      router.push(`/services/${match.slug}/`);
      return;
    }

    setMessage("Choose a service below, or tell us what needs cleaning.");
    document
      .querySelector("#services")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        filteredServices.length
          ? Math.min(current + 1, filteredServices.length - 1)
          : -1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        filteredServices.length
          ? current <= 0
            ? filteredServices.length - 1
            : current - 1
          : -1,
      );
      return;
    }

    if (
      event.key === "Enter" &&
      open &&
      activeIndex >= 0 &&
      filteredServices[activeIndex]
    ) {
      event.preventDefault();
      chooseService(filteredServices[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <form
      className="locations-search services-search"
      onSubmit={submit}
      ref={formRef}
    >
      <label htmlFor="services-search-input">What needs cleaning?</label>
      <div className="locations-search__field">
        <span className="services-search__symbol" aria-hidden="true">
          ✦
        </span>
        <input
          id="services-search-input"
          name="service"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setMessage("");
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Sofa, sectional, carpet, mattress..."
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && activeIndex >= 0 && filteredServices[activeIndex]
              ? `${listId}-${filteredServices[activeIndex].slug}`
              : undefined
          }
          aria-describedby={message ? "services-search-message" : undefined}
        />
        <button
          className="locations-search__toggle"
          type="button"
          aria-label={open ? "Close service list" : "Show service list"}
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
          aria-label="SoftNest cleaning services"
        >
          {filteredServices.length ? (
            filteredServices.map((service, index) => (
              <button
                id={`${listId}-${service.slug}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={
                  index === activeIndex
                    ? "locations-search__option locations-search__option--active"
                    : "locations-search__option"
                }
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => chooseService(service)}
                key={service.slug}
              >
                <span>{service.name}</span>
                <small>{service.shortName}</small>
              </button>
            ))
          ) : (
            <p className="locations-search__empty">
              No exact service matches. Browse the full list below.
            </p>
          )}
        </div>
      </div>
      <button type="submit">View service</button>
      {message && (
        <p id="services-search-message" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
