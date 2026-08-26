/* ============================================================================
   PROJECT NEO · /neo/transactions/<CODE>/ — the builder.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time only. It reads the verified datasets and
   returns one small, plain, serialisable record per transaction, so the detail
   page can be a server component and the browser never receives the registry a
   second time.

   THE ONLY RULE THAT MATTERS HERE
     Nothing is invented. Every string below is either copied from a dataset or
     computed from one. Where a dataset is silent the field is "" or [], the
     screen omits the block, and the places where silence itself is the answer
     say `לא קיים מידע מאומת` in words. There is no "reasonable default", no
     inferred module, no plausible Fiori app and no remembered SAP Note.

   WHERE EACH FACT COMES FROM
     lib/tx-registry     code · module · area · Hebrew title · English title ·
                         depth. The canonical union of the four sources.
     data/tx-intel       the authored deep record (539 codes): purpose, process,
                         when / when-not, tables, BAPIs, exits, auth objects,
                         Fiori successor, S/4 note and delta, errors, mistakes,
                         relationship graph, sources, verification flag.
     data/transactions   the 60 authored 14-column records, used for the codes
                         tx-intel does not carry — including their structured
                         eccS4 block.
     lib/object-intel    tables the PM / PP-PI BLUEPRINT itself lists under this
                         T-Code. A different kind of evidence from the authored
                         list, so it is marked as such and never merged silently.
     lib/tx-facets       Topic / Object classification. Conservative by
                         construction: an unclassifiable code carries no tag.
     lib/tx-intel        the cross-reference graph — recommendations, what leads
                         into this code, how often the graph references it.
     data/troubleshooting  incidents whose own analysis list names this code.
     data/exits          enhancements whose own T-Code list names this code.
     lib/s4              the shared S/4 vocabulary (TRUST_HE / RISK_HE /
                         RISK_COLOR) and s4For(), reused verbatim for the S/4
                         disposition of each related TABLE.
   ========================================================================== */

import { ALL_TABLES } from "@/data/sapData";
import { TX_INTEL } from "@/data/tx-intel";
import { TRANSACTIONS } from "@/data/transactions";
import { INCIDENTS } from "@/data/troubleshooting";
import { EXITS } from "@/data/exits";
import { registryCodes, registryTx, txRegistry, type RegistryTx } from "@/lib/tx-registry";
import { txLeadingInto, txPopularity, txRecommend } from "@/lib/tx-intel";
import { facetsOf } from "@/lib/tx-facets";
import { tcodeIntel } from "@/lib/object-intel";
import { s4For } from "@/lib/s4";
import { tableNames } from "@/components/neo-shell/object/object-data";

/** The exact set app/neo/object/[name] generates. Built once per module load. */
const OBJECT_ROUTES: ReadonlySet<string> = new Set(tableNames());

/* ------------------------------------------------------------------ types */

export interface TxRef {
  code: string;
  he: string;
  module: string;
  /** Why this code is next to that one — the dataset's own word for it. */
  reason: string;
  href: string;
}

export interface TxTableRef {
  name: string;
  he: string;
  /** "authored" = the transaction record names it. "blueprint" = the PM/PP-PI
   *  dictionary lists this T-Code on the table. Two different claims. */
  from: "authored" | "blueprint";
  /** S/4 disposition of the TABLE, from lib/s4. null when the dictionary has
   *  nothing to say and the table therefore needs verification in SAP. */
  risk: "high" | "medium" | "low" | "none";
  trust: "verified" | "partial" | "needs";
  note: string;
  /** null when no /neo/object page is generated for this table — the dictionary
   *  covers PM/PP-PI only, but a transaction may legitimately name an FI or SD
   *  table. The view renders those as a value rather than a link. */
  href: string | null;
}

export interface TxIssue {
  he: string;
  detail: string;
  /** "error" = a message the transaction really raises. "mistake" = a documented
   *  implementation error. "incident" = a full incident record in the KB. */
  kind: "error" | "mistake" | "incident";
}

export type S4Disposition = "superseded" | "changed" | "available" | "unknown";

export interface TxS4 {
  disposition: S4Disposition;
  /** Hebrew headline for the disposition. Always one of four fixed strings. */
  he: string;
  /** The dataset's own S/4 sentence(s). "" when there are none. */
  note: string;
  /** The ECC6 → S/4HANA delta, when the record carries one. */
  delta: string;
  /** Codes THIS transaction replaced, as the dataset declares them. */
  replaces: string[];
  /** Codes that declare THIS one obsolete — a reverse read of the same field. */
  supersededBy: string[];
  /** Fiori successor exactly as written in the dataset. "" when unnamed. */
  fiori: string;
  /** Structured ECC↔S/4 block, only on the 60 authored records that carry one. */
  unchanged: string;
  migration: string;
  cds: string;
  risk: "high" | "medium" | "low" | "none";
  trust: "verified" | "partial" | "needs";
}

