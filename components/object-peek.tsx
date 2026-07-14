"use client";

/**
 * MOBILE APP — Quick Preview (Peek) sheet.
 * The spec's centerpiece: "every SAP object has a quick preview — no page
 * transition required." A single globally-mounted bottom sheet, opened by the
 * `neo:peek` event (or the exported `peek()` helper) with an object name. It
 * resolves the object HONESTLY from existing verified sources — objectIntel()
 * for tables, the canonical registry() for BAPIs/FMs — and shows a rich,
 * progressively-disclosed card with quick actions. Nothing is invented: if an
 * object isn't in a verified source we say so and offer to open full search.
 *
 * Interaction language (from the research pass): Apple-Wallet peek card +
 * Notion peek + iOS context sheet. Long-press any `[data-peek="NAME"]` element
 * (or call peek()) to open; drag-down / Esc / backdrop to dismiss. Related
 * objects re-peek in place so the consultant can traverse the graph without
 * ever losing context.
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Star, Copy, Check, Table2, Terminal, Plug, Braces, Network, GitBranch, ArrowLeft, Sparkles, MapPin, ShieldCheck, Clock, BookMarked, Layers, Workflow } from "lucide-react";
import { objectIntel } from "@/lib/data";
import { registryObject } from "@/lib/bapi-registry";
import { lookupTCode } from "@/lib/tcode-index";
import { actionsFor, type ActionKind } from "@/lib/universal-actions";
import { toggleFavorite, useIsFavorite } from "@/lib/prefs";

const haptic = () => { try { navigator.vibrate?.(9); } catch { /* noop */ } };

// ---- public API ----
export function peek(name: string) {
  if (!name) return;
  window.dispatchEvent(new CustomEvent("neo:peek", { detail: { name } }));
}

type Kind = "table" | "bapi" | "fm" | "tcode" | "unknown";
type Resolved = {
  name: string; kind: Kind; module: string; typeHe: string; desc: string;
  difficulty?: string; verified?: boolean; businessProcess?: string;
  tcodes: string[]; funcs: string[]; related: string[]; tables: string[];
  counts?: { label: string; n: number }[]; foundIn?: { label: string; href: string }[];
  primaryHref: string; primaryLabel: string;
};

const KIND_META: Record<Kind, { Icon: typeof Table2; he: string; c: string }> = {
  table: { Icon: Table2, he: "טבלה", c: "#16a34a" },
  bapi: { Icon: Plug, he: "BAPI", c: "#d62027" },
  fm: { Icon: Braces, he: "Function Module", c: "#334155" },
  tcode: { Icon: Terminal, he: "טרנזקציה", c: "#0284c7" },
  unknown: { Icon: Sparkles, he: "אובייקט", c: "#64748b" },
};

