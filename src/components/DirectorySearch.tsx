"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type DirectorySearchOption = {
  id: string;
  label: string;
  hint: string;
};

type Props = {
  id: string;
  label: string;
  placeholder: string;
  submitLabel: string;
  value: string;
  options: DirectorySearchOption[];
  optionsLabel: string;
  emptyMessage: string;
  message?: string;
  onChange: (value: string) => void;
  onChoose: (option: DirectorySearchOption) => void;
  onSubmit: () => void;
};

export default function DirectorySearch({
  id,
  label,
  placeholder,
  submitLabel,
  value,
  options,
  optionsLabel,
  emptyMessage,
  message,
  onChange,
  onChoose,
  onSubmit,
}: Props) {
  const listId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const messageId = `${id}-message`;

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  const choose = (option: DirectorySearchOption) => {
    onChoose(option);
    setOpen(false);
    setActiveIndex(-1);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    setActiveIndex(-1);
    onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        options.length ? Math.min(current + 1, options.length - 1) : -1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) =>
        options.length
          ? current <= 0
            ? options.length - 1
            : current - 1
          : -1,
      );
      return;
    }

    if (event.key === "Enter" && open && activeIndex >= 0 && options[activeIndex]) {
      event.preventDefault();
      choose(options[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <form className="locations-search" onSubmit={submit} ref={formRef}>
      <label htmlFor={id}>{label}</label>
      <div className="locations-search__field">
        <span className="locations-search__pin" aria-hidden="true" />
        <input
          id={id}
          name={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && activeIndex >= 0 && options[activeIndex]
              ? `${listId}-${options[activeIndex].id}`
              : undefined
          }
          aria-describedby={message ? messageId : undefined}
        />
        <button
          className="locations-search__toggle"
          type="button"
          aria-label={open ? "Close suggestions" : "Show suggestions"}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => {
            setOpen((current) => !current);
            setActiveIndex(-1);
          }}
        >
          <span aria-hidden="true" />
        </button>

        <div
          className={`locations-search__options ${
            open ? "locations-search__options--open" : ""
          }`}
          id={listId}
          role="listbox"
          aria-label={optionsLabel}
        >
          {options.length ? (
            options.map((option, index) => (
              <button
                id={`${listId}-${option.id}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={
                  index === activeIndex
                    ? "locations-search__option locations-search__option--active"
                    : "locations-search__option"
                }
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
                key={option.id}
              >
                <span>{option.label}</span>
                <small>{option.hint}</small>
              </button>
            ))
          ) : (
            <p className="locations-search__empty">{emptyMessage}</p>
          )}
        </div>
      </div>
      <button type="submit">{submitLabel}</button>
      {message ? (
        <p id={messageId} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
