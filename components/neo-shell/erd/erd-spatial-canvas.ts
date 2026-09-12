// The same 3D coordinates, perspective camera and orbit controls when WebGL is unavailable.
// Canvas paints projected geometry; it does not substitute a static diagram or change data.
import { PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { ErdCatalog } from "./erd-types";
import { cardCanvas } from "./erd-spatial-card";
import { SPATIAL_COLORS, spatialLayout, type SpatialView, type Point3 } from "./erd-spatial-model";
import type { SpatialScene } from "./erd-spatial-scene";

type P = { x: number; y: number; z: number };
type Hit = { points: P[]; table?: string; module?: string };
const contains = (p: P[], x: number, y: number) => {
  let inside = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i].y > y) !== (p[j].y > y) && x < (p[j].x - p[i].x) * (y - p[i].y) / (p[j].y - p[i].y) + p[i].x) inside = !inside;
  }
  return inside;
};

export function createCanvasSpatialScene(host: HTMLElement, data: ErdCatalog, initial: SpatialView, onPick: (name: string) => void, onModule: (code: string) => void): SpatialScene {
  const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d")!;
  canvas.setAttribute("aria-label", "מפת SAP בתלת ממד עם סיבוב, זום ובחירת טבלאות");
  canvas.dataset.renderer = "canvas-3d"; host.appendChild(canvas);
  const camera = new PerspectiveCamera(40, 1, .1, 2400);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = .1; controls.autoRotateSpeed = .22;
  controls.minDistance = 10; controls.maxDistance = 1600; controls.minPolarAngle = .03; controls.maxPolarAngle = Math.PI * .46;
  controls.zoomSpeed = .7;
  let view = initial, layout = spatialLayout(data, initial);
  let width = 1, height = 1, ratio = 1, clock = 0, last = 0, lastRender = 0, raf = 0, stopped = false, dirty = 50;
  let flight: { position: Vector3; target: Vector3 } | null = null;
  let regions: Hit[] = [];
  const nodes = new Map(data.tables.map((t, i) => [t.n, { table: t, index: i, position: new Vector3(), target: new Vector3(), size: 1, opacity: 1, visible: false, expanded: undefined as HTMLCanvasElement | undefined, card: cardCanvas(t, false) }]));
  const vec = new Vector3();
  const project = (x: number, y: number, z: number): P => {
    vec.set(x, y, z).project(camera); return { x: (vec.x + 1) * width / 2, y: (-vec.y + 1) * height / 2, z: vec.z };
  };
  const quad = (center: Point3, w: number, d: number, y: number) => [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]].map(([x, z]) => project(center[0] + x, y, center[2] + z));
  const polygon = (points: P[], fill: string, stroke?: string) => {
    ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  };
  const textQuad = (image: HTMLCanvasElement, p: P[]) => {
    const w = image.width, h = image.height;
    for (const second of [false, true]) {
      const triangle = second ? [p[1], p[2], p[3]] : [p[0], p[1], p[3]];
      ctx.save(); ctx.beginPath(); triangle.forEach((v, i) => i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)); ctx.closePath(); ctx.clip();
      const a = second ? (p[2].x - p[3].x) / w : (p[1].x - p[0].x) / w;
      const b = second ? (p[2].y - p[3].y) / w : (p[1].y - p[0].y) / w;
      const c = second ? (p[2].x - p[1].x) / h : (p[3].x - p[0].x) / h;
      const d = second ? (p[2].y - p[1].y) / h : (p[3].y - p[0].y) / h;
      ctx.transform(a, b, c, d, second ? p[1].x - a * w : p[0].x, second ? p[1].y - b * w : p[0].y);
      ctx.drawImage(image, 0, 0); ctx.restore();
    }
  };
  function fit() {
    const selectedPoint = view.selected && !view.focus ? layout.points.get(view.selected) : undefined;
    if (selectedPoint) {
      const target = new Vector3(...selectedPoint);
      flight = { target, position: target.clone().add(new Vector3(13, 24, 25)) }; dirty = 60; return;
    }
    const span = Math.max(layout.width / (width / height), layout.depth * 1.28);
    const distance = Math.max(24, span * 1.4);
    flight = { target: new Vector3(), position: view.preset === "top" ? new Vector3(0, distance * 1.22, .1) : new Vector3(distance * .34, distance * .87, distance * .84) };
    dirty = 60;
  }
  const update = (next: SpatialView) => {
    const changed = next.module !== view.module || next.focus !== view.focus || (next.focus && next.selected !== view.selected);
    const picked = next.selected !== view.selected;
    const perspective = next.preset !== view.preset;
    view = next;
    if (changed) layout = spatialLayout(data, next);
    const near = new Set(next.selected ? [next.selected, ...data.edges.flatMap((e) => e.p === next.selected ? [e.c] : e.c === next.selected ? [e.p] : [])] : []);
    for (const [name, n] of nodes) {
      if (name !== next.selected) n.expanded = undefined;
      const p = layout.points.get(name); const wasVisible = n.visible;
      n.visible = !!p;
      if (!p) continue;
      n.target.set(...p); if (!wasVisible || !last) n.position.copy(n.target);
      n.opacity = next.selected && !near.has(name) ? .18 : 1;
      if (next.selected === name && !n.expanded) n.expanded = cardCanvas(n.table, true);
    }
    if (changed || perspective) fit();
    else if (picked && next.selected) {
      const n = nodes.get(next.selected);
      if (n?.visible) flight = { target: n.target.clone(), position: n.target.clone().add(new Vector3(13, 24, 25)) };
    }
    dirty = 60;
  };
  const resize = () => {
    width = Math.max(1, host.clientWidth); height = Math.max(1, host.clientHeight); ratio = Math.min(window.devicePixelRatio, 1.7);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    camera.aspect = width / height; camera.updateProjectionMatrix();
    if (!view.selected || view.focus) fit();
    dirty = 60;
  };
  resize(); update(initial); fit();
  const start = () => { if (flight) { camera.position.copy(flight.position); controls.target.copy(flight.target); flight = null; } };
  start(); controls.update();
  const observer = new ResizeObserver(resize); observer.observe(host);
  const wake = () => { dirty = 60; }; controls.addEventListener("change", wake);
  let down = { x: 0, y: 0 };
  const pointerDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY }; flight = null; dirty = 60; };
  const pointerUp = (e: PointerEvent) => {
    if (e.button !== 0 || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const hit = [...regions].reverse().find((h) => contains(h.points, x, y));
    if (hit?.table) onPick(hit.table); else if (hit?.module) onModule(hit.module);
  };
  const pointerMove = (e: PointerEvent) => {
    if (e.buttons) return;
    const r = canvas.getBoundingClientRect(); canvas.style.cursor = regions.some((h) => contains(h.points, e.clientX - r.left, e.clientY - r.top)) ? "pointer" : "grab";
  };
  canvas.addEventListener("pointerdown", pointerDown); canvas.addEventListener("pointerup", pointerUp); canvas.addEventListener("pointermove", pointerMove);
  function draw() {
    const labelScale = Math.min(1.8, Math.max(1, height / 800));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.globalAlpha = 1; ctx.clearRect(0, 0, width, height); ctx.fillStyle = "#081222"; ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * .5, height * .5, 0, width * .5, height * .5, width * .6);
    glow.addColorStop(0, "#13263e"); glow.addColorStop(1, "#081222"); ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    regions = [];
    const range = view.module || view.focus ? 80 : 230;
    ctx.strokeStyle = "#334a6224"; ctx.lineWidth = .6;
    for (let n = -range; n <= range; n += view.module || view.focus ? 5 : 10) {
      for (const [a, b] of [[project(n, -.8, -range), project(n, -.8, range)], [project(-range, -.8, n), project(range, -.8, n)]]) {
        if (a.z > 1 || b.z > 1) continue;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    for (const plate of layout.plates) {
      const color = SPATIAL_COLORS[plate.code];
      polygon(quad(plate.center, plate.width, plate.depth, -.3), `${color}0b`, `${color}66`);
    }
    if (view.links) for (const [i, e] of data.edges.entries()) {
      const parent = nodes.get(e.p), child = nodes.get(e.c);
      if (!parent?.visible || !child?.visible) continue;
      const selectedEdge = view.selected === e.p || view.selected === e.c;
      ctx.globalAlpha = view.selected ? selectedEdge ? .85 : .035 : view.module || view.focus ? .4 : .2;
      const color = SPATIAL_COLORS[parent.table.m] || "#9ac2f8";
      const arc = Math.min(18, parent.position.distanceTo(child.position) * .2 + 2);
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = selectedEdge ? 1.6 : .8;
      if (!e.cd) ctx.setLineDash([3, 4]);
      for (let j = 0; j <= 24; j++) {
        const t = j / 24; vec.lerpVectors(parent.position, child.position, t); const p = project(vec.x, vec.y + 4 * t * (1 - t) * arc, vec.z);
        if (!j) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      if (!view.selected || selectedEdge) {
        const t = (clock * .14 + i * .137) % 1; vec.lerpVectors(parent.position, child.position, t);
        const p = project(vec.x, vec.y + 4 * t * (1 - t) * arc, vec.z);
        ctx.globalAlpha = selectedEdge ? 1 : .75; ctx.fillStyle = color; ctx.shadowBlur = 7; ctx.shadowColor = color;
        ctx.beginPath(); ctx.arc(p.x, p.y, selectedEdge ? 2.2 : 1.4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      }
    }
    const visible = [...nodes.values()].filter((n) => n.visible).map((n) => ({ n, p: project(n.position.x, n.position.y, n.position.z) })).sort((a, b) => b.p.z - a.p.z);
    for (const { n, p } of visible) {
      if (p.z > 1 || p.x < -130 || p.x > width + 130 || p.y < -150 || p.y > height + 150) continue;
      const selected = n.table.n === view.selected;
      const color = SPATIAL_COLORS[n.table.m] || "#9ac2f8";
      const w = 5.6 * n.size, d = 3.5 * (selected ? 1.85 : 1) * n.size;
      const center = n.position.toArray() as Point3;
      const top = quad(center, w, d, n.position.y + .4), bottom = quad(center, w, d, n.position.y - .5);
      ctx.globalAlpha = n.opacity;
      polygon([top[1], top[2], bottom[2], bottom[1]], "#16334e", `${color}80`);
      polygon([top[2], top[3], bottom[3], bottom[2]], "#132b44", `${color}80`);
      polygon(top, "#152943", selected ? color : `${color}aa`);
      if (Math.abs(top[1].x - top[0].x) > 30) textQuad(selected && n.expanded ? n.expanded : n.card, top);
      regions.push({ points: [...top], table: n.table.n });
      if ((view.module || view.focus) && !selected && Math.abs(top[1].x - top[0].x) < 105 * labelScale) {
        ctx.font = `600 ${13 * labelScale}px monospace`; ctx.textAlign = "center";
        const name = n.table.n; const tw = ctx.measureText(name).width + 14;
        const label = [{ x: p.x - tw / 2, y: p.y - 12 * labelScale, z: p.z }, { x: p.x + tw / 2, y: p.y - 12 * labelScale, z: p.z }, { x: p.x + tw / 2, y: p.y + 12 * labelScale, z: p.z }, { x: p.x - tw / 2, y: p.y + 12 * labelScale, z: p.z }];
        polygon(label, "#112139ee", `${color}70`); ctx.fillStyle = "#e8f2ff"; ctx.fillText(name, p.x, p.y + 5);
        regions.push({ points: label, table: name });
      }
    }
    ctx.globalAlpha = 1;
    for (const plate of layout.plates) {
      const p = project(plate.center[0], 2, plate.center[2] - plate.depth / 2 - 1.2);
      if (p.z > 1 || p.x < -60 || p.x > width + 60 || p.y < -30 || p.y > height + 30) continue;
      ctx.font = `600 ${14 * labelScale}px monospace`; ctx.textAlign = "center";
      const label = `${plate.code}  ·  ${plate.count}`; const w = ctx.measureText(label).width + 24;
      const points = [{ x: p.x - w / 2, y: p.y - 14 * labelScale, z: p.z }, { x: p.x + w / 2, y: p.y - 14 * labelScale, z: p.z }, { x: p.x + w / 2, y: p.y + 14 * labelScale, z: p.z }, { x: p.x - w / 2, y: p.y + 14 * labelScale, z: p.z }];
      polygon(points, "#11213aee", `${SPATIAL_COLORS[plate.code]}80`); ctx.fillStyle = SPATIAL_COLORS[plate.code]; ctx.fillText(label, p.x, p.y + 4);
      regions.push({ points, module: plate.code });
    }
    canvas.dataset.visibleTables = `${layout.points.size}`;
    canvas.dataset.selectedTable = view.selected || "";
    canvas.dataset.motion = view.motion ? "running" : "paused";
  }
  function frame(now: number) {
    if (stopped) return; raf = requestAnimationFrame(frame);
    const dt = Math.min((now - (last || now)) / 1000, .05); last = now;
    if (document.hidden) return;
    if (view.motion) clock += dt;
    if (now - lastRender < 1000 / 30) return; lastRender = now;
    if (flight) {
      camera.position.lerp(flight.position, .13); controls.target.lerp(flight.target, .13);
      if (camera.position.distanceTo(flight.position) < .03) flight = null;
      dirty = 50;
    }
    controls.autoRotate = view.motion && view.orbit && !view.selected && view.preset !== "top" && !flight;
    controls.update(dt); camera.updateMatrixWorld();
    if (!view.motion && !flight && dirty <= 0) return; dirty--;
    for (const n of nodes.values()) if (n.visible) {
      vec.copy(n.target); vec.y += n.table.n === view.selected ? 1.5 : Math.sin(clock * .85 + n.index * 1.7) * .23;
      n.position.lerp(vec, .16); n.size += ((n.table.n === view.selected ? 1.25 : 1) - n.size) * .15;
    }
    draw();
  }
  raf = requestAnimationFrame(frame);
  return { update, reset: fit, zoom(factor) { flight = null; camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target); dirty = 60; },
    dispose() { stopped = true; cancelAnimationFrame(raf); observer.disconnect(); controls.dispose(); canvas.removeEventListener("pointerdown", pointerDown); canvas.removeEventListener("pointerup", pointerUp); canvas.removeEventListener("pointermove", pointerMove); canvas.remove(); nodes.clear(); regions = []; },
  };
}
