"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { TbChevronLeft, TbChevronRight, TbGripVertical } from "react-icons/tb";

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
        <span
          className="gallery-divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span className="gallery-divider__grip">
            <TbGripVertical />
          </span>
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

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 26;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const carouselWidth = track.parentElement?.getBoundingClientRect().width ?? 0;
    const visibleCards = Math.max(
      1,
      Math.round((carouselWidth + gap) / cardStep),
    );
    const nextMax = Math.max(0, results.length - visibleCards);

    setStep(cardStep);
    setMaxIndex(nextMax);
    setIndex((current) => Math.min(current, nextMax));
  }, [results.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goToResult = useCallback(
    (nextIndex: number) => setIndex(Math.min(Math.max(nextIndex, 0), maxIndex)),
    [maxIndex],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToResult(index <= 0 ? maxIndex : index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToResult(index >= maxIndex ? 0 : index + 1);
    }
  };

  return (
    <>
      <div className="gallery-carousel-shell">
        <button
          className="gallery-carousel-arrow gallery-carousel-arrow--prev"
          type="button"
          aria-label="Show previous cleaning results"
          disabled={maxIndex === 0}
          onClick={() => goToResult(index <= 0 ? maxIndex : index - 1)}
        >
          <TbChevronLeft aria-hidden="true" />
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
          className="gallery-carousel-arrow gallery-carousel-arrow--next"
          type="button"
          aria-label="Show next cleaning results"
          disabled={maxIndex === 0}
          onClick={() => goToResult(index >= maxIndex ? 0 : index + 1)}
        >
          <TbChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="gallery-pagination" aria-label="Choose a cleaning result">
        {results.slice(0, maxIndex + 1).map((result, resultIndex) => (
          <button
            className={`gallery-pagination__dot${resultIndex === index ? " is-active" : ""}`}
            type="button"
            aria-label={`Show ${result.category.toLowerCase()} result ${resultIndex + 1}`}
            aria-current={resultIndex === index ? "true" : undefined}
            onClick={() => goToResult(resultIndex)}
            key={`${result.image}-dot`}
          />
        ))}
      </div>
    </>
  );
}
