import { listCdsViews, cdsByView } from "@/data/cds-map";
import { tableByName } from "@/lib/knowledge-graph";
import { RelatedView } from "@/components/related-view";
import type { Module } from "@/lib/types";

export function generateStaticParams() { return listCdsViews().map((view) => ({ view })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const v = cdsByView(decodeURIComponent(view));
  if (!v) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">CDS View לא נמצא.</div>;
  const accent = v.module === "PM" ? "#f97316" : "#6d28d9";
  const tables = v.tables.map((n) => { const t = tableByName(n); return { name: n, module: (t?.module || v.module) as Module, he: t?.descriptionHe || "" }; });
  return <RelatedView kind="CDS" code={v.view} accent={accent} tables={tables} />;
}
