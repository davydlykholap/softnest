import type { WorkProject } from "@/content/work";
import { absoluteUrl, organizationId } from "@/lib/site";
import { workProjectHref } from "@softnest/content/work-urls";

function trimText(value: string, limit: number) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const end = text.lastIndexOf(" ", limit - 1);
  return `${text.slice(0, end > 0 ? end : limit - 1).trimEnd()}…`;
}

// The city belongs in the title so the page can match "<service> in <city>" searches.
export function projectTitle(project: WorkProject) {
  const hasCity = project.title.toLowerCase().includes(project.location.toLowerCase());
  return `${hasCity ? project.title : `${project.title} in ${project.location}`} | SoftNest`;
}

export function projectDescription(project: WorkProject) {
  const text = project.introduction || project.result || "";
  return text
    ? trimText(text, 160)
    : `${project.service} in ${project.location}: photos and details from a real SoftNest appointment.`;
}

// Google needs a thumbnail plus a file or player URL, so incomplete videos stay out of structured data.
export function indexableVideos(project: WorkProject) {
  return project.media.flatMap(item => {
    if (item.type !== "video" || !item.poster || !(item.video || item.embed)) return [];
    return [{
      title: item.title,
      description: trimText(item.transcript || `${item.title}: ${project.service} in ${project.location}.`, 300),
      thumbnail: absoluteUrl(item.poster),
      contentUrl: item.video ? absoluteUrl(item.video) : undefined,
      embedUrl: item.embed,
      uploadDate: project.date,
      item,
    }];
  });
}

export function projectImages(project: WorkProject) {
  const images = [project.image, ...project.media.flatMap(item =>
    item.type === "photo" ? [item.image] : item.type === "comparison" ? [item.before, item.after] : [])];
  return [...new Set(images)].map(absoluteUrl);
}

export function projectSchema(project: WorkProject, cityPath: string) {
  const url = absoluteUrl(workProjectHref(project));
  const videos = indexableVideos(project);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    url,
    name: project.title,
    description: projectDescription(project),
    ...(project.date ? { datePublished: project.date } : {}),
    creator: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@type": "CollectionPage", url: absoluteUrl(cityPath) },
    about: {
      "@type": "Service",
      name: project.service,
      provider: { "@id": organizationId },
      areaServed: { "@type": "City", name: project.location, containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    },
    contentLocation: { "@type": "City", name: project.location },
    image: projectImages(project).map(contentUrl => ({ "@type": "ImageObject", contentUrl })),
    ...(videos.length ? { video: videos.map(video => ({
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
      ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
      ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    })) } : {}),
  };
}

export function projectBreadcrumbs(project: WorkProject, city: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ["Home", "/"],
      ["Our Work", "/our-work/"],
      [project.location, `/our-work/${city}/`],
      [project.title, workProjectHref(project)],
    ].map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(path) })),
  };
}

export function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
