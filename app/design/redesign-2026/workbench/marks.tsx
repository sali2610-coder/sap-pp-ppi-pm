/* Knowledge Workbench board: presentational marks shared by the server page
   and the client islands. No data import here, only vocabulary and markup, so
   both sides can render the same status, level, module and code marks. */

import {
  ArrowRightLeft, Ban, Check, CircleQuestionMark, CirclePlus, Diff, History,
  ShieldAlert, ShieldCheck, ShieldHalf, ShieldQuestionMark,
} from "lucide-react";
import type { ReactNode } from "react";

/* The five S/4HANA families the board defines, plus the two extra groups the
   dataset already uses (s4_native, legacy_ecc_only). The grouping itself is
   the site's own S4_STATUS_GROUP; only the family words are the board's. */
export type Fam = "keep" | "change" | "replace" | "removed" | "verify" | "new" | "past";
export type Lvl = "verified" | "partial" | "required" | "conflict";

export interface StatusV { key: string; label: string; fam: Fam }
export interface LevelV { key: string; label: string; short: string; lvl: Lvl }

export const FAM_HE: Record<Fam, string> = {
  keep: "נשמרת",
  change: "משתנה",
  replace: "מוחלפת",
  removed: "הוסרה",
  verify: "נדרש אימות",
  new: "חדשה ב-S/4HANA",
  past: "ECC בלבד",
};

export const LVL_HE: Record<Lvl, string> = {
  verified: "מאומת",
  partial: "חלקי",
  required: "דורש אימות",
  conflict: "סתירה",
};

const FAM_ICON = {
  keep: Check,
  change: Diff,
  replace: ArrowRightLeft,
  removed: Ban,
  verify: CircleQuestionMark,
  new: CirclePlus,
  past: History,
} as const;

const LVL_ICON = {
  verified: ShieldCheck,
  partial: ShieldHalf,
  required: ShieldQuestionMark,
  conflict: ShieldAlert,
} as const;

/** Latin runs inside Hebrew text: letters and digits with the joiners SAP
 *  names use. Parentheses stay outside the run so RTL mirroring still pairs
 *  them correctly. */
const LATIN = /([A-Za-z0-9](?:[A-Za-z0-9_.,:;/+&'’ -]*[A-Za-z0-9])?)/;

/** Dataset text with every Latin run isolated. Wording is untouched. A short
 *  run (a name like "Maintenance Orders") is kept on one line: broken inside
 *  an RTL line, its parentheses would land on the wrong ends. */
export function Bidi({ t }: { t: string }) {
  const parts = t.split(LATIN);
  return <>{parts.map((p, i) => (i % 2 ? <bdi key={i} className={p.length <= 24 ? "wb-nw" : undefined}>{p}</bdi> : p))}</>;
}

/** Inline `**bold**` only: the lesson bodies carry that one mark. */
export function Md({ t }: { t: string }) {
  const parts = t.split(/\*\*(.+?)\*\*/);
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i}><Bidi t={p} /></strong> : <Bidi key={i} t={p} />))}</>;
}

/** A SAP identifier: mono, LTR, isolated. */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return <bdi dir="ltr" className={`wb-code${className ? ` ${className}` : ""}`}>{children}</bdi>;
}

const nf = new Intl.NumberFormat("he-IL");
/** A count, tabular and isolated. */
export function Num({ n, className }: { n: number; className?: string }) {
  return <bdi className={`wb-numv${className ? ` ${className}` : ""}`}>{nf.format(n)}</bdi>;
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="wb-kbd">{children}</kbd>;
}

/** Module identity: a square mark in the module colour plus the code in text,
 *  so the module reads without colour. */
const MOD_CLASS: Record<string, string> = {
  PM: "pm", "PP-PI": "pppi", PP: "pp", "PP/DS": "ppds", QM: "qm", MM: "mm",
  EWM: "ewm", "S&OP": "sop", Fiori: "fiori", "S/4HANA": "s4",
};
export const modClass = (m: string) => `wb-mod--${MOD_CLASS[m] ?? "other"}`;

export function ModChip({ m, he }: { m: string; he?: string }) {
  return (
    <span className={`wb-mod ${modClass(m)}`}>
      <span className="wb-mod__mark" aria-hidden="true" />
      <Code>{m}</Code>
      {he ? <span className="wb-mod__he">{he}</span> : null}
    </span>
  );
}

/** S/4HANA status: family glyph, family colour, and the dataset's own label. */
export function StatusChip({ s, compact }: { s: StatusV | null; compact?: boolean }) {
  if (!s) return <span className="wb-st wb-st--none">לא מתועד במאגר</span>;
  const I = FAM_ICON[s.fam];
  return (
    <span className={`wb-st wb-st--${s.fam}${compact ? " wb-st--compact" : ""}`} data-status={s.key}>
      <I className="wb-st__i" size={14} strokeWidth={2} aria-hidden="true" />
      <span className="wb-st__t"><Bidi t={s.label} /></span>
    </span>
  );
}

/** Verification level: shield glyph plus a border pattern per level
 *  (solid, dashed, dotted, double), readable without colour. */
export function LevelChip({ l, full }: { l: LevelV | null; full?: boolean }) {
  if (!l) return <span className="wb-lv wb-lv--none">לא מתועד במאגר</span>;
  const I = LVL_ICON[l.lvl];
  return (
    <span className={`wb-lv wb-lv--${l.lvl}`} data-level={l.key}>
      <I className="wb-lv__i" size={14} strokeWidth={2} aria-hidden="true" />
      <span className="wb-lv__t"><Bidi t={full ? l.label : l.short} /></span>
    </span>
  );
}

export function FamGlyph({ fam, size = 16 }: { fam: Fam; size?: number }) {
  const I = FAM_ICON[fam];
  return <I size={size} strokeWidth={2} aria-hidden="true" />;
}

export function LvlGlyph({ lvl, size = 16 }: { lvl: Lvl; size?: number }) {
  const I = LVL_ICON[lvl];
  return <I size={size} strokeWidth={2} aria-hidden="true" />;
}
