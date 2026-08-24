/* ============================================================================
   PROJECT NEO · THE S/4HANA SURFACES — data layer.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time.

   Project NEO is an ECC→S/4HANA platform whose three S/4 surfaces were, until
   now, reachable from nothing:

     data/s4-objects        29 curated ECC→S/4 object simplifications
     data/s4-architecture    8 landscape components, ECC vs S/4, layer by layer
     data/s4-transformation  9 custom-code rows · 6 integration · 8 testing ·
                             3 cutover phases (13 steps) · 6 lessons
     data/ecc-s4            18 change topics with status, impact, Fiori/CDS
     data/migration-cockpit 24 migration objects (56 ECC table references,
                             49 distinct) · 5 approaches · 8 error patterns ·
                             6 quality dimensions · 7 readiness criteria ·
                            10 checklist steps · 4 load layers
     lib/s4-readiness       per-module readiness, computed

   THREE THINGS THIS FILE IS CAREFUL ABOUT

   1. READINESS IS COMPUTED AT BUILD TIME, NOT FETCHED AT RUNTIME.
      The legacy page fetched /sap-infrastructure/dataset.json in a useEffect and
      rendered zeros until it landed. The same file is read here with fs, the
      same way components/neo-shell/erd/erd-catalog already reads it, so the NEO
      page is complete in the HTML and needs no network at all. Same input, same
      `computeReadiness`, same numbers — this is a delivery change, not a data
      change.

   2. THE LOAD SEQUENCE IS DERIVED, NOT AUTHORED.
      `dependsOn` in data/migration-cockpit is the real dependency edge set. The
      wave number of each object is computed from it by longest-path, so the
      sequence shown can never contradict the dependencies stored. If someone
      adds a dependency, the waves move on their own.

   3. TRUST IS CARRIED THROUGH, NEVER FLATTENED.
      Every one of these datasets marks curated vs needs-verification per record,
      because that distinction is the whole reason they are usable. It reaches
      the view intact.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { S4_OBJECTS, S4STATUS_META, type S4Obj, type S4Status } from "@/data/s4-objects";
import { ARCH, ARCH_STATUS, type ArchComp } from "@/data/s4-architecture";
import {
  CUSTOM_CODE, CUSTOM_CODE_NOTE, CUTOVER, EXEC_NARRATIVE, INTEGRATION, LESSONS, TESTING,
} from "@/data/s4-transformation";
import { ECC_S4_TOPICS, STATUS_COLOR, STATUS_HE, type EccS4Topic } from "@/data/ecc-s4";
import {
  APPROACHES, MIG_CHECKLIST, MIG_ERRORS, MIG_LOAD_LAYERS, MIG_OBJECTS, QUALITY_DIMS, READINESS,
  type MigObj,
} from "@/data/migration-cockpit";
import { computeReadiness, overallReadiness, type ModuleReadiness, type RTbl } from "@/lib/s4-readiness";
import { objectHref, txHref } from "../reference/ref-links";

export type { ArchComp, EccS4Topic, MigObj, ModuleReadiness, S4Obj, S4Status };
export {
  APPROACHES, ARCH, ARCH_STATUS, CUSTOM_CODE, CUSTOM_CODE_NOTE, CUTOVER, ECC_S4_TOPICS,
  EXEC_NARRATIVE, INTEGRATION, LESSONS, MIG_CHECKLIST, MIG_ERRORS, MIG_LOAD_LAYERS,
  QUALITY_DIMS, READINESS, S4STATUS_META, STATUS_COLOR, STATUS_HE, TESTING,
};

export interface S4Link { t: string; href: string | null }

const memo = <T>(fn: () => T): (() => T) => {
  let v: T | undefined; let done = false;
  return () => { if (!done) { v = fn(); done = true; } return v as T; };
};

const link = (t: string): S4Link => ({ t, href: objectHref(t) });

/* --------------------------------------------------- the object catalogue */

export interface S4ObjView extends S4Obj {
  statusHe: string;
  statusColor: string;
  /** Related names, each a destination only when the project generates a page. */
  relatedLinks: S4Link[];
  replacesLinks: S4Link[];
  /** true when the object itself has a NEO object page. */
  href: string | null;
}

export const s4Objects = memo((): S4ObjView[] =>
  S4_OBJECTS.map((o) => ({
    ...o,
    statusHe: S4STATUS_META[o.status].he,
    statusColor: S4STATUS_META[o.status].c,
    relatedLinks: (o.related || []).map(link),
    replacesLinks: (o.replaces || []).map(link),
    href: objectHref(o.name),
  })),
);

export const s4ObjectTotals = memo(() => {
  const list = s4Objects();
  const by = <K extends string>(f: (o: S4ObjView) => K) =>
    list.reduce<Record<string, number>>((a, o) => (a[f(o)] = (a[f(o)] || 0) + 1, a), {});
  return {
    total: list.length,
    byStatus: by((o) => o.status),
    byRisk: by((o) => o.risk),
    byKind: by((o) => o.kind),
    curated: list.filter((o) => o.trust === "curated").length,
    withAbap: list.filter((o) => (o.abap || []).length > 0).length,
    abapNotes: list.reduce((a, o) => a + (o.abap || []).length, 0),
    checklistItems: list.reduce((a, o) => a + (o.checklist || []).length, 0),
    linked: list.filter((o) => o.href).length,
    modules: [...new Set(list.flatMap((o) => o.modules))].sort(),
  };
});

/* -------------------------------------------------------- change topics */

export interface TopicView extends EccS4Topic {
  statusHe: string;
  statusColor: string;
}

export const s4Topics = memo((): TopicView[] =>
  ECC_S4_TOPICS.map((t) => ({ ...t, statusHe: STATUS_HE[t.status], statusColor: STATUS_COLOR[t.status] })),
);

