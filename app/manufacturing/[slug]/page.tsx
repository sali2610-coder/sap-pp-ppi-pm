import { CenterDetail } from "@/components/topic-center";
import { MFG_SCENARIOS } from "@/data/centers/manufacturing";

export function generateStaticParams() { return MFG_SCENARIOS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = MFG_SCENARIOS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/manufacturing/" backLabel="מרכז התרחישים" />;
}
