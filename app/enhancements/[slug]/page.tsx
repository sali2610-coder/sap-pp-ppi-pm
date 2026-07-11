import { ENHANCEMENTS, enhancementBySlug } from "@/data/enhancements";
import { Crumb, CenterHeader, Block, TwoCol, Chips } from "@/components/knowledge";

export function generateStaticParams() { return ENHANCEMENTS.map((e) => ({ slug: e.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = enhancementBySlug(slug);
  if (!e) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">ההרחבה לא נמצאה.</div>;
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/enhancements/", label: "הרחבות" }, { label: e.he }]} />
      <CenterHeader eyebrow={`טכניקת הרחבה · ${e.kind}`} title={`${e.he} · ${e.title}`} sub={e.def} accent="#7c3aed" />
      <div className="space-y-4">
        <Block title="איך מממשים" accent="#7c3aed">{e.how}</Block>
        <TwoCol aTitle="ב-ECC" bTitle="ב-S/4HANA" a={e.ecc} b={e.s4} aAccent="#64748b" bAccent="#16a34a" />
        <TwoCol aTitle="דוגמת אחזקה (PM)" bTitle="דוגמת ייצור (PP/PP-PI)" a={e.pmExample} b={e.ppExample} aAccent="#f97316" bAccent="#6d28d9" />
        <Block title="תרחיש עסקי" accent="#0891b2">{e.scenario}</Block>
        <Block title="טרנזקציות" accent="#475569"><Chips items={e.tcodes} /></Block>
        {e.note && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800" dir="rtl">⚠️ {e.note}</div>}
      </div>
    </div>
  );
}
