"use client";

import { forWhiteText } from "@/lib/contrast";
import { useState } from "react";
import Link from "next/link";
import {
  Boxes, Cable, Sparkles, Workflow, ArrowRightLeft, ClipboardCheck, ChevronDown,
  Database, Terminal, FileCode2, AlertTriangle, CheckCircle2, ShieldAlert, BadgeCheck, Info,
} from "lucide-react";
import { fnIntel, type FnParam } from "@/data/function-intel";
import { funcIntel, classifyFunc, listTcodes, listFuncs, cleanFunc } from "@/lib/object-intel";
import { tableByName } from "@/lib/knowledge-graph";
import { cdsByView } from "@/data/cds-map";

const TC_SET = new Set(listTcodes());
const FN_SET = new Set(listFuncs());
const tcHref = (c: string) => (TC_SET.has(c.toUpperCase()) ? `/tcode/${encodeURIComponent(c.toUpperCase())}/` : undefined);
const idocHref = (c: string) => (FN_SET.has(cleanFunc(c)) ? `/idoc/${encodeURIComponent(cleanFunc(c))}/` : undefined);
const cdsHref = (c: string) => (cdsByView(c) ? `/cds/${encodeURIComponent(c)}/` : undefined);
const tblHref = (c: string) => (tableByName(c) ? `/object/${encodeURIComponent(c)}/` : undefined);

const MISSING = "מידע חסר במאגר — נדרש אימות מול SAP / SE37 / BAPI Explorer";
const accentForMod = (m?: string) => (m === "PM" ? "#f97316" : m === "PP-PI" || m === "PP" ? "#6d28d9" : "#0891b2");

function Card({ icon, title, accent, children, tag }: { icon: React.ReactNode; title: string; accent?: string; tag?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card-premium p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide" style={{ color: accent || "#64748b" }}>{icon}{title}</h3>
        {tag}
      </div>
      {children}
    </section>
  );
}

const Missing = () => (
  <p className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs font-semibold text-amber-700"><ShieldAlert className="size-4 shrink-0" /> {MISSING}</p>
);
const Verified = () => <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700"><BadgeCheck className="size-3" /> אומת ידנית</span>;
const Unverified = () => <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700"><Info className="size-3" /> לא מאומת</span>;
const NeedsCheck = () => <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700"><Info className="size-3" /> נדרש אימות (תלוי גרסה)</span>;

const dirMeta: Record<FnParam["dir"], { he: string; cls: string }> = {
  import: { he: "Import", cls: "bg-blue-50 text-blue-700" },
  export: { he: "Export", cls: "bg-emerald-50 text-emerald-700" },
  table: { he: "Table", cls: "bg-violet-50 text-violet-700" },
  return: { he: "Return", cls: "bg-amber-50 text-amber-700" },
};

