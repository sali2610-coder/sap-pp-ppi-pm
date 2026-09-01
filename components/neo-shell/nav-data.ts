// Project NEO · Concept D — the single source the signature navigation is
// driven from. Executed on the SERVER at build time by app/neo/layout.tsx, so
// the SAP datasets it imports never reach the browser: only the small, plain
// object it returns crosses into the client rail as props.
//
// HONESTY RULE (ported verbatim from the prototype, and the reason this file
// exists at all): a count is rendered only when the project dataset backs one.
// Every number below is produced by the same helper the corresponding page
// renders from — never a literal, never a doc figure, never an estimate. An
// item with no backed count carries `count: null` and the rail draws an
// explicit em-dash that says so.

import { ALL_TABLES, PM_DATA, PPPI_DATA } from "@/data/sapData";
import {
  cdsViews,
  fioriApps,
  funcs,
  moduleTables,
  overviewStats,
  transactions,
} from "@/lib/module-portal";
import { ZONES, zoneOf, type Zone } from "@/lib/studio-graph";
import { registryStats, registryCodes } from "@/lib/tx-registry";
import { registry as funcRegistry } from "@/lib/bapi-registry";
import { idocMessageTypes } from "@/lib/idoc-intel";
import { CDS_VIEWS } from "@/data/cds-map";
import { FIORI_APPS } from "@/data/fiori/apps";
import { ENHANCEMENTS } from "@/data/enhancements";
import { INCIDENTS } from "@/data/troubleshooting";
import { LIBRARY, LIBRARY_STATS } from "@/data/library";
import { allBookIds } from "@/lib/library/registry";
import { knowledgeData } from "@/components/neo-shell/learn/knowledge-data";
import { BOOKS } from "@/data/library/academy-index";
import { CONCEPTS } from "@/data/concepts";
import { DOMAINS } from "@/data/domains";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { S4_OBJECTS } from "@/data/s4-objects";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { BEST_PRACTICES } from "@/data/best-practices";
import { modelStats } from "./erd/model";
import type { SAPModuleData, SAPTable } from "@/lib/types";
import type {
  HubContent,
  HubStat,
  HubTable,
  ModuleKey,
  NavGroup,
  ObjectContext,
  ObjectMeta,
  Preview,
  SearchRecord,
  ShellData,
} from "./types";

/* ---------------------------------------------------------------- palette */

/** Module hue. Navigation + chrome only — never a data category, never brand red. */
export const MOD_VAR: Record<string, string> = {
  PM: "var(--mod-pm)",
  "PP-PI": "var(--mod-pppi)",
  PP: "var(--mod-pp)",
};
export const modVar = (m?: string) => (m && MOD_VAR[m]) || "var(--ink-3)";

/** Hebrew module names, as they are already written across the product. */
export const MOD_HE: Record<string, string> = { PM: "תחזוקת מפעל", "PP-PI": "תעשיות תהליכיות", PP: "תכנון ייצור" };

// Object-class hue. Visualisation surfaces ONLY (the preview class dots, the
// table lists) — it is a second encoding and must never compete with the module
// hue on the same element.
//
// The classification is not invented here: it is lib/studio-graph's zoneOf(),
// the same functional-zone assignment the Architecture Studio swimlanes already
// use, mapped onto the object palette. Eight zones, seven object tokens —
// "quality" deliberately shares the config hue rather than inventing an eighth.
const ZONE_OBJ: Record<Zone, string> = {
  master: "var(--obj-master)",
  planning: "var(--obj-structure)",
  execution: "var(--obj-transaction)",
  logistics: "var(--obj-movement)",
  status: "var(--obj-status)",
  config: "var(--obj-config)",
  quality: "var(--obj-config)",
  other: "var(--obj-text)",
};
export const objVarFor = (table: string) => ZONE_OBJ[zoneOf(table)];

/* ------------------------------------------------------------ small utils */

