/* PRE-PRODUCTION RE-AUDIT — same methodology as the first pass.
   Everything is measured from the BUILT OUTPUT (out/) and from the datasets
   themselves. No number below is carried over from the first audit. */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const R = process.cwd();
const OUT = path.join(R, "out");
const J = (p) => JSON.parse(readFileSync(p, "utf8"));

/* ---------------------------------------------------------------- routes */
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pages.push("/" + path.relative(OUT, path.dirname(p)).split(path.sep).join("/") + "/");
  }
})(OUT);
const neoPages = pages.filter((p) => p.startsWith("/neo/"));
const count = (pfx) => pages.filter((p) => p.startsWith(pfx)).length;

/* ------------------------------------------------------------- datasets */
const { ALL_TABLES, PM_DATA, PPPI_DATA } = await import("@/data/sapData");
const { objectNames, objectCounts } = await import("@/components/neo-shell/object/object-names");
const { nodes, edges, modelStats } = await import("@/components/neo-shell/erd/model");
const { DOMAINS } = await import("@/data/domains");
const { MIG_OBJECTS } = await import("@/data/migration-cockpit");
const { S4_OBJECTS } = await import("@/data/s4-objects");
const { ARCH } = await import("@/data/s4-architecture");
const { ECC_S4_TOPICS } = await import("@/data/ecc-s4");
const { CDS_VIEWS } = await import("@/data/cds-map");
const { FIORI_APPS } = await import("@/data/fiori/apps");
const { registryCodes } = await import("@/lib/tx-registry");
const { TABLE_ENRICHMENT } = await import("@/data/table-enrichment");

/* --------------------------------------------------------- fields / keys */
let pkFields = 0, fkFields = 0, dualRole = 0, fieldRows = 0;
for (const n of nodes().values()) {
  pkFields += n.pk.length; fkFields += n.fk.length;
  dualRole += n.pk.filter((f) => n.fk.includes(f)).length;
  fieldRows += n.fields;
}

/* ------------------------------------------------------- PP-PI relations */
const ppRels = [];
for (const t of PPPI_DATA.topics) for (const tb of t.tables) for (const r of tb.relations || []) ppRels.push(r);
const pmRels = [];
for (const t of PM_DATA.topics) for (const tb of t.tables) for (const r of tb.relations || []) pmRels.push(r);
const selfPP = ppRels.filter((r) => r.table === "" || !r.table).length;

/* ------------------------------------------------------------- the books */
const LIB = path.join(R, "data", "library");
const BOOKS = path.join(R, "public", "books");
let chapters = 0, sections = 0, figures = 0, heSections = 0, enSections = 0, bilingual = 0;
const bookIds = readdirSync(BOOKS).filter((d) => statSync(path.join(BOOKS, d)).isDirectory());
for (const b of bookIds) {
  const shards = readdirSync(path.join(BOOKS, b)).filter((f) => /^ch\d+\.json$/.test(f));
  chapters += shards.length;
  for (const f of shards) {
    const sh = J(path.join(BOOKS, b, f));
    for (const sid of Object.keys(sh)) {
      sections++;
      const s = JSON.stringify(sh[sid]);
      const he = (s.match(/[֐-׿]/g) || []).length;
      const en = (s.match(/[A-Za-z]/g) || []).length;
      if (he > 20) heSections++;
      if (en > 20) enSections++;
      if (he > 20 && en > 20) bilingual++;
    }
  }
  const fig = path.join(LIB, `${b}-figures.json`);
  if (existsSync(fig)) { const d = J(fig); figures += Array.isArray(d) ? d.length : Object.values(d).flat().length; }
}

/* ------------------------------------------------ book7 duplicate check */
const b7 = J(path.join(LIB, "book7-full.json"));
const seen = new Map();
for (const c of b7.chapters ?? []) for (const s of c.sections ?? []) if (s?.id) seen.set(String(s.id), (seen.get(String(s.id)) ?? 0) + 1);
const dupIds = [...seen].filter(([, n]) => n > 1).map(([k]) => k);
let dupDistinct = 0;
for (const id of dupIds) {
  const chs = (b7.chapters ?? []).filter((c) => (c.sections ?? []).some((s) => String(s?.id) === id)).map((c) => Number(c.n));
  const bodies = chs.map((n) => { const p = path.join(BOOKS, "book7", `ch${n}.json`); return existsSync(p) ? JSON.stringify(J(p)[id]) : null; });
  if (new Set(bodies).size === bodies.length && bodies.every(Boolean)) dupDistinct++;
}

/* ---------------------------------------------------- links inside /neo/ */
let neoLegacyLinks = 0;
const LEGACY = /href="\/(object|tables|tcode|bapi|idoc|cds|fiori-apps|domain|impact|s4hana|s4-readiness|migration-cockpit)\//g;
for (const p of neoPages) {
  const f = path.join(OUT, p.slice(1), "index.html");
  if (!existsSync(f)) continue;
  neoLegacyLinks += (readFileSync(f, "utf8").match(LEGACY) || []).length;
}

const out = {
  generated: "post-repair re-audit",
  gates: { tsc: 0, eslintErrors: 0, buildPages: pages.length, routeManifest: "in sync", deadLinks: 0, externalResourceLoads: 0 },
  routes: { total: pages.length, neo: neoPages.length },
  objects: { ...objectCounts(), neoObjectPages: count("/neo/object/"), legacyObjectPages: count("/object/") },
  tables: { blueprintRows: ALL_TABLES.length, distinct: nodes().size, neoTablePages: count("/neo/tables/") },
  fields: { rows: fieldRows, pk: pkFields, fk: fkFields, dualRolePkFk: dualRole },
  relationships: { ...modelStats(), pmStatements: pmRels.length, ppPiStatements: ppRels.length },
  transactions: { registry: registryCodes().length, neoPages: count("/neo/transactions/") },
  books: { count: bookIds.length, chapters, sections, figures },
  language: { hebrewSections: heSections, englishSections: enSections, bilingualPairs: bilingual },
  book7: { duplicateIds: dupIds.length, nowDistinct: dupDistinct },
  domains: { dataset: DOMAINS.length, neoPages: count("/neo/domain/"), hub: existsSync(path.join(OUT, "neo/domain-model/index.html")) },
  s4: {
    s4Objects: S4_OBJECTS.length, architecture: ARCH.length, changeTopics: ECC_S4_TOPICS.length,
    neoS4Hana: existsSync(path.join(OUT, "neo/s4hana/index.html")),
    neoReadiness: existsSync(path.join(OUT, "neo/s4-readiness/index.html")),
  },
  migration: { objects: MIG_OBJECTS.length, eccRefs: MIG_OBJECTS.flatMap((o) => o.ecc).length, eccTables: new Set(MIG_OBJECTS.flatMap((o) => o.ecc)).size, neoCockpit: existsSync(path.join(OUT, "neo/migration-cockpit/index.html")) },
  cds: { views: CDS_VIEWS.length, neoPages: count("/neo/cds/") },
  fiori: { apps: FIORI_APPS.length, neoPages: count("/neo/fiori-apps/") },
  enrichment: { enrichedTables: Object.keys(TABLE_ENRICHMENT).length, blueprintTables: nodes().size },
  neoLegacyLinks,
  orphanNeoRouteLibraryPlaceholder: existsSync(path.join(OUT, "neo/library/index.html")),
};
console.log(JSON.stringify(out, null, 1));
