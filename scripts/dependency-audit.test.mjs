import { test } from "node:test";
import assert from "node:assert/strict";
import { reviewAudit } from "./dependency-audit.mjs";

const url = "https://github.com/advisories/test";
const lock = { packages: { "node_modules/leaf": { version: "1.0.0" } } };
const exceptions = [{ package: "leaf", advisory: url, versions: ["1.0.0"], targets: ["website"], expires: "2026-11-06" }];
const makeAudit = (severity = "high", advisory = url) => ({
  metadata: {},
  vulnerabilities: {
    parent: { severity, via: ["leaf"] },
    leaf: { severity, nodes: ["node_modules/leaf"], via: [{ severity, url: advisory }] },
  },
});

test("accepts an exact exception through a propagated dependency once", () => {
  const review = reviewAudit(makeAudit(), lock, exceptions, "website", "2026-10-06");
  assert.equal(review.accepted.length, 1);
  assert.equal(review.blocked.length, 0);
});

test("blocks new advisories, versions, critical findings, wrong targets and expiry", () => {
  for (const [audit, snapshot, target, today] of [
    [makeAudit("high", `${url}-new`), lock, "website", "2026-10-06"],
    [makeAudit(), { packages: { "node_modules/leaf": { version: "1.0.1" } } }, "website", "2026-10-06"],
    [makeAudit("critical"), lock, "website", "2026-10-06"],
    [makeAudit(), lock, "studio", "2026-10-06"],
    [makeAudit(), lock, "website", "2026-11-07"],
  ]) assert.equal(reviewAudit(audit, snapshot, exceptions, target, today).blocked.length, 1);
});

test("fails closed when audit data or dependency details are missing", () => {
  assert.throws(() => reviewAudit({}, lock, exceptions, "website", "2026-10-06"));
  assert.throws(() => reviewAudit({ metadata: {}, vulnerabilities: { parent: { severity: "high", via: ["missing"] } } }, lock, exceptions, "website", "2026-10-06"));
});
