"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ShieldCheck, Info, ArrowRight, ExternalLink, LayoutGrid } from "lucide-react";
import type { FioriApp, Trust, Tri } from "@/lib/fiori/types";
import { FIORI_BY_SLUG } from "@/data/fiori/apps";
import { objectHasPage, tcodeHasPage, funcHasPage } from "@/lib/route-exists";

const TRUST: Record<Trust, { cls: string; he: string }> = {
  "verified-docs": { cls: "bg-[#f0f6f5] text-[#0f766e] border-[#cfe6e2]", he: "מאומת" },
  curated: { cls: "bg-surface-2 text-ink-2 border-hairline", he: "ידע אצור" },
  "needs-review": { cls: "bg-amber-50 text-amber-700 border-amber-200", he: "דורש בדיקה" },
};
const TY: Record<string, string> = { Transactional: "bg-[#eef6ff] text-[#1d4ed8]", Analytical: "bg-[#f5f3ff] text-[#6d28d9]", "Fact Sheet": "bg-[#f0f7f0] text-[#15803d]" };
const tri = (t: Tri) => (t === "yes" ? "✔ זמין" : t === "no" ? "✕ לא זמין" : "אמת");

function Copyable({ v, href }: { v: string; href?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <span className="inline-flex items-center">
      {href ? <Link href={href} className="tech font-mono font-bold text-ink-1 hover:text-brand" dir="ltr">{v}</Link> : <span className="tech font-mono font-bold text-ink-1" dir="ltr">{v}</span>}
      <button onClick={() => navigator.clipboard?.writeText(v).then(() => { setOk(true); setTimeout(() => setOk(false), 1000); }).catch(() => {})} aria-label="העתק" className="ms-1.5 inline-grid size-5 place-items-center rounded border border-hairline text-ink-3 hover:text-ink-1">{ok ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}</button>
    </span>
  );
}

function Sec({ id, emoji, title, verified, children }: { id: string; emoji: string; title: string; verified?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-3.5 scroll-mt-4 rounded-2xl border border-hairline bg-surface p-4 sm:p-5">
      <h3 className="mb-2.5 flex items-center gap-2 text-[15px] font-extrabold text-ink-1"><span className="text-[17px]">{emoji}</span>{title}{verified && <span className="ms-auto inline-flex items-center gap-1 rounded-full border border-[#cfe6e2] bg-[#f0f6f5] px-2 py-0.5 text-[9.5px] font-bold text-[#0f766e]"><ShieldCheck className="size-2.5" />מאומת</span>}</h3>
      {children}
    </section>
  );
}

