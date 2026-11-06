export const businessQuantityQuestions = new Set([
  "armchair_quantity",
  "dining_chair_quantity",
  "other_quantity",
]);

export const isPlusChoice = (choice: string) => /^\d+\+$/.test(choice);
