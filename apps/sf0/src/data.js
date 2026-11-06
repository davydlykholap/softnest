export const number = new Intl.NumberFormat("en-CA");
export const format = (value) => number.format(value);
export const percent = (part, total, digits = 2) =>
  total ? `${((part / total) * 100).toFixed(digits)}%` : "0%";
export const DEMO_END = "2026-11-01";
export const DEMO_START = "2026-10-05";

export const CHANNELS = [
  {
    channel: "Organic search",
    sessions: 1984,
    starts: 92,
    quotes: 32,
    users: 1686,
  },
  { channel: "Direct", sessions: 492, starts: 24, quotes: 8, users: 418 },
  { channel: "Paid search", sessions: 178, starts: 13, quotes: 4, users: 151 },
  { channel: "Social", sessions: 112, starts: 5, quotes: 1, users: 95 },
  { channel: "Referral", sessions: 74, starts: 4, quotes: 1, users: 63 },
];

export const PAGES = [
  {
    page: "Mississauga · Sofa cleaning",
    path: "/location/mississauga/sofa-cleaning/",
    sessions: 782,
    quotes: 14,
    change: 26.3,
    type: "Location",
  },
  {
    page: "Sofa cleaning",
    path: "/services/sofa-cleaning/",
    sessions: 618,
    quotes: 11,
    change: 17.4,
    type: "Service",
  },
  {
    page: "Toronto · Upholstery cleaning",
    path: "/location/toronto/",
    sessions: 476,
    quotes: 8,
    change: 12.8,
    type: "Location",
  },
  {
    page: "Carpet & rug cleaning",
    path: "/services/carpet-area-rug-cleaning/",
    sessions: 339,
    quotes: 6,
    change: 19.1,
    type: "Service",
  },
  {
    page: "Oakville",
    path: "/location/oakville/",
    sessions: 225,
    quotes: 4,
    change: 32.4,
    type: "Location",
  },
  {
    page: "Care Journal",
    path: "/blog/",
    sessions: 168,
    quotes: 3,
    change: 9.8,
    type: "Content",
  },
];

export const QUERIES = [
  {
    query: "sofa cleaning mississauga",
    clicks: 382,
    impressions: 6580,
    position: 4.2,
    change: 1.8,
  },
  {
    query: "upholstery cleaning toronto",
    clicks: 274,
    impressions: 8420,
    position: 8.1,
    change: 0.9,
  },
  {
    query: "carpet cleaning mississauga",
    clicks: 219,
    impressions: 5760,
    position: 7.6,
    change: 2.1,
  },
  {
    query: "couch cleaning near me",
    clicks: 186,
    impressions: 4950,
    position: 9.3,
    change: 0.6,
  },
  {
    query: "sofa cleaning oakville",
    clicks: 148,
    impressions: 3140,
    position: 5.8,
    change: 1.3,
  },
  {
    query: "professional upholstery cleaning",
    clicks: 121,
    impressions: 3680,
    position: 11.4,
    change: -0.4,
  },
];

export const DEMO_DAILY_WEIGHTS = [
  78, 74, 104, 105, 116, 83, 98, 85, 69, 88, 95, 125, 102, 115, 109, 101, 147,
  123, 118, 97, 119, 122, 105, 144, 129, 145, 98, 115,
];

export function allocate(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0);
  const shares = weights.map((w) => (total * w) / sum);
  const result = shares.map(Math.floor);
  const order = shares
    .map((s, i) => ({ i, fraction: s - result[i] }))
    .sort((a, b) => b.fraction - a.fraction);
  const remainder = total - result.reduce((a, b) => a + b, 0);
  for (let i = 0; i < remainder; i++) result[order[i].i]++;
  return result;
}

export function getSampleRows(start, end) {
  const indices = DEMO_DAILY_WEIGHTS.map((_, i) =>
    new Date(Date.UTC(2026, 9, 5 + i)).toISOString().slice(0, 10),
  )
    .map((date, i) => (date >= start && date <= end ? i : -1))
    .filter((i) => i >= 0);
  return CHANNELS.map((row) => {
    const next = { channel: row.channel };
    for (const key of ["sessions", "starts", "quotes", "users"]) {
      const daily = allocate(row[key], DEMO_DAILY_WEIGHTS);
      next[key] = indices.reduce((sum, i) => sum + daily[i], 0);
    }
    return next;
  });
}

