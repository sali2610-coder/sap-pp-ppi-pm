"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, Database, Terminal, Boxes, Cable, FileCode2, FileCode, Workflow, GraduationCap,
  AlertTriangle, ArrowLeft, Sparkles, ArrowRightLeft, AppWindow, ListTree, Layers,
} from "lucide-react";
import type { SAPModuleData, SAPTopic, SAPTable } from "@/lib/types";
import { FieldsTable } from "@/components/fields-table";
import { Highlight } from "@/components/highlight";
import { classifyFunc, cleanFunc, funcHref } from "@/lib/object-intel";
import { cdsForTable } from "@/data/cds-map";
import { domainBySlug } from "@/data/domains";
import { useI18n } from "@/lib/i18n";
import { playTick } from "@/lib/sound";

const RED = "#d62027";
const accentFor = (m: string) => (m === "PM" ? "#f97316" : "#6d28d9");

// curated topic → authored domain (enriches flow / notes / troubleshooting). Accurate, hand-mapped.
const TOPIC_DOMAIN: Record<string, string> = {
  "PM-1": "pm-functional-locations", "PM-2": "pm-equipment", "PM-4": "pm-measuring-points",
  "PM-6": "pm-notifications", "PM-7": "pm-maintenance-orders", "PM-9": "pm-spare-parts", "PM-11": "pm-preventive-maintenance",
  "PP-PI-3": "pppi-master-recipes", "PP-PI-4": "pppi-production-versions", "PP-PI-5": "pppi-capacity-planning", "PP-PI-6": "pppi-process-orders",
};

const cleanTitle = (s: string) => s.replace(/^\s*\d+\.\s*/, "").replace(/\s*\([^)]*$/, "").trim();
function topicIcon(title: string) {
  const s = title.toLowerCase();
  if (/הודע|notif/.test(s)) return AlertTriangle;
  if (/פקוד|order|work/.test(s)) return ListTree;
  if (/מונע|preventive|מדיד|מונ/.test(s)) return Workflow;
  if (/ציוד|מאסטר|master|חומר/.test(s)) return Database;
  if (/bom|עץ מוצר|עצי/.test(s)) return Layers;
  if (/מתכון|recipe|גרסא|version/.test(s)) return FileCode2;
  if (/משאב|resource|קיבול/.test(s)) return Boxes;
  return Database;
}

