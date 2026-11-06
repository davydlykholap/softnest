import {
  ChartBarIcon,
  MegaphoneIcon,
  TargetIcon,
  FileTextIcon,
  PulseIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PuzzlePieceIcon,
  GearSixIcon,
  StackIcon,
  ChartLineUpIcon,
} from "@phosphor-icons/react";
export const NAV = [
  {
    id: "overview",
    name: "Overview",
    icon: ChartBarIcon,
    group: "Analytics",
    title: "Website overview",
    description: "A clear view of how your website is growing.",
  },
  {
    id: "acquisition",
    name: "Acquisition",
    icon: MegaphoneIcon,
    group: "Analytics",
    title: "Acquisition overview",
    description: "Understand which channels bring people to your website.",
  },
  {
    id: "conversion",
    name: "Conversion",
    icon: TargetIcon,
    group: "Analytics",
    title: "Conversion overview",
    description: "Understand the journey from a visit to a quote.",
  },
  {
    id: "pages",
    name: "Landing pages",
    icon: FileTextIcon,
    group: "Analytics",
    title: "Landing pages",
    description: "See which pages turn a visit into an enquiry.",
  },
  {
    id: "events",
    name: "Events",
    icon: PulseIcon,
    group: "Analytics",
    title: "Website events",
    description: "Explore the actions that matter to your business.",
  },
  {
    id: "search",
    name: "Search",
    icon: MagnifyingGlassIcon,
    group: "Workspace",
    title: "Search performance",
    description: "Understand how customers discover SoftNest on Google.",
  },
  {
    id: "local",
    name: "Local visibility",
    icon: MapPinIcon,
    group: "Workspace",
    title: "Local visibility",
    description: "Track search visibility across the places you serve.",
  },
  {
    id: "content",
    name: "Content",
    icon: FileTextIcon,
    group: "Workspace",
    title: "Content performance",
    description: "Find the pages and topics worth your attention.",
  },
  {
    id: "health",
    name: "Site health",
    icon: PulseIcon,
    group: "Workspace",
    title: "Site health",
    description: "Keep your website discoverable, fast and easy to use.",
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: PuzzlePieceIcon,
    group: "Workspace",
    title: "Integrations",
    description: "Bring your website and marketing data into one workspace.",
  },
  {
    id: "settings",
    name: "Settings",
    icon: GearSixIcon,
    group: "Workspace",
    title: "Workspace settings",
    description: "Make this workspace work for you.",
  },
];

export const WORKSPACES = [
  {
    id: "analytics",
    name: "Analytics",
    icon: ChartBarIcon,
    defaultView: "overview",
    items: ["overview", "acquisition", "conversion", "pages", "events"],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: MegaphoneIcon,
    defaultView: "acquisition",
    items: ["acquisition", "conversion", "pages"],
  },
  {
    id: "search",
    name: "Search",
    icon: TargetIcon,
    defaultView: "search",
    items: ["search", "local"],
  },
  {
    id: "content",
    name: "Content",
    icon: StackIcon,
    defaultView: "content",
    items: ["content", "pages"],
  },
  {
    id: "health",
    name: "Site health",
    icon: ChartLineUpIcon,
    defaultView: "health",
    items: ["health", "events", "pages"],
  },
];

export const WORKSPACE_TOOLS = NAV.filter((item) =>
  ["integrations", "settings"].includes(item.id),
);

export function resolveNavigation(view = "overview", workspaceId) {
  const report = NAV.find((item) => item.id === view);
  if (!report) return { view: "overview", workspaceId: "analytics" };
  const requested = WORKSPACES.find((item) => item.id === workspaceId);
  const isTool = WORKSPACE_TOOLS.some((item) => item.id === view);
  const workspace =
    requested && (requested.items.includes(view) || isTool)
      ? requested
      : WORKSPACES.find((item) => item.items.includes(view)) ?? WORKSPACES[0];
  return { view, workspaceId: workspace.id };
}

export function readNavigation(hash) {
  const segments = hash.replace(/^#/, "").split("/");
  return segments.length === 2
    ? resolveNavigation(segments[1], segments[0])
    : resolveNavigation(segments[0]);
}

export function navigationHash({ view, workspaceId }) {
  return `#${workspaceId}/${view}`;
}
