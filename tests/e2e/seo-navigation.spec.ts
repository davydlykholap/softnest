import { expect, test, type Page } from "@playwright/test";

async function fillSofaQuote(page: Page) {
  await page.getByRole("textbox", { name: "Your name" }).fill("SEO Test Customer");
  await page.getByRole("textbox", { name: "Phone number" }).fill("4165550123");
  await page.getByRole("textbox", { name: "Service city", exact: true }).fill("Oakville");
  await page.getByRole("button", { name: "Sofa or couch" }).click();
  await page.getByRole("combobox", { name: "How many seats? for sofa 1" }).click();
  await page.getByRole("option", { name: "3", exact: true }).click();
  await page.getByRole("combobox", { name: "Sofa type for sofa 1" }).click();
  await page.getByRole("option", { name: "Standard", exact: true }).click();
  await page.getByRole("textbox", { name: "Anything else we should know?" }).fill("None");
}

test.beforeEach(async ({ page }) => {
  // Keep synthetic leads and analytics entirely inside the test browser.
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("homepage title and memorable heading stay intact", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("SoftNest Fabric Care");
  await expect(page.locator("h1")).toHaveText("A Cleaner Home Feels Better.", { useInnerText: true });
  await expect(page.locator(".hero__description")).not.toContainText("Hamilton");
});

test("GA4 configures once on the production host and excludes local previews", async ({ page, request, baseURL }) => {
  const analyticsConfigs = () => page.evaluate(() => (window.dataLayer ?? []).map((entry) => {
    const values = entry as Record<number, unknown>;
    return [values[0], values[1]];
  }).filter((entry) => entry[0] === "config" && typeof entry[1] === "string" && entry[1].startsWith("G-")));

  await page.goto("/");
  await expect(page.locator("#softnest-google-tag")).toBeAttached();
  expect(await analyticsConfigs()).toHaveLength(0);

  // Serve the built site under its production origin without contacting production.
  await page.route("https://softnestcare.ca/**", async (route) => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await request.get(`${baseURL}${url.pathname}${url.search}`) });
  });
  await page.goto("https://softnestcare.ca/");
  await expect.poll(analyticsConfigs).toEqual([["config", "G-CM48WEXDDQ"]]);
});

