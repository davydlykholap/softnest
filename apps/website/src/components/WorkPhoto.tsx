"use client";

import { useRef } from "react";
import Image from "@/components/ResponsiveImage";
import styles from "@/app/our-work/projects/project.module.css";

export default function WorkPhoto({ image, alt }: { image: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className={styles.photoButton} type="button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge photo: ${alt}`}>
      <Image src={image} alt={alt} width={1440} height={1080} sizes="(max-width:760px) 90vw, 80vw" />
    </button>
    <dialog ref={dialog} className={styles.lightbox} aria-label={alt} onClick={event => { if(event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" className={styles.close} onClick={() => dialog.current?.close()} autoFocus>Close photo ×</button>
      <Image src={image} alt={alt} width={1920} height={1440} sizes="95vw" />
    </dialog>
  </>;
}