function resolve(nameRaw: string): Resolved | null {
  const name = nameRaw.trim();
  if (!name) return null;
  // 1) table (richest) — objectIntel keys on the table name
  const intel = objectIntel(name);
  if (intel) {
    return {
      name: intel.table.tableName, kind: "table", module: intel.table.module, typeHe: "טבלה",
      desc: intel.table.descriptionHe || intel.table.descriptionEn || "",
      businessProcess: intel.process,
      tcodes: intel.tcodes, funcs: intel.bapis, related: intel.related, tables: [],
      counts: [
        { label: "הפניות", n: intel.counts.references }, { label: "מקושרים", n: intel.counts.related },
        { label: "ספרים", n: intel.counts.books }, { label: "תהליכים", n: intel.counts.processes },
      ],
      foundIn: intel.foundIn,
      primaryHref: `/object/${encodeURIComponent(intel.table.tableName)}/`, primaryLabel: "פתח סביבת עבודה",
    };
  }
  // 2) BAPI / FM — canonical registry (verified where curated)
  const o = registryObject(name);
  if (o) {
    const kind: Kind = o.objectType === "BAPI" ? "bapi" : "fm";
    return {
      name: o.technicalName, kind, module: o.primaryModule, typeHe: kind === "bapi" ? "BAPI" : "Function Module",
      desc: o.shortDescriptionHe || o.shortDescriptionEn || "",
      difficulty: o.difficulty, verified: o.verificationStatus.startsWith("verified"),
      businessProcess: o.businessProcess,
      tcodes: o.transactions.slice(0, 8), funcs: [], related: o.relatedObjects.slice(0, 8), tables: o.tables.slice(0, 8),
      primaryHref: `/bapi/${encodeURIComponent(o.technicalName)}/`, primaryLabel: "פתח אובייקט מלא",
    };
  }
  // 3) transaction code — verified tcode index
  const tc = lookupTCode(name);
  if (tc) {
    return {
      name: tc.code, kind: "tcode", module: tc.module, typeHe: "טרנזקציה",
      desc: tc.descHe || tc.descEn || "",
      tcodes: [], funcs: [], related: [], tables: (tc.tables || []).slice(0, 8),
      primaryHref: tc.href || `/transactions/${encodeURIComponent(tc.code)}/`, primaryLabel: "פתח טרנזקציה",
    };
  }
  // 4) not in a verified source — honest fallback
  return {
    name, kind: "unknown", module: "", typeHe: "אובייקט", desc: "",
    tcodes: [], funcs: [], related: [], tables: [],
    primaryHref: `/object/${encodeURIComponent(name)}/`, primaryLabel: "חפש אובייקט",
  };
}

function Section({ icon, label, children, count }: { icon: React.ReactNode; label: string; count?: number; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline px-5 py-3.5">
      <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-ink-3">{icon}{label}{count != null && <span className="text-ink-3/60">· {count}</span>}</div>
      {children}
    </div>
  );
}

