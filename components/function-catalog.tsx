"use client";

/**
 * Phase 15.2b — BAPI / Function Module intelligence catalog.
 * Reads the canonical registry (passed from the server so ALL_TABLES stays off
 * the client bundle). Strong BAPI-vs-FM visual separation, business-process
 * grouping, teaching cards, a detail drawer (side panel / mobile sheet),
 * beginner⇄expert modes, and the verified Related-Flow view.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plug, Braces, Search, X, ChevronDown, ShieldCheck, AlertTriangle, Info, Clock, ArrowLeft, Copy, Check, GitBranch, BookOpen, Boxes, Sparkles, Star, ListChecks, Wrench, Code2, GraduationCap, Lightbulb, Link2, Pin, NotebookPen, Server, Globe, FileJson, Terminal, RotateCcw, PackageOpen, SearchX } from "lucide-react";
import type { SapFuncObject, VerificationStatus, OperationType, BusinessCategory, Difficulty, Stability } from "@/lib/bapi-registry";

const CAT: Record<BusinessCategory, { he: string; c: string }> = {
  BusinessAPI: { he: "ממשק עסקי", c: "#2563eb" }, MasterData: { he: "נתוני אב", c: "#16a34a" }, Planning: { he: "תכנון", c: "#6d28d9" },
  Execution: { he: "ביצוע", c: "#ea580c" }, Notification: { he: "הודעות", c: "#d62027" }, Equipment: { he: "ציוד", c: "#0891b2" },
  Reservation: { he: "הזמנות", c: "#92400e" }, Confirmation: { he: "דיווחים", c: "#0d9488" }, GoodsMovement: { he: "תנועות סחורה", c: "#ca8a04" },
  Batch: { he: "אצוות", c: "#7c3aed" }, BOM: { he: "עצי מוצר", c: "#0284c7" }, Status: { he: "סטטוס", c: "#475569" },
  TransactionControl: { he: "בקרת LUW", c: "#334155" }, Analytics: { he: "אנליטיקה", c: "#6b7280" }, General: { he: "כללי", c: "#64748b" },
};
const DIFF: Record<Difficulty, { he: string; cls: string }> = {
  Beginner: { he: "מתחיל", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }, Intermediate: { he: "בינוני", cls: "bg-sky-50 text-sky-700 border-sky-200" },
  Advanced: { he: "מתקדם", cls: "bg-amber-50 text-amber-700 border-amber-200" }, Expert: { he: "מומחה", cls: "bg-brand-soft text-brand border-brand/30" },
};
const STAB: Record<Stability, { he: string; cls: string }> = {
  Released: { he: "Released API", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }, "SAP-Recommended": { he: "מומלץ SAP", cls: "bg-sky-50 text-sky-700 border-sky-200" },
  Internal: { he: "FM פנימי", cls: "bg-slate-100 text-slate-600 border-slate-200" }, "Use-With-Caution": { he: "בזהירות", cls: "bg-amber-50 text-amber-700 border-amber-200" }, Obsolete: { he: "מיושן", cls: "bg-brand-soft text-brand border-brand/30" },
};

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

// §28 — consultant personal layer: favorites + pinned + mark-learned + private notes.
// All client-only (localStorage), SSR-safe (hydrated in effect). Never leaves the browser.
function useObjState() {
  const [fav, setFav] = useState<Set<string>>(new Set());
  const [pin, setPin] = useState<Set<string>>(new Set());
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  useEffect(() => {
    try { setFav(new Set(JSON.parse(localStorage.getItem("neo:bapi:fav") || "[]"))); } catch { /* noop */ }
    try { setPin(new Set(JSON.parse(localStorage.getItem("neo:bapi:pin") || "[]"))); } catch { /* noop */ }
    try { setLearned(new Set(JSON.parse(localStorage.getItem("neo:bapi:learned") || "[]"))); } catch { /* noop */ }
    try { setNotes(JSON.parse(localStorage.getItem("neo:bapi:notes") || "{}")); } catch { /* noop */ }
  }, []);
  const mkToggle = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, key: string) => (id: string) =>
    setter((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); try { localStorage.setItem(key, JSON.stringify([...n])); } catch { /* noop */ } return n; });
  const setNote = (id: string, v: string) => setNotes((p) => {
    const n = { ...p }; const t = v.trim(); if (t) n[id] = v; else delete n[id];
    try { localStorage.setItem("neo:bapi:notes", JSON.stringify(n)); } catch { /* noop */ } return n;
  });
  return {
    fav, pin, learned, notes,
    toggleFav: mkToggle(setFav, "neo:bapi:fav"),
    togglePin: mkToggle(setPin, "neo:bapi:pin"),
    toggleLearned: mkToggle(setLearned, "neo:bapi:learned"),
    setNote,
  };
}

