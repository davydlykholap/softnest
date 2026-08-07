import Link from "next/link";

const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";

type HeroActionButtonsProps = {
  quoteAriaLabel?: string;
};

export default function HeroActionButtons({
  quoteAriaLabel = "Get a free upholstery and carpet cleaning quote",
}: HeroActionButtonsProps) {
  return (
    <div className="hero__actions hero-action-buttons">
      <Link
        className="button button--primary quote-cta quote-cta--pulse"
        href="/quote/"
        aria-label={quoteAriaLabel}
      >
        Get a free quote
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
      <a
        className="button button--secondary"
        href={googleProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="google-maps-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#34a853"
            d="M12 22s7-6.25 7-13a7 7 0 1 0-14 0c0 6.75 7 13 7 13Z"
          />
          <path
            fill="#4285f4"
            d="M12 2a7 7 0 0 0-7 7c0 2.28.8 4.55 1.9 6.52L12 9Z"
          />
          <path
            fill="#fbbc04"
            d="M12 9l5.1 6.52C18.2 13.55 19 11.28 19 9a7 7 0 0 0-1.18-3.9Z"
          />
          <path
            fill="#ea4335"
            d="M17.82 5.1A7 7 0 0 0 12 2v7Z"
          />
          <circle cx="12" cy="9" r="2.45" fill="#fff" />
        </svg>
        See our reviews
      </a>
    </div>
  );
}
