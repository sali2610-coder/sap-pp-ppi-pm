import { listFuncs, funcIntel } from "@/lib/object-intel";
import { RelatedView } from "@/components/related-view";

export function generateStaticParams() { return listFuncs("IDoc").map((name) => ({ name })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const intel = funcIntel(decodeURIComponent(name));
  if (!intel) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">IDoc לא נמצא במאגר.</div>;
  return <RelatedView kind="IDoc" code={intel.name} tables={intel.tables} />;
}
