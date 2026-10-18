import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const projects: { _id: string; publicationStatus: string; services: string[]; locations: string[] }[] = JSON.parse(readFileSync("src/content/generated/projects.json", "utf8"));
const reviews: { name: string; publicationStatus: string; services: string[]; locations: string[] }[] = JSON.parse(readFileSync("src/content/generated/testimonials.json", "utf8"));

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("Our Work filters published projects and handles an empty combination", async ({ page }) => {
  await page.goto("/our-work/");
  const cards = page.locator("[data-project-id]");
  await expect(cards).toHaveCount(projects.filter((project) => project.publicationStatus === "approved").length);
  await page.getByLabel("Area", { exact: true }).selectOption("oakville");
  const oakville = projects.filter((project) => project.publicationStatus === "approved" && project.locations.includes("oakville"));
  await expect(cards).toHaveCount(oakville.length);
  expect(await cards.evaluateAll((items) => items.map((item) => item.getAttribute("data-project-id")))).toEqual(oakville.map((project) => project._id));
  await page.getByLabel("Service", { exact: true }).selectOption("mattress-cleaning");
  await expect(page.getByRole("heading", { name: "No photos for this selection yet." })).toBeVisible();
  await page.getByRole("button", { name: "Show all results" }).click();
  await expect(cards).toHaveCount(projects.length);
  const slider = page.getByRole("slider").first();
  await slider.focus();
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://softnestcare.ca/our-work/");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const collection = schemas.map((value) => JSON.parse(value)).find((item) => item["@type"] === "CollectionPage");
  expect(collection.mainEntity.itemListElement).toHaveLength(projects.length);
});

test("city service evidence matches both city and service, with no unrelated fallback", async ({ page }) => {
  for (const [city, service] of [["oakville", "sectional-furniture-cleaning"], ["etobicoke", "carpet-area-rug-cleaning"], ["milton", "sofa-cleaning"], ["vaughan", "mattress-cleaning"]]) {
    await page.goto(`/location/${city}/${service}/`);
    const matches = projects.filter((item) => item.publicationStatus === "approved" && item.locations.includes(city) && item.services.includes(service));
    const matchingReviews = reviews.filter((item) => item.publicationStatus === "approved" && item.locations.includes(city) && item.services.includes(service));
    const section = page.locator(`[data-local-evidence="${city}"]`);
    await expect(section).toHaveCount(matches.length || matchingReviews.length ? 1 : 0);
    if (matches.length) await expect(section.locator("[data-project-id]")).toHaveAttribute("data-project-id", matches[0]._id);
    if (matchingReviews.length) await expect(section.locator("[data-review-author]")).toHaveAttribute("data-review-author", matchingReviews[0].name);
  }
});

test("Card uses working quote, gallery, review and phone links on a white page", async ({ page }) => {
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/card/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Upholstery & carpet cleaning.");
    expect(await page.locator("main").evaluate((element) => getComputedStyle(element).backgroundColor)).toBe("rgb(255, 255, 255)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole("link", { name: /Get a free quote/ })).toHaveAttribute("href", "/quote/");
    await expect(page.getByRole("link", { name: /See our work/ })).toHaveAttribute("href", "/our-work/");
    await expect(page.getByRole("link", { name: /Google reviews Read/ })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.getByRole("link", { name: "text us", exact: true })).toHaveAttribute("href", /^sms:\+?\d+$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*follow/);
  }
  await page.getByRole("link", { name: /See our work/ }).click();
  await expect(page).toHaveURL(/\/our-work\/$/);
});

test("Our Work is reachable from desktop and mobile navigation without overflow", async ({ page }) => {
  for (const width of [390, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services/");
    if (width < 980) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Our Work", exact: true }).click();
    } else await page.locator(".desktop-nav").getByRole("link", { name: "Our Work", exact: true }).click();
    await expect(page).toHaveURL(/\/our-work\/$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width >= 980) {
      const fits = await page.locator(".site-header").evaluate((header) => {
        const brand = header.querySelector(".brand")!.getBoundingClientRect();
        const nav = header.querySelector(".desktop-nav")!.getBoundingClientRect();
        return brand.right <= nav.left;
      });
      expect(fits).toBe(true);
    }
  }
});
