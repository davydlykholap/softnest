import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeRoutes = [
  ["home", "/"],
  ["services", "/services/"],
  ["sofa service", "/services/sofa-cleaning/"],
  ["locations", "/location/"],
  ["Mississauga location", "/location/mississauga/"],
  ["Toronto location", "/location/toronto/"],
  ["quote", "/quote/"],
  ["blog", "/blog/"],
  ["about", "/about/"],
] as const;

for (const [name, route] of representativeRoutes) {
  test(`${name} has no serious automated accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const serious = results.violations.filter(
      (violation) => violation.impact === "critical" || violation.impact === "serious",
    );

    const summary = serious.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target.join(" ")),
    }));

    expect(summary, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}

test("expanded quote controls have no serious automated accessibility violations", async ({ page }) => {
  // Check the final control colors rather than intermediate reveal-animation opacity.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/quote/");
  await page.getByRole("button", { name: "Carpet or rug" }).click();
  await page.getByRole("combobox", { name: "What type? for carpet / rug 1" }).click();
  await page.getByRole("option", { name: "Area rug", exact: true }).click();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "critical" || violation.impact === "serious",
  );

  expect(serious.map((violation) => violation.id)).toEqual([]);
});
