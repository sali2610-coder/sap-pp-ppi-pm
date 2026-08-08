"use client";

import { useMemo, useRef, useState } from "react";
import dagre from "dagre";
import { Maximize2, Minus, Plus, Printer, RotateCcw, X , Play, GraduationCap} from "lucide-react";
import { parseDiagram, type Diagram, type DiagramNode } from "@/lib/ai/diagram";
import Link from "next/link";
import { useDialog } from "@/lib/use-dialog";
import { knownRoutes } from "@/lib/ai-known-routes";
import { groupRefs, nodeFacts, KIND_HE, type Lookup } from "@/lib/ai/node-facts";
import { PresentationMode } from "./diagram-present";
import { LearningMode } from "./diagram-learn";

/**
 * Renders a flowchart as real SVG.
 *
 * dagre (already a dependency) does the layered layout; everything drawn here is
 * plain SVG, which means no runtime diagram library, exports for free, and a
 * printable vector at any size. Shapes follow the usual process-notation
 * conventions so the result reads as documentation rather than as a debug view.
 *
 * RTL note: the diagram itself is laid out left-to-right regardless of page
 * direction, because arrows encode flow, not language. Labels inside nodes are
 * dir="auto" so Hebrew reads correctly inside a left-to-right graph.
 */

const PALETTE: Record<DiagramNode["shape"], { fill: string; stroke: string; text: string }> = {
  terminal: { fill: "var(--brand-soft)", stroke: "var(--brand)", text: "var(--brand-dark)" },
  process: { fill: "var(--surface)", stroke: "var(--hairline)", text: "var(--ink-1)" },
  decision: { fill: "#fff7ed", stroke: "#c2410c", text: "#7c2d12" },
  data: { fill: "#eff6ff", stroke: "#1d4ed8", text: "#1e3a8a" },
  note: { fill: "var(--surface-2)", stroke: "var(--hairline)", text: "var(--ink-2)" },
};

const CHAR_W = 7.1;
const LINE_H = 17;
const PAD_X = 18;
const PAD_Y = 14;

