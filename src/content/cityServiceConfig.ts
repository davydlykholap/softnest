// Reviewed website coverage. New cities/services require an explicit entry here.
// An empty array disables local service pages for a city; a list limits coverage.
export const cityServiceCoverage: Record<string, "all" | string[]> = {
  mississauga: "all", toronto: "all", brampton: "all", oakville: "all",
  etobicoke: "all", burlington: "all", vaughan: "all", milton: "all", hamilton: "all",
};

// Public labels and safe quote defaults; no customer data belongs in this map.
export const cityServiceProfiles: Record<string, {
  title: string; quote: string; group: "furniture" | "carpet" | "leather" | "mattress" | "pet";
  category?: string; answers?: Record<string, string>;
}> = {
  "upholstery-cleaning": { title: "Upholstery Cleaning", group: "furniture", quote: "List each upholstered item, its approximate size and the areas you want cleaned. Include any care labels and tell us about stains or odours." },
  "sofa-cleaning": { title: "Sofa & Couch Cleaning", group: "furniture", category: "quote-category-1", quote: "Tell us the seat count and any marks you want treated. You can share full-item photos and close-ups if you wish. Mention loose cushions, reclining seats or a sofa bed." },
  "leather-upholstery-cleaning": { title: "Leather Upholstery Cleaning", group: "leather", quote: "Describe the furniture and any worn or marked areas. Photos of the finish or care label are helpful if you want to share them. Tell us about previous products or treatments." },
  "sectional-furniture-cleaning": { title: "Sectional & Furniture Cleaning", group: "furniture", category: "quote-category-2", quote: "Count the seats, chaise sections and loose cushions. A full sectional photo is welcome if you wish. Include matching ottomans or other furniture in the same request." },
  "carpet-area-rug-cleaning": { title: "Carpet & Area Rug Cleaning", group: "carpet", category: "quote-category-6", quote: "List carpeted rooms, stairs and rug dimensions. Describe busy walkways and identify furniture covering the areas you want cleaned. Photos and care labels are welcome if available." },
  "mattress-cleaning": { title: "Mattress Cleaning", group: "mattress", category: "quote-category-5", quote: "Tell us the mattress size, which accessible surfaces need cleaning and what caused any spots. Share photos only if you wish, and allow time for complete drying before replacing bedding." },
  "dining-chair-cleaning": { title: "Dining Chair Cleaning", group: "furniture", category: "quote-category-4", quote: "Count the chairs and tell us whether the seats, backs or both are upholstered. Optional photos of a full chair and any marks can help us plan the work." },
  "armchair-cleaning": { title: "Armchair & Recliner Cleaning", group: "furniture", category: "quote-category-3", quote: "List each chair or recliner and describe the areas you want cleaned. Photos or care labels are welcome if you wish. Mention powered mechanisms and any removable cushions." },
  "stairs-hallways-cleaning": { title: "Carpeted Stairs & Hallway Cleaning", group: "carpet", category: "quote-category-6", answers: { carpet_type: "Stairs / landing" }, quote: "Count the carpeted steps and landings, estimate hallway dimensions and describe the busy areas. Photos are optional. Tell us whether this is the only route between floors." },
  "pet-stain-odour-removal": { title: "Pet Stain & Odour Treatment", group: "pet", quote: "Identify the affected furniture or carpet, the approximate size of each area and whether accidents have repeated. Share previous cleaning attempts and any lingering odour." },
};
