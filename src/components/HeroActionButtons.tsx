import { siteConfig } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const googleProfileUrl = siteConfig.googleProfileUrl;

type HeroActionButtonsProps = {
  quoteHref?: string;
  quoteAriaLabel?: string;
  primaryTone?: "green" | "gold";
  showReviews?: boolean;
};

export default function HeroActionButtons({
  quoteHref = "/quote/",
  quoteAriaLabel = "Get an upholstery and carpet cleaning quote",
  primaryTone = "green",
  showReviews = true,
}: HeroActionButtonsProps) {
  return (
    <div
      className={`hero__actions hero-action-buttons hero-action-buttons--${primaryTone}`}
    >
      <Link
        className="button button--primary quote-cta quote-cta--pulse"
        href={quoteHref}
        aria-label={quoteAriaLabel}
      >
        Get a Quote
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </Link>
      {showReviews ? <a
        className="button button--secondary"
        href={googleProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="google-g-icon"
          src="/img/google-g-official.svg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
        />
        See our reviews
      </a> : null}
    </div>
  );
}
