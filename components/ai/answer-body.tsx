"use client";

import { createContext, useContext, useMemo } from "react";
import Link from "next/link";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { knownRoutes, type SapKind } from "@/lib/ai-known-routes";
import { isDiagramFence } from "@/lib/ai/diagram";
import { isAxisFence, parseGantt, parseSequence, parseSwimlane, parseTimeline } from "@/lib/ai/timeline";
import { parseAnswerBlocks } from "@/lib/ai/answer-parse";
import { isErdFence, parseErd } from "@/lib/ai/erd";
import { DiagramView } from "./diagram-view";
import { ErdView } from "./erd-view";
import { GanttView, SequenceView, SwimlaneView, TimelineView } from "./axis-view";

/**
 * Long-form renderer for AI answers.
 *
 * Two things make this different from a generic markdown component.
 *
 * 1. SAP identifiers are bidi-isolated. A bare "IW31" or "/SCWM/RF" inside
 *    Hebrew prose gets reordered by the bidi algorithm, so the exact strings
 *    this product exists to deliver arrive scrambled. The site already solves
 *    this with `.tech` (direction:ltr; unicode-bidi:isolate) — that is applied
 *    here rather than reinvented.
 *
 * 2. It reads like the site's own book reader: 74ch measure and 1.85 line
 *    height. Hebrew has no ascender/descender relief, so the loose leading the
 *    reader already uses is not decoration — at 1.6 the eye loses the line on
 *    the return sweep.
 */

// Conservative: T-codes, table/field names, BAPI/FM, namespaced objects.
// Deliberately narrow — a false positive turns a Hebrew word into LTR mono.
const SAP_ID =
  /(\/[A-Z0-9_]{2,}\/[A-Z0-9_]{2,}|BAPI_[A-Z0-9_]+|\b[A-Z]{2,4}\d{1,3}[A-Z]{0,2}\b|\b[A-Z][A-Z0-9_]{3,}\b)/g;

/** Unmistakably an SAP object by shape: T-code, BAPI/FM, or /NAMESPACE/OBJECT. */
const STRICT_ID = /^(\/[A-Z0-9_]{2,}\/[A-Z0-9_]{2,}|BAPI_[A-Z0-9_]+|[A-Z]{2,4}\d{1,3}[A-Z]{0,2})$/;

// Words that look like identifiers but are prose. Without this, ordinary
// English in a Hebrew sentence would be rendered as monospace code.
const NOT_ID = new Set([
  "SAP", "ECC", "ERP", "HANA", "FIORI", "ABAP", "IDOC", "IDOCS", "BAPI", "CDS",
  "NOTE", "NOTES", "TIP", "NOTA", "WARN", "INFO", "SOURCES", "FULL", "PARTIAL",
  "REFUSE", "PDF", "HTML", "JSON", "HTTP", "HTTPS", "URL", "API", "UI", "UX",
  "AND", "THE", "FOR", "WITH", "FROM", "THIS", "THAT", "USER", "DATA", "TYPE",
]);

/**
 * A detected SAP object that NEO actually has a page for becomes a link. One
 * that it does not stays plain monospace — a badge that 404s is worse than no
 * badge, so the route index decides, not a regex.
 */
const KIND_STYLE: Record<SapKind, string> = {
  tcode: "bg-brand-soft text-brand ring-brand/20 hover:bg-brand hover:text-brand-foreground",
  table: "bg-sky-50 text-sky-700 ring-sky-200 hover:bg-sky-700 hover:text-white",
  bapi:  "bg-violet-50 text-violet-700 ring-violet-200 hover:bg-violet-700 hover:text-white",
  cds:   "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-700 hover:text-white",
};

function SapBadge({ id, kind, href }: { id: string; kind: SapKind; href: string }) {
  return (
    <Link
      href={href}
      title={`${kind.toUpperCase()} · ${id}`}
      className={`tech mx-px inline-flex items-baseline rounded-md px-1.5 py-px align-baseline text-[0.82em] font-bold ring-1 transition ${KIND_STYLE[kind]}`}
    >
      {id}
    </Link>
  );
}

/**
 * Maps a citation id to the number shown beside it and the section it links to.
 * A context rather than a prop because Inline is reached through several block
 * renderers, and threading it through each would be noise.
 */
const CiteCtx = createContext<Map<string, { n: number; href?: string | null; title?: string | null }>>(new Map());

