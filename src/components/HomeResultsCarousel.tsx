"use client";

import { responsiveBackground } from "@/lib/responsiveImages";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { GripVerticalIcon } from "@/components/UiIcons";

import useCardCarousel from "@/components/useCardCarousel";
import CarouselArrow from "@/components/CarouselArrow";

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
  const updatePosition = (next: number) => {
    setPosition(next);
  };
  const followPointer = (event: PointerEvent<HTMLInputElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    updatePosition(Math.max(0, Math.min(100, Math.round((event.clientX - bounds.left) / bounds.width * 100))));
  };

  return (
    <article className="gallery-result">
      <div
        className={`gallery-compare-card gallery-compare-card--${result.variant}`}
        data-at-edge={position === 0 || position === 100 ? "true" : undefined}
        style={{ "--gallery-image": responsiveBackground(result.image) } as CSSProperties}
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
        />
        <span className="gallery-divider__grip" style={{ left: `clamp(26px, ${position}%, calc(100% - 26px))` }} aria-hidden="true">
          <GripVerticalIcon />
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label={result.label}
          onChange={(event) => updatePosition(Number(event.currentTarget.value))}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            followPointer(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) followPointer(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              followPointer(event);
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
        />
      </div>
    </article>
  );
}

export default function HomeResultsCarousel({ results }: HomeResultsCarouselProps) {
  const carousel = useCardCarousel(results.length);
  const { trackRef, index, step, maxIndex } = carousel;

  return (
      <div className="gallery-carousel-shell">
        <CarouselArrow direction="prev" label="Show previous cleaning results" disabled={maxIndex === 0} onClick={carousel.previous} />
        <div
          id="gallery-carousel"
          className="gallery-carousel"
          role="region"
          aria-label={`Before and after cleaning results carousel, showing item ${index + 1} of ${results.length}`}
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
        <CarouselArrow direction="next" label="Show next cleaning results" disabled={maxIndex === 0} onClick={carousel.next} />
      </div>
  );
}
