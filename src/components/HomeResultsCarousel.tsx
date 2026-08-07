"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

export type GalleryResult = {
  image: string;
  variant: "paired" | "single";
  category: string;
  location: string;
  service: string;
  label: string;
};

type HomeResultsCarouselProps = {
  results: readonly GalleryResult[];
};

function ComparisonCard({ result }: { result: GalleryResult }) {
  const [position, setPosition] = useState(50);

  return (
    <article className="gallery-result">
      <div
        className={`gallery-compare-card gallery-compare-card--${result.variant}`}
        style={{ "--gallery-image": `url("${result.image}")` } as CSSProperties}
      >
        <div className="gallery-layer gallery-layer--before" />
        <div
          className="gallery-layer gallery-layer--after"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />
        <span className="gallery-category">{result.category}</span>
        <span className="gallery-state gallery-state--before">Before</span>
        <span className="gallery-state gallery-state--after">After</span>
        <span
          className="gallery-divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <b>‹›</b>
        </span>
        <input
          type="range"
          min={15}
          max={85}
          value={position}
          aria-label={result.label}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
        />
      </div>
      <p className="gallery-location">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx={12} cy={10} r="2.5" />
        </svg>
        {result.location}
      </p>
      <p className="gallery-service">{result.service}</p>
    </article>
  );
}

export default function HomeResultsCarousel({ results }: HomeResultsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const cardsPerView = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1260 ? 2 : 4;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 26;
    const nextMax = Math.max(0, results.length - cardsPerView);

    setStep(firstCard.getBoundingClientRect().width + gap);
    setMaxIndex(nextMax);
    setIndex((current) => Math.min(current, nextMax));
  }, [results.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const showPrevious = () => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const showNext = () => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <>
      <button
        id="gallery-previous"
        className="gallery-carousel-arrow gallery-carousel-arrow--prev"
        type="button"
        aria-label="Show previous cleaning results"
        onClick={showPrevious}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <div
        id="gallery-carousel"
        className="gallery-carousel"
        tabIndex={0}
        aria-label={`Before and after cleaning results carousel, showing item ${index + 1} of ${results.length}`}
        onKeyDown={handleKeyDown}
      >
        <div
          ref={trackRef}
          id="gallery-track"
          className="gallery-grid-v2"
          aria-live="polite"
          style={{ transform: `translate3d(-${index * step}px, 0, 0)` }}
        >
          {results.map((result) => (
            <ComparisonCard
              result={result}
              key={`${result.image}-${result.category}`}
            />
          ))}
        </div>
      </div>
      <button
        id="gallery-next"
        className="gallery-carousel-arrow gallery-carousel-arrow--next"
        type="button"
        aria-label="Show more cleaning results"
        onClick={showNext}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </>
  );
}
