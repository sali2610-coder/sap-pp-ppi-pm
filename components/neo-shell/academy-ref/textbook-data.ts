/* ============================================================================
   PROJECT NEO · THE ACADEMY TEXTBOOKS — build-time data.
   ----------------------------------------------------------------------------
   SERVER ONLY. The eight digital textbooks of the pre-NEO library
   (data/library/academy-index.ts: PP, PM, QM, MM, WM, PP/DS, S&OP, PM-User)
   and everything the old library built on them: the chapters, the reference
   indexes, the quality reports and the PP object index.

   TWO KINDS OF TEXTBOOK, AND WHY
     · MM, WM, PP/DS, S&OP and PM-User were migrated into the lesson engine, one
       lesson per subchapter (scripts/migrate-academy-module.mts). Their NEO
       course IS the textbook, so a node is read in its lesson. The migration
       did not carry the chapter introductions, the English titles of nested
       nodes or the code and note of each flow step, so the chapter page carries
       those beside the links.
     · PP, PM and QM were never migrated: their NEO courses are separate,
       concept-by-concept lessons. Their textbook chapters are rendered here in
       full — every node, every facet — so the content the old chapter pages
       held is read inside NEO and not lost behind a redirect.

   Nothing here is authored. Every string comes from the textbook data; every
   link is gated on a page that is really generated.
   ========================================================================== */

import {
  BOOKS, FLAT, ACADEMY_TOTALS, SEARCH_DOCS, bookReference, bookStats, crossBookObjects, structuralReport,
  type BookDef, type IndexEntry,
} from "@/data/library/academy-index";
import type { LearningNode, TextbookChapter } from "@/data/library/pp-textbook/types";
import { PP_CHAPTERS, PP_GLOSSARY, type PPChapter } from "@/data/library/pp-knowledge";
import { PP_OBJECTS, slugOf as ppSlugOf } from "@/lib/pp-object-index";
import { FIORI_APPS } from "@/data/fiori/apps";
import { getLesson, getModule } from "@/lib/academy/model";
import { bapiHref, cdsHref, fioriHref, idocHref, objectHref, txHref } from "../reference/ref-links";
import { tableDetailNames, tableHref } from "../data/tables-detail";
import { TEXTBOOK_COURSE, neoLessonHref } from "../learn/lesson-links";

export type { BookDef, IndexEntry };

const pad = (n: number) => String(n).padStart(2, "0");

/** Textbooks whose subchapters are lessons of the NEO course: textbook id → the
 *  slug prefix scripts/migrate-academy-module.mts gave their lessons. */
const LESSON_KEY: Record<string, string> = { mm: "mm", wm: "wm", ppds: "ppds", sop: "sop", pmu: "pmu" };

/** The course a textbook belongs to, and back. */
export const courseOfTextbook = (bookId: string): string => TEXTBOOK_COURSE[bookId] ?? "";
export const textbookOfCourse = (courseId: string): BookDef | undefined =>
  BOOKS.find((b) => TEXTBOOK_COURSE[b.id] === courseId);

/** Is this textbook read in its course's lessons (true) or in full here (false)? */
export const isMigrated = (bookId: string): boolean => !!LESSON_KEY[bookId];

/* ------------------------------------------------------------------ hrefs */

export const textbookHref = (courseId: string) => `/neo/academy/${courseId}/textbook/`;
export const chapterSlug = (n: number) => `chapter-${pad(n)}`;
export const chapterHref = (courseId: string, n: number) => `/neo/academy/${courseId}/textbook/${chapterSlug(n)}/`;
export const referenceHref = (courseId: string) => `/neo/academy/${courseId}/textbook/reference/`;
export const qualityHref = (courseId: string) => `/neo/academy/${courseId}/textbook/quality/`;
export const ppObjectsHref = "/neo/academy/pp-pi/objects/";
export const ppObjectHref = (code: string) => `/neo/academy/pp-pi/objects/${ppSlugOf(code)}/`;
export const fioriIndexHref = "/neo/academy/fiori/";
/** The anchor of one node on its chapter page. */
export const nodeAnchor = (id: string) => `n-${id}`;

