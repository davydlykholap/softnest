import { siteConfig } from "@/lib/site";
import type { ReactNode } from "react";
import CardArrow, {
  cardArrowHostClassName,
  cardPanelClassName,
} from "@/components/CardArrow";
import Image from "next/image";
import Link from "next/link";
import finalCtaStyles from "./DirectoryFinalCta.module.css";
import "@/app/styles/locations-hub.css";

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
  titleLines: HeroTitleLine[];
  description: string;
  primaryAction?: HubAction;
  secondaryAction?: HubAction;
  media: ReactNode;
  mediaLabel: string;
  className?: string;
};

export function DirectoryHero({
  id,
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
        {primaryAction || secondaryAction ? (
          <div className="locations-hero__actions">
            {primaryAction ? (
              <Link
                className={`locations-pill locations-pill--solid${primaryAction.href.startsWith("/quote") ? " quote-cta" : ""}`}
                href={primaryAction.href}
              >
                {primaryAction.label}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
            {secondaryAction ? (
              <Link
                className={`locations-pill locations-pill--outline${secondaryAction.href.startsWith("/quote") ? " quote-cta" : ""}`}
                href={secondaryAction.href}
              >
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        ) : null}
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
  subtitle?: string;
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
      className={`locations-city-card ${cardArrowHostClassName} ${className}`.trim()}
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
      <div className={`locations-city-card__body ${cardPanelClassName}`}>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
        <CardArrow className="locations-city-card__arrow" />
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
  title,
  description,
  primaryAction,
  phoneLabel = siteConfig.displayPhone,
  phoneHref = siteConfig.phoneHref,
  card,
  className = "",
}: DirectorySupportSectionProps) {
  return (
    <section
      className={`locations-missing ${className}`.trim()}
      id={id}
    >
      <div className="locations-missing__copy">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="locations-missing__actions">
          <Link
            className={`locations-pill locations-pill--solid${primaryAction.href.startsWith("/quote") ? " quote-cta" : ""}`}
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
  id?: string;
  title: string;
  description: string;
  action: HubAction;
  image: string;
  imageAlt: string;
  className?: string;
};

export function DirectoryFinalCta({
  id,
  title,
  description,
  action,
  image,
  imageAlt,
  className = "",
}: DirectoryFinalCtaProps) {
  return (
    <section id={id} className={`locations-final-cta site-final-cta ${finalCtaStyles.cta} ${className}`.trim()}>
      <div className="locations-final-cta__image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
        />
      </div>
      <div className={`locations-final-cta__copy ${finalCtaStyles.copy}`}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link
          className={`locations-pill locations-pill--light ${finalCtaStyles.button}${action.href.startsWith("/quote") ? " quote-cta" : ""}`}
          href={action.href}
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
