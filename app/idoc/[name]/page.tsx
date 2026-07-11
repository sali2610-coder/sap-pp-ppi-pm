import { listFuncs, funcIntel } from "@/lib/object-intel";
import { RelatedView } from "@/components/related-view";
import { FunctionIntelligence } from "@/components/function-intelligence";

export function generateStaticParams() { return listFuncs("IDoc").map((name) => ({ name })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<import("next").Metadata> {
  const { name } = await params;
  const n = decodeURIComponent(name);
  const title = `${n} — SAP IDoc`;
  const description = `${n} — SAP IDoc interface: segments, message type and integration usage in PP, PP-PI and PM on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: { title: `SAP by Sali | ${title}`, description } };
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const intel = funcIntel(decodeURIComponent(name));
  if (!intel) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">IDoc לא נמצא במאגר.</div>;
  return <RelatedView kind="IDoc" code={intel.name} tables={intel.tables} before={<FunctionIntelligence name={intel.name} />} />;
}
