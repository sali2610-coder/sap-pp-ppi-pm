"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, FolderOpen, Search } from "lucide-react";
import { SmartReturn } from "../nav-context";
import type { SourceIndexChapter } from "./source-data";
import { SourceIndex } from "./source-index";
import { learnModVar } from "./mod";

export type MaterialCourse = { id: string; title: string; module: string; chapters: SourceIndexChapter[] };

export function MaterialsLibrary({ courses }: { courses: MaterialCourse[] }) {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("");
  const tokens = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const index = useMemo(() => courses.flatMap((c) => c.chapters.flatMap((ch) => ch.rows.map((r) => ({
    ...r, courseId: c.id, course: c.title, module: c.module, chapter: ch.title,
    hay: [r.title, ...r.codes, ch.title, c.title, c.module].join(" ").toLocaleLowerCase(),
  })))), [courses]);
  const hits = index.filter((r) => (!moduleId || r.courseId === moduleId) && tokens.every((t) => r.hay.includes(t)));
  return <div className="nxv nxa-materials" data-surface="academy-materials">
    <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />
    <header className="nxv-head">
      <span className="nx-eyebrow"><FolderOpen size={17} aria-hidden="true" /> תיקיית האקדמיה</span>
      <h1 className="nxv-h1">כל חומרי הלימוד, במקום אחד.</h1>
      <p className="nx-lede">{courses.length} תחומי לימוד · {courses.reduce((n, c) => n + c.chapters.length, 0)} פרקי מקור · {index.length.toLocaleString("he-IL")} נושאים. פותחים פרק, בוחרים נושא וממשיכים ללמוד בתוך NEO.</p>
      <Link className="nu-link" href="/neo/academy/" prefetch={false}>למסלולי השיעורים ולהתקדמות שלי <ArrowLeft size={15} /></Link>
    </header>
    <div className="nxa-material-tools">
      <label className="nxl-field"><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="חיפוש בכל חומרי האקדמיה" placeholder="נושא, טבלה או טרנזקציה — מהאות הראשונה" /></label>
      <div className="nxl-facets" role="group" aria-label="בחירת תחום לימוד">
        <button className="nu-filter" aria-pressed={!moduleId} onClick={() => setModuleId("")}>כל התחומים</button>
        {courses.map((c) => <button key={c.id} className="nu-filter" aria-pressed={moduleId === c.id} onClick={() => setModuleId(moduleId === c.id ? "" : c.id)}><bdi dir="ltr">{c.module}</bdi></button>)}
      </div>
    </div>
    {tokens.length ? <>
      <p role="status">{hits.length.toLocaleString("he-IL")} נושאים נמצאו</p>
      <ul className="nxa-results">{hits.map((r) => <li key={r.href}><Link className="nu-card nxa-result" href={r.href} prefetch={false}>
        <span><b>{r.title}</b><small>{r.course} · {r.chapter}</small></span><ArrowLeft size={16} aria-hidden="true" />
      </Link></li>)}</ul>
      {!hits.length ? <p className="nx-muted">לא נמצאה התאמה. נסה שם נושא אחר או חפש קוד SAP בחיפוש הגלובלי.</p> : null}
    </> : <div className="nxa-folders">{courses.filter((c) => !moduleId || c.id === moduleId).map((c) => <details key={c.id} className="nxa-folder" style={{ "--m": learnModVar(c.module) } as React.CSSProperties}>
      <summary><BookOpen size={24} aria-hidden="true" /><span><strong>{c.title}</strong><small>{c.chapters.length} פרקים · {c.chapters.reduce((n, ch) => n + ch.rows.length, 0)} נושאים</small></span><bdi dir="ltr">{c.module}</bdi></summary>
      <SourceIndex title={c.title} chapters={c.chapters} />
      <Link className="nu-btn2" href={`/neo/academy/${c.id}/`} prefetch={false}>למסלול השיעורים <ArrowLeft size={14} /></Link>
    </details>)}</div>}
  </div>;
}
