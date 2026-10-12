import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import Image from "next/image";
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
  compactDesktop?: boolean;
};

export default function CustomerReviewsSection({
  heading,
  description,
  reviews,
  headingId = "customer-reviews-heading",
  compactDesktop = false,
}: CustomerReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <section
      className={`customer-reviews${compactDesktop ? " customer-reviews--compact-desktop" : ""}`}
      id="reviews"
      aria-labelledby={headingId}
    >
      <div className="customer-reviews__heading">
        <div className="customer-reviews__title-group">
          <span className="customer-reviews__rule" aria-hidden="true" />
          <h2 id={headingId}>
            <span className="customer-reviews__full-title">{heading}</span>
            {compactDesktop && (
              <span className="customer-reviews__compact-title">
                Google Reviews
                <Image src="/img/google-g-official.svg" alt="" width={32} height={32} />
              </span>
            )}
          </h2>
        </div>
        <p>{description}</p>
        {compactDesktop && (
          <div className="customer-reviews__rating" aria-label="5 out of 5 stars">
            <span aria-hidden="true">5</span>
            <span className="customer-reviews__rating-stars" aria-hidden="true">★★★★★</span>
          </div>
        )}
      </div>
      <GoogleReviewCarousel
        reviews={reviews}
        variant="city"
        googleProfileUrl={siteConfig.googleProfileUrl}
      />
    </section>
  );
}
