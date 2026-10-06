"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen, FolderOpen, Search, X } from "lucide-react";
import { consumeReturn, OriginLink, restoreScroll, scrollOffset, SmartReturn, useReturnPacket, type OriginArg } from "../nav-context";
import { normalizeSearch } from "../search/build";
import type { SourceIndexChapter } from "./source-data";
import { SourceIndex } from "./source-index";
import { learnModVar } from "./mod";
import { CatalogFoot, CatalogHero, Ledger, fmt } from "../data/catalog-kit";
import { AcademySwitch } from "./journey";

export type MaterialCourse = { id: string; title: string; module: string; chapters: SourceIndexChapter[] };
const SURFACE = "neo:academy-materials";
const PAGE_SIZE = 60;

export function MaterialsLibrary({ courses }: { courses: MaterialCourse[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const packet = useReturnPacket(SURFACE);
  const [restored, setRestored] = useState<typeof packet>(null);
  if (packet && packet.at !== restored?.at) {
    setRestored(packet);
    setQuery(typeof packet.state.q === "string" ? packet.state.q : "");
    setModuleId(typeof packet.state.module === "string" ? packet.state.module : "");
    setLimit(typeof packet.state.limit === "number" ? Math.max(PAGE_SIZE, packet.state.limit) : PAGE_SIZE);
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);
  useEffect(() => {
    if (!restored) return;
    let cancel = () => {};
    const frame = requestAnimationFrame(() => {
      root.current?.querySelectorAll<HTMLDetailsElement>("details[data-folder]").forEach((el) => {
        el.open = Array.isArray(restored.state.folders) && restored.state.folders.includes(el.dataset.folder || "");
      });
      cancel = restoreScroll(typeof restored.state.y === "number" ? restored.state.y : 0);
    });
    return () => { cancelAnimationFrame(frame); cancel(); };
  }, [restored]);
  const tokens = normalizeSearch(query).split(" ").filter(Boolean);
  const index = useMemo(() => courses.flatMap((c) => c.chapters.flatMap((ch) => ch.rows.map((r) => ({
    ...r, courseId: c.id, course: c.title, module: c.module, chapter: ch.title,
    hay: normalizeSearch([r.title, ...r.codes, ch.title, c.title, c.module].join(" ")),
  })))), [courses]);
  const hits = index.filter((r) => (!moduleId || r.courseId === moduleId) && tokens.every((t) => r.hay.includes(t)));
  const leaving = (source?: { course: string; q: string; chapters: string[] }): OriginArg => ({
    href: "/neo/academy/materials/", label: "תיקיית האקדמיה", detail: query.trim() || undefined, surface: SURFACE,
    state: { q: query, module: moduleId, limit, y: scrollOffset(),
      folders: [...(root.current?.querySelectorAll<HTMLDetailsElement>("details[data-folder][open]") || [])].map((el) => el.dataset.folder || ""),
      sourceCourse: source?.course || "", sourceQuery: source?.q || "", sourceChapters: source?.chapters || [],
    },
  });
  const filterModule = (id: string) => { setModuleId(id); setLimit(PAGE_SIZE); };
  const topics = index.length;
  const chapterCount = courses.reduce((n, c) => n + c.chapters.length, 0);
  /* THE ACADEMY'S SECOND VIEW (2026-10). The folder is the same tab as the
     learning paths now: the catalogs' hero, the shared view switch, the module
     choice as a facet group, every folder still here with every topic. */
  return <div ref={root} className="nxd nxa nxa-materials nm-scene" data-scene="cream" data-surface="academy-materials">
    <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />
    <CatalogHero
      icon={<FolderOpen size={14} strokeWidth={1.75} aria-hidden="true" />}
      eyebrow="SAP Academy · תיקיית החומרים"
      title="כל חומרי הלימוד, במקום אחד."
      lede={<>{courses.length} תחומי לימוד · {chapterCount} פרקי מקור · {topics.toLocaleString("he-IL")} נושאים. פותחים פרק, בוחרים נושא וממשיכים ללמוד בתוך NEO.</>}
    >
      <Ledger label="התיקייה במספרים" items={[
        { v: courses.length, l: "תחומי לימוד" },
        { v: chapterCount, l: "פרקי מקור" },
        { v: topics, l: "נושאים" },
      ]} />
    </CatalogHero>
    <AcademySwitch at="materials" />
    <div className="nxd-tools nxa-material-tools">
      <label className="nxd-field">
        <Search size={15} strokeWidth={1.75} aria-hidden="true" />
        <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(PAGE_SIZE); }} aria-label="חיפוש בכל חומרי האקדמיה" placeholder="נושא, טבלה או טרנזקציה — מהאות הראשונה" />
        {query ? <button type="button" className="nu-ghost nxd-clear" onClick={() => { setQuery(""); setLimit(PAGE_SIZE); }} aria-label="ניקוי החיפוש"><X size={13} strokeWidth={2} /></button> : null}
      </label>
      <div className="nxd-facet" role="group" aria-label="בחירת תחום לימוד">
        <span className="nxd-facet-l">תחום</span>
        <button type="button" className="nu-filter" aria-pressed={!moduleId} onClick={() => filterModule("")}>כל התחומים</button>
        {courses.map((c) => <button type="button" key={c.id} className="nu-filter" aria-pressed={moduleId === c.id} onClick={() => filterModule(moduleId === c.id ? "" : c.id)}><bdi dir="ltr">{c.module}</bdi></button>)}
      </div>
    </div>
    {tokens.length ? <>
      <p role="status">{hits.length.toLocaleString("he-IL")} נושאים נמצאו · מוצגים {Math.min(limit, hits.length).toLocaleString("he-IL")}</p>
      <ul className="nxa-results" id="academy-material-results">{hits.slice(0, limit).map((r) => <li key={r.href}><OriginLink className="nu-card nxa-result" href={r.href} origin={() => leaving()}>
        <span><b>{r.title}</b><small>{r.course} · {r.chapter}</small></span><ArrowLeft size={16} aria-hidden="true" />
      </OriginLink></li>)}</ul>
      {hits.length > limit ? <button className="nu-btn2 nxa-more" aria-controls="academy-material-results" onClick={() => setLimit((n) => n + PAGE_SIZE)}>הצגת {Math.min(PAGE_SIZE, hits.length - limit)} הנושאים הבאים</button> : null}
      {!hits.length ? <p className="nx-muted">לא נמצאה התאמה. נסה שם נושא אחר או חפש קוד SAP בחיפוש הגלובלי.</p> : null}
    </> : <div className="nxa-folders">{courses.filter((c) => !moduleId || c.id === moduleId).map((c) => <details key={c.id} data-folder={c.id} className="nxa-folder" style={{ "--m": learnModVar(c.module) } as React.CSSProperties}>
      <summary><BookOpen size={22} aria-hidden="true" /><span><strong>{c.title}</strong><small>{c.chapters.length} פרקים · {c.chapters.reduce((n, ch) => n + ch.rows.length, 0)} נושאים</small></span><span className="nxa-mod"><bdi dir="ltr">{c.module}</bdi></span></summary>
      <SourceIndex title={c.title} chapters={c.chapters} origin={(state) => leaving({ course: c.id, ...state })}
        initialQuery={restored?.state.sourceCourse === c.id && typeof restored.state.sourceQuery === "string" ? restored.state.sourceQuery : ""}
        initialChapters={restored?.state.sourceCourse === c.id && Array.isArray(restored.state.sourceChapters) ? restored.state.sourceChapters : []}
        restoreKey={restored?.at} />
      <OriginLink className="nu-btn2" href={`/neo/academy/${c.id}/`} origin={() => leaving()}>למסלול השיעורים <ArrowLeft size={14} /></OriginLink>
    </details>)}</div>}
    <CatalogFoot>
      חומר המקור של {fmt(courses.length)} המסלולים, כפי שנכתב. קריאה בו אינה משנה את ההתקדמות במסלול.
    </CatalogFoot>
  </div>;
}
