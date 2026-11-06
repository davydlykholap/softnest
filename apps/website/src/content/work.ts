import "server-only";
import projects from "@/content/generated/projects.json";
import testimonials from "@/content/generated/testimonials.json";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import workPage from "@/content/generated/workPage.json";

export type WorkProject = {
  id: string;
  slug: string;
  title: string;
  image: string;
  variant: "paired" | "single";
  category: string;
  location: string;
  locations: string[];
  service: string;
  services: string[];
  label: string;
  imageNote?: string;
  sourceType: "camera-original" | "reconstructed-before";
  fabric?: string;
  problem?: string;
  treatment?: string;
  result?: string;
  date?: string;
  introduction?: string;
  media: WorkMedia[];
};

export type WorkMedia =
  | { id: string; type: "photo"; image: string; alt: string }
  | { id: string; type: "comparison"; before: string; after: string; alt: string }
  | { id: string; type: "video"; title: string; video?: string; embed?: string; poster?: string; captions?: string; transcript?: string };

type ProjectRecord = (typeof projects)[number] & {
  fabric?: string; problem?: string; treatment?: string; result?: string; imageNote?: string; sourceType?: string;
  slug: string; introduction?: string; media?: WorkMedia[];
};

export function getWorkProjects(filters: { city?: string; service?: string } = {}): WorkProject[] {
  return (projects as ProjectRecord[])
    .filter((project) => project.publicationStatus === "approved" &&
      (project.sourceType === "camera-original" || project.sourceType === "reconstructed-before") &&
      project.locations.some(city => locations.some(location => location.slug === city)) &&
      project.services.some(slug => services.some(service => service.slug === slug)) &&
      (!filters.city || (project.locations as string[]).includes(filters.city)) &&
      (!filters.service || (project.services as string[]).includes(filters.service)))
    .map((project) => ({
      id: project._id,
      slug: project.slug,
      title: project.title,
      image: optimizedLocalImage(project.image),
      variant: project.variant as WorkProject["variant"],
      category: project.category,
      location: locations.find(location => location.slug === project.locations[0])?.name || "",
      locations: project.locations,
      service: project.service,
      services: project.services.filter(slug => services.some(service => service.slug === slug)),
      label: project.label,
      imageNote: project.imageNote,
      sourceType: project.sourceType as WorkProject["sourceType"],
      fabric: project.fabric,
      problem: project.problem,
      treatment: project.treatment,
      result: project.result,
      introduction: project.introduction,
      media: project.media || [],
      date: "date" in project ? String(project.date) : undefined,
    }));
}

export const workPageCopy = workPage;

// Temporary visual preview only. Actual city assignments and indexing continue
// to use localProjects, so a shared photo never becomes a fabricated local job.
export function getCityWorkPreview(city: string) {
  const localProjects = getWorkProjects({ city });
  const projects = localProjects.length ? localProjects : getWorkProjects().slice(0, 1);
  return { localProjects, projects, isPreview: !localProjects.length && projects.length > 0 };
}

// An unassigned review never becomes evidence for a city or a service.
export function getWorkReviews(filters: { city?: string; service?: string } = {}) {
  return testimonials.filter((review) => review.publicationStatus === "approved" &&
    (!filters.city || (review.locations as string[]).includes(filters.city)) &&
    (!filters.service || (review.services as string[]).includes(filters.service)));
}

export function reviewExcerpt(text: string, limit = 300) {
  if (text.length <= limit) return text;
  const end = text.lastIndexOf(" ", limit);
  return `${text.slice(0, end > 0 ? end : limit).trimEnd()}…`;
}
