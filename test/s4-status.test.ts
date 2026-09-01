// Evidence foundation · the unified S/4HANA status map, depth scoring and the
// canonical-id helpers. Loads with `node --experimental-strip-types --test`
// and NO alias loader: only pure modules and alias-free data files.
import test from "node:test";
import assert from "node:assert/strict";
import {
  ACTION_HE, LEVEL_RANK, S4_NATIVE_DERIVED, derivedLevel, fromBlueprintClass, fromCdsEnrichment,
  fromChangeStatus, fromCockpitTrust, fromEccS4Block, fromFioriTrust, fromFuncRegistry, fromLifecycle,
  fromS4Object, fromS4Trust, fromTxDisposition, fromVStatus, levelOf, pickStatus,
} from "../lib/evidence/s4-status.ts";
import { DEPTH_HE, depthInputFor, depthOf, fresh, successorOkFor } from "../lib/evidence/depth.ts";
import { isValidId, makeId, normalizeAlias, parseId } from "../lib/evidence/canonical.ts";
import { validId } from "../lib/evidence/validate.ts";
import {
  S4_STATUSES, S4_STATUS_DOT, S4_STATUS_HE, VERIFICATION_DOT, VERIFICATION_HE, VERIFICATION_LEVELS,
  type Evidence, type S4StatusClaim, type VerificationLevel,
} from "../lib/evidence/types.ts";
import { S4_HE, S4_UNDECIDED_HE } from "../lib/s4-class.ts";
import { SWEEP_ENRICHMENT } from "../data/bapi-enrichment.sweep.ts";

const EV = (level: VerificationLevel, extra: Partial<Evidence> = {}): Evidence => ({
  sourceType: "repository", sourceTitle: "מקור בדיקה", product: "SAP S/4HANA", edition: "on-premise",
  accessedAt: "2026-09-01", claim: "טענת בדיקה", verificationLevel: level, repoRef: "data/x.ts#Y", ...extra,
});

/* ------------------------- every legacy value of every vocabulary maps */

test("every legacy vocabulary value maps to a unified claim; unknown values throw", () => {
  const claims: S4StatusClaim[] = [
    ...([0, 1, 2, 3, null] as const).map((k) => fromBlueprintClass(k)),
    ...(["stays", "changed", "replaced", "removed"] as const).map((s) => fromS4Object(s)),
    fromLifecycle({ status: "Active", ecc: true, s4: true }),
    fromLifecycle({ status: "Active", ecc: false, s4: true }),
    fromLifecycle({ status: "Active", ecc: true, s4: false }),
    fromLifecycle({ status: "Deprecated", ecc: true, s4: true }),
    fromLifecycle({ status: "Obsolete", ecc: true, s4: false }),
    fromLifecycle({ status: "Obsolete", ecc: true, s4: true }),
    ...(["Unchanged", "Changed", "Replaced", "Deprecated"] as const).map(fromChangeStatus),
    ...(["superseded", "changed", "available", "unknown"] as const)
      .flatMap((d) => (["verified", "partial", "needs"] as const).map((t) => fromTxDisposition(d, t))),
    fromEccS4Block({ deprecated: "x" }), fromEccS4Block({ replaced: "x" }), fromEccS4Block({ changed: "x" }),
    fromEccS4Block({ unchanged: "x" }), fromEccS4Block({}),
    ...(["verified", "needs-review", "cross-module", "s4-only", "ecc-only"] as const).map(fromVStatus),
    fromCdsEnrichment({ verified: "verified" }).status,
    fromCdsEnrichment({ verified: "needs-verification" }).status,
    fromCdsEnrichment(undefined).status,
    S4_NATIVE_DERIVED("fiori-apps"),
  ];
  for (const c of claims) {
    assert.ok(S4_STATUSES.includes(c.status), `unknown status ${c.status}`);
    assert.ok(c.he.length > 0, "empty explanation");
    assert.equal(c.recommendedAction, ACTION_HE[c.status]);
    assert.ok(c.derivedFrom, "derived claim without derivedFrom");
    assert.equal(c.source, null);
    assert.equal(c.edition, "on-premise");
  }
  // levels-only vocabularies
  for (const t of ["verified", "partial", "needs"] as const) assert.ok(VERIFICATION_LEVELS.includes(fromS4Trust(t)));
  for (const t of ["curated", "needs-verification"] as const) assert.ok(VERIFICATION_LEVELS.includes(fromCockpitTrust(t)));
  for (const t of ["verified-docs", "curated", "needs-review"] as const) {
    assert.ok(VERIFICATION_LEVELS.includes(fromFioriTrust(t, true)));
    assert.ok(VERIFICATION_LEVELS.includes(fromFioriTrust(t, false)));
  }
  // a missing branch throws — silent defaults are exactly the bug class
  assert.throws(() => fromS4Trust("nope" as never));
  assert.throws(() => fromS4Object("nope" as never));
  assert.throws(() => fromLifecycle({ status: "Nope" as never, ecc: true, s4: true }));
  assert.throws(() => fromChangeStatus("Nope" as never));
  assert.throws(() => fromTxDisposition("nope" as never, "verified"));
  assert.throws(() => fromTxDisposition("changed", "nope" as never));
  assert.throws(() => fromFioriTrust("nope" as never, true));
  assert.throws(() => fromCdsEnrichment({ verified: "nope" }));
  assert.throws(() => fromVStatus("nope" as never));
  assert.throws(() => fromCockpitTrust("nope" as never));
  assert.throws(() => fromFuncRegistry({ verificationStatus: "nope", s4OnPremSupport: "yes", cloudSupport: "yes", stability: "Released" }));
  assert.throws(() => fromFuncRegistry({ verificationStatus: "verified-docs", s4OnPremSupport: "maybe", cloudSupport: "yes", stability: "Released" }));
});

