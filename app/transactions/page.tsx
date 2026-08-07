import { CenterHeader } from "@/components/knowledge";
import { TransactionWorkspace } from "@/components/transaction-workspace";
import { TxSearch } from "@/components/tx-search";
import { registryStats } from "@/lib/tx-registry";

export const metadata = { title: "מרכז הטרנזקציות · Transaction Intelligence · NEO" };

// ONE master Transaction Center (P3). The registry-wide TransactionWorkspace is
// the single center; every transaction opens its own page at /tcode/<code>/.
// The legacy /transactions/<code> + /tcode-dir routes and the duplicate
// TransactionExplorer table were removed. The collapsed multi-entity search
// (tables · errors · CDS · Fiori) is a distinct cross-entity lookup, kept.
// TxSearch fetches its own index from /tx-search-index.json on first use. It used
// to receive it as a prop, which serialized all 2,167 entries into this page's
// RSC payload — 639 KB of a 1,574 KB document, for a panel that starts collapsed.
export default function Page() {
  const reg = registryStats();
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Transaction Intelligence" title="מרכז הטרנזקציות" sub={`רישום קנוני אחד — ${reg.total} טרנזקציות SAP מאומתות, מתוכן ${reg.deep} מתועדות לעומק כעמודי Wiki מלאים. כל טרנזקציה בעמוד משלה. חיפוש חכם (קוד · שם עברי/אנגלי · תיאור) + מסננים.`} accent="#0f766e" />
      <TransactionWorkspace />
      <details className="mt-8 rounded-2xl border border-hairline bg-surface p-2" dir="rtl">
        <summary className="cursor-pointer px-3 py-2 text-sm font-bold text-ink-2">חיפוש חוצה-ישויות (טבלה · שגיאה · תהליך · אובייקט · CDS · Fiori)</summary>
        <div className="px-1 pt-2"><TxSearch /></div>
      </details>
    </div>
  );
}
