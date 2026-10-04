"use client";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import type { AcademyLessonRow } from "./academy-data";

export function LessonResults({ lessons, query }: { lessons: AcademyLessonRow[]; query: string }) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;
  const rows = lessons.filter((l) => l.hasLesson && tokens.every((t) => `${l.title} ${l.codes.map((c) => c.code).join(" ")}`.toLowerCase().includes(t)));
  return <div className="nxa-lesson-results"><p role="status">{rows.length} שיעורים תואמים</p><ul className="nxa-results">{rows.map((l) => {
    const ref = l.codes.find((r) => tokens.some((t) => r.code.toLowerCase().includes(t)));
    return <li key={l.slug}><Link className="nu-card nxa-result" href={l.href + (ref ? `#nxs-${ref.kind}` : "")} prefetch={false}>
      <span>{l.title}</span>{ref ? <bdi dir="ltr" className="nx-sap">{ref.code}</bdi> : null}
    </Link></li>;
  })}</ul></div>;
}

export function LessonFinder({ lessons }: { lessons: AcademyLessonRow[] }) {
  const [q, setQ] = useState("");
  return <div className="nxa-lesson-finder"><label className="nxl-field"><Search size={16} aria-hidden="true" />
    <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש שיעור או קוד בקורס" aria-label="חיפוש שיעור או קוד בקורס" />
  </label><LessonResults lessons={lessons} query={q} /></div>;
}
