import Link from "next/link";
import WorkVideo from "@/components/WorkVideo";
import { getWorkProjects } from "@/content/work";
import { workProjectHref } from "@softnest/content/work-urls";
import styles from "./LocalWorkEvidence.module.css";

// Services with a video worth showing on pages that have no appointment from their own city yet.
const spotlightServices = new Set(["carpet-area-rug-cleaning"]);

// The video is always labelled with the city where it was filmed, so it never passes as local work.
export default function ServiceVideoSpotlight({ service, serviceName, cityName }: {
  service: string; serviceName: string; cityName?: string;
}) {
  if (!spotlightServices.has(service)) return null;
  const project = getWorkProjects({ service })
    .filter(item => { const first = item.media[0]; return first?.type === "video" && first.video && first.poster; })
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0];
  const video = project?.media[0];
  if (!project || video?.type !== "video") return null;
  return <section className={styles.section} aria-labelledby="service-video-heading">
    <div className={styles.heading}>
      <h2 id="service-video-heading">Watch {serviceName.toLowerCase()} in action</h2>
    </div>
    <div style={{ maxWidth: 420 }}>
      <WorkVideo item={video} showTitle={false} />
    </div>
    <p>A recent SoftNest appointment in {project.location}{cityName && cityName !== project.location ? `, shown here for customers in ${cityName}` : ""}. <Link href={workProjectHref(project)}>See the full project →</Link></p>
  </section>;
}
