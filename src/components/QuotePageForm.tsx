"use client";

import { siteConfig } from "@/lib/site";
import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackQuoteConversion } from "@/lib/analytics";
import { integrations } from "@/lib/integrations";
import { submitQuote } from "@/domain/quote";
import { attributionStorageKey } from "@/lib/marketingAttribution";
import { quoteCategories } from "@/content/quote";

const instagramUrl = siteConfig.instagramUrl;
const facebookUrl = siteConfig.facebookUrl;
const lastQuoteStorageKey = "softnest_last_quote_submission";

type QuickQuestion = {
  name: string;
  label: string;
  choices: string[];
};

type OptionPresentation = {
  label: string;
  image: string;
  imageAlt: string;
  quickQuestions?: QuickQuestion[];
};

const optionPresentation: Record<string, OptionPresentation> = {
  "quote-category-1": {
    label: "Sofa or couch",
    image: "/images/quote-options/sofa.webp",
    imageAlt: "Three-seat upholstered sofa",
    quickQuestions: [
      { name: "sofa_seats", label: "How many seats?", choices: ["2", "3", "4+"] },
    ],
  },
  "quote-category-2": {
    label: "Sectional",
    image: "/images/quote-options/sectional.webp",
    imageAlt: "L-shaped upholstered sectional",
    quickQuestions: [
      { name: "sectional_seats", label: "How many seats?", choices: ["3–4", "5–6", "7+"] },
    ],
  },
  "quote-category-3": {
    label: "Armchair",
    image: "/images/quote-options/armchair.webp",
    imageAlt: "Upholstered armchair",
    quickQuestions: [
      { name: "armchair_quantity", label: "How many chairs?", choices: ["1", "2", "3+"] },
    ],
  },
  "quote-category-4": {
    label: "Dining chairs",
    image: "/images/quote-options/dining-chairs.webp",
    imageAlt: "Pair of upholstered dining chairs",
    quickQuestions: [
      { name: "dining_chair_quantity", label: "How many chairs?", choices: ["2", "4", "6", "8+"] },
      { name: "dining_upholstery_area", label: "Upholstery area", choices: ["Seat only", "Seat & back", "Not sure"] },
    ],
  },
  "quote-category-5": {
    label: "Mattress",
    image: "/images/quote-options/mattress.webp",
    imageAlt: "Quilted mattress",
    quickQuestions: [
      { name: "mattress_size", label: "Mattress size", choices: ["Twin", "Double", "Queen", "King"] },
      { name: "mattress_cleaning", label: "Cleaning needed", choices: ["Top only", "Both sides", "Not sure"] },
    ],
  },
  "quote-category-6": {
    label: "Carpet or rug",
    image: "/images/quote-options/rug.webp",
    imageAlt: "Partially rolled woven area rug",
    quickQuestions: [
      { name: "carpet_type", label: "What type?", choices: ["Area rug", "Wall-to-wall", "Stairs"] },
      { name: "carpet_size", label: "Approximate size", choices: ["Small", "Medium", "Large", "Not sure"] },
    ],
  },
  "quote-category-7": {
    label: "Other furniture",
    image: "/images/quote-options/other-furniture.webp",
    imageAlt: "Upholstered storage ottoman",
    quickQuestions: [
      { name: "other_piece", label: "What piece?", choices: ["Ottoman", "Bench", "Headboard", "Other"] },
      { name: "other_quantity", label: "How many pieces?", choices: ["1", "2", "3+"] },
    ],
  },
};

const serviceOptions = quoteCategories.map((category) => ({
  ...category,
  presentation: optionPresentation[category.id] ?? {
    label: category.label,
    image: "/images/quote-options/other-furniture.webp",
    imageAlt: category.label,
  },
}));

type ServiceOption = (typeof serviceOptions)[number];

type QuoteOptionCardProps = {
  option: ServiceOption;
  selected: boolean;
  errorId?: string;
  onToggle: (id: string) => void;
};

