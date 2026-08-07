"use client";

import { useEffect } from "react";

import { attributionKeys, attributionStorageKey } from "@/lib/marketingAttribution";

export default function MarketingAttribution() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const values = Object.fromEntries(
        attributionKeys
          .map((key) => [key, params.get(key)?.trim() ?? ""] as const)
          .filter(([, value]) => value),
      );

      const existing = window.sessionStorage.getItem(attributionStorageKey);
      if (existing) return;

      window.sessionStorage.setItem(
        attributionStorageKey,
        JSON.stringify({
          ...values,
          landing_page: `${window.location.pathname}${window.location.search}`,
          landing_referrer: document.referrer,
        }),
      );
    } catch {
      // Attribution is optional; storage restrictions must never affect the site.
    }
  }, []);

  return null;
}
