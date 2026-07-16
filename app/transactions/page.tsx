import { CenterHeader } from "@/components/knowledge";
import { TransactionWorkspace } from "@/components/transaction-workspace";
import { TxSearch } from "@/components/tx-search";
import { buildSearchIndex } from "@/lib/tcode-search";
import { registryStats } from "@/lib/tx-registry";

export const metadata = { title: "מרכז הטרנזקציות · Transaction Intelligence · NEO" };

// ONE master Transaction Center (P3). The registry-wide TransactionWorkspace is
// the single center; every transaction opens its own page at /tcode/<code>/.
// The legacy /transactions/<code> + /tcode-dir routes and the duplicate
// TransactionExplorer table were removed. The collapsed multi-entity search
// (tables · errors · CDS · Fiori) is a distinct cross-entity lookup, kept.
export default function Page() {
  const index = buildSearchIndex();
  const reg = registryStats();
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Transaction Intelligence" title="מרכז הטרנזקציות" sub={`רישום קנוני אחד — ${reg.total} טרנזקציות SAP מאומתות, מתוכן ${reg.deep} מתועדות לעומק כעמודי Wiki מלאים. כל טרנזקציה בעמוד משלה. חיפוש חכם (קוד · שם עברי/אנגלי · תיאור) + מסננים.`} accent="#0f766e" />
      <TransactionWorkspace />
      <details className="mt-8 rounded-2xl border border-hairline bg-surface p-2" dir="rtl">
        <summary className="cursor-pointer px-3 py-2 text-sm font-bold text-ink-2">חיפוש חוצה-ישויות (טבלה · שגיאה · תהליך · אובייקט · CDS · Fiori)</summary>
        <div className="px-1 pt-2"><TxSearch index={index} /></div>
      </details>
    </div>
  );
}
