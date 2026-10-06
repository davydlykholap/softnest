import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function reviewAudit(audit, lock, exceptions, target, today) {
  if (!audit.vulnerabilities || !audit.metadata) throw new Error("Incomplete npm audit response");
  const accepted = [];
  const blocked = [];
  const seen = new Set();
  const inspect = (name) => {
    if (seen.has(name)) return;
    seen.add(name);
    const entry = audit.vulnerabilities[name];
    if (!entry || !Array.isArray(entry.via)) throw new Error(`Missing advisory details for ${name}`);
    for (const cause of entry.via) {
      if (typeof cause === "string") {
        inspect(cause);
        continue;
      }
      if (!["moderate", "high", "critical"].includes(cause.severity)) continue;
      const versions = entry.nodes.map((node) => lock.packages[node]?.version);
      const exception = exceptions.find((item) =>
        item.targets.includes(target) && item.package === name &&
        item.advisory === cause.url && item.expires >= today &&
        versions.length > 0 && versions.every((version) => item.versions.includes(version)) &&
        cause.severity !== "critical"
      );
      const finding = { package: name, advisory: cause.url, versions, reason: exception?.reason };
      (exception ? accepted : blocked).push(finding);
    }
  };
  for (const [name, entry] of Object.entries(audit.vulnerabilities)) {
    if (["moderate", "high", "critical"].includes(entry.severity)) inspect(name);
  }
  return { accepted, blocked };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.env.npm_execpath) throw new Error("Run through npm run audit:dependencies");
  const { exceptions } = JSON.parse(readFileSync("dependency-audit-exceptions.json", "utf8"));
  const today = new Date().toISOString().slice(0, 10);
  let failed = false;
  for (const target of ["website", "studio"]) {
    const prefix = target === "studio" ? ["--prefix", "studio"] : [];
    const result = spawnSync(process.execPath, [process.env.npm_execpath, "audit", "--json", ...prefix], {
      encoding: "utf8", timeout: 120_000, maxBuffer: 10 * 1024 * 1024,
    });
    try {
      if (result.error || ![0, 1].includes(result.status)) throw result.error ?? new Error(result.stderr);
      const audit = JSON.parse(result.stdout);
      if (audit.error) throw new Error(audit.error.summary ?? "npm audit failed");
      const lock = JSON.parse(readFileSync(target === "studio" ? "studio/package-lock.json" : "package-lock.json", "utf8"));
      const review = reviewAudit(audit, lock, exceptions, target, today);
      console.log(`${target}: ${review.blocked.length} blocking advisories; ${review.accepted.length} temporary exceptions.`);
      for (const finding of review.accepted) console.log(`EXCEPTION ${finding.package}: ${finding.advisory}\n  ${finding.reason}`);
      for (const finding of review.blocked) console.error(`BLOCKED ${finding.package}: ${finding.advisory} (${finding.versions.join(", ")})`);
      failed ||= review.blocked.length > 0;
    } catch (error) {
      console.error(`${target}: audit failed: ${error.message}`);
      failed = true;
    }
  }
  process.exitCode = failed ? 1 : 0;
}
