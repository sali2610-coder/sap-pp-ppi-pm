// Evidence foundation · cross-reference integrity. The universe is built from
// the alias-free generated route manifest plus the four loadable data files
// and the new registries — i.e. from the very lists the routes generate from,
// so an id that passes here has a real record (and usually a page) behind it.
// Loads with `node --experimental-strip-types --test` and NO alias loader.
import test from "node:test";
import assert from "node:assert/strict";
import { ROUTE_MANIFEST } from "../lib/route-manifest.generated.ts";
import { FIORI_APPS } from "../data/fiori/apps.ts";
import { EXITS } from "../data/exits.ts";
import { ENHANCEMENTS } from "../data/enhancements.ts";
import { buildUniverse, resolveId, validateBestPractices, validateRecords, validateRegistry } from "../lib/evidence/validate.ts";
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

const u = buildUniverse({
  manifest: ROUTE_MANIFEST,
  fioriIds: FIORI_APPS.map((a) => a.id),
  exitNames: EXITS.map((e) => ({ name: e.name, kind: e.kind })),
  techniqueSlugs: ENHANCEMENTS.map((e) => e.slug),
  registry: REGISTRY,
  bpSlugs: BPS.map((b) => b.slug),
});

test("no dangling xref, successor, member or best-practice reference", () => {
  const dangling = [
    ...validateRecords(ALL_RECORDS, u),
    ...validateRegistry(REGISTRY, u),
    ...validateBestPractices(BPS, u),
  ].filter((p) => p.rule === "dangling-xref");
  assert.deepEqual(dangling.map((p) => `${p.id} → ${p.detail}`), []);
});

test("every overlay record id itself resolves in the universe", () => {
  // A record that only exists in the overlay would be a record about nothing:
  // the rail counts must not move because a verification record was added.
  for (const r of ALL_RECORDS) assert.ok(resolveId(u, r.id), `${r.id} is not in the universe`);
});

test("no duplicate id across the eight overlay files, the registries and the bp slugs", () => {
  const ids = ALL_RECORDS.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate overlay id");
  const regIds = REGISTRY.map((r) => r.id);
  assert.equal(new Set(regIds).size, regIds.length, "duplicate registry id");
  const slugs = BPS.map((b) => b.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate bp slug");
  assert.ok(ids.every((id) => !id.startsWith("bp:")), "an overlay must not claim a bp id");
});

test("no alias maps to two ids and no alias shadows another record's id", () => {
  const collisions = validateRecords(ALL_RECORDS, u).filter((p) => p.rule === "alias-collision");
  assert.deepEqual(collisions.map((p) => `${p.id} · ${p.detail}`), []);
});

test("every registry entry has at least one resolving member", () => {
  for (const e of REGISTRY) {
    const resolving = (e.members ?? []).filter((m) => resolveId(u, m));
    assert.ok(resolving.length >= 1, `${e.id} has no resolving member`);
  }
});