export interface TxDetail {
  code: string;
  module: string;
  moduleHe: string;
  area: string;
  he: string;
  en: string;
  depth: "deep" | "light";
  /** "verified" only when the record itself carries the flag. */
  verified: boolean;
  sources: string[];
  popularity: number;

  purpose: string;
  tech: string;
  process: string;
  whenUse: string;
  whenNot: string;
  users: string[];
  prereq: string[];
  flow: string[];
  selection: string[];

  topics: string[];
  objects: string[];
  tables: TxTableRef[];
  bapis: string[];
  exits: string[];
  badis: string[];
  enhancements: string[];
  auth: string[];
  cds: string[];

  s4: TxS4;
  neighbours: TxRef[];
  issues: TxIssue[];
  /** How many of the 14 named facts the dataset actually answers. Honest
   *  completeness, computed — not a rating. */
  known: number;
  total: number;
}

/* ------------------------------------------------------------- small maps */

const MODULE_HE: Record<string, string> = {
  PM: "אחזקה",
  PP: "ייצור",
  "PP-PI": "ייצור תהליכי",
  QM: "איכות",
  MM: "חומרים",
  SD: "מכירות",
  FI: "כספים",
  CO: "בקרה",
  PS: "פרויקטים",
  WM: "ניהול מחסן",
  LE: "לוגיסטיקה",
  HR: "משאבי אנוש",
  BASIS: "בסיס",
  ABAP: "פיתוח",
  SECURITY: "אבטחה והרשאות",
  INTEGRATION: "אינטגרציה",
  FIORI: "Fiori",
};

export const txModuleHe = (m: string): string => MODULE_HE[m] || "";

const href = (code: string) => `/neo/transactions/${encodeURIComponent(code)}/`;
const clean = (s?: string) => (s || "").trim();
const list = (a?: string[]) => (a || []).map(clean).filter(Boolean);
const uniq = <T,>(a: T[]) => [...new Set(a)];

/* --------------------------------------------------- reverse obsolete map
   `obsolete: ["CJ01", …]` on CJ20N means CJ20N is what those codes became. Read
   the other way round it is the single most decision-relevant S/4 fact a code
   can carry: this transaction has a successor. It is a real dataset relation,
   not an inference. */

let _superseded: Map<string, string[]> | null = null;
function supersededIndex(): Map<string, string[]> {
  if (_superseded) return _superseded;
  const m = new Map<string, string[]>();
  for (const t of Object.values(TX_INTEL)) {
    for (const old of t.obsolete || []) {
      const k = clean(old).toUpperCase();
      // Some records list themselves in `obsolete` (XD01/XD02/XD03 and others
      // that were folded into Business Partner). Read literally that would make
      // a transaction its own successor, which is not a fact — it is a data
      // quirk. Those codes still land on "superseded" through their own S/4
      // note, at partial trust, which is the honest reading.
      if (!k || k === t.code) continue;
      const cur = m.get(k) || [];
      if (!cur.includes(t.code)) cur.push(t.code);
      m.set(k, cur);
    }
  }
  _superseded = m;
  return m;
}

/* --------------------------------------------------------- the S/4 block */

// Conservative, and deliberately shaped like lib/s4.ts's own derivation: a
// disposition is raised only on an explicit signal in the dataset's own words,
// and the trust level says out loud whether it came from a declared relation
// ("verified") or from reading a note ("partial").
const OBSOLETE_RE = /\bobsolete\b|deprecat|לא זמינה|אינה זמינה|אינה קיימת|הוסרה|בוטלה|removed|no longer/i;
const CHANGED_RE = /שונת|שינוי|שינויים|החליפ|הוחלפ|מוחלפת|replaced|changed|העדף|ממליצה|מומלצת/i;

