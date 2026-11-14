import "server-only";
import { getWorkProjects } from "@/content/work";

// Articles that show the lead video of one of our own appointments instead of a still cover.
// Maps an article slug to the slug of the project whose first video it uses.
const articleProjects: Record<string, string> = {
  "stair-carpet-cleaning-milton-why-regular-cleaning-matters": "stair-carpet-regular-cleaning-milton",
  "sofa-stain-removal-milton-right-cleaning-solution": "red-stain-removal-sofa-cushion-milton",
  "why-did-my-couch-stain-come-back-after-cleaning": "red-stain-removal-sofa-cushion-milton",
  "how-to-remove-stain-from-couch": "red-stain-removal-sofa-cushion-milton",
  "what-cleaning-solution-can-i-use-on-my-couch": "red-stain-removal-sofa-cushion-milton",
  "why-sofa-armrests-get-dirty-faster": "grey-tufted-sofa-cleaning-milton",
  "does-vacuuming-clean-carpet": "grey-carpet-cleaning-hallway-burlington",
  "how-often-to-deep-clean-carpet-at-home": "grey-carpet-cleaning-hallway-burlington",
};

export function getArticleVideo(articleSlug: string) {
  const projectSlug = articleProjects[articleSlug];
  if (!projectSlug) return undefined;
  const project = getWorkProjects().find((item) => item.slug === projectSlug);
  const video = project?.media[0];
  return project && video?.type === "video" && video.video ? { project, video } : undefined;
}
