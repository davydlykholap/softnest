import settings from "@/content/generated/settings.json";
export const siteConfig = { ...settings, phoneHref: `tel:${settings.phone.replace(/[^+0-9]/g, "")}`, emailHref: `mailto:${settings.email}` };

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function organizationProvider() {
  return {
    "@type": "Organization" as const,
    "@id": organizationId,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
  };
}
