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
