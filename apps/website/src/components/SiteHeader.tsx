import { siteConfig } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "@/components/HeaderNavigation";
import { navigationServices } from "@/content/services";

type SiteHeaderProps = {
  current?: "blog" | "locations" | "services" | "work";
  quoteHref?: string;
};

const headerServices = navigationServices.map(
  ({ slug, menuLabel }) => ({
    slug,
    menuLabel,
  }),
);

function HeaderActions({ quoteHref }: { quoteHref: string }) {
  return (
    <div className="site-header__actions">
      <a className="header-phone" href={siteConfig.smsHref}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Text us</span>
      </a>
      <Link prefetch={false} className="header-quote quote-cta" href={quoteHref}>
        
        {siteConfig.quoteLabel}
      </Link>
    </div>
  );
}

export default function SiteHeader({ current, quoteHref = "/quote/" }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link prefetch={false} href="/" className="brand" aria-label="SoftNest Fabric Care home">
        <span className="brand__mark">
          <Image
            src="/images/brand/softnest-icon-small.webp"
            alt=""
            width={72}
            height={72}
            priority
          />
        </span>
        <span className="brand__name">
          <strong>SoftNest</strong>{" "}
          <small>Fabric Care</small>
        </span>
      </Link>

      <HeaderNavigation
        current={current}
        actions={<HeaderActions quoteHref={quoteHref} />}
        quoteHref={quoteHref}
        services={headerServices}
      />
    </header>
  );
}
