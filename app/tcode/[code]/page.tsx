import { listTcodes, tcodeIntel } from "@/lib/object-intel";
import { txCodes, hasTxIntel } from "@/lib/tx-intel";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { RelatedView } from "@/components/related-view";
import { TransactionPage } from "@/components/transaction-page";

export function generateStaticParams() {
  const all = new Set<string>();
  txCodes().forEach((c) => all.add(c.toUpperCase()));
  listTcodes().forEach((c) => all.add(c.toUpperCase()));
  TRANSACTIONS.forEach((t) => all.add(t.code.toUpperCase()));
  TCODE_DIRECTORY.forEach((t) => all.add(t.code.toUpperCase()));
  return [...all].map((code) => ({ code }));
}
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cu = decodeURIComponent(code).toUpperCase();
  // Rich Transaction Intelligence page when the catalog has it…
  if (hasTxIntel(cu)) return <TransactionPage code={cu} />;
  // …otherwise fall back to the dataset-derived related view.
  const intel = tcodeIntel(cu);
  if (!intel) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">T-Code לא נמצא במאגר.</div>;
  return <RelatedView kind="T-Code" code={intel.code} tables={intel.tables} />;
}
