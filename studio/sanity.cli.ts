import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./env";
export default defineCliConfig({
  api: { projectId: projectId!, dataset },
  deployment: { appId: 'xa4nxz31i54hl2v01peoak7l' },
  typegen: { path: '../src/sanity/queries.ts', schema: './schema.json', generates: '../src/sanity/sanity.types.ts' },
});
