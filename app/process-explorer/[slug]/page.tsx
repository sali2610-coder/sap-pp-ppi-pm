import Link from "next/link";
import { PROCESS_MAPS, processBySlug } from "@/data/processes";
import { tcodeHref } from "@/lib/tcode-search";
import { tableByName } from "@/lib/knowledge-graph";
import { incidentBySlug } from "@/data/troubleshooting";
import { Crumb, CenterHeader } from "@/components/knowledge";

export function generateStaticParams() { return PROCESS_MAPS.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;

function Chips({ items, hrefFn, tone }: { items?: string[]; hrefFn?: (s: string) => string; tone: string }) {
  if (!items || !items.length) return null;
  return <div className="flex flex-wrap gap-1.5">{items.map((it) => { const h = hrefFn ? hrefFn(it) : ""; return h
    ? <Link key={it} href={h} className="tech rounded-md border bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2 hover:border-brand hover:text-brand" style={{ borderColor: tone + "44" }} dir="ltr">{it}</Link>
    : <span key={it} className="tech rounded-md border border-dashed border-hairline bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-3" dir="ltr">{it}</span>; })}</div>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = processBySlug(decodeURIComponent(slug));
  if (!p) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">תהליך לא נמצא.</div>;
  const tbl = (t: string) => tableByName(t) ? `/object/${encodeURIComponent(t)}/` : "";
  const inc = (i: string) => incidentBySlug(i) ? `/resolution/${i}/` : "";
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/process-explorer/", label: "Process Explorer" }, { label: p.he }]} />
      <CenterHeader eyebrow={`תהליך E2E · ${p.domain}`} title={`${p.he} · ${p.title}`} sub={p.summary} accent="#4338ca" />
      <ol className="relative space-y-3 border-r-2 border-indigo-200 pr-5">
        {p.steps.map((s, i) => (
          <li key={i} className="relative">
            <span className="absolute -right-[27px] top-3 grid size-5 place-items-center rounded-full bg-indigo-600 text-[10px] font-extrabold text-white ring-4 ring-white">{i + 1}</span>
            <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-extrabold text-ink-1">{s.he}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <Field label="T-Codes"><Chips items={s.tcodes} hrefFn={tcodeHref} tone="#0f766e" /></Field>
                <Field label="טבלאות"><Chips items={s.tables} hrefFn={tbl} tone="#0891b2" /></Field>
                {s.programs && <Field label="תוכניות"><Chips items={s.programs} tone="#475569" /></Field>}
                {s.fiori && <Field label="Fiori"><Chips items={s.fiori} tone="#7c3aed" /></Field>}
                {s.interfaces && <Field label="ממשקים"><Chips items={s.interfaces} tone="#0d9488" /></Field>}
                {s.incidents && s.incidents.length > 0 && <Field label="תקלות"><Chips items={s.incidents} hrefFn={inc} tone="#dc2626" /></Field>}
              </div>
              {s.test && <p className="mt-2 rounded-lg bg-fuchsia-50 px-2.5 py-1.5 text-[11px] font-semibold text-fuchsia-800">QA: {s.test}</p>}
            </div>
          </li>
        ))}
      </ol>
      <Link href="/process-explorer/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה ל-Process Explorer</Link>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="eyebrow mb-1 text-ink-3">{label}</p>{children}</div>;
}
