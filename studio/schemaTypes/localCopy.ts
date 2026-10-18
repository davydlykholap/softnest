import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string, long = false) => defineField({
  name, title, type: long ? "text" : "string", validation: (rule) => rule.required(),
});
const city = defineField({ name: "city", title: "City", type: "reference", to: [{ type: "location" }], validation: (rule) => rule.required() });
const questionFields = [text("question", "Question"), text("answer", "Answer", true)];
const rows = (name: string, title: string, fields: ReturnType<typeof defineField>[], min: number, max: number) => defineField({
  name, title, type: "array", of: [defineArrayMember({ type: "object", fields })],
  validation: (rule) => rule.required().min(min).max(max),
});

export const localCityCopy = defineType({
  name: "localCityCopy", title: "City page text", type: "document",
  fields: [
    city,
    text("metaTitle", "Search title"), text("metaDescription", "Search description", true),
    text("heroDescription", "Opening description", true), text("introductionHeading", "Introduction heading"),
    defineField({ name: "introductionParagraphs", title: "Introduction paragraphs", type: "array", of: [defineArrayMember({ type: "text" })], validation: (rule) => rule.required().min(1).max(3) }),
    rows("services", "Main services", [
      { ...text("title", "Heading"), readOnly: true },
      { ...text("slug", "Service URL name"), readOnly: true },
      text("description", "Description", true),
    ], 3, 3),
    text("more", "Other cleaning services", true),
    rows("advantages", "Reasons to book", [text("title", "Heading"), text("description", "Description", true)], 4, 4),
    rows("faqs", "Questions and answers", questionFields, 3, 10),
    defineField({ name: "neighbourhoods", title: "Neighbourhoods served", type: "array", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.required().min(1) }),
    text("coverage", "Service area introduction", true), text("coverageClosing", "Service area closing", true),
    text("ctaTitle", "Final quote heading"), text("ctaDescription", "Final quote description", true),
  ],
  preview: { select: { title: "city.name" }, prepare: ({ title }) => ({ title, subtitle: "City page text" }) },
});

export const localServiceCopy = defineType({
  name: "localServiceCopy", title: "City service page text", type: "document",
  fields: [
    city,
    defineField({ name: "service", title: "Service", type: "reference", to: [{ type: "service" }], validation: (rule) => rule.required() }),
    text("introduction", "Opening description", true), text("bookingNote", "What to include in the request", true),
    text("visit", "Planning this visit", true),
    defineField({ name: "question", title: "Practical question", type: "object", fields: questionFields, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "service.name", subtitle: "city.name" } },
});
