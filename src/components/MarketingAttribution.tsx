"use client";

import { useEffect } from "react";

import { attributionStorageKey, readAttribution, sanitizeAttribution } from "@/lib/marketingAttribution";

export default function MarketingAttribution() {
  useEffect(() => {
    try {
      const existing = window.sessionStorage.getItem(attributionStorageKey);
      if (existing) {
        try {
          if (Object.keys(sanitizeAttribution(JSON.parse(existing))).length) return;
        } catch {
          // Replace a malformed old value when a valid campaign arrives.
        }
      }
      const values = readAttribution(window.location.search);
      if (Object.keys(values).length) {
        window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(values));
      }
    } catch {
      // Attribution is optional; storage restrictions must never affect the site.
    }
  }, []);

  return null;
}
