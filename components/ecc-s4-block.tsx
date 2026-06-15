import { Check, ArrowRightLeft, Replace, XCircle, LayoutGrid, FileCode2, Scissors, Truck } from "lucide-react";

// Mandatory structured ECC6 → S/4HANA block. Reused on every item type
// (T-Code, table, object, BAPI, FM, IDoc, CDS, exit, BAdI, concept).
export interface EccS4 {
  unchanged?: string;   // what exists in ECC and stays the same
  changed?: string;     // what changes in S/4
  replaced?: string;    // what is replaced
  deprecated?: string;  // what is removed / not strategic
  fiori?: string;       // new Fiori app
  cds?: string;         // new CDS view
  simplification?: string; // SAP Simplification Item
  migration?: string;   // migration impact + QA testing impact
}

const ROWS: { key: keyof EccS4; he: string; Icon: typeof Check; color: string }[] = [
  { key: "unchanged", he: "ללא שינוי (נשאר זהה)", Icon: Check, color: "#16a34a" },
  { key: "changed", he: "משתנה ב-S/4", Icon: ArrowRightLeft, color: "#d97706" },
  { key: "replaced", he: "מוחלף", Icon: Replace, color: "#2563eb" },
  { key: "deprecated", he: "הוסר / לא אסטרטגי", Icon: XCircle, color: "#dc2626" },
  { key: "fiori", he: "אפליקציית Fiori חדשה", Icon: LayoutGrid, color: "#7c3aed" },
  { key: "cds", he: "CDS View חדש", Icon: FileCode2, color: "#0891b2" },
  { key: "simplification", he: "Simplification Item", Icon: Scissors, color: "#be185d" },
  { key: "migration", he: "השפעת מיגרציה + QA", Icon: Truck, color: "#475569" },
];

export function EccS4Block({ data, title = "ECC6 → S/4HANA" }: { data?: EccS4; title?: string }) {
  const rows = ROWS.filter((r) => data?.[r.key]);
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" dir="rtl">
      <header className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-l from-blue-50 to-white px-5 py-3">
        <ArrowRightLeft className="size-4 text-blue-600" />
        <h3 className="text-sm font-extrabold tracking-tight text-slate-900">{title}</h3>
        <span className="ms-auto text-[11px] font-bold text-slate-400">מעבר מבני · 8 ממדים</span>
      </header>
      {rows.length ? (
        <div className="divide-y divide-slate-100">
          {rows.map(({ key, he, Icon, color }) => (
            <div key={key} className="flex gap-3 px-5 py-2.5">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg" style={{ background: color + "1a" }}><Icon className="size-3.5" style={{ color }} /></span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold" style={{ color }}>{he}</div>
                <div className="text-[13px] leading-relaxed text-slate-600">{data![key]}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="px-5 py-4 text-sm font-semibold text-amber-700">דורש אימות מול מערכת SAP / מקור נוסף.</p>
      )}
    </section>
  );
}
