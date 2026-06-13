import { listDomains, domainBySlug } from "@/data/domains";
import { DomainView } from "@/components/domain-view";

export function generateStaticParams() { return listDomains().map((d) => ({ slug: d.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = domainBySlug(decodeURIComponent(slug));
  if (!d) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">תחום לא נמצא.</div>;
  return <DomainView d={d} />;
}
