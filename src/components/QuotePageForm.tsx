"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { trackQuoteConversion } from "@/lib/analytics";
import { attributionStorageKey } from "@/lib/marketingAttribution";

const instagramUrl = "https://www.instagram.com/softnestfabriccare/";
const facebookUrl = "https://www.facebook.com/profile.php?id=61590622653207";
const lastQuoteStorageKey = "softnest_last_quote_submission";

const serviceOptions = [
  "Sofa or couch",
  "Sectional",
  "Dining chairs",
  "Mattress",
  "Carpet or rug",
  "Other furniture",
];

function formatPhoneNumber(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length > 10 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function QuotePageForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const openedAt = useRef(Date.now());

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected.length) {
      setError("Please select at least one item.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const website = String(formData.get("website") ?? "");
    if (website || Date.now() - openedAt.current < 800) return;

    try {
      const lastSubmission = Number(window.sessionStorage.getItem(lastQuoteStorageKey) ?? "0");
      if (lastSubmission && Date.now() - lastSubmission < 30_000) {
        setError("Your request was already sent. Please wait a moment before submitting again.");
        return;
      }
    } catch {
      // Storage restrictions should never prevent a legitimate quote request.
    }

    const name = String(formData.get("name") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (name.length < 2 || name.length > 80) {
      setError("Please enter your name.");
      return;
    }
    if (phoneDigits.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (notes.length > 1500) {
      setError("Please keep the additional details under 1,500 characters.");
      return;
    }

    setSubmitting(true);
    setError("");
    formData.set("name", name);
    formData.set("furniture", selected.join(", "));
    formData.set("phone", phone);
    formData.set("notes", notes);
    formData.delete("website");
    formData.set("access_key", "c204f6bb-0402-4dfe-8981-fc5080ce3ac4");
    formData.set("from_name", "SoftNest Website");
    formData.set("source_page", window.location.pathname);
    if (document.referrer) formData.set("referrer", document.referrer);

    try {
      const storedAttribution = window.sessionStorage.getItem(attributionStorageKey);
      if (storedAttribution) {
        const attribution = JSON.parse(storedAttribution) as Record<string, unknown>;
        for (const [key, value] of Object.entries(attribution)) {
          if (typeof value === "string" && value) formData.set(key, value);
        }
      }
    } catch {
      // Attribution is optional and must never block a quote request.
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
        credentials: "omit",
        referrerPolicy: "strict-origin-when-cross-origin",
        signal: controller.signal,
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      try {
        window.sessionStorage.setItem(lastQuoteStorageKey, String(Date.now()));
      } catch {
        // Storage restrictions should never affect a successful submission.
      }

      setSent(true);
      trackQuoteConversion(() => window.location.assign("/quote/thank-you/"));
    } catch {
      setError(
        "We couldn’t send the form. Please call or text (416) 727-0287.",
      );
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="quote-page-success" role="status" aria-live="polite">
        <span className="quote-page-success__icon" aria-hidden="true">✓</span>
        <p className="quote-page-kicker">Request received</p>
        <h2>Thank you.<br />We’ll be in touch soon.</h2>
        <p>
          We received your cleaning details. A SoftNest specialist will contact
          you to discuss the right treatment and next steps.
        </p>
        <a href="tel:+14167270287">Need us sooner? Call (416) 727-0287</a>
      </div>
    );
  }

  return (
    <form className="quote-page-form" onSubmit={submit}>
      <input type="hidden" name="subject" value="New SoftNest quote request" />
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <label className="quote-page-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="quote-page-form__heading">
        <p className="quote-page-kicker">Your free quote</p>
        <h2>Tell us what<br />needs cleaning.</h2>
        <p>
          Share a few details. We’ll recommend the right treatment and follow
          up with a clear quote.
        </p>
        <p className="quote-page-photo-channels">
          You can send photos through{" "}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{" "}
          or{" "}
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>.
        </p>
      </div>

      <div className="quote-page-form__grid">
        <label className="quote-page-field">
          <span>Your name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            minLength={2}
            maxLength={80}
            required
          />
        </label>
        <label className="quote-page-field">
          <span>Phone number</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(416) 555-0123"
            value={phone}
            maxLength={14}
            pattern="\(\d{3}\) \d{3}-\d{4}"
            title="Enter a 10-digit phone number."
            onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
            required
          />
        </label>
      </div>

      <fieldset className="quote-page-options">
        <legend>What would you like cleaned?</legend>
        <div className="quote-page-options__grid">
          {serviceOptions.map((option) => (
            <label key={option} className={selected.includes(option) ? "is-selected" : ""}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                aria-describedby={error ? "quote-page-error" : undefined}
                onChange={() => {
                  setError("");
                  setSelected((current) =>
                    current.includes(option)
                      ? current.filter((item) => item !== option)
                      : [...current, option],
                  );
                }}
              />
              <span className="quote-page-options__check" aria-hidden="true">✓</span>
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="quote-page-field quote-page-field--notes">
        <span>Anything else we should know?</span>
        <textarea
          name="notes"
          rows={4}
          maxLength={1500}
          placeholder="Number of pieces, stains, pet odour, preferred timing..."
        />
      </label>

      <div className="quote-page-form__footer">
        <button
          className="quote-cta quote-cta--pulse"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Request my free quote"}
          <span aria-hidden="true">→</span>
        </button>
        <p>
          By submitting, you agree that SoftNest may contact you about this
          request. See our <Link href="/privacy/">Privacy Policy</Link>.
        </p>
      </div>
      {error && (
        <p
          className="quote-page-error"
          id="quote-page-error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </form>
  );
}
