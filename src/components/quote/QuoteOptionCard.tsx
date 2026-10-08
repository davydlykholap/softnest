"use client";

import Image from "next/image";
import { memo } from "react";
import { businessQuantityQuestions, isPlusChoice } from "./quoteAnswers";
import { QuoteSelect } from "./QuoteSelect";
import type { QuickQuestion, ServiceOption } from "./quoteOptions";
import type { QuoteEntry } from "./quoteRequest";

type QuoteOptionCardProps = {
  disabled: boolean;
  option: ServiceOption;
  selected: boolean;
  active: boolean;
  customerType: "Individual" | "Business";
  entries: QuoteEntry[];
  businessAmount: string;
  onToggle: (id: string) => void;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onAddEntry: (id: string) => void;
  onRemoveEntry: (id: string, entryId: string) => void;
  onAnswerChange: (id: string, entryId: string, name: string, value: string) => void;
  onExactQuantityChange: (id: string, entryId: string, name: string, value: string) => void;
  onAmountChange: (id: string, value: string) => void;
};

function isQuestionVisible(question: QuickQuestion, entry: QuoteEntry) {
  if (!question.showWhen) return true;
  return question.showWhen.values.includes(entry.answers[question.showWhen.name] ?? "");
}
type QuestionFieldProps = {
  optionId: string;
  entry: QuoteEntry;
  entryIndex: number;
  entryLabel: string;
  question: QuickQuestion;
  active: boolean;
  onAnswerChange: QuoteOptionCardProps["onAnswerChange"];
  onExactQuantityChange: QuoteOptionCardProps["onExactQuantityChange"];
};

function QuestionField({
  optionId,
  entry,
  entryIndex,
  entryLabel,
  question,
  active,
  onAnswerChange,
  onExactQuantityChange,
}: QuestionFieldProps) {
  const value = entry.answers[question.name] ?? "";
  const exact = entry.exactQuantities[question.name] ?? "";
  const label = `${question.label} for ${entryLabel.toLowerCase()} ${entryIndex + 1}`;
  const fieldClass = `quote-page-option__select-field quote-page-option__field-reveal${
    question.layout === "half" ? " quote-page-option__select-field--half" : ""
  }`;

  if (!isQuestionVisible(question, entry)) return null;
  if (question.type === "number" || question.type === "text") {
    return (
      <label className={fieldClass}>
        <span>{question.label}</span>
        <input
          type={question.type === "number" ? "text" : "text"}
          inputMode={question.type === "number" ? "decimal" : undefined}
          maxLength={question.type === "text" ? question.max : 8}
          value={value}
          tabIndex={active ? 0 : -1}
          data-quote-question={question.name}
          aria-label={label}
          placeholder={question.placeholder}
          onChange={(event) => {
            const nextValue = question.type === "number"
              ? event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
              : event.target.value;
            onAnswerChange(optionId, entry.id, question.name, nextValue);
          }}
        />
      </label>
    );
  }

  const choices = question.choices ?? [];
  return (
    <div className={fieldClass}>
      <span>{question.label}</span>
      <QuoteSelect
        value={value}
        options={choices.map((choice) => ({ value: choice }))}
        onChange={(nextValue) => onAnswerChange(
          optionId,
          entry.id,
          question.name,
          nextValue,
        )}
        ariaLabel={label}
        placeholder="Select"
        size="compact"
        tabIndex={active ? 0 : -1}
        dataQuestion={question.name}
      />
      {isPlusChoice(value) && (
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={3}
          value={exact}
          tabIndex={active ? 0 : -1}
          className="quote-page-option__exact-input quote-page-option__field-reveal"
          data-quote-exact={question.name}
          aria-label={`Exact number for ${entryLabel.toLowerCase()} ${entryIndex + 1}`}
          placeholder="Exact number"
          onChange={(event) => onExactQuantityChange(
            optionId,
            entry.id,
            question.name,
            event.target.value.replace(/\D/g, ""),
          )}
        />
      )}
    </div>
  );
}

export const QuoteOptionCard = memo(function QuoteOptionCard({
  disabled,
  option,
  selected,
  active,
  customerType,
  entries,
  businessAmount,  onToggle,
  onActivate,
  onDeactivate,
  onAddEntry,
  onRemoveEntry,
  onAnswerChange,
  onExactQuantityChange,
  onAmountChange,
}: QuoteOptionCardProps) {
  const questions = option.presentation.quickQuestions.filter(
    (question) => customerType !== "Business" || !businessQuantityQuestions.has(question.name),
  );
  const entryLabel = option.presentation.entryLabel;

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
        disabled={disabled}
        aria-pressed={selected}
        aria-expanded={active}
        aria-controls={`quote-item-details-${option.id}`}
        onClick={() => onToggle(option.id)}
      >        <span className="quote-page-options__visual" aria-hidden="true">
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

      <div
        className="quote-page-option__details"
        id={`quote-item-details-${option.id}`}
        aria-hidden={!active}
      >
        <div className="quote-page-option__details-clip">
          <div className="quote-page-option__details-inner">
            {questions.length > 0 && entries.map((entry, index) => (
              <div className="quote-page-option__entry-shell" key={entry.id}>
                <div className="quote-page-option__entry" data-quote-entry={entry.id}>
                  <div className="quote-page-option__entry-header">
                    <strong>{entryLabel} {index + 1}</strong>
                    {entries.length > 1 && (
                      <button
                        type="button"
                        className="quote-page-option__remove"
                        tabIndex={active ? 0 : -1}
                        aria-label={`Remove ${entryLabel.toLowerCase()} ${index + 1}`}
                        onClick={() => onRemoveEntry(option.id, entry.id)}
                      >                        Remove
                      </button>
                    )}
                  </div>

                  <div className="quote-page-option__entry-fields">
                    {questions.map((question) => (
                      <QuestionField
                        key={question.name}
                        optionId={option.id}
                        entry={entry}
                        entryIndex={index}
                        entryLabel={entryLabel}
                        question={question}
                        active={active}
                        onAnswerChange={onAnswerChange}
                        onExactQuantityChange={onExactQuantityChange}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {questions.length > 0 && (
              <button
                type="button"
                className="quote-page-option__add"
                tabIndex={active ? 0 : -1}
                onClick={() => onAddEntry(option.id)}
              >
                + Add another {entryLabel.toLowerCase()}
              </button>
            )}
            {customerType === "Business" && option.id !== "quote-category-6" && (
              <label className="quote-page-option__amount">
                <span>Total number of pieces</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="e.g. 30"
                  value={businessAmount}
                  tabIndex={active ? 0 : -1}
                  onChange={(event) => onAmountChange(
                    option.id,
                    event.target.value.replace(/\D/g, ""),
                  )}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
