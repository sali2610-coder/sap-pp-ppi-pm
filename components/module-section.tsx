import Link from "next/link";
import {
  LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings,
  Cable, AlertTriangle, GitBranch, ArrowLeft, ArrowRight,
} from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import {
  NAV_SECTIONS, sectionBySlug, moduleAccent, tablesByTopic, transactions, funcs,
  cdsViews, fioriApps, masterData, processSteps, configRows, configHeaders, incidents, relatedObjects,
} from "@/lib/module-portal";

const ICONS: Record<string, typeof LayoutGrid> = { LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings, Cable, AlertTriangle, GitBranch };
const fmt = (n: number) => n.toLocaleString("en-US");
const S4_DOT: Record<string, string> = { kept: "#1aa179", replaced: "#c77a0a", removed: "#dc2626" };

function CodeChip({ href, code, he }: { href: string; code: string; he?: string }) {
  return (
    <Link href={href} className="card-interactive group flex items-center gap-2.5 p-2.5" dir="rtl">
      <span className="size-1.5 shrink-0 rounded-full bg-brand" />
      <div className="min-w-0 flex-1">
        <span className="tech block truncate font-mono text-[13px] font-bold text-ink-1" dir="ltr">{code}</span>
        {he && <span className="block truncate text-[11.5px] text-ink-3">{he}</span>}
      </div>
      <ArrowLeft className="size-3.5 shrink-0 text-ink-3/50 transition group-hover:text-brand" />
    </Link>
  );
}

