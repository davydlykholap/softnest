import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import { siteConfig } from "@/lib/site";

export type CustomerReview = {
  initial: string;
  name: string;
  text: string;
};

type CustomerReviewsSectionProps = {
  heading: string;
  description: string;
  reviews: CustomerReview[];
  headingId?: string;
};

export default function CustomerReviewsSection({
  heading,
  description,
  reviews,
  headingId = "customer-reviews-heading",
}: CustomerReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <section
      className="customer-reviews"
      id="reviews"
      aria-labelledby={headingId}
    >
      <div className="customer-reviews__heading">
        <div>
          <span className="customer-reviews__rule" aria-hidden="true" />
          <h2 id={headingId}>{heading}</h2>
        </div>
        <p>{description}</p>
      </div>
      <GoogleReviewCarousel
        reviews={reviews}
        variant="city"
        googleProfileUrl={siteConfig.googleProfileUrl}
      />
    </section>
  );
}
