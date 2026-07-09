import Link from "next/link";
import {
  Lightbulb, Route, GitBranch, Boxes, Wrench, ClipboardCheck, Terminal, Plug,
  FunctionSquare, Cable, Sigma, AppWindow, Puzzle, ArrowLeft, ArrowRight, Clock, AlertTriangle, KeyRound,
} from "lucide-react";
import { tableByName } from "@/lib/knowledge-graph";
import { kgraph } from "@/lib/knowledge-graph";
import { objectIntel } from "@/lib/data";
import { knowledgeFor } from "@/lib/knowledge";
import { objectIntelExt, deriveActors } from "@/lib/object-intel-ext";
import { objectConnections } from "@/lib/object-graph";
import { CONSULTANT_NOTES } from "@/data/consultant-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { cdsForTable } from "@/data/cds-map";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { interviewFor } from "@/data/knowledge/interview";
import { EXITS } from "@/data/exits";

const splitTc = (s: string) => [...new Set((s || "").split(/[,\s/]+/).map((x) => x.trim().toUpperCase()).filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x)))];

function Card({ id, title, en, icon, children }: { id: string; title: string; en: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="card scroll-mt-28 p-5 sm:p-6">
      <div className="mb-4 flex items-baseline gap-2">
        <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-ink-1">{icon}{title}</h2>
        <span className="text-[11px] font-medium uppercase tracking-wide text-ink-3">{en}</span>
      </div>
      {children}
    </section>
  );
}
function Soon({ text = "התוכן המאומת לחלק זה בכתיבה." }: { text?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-hairline bg-surface-2/30 px-4 py-5 text-ink-3">
      <Clock className="size-5 shrink-0" /><div><p className="text-[13px] font-bold text-ink-2">בקרוב</p><p className="text-[12px]">{text}</p></div>
    </div>
  );
}
function Sub({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="eyebrow-2 mb-1.5">{label}</div>{children}</div>;
}
function Bullets({ items, tone = "#6b727c" }: { items: string[]; tone?: string }) {
  return <ul className="space-y-1.5">{items.map((x, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: tone }} />{x}</li>)}</ul>;
}
function ObjChip({ code }: { code: string }) {
  const ex = !!tableByName(code);
  return ex
    ? <Link href={`/object/${encodeURIComponent(code)}/`} className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-1 transition hover:border-brand/40 hover:text-brand" dir="ltr"><span className="size-1.5 rounded-full bg-brand" />{code}</Link>
    : <span className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[12px] font-bold text-ink-3" dir="ltr">{code}</span>;
}
function AssetChip({ href, code, kind }: { href: string; code: string; kind: string }) {
  return <Link href={href} className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-1 transition hover:border-brand/40 hover:text-brand" dir="ltr">{code}<span className="font-sans text-[9px] font-bold text-ink-3">{kind}</span></Link>;
}

