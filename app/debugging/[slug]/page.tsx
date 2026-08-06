import { CenterDetail } from "@/components/topic-center";
import { DEBUGGINGS } from "@/data/centers/debugging";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return DEBUGGINGS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = DEBUGGINGS.find((i) => i.slug === decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.module, blurb: x.sub, path: `/debugging/${slug}/` });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = DEBUGGINGS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/debugging/" backLabel="מרכז ה-Debugging" />;
}
