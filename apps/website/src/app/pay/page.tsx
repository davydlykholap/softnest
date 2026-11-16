import type { Metadata } from "next";
import Image from "next/image";
import CopyEmail from "./CopyEmail";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pay by Interac e-Transfer | SoftNest Fabric Care",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="payment-title">
        <Image src="/images/brand/softnest-icon-small.webp" alt="SoftNest Fabric Care" width={72} height={72} />
        <h1 id="payment-title">Pay by Interac e-Transfer</h1>
        <CopyEmail email="payments@softnestcare.ca" />
        <p>Open your banking app, choose Interac e-Transfer, and paste this email as the recipient. Enter the amount on your invoice and confirm the transfer.</p>
      </section>
    </main>
  );
}
