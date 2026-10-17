import { expect, test, type Page } from "@playwright/test";

async function fillSofaQuote(page: Page) {
  await page.getByRole("textbox", { name: "Your name" }).fill("SEO Test Customer");
  await page.getByRole("textbox", { name: "Phone number" }).fill("4165550123");
  await page.getByRole("textbox", { name: "Service city or postal code" }).fill("Oakville");
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

test("photo quote is an independent option and its click is not counted as a lead", async ({ page }) => {
  await page.goto("/quote/?city=etobicoke");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  const photoChoice = page.getByRole("complementary", { name: "Prefer a photo quote?" });
  await expect(photoChoice).toContainText("No form is needed for this option");
  const instagram = photoChoice.getByRole("link", { name: "Instagram", exact: true });
  await instagram.evaluate((link) => link.addEventListener("click", (event) => event.preventDefault()));
  await instagram.click();
  const events = await page.evaluate(() => window.dataLayer);
  expect(events).toContainEqual(["event", "photo_quote_click", { channel: "instagram", source_city: "etobicoke" }]);
  expect(JSON.stringify(events)).not.toContain("generate_lead");
  await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("");
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
  await page.locator(".location-page-hero .hero-action-buttons").getByRole("link", { name: /Get a free/ }).click();
  await expect(page.getByRole("textbox", { name: "Service city or postal code" })).toHaveValue("Milton");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  await fillSofaQuote(page);
  await page.getByRole("button", { name: "Get my quote" }).click();
  await expect(page).toHaveURL(/\/quote\/thank-you\/$/);
  expect(submissions).toBe(1);
  expect(payload).toContain('name="source_city"\r\n\r\nmilton');
  expect(payload).toContain('name="service_location"\r\n\r\nOakville');
  const events = await page.evaluate(() => window.dataLayer);
  const leadEvents = (events ?? []).filter((entry) => (entry as Record<number, unknown>)[1] === "generate_lead");
  expect(leadEvents).toHaveLength(1);
  expect(leadEvents[0]).toEqual(["event", "generate_lead", { event_category: "lead", event_label: "quote_form", source_city: "milton" }]);
  expect(JSON.stringify(events)).not.toContain("SEO Test Customer");
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