const QuoteOptionCard = memo(function QuoteOptionCard({
  option,
  selected,
  errorId,
  onToggle,
}: QuoteOptionCardProps) {
  return (
    <div className={`quote-page-option${selected ? " is-selected" : ""}`}>
      <label className="quote-page-option__toggle">
        <input
          type="checkbox"
          checked={selected}
          aria-describedby={errorId}
          onChange={() => onToggle(option.id)}
        />
        <span className="quote-page-options__visual" aria-hidden="true">
          <Image
            src={option.presentation.image}
            alt=""
            width={112}
            height={80}
            sizes="112px"
          />
        </span>
        <span className="quote-page-options__check" aria-hidden="true">✓</span>
        <span className="quote-page-options__label">{option.presentation.label}</span>
      </label>
    </div>
  );
});

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
  const router = useRouter();
  const [{ selected, activeDetailId }, setSelectionState] = useState({
    selected: [] as string[],
    activeDetailId: "",
  });
  const [quickDetails, setQuickDetails] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const openedAt = useRef(0);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const selectedOptions = useMemo(
    () => serviceOptions.filter((option) => selectedSet.has(option.id)),
    [selectedSet],
  );
  const activeDetailOption = useMemo(
    () =>
      selectedOptions.find((option) => option.id === activeDetailId) ??
      selectedOptions[selectedOptions.length - 1],
    [activeDetailId, selectedOptions],
  );
  const activeQuestions = activeDetailOption?.presentation.quickQuestions ?? [];
  const answeredCount = useMemo(
    () =>
      selectedOptions.filter((option) => {
        const questions = option.presentation.quickQuestions ?? [];
        return questions.length > 0 && questions.every((question) => Boolean(quickDetails[question.name]));
      }).length,
    [quickDetails, selectedOptions],
  );

  const toggleOption = useCallback((id: string) => {
    setError("");
    setSelectionState((current) => {
      const isSelected = current.selected.includes(id);
      const nextSelected = isSelected
        ? current.selected.filter((item) => item !== id)
        : [...current.selected, id];

      return {
        selected: nextSelected,
        activeDetailId: isSelected
          ? current.activeDetailId === id
            ? nextSelected[nextSelected.length - 1] ?? ""
            : current.activeDetailId
          : id,
      };
    });
  }, []);

  const showDetailOption = useCallback((id: string) => {
    setSelectionState((current) => ({ ...current, activeDetailId: id }));
  }, []);

  const showNextDetailOption = useCallback(() => {
    if (!activeDetailOption || selectedOptions.length < 2) return;
    const currentIndex = selectedOptions.findIndex(
      (option) => option.id === activeDetailOption.id,
    );
    const nextOption = selectedOptions[(currentIndex + 1) % selectedOptions.length];
    showDetailOption(nextOption.id);
  }, [activeDetailOption, selectedOptions, showDetailOption]);

  const updateQuickDetail = useCallback((name: string, value: string) => {
    setQuickDetails((current) =>
      current[name] === value ? current : { ...current, [name]: value },
    );
  }, []);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

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
    formData.set(
      "furniture",
      selectedOptions.map((item) => item.presentation.label).join(", "),
    );
    formData.set("service_ids", selectedOptions.map((item) => item.id).join(","));
    formData.set(
      "item_details",
      selectedOptions
        .map((item) => {
          const answers = (item.presentation.quickQuestions ?? [])
            .map((question) =>
              quickDetails[question.name]
                ? `${question.label}: ${quickDetails[question.name]}`
                : "",
            )
            .filter(Boolean)
            .join(", ");
          return answers ? `${item.presentation.label}: ${answers}` : "";
        })
        .filter(Boolean)
        .join("; "),
    );
    formData.set("phone", phone);
    formData.set("notes", notes);
    formData.delete("website");
    formData.set("access_key", integrations.web3formsAccessKey);
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
      await submitQuote(formData, controller.signal);

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
        <a href={siteConfig.phoneHref}>Need us sooner? Call {siteConfig.displayPhone}</a>
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
        <p className="quote-page-options__hint">Select all that apply.</p>
        <div className="quote-page-options__grid">
          {serviceOptions.map((option) => (
            <QuoteOptionCard
              key={option.id}
              option={option}
              selected={selectedSet.has(option.id)}
              errorId={error ? "quote-page-error" : undefined}
              onToggle={toggleOption}
            />
          ))}
        </div>
      </fieldset>

      {activeDetailOption && activeQuestions.length > 0 ? (
        <section className="quote-page-quick-detail" aria-live="polite">
          <div className="quote-page-quick-detail__heading">
            <p>
              <strong>A couple of quick details</strong>
              <small>
                {selectedOptions.length} {selectedOptions.length === 1 ? "item" : "items"} selected • answer what you know
              </small>
            </p>
          </div>

          <div
            className="quote-page-quick-detail__tabs"
            role="tablist"
            aria-label="Selected items"
            style={{
              gridTemplateColumns: `repeat(${selectedOptions.length}, minmax(0, 1fr))`,
            }}
          >
            {selectedOptions.map((option) => {
              const questions = option.presentation.quickQuestions ?? [];
              const answered = questions.length > 0 && questions.every(
                (question) => Boolean(quickDetails[question.name]),
              );
              const active = option.id === activeDetailOption.id;

              return (
                <button
                  key={option.id}
                  id={`quote-detail-tab-${option.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="quote-detail-panel"
                  className={`${active ? "is-active" : ""}${answered ? " is-answered" : ""}`}
                  onClick={() => showDetailOption(option.id)}
                >
                  {option.presentation.label}
                  {answered ? <span aria-label="answered">✓</span> : null}
                </button>
              );
            })}
          </div>

          <article
            className="quote-page-quick-detail__card"
            id="quote-detail-panel"
            role="tabpanel"
            aria-labelledby={`quote-detail-tab-${activeDetailOption.id}`}
          >
            <div className="quote-page-quick-detail__item">
              <Image
                src={activeDetailOption.presentation.image}
                alt=""
                width={118}
                height={72}
                sizes="118px"
              />
              <p>
                <strong>{activeDetailOption.presentation.label}</strong>
                <small>Tell us a little about this piece</small>
              </p>
            </div>

            <div className="quote-page-quick-detail__questions">
              {activeQuestions.map((question) => (
                <fieldset className="quote-page-quick-detail__question" key={question.name}>
                  <legend>{question.label}</legend>
                  <div>
                    {question.choices.map((choice) => (
                      <label key={choice}>
                        <input
                          type="radio"
                          name={question.name}
                          value={choice}
                          checked={quickDetails[question.name] === choice}
                          onChange={() => updateQuickDetail(question.name, choice)}
                        />
                        <span>{choice}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </article>

          <div className="quote-page-quick-detail__footer">
            <div className="quote-page-quick-detail__progress" aria-hidden="true">
              <i
                style={{
                  width: `${selectedOptions.length ? (answeredCount / selectedOptions.length) * 100 : 0}%`,
                }}
              />
            </div>
            <small>{answeredCount} of {selectedOptions.length} described</small>
            {selectedOptions.length > 1 ? (
              <button
                className="quote-page-quick-detail__next"
                type="button"
                onClick={showNextDetailOption}
              >
                Next item <span aria-hidden="true">→</span>
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      <label className="quote-page-field quote-page-field--notes">
        <span>Anything else we should know?</span>
        <textarea
          name="notes"
          rows={4}
          maxLength={1500}
          placeholder="Stains, pet odour, access notes, preferred timing..."
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
