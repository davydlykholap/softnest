"use client";

import { siteConfig } from "@/lib/site";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackQuoteConversion } from "@/lib/analytics";
import { integrations } from "@/lib/integrations";
import { submitQuote } from "@/domain/quote";
import { attributionStorageKey } from "@/lib/marketingAttribution";
import { QuoteOptionCard } from "@/components/quote/QuoteOptionCard";
import { QuoteContactFields } from "@/components/quote/QuoteContactFields";
import { serviceOptions } from "@/components/quote/quoteOptions";
import { isPlusChoice } from "@/components/quote/quoteAnswers";
import { buildQuoteSubmission, validateQuoteItems } from "@/components/quote/quoteRequest";

const instagramUrl = siteConfig.instagramUrl;
const facebookUrl = siteConfig.facebookUrl;
const lastQuoteStorageKey = "softnest_last_quote_submission";
function growNotes(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  const maxHeight = 360;
  textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
}

export default function QuotePageForm() {
  const router = useRouter();
  const [customerType, setCustomerType] = useState<"Individual" | "Business">("Individual");
  const [{ selected, activeDetailId }, setSelectionState] = useState({
    selected: [] as string[],
    activeDetailId: "",
  });
  const [quickDetails, setQuickDetails] = useState<Record<string, string>>({});
  const [exactQuantities, setExactQuantities] = useState<Record<string, string>>({});
  const [businessAmounts, setBusinessAmounts] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const openedAt = useRef(0);
  const submissionInFlight = useRef(false);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const selectedOptions = useMemo(
    () => serviceOptions.filter((option) => selectedSet.has(option.id)),
    [selectedSet],
  );
  const toggleOption = useCallback((id: string) => {
    setError("");
    setSelectionState((current) => {
      if (!current.selected.includes(id)) {
        return { selected: [...current.selected, id], activeDetailId: id };
      }
      return {
        selected: current.selected.filter((item) => item !== id),
        activeDetailId: "",
      };
    });
    const option = serviceOptions.find((item) => item.id === id);
    if (selectedSet.has(id) && option) {
      setQuickDetails((current) => {
        const next = { ...current };
        for (const question of option.presentation.quickQuestions ?? []) {
          delete next[question.name];
        }
        return next;
      });
      setExactQuantities((current) => {
        const next = { ...current };
        for (const question of option.presentation.quickQuestions ?? []) {
          delete next[question.name];
        }
        return next;
      });
      setBusinessAmounts((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    }
  }, [selectedSet]);

  const ensureSelected = useCallback((id: string) => {
    setError("");
    setSelectionState((current) => ({
      selected: current.selected.includes(id) ? current.selected : [...current.selected, id],
      activeDetailId: id,
    }));
  }, []);

  const activateOption = useCallback((id: string) => {
    setSelectionState((current) => ({ ...current, activeDetailId: id }));
  }, []);

  const deactivateOption = useCallback((id: string) => {
    setSelectionState((current) => current.activeDetailId === id
      ? { ...current, activeDetailId: "" }
      : current);
  }, []);

  const updateQuickDetail = useCallback((name: string, value: string) => {
    if (!isPlusChoice(value)) {
      setExactQuantities((current) => {
        if (!(name in current)) return current;
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
    setQuickDetails((current) =>
      current[name] === value ? current : { ...current, [name]: value },
    );
  }, []);

  const updateExactQuantity = useCallback((name: string, value: string) => {
    setExactQuantities((current) => ({ ...current, [name]: value }));
  }, []);

  const updateBusinessAmount = useCallback((id: string, value: string) => {
    setBusinessAmounts((current) => ({ ...current, [id]: value }));
  }, []);

  const changeCustomerType = useCallback((nextType: "Individual" | "Business") => {
    setCustomerType(nextType);
    setSelectionState({ selected: [], activeDetailId: "" });
    setQuickDetails({});
    setExactQuantities({});
    setBusinessAmounts({});
    setError("");
  }, []);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInFlight.current) return;
    if (!selected.length) {
      setError("Please select at least one item.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const formElement = event.currentTarget;
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
    if (customerType === "Business") {
      const organization = String(formData.get("organization") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const serviceLocation = String(formData.get("service_location") ?? "").trim();
      const emailInput = event.currentTarget.elements.namedItem("email");
      if (organization.length < 2 || organization.length > 100) {
        setError("Please enter your organization name.");
        return;
      }
      if (!email || !(emailInput instanceof HTMLInputElement) || !emailInput.checkValidity()) {
        setError("Please enter a valid work email address.");
        return;
      }
      if (serviceLocation.length < 2 || serviceLocation.length > 120) {
        setError("Please enter the service city or postal code.");
        return;
      }
      formData.set("organization", organization);
      formData.set("email", email);
      formData.set("service_location", serviceLocation);
    }
    if (notes.length > 1500) {
      setError("Please keep the additional details under 1,500 characters.");
      return;
    }
    const itemError = validateQuoteItems(selectedOptions, customerType, {
      quickDetails,
      exactQuantities,
      businessAmounts,
    });
    if (itemError) {
      setSelectionState((current) => ({ ...current, activeDetailId: itemError.itemId }));
      setError(itemError.message);
      window.setTimeout(() => {
        const selector = itemError.kind === "amount"
          ? `#quote-item-details-${itemError.itemId} .quote-page-option__amount input`
          : `[name="${itemError.name}"]`;
        formElement.querySelector<HTMLInputElement>(selector)?.focus();
      }, 0);
      return;
    }
    if (!notes) {
      setError("Please enter any additional details, or write “None”.");
      formElement.querySelector<HTMLTextAreaElement>('[name="notes"]')?.focus();
      return;
    }
    if (customerType === "Business" && !String(formData.get("service_frequency") ?? "")) {
      setError("Please select a service frequency.");
      formElement.querySelector<HTMLSelectElement>('[name="service_frequency"]')?.focus();
      return;
    }

    let attribution: unknown;
    try {
      const stored = window.sessionStorage.getItem(attributionStorageKey);
      attribution = stored ? JSON.parse(stored) : undefined;
    } catch {
      // Attribution is optional and must never block a quote request.
    }

    const submission = buildQuoteSubmission({
      formData,
      customerType,
      selectedOptions,
      quickDetails,
      exactQuantities,
      businessAmounts,
      name,
      phone,
      notes,
      accessKey: integrations.web3formsAccessKey,
      sourcePage: window.location.pathname,
      referrer: document.referrer,
      origin: window.location.origin,
      attribution,
    });

    submissionInFlight.current = true;
    setSubmitting(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      await submitQuote(submission, controller.signal);

      try {
        window.sessionStorage.setItem(lastQuoteStorageKey, String(Date.now()));
      } catch {
        // Storage restrictions should never affect a successful submission.
      }

      setSent(true);
      trackQuoteConversion(() => router.push("/quote/thank-you/"));
    } catch {
      setError(
        "We couldn’t send the form. Please call or text " + siteConfig.displayPhone + ".",
      );
    } finally {
      window.clearTimeout(timeout);
      submissionInFlight.current = false;
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
        <a href={siteConfig.phoneHref}>Need us sooner? Call {siteConfig.displayPhone}</a>
      </div>
    );
  }

  return (
    <form className="quote-page-form" onSubmit={submit}>
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

      <fieldset className="quote-page-customer-type">
        <legend>Who is this quote for?</legend>
        <label>
          <input
            type="radio"
            name="customer_type"
            value="Individual"
            checked={customerType === "Individual"}
            onChange={() => changeCustomerType("Individual")}
          />
          <span>Individual</span>
        </label>
        <label>
          <input
            type="radio"
            name="customer_type"
            value="Business"
            checked={customerType === "Business"}
            onChange={() => changeCustomerType("Business")}
          />
          <span>Business</span>
        </label>
      </fieldset>

      <div className="quote-page-form__heading">
        <h1>Let’s refresh your space.</h1>
        <p>
          {customerType === "Business"
            ? "Tell us about the furniture and carpets in your business space. We’ll recommend a practical cleaning plan and follow up with a clear quote."
            : "Tell us about the furniture and carpets you’d like refreshed. We’ll recommend fabric-safe care and follow up with a clear quote."}
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

      <QuoteContactFields customerType={customerType} phone={phone} onPhoneChange={setPhone} />

      <fieldset className="quote-page-options">
        <legend>What would you like cleaned?</legend>
        <p className="quote-page-options__hint">Select all that apply and answer the questions for each item.</p>
        <div className="quote-page-options__grid">
          {serviceOptions.map((option) => (
            <QuoteOptionCard
              key={option.id}
              option={option}
              selected={selectedSet.has(option.id)}
              active={activeDetailId === option.id}
              customerType={customerType}
              quickDetails={quickDetails}
              exactQuantities={exactQuantities}
              businessAmount={businessAmounts[option.id] ?? ""}
              onToggle={toggleOption}
              onEnsureSelected={ensureSelected}
              onActivate={activateOption}
              onDeactivate={deactivateOption}
              onDetailChange={updateQuickDetail}
              onExactQuantityChange={updateExactQuantity}
              onAmountChange={updateBusinessAmount}
            />
          ))}
        </div>
      </fieldset>

      <label className="quote-page-field quote-page-field--notes">
        <span>Anything else we should know?</span>
        <textarea
          name="notes"
          rows={4}
          maxLength={1500}
          placeholder={customerType === "Business"
            ? "Access details, preferred timing, cleaning concerns..."
            : "Stains, pet odour, access notes, preferred timing..."}
          onInput={(event) => growNotes(event.currentTarget)}
          required
        />
      </label>

      <div className="quote-page-form__footer">
        <button
          className="quote-cta quote-cta--pulse"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Get my quote"}
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
