// Evidence foundation · schema rules over every overlay file and the best
// practices. Loads with `node --experimental-strip-types --test` and NO alias
// loader: the rule engine is pure, the overlay files carry type-only imports,
// and the id universe comes from the alias-free generated manifest.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ROUTE_MANIFEST } from "../lib/route-manifest.generated.ts";
import { FIORI_APPS } from "../data/fiori/apps.ts";
import { EXITS } from "../data/exits.ts";
import { ENHANCEMENTS } from "../data/enhancements.ts";
import {
  RULES, buildUniverse, validateBestPractices, validateRecords, validateRegistry, type Problem,
} from "../lib/evidence/validate.ts";
import { TABLE_VERIFICATION } from "../data/verification/tables.ts";
import { TX_VERIFICATION } from "../data/verification/transactions.ts";
import { FM_VERIFICATION } from "../data/verification/functions.ts";
import { IDOC_BASIC_TYPES, IDOC_VERIFICATION } from "../data/verification/idocs.ts";
import { CDS_VERIFICATION } from "../data/verification/cds.ts";
import { FIORI_VERIFICATION } from "../data/verification/fiori.ts";
import { ENH_VERIFICATION } from "../data/verification/enhancements.ts";
import { OBJECT_REGISTRY, OBJECT_VERIFICATION } from "../data/verification/objects.ts";
import { PM_BEST_PRACTICES } from "../data/best-practices/pm.ts";
import { PPPI_BEST_PRACTICES } from "../data/best-practices/pp-pi.ts";

const REGISTRY = [...OBJECT_REGISTRY, ...IDOC_BASIC_TYPES];
const BPS = [...PM_BEST_PRACTICES, ...PPPI_BEST_PRACTICES];
const ALL_RECORDS = [
  ...TABLE_VERIFICATION, ...TX_VERIFICATION, ...FM_VERIFICATION, ...IDOC_VERIFICATION,
  ...CDS_VERIFICATION, ...FIORI_VERIFICATION, ...ENH_VERIFICATION, ...OBJECT_VERIFICATION,
];

const universe = () => buildUniverse({
  manifest: ROUTE_MANIFEST,
  fioriIds: FIORI_APPS.map((a) => a.id),
  exitNames: EXITS.map((e) => ({ name: e.name, kind: e.kind })),
  techniqueSlugs: ENHANCEMENTS.map((e) => e.slug),
  registry: REGISTRY,
  bpSlugs: BPS.map((b) => b.slug),
});

const fmt = (ps: Problem[]): string =>
  ps.slice(0, 8).map((p) => `  ${p.rule} · ${p.id} · ${p.detail}`).join("\n");

test("every schema rule holds over the overlays, the registries and the best practices", () => {
  const u = universe();
  const problems: Problem[] = [
    ...validateRecords(ALL_RECORDS, u),
    ...validateRegistry(REGISTRY, u),
    ...validateBestPractices(BPS, u),
  ];
  for (const rule of RULES) {
    const hit = problems.filter((p) => p.rule === rule);
    assert.equal(hit.length, 0, `rule ${rule} violated:\n${fmt(hit)}`);
  }
});

test("the honest fiori path: a curated id with no library URL stays verification_required", () => {
  // The worked example must exercise the needsVerification state, not fake a
  // verified one — this is the F2731/F5241 lesson applied before it repeats.
  for (const r of FIORI_VERIFICATION) {
    assert.ok(r.evidence.length > 0, `${r.id} has no evidence`);
    for (const e of r.evidence) assert.equal(e.verificationLevel, "verification_required", r.id);
  }
});

test("worked examples are repository-verified only (no official claims yet)", () => {
  for (const r of ALL_RECORDS) {
    for (const e of r.evidence) {
      assert.equal(e.sourceType, "repository", `${r.id}: foundation evidence must be repository`);
      assert.ok(e.repoRef, `${r.id}: repository evidence without repoRef`);
      assert.notEqual(e.verificationLevel, "sap_official_verified", r.id);
    }
    assert.equal(r.status, undefined, `${r.id}: foundation records must not author a status`);
  }
});

/* ------------------------------------------------- loader-free guard */

const root = new URL("..", import.meta.url);
const read = (p: string) => readFileSync(fileURLToPath(new URL(p, root)), "utf8");

const PURE_FILES = [
  "lib/evidence/types.ts", "lib/evidence/canonical.ts", "lib/evidence/s4-status.ts",
  "lib/evidence/depth.ts", "lib/evidence/validate.ts",
];
const DATA_FILES = [
  "data/verification/tables.ts", "data/verification/transactions.ts", "data/verification/functions.ts",
  "data/verification/idocs.ts", "data/verification/cds.ts", "data/verification/fiori.ts",
  "data/verification/enhancements.ts", "data/verification/objects.ts",
  "data/best-practices/pm.ts", "data/best-practices/pp-pi.ts",
];

test("pure modules and overlay files carry no value imports at all", () => {
  for (const p of [...PURE_FILES, ...DATA_FILES]) {
    const bad = read(p).split("\n").filter((l) => /^import\s/.test(l) && !/^import\s+type\b/.test(l));
    assert.deepEqual(bad, [], `${p} has value imports:\n${bad.join("\n")}`);
  }
});

test("data/verification/index.ts imports exactly the eight files this suite loads", () => {
  const names = [...read("data/verification/index.ts").matchAll(/from\s+"\.\/([a-z-]+)"/g)]
    .map((m) => m[1]).sort();
  assert.deepEqual(names, ["cds", "enhancements", "fiori", "functions", "idocs", "objects", "tables", "transactions"]);
});
