import { useEffect, useRef, useState } from "react";
import {
  XIcon,
  ArrowRightIcon,
  DownloadSimpleIcon,
  ArrowSquareOutIcon,
  UploadSimpleIcon,
  InfoIcon,
  PlugsConnectedIcon,
  GearSixIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import {
  useWorkspace,
  Icon,
  MetricStrip,
  FilterInput,
  EmptyState,
  dateLabel,
} from "./ui.jsx";
import { NAV } from "./navigation.js";
import {
  CHANNELS,
  DEMO_START,
  DEMO_END,
  percent,
  format,
  downloadCSV,
} from "./data.js";

export function WorkspaceModal({ kind, onClose }) {
  const ws = useWorkspace();
  const ref = useRef(null);
  const type = typeof kind === "string" ? kind : kind.type;
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const cancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", cancel);
    return () => {
      dialog.removeEventListener("cancel", cancel);
      dialog.close();
    };
  }, []);
  const title = {
    search: "Go to…",
    date: "Reporting period",
    journey: "Quote journey",
    help: "Welcome to SF0",
    profile: "Your workspace",
    workspace: "Workspace",
    import: "Import channel data",
    channel: kind.row?.channel,
    page: kind.page?.page,
    source: kind.source?.name,
  }[type];
  return (
    <dialog
      ref={ref}
      className={`modal modal-${type}`}
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-heading">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icon as={XIcon} size={19} />
        </button>
      </div>
      <div className="modal-body">
        {type === "search" ? <CommandSearch /> : null}
        {type === "date" ? (
          <DateForm
            onApply={(period) => {
              ws.setPeriod(period);
              onClose();
            }}
          />
        ) : null}
        {type === "import" ? <ImportForm /> : null}
        {type === "journey" ? (
          <>
            <p className="subtle">
              {ws.isSample ? "Sample" : "Imported"} conversion totals ·{" "}
              {dateLabel(ws.period.start, ws.period.end)}
            </p>
            <div className="journey-detail">
              {[
                ["Website sessions", ws.report.sessions],
                ["Quote starts", ws.report.starts],
                ["Quote submissions", ws.report.quotes],
              ].map(([label, value], i) => (
                <div key={label}>
                  <span className="step-number">0{i + 1}</span>
                  <span>{label}</span>
                  <strong>{format(value)}</strong>
                </div>
              ))}
            </div>
            <div className="detail-summary">
              <strong>{percent(ws.report.quotes, ws.report.starts, 1)}</strong>
              <p>of quote starts became submissions.</p>
            </div>
            <p className="small-note">
              These are aggregate stage totals. Session-level paths and drop-off
              diagnostics require a live event source.{" "}
              {ws.isSample ? "All values are illustrative." : ""}
            </p>
            <div className="modal-actions">
              <button className="button" onClick={ws.exportReport}>
                <Icon as={DownloadSimpleIcon} size={16} />
                Export CSV
              </button>
              <button
                className="button primary"
                onClick={() => ws.navigate("events")}
              >
                Explore events <Icon as={ArrowRightIcon} size={16} />
              </button>
            </div>
          </>
        ) : null}
        {type === "channel" ? (
          <>
            <p className="subtle">
              Channel performance ·{" "}
              {ws.isSample ? "Sample data" : "Imported data"}
            </p>
            <MetricStrip
              items={[
                { label: "Sessions", value: kind.row.sessions },
                { label: "Quotes", value: kind.row.quotes },
                {
                  label: "Quote rate",
                  value: percent(kind.row.quotes, kind.row.sessions),
                },
              ]}
            />
            <p className="small-note">
              Submissions are reported events, not deduplicated customers or
              confirmed bookings.
            </p>
            <button
              className="button"
              onClick={() => ws.navigate("acquisition")}
            >
              Open acquisition report <Icon as={ArrowRightIcon} size={16} />
            </button>
          </>
        ) : null}
        {type === "page" ? (
          <>
            <p className="subtle">Illustrative page performance</p>
            <MetricStrip
              items={[
                { label: "Sessions", value: kind.page.sessions },
                { label: "Quotes", value: kind.page.quotes },
                {
                  label: "Quote rate",
                  value: percent(kind.page.quotes, kind.page.sessions),
                },
              ]}
            />
            <a
              className="button"
              href={`https://softnestcare.ca${kind.page.path}`}
              target="_blank"
              rel="noreferrer"
            >
              Open website page <Icon as={ArrowSquareOutIcon} size={15} />
            </a>
          </>
        ) : null}
        {type === "source" ? <SourceSetup source={kind.source} /> : null}
        {["help", "profile", "workspace"].includes(type) ? (
          <>
            <div className="workspace-identity">
              <img
                src="/assets/softnest.webp"
                width="48"
                height="48"
                alt="SoftNest Fabric Care"
              />
              <div>
                <h3>{ws.preferences.name}</h3>
                <p>Website & marketing workspace</p>
              </div>
            </div>
            <p>
              SF0 brings website traffic, search visibility and conversion
              analysis into one focused workspace.
            </p>
            <div className="help-links">
              <button onClick={() => ws.navigate("integrations")}>
                <Icon as={PlugsConnectedIcon} />
                <span>
                  Manage data sources
                  <small>
                    Import a CSV or review live connection requirements
                  </small>
                </span>
                <Icon as={ArrowRightIcon} size={16} />
              </button>
              <button onClick={() => ws.navigate("settings")}>
                <Icon as={GearSixIcon} />
                <span>
                  Workspace preferences
                  <small>Timezone, name and table density</small>
                </span>
                <Icon as={ArrowRightIcon} size={16} />
              </button>
              <a
                href="https://softnestcare.ca"
                target="_blank"
                rel="noreferrer"
              >
                <Icon as={GlobeIcon} />
                <span>
                  Open SoftNest website<small>softnestcare.ca</small>
                </span>
                <Icon as={ArrowSquareOutIcon} size={16} />
              </a>
            </div>
            <p className="small-note">
              Your session is limited to this device. Imported reports stay in
              this browser. Live provider connections are configured separately.
            </p>
            <a className="button" href="/signout">Sign out</a>
          </>
        ) : null}
      </div>
    </dialog>
  );
}

