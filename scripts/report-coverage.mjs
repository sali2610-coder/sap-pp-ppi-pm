#!/usr/bin/env node
/**
 * Evidence coverage report — computes the derived S/4HANA status, verification
 * level and depth (L0..L5) for EVERY record of every existing catalog, through
 * the SAME pure mappers and the same resolve.evidenceBlock the app builders
 * use, then prints one table. Nothing here re-implements a rule: the catalog
 * lists come from the real builders (tableDetailNames, txDetailCodes,
 * bapi-registry, idoc-intel, cds-map, fiori apps, exits + enhancements, the
 * new registries and best practices).
 *
 * Invocation (same loader contract as gen:tx-index):
 *   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs \
 *     scripts/report-coverage.mjs [--json] [--catalog <name>] [--min-depth <catalog>=<L>]
 *
 * --json        print CoverageRow[] as JSON instead of the table
 * --catalog X   limit to one catalog
 * --min-depth   gate for later phases: exit 1 if any record of <catalog> is
 *               below depth <L> (repeatable)
 *
 * Kept OUT of prebuild on purpose: it re-runs the heavy builders.
 */

const args = process.argv.slice(2);
const flags = { json: false, catalog: null, minDepth: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") flags.json = true;
  else if (a === "--catalog") flags.catalog = args[++i];
  else if (a.startsWith("--catalog=")) flags.catalog = a.slice("--catalog=".length);
  else if (a === "--min-depth") flags.minDepth.push(args[++i]);
  else if (a.startsWith("--min-depth=")) flags.minDepth.push(a.slice("--min-depth=".length));
  else { console.error(`report-coverage: unknown argument ${a}`); process.exit(2); }
}

const [
  { tableDetail, tableDetailNames },
  { txDetail, txDetailCodes },
  { registry },
  { FUNCTION_INTEL },
  { idocMessageTypes },
  { CDS_VIEWS },
  { CDS_ENRICHMENT },
  { FIORI_APPS },
  { EXITS },
  { ENHANCEMENTS },
  { s4ClassOf },
  ev,
  { REGISTRY },
  { BEST_PRACTICES },
] = await Promise.all([
  import("../components/neo-shell/data/tables-detail.ts"),
  import("../components/neo-shell/data/tx-detail.ts"),
  import("../lib/bapi-registry.ts"),
  import("../data/function-intel.ts"),
  import("../lib/idoc-intel.ts"),
  import("../data/cds-map.ts"),
  import("../data/cds-enrichment.ts"),
  import("../data/fiori/apps.ts"),
  import("../data/exits.ts"),
  import("../data/enhancements.ts"),
  import("../lib/s4-class.ts"),
  import("../lib/evidence/index.ts"),
  import("../data/verification/index.ts"),
  import("../data/best-practices/index.ts"),
]);

/** A claim for a record with no structured legacy vocabulary behind it. */
const underived = (he) => ({
  status: "verification_required", he, edition: "on-premise", release: null, source: null,
  recommendedAction: ev.ACTION_HE.verification_required,
});

const rowOf = (block) => ({
  id: block.id,
  depth: block.depth.level,
  level: block.level.key,
  status: block.status.key,
  edition:
    block.sources.find((s) => s.edition === "private-cloud" || s.edition === "public-cloud")?.edition ??
    block.status.edition,
});

const truthy = (v) => (typeof v === "number" ? v > 0 : !!v);

