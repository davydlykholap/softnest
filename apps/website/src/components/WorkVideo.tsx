"use client";

import { useState } from "react";
import type { WorkMedia } from "@/content/work";
import styles from "@/app/our-work/projects/project.module.css";

export default function WorkVideo({ item }: { item: Extract<WorkMedia,{type:"video"}> }) {
  const [playing,setPlaying] = useState(false);
  return <section className={styles.videoSection} aria-label={item.title}>
    <h2>{item.title}</h2>
    {item.video ? <video controls playsInline preload="none" crossOrigin={item.captions ? "anonymous" : undefined} poster={item.poster} aria-label={item.title}>
      <source src={item.video} />
      {item.captions ? <track kind="captions" src={item.captions} srcLang="en" label="English" default /> : null}
      Your browser does not support video. <a href={item.video}>Open the video</a>.
    </video> : <div className={styles.videoFrame}>
      {playing ? <iframe src={item.embed} title={item.title} allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        : <button type="button" onClick={() => setPlaying(true)} className={styles.play} style={item.poster ? {backgroundImage:`linear-gradient(#0004,#0004),url("${item.poster}")`} : undefined}>Play video: {item.title}</button>}
    </div>}
    {item.transcript ? <details><summary>Video description / transcript</summary><p>{item.transcript}</p></details> : null}
  </section>;
}
