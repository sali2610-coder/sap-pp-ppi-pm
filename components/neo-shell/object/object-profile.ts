// Project NEO · the object PROFILE — the consultant layer of an object page.
//
// SERVER ONLY, build time. The legacy object page (components/object-workspace
// + components/object-expert) carried a second layer next to the dictionary
// record: what the object is for, who creates and reads it, its lifecycle,
// consultant notes, QA checks and knowledge questions. This file reads that
// layer out of the SAME modules the legacy page read — lib/knowledge,
// data/knowledge/object-intel, data/consultant-notes, data/knowledge/interview,
// data/troubleshooting, data/exits, lib/knowledge-graph, lib/object-graph — so
// nothing here is new content. What the object page already prints from the
// dictionary (relations, T-Codes, BAPIs, CDS views, Fiori apps, PK fields) is
// not read twice.
//
// WHAT THIS FILE REFUSES TO DO
//   · write a sentence of its own about SAP. The one assembled sentence, the
//     summary, joins dataset values only, and the page says so beside it.
//   · repeat a claim the legacy summary derived from an absence. It said
//     "S/4HANA: נשמר ללא שינוי מהותי" for every table with no CDS view and no
//     alternative table, and for 18 of those blueprint tables the project's own
//     resolver (lib/s4) rates the move medium risk. The clause now follows the
//     resolver. "הוחלף ב-AFIH (זהה)" — an identical table is no replacement —
//     is printed as the blueprint's own alternative-table value instead.
//   · link anywhere the project generates no page (ref-links decides).

