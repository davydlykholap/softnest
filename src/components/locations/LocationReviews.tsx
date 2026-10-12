import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import { getTestimonials } from "@/content/pages";
import type { Location } from "@/content/locations";

export default function LocationReviews({ location }: { location: Location }) {
  const reviews = getTestimonials({ location: location.slug, limit: 3 });
  const hasVerifiedLocalReviews = reviews.length > 0 && reviews.every((review) => review.locations.includes(location.slug));

  return (
    <CustomerReviewsSection
      heading={hasVerifiedLocalReviews ? `What ${location.name} customers say` : "What our customers say"}
      description={`Feedback from ${hasVerifiedLocalReviews ? `${location.name} customers` : "SoftNest customers"} after professional upholstery and carpet cleaning appointments.`}
      headingId="location-reviews-heading"
      reviews={reviews.map((review) => ({
        initial: review.name.trim().charAt(0).toUpperCase(),
        name: review.name,
        text: review.text,
      }))}
    />
  );
}
