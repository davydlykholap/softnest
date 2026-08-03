"use client";

import { useState } from "react";

export default function HomeHero() {
  const [position, setPosition] = useState(50);
  const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";

  const googleReviews = [
    {
      name: "Nicky C.",
      initial: "N",
      time: "a day ago",
      text: "The team was able to accommodate my request to change the time, kept me informed and updated and did an awesome job.",
    },
    {
      name: "Julie T.",
      initial: "J",
      time: "2 weeks ago",
      text: "Andrii and his son are incredible! They went above and beyond. They are very good and detailed, and I would give them 10 out of 10 stars.",
    },
    {
      name: "Andrew G.",
      initial: "A",
      time: "4 days ago",
      text: "They spent hours working hard to make my old sofa look new again. Very friendly and communicative. They gave me options and it worked out very well. Highly recommended!",
    },
  ];

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="hero__photo" aria-hidden="true" />
        <div className="hero__wash" aria-hidden="true" />

        <div className="hero__content">
          <p className="hero__eyebrow">Proudly Serving the GTA</p>
          <span className="hero__eyebrow-line" aria-hidden="true" />
          <h1 id="home-hero-heading" className="hero__title">
            Expert Care For
            <br />
            Your Furniture
            <br />
            &amp; Carpets.
            <span>Results You&apos;ll Feel.</span>
          </h1>
          <p className="hero__description">
            Professional equipment, non-toxic products, and meticulous
            techniques restore your home&apos;s comfort. From deep sofa
            cleaning to delicate rug restoration.
          </p>
          <div className="hero__actions">
            <a
              className="button button--primary quote-cta quote-cta--pulse"
              href="/quote/"
              aria-label="Get a free upholstery and carpet cleaning quote"
            >
              Get a free quote
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a className="button button--secondary" href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
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
          <ul className="hero__benefits" aria-label="Service benefits">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 5-1 11-7 12m-1 6c0-3 1-7 5-10" />
              </svg>
              <span>
                Eco-Friendly
                <br />
                Products
              </span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                Safe for Kids
                <br />
                &amp; Pets
              </span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                Satisfaction
                <br />
                Guaranteed
              </span>
            </li>
          </ul>
        </div>

        <div className="compare">
          <div className="compare__image compare__image--before" />
          <div
            className="compare__image compare__image--after"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          />
          <span className="compare__label compare__label--before">Before</span>
          <span className="compare__label compare__label--after">After</span>
          <span className="compare__drag-label">Drag to see</span>
          <span className="compare__line" style={{ left: `${position}%` }}>
            <span className="compare__handle">
              <img src="/img/logo/header_logo.webp" alt="" aria-hidden="true" />
            </span>
          </span>
          <input
            className="compare__range"
            type="range"
            min="12"
            max="88"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Reveal the cleaned sofa"
          />
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
          <p className="journey-card__eyebrow">Free photo estimate</p>
          <h2>Show us what needs cleaning.</h2>
          <p>
            Send a few photos and we&apos;ll recommend the right treatment with
            a clear, no-obligation quote.
          </p>
          <div className="journey-card__quote-action">
            <a className="quote-cta" href="/quote/">
              Request an estimate <span aria-hidden="true">→</span>
            </a>
            <small>Fast replies · No hidden fees</small>
          </div>
        </div>

        <div className="journey-card__reviews">
          <div className="google-review-summary">
            <div className="google-review-summary__brand">
              <img
                className="google-wordmark"
                src="/img/google-wordmark-official.png"
                alt="Google"
              />
              <span>Reviews</span>
            </div>
            <div className="google-review-summary__score">
              <strong>5.0</strong>
              <span aria-label="5 out of 5 stars">★★★★★</span>
            </div>
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all reviews <span aria-hidden="true">→</span>
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
                  <img
                    className="google-g-official"
                    src="/img/google-g-official.png"
                    alt=""
                    aria-hidden="true"
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
                    <small>{review.time}</small>
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
