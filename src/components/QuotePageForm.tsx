"use client";

import { FormEvent, useState } from "react";

const serviceOptions = [
  "Sofa or couch",
  "Sectional",
  "Dining chairs",
  "Mattress",
  "Carpet or rug",
  "Other furniture",
];

export default function QuotePageForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected.length) {
      setError("Please select at least one item.");
      return;
    }

    setSubmitting(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    formData.set("furniture", selected.join(", "));
    formData.set("access_key", "c204f6bb-0402-4dfe-8981-fc5080ce3ac4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }
      setSent(true);
    } catch {
      setError("We couldn’t send the form. Please call (416) 727-0287.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="quote-page-success" role="status" aria-live="polite">
        <span className="quote-page-success__icon" aria-hidden="true">✓</span>
        <p className="quote-page-kicker">Request received</p>
        <h1>Thank you.<br />We’ll be in touch soon.</h1>
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

      <div className="quote-page-form__heading">
        <p className="quote-page-kicker">Your free quote</p>
        <h1>Tell us what<br />needs cleaning.</h1>
        <p>Share a few details. We’ll recommend the right treatment and follow up with a clear quote.</p>
      </div>

      <div className="quote-page-form__grid">
        <label className="quote-page-field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Full name" required />
        </label>
        <label className="quote-page-field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="(416) 555-0123" required />
        </label>
        <label className="quote-page-field">
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
        <label className="quote-page-field">
          <span>City or postal code</span>
          <input name="location" type="text" autoComplete="postal-code" placeholder="Mississauga or L5B 1M7" required />
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
                onChange={() =>
                  setSelected((current) =>
                    current.includes(option)
                      ? current.filter((item) => item !== option)
                      : [...current, option],
                  )
                }
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
          placeholder="Number of pieces, stains, pet odour, preferred timing..."
        />
      </label>

      <div className="quote-page-form__footer">
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Request my free quote"}
          <span aria-hidden="true">→</span>
        </button>
        <p>No obligation. No hidden fees.</p>
      </div>
      {error && <p className="quote-page-error">{error}</p>}
    </form>
  );
}
