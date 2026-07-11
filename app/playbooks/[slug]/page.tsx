import { CenterDetail } from "@/components/topic-center";
import { PLAYBOOKS } from "@/data/centers/playbooks";
export function generateStaticParams() { return PLAYBOOKS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = PLAYBOOKS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/playbooks/" backLabel="מדריכי יישום" />;
}