function buildS4(code: string, intel: (typeof TX_INTEL)[string] | undefined, authored: (typeof TRANSACTIONS)[number] | undefined): TxS4 {
  const note = clean(intel?.s4) || clean(authored?.eccS4?.changed);
  const delta = clean(intel?.s4Delta) || clean(authored?.eccS4?.migration);
  const fiori = clean(intel?.fiori) || clean(authored?.fiori) || clean(authored?.eccS4?.fiori);
  const replaces = list(intel?.obsolete).map((x) => x.toUpperCase());
  const supersededBy = supersededIndex().get(code) || [];
  const unchanged = clean(authored?.eccS4?.unchanged);
  const cds = clean(authored?.eccS4?.cds);

  let disposition: S4Disposition;
  let risk: TxS4["risk"];
  let trust: TxS4["trust"];

  if (supersededBy.length) {
    // A declared relation, not a reading of prose.
    disposition = "superseded"; risk = "high"; trust = "verified";
  } else if (note && OBSOLETE_RE.test(note)) {
    disposition = "superseded"; risk = "high"; trust = "partial";
  } else if (delta || (note && CHANGED_RE.test(note))) {
    disposition = "changed"; risk = "medium"; trust = intel?.verified === "verified" ? "verified" : "partial";
  } else if (note || unchanged) {
    disposition = "available"; risk = "low"; trust = intel?.verified === "verified" ? "verified" : "partial";
  } else {
    disposition = "unknown"; risk = "none"; trust = "needs";
  }

  const HE: Record<S4Disposition, string> = {
    superseded: "יש יורש ב-S/4HANA",
    changed: "משתנה ב-S/4HANA",
    available: "זמינה ב-S/4HANA",
    unknown: "לא קיים מידע מאומת",
  };

  return { disposition, he: HE[disposition], note, delta, replaces, supersededBy, fiori, unchanged, migration: clean(authored?.eccS4?.migration), cds, risk, trust };
}

/* ------------------------------------------------------------- the build */

const tableIndex = (() => {
  let m: Map<string, { he: string; s4: string; alt: string }> | null = null;
  return () => {
    if (m) return m;
    m = new Map();
    for (const t of ALL_TABLES) {
      if (m.has(t.tableName)) continue;
      m.set(t.tableName, {
        he: clean(t.descriptionHe) || clean(t.descriptionEn),
        s4: clean(t.s4Note),
        alt: clean(t.s4AltTable),
      });
    }
    return m;
  };
})();

function tablesFor(code: string, authoredNames: string[]): TxTableRef[] {
  const idx = tableIndex();
  const blueprint = new Set((tcodeIntel(code)?.tables || []).map((t) => t.name.toUpperCase()));
  const names = uniq([...authoredNames.map((n) => n.toUpperCase()), ...blueprint]);
  return names.map((name) => {
    const meta = idx.get(name);
    // s4For is the product's ONE S/4 verdict for a table. Reused rather than
    // re-derived, so /neo/transactions and the S/4 surfaces cannot disagree.
    const st = s4For(name, meta?.s4, meta?.alt);
    return {
      name,
      he: meta?.he || "",
      from: authoredNames.some((n) => n.toUpperCase() === name) ? "authored" : "blueprint",
      risk: st.risk,
      trust: st.trust,
      note: clean(st.impact?.changed),
      // Only link to an object page that is actually generated. A transaction
      // can name any table in SAP, but /neo/object/[name] is built from the
      // PM/PP-PI dictionary alone — FI tables such as BSEG, BKPF, ANLA and
      // ANEP appear on these pages and have no route. Linking them produced
      // 1,237 dead links, which the export cannot 404 gracefully because
      // dynamicParams is false. A table with no page stays a plain value.
      href: OBJECT_ROUTES.has(name) ? `/neo/object/${encodeURIComponent(name)}/` : null,
    } satisfies TxTableRef;
  }).sort((a, b) => {
    const w = { high: 0, medium: 1, low: 2, none: 3 } as const;
    return w[a.risk] - w[b.risk] || a.name.localeCompare(b.name);
  });
}

function neighboursFor(code: string, reg: RegistryTx): TxRef[] {
  const seen = new Set<string>([code]);
  const out: TxRef[] = [];
  const push = (c: string, reason: string) => {
    const k = clean(c).toUpperCase();
    if (!k || seen.has(k)) return;
    const r = registryTx(k);
    if (!r) return;                       // never link at a page that does not exist
    seen.add(k);
    out.push({ code: k, he: r.he || r.en || "", module: r.module, reason, href: href(k) });
  };

  // 1. the authored relationship graph, in the order the engine ranks it
  for (const r of txRecommend(code, 8)) push(r.code, r.reason);
  // 2. what the graph says leads INTO this code
  for (const c of txLeadingInto(code).slice(0, 4)) push(c, "מוביל לכאן");
  // 3. only if the graph is silent: the registry's own grouping. Labelled as
  //    grouping, not as a process relation, because that is all it is.
  if (out.length < 4) {
    for (const t of txRegistry().values()) {
      if (out.length >= 8) break;
      if (t.module !== reg.module || !t.area || t.area !== reg.area) continue;
      push(t.code, "באותו אזור במאגר");
    }
  }
  return out.slice(0, 10);
}

