export type LocationSearchItem = {
  slug: string;
  name: string;
  neighbourhoods: string[];
};

export function normalizeLocationQuery(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function searchTerms(location: LocationSearchItem) {
  return [location.name, location.slug, ...location.neighbourhoods].map(normalizeLocationQuery);
}

export function suggestLocations(locations: readonly LocationSearchItem[], query: string) {
  const normalized = normalizeLocationQuery(query);
  return locations.filter((location) => searchTerms(location).some((term) => term.includes(normalized)));
}

// Prefer an explicit city over a neighbourhood shared by several cities.
// Ambiguous input must stay a choice rather than silently selecting the first city.
export function resolveLocation(locations: readonly LocationSearchItem[], query: string) {
  const normalized = normalizeLocationQuery(query);
  if (!normalized) return undefined;
  const exactCities = locations.filter((location) =>
    [location.name, location.slug].some((term) => normalizeLocationQuery(term) === normalized));
  if (exactCities.length === 1) return exactCities[0];
  const exactTerms = locations.filter((location) => searchTerms(location).includes(normalized));
  if (exactTerms.length) return exactTerms.length === 1 ? exactTerms[0] : undefined;
  const matches = locations.filter((location) => searchTerms(location)
    .some((term) => ` ${normalized} `.includes(` ${term} `)));
  return matches.length === 1 ? matches[0] : undefined;
}

export function quoteLocationValue(value: string | null) {
  return (value ?? "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 120);
}
