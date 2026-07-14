"use client";

/**
 * CENTRAL BAPI / FM HUB — full-page object workspace (§2/§3/§12).
 * A BAPI/FM is a major technical object and opens as a complete consultant page,
 * not a side drawer. Reads the canonical registry object (single source of truth,
 * §14). Structure A–J per spec: hero · ECC↔S/4 · what/why/when/when-not · interfaces
 * · example · related · failures · verification. Honest by construction — nothing
 * is invented; uncertain data is shown as uncertain (§15).
 */
import { useState } from "react";
import Link from "next/link";
import { SmartLink } from "@/components/smart-link";
import { Plug, Braces, Cable, Copy, Check, Star, Sparkles, Eye, ShieldCheck, AlertTriangle, Clock, Info, Layers, GitBranch, Network, Terminal, Table2, Code2, Wrench, ListChecks, BookOpen, ArrowLeft, ExternalLink, Server, Boxes, KeyRound, FileText } from "lucide-react";
import type { SapFuncObject, VerificationStatus, TriState } from "@/lib/bapi-registry";
import { toggleFavorite, useIsFavorite } from "@/lib/prefs";
import { peek } from "@/components/object-peek";

type RelatedLite = { id: string; technicalName: string; objectType: string; primaryModule: string; shortDescriptionHe: string; verificationStatus: VerificationStatus };

const haptic = () => { try { navigator.vibrate?.(8); } catch { /* noop */ } };

const VERIF: Record<VerificationStatus, { he: string; cls: string; Icon: typeof Info; tone: "ok" | "warn" | "bad" | "muted" }> = {
  "verified-system": { he: "מאומת במערכת", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: ShieldCheck, tone: "ok" },
  "verified-docs": { he: "מאומת בתיעוד SAP", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: ShieldCheck, tone: "ok" },
  "requires-verification": { he: "דורש אימות", cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: Clock, tone: "warn" },
  "version-dependent": { he: "תלוי גרסה", cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: Info, tone: "warn" },
  "internal-unsupported": { he: "FM פנימי · לא נתמך לאינטגרציה", cls: "bg-slate-100 text-slate-600 border-slate-200", Icon: AlertTriangle, tone: "muted" },
  "invalid-name": { he: "שם לא קיים ב-SAP", cls: "bg-brand-soft text-brand border-brand/30", Icon: AlertTriangle, tone: "bad" },
  "deprecated": { he: "הוחלף / הוצא משימוש", cls: "bg-brand-soft text-brand border-brand/30", Icon: AlertTriangle, tone: "bad" },
};
const OP_HE: Record<string, string> = { Read: "קריאה", Create: "יצירה", Change: "שינוי", Delete: "מחיקה", Post: "רישום", Confirm: "דיווח", Mixed: "מעורב", Unknown: "—" };
const DIFF_HE: Record<string, string> = { Beginner: "מתחיל", Intermediate: "בינוני", Advanced: "מתקדם", Expert: "מומחה" };
const STAB_HE: Record<string, string> = { Released: "Released API", "SAP-Recommended": "מומלץ SAP", Internal: "פנימי", "Use-With-Caution": "בזהירות", Obsolete: "מיושן" };
const CAT_HE: Record<string, string> = { Notification: "הודעות", Equipment: "ציוד", Execution: "פקודות עבודה", Confirmation: "דיווחי ביצוע", GoodsMovement: "תנועות סחורה", MasterData: "נתוני אב", Planning: "תכנון", TransactionControl: "בקרת LUW", BusinessAPI: "ממשק עסקי", General: "כללי", Reservation: "הזמנות", Batch: "אצוות", BOM: "עצי מוצר", Status: "סטטוס", Analytics: "אנליטיקה" };

const tri = (t?: TriState): { he: string; cls: string } =>
  t === "yes" ? { he: "נתמך", cls: "text-emerald-600" } : t === "no" ? { he: "לא נתמך", cls: "text-brand" } : { he: "לא ידוע", cls: "text-ink-3" };

