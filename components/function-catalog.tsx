"use client";

/**
 * Phase 15.2b — BAPI / Function Module intelligence catalog.
 * Reads the canonical registry (passed from the server so ALL_TABLES stays off
 * the client bundle). Strong BAPI-vs-FM visual separation, business-process
 * grouping, teaching cards, a detail drawer (side panel / mobile sheet),
 * beginner⇄expert modes, and the verified Related-Flow view.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plug, Braces, Search, X, ChevronDown, ShieldCheck, AlertTriangle, Info, Clock, ArrowLeft, Copy, Check, GitBranch, BookOpen, Boxes, Sparkles } from "lucide-react";
import type { SapFuncObject, VerificationStatus, OperationType } from "@/lib/bapi-registry";

/* ---- semantic meta ---- */
const VERIF: Record<VerificationStatus, { label: string; cls: string; Icon: typeof Info }> = {
  "verified-system": { label: "מאומת במערכת", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: ShieldCheck },
  "verified-docs": { label: "מאומת בתיעוד", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: ShieldCheck },
  "requires-verification": { label: "דורש אימות", cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: Clock },
  "version-dependent": { label: "תלוי גרסה", cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: Info },
  "internal-unsupported": { label: "פנימי · לא נתמך", cls: "bg-slate-100 text-slate-600 border-slate-200", Icon: AlertTriangle },
  "invalid-name": { label: "שם לא תקין", cls: "bg-brand-soft text-brand border-brand/30", Icon: AlertTriangle },
  "deprecated": { label: "הוחלף", cls: "bg-slate-100 text-slate-600 border-slate-200", Icon: AlertTriangle },
};
const OP_HE: Record<OperationType, string> = { Read: "קריאה", Create: "יצירה", Change: "שינוי", Delete: "מחיקה", Post: "רישום", Confirm: "דיווח", Mixed: "מעורב", Unknown: "—" };
const isBapi = (o: SapFuncObject) => o.objectType === "BAPI";

function TypeBadge({ o }: { o: SapFuncObject }) {
  return isBapi(o)
    ? <span className="inline-flex items-center gap-1 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-black text-white">BAPI</span>
    : <span className="inline-flex items-center gap-1 rounded-md bg-ink-1 px-1.5 py-0.5 text-[10px] font-black text-white">FM</span>;
}
function VerifPill({ s }: { s: VerificationStatus }) {
  const v = VERIF[s]; const Icon = v.Icon;
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${v.cls}`}><Icon className="size-3" /> {v.label}</span>;
}
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{children}</span>;
}

/* ---- teaching card ---- */
function Card({ o, onOpen }: { o: SapFuncObject; onOpen: () => void }) {
  const bapi = isBapi(o);
  return (
    <button onClick={onOpen} dir="rtl" className="card-interactive tap group relative flex h-full flex-col gap-2 overflow-hidden p-4 text-start">
      <span className="absolute inset-y-0 end-0 w-1" style={{ background: bapi ? "var(--brand)" : "var(--ink-1)" }} />
      <div className="flex items-center gap-2">
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${bapi ? "bg-brand-soft text-brand" : "bg-surface-2 text-ink-1"}`}>{bapi ? <Plug className="size-4" /> : <Braces className="size-4" />}</span>
        <span className="tech min-w-0 flex-1 truncate font-mono text-[13.5px] font-bold text-ink-1" dir="ltr">{o.technicalName}</span>
        <TypeBadge o={o} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip>{o.primaryModule}</Chip>
        {o.businessProcess && <Chip><Boxes className="size-3" /> {o.businessProcess}</Chip>}
      </div>
      <p className="line-clamp-2 text-[12.5px] leading-relaxed text-ink-2">{o.shortDescriptionHe || o.shortDescriptionEn || "—"}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        {o.operationType !== "Unknown" && <Chip>{OP_HE[o.operationType]}</Chip>}
        {o.requiresCommit === "yes" && <Chip>COMMIT</Chip>}
        <VerifPill s={o.verificationStatus} />
      </div>
    </button>
  );
}

/* ---- related flow ---- */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-1.5">
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-[10px] font-black text-brand">{i + 1}</span>
          <span className="tech rounded-md bg-surface-2 px-2 py-1 font-mono text-[11.5px] font-bold text-ink-1" dir="ltr">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---- detail drawer ---- */
