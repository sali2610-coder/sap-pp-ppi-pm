import { CenterHeader } from "@/components/knowledge";
import { TransactionExplorer } from "@/components/transaction-explorer";
import { TxSearch } from "@/components/tx-search";
import { buildSearchIndex, allTcodesMerged } from "@/lib/tcode-search";

export default function Page() {
  const merged = allTcodesMerged();
  const index = buildSearchIndex();
  const byDomain = (d: string) => merged.filter((t) => t.domain === d).length;
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Transaction Intelligence" title="מרכז הטרנזקציות" sub={`${merged.length} T-Codes על פני 13 תחומים (PP/PP-PI/PM/QM/MM/SD/FI/CO/BASIS/ABAP/Security/Integration/Fiori) · ${merged.filter((t) => t.deep).length} מתועדים לעומק. חיפוש חכם לפי T-Code · טבלה · שגיאה · תהליך · אובייקט.`} accent="#0f766e" />
      <TxSearch index={index} />
      <div className="mt-8 mb-3 flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-400" dir="rtl">
        {["MM", "SD", "FI", "CO", "PP", "PP-PI", "PM", "QM", "BASIS", "ABAP", "SECURITY", "INTEGRATION", "FIORI"].map((dm) => <span key={dm} className="rounded-full bg-slate-100 px-2 py-0.5">{dm} {byDomain(dm)}</span>)}
      </div>
      <h2 className="mb-3 mt-6 text-lg font-extrabold tracking-tight text-slate-900" dir="rtl">T-Codes מתועדים לעומק (14 עמודות)</h2>
      <TransactionExplorer />
    </div>
  );
}
