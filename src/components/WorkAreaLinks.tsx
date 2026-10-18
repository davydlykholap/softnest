import Link from "next/link";
import { locations } from "@/content/locations";
import { getWorkProjects } from "@/content/work";
import styles from "./WorkAreaLinks.module.css";

export default function WorkAreaLinks({ activeCity }: { activeCity?: string }) {
  return <nav className={styles.wrapper} aria-label="Browse cleaning work by city">
    <h2>Browse cleaning work by city</h2>
    <div className={styles.links}>
      <Link href="/our-work/" aria-current={!activeCity ? "page" : undefined} className={!activeCity ? styles.active : ""}>All areas</Link>
      {locations.map((location) => {
        const total = getWorkProjects({ city: location.slug }).length;
        return <Link key={location.slug} href={"/our-work/" + location.slug + "/"} className={activeCity === location.slug ? styles.active : ""} aria-current={activeCity === location.slug ? "page" : undefined}>
          {location.name}{total ? <span className={styles.count}> ({total})</span> : null}
        </Link>;
      })}
    </div>
  </nav>;
}
