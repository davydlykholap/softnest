import Image from "next/image";
import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import { getGoogleReviews } from "@/content/pages";
import type { Location } from "@/content/locations";
import { siteConfig } from "@/lib/site";


export default function LocationReviews({ heading }: { location: Location; heading?: string }) {
  const reviews = getGoogleReviews();
  if (!reviews.length) return null;

  const carouselReviews = reviews;

  return (
    <section
      className="location-customer-reviews"
      id="reviews"
      aria-labelledby="location-reviews-heading"
    >
      <div className="location-customer-reviews__heading">
        <div>
          <span className="location-reviews-rule" aria-hidden="true" />
          <h2 id="location-reviews-heading">{heading ?? "What customers say"}</h2>
        </div>
        <p>
          Feedback from SoftNest customers after professional upholstery
          and carpet cleaning appointments.
        </p>
      </div>

      <div className="location-review-experience">
        <div className="location-review-mobile-summary google-review-summary">
          <div className="google-review-summary__brand">
            <Image
              className="google-review-summary__g"
              src="/img/google-g-official.svg"
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
            />
            <span className="google-review-summary__mobile-label">Google Reviews</span>
          </div>
          <div className="google-review-summary__score">
            <strong>{siteConfig.reviewScore}</strong>
            <span aria-label="5 out of 5 stars">★★★★★</span>
          </div>
        </div>

        <GoogleReviewCarousel
          reviews={carouselReviews}
          googleProfileUrl={siteConfig.googleProfileUrl}
        />
      </div>
    </section>
  );
}
