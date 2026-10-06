import { expect, test } from "@playwright/test";
import {
  buildQuoteSubmission,
  validateQuoteItems,
  type QuoteEntry,
  type QuoteItemOption,
} from "../src/components/quote/quoteRequest";

const serviceOptions: QuoteItemOption[] = [
  {
    id: "quote-category-1",
    presentation: {
      label: "Sofa or couch",
      entryLabel: "Sofa",
      quickQuestions: [{ name: "sofa_seats", label: "How many seats?", choices: ["2", "3", "4+"] }],
    },
  },
  {
    id: "quote-category-2",
    presentation: {
      label: "Sectional",
      entryLabel: "Sectional",
      quickQuestions: [{ name: "sectional_seats", label: "How many seats?", choices: ["3", "4", "5", "6", "7+"] }],
    },
  },
  {
    id: "quote-category-3",
    presentation: {
      label: "Armchair",
      entryLabel: "Armchair group",
      quickQuestions: [{ name: "armchair_quantity", label: "How many chairs?", choices: ["1", "2", "3+"] }],
    },
  },
];
const byId = (id: string) => serviceOptions.filter((option) => option.id === id);
const entry = (
  id: string,
  answers: Record<string, string>,
  exactQuantities: Record<string, string> = {},
): QuoteEntry => ({ id, answers, exactQuantities });

test("sectional seats require a specific valid count", () => {
  const options = byId("quote-category-2");
  const answers = {
    items: {
      "quote-category-2": [entry("sectional-1", { sectional_seats: "7+" }, { sectional_seats: "" })],
    },
    businessAmounts: {},
  };

  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("exact");
  answers.items["quote-category-2"][0].exactQuantities.sectional_seats = "6";
  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("exact");
  answers.items["quote-category-2"][0].exactQuantities.sectional_seats = "7";
  expect(validateQuoteItems(options, "Individual", answers)).toBeNull();
  answers.items["quote-category-2"][0].answers.sectional_seats = "4";
  expect(validateQuoteItems(options, "Individual", answers)).toBeNull();
  answers.items["quote-category-2"][0].answers.sectional_seats = "3-4";
  expect(validateQuoteItems(options, "Individual", answers)?.kind).toBe("choice");
});
test("each plus option needs an exact number at or above its minimum", () => {
  for (const minimum of [3, 4, 7, 8]) {
    const option: QuoteItemOption = {
      id: `item-${minimum}`,
      presentation: {
        label: "Item",
        entryLabel: "Item",
        quickQuestions: [{ name: "count", label: "How many?", choices: ["1", `${minimum}+`] }],
      },
    };
    const answers = {
      items: {
        [option.id]: [entry("item-1", { count: `${minimum}+` }, { count: String(minimum - 1) })],
      },
      businessAmounts: {},
    };
    expect(validateQuoteItems([option], "Individual", answers)?.kind).toBe("exact");
    answers.items[option.id][0].exactQuantities.count = String(minimum);
    expect(validateQuoteItems([option], "Individual", answers)).toBeNull();
  }
});

test("business items require an amount and only their visible questions", () => {
  const options = byId("quote-category-3");
  const answers = {
    items: { "quote-category-3": [entry("armchair-1", {})] },
    businessAmounts: {} as Record<string, string>,
  };
  expect(validateQuoteItems(options, "Business", answers)?.kind).toBe("amount");
  answers.businessAmounts[options[0].id] = "0";
  expect(validateQuoteItems(options, "Business", answers)?.kind).toBe("amount");
  answers.businessAmounts[options[0].id] = "12";
  expect(validateQuoteItems(options, "Business", answers)).toBeNull();
});
test("submission preserves multiple differently configured sofas", () => {
  const formData = new FormData();
  formData.set("botcheck", "");
  formData.set("website", "should-not-send");
  formData.set("organization", "Example Ltd");
  const submission = buildQuoteSubmission({
    formData,
    customerType: "Individual",
    selectedOptions: byId("quote-category-1"),
    items: {
      "quote-category-1": [
        entry("sofa-1", { sofa_seats: "2" }),
        entry("sofa-2", { sofa_seats: "3" }),
      ],
    },
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
  expect(submission.get("item_details")).toBe(
    "Sofa or couch: Sofa 1 — How many seats?: 2 | Sofa 2 — How many seats?: 3",
  );
  expect(submission.get("referrer")).toBe("https://example.com/previous/");
  expect(submission.get("utm_source")).toBe("search");
  expect(submission.has("utm_medium")).toBe(false);
  expect(submission.has("unexpected")).toBe(false);
  expect(submission.has("website")).toBe(false);
  expect(submission.has("organization")).toBe(false);
});

test("carpet questions follow the selected surface type", () => {
  const option: QuoteItemOption = {
    id: "quote-category-6",
    presentation: {
      label: "Carpet or rug",
      entryLabel: "Carpet / rug",
      quickQuestions: [
        { name: "carpet_type", label: "What type?", choices: ["Area rug", "Wall-to-wall carpet", "Stairs / landing"] },
        { name: "rug_length_ft", label: "Length (ft)", type: "number", min: 1, showWhen: { name: "carpet_type", values: ["Area rug"] } },
        { name: "rug_width_ft", label: "Width (ft)", type: "number", min: 1, showWhen: { name: "carpet_type", values: ["Area rug"] } },
        { name: "stair_count", label: "Number of stairs", type: "number", min: 1, showWhen: { name: "carpet_type", values: ["Stairs / landing"] } },
      ],
    },
  };
  const quoteEntry = entry("carpet-1", { carpet_type: "Area rug" });
  const answers = { items: { "quote-category-6": [quoteEntry] }, businessAmounts: {} };

  expect(validateQuoteItems([option], "Individual", answers)?.name).toBe("rug_length_ft");
  quoteEntry.answers.rug_length_ft = "8";
  quoteEntry.answers.rug_width_ft = "10";
  expect(validateQuoteItems([option], "Individual", answers)).toBeNull();

  quoteEntry.answers.carpet_type = "Stairs / landing";
  expect(validateQuoteItems([option], "Individual", answers)?.name).toBe("stair_count");
  quoteEntry.answers.stair_count = "14";
  expect(validateQuoteItems([option], "Individual", answers)).toBeNull();
});