const uniq = <T,>(a: T[]) => [...new Set(a)];
const splitTcodes = (s: string) =>
  (s || "")
    .split(/[,\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

const booksFor = (mod: ModuleKey) =>
  LIBRARY.filter((b) => (mod === "PP-PI" ? b.module === "PP-PI" || b.module === "PP" : b.module === mod));

/* --------------------------------------------------------------- the nav */

type Seed = {
  id: string;
  /** THE ONE DISCRIMINATOR IN THIS FILE.
   *
   *  `href` present  ⇒ the item OWNS a route file of its own, and it is
   *                    excluded from NEO_HUBS so `app/neo/[hub]` does not also
   *                    generate a page at the same path (a duplicate path fails
   *                    the static export) or, worse, generate a Stage-1 stub at
   *                    `/neo/<id>/` that nothing links to.
   *  `href` absent   ⇒ `app/neo/[hub]` generates the destination.
   *
   *  Before this rule existed, an `href` override still left the id in
   *  NEO_HUBS. That produced two real defects the pre-production audit caught:
   *  `/neo/library/` was built as a placeholder shelf reporting 10 books while
   *  the real shelf at `/neo/books/` had 11, and `/neo/domain-model/` was built
   *  as the only NEO route in the product with no inbound link at all. Both
   *  were one missing filter, not two content problems. */
  href?: string;
  label: string;
  icon: string;
  count: number | null;
  countLabel: string;
  mod?: ModuleKey;
};

/** Group order and labels mirror components/knowledge-sidebar.tsx, so the new
 *  rail is the same information architecture rather than a second, divergent
 *  one. Hrefs are re-pointed into the /neo namespace; every destination is a
 *  real generated page (app/neo/[hub]/page.tsx). */
function seeds(): { id: string; label: string; items: Seed[] }[] {
  const pm = overviewStats(PM_DATA);
  const pp = overviewStats(PPPI_DATA);
  return [
    {
      id: "modules",
      label: "מודולים",
      items: [
        { id: "pm", label: "PM · תחזוקת מפעל", icon: "Wrench", count: pm.tables, countLabel: "טבלאות", mod: "PM" },
        { id: "pp-pi", label: "PP-PI · תעשיות תהליכיות", icon: "FlaskConical", count: pp.tables, countLabel: "טבלאות", mod: "PP-PI" },
        /* THE COUNT AND THE DESTINATION NOW AGREE.
           This item has always counted DOMAINS — 39 business domains — while
           pointing at /neo/erd/, which lists tables. A reader who clicked
           "39 תחומים" arrived at a table graph and never reached a single one
           of the 39. The domains have their own hub now, and the ER model keeps
           its own entry below, where a data model belongs. */
        { id: "domain-model", href: "/neo/domain-model/", label: "תחומים עסקיים", icon: "Boxes", count: DOMAINS.length, countLabel: "תחומים" },
      ],
    },
    {
      /* THE MIGRATION GROUP. Project NEO is an ECC→S/4HANA platform, and until
         now its three S/4 surfaces were reachable from nothing at all. */
      id: "s4",
      label: "המעבר ל-S/4HANA",
      items: [
        { id: "s4hana", href: "/neo/s4hana/", label: "מרכז S/4HANA", icon: "Rocket", count: S4_OBJECTS.length, countLabel: "אובייקטים" },
        { id: "s4-readiness", href: "/neo/s4-readiness/", label: "מוכנות ל-S/4HANA", icon: "Gauge", count: ECC_S4_TOPICS.length, countLabel: "נושאי שינוי" },
        { id: "migration-cockpit", href: "/neo/migration-cockpit/", label: "קוקפיט המעבר", icon: "Truck", count: MIG_OBJECTS.length, countLabel: "אובייקטי מיגרציה" },
      ],
    },
    {
      id: "reference",
      label: "עיון · Reference",
      items: [
        { id: "tables", label: "טבלאות SAP", icon: "Table", count: ALL_TABLES.length, countLabel: "טבלאות" },
        { id: "erd", href: "/neo/erd/", label: "מודל הנתונים · ERD", icon: "GitBranch", count: modelStats().edges, countLabel: "קשרים" },
        { id: "transactions", label: "טרנזקציות", icon: "Terminal", count: registryStats().total, countLabel: "טרנזקציות" },
        { id: "bapi", label: "BAPI ו-FM", icon: "Plug", count: funcRegistry().length, countLabel: "אובייקטי פונקציה" },
        { id: "idoc", label: "IDocs", icon: "Cable", count: idocMessageTypes().length, countLabel: "סוגי הודעה" },
        { id: "cds", label: "CDS Views", icon: "Sigma", count: CDS_VIEWS.length, countLabel: "תצוגות CDS" },
        { id: "fiori-apps", label: "יישומי Fiori", icon: "LayoutGrid", count: FIORI_APPS.length, countLabel: "יישומים" },
        { id: "enhancements", label: "הרחבות", icon: "Puzzle", count: ENHANCEMENTS.length, countLabel: "טכניקות" },
      ],
    },
    {
      id: "library",
      label: "ספרייה",
      items: [
        /* COUNTED FROM THE SHELF NEO ACTUALLY SHOWS.
           LIBRARY_STATS comes from data/library.ts, the registry the FROZEN
           production /library/ route reads, and it still describes 10 books.
           The NEO shelf reads data/books/** and renders 11 — so the sidebar said
           10 while /neo/books/ one click away said 11. data/library.ts is not
           touched; the count is taken from the same registry the shelf counts.
           allBookIds() is used rather than booksData(): books-data.ts imports
           this file, so calling it here would close an import cycle. */
        /* POINTS AT THE REAL SHELF, exactly as domain-model points at /neo/erd/.
           Without an explicit href this fell back to /neo/${id}/ = /neo/library/,
           the Stage-1 hub placeholder — so the sidebar's library link bypassed
           the built shelf, and on /neo/books/ NOTHING in the nav matched, which
           left the surface with no active state and no section hue. */
        { id: "library", href: "/neo/books/", label: "ספריית SAP", icon: "Library", count: allBookIds().length, countLabel: "ספרים" },
        { id: "ai", label: "שאל את הספרייה", icon: "Sparkles", count: null, countLabel: "" },
      ],
    },
    {
      id: "knowledge",
      label: "ידע ולמידה",
      items: [
        /* ONE Knowledge Center, and the count is the REAL unified total.
           The rail used to carry two: "מרכז ידע" (33 concepts) here and
           "מרכזי ידע" (89 work topics) under כלים. Measured before merging:
           zero shared slugs and zero shared titles — they were never duplicates,
           they answer different questions. Both bodies live at /neo/knowledge/
           now, and this number is counted from the two real arrays rather than
           written down, so it cannot drift from what the page lists. */
        { id: "knowledge", label: "מרכז הידע", icon: "BrainCircuit", count: knowledgeData().totals.all, countLabel: "רשומות" },
        /* Owns its route (href ⇒ excluded from NEO_HUBS), like /neo/erd/ and
           /neo/books/. The count is the registry's real length. */
        { id: "best-practices", href: "/neo/best-practices/", label: "שיטות עבודה מומלצות", icon: "ClipboardCheck", count: BEST_PRACTICES.length, countLabel: "שיטות" },
        { id: "academy", label: "SAP Academy", icon: "GraduationCap", count: BOOKS.length, countLabel: "ספרי לימוד" },
        { id: "incidents", label: "תקלות", icon: "AlertTriangle", count: INCIDENTS.length, countLabel: "תקלות" },
        { id: "certification", label: "הסמכה", icon: "Award", count: null, countLabel: "" },
      ],
    },
    { id: "tools", label: "כלים", items: [
      /* NO second Knowledge Center here. The eleven legacy centre routes are
         still built and still reachable — /neo/centers/ and every family and
         topic under it — they are simply reached from the one Knowledge Center
         under ידע ולמידה instead of from a second rail entry that showed a
         different number for a different dataset under a near-identical name. */
      { id: "studio", label: "Architecture Studio", icon: "Compass", count: null, countLabel: "" },
    ] },
    { id: "assistant", label: "עוזר SAP", items: [{ id: "chat", label: "NEO AI", icon: "MessageSquare", count: null, countLabel: "" }] },
  ];
}

/** Every navigation destination `app/neo/[hub]` is responsible for, in rail
 *  order. Items that own a route file are filtered out by the `href` rule
 *  documented on Seed — generating them here would either collide with the real
 *  page or ship an unlinked stub beside it.
 *
 *  A link still cannot outrun a page: `navGroups()` derives every href from
 *  this same list, and scripts/crawl-dead-links.mjs fails the build on the
 *  first internal href in out/ with nothing behind it. */
export const NEO_HUBS: string[] = seeds().flatMap((g) =>
  g.items.filter((i) => !i.href).map((i) => i.id),
);

export const HUB_META = (): Record<string, { label: string; group: string; icon: string; mod?: ModuleKey }> => {
  const out: Record<string, { label: string; group: string; icon: string; mod?: ModuleKey }> = {};
  for (const g of seeds()) for (const it of g.items) out[it.id] = { label: it.label, group: g.label, icon: it.icon, mod: it.mod };
  return out;
};

function navGroups(): NavGroup[] {
  return seeds().map((g) => ({
    id: g.id,
    label: g.label,
    items: g.items.map((it) => ({
      id: it.id,
      // Usually the id IS the route. `domain-model` is the exception: it is a
      // hub id, so `app/neo/[hub]` already claims /neo/domain-model/ and a
      // static page there would make the export fail with conflicting paths.
      // The real data model lives at /neo/erd/, so the item points there rather
      // than at the Stage-1 placeholder the hub route would otherwise serve.
      href: it.href ?? `/neo/${it.id}/`,
      label: it.label,
      icon: it.icon,
      count: it.count,
      countLabel: it.countLabel,
      mod: it.mod,
      group: g.label,
    })),
  }));
}

/* ----------------------------------------------------------- the previews */

function modulePreview(mod: ModuleKey): Preview {
  const m: SAPModuleData = mod === "PM" ? PM_DATA : PPPI_DATA;
  const st = overviewStats(m);
  const top = [...moduleTables(m)].sort((a, b) => b.fields.length - a.fields.length).slice(0, 5);
  const bk = booksFor(mod);
  return {
    kind: "module",
    label: mod === "PM" ? "PM · תחזוקת מפעל" : "PP-PI · תעשיות תהליכיות",
    he: MOD_HE[mod],
    mod,
    nums: [
      { value: st.tables, label: "טבלאות" },
      { value: st.transactions, label: "טרנזקציות" },
      { value: st.topics, label: "נושאים" },
      { value: bk.length, label: "ספרים" },
    ],
    tables: top.map((t) => ({
      name: t.tableName,
      he: t.descriptionHe || t.descriptionEn || "",
      fields: t.fields.length,
      obj: objVarFor(t.tableName),
    })),
    book: bk[0]?.titleHe || bk[0]?.title || null,
  };
}

function previews(): Record<string, Preview> {
  const meta = HUB_META();
  const seedList = seeds().flatMap((g) => g.items.map((i) => ({ ...i, group: g.label })));
  const out: Record<string, Preview> = {};

  const sampleFor = (id: string): string[] => {
    switch (id) {
      case "domain-model": return DOMAINS.slice(0, 6).map((d) => d.he);
      case "tables": return ALL_TABLES.slice(0, 6).map((t) => t.tableName);
      case "transactions": return registryCodes().slice(0, 6);
      case "bapi": return funcRegistry().slice(0, 5).map((f) => f.technicalName);
      case "idoc": return idocMessageTypes();
      case "cds": return CDS_VIEWS.slice(0, 5).map((v) => v.view);
      case "fiori-apps": return FIORI_APPS.slice(0, 5).map((a) => `${a.id} · ${a.he}`);
      case "enhancements": return ENHANCEMENTS.slice(0, 5).map((e) => e.he);
      case "library": return LIBRARY.slice(0, 4).map((b) => b.titleHe || b.title);
      case "knowledge": return CONCEPTS.slice(0, 5).map((c) => c.he);
      case "academy": return BOOKS.slice(0, 4).map((b) => b.titleHe);
      case "incidents": return INCIDENTS.slice(0, 4).map((i) => i.he);
      case "best-practices": return BEST_PRACTICES.slice(0, 5).map((b) => b.he);
      default: return [];
    }
  };

  for (const s of seedList) {
    if (s.mod) { out[s.id] = modulePreview(s.mod); continue; }
    out[s.id] = {
      kind: "plain",
      label: s.label,
      group: meta[s.id].group,
      count: s.count,
      countLabel: s.countLabel || "רשומות",
      sample: sampleFor(s.id),
    };
  }
  return out;
}

/* ---------------------------------------------- objects, context, search */

type Occ = { table: SAPTable; mod: ModuleKey };

function occurrences(): Map<string, Occ[]> {
  const map = new Map<string, Occ[]>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      const list = map.get(t.tableName) || [];
      list.push({ table: t, mod: m.module as ModuleKey });
      map.set(t.tableName, list);
    }
  }
  return map;
}

