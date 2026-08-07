"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroComparison() {
  const [position, setPosition] = useState(50);

  return (
    <div className="compare">
      <div className="compare__image compare__image--before" />
      <div
        className="compare__image compare__image--after"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />
      <span className="compare__label compare__label--before">Before</span>
      <span className="compare__label compare__label--after">After</span>
      <span className="compare__drag-label">Drag to see</span>
      <span className="compare__line" style={{ left: `${position}%` }}>
        <span className="compare__handle">
          <Image
            src="/img/logo/header_logo.webp"
            alt=""
            width={78}
            height={78}
            aria-hidden="true"
          />
        </span>
      </span>
      <input
        className="compare__range"
        type="range"
        min="12"
        max="88"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Reveal the cleaned sofa"
      />
    </div>
  );
}
