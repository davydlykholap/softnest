import type { GalleryResult } from "@/components/HomeResultsCarousel";

// Presentation examples belong to the homepage gallery, not to documented
// appointments or city evidence. These are the original homepage assets.
export const homeGalleryExamples: GalleryResult[] = [
  ["/img/sectional_3.webp", "Sofa"],
  ["/img/sectional_1.webp", "Sectional sofa"],
  ["/img/matress_cleaning.webp", "Mattress"],
  ["/img/before_after_carpet_cleaning.webp", "Carpet"],
  ["/img/gray_sofa_stain.png", "Sofa stain"],
  ["/img/dining_chairs.webp", "Dining chairs"],
  ["/img/sectional.png", "Sectional"],
  ["/img/sectional_sofa.png", "Sectional upholstery"],
].map(([image, category]) => ({
  image, category, variant: "paired" as const, location: "", service: "",
  label: `${category}: illustrative before-and-after comparison`,
}));
