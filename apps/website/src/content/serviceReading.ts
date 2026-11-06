type ServiceReading = { before: string; label: string; href: string; after: string };

// One relevant reference in the existing paragraph, not another menu.
export const serviceReading: Record<string, ServiceReading> = {
  "upholstery-cleaning": { before: "Our guide to ", label: "choosing an upholstery cleaner", href: "/blog/how-to-choose-an-upholstery-cleaning-company/", after: " explains what to check before booking." },
  "sofa-cleaning": { before: "For an old mark, our ", label: "couch stain guide", href: "/blog/how-to-remove-stain-from-couch/", after: " explains what to avoid before the appointment." },
  "sectional-furniture-cleaning": { before: "Our ", label: "sofa drying guide", href: "/blog/how-long-does-a-couch-take-to-dry-after-cleaning/", after: " explains how cushions, fabric and airflow affect when seating can be used again." },
  "carpet-area-rug-cleaning": { before: "Our guide to ", label: "vacuuming and deeper carpet cleaning", href: "/blog/does-vacuuming-clean-carpet/", after: " explains the difference between everyday upkeep and a professional clean." },
  "pet-stain-odour-removal": { before: "Our ", label: "pet urine odour guide", href: "/blog/how-to-remove-pet-urine-smell-from-couch/", after: " explains why a smell can return after the surface has been cleaned." },
  "leather-upholstery-cleaning": { before: "Read what our ", label: "leather cleaning and conditioning service", href: "/services/leather-upholstery-cleaning/", after: " includes and how we assess worn or marked finishes." },
  "mattress-cleaning": { before: "See our ", label: "mattress cleaning service details", href: "/services/mattress-cleaning/", after: " for surface-cleaning limits and preparation advice." },
  "dining-chair-cleaning": { before: "Our ", label: "dining chair cleaning overview", href: "/services/dining-chair-cleaning/", after: " explains how we assess seats, backs and fabric differences." },
  "armchair-cleaning": { before: "See the ", label: "armchair and recliner service details", href: "/services/armchair-cleaning/", after: " for the surfaces we assess and how we work around moving parts." },
  "stairs-hallways-cleaning": { before: "Our ", label: "carpeted stair and hallway service", href: "/services/stairs-hallways-cleaning/", after: " explains the step counts and measurements used to plan the work." },
};
