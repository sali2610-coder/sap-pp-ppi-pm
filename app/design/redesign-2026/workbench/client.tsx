"use client";

/* Knowledge Workbench board: the client islands. Everything they show arrives
   as props from the server page; nothing here reads a dataset. */

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowDownAZ, ArrowDownWideNarrow, Check, ChevronLeft, Copy, CornerDownLeft, Moon, Search, Sun, X,
} from "lucide-react";
import { Bidi, Code, Kbd, LevelChip, ModChip, Num, StatusChip } from "./marks";
import type { CatalogData, Detail, PalData } from "./data";

/* ------------------------------------------------------------ mode */

type Mode = "light" | "dark";
let mode: Mode = "light";
const subs = new Set<() => void>();

function applyMode(m: Mode) {
  mode = m;
  document.querySelectorAll<HTMLElement>(".rb-workbench").forEach((el) => {
    el.dataset.mode = m;
  });
  subs.forEach((f) => f());
}

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};

/** Light and dark are two designed systems. The server renders light; the
 *  query string (?mode=dark) and window.__setMode switch after hydration. */
export function ModeToggle() {
  const m = useSyncExternalStore(subscribe, () => mode, () => "light" as Mode);
  useEffect(() => {
    (window as unknown as { __setMode?: (x: string) => void }).__setMode = (x) => applyMode(x === "dark" ? "dark" : "light");
    const q = new URLSearchParams(window.location.search).get("mode");
    applyMode(q === "dark" ? "dark" : q === "light" ? "light" : mode);
  }, []);
  return (
    <div className="wb-seg wb-seg--mode" role="group" aria-label="מצב תצוגה">
      <button type="button" aria-pressed={m === "light"} onClick={() => applyMode("light")}>
        <Sun size={16} strokeWidth={2} aria-hidden="true" />
        בהיר
      </button>
      <button type="button" aria-pressed={m === "dark"} onClick={() => applyMode("dark")}>
        <Moon size={16} strokeWidth={2} aria-hidden="true" />
        כהה
      </button>
    </div>
  );
}

/* ------------------------------------------------------------ copy */

export function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1600);
  };
  return (
    <span className="wb-copy">
      <button type="button" className={`wb-btn wb-btn--ghost wb-btn--sm${done ? " is-done" : ""}`} onClick={copy}>
        {done ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Copy size={16} strokeWidth={2} aria-hidden="true" />}
        <span>{done ? "הועתק" : "העתק"}</span>
        <span className="wb-sr"> {value}</span>
      </button>
      <span className="wb-sr" role="status">{done ? `${value} הועתק` : ""}</span>
    </span>
  );
}

/* ---------------------------------------------------------- palette */

