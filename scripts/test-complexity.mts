/**
 * Unit tests for the pure complexity scorer (Plan §2.6). Run: npx tsx scripts/test-complexity.mts
 * Exits non-zero on any failure so it can gate CI.
 */
import { scoreComplexity, THRESHOLDS, type ComplexitySignals } from "../lib/complexity";

const ZERO: ComplexitySignals = {
  commitRequired: false, writesBusinessData: false, requiredStructures: 0, mandatoryParams: 0,
  statusHandling: false, crossModule: false, relatedCount: 0, authComplexity: false, customizing: false,
};

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (!cond) { failures++; console.error(`  ✗ ${name}${detail ? " — " + detail : ""}`); }
  else console.log(`  ✓ ${name}`);
}

// 1. Pure read → basic, non-empty reason, 5–15m
const readOnly = scoreComplexity(ZERO);
check("read-only → basic", readOnly.level === "basic", `got ${readOnly.level}`);
check("read-only has a reason", readOnly.reasons.length > 0);
check("basic learn window 5–15", readOnly.learnMinutes[0] === 5 && readOnly.learnMinutes[1] === 15);

// 2. A single write BAPI with COMMIT + writes → 4 pts → intermediate
const writeSimple = scoreComplexity({ ...ZERO, commitRequired: true, writesBusinessData: true });
check("commit+writes → intermediate", writeSimple.level === "intermediate", `score ${writeSimple.score}`);
check("commit reason surfaced", writeSimple.reasons.some((r) => r.includes("COMMIT")));

// 3. Heavy cross-module write → advanced
const heavy = scoreComplexity({
  ...ZERO, commitRequired: true, writesBusinessData: true, requiredStructures: 3,
  statusHandling: true, crossModule: true, relatedCount: 4, authComplexity: true, customizing: true,
});
check("heavy object → advanced", heavy.level === "advanced", `score ${heavy.score}`);
check("advanced learn window 60–120", heavy.learnMinutes[0] === 60 && heavy.learnMinutes[1] === 120);
check("cross-module reason surfaced", heavy.reasons.some((r) => r.includes("חוצת-מודולים")));

// 4. Monotonic: adding signals never lowers the score
check("monotonic score", heavy.score > writeSimple.score && writeSimple.score > readOnly.score);

// 5. Threshold boundaries are respected
check("threshold constants sane", THRESHOLDS.basic === 3 && THRESHOLDS.intermediate === 6);

// 6. Caps applied: 10 related items don't run away (cap 2 pts)
const capped = scoreComplexity({ ...ZERO, relatedCount: 20 });
check("related cap ≤ basic/intermediate boundary", capped.score <= 2, `score ${capped.score}`);

if (failures) { console.error(`\ncomplexity tests: ${failures} FAILED`); process.exit(1); }
console.log("\ncomplexity tests: all passed");
