/* Knowledge Workbench board: build-time data.

   SERVER ONLY (reads the SAP datasets and the book shards). Every number,
   name, status and relation below comes from the site's own accessors;
   nothing is authored here. Where a value is missing the view carries null
   or "" and the page prints "לא מתועד במאגר". */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { homeData } from "@/components/neo-shell/home/home-data";
import { txDetail, txDetailCodes, txStatusMap, type TxDetail } from "@/components/neo-shell/data/tx-detail";
import { tableDetail, tableHref } from "@/components/neo-shell/data/tables-detail";
import { bpDetail, bpList } from "@/components/neo-shell/best-practices/bp-data";
import { booksData } from "@/components/neo-shell/books/books-data";
import { neoLessonData } from "@/components/neo-shell/learn/lesson-data";
import { cdsDetail } from "@/components/neo-shell/reference/cds-data";
import { BLOCK_META, orderedBlocks } from "@/lib/academy/lesson-types";
import {
  S4_STATUS_GROUP, S4_STATUS_HE, VERIFICATION_HE,
  type EvidenceBlockData, type S4Status, type S4StatusGroup, type VerificationLevel,
} from "@/lib/evidence/types";
import type { Fam, LevelV, Lvl, StatusV } from "./marks";

/* ------------------------------------------------------------ vocabulary */

const FAM_OF: Record<S4StatusGroup, Fam> = {
  keeps: "keep", changes: "change", moves: "replace", gone: "removed", open: "verify", new: "new", past: "past",
};

const LVL_OF: Record<VerificationLevel, Lvl> = {
  sap_official_verified: "verified",
  repository_verified: "verified",
  supported_secondary_source: "partial",
  legacy_context_only: "partial",
  verification_required: "required",
  conflicting_sources: "conflict",
};

/** Short column wording for dense rows, cut down from the dataset's own
 *  VERIFICATION_HE; the full wording shows in the preview and detail. */
const LVL_SHORT: Record<VerificationLevel, string> = {
  sap_official_verified: "מאומת · SAP",
  repository_verified: "מאומת · מאגר",
  supported_secondary_source: "חלקי · משני",
  legacy_context_only: "חלקי · ECC",
  verification_required: "דורש אימות",
  conflicting_sources: "סתירה",
};

export const statusOf = (key: S4Status): StatusV => ({ key, label: S4_STATUS_HE[key], fam: FAM_OF[S4_STATUS_GROUP[key]] });
export const levelOf = (key: VerificationLevel): LevelV => ({ key, label: VERIFICATION_HE[key], short: LVL_SHORT[key], lvl: LVL_OF[key] });
const evStatus = (e: EvidenceBlockData | undefined | null) => (e ? statusOf(e.status.key) : null);
const evLevel = (e: EvidenceBlockData | undefined | null) => (e ? levelOf(e.level.key) : null);

const need = <T,>(v: T | null | undefined, what: string): T => {
  if (v === null || v === undefined) throw new Error(`workbench board: ${what} is missing from the dataset`);
  return v;
};

/* ------------------------------------------------------ shared row shape */

export interface Fact { k: string; v: string; mono?: boolean }

/** What the palette's detail panel shows for one result. */
export interface Detail {
  kindHe: string;
  code: string;
  he: string;
  sub: string;
  mods: string[];
  status: StatusV | null;
  level: LevelV | null;
  facts: Fact[];
}

export interface PalRow { id: string; code: string; he: string; mods: string[]; status: StatusV | null; tag: string; detail: Detail }
export interface PalGroup { id: string; label: string; hint: string; total: number; rows: PalRow[] }
export interface PalData { query: string; total: number; groups: PalGroup[] }

/* ------------------------------------------------------------- counts */

