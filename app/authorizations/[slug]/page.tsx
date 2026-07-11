import { CenterDetail } from "@/components/topic-center";
import { PROCESS_AUTH } from "@/data/centers/process-auth";

export function generateStaticParams() { return PROCESS_AUTH.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = PROCESS_AUTH.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/authorizations/" backLabel="מרכז ההרשאות" />;
}
