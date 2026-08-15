"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

const galleryResults = [
  {
    image: "/img/before_after_carpet_cleaning.webp",
    variant: "paired",
    category: "Carpet",
    location: "Brampton, ON",
    service: "Deep carpet cleaning",
    label: "Compare carpet before and after cleaning",
  },
  {
    image: "/img/sectional_3.webp",
    variant: "paired",
    category: "Sofa",
    location: "Mississauga, ON",
    service: "Pet stains & odour removal",
    label: "Compare sofa before and after cleaning",
  },
  {
    image: "/img/sectional_1.webp",
    variant: "paired",
    category: "Sectional Sofa",
    location: "Oakville, ON",
    service: "Deep cleaning",
    label: "Compare sectional sofa before and after cleaning",
  },
  {
    image: "/img/matress_cleaning.webp",
    variant: "paired",
    category: "Mattress",
    location: "Toronto, ON",
    service: "Stain & odour removal",
    label: "Compare mattress before and after cleaning",
  },
  {
    image: "/img/gray_sofa_stain.png",
    variant: "paired",
    category: "Sofa",
    location: "GTA, ON",
    service: "Stain treatment",
    label: "Compare stained sofa before and after cleaning",
  },
  {
    image: "/img/dining_chairs.webp",
    variant: "paired",
    category: "Dining Chairs",
    location: "GTA, ON",
    service: "Upholstery cleaning",
    label: "Compare dining chairs before and after cleaning",
  },
  {
    image: "/img/sectional.png",
    variant: "paired",
    category: "Sectional",
    location: "GTA, ON",
    service: "Full sectional cleaning",
    label: "Compare sectional before and after cleaning",
  },
  {
    image: "/img/sectional_sofa.png",
    variant: "paired",
    category: "Sectional Sofa",
    location: "GTA, ON",
    service: "Deep fabric cleaning",
    label: "Compare sectional sofa before and after deep cleaning",
  },
] as const;

export default function HomeResultsGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(() =>
    galleryResults.map(() => 50),
  );

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>(".gallery-result");
    if (!carousel || !firstCard) return;

    const track = firstCard.parentElement;
    const trackStyles = track ? window.getComputedStyle(track) : null;
    const gap = Number.parseFloat(trackStyles?.columnGap || trackStyles?.gap || "0");
    const step = firstCard.getBoundingClientRect().width + gap;
    const maximum = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const atStart = carousel.scrollLeft <= 4;
    const atEnd = carousel.scrollLeft >= maximum - 4;
    const target =
      direction === 1
        ? atEnd
          ? 0
          : Math.min(maximum, carousel.scrollLeft + step)
        : atStart
          ? maximum
          : Math.max(0, carousel.scrollLeft - step);

    carousel.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      id="results"
      className="gallery-section-v2"
      aria-labelledby="gallery-heading"
    >
      <Image
        className="gallery-leaves"
        src="/img/gallery-leaves.webp"
        alt=""
        width={280}
        height={180}
        aria-hidden="true"
      />
      <div className="gallery-intro">
        <div className="gallery-intro__copy">
          <p className="gallery-eyebrow">Real Results. Real Homes.</p>
          <h2 id="gallery-heading">
            Before &amp; After Results
            <br />
            <span>You Can See and Feel.</span>
          </h2>
          <p className="gallery-description">
            From everyday messes to tough stains and odours,
            <br />
            see how we bring furniture and carpets back to life.
          </p>
        </div>
        <ul className="gallery-proofs" aria-label="SoftNest service assurances">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>
              Careful Work
              <br />
              Clear Expectations
            </span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 5-1 11-7 12m-1 6c0-3 1-7 5-10" />
            </svg>
            <span>
              Fabric-Appropriate
              <br />
              Products
            </span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>
              Professional
              <br />
              Equipment
            </span>
          </li>
        </ul>
      </div>

      <div className="gallery-stage">
        <span className="gallery-stage__down" aria-hidden="true">
          ⌄
        </span>
        <button
          className="gallery-carousel-arrow gallery-carousel-arrow--prev"
          type="button"
          aria-label="Show previous cleaning results"
          onClick={() => moveCarousel(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <div
          ref={carouselRef}
          className="gallery-carousel"
          tabIndex={0}
          aria-label="Before and after cleaning results carousel"
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              moveCarousel(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              moveCarousel(1);
            }
          }}
        >
          <div className="gallery-grid-v2">
            {galleryResults.map((result, index) => {
              const position = positions[index];
              return (
                <article
                  className="gallery-result"
                  key={`${result.image}-${result.category}`}
                >
                  <div
                    className={`gallery-compare-card gallery-compare-card--${result.variant}`}
                  >
                    <div className="gallery-layer gallery-layer--before">
                      <Image
                        src={result.image}
                        alt={`${result.category} before professional cleaning`}
                        width={1600}
                        height={900}
                        sizes="(max-width: 700px) 88vw, (max-width: 1260px) 44vw, 22vw"
                      />
                    </div>
                    <div
                      className="gallery-layer gallery-layer--after"
                      style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                    >
                      <Image
                        src={result.image}
                        alt=""
                        width={1600}
                        height={900}
                        sizes="(max-width: 700px) 88vw, (max-width: 1260px) 44vw, 22vw"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="gallery-category">{result.category}</span>
                    <span className="gallery-state gallery-state--before">
                      Before
                    </span>
                    <span className="gallery-state gallery-state--after">
                      After
                    </span>
                    <span
                      className="gallery-divider"
                      style={{ left: `${position}%` }}
                    >
                      <b>‹›</b>
                    </span>
                    <input
                      type="range"
                      min={15}
                      max={85}
                      value={position}
                      aria-label={result.label}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const nextPosition = Number(event.target.value);
                        setPositions((current) =>
                          current.map((value, itemIndex) =>
                            itemIndex === index ? nextPosition : value,
                          ),
                        );
                      }}
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
            })}
          </div>
        </div>
        <button
          className="gallery-carousel-arrow gallery-carousel-arrow--next"
          type="button"
          aria-label="Show more cleaning results"
          onClick={() => moveCarousel(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
        <a className="gallery-more" href="#reviews">
          View More Results <span>→</span>
        </a>
        <span className="gallery-sparkle" aria-hidden="true">
          ✧
        </span>
      </div>
    </section>
  );
}
