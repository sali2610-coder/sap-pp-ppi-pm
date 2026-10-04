"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { OriginLink, type OriginArg } from "../nav-context";
import { normalizeSearch } from "../search/build";
import type { SourceIndexChapter } from "./source-data";

export function SourceIndex({ title, chapters, origin, initialQuery = "", initialChapters = [], restoreKey }: {
  title: string; chapters: SourceIndexChapter[];
  origin?: (state: { q: string; chapters: string[] }) => OriginArg;
  initialQuery?: string; initialChapters?: string[]; restoreKey?: number;
}) {
  const [q, setQ] = useState(initialQuery);
  const [opened, setOpened] = useState(initialChapters);
  const [seed, setSeed] = useState(restoreKey);
  if (restoreKey !== seed) {
    setSeed(restoreKey);
    setQ(initialQuery);
    setOpened(initialChapters);
  }
  const id = useId();
  const tokens = normalizeSearch(q).split(" ").filter(Boolean);
  const matches = (text: string) => tokens.every((t) => normalizeSearch(text).includes(t));
  const rows = chapters.flatMap((ch) => ch.rows.filter((n) => matches(`${n.title} ${n.codes.join(" ")} ${ch.title}`)));
  const link = (href: string, children: React.ReactNode, className?: string) => origin
    ? <OriginLink href={href} className={className} origin={() => origin({ q, chapters: opened })}>{children}</OriginLink>
    : <Link href={href} prefetch={false} className={className}>{children}</Link>;
  return <section className="nxv-sec nxa-source-index" aria-labelledby={id}>
    <div className="nxv-sec-h"><BookOpen size={18} aria-hidden="true" /><h2 className="nx-h2" id={id}>חומר הלימוד המלא · {title}</h2></div>
    <p className="nx-muted">כל פרקי חומר המקור, התהליכים והקודים שבאתר, לצד מסלול השיעורים. קריאת חומר ההרחבה אינה משנה את ההתקדמות בקורס.</p>
    <label className="nxl-field"><Search size={16} aria-hidden="true" /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש נושא או קוד בחומר המלא" aria-label="חיפוש בחומר הלימוד המלא" /></label>
    {tokens.length ? <>
      <p role="status">{rows.length} נושאים נמצאו</p>
      <ul className="nxa-results">{rows.map((row) => <li key={row.href}>{link(row.href, <>
        <span>{row.id} · {row.title}</span><span className="nx-muted">{row.codes.filter((c) => matches(c)).map((c) => <bdi dir="ltr" key={c}>{c}{" "}</bdi>)}</span>
      </>, "nu-card nxa-result")}</li>)}</ul>
    </> : <div className="nxa-source-chapters">{chapters.map((ch) => <details key={ch.n} open={opened.includes(String(ch.n))} onToggle={(e) => {
      const isOpen = e.currentTarget.open;
      setOpened((prev) => isOpen ? (prev.includes(String(ch.n)) ? prev : [...prev, String(ch.n)]) : prev.filter((n) => n !== String(ch.n)));
    }}>
      <summary>{String(ch.n).padStart(2, "0")} · {ch.title}<span className="nx-muted">{ch.rows.length} נושאים</span></summary>
      {link(ch.href, "לקריאת הפרק המלא", "nu-link")}
      <ul>{ch.rows.map((n) => <li key={n.id}>{link(n.href, <>{n.id} · {n.title}</>)}</li>)}</ul>
    </details>)}</div>}
  </section>;
}