function Drawer({ o, expert, onClose }: { o: SapFuncObject; expert: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    ref.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h); };
  }, [onClose]);
  const copy = () => { navigator.clipboard?.writeText(o.technicalName).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }).catch(() => {}); };
  const bapi = isBapi(o); const v = VERIF[o.verificationStatus];
  const Sec = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section className="border-t border-hairline px-5 py-4"><h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-3">{icon}{title}</h3>{children}</section>
  );
  return (
    <>
      <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={o.technicalName} dir="rtl"
        className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[92dvh] flex-col rounded-t-[1.5rem] bg-surface shadow-2xl outline-none sm:inset-y-0 sm:bottom-auto sm:end-0 sm:start-auto sm:max-h-none sm:w-[min(30rem,100vw)] sm:rounded-none sm:border-s sm:border-hairline"
        initial={reduce ? { opacity: 0 } : { y: "100%" }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 38 }}>
        {/* header */}
        <div className="shrink-0 border-b border-hairline p-5" style={{ boxShadow: `inset 0 3px 0 ${bapi ? "var(--brand)" : "var(--ink-1)"}` }}>
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-hairline sm:hidden" />
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${bapi ? "bg-brand-soft text-brand" : "bg-surface-2 text-ink-1"}`}>{bapi ? <Plug className="size-4" /> : <Braces className="size-4" />}</span>
                <TypeBadge o={o} /><Chip>{o.primaryModule}</Chip>
              </div>
              <h2 className="tech mt-2 break-all font-mono text-[17px] font-black text-ink-1" dir="ltr">{o.technicalName}</h2>
            </div>
            <button onClick={onClose} aria-label="סגור" className="tap grid size-9 shrink-0 place-items-center rounded-xl text-ink-3 hover:bg-surface-2"><X className="size-5" /></button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <VerifPill s={o.verificationStatus} />
            <button onClick={copy} className="tap inline-flex items-center gap-1 rounded-md border border-hairline px-2 py-0.5 text-[11px] font-bold text-ink-2 hover:border-brand/40">{copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />} העתק שם</button>
          </div>
          {o.verificationStatus === "invalid-name" && <p className="mt-2 rounded-lg border border-brand/25 bg-brand-soft px-3 py-2 text-[12px] font-semibold text-brand"><AlertTriangle className="me-1 inline size-3.5" />שם זה אינו אובייקט SAP סטנדרטי. ראה חלופות בהמשך.</p>}
          {!bapi && o.verificationStatus === "internal-unsupported" && <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-semibold text-slate-600"><AlertTriangle className="me-1 inline size-3.5" />Function Module טכני. ודא תמיכה, סטטוס שחרור ותופעות לוואי לפני קריאה ישירה.</p>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pb-[max(env(safe-area-inset-bottom),1rem)]">
          <Sec icon={<Info className="size-3.5" />} title="סקירה">
            <p className="text-[13.5px] leading-relaxed text-ink-1">{o.shortDescriptionHe || "—"}</p>
            {o.shortDescriptionEn && <p dir="ltr" className="mt-1 text-[12px] leading-relaxed text-ink-3">{o.shortDescriptionEn}</p>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {o.operationType !== "Unknown" && <Chip>פעולה: {OP_HE[o.operationType]}</Chip>}
              {o.businessObject && <Chip>BOR: {o.businessObject}</Chip>}
              {o.remoteEnabled === "yes" && <Chip>RFC</Chip>}
              {o.businessProcess && <Chip>{o.businessProcess}</Chip>}
            </div>
          </Sec>

          {o.sequence && o.sequence.length > 1 && (
            <Sec icon={<GitBranch className="size-3.5" />} title="רצף ביצוע (Related Flow)"><Flow steps={o.sequence} /></Sec>
          )}

          {expert && o.parameterSummary && (
            <Sec icon={<Braces className="size-3.5" />} title="פרמטרים עיקריים">
              <p dir="ltr" className="tech rounded-lg bg-surface-2 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-ink-2">{o.parameterSummary}</p>
            </Sec>
          )}

          {(o.transactions.length > 0 || o.tables.length > 0 || o.relatedObjects.length > 0) && (
            <Sec icon={<Boxes className="size-3.5" />} title="אובייקטים קשורים">
              {o.transactions.length > 0 && <div className="mb-2"><span className="text-[11px] font-bold text-ink-3">טרנזקציות: </span><span dir="ltr" className="tech font-mono text-[12px] text-ink-2">{o.transactions.join(" · ")}</span></div>}
              {o.tables.length > 0 && <div className="mb-2"><span className="text-[11px] font-bold text-ink-3">טבלאות: </span><span dir="ltr" className="tech font-mono text-[12px] text-ink-2">{o.tables.slice(0, 8).join(" · ")}</span></div>}
              {o.relatedObjects.length > 0 && <div className="flex flex-wrap gap-1"><span className="text-[11px] font-bold text-ink-3">אובייקטים: </span>{o.relatedObjects.map((r) => <span key={r} dir="ltr" className="tech rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-2">{r}</span>)}</div>}
            </Sec>
          )}

          {expert && (
            <Sec icon={<BookOpen className="size-3.5" />} title="הערות מערכת">
              <div className="grid grid-cols-3 gap-2 text-center">
                {([["ECC", o.eccSupport], ["S/4 On-Prem", o.s4OnPremSupport], ["S/4 Cloud", o.cloudSupport]] as const).map(([l, s]) => (
                  <div key={l} className="rounded-lg border border-hairline p-2">
                    <div className="text-[10px] font-bold text-ink-3">{l}</div>
                    <div className={`text-[12px] font-extrabold ${s === "yes" ? "text-emerald-600" : s === "no" ? "text-brand" : "text-ink-3"}`}>{s === "yes" ? "נתמך" : s === "no" ? "לא" : "לא ידוע"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {o.requiresSave === "yes" && <Chip>דורש SAVE</Chip>}
                {o.requiresCommit === "yes" && <Chip>דורש COMMIT</Chip>}
                {o.releasedStatus && <Chip>{o.releasedStatus}</Chip>}
              </div>
            </Sec>
          )}

          {o.qaNotes && (
            <Sec icon={<AlertTriangle className="size-3.5" />} title="בדיקות ואזהרות (QA)"><p className="text-[12.5px] leading-relaxed text-ink-2">{o.qaNotes}</p></Sec>
          )}

          <Sec icon={<v.Icon className="size-3.5" />} title="מקור ואימות">
            <div className="flex flex-col gap-1 text-[12px] text-ink-2">
              <div><b className="text-ink-3">סטטוס:</b> {v.label}</div>
              {o.verificationSource && <div><b className="text-ink-3">מקור:</b> {o.verificationSource}</div>}
              {o.lastVerified && <div><b className="text-ink-3">אומת לאחרונה:</b> {o.lastVerified}</div>}
              <div><b className="text-ink-3">רמת ודאות:</b> {o.confidence}</div>
            </div>
          </Sec>
        </div>
      </motion.div>
    </>
  );
}

/* ---- learn-the-difference panel ---- */
function LearnPanel() {
  const [open, setOpen] = useState(false);
  const col = (title: string, tint: string, Icon: typeof Plug, rows: string[]) => (
    <div className="flex-1 rounded-2xl border border-hairline p-4">
      <div className="mb-2 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg text-white" style={{ background: tint }}><Icon className="size-4" /></span><b className="text-[15px] font-extrabold text-ink-1">{title}</b></div>
      <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-ink-2">{rows.map((r, i) => <li key={i} className="flex gap-1.5"><span className="mt-2 size-1 shrink-0 rounded-full bg-ink-3" />{r}</li>)}</ul>
    </div>
  );
  return (
    <div className="rounded-2xl border border-hairline bg-surface">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="tap flex w-full items-center gap-2 p-4 text-start">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Sparkles className="size-5" /></span>
        <span className="min-w-0 flex-1"><span className="block text-[14px] font-extrabold text-ink-1">מה ההבדל בין BAPI ל-Function Module?</span><span className="block text-[12px] text-ink-3">הסבר קצר וכשמתי — לחצו לפתיחה</span></span>
        <ChevronDown className={`size-5 text-ink-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-3 border-t border-hairline p-4 sm:flex-row">
          {col("BAPI", "var(--brand)", Plug, ["ממשק עסקי יציב, קשור לאובייקט עסקי SAP (BOR).", "מיועד לאינטגרציה מבוקרת וגישה חיצונית.", "בדרך כלל עוקב אחר טרנזקציה עסקית מוגדרת.", "לרוב דורש SAVE ואז COMMIT (BAPI_TRANSACTION_COMMIT).", "יש לאמת תמיכה, שחרור ותאימות גרסה."])}
          {col("Function Module", "var(--ink-1)", Braces, ["פונקציית ABAP לשימוש חוזר.", "עשוי להיות Remote-Enabled, פנימי או Update.", "לא כל FM הוא ממשק אינטגרציה נתמך.", "חלק מה-FM הפנימיים אין לקרוא ישירות.", "התנהגות וזמינות עשויות להשתנות בין ECC ל-S/4HANA."])}
        </div>
      )}
    </div>
  );
}

