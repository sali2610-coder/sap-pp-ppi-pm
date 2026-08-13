"use client";

// Project NEO · Stage 2A — the Home scene.
//
// One ordinary scroll container, three stacked layers:
//   FIELD    105 dots, one per real merged SAP table, on three depth planes.
//            Sticky, aria-hidden, pointer-events:none. It re-forms between
//            sections and every formation is a claim about the data.
//   BODIES   the two module bodies. The SAME two elements survive the whole
//            page in three registers, so the eye tracks one object throughout.
//   CONTENT  the sections, rendered on the SERVER and passed in as children.
//            This component never owns the copy — it only reveals it.
//
// NOTHING here touches scroll behaviour. No wheel listener, no touch listener,
// no preventDefault, no scroll lock, no scroll-linked animation loop. We read
// scrollTop in a passive, rAF-coalesced listener and flip one attribute; CSS
// and two element-level property writes do the rest.
//
// Only `translate`, `scale`, `opacity` and `transform` are ever written — all
// four are compositor properties. `translate`/`scale` carry the FORMATION (slow,
// 820ms) and `transform` carries the POINTER LENS (fast, 240ms), which is why
// the two can overlap without one cancelling the other.

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { ArrowUpLeft } from "lucide-react";
import {
  GEOM, GEOM_NARROW, LENS_GROW, LENS_PUSH, LENS_R, place, prepare, type Prep,
} from "./formations";
import { ZONE_HE, zoneVar, type HomeData } from "./home-data";

const nf = new Intl.NumberFormat("he-IL");

export interface SceneSection { id: string; label: string; field: string }

/** Register the two module bodies are in, per section index. l = introduced,
 *  m = medium, d = docked context pair for the rest of the page. */
const REGISTER = ["l", "m", "m", "d", "d", "d"] as const;

// Canvas widths, matched one-for-one to the @container breakpoints in
// app/neo/home.css. They are CANVAS widths, not window widths: the rail owns
// up to 22rem of the window, so the two must never be confused.
const NARROW = 760;
const DOCK = 1050;

