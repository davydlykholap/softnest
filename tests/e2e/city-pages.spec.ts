import { expect, test } from "@playwright/test";

const cities = ["Mississauga", "Toronto", "Brampton", "Oakville", "Etobicoke", "Burlington", "Vaughan", "Milton", "Hamilton"];

for (const city of cities) {
  const slug = city.toLowerCase();
  test(`${city} FAQs display answers matching their structured data`, async ({ page }) => {
    await page.goto(`/location/${slug}/`);

    await expect(page).toHaveTitle(`Upholstery & Carpet Cleaning ${city} | Sofa & Rug | SoftNest`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /one final price with tax included/);
    await expect(page.locator(".location-page-care-band, .location-page-services, .location-page-process")).toHaveCount(0);
    await expect(page.locator("#services h2")).toHaveText(["Sofas↗", "Carpets↗", "Area rugs↗", "And more"]);

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = scripts.map((script) => JSON.parse(script)).find((schema) => schema["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(["Mississauga", "Oakville", "Milton"].includes(city) ? 6 : 7);

    for (const entry of faq.mainEntity) {
      await page.locator("#faq").getByRole("button", { name: entry.name, exact: true }).click();
      await expect(page.locator("#home-faq-answer p").first()).toHaveText(entry.acceptedAnswer.text);
      await expect(page.locator("#home-faq-answer")).toBeVisible();
    }

    const isMississauga = city === "Mississauga";
    await expect(page.locator("#location-reviews-heading")).toHaveText(isMississauga ? "What Mississauga customers say" : "What our customers say");
    const authors = await page.locator("#reviews .google-review-card__author:visible").allTextContents();
    expect(authors.map((name) => name.trim()).sort()).toEqual(
      (isMississauga ? ["Davyd", "Andrii Франчук", "Volo L"] : ["Karen Jan", "Kathleen Costello", "Utsav Kohli"]).sort(),
    );
  });

  test(`mobile ${city} FAQs, service and quote links work`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/location/${slug}/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator("#faq summary").filter({ hasText: "How do I get a quote?" }).click();
    await expect(page.locator("#faq details[open]")).toContainText("one final price, tax included");
    await page.locator("#services").getByRole("link", { name: "Sofas" }).click();
    await expect(page).toHaveURL(/\/services\/sofa-cleaning\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto(`/location/${slug}/`);
    await page.locator("#quote-cta").getByRole("link", { name: "Get a Quote" }).click();
    await expect(page).toHaveURL(/\/quote\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

}
