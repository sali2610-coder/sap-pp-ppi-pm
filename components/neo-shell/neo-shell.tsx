"use client";

/* ============================================================================
   PROJECT NEO · CONCEPT D — the application shell and the signature navigation.
   ----------------------------------------------------------------------------
   This component owns its own chrome. app/neo/* renders outside the legacy
   header / knowledge sidebar / mobile tab bar / footer (see the pathname guard
   in components/app-shell.tsx), so everything the user needs to move around the
   namespace is here.

   WHAT MOVES, AND WHY IT IS ALLOWED TO
     transform  — the travelling indicator, the rail FLIP, group expansion, the
                  shelf cross-fade, the preview layer, the mobile sheet.
     opacity    — labels across the compact transition, shelf pane swaps.
     nothing else. No width, height, top/left, filter or box-shadow is ever
     animated. `prefers-reduced-motion` is honoured in both halves: the CSS
     rules are neutralised by the media query, and flip.ts checks the same query
     before it starts a Web Animation (a media query cannot reach WAAPI).

   THE NINE STATES, MODELLED HONESTLY
     Six of them are real rail modes with real CSS: expanded (the base), compact,
     hidden, peek, search, context. `hover` and `active` are BEHAVIOURS, not
     modes — hover is the preview layer, and active is simply what happens on
     every route change. `mobile` is a different shell entirely. Modelling all
     nine as one enum would have shipped three states that do nothing.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { flushSync } from "react-dom";
import {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from "react";
import { mark } from "@/components/defer-mount";
import { Ico, KIND_HE, KIND_ICON } from "./icon";
import {
  GROUP_MS, RAIL_MS, measure, play, playEnter, playScaleX, raf, raf2, reducedMotion,
} from "./flip";
import { modVar } from "./mod-var";
import { PreviewPanel } from "./preview";
import { ContextPane, PinnedPane, RecentPane, ShelfTabs } from "./shelf";
import { MobileSheet, MobileTabs } from "./mobile-nav";
import { pushRecentObject, relTime, setLayout, useLayout, useRecent } from "./store";
import type { ModuleKey, NavItem, RailMode, SearchRecord, ShelfTab, ShellData } from "./types";

const nf = new Intl.NumberFormat("he-IL");
const PREVIEW_DELAY = 260;

/** Prefix match, but only on a full path segment: "/neo/pm/" must not be
 *  activated by "/neo/pm-something/". */
const isActive = (path: string, href: string) => path === href || path.startsWith(href);

