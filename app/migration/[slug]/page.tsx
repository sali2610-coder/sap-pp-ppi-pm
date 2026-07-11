import { CenterDetail } from "@/components/topic-center";
import { MIGRATIONS } from "@/data/centers/migration";

export function generateStaticParams() { return MIGRATIONS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = MIGRATIONS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/migration/" backLabel="מרכז המיגרציה" />;
}
