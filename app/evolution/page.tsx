import { forWhiteText } from "@/lib/contrast";
import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { LIFECYCLE, LC_COLOR, LC_HE, IMPACT_HE } from "@/data/lifecycle";
import { tcodeHref } from "@/lib/tcode-search";

const entries = Object.entries(LIFECYCLE).filter(([, l]) => l.status !== "Active").sort((a, b) => (a[1].status === "Obsolete" ? -1 : 1) - (b[1].status === "Obsolete" ? -1 : 1));
const obsolete = entries.filter(([, l]) => l.status === "Obsolete").length;

export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Final · Transaction Evolution Center" title="מרכז אבולוציית טרנזקציות" sub={`${entries.length} טרנזקציות שהשתנו ב-S/4HANA (${obsolete} הוסרו) — סטטוס ECC/S4, חלופה, Fiori והשפעת מיגרציה. מקור: S/4 Simplification.`} accent="#2563eb" />
      <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-surface-2 text-xs font-bold text-ink-3"><tr><th className="p-3 text-start">T-Code</th><th className="p-3 text-center">סטטוס S/4</th><th className="p-3 text-start">חלופה</th><th className="p-3 text-start">Fiori</th><th className="p-3 text-center">השפעה</th><th className="p-3 text-start">הערות מיגרציה</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map(([code, l]) => (
              <tr key={code} className="hover:bg-surface-2/60">
                <td className="p-3 align-top"><Link href={tcodeHref(code) || "#"} className="tech font-extrabold text-brand hover:underline" dir="ltr">{code}</Link></td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: forWhiteText(LC_COLOR[l.status])}}>{LC_HE[l.status]}</span></td>
                <td className="p-3 align-top"><span className="tech font-bold text-blue-700" dir="ltr">{l.alt || "—"}</span></td>
                <td className="p-3 align-top text-[12px] text-violet-700">{l.fiori || "—"}</td>
                <td className="p-3 text-center align-top"><span className="text-[11px] font-bold" style={{ color: l.impact === "High" ? "#dc2626" : l.impact === "Medium" ? "#d97706" : "#0891b2" }}>{IMPACT_HE[l.impact]}</span></td>
                <td className="p-3 align-top text-[11px] leading-snug text-ink-3">{l.migration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-ink-3">דוגמאות: MB1A/MB1B/MB1C → MIGO · XK01/XD01 → BP · MD01 → MD01N · NACE → BRF+ Output. שאר ה-T-Codes (Active) — ראו מרכז הטרנזקציות.</p>
    </div>
  );
}
