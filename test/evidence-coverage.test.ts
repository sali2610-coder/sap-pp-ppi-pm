import test from "node:test";
import assert from "node:assert/strict";
import { coverageOf } from "../lib/evidence/validate.ts";
import type { CanonicalId, S4Status, VerificationLevel } from "../lib/evidence/types.ts";

const record = (id: CanonicalId, level: VerificationLevel, status: S4Status) => ({
  id, level, status, depth: 2 as const, edition: "on-premise" as const,
});

test("coverage keeps SAP, repository and secondary evidence tiers distinct", () => {
  const result = coverageOf("tables", [
    record("table:AA", "sap_official_verified", "changed"),
    record("table:BB", "repository_verified", "changed"),
    record("table:CC", "supported_secondary_source", "changed"),
    record("table:DD", "conflicting_sources", "changed"),
    record("table:EE", "legacy_context_only", "legacy_ecc_only"),
    record("table:FF", "verification_required", "verification_required"),
  ]);
  assert.equal(result.verified, 3, "legacy aggregate remains compatible");
  assert.equal(result.byVerificationLevel.sap_official_verified, 1);
  assert.equal(result.byVerificationLevel.repository_verified, 1);
  assert.equal(result.byVerificationLevel.supported_secondary_source, 1);
  assert.equal(Object.values(result.byVerificationLevel).reduce((a, b) => a + b, 0), result.total);
  assert.equal(result.conflicting, 1);
  assert.equal(result.legacyOnly, 1);
});

test("a sourced record with unknown S/4 status still needs verification, counted once", () => {
  const result = coverageOf("tables", [
    record("table:AA", "sap_official_verified", "verification_required"),
    record("table:BB", "repository_verified", "verification_required"),
    record("table:CC", "verification_required", "verification_required"),
    record("table:DD", "verification_required", "changed"),
    record("table:EE", "sap_official_verified", "changed"),
  ]);
  assert.equal(result.verificationRequired, 4);
  assert.equal(result.statusVerificationRequired, 3);
  assert.equal(result.byVerificationLevel.verification_required, 2);
});

test("an empty catalog produces zero coverage without fabricating evidence", () => {
  const result = coverageOf("tables", []);
  assert.equal(result.total, 0);
  assert.equal(result.verificationRequired, 0);
  assert.equal(result.statusVerificationRequired, 0);
  assert.ok(Object.values(result.byVerificationLevel).every((n) => n === 0));
});
