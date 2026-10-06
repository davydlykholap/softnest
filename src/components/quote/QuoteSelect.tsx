"use client";

import { createPortal } from "react-dom";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type QuoteSelectOption = {
  value: string;
  label?: string;
};

type QuoteSelectProps = {
  value: string;
  options: QuoteSelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  size?: "compact" | "large";
  name?: string;
  tabIndex?: number;
  dataQuestion?: string;
  dataSelectName?: string;
};

type MenuPosition = {
  left: number;
  top?: number;
  bottom?: number;
  width: number;
  maxHeight: number;
  above: boolean;
};

export function QuoteSelect({
  value,
  options,
  onChange,
  ariaLabel,
  placeholder = "Select",
  size = "compact",
  name,
  tabIndex,
  dataQuestion,
  dataSelectName,
}: QuoteSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const listboxId = `quote-select-${id}`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [position, setPosition] = useState<MenuPosition>({
    left: 0,
    top: 0,
    width: 0,
    maxHeight: 240,
    above: false,
  });

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const menuOptions = options;

  const measure = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const gap = 7;
    const below = window.innerHeight - rect.bottom - gap - 8;
    const above = rect.top - gap - 8;
    const shouldOpenAbove = below < 150 && above > below;
    const maxHeight = Math.max(96, Math.min(248, shouldOpenAbove ? above : below));

    setPosition({
      left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
      top: shouldOpenAbove ? undefined : rect.bottom + gap,
      bottom: shouldOpenAbove ? window.innerHeight - rect.top + gap : undefined,
      width: rect.width,
      maxHeight,
      above: shouldOpenAbove,
    });
  }, []);

  const openMenu = useCallback((direction: -1 | 0 | 1 = 0) => {
    if (!menuOptions.length) return;
    measure();
    setActiveIndex(direction === 1 ? 0 : direction === -1 ? menuOptions.length - 1 : -1);
    setOpen(true);
  }, [measure, menuOptions]);

  const closeMenu = useCallback(() => setOpen(false), []);

  const choose = useCallback((index: number) => {
    const option = menuOptions[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, [menuOptions, onChange]);

  useEffect(() => {
    if (!open) return;
    const reposition = () => measure();
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
      document.removeEventListener("pointerdown", outside);
    };
  }, [measure, open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      if (!open) {
        openMenu(direction);
        return;
      }
      setActiveIndex((current) => {
        const next = current + direction;
        if (next < 0) return menuOptions.length - 1;
        if (next >= menuOptions.length) return 0;
        return next;
      });
      return;
    }

    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(Math.max(menuOptions.length - 1, 0));
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeMenu();
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      choose(activeIndex);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && !open) {
      event.preventDefault();
      openMenu(1);
      return;
    }
    if (event.key === "Tab") closeMenu();
  };

  const menuStyle: CSSProperties = {
    left: position.left,
    top: position.top,
    bottom: position.bottom,
    width: position.width,
    maxHeight: position.maxHeight,
  };

  return (
    <div className={`quote-select quote-select--${size}${open ? " is-open" : ""}`}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={triggerRef}
        type="button"
        className="quote-select__trigger"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-activedescendant={open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
        tabIndex={tabIndex}
        data-quote-question={dataQuestion}
        data-quote-select-name={dataSelectName}
        onClick={() => open ? closeMenu() : openMenu(0)}
        onKeyDown={handleKeyDown}
      >
        <span className={`quote-select__value${selectedOption ? "" : " is-placeholder"}`}>
          {selectedOption ? (selectedOption.label ?? selectedOption.value) : placeholder}
        </span>
        <svg className="quote-select__chevron" viewBox="0 0 20 20" aria-hidden="true">
          <path d="m6 8 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className={`quote-select-menu quote-select-menu--${size}${position.above ? " is-above" : ""}`}
          style={menuStyle}
        >
          {menuOptions.map((option, index) => {
            const active = index === activeIndex;
            return (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected="false"
                className={`quote-select-option${active ? " is-active" : ""}`}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => choose(index)}
              >
                <span>{option.label ?? option.value}</span>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </div>
  );
}
