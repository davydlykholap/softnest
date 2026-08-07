"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HomeReview = {
  name: string;
  text: string;
};

type HomeReviewsCarouselProps = {
  reviews: readonly HomeReview[];
  googleProfileUrl: string;
};

function GoogleIcon() {
  return (
    <svg className="review-card__google-icon" viewBox="0 0 48 48" aria-label="View on Google">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.7 6.1 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.7 6.1 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.7 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.6C41.4 36.4 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

export default function HomeReviewsCarousel({ reviews, googleProfileUrl }: HomeReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(Math.max(0, reviews.length - 2));

  const measure = useCallback(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 24;
    const nextMax = Math.max(0, reviews.length - cardsPerView);

    setStep(firstCard.getBoundingClientRect().width + gap);
    setMaxIndex(nextMax);
    setIndex((current) => Math.min(current, nextMax));
  }, [reviews.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <>
      <div className="reviews-carousel" id="reviews-carousel" aria-live="polite">
        <div
          ref={trackRef}
          className="reviews-carousel__track"
          id="reviews-track"
          style={{ transform: `translateX(-${index * step}px)` }}
        >
          {reviews.map((review) => (
            <blockquote className="review-card" key={review.name}>
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">“{review.text}”</p>
              <cite className="review-card__author">
                <div className="review-card__avatar" />
                <span>
                  <a
                    href={googleProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-card__name"
                  >
                    {review.name} <GoogleIcon />
                  </a>
                </span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
      <div className="reviews-carousel__controls">
        <div className="reviews-carousel__dots" id="reviews-dots">
          {Array.from({ length: maxIndex + 1 }, (_, dotIndex) => (
            <button
              type="button"
              className={`reviews-carousel__dot${dotIndex === index ? " is-active" : ""}`}
              aria-label={`Go to review ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              key={dotIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
}
