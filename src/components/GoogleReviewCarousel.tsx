"use client";

import Image from "next/image";
import CardArrow, { cardArrowHostClassName } from "@/components/CardArrow";
import { startTransition, useEffect, useState } from "react";
import useCardCarousel from "@/components/useCardCarousel";
import CarouselArrow from "@/components/CarouselArrow";
import styles from "./GoogleReviewCarousel.module.css";

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
  const [orderedReviews, setOrderedReviews] = useState(reviews);
  const { trackRef, index, step, maxIndex, previous, next, onKeyDown, onTouchStart, onTouchEnd } = useCardCarousel(reviews.length);

  useEffect(() => {
    const shuffled = [...reviews];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    startTransition(() => setOrderedReviews(shuffled));
  }, [reviews]);

  return (
    <div className={`gallery-carousel-shell review-carousel ${styles.carousel}`}>
    <div className={styles.viewport} tabIndex={0} aria-label="Customer reviews carousel" onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div ref={trackRef} style={{ transform: `translate3d(-${index * step}px, 0, 0)` }} className={`google-review-cards ${styles.track}`} aria-label="Customer reviews">
      {orderedReviews.map((review) => (
        <a
          className={`google-review-card ${cardArrowHostClassName}`}
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
              src="/img/google-g-official.svg"
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
            <CardArrow className="review-card-arrow" />
          </div>
        </a>
      ))}
    </div>
    </div>
    <div className={styles.controls}>
    <CarouselArrow direction="prev" label="Previous reviews" disabled={maxIndex === 0} onClick={previous} />
    <CarouselArrow direction="next" label="Next reviews" disabled={maxIndex === 0} onClick={next} />
    </div>
    </div>
  );
}
