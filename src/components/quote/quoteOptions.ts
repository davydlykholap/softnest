import { quoteCategories } from "@/content/quote";

export type QuestionCondition = {
  name: string;
  values: string[];
};

export type QuickQuestion = {
  name: string;
  label: string;
  type?: "select" | "number" | "text";
  choices?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  layout?: "half";
  showWhen?: QuestionCondition;
};

export type OptionPresentation = {
  label: string;
  entryLabel: string;
  image: string;
  imageAlt: string;
  quickQuestions: QuickQuestion[];
};
const optionPresentation: Record<string, OptionPresentation> = {
  "quote-category-1": {
    label: "Sofa or couch",
    entryLabel: "Sofa",
    image: "/images/quote-options/sofa.webp",
    imageAlt: "Three-seat upholstered sofa",
    quickQuestions: [
      { name: "sofa_seats", label: "How many seats?", choices: ["2", "3", "4+"] },
      {
        name: "sofa_style",
        label: "Sofa type",
        choices: ["Standard", "Reclining", "Sleeper / sofa bed", "Not sure"],
      },
    ],
  },
  "quote-category-2": {
    label: "Sectional",
    entryLabel: "Sectional",
    image: "/images/quote-options/sectional.webp",
    imageAlt: "L-shaped upholstered sectional",
    quickQuestions: [
      { name: "sectional_seats", label: "How many seats?", choices: ["3", "4", "5", "6", "7+"] },
      { name: "sectional_chaise", label: "Chaise?", choices: ["Yes", "No", "Not sure"] },
      {
        name: "sectional_style",
        label: "Sectional type",
        choices: ["Standard", "Reclining", "Not sure"],
      },
    ],
  },
  "quote-category-3": {
    label: "Armchair",
    entryLabel: "Armchair group",
    image: "/images/quote-options/armchair.webp",
    imageAlt: "Upholstered armchair",
    quickQuestions: [
      {
        name: "armchair_type",
        label: "Chair type",
        choices: ["Standard / accent", "Wing chair", "Recliner", "Not sure"],
      },
      { name: "armchair_quantity", label: "How many chairs?", choices: ["1", "2", "3+"] },
    ],
  },
  "quote-category-4": {
    label: "Dining chairs",
    entryLabel: "Chair group",
    image: "/images/quote-options/dining-chairs.webp",
    imageAlt: "Pair of upholstered dining chairs",
    quickQuestions: [
      { name: "dining_chair_quantity", label: "How many chairs?", choices: ["1", "2", "4", "6", "8+"] },
      {
        name: "dining_upholstery_area",
        label: "Upholstery area",
        choices: ["Seat only", "Seat & back", "Fully upholstered", "Not sure"],
      },
    ],
  },
  "quote-category-5": {
    label: "Mattress",
    entryLabel: "Mattress",
    image: "/images/quote-options/mattress.webp",
    imageAlt: "Quilted mattress",
    quickQuestions: [
      {
        name: "mattress_size",
        label: "Mattress size",
        choices: ["Twin", "Double / Full", "Queen", "King", "Split king", "Not sure"],
      },
      {
        name: "mattress_cleaning",
        label: "Cleaning needed",
        choices: ["One side", "Both sides", "Not sure"],
      },
    ],
  },
  "quote-category-6": {
    label: "Carpet or rug",
    entryLabel: "Carpet / rug",
    image: "/images/quote-options/rug.webp",
    imageAlt: "Partially rolled woven area rug",
    quickQuestions: [
      {
        name: "carpet_type",
        label: "What type?",
        choices: ["Area rug", "Wall-to-wall carpet", "Stairs / landing"],
      },
      {
        name: "rug_length_ft",
        label: "Length (ft)",
        type: "number",
        min: 1,
        max: 100,
        placeholder: "e.g. 8",
        layout: "half",
        showWhen: { name: "carpet_type", values: ["Area rug"] },
      },
      {
        name: "rug_width_ft",
        label: "Width (ft)",
        type: "number",
        min: 1,
        max: 100,
        placeholder: "e.g. 10",
        layout: "half",
        showWhen: { name: "carpet_type", values: ["Area rug"] },
      },
      {
        name: "rug_material",
        label: "Rug material",
        choices: ["Synthetic", "Wool", "Natural fibre / other", "Not sure"],
        showWhen: { name: "carpet_type", values: ["Area rug"] },
      },
      {
        name: "rug_pile",
        label: "Pile / style",
        choices: ["Low / standard pile", "Shag / long pile", "Not sure"],
        showWhen: { name: "carpet_type", values: ["Area rug"] },
      },
      {
        name: "wall_size_method",
        label: "Size details",
        choices: ["Length × width", "Total square feet", "Not sure"],
        showWhen: { name: "carpet_type", values: ["Wall-to-wall carpet"] },
      },
      {
        name: "wall_length_ft",
        label: "Length (ft)",
        type: "number",
        min: 1,
        max: 300,
        placeholder: "e.g. 15",
        layout: "half",
        showWhen: { name: "wall_size_method", values: ["Length × width"] },
      },
      {
        name: "wall_width_ft",
        label: "Width (ft)",
        type: "number",
        min: 1,
        max: 300,
        placeholder: "e.g. 12",
        layout: "half",
        showWhen: { name: "wall_size_method", values: ["Length × width"] },
      },
      {
        name: "wall_sq_ft",
        label: "Approx. square feet",
        type: "number",
        min: 1,
        max: 10000,
        placeholder: "e.g. 250",
        showWhen: { name: "wall_size_method", values: ["Total square feet"] },
      },
      {
        name: "stair_count",
        label: "Number of stairs",
        type: "number",
        min: 1,
        max: 100,
        placeholder: "e.g. 14",
        layout: "half",
        showWhen: { name: "carpet_type", values: ["Stairs / landing"] },
      },
      {
        name: "landing_count",
        label: "Landings",
        type: "number",
        min: 0,
        max: 20,
        required: false,
        placeholder: "0 if none",
        layout: "half",
        showWhen: { name: "carpet_type", values: ["Stairs / landing"] },
      },
    ],
  },
  "quote-category-7": {
    label: "Other furniture",
    entryLabel: "Item",
    image: "/images/quote-options/other-furniture.webp",
    imageAlt: "Upholstered storage ottoman",
    quickQuestions: [
      {
        name: "other_piece",
        label: "What piece?",
        choices: ["Ottoman", "Bench", "Headboard / bed frame", "Other"],
      },
      { name: "other_quantity", label: "How many pieces?", choices: ["1", "2", "3+"] },
      {
        name: "other_size",
        label: "Approximate size",
        choices: ["Small", "Medium / standard", "Large", "Not sure"],
        showWhen: { name: "other_piece", values: ["Ottoman", "Bench", "Other"] },
      },
      {
        name: "bed_size",
        label: "Bed / headboard size",
        choices: ["Twin", "Double / Full", "Queen", "King", "Not sure"],
        showWhen: { name: "other_piece", values: ["Headboard / bed frame"] },
      },
      {
        name: "other_description",
        label: "Describe the item",
        type: "text",
        max: 80,
        placeholder: "e.g. upholstered office chair",
        showWhen: { name: "other_piece", values: ["Other"] },
      },
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
