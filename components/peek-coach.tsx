"use client";

/**
 * MOBILE APP — one-time discoverability coach-mark for Quick Preview.
 * Long-press-to-peek is the flagship gesture but invisible. On a touch device,
 * the first time the user lands on a content page that actually has peekable
 * objects, show a single dismissible hint just above the bottom tab bar, then
 * never again (localStorage). Desktop / fine-pointer users never see it (they
 * have the command palette + hover).
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hand, X } from "lucide-react";

const KEY = "neo:coach:peek";

export function PeekCoach() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem(KEY) === "1"; } catch { /* noop */ }
    if (done) return;
    let coarse = false;
    try { coarse = window.matchMedia("(pointer: coarse)").matches; } catch { /* noop */ }
    if (!coarse) return;
    // wait until the page has peekable objects (object anchors), then hint once
    const t = setTimeout(() => {
      const hasPeekable = !!document.querySelector('[data-peek], a[href^="/object/"], a[href^="/bapi/"], a[href^="/tcode/"]');
      if (hasPeekable) setShow(true);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const close = () => { setShow(false); try { localStorage.setItem(KEY, "1"); } catch { /* noop */ } };

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(close, 5000);
    return () => clearTimeout(t);
  }, [show]);

  // The toast sits above the contextual FAB rather than on top of it. The FAB
  // is `bottom-[5.5rem]` and 56px tall (components/context-fab.tsx), so it owns
  // 88px–144px from the bottom. This toast used to be at 5.75rem (92px), which
  // put its dismiss button directly over the FAB — measured on production at
  // 412px wide: FAB y 679–735, dismiss y 674–718. Two overlapping tap targets,
  // so a tap in that area was ambiguous. 10rem clears the FAB with a 16px gap.
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          dir="rtl"
          className="no-print fixed inset-x-0 bottom-[10rem] z-[55] mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-hairline bg-ink-1/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md xl:hidden"
          style={{ marginInline: "1rem" }}>
          <motion.span animate={{ rotate: [0, -12, 0], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15">
            <Hand className="size-5" />
          </motion.span>
          <p className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug">
            טיפ: <b className="font-extrabold">לחיצה ארוכה</b> על כל אובייקט פותחת תצוגה מקדימה מהירה — בלי לעזוב את המסך.
          </p>
          <button onClick={close} aria-label="הבנתי" className="tap grid size-8 shrink-0 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
