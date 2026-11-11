import type { GalleryResult } from "@/components/HomeResultsCarousel";

// Presentation examples belong to the homepage gallery, not to documented
// appointments or city evidence. These are the original homepage assets.
export const homeGalleryExamples: GalleryResult[] = [
  ["/images/work/waterdown-sectional-sofa-cleaning-before-after.webp", "Sectional sofa"],
  ["/images/work/oakville-curved-loveseat-cleaning-before-after.webp", "Loveseat"],
  ["/images/work/oakville-curved-sofa-cleaning-before-after.webp", "Sofa"],
  ["/images/work/grey-sectional-sofa-cleaning-before-after.webp", "Sofa"],
  ["/images/work/teal-sectional-sofa-cleaning-before-after.webp", "Sectional sofa"],
  ["/images/work/mattress-cleaning-before-after.webp", "Mattress"],
  ["/images/work/hallway-carpet-cleaning-before-after.webp", "Carpet"],
  ["/images/work/stair-carpet-cleaning-comparison.png", "Sofa stain"],
  ["/images/work/dark-dining-chair-cleaning-before-after.webp", "Dining chairs"],
  ["/images/work/beige-sectional-sofa-cleaning-before-after.png", "Sectional"],
  ["/images/work/grey-sectional-sofa-cleaning-comparison.png", "Sectional upholstery"],
].map(([image, category]) => ({
  image, category, variant: "paired" as const, location: "", service: "",
  label: `${category}: illustrative before-and-after comparison`,
}));