/** Splits a line into plain text, bold runs, inline code, SAP ids and citations. */
function Inline({ text }: { text: string }) {
  const routes = useMemo(() => knownRoutes(), []);
  const cites = useContext(CiteCtx);
  const parts = useMemo(() => {
    const out: Array<{ k: "t" | "b" | "c" | "id" | "cite"; v: string }> = [];
    // Citation markers come out FIRST. They are the only token that can legally
    // sit mid-sentence next to punctuation, and splitting on bold/code first
    // would let a marker straddle a chunk boundary and survive as raw "[[".
    const chunks = text
      .split(/(\[\[[^\]]{1,120}\]\])/g)
      .flatMap((seg) => (seg.startsWith("[[") ? [seg] : seg.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)));
    for (const chunk of chunks) {
      if (!chunk) continue;
      if (chunk.startsWith("[[") && chunk.endsWith("]]")) { out.push({ k: "cite", v: chunk.slice(2, -2).trim() }); continue; }
      if (chunk.startsWith("**") && chunk.endsWith("**")) { out.push({ k: "b", v: chunk.slice(2, -2) }); continue; }
      if (chunk.startsWith("`") && chunk.endsWith("`")) { out.push({ k: "c", v: chunk.slice(1, -1) }); continue; }
      let last = 0;
      SAP_ID.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = SAP_ID.exec(chunk)) !== null) {
        const token = m[0];
        if (NOT_ID.has(token.toUpperCase())) continue;
        if (m.index > last) out.push({ k: "t", v: chunk.slice(last, m.index) });
        out.push({ k: "id", v: token });
        last = m.index + token.length;
      }
      if (last < chunk.length) out.push({ k: "t", v: chunk.slice(last) });
    }
    return out;
  }, [text]);

  return (
    <>
      {parts.map((p, i) => {
        if (p.k === "cite") {
          const c = cites.get(p.v);
          // A marker we cannot resolve is dropped, not shown raw. The backend
          // already removes ids it never served; this covers the case where the
          // answer arrives before its citation list is attached.
          if (!c) return null;
          const chip = (
            <sup className="mx-0.5 inline-flex min-w-[1.15em] items-center justify-center rounded-[0.3rem] bg-brand/10 px-1 align-super text-[0.62em] font-bold leading-[1.5] text-brand transition group-hover:bg-brand/20">
              {c.n}
            </sup>
          );
          return c.href
            // New tab, same reasoning as the source cards: an inline citation
            // is a side trip out of the answer, not a way to leave it.
            ? <Link key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                className="group no-underline" title={c.title ?? `מקור ${c.n}`}>{chip}</Link>
            : <span key={i} title={c.title ?? `מקור ${c.n}`}>{chip}</span>;
        }
        if (p.k === "b") return <strong key={i} className="font-bold text-ink-1">{p.v}</strong>;
        if (p.k === "c") return <code key={i} className="tech rounded bg-surface-2 px-1 py-0.5 text-[0.85em]">{p.v}</code>;
        if (p.k === "id") {
          const key = p.v.toUpperCase();
          const href = routes.href.get(key);
          const kind = routes.kind.get(key);
          if (href && kind) return <SapBadge key={i} id={p.v} kind={kind} href={href} />;
          // Not a page we have. Only keep the monospace treatment when the token
          // is unmistakably an SAP object by shape — otherwise an ordinary
          // capitalised English word like PROJECT or REFERENCE would render as
          // code, which is worse than leaving it alone.
          return STRICT_ID.test(p.v)
            ? <span key={i} className="tech font-semibold text-ink-1">{p.v}</span>
            : <span key={i}>{p.v}</span>;
        }
        return <span key={i}>{p.v}</span>;
      })}
    </>
  );
}


const CALLOUT_STYLE = {
  note: { icon: Info, cls: "border-s-2 border-ink-3/30 bg-surface-2/60", ic: "text-ink-3" },
  warn: { icon: TriangleAlert, cls: "border-s-2 border-amber-500 bg-amber-50", ic: "text-amber-600" },
  tip: { icon: Lightbulb, cls: "border-s-2 border-emerald-500 bg-emerald-50", ic: "text-emerald-600" },
} as const;

