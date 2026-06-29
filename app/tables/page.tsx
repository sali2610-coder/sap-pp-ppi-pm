import Link from "next/link";
import { Sigma, ArrowLeft } from "lucide-react";
import { CenterHeader } from "@/components/knowledge";
import { TablesExplorer, type TableRow } from "@/components/tables-explorer";
import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";

// 20 tables (AUFK, PLKO, JEST, …) live in BOTH PM and PP-PI. Dedupe by name so
// the explorer lists each table once; merge the module label (e.g. "PM · PP-PI")
// and keep the richest row (max relations/tcodes across the two definitions).
const byName = new Map<string, TableRow>();
for (const t of ALL_TABLES) {
  const prev = byName.get(t.tableName);
  const rel = (t.relations || []).length;
  const tc = (t.tcodes || "").split(/[,;/]/).filter(Boolean).length;
  if (!prev) {
    byName.set(t.tableName, {
      name: t.tableName,
      module: t.module,
      he: t.descriptionHe || t.descriptionEn || "",
      s4: [t.s4Note, t.s4AltTable ? `→ ${t.s4AltTable}` : ""].filter(Boolean).join(" "),
      rel,
      tc,
      cds: cdsForTable(t.tableName)[0]?.view,
    });
  } else {
    if (!prev.module.split(" · ").includes(t.module)) prev.module = `${prev.module} · ${t.module}`;
    prev.rel = Math.max(prev.rel, rel);
    prev.tc = Math.max(prev.tc, tc);
    if (!prev.he) prev.he = t.descriptionHe || t.descriptionEn || "";
  }
}
const rows: TableRow[] = [...byName.values()];

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Advanced Tables Explorer" title="חוקר הטבלאות המתקדם" sub={`${rows.length} טבלאות PM/PP-PI — תיאור עסקי, קשרים, CDS ו-ECC↔S/4. לחיצה פותחת מפת קשרים מלאה (שדות, מפתחות, גרף).`} accent="#0891b2" />
      <Link href="/cds/" dir="rtl" className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-2.5 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-50">
        <Sigma className="size-4" />עוברים ל-S/4HANA? גלה כיצד הטבלאות הופכות לתצוגות CDS — חוקר ה-CDS
        <ArrowLeft className="ms-auto size-4" />
      </Link>
      <TablesExplorer rows={rows} />
    </div>
  );
}
