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
  "mattress-cleaning-why-regular-cleaning-matters-gta": "mattress-stain-removal-brampton",
  "uv-light-hidden-stains-linen-sofa-etobicoke": "linen-sofa-uv-stain-inspection-etobicoke",
  "how-urine-odour-treatment-works-on-a-sofa-milton": "urine-odour-treatment-sofa-milton",
  "how-often-to-clean-a-sofa-with-a-dog-or-cat": "dark-grey-sofa-cleaning-with-dog-innisfil",
  "clean-home-comfort-carpets-sofas-family": "carpet-regular-cleaning-milton",
  "does-vacuuming-clean-carpet": "grey-carpet-cleaning-hallway-burlington",
  "how-often-to-deep-clean-carpet-at-home": "grey-carpet-cleaning-hallway-burlington",
  "milky-foam-from-sofa-diy-cleaning-residue-hamilton": "sofa-cleaning-after-diy-products-hamilton",
  "paint-stain-on-a-sofa-why-it-spreads-and-how-extraction-lifts-it": "paint-stain-removal-dark-grey-sofa-brampton",
  "happy-customer-videos-milton-toronto-carpets-stairs-sofa": "carpets-stairs-sofa-cleaning-milton-customer-video",
  "rainy-day-sofa-cleaning-free-drying-thick-fabric-hamilton": "grey-sofa-deep-cleaning-rainy-day-drying-hamilton",
  "why-softnest-brings-air-movers-dry-sofa-on-site": "sofa-cleaning-visit-what-to-expect-milton",
  "home-extractor-sofa-cleaning-pushes-dirt-deeper-mississauga": "grey-sectional-sofa-deep-cleaning-after-diy-extractor-port-credit-mississauga",
};

// Articles that also show the project's other videos, one after the other, under the lead video.
const articlesWithAllVideos = new Set(["paint-stain-on-a-sofa-why-it-spreads-and-how-extraction-lifts-it"]);

// Articles that also show every video of other projects, after the lead project's video.
const articleExtraProjects: Record<string, string[]> = {
  "happy-customer-videos-milton-toronto-carpets-stairs-sofa": ["sofa-deep-cleaning-stain-removal-toronto-customer-video"],
};

export function getArticleVideo(articleSlug: string) {
  const projectSlug = articleProjects[articleSlug];
  if (!projectSlug) return undefined;
  const projects = getWorkProjects();
  const project = projects.find((item) => item.slug === projectSlug);
  const video = project?.media[0];
  if (!project || video?.type !== "video" || !video.video) return undefined;
  const videosOf = (item: typeof project) => item.media.flatMap((media) => (media.type === "video" && media.video ? [media] : []));
  const extraProjects = (articleExtraProjects[articleSlug] || []).flatMap((slug) => projects.find((item) => item.slug === slug) || []);
  const more = [
    ...(articlesWithAllVideos.has(articleSlug) ? videosOf(project).slice(1) : []),
    ...extraProjects.flatMap(videosOf),
  ];
  return { project, video, more, extraProjects };
}

// Articles built around this project's video; the project page lists them first.
export function getArticleSlugsForProject(projectSlug: string) {
  return Object.entries(articleProjects).filter(([, slug]) => slug === projectSlug).map(([article]) => article);
}
