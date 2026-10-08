"use client";

import { useEffect } from "react";
import { cityFromUrl, trackEvent, trackOutboundLink, trackPhoneClick } from "@/lib/analytics";

export default function AnalyticsEvents({ citySlugs }: { citySlugs: string[] }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const rawHref = link.getAttribute("href") ?? "";
      const sourceCity = cityFromUrl(new URL(window.location.href), citySlugs);
      if (rawHref.startsWith("tel:")) {
        trackPhoneClick(sourceCity);
        return;
      }

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin === window.location.origin && url.pathname === "/quote/") {
        trackEvent("quote_click", { ...(sourceCity ? { source_city: sourceCity } : {}) });
        return;
      }

      const host = url.hostname.replace(/^www\./, "").toLowerCase();
      if (host === "maps.app.goo.gl" || host === "google.com" || host === "maps.google.com") {
        trackOutboundLink("google_reviews");
      } else if (host === "instagram.com") {
        trackOutboundLink("instagram");
      } else if (host === "facebook.com") {
        trackOutboundLink("facebook");
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [citySlugs]);

  return null;
}
