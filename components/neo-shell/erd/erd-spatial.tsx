"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowUpLeft, Box, ChevronRight, CirclePause, CirclePlay, Crosshair, Database, Expand, Layers3, Link2, List, Maximize2, Minimize2, Minus, Orbit, Plus, RotateCcw, Search, X } from "lucide-react";
import { SPATIAL_COLORS } from "./erd-spatial-model";
import { diagram, groupsFor, s4Changed, s4FieldChanged, stagesFor, type DiagramView as SpatialView } from "./erd-spatial-diagram";
import { isSpatialAnalysis, returnSpatialSelection, selectSpatialTable } from "./erd-spatial-navigation";
import type { SpatialScene } from "./erd-spatial-scene";
import { S4_RISK_HE, S4_TRUST_HE, ZONE_HE, type ErdCatalog, type ModCode } from "./erd-types";

const tint = (m: ModCode) => ({ "--module": SPATIAL_COLORS[m] } as CSSProperties);

export function ErdSpatial({ data, onClassic, initialModule, onModuleChange }: { data: ErdCatalog; onClassic: () => void; initialModule?: ModCode | null; onModuleChange?: (module: ModCode | null) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<SpatialScene | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const [module, setModule] = useState<ModCode | null>(() => initialModule !== undefined ? initialModule : data.modules.some((m) => m.code === "PP-PI") ? "PP-PI" : data.modules[0]?.code ?? null);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [crossModule, setCrossModule] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [motion, setMotion] = useState(true);
  const [orbit, setOrbit] = useState(false);
  const [analysis, setAnalysis] = useState<NonNullable<SpatialView["analysis"]>>("map");
  const [step, setStep] = useState<number | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [filterPanel, setFilterPanel] = useState(false);
  const filterContainer = useRef<HTMLDivElement>(null);
  const returnContext = useRef<SpatialView | null>(null);
  const [playing, setPlaying] = useState(false);
  const [relation, setRelation] = useState<string | null>(null);
  const [links, setLinks] = useState(true);
  const [preset, setPreset] = useState<SpatialView["preset"]>("perspective");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [full, setFull] = useState(false);
  const [portal, setPortal] = useState(false);
  const [modulePanel, setModulePanel] = useState(false);
  const [tableList, setTableList] = useState(false);
  const view = useMemo(() => ({ module, selected, expanded, crossModule, focus, motion, orbit, links, preset, analysis, step, group }), [module, selected, expanded, crossModule, focus, motion, orbit, links, preset, analysis, step, group]);
  const currentView = useRef<SpatialView>(view);
  const tableMap = useMemo(() => new Map(data.tables.map((t) => [t.n, t])), [data]);
  const active = selected ? tableMap.get(selected) : undefined;
  const activeModule = data.modules.find((m) => m.code === module);
  const layout = useMemo(() => diagram(data, view), [data, view]);
  const stages = useMemo(() => stagesFor(data, module), [data, module]);
  const groups = useMemo(() => groupsFor(data, module), [data, module]);
  const currentGroup = groups.find((g) => g.id === group);
  const currentStep = stages.find((s) => s.index === step);
  const selectedRelation = data.edges.find((e) => e.i === relation);
  const chooseAnalysis = (mode: NonNullable<SpatialView["analysis"]>) => {
    returnContext.current = null;
    if (!isSpatialAnalysis(mode)) setGroup(null);
    setAnalysis(mode); setFocus(false); setRelation(null); setPlaying(false); setDetailsOpen(false);
    setExpanded(false); setCrossModule(false); setLinks(true); setStep(null);
    if (!isSpatialAnalysis(mode)) setSelected(null);
  };
  const chooseGroup = (id: string | null) => {
    returnContext.current = null;
    setExpanded(false); setCrossModule(false); setLinks(true);
    setGroup(id); setAnalysis("map"); setSelected(null); setFocus(false); setStep(null); setPlaying(false); setRelation(null); setDetailsOpen(false); setFilterPanel(false); setTableList(false); setQuery("");
  };
  const chooseStep = (index: number | null) => {
    returnContext.current = null;
    setStep(index); setSelected(null); setExpanded(false); setDetailsOpen(false); setRelation(null); setPlaying(false); setLinks(true);
  };
  useEffect(() => { onModuleChange?.(module); }, [module, onModuleChange]);
  useEffect(() => {
    if (!filterPanel) return;
    const close = (event: PointerEvent) => { if (!filterContainer.current?.contains(event.target as Node)) setFilterPanel(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [filterPanel]);
  useEffect(() => {
    if (!playing || !motion || analysis !== "flow" || stages.length < 2) return;
    const timer = window.setInterval(() => setStep((s) => {
      const index = stages.findIndex((item) => item.index === s);
      return stages[(index + 1) % stages.length].index;
    }), 4500);
    return () => window.clearInterval(timer);
  }, [playing, motion, analysis, stages]);
  useEffect(() => {
    root.current?.querySelector<HTMLElement>('.e3-story-steps button[aria-pressed="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: motion ? "smooth" : "instant" });
  }, [step, motion]);
  const visibleNames = useMemo(() => new Set(layout.points.keys()), [layout]);
  const visibleEdges = layout.edges;
  const changedCount = data.tables.filter((t) => visibleNames.has(t.n) && s4Changed(t)).length;
  const activeEdges = useMemo(() => data.edges.filter((e) => e.p === selected || e.c === selected), [data, selected]);
  const hits = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return data.tables.filter((t) => q ? [t.n, t.he, t.en, ...t.f.flat()].join(" ").toLocaleLowerCase().includes(q) : visibleNames.has(t.n));
  }, [data, query, visibleNames]);

  const applyView = useCallback((next: SpatialView) => {
    setModule(next.module); setSelected(next.selected); setExpanded(next.expanded ?? false); setCrossModule(next.crossModule ?? false);
    setAnalysis(next.analysis ?? "map"); setStep(next.step ?? null); setGroup(next.group ?? null); setFocus(next.focus); setLinks(next.links);
  }, []);
  const clearSelection = useCallback(() => {
    applyView(returnSpatialSelection(currentView.current, returnContext.current));
    returnContext.current = null;
    setRelation(null); setDetailsOpen(false); setPlaying(false);
  }, [applyView]);
  const pick = useCallback((name: string) => {
    const current = currentView.current;
    const next = selectSpatialTable(data, current, returnContext.current, name, new Set(diagram(data, current).points.keys()));
    if (!next) return;
    returnContext.current = next.previous;
    applyView(next.view); setDetailsOpen(next.detailsOpen);
    setQuery(""); setTableList(false); setRelation(null); setPlaying(false); setFilterPanel(false);
  }, [data, applyView]);
  const pickModule = useCallback((code: string | null) => {
    returnContext.current = null;
    setExpanded(false); setCrossModule(false); setLinks(true);
    setAnalysis("map"); setStep(null); setGroup(null); setFilterPanel(false); setPlaying(false); setRelation(null);
    setModule(code as ModCode | null); setSelected(null); setFocus(false); setQuery(""); setTableList(false); setModulePanel(false); setDetailsOpen(false);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { if (media.matches) { setMotion(false); setOrbit(false); } };
    sync(); media.addEventListener("change", sync); return () => media.removeEventListener("change", sync);
  }, []);
  useLayoutEffect(() => { currentView.current = view; scene.current?.update(view); }, [view]);
  useEffect(() => {
    const host = stage.current;
    if (!host) return;
    let cancelled = false;
    setReady(false); setFailed(false);
    import("./erd-spatial-scene").then(({ createSpatialScene }) => {
      if (cancelled) return;
      try {
        scene.current = createSpatialScene(host, data, currentView.current, pick, pickModule, () => setFailed(true), setRelation);
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
  const closeDetail = () => setDetailsOpen(false);
  const content = (
    <div ref={root} className={`e3 ${analysis === "flow" ? "e3-flow-mode" : ""} ${layout.direct ? "e3-focus-mode" : ""} ${active && detailsOpen ? "e3-has-detail" : ""} ${portal ? "e3-full" : ""}`} dir="rtl" data-module={module ?? "all"} data-analysis={analysis} data-group={group ?? "all"} data-selected={selected ?? ""}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).matches("input, textarea, select")) {
          if (e.key === "Escape") { setQuery(""); search.current?.blur(); }
          return;
        }
        if (e.key === "Escape") { if (filterPanel) setFilterPanel(false); else if (relation) setRelation(null); else if (selected) clearSelection(); else if (portal) setPortal(false); }
        if (e.key === "+" || e.key === "=") scene.current?.zoom(.84);
        if (e.key === "-") { if (selected) clearSelection(); else scene.current?.zoom(1.18); }
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

      <div className="e3-context"><div><button className="e3-mobile-modules" onClick={() => setModulePanel(!modulePanel)} aria-expanded={modulePanel}><Layers3 size={16} /> מודולים</button><button className="e3-all-modules" onClick={() => pickModule(null)}>כל המודולים</button>{activeModule && <><ChevronRight size={14} /><span style={tint(activeModule.code)} className="e3-context-module">{activeModule.code} · {activeModule.he}</span></>}{active && <><ChevronRight size={14} /><b dir="ltr">{active.n}</b></>}</div>
        <div className="e3-filter-container" ref={filterContainer}>{activeModule && <button className="e3-button e3-filter-toggle" aria-expanded={filterPanel} aria-controls="e3-object-filters" onClick={() => setFilterPanel(!filterPanel)}>מסננים · {currentGroup?.he ?? "הכל"}<ChevronRight size={14} /></button>}
          {filterPanel && <section className="e3-filter-panel e3-panel" id="e3-object-filters" aria-label="סינון לפי נושא או אובייקט עסקי"><div><h2>נושא או אובייקט עסקי</h2><button className="e3-icon" aria-label="סגירת מסננים" onClick={() => setFilterPanel(false)}><X size={16} /></button></div><button className="e3-filter-chip" aria-pressed={!group} onClick={() => chooseGroup(null)}>הכל <small>{activeModule?.core.length}</small></button>{(["object", "topic"] as const).map((kind) => <div className="e3-filter-group" key={kind}><h3>{kind === "object" ? "אובייקטים עסקיים" : "נושאים ותהליכים"}</h3><div>{groups.filter((g) => g.kind === kind).map((g) => <button key={g.id} className="e3-filter-chip" aria-pressed={g.id === group} onClick={() => chooseGroup(g.id)}>{g.he}<small>{g.names.length}</small></button>)}</div></div>)}</section>}
        </div><span className="e3-count"><b>{visibleNames.size}</b> טבלאות <i /> <b>{visibleEdges.length}</b> קשרים</span></div>

      {analysis === "map" && !layout.direct && (activeModule || active) && <section className="e3-selection-note" aria-label="מצב התרשים">
        {active ? <><button className="e3-button" onClick={clearSelection}><Minus size={16} />חזרה לתרשים</button><strong dir="ltr">{active.n}</strong><span>השדות והקשרים של הטבלה</span>{!detailsOpen && <button className="e3-button" onClick={() => setDetailsOpen(true)}>כל הנתונים</button>}</> : currentGroup ? <><strong>{currentGroup.he}</strong><span>{layout.seeds?.size} טבלאות בתהליך · {visibleNames.size - (layout.seeds?.size ?? 0)} קשורות ישירות</span><button onClick={() => chooseGroup(null)}>הצגת הכל</button></> : <><strong>{activeModule ? `כל טבלאות ${activeModule.code}` : "מודולי SAP"}</strong><span>בחר טבלה לזום ולכל השדות · סנן לפי התהליך שמעניין אותך</span></>}
      </section>}

      {analysis === "flow" && <section className="e3-story" aria-label="שלבי הזרימה העסקית">
        <div className="e3-story-heading"><span>שרשרת האובייקטים</span><strong>{currentStep ? `${stages.indexOf(currentStep) + 1} / ${stages.length} · ${currentStep.he}` : "כל השלבים"}</strong><button className="e3-button" aria-pressed={playing} onClick={() => { setPlaying(!playing); if (!playing) { setMotion(true); setLinks(true); if (step === null) setStep(stages[0]?.index ?? null); } }}>{playing ? <CirclePause size={16} /> : <CirclePlay size={16} />}{playing ? "עצור סיור" : "נגן שלבים"}</button></div>
        <div className="e3-story-steps"><button aria-pressed={step === null} onClick={() => chooseStep(null)}>כל השלבים</button>{stages.map((s, i) => <button key={s.index} aria-pressed={step === s.index} onClick={() => chooseStep(s.index)}><span>{i + 1}</span>{s.he}<small>{s.names.length} טבלאות</small></button>)}</div>
        <p>{currentStep ? `${currentStep.names.join(" · ")} · הטבלאות המוארות משתתפות בשלב, ולצדן הקשרים הישירים` : "בחר שלב כדי לרכז את הטבלאות שלו ואת הקשרים הישירים יחד"} · חץ ממקור לטבלה תלויה.</p>
      </section>}
      {layout.direct && active && <section className="e3-focus-story" aria-label={`הקשרים הישירים של ${active.n}`}>
        <div className="e3-focus-heading"><strong>הקשרים של <bdi>{active.n}</bdi></strong><button className="e3-button" onClick={() => setDetailsOpen(!detailsOpen)} aria-expanded={detailsOpen}><List size={15} />כל השדות</button><button className="e3-focus-back" onClick={clearSelection}>חזרה למפה</button></div>
        <div className="e3-dependency-strip">
          <div><span>מקורות <b>{layout.direct.sources.length}</b></span><div>{layout.direct.sources.length ? layout.direct.sources.map((n) => <button key={n} dir="ltr" title={tableMap.get(n)?.he} onClick={() => pick(n)}>{n}{layout.direct?.mutual.includes(n) && <small aria-label="קשר בשני הכיוונים"> ↔</small>}</button>) : <small>אין קשר נכנס מתועד</small>}</div></div>
          <span className="e3-direction" aria-hidden="true">←</span>
          <div className="is-current"><span>הטבלה שנבחרה</span><button dir="ltr" onClick={() => setDetailsOpen(!detailsOpen)} aria-label={`כל השדות של ${active.n}`}>{active.n}</button></div>
          <span className="e3-direction" aria-hidden="true">←</span>
          <div><span>תלויות ישירות <b>{layout.direct.dependents.length}</b></span><div>{layout.direct.dependents.length ? layout.direct.dependents.map((n) => <button key={n} dir="ltr" title={tableMap.get(n)?.he} onClick={() => pick(n)}>{n}{layout.direct?.mutual.includes(n) && <small aria-label="קשר בשני הכיוונים"> ↔</small>}</button>) : <small>אין קשר יוצא מתועד</small>}</div></div>
        </div>
        <p>חץ ממקור לטבלה תלויה · בחר טבלה קשורה כדי לעבור אליה{layout.direct.mutual.length > 0 ? " · ↔ קשרים מתועדים בשני הכיוונים" : ""}</p>
      </section>}
      {isSpatialAnalysis(analysis) && <div className="e3-analysis-note" role="status"><b>{analysis === "impact" ? "מה תלוי בטבלה הזאת?" : analysis === "lineage" ? "מהם המקורות של הטבלה?" : "שרשרת התלויות"}</b>{selected ? <><span><bdi>{selected}</bdi> · {Math.max(0, visibleNames.size - 1)} טבלאות קשורות {crossModule ? "בכל המודולים" : `במודול ${module}`} · חץ ממקור לטבלה תלויה</span><button onClick={clearSelection}>בחירת טבלה אחרת</button><button aria-pressed={crossModule} onClick={() => { returnContext.current = null; setCrossModule(!crossModule); setLinks(true); }}>{crossModule ? "חזרה למודול" : "הרחבה לכל המודולים"}</button><button onClick={() => setDetailsOpen(!detailsOpen)} aria-expanded={detailsOpen}>כל השדות</button></> : <span>בחר טבלה בתרשים כדי להציג {analysis === "impact" ? "את הטבלאות שתלויות בה" : analysis === "lineage" ? "את המקורות שהיא תלויה בהם" : "את המקורות ואת הטבלאות שתלויות בה"}, כולל קשרים עקיפים.</span>}</div>}
      <div className="e3-stage" ref={stage} tabIndex={0} role="region" aria-label="תצוגת ERD בתלת ממד" />
      {!module && !focus && !active && <p className="e3-map-note">בחר מודול לפתיחת תרשים עם טבלאות, שדות וקשרים</p>}
      {!ready && !failed && <div className="e3-loading-overlay" role="status"><Box size={36} /><p>מכין את מפת הנתונים…</p></div>}
      {failed && <div className="e3-loading-overlay" role="alert"><Box size={36} /><h2>התצוגה התלת־ממדית אינה זמינה בדפדפן הזה</h2><p>אפשר להמשיך לכל הטבלאות והשדות בתרשים הרגיל.</p><button className="e3-button" onClick={onClassic}>פתיחת תרשים 2D</button></div>}

      <aside className={`e3-modules e3-panel ${modulePanel ? "is-open" : ""}`} aria-label="מודולי SAP">
        <div className="e3-panel-title"><h2>מודולי SAP</h2><span>{data.modules.length}</span></div>
        <button className={`e3-module-all ${module === null ? "is-active" : ""}`} aria-pressed={module === null} onClick={() => pickModule(null)}><Orbit size={18} /><span>המפה המלאה</span><span>{data.stats.tables}</span></button>
        <div className="e3-module-list">{data.modules.map((m) => <button key={m.code} style={tint(m.code)} className={module === m.code ? "is-active" : ""} aria-label={`${m.code} · ${m.he}`} aria-pressed={module === m.code} onClick={() => pickModule(m.code)}><i /><span><b dir="ltr">{m.code}</b><small>{m.he}</small></span><em>{m.core.length}</em></button>)}</div>
        <div className="e3-module-footer"><Database size={14} /> הספירות כוללות טבלאות משותפות</div>
      </aside>

      {active && detailsOpen && <aside className="e3-detail e3-panel" aria-label={`פרטי טבלה ${active.n}`} style={tint(active.m)} key={active.n}>
        <div className="e3-detail-head"><span className="e3-module-tag">{active.m}</span><span>{ZONE_HE[active.z] || active.z}</span><button className="e3-icon" onClick={closeDetail} aria-label="סגירת פרטי הטבלה"><X size={18} /></button></div>
        <h2 dir="ltr">{active.n}</h2><p className="e3-detail-name">{active.he || active.en}</p>
        <div className="e3-detail-actions"><button className="e3-button" onClick={() => { setFocus(!focus); setExpanded(false); setAnalysis("map"); setStep(null); setPlaying(false); setLinks(true); }} aria-pressed={focus}><Crosshair size={16} />{focus ? "חזרה למפה" : "מיקוד בקשרים"}</button>{active.pg === 1 && <Link className="e3-button" href={`/neo/object/${encodeURIComponent(active.n)}/`}>עמוד הטבלה <ArrowUpLeft size={16} /></Link>}</div>
        <div className="e3-detail-body">
          <section className={`e3-s4-detail ${s4Changed(active) ? "has-changes" : ""}`} aria-label="שינויים ב־S/4HANA">
            <div className="e3-section-title"><h3>S/4HANA{ s4Changed(active) ? " · מה השתנה" : ""}</h3>{active.s4v && <span>{S4_RISK_HE[active.s4v.r]}</span>}</div>
            {active.s4v ? <><span className="e3-trust">{S4_TRUST_HE[active.s4v.t]}</span><p>{active.s4v.ch}</p>{active.s4v.wy && <p>{active.s4v.wy}</p>}{active.s4v.fl.length > 0 && <div className="e3-s4-field-tags" aria-label="שדות שהושפעו">{active.s4v.fl.map((field) => <code key={field}>{field}</code>)}</div>}{active.s4a && <p><b>חלופה: </b>{active.s4a}</p>}{active.s4v.nt && <p className="e3-note">{active.s4v.nt}</p>}</> : <p className="e3-note">לא קיים מידע מאומת בפרויקט.</p>}
          </section>
          <section><div className="e3-section-title"><h3>שדות הטבלה</h3><span>{active.f.length} מתוך {active.fn}</span></div>
            {active.f.length ? <table className="e3-fields"><thead><tr><th>שדה</th><th>תיאור / סוג</th><th>מפתח</th></tr></thead><tbody>{active.f.map((f) => <tr key={f[0]} className={s4FieldChanged(active,f[0]) ? "is-s4-changed" : ""}><td><code>{f[0]}</code>{s4FieldChanged(active,f[0]) && <small className="e3-s4-field-label">S/4 · שינוי</small>}</td><td>{f[2] || f[1] || "לא תועד"}{f[2] && f[1] && <small dir="ltr">{f[1]}</small>}</td><td>{f[3] !== "-" && f[3] ? <span className={`e3-key ${/PK/.test(f[3]) ? "is-pk" : "is-fk"}`}>{f[3]}</span> : <span className="e3-key-none">·</span>}</td></tr>)}</tbody></table> : <p className="e3-note">לא תועדו שדות בקטלוג לתצוגה זו.</p>}
            {active.fn > active.f.length && <p className="e3-note">מוצגים {active.f.length} השדות הכלולים בנתוני ה־ERD. {active.pg ? "המשך בעמוד הטבלה לפרטים נוספים." : "יתר השדות אינם כלולים בנתוני התצוגה."}</p>}
          </section>
          <section><div className="e3-section-title"><h3>קשרים מתועדים</h3><span>{activeEdges.length}</span></div>{activeEdges.length ? activeEdges.map((edge) => {
            const other = edge.p === active.n ? edge.c : edge.p;
            return <div className="e3-relation" key={edge.i}><small className="e3-relation-role">{edge.p === active.n ? "תלויה בטבלה הזאת" : "מקור לטבלה הזאת"}</small><button onClick={() => pick(other)}><Link2 size={14} /><b dir="ltr">{other}</b><span dir="ltr">{edge.cd || "לא צוין"}</span><ChevronRight size={14} /></button>{edge.ds && <p>{edge.ds}</p>}{edge.j.filter((j) => j.j).map((join, i) => <details key={i}><summary>ניסוח JOIN מתועד</summary><pre dir="ltr">{join.j}</pre>{join.d && <p>{join.d}</p>}</details>)}</div>;
          }) : <p className="e3-note">לא תועדו קשרים לטבלה זו.</p>}</section>
          {(active.tc.length > 0 || active.cds.length > 0) && <section><h3>גישה לנתונים</h3>{active.tc.length > 0 && <p>טרנזקציות: <bdi>{active.tc.join(" · ")}</bdi></p>}{active.cds.length > 0 && <p>תצוגות CDS: <bdi>{active.cds.join(" · ")}</bdi></p>}</section>}
          {active.ms.length > 1 && <section><h3>מופיעה גם במודולים</h3><div className="e3-memberships">{active.ms.map((m) => <button key={m} style={tint(m)} onClick={() => pickModule(m)}>{m}</button>)}</div></section>}
        </div>
      </aside>}

      <div className="e3-table-picker"><button className="e3-button" aria-expanded={tableList} onClick={() => setTableList(!tableList)}><List size={16} /> רשימת טבלאות <span>{visibleNames.size}</span></button>{tableList && <div className="e3-table-list e3-panel" aria-label="רשימת טבלאות"><div className="e3-panel-title"><h2>בחירת טבלה</h2><button className="e3-icon" onClick={() => setTableList(false)} aria-label="סגירת רשימת טבלאות"><X size={16} /></button></div>{hits.map((t) => <button key={t.n} style={tint(t.m)} aria-label={`הצג שדות ${t.n}`} onClick={() => pick(t.n)}><b dir="ltr">{t.n}</b><span>{t.he || t.en}</span></button>)}</div>}</div>

      {selectedRelation && <aside className="e3-relation-popover e3-panel" aria-label="הסבר הקשר" role="region"><button className="e3-icon" onClick={() => setRelation(null)} aria-label="סגירת הסבר הקשר"><X size={18} /></button><span>קשר מתועד · {selectedRelation.cd || "עוצמה לא צוינה"}</span><h3 dir="ltr">{selectedRelation.p} → {selectedRelation.c}</h3><p>{selectedRelation.ds || "לא תועד תיאור נוסף לקשר הזה."}</p>{selectedRelation.j.filter((j) => j.j).map((j, i) => <pre dir="ltr" key={i}>{j.j}</pre>)}<div><button className="e3-button" onClick={() => pick(selectedRelation.p)}>פתח {selectedRelation.p}</button><button className="e3-button" onClick={() => pick(selectedRelation.c)}>פתח {selectedRelation.c}</button></div></aside>}
      <footer className="e3-footer"><div className="e3-lenses" role="group" aria-label="שאלות על התרשים">{([
          ["map", "מפת המודול"], ["flow", "זרימה עסקית"], ["impact", "השפעה"], ["lineage", "מקורות"], ["dep", "תלויות"]
        ] as const).map(([id, label]) => <button key={id} aria-pressed={analysis === id} disabled={id === "flow" ? stages.length === 0 : id !== "map" && !module && !selected} title={id === "flow" && stages.length === 0 ? "בחר מודול עם שרשרת אובייקטים מתועדת" : id !== "map" && !module && !selected ? "בחר מודול תחילה" : label} onClick={() => chooseAnalysis(id)}>{label}</button>)}</div><div className="e3-controls" role="toolbar" aria-label="שליטה במפה">
        <button className={preset === "perspective" ? "is-active" : ""} onClick={() => setPreset("perspective")} aria-label="מבט מרחבי" aria-pressed={preset === "perspective"}><Box size={18} /><span>מרחבי</span></button>
        <button className={preset === "top" ? "is-active" : ""} onClick={() => setPreset("top")} aria-label="מבט ישר" aria-pressed={preset === "top"}><Expand size={18} /><span>מבט ישר</span></button><i />
        <button onClick={() => scene.current?.zoom(.82)} aria-label="התקרבות"><Plus size={18} /></button><button onClick={() => selected ? clearSelection() : scene.current?.zoom(1.22)} aria-label={selected ? "התרחקות וחזרה לתרשים" : "התרחקות"}><Minus size={18} />{selected && <span>חזרה</span>}</button><button onClick={() => scene.current?.reset()} aria-label="התאמת התרשים למסך" title="התאמת התרשים למסך"><RotateCcw size={17} /><span>התאמה למסך</span></button><i />
        <button className={links ? "is-active" : ""} onClick={() => setLinks(!links)} aria-label={links ? "הסתרת קשרים" : "הצגת קשרים"} aria-pressed={links}><Link2 size={18} /><span>{links ? "קשרים מוצגים" : "קשרים מוסתרים"}</span></button>
        <button className="e3-motion-control" onClick={() => setMotion(!motion)} aria-label={motion ? "השהיית תנועת החצים" : "הפעלת תנועת החצים"} aria-pressed={motion}>{motion ? <CirclePause size={19} /> : <CirclePlay size={19} />}<span>{motion ? "השהה חצים" : "הנפש חצים"}</span></button>
      </div><div className="e3-s4-legend"><b>S/4 Δ</b><span>{changedCount} טבלאות עם שינוי מתועד</span><small>תג ״חלקי״ מציין מידע שדורש אימות</small></div></footer>
    </div>
  );
  return portal ? createPortal(content, document.body) : content;
}
