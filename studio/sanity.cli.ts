import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./env";
export default defineCliConfig({
  api: { projectId: projectId!, dataset },
  typegen: { path: '../src/sanity/queries.ts', schema: './schema.json', generates: '../src/sanity/sanity.types.ts' },
});