function CommandSearch() {
  const { navigate } = useWorkspace();
  const [query, setQuery] = useState("");
  const items = NAV.filter((n) =>
    `${n.name} ${n.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <FilterInput
        value={query}
        onChange={setQuery}
        placeholder="Search reports and settings…"
      />
      <div className="command-results">
        {items.map((n) => (
          <button key={n.id} onClick={() => navigate(n.id)}>
            <Icon as={n.icon} />
            <span>
              {n.name}
              <small>{n.description}</small>
            </span>
            <Icon as={ArrowRightIcon} size={15} />
          </button>
        ))}
        {!items.length ? (
          <EmptyState
            title="No results"
            text="Try analytics, search, or settings."
          />
        ) : null}
      </div>
      <p className="small-note">
        Tip: press Ctrl K or ⌘ K to open workspace search.
      </p>
    </>
  );
}

function DateForm({ onApply }) {
  const { period, dataset } = useWorkspace();
  const [start, setStart] = useState(period.start);
  const [end, setEnd] = useState(period.end);
  const [error, setError] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (start > end) {
          setError("Start date must be on or before the end date.");
          return;
        }
        if (!dataset && (start < DEMO_START || end > DEMO_END)) {
          setError("Sample data is available from Oct 5 to Nov 1, 2026.");
          return;
        }
        onApply({ start, end });
      }}
    >
      <p className="subtle">
        {dataset
          ? "An imported aggregate CSV covers its complete declared period."
          : "Explore the available sample period, October 5–November 1, 2026."}
      </p>
      {!dataset ? (
        <div className="date-presets">
          {[
            ["Last 7 days", "2026-10-26"],
            ["Last 14 days", "2026-10-19"],
            ["Last 28 days", DEMO_START],
          ].map(([label, value]) => (
            <button
              className="button"
              type="button"
              key={label}
              onClick={() => {
                setStart(value);
                setEnd(DEMO_END);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="date-fields">
        <label>
          Start date
          <input
            type="date"
            required
            min={dataset ? dataset.start : DEMO_START}
            max={dataset ? dataset.end : DEMO_END}
            value={start}
            disabled={!!dataset}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          End date
          <input
            type="date"
            required
            min={dataset ? dataset.start : DEMO_START}
            max={dataset ? dataset.end : DEMO_END}
            value={end}
            disabled={!!dataset}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="modal-actions">
        <button className="button primary" type="submit">
          Apply period
        </button>
      </div>
    </form>
  );
}

function ImportForm() {
  const { importDataset } = useWorkspace();
  const [csv, setCsv] = useState("");
  const [start, setStart] = useState(DEMO_START);
  const [end, setEnd] = useState(DEMO_END);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");
  const load = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setError("Choose a CSV smaller than 1 MB.");
      return;
    }
    try {
      setCsv(await file.text());
      setFilename(file.name);
      setError("");
    } catch {
      setError("The file could not be read. Try pasting its contents.");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        try {
          if (start > end)
            throw new Error("Start date must be on or before the end date.");
          if (csv.length > 1024 * 1024)
            throw new Error("Keep the CSV smaller than 1 MB.");
          importDataset({ csv, start, end });
        } catch (error) {
          setError(error.message);
        }
      }}
    >
      <p className="subtle">
        Import aggregate channel totals. Your file stays in this browser. Do not
        include personal customer information.
      </p>
      <div className="import-instructions">
        <code>channel,sessions,starts,quotes,users</code>
        <p>
          Whole numbers only. The users column is optional. Submissions ≤ starts
          ≤ sessions. One unique row per channel.
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() =>
            downloadCSV("sf0-channel-template.csv", [
              ["channel", "sessions", "starts", "quotes", "users"],
              ...CHANNELS.map((r) => [
                r.channel,
                r.sessions,
                r.starts,
                r.quotes,
                r.users,
              ]),
            ])
          }
        >
          <Icon as={DownloadSimpleIcon} size={15} />
          Download sample template
        </button>
      </div>
      <label className="upload-field">
        <Icon as={UploadSimpleIcon} />
        <span>{filename || "Choose a CSV file"}</span>
        <input type="file" accept=".csv,text/csv" onChange={load} />
      </label>
      <label>
        Or paste CSV
        <textarea
          required
          rows="5"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder={
            "channel,sessions,starts,quotes\nOrganic search,1000,50,15"
          }
          spellCheck="false"
        />
      </label>
      <div className="date-fields">
        <label>
          Period start
          <input
            required
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          Period end
          <input
            required
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="modal-actions">
        <button className="button primary" type="submit">
          Import channel data <Icon as={ArrowRightIcon} size={16} />
        </button>
      </div>
    </form>
  );
}

function SourceSetup({ source }) {
  const { preferences, savePreferences } = useWorkspace();
  const fields = {
    ga4: ["GA4 property ID", "123456789", "https://analytics.google.com/"],
    gsc: ["Search Console property", "sc-domain:softnestcare.ca", "https://search.google.com/search-console"],
    gbp: ["Business Profile location ID", "locations/123456789", "https://business.google.com/"],
    ads: ["Google Ads customer ID", "123-456-7890", "https://ads.google.com/"],
  };
  const [label, placeholder, dashboard] = fields[source.key];
  const [account, setAccount] = useState(preferences.connections?.[source.key] ?? "");
  const requirements = {
    ga4: [
      "A Google Analytics property with the correct website stream.",
      "Read-only account authorization through a secure server.",
      "Verified quote_start and generate_lead events.",
    ],
    gsc: [
      "A verified Search Console property for softnestcare.ca.",
      "Read-only account authorization through a secure server.",
      "A scheduled sync of page and query performance.",
    ],
    gbp: [
      "Access to the SoftNest business profile.",
      "Approved Business Profile API access and account authorization.",
      "A separate ranking provider for location-specific grid scans.",
    ],
    ads: [
      "Access to your Google Ads customer account.",
      "Approved API access and a secure server connection.",
      "Verified conversion actions and matching attribution windows.",
    ],
  };
  return (
    <>
      <span className="neutral-tag">Not connected</span>
      <form className="connection-setup" onSubmit={(event) => {
        event.preventDefault();
        savePreferences({
          ...preferences,
          connections: { ...preferences.connections, [source.key]: account.trim() },
        });
      }}>
        <label>
          {label}
          <input required maxLength={200} value={account} placeholder={placeholder}
            onChange={(event) => setAccount(event.target.value)} />
        </label>
        <div className="connection-actions">
          <button type="submit" className="button primary">Save setup</button>
          {preferences.connections?.[source.key] ? (
            <button type="button" className="button" onClick={() => {
              const connections = { ...preferences.connections };
              delete connections[source.key];
              savePreferences({ ...preferences, connections });
              setAccount("");
            }}>Clear setup</button>
          ) : null}
          <a className="button" href={dashboard} target="_blank" rel="noreferrer">
            Open {source.name} <Icon as={ArrowSquareOutIcon} size={15} />
          </a>
        </div>
        <p className="small-note">Saving an account ID prepares setup on this device. It does not authorize access or connect live data.</p>
      </form>
      <h3>What is needed</h3>
      <ol className="requirements-list">
        {requirements[source.key].map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ol>
      <div className="inline-note">
        <Icon as={InfoIcon} />
        <span>
          Google authorization and automatic syncing require a connection server.
          Keep passwords, client secrets and access tokens out of this form.
        </span>
      </div>
    </>
  );
}
