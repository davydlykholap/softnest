import { siteConfig } from "@/lib/site";
import { pageText } from "@/content/pages";
import { homeContent } from "@/content/pages";
import Image from "next/image";
import HeroActionButtons from "@/components/HeroActionButtons";

export default function HomeHero() {
  const googleProfileUrl = siteConfig.googleProfileUrl;

  const googleReviews = homeContent.heroReviews;

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="hero__photo" aria-hidden="true">
          <Image
            src="/images/softnest-hero-room.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero__wash" aria-hidden="true" />

        <div className="hero__content">
          <p className="hero__eyebrow">{"" + pageText(homeContent.copy, "hero-1") + ""}</p>
          <span className="hero__eyebrow-line" aria-hidden="true" />
          <h1
            id="home-hero-heading"
            className="hero__title hero__title--centered"
          >
            <span className="hero__title-line">We Clean What You</span>
            <span className="hero__title-line hero__title-line--accent">
              Live On.
            </span>
          </h1>
          <p className="hero__description">
            {" " + pageText(homeContent.copy, "hero-6") + " "}</p>
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

        <a
          className="hero__scroll"
          href="#results"
          aria-label="See our results"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14m-6-6 6 6 6-6" />
          </svg>
        </a>
      </section>

      <section
        className="journey-card"
        aria-label="Free photo estimate and Google reviews"
      >
        <div className="journey-card__quote">
          <p className="journey-card__eyebrow">{"" + pageText(homeContent.copy, "hero-13") + ""}</p>
          <h2>{"" + pageText(homeContent.copy, "hero-14") + ""}</h2>
          <p>
            {" " + pageText(homeContent.copy, "hero-15") + ""}{" "}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" " + pageText(homeContent.copy, "hero-16") + " "}</a>{" "}
            or{" "}
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" " + pageText(homeContent.copy, "hero-17") + " "}</a>{" "}
            {" " + pageText(homeContent.copy, "hero-18") + " "}</p>
          <div className="journey-card__quote-action">
            <a className="quote-cta" href="/quote/">
              {" " + pageText(homeContent.copy, "hero-19") + " "}<span aria-hidden="true">→</span>
            </a>
            <small>{"" + pageText(homeContent.copy, "hero-20") + ""}</small>
          </div>
        </div>

        <div className="journey-card__reviews">
          <div className="google-review-summary">
            <div className="google-review-summary__brand">
              <Image
                className="google-wordmark"
                src="/img/google-wordmark-official.png"
                alt="Google"
                width={120}
                height={40}
              />
              <span>{"" + pageText(homeContent.copy, "hero-21") + ""}</span>
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

          <div className="google-review-cards" aria-label="Recent Google reviews">
            {googleReviews.map((review) => (
              <a
                className="google-review-card"
                key={review.name}
                href={googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open SoftNest Fabric Care on Google Maps to read ${review.name}'s review`}
              >
                <div className="google-review-card__top">
                  <Image
                    className="google-g-official"
                    src="/img/google-g-official.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                  />
                  <span aria-label="5 out of 5 stars">★★★★★</span>
                </div>
                <p>“{review.text}”</p>
                <div className="google-review-card__footer">
                  <span className="google-review-card__avatar" aria-hidden="true">
                    {review.initial}
                  </span>
                  <span className="google-review-card__author">
                    <strong>{review.name}</strong>
                  </span>
                  <span className="google-review-card__open" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