const isBapi = (t: string) => t === "BAPI";
const KindIcon = ({ t }: { t: string }) => (t === "BAPI" ? <Plug className="size-5" /> : t === "IDoc" ? <Cable className="size-5" /> : <Braces className="size-5" />);

function Section({ id, icon, title, sub, children, tone }: { id?: string; icon: React.ReactNode; title: string; sub?: string; children: React.ReactNode; tone?: string }) {
  return (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-hairline bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-brand">{icon}</span>
        <div><h2 className="text-[15px] font-extrabold text-ink-1">{title}</h2>{sub && <p className="text-[11.5px] text-ink-3">{sub}</p>}</div>
      </div>
      {children}
    </section>
  );
}
function Chips({ items, hrefBase }: { items: string[]; hrefBase?: (s: string) => string }) {
  if (!items.length) return <p className="text-[12.5px] text-ink-3">—</p>;
  // SmartLink renders a plain span when the target page doesn't exist (no dead links)
  return <div className="flex flex-wrap gap-1.5">{items.map((s) => hrefBase
    ? <SmartLink key={s} href={hrefBase(s)} className="tech tap rounded-lg border border-hairline bg-surface-2 px-2 py-1 font-mono text-[11.5px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand" deadClassName="tech rounded-lg bg-surface-2 px-2 py-1 font-mono text-[11.5px] font-bold text-ink-3">{s}</SmartLink>
    : <span key={s} dir="ltr" className="tech rounded-lg bg-surface-2 px-2 py-1 font-mono text-[11.5px] font-bold text-ink-2">{s}</span>)}</div>;
}

