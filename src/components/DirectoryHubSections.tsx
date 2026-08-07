import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type HubAction = {
  href: string;
  label: string;
};

type HeroTitleLine = {
  text: string;
  accent?: boolean;
};

type DirectoryHeroProps = {
  id: string;
  kicker: string;
  titleLines: HeroTitleLine[];
  description: string;
  primaryAction: HubAction;
  secondaryAction: HubAction;
  media: ReactNode;
  mediaLabel: string;
  className?: string;
};

export function DirectoryHero({
  id,
  kicker,
  titleLines,
  description,
  primaryAction,
  secondaryAction,
  media,
  mediaLabel,
  className = "",
}: DirectoryHeroProps) {
  return (
    <section
      className={`locations-hero ${className}`.trim()}
      aria-labelledby={id}
    >
      <div className="locations-hero__copy">
        <p className="locations-kicker">{kicker}</p>
        <span className="locations-kicker-line" aria-hidden="true" />
        <h1 id={id}>
          {titleLines.map((line) => (
            <span
              className={`locations-hero__title-line ${
                line.accent ? "locations-hero__title-line--accent" : ""
              }`.trim()}
              key={line.text}
            >
              {line.text}
            </span>
          ))}
        </h1>
        <p className="locations-hero__description">{description}</p>
        <div className="locations-hero__actions">
          <Link
            className="locations-pill locations-pill--solid"
            href={primaryAction.href}
          >
            {primaryAction.label}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            className="locations-pill locations-pill--outline"
            href={secondaryAction.href}
          >
            {secondaryAction.label}
          </Link>
        </div>
      </div>

      <div className="locations-hero__map" aria-label={mediaLabel}>
        {media}
      </div>
    </section>
  );
}

type DirectoryCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  ariaLabel: string;
  className?: string;
};

export function DirectoryCard({
  href,
  image,
  imageAlt,
  title,
  subtitle,
  ariaLabel,
  className = "",
}: DirectoryCardProps) {
  return (
    <Link
      className={`locations-city-card ${className}`.trim()}
      href={href}
      aria-label={ariaLabel}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={900}
        height={600}
        sizes="(max-width: 820px) 100vw, (max-width: 1100px) 50vw, 33vw"
      />
      <div className="locations-city-card__body">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <span className="locations-city-card__arrow" aria-hidden="true">
          <svg
            className="locations-city-card__arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            focusable="false"
          >
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

type SupportCard = {
  icon?: ReactNode;
  title: string;
  description: string;
  link: HubAction;
  image: string;
  imageAlt: string;
};

type DirectorySupportSectionProps = {
  id?: string;
  kicker: string;
  title: string;
  description: string;
  primaryAction: HubAction;
  phoneLabel?: string;
  phoneHref?: string;
  card: SupportCard;
  className?: string;
};

export function DirectorySupportSection({
  id,
  kicker,
  title,
  description,
  primaryAction,
  phoneLabel = "(416) 727-0287",
  phoneHref = "tel:+14167270287",
  card,
  className = "",
}: DirectorySupportSectionProps) {
  return (
    <section
      className={`locations-missing ${className}`.trim()}
      id={id}
    >
      <div className="locations-missing__copy">
        <p className="locations-kicker">{kicker}</p>
        <h2>{title}</h2>
        <span className="locations-kicker-line" aria-hidden="true" />
        <p>{description}</p>
        <div className="locations-missing__actions">
          <Link
            className="locations-pill locations-pill--solid"
            href={primaryAction.href}
          >
            {primaryAction.label}
            <span aria-hidden="true">→</span>
          </Link>
          <a className="locations-phone-pill" href={phoneHref}>
            <span aria-hidden="true">☎</span>
            {phoneLabel}
          </a>
        </div>
      </div>

      <div className="locations-estimate-card">
        <div className="locations-estimate-card__copy">
          <span className="locations-estimate-card__icon" aria-hidden="true">
            {card.icon ?? "◉"}
          </span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <Link href={card.link.href}>{card.link.label}</Link>
        </div>
        <div className="locations-estimate-card__image">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(max-width: 820px) 100vw, 34vw"
          />
          <span aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

type DirectoryFinalCtaProps = {
  kicker: string;
  title: string;
  description: string;
  action: HubAction;
  image: string;
  imageAlt: string;
  className?: string;
};

export function DirectoryFinalCta({
  kicker,
  title,
  description,
  action,
  image,
  imageAlt,
  className = "",
}: DirectoryFinalCtaProps) {
  return (
    <section className={`locations-final-cta ${className}`.trim()}>
      <div className="locations-final-cta__image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
        />
      </div>
      <div className="locations-final-cta__copy">
        <p className="locations-kicker">{kicker}</p>
        <h2>{title}</h2>
        <span className="locations-kicker-line" aria-hidden="true" />
        <p>{description}</p>
        <Link
          className="locations-pill locations-pill--light"
          href={action.href}
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
