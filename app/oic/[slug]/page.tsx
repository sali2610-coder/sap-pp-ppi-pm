import { OIC_OBJECTS, oicBySlug, objectGraph } from "@/lib/cross-links";
import { ObjectIntelView } from "@/components/object-intel-center";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return OIC_OBJECTS.map((o) => ({ slug: o.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = oicBySlug(decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.module, blurb: x.description, path: `/oic/${slug}/` });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const obj = oicBySlug(decodeURIComponent(slug));
  const graph = obj ? objectGraph(obj.table, { he: obj.he, module: obj.module }) : null;
  if (!obj || !graph) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">אובייקט לא נמצא.</div>;
  return <ObjectIntelView obj={obj} graph={graph} />;
}
