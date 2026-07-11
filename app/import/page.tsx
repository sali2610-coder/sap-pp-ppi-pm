import { CenterHeader } from "@/components/knowledge";
import { EXTRACTION_PACKAGE, ENABLED } from "@/lib/import-engine";
export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Architecture · SAP Import Engine" title="מנוע ייבוא SAP (ארכיטקטורה)" sub="חבילת חילוץ + מנוע ייבוא להעשרה/אימות אוטומטי מ-SAP אמיתי. ארכיטקטורה בלבד — ללא חיבור. הפעלה על-ידי ENABLED + הזרקת adapter (RFC / sc4sap MCP / העלאת קובץ)." accent="#0e7490" />
      <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">סטטוס: {ENABLED ? "ENABLED" : "ארכיטקטורה בלבד · ENABLED=false"}</div>
      <h2 className="mb-3 text-lg font-extrabold tracking-tight text-ink-1">חבילת חילוץ (SAP Extraction Package)</h2>
      <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-surface-2 text-xs font-bold text-ink-3"><tr><th className="p-3 text-start">מקור</th><th className="p-3 text-start">חילוץ (T-Code)</th><th className="p-3 text-start">סינון</th><th className="p-3 text-start">שדות</th><th className="p-3 text-start">יעד ב-NEO</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {EXTRACTION_PACKAGE.map((e) => (
              <tr key={e.source}><td className="tech p-3 font-extrabold text-brand" dir="ltr">{e.source}</td><td className="tech p-3 text-[12px] text-ink-2" dir="ltr">{e.tx}</td><td className="p-3 text-[11px] leading-snug text-ink-3" dir="ltr">{e.selection}</td><td className="tech p-3 text-[11px] text-ink-3" dir="ltr">{e.fields}</td><td className="tech p-3 text-[11px] text-ink-3" dir="ltr">{e.target}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm"><h3 className="mb-2 text-sm font-extrabold text-ink-1">זרימת ייבוא</h3><ol className="space-y-1.5 text-[13px] text-ink-2">{["חלץ מ-SAP (SE16N export / RFC) לקבצי CSV/JSON", "Parser ממיר raw rows → רשומות NEO (ImportParsers)", "Mapper ממזג לקבצי data/*.ts", "Validation: צולב מול תוכן מחבר → upgrade trust / סימון mismatch", "ImportReport: matched / upgraded / mismatched / new"].map((s, i) => <li key={i} className="flex gap-2"><span className="grid size-5 shrink-0 place-items-center rounded bg-teal-600 text-[10px] font-bold text-white">{i + 1}</span>{s}</li>)}</ol></div>
        <div className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm"><h3 className="mb-2 text-sm font-extrabold text-ink-1">ערך אימות אוטומטי</h3><ul className="space-y-1.5 text-[13px] text-ink-2"><li>FM שמסומן 'inferred' שקיים ב-TADIR → upgrade ל-Verified.</li><li>FM שלא קיים ב-TADIR → אישור RED + הסרה/סימון.</li><li>אורך/מפתח טבלה מ-DD03L → אימות SAPField.</li><li>Tcode→program מ-SE93/TSTC → אימות lineage.</li><li>CDS base tables מ-DDLDEPENDENCY → אימות cds-map.</li></ul></div>
      </div>
      <p className="mt-4 text-xs text-ink-3">קוד: <span className="tech" dir="ltr">lib/import-engine.ts</span> — record shapes (TSTC/TSTCT/DD02L/DD03L/TADIR/SE93) + ImportParsers interface + offline stub. ללא חיבור, NEO נשאר 100% offline.</p>
    </div>
  );
}
