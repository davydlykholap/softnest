import { homeContent, pageText } from "@/content/pages";
import Image from "@/components/ResponsiveImage";
import { responsiveImageSet } from "@/lib/responsiveImages";
import HeroActionButtons from "@/components/HeroActionButtons";

export default function HomeHero() {
  return (
    <main className="site-shell">
      <section className="hero mobile-page-hero" aria-labelledby="home-hero-heading">
        <div className="hero__photo" aria-hidden="true">
          <picture className="hero__photo-picture">
            <source
              media="(max-width: 640px)"
              srcSet={responsiveImageSet("/images/softnest-hero-room-mobile.webp") ?? "/images/softnest-hero-room-mobile.webp"}
              sizes="100vw"
            />
            <Image
              src="/images/softnest-hero-room.webp"
              alt=""
              fill
              loading="eager"
              sizes="100vw"
            />
          </picture>
        </div>
        <div className="hero__wash mobile-page-hero__wash" aria-hidden="true" />

        <div className="hero__content mobile-page-hero__copy">
          <h1 id="home-hero-heading" className="hero__title mobile-page-hero__title">
            A Cleaner Home
            <span className="hero__title-line">Feels <em>Better.</em></span>
          </h1>
          <p className="hero__description mobile-page-hero__description">
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

    </main>
  );
}