test("city service links lead to relevant services with a route back to priority cities", async ({ page }) => {
  await page.goto("/location/oakville/");
  await page.locator("#services article").first().getByRole("link").click();
  await expect(page).toHaveURL(/\/location\/oakville\/sofa-cleaning\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sofa & Couch Cleaning in Oakville");
  await page.locator("footer.site-footer").getByRole("link", { name: "Sofa & Couch Cleaning", exact: true }).click();
  const coverage = page.locator("section", { has: page.locator("#service-areas-heading") });
  await expect(coverage.getByRole("link", { name: "Milton", exact: true })).toBeVisible();
  await coverage.getByRole("link", { name: "Etobicoke", exact: true }).click();
  await expect(page).toHaveURL(/\/location\/etobicoke\/sofa-cleaning\/$/);
  await expect(page.locator("h1")).toContainText("Etobicoke");
});

test("every service offers relevant services and an accurate coverage directory", async ({ page }) => {
  const slugs = ["upholstery-cleaning", "sofa-cleaning", "leather-upholstery-cleaning", "sectional-furniture-cleaning", "carpet-area-rug-cleaning", "mattress-cleaning", "dining-chair-cleaning", "armchair-cleaning", "stairs-hallways-cleaning", "pet-stain-odour-removal"];
  for (const slug of slugs) {
    await page.goto(`/services/${slug}/`);
    await expect(page.getByRole("navigation", { name: "Related cleaning services" }).getByRole("link")).toHaveCount(3);
    const coverage = page.locator("section", { has: page.locator("#service-areas-heading") });
    await expect(coverage.getByRole("link", { name: "View all service areas" })).toHaveAttribute("href", "/location/");
  }
});

test("quote page preselects the item without a contact block or service notice", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/quote/?city=etobicoke&service=sofa-cleaning");
    await expect(page.locator(".quote-page-photo-choice, .quote-page-service-context")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("Choose how to get in touch");
    await expect(page.locator("main")).not.toContainText("Your request:");
    await expect(page.getByRole("button", { name: "Sofa or couch", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("textbox", { name: "Service city", exact: true })).toHaveValue("Etobicoke");
    await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("");
  }
});

test("successful quote retains its origin separately from an edited city and counts one lead", async ({ page }) => {
  let submissions = 0;
  let payload = "";
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions++;
    payload = route.request().postData() ?? "";
    await route.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto("/location/milton/");
  await page.locator(".location-page-hero .hero-action-buttons").getByRole("link", { name: /Get a Quote/ }).click();
  await expect(page.getByRole("textbox", { name: "Service city", exact: true })).toHaveValue("Milton");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  await fillSofaQuote(page);
  await page.getByRole("textbox", { name: "Postal code (optional)", exact: true }).fill("l6h 1a1");
  await page.getByRole("button", { name: "Get my quote" }).click();
  await expect(page).toHaveURL(/\/quote\/thank-you\/$/);
  expect(submissions).toBe(1);
  expect(payload).toContain('name="source_city"\r\n\r\nmilton');
  expect(payload).toContain('name="service_location"\r\n\r\nOakville');
  expect(payload).toContain('name="postal_code"\r\n\r\nL6H 1A1');
  const events = await page.evaluate(() => window.dataLayer);
  const leadEvents = (events ?? []).filter((entry) => (entry as Record<number, unknown>)[1] === "generate_lead");
  expect(leadEvents).toHaveLength(1);
  expect(leadEvents[0]).toEqual(["event", "generate_lead", { event_category: "lead", event_label: "quote_form", source_city: "milton" }]);
  expect(JSON.stringify(events)).not.toContain("SEO Test Customer");
  expect(JSON.stringify(events)).not.toMatch(/l6h 1a1/i);
});

test("individual city and optional postal fields fit both layouts and business keeps its location field", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/quote/?city=oakville&service=sofa-cleaning");
    const city = page.getByRole("textbox", { name: "Service city", exact: true });
    const postal = page.getByRole("textbox", { name: "Postal code (optional)", exact: true });
    await expect(city).toHaveValue("Oakville");
    await expect(city).toHaveAttribute("placeholder", "City");
    await expect(postal).toHaveValue("");
    expect(await postal.evaluate((input: HTMLInputElement) => input.required)).toBe(false);
    const cityBox = (await city.boundingBox())!;
    const postalBox = (await postal.boundingBox())!;
    if (width > 820) {
      expect(Math.abs(cityBox.y - postalBox.y)).toBeLessThan(1);
      expect(postalBox.x).toBeGreaterThan(cityBox.x + cityBox.width);
    } else {
      expect(postalBox.y).toBeGreaterThan(cityBox.y + cityBox.height);
    }
    await postal.fill("L6H 1A1");
    await page.getByRole("radio", { name: "Business", exact: true }).check();
    await expect(postal).toHaveCount(0);
    await expect(page.getByRole("textbox", { name: "Service city or postal code", exact: true })).toHaveValue("Oakville");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("shared quote buttons have centered text and no arrow on desktop and mobile", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/services/", "/location/", "/services/sofa-cleaning/", "/location/oakville/", "/location/etobicoke/sofa-cleaning/", "/quote/"]) {
      await page.goto(path);
      const buttons = page.locator(".quote-cta:visible");
      expect(await buttons.count(), path).toBeGreaterThan(0);
      for (const button of await buttons.all()) {
        await expect(button, path).not.toContainText("→");
        await expect(button.locator("svg"), path).toHaveCount(0);
        const offset = await button.evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const text = range.getBoundingClientRect();
          const box = element.getBoundingClientRect();
          return Math.abs((text.left + text.right) / 2 - (box.left + box.right) / 2);
        });
        expect(offset, `${width}px ${path}`).toBeLessThan(2);
      }
    }
  }
});

test("failed delivery preserves the form and a tracking failure cannot block a successful retry", async ({ page }) => {
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions++;
    await route.fulfill({ status: submissions === 1 ? 500 : 200, json: { success: submissions > 1 } });
  });
  await page.goto("/quote/?city=oakville");
  await fillSofaQuote(page);
  await page.getByRole("button", { name: "Get my quote" }).click();
  await expect(page.locator("#quote-page-error")).toContainText("We couldn’t send the form");
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("SEO Test Customer");
  await page.evaluate(() => { window.gtag = () => { throw new Error("Synthetic tracking failure"); }; });
  await page.getByRole("button", { name: "Get my quote" }).click();
  await expect(page).toHaveURL(/\/quote\/thank-you\/$/);
  expect(submissions).toBe(2);
});
