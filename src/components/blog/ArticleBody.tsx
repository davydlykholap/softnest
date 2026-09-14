import Image from "next/image";
import {
  PortableText,
  toPlainText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { blogImageUrl } from "@/sanity/image";
import type { Post } from "@/content/posts";
import FaqAccordion from "@/components/FaqAccordion";
import styles from "./ArticleBody.module.css";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = blogImageUrl(value);
      return src ? (
        <figure>
          <Image
            src={src}
            alt={value.alt || ""}
            width={value.width || 1200}
            height={value.height || 800}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      ) : null;
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      const safe = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href);
      return safe ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

type ArticleFaqItem = {
  question: string;
  answer: PortableTextBlock[];
};

function isHeading(block: PortableTextBlock, style: "h2" | "h3") {
  return block._type === "block" && block.style === style;
}

function extractFaq(body: PortableTextBlock[]) {
  const faqHeadingIndex = body.findIndex(
    (block) =>
      isHeading(block, "h2") &&
      toPlainText(block).trim().toLowerCase() === "frequently asked questions",
  );

  if (faqHeadingIndex === -1) return null;

  const items: ArticleFaqItem[] = [];
  let cursor = faqHeadingIndex + 1;
  let afterFaqIndex = body.length;

  while (cursor < body.length) {
    const block = body[cursor];

    if (isHeading(block, "h2")) {
      afterFaqIndex = cursor;
      break;
    }

    if (!isHeading(block, "h3")) {
      cursor += 1;
      continue;
    }

    const question = toPlainText(block).trim();
    const answerStart = cursor + 1;
    cursor = answerStart;

    while (
      cursor < body.length &&
      !isHeading(body[cursor], "h2") &&
      !isHeading(body[cursor], "h3")
    ) {
      cursor += 1;
    }

    if (question) {
      items.push({ question, answer: body.slice(answerStart, cursor) });
    }
  }

  if (!items.length) return null;

  return {
    before: body.slice(0, faqHeadingIndex),
    after: body.slice(afterFaqIndex),
    items,
  };
}

export default function ArticleBody({ body }: { body: Post["body"] }) {
  const faq = extractFaq(body);

  if (!faq) return <PortableText value={body} components={components} />;

  return (
    <>
      <PortableText value={faq.before} components={components} />
      <section className={styles.faqSection} aria-labelledby="article-faq-heading">
        <h2 id="article-faq-heading" className={styles.faqHeading}>
          Frequently Asked Questions
        </h2>
        <FaqAccordion
          className={styles.faqList}
          defaultOpenIndex={0}
          items={faq.items.map((item) => ({
            question: item.question,
            answer: <PortableText value={item.answer} components={components} />,
          }))}
          tone="article"
        />
      </section>
      <PortableText value={faq.after} components={components} />
    </>
  );
}
