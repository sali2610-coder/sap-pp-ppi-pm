import Link from "next/link";
import {
  LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings,
  Cable, AlertTriangle, GitBranch, ArrowLeft, ArrowRight, Puzzle, Lightbulb, ArrowRightLeft, Clock, BookOpen,
} from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import {
  NAV_SECTIONS, sectionBySlug, moduleAccent, tablesByTopic, transactions, funcs,
  cdsViews, fioriApps, masterData, processSteps, configRows, configHeaders, configTables, incidents, relatedObjects,
  relationships, enhancements, bestPractices, eccS4, sectionCount, readingMinutes, sectionLevel,
} from "@/lib/module-portal";

import { tcodeHasPage, idocHasPage, cdsHasPage, objectHasPage } from "@/lib/route-exists";
import { SectionReveal } from "@/components/section-reveal";
import { RelationshipMap } from "@/components/relationship-map";
import { SectionScrollSpy } from "@/components/section-scrollspy";

// Deterministic anchor id (kept server-side; the client spy reads these ids).
const spyId = (prefix: string, i: number) => `${prefix}-grp-${i}`;

const ICONS: Record<string, typeof LayoutGrid> = { LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings, Cable, AlertTriangle, GitBranch, Puzzle, Lightbulb, ArrowRightLeft };
const S4_DOT: Record<string, string> = { kept: "#1aa179", replaced: "#c77a0a", removed: "#dc2626" };

function CodeChip({ href, code, he, ok = true }: { href: string; code: string; he?: string; ok?: boolean }) {
  const body = (
    <>
      <span className="size-1.5 shrink-0 rounded-full bg-brand" />
      <div className="min-w-0 flex-1">
        <span className="tech block truncate font-mono text-[13px] font-bold text-ink-1" dir="ltr">{code}</span>
        {he && <span className="block truncate text-[11.5px] text-ink-3">{he}</span>}
      </div>
      <ArrowLeft className="size-3.5 shrink-0 text-ink-3/50 transition group-hover:text-brand" />
    </>
  );
  return ok
    ? <Link href={href} className="card-interactive group flex items-center gap-2.5 p-2.5" dir="rtl">{body}</Link>
    : <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-2/40 p-2.5" dir="rtl"><span className="size-1.5 shrink-0 rounded-full bg-ink-3/40" /><div className="min-w-0 flex-1"><span className="tech block truncate font-mono text-[13px] font-bold text-ink-3" dir="ltr">{code}</span>{he && <span className="block truncate text-[11.5px] text-ink-3">{he}</span>}</div></div>;
}

