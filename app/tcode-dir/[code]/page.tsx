import Link from "next/link";
import { TCODE_DIRECTORY, tcodeDirBySlug, dirSlug } from "@/data/tcode-directory";
import { tcodeDirLinks } from "@/lib/tcode-search";
import { Crumb, CenterHeader, Block } from "@/components/knowledge";
import { EccS4Block } from "@/components/ecc-s4-block";
import { LifecycleBlock } from "@/components/lifecycle-block";
import { TrustBadge } from "@/components/trust-badge";
import { trustTcode } from "@/lib/trust";
import { lifecycle } from "@/data/lifecycle";

export function generateStaticParams() { return TCODE_DIRECTORY.map((t) => ({ code: dirSlug(t.code) })); }
export const dynamicParams = false;

const DOM_COLOR: Record<string, string> = { PP: "#2563eb", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488", MM: "#0891b2", SD: "#db2777", FI: "#16a34a", CO: "#ca8a04", BASIS: "#475569", ABAP: "#7c3aed", SECURITY: "#dc2626", INTEGRATION: "#0e7490", FIORI: "#9333ea" };

function Chips({ items }: { items: { label: string; href: string }[] }) {
  if (!items.length) return <span className="text-slate-400">—</span>;
  return <div className="flex flex-wrap gap-1.5">{items.map((r) => <Link key={r.href + r.label} href={r.href} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 hover:border-brand hover:text-brand" dir="ltr">{r.label}</Link>)}</div>;
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = tcodeDirBySlug(decodeURIComponent(code));
  if (!t) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">טרנזקציה לא נמצאה.</div>;
  const c = DOM_COLOR[t.domain] || "#475569";
  const links = tcodeDirLinks(t.code);
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/transactions/", label: "מרכז הטרנזקציות" }, { label: t.code }]} />
      <CenterHeader eyebrow={`טרנזקציה · ${t.domain}`} title={`${t.code} · ${t.he}`} sub={t.purpose} accent={c} />
      <div className="mb-4"><TrustBadge trust={trustTcode(lifecycle(t.code).status !== "Active")} /></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="שימוש עסקי / הקשר" accent={c}>{t.purpose} (תחום {t.domain}).</Block>
        <Block title="מילות מפתח / חיפוש" accent="#0891b2"><div className="flex flex-wrap gap-1.5">{t.keywords.map((k) => <span key={k} className="tech rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500" dir="ltr">{k}</span>)}</div></Block>
        <Block title="תקלות קשורות" accent="#dc2626"><Chips items={links.incidents} /></Block>
        <Block title="Exits / BAdIs" accent="#7c3aed"><Chips items={links.exits} /></Block>
        <Block title="טבלאות קשורות" accent="#0891b2"><Chips items={links.tables} /></Block>
        <Block title={`T-Codes נוספים · ${t.domain}`} accent={c}><Chips items={links.related} /></Block>
      </div>
      <div className="mt-4"><LifecycleBlock code={t.code} /></div>
      <p className="mt-4 text-xs text-slate-400">רמת מדריך (Directory). לפירוט מלא (Input/Output/QA) ראה את ה-T-Codes המורחבים במרכז הטרנזקציות.</p>
      <Link href="/transactions/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למרכז הטרנזקציות</Link>
    </div>
  );
}
