import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import { getTestimonials } from "@/content/pages";
import type { Location } from "@/content/locations";

export default function LocationReviews({ location }: { location: Location }) {
  const reviews = getTestimonials({ location: location.slug });
  if (reviews.length === 0) return null;

  return (
    <CustomerReviewsSection
      heading={`What ${location.name} customers say`}
      description={`Feedback from ${location.name} customers after professional upholstery and carpet cleaning appointments.`}
      headingId="location-reviews-heading"
      reviews={reviews.map((review) => ({
        initial: review.name.trim().charAt(0).toUpperCase(),
        name: review.name,
        text: review.text,
      }))}
    />
  );
}
