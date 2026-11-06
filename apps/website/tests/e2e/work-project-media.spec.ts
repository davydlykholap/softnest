import { expect,test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync,mkdirSync } from "node:fs";
import { join } from "node:path";

type Project = {slug:string; locations:string[]; media?:{type:string; image?:string; alt?:string; title?:string; embed?:string; video?:string}[]};
const projects:Project[] = JSON.parse(readFileSync("src/content/generated/projects.json","utf8"));
test.beforeEach(async({page}) => {
  await page.route("https://www.googletagmanager.com/**",route => route.fulfill({status:200,body:""}));
});

test("city rails browse without autoplay and View all opens the full grid",async({page}) => {
  const city = projects.find(project => projects.filter(item => item.locations[0] === project.locations[0]).length > 3)?.locations[0];
  test.skip(!city,"Requires more than three published projects in one city");
  await page.setViewportSize({width:1280,height:900});
  await page.goto("/our-work/");
  const rail = page.locator(`[data-city-track="${city}"]`);
  const previous = page.getByRole("button",{name:`Previous ${city} projects`});
  const next = page.getByRole("button",{name:`Next ${city} projects`});
  await expect(previous).toBeDisabled();
  await next.click();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await expect(previous).toBeEnabled();
  await previous.click();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeLessThan(2);
  await page.setViewportSize({width:390,height:844});
  await rail.locator("a").last().focus();
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator(`[data-work-city="${city}"]`).getByRole("link",{name:/View all/}).click();
  await expect(page).toHaveURL(new RegExp(`/our-work/${city}/$`));
  await expect(page.locator("[data-project-id]")).toHaveCount(projects.filter(item => item.locations[0] === city).length);
  await expect(page.locator("[data-city-track]")).toHaveCount(0);
  if(process.env.SOFTNEST_QA_DIR) { mkdirSync(process.env.SOFTNEST_QA_DIR,{recursive:true}); await page.screenshot({path:join(process.env.SOFTNEST_QA_DIR,"fixture-city-mobile.png"),fullPage:true}); }
});

test("project photos enlarge with keyboard dismissal and media retain editorial order",async({page}) => {
  const project = projects.find(item => item.media?.some(media => media.type === "photo") && item.media.some(media => media.type === "comparison"));
  test.skip(!project,"Requires a project with additional photos and comparison");
  await page.goto(`/our-work/projects/${project!.slug}/`);
  expect(await page.locator("[data-project-media]").evaluateAll(items => items.map(item => item.getAttribute("data-project-media")))).toEqual(project!.media!.map(item => item.type));
  const photo = page.locator('[data-project-media="photo"] button').first();
  await photo.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(photo).toBeFocused();
  const slider = page.locator('[data-project-media="comparison"] input');
  await slider.focus(); await slider.press("Home"); await expect(slider).toHaveValue("0");
  await slider.press("End"); await expect(slider).toHaveValue("100");
  const axe = await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();
  expect(axe.violations.filter(item => item.impact === "serious" || item.impact === "critical").map(item => item.id)).toEqual([]);
  for(const width of [390,1280]) {
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if(process.env.SOFTNEST_QA_DIR) await page.screenshot({path:join(process.env.SOFTNEST_QA_DIR,`fixture-project-${width}.png`),fullPage:true});
  }
});

test("video embeds wait for Play and uploaded videos have controls and no preload",async({page}) => {
  const project = projects.find(item => item.media?.some(media => media.embed) && item.media.some(media => media.video));
  test.skip(!project,"Requires embedded and uploaded project video");
  const external = project!.media!.find(item => item.embed)!;
  await page.route(external.embed!,route => route.fulfill({status:200,contentType:"text/html",body:"<!doctype html><title>Video player test</title><p>Player loaded</p>"}));
  await page.goto(`/our-work/projects/${project!.slug}/`);
  await expect(page.locator(`iframe[src="${external.embed}"]`)).toHaveCount(0);
  await page.getByRole("button",{name:`Play video: ${external.title}`}).click();
  await expect(page.locator(`iframe[src="${external.embed}"]`)).toBeVisible();
  const uploaded = page.locator("video");
  await expect(uploaded).toHaveAttribute("controls","");
  await expect(uploaded).toHaveAttribute("preload","none");
  await expect(uploaded.locator("source")).toHaveAttribute("src",project!.media!.find(item => item.video)!.video!);
});
