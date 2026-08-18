// Project NEO · Stage 2B — the build-time spine of the Books entry surface.
//
// Executed on the SERVER by app/neo/books/page.tsx. Nothing here is authored:
// every title, module, chapter and section count is read through the EXISTING
// book registry (lib/library/registry.ts), which is the same accessor the
// reader route at /library/[bookId] uses. data/books/** is neither re-parsed
// here nor touched — the registry is the one door in.
//
// HONESTY RULE, ported from components/neo-shell/nav-data.ts: a number is
// rendered only when the project data backs one. A book without a page count in
// its metadata carries `pages: null` and the surface says so in words rather
// than filling the gap. A module with no technical dictionary behind it gets an
// explicit sentence, never a link that implies coverage that does not exist.

import { allBookIds, getBook } from "@/lib/library/registry";
import { chapterTitle, sectionTitle } from "@/lib/library/book";
import { isExactSection } from "./links";
import { KIND_LABEL, identityOf, type BookKind } from "@/lib/book-identity";
import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import { overviewStats } from "@/lib/module-portal";
import { FIORI_APPS } from "@/data/fiori/apps";

/* ------------------------------------------------------------------ palette */

/** Module hue as a CSS var reference — one per module token declared in
 *  app/globals.css. MODULE colour is only ever used here as a surface tint,
 *  ring, edge or section marker; never as a small standalone dot, which is the
 *  form reserved for --status-*. */
const MOD_VAR: Record<string, string> = {
  "PM": "var(--mod-pm)",
  "PP": "var(--mod-pp)",
  "PP-PI": "var(--mod-pppi)",
  "PP/DS": "var(--mod-ppds)",
  "MM": "var(--mod-mm)",
  "QM": "var(--mod-qm)",
  "EWM": "var(--mod-ewm)",
  "Fiori": "var(--mod-fiori)",
  "S&OP": "var(--mod-sop)",
  "S/4HANA": "var(--mod-s4)",
};

/** Hebrew module names exactly as the product already writes them elsewhere
 *  (lib/primary-module.ts MODULE_HE, data/library/academy-index.ts titles).
 *  Nothing new is coined for a module. */
const MOD_HE: Record<string, string> = {
  "PM": "תחזוקת מפעל",
  "PP": "תכנון ייצור",
  "PP-PI": "ייצור תהליכי",
  "PP/DS": "תכנון מתקדם",
  "MM": "רכש ואספקה",
  "QM": "ניהול איכות",
  "EWM": "ניהול מחסן",
  "S&OP": "תכנון מכירות ותפעול",
  "Fiori": "אפליקציות Fiori",
  "S/4HANA": "יסודות S/4HANA",
};

/** Shelf order. Modules the NEO dictionary actually documents come first — the
 *  page is an entry into NEO, so the books that connect to it lead. */
const MOD_ORDER = ["PM", "PP", "PP/DS", "QM", "MM", "EWM", "S&OP", "Fiori", "S/4HANA"];

/* ------------------------------------------------------------------- cloth */

/**
 * BINDING CLOTH — one colour per BOOK, not one colour per module.
 *
 * The shelf used to dress every book in its module's hue, which meant the four
 * PM books were four identical objects and a shelf of eleven books wore six
 * colours. A real library does not look like that: a publisher binds each title
 * in its own cloth, and that is most of what lets you find a book you have seen
 * before without reading a single spine.
 *
 * WHAT IS COLOUR AND WHAT IS DATA. This is presentation and nothing else — no
 * SAP fact, no book metadata and no claim about the book is encoded in it. The
 * MODULE keeps every mark that carries meaning: the code stamped on the cover
 * and down the spine, the foil rule, the shelf edge, the selected ring, the
 * grouping itself. All of those still read `--m`. The cloth is the object; the
 * module hue is what is printed on it.
 *
 * THE SCHEME. Twelve bindings from one family: deep, low-chroma, dark enough
 * that foil-white type sits on them at contrast in both themes, and ordered so
 * that neighbours on the shelf never land on the same family. Assigned by the
 * book's position in the shelf's own sorted order, so it is stable across
 * builds, identical on the shelf, the hub, the quick view and the reader, and a
 * twelfth book gets the twelfth binding rather than falling off the end.
 */
