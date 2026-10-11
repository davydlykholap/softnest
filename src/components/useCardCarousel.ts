"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";

export default function useCardCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const width = track.parentElement?.getBoundingClientRect().width ?? 0;
    const visible = Math.max(1, Math.floor((width + gap + 1) / cardStep));
    const nextMax = Math.max(0, count - visible);
    setStep(cardStep);
    setMaxIndex(nextMax);
    setIndex(current => Math.min(current, nextMax));
  }, [count]);

  useEffect(() => {
    const viewport = trackRef.current?.parentElement;
    if (!viewport) return;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  const previous = () => setIndex(current => current <= 0 ? maxIndex : current - 1);
  const next = () => setIndex(current => current >= maxIndex ? 0 : current + 1);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
    if (event.key === "ArrowRight") { event.preventDefault(); next(); }
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStart.current = event.touches[0].clientX; };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const distance = touchStart.current - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 40) { if (distance > 0) next(); else previous(); }
    touchStart.current = null;
  };
  return { trackRef, index, step, maxIndex, previous, next, onKeyDown, onTouchStart, onTouchEnd };
}