function PeekBody({ r, onPeek, onClose }: { r: Resolved; onPeek: (n: string) => void; onClose: () => void }) {
  const router = useRouter();
  const meta = KIND_META[r.kind];
  const fav = useIsFavorite(r.name);
  const [copied, setCopied] = useState(false);
  const acts = r.kind === "unknown" ? [] : actionsFor(r.kind as ActionKind, r.name, r.module);
  const copy = () => { navigator.clipboard?.writeText(r.name).then(() => { setCopied(true); haptic(); setTimeout(() => setCopied(false), 1400); }).catch(() => {}); };
  const goPrimary = () => { haptic(); onClose(); router.push(r.primaryHref); };
  const chip = (n: string, onClick: () => void, dir: "ltr" | "rtl" = "ltr") => (
    <button key={n} onClick={onClick} dir={dir} className="tech tap rounded-lg border border-hairline bg-surface-2 px-2 py-1 text-[11.5px] font-bold text-ink-2 transition active:scale-95 hover:border-brand/40 hover:text-brand">{n}</button>
  );
  return (
    <>
      {/* hero */}
      <div className="px-5 pb-1 pt-1">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: meta.c }}><meta.Icon className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="tech min-w-0 break-all font-mono text-[17px] font-black text-ink-1" dir="ltr">{r.name}</h2>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold text-white" style={{ background: meta.c }}>{r.typeHe}</span>
              {r.module && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{r.module}</span>}
              {r.difficulty && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2">{r.difficulty}</span>}
              {r.verified != null && (
                <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-bold ${r.verified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {r.verified ? <ShieldCheck className="size-3" /> : <Clock className="size-3" />}{r.verified ? "מאומת" : "דורש אימות"}
                </span>
              )}
            </div>
          </div>
        </div>
        {r.desc && <p className="mt-3 text-[13.5px] leading-relaxed text-ink-1">{r.desc}</p>}
        {r.businessProcess && <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-3"><Workflow className="size-3.5" />{r.businessProcess}</p>}
        {r.kind === "unknown" && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] font-semibold text-amber-800">אין עדיין מטא-דאטה מאומת לאובייקט זה — לא ממציאים נתונים. פתח חיפוש כדי לנסות שם עסקי או כינוי.</p>}

        {/* primary action + quick actions */}
        <div className="mt-4 flex flex-col gap-2">
          <button onClick={goPrimary} className="tap flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand text-[14px] font-extrabold text-white shadow-sm transition active:scale-[0.98]">
            <Layers className="size-4" />{r.primaryLabel}
          </button>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => { toggleFavorite(r.name); haptic(); }} aria-pressed={fav} className="tap flex flex-col items-center gap-1 rounded-xl border border-hairline py-2 text-[11px] font-bold text-ink-2 transition active:scale-95 hover:border-brand/40">
              <Star className={`size-4 ${fav ? "fill-amber-400 text-amber-400" : ""}`} />{fav ? "במועדפים" : "מועדף"}
            </button>
            <button onClick={copy} className="tap flex flex-col items-center gap-1 rounded-xl border border-hairline py-2 text-[11px] font-bold text-ink-2 transition active:scale-95 hover:border-brand/40">
              {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}{copied ? "הועתק" : "העתק שם"}
            </button>
            <button onClick={() => { onClose(); router.push(`/chat/?q=${encodeURIComponent(r.name)}`); }} className="tap flex flex-col items-center gap-1 rounded-xl border border-hairline py-2 text-[11px] font-bold text-ink-2 transition active:scale-95 hover:border-brand/40">
              <Sparkles className="size-4" />שאל AI
            </button>
          </div>
        </div>
      </div>

      {/* progressive disclosure */}
      {r.counts?.some((c) => c.n > 0) && (
        <Section icon={<GitBranch className="size-3.5" />} label="במבט חטוף">
          <div className="grid grid-cols-4 gap-1.5">
            {r.counts.map((c) => (
              <div key={c.label} className="rounded-xl border border-hairline bg-surface-2/50 py-2 text-center">
                <div className="font-mono text-[17px] font-black text-brand">{c.n}</div>
                <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-3">{c.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}
      {r.related.length > 0 && (
        <Section icon={<Network className="size-3.5" />} label="אובייקטים קשורים" count={r.related.length}>
          <div className="flex flex-wrap gap-1.5">{r.related.map((n) => chip(n, () => onPeek(n)))}</div>
        </Section>
      )}
      {r.tcodes.length > 0 && (
        <Section icon={<Terminal className="size-3.5" />} label="טרנזקציות" count={r.tcodes.length}>
          <div className="flex flex-wrap gap-1.5">{r.tcodes.map((n) => chip(n, () => onPeek(n)))}</div>
        </Section>
      )}
      {(r.funcs.length > 0 || r.tables.length > 0) && (
        <Section icon={<Layers className="size-3.5" />} label={r.kind === "table" ? "BAPIs / FM" : "טבלאות"} count={(r.funcs.length || r.tables.length)}>
          <div className="flex flex-wrap gap-1.5">{(r.funcs.length ? r.funcs : r.tables).map((n) => chip(n, () => onPeek(n)))}</div>
        </Section>
      )}
      {acts.length > 0 && (
        <Section icon={<ArrowLeft className="size-3.5" />} label="פעולות">
          <div className="grid grid-cols-2 gap-1.5">
            {acts.map((a) => { const AIcon = a.icon; return (
              <button key={a.label} onClick={() => { haptic(); onClose(); router.push(a.href); }} className="tap flex items-center gap-2 rounded-xl border border-hairline px-3 py-2.5 text-start text-[12.5px] font-bold text-ink-2 transition active:scale-95 hover:border-brand/40 hover:text-brand">
                <AIcon className="size-4 shrink-0" />{a.label}
              </button>
            ); })}
          </div>
        </Section>
      )}
      {r.foundIn && r.foundIn.length > 0 && (
        <Section icon={<MapPin className="size-3.5" />} label="נמצא ב">
          <div className="flex flex-wrap gap-1.5">
            {r.foundIn.map((f) => <button key={f.label} onClick={() => { onClose(); router.push(f.href); }} className="tap rounded-lg bg-surface-2 px-2 py-1 text-[11.5px] font-bold text-ink-2 ring-1 ring-hairline transition hover:ring-brand/40 hover:text-brand">{f.label}</button>)}
          </div>
        </Section>
      )}
    </>
  );
}

export function ObjectPeek() {
  const reduce = useReducedMotion();
  const [name, setName] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPeek = (e: Event) => { const d = (e as CustomEvent).detail; if (d?.name) { setName(String(d.name)); haptic(); } };
    window.addEventListener("neo:peek", onPeek);
    // global long-press → peek on any [data-peek] element (500ms, movement-cancelled)
    let timer: ReturnType<typeof setTimeout> | null = null; let sx = 0, sy = 0;
    const clear = () => { if (timer) { clearTimeout(timer); timer = null; } };
    const down = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      // 1) explicit opt-in
      let n = (t?.closest?.("[data-peek]") as HTMLElement | null)?.getAttribute("data-peek") || null;
      // 2) any object-family anchor, app-wide, no per-component wiring
      if (!n) {
        const href = (t?.closest?.("a[href]") as HTMLAnchorElement | null)?.getAttribute("href") || "";
        const m = /^\/(?:object|bapi|tcode|cds|idoc|transactions)\/([^/?#]+)/.exec(href);
        if (m) { try { n = decodeURIComponent(m[1]); } catch { n = m[1]; } }
      }
      if (!n) return;
      sx = e.clientX; sy = e.clientY;
      timer = setTimeout(() => {
        timer = null; setName(n); haptic();
        // swallow the click that follows the long-press so the underlying card's tap doesn't also fire
        const swallow = (ce: Event) => { ce.preventDefault(); ce.stopPropagation(); window.removeEventListener("click", swallow, true); };
        window.addEventListener("click", swallow, true);
        setTimeout(() => window.removeEventListener("click", swallow, true), 600);
      }, 480);
    };
    const move = (e: PointerEvent) => { if (timer && (Math.abs(e.clientX - sx) > 10 || Math.abs(e.clientY - sy) > 10)) clear(); };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointerup", clear, true);
    window.addEventListener("pointercancel", clear, true);
    return () => {
      window.removeEventListener("neo:peek", onPeek);
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerup", clear, true);
      window.removeEventListener("pointercancel", clear, true);
      clear();
    };
  }, []);

  const close = () => setName(null);
  useEffect(() => {
    if (!name) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [name]);

  const r = name ? resolve(name) : null;

  return (
    <AnimatePresence>
      {r && (
        <>
          <motion.div className="fixed inset-0 z-[75] bg-slate-900/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`תצוגה מקדימה — ${r.name}`} dir="rtl"
            className="fixed inset-x-0 bottom-0 z-[76] flex max-h-[90dvh] flex-col rounded-t-[1.75rem] bg-surface shadow-2xl outline-none sm:inset-x-auto sm:bottom-auto sm:end-4 sm:top-1/2 sm:max-h-[86dvh] sm:w-[26rem] sm:-translate-y-1/2 sm:rounded-[1.75rem] sm:border sm:border-hairline"
            initial={reduce ? { opacity: 0 } : { y: "100%" }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: "100%" }} transition={{ type: "spring", stiffness: 380, damping: 38 }}
            drag={reduce ? false : "y"} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, i) => { if (i.offset.y > 100) close(); }}>
            <div className="shrink-0">
              <div className="mx-auto mt-2.5 h-1.5 w-11 rounded-full bg-hairline sm:hidden" />
              <div className="flex items-center justify-between px-5 pb-1 pt-2">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-3"><BookMarked className="me-1 inline size-3" />תצוגה מקדימה</span>
                <button onClick={close} aria-label="סגור" className="tap grid size-9 place-items-center rounded-xl text-ink-3 active:bg-surface-2"><X className="size-5" /></button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pb-[max(env(safe-area-inset-bottom),1.25rem)]">
              <PeekBody r={r} onPeek={(n) => setName(n)} onClose={close} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
