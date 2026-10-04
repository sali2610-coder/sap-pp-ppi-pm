import { listTcodes, tcodeIntel } from "@/lib/object-intel";
import { hasTxIntel } from "@/lib/tx-intel";
import { registryRouteCodes, registryTx } from "@/lib/tx-registry";
import { canonicalTxCode } from "@/lib/tx-route-aliases";
import { RelatedView } from "@/components/related-view";
import { TransactionPage } from "@/components/transaction-page";
import { TransactionLight } from "@/components/transaction-light";
import { og } from "@/lib/seo";

export function generateStaticParams() {
  const all = new Set<string>();
  registryRouteCodes().forEach((c) => all.add(c.toUpperCase()));
  listTcodes().forEach((c) => all.add(c.toUpperCase()));
  return [...all].map((code) => ({ code }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<import("next").Metadata> {
  const { code } = await params;
  const c = canonicalTxCode(decodeURIComponent(code));
  const title = `${c} — SAP Transaction Code`;
  const description = `${c} — SAP transaction: purpose, related tables, BAPIs and S/4HANA Fiori mapping on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: og(`SAP by Sali | ${title}`, description) };
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cu = canonicalTxCode(decodeURIComponent(code));
  // 1) Full Transaction Intelligence page when authored…
  if (hasTxIntel(cu)) return <TransactionPage code={cu} />;
  // 2) Light verified-breadth page when in the canonical registry…
  if (registryTx(cu)) return <TransactionLight code={cu} />;
  // 3) …otherwise the dataset-derived related view.
  const intel = tcodeIntel(cu);
  if (!intel) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">T-Code לא נמצא במאגר.</div>;
  return (
    <>
      <RelatedView kind="T-Code" code={intel.code} tables={intel.tables} />
    </>
  );
}
