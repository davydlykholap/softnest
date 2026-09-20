"use client";

import Image from "next/image";
import { memo, useRef } from "react";
import { businessQuantityQuestions, isPlusChoice } from "./quoteAnswers";
import type { ServiceOption } from "./quoteOptions";

type QuoteOptionCardProps = {
  option: ServiceOption;
  selected: boolean;
  active: boolean;
  customerType: "Individual" | "Business";
  quickDetails: Record<string, string>;
  exactQuantities: Record<string, string>;
  businessAmount: string;
  onToggle: (id: string) => void;
  onEnsureSelected: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onDetailChange: (name: string, value: string) => void;
  onExactQuantityChange: (name: string, value: string) => void;
  onAmountChange: (id: string, value: string) => void;
};

export const QuoteOptionCard = memo(function QuoteOptionCard({
  option,
  selected,
  active,
  customerType,
  quickDetails,
  exactQuantities,
  businessAmount,
  onToggle,
  onEnsureSelected,
  onActivate,
  onDeactivate,
  onDetailChange,
  onExactQuantityChange,
  onAmountChange,
}: QuoteOptionCardProps) {
  const questions = (option.presentation.quickQuestions ?? []).filter(
    (question) => customerType !== "Business" || !businessQuantityQuestions.has(question.name),
  );
  const exactInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`quote-page-option${selected ? " is-selected" : ""}${active ? " is-active" : ""}`}
      onFocus={(event) => {
        if (event.target === event.currentTarget.querySelector(".quote-page-option__toggle") &&
          event.target.matches(":focus-visible")) onActivate(option.id);
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          onDeactivate(option.id);
        }
      }}
    >
      <button
        className="quote-page-option__toggle"
        type="button"
        aria-pressed={selected}
        aria-expanded={active}
        aria-controls={`quote-item-details-${option.id}`}
        onClick={() => onToggle(option.id)}
      >
        <span className="quote-page-options__visual" aria-hidden="true">
          <Image
            src={option.presentation.image}
            alt=""
            width={112}
            height={80}
            sizes="112px"
          />
        </span>
        <span className="quote-page-options__label">{option.presentation.label}</span>
      </button>
      <span className="quote-page-options__check" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
      <div className="quote-page-option__details" id={`quote-item-details-${option.id}`} aria-hidden={!active}>
        <div className="quote-page-option__details-inner">
          {questions.map((question) => (
            <fieldset className="quote-page-option__question" key={question.name}>
              <legend>{question.label}</legend>
              {question.choices.some(isPlusChoice) ? (
                <div className={`quote-page-option__quantity-controls${isPlusChoice(quickDetails[question.name] ?? "") ? " is-exact" : ""}`}>
                  <span className="quote-page-option__quantity-counts">
                    {question.choices.filter((choice) => !isPlusChoice(choice)).map((choice) => (
                      <label className="quote-page-option__choice" key={choice}>
                        <input
                          type="radio"
                          name={question.name}
                          value={choice}
                          checked={quickDetails[question.name] === choice}
                          tabIndex={active && !isPlusChoice(quickDetails[question.name] ?? "") ? 0 : -1}
                          onChange={() => {
                            onEnsureSelected(option.id);
                            onDetailChange(question.name, choice);
                          }}
                        />
                        <span>{choice}</span>
                      </label>
                    ))}
                  </span>
                  <label className="quote-page-option__choice">
                    <input
                      type="checkbox"
                      name={question.name}
                      value={question.choices.find(isPlusChoice)}
                      checked={isPlusChoice(quickDetails[question.name] ?? "")}
                      tabIndex={active ? 0 : -1}
                      onChange={() => {
                        onEnsureSelected(option.id);
                        const wasExact = isPlusChoice(quickDetails[question.name] ?? "");
                        onDetailChange(question.name, wasExact ? "" : question.choices.find(isPlusChoice) ?? "");
                        if (!wasExact) {
                          window.requestAnimationFrame(() => exactInputRef.current?.focus());
                        }
                      }}
                    />
                    <span>{question.choices.find(isPlusChoice)}</span>
                  </label>
                  <label className="quote-page-option__quantity-input" aria-hidden={!isPlusChoice(quickDetails[question.name] ?? "")}>
                    <input
                      ref={exactInputRef}
                      name={`${question.name}_exact`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={3}
                      aria-label={`Exact number for ${option.presentation.label.toLowerCase()}`}
                      placeholder="Exact count"
                      value={exactQuantities[question.name] ?? ""}
                      disabled={!isPlusChoice(quickDetails[question.name] ?? "")}
                      tabIndex={active && isPlusChoice(quickDetails[question.name] ?? "") ? 0 : -1}
                      onChange={(event) => onExactQuantityChange(question.name, event.target.value.replace(/\D/g, ""))}
                    />
                  </label>
                </div>
              ) : (
                <div>
                  {question.choices.map((choice) => (
                    <label className="quote-page-option__choice" key={choice}>
                      <input
                        type="radio"
                        name={question.name}
                        value={choice}
                        checked={quickDetails[question.name] === choice}
                        tabIndex={active ? 0 : -1}
                        onChange={() => {
                          onEnsureSelected(option.id);
                          onDetailChange(question.name, choice);
                        }}
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          ))}
          {customerType === "Business" && (
            <label className="quote-page-option__amount">
              <span>{option.id === "quote-category-6"
                ? "Approx. area (sq ft)"
                : "Number of pieces"}</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder={option.id === "quote-category-6" ? "e.g. 2000" : "e.g. 30"}
                value={businessAmount}
                tabIndex={active ? 0 : -1}
                onChange={(event) => {
                  onEnsureSelected(option.id);
                  onAmountChange(option.id, event.target.value.replace(/\D/g, ""));
                }}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
});
