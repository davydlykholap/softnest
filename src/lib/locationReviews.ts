type LocatedReview = {
  publicationStatus: string;
  locations: readonly string[];
};

// City assignment is sufficient: homepage and legacy display flags must not
// exclude a local review or make an unassigned review appear local.
export function selectLocationReviews<T extends LocatedReview>(
  reviews: readonly T[],
  location: string,
): T[] {
  return reviews.filter(
    (review) => review.publicationStatus === "approved" && review.locations.includes(location),
  );
}
