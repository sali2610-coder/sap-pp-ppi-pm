import Link from "next/link";
import { EXITS, exitBySlug, exitSlug } from "@/data/exits";
import { Crumb, CenterHeader, Block } from "@/components/knowledge";
import { EccS4Block } from "@/components/ecc-s4-block";
import { SapTip } from "@/components/sap-tip";
import { TrustBadge } from "@/components/trust-badge";
import { trustExit } from "@/lib/trust";

export function generateStaticParams() { return EXITS.map((e) => ({ slug: exitSlug(e.name) })); }
export const dynamicParams = false;

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = exitBySlug(decodeURIComponent(slug));
  if (!e) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">ההרחבה לא נמצאה.</div>;
  const c = MOD_COLOR[e.module];
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/exits/", label: "מרכז ההרחבות" }, { label: e.name }]} />
      <CenterHeader eyebrow={`${e.kind} · ${e.module}`} title={e.name} sub={e.purpose} accent={c} />
      <div className="mb-4"><TrustBadge trust={trustExit(e.inferred)} /></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="נקודת הפעלה (Trigger)" accent={c}>{e.trigger}</Block>
        <Block title="אובייקט טכני" accent={c}><span className="tech" dir="ltr">{e.object}</span></Block>
        <Block title="דוגמת שימוש" accent="#0891b2">{e.example}</Block>
        <Block title="שיטת Debug" accent="#be185d">{e.debugging}</Block>
      </div>
      {e.tcodes.length > 0 && (
        <div className="mt-4"><Block title="טרנזקציות קשורות" accent="#475569">
          <div className="flex flex-wrap gap-1.5">{e.tcodes.map((t) => <SapTip key={t} name={t}><span className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{t}</span></SapTip>)}</div>
        </Block></div>
      )}
      <div className="mt-4"><EccS4Block data={e.eccS4} title={`ECC6 → S/4HANA · ${e.name}`} /></div>
      <Link href="/exits/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למרכז ההרחבות</Link>
    </div>
  );
}
