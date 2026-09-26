import Image from "next/image";
import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import { getTestimonials } from "@/content/pages";
import type { Location } from "@/content/locations";
import { siteConfig } from "@/lib/site";

function reviewExcerpt(text: string, maximumLength = 200) {
  if (text.length <= maximumLength) return text;
  const shortened = text.slice(0, maximumLength).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

export default function LocationReviews({ location }: { location: Location }) {
  const reviews = getTestimonials({ location: location.slug, limit: 3 });
  if (!reviews.length) return null;

  const carouselReviews = reviews.map((review) => ({
    initial: review.name.trim().charAt(0).toUpperCase(),
    name: review.name,
    text: reviewExcerpt(review.text),
  }));

  return (
    <section
      className="location-customer-reviews"
      id="reviews"
      aria-labelledby="location-reviews-heading"
    >
      <div className="location-customer-reviews__heading">
        <div>
          <p className="location-eyebrow">Customer feedback</p>
          <span className="location-reviews-rule" aria-hidden="true" />
          <h2 id="location-reviews-heading">What customers say</h2>
        </div>
        <p>
          Feedback from {location.name} customers after professional upholstery
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
          <a
            href={siteConfig.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews <span aria-hidden="true">→</span>
          </a>
        </div>

        <GoogleReviewCarousel
          reviews={carouselReviews}
          googleProfileUrl={siteConfig.googleProfileUrl}
        />
      </div>

      <a
        className="location-customer-reviews__link"
        href={siteConfig.googleProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more reviews on Google <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
