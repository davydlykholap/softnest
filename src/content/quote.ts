import records from "@/content/generated/quoteCategories.json";
export const quoteCategories = records;
export const quoteServiceOptions = records.map(item=>item.label);
