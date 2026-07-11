import { CenterDetail } from "@/components/topic-center";
import { ABAP_TOOLS } from "@/data/centers/abap";
export function generateStaticParams() { return ABAP_TOOLS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ABAP_TOOLS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/abap/" backLabel="מרכז מפתח ABAP" />;
}