/* ---- teaching card ---- */
function Card({ o, onOpen, faved, pinned, learned, onFav, onPin }: { o: SapFuncObject; onOpen: () => void; faved: boolean; pinned: boolean; learned: boolean; onFav: () => void; onPin: () => void }) {
  const bapi = isBapi(o); const cat = CAT[o.category]; const reduce = useReducedMotion();
  return (
    <motion.button
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      whileHover={reduce ? undefined : { y: -3 }} whileTap={{ scale: 0.985 }}
      onClick={onOpen} dir="rtl"
      className={`card-interactive tap group relative flex h-full flex-col gap-2 overflow-hidden p-4 text-start ${pinned ? "ring-1 ring-brand/30" : ""}`}>
      <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: cat.c }} />
      <div className="absolute start-2 top-2 flex flex-col gap-0.5">
        <span role="button" tabIndex={0} aria-label={faved ? "הסר ממועדפים" : "הוסף למועדפים"} aria-pressed={faved}
          onClick={(e) => { e.stopPropagation(); onFav(); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); e.preventDefault(); onFav(); } }}
          className="tap grid size-7 place-items-center rounded-lg text-ink-3 hover:bg-surface-2">
          <Star className={`size-4 ${faved ? "fill-amber-400 text-amber-400" : ""}`} />
        </span>
        <span role="button" tabIndex={0} aria-label={pinned ? "בטל נעיצה" : "נעץ"} aria-pressed={pinned}
          onClick={(e) => { e.stopPropagation(); onPin(); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); e.preventDefault(); onPin(); } }}
          className={`tap grid size-7 place-items-center rounded-lg hover:bg-surface-2 ${pinned ? "text-brand" : "text-ink-3 opacity-0 focus:opacity-100 group-hover:opacity-100"}`}>
          <Pin className={`size-3.5 ${pinned ? "fill-brand" : ""}`} />
        </span>
      </div>
      <div className="flex items-center gap-2 pe-7">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: cat.c }}>{bapi ? <Plug className="size-4" /> : <Braces className="size-4" />}</span>
        <span className="tech min-w-0 flex-1 truncate font-mono text-[13.5px] font-bold text-ink-1" dir="ltr">{o.technicalName}</span>
        <TypeBadge o={o} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-bold text-white" style={{ background: cat.c }}>{cat.he}</span>
        <Chip>{o.primaryModule}</Chip>
        {learned && <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10.5px] font-bold text-emerald-700"><GraduationCap className="size-3" />נלמד</span>}
      </div>
      <p className="line-clamp-2 text-[12.5px] leading-relaxed text-ink-2">{o.shortDescriptionHe || o.shortDescriptionEn || "—"}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${DIFF[o.difficulty].cls}`}>{DIFF[o.difficulty].he}</span>
        {o.requiresCommit === "yes" && <Chip>COMMIT</Chip>}
        <VerifPill s={o.verificationStatus} />
      </div>
    </motion.button>
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

/* ---- knowledge graph (§29) — object at center, clickable relationship nodes ---- */
function KnowledgeGraph({ o, resolve, onOpen }: { o: SapFuncObject; resolve: (id: string) => SapFuncObject | undefined; onOpen: (x: SapFuncObject) => void }) {
  type N = { label: string; full: string; c: string; href?: string; open?: () => void };
  const short = (s: string) => (s.length > 12 ? "…" + s.slice(-11) : s);
  const nodes: N[] = [];
  o.relatedObjects.slice(0, 4).forEach((id) => { const r = resolve(id); nodes.push({ label: short(id), full: id, c: "#d62027", open: r ? () => onOpen(r) : undefined, href: r ? undefined : `/bapi/${encodeURIComponent(id)}/` }); });
  o.tables.slice(0, 3).forEach((t) => nodes.push({ label: t, full: t, c: "#16a34a", href: `/object/${encodeURIComponent(t)}/` }));
  o.transactions.slice(0, 3).forEach((c) => nodes.push({ label: c, full: c, c: "#0284c7", href: `/tcode/${encodeURIComponent(c)}/` }));
  if (o.businessObject) nodes.push({ label: o.businessObject, full: `BOR ${o.businessObject}`, c: "#6d28d9" });
  (o.relatedCds || []).slice(0, 2).forEach((v) => nodes.push({ label: short(v), full: v, c: "#ca8a04", href: `/cds/${encodeURIComponent(v)}/` }));
  const n = Math.max(1, nodes.length); const cx = 160, cy = 150, R = 120;
  return (
    <div>
      <svg viewBox="0 0 320 290" className="w-full" role="img" aria-label={`מפת קשרים של ${o.technicalName}`}>
        {nodes.map((_, i) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return <line key={"l" + i} x1={cx} y1={cy} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)} stroke="var(--hairline)" strokeWidth="1.5" />; })}
        <g><rect x={cx - 54} y={cy - 16} width="108" height="32" rx="8" fill="var(--ink-1)" /><text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="monospace">{short(o.technicalName)}</text></g>
        {nodes.map((nd, i) => {
          const a = (i / n) * 2 * Math.PI - Math.PI / 2; const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          const inner = <><rect x={x - 33} y={y - 12} width="66" height="24" rx="7" fill="#fff" stroke={nd.c} strokeWidth="1.5" /><text x={x} y={y + 3.5} textAnchor="middle" fontSize="8" fontWeight="700" fill={nd.c} fontFamily="monospace">{nd.label}</text></>;
          return nd.href
            ? <a key={i} href={nd.href} aria-label={nd.full}><title>{nd.full}</title>{inner}</a>
            : <g key={i} role={nd.open ? "button" : undefined} tabIndex={nd.open ? 0 : undefined} onClick={nd.open} onKeyDown={(e) => { if (nd.open && (e.key === "Enter" || e.key === " ")) nd.open(); }} style={{ cursor: nd.open ? "pointer" : "default" }}><title>{nd.full}</title>{inner}</g>;
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 text-[10px] font-bold text-ink-3">
        <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-brand" /> BAPI/FM</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: "#16a34a" }} /> טבלאות</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: "#0284c7" }} /> טרנזקציות</span>
        <span className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: "#6d28d9" }} /> BOR</span>
      </div>
    </div>
  );
}

/* ---- §16 multi-protocol code examples ---- */
// Honest by construction: the ABAP tab shows the verified skeleton when curated;
// RFC/JSON/OData tabs show the correct CALL SHAPE plus an accurate caveat, because
// classic BAPIs/FMs are NOT native REST/OData services — they must be exposed via
// RAP / SEGW / SICF, or a Released S/4 API used instead. No endpoint is presented
// as if it exists out of the box.
type Snippet = { key: string; label: string; Icon: typeof Code2; code: string; note?: string; verified: boolean };
function buildSnippets(o: SapFuncObject): Snippet[] {
  const name = o.technicalName;
  const bapi = isBapi(o);
  const commit = o.requiresCommit === "yes" || bapi;
  const out: Snippet[] = [];
  out.push({
    key: "abap", label: "ABAP", Icon: Code2, verified: !!o.codeAbap,
    code: o.codeAbap || `DATA lt_return TYPE STANDARD TABLE OF bapiret2.\n\nCALL FUNCTION '${name}'\n*  EXPORTING\n*    ...    = ...        " השלם פרמטרים מ-SE37\n  TABLES\n    return = lt_return.${commit ? `\n\nCALL FUNCTION 'BAPI_TRANSACTION_COMMIT'\n  EXPORTING wait = 'X'.` : ""}`,
    note: o.codeAbap ? "שלד מאומת מול מבנה הממשק שתועד." : "שלד כללי — אמת שמות/סוגי הפרמטרים ב-SE37 לפני שימוש.",
  });
  if (bapi || o.remoteEnabled === "yes") out.push({
    key: "rfc", label: "RFC · JCo", Icon: Server, verified: false,
    code: `// SAP JCo (Java) — קריאת RFC סינכרונית\nJCoFunction fn = destination.getRepository().getFunction("${name}");\n// fn.getImportParameterList().setValue("...", ...);  // פרמטרים כמו ב-SE37\nfn.execute(destination);\nJCoTable ret = fn.getTableParameterList().getTable("RETURN");${commit ? `\n\n// לאחר הצלחה — אשר את ה-LUW\ndestination.getRepository().getFunction("BAPI_TRANSACTION_COMMIT").execute(destination);` : ""}`,
    note: "שמות הפרמטרים זהים לממשק ה-ABAP. דורש הרשאת S_RFC + יעד JCo מוגדר.",
  });
  out.push({
    key: "json", label: "REST · JSON", Icon: FileJson, verified: false,
    code: `POST /sap/bc/rest/z_${name.toLowerCase()}   // נקודת קצה מותאמת (SICF)\nContent-Type: application/json\n\n{\n  // גוף הבקשה משקף את פרמטרי ה-Import של ${name}\n  "import": { /* ... */ },\n  "return": []\n}`,
    note: bapi
      ? "BAPI קלאסי אינו שירות REST כברירת מחדל. חשוף דרך RAP / SEGW / handler ב-SICF, או השתמש ב-Released OData API של S/4HANA."
      : "FM אינו נחשף כ-REST ישירות. עטוף בשירות (RAP/SEGW) ואמת שהוא Remote-Enabled.",
  });
  out.push({
    key: "odata", label: "OData", Icon: Globe, verified: false,
    code: `GET /sap/opu/odata/sap/Z_${(o.businessObject || "SRV")}_SRV/Set?$top=20\nAccept: application/json\n\n// כתיבה:\nPOST /sap/opu/odata/sap/Z_${(o.businessObject || "SRV")}_SRV/Set\n{ /* מיפוי מהפרמטרים העסקיים של ${name} */ }`,
    note: "אין שירות OData סטנדרטי לאובייקט זה מחוץ לקופסה. בנה Service ב-SEGW/RAP הממפה ל-" + name + ", או בדוק Released API ב-SAP API Business Hub.",
  });
  return out;
}
function CodeTabs({ snippets }: { snippets: Snippet[] }) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const s = snippets[Math.min(i, snippets.length - 1)];
  const copy = () => { navigator.clipboard?.writeText(s.code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }).catch(() => {}); };
  return (
    <div>
      <div className="chip-rail mb-2 flex gap-1.5 overflow-x-auto">
        {snippets.map((sn, k) => { const A = sn.Icon; return (
          <button key={sn.key} onClick={() => { setI(k); setCopied(false); }} aria-pressed={k === i} className={`tap inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-bold transition ${k === i ? "border-brand bg-brand text-white" : "border-hairline bg-surface text-ink-3 hover:bg-surface-2"}`}><A className="size-3" />{sn.label}</button>
        ); })}
      </div>
      <div className="relative">
        <button onClick={copy} aria-label="העתק קוד" className="tap absolute start-2 top-2 z-10 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10.5px] font-bold text-white backdrop-blur transition hover:bg-white/20">{copied ? <Check className="size-3 text-emerald-300" /> : <Copy className="size-3" />}{copied ? "הועתק" : "העתק"}</button>
        <pre dir="ltr" className="tech max-h-80 overflow-auto rounded-lg bg-ink-1 p-3 text-[11px] leading-relaxed text-white">{s.code}</pre>
      </div>
      <p className={`mt-2 flex items-start gap-1.5 rounded-lg px-3 py-2 text-[11.5px] font-semibold ${s.verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
        {s.verified ? <ShieldCheck className="mt-0.5 size-3.5 shrink-0" /> : <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />}
        {s.note}
      </p>
    </div>
  );
}

/* ---- detail drawer ---- */
function Drawer({ o, expert, related, faved, pinned, learned, note, objects, onFav, onPin, onLearned, onNote, onOpen, onClose }: { o: SapFuncObject; expert: boolean; related: SapFuncObject[]; faved: boolean; pinned: boolean; learned: boolean; note: string; objects: SapFuncObject[]; onFav: () => void; onPin: () => void; onLearned: () => void; onNote: (v: string) => void; onOpen: (x: SapFuncObject) => void; onClose: () => void }) {
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
  const stepKw: Partial<Record<BusinessCategory, string>> = { Notification: "הודעה", Execution: "פקודת", Confirmation: "דיווח", GoodsMovement: "סחורה", Planning: "תכנון", Reservation: "הזמנ" };
  const curIdx = o.processChain?.findIndex((s) => { const k = stepKw[o.category]; return !!k && s.includes(k); }) ?? -1;
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
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-bold text-white" style={{ background: CAT[o.category].c }}>{CAT[o.category].he}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${DIFF[o.difficulty].cls}`}>{DIFF[o.difficulty].he}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${STAB[o.stability].cls}`}>{STAB[o.stability].he}</span>
            <VerifPill s={o.verificationStatus} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button onClick={onFav} aria-pressed={faved} className="tap inline-flex items-center gap-1 rounded-md border border-hairline px-2 py-0.5 text-[11px] font-bold text-ink-2 hover:border-brand/40"><Star className={`size-3 ${faved ? "fill-amber-400 text-amber-400" : ""}`} /> {faved ? "במועדפים" : "מועדפים"}</button>
            <button onClick={onPin} aria-pressed={pinned} className={`tap inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold hover:border-brand/40 ${pinned ? "border-brand/40 bg-brand-soft text-brand" : "border-hairline text-ink-2"}`}><Pin className={`size-3 ${pinned ? "fill-brand" : ""}`} /> {pinned ? "נעוץ" : "נעץ"}</button>
            <button onClick={onLearned} aria-pressed={learned} className={`tap inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold hover:border-emerald-300 ${learned ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-hairline text-ink-2"}`}><GraduationCap className="size-3" /> {learned ? "נלמד" : "סמן כנלמד"}</button>
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

          {/* §28 — private consultant notes (localStorage, never leaves the browser) */}
          <Sec icon={<NotebookPen className="size-3.5" />} title="הערות אישיות">
            <textarea value={note} onChange={(e) => onNote(e.target.value)} rows={note ? 4 : 2} dir="rtl"
              placeholder="רשום כאן טיפים, מלכודות או תזכורות משלך לאובייקט הזה…"
              className="w-full resize-y rounded-lg border border-hairline bg-surface-2/50 p-2.5 text-[12.5px] leading-relaxed text-ink-1 outline-none placeholder:text-ink-3 focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            <p className="mt-1 text-[10.5px] text-ink-3">נשמר מקומית בדפדפן בלבד · פרטי</p>
          </Sec>

          {o.sequence && o.sequence.length > 1 && (
            <Sec icon={<GitBranch className="size-3.5" />} title="רצף ביצוע (Related Flow)"><Flow steps={o.sequence} /></Sec>
          )}

          {(o.businessScenario || o.usageContexts?.length || o.commonMistakes?.length || o.recommendedReading?.length) && (
            <Sec icon={<Lightbulb className="size-3.5" />} title="תובנות יישום (Implementation Insights)">
              {o.businessScenario && <p className="mb-2 text-[13px] leading-relaxed text-ink-1">{o.businessScenario}</p>}
              {o.usageContexts?.length ? <div className="mb-2"><div className="mb-1 text-[11px] font-bold text-ink-3">שימוש טיפוסי</div><div className="flex flex-wrap gap-1">{o.usageContexts.map((u) => <Chip key={u}>{u}</Chip>)}</div></div> : null}
              {o.commonMistakes?.length ? <div className="mb-2"><div className="mb-1 text-[11px] font-bold text-ink-3">טעויות נפוצות</div><ul className="space-y-1 text-[12.5px] text-ink-2">{o.commonMistakes.map((m, i) => <li key={i} className="flex gap-1.5"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />{m}</li>)}</ul></div> : null}
              {o.recommendedReading?.length ? <div className="flex flex-wrap items-center gap-1"><span className="text-[11px] font-bold text-ink-3">קריאה מומלצת:</span>{o.recommendedReading.map((r) => <Chip key={r}><BookOpen className="size-3" />{r}</Chip>)}</div> : null}
            </Sec>
          )}

          {o.processChain?.length ? (
            <Sec icon={<GitBranch className="size-3.5" />} title="תהליך עסקי (Business Process)">
              <div className="flex flex-wrap items-center gap-1.5">
                {o.processChain.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className={`rounded-lg px-2 py-1 text-[11.5px] font-bold ${i === curIdx ? "bg-brand text-white shadow-sm" : "bg-surface-2 text-ink-2"}`}>{s}</span>
                    {i < o.processChain!.length - 1 && <ArrowLeft className="size-3 text-ink-3" />}
                  </span>
                ))}
              </div>
            </Sec>
          ) : null}

          {o.checklist?.length ? (
            <Sec icon={<ListChecks className="size-3.5" />} title="לפני השימוש — צ׳קליסט">
              <ul className="space-y-1.5 text-[12.5px] text-ink-2">{o.checklist.map((c, i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />{c}</li>)}</ul>
            </Sec>
          ) : null}

          {o.troubleshooting && (o.troubleshooting.errors?.length || o.troubleshooting.causes?.length || o.troubleshooting.debug) ? (
            <Sec icon={<Wrench className="size-3.5" />} title="פתרון תקלות (Troubleshooting)">
              {o.troubleshooting.errors?.length ? <div className="mb-2"><div className="text-[11px] font-bold text-ink-3">שגיאות נפוצות</div><ul dir="ltr" className="tech mt-1 space-y-0.5 font-mono text-[11.5px] text-ink-2">{o.troubleshooting.errors.map((e, i) => <li key={i}>{e}</li>)}</ul></div> : null}
              {o.troubleshooting.causes?.length ? <div className="mb-2"><div className="text-[11px] font-bold text-ink-3">סיבות שכיחות</div><ul className="mt-1 list-inside list-disc text-[12.5px] text-ink-2">{o.troubleshooting.causes.map((c, i) => <li key={i}>{c}</li>)}</ul></div> : null}
              {o.troubleshooting.debug ? <div className="mb-2 text-[12.5px] text-ink-2"><b className="text-ink-3">דיבוג: </b>{o.troubleshooting.debug}</div> : null}
              {o.troubleshooting.notes?.length ? <div className="flex flex-wrap gap-1">{o.troubleshooting.notes.map((n, i) => <Chip key={i}>{n}</Chip>)}</div> : null}
            </Sec>
          ) : null}

          {expert ? (
            <Sec icon={<Terminal className="size-3.5" />} title="דוגמאות קוד לפי פרוטוקול">
              <CodeTabs snippets={buildSnippets(o)} />
            </Sec>
          ) : null}

          {(o.relatedObjects.length || o.tables.length || o.transactions.length || o.businessObject) ? (
            <Sec icon={<Link2 className="size-3.5" />} title="מפת קשרים (Knowledge Graph)">
              <KnowledgeGraph o={o} resolve={(id) => objects.find((x) => x.id === id)} onOpen={onOpen} />
            </Sec>
          ) : null}

          {related.length ? (
            <Sec icon={<Link2 className="size-3.5" />} title="אובייקטים קשורים (מומלץ)">
              <div className="flex flex-col gap-1.5">
                {related.map((r) => (
                  <button key={r.id} onClick={() => onOpen(r)} className="tap flex items-center gap-2 rounded-lg border border-hairline p-2 text-start transition hover:border-brand/40">
                    <span className="grid size-6 shrink-0 place-items-center rounded text-white" style={{ background: CAT[r.category].c }}>{isBapi(r) ? <Plug className="size-3.5" /> : <Braces className="size-3.5" />}</span>
                    <span className="tech min-w-0 flex-1 truncate font-mono text-[12px] font-bold text-ink-1" dir="ltr">{r.technicalName}</span>
                    <span className="text-[10px] text-ink-3">{r.primaryModule}</span>
                  </button>
                ))}
              </div>
            </Sec>
          ) : null}

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
type SortKey = "alpha" | "process" | "verified" | "commit";
const inMod = (o: SapFuncObject, m: string) => m === "all" || o.primaryModule === m || o.secondaryModules.includes(m as never) || (m === "cross" && (o.secondaryModules.length > 0 || o.primaryModule === "Basis" || o.primaryModule === "Cross-Application"));

export function FunctionCatalog({ objects, moduleLabel, gateways = false }: { objects: SapFuncObject[]; moduleLabel?: string; gateways?: boolean }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "BAPI" | "FM">("all");
  const [verif, setVerif] = useState<"all" | "verified" | "needs">("all");
  const [mod, setMod] = useState<string>("all");
  const [op, setOp] = useState<"all" | OperationType>("all");
  const [commitOnly, setCommitOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("alpha");
  const [expert, setExpert] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [pinOnly, setPinOnly] = useState(false);
  const [learn, setLearn] = useState<"all" | "learned" | "unlearned">("all");
  const [sel, setSel] = useState<SapFuncObject | null>(null);
  const { fav, pin, learned, notes, toggleFav, togglePin, toggleLearned, setNote } = useObjState();
  const resetFilters = () => { setQ(""); setType("all"); setVerif("all"); setMod("all"); setOp("all"); setCommitOnly(false); setFavOnly(false); setPinOnly(false); setLearn("all"); };
  const anyFilter = !!q || type !== "all" || verif !== "all" || mod !== "all" || op !== "all" || commitOnly || favOnly || pinOnly || learn !== "all";

  const mods = useMemo(() => [...new Set(objects.flatMap((o) => [o.primaryModule, ...o.secondaryModules]))], [objects]);
  const related = useMemo(() => {
    if (!sel) return [];
    const score = (o: SapFuncObject) => {
      if (o.id === sel.id) return 0;
      let s = 0;
      if (sel.relatedObjects.includes(o.id)) s += 6;
      if (o.businessProcess && o.businessProcess === sel.businessProcess) s += 3;
      if (o.category === sel.category) s += 2;
      if (o.tables.some((t) => sel.tables.includes(t))) s += 1;
      if (o.verificationStatus.startsWith("verified")) s += 1;
      return s;
    };
    return objects.map((o) => [o, score(o)] as const).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([o]) => o);
  }, [sel, objects]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return objects.filter((o) => {
      if (type !== "all" && (type === "BAPI" ? !isBapi(o) : isBapi(o))) return false;
      if (verif === "verified" && !o.verificationStatus.startsWith("verified")) return false;
      if (verif === "needs" && o.verificationStatus.startsWith("verified")) return false;
      if (!inMod(o, mod)) return false;
      if (op !== "all" && o.operationType !== op) return false;
      if (commitOnly && o.requiresCommit !== "yes") return false;
      if (favOnly && !fav.has(o.id)) return false;
      if (pinOnly && !pin.has(o.id)) return false;
      if (learn === "learned" && !learned.has(o.id)) return false;
      if (learn === "unlearned" && learned.has(o.id)) return false;
      if (!s) return true;
      return (o.technicalName + " " + o.shortDescriptionHe + " " + o.shortDescriptionEn + " " + o.businessProcess + " " + o.keywords.join(" ") + " " + o.transactions.join(" ")).toLowerCase().includes(s);
    });
  }, [objects, q, type, verif, mod, op, commitOnly, favOnly, pinOnly, learn, fav, pin, learned]);

  const cmp = useMemo(() => {
    const vRank = (o: SapFuncObject) => (o.verificationStatus.startsWith("verified") ? 0 : o.verificationStatus === "invalid-name" ? 2 : 1);
    return (a: SapFuncObject, b: SapFuncObject) =>
      sort === "verified" ? vRank(a) - vRank(b) || a.technicalName.localeCompare(b.technicalName)
        : sort === "commit" ? (b.requiresCommit === "yes" ? 1 : 0) - (a.requiresCommit === "yes" ? 1 : 0) || a.technicalName.localeCompare(b.technicalName)
          : sort === "process" ? (a.businessProcess || "~").localeCompare(b.businessProcess || "~") || a.technicalName.localeCompare(b.technicalName)
            : a.technicalName.localeCompare(b.technicalName);
  }, [sort]);

  // group: BAPI then FM, each by business process
  const groups = useMemo(() => {
    const mk = (kind: "BAPI" | "FM") => {
      const list = filtered.filter((o) => (kind === "BAPI" ? isBapi(o) : !isBapi(o)));
      const byProc = new Map<string, SapFuncObject[]>();
      for (const o of list) { const p = o.businessProcess || "כללי"; (byProc.get(p) || byProc.set(p, []).get(p)!).push(o); }
      for (const arr of byProc.values()) arr.sort((a, b) => (pin.has(b.id) ? 1 : 0) - (pin.has(a.id) ? 1 : 0) || cmp(a, b));
      return { kind, count: list.length, procs: [...byProc.entries()].sort((a, b) => b[1].length - a[1].length) };
    };
    return [mk("BAPI"), mk("FM")];
  }, [filtered, cmp, pin]);

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
            <F active={favOnly} onClick={() => setFavOnly((v) => !v)}>★ מועדפים</F>
            <F active={pinOnly} onClick={() => setPinOnly((v) => !v)}>נעוצים</F>
            <F active={learn === "learned"} onClick={() => setLearn(learn === "learned" ? "all" : "learned")}>נלמד</F>
            <F active={learn === "unlearned"} onClick={() => setLearn(learn === "unlearned" ? "all" : "unlearned")}>ללמידה</F>
            <span className="mx-0.5 w-px bg-hairline" />
            <F active={expert} onClick={() => setExpert((v) => !v)}>{expert ? "מצב מומחה" : "מצב מתחיל"}</F>
          </div>
        </div>
        {/* row 2 — module · operation · commit · sort */}
        <div className="chip-rail mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <F active={mod === "all"} onClick={() => setMod("all")}>כל המודולים</F>
          {mods.map((m) => <F key={m} active={mod === m} onClick={() => setMod(mod === m ? "all" : m)}>{m}</F>)}
          <span className="mx-0.5 w-px bg-hairline" />
          <F active={commitOnly} onClick={() => setCommitOnly((v) => !v)}>דורש COMMIT</F>
          <select value={op} onChange={(e) => setOp(e.target.value as "all" | OperationType)} aria-label="סינון לפי פעולה" className="tap shrink-0 rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-[12px] font-bold text-ink-2 outline-none focus:border-brand/40">
            <option value="all">כל הפעולות</option>
            {(["Read", "Create", "Change", "Delete", "Post", "Confirm"] as OperationType[]).map((k) => <option key={k} value={k}>{OP_HE[k]}</option>)}
          </select>
          <span className="mx-0.5 w-px bg-hairline" />
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="מיון" className="tap shrink-0 rounded-full border border-hairline bg-surface px-2.5 py-1.5 text-[12px] font-bold text-ink-2 outline-none focus:border-brand/40">
            <option value="alpha">מיון: א״ב</option>
            <option value="process">מיון: תהליך</option>
            <option value="verified">מיון: מאומת קודם</option>
            <option value="commit">מיון: COMMIT קודם</option>
          </select>
        </div>
        <p className="mt-1.5 text-[11.5px] font-semibold text-ink-3">{filtered.length} תוצאות{moduleLabel ? ` · ${moduleLabel}` : ""}</p>
      </div>

      {/* module gateways (§6 — the global page points into the full module collections, not duplicates them) */}
      {gateways && mod === "all" && !q && (
        <div className="grid gap-3 sm:grid-cols-2">
          {[["PM", "/pm/", "אחזקת מפעל", "var(--brand)"], ["PP-PI", "/pp-pi/", "ייצור תהליכי", "#6d28d9"]].map(([code, href, label, tint]) => (
            <Link key={code} href={href} className="card-interactive group flex items-center gap-3 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: tint }}><Boxes className="size-6" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[14px] font-extrabold text-ink-1">אוסף ה-BAPI/FM המלא של {code}</span><span className="block text-[12px] text-ink-3">{label} — פורטל המודול</span></span>
              <ArrowLeft className="size-4 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      )}

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
                {list.map((o) => <Card key={o.id} o={o} onOpen={() => setSel(o)} faved={fav.has(o.id)} pinned={pin.has(o.id)} learned={learned.has(o.id)} onFav={() => toggleFav(o.id)} onPin={() => togglePin(o.id)} />)}
              </div>
            </div>
          ))}
        </section>
      ))}

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="grid size-16 place-items-center rounded-2xl bg-surface-2 text-ink-3">
            {favOnly || pinOnly ? <PackageOpen className="size-8" /> : <SearchX className="size-8" />}
          </span>
          <div>
            <p className="text-[15px] font-extrabold text-ink-1">
              {favOnly ? "אין עדיין מועדפים" : pinOnly ? "אין אובייקטים נעוצים" : learn === "learned" ? "עוד לא סימנת אובייקטים כנלמדים" : "לא נמצאו אובייקטים תואמים"}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-3">
              {favOnly ? "לחץ על הכוכב בכל כרטיס כדי לאסוף אותו לרשימה שלך." : pinOnly ? "נעץ אובייקטים חשובים כדי שיצופו לראש כל קבוצה." : learn === "learned" ? "פתח אובייקט וסמן «נלמד» כדי לעקוב אחר ההתקדמות שלך." : "נסה מונח אחר, או נקה את הסינון כדי לראות את כל האוסף."}
            </p>
          </div>
          {anyFilter && <button onClick={resetFilters} className="tap inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-4 py-2 text-[12.5px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><RotateCcw className="size-3.5" /> נקה סינון</button>}
        </motion.div>
      )}

      <AnimatePresence>{sel && <Drawer o={sel} expert={expert} related={related} objects={objects} faved={fav.has(sel.id)} pinned={pin.has(sel.id)} learned={learned.has(sel.id)} note={notes[sel.id] || ""} onFav={() => toggleFav(sel.id)} onPin={() => togglePin(sel.id)} onLearned={() => toggleLearned(sel.id)} onNote={(v) => setNote(sel.id, v)} onOpen={(x) => setSel(x)} onClose={() => setSel(null)} />}</AnimatePresence>
    </div>
  );
}
