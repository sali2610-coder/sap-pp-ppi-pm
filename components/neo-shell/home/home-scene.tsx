"use client";

// Project NEO · Stage 2B — the Home scene.
//
// One ordinary scroll container, five stacked layers:
//   FIELD    105 dots, one per real merged SAP table, on three depth planes,
//            plus the ER edge layer and the field's own captions. Sticky,
//            aria-hidden, pointer-events:none. Every formation is a claim about
//            the data and every transition between two formations is legible.
//   BODIES   the two module bodies. The SAME two elements survive the whole
//            page in three registers, so the eye tracks one object throughout.
//   HUD      the nearest-dot readout.
//   INDEX    where you are.
//   CONTENT  the sections, rendered on the SERVER and passed in as children.
//
// WHAT MAKES A TRANSITION EXPLAIN ITSELF (the Stage 2C brief)
//   1. Nothing is ever created or destroyed. A section change moves the dots
//      that are already on screen; a dot is one table for the whole page. No
//      formation ever drops a dot below opacity 0.34, so a group can recede but
//      it can never pop in or vanish.
//   2. Groups arrive in WAVES (formations.wave), in the reading order of the
//      claim, so grouping is watched happening rather than found finished.
//   3. Related tables are STACKED WITH the neighbour the dictionary states —
//      a family column under its shared head, a dependent column at its process
//      step. No orbits, no scatter, no jitter: formations.ts has no RNG at all.
//   4. Relationships are DRAWN, from the real ER map, only where the section is
//      about relationships — and in those formations both endpoints are lattice
//      slots, so a line is always a short run between two named things.
//   5. STRUCTURAL RULES PERSIST. The spine and the plinth (.nh-rule) are shared
//      by two formations each, so the eye keeps a fixed reference across the
//      change instead of re-reading a fresh composition.
//   6. HANDOFF: where a section renders the very tables the field is holding,
//      the dots fly to those elements, light them, and fade into them. When the
//      next section starts, those dots are snapped back onto the (re-measured)
//      elements they were handed to and fly out from there — a FLIP, so the
//      information visibly leaves the place it went into.
//   7. Every formation NAMES ITSELF: formations.captions() returns a lead line
//      stating what the arrangement proves plus one real count per group, so the
//      field is legible with every pixel frozen.
//
// NOTHING here touches scroll behaviour. No wheel listener, no touch listener,
// no preventDefault, no scroll lock, no scroll-linked animation loop. We read
// scrollTop in a passive, rAF-coalesced listener and flip one attribute; CSS
// and a bounded set of element-level property writes do the rest.
//
// Only `translate`, `rotate`, `scale`, `opacity` and `transform` are ever
// written — all of them compositor properties. `translate`/`scale` carry the
// FORMATION (slow) and `transform` carries the POINTER LENS (fast), which is
// why the two can overlap without one cancelling the other.

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { ArrowUpLeft } from "lucide-react";
import {
  DOCK, HANDOFF, LENS_GROW, LENS_PUSH, LENS_R,
  captions, edgeVisible, place, prepare, tally, topicSlots, wave,
  type Env, type Prep,
} from "./formations";
import { ZONE_HE, zoneVar, type HomeData } from "./home-data";

const nf = new Intl.NumberFormat("he-IL");

export interface SceneSection { id: string; label: string; field: string }

/** Register the two module bodies are in, per section index. l = introduced,
 *  m = medium, d = docked context pair for the rest of the page. */
const REGISTER = ["l", "m", "m", "d", "d", "d"] as const;

/** The formation flight, and the two beats of the handoff that follows it.
 *  HAND_WAIT lets the formation land before anything is given away; HAND_FADE
 *  is the flight from the field onto the content element. Both are matched to
 *  the transition durations in app/neo/home.css. */
const HAND_WAIT = 620;
const HAND_FADE = 620;

