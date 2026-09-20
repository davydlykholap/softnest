import { expect, test } from "@playwright/test";
import {
  buildQuoteSubmission,
  validateQuoteItems,
  type QuoteItemOption,
} from "../src/components/quote/quoteRequest";

const serviceOptions: QuoteItemOption[] = [
  {
    id: "quote-category-2",
    presentation: {
      label: "Sectional",
      quickQuestions: [{ name: "sectional_seats", label: "How many seats?", choices: ["3", "4", "5", "6", "7+"] }],
    },
  },
  {
    id: "quote-category-3",
    presentation: {
      label: "Armchair",
      quickQuestions: [{ name: "armchair_quantity", label: "How many chairs?", choices: ["1", "2", "3+"] }],
    },
  },
];

const byId = (id: string) => serviceOptions.filter((option) => option.id === id);

test("sectional seats require a specific valid count", () => {
  const options = byId("quote-category-2");
  const answers = {
    quickDetails: { sectional_seats: "7+" },
    exactQuantities: { sectional_seats: "" },
    businessAmounts: {},
  };

  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("exact");
  answers.exactQuantities.sectional_seats = "6";
  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("exact");
  answers.exactQuantities.sectional_seats = "7";
  expect(validateQuoteItems(options, "Individual", answers)).toBeNull();
  answers.quickDetails.sectional_seats = "4";
  expect(validateQuoteItems(options, "Individual", answers)).toBeNull();
  answers.quickDetails.sectional_seats = "3-4";
  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("choice");
});

test("each plus option needs an exact number at or above its minimum", () => {
  for (const minimum of [3, 4, 7, 8]) {
    const option: QuoteItemOption = {
      id: `item-${minimum}`,
      presentation: {
        label: "Item",
        quickQuestions: [{ name: "count", label: "How many?", choices: ["1", `${minimum}+`] }],
      },
    };
    const answers = {
      quickDetails: { count: `${minimum}+` },
      exactQuantities: { count: String(minimum - 1) },
      businessAmounts: {},
    };
    expect(validateQuoteItems([option], "Individual", answers)?.kind).toBe("exact");
    answers.exactQuantities.count = String(minimum);
    expect(validateQuoteItems([option], "Individual", answers)).toBeNull();
  }
});

test("business items require an amount and only their visible questions", () => {
  const options = byId("quote-category-3");
  const answers = { quickDetails: {}, exactQuantities: {}, businessAmounts: {} as Record<string, string> };
  expect(validateQuoteItems(options, "Business", answers)?.kind).toBe("amount");
  answers.businessAmounts[options[0].id] = "0";
  expect(validateQuoteItems(options, "Business", answers)?.kind).toBe("amount");
  answers.businessAmounts[options[0].id] = "12";
  expect(validateQuoteItems(options, "Business", answers)).toBeNull();
});

test("submission includes allowed answers and strips private URL details", () => {
  const formData = new FormData();
  formData.set("botcheck", "");
  formData.set("website", "should-not-send");
  formData.set("organization", "Example Ltd");
  const submission = buildQuoteSubmission({
    formData,
    customerType: "Individual",
    selectedOptions: byId("quote-category-2"),
    quickDetails: { sectional_seats: "7+" },
    exactQuantities: { sectional_seats: "9" },
    businessAmounts: {},
    name: "Example Person",
    phone: "(416) 555-0123",
    notes: "None",
    accessKey: "test-key",
    sourcePage: "/quote/",
    referrer: "https://example.com/previous/?private=secret#fragment",
    origin: "https://example.com",
    attribution: { utm_source: "search", utm_medium: "bad\nvalue", unexpected: "hidden" },
  });

  expect(submission.get("item_details")).toBe("Sectional: How many seats?: 9");
  expect(submission.get("referrer")).toBe("https://example.com/previous/");
  expect(submission.get("utm_source")).toBe("search");
  expect(submission.has("utm_medium")).toBe(false);
  expect(submission.has("unexpected")).toBe(false);
  expect(submission.has("website")).toBe(false);
  expect(submission.has("organization")).toBe(false);
});
