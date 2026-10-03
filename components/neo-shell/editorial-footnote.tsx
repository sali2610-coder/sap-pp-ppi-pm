"use client";

import { useEffect } from "react";

/* The margin footnote of the Editorial Technology pilot (DESIGN-SPEC-EDITORIAL.md
   §6). Hover or focus on a SAP code shows a note built ONLY from text already in
   the code's own host row (its description and S/4 standing cells). Nothing is
   fetched, nothing is invented. Mounted by the shell on the pilot routes only.
   Ported from design/directions/editorial/direction.js with the two judges'
   fixes: codes only (never a header cell), and never over the host row. */

const CODE = ".nw-sap, .nx-sap, .nh-sap, .nxd-id > b, .nu-chip.is-sap, .fm-code, .nr-sec-n, .ne-node-n";
const HOSTSEL = ".nxd-row, .nw-row, .nw-rankrow, .fm-node, .nw-idx-i, .ne-node, .nw-fig, .nw-id";
// where the note's text lives, per host: [host selector, description, mark]
const HOSTS: [string, string, string | null][] = [
  [".ne-node", ".ne-node-he", ".ne-node-k, .ne-node-fk"],
  [".nw-id", ".nw-en", null],
  [".nxd-row", ".nxd-he", ".nxd-s4-t"],
  [".nw-row", ".nw-c-he", ".nw-c-s4"],
  [".nw-rankrow", ".nw-rank-t", ".nw-rank-n"],
  [".fm-node", ".fm-label", ".fm-note"],
  [".nw-move", ".nw-move-he", ".nw-move-w"],
  [".nh-mod-nums > div", "dt", null],
  [".nw-fig", "span, em", null],
  [".nw-idx-i", ".nw-idx-t", ".nw-idx-c"],
  [".nr-sec-h", ".nr-sec-t", ".nr-sec-meta"],
  [".nh-imp li", ".nh-imp-l", null],
];

const text = (el: Element | null) => (el ? (el.textContent || "").replace(/\s+/g, " ").trim() : "");

