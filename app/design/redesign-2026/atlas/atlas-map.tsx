"use client";

/* The knowledge map. Modules are nodes whose marks are their tables (one square per table in
   the ERD catalogue); links are measured table relations between modules; a route is one
   process drawn through the modules its steps touch; lit marks are the tables those steps name.
   All geometry arrives finished from the server. Motion is CSS only (transform and opacity),
   and every animation lives inside prefers-reduced-motion: no-preference in board.css. */

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Play } from "lucide-react";

export interface MapModule { code: string; he: string; x: number; y: number; w: number; h: number; tables: string[]; color: string; deg: number }
export interface MapLink { a: string; b: string; n: number; bb: boolean; d: string; lx: number; ly: number }
export interface MapRoute {
  slug: string; label: string; title: string; steps: number;
  stops: { code: string; tables: string[] }[];
  legs: { a: string; b: string }[];
  offMap: string[];
}
export interface MapData { w: number; h: number; modules: MapModule[]; links: MapLink[]; routes: MapRoute[] }

const PER_ROW = 16;
const fmt = (n: number) => n.toLocaleString("he-IL");
/** Stroke width from the measured relation count (the catalogue draws links of 4 and more). */
const strokeOf = (n: number) => Math.round((1.25 + 3.75 * Math.sqrt(Math.max(0, n - 4) / 46)) * 100) / 100;
const ms = (v: number) => `${Math.round(v)}ms`;
const vars = (o: Record<string, string>) => o as CSSProperties;

