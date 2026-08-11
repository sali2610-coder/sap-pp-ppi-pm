"use client";

import { useMemo, useState } from "react";
import { CARD_HE, CARD_SHORT, type Cardinality, type Erd } from "@/lib/ai/erd";
import {
  BADGE_W, FONT, HEADER_H, PAD_X, ROW_H,
  FOOT_SPAN, clip, footGeometry, layoutErd, tw,
} from "@/lib/ai/erd-layout";
import { DiagramFrame } from "./diagram-frame";

/**
 * Renders an entity-relationship model as real SVG, in crow's foot notation.
 *
 * The flowchart renderer could already draw boxes joined by lines, which is why
 * an ERD looked supported. It was not. A plain line says two tables are
 * related; it cannot say whether one material has many plants, exactly one, or
 * none — which is the entire reason to draw an ERD instead of listing tables.
 *
 * Crow's foot rather than UML multiplicity because it is what database tooling
 * and SAP data models use, and because the notation is legible at a glance:
 * the fork means many, the bar means one, the circle means optional.
 *
 * Layout is dagre, already a dependency. Everything drawn is plain SVG, so
 * export, print and zoom come from DiagramFrame for free and no diagramming
 * library ships to the browser — which the offline constraint requires anyway.
 */



/**
 * SVG has no `dir="auto"`, only an explicit `direction`. Relationship labels are
 * Hebrew prose that often contains a Latin SAP term, so a fixed direction gets
 * one of the two cases wrong. This resolves direction the way `auto` does: by
 * the first strong character.
 */
/**
 * Shortens a relationship label to the space between the two feet.
 *
 * Returns "" when even an ellipsis would not fit — the notation still states
 * the relationship, so dropping the wording loses far less than covering a
 * cardinality mark would. The full text stays available as a tooltip.
 */
function fit(label: string, maxW: number): string {
  if (!label || maxW < 24) return "";
  if (tw(label, 10.5) <= maxW) return label;
  let n = label.length;
  while (n > 1 && tw(label.slice(0, n) + "…", 10.5) > maxW) n--;
  return n > 1 ? label.slice(0, n) + "…" : "";
}

const dirOf = (s: string): "rtl" | "ltr" =>
  /[֐-׿]/.test(String(s ?? "").replace(/^[^\p{L}]*/u, "").charAt(0)) ? "rtl" : "ltr";

/**
 * One end of a relationship. The geometry — which marks appear and where — lives
 * in erd-layout so it can be asserted in a test; this only paints it.
 */
function Foot({ card, p, ux, uy, colour }: {
  card: Cardinality;
  p: { x: number; y: number };
  ux: number; uy: number;
  colour: string;
}) {
  const { prongs, bar, circle } = footGeometry(card, p, ux, uy);
  const stroke = { stroke: colour, strokeWidth: 1.5, fill: "none" as const };
  return (
    <g aria-hidden>
      {prongs.map((l, i) => <line key={`f${i}`} {...l} {...stroke} />)}
      {bar && <line {...bar} {...stroke} />}
      {/* Filled with the page surface, not left transparent: the relationship
          line runs underneath and would otherwise strike through the circle. */}
      {circle && <circle {...circle} {...stroke} fill="var(--surface)" />}
    </g>
  );
}