export function EditorialFootnote() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".nx-app");
    if (!root || root.querySelector(".ed-fn")) return;
    const fn = document.createElement("aside");
    fn.className = "ed-fn";
    fn.setAttribute("role", "status");
    fn.setAttribute("aria-live", "polite");
    fn.hidden = true;
    root.appendChild(fn);
    let current: Element | null = null;
    let hideT = 0;

    // a code is a code, never a table header or a column label (judge 6)
    const isCode = (el: Element | null) => !!el && !el.closest("th, thead, .nw-tbl-h, [role=columnheader]");

    const build = (code: Element) => {
      const codeText = text(code);
      if (!codeText) return null;
      for (const [hostSel, descSel, markSel] of HOSTS) {
        const host = code.closest(hostSel);
        if (!host) continue;
        let desc = "";
        for (const d of host.querySelectorAll(descSel)) { const t = text(d); if (t && t !== codeText && !desc.includes(t)) desc += (desc ? " " : "") + t; }
        const mark = markSel ? text(host.querySelector(markSel)) : "";
        if (!desc && !mark) return null;
        return { host, code: codeText, desc: desc.slice(0, 180), mark: mark.slice(0, 120) };
      }
      return null; // no known host: no note (the nearest-block fallback produced "טבלה")
    };

    const place = (el: Element, host: Element) => {
      const r = el.getBoundingClientRect(), hr = host.getBoundingClientRect();
      const w = fn.offsetWidth || 256, h = fn.offsetHeight || 80;
      const rtl = (document.documentElement.dir || "rtl") !== "ltr";
      // the margin is the inline end: left in RTL, right in LTR
      let x = rtl ? hr.left - w - 16 : hr.right + 16;
      let y = r.top;
      const inMargin = x >= 8 && x + w <= window.innerWidth - 8;
      if (!inMargin) {
        // no margin room: under the HOST ROW, never over its cells (judge 5)
        x = rtl ? Math.min(r.right - w, window.innerWidth - w - 8) : Math.max(r.left, 8);
        if (x < 8) x = 8;
        y = hr.bottom + 8;
      }
      // kept on screen only while its code is: it leaves with a scrolled-away row
      if (y + h > window.innerHeight - 8 && r.top < window.innerHeight) y = Math.max(8, window.innerHeight - h - 8);
      fn.style.left = `${x}px`;
      fn.style.top = `${y}px`;
    };

    const hide = () => {
      current = null;
      fn.dataset.on = "0";
      window.clearTimeout(hideT);
      hideT = window.setTimeout(() => { if (!current) fn.hidden = true; }, 180);
    };
    const show = (code: Element) => {
      const data = build(code);
      if (!data) return hide();
      window.clearTimeout(hideT);
      current = code;
      fn.replaceChildren();
      const c = document.createElement("b"); c.className = "ed-fn-code"; c.textContent = data.code; fn.appendChild(c);
      if (data.desc) { const p = document.createElement("span"); p.textContent = data.desc; fn.appendChild(p); }
      if (data.mark) { const m = document.createElement("span"); m.className = "ed-fn-mark"; m.textContent = data.mark; fn.appendChild(m); }
      fn.hidden = false;
      place(code, data.host);
      fn.dataset.on = "1";
    };

    const onOver = (e: Event) => {
      const t = e.target as Element;
      const code = t.closest?.(CODE) ?? null;
      if (code && isCode(code)) { if (code !== current) show(code); return; }
      if (current && !t.closest?.(".ed-fn")) hide();
    };
    const onFocusIn = (e: Event) => {
      const t = e.target as Element;
      let code: Element | null = t.matches?.(CODE) ? t : t.querySelector?.(CODE) ?? null;
      if (!code) { const host = t.closest?.(HOSTSEL); code = host ? host.querySelector(".ne-node-n, .nxd-id > b") || host.querySelector(CODE) : null; }
      if (code && isCode(code)) show(code); else hide();
    };
    const onFocusOut = () => { window.setTimeout(() => { const a = document.activeElement; if (!a || !root.contains(a) || !a.closest(`${CODE}, ${HOSTSEL}`)) hide(); }, 0); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    const onMove = () => { if (current) { const d = build(current); if (d) place(current, d.host); } };

    // ERD: the title's rule takes the focused table's own module hue (read from its node)
    const erdRule = () => {
      const bar = root.querySelector<HTMLElement>(".ne-bar-t"), node = root.querySelector<HTMLElement>(".ne-node[data-lvl='0']");
      if (!bar) return;
      const ms = node ? getComputedStyle(node).getPropertyValue("--ms").trim() : "";
      if (ms) bar.style.setProperty("--ms", ms); else bar.style.removeProperty("--ms");
    };
    const timers: number[] = [];
    const onClick = () => { timers.push(window.setTimeout(erdRule, 600)); };
    if (root.querySelector(".ne")) { timers.push(window.setTimeout(erdRule, 300), window.setTimeout(erdRule, 1500)); root.addEventListener("click", onClick); }

    root.addEventListener("mouseover", onOver);
    root.addEventListener("mouseleave", hide);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    document.addEventListener("keydown", onKey);
    // The page scrolls inside the shell's canvas, not the window, and a scroll
    // event does not bubble: only a capturing listener hears it. The ERD's
    // camera announces its own moves.
    window.addEventListener("scroll", onMove, { passive: true, capture: true });
    window.addEventListener("resize", onMove);
    window.addEventListener("neo:camera", onMove);
    return () => {
      root.removeEventListener("mouseover", onOver);
      root.removeEventListener("mouseleave", hide);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onMove, { capture: true });
      window.removeEventListener("resize", onMove);
      window.removeEventListener("neo:camera", onMove);
      for (const t of timers) window.clearTimeout(t);
      window.clearTimeout(hideT);
      fn.remove();
    };
  }, []);
  return null;
}