export interface Counts {
  tables: number; dictRows: number; shared: number; fields: number;
  tcodes: number; tcodesDict: number; funcs: number; relations: number;
  books: number; chapters: number; sections: number;
  bp: number; bpProcess: number;
  flows: { key: string; he: string; steps: number }[];
  modules: { code: string; he: string; tables: number; fields: number; tcodes: number }[];
}

function counts(): Counts {
  const h = homeData();
  const b = booksData();
  const bl = bpList();
  return {
    tables: h.tables,
    dictRows: h.dictRows,
    shared: h.shared,
    fields: h.fields,
    tcodes: txDetailCodes().length,
    tcodesDict: h.tcodes,
    funcs: h.funcs,
    relations: h.relations,
    // homeData().books reads the legacy registry (10); the NEO shelf reads
    // data/books and holds 11. The shelf is what the board shows.
    books: b.totals.books,
    chapters: b.totals.chapters,
    sections: b.totals.sections,
    bp: bl.length,
    bpProcess: bl.filter((r) => r.profile).length,
    flows: h.flows.map((f) => ({ key: f.key, he: f.he, steps: f.steps.length })),
    modules: h.modules.map((m) => ({ code: m.code, he: m.he, tables: m.tables, fields: m.fields, tcodes: m.tcodes })),
  };
}

/* ------------------------------------------------------------- search */

const tx = (code: string) => need(txDetail(code), `transaction ${code}`);

function txDetailView(d: TxDetail): Detail {
  return {
    kindHe: "טרנזקציה",
    code: d.code,
    he: d.he,
    sub: d.en,
    mods: [d.module],
    status: evStatus(d.evidence),
    level: evLevel(d.evidence),
    facts: [
      { k: "תחום", v: d.area || "לא מתועד במאגר" },
      { k: "טבלאות ברשומה", v: d.tables.length ? d.tables.map((t) => t.name).join(" · ") : "לא מתועד במאגר", mono: d.tables.length > 0 },
      { k: "עובדות מתועדות", v: `${d.known}/${d.total}`, mono: true },
    ],
  };
}

function search(): PalData {
  const t = need(tableDetail("AFKO"), "table AFKO");
  const PER = 5;
  const tableRow: PalRow = {
    id: "t-AFKO",
    code: t.name,
    he: t.he,
    mods: t.mods,
    status: evStatus(t.evidence),
    tag: "התאמה מדויקת",
    detail: {
      kindHe: "טבלה",
      code: t.name,
      he: t.he,
      sub: t.en,
      mods: t.mods,
      status: evStatus(t.evidence),
      level: evLevel(t.evidence),
      facts: [
        { k: "שדות מתועדים", v: String(t.fields.length), mono: true },
        { k: "מפתח ראשי", v: t.pk.join(" · "), mono: true },
        { k: "קשרים ממודלים", v: String(t.rels.length), mono: true },
      ],
    },
  };
  const txRows: PalRow[] = t.tx.map((x) => {
    const d = tx(x.code);
    return { id: `x-${d.code}`, code: d.code, he: d.he, mods: [d.module], status: evStatus(d.evidence), tag: "", detail: txDetailView(d) };
  });
  const cdsRows: PalRow[] = t.cds.map((c) => {
    const d = cdsDetail(c.view);
    return {
      id: `c-${c.view}`,
      code: c.view,
      he: c.he,
      mods: d?.mod ? [d.mod] : [],
      status: evStatus(d?.evidence),
      tag: "",
      detail: {
        kindHe: "תצוגת CDS",
        code: c.view,
        he: c.he,
        sub: "",
        mods: d?.mod ? [d.mod] : [],
        status: evStatus(d?.evidence),
        level: evLevel(d?.evidence),
        facts: [{ k: "טבלאות קלאסיות", v: c.tables.join(" · "), mono: true }],
      },
    };
  });
  const relRows: PalRow[] = t.rels.map((r) => {
    const d = tableDetail(r.name);
    const rel = `${r.dir === "parent" ? "הורה" : "בן"} · ${r.card || "קרדינליות לא צוינה"}`;
    return {
      id: `r-${r.name}`,
      code: r.name,
      he: r.he,
      mods: r.edgeMods,
      status: evStatus(d?.evidence),
      tag: rel,
      detail: {
        kindHe: "טבלה מקושרת",
        code: r.name,
        he: r.he,
        sub: d?.en ?? "",
        mods: r.edgeMods,
        status: evStatus(d?.evidence),
        level: evLevel(d?.evidence),
        facts: [
          { k: "הקשר ל-AFKO", v: rel },
          { k: "JOIN", v: r.joins.find((j) => j.join)?.join || "לא מתועד במאגר", mono: !!r.joins.find((j) => j.join) },
          { k: "שדות מתועדים", v: String(r.fields), mono: true },
        ],
      },
    };
  });
  const groups: PalGroup[] = [
    { id: "tables", label: "טבלאות", hint: "התאמה לשם הטבלה", total: 1, rows: [tableRow] },
    { id: "tx", label: "טרנזקציות", hint: "ה-blueprint ממפה אותן ל-AFKO", total: txRows.length, rows: txRows.slice(0, PER) },
    { id: "cds", label: "תצוגות CDS", hint: "קוראות מ-AFKO", total: cdsRows.length, rows: cdsRows.slice(0, PER) },
    { id: "rel", label: "טבלאות מקושרות", hint: "קשר ER ממודל עם AFKO", total: relRows.length, rows: relRows.slice(0, PER) },
  ];
  return { query: "AFKO", total: groups.reduce((n, g) => n + g.total, 0), groups };
}

