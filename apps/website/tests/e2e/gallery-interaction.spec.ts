import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

for (const width of [402, 1440]) {
  test(`home shows the Oakville extraction clip before the carpet demo at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 827 });
    await page.goto("/");
    const results = page.locator("#results");
    const videos = results.locator("video");
    await expect(videos).toHaveCount(2);
    await expect(videos.nth(0).locator("source")).toHaveAttribute("src", /softnest-clip-2\.mp4$/);
    await expect(videos.nth(1).locator("source")).toHaveAttribute("src", "/videos/carpet-cleaning-demo.mp4");
    for (const video of await videos.all()) {
      await expect(video).toHaveAttribute("preload", "none");
      await expect(video).toHaveAttribute("controls", "");
    }
    await expect(results.getByRole("link", { name: /View more results/ })).toHaveAttribute("href", "/our-work/");
  });
}
test("mobile final CTA image starts at the top of the card", async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 827 });
  await page.goto("/");
  const card = page.locator(".site-final-cta");
  await card.scrollIntoViewIfNeeded();
  const cardBox = await card.boundingBox();
  const imageBox = await card.locator(".locations-final-cta__image").boundingBox();
  expect(cardBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(imageBox!.y).toBeCloseTo(cardBox!.y, 0);
  expect(imageBox!.width).toBeCloseTo(cardBox!.width, 0);
});
