import { quoteCategories } from "@/content/quote";

type QuickQuestion = {
  name: string;
  label: string;
  choices: string[];
};

type OptionPresentation = {
  label: string;
  image: string;
  imageAlt: string;
  quickQuestions?: QuickQuestion[];
};

const optionPresentation: Record<string, OptionPresentation> = {
  "quote-category-1": {
    label: "Sofa or couch",
    image: "/images/quote-options/sofa.webp",
    imageAlt: "Three-seat upholstered sofa",
    quickQuestions: [
      { name: "sofa_seats", label: "How many seats?", choices: ["2", "3", "4+"] },
    ],
  },
  "quote-category-2": {
    label: "Sectional",
    image: "/images/quote-options/sectional.webp",
    imageAlt: "L-shaped upholstered sectional",
    quickQuestions: [
      { name: "sectional_seats", label: "How many seats?", choices: ["3", "4", "5", "6", "7+"] },
    ],
  },
  "quote-category-3": {
    label: "Armchair",
    image: "/images/quote-options/armchair.webp",
    imageAlt: "Upholstered armchair",
    quickQuestions: [
      { name: "armchair_quantity", label: "How many chairs?", choices: ["1", "2", "3+"] },
    ],
  },
  "quote-category-4": {
    label: "Dining chairs",
    image: "/images/quote-options/dining-chairs.webp",
    imageAlt: "Pair of upholstered dining chairs",
    quickQuestions: [
      { name: "dining_chair_quantity", label: "How many chairs?", choices: ["2", "4", "6", "8+"] },
      { name: "dining_upholstery_area", label: "Upholstery area", choices: ["Seat only", "Seat & back", "Not sure"] },
    ],
  },
  "quote-category-5": {
    label: "Mattress",
    image: "/images/quote-options/mattress.webp",
    imageAlt: "Quilted mattress",
    quickQuestions: [
      { name: "mattress_size", label: "Mattress size", choices: ["Twin", "Double", "Queen", "King"] },
      { name: "mattress_cleaning", label: "Cleaning needed", choices: ["Top only", "Both sides", "Not sure"] },
    ],
  },
  "quote-category-6": {
    label: "Carpet or rug",
    image: "/images/quote-options/rug.webp",
    imageAlt: "Partially rolled woven area rug",
    quickQuestions: [
      { name: "carpet_type", label: "What type?", choices: ["Area rug", "Wall-to-wall", "Stairs"] },
      { name: "carpet_size", label: "Approximate size", choices: ["Small", "Medium", "Large", "Not sure"] },
    ],
  },
  "quote-category-7": {
    label: "Other furniture",
    image: "/images/quote-options/other-furniture.webp",
    imageAlt: "Upholstered storage ottoman",
    quickQuestions: [
      { name: "other_piece", label: "What piece?", choices: ["Ottoman", "Bench", "Headboard", "Other"] },
      { name: "other_quantity", label: "How many pieces?", choices: ["1", "2", "3+"] },
    ],
  },
};

export const serviceOptions = quoteCategories.map((category) => {
  const presentation = optionPresentation[category.id];
  if (!presentation?.quickQuestions?.length) {
    throw new Error(`Quote option ${category.id} needs a configured question before publishing.`);
  }
  return { ...category, presentation };
});

export type ServiceOption = (typeof serviceOptions)[number];
