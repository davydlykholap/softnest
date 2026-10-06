import { defineConfig } from "@playwright/test";

const serveCommand = process.platform === "win32"
  ? "python -m http.server 4173 --directory out"
  : "python3 -m http.server 4173 --directory out";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: serveCommand,
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
