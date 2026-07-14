/**
 * Trust-model integrity gate (Plan §2.1). Run: npx tsx scripts/check-bapi-trust.mts
 * Fails the build if any object could mislead about its verification confidence.
 */
import { listObjects, trustSummary } from "../lib/catalog/index";
import { INVALID_NAMES } from "../data/function-trust";

const objects = listObjects();
let errors = 0;
const err = (m: string) => { errors++; console.error("  ✗ " + m); };

// SAP Note / KBA claim pattern — allowed ONLY when backed by a stored source note/url.
const NOTE_RE = /(SAP\s*Note\s*\d+|KBA\s*\d+|note\s*#?\d{5,})/i;

for (const o of objects) {
  const t = o.trust;
  // 1. official/community REQUIRE ≥1 real stored source with a label
  if ((t.level === "official" || t.level === "community")) {
    if (!t.sources.length) err(`${o.name}: level "${t.level}" but no stored source`);
    else if (t.sources.some((s) => !s.label || !s.label.trim())) err(`${o.name}: a source has an empty label`);
  }
  // 2. every record carries method + lastReviewed + a reason
  if (!t.method?.trim()) err(`${o.name}: missing trust.method`);
  if (!t.lastReviewed?.trim()) err(`${o.name}: missing trust.lastReviewed`);
  if (!t.reason?.trim()) err(`${o.name}: missing trust.reason`);
  // 3. no invented SAP-Note claim without a matching stored source
  const claimText = `${t.reason} ${t.method}`;
  if (NOTE_RE.test(claimText) && !t.sources.some((s) => NOTE_RE.test(`${s.note || ""} ${s.url || ""} ${s.label}`))) {
    err(`${o.name}: cites a SAP Note in text with no matching stored source`);
  }
  // 4. no invalid names leaked into the listing
  if (INVALID_NAMES.has(o.name)) err(`${o.name}: invalid name present in catalog listing`);
  if (t.level === "invalid") err(`${o.name}: level "invalid" should not be listed`);
  // 5. type sanity — red "BAPI רשמי" only for released-bapi
  if (/^BAPI_/.test(o.name) && o.type.type === "released-bapi" && o.trust.level === "needs-review") {
    err(`${o.name}: released-bapi cannot also be needs-review (contradiction)`);
  }
}

const sum = trustSummary();
console.log(`\ncheck-bapi-trust: ${objects.length} objects · ` +
  `official=${sum.official} community=${sum.community} curated=${sum.curated} needs-review=${sum["needs-review"]} invalid=${sum.invalid}`);

if (errors) { console.error(`\ncheck-bapi-trust: ${errors} FAILED`); process.exit(1); }
console.log("check-bapi-trust: OK");
