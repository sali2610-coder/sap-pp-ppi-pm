"use client";

/* ============================================================================
   PROJECT NEO · ARCHITECTURE STUDIO
   ----------------------------------------------------------------------------
   A working surface for SAP architecture: tables, transactions, BAPIs, IDocs,
   CDS views and Fiori apps, and the relations between them, in nine views
   that each draw a different picture of the same graph.

   WHAT CHANGED (2026-10), AND WHY
     The owner asked for a studio where every control does its job, that fills
     the exact screen at a crisp resolution, goes full screen, and explains
     itself at the side. Measured before the change: the studio was 28px
     taller than the screen (the page scrolled and the legend sat under the
     dock); three views drew the identical picture; the object views drew every
     object of the module whether related or not (106 transactions in one row);
     lines ran straight through the cards; text blurred when zoomed; five
     icon-only tools overlapped in meaning.

     Now:
       · the studio takes the shell's canvas over and is exactly its size;
       · the picture is packed to the stage's own shape (lib/studio-layout.ts)
         and every view is its own picture (./studio-views.ts);
       · the graph is prepared at build time (./studio-data.ts); the browser
         no longer downloads the blueprints' source;
       · the stage draws crisply at rest at any zoom (./studio-stage.tsx);
       · the panel explains the picture, or the selected object
         (./studio-panel.tsx);
       · the tools are few and each says what it does: fit, zoom, 100%, full
         screen, the panel, the keyboard. Reset, presentation and focus mode
         are gone: fit, Escape and full screen do what they did.

   LAYOUT (app/neo/studio.css): the stage on the right, the panel on the left
   (as the ERD), the bar and the credit across both. Under 56rem the panel is a
   drawer; under 40rem the stage and the panel take turns.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard, Maximize, Minimize, Minus, PanelLeftClose, PanelLeftOpen, Plus, Scan, Search, X,
} from "lucide-react";
import type { View } from "../erd/graph";
import type { StudioModule, StudioPayload } from "./studio-data";
import { buildView, graphOf, KIND_HE, VIEWS, VIEW_OF_KIND, type ViewId } from "./studio-views";
import { KindGlyph, S4Glyph, StudioStage, type StageApi } from "./studio-stage";
import { StudioPanel } from "./studio-panel";

const MODULES: StudioModule[] = ["PM", "PP-PI"];
const SKEY = "neo:studio:v2";
const MOD_VAR: Record<StudioModule, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

type ScreenEl = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
type ScreenDoc = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};
const screenEl = () => document.fullscreenElement ?? (document as ScreenDoc).webkitFullscreenElement ?? null;

type Mode = "side" | "drawer" | "phone";

export function StudioView({ data }: { data: StudioPayload }) {
  const [mod, setMod] = useState<StudioModule>("PM");
  const [viewId, setViewId] = useState<ViewId>("tables");
  const G = useMemo(() => graphOf(data[mod]), [data, mod]);
  const firstLayer = useCallback((g: typeof G) => new Set(g.g.zones.length ? [g.g.zones[0].id as string] : []), []);
  const [layers, setLayers] = useState<Set<string>>(() => firstLayer(graphOf(data.PM)));
  const [sel, setSel] = useState<string | null>(null);
  const [iso, setIso] = useState(false);
  const isoBack = useRef<View | null>(null);
  const [panel, setPanel] = useState(true);
  const [mode, setMode] = useState<Mode>("side");
  const modeRef = useRef<Mode>("side");
  const [phonePanel, setPhonePanel] = useState(false);
  const [stageWH, setStageWH] = useState<{ w: number; h: number } | null>(null);
  const [zoomPct, setZoomPct] = useState(100);
  const [full, setFull] = useState(false);
  const [canFull, setCanFull] = useState(false);
  const [coarse, setCoarse] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
  const [q, setQ] = useState("");
  const [qOpen, setQOpen] = useState(false);
  const [qi, setQi] = useState(0);
  const [pending, setPending] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<StageApi>(null);
  const search = useRef<HTMLInputElement>(null);
  const keys = useRef<HTMLDialogElement>(null);

  const view = VIEWS.find((v) => v.id === viewId) ?? VIEWS[0];
  const aspect = stageWH ? Math.min(3, Math.max(0.5, Math.round((stageWH.w / stageWH.h) * 4) / 4)) : 1.25;
  const built = useMemo(() => buildView(view, G, layers, aspect), [view, G, layers, aspect]);
  const drawn = useMemo(() => new Set(built.layout.nodes.map((n) => n.id)), [built]);
  const frameKey = `${mod}|${viewId}|${[...layers].sort().join(",")}|${aspect}`;

  /* -------------------------------------------------------- persistence */
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const s = JSON.parse(sessionStorage.getItem(SKEY) || "null") as { mod?: StudioModule; view?: ViewId; layers?: string[]; sel?: string | null } | null;
      if (!s) return;
      const m = s.mod && MODULES.includes(s.mod) ? s.mod : "PM";
      const v = s.view && VIEWS.some((x) => x.id === s.view) ? s.view : "tables";
      const g = graphOf(data[m]);
      const zs = g.g.zones.map((z) => z.id as string);
      const ls = (s.layers || []).filter((z) => zs.includes(z));
      // an empty list is "all layers"; a list whose zones are gone falls back to the first
      const next = Array.isArray(s.layers) && !s.layers.length ? [] : ls.length ? ls : zs.slice(0, 1);
      // a restored session belongs to the reader (back from a record page, the
      // card is still open); React batches these
      setMod(m); setViewId(v); setLayers(new Set(next));
      if (s.sel && g.byId.has(s.sel)) setSel(s.sel);
    } catch { /* storage refused: the first picture stands */ }
  }, [data]);
  useEffect(() => {
    if (!restored.current) return;
    try { sessionStorage.setItem(SKEY, JSON.stringify({ mod, view: viewId, layers: [...layers], sel })); } catch { /* ignore */ }
  }, [mod, viewId, layers, sel]);

  /* ------------------------------------------------- shape of the screen */
  useEffect(() => {
    const el = root.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const m: Mode = w < 640 ? "phone" : w < 896 ? "drawer" : "side";
      if (m === modeRef.current) return;
      modeRef.current = m;
      setMode(m);
      // the panel stands beside a wide stage, and waits as a drawer on a narrow one
      setPanel(m === "side");
    });
    ro.observe(el);
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => { ro.disconnect(); mq.removeEventListener("change", sync); };
  }, []);

  /* ----------------------------------------------------------- fullscreen */
  useEffect(() => {
    const el = root.current as ScreenEl | null;
    const d = document as ScreenDoc;
    setCanFull(!!(d.fullscreenEnabled || d.webkitFullscreenEnabled) && !!(el?.requestFullscreen || el?.webkitRequestFullscreen));
    const sync = () => setFull(!!el && screenEl() === el);
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => { document.removeEventListener("fullscreenchange", sync); document.removeEventListener("webkitfullscreenchange", sync); };
  }, []);
  const toggleFull = useCallback(async () => {
    const el = root.current as ScreenEl | null;
    const d = document as ScreenDoc;
    if (!el) return;
    try {
      if (screenEl()) await (d.exitFullscreen ?? d.webkitExitFullscreen)?.call(d);
      else await (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el);
    } catch { /* refused by the browser: the button stays as it was */ }
  }, []);

  /* ------------------------------------------------------------ selection */
  const pick = useCallback((id: string) => {
    setIso(false);
    setSel(id);
    if (drawn.has(id)) { stage.current?.centerOn(id); return; }
    // not in the picture: bring it in, then select and centre it
    const n = G.byId.get(id);
    if (!n) return;
    if (n.k === "table") {
      // a table is always in the table map, once its zone is a layer
      const z = n.z as string | undefined;
      if (viewId !== "tables") setViewId("tables");
      if (z) setLayers((s) => (s.size && !s.has(z) ? new Set([...s, z]) : s));
    } else {
      setViewId(VIEW_OF_KIND[n.k]);
      const zs = [...(G.adj.get(id) || [])].map((t) => G.byId.get(t)?.z).filter((z): z is NonNullable<typeof z> => !!z);
      if (zs.length) setLayers((s) => (s.size && !zs.some((z) => s.has(z)) ? new Set([...s, zs[0]]) : s));
    }
    setPending(id);
    if (mode === "phone") setPhonePanel(false);
  }, [drawn, G, viewId, mode]);

  // once the picture holds the pending object, centre on it
  useEffect(() => {
    if (!pending || !drawn.has(pending)) return;
    const id = pending;
    const t = window.setTimeout(() => { stage.current?.centerOn(id); setPending(null); }, 60);
    return () => window.clearTimeout(t);
  }, [pending, drawn]);

  const onStageSize = useCallback((w: number, h: number) => setStageWH((o) => (o && o.w === w && o.h === h ? o : { w, h })), []);

  const select = useCallback((id: string | null) => {
    setSel(id);
    if (!id) setIso(false);
    // the drawer opens over the stage's left; the selection moves into the rest
    if (id && mode === "drawer") { setPanel(true); stage.current?.centerOn(id, 176); }
  }, [mode]);

  const isolate = useCallback((id: string) => {
    setSel(id);
    if (iso && sel === id) {
      setIso(false);
      if (isoBack.current) stage.current?.restore(isoBack.current);
      return;
    }
    const ids = [id, ...[...(G.adj.get(id) || [])].filter((n) => drawn.has(n))];
    const before = stage.current?.frame(ids) ?? null;
    if (!iso) isoBack.current = before;
    setIso(true);
  }, [G.adj, drawn, iso, sel]);

  const escStep = useCallback((): boolean => {
    if (iso) { setIso(false); if (isoBack.current) stage.current?.restore(isoBack.current); return true; }
    if (sel) { setSel(null); return true; }
    return false;
  }, [iso, sel]);

  /* ------------------------------------------------------- module / view */
  const changeModule = (m: StudioModule) => {
    if (m === mod) return;
    const g2 = graphOf(data[m]);
    setMod(m); setSel(null); setIso(false); setLayers(firstLayer(g2)); setQ(""); setPending(null);
  };
  const changeView = (v: ViewId) => { if (v === viewId) return; setViewId(v); setSel(null); setIso(false); };

  /* --------------------------------------------------------------- search */
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return { list: [], more: 0 };
    const hits = G.g.nodes.filter((n) => !n.none && (n.l.toLowerCase().includes(t) || (n.he || "").toLowerCase().includes(t) || (n.en || "").toLowerCase().includes(t)));
    hits.sort((a, b) => Number(drawn.has(b.id)) - Number(drawn.has(a.id)) || Number(b.l.toLowerCase().startsWith(t)) - Number(a.l.toLowerCase().startsWith(t)) || a.l.localeCompare(b.l));
    return { list: hits.slice(0, 8), more: Math.max(0, hits.length - 8) };
  }, [q, G, drawn]);
  const choose = (id: string) => { pick(id); setQ(""); setQOpen(false); search.current?.blur(); };

  /* ------------------------------------------------------------- keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (keys.current?.open) return;
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
      if (e.key === "Escape") {
        if (screenEl()) return;                      // the browser owns Escape in full screen
        if (qOpen && results.list.length) { setQOpen(false); e.preventDefault(); return; }
        if (typing && q) { setQ(""); e.preventDefault(); return; }
        if (escStep()) e.preventDefault();          // consumed: the dock must not act on it too
        return;
      }
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (!root.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (e.key === "/" || e.code === "Slash") { e.preventDefault(); search.current?.focus(); return; }
      if (e.key === "+" || e.key === "=" || e.code === "Equal" || e.code === "NumpadAdd") { e.preventDefault(); stage.current?.zoomBy(1.25); return; }
      if (e.key === "-" || e.code === "Minus" || e.code === "NumpadSubtract") { e.preventDefault(); stage.current?.zoomBy(1 / 1.25); return; }
      if (e.code === "Digit0" || e.code === "Numpad0") { e.preventDefault(); stage.current?.fit(); return; }
      if (e.code === "Digit1" || e.code === "Numpad1") { e.preventDefault(); stage.current?.zoomTo(1); return; }
      if (e.code === "KeyF" && canFull && mode !== "phone") { e.preventDefault(); void toggleFull(); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [canFull, escStep, mode, q, qOpen, results.list.length, toggleFull]);

  /* ---------------------------------------------------------------- layers */
  const zones = G.g.zones;
  const allOn = !layers.size || zones.every((z) => layers.has(z.id));
  const isOn = (z: string) => !layers.size || layers.has(z);
  const zoneCount = (z: string) => G.tables.filter((t) => G.byId.get(t)?.z === z).length;
  const toggleZone = (z: string) => setLayers((s) => {
    const cur = new Set(s.size ? s : zones.map((x) => x.id as string));
    if (cur.has(z)) { if (cur.size === 1) return s; cur.delete(z); } else cur.add(z);
    return cur.size === zones.length ? new Set() : cur;
  });

  const layerBar = view.layers && mode === "phone" ? (
    <div className="nst-layers">
      <label className="nst-cb-label" htmlFor="nst-layer-select">שכבה</label>
      <select id="nst-layer-select" className="nst-layer-select"
        value={allOn ? "*" : layers.size === 1 ? [...layers][0] : "+"}
        onChange={(e) => setLayers(e.target.value === "*" ? new Set() : new Set([e.target.value]))}>
        <option value="*">כל השכבות ({G.tables.length})</option>
        {!allOn && layers.size > 1 ? <option value="+">{layers.size} שכבות</option> : null}
        {zones.map((z) => <option key={z.id} value={z.id}>{z.he} ({zoneCount(z.id)})</option>)}
      </select>
    </div>
  ) : view.layers ? (
    <div className="nst-layers" role="group" aria-label="שכבות: האזורים העסקיים שבתרשים">
      <span className="nst-cb-label">שכבות</span>
      {allOn
        ? <button type="button" className="nu-ghost nst-layer-act" onClick={() => setLayers(firstLayer(G))}>השכבה הראשונה</button>
        : <button type="button" className="nu-ghost nst-layer-act" onClick={() => setLayers(new Set())}>כל השכבות</button>}
      {zones.map((z) => {
        const on = isOn(z.id);
        const last = on && !allOn && layers.size === 1;
        return (
          <button key={z.id} type="button" className="nu-filter nst-zone" aria-pressed={on} aria-disabled={last || undefined}
            title={last ? "שכבה אחת לפחות מוצגת" : undefined} onClick={() => { if (!last) toggleZone(z.id); }}>
            {z.he}<b dir="ltr">{zoneCount(z.id)}</b>
          </button>
        );
      })}
    </div>
  ) : view.id === "eccs4" ? (
    <div className="nst-layers" aria-label="הכרעות S/4HANA">
      {built.verdicts?.map((v) => (
        <span key={String(v.k)} className="nst-verdict-key"><S4Glyph k={v.k} />{v.he}<b dir="ltr">{v.n}</b></span>
      ))}
    </div>
  ) : view.id === "business" ? (
    <p className="nst-cb-note">{built.columns?.length ?? 0} שלבים · {built.layout.nodes.length} טבלאות</p>
  ) : (
    <p className="nst-cb-note">{G.g.master.length} אובייקטי אב · {built.layout.nodes.length} טבלאות</p>
  );

  const empty = !built.layout.nodes.length;
  const emptyLine = view.family === "objects"
    ? `בשכבות שנבחרו אין טבלה עם ${view.objects.map((k) => KIND_HE[k]).join(" או ")} מתועד.`
    : "אין טבלאות בשכבות שנבחרו.";

  const showPanel = mode === "phone" ? phonePanel : panel;

  return (
    <div
      ref={root}
      className="nst"
      data-mode={mode}
      data-full={full ? "1" : undefined}
      data-panel={showPanel ? "1" : undefined}
      data-own-full={canFull && mode !== "phone" ? "1" : undefined}
      style={{ "--m": MOD_VAR[mod] } as React.CSSProperties}
    >
      {/* ------------------------------------------------------------ bar */}
      <header className="nst-bar">
        <h1 className="nst-h1">Architecture Studio</h1>
        <div className="nst-mods" role="group" aria-label="מודול">
          {MODULES.map((m) => (
            <button key={m} type="button" className="nst-mod" aria-pressed={mod === m} onClick={() => changeModule(m)}>{m}</button>
          ))}
        </div>

        <div className="nst-search" data-open={qOpen && q ? "1" : undefined}>
          <Search size={15} strokeWidth={2} aria-hidden="true" />
          <input
            ref={search}
            value={q}
            role="combobox"
            aria-expanded={qOpen && !!q}
            aria-controls="nst-q-list"
            aria-autocomplete="list"
            aria-activedescendant={qOpen && results.list[qi] ? `nst-q-${qi}` : undefined}
            aria-label="חיפוש במודול: טבלה, טרנזקציה, BAPI, CDS או Fiori"
            placeholder="חיפוש במודול: טבלה, טרנזקציה, BAPI, CDS או Fiori"
            onChange={(e) => { setQ(e.target.value); setQOpen(true); setQi(0); }}
            onFocus={() => setQOpen(true)}
            onBlur={() => window.setTimeout(() => setQOpen(false), 120)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setQi((i) => Math.min(results.list.length - 1, i + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setQi((i) => Math.max(0, i - 1)); }
              if (e.key === "Enter" && results.list[qi]) { e.preventDefault(); choose(results.list[qi].id); }
            }}
          />
          {q ? <button type="button" className="nst-x" aria-label="ניקוי החיפוש" onClick={() => { setQ(""); search.current?.focus(); }}><X size={14} /></button> : <kbd className="nst-kbd" aria-hidden="true">/</kbd>}
          {qOpen && q ? (
            <ul className="nst-q" id="nst-q-list" role="listbox" aria-label="תוצאות החיפוש">
              {results.list.map((n, i) => (
                <li key={n.id} id={`nst-q-${i}`} role="option" aria-selected={i === qi}
                  onPointerDown={(e) => { e.preventDefault(); choose(n.id); }} onPointerEnter={() => setQi(i)}>
                  <KindGlyph kind={n.k} />
                  <b className="nx-sap" dir="ltr">{n.l}</b>
                  <span>{n.he || n.en || KIND_HE[n.k]}</span>
                  {!drawn.has(n.id) ? <em>מחוץ לתצוגה{n.z ? ` · ${zones.find((z) => z.id === n.z)?.he ?? ""}` : ""}</em> : null}
                </li>
              ))}
              {!results.list.length ? <li className="nst-q-none" role="presentation">לא נמצא במודול {mod}.</li> : null}
              {results.more ? <li className="nst-q-none" role="presentation">עוד {results.more}</li> : null}
            </ul>
          ) : null}
        </div>

        <div className="nst-tools">
          {canFull ? (
            <button type="button" className="nu-ghost nst-full" onClick={() => void toggleFull()} aria-pressed={full}
              title={full ? "יציאה ממסך מלא · Esc" : "מסך מלא · F"}>
              {full ? <Minimize size={15} strokeWidth={2} aria-hidden="true" /> : <Maximize size={15} strokeWidth={2} aria-hidden="true" />}
              <span className="nst-tool-l">{full ? "יציאה ממסך מלא" : "מסך מלא"}</span>
            </button>
          ) : null}
          {mode === "phone" ? (
            <button type="button" className="nu-ghost nst-explain" aria-pressed={phonePanel} onClick={() => setPhonePanel((v) => !v)}>
              <span>הסבר</span>
            </button>
          ) : (
            <button type="button" className="nu-ghost nst-panel-tg" aria-expanded={panel} aria-controls="nst-panel" onClick={() => setPanel((v) => !v)}
              title={panel ? "הסתרת ההסבר" : "הצגת ההסבר"}>
              {panel ? <PanelLeftClose size={15} strokeWidth={2} aria-hidden="true" /> : <PanelLeftOpen size={15} strokeWidth={2} aria-hidden="true" />}
              <span className="nst-tool-l">{panel ? "הסתרת ההסבר" : "הצגת ההסבר"}</span>
            </button>
          )}
          <button type="button" className="nu-ghost nst-keys-b" onClick={() => keys.current?.showModal()} title="קיצורי מקלדת" aria-label="קיצורי מקלדת">
            <Keyboard size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------- the views */}
      {mode !== "side" ? (
        <div className="nst-tabs is-select">
          <label className="nx-sr" htmlFor="nst-view-select">תצוגה</label>
          <select id="nst-view-select" value={viewId} onChange={(e) => changeView(e.target.value as ViewId)}>
            <optgroup label="מבנה">{VIEWS.filter((v) => v.family === "structure").map((v) => <option key={v.id} value={v.id}>{v.he}</option>)}</optgroup>
            <optgroup label="אובייקטים מקושרים">{VIEWS.filter((v) => v.family === "objects").map((v) => <option key={v.id} value={v.id}>{v.he}</option>)}</optgroup>
          </select>
        </div>
      ) : (
        <nav className="nst-tabs" aria-label="תצוגות הסטודיו">
          {(["structure", "objects"] as const).map((f) => (
            <div key={f} className="nst-tabs-g" role="group" aria-label={f === "structure" ? "מבנה" : "אובייקטים מקושרים"}>
              <span className="nst-tabs-l" aria-hidden="true">{f === "structure" ? "מבנה" : "אובייקטים מקושרים"}</span>
              {VIEWS.filter((v) => v.family === f).map((v) => (
                <button key={v.id} type="button" className="nu-tab nst-tab" aria-pressed={viewId === v.id} data-on={viewId === v.id ? "1" : undefined} title={v.tip} onClick={() => changeView(v.id)}>
                  {v.he}
                </button>
              ))}
            </div>
          ))}
        </nav>
      )}

      {/* ------------------------------------------------------ canvas bar */}
      <div className="nst-cbar">
        <div className="nst-cbar-s">{layerBar}</div>
        <div className="nst-zoom" role="group" aria-label="זום">
          <button type="button" className="nst-zb" onClick={() => stage.current?.zoomBy(1 / 1.25)} title="הקטנה · −" aria-label="הקטנה"><Minus size={15} strokeWidth={2} /></button>
          <button type="button" className="nst-zk" onClick={() => stage.current?.zoomTo(1)} title="לחיצה מחזירה ל-100% · 1" aria-label={`זום ${zoomPct}%. לחיצה מחזירה ל-100%`}>
            <span dir="ltr">{zoomPct}%</span>
          </button>
          <button type="button" className="nst-zb" onClick={() => stage.current?.zoomBy(1.25)} title="הגדלה · +" aria-label="הגדלה"><Plus size={15} strokeWidth={2} /></button>
          <button type="button" className="nst-zb nst-fit" onClick={() => stage.current?.fit()} title="התאמה למסך · 0">
            <Scan size={15} strokeWidth={2} aria-hidden="true" /><span className="nst-tool-l">התאמה למסך</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------- stage */}
      <main className="nst-main" aria-label={`תרשים: ${view.he}, ${mod}`} hidden={mode === "phone" && phonePanel}>
        <StudioStage
          ref={stage}
          G={G}
          viewId={viewId}
          built={built}
          sel={sel}
          iso={iso}
          frameKey={frameKey}
          dockInset={!full}
          coarse={coarse || mode === "phone"}
          onSelect={select}
          onIsolate={isolate}
          onSize={onStageSize}
          onZoom={setZoomPct}
          onBlank={() => { escStep(); }}
        />
        {empty ? (
          <div className="nst-empty">
            <p>{emptyLine}</p>
            <button type="button" className="nu-btn2" onClick={() => setLayers(new Set())}>הצגת כל השכבות</button>
          </div>
        ) : null}
      </main>

      {/* ----------------------------------------------------------- panel */}
      <aside className="nst-panel" id="nst-panel" aria-label={sel ? "פרטי האובייקט הנבחר" : "הסבר התצוגה"} hidden={!showPanel}>
        <StudioPanel
          G={G}
          mod={mod}
          view={view}
          built={built}
          sel={sel}
          iso={iso}
          onPick={pick}
          onClear={() => { setSel(null); setIso(false); }}
          onIsolate={() => { if (sel) isolate(sel); }}
          onCenter={() => { if (sel) stage.current?.centerOn(sel); }}
        />
      </aside>

      {/* The mandatory credit, on the workspace's own bottom line. */}
      <p className="nst-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>

      <dialog ref={keys} className="nst-keys" aria-labelledby="nst-keys-h">
        <header>
          <h2 id="nst-keys-h">קיצורי מקלדת</h2>
          <button type="button" className="nu-ghost" onClick={() => keys.current?.close()} aria-label="סגירה"><X size={15} /></button>
        </header>
        <dl>
          <div><dt><kbd>/</kbd></dt><dd>חיפוש במודול</dd></div>
          <div><dt><kbd>+</kbd> <kbd>−</kbd></dt><dd>הגדלה והקטנה</dd></div>
          <div><dt><kbd>0</kbd></dt><dd>התאמה למסך</dd></div>
          <div><dt><kbd>1</kbd></dt><dd>זום 100%</dd></div>
          <div><dt><kbd>F</kbd></dt><dd>מסך מלא</dd></div>
          <div><dt><kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd></dt><dd>הזזת התרשים (עם Shift: צעד גדול)</dd></div>
          <div><dt><kbd>Tab</kbd></dt><dd>מעבר בין הכרטיסים לפי סדר הקריאה</dd></div>
          <div><dt><kbd>Enter</kbd></dt><dd>בחירת הכרטיס</dd></div>
          <div><dt><kbd>Esc</kbd></dt><dd>צעד אחורה: סגירת החיפוש, יציאה מהתמקדות, ניקוי הבחירה</dd></div>
          <div><dt>גלגלת</dt><dd>הזזה; עם Ctrl או ⌘: זום</dd></div>
        </dl>
      </dialog>
    </div>
  );
}