export function AtlasMap({ data, variant, uid }: { data: MapData; variant: "home" | "signature"; uid: string }) {
  const [slug, setSlug] = useState(data.routes[0]?.slug ?? "");
  const [hover, setHover] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [runs, setRuns] = useState(0);

  const active = hover ?? focused ?? pinned;
  const route = data.routes.find((r) => r.slug === slug) ?? data.routes[0];
  const by = new Map(data.modules.map((m) => [m.code, m]));
  const near = active ? data.links.filter((l) => l.a === active || l.b === active).sort((p, q) => q.n - p.n) : [];
  const nearSet = new Set(near.map((l) => (l.a === active ? l.b : l.a)));
  const stopIdx = new Map((route?.stops ?? []).map((s, i) => [s.code, i]));
  const sig = variant === "signature";
  const playing = runs > 0;

  // Order of meaning. Signature: modules 0-340ms, process 340-700ms, tables 720-990ms.
  // A route change on Home replays only the process and the tables.
  const legStart = sig ? 340 : 0;
  const legSpan = 360;
  const markStart = sig ? 720 : 380;
  const legs = route?.legs ?? [];
  const per = legSpan / Math.max(1, legs.length);
  const stops = route?.stops ?? [];
  const stopGap = stops.length > 1 ? 120 / (stops.length - 1) : 0;

  const toggle = (code: string) => setPinned((p) => (p === code ? null : code));
  const onKey = (code: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(code); }
    if (e.key === "Escape") setPinned(null);
  };

  const activeMod = active ? by.get(active) : undefined;

  return (
    <div
      className={`am am--${variant}`}
      data-focus={active ? "" : undefined}
      data-play={sig && playing ? "" : undefined}
      data-anim={!sig && playing ? "" : undefined}
    >
      {sig ? (
        <div className="am-play">
          <button type="button" className="at-btn at-btn--primary" onClick={() => setRuns((r) => r + 1)}>
            <Play size={16} aria-hidden="true" />
            {playing ? "הפעלה חוזרת" : "הפעלת הרגע"}
          </button>
          <ol className="am-phases" aria-label="סדר הציור">
            <li><b>1</b> מודולים <bdi>0–340ms</bdi></li>
            <li><b>2</b> מסלול התהליך <bdi>340–700ms</bdi></li>
            <li><b>3</b> טבלאות <bdi>720–990ms</bdi></li>
          </ol>
        </div>
      ) : null}

      <fieldset className="am-routes">
        <legend>מסלול תהליך על המפה</legend>
        {data.routes.map((r) => (
          <label key={r.slug} className="am-route-opt">
            <input
              type="radio"
              name={`${uid}-route`}
              value={r.slug}
              checked={r.slug === route?.slug}
              onChange={() => { setSlug(r.slug); if (!sig) setRuns((x) => x + 1); }}
            />
            <span>{r.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="am-scroll">
        <svg
          key={sig ? runs : 0}
          className="am-svg"
          viewBox={`0 0 ${data.w} ${data.h}`}
          role="group"
          aria-labelledby={`${uid}-title`}
        >
          <title id={`${uid}-title`}>
            {`מפת הידע: ${data.modules.length} מודולים, ${data.links.length} קשרים בין מודולים. מסלול: ${route?.title ?? ""}`}
          </title>

          <g className="am-links" aria-hidden="true">
            {data.links.map((l) => (
              <path
                key={`${l.a}|${l.b}`}
                d={l.d}
                className={`am-link ${l.bb ? "is-bb" : "is-extra"}${nearSet.size && (l.a === active || l.b === active) ? " is-near" : ""}`}
                style={vars({ "--w": String(strokeOf(l.n)) })}
              />
            ))}
          </g>

          <g className="am-legs" key={`${route?.slug}:${runs}`} aria-hidden="true">
            {legs.map((leg, k) => {
              const A = by.get(leg.a), B = by.get(leg.b);
              if (!A || !B) return null;
              const len = Math.hypot(B.x - A.x, B.y - A.y);
              const deg = (Math.atan2(B.y - A.y, B.x - A.x) * 180) / Math.PI;
              const style = vars({ "--d": ms(legStart + k * per), "--t": ms(per) });
              return (
                <g key={`${leg.a}>${leg.b}`} transform={`translate(${A.x} ${A.y}) rotate(${Math.round(deg * 100) / 100})`}>
                  <line className="am-leg-case" x2={Math.round(len)} style={style} />
                  <line className="am-leg" x2={Math.round(len)} style={style} />
                </g>
              );
            })}
          </g>

          <g className="am-nodes">
            {data.modules.map((m, i) => {
              const k = stopIdx.get(m.code);
              const cls = [
                "am-node",
                m.code === active ? "is-active" : "",
                nearSet.has(m.code) ? "is-near" : "",
                m.code === pinned ? "is-pinned" : "",
              ].filter(Boolean).join(" ");
              const label = `${m.code} · ${m.he} · ${fmt(m.tables.length)} טבלאות · ${m.deg} קשרים למודולים אחרים${k !== undefined ? ` · תחנה ${k + 1} במסלול` : ""}`;
              return (
                <g
                  key={m.code}
                  className={cls}
                  transform={`translate(${m.x - m.w / 2} ${m.y - m.h / 2})`}
                  style={vars({ "--m": m.color, "--i": String(i), "--d": ms(i * 10) })}
                  tabIndex={0}
                  role="button"
                  aria-pressed={m.code === pinned}
                  aria-label={label}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(m.code); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(null); }}
                  onFocus={() => setFocused(m.code)}
                  onBlur={() => setFocused(null)}
                  onClick={() => toggle(m.code)}
                  onKeyDown={onKey(m.code)}
                >
                  <g className="am-node-in">
                    <rect className="am-ring" x={-5} y={-5} width={m.w + 10} height={m.h + 10} rx={9} />
                    <rect className="am-box" width={m.w} height={m.h} rx={6} />
                    <rect className="am-band" x={m.w - 8} y={12} width={3} height={30} rx={1.5} />
                    <text className="am-code" x={m.w - 16} y={27} direction="ltr" textAnchor="end">{m.code}</text>
                    <text className="am-count" x={12} y={27} direction="rtl" textAnchor="end">{`${fmt(m.tables.length)} טבלאות`}</text>
                    <text className="am-name" x={m.w - 16} y={45} direction="rtl" textAnchor="start">{m.he}</text>
                    <g className="am-marks" key={`${route?.slug}:${runs}`}>
                      {m.tables.map((t, j) => {
                        // lit only where the timetable lists it: the stop the step's table belongs to
                        const on = k !== undefined && stops[k].tables.includes(t);
                        return (
                          <rect
                            key={t}
                            className={on ? "am-mark is-on" : "am-mark"}
                            x={m.w - 12 - 6 - (j % PER_ROW) * 8}
                            y={53 + Math.floor(j / PER_ROW) * 8}
                            width={6}
                            height={6}
                            rx={1}
                            style={on ? vars({ "--d": ms(markStart + (k ?? 0) * stopGap) }) : undefined}
                          />
                        );
                      })}
                    </g>
                  </g>
                </g>
              );
            })}
          </g>

          <g className="am-stops" key={`s:${route?.slug}:${runs}`} aria-hidden="true">
            {stops.map((s, k) => {
              const m = by.get(s.code);
              if (!m) return null;
              return (
                <g key={s.code} transform={`translate(${m.x + m.w / 2 - 12} ${m.y - m.h / 2 - 12})`}>
                  <g className="am-stop" style={vars({ "--d": ms(legStart + k * stopGap * 3) })}>
                    <rect width={22} height={22} rx={4} />
                    <text x={11} y={16} textAnchor="middle">{k + 1}</text>
                  </g>
                </g>
              );
            })}
          </g>

          <g className="am-labs" aria-hidden="true">
            {near.map((l) => (
              <g key={`${l.a}|${l.b}`} transform={`translate(${l.lx} ${l.ly})`}>
                <rect x={-15} y={-12} width={30} height={22} rx={4} />
                <text y={4} textAnchor="middle">{l.n}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <p className="am-hint">במסך צר המפה נגללת לצדדים בתוך המסגרת.</p>

      <div className="am-below">
        <div className="am-timetable">
          <h3 className="am-h">מסלול: {route?.label}</h3>
          <p className="am-sub">{route?.title}</p>
          <ol className="am-stations">
            {stops.map((s, k) => (
              <li key={s.code} style={vars({ "--m": by.get(s.code)?.color ?? "var(--ink-2)" })}>
                <span className="am-st-n"><bdi>{k + 1}</bdi></span>
                <span className="am-st-mod">
                  <span className="at-code" dir="ltr">{s.code}</span>
                  <span>{by.get(s.code)?.he}</span>
                </span>
                <span className="am-st-t">
                  {s.tables.length
                    ? s.tables.map((t) => <span key={t} className="at-code at-tchip" dir="ltr">{t}</span>)
                    : <span className="am-none">אין טבלה בצעדים</span>}
                </span>
              </li>
            ))}
          </ol>
          <p className="am-note">
            התחנות הן המודולים שצעדי שיטת העבודה מפנים אליהם, לפי סדר הופעתם ב-<bdi>{route?.steps}</bdi> הצעדים.
            {route && route.offMap.length ? <> טבלאות שהצעדים מונים ואינן בקטלוג ה-ERD: {route.offMap.map((t, i) => <span key={t}>{i ? ", " : ""}<bdi>{t}</bdi></span>)}.</> : null}
          </p>
        </div>

        <div className="am-side">
          <p className="am-live" aria-live="polite">
            {activeMod ? (
              <>
                <b><bdi>{activeMod.code}</bdi> · {activeMod.he}</b>: <bdi>{fmt(activeMod.tables.length)}</bdi> טבלאות.{" "}
                {near.length ? (
                  <>שכנים לפי מספר קשרי טבלאות: {near.map((l, i) => {
                    const o = l.a === activeMod.code ? l.b : l.a;
                    return <span key={o}>{i ? ", " : ""}<bdi>{o} {l.n}</bdi></span>;
                  })}.</>
                ) : "אין לו קשרים של 4 ומעלה למודול אחר בקטלוג."}
              </>
            ) : "מקדו מודול במפה (במקלדת או בעכבר) כדי להדגיש את שכניו. לחיצה מקבעת את הבחירה."}
          </p>
          <ul className="am-legend" aria-label="מקרא">
            <li>
              <svg viewBox="0 0 44 28" aria-hidden="true"><rect className="lg-box" x="1" y="1" width="42" height="26" rx="5" />{[0, 1, 2, 3].map((j) => <rect key={j} className="lg-mark" x={30 - j * 8} y="10" width="6" height="6" rx="1" />)}</svg>
              מודול · כל ריבוע הוא טבלה בקטלוג ה-ERD
            </li>
            <li>
              <svg viewBox="0 0 44 28" aria-hidden="true">{[4, 25, 50].map((n, j) => <line key={n} className="lg-line" x1="2" x2="42" y1={6 + j * 8} y2={6 + j * 8} style={vars({ "--w": String(strokeOf(n)) })} />)}</svg>
              קשרי טבלאות בין מודולים: 4, 25, 50
            </li>
            <li>
              <svg viewBox="0 0 44 28" aria-hidden="true"><line className="lg-case" x1="2" x2="42" y1="14" y2="14" /><line className="lg-route" x1="2" x2="42" y1="14" y2="14" /></svg>
              מסלול תהליך; המספר הוא סדר התחנה
            </li>
            <li>
              <svg viewBox="0 0 44 28" aria-hidden="true"><rect className="lg-box lg-sel" x="3" y="3" width="38" height="22" rx="5" /></svg>
              מודול נבחר (אדום); שכניו במסגרת כהה
            </li>
          </ul>
          <p className="am-note">
            מוצגים שני הקשרים החזקים של כל מודול. מיקוד מודול מציג את כל קשריו (4 ומעלה, כמו בקטלוג ה-ERD) ואת מספרם. מיקום המודולים סכמטי.
          </p>
        </div>
      </div>
    </div>
  );
}
