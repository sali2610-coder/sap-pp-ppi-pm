/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORIES — the contract.
   ----------------------------------------------------------------------------
   Five directories answer the same shape of question that /neo/tables and
   /neo/transactions already answer: "which record, and does it survive the move
   to S/4HANA". So they share ONE record model and ONE surface, rather than five
   near-copies that drift apart.

     /neo/bapi/          BAPIs and Function Modules   (lib/bapi-registry)
     /neo/cds/           S/4HANA CDS views            (data/cds-map + enrichment)
     /neo/idoc/          IDoc message types           (lib/idoc-intel)
     /neo/fiori-apps/    Fiori applications           (data/fiori/apps)
     /neo/enhancements/  Enhancement techniques       (data/enhancements)

   DELIBERATELY FREE of any `@/data/*` import — exactly like ../data/types.ts and
   ../types.ts. The build-time server builders and the client surface both import
   this file, so it has to stay structural: a client component that imported the
   dataset for a *type* would drag the whole knowledge base into the browser
   bundle.

   HONESTY. Every optional string is "" and every list is empty when the project
   dataset is silent. Nothing is ever filled with a plausible value so a column
   can look complete: the surface prints `לא קיים מידע מאומת במאגר` instead.
   ========================================================================== */

/** The lucide glyphs the directories are allowed to use. A string key rather
 *  than a component so the server-side builders stay plain `.ts` modules with no
 *  React import, and the client surface owns the one icon map. */
export type RefIcon =
  | "plug" | "sigma" | "cable" | "layoutGrid" | "puzzle"
  | "table" | "terminal" | "boxes" | "gitBranch" | "database"
  | "shieldCheck" | "workflow" | "appWindow" | "keyRound" | "alertTriangle"
  | "bookOpen" | "wrench" | "arrowLeft" | "fileCode" | "users";

/** A state, in the one form globals.css allows: a small dot plus its word. */
export interface RefStatus {
  he: string;
  /** A CSS colour expression — `var(--status-*)` or a RISK_COLOR value. */
  color: string;
}

/** How the project data disposes of a record with respect to S/4HANA.
 *
 *   changed      the dataset states, in a structured field, that the record is
 *                superseded / not supported / carries a high-risk classic table.
 *                THIS is the only tone that earns the brand accent.
 *   replacement  the record IS the S/4 artefact, and the dataset names the
 *                classic ECC objects it stands in front of (CDS views, Fiori
 *                apps). Loud, module-toned, never brand.
 *   compare      the dataset stores an authored ECC statement and an authored
 *                S/4 statement as a pair. Both are shown verbatim.
 *   stable       a structured field says the record is available unchanged.
 *   unknown      the dataset is silent. Said in words, never guessed.
 */
export type RefTone = "changed" | "replacement" | "compare" | "stable" | "unknown";

/** One named fact. `label` is metadata, everything else is content — the two are
 *  set at different sizes and weights on purpose. A fact with nothing in it is
 *  never constructed; the builder omits it or supplies `absent`. */
export interface RefFact {
  label: string;
  /** Plain prose. */
  text?: string;
  /** Unordered points. */
  bullets?: string[];
  /** Numbered steps. */
  steps?: string[];
  /** Monospace SAP identifiers. `href` non-null makes it a real destination. */
  codes?: RefCode[];
  /** A preformatted block (ABAP skeleton, SELECT). Rendered LTR. */
  pre?: string;
  /** Rendered when the dataset is silent and the silence is itself the answer. */
  absent?: string;
}

export interface RefCode {
  t: string;
  /** A generated route, or null when the project has no page for this name. A
   *  null href renders an inert value — same information, nothing to click into
   *  a 404. */
  href?: string | null;
  /** Hebrew gloss shown under the code inside a link card. */
  he?: string;
  /** Module key, for the card's leading edge. */
  mod?: string;
}

export interface RefSubsection {
  title: string;
  facts: RefFact[];
}

export interface RefSection {
  id: string;
  icon: RefIcon;
  title: string;
  /** A real count, printed at the end of the heading rule. Never an estimate. */
  note?: string;
  facts?: RefFact[];
  subs?: RefSubsection[];
  /** Cards that navigate — related records inside this or another directory. */
  cards?: RefCard[];
  /** Shown INSTEAD of the body when there is nothing verified to show. */
  empty?: string;
}

