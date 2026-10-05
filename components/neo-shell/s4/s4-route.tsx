"use client";

// The load sequence as a route: the waves in order, every migration object a
// stop on it. Pointing at an object (or focusing it) lights up what must load
// before it and what waits for it, from the dataset's own `dependsOn` edges:
// the dependency structure becomes visible without drawing a single line.
// Every stop is also a link to the object's card, and each one states its
// dependencies in words for anyone who cannot see the highlight.

import { useState } from "react";

export interface RouteStop {
  id: string;
  he: string;
  name: string;
  catHe: string;
  up: { id: string; he: string }[];
  down: { id: string; he: string }[];
}

const nf = new Intl.NumberFormat("he-IL");

export function S4Route({ waves }: { waves: { w: number; stops: RouteStop[] }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const all = waves.flatMap((w) => w.stops);
  const cur = active ? all.find((s) => s.id === active) || null : null;
  const up = new Set(cur?.up.map((u) => u.id));
  const down = new Set(cur?.down.map((d) => d.id));
  const rel = (id: string) =>
    !cur ? undefined : id === cur.id ? "self" : up.has(id) ? "up" : down.has(id) ? "down" : "dim";

  return (
    <div className="ns4-route" data-active={cur ? "1" : undefined} onMouseLeave={() => setActive(null)}>
      {/* Above the stops, where the reader is looking; its height is reserved
          (s4.css) so a longer caption never moves the stop under the pointer. */}
      <p className="ns4-route-cap" aria-hidden="true">
        {cur ? (
          <>
            <b>{cur.he}</b>
            {cur.up.length ? <> · נטען לאחר <span className="ns4-k-up">{cur.up.map((u) => u.he).join(" · ")}</span></> : <> · ללא תלויות</>}
            {cur.down.length ? <> · תנאי מקדים ל <span className="ns4-k-down">{cur.down.map((d) => d.he).join(" · ")}</span></> : null}
          </>
        ) : (
          "מעבר על אובייקט מסמן את מה שנטען לפניו (מסגרת רציפה) ואת מה שממתין לו (מסגרת מקווקוות). לחיצה פותחת את הכרטיס שלו."
        )}
      </p>
      <ol className="ns4-route-l">
        {waves.map(({ w, stops }) => (
          <li key={w} className="ns4-route-w">
            <header>
              <b>גל {w}</b>
              <span className="ns4-pill">{nf.format(stops.length)}</span>
              <em>{w === 1 ? "ללא תלויות" : "כל התלויות נטענו בגלים הקודמים"}</em>
            </header>
            <ul>
              {stops.map((s) => (
                <li key={s.id} data-rel={rel(s.id)}>
                  <a
                    href={`#mo-${s.id}`}
                    onMouseEnter={() => setActive(s.id)}
                    onFocus={() => setActive(s.id)}
                    onBlur={() => setActive(null)}
                    aria-describedby={`ns4-rd-${s.id}`}
                  >
                    <b>{s.he}</b>
                    <span className="nx-sap" dir="ltr">{s.name}</span>
                    <span className="ns4-route-m">
                      <span className="ns4-tag">{s.catHe}</span>
                      {s.up.length ? <em>תלוי ב־{nf.format(s.up.length)}</em> : null}
                      {s.down.length ? <em>פותח {nf.format(s.down.length)}</em> : null}
                    </span>
                  </a>
                  <span className="sr-only" id={`ns4-rd-${s.id}`}>
                    {s.up.length ? `נטען לאחר: ${s.up.map((u) => u.he).join(", ")}. ` : "ללא תלויות. "}
                    {s.down.length ? `תנאי מקדים ל: ${s.down.map((d) => d.he).join(", ")}.` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
