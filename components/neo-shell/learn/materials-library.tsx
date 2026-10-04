"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, FolderOpen, Search } from "lucide-react";
import { consumeReturn, OriginLink, restoreScroll, scrollOffset, SmartReturn, useReturnPacket, type OriginArg } from "../nav-context";
import { normalizeSearch } from "../search/build";
import type { SourceIndexChapter } from "./source-data";
import { SourceIndex } from "./source-index";
import { learnModVar } from "./mod";

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
  return <div ref={root} className="nxv nxa-materials" data-surface="academy-materials">
    <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />
    <header className="nxv-head">
      <span className="nx-eyebrow"><FolderOpen size={17} aria-hidden="true" /> תיקיית האקדמיה</span>
      <h1 className="nxv-h1">כל חומרי הלימוד, במקום אחד.</h1>
      <p className="nx-lede">{courses.length} תחומי לימוד · {courses.reduce((n, c) => n + c.chapters.length, 0)} פרקי מקור · {index.length.toLocaleString("he-IL")} נושאים. פותחים פרק, בוחרים נושא וממשיכים ללמוד בתוך NEO.</p>
      <Link className="nu-link" href="/neo/academy/" prefetch={false}>למסלולי השיעורים ולהתקדמות שלי <ArrowLeft size={15} /></Link>
    </header>
    <div className="nxa-material-tools">
      <label className="nxl-field"><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setLimit(PAGE_SIZE); }} aria-label="חיפוש בכל חומרי האקדמיה" placeholder="נושא, טבלה או טרנזקציה — מהאות הראשונה" /></label>
      <div className="nxl-facets" role="group" aria-label="בחירת תחום לימוד">
        <button className="nu-filter" aria-pressed={!moduleId} onClick={() => filterModule("")}>כל התחומים</button>
        {courses.map((c) => <button key={c.id} className="nu-filter" aria-pressed={moduleId === c.id} onClick={() => filterModule(moduleId === c.id ? "" : c.id)}><bdi dir="ltr">{c.module}</bdi></button>)}
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
      <summary><BookOpen size={24} aria-hidden="true" /><span><strong>{c.title}</strong><small>{c.chapters.length} פרקים · {c.chapters.reduce((n, ch) => n + ch.rows.length, 0)} נושאים</small></span><bdi dir="ltr">{c.module}</bdi></summary>
      <SourceIndex title={c.title} chapters={c.chapters} origin={(state) => leaving({ course: c.id, ...state })}
        initialQuery={restored?.state.sourceCourse === c.id && typeof restored.state.sourceQuery === "string" ? restored.state.sourceQuery : ""}
        initialChapters={restored?.state.sourceCourse === c.id && Array.isArray(restored.state.sourceChapters) ? restored.state.sourceChapters : []}
        restoreKey={restored?.at} />
      <OriginLink className="nu-btn2" href={`/neo/academy/${c.id}/`} origin={() => leaving()}>למסלול השיעורים <ArrowLeft size={14} /></OriginLink>
    </details>)}</div>}
  </div>;
}
