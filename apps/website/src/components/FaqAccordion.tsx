import type { ReactNode } from "react";
import styles from "./FaqAccordion.module.css";

export type FaqAccordionItem = {
  question: string;
  answer: ReactNode;
};

type Props = {
  items: readonly FaqAccordionItem[];
  className?: string;
  defaultOpenIndex?: number;
  groupName?: string;
  tone?: "compact" | "article";
};

export default function FaqAccordion({
  items,
  className,
  defaultOpenIndex,
  groupName,
  tone = "compact",
}: Props) {
  const classes = [
    styles.list,
    tone === "article" ? styles.article : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {items.map((item, index) => (
        <details
          className={styles.item}
          key={`${item.question}-${index}`}
          name={groupName}
          open={index === defaultOpenIndex}
        >
          <summary className={styles.summary}>
            <span>{item.question}</span>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className={styles.answer}>
            {typeof item.answer === "string" ? <p>{item.answer}</p> : item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
