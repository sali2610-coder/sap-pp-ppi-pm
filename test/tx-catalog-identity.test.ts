import test from "node:test";
import assert from "node:assert/strict";
import { canonicalTxCode, TX_ROUTE_ALIASES } from "../lib/tx-route-aliases.ts";
import { TCODE_DIRECTORY } from "../data/tcode-directory.ts";
import { TX_VERIFICATION_E } from "../data/verification/transactions-e.ts";
import { ROUTE_MANIFEST } from "../lib/route-manifest.generated.ts";
import { decidingEvidence, levelOf } from "../lib/evidence/s4-status.ts";

test("the UI2 report keeps a historical route without becoming another transaction", () => {
  const old = "/UI2/INVALIDATE_GLOBAL_CACHES";
  const code = "/UI2/INVAL_CACHES";
  assert.equal(canonicalTxCode(` ${old.toLowerCase()} `), code);
  assert.equal(canonicalTxCode(code), code);
  assert.equal(canonicalTxCode(" f.01 "), "F.01");
  assert.equal(canonicalTxCode("UNKNOWN"), "UNKNOWN");
  assert.equal(canonicalTxCode("constructor"), "CONSTRUCTOR");
  assert.ok(!TCODE_DIRECTORY.some((r) => r.code === old));
  const row = TCODE_DIRECTORY.find((r) => r.code === code);
  assert.ok(row);
  assert.ok(row.keywords.includes(old));
  assert.ok(row.purpose.includes(`report: ${old}`));
  for (const [alias, target] of Object.entries(TX_ROUTE_ALIASES)) {
    assert.ok((ROUTE_MANIFEST.tcodes as readonly string[]).includes(alias));
    assert.ok((ROUTE_MANIFEST.tcodes as readonly string[]).includes(target));
    assert.equal(canonicalTxCode(target), target, "an alias must not form a redirect chain");
  }
});

test("documented transaction names do not imply an unchanged S/4 lifecycle", () => {
  for (const code of ["F.01", "/UI2/INVAL_CACHES"]) {
    const record = TX_VERIFICATION_E.find((r) => r.id === `tx:${code}`);
    assert.ok(record);
    assert.equal(record.status?.status, "verification_required");
    assert.equal(record.status.source, null);
    assert.equal(levelOf(decidingEvidence(record.evidence)), "verification_required");
    assert.ok(record.evidence.every((e) => e.context && e.release && e.accessedAt && new URL(e.url!).hostname === "help.sap.com"));
  }
});