export function ErdView({ data }: { data: Erd }) {
  const { placed, width, height } = useMemo(() => layoutErd(data), [data]);
  // Selecting an entity dims everything it is not related to. On a model with
  // twenty tables that is the difference between a picture and an answer.
  const [sel, setSel] = useState<string | null>(null);

  const related = useMemo(() => {
    if (!sel) return null;
    const s = new Set<string>([sel]);
    for (const r of data.relations) {
      if (r.from === sel) s.add(r.to);
      if (r.to === sel) s.add(r.from);
    }
    return s;
  }, [sel, data.relations]);

  const usedCards = useMemo(() => {
    const s = new Set<Cardinality>();
    for (const r of data.relations) { s.add(r.fromCard); s.add(r.toCard); }
    return [...s];
  }, [data.relations]);

  const legendH = 34;
  const title = data.title || "מודל ישויות";

  return (
    <DiagramFrame title={title} ariaLabel={`תרשים ישויות: ${title}`}>
      <svg
        width={width}
        height={height + legendH}
        viewBox={`0 0 ${width} ${height + legendH}`}
        role="img"
        aria-label={`תרשים ישויות וקשרים: ${data.entities.length} ישויות, ${data.relations.length} קשרים`}
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <title>{title}</title>

        {/* Relationships first, so entity boxes paint over the line ends. */}
        {data.relations.map((r, i) => {
          const a = placed.get(r.from), b = placed.get(r.to);
          if (!a || !b) return null;

          const dim = related && !(related.has(r.from) && related.has(r.to)) ? 0.15 : 1;
          const colour = dim < 1 ? "var(--ink-3)" : "var(--ink-2)";
          const dash = r.identifying ? undefined : "5 4";

          if (r.from === r.to) {
            // Self-relationship: a loop over the top edge. Both feet point up.
            const lx = a.x - 22, rx = a.x + 22, top = a.y - a.h / 2;
            const up = top - 46;
            return (
              <g key={i} opacity={dim}>
                <path d={`M${lx} ${top} L${lx} ${up} L${rx} ${up} L${rx} ${top}`}
                  fill="none" stroke={colour} strokeWidth={1.5} strokeDasharray={dash} />
                <Foot card={r.fromCard} p={{ x: lx, y: top }} ux={0} uy={-1} colour={colour} />
                <Foot card={r.toCard} p={{ x: rx, y: top }} ux={0} uy={-1} colour={colour} />
                {r.label && (
                  <text x={a.x} y={up - 6} textAnchor="middle" fontSize={10.5}
                    fill="var(--ink-3)" direction={dirOf(r.label)}>{r.label}</text>
                )}
              </g>
            );
          }

          const pa = clip(a.x, a.y, a.w, a.h, b.x, b.y);
          const pb = clip(b.x, b.y, b.w, b.h, a.x, a.y);
          const dx = pb.x - pa.x, dy = pb.y - pa.y;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len, uy = dy / len;
          const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
          // The plate is opaque, so it must never be wide enough to sit on top
          // of a marker: a hidden circle turns "zero or many" into "many", which
          // is a different data model rather than a cosmetic loss. The label is
          // clamped to the gap that the two feet leave between them.
          const free = Math.max(0, len - FOOT_SPAN * 2);
          const label = fit(r.label ?? "", free - 10);
          const labelW = label ? tw(label, 10.5) + 10 : 0;
          const showLabel = label.length > 0;

          return (
            <g key={i} opacity={dim}>
              <line x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={colour} strokeWidth={1.5} strokeDasharray={dash} />
              {showLabel && (
                <>
                  {/* Plate before the feet: on a short edge the marker wins. */}
                  <rect x={mx - labelW / 2} y={my - 9} width={labelW} height={16} rx={4}
                    fill="var(--surface)" stroke="var(--hairline)" strokeWidth={0.75} />
                  <text x={mx} y={my + 2.5} textAnchor="middle" fontSize={10.5}
                    fill="var(--ink-2)" direction={dirOf(label)}>{label}</text>
                </>
              )}
              {/* Each foot describes the entity it touches, so the vector points
                  away from that entity in both cases. Drawn last so the notation
                  is never obscured by a label. */}
              <Foot card={r.fromCard} p={pa} ux={ux} uy={uy} colour={colour} />
              <Foot card={r.toCard} p={pb} ux={-ux} uy={-uy} colour={colour} />
              {/* Too tight to letter: the relationship still reads from the
                  notation, and a title gives the label back on hover. */}
              {r.label && !showLabel && <title>{r.label}</title>}
            </g>
          );
        })}

        {/* Entities */}
        {[...placed.values()].map(({ e, x, y, w, h }) => {
          const left = x - w / 2, top = y - h / 2;
          const dim = related && !related.has(e.name) ? 0.2 : 1;
          const isSel = sel === e.name;
          return (
            <g key={e.name} opacity={dim}
              role="button"
              tabIndex={0}
              aria-pressed={isSel}
              aria-label={`ישות ${e.name}, ${e.attributes.length} שדות`}
              style={{ cursor: "pointer" }}
              onClick={() => setSel((s) => (s === e.name ? null : e.name))}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setSel((s) => (s === e.name ? null : e.name));
                }
              }}
            >
              <rect x={left} y={top} width={w} height={h} rx={9}
                fill="var(--surface)"
                stroke={isSel ? "var(--brand)" : "var(--hairline)"}
                strokeWidth={isSel ? 2 : 1} />
              {/* Header */}
              <path d={`M${left} ${top + 9} a9 9 0 0 1 9 -9 h${w - 18} a9 9 0 0 1 9 9 v${HEADER_H - 9} h${-w} Z`}
                fill={isSel ? "var(--brand-soft)" : "var(--surface-2)"} />
              <line x1={left} y1={top + HEADER_H} x2={left + w} y2={top + HEADER_H}
                stroke="var(--hairline)" strokeWidth={1} />
              <text x={left + w / 2} y={top + 20} textAnchor="middle" fontSize={13}
                fontWeight={700} fill={isSel ? "var(--brand-dark)" : "var(--ink-1)"}>{e.name}</text>

              {e.attributes.map((a, j) => {
                const ry = top + HEADER_H + 6 + j * ROW_H + 14;
                let bx = left + PAD_X + tw(a.name) + 6;
                const badges: React.ReactNode[] = [];
                for (const [flag, on] of [["PK", a.pk], ["FK", a.fk]] as const) {
                  if (!on) continue;
                  badges.push(
                    <g key={flag}>
                      <rect x={bx} y={ry - 9} width={BADGE_W} height={12} rx={3}
                        fill={flag === "PK" ? "var(--brand-soft)" : "var(--surface-2)"} />
                      <text x={bx + BADGE_W / 2} y={ry} textAnchor="middle" fontSize={8}
                        fontWeight={700} fill={flag === "PK" ? "var(--brand-dark)" : "var(--ink-3)"}>{flag}</text>
                    </g>,
                  );
                  bx += BADGE_W + 4;
                }
                return (
                  <g key={a.name + j}>
                    {/* Technical names are Latin and must read left-to-right
                        even on an RTL page. */}
                    <text x={left + PAD_X} y={ry} fontSize={FONT} direction="ltr"
                      fontWeight={a.pk ? 700 : 400}
                      fill={a.pk ? "var(--ink-1)" : "var(--ink-2)"}>{a.name}</text>
                    {badges}
                    {a.type && (
                      <text x={left + w - PAD_X} y={ry} textAnchor="end" fontSize={10.5}
                        direction="ltr" fill="var(--ink-3)">{a.type}</text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Legend — only the cardinalities this diagram actually uses, so it
            explains rather than decorates. Inside the SVG so it survives export
            and print, where a reader has no tooltip to fall back on. */}
        <g transform={`translate(20, ${height + 8})`} aria-hidden>
          {usedCards.map((c, i) => {
            const x = i * 132;
            return (
              <g key={c} transform={`translate(${x}, 0)`}>
                <line x1={0} y1={9} x2={40} y2={9} stroke="var(--ink-3)" strokeWidth={1.5} />
                <Foot card={c} p={{ x: 40, y: 9 }} ux={-1} uy={0} colour="var(--ink-3)" />
                {/* Starts with the notation ("0..N"), so the run is LTR and the
                    Hebrew gloss reorders correctly inside it. */}
                <text x={46} y={12.5} fontSize={10} fill="var(--ink-3)" direction="ltr">
                  {CARD_SHORT[c]} · {CARD_HE[c]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </DiagramFrame>
  );
}