function objectsAndContexts(): { objects: Record<string, ObjectMeta>; contexts: Record<string, ObjectContext>; defaultContext: string } {
  const objects: Record<string, ObjectMeta> = {};
  const contexts: Record<string, ObjectContext> = {};
  let best = "";
  let bestFields = -1;

  for (const [name, occ] of occurrences()) {
    const mods = uniq(occ.map((o) => o.mod));
    const lead = occ[0].table;
    const fields = Math.max(...occ.map((o) => o.table.fields.length));
    objects[name] = {
      name,
      he: lead.descriptionHe || lead.descriptionEn || "",
      mods,
      fields,
      obj: objVarFor(name),
      zone: zoneOf(name),
    };
    if (fields > bestFields) { bestFields = fields; best = name; }

    const rel = uniq(occ.flatMap((o) => o.table.relations || []).map((r) => JSON.stringify([r.table, r.card || "", r.join || ""])))
      .slice(0, 5)
      .map((s) => { const [table, card, join] = JSON.parse(s) as string[]; return { table, card, join: join.replace(/\s+/g, " ").trim().slice(0, 140) }; });

    contexts[name] = {
      name,
      he: objects[name].he,
      mods,
      shared: mods.length > 1,
      contexts: occ.map((o) => ({ module: o.mod, topic: o.table.topicTitle, tcodes: splitTcodes(o.table.tcodes).slice(0, 4).join(" · ") })),
      tcodes: uniq(occ.flatMap((o) => splitTcodes(o.table.tcodes))).slice(0, 8),
      relations: rel,
    };
  }
  return { objects, contexts, defaultContext: best };
}

