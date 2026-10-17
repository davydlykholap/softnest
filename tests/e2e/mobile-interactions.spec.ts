import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("touch scrolling and tapping cards do not leave hover highlights behind", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
  await page.goto("http://127.0.0.1:4173/");
  const card = page.locator(".home-service-card").first();
  await card.scrollIntoViewIfNeeded();
  const arrow = card.locator(".locations-city-card__arrow");
  const appearance = () => card.evaluate((element) => {
    const style = getComputedStyle(element);
    return { transform: style.transform, shadow: style.boxShadow };
  });
  const initial = await appearance();
  await card.evaluate((element) => element.addEventListener("click", (event) => event.preventDefault()));
  await card.tap();
  await page.evaluate(() => scrollBy(0, 200));
  await card.scrollIntoViewIfNeeded();
  await expect(arrow).toHaveCSS("background-color", "rgb(255, 255, 255)");
  expect(await appearance()).toEqual(initial);
  expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(true);
  await context.close();
});

test("city mobile heroes share the homepage geometry, typography and action layout", async ({ page }) => {
  for (const width of [360, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const reference = await page.locator(".hero").evaluate((element) => {
      const title = element.querySelector("h1")!;
      const style = getComputedStyle(title);
      return { top: title.getBoundingClientRect().top, family: style.fontFamily, size: style.fontSize, leading: style.lineHeight };
    });
    for (const city of ["mississauga", "toronto", "oakville"]) {
      await page.goto(`/location/${city}/`);
      const hero = page.locator(".location-page-hero");
      const actual = await hero.evaluate((element) => {
        const title = element.querySelector("h1")!;
        const style = getComputedStyle(title);
        return { top: title.getBoundingClientRect().top, family: style.fontFamily, size: style.fontSize, leading: style.lineHeight };
      });
      expect(actual).toEqual(reference);
      await expect(hero).toHaveCSS("border-radius", "0px");
      const heroBox = (await hero.boundingBox())!;
      expect(heroBox.width).toBe(width);
      expect(heroBox.height).toBeGreaterThanOrEqual(844);
      const buttons = hero.locator(".hero__actions .button");
      const first = (await buttons.nth(0).boundingBox())!;
      const second = (await buttons.nth(1).boundingBox())!;
      expect(first.y).toBe(second.y);
      expect(first.height).toBe(50);
      expect(second.height).toBe(50);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test("green directory controls match the final quote CTA height", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ["/location/", "/services/"]) {
      await page.goto(path);
      const quote = page.locator(".site-final-cta .quote-cta");
      const height = (await quote.boundingBox())!.height;
      for (const control of await page.locator(".green-button").all()) {
        expect((await control.boundingBox())!.height).toBe(height);
      }
    }
  }
});
