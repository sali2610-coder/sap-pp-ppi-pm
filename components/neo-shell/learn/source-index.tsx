"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import type { SourceIndexChapter } from "./source-data";

export function SourceIndex({ title, chapters }: { title: string; chapters: SourceIndexChapter[] }) {
  const [q, setQ] = useState("");
  const id = useId();
  const tokens = q.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = (text: string) => tokens.every((t) => text.toLocaleLowerCase().includes(t));
  const rows = chapters.flatMap((ch) => ch.rows.filter((n) => matches(`${n.title} ${n.codes.join(" ")} ${ch.title}`)));
  return <section className="nxv-sec nxa-source-index" aria-labelledby={id}>
    <div className="nxv-sec-h"><BookOpen size={18} aria-hidden="true" /><h2 className="nx-h2" id={id}>חומר הלימוד המלא · {title}</h2></div>
    <p className="nx-muted">כל פרקי חומר המקור, התהליכים והקודים שבאתר, לצד מסלול השיעורים. קריאת חומר ההרחבה אינה משנה את ההתקדמות בקורס.</p>
    <label className="nxl-field"><Search size={16} aria-hidden="true" /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש נושא או קוד בחומר המלא" aria-label="חיפוש בחומר הלימוד המלא" /></label>
    {tokens.length ? <>
      <p role="status">{rows.length} נושאים נמצאו</p>
      <ul className="nxa-results">{rows.map((row) => <li key={row.href}><Link href={row.href} prefetch={false} className="nu-card nxa-result">
        <span>{row.id} · {row.title}</span><span className="nx-muted">{row.codes.filter((c) => matches(c)).map((c) => <bdi dir="ltr" key={c}>{c}{" "}</bdi>)}</span>
      </Link></li>)}</ul>
    </> : <div className="nxa-source-chapters">{chapters.map((ch) => <details key={ch.n}>
      <summary>{String(ch.n).padStart(2, "0")} · {ch.title}<span className="nx-muted">{ch.rows.length} נושאים</span></summary>
      <Link className="nu-link" href={ch.href} prefetch={false}>לקריאת הפרק המלא</Link>
      <ul>{ch.rows.map((n) => <li key={n.id}><Link href={n.href} prefetch={false}>{n.id} · {n.title}</Link></li>)}</ul>
    </details>)}</div>}
  </section>;
}
