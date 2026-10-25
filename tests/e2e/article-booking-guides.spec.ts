import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const posts = JSON.parse(readFileSync("src/content/generated/posts.json", "utf8")) as {
  slug: string; title: string; seoDescription: string; coverImage?: { caption?: string; alt?: string };
}[];

test("every article keeps its canonical address, cover disclosure and useful content", async ({ page }) => {
  test.setTimeout(90_000);
  await page.route("https://www.googletagmanager.com/**", route => route.fulfill({ body: "" }));
  for (const post of posts) {
    const response = await page.goto(`/blog/${post.slug}/`);
    expect(response?.status(), post.slug).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(post.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://softnestcare.ca/blog/${post.slug}/`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", post.seoDescription);
    if (post.coverImage?.caption) {
      await expect(page.locator("article > figure figcaption")).toHaveText(post.coverImage.caption);
      await expect(page.locator("article > figure img")).toHaveAttribute("alt", post.coverImage.alt || "");
      await page.locator("article > figure img").scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator("article > figure img").evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    const body = await page.locator("article").innerText();
    expect(body).not.toMatch(/48[-– ]?hours?|refund/i);
    expect(await page.locator("article h2").count(), post.slug).toBeGreaterThan(1);
  }
});

test("published booking guides and quote details fit mobile and desktop", async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", route => route.fulfill({ body: "" }));
  const guideSlugs = ["what-is-included-in-sofa-cleaning", "how-to-prepare-for-upholstery-and-carpet-cleaning"];
  const paths = ["/blog/", ...posts.filter(post => guideSlugs.includes(post.slug)).map(post => `/blog/${post.slug}/`), "/quote/"];
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: ${path}`).toBe(true);
    }
  }
});
