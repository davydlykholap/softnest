import { expect, test } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Project = { slug: string; title: string; media?: {type:string}[]; _id: string; publicationStatus: string; sourceType: string; image: string; imageNote?: string; variant: string; services: string[]; locations: string[] };
const projects: Project[] = JSON.parse(readFileSync("src/content/generated/projects.json", "utf8"));
const locations: { slug: string; name: string; pageEnabled: boolean; status: string; indexInSearch: boolean }[] = JSON.parse(readFileSync("src/content/generated/locations.json", "utf8"));
const reviews: { name: string; publicationStatus: string; services: string[]; locations: string[] }[] = JSON.parse(readFileSync("src/content/generated/testimonials.json", "utf8"));

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("city-grouped overview is photo-led, linked and responsive", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const cities = locations.filter(city => city.pageEnabled && city.status !== "not-served");
  for (const width of [320,390,1280]) {
    await page.setViewportSize({width,height:900});
    await page.goto("/our-work/");
    await expect(page.getByRole("heading",{level:1})).toBeVisible();
    await expect(page.locator("[data-work-city]")).toHaveCount(cities.length);
    await expect(page.getByLabel("Browse by city")).toHaveCount(0);
    await expect(page.getByRole("slider")).toHaveCount(0);
    await expect(page.locator("[data-project-id] p")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for(const city of cities) {
      const section = page.locator(`[data-work-city="${city.slug}"]`);
      const matching = projects.filter(project => project.locations.includes(city.slug)).slice(0,6);
      await expect(section.locator("[data-project-id]")).toHaveCount(matching.length);
      await expect(section.getByRole("link",{name:`View all ${city.name} projects →`})).toHaveAttribute("href",`/our-work/${city.slug}/`);
      const ids = await section.locator("[data-project-id]").evaluateAll(items => items.map(item => item.getAttribute("data-project-id")));
      expect(ids).toEqual(matching.map(item => item._id));
      if(!matching.length) {
        const message=section.getByText("No projects published yet.",{exact:true});
        await expect(message).toBeVisible();
        const centered=await message.evaluate(element => {
          const parent=element.parentElement!.getBoundingClientRect();
          const text=element.getBoundingClientRect();
          return Math.abs((parent.top+parent.bottom)/2-(text.top+text.bottom)/2)<3;
        });
        expect(centered).toBe(true);
      }
    }
    if(projects.length) {
      const image = page.locator("[data-project-id] img").first();
      await expect.poll(() => image.evaluate((element:HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    if(process.env.SOFTNEST_QA_DIR) {
      mkdirSync(process.env.SOFTNEST_QA_DIR,{recursive:true});
      await page.screenshot({path:join(process.env.SOFTNEST_QA_DIR,`our-work-${width}.png`),fullPage:true});
    }
  }
  expect(errors).toEqual([]);
});

test("city gallery opens a permanent project with comparison and city context", async ({page}) => {
  test.skip(!projects.length,"No approved projects");
  const project = projects[0];
  const city = project.locations[0];
  await page.goto(`/our-work/${city}/`);
  await expect(page.locator("[data-project-id]")).toHaveCount(projects.filter(item => item.locations.includes(city)).length);
  await expect(page.getByRole("slider")).toHaveCount(0);
  await page.locator(`[data-project-id="${project._id}"] a`).click();
  await expect(page).toHaveURL(new RegExp(`/our-work/projects/${project.slug}/$`));
  await expect(page.getByRole("heading",{level:1})).toHaveText(project.title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://softnestcare.ca/our-work/projects/${project.slug}/`);
  if(project.variant === "paired") {
    const slider = page.getByRole("slider").first();
    await slider.focus(); await slider.press("Home"); await expect(slider).toHaveValue("0");
    await slider.press("End"); await expect(slider).toHaveValue("100");
  }
  const quotes = await page.locator('a[href^="/quote/"]').evaluateAll(items => items.map(item => item.getAttribute("href")));
  expect(quotes.every(href => href === `/quote/?city=${city}`)).toBe(true);
  for(const width of [320,390,1280]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if(process.env.SOFTNEST_QA_DIR) await page.screenshot({path:join(process.env.SOFTNEST_QA_DIR,`work-project-${width}.png`),fullPage:true});
  }
  await page.getByRole("link",{name:/More work in/}).click();
  await expect(page).toHaveURL(new RegExp(`/our-work/${city}/$`));
  await page.goto(`/our-work/${city}/?service=${project.services[0]}`);
  await expect(page.locator("[data-project-id]")).toHaveCount(projects.filter(item => item.locations.includes(city) && item.services.includes(project.services[0])).length);
  await page.getByRole("button",{name:"Clear filters"}).click();
  await expect(page).toHaveURL(new RegExp(`/our-work/${city}/$`));
  await page.goBack();
  await expect(page).toHaveURL(/service=/);
});

test("city service evidence matches both city and service, with no unrelated fallback", async ({ page }) => {
  for (const [city, service] of [["oakville", "sectional-furniture-cleaning"], ["etobicoke", "carpet-area-rug-cleaning"], ["milton", "sofa-cleaning"], ["vaughan", "mattress-cleaning"]]) {
    await page.goto(`/location/${city}/${service}/`);
    const matches = projects.filter((item) => item.publicationStatus === "approved" && item.locations.includes(city) && item.services.includes(service));
    const matchingReviews = reviews.filter((item) => item.publicationStatus === "approved" && item.locations.includes(city) && item.services.includes(service));
    const section = page.locator(`[data-local-evidence="${city}"]`);
    await expect(section).toHaveCount(matches.length ? 1 : 0);
    if (matches.length) {
      await expect(section.locator("[data-project-id]")).toHaveCount(Math.min(2, matches.length));
      await expect(section.locator("[data-project-id]").first()).toHaveAttribute("data-project-id", matches[0]._id);
      await expect(section.getByRole("link", { name: new RegExp(`View .* cleaning results`) })).toHaveAttribute("href", `/our-work/${city}/?service=${service}`);
    }
    await expect(page.locator("#reviews")).toHaveCount(matchingReviews.length ? 1 : 0);
    if (matchingReviews.length) {
      const authors = await page.locator("#reviews .google-review-card__author:visible").allTextContents();
      expect(authors.every(name => matchingReviews.some(review => review.name === name.trim()))).toBe(true);
    }
  }
});

test("Card uses working quote, Instagram, review and phone links on a white page", async ({ page }) => {
  const { instagramUrl } = JSON.parse(readFileSync("src/content/generated/settings.json", "utf8"));
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/card/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Upholstery & carpet cleaning.");
    expect(await page.locator("main").evaluate((element) => getComputedStyle(element).backgroundColor)).toBe("rgb(255, 255, 255)");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole("link", { name: /Get a free quote/ })).toHaveAttribute("href", "/quote/");
    await expect(page.getByRole("link", { name: /See our work/ })).toHaveAttribute("href", instagramUrl);
    await expect(page.getByRole("link", { name: /Google reviews Read/ })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.getByRole("link", { name: "text us", exact: true })).toHaveAttribute("href", /^sms:\+?\d+$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*follow/);
  }
  await page.route(instagramUrl, (route) => route.fulfill({ contentType: "text/html", body: "SoftNest Instagram" }));
  await page.getByRole("link", { name: /See our work/ }).click();
  await expect(page).toHaveURL(instagramUrl);
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

for (const location of locations.filter(location => location.pageEnabled && location.status !== "not-served")) {
  test(`${location.name} gallery matches published work, indexing and city quote context`, async ({ page }) => {
    const matching = projects.filter(project => project.locations.includes(location.slug));
    const displayed = matching.length ? matching : projects.slice(0, 1);
    await page.goto(`/location/${location.slug}/`);
    await expect(page.locator("#local-work")).toHaveCount(1);
    await expect(page.locator("#reviews")).toHaveCount(1);
    await expect(page.locator("#local-work [data-project-id]")).toHaveCount(Math.min(2, displayed.length));
    if (displayed.length) {
      const image = page.locator("#local-work img").first();
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await page.getByRole("link", { name: `View ${location.name} cleaning results →`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/our-work/${location.slug}/$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(location.name);
    await expect(page.locator("[data-project-id]")).toHaveCount(matching.length);
    const actualIds = await page.locator("[data-project-id]").evaluateAll(items => items.map(item => item.getAttribute("data-project-id")));
    expect(actualIds).toEqual(matching.map(project => project._id));
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toHaveCount(0);
    await expect(page.getByLabel("Browse by city")).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://softnestcare.ca/our-work/${location.slug}/`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", matching.length && location.indexInSearch ? /^index/ : /noindex/);
    const quotes = await page.locator('a[href^="/quote/"]').evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(quotes.every(href => href === `/quote/?city=${location.slug}`)).toBe(true);
    if (!matching.length) await expect(page.getByText("No projects published yet.",{exact:true})).toBeVisible();
    const markup = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text));
    const collection = markup.find(obj => obj["@type"] === "CollectionPage");
    if (matching.length) expect(collection.mainEntity.itemListElement).toHaveLength(matching.length);
    else expect(collection).toBeUndefined();
    await page.getByRole("link",{name:"← Back to Our Work",exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`/our-work/#work-${location.slug}-heading$`));
    await expect(page.locator(`[data-work-city="${location.slug}"]`)).toBeVisible();
    await expect(page.getByLabel("Browse by city")).toHaveCount(0);
  });
}

test("sitemap includes project pages and only populated indexable cities", async ({page}) => {
  const response = await page.request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  for(const city of locations) {
    const indexed = city.pageEnabled && city.status !== "not-served" && city.indexInSearch && projects.some(project => project.locations.includes(city.slug));
    expect(xml.includes(`https://softnestcare.ca/our-work/${city.slug}/`)).toBe(Boolean(indexed));
  }
  for(const project of projects) expect(xml).toContain(`https://softnestcare.ca/our-work/projects/${project.slug}/`);
});
