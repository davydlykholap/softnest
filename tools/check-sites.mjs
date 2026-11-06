import { readFileSync } from "node:fs";

const apps = JSON.parse(
  readFileSync(new URL("../infra/hosting/apps.json", import.meta.url), "utf8"),
);
let failed = false;
await Promise.all(
  Object.entries(apps).map(async ([name, app]) => {
    const url = `https://${app.domain}/`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
      const expected = {
        website: /SoftNest/i,
        studio: /Sanity|SoftNest/i,
        sf0: /SF0/,
      };
      const passed = response.ok && expected[name].test(title || "");
      failed ||= !passed;
      console.log(
        `${passed ? "PASS" : "FAIL"} ${url} — HTTP ${response.status}; ${title || "no title"}`,
      );
    } catch (error) {
      failed = true;
      console.error(`FAIL ${url} — ${error.cause?.code || error.message}`);
    }
  }),
);
if (failed) process.exitCode = 1;
