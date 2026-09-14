import Link from "next/link";
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

  const hasLocalReview = reviews.some((review) =>
    review.locations.includes(location.slug),
  );

  return (
    <section
      className="location-customer-reviews"
      aria-labelledby="location-reviews-heading"
    >
      <div className="location-customer-reviews__heading">
        <div>
          <p className="location-eyebrow">Customer feedback</p>
          <h2 id="location-reviews-heading">
            {hasLocalReview
              ? `What customers in ${location.name} say`
              : "What customers say about SoftNest"}
          </h2>
        </div>
        <p>
          Experiences shared by customers after professional upholstery and
          carpet cleaning appointments.
        </p>
      </div>

      <div className="location-customer-reviews__grid">
        {reviews.map((review) => (
          <blockquote key={review._id}>
            <div aria-label="5 out of 5 stars">★★★★★</div>
            <p>“{reviewExcerpt(review.text)}”</p>
            <footer>
              <cite>{review.name}</cite>
              <span>
                Google review
                {review.locations.includes(location.slug)
                  ? ` · ${location.name}`
                  : ""}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>

      <Link
        className="location-customer-reviews__link"
        href={siteConfig.googleProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more reviews on Google <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
