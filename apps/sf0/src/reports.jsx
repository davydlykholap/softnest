import { lazy, Suspense, useState } from "react";
import {
  ArrowRightIcon,
  CaretDownIcon,
  CaretUpDownIcon,
  DownloadSimpleIcon,
  InfoIcon,
  PulseIcon,
  GlobeIcon,
  LinkIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MegaphoneIcon,
  UploadSimpleIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import {
  useWorkspace,
  Icon,
  MetricStrip,
  Meter,
  FilterInput,
  EmptyState,
  SourceNote,
  dateLabel,
} from "./ui.jsx";
import {
  format,
  percent,
  totals,
  downloadCSV,
  PAGES,
  QUERIES,
} from "./data.js";
const TrendChart = lazy(() => import("./TrendChart.jsx"));

export function Conversion() {
  const {
    unit,
    setUnit,
    count,
    report,
    compare,
    setCompare,
    isSample,
    hasUsers,
    navigate,
    setModal,
  } = useWorkspace();
  return (
    <>
      <MetricStrip
        items={[
          {
            label: unit === "users" ? "Users" : "Sessions",
            value: count,
            change: compare && isSample ? "18.6%" : null,
          },
          {
            label: "Quote starts",
            value: report.starts,
            change: compare && isSample ? "16.9%" : null,
          },
          {
            label: "Quote submissions",
            value: report.quotes,
            change: compare && isSample ? "21.1%" : null,
          },
        ]}
      />
      <section className="journey-layout">
        <div className="journey-report">
          <div className="section-heading">
            <h2>Quote journey</h2>
            <div className="report-controls">
              <div className="segmented" aria-label="Count by">
                {["sessions", "users"].map((value) => (
                  <button
                    key={value}
                    className={unit === value ? "active" : ""}
                    onClick={() => setUnit(value)}
                    disabled={value === "users" && !hasUsers}
                    title={
                      value === "users" && !hasUsers
                        ? "Import a users column to enable user counts"
                        : undefined
                    }
                    aria-pressed={unit === value}
                  >
                    {value === "sessions" ? "Sessions" : "Users"}
                  </button>
                ))}
              </div>
              <label className="select-wrap">
                <span className="sr-only">Comparison</span>
                <select
                  value={compare && isSample ? "previous" : "none"}
                  disabled={!isSample}
                  onChange={(e) => setCompare(e.target.value === "previous")}
                >
                  <option value="previous">vs. previous period</option>
                  <option value="none">No comparison</option>
                </select>
                <Icon as={CaretDownIcon} size={12} />
              </label>
            </div>
          </div>
          <div className="funnel-rows">
            {[
              {
                label: unit === "users" ? "Website user" : "Website session",
                value: count,
                tone: "soft",
              },
              { label: "Quote started", value: report.starts, tone: "medium" },
              {
                label: "Quote submitted",
                value: report.quotes,
                tone: "strong",
              },
            ].map((stage) => (
              <button
                className="funnel-row"
                key={stage.label}
                onClick={() => setModal("journey")}
                aria-label={`${stage.label}: ${format(stage.value)}, ${percent(stage.value, count)}. View journey.`}
              >
                <span>{stage.label}</span>
                <Meter
                  value={stage.value}
                  max={count}
                  tone={stage.tone}
                  label={stage.label}
                />
                <span className="funnel-count">{format(stage.value)}</span>
                <span className="funnel-percent">
                  {stage.value === count && count
                    ? "100%"
                    : percent(stage.value, count)}
                </span>
              </button>
            ))}
          </div>
          <p className="completion-note">
            {percent(report.quotes, report.starts, 1)} of quote starts resulted
            in a submission.
          </p>
        </div>
        <aside className="inspector">
          <h2>What to inspect</h2>
          <button
            className="inspection-item"
            onClick={() => setModal("journey")}
          >
            <span>01</span>
            <div>
              <h3>Form completion</h3>
              <p>Review where visitors leave the quote flow.</p>
            </div>
          </button>
          <button
            className="inspection-item"
            onClick={() => {
              navigate("events");
            }}
          >
            <span>02</span>
            <div>
              <h3>Mobile experience</h3>
              <p>Compare quote completion across devices.</p>
            </div>
          </button>
          <button className="text-link" onClick={() => navigate("events")}>
            Explore events <Icon as={ArrowRightIcon} size={16} />
          </button>
          <p className="small-note">
            {isSample
              ? "Illustrative prompts, not measured findings."
              : "Review prompts, not automated findings."}
          </p>
        </aside>
      </section>
      <ChannelTable title="Channels that drive enquiries" compact />
    </>
  );
}

export function ChannelTable({
  title = "Acquisition channels",
  compact = false,
}) {
  const { rows, report, filter, setFilter, setModal, navigate } =
    useWorkspace();
  const [sort, setSort] = useState({ key: "sessions", descending: true });
  const filtered = rows
    .filter((row) => row.channel.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => {
      const av =
        sort.key === "rate" ? a.quotes / (a.sessions || 1) : a[sort.key];
      const bv =
        sort.key === "rate" ? b.quotes / (b.sessions || 1) : b[sort.key];
      return (
        (typeof av === "string" ? av.localeCompare(bv) : av - bv) *
        (sort.descending ? -1 : 1)
      );
    });
  const total = totals(filtered);
  const sortBy = (key) =>
    setSort((prev) => ({
      key,
      descending: prev.key === key ? !prev.descending : key !== "channel",
    }));
  return (
    <section className="channel-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <div className="table-tools">
          <FilterInput value={filter} onChange={setFilter} />
          {compact ? (
            <button
              className="text-link"
              onClick={() => navigate("acquisition")}
            >
              View all
            </button>
          ) : (
            <button
              className="icon-button"
              aria-label="Export channel data"
              title="Export channel data"
              onClick={() =>
                downloadCSV("sf0-channels.csv", [
                  [
                    "channel",
                    "sessions",
                    "starts",
                    "quotes",
                    ...(rows.every((r) => r.users != null) ? ["users"] : []),
                  ],
                  ...filtered.map((r) => [
                    r.channel,
                    r.sessions,
                    r.starts,
                    r.quotes,
                    ...(rows.every((r) => r.users != null) ? [r.users] : []),
                  ]),
                ])
              }
            >
              <Icon as={DownloadSimpleIcon} size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {[
                ["channel", "Channel"],
                ["sessions", "Sessions"],
                ...(!compact ? [["starts", "Quote starts"]] : []),
                ["quotes", "Quote submissions"],
                ["rate", "Quote rate"],
              ].map(([key, label], i) => (
                <th
                  key={key}
                  className={i ? "numeric" : ""}
                  aria-sort={
                    sort.key === key
                      ? sort.descending
                        ? "descending"
                        : "ascending"
                      : undefined
                  }
                >
                  <button onClick={() => sortBy(key)}>
                    {label}
                    <Icon as={CaretUpDownIcon} size={12} />
                  </button>
                </th>
              ))}
              <th className="share-column">Share of quotes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.channel}
                onClick={() => setModal({ type: "channel", row })}
              >
                <th scope="row">
                  <button
                    className="row-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal({ type: "channel", row });
                    }}
                  >
                    {row.channel}
                  </button>
                </th>
                <td className="numeric">{format(row.sessions)}</td>
                {!compact ? (
                  <td className="numeric">{format(row.starts)}</td>
                ) : null}
                <td className="numeric">{format(row.quotes)}</td>
                <td className="numeric">{percent(row.quotes, row.sessions)}</td>
                <td className="share-cell">
                  <Meter
                    value={row.quotes}
                    max={report.quotes}
                    label={`${row.channel} share of quotes`}
                  />
                  <span>{percent(row.quotes, report.quotes, 1)}</span>
                </td>
              </tr>
            ))}
          </tbody>
          {filtered.length ? (
            <tfoot>
              <tr>
                <th scope="row">{filter ? "Filtered total" : "Total"}</th>
                <td className="numeric">{format(total.sessions)}</td>
                {!compact ? (
                  <td className="numeric">{format(total.starts)}</td>
                ) : null}
                <td className="numeric">{format(total.quotes)}</td>
                <td className="numeric">
                  {percent(total.quotes, total.sessions)}
                </td>
                <td />
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
      {!filtered.length ? (
        <EmptyState
          title="No matching channels"
          text="Try a different channel name or clear your search."
          action="Clear search"
          onAction={() => setFilter("")}
        />
      ) : null}
    </section>
  );
}

