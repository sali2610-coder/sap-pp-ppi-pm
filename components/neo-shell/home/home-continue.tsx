"use client";

import Link from "next/link";
import { ArrowUpLeft, History } from "lucide-react";
import { useMemo } from "react";
import { useRecent } from "../store";
import { useReading } from "../books/reading-state";
import { neoResumeHref } from "../books/links";

type ResumeBook = { id: string; title: string; chapters: { n: number; sections: string[] }[] };

/** Reads Astra's existing stores without creating or changing user history. */
export function HomeContinue({ objects, books }: {
  objects: { name: string; title: string }[];
  books: ResumeBook[];
}) {
  const { names, seen } = useRecent();
  const ids = useMemo(() => books.map((b) => b.id), [books]);
  const reading = useReading(ids);
  const object = names.map((name) => objects.find((o) => o.name === name)).find(Boolean);
  const candidates: { href: string; title: string; code?: string; at: number }[] = [];
  if (object) candidates.push({ href: `/neo/object/${object.name}/`, title: object.title, code: object.name, at: seen[object.name] || 0 });
  for (const book of books) {
    const r = reading.map[book.id];
    if (!r?.opened) continue;
    const owner = r.section ? book.chapters.find((c) => c.sections.includes(r.section!)) : undefined;
    const chapter = owner?.n ?? book.chapters.find((c) => c.n === r.chapter)?.n ?? null;
    if (chapter === null) continue;
    candidates.push({ href: neoResumeHref(book.id, chapter, owner ? r.section : null), title: `${book.title} · פרק ${chapter}`, at: r.at || 0 });
  }
  const last = candidates.sort((a, b) => b.at - a.at)[0];
  if (!last) return null;

  return (
    <section aria-labelledby="nh-resume-h">
      <Link href={last.href} prefetch={false} className="nh-start-card" style={{ "--entry": "var(--brand)" } as React.CSSProperties}>
        <span className="nh-start-icon"><History size={25} strokeWidth={1.6} aria-hidden="true" /></span>
        <span className="nh-start-copy">
          <b id="nh-resume-h">להמשיך מאיפה שהפסקת</b>
          <span>{last.code ? <><b className="nh-sap" dir="ltr">{last.code}</b>{" "}</> : null}<bdi dir="auto">{last.title}</bdi></span>
        </span>
        <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
