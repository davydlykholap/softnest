import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import { getGoogleReviews } from "@/content/pages";

export default function LocationReviews() {
  const reviews = getGoogleReviews();
  if (reviews.length === 0) return null;

  return (
    <CustomerReviewsSection
      heading="What our customers say"
      description="Feedback from SoftNest customers across our service area after professional upholstery and carpet cleaning appointments."
      headingId="location-reviews-heading"
      reviews={reviews}
      sampleSize={3}
    />
  );
}
