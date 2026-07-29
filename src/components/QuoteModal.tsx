"use client";

import { FormEvent, useEffect, useState } from "react";

const furnitureOptions = [
  "Sofa",
  "Sectional",
  "Dining chairs",
  "Mattress",
  "Carpet or rug",
  "Other furniture",
];

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let initialHashTimer: ReturnType<typeof setTimeout> | undefined;
    if (window.location.hash === "#quote-form") {
      initialHashTimer = setTimeout(() => setOpen(true), 0);
    }
    const openModal = (event: Event) => {
      const target = event.currentTarget as HTMLAnchorElement;
      if (target.pathname && target.pathname !== window.location.pathname) {
        return;
      }
      event.preventDefault();
      setOpen(true);
    };
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href="#quote-form"]'),
    );
    links.forEach((link) => link.addEventListener("click", openModal));
    return () => {
      if (initialHashTimer) clearTimeout(initialHashTimer);
      links.forEach((link) => link.removeEventListener("click", openModal));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (sent) {
      setSent(false);
      setSelected([]);
    }
  };

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

  if (!open) return null;

  return (
    <div
      className="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <button
        type="button"
        className="quote-modal__overlay"
        onClick={close}
        aria-label="Close quote form"
      />
      <div className="quote-modal__panel" role="document">
        <button
          type="button"
          className="quote-modal__close"
          onClick={close}
          aria-label="Close quote form"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {sent ? (
          <div className="quote-success flex" role="status" aria-live="polite">
            <div className="quote-success__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-serif font-bold text-forestGreen text-2xl mb-2">
              Form sent
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Thank you. We received your quote request and will contact you
              soon.
            </p>
          </div>
        ) : (
          <form className="quote-form" onSubmit={submit}>
            <div className="mb-6 pr-8">
              <p className="font-serif font-bold text-xs uppercase tracking-widest text-forestGreen mb-2">
                Free Quote
              </p>
              <h2
                id="quote-modal-title"
                className="font-serif font-bold text-forestGreen text-3xl leading-tight mb-3"
              >
                Tell us what needs cleaning
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Share a few details and SoftNest will get back to you with the
                next steps.
              </p>
            </div>

            <input
              type="hidden"
              name="subject"
              value="New SoftNest quote request"
            />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="quote-form__grid">
              <label className="quote-field">
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="quote-field">
                <span>Phone number</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
            </div>

            <fieldset className="quote-field quote-options">
              <legend>What furniture?</legend>
              <div className="quote-options__grid">
                {furnitureOptions.map((option) => (
                  <label key={option}>
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
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="quote-field">
              <span>Notes</span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Stains, pet odour, number of pieces, preferred timing..."
              />
            </label>

            {error && <p className="quote-error">{error}</p>}
            <button
              type="submit"
              className="quote-submit"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
