"use client";

import { useState, type CSSProperties } from "react";
import { TbGripVertical } from "react-icons/tb";
import styles from "@/app/services/service-page.module.css";

type ServiceResultCompareProps = {
  image: string;
  label: string;
  variant: "paired" | "single";
};

type CompareStyle = CSSProperties & {
  "--service-result-image": string;
};

export default function ServiceResultCompare({
  image,
  label,
  variant,
}: ServiceResultCompareProps) {
  const [position, setPosition] = useState(50);
  const compareStyle: CompareStyle = {
    "--service-result-image": `url("${image}")`,
  };

  return (
    <div
      className={`${styles.resultCompare} ${styles[`resultCompare${variant === "paired" ? "Paired" : "Single"}`]}`}
      style={compareStyle}
    >
      <div className={`${styles.resultLayer} ${styles.resultLayerBefore}`} />
      <div
        className={`${styles.resultLayer} ${styles.resultLayerAfter}`}
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />
      <span
        className={styles.resultDivider}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className={styles.resultGrip}>
          <TbGripVertical />
        </span>
      </span>
      <input
        type="range"
        min={15}
        max={85}
        value={position}
        aria-label={label}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
      />
    </div>
  );
}