export function Overview() {
  const { report, isSample, period, rows, navigate } = useWorkspace();
  return (
    <>
      <MetricStrip
        items={[
          { label: "Sessions", value: report.sessions },
          { label: "Quote starts", value: report.starts },
          { label: "Quote submissions", value: report.quotes },
          {
            label: "Quote rate",
            value: percent(report.quotes, report.sessions),
          },
        ]}
      />
      {isSample ? (
        <section className="overview-chart">
          <div className="section-heading">
            <h2>Traffic over time</h2>
            <span className="subtle">Daily sessions · Sample data</span>
          </div>
          <Suspense
            fallback={
              <div className="chart-loading">Loading traffic chart…</div>
            }
          >
            <TrendChart start={period.start} end={period.end} />
          </Suspense>
        </section>
      ) : (
        <div className="inline-note">
          <Icon as={InfoIcon} />
          <span>
            Your CSV contains channel totals. A daily data source is needed to
            show a time series.
          </span>
        </div>
      )}
      <div className="overview-bottom">
        <section>
          <div className="section-heading">
            <h2>Acquisition channels</h2>
            <button
              className="text-link"
              onClick={() => navigate("acquisition")}
            >
              View all <Icon as={ArrowRightIcon} size={14} />
            </button>
          </div>
          <div className="source-list">
            {rows.map((r) => (
              <div key={r.channel}>
                <span>{r.channel}</span>
                <Meter
                  value={r.sessions}
                  max={report.sessions}
                  label={r.channel}
                />
                <strong>{format(r.sessions)}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="overview-focus">
          <h2>Follow the journey</h2>
          <p>
            See which channels lead visitors to your quote form, and how often
            those visits become enquiries.
          </p>
          <button className="button" onClick={() => navigate("conversion")}>
            Explore conversion <Icon as={ArrowRightIcon} size={16} />
          </button>
          <span className="small-note">
            {isSample
              ? "Showing an illustrative website journey."
              : "Based on your imported channel totals."}
          </span>
        </section>
      </div>
    </>
  );
}

export function PageReport({ embedded = false }) {
  const { view, filter, setFilter, setModal } = useWorkspace();
  const [type, setType] = useState(view === "content" ? "Content" : "All");
  const items = PAGES.filter(
    (p) =>
      (type === "All" || p.type === type) &&
      `${p.page} ${p.path}`.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <>
      {!embedded ? (
        <SourceNote source={view === "content" ? "content" : "page"} />
      ) : null}
      <div className="section-heading report-filterbar">
        <div className="segmented">
          {["All", "Location", "Service", "Content"].map((t) => (
            <button
              key={t}
              className={type === t ? "active" : ""}
              onClick={() => setType(t)}
            >
              {t === "All" ? "All pages" : t}
            </button>
          ))}
        </div>
        <FilterInput
          value={filter}
          onChange={setFilter}
          placeholder="Search pages"
        />
      </div>
      <div className="table-scroll">
        <table className="page-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Type</th>
              <th className="numeric">Sessions</th>
              <th className="numeric">Quotes</th>
              <th className="numeric">Quote rate</th>
              <th className="numeric">Change</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.path}>
                <th>
                  <button
                    className="row-link"
                    onClick={() => setModal({ type: "page", page: p })}
                  >
                    {p.page}
                    <span className="path-label">{p.path}</span>
                  </button>
                </th>
                <td>
                  <span className="neutral-tag">{p.type}</span>
                </td>
                <td className="numeric">{format(p.sessions)}</td>
                <td className="numeric">{p.quotes}</td>
                <td className="numeric">{percent(p.quotes, p.sessions)}</td>
                <td className="numeric change">+{p.change}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!items.length ? (
        <EmptyState
          title="No matching pages"
          text="Try another page name or page type."
          action="Clear filters"
          onAction={() => {
            setFilter("");
            setType("All");
          }}
        />
      ) : null}
      <p className="small-note table-note">
        Showing {items.length} example pages. Values are illustrative and
        independent of channel imports.
      </p>
    </>
  );
}

export function EventsReport() {
  const { filter, setFilter } = useWorkspace();
  const [device, setDevice] = useState("all");
  const examples = [
    { name: "page_view", label: "Page viewed", count: 4218 },
    { name: "quote_click", label: "Quote link clicked", count: 214 },
    { name: "quote_start", label: "Quote started", count: 138 },
    { name: "generate_lead", label: "Quote submitted", count: 46 },
    { name: "click_to_call", label: "Phone link clicked", count: 73 },
  ];
  const items = examples.filter((e) =>
    `${e.name} ${e.label}`.toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <>
      <SourceNote source="event" />
      <div className="section-heading report-filterbar">
        <h2>Tracked actions</h2>
        <div className="report-controls">
          <label className="select-wrap">
            <span className="sr-only">Device</span>
            <select value={device} onChange={(e) => setDevice(e.target.value)}>
              <option value="all">All devices</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
            </select>
            <Icon as={CaretDownIcon} size={12} />
          </label>
          <FilterInput
            value={filter}
            onChange={setFilter}
            placeholder="Search events"
          />
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Action</th>
              <th>Device</th>
              <th className="numeric">Sample event count</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.name}>
                <th>
                  <code>{e.name}</code>
                </th>
                <td>{e.label}</td>
                <td>
                  {device === "mobile"
                    ? "Mobile"
                    : device === "desktop"
                      ? "Desktop"
                      : "All devices"}
                </td>
                <td className="numeric">
                  {format(
                    Math.round(
                      e.count *
                        (device === "mobile"
                          ? 0.64
                          : device === "desktop"
                            ? 0.36
                            : 1),
                    ),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!items.length ? (
        <EmptyState
          title="No matching events"
          text="Try a different event name."
          action="Clear search"
          onAction={() => setFilter("")}
        />
      ) : null}
      <div className="inline-note">
        <Icon as={InfoIcon} />
        <span>
          Phone clicks indicate intent to call, not answered calls. Event and
          device breakdowns are sample data.
        </span>
      </div>
    </>
  );
}

export function SearchReport() {
  const { filter, setFilter } = useWorkspace();
  const [tab, setTab] = useState("Queries");
  const items = QUERIES.filter((q) => q.query.includes(filter.toLowerCase()));
  return (
    <>
      <SourceNote source="Search Console" />
      <MetricStrip
        items={[
          { label: "Search clicks", value: 1926 },
          { label: "Impressions", value: 48200 },
          { label: "Average CTR", value: "4.00%" },
          { label: "Average position", value: "14.2" },
        ]}
      />
      <div className="section-heading report-filterbar">
        <div className="segmented">
          {["Queries", "Pages"].map((t) => (
            <button
              className={tab === t ? "active" : ""}
              key={t}
              onClick={() => {
                setTab(t);
                setFilter("");
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "Queries" ? (
          <FilterInput
            value={filter}
            onChange={setFilter}
            placeholder="Search queries"
          />
        ) : null}
      </div>
      {tab === "Queries" ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Search query</th>
                <th className="numeric">Clicks</th>
                <th className="numeric">Impressions</th>
                <th className="numeric">CTR</th>
                <th className="numeric">Avg. position</th>
                <th className="numeric">Movement</th>
              </tr>
            </thead>
            <tbody>
              {items.map((q) => (
                <tr key={q.query}>
                  <th>{q.query}</th>
                  <td className="numeric">{q.clicks}</td>
                  <td className="numeric">{format(q.impressions)}</td>
                  <td className="numeric">
                    {percent(q.clicks, q.impressions)}
                  </td>
                  <td className="numeric">{q.position}</td>
                  <td
                    className={`numeric ${q.change > 0 ? "change" : "negative"}`}
                  >
                    {q.change > 0 ? "+" : ""}
                    {q.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length ? (
            <EmptyState
              title="No matching queries"
              text="Try a shorter phrase."
              action="Clear search"
              onAction={() => setFilter("")}
            />
          ) : null}
        </div>
      ) : (
        <PageReport embedded />
      )}
      <p className="small-note table-note">
        Average search position is not a location-specific Maps rank. Rankings
        here are illustrative.
      </p>
    </>
  );
}

export function LocalReport() {
  const [city, setCity] = useState("Mississauga");
  const [keyword, setKeyword] = useState("sofa cleaning");
  const [selected, setSelected] = useState(12);
  const { navigate } = useWorkspace();
  const grid = [
    9, 7, 6, 7, 12, 6, 3, 2, 3, 8, 5, 2, 1, 2, 6, 11, 3, 2, 3, 9, 14, 8, 3, 2,
    13,
  ];
  return (
    <>
      <SourceNote source="local ranking" />
      <div className="local-controls">
        <label>
          Keyword
          <select value={keyword} onChange={(e) => setKeyword(e.target.value)}>
            <option>sofa cleaning</option>
            <option>upholstery cleaning</option>
            <option>carpet cleaning</option>
          </select>
        </label>
        <label>
          Location
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Mississauga</option>
            <option>Toronto</option>
            <option>Oakville</option>
          </select>
        </label>
        <span className="small-note">
          Same example grid · No rank provider connected
        </span>
      </div>
      <MetricStrip
        items={[
          { label: "Top 3 coverage", value: "44%" },
          { label: "Average grid rank", value: "5.9" },
          { label: "Search points", value: 25 },
        ]}
      />
      <div className="local-layout">
        <section>
          <div className="section-heading">
            <h2>
              {city} · {keyword}
            </h2>
            <span className="neutral-tag">Illustrative 5 × 5 grid</span>
          </div>
          <div className="rank-grid" aria-label="Example ranking grid">
            {grid.map((rank, i) => (
              <button
                key={i}
                aria-label={`Search point ${i + 1}: rank ${rank}`}
                aria-pressed={selected === i}
                className={`rank-point ${rank <= 3 ? "strong" : rank <= 10 ? "developing" : "weak"} ${selected === i ? "chosen" : ""}`}
                onClick={() => setSelected(i)}
              >
                {rank}
              </button>
            ))}
          </div>
          <div className="grid-legend">
            <span>1–3 · Strong</span>
            <span>4–10 · Developing</span>
            <span>11+ · Needs attention</span>
          </div>
        </section>
        <aside className="inspector">
          <h2>Selected search point</h2>
          <p className="subtle">
            Point {selected + 1} · {city}
          </p>
          <div className="selected-rank">
            <span>SoftNest sample rank</span>
            <strong>{grid[selected]}</strong>
          </div>
          <p className="small-note">
            This schematic grid demonstrates local ranking analysis. It is not a
            map or a real search scan.
          </p>
          <button
            className="text-link"
            onClick={() => navigate("integrations")}
          >
            View data requirements <Icon as={ArrowRightIcon} size={16} />
          </button>
        </aside>
      </div>
    </>
  );
}

export function HealthReport() {
  const { navigate } = useWorkspace();
  const checks = [
    [
      "Indexability",
      "Check published pages, canonical URLs and robots directives.",
      GlobeIcon,
    ],
    [
      "Page performance",
      "Review Core Web Vitals and loading experience by device.",
      PulseIcon,
    ],
    [
      "Links & metadata",
      "Find broken destinations, missing titles and descriptions.",
      LinkIcon,
    ],
  ];
  return (
    <>
      <div className="source-empty">
        <span className="large-icon">
          <Icon as={PulseIcon} size={28} />
        </span>
        <h2>A healthier website starts with a baseline.</h2>
        <p>
          A live crawl or performance source hasn’t been connected. Add a source
          to measure your website’s health.
        </p>
        <button
          className="button primary"
          onClick={() => navigate("integrations")}
        >
          View integrations <Icon as={ArrowRightIcon} size={16} />
        </button>
      </div>
      <section className="health-checks">
        <h2>What SF0 will help you inspect</h2>
        {checks.map(([name, description, Component]) => (
          <div className="check-row" key={name}>
            <Icon as={Component} />
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <span className="neutral-tag">Source required</span>
          </div>
        ))}
      </section>
    </>
  );
}

export const SOURCES = [
  {
    name: "Google Analytics 4",
    description: "Sessions, acquisition, pages and quote events.",
    icon: ChartBarIcon,
    key: "ga4",
  },
  {
    name: "Google Search Console",
    description: "Search clicks, impressions, queries and position.",
    icon: MagnifyingGlassIcon,
    key: "gsc",
  },
  {
    name: "Google Business Profile",
    description: "Business profile activity and local discovery.",
    icon: MapPinIcon,
    key: "gbp",
  },
  {
    name: "Google Ads",
    description: "Campaign performance and conversion reporting.",
    icon: MegaphoneIcon,
    key: "ads",
  },
];
export function Integrations() {
  const { setModal, dataset, restoreSample, preferences } = useWorkspace();
  return (
    <>
      <div className="integration-banner">
        <div>
          <h2>
            {dataset
              ? "Your imported data is ready."
              : "Start with the data you already have."}
          </h2>
          <p>
            Import channel totals from a CSV. Your file stays in this browser
            and is never uploaded.
          </p>
        </div>
        <button className="button primary" onClick={() => setModal("import")}>
          <Icon as={UploadSimpleIcon} size={16} />
          {dataset ? "Replace CSV" : "Import CSV"}
        </button>
      </div>
      {dataset ? (
        <div className="imported-detail">
          <Icon as={CheckCircleIcon} />
          <div>
            <strong>
              Channel report · {dateLabel(dataset.start, dataset.end)}
            </strong>
            <p>{dataset.rows.length} channels · Stored on this device</p>
          </div>
          <button className="text-link" onClick={restoreSample}>
            Use sample data
          </button>
        </div>
      ) : null}
      <section className="integration-list">
        <div className="section-heading">
          <h2>Data connections</h2>
          <span className="subtle">Not connected</span>
        </div>
        {SOURCES.map((source) => (
          <div className="integration-row" key={source.key}>
            <span className="source-icon">
              <Icon as={source.icon} size={22} />
            </span>
            <div>
              <h3>{source.name}</h3>
              <p>{source.description}</p>
            </div>
            <span className="neutral-tag">{preferences.connections?.[source.key] ? "Authorization pending" : "Not connected"}</span>
            <button
              className="button"
              onClick={() => setModal({ type: "source", source })}
            >
              Set up connection <Icon as={ArrowRightIcon} size={14} />
            </button>
          </div>
        ))}
      </section>
      <div className="inline-note">
        <Icon as={InfoIcon} />
        <span>
          Live provider connections require a secure backend and account
          authorization. No provider is connected in this release.
        </span>
      </div>
    </>
  );
}

export function Settings() {
  const { preferences, savePreferences } = useWorkspace();
  const [draft, setDraft] = useState(preferences);
  return (
    <form
      className="settings-form"
      onSubmit={(e) => {
        e.preventDefault();
        savePreferences(draft);
      }}
    >
      <section>
        <h2>General</h2>
        <label>
          Workspace name
          <input
            required
            maxLength={40}
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
        </label>
        <label>
          Website
          <input value="softnestcare.ca" readOnly />
        </label>
        <label>
          Reporting timezone
          <select
            value={draft.timezone}
            onChange={(e) => setDraft({ ...draft, timezone: e.target.value })}
          >
            <option value="America/Toronto">Toronto · Eastern time</option>
            <option value="America/Vancouver">Vancouver · Pacific time</option>
            <option value="UTC">UTC</option>
          </select>
        </label>
        <div className="setting-toggle">
          <div>
            <strong>Compact table rows</strong>
            <p>Fit more rows into your workspace.</p>
          </div>
          <input
            type="checkbox"
            role="switch"
            aria-label="Compact table rows"
            checked={draft.compact}
            onChange={(e) => setDraft({ ...draft, compact: e.target.checked })}
          />
        </div>
      </section>
      <button className="button primary" type="submit">
        Save preferences
      </button>
      <p className="small-note">
        Preferences are saved on this device. Imported data and preferences are
        not synced between devices.
      </p>
    </form>
  );
}
