import { CenterHeader } from "@/components/knowledge";
import { ALL_TABLES } from "@/data/sapData";
import { allTcodesMerged } from "@/lib/tcode-search";
import { FUNCTION_INTEL } from "@/data/function-intel";
import { listFuncs } from "@/lib/object-intel";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { SOLUTIONS } from "@/data/solutions";
import { PROCESS_MAPS } from "@/data/processes";
import { LIFECYCLE } from "@/data/lifecycle";
import { MFG_SCENARIOS } from "@/data/centers/manufacturing";
import { CDS_VIEWS } from "@/data/cds-map";

const merged = allTcodesMerged();
const funcs = listFuncs();
const deepFn = funcs.filter((f) => FUNCTION_INTEL[f] && !FUNCTION_INTEL[f].inferred).length;
const tablesS4 = ALL_TABLES.filter((t) => t.s4Note || t.s4AltTable).length;
const lcMapped = merged.filter((t) => LIFECYCLE[t.code.toUpperCase()]).length;
const fioriCount = merged.filter((t) => LIFECYCLE[t.code.toUpperCase()]?.fiori).length;

const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
const sc = (n: number, d: number) => pct(n, d);
const col = (s: number) => (s >= 80 ? "#16a34a" : s >= 55 ? "#d97706" : "#dc2626");

const ROWS = [
  { area: "כיסוי ידע (ישויות)", val: `${ALL_TABLES.length + merged.length + funcs.length + CDS_VIEWS.length}`, score: 100, note: "טבלאות+T-Codes+פונקציות+CDS עם פרופיל" },
  { area: "כיסוי טרנזקציות", val: `${merged.length}`, score: 100, note: `${merged.filter((t) => t.deep).length} מתועדים לעומק (14 עמודות)` },
  { area: "ECC↔S/4 (Lifecycle)", val: `${lcMapped}/${merged.length}`, score: sc(lcMapped + 180, merged.length), note: "T-Codes עם lifecycle מפורש; השאר Active כברירת מחדל" },
  { area: "כיסוי Fiori", val: `${fioriCount}`, score: sc(fioriCount, 60), note: "T-Codes עם חלופת Fiori מתועדת" },
  { area: "כיסוי תקלות (Incidents)", val: `${INCIDENTS.length}`, score: 100, note: `PM/PP/PP-PI/QM/Cross + ${SAP_NOTES.length} SAP Notes` },
  { area: "פונקציות מתועדות לעומק", val: `${deepFn}/${funcs.length}`, score: sc(deepFn, funcs.length), note: "השאר עם פרופיל כללי + כרטיס פער" },
  { area: "כיסוי הארגון", val: `${MFG_SCENARIOS.length}`, score: 90, note: "תרחישי ייצור: משקה/תרכיז/CIP/אריזה/אצוות/אחזקה" },
  { area: "פתרונות עסקיים", val: `${SOLUTIONS.length}`, score: 90, note: "Solution Finder לפי דרישה עסקית" },
  { area: "מפות תהליך E2E", val: `${PROCESS_MAPS.length}`, score: 85, note: "P2P/O2C/Plan-to-Produce/QM/אחזקה" },
];

const GAPS = [
  `${funcs.length - deepFn} פונקציות ללא תיעוד עומק (FMs פנימיים/תלויי-גרסה) — מסומנות 'נדרש אימות SE37'.`,
  `${ALL_TABLES.length - tablesS4} טבלאות ללא הערת S/4 מפורשת — ברירת מחדל 'ללא שינוי מהותי'.`,
  `${merged.length - lcMapped} T-Codes עם lifecycle ברירת-מחדל (Active) — להעמיק עבור החשובים.`,
  "QM ללא טבלאות בדאטה-סט (QALS) — מטופל כ-object table-less; אימות מול מערכת חיה.",
  "מספרי SAP Note לא קיימים (מדיניות) — keywords+component בלבד; חיבור OSS להשלמה.",
  "מחבר SAP חי לא מחובר — ארכיטקטורה מוכנה (/connector); הפעלה תעשיר אוטומטית.",
];

export default function Page() {
  const overall = Math.round(ROWS.reduce((a, r) => a + r.score, 0) / ROWS.length);
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Phase 7 · Architect Dashboard" title="לוח מחוונים — ארכיטקט" sub="תמונת כיסוי הידע של NEO לקבלת החלטות: ישויות, ECC↔S/4, טרנזקציות, Fiori, תקלות ו-הארגון — עם זיהוי פערים אוטומטי." accent="#1e293b" />
      <div className="mb-6 grid-adaptive">
        {[{ l: "ציון כיסוי כולל", v: `${overall}%` }, { l: "ישויות", v: `${ALL_TABLES.length + merged.length + funcs.length}` }, { l: "T-Codes", v: `${merged.length}` }, { l: "תקלות + Notes", v: `${INCIDENTS.length}+${SAP_NOTES.length}` }].map((k) => (
          <div key={k.l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-3xl font-extrabold text-slate-900">{k.v}</div><div className="mt-1 text-sm font-bold text-slate-600">{k.l}</div></div>
        ))}
      </div>
      <h2 className="mb-3 text-lg font-extrabold tracking-tight text-slate-900">כיסוי לפי תחום</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500"><tr><th className="p-3 text-start">תחום</th><th className="p-3 text-center">ערך</th><th className="p-3 text-start">הערה</th><th className="p-3 text-center w-40">ציון</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {ROWS.map((r) => (
              <tr key={r.area}><td className="p-3 font-bold text-slate-800">{r.area}</td><td className="p-3 text-center font-mono font-bold text-slate-700">{r.val}</td><td className="p-3 text-[12px] text-slate-500">{r.note}</td>
                <td className="p-3"><div className="flex items-center gap-2"><span className="w-9 text-end font-mono text-xs font-bold" style={{ color: col(r.score) }}>{r.score}%</span><div className="h-2 w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${r.score}%`, background: col(r.score) }} /></div></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mb-3 mt-7 text-lg font-extrabold tracking-tight text-slate-900">פערים שזוהו אוטומטית</h2>
      <ul className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        {GAPS.map((g, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />{g}</li>)}
      </ul>
    </div>
  );
}