/** The dictionary the rail search reaches. Bounded on purpose: the rail is a
 *  navigation surface, and the last row escalates to the full command surface
 *  rather than pretending to be it. Every record is a real project record. */
function searchIndex(objects: Record<string, ObjectMeta>): SearchRecord[] {
  const out: SearchRecord[] = [];

  for (const o of Object.values(objects)) {
    out.push({ k: "table", t: o.name, s: o.he, m: true, href: "/neo/tables/", obj: o.name });
  }

  const moduleCodes = uniq([...transactions(PM_DATA), ...transactions(PPPI_DATA)].map((t) => t.code));
  for (const code of moduleCodes) out.push({ k: "tcode", t: code, s: "טרנזקציית SAP בתיעוד הפרויקט", m: true, href: "/neo/transactions/" });

  const seenFn = new Set<string>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      for (const [raw, he] of t.funcs || []) {
        const nm = (raw || "").trim();
        if (!nm || seenFn.has(nm)) continue;
        seenFn.add(nm);
        out.push({ k: "func", t: nm, s: he || "אובייקט פונקציה", m: true, href: "/neo/bapi/" });
      }
    }
  }

  for (const v of CDS_VIEWS) out.push({ k: "cds", t: v.view, s: v.he, m: true, href: "/neo/cds/" });
  for (const a of FIORI_APPS) out.push({ k: "fiori", t: a.id, s: a.he || a.name, m: true, href: "/neo/fiori-apps/" });
  for (const b of LIBRARY) out.push({ k: "book", t: b.titleHe || b.title, s: b.title, m: false, href: "/neo/books/" });
  for (const i of INCIDENTS) out.push({ k: "incident", t: i.he, s: i.symptom.slice(0, 90), m: false, href: "/neo/incidents/" });

  return out;
}

