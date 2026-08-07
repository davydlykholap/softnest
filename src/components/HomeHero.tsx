import Image from "next/image";
import HeroComparison from "@/components/HeroComparison";
import HeroActionButtons from "@/components/HeroActionButtons";

export default function HomeHero() {
  const googleProfileUrl = "https://maps.app.goo.gl/XHFbygUj49Suv9F48";

  const googleReviews = [
    {
      name: "Nicky C.",
      initial: "N",
      text: "The team was able to accommodate my request to change the time, kept me informed and updated and did an awesome job.",
    },
    {
      name: "Julie T.",
      initial: "J",
      text: "Andrii and his son are incredible! They went above and beyond. They are very good and detailed, and I would give them 10 out of 10 stars.",
    },
    {
      name: "Andrew G.",
      initial: "A",
      text: "They spent hours working hard to make my old sofa look new again. Very friendly and communicative. They gave me options and it worked out very well. Highly recommended!",
    },
  ];

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
            Professional equipment, fabric-appropriate products, and meticulous
            techniques refresh your home&apos;s comfort. From deep sofa
            cleaning to careful rug cleaning.
          </p>
          <HeroActionButtons />
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

        <HeroComparison />

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
            Send a few photos through{" "}
            <a
              href="https://www.instagram.com/softnestfabriccare/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            or{" "}
            <a
              href="https://www.facebook.com/profile.php?id=61590622653207"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>{" "}
            and we&apos;ll recommend the right treatment with a clear,
            no-obligation quote.
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
              <Image
                className="google-wordmark"
                src="/img/google-wordmark-official.png"
                alt="Google"
                width={120}
                height={40}
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
