import { expect, test } from "@playwright/test";
import { quoteLocationValue, resolveLocation, suggestLocations } from "../src/lib/locationSearch";
import { cityFromUrl } from "../src/lib/analytics";

const locations = [
  { slug: "toronto", name: "Toronto", neighbourhoods: ["The Annex", "North York"] },
  { slug: "mississauga", name: "Mississauga", neighbourhoods: ["Port Credit", "City Centre"] },
  { slug: "vaughan", name: "Vaughan", neighbourhoods: ["Thornhill"] },
  { slug: "markham", name: "Markham", neighbourhoods: ["Thornhill"] },
];

test("location matching normalizes input without guessing ambiguous cities", () => {
  expect(resolveLocation(locations, "port-credit")?.slug).toBe("mississauga");
  expect(resolveLocation(locations, " Toronto, ON ")?.slug).toBe("toronto");
  expect(resolveLocation(locations, "cleaning in North York")?.slug).toBe("toronto");
  for (const input of ["Thornhill", "Toronto or Mississauga", "NotToronto", "L5G 1A1", "", "Tor"]) {
    expect(resolveLocation(locations, input)).toBeUndefined();
  }
  expect(suggestLocations(locations, "Thorn").map((location) => location.slug)).toEqual(["vaughan", "markham"]);
  expect(suggestLocations(locations, "annex")[0].slug).toBe("toronto");
});

test("prefilled inquiry is bounded and never treated as analytics city context", () => {
  expect(quoteLocationValue("\n L5G 1A1 \r")).toBe("L5G 1A1");
  expect(quoteLocationValue("x".repeat(200))).toHaveLength(120);
  const slugs = locations.map((location) => location.slug);
  expect(cityFromUrl(new URL("https://example.com/location/toronto/"), slugs)).toBe("toronto");
  expect(cityFromUrl(new URL("https://example.com/quote/?city=mississauga"), slugs)).toBe("mississauga");
  expect(cityFromUrl(new URL("https://example.com/quote/?city=private&service_location=Private+Address"), slugs)).toBeUndefined();
});
