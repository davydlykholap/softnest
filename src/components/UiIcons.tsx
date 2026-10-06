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
