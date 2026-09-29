"use client";

/* THE HOME'S SIGNATURE: the process map draws itself in the order of the
   process (motion lab prototype 1, app/design/redesign-2026/motion).

   Each lane is a real FlowChain from homeData(): table after table, with the
   hop the dictionary models, direct or through one intermediate table. A step
   whose table the dictionary lacks is drawn hollow and says so; a crossing the
   dictionary does not model is drawn as a gap, not as an arrow.

   Motion: transform and opacity only, 95ms apart, capped under a second. It
   waits until the map is on screen (the page opens above it), plays once, and
   reduced motion shows the finished map. Without script the map is simply
   there: the paused start is armed by the effect below, never by the HTML. */
import { useEffect, useRef, useState } from "react";
import type { FlowChain } from "./home-data";

export function ProcessMap({ chains }: { chains: FlowChain[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "armed" | "run">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load (its top in the upper 70% of the viewport): it
    // stays drawn, because hiding what was just painted would flash. A map
    // that only peeks in at the bottom edge is armed and builds when it arrives.
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.7 && r.bottom > 0) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setState("run"); io.disconnect(); }
    }, { threshold: 0.25 });
    // Arming and observing happen together, from a callback, not in the render.
    const t = requestAnimationFrame(() => { setState("armed"); io.observe(el); });
    return () => { cancelAnimationFrame(t); io.disconnect(); };
  }, []);

  return (
    <div className="fm" ref={ref} data-motion={state}>
      <p className="fm-legend">
        <span><i className="fm-key" aria-hidden="true" /> קשר ישיר במילון</span>
        <span><i className="fm-key fm-key--via" aria-hidden="true" /> דרך טבלת ביניים</span>
        <span><i className="fm-key fm-key--missing" aria-hidden="true" /> לא במילון</span>
      </p>
      <div className="fm-lanes">
        {chains.map((c) => (
          <section key={c.key} className="fm-chain" aria-label={`תהליך ${c.he}`} data-mod={c.key} tabIndex={0}
            style={{ "--mod": c.m } as React.CSSProperties}>
            <h3 className="fm-title"><bdi className="fm-mod">{c.key}</bdi> {c.he}</h3>
            <ol className="fm-lane">
              {c.steps.map((s, i) => (
                <li key={`${s.code}-${i}`} className="fm-step" style={{ "--i": i } as React.CSSProperties}>
                  <span className={`fm-node${s.exists ? "" : " fm-node--missing"}`}>
                    <bdi className="fm-code">{s.code}</bdi>
                    <span className="fm-label">{s.label}</span>
                    {!s.exists ? <span className="fm-note">לא במילון</span> : null}
                  </span>
                  {i < c.steps.length - 1 ? (
                    s.link ? (
                      <span className={`fm-link${s.link.via ? " fm-link--via" : ""}`}>
                        <span className="fm-sr">{s.link.via ? `קשר דרך ${s.link.via}` : "קשר ישיר"}</span>
                        <span className="fm-line" aria-hidden="true" />
                        {s.link.card ? <bdi className="fm-card">{s.link.card}</bdi> : null}
                        {s.link.via ? <span className="fm-via">דרך <bdi>{s.link.via}</bdi></span> : null}
                      </span>
                    ) : (
                      // A process boundary the dictionary does not model: a gap
                      // with its words, never a line that would claim a relation.
                      <span className="fm-link fm-link--gap"><span className="fm-gap">אין קשר במילון</span></span>
                    )
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
