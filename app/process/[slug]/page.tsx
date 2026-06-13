import { listProcesses, processIntel, funcHref, cleanFunc } from "@/lib/object-intel";
import { RelatedView } from "@/components/related-view";

export function generateStaticParams() { return listProcesses().map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const intel = processIntel(decodeURIComponent(slug));
  if (!intel) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">תהליך לא נמצא.</div>;
  const accent = intel.module === "PM" ? "#f97316" : "#6d28d9";
  return <RelatedView kind="Process" code={intel.title} accent={accent} tables={intel.tables}
    chips={[
      { label: "T-Codes", icon: "tcode", items: intel.tcodes.map((c) => ({ text: c, href: `/tcode/${encodeURIComponent(c)}` })) },
      { label: "BAPIs / Functions", icon: "bapi", items: intel.bapis.map((c) => ({ text: cleanFunc(c), href: funcHref(c) })) },
    ]} />;
}
