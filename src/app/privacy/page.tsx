import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "../legal-page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | SoftNest Fabric Care",
  description:
    "Learn how SoftNest Fabric Care collects, uses and protects information submitted through the website and during service inquiries.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="new-hero-root legal-header">
        <SiteHeader />
      </div>
      <main className={styles.page}>
        <article className={styles.shell}>
          <p className={styles.eyebrow}>SoftNest Fabric Care</p>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: August 6, 2026</p>

          <p>
            This policy explains how SoftNest Fabric Care collects, uses and
            handles personal information when you request a quote, contact us,
            book a service or use this website.
          </p>

          <h2>Information we may collect</h2>
          <ul>
            <li>Your name, phone number and optional email address.</li>
            <li>Your city, postal code, service address and access details.</li>
            <li>
              Information about the items or areas you want cleaned, including
              photos, stains, odours, pet concerns and preferred timing.
            </li>
            <li>
              Communications relating to estimates, appointments, payments,
              follow-up questions and customer service.
            </li>
            <li>
              Basic website and advertising information, such as device,
              browser, page activity and conversion events collected through
              analytics or advertising technologies.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>We may use the information to:</p>
          <ul>
            <li>Review your request and prepare an estimate.</li>
            <li>Contact you about scheduling, access and service details.</li>
            <li>Provide, improve and document our cleaning services.</li>
            <li>Respond to questions, concerns, warranty matters or disputes.</li>
            <li>Maintain business, accounting and legal records.</li>
            <li>Measure website and advertising performance.</li>
          </ul>

          <h2>Service providers and disclosure</h2>
          <p>
            We may use service providers to process website forms, host the
            website, provide maps, deliver communications, measure advertising
            performance or support business operations. These providers receive
            information only as needed for their role. We may also disclose
            information when required by law or when reasonably necessary to
            protect customers, our business or others.
          </p>

          <h2>Photos</h2>
          <p>
            Photos sent for an estimate through Instagram or Facebook are used
            to assess the item, condition and service scope. Those messages are
            also processed by the social platform you choose, subject to that
            platform&apos;s privacy practices. We will not publish customer photos
            as marketing content without separate permission. Avoid including
            people, private documents or unrelated personal details in photos.
          </p>

          <h2>Retention and safeguards</h2>
          <p>
            We keep personal information only as long as reasonably necessary
            for the purposes described above, including business, accounting,
            dispute-resolution and legal needs. We use reasonable administrative
            and technical safeguards, but no internet or storage system can be
            guaranteed completely secure.
          </p>

          <h2>Your choices and access requests</h2>
          <p>
            You may ask what personal information we hold about you, request a
            correction, withdraw consent where applicable or ask us to delete
            information that we are not required to retain. Contact us using the
            details below. We may need to verify your identity before completing
            a request.
          </p>

          <h2>Contact us</h2>
          <p>
            SoftNest Fabric Care<br />
            Greater Toronto Area, Ontario<br />
            <a href="tel:+14167270287">(416) 727-0287</a><br />
            <a href="mailto:softnest.upholstery@outlook.com">
              softnest.upholstery@outlook.com
            </a>
          </p>

          <p className={styles.notice}>
            We may update this policy when our website, service providers or
            information practices change. The current version will be posted on
            this page with the updated date.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
