import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "../legal-page.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | SoftNest Fabric Care",
  description:
    "Review the website and cleaning-service terms for SoftNest Fabric Care estimates, appointments, results and customer responsibilities.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <div className="new-hero-root legal-header">
        <SiteHeader />
      </div>
      <main className={styles.page}>
        <article className={styles.shell}>
          <p className={styles.eyebrow}>SoftNest Fabric Care</p>
          <h1>Terms of Service</h1>
          <p className={styles.updated}>Last updated: August 6, 2026</p>

          <p>
            These terms apply to use of the SoftNest Fabric Care website and to
            estimates, appointments and cleaning services arranged with us.
          </p>

          <h2>Estimates and final scope</h2>
          <p>
            Photo estimates are based on the information, images, dimensions and
            item counts supplied by the customer. We may revise or decline an
            estimate if the actual size, material, construction, condition,
            contamination, access or requested scope differs from what was
            provided. Work begins only after the service scope and price are
            confirmed.
          </p>

          <h2>Results and limitations</h2>
          <p>
            We aim to provide thorough professional cleaning, but no specific
            stain, odour or appearance result is guaranteed. Age, wear, dye loss,
            fibre damage, heat, contamination depth, prior products and hidden
            conditions may limit improvement. Cleaning cannot reverse permanent
            damage or restore worn material to new condition.
          </p>

          <h2>Customer responsibilities</h2>
          <ul>
            <li>Provide accurate item counts, photos and material concerns.</li>
            <li>
              Disclose known damage, previous treatments, pet contamination,
              delicate materials and other relevant conditions.
            </li>
            <li>
              Provide safe access, working utilities and any required parking,
              elevator, loading or building arrangements.
            </li>
            <li>
              Remove fragile, valuable and personal items from the work area.
            </li>
            <li>
              Keep children and pets safely away from equipment, hoses and damp
              surfaces during and after service.
            </li>
          </ul>

          <h2>Drying and after-care</h2>
          <p>
            Drying time varies with the material, padding, humidity, ventilation
            and service scope. Do not use furniture, mattresses, carpeted stairs
            or treated areas until they are sufficiently dry. Follow the
            technician’s after-care and safety instructions.
          </p>

          <h2>Appointments, changes and access</h2>
          <p>
            Arrival times may be provided as a window because travel, traffic and
            earlier appointments can affect timing. Please tell us as soon as
            possible if you need to change or cancel an appointment. If safe or
            authorized access is unavailable, the appointment may need to be
            rescheduled.
          </p>

          <h2>Payment</h2>
          <p>
            Payment is due when the service is completed unless another written
            arrangement is confirmed. Additional work requested or approved on
            site may change the final total.
          </p>

          <h2>Website information</h2>
          <p>
            Website content is general information and may be updated without
            notice. Service suitability, pricing and availability are confirmed
            directly for each request. You may not misuse the website, attempt
            unauthorized access or copy our branding and original content for a
            commercial purpose without permission.
          </p>

          <h2>Concerns</h2>
          <p>
            Please contact us promptly if you have a concern about completed
            work so we can review the condition, service notes and reasonable
            next steps.
          </p>

          <h2>Contact</h2>
          <p>
            <a href="tel:+14167270287">(416) 727-0287</a><br />
            <a href="mailto:softnest.upholstery@outlook.com">
              softnest.upholstery@outlook.com
            </a>
          </p>

        </article>
      </main>
      <SiteFooter />
    </>
  );
}
