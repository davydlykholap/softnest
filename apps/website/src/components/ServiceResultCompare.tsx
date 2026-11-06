"use client";

import { useState } from "react";
import { GripVerticalIcon } from "@/components/UiIcons";
import Image from "@/components/ResponsiveImage";
import styles from "@/app/services/service-page.module.css";

type ServiceResultCompareProps = {
  image: string;
  label: string;
  variant: "paired" | "single";
  before?: string;
  after?: string;
  eager?: boolean;
};

export default function ServiceResultCompare({
  image,
  label,
  variant,
  before,
  after,
  eager = false,
}: ServiceResultCompareProps) {
  const [position, setPosition] = useState(50);
  if (variant === "single") return <div className={styles.resultCompare}>
    <Image src={image} alt={label} fill sizes="(max-width: 760px) 90vw, 45vw" style={{ objectFit: "cover" }} />
  </div>;

  return (
    <div
      className={`${styles.resultCompare} ${before && after ? "" : styles.resultComparePaired}`}
    >
      <div className={`${styles.resultLayer} ${styles.resultLayerBefore}`}><Image src={before || image} alt={label} fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 760px) 90vw, 80vw" style={before ? {objectFit:"cover"} : undefined} /></div>
      <div
        className={`${styles.resultLayer} ${styles.resultLayerAfter}`}
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      ><Image src={after || image} alt="" fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 760px) 90vw, 80vw" style={after ? {objectFit:"cover"} : undefined} /></div>
      <span className={`${styles.resultLabel} ${styles.resultLabelBefore}`} aria-hidden="true">Before</span>
      <span className={`${styles.resultLabel} ${styles.resultLabelAfter}`} aria-hidden="true">After</span>
      <span
        className={styles.resultDivider}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className={styles.resultGrip}>
          <GripVerticalIcon />
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        aria-label={label}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
      />
    </div>
  );
}
