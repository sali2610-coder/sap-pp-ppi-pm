import { WORKBENCHES, workbenchBySlug } from "@/data/workbenches";
import { WorkbenchView } from "@/components/workbench-view";

export function generateStaticParams() { return WORKBENCHES.map((w) => ({ slug: w.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = workbenchBySlug(decodeURIComponent(slug));
  if (!w) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">שולחן העבודה לא נמצא.</div>;
  return <WorkbenchView w={w} />;
}
