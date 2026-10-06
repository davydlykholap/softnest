import { sanitizeAttribution } from "@/lib/marketingAttribution";
import { businessQuantityQuestions, isPlusChoice } from "./quoteAnswers";
import type { QuickQuestion } from "./quoteOptions";

export type CustomerType = "Individual" | "Business";

export type QuoteEntry = {
  id: string;
  answers: Record<string, string>;
  exactQuantities: Record<string, string>;
};

export type QuoteAnswers = {
  items: Record<string, QuoteEntry[]>;
  businessAmounts: Record<string, string>;
};

export type QuoteItemOption = {
  id: string;
  presentation: {
    label: string;
    entryLabel?: string;
    quickQuestions?: QuickQuestion[];
  };
};

export type ItemError = {
  itemId: string;
  entryId?: string;
  kind: "choice" | "exact" | "amount";
  name?: string;
  message: string;
};
export function visibleQuestions(option: QuoteItemOption, customerType: CustomerType) {
  return (option.presentation.quickQuestions ?? []).filter(
    (question) => customerType !== "Business" || !businessQuantityQuestions.has(question.name),
  );
}

function entryQuestions(
  option: QuoteItemOption,
  customerType: CustomerType,
  entry: QuoteEntry,
) {
  return visibleQuestions(option, customerType).filter((question) => {
    if (!question.showWhen) return true;
    return question.showWhen.values.includes(entry.answers[question.showWhen.name] ?? "");
  });
}

function validateInputQuestion(question: QuickQuestion, value: string) {
  const required = question.required !== false;
  if (!value) return required ? "required" : null;
  if (question.type === "text") {
    return question.max && value.length > question.max ? "invalid" : null;
  }
  if (question.type === "number") {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return "invalid";
    const number = Number(value);
    if (question.min !== undefined && number < question.min) return "invalid";
    if (question.max !== undefined && number > question.max) return "invalid";
  }
  return null;
}

export function validateQuoteItems(
  options: QuoteItemOption[],
  customerType: CustomerType,
  answers: QuoteAnswers,
): ItemError | null {
  for (const option of options) {
    const entries = answers.items[option.id] ?? [];
    if (!entries.length) {
      return {
        itemId: option.id,
        kind: "choice",
        message: `Please add details for ${option.presentation.label}.`,
      };
    }

    for (const [entryIndex, entry] of entries.entries()) {
      for (const question of entryQuestions(option, customerType, entry)) {
        const value = (entry.answers[question.name] ?? "").trim();
        const entryName = `${option.presentation.entryLabel ?? option.presentation.label} ${entryIndex + 1}`;

        if (question.type === "number" || question.type === "text") {
          if (validateInputQuestion(question, value)) {
            return {
              itemId: option.id,
              entryId: entry.id,
              kind: "choice",
              name: question.name,
              message: `Please enter “${question.label}” for ${entryName}.`,
            };
          }
          continue;
        }

        const choices = question.choices ?? [];
        if (!choices.includes(value)) {
          return {
            itemId: option.id,
            entryId: entry.id,
            kind: "choice",
            name: question.name,
            message: `Please answer “${question.label}” for ${entryName}.`,
          };
        }

        if (isPlusChoice(value)) {
          const exact = entry.exactQuantities[question.name] ?? "";
          if (!/^\d{1,3}$/.test(exact) || Number(exact) < Number(value.slice(0, -1))) {
            return {
              itemId: option.id,
              entryId: entry.id,
              kind: "exact",
              name: question.name,
              message: `Please enter the exact number for ${entryName} (${value.slice(0, -1)} or more).`,
            };
          }
        }
      }
    }

    if (customerType === "Business" && option.id !== "quote-category-6") {
      const amount = answers.businessAmounts[option.id] ?? "";
      if (!/^[1-9]\d{0,5}$/.test(amount)) {
        return {
          itemId: option.id,
          kind: "amount",
          message: `Please enter the number of pieces for ${option.presentation.label}.`,
        };
      }
    }
  }
  return null;
}

export function formatItemDetails(
  options: QuoteItemOption[],
  customerType: CustomerType,
  answers: QuoteAnswers,
) {
  return options
    .map((option) => {
      const entryLabel = option.presentation.entryLabel ?? option.presentation.label;
      const entries = answers.items[option.id] ?? [];
      const entryDetails = entries.map((entry, index) => {
        const details = entryQuestions(option, customerType, entry)
          .filter((question) => entry.answers[question.name])
          .map((question) => {
            const value = entry.answers[question.name];
            return `${question.label}: ${isPlusChoice(value)
              ? entry.exactQuantities[question.name]
              : value}`;
          });
        return details.length ? `${entryLabel} ${index + 1} — ${details.join(", ")}` : "";
      }).filter(Boolean);

      if (customerType === "Business") {
        const amount = answers.businessAmounts[option.id] ?? "";
        if (amount) {
          entryDetails.push(`${option.id === "quote-category-6" ? "Approx. area (sq ft)" : "Number of pieces"}: ${amount}`);
        }
      }

      return entryDetails.length ? `${option.presentation.label}: ${entryDetails.join(" | ")}` : "";
    })
    .filter(Boolean)
    .join("; ");
}

type SubmissionInput = QuoteAnswers & {
  formData: FormData;
  customerType: CustomerType;
  selectedOptions: QuoteItemOption[];
  name: string;
  phone: string;
  notes: string;
  accessKey: string;
  sourcePage: string;
  referrer: string;
  origin: string;
  attribution: unknown;
};

export function buildQuoteSubmission(input: SubmissionInput) {
  const submission = new FormData();
  submission.set("subject", `New SoftNest ${input.customerType.toLowerCase()} quote request`);
  if (input.formData.has("botcheck")) {
    submission.set("botcheck", String(input.formData.get("botcheck") ?? ""));
  }
  submission.set("customer_type", input.customerType);
  submission.set("name", input.name);
  if (input.customerType === "Business") {
    for (const key of ["organization", "email", "service_location", "service_frequency"]) {
      submission.set(key, String(input.formData.get(key) ?? ""));
    }
  }
  submission.set("furniture", input.selectedOptions.map((option) => option.presentation.label).join(", "));
  submission.set("service_ids", input.selectedOptions.map((option) => option.id).join(","));
  submission.set("item_details", formatItemDetails(input.selectedOptions, input.customerType, input));
  submission.set("phone", input.phone);
  submission.set("notes", input.notes);
  submission.set("access_key", input.accessKey);
  submission.set("from_name", "SoftNest Website");
  submission.set("source_page", input.sourcePage);

  if (input.referrer) {
    try {
      const referrer = new URL(input.referrer);
      if (referrer.protocol === "http:" || referrer.protocol === "https:") {
        submission.set("referrer", referrer.origin === input.origin
          ? `${referrer.origin}${referrer.pathname}`
          : referrer.origin);
      }
    } catch {
      // Referrer metadata is optional.
    }
  }

  for (const [key, value] of Object.entries(sanitizeAttribution(input.attribution))) {
    submission.set(key, value);
  }

  return submission;
}
