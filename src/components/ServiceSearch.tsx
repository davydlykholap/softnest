"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DirectorySearch, {
  type DirectorySearchOption,
} from "@/components/DirectorySearch";
import { services } from "@/content/services";

function matchesService(query: string, service: (typeof services)[number]) {
  return [
    service.name,
    service.menuLabel,
    service.shortName,
    service.slug.replaceAll("-", " "),
    ...service.serviceType,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

export default function ServiceSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const options = services
    .filter((service) => !normalizedQuery || matchesService(normalizedQuery, service))
    .map((service) => ({
      id: service.slug,
      label: service.name,
      hint: "View service details",
    }));

  const chooseService = (option: DirectorySearchOption) => {
    setQuery(option.label);
    setMessage("");
  };

  const submit = () => {
    const match = services.find((service) =>
      [service.name, service.menuLabel, service.shortName, service.slug]
        .some((name) => name.toLowerCase() === normalizedQuery),
    ) ?? (normalizedQuery.length >= 3
      ? services.find((service) => matchesService(normalizedQuery, service))
      : undefined);

    if (match) {
      router.push(`/services/${match.slug}/`);
      return;
    }

    setMessage("Choose a service below, or tell us what needs cleaning.");
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <DirectorySearch
      id="services-search-input"
      label="What needs cleaning?"
      placeholder="Sofa, sectional, carpet, mattress..."
      submitLabel="View service"
      value={query}
      options={options}
      optionsLabel="SoftNest cleaning services"
      emptyMessage="No exact service matches. Browse the full list below."
      message={message}
      onChange={(value) => {
        setQuery(value);
        setMessage("");
      }}
      onChoose={chooseService}
      onSubmit={submit}
    />
  );
}