/* ------------------------------------------------------------ catalog */

export interface CatRow {
  code: string; he: string; en: string; module: string; moduleHe: string; area: string;
  status: StatusV; level: LevelV; refs: number; tables: number; known: number; total: number;
}
export interface CatPreview {
  code: string; purpose: string; whenNot: string; fiori: string;
  tables: string[]; bapis: number; sources: number; neighbours: { code: string; reason: string }[];
  href: string;
}
export interface CatalogData { pasted: string[]; rows: CatRow[]; previews: Record<string, CatPreview>; registry: number }

export const CATALOG_CODES = ["IW31", "IW32", "IW33", "IW38", "IW39", "IP10", "IP30", "IP30H", "IA01", "IA05", "CO11N", "COR1"];

function catalog(): CatalogData {
  const rows: CatRow[] = [];
  const previews: Record<string, CatPreview> = {};
  for (const c of CATALOG_CODES) {
    const d = tx(c);
    rows.push({
      code: d.code, he: d.he, en: d.en, module: d.module, moduleHe: d.moduleHe, area: d.area,
      status: statusOf(d.evidence.status.key), level: levelOf(d.evidence.level.key),
      refs: d.popularity, tables: d.tables.length, known: d.known, total: d.total,
    });
    previews[d.code] = {
      code: d.code,
      purpose: d.purpose,
      whenNot: d.whenNot,
      fiori: d.s4.fiori,
      tables: d.tables.map((t) => t.name),
      bapis: d.bapis.length,
      sources: d.evidence.sources.length,
      neighbours: d.neighbours.slice(0, 4).map((n) => ({ code: n.code, reason: n.reason })),
      href: `/neo/transactions/${encodeURIComponent(d.code)}/`,
    };
  }
  return { pasted: CATALOG_CODES, rows, previews, registry: txDetailCodes().length };
}

/* ------------------------------------------------------------ records */

export interface TxRecord {
  code: string; he: string; en: string; module: string; moduleHe: string; area: string;
  status: StatusV; level: LevelV; release: string | null; sources: number; lastVerified: string | null;
  purpose: string; steps: string[]; stepsFrom: "flow" | "process" | "none";
  tables: { name: string; he: string; note: string; trust: string; href: string | null }[];
  fiori: string; issues: string[]; known: number; total: number; href: string;
}

