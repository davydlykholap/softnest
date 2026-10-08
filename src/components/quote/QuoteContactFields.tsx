"use client";

import { Suspense, useState } from "react";
import { QuoteSelect } from "./QuoteSelect";
import QuoteLocationField, { type QuoteCity } from "./QuoteLocationField";

type QuoteContactFieldsProps = {
  customerType: "Individual" | "Business";
  phone: string;
  onPhoneChange: (value: string) => void;
  cities: QuoteCity[];
};

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

export function QuoteContactFields({ customerType, phone, onPhoneChange, cities }: QuoteContactFieldsProps) {
  const [serviceFrequency, setServiceFrequency] = useState("");

  return (
      <div className="quote-page-form__grid">
        {customerType === "Business" && (
          <label className="quote-page-field">
            <span>Organization name</span>
            <input
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Company or organization"
              minLength={2}
              maxLength={100}
              required
            />
          </label>
        )}
        <label className="quote-page-field">
          <span>{customerType === "Business" ? "Contact name" : "Your name"}</span>
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
        {customerType === "Business" && (
          <label className="quote-page-field">
            <span>Work email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              maxLength={254}
              required
            />
          </label>
        )}
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
            onChange={(event) => onPhoneChange(formatPhoneNumber(event.target.value))}
            required
          />
        </label>
        <Suspense fallback={<label className="quote-page-field"><span>Service city or postal code</span><input name="service_location" type="text" placeholder="Where is the cleaning needed?" minLength={2} maxLength={120} required /></label>}>
          <QuoteLocationField cities={cities} />
        </Suspense>
        {customerType === "Business" && (
          <>
            <div className="quote-page-field">
              <span>Service frequency</span>
              <QuoteSelect
                value={serviceFrequency}
                options={[
                  { value: "One-time" },
                  { value: "Recurring" },
                  { value: "Not sure", label: "Not sure yet" },
                ]}
                onChange={setServiceFrequency}
                ariaLabel="Service frequency"
                placeholder="Select frequency"
                size="large"
                name="service_frequency"
                dataSelectName="service_frequency"
              />
            </div>
          </>
        )}
      </div>
  );
}
