import { listTcodes, tcodeIntel } from "@/lib/object-intel";
import { RelatedView } from "@/components/related-view";

export function generateStaticParams() { return listTcodes().map((code) => ({ code })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const intel = tcodeIntel(decodeURIComponent(code));
  if (!intel) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">T-Code לא נמצא במאגר.</div>;
  return <RelatedView kind="T-Code" code={intel.code} tables={intel.tables} />;
}
