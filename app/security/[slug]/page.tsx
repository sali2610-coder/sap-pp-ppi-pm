import { AUTH_ITEMS, authBySlug } from "@/data/authorizations";
import { Crumb, CenterHeader, Block, TwoCol, Bullets } from "@/components/knowledge";
import { ObjectIntelligence } from "@/components/object-intelligence";

export function generateStaticParams() { return AUTH_ITEMS.map((a) => ({ slug: a.slug })); }
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = authBySlug(slug);
  if (!a) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">הפריט לא נמצא.</div>;
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/security/", label: "הרשאות ואבטחה" }, { label: a.he }]} />
      <CenterHeader eyebrow={a.kind === "Tcode" ? `טרנזקציה · ${a.title}` : "מושג הרשאות"} title={`${a.he} · ${a.title}`} sub={a.purpose} accent="#dc2626" />
      <div className="space-y-4">
        <Block title="פירוט" accent="#dc2626">{a.detail}</Block>
        <TwoCol aTitle="כשלים נפוצים" bTitle="צעדי אבחון ופתרון" a={<Bullets items={a.failures} />} b={<Bullets items={a.troubleshoot} />} aAccent="#dc2626" bAccent="#16a34a" />
        <TwoCol aTitle="דוגמת אחזקה (PM)" bTitle="דוגמת ייצור (PP/PP-PI)" a={a.pmExample} b={a.ppExample} aAccent="#f97316" bAccent="#6d28d9" />
        <TwoCol aTitle="ב-ECC" bTitle="ב-S/4HANA" a={a.ecc} b={a.s4} aAccent="#64748b" bAccent="#2563eb" />
      </div>
      <div className="mt-6">
        <ObjectIntelligence name={a.slug} kind="auth" />
      </div>
    </div>
  );
}
