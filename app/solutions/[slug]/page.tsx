import Link from "next/link";
import { SOLUTIONS, solutionBySlug } from "@/data/solutions";
import { tcodeHref } from "@/lib/tcode-search";
import { tableByName } from "@/lib/knowledge-graph";
import { listFuncs } from "@/lib/object-intel";
import { cdsByView } from "@/data/cds-map";
import { incidentBySlug } from "@/data/troubleshooting";
import { Crumb, CenterHeader, Block } from "@/components/knowledge";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return SOLUTIONS.map((s) => ({ slug: s.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = solutionBySlug(decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.domain, blurb: x.process, path: `/solutions/${slug}/` });
}

const CX: Record<string, string> = { Low: "#16a34a", Medium: "#d97706", High: "#dc2626" };
const FN = new Set(listFuncs());
const tblHref = (t: string) => tableByName(t) ? `/object/${encodeURIComponent(t)}/` : "";
const cdsHref = (v: string) => cdsByView(v) ? `/cds/${encodeURIComponent(v)}/` : "";
const bapiHref = (b: string) => FN.has(b) ? `/bapi/${encodeURIComponent(b)}/` : "";
const incHref = (i: string) => incidentBySlug(i) ? `/resolution/${i}/` : "";

function L({ items, hrefFn }: { items: string[]; hrefFn?: (s: string) => string }) {
  if (!items.length) return <span className="text-ink-3">—</span>;
  return <div className="flex flex-wrap gap-1.5">{items.map((it) => { const h = hrefFn ? hrefFn(it) : ""; return h
    ? <Link key={it} href={h} className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2 hover:border-brand hover:text-brand" dir="ltr">{it}</Link>
    : <span key={it} className="tech rounded-lg border border-dashed border-hairline bg-surface px-2.5 py-1 text-xs font-bold text-ink-3" dir="ltr">{it}</span>; })}</div>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug(decodeURIComponent(slug));
  if (!s) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">פתרון לא נמצא.</div>;
  const c = "#b45309";
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/solutions/", label: "מאתר הפתרונות" }, { label: s.he }]} />
      <CenterHeader eyebrow={`פתרון · ${s.domain} · מורכבות ${s.complexity}`} title={`${s.he} · ${s.title}`} sub={s.process} accent={c} />
      <div className="mb-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold" style={{ borderColor: CX[s.complexity] + "55", color: CX[s.complexity] }}>מורכבות יישום: {s.complexity}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="T-Code (ECC)" accent="#0f766e"><L items={s.eccTcodes} hrefFn={tcodeHref} /></Block>
        <Block title="חלופת S/4HANA" accent="#2563eb">{s.s4Alt}</Block>
        <Block title="אפליקציות Fiori" accent="#7c3aed"><L items={s.fiori} /></Block>
        <Block title="טבלאות" accent="#0891b2"><L items={s.tables} hrefFn={tblHref} /></Block>
        <Block title="CDS Views" accent="#16a34a"><L items={s.cds} hrefFn={cdsHref} /></Block>
        <Block title="APIs (OData)" accent="#0d9488"><L items={s.apis} /></Block>
        <Block title="BAPIs / FMs" accent="#2563eb"><L items={s.bapis} hrefFn={bapiHref} /></Block>
        <Block title="User Exits / BAdIs" accent="#7c3aed"><L items={s.exits} /></Block>
        <Block title="תקלות נפוצות" accent="#dc2626"><L items={s.incidents} hrefFn={incHref} /></Block>
        <Block title="הרשאות (Authorization)" accent="#dc2626"><Link href="/authorizations/" className="text-sm font-bold text-brand hover:underline">אובייקטי הרשאה + אבחון SU53→PFCG →</Link></Block>
        <Block title="מקרי בדיקה (QA)" accent="#be185d"><span className="text-[13px] text-ink-2">תרחישי Positive/Negative/Integration → </span><Link href="/qa-testing/" className="text-sm font-bold text-brand hover:underline">QA Center</Link><span className="text-[13px] text-ink-2"> · התקלות לעיל = תרחישי כשל (Negative).</span></Block>
      </div>
      <div className="mt-4"><Block title="הערות מיגרציה (ECC → S/4HANA)" accent="#2563eb">{s.s4Alt} מורכבות יישום: {s.complexity}. ראה lifecycle לכל T-Code + מרכז המיגרציה.</Block></div>
      <Link href="/solutions/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למאתר הפתרונות</Link>
    </div>
  );
}
