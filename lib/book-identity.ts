// Canonical book identity — one source of truth for how a book LOOKS.
//
// The library shelf, the reader, the command palette and Ask AI each knew a
// different subset of this: the shelf had titles and page counts, the AI tree
// had its own module map, and nothing carried colour. The result was eleven
// cards that looked interchangeable and an AI surface with none of the shelf's
// identity. Anything that renders a book reads from here.
//
// Colour is assigned per MODULE, not per book, so two PM books are visibly the
// same family. Values are drawn from the palettes already used elsewhere in the
// site (academy-index tints) rather than a new scale, and each one is a real
// hex so it can be used in gradients, rings and inline styles alike.

export type BookModule =
  | "PM" | "PP" | "PP-PI" | "QM" | "MM" | "EWM" | "PP/DS" | "S&OP" | "Fiori" | "S/4HANA";

/** How a book was published — drives the shelf grouping. */
export type BookKind = "sap-press" | "business-user" | "configuration" | "reference" | "foundation";

export interface BookIdentity {
  bookId: string;            // book1 … book11 — what the AI backend indexes by
  shelfId: string | null;    // id in data/library.ts, null when not on the shelf
  module: BookModule;
  kind: BookKind;
  /** Accent used for the title, badge and active states. */
  accent: string;
  /** Tinted surface for badges and soft fills. */
  soft: string;
  /** Two stops for the cover spine. */
  spine: [string, string];
}

const M: Record<BookModule, { accent: string; soft: string; spine: [string, string] }> = {
  // PM keeps the house red: it is the flagship module of Project NEO.
  "PM":      { accent: "#d62027", soft: "#fef2f2", spine: ["#d62027", "#a3171c"] },
  "PP":      { accent: "#b91c1c", soft: "#fef2f2", spine: ["#b91c1c", "#7f1d1d"] },
  "PP-PI":   { accent: "#9f1239", soft: "#fff1f2", spine: ["#9f1239", "#6b0f28"] },
  "PP/DS":   { accent: "#7c3aed", soft: "#f5f3ff", spine: ["#7c3aed", "#5b21b6"] },
  "QM":      { accent: "#047857", soft: "#ecfdf5", spine: ["#047857", "#065f46"] },
  "MM":      { accent: "#1d4ed8", soft: "#eff6ff", spine: ["#1d4ed8", "#1e3a8a"] },
  "EWM":     { accent: "#c2410c", soft: "#fff7ed", spine: ["#c2410c", "#7c2d12"] },
  "S&OP":    { accent: "#0e7490", soft: "#ecfeff", spine: ["#0e7490", "#155e75"] },
  "Fiori":   { accent: "#a21caf", soft: "#fdf4ff", spine: ["#a21caf", "#701a75"] },
  "S/4HANA": { accent: "#57534e", soft: "#fafaf9", spine: ["#57534e", "#292524"] },
};

const DEF: Array<[string, string | null, BookModule, BookKind]> = [
  ["book1",  "config-pm",             "PM",      "configuration"],
  ["book2",  "production-planning",   "PP",      "sap-press"],
  ["book3",  "sourcing-procurement",  "MM",      "sap-press"],
  ["book4",  "pp-ds",                 "PP/DS",   "sap-press"],
  ["book5",  "quality-management",    "QM",      "sap-press"],
  ["book6",  "warehouse-management",  "EWM",     "sap-press"],
  ["book7",  "fiori-apps",            "Fiori",   "reference"],
  // book8 is the same title as book9 in a different field schema; it is not on
  // the shelf, and the audit reports the divergence rather than hiding it.
  ["book8",  null,                    "PM",      "business-user"],
  ["book9",  "pm-business-user",      "PM",      "business-user"],
  ["book10", "ibp-sop",               "S&OP",    "sap-press"],
  ["book11", "s4-foundation",         "S/4HANA", "foundation"],
];

export const BOOK_IDENTITY: Record<string, BookIdentity> = Object.fromEntries(
  DEF.map(([bookId, shelfId, module, kind]) => [
    bookId,
    { bookId, shelfId, module, kind, ...M[module] },
  ]),
);

/** Shelf groupings, in the order the library should present them. */
export const KIND_LABEL: Record<BookKind, string> = {
  "sap-press": "SAP PRESS",
  "configuration": "מדריכי הגדרה · Configuration",
  "business-user": "מדריכי משתמש עסקי · Business User",
  "reference": "מדריכי עיון · Reference",
  "foundation": "יסודות S/4HANA",
};

export const identityOf = (bookId?: string | null): BookIdentity | null =>
  (bookId && BOOK_IDENTITY[bookId]) || null;

export const identityByShelfId = (shelfId: string): BookIdentity | null =>
  Object.values(BOOK_IDENTITY).find((b) => b.shelfId === shelfId) ?? null;

/** Inline style helpers so a caller never re-derives the palette. */
export const accentVars = (id: BookIdentity | null): React.CSSProperties =>
  id ? ({ "--bk-accent": id.accent, "--bk-soft": id.soft } as React.CSSProperties) : {};

export const spineGradient = (id: BookIdentity | null) =>
  id ? `linear-gradient(160deg, ${id.spine[0]}, ${id.spine[1]})` : "linear-gradient(160deg,#57534e,#292524)";
