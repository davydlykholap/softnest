import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "@/components/HeaderNavigation";
import { navigationServices } from "@/data/services";

type SiteHeaderProps = {
  home?: boolean;
  current?: "locations" | "services";
};

const headerServices = navigationServices.map(
  ({ slug, menuLabel, summary, image, imageAlt }) => ({
    slug,
    menuLabel,
    summary,
    image,
    imageAlt,
  }),
);

function HeaderActions() {
  return (
    <div className="site-header__actions">
      <a className="header-phone" href="tel:+14167270287">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>(416) 727-0287</span>
      </a>
      <Link className="header-quote quote-cta" href="/quote/">
        Request a free quote
      </Link>
    </div>
  );
}

export default function SiteHeader({ home = false, current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="SoftNest Fabric Care home">
        <span className="brand__mark">
          <Image
            src="/img/logo/header_logo.webp"
            alt=""
            width={72}
            height={72}
            priority
          />
        </span>
        <span className="brand__name">
          <strong>SoftNest</strong>
          <small>Fabric Care</small>
        </span>
      </Link>

      <HeaderNavigation
        home={home}
        current={current}
        actions={<HeaderActions />}
        services={headerServices}
      />
    </header>
  );
}
