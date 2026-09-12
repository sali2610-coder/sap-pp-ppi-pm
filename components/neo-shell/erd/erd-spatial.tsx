"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpLeft, Box, ChevronRight, CirclePause, CirclePlay, Crosshair, Database, Expand, Layers3, Link2, List, Maximize2, Minimize2, Minus, Orbit, Plus, RotateCcw, Search, X } from "lucide-react";
import { SPATIAL_COLORS, spatialLayout, type SpatialView } from "./erd-spatial-model";
import type { SpatialScene } from "./erd-spatial-scene";
import { S4_TRUST_HE, ZONE_HE, type ErdCatalog, type ModCode } from "./erd-types";

const tint = (m: ModCode) => ({ "--module": SPATIAL_COLORS[m] } as CSSProperties);

export function ErdSpatial({ data, onClassic }: { data: ErdCatalog; onClassic: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<SpatialScene | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const [module, setModule] = useState<ModCode | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [motion, setMotion] = useState(true);
  const [orbit, setOrbit] = useState(true);
  const [links, setLinks] = useState(true);
  const [preset, setPreset] = useState<SpatialView["preset"]>("perspective");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [full, setFull] = useState(false);
  const [portal, setPortal] = useState(false);
  const [modulePanel, setModulePanel] = useState(false);
  const [tableList, setTableList] = useState(false);
  const view = useMemo(() => ({ module, selected, focus, motion, orbit, links, preset }), [module, selected, focus, motion, orbit, links, preset]);
  const currentView = useRef(view);
  const tableMap = useMemo(() => new Map(data.tables.map((t) => [t.n, t])), [data]);
  const active = selected ? tableMap.get(selected) : undefined;
  const activeModule = data.modules.find((m) => m.code === module);
  const layout = useMemo(() => spatialLayout(data, { module, selected, focus }), [data, module, selected, focus]);
  const visibleNames = useMemo(() => new Set(layout.points.keys()), [layout]);
  const visibleEdges = useMemo(() => data.edges.filter((e) => visibleNames.has(e.p) && visibleNames.has(e.c)), [data, visibleNames]);
  const activeEdges = useMemo(() => data.edges.filter((e) => e.p === selected || e.c === selected), [data, selected]);
  const hits = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return data.tables.filter((t) => q ? [t.n, t.he, t.en, ...t.f.flat()].join(" ").toLocaleLowerCase().includes(q) : visibleNames.has(t.n));
  }, [data, query, visibleNames]);

  const pick = useCallback((name: string) => {
    if (!tableMap.has(name)) return;
    setSelected(name); setQuery(""); setTableList(false);
    setModule((current) => current && !data.modules.find((m) => m.code === current)?.core.includes(name) ? null : current);
  }, [data, tableMap]);
  const pickModule = useCallback((code: string | null) => {
    setModule(code as ModCode | null); setSelected(null); setFocus(false); setQuery(""); setTableList(false); setModulePanel(false);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { if (media.matches) { setMotion(false); setOrbit(false); } };
    sync(); media.addEventListener("change", sync); return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => { currentView.current = view; scene.current?.update(view); }, [view]);
  useEffect(() => {
    const host = stage.current;
    if (!host) return;
    let cancelled = false;
    setReady(false); setFailed(false);
    import("./erd-spatial-scene").then(({ createSpatialScene }) => {
      if (cancelled) return;
      try {
        scene.current = createSpatialScene(host, data, currentView.current, pick, pickModule, () => setFailed(true));
        setReady(true);
      } catch { setFailed(true); }
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; scene.current?.dispose(); scene.current = null; };
  }, [data, pick, pickModule, portal]);
  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  useEffect(() => {
    if (!portal) return;
    const previous = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [portal]);
  const fullscreen = async () => {
    if (portal) { setPortal(false); return; }
    if (document.fullscreenElement === root.current) { await document.exitFullscreen(); return; }
    try {
      if (!root.current?.requestFullscreen) { setPortal(true); return; }
      await root.current.requestFullscreen();
    } catch { setPortal(true); }
  };
  const closeDetail = () => { setSelected(null); setFocus(false); scene.current?.reset(); };
  const content = (
    <div ref={root} className={`e3 ${active ? "e3-has-detail" : ""} ${portal ? "e3-full" : ""}`} dir="rtl"
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).matches("input, textarea, select")) {
          if (e.key === "Escape") { setQuery(""); search.current?.blur(); }
          return;
        }
        if (e.key === "Escape") { if (portal) setPortal(false); else closeDetail(); }
        if (e.key === "+" || e.key === "=") scene.current?.zoom(.84);
        if (e.key === "-") scene.current?.zoom(1.18);
        if (e.key === "0") scene.current?.reset();
        if (e.key === "/") { e.preventDefault(); search.current?.focus(); }
      }}>
      <header className="e3-header">
        <div className="e3-brand"><span className="e3-brandmark"><Box size={23} /></span><div><span className="e3-eyebrow" dir="ltr">SAP BY SALI / DATA ARCHITECTURE</span><h1>מפת הנתונים <span>3D</span></h1></div></div>
        <div className="e3-search">
          <Search size={18} aria-hidden="true" />
          <input ref={search} aria-label="חיפוש טבלה או שדה" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="חפש טבלה, שדה או תיאור…" onKeyDown={(e) => { if (e.key === "Enter" && hits[0]) pick(hits[0].n); }} />
          {query ? <button aria-label="ניקוי חיפוש" onClick={() => setQuery("")}><X size={16} /></button> : <kbd>/</kbd>}
          {query.trim() && <div className="e3-search-results" aria-label="תוצאות חיפוש"><p>{hits.length} תוצאות בקטלוג</p>{hits.slice(0, 30).map((t) => <button key={t.n} style={tint(t.m)} onClick={() => pick(t.n)}><b dir="ltr">{t.n}</b><span>{t.he || t.en}</span><em>{t.m}</em></button>)}{!hits.length && <p>לא נמצאה טבלה. נסה שם טכני או תיאור אחר.</p>}</div>}
        </div>
        <div className="e3-header-actions"><button onClick={onClassic} className="e3-button"><Layers3 size={16} /> <span>תרשים 2D</span></button><button className="e3-button e3-present" onClick={fullscreen} aria-label={full || portal ? "יציאה ממסך מלא" : "מסך מלא"}>{full || portal ? <Minimize2 size={19} /> : <Maximize2 size={19} />}<span>{full || portal ? "יציאה" : "מסך מלא"}</span></button></div>
      </header>

      <div className="e3-context"><div><button className="e3-mobile-modules" onClick={() => setModulePanel(!modulePanel)} aria-expanded={modulePanel}><Layers3 size={16} /> מודולים</button><button onClick={() => pickModule(null)}>כל המודולים</button>{activeModule && <><ChevronRight size={14} /><span style={tint(activeModule.code)} className="e3-context-module">{activeModule.code} · {activeModule.he}</span></>}{active && <><ChevronRight size={14} /><b dir="ltr">{active.n}</b></>}</div><span className="e3-count"><b>{visibleNames.size}</b> טבלאות <i /> <b>{visibleEdges.length}</b> קשרים</span></div>

      <div className="e3-stage" ref={stage} tabIndex={0} role="region" aria-label="תצוגת ERD בתלת ממד" />
      {!module && !focus && !active && <p className="e3-map-note">פריסה לפי שיוך ראשי · בחר מודול לצפייה גם בטבלאות המשותפות לו</p>}
      {!ready && !failed && <div className="e3-loading-overlay" role="status"><Box size={36} /><p>מכין את מפת הנתונים…</p></div>}
      {failed && <div className="e3-loading-overlay" role="alert"><Box size={36} /><h2>התצוגה התלת־ממדית אינה זמינה בדפדפן הזה</h2><p>אפשר להמשיך לכל הטבלאות והשדות בתרשים הרגיל.</p><button className="e3-button" onClick={onClassic}>פתיחת תרשים 2D</button></div>}

      <aside className={`e3-modules e3-panel ${modulePanel ? "is-open" : ""}`} aria-label="מודולי SAP">
        <div className="e3-panel-title"><h2>מודולי SAP</h2><span>{data.modules.length}</span></div>
        <button className={`e3-module-all ${module === null ? "is-active" : ""}`} aria-pressed={module === null} onClick={() => pickModule(null)}><Orbit size={18} /><span>המפה המלאה</span><span>{data.stats.tables}</span></button>
        <div className="e3-module-list">{data.modules.map((m) => <button key={m.code} style={tint(m.code)} className={module === m.code ? "is-active" : ""} aria-label={`${m.code} · ${m.he}`} aria-pressed={module === m.code} onClick={() => pickModule(m.code)}><i /><span><b dir="ltr">{m.code}</b><small>{m.he}</small></span><em>{m.core.length}</em></button>)}</div>
        <div className="e3-module-footer"><Database size={14} /> הספירות כוללות טבלאות משותפות</div>
      </aside>

      {active && <aside className="e3-detail e3-panel" aria-label={`פרטי טבלה ${active.n}`} style={tint(active.m)} key={active.n}>
        <div className="e3-detail-head"><span className="e3-module-tag">{active.m}</span><span>{ZONE_HE[active.z] || active.z}</span><button className="e3-icon" onClick={closeDetail} aria-label="סגירת פרטי הטבלה"><X size={18} /></button></div>
        <h2 dir="ltr">{active.n}</h2><p className="e3-detail-name">{active.he || active.en}</p>
        <div className="e3-detail-actions"><button className="e3-button" onClick={() => setFocus(!focus)} aria-pressed={focus}><Crosshair size={16} />{focus ? "חזרה למפה" : "מיקוד בקשרים"}</button>{active.pg === 1 && <Link className="e3-button" href={`/neo/object/${encodeURIComponent(active.n)}/`}>עמוד הטבלה <ArrowUpLeft size={16} /></Link>}</div>
        <div className="e3-detail-body">
          <section><div className="e3-section-title"><h3>שדות הטבלה</h3><span>{active.f.length} מתוך {active.fn}</span></div>
            {active.f.length ? <table className="e3-fields"><thead><tr><th>שדה</th><th>תיאור / סוג</th><th>מפתח</th></tr></thead><tbody>{active.f.map((f) => <tr key={f[0]}><td><code>{f[0]}</code></td><td>{f[2] || f[1] || "לא תועד"}{f[2] && f[1] && <small dir="ltr">{f[1]}</small>}</td><td>{f[3] !== "-" && f[3] ? <span className={`e3-key ${/PK/.test(f[3]) ? "is-pk" : "is-fk"}`}>{f[3]}</span> : <span className="e3-key-none">·</span>}</td></tr>)}</tbody></table> : <p className="e3-note">לא תועדו שדות בקטלוג לתצוגה זו.</p>}
            {active.fn > active.f.length && <p className="e3-note">מוצגים {active.f.length} השדות הכלולים בנתוני ה־ERD. {active.pg ? "המשך בעמוד הטבלה לפרטים נוספים." : "יתר השדות אינם כלולים בנתוני התצוגה."}</p>}
          </section>
          <section><div className="e3-section-title"><h3>קשרים מתועדים</h3><span>{activeEdges.length}</span></div>{activeEdges.length ? activeEdges.map((edge) => {
            const other = edge.p === active.n ? edge.c : edge.p;
            return <div className="e3-relation" key={edge.i}><button onClick={() => pick(other)}><Link2 size={14} /><b dir="ltr">{other}</b><span dir="ltr">{edge.cd || "לא צוין"}</span><ChevronRight size={14} /></button>{edge.ds && <p>{edge.ds}</p>}{edge.j.filter((j) => j.j).map((join, i) => <details key={i}><summary>ניסוח JOIN מתועד</summary><pre dir="ltr">{join.j}</pre>{join.d && <p>{join.d}</p>}</details>)}</div>;
          }) : <p className="e3-note">לא תועדו קשרים לטבלה זו.</p>}</section>
          <section><div className="e3-section-title"><h3>S/4HANA</h3></div>{active.s4v ? <><span className="e3-trust">{S4_TRUST_HE[active.s4v.t]}</span><p>{active.s4v.ch}</p>{active.s4v.nt && <p className="e3-note">{active.s4v.nt}</p>}</> : <p className="e3-note">לא קיים מידע מאומת בפרויקט.</p>}</section>
          {active.ms.length > 1 && <section><h3>מופיעה גם במודולים</h3><div className="e3-memberships">{active.ms.map((m) => <button key={m} style={tint(m)} onClick={() => pickModule(m)}>{m}</button>)}</div></section>}
        </div>
      </aside>}

      <div className="e3-table-picker"><button className="e3-button" aria-expanded={tableList} onClick={() => setTableList(!tableList)}><List size={16} /> רשימת טבלאות <span>{visibleNames.size}</span></button>{tableList && <div className="e3-table-list e3-panel" aria-label="רשימת טבלאות"><div className="e3-panel-title"><h2>בחירת טבלה</h2><button className="e3-icon" onClick={() => setTableList(false)} aria-label="סגירת רשימת טבלאות"><X size={16} /></button></div>{hits.map((t) => <button key={t.n} style={tint(t.m)} aria-label={`הצג שדות ${t.n}`} onClick={() => pick(t.n)}><b dir="ltr">{t.n}</b><span>{t.he || t.en}</span></button>)}</div>}</div>

      <footer className="e3-footer"><div className="e3-hint">גרירה לסיבוב · גלילה לזום · לחיצה לפתיחת שדות</div><div className="e3-controls" role="toolbar" aria-label="שליטה במפה">
        <button className={preset === "perspective" ? "is-active" : ""} onClick={() => setPreset("perspective")} aria-label="מבט מרחבי" aria-pressed={preset === "perspective"}><Box size={18} /><span>מרחבי</span></button>
        <button className={preset === "top" ? "is-active" : ""} onClick={() => setPreset("top")} aria-label="מבט על" aria-pressed={preset === "top"}><Expand size={18} /><span>מבט על</span></button><i />
        <button onClick={() => scene.current?.zoom(.82)} aria-label="התקרבות"><Plus size={18} /></button><button onClick={() => scene.current?.zoom(1.22)} aria-label="התרחקות"><Minus size={18} /></button><button onClick={() => scene.current?.reset()} aria-label="איפוס המבט"><RotateCcw size={17} /></button><i />
        <button className={links ? "is-active" : ""} onClick={() => setLinks(!links)} aria-label={links ? "הסתרת קשרים" : "הצגת קשרים"} aria-pressed={links}><Link2 size={18} /></button>
        <button className={orbit ? "is-active" : ""} onClick={() => { setOrbit(!orbit); if (!orbit) { setMotion(true); setSelected(null); setFocus(false); setPreset("perspective"); } }} aria-label="סיבוב אוטומטי" aria-pressed={orbit}><Orbit size={19} /></button>
        <button className="e3-motion-control" onClick={() => setMotion(!motion)} aria-label={motion ? "השהיית התנועה" : "הפעלת התנועה"}>{motion ? <CirclePause size={19} /> : <CirclePlay size={19} />}<span>{motion ? "השהה" : "הפעל"}</span></button>
      </div><div className="e3-footer-status"><span>{motion ? "תנועה פעילה" : "תנועה מושהית"}</span><small>הנפשת קשרים · ללא חיבור חי ל־SAP</small></div></footer>
    </div>
  );
  return portal ? createPortal(content, document.body) : content;
}