/** Wraps a label so a long step does not produce a 600px-wide box. */
function wrap(label: string, max = 26): string[] {
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

interface Placed {
  node: DiagramNode;
  lines: string[];
  x: number; y: number; w: number; h: number;
}

function layout(d: Diagram) {
  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({
    rankdir: d.direction,
    nodesep: 44,
    ranksep: 58,
    marginx: 24,
    marginy: 24,
  });
  g.setDefaultEdgeLabel(() => ({}));

  const wrapped = new Map<string, string[]>();
  for (const n of d.nodes) {
    const lines = wrap(n.label);
    wrapped.set(n.id, lines);
    const textW = Math.max(...lines.map((l) => l.length)) * CHAR_W;
    // A diamond needs roughly 40% more room to hold the same text.
    const grow = n.shape === "decision" ? 1.4 : 1;
    g.setNode(n.id, {
      width: Math.max(96, textW * grow + PAD_X * 2),
      height: Math.max(44, lines.length * LINE_H * grow + PAD_Y * 2),
    });
  }
  for (const e of d.edges) g.setEdge(e.from, e.to, {}, `${e.from}->${e.to}`);

  dagre.layout(g);

  const placed: Placed[] = d.nodes.map((n) => {
    const p = g.node(n.id);
    return { node: n, lines: wrapped.get(n.id) ?? [n.label], x: p.x, y: p.y, w: p.width, h: p.height };
  });

  const edges = d.edges.map((e) => {
    const pts = (g.edge(e.from, e.to, `${e.from}->${e.to}`)?.points ?? []) as { x: number; y: number }[];
    return { ...e, points: pts };
  });

  const gr = g.graph();
  return { placed, edges, width: (gr.width ?? 800) + 8, height: (gr.height ?? 400) + 8 };
}

function shapePath(p: Placed): string {
  const { x, y, w, h } = p;
  const l = x - w / 2, t = y - h / 2, r = x + w / 2, b = y + h / 2;
  if (p.node.shape === "decision") return `M ${x} ${t} L ${r} ${y} L ${x} ${b} L ${l} ${y} Z`;
  return "";
}

export function DiagramView({ source }: { source: string }) {
  const diagram = useMemo(() => parseDiagram(source), [source]);
  const laid = useMemo(() => (diagram ? layout(diagram) : null), [diagram]);
  const [zoom, setZoom] = useState(1);
  const [full, setFull] = useState(false);
  // Hover is transient, selection is sticky. Selection wins so a pointer moving
  // across the canvas cannot yank the highlight off what the user just clicked.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [present, setPresent] = useState(false);
  const [learn, setLearn] = useState(false);

  // The live registry, adapted to the injected shape node-facts expects.
  const lookup: Lookup = useMemo(() => {
    const r = knownRoutes();
    return (token) => {
      const href = r.href.get(token);
      const kind = r.kind.get(token);
      return href && kind ? { href, kind } : null;
    };
  }, []);
  const svgRef = useRef<SVGSVGElement>(null);
  const dialogRef = useDialog<HTMLDivElement>(full, () => setFull(false));

  // Adjacency, built once. Used to answer "is this connected to the focused
  // node" per element per render, which would otherwise be a scan of every edge.
  const links = useMemo(() => {
    const m = new Map<string, { near: Set<string>; edges: Set<number>; in: string[]; out: string[] }>();
    const get = (id: string) => {
      let v = m.get(id);
      if (!v) { v = { near: new Set([id]), edges: new Set(), in: [], out: [] }; m.set(id, v); }
      return v;
    };
    diagram?.nodes.forEach((n) => get(n.id));
    diagram?.edges.forEach((e, i) => {
      const a = get(e.from), b = get(e.to);
      a.near.add(e.to); b.near.add(e.from);
      a.edges.add(i); b.edges.add(i);
      a.out.push(e.to); b.in.push(e.from);
    });
    return m;
  }, [diagram]);

  // Not a diagram we can draw — show the source rather than an empty frame.
  if (!diagram || !laid) {
    return (
      <pre className="tech overflow-x-auto rounded-xl bg-surface-2 p-3 text-[0.8125rem] leading-relaxed text-ink-1">
        <code>{source}</code>
      </pre>
    );
  }

  const focusId = pickedId ?? hoverId;
  /** 1 when nothing is focused, or when this element is part of the focus. */
  const dimFor = (active: string | null) => {
    const f = active ? links.get(active) : null;
    return {
      node: (id: string) => (!f ? 1 : f.near.has(id) ? 1 : 0.22),
      edge: (i: number) => (!f ? 1 : f.edges.has(i) ? 1 : 0.12),
      on: f,
    };
  };

  const svgMarkup = () => {
    const el = svgRef.current;
    if (!el) return "";
    const clone = el.cloneNode(true) as SVGSVGElement;
    // Highlighting is a viewing aid, not part of the diagram. Exporting while a
    // node is selected would otherwise bake the dimming into the file.
    clone.querySelectorAll("[opacity]").forEach((n) => n.setAttribute("opacity", "1"));
    // Inline the resolved token colours so the file stands alone.
    const cs = getComputedStyle(document.documentElement);
    let s = new XMLSerializer().serializeToString(clone);
    for (const v of ["--brand", "--brand-dark", "--brand-soft", "--surface", "--surface-2", "--hairline", "--ink-1", "--ink-2"]) {
      s = s.split(`var(${v})`).join(cs.getPropertyValue(v).trim() || "#000");
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n${s}`;
  };

  const exportSvg = () => {
    const blob = new Blob([svgMarkup()], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "diagram.svg"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const exportPng = () => {
    const img = new Image();
    const svg = new Blob([svgMarkup()], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);
    img.onload = () => {
      // 2× for a crisp raster in documents and slides.
      const c = document.createElement("canvas");
      c.width = laid.width * 2;
      c.height = laid.height * 2;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim() || "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        c.toBlob((b) => {
          if (!b) return;
          const u = URL.createObjectURL(b);
          const a = document.createElement("a");
          a.href = u; a.download = "diagram.png"; a.click();
          setTimeout(() => URL.revokeObjectURL(u), 1000);
        });
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  /**
   * Print / PDF. Interactive state must not reach paper: highlighting is a
   * viewing aid, so the printed sheet is always the neutral diagram.
   *
   * Three profiles because a process diagram is not one shape — a wide flow
   * wants landscape, a tall one portrait, and a wall chart wants A3.
   */
  const printDiagram = (profile: "portrait" | "landscape" | "a3" = "landscape") => {
    const markup = svgMarkup();
    if (!markup) return;
    const page = profile === "a3" ? "A3 landscape"
      : profile === "portrait" ? "A4 portrait" : "A4 landscape";
    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;inset:0;width:0;height:0;border:0;opacity:0";
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    if (!doc) { frame.remove(); return; }
    doc.open();
    doc.write(`<!doctype html><html dir="rtl"><head><meta charset="utf-8">
      <title>${"תרשים תהליך"}</title>
      <style>
        @page { size: ${page}; margin: 12mm; }
        html,body { margin:0; padding:0; background:#fff; }
        body { display:flex; align-items:center; justify-content:center; min-height:100vh; }
        svg { width:100%; height:auto; max-height:100vh; }
        @media print { body { min-height:auto; } }
      </style></head><body>${markup}</body></html>`);
    doc.close();
    // Wait for layout before printing, or the sheet can come out blank.
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 1000);
    };
  };

  /**
   * The diagram markup. Takes the focused node as an argument rather than
   * reading state, so presentation mode can step through the SAME svg the page
   * renders — two copies would drift the moment either changed.
   */
  const renderSvg = (
    active: string | null = focusId,
    attachRef = true,
    /** Learning mode: only these node ids exist yet. undefined = show all. */
    revealed?: Set<string>,
  ) => {
  const focus = dimFor(active).on;
  const dimNode = dimFor(active).node;
  const dimEdge = dimFor(active).edge;
  return (
    <svg
      ref={attachRef ? svgRef : undefined}
      viewBox={`0 0 ${laid.width} ${laid.height}`}
      width={laid.width * zoom}
      height={laid.height * zoom}
      role="img"
      aria-label="תרשים תהליך"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "none" }}
    >
      <defs>
        <marker id="neo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-3)" />
        </marker>
      </defs>

      {laid.edges.map((e, i) => {
        const pts = e.points.length ? e.points : [];
        if (pts.length < 2) return null;
        const d = pts.map((p, j) => `${j === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        const mid = pts[Math.floor(pts.length / 2)];
        return (
          <g key={i}
            opacity={revealed && !(revealed.has(e.from) && revealed.has(e.to)) ? 0 : dimEdge(i)}
            className="transition-opacity duration-150">
            <path d={d} fill="none"
              stroke={focus?.edges.has(i) ? "var(--brand)" : "var(--ink-3)"}
              strokeWidth={focus?.edges.has(i) ? 2.4 : 1.6}
              strokeDasharray={e.dashed ? "5 4" : undefined} markerEnd="url(#neo-arrow)" />
            {e.label && (
              <>
                <rect x={mid.x - e.label.length * 3.4 - 5} y={mid.y - 9} rx={5}
                  width={e.label.length * 6.8 + 10} height={18} fill="var(--surface)" />
                <text x={mid.x} y={mid.y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--ink-2)">
                  {e.label}
                </text>
              </>
            )}
          </g>
        );
      })}

      {laid.placed.map((p) => {
        const c = PALETTE[p.node.shape];
        const isDiamond = p.node.shape === "decision";
        const rx = p.node.shape === "terminal" ? p.h / 2 : 12;
        const startY = p.y - ((p.lines.length - 1) * LINE_H) / 2 + 4;
        const on = focusId === p.node.id;
        const conn = links.get(p.node.id);
        return (
          <g
            key={p.node.id}
            opacity={revealed && !revealed.has(p.node.id) ? 0 : dimNode(p.node.id)}
            className="cursor-pointer transition-opacity duration-150 focus:outline-none"
            tabIndex={0}
            role="button"
            aria-pressed={pickedId === p.node.id}
            aria-label={`${p.node.label}. ${conn?.in.length ?? 0} נכנסות, ${conn?.out.length ?? 0} יוצאות`}
            onMouseEnter={() => setHoverId(p.node.id)}
            onMouseLeave={() => setHoverId((h) => (h === p.node.id ? null : h))}
            onFocus={() => setHoverId(p.node.id)}
            onBlur={() => setHoverId((h) => (h === p.node.id ? null : h))}
            onClick={() => setPickedId((c) => (c === p.node.id ? null : p.node.id))}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                setPickedId((c) => (c === p.node.id ? null : p.node.id));
              } else if (ev.key === "Escape") setPickedId(null);
            }}
          >
            {/* Focus ring drawn as a shape, because an SVG group cannot take a
                CSS outline that follows a diamond. */}
            {on && (isDiamond
              ? <path d={shapePath(p)} fill="none" stroke="var(--brand)" strokeWidth={4} opacity={0.35} />
              : <rect x={p.x - p.w / 2 - 3} y={p.y - p.h / 2 - 3} width={p.w + 6} height={p.h + 6}
                  rx={rx + 3} fill="none" stroke="var(--brand)" strokeWidth={3} opacity={0.35} />)}
            {isDiamond ? (
              <path d={shapePath(p)} fill={c.fill} stroke={c.stroke} strokeWidth={1.6} />
            ) : (
              <rect x={p.x - p.w / 2} y={p.y - p.h / 2} width={p.w} height={p.h} rx={rx}
                fill={c.fill} stroke={c.stroke} strokeWidth={1.6} />
            )}
            {p.lines.map((ln, j) => (
              <text key={j} x={p.x} y={startY + j * LINE_H} textAnchor="middle" dominantBaseline="middle"
                fontSize={12.5} fontWeight={p.node.shape === "terminal" ? 800 : 600}
                fill={c.text} direction="rtl">
                {ln}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
  };

  const svg = renderSvg();

  const toolbar = (
    <div className="flex flex-wrap items-center gap-1">
      <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))} aria-label="הקטן"
        className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><Minus className="size-3.5" /></button>
      <span className="tech min-w-[3ch] text-center text-[11px] font-bold text-ink-3">{Math.round(zoom * 100)}%</span>
      <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} aria-label="הגדל"
        className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><Plus className="size-3.5" /></button>
      <button onClick={() => setZoom(1)} aria-label="אפס תצוגה"
        className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><RotateCcw className="size-3.5" /></button>
      <span className="mx-1 h-4 w-px bg-hairline" />
      <button onClick={exportPng} className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand">PNG</button>
      <button onClick={exportSvg} className="rounded-lg px-2 py-1.5 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand">SVG</button>
      <button onClick={() => printDiagram("landscape")} aria-label="הדפס A4 לרוחב"
        className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-brand"><Printer className="size-3.5" /></button>
      <button onClick={() => printDiagram("portrait")}
        className="rounded-lg px-1.5 py-1.5 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand">A4↕</button>
      <button onClick={() => printDiagram("a3")}
        className="rounded-lg px-1.5 py-1.5 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand">A3</button>
      <span className="mx-1 h-4 w-px bg-hairline" />
      <button onClick={() => setPresent(true)}
        className="inline-flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1.5 text-[11px] font-bold text-brand transition hover:bg-brand/20">
        <Play className="size-3" /> מצגת
      </button>
      <button onClick={() => setLearn(true)}
        className="inline-flex items-center gap-1 rounded-lg bg-brand/10 px-2 py-1.5 text-[11px] font-bold text-brand transition hover:bg-brand/20">
        <GraduationCap className="size-3" /> לימוד
      </button>
      {!full && (
        <button onClick={() => setFull(true)} aria-label="מסך מלא"
          className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-brand"><Maximize2 className="size-3.5" /></button>
      )}
    </div>
  );

  /**
   * Shown only on an explicit click, never on hover — a panel that appeared
   * under the pointer would flicker as the pointer crossed the canvas.
   */
  const detail = pickedId ? (() => {
    const node = diagram.nodes.find((n) => n.id === pickedId);
    const l = links.get(pickedId);
    if (!node || !l) return null;
    const nameOf = (id: string) => diagram.nodes.find((n) => n.id === id)?.label ?? id;
    const Row = ({ label, ids }: { label: string; ids: string[] }) =>
      ids.length ? (
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-[11px] text-ink-3">{label}</span>
          {ids.map((id) => (
            <button key={id} onClick={() => setPickedId(id)}
              className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-2 transition hover:text-brand">
              {nameOf(id)}
            </button>
          ))}
        </div>
      ) : null;
    return (
      <div className="border-t border-hairline bg-surface-2/40 px-3 py-2" aria-live="polite">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[0.8125rem] font-semibold text-ink-1">{node.label}</span>
          <button onClick={() => setPickedId(null)}
            className="rounded-md px-1.5 py-0.5 text-[11px] text-ink-3 transition hover:bg-surface-2 hover:text-ink-1">
            נקה בחירה
          </button>
        </div>
        <div className="space-y-1">
          <Row label="מגיע מ־" ids={l.in} />
          <Row label="ממשיך אל־" ids={l.out} />
          {!l.in.length && !l.out.length && (
            <span className="text-[11px] text-ink-3">שלב מבודד — אין לו קשרים בתרשים.</span>
          )}
        </div>

        {/* Real SAP objects named in this step, resolved to their own pages.
            Nothing here is generated: a label that names no known object shows
            nothing rather than a plausible-sounding description. */}
        {(() => {
          const facts = nodeFacts(node.label, lookup);
          if (!facts.refs.length && !facts.unresolved.length) return null;
          return (
            <div className="mt-2 space-y-1.5 border-t border-hairline pt-2">
              {groupRefs(facts.refs).map(([kind, list]) => (
                <div key={kind} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="text-[11px] text-ink-3">{KIND_HE[kind]}</span>
                  {list.map((r) => (
                    <Link key={r.id} href={r.href}
                      className="tech rounded-md bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand transition hover:bg-brand/20">
                      {r.id}
                    </Link>
                  ))}
                </div>
              ))}
              {facts.unresolved.length > 0 && (
                <p className="text-[11px] text-ink-3">
                  ללא דף ייעודי: <span className="tech">{facts.unresolved.join(", ")}</span>
                </p>
              )}
            </div>
          );
        })()}
      </div>
    );
  })() : null;

  return (
    <>
      <figure className="my-4 overflow-hidden rounded-2xl border border-hairline bg-surface">
        <figcaption className="flex items-center justify-between gap-2 border-b border-hairline bg-surface-2/50 px-3 py-1.5">
          <span className="text-[11px] font-bold text-ink-3">תרשים תהליך</span>
          {toolbar}
        </figcaption>
        <div className="overflow-auto p-3" style={{ maxHeight: "32rem" }}>{svg}</div>
        {detail}
      </figure>

      {learn && (
        <LearningMode
          diagram={diagram}
          onClose={() => setLearn(false)}
          // Only the steps reached so far are drawn. Showing the finished
          // diagram behind the first step would give the process away.
          canvas={({ focusId, revealed }) => renderSvg(focusId, false, revealed)}
        />
      )}

      {present && (
        <PresentationMode
          diagram={diagram}
          title="תרשים תהליך"
          onClose={() => setPresent(false)}
          // The deck renders the SAME svg the page does, so a change to the
          // diagram cannot leave the presentation showing something else.
          canvas={({ focusId, zoom: z }) => (
            <div style={{ transform: `scale(${z})`, transformOrigin: "center" }}>
              {renderSvg(focusId, false)}
            </div>
          )}
        />
      )}

      {full && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="תרשים במסך מלא">
          <div aria-hidden onClick={() => setFull(false)} className="absolute inset-0 bg-ink-1/60 backdrop-blur-sm" />
          <div ref={dialogRef} tabIndex={-1}
            className="absolute inset-4 flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-2xl outline-none">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2">
              {toolbar}
              <button onClick={() => setFull(false)} aria-label="סגור"
                className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-auto p-4">{svg}</div>
            {detail}
          </div>
        </div>
      )}
    </>
  );
}
