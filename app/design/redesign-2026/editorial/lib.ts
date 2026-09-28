/* Editorial Reference board · server-side helpers.
   Pure vocabulary and arithmetic. No SAP fact is written here: statuses and levels
   arrive from the site's accessors; this file only decides how they are drawn. */

import fs from "node:fs";
import path from "node:path";
import {
  S4_STATUS_HE, VERIFICATION_HE, type S4Status, type VerificationLevel,
} from "@/lib/evidence/types";

/* ---------------------------------------------------- five S/4 states

   The product resolves 14 canonical statuses (lib/evidence). The design system
   draws five. Every record still prints its canonical label, so a row, a record
   and a search result say the same words the rest of the product says; the five
   states decide only the glyph and the colour. Two filings are deliberate and
   listed in the README: `deprecated` is not "removed" (IP30 still runs in
   S/4HANA and its simplification item points to IP30H), and `s4_native` sits
   with "kept" because the object exists in S/4HANA. */

export type S5 = "keep" | "change" | "replace" | "removed" | "verify";
export const S5_ORDER: S5[] = ["keep", "change", "replace", "removed", "verify"];
export const S5_HE: Record<S5, string> = {
  keep: "נשמרת",
  change: "משתנה",
  replace: "מוחלפת",
  removed: "הוסרה",
  verify: "נדרש אימות",
};
export const S5_NOTE: Record<S5, string> = {
  keep: "האובייקט קיים ב-S/4HANA ופועל כפי שהוא.",
  change: "האובייקט קיים, אבל התנהגותו, היקפו או מבנהו משתנים.",
  replace: "יש נתיב אחר ב-S/4HANA: יורש, חלופת Fiori או מעמד לא אסטרטגי.",
  removed: "האובייקט אינו זמין ב-S/4HANA או שייך ל-ECC בלבד.",
  verify: "המאגר לא קבע מעמד; נדרשת בדיקה מול תיעוד SAP.",
};
const S5_OF: Record<S4Status, S5> = {
  unchanged: "keep",
  released_api_available: "keep",
  s4_native: "keep",
  changed: "change",
  simplified: "change",
  restricted: "change",
  compatibility_scope: "change",
  replaced: "replace",
  fiori_alternative_available: "replace",
  deprecated: "replace",
  not_available: "removed",
  legacy_ecc_only: "removed",
  verification_required: "verify",
  not_applicable: "verify",
};
export const s5Of = (key?: string): S5 =>
  key && Object.hasOwn(S5_OF, key) ? S5_OF[key as S4Status] : "verify";
export const s4Label = (key?: string): string =>
  key && Object.hasOwn(S4_STATUS_HE, key) ? S4_STATUS_HE[key as S4Status] : "";
/** Canonical labels filed under each state, for the legend. */
export const S5_MEMBERS: Record<S5, string[]> = S5_ORDER.reduce(
  (acc, s) => ({
    ...acc,
    [s]: (Object.keys(S5_OF) as S4Status[]).filter((k) => S5_OF[k] === s).map((k) => S4_STATUS_HE[k]),
  }),
  {} as Record<S5, string[]>,
);

/* ------------------------------------------- four verification levels */

export type V4 = "verified" | "partial" | "required" | "conflict";
export const V4_ORDER: V4[] = ["verified", "partial", "required", "conflict"];
export const V4_HE: Record<V4, string> = {
  verified: "מאומת",
  partial: "חלקי",
  required: "דורש אימות",
  conflict: "סתירה",
};
export const V4_LINE: Record<V4, string> = {
  verified: "קו רציף",
  partial: "קו מקווקו",
  required: "קו מנוקד",
  conflict: "קו כפול",
};
const V4_OF: Record<VerificationLevel, V4> = {
  sap_official_verified: "verified",
  repository_verified: "verified",
  supported_secondary_source: "partial",
  verification_required: "required",
  legacy_context_only: "required",
  conflicting_sources: "conflict",
};
export const v4Of = (level?: string): V4 =>
  level && Object.hasOwn(V4_OF, level) ? V4_OF[level as VerificationLevel] : "required";
/** A few builders hand over only the Hebrew label of a level (bpDetail's reference). */
export const v4OfHe = (he?: string | null): V4 =>
  v4Of((Object.keys(VERIFICATION_HE) as VerificationLevel[]).find((k) => VERIFICATION_HE[k] === he));
export const v4OfTrust = (t: "verified" | "partial" | "needs"): V4 =>
  t === "verified" ? "verified" : t === "partial" ? "partial" : "required";
export const V4_MEMBERS: Record<V4, string[]> = V4_ORDER.reduce(
  (acc, v) => ({
    ...acc,
    [v]: (Object.keys(V4_OF) as VerificationLevel[]).filter((k) => V4_OF[k] === v).map((k) => VERIFICATION_HE[k]),
  }),
  {} as Record<V4, string[]>,
);

/* ------------------------------------------------------------- numbers */

export const fmt = (n: number): string => n.toLocaleString("en-US");

/* -------------------------------------------------- tokens and contrast

   The swatches print what board.css declares, read from the file itself, so a
   swatch can never disagree with the colour it names. */

export type Tokens = Record<string, string>;

export function boardTokens(): { light: Tokens; dark: Tokens } {
  let css = "";
  try {
    css = fs.readFileSync(path.join(process.cwd(), "app/design/redesign-2026/editorial/board.css"), "utf8");
  } catch {
    return { light: {}, dark: {} };
  }
  const block = (mode: string): Tokens => {
    const body = css.match(new RegExp(`\\.rb-editorial\\[data-mode="${mode}"\\][^{]*\\{([^}]*)\\}`))?.[1] ?? "";
    return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2].toUpperCase()]));
  };
  return { light: block("light"), dark: block("dark") };
}

const channel = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string): number => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
/** WCAG 2.x contrast ratio. */
export function contrast(a?: string, b?: string): number | null {
  if (!a || !b) return null;
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/* ---------------------------------------------------------- font stacks

   next/font sets each `--f-*` variable to "'Family', 'Family Fallback'", and the
   fallback face is local Arial / Times New Roman with no unicode-range. Chained as
   var(--f-x-he), var(--f-x-lat), that fallback answers every Latin letter, digit,
   space and punctuation mark before the Latin instance is ever consulted. The board
   therefore stacks the two real families first and the metric fallback after them. */

type NextFontLike = { style: { fontFamily: string } };
const parts = (f: NextFontLike) => f.style.fontFamily.split(",").map((s) => s.trim());

export function stack(he: NextFontLike, lat: NextFontLike | null, system: string): string {
  const [heFam, heFallback] = parts(he);
  const latFam = lat ? parts(lat)[0] : null;
  return [heFam, latFam, heFallback, system].filter(Boolean).join(", ");
}
