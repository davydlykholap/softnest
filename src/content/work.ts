import "server-only";
import projects from "@/content/generated/projects.json";
import testimonials from "@/content/generated/testimonials.json";
import { optimizedLocalImage } from "@/lib/optimizedLocalImage";

export type WorkProject = {
  id: string;
  image: string;
  variant: "paired" | "single";
  category: string;
  location: string;
  locations: string[];
  service: string;
  services: string[];
  label: string;
  imageNote?: string;
  fabric?: string;
  problem?: string;
  treatment?: string;
  result?: string;
};

type ProjectRecord = (typeof projects)[number] & {
  fabric?: string; problem?: string; treatment?: string; result?: string; imageNote?: string;
};

export function getWorkProjects(filters: { city?: string; service?: string } = {}): WorkProject[] {
  return (projects as ProjectRecord[])
    .filter((project) => project.publicationStatus === "approved" &&
      (!filters.city || (project.locations as string[]).includes(filters.city)) &&
      (!filters.service || (project.services as string[]).includes(filters.service)))
    .map((project) => ({
      id: project._id,
      image: optimizedLocalImage(project.image),
      variant: project.variant as WorkProject["variant"],
      category: project.category,
      location: project.locations.length > 0 ? project.location : "",
      locations: project.locations,
      service: project.service,
      services: project.services,
      label: project.label,
      imageNote: project.imageNote,
      fabric: project.fabric,
      problem: project.problem,
      treatment: project.treatment,
      result: project.result,
    }));
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