export function HomeScene({
  data, sections, children,
}: { data: HomeData; sections: SceneSection[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const read = useRef<HTMLDivElement>(null);

  // Deterministic and pure, so one memo serves both the markup and the effect —
  // and the indices the two of them exchange through data-nh-dot always agree.
  const preps = useMemo(
    () => prepare(data.dots, data.flows.map((f) => f.steps.filter((s) => s.exists).map((s) => s.code))),
    [data],
  );
  const planes = useMemo(
    () => ([2, 1, 0] as const).map((z) => ({ z, dots: preps.filter((p) => p.z === z) })),
    [preps],
  );

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

    const nodes = [...el.querySelectorAll<HTMLElement>("[data-nh-dot]")];
    const order = nodes.map((n) => preps[Number(n.dataset.nhDot)]);
    const bodies = [...el.querySelectorAll<HTMLElement>("[data-nh-body]")];
    const secEls = [...el.querySelectorAll<HTMLElement>("[data-hsec]")];
    const jumps = [...el.querySelectorAll<HTMLElement>("[data-nh-jump]")];

    // Cached formation positions, in element order — the lens reads these
    // instead of measuring, so a pointer move never touches layout.
    const pos: { x: number; y: number; s: number }[] = nodes.map(() => ({ x: 0, y: 0, s: 1 }));
    let W = 0; let H = 0; let sec = -1;
    let lensed = new Set<number>();

    /** Inline-start-relative x → a physical translate. The stylesheet stays on
     *  logical properties; the direction flip lives here, once. */
    const tx = (x: number) => (rtl ? -x : x);

    const paint = (k: number, instant: boolean) => {
      const geom = W < NARROW ? GEOM_NARROW : GEOM;
      const dock = W < DOCK;
      for (let i = 0; i < nodes.length; i += 1) {
        const p = order[i];
        const q = place(k, p, W, H, data.maxFields, maxCov, geom);
        pos[i] = { x: q.x, y: q.y, s: q.s };
        const n = nodes[i];
        if (instant) n.style.transitionDuration = "0ms";
        n.style.setProperty("translate", `${tx(q.x).toFixed(1)}px ${q.y.toFixed(1)}px`);
        n.style.setProperty("scale", q.s.toFixed(3));
        n.style.opacity = q.o.toFixed(2);
        // Motion hierarchy: the field does not move as one slab. The stagger is
        // by depth plane first, so the front plane leads and the far plane
        // trails, which is what makes the reformation read as volume.
        if (!instant) n.style.transitionDelay = `${p.z * 90 + (i % 12) * 16}ms`;
      }
      if (instant) {
        requestAnimationFrame(() => nodes.forEach((n) => { n.style.transitionDuration = ""; }));
      }
      const reg = REGISTER[Math.min(k, REGISTER.length - 1)];
      // Register M and D both live in the CONTEXT GUTTER the sections reserve on
      // the far edge, so the pair never lands on top of the content it is meant
      // to accompany. The two registers differ in mass and in what they say,
      // not in where they are — that is what makes the transformation legible.
      const sizes = bodies.map((b, i) => {
        const mass = 0.9 + data.modules[i].share * 0.34;
        return { w: b.offsetWidth, h: b.offsetHeight, mass };
      });
      let gutterY = H * (reg === "m" ? 0.14 : 0.12);
      // Narrow canvases have no gutter, so the pair becomes a small dock in the
      // block-end / inline-end corner: the reading edge (inline start, the right
      // in Hebrew) is the one thing it must never sit on.
      const dockS = (i: number) => sizes[i].mass * (reg === "l" || reg === "m" ? 0.34 : 0.26);
      const dockW = sizes.reduce((a, z, i) => a + z.w * dockS(i), 0) + 10;
      bodies.forEach((b, i) => {
        const r = reg === "l" && dock ? "m" : reg;
        b.dataset.r = r;
        const g = i === 0 ? geom.pm : geom.pp;
        // Mass is real: PP-PI documents more tables than PM, so its body is
        // bigger. The number on the card and the size of the card agree.
        const { w: bw0, h: bh0, mass } = sizes[i];
        let x: number; let y: number; let s: number;
        if (r === "l") {
          s = mass;
          x = g.fx * W - (bw0 * s) / 2;
          y = g.fy * H - (bh0 * s) / 2;
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

    /* ---- the pointer lens · proximity, not a gimmick ---------------------- */
    let pTick = false; let pxr = 0; let pyr = 0; let inside = false;
    const applyLens = () => {
      pTick = false;
      const hit = new Set<number>();
      let near = -1; let nearD = LENS_R;
      if (inside) {
        for (let i = 0; i < nodes.length; i += 1) {
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
              `${p.d.f} שדות · ${ZONE_HE[p.d.z]} · ${p.d.b === 1 ? "PM + PP-PI" : p.d.b === 0 ? "PM" : "PP-PI"}`;
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
    const wantsLens = !calm.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (wantsLens) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave, { passive: true });
    }

    /* ---- keep the environment honest about its own size ------------------- */
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure(false));
      ro.observe(scroller);
    }

    requestAnimationFrame(() => {
      measure(true);
      sync();
      el.dataset.ready = "1";
    });

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      io?.disconnect();
      ro?.disconnect();
    };
  }, [data, preps]);

  return (
    <div className="nh" ref={root} data-sec="0" data-ready="0">
      {/* ------------------------------------------------ layer 0 · the field */}
      <div className="nh-field" data-nh-field aria-hidden="true">
        <span className="nh-grid" />
        <span className="nh-aura nh-aura--pm" style={{ "--m": "var(--mod-pm)" } as React.CSSProperties} />
        <span className="nh-aura nh-aura--pp" style={{ "--m": "var(--mod-pppi)" } as React.CSSProperties} />
        <span className="nh-halo" />
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
