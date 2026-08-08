import { forWhiteText } from "@/lib/contrast";
import Link from "next/link";
import { QA_PACKS, qaPackBySlug, type QaKind } from "@/data/qa-center";
import { Crumb, CenterHeader, Block } from "@/components/knowledge";
import { SapTip } from "@/components/sap-tip";

export function generateStaticParams() { return QA_PACKS.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };
const KIND_COLOR: Record<QaKind, string> = { Positive: "#16a34a", Negative: "#dc2626", Regression: "#d97706", Integration: "#2563eb", Validation: "#7c3aed" };
const KIND_HE: Record<QaKind, string> = { Positive: "חיובי", Negative: "שלילי", Regression: "רגרסיה", Integration: "אינטגרציה", Validation: "ולידציה" };
const ORDER: QaKind[] = ["Validation", "Positive", "Negative", "Integration", "Regression"];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = qaPackBySlug(decodeURIComponent(slug));
  if (!p) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">חבילת הבדיקה לא נמצאה.</div>;
  const c = MOD_COLOR[p.module];
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/qa-testing/", label: "מרכז בדיקות QA" }, { label: p.he }]} />
      <CenterHeader eyebrow={`חבילת בדיקות · ${p.module} · ${p.area}`} title={p.he} sub={p.intro} accent={c} />

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Block title="T-Codes" accent="#0891b2"><div className="flex flex-wrap gap-1.5">{p.tcodes.map((t) => <SapTip key={t} name={t}><span className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{t}</span></SapTip>)}</div></Block>
        <Block title="טבלאות" accent="#0891b2"><div className="flex flex-wrap gap-1.5">{p.tables.map((t) => <SapTip key={t} name={t}><span className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{t}</span></SapTip>)}</div></Block>
      </div>

      <div className="space-y-4">
        {ORDER.map((kind) => {
          const items = p.scenarios.filter((s) => s.kind === kind);
          if (!items.length) return null;
          const col = KIND_COLOR[kind];
          return (
            <section key={kind} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1">
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: forWhiteText(col)}}>{KIND_HE[kind]}</span>
                <span className="text-ink-3">{kind} · {items.length}</span>
              </h2>
              <ul className="space-y-2">
                {items.map((s, i) => (
                  <li key={i} className="flex gap-2.5 rounded-xl border border-hairline bg-surface-2/50 p-3 text-sm text-ink-2">
                    <span className="mt-1 size-2 shrink-0 rounded-full" style={{ background: col }} />{s.he}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <Link href="/qa-testing/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למרכז בדיקות QA</Link>
    </div>
  );
}
