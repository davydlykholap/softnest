import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import { getGoogleReviews } from "@/content/pages";
import { getWorkReviews } from "@/content/work";

export default function LocationReviews({ city, cityName, service }: { city?: string; cityName?: string; service?: string } = {}) {
  const localOnly = Boolean(city && service);
  const reviews = localOnly ? getWorkReviews({ city, service }).map(review => ({
    name: review.name, text: review.text, initial: review.name.trim().charAt(0).toUpperCase(),
  })) : getGoogleReviews();
  if (reviews.length === 0) return null;

  return (
    <CustomerReviewsSection
      heading="What our customers say"
      description={localOnly ? `Feedback from ${cityName} customers after local cleaning appointments.` : "Feedback from SoftNest customers across our service area after professional upholstery and carpet cleaning appointments."}
      headingId="location-reviews-heading"
      reviews={reviews}
      sampleSize={3}
    />
  );
}