function SectionBody({ module, slug }: { module: SAPModuleData; slug: string }) {
  const accent = moduleAccent(module);
  switch (slug) {
    case "tables": {
      const groups = tablesByTopic(module);
      return (
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g.topic}>
              <h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Table className="size-4 text-ink-3" />{g.topic}<span className="font-mono text-[11px] font-bold text-ink-3">{g.rows.length}</span></h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {g.rows.map((r) => (
                  <Link key={r.code} href={`/object/${encodeURIComponent(r.code)}/`} className="card-interactive group flex items-center gap-2.5 p-2.5" dir="rtl">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: r.s4 ? S4_DOT[r.s4] : "#94a3b8" }} title={r.s4} />
                    <div className="min-w-0 flex-1"><span className="tech block truncate font-mono text-[13px] font-bold text-ink-1" dir="ltr">{r.code}</span><span className="block truncate text-[11.5px] text-ink-3">{r.he}</span></div>
                    <span className="shrink-0 font-mono text-[10.5px] font-bold text-ink-3">{r.fields}<span className="text-ink-3/60"> שד'</span></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "master-data": {
      const rows = masterData(module);
      return <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{rows.map((r) => <CodeChip key={r.code} href={`/object/${encodeURIComponent(r.code)}/`} code={r.code} he={r.he} />)}</div>;
    }
    case "transactions": {
      const tx = transactions(module);
      return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{tx.map((t) => <CodeChip key={t.code} href={`/tcode/${encodeURIComponent(t.code)}/`} code={t.code} />)}</div>;
    }
    case "bapis": {
      const fn = funcs(module, ["BAPI", "FM"]);
      return <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{fn.map((f) => <CodeChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} he={f.kind} />)}</div>;
    }
    case "cds": {
      const v = cdsViews(module);
      return v.length ? <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{v.map((x) => <CodeChip key={x.view} href={`/cds/${encodeURIComponent(x.view)}/`} code={x.view} he={x.tables.slice(0, 3).join(" · ")} />)}</div> : <Empty text="אין CDS Views מאומתות למודול זה עדיין." />;
    }
    case "fiori": {
      const f = fioriApps(module);
      return f.length ? <div className="grid gap-2 sm:grid-cols-2">{f.map((x) => (
        <Link key={x.app} href="/fiori-apps/" className="card-interactive flex items-center gap-3 p-3.5" dir="rtl"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2"><AppWindow className="size-[18px]" /></span><div className="min-w-0"><span className="block truncate text-[13.5px] font-bold text-ink-1">{x.app}</span><span className="tech block text-[11px] text-ink-3" dir="ltr">{x.table}</span></div></Link>
      ))}</div> : <Empty text="אין אפליקציות Fiori מקושרות עדיין." />;
    }
    case "business-process": {
      const steps = processSteps(module);
      return (
        <ol className="relative space-y-2 ps-6">
          <span className="absolute inset-y-2 start-[9px] w-px bg-hairline" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.code} className="relative">
              <span className="absolute -start-6 top-2 grid size-[19px] place-items-center rounded-full border border-hairline bg-surface font-mono text-[10px] font-bold text-ink-3">{i + 1}</span>
              {s.exists
                ? <Link href={`/object/${encodeURIComponent(s.code)}/`} className="card-interactive flex items-center justify-between gap-2 p-3" dir="rtl"><span className="text-[13.5px] font-bold text-ink-1">{s.label}</span><span className="tech font-mono text-[12px] font-bold" style={{ color: accent }} dir="ltr">{s.code}</span></Link>
                : <div className="rounded-xl border border-dashed border-hairline bg-surface-2/40 p-3 text-[13px] font-bold text-ink-3">{s.label} · {s.code}</div>}
            </li>
          ))}
        </ol>
      );
    }
    case "configuration": {
      const headers = configHeaders(module); const rows = configRows(module);
      if (!rows.length) return <Empty text="מדריך הקונפיגורציה יתווסף בקרוב." />;
      return (
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full text-[12.5px]" dir="rtl">
            <thead className="bg-surface-2 text-ink-3"><tr>{headers.map((h) => <th key={h} className="whitespace-nowrap px-3 py-2 text-start font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-hairline hover:bg-surface-2/50">{r.map((c, j) => <td key={j} className="px-3 py-2 text-ink-2">{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    }
    case "integration": {
      const idocs = funcs(module, ["IDoc"]); const bapi = funcs(module, ["BAPI"]);
      return (
        <div className="space-y-6">
          <div><h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Cable className="size-4 text-ink-3" />IDocs<span className="font-mono text-[11px] font-bold text-ink-3">{idocs.length}</span></h3>
            {idocs.length ? <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{idocs.map((f) => <CodeChip key={f.name} href={`/idoc/${encodeURIComponent(f.name)}/`} code={f.name} />)}</div> : <Empty text="אין IDocs מאומתים." />}</div>
          <div><h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Plug className="size-4 text-ink-3" />BAPIs<span className="font-mono text-[11px] font-bold text-ink-3">{bapi.length}</span></h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{bapi.map((f) => <CodeChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} />)}</div></div>
        </div>
      );
    }
    case "troubleshooting": {
      const inc = incidents(module);
      return inc.length ? <div className="grid gap-3 sm:grid-cols-2">{inc.map((i) => (
        <Link key={i.slug} href={`/troubleshooting/${encodeURIComponent(i.slug)}/`} className="card-interactive flex flex-col gap-1.5 p-4" dir="rtl">
          <div className="flex items-center justify-between gap-2"><span className="text-[13.5px] font-extrabold text-ink-1">{i.he}</span>{i.impact && <span className="shrink-0 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">{i.impact}</span>}</div>
          <p className="line-clamp-2 text-[12.5px] leading-relaxed text-ink-3">{i.symptom}</p>
        </Link>
      ))}</div> : <Empty text="אין תקלות מתועדות למודול זה עדיין." />;
    }
    case "related": {
      const rel = relatedObjects(module);
      return rel.length ? <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{rel.map((r) => <CodeChip key={r.code} href={`/object/${encodeURIComponent(r.code)}/`} code={r.code} he={r.he} />)}</div> : <Empty text="אין אובייקטים חוצי-מודול." />;
    }
    default:
      return <Empty text="חלק זה יתווסף בקרוב." />;
  }
}

function Empty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-hairline bg-surface-2/40 py-14 text-center">
      <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-ink-3"><LayoutGrid className="size-6" /></span>
      <p className="text-[13px] font-medium text-ink-3">{text}</p>
    </div>
  );
}

export function ModuleSection({ module, slug, section }: { module: SAPModuleData; slug: string; section: string }) {
  const meta = sectionBySlug(section);
  const accent = moduleAccent(module);
  if (!meta) return null;
  const Ic = ICONS[meta.icon] || GitBranch;
  const idx = NAV_SECTIONS.findIndex((s) => s.slug === section);
  const prev = idx > 0 ? NAV_SECTIONS[idx - 1] : null;
  const next = idx < NAV_SECTIONS.length - 1 ? NAV_SECTIONS[idx + 1] : null;

  return (
    <div dir="rtl" className="space-y-6">
      <nav aria-label="נתיב" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-3">
        <Link href="/" className="hover:text-ink-1">בית</Link><ArrowLeft className="size-3" />
        <Link href={`/${slug}/`} className="font-medium hover:text-ink-1">SAP {module.module}</Link><ArrowLeft className="size-3" />
        <span className="font-bold text-ink-2">{meta.he}</span>
      </nav>

      <header className="flex items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: accent + "12", color: accent }}><Ic className="size-6" /></span>
        <div>
          <span className="eyebrow-2">SAP {module.module} · {meta.en}</span>
          <h1 className="mt-0.5 text-2xl font-black tracking-tight text-ink-1 sm:text-3xl">{meta.he}</h1>
          <p className="mt-1 text-[13.5px] text-ink-3">{meta.desc}</p>
        </div>
      </header>

      <SectionBody module={module} slug={section} />

      {/* prev / next section nav */}
      <div className="flex items-center justify-between gap-2 border-t border-hairline pt-5">
        {prev ? <Link href={`/${slug}/${prev.slug}/`} className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-2 text-[13px] font-bold text-ink-2 hover:border-brand/40 hover:text-brand"><ArrowRight className="size-4" />{prev.he}</Link> : <span />}
        {next ? <Link href={`/${slug}/${next.slug}/`} className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-2 text-[13px] font-bold text-ink-2 hover:border-brand/40 hover:text-brand">{next.he}<ArrowLeft className="size-4" /></Link> : <span />}
      </div>
    </div>
  );
}