/* ------------------------------------------------------------------ build */

let cached: ShellData | null = null;

export function shellData(): ShellData {
  if (cached) return cached;
  const { objects, contexts, defaultContext } = objectsAndContexts();
  const groups = navGroups();
  cached = {
    groups,
    navItemCount: groups.reduce((a, g) => a + g.items.length, 0),
    previews: previews(),
    objects,
    contexts,
    search: searchIndex(objects),
    defaultContext,
  };
  return cached;
}

/* ------------------------------ per-hub page content (server, build time) */

const hubTables = (m: SAPModuleData, n: number): HubTable[] =>
  [...moduleTables(m)]
    .sort((a, b) => b.fields.length - a.fields.length)
    .slice(0, n)
    .map((t) => ({
      name: t.tableName,
      he: t.descriptionHe || t.descriptionEn || "",
      fields: t.fields.length,
      obj: objVarFor(t.tableName),
      tcode: splitTcodes(t.tcodes)[0] || "",
    }));

export function hubContent(id: string): HubContent {
  const meta = HUB_META()[id];
  const base: HubContent = { id, label: meta.label, group: meta.group, mod: meta.mod, lede: "", stats: [], tables: [], list: [], listTitle: "" };

  if (meta.mod) {
    const m = meta.mod === "PM" ? PM_DATA : PPPI_DATA;
    const st = overviewStats(m);
    return {
      ...base,
      lede:
        meta.mod === "PM"
          ? "תחזוקת מפעל: ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה. כל מספר בעמוד נגזר מהתיעוד הטכני של הפרויקט."
          : "תעשיות תהליכיות: מתכוני אב, משאבים, הזמנות תהליך ואישורים. כל מספר בעמוד נגזר מהתיעוד הטכני של הפרויקט.",
      stats: [
        { value: st.tables, label: "טבלאות ייחודיות" },
        { value: st.fields, label: "שדות מתועדים" },
        { value: st.transactions, label: "טרנזקציות" },
        { value: st.bapis, label: "BAPI ו-FM" },
        { value: st.cds, label: "CDS Views" },
        { value: st.fiori, label: "יישומי Fiori" },
      ],
      tables: hubTables(m, 12),
      listTitle: "נושאים במודול",
      list: m.topics.map((tp) => ({ t: tp.title, s: `${tp.tables.length} טבלאות`, m: false })),
    };
  }

  switch (id) {
    case "tables": {
      const all = [...ALL_TABLES].sort((a, b) => b.fields.length - a.fields.length);
      return {
        ...base,
        lede: "קטלוג טבלאות SAP המלא של הפרויקט, מסודר לפי עומק התיעוד. בחירת שורה טוענת את ההקשר המלא שלה למדף ההקשר שבניווט.",
        stats: [
          { value: ALL_TABLES.length, label: "טבלאות" },
          { value: ALL_TABLES.reduce((a, t) => a + t.fields.length, 0), label: "שדות" },
          { value: overviewStats(PM_DATA).tables, label: "PM" },
          { value: overviewStats(PPPI_DATA).tables, label: "PP-PI" },
        ],
        tables: all.slice(0, 40).map((t) => ({
          name: t.tableName,
          he: t.descriptionHe || t.descriptionEn || "",
          fields: t.fields.length,
          obj: objVarFor(t.tableName),
          tcode: splitTcodes(t.tcodes)[0] || "",
        })),
        listTitle: "",
        list: [],
      };
    }
    case "transactions": {
      const s = registryStats();
      return {
        ...base,
        lede: "קטלוג הטרנזקציות של הפרויקט. לחלק מהטרנזקציות קיים תיעוד מלא; השאר רשומות כרשומות בסיסיות, וההבחנה מסומנת בכל רשומה.",
        stats: [
          { value: s.total, label: "סה״כ" },
          { value: s.deep, label: "מתועדות לעומק" },
          { value: s.light, label: "רשומות בסיסיות" },
        ],
        tables: [],
        listTitle: "לפי מודול",
        list: Object.entries(s.byModule)
          .sort((a, b) => b[1] - a[1])
          .map(([k, v]) => ({ t: k, s: `${v} טרנזקציות`, m: true })),
      };
    }
    case "bapi": {
      const r = funcRegistry();
      return {
        ...base,
        lede: "אובייקטי פונקציה, BAPI ו-FM, כפי שהם רשומים בקטלוג הפרויקט.",
        stats: [{ value: r.length, label: "אובייקטים" }],
        tables: [],
        listTitle: "מדגם מהקטלוג",
        list: r.slice(0, 24).map((f) => ({ t: f.technicalName, s: f.shortDescriptionHe || f.shortDescriptionEn || "", m: true })),
      };
    }
    case "idoc": {
      const types = idocMessageTypes();
      return {
        ...base,
        lede: "סוגי הודעת IDoc המתועדים בנתוני PM ו-PP-PI. המספר נספר מהנתונים כפי שהם.",
        stats: [{ value: types.length, label: "סוגי הודעה" }],
        tables: [],
        listTitle: "סוגי הודעה",
        list: types.map((t) => ({ t, s: "סוג הודעת IDoc בנתוני הפרויקט", m: true })),
      };
    }
    case "cds":
      return {
        ...base,
        lede: "מיפוי טבלה קלאסית → תצוגת CDS ב-S/4HANA, לפי תיעוד הפרויקט.",
        stats: [{ value: CDS_VIEWS.length, label: "תצוגות CDS" }],
        tables: [],
        listTitle: "תצוגות CDS",
        list: CDS_VIEWS.slice(0, 24).map((v) => ({ t: v.view, s: `${v.he} · ${v.tables.join(", ")}`, m: true })),
      };
    case "fiori-apps":
      return {
        ...base,
        lede: "יישומי Fiori עם עמוד מלא בפרויקט. אינדקס המטא-דאטה הרחב יותר של יישומי Fiori נספר בנפרד.",
        stats: [{ value: FIORI_APPS.length, label: "עמודים מלאים" }],
        tables: [],
        listTitle: "יישומים",
        list: FIORI_APPS.map((a) => ({ t: a.id, s: `${a.he} · ${a.module}`, m: true })),
      };
    case "enhancements":
      return {
        ...base,
        lede: "טכניקות ההרחבה של SAP: מ-User Exit ועד BAdI ו-Extension Points.",
        stats: [{ value: ENHANCEMENTS.length, label: "טכניקות" }],
        tables: [],
        listTitle: "טכניקות",
        list: ENHANCEMENTS.map((e) => ({ t: e.title, s: e.he, m: false })),
      };
    case "library":
      return {
        ...base,
        lede: "ספריית SAP: אינדקס מבני של המדריכים הרשמיים.",
        stats: [
          { value: LIBRARY_STATS.books, label: "ספרים" },
          { value: LIBRARY_STATS.chapters, label: "פרקים" },
          { value: LIBRARY_STATS.pages, label: "עמודים" },
        ],
        tables: [],
        listTitle: "ספרים",
        list: LIBRARY.map((b) => ({ t: b.titleHe || b.title, s: `${b.publisher} · ${b.pages} עמודים`, m: false })),
      };
    case "knowledge":
      return {
        ...base,
        lede: "מרכז הידע: הסבר עסקי וטכני לכל מונח, כולל ההבדל בין SAP ECC ל-S/4HANA.",
        stats: [{ value: CONCEPTS.length, label: "מושגים" }],
        tables: [],
        listTitle: "מושגים",
        list: CONCEPTS.slice(0, 24).map((c) => ({ t: c.title, s: c.he, m: false })),
      };
    case "academy":
      return {
        ...base,
        lede: "ספרי הלימוד של האקדמיה: כל אחד עם אינדקס טרנזקציות, טבלאות ומונחים משלו.",
        stats: [{ value: BOOKS.length, label: "ספרי לימוד" }],
        tables: [],
        listTitle: "ספרים",
        list: BOOKS.map((b) => ({ t: b.titleHe, s: `${b.module} · ${b.titleEn}`, m: false })),
      };
    case "incidents":
      return {
        ...base,
        lede: "קטלוג התקלות: תסמין, סיבת שורש, טרנזקציות אבחון וצעדי תיקון.",
        stats: [{ value: INCIDENTS.length, label: "תקלות" }],
        tables: [],
        listTitle: "תקלות",
        list: INCIDENTS.slice(0, 24).map((i) => ({ t: i.he, s: i.symptom.slice(0, 110), m: false })),
      };
    case "domain-model":
      return {
        ...base,
        lede: "התחומים הפונקציונליים של PM ו-PP-PI: הזרימה העסקית, הטבלאות והטרנזקציות של כל תחום.",
        stats: [
          { value: DOMAINS.length, label: "תחומים" },
          { value: DOMAINS.filter((d) => d.module === "PM").length, label: "PM" },
          { value: DOMAINS.filter((d) => d.module === "PP-PI").length, label: "PP-PI" },
        ],
        tables: [],
        listTitle: "תחומים",
        list: DOMAINS.map((d) => ({ t: d.he, s: `${d.module} · ${d.tables.length} טבלאות`, m: false })),
      };
    default:
      // ai · certification · studio · chat — real destinations in the product,
      // with no dataset-backed count. Stage 1 says so instead of inventing one.
      return {
        ...base,
        lede: "ליעד זה אין ספירה מגובה בנתוני הפרויקט.",
        stats: [],
        tables: [],
        listTitle: "",
        list: [],
      };
  }
}

