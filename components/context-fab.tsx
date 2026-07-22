"use client";

/**
 * MOBILE APP — one intelligent Floating Action Button (speed-dial).
 * Not a static menu: it is screen-aware. Tap → springs open a short stack of
 * contextual actions (primary emphasized), FAB morphs to X. The app's identity
 * is "premium SAP assistant", so the primary is almost always "Ask AI", with
 * context-specific secondaries (search, architecture, contextual create/notes).
 * Mobile + tablet only (xl: the desktop has its own floating helpers); hidden on
 * the AI/chat routes where it would duplicate the composer.
 */
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X, Search, Workflow, BookMarked, Network, Plus, GitCompare } from "lucide-react";

const haptic = () => { try { navigator.vibrate?.(9); } catch { /* noop */ } };
type Act = { Icon: typeof Search; label: string; run: (r: ReturnType<typeof useRouter>) => void; primary?: boolean };

const openPalette = () => window.dispatchEvent(new Event("neo:open-palette"));

// route-prefix → contextual action stack (index 0 = primary)
function actionsFor(path: string): { title: string; acts: Act[] } {
  const askAI: Act = { Icon: Sparkles, label: "שאל AI", primary: true, run: (r) => r.push("/chat/") };
  const search: Act = { Icon: Search, label: "חיפוש", run: () => openPalette() };
  const studio: Act = { Icon: Workflow, label: "Architecture Studio", run: (r) => r.push("/sap-infrastructure/") };
  const graph: Act = { Icon: Network, label: "מפת קשרים", run: (r) => r.push("/studio/") };
  const compare: Act = { Icon: GitCompare, label: "השוואה", run: (r) => r.push("/evolution/") };
  const notes: Act = { Icon: BookMarked, label: "סימניות", run: (r) => r.push("/library/") };

  if (/^\/(library|learn|knowledge|story)/.test(path)) return { title: "פעולות למידה", acts: [askAI, notes, search] };
  if (/^\/(sap-infrastructure|studio|architect|domain-model|lineage|impact)/.test(path)) return { title: "ארכיטקטורה", acts: [askAI, graph, search] };
  if (/^\/(bapi|tables|transactions|tcode|cds|idoc|object|fiori|enhancements|exits)/.test(path)) return { title: "עיון טכני", acts: [askAI, search, studio] };
  if (/^\/(evolution|ecc-s4|migration|s4-readiness|s4hana)/.test(path)) return { title: "מיגרציה", acts: [askAI, compare, search] };
  return { title: "פעולות", acts: [askAI, search, studio] };
}

export function ContextFab() {
  const path = usePathname() || "/";
  const router = useRouter();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { title, acts } = useMemo(() => actionsFor(path), [path]);

  // close on route change + Esc
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // hide where it would duplicate a native composer
  if (/^\/(chat|copilot)/.test(path)) return null;
  // §P2.10 hide inside the lesson reader — keep the reading surface calm (matches
  // the P0 focus-mode); its generic primary ("Ask AI") would also pull the learner
  // out of the lesson. The reader's own prev/next cards own progression here.
  if (/^\/academy\/lesson\//.test(path)) return null;

  const run = (a: Act) => { haptic(); setOpen(false); a.run(router); };

  return (
    <div className="no-print fixed end-0 bottom-[5.5rem] z-[60] flex flex-col items-end gap-2.5 pe-4 pb-[env(safe-area-inset-bottom)] xl:hidden">
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 -z-10 bg-slate-900/10 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            {acts.map((a, i) => (
              <motion.button
                key={a.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 460, damping: 30, delay: reduce ? 0 : (acts.length - 1 - i) * 0.035 }}
                onClick={() => run(a)}
                className={`tap flex items-center gap-2.5 rounded-full ps-4 pe-2 py-2 shadow-lg ring-1 backdrop-blur-md ${a.primary ? "bg-brand text-white ring-brand/40" : "bg-surface/95 text-ink-1 ring-hairline"}`}>
                <span className="text-[13px] font-extrabold">{a.label}</span>
                <span className={`grid size-8 place-items-center rounded-full ${a.primary ? "bg-white/20" : "bg-surface-2 text-brand"}`}><a.Icon className="size-4" /></span>
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => { haptic(); setOpen((v) => !v); }}
        aria-expanded={open} aria-label={open ? "סגור פעולות" : title}
        whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 500, damping: 26 }}
        className="tap grid size-14 place-items-center rounded-[1.35rem] bg-brand text-white shadow-[0_10px_30px_-6px_rgba(214,32,39,0.55)] ring-1 ring-white/20">
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
          {open ? <X className="size-6" /> : <Plus className="size-6" />}
        </motion.span>
      </motion.button>
    </div>
  );
}