/** node id → { chapter, subchapter id } for every textbook. */
const NODE_PLACE: Record<string, Map<string, { ch: number; sub: string }>> = {};
function placeOf(bookId: string, id: string) {
  let m = NODE_PLACE[bookId];
  if (!m) {
    m = new Map();
    const b = BOOKS.find((x) => x.id === bookId);
    for (const ch of Object.values(b?.data ?? {})) {
      const walk = (n: LearningNode, sub: string) => { m!.set(n.id, { ch: ch.n, sub }); (n.children ?? []).forEach((c) => walk(c, sub)); };
      ch.subchapters.forEach((s) => walk(s, s.id));
    }
    NODE_PLACE[bookId] = m;
  }
  return m.get(id);
}

/** The lesson a migrated textbook's subchapter became, when it really exists. */
export function lessonOfSub(bookId: string, subId: string): string | null {
  const key = LESSON_KEY[bookId];
  if (!key) return null;
  const slug = `${key}-${subId.replace(/\./g, "-")}`;
  const l = getLesson(slug);
  return l && l.hasLesson ? neoLessonHref(l.moduleId, slug) : null;
}

/** Where one textbook node is read inside NEO: its lesson (migrated textbooks)
 *  or its anchor on the chapter page (PP, PM, QM). */
export function nodeHref(bookId: string, id: string, ch?: number): string | null {
  const course = courseOfTextbook(bookId);
  const p = placeOf(bookId, id);
  if (!course || (!p && ch == null)) return null;
  if (isMigrated(bookId)) return p ? lessonOfSub(bookId, p.sub) : null;
  return `${chapterHref(course, p?.ch ?? ch!)}#${nodeAnchor(id)}`;
}

/* --------------------------------------------------- records, gated */

let tables: Set<string> | null = null;
const tableSet = () => (tables ??= new Set(tableDetailNames()));
const fioriSlugById = new Map(FIORI_APPS.map((a) => [a.id, a.slug]));

/** A dictionary table's NEO page, else its object page, else nothing. */
export function tableLink(name: string): string | null {
  const n = (name || "").trim();
  if (!n) return null;
  return tableSet().has(n) ? tableHref(n) : objectHref(n);
}
/** A Fiori app id's NEO page, when NEO documents that app. */
export function fioriLink(id: string): string | null {
  const slug = fioriSlugById.get((id || "").trim());
  return slug ? fioriHref(slug) : null;
}
/** Any SAP identifier, tried against every NEO record family in the order the
 *  redirect generator uses (transactions, tables, objects, CDS, IDoc, BAPI). */
export function recordLink(code: string): string | null {
  const c = (code || "").trim();
  if (!c || c === "—") return null;
  try {
    return txHref(c) ?? (tableSet().has(c) ? tableHref(c) : null) ?? objectHref(c) ?? cdsHref(c) ?? idocHref(c) ?? bapiHref(c) ?? fioriLink(c);
  } catch {
    return null;
  }
}

/** The textbook slug a legacy chapter link names: "/library/qm/…",
 *  "/library/qm-academy/…" and "/library/pp/…" all mean a textbook. */
