import settings from "@/content/generated/settings.json";

export const siteConfig = {
  ...settings,
  phoneHref: `tel:${settings.phone.replace(/[^+0-9]/g, "")}`,
  emailHref: `mailto:${settings.email}`,
  // Opens the Reviews tab of the Google Maps listing, so visitors land on the reviews and not the overview.
  googleReviewsUrl: "https://www.google.com/maps/place/SoftNest+Fabric+Care/data=!4m8!3m7!1s0x6be0a8deec1aede5:0x504db9579f1fd1df!8m2!3d43.570693!4d-79.6382321!9m1!1b1!16s%2Fg%2F11zgm61s1y",
};

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
