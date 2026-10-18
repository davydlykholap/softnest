import Link from "next/link";
import { locations } from "@/content/locations";
import { getWorkProjects } from "@/content/work";
import styles from "./WorkAreaLinks.module.css";

export default function WorkAreaLinks({ activeCity }: { activeCity?: string }) {
  const areas = locations.map(location => ({ ...location, total: getWorkProjects({ city: location.slug }).length }));
  const available = areas.filter(location => location.total > 0 || location.slug === activeCity);
  const coming = areas.filter(location => !location.total && location.slug !== activeCity);
  return <nav className={styles.wrapper} aria-label="Browse cleaning work by city">
    <h2>Browse cleaning work by city</h2>
    <div className={styles.links}>
      <Link href="/our-work/" aria-current={!activeCity ? "page" : undefined} className={!activeCity ? styles.active : ""}>All areas</Link>
      {available.map((location) => {
        return <Link key={location.slug} href={"/our-work/" + location.slug + "/"} className={activeCity === location.slug ? styles.active : ""} aria-current={activeCity === location.slug ? "page" : undefined}>
          {location.name}{location.total ? <span className={styles.count}> ({location.total})</span> : null}
        </Link>;
      })}
    </div>
    {coming.length ? <details className={styles.coming}>
      <summary>More service areas · photos coming</summary>
      <p>We’ll add photos here as local appointments are documented.</p>
      <div className={styles.links}>{coming.map(location => <Link key={location.slug} href={`/our-work/${location.slug}/`}>{location.name}</Link>)}</div>
    </details> : null}
  </nav>;
}
