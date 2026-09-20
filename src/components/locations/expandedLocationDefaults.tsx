export function FeatureIcon({ name }: { name: string }) {
  if (name === "building") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 28V6h18v22M11 10h3M18 10h3M11 15h3M18 15h3M11 20h3M18 20h3M14 28v-4h4v4" />
      </svg>
    );
  }
  if (name === "fabric") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 11c4-5 16-5 20 0v10c-4 5-16 5-20 0V11Z" />
        <path d="M6 12c5 4 15 4 20 0M10 24c2-5 10-5 12 0" />
      </svg>
    );
  }
  if (name === "dryer") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="4" />
        <path d="M16 12c-1-5 1-8 4-8 3 1 3 5 0 8M20 16c5-1 8 1 8 4-1 3-5 3-8 0M16 20c1 5-1 8-4 8-3-1-3-5 0-8M12 16c-5 1-8-1-8-4 1-3 5-3 8 0" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 10h6l2-3h6l2 3h6v16H5z" />
        <circle cx="16" cy="18" r="5" />
      </svg>
    );
  }
  if (name === "estimate") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 4h12l5 5v19H8zM20 4v6h6M12 15h9M12 20h9" />
      </svg>
    );
  }
  if (name === "cleaning") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M18 4 8 24M13 21l10 5M16 15l7 4M22 8c3 1 5 3 6 6" />
      </svg>
    );
  }
  if (name === "sparkle") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10ZM25 20c.6 3 1.4 3.8 4 4-2.6.2-3.4 1-4 4-.6-3-1.4-3.8-4-4 2.6-.2 3.4-1 4-4Z" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 28s8-7 8-15a8 8 0 1 0-16 0c0 8 8 15 8 15Z" />
        <circle cx="16" cy="13" r="3" />
      </svg>
    );
  }
  if (name === "equipment") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 5h16v20H8zM12 9h8M11 15h10M12 25v3M20 25v3" />
        <circle cx="13" cy="20" r="2" />
        <circle cx="19" cy="20" r="2" />
      </svg>
    );
  }
  if (name === "inspection") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="14" cy="14" r="7" />
        <path d="m19 19 8 8M10 14l3 3 5-6" />
      </svg>
    );
  }
  if (name === "home") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m4 15 12-10 12 10M8 13v14h16V13M13 27v-8h6v8" />
      </svg>
    );
  }
  return null;
}

export const defaultProcessSteps = [
  {
    icon: "camera",
    title: "Send photos",
    description: "Show the full item or carpeted area and include close-ups of stains or concerns.",
  },
  {
    icon: "estimate",
    title: "Receive a clear estimate",
    description: "We confirm the expected scope, included cleaning and access details before booking.",
  },
  {
    icon: "cleaning",
    title: "Inspection & cleaning",
    description: "We inspect the material on site, prepare the work area and use an appropriate method.",
  },
  {
    icon: "sparkle",
    title: "Drying & final review",
    description: "Air movers support drying, followed by a walkthrough and practical after-care guidance.",
  },
];

export const defaultQuickBenefits = [
  {
    icon: "building",
    title: "Access planned in advance",
    description: "Share parking, elevator or entry details when requesting your quote.",
  },
  {
    icon: "fabric",
    title: "Fabric-specific cleaning",
    description: "Methods are selected for upholstery, carpet and area-rug fibres.",
  },
  {
    icon: "dryer",
    title: "Professional drying",
    description: "Air movers support faster and more even drying after cleaning.",
  },
  {
    icon: "camera",
    title: "Free photo estimates",
    description: "Send full-item photos and close-ups before booking.",
  },
];

export const defaultLocalAdvantages = [
  {
    icon: "pin",
    title: "GTA-wide scheduling",
    description: "Appointments are planned across the Greater Toronto Area and nearby communities.",
  },
  {
    icon: "equipment",
    title: "Commercial-grade equipment",
    description: "Professional equipment is selected for upholstery, carpet and suitable area rugs.",
  },
  {
    icon: "inspection",
    title: "Honest stain expectations",
    description: "We explain what appears treatable and where wear or fibre damage may remain.",
  },
  {
    icon: "home",
    title: "Multiple items in one visit",
    description: "Combine furniture, mattresses, carpets and suitable rugs in one estimate request.",
  },
];