function DetailPanel({ d }: { d: Detail }) {
  return (
    <aside className="wb-pal__detail" aria-label={`פרטים: ${d.code}`}>
      <p className="wb-pal__dk">{d.kindHe}</p>
      <p className="wb-pal__dcode"><Code>{d.code}</Code></p>
      <p className="wb-pal__dhe"><Bidi t={d.he} /></p>
      {d.sub ? <p className="wb-pal__dsub"><bdi dir="ltr">{d.sub}</bdi></p> : null}
      <div className="wb-marks">
        {d.mods.map((m) => <ModChip key={m} m={m} />)}
        <StatusChip s={d.status} />
        <LevelChip l={d.level} />
      </div>
      <dl className="wb-facts">
        {d.facts.map((f) => (
          <div key={f.k}>
            <dt>{f.k}</dt>
            <dd>{f.mono ? <Code>{f.v}</Code> : <Bidi t={f.v} />}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/** The command palette. `launcher` adds the closed state (section 13): a
 *  command bar that opens the palette with its signature motion. Without it
 *  the palette is shown open (section 3). Arrows move the highlight, Enter
 *  expands the active row into the detail panel, Esc steps back. */
export function Palette({ data, uid, launcher = false }: { data: PalData; uid: string; launcher?: boolean }) {
  const rows = data.groups.flatMap((g) => g.rows);
  const starts = data.groups.reduce<number[]>((a, g, i) => [...a, i === 0 ? 0 : a[i - 1] + data.groups[i - 1].rows.length], []);
  const [open, setOpen] = useState(!launcher);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const launchRef = useRef<HTMLButtonElement>(null);
  const optId = (i: number) => `${uid}-o${i}`;

  const move = (i: number) => {
    const n = (i + rows.length) % rows.length;
    setActive(n);
    document.getElementById(optId(n))?.scrollIntoView({ block: "nearest" });
  };
  const close = () => {
    setOpen(false);
    setExpanded(false);
    launchRef.current?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(active - 1); }
    else if (e.key === "Home") { e.preventDefault(); move(0); }
    else if (e.key === "End") { e.preventDefault(); move(rows.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); setExpanded((x) => !x); }
    else if (e.key === "Escape") {
      if (expanded) { e.preventDefault(); setExpanded(false); }
      else if (launcher) { e.preventDefault(); close(); }
    }
  };
  const openFromKeys = (e: KeyboardEvent) => {
    // Ctrl/⌘ K while the launcher has focus. Stopped here so the site's own
    // global palette does not open on top of the demonstration.
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    }
  };
  const cur = rows[active];
  // The code column fits the longest real identifier in the result set
  // (Plex Mono advances 0.6em; codes are set at 14px).
  const codeW = `${Math.round(Math.max(...rows.map((r) => r.code.length)) * 8.4 + 6)}px`;

  return (
    <div className={`wb-palwrap${launcher ? " wb-palwrap--stage" : ""}`} style={{ "--code-w": codeW } as CSSProperties}>
      {launcher ? (
        <button
          ref={launchRef}
          type="button"
          className="wb-cmdbar wb-cmdbar--launch"
          aria-expanded={open}
          aria-controls={`${uid}-pal`}
          onClick={() => (open ? close() : setOpen(true))}
          onKeyDown={openFromKeys}
        >
          <Search size={16} strokeWidth={2} aria-hidden="true" />
          <span className="wb-cmdbar__t">מה צריך למצוא?</span>
          <span className="wb-cmdbar__k" aria-hidden="true"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
        </button>
      ) : null}
      {open ? (
        <div
          id={`${uid}-pal`}
          className={`wb-pal${launcher ? " wb-pal--anim" : ""}${expanded ? " is-expanded" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-label="לוח פקודות"
        >
          <div className="wb-pal__in">
            <Search className="wb-pal__glass" size={18} strokeWidth={2} aria-hidden="true" />
            <input
              className="wb-pal__q"
              role="combobox"
              aria-expanded="true"
              aria-controls={`${uid}-lb`}
              aria-activedescendant={optId(active)}
              aria-autocomplete="list"
              aria-label="חיפוש במאגר"
              readOnly
              value={data.query}
              onKeyDown={onKey}
              autoFocus={launcher}
            />
            <span className="wb-pal__total"><Num n={data.total} /> תוצאות</span>
            {launcher ? (
              <button type="button" className="wb-iconbtn" onClick={close} aria-label="סגירת לוח הפקודות">
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <div className="wb-pal__body">
            <div id={`${uid}-lb`} className="wb-pal__list" role="listbox" aria-label={`תוצאות עבור ${data.query}`}>
              {data.groups.map((g, gi) => (
                <div key={g.id} role="group" aria-labelledby={`${uid}-g-${g.id}`} className="wb-pal__grp">
                  <div id={`${uid}-g-${g.id}`} className="wb-pal__gh">
                    <span className="wb-pal__gl">{g.label}</span>
                    <span className="wb-pal__gn"><Num n={g.total} /></span>
                    <span className="wb-pal__ghint"><Bidi t={g.hint} /></span>
                  </div>
                  {g.rows.map((r, ri) => {
                    const idx = starts[gi] + ri;
                    return (
                      <div
                        key={r.id}
                        id={optId(idx)}
                        role="option"
                        aria-selected={idx === active}
                        className="wb-opt"
                        onClick={() => { setActive(idx); setExpanded(true); }}
                      >
                        <Code className="wb-opt__code">{r.code}</Code>
                        <span className="wb-opt__main">
                          <span className="wb-opt__he"><Bidi t={r.he} /></span>
                          {r.tag ? <span className="wb-opt__tag"><Bidi t={r.tag} /></span> : null}
                        </span>
                        <span className="wb-opt__mods">{r.mods.map((m) => <ModChip key={m} m={m} />)}</span>
                        <StatusChip s={r.status} compact />
                        <CornerDownLeft className="wb-opt__enter" size={14} strokeWidth={2} aria-hidden="true" />
                      </div>
                    );
                  })}
                  {g.total > g.rows.length ? (
                    <p className="wb-pal__more">עוד <Num n={g.total - g.rows.length} /> ברשימה המלאה</p>
                  ) : null}
                </div>
              ))}
            </div>
            {expanded && cur ? <DetailPanel d={cur.detail} /> : null}
          </div>
          <div className="wb-pal__foot" aria-hidden="true">
            <span><Kbd>↑</Kbd><Kbd>↓</Kbd> מעבר בין תוצאות</span>
            <span><Kbd>Enter</Kbd> {expanded ? "סגירת הפרטים" : "פתיחת פרטים"}</span>
            <span><Kbd>Home</Kbd><Kbd>End</Kbd> ראשונה ואחרונה</span>
            <span><Kbd>Esc</Kbd> {launcher ? "סגירה" : "חזרה"}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- catalog */

/** Master-detail catalog. The list is the pasted codes, filtered by module
 *  and sorted; the preview follows the selected row. */
export function Catalog({ data }: { data: CatalogData }) {
  const [mod, setMod] = useState("PM");
  const [sort, setSort] = useState<"refs" | "code">("refs");
  const [sel, setSel] = useState("IW31");
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const mods = [...new Set(data.rows.map((r) => r.module))];
  const rows = data.rows
    .filter((r) => mod === "all" || r.module === mod)
    .sort((a, b) => (sort === "refs" ? b.refs - a.refs : 0) || a.code.localeCompare(b.code));
  const hidden = data.rows.filter((r) => !rows.includes(r));
  const cur = rows.find((r) => r.code === sel) ?? rows[0];
  const p = cur ? data.previews[cur.code] : null;
  const count = (m: string) => data.rows.filter((r) => m === "all" || r.module === m).length;

  const onRowKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = Math.min(rows.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)));
    setSel(rows[n].code);
    btns.current[n]?.focus();
  };

  return (
    <div className="wb-cat">
      <div className="wb-cat__bar">
        <div className="wb-cat__title">
          <h3 className="wb-h3">טרנזקציות</h3>
          <span className="wb-muted"><Num n={data.registry} /> בקטלוג</span>
        </div>
        <label className="wb-field">
          <Search size={16} strokeWidth={2} aria-hidden="true" />
          <span className="wb-sr">חיפוש: רשימת קודים שהודבקה</span>
          <input readOnly value={data.pasted.join(" ")} dir="ltr" className="wb-field__in" />
        </label>
        <div className="wb-cat__controls">
          <div className="wb-seg" role="group" aria-label="סינון לפי מודול">
            {["all", ...mods].map((m) => (
              <button key={m} type="button" aria-pressed={mod === m} onClick={() => setMod(m)}>
                {m === "all" ? "הכול" : <Code>{m}</Code>}
                <span className="wb-seg__n"><Num n={count(m)} /></span>
              </button>
            ))}
          </div>
          <div className="wb-seg" role="group" aria-label="מיון">
            <button type="button" aria-pressed={sort === "refs"} onClick={() => setSort("refs")}>
              <ArrowDownWideNarrow size={16} strokeWidth={2} aria-hidden="true" />
              הפניות בגרף
            </button>
            <button type="button" aria-pressed={sort === "code"} onClick={() => setSort("code")}>
              <ArrowDownAZ size={16} strokeWidth={2} aria-hidden="true" />
              קוד
            </button>
          </div>
        </div>
      </div>

      <div className="wb-chips">
        <span className="wb-chips__l">מסננים פעילים</span>
        <span className="wb-chip">חיפוש: <Num n={data.pasted.length} /> קודים</span>
        {mod !== "all" ? (
          <>
            <button type="button" className="wb-chip wb-chip--on" onClick={() => setMod("all")}>
              מודול: <Code>{mod}</Code>
              <X size={14} strokeWidth={2} aria-hidden="true" />
              <span className="wb-sr">הסרת מסנן המודול</span>
            </button>
            <button type="button" className="wb-linkbtn" onClick={() => setMod("all")}>נקה מסננים</button>
          </>
        ) : null}
      </div>

      <p className="wb-cat__count" role="status">
        <strong><Num n={rows.length} /> תוצאות</strong> מתוך <Num n={data.pasted.length} /> קודים שהודבקו
        {hidden.length ? (
          <>
            {" · "}<Num n={hidden.length} /> מוסתרים במסנן המודול:{" "}
            {hidden.map((h) => <Code key={h.code} className="wb-code--chip">{h.code}</Code>)}
          </>
        ) : null}
      </p>

      <div className="wb-md">
        <div className="wb-tablewrap" role="region" aria-label="תוצאות הקטלוג" tabIndex={0}>
          <table className="wb-table wb-table--cat">
            <colgroup>
              <col className="wb-col-code" />
              <col />
              <col className="wb-col-mod" />
              <col className="wb-col-st" />
              <col className="wb-col-lv" />
              <col className="wb-col-n" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">קוד</th>
                <th scope="col">משמעות</th>
                <th scope="col">מודול</th>
                <th scope="col"><bdi>S/4HANA</bdi></th>
                <th scope="col">אימות</th>
                <th scope="col" className="wb-num">הפניות</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code} className={r.code === cur?.code ? "is-sel" : undefined} onClick={() => setSel(r.code)}>
                  <td>
                    <button
                      ref={(el) => { btns.current[i] = el; }}
                      type="button"
                      className="wb-rowbtn"
                      aria-pressed={r.code === cur?.code}
                      onClick={() => setSel(r.code)}
                      onKeyDown={(e) => onRowKey(e, i)}
                    >
                      <Code>{r.code}</Code>
                    </button>
                  </td>
                  <td className="wb-cell-he" title={r.he}><span className="wb-clamp"><Bidi t={r.he} /></span></td>
                  <td><ModChip m={r.module} /></td>
                  <td><StatusChip s={r.status} compact /></td>
                  <td><LevelChip l={r.level} /></td>
                  <td className="wb-num"><Num n={r.refs} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {cur && p ? (
          <aside className="wb-preview" aria-label={`תצוגה מקדימה: ${cur.code}`}>
            <p className="wb-kind">טרנזקציה · <ModChip m={cur.module} he={cur.moduleHe} /></p>
            <p className="wb-preview__code"><Code>{cur.code}</Code></p>
            <p className="wb-preview__he"><Bidi t={cur.he} /></p>
            {cur.en ? <p className="wb-preview__en"><bdi dir="ltr">{cur.en}</bdi></p> : <p className="wb-missing">שם באנגלית: לא מתועד במאגר</p>}
            <div className="wb-marks">
              <StatusChip s={cur.status} />
              <LevelChip l={cur.level} full />
            </div>
            <h4 className="wb-h4">מטרה</h4>
            <p className="wb-preview__p">{p.purpose ? <Bidi t={p.purpose} /> : "לא מתועד במאגר"}</p>
            <dl className="wb-facts">
              <div><dt>תחום</dt><dd><Bidi t={cur.area || "לא מתועד במאגר"} /></dd></div>
              <div>
                <dt>טבלאות</dt>
                <dd className="wb-codes">{p.tables.length ? p.tables.map((t) => <Code key={t} className="wb-code--chip">{t}</Code>) : "לא מתועד במאגר"}</dd>
              </div>
              <div><dt>יישום Fiori</dt><dd>{p.fiori ? <Bidi t={p.fiori} /> : "לא מתועד במאגר"}</dd></div>
              <div><dt>BAPI ברשומה</dt><dd><Num n={p.bapis} /></dd></div>
              <div><dt>מקורות אימות</dt><dd><Num n={p.sources} /></dd></div>
              <div><dt>עובדות מתועדות</dt><dd><bdi className="wb-numv">{cur.known}/{cur.total}</bdi></dd></div>
            </dl>
            {p.neighbours.length ? (
              <>
                <h4 className="wb-h4">סמוכות בגרף</h4>
                <ul className="wb-nbrs">
                  {p.neighbours.map((n) => (
                    <li key={n.code}><Code className="wb-code--chip">{n.code}</Code> <span className="wb-muted"><Bidi t={n.reason} /></span></li>
                  ))}
                </ul>
              </>
            ) : null}
            <a className="wb-btn wb-btn--secondary" href={p.href}>
              לרשומה המלאה
              <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- ERD */

const ERD_MODES = [
  { id: "overview", he: "סקירה", note: "כל הטבלאות בתרשים באותו משקל, בלי בחירה." },
  { id: "select", he: "בחירה", note: "AFKO נבחרה, והשכנות הישירות שלה מסודרות סביבה: מעלה הזרם מימין, מורד הזרם משמאל." },
  { id: "analysis", he: "ניתוח", note: "על כל קשר מוצג שדה ה-JOIN בצד של AFKO, כפי שהוא כתוב בטקסט ה-JOIN במאגר." },
] as const;

export function ErdFrame({ children }: { children: ReactNode }) {
  const [m, setM] = useState<(typeof ERD_MODES)[number]["id"]>("select");
  const cur = ERD_MODES.find((x) => x.id === m) ?? ERD_MODES[1];
  return (
    <div className="wb-erd" data-erd-mode={m}>
      <div className="wb-erd__bar">
        <p className="wb-erd__mode">מצב: <strong>{cur.he}</strong></p>
        <div className="wb-seg" role="group" aria-label="מצב התרשים">
          {ERD_MODES.map((x) => (
            <button key={x.id} type="button" aria-pressed={m === x.id} onClick={() => setM(x.id)}>{x.he}</button>
          ))}
        </div>
      </div>
      <p className="wb-erd__note" role="status"><Bidi t={cur.note} /></p>
      {children}
    </div>
  );
}

/* ---------------------------------------------------- demo actions */

/** A button on a static state (empty, error). It says what the built
 *  version would do instead of pretending to do it. */
export function DemoAction({ label, note, primary, icon }: { label: string; note: string; primary?: boolean; icon?: ReactNode }) {
  const [msg, setMsg] = useState("");
  return (
    <span className="wb-demo">
      <button type="button" className={`wb-btn ${primary ? "wb-btn--primary" : "wb-btn--secondary"}`} onClick={() => setMsg(note)}>
        {icon}
        {label}
      </button>
      <span className="wb-demo__msg" role="status">{msg}</span>
    </span>
  );
}
