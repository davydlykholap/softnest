"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function CopyEmail({ email }: { email: string }) {
  const [message, setMessage] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email copied.");
    } catch {
      setMessage("Select the email address above and copy it manually.");
    }
  }

  return (
    <div className={styles.recipient}>
      <p className={styles.email}>{email}</p>
      <button type="button" onClick={copyEmail}>Copy email</button>
      <p className={styles.status} role="status">{message}</p>
    </div>
  );
}
