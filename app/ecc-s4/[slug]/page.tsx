import { ECC_S4_TOPICS, eccS4BySlug, STATUS_HE, STATUS_COLOR } from "@/data/ecc-s4";
import { Crumb, CenterHeader, Block, TwoCol } from "@/components/knowledge";

export function generateStaticParams() { return ECC_S4_TOPICS.map((t) => ({ slug: t.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = eccS4BySlug(slug);
  if (!t) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">הנושא לא נמצא.</div>;
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/ecc-s4/", label: "ECC מול S/4" }, { label: t.he }]} />
      <CenterHeader eyebrow="השוואת ECC ↔ S/4HANA" title={`${t.he} · ${t.title}`} sub={t.s4} accent="#2563eb" />
      <div className="mb-4 flex items-center gap-2" dir="rtl">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: STATUS_COLOR[t.status] }}>
          סטטוס: {STATUS_HE[t.status]}
        </span>
      </div>
      <div className="space-y-4">
        <TwoCol aTitle="ב-ECC" bTitle="ב-S/4HANA" a={t.ecc} b={t.s4} aAccent="#64748b" bAccent={STATUS_COLOR[t.status]} />
        {t.fioriCds && <Block title="חלופת Fiori / CDS" accent="#0891b2">{t.fioriCds}</Block>}
        {t.simplification && t.simplification !== "—" && <Block title="פריט פישוט (Simplification Item)" accent="#7c3aed">{t.simplification}</Block>}
        <Block title="השפעת מיגרציה" accent="#dc2626">{t.impact}</Block>
        {t.note && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800" dir="rtl">⚠️ {t.note}</div>}
      </div>
    </div>
  );
}
