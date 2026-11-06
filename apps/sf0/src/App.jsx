import { useEffect, useRef, useState } from "react";
import {
  CircleIcon,
  MagnifyingGlassIcon,
  CaretDownIcon,
  CalendarBlankIcon,
  ArrowRightIcon,
  QuestionIcon,
  XIcon,
  ListIcon,
  DownloadSimpleIcon,
  CheckCircleIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import {
  NAV,
  WORKSPACES,
  WORKSPACE_TOOLS,
  readNavigation,
  resolveNavigation,
  navigationHash,
} from "./navigation.js";
import { WorkspaceContext, Icon, dateLabel } from "./ui.jsx";
import {
  DEMO_START,
  DEMO_END,
  PAGES,
  QUERIES,
  getSampleRows,
  totals,
  percent,
  downloadCSV,
  parseChannelCSV,
  loadDataset,
  loadPreferences,
} from "./data.js";
import {
  Conversion,
  Overview,
  ChannelTable,
  PageReport,
  EventsReport,
  SearchReport,
  LocalReport,
  HealthReport,
  Integrations,
  Settings,
} from "./reports.jsx";
import { WorkspaceModal } from "./dialogs.jsx";

export function App() {
  const [navigation, setNavigation] = useState(() =>
    readNavigation(window.location.hash),
  );
  const { view, workspaceId } = navigation;
  const workspace = WORKSPACES.find((item) => item.id === workspaceId);
  const lastReports = useRef({
    [workspaceId]: workspace.items.includes(view) ? view : workspace.defaultView,
  });
  const mainRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dataset, setDataset] = useState(loadDataset);
  const [preferences, setPreferences] = useState(() => ({
    name: "SoftNest",
    timezone: "America/Toronto",
    compact: false,
    ...loadPreferences(),
  }));
  const [period, setPeriod] = useState(() => {
    const saved = loadDataset();
    return saved
      ? { start: saved.start, end: saved.end }
      : { start: DEMO_START, end: DEMO_END };
  });
  const [unit, setUnit] = useState("sessions");
  const [compare, setCompare] = useState(true);
  const [filter, setFilter] = useState("");
  const [notice, setNotice] = useState("");
  const current = NAV.find((n) => n.id === view) ?? NAV[2];
  const rows = dataset ? dataset.rows : getSampleRows(period.start, period.end);
  const report = totals(rows);
  const isSample =
    !dataset ||
    ![
      "conversion",
      "acquisition",
      "overview",
      "integrations",
      "settings",
    ].includes(view);
  const hasUsers = rows.every((r) => Number.isFinite(r.users));
  const count = unit === "users" && hasUsers ? report.users : report.sessions;
  const navigate = (id, targetWorkspace = workspaceId, closeMenu = true) => {
    const next = resolveNavigation(id, targetWorkspace);
    setNavigation(next);
    if (!WORKSPACE_TOOLS.some((item) => item.id === next.view)) {
      lastReports.current[next.workspaceId] = next.view;
    }
    window.location.hash = navigationHash(next);
    setFilter("");
    if (closeMenu) setMenuOpen(false);
    setModal(null);
  };
  const switchWorkspace = (next) => {
    navigate(
      lastReports.current[next.id] ?? next.defaultView,
      next.id,
      false,
    );
  };
  useEffect(() => {
    const change = () => {
      const next = readNavigation(window.location.hash);
      setNavigation(next);
      if (!WORKSPACE_TOOLS.some((item) => item.id === next.view)) {
        lastReports.current[next.workspaceId] = next.view;
      }
      setFilter("");
    };
    const shortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setModal("search");
      }
    };
    window.addEventListener("hashchange", change);
    window.addEventListener("keydown", shortcut);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("keydown", shortcut);
    };
  }, []);
  useEffect(() => {
    document.title = `${current.title} · SF0`;
  }, [current.title]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(id);
  }, [notice]);
  const exportReport = () => {
    if (["pages", "content"].includes(view)) {
      downloadCSV(`sf0-sample-pages.csv`, [
        ["Source", "Sample data"],
        ["Page", "Path", "Sessions", "Quotes"],
        ...PAGES.map((p) => [p.page, p.path, p.sessions, p.quotes]),
      ]);
      setNotice("Sample page report downloaded.");
      return;
    }
    if (view === "search") {
      downloadCSV("sf0-sample-search.csv", [
        ["Source", "Sample data"],
        ["Query", "Clicks", "Impressions", "Position"],
        ...QUERIES.map((q) => [q.query, q.clicks, q.impressions, q.position]),
      ]);
      setNotice("Sample search report downloaded.");
      return;
    }
    if (view === "events" || view === "local" || view === "health") {
      navigate("integrations");
      return;
    }
    downloadCSV(`sf0-${view}-${period.start}-${period.end}.csv`, [
      [
        "Report",
        view,
        "Source",
        isSample ? "Sample data" : "Imported CSV",
        "Start",
        period.start,
        "End",
        period.end,
      ],
      [
        "Channel",
        "Sessions",
        "Quote starts",
        "Quote submissions",
        "Quote rate",
      ],
      ...rows.map((r) => [
        r.channel,
        r.sessions,
        r.starts,
        r.quotes,
        percent(r.quotes, r.sessions),
      ]),
    ]);
    setNotice("Report downloaded as CSV.");
  };
  const savePreferences = (next) => {
    try {
      localStorage.setItem("sf0.preferences.v1", JSON.stringify(next));
      setPreferences(next);
      setNotice("Workspace preferences saved on this device.");
    } catch {
      setNotice(
        "Browser storage is unavailable. Preferences could not be saved.",
      );
    }
  };
  const importDataset = (next) => {
    const parsed = parseChannelCSV(next.csv);
    localStorage.setItem("sf0.dataset.v1", JSON.stringify(next));
    setDataset({ ...next, rows: parsed });
    setPeriod({ start: next.start, end: next.end });
    setUnit("sessions");
    navigate("conversion");
    setNotice("Your channel data is ready. Stored on this device only.");
  };
  const restoreSample = () => {
    try {
      localStorage.removeItem("sf0.dataset.v1");
    } catch {
      setNotice("Browser storage is unavailable.");
      return;
    }
    setDataset(null);
    setPeriod({ start: DEMO_START, end: DEMO_END });
    setUnit("sessions");
    setNotice("Sample workspace restored.");
  };
  const shared = {
    view,
    current,
    rows,
    report,
    isSample,
    period,
    setPeriod,
    unit,
    setUnit,
    count,
    hasUsers,
    compare,
    setCompare,
    filter,
    setFilter,
    navigate,
    setModal,
    notify: setNotice,
    preferences,
    savePreferences,
    dataset,
    importDataset,
    restoreSample,
    exportReport,
  };
  const views = {
    conversion: Conversion,
    overview: Overview,
    acquisition: ChannelTable,
    pages: PageReport,
    content: PageReport,
    events: EventsReport,
    search: SearchReport,
    local: LocalReport,
    health: HealthReport,
    integrations: Integrations,
    settings: Settings,
  };
  const Report = views[view];
  return (
    <WorkspaceContext.Provider value={shared}>
      <div
        className={`app-shell ${menuOpen ? "nav-open" : ""} ${preferences.compact ? "density-compact" : ""}`}
      >
        <a
          href="#main-content"
          className="skip-link"
          onClick={(event) => {
            event.preventDefault();
            mainRef.current?.focus();
          }}
        >
          Skip to report
        </a>
        {menuOpen ? (
          <button
            className="nav-backdrop"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}
        <aside className="tool-rail" aria-label="Workspace tools">
          <button
            className="sf0-logo"
            onClick={() => navigate("overview")}
            aria-label="SF0 overview"
          >
            <Icon as={CircleIcon} size={22} weight="bold" />
            <span>sf0</span>
          </button>
          <div className="rail-tools">
            {WORKSPACES.map((item) => (
              <button
                key={item.id}
                className={`rail-button ${item.id === workspaceId ? "active" : ""}`}
                onClick={() => switchWorkspace(item)}
                aria-label={item.name}
                aria-pressed={item.id === workspaceId}
                data-tooltip={item.name}
              >
                <Icon as={item.icon} size={18} />
              </button>
            ))}
          </div>
          <a
            className="rail-site"
            href="https://softnestcare.ca"
            target="_blank"
            rel="noreferrer"
            aria-label="Open SoftNest website"
            data-tooltip="Open website"
          >
            <Icon as={ArrowSquareOutIcon} size={18} />
          </a>
        </aside>
        <aside className="context-nav" aria-label={`${workspace.name} navigation`}>
          <button
            className="workspace-switch"
            onClick={() => setModal("workspace")}
          >
            <img src="/assets/softnest.webp" alt="" width="23" height="23" />
            <span>{preferences.name}</span>
            <Icon as={CaretDownIcon} size={14} />
          </button>
          <nav>
            <h2>{workspace.name}</h2>
            <div className="analytics-nav">
              {workspace.items.map((id) => NAV.find((item) => item.id === id)).map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${view === item.id ? "selected" : ""}`}
                  onClick={() => navigate(item.id)}
                  aria-current={view === item.id ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
          <div className="nav-bottom">
            {WORKSPACE_TOOLS.map((item) => (
              <button
                key={item.id}
                className={`nav-item with-icon ${view === item.id ? "selected" : ""}`}
                onClick={() => navigate(item.id)}
                aria-current={view === item.id ? "page" : undefined}
              >
                <Icon as={item.icon} size={16} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="workspace-main">
          <header className="topbar">
            <div className="header-search">
              <button
                className="icon-button mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
              >
                <Icon as={ListIcon} />
              </button>
              <button
                className="command-search"
                onClick={() => setModal("search")}
                aria-label="Search workspace"
              >
                <Icon as={MagnifyingGlassIcon} size={17} />
                <span>Search workspace…</span>
                <kbd>⌘ K</kbd>
              </button>
            </div>
            <div className="topbar-actions">
              <button
                className="icon-button"
                onClick={() => setModal("help")}
                aria-label="Help"
                data-tooltip="Help"
              >
                <Icon as={QuestionIcon} size={21} />
              </button>
              <button
                className="avatar"
                onClick={() => setModal("profile")}
                aria-label="Workspace profile"
                data-tooltip="Workspace profile"
              >
                {preferences.name.slice(0, 1).toUpperCase()}
              </button>
            </div>
          </header>
          <main ref={mainRef} id="main-content" className="report-main" tabIndex="-1">
            <div className="page-header">
              <div>
                <h1>{current.title}</h1>
              </div>
              {!["settings", "integrations"].includes(view) ? (
                <div className="page-actions">
                  <div className="action-row">
                    <button
                      className="button date-button"
                      disabled={[
                        "pages",
                        "content",
                        "search",
                        "events",
                        "local",
                        "health",
                      ].includes(view)}
                      title={
                        [
                          "pages",
                          "content",
                          "search",
                          "events",
                          "local",
                          "health",
                        ].includes(view)
                          ? "This example report has a fixed reference period."
                          : undefined
                      }
                      onClick={() => setModal("date")}
                    >
                      <Icon as={CalendarBlankIcon} size={17} />
                      <span>
                        {dateLabel(
                          ["overview", "conversion", "acquisition"].includes(
                            view,
                          )
                            ? period.start
                            : DEMO_START,
                          ["overview", "conversion", "acquisition"].includes(
                            view,
                          )
                            ? period.end
                            : DEMO_END,
                        )}
                      </span>
                      <Icon as={CaretDownIcon} size={12} />
                    </button>
                    <button
                      className="button primary"
                      onClick={() =>
                        view === "conversion"
                          ? setModal("journey")
                          : exportReport()
                      }
                    >
                      {view === "conversion"
                        ? "View journey"
                        : ["events", "local", "health"].includes(view)
                          ? "View sources"
                          : "Export report"}
                      {view !== "conversion" ? (
                        <Icon as={DownloadSimpleIcon} size={15} />
                      ) : null}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            {isSample ? (
              <span className="sr-only">
                All report values are illustrative sample data, not measured
                SoftNest performance.
              </span>
            ) : null}
            <Report key={view} />
            {!["integrations", "settings"].includes(view) ? (
              <footer className="report-footer">
                {isSample
                  ? "Sample data for design exploration"
                  : ["overview", "acquisition", "conversion"].includes(view)
                    ? "Imported channel data · Stored on this device"
                    : "Sample report · Independent of your CSV import"}
                <span> · </span>
                {isSample
                  ? "Channel attribution is illustrative"
                  : "No live source connected"}
                <span> · {preferences.timezone}</span>
                <button onClick={() => navigate("integrations")}>
                  Manage data sources <Icon as={ArrowRightIcon} size={13} />
                </button>
              </footer>
            ) : null}
          </main>
        </div>
        {notice ? (
          <div className="toast" role="status">
            <Icon as={CheckCircleIcon} size={18} />
            <span>{notice}</span>
            <button
              className="icon-button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <Icon as={XIcon} size={14} />
            </button>
          </div>
        ) : null}
        {modal ? (
          <WorkspaceModal kind={modal} onClose={() => setModal(null)} />
        ) : null}
      </div>
    </WorkspaceContext.Provider>
  );
}
