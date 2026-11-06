import { expect, test } from "@playwright/test";
import { selectLocationReviews } from "../src/lib/locationReviews";

const local = (id: number) => ({
  id, locations: ["oakville"], publicationStatus: "approved",
  featured: false, locationPageFeatured: false,
});

test("city assignments include every approved local review regardless of display flags", () => {
  const reviews = Array.from({ length: 6 }, (_, index) => local(index));
  expect(selectLocationReviews(reviews, "oakville")).toEqual(reviews);
});

test("unassigned, other-city and unpublished reviews never fill local review slots", () => {
  const reviews = [
    local(1),
    { ...local(2), locations: [], locationPageFeatured: true },
    { ...local(3), locations: ["milton"], locationPageFeatured: true },
    { ...local(4), publicationStatus: "pending" },
    { ...local(5), publicationStatus: "withheld" },
  ];
  expect(selectLocationReviews(reviews, "oakville").map((review) => review.id)).toEqual([1]);
  expect(selectLocationReviews(reviews, "etobicoke")).toEqual([]);
});

test("a review explicitly assigned to multiple cities appears in each assigned city only", () => {
  const review = { ...local(1), locations: ["oakville", "milton"] };
  expect(selectLocationReviews([review], "oakville")).toEqual([review]);
  expect(selectLocationReviews([review], "milton")).toEqual([review]);
  expect(selectLocationReviews([review], "toronto")).toEqual([]);
});
