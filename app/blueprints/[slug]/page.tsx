import { CenterDetail } from "@/components/topic-center";
import { BLUEPRINTS } from "@/data/centers/blueprints";

export function generateStaticParams() { return BLUEPRINTS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = BLUEPRINTS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/blueprints/" backLabel="מרכז הבלופרינטים" />;
}