const TRUST_HE: Record<string, string> = { verified: "מאומת", partial: "חלקי", needs: "דורש אימות" };

function txRecord(code: string): TxRecord {
  const d = tx(code);
  // typicalFlow is the dataset's step list. When it is empty, the record's
  // own process line is split on its own arrows; the text is not reworded.
  const fromProcess = d.process.includes("→") ? d.process.split("→").map((s) => s.trim()).filter(Boolean) : [];
  const steps = d.flow.length ? d.flow : fromProcess;
  return {
    code: d.code, he: d.he, en: d.en, module: d.module, moduleHe: d.moduleHe, area: d.area,
    status: statusOf(d.evidence.status.key), level: levelOf(d.evidence.level.key),
    release: d.evidence.status.release, sources: d.evidence.sources.length, lastVerified: d.evidence.lastVerifiedAt,
    purpose: d.purpose,
    steps,
    stepsFrom: d.flow.length ? "flow" : fromProcess.length ? "process" : "none",
    tables: d.tables.map((t) => ({ name: t.name, he: t.he, note: t.note, trust: TRUST_HE[t.trust] ?? t.trust, href: t.href })),
    fiori: d.s4.fiori,
    issues: d.issues.map((i) => i.he),
    known: d.known, total: d.total,
    href: `/neo/transactions/${encodeURIComponent(d.code)}/`,
  };
}

export interface FieldV { tech: string; he: string; dt: string; len: string; pk: boolean; fk: boolean; mods: string[] }
export interface TableRecord {
  name: string; he: string; en: string; mods: string[]; zoneHe: string; shared: boolean;
  status: StatusV; level: LevelV; release: string | null;
  fields: FieldV[]; nFields: number; pk: string[]; fk: string[]; rels: number; tx: number; cds: number;
  rank: number; totalTables: number; href: string;
}

function tableRecord(name: string): TableRecord {
  const t = need(tableDetail(name), `table ${name}`);
  return {
    name: t.name, he: t.he, en: t.en, mods: t.mods, zoneHe: t.zoneHe, shared: t.shared,
    status: statusOf(t.evidence.status.key), level: levelOf(t.evidence.level.key), release: t.evidence.status.release,
    fields: t.fields.slice(0, 6).map((f) => ({ tech: f.tech, he: f.he, dt: f.dt, len: f.len, pk: f.pk, fk: f.fk, mods: f.mods })),
    nFields: t.fields.length, pk: t.pk, fk: t.fk, rels: t.rels.length, tx: t.tx.length, cds: t.cds.length,
    rank: t.rank, totalTables: t.total, href: tableHref(t.name),
  };
}

/* ------------------------------------------------------ best practice */

export interface BpView {
  he: string; en: string; moduleHe: string; status: StatusV; level: LevelV;
  purpose: string; steps: { n: number; he: string; xrefs: { name: string; kindHe: string; href: string | null }[] }[];
  totalSteps: number; filled: number | null; total: number | null;
  reference: { title: string; level: string } | null; href: string;
}

function bestPractice(): BpView {
  const b = need(bpDetail("order-settlement-process"), "best practice order-settlement-process");
  return {
    he: b.he, en: b.en, moduleHe: b.moduleHe,
    status: statusOf(b.evidence.status.key), level: levelOf(b.evidence.level.key),
    purpose: b.process?.purpose || b.summary,
    steps: b.steps.slice(0, 5).map((s) => ({ n: s.n, he: s.he, xrefs: s.xrefs.map((x) => ({ name: x.name, kindHe: x.kindHe, href: x.href })) })),
    totalSteps: b.steps.length,
    filled: b.process?.filled ?? null,
    total: b.process?.total ?? null,
    reference: b.process?.reference ? { title: b.process.reference.title, level: b.process.reference.levelHe } : null,
    href: b.href,
  };
}

/* ---------------------------------------------------------------- ERD */

