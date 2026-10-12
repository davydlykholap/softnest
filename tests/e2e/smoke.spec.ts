import { expect, test, type Page } from "@playwright/test";

async function chooseQuoteOption(page: Page, label: string, option: string) {
  const control = page.getByRole("combobox", { name: label });
  await control.click();
  await page.getByRole("option", { name: option, exact: true }).click();
  return control;
}

test("hero descriptions use the same responsive typography across page types", async ({ page }) => {
  for (const [width, expectedSize] of [[400, "17px"], [1280, "19px"]] as const) {
    await page.setViewportSize({ width, height: 827 });

    for (const [path, selector] of [
      ["/", ".hero__description"],
      ["/location/mississauga/", ".location-page-hero__description"],
      ["/location/toronto/", ".location-page-hero__description"],
      ["/services/", ".locations-hero__description"],
      ["/services/sofa-cleaning/", '[class*="heroCopy"] > p:last-child'],
    ] as const) {
      await page.goto(path);
      const description = page.locator(selector).first();
      await expect(description).toBeVisible();
      const typography = await description.evaluate((element) => {
        const computed = getComputedStyle(element);
        return { size: computed.fontSize, lineHeight: computed.lineHeight, family: computed.fontFamily };
      });
      expect(typography.size, path).toBe(expectedSize);
      expect(parseFloat(typography.lineHeight)).toBeCloseTo(parseFloat(expectedSize) * 1.55, 0);
      expect(typography.family, path).toContain("Avenir Next");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test("homepage and desktop navigation work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A Cleaner Home");

  const desktopNav = page.locator(".desktop-nav");
  await desktopNav.getByRole("link", { name: "Locations" }).click();
  await expect(page).toHaveURL(/\/location\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Professional Care");
});

test("home and city pages share the same customer reviews section", async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 827 });

  for (const path of ["/", "/location/mississauga/"]) {
    await page.goto(path);
    const section = page.locator("#reviews.customer-reviews");
    await expect(section).toBeVisible();
    await expect(section.locator(".customer-reviews__heading h2")).toHaveText(
      path === "/" ? "What our customers say" : "What Mississauga customers say",
    );
    await expect(section.locator(".customer-reviews__heading > p")).toContainText("after professional upholstery");
    await expect(section.getByRole("link", { name: "Read all reviews" })).toBeVisible();
    await expect(section.locator(".google-review-card:visible").first()).toBeVisible();
    const hasNoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(hasNoOverflow).toBe(true);
  }
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
  const cityHeading = page.getByRole("heading", { level: 1 });
  await expect(cityHeading).toContainText(/carpet cleaning/i);
  await expect(cityHeading).toContainText("Mississauga");
});

test("quote form shows useful validation", async ({ page }) => {
  await page.goto("/quote/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("refresh your space");
  await page.getByRole("textbox", { name: "Your name" }).fill("Test Customer");
  await page.getByRole("textbox", { name: "Phone number" }).fill("4165550123");
  await page.getByRole("textbox", { name: "Service city or postal code" }).fill("Toronto");
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

test("mobile header quote fits, navigates, and retains narrow-screen access", async ({ page }) => {
  for (const width of [360, 375, 400]) {
    await page.setViewportSize({ width, height: 827 });
    await page.goto("/");

    const quote = page.locator(".mobile-header-quote");
    await expect(quote).toBeVisible();
    await expect(quote).toHaveText("Get a Quote");
    await expect(quote).toHaveAttribute("href", "/quote/");

    const spacing = await page.evaluate(() => {
      const brand = document.querySelector(".site-header .brand")!.getBoundingClientRect();
      const quote = document.querySelector(".mobile-header-quote")!.getBoundingClientRect();
      const menu = document.querySelector(".menu-toggle")!.getBoundingClientRect();
      return {
        fits: brand.right < quote.left && quote.right < menu.left,
        hasOverflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(spacing.fits).toBe(true);
    expect(spacing.hasOverflow).toBe(false);
  }

  await page.locator(".mobile-header-quote").click();
  await expect(page).toHaveURL(/\/quote\/$/);

  await page.setViewportSize({ width: 320, height: 827 });
  await page.goto("/");
  await expect(page.locator(".mobile-header-quote")).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator(".mobile-nav__quote")).toBeVisible();
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

test("quote category controls wait for hydration before accepting a click", async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => { releaseScripts = resolve; });
  await page.route(/\/_next\/static\/.*\.js(?:\?.*)?$/, async (route) => {
    await scriptsReady;
    await route.continue();
  });
  await page.goto("/quote/", { waitUntil: "domcontentloaded" });
  const sofa = page.getByRole("button", { name: "Sofa or couch" });
  await expect(sofa).toBeDisabled();
  releaseScripts();
  await expect(sofa).toBeEnabled();
  await sofa.click();
  await expect(sofa).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("combobox", { name: "How many seats? for sofa 1" })).toBeVisible();
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