const CLOTH = [
  "#7c2230", // oxblood
  "#1f3a5f", // navy
  "#2f5d4e", // forest
  "#6b4a23", // russet leather
  "#3d3b56", // slate violet
  "#14524f", // teal
  "#7a4a12", // ochre
  "#4a2c5a", // plum
  "#24384a", // steel
  "#5a2030", // claret
  "#2d4a2c", // olive
  "#343b45", // graphite
];

/** How the book is built, in the reader's words. `structure` is a real field on
 *  the book metadata and is what explains book7's 1,689 sections. */
const STRUCTURE_HE: Record<string, string> = {
  narrative: "ספר קריאה — פרקים רציפים",
  catalogue: "קטלוג — ערך לכל אפליקציה",
  reference: "מדריך עיון",
};

/* -------------------------------------------------------------------- types */

/** One real subchapter, as a tuple: [id, title].
 *
 *  A tuple rather than an object on purpose. There are 4,314 sections across the
 *  eleven books and this list is serialised into a statically exported page;
 *  `{"id":…,"title":…}` would spend roughly 90 KB on repeating two key names,
 *  and the href is derivable (./links.ts) so it is not shipped either. */
export type SectionRow = [id: string, title: string];

export interface BookChapterRow {
  n: number;
  title: string;
  /** How many subchapters — the number the shelf already showed. */
  sections: number;
  /** The subchapters themselves, in the book's own order. Never trimmed and
   *  never generated: this IS data/books/<id>.json's `sections`. */
  rows: SectionRow[];
}

/** Where the NEO dictionary can take this book's module next. `null` when the
 *  dictionary holds nothing for it — the caller then prints `dictNote`. */
export interface BookDict {
  href: string;
  code: string;
  he: string;
  tables: number;
  fields: number;
  /** Set when the book's own module tag and the dictionary's module differ. */
  caveat: string | null;
}

export interface BookCard {
  id: string;
  /** The EXISTING library URL. Unchanged, unwrapped, and the only way out. */
  href: string;
  /** NEO's own control surface for this book. Not a reader. */
  hubHref: string;
  titleEn: string;
  titleHe: string | null;
  module: string;
  moduleHe: string;
  mod: string;
  kind: BookKind | null;
  kindLabel: string | null;
  structure: string;
  structureHe: string;
  publisher: string | null;
  pages: number | null;
  /** Only some books carry a figure count in their metadata. */
  figures: number | null;
  chapters: number;
  sections: number;
  /** True when EVERY section id in this book is a dotted number, i.e. when the
   *  reader's `?s=` lander will accept it and land on the subchapter itself. */
  exact: boolean;
  /** Set only when `exact` is false: says, in words, what the rows will do
   *  instead. Never a promise the reader cannot keep. */
  exactNote: string | null;
  chapterRows: BookChapterRow[];
  dict: BookDict | null;
  dictNote: string | null;
  /** A registry elsewhere in NEO that indexes the same subject. Only set when
   *  one genuinely exists. */
  near: { href: string; label: string; n: number } | null;
  /** Titles too long to sit at the cover's largest size get a smaller step. */
  fit: "s" | "m" | "l";
  /** This book's binding cloth. Presentation only — see CLOTH above. Module
   *  identity is carried by `mod`, which every printed mark still uses. */
  cloth: string;
  /** 0..1 — how thick the book's 3D block is drawn.
   *
   *  A real book's thickness IS its page count, so this is the book's own
   *  `pages` normalised across the shelf's own min and max (both measured, not
   *  hard-coded, so adding a twelfth book re-proportions the shelf rather than
   *  falling off a fixed scale). It drives DEPTH ONLY. It is never printed, and
   *  it never becomes a page number: a book whose metadata carries no page count
   *  is drawn at the shelf's midpoint and says `thickFrom: "neutral"` so the
   *  surface can decline to imply a size it does not know. */
  thick: number;
  thickFrom: "pages" | "neutral";
}

export interface BooksData {
  books: BookCard[];
  /** One shelf. `chapters`/`sections` are the sums of the books on it, so a
   *  shelf header can state its own weight without the surface re-adding it. */
  groups: { module: string; moduleHe: string; mod: string; ids: string[]; chapters: number; sections: number }[];
  totals: {
    books: number;
    chapters: number;
    sections: number;
    pages: number;
    pagesMissing: number;
    modules: number;
    withDict: number;
  };
  dictModules: { code: string; he: string; mod: string; href: string; tables: number; fields: number }[];
  /** book8 / book9 carry the same guide in two field schemas. The registry says
   *  so; the surface repeats it rather than hiding one of them. */
  twinNote: string | null;
}

