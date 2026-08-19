/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORIES — link resolution and S/4 standing.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time only. Two jobs, and they are the two places
   the five directories could otherwise go wrong:

   1. A LINK IS ONLY EVER EMITTED AT A PAGE THAT EXISTS.
      scripts/crawl-dead-links.mjs exits 1 on the first internal href in out/
      with no generated page behind it. Every `…Href()` below answers with a
      string ONLY when the name is in the very list the corresponding route's
      generateStaticParams builds from, and with `null` otherwise. A record that
      names a table, a T-Code or a BAPI the project does not document is still
      SHOWN — it is simply shown as a value rather than as a destination.

   2. S/4HANA STANDING IS READ, NEVER INVENTED.
      lib/s4's s4For() is the single resolver: a curated S4_IMPACT entry wins, a
      verified-stable flag is next, then the dictionary's own S/4 note at partial
      trust, and silence resolves to "נדרש אימות SAP". Nothing here writes an
      S/4 sentence of its own.
   ========================================================================== */

import { ALL_TABLES } from "@/data/sapData";
import { registry } from "@/lib/bapi-registry";
import { registryCodes } from "@/lib/tx-registry";
import { listFuncs } from "@/lib/object-intel";
import { CDS_VIEWS } from "@/data/cds-map";
import { FIORI_APPS } from "@/data/fiori/apps";
import { ENHANCEMENTS } from "@/data/enhancements";
import { RISK_COLOR, RISK_HE, TRUST_HE, s4For } from "@/lib/s4";
import { tableNames } from "../erd/model";
import type { RefStatus, RefTableStanding } from "./types";

/* ------------------------------------------------------------- the lists */

const memo = <T>(fn: () => T): (() => T) => {
  let v: T | undefined;
  let done = false;
  return () => { if (!done) { v = fn(); done = true; } return v as T; };
};

/** Tables with a generated /neo/object/<name>/ page — the dictionary's own list,
 *  i.e. exactly what app/neo/object/[name] generates from. */
const objectSet = memo(() => new Set(tableNames()));
/** T-Codes with a generated /neo/transactions/<CODE>/ page. */
const txSet = memo(() => new Set(registryCodes().map((c) => c.toUpperCase())));
/** Function objects with a generated /neo/bapi/<id>/ page. The IDoc message
 *  types the registry also carries are excluded: /neo/idoc owns those, so a
 *  message type has exactly one home and exactly one URL. */
const bapiSet = memo(() => new Set(registry().filter((o) => o.objectType !== "IDoc").map((o) => o.id)));
const idocSet = memo(() => new Set(listFuncs("IDoc")));
const cdsSet = memo(() => new Set(CDS_VIEWS.map((v) => v.view)));
const fioriSet = memo(() => new Set(FIORI_APPS.map((a) => a.slug)));
const enhSet = memo(() => new Set(ENHANCEMENTS.map((e) => e.slug)));

const tableIndex = memo(() => {
  const m = new Map<string, { he: string; module: string }>();
  for (const t of ALL_TABLES) {
    const cur = m.get(t.tableName);
    const he = t.descriptionHe || t.descriptionEn || "";
    if (!cur) m.set(t.tableName, { he, module: t.module });
    else if (!cur.he && he) m.set(t.tableName, { he, module: cur.module });
  }
  return m;
});

/** The S/4 note the dictionary itself stores on a table, used as the partial
 *  trust input to s4For — never as a sentence of our own. */
const tableS4Note = memo(() => {
  const m = new Map<string, { note: string; alt: string }>();
  for (const t of ALL_TABLES) {
    if (m.has(t.tableName)) continue;
    m.set(t.tableName, { note: (t.s4Note || "").trim(), alt: (t.s4AltTable || "").trim() });
  }
  return m;
});

/* ------------------------------------------------------------------ hrefs */

const enc = encodeURIComponent;

export const objectHref = (name: string): string | null =>
  objectSet().has(name) ? `/neo/object/${enc(name)}/` : null;

export const txHref = (code: string): string | null =>
  txSet().has(code.toUpperCase()) ? `/neo/transactions/${enc(code.toUpperCase())}/` : null;

export const bapiHref = (id: string): string | null =>
  bapiSet().has(id) ? `/neo/bapi/${enc(id)}/` : null;

export const idocHref = (name: string): string | null =>
  idocSet().has(name) ? `/neo/idoc/${enc(name)}/` : null;

export const cdsHref = (view: string): string | null =>
  cdsSet().has(view) ? `/neo/cds/${enc(view)}/` : null;

export const fioriHref = (slug: string): string | null =>
  fioriSet().has(slug) ? `/neo/fiori-apps/${enc(slug)}/` : null;

export const enhHref = (slug: string): string | null =>
  enhSet().has(slug) ? `/neo/enhancements/${enc(slug)}/` : null;

export const tableHe = (name: string): string => tableIndex().get(name)?.he || "";
export const tableModule = (name: string): string => tableIndex().get(name)?.module || "";
export const isKnownTable = (name: string): boolean => objectSet().has(name);

/* ------------------------------------------------------- S/4 standing */

export const TRUST_COLOR: Record<string, string> = {
  verified: "var(--status-done)",
  partial: "var(--status-in-analysis)",
  needs: "var(--status-not-started)",
};

export function trustStatus(trust: string): RefStatus {
  return { he: TRUST_HE[trust] || TRUST_HE.needs, color: TRUST_COLOR[trust] || TRUST_COLOR.needs };
}

export interface TableStanding extends RefTableStanding {
  /** high / medium / low / none, straight from lib/s4. */
  risk: string;
  /** true when lib/s4 rates the table high or medium — the ONE structured
   *  signal the directories are allowed to call "changes in S/4HANA". */
  impacted: boolean;
  /** true only for a curated, verified high-risk entry. */
  critical: boolean;
}

/** The S/4 standing of one classic ECC table, resolved by lib/s4 alone. */
export function standingOf(name: string): TableStanding {
  const note = tableS4Note().get(name);
  const s = s4For(name, note?.note, note?.alt);
  return {
    name,
    he: tableHe(name),
    href: objectHref(name),
    note: s.impact?.changed || "המילון אינו מציין הערת S/4 לטבלה זו: נדרש אימות במערכת SAP.",
    status: {
      he: s.trust === "needs" ? TRUST_HE.needs : RISK_HE[s.risk],
      color: RISK_COLOR[s.risk] || RISK_COLOR.none,
    },
    risk: s.risk,
    impacted: s.impacted,
    critical: s.risk === "high" && s.trust === "verified",
  };
}

/** Standings for a list of classic tables, deduplicated, riskiest first. */
export function standings(names: string[]): TableStanding[] {
  const seen = new Set<string>();
  const out: TableStanding[] = [];
  for (const n of names) {
    const name = (n || "").trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(standingOf(name));
  }
  const w: Record<string, number> = { high: 0, medium: 1, none: 2, low: 3 };
  return out.sort((a, b) => (w[a.risk] ?? 9) - (w[b.risk] ?? 9) || a.name.localeCompare(b.name));
}

/* ------------------------------------------------------------- formatting */

export const nf = new Intl.NumberFormat("he-IL");

/** "12 מתוך 18 שדות מלאים" — counted from the record itself, never a target. */
export const completeness = (known: number, total: number): string =>
  total > 0 ? `${nf.format(known)}/${nf.format(total)} שדות מאומתים ברשומה` : "";

export const clean = (s?: string): string => (s || "").trim();
export const uniq = (a: (string | undefined)[] | undefined): string[] =>
  [...new Set((a || []).map((x) => clean(x)).filter(Boolean))] as string[];
