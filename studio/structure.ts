import type { DefaultDocumentNodeResolver, StructureBuilder, StructureResolver } from "sanity/structure";
import { WebsitePreview } from "./components/WebsitePreview";
import { PublishingGuide } from "./components/PublishingGuide";

const apiVersion = "2026-09-01";
const previewTypes = new Set(["post", "service", "location", "pageContent", "cleaningProject", "workPage"]);

const singleton = (S: StructureBuilder, title: string, schemaType: "siteSettings" | "pageContent" | "workPage", documentId: string) =>
  S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId));

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S,{schemaType}) =>
  S.document().views(previewTypes.has(schemaType)
    ? [S.view.form().title("Edit"),S.view.component(WebsitePreview).title("Website preview")]
    : [S.view.form().title("Edit")]);

const projectsByStatus = (S:StructureBuilder,title:string,status:string) => S.listItem().title(title).child(
  S.documentTypeList("cleaningProject").title(title).apiVersion(apiVersion)
    .filter('_type == "cleaningProject" && coalesce(publicationStatus, "pending") == $status').params({status})
    .initialValueTemplates([]).canHandleIntent(() => false),
);

export const structure: StructureResolver = (S,context) => S.list().title("SoftNest").items([
  S.listItem().id("pages").title("Pages").child(S.list().title("Pages").items([
    singleton(S,"Homepage","pageContent","page-content-home"),
    singleton(S,"Our Work introductions","workPage","work-page"),
  ])),
  S.documentTypeListItem("service").title("Services"),
  S.listItem().id("locations").title("Locations").child(S.list().title("Locations").items([
    S.documentTypeListItem("location").title("Cities & coverage"),
    S.documentTypeListItem("localCityCopy").title("City page text"),
    S.documentTypeListItem("localServiceCopy").title("City service page text"),
  ])),
  S.listItem().id("ourWork").title("Our Work").child(S.list().title("Our Work").items([
    S.documentTypeListItem("cleaningProject").title("All projects")
      .child(S.documentTypeList("cleaningProject").title("All projects").initialValueTemplates([S.initialValueTemplateItem("cleaningProject")])),
    S.listItem().id("projectsByCity").title("Projects by city").child(
      S.documentTypeList("location").title("Choose a city").canHandleIntent(() => false)
        .initialValueTemplates([]).child(async rawId => {
          const cityId = rawId.replace(/^drafts\./,"");
          const name = await context.getClient({apiVersion}).fetch<string | null>('*[_id == $cityId][0].name',{cityId});
          return S.documentTypeList("cleaningProject").title(name ? `Projects in ${name}` : "City projects")
            .apiVersion(apiVersion).filter('_type == "cleaningProject" && $cityId in locations[]._ref').params({cityId})
            .initialValueTemplates([S.initialValueTemplateItem("project-in-city",{cityId})]).canHandleIntent(() => false);
        }),
    ),
    S.divider(),
    projectsByStatus(S,"Awaiting approval","pending"),
    projectsByStatus(S,"Approved for website","approved"),
    projectsByStatus(S,"Hidden projects","withheld"),
  ])),
  S.documentTypeListItem("testimonial").title("Customer Reviews"),
  S.listItem().id("blog").title("Blog").child(S.list().title("Blog").items([
    S.documentTypeListItem("post").title("Articles"),
    S.documentTypeListItem("author").title("Authors"),
    S.documentTypeListItem("category").title("Categories"),
  ])),
  S.documentTypeListItem("faq").title("FAQs"),
  S.divider(),
  S.listItem().id("settings").title("Settings").child(S.list().title("Settings").items([
    singleton(S,"Business & contact details","siteSettings","siteSettings"),
    S.documentTypeListItem("quoteCategory").title("Quote form choices"),
  ])),
  S.listItem().id("publishingHelp").title("Publishing Help").child(S.component(PublishingGuide).title("Publishing Help")),
]);
