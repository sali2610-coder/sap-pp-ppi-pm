import Link from "next/link";
import {
  Lightbulb, Route, GitBranch, Boxes, Wrench, ClipboardCheck, Terminal, Plug,
  FunctionSquare, Cable, Sigma, AppWindow, Puzzle, ArrowLeft, Clock, AlertTriangle,
  KeyRound, Activity, CircleDot, ListChecks, FlaskConical, Target,
} from "lucide-react";
import { tableByName, kgraph } from "@/lib/knowledge-graph";
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

/* ── shared UI ── */
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
function AssetGroup({ icon, label, empty, children }: { icon: React.ReactNode; label: string; empty: string; children: React.ReactNode[] }) {
  const has = Array.isArray(children) && children.length > 0;
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-ink-3">{icon}{label}{has && <span className="font-mono text-[10px]">{children.length}</span>}</div>
      {has ? <div className="flex flex-wrap gap-1.5">{children}</div> : <span className="text-[12px] text-ink-3/70">{empty}</span>}
    </div>
  );
}

/* ── lifecycle by object kind — real SAP standard statuses (not fabricated) ── */
const IS = (set: string[], n: string) => set.includes(n);
const ORDER = ["AUFK", "AFKO", "AFIH", "AFPO", "AFVC", "AFVV", "AFRU"];
const NOTIF = ["QMEL", "QMFE", "QMUR", "QMSM"];
const MASTER = ["EQUI", "IFLOT", "ILOA", "EQUZ", "MARA", "MARC", "MAST", "PLKO", "PLPO", "MKAL", "MCH1", "CRHD", "STKO"];
function lifecycleFor(n: string): { label: string; steps: string[]; note: string } {
  if (IS(ORDER, n)) return { label: "פקודה · Order", steps: ["נוצרה · CRTD", "שוחררה · REL", "אושרה · CNF", "הושלמה טכנית · TECO", "נסגרה · CLSD", "אורכבה"], note: "מבוסס סטטוסי-מערכת סטנדרטיים של SAP (I-status)." };
  if (IS(NOTIF, n)) return { label: "הודעה · Notification", steps: ["נוצרה · OSNO", "בטיפול · NOPR", "הושלמה · NOCO", "נסגרה · DLFL"], note: "מבוסס סטטוסי הודעת SAP." };
  if (IS(MASTER, n)) return { label: "נתוני אב · Master Data", steps: ["נוצר", "שונה", "פעיל · בשימוש", "סומן למחיקה · DLFL", "אורכב"], note: "מחזור חיים טיפוסי לרשומת נתוני-אב." };
  return { label: "רשומה · Record", steps: ["נוצרה", "עודכנה", "פעילה", "לא-רלוונטית", "אורכבה"], note: "מחזור חיים טיפוסי של רשומת טבלה." };
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
  const tcodes = oi?.tcodes?.length ? oi.tcodes : splitTc(t.tcodes);
  const exits = EXITS.filter((e) => (e.object || "").includes(name) || (e.tcodes || []).some((tc) => tcodes.includes(tc)));
  const up = g?.upstream || [];
  const down = g?.downstream || [];
  const actors = ix ? { creates: ix.creates, reads: ix.reads, updates: ix.updates } : deriveActors(t.module);

  // dependencies from ER roles
  const rels = [...new Map((t.relations || []).map((r) => [r.table, r])).values()];
  const parents = rels.filter((r) => r.role === "child");   // this is child → r.table is required parent
  const children = rels.filter((r) => r.role === "parent");
  const referenced = [...new Set([...up, ...down])].filter((c) => !rels.some((r) => r.table === c));

  const pk = t.fields.filter((f) => f.key === "PK" || /pk/i.test(String(f.key)));
  const keyFields = [...new Map((pk.length ? pk : t.fields.slice(0, 6)).map((f) => [f.tech, f])).values()];
  const integ = [...new Set([...(cn?.integration || []), ...conn.interfaces.map((m) => m.label)])].slice(0, 8);

  const lc = lifecycleFor(name);

  // real examples (verified scenario text only)
  const examples = [...new Set(inc.map((i) => i.scenario).filter(Boolean) as string[])].slice(0, 3);

  // QA
  const mustExist = parents.length ? parents : rels.slice(0, 10);
  const regression = [...new Set(inc.flatMap((i) => i.prevention || []))].slice(0, 6);
  const outcome = k?.why || (inc[0]?.fix?.[0]) || "";
  const hasQA = mustExist.length || keyFields.length || integ.length || regression.length || iqs.length;

  const NAV: [string, string][] = [["x-usage", "שימוש עסקי"], ["x-behavior", "התנהגות"], ["x-lifecycle", "מחזור חיים"], ["x-deps", "תלויות"], ["x-assets", "נכסים טכניים"], ["x-examples", "דוגמאות"], ["x-trouble", "Playbooks"], ["x-qa", "QA"]];

  return (
    <div className="space-y-5">
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
          <Route className="size-4 shrink-0 text-ink-3" /><span className="text-[12.5px] font-bold text-ink-2">מיקום בתהליך:</span><span className="text-[12.5px] text-ink-3">{t.topicTitle}</span>
          <Link href={`/${t.module === "PM" ? "pm" : "pp-pi"}/business-process/`} className="ms-auto inline-flex items-center gap-1 text-[12px] font-bold text-brand">התהליך המלא<ArrowLeft className="size-3.5" /></Link>
        </div>
        {ix?.scenarios?.length ? <div className="mt-3"><Sub label="תרחישים טיפוסיים"><Bullets items={ix.scenarios} tone={accent} /></Sub></div> : null}
      </Card>

      {/* 2 · Functional Behavior — visual flow */}
      <Card id="x-behavior" title="התנהגות פונקציונלית" en="Functional Behavior" icon={<Activity className="size-4" style={{ color: accent }} />}>
        <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr]" dir="rtl">
          <FlowCol label="מה יוצר / מזין" tone="#1aa179" objs={up} roles={actors.creates} empty="נקודת התחלה" />
          <div className="flex items-center justify-center"><div className="grid place-items-center rounded-2xl border-2 px-4 py-3 text-center" style={{ borderColor: accent, background: accent + "0c" }}><span className="tech font-mono text-[15px] font-black text-ink-1" dir="ltr">{t.tableName}</span><span className="text-[10px] font-bold text-ink-3">{t.module}</span></div></div>
          <FlowCol label="מי צורך / משתמש" tone="#2563eb" objs={down} roles={actors.reads} empty="נקודת סיום" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl bg-surface-2/40 p-2.5 text-[12px]"><CircleDot className="size-3.5 text-amber-500" /><span className="font-bold text-ink-2">מעדכנים:</span>{actors.updates.map((a, i) => <span key={i} className="rounded-md bg-surface px-2 py-0.5 text-ink-3">{a}</span>)}</div>
        {!ix && <p className="mt-2 text-[11px] font-medium text-amber-600">תפקידים גנריים נגזרים מהמודול — לא מאומת-ספציפי.</p>}
      </Card>

      {/* 3 · Lifecycle — visual stepper */}
      <Card id="x-lifecycle" title="מחזור חיים" en="Lifecycle" icon={<CircleDot className="size-4" style={{ color: accent }} />}>
        <div className="mb-2 text-[12px] font-bold text-ink-3">{lc.label}</div>
        <ol className="flex flex-wrap items-center gap-1.5" dir="rtl">
          {lc.steps.map((s, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-2"><span className="grid size-4 place-items-center rounded-full font-mono text-[9px] font-black text-white" style={{ background: accent }}>{i + 1}</span>{s}</span>
              {i < lc.steps.length - 1 && <ArrowLeft className="size-3.5 text-ink-3/40" />}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[11px] text-ink-3">{lc.note}</p>
      </Card>

      {/* 4 · Dependencies — graph */}
      <Card id="x-deps" title="תלויות" en="Dependencies" icon={<GitBranch className="size-4" style={{ color: accent }} />}>
        <div className="grid gap-3 sm:grid-cols-3">
          <DepBox label="אב · נדרשים" en="Required / Parents" tone="#c77a0a" codes={parents.map((r) => r.table)} />
          <DepBox label="ילד" en="Children" tone="#2563eb" codes={children.map((r) => r.table)} />
          <DepBox label="מפנה אליהם" en="Referenced" tone="#6b727c" codes={referenced} />
        </div>
        <p className="mt-2 text-[11px] text-ink-3">קרדינליות ותיאור מלאים בלשונית ״קשרים״. כל צומת ניתן ללחיצה למעבר מהיר.</p>
      </Card>

      {/* 5 · Related Technical Assets */}
      <Card id="x-assets" title="נכסים טכניים מקושרים" en="Related Technical Assets" icon={<Boxes className="size-4" style={{ color: accent }} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AssetGroup icon={<GitBranch className="size-3.5" />} label="טבלאות קשורות" empty="—">{rels.map((r) => <ObjChip key={r.table} code={r.table} />)}</AssetGroup>
          <AssetGroup icon={<Terminal className="size-3.5" />} label="טרנזקציות" empty="—">{tcodes.map((c) => <AssetChip key={c} href={`/tcode/${encodeURIComponent(c)}/`} code={c} kind="TX" />)}</AssetGroup>
          <AssetGroup icon={<Plug className="size-3.5" />} label="BAPIs" empty="—">{bapis.map((f) => <AssetChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} kind="BAPI" />)}</AssetGroup>
          <AssetGroup icon={<FunctionSquare className="size-3.5" />} label="Function Modules" empty="—">{fms.map((f) => <AssetChip key={f.name} href={`/bapi/${encodeURIComponent(f.name)}/`} code={f.name} kind="FM" />)}</AssetGroup>
          <AssetGroup icon={<Cable className="size-3.5" />} label="IDocs" empty="—">{idocs.map((f) => <AssetChip key={f.name} href={`/idoc/${encodeURIComponent(f.name)}/`} code={f.name} kind="IDoc" />)}</AssetGroup>
          <AssetGroup icon={<Sigma className="size-3.5" />} label="CDS Views" empty="—">{cds.map((v) => <AssetChip key={v.view} href={`/cds/${encodeURIComponent(v.view)}/`} code={v.view} kind="CDS" />)}</AssetGroup>
          <AssetGroup icon={<Puzzle className="size-3.5" />} label="Enhancements / BAdIs" empty="—">{exits.map((e) => <span key={e.name} className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-1" dir="ltr">{e.name}<span className="font-sans text-[9px] font-bold text-ink-3">{e.kind}</span></span>)}</AssetGroup>
          <AssetGroup icon={<AppWindow className="size-3.5" />} label="Fiori Apps" empty="—">{t.fioriApp ? [<Link key="f" href="/fiori-apps/" className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-1 transition hover:border-brand/40 hover:text-brand">{t.fioriApp}</Link>] : []}</AssetGroup>
        </div>
      </Card>

      {/* 6 · Real SAP Examples */}
      <Card id="x-examples" title="דוגמאות SAP אמיתיות" en="Real Examples" icon={<FlaskConical className="size-4" style={{ color: accent }} />}>
        {examples.length ? <div className="space-y-2">{examples.map((ex, i) => (
          <div key={i} className="flex gap-2.5 rounded-xl border border-hairline bg-surface-2/40 p-3"><Target className="mt-0.5 size-4 shrink-0" style={{ color: accent }} /><p className="text-[13px] leading-relaxed text-ink-2">{ex}</p></div>
        ))}</div> : <Soon text="דוגמאות מאומתות (ערכים/תצורות אופייניות) ייכתבו לאובייקט זה." />}
      </Card>

      {/* 7 · Troubleshooting Playbooks */}
      <Card id="x-trouble" title="Playbooks לפתרון תקלות" en="Troubleshooting" icon={<Wrench className="size-4" style={{ color: accent }} />}>
        {inc.length ? <div className="space-y-3">{inc.slice(0, 8).map((i) => (
          <div key={i.slug} className="rounded-2xl border border-hairline p-4" dir="rtl">
            <div className="mb-2 flex items-start justify-between gap-2">
              <Link href={`/troubleshooting/${encodeURIComponent(i.slug)}/`} className="flex items-center gap-2 text-[14px] font-extrabold text-ink-1 hover:text-brand"><AlertTriangle className="size-4 text-rose-500" />{i.he}</Link>
              {i.impact && <span className="shrink-0 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600">{i.impact}</span>}
            </div>
            <p className="mb-3 text-[12.5px] leading-relaxed text-ink-3"><span className="font-bold text-ink-2">בעיה: </span>{i.symptom}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {i.rootCauses?.length ? <Sub label="גורמים אפשריים"><Bullets items={i.rootCauses.slice(0, 5)} tone="#c77a0a" /></Sub> : null}
              {i.debugEntry?.length ? <Sub label="שלבי אימות"><Bullets items={i.debugEntry.slice(0, 5)} tone="#2563eb" /></Sub> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-hairline pt-3">
              {i.analyzeTcodes?.length ? <PlayRow label="טרנזקציות">{i.analyzeTcodes.map((c) => <AssetChip key={c} href={`/tcode/${encodeURIComponent(c)}/`} code={c} kind="TX" />)}</PlayRow> : null}
              {i.tables?.filter((x) => x !== name).length ? <PlayRow label="טבלאות">{i.tables.filter((x) => x !== name).map((c) => <ObjChip key={c} code={c} />)}</PlayRow> : null}
              {i.funcs?.length ? <PlayRow label="BAPIs / FMs">{i.funcs.map((c) => <AssetChip key={c} href={`/bapi/${encodeURIComponent(c)}/`} code={c} kind="FN" />)}</PlayRow> : null}
            </div>
            {i.fix?.length ? <div className="mt-3 rounded-xl bg-emerald-50/60 p-2.5"><div className="eyebrow-2 mb-1 text-emerald-700">פתרון</div><Bullets items={i.fix.slice(0, 4)} tone="#1aa179" /></div> : null}
          </div>
        ))}</div> : <Soon text="Playbooks נכתבים על-בסיס תקלות מאומתות. ייתווספו לאובייקט זה." />}
      </Card>

      {/* 8 · Testing / QA */}
      <Card id="x-qa" title="בדיקות · QA" en="Testing / QA" icon={<ClipboardCheck className="size-4" style={{ color: accent }} />}>
        {hasQA ? (
          <div className="space-y-4">
            {outcome && <div className="flex gap-2.5 rounded-xl border border-hairline bg-surface-2/40 p-3"><Target className="mt-0.5 size-4 shrink-0" style={{ color: accent }} /><div><div className="eyebrow-2 mb-0.5">תוצאה עסקית צפויה</div><p className="text-[13px] leading-relaxed text-ink-2">{outcome}</p></div></div>}
            {mustExist.length ? <Sub label="יחסים שחייבים להתקיים"><ul className="space-y-1">{mustExist.map((r, i) => <li key={i} className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-2"><ObjChip code={r.table} />{r.card && <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink-3">{r.card}</span>}<span className="text-ink-3">{r.desc}</span></li>)}</ul></Sub> : null}
            {keyFields.length ? <Sub label="שדות קריטיים לאימות"><div className="flex flex-wrap gap-1.5">{keyFields.map((f) => <span key={f.tech} className="tech inline-flex items-center gap-1 rounded-lg border border-hairline bg-surface px-2 py-1 font-mono text-[11.5px] font-bold text-ink-1" dir="ltr">{f.key === "PK" ? <KeyRound className="size-3 text-amber-500" /> : null}{f.tech}</span>)}</div></Sub> : null}
            {integ.length ? <Sub label="נקודות אינטגרציה לבדיקה"><Bullets items={integ} tone="#2563eb" /></Sub> : null}
            {regression.length ? <Sub label="תרחישי רגרסיה"><Bullets items={regression} tone={accent} /></Sub> : null}
            {iqs.length ? <div className="border-t border-hairline pt-4"><Sub label="שאלות אימות ידע"><ul className="space-y-1.5">{iqs.slice(0, 5).map((q, i) => <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-2"><ListChecks className="mt-0.5 size-3.5 shrink-0 text-ink-3" />{q.q}</li>)}</ul></Sub></div> : null}
          </div>
        ) : <Soon text="תרחישי בדיקה מאומתים ייכתבו לאובייקט זה." />}
      </Card>
    </div>
  );
}

/* ── section-local visual helpers ── */
function FlowCol({ label, tone, objs, roles, empty }: { label: string; tone: string; objs: string[]; roles: string[]; empty: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-2/30 p-3">
      <div className="mb-1.5 text-[11px] font-bold" style={{ color: tone }}>{label}</div>
      {objs.length ? <div className="mb-2 flex flex-wrap gap-1.5">{objs.slice(0, 6).map((c) => <ObjChip key={c} code={c} />)}</div> : <p className="mb-2 text-[12px] text-ink-3/70">{empty}</p>}
      {roles?.length ? <div className="flex flex-wrap gap-1">{roles.map((r, i) => <span key={i} className="rounded-md bg-surface px-1.5 py-0.5 text-[10.5px] text-ink-3">{r}</span>)}</div> : null}
    </div>
  );
}
function DepBox({ label, en, tone, codes }: { label: string; en: string; tone: string; codes: string[] }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-3">
      <div className="mb-2 flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: tone }} /><span className="text-[12px] font-bold text-ink-1">{label}</span><span className="text-[10px] uppercase text-ink-3">{en}</span></div>
      {codes.length ? <div className="flex flex-wrap gap-1.5">{codes.map((c) => <ObjChip key={c} code={c} />)}</div> : <span className="text-[12px] text-ink-3/70">—</span>}
    </div>
  );
}
function PlayRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex min-w-0 flex-col gap-1"><span className="text-[10px] font-bold uppercase text-ink-3">{label}</span><div className="flex flex-wrap gap-1.5">{children}</div></div>;
}
