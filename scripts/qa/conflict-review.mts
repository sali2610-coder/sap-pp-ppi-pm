// Conflict review: every record whose evidence holds a conflict (an entry at
// conflicting_sources or with conflictingEvidence[], the same test the coverage
// report counts) must show its review: at least two evidence rows and notes.
//   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/conflict-review.mts
import { TABLE_VERIFICATION } from "@/data/verification/tables";
import { TX_VERIFICATION } from "@/data/verification/transactions";
import { TX_VERIFICATION_B } from "@/data/verification/transactions-b";
import { TX_VERIFICATION_C } from "@/data/verification/transactions-c";
import { TX_VERIFICATION_AUTO } from "@/data/verification/transactions-auto";
import { FM_VERIFICATION } from "@/data/verification/functions";
import { CDS_VERIFICATION } from "@/data/verification/cds";
import { FIORI_VERIFICATION } from "@/data/verification/fiori";
import { ENH_VERIFICATION } from "@/data/verification/enhancements";
import { IDOC_VERIFICATION } from "@/data/verification/idocs";
const all = [...TABLE_VERIFICATION, ...TX_VERIFICATION, ...TX_VERIFICATION_B, ...TX_VERIFICATION_C, ...TX_VERIFICATION_AUTO.filter((r) => ![...TX_VERIFICATION, ...TX_VERIFICATION_B, ...TX_VERIFICATION_C].some((x) => x.id === r.id)), ...FM_VERIFICATION, ...CDS_VERIFICATION, ...FIORI_VERIFICATION, ...ENH_VERIFICATION, ...IDOC_VERIFICATION] as any[];
const isC = (e: any) => (e.conflictingEvidence?.length ?? 0) > 0 || e.verificationLevel === "conflicting_sources";
const conf = all.filter((r) => (r.evidence || []).some(isC));
let weak = 0;
for (const r of conf) {
  const ev = (r.evidence || []).length, notes = (r.notes || "").length, act = (r.status?.recommendedAction || "").length, st = r.status?.status || "(derived)";
  const ok = ev >= 2 && notes > 80;
  if (!ok) weak++;
  console.log(`${ok ? "ok  " : "WEAK"} ${r.id.padEnd(34)} status ${st.padEnd(22)} evidence ${ev} notes ${notes} action ${act}`);
}
console.log(`records holding conflicting evidence: ${conf.length}, weak: ${weak}`);
