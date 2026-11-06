import styles from "./CardArrow.module.css";

export const cardArrowHostClassName = styles.host;
export const cardPanelClassName = styles.panel;

type CardArrowProps = {
  className?: string;
};

export default function CardArrow({ className = "" }: CardArrowProps) {
  return (
    <i
      className={`${styles.arrow} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        focusable="false"
      >
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </i>
  );
}
