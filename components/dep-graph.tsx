import type { ObjectGraph, LinkRef } from "@/lib/cross-links";

// Visual radial dependency graph for an object. Pure SVG (server-rendered).
// Center = object; ringed nodes = top related entities per facet, each a link.
interface GNode { ref: LinkRef; color: string; kind: string }

const trunc = (s: string, n = 16) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

export function DepGraph({ graph }: { graph: ObjectGraph }) {
  const pick = (refs: LinkRef[], k: number, color: string, kind: string): GNode[] => refs.slice(0, k).map((r) => ({ ref: r, color, kind }));
  const nodes: GNode[] = [
    ...pick(graph.relatedTables, 4, "#0891b2", "טבלה"),
    ...pick(graph.tcodes, 4, "#0f766e", "T-Code"),
    ...pick(graph.bapis, 2, "#2563eb", "BAPI"),
    ...pick(graph.fms, 2, "#0d9488", "FM"),
    ...pick(graph.badis, 2, "#7c3aed", "BAdI"),
    ...pick(graph.incidents, 3, "#dc2626", "תקלה"),
    ...pick(graph.notes, 1, "#b45309", "Note"),
    ...pick(graph.cds, 1, "#16a34a", "CDS"),
  ];
  const W = 760, H = 520, cx = W / 2, cy = H / 2, R = 200;
  const n = nodes.length || 1;
  const pos = (i: number) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }; };
  const cm = graph.module === "PM" ? "#f97316" : graph.module === "QM" ? "#0d9488" : "#6d28d9";
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" dir="ltr">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="dependency graph">
        {nodes.map((nd, i) => { const p = pos(i); return <line key={"l" + i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={nd.color} strokeOpacity="0.3" strokeWidth="1.5" />; })}
        {/* center */}
        <g>
          <circle cx={cx} cy={cy} r="46" fill={cm} />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" fontFamily="monospace">{graph.name}</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" opacity="0.85">{graph.module}</text>
        </g>
        {/* nodes */}
        {nodes.map((nd, i) => {
          const p = pos(i); const w = Math.max(70, trunc(nd.ref.label).length * 7.2 + 16);
          const inner = (
            <g>
              <rect x={p.x - w / 2} y={p.y - 15} width={w} height={30} rx="8" fill="#fff" stroke={nd.color} strokeWidth="1.6" />
              <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={nd.color} fontFamily="monospace">{trunc(nd.ref.label)}</text>
              <text x={p.x} y={p.y + 10} textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">{nd.kind}</text>
            </g>
          );
          return nd.ref.href ? <a key={"n" + i} href={nd.ref.href}>{inner}</a> : <g key={"n" + i}>{inner}</g>;
        })}
      </svg>
    </section>
  );
}
