import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
} from "sanity";

const label = (name: string) =>
  name.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());

const text = (name: string, required = false, long = false) =>
  defineField({
    name,
    title: label(name),
    type: long ? "text" : "string",
    validation: (rule) => (required ? rule.required() : rule),
  });

const flag = (name: string, value = false) =>
  defineField({
    name,
    title: label(name),
    type: "boolean",
    initialValue: value,
  });

const url = (name: string, required = false) =>
  defineField({
    name,
    title: label(name),
    type: "url",
    validation: (rule) => {
      const configured = rule.uri({ scheme: ["https"] });
      return required ? configured.required() : configured;
    },
  });

const strings = (name: string) =>
  defineField({
    name,
    title: label(name),
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

const refs = (name: string, type: string) =>
  defineField({
    name,
    title: label(name),
    type: "array",
    of: [defineArrayMember({ type: "reference", to: [{ type }] })],
  });

const rows = (
  name: string,
  fields: FieldDefinition[],
  preview?: { title?: string; subtitle?: string; description?: string },
) =>
  defineField({
    name,
    title: label(name),
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields,
        ...(preview
          ? {
              preview: {
                select: {
                  ...(preview.title ? { title: preview.title } : {}),
                  ...(preview.subtitle ? { subtitle: preview.subtitle } : {}),
                  ...(preview.description
                    ? { description: preview.description }
                    : {}),
                },
              },
            }
          : {}),
      }),
    ],
  });

const copyRows = (name = "copy") =>
  defineField({
    name,
    title: "Editable page text",
    description:
      "Each row controls one visible text fragment. The internal key is fixed so the page layout stays stable.",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({
            name: "key",
            title: "Internal key",
            type: "string",
            readOnly: true,
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: "label",
            title: "Where this appears",
            type: "string",
            readOnly: true,
          }),
          defineField({
            name: "text",
            title: "Text",
            type: "text",
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: { title: "label", key: "key", text: "text" },
          prepare: ({ title, key, text: value }) => ({
            title: title || key || "Page text",
            subtitle: `${key || ""}${value ? ` · ${String(value).slice(0, 90)}` : ""}`,
          }),
        },
      }),
    ],
  });

const slug = defineField({
  name: "slug",
  title: "Page address",
  type: "slug",
  description:
    "Keep published addresses stable. Changing this requires a redirect plan.",
  options: { source: "name" },
  validation: (rule) =>
    rule.required().custom(
      (value) =>
        !value?.current ||
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ||
        "Use lowercase words separated by single hyphens.",
    ),
});

const order = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  initialValue: 0,
});

const media = (name = "imageUpload") =>
  defineField({
    name,
    title: name === "imageUpload" ? "Image" : label(name),
    type: "image",
    options: { hotspot: true },
    fields: [text("alt", true), text("caption")],
  });

const legacyImage = defineField({
  name: "image",
  title: "Existing image path",
  type: "string",
  readOnly: true,
  description:
    "Preserved migration asset. Upload an image above to replace it.",
});

const faqFields = [text("question", true), text("answer", true, true)];
const steps = [text("title", true), text("description", true, true)];

const doc = (
  name: string,
  title: string,
  fields: FieldDefinition[],
  preview?: { title: string; subtitle?: string },
) =>
  defineType({
    name,
    title,
    type: "document",
    fields,
    ...(preview
      ? {
          preview: {
            select: {
              title: preview.title,
              ...(preview.subtitle ? { subtitle: preview.subtitle } : {}),
            },
          },
        }
      : {}),
    ...(fields.some((field) => field.name === "order")
      ? {
          orderings: [
            {
              title: "Display order",
              name: "order",
              by: [{ field: "order", direction: "asc" as const }],
            },
          ],
        }
      : {}),
  });

