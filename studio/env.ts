import project from "../sanity.project.json";

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || project.projectId;
export const dataset = process.env.SANITY_STUDIO_DATASET || project.dataset;
