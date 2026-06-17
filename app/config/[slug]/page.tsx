import { CenterDetail } from "@/components/topic-center";
import { CONFIG_TOPICS } from "@/data/centers/config";

export function generateStaticParams() { return CONFIG_TOPICS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CONFIG_TOPICS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/config/" backLabel="מרכז הקונפיגורציה" />;
}