export const businessTypes = [
  doc("siteSettings", "Business settings", [
    text("name", true),
    text("alternateName", true),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^\+?[\d ()-]{10,20}$/, {
          name: "phone number",
          invert: false,
        }),
    }),
    text("displayPhone", true),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    url("googleProfileUrl", true),
    url("instagramUrl", true),
    url("facebookUrl", true),
    text("region", true),
    strings("languages"),
    defineField({
      name: "areasServed",
      title: "Areas served",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
      hidden: true,
      description:
        "Derived from Service areas during the website build. Manage coverage in Service areas instead.",
    }),
    text("quoteLabel", true),
    text("reviewScore"),
    defineField({
      name: "reviewCheckedAt",
      title: "Google rating last checked",
      type: "date",
      description:
        "Rating is manually maintained. Verify it against the source before updating.",
    }),
    text("defaultTitle", true),
    text("defaultDescription", true, true),
    defineField({
      name: "url",
      title: "Production website address",
      type: "url",
      readOnly: true,
    }),
    text("logo"),
    text("heroImage"),
    rows("openingHours", [text("days", true), text("hours", true)], {
      title: "days",
      subtitle: "hours",
    }),
  ], { title: "name", subtitle: "region" }),

  doc("service", "Services", [
    text("name", true),
    slug,
    text("menuLabel", true),
    text("shortName", true),
    order,
    defineField({
      name: "pageEnabled",
      title: "Publish service page",
      type: "boolean",
      initialValue: true,
      description: "Controls whether this service has a public website page.",
    }),
    defineField({
      name: "showInNavigation",
      title: "Show in navigation",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.pageEnabled === false,
      description: "Shows the published service in the website service menu.",
    }),
    text("metaTitle", true),
    text("metaDescription", true, true),
    text("heroTitle", true),
    text("heroDescription", true, true),
    text("summary", true, true),
    media(),
    legacyImage,
    text("imageAlt", true),
    strings("serviceType"),
    strings("heroProofs"),
    strings("concerns"),
    strings("included"),
    rows("process", steps, { title: "title", subtitle: "description" }),
    text("drying", true, true),
    text("limitations", true, true),
    rows("faq", faqFields, { title: "question", subtitle: "answer" }),
    refs("sharedFaqs", "faq"),
    refs("relatedServices", "service"),
    ...[
      "includedHeading",
      "processHeading",
      "afterCareEyebrow",
      "afterCareHeading",
    ].map((name) => text(name)),
  ], { title: "name", subtitle: "slug.current" }),

  doc("location", "Service areas", [
    text("name", true),
    slug,
    order,
    defineField({
      name: "status",
      title: "Service status",
      type: "string",
      initialValue: "active",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Limited", value: "limited" },
          { title: "Not served", value: "not-served" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageEnabled",
      title: "Publish location page",
      type: "boolean",
      initialValue: false,
      description:
        "Coverage can exist without a landing page. Turn this on only when the city has useful public content.",
    }),
    defineField({
      name: "indexInSearch",
      title: "Allow search indexing",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.pageEnabled,
      description:
        "Allows the published location page into the sitemap and search index.",
    }),
    defineField({
      name: "showInFooter",
      title: "Show in footer",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.pageEnabled,
    }),
    defineField({
      name: "expanded",
      title: "Use expanded local page",
      type: "boolean",
      initialValue: false,
      description:
        "Uses the richer local-page layout when the expanded sections below are complete.",
    }),
    text("shortDescription", true, true),
    text("introduction", true, true),
    text("localConsiderations", false, true),
    strings("neighbourhoods"),
    text("mapQuery", true),
    media(),
    legacyImage,
    text("imageAlt"),
    text("metaTitle"),
    text("metaDescription", false, true),
    refs("availableServices", "service"),
    refs("nearbyLocations", "location"),
    rows("faq", faqFields, { title: "question", subtitle: "answer" }),
    refs("sharedFaqs", "faq"),
    defineField({
      name: "expandedContent",
      title: "Expanded location sections",
      type: "object",
      hidden: ({ parent }) => !parent?.expanded,
      fields: [
        text("heroImage"),
        text("mapImage"),
        text("mapAlt"),
        rows(
          "mapLabels",
          [
            text("name", true),
            defineField({
              name: "left",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
            }),
            defineField({
              name: "top",
              type: "number",
              validation: (rule) => rule.min(0).max(100),
            }),
          ],
          { title: "name" },
        ),
        rows("quickBenefits", [text("icon"), ...steps], {
          title: "title",
          subtitle: "description",
        }),
        rows(
          "services",
          [
            text("slug"),
            text("title"),
            text("description", false, true),
            media(),
            legacyImage,
            text("alt"),
          ],
          { title: "title", subtitle: "slug" },
        ),
        rows(
          "resultExamples",
          [
            text("category"),
            text("title"),
            text("description", false, true),
            media(),
            legacyImage,
            text("alt"),
          ],
          { title: "title", subtitle: "category" },
        ),
        rows("processSteps", [text("icon"), ...steps], {
          title: "title",
          subtitle: "description",
        }),
        rows("localAdvantages", [text("icon"), ...steps], {
          title: "title",
          subtitle: "description",
        }),
        rows("mississaugaFaqs", faqFields, {
          title: "question",
          subtitle: "answer",
        }),
        copyRows(),
      ],
    }),
  ], { title: "name", subtitle: "slug.current" }),

  doc("faq", "Common questions", [
    ...faqFields,
    order,
    flag("onHomepage"),
    refs("services", "service"),
    refs("locations", "location"),
  ], { title: "question" }),

  doc("testimonial", "Customer reviews", [
    text("name", true),
    text("text", true, true),
    text("source"),
    url("sourceUrl"),
    defineField({ name: "date", type: "date" }),
    defineField({
      name: "rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    order,
    flag("featured"),
    defineField({
      name: "publicationStatus",
      title: "Publication status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Approved for website", value: "approved" },
          { title: "Withheld", value: "withheld" },
        ],
        layout: "radio",
      },
    }),
    refs("services", "service"),
    refs("locations", "location"),
  ], { title: "name", subtitle: "source" }),

  doc("cleaningProject", "Cleaning results", [
    text("title", true),
    text("category", true),
    text("location", true),
    text("service", true),
    text("label", true),
    media(),
    legacyImage,
    defineField({
      name: "variant",
      type: "string",
      initialValue: "single",
      options: {
        list: [
          { title: "Single image", value: "single" },
          { title: "Paired before/after image", value: "paired" },
        ],
        layout: "radio",
      },
      description:
        "Paired means the original image already contains a side-by-side before/after comparison.",
    }),
    text("fabric"),
    text("problem", false, true),
    text("treatment", false, true),
    text("result", false, true),
    defineField({ name: "date", type: "date" }),
    refs("services", "service"),
    refs("locations", "location"),
    order,
    flag("featured"),
    defineField({
      name: "publicationStatus",
      title: "Publication status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Approved for website", value: "approved" },
          { title: "Withheld", value: "withheld" },
        ],
        layout: "radio",
      },
    }),
  ], { title: "title", subtitle: "location" }),

  doc("quoteCategory", "Quote form choices", [
    text("label", true),
    order,
    flag("enabled", true),
    refs("services", "service"),
  ], { title: "label" }),

  doc("pageContent", "Website pages", [
    text("title", true),
    defineField({
      name: "key",
      title: "Page key",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    refs("featuredServices", "service"),
    rows(
      "heroReviews",
      [text("name", true), text("initial"), text("text", true, true)],
      { title: "name", subtitle: "text" },
    ),
    rows("principles", [text("title", true), text("text", true, true)], {
      title: "title",
      subtitle: "text",
    }),
    copyRows(),
  ], { title: "title", subtitle: "key" }),
];
