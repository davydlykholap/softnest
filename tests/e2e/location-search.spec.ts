import { expect, test } from "@playwright/test";

test("neighbourhood search reaches its city on desktop and mobile", async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/location/");
    await page.getByRole("combobox").fill("Port Credit");
    await expect(page.getByRole("option", { name: /Mississauga/ })).toBeVisible();
    await page.getByRole("button", { name: "Check service area" }).click();
    await expect(page).toHaveURL(/\/location\/mississauga\/$/);
    await expect(page.locator("h1")).toContainText("Mississauga");
  }
});

test("postal code inquiry keeps its value without inventing a city attribution", async ({ page }) => {
  await page.goto("/location/");
  await page.getByRole("combobox").fill("L5G 1A1");
  await page.getByRole("button", { name: "Check service area" }).click();
  await expect(page.getByRole("status")).toContainText("Postal codes are confirmed individually");
  await page.getByRole("link", { name: "Ask about this location" }).click();
  await expect(page.getByRole("textbox", { name: "Service city or postal code" })).toHaveValue("L5G 1A1");
  await expect(page.locator('input[name="source_city"]')).toHaveCount(0);
});

test("city CTA events and explicit quote prefills keep city context without customer details", async ({ page }) => {
  await page.goto("/location/toronto/");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  await page.locator('a[href^="tel:"]').first().evaluate((element) => element.addEventListener("click", (event) => event.preventDefault()));
  await page.locator('a[href^="tel:"]').first().click({ force: true });
  const callEvents = await page.evaluate(() => window.dataLayer);
  expect(callEvents).toContainEqual(["event", "click_to_call", { event_category: "contact", event_label: "phone", source_city: "toronto" }]);
  await page.locator(".hero-action-buttons").getByRole("link", { name: /Get a free/ }).click();
  await expect(page).toHaveURL(/\/quote\/$/);
  expect(await page.evaluate(() => window.dataLayer)).toContainEqual(["event", "quote_click", { source_city: "toronto" }]);
  await page.goto("/quote/?city=toronto");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  await expect(page.getByRole("textbox", { name: "Service city or postal code" })).toHaveValue("Toronto");
  await page.getByRole("textbox", { name: "Your name" }).fill("Private Customer");
  const events = await page.evaluate(() => window.dataLayer);
  expect(events).toContainEqual(expect.objectContaining({ 0: "event", 1: "quote_start", 2: { source_city: "toronto" } }));
  expect(JSON.stringify(events)).not.toContain("Private Customer");
});

test("city pages are in the sitemap with canonical URLs and distinct descriptions", async ({ page, request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<loc>https://softnestcare.ca/location/toronto/</loc>");
  await page.goto("/location/toronto/");
  const torontoDescription = await page.locator('meta[name="description"]').getAttribute("content");
  expect(torontoDescription).toContain("Toronto");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://softnestcare.ca/location/toronto/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await page.goto("/location/mississauga/");
  expect(await page.locator('meta[name="description"]').getAttribute("content")).not.toBe(torontoDescription);
});
