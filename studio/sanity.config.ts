import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { defaultDocumentNode, structure } from "./structure";
import { projectInCityTemplate } from "./projectTemplates";

const singletonTypes = new Set(["siteSettings", "pageContent", "workPage"]);

export default defineConfig({
  name: "softnest",
  title: "SoftNest Content",
  projectId: projectId!,
  dataset,
  plugins: [
    structureTool({
      defaultDocumentNode,
      structure,
    }),
  ],
  document: {
    newDocumentOptions: (options, {creationContext}) =>
      options.filter((item) => !singletonTypes.has(item.templateId) &&
        (item.templateId !== projectInCityTemplate.id || creationContext.type !== "global")),
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            (action) =>
              !["delete", "duplicate", "unpublish"].includes(
                action.action || "",
              ),
          )
        : actions,
  },
  schema: { types: schemaTypes, templates:previous => [...previous,projectInCityTemplate] },
});
