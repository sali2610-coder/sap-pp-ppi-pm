"use client";

import { useMemo } from "react";
import { Trophy, GraduationCap, Boxes, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { LEARN_PATHS } from "@/data/learn/paths";
import { useAllProgress } from "@/lib/learn-store";
import { useFavorites, getRecentObjects } from "@/lib/prefs";

const avgPct = (prog: Record<string, string[]>, ids: string[]) => {
  const vals = ids.map((id) => { const p = LEARN_PATHS[id]; if (!p) return 0; const done = new Set(prog[id] || []); return p.steps.length ? p.steps.filter((s) => done.has(s.id)).length / p.steps.length : 0; });
  return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) : 0;
};

export function LearnMetrics() {
  const prog = useAllProgress();
  const favs = useFavorites();
  const recentN = useMemo(() => getRecentObjects().length, []);

  const m = useMemo(() => {
    const all = Object.values(LEARN_PATHS);
    let done = 0, total = 0, tracksDone = 0;
    for (const p of all) {
      const d = new Set(prog[p.id] || []);
      const dc = p.steps.filter((s) => d.has(s.id)).length;
      done += dc; total += p.steps.length; if (dc === p.steps.length && p.steps.length) tracksDone++;
    }
    const overall = total ? Math.round((done / total) * 100) : 0;
    const objScore = Math.min(1, recentN / 20);
    const score = Math.round(overall * 0.6 + objScore * 100 * 0.25 + Math.min(1, tracksDone / all.length) * 100 * 0.15);
    const interview = avgPct(prog, ["pm-fundamentals", "pm-planning", "pm-execution", "pp-pi", "pp-planning", "pp-execution"]);
    const trouble = avgPct(prog, ["pm-troubleshooting", "pp-troubleshooting"]);
    return { overall, tracksDone, tracksTotal: all.length, score, interview, trouble };
  }, [prog, recentN]);

  const Bar = ({ icon, label, pct, c }: { icon: React.ReactNode; label: string; pct: number; c: string }) => (
    <div className="flex items-center gap-2.5">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg text-white" style={{ background: c }}>{icon}</span>
      <span className="w-28 shrink-0 text-xs font-bold text-slate-600">{label}</span>
      <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all" style={{ width: `${pct}%`, background: c }} /></span>
      <span className="w-9 shrink-0 text-left text-xs font-extrabold tabular-nums text-slate-500">{pct}%</span>
    </div>
  );

  const tier = m.score >= 75 ? { he: "מתקדם", c: "#16a34a" } : m.score >= 40 ? { he: "בדרך", c: "#d97706" } : { he: "מתחיל", c: "#64748b" };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" dir="rtl">
      <div className="flex items-center gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl text-white" style={{ background: tier.c }}>
          <div className="text-center"><div className="text-xl font-extrabold leading-none tabular-nums">{m.score}</div><div className="text-[8px] font-bold opacity-80">SCORE</div></div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-base font-extrabold text-slate-900"><Trophy className="size-4" style={{ color: tier.c }} />ציון הידע שלי <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: tier.c }}>{tier.he}</span></h3>
          <p className="mt-0.5 text-xs text-slate-500">מבוסס על ההתקדמות שלך — מסלולים, אובייקטים ומועדפים. מתעדכן בזמן אמת.</p>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1"><GraduationCap className="size-3.5" />{m.tracksDone}/{m.tracksTotal} מסלולים</span>
            <span className="flex items-center gap-1"><Boxes className="size-3.5" />{recentN} אובייקטים נחקרו</span>
            <span className="flex items-center gap-1"><Star className="size-3.5" />{favs.length} מועדפים</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
        <Bar icon={<GraduationCap className="size-3.5" />} label="התקדמות למידה" pct={m.overall} c="#d62027" />
        <Bar icon={<MessageSquare className="size-3.5" />} label="מוכנות לראיון" pct={m.interview} c="#7c3aed" />
        <Bar icon={<ShieldCheck className="size-3.5" />} label="מוכנות לתקלות" pct={m.trouble} c="#0891b2" />
      </div>
    </div>
  );
}
