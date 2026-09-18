import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent } from "@/content/pages";
import Image from "next/image";
import GoogleReviewCarousel from "@/components/GoogleReviewCarousel";
import HeroActionButtons from "@/components/HeroActionButtons";

export default function HomeHero() {
  const googleProfileUrl = siteConfig.googleProfileUrl;

  const googleReviews = homeContent.heroReviews;
  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="hero__photo" aria-hidden="true">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/images/softnest-hero-room-mobile.webp"
            />
            <Image
              src="/images/softnest-hero-room.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </picture>
        </div>
        <div className="hero__wash" aria-hidden="true" />

        <div className="hero__content">
          <p className="hero__eyebrow">{"" + pageText(homeContent.copy, "hero-1") + ""}</p>
          <span className="hero__eyebrow-line" aria-hidden="true" />
          <h1 id="home-hero-heading" className="hero__title">
            A Cleaner Home
            <span className="hero__title-line">Feels <em>Better.</em></span>
          </h1>
          <p className="hero__description">
            Professional cleaning for the furniture and carpets you live with every
            day—using fabric-safe products, professional equipment, and meticulous
            care to refresh your home’s comfort.
          </p>
          <HeroActionButtons primaryTone="gold" />
          <ul className="hero__benefits" aria-label="Service benefits">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 5-1 11-7 12m-1 6c0-3 1-7 5-10" />
              </svg>
              <span>
                {" " + pageText(homeContent.copy, "hero-7") + " "}<br />
                {" " + pageText(homeContent.copy, "hero-8") + " "}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                {" " + pageText(homeContent.copy, "hero-9") + " "}<br />
                {" " + pageText(homeContent.copy, "hero-10") + " "}</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                {" " + pageText(homeContent.copy, "hero-11") + " "}<br />
                {" " + pageText(homeContent.copy, "hero-12") + " "}</span>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="reviews"
        className="journey-card"
        aria-label="Google reviews"
      >
        <div className="journey-card__reviews">
          <div className="google-review-summary">
            <div className="google-review-summary__brand">
              <Image
                className="google-review-summary__g"
                src="/img/google-g-official.png"
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
              />
              <Image
                className="google-wordmark"
                src="/img/google-wordmark-official.png"
                alt="Google"
                width={120}
                height={40}
              />
              <span className="google-review-summary__desktop-label">{"" + pageText(homeContent.copy, "hero-21") + ""}</span>
              <span className="google-review-summary__mobile-label">Google Reviews</span>
            </div>
            <div className="google-review-summary__score">
              <strong>{siteConfig.reviewScore}</strong>
              <span aria-label="5 out of 5 stars">★★★★★</span>
            </div>
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" " + pageText(homeContent.copy, "hero-22") + " "}<span aria-hidden="true">→</span>
            </a>
          </div>

          <GoogleReviewCarousel
            reviews={googleReviews}
            googleProfileUrl={googleProfileUrl}
          />
        </div>
      </section>
    </main>
  );
}
