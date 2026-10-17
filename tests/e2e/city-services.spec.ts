import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { cityServiceCoverage, cityServiceProfiles } from "../../src/content/cityServiceConfig";

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("every approved city-service URL is exported, self-canonical and discoverable", async ({ request, page }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths: string[] = [];
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const [city, coverage] of Object.entries(cityServiceCoverage)) {
    for (const service of Object.keys(cityServiceProfiles)) {
      if (coverage !== "all" && !coverage.includes(service)) continue;
      const path = `/location/${city}/${service}/`;
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(sitemap, path).toContain(`https://softnestcare.ca${path}`);
      const result = await page.evaluate(({ html }) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const main = doc.querySelector("main")!;
        return { title: doc.title, description: doc.querySelector('meta[name="description"]')?.getAttribute("content"),
          canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
          h1Count: doc.querySelectorAll("h1").length, robots: doc.querySelector('meta[name="robots"]')?.getAttribute("content"),
          words: (main.textContent ?? "").trim().split(/\s+/).length,
          schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent ?? "{}")),
        };
      }, { html });
      expect(result.h1Count, path).toBe(1);
      expect(result.canonical, path).toBe(`https://softnestcare.ca${path}`);
      expect(result.robots).not.toContain("noindex");
      expect(result.description).toBeTruthy();
      expect(titles.has(result.title), path).toBe(false);
      expect(descriptions.has(result.description!), path).toBe(false);
      titles.add(result.title); descriptions.add(result.description!);
      // Guard against accidental content expansion rather than an SEO word minimum.
      expect(result.words, path).toBeLessThan(600);
      const schema = result.schemas.find((item) => item["@type"] === "Service");
      expect(schema?.url).toBe(`https://softnestcare.ca${path}`);
      expect(schema?.provider["@id"]).toBe("https://softnestcare.ca/#organization");
      expect(schema?.areaServed["@type"]).toBe("City");
      paths.push(path);
    }
  }
  expect(paths).toHaveLength(90);
  expect((await request.get("/location/oakville/nonexistent-cleaning/")).status()).toBe(404);
  expect((await request.get("/location/nonexistent-city/sofa-cleaning/")).status()).toBe(404);
});

test("city and service hubs expose all local pages", async ({ page }) => {
  await page.goto("/location/oakville/");
  const directory = page.getByRole("navigation", { name: "Cleaning services in Oakville", exact: true });
  await expect(directory.getByRole("link")).toHaveCount(10);
  await directory.getByRole("link", { name: "Sofa & Couch Cleaning", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Sofa & Couch Cleaning in Oakville");
  await page.locator("footer.site-footer").getByRole("link", { name: "Sofa & Couch Cleaning", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Sofa & Couch Cleaning by city", exact: true }).getByRole("link")).toHaveCount(9);
});

test("local quote carries city, service and editable sofa selection into a submitted lead", async ({ page }) => {
  let payload = "";
  await page.route("https://api.web3forms.com/submit", async (route) => {
    payload = route.request().postData() ?? "";
    await route.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto("/location/oakville/sofa-cleaning/");
  await page.evaluate(() => { window.gtag = (...args) => { (window.dataLayer ??= []).push(args); }; });
  await page.locator("main section").first().getByRole("link", { name: "Get a Quote", exact: true }).click();
  await expect(page).toHaveURL(/\/quote\/\?city=oakville&service=sofa-cleaning$/);
  await expect(page.getByRole("textbox", { name: "Service city or postal code" })).toHaveValue("Oakville");
  expect(await page.evaluate(() => window.dataLayer)).toContainEqual(["event", "quote_click", { source_city: "oakville" }]);
  await expect(page.getByRole("button", { name: "Sofa or couch", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("textbox", { name: "Your name" }).fill("Local Page Test");
  await page.getByRole("textbox", { name: "Phone number" }).fill("4165550123");
  await page.getByRole("textbox", { name: "Service city or postal code" }).fill("Milton");
  for (const [name, value] of [["How many seats? for sofa 1", "3"], ["Sofa type for sofa 1", "Standard"]]) {
    await page.getByRole("combobox", { name }).click();
    await page.getByRole("option", { name: value, exact: true }).click();
  }
  await page.getByRole("textbox", { name: "Anything else we should know?" }).fill("None");
  await page.getByRole("button", { name: "Get my quote", exact: true }).click();
  await expect(page).toHaveURL(/\/quote\/thank-you\/$/);
  expect(payload).toContain('name="landing_page"\r\n\r\n/location/oakville/sofa-cleaning/');
  expect(payload).toContain('name="requested_service"\r\n\r\nsofa-cleaning');
  expect(payload).toContain('name="service_location"\r\n\r\nMilton');
});

test("stairs prefill selects the correct carpet subtype; general treatments let users choose the item", async ({ page }) => {
  await page.goto("/quote/?city=brampton&service=stairs-hallways-cleaning");
  await expect(page.getByRole("button", { name: "Carpet or rug", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("combobox", { name: "What type? for carpet / rug 1" })).toContainText("Stairs / landing");
  await page.goto("/quote/?city=milton&service=pet-stain-odour-removal");
  await expect(page.locator(".quote-page-service-context")).toContainText("Pet Stain & Odour Treatment");
  await expect(page.locator('button[aria-pressed="true"]')).toHaveCount(0);
  await page.goto("/quote/?city=oakville&service=constructor");
  await expect(page.locator(".quote-page-service-context")).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeEnabled();
});

for (const width of [390, 1280]) {
  test(`local service page works at ${width}px with clear actions and accessible FAQs`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const buttonStyle = () => page.locator("main .hero-action-buttons .quote-cta").first().evaluate((button) => {
      const style = getComputedStyle(button);
      return { background: style.backgroundImage, radius: style.borderRadius, color: style.color,
        height: style.minHeight, padding: style.paddingInline, font: style.fontFamily,
        size: style.fontSize, weight: style.fontWeight, casing: style.textTransform };
    });
    await page.goto("/location/oakville/");
    const referenceStyle = await buttonStyle();
    await page.goto("/location/brampton/carpet-area-rug-cleaning/");
    await expect(page).toHaveTitle("Carpet & Area Rug Cleaning Brampton | SoftNest");
    await expect(page.locator("h1")).toContainText("Brampton");
    expect(await buttonStyle()).toEqual(referenceStyle);
    await expect(page.getByRole("navigation", { name: "Breadcrumb", exact: true })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "More cleaning options in Brampton", exact: true })).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("A few things to know");
    await expect(page.locator("main")).not.toContainText("SoftNest Fabric Care ·");
    await expect(page.locator("main section").first().getByRole("link", { name: "Get a Quote", exact: true })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 390) await expect(page.getByLabel("Request your cleaning quote").getByRole("link")).toBeInViewport();
    await expect(page.getByText("How pricing works.", { exact: true })).toBeVisible();
    await page.getByText("What should I send for a quote?", { exact: true }).click();
    await expect(page.locator("details[open]")).toContainText("List carpeted rooms, stairs and rug dimensions");
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
    expect(errors).toEqual([]);
  });
}
