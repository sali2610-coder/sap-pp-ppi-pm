import { CenterDetail } from "@/components/topic-center";
import { CONFIG_TOPICS } from "@/data/centers/config";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return CONFIG_TOPICS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = CONFIG_TOPICS.find((i) => i.slug === decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.module, blurb: x.sub, path: `/config/${slug}/` });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = CONFIG_TOPICS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/config/" backLabel="מרכז הקונפיגורציה" />;
}