export function BapiObjectPage({ o, related }: { o: SapFuncObject; related: RelatedLite[] }) {
  const fav = useIsFavorite(o.technicalName);
  const [copied, setCopied] = useState(false);
  const v = VERIF[o.verificationStatus];
  const bapi = isBapi(o.objectType);
  const rfc = o.remoteEnabled === "yes";
  const typeLabel = o.verificationStatus === "invalid-name" ? "אובייקט לא קיים" : bapi ? (o.stability === "Released" ? "Released BAPI" : "BAPI") : rfc ? "RFC-enabled FM" : o.verificationStatus === "internal-unsupported" ? "Internal FM" : "Function Module";
  const copy = () => { navigator.clipboard?.writeText(o.technicalName).then(() => { setCopied(true); haptic(); setTimeout(() => setCopied(false), 1400); }).catch(() => {}); };
  // honest SAP-note detection — only surface a note when the verification source actually cites one
  const noteMatch = (o.verificationSource || "").match(/\b(KBA|SAP Note|Note)\s*[:#]?\s*(\d{6,7})/i);

  return (
    <div dir="rtl" className="mx-auto max-w-5xl space-y-4 pb-16 2xl:max-w-6xl">
      {/* breadcrumb + back to hub with module filter */}
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-3">
        <Link href="/bapi/" className="rounded-md px-1.5 py-0.5 transition hover:bg-surface-2 hover:text-brand">מרכז BAPI / FM</Link>
        <ArrowLeft className="size-3" />
        <Link href={`/bapi/?module=${encodeURIComponent(o.primaryModule)}`} className="rounded-md px-1.5 py-0.5 transition hover:bg-surface-2 hover:text-brand">{o.primaryModule}</Link>
        <ArrowLeft className="size-3" />
        <span dir="ltr" className="tech truncate font-mono text-ink-2">{o.technicalName}</span>
      </div>

      {/* ===== A · HERO ===== */}
      <section className="relative overflow-hidden rounded-[1.5rem] border border-hairline bg-surface p-5 shadow-sm sm:p-7" style={{ boxShadow: `inset 0 3px 0 ${bapi ? "var(--brand)" : "var(--ink-1)"}` }}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-white ${bapi ? "bg-brand" : "bg-ink-1"}`}><KindIcon t={o.objectType} /></span>
              <div className="min-w-0">
                <h1 className="tech break-all font-mono text-[19px] font-black leading-tight text-ink-1 sm:text-[22px]" dir="ltr">{o.technicalName}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-md px-1.5 py-0.5 text-[10.5px] font-black text-white ${bapi ? "bg-brand" : "bg-ink-1"}`}>{typeLabel}</span>
                  {rfc && <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-1.5 py-0.5 text-[10.5px] font-bold text-sky-700"><Server className="size-3" />RFC</span>}
                  <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{o.primaryModule}</span>
                  {o.category && CAT_HE[o.category] && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{CAT_HE[o.category]}</span>}
                  {o.operationType !== "Unknown" && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{OP_HE[o.operationType]}</span>}
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${v.cls}`}><v.Icon className="size-3" />{v.he}</span>
              <span className="rounded-full border border-hairline px-2 py-0.5 text-[11px] font-bold text-ink-2">{DIFF_HE[o.difficulty] || o.difficulty}</span>
              <span className="rounded-full border border-hairline px-2 py-0.5 text-[11px] font-bold text-ink-2">{STAB_HE[o.stability] || o.stability}</span>
              {o.requiresCommit === "yes" && <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">דורש COMMIT</span>}
              {o.businessObject && <span className="rounded-full border border-hairline px-2 py-0.5 text-[11px] font-bold text-ink-2">BOR: {o.businessObject}</span>}
            </div>
            {o.businessProcess && <p className="mt-2 flex items-center gap-1 text-[12.5px] font-semibold text-ink-3"><GitBranch className="size-3.5" />{o.businessProcess}</p>}
          </div>
          {/* actions */}
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <button onClick={() => { toggleFavorite(o.technicalName); haptic(); }} aria-pressed={fav} className="tap inline-flex items-center gap-1 rounded-xl border border-hairline bg-surface px-3 py-2 text-[12px] font-bold text-ink-2 transition hover:border-brand/40"><Star className={`size-3.5 ${fav ? "fill-amber-400 text-amber-400" : ""}`} />{fav ? "במועדפים" : "מועדף"}</button>
            <button onClick={copy} className="tap inline-flex items-center gap-1 rounded-xl border border-hairline bg-surface px-3 py-2 text-[12px] font-bold text-ink-2 transition hover:border-brand/40">{copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}העתק</button>
            <button onClick={() => peek(o.technicalName)} className="tap inline-flex items-center gap-1 rounded-xl border border-hairline bg-surface px-3 py-2 text-[12px] font-bold text-ink-2 transition hover:border-brand/40"><Eye className="size-3.5" />תצוגה מהירה</button>
            <Link href={`/chat/?q=${encodeURIComponent(o.technicalName)}`} className="tap inline-flex items-center gap-1 rounded-xl bg-brand px-3 py-2 text-[12px] font-bold text-white transition hover:brightness-110"><Sparkles className="size-3.5" />שאל AI</Link>
          </div>
        </div>
        {o.verificationStatus === "invalid-name" && <p className="mt-3 rounded-xl border border-brand/25 bg-brand-soft px-3 py-2 text-[12.5px] font-semibold text-brand"><AlertTriangle className="me-1 inline size-3.5" />שם זה אינו אובייקט SAP סטנדרטי לפי המקורות הרשמיים. ראה סעיף אימות בהמשך + חלופה מומלצת.</p>}
      </section>

      {/* ===== §6 · ECC ↔ S/4HANA ===== */}
      <Section id="ecc-s4" icon={<Boxes className="size-4" />} title="תאימות ECC ↔ S/4HANA" sub="אין להניח שאובייקט מתנהג זהה ב-S/4HANA">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([["ECC", o.eccSupport], ["S/4 On-Prem", o.s4OnPremSupport], ["S/4 Private", o.s4OnPremSupport], ["S/4 Public", o.cloudSupport]] as const).map(([l, t]) => { const x = tri(t); return (
            <div key={l} className="rounded-xl border border-hairline bg-surface-2/40 p-3 text-center">
              <div className="text-[11px] font-bold text-ink-3">{l}</div>
              <div className={`text-[13px] font-extrabold ${x.cls}`}>{x.he}</div>
            </div>
          ); })}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {o.requiresSave === "yes" && <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2">דורש SAVE לפני COMMIT</span>}
          {o.requiresCommit === "yes" && <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2">דורש BAPI_TRANSACTION_COMMIT</span>}
          {o.releasedStatus && <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2">{o.releasedStatus}</span>}
          {o.remoteEnabled === "yes" && <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2">RFC-enabled</span>}
        </div>
        {(o.eccSupport === "unknown" || o.s4OnPremSupport === "unknown") && <p className="mt-2 text-[11.5px] text-ink-3"><Info className="me-1 inline size-3" />זמינות שלא סומנה = טרם אומתה מול מקור רשמי (ראה סעיף אימות). לא ממציאים.</p>}
      </Section>

      {/* migration / SAP Note (§7) — honest: only when a verified note is cited */}
      {(o.verificationStatus === "deprecated" || o.verificationStatus === "invalid-name" || noteMatch) && (
        <Section icon={<FileText className="size-4" />} title="הערת SAP רשמית / מיגרציה" tone="warn">
          {noteMatch ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <div className="font-mono text-[13px] font-extrabold text-amber-800" dir="ltr">{noteMatch[1]} {noteMatch[2]}</div>
              <p className="mt-1 text-[12.5px] text-ink-2">מקור אימות: {o.verificationSource}</p>
              <a href={`https://me.sap.com/notes/${noteMatch[2]}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-brand hover:underline">פתח ב-SAP ONE Support<ExternalLink className="size-3" /></a>
            </div>
          ) : (
            <p className="rounded-xl border border-hairline bg-surface-2/40 p-3 text-[12.5px] text-ink-2"><Info className="me-1 inline size-3.5" />לא נמצאה הערת SAP מאומתת עבור אובייקט זה. איננו ממציאים מספר הערה — אם נדרש, בדוק ב-SAP ONE Support / Simplification Item Catalog.</p>
          )}
        </Section>
      )}

      {/* ===== B · WHAT ===== */}
      <Section icon={<Info className="size-4" />} title="מה זה?">
        <p className="text-[14px] leading-relaxed text-ink-1">{o.shortDescriptionHe || "טרם תועד תיאור מאומת בעברית."}</p>
        {o.longDescriptionHe && <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{o.longDescriptionHe}</p>}
        {o.shortDescriptionEn && <p dir="ltr" className="mt-2 border-t border-hairline pt-2 text-[12.5px] leading-relaxed text-ink-3">{o.shortDescriptionEn}</p>}
      </Section>

      {/* ===== C/D · WHY + WHEN TO USE ===== */}
      {(o.businessScenario || o.usageContexts?.length) && (
        <Section icon={<BookOpen className="size-4" />} title="למה קיים ומתי להשתמש">
          {o.businessScenario && <p className="text-[13.5px] leading-relaxed text-ink-1">{o.businessScenario}</p>}
          {o.usageContexts?.length ? <div className="mt-3"><div className="mb-1 text-[11px] font-bold text-ink-3">תרחישי שימוש טיפוסיים</div><Chips items={o.usageContexts} /></div> : null}
          {o.recommendedReading?.length ? <div className="mt-3 flex flex-wrap items-center gap-1"><span className="text-[11px] font-bold text-ink-3">קריאה מומלצת:</span>{o.recommendedReading.map((r) => <span key={r} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[11px] font-bold text-ink-2">{r}</span>)}</div> : null}
        </Section>
      )}

      {/* ===== E · WHEN NOT TO USE ===== */}
      {(o.commonMistakes?.length || o.verificationStatus === "internal-unsupported") && (
        <Section icon={<AlertTriangle className="size-4" />} title="מתי לא להשתמש · מלכודות">
          {o.verificationStatus === "internal-unsupported" && <p className="mb-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12.5px] font-semibold text-slate-600">FM פנימי — לא ממשק אינטגרציה משוחרר. אין לקרוא ישירות מקוד חיצוני ללא בדיקת תופעות לוואי, נעילה ו-COMMIT.</p>}
          {o.commonMistakes?.length ? <ul className="space-y-1.5 text-[12.5px] text-ink-2">{o.commonMistakes.map((m, i) => <li key={i} className="flex gap-2"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />{m}</li>)}</ul> : null}
        </Section>
      )}

      {/* ===== F · INTERFACES ===== */}
      <Section icon={<Braces className="size-4" />} title="ממשק ופרמטרים">
        {o.parameterSummary ? <p dir="ltr" className="tech rounded-xl bg-surface-2/50 px-3 py-2.5 font-mono text-[12px] leading-relaxed text-ink-2">{o.parameterSummary}</p>
          : <p className="text-[12.5px] text-ink-3"><Info className="me-1 inline size-3.5" />רשימת פרמטרים מלאה לא תועדה כאן — עיין בהגדרת הממשק ב-SE37 ({o.technicalName}). לא ממציאים שמות פרמטרים.</p>}
        {(o.requiresSave === "yes" || o.requiresCommit === "yes") && <div className="mt-2 flex flex-wrap gap-1.5">{o.requiresSave === "yes" && <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">SAVE נדרש</span>}{o.requiresCommit === "yes" && <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">RETURN (BAPIRET2) + COMMIT</span>}</div>}
      </Section>

      {/* ===== G · EXAMPLE ===== */}
      {o.codeAbap && (
        <Section icon={<Code2 className="size-4" />} title="דוגמת ABAP בטוחה" sub="טיפול ב-BAPIRET2 · COMMIT / ROLLBACK">
          <pre dir="ltr" className="tech overflow-x-auto rounded-xl bg-ink-1 p-3.5 text-[11.5px] leading-relaxed text-white">{o.codeAbap}</pre>
        </Section>
      )}

      {/* ===== H · RELATED ===== */}
      <Section icon={<Network className="size-4" />} title="אובייקטים קשורים">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3"><Terminal className="size-3" />טרנזקציות</div><Chips items={o.transactions} hrefBase={(s) => `/tcode/${encodeURIComponent(s)}/`} /></div>
          <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3"><Table2 className="size-3" />טבלאות</div><Chips items={o.tables.slice(0, 12)} hrefBase={(s) => `/object/${encodeURIComponent(s)}/`} /></div>
          {o.relatedCds?.length ? <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3">CDS Views</div><Chips items={o.relatedCds} hrefBase={(s) => `/cds/${encodeURIComponent(s)}/`} /></div> : null}
          {o.relatedIdocs?.length ? <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3"><Cable className="size-3" />IDocs</div><Chips items={o.relatedIdocs} hrefBase={(s) => `/idoc/${encodeURIComponent(s)}/`} /></div> : null}
          {o.relatedEnhancements?.length ? <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3">BAdIs / Exits</div><Chips items={o.relatedEnhancements} /></div> : null}
          {o.authObjects?.length ? <div><div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-ink-3"><KeyRound className="size-3" />הרשאות</div><Chips items={o.authObjects} /></div> : null}
        </div>
        {related.length > 0 && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-ink-3"><Layers className="size-3" />BAPIs / FMs קשורים</div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {related.map((r) => { const rv = VERIF[r.verificationStatus]; return (
                <Link key={r.id} href={`/bapi/${encodeURIComponent(r.id)}/`} className="tap flex items-center gap-2 rounded-xl border border-hairline bg-surface p-2.5 transition hover:border-brand/40">
                  <span className={`grid size-6 shrink-0 place-items-center rounded text-white ${isBapi(r.objectType) ? "bg-brand" : "bg-ink-1"}`}><KindIcon t={r.objectType} /></span>
                  <span className="min-w-0 flex-1"><span className="tech block truncate font-mono text-[12px] font-bold text-ink-1" dir="ltr">{r.technicalName}</span><span className="block truncate text-[10.5px] text-ink-3">{r.shortDescriptionHe}</span></span>
                  <rv.Icon className={`size-3.5 shrink-0 ${rv.tone === "ok" ? "text-emerald-500" : rv.tone === "bad" ? "text-brand" : "text-ink-3"}`} />
                </Link>
              ); })}
            </div>
          </div>
        )}
        {o.processChain?.length ? <div className="mt-4"><div className="mb-1.5 text-[11px] font-bold text-ink-3">תהליך עסקי</div><div className="flex flex-wrap items-center gap-1.5">{o.processChain.map((s, i) => <span key={i} className="flex items-center gap-1.5"><span className="rounded-lg bg-surface-2 px-2 py-1 text-[11.5px] font-bold text-ink-2">{s}</span>{i < o.processChain!.length - 1 && <ArrowLeft className="size-3 text-ink-3" />}</span>)}</div></div> : null}
      </Section>

      {/* ===== checklist ===== */}
      {o.checklist?.length ? (
        <Section icon={<ListChecks className="size-4" />} title="לפני השימוש — צ׳קליסט">
          <ul className="space-y-1.5 text-[12.5px] text-ink-2">{o.checklist.map((c, i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />{c}</li>)}</ul>
        </Section>
      ) : null}

      {/* ===== I · COMMON FAILURES ===== */}
      {o.troubleshooting && (o.troubleshooting.errors?.length || o.troubleshooting.causes?.length || o.troubleshooting.debug) && (
        <Section icon={<Wrench className="size-4" />} title="כשלים נפוצים ופתרון">
          {o.troubleshooting.errors?.length ? <div className="mb-2"><div className="text-[11px] font-bold text-ink-3">שגיאות</div><ul dir="ltr" className="tech mt-1 space-y-0.5 font-mono text-[11.5px] text-ink-2">{o.troubleshooting.errors.map((e, i) => <li key={i}>{e}</li>)}</ul></div> : null}
          {o.troubleshooting.causes?.length ? <div className="mb-2"><div className="text-[11px] font-bold text-ink-3">סיבות</div><ul className="mt-1 list-inside list-disc text-[12.5px] text-ink-2">{o.troubleshooting.causes.map((c, i) => <li key={i}>{c}</li>)}</ul></div> : null}
          {o.troubleshooting.debug ? <div className="mb-2 text-[12.5px] text-ink-2"><b className="text-ink-3">דיבוג: </b>{o.troubleshooting.debug}</div> : null}
          {o.troubleshooting.tables?.length ? <div className="flex flex-wrap gap-1">{o.troubleshooting.tables.map((t) => <span key={t} dir="ltr" className="tech rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-2">{t}</span>)}</div> : null}
        </Section>
      )}

      {/* ===== J · VERIFICATION SOURCES ===== */}
      <Section id="verify" icon={<v.Icon className="size-4" />} title="מקורות ואימות (§ שקיפות)">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-surface-2/40 p-3 text-[12.5px] text-ink-2">
            <div><b className="text-ink-3">סטטוס:</b> <span className={VERIF[o.verificationStatus].tone === "ok" ? "text-emerald-600 font-bold" : ""}>{v.he}</span></div>
            <div className="mt-1"><b className="text-ink-3">רמת ודאות:</b> {o.confidence}</div>
            {o.lastVerified && <div className="mt-1"><b className="text-ink-3">אומת בתאריך:</b> {o.lastVerified}</div>}
          </div>
          <div className="rounded-xl border border-hairline bg-surface-2/40 p-3 text-[12.5px] text-ink-2">
            <div><b className="text-ink-3">מקור:</b> {o.verificationSource || "טרם צוין מקור מאומת"}</div>
            {o.qaNotes && <div className="mt-1"><b className="text-ink-3">הערות QA:</b> {o.qaNotes}</div>}
          </div>
        </div>
        {!o.verificationStatus.startsWith("verified") && o.verificationStatus !== "invalid-name" && (
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] font-semibold text-amber-700"><Info className="me-1 inline size-3.5" />חלק מהמידע טרם אומת מול מקור רשמי (SAP Help / API Business Hub). מסומן לבדיקה אנושית — לא ממציאים נתונים.</p>
        )}
      </Section>
    </div>
  );
}
