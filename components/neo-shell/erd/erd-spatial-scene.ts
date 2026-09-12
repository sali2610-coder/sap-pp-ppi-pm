import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SPATIAL_COLORS, spatialLayout, type SpatialView, type SpatialLayout } from "./erd-spatial-model";
import { cardCanvas } from "./erd-spatial-card";
import { createCanvasSpatialScene } from "./erd-spatial-canvas";
import type { ErdCatalog, ErdTable } from "./erd-types";

export interface SpatialScene {
  update: (view: SpatialView) => void;
  zoom: (factor: number) => void;
  reset: () => void;
  dispose: () => void;
}

function cardTexture(table: ErdTable, expanded: boolean) {
  const canvas = cardCanvas(table, expanded);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSpatialScene(host: HTMLElement, data: ErdCatalog, initial: SpatialView, onPick: (name: string) => void, onModule: (code: string) => void, onLost: () => void): SpatialScene {
  let renderer: THREE.WebGLRenderer;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", { antialias: true, alpha: false, powerPreference: "high-performance" });
    if (!context) return createCanvasSpatialScene(host, data, initial, onPick, onModule);
    renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch {
    return createCanvasSpatialScene(host, data, initial, onPick, onModule);
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor("#081222");
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-label", "מפת טבלאות SAP בתלת ממד. לבחירה במקלדת השתמש ברשימת הטבלאות.");
  renderer.domElement.dataset.renderer = "webgl-3d";
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("#081222", .0018);
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 2400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .09;
  controls.minDistance = 10; controls.maxDistance = 1600;
  controls.minPolarAngle = .03; controls.maxPolarAngle = Math.PI * .46;
  controls.autoRotateSpeed = .22; controls.zoomSpeed = .7; controls.panSpeed = .8;
  scene.add(new THREE.AmbientLight("#dbe8ff", 2));
  const light = new THREE.DirectionalLight("#e1eeff", 3.5); light.position.set(50, 100, 30); scene.add(light);
  const rim = new THREE.DirectionalLight("#82aaff", 1.5); rim.position.set(-60, 30, -80); scene.add(rim);
  const grid = new THREE.GridHelper(650, 130, "#243c57", "#16283e");
  (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = .45;
  grid.position.y = -.5; scene.add(grid);
  const content = new THREE.Group(); scene.add(content);
  const boxGeo = new THREE.BoxGeometry(5.6, .62, 3.5);
  const topGeo = new THREE.PlaneGeometry(5.4, 3.3);
  const edgeGeo = new THREE.EdgesGeometry(boxGeo);
  const nodes = new Map<string, {
    group: THREE.Group; target: THREE.Vector3; body: THREE.Mesh; top: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    outline: THREE.LineSegments; base: THREE.CanvasTexture; expanded?: THREE.CanvasTexture;
    visible: boolean; index: number; size: number; label?: THREE.Sprite;
  }>();
  const pickables: THREE.Object3D[] = [];
  for (const [i, t] of data.tables.entries()) {
    const color = SPATIAL_COLORS[t.m] || "#bacce3";
    const group = new THREE.Group();
    const body = new THREE.Mesh(boxGeo, new THREE.MeshStandardMaterial({ color, roughness: .35, metalness: .3, transparent: true }));
    const outline = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: .8 }));
    const base = cardTexture(t, false);
    const top = new THREE.Mesh(topGeo, new THREE.MeshBasicMaterial({ map: base, transparent: true }));
    top.rotation.x = -Math.PI / 2; top.position.y = .325;
    body.userData.name = t.n; top.userData.name = t.n;
    group.add(body, top, outline); content.add(group); pickables.push(body, top);
    nodes.set(t.n, { group, target: new THREE.Vector3(), body, top, outline, base, visible: true, index: i, size: 1 });
  }
  const plateGroup = new THREE.Group(); content.add(plateGroup);
  const plateObjects: THREE.Object3D[] = [];
  function disposeTree(object: THREE.Object3D) {
    object.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        const map = (m as THREE.MeshBasicMaterial).map; if (map) map.dispose(); m.dispose();
      }
    });
  }
  const edges = data.edges.filter((e) => nodes.has(e.p) && nodes.has(e.c)).map((e, i) => {
    const source = data.tables.find((t) => t.n === e.p)!;
    const color = SPATIAL_COLORS[source.m] || "#a7c4ff";
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(33 * 3), 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .2 });
    const line = new THREE.Line(geometry, material); line.frustumCulled = false; content.add(line);
    return { edge: e, line, phase: (i * .137) % 1, highlight: false };
  });
  const pulseGeo = new THREE.BufferGeometry();
  const pulsePositions = new Float32Array(edges.length * 3);
  const pulseColors = new Float32Array(edges.length * 3);
  pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
  pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));
  const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({ size: .58, vertexColors: true, transparent: true, opacity: .9, sizeAttenuation: true }));
  pulses.frustumCulled = false; content.add(pulses);
  let view = initial;
  let layout: SpatialLayout;
  let cameraFlight: { position: THREE.Vector3; target: THREE.Vector3 } | null = null;
  let disposed = false, raf = 0, previous = 0, clock = 0, lastPaint = 0, dirty = 30;

  function fit() {
    const selectedPoint = view.selected && !view.focus ? layout.points.get(view.selected) : undefined;
    if (selectedPoint) {
      const target = new THREE.Vector3(...selectedPoint);
      cameraFlight = { target, position: target.clone().add(new THREE.Vector3(14, 25, 25)) }; dirty = 60; return;
    }
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
    const span = Math.max(layout.width / (w / h), layout.depth * 1.25);
    const distance = Math.max(30, span * 1.48);
    const target = new THREE.Vector3(0, 0, 0);
    cameraFlight = { target, position: view.preset === "top" ? new THREE.Vector3(0, distance * 1.2, .1) : new THREE.Vector3(distance * .34, distance * .87, distance * .84) };
    dirty = 60;
  }

  function makePlates() {
    for (const child of [...plateGroup.children]) { disposeTree(child); plateGroup.remove(child); }
    plateObjects.length = 0;
    for (const p of layout.plates) {
      const color = SPATIAL_COLORS[p.code];
      const slab = new THREE.Mesh(new THREE.BoxGeometry(p.width, .42, p.depth), new THREE.MeshStandardMaterial({ color, transparent: true, opacity: .10, roughness: .6, metalness: .3, depthWrite: false }));
      slab.position.set(...p.center); slab.position.y = -.08;
      const outline = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity: .5 })); outline.position.copy(slab.position);
      plateGroup.add(slab, outline);
      const c = document.createElement("canvas"); c.width = 384; c.height = 96;
      const ctx = c.getContext("2d")!; ctx.fillStyle = "#0f1e33"; ctx.fillRect(0, 0, 384, 96);
      ctx.fillStyle = color; ctx.fillRect(0, 0, 7, 96); ctx.font = "700 44px Arial"; ctx.textAlign = "left"; ctx.fillText(p.code, 24, 62);
      ctx.font = "40px Arial"; ctx.textAlign = "right"; ctx.fillStyle = "#d4dff0"; ctx.fillText(`${p.count}`, 356, 62);
      const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
      sprite.scale.set(15, 3.125, 1); sprite.position.set(p.center[0], 3.2, p.center[2] - p.depth / 2 - 1.5);
      sprite.userData.module = p.code; plateObjects.push(sprite); plateGroup.add(sprite);
    }
  }

  function update(next: SpatialView) {
    const layoutChanged = !layout || next.module !== view.module || next.focus !== view.focus || (next.focus && next.selected !== view.selected);
    const picked = next.selected !== view.selected;
    const presetChanged = next.preset !== view.preset;
    view = next;
    if (layoutChanged) { layout = spatialLayout(data, next); makePlates(); }
    const nearby = new Set(next.selected ? [next.selected, ...data.edges.flatMap((e) => e.p === next.selected ? [e.c] : e.c === next.selected ? [e.p] : [])] : []);
    for (const [name, n] of nodes) {
      if (name !== next.selected && n.expanded) {
        n.top.material.map = n.base; n.expanded.dispose(); n.expanded = undefined;
      }
      const point = layout.points.get(name); const wasVisible = n.visible;
      n.visible = !!point; n.group.visible = !!point;
      if (!point) continue;
      n.target.set(...point);
      if (!wasVisible || !previous) n.group.position.copy(n.target);
      const selected = name === next.selected;
      n.size = selected ? 1.25 : 1;
      if (selected && !n.expanded) n.expanded = cardTexture(data.tables.find((t) => t.n === name)!, true);
      if ((next.module || next.focus) && !n.label) {
        const c = document.createElement("canvas"); c.width = (name.length * 8 + 24) * 2; c.height = 48;
        const ctx = c.getContext("2d")!; ctx.scale(2, 2);
        ctx.fillStyle = "#112139"; ctx.fillRect(0, 0, c.width / 2, 24);
        ctx.strokeStyle = SPATIAL_COLORS[data.tables.find((t) => t.n === name)!.m]; ctx.strokeRect(.5, .5, c.width / 2 - 1, 23);
        ctx.font = "600 13px monospace"; ctx.textAlign = "center"; ctx.fillStyle = "#e8f2ff"; ctx.fillText(name, c.width / 4, 17);
        const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace;
        n.label = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
        n.label.userData.name = name; n.label.position.y = .8; n.group.add(n.label); pickables.push(n.label);
      }
      if (n.label) { n.label.visible = !!(next.module || next.focus) && !selected; n.label.material.opacity = next.selected && !nearby.has(name) ? .2 : 1; }
      n.top.material.map = selected ? n.expanded! : n.base;
      const opacity = next.selected && !nearby.has(name) ? .2 : 1;
      (n.body.material as THREE.Material).opacity = opacity;
      n.top.material.opacity = opacity;
      (n.outline.material as THREE.Material).opacity = selected ? 1 : opacity * .65;
    }
    for (const edge of edges) {
      edge.highlight = !!next.selected && (edge.edge.p === next.selected || edge.edge.c === next.selected);
      edge.line.visible = next.links && !!nodes.get(edge.edge.p)?.visible && !!nodes.get(edge.edge.c)?.visible;
      edge.line.material.opacity = next.selected ? (edge.highlight ? .85 : .045) : next.module ? .38 : .14;
    }
    pulses.visible = next.links;
    if (layoutChanged || presetChanged) fit();
    else if (picked && next.selected) {
      const node = nodes.get(next.selected);
      if (node?.visible) {
        const target = node.target.clone();
        cameraFlight = { target, position: target.clone().add(new THREE.Vector3(14, 25, 25)) };
      }
    }
    dirty = 60;
  }
  update(initial);
  function startCamera() {
    if (cameraFlight) { camera.position.copy(cameraFlight.position); controls.target.copy(cameraFlight.target); cameraFlight = null; }
  }
  startCamera();

  function resize() {
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    if (!view.selected || view.focus) fit();
    dirty = 60;
  }
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
  let down = { x: 0, y: 0 };
  const pointerDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY }; cameraFlight = null; dirty = 60; };
  const pointerUp = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6 || e.button !== 0) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...pickables.filter((o) => o.visible && o.parent?.visible), ...plateObjects], false)[0];
    if (hit?.object.userData.name) onPick(hit.object.userData.name);
    else if (hit?.object.userData.module) onModule(hit.object.userData.module);
  };
  const wake = () => { dirty = 60; };
  const lost = (event: Event) => { event.preventDefault(); onLost(); };
  renderer.domElement.addEventListener("pointerdown", pointerDown);
  renderer.domElement.addEventListener("pointerup", pointerUp);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  controls.addEventListener("change", wake);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), point = new THREE.Vector3();
  function bezier(t: number, start: THREE.Vector3, end: THREE.Vector3, height: number, dest: THREE.Vector3) {
    dest.lerpVectors(start, end, t); dest.y += 4 * t * (1 - t) * height; return dest;
  }
  function frame(now: number) {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - (previous || now)) / 1000, .05); previous = now;
    if (document.hidden) return;
    if (view.motion) clock += dt;
    if (now - lastPaint < 1000 / 45) return;
    lastPaint = now;
    if (cameraFlight) {
      const amount = 1 - Math.exp(-dt * 8);
      camera.position.lerp(cameraFlight.position, amount); controls.target.lerp(cameraFlight.target, amount);
      if (camera.position.distanceTo(cameraFlight.position) < .035) cameraFlight = null;
      dirty = 30;
    }
    controls.autoRotate = view.motion && view.orbit && !view.selected && view.preset !== "top" && !cameraFlight;
    controls.update(dt);
    if (!view.motion && !cameraFlight && dirty <= 0) return;
    dirty--;
    const labelScale = Math.min(1.8, Math.max(1, host.clientHeight / 800));
    const pixelSize = (position: THREE.Vector3) => 2 * camera.position.distanceTo(position) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / host.clientHeight;
    for (const label of plateObjects) {
      const size = pixelSize(label.position) * labelScale;
      label.scale.set(120 * size, 30 * size, 1);
    }
    for (const [name, n] of nodes) {
      if (!n.visible) continue;
      const selected = name === view.selected;
      point.copy(n.target); point.y += selected ? 1.2 : Math.sin(clock * .8 + n.index * 1.7) * .22;
      n.group.position.lerp(point, .13);
      const z = selected ? n.size * 1.85 : 1;
      n.group.scale.lerp(point.set(n.size, 1, z), .12);
      if (n.label?.visible) { const size = pixelSize(n.group.position) * labelScale; n.label.scale.set((name.length * 8 + 24) * size, 24 * size, 1); }
    }
    edges.forEach((edge, i) => {
      if (!edge.line.visible) { pulsePositions[i * 3 + 1] = -1000; return; }
      a.copy(nodes.get(edge.edge.p)!.group.position); b.copy(nodes.get(edge.edge.c)!.group.position);
      a.y += .2; b.y += .2;
      const height = Math.min(18, a.distanceTo(b) * .22 + 2);
      const attribute = edge.line.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let j = 0; j <= 32; j++) { bezier(j / 32, a, b, height, point); attribute.setXYZ(j, point.x, point.y, point.z); }
      attribute.needsUpdate = true;
      bezier((clock * .14 + edge.phase) % 1, a, b, height, point);
      const showPulse = !view.selected || edge.highlight;
      pulsePositions.set(showPulse ? [point.x, point.y, point.z] : [0, -1000, 0], i * 3);
      const color = edge.line.material.color; pulseColors.set([color.r, color.g, color.b], i * 3);
    });
    (pulseGeo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (pulseGeo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);
  return {
    update,
    zoom(factor) { cameraFlight = null; camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target); dirty = 60; },
    reset: fit,
    dispose() {
      disposed = true; cancelAnimationFrame(raf); observer.disconnect(); controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", pointerDown); renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      for (const n of nodes.values()) { n.base.dispose(); n.expanded?.dispose(); }
      disposeTree(scene); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
