import { useState } from "react";

type PreviewDocument = {
  _type?: string;
  slug?: { current?: string };
  key?: string;
};

type Props = {
  document: { displayed: PreviewDocument };
};

const productionBase = (
  process.env.SANITY_STUDIO_WEBSITE_URL || "https://softnestcare.ca"
).replace(/\/$/, "");

function documentPath(document: PreviewDocument) {
  if (document._type === "post")
    return document.slug?.current ? `/blog/${document.slug.current}/` : null;
  if (document._type === "service")
    return document.slug?.current ? `/services/${document.slug.current}/` : null;
  if (document._type === "location")
    return document.slug?.current ? `/location/${document.slug.current}/` : null;
  if (document._type === "pageContent")
    return document.key === "about" ? "/about/" : "/";
  return null;
}

export function WebsitePreview({ document }: Props) {
  const [revision, setRevision] = useState(0);
  const current = document.displayed;
  const local =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const base = local ? "http://localhost:3000" : productionBase;
  const path = documentPath(current);

  if (!path) {
    return (
      <div style={{ padding: 24, lineHeight: 1.6 }}>
        Add a valid page address first, then return to Website preview.
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 16, fontSize: 14, lineHeight: 1.5 }}>
        {local
          ? "Local preview. Start npm run preview in the website folder to see saved drafts."
          : "Published website. Changes appear here after the deployment succeeds."}
        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <button type="button" onClick={() => setRevision((value) => value + 1)}>
            Refresh preview
          </button>
          <a href={base + path} target="_blank" rel="noreferrer">
            Open page
          </a>
        </div>
      </div>
      <iframe
        key={revision}
        title="Website preview"
        src={base + path}
        style={{ border: 0, flex: 1, width: "100%", minHeight: 500 }}
      />
    </div>
  );
}
