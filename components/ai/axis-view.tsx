"use client";

/**
 * Renders the two shapes a directed graph cannot express.
 *
 * TIMELINE is laid out vertically, not horizontally. Hebrew labels are long and
 * a horizontal axis forces either truncation or a scroll region; a vertical
 * spine gives every period the full column width. The spine sits on the right
 * because the document is RTL.
 *
 * SWIMLANE places a step's row by its owner and its column by its position in
 * the flow, so a handoff between owners is visible as a vertical jump — which is
 * the only reason to draw a swimlane instead of a flowchart.
 */

import { useMemo } from "react";
import type { Sequence, Swimlane, Timeline } from "@/lib/ai/timeline";

/* ---------------------------------------------------------------- timeline */

export function TimelineView({ data }: { data: Timeline }) {
  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-hairline bg-surface">
      {data.title && (
        <figcaption className="border-b border-hairline px-3 py-2 text-[0.8125rem] font-semibold text-ink-1">
          {data.title}
        </figcaption>
      )}
      <ol className="relative m-0 list-none p-4 pe-6">
        {/* The spine. Sits on the inline-end edge so it reads right-to-left. */}
        <span aria-hidden className="absolute bottom-4 end-[1.4rem] top-4 w-px bg-hairline" />
        {data.events.map((e, i) => (
          <li key={`${e.period}-${i}`} className="relative pe-6 pb-4 last:pb-0">
            <span
              aria-hidden
              className="absolute end-[1.15rem] top-[0.3rem] size-2 rounded-full bg-[var(--brand,#d62027)] ring-4 ring-[var(--surface,#fff)]"
            />
            <div className="text-[0.8125rem] font-semibold text-ink-1">{e.period}</div>
            {e.items.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {e.items.map((it, j) => (
                  <li key={j} className="text-[0.8125rem] leading-relaxed text-ink-2">
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* --------------------------------------------------------------- swimlane */

const LANE_H = 84;
const COL_W = 168;
const BOX_W = 132;
const BOX_H = 42;
const PAD_X = 108;   // room for the lane label gutter
const PAD_Y = 12;

export function SwimlaneView({ data }: { data: Swimlane }) {
  const layout = useMemo(() => {
    const laneAt = new Map(data.lanes.map((l, i) => [l, i]));
    const incoming = new Map<string, number>();
    for (const s of data.steps) incoming.set(s.id, 0);
    for (const e of data.edges) incoming.set(e.to, (incoming.get(e.to) ?? 0) + 1);

    // Longest-path depth gives the column. Cycles cannot extend a depth twice
    // because a node is only relaxed when its new depth is greater AND it has
    // not been seen this pass — a back-edge in a lifecycle must not loop here.
    const depth = new Map<string, number>();
    for (const s of data.steps) depth.set(s.id, 0);
    for (let pass = 0; pass < data.steps.length; pass++) {
      let moved = false;
      for (const e of data.edges) {
        const d = (depth.get(e.from) ?? 0) + 1;
        if (d > (depth.get(e.to) ?? 0)) { depth.set(e.to, d); moved = true; }
      }
      if (!moved) break;
    }

    const pos = new Map<string, { x: number; y: number }>();
    for (const s of data.steps) {
      const col = depth.get(s.id) ?? 0;
      const row = laneAt.get(s.lane) ?? 0;
      pos.set(s.id, {
        x: PAD_X + col * COL_W + (COL_W - BOX_W) / 2,
        y: PAD_Y + row * LANE_H + (LANE_H - BOX_H) / 2,
      });
    }

    const cols = Math.max(1, ...[...depth.values()].map((d) => d + 1));
    return {
      pos,
      width: PAD_X + cols * COL_W + 16,
      height: PAD_Y * 2 + data.lanes.length * LANE_H,
    };
  }, [data]);

  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-hairline bg-surface">
      {data.title && (
        <figcaption className="border-b border-hairline px-3 py-2 text-[0.8125rem] font-semibold text-ink-1">
          {data.title}
        </figcaption>
      )}
      <div className="overflow-x-auto p-2">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          width={layout.width}
          height={layout.height}
          role="img"
          aria-label={`תרשים מסלולי אחריות${data.title ? `: ${data.title}` : ""}`}
          className="max-w-none"
        >
          <defs>
            <marker id="sw-arrow" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3, #6b7280)" />
            </marker>
          </defs>

          {/* lane bands + labels */}
          {data.lanes.map((lane, i) => (
            <g key={lane}>
              <rect
                x={0} y={PAD_Y + i * LANE_H} width={layout.width} height={LANE_H}
                fill={i % 2 ? "var(--surface-2, #f7f7f8)" : "transparent"}
              />
              <line
                x1={0} x2={layout.width}
                y1={PAD_Y + i * LANE_H} y2={PAD_Y + i * LANE_H}
                stroke="var(--hairline, #e5e7eb)"
              />
              <text
                x={layout.width - 10}
                y={PAD_Y + i * LANE_H + LANE_H / 2}
                textAnchor="end" dominantBaseline="middle"
                fontSize="11" fontWeight="600" fill="var(--ink-2, #374151)"
              >
                {lane}
              </text>
            </g>
          ))}

          {/* edges under the boxes so arrowheads tuck behind the border */}
          {data.edges.map((e, i) => {
            const a = layout.pos.get(e.from);
            const b = layout.pos.get(e.to);
            if (!a || !b) return null;
            const x1 = a.x + BOX_W / 2, y1 = a.y + BOX_H / 2;
            const x2 = b.x + BOX_W / 2, y2 = b.y + BOX_H / 2;
            const mx = (x1 + x2) / 2;
            return (
              <g key={i}>
                <path
                  d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                  fill="none" stroke="var(--ink-3, #6b7280)" strokeWidth="1.25"
                  markerEnd="url(#sw-arrow)"
                />
                {e.label && (
                  <text x={mx} y={(y1 + y2) / 2 - 4} textAnchor="middle"
                    fontSize="10" fill="var(--ink-3, #6b7280)">{e.label}</text>
                )}
              </g>
            );
          })}

          {/* steps */}
          {data.steps.map((s) => {
            const p = layout.pos.get(s.id);
            if (!p) return null;
            return (
              <g key={s.id}>
                <rect
                  x={p.x} y={p.y} width={BOX_W} height={BOX_H} rx={8}
                  fill="var(--surface, #fff)" stroke="var(--brand, #d62027)" strokeWidth="1.25"
                />
                <text
                  x={p.x + BOX_W / 2} y={p.y + BOX_H / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fill="var(--ink-1, #111827)"
                >
                  {s.label.length > 20 ? `${s.label.slice(0, 19)}…` : s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

/* --------------------------------------------------------------- sequence */

const ACTOR_W = 128;
const ACTOR_GAP = 40;
const HEAD_H = 34;
const MSG_H = 46;

/**
 * Actors across the top, time running down, each message an arrow between two
 * lifelines. Laid out RIGHT-TO-LEFT: the first participant sits on the right,
 * because in an RTL document a left-anchored sequence reads backwards.
 */
export function SequenceView({ data }: { data: Sequence }) {
  const cols = data.actors.length;
  const width = cols * ACTOR_W + (cols + 1) * ACTOR_GAP;
  const height = HEAD_H + 16 + data.messages.length * MSG_H + 20;

  // Index 0 on the right.
  const cx = (id: string) => {
    const i = data.actors.indexOf(id);
    const fromRight = i < 0 ? 0 : i;
    return width - (ACTOR_GAP + fromRight * (ACTOR_W + ACTOR_GAP) + ACTOR_W / 2);
  };

  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-hairline bg-surface">
      {data.title && (
        <figcaption className="border-b border-hairline px-3 py-2 text-[0.8125rem] font-semibold text-ink-1">
          {data.title}
        </figcaption>
      )}
      <div className="overflow-x-auto p-2">
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img"
          aria-label={`דיאגרמת רצף${data.title ? `: ${data.title}` : ""}`} className="max-w-none">
          <defs>
            <marker id="sq-arrow" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-3, #6b7280)" />
            </marker>
          </defs>

          {data.actors.map((a) => {
            const x = cx(a);
            const name = data.labels[a] ?? a;
            return (
              <g key={a}>
                <rect x={x - ACTOR_W / 2} y={4} width={ACTOR_W} height={HEAD_H} rx={8}
                  fill="var(--surface-2, #f7f7f8)" stroke="var(--hairline, #e5e7eb)" />
                <text x={x} y={4 + HEAD_H / 2} textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontWeight="600" fill="var(--ink-1, #111827)">
                  {name.length > 16 ? `${name.slice(0, 15)}\u2026` : name}
                </text>
                {/* lifeline */}
                <line x1={x} x2={x} y1={4 + HEAD_H} y2={height - 8}
                  stroke="var(--hairline, #e5e7eb)" strokeDasharray="3 3" />
              </g>
            );
          })}

          {data.messages.map((m, i) => {
            const y = HEAD_H + 30 + i * MSG_H;
            const x1 = cx(m.from), x2 = cx(m.to);
            const mid = (x1 + x2) / 2;
            // A self-message has nowhere to point; draw it as a loop stub.
            if (x1 === x2) {
              return (
                <g key={i}>
                  <path d={`M ${x1} ${y} h 26 v 16 h -26`} fill="none"
                    stroke="var(--ink-3, #6b7280)" strokeWidth="1.25" markerEnd="url(#sq-arrow)" />
                  <text x={x1 + 32} y={y + 4} fontSize="10" fill="var(--ink-2, #374151)">{m.text}</text>
                </g>
              );
            }
            return (
              <g key={i}>
                <text x={mid} y={y - 6} textAnchor="middle" fontSize="10" fill="var(--ink-2, #374151)">
                  {m.text.length > 40 ? `${m.text.slice(0, 39)}\u2026` : m.text}
                </text>
                <line x1={x1} x2={x2} y1={y} y2={y}
                  stroke="var(--ink-3, #6b7280)" strokeWidth="1.25"
                  strokeDasharray={m.dashed ? "5 4" : undefined}
                  markerEnd="url(#sq-arrow)" />
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
