import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPage from "@/components/LocationPage";
import MississaugaPage from "@/components/MississaugaPage";
import { getLocation, locations } from "@/data/locations";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) return {};

  const title =
    location.slug === "mississauga"
      ? "Upholstery & Carpet Cleaning in Mississauga | SoftNest"
      : `Upholstery Cleaning ${location.name} | SoftNest`;
  const description =
    location.slug === "mississauga"
      ? "Professional upholstery and carpet cleaning in Mississauga for sofas, sectionals, chairs, stairs and area rugs. Free photo estimates and professional drying included."
      : location.shortDescription;
  const path = `/location/${location.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images:
        location.slug === "mississauga"
          ? [
              {
                url: "/images/softnest-hero-room.webp",
                width: 1736,
                height: 906,
                alt: "SoftNest upholstery and carpet cleaning in Mississauga",
              },
            ]
          : undefined,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();

  if (location.slug === "mississauga") {
    return <MississaugaPage location={location} />;
  }

  return <LocationPage location={location} />;
}
