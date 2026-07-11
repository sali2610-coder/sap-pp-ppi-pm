import Link from "next/link";
import { CheckCircle2, AlertTriangle, ArrowLeft, HelpCircle, Wrench, GraduationCap, GitFork, Boxes, Users, Clock, Repeat, FileText, GitCompare, FlaskConical, ShieldCheck } from "lucide-react";
import { buildProfile, type ObjProfile, type ProfDim } from "@/lib/object-profile";
import type { ProfileKind } from "@/data/kind-intel";

const KIND_COLOR: Record<ProfileKind, string> = {
  table: "#0891b2", tcode: "#475569", bapi: "#2563eb", fm: "#0d9488", idoc: "#7c3aed", cds: "#16a34a", auth: "#dc2626",
};

function VBadge({ v }: { v: boolean }) {
  return v
    ? <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600"><CheckCircle2 className="size-3" />אומת</span>
    : <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600"><AlertTriangle className="size-3" />ידע כללי</span>;
}

function Card({ n, title, icon, accent, badge, children }: { n: number; title: string; icon: React.ReactNode; accent: string; badge?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="relative rounded-2xl border border-hairline bg-surface p-4 shadow-sm" dir="rtl">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-lg text-[11px] font-extrabold text-white" style={{ background: accent }}>{n}</span>
        <h3 className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-ink-1">{icon}{title}</h3>
        {badge && <span className="ms-auto">{badge}</span>}
      </div>
      <div className="text-[13px] leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

function DimText({ d }: { d: ProfDim }) { return <p>{d.text}</p>; }

export function ObjectIntelligence({ name, kind }: { name: string; kind?: ProfileKind }) {
  const p: ObjProfile | null = buildProfile(name, kind);
  if (!p) return null;
  const c = KIND_COLOR[p.kind];
  return (
    <div className="space-y-4" dir="rtl">
      <header className="relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-l from-slate-50 to-white p-5 shadow-sm">
        <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: c }} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: c }}>{p.kindHe}</span>
          <h2 className="tech text-xl font-extrabold tracking-tight text-ink-1" dir="ltr">{p.name}</h2>
          {p.module && <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-3">{p.module}</span>}
          <span className="ms-auto text-xs font-bold text-ink-3">תבונת אובייקט · מדריך יועץ בכיר</span>
        </div>
      </header>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card n={1} title="מה זה" icon={<FileText className="size-4 text-ink-3" />} accent={c} badge={<VBadge v={p.what.verified} />}><DimText d={p.what} /></Card>
        <Card n={2} title="למה קיים" icon={<HelpCircle className="size-4 text-ink-3" />} accent={c} badge={<VBadge v={p.why.verified} />}><DimText d={p.why} /></Card>
        <Card n={3} title="מי משתמש" icon={<Users className="size-4 text-ink-3" />} accent={c}>{p.who}</Card>
        <Card n={4} title="מתי משתמשים" icon={<Clock className="size-4 text-ink-3" />} accent={c}>{p.when}</Card>
        <Card n={5} title="מחזור חיים" icon={<Repeat className="size-4 text-ink-3" />} accent={c}>{p.lifecycle}</Card>
        <Card n={6} title="תלויות" icon={<GitFork className="size-4 text-ink-3" />} accent={c}>
          {p.dependencies.length ? <ul className="space-y-1">{p.dependencies.map((d, i) => <li key={i} className="flex gap-1.5"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} /><span className="tech" dir="ltr">{d}</span></li>)}</ul> : <span className="text-ink-3">אין תלויות מתועדות במאגר.</span>}
        </Card>
        <Card n={7} title="אובייקטים קשורים" icon={<Boxes className="size-4 text-ink-3" />} accent={c}>
          {p.related.length ? <div className="flex flex-wrap gap-1.5">{p.related.map((r) => (
            r.href
              ? <Link key={r.name} href={r.href} title={r.he} className="tech tap rounded-lg border border-hairline bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2 transition hover:border-brand hover:text-brand" dir="ltr">{r.name}</Link>
              : <span key={r.name} title={r.he} className="tech rounded-lg border border-dashed border-hairline bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-3" dir="ltr">{r.name}</span>
          ))}</div> : <span className="text-ink-3">אין אובייקטים קשורים במאגר.</span>}
        </Card>
        <Card n={8} title="פתרון תקלות נפוץ" icon={<Wrench className="size-4 text-ink-3" />} accent={c}>
          <ul className="space-y-1">{p.troubleshooting.map((d, i) => <li key={i} className="flex gap-1.5"><AlertTriangle className="mt-0.5 size-3 shrink-0 text-amber-500" /><span>{d}</span></li>)}</ul>
        </Card>
        <Card n={9} title="שאלות ראיון" icon={<GraduationCap className="size-4 text-ink-3" />} accent={c}>
          <ol className="list-inside list-decimal space-y-1 marker:font-bold marker:text-ink-3">{p.interview.map((d, i) => <li key={i}>{d}</li>)}</ol>
        </Card>
        <Card n={10} title="ECC מול S/4HANA" icon={<GitCompare className="size-4 text-ink-3" />} accent={c} badge={<VBadge v={p.eccS4.verified} />}><DimText d={p.eccS4} /></Card>
        <Card n={11} title="דוגמה — אחזקה (PM)" icon={<Wrench className="size-4 text-orange-400" />} accent="#f97316" badge={<VBadge v={p.pmExample.verified} />}><DimText d={p.pmExample} /></Card>
        <Card n={12} title="דוגמה — ייצור (PP/PP-PI)" icon={<FlaskConical className="size-4 text-violet-400" />} accent="#6d28d9" badge={<VBadge v={p.ppExample.verified} />}><DimText d={p.ppExample} /></Card>
      </div>

      <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
        <ShieldCheck className="size-4" />פתח את עמוד האובייקט המלא<ArrowLeft className="size-3.5" />
      </Link>
    </div>
  );
}
