"use client";

import { useEffect } from "react";
import { trackOutboundLink, trackPhoneClick } from "@/lib/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const rawHref = link.getAttribute("href") ?? "";
      if (rawHref.startsWith("tel:")) {
        trackPhoneClick();
        return;
      }

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
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
  }, []);

  return null;
}