export function AnswerBody({ text, citations = [], autoPresent = false }: {
  text: string;
  /** Ordered exactly as shown under the answer, so the chip number matches. */
  citations?: { id: string; href?: string | null; title?: string | null }[];
  /** Open the first diagram in presentation mode on mount. */
  autoPresent?: boolean;
}) {
  const blocks = useMemo(() => parseAnswerBlocks(text), [text]);
  // Numbering follows the order the citations are listed under the answer, so
  // chip "2" and the second entry in the source list are the same section.
  const citeMap = useMemo(() => {
    const m = new Map<string, { n: number; href?: string | null; title?: string | null }>();
    citations.forEach((c, i) => m.set(c.id, { n: i + 1, href: c.href, title: c.title }));
    return m;
  }, [citations]);

  return (
    // 74ch matches the site's own reader (globals.css). Beyond it the eye loses
    // the line; the previous full-width layout ran to ~113ch at 1080px.
    <CiteCtx.Provider value={citeMap}>
    <div className="ai-prose max-w-[74ch] space-y-3.5">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return b.level === 2
              ? <h2 key={i} className="pt-2 text-[1.0625rem] font-extrabold leading-snug text-ink-1">{b.text}</h2>
              : <h3 key={i} className="pt-1 text-[0.9375rem] font-bold leading-snug text-ink-1">{b.text}</h3>;

          case "p":
            return <p key={i} className="text-[0.9375rem] leading-[1.85] text-ink-2"><Inline text={b.text} /></p>;

          case "ul":
            return (
              <ul key={i} className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-[0.72em] size-[5px] shrink-0 rounded-full bg-brand/70" />
                    <span className="text-[0.9375rem] leading-[1.75] text-ink-2"><Inline text={it} /></span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="space-y-1.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-[0.28em] flex size-[1.35em] shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.72em] font-bold text-brand">{j + 1}</span>
                    <span className="text-[0.9375rem] leading-[1.75] text-ink-2"><Inline text={it} /></span>
                  </li>
                ))}
              </ol>
            );

          case "code":
            // A flowchart is an output type, not a code sample. DiagramView
            // falls back to showing the source if it cannot lay the graph out,
            // so an unparseable diagram degrades instead of disappearing.
            // Axis shapes first: a timeline and a swimlane carry an axis a
            // directed graph cannot express, so they must not fall through to
            // the flowchart renderer.
            // An ERD is checked before anything else: its relation lines contain
            // `--`, which the flowchart parser reads as an edge. It would draw a
            // plain graph and silently drop the cardinality that is the entire
            // point of the diagram.
            if (isErdFence(b.text, b.lang)) {
              const er = parseErd(b.text);
              if (er) return <ErdView key={i} data={er} />;
              // Unparseable: fall through rather than guess at a model.
            }
            if (isAxisFence(b.text, b.lang)) {
              const tl = parseTimeline(b.text);
              if (tl) return <TimelineView key={i} data={tl} />;
              const sw = parseSwimlane(b.text);
              if (sw) return <SwimlaneView key={i} data={sw} />;
              const sq = parseSequence(b.text);
              if (sq) return <SequenceView key={i} data={sq} />;
              const gt = parseGantt(b.text);
              if (gt) return <GanttView key={i} data={gt} />;
              // Unparseable: fall through to the code block rather than guess.
            }
            return isDiagramFence(b.text, b.lang)
              ? <DiagramView key={i} source={b.text} citations={citations as never} autoPresent={autoPresent} />
              : (
                <pre key={i} className="tech overflow-x-auto rounded-xl bg-surface-2 p-3 text-[0.8125rem] leading-relaxed text-ink-1">
                  <code>{b.text}</code>
                </pre>
              );

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-hairline">
                <table className="w-full border-collapse text-[0.8125rem]">
                  <thead>
                    <tr className="bg-surface-2">
                      {b.head.map((h, j) => (
                        <th key={j} className="border-b border-hairline px-2.5 py-2 text-start font-bold text-ink-1">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="odd:bg-surface even:bg-surface-2/40">
                        {r.map((c, k) => (
                          <td key={k} className="border-b border-hairline px-2.5 py-1.5 align-top text-ink-2">
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "callout": {
            const s = CALLOUT_STYLE[b.kind];
            const Icon = s.icon;
            return (
              <div key={i} className={`flex gap-2.5 rounded-xl px-3 py-2.5 ${s.cls}`}>
                <Icon className={`mt-[0.2em] size-4 shrink-0 ${s.ic}`} />
                <p className="text-[0.875rem] leading-[1.75] text-ink-2"><Inline text={b.text} /></p>
              </div>
            );
          }
        }
      })}
    </div>
    </CiteCtx.Provider>
  );
}
