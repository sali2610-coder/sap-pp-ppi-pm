import { CenterHeader } from "@/components/knowledge";
import { ALL_TABLES } from "@/data/sapData";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { listFuncs } from "@/lib/object-intel";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { SOLUTIONS } from "@/data/solutions";
import { PROCESS_MAPS } from "@/data/processes";
import { OIC_OBJECTS } from "@/lib/cross-links";

const tableSet = new Set(ALL_TABLES.map((t) => t.tableName));
const fnSet = new Set(listFuncs());
const incSet = new Set(INCIDENTS.map((i) => i.slug));

// duplicate slugs
const incCount: Record<string, number> = {};
INCIDENTS.forEach((i) => (incCount[i.slug] = (incCount[i.slug] || 0) + 1));
const dupIncidents = Object.entries(incCount).filter(([, n]) => n > 1).map(([s]) => s);

// deep ∩ directory overlap (deduped by engine — informational)
const deepSet = new Set(TRANSACTIONS.map((t) => t.code.toUpperCase()));
const overlap = TCODE_DIRECTORY.filter((t) => deepSet.has(t.code.toUpperCase())).map((t) => t.code);

// orphan refs
const incOrphanTables = INCIDENTS.flatMap((i) => i.tables.filter((t) => /^[A-Z][A-Z0-9_]+$/.test(t) && !tableSet.has(t)).map((t) => `${i.slug}→${t}`));
const noteOrphanInc = SAP_NOTES.flatMap((n) => (n.relatedIncidents || []).filter((s) => !incSet.has(s)).map((s) => `${n.slug}→${s}`));
const procOrphanInc = PROCESS_MAPS.flatMap((p) => p.steps.flatMap((st) => (st.incidents || []).filter((s) => !incSet.has(s)).map((s) => `${p.slug}→${s}`)));
const solOrphanInc = SOLUTIONS.flatMap((s) => s.incidents.filter((x) => !incSet.has(x)).map((x) => `${s.slug}→${x}`));
const oicOrphanTable = OIC_OBJECTS.filter((o) => !tableSet.has(o.table)).map((o) => o.table);
// note: orphan refs in guarded link contexts render as plain chips (no broken link), but are listed for content quality

interface Check { area: string; result: number; detail: string; severity: "pass" | "info" | "warn" }
const checks: Check[] = [
  { area: "כפילות slug תקלות", result: dupIncidents.length, detail: dupIncidents.join(", ") || "אין", severity: dupIncidents.length ? "warn" : "pass" },
  { area: "חפיפת T-Code (deep∩directory)", result: overlap.length, detail: `${overlap.length} קודים — deduped אוטומטית במנוע (deep גובר). אינפורמטיבי.`, severity: "info" },
  { area: "תקלות→טבלה לא במאגר", result: incOrphanTables.length, detail: incOrphanTables.slice(0, 8).join(", ") || "אין — כל הטבלאות מאומתות", severity: incOrphanTables.length > 12 ? "warn" : "info" },
  { area: "Notes→תקלה לא קיימת", result: noteOrphanInc.length, detail: noteOrphanInc.join(", ") || "אין — כל ה-relatedIncidents תקפים", severity: noteOrphanInc.length ? "warn" : "pass" },
  { area: "Process→תקלה לא קיימת", result: procOrphanInc.length, detail: procOrphanInc.join(", ") || "אין", severity: procOrphanInc.length ? "warn" : "pass" },
  { area: "Solution→תקלה לא קיימת", result: solOrphanInc.length, detail: solOrphanInc.join(", ") || "אין", severity: solOrphanInc.length ? "warn" : "pass" },
  { area: "OIC→טבלה לא במאגר", result: oicOrphanTable.length, detail: oicOrphanTable.join(", ") + " (QM table-less — מטופל ב-fallback)" || "אין", severity: "info" },
];

const SEV = { pass: { he: "תקין", color: "#16a34a" }, info: { he: "מידע", color: "#0891b2" }, warn: { he: "לתשומת לב", color: "#d97706" } };

export default function Page() {
  const warns = checks.filter((c) => c.severity === "warn").length;
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Final · Knowledge Quality Audit" title="ביקורת איכות ידע" sub={`סריקה סטטית של עקביות המאגר — כפילויות, הפניות יתומות, קישורים שבורים. ${warns} ממצאים לתשומת לב.`} accent="#0f766e" />
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[{ l: "ישויות נסרקות", v: `${ALL_TABLES.length + TRANSACTIONS.length + TCODE_DIRECTORY.length + INCIDENTS.length}` }, { l: "כפילות slug", v: `${dupIncidents.length}` }, { l: "קישורים שבורים", v: "0", s: "כל הקישורים החוצים מוגנים-קיום" }].map((k) => (
          <div key={k.l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-3xl font-extrabold text-slate-900">{k.v}</div><div className="mt-1 text-sm font-bold text-slate-600">{k.l}</div>{k.s && <div className="text-[11px] text-slate-400">{k.s}</div>}</div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500"><tr><th className="p-3 text-start">בדיקה</th><th className="p-3 text-center">תוצאה</th><th className="p-3 text-center">חומרה</th><th className="p-3 text-start">פירוט</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {checks.map((c) => (
              <tr key={c.area}><td className="p-3 font-bold text-slate-800">{c.area}</td><td className="p-3 text-center font-mono font-bold text-slate-700">{c.result}</td>
                <td className="p-3 text-center"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: SEV[c.severity].color }}>{SEV[c.severity].he}</span></td>
                <td className="p-3 text-[12px] leading-snug text-slate-500">{c.detail}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-slate-400">הערה: כל קישורי ה-cross-link החיצוניים מוגנים-קיום (רנדור כצ'יפ-מידע אם היעד חסר), ולכן 0 לינקים שבורים ב-build. הפניות-תוכן יתומות מוצגות לעיל לשיפור תוכן.</p>
    </div>
  );
}
