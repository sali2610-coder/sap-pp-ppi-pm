// §14 — automated consistency checks over the curated BAPI/FM enrichment (the
// authored data most at risk of drift). Fails on real inconsistencies.
import { spawnSync } from "node:child_process";
const run = spawnSync(process.execPath, ["--experimental-strip-types", "-e", `
import { PM_ENRICHMENT, PM_ADDITIONS } from "./data/bapi-enrichment.pm.ts";
import { PPPI_ENRICHMENT, PPPI_ADDITIONS } from "./data/bapi-enrichment.pppi.ts";
const overlays = { ...PM_ENRICHMENT, ...PPPI_ENRICHMENT };
const additions = [...PM_ADDITIONS, ...PPPI_ADDITIONS];
const problems = [];
const seen = new Set();
// additions: full objects — check id/type/module/verification integrity
for (const o of additions) {
  const id = o.id;
  if (!id) problems.push("addition missing id");
  if (seen.has(id)) problems.push(id + ": duplicate technical name"); seen.add(id);
  if (!o.primaryModule) problems.push(id + ": missing module");
  if (String(o.verificationStatus||"").startsWith("verified") && !o.verificationSource) problems.push(id + ": verified but no source");
  if (o.verificationStatus === "invalid-name" && !o.qaNotes && !o.shortDescriptionHe) problems.push(id + ": invalid-name without explanation");
}
// overlays (partial): check invalid-name has an explanation + verified has a source; SAP-note format
for (const [id, p] of Object.entries(overlays)) {
  if (p.verificationStatus === "invalid-name" && !p.qaNotes && !p.shortDescriptionHe) problems.push(id + ": invalid-name without explanation");
  if (String(p.verificationStatus||"").startsWith("verified") && !p.verificationSource) problems.push(id + ": verified but no source");
  const src = p.verificationSource || "";
  const m = src.match(/\\b(KBA|Note)\\s*[:#]?\\s*(\\d+)/i);
  if (m && !/^\\d{6,7}$/.test(m[2])) problems.push(id + ": invalid SAP Note number format: " + m[2]);
}
console.log(JSON.stringify({ overlays: Object.keys(overlays).length, additions: additions.length, problems }));
`], { cwd: process.cwd(), encoding: "utf8" });
const out = (run.stdout || "").trim().split("\n").filter(l => l.startsWith("{")).pop() || "{}";
const r = JSON.parse(out);
console.log(`checked ${r.overlays} overlays + ${r.additions} additions`);
if (r.problems.length) { console.log("INCONSISTENCIES:\n" + r.problems.map(p => " - " + p).join("\n")); process.exit(1); }
console.log("OK — no consistency problems in curated BAPI/FM data.");
