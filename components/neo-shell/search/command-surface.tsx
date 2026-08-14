"use client";

// Project NEO · the command surface.
//
// It is not a dropdown and it is not a modal. It grows out of the rail's own
// search slot — the approved idea — and it TRANSFORMS the surface it grew from:
// the canvas behind it takes the hue of the module the answer lives in, the rail
// brightens the destinations the query really reaches and steps the rest back,
// and the panel itself is edged in that same module colour. Close it and the
// surface returns; nothing was ever covered by an unrelated sheet.
//
// WHAT A ROW SAYS, AND WHY EACH PART IS THERE
//   shape      three of them, not twelve — dictionary data / executable
//              identifier / something written. The shape of the answer is
//              readable before the words are.
//   type       the family icon and its Hebrew name.
//   module     surface tint, ring and section marker. Never a small dot: the
//              form rule in globals.css reserves the labelled dot for --status-*
//              so a blue ring can never be misread as a blue status.
//   context    the Hebrew line the dataset already carries for the record.
//   relation   only when the dataset really has one.
//   action     load the record's table into the context shelf.
// A field the dataset cannot answer is simply not rendered, and a family with no
// build-time index is named in the footer instead of being filled with rows.
//
// ACCESSIBILITY. The input is the combobox (it lives in the rail on desktop and
// in this surface's own header on a phone, and only ever one of the two is
// displayed). This element is the listbox it controls; the active row is
// pointed at with aria-activedescendant, so focus never leaves the field.

import "@/app/neo/search.css";

import { Ico } from "../icon";
import { modVar } from "../mod-var";
import type { ObjectContext } from "../types";
import { KIND_SHAPE, kindMeta, modLabel, type CmdResult } from "./build";
import type { CmdKind, CmdRecord, CommandExtra } from "./types";

const nf = new Intl.NumberFormat("he-IL");

/** A row's module hue. A record shared by two modules is tinted by the first —
 *  the chip next to it still names both, so nothing is hidden by the choice. */
const rowMod = (r: CmdRecord) => (r.mod ? r.mod.split(" · ")[0] : undefined);

/** A relationship line that is pure ASCII is a SAP identifier and has to be
 *  LTR-isolated; a Hebrew one must not be. */
const isSap = (s: string) => /^[\x20-\x7E]+$/.test(s);

/* ------------------------------------------------------------------- row */

function Row({
  r, i, active, onGo, onContext, onHover,
}: {
  r: CmdRecord;
  i: number;
  active: boolean;
  onGo: (r: CmdRecord) => void;
  onContext: (name: string) => void;
  onHover: (i: number) => void;
}) {
  const m = rowMod(r);
  const meta = kindMeta(r.k);
  return (
    <div
      id={`nxc-o-${i}`}
      role="option"
      aria-selected={active}
      className="nxc-row"
      data-k={r.k}
      data-shape={KIND_SHAPE[r.k]}
      data-mod={m ? "1" : "0"}
      data-active={active ? "1" : "0"}
      /* --i drives the progressive reveal. It is capped in the stylesheet, and
         it only ever runs for a row React has just inserted: a row that survives
         a keystroke keeps its DOM node and therefore does not re-animate. */
      style={{
        "--m": modVar(m),
        "--i": Math.min(i, 16),
        ...(r.obj ? { "--o": r.obj } : null),
      } as React.CSSProperties}
      onPointerMove={() => onHover(i)}
      onClick={() => onGo(r)}
    >
      <span className="nxc-row-k" aria-hidden="true"><Ico name={meta.icon} size={14} /></span>

      <span className="nxc-row-main">
        <span className="nxc-row-t">
          <span className={r.mono ? "nx-sap" : undefined}>{r.title}</span>
          <span className="nxc-row-kind">{meta.he}</span>
          {r.objHe ? (
            <span className="nxc-cls"><i aria-hidden="true" />{r.objHe}</span>
          ) : null}
        </span>
        {r.sub ? <span className="nxc-row-s">{r.sub}</span> : null}
      </span>

      <span className="nxc-row-meta">
        {m ? (
          <span className="nxc-mod">
            <i aria-hidden="true" />
            {r.mod!.split(" · ").map(modLabel).join(" · ")}
          </span>
        ) : null}
        {r.rel ? (
          <span className="nxc-rel">
            <Ico name="Waypoints" size={11} />
            <span className={isSap(r.rel) ? "nx-sap" : undefined}>{r.rel}</span>
          </span>
        ) : null}
        {/* THE DESTINATION. The actual route Enter opens, printed on the row, so
            a reader never has to guess where a result leads. A record the
            project has no page for says exactly that instead. */}
        <span className="nxc-dest" data-none={r.dest ? "0" : "1"}>
          <Ico name={r.dest ? "ChevronLeft" : "CircleHelp"} size={11} />
          {r.dest ? <span className="nx-sap">{r.dest}</span> : <span>אין עמוד ייעודי</span>}
        </span>
      </span>

      {r.ctx ? (
        <button
          type="button"
          className="nxc-act"
          /* Out of the tab order on purpose: this is a listbox driven by
             aria-activedescendant, and Enter on the row already performs the
             same action (goResult loads the context before it navigates). */
          tabIndex={-1}
          aria-label={`טען את ההקשר של ${r.ctx} למדף`}
          onClick={(e) => { e.stopPropagation(); onContext(r.ctx!); }}
        >
          <Ico name="Layers" size={12} />
          <span>הקשר</span>
        </button>
      ) : null}

      <span className="nxc-go" aria-hidden="true"><Ico name="CornerDownLeft" size={13} /></span>
    </div>
  );
}

