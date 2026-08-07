"use client";

import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";

const reviews = [
  {
    name: "Kiko44",
    text: "Andrii’s upholstery deep cleaning was exceptional. he managed to completely remove stains in our fabric couch that had been there for years. He also cleaned 6 micro fiber dining chaises and made them look brand new. He is courteous, and thorough and I would use his services again. Highly recommend.",
  },
  {
    name: "Jeff A.",
    text: "It’s so refreshing to see a company that exceeds expectations. My carpets are over 15 years old with heavy traffic from my son and all his sports equipment. I thought for sure they were wasting their time trying to restore my carpets. But I was wrong. They brought them back to life. A lot of places are going to make a lot of promises this one delivers!! Great results and the friendliest people you will ever meet. 6 stars!!",
  },
  {
    name: "Julie Trakos",
    text: "Andrii and his son are incredible!!! They went above and beyond .. they are very very good and detailed. Left very comfortable with them. Would like to give them 10 out of 10 stars",
  },
  {
    name: "Ryan Wilson",
    text: "We had a pet urine issue on our couch and honestly didn’t think it could be cleaned this well. No smell, no stains — it honestly looks like a different couch. They showed up on time, explained what they were doing, and never rushed the job. You can tell they really care about the quality of their work. We’re very happy with the results and wouldn’t hesitate to call SoftNest Fabric Care again.",
  },
  {
    name: "Oleksandr Semenov",
    text: "Great service! I recommend it!",
  },
  {
    name: "Jamal PD",
    text: "Great service and fair price. Our sectional looks so much cleaner, and the team was friendly and professional. Paid $229 and couldn’t be happier. Thanks!",
  },
  {
    name: "Daniel Leblanc",
    text: "Honestly, my sofa and dining chairs were looking pretty tired, but Softnest Fabric Care completely refreshed them. They got out the stubborn stains and everything looks brand new again. If you’re on the fence about getting your furniture cleaned, just call them—you won’t regret it! Thanks again to the team!",
  },
] as const;

function GoogleIcon() {
  return (
    <svg
      className="review-card__google-icon"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.7 6.1 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.7 6.1 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.7 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.6C41.4 36.4 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function HomeReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const maximumIndex = Math.max(0, reviews.length - cardsPerView);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
      setStep(firstCard ? firstCard.getBoundingClientRect().width + gap : 0);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, maximumIndex));
  }, [maximumIndex]);

  const goToReview = (nextIndex: number) => {
    setIndex(Math.min(Math.max(nextIndex, 0), maximumIndex));
  };

  return (
    <section
      id="reviews"
      className="py-16 px-[6%] bg-white border-b border-forestGreen/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="block font-serif text-xs font-bold uppercase tracking-widest text-forestGreen mb-2">
            Customer Reviews
          </span>
          <h2 className="font-serif font-bold text-forestGreen text-3xl uppercase tracking-tight">
            What Our Customers Say
          </h2>
        </div>
        <div
          className="reviews-carousel"
          tabIndex={0}
          aria-label="Customer reviews carousel"
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goToReview(index <= 0 ? maximumIndex : index - 1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goToReview(index >= maximumIndex ? 0 : index + 1);
            }
          }}
        >
          <div
            ref={trackRef}
            className="reviews-carousel__track"
            style={{ transform: `translateX(-${index * step}px)` }}
          >
            {reviews.map((review) => (
              <blockquote className="review-card" key={review.name}>
                <div className="review-card__stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p className="review-card__text">“{review.text}”</p>
                <cite className="review-card__author">
                  <span className="review-card__avatar" aria-hidden="true" />
                  <a
                    href={googleProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-card__name"
                    aria-label={`Read ${review.name}'s review on Google`}
                  >
                    {review.name} <GoogleIcon />
                  </a>
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
        <div className="reviews-carousel__controls">
          <div className="reviews-carousel__dots" aria-label="Choose a review">
            {Array.from({ length: maximumIndex + 1 }, (_, dotIndex) => (
              <button
                type="button"
                className={`reviews-carousel__dot${
                  dotIndex === index ? " is-active" : ""
                }`}
                aria-label={`Go to review ${dotIndex + 1}`}
                aria-current={dotIndex === index ? "true" : undefined}
                onClick={() => goToReview(dotIndex)}
                key={dotIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
