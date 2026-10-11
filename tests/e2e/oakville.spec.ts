import { expect, test } from "@playwright/test";

test("Oakville's original FAQ layout displays answers matching its structured data", async ({ page }) => {
  await page.goto("/location/oakville/");

  await expect(page).toHaveTitle("Upholstery & Carpet Cleaning Oakville | Sofa & Rug | SoftNest");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /one final price with tax included/);
  await expect(page.locator(".location-page-care-band, .location-page-services, .location-page-process")).toHaveCount(0);
  await expect(page.locator("#services h2")).toHaveText(["Sofas↗", "Carpets↗", "Area rugs↗", "And more"]);

  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq = scripts.map((script) => JSON.parse(script)).find((schema) => schema["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(6);

  for (const entry of faq.mainEntity) {
    await page.locator("#faq").getByRole("button", { name: entry.name, exact: true }).click();
    await expect(page.locator("#home-faq-answer p").first()).toHaveText(entry.acceptedAnswer.text);
    await expect(page.locator("#home-faq-answer")).toBeVisible();
  }

  await expect(page.locator("#oakville-work-heading")).toHaveCount(0);
});

test("mobile Oakville service and quote links reach their destinations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/location/oakville/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator("#faq summary").filter({ hasText: "How do I get a quote?" }).click();
  await expect(page.locator("#faq details[open]")).toContainText("one final price, tax included");
  await page.locator("#services").getByRole("link", { name: "Sofas" }).click();
  await expect(page).toHaveURL(/\/services\/sofa-cleaning\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/location/oakville/");
  await page.locator("#quote-cta").getByRole("link", { name: "Get a Quote" }).click();
  await expect(page).toHaveURL(/\/quote\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
