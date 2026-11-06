import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

export default function nextConfig(phase: string): NextConfig {
  const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    turbopack: { root: workspaceRoot },
    transpilePackages: ["@softnest/content"],
    // GitHub Pages needs a static export, but forcing export mode during
    // `next dev` can interfere with App Router development routing.
    ...(isDevelopmentServer ? {} : { output: "export" as const }),
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };
}
