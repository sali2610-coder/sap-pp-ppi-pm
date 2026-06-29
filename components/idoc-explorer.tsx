"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Cable, ArrowLeft, ArrowRight, Layers, Activity, FileSearch, ListTree, AlertTriangle, Wrench, BookOpen } from "lucide-react";
import { SapTip } from "@/components/sap-tip";
import { EmptyState } from "@/components/ui/empty-state";
import { IDOC, IDOC_RECORDS, IDOC_STATUSES, idocMessageTypes } from "@/lib/idoc-intel";

const ACCENT = "#0e7490"; // IDoc cyan (matches integration record color)
const DIR_C = { in: "#16a34a", out: "#2563eb" } as const;
const DIR_HE = { in: "נכנס (Inbound)", out: "יוצא (Outbound)" } as const;

// Diagnostic tcode chip — hover = mini-mentor, click = full page. Inspector-wired
// via SapTip's "send to Inspector".
function Tx({ code }: { code: string }) {
  return (
    <SapTip name={code} bare>
      <Link href={`/tcode/${encodeURIComponent(code)}/`} className="tech inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{code}</Link>
    </SapTip>
  );
}

export function IDocExplorer() {
  const msgTypes = useMemo(() => idocMessageTypes(), []);
  const [dir, setDir] = useState<"all" | "in" | "out">("all");
  const statuses = useMemo(() => IDOC_STATUSES.filter((s) => dir === "all" || s.dir === dir), [dir]);

  const STATS = [
    { icon: <ListTree className="size-4" />, v: msgTypes.length, l: "סוגי הודעה במאגר", c: ACCENT },
    { icon: <FileSearch className="size-4" />, v: IDOC.transactions.length, l: "כלי ניטור (T-Codes)", c: "#2563eb" },
    { icon: <Activity className="size-4" />, v: IDOC_STATUSES.length, l: "קודי סטטוס מרכזיים", c: "#d62027" },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* stat band */}
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((k) => (
          <div key={k.l} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--elev-1)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: k.c }}>{k.icon}</span>
            <div><div className="text-2xl font-extrabold tabular-nums text-slate-900">{k.v}</div><div className="text-[11px] font-semibold text-slate-400">{k.l}</div></div>
          </div>
        ))}
      </div>

      {/* anatomy — the three physical IDoc records */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)] sm:p-6">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-extrabold text-slate-900"><Layers className="size-5" style={{ color: ACCENT }} />אנטומיית IDoc</h2>
        <p className="mb-4 text-[13px] leading-relaxed text-slate-500">{IDOC.architecture}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {IDOC_RECORDS.map((r) => (
            <div key={r.table} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <Link href={`/object/${r.table}/`} className="tech font-mono text-base font-extrabold text-brand hover:underline" dir="ltr">{r.table}</Link>
              <div className="mt-0.5 text-[12.5px] font-bold text-slate-700">{r.he}</div>
              <div className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{r.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
          <span className="font-bold text-slate-600">ניתוב:</span>
          <span>Partner Profile</span><Tx code="WE20" /><span>·</span><span>Port</span><Tx code="WE21" /><span>·</span><span>Basic Type</span><Tx code="WE30" /><span>+ Extension</span><Tx code="WE31" />
        </div>
      </section>

      {/* data flow */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)] sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-slate-900"><Cable className="size-5" style={{ color: ACCENT }} />זרימת נתונים</h2>
        <div className="flex flex-wrap items-center gap-2">
          {IDOC.flow.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-bold text-slate-700">{node}</span>
              {i < IDOC.flow.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      </section>

      {/* status reference */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900"><Activity className="size-5" style={{ color: ACCENT }} />מדריך קודי סטטוס</h2>
          <div className="flex gap-1.5">
            {(["all", "in", "out"] as const).map((d) => (
              <button key={d} onClick={() => setDir(d)} className={`rounded-xl px-3 py-1.5 text-[12px] font-bold transition ${dir === d ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={dir === d ? { background: d === "all" ? "#475569" : DIR_C[d] } : undefined}>
                {d === "all" ? "הכול" : DIR_HE[d]}
              </button>
            ))}
          </div>
        </div>
        {statuses.length === 0 ? <EmptyState title="אין סטטוסים" hint="נקה סינון" /> : (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {statuses.map((s) => (
              <div key={s.code} className="rounded-2xl border border-slate-200 p-3.5">
                <div className="flex items-center gap-2">
                  <span className="tech grid size-9 shrink-0 place-items-center rounded-xl font-mono text-sm font-extrabold text-white" style={{ background: DIR_C[s.dir] }}>{s.code}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      {s.dir === "in" ? <ArrowRight className="size-3 text-green-600" /> : <ArrowLeft className="size-3 text-blue-600" />}
                      <span className="text-[10px] font-bold uppercase" style={{ color: DIR_C[s.dir] }}>{DIR_HE[s.dir]}</span>
                    </div>
                    <div className="text-[12.5px] font-bold leading-snug text-slate-800">{s.he}</div>
                  </div>
                </div>
                <p className="mt-2 flex gap-1.5 text-[11.5px] leading-relaxed text-slate-500"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-rose-500" />{s.cause}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5"><Wrench className="size-3 text-slate-400" />{s.fix.map((f) => <Tx key={f} code={f} />)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* monitoring tcodes + message types */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)]">
          <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-slate-900"><FileSearch className="size-4" style={{ color: ACCENT }} />כלי ניטור ועיבוד</h2>
          <div className="mb-3 space-y-1.5">
            {IDOC.monitoring.map((m) => (
              <div key={m.t} className="flex items-start gap-2 text-[12px]"><span className="shrink-0"><Tx code={m.t.split(" / ")[0]} /></span><span className="text-slate-500">{m.what}</span></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">{IDOC.transactions.map((t) => <Tx key={t} code={t} />)}</div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)]">
          <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-slate-900"><ListTree className="size-4" style={{ color: ACCENT }} />סוגי הודעה במאגר PM/PP-PI</h2>
          {msgTypes.length ? (
            <div className="flex flex-wrap gap-2">
              {msgTypes.map((m) => (
                <SapTip key={m} name={m} bare>
                  <Link href={`/idoc/${encodeURIComponent(m)}/`} className="tech inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[13px] font-extrabold text-slate-700 transition hover:border-brand/40 hover:text-brand" dir="ltr">{m}<ArrowLeft className="size-3" /></Link>
                </SapTip>
              ))}
            </div>
          ) : <p className="text-[12px] text-slate-400">אין סוגי הודעה ייעודיים במאגר.</p>}
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">סוגי ההודעה שמופיעים בבלוּפרינט של PM/PP-PI. לחיצה פותחת את עמוד ה-IDoc המלא עם הטבלאות הקשורות.</p>
        </section>
      </div>

      {/* CBC reality + incidents */}
      <section className="rounded-3xl border p-5 shadow-[var(--elev-1)]" style={{ borderColor: ACCENT + "30", background: ACCENT + "08" }}>
        <h2 className="mb-2 flex items-center gap-2 text-base font-extrabold text-slate-900"><BookOpen className="size-4" style={{ color: ACCENT }} />מהשטח ב-CBC</h2>
        <p className="text-[12.5px] leading-relaxed text-slate-600">{IDOC.cbc}</p>
        {IDOC.incidents.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {IDOC.incidents.map((i) => (
              <Link key={i.slug} href={`/incidents/`} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11.5px] font-bold text-slate-600 shadow-sm transition hover:text-brand"><Wrench className="size-3" />{i.label}</Link>
            ))}
          </div>
        )}
        <div className="mt-3"><Link href="/integration/#idoc" className="inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: ACCENT }}>למסלול הלמידה המלא של IDoc/ALE<ArrowLeft className="size-3.5" /></Link></div>
      </section>
    </div>
  );
}
