import project from "../../sanity.project.json";

// Public identifiers shared with Studio. Optional environment overrides support
// other datasets without changing the saved SoftNest connection.
export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID || project.projectId,
  dataset: process.env.SANITY_DATASET || project.dataset,
};
