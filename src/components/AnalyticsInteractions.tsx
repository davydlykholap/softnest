"use client";

import { useEffect } from "react";
import { trackPhoneClick, trackReviewClick } from "@/lib/analytics";

export default function AnalyticsInteractions() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;

      try {
        const destination = new URL(href);
        if (
          destination.origin === window.location.origin &&
          destination.pathname.replace(/\/+$/, "") === "/quote"
        ) {
          window.sessionStorage.setItem(
            "softnest_quote_source",
            `${window.location.pathname}${window.location.search}`,
          );
        }
      } catch {
        // Ignore non-URL href values; dedicated handlers below still apply.
      }

      if (href.startsWith("tel:")) {
        trackPhoneClick();
        return;
      }

      if (
        href.includes("google.com/maps") ||
        href.includes("g.page") ||
        href.includes("goo.gl/maps") ||
        href.includes("maps.app.goo.gl")
      ) {
        trackReviewClick(href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
