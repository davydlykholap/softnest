export function workSlug(document: { _id: string; slug?: string | { current?: string } }): string {
  const explicit = typeof document.slug === "string" ? document.slug : document.slug?.current;
  return explicit || document._id.replace(/^drafts\./, "").replace(/^cleaning-project-/, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function workProjectHref(project: { slug: string }): string {
  return `/our-work/projects/${project.slug}/`;
}

// Accept known video providers only; never render arbitrary CMS iframe markup.
export function workVideoEmbed(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return;
    let id: string | null = null;
    if (url.hostname === "youtu.be") id = url.pathname.slice(1);
    if (["www.youtube.com", "youtube.com"].includes(url.hostname)) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else if (/^\/(shorts|embed)\//.test(url.pathname)) id = url.pathname.split("/")[2];
    }
    if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    if (["vimeo.com", "www.vimeo.com"].includes(url.hostname) && /^\/\d+\/?$/.test(url.pathname)) {
      return `https://player.vimeo.com/video/${url.pathname.replaceAll("/", "")}`;
    }
  } catch { /* Invalid URLs are rejected by publishing validation. */ }
}
