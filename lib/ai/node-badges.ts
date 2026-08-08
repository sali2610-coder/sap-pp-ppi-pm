/**
 * What a chapter contains, before you open it.
 *
 * The generator counts real things in the body text — diagram fences, markdown
 * tables, T-Code shapes, BAPI/FM names, ABAP keywords, IMG paths, Fiori app
 * codes, figure captions. This turns those counts into the small set of badges
 * worth showing in a nav tree.
 *
 * Two rules, both about not lying to the eye:
 *
 *   A badge appears only when its count is non-zero. An always-present row of
 *   greyed icons teaches nothing and costs the same space as one that means
 *   something.
 *
 *   Counts that are presence flags (a section either has a table or does not)
 *   are shown WITHOUT a number, because "1" would imply one table when it means
 *   "at least one".
 */

import type { NodeMetrics } from "./types";

export interface Badge {
  key: string;
  /** Emoji, matching the vocabulary used elsewhere in the product. */
  icon: string;
  /** Accessible label — screen readers must not hear an emoji alone. */
  label: string;
  /** Shown next to the icon. Absent for presence-only signals. */
  count?: number;
}

/** Order is fixed so a chapter's badges do not reshuffle between renders. */
export function badgesFor(m: NodeMetrics | undefined): Badge[] {
  if (!m) return [];
  const out: Badge[] = [];

  if (m.d > 0) out.push({ key: "diagram", icon: "🗺️", label: "תרשימי זרימה", count: m.d });
  if (m.tb > 0) out.push({ key: "table", icon: "🗄️", label: "טבלאות" });
  if (m.tc > 0) out.push({ key: "tcode", icon: "⌨️", label: "טרנזקציות", count: m.tc });
  if (m.o > 0) out.push({ key: "bapi", icon: "🔗", label: "BAPI ומודולי פונקציה", count: m.o });
  if (m.cf > 0) out.push({ key: "config", icon: "⚙️", label: "קונפיגורציה" });
  if (m.fi > 0) out.push({ key: "fiori", icon: "📱", label: "Fiori" });
  if (m.ab > 0) out.push({ key: "abap", icon: "💻", label: "קוד ABAP" });
  if (m.fg > 0) out.push({ key: "figure", icon: "🖼️", label: "תמונות" });
  // Text last, and only when there is nothing more specific to say — otherwise
  // every node carries it and the row stops distinguishing anything.
  if (!out.length && m.w > 0) out.push({ key: "text", icon: "📄", label: "טקסט" });

  return out;
}

/** "12 דק׳" / "1.2 אלף מילים" — a size the reader can judge at a glance. */
export function readingTime(m: NodeMetrics | undefined): string | null {
  if (!m) return null;
  const min = m.min ?? (m.w > 0 ? Math.max(1, Math.round(m.w / 180)) : 0);
  if (!min) return null;
  if (min < 60) return `${min} דק׳`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest ? `${h} ש׳ ${rest} דק׳` : `${h} ש׳`;
}

/** Compact count summary for a tooltip: the numbers, spelled out. */
export function metricsSummary(m: NodeMetrics | undefined): string {
  if (!m) return "";
  const bits: string[] = [];
  const t = readingTime(m);
  if (t) bits.push(`זמן קריאה ~${t}`);
  if (m.w) bits.push(`${m.w.toLocaleString("he-IL")} מילים`);
  if (m.d) bits.push(`${m.d} תרשימים`);
  if (m.tc) bits.push(`${m.tc} טרנזקציות`);
  if (m.o) bits.push(`${m.o} אובייקטים`);
  return bits.join(" · ");
}
