import test from "node:test";
import assert from "node:assert/strict";
import { TX_VERIFICATION } from "../data/verification/transactions.ts";
import { TRANSACTIONS } from "../data/transactions.ts";
import { ROUTE_MANIFEST } from "../lib/route-manifest.generated.ts";

/* Design audit §18 (2026-09-22) · IP30 / IP30H. The Simplification Item
   "S4TWL - Scheduling of Maintenance Plan" names IP30H (RISTRA20H) as the
   path away from IP30's batch input, in the 2023 and 2025 FPS01 lists. The
   project therefore carries IP30H as a native transaction record with a page,
   IP30 as "not strategic" with IP30H as its linked successor, and the two
   cross-referencing each other. These tests keep that contract. */

const byId = new Map(TX_VERIFICATION.map((r) => [r.id, r]));

test("IP30H is a native transaction record with a generated page", () => {
  const t = TRANSACTIONS.find((x) => x.code === "IP30H");
  assert.ok(t, "data/transactions.ts carries IP30H");
  assert.equal(t!.module, "PM");
  assert.ok(ROUTE_MANIFEST.tcodes.includes("IP30H"), "the route manifest lists IP30H (run gen:routes after adding a code)");
});

test("tx:IP30H is S/4HANA-native on official evidence", () => {
  const r = byId.get("tx:IP30H");
  assert.ok(r, "overlay record tx:IP30H");
  assert.equal(r!.status?.status, "s4_native");
  assert.equal(r!.status?.edition, "on-premise");
  const official = r!.evidence.filter((e) => e.verificationLevel === "sap_official_verified");
  assert.ok(official.length >= 3, `at least three official sources, got ${official.length}`);
  assert.ok(official.some((e) => e.sourceType === "simplification_item"), "a Simplification Item source");
  assert.ok(r!.xrefs?.includes("tx:IP30"), "cross-references IP30");
});

test("tx:IP30 is not strategic, with IP30H as its linked successor", () => {
  const r = byId.get("tx:IP30");
  assert.ok(r, "overlay record tx:IP30");
  assert.equal(r!.status?.status, "deprecated");
  assert.equal(r!.status?.successor, "tx:IP30H");
  assert.ok(r!.status?.secondary?.includes("simplified"), "the Simplification Item stays as the secondary reading");
  assert.ok(r!.xrefs?.includes("tx:IP30H"), "cross-references IP30H");
  // release-appropriate evidence for the lifecycle claim: the item, in an official list
  const src = r!.status?.source;
  assert.equal(src?.sourceType, "simplification_item");
  assert.ok(/2025/.test(src?.release ?? ""), "the status source names the release");
});
