import { CenterHeader } from "@/components/knowledge";
import { TablesExplorer, type TableRow } from "@/components/tables-explorer";
import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";

const rows: TableRow[] = ALL_TABLES.map((t) => ({
  name: t.tableName,
  module: t.module,
  he: t.descriptionHe || t.descriptionEn || "",
  s4: [t.s4Note, t.s4AltTable ? `→ ${t.s4AltTable}` : ""].filter(Boolean).join(" "),
  rel: (t.relations || []).length,
  tc: (t.tcodes || "").split(/[,;/]/).filter(Boolean).length,
  cds: cdsForTable(t.tableName)[0]?.view,
}));

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Advanced Tables Explorer" title="חוקר הטבלאות המתקדם" sub={`${rows.length} טבלאות PM/PP-PI — תיאור עסקי, קשרים, CDS ו-ECC↔S/4. לחיצה פותחת מפת קשרים מלאה (שדות, מפתחות, גרף).`} accent="#0891b2" />
      <TablesExplorer rows={rows} />
    </div>
  );
}
