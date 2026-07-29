"use client";

import { useState } from "react";

export default function HomeHero() {
  const [position, setPosition] = useState(50);

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
            <a className="button button--primary" href="/quote/">
              Get an instant estimate
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a className="button button--secondary" href="#reviews">
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

        <div className="hero__trust-badge">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
          Trusted &amp; local
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
              <img src="/img/logo/header_logo.png" alt="" aria-hidden="true" />
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
            <a href="/quote/">
              Request an estimate <span aria-hidden="true">→</span>
            </a>
            <small>Fast replies · No hidden fees</small>
          </div>
        </div>

        <div className="journey-card__reviews">
          <h2 className="section-kicker">Trusted by Homeowners</h2>
          <div className="review-grid">
            {["A", "J", "M", "S"].map((key) => (
              <div className="review-chip" key={key}>
                <span className="review-chip__google" aria-label="Google">
                  {"Google".split("").map((letter, index) => (
                    <i key={`${key}-${index}`}>{letter}</i>
                  ))}
                </span>
                <span className="review-chip__rating">
                  5.0 <b>★★★★★</b>
                </span>
                <small>Verified review</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