export interface ErdRel { name: string; he: string; dir: "child" | "parent"; kind: string; card: string; fields: number; join: string; key: string; mods: string[] }
export interface ErdView { name: string; he: string; fields: number; pk: string[]; rels: ErdRel[] }

function erd(): ErdView {
  const t = need(tableDetail("AFKO"), "table AFKO");
  return {
    name: t.name, he: t.he, fields: t.fields.length, pk: t.pk,
    rels: t.rels.map((r) => {
      const join = r.joins.find((j) => j.join)?.join ?? "";
      // The AFKO side of the stated JOIN, read out of the JOIN text itself.
      const key = join.match(/AFKO\.(\w+)/)?.[1] ?? "";
      return { name: r.name, he: r.he, dir: r.dir, kind: r.kind, card: r.card, fields: r.fields, join, key, mods: r.edgeMods };
    }),
  };
}

/* ----------------------------------------------------- library, reader */

export interface BookView {
  id: string; title: string; titleHe: string | null; module: string; moduleHe: string;
  kindLabel: string | null; publisher: string | null; pages: number | null;
  chapters: number; sections: number; thick: number; measured: boolean;
}
export interface ReaderView {
  bookTitle: string; chapterN: number; chapters: number; chapterTitle: string;
  sectionId: string; sectionTitle: string; pos: number; totalSections: number;
  paragraph: string; href: string;
}

function shelf(): BookView[] {
  return booksData().books.map((b) => ({
    id: b.id, title: b.titleEn, titleHe: b.titleHe, module: b.module, moduleHe: b.moduleHe,
    kindLabel: b.kindLabel, publisher: b.publisher, pages: b.pages,
    chapters: b.chapters, sections: b.sections, thick: b.thick, measured: b.thickFrom === "pages",
  }));
}

/** One real paragraph, verbatim: book1, chapter 1, section 1.1.1, the first
 *  plain paragraph of its Hebrew body that is under 600 characters. */
