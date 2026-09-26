"use client";

import Image from "next/image";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import FaqAccordion from "@/components/FaqAccordion";
import styles from "./HomeFaqExplorer.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: readonly FaqItem[];
};

export default function HomeFaqExplorer({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <section id="faq" className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.desktop}>
        <div className={styles.questions}>
          <header className={styles.header}>
            <span className={styles.kicker}>FAQ</span>
            <span className={styles.rule} aria-hidden="true" />
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to the most common questions about our cleaning services.</p>
          </header>

          <div className={styles.list} aria-label="Frequently asked questions">
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  className={styles.question}
                  type="button"
                  key={item.question}
                  aria-expanded={isActive}
                  aria-controls="home-faq-answer"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <FiChevronDown />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.image}>
            <Image
              src="/img/health.webp"
              alt="Freshly cleaned cream sofa in a bright living room"
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </div>

          <div
            id="home-faq-answer"
            className={styles.answer}
            aria-live="polite"
            aria-atomic="true"
          >
            {activeItem ? (
              <>
                <h3>{activeItem.question}</h3>
                <p>{activeItem.answer}</p>
              </>
            ) : (
              <>
                <h3>Choose a question to see the answer.</h3>
                <p>Select any question from the list and the answer will appear here.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <header className={styles.header}>
          <span className={styles.kicker}>FAQ</span>
          <span className={styles.rule} aria-hidden="true" />
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to the most common questions about our cleaning services.</p>
        </header>
        <FaqAccordion
          className={styles.mobileList}
          items={items}
          groupName="home-mobile-faq"
        />
      </div>
    </section>
  );
}