export interface RefCard {
  href: string | null;
  code: string;
  he: string;
  mod?: string;
  /** Why this record is next to the one being read. */
  reason?: string;
}

/** The S/4HANA plate. It is the only block that is rendered even when the
 *  dataset is silent: "we do not know" is decision-relevant for a migration, and
 *  hiding it would be the lie. */
export interface RefS4 {
  tone: RefTone;
  /** The verdict, set at h1 scale. Always a real sentence. */
  headline: string;
  /** Where the verdict came from, in the project's own trust language. */
  statuses: RefStatus[];
  facts: RefFact[];
  /** The classic ECC tables the record binds to, with their own S/4 standing. */
  tables?: RefTableStanding[];
  /** Rendered under the plate when tone === "unknown". */
  warn?: string;
}

export interface RefTableStanding {
  name: string;
  he: string;
  href: string | null;
  note: string;
  status: RefStatus;
}

/** One full detail screen. Every directory builds this same object, so the five
 *  screens cannot drift from each other. */
export interface RefDetail {
  kind: RefDirId;
  /** Small caps line above the title — the directory and the module. */
  eyebrow: string;
  /** The technical identity. Monospace, LTR-isolated. */
  code: string;
  he: string;
  en: string;
  /** What to say when `en` is empty. Only the directories whose records really
   *  carry an English name set this; for a CDS view or an enhancement technique
   *  the technical name IS the English one, so the note would be noise and the
   *  line is simply not rendered. */
  enAbsent?: string;
  /** Module key (PM / PP-PI / …) or "" when the record is cross-application. */
  mod: string;
  modHe: string;
  /** Values under the title. Not controls. */
  chips: string[];
  statuses: RefStatus[];
  /** "12/18 עובדות מאומתות" — computed from the record, never a target. */
  completeness: string;
  s4: RefS4;
  sections: RefSection[];
  /** Where the record came from. Empty when the dataset stores no source. */
  sources: string[];
  /** Honest closing note, per directory. */
  foot: string;
}

/* -------------------------------------------------------------- directory */

export type RefDirId = "bapi" | "cds" | "idoc" | "fiori-apps" | "enhancements";

export interface RefFacet {
  id: string;
  he: string;
  n: number;
}

export interface RefStat {
  v: number;
  l: string;
  i: RefIcon;
}

/** A measured value carried on a row. The unit travels with the number so a
 *  bare figure is never read out on its own by a screen reader. */
export interface RefNum {
  i: RefIcon;
  /** Screen-reader prefix, e.g. "טבלאות ". */
  sr: string;
  v: string;
}

export interface RefRow {
  id: string;
  href: string;
  /** Technical identity — monospace, LTR. */
  name: string;
  he: string;
  en: string;
  /** Module keys. Two entries means the record is documented under both. */
  mods: string[];
  /** The record's own class: "BAPI" / "Interface (Basic)" / "BAdI" / … */
  kind: string;
  /** The secondary grouping key, in Hebrew — process area, module, category. */
  group: string;
  nums: RefNum[];
  s4: {
    tone: RefTone;
    /** The dot+word badge on the row. */
    status: RefStatus;
    /** One line of the S/4 story. "" when the dataset is silent. */
    text: string;
  };
  /** Capability facet ids this row satisfies. */
  caps: string[];
  /** A domain-meaningful measure the "by size" sort uses (0 when meaningless). */
  rank: number;
  /** Lowercased haystack, built once at build time. */
  hay: string;
}

export interface RefDir {
  id: RefDirId;
  /** sessionStorage surface id for smart-return. */
  surface: string;
  eyebrow: string;
  title: string;
  lede: string;
  icon: RefIcon;
  stats: RefStat[];
  rows: RefRow[];
  mods: RefFacet[];
  kinds: RefFacet[];
  kindsLabel: string;
  caps: RefFacet[];
  /** Label of the "group" view tab, e.g. "לפי תחום תהליכי". */
  groupLabel: string;
  /** Label of the numeric sort, or "" to hide it. */
  rankLabel: string;
  searchPlaceholder: string;
  foot: string;
  /** Rendered when a filter combination matches nothing. */
  emptyNote: string;
}
