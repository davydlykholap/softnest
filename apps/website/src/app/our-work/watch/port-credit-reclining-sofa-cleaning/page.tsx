import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkVideo from "@/components/WorkVideo";
import { getWorkProjects } from "@/content/work";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/seo/metadata";
import { jsonLd } from "@/seo/structuredData";
import { portCreditProjectSlug, portCreditWatchPath, portCreditWatchVideo, videoSchema } from "@/seo/work";
import { workProjectHref } from "@softnest/content/work-urls";
import styles from "../../projects/project.module.css";
import "@/app/styles/location-page.css";

const title = "Watch Reclining Sofa Cleaning in Port Credit, Mississauga";

function getWatchPage() {
  const project = getWorkProjects().find(item => item.slug === portCreditProjectSlug);
  const video = project && portCreditWatchVideo(project);
  return project && video ? { project, video } : undefined;
}

export function generateMetadata() {
  const page = getWatchPage();
  if (!page) return {};
  return pageMetadata({
    title: `${title} | SoftNest`,
    description: "Watch SoftNest rinse and extract two beige reclining sofas in Port Credit, including the seams, folds and extended footrests.",
    path: portCreditWatchPath,
    image: page.video.thumbnail,
    imageAlt: page.project.label,
  });
}

export default function PortCreditWatchPage() {
  const page = getWatchPage();
  if (!page) notFound();
  const { project, video } = page;
  const quoteHref = "/quote/?city=mississauga";
  return <>
    <div className="new-hero-root location-page-header"><SiteHeader current="work" quoteHref={quoteHref} /></div>
    <main id="main-content" className={`location-page-page ${styles.page}`}>
      <article className={`${styles.shell} ${styles.watch}`}>
        <header className={styles.intro}><h1>{title}</h1></header>
        <WorkVideo item={video.item} showTitle={false} />
        <p className={styles.watchLinks}>
          <Link className={styles.back} href={workProjectHref(project)}>Read the full cleaning project →</Link>
        </p>
      </article>
    </main>
    <SiteFooter quoteHref={quoteHref} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
      "@context": "https://schema.org",
      ...videoSchema(video),
      url: absoluteUrl(portCreditWatchPath),
    }) }} />
  </>;
}
