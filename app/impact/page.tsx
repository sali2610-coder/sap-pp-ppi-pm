import { CenterHeader } from "@/components/knowledge";
import { TablesExplorer, type TableRow } from "@/components/tables-explorer";
import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";
const rows: TableRow[] = ALL_TABLES.map((t) => ({ name: t.tableName, module: t.module, he: t.descriptionHe || t.descriptionEn || "", s4: [t.s4Note, t.s4AltTable ? `→ ${t.s4AltTable}` : ""].filter(Boolean).join(" "), rel: (t.relations || []).length, tc: 0, cds: cdsForTable(t.tableName)[0]?.view }));
export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 7 · Impact Analyzer" title="מנתח השפעה" sub="בחר אובייקט/טבלה לניתוח השפעת שינוי — דפדוף לעמוד האובייקט מציג גרף תלויות מלא (טבלאות תלויות, T-Codes, BAPIs, תקלות) + Object Intelligence. מה יושפע אם תשנה את האובייקט." accent="#9333ea" />
      <p className="mb-3 text-xs font-bold text-slate-400" dir="rtl">לחיצה על טבלה → מפת קשרים/השפעה ב-/object · ניתוח מאוחד ב-/oic.</p>
      <TablesExplorer rows={rows} />
    </div>
  );
}
