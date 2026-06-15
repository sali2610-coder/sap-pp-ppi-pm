import { CenterHeader } from "@/components/knowledge";
import { TransactionExplorer } from "@/components/transaction-explorer";
import { TRANSACTIONS } from "@/data/transactions";

export default function Page() {
  const pm = TRANSACTIONS.filter((t) => t.module === "PM").length;
  const pp = TRANSACTIONS.filter((t) => t.module === "PP").length;
  const ppi = TRANSACTIONS.filter((t) => t.module === "PP-PI").length;
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Transaction Center" title="מרכז הטרנזקציות" sub={`קטלוג T-Codes לייעוץ — PM ${pm} · PP ${pp} · PP-PI ${ppi}. לכל טרנזקציה: מטרה, מתי/מי, אובייקטים/טבלאות/BAPIs, User Exits, שגיאות נפוצות, ובלוק ECC↔S/4 מלא. טבלת עזר מהירה + חיפוש.`} accent="#0f766e" />
      <TransactionExplorer />
    </div>
  );
}
