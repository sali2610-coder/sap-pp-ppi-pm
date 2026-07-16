"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, GitBranch, Link2 } from "lucide-react";

export type RelEdge = { from: string; to: string; card?: string; desc?: string; toExists?: boolean };

// Interactive ER map (GOAL-3 relationship visualization). Clusters the verified
// relations by parent node, surfaces the most-connected hubs as a mini-map, and
// highlights everything touching a focused node. Pure data — no invented edges.
export function RelationshipMap({ edges, accent }: { edges: RelEdge[]; accent: string }) {
  const [focus, setFocus] = useState<string>("");

  const groups = useMemo(() => {
    const m = new Map<string, RelEdge[]>();
    for (const e of edges) { if (!m.has(e.from)) m.set(e.from, []); m.get(e.from)!.push(e); }
    return [...m.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [edges]);

  const hubs = useMemo(() => {
    const d = new Map<string, number>();
    for (const e of edges) { d.set(e.from, (d.get(e.from) || 0) + 1); d.set(e.to, (d.get(e.to) || 0) + 1); }
    return [...d.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [edges]);

  const touches = (e: RelEdge) => !focus || e.from === focus || e.to === focus;
  const dim = (n: string) => focus !== "" && focus !== n && !edges.some((e) => (e.from === focus && e.to === n) || (e.to === focus && e.from === n));

  const Node = ({ code, role }: { code: string; role: "parent" | "child" }) => {
    const on = focus === code;
    const faded = dim(code);
    const cls = `tech inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[12px] font-bold transition ${on ? "text-white" : faded ? "border-hairline bg-surface text-ink-3/50" : "border-hairline bg-surface text-ink-1 hover:border-brand/40 hover:text-brand"}`;
    const style = on ? { background: accent, borderColor: accent } : undefined;
    return (
      <button type="button" onClick={() => setFocus(on ? "" : code)} className={cls} style={style} dir="ltr" aria-pressed={on}>
        {role === "parent" && <GitBranch className="size-3 opacity-70" />}{code}
      </button>
    );
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* mini-map — most-connected hubs */}
      <div className="rounded-2xl border border-hairline bg-surface-2/50 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-ink-3"><Link2 className="size-3.5" />צמתים מרכזיים (מפת-על) · לחיצה ממקדת</div>
        <div className="flex flex-wrap gap-1.5">
          {hubs.map(([code, deg]) => { const on = focus === code; return (
            <button key={code} type="button" onClick={() => setFocus(on ? "" : code)} className={`tech inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold transition ${on ? "text-white" : "bg-surface text-ink-2 hover:bg-hairline"}`} style={on ? { background: accent } : undefined} dir="ltr">
              {code}<span className={`rounded px-1 text-[10px] ${on ? "bg-white/20" : "bg-surface-2 text-ink-3"}`}>{deg}</span>
            </button>
          ); })}
          {focus && <button type="button" onClick={() => setFocus("")} className="rounded-lg px-2.5 py-1 text-[11px] font-bold text-brand hover:underline">נקה מיקוד</button>}
        </div>
      </div>

      {/* clustered relations by parent */}
      <div className="grid gap-3 lg:grid-cols-2">
        {groups.map(([parent, es]) => {
          if (focus && !es.some(touches) && parent !== focus) return null;
          return (
            <div key={parent} className={`rounded-2xl border p-3.5 transition ${focus === parent ? "border-brand/40 bg-surface" : "border-hairline bg-surface"}`}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <Node code={parent} role="parent" />
                <span className="text-[10px] font-bold text-ink-3">{es.length} קשרים</span>
              </div>
              <div className="space-y-1.5">
                {es.filter(touches).map((e, i) => (
                  <div key={i} className={`flex flex-wrap items-center gap-1.5 rounded-lg px-1.5 py-1 ${focus && (e.from === focus || e.to === focus) ? "bg-surface-2/70" : ""}`}>
                    <ArrowLeft className="size-3 shrink-0 text-ink-3/50" />
                    {e.toExists ? <Link href={`/object/${encodeURIComponent(e.to)}/`} className="tech rounded-md border border-hairline bg-surface px-2 py-0.5 font-mono text-[12px] font-bold text-ink-1 transition hover:border-brand/40 hover:text-brand" dir="ltr">{e.to}</Link>
                      : <span className="tech rounded-md border border-hairline bg-surface-2 px-2 py-0.5 font-mono text-[12px] font-bold text-ink-3" dir="ltr">{e.to}</span>}
                    {e.card && <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink-3">{e.card}</span>}
                    {e.desc && <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-3">{e.desc}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
