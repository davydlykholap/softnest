import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import { getTestimonials } from "@/content/pages";
import type { Location } from "@/content/locations";
import { siteConfig } from "@/lib/site";

export default function LocationReviews({ location }: { location: Location }) {
  const reviews = getTestimonials({ location: location.slug, limit: 3 });
  if (!reviews.length) return null;
  const hasVerifiedLocalReviews = reviews.every((review) => review.locations.includes(location.slug));

  const carouselReviews = reviews.map((review) => ({
    initial: review.name.trim().charAt(0).toUpperCase(),
    name: review.name,
    text: review.text,
  }));

  return (
    <section
      className="location-customer-reviews"
      id="reviews"
      aria-labelledby="location-reviews-heading"
    >
      <div className="location-customer-reviews__heading">
        <div>
          <span className="location-reviews-rule" aria-hidden="true" />
          <h2 id="location-reviews-heading">{hasVerifiedLocalReviews ? `What ${location.name} customers say` : "What our customers say"}</h2>
        </div>
        <p>
          Feedback from {hasVerifiedLocalReviews ? `${location.name} customers` : "SoftNest customers"} after professional upholstery
          and carpet cleaning appointments.
        </p>
      </div>

      <div className="location-review-experience">
        <GoogleReviewCarousel
          reviews={carouselReviews}
          variant="city"
          googleProfileUrl={siteConfig.googleProfileUrl}
        />
      </div>
    </section>
  );
}
