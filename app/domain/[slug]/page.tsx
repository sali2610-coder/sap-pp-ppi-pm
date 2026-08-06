import { listDomains, domainBySlug } from "@/data/domains";
import { DomainView } from "@/components/domain-view";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return listDomains().map((d) => ({ slug: d.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = domainBySlug(decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.module, blurb: x.summary, path: `/domain/${slug}/` });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = domainBySlug(decodeURIComponent(slug));
  if (!d) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">תחום לא נמצא.</div>;
  return (
    <>
      <DomainView d={d} />
    </>
  );
}