test("bapi-registry vocabulary matrix", () => {
  const f = (verificationStatus: string, s4OnPremSupport: string) =>
    fromFuncRegistry({ verificationStatus, s4OnPremSupport, cloudSupport: "unknown", stability: "Released" });
  assert.deepEqual([f("verified-docs", "yes").status.status, f("verified-docs", "yes").level], ["unchanged", "repository_verified"]);
  assert.deepEqual([f("verified-system", "yes").status.status, f("verified-system", "yes").level], ["unchanged", "repository_verified"]);
  assert.deepEqual([f("verified-docs", "unknown").status.status, f("verified-docs", "unknown").level], ["verification_required", "verification_required"]);
  assert.deepEqual([f("version-dependent", "yes").status.status, f("version-dependent", "yes").level], ["changed", "repository_verified"]);
  assert.deepEqual([f("internal-unsupported", "yes").status.status, f("internal-unsupported", "yes").level], ["restricted", "repository_verified"]);
  assert.deepEqual([f("deprecated", "yes").status.status, f("deprecated", "yes").level], ["deprecated", "repository_verified"]);
  assert.deepEqual([f("invalid-name", "unknown").status.status, f("invalid-name", "unknown").level], ["not_applicable", "repository_verified"]);
  assert.deepEqual([f("requires-verification", "unknown").status.status, f("requires-verification", "unknown").level], ["verification_required", "verification_required"]);
  assert.equal(f("verified-docs", "no").status.status, "not_available");
});

/* --------------------------------------------- blueprint verdict guard */

test("blueprint round-trip and the validated label set are untouched", () => {
  for (const k of [0, 1, 2, 3, null] as const) assert.equal(fromBlueprintClass(k).derivedFrom, "blueprint");
  const labels = [...Object.values(S4_HE), S4_UNDECIDED_HE].sort();
  assert.deepEqual(labels, ["הוחלף", "הוסר", "ללא שינוי", "לא הוכרע במקור", "מותאם"].sort());
  assert.equal(fromBlueprintClass(0).status, "unchanged");
  assert.equal(fromBlueprintClass(1).status, "changed");
  assert.equal(fromBlueprintClass(2).status, "replaced");
  assert.equal(fromBlueprintClass(3).status, "not_available");
  assert.equal(fromBlueprintClass(null).status, "verification_required");
});

/* -------------------------------- derived claims: successor + release */

test("derived claims never invent a successor or a release", () => {
  const noStructured: S4StatusClaim[] = [
    ...([0, 1, 2, 3, null] as const).map((k) => fromBlueprintClass(k)),
    ...(["stays", "changed", "replaced", "removed"] as const).map((s) => fromS4Object(s)),
    fromLifecycle({ status: "Deprecated", ecc: true, s4: true }),
    ...(["Unchanged", "Changed", "Replaced", "Deprecated"] as const).map(fromChangeStatus),
    fromTxDisposition("superseded", "verified"),
    fromEccS4Block({ replaced: "x" }),
    ...(["verified", "needs-review", "cross-module", "s4-only", "ecc-only"] as const).map(fromVStatus),
  ];
  for (const c of noStructured) {
    assert.equal(c.successor, undefined, `successor invented for ${c.status}`);
    assert.equal(c.release, null, `release invented for ${c.status}`);
  }
  // structured inputs ARE carried — and only when they are bare codes
  assert.equal(fromLifecycle({ status: "Obsolete", ecc: true, s4: false, alt: "MIGO" }).successor, "tx:MIGO");
  assert.equal(fromLifecycle({ status: "Obsolete", ecc: true, s4: false, alt: "MIGO (101)" }).successor, undefined);
  assert.equal(fromLifecycle({ status: "Deprecated", ecc: true, s4: true, alt: "MD01N (MRP Live)" }).successor, undefined);
  assert.equal(fromBlueprintClass(2, "MATDOC").successor, "table:MATDOC");
  assert.equal(fromBlueprintClass(2, "AUFK (זהה) + סטטוס/עלות ב-ACDOCA").successor, undefined);
  assert.equal(fromS4Object("replaced", "S/4 1511").release, "S/4 1511");
  assert.equal(fromTxDisposition("superseded", "verified", "tx:CJ20N").successor, "tx:CJ20N");
  // carried successors are syntactically valid ids
  assert.ok(isValidId(fromLifecycle({ status: "Obsolete", ecc: true, s4: false, alt: "MIGO" }).successor as string));
  assert.ok(isValidId(fromBlueprintClass(2, "MATDOC").successor as string));
});

