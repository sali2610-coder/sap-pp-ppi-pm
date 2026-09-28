"use client";
/* Editorial Reference board · the few parts that need the browser.
   Nothing here reads SAP data: every row, count and mark arrives from the server
   page as a prop, already resolved from the site's accessors. */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDownUp, Check, Contrast, Copy, Moon, Play, RotateCw, Sun, X } from "lucide-react";

/* ------------------------------------------------------------ mode */

type Mode = "light" | "dark";
let current: Mode | null = null;
const listeners = new Set<() => void>();
const readMode = (): Mode =>
  (current ??= new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light");
const setMode = (m: Mode) => {
  current = m;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** Server renders light; the client reads ?mode=dark after hydration, so the two
 *  never disagree on first paint. window.__setMode(m) lets a capture script switch. */
export function ModeToggle({ target }: { target: string }) {
  const mode = useSyncExternalStore(subscribe, readMode, (): Mode => "light");
  useEffect(() => {
    document.getElementById(target)?.setAttribute("data-mode", mode);
    (window as unknown as { __setMode: (m: Mode) => void }).__setMode = setMode;
  }, [mode, target]);
  const next: Mode = mode === "light" ? "dark" : "light";
  return (
    <button type="button" className="ed-btn ed-btn-sec" onClick={() => setMode(next)} aria-pressed={mode === "dark"}>
      {mode === "light" ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
      <span>מצב לילה</span>
    </button>
  );
}

/* ------------------------------------------------------------ copy */

export function CopyCode({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 1800);
    return () => clearTimeout(t);
  }, [state]);
  const copy = () => {
    if (!navigator.clipboard) return setState("fail");
    navigator.clipboard.writeText(code).then(() => setState("done"), () => setState("fail"));
  };
  return (
    <>
      <button type="button" className="ed-btn ed-btn-quiet ed-copy" onClick={copy}>
        {state === "done" ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        <span>{state === "done" ? "הועתק" : "העתקה"}</span>
        <span className="ed-sr"> של {code}</span>
      </button>
      <span className="ed-sr" role="status">
        {state === "done" ? `${code} הועתק` : state === "fail" ? "הדפדפן חסם את ההעתקה" : ""}
      </span>
    </>
  );
}

/* ------------------------------------------------------------ ERD modes */

const ERD_MODES = [
  ["overview", "סקירה"],
  ["select", "בחירה"],
  ["analysis", "ניתוח"],
] as const;
type ErdMode = (typeof ERD_MODES)[number][0];

export function ErdModes({ selected, children }: { selected: string; children: ReactNode }) {
  const [mode, setModeState] = useState<ErdMode>("select");
  const he = ERD_MODES.find(([k]) => k === mode)?.[1];
  const ref = useRef<HTMLDivElement>(null);
  // On a narrow screen the figure scrolls inside its own box; open it on the selected
  // table rather than on the box's start edge. Only the box scrolls, never the page.
  useEffect(() => {
    const box = ref.current?.querySelector<HTMLElement>(".ed-scroll");
    const focus = ref.current?.querySelector<SVGGElement>(".erd-focus");
    if (!box || !focus || box.scrollWidth <= box.clientWidth) return;
    const f = focus.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    box.scrollLeft += f.left + f.width / 2 - (b.left + b.width / 2);
  }, []);
  return (
    <div className="ed-erd" data-erd={mode} ref={ref}>
      <div className="ed-erd-bar">
        <div className="ed-seg" role="group" aria-label="מצב התרשים">
          {ERD_MODES.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={mode === k} onClick={() => setModeState(k)}>
              {label}
            </button>
          ))}
        </div>
        <p className="ed-erd-mode" aria-live="polite">
          מצב: <strong>{he}</strong>
          {mode === "overview" ? " · כל הטבלאות באותו משקל" : null}
          {mode === "select" ? (
            <>
              {" "}· נבחרה <bdi dir="ltr">{selected}</bdi>
            </>
          ) : null}
          {mode === "analysis" ? " · קרדינליות על כל קשר" : null}
        </p>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------ without colour */

export function GreyCheck({ children }: { children: ReactNode }) {
  const [grey, setGrey] = useState(false);
  return (
    <div className="ed-grey" data-grey={grey ? "" : undefined}>
      <button type="button" className="ed-btn ed-btn-sec" aria-pressed={grey} onClick={() => setGrey((g) => !g)}>
        <Contrast size={16} aria-hidden />
        <span>בדיקה בגווני אפור</span>
      </button>
      <div className="ed-grey-body">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------ catalog */

export interface CatRow {
  code: string;
  he: string;
  /** The same Hebrew name, with its Latin runs isolated (rendered on the server). */
  heNode: ReactNode;
  en: string;
  module: string;
  href: string;
  known: number;
  total: number;
  verified: boolean;
  mod: ReactNode;
  status: ReactNode;
  verif: ReactNode;
}

export function Catalog({ rows, sample, scopeNote }: { rows: CatRow[]; sample: number; scopeNote: ReactNode }) {
  const [q, setQ] = useState("");
  const [pm, setPm] = useState(true);
  const [ver, setVer] = useState(true);
  const [sort, setSort] = useState<"code" | "depth">("code");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows
      .filter((r) => (!pm || r.module === "PM") && (!ver || r.verified))
      .filter((r) => !needle || [r.code, r.he, r.en].some((s) => s.toLowerCase().includes(needle)))
      .sort((a, b) => (sort === "depth" ? b.known - a.known : 0) || a.code.localeCompare(b.code));
  }, [rows, q, pm, ver, sort]);

  const clear = () => {
    setQ("");
    setPm(false);
    setVer(false);
  };

  return (
    <div className="ed-cat">
      <div className="ed-cat-tools">
        <label className="ed-field">
          <span className="ed-field-label">חיפוש בקטלוג</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="קוד או שם, למשל IW3" dir="auto" />
        </label>
        <label className="ed-field ed-field-sort">
          <span className="ed-field-label">
            <ArrowDownUp size={14} aria-hidden /> מיון
          </span>
          <select value={sort} onChange={(e) => setSort(e.target.value as "code" | "depth")}>
            <option value="code">לפי קוד</option>
            <option value="depth">לפי עומק תיעוד</option>
          </select>
        </label>
      </div>

      <div className="ed-cat-filters">
        <span className="ed-scope">{scopeNote}</span>
        <ul className="ed-chips" aria-label="מסננים פעילים">
          {pm ? (
            <li className="ed-chip">
              מודול: <bdi dir="ltr">PM</bdi>
              <button type="button" onClick={() => setPm(false)} aria-label="הסרת המסנן מודול PM">
                <X size={14} aria-hidden />
              </button>
            </li>
          ) : null}
          {ver ? (
            <li className="ed-chip">
              רמת אימות: מאומת
              <button type="button" onClick={() => setVer(false)} aria-label="הסרת המסנן רמת אימות מאומת">
                <X size={14} aria-hidden />
              </button>
            </li>
          ) : null}
        </ul>
        {pm || ver || q ? (
          <button type="button" className="ed-btn ed-btn-quiet" onClick={clear}>
            נקה מסננים
          </button>
        ) : (
          <button type="button" className="ed-btn ed-btn-quiet" onClick={() => { setPm(true); setVer(true); }}>
            החזר את המסננים
          </button>
        )}
      </div>

      <p className="ed-count" role="status">
        <strong>
          <bdi>{shown.length}</bdi> תוצאות
        </strong>{" "}
        מתוך מדגם של <bdi>{sample}</bdi> קודים
      </p>

      {shown.length ? (
        <>
        <div className="ed-scroll ed-cat-wide" role="region" aria-label="טבלת הטרנזקציות" tabIndex={0}>
          <table className="ed-table ed-cat-table">
            <thead>
              <tr>
                <th scope="col">קוד</th>
                <th scope="col">שם</th>
                <th scope="col">מודול</th>
                <th scope="col">
                  סטטוס <bdi dir="ltr">S/4</bdi>
                </th>
                <th scope="col">אימות</th>
                <th scope="col">עומק</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.code}>
                  <th scope="row">
                    <Link prefetch={false} className="ed-code-link" href={r.href}>
                      <bdi dir="ltr" className="ed-code">{r.code}</bdi>
                    </Link>
                  </th>
                  <td>
                    <span className="ed-cell-he">{r.heNode}</span>
                    {r.en ? (
                      <bdi dir="ltr" lang="en" className="ed-cell-en">{r.en}</bdi>
                    ) : null}
                  </td>
                  <td>{r.mod}</td>
                  <td>{r.status}</td>
                  <td>{r.verif}</td>
                  <td className="ed-cell-num">
                    <bdi dir="ltr">
                      {r.known}/{r.total}
                    </bdi>
                    <span className="ed-sr"> עובדות מתועדות</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="ed-cat-list" aria-label="הטרנזקציות">
          {shown.map((r) => (
            <li key={r.code}>
              <p className="ed-cat-li-top">
                <Link prefetch={false} className="ed-code-link" href={r.href}>
                  <bdi dir="ltr" className="ed-code">{r.code}</bdi>
                </Link>
                {r.status}
              </p>
              <p className="ed-cell-he">{r.heNode}</p>
              {r.en ? (
                <bdi dir="ltr" lang="en" className="ed-cell-en">{r.en}</bdi>
              ) : null}
              <p className="ed-cat-li-meta">
                {r.mod}
                {r.verif}
                <span>
                  <bdi dir="ltr">
                    {r.known}/{r.total}
                  </bdi>{" "}
                  עובדות מתועדות
                </span>
              </p>
            </li>
          ))}
        </ul>
        </>
      ) : (
        <div className="ed-empty">
          <p>לא נמצאו טרנזקציות מתאימות. נסה חיפוש אחר או נקה מסננים</p>
          <button type="button" className="ed-btn ed-btn-sec" onClick={clear}>
            נקה מסננים
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------ empty and error */

export function EmptyDemo({ total }: { total: number }) {
  const [filtered, setFiltered] = useState(true);
  return (
    <div className="ed-state" role="group" aria-labelledby="ed-empty-h">
      <p className="ed-state-kicker" id="ed-empty-h">מצב ריק · קטלוג הטבלאות</p>
      <ul className="ed-chips" aria-label="מסננים פעילים">
        {filtered ? (
          <li className="ed-chip">
            מודול: <bdi dir="ltr">QM</bdi>
            <button type="button" onClick={() => setFiltered(false)} aria-label="הסרת המסנן מודול QM">
              <X size={14} aria-hidden />
            </button>
          </li>
        ) : null}
      </ul>
      <p className="ed-count" role="status">
        <strong>
          <bdi>{filtered ? 0 : total}</bdi> טבלאות
        </strong>
      </p>
      {filtered ? (
        <div className="ed-empty">
          <p>לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים</p>
          <button type="button" className="ed-btn ed-btn-sec" onClick={() => setFiltered(false)}>
            נקה מסננים
          </button>
        </div>
      ) : (
        <div className="ed-empty ed-empty-done">
          <p>
            המסננים נוקו. במילון <bdi>{total}</bdi> טבלאות, כולן מתיעוד <bdi dir="ltr">PM</bdi> ו-<bdi dir="ltr">PP-PI</bdi>.
          </p>
          <button type="button" className="ed-btn ed-btn-quiet" onClick={() => setFiltered(true)}>
            החזר את הדוגמה
          </button>
        </div>
      )}
    </div>
  );
}

export function RetryDemo({ src, chapter }: { src: string; chapter: string }) {
  const [st, setSt] = useState<"error" | "loading" | "ok">("error");
  const [n, setN] = useState(0);
  const retry = async () => {
    setSt("loading");
    try {
      const r = await fetch(src, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      setN(Object.keys((await r.json()) as Record<string, unknown>).length);
      setSt("ok");
    } catch {
      setSt("error");
    }
  };
  return (
    <div className="ed-state" role="group" aria-labelledby="ed-error-h" aria-busy={st === "loading"}>
      <p className="ed-state-kicker" id="ed-error-h">מצב שגיאה · טעינת פרק בקורא</p>
      <div className="ed-error" data-ok={st === "ok" ? "" : undefined}>
        <div role="status">
          {st === "ok" ? (
            <p>
              הפרק נטען: <bdi>{n}</bdi> סעיפים ב{chapter}.
            </p>
          ) : (
            <>
              <p className="ed-error-h">{st === "loading" ? "טוען את הפרק…" : "הפרק לא נטען."}</p>
              <p>ייתכן שהחיבור נקטע. מה שכבר פתוח בעמוד נשאר זמין לקריאה.</p>
            </>
          )}
        </div>
        {st === "ok" ? (
          <button type="button" className="ed-btn ed-btn-quiet" onClick={() => setSt("error")}>
            הצג שוב את מצב השגיאה
          </button>
        ) : (
          <button type="button" className="ed-btn ed-btn-sec" onClick={retry} disabled={st === "loading"}>
            <RotateCw size={16} aria-hidden />
            <span>נסה שוב</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------ signature motion */

/** The final state is the default. Each press remounts the list, so the CSS
 *  animation plays once from the start; under reduced motion it never runs. */
export function Reveal({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <div className="ed-reveal-wrap">
      <button type="button" className="ed-btn ed-btn-sec" onClick={() => setRun((r) => r + 1)}>
        <Play size={16} aria-hidden />
        <span>הפעלת הרגע</span>
      </button>
      <div key={run} className="ed-reveal" data-play={run > 0 ? "" : undefined}>
        {children}
      </div>
    </div>
  );
}