export function FioriAppPage({ app }: { app: FioriApp }) {
  const t = TRUST[app.trust];
  const nav: [string, string][] = [["s-purpose", "🎯 מטרה"], ["s-problem", "🧩 בעיה"], ["s-explain", "👥 הסברים"], ["s-sec", "🔐 Roles"], ["s-tech", "🔗 OData/CDS"], ["s-avail", "🔀 ECC↔S/4"]];
  if (app.commonErrors || app.troubleshooting) nav.push(["s-trouble", "⚠️ תקלות"]);
  if (app.cbc) nav.push(["s-cbc", "🏭 CBC"]);
  nav.push(["s-src", "📄 מקורות"]);
  if (app.similar?.length) nav.push(["s-sim", "🧭 דומות"]);

  return (
    <div dir="rtl">
      <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-ink-3">
        <Link href="/fiori-apps/" className="text-brand hover:underline">Fiori Apps</Link><span>›</span><span>{app.module}</span><span>›</span><span dir="ltr">{app.id}</span>
      </nav>

      <div className="mt-4 grid items-start gap-7 lg:grid-cols-[1fr_200px]">
        <div>
          {/* header */}
          <header className="rounded-2xl border border-hairline bg-gradient-to-bl from-surface to-surface-2/40 p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-[#1d4ed8] text-2xl text-white" style={{ width: 52, height: 52 }}><LayoutGrid className="size-6" /></span>
              <div><h1 className="text-2xl font-extrabold tracking-tight text-ink-1">{app.name}</h1><p className="text-[12.5px] text-ink-3" dir="ltr">Fiori ID {app.id} · {app.type} · {app.he}</p></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#eef6ff] px-2.5 py-1 text-[10.5px] font-extrabold text-[#1d4ed8]" dir="ltr">{app.id}</span>
              <span className="rounded-full bg-[#fff7ed] px-2.5 py-1 text-[10.5px] font-bold text-[#f97316]">{app.module}</span>
              <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${TY[app.type]}`}>{app.type}</span>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10.5px] font-bold ${t.cls}`} title={[app.source, app.lastReviewed && `נבדק ${app.lastReviewed}`].filter(Boolean).join(" · ")}><ShieldCheck className="size-3" />{t.he}</span>
            </div>
          </header>

          <div className="mt-4">
            <Sec id="s-purpose" emoji="🎯" title="מטרה עסקית"><p className="text-[13px] leading-relaxed text-ink-2">{app.purpose}</p></Sec>
            <Sec id="s-problem" emoji="🧩" title="איזו בעיה זה פותר"><p className="text-[13px] leading-relaxed text-ink-2">{app.problem}</p>{app.process && <p className="mt-2 text-[11.5px] text-ink-3">תהליך: {app.process}</p>}</Sec>
            <Sec id="s-explain" emoji="👥" title="הסברים לפי קהל">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {([["מתחיל", app.explain.beginner], ["יועץ", app.explain.consultant], ["טכני", app.explain.technical], ...(app.process ? [["תהליך", app.process] as [string, string]] : [])] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-hairline bg-surface-2/40 p-3"><div className="mb-1 text-[10.5px] font-extrabold uppercase tracking-wide text-ink-3">{k}</div><p className="text-[12px] text-ink-2">{v}</p></div>
                ))}
              </div>
            </Sec>
            <Sec id="s-sec" emoji="🔐" title="Roles · Catalogs · Authorizations" verified>
              <table className="w-full border-collapse text-[12.5px]"><tbody>
                <tr className="border-b border-hairline"><td className="py-2 text-ink-3">Business Role</td><td className="py-2"><Copyable v={app.role} /></td></tr>
                <tr className="border-b border-hairline"><td className="py-2 text-ink-3">Business Catalog</td><td className="py-2"><Copyable v={app.catalog} /></td></tr>
                {app.authObjects?.length ? <tr><td className="py-2 text-ink-3">Auth Objects</td><td className="py-2">{app.authObjects.map((a) => <span key={a} className="me-1.5 inline-block"><Copyable v={a} /></span>)}</td></tr> : null}
              </tbody></table>
            </Sec>
            <Sec id="s-tech" emoji="🔗" title="OData · CDS · Backend" verified>
              <div className="flex flex-wrap gap-2 text-[12px]">
                {app.odata && <span className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5">OData: <Copyable v={app.odata} /></span>}
                {app.cds && <span className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5">CDS: <Copyable v={app.cds} /></span>}
                {app.guiTx.map((tx) => <span key={tx} className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5"><Copyable v={tx} href={tcodeHasPage(tx) ? `/tcode/${encodeURIComponent(tx)}/` : undefined} /></span>)}
                {app.relatedObjects?.map((o) => <span key={o} className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5"><Copyable v={o} href={funcHasPage(o) ? `/bapi/${encodeURIComponent(o)}/` : undefined} /></span>)}
              </div>
              {app.relatedTables?.length ? <p className="mt-2 text-[11.5px] text-ink-3">טבלאות: {app.relatedTables.map((tb) => objectHasPage(tb) ? <Link key={tb} href={`/object/${encodeURIComponent(tb)}/`} className="tech me-1.5 font-mono font-bold text-ink-2 hover:text-brand" dir="ltr">{tb}</Link> : <span key={tb} className="tech me-1.5 font-mono font-bold text-ink-3" dir="ltr">{tb}</span>)}</p> : null}
              {app.spro && <p className="mt-2 flex items-start gap-1.5 text-[11.5px] text-ink-3"><Info className="mt-0.5 size-3 shrink-0" />SPRO: {app.spro}</p>}
            </Sec>
            <Sec id="s-avail" emoji="🔀" title="ECC ↔ S/4HANA · Public Cloud">
              <table className="w-full border-collapse text-[12.5px]"><tbody>
                <tr className="border-b border-hairline"><td className="py-2 text-ink-3">ECC</td><td className="py-2 text-ink-2">{app.ecc}</td></tr>
                <tr className="border-b border-hairline"><td className="py-2 text-ink-3">S/4 On-Prem</td><td className="py-2 text-ink-2">{tri(app.s4OnPrem)}</td></tr>
                <tr><td className="py-2 text-ink-3">S/4 Public Cloud</td><td className="py-2 text-ink-2">{tri(app.cloud)}</td></tr>
              </tbody></table>
            </Sec>
            {(app.commonErrors || app.troubleshooting) && (
              <Sec id="s-trouble" emoji="⚠️" title="שגיאות נפוצות · Troubleshooting">
                {app.commonErrors?.length ? <ul className="flex flex-col gap-1.5 rounded-xl border border-[#f5e2bf] bg-[#fff8ec] p-3 text-[12.5px] text-[#92400e]">{app.commonErrors.map((e, i) => <li key={i}>⚠️ {e}</li>)}</ul> : null}
                {app.troubleshooting && <p className="mt-2 text-[12.5px] text-ink-2">{app.troubleshooting}</p>}
              </Sec>
            )}
            {app.cbc && <Sec id="s-cbc" emoji="🏭" title="דוגמת CBC"><p className="text-[13px] leading-relaxed text-ink-2">{app.cbc}</p></Sec>}
            <Sec id="s-src" emoji="📄" title="מקורות ואימות">
              <div className="rounded-xl border border-[#cfe6e2] bg-[#f0f6f5] p-3 text-[12.5px] text-[#0f5e57]">
                מקור: {app.source || "ידע SAP אצור"} · נבדק לאחרונה {app.lastReviewed} · רמת אמון: {t.he}. ללא המצאת SAP Notes או קונפיגורציה.
              </div>
              {app.notes?.length ? <div className="mt-2 flex flex-wrap gap-1.5">{app.notes.map((n, i) => n.url ? <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-hairline px-2 py-1 text-[11px] font-bold text-brand">{n.label}<ExternalLink className="size-3" /></a> : <span key={i} className="rounded-lg border border-hairline px-2 py-1 text-[11px] text-ink-2">{n.label}</span>)}</div> : null}
            </Sec>
            {app.similar?.length ? (
              <Sec id="s-sim" emoji="🧭" title="אפליקציות דומות / קשורות">
                <div className="grid gap-2 sm:grid-cols-2">
                  {app.similar.map((s) => { const a = FIORI_BY_SLUG[s]; return a ? (
                    <Link key={s} href={`/fiori-apps/${a.slug}/`} className="group flex items-center gap-2.5 rounded-xl border border-hairline p-3 transition hover:border-brand/40">
                      <span className="rounded bg-[#eef6ff] px-1.5 py-0.5 text-[10px] font-extrabold text-[#1d4ed8]" dir="ltr">{a.id}</span>
                      <span className="min-w-0 flex-1 text-[12.5px] font-bold text-ink-1">{a.he}</span>
                      <ArrowRight className="size-4 shrink-0 text-ink-3 transition group-hover:-translate-x-0.5 rtl:rotate-180" />
                    </Link>
                  ) : null; })}
                </div>
              </Sec>
            ) : null}
          </div>
        </div>

        {/* sticky in-page nav */}
        <aside className="hidden lg:sticky lg:top-4 lg:block">
          <div className="rounded-2xl border border-hairline bg-surface p-3.5">
            <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-3">בעמוד זה</div>
            <nav className="flex flex-col gap-0.5">{nav.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-ink-2 hover:bg-surface-2">{label}</a>)}</nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
