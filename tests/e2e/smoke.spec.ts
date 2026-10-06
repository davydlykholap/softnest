import { expect, test, type Page } from "@playwright/test";

async function chooseQuoteOption(page: Page, label: string, option: string) {
  const control = page.getByRole("combobox", { name: label });
  await control.click();
  await page.getByRole("option", { name: option, exact: true }).click();
  return control;
}

test("homepage and desktop navigation work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A Cleaner Home");

  const desktopNav = page.locator(".desktop-nav");
  await desktopNav.getByRole("link", { name: "Locations" }).click();
  await expect(page).toHaveURL(/\/location\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Professional Care");
});

test("service search reaches a service page", async ({ page }) => {
  await page.goto("/services/");
  const search = page.getByRole("combobox", { name: "What needs cleaning?" });
  await search.fill("Sofa");
  await page.getByRole("option", { name: /Sofa & Couch Cleaning/i }).click();
  await page.getByRole("button", { name: "View service" }).click();
  await expect(page).toHaveURL(/\/services\/sofa-cleaning\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("location search reaches a city page", async ({ page }) => {
  await page.goto("/location/");
  const search = page.getByRole("combobox");
  await search.fill("Mississauga");
  await page.getByRole("option", { name: /Mississauga/i }).click();
  await page.getByRole("button", { name: "Check service area" }).click();
  await expect(page).toHaveURL(/\/location\/mississauga\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Carpet Cleaning");
});

test("quote form shows useful validation", async ({ page }) => {
  await page.goto("/quote/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("refresh your space");
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Customer");
  await page.getByRole("textbox", { name: "Phone number" }).fill("4165550123");
  await page.getByRole("textbox", { name: "Anything else we should know?" }).fill("None");
  await page.getByRole("button", { name: "Get my quote" }).click();
  await expect(page.locator("#quote-page-error")).toHaveText("Please select at least one item.");
});

test("mobile navigation opens and exposes services", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Open services menu" }).click();
  await expect(page.getByRole("link", { name: "View all services" })).toBeVisible();
});

test("quote form supports multiple sofas with separate seat counts", async ({ page }) => {
  await page.goto("/quote/");
  await page.getByRole("button", { name: "Sofa or couch" }).click();

  const firstSofa = await chooseQuoteOption(page, "How many seats? for sofa 1", "2");
  await firstSofa.click();
  await expect(page.getByRole("option", { name: "2", exact: true })).toBeVisible();
  await expect(page.getByRole("option", { name: "3", exact: true })).toBeVisible();
  await expect(page.getByRole("option", { name: "4+", exact: true })).toBeVisible();
  await expect(page.locator(".quote-select-option.is-active")).toHaveCount(0);
  await firstSofa.click();
  await page.getByRole("button", { name: "+ Add another sofa" }).click();

  const secondSofa = await chooseQuoteOption(page, "How many seats? for sofa 2", "3");
  await expect(firstSofa).toContainText("2");
  await expect(secondSofa).toContainText("3");
  await expect(page.getByRole("button", { name: "Remove sofa 2" })).toBeVisible();
});

test("carpet quote reveals inputs for the selected surface type", async ({ page }) => {
  await page.goto("/quote/");
  await page.getByRole("button", { name: "Carpet or rug" }).click();

  const type = await chooseQuoteOption(page, "What type? for carpet / rug 1", "Area rug");
  await expect(page.getByRole("textbox", { name: "Length (ft) for carpet / rug 1" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Width (ft) for carpet / rug 1" })).toBeVisible();

  await type.click();
  await page.getByRole("option", { name: "Stairs / landing", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Number of stairs for carpet / rug 1" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Landings for carpet / rug 1" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Length (ft) for carpet / rug 1" })).toHaveCount(0);
});
