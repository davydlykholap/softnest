"use client";

import { useEffect } from "react";

export default function HomeInteractions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".gallery-compare-card").forEach(
      (card) => {
        const range = card.querySelector<HTMLInputElement>(
          'input[type="range"]',
        );
        const afterLayer = card.querySelector<HTMLElement>(
          ".gallery-layer--after",
        );
        const divider = card.querySelector<HTMLElement>(".gallery-divider");
        if (!range) return;

        const update = () => {
          if (afterLayer) {
            afterLayer.style.clipPath = `inset(0 0 0 ${range.value}%)`;
          }
          if (divider) divider.style.left = `${range.value}%`;
        };
        range.addEventListener("input", update);
        update();
        cleanups.push(() => range.removeEventListener("input", update));
      },
    );

    document
      .querySelectorAll<HTMLElement>(
        "#gallery-dots, .gallery-stage .gallery-dots, .gallery-stage .carousel-dots, .gallery-stage .pagination-dots, .gallery-stage .slider-dots, .gallery-stage .gallery-pagination, .gallery-stage .gallery-carousel__dots, .gallery-stage .results-dots, .gallery-stage .swiper-pagination, .gallery-stage .slick-dots, .gallery-stage [data-gallery-dots]",
      )
      .forEach((element) => element.remove());

    const galleryCarousel =
      document.querySelector<HTMLElement>("#gallery-carousel");
    const galleryTrack = document.querySelector<HTMLElement>("#gallery-track");
    const galleryPrevious =
      document.querySelector<HTMLButtonElement>("#gallery-previous");
    const galleryNext =
      document.querySelector<HTMLButtonElement>("#gallery-next");

    if (galleryCarousel && galleryTrack && galleryPrevious && galleryNext) {
      const cards = Array.from(galleryTrack.children) as HTMLElement[];
      let galleryIndex = 0;

      const cardsPerView = () => {
        if (window.innerWidth <= 700) return 1;
        if (window.innerWidth <= 1260) return 2;
        return 4;
      };

      const maxGalleryIndex = () =>
        Math.max(0, cards.length - cardsPerView());

      const updateGallery = () => {
        const cardWidth = cards[0]?.getBoundingClientRect().width ?? 0;
        const styles = window.getComputedStyle(galleryTrack);
        const gap = Number.parseFloat(styles.columnGap || styles.gap) || 26;
        const maxIndex = maxGalleryIndex();

        galleryIndex = Math.min(Math.max(galleryIndex, 0), maxIndex);
        galleryTrack.style.transform = `translate3d(-${
          galleryIndex * (cardWidth + gap)
        }px, 0, 0)`;
        galleryCarousel.setAttribute(
          "aria-label",
          `Before and after cleaning results carousel, showing item ${
            galleryIndex + 1
          } of ${cards.length}`,
        );
      };

      const showPrevious = () => {
        galleryIndex =
          galleryIndex <= 0 ? maxGalleryIndex() : galleryIndex - 1;
        updateGallery();
      };

      const showNext = () => {
        galleryIndex =
          galleryIndex >= maxGalleryIndex() ? 0 : galleryIndex + 1;
        updateGallery();
      };

      const onGalleryKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      };

      const onGalleryResize = () => {
        galleryIndex = Math.min(galleryIndex, maxGalleryIndex());
        updateGallery();
      };

      galleryPrevious.addEventListener("click", showPrevious);
      galleryNext.addEventListener("click", showNext);
      galleryCarousel.addEventListener("keydown", onGalleryKeyDown);
      window.addEventListener("resize", onGalleryResize);
      updateGallery();

      cleanups.push(() => {
        galleryPrevious.removeEventListener("click", showPrevious);
        galleryNext.removeEventListener("click", showNext);
        galleryCarousel.removeEventListener("keydown", onGalleryKeyDown);
        window.removeEventListener("resize", onGalleryResize);
      });
    }

    const reviewTrack =
      document.querySelector<HTMLElement>("#reviews-track");
    const reviewDots =
      document.querySelector<HTMLElement>("#reviews-dots");
    const reviewCarousel =
      document.querySelector<HTMLElement>("#reviews-carousel");

    if (reviewTrack && reviewDots && reviewCarousel) {
      const cards = Array.from(reviewTrack.children) as HTMLElement[];
      let reviewIndex = 0;
      let autoTimer: ReturnType<typeof setInterval> | undefined;
      const cardsPerView = () => (window.innerWidth >= 768 ? 2 : 1);
      const maxIndex = () => Math.max(0, cards.length - cardsPerView());

      const renderReviewDots = () => {
        reviewDots.replaceChildren();
        for (let index = 0; index <= maxIndex(); index += 1) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = `reviews-carousel__dot${
            index === reviewIndex ? " is-active" : ""
          }`;
          dot.setAttribute("aria-label", `Go to review ${index + 1}`);
          dot.addEventListener("click", () => goToReview(index));
          reviewDots.appendChild(dot);
        }
      };

      const updateReviews = () => {
        const width = cards[0]?.getBoundingClientRect().width ?? 0;
        const styles = window.getComputedStyle(reviewTrack);
        const gap = Number.parseFloat(styles.columnGap || styles.gap) || 24;
        reviewTrack.style.transform = `translateX(-${
          reviewIndex * (width + gap)
        }px)`;
        renderReviewDots();
      };

      const resetAutoAdvance = () => {
        if (autoTimer) clearInterval(autoTimer);
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduceMotion || cards.length <= cardsPerView()) return;
        autoTimer = setInterval(
          () => goToReview(reviewIndex >= maxIndex() ? 0 : reviewIndex + 1),
          6000,
        );
      };

      function goToReview(index: number) {
        reviewIndex = Math.min(Math.max(index, 0), maxIndex());
        updateReviews();
        resetAutoAdvance();
      }

      const onResize = () => {
        reviewIndex = 0;
        updateReviews();
        resetAutoAdvance();
      };
      const pauseReviews = () => {
        if (autoTimer) clearInterval(autoTimer);
      };

      window.addEventListener("resize", onResize);
      reviewCarousel.addEventListener("mouseenter", pauseReviews);
      reviewCarousel.addEventListener("mouseleave", resetAutoAdvance);
      updateReviews();
      resetAutoAdvance();

      cleanups.push(() => {
        if (autoTimer) clearInterval(autoTimer);
        window.removeEventListener("resize", onResize);
        reviewCarousel.removeEventListener("mouseenter", pauseReviews);
        reviewCarousel.removeEventListener("mouseleave", resetAutoAdvance);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
