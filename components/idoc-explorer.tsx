"use client";

import { forWhiteText } from "@/lib/contrast";
import { useMemo, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { Cable, ArrowLeft, ArrowRight, Layers, Activity, FileSearch, ListTree, AlertTriangle, Wrench, BookOpen } from "lucide-react";
import { SapTip } from "@/components/sap-tip";
import { StatCard, SectionCard, FilterBar, FilterButton, EmptyState } from "@/components/ui";
import { IDOC, IDOC_RECORDS, IDOC_STATUSES, idocMessageTypes } from "@/lib/idoc-intel";

const ACCENT = "#0e7490"; // IDoc cyan (matches integration record color)
const DIR_C = { in: "#16a34a", out: "#2563eb" } as const;
const DIR_HE = { in: "נכנס (Inbound)", out: "יוצא (Outbound)" } as const;

// Diagnostic tcode chip — hover = mini-mentor, click = full page. Inspector-wired
// via SapTip's "send to Inspector".
function Tx({ code }: { code: string }) {
  return (
    <SapTip name={code} bare>
      <Link href={`/tcode/${encodeURIComponent(code)}/`} className="tech inline-flex items-center rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{code}</Link>
    </SapTip>
  );
}

// IDoc Explorer — built on the production Design System (StatCard / SectionCard / FilterBar).
export function IDocExplorer() {
  const msgTypes = useMemo(() => idocMessageTypes(), []);
  const [dir, setDir] = useState<"all" | "in" | "out">("all");
  const statuses = useMemo(() => IDOC_STATUSES.filter((s) => dir === "all" || s.dir === dir), [dir]);

  const STATS = [
    { icon: ListTree, v: msgTypes.length, l: "סוגי הודעה במאגר", c: ACCENT },
    { icon: FileSearch, v: IDOC.transactions.length, l: "כלי ניטור (T-Codes)", c: "#2563eb" },
    { icon: Activity, v: IDOC_STATUSES.length, l: "קודי סטטוס מרכזיים", c: "#d62027" },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* stat band */}
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((k) => <StatCard key={k.l} icon={k.icon} value={k.v} label={k.l} accent={k.c} />)}
      </div>

      {/* anatomy — the three physical IDoc records */}
      <SectionCard icon={Layers} accent={ACCENT} title="אנטומיית IDoc">
        <p className="mb-4 text-[13px] leading-relaxed text-ink-3">{IDOC.architecture}</p>
        <div className="grid-adaptive-sm">
          {IDOC_RECORDS.map((r) => (
            <div key={r.table} className="rounded-2xl border border-hairline bg-surface-2/60 p-4">
              <Link href={`/object/${r.table}/`} className="tech font-mono text-base font-extrabold text-brand hover:underline" dir="ltr">{r.table}</Link>
              <div className="mt-0.5 text-[12.5px] font-bold text-ink-2">{r.he}</div>
              <div className="mt-1 text-[11.5px] leading-relaxed text-ink-3">{r.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-ink-3">
          <span className="font-bold text-ink-2">ניתוב:</span>
          <span>Partner Profile</span><Tx code="WE20" /><span>·</span><span>Port</span><Tx code="WE21" /><span>·</span><span>Basic Type</span><Tx code="WE30" /><span>+ Extension</span><Tx code="WE31" />
        </div>
      </SectionCard>

      {/* data flow */}
      <SectionCard icon={Cable} accent={ACCENT} title="זרימת נתונים">
        <div className="flex flex-wrap items-center gap-2">
          {IDOC.flow.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span className="rounded-xl border border-hairline bg-surface-2 px-3 py-2 text-[12px] font-bold text-ink-2">{node}</span>
              {i < IDOC.flow.length - 1 && <ArrowLeft className="size-4 shrink-0 text-ink-3" aria-hidden />}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* status reference */}
      <SectionCard
        icon={Activity}
        accent={ACCENT}
        title="מדריך קודי סטטוס"
        action={
          <FilterBar>
            {(["all", "in", "out"] as const).map((d) => (
              <FilterButton key={d} active={dir === d} accent={d === "all" ? "#475569" : DIR_C[d]} onClick={() => setDir(d)}>
                {d === "all" ? "הכול" : DIR_HE[d]}
              </FilterButton>
            ))}
          </FilterBar>
        }
      >
        {statuses.length === 0 ? <EmptyState title="אין סטטוסים" hint="נקה סינון" /> : (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {statuses.map((s) => (
              <div key={s.code} className="rounded-2xl border border-hairline p-3.5">
                <div className="flex items-center gap-2">
                  <span className="tech grid size-9 shrink-0 place-items-center rounded-xl font-mono text-sm font-extrabold text-white" style={{ background: forWhiteText(DIR_C[s.dir])}}>{s.code}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      {s.dir === "in" ? <ArrowRight className="size-3 text-green-600" /> : <ArrowLeft className="size-3 text-blue-600" />}
                      <span className="text-[10px] font-bold uppercase" style={{ color: DIR_C[s.dir] }}>{DIR_HE[s.dir]}</span>
                    </div>
                    <div className="text-[12.5px] font-bold leading-snug text-ink-1">{s.he}</div>
                  </div>
                </div>
                <p className="mt-2 flex gap-1.5 text-[11.5px] leading-relaxed text-ink-3"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-rose-500" aria-hidden />{s.cause}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5"><Wrench className="size-3 text-ink-3" aria-hidden />{s.fix.map((f) => <Tx key={f} code={f} />)}</div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* monitoring tcodes + message types */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard icon={FileSearch} accent={ACCENT} title="כלי ניטור ועיבוד" level={3}>
          <div className="mb-3 space-y-1.5">
            {IDOC.monitoring.map((m) => (
              <div key={m.t} className="flex items-start gap-2 text-[12px]"><span className="shrink-0"><Tx code={m.t.split(" / ")[0]} /></span><span className="text-ink-3">{m.what}</span></div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-hairline pt-3">{IDOC.transactions.map((t) => <Tx key={t} code={t} />)}</div>
        </SectionCard>

        <SectionCard icon={ListTree} accent={ACCENT} title="סוגי הודעה במאגר PM/PP-PI" level={3}>
          {msgTypes.length ? (
            <div className="flex flex-wrap gap-2">
              {msgTypes.map((m) => (
                <SapTip key={m} name={m} bare>
                  <Link href={`/idoc/${encodeURIComponent(m)}/`} className="tech inline-flex items-center gap-1 rounded-xl border border-hairline bg-surface-2 px-3 py-2 font-mono text-[13px] font-extrabold text-ink-2 transition hover:border-brand/40 hover:text-brand" dir="ltr">{m}<ArrowLeft className="size-3" /></Link>
                </SapTip>
              ))}
            </div>
          ) : <p className="text-[12px] text-ink-3">אין סוגי הודעה ייעודיים במאגר.</p>}
          <p className="mt-3 text-[11px] leading-relaxed text-ink-3">סוגי ההודעה שמופיעים בבלוּפרינט של PM/PP-PI. לחיצה פותחת את עמוד ה-IDoc המלא עם הטבלאות הקשורות.</p>
        </SectionCard>
      </div>

      {/* הארגון reality + incidents */}
      <section className="rounded-2xl border p-5 shadow-[var(--elev-1)]" style={{ borderColor: ACCENT + "30", background: ACCENT + "08" }}>
        <h2 className="mb-2 flex items-center gap-2 text-[15px] font-extrabold text-ink-1"><BookOpen className="size-4" style={{ color: ACCENT }} aria-hidden />מהשטח בארגון</h2>
        <p className="text-[12.5px] leading-relaxed text-ink-2">{IDOC.scenario}</p>
        {IDOC.incidents.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {IDOC.incidents.map((i) => (
              <Link key={i.slug} href={`/incidents/`} className="inline-flex items-center gap-1 rounded-lg bg-surface px-2.5 py-1 text-[11.5px] font-bold text-ink-2 shadow-sm transition hover:text-brand"><Wrench className="size-3" />{i.label}</Link>
            ))}
          </div>
        )}
        <div className="mt-3"><Link href="/integration/#idoc" className="inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: ACCENT }}>למסלול הלמידה המלא של IDoc/ALE<ArrowLeft className="size-3.5" /></Link></div>
      </section>
    </div>
  );
}
