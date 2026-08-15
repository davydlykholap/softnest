export const siteConfig = {
  name: "SoftNest Fabric Care",
  alternateName: "SoftNest",
  url: "https://softnestcare.ca",
  phone: "+1-416-727-0287",
  displayPhone: "(416) 727-0287",
  email: "softnest.upholstery@outlook.com",
  logo: "https://softnestcare.ca/img/logo/logo1.webp",
  heroImage: "https://softnestcare.ca/images/softnest-hero-room.webp",
  areasServed: [
    "Brampton",
    "Burlington",
    "Etobicoke",
    "Hamilton",
    "Milton",
    "Mississauga",
    "Oakville",
    "Toronto",
    "Vaughan",
  ],
  languages: ["English", "Russian", "Ukrainian"],
  sameAs: [
    "https://maps.app.goo.gl/XHFbygUj49Suv9F48",
    "https://www.instagram.com/softnestfabriccare/",
    "https://www.facebook.com/profile.php?id=61590622653207",
  ],
} as const;

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
