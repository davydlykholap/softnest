import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { defaultDocumentNode, structure } from "./structure";

const singletonTypes = new Set(["siteSettings", "pageContent"]);

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
    newDocumentOptions: (options) =>
      options.filter((item) => !singletonTypes.has(item.templateId)),
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
  schema: { types: schemaTypes },
});