const BUILDERS = {
  tables: () => tableDetailNames().map((name) => {
    const t = tableDetail(name);
    const note = t.rows.map((r) => r.s4Note).find(Boolean) || "";
    const alt = t.rows.map((r) => r.s4AltTable).find(Boolean) || "";
    const derived = ev.fromBlueprintClass(s4ClassOf({ s4Note: note }), alt);
    return rowOf(ev.evidenceBlock(`table:${name}`, derived, {
      hasHe: !!t.he, hasEn: !!t.en, structural: t.fields.filter((f) => f.dt && f.len).length,
    }, "tables"));
  }),

  transactions: () => txDetailCodes().map((code) => {
    const d = txDetail(code);
    const successor = d.s4.supersededBy[0] ? ev.makeId("tx", d.s4.supersededBy[0]) : undefined;
    const derived = ev.fromTxDisposition(d.s4.disposition, d.s4.trust, successor);
    return rowOf(ev.evidenceBlock(`tx:${code}`, derived, {
      hasHe: !!d.he, hasEn: !!d.en,
      structural: [d.purpose, d.process, d.tables.length, d.bapis.length].filter(truthy).length,
    }, "transactions"));
  }),

  functions: () => registry().filter((o) => o.objectType !== "IDoc").map((o) => {
    const { status } = ev.fromFuncRegistry(o);
    const intel = FUNCTION_INTEL[o.id];
    const structural = Math.max(
      o.tables.length + o.transactions.length,
      intel ? intel.inputs.length + intel.outputs.length : 0,
    );
    return rowOf(ev.evidenceBlock(`fm:${o.id}`, status, {
      hasHe: !!o.shortDescriptionHe, hasEn: !!o.shortDescriptionEn, structural,
    }, "functions"));
  }),

  idocs: () => idocMessageTypes().map((name) => {
    const intel = FUNCTION_INTEL[name];
    const derived = intel
      ? ev.fromEccS4Block({ unchanged: intel.ecc, changed: intel.s4 }, { inferred: !!intel.inferred })
      : ev.fromEccS4Block({});
    return rowOf(ev.evidenceBlock(`idoc:msg:${name}`, derived, {
      hasHe: !!intel?.what, hasEn: false, structural: intel ? 1 : 0,
    }, "idocs"));
  }),

  cds: () => CDS_VIEWS.map((v) => {
    const e = CDS_ENRICHMENT[v.view];
    const { status } = ev.fromCdsEnrichment(e);
    const structural = [v.tables.length, e?.viewType, e?.keyField].filter(truthy).length;
    return rowOf(ev.evidenceBlock(`cds:${v.view}`, status, { hasHe: !!v.he, hasEn: false, structural }, "cds"));
  }),

  fiori: () => FIORI_APPS.map((a) => {
    const derived = ev.S4_NATIVE_DERIVED("fiori-apps", a.trust === "needs-review");
    return rowOf(ev.evidenceBlock(`fiori:${a.id}`, derived, {
      hasHe: !!a.he, hasEn: !!a.name,
      structural: [a.role, a.catalog, a.odata, a.guiTx.length].filter(truthy).length,
    }, "fiori"));
  }),

  enhancements: () => [
    ...ENHANCEMENTS.map((e) => rowOf(ev.evidenceBlock(
      `enh:technique:${e.slug}`,
      ev.fromEccS4Block({ changed: e.s4, unchanged: e.ecc }),
      { hasHe: !!e.he, hasEn: !!e.title, structural: [e.def, e.how, e.tcodes.length].filter(truthy).length },
      "enhancements",
    ))),
    ...EXITS.map((x) => rowOf(ev.evidenceBlock(
      `enh:${x.kind === "BAdI" || x.kind === "Enhancement Spot" ? "badi" : "exit"}:${x.name.toUpperCase()}`,
      ev.fromEccS4Block(x.eccS4, { inferred: !!x.inferred }),
      { hasHe: !!x.he, hasEn: false, structural: [x.trigger, x.object, x.tcodes.length].filter(truthy).length },
      "enhancements",
    ))),
  ],

  objects: () => REGISTRY.filter((r) => r.id.startsWith("obj:")).map((r) => rowOf(ev.evidenceBlock(
    r.id,
    underived("לא קיים במאגר מקור מובנה למעמד ה-S/4HANA של קבוצת אובייקטים זו; נדרשת רשומת אימות"),
    { hasHe: !!r.he, hasEn: !!r.en, structural: (r.members ?? []).length },
    "objects",
  ))),

  "best-practices": () => BEST_PRACTICES.map((b) => rowOf(ev.evidenceBlock(
    `bp:${b.slug}`,
    b.status ?? underived("ההמלצה עצמה אינה אובייקט SAP; מעמד ה-S/4HANA נקרא מהאובייקטים המקושרים"),
    { hasHe: !!b.he, hasEn: !!b.en, structural: b.steps.length },
    "best-practices",
  ))),
};