export function totals(rows) {
  return rows.reduce(
    (sum, row) => ({
      sessions: sum.sessions + row.sessions,
      starts: sum.starts + row.starts,
      quotes: sum.quotes + row.quotes,
      users: sum.users + (row.users ?? 0),
    }),
    { sessions: 0, starts: 0, quotes: 0, users: 0 },
  );
}

export function parseCSV(text) {
  const rows = [];
  let row = [],
    value = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"';
        i++;
      } else if (quoted || !value.length) quoted = !quoted;
      else throw new Error("A quote must begin a CSV field.");
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(value);
      if (row.some((v) => v.trim())) rows.push(row);
      row = [];
      value = "";
    } else value += char;
  }
  if (quoted) throw new Error("Close the quoted field in your CSV.");
  row.push(value);
  if (row.some((v) => v.trim())) rows.push(row);
  return rows;
}

export function parseChannelCSV(text) {
  const [header, ...records] = parseCSV(text.replace(/^\uFEFF/, ""));
  const keys = header?.map((h) => h.trim().toLowerCase()) ?? [];
  const required = ["channel", "sessions", "starts", "quotes"];
  if (
    !required.every((key) => keys.includes(key)) ||
    new Set(keys).size !== keys.length
  )
    throw new Error(
      "Use unique columns: channel, sessions, starts, quotes. Optional: users.",
    );
  if (!records.length || records.length > 200)
    throw new Error("Import between 1 and 200 channel rows.");
  const seen = new Set();
  return records.map((record, index) => {
    if (record.length !== keys.length)
      throw new Error(`Row ${index + 2} has a different number of columns.`);
    const entry = Object.fromEntries(
      keys.map((key, i) => [key, record[i].trim()]),
    );
    if (
      !entry.channel ||
      entry.channel.length > 100 ||
      seen.has(entry.channel.toLowerCase())
    )
      throw new Error(
        `Row ${index + 2}: give each channel a unique name, up to 100 characters.`,
      );
    seen.add(entry.channel.toLowerCase());
    const parsed = { channel: entry.channel };
    for (const key of [
      ...required.slice(1),
      ...(keys.includes("users") ? ["users"] : []),
    ]) {
      if (
        !/^\d+$/.test(entry[key]) ||
        !Number.isSafeInteger(Number(entry[key])) ||
        Number(entry[key]) > 1e9
      )
        throw new Error(
          `Row ${index + 2}: ${key} must be a whole number from 0 to 1,000,000,000.`,
        );
      parsed[key] = Number(entry[key]);
    }
    if (
      parsed.quotes > parsed.starts ||
      parsed.starts > parsed.sessions ||
      (parsed.users != null && parsed.users > parsed.sessions)
    )
      throw new Error(
        `Row ${index + 2}: submissions cannot exceed starts, and starts or users cannot exceed sessions.`,
      );
    return parsed;
  });
}

export function csvCell(value) {
  let safe = String(value);
  if (/^[=+\-@\t\r]/.test(safe)) safe = `'${safe}`;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function downloadCSV(filename, rows) {
  const data = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", data], { type: "text/csv;charset=utf-8;" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function loadPreferences() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("sf0.preferences.v1") || "{}",
    );
    if (!saved || typeof saved !== "object") return {};
    const next = { compact: saved.compact === true };
    if (
      typeof saved.name === "string" &&
      saved.name.trim() &&
      saved.name.length <= 40
    )
      next.name = saved.name;
    if (
      ["America/Toronto", "America/Vancouver", "UTC"].includes(saved.timezone)
    )
      next.timezone = saved.timezone;
    return next;
  } catch {
    return {};
  }
}

export function loadDataset() {
  try {
    const dataset = JSON.parse(
      localStorage.getItem("sf0.dataset.v1") || "null",
    );
    if (
      !dataset ||
      typeof dataset.csv !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dataset.start) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dataset.end) ||
      dataset.start > dataset.end
    )
      return null;
    return { ...dataset, rows: parseChannelCSV(dataset.csv) };
  } catch {
    return null;
  }
}