import { ALL_TABLES } from "@/data/sapData";
import type { SAPRelation, SAPTable } from "@/lib/types";
import { tableByName, kgraph } from "@/lib/knowledge-graph";
import { hrBwTableByName, HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { knowledgeFor, IMPORTANCE_HE, TRUST_NOTE } from "@/lib/knowledge";
import { objectIntelExt, deriveActors } from "@/lib/object-intel-ext";
import { objectIntel } from "@/lib/data";
import { objectConnections } from "@/lib/object-graph";
import { verdictOf } from "../data/s4-verdict";
import { STATUS_META } from "@/lib/status-meta";
import { CONSULTANT_NOTES } from "@/data/consultant-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { cdsForTable } from "@/data/cds-map";
import { interviewFor, type Level } from "@/data/knowledge/interview";
import { EXITS } from "@/data/exits";
import { objectHref } from "../reference/ref-links";
import { moduleRows } from "../erd/model";
import { splitTcodes } from "@/lib/tcode-split";

/* ------------------------------------------------------------------ types */

/** An identifier, and its NEO page when the project generates one. */
export interface PLink {
  t: string;
  href: string | null;
  /** Kind label or gloss, when the source carries one. */
  sub?: string;
}

export interface PRel extends PLink {
  card: string;
  desc: string;
}

export interface PConn {
  label: string;
  sub: string;
}

export interface ObjectProfile {
  name: string;
  /** One sentence assembled from dataset values (see summaryOf). */
  summary: string;
  usage: {
    role: string;
    why: string;
    whenUsed: string;
    step: string;
    importance: string;
    /** The curated ECC ↔ S/4 delta, "" when the entry holds none. */
    s4: string;
    /** The entry's own trust flag, in the project's words. */
    trust: string;
  } | null;
  /** The legacy page's provenance line for this layer, verbatim. */
  provenance: string;
  /** The blueprint topic(s) the object is documented under. */
  topics: string[];
  /** Fiori apps named on a dictionary row the record section does not show
   *  (erd/model keeps one row per module, so a table documented twice in the
   *  same module — QMEL in PM — loses its second row's app there). */
  fioriMore: string[];
  scenarios: string[];
  actors: { creates: string[]; reads: string[]; updates: string[]; specific: boolean };
  /** What feeds the object and what reads it: the modelled graph for a
   *  blueprint table, the registry's own relations for an HR/BW object. */
  feeds: PLink[];
  consumers: PLink[];
  /** null for a plain table row: its lifecycle is a generic template, not data. */
  lifecycle: { label: string; steps: string[]; note: string } | null;
  /** Enhancements matched to the object exactly as the legacy page matched them. */
  exits: PLink[];
  /** `integ` carries the consultant notes' integration points too, so they
   *  are printed once, here. */
  qa: { mustExist: PRel[]; integ: string[]; regression: string[] };
  interview: { level: Level; q: string; a: string }[];
  consult: { mistakes: string[]; debug: string[]; fnNotes: string[]; techNotes: string[]; verify: boolean } | null;
  /** Object-specific troubleshooting tips the legacy page carried for four
   *  objects. The generic fallback it printed for every other object was not
   *  data and is not carried. */
  tips: string[];
  conn: { s4: PConn | null; migration: PConn[]; bw: PConn[] };
}

/* ---------------------------------------------------------------- helpers */

const uniq = <T,>(a: T[]) => [...new Set(a)];
const clean = (s?: string | null) => (s || "").trim();

/** The legacy page's T-Code splitter (components/object-expert.tsx). */
const splitTc = (s: string) => uniq(splitTcodes(s));

const obj = (t: string): PLink => ({ t, href: objectHref(t) });

/* Lifecycle by object kind, verbatim from components/object-expert.tsx: the
   standard SAP system statuses of orders and notifications, and the stages of
   a master record. The fourth kind, a plain table row, was one template on
   every remaining page and is not data. */
const ORDER = ["AUFK", "AFKO", "AFIH", "AFPO", "AFVC", "AFVV", "AFRU"];
const NOTIF = ["QMEL", "QMFE", "QMUR", "QMSM"];
const MASTER = ["EQUI", "IFLOT", "ILOA", "EQUZ", "MARA", "MARC", "MAST", "PLKO", "PLPO", "MKAL", "MCH1", "CRHD", "STKO"];
function lifecycleFor(n: string): ObjectProfile["lifecycle"] {
  if (ORDER.includes(n)) return { label: "פקודה · Order", steps: ["נוצרה · CRTD", "שוחררה · REL", "אושרה · CNF", "הושלמה טכנית · TECO", "נסגרה · CLSD", "אורכבה"], note: "מבוסס סטטוסי-מערכת סטנדרטיים של SAP (I-status)." };
  if (NOTIF.includes(n)) return { label: "הודעה · Notification", steps: ["נוצרה · OSNO", "בטיפול · NOPR", "הושלמה · NOCO", "נסגרה · DLFL"], note: "מבוסס סטטוסי הודעת SAP." };
  if (MASTER.includes(n)) return { label: "נתוני אב · Master Data", steps: ["נוצר", "שונה", "פעיל · בשימוש", "סומן למחיקה · DLFL", "אורכב"], note: "מחזור חיים טיפוסי לרשומת נתוני-אב." };
  return null;
}

/* The four objects the legacy page held specific tips for, verbatim
   (components/object-workspace.tsx, TROUBLE). */
const TIPS: Record<string, string[]> = {
  IFLOT: ["מבנה מיקום טכני שגוי — בדוק את מבנה ה-Edit Mask ב-SPRO (Functional Location Structure).", "שדה ILOA חסר — נתוני המיקום/חשבונאות מנוהלים בטבלת ILOA המקושרת.", "סטטוס מערכת — בדוק פרופיל סטטוס (BS02) אם פעולות חסומות."],
  EQUI: ["ציוד לא מופיע ב-IE03 — בדוק קטגוריית ציוד והרשאות.", "קישור ציוד↔מיקום טכני דרך ILOA/EQUI; שגיאת install date → IE02.", "שדה EQART (סוג ציוד) מנוהל ב-OIM0."],
  AFKO: ["כותרת פקודת ייצור — שגיאות סטטוס נפוצות נובעות מ-CRTD/REL.", "AFKO↔AFPO↔AFVC: בעיית קישור פריט/פעולה → בדוק MAPL/PLPO.", "Backflush/אישור → בדוק COGI (MF47) לתנועות תקועות."],
  CRHD: ["מרכז עבודה לא נמצא בפקודה — בדוק קישור CRHD↔PLPO ושיוך מרכז עלות.", "קיבולת — בדוק CRCA/KAKO.", "מרכז עבודה חסום → CR02."],
};

/** An alternative-table value that names no successor ("TQ80 (זהה)",
 *  "identical", the table itself), read as lib/module-portal eccS4 reads it. */
const namesSuccessor = (name: string, alt: string) =>
  !!alt && alt !== "—" && !/(זהה|identical|unchanged|ללא שינוי|\(=\))/i.test(alt) &&
  alt.replace(/\s*\(.*?\)\s*/g, "").trim().toUpperCase() !== name.toUpperCase();

/** The S/4HANA clause of the summary. A blueprint table's clause states the
 *  verdict the page's header states (components/neo-shell/data/s4-verdict.ts),
 *  then the dataset facts beside it: the CDS views that read it, a successor
 *  table the blueprint names. Built from the risk resolver and the raw
 *  alternative-table value instead, it said "נשמר ללא שינוי מהותי" under a
 *  header reading "נדרש אימות נוסף" on 11 tables. An HR/BW object's clause
 *  follows its registry note. */
function s4Clause(name: string, t: SAPTable, blueprint: boolean): string {
  const cds = cdsForTable(name).map((v) => v.view);
  const alt = clean(t.s4AltTable);
  if (!blueprint) {
    if (cds.length) return `S/4HANA: נקרא דרך CDS ${cds.join(", ")}`;
    if (alt && alt !== "—") return `S/4HANA: חלופה לפי הקטלוג: ${alt}`;
    const note = clean(t.s4Note).replace(/\.$/, "");
    return note ? `S/4HANA: ${note}` : "S/4HANA: אין בקטלוג הערת מעבר";
  }
  const v = verdictOf(name);
  const facts = [
    cds.length ? `נקרא דרך CDS ${cds.join(", ")}` : "",
    namesSuccessor(name, alt) ? `טבלה חלופית לפי התיעוד: ${alt}` : "",
  ].filter(Boolean);
  const head = `S/4HANA: ${v ? v.label : "אין במאגר הכרעה לגבי המעבר"}`;
  return facts.length ? `${head} (${facts.join("; ")})` : head;
}

/** The summary sentence. Blueprint: the legacy page's own sentence, built from
 *  the same values. HR/BW: the legacy sentence counted the object's links in
 *  the BLUEPRINT graph, where it does not exist ("רדיוס השפעה 0" beside two
 *  documented relations), and printed a migration status the adapter
 *  hard-codes; both give way to what the HR/BW registry records. */
function summaryOf(name: string, t: SAPTable, mods: string[], fieldsN: number, blueprint: boolean): string {
  const head = `${name} (${t.descriptionHe || t.descriptionEn}) — אובייקט ${mods.join(" ו-")} עם ${fieldsN} שדות. ${s4Clause(name, t, blueprint)}.`;
  if (!blueprint) {
    const n = t.relations.length;
    const rel = n ? `${n} ${n === 1 ? "קשר מתועד" : "קשרים מתועדים"} בקטלוג` : "אין קשרים מתועדים בקטלוג";
    return `${head} ${rel}; האובייקט אינו חלק ממודל הנתונים של PM ו-PP-PI.`;
  }
  const g = kgraph(name);
  const down = g?.downstream.length || 0;
  const blast = (g?.upstream.length || 0) + down;
  const lvl = blast >= 8 ? "גבוהה" : blast >= 3 ? "בינונית" : "נמוכה";
  const status = STATUS_META[t.migrationStatus]?.he || t.migrationStatus;
  return `${head} רדיוס השפעה ${blast} אובייקטים מקושרים, ${down} מהם תלויים בו (השפעת מיגרציה ${lvl}, לפי מספר הקשרים). סטטוס מיגרציה לפי התיעוד: ${status}.`;
}

/* ------------------------------------------------------------------ build */

const cache = new Map<string, ObjectProfile | null>();

/** The profile of a blueprint or HR/BW object, or null for anything else (the
 *  verified registry carries its own page and no profile layer). */
export function objectProfile(raw: string): ObjectProfile | null {
  const name = (raw || "").trim();
  if (cache.has(name)) return cache.get(name) ?? null;

  const rows: SAPTable[] = ALL_TABLES.filter((x) => x.tableName === name);
  const blueprint = rows.length > 0;
  // The legacy page read ONE row — the last one the dictionary holds
  // (lib/knowledge-graph's map keeps the last). Its description and module
  // lead the summary; every list below is the union of all rows.
  const t = blueprint ? tableByName(name) : hrBwTableByName(name);
  if (!t) {
    cache.set(name, null);
    return null;
  }
  const all = blueprint ? rows : [t];

  const k = knowledgeFor(name);
  const ix = objectIntelExt(name);
  const cn = CONSULTANT_NOTES[name];
  const inc = INCIDENTS.filter((i) => (i.tables || []).includes(name));

  const mods = uniq([String(t.module), ...all.map((r) => String(r.module))]);
  const fieldsN = new Set(all.flatMap((r) => r.fields.map((f) => f.tech))).size;

  const rels: SAPRelation[] = [...new Map(all.flatMap((r) => r.relations || []).map((r) => [r.table, r])).values()];
  const parents = rels.filter((r) => r.role === "child");
  const children = rels.filter((r) => r.role === "parent");

  // Feeds and consumers. The legacy page read the blueprint graph for both, so
  // every HR/BW object came out as "נקודת התחלה" and "נקודת סיום" even when
  // its registry records a parent and a child. Here an HR/BW object is read
  // from its own registry, the same way the graph reads a blueprint table:
  // parents feed it; children and the rows that point at it read it.
  let up: string[];
  let down: string[];
  if (blueprint) {
    const g = kgraph(name);
    up = g?.upstream || [];
    down = g?.downstream || [];
  } else {
    up = uniq(parents.map((r) => r.table));
    const refs = HR_BW_NAMES.filter((n) => n !== name && (hrBwTableByName(n)?.relations || []).some((r) => r.table === name));
    down = uniq([...children.map((r) => r.table), ...refs]).filter((n) => !up.includes(n));
  }

  // Relations that must hold, per dictionary row as the legacy page chose them
  // (the parents when the row has any, else its first ten relations), then
  // merged, so a table documented twice keeps both rows' lists.
  const mustExist: PRel[] = [
    ...new Map(
      all.flatMap((r) => {
        const own = r.relations || [];
        const ps = own.filter((x) => x.role === "child");
        return (ps.length ? ps : own.slice(0, 10)).map((x) => [x.table, { ...obj(x.table), card: clean(x.card), desc: clean(x.desc) }] as const);
      }),
    ).values(),
  ];

  // Exits are matched exactly as the legacy page matched them: by object name,
  // or by a T-Code of its T-Code list (objectIntel's, else the row's own).
  const oi = blueprint ? objectIntel(name) : null;
  const tcodes = oi?.tcodes?.length ? oi.tcodes : splitTc(t.tcodes);
  const exits = EXITS.filter((e) => (e.object || "").includes(name) || (e.tcodes || []).some((tc) => tcodes.includes(tc)));

  const conn = objectConnections(name);

  const p: ObjectProfile = {
    name,
    summary: summaryOf(name, t, mods, fieldsN, blueprint),
    usage: k
      ? {
          role: clean(k.role),
          why: clean(k.why),
          whenUsed: clean(k.whenUsed),
          step: clean(k.step),
          importance: IMPORTANCE_HE[k.importance] || "",
          s4: clean(k.s4),
          trust: TRUST_NOTE[k.trust] || "",
        }
      : null,
    provenance: ix || cn ? "תוכן יועצי מאומת" : "ידע נגזר מהמאגר",
    topics: uniq(all.map((r) => clean(r.topicTitle)).filter(Boolean)),
    fioriMore: blueprint
      ? uniq(all.map((r) => clean(r.fioriApp)).filter(Boolean)).filter((f) => !moduleRows(name).some((r) => r.fiori === f))
      : [],
    scenarios: ix?.scenarios || [],
    actors: ix
      ? { creates: ix.creates, reads: ix.reads, updates: ix.updates, specific: true }
      : { ...deriveActors(String(t.module)), specific: false },
    feeds: up.map(obj),
    consumers: down.map(obj),
    lifecycle: lifecycleFor(name),
    exits: exits.map((e) => ({ t: e.name, href: null, sub: e.kind })),
    qa: {
      mustExist,
      integ: uniq([...(cn?.integration || []), ...conn.interfaces.map((m) => m.label)]),
      regression: uniq(inc.flatMap((i) => i.prevention || [])),
    },
    interview: interviewFor(name).map((q) => ({ level: q.level, q: clean(q.q), a: clean(q.aHe) })),
    consult: cn
      ? {
          mistakes: cn.mistakes || [],
          debug: cn.debug || [],
          fnNotes: cn.fnNotes || [],
          techNotes: cn.techNotes || [],
          verify: cn.trust === "needs-verification",
        }
      : null,
    tips: TIPS[name] || [],
    conn: {
      s4: conn.s4 ? { label: conn.s4.label, sub: clean(conn.s4.sub) } : null,
      migration: conn.migration.map((m) => ({ label: m.label, sub: clean(m.sub) })),
      bw: conn.bw.map((m) => ({ label: m.label, sub: clean(m.sub) })),
    },
  };
  cache.set(name, p);
  return p;
}

/** True when the second profile section has anything to print. */
export const hasKnowledge = (p: ObjectProfile) =>
  !!(p.consult || p.tips.length || p.qa.mustExist.length || p.qa.integ.length || p.qa.regression.length ||
    p.interview.length || p.conn.s4 || p.conn.migration.length || p.conn.bw.length);

export const LEVEL_HE: Record<Level, string> = { junior: "Junior", senior: "Senior", architect: "Architect" };
