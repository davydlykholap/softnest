// Numeric copy of the price list on /pricing/. Keep both in sync when a price changes.
export type BookingItem = {
  id: string;
  label: string;
  note?: string;
  min: number;
  max: number;
  unit?: string;
  step?: number;
  maxQty?: number;
  // The lower price is for fixed cushions, the higher one for removable cushions.
  cushions?: boolean;
};

export type BookingGuide = { badge: string; title: string; text: string };
export type BookingGroup = { id: string; title: string; guide?: BookingGuide[]; items: BookingItem[] };

export const minimumVisit = 139;
export const downtownExtra = 30;

export const bookingGroups: BookingGroup[] = [
  {
    id: "upholstery",
    title: "Sofas and upholstery",
    guide: [
      { badge: "Lower price", title: "Fixed cushions", text: "The cushions cannot be removed." },
      { badge: "Higher price", title: "Removable cushions", text: "We clean both sides of every cushion, and we do it thoroughly." },
    ],
    items: [
      { id: "loveseat", label: "Loveseat (2 seats)", min: 89, max: 109, cushions: true },
      { id: "sofa-3", label: "Sofa (3 seats)", min: 119, max: 129, cushions: true },
      { id: "sofa-4", label: "Sofa (4 seats)", min: 159, max: 179, cushions: true },
      { id: "chaise-2", label: "2-seat sofa with chaise", min: 159, max: 179, cushions: true },
      { id: "chaise-3", label: "3-seat sofa with chaise", min: 199, max: 219, cushions: true },
      { id: "sectional-5", label: "Sectional, 5 seats", min: 199, max: 219, cushions: true },
      { id: "sectional-6", label: "Sectional, 6 seats", min: 219, max: 239, cushions: true },
      { id: "sectional-7", label: "Sectional, 7 seats", min: 249, max: 269, cushions: true },
      { id: "ottoman", label: "Ottoman", note: "depends on its size", min: 25, max: 30 },
      { id: "pillow", label: "Decorative pillow", min: 5, max: 5 },
    ],
  },
  {
    id: "leather",
    title: "Leather",
    items: [
      { id: "leather-armchair", label: "Leather armchair", min: 59, max: 59 },
      { id: "leather-loveseat", label: "Leather loveseat", min: 109, max: 109 },
      { id: "leather-sofa", label: "Leather sofa (3 seats)", min: 139, max: 139 },
    ],
  },
  {
    id: "chairs",
    title: "Chairs",
    items: [
      { id: "armchair", label: "Armchair", min: 49, max: 49 },
      { id: "recliner", label: "Recliner", min: 59, max: 59 },
      { id: "dining-seat", label: "Dining chair, seat only", note: "depending on how dirty it is", min: 10, max: 15 },
      { id: "dining-full", label: "Dining chair, seat and back", min: 20, max: 25 },
      { id: "chair-full", label: "Fully upholstered chair", min: 25, max: 25 },
    ],
  },
  {
    id: "mattresses",
    title: "Mattresses",
    items: [
      { id: "twin", label: "Twin (single)", note: "one side", min: 89, max: 89 },
      { id: "twin-xl", label: "Twin XL", note: "one side", min: 89, max: 89 },
      { id: "double", label: "Double (full)", note: "one side", min: 99, max: 99 },
      { id: "queen", label: "Queen", note: "one side", min: 109, max: 109 },
      { id: "king", label: "King", note: "one side", min: 129, max: 129 },
      { id: "cal-king", label: "California King", note: "one side", min: 129, max: 129 },
    ],
  },
  {
    id: "carpet",
    title: "Carpet and rugs",
    items: [
      { id: "room", label: "Room (standard size)", min: 50, max: 50 },
      { id: "hallway", label: "Hallway", min: 25, max: 30 },
      { id: "landing", label: "Landing", min: 25, max: 30 },
      { id: "stairs", label: "Stairs", note: "$5 per step", min: 5, max: 5, unit: "steps", maxQty: 60 },
      { id: "rug", label: "Area rug", note: "$1.50 per sq. ft.", min: 1.5, max: 1.5, unit: "sq. ft.", step: 10, maxQty: 600 },
    ],
  },
];
