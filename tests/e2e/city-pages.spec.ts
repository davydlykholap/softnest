import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const testimonials: { name: string; publicationStatus: string; locations: string[] }[] = JSON.parse(
  readFileSync("src/content/generated/testimonials.json", "utf8"),
);
const home: { heroReviews: { name: string }[] } = JSON.parse(readFileSync("src/content/generated/home.json", "utf8"));
const reviewAuthors = new Set([...testimonials.map((review) => review.name), ...home.heroReviews.map((review) => review.name)]);

const cities = ["Mississauga", "Toronto", "Brampton", "Oakville", "Etobicoke", "Burlington", "Vaughan", "Milton", "Hamilton"];

test("city heroes load portrait images on mobile and keep desktop images intact", async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 827 });

  for (const city of ["mississauga", "toronto", "oakville"]) {
    await page.goto(`/location/${city}/`);
    const expectedMobileImage = city === "mississauga"
      ? "/images/mississauga-cleaning-hero-mobile.webp"
      : "/images/softnest-hero-room-mobile.webp";

    await expect(page.locator(".location-page-hero__picture source")).toHaveAttribute("srcset", expectedMobileImage);
    const image = page.locator(".location-page-hero__picture img");
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => new URL(element.currentSrc).pathname)).toBe(expectedMobileImage);
    const isPortrait = await image.evaluate((element: HTMLImageElement) => element.naturalHeight > element.naturalWidth);
    expect(isPortrait).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }

  await page.setViewportSize({ width: 1280, height: 827 });
  await page.goto("/location/mississauga/");
  const desktopImage = page.locator(".location-page-hero__picture img");
  await expect.poll(() => desktopImage.evaluate((element: HTMLImageElement) => new URL(element.currentSrc).pathname))
    .toBe("/images/mississauga-cleaning-hero-v2.webp");
});

for (const city of cities) {
  const slug = city.toLowerCase();
  test(`${city} FAQs display answers matching their structured data`, async ({ page }) => {
    await page.goto(`/location/${slug}/`);

    await expect(page).toHaveTitle(`Upholstery & Carpet Cleaning ${city} | Sofa & Rug | SoftNest`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", new RegExp(city));
    await expect(page.locator(".location-page-care-band, .location-page-services, .location-page-process")).toHaveCount(0);
    await expect(page.locator("#services h2")).toHaveText(["Sofas", "Carpets", "Area rugs", "And more"]);
    await expect(page.locator('#services article a[href^="/location/"]')).toHaveCount(3);
    const quoteLinks = await page.locator('a[href^="/quote/"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(quoteLinks.length).toBeGreaterThan(3);
    expect(quoteLinks.every((href) => href === `/quote/?city=${slug}`)).toBe(true);
    await expect(page.locator("#services article h2 span")).toHaveCount(0);

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = scripts.map((script) => JSON.parse(script)).find((schema) => schema["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(["Mississauga", "Oakville", "Milton"].includes(city) ? 6 : 7);

    for (const entry of faq.mainEntity) {
      await page.locator("#faq").getByRole("button", { name: entry.name, exact: true }).click();
      await expect(page.locator("#home-faq-answer p").first()).toHaveText(entry.acceptedAnswer.text);
      await expect(page.locator("#home-faq-answer")).toBeVisible();
    }

    await expect(page.locator("#location-reviews-heading")).toHaveText("What our customers say");
    await expect(page.locator("#reviews")).toContainText("across our service area");
    await expect(page.locator("#reviews .google-review-card__author:visible")).toHaveCount(3);
    const authors = (await page.locator("#reviews .google-review-card__author:visible").allTextContents()).map((name) => name.trim());
    expect(new Set(authors).size).toBe(3);
    expect(authors.every((name) => reviewAuthors.has(name))).toBe(true);
  });

  test(`mobile ${city} FAQs, static services and quote links work`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/location/${slug}/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator("#faq summary").filter({ hasText: "How do I get a quote?" }).click();
    await expect(page.locator("#faq details[open]")).toContainText("one final price, tax included");
    await expect(page.locator("#services article").first().getByRole("heading", { name: "Sofas" })).toBeVisible();
    await expect(page.locator('#services article a[href^="/location/"]')).toHaveCount(3);

    await page.locator("#quote-cta").getByRole("link", { name: "Get a Quote" }).click();
    await expect(page).toHaveURL(new RegExp(`/quote/\\?city=${slug}$`));
    await expect(page.getByRole("textbox", { name: "Service city or postal code" })).toHaveValue(city);
    await expect(page.locator('input[name="source_city"]')).toHaveValue(slug);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

}
