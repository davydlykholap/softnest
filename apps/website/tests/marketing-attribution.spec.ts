import { expect, test } from "@playwright/test";
import { readAttribution, sanitizeAttribution } from "../src/lib/marketingAttribution";

test("keeps only bounded campaign values", () => {
  const values = readAttribution(
    `?utm_source=search&utm_medium=paid%0Atraffic&utm_campaign=${"x".repeat(501)}&private=secret`,
  );

  expect(values).toEqual({ utm_source: "search" });
});

test("does not treat unrelated query text as attribution", () => {
  expect(readAttribution("?name=Jane&email=jane%40example.com")).toEqual({});
  expect(sanitizeAttribution({ landing_page: "/?name=Jane", landing_referrer: "https://example.com/" })).toEqual({});
});
