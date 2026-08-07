"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type BeforeAfterCompareProps = {
  src: string;
  alt: string;
  category: string;
};

type CompareStyle = CSSProperties & {
  "--compare-position": string;
};

export default function BeforeAfterCompare({
  src,
  alt,
  category,
}: BeforeAfterCompareProps) {
  const [position, setPosition] = useState(50);
  const compareStyle: CompareStyle = {
    "--compare-position": `${position}%`,
  };

  return (
    <div className="miss-result-compare" style={compareStyle}>
      <div className="miss-result-compare__image miss-result-compare__image--before">
        <Image src={src} alt={alt} width={1600} height={900} sizes="(max-width: 760px) 100vw, 50vw" />
      </div>
      <div
        className="miss-result-compare__image miss-result-compare__image--after"
        aria-hidden="true"
      >
        <Image src={src} alt="" width={1600} height={900} sizes="(max-width: 760px) 100vw, 50vw" />
      </div>

      <span className="miss-results__category">{category}</span>
      <span className="miss-result-compare__line" aria-hidden="true" />
      <span className="miss-result-compare__label miss-result-compare__label--before">
        Before
      </span>
      <span className="miss-result-compare__label miss-result-compare__label--after">
        After
      </span>

      <input
        className="miss-result-compare__range"
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
        aria-label={`Compare before and after ${category.toLowerCase()} cleaning result`}
      />
    </div>
  );
}