/* ---- main catalog ---- */
export function FunctionCatalog({ objects, moduleLabel }: { objects: SapFuncObject[]; moduleLabel?: string }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "BAPI" | "FM">("all");
  const [verif, setVerif] = useState<"all" | "verified" | "needs">("all");
  const [expert, setExpert] = useState(false);
  const [sel, setSel] = useState<SapFuncObject | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return objects.filter((o) => {
      if (type !== "all" && (type === "BAPI" ? !isBapi(o) : isBapi(o))) return false;
      if (verif === "verified" && !o.verificationStatus.startsWith("verified")) return false;
      if (verif === "needs" && o.verificationStatus.startsWith("verified")) return false;
      if (!s) return true;
      return (o.technicalName + " " + o.shortDescriptionHe + " " + o.shortDescriptionEn + " " + o.businessProcess + " " + o.keywords.join(" ") + " " + o.transactions.join(" ")).toLowerCase().includes(s);
    });
  }, [objects, q, type, verif]);

  // group: BAPI then FM, each by business process
  const groups = useMemo(() => {
    const mk = (kind: "BAPI" | "FM") => {
      const list = filtered.filter((o) => (kind === "BAPI" ? isBapi(o) : !isBapi(o)));
      const byProc = new Map<string, SapFuncObject[]>();
      for (const o of list) { const p = o.businessProcess || "כללי"; (byProc.get(p) || byProc.set(p, []).get(p)!).push(o); }
      return { kind, count: list.length, procs: [...byProc.entries()].sort((a, b) => b[1].length - a[1].length) };
    };
    return [mk("BAPI"), mk("FM")];
  }, [filtered]);

  const F = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} className={`tap shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-bold transition ${active ? "border-brand bg-brand text-white" : "border-hairline bg-surface text-ink-3 hover:bg-surface-2"}`}>{children}</button>
  );

  return (
    <div className="space-y-5" dir="rtl">
      <LearnPanel />

      {/* search + filters (sticky) */}
      <div className="sticky top-14 z-30 -mx-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2.5 shadow-sm backdrop-blur-md sm:mx-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-ink-3" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש שם · תיאור · תהליך · טרנזקציה…" className="w-full rounded-xl border border-hairline bg-surface py-2 pe-3 ps-9 text-[14px] outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            {q && <button onClick={() => setQ("")} aria-label="נקה" className="absolute inset-y-0 start-3 my-auto"><X className="size-4 text-ink-3" /></button>}
          </div>
          <div className="chip-rail flex gap-1.5 overflow-x-auto pb-0.5">
            <F active={type === "all"} onClick={() => setType("all")}>הכל</F>
            <F active={type === "BAPI"} onClick={() => setType("BAPI")}>BAPI</F>
            <F active={type === "FM"} onClick={() => setType("FM")}>FM</F>
            <span className="mx-0.5 w-px bg-hairline" />
            <F active={verif === "verified"} onClick={() => setVerif(verif === "verified" ? "all" : "verified")}>מאומת</F>
            <F active={verif === "needs"} onClick={() => setVerif(verif === "needs" ? "all" : "needs")}>דורש אימות</F>
            <span className="mx-0.5 w-px bg-hairline" />
            <F active={expert} onClick={() => setExpert((v) => !v)}>{expert ? "מצב מומחה" : "מצב מתחיל"}</F>
          </div>
        </div>
        <p className="mt-1.5 text-[11.5px] font-semibold text-ink-3">{filtered.length} תוצאות{moduleLabel ? ` · ${moduleLabel}` : ""}</p>
      </div>

      {groups.map((g) => g.count > 0 && (
        <section key={g.kind} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`grid size-8 place-items-center rounded-lg text-white ${g.kind === "BAPI" ? "bg-brand" : "bg-ink-1"}`}>{g.kind === "BAPI" ? <Plug className="size-4" /> : <Braces className="size-4" />}</span>
            <h2 className="font-display text-lg text-ink-1">{g.kind === "BAPI" ? "BAPIs — ממשקים עסקיים" : "Function Modules — פונקציות טכניות"}</h2>
            <span className="text-[12px] font-bold text-ink-3">· {g.count}</span>
          </div>
          {g.procs.map(([proc, list]) => (
            <div key={proc} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-1 rounded-full" style={{ background: g.kind === "BAPI" ? "var(--brand)" : "var(--ink-1)" }} />
                <h3 className="text-[12.5px] font-extrabold text-ink-2">{proc}</h3>
                <span className="text-[11px] text-ink-3">· {list.length}</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <div className="grid-adaptive-sm">
                {list.map((o) => <Card key={o.id} o={o} onOpen={() => setSel(o)} />)}
              </div>
            </div>
          ))}
        </section>
      ))}

      {filtered.length === 0 && <p className="py-16 text-center text-[14px] text-ink-3">לא נמצאו אובייקטים תואמים.</p>}

      <AnimatePresence>{sel && <Drawer o={sel} expert={expert} onClose={() => setSel(null)} />}</AnimatePresence>
    </div>
  );
}
