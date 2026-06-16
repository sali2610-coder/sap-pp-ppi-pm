import { OIC_OBJECTS, oicBySlug, objectGraph } from "@/lib/cross-links";
import { ObjectIntelView } from "@/components/object-intel-center";

export function generateStaticParams() { return OIC_OBJECTS.map((o) => ({ slug: o.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const obj = oicBySlug(decodeURIComponent(slug));
  const graph = obj ? objectGraph(obj.table) : null;
  if (!obj || !graph) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">אובייקט לא נמצא.</div>;
  return <ObjectIntelView obj={obj} graph={graph} />;
}