/* --------------------------------------------------------------------- data */

export function booksData(): BooksData {
  const pm = overviewStats(PM_DATA);
  const pp = overviewStats(PPPI_DATA);

  const dictOf = (module: string): { dict: BookDict | null; note: string | null } => {
    if (module === "PM") {
      return {
        dict: { href: "/neo/pm/", code: "PM", he: MOD_HE.PM, tables: pm.tables, fields: pm.fields, caveat: null },
        note: null,
      };
    }
    // The rail already treats a PP book as belonging to the PP-PI environment
    // (components/neo-shell/nav-data.ts, booksFor). The overlap is real but it
    // is not an identity, so it is stated instead of glossed over.
    if (module === "PP" || module === "PP-PI") {
      return {
        dict: {
          href: "/neo/pp-pi/",
          code: "PP-PI",
          he: MOD_HE["PP-PI"],
          tables: pp.tables,
          fields: pp.fields,
          caveat: module === "PP" ? "הספר מתויג PP; המילון מתעד ייצור תהליכי (PP-PI). הכיסוי חופף אך אינו זהה." : null,
        },
        note: null,
      };
    }
    return {
      dict: null,
      note: `אין מילון טכני ל-${module} ב-Project NEO. המילון מתעד היום את PM ואת PP-PI בלבד, והספר הזה נשען על עצמו.`,
    };
  };

  const books: BookCard[] = [];

  for (const id of allBookIds()) {
    const b = getBook(id);
    if (!b) continue;

    const titleEn = b.meta.title.en;
    const titleHe = b.meta.title.he?.trim() || null;
    const shown = titleHe || titleEn;
    const rows: BookChapterRow[] = b.chapters.map((c) => ({
      n: c.n,
      title: chapterTitle(c),
      sections: c.sections.length,
      rows: c.sections.map((s): SectionRow => [s.id, sectionTitle(s)]),
    }));
    const sections = rows.reduce((n, r) => n + r.sections, 0);
    const identity = identityOf(b.id);
    const { dict, note } = dictOf(b.meta.module);
    const exact = rows.every((r) => r.rows.every(([id]) => isExactSection(id)));
    // `figures` is present on some books' metadata and absent on others. The
    // shared BookMeta type does not declare it, so it is read explicitly rather
    // than widened — and stays null when the book does not carry one.
    const figures = (b.meta as { figures?: unknown }).figures;

    books.push({
      id: b.id,
      href: `/library/${b.id}/`,
      hubHref: `/neo/books/${b.id}/`,
      titleEn,
      titleHe,
      module: b.meta.module,
      moduleHe: MOD_HE[b.meta.module] ?? b.meta.module,
      mod: MOD_VAR[b.meta.module] ?? "var(--ink-3)",
      kind: identity?.kind ?? null,
      kindLabel: identity ? KIND_LABEL[identity.kind] : null,
      structure: b.meta.structure,
      structureHe: STRUCTURE_HE[b.meta.structure] ?? b.meta.structure,
      publisher: b.meta.publisher?.trim() || null,
      pages: typeof b.meta.pages === "number" ? b.meta.pages : null,
      figures: typeof figures === "number" ? figures : null,
      chapters: b.chapters.length,
      sections,
      exact,
      exactNote: exact
        ? null
        : "מזהי הערכים בספר הזה הם מזהי אפליקציות Fiori ולא מספרי סעיף, והקישור העמוק של הקורא מקבל מספרי סעיף בלבד. לחיצה על ערך פותחת את הפרק שלו בקורא, לא את הערך עצמו.",
      chapterRows: rows,
      dict,
      dictNote: note,
      near:
        b.meta.module === "Fiori"
          ? { href: "/neo/fiori-apps/", label: "מרשם ה-Fiori של NEO", n: FIORI_APPS.length }
          : null,
      fit: shown.length <= 34 ? "s" : shown.length <= 54 ? "m" : "l",
      // Both filled by the passes below, which need the whole shelf first: the
      // cloth by shelf position, the thickness by the shelf's own page range.
      cloth: CLOTH[0],
      thick: 0.5,
      thickFrom: "neutral",
    });
  }

  /* THICKNESS. Measured across the shelf that actually loaded, so the thinnest
     real book is the thinnest block and the thickest real book is the thickest
     one. A book without a page count is left at the midpoint it was seeded with
     and keeps `thickFrom: "neutral"` — the cover then prints "עמודים לא
     מתועדים" instead of a figure, and the block claims no size it cannot back. */
  const counted = books.map((b) => b.pages).filter((p): p is number => p !== null);
  if (counted.length > 1) {
    const lo = Math.min(...counted);
    const hi = Math.max(...counted);
    const span = hi - lo;
    for (const b of books) {
      if (b.pages === null || span <= 0) continue;
      b.thick = Math.round(((b.pages - lo) / span) * 100) / 100;
      b.thickFrom = "pages";
    }
  }

  const order = (m: string) => {
    const i = MOD_ORDER.indexOf(m);
    return i < 0 ? MOD_ORDER.length : i;
  };
  books.sort((a, b) => order(a.module) - order(b.module) || a.id.localeCompare(b.id, "en", { numeric: true }));

  /* THE BINDINGS, handed out AFTER the sort so a book's cloth is its position on
     the shelf and not the order the registry happened to return. Deterministic,
     so every surface that draws this book draws the same object. */
  books.forEach((b, i) => { b.cloth = CLOTH[i % CLOTH.length]; });

  const groups: BooksData["groups"] = [];
  for (const bk of books) {
    const g = groups.find((x) => x.module === bk.module);
    if (g) {
      g.ids.push(bk.id);
      g.chapters += bk.chapters;
      g.sections += bk.sections;
    } else {
      groups.push({
        module: bk.module,
        moduleHe: bk.moduleHe,
        mod: bk.mod,
        ids: [bk.id],
        chapters: bk.chapters,
        sections: bk.sections,
      });
    }
  }

  const twins = books.filter((b) => b.module === "PM" && b.kind === "business-user").map((b) => b.id);

  return {
    books,
    groups,
    totals: {
      books: books.length,
      chapters: books.reduce((n, b) => n + b.chapters, 0),
      sections: books.reduce((n, b) => n + b.sections, 0),
      pages: books.reduce((n, b) => n + (b.pages ?? 0), 0),
      pagesMissing: books.filter((b) => b.pages === null).length,
      modules: groups.length,
      withDict: books.filter((b) => b.dict).length,
    },
    dictModules: [
      { code: "PM", he: MOD_HE.PM, mod: MOD_VAR.PM, href: "/neo/pm/", tables: pm.tables, fields: pm.fields },
      { code: "PP-PI", he: MOD_HE["PP-PI"], mod: MOD_VAR["PP-PI"], href: "/neo/pp-pi/", tables: pp.tables, fields: pp.fields },
    ],
    twinNote:
      twins.length === 2
        ? `${twins[0]} ו-${twins[1]} הם אותו מדריך משתמש עסקי בשתי סכימות שדה שונות. שניהם מוצגים כאן כפי שהם קיימים במאגר, ולא מאוחדים לכרטיס אחד.`
        : null,
  };
}

