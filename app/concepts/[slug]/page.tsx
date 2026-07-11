import Link from "next/link";
import { CONCEPTS, conceptBySlug } from "@/data/concepts";
import { Crumb, CenterHeader, Block, TwoCol, Chips } from "@/components/knowledge";

export function generateStaticParams() { return CONCEPTS.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = conceptBySlug(slug);
  if (!c) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">המושג לא נמצא.</div>;
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/concepts/", label: "מושגי SAP" }, { label: c.he }]} />
      <CenterHeader eyebrow="מושג SAP" title={`${c.he} · ${c.title}`} sub={c.biz} accent="#0891b2" />
      <div className="space-y-4">
        <Block title="הסבר טכני" accent="#0891b2">{c.tech}</Block>
        <TwoCol aTitle="ב-ECC" bTitle="ב-S/4HANA" a={c.ecc} b={c.s4} aAccent="#64748b" bAccent="#16a34a" />
        <Block title="דוגמאות" accent="#f97316"><Chips items={c.examples} /></Block>
        <Block title="קשור" accent="#7c3aed">
          <Chips items={c.related} render={(r) => {
            const target = conceptBySlug(r);
            return target ? <Link href={`/concepts/${r}/`} className="tech rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700 hover:bg-cyan-100" dir="ltr">{target.he}</Link>
              : <span className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{r}</span>;
          }} />
        </Block>
      </div>
    </div>
  );
}