function issuesFor(code: string, intel: (typeof TX_INTEL)[string] | undefined, authored: (typeof TRANSACTIONS)[number] | undefined): TxIssue[] {
  const out: TxIssue[] = [];
  for (const e of list(intel?.commonErrors).concat(list(authored?.errors))) out.push({ he: e, detail: "", kind: "error" });
  for (const m of list(intel?.mistakes)) out.push({ he: m, detail: "", kind: "mistake" });
  for (const i of INCIDENTS) {
    if (!(i.analyzeTcodes || []).some((x) => clean(x).toUpperCase() === code)) continue;
    out.push({ he: i.he, detail: clean(i.symptom), kind: "incident" });
  }
  return out.slice(0, 14);
}

/** Every code the NEO transaction registry knows — i.e. exactly the set of
 *  pages /neo/transactions/[code] generates, and exactly the set of codes any
 *  NEO surface is allowed to link at. */
export const txDetailCodes = (): string[] => registryCodes();

export function txDetail(rawCode: string): TxDetail | null {
  const code = clean(rawCode).toUpperCase();
  const reg = registryTx(code);
  if (!reg) return null;

  const intel = TX_INTEL[code];
  const authored = TRANSACTIONS.find((t) => t.code.toUpperCase() === code);
  const facets = facetsOf(code);

  const authoredTables = uniq([...list(intel?.tables), ...list(authored?.tables)]);
  const tables = tablesFor(code, authoredTables);
  const s4 = buildS4(code, intel, authored);

  // Exits: the transaction's own list, plus the enhancement catalog's reverse
  // claim (an Exit record that names this T-Code). Both are dataset facts.
  const exits = uniq([
    ...list(intel?.userExits),
    ...list(authored?.exits),
    ...EXITS.filter((e) => (e.tcodes || []).some((x) => clean(x).toUpperCase() === code)).map((e) => e.name),
  ]);

  const purpose = clean(intel?.descHe) || clean(authored?.purpose);
  const process = clean(intel?.process) || clean(authored?.process);

  const detail: TxDetail = {
    code,
    module: reg.module,
    moduleHe: txModuleHe(reg.module),
    area: clean(reg.area),
    // The registry already resolved the Hebrew title across the four sources,
    // deep-first. Re-deriving it here would risk a second, divergent answer.
    he: clean(reg.he),
    en: clean(reg.en),
    depth: reg.depth,
    verified: intel?.verified === "verified",
    sources: list(intel?.sources),
    popularity: txPopularity(code),

    purpose,
    tech: clean(intel?.descTech),
    process,
    whenUse: clean(intel?.whenUse) || clean(authored?.whenToUse),
    whenNot: clean(intel?.whenNot),
    users: uniq([...list(intel?.users), ...(clean(authored?.who) ? [clean(authored?.who)] : [])]),
    prereq: list(intel?.prereq),
    flow: list(intel?.typicalFlow),
    selection: list(intel?.selectionScreen),

    topics: facets.topics,
    objects: uniq([...facets.objects, ...list(authored?.objects)]),
    tables,
    bapis: uniq([...list(intel?.bapis), ...list(authored?.funcs)]),
    exits,
    badis: list(intel?.badis),
    enhancements: list(intel?.enhancements),
    auth: list(intel?.authObjects),
    cds: uniq([...list(intel?.cds), ...(s4.cds ? [s4.cds] : [])]),

    s4,
    neighbours: neighboursFor(code, reg),
    issues: issuesFor(code, intel, authored),
    known: 0,
    total: 0,
  };

  // The 14 facts the brief names, counted honestly: a fact is "known" only when
  // the dataset actually answers it. The screen prints both numbers, so a thin
  // record reads as thin instead of pretending otherwise.
  const answers: boolean[] = [
    !!detail.code,
    !!detail.he,
    !!detail.en,
    !!detail.module,
    !!detail.purpose,
    !!detail.process,
    detail.objects.length > 0,
    detail.tables.length > 0,
    detail.bapis.length > 0,
    !!detail.s4.fiori,
    detail.s4.disposition !== "unknown",
    !!(detail.s4.delta || detail.s4.replaces.length || detail.s4.supersededBy.length),
    detail.neighbours.length > 0,
    detail.issues.length > 0,
  ];
  detail.known = answers.filter(Boolean).length;
  detail.total = answers.length;

  return detail;
}