/* ---------------------------------------------------------------- detail */

function Detail({
  rec, ctx,
}: {
  rec: CmdRecord | null;
  ctx: ObjectContext | null;
}) {
  if (!rec) {
    return (
      <div className="nxc-detail-empty">
        <span className="nxc-detail-mark" aria-hidden="true"><Ico name="Command" size={18} /></span>
        <p>בחר תוצאה כדי לראות את ההקשר המלא שלה.</p>
      </div>
    );
  }
  const m = rowMod(rec);
  const meta = kindMeta(rec.k);
  return (
    <div
      className="nxc-detail-in"
      data-shape={KIND_SHAPE[rec.k]}
      data-mod={m ? "1" : "0"}
      style={{ "--m": modVar(m) } as React.CSSProperties}
    >
      <span className="nxc-d-kind">
        <Ico name={meta.icon} size={12} />
        {meta.he}
      </span>
      <b className={rec.mono ? "nx-sap nxc-d-t" : "nxc-d-t"}>{rec.title}</b>
      {rec.sub ? <p className="nxc-d-s">{rec.sub}</p> : null}

      <div className="nxc-d-facts">
        {rec.mod ? (
          <span className="nxc-d-fact">
            <em>מודול</em>
            <span className="nxc-mod"><i aria-hidden="true" />{rec.mod.split(" · ").map(modLabel).join(" · ")}</span>
          </span>
        ) : null}
        {rec.objHe ? (
          <span className="nxc-d-fact" style={rec.obj ? ({ "--o": rec.obj } as React.CSSProperties) : undefined}>
            <em>מחלקת אובייקט</em>
            <span className="nxc-cls"><i aria-hidden="true" />{rec.objHe}</span>
          </span>
        ) : null}
        {rec.rel ? (
          <span className="nxc-d-fact">
            <em>קשר</em>
            <span className={isSap(rec.rel) ? "nx-sap" : undefined}>{rec.rel}</span>
          </span>
        ) : null}
        <span className="nxc-d-fact">
          <em>יעד</em>
          {rec.dest
            ? <span className="nx-sap nxc-d-dest">{rec.dest}</span>
            : <span className="nxc-d-dest" data-none="1">אין עמוד ייעודי לרשומה הזו</span>}
        </span>
      </div>

      {ctx ? (
        <>
          {ctx.tcodes.length ? (
            <div className="nxc-d-sec">
              <h4>טרנזקציות ({ctx.tcodes.length})</h4>
              <div className="nxc-d-codes">
                {ctx.tcodes.map((c) => <span key={c} className="nx-sap">{c}</span>)}
              </div>
            </div>
          ) : null}
          {ctx.relations.length ? (
            <div className="nxc-d-sec">
              <h4>קשרים ({ctx.relations.length})</h4>
              <ul className="nxc-d-rels">
                {ctx.relations.map((r) => (
                  <li key={r.table}>
                    <span className="nx-sap">{r.table}</span>
                    {r.card ? <em className="nx-sap">{r.card}</em> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : null}

      <p className="nxc-d-f">
        {rec.href ? "Enter פותח את היעד" : "לרשומה הזו אין עדיין עמוד ייעודי במרחב /neo"}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- surface */

export function CommandSurface({
  query, onQuery, onKey, result, only, onOnly, modOnly, onModOnly,
  active, onActive, onGo, onContext, onClose,
  contexts, extra, idle, navHits, navTotal, listRef, mobileInputRef, surfaceMod,
}: {
  query: string;
  onQuery: (v: string) => void;
  /** The SAME key handler the rail's field uses. Without it the phone field's
   *  arrow keys fall through to the document and scroll the page — the one
   *  thing the brief says must never happen. */
  onKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  result: CmdResult;
  only: CmdKind | null;
  onOnly: (k: CmdKind | null) => void;
  /** Module facet. null = every module, and records with no module at all. */
  modOnly: string | null;
  onModOnly: (m: string | null) => void;
  active: number;
  onActive: (i: number) => void;
  onGo: (r: CmdRecord) => void;
  onContext: (name: string) => void;
  onClose: () => void;
  contexts: Record<string, ObjectContext>;
  extra: CommandExtra;
  /** Real per-family totals across the whole index — the idle readout. */
  idle: { k: CmdKind; he: string; icon: string; n: number }[];
  /** Navigation destinations the query names, out of the real total. */
  navHits: number;
  navTotal: number;
  listRef: React.RefObject<HTMLDivElement | null>;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
  /** The module the whole surface takes on — the answer's own colour, carried
   *  into the panel edge, the header wash and the scrim over the canvas. */
  surfaceMod?: string;
}) {
  const q = query.trim();
  const live = !!q || result.browse;
  const rec = live ? result.flat[active] || null : null;
  const ctx = rec?.ctx ? contexts[rec.ctx] || null : null;
  const indexTotal = idle.reduce((a, x) => a + x.n, 0);
  const onlyMeta = only ? kindMeta(only) : null;
  // Only modules that really own matches become facets. Never a fixed PM/PP-PI
  // pair that pretends both are present when one of them is not.
  const facets = Object.entries(result.modCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div
      className="nxc nxc--r"
      data-live={live ? "1" : "0"}
      data-mod={surfaceMod ? "1" : "0"}
      style={{ "--sm": modVar(surfaceMod) } as React.CSSProperties}
      role="presentation"
    >
      {/* The canvas is not covered by a grey sheet. It is washed in the hue of
          the module the answer lives in — the surface responding, not a modal
          landing on it. Clicking it returns the surface. */}
      <button
        type="button"
        className="nxc-wash"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="nxc-panel">
        {/* Phone and tablet never get the rail, so the surface carries the field
            itself there. Exactly one of the two inputs is ever displayed. */}
        <div className="nxc-mfield" data-shell="mobile-only">
          <span className="nxc-mfield-i"><Ico name="Search" size={16} /></span>
          <input
            ref={mobileInputRef}
            type="search"
            className="nxc-minput"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="טבלה · שדה · טרנזקציה · BAPI · ספר"
            aria-label="חיפוש בפרויקט"
            role="combobox"
            aria-expanded
            aria-controls="nxc-list"
            aria-autocomplete="list"
            aria-activedescendant={rec ? `nxc-o-${active}` : undefined}
          />
          <button type="button" className="nx-iconbtn nx-iconbtn--xs" aria-label="סגור חיפוש" onClick={onClose}>
            <Ico name="X" size={14} />
          </button>
        </div>

        {/* Header geometry is FIXED. The readout is one line that never wraps and
            the scope strip is one line that never wraps, so the result list never
            moves under the cursor while the query is being typed. */}
        <header className="nxc-head">
          <p className="nxc-head-t">
            {q ? (
              <>
                <b>{nf.format(result.total)}</b> תוצאות עבור <span className="nxc-q">{q}</span>
                <span className="nxc-head-sep">·</span>
                <b>{nf.format(navHits)}</b> מתוך {nf.format(navTotal)} יעדי ניווט
              </>
            ) : result.browse && onlyMeta ? (
              <>
                <b>{nf.format(result.total)}</b> רשומות ב{onlyMeta.he} · הקלד כדי לצמצם
              </>
            ) : (
              <>
                <b>{nf.format(indexTotal)}</b> רשומות באינדקס · <b>{nf.format(navTotal)}</b> יעדי ניווט · הקלד כדי לסנן
              </>
            )}
          </p>

          <div className="nxc-scope">
            {live && result.sections.length ? (
              <div className="nxc-chips" role="group" aria-label="סינון לפי סוג">
                <button
                  type="button"
                  className="nxc-chip"
                  data-all=""
                  aria-pressed={only === null}
                  onClick={() => onOnly(null)}
                  disabled={!q && result.browse}
                >
                  הכל<b>{nf.format(q ? result.total : indexTotal)}</b>
                </button>
                {result.sections.map((s) => (
                  <button
                    key={s.k}
                    type="button"
                    className="nxc-chip"
                    data-k={s.k}
                    data-shape={KIND_SHAPE[s.k]}
                    style={{ "--m": modVar(s.mod) } as React.CSSProperties}
                    aria-pressed={only === s.k}
                    onClick={() => onOnly(only === s.k ? null : s.k)}
                  >
                    <Ico name={s.icon} size={12} />
                    {s.he}<b>{nf.format(s.total)}</b>
                  </button>
                ))}
              </div>
            ) : (
              <p className="nxc-scope-hint">
                כל התוצאות נקראות מנתוני הפרויקט — טבלאות, טרנזקציות, אובייקטי פונקציה, ספרים ותהליכים.
              </p>
            )}

            {/* MODULE facet — ring and tint, never a dot. Present only when the
                matches really belong to more than one module. */}
            {live && facets.length > 1 ? (
              <div className="nxc-mods" role="group" aria-label="סינון לפי מודול">
                <button
                  type="button"
                  className="nxc-modchip"
                  aria-pressed={modOnly === null}
                  onClick={() => onModOnly(null)}
                >
                  כל המודולים
                </button>
                {facets.map(([m, n]) => (
                  <button
                    key={m}
                    type="button"
                    className="nxc-modchip"
                    style={{ "--m": modVar(m) } as React.CSSProperties}
                    aria-pressed={modOnly === m}
                    onClick={() => onModOnly(modOnly === m ? null : m)}
                  >
                    <i aria-hidden="true" />
                    {modLabel(m)}<b>{nf.format(n)}</b>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="nxc-body">
          <div
            className="nxc-results"
            id="nxc-list"
            role="listbox"
            aria-label="תוצאות חיפוש"
            ref={listRef}
          >
            {!live ? (
              <div className="nxc-idle">
                <p className="nxc-idle-h">מה יש באינדקס — בחר משפחה כדי לעיין בה</p>
                <ul className="nxc-idle-grid">
                  {idle.map((x) => (
                    <li key={x.k}>
                      <button
                        type="button"
                        className="nxc-idle-c"
                        data-k={x.k}
                        data-shape={KIND_SHAPE[x.k]}
                        onClick={() => onOnly(x.k)}
                      >
                        <span className="nxc-idle-i" aria-hidden="true"><Ico name={x.icon} size={14} /></span>
                        <b>{nf.format(x.n)}</b>
                        <span className="nxc-idle-l">{x.he}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="nxc-idle-f">
                  {nf.format(indexTotal)} רשומות — כולן מנתוני הפרויקט. אין כאן טקסט חופשי ואין השלמות שהומצאו.
                </p>
              </div>
            ) : result.sections.length === 0 ? (
              <p className="nxc-none">
                אין רשומה בנתוני הפרויקט עבור «{q}»
                {modOnly ? ` במודול ${modLabel(modOnly)}` : ""}. החיפוש עובר על כל האינדקס —{" "}
                {nf.format(indexTotal)} רשומות אמיתיות — ולא על טקסט חופשי.
              </p>
            ) : (
              result.sections.map((sec, si) => {
                let base = 0;
                for (const s of result.sections) { if (s.k === sec.k) break; base += s.rows.length; }
                return (
                  <section
                    key={sec.k}
                    className="nxc-sec"
                    role="group"
                    aria-label={sec.he}
                    data-k={sec.k}
                    data-shape={KIND_SHAPE[sec.k]}
                    data-mod={sec.mod ? "1" : "0"}
                    style={{ "--m": modVar(sec.mod), "--i": Math.min(si, 6) } as React.CSSProperties}
                  >
                    <h3 className="nxc-sec-h">
                      <i className="nxc-sec-mark" aria-hidden="true" />
                      <Ico name={sec.icon} size={12} />
                      <span>{sec.he}</span>
                      {sec.mod ? <span className="nxc-sec-mod">{modLabel(sec.mod)}</span> : null}
                      <em>{sec.total > sec.rows.length ? `${sec.rows.length} מתוך ${nf.format(sec.total)}` : nf.format(sec.total)}</em>
                    </h3>
                    <div className="nxc-sec-body">
                      {sec.rows.map((r, j) => (
                        <Row
                          key={r.id}
                          r={r}
                          i={base + j}
                          active={base + j === active}
                          onGo={onGo}
                          onContext={onContext}
                          onHover={onActive}
                        />
                      ))}
                      {sec.total > sec.rows.length && only !== sec.k ? (
                        <button type="button" className="nxc-more" onClick={() => onOnly(sec.k)}>
                          הצג את כל {nf.format(sec.total)} התוצאות ב{sec.he}
                        </button>
                      ) : null}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          <aside className="nxc-detail" aria-label="הקשר התוצאה">
            <Detail rec={rec} ctx={ctx} />
          </aside>
        </div>

        <footer className="nxc-foot">
          <span className="nxc-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> מעבר</span>
            <span><kbd>Home</kbd><kbd>End</kbd> קצוות</span>
            <span><kbd>Enter</kbd> פתיחה</span>
            <span><kbd>Esc</kbd> סגירה</span>
          </span>
          {extra.gaps.map((g) => (
            <span key={g.he} className="nxc-gap">
              <Ico name="CircleHelp" size={11} />
              {g.he}: {g.why}
            </span>
          ))}
        </footer>
      </div>
    </div>
  );
}