const TEXTBOOK_BY_SLUG: Record<string, string> = Object.fromEntries(
  BOOKS.flatMap((b) => [[b.id, b.id], [b.base.replace(/^\/library\//, ""), b.id]]),
);

/** A textbook's own cross-link (relatedHe), repointed into NEO, or null. */
export function relatedLink(href: string): string | null {
  if (!href) return null;
  const [pathq, hash = ""] = href.split("#");
  const path = pathq.split("?")[0];
  const ch = path.match(/^\/library\/([\w-]+)\/chapter-0*(\d+)\/?$/);
  if (ch) {
    const book = TEXTBOOK_BY_SLUG[ch[1]] ?? TEXTBOOK_BY_SLUG[ch[1].replace(/-academy$/, "")];
    if (!book) return null;
    const id = hash.replace(/^sub-/, "");
    if (id && placeOf(book, id)) return nodeHref(book, id);
    const course = courseOfTextbook(book);
    const chapters = BOOKS.find((b) => b.id === book)?.data ?? {};
    return course && chapters[ch[2]] ? chapterHref(course, Number(ch[2])) : null;
  }
  const obj = path.match(/^\/library\/([\w-]+)\/object\/([^/]+)\/?$/);
  if (obj) {
    const code = decodeURIComponent(obj[2]);
    if (obj[1] === "pp") {
      const o = PP_OBJECTS.find((x) => ppSlugOf(x.code) === code || x.code === code);
      if (o) return ppObjectHref(o.code);
    }
    return recordLink(code);
  }
  if (path === "/pp-pi/" || path === "/pp-pi") return "/neo/pp-pi/";
  if (path === "/pm/" || path === "/pm") return "/neo/pm/";
  if (path === "/library/" || path === "/library") return "/neo/books/";
  return null;
}

/* ------------------------------------------------------------- textbooks */

export interface TextbookMeta {
  id: string;
  courseId: string;
  module: string;
  titleHe: string;
  titleEn: string;
  status: BookDef["status"];
  validationKind: BookDef["validationKind"];
  score: number;
  lastUpdated: string;
  migrated: boolean;
  /** The NEO course's own module key and title (module colour, return label). */
  courseModule: string;
  courseTitle: string;
  stats: { chapters: number; subs: number; nodes: number; words: number; readMin: number };
  href: string;
  courseHref: string;
  referenceHref: string;
  qualityHref: string;
}

export function textbookMeta(b: BookDef): TextbookMeta {
  const courseId = courseOfTextbook(b.id);
  return {
    id: b.id,
    courseId,
    module: b.module,
    titleHe: b.titleHe,
    titleEn: b.titleEn,
    status: b.status,
    validationKind: b.validationKind,
    score: b.score,
    lastUpdated: b.lastUpdated,
    migrated: isMigrated(b.id),
    courseModule: getModule(courseId)?.module ?? b.module,
    courseTitle: getModule(courseId)?.title ?? "",
    stats: bookStats(b.id),
    href: textbookHref(courseId),
    courseHref: `/neo/academy/${courseId}/`,
    referenceHref: referenceHref(courseId),
    qualityHref: qualityHref(courseId),
  };
}

export const textbookMetas = (): TextbookMeta[] => BOOKS.map(textbookMeta);

/** The routes: one textbook per NEO course that has one. */
export const textbookCourseIds = (): string[] => BOOKS.map((b) => courseOfTextbook(b.id)).filter(Boolean);

export const sortedChapters = (b: BookDef): TextbookChapter[] =>
  Object.values(b.data).sort((a, c) => a.n - c.n);

export function chapterParams(): { courseId: string; chapter: string }[] {
  return BOOKS.flatMap((b) => sortedChapters(b).map((ch) => ({ courseId: courseOfTextbook(b.id), chapter: chapterSlug(ch.n) })));
}

/** Words in one node and in its whole subtree, the same count the old pages used. */
export const nodeMinutes = (words: number) => Math.max(1, Math.round(words / 180));

export interface ChapterPage {
  book: TextbookMeta;
  chapter: TextbookChapter;
  /** The PP knowledge module's chapter (summary, objects, runbooks…), PP only. */
  pp: PPChapter | null;
  ppGlossary: { term: string; he: string }[];
  prev: { n: number; titleHe: string; href: string } | null;
  next: { n: number; titleHe: string; href: string } | null;
}

export function chapterPage(courseId: string, slug: string): ChapterPage | null {
  const b = textbookOfCourse(courseId);
  const m = slug.match(/^chapter-0*(\d+)$/);
  if (!b || !m) return null;
  const all = sortedChapters(b);
  const i = all.findIndex((c) => c.n === Number(m[1]));
  if (i < 0) return null;
  const ch = all[i];
  const pp = b.id === "pp" ? PP_CHAPTERS.find((c) => c.n === ch.n) ?? null : null;
  const codes = pp ? Object.values(pp.objects).flat() : [];
  const link = (c?: TextbookChapter) => (c ? { n: c.n, titleHe: c.titleHe, href: chapterHref(courseId, c.n) } : null);
  return {
    book: textbookMeta(b),
    chapter: ch,
    pp,
    ppGlossary: pp ? PP_GLOSSARY.filter((g) => codes.some((code) => g.term.includes(code))) : [],
    prev: link(all[i - 1]),
    next: link(all[i + 1]),
  };
}

/* ------------------------------------------------------ reference index */

export interface RefRow { code: string; href: string | null; books: string[]; count: number; refs: { id: string; titleHe: string; href: string | null }[] }
export interface ReferencePage {
  book: TextbookMeta;
  tcodes: RefRow[];
  tables: RefRow[];
  fiori: RefRow[];
  glossary: { term: string; kind: string; he: string; books: string[]; href: string | null }[];
}

/** Shown per entry, as the old reference page showed: the first twelve. */
const REFS_SHOWN = 12;

export function referencePage(courseId: string): ReferencePage | null {
  const b = textbookOfCourse(courseId);
  const r = b ? bookReference(b.id) : null;
  if (!b || !r) return null;
  const cross = new Map<string, string[]>();
  for (const c of crossBookObjects()) cross.set(c.code, c.books);
  const row = (e: IndexEntry, link: (c: string) => string | null): RefRow => ({
    code: e.code,
    href: link(e.code),
    books: cross.get(e.code) ?? [],
    count: e.refs.length,
    refs: e.refs.slice(0, REFS_SHOWN).map((x) => ({ id: x.id, titleHe: x.titleHe, href: nodeHref(b.id, x.id, x.ch) })),
  });
  const kindLink: Record<string, (c: string) => string | null> = { "T-Code": txHref, "טבלה": tableLink, "אפליקציית Fiori": fioriLink };
  return {
    book: textbookMeta(b),
    tcodes: r.tcodes.map((e) => row(e, txHref)),
    tables: r.tables.map((e) => row(e, tableLink)),
    fiori: r.fiori.map((e) => row(e, fioriLink)),
    glossary: r.glossary.map((g) => ({ ...g, books: cross.get(g.term) ?? [], href: (kindLink[g.kind] ?? recordLink)(g.term) })),
  };
}

/* ------------------------------------------------------ academy totals */

export interface AcademyLibrary {
  books: TextbookMeta[];
  totals: { books: number; completed: number; queued: number; chapters: number; nodes: number; readMin: number; units: number };
  /** The objects shared by two or more textbooks — the first forty, as the old
   *  academy dashboard showed them. */
  cross: { code: string; kind: string; books: string[]; href: string | null }[];
  crossTotal: number;
}

export function academyLibrary(): AcademyLibrary {
  const all = crossBookObjects();
  const kindLink: Record<string, (c: string) => string | null> = { tcode: txHref, table: tableLink, fiori: fioriLink };
  return {
    books: textbookMetas(),
    totals: {
      books: ACADEMY_TOTALS.totalBooks,
      completed: ACADEMY_TOTALS.completed,
      queued: ACADEMY_TOTALS.plannedHe.length,
      chapters: ACADEMY_TOTALS.chapters,
      nodes: ACADEMY_TOTALS.nodes,
      readMin: ACADEMY_TOTALS.readMin,
      units: SEARCH_DOCS.length,
    },
    cross: all.slice(0, 40).map((c) => ({ ...c, href: (kindLink[c.kind] ?? recordLink)(c.code) })),
    crossTotal: all.length,
  };
}

/* ------------------------------------------------------ quality report */

export const structuralOf = (courseId: string) => {
  const b = textbookOfCourse(courseId);
  return b ? structuralReport(b.id) : null;
};

/** Flat node list of one textbook (search corpus rows), for counts. */
export const flatOf = (bookId: string) => FLAT[bookId] ?? [];
