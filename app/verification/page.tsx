import { CenterHeader } from "@/components/knowledge";
import { classifyRows, findings } from "@/lib/verification";

const rows = classifyRows();
const fnds = findings();
const tot = rows.reduce((a, r) => a + r.total, 0);
const ver = rows.reduce((a, r) => a + r.verified, 0);
const par = rows.reduce((a, r) => a + r.partial, 0);
const need = rows.reduce((a, r) => a + r.needs, 0);
const SEV: Record<string, string> = { high: "#dc2626", med: "#d97706", low: "#0891b2" };
const bar = (n: number, d: number) => (d ? Math.round((100 * n) / d) : 0);

export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Audit · Verification Dashboard" title="לוח אימות מאגר" sub={`סיווג כל ${tot} הישויות: Verified / Partially / Needs Verification + זיהוי קישורים מומצאים, מיפויים חלשים, כפילויות ומיפויי FM/BAdI חשודים.`} accent="#0f766e" />
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[{ l: "Verified", v: ver, c: "#16a34a" }, { l: "Partially", v: par, c: "#d97706" }, { l: "Needs Verification", v: need, c: "#dc2626" }, { l: "סך ישויות", v: tot, c: "#475569" }].map((k) => (
          <div key={k.l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-3xl font-extrabold" style={{ color: k.c }}>{k.v}</div><div className="mt-1 text-sm font-bold text-slate-600">{k.l}</div></div>
        ))}
      </div>
      <h2 className="mb-3 text-lg font-extrabold tracking-tight text-slate-900">סיווג לפי סוג</h2>
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500"><tr><th className="p-3 text-start">סוג</th><th className="p-3 text-center">סה״כ</th><th className="p-3 text-center text-green-600">Verified</th><th className="p-3 text-center text-amber-600">Partially</th><th className="p-3 text-center text-red-600">Needs</th><th className="p-3 text-start w-40">% מאומת</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.kind}><td className="p-3 font-bold text-slate-800">{r.kind}</td><td className="p-3 text-center font-mono">{r.total}</td><td className="p-3 text-center font-mono font-bold text-green-600">{r.verified}</td><td className="p-3 text-center font-mono font-bold text-amber-600">{r.partial}</td><td className="p-3 text-center font-mono font-bold text-red-600">{r.needs}</td>
                <td className="p-3"><div className="flex items-center gap-2"><span className="w-9 text-end font-mono text-xs font-bold text-slate-500">{bar(r.verified, r.total)}%</span><div className="h-2 w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-green-500" style={{ width: `${bar(r.verified, r.total)}%` }} /></div></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mb-3 text-lg font-extrabold tracking-tight text-slate-900">ממצאים</h2>
      <div className="space-y-3">
        {fnds.map((f) => (
          <section key={f.type} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: SEV[f.severity] }} /><h3 className="text-sm font-extrabold text-slate-900">{f.type}</h3><span className="ms-auto text-[11px] font-bold" style={{ color: f.items.length ? SEV[f.severity] : "#16a34a" }}>{f.items.length}</span></div>
            {f.items.length ? <div className="flex flex-wrap gap-1.5">{f.items.slice(0, 40).map((it) => <span key={it} className="tech rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500" dir="ltr">{it}</span>)}{f.items.length > 40 && <span className="text-[10px] text-slate-400">+{f.items.length - 40}</span>}</div> : <p className="text-xs font-bold text-green-600">תקין — אין ממצאים.</p>}
          </section>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">מתודולוגיה: Verified = אובייקט SAP אמיתי מהמאגר/מתועד לעומק · Partially = שם מאומת אך לא bench-verified (Exits/Notes-keywords) · Needs = תלוי-גרסה/inferred → אימות SE37/SE18. קישורים מומצאים = הפניות ליעד שאינו במאגר (מרונדרות כצ'יפ-מידע, לא לינק שבור).</p>
    </div>
  );
}
