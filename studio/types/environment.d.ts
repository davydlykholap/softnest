type SoftNestStudioEnvironment = {
  readonly SANITY_STUDIO_PROJECT_ID?: string;
  readonly SANITY_STUDIO_DATASET?: string;
  readonly SANITY_STUDIO_WEBSITE_URL?: string;
};

declare const process: {
  readonly env: SoftNestStudioEnvironment;
};
