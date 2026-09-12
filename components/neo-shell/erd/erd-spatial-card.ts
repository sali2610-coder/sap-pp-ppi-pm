import type { ErdTable } from "./erd-types";
import { SPATIAL_COLORS } from "./erd-spatial-model";

export function cardCanvas(table: ErdTable, expanded: boolean) {
  const canvas = document.createElement("canvas");
  // Overview cards occupy only a few screen pixels. Keep full resolution for selection.
  const scale = expanded ? 1 : .5;
  canvas.width = 768 * scale; canvas.height = (expanded ? 800 : 400) * scale;
  const c = canvas.getContext("2d")!;
  c.scale(scale, scale);
  const color = SPATIAL_COLORS[table.m] || "#bacce3";
  c.fillStyle = "#101e33"; c.fillRect(0, 0, 768, expanded ? 800 : 400);
  c.fillStyle = color; c.fillRect(0, 0, 768, 12);
  c.globalAlpha = .17; c.fillRect(0, 12, 768, 92); c.globalAlpha = 1;
  c.textAlign = "left"; c.fillStyle = color; c.font = "600 31px Arial";
  c.fillText(table.m, 35, 71);
  c.textAlign = "right"; c.fillStyle = "#b0bed3"; c.font = "27px Arial";
  c.fillText(`${table.fn} שדות`, 730, 71);
  c.textAlign = "center"; c.fillStyle = "#f8fbff";
  c.font = `700 ${table.n.length > 16 ? 40 : 58}px monospace`;
  c.fillText(table.n, 384, 184, 704);
  c.direction = "rtl"; c.font = "36px Arial"; c.fillStyle = "#d0dcee";
  c.fillText(table.he || table.en, 384, 247, 698);
  c.direction = "ltr";
  if (expanded) {
    const fields = [...table.f].sort((a, b) => Number(/PK/.test(b[3])) - Number(/PK/.test(a[3]))).slice(0, 6);
    fields.forEach((f, i) => {
      const y = 316 + i * 69;
      c.fillStyle = i % 2 ? "#14253d" : "#182b45"; c.fillRect(24, y - 33, 720, 61);
      c.textAlign = "left"; c.fillStyle = "#f1f6ff"; c.font = "30px monospace"; c.fillText(f[0], 44, y + 8, 520);
      c.textAlign = "right"; c.fillStyle = /PK/.test(f[3]) ? "#f6cf67" : "#7fbbff"; c.font = "bold 25px Arial";
      c.fillText(f[3] === "-" ? "" : f[3], 724, y + 8);
    });
  } else {
    c.textAlign = "center"; c.fillStyle = "#95aac5"; c.font = "27px monospace";
    c.fillText(table.pk.slice(0, 2).join(" · ") || table.z, 384, 336, 700);
  }
  return canvas;
}
