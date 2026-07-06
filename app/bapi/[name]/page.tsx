import { listFuncs, funcIntel } from "@/lib/object-intel";
import { RelatedView } from "@/components/related-view";
import { FunctionIntelligence } from "@/components/function-intelligence";

export function generateStaticParams() { return listFuncs("BAPI").concat(listFuncs("FM")).map((name) => ({ name })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<import("next").Metadata> {
  const { name } = await params;
  const n = decodeURIComponent(name);
  const intel = funcIntel(n);
  const kind = intel?.kind === "FM" ? "Function Module" : "BAPI";
  const title = `${n} — SAP ${kind}`;
  const description = `${n} — SAP ${kind}: purpose, parameters, related tables and usage in PP, PP-PI and PM on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: { title: `SAP by Sali | ${title}`, description } };
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const intel = funcIntel(decodeURIComponent(name));
  if (!intel) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">לא נמצא במאגר.</div>;
  return <RelatedView kind={intel.kind === "FM" ? "FM" : "BAPI"} code={intel.name} tables={intel.tables} before={<FunctionIntelligence name={intel.name} />} />;
}