test("pickStatus prefers the authored claim and keeps derivedFrom on fallback", () => {
  const derived = fromBlueprintClass(1);
  const authored: S4StatusClaim = {
    status: "replaced", he: "נקבע ידנית", edition: "on-premise", release: "2023 FPS02",
    source: EV("sap_official_verified"), recommendedAction: ACTION_HE.replaced, successor: "table:MATDOC",
  };
  assert.equal(pickStatus(authored, derived), authored);
  assert.equal(pickStatus(undefined, derived), derived);
  assert.equal(pickStatus(undefined, derived).derivedFrom, "blueprint");
});

/* ----------------------------------------------- levels + secondary flags */

test("levelOf, derivedLevel and the inferred flag", () => {
  assert.equal(levelOf([]), "verification_required");
  assert.equal(levelOf([EV("repository_verified")]), "repository_verified");
  assert.equal(levelOf([EV("repository_verified"), EV("sap_official_verified", { url: "https://help.sap.com/x" })]), "sap_official_verified");
  assert.equal(levelOf([EV("repository_verified", { conflictingEvidence: [EV("repository_verified")] })]), "conflicting_sources");
  assert.equal(derivedLevel(fromBlueprintClass(0)), "repository_verified");
  assert.equal(derivedLevel(fromBlueprintClass(null)), "verification_required");
  assert.equal(derivedLevel(fromTxDisposition("changed", "needs")), "verification_required");
  assert.equal(derivedLevel(fromEccS4Block({ changed: "x" }, { inferred: true })), "verification_required");
  assert.equal(derivedLevel(fromCdsEnrichment(undefined).status), "verification_required");
  const flagged = fromEccS4Block({ changed: "x", fiori: "Custom Fields and Logic" });
  assert.deepEqual(flagged.secondary, ["fiori_alternative_available"]);
});

/* ------------------------------------------------------- depth scoring */

test("depthOf is cumulative and monotonic; staleness drops L5 to L4", () => {
  const officialSource = EV("sap_official_verified", { url: "https://help.sap.com/x" });
  const status: S4StatusClaim = {
    status: "replaced", he: "הוחלף לפי תיעוד רשמי", edition: "on-premise", release: "2023 FPS02",
    source: officialSource, recommendedAction: ACTION_HE.replaced, successor: "table:MATDOC",
  };
  const l5 = depthInputFor("tables", {
    hasHe: true, hasEn: true, structural: 6, status, level: "sap_official_verified",
    evidence: 2, officialWithUrl: 1, xrefsResolved: 2, xrefsTotal: 2,
    lastVerifiedAt: "2026-08-01", successorOk: successorOkFor(status),
  });
  const TODAY = "2026-09-01";
  assert.equal(depthOf(l5, TODAY), 5);

  const drop = (patch: Partial<typeof l5>, expect: number) =>
    assert.equal(depthOf({ ...l5, ...patch }, TODAY), expect, JSON.stringify(patch));
  drop({ hasHe: false }, 0);
  drop({ structural: 0 }, 1);
  drop({ status: null }, 2);
  drop({ status: { ...status, status: "verification_required" } }, 2);
  drop({ status: { ...status, release: null, derivedFrom: undefined } }, 2); // authored with no release
  drop({ evidence: 0 }, 3);
  drop({ level: "verification_required" }, 3);
  drop({ level: "conflicting_sources" }, 3);
  drop({ xrefsResolved: 1 }, 3);
  drop({ officialWithUrl: 0 }, 4);
  drop({ status: { ...status, release: null, derivedFrom: "blueprint" } }, 4); // derived → L3 holds, L5 needs release
  drop({ lastVerifiedAt: "2024-01-01" }, 4);
  drop({ lastVerifiedAt: null }, 4);
  drop({ successorOk: false }, 4);
  // monotonic: no degradation ever raises the level
  for (const patch of [{ hasHe: false }, { structural: 0 }, { status: null }, { evidence: 0 }, { officialWithUrl: 0 }] as const) {
    assert.ok(depthOf({ ...l5, ...patch }, TODAY) < 5);
  }
  // freshness boundary: 365 days inclusive
  assert.equal(fresh("2025-09-01", TODAY), true);
  assert.equal(fresh("2025-08-31", TODAY), false);
  assert.equal(fresh(null, TODAY), false);
  // successorOk: only replacement-family statuses demand a successor
  assert.equal(successorOkFor({ ...status, successor: undefined }), false);
  assert.equal(successorOkFor({ ...status, status: "unchanged", successor: undefined }), true);
});