export function HomeScene({
  data, sections, children,
}: { data: HomeData; sections: SceneSection[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const read = useRef<HTMLDivElement>(null);

  // Deterministic and pure, so one memo serves both the markup and the effect —
  // and the indices the two of them exchange through data-nh-dot always agree.
  const preps = useMemo(
    () => prepare(
      data.dots,
      data.flows.map((f) => f.steps.filter((s) => s.exists).map((s) => s.code)),
      data.edges,
    ),
    [data],
  );
  const planes = useMemo(
    () => ([2, 1, 0] as const).map((z) => ({ z, dots: preps.filter((p) => p.z === z) })),
    [preps],
  );
  const topics = useMemo(() => {
    const counts = data.density.map(() => 0);
    for (const p of preps) counts[p.d.tp] = (counts[p.d.tp] || 0) + 1;
    return topicSlots(data.density, counts);
  }, [data, preps]);
  // Only the edges some formation can actually show are given an element. The
  // rest of the ER map is real but never drawn here, so it costs nothing.
  const edges = useMemo(
    () => data.edges.filter((e) =>
      [0, 2, 4].some((s) => edgeVisible(s, preps[e.a], preps[e.b]))),
    [data, preps],
  );
  // Group sizes, counted once. Every lattice is sized from these.
  const counts = useMemo(() => tally(preps), [preps]);
  // Section 04's formation needs one caption per real topic plus the formation's
  // own lead line; no other formation needs more. The pool is sized once and
  // reused, never rebuilt per section.
  const capPool = useMemo(() => Math.max(6, topics.length + 2), [topics]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const field = el.querySelector<HTMLElement>("[data-nh-field]");
    const lens = el.querySelector<HTMLElement>("[data-nh-lens]");
    const readEl = read.current;
    if (!field) return;

    // The shell owns the scroll container; on the mobile shell the canvas is
    // still the scroller, so one lookup covers both.
    const scroller = el.closest<HTMLElement>(".nx-canvas") || document.documentElement;
    const rtl = getComputedStyle(el).direction === "rtl";
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const maxCov = Math.max(...data.dots.map((d) => d.d));
    const maxTopic = Math.max(...data.density.map((t) => t.tables));

    const nodes = [...el.querySelectorAll<HTMLElement>("[data-nh-dot]")];
    const order = nodes.map((n) => preps[Number(n.dataset.nhDot)]);
    /** prep index -> element index. The two orders differ: the markup groups the
     *  dots by depth plane so blur can be applied once per plane. */
    const slot = new Map(order.map((p, i) => [p.i, i]));
    const byName = new Map(order.map((p, i) => [p.d.n, i]));
    const edgeEls = [...el.querySelectorAll<HTMLElement>("[data-nh-edge]")];
    const capEls = [...el.querySelectorAll<HTMLElement>("[data-nh-cap]")];
    const bodies = [...el.querySelectorAll<HTMLElement>("[data-nh-body]")];
    const secEls = [...el.querySelectorAll<HTMLElement>("[data-hsec]")];
    const jumps = [...el.querySelectorAll<HTMLElement>("[data-nh-jump]")];

    // Cached formation positions, in element order — the lens reads these
    // instead of measuring, so a pointer move never touches layout.
    const pos: { x: number; y: number; s: number }[] = nodes.map(() => ({ x: 0, y: 0, s: 1 }));
    let W = 0; let H = 0; let sec = -1;
    let lensed = new Set<number>();
    /** element index -> the table name it was handed to, and in which section. */
    let handed = new Map<number, string>();
    let handSec = -1;
    let t1 = 0; let t2 = 0;

    /** Inline-start-relative x → a physical translate. The stylesheet stays on
     *  logical properties; the direction flip lives here, once. */
    const tx = (x: number) => (rtl ? -x : x);

    const env = (): Env => ({
      W, H, maxF: data.maxFields, maxCov, maxTopic,
      all: preps, topics, counts,
    });

    /* ---- anchors · where a section renders the tables the field holds ------ */
    /** Field-local, inline-start-relative centre of every anchored marker in a
     *  section. Measured once per section change, never during scroll. */
    const anchorsOf = (secEl: HTMLElement | undefined) => {
      const out = new Map<string, { x: number; y: number }>();
      if (!secEl) return out;
      const fr = field.getBoundingClientRect();
      for (const a of secEl.querySelectorAll<HTMLElement>("[data-nh-anchor]")) {
        const name = a.dataset.nhAnchor!;
        const mark = a.querySelector<HTMLElement>(".nh-cls") || a;
        const r = mark.getBoundingClientRect();
        const px = r.left + r.width / 2 - fr.left;
        out.set(name, {
          x: rtl ? fr.width - px : px,
          y: r.top + r.height / 2 - fr.top,
        });
      }
      return out;
    };

    const unlight = (secEl: HTMLElement | undefined) => {
      if (!secEl) return;
      for (const a of secEl.querySelectorAll<HTMLElement>("[data-nh-anchor]")) {
        delete a.dataset.nhLit;
      }
    };

    const paint = (k: number, instant: boolean) => {
      const e = env();
      const dock = W < DOCK;

      /* FLIP · the dots this page handed to the previous section's content are
         invisible and parked at a stale position. Snap them back onto the very
         elements they went into — measured NOW, so the snap is exact — and let
         the formation below fly them out from there. Nothing on this page ever
         re-appears somewhere it was not last seen. */
      if (handed.size && handSec !== k) {
        const fresh = anchorsOf(secEls[handSec]);
        let moved = false;
        for (const [i, name] of handed) {
          const a = fresh.get(name);
          if (!a) continue;
          nodes[i].style.transitionDuration = "0ms";
          nodes[i].style.setProperty("translate", `${tx(a.x).toFixed(1)}px ${a.y.toFixed(1)}px`);
          nodes[i].style.setProperty("scale", "0.5");
          moved = true;
        }
        unlight(secEls[handSec]);
        // One forced reflow per section change, so the snap is a real starting
        // frame rather than a value the next write coalesces away.
        if (moved) field.getBoundingClientRect();
        for (const [i] of handed) nodes[i].style.transitionDuration = "";
        handed = new Map();
        handSec = -1;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const p = order[i];
        const q = place(k, p, e);
        pos[i] = { x: q.x, y: q.y, s: q.s };
        const n = nodes[i];
        if (instant) n.style.transitionDuration = "0ms";
        n.style.setProperty("translate", `${tx(q.x).toFixed(1)}px ${q.y.toFixed(1)}px`);
        n.style.setProperty("scale", q.s.toFixed(3));
        n.style.opacity = q.o.toFixed(2);
        // Motion hierarchy: the field does not move as one slab. The stagger is
        // by GROUP first — the wave a dot belongs to in this formation — and by
        // depth plane second, so a reformation reads as grouping and as volume.
        if (!instant) {
          n.style.transitionDelay = `${Math.round(wave(k, p, e) * 72 + p.z * 46 + (i % 9) * 11)}ms`;
        }
      }
      if (instant) {
        requestAnimationFrame(() => nodes.forEach((n) => { n.style.transitionDuration = ""; }));
      }

      /* ER edges · relationships appear only where the section is about them,
         and they are drawn from the SAME cached positions the dots just took,
         so a line can never point at a place a dot is not. */
      for (let i = 0; i < edgeEls.length; i += 1) {
        const ed = edges[i];
        const ai = slot.get(ed.a); const bi = slot.get(ed.b);
        const on = ai !== undefined && bi !== undefined
          && edgeVisible(k, preps[ed.a], preps[ed.b]);
        const g = edgeEls[i];
        if (!on) { g.style.opacity = "0"; continue; }
        const ax = tx(pos[ai!].x); const ay = pos[ai!].y;
        const bx = tx(pos[bi!].x); const by = pos[bi!].y;
        const len = Math.hypot(bx - ax, by - ay);
        if (instant) g.style.transitionDuration = "0ms";
        g.style.setProperty("translate", `${ax.toFixed(1)}px ${ay.toFixed(1)}px`);
        g.style.setProperty("rotate", `${((Math.atan2(by - ay, bx - ax) * 180) / Math.PI).toFixed(2)}deg`);
        g.style.setProperty("scale", `${Math.max(1, len).toFixed(1)} 1`);
        g.style.opacity = (k === 2 ? 0.5 : 0.42).toFixed(2);
        if (!instant) g.style.transitionDelay = `${140 + (i % 14) * 26}ms`;
      }
      if (instant) {
        requestAnimationFrame(() => edgeEls.forEach((g) => { g.style.transitionDuration = ""; }));
      }

      /* Captions · the field names its own groups, in real counts. */
      const caps = captions(k, e, [edges.filter((ed) => edgeVisible(k, preps[ed.a], preps[ed.b])).length]);
      for (let i = 0; i < capEls.length; i += 1) {
        const c = caps[i];
        const g = capEls[i];
        if (!c) { g.dataset.on = "0"; continue; }
        g.dataset.on = "1";
        g.dataset.tone = c.tone;
        g.dataset.lead = c.lead ? "1" : "0";
        g.style.setProperty("translate", `${tx(c.x).toFixed(1)}px ${c.y.toFixed(1)}px`);
        g.style.transitionDelay = instant ? "0ms" : `${420 + i * 34}ms`;
        const b = g.children[0] as HTMLElement;
        const em = g.children[1] as HTMLElement;
        if (b.textContent !== c.t) b.textContent = c.t;
        if (em.textContent !== c.s) em.textContent = c.s;
      }

      const reg = REGISTER[Math.min(Math.max(k, 0), REGISTER.length - 1)];
      // Register M and D both live in the CONTEXT GUTTER the sections reserve on
      // the far edge, so the pair never lands on top of the content it is meant
      // to accompany. The two registers differ in mass and in what they say,
      // not in where they are — that is what makes the transformation legible.
      const sizes = bodies.map((b, i) => {
        const mass = 0.9 + data.modules[i].share * 0.34;
        return { w: b.offsetWidth, h: b.offsetHeight, mass };
      });
      let gutterY = H * (reg === "m" ? 0.14 : 0.12);
      // Register L is a STACK on the far edge, fitted to the canvas: the two
      // hero cards can therefore never overlap each other or the field, and the
      // corridor formations.corridor() reserves for the membership blocks is the
      // same corridor the cards leave free. One geometry, two files.
      const stackH = sizes.reduce((a, z) => a + z.h * z.mass, 0) + 16;
      const stackW = Math.max(...sizes.map((z) => z.w * z.mass));
      const lk = Math.min(1.02, (H * 0.88) / stackH, (W * 0.28) / stackW);
      let heroY = Math.max(10, (H - stackH * lk) / 2);
      // Narrow canvases have no gutter, so the pair becomes a small dock in the
      // block-end / inline-end corner: the reading edge (inline start, the right
      // in Hebrew) is the one thing it must never sit on.
      const dockS = (i: number) => sizes[i].mass * (reg === "l" || reg === "m" ? 0.34 : 0.26);
      const dockW = sizes.reduce((a, z, i) => a + z.w * dockS(i), 0) + 10;
      bodies.forEach((b, i) => {
        const r = reg === "l" && dock ? "m" : reg;
        b.dataset.r = r;
        // Mass is real: PP-PI documents more tables than PM, so its body is
        // bigger. The number on the card and the size of the card agree.
        const { w: bw0, h: bh0, mass } = sizes[i];
        let x: number; let y: number; let s: number;
        if (r === "l") {
          s = mass * lk;
          x = W - bw0 * s - Math.max(12, W * 0.018);
          y = heroY;
          heroY += bh0 * s + 16;
        } else if (dock) {
          s = dockS(i);
          x = W - dockW - 12 + (i === 0 ? 0 : sizes[0].w * dockS(0) + 10);
          y = H - bh0 * s - 12;
        } else {
          s = mass * (r === "m" ? 0.55 : 0.34);
          x = W - bw0 * s - 16;
          y = gutterY;
          gutterY += bh0 * s + 14;
        }
        // Clamped inside the canvas, so no register at any breakpoint can push
        // the page into a horizontal scroll — the one failure mode a free
        // floating layer invites.
        const bw = bw0 * s; const bh = bh0 * s;
        x = Math.min(Math.max(x, 8), Math.max(8, W - bw - 8));
        y = Math.min(Math.max(y, 8), Math.max(8, H - bh - 8));
        if (instant) b.style.transitionDuration = "0ms";
        b.style.setProperty("translate", `${tx(x).toFixed(1)}px ${y.toFixed(1)}px`);
        b.style.setProperty("scale", s.toFixed(3));
      });
      if (instant) {
        requestAnimationFrame(() => bodies.forEach((b) => { b.style.transitionDuration = ""; }));
      }

      /* HANDOFF · where this section renders the very tables the field is
         holding, the dots go and sit on them, light them, and fade into them.
         This is the beat the whole page is built around: a group of data
         becomes an object, and the object becomes content you can read. */
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (!instant && !calm.matches && HANDOFF.has(k)) {
        t1 = window.setTimeout(() => {
          const marks = anchorsOf(secEls[k]);
          const next = new Map<number, string>();
          let d = 0;
          for (const [name, a] of marks) {
            const i = byName.get(name);
            if (i === undefined) continue;
            if (a.y < -40 || a.y > H + 40) continue;
            nodes[i].dataset.fly = "1";
            nodes[i].style.transitionDelay = `${d * 26}ms`;
            nodes[i].style.setProperty("translate", `${tx(a.x).toFixed(1)}px ${a.y.toFixed(1)}px`);
            nodes[i].style.setProperty("scale", "0.62");
            next.set(i, name);
            d += 1;
          }
          handed = next;
          handSec = k;
          t2 = window.setTimeout(() => {
            for (const [i, name] of handed) {
              nodes[i].style.opacity = "0";
              nodes[i].style.setProperty("scale", "0.5");
              delete nodes[i].dataset.fly;
              const host = secEls[k].querySelector<HTMLElement>(`[data-nh-anchor="${CSS.escape(name)}"]`);
              if (host) host.dataset.nhLit = "1";
            }
          }, HAND_FADE);
        }, HAND_WAIT);
      }
    };

    // The sticky layers are sized from the SCROLLER, not from themselves: their
    // own height is driven by --nh-vh, so measuring them would be circular.
    const measure = (force: boolean) => {
      const w = scroller.clientWidth; const h = scroller.clientHeight;
      if (!w || !h) return;
      el.style.setProperty("--nh-vh", `${h}px`);
      if (!force && w === W && h === H) return;
      W = w; H = h;
      paint(Math.max(0, sec), true);
    };

    /* ---- section state · read the scroll, never take it over -------------- */
    let queued = false;
    const sync = () => {
      queued = false;
      const probe = scroller.scrollTop + scroller.clientHeight * 0.42;
      let k = 0;
      secEls.forEach((s, i) => { if (probe >= s.offsetTop) k = i; });
      el.style.setProperty("--nh-sy", String(Math.round(scroller.scrollTop)));
      if (k === sec) return;
      sec = k;
      el.dataset.sec = String(k);
      jumps.forEach((b, i) => b.setAttribute("aria-current", i === k ? "true" : "false"));
      // The section you are IN is lit: the client asked for the colour to be
      // alive, and the cheapest honest way to spend it is on where you are.
      // One attribute, six elements, no layout — CSS does the rest.
      secEls.forEach((s, i) => { s.dataset.active = i === k ? "1" : "0"; });
      paint(k, false);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sync); } };
    scroller.addEventListener("scroll", onScroll, { passive: true });

    /* ---- reveal · a transition gated by an attribute, never an entry
       animation. Without JS the sections are simply there. ------------------ */
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      secEls.forEach((s) => { s.dataset.pre = "1"; });
      io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) (e.target as HTMLElement).dataset.in = "1";
      }, { root: scroller === document.documentElement ? null : scroller, rootMargin: "0px 0px -14% 0px", threshold: 0.06 });
      secEls.forEach((s) => io!.observe(s));
    }

    /* ---- the field answers the content -----------------------------------
       Hovering a coverage axis or a topic in the copy asks the field a
       question, and the field answers by muting everything that is not part of
       the answer. This is the shortest possible line between a number in the
       text and the objects it is a number ABOUT. */
    let askKey = "";
    const ask = (key: string, test: ((p: Prep) => boolean) | null) => {
      if (key === askKey) return;
      askKey = key;
      if (!test) {
        for (const n of nodes) { delete n.dataset.mute; delete n.dataset.hi; }
        delete el.dataset.ask;
        return;
      }
      el.dataset.ask = "1";
      for (let i = 0; i < nodes.length; i += 1) {
        if (test(order[i])) { nodes[i].dataset.hi = "1"; delete nodes[i].dataset.mute; }
        else { nodes[i].dataset.mute = "1"; delete nodes[i].dataset.hi; }
      }
    };
    const testFor = (t: HTMLElement | null): [string, ((p: Prep) => boolean) | null] => {
      const axEl = t?.closest<HTMLElement>("[data-nh-axis]");
      if (axEl) {
        const bit = 1 << Number(axEl.dataset.nhAxis);
        return [`ax${bit}`, (p) => (p.d.ax & bit) !== 0];
      }
      const tpEl = t?.closest<HTMLElement>("[data-nh-topic]");
      if (tpEl) {
        const idx = Number(tpEl.dataset.nhTopic);
        return [`tp${idx}`, (p) => p.d.tps.includes(idx)];
      }
      const anEl = t?.closest<HTMLElement>("[data-nh-anchor]");
      if (anEl) {
        const name = anEl.dataset.nhAnchor;
        return [`an${name}`, (p) => p.d.n === name];
      }
      return ["", null];
    };
    const onOver = (ev: PointerEvent) => ask(...testFor(ev.target as HTMLElement));
    const onOut = (ev: PointerEvent) => {
      const [key, test] = testFor(ev.relatedTarget as HTMLElement | null);
      if (!test) ask(key, null);
    };

    /* ---- the pointer lens · proximity, not a gimmick ---------------------- */
    let pTick = false; let pxr = 0; let pyr = 0; let inside = false;
    const applyLens = () => {
      pTick = false;
      const hit = new Set<number>();
      let near = -1; let nearD = LENS_R;
      if (inside) {
        for (let i = 0; i < nodes.length; i += 1) {
          if (nodes[i].dataset.fly) continue;
          const dx = pxr - pos[i].x; const dy = pyr - pos[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist > LENS_R) continue;
          hit.add(i);
          const k = 1 - dist / LENS_R;
          const push = (LENS_PUSH * k * k) / Math.max(0.4, pos[i].s);
          const ux = dist < 0.001 ? 0 : dx / dist;
          const uy = dist < 0.001 ? 0 : dy / dist;
          nodes[i].style.transform = `translate(${tx(-ux * push).toFixed(1)}px, ${(-uy * push).toFixed(1)}px) scale(${(1 + LENS_GROW * k * k).toFixed(3)})`;
          nodes[i].dataset.near = "1";
          if (dist < nearD) { nearD = dist; near = i; }
        }
      }
      for (const i of lensed) {
        if (hit.has(i)) continue;
        nodes[i].style.transform = "";
        delete nodes[i].dataset.near;
      }
      lensed = hit;
      if (lens) {
        lens.style.setProperty("translate", `${tx(pxr).toFixed(1)}px ${pyr.toFixed(1)}px`);
        lens.dataset.on = inside ? "1" : "0";
      }
      if (readEl) {
        if (near >= 0) {
          const p: Prep = order[near];
          readEl.dataset.on = "1";
          const rx = Math.min(pos[near].x, Math.max(0, W - 300));
          const ry = Math.min(pos[near].y, Math.max(0, H - 110));
          readEl.style.setProperty("translate", `${tx(rx).toFixed(1)}px ${ry.toFixed(1)}px`);
          readEl.style.setProperty("--o", zoneVar(p.d.z));
          const a = readEl.children[0] as HTMLElement;
          if (a.textContent !== p.d.n) {
            a.textContent = p.d.n;
            (readEl.children[1] as HTMLElement).textContent = p.d.he;
            (readEl.children[2] as HTMLElement).textContent =
              `${p.d.f} שדות · ${ZONE_HE[p.d.z]} · ${p.d.r} קשרי ER · ${p.d.b === 1 ? "PM + PP-PI" : p.d.b === 0 ? "PM" : "PP-PI"}`;
          }
        } else {
          readEl.dataset.on = "0";
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      const rx = e.clientX - r.left; const ry = e.clientY - r.top;
      // Field coordinates are inline-start-relative, so the lens maths and the
      // formation maths speak the same language in both directions.
      pxr = rtl ? r.width - rx : rx;
      pyr = ry;
      inside = !(e.target as HTMLElement).closest("[data-nh-solid]");
      el.style.setProperty("--nh-mx", ((rx / r.width - 0.5) * 2).toFixed(3));
      el.style.setProperty("--nh-my", ((ry / r.height - 0.5) * 2).toFixed(3));
      if (!pTick) { pTick = true; requestAnimationFrame(applyLens); }
    };
    const onLeave = () => {
      inside = false;
      el.style.setProperty("--nh-mx", "0");
      el.style.setProperty("--nh-my", "0");
      if (!pTick) { pTick = true; requestAnimationFrame(applyLens); }
    };
    // A coarse pointer has no hover, and reduced motion asked for none of this.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      el.addEventListener("pointerover", onOver, { passive: true });
      el.addEventListener("pointerout", onOut, { passive: true });
    }
    if (!calm.matches && fine) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave, { passive: true });
    }

    /* ---- keep the environment honest about its own size ------------------- */
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure(false));
      ro.observe(scroller);
    }

    /* ---- the opening · the 105 arrive from outside the frame -------------- */
    requestAnimationFrame(() => {
      if (calm.matches) {
        measure(true);
        sync();
        el.dataset.ready = "1";
        return;
      }
      // DISPERSE -> GATHER. The 105 are painted once, instantly, outside the
      // frame, and the first formation is them arriving. sync() below sees a
      // section index that differs from the -1 the page starts in, so the
      // arrival is the page's ordinary first transition and not a special case.
      W = scroller.clientWidth; H = scroller.clientHeight;
      if (!W || !H) { measure(true); sync(); el.dataset.ready = "1"; return; }
      el.style.setProperty("--nh-vh", `${H}px`);
      paint(-1, true);
      requestAnimationFrame(() => {
        el.dataset.ready = "1";
        sync();
      });
    });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      scroller.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerover", onOver);
      el.removeEventListener("pointerout", onOut);
      io?.disconnect();
      ro?.disconnect();
    };
  }, [data, preps, topics, edges, counts]);

  return (
    <div className="nh" ref={root} data-sec="0" data-ready="0">
      {/* ------------------------------------------------ layer 0 · the field */}
      <div className="nh-field" data-nh-field aria-hidden="true">
        <span className="nh-grid" />
        <span className="nh-aura nh-aura--pm" style={{ "--m": "var(--mod-pm)" } as React.CSSProperties} />
        <span className="nh-aura nh-aura--pp" style={{ "--m": "var(--mod-pppi)" } as React.CSSProperties} />
        {/* The field's structural rules. Not decoration and not a circle: each
            one is a line a formation actually stands on, and two of them are
            shared between formations on purpose — the spine carries the family
            heads in 03 and the first process rail in 05, the plinth carries the
            "outside this claim" reservoir in both. Seeing the same line survive
            a section change is what makes the change read as one dataset
            re-forming rather than a new drawing. Percentages here mirror
            SPINE_Y / COV_BASE / PLINTH_Y in formations.ts. */}
        <span className="nh-rule nh-rule--spine" />
        <span className="nh-rule nh-rule--rail" />
        <span className="nh-rule nh-rule--base" />
        <span className="nh-rule nh-rule--plinth" />
        {/* The ER map. One element per real relation between two of the 105;
            never a decorative line, and never a line the dictionary does not
            hold. Each edge is a 1px box translated to its first endpoint,
            rotated to its neighbour and scaled along x to the distance between
            them — three compositor properties, no layout. */}
        <span className="nh-edges">
          {edges.map((e) => (
            <i key={`${e.a}-${e.b}`} className="nh-edge" data-nh-edge data-k={e.k} />
          ))}
        </span>
        {planes.map((plane) => (
          <span className="nh-plane" data-z={plane.z} key={plane.z}>
            {plane.dots.map((p) => (
              <i
                key={p.d.n}
                className="nh-dot"
                data-nh-dot={p.i}
                data-b={p.d.b}
                data-s={p.d.s}
                style={{ "--o": zoneVar(p.d.z) } as React.CSSProperties}
              />
            ))}
          </span>
        ))}
        {/* The field names its own groups. Every string here is written from a
            real count at paint time — see formations.captions(). */}
        <span className="nh-caps">
          {Array.from({ length: capPool }, (_, i) => (
            <b className="nh-cap" data-nh-cap key={i} data-on="0" data-lead="0"><b /><em /></b>
          ))}
        </span>
        <span className="nh-lens" data-nh-lens data-on="0" />
        <span className="nh-vig" />
      </div>

      {/* The readout is its own sticky layer rather than a child of the field:
          it shares the field's geometry exactly, but it has to sit ABOVE the
          module bodies, and the field is a stacking context of its own. */}
      <div className="nh-hud" aria-hidden="true">
        <div className="nh-read" ref={read} data-on="0">
          <b className="nh-sap" />
          <span />
          <em />
        </div>
      </div>

      {/* -------------------------------- layer 2 · the two persistent bodies */}
      <div className="nh-bodies">
        {data.modules.map((mo, i) => (
          <Link
            key={mo.key}
            href={mo.href}
            prefetch={false}
            className="nh-body"
            data-nh-body={i}
            data-r="l"
            style={{ "--m": mo.m } as React.CSSProperties}
            aria-label={`כניסה לסביבת ${mo.code} · ${mo.he}`}
          >
            <span className="nh-body-glow" aria-hidden="true" />
            <span className="nh-body-r nh-body-r--l">
              <span className="nh-body-code nh-sap">{mo.code}</span>
              <span className="nh-body-he">{mo.he}</span>
              <span className="nh-body-en">{mo.en}</span>
              <span className="nh-body-nums">
                <span><b>{nf.format(mo.tables)}</b><em>טבלאות</em></span>
                <span><b>{nf.format(mo.fields)}</b><em>שדות</em></span>
                <span><b>{nf.format(mo.topics)}</b><em>נושאים</em></span>
                <span><b>{nf.format(mo.funcs)}</b><em>פונקציות</em></span>
              </span>
              <span className="nh-body-bar" aria-hidden="true">
                {Array.from({ length: 24 }, (_, k) => (
                  <i key={k} className={k < Math.round(mo.share * 24) ? "" : "off"} />
                ))}
              </span>
              <span className="nh-body-go">
                {nf.format(mo.tcodes)} טרנזקציות · {nf.format(mo.cds)} CDS
                <ArrowUpLeft size={15} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </span>
            <span className="nh-body-r nh-body-r--m" aria-hidden="true">
              <span className="nh-body-code nh-sap">{mo.code}</span>
              <span className="nh-body-he">{mo.he}</span>
              <span className="nh-body-mn">{nf.format(mo.tables)} טבלאות · {nf.format(mo.fields)} שדות</span>
            </span>
            <span className="nh-body-r nh-body-r--d" aria-hidden="true">
              <span className="nh-body-code nh-sap">{mo.code}</span>
              <span className="nh-body-mn">{nf.format(mo.tables)} טבלאות</span>
            </span>
          </Link>
        ))}
      </div>

      {/* The index is a THIRD sticky layer, so it has to be declared before the
          sections: a sticky element sticks from its own place in the flow, and
          after them it would only ever appear at the very end of the page. */}
      <nav className="nh-index" aria-label="מקטעי העמוד">
        <div>
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} data-nh-jump={i} aria-current={i === 0 ? "true" : "false"}>
              <span className="nh-index-n nh-sap">{String(i + 1).padStart(2, "0")}</span>
              <span className="nh-index-l">{s.label}</span>
              <span className="nh-index-f">{s.field}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* ------------------------------------ layer 1 · the sections (server) */}
      {children}
    </div>
  );
}