export { funcs, cdsViews, fioriApps };

/* -------------------------------------------- Stage-1 landing (build time) */

export interface LandingModule {
  mod: ModuleKey;
  label: string;
  he: string;
  href: string;
  stats: HubStat[];
}

export interface LandingContent {
  stats: HubStat[];
  modules: LandingModule[];
  featured: HubTable[];
  /** Object-class legend. Labels are lib/studio-graph's real functional zones,
   *  so the legend explains an existing classification instead of a new one. */
  legend: { he: string; obj: string }[];
}

export function landingContent(): LandingContent {
  const pm = overviewStats(PM_DATA);
  const pp = overviewStats(PPPI_DATA);
  const featured = [...ALL_TABLES]
    .sort((a, b) => b.fields.length - a.fields.length)
    .slice(0, 10)
    .map((t) => ({
      name: t.tableName,
      he: t.descriptionHe || t.descriptionEn || "",
      fields: t.fields.length,
      obj: objVarFor(t.tableName),
      tcode: splitTcodes(t.tcodes)[0] || "",
    }));

  const legendSeen = new Set<string>();
  const legend: { he: string; obj: string }[] = [];
  for (const z of ZONES) {
    const v = ZONE_OBJ[z.id];
    if (legendSeen.has(v)) continue;
    legendSeen.add(v);
    legend.push({ he: z.he, obj: v });
  }

  return {
    stats: [
      { value: ALL_TABLES.length, label: "טבלאות SAP" },
      { value: pm.fields + pp.fields, label: "שדות מתועדים" },
      { value: registryStats().total, label: "טרנזקציות בקטלוג" },
      { value: LIBRARY_STATS.books, label: "ספרים בספרייה" },
    ],
    modules: [
      {
        mod: "PM",
        label: "PM · תחזוקת מפעל",
        he: MOD_HE.PM,
        href: "/neo/pm/",
        stats: [
          { value: pm.tables, label: "טבלאות" },
          { value: pm.transactions, label: "טרנזקציות" },
          { value: pm.bapis, label: "BAPI ו-FM" },
        ],
      },
      {
        mod: "PP-PI",
        label: "PP-PI · תעשיות תהליכיות",
        he: MOD_HE["PP-PI"],
        href: "/neo/pp-pi/",
        stats: [
          { value: pp.tables, label: "טבלאות" },
          { value: pp.transactions, label: "טרנזקציות" },
          { value: pp.bapis, label: "BAPI ו-FM" },
        ],
      },
    ],
    featured,
    legend,
  };
}
