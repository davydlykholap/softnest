"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  function updateActiveReview() {
    const track = trackRef.current;
    const cards = track ? Array.from(track.children) as HTMLElement[] : [];

    if (!track || cards.length === 0) return;

    const closestIndex = cards.reduce((closest, card, index) => {
      const closestDistance = Math.abs(cards[closest].offsetLeft - track.scrollLeft);
      const cardDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      return cardDistance < closestDistance ? index : closest;
    }, 0);

    setActiveReview(closestIndex);
  }

  function scrollToReview(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;

    if (!track || !card) return;

    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveReview(index);
  }

  return (
    <>
      <div
        className="google-review-cards"
        aria-label="Recent Google reviews"
        ref={trackRef}
        onScroll={updateActiveReview}
      >
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

      <div className="google-review-pagination" aria-label="Choose a review">
        {reviews.map((review, index) => (
          <button
            className={index === activeReview ? "is-active" : ""}
            key={review.name}
            type="button"
            aria-label={`Show review ${index + 1}`}
            aria-current={index === activeReview ? "true" : undefined}
            onClick={() => scrollToReview(index)}
          />
        ))}
      </div>
    </>
  );
}
