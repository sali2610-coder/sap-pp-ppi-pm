// Project NEO · the incident vocabulary (2026-10) — one place for the words and
// dots the incident list (/neo/incidents/) and the incident record
// (/neo/incidents/<slug>/) both draw, so the two can never disagree.
//
// Plain module, no dataset import: the list is a client component.

/** The record's impact tag, in Hebrew. The tag itself is the source's own. */
export const IMPACT_HE: Record<string, string> = {
  BLOCKING: "חוסם עבודה",
  "FINANCIAL POSTING RISK": "סיכון ברישום כספי",
  FINANCIAL: "השפעה כספית",
  "DATA INCONSISTENCY": "אי-עקביות נתונים",
  PARTIAL: "פגיעה חלקית",
  "USER-SPECIFIC": "משתמש בודד",
  "MONITORING NOISE": "רעש ניטור",
  MONITORING: "ניטור",
};

/** Severity is not invented here. The record's own tag chooses the dot; the
 *  Hebrew word next to it carries the whole meaning. --status-tested is violet,
 *  and this product draws no violet: the two lower tiers share the neutral dot
 *  with monitoring, and their words tell them apart. */
export const IMPACT_DOT: Record<string, string> = {
  BLOCKING: "var(--status-in-analysis)",
  "FINANCIAL POSTING RISK": "var(--status-in-analysis)",
  FINANCIAL: "var(--status-in-conversion)",
  "DATA INCONSISTENCY": "var(--status-in-conversion)",
  PARTIAL: "var(--status-not-started)",
  "USER-SPECIFIC": "var(--status-not-started)",
  "MONITORING NOISE": "var(--status-not-started)",
  MONITORING: "var(--status-not-started)",
};
export const impactDot = (kind: string) => IMPACT_DOT[kind] || "var(--status-not-started)";

/** 37 of the catalogue's codes are written "IWO10009 verify SE93": the code,
 *  and the transaction the source asks you to verify it in (SE93 transactions,
 *  SE18 BAdIs, SE91 message classes). The code is the code; the rest is said.
 *  30 error messages are written the same way, with a space inside the code
 *  ("C2 144 verify SE91"), so the code part may hold spaces. */
const VERIFY = /^(.+?)\s+verify\s+(SE\d\d)$/i;
export const splitCode = (raw: string): { code: string; at: string } => {
  const m = raw.match(VERIFY);
  return m ? { code: m[1], at: m[2].toUpperCase() } : { code: raw, at: "" };
};
