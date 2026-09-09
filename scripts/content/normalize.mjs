import { createImageUrlBuilder } from "@sanity/image-url";

const HOME_COPY_KEYS = [
  ...Array.from({ length: 22 }, (_, index) => `hero-${index + 1}`),
  ...Array.from({ length: 76 }, (_, index) => `sections-${index + 23}`),
];
const ABOUT_COPY_KEYS = Array.from(
  { length: 33 },
  (_, index) => `page-${index + 1}`,
);
const EXPANDED_LOCATION_COPY_KEYS = Array.from(
  { length: 31 },
  (_, index) => `page-${index + 1}`,
);

export function normalizeContent(documents, config) {
  if (!Array.isArray(documents)) throw new Error("Content query did not return documents.");

  const byId = new Map(documents.map((document) => [document._id, document]));
  if (byId.size !== documents.length) throw new Error("Duplicate content IDs.");

  const builder = createImageUrlBuilder(config);

  const fail = (document, message) => {
    throw new Error(`${document?._id || "Content"}: ${message}`);
  };

  const required = (document, keys) => {
    for (const key of keys) {
      if (typeof document[key] !== "string" || !document[key].trim()) {
        fail(document, `Missing ${key}`);
      }
    }
  };

  const ordered = (type) =>
    documents
      .filter((document) => document._type === type)
      .sort(
        (left, right) =>
          (left.order ?? 0) - (right.order ?? 0) ||
          left._id.localeCompare(right._id),
      );

  const references = (document, field, type) =>
    (document[field] ?? []).map((reference) => {
      const target = byId.get(reference._ref);
      if (!target || target._type !== type) {
        fail(document, `Broken ${field} reference: ${reference._ref}`);
      }
      return target;
    });

  const image = (document) =>
    document.imageUpload?.asset
      ? builder.image(document.imageUpload).width(1440).fit("max").auto("format").url()
      : document.image;

  const validateUrl = (value, document, label = "image/link URL") => {
    if (typeof value !== "string" || !/^(\/(?!\/)|https:\/\/)/.test(value)) {
      fail(document, `Invalid ${label}`);
    }
  };

  const faq = (document) => {
    required(document, ["question", "answer"]);
    return { question: document.question, answer: document.answer };
  };

  const slug = (document) => {
    const value = document.slug?.current;
    if (
      typeof value !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ) {
      fail(document, "Invalid slug");
    }
    return value;
  };

  const validateCopy = (document, copy, requiredKeys) => {
    if (!Array.isArray(copy) || !copy.length) fail(document, "Missing page copy");

    const seen = new Set();
    for (const item of copy) {
      required(item, ["key", "text"]);
      if (seen.has(item.key)) fail(document, `Duplicate page-copy key: ${item.key}`);
      seen.add(item.key);
    }

    for (const key of requiredKeys) {
      if (!seen.has(key)) fail(document, `Missing page-copy key: ${key}`);
    }
  };

  for (const type of ["service", "location", "post"]) {
    const seen = new Set();
    for (const document of ordered(type)) {
      const value = slug(document);
      if (seen.has(value)) fail(document, "Duplicate slug");
      seen.add(value);
    }
  }

  const settings = byId.get("siteSettings");
  if (!settings) {
    throw new Error(
      "Business settings are missing. Import the migration before using Sanity mode.",
    );
  }
  required(settings, [
    "name",
    "alternateName",
    "phone",
    "displayPhone",
    "email",
    "url",
    "quoteLabel",
    "googleProfileUrl",
    "instagramUrl",
    "facebookUrl",
    "defaultTitle",
    "defaultDescription",
  ]);
  if (!/^\+?[\d ()-]{10,20}$/.test(settings.phone)) fail(settings, "Invalid phone");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
    fail(settings, "Invalid email");
  }
  for (const key of ["url", "googleProfileUrl", "instagramUrl", "facebookUrl"]) {
    if (!/^https:\/\//.test(settings[key])) fail(settings, `Invalid ${key}`);
  }

  const services = ordered("service").map((document) => {
    required(document, [
      "name",
      "menuLabel",
      "shortName",
      "metaTitle",
      "metaDescription",
      "heroTitle",
      "heroDescription",
      "summary",
      "drying",
      "limitations",
    ]);
    for (const key of ["concerns", "included", "process", "serviceType"]) {
      if (!Array.isArray(document[key]) || !document[key].length) {
        fail(document, `Missing ${key}`);
      }
    }
    for (const step of document.process) required(step, ["title", "description"]);

    const src = image(document);
    validateUrl(src, document, "service image URL");
    const alt = document.imageUpload?.alt || document.imageAlt;
    if (!alt) fail(document, "Missing image description");

    return {
      ...document,
      id: document._id,
      slug: slug(document),
      image: src,
      imageAlt: alt,
      faq: [
        ...(document.faq ?? []),
        ...references(document, "sharedFaqs", "faq"),
      ].map(faq),
      relatedServices: references(document, "relatedServices", "service")
        .filter((service) => service.pageEnabled !== false)
        .map(slug),
    };
  });

  const locations = ordered("location").map((document) => {
    required(document, ["name", "shortDescription", "introduction", "mapQuery"]);
    if (!["active", "limited", "not-served"].includes(document.status)) {
      fail(document, "Missing service status");
    }
    if (document.pageEnabled && document.status === "not-served") {
      fail(document, "A not-served area cannot have a published page");
    }
    if (document.indexInSearch && !document.pageEnabled) {
      fail(document, "Search indexing requires a published location page");
    }
    if (document.showInFooter && !document.pageEnabled) {
      fail(document, "Footer visibility requires a published location page");
    }

    const src = image(document);
    const alt = document.imageUpload?.alt || document.imageAlt;
    if (document.pageEnabled) {
      validateUrl(src, document, "location image URL");
      if (!alt) fail(document, "Published location page is missing image description");
      if (!Array.isArray(document.availableServices) || !document.availableServices.length) {
        fail(document, "Published location page needs at least one available service");
      }
    }

    const expanded = document.expandedContent;
    if (document.expanded) {
      if (!expanded) fail(document, "Expanded sections missing");
      for (const key of [
        "quickBenefits",
        "services",
        "resultExamples",
        "processSteps",
        "localAdvantages",
        "mississaugaFaqs",
        "copy",
      ]) {
        if (!Array.isArray(expanded[key]) || !expanded[key].length) {
          fail(document, `Expanded section ${key} missing`);
        }
      }
      validateUrl(expanded.heroImage, document, "expanded hero image URL");
      if (expanded.mapImage) {
        validateUrl(expanded.mapImage, document, "expanded map image URL");
      }
      validateCopy(document, expanded.copy, EXPANDED_LOCATION_COPY_KEYS);
      for (const item of expanded.services) {
        if (!services.some((service) => service.slug === item.slug && service.pageEnabled !== false)) {
          fail(document, `Unknown expanded service ${item.slug}`);
        }
      }
    }

    return {
      ...document,
      id: document._id,
      slug: slug(document),
      image: src,
      imageAlt: alt,
      localConsiderations: document.localConsiderations || "",
      neighbourhoods: document.neighbourhoods || [],
      faq: [
        ...(document.faq ?? []),
        ...references(document, "sharedFaqs", "faq"),
      ].map(faq),
      availableServices: references(document, "availableServices", "service")
        .filter((service) => service.pageEnabled !== false)
        .map(slug),
      nearbyLocations: references(document, "nearbyLocations", "location")
        .filter(
          (location) => location.pageEnabled && location.status !== "not-served",
        )
        .map(slug),
      ...(expanded
        ? {
            expandedContent: {
              ...expanded,
              services: expanded.services.map((service) => ({
                ...service,
                image: image(service),
                alt: service.imageUpload?.alt || service.alt,
              })),
              resultExamples: expanded.resultExamples.map((result) => ({
                ...result,
                image: image(result),
                alt: result.imageUpload?.alt || result.alt,
              })),
            },
          }
        : {}),
    };
  });

  const pages = {};
  for (const [key, requiredKeys] of [
    ["home", HOME_COPY_KEYS],
    ["about", ABOUT_COPY_KEYS],
  ]) {
    const document = byId.get(`page-content-${key}`);
    if (!document) throw new Error(`Missing ${key} page content`);
    validateCopy(document, document.copy, requiredKeys);
    pages[key] = {
      ...document,
      featuredServices: references(document, "featuredServices", "service")
        .filter((service) => service.pageEnabled !== false)
        .map(slug),
    };
  }

  const projects = ordered("cleaningProject")
    .filter((document) => document.publicationStatus === "approved")
    .map((document) => {
      required(document, ["title", "category", "location", "service", "label"]);
      const src = image(document);
      validateUrl(src, document, "cleaning-result image URL");
      if (!["single", "paired"].includes(document.variant)) {
        fail(document, "Invalid comparison layout");
      }
      return {
        ...document,
        image: src,
        services: references(document, "services", "service").map(slug),
        locations: references(document, "locations", "location").map(slug),
      };
    });

  const testimonials = ordered("testimonial")
    .filter((document) => document.publicationStatus === "approved")
    .map((document) => {
      required(document, ["name", "text"]);
      return {
        ...document,
        services: references(document, "services", "service").map(slug),
        locations: references(document, "locations", "location").map(slug),
      };
    });

  const quoteCategories = ordered("quoteCategory")
    .filter((document) => document.enabled)
    .map((document) => {
      required(document, ["label"]);
      return {
        id: document._id,
        label: document.label,
        services: references(document, "services", "service").map(slug),
      };
    });
  if (!quoteCategories.length) throw new Error("At least one quote choice is required.");

  const posts = ordered("post")
    .map((document) => {
      required(document, ["title", "excerpt", "publishedAt"]);
      if (!Number.isFinite(Date.parse(document.publishedAt))) {
        fail(document, "Invalid publication date");
      }
      if (!Array.isArray(document.body) || !document.body.length) {
        fail(document, "Missing article body");
      }
      for (const block of document.body) {
        if (block._type === "image") {
          if (!block.alt) fail(document, "Article image missing alternative text");
          if (!block.asset?._ref && !block.localPath) {
            fail(document, "Article image missing asset");
          }
        } else if (block._type !== "block" || !Array.isArray(block.children)) {
          fail(document, "Unsupported article block");
        }
      }
      return {
        ...document,
        slug: slug(document),
        author: document.author ? byId.get(document.author._ref)?.name : undefined,
        categories: references(document, "categories", "category").map(
          (category) => category.title,
        ),
        relatedServices: references(document, "relatedServices", "service")
          .filter((service) => service.pageEnabled !== false)
          .map(slug),
      };
    })
    .sort(
      (left, right) =>
        (left.order ?? 99) - (right.order ?? 99) ||
        right.publishedAt.localeCompare(left.publishedAt),
    );

  return {
    settings: {
      ...settings,
      areasServed: locations
        .filter((location) => location.status !== "not-served")
        .map((location) => location.name),
      sameAs: [
        settings.googleProfileUrl,
        settings.instagramUrl,
        settings.facebookUrl,
      ],
    },
    services,
    locations,
    home: pages.home,
    about: pages.about,
    projects,
    testimonials,
    faqs: ordered("faq").filter((document) => document.onHomepage).map(faq),
    quoteCategories,
    posts,
  };
}