export function ObjectExpert({ name, accent }: { name: string; accent: string }) {
  const t = tableByName(name);
  if (!t) return null;
  const k = knowledgeFor(name);
  const ix = objectIntelExt(name);
  const oi = objectIntel(name);
  const g = kgraph(name);
  const conn = objectConnections(name);
  const cn = CONSULTANT_NOTES[name];
  const inc = INCIDENTS.filter((i) => i.tables.includes(name));
  const iqs = interviewFor(name);
  const cds = cdsForTable(name);

  const fnAll = (t.funcs || []).map(([raw]) => { const nm = cleanFunc(raw); return nm ? { name: nm, kind: classifyFunc(nm) } : null; }).filter(Boolean) as { name: string; kind: string }[];
  const bapis = fnAll.filter((f) => f.kind === "BAPI");
  const fms = fnAll.filter((f) => f.kind === "FM");
  const idocs = fnAll.filter((f) => f.kind === "IDoc");
  const tcodes = (oi?.tcodes?.length ? oi.tcodes : splitTc(t.tcodes));
  const exits = EXITS.filter((e) => (e.object || "").includes(name) || (e.tcodes || []).some((tc) => tcodes.includes(tc)));
  const up = g?.upstream || [];
  const down = g?.downstream || [];
  const actors = ix ? { creates: ix.creates, reads: ix.reads, updates: ix.updates } : deriveActors(t.module);
  const relTablesUniq = [...new Map((t.relations || []).map((r) => [r.table, r])).values()];
  const pk = t.fields.filter((f) => f.key === "PK" || /pk/i.test(String(f.key)));
  const keyFieldsRaw = pk.length ? pk : t.fields.slice(0, 6);
  const keyFields = [...new Map(keyFieldsRaw.map((f) => [f.tech, f])).values()];
  const integ = [...new Set([...(cn?.integration || []), ...conn.interfaces.map((m) => m.label)])].slice(0, 8);

  // Troubleshooting aggregation (verified only)
  const issues = [...new Set(inc.map((i) => i.symptom).filter(Boolean))].slice(0, 6);
  const roots = [...new Set([...(cn?.mistakes || []), ...inc.flatMap((i) => i.rootCauses || [])])].slice(0, 8);
  const checkFirst = [...new Set([...(cn?.debug || []), ...inc.flatMap((i) => i.debugEntry || [])])].slice(0, 6);
  const relTcodes = [...new Set([...tcodes, ...inc.flatMap((i) => i.analyzeTcodes || [])])].slice(0, 10);
  const relTables = [...new Set(inc.flatMap((i) => i.tables || []).filter((x) => x !== name))].slice(0, 10);
  const hasTrouble = issues.length || roots.length || checkFirst.length || inc.length;

  // QA / testing derivation
  const mustExist = (t.relations || []).map((r) => ({ table: r.table, card: r.card, desc: r.desc })).slice(0, 10);
  const regression = [...new Set(inc.flatMap((i) => i.prevention || []))].slice(0, 6);
  const hasQA = mustExist.length || keyFields.length || integ.length || regression.length || iqs.length;

  const NAV: [string, string][] = [["x-usage", "שימוש עסקי"], ["x-nav", "ניווט"], ["x-assets", "נכסים טכניים"], ["x-trouble", "פתרון תקלות"], ["x-qa", "בדיקות · QA"]];

  return (
    <div className="space-y-5">
      {/* on this page */}
      <div className="no-print sticky top-[6.5rem] z-20 flex flex-wrap items-center gap-1 rounded-xl border border-hairline bg-surface/90 p-1.5 backdrop-blur">
        <span className="eyebrow-2 px-1.5">בעמוד</span>
        {NAV.map(([id, lbl]) => <a key={id} href={`#${id}`} className="rounded-lg px-2.5 py-1 text-[11.5px] font-semibold text-ink-3 transition hover:bg-brand/10 hover:text-brand">{lbl}</a>)}
        <span className="ms-auto self-center px-2 text-[10px] font-medium text-ink-3">{ix || cn ? "תוכן יועצי מאומת" : "ידע נגזר מהמאגר"}</span>
      </div>

      {/* 1 · Common Business Usage */}
      <Card id="x-usage" title="שימוש עסקי" en="Common Business Usage" icon={<Lightbulb className="size-4" style={{ color: accent }} />}>
        {k ? <><p className="text-[14.5px] font-bold text-ink-1">{k.role}</p><p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{k.why}</p>{k.whenUsed && <p className="mt-2 text-[13px] text-ink-3"><span className="font-bold text-ink-2">מתי משתמשים: </span>{k.whenUsed}</p>}</>
          : <p className="text-[13.5px] leading-relaxed text-ink-2">{t.descriptionHe || t.descriptionEn}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-surface-2/40 p-3">
          <Route className="size-4 shrink-0 text-ink-3" />
          <span className="text-[12.5px] font-bold text-ink-2">מיקום בתהליך:</span>
          <span className="text-[12.5px] text-ink-3">{t.topicTitle}</span>
          <Link href={`/${t.module === "PM" ? "pm" : "pp-pi"}/business-process/`} className="ms-auto inline-flex items-center gap-1 text-[12px] font-bold text-brand">התהליך המלא<ArrowLeft className="size-3.5" /></Link>
        </div>
        {ix?.scenarios?.length ? <div className="mt-3"><Sub label="תרחישים טיפוסיים"><Bullets items={ix.scenarios} tone={accent} /></Sub></div> : null}
      </Card>

      {/* 2 · Navigation between objects */}
      <Card id="x-nav" title="ניווט בין אובייקטים" en="Navigation" icon={<GitBranch className="size-4" style={{ color: accent }} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Sub label="לפני · Upstream (מה יוצר / מזין אותו)">{up.length ? <div className="flex flex-wrap gap-1.5">{up.map((n) => <ObjChip key={n} code={n} />)}</div> : <p className="text-[12.5px] text-ink-3">— נקודת התחלה בתהליך</p>}</Sub>
          <Sub label="אחרי · Downstream (מי צורך אותו)">{down.length ? <div className="flex flex-wrap gap-1.5">{down.map((n) => <ObjChip key={n} code={n} />)}</div> : <p className="text-[12.5px] text-ink-3">— נקודת סיום בתהליך</p>}</Sub>
        </div>
        <div className="mt-4 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-3">
          {([["מי יוצר", actors.creates, "#1aa179"], ["מי קורא", actors.reads, "#2563eb"], ["מי מעדכן", actors.updates, "#c77a0a"]] as [string, string[], string][]).map(([lbl, arr, col]) => (
            <div key={lbl}><div className="mb-1 text-[11px] font-bold" style={{ color: col }}>{lbl}</div><ul className="space-y-0.5">{arr.map((a, i) => <li key={i} className="text-[12px] text-ink-3">• {a}</li>)}</ul></div>
          ))}
        </div>
        {!ix && <p className="mt-2 text-[11px] font-medium text-amber-600">תפקידים גנריים נגזרים מהמודול — לא מאומת-ספציפי.</p>}
      </Card>

      {/* 3 · Related Technical Assets */}
      <Card id="x-assets" title="נכסים טכניים מקושרים" en="Related Technical Assets" icon={<Boxes className="size-4" style={{ color: accent }} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AssetGroup icon={<GitBranch className="size-3.5" />} label="טבלאות קשורות" empty="—">{relTablesUniq.map((r) => <ObjChip key={r.table} code={r.table} />)}</AssetGroup>
          <AssetGroup icon={<Terminal className="size-3.5" />} label="טרנזקציות" empty="—">{tcodes.map((c) => <AssetChip key={c} href={`/tcode/${encodeURIComponent(c)}/`} code={c} kind="TX" />)}</AssetGroup>
          <AssetGroup icon={<Plug className="size-3.5" />} label="BAPIs" empty="—">{bapis.map((f) => <AssetChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} kind="BAPI" />)}</AssetGroup>
          <AssetGroup icon={<FunctionSquare className="size-3.5" />} label="Function Modules" empty="—">{fms.map((f) => <AssetChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} kind="FM" />)}</AssetGroup>
          <AssetGroup icon={<Cable className="size-3.5" />} label="IDocs" empty="—">{idocs.map((f) => <AssetChip key={f.name} href={`/idoc/${encodeURIComponent(f.name)}/`} code={f.name} kind="IDoc" />)}</AssetGroup>
          <AssetGroup icon={<Sigma className="size-3.5" />} label="CDS Views" empty="—">{cds.map((v) => <AssetChip key={v.view} href={`/cds/${encodeURIComponent(v.view)}/`} code={v.view} kind="CDS" />)}</AssetGroup>
          <AssetGroup icon={<Puzzle className="size-3.5" />} label="Enhancements / BAdIs" empty="—">{exits.map((e) => <span key={e.name} className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-1" dir="ltr">{e.name}<span className="font-sans text-[9px] font-bold text-ink-3">{e.kind}</span></span>)}</AssetGroup>
          <AssetGroup icon={<AppWindow className="size-3.5" />} label="Fiori Apps" empty="—">{t.fioriApp ? [<Link key="f" href="/fiori-apps/" className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-1 transition hover:border-brand/40 hover:text-brand">{t.fioriApp}</Link>] : []}</AssetGroup>
        </div>
      </Card>

      {/* 4 · Troubleshooting */}
      <Card id="x-trouble" title="פתרון תקלות" en="Troubleshooting" icon={<Wrench className="size-4" style={{ color: accent }} />}>
        {hasTrouble ? (
          <div className="space-y-4">
            {issues.length ? <Sub label="תקלות טיפוסיות"><Bullets items={issues} tone="#dc2626" /></Sub> : null}
            {roots.length ? <Sub label="גורמי שורש נפוצים"><Bullets items={roots} tone="#c77a0a" /></Sub> : null}
            {checkFirst.length ? <Sub label="מה לבדוק קודם"><Bullets items={checkFirst} tone="#2563eb" /></Sub> : null}
            <div className="grid gap-4 border-t border-hairline pt-4 sm:grid-cols-2">
              {relTcodes.length ? <Sub label="טרנזקציות רלוונטיות"><div className="flex flex-wrap gap-1.5">{relTcodes.map((c) => <AssetChip key={c} href={`/tcode/${encodeURIComponent(c)}/`} code={c} kind="TX" />)}</div></Sub> : null}
              {relTables.length ? <Sub label="טבלאות רלוונטיות"><div className="flex flex-wrap gap-1.5">{relTables.map((c) => <ObjChip key={c} code={c} />)}</div></Sub> : null}
            </div>
            {inc.length ? <div className="border-t border-hairline pt-4"><Sub label="תקלות מתועדות"><div className="grid gap-2 sm:grid-cols-2">{inc.slice(0, 6).map((i) => (
              <Link key={i.slug} href={`/troubleshooting/${encodeURIComponent(i.slug)}/`} className="card-interactive flex items-start gap-2 p-2.5" dir="rtl"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" /><span className="line-clamp-2 text-[12.5px] font-medium text-ink-2">{i.he}</span></Link>
            ))}</div></Sub></div> : null}
          </div>
        ) : <Soon text="תקלות מתועדות לאובייקט זה ייכתבו על-בסיס מקרים מאומתים." />}
      </Card>

      {/* 5 · Testing / QA */}
      <Card id="x-qa" title="בדיקות · QA" en="Testing / QA" icon={<ClipboardCheck className="size-4" style={{ color: accent }} />}>
        {hasQA ? (
          <div className="space-y-4">
            {mustExist.length ? <Sub label="יחסים שחייבים להתקיים"><ul className="space-y-1">{mustExist.map((r, i) => <li key={i} className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-2"><ObjChip code={r.table} />{r.card && <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink-3">{r.card}</span>}<span className="text-ink-3">{r.desc}</span></li>)}</ul></Sub> : null}
            {keyFields.length ? <Sub label="שדות חשובים לאימות"><div className="flex flex-wrap gap-1.5">{keyFields.map((f) => <span key={f.tech} className="tech inline-flex items-center gap-1 rounded-lg border border-hairline bg-surface px-2 py-1 font-mono text-[11.5px] font-bold text-ink-1" dir="ltr">{f.key === "PK" ? <KeyRound className="size-3 text-amber-500" /> : null}{f.tech}</span>)}</div></Sub> : null}
            {integ.length ? <Sub label="נקודות אינטגרציה לבדיקה"><Bullets items={integ} tone="#2563eb" /></Sub> : null}
            {regression.length ? <Sub label="תרחישי רגרסיה"><Bullets items={regression} tone={accent} /></Sub> : null}
            {iqs.length ? <div className="border-t border-hairline pt-4"><Sub label="שאלות אימות ידע"><ul className="space-y-1.5">{iqs.slice(0, 5).map((q, i) => <li key={i} className="text-[12.5px] leading-relaxed text-ink-2">• {q.q}</li>)}</ul></Sub></div> : null}
          </div>
        ) : <Soon text="תרחישי בדיקה מאומתים ייכתבו לאובייקט זה." />}
      </Card>
    </div>
  );
}

function AssetGroup({ icon, label, empty, children }: { icon: React.ReactNode; label: string; empty: string; children: React.ReactNode[] }) {
  const has = Array.isArray(children) && children.length > 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-ink-3">{icon}{label}{has && <span className="font-mono text-[10px]">{children.length}</span>}</div>
      {has ? <div className="flex flex-wrap gap-1.5">{children}</div> : <span className="text-[12px] text-ink-3/70">{empty}</span>}
    </div>
  );
}
