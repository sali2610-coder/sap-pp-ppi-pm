// Accessor + relationship/recommendation engine over the Transaction
// Intelligence catalog (data/tx-intel.ts).
import { TX_INTEL, type TxIntel } from "@/data/tx-intel";

export type { TxIntel };

export const txIntel = (code: string): TxIntel | undefined => TX_INTEL[(code || "").toUpperCase()];
export const hasTxIntel = (code: string): boolean => !!TX_INTEL[(code || "").toUpperCase()];
export const txCodes = (): string[] => Object.keys(TX_INTEL);

// Does a dedicated /tcode page exist for this code? (only catalog codes are
// guaranteed routable; relationship chips link only when true.)
export const txExists = (code: string): boolean => hasTxIntel(code);

// Recommendation engine — "if you opened X you may also need…".
// Ranks related codes by how the consultant flow actually continues: the next
// step (after) and frequently-used-together weigh most, then alternatives.
export function txRecommend(code: string, limit = 6): { code: string; reason: string }[] {
  const t = txIntel(code);
  if (!t) return [];
  const score = new Map<string, { s: number; reason: string }>();
  const bump = (arr: string[] | undefined, w: number, reason: string) => {
    (arr || []).forEach((c) => {
      const k = (c || "").toUpperCase();
      if (!k || k === t.code) return;
      const cur = score.get(k);
      if (!cur || cur.s < w) score.set(k, { s: (cur?.s || 0) + w, reason: cur && cur.s >= w ? cur.reason : reason });
    });
  };
  bump(t.after, 5, "השלב הבא בתהליך");
  bump(t.together, 4, "נפוץ לשימוש יחד");
  bump(t.alternative, 3, "חלופה");
  bump(t.similar, 2, "דומה");
  bump(t.before, 2, "שלב קודם");
  return [...score.entries()]
    .sort((a, b) => b[1].s - a[1].s)
    .slice(0, limit)
    .map(([c, v]) => ({ code: c, reason: v.reason }));
}

// Reverse index — which catalog codes list `code` in their `after` (i.e. lead
// into it). Lets a page show "used before" even when not self-declared.
let _rev: Map<string, string[]> | null = null;
function revIndex(): Map<string, string[]> {
  if (_rev) return _rev;
  const m = new Map<string, string[]>();
  for (const t of Object.values(TX_INTEL)) {
    (t.after || []).forEach((c) => {
      const k = (c || "").toUpperCase();
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(t.code);
    });
  }
  _rev = m;
  return m;
}
export const txLeadingInto = (code: string): string[] => revIndex().get((code || "").toUpperCase()) || [];

// Popularity = how often a catalog code is referenced by other transactions
// across the relationship graph (a real cross-reference signal, not invented).
let _pop: Map<string, number> | null = null;
function popIndex(): Map<string, number> {
  if (_pop) return _pop;
  const m = new Map<string, number>();
  for (const t of Object.values(TX_INTEL)) {
    for (const arr of [t.before, t.after, t.together, t.similar, t.alternative]) {
      (arr || []).forEach((c) => { const k = (c || "").toUpperCase(); if (TX_INTEL[k]) m.set(k, (m.get(k) || 0) + 1); });
    }
  }
  _pop = m;
  return m;
}
export const txPopularity = (code: string): number => popIndex().get((code || "").toUpperCase()) || 0;
export const txMostPopular = (n = 24): string[] => [...popIndex().entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([c]) => c);
