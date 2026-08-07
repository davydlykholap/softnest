export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const quoteConversionDestination =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION?.trim() ?? "";
const phoneConversionDestination =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION?.trim() ?? "";

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag(...args);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  gtag("event", name, params);
}

export function trackQuoteConversion(onComplete?: () => void) {
  trackEvent("generate_lead", {
    event_category: "lead",
    event_label: "quote_form",
  });

  if (!quoteConversionDestination) {
    onComplete?.();
    return;
  }

  let completed = false;
  const finish = () => {
    if (completed) return;
    completed = true;
    onComplete?.();
  };

  gtag("event", "conversion", {
    send_to: quoteConversionDestination,
    value: 1,
    currency: "CAD",
    event_callback: finish,
  });

  window.setTimeout(finish, 900);
}

export function trackPhoneClick() {
  trackEvent("click_to_call", {
    event_category: "contact",
    event_label: "phone",
  });

  if (phoneConversionDestination) {
    gtag("event", "conversion", {
      send_to: phoneConversionDestination,
      value: 1,
      currency: "CAD",
    });
  }
}

export function trackOutboundLink(destination: "google_reviews" | "instagram" | "facebook") {
  trackEvent("outbound_click", {
    event_category: "engagement",
    event_label: destination,
  });
}
