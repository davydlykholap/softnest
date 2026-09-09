import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";
import { WebsitePreview } from "./components/WebsitePreview";

const previewTypes = new Set(["post", "service", "location", "pageContent"]);

const singleton = (
  S: StructureBuilder,
  title: string,
  schemaType: "siteSettings" | "pageContent",
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) =>
  S.document().views(
    previewTypes.has(schemaType)
      ? [
          S.view.form().title("Edit"),
          S.view.component(WebsitePreview).title("Website preview"),
        ]
      : [S.view.form().title("Edit")],
  );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("SoftNest")
    .items([
      S.listItem()
        .title("Website")
        .child(
          S.list()
            .title("Website")
            .items([
              singleton(S, "Business settings", "siteSettings", "siteSettings"),
              singleton(S, "Homepage", "pageContent", "page-content-home"),
              singleton(
                S,
                "About SoftNest",
                "pageContent",
                "page-content-about",
              ),
              S.divider(),
              S.documentTypeListItem("quoteCategory").title("Quote form choices"),
            ]),
        ),
      S.listItem()
        .title("Services & areas")
        .child(
          S.list()
            .title("Services & areas")
            .items([
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("location").title("Service areas"),
            ]),
        ),
      S.listItem()
        .title("Proof & answers")
        .child(
          S.list()
            .title("Proof & answers")
            .items([
              S.documentTypeListItem("cleaningProject").title("Cleaning results"),
              S.documentTypeListItem("testimonial").title("Customer reviews"),
              S.documentTypeListItem("faq").title("Common questions"),
            ]),
        ),
      S.listItem()
        .title("Journal")
        .child(
          S.list()
            .title("Journal")
            .items([
              S.documentTypeListItem("post").title("Blog posts"),
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
            ]),
        ),
    ]);
