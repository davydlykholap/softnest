import { sanitizeAttribution } from "@/lib/marketingAttribution";
import { businessQuantityQuestions, isPlusChoice } from "./quoteAnswers";

export type CustomerType = "Individual" | "Business";

type Answers = {
  quickDetails: Record<string, string>;
  exactQuantities: Record<string, string>;
  businessAmounts: Record<string, string>;
};

export type QuoteItemOption = {
  id: string;
  presentation: {
    label: string;
    quickQuestions?: { name: string; label: string; choices: string[] }[];
  };
};

export type ItemError = {
  itemId: string;
  kind: "choice" | "exact" | "amount";
  name?: string;
  message: string;
};

export function visibleQuestions(option: QuoteItemOption, customerType: CustomerType) {
  return (option.presentation.quickQuestions ?? []).filter(
    (question) => customerType !== "Business" || !businessQuantityQuestions.has(question.name),
  );
}

export function validateQuoteItems(
  options: QuoteItemOption[],
  customerType: CustomerType,
  answers: Answers,
): ItemError | null {
  for (const option of options) {
    for (const question of visibleQuestions(option, customerType)) {
      const choice = answers.quickDetails[question.name] ?? "";
      if (!question.choices.includes(choice)) {
        return {
          itemId: option.id,
          kind: "choice",
          name: question.name,
          message: `Please answer “${question.label}” for ${option.presentation.label}.`,
        };
      }

      if (isPlusChoice(choice)) {
        const exact = answers.exactQuantities[question.name] ?? "";
        if (!/^\d{1,3}$/.test(exact) || Number(exact) < Number(choice.slice(0, -1))) {
          return {
            itemId: option.id,
            kind: "exact",
            name: `${question.name}_exact`,
            message: `Please enter the exact number for ${option.presentation.label} (${choice.slice(0, -1)} or more).`,
          };
        }
      }
    }

    if (customerType === "Business") {
      const amount = answers.businessAmounts[option.id] ?? "";
      if (!/^[1-9]\d{0,5}$/.test(amount)) {
        return {
          itemId: option.id,
          kind: "amount",
          message: `Please enter ${option.id === "quote-category-6" ? "the approximate area" : "the number of pieces"} for ${option.presentation.label}.`,
        };
      }
    }
  }

  return null;
}

export function formatItemDetails(
  options: QuoteItemOption[],
  customerType: CustomerType,
  answers: Answers,
) {
  return options
    .map((option) => {
      const details = visibleQuestions(option, customerType)
        .filter((question) => answers.quickDetails[question.name])
        .map((question) => {
          const choice = answers.quickDetails[question.name];
          return `${question.label}: ${isPlusChoice(choice)
            ? answers.exactQuantities[question.name]
            : choice}`;
        });

      const amount = customerType === "Business" ? answers.businessAmounts[option.id] : "";
      if (amount) {
        details.push(`${option.id === "quote-category-6" ? "Approx. area (sq ft)" : "Number of pieces"}: ${amount}`);
      }
      return details.length ? `${option.presentation.label}: ${details.join(", ")}` : "";
    })
    .filter(Boolean)
    .join("; ");
}

type SubmissionInput = Answers & {
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
