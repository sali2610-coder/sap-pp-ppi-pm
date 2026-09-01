import { S4_IMPACT, S4_STABLE, type S4Impact } from "@/data/s4-impact";

const NOCHANGE = /ללא שינוי|תואם|no change|unchanged/i;

// Resolve S/4HANA impact for a table. Curated entry wins; else a verified-stable
// flag; else derive from the dataset's own s4 note (partial trust); else null →
// "needs SAP verification" (never invents).
export function s4Impact(name: string, s4note?: string, s4alt?: string): S4Impact | null {
  const cur = S4_IMPACT[name];
  if (cur) return cur;
  if (S4_STABLE.has(name)) return { changed: "ללא שינוי מהותי ב-S/4HANA — הטבלה נשמרת (תואם).", why: "תאימות גבוהה; רוב הקוד והממשקים ממשיכים לעבוד.", risk: "low", trust: "verified" };
  const note = (s4note || "").trim();
  if (note && !NOCHANGE.test(note)) return { changed: note + (s4alt ? ` · חלופה: ${s4alt}` : ""), why: "נגזר מהערת ה-S/4 של מילון הנתונים — מומלץ אימות מול SAP.", risk: "medium", trust: "partial" };
  if (note) return { changed: note, why: "", risk: "low", trust: "partial" };
  return null;
}

export interface S4Status { impact: S4Impact | null; impacted: boolean; needs: boolean; risk: "high" | "medium" | "low" | "none"; trust: "verified" | "partial" | "needs" }
export function s4For(name: string, s4note?: string, s4alt?: string): S4Status {
  const impact = s4Impact(name, s4note, s4alt);
  if (!impact) return { impact: null, impacted: false, needs: true, risk: "none", trust: "needs" };
  const impacted = impact.risk === "high" || impact.risk === "medium";
  return { impact, impacted, needs: impact.trust === "needs", risk: impact.risk, trust: impact.trust };
}

export const TRUST_HE: Record<string, string> = { verified: "מאומת", partial: "חלקי", needs: "נדרש אימות SAP" };
export const RISK_HE: Record<string, string> = { high: "סיכון גבוה", medium: "סיכון בינוני", low: "יציב", none: "נדרש אימות נוסף" };
export const RISK_COLOR: Record<string, string> = { high: "#dc2626", medium: "#d97706", low: "#16a34a", none: "#94a3b8" };
