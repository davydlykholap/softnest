"use client";

import Image from "next/image";

type GoogleReview = {
  initial: string;
  name: string;
  text: string;
};

type GoogleReviewCarouselProps = {
  reviews: GoogleReview[];
  googleProfileUrl: string;
};

export default function GoogleReviewCarousel({
  reviews,
  googleProfileUrl,
}: GoogleReviewCarouselProps) {
  return (
    <div className="google-review-cards" aria-label="Recent Google reviews">
      {reviews.map((review) => (
        <a
          className="google-review-card"
          key={review.name}
          href={googleProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open SoftNest Fabric Care on Google Maps to read ${review.name}'s review`}
        >
          <span className="google-review-card__quote-mark" aria-hidden="true">“</span>
          <div className="google-review-card__top">
            <Image
              className="google-g-official"
              src="/img/google-g-official.png"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
            />
            <span aria-label="5 out of 5 stars">★★★★★</span>
          </div>
          <p>“{review.text}”</p>
          <div className="google-review-card__footer">
            <span className="google-review-card__avatar" aria-hidden="true">
              {review.initial}
            </span>
            <span className="google-review-card__author">
              <strong>{review.name}</strong>
            </span>
            <span className="google-review-card__open" aria-hidden="true">↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
