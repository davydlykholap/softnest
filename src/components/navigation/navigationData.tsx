import type { Service } from "@/content/services";

export type NavigationService = Pick<
  Service,
  "slug" | "menuLabel" | "summary" | "image" | "imageAlt"
>;

type ServiceIconName =
  | "sofa"
  | "paw"
  | "sectional"
  | "rug"
  | "mattress"
  | "chair"
  | "armchair"
  | "stairs";

export const iconBySlug: Record<string, ServiceIconName> = {
  "sofa-cleaning": "sofa",
  "pet-stain-odour-removal": "paw",
  "sectional-furniture-cleaning": "sectional",
  "carpet-area-rug-cleaning": "rug",
  "mattress-cleaning": "mattress",
  "dining-chair-cleaning": "chair",
  "armchair-cleaning": "armchair",
  "stairs-hallways-cleaning": "stairs",
};

export const navigation = [
  { label: "Blog", href: "/blog/" },
  { label: "About Us", href: "/about/" },
] as const;

export const mobileServiceSlugs = [
  "sofa-cleaning",
  "carpet-area-rug-cleaning",
  "pet-stain-odour-removal",
  "sectional-furniture-cleaning",
] as const;

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "paw":
      return (
        <svg {...commonProps}>
          <path d="M8.4 11.2c1.1-1.5 2.1-2.3 3.6-2.3s2.5.8 3.6 2.3c1.6 2.2 2.7 3.3 2.7 5.1 0 1.9-1.6 3.1-3.4 3.1-1.1 0-1.8-.5-2.9-.5s-1.8.5-2.9.5c-1.8 0-3.4-1.2-3.4-3.1 0-1.8 1.1-2.9 2.7-5.1Z" />
          <path d="M5.2 9.8c-1.2.1-2.2-1.1-2.3-2.6S3.5 4.4 4.7 4.3 6.9 5.4 7 6.9s-.6 2.8-1.8 2.9Z" />
          <path d="M9.6 7.3C8.4 7.2 7.6 6 7.8 4.5S9 1.9 10.2 2s2 1.3 1.8 2.8-1.2 2.6-2.4 2.5Z" />
          <path d="M14.4 7.3c1.2-.1 2-1.3 1.8-2.8S15 1.9 13.8 2s-2 1.3-1.8 2.8 1.2 2.6 2.4 2.5Z" />
          <path d="M18.8 9.8c1.2.1 2.2-1.1 2.3-2.6s-.6-2.8-1.8-2.9-2.2 1.1-2.3 2.6.6 2.8 1.8 2.9Z" />
        </svg>
      );
    case "rug":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" />
          <path d="M8 3.5v17M16 3.5v17M9.7 8.2h4.6M9.7 12h4.6M9.7 15.8h4.6" />
        </svg>
      );
    case "mattress":
      return (
        <svg {...commonProps}>
          <path d="M3 9.5h18v7H3zM5 6.5h14a2 2 0 0 1 2 2v1H3v-1a2 2 0 0 1 2-2Z" />
          <path d="M5 16.5v2M19 16.5v2M7 9.5v7M17 9.5v7" />
        </svg>
      );
    case "chair":
      return (
        <svg {...commonProps}>
          <path d="M7 4.5h10v8H7zM6 12.5h12v3H6zM8 15.5v4M16 15.5v4" />
        </svg>
      );
    case "armchair":
      return (
        <svg {...commonProps}>
          <path d="M7 8V5.5A2.5 2.5 0 0 1 9.5 3h5A2.5 2.5 0 0 1 17 5.5V8" />
          <path d="M6 8.5h12a2 2 0 0 1 2 2v5H4v-5a2 2 0 0 1 2-2Z" />
          <path d="M7 15.5v3M17 15.5v3M4 12.5h16" />
        </svg>
      );
    case "stairs":
      return (
        <svg {...commonProps}>
          <path d="M4 19h5v-4h4v-4h4V7h3" />
          <path d="M4 15h5M9 11h4M13 7h4" />
        </svg>
      );
    case "sectional":
      return (
        <svg {...commonProps}>
          <path d="M4 9V6.5A2.5 2.5 0 0 1 6.5 4H15a2 2 0 0 1 2 2v3" />
          <path d="M4 9h13a3 3 0 0 1 3 3v4H4z" />
          <path d="M9 9v7M4 16v2M18 16v2" />
        </svg>
      );
    case "sofa":
    default:
      return (
        <svg {...commonProps}>
          <path d="M5 10V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5V10" />
          <path d="M4 9.5a2 2 0 0 0-2 2v4.5h20v-4.5a2 2 0 0 0-2-2" />
          <path d="M7 10v6M17 10v6M5 16v2.5M19 16v2.5" />
        </svg>
      );
  }
}