/* --------------------------------- fm aliasing equals the cleanFunc rule */

test("normalizeAlias('fm', …) equals lib/object-intel cleanFunc on real name shapes", () => {
  // verbatim copy of lib/object-intel.ts:14 (the module itself pulls @/data/sapData and cannot load here)
  const cleanFunc = (name: string): string =>
    (name || "").split(/\s*[/(]|\s+-\s/)[0].trim().replace(/[^A-Za-z0-9_]+$/, "");
  const samples = [
    "BAPI_ALM_NOTIF_DATA_ADD / DATA_MODIFY / DATA_DELETE",
    "BAPI_ALM_ORDER_MAINTAIN - יצירה ועדכון",
    "BAPI_GOODSMVT_CREATE (261)",
    "MATMAS (MATMAS05)",
    "  BAPI_PROCORD_CREATE  ",
    "BAPI_TRANSACTION_COMMIT.",
    "Control Recipe",
    ...Object.keys(SWEEP_ENRICHMENT),
  ];
  for (const s of samples) assert.equal(normalizeAlias("fm", s), cleanFunc(s), s);
  // the sweep keys are registry ids and must be fixpoints of the rule
  for (const key of Object.keys(SWEEP_ENRICHMENT)) assert.equal(normalizeAlias("fm", key), key);
});

/* -------------------------- duplicated pure helpers cannot drift apart */

test("validate.ts validId agrees with canonical.ts isValidId; RANK agrees with depth", () => {
  const samples = [
    "table:MSEG", "tx:MIGO", "fm:BAPI_TRANSACTION_COMMIT", "idoc:msg:MATMAS", "idoc:basic:MATMAS05",
    "cds:I_MaterialDocumentItem", "fiori:F0843", "fiori:F2730A", "enh:badi:WORKORDER_UPDATE",
    "enh:exit:IWO10009", "enh:technique:classic-badi", "obj:material-document", "bp:bapi-commit-discipline",
    "table:", "table:lower", "fm:bad name!", "fiori:X123", "fiori:F843", "tx:THIS_CODE_IS_MUCH_TOO_LONG",
    "idoc:basic:MATMAS", "cds:lowercase", "obj:Not-A-Slug", "notakind:X", "MSEG", "",
  ];
  for (const id of samples) assert.equal(validId(id), isValidId(id), id);
  // parse/make round trip
  assert.deepEqual(parseId("idoc:basic:MATMAS05"), { kind: "idoc:basic", name: "MATMAS05" });
  assert.equal(makeId("tx", " migo "), "tx:MIGO");
  assert.equal(makeId("obj", "Material Document"), "obj:material-document");
  // LEVEL_RANK ordering is what depth L4 relies on
  assert.ok(LEVEL_RANK.sap_official_verified > LEVEL_RANK.repository_verified);
  assert.ok(LEVEL_RANK.repository_verified > LEVEL_RANK.supported_secondary_source);
  assert.ok(LEVEL_RANK.supported_secondary_source > LEVEL_RANK.legacy_context_only);
  assert.ok(LEVEL_RANK.legacy_context_only > LEVEL_RANK.verification_required);
  const atSecondary = depthInputFor("tables", {
    hasHe: true, structural: 6, status: fromBlueprintClass(0), level: "supported_secondary_source",
    evidence: 1, xrefsResolved: 0, xrefsTotal: 0,
  });
  assert.equal(depthOf(atSecondary, "2026-09-01"), 4);
  assert.equal(depthOf({ ...atSecondary, level: "legacy_context_only" }, "2026-09-01"), 3);
});

/* ------------------------------------------------------ Hebrew hygiene */

test("vocabulary Hebrew is complete, em-dash-free, and dots use --status-* tokens", () => {
  const maps: Record<string, string>[] = [S4_STATUS_HE, VERIFICATION_HE, ACTION_HE, DEPTH_HE as unknown as Record<string, string>];
  for (const m of maps) {
    for (const [k, v] of Object.entries(m)) {
      assert.ok(v && v.trim().length > 0, `empty label for ${k}`);
      assert.ok(!v.includes("—"), `em dash in label for ${k}: ${v}`);
    }
  }
  for (const v of [...Object.values(S4_STATUS_DOT), ...Object.values(VERIFICATION_DOT)]) {
    assert.match(v, /^var\(--status-[a-z-]+\)$/, v);
  }
});
