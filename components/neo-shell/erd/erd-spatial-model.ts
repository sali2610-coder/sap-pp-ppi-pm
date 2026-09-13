import type { ErdCatalog, ModCode } from "./erd-types";

// Presentation colours only. Module membership and SAP facts remain in the catalogue.
export const SPATIAL_COLORS: Record<ModCode, string> = {
  PP: "#5cadff", "PP-PI": "#bc8aff", PM: "#ffa65c", MM: "#43dbc3",
  SD: "#ff7494", QM: "#b4d96b", FI: "#f6cf67", CO: "#ee95e0",
  CS: "#62d2fa", BATCH: "#e6b794", CLASS: "#a9a1ff", IDOC: "#ced9eb",
  PIPO: "#5dbb98", HR: "#fa99b8", BW: "#7f98f5",
};
export type Point3 = [number, number, number];
export interface SpatialView {
  module: ModCode | null;
  selected: string | null;
  focus: boolean;
  motion: boolean;
  orbit: boolean;
  links: boolean;
  preset: "perspective" | "top";
}
export interface SpatialLayout {
  points: Map<string, Point3>;
  plates: { code: ModCode; center: Point3; width: number; depth: number; count: number }[];
  width: number;
  depth: number;
}

export function spatialLayout(data: ErdCatalog, view: Pick<SpatialView, "module" | "selected" | "focus">): SpatialLayout {
  const MODULE_ORDER = data.modules.map((m) => m.code);
  const byName = new Map(data.tables.map((t) => [t.n, t]));
  const points = new Map<string, Point3>();
  const plates: SpatialLayout["plates"] = [];
  if (view.focus && view.selected && byName.has(view.selected)) {
    points.set(view.selected, [0, 3, 0]);
    const neighbours = [...new Set(data.edges.flatMap((e) => e.p === view.selected ? [e.c] : e.c === view.selected ? [e.p] : []))].filter((n) => byName.has(n)).sort();
    const radius = Math.max(13, neighbours.length * 1.3);
    neighbours.forEach((n, i) => {
      const a = i / Math.max(1, neighbours.length) * Math.PI * 2;
      points.set(n, [Math.cos(a) * radius, 1.5 + (i % 3) * .45, Math.sin(a) * radius]);
    });
    return { points, plates, width: radius * 2 + 14, depth: radius * 2 + 14 };
  }
  if (view.module) {
    const mod = data.modules.find((m) => m.code === view.module);
    const members = (mod?.core || []).filter((n) => byName.has(n));
    const columns = Math.max(1, Math.ceil(Math.sqrt(members.length * 1.5)));
    const rows = Math.ceil(members.length / columns);
    members.forEach((n, i) => points.set(n, [((i % columns) - (columns - 1) / 2) * 8, 2 + (i % 3) * .32, (Math.floor(i / columns) - (rows - 1) / 2) * 6.4]));
    const width = columns * 8 + 4, depth = rows * 6.4 + 5;
    plates.push({ code: view.module, center: [0, 0, 0], width, depth, count: members.length });
    return { points, plates, width, depth };
  }
  const groups = MODULE_ORDER.map((code) => {
    const members = data.tables.filter((t) => (MODULE_ORDER.includes(t.m) ? t.m : t.ms[0]) === code);
    const columns = Math.max(2, Math.ceil(Math.sqrt(members.length * 1.4)));
    return { code, members, columns, rows: Math.ceil(members.length / columns), width: columns * 6.4 + 4, depth: Math.ceil(members.length / columns) * 4.7 + 8 };
  });
  const widths = Array.from({ length: 5 }, (_, col) => Math.max(...groups.filter((_, i) => i % 5 === col).map((g) => g.width)));
  const depths = Array.from({ length: 3 }, (_, row) => Math.max(...groups.slice(row * 5, row * 5 + 5).map((g) => g.depth)));
  const width = widths.reduce((s, w) => s + w, 0) + 4 * 9;
  const depth = depths.reduce((s, d) => s + d, 0) + 2 * 10;
  groups.forEach((g, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const cx = width / 2 - widths.slice(0, col).reduce((s, w) => s + w + 9, 0) - widths[col] / 2;
    const cz = -depth / 2 + depths.slice(0, row).reduce((s, d) => s + d + 10, 0) + depths[row] / 2;
    g.members.forEach((t, j) => points.set(t.n, [cx + ((j % g.columns) - (g.columns - 1) / 2) * 6.4, 1.8 + (j % 3) * .3, cz + (Math.floor(j / g.columns) - (g.rows - 1) / 2) * 4.7]));
    plates.push({ code: g.code, center: [cx, 0, cz], width: g.width, depth: g.depth, count: g.members.length });
  });
  return { points, plates, width, depth };
}
