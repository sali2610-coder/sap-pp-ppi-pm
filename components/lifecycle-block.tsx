import { lifecycle, LC_COLOR, LC_HE, IMPACT_HE } from "@/data/lifecycle";
import { Check, X, ArrowRightLeft } from "lucide-react";

export function LifecycleBlock({ code }: { code: string }) {
  const lc = lifecycle(code);
  const col = LC_COLOR[lc.status];
  return (
    <section className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm" dir="rtl">
      <header className="flex flex-wrap items-center gap-2 border-b border-hairline bg-gradient-to-l from-slate-50 to-white px-5 py-3">
        <ArrowRightLeft className="size-4 text-ink-3" />
        <h3 className="text-sm font-extrabold tracking-tight text-ink-1">מחזור חיים · Evolution</h3>
        <span className="ms-auto rounded-full px-3 py-1 text-xs font-extrabold text-white" style={{ background: col }}>{LC_HE[lc.status]} · {lc.status}</span>
      </header>
      <div className="grid gap-x-4 gap-y-2.5 p-5 sm:grid-cols-2">
        <Row label="זמינות ECC6"><Avail on={lc.ecc} /></Row>
        <Row label="זמינות S/4HANA"><Avail on={lc.s4} /></Row>
        {lc.fiori && <Row label="חלופת Fiori"><span className="font-bold text-violet-700">{lc.fiori}</span></Row>}
        {lc.alt && <Row label="חלופה מומלצת (SAP)"><span className="tech font-bold text-blue-700" dir="ltr">{lc.alt}</span></Row>}
        {lc.simplification && <Row label="Simplification Item"><span className="text-ink-2">{lc.simplification}</span></Row>}
        <Row label="השפעת מיגרציה"><span className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: lc.impact === "High" ? "#dc2626" : lc.impact === "Medium" ? "#d97706" : lc.impact === "Low" ? "#0891b2" : "#16a34a" }}>{IMPACT_HE[lc.impact]}</span></Row>
      </div>
      <div className="border-t border-hairline px-5 py-3 text-[13px] leading-relaxed text-ink-2"><b className="text-ink-3">Migration Notes:</b> {lc.migration}</div>
    </section>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-2 border-b border-hairline pb-1.5"><span className="text-xs font-bold text-ink-3">{label}</span><span className="text-sm">{children}</span></div>;
}
function Avail({ on }: { on: boolean }) {
  return on ? <span className="inline-flex items-center gap-1 font-bold text-green-600"><Check className="size-4" />זמין</span> : <span className="inline-flex items-center gap-1 font-bold text-red-500"><X className="size-4" />לא זמין</span>;
}