export function FunctionIntelligence({ name }: { name: string }) {
  const [tech, setTech] = useState(false);
  const intel = fnIntel(name);
  const ds = funcIntel(name); // dataset-verified: he + tables + module
  const kind = classifyFunc(name);
  const kindLabel = kind === "IDoc" ? "IDoc Message Type" : kind === "FM" ? "Function Module" : "BAPI";
  const accent = accentForMod(intel?.module || ds?.modules?.[0]);
  const dsHe = ds?.he || "";

  const params = intel ? [...intel.inputs, ...intel.outputs] : [];

  return (
    <div className="space-y-4">
      {/* 1 · Executive summary */}
      <Card icon={<Sparkles className="size-4" />} title="Function Intelligence" accent="#d62027" tag={intel && !intel.inferred ? <Verified /> : intel ? <NeedsCheck /> : <Unverified />}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="tech rounded-lg bg-brand px-2.5 py-1 text-sm font-extrabold text-brand-foreground" dir="ltr">{name}</span>
          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2">{kindLabel}</span>
          {(intel?.module || ds?.modules?.[0]) && <span className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: forWhiteText(accent)}}>{intel?.module || ds?.modules?.[0]}</span>}
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{intel?.what || dsHe || <Missing />}</p>
        {!intel && dsHe && <p className="mt-1.5 text-[11px] text-ink-3">תיאור מהמאגר (מאומת). פירוט מלא: {MISSING}</p>}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 2 · Purpose */}
        <Card icon={<Info className="size-4" />} title="מטרה עסקית · למה קיים" accent={accent}>
          {intel?.why ? <p className="text-sm leading-relaxed text-ink-2">{intel.why}</p> : <Missing />}
        </Card>
        {/* 3 · Where it belongs */}
        <Card icon={<Workflow className="size-4" />} title="היכן משתייך" accent={accent}>
          {intel ? (
            <div className="space-y-2 text-sm">
              <div className="flex gap-2"><span className="eyebrow w-20 text-ink-3">מודול</span><span className="font-bold text-ink-2">{intel.module}</span></div>
              <div className="flex gap-2"><span className="eyebrow w-20 text-ink-3">אזור תהליך</span><span className="font-bold text-ink-2">{intel.processArea}</span></div>
              {intel.flow && <div className="flex gap-2"><span className="eyebrow w-20 text-ink-3">זרימה</span><span className="text-ink-2" dir="ltr">{intel.flow}</span></div>}
            </div>
          ) : <Missing />}
        </Card>
      </div>

      {/* 4 · Parameters */}
      <Card icon={<Boxes className="size-4" />} title="פרמטרים · Inputs / Outputs" accent={accent}>
        {params.length ? (
          <div className="overflow-hidden rounded-xl border border-hairline">
            <table className="w-full text-right text-xs" dir="ltr">
              <thead className="bg-surface-2 text-[10px] uppercase text-ink-3"><tr><th className="px-3 py-2 text-left">Parameter</th><th className="px-3 py-2">Dir</th><th className="px-3 py-2 text-right">תיאור</th></tr></thead>
              <tbody>{params.map((p) => (
                <tr key={p.name} className="border-t border-hairline" title={p.he}>
                  <td className="px-3 py-1.5 font-mono font-bold text-ink-1">{p.name}{p.req && <span className="text-brand"> *</span>}</td>
                  <td className="px-3 py-1.5"><span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${dirMeta[p.dir].cls}`}>{dirMeta[p.dir].he}</span></td>
                  <td className="px-3 py-1.5 text-right text-ink-2" dir="rtl">{p.he}</td>
                </tr>))}</tbody>
            </table>
          </div>
        ) : <Missing />}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 5 · ECC vs S/4 */}
        <Card icon={<ArrowRightLeft className="size-4" />} title="ECC ↔ S/4HANA" accent="#d97706">
          {intel ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-hairline bg-surface-2/60 p-3"><div className="eyebrow mb-1 text-ink-3">ECC</div><p className="text-ink-2">{intel.ecc}</p></div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3"><div className="eyebrow mb-1 text-amber-700">S/4HANA</div><p className="text-amber-900">{intel.s4}</p></div>
            </div>
          ) : <Missing />}
        </Card>
        {/* 6 · QA / Testing */}
        <Card icon={<ClipboardCheck className="size-4" />} title="QA · בדיקות" accent="#059669">
          {intel ? (
            <div className="space-y-2.5 text-xs">
              <div><div className="eyebrow mb-1 text-emerald-700">מה לבדוק</div><ul className="space-y-1">{intel.qa.test.map((t, i) => <li key={i} className="flex gap-1.5 text-ink-2"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />{t}</li>)}</ul></div>
              <div><div className="eyebrow mb-1 text-rose-600">נקודות כשל נפוצות</div><ul className="space-y-1">{intel.qa.failures.map((t, i) => <li key={i} className="flex gap-1.5 text-ink-2"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-400" />{t}</li>)}</ul></div>
              <div><div className="eyebrow mb-1 text-ink-3">תלויות (הרשאות/אב/קונפיג)</div><div className="flex flex-wrap gap-1">{intel.qa.deps.map((d) => <span key={d} className="rounded bg-surface-2 px-1.5 py-0.5 text-[11px] font-semibold text-ink-2">{d}</span>)}</div></div>
              <div className="rounded-xl bg-surface-2 p-2.5"><div className="eyebrow mb-1 text-ink-3">תרחיש בדיקה</div><p className="text-ink-2">{intel.qa.scenario}</p></div>
            </div>
          ) : <Missing />}
        </Card>
      </div>

      {/* 7 · Related objects */}
      {intel?.related && (
        <Card icon={<Database className="size-4" />} title="אובייקטים קשורים" accent={accent}>
          <div className="space-y-2.5">
            {intel.related.tcodes?.length ? <Row icon={<Terminal className="size-3" />} label="T-Codes">{intel.related.tcodes.map((c) => <Chip key={c} text={c} href={tcHref(c)} />)}</Row> : null}
            {intel.related.tables?.length ? <Row icon={<Database className="size-3" />} label="טבלאות">{intel.related.tables.map((c) => <Chip key={c} text={c} href={tblHref(c)} tip={tableByName(c)?.descriptionHe} />)}</Row> : null}
            {intel.related.idocs?.length ? <Row icon={<Cable className="size-3" />} label="IDocs">{intel.related.idocs.map((c) => <Chip key={c} text={c} href={idocHref(c)} />)}</Row> : null}
            {intel.related.cds?.length ? <Row icon={<FileCode2 className="size-3" />} label="CDS Views">{intel.related.cds.map((c) => <Chip key={c} text={c} href={cdsHref(c)} />)}</Row> : null}
            {intel.related.processSlug ? <Row icon={<Workflow className="size-3" />} label="תהליך"><Chip text="עמוד תהליך ↗" href={`/process/${encodeURIComponent(intel.related.processSlug)}/`} /></Row> : null}
          </div>
        </Card>
      )}

      {/* expandable technical details */}
      <div className="card-premium overflow-hidden p-0">
        <button onClick={() => setTech((v) => !v)} className="flex w-full items-center justify-between p-4 text-start">
          <span className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink-3"><FileCode2 className="size-4" /> פרטים טכניים</span>
          <ChevronDown className={`size-4 text-ink-3 transition-transform ${tech ? "rotate-180" : ""}`} />
        </button>
        {tech && (
          <div className="space-y-2 border-t border-hairline p-4 text-xs text-ink-2">
            <div><span className="eyebrow text-ink-3">סוג: </span>{kindLabel}</div>
            <div><span className="eyebrow text-ink-3">מקור נתונים: </span>{intel ? "תוכן יועץ מאומת ידנית (curated)" : "מאגר בלבד — שאר השדות דורשים אימות מול SE37/BAPI Explorer"}</div>
            <div><span className="eyebrow text-ink-3">טבלאות שמפנות לפונקציה (מהמאגר): </span><span className="tech" dir="ltr">{ds?.tables.map((t) => t.name).join(", ") || "—"}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return <div><div className="eyebrow mb-1.5 flex items-center gap-1.5 text-ink-3">{icon}{label}</div><div className="flex flex-wrap gap-1.5">{children}</div></div>;
}
function Chip({ text, href, tip }: { text: string; href?: string; tip?: string }) {
  const cls = "tech tap rounded-lg px-2 py-0.5 text-xs font-bold";
  return href
    ? <Link href={href} title={tip} className={`${cls} border border-hairline bg-surface text-ink-2 transition hover:border-brand hover:text-brand`} dir="ltr">{text}</Link>
    : <span title={tip} className={`${cls} bg-surface-2 text-ink-3`} dir="ltr">{text}</span>;
}