/* ----------------------------------------------------------------- one book */

export interface BookHubData {
  book: BookCard;
  /** The other books on the same shelf. Real neighbours, not "related". */
  shelf: { id: string; title: string; hubHref: string }[];
  /** Shelf identity, so the hub carries the module it belongs to. */
  module: { code: string; he: string; mod: string; books: number };
}

/**
 * The build-time payload for /neo/books/<id>/.
 *
 * Deliberately per-book: the eleven books hold 4,314 subchapters between them
 * and book7 alone is 1,689 of them, so a hub that carried all of them would put
 * every other book's table of contents into the page you asked for.
 */
export function bookHubData(id: string): BookHubData | null {
  const d = booksData();
  const book = d.books.find((b) => b.id === id);
  if (!book) return null;
  const group = d.groups.find((g) => g.module === book.module);
  return {
    book,
    shelf: (group?.ids ?? [])
      .filter((x) => x !== id)
      .map((x) => d.books.find((b) => b.id === x))
      .filter((b): b is BookCard => Boolean(b))
      .map((b) => ({ id: b.id, title: b.titleHe || b.titleEn, hubHref: b.hubHref })),
    module: {
      code: book.module,
      he: book.moduleHe,
      mod: book.mod,
      books: group?.ids.length ?? 1,
    },
  };
}

/** Ids for generateStaticParams — the registry's own list, unfiltered. */
export function bookIds(): string[] {
  return allBookIds();
}
