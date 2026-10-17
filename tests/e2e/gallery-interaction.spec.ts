import { expect, test } from "@playwright/test";

// Keep synthetic browser checks independent of third-party analytics loading.
test.beforeEach(async ({ page }) => {
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
});

for (const width of [402, 1440]) {
  test(`comparison sliders leave gallery navigation to the buttons at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 827 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Show next cleaning results" })).toBeVisible();
    const track = page.locator("#gallery-track");
    const slider = track.getByRole("slider").first();
    await slider.scrollIntoViewIfNeeded();
    const initialTransform = await track.evaluate((element) => element.style.transform);
    const initialValue = await slider.inputValue();

    await slider.focus();
    await slider.press("ArrowRight");
    expect(await slider.inputValue()).not.toBe(initialValue);
    await expect(track).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
    await slider.press("Home");
    await expect(slider).toHaveValue("0");
    await slider.press("End");
    await expect(slider).toHaveValue("100");
    await slider.press("Home");

    await slider.evaluate((element) => {
      const start = new Touch({ identifier: 1, target: element, clientX: 240 });
      const end = new Touch({ identifier: 1, target: element, clientX: 100 });
      element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
      element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
    });
    expect(await track.evaluate((element) => element.style.transform)).toBe(initialTransform);
    expect(await page.locator("#gallery-carousel").evaluate((element) => element.scrollLeft)).toBe(0);

    await page.getByRole("button", { name: "Show next cleaning results" }).click();
    await expect(page.getByRole("button", { name: "Show next cleaning results" })).toHaveCSS("color", "rgb(7, 84, 59)");
    await expect(page.getByRole("button", { name: "Show next cleaning results" })).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect.poll(() => track.evaluate((element) => element.style.transform)).not.toBe(initialTransform);
    await page.getByRole("button", { name: "Show previous cleaning results" }).click();
    await expect.poll(() => track.evaluate((element) => element.style.transform)).toBe(initialTransform);
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

test("touch comparison reaches both edges with fixed bottom arrows and a clear photo", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:4173", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
  await page.goto("/");
  const card = page.locator(".gallery-compare-card").first();
  await card.scrollIntoViewIfNeeded();
  const box = (await card.boundingBox())!;
  const slider = card.getByRole("slider");
  const previous = page.getByRole("button", { name: "Show previous cleaning results" });
  const next = page.getByRole("button", { name: "Show next cleaning results" });
  const client = await context.newCDPSession(page);
  const touch = (type: "touchStart" | "touchMove" | "touchEnd", percentage = 50) => client.send("Input.dispatchTouchEvent", {
    type,
    touchPoints: type === "touchEnd" ? [] : [{ x: box.x + box.width * percentage / 100, y: box.y + 25, id: 1 }],
  });
  try {
    // Start on the divider well away from its circular grip.
    await touch("touchStart");
    await touch("touchMove", 20);
    expect((await previous.boundingBox())!.y).toBeGreaterThan(box.y + box.height);
    await touch("touchMove", 28);
    expect((await previous.boundingBox())!.y).toBeGreaterThan(box.y + box.height);
    await touch("touchMove", -2);
    await expect(slider).toHaveValue("0");
    await expect(card.locator(".gallery-layer--after")).toHaveCSS("clip-path", "inset(0px 0px 0px 0%)");
    await expect(card.locator(".gallery-divider__grip")).toHaveCSS("opacity", "0");
    await touch("touchMove", 50);
    await expect(card.locator(".gallery-divider__grip")).toHaveCSS("opacity", "1");
    await touch("touchMove", 80);
    expect((await next.boundingBox())!.y).toBeGreaterThan(box.y + box.height);
    await touch("touchMove", 102);
    await expect(slider).toHaveValue("100");
    await expect(card.locator(".gallery-divider__grip")).toHaveCSS("opacity", "0");
    await expect(card.locator(".gallery-layer--after")).toHaveCSS("clip-path", "inset(0px 0px 0px 100%)");
    await touch("touchMove", 50);
    await touch("touchEnd");
    await expect(card.locator(".gallery-divider__grip")).toHaveCSS("opacity", "1");
    await next.tap();
    await expect(page.locator("#gallery-carousel")).toHaveAttribute("aria-label", /showing item 2 of/);
    await previous.tap();
    await expect(page.locator("#gallery-carousel")).toHaveAttribute("aria-label", /showing item 1 of/);
  } finally {
    await context.close();
  }
});
