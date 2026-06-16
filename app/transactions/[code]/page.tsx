import Link from "next/link";
import { TRANSACTIONS, tcodeByCode } from "@/data/transactions";
import { Crumb, CenterHeader, Block, Bullets } from "@/components/knowledge";
import { EccS4Block } from "@/components/ecc-s4-block";
import { LifecycleBlock } from "@/components/lifecycle-block";
import { SapTip } from "@/components/sap-tip";

export function generateStaticParams() { return TRANSACTIONS.map((t) => ({ code: t.code })); }
export const dynamicParams = false;

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9" };

function ChipRow({ title, items, link }: { title: string; items?: string[]; link?: boolean }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="eyebrow mb-1.5 text-slate-400">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => link
          ? <SapTip key={it} name={it}><span className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{it}</span></SapTip>
          : <span key={it} className="tech rounded-lg border border-dashed border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-500" dir="ltr">{it}</span>)}
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = tcodeByCode(decodeURIComponent(code));
  if (!t) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">הטרנזקציה לא נמצאה.</div>;
  const c = MOD_COLOR[t.module];
  return (
    <div>
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/transactions/", label: "מרכז הטרנזקציות" }, { label: t.code }]} />
      <CenterHeader eyebrow={`טרנזקציה · ${t.module} · ${t.topic}`} title={`${t.code} · ${t.title}`} sub={t.purpose} accent={c} />

      <div className="mb-4"><Block title="תהליך עסקי (Business Process)" accent={c}>{t.process}</Block></div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="מתי משתמשים" accent={c}>{t.whenToUse}</Block>
        <Block title="מי משתמש" accent={c}>{t.who}</Block>
        <Block title="קלט (Input)" accent="#0891b2">{t.input}</Block>
        <Block title="פלט (Output)" accent="#16a34a">{t.output}</Block>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Block title="אובייקטים ונתונים קשורים" accent="#0891b2">
          <div className="space-y-3">
            <ChipRow title="אובייקטים עסקיים" items={t.objects} />
            <ChipRow title="טבלאות" items={t.tables} link />
            <ChipRow title="BAPIs / FMs" items={t.funcs} link />
            <ChipRow title="User Exits / BAdIs" items={t.exits} />
          </div>
        </Block>
        <Block title="שגיאות נפוצות ואבחון (Troubleshooting)" accent="#dc2626"><Bullets items={t.errors || []} /></Block>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {t.qa && <Block title="QA / תרחישי בדיקה" accent="#be185d">{t.qa}</Block>}
        {t.fiori && <Block title="חלופת Fiori" accent="#7c3aed">{t.fiori}</Block>}
      </div>

      <div className="mt-4"><LifecycleBlock code={t.code} /></div>

      <div className="mt-4">
        <EccS4Block data={t.eccS4} title={`ECC6 → S/4HANA · ${t.code}`} />
      </div>

      <Link href="/transactions/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למרכז הטרנזקציות</Link>
    </div>
  );
}