function SectionBody({ module, slug }: { module: SAPModuleData; slug: string }) {
  const accent = moduleAccent(module);
  switch (slug) {
    case "tables": {
      const groups = tablesByTopic(module);
      const spy = groups.map((g, i) => ({ id: spyId("tbl", i), label: g.topic, count: g.rows.length }));
      return (
        <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-6">
          <SectionScrollSpy items={spy} />
          <div className="space-y-6">
            {groups.map((g, i) => (
              <div key={g.topic} id={spyId("tbl", i)} className="scroll-mt-24">
                <h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Table className="size-4 text-ink-3" />{g.topic}<span className="font-mono text-[11px] font-bold text-ink-3">{g.rows.length}</span></h3>
                <div className="grid-adaptive-sm">
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
        </div>
      );
    }
    case "master-data": {
      const rows = masterData(module);
      // Each master-data object surfaces its deep hand-authored guide (/domain —
      // what/why/when/CBC-example/common-mistakes) when one exists, alongside the
      // technical table page. Previously only a bare /object chip.
      return (
        <div className="grid-adaptive-sm">
          {rows.map((r) => (
            <div key={r.code} className="card group flex flex-col gap-2 p-3" dir="rtl">
              <div className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                <span className="tech min-w-0 flex-1 truncate font-mono text-[13px] font-bold text-ink-1" dir="ltr">{r.code}</span>
                <span className="shrink-0 font-mono text-[10.5px] font-bold text-ink-3">{r.fields}<span className="text-ink-3/60"> שד'</span></span>
              </div>
              {r.he && <span className="truncate text-[11.5px] text-ink-3">{r.he}</span>}
              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
                {r.guide && <Link href={`/domain/${r.guide}/`} className="inline-flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1 text-[11px] font-bold text-brand transition hover:bg-brand/15"><BookOpen className="size-3" />מדריך מלא</Link>}
                <Link href={`/object/${encodeURIComponent(r.code)}/`} className="inline-flex items-center gap-1 rounded-lg bg-surface-2 px-2 py-1 text-[11px] font-bold text-ink-2 transition hover:bg-hairline"><Table className="size-3" />טבלה<ArrowLeft className="size-3 text-ink-3/50" /></Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
    case "transactions": {
      const tx = transactions(module);
      return <div className="grid-adaptive-sm">{tx.map((t) => <CodeChip key={t.code} href={`/tcode/${encodeURIComponent(t.code)}/`} code={t.code} ok={tcodeHasPage(t.code)} />)}</div>;
    }
    case "bapis": {
      // §1 — no duplicate module BAPI list. The central BAPI/FM hub is the single
      // authoritative location; link there with this module pre-filtered.
      const fn = funcs(module, ["BAPI", "FM"]);
      return (
        <Link href={`/bapi/?module=${encodeURIComponent(module.module)}`} className="card-interactive group flex items-center gap-3 p-4" dir="rtl">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: accent }}><Plug className="size-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-extrabold text-ink-1">כל ה-BAPI / FM של {module.module} — במרכז המאוחד</span>
            <span className="block text-[12px] text-ink-3">≈{fn.length} אובייקטים · סטטוס אימות · תאימות ECC↔S/4 · דף מלא לכל אובייקט</span>
          </span>
          <ArrowLeft className="size-4 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand" />
        </Link>
      );
    }
    case "cds": {
      const v = cdsViews(module);
      return v.length ? <div className="grid-adaptive-sm">{v.map((x) => <CodeChip key={x.view} href={`/cds/${encodeURIComponent(x.view)}/`} code={x.view} he={x.tables.slice(0, 3).join(" · ")} ok={cdsHasPage(x.view)} />)}</div> : <Empty text="אין CDS Views מאומתות למודול זה עדיין." />;
    }
    case "fiori": {
      const f = fioriApps(module);
      return f.length ? <div className="grid-adaptive-sm">{f.map((x) => (
        <Link key={x.app} href="/fiori-apps/" className="card-interactive flex items-center gap-3 p-3.5" dir="rtl"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2"><AppWindow className="size-[18px]" /></span><div className="min-w-0"><span className="block truncate text-[13.5px] font-bold text-ink-1">{x.app}</span><span className="tech block text-[11px] text-ink-3" dir="ltr">{x.table}</span></div></Link>
      ))}</div> : <Empty text="אין אפליקציות Fiori מקושרות עדיין." />;
    }
    case "business-process": {
      const steps = processSteps(module);
      return (
        <ol className="relative space-y-3 ps-8">
          {/* connector — accent gradient down the timeline */}
          <span className="absolute inset-y-3 start-[13px] w-0.5 rounded-full" aria-hidden style={{ background: `linear-gradient(${accent}, ${accent}22)` }} />
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            const badge = (
              <span className="absolute -start-8 top-3 z-10 grid size-7 place-items-center rounded-full text-[11px] font-black text-white shadow-sm" style={{ background: last ? "#1aa179" : accent }}>{i + 1}</span>
            );
            const inner = (
              <>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-ink-3">שלב {i + 1}{last ? " · סיום" : ""}</span>
                  <span className="flex items-center gap-1.5 text-[14px] font-extrabold text-ink-1">{!s.exists && s.guide && <BookOpen className="size-3.5 text-brand" />}{s.label}</span>
                </span>
                <span className="tech shrink-0 rounded-md px-2 py-0.5 font-mono text-[12px] font-bold" style={{ background: accent + "12", color: accent }} dir="ltr">{s.code}</span>
              </>
            );
            const href = s.exists ? `/object/${encodeURIComponent(s.code)}/` : s.guide ? `/domain/${s.guide}/` : null;
            return (
              <li key={`${s.code}-${i}`} className="relative">
                {badge}
                {href
                  ? <Link href={href} className="card-interactive group flex items-center justify-between gap-2 p-3.5" dir="rtl">{inner}<ArrowLeft className="size-4 shrink-0 text-ink-3/40 transition group-hover:-translate-x-0.5 group-hover:text-brand" /></Link>
                  : <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-hairline bg-surface-2/40 p-3.5" dir="rtl">{inner}</div>}
              </li>
            );
          })}
        </ol>
      );
    }
    case "configuration": {
      const headers = configHeaders(module); const rows = configRows(module);
      if (rows.length) return (
        <div className="overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full text-[12.5px]" dir="rtl">
            <thead className="bg-surface-2 text-ink-2"><tr>{headers.map((h) => <th key={h} className="whitespace-nowrap px-3 py-2 text-start font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-hairline hover:bg-surface-2/50">{r.map((c, j) => <td key={j} className="px-3 py-2 text-ink-2">{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      // No structured SPRO sheet for this module (e.g. PP-PI) — surface the
      // verified Customizing-topic tables instead of an empty state.
      const ct = configTables(module);
      if (ct.length) return (
        <div className="space-y-3">
          <p className="rounded-xl border border-hairline bg-surface-2/60 p-3 text-[12.5px] leading-relaxed text-ink-3">מדריך SPRO מובנה (נתיב IMG · טרנזקציה · השפעה) יתווסף בקרוב. בינתיים — טבלאות ה-Customizing המאומתות של המודול:</p>
          <div className="grid-adaptive-sm">{ct.map((t) => <CodeChip key={t.code} href={`/object/${encodeURIComponent(t.code)}/`} code={t.code} he={t.he} ok={objectHasPage(t.code)} />)}</div>
        </div>
      );
      return <Empty text="מדריך הקונפיגורציה יתווסף בקרוב." />;
    }
    case "integration": {
      const idocs = funcs(module, ["IDoc"]); const bapi = funcs(module, ["BAPI"]);
      return (
        <div className="space-y-6">
          <div><h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Cable className="size-4 text-ink-3" />IDocs<span className="font-mono text-[11px] font-bold text-ink-3">{idocs.length}</span></h3>
            {idocs.length ? <div className="grid-adaptive-sm">{idocs.map((f) => <CodeChip key={f.name} href={`/idoc/${encodeURIComponent(f.name)}/`} code={f.name} ok={idocHasPage(f.name)} />)}</div> : <Empty text="אין IDocs מאומתים." />}</div>
          <div><h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><Plug className="size-4 text-ink-3" />BAPIs / FMs<span className="font-mono text-[11px] font-bold text-ink-3">{bapi.length}</span></h3>
            <Link href={`/bapi/?module=${encodeURIComponent(module.module)}`} className="card-interactive group flex items-center gap-3 p-4" dir="rtl">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: accent }}><Plug className="size-[18px]" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[13.5px] font-extrabold text-ink-1">פתח במרכז ה-BAPI / FM המאוחד</span><span className="block text-[11.5px] text-ink-3">מסונן ל-{module.module} · דף מלא לכל אובייקט</span></span>
              <ArrowLeft className="size-4 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand" />
            </Link></div>
        </div>
      );
    }
    case "troubleshooting": {
      const inc = incidents(module);
      return inc.length ? <div className="grid-adaptive">{inc.map((i) => (
        <Link key={i.slug} href={`/troubleshooting/${encodeURIComponent(i.slug)}/`} className="card-interactive flex flex-col gap-1.5 p-4" dir="rtl">
          <div className="flex items-center justify-between gap-2"><span className="text-[13.5px] font-extrabold text-ink-1">{i.he}</span>{i.impact && <span className="shrink-0 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">{i.impact}</span>}</div>
          <p className="line-clamp-2 text-[12.5px] leading-relaxed text-ink-3">{i.symptom}</p>
        </Link>
      ))}</div> : <Empty text="אין תקלות מתועדות למודול זה עדיין." />;
    }
    case "related": {
      const rel = relatedObjects(module);
      return rel.length ? <div className="grid-adaptive-sm">{rel.map((r) => <CodeChip key={r.code} href={`/object/${encodeURIComponent(r.code)}/`} code={r.code} he={r.he} ok={objectHasPage(r.code)} />)}</div> : <Empty text="אין אובייקטים חוצי-מודול." />;
    }
    case "relationships": {
      const edges = relationships(module);
      if (!edges.length) return <Empty text="אין קשרים מתועדים." />;
      return <RelationshipMap edges={edges} accent={accent} />;
    }
    case "enhancements": {
      const ex = enhancements(module);
      return ex.length ? <div className="grid-adaptive">{ex.map((e) => (
        <div key={e.name} className="card flex flex-col gap-1.5 p-4" dir="rtl">
          <div className="flex items-center gap-2"><span className="tech font-mono text-[13.5px] font-extrabold text-ink-1" dir="ltr">{e.name}</span><span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-ink-3">{e.kind}</span></div>
          <p className="text-[13px] font-bold text-ink-1">{e.he}</p>
          {e.example && <p className="text-[12px] leading-relaxed text-ink-3">{e.example}</p>}
          {e.tcodes?.length ? <div className="flex flex-wrap gap-1">{e.tcodes.map((tc) => <span key={tc} className="tech rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-3" dir="ltr">{tc}</span>)}</div> : null}
        </div>
      ))}</div> : <Soon />;
    }
    case "best-practices": {
      const bp = bestPractices(module);
      return bp.length ? <div className="space-y-3">{bp.map((o) => (
        <div key={o.code} className="card p-4" dir="rtl">
          <div className="mb-2 flex items-center gap-2"><Link href={`/object/${encodeURIComponent(o.code)}/`} className="tech font-mono text-[13.5px] font-extrabold text-ink-1 hover:text-brand" dir="ltr">{o.code}</Link><span className="truncate text-[12px] text-ink-3">{o.he}</span></div>
          <ul className="space-y-1.5">{o.notes.map((n, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><Lightbulb className="mt-0.5 size-3.5 shrink-0 text-amber-500" />{n}</li>)}</ul>
        </div>
      ))}</div> : <Soon />;
    }
    case "ecc-s4": {
      const { kept, replaced, removed } = eccS4(module);
      const Grp = ({ title, rows, tint, showNote }: { title: string; rows: { code: string; he: string; alt?: string; note?: string }[]; tint: string; showNote?: boolean }) => rows.length ? (
        <div><h3 className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-ink-1"><span className="size-2.5 rounded-full" style={{ background: tint }} />{title}<span className="font-mono text-[11px] font-bold text-ink-3">{rows.length}</span></h3>
          <div className="grid-adaptive-sm">{rows.map((r) => (
            <Link key={r.code} href={`/object/${encodeURIComponent(r.code)}/`} className="card-interactive flex flex-col gap-0.5 p-2.5" dir="rtl">
              <div className="flex items-center gap-1.5"><span className="tech font-mono text-[13px] font-bold text-ink-1" dir="ltr">{r.code}</span>{r.alt && <span className="tech font-mono text-[11px] font-bold" style={{ color: tint }} dir="ltr">→ {r.alt}</span>}</div>
              <span className="truncate text-[11px] text-ink-3">{showNote && r.note ? r.note : r.he}</span>
            </Link>
          ))}</div></div>
      ) : null;
      return (
        <div className="space-y-6">
          <Grp title="הוחלף / טבלה חלופית" rows={replaced} tint="#c77a0a" showNote />
          <Grp title="הוסר / בוטל" rows={removed} tint="#dc2626" showNote />
          <Grp title="נשמר ללא שינוי מהותי" rows={kept} tint="#1aa179" />
        </div>
      );
    }
    default:
      return <Soon />;
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

// Clean "Coming Soon" — for sections whose verified data isn't authored yet.
// No placeholder/fake content; honest signal.
function Soon() {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-dashed border-hairline bg-surface-2/30 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-surface-2 text-ink-3"><Clock className="size-6" /></span>
      <p className="text-[14px] font-bold text-ink-2">בקרוב</p>
      <p className="max-w-xs text-[12.5px] leading-relaxed text-ink-3">התוכן המאומת לחלק זה בכתיבה. לא מוצג מידע שלא אומת.</p>
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
  const count = sectionCount(module, section);
  const mins = readingMinutes(module, section);
  const level = sectionLevel(section);

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

      {/* learn-bar — where am I / how long / how deep (all computed, not authored) */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-hairline bg-surface-2/50 px-3.5 py-2 text-[12px] text-ink-3">
        <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" />זמן קריאה <b className="text-ink-2">{mins} דק׳</b></span>
        <span className="inline-flex items-center gap-1.5"><Sigma className="size-3.5" /><b className="text-ink-2">{count}</b> פריטים</span>
        <span className="inline-flex items-center gap-1.5"><LayoutGrid className="size-3.5" />רמה <b className="text-ink-2">{level}</b></span>
        <span className="inline-flex items-center gap-1.5"><GitBranch className="size-3.5" />חלק <b className="text-ink-2">{idx + 1}</b> מתוך {NAV_SECTIONS.length}</span>
      </div>

      <SectionReveal><SectionBody module={module} slug={section} /></SectionReveal>

      {/* continue-learning — next section + prev */}
      <div className="border-t border-hairline pt-5">
        {next && (
          <Link href={`/${slug}/${next.slug}/`} className="card-interactive group mb-3 flex items-center gap-3 p-4" dir="rtl">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: accent + "12", color: accent }}>{(() => { const NI = ICONS[NAV_SECTIONS[idx + 1].icon] || GitBranch; return <NI className="size-5" />; })()}</span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow-2 text-ink-3">המשך למידה · הבא</span>
              <span className="block text-[14px] font-extrabold text-ink-1">{next.he}</span>
              <span className="block truncate text-[12px] text-ink-3">{next.desc}</span>
            </span>
            <ArrowLeft className="size-4 shrink-0 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand" />
          </Link>
        )}
        <div className="flex items-center justify-between gap-2">
          {prev ? <Link href={`/${slug}/${prev.slug}/`} className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-2 text-[13px] font-bold text-ink-2 hover:border-brand/40 hover:text-brand"><ArrowRight className="size-4" />{prev.he}</Link> : <span />}
          <Link href={`/${slug}/`} className="tap inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-bold text-ink-3 hover:text-brand">כל המדור<LayoutGrid className="size-3.5" /></Link>
        </div>
      </div>
    </div>
  );
}