/* labeled chip rows */
function ChipRow({ icon, label, accent, children }: { icon: React.ReactNode; label: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-1.5 flex items-center gap-1.5" style={{ color: accent }}>{icon}{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/* one table → rich card with expand-to-fields */
function TableCardRich({ t, query, accent }: { t: SAPTable; query: string; accent: string }) {
  const { pick } = useI18n();
  const [open, setOpen] = useState(false);
  const pk = t.fields.filter((f) => f.key === "PK"), fk = t.fields.filter((f) => f.key === "FK");
  return (
    <motion.div layout className="lift overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_-16px_rgba(15,23,42,.4)]">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/object/${encodeURIComponent(t.tableName)}`} className="tech rounded-lg px-2 py-0.5 text-sm font-extrabold text-white" style={{ background: accent }} dir="ltr">
            <Highlight text={t.tableName} query={query} />
          </Link>
          {t.tcodes && <span className="tech truncate text-[11px] font-bold text-slate-400" dir="ltr">{t.tcodes.split(/[,\s]+/)[0]}</span>}
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600"><Highlight text={pick(t.descriptionHe, t.descriptionEn)} query={query} /></p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {pk.slice(0, 3).map((f) => <span key={f.tech} className="tech rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700" dir="ltr">PK {f.tech}</span>)}
          {fk.slice(0, 2).map((f) => <span key={f.tech} className="tech rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700" dir="ltr">FK {f.tech}</span>)}
        </div>
        <button onClick={() => setOpen((v) => !v)} className="tap mt-3 flex items-center gap-1 text-[11px] font-bold" style={{ color: accent }}>
          {t.fields.length} שדות <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-slate-100 p-3">
          <FieldsTable fields={t.fields} />
        </motion.div>}
      </AnimatePresence>
    </motion.div>
  );
}

function Block({ title, icon, accent, children }: { title: string; icon: React.ReactNode; accent?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide" style={{ color: accent || "#64748b" }}>{icon}{title}</h4>
      {children}
    </div>
  );
}

function BlueprintSection({ topic, code, query, open, onToggle }: { topic: SAPTopic; code: string; query: string; open: boolean; onToggle: () => void }) {
  const { pick } = useI18n();
  const accent = accentFor(code);
  const Icon = topicIcon(topic.title);
  const domain = domainBySlug(TOPIC_DOMAIN[`${code}-${topic.idx}`] || "");

  const agg = useMemo(() => {
    const tcodes = new Set<string>(), funcs = new Set<string>(), cds = new Set<string>(), progs = new Set<string>();
    const s4: { name: string; note: string; alt?: string }[] = [], fiori: { name: string; app: string }[] = [], simpl: { name: string; note: string }[] = [];
    let unchanged = 0;
    topic.tables.forEach((t) => {
      (t.tcodes || "").split(/[^A-Za-z0-9_/]+/).forEach((c) => { if (c.length >= 2 && /^[A-Z]/i.test(c)) tcodes.add(c.toUpperCase()); });
      (t.funcs || []).forEach((f) => funcs.add(cleanFunc(f[0])));
      cdsForTable(t.tableName).forEach((v) => cds.add(v.view));
      (t.progs || []).forEach((pr) => progs.add(pr[0]));
      if (t.s4Note) s4.push({ name: t.tableName, note: t.s4Note, alt: t.s4AltTable }); else unchanged++;
      if (t.fioriApp) fiori.push({ name: t.tableName, app: t.fioriApp });
      if (t.sumNote) simpl.push({ name: t.tableName, note: t.sumNote });
    });
    return { tcodes: [...tcodes], funcs: [...funcs], cds: [...cds], progs: [...progs], s4, fiori, simpl, unchanged };
  }, [topic.tables]);

  const summary = domain?.summary || `${cleanTitle(topic.title)} — ${topic.tables.length} טבלאות ליבה, ${agg.tcodes.length} טרנזקציות ו-${agg.funcs.length} ממשקים. ${agg.s4.length ? `${agg.s4.length} אובייקטים עם שינוי ב-S/4HANA.` : "ללא שינוי מהותי ב-S/4HANA."}`;

  return (
    <section id={`bp-${topic.idx}`} className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center gap-3 p-5 text-start transition hover:bg-slate-50/70">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{ background: accent, boxShadow: `0 8px 20px ${accent}55` }}><Icon className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">{cleanTitle(topic.title)}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{topic.tables.length} טבלאות</span>
            {agg.s4.length > 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">{agg.s4.length} שינויי S/4</span>}
          </span>
          <span className="mt-0.5 block text-xs text-slate-400">{agg.tcodes.length} T-Codes · {agg.funcs.length} BAPIs/FM · {agg.cds.length} CDS</span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden">
            <div className="space-y-5 border-t border-slate-100 bg-slate-50/40 p-5">

              {/* Executive summary */}
              <div className="rounded-2xl border p-4" style={{ borderColor: `${accent}33`, background: `linear-gradient(135deg, ${accent}0d, #fff)` }}>
                <h4 className="mb-1.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide" style={{ color: accent }}><Sparkles className="size-4" /> תקציר מנהלים</h4>
                <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
              </div>

              {/* Process flow (authored domain) */}
              {domain?.flow?.length ? (
                <Block title="זרימה עסקית" icon={<Workflow className="size-4" />} accent={accent}>
                  <div className="flex flex-wrap items-stretch gap-2">
                    {domain.flow.map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-stretch gap-2">
                        <div className="flex w-36 flex-col rounded-xl border bg-white p-2.5" style={{ borderColor: `${accent}55` }}>
                          <span className="font-mono text-base font-extrabold text-slate-200">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-xs font-bold text-slate-800">{s.he}</span>
                          <span className="text-[10px] text-slate-400" dir="ltr">{s.step}</span>
                        </div>
                        {i < domain.flow.length - 1 && <ArrowLeft className="size-4 shrink-0 self-center rotate-180 text-slate-300" />}
                      </motion.div>
                    ))}
                  </div>
                </Block>
              ) : null}

              {/* Core objects — tables as cards */}
              <Block title={`אובייקטי ליבה · טבלאות (${topic.tables.length})`} icon={<Database className="size-4" />} accent={accent}>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {topic.tables.map((t) => <TableCardRich key={t.id} t={t} query={query} accent={accent} />)}
                </div>
              </Block>

              {/* Core objects — chips */}
              {(agg.tcodes.length + agg.funcs.length + agg.cds.length + agg.progs.length) > 0 && (
                <Block title="אובייקטים מקושרים" icon={<Boxes className="size-4" />} accent={accent}>
                  <div className="space-y-3">
                    {agg.tcodes.length > 0 && <ChipRow icon={<Terminal className="size-3" />} label="T-Codes" accent={accent}>
                      {agg.tcodes.slice(0, 24).map((c) => <Link key={c} href={`/tcode/${encodeURIComponent(c)}`} className="tech rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs font-bold text-slate-600 transition hover:border-brand hover:text-brand" dir="ltr">{c}</Link>)}
                    </ChipRow>}
                    {agg.funcs.length > 0 && <ChipRow icon={<Cable className="size-3" />} label="BAPIs / FM / IDocs" accent={accent}>
                      {agg.funcs.slice(0, 18).map((n) => { const k = classifyFunc(n); return <Link key={n} href={funcHref(n)} className={`tech rounded-lg px-2 py-0.5 text-xs font-bold transition hover:brightness-95 ${k === "IDoc" ? "bg-violet-50 text-violet-700" : k === "FM" ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-700"}`} dir="ltr">{n}</Link>; })}
                    </ChipRow>}
                    {agg.cds.length > 0 && <ChipRow icon={<FileCode2 className="size-3" />} label="CDS Views" accent={accent}>
                      {agg.cds.map((v) => <Link key={v} href={`/cds/${encodeURIComponent(v)}`} className="tech rounded-lg bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700" dir="ltr">{v}</Link>)}
                    </ChipRow>}
                    {agg.progs.length > 0 && <ChipRow icon={<FileCode className="size-3" />} label="Programs" accent={accent}>
                      {agg.progs.slice(0, 12).map((pr) => <span key={pr} className="tech rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600" dir="ltr">{pr}</span>)}
                    </ChipRow>}
                  </div>
                </Block>
              )}

              {/* ECC vs S/4HANA */}
              <Block title="ECC → S/4HANA" icon={<ArrowRightLeft className="size-4" />} accent="#d97706">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                    <div className="eyebrow mb-1 text-emerald-700">נשאר ללא שינוי</div>
                    <p className="text-sm font-bold text-emerald-800">{agg.unchanged} טבלאות</p>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                    <div className="eyebrow mb-1 text-amber-700">השתנה / הוחלף · {agg.s4.length}</div>
                    {agg.s4.length ? <ul className="space-y-1 text-xs text-amber-900">{agg.s4.slice(0, 6).map((s) => <li key={s.name}><span className="tech font-bold" dir="ltr">{s.name}</span>{s.alt ? <> → <span className="tech font-bold" dir="ltr">{s.alt}</span></> : ""} · {s.note.slice(0, 70)}</li>)}</ul> : <p className="text-xs italic text-slate-400">—</p>}
                  </div>
                  {agg.fiori.length > 0 && <div className="rounded-xl border border-fuchsia-100 bg-fuchsia-50/40 p-3">
                    <div className="eyebrow mb-1 flex items-center gap-1 text-fuchsia-700"><AppWindow className="size-3" /> Fiori Apps</div>
                    <div className="flex flex-wrap gap-1">{agg.fiori.slice(0, 8).map((f) => <span key={f.name} className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-fuchsia-700 ring-1 ring-fuchsia-200">{f.app}</span>)}</div>
                  </div>}
                  {agg.cds.length > 0 && <div className="rounded-xl border border-teal-100 bg-teal-50/40 p-3">
                    <div className="eyebrow mb-1 flex items-center gap-1 text-teal-700"><FileCode2 className="size-3" /> CDS Replacements</div>
                    <div className="flex flex-wrap gap-1">{agg.cds.map((v) => <span key={v} className="tech rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-teal-700 ring-1 ring-teal-200" dir="ltr">{v}</span>)}</div>
                  </div>}
                  {agg.simpl.length > 0 && <div className="rounded-xl border border-slate-200 bg-white p-3 md:col-span-2">
                    <div className="eyebrow mb-1 text-slate-500">Simplification / SUM</div>
                    <ul className="space-y-1 text-xs text-slate-600">{agg.simpl.slice(0, 4).map((s) => <li key={s.name}><span className="tech font-bold text-slate-700" dir="ltr">{s.name}</span> · {s.note.slice(0, 90)}</li>)}</ul>
                  </div>}
                </div>
              </Block>

              {/* Consultant notes (authored) */}
              {domain?.learning?.length ? (
                <Block title="הערות יועץ · נקודות מפתח" icon={<GraduationCap className="size-4" />} accent={accent}>
                  <ul className="grid gap-2 sm:grid-cols-2">{domain.learning.map((l, i) => <li key={i} className="flex gap-2 rounded-xl bg-slate-50 p-2.5 text-sm text-slate-700"><span className="mt-0.5 size-1.5 shrink-0 rounded-full" style={{ background: accent }} />{l}</li>)}</ul>
                </Block>
              ) : null}

              {/* Troubleshooting (authored) */}
              {domain?.trouble?.length ? (
                <Block title="פתרון תקלות" icon={<AlertTriangle className="size-4 text-amber-500" />}>
                  <ul className="space-y-2">{domain.trouble.map((t, i) => <li key={i} className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm"><span className="font-bold text-slate-800">⚠ {t.issue}</span><span className="mt-1 block text-slate-600">↳ {t.fix}</span></li>)}</ul>
                </Block>
              ) : null}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function TechnicalBlueprint({ module, query }: { module: SAPModuleData; query: string }) {
  const { t: tr } = useI18n();
  const q = query.trim().toLowerCase();
  const code = module.module;

  const topics = useMemo(() => {
    if (!q) return module.topics;
    return module.topics.map((t) => ({ ...t, tables: t.tables.filter((tb) => tb.tableName.toLowerCase().includes(q) || tb.descriptionHe.toLowerCase().includes(q) || tb.descriptionEn.toLowerCase().includes(q) || tb.tcodes.toLowerCase().includes(q) || tb.fields.some((f) => f.tech.toLowerCase().includes(q))) })).filter((t) => t.tables.length > 0);
  }, [module.topics, q]);

  const [open, setOpen] = useState<Set<number>>(() => new Set(topics[0] ? [topics[0].idx] : []));
  const toggle = (idx: number) => { playTick(); setOpen((s) => { const n = new Set(s); n.has(idx) ? n.delete(idx) : n.add(idx); return n; }); };
  const expandAll = () => setOpen(new Set(topics.map((t) => t.idx)));
  const collapseAll = () => setOpen(new Set());
  const accent = accentFor(code);

  if (q && topics.length === 0) return <p className="py-8 text-center text-sm text-muted-foreground">{tr("search.empty")} — &quot;{query}&quot;</p>;

  return (
    <div className="space-y-4">
      {/* sticky knowledge-center nav */}
      <div className="sticky top-[4.5rem] z-20 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl text-white" style={{ background: accent }}><ListTree className="size-5" /></span>
            <div><span className="eyebrow text-slate-400">Blueprint Knowledge Center</span><h2 className="text-lg font-extrabold tracking-tight text-slate-900">תכנון טכני · {code}</h2></div>
          </div>
          <div className="flex gap-1.5">
            <button onClick={expandAll} className="tap rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand hover:text-brand">פתח הכל</button>
            <button onClick={collapseAll} className="tap rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand hover:text-brand">סגור הכל</button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 overflow-x-auto">
          {topics.map((t) => (
            <a key={t.idx} href={`#bp-${t.idx}`} onClick={() => setOpen((s) => new Set(s).add(t.idx))} className="tap shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand hover:text-brand">{cleanTitle(t.title)}</a>
          ))}
        </div>
      </div>

      {topics.map((t) => <BlueprintSection key={t.idx} topic={t} code={code} query={query} open={open.has(t.idx)} onToggle={() => toggle(t.idx)} />)}
    </div>
  );
}
