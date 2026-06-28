import { CenterHeader } from "@/components/knowledge";
import { TransactionExplorer } from "@/components/transaction-explorer";
import { TransactionWorkspace } from "@/components/transaction-workspace";
import { TxSearch } from "@/components/tx-search";
import { buildSearchIndex, allTcodesMerged } from "@/lib/tcode-search";
import { registryStats } from "@/lib/tx-registry";

export const metadata = { title: "מרכז הטרנזקציות · Transaction Intelligence · NEO" };

export default function Page() {
  const merged = allTcodesMerged();
  const index = buildSearchIndex();
  const reg = registryStats();
  const byDomain = (d: string) => merged.filter((t) => t.domain === d).length;
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Transaction Intelligence" title="מרכז הטרנזקציות" sub={`רישום קנוני אחד — ${reg.total} טרנזקציות SAP מאומתות, מתוכן ${reg.deep} מתועדות לעומק כעמודי Wiki מלאים. סביבת עבודה ליועץ — מועדפים, נצפו לאחרונה, פופולרי, חיפוש ומסננים.`} accent="#0f766e" />
      <TransactionWorkspace />
      <details className="mt-8 rounded-2xl border border-slate-200 bg-white p-2" dir="rtl">
        <summary className="cursor-pointer px-3 py-2 text-sm font-bold text-slate-600">חיפוש חכם מורחב (טבלה · שגיאה · תהליך · אובייקט)</summary>
        <div className="px-1 pt-2"><TxSearch index={index} /></div>
      </details>
      <div className="mt-8 mb-3 flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-400" dir="rtl">
        {["MM", "SD", "FI", "CO", "PP", "PP-PI", "PM", "QM", "BASIS", "ABAP", "SECURITY", "INTEGRATION", "FIORI"].map((dm) => <span key={dm} className="rounded-full bg-slate-100 px-2 py-0.5">{dm} {byDomain(dm)}</span>)}
      </div>
      <h2 className="mb-3 mt-6 text-lg font-extrabold tracking-tight text-slate-900" dir="rtl">T-Codes מתועדים לעומק (טבלת 14 עמודות)</h2>
      <div className="overflow-x-auto [scrollbar-width:thin]"><TransactionExplorer /></div>
    </div>
  );
}