export function NeoShell({ data, children }: { data: ShellData; children: React.ReactNode }) {
  const path = usePathname() || "/neo/";

  const items = useMemo(() => data.groups.flatMap((g) => g.items), [data.groups]);
  const active = useMemo<NavItem | null>(
    () => items.find((i) => isActive(path, i.href)) || null,
    [items, path],
  );
  const activeMod = active?.mod;

  /* ------------------------------------------------------------- state
     mode and the per-group open map live in an external store rather than in
     useState, so a saved layout is restored with no hydration mismatch and no
     setState inside an effect. A group with no entry is open — that is the
     default, and it is the server snapshot too. */
  const layout = useLayout();
  const mode: RailMode = layout.mode ?? "expanded";
  const open = layout.open;
  const setMode = useCallback((m: RailMode) => setLayout({ mode: m }), []);

  const [query, setQuery] = useState("");
  const [shelf, setShelf] = useState<ShelfTab>("recent");
  const [ctxName, setCtxName] = useState<string>(data.defaultContext);
  const [pvId, setPvId] = useState<string | null>(null);
  const [hoverMod, setHoverMod] = useState<ModuleKey | undefined>(undefined);
  const [sheet, setSheet] = useState(false);

  const { names: recent, seen } = useRecent();

  /* -------------------------------------------------------------- refs */
  const appRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cmdRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pvRef = useRef<HTMLDivElement>(null);
  const pvAnchor = useRef<HTMLElement | null>(null);
  const pvTimer = useRef<number | null>(null);
  const sqTimer = useRef<number | null>(null);
  const prevY = useRef<number | undefined>(undefined);
  const shelfTabsRef = useRef<HTMLDivElement>(null);
  const shelfIndRef = useRef<HTMLSpanElement>(null);

  /* ------------------------------------------------------ hydration */
  useEffect(() => {
    // DeferMount is not mounted on /neo, and it is what normally emits this
    // mark — without it window.__neoTimeline() and /diag/ report the hydration
    // stage as n/a on every page in the namespace.
    mark("shell-hydrated");
  }, []);

  /* --------------------------------------------------------- search */
  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!q) return null; // null = no filter at all
    return new Set(items.filter((i) => i.label.toLowerCase().includes(q) || i.id.includes(q)).map((i) => i.id));
  }, [items, q]);
  const hits = visible ? visible.size : items.length;

  const results = useMemo(() => {
    if (!q) return [];
    const out: SearchRecord[] = [];
    for (const r of data.search) {
      if (r.t.toLowerCase().includes(q) || r.s.toLowerCase().includes(q)) out.push(r);
      if (out.length >= 6) break;
    }
    return out;
  }, [data.search, q]);

  // The surrounding surface answers the query, not just the field: a module nav
  // item lights up when the dictionary hits a table that lives in it.
  const hitMods = useMemo(() => {
    const s = new Set<string>();
    if (!q) return s;
    for (const r of results) {
      const o = r.obj ? data.objects[r.obj] : undefined;
      if (o) for (const m of o.mods) s.add(m);
    }
    return s;
  }, [q, results, data.objects]);

  /* ---------------------------------------------- the travelling pill */
  const syncInd = useCallback(() => {
    const scroll = scrollRef.current;
    const ind = indRef.current;
    if (!scroll || !ind) return;
    const el = scroll.querySelector<HTMLElement>(".nx-navitem[aria-current]");
    const group = el?.closest<HTMLElement>(".nx-group");
    if (!el || !el.offsetParent || group?.dataset.open === "false") {
      ind.dataset.off = "1";
      return;
    }
    ind.dataset.off = "0";
    const y = el.offsetTop;
    ind.style.setProperty("--y", `${y}px`);
    ind.style.setProperty("--h", `${el.offsetHeight}px`);
    ind.style.setProperty("--m", el.dataset.mod ? modVar(el.dataset.mod) : "var(--brand)");
    const prev = prevY.current;
    prevY.current = y;
    // Weight: the longer the trip, the more the pill stretches along the axis of
    // travel before it lands. 900px of travel saturates at +22%. The reset lands
    // 130ms into the shared 420ms spring, so squash and settle read as one
    // gesture. `prev === undefined` is first paint — no animation on mount.
    if (prev !== undefined && prev !== y && !reducedMotion()) {
      ind.style.setProperty("--sq", String(1 + Math.min(0.22, Math.abs(prev - y) / 900)));
      if (sqTimer.current) window.clearTimeout(sqTimer.current);
      sqTimer.current = window.setTimeout(() => ind.style.setProperty("--sq", "1"), 130);
    }
  }, []);

  useLayoutEffect(() => { syncInd(); }, [syncInd, path, mode, open, q]);
  useEffect(() => {
    const on = () => raf(syncInd);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [syncInd]);

  /* -------------------------------------------------------- rail tint
     One variable drives everything hue-reactive in the rail: the top wash, the
     hairline edge, the quick-action border, the search field and its glow, the
     shelf underline and the scrollbar thumb on hover.

     Hover tint REVERTS here. In the prototype showPreview() retinted the rail
     and hidePreview() did not undo it, so the surface stayed the colour of
     whatever module you last passed over. Deriving it from state instead makes
     that impossible. */
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const m = hoverMod ?? activeMod;
    rail.style.setProperty("--railtint", m ? modVar(m) : "var(--ink-3)");
    rail.dataset.tinted = m ? "1" : "0";
  }, [hoverMod, activeMod]);

  /* -------------------------------------------------- shelf underline */
  useLayoutEffect(() => {
    const strip = shelfTabsRef.current;
    const ind = shelfIndRef.current;
    if (!strip || !ind) return;
    const on = strip.querySelector<HTMLElement>(`[data-shelftab="${shelf}"]`);
    if (!on) return;
    const sr = strip.getBoundingClientRect();
    const tr = on.getBoundingClientRect();
    // Direction-agnostic: distance from the strip's INLINE start, measured from
    // rects. offsetLeft is always physical-left and put this underline in the
    // wrong place in RTL.
    const rtl = getComputedStyle(strip).direction === "rtl";
    ind.style.setProperty("--w", `${tr.width}px`);
    ind.style.setProperty("--x", `${rtl ? sr.right - tr.right : tr.left - sr.left}px`);
  }, [shelf, mode]);

  /* ------------------------------------------------------- scroll mask */
  const onScroll = useCallback(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.dataset.top = s.scrollTop > 3 ? "1" : "0";
    s.dataset.bot = s.scrollHeight - s.clientHeight - s.scrollTop > 3 ? "1" : "0";
  }, []);
  useLayoutEffect(() => { onScroll(); }, [onScroll, open, q, mode]);

  /* ------------------------------------------------------- the FLIP */
  const changeMode = useCallback((next: RailMode) => {
    const cur = mode;
    if (cur === next) return;
    const widthChange =
      (cur === "compact") !== (next === "compact") || (cur === "context") !== (next === "context");

    const commit = () => {
      setMode(next);
      if (next === "context") setShelf("context");
      else if (cur === "context") setShelf("recent");
      if (next !== "search") setQuery("");
    };

    if (!widthChange) { commit(); raf(syncInd); return; }

    const movers = [mainRef.current, headRef.current, cmdRef.current, scrollRef.current, shelfRef.current, footRef.current];
    // LIVE rects, mid-flight on purpose: a transformed element reports its
    // animated visual box, so a second click starts from where the pixels
    // actually are instead of snapping back first.
    const before = measure(movers);
    const bg = bgRef.current;
    const edge = edgeRef.current;
    const bgBefore = bg?.getBoundingClientRect();
    const edgeBefore = edge?.getBoundingClientRect();

    // The grid track changes ONCE, synchronously. Width is never transitioned.
    flushSync(commit);

    // Cancel in flight so the "after" rect is the settled layout box, not an
    // animated one. WAAPI cancel is instant and needs no cleanup timer — the
    // prototype's un-cancelled setTimeout(…, 760) is what made an interrupted
    // flip snap.
    for (const el of [...movers, bg, edge]) el?.getAnimations().forEach((a) => a.cancel());

    movers.forEach((el, i) => {
      if (!el) return;
      const b = before.get(el);
      if (!b) return;
      play(el, b.left - el.getBoundingClientRect().left, "X", Math.min(i, 5) * 12, RAIL_MS);
    });
    if (bg && bgBefore) playScaleX(bg, bgBefore.width, bg.getBoundingClientRect().width);
    // The 1px hairline travels rather than being stretched.
    if (edge && edgeBefore) play(edge, edgeBefore.left - edge.getBoundingClientRect().left, "X", 0, RAIL_MS);

    raf2(syncInd);
  }, [mode, setMode, syncInd]);

  /* ------------------------- group expansion that never resets scroll */
  const toggleGroup = useCallback((gid: string) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const head = scroll.querySelector<HTMLElement>(`[data-group="${gid}"]`);
    if (!head) return;

    const movers = [...scroll.querySelectorAll<HTMLElement>(".nx-navitem, .nx-group-btn")];
    const before = new Map(movers.map((el) => [el, el.getBoundingClientRect().top]));
    const headBefore = head.getBoundingClientRect().top;
    const scrollBefore = scroll.scrollTop;
    const opening = open[gid] === false;

    flushSync(() => setLayout({ open: { ...open, [gid]: opening } }));

    // THE trick: pin the clicked heading to the exact pixel the finger left it.
    // Everything else is allowed to move; collapsing a group above the viewport
    // therefore never yanks the list. Measured BEFORE the inversion so the two
    // effects compose.
    scroll.scrollTop = scrollBefore + (head.getBoundingClientRect().top - headBefore);

    movers.forEach((el, i) => {
      if (!el.offsetParent) return; // items in the group being closed are gone
      const b = before.get(el);
      if (b === undefined) return;
      play(el, b - el.getBoundingClientRect().top, "Y", Math.min(i, 8) * 9, GROUP_MS);
    });

    if (opening) {
      const body = scroll.querySelector<HTMLElement>(`#nx-grp-${gid}`);
      body?.querySelectorAll<HTMLElement>(".nx-navitem").forEach((el, i) => playEnter(el, i * 24));
    }
    raf(syncInd);
    raf2(onScroll);
  }, [open, syncInd, onScroll]);

  /* --------------------------------------------------- preview layer */
  const showPreview = useCallback((el: HTMLElement, immediate = false) => {
    const id = el.dataset.nav;
    if (!id) return;
    pvAnchor.current = el;
    const fire = () => {
      setPvId(id);
      const m = el.dataset.mod as ModuleKey | undefined;
      setHoverMod(m);
    };
    if (pvTimer.current) window.clearTimeout(pvTimer.current);
    if (immediate) fire();
    else pvTimer.current = window.setTimeout(fire, PREVIEW_DELAY);
  }, []);

  const hidePreview = useCallback(() => {
    if (pvTimer.current) window.clearTimeout(pvTimer.current);
    setPvId(null);
    setHoverMod(undefined);
  }, []);

  useLayoutEffect(() => {
    const host = pvRef.current;
    const app = appRef.current;
    const anchor = pvAnchor.current;
    if (!host || !app || !anchor || !pvId) return;
    const panel = host.firstElementChild as HTMLElement | null;
    if (!panel) return;
    const ar = anchor.getBoundingClientRect();
    const sr = app.getBoundingClientRect();
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const rtl = getComputedStyle(app).direction === "rtl";
    // Measured in LOGICAL space so one formula serves RTL and LTR. There is no
    // scaled stage in the real app, so every /scale conversion is gone.
    let y = ar.top - sr.top - 8;
    y = Math.max(8, Math.min(sr.height - h - 8, y));
    const nearEdge = rtl ? sr.right - ar.left : ar.right - sr.left;
    const farEdge = rtl ? sr.right - ar.right : ar.left - sr.left;
    let lx = nearEdge + 10;
    if (lx + w > sr.width - 8) lx = farEdge - w - 10;
    lx = Math.max(8, Math.min(Math.max(8, sr.width - w - 8), lx));
    host.style.transform = `translate(${rtl ? -lx : lx}px, ${y}px)`;
  }, [pvId]);

  /* --------------------------------------------------------- objects */
  const openObject = useCallback((name: string) => {
    if (!data.objects[name]) return;
    setCtxName(name);
    setShelf("context");
    pushRecentObject(name);
  }, [data.objects]);

  // /neo pages announce the object a reader focused; the shelf answers. Keeps
  // the pages decoupled from the shell and safe for static export.
  useEffect(() => {
    const on = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (typeof name === "string") openObject(name);
    };
    window.addEventListener("neo:nx:object", on as EventListener);
    return () => window.removeEventListener("neo:nx:object", on as EventListener);
  }, [openObject]);

  /* -------------------------------------------------------- keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        changeMode("search");
        return;
      }
      if (meta && e.key.toLowerCase() === "b") {
        e.preventDefault();
        changeMode(mode === "compact" ? "expanded" : "compact");
        return;
      }
      if (e.key === "Escape" && (mode === "search" || mode === "context")) changeMode("expanded");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeMode, mode]);

  useEffect(() => {
    if (mode !== "search") return;
    // Deferred so the spring is not interrupted by the browser scrolling the
    // field into view mid-animation.
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => window.clearTimeout(t);
  }, [mode]);

  const onRailKeyDown = (e: React.KeyboardEvent) => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const list = [...scroll.querySelectorAll<HTMLElement>(".nx-navitem")].filter((b) => b.offsetParent);
    if (!list.length) return;
    const cur = list.indexOf((document.activeElement as HTMLElement)?.closest(".nx-navitem") as HTMLElement);
    let i = cur;
    if (e.key === "ArrowDown") i = cur < 0 ? 0 : Math.min(list.length - 1, cur + 1);
    else if (e.key === "ArrowUp") i = cur < 0 ? list.length - 1 : Math.max(0, cur - 1);
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = list.length - 1;
    else if (e.key === "Escape") { hidePreview(); return; }
    else return;
    e.preventDefault();
    list[i].focus();
    showPreview(list[i], true); // keyboard gets the layer immediately, no delay
  };

  /* ----------------------------------------------------------- render */
  const preview = pvId ? data.previews[pvId] : null;
  const lastForPreview = useMemo(() => {
    if (!preview || preview.kind !== "module") return null;
    const name = recent.find((n) => data.objects[n]?.mods.includes(preview.mod));
    return name ? { name, when: seen[name] ? relTime(seen[name]) : "" } : null;
  }, [preview, recent, data.objects, seen]);

  const ctx = data.contexts[ctxName] || null;
  const crumbGroup = active ? data.groups.find((g) => g.items.some((i) => i.id === active.id)) : null;

  return (
    <div
      ref={appRef}
      className="nx-app"
      data-neo-shell=""
      data-nav={mode}
      data-searching={q && mode === "search" ? "1" : "0"}
    >
      <a href="#main" className="nx-skip">דלג לתוכן</a>

      {/* ------------------------------------------------------- the rail */}
      <aside
        ref={railRef}
        className="nx-rail"
        data-shell="desktop-only"
        data-knowledge-sidebar=""
        aria-label="ניווט ראשי"
      >
        <span className="nx-rail-bg" ref={bgRef} aria-hidden="true" />
        <span className="nx-rail-edge" ref={edgeRef} aria-hidden="true" />

        <div className="nx-rail-head" ref={headRef}>
          <Link prefetch={false} href="/neo/" className="nx-glyph" aria-label="SAP by Sali · Project NEO">
            <i /><i /><i />
          </Link>
          <span className="nx-lock">
            <b>SAP by Sali</b>
            <span>Project NEO</span>
          </span>
          <button
            type="button"
            className="nx-iconbtn nx-collapse"
            aria-label={mode === "compact" ? "הרחב ניווט" : "כווץ ניווט"}
            aria-pressed={mode === "compact"}
            onClick={() => changeMode(mode === "compact" ? "expanded" : "compact")}
          >
            <Ico name="PanelLeft" size={16} />
          </button>
        </div>

        {/* Search grows out of the same slot the quick action lives in, and it
            filters the very list underneath it before it ever escalates. */}
        <div className="nx-rail-cmd" ref={cmdRef}>
          <button type="button" className="nx-railq" onClick={() => changeMode("search")}>
            <span className="nx-railq-i"><Ico name="Search" size={15} /></span>
            <span className="nx-railq-l">חפש בניווט ובמילון</span>
            <kbd>⌘K</kbd>
          </button>
          <div className="nx-railsrch" aria-hidden={mode !== "search"}>
            <div className="nx-srch-f">
              <span className="nx-ico"><Ico name="Search" size={14} /></span>
              <input
                ref={inputRef}
                type="search"
                className="nx-srch-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="טבלה · טרנזקציה · BAPI · ספר"
                aria-label="חיפוש בניווט ובמילון"
                tabIndex={mode === "search" ? 0 : -1}
              />
              <button
                type="button"
                className="nx-iconbtn nx-iconbtn--xs"
                aria-label="סגור חיפוש"
                tabIndex={mode === "search" ? 0 : -1}
                onClick={() => changeMode("expanded")}
              >
                <Ico name="X" size={13} />
              </button>
            </div>
            <p className="nx-srch-meta" aria-live="polite">
              {q ? `${hits} מתוך ${data.navItemCount} פריטי ניווט` : `${data.navItemCount} פריטי ניווט`}
            </p>
            {q ? (
              results.length ? (
                <>
                  <p className="nx-srch-h">רשומות מהמילון</p>
                  <div className="nx-srch-res" role="listbox" aria-label="תוצאות מהמילון">
                    {results.map((r) => (
                      <Link
                        key={`${r.k}-${r.t}`}
                        prefetch={false}
                        href={r.href || "/neo/"}
                        className="nx-railres"
                        role="option"
                        aria-selected={false}
                        onClick={() => { if (r.obj) openObject(r.obj); }}
                      >
                        <span className="nx-railres-k">
                          <Ico name={KIND_ICON[r.k] || "Database"} size={12} />
                          {KIND_HE[r.k]}
                        </span>
                        <span className={`nx-railres-t${r.m ? " nx-sap" : ""}`}>{r.t}</span>
                        <span className="nx-railres-s">{r.s}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="nx-srch-none">אין רשומה במילון עבור &quot;{query}&quot;.</p>
              )
            ) : null}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="nx-rail-scroll"
          tabIndex={0}
          onScroll={onScroll}
          onKeyDown={onRailKeyDown}
          onPointerOver={(e) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>(".nx-navitem");
            if (el) showPreview(el);
          }}
          onPointerOut={(e) => {
            const from = (e.target as HTMLElement).closest(".nx-navitem");
            const to = (e.relatedTarget as HTMLElement | null)?.closest?.(".nx-navitem");
            if (from && !to) hidePreview();
          }}
        >
          <span className="nx-ind" ref={indRef} data-off="1" aria-hidden="true" />
          {data.groups.map((g) => {
            const shown = g.items.filter((i) => !visible || visible.has(i.id));
            const isOpen = open[g.id] !== false;
            return (
              <section key={g.id} className="nx-group" data-open={isOpen} hidden={shown.length === 0}>
                <h3 className="nx-group-h">
                  <button
                    type="button"
                    className="nx-group-btn"
                    data-group={g.id}
                    aria-expanded={isOpen}
                    aria-controls={`nx-grp-${g.id}`}
                    aria-label={`${isOpen ? "כווץ" : "הרחב"} ${g.label}`}
                    onClick={() => toggleGroup(g.id)}
                  >
                    <span className="nx-chev"><Ico name="ChevronDown" size={12} /></span>
                    <span className="nx-t">{g.label}</span>
                    <span className="nx-n">{shown.length}</span>
                  </button>
                </h3>
                <div className="nx-group-body" id={`nx-grp-${g.id}`}>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.id} className="nx-navrow" hidden={!!visible && !visible.has(it.id)}>
                        <Link
                          prefetch={false}
                          href={it.href}
                          className="nx-navitem"
                          data-nav={it.id}
                          data-mod={it.mod}
                          data-hit={it.mod && hitMods.has(it.mod) ? "1" : "0"}
                          style={it.mod ? ({ "--m": modVar(it.mod) } as React.CSSProperties) : undefined}
                          aria-current={active?.id === it.id ? "page" : undefined}
                          title={mode === "compact" ? it.label : undefined}
                          onFocus={(e) => showPreview(e.currentTarget, true)}
                          onBlur={hidePreview}
                        >
                          <span className="nx-navitem-i"><Ico name={it.icon} size={16} /></span>
                          <span className="nx-navitem-l">{it.label}</span>
                          {it.count === null ? (
                            <span className="nx-navitem-n nx-navitem-n--none" title="אין ספירה מגובה בנתוני הפרויקט">—</span>
                          ) : (
                            <span className="nx-navitem-n">{nf.format(it.count)}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="nx-shelf" ref={shelfRef} data-shelf={shelf}>
          <ShelfTabs tab={shelf} onTab={setShelf} tabsRef={shelfTabsRef} indRef={shelfIndRef} />
          {/* All three panes stay mounted and are toggled with `hidden`, exactly
              as the prototype did: going from display:none back to displayed is
              what restarts the single cross-fade keyframe, and it keeps each
              tab's aria-controls pointing at a real element. */}
          <div className="nx-shelf-panes">
            <div className="nx-shelf-pane" id="nx-shelfpane-recent" role="tabpanel" aria-label="אחרונים" hidden={shelf !== "recent"}>
              <RecentPane names={recent} objects={data.objects} seen={seen} onOpen={openObject} />
            </div>
            <div className="nx-shelf-pane" id="nx-shelfpane-pinned" role="tabpanel" aria-label="מוצמדים" hidden={shelf !== "pinned"}>
              <PinnedPane objects={data.objects} onOpen={openObject} />
            </div>
            <div className="nx-shelf-pane" id="nx-shelfpane-context" role="tabpanel" aria-label="הקשר" hidden={shelf !== "context"}>
              <ContextPane ctx={ctx} onOpen={openObject} />
            </div>
          </div>
        </div>

        <div className="nx-rail-foot" ref={footRef}>
          <span className="nx-who">
            <span className="nx-avatar" aria-hidden="true">SH</span>
            <span className="nx-who-t">
              <b>Sali Halif</b>
              <span>Web Coding</span>
            </span>
          </span>
          <button
            type="button"
            className="nx-iconbtn"
            aria-label={mode === "context" ? "חזור לעץ הניווט" : "עבור למצב הקשר"}
            aria-pressed={mode === "context"}
            onClick={() => changeMode(mode === "context" ? "expanded" : "context")}
          >
            <Ico name="Layers" size={16} />
          </button>
        </div>
      </aside>

      {/* Peek: a 14px hit strip. Hovering springs the rail in over the canvas
          without it taking a layout column; clicking commits to expanded. */}
      <button
        type="button"
        className="nx-railedge"
        aria-label="הצג ניווט"
        tabIndex={mode === "peek" ? 0 : -1}
        onClick={() => changeMode("expanded")}
      >
        <i aria-hidden="true" />
      </button>

      {/* -------------------------------------------------------- the main */}
      <div className="nx-main" ref={mainRef}>
        <header className="nx-topbar" data-shell="desktop-only">
          <button
            type="button"
            className="nx-iconbtn"
            aria-label="הצג או הסתר ניווט"
            onClick={() => changeMode(mode === "hidden" || mode === "peek" ? "expanded" : "hidden")}
          >
            <Ico name="PanelLeft" size={16} />
          </button>
          <nav className="nx-crumbs" aria-label="נתיב">
            <Link prefetch={false} href="/neo/">NEO</Link>
            {crumbGroup ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                <span>{crumbGroup.label}</span>
              </>
            ) : null}
            {active ? (
              <>
                <Ico name="ChevronLeft" size={12} />
                <span className="nx-cur">{active.label}</span>
              </>
            ) : null}
          </nav>
          <button type="button" className="nx-cmdbar" onClick={() => changeMode("search")}>
            <Ico name="Search" size={15} />
            <span className="nx-ph">חפש טבלה, טרנזקציה, BAPI, ספר…</span>
            <kbd>⌘K</kbd>
          </button>
          <div className="nx-topbar-tools">
            <button
              type="button"
              className="nx-iconbtn"
              aria-label="מצב הצצה לניווט"
              aria-pressed={mode === "peek"}
              onClick={() => changeMode(mode === "peek" ? "expanded" : "peek")}
            >
              <Ico name="Layers" size={16} />
            </button>
          </div>
        </header>

        <header className="nx-mtop" data-shell="mobile-only">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", blockSize: "100%" }}>
            <span className="nx-glyph" aria-hidden="true"><i /><i /><i /></span>
            <b style={{ fontSize: "var(--t-sm)" }}>{active?.label || "Project NEO"}</b>
          </div>
        </header>

        <main id="main" className="nx-canvas">{children}</main>

        <MobileTabs
          navOpen={sheet}
          searchOpen={mode === "search"}
          onNav={() => setSheet((s) => !s)}
          onSearch={() => { setSheet(false); changeMode("search"); }}
        />
      </div>

      {/* preview host — a single node that stays mounted and only toggles on */}
      <div className="nx-pvhost" ref={pvRef} data-on={pvId ? "1" : "0"} aria-hidden="true">
        {preview ? <PreviewPanel preview={preview} last={lastForPreview} /> : null}
      </div>

      {sheet ? <MobileSheet groups={data.groups} activeId={active?.id ?? null} onClose={() => setSheet(false)} /> : null}
    </div>
  );
}
