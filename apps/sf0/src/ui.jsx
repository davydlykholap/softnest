import { createContext, useContext } from "react";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  InfoIcon,
  ChartLineUpIcon,
} from "@phosphor-icons/react";
import { format, percent } from "./data.js";
export const WorkspaceContext = createContext(null);
export const useWorkspace = () => useContext(WorkspaceContext);
export const Icon = ({ as: Component, size = 19, ...props }) => (
  <Component size={size} weight="regular" aria-hidden="true" {...props} />
);

export function Meter({ value, max, tone = "medium", label }) {
  return (
    <meter
      className={`data-meter ${tone}`}
      min="0"
      max={Math.max(max, 1)}
      value={value}
      aria-label={label}
    >
      {percent(value, max)}
    </meter>
  );
}
export function MetricStrip({ items }) {
  return (
    <section className="metric-strip" aria-label="Report summary">
      {items.map((item) => (
        <div className="metric" key={item.label}>
          <span className="metric-label">{item.label}</span>
          <div>
            <strong>
              {typeof item.value === "number" ? format(item.value) : item.value}
            </strong>
            {item.change ? (
              <span className="change" title="Illustrative sample comparison">
                <Icon as={ChartLineUpIcon} size={16} />+{item.change}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}
export function FilterInput({
  value,
  onChange,
  placeholder = "Search channels",
}) {
  return (
    <label className="filter-input">
      <Icon as={MagnifyingGlassIcon} size={16} />
      <span className="sr-only">{placeholder}</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
export function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="empty-state">
      <Icon as={MagnifyingGlassIcon} size={24} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action ? (
        <button className="button" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  );
}
export function SourceNote({ source }) {
  const { navigate } = useWorkspace();
  return (
    <div className="inline-note">
      <Icon as={InfoIcon} size={17} />
      <span>Illustrative {source} report. A live source is not connected.</span>
      <button className="text-link" onClick={() => navigate("integrations")}>
        Manage sources <Icon as={ArrowRightIcon} size={14} />
      </button>
    </div>
  );
}
export function dateLabel(start, end) {
  const fmt = (value) =>
    new Intl.DateTimeFormat("en-CA", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T12:00:00Z`));
  return `${fmt(start)} – ${fmt(end)}, ${end.slice(0, 4)}`;
}