const NOTES = {
  enhancements: `(${ENHANCEMENTS.length} techniques + ${EXITS.length} named exits/BAdIs)`,
};

const catalogs = flags.catalog ? [flags.catalog] : Object.keys(BUILDERS);
for (const c of catalogs) {
  if (!BUILDERS[c]) { console.error(`report-coverage: unknown catalog "${c}"`); process.exit(2); }
}

const perCatalog = new Map();
for (const c of catalogs) perCatalog.set(c, BUILDERS[c]());
const coverage = [...perCatalog].map(([c, rows]) => ev.coverageOf(c, rows));

if (flags.json) {
  console.log(JSON.stringify(coverage, null, 2));
} else {
  const cols = [
    ["catalog", 16, "l"], ["total", 6], ["L0", 5], ["L1", 5], ["L2", 5], ["L3", 5], ["L4", 5], ["L5", 5],
    ["verified", 10], ["verif.req", 11], ["conflict", 10], ["legacy", 8], ["s4-appl", 9], ["edition", 9],
  ];
  const line = (vals) => vals.map((v, i) =>
    cols[i][2] === "l" ? String(v).padEnd(cols[i][1]) : String(v).padStart(cols[i][1])).join("");
  console.log(line(cols.map(([h]) => h)));
  const total = { total: 0, d: [0, 0, 0, 0, 0, 0], verified: 0, vr: 0, conf: 0, legacy: 0, s4: 0, ed: 0 };
  for (const r of coverage) {
    console.log(line([
      r.catalog, r.total, r.depth[0], r.depth[1], r.depth[2], r.depth[3], r.depth[4], r.depth[5],
      r.verified, r.verificationRequired, r.conflicting, r.legacyOnly, r.s4Applicable, r.editionSpecific,
    ]) + (NOTES[r.catalog] ? `  ${NOTES[r.catalog]}` : ""));
    total.total += r.total;
    for (let l = 0; l <= 5; l++) total.d[l] += r.depth[l];
    total.verified += r.verified; total.vr += r.verificationRequired; total.conf += r.conflicting;
    total.legacy += r.legacyOnly; total.s4 += r.s4Applicable; total.ed += r.editionSpecific;
  }
  console.log(line(["TOTAL", total.total, ...total.d, total.verified, total.vr, total.conf, total.legacy, total.s4, total.ed]));
}

/* ------------------------------------------------------ --min-depth gate */

let failed = false;
for (const spec of flags.minDepth) {
  const m = /^([a-z-]+)=([0-5])$/.exec(spec || "");
  if (!m) { console.error(`report-coverage: bad --min-depth "${spec}" (expected catalog=L)`); process.exit(2); }
  const [, c, lRaw] = m;
  const min = Number(lRaw);
  const rows = perCatalog.get(c) ?? BUILDERS[c]?.();
  if (!rows) { console.error(`report-coverage: unknown catalog in --min-depth "${spec}"`); process.exit(2); }
  const below = rows.filter((r) => r.depth < min);
  if (below.length) {
    failed = true;
    console.error(`min-depth gate FAILED: ${c} has ${below.length} record(s) below L${min}: ` +
      below.slice(0, 8).map((r) => `${r.id}(L${r.depth})`).join(", ") + (below.length > 8 ? ", …" : ""));
  } else {
    console.log(`min-depth gate ok: every ${c} record is at L${min} or above`);
  }
}
process.exit(failed ? 1 : 0);