export const s4TopicTotals = memo(() => {
  const list = s4Topics();
  const count = (k: keyof EccS4Topic) => list.filter((t) => (t[k] || "").toString().trim()).length;
  return {
    total: list.length,
    byStatus: list.reduce<Record<string, number>>((a, t) => (a[t.status] = (a[t.status] || 0) + 1, a), {}),
    byArea: list.reduce<Record<string, number>>((a, t) => (a[t.area] = (a[t.area] || 0) + 1, a), {}),
    withFioriCds: count("fioriCds"),
    withSimplification: count("simplification"),
  };
});

/* ---------------------------------------------------------- readiness */

/** dataset.json, read once at build time. Same file, same shape and the same
 *  `computeReadiness` the legacy page used — only the moment of reading moved
 *  from the browser to the build. */
const readinessInput = memo((): RTbl[] => {
  try {
    const p = path.join(process.cwd(), "public", "sap-infrastructure", "dataset.json");
    const raw = JSON.parse(fs.readFileSync(p, "utf8")) as { tables?: RTbl[] };
    return raw.tables || [];
  } catch {
    // A missing dataset must not fabricate a score. The surface renders the
    // absence instead — see s4Readiness().available.
    return [];
  }
});

export const s4Readiness = memo(() => {
  const tables = readinessInput();
  const mods = computeReadiness(tables);
  return {
    available: tables.length > 0,
    tables: tables.length,
    mods,
    overall: overallReadiness(mods),
    bands: mods.reduce<Record<string, number>>((a, m) => (a[m.band] = (a[m.band] || 0) + 1, a), {}),
    highRisk: mods.filter((m) => m.risk === "high").length,
  };
});

/* -------------------------------------------------- the migration cockpit */

export interface MigObjView extends MigObj {
  /** 1-based load wave, derived from `dependsOn` by longest path. */
  wave: number;
  eccLinks: S4Link[];
  dependsHe: { id: string; he: string }[];
  /** Objects that name this one as a dependency. */
  unlocks: { id: string; he: string }[];
}

export const migObjects = memo((): MigObjView[] => {
  const byId = new Map(MIG_OBJECTS.map((o) => [o.id, o]));

  /* Longest-path depth over `dependsOn`. Memoised with a visiting set so a
     malformed cycle in the data degrades to depth 0 rather than hanging the
     build — the dataset has none today, and this keeps it that way. */
  const depth = new Map<string, number>();
  const visiting = new Set<string>();
  const depthOf = (id: string): number => {
    const hit = depth.get(id);
    if (hit !== undefined) return hit;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const o = byId.get(id);
    const d = !o || !o.dependsOn.length ? 0 : 1 + Math.max(...o.dependsOn.map(depthOf));
    visiting.delete(id);
    depth.set(id, d);
    return d;
  };

  const unlockMap = new Map<string, { id: string; he: string }[]>();
  for (const o of MIG_OBJECTS) {
    for (const d of o.dependsOn) {
      const list = unlockMap.get(d) || [];
      list.push({ id: o.id, he: o.he });
      unlockMap.set(d, list);
    }
  }

  return MIG_OBJECTS.map((o) => ({
    ...o,
    wave: depthOf(o.id) + 1,
    eccLinks: o.ecc.map(link),
    dependsHe: o.dependsOn.map((d) => ({ id: d, he: byId.get(d)?.he || d })),
    unlocks: unlockMap.get(o.id) || [],
  }));
});

export const migTotals = memo(() => {
  const list = migObjects();
  const eccRefs = list.flatMap((o) => o.ecc);
  return {
    objects: list.length,
    byCat: list.reduce<Record<string, number>>((a, o) => (a[o.cat] = (a[o.cat] || 0) + 1, a), {}),
    byRisk: list.reduce<Record<string, number>>((a, o) => (a[o.risk] = (a[o.risk] || 0) + 1, a), {}),
    curated: list.filter((o) => o.trust === "curated").length,
    needsVerification: list.filter((o) => o.trust === "needs-verification").length,
    /** 56 references across the 24 objects; 49 of them distinct tables. */
    eccRefs: eccRefs.length,
    eccTables: new Set(eccRefs).size,
    eccLinked: new Set(eccRefs.filter((t) => objectHref(t))).size,
    waves: Math.max(...list.map((o) => o.wave)),
    approaches: APPROACHES.length,
    errors: MIG_ERRORS.length,
    quality: QUALITY_DIMS.length,
    readiness: READINESS.length,
    readinessWeight: READINESS.reduce((a, r) => a + r.w, 0),
    checklist: MIG_CHECKLIST.length,
    modules: [...new Set(list.map((o) => o.module))].sort(),
  };
});

/* ------------------------------------------------------------ transform */

export const transformTotals = memo(() => ({
  arch: ARCH.length,
  archByStatus: ARCH.reduce<Record<string, number>>((a, c) => (a[c.status] = (a[c.status] || 0) + 1, a), {}),
  customCode: CUSTOM_CODE.length,
  integration: INTEGRATION.length,
  testing: TESTING.length,
  cutoverPhases: CUTOVER.length,
  cutoverSteps: CUTOVER.reduce((a, p) => a + p.items.length, 0),
  lessons: LESSONS.length,
}));

/** The transaction codes named inside the cutover and lessons prose are real
 *  monitors; where the project generates a page for one, the view links it. */
export const monitorLinks = memo((): S4Link[] =>
  ["SM37", "ST22", "ODQMON", "COGI", "SE16N", "LTMC", "LTMOM", "SYCM", "ATC"]
    .map((c) => ({ t: c, href: txHref(c) })));
