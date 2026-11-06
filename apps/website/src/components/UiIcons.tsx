type IconProps = {
  className?: string;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...common} d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...common} d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path {...common} d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MessageIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path {...common} d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" />
    <path {...common} d="M8 11.5h.01M12.5 11.5h.01M17 11.5h.01" />
  </svg>;
}

export function PhoneIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path {...common} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
  </svg>;
}

export function GlobeIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle {...common} cx="12" cy="12" r="9" />
    <path {...common} d="M3 12h18M12 3c2.4 2.5 3.5 5.5 3.5 9S14.4 18.5 12 21c-2.4-2.5-3.5-5.5-3.5-9S9.6 5.5 12 3Z" />
  </svg>;
}

export function PhotoIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect {...common} x="3" y="3" width="18" height="18" rx="3" />
    <circle {...common} cx="8" cy="8" r="1.5" />
    <path {...common} d="m21 15-5-5L5 21" />
  </svg>;
}

export function InstagramIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.3A2.7 2.7 0 0 0 4.3 7v10A2.7 2.7 0 0 0 7 19.7h10a2.7 2.7 0 0 0 2.7-2.7V7A2.7 2.7 0 0 0 17 4.3H7Zm10.1 1.55a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM12 7.15A4.85 4.85 0 1 1 7.15 12 4.85 4.85 0 0 1 12 7.15Zm0 2.3A2.55 2.55 0 1 0 14.55 12 2.55 2.55 0 0 0 12 9.45Z"
    />
  </svg>;
}

export function GripVerticalIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="9" cy="7" r="1.25" fill="currentColor" />
      <circle cx="15" cy="7" r="1.25" fill="currentColor" />
      <circle cx="9" cy="12" r="1.25" fill="currentColor" />
      <circle cx="15" cy="12" r="1.25" fill="currentColor" />
      <circle cx="9" cy="17" r="1.25" fill="currentColor" />
      <circle cx="15" cy="17" r="1.25" fill="currentColor" />
    </svg>
  );
}
