"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./WorkGallery.module.css";

export default function WorkCityRail({ children, city, count }: { children: ReactNode; city: string; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: false });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setEdges({ previous: element.scrollLeft > 2, next: element.scrollLeft + element.clientWidth < element.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className={styles.rail}>
    <div id={`work-${city}-track`} ref={track} className={styles.track} data-city-track={city} role="group" aria-label={`${city} projects`}>
      {children}
    </div>
    {count > 1 && (edges.previous || edges.next) ? <div className={styles.railControls} aria-label={`${city} project navigation`}>
      <button type="button" onClick={() => move(-1)} disabled={!edges.previous} aria-label={`Previous ${city} projects`} aria-controls={`work-${city}-track`}>←</button>
      <button type="button" onClick={() => move(1)} disabled={!edges.next} aria-label={`Next ${city} projects`} aria-controls={`work-${city}-track`}>→</button>
    </div> : null}
  </div>;
}