function reader(): ReaderView {
  const BOOK = "book1";
  const SEC = "1.1.1";
  const b = need(booksData().books.find((x) => x.id === BOOK), BOOK);
  const ch = need(b.chapterRows.find((c) => c.rows.some(([id]) => id === SEC)), `${BOOK} chapter of ${SEC}`);
  const flat = b.chapterRows.flatMap((c) => c.rows.map(([id]) => id));
  const file = path.join(process.cwd(), "public", "books", BOOK, `ch${ch.n}.json`);
  let paragraph = "";
  if (existsSync(file)) {
    const body = (JSON.parse(readFileSync(file, "utf8")) as Record<string, { he?: string }>)[SEC];
    paragraph = (body?.he ?? "")
      .split("\n")
      .map((p) => p.trim())
      .find((p) => p.length > 0 && p.length < 600 && !/[*#`[\]]/.test(p)) ?? "";
  }
  return {
    bookTitle: b.titleHe || b.titleEn,
    chapterN: ch.n,
    chapters: b.chapters,
    chapterTitle: ch.title,
    sectionId: SEC,
    sectionTitle: ch.rows.find(([id]) => id === SEC)?.[1] ?? "",
    pos: flat.indexOf(SEC) + 1,
    totalSections: flat.length,
    paragraph,
    href: `/neo/books/${BOOK}/`,
  };
}

/* ------------------------------------------------------------ academy */

export interface LessonView {
  title: string; level: string; minutes: number; trust: string; source: string; lastReviewed: string;
  course: string; module: string; chapterTitle: string; chapterIndex: number; chapterCount: number;
  posInChapter: number; chapterSize: number; globalIndex: number; globalTotal: number;
  objective: string; toc: { n: number; he: string; trust: string; verified: boolean }[];
  prev: string | null; next: string | null; href: string;
}

const LESSON_TRUST: Record<string, string> = {
  "verified-docs": "מאומת מול תיעוד",
  "verified-system": "מאומת במערכת",
  curated: "תוכן ערוך",
  "needs-review": "נדרש אימות נוסף",
};

function lesson(): LessonView {
  const d = need(neoLessonData("pm", "pm-bom"), "lesson pm/pm-bom");
  const blocks = orderedBlocks(d.lesson);
  const obj = blocks.find((b) => b.kind === "objective");
  return {
    title: d.lesson.title, level: d.lesson.level, minutes: d.lesson.minutes,
    trust: LESSON_TRUST[d.lesson.trust] ?? d.lesson.trust, source: d.lesson.source ?? "", lastReviewed: d.lesson.lastReviewed ?? "",
    course: d.course.title, module: d.course.module,
    chapterTitle: d.place.chapterTitle, chapterIndex: d.place.chapterIndex, chapterCount: d.place.chapterCount,
    posInChapter: d.place.posInChapter, chapterSize: d.place.chapterSize,
    globalIndex: d.place.globalIndex, globalTotal: d.place.globalTotal,
    objective: obj && "md" in obj ? obj.md : "",
    toc: blocks.map((b, i) => ({
      n: i + 1,
      he: b.title || BLOCK_META[b.kind].he,
      trust: LESSON_TRUST[b.trust] ?? b.trust,
      verified: b.trust === "verified-docs" || b.trust === "verified-system",
    })),
    prev: d.prev?.title ?? null,
    next: d.next?.title ?? null,
    href: `/neo/academy/${d.course.id}/pm-bom/`,
  };
}

/* ------------------------------------------------------ distributions */

export interface Dist<K extends string> { id: K; n: number; keys: { key: string; label: string; n: number }[] }

function distributions() {
  const st = txStatusMap();
  const codes = txDetailCodes();
  const famRows = new Map<Fam, Map<string, number>>();
  for (const c of codes) {
    const key = st[c];
    const fam = FAM_OF[S4_STATUS_GROUP[key]];
    const m = famRows.get(fam) ?? new Map<string, number>();
    m.set(key, (m.get(key) ?? 0) + 1);
    famRows.set(fam, m);
  }
  const famOrder: Fam[] = ["keep", "change", "replace", "removed", "verify", "new", "past"];
  const status: Dist<Fam>[] = famOrder.map((fam) => {
    // Every dataset status of the family is listed, including the ones no
    // transaction carries, so the legend shows the full mapping.
    const keys = (Object.keys(S4_STATUS_GROUP) as S4Status[]).filter((k) => FAM_OF[S4_STATUS_GROUP[k]] === fam);
    const m = famRows.get(fam) ?? new Map<string, number>();
    const list = keys.map((k) => ({ key: k, label: S4_STATUS_HE[k], n: m.get(k) ?? 0 }));
    return { id: fam, n: list.reduce((a, x) => a + x.n, 0), keys: list };
  });

  const lvCount = new Map<VerificationLevel, number>();
  for (const c of codes) {
    const k = tx(c).evidence.level.key;
    lvCount.set(k, (lvCount.get(k) ?? 0) + 1);
  }
  const lvlOrder: Lvl[] = ["verified", "partial", "required", "conflict"];
  const levels: Dist<Lvl>[] = lvlOrder.map((lvl) => {
    const keys = (Object.keys(LVL_OF) as VerificationLevel[]).filter((k) => LVL_OF[k] === lvl);
    const list = keys.map((k) => ({ key: k, label: VERIFICATION_HE[k], n: lvCount.get(k) ?? 0 }));
    return { id: lvl, n: list.reduce((a, x) => a + x.n, 0), keys: list };
  });
  return { status, levels, total: codes.length };
}

/* ------------------------------------------- tokens, read from the sheet */

export interface Token { name: string; light: string; dark: string }
export interface ContrastRow { fg: string; bg: string; min: number; light: number; dark: number }

const CSS_FILE = path.join(process.cwd(), "app", "design", "redesign-2026", "workbench", "board.css");

/** The palette exactly as board.css declares it, so the swatches can never
 *  drift from the stylesheet. */
function tokens(): Token[] {
  const css = existsSync(CSS_FILE) ? readFileSync(CSS_FILE, "utf8") : "";
  const block = (mode: string) => {
    const body = css.match(new RegExp(`\\.rb-workbench\\[data-mode="${mode}"\\]\\s*\\{([^}]*)\\}`))?.[1] ?? "";
    return new Map([...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6,8})\s*;/g)].map((m) => [m[1], m[2].toUpperCase()]));
  };
  const light = block("light");
  const dark = block("dark");
  return [...light.keys()].map((name) => ({ name, light: light.get(name) ?? "", dark: dark.get(name) ?? "" }));
}

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a: string, b: string) => {
  const x = lum(a);
  const y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/** Text and UI pairs the board actually draws. 4.5 for text, 3 for marks,
 *  rings and control boundaries. The same list feeds the comment table at
 *  the top of board.css. */
export const PAIRS: [string, string, number][] = [
  ...["canvas", "panel", "raised", "sunken", "select-bg"].flatMap((s) => ["ink-1", "ink-2", "ink-3"].map((t) => [t, s, 4.5] as [string, string, number])),
  ["action-ink", "action", 4.5], ["action-ink", "action-hover", 4.5], ["action-ink", "action-press", 4.5],
  ["action-text", "panel", 4.5], ["action-text", "canvas", 4.5], ["action-text", "select-bg", 4.5],
  ["link", "panel", 4.5], ["link", "raised", 4.5], ["link", "canvas", 4.5], ["link", "info-bg", 4.5],
  ["focus", "panel", 3], ["focus", "canvas", 3], ["line-strong", "panel", 3], ["line-strong", "canvas", 3], ["action", "select-bg", 3],
  ...["keep", "change", "replace", "removed", "verify", "past"].flatMap((s) => [
    [`st-${s}`, "panel", 4.5], [`st-${s}`, `st-${s}-bg`, 4.5], [`st-${s}`, "select-bg", 4.5], [`st-${s}`, "sunken", 4.5],
  ] as [string, string, number][]),
  ...["pm", "pppi", "pp", "ppds", "qm", "mm", "ewm", "sop", "fiori", "s4", "other"].map((m) => [`mod-${m}`, "panel", 3] as [string, string, number]),
  ["code-ink", "code-bg", 4.5], ["kbd-ink", "kbd-bg", 4.5], ["kbd-line", "kbd-bg", 3],
  ["edge-verified", "panel", 3], ["edge-unverified", "panel", 3], ["ink-1", "node-sel", 4.5],
  ["paper-ink", "paper", 4.5],
  ...Array.from({ length: 12 }, (_, i) => ["paper", `cloth-${i + 1}`, 4.5] as [string, string, number]),
];

function contrast(list: Token[]): ContrastRow[] {
  const by = new Map(list.map((t) => [t.name, t]));
  const out: ContrastRow[] = [];
  for (const [fg, bg, min] of PAIRS) {
    const f = by.get(fg);
    const b = by.get(bg);
    if (!f || !b) continue;
    out.push({ fg, bg, min, light: ratio(f.light.slice(0, 7), b.light.slice(0, 7)), dark: ratio(f.dark.slice(0, 7), b.dark.slice(0, 7)) });
  }
  return out;
}

/* ---------------------------------------------------------- the board */

export function boardData() {
  const tk = tokens();
  return {
    counts: counts(),
    search: search(),
    catalog: catalog(),
    txRec: txRecord("IP30H"),
    tableRec: tableRecord("AFKO"),
    bp: bestPractice(),
    erd: erd(),
    shelf: shelf(),
    reader: reader(),
    lesson: lesson(),
    dist: distributions(),
    tokens: tk,
    contrast: contrast(tk),
  };
}

export type BoardData = ReturnType<typeof boardData>;
