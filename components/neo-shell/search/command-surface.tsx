"use client";

// Project NEO · the command surface.
//
// It is not a dropdown. It grows out of the rail's own search slot — the
// approved idea — and becomes a full working surface: results organised into
// real families, each row carrying type · module · name · context ·
// relationship · a quick action, and a detail pane that reads the selected
// record's real context out of the dictionary.
//
// Every row comes from the project data. A family with no build-time index is
// named in the footer instead of being filled with plausible entries, and a
// field the dataset cannot answer is simply not rendered.
//
// ACCESSIBILITY. The input is the combobox (it lives in the rail on desktop and
// in this surface's own header on a phone, and only ever one of the two is
// displayed). This element is the listbox it controls; the active row is
// pointed at with aria-activedescendant, so focus never leaves the field.

import { Ico } from "../icon";
import { modVar } from "../mod-var";
import type { ObjectContext } from "../types";
import { kindMeta, modLabel, type CmdResult } from "./build";
import type { CmdKind, CmdRecord, CommandExtra } from "./types";

const nf = new Intl.NumberFormat("he-IL");

/** A row's module hue. A record shared by two modules is tinted by the first —
 *  the chip next to it still names both, so nothing is hidden by the choice. */
const rowMod = (r: CmdRecord) => (r.mod ? r.mod.split(" · ")[0] : undefined);

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
  return (
    <div
      id={`nxc-o-${i}`}
      role="option"
      aria-selected={active}
      className="nxc-row"
      data-k={r.k}
      data-active={active ? "1" : "0"}
      style={{ "--m": modVar(m), ...(r.obj ? { "--o": r.obj } : null) } as React.CSSProperties}
      onPointerMove={() => onHover(i)}
      onClick={() => onGo(r)}
    >
      <span className="nxc-row-k" aria-hidden="true"><Ico name={kindMeta(r.k).icon} size={14} /></span>

      <span className="nxc-row-main">
        <span className="nxc-row-t">
          <span className={r.mono ? "nx-sap" : undefined}>{r.title}</span>
          <span className="nxc-row-kind">{kindMeta(r.k).he}</span>
          {r.objHe ? (
            <span className="nxc-cls"><i aria-hidden="true" />{r.objHe}</span>
          ) : null}
        </span>
        {r.sub ? <span className="nxc-row-s">{r.sub}</span> : null}
      </span>

      <span className="nxc-row-meta">
        {m ? <span className="nxc-mod">{r.mod!.split(" · ").map(modLabel).join(" · ")}</span> : null}
        {r.rel ? (
          <span className="nxc-rel">
            <Ico name="Waypoints" size={11} />
            <span className={/^[\x20-\x7E]+$/.test(r.rel) ? "nx-sap" : undefined}>{r.rel}</span>
          </span>
        ) : null}
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

function Detail({
  rec, ctx,
}: {
  rec: CmdRecord | null;
  ctx: ObjectContext | null;
}) {
  if (!rec) {
    return (
      <div className="nxc-detail-empty">
        <Ico name="Command" size={18} />
        <p>בחר תוצאה כדי לראות את ההקשר המלא שלה.</p>
      </div>
    );
  }
  const m = rowMod(rec);
  return (
    <div className="nxc-detail-in" style={{ "--m": modVar(m) } as React.CSSProperties}>
      <span className="nxc-d-kind">
        <Ico name={kindMeta(rec.k).icon} size={12} />
        {kindMeta(rec.k).he}
      </span>
      <b className={rec.mono ? "nx-sap nxc-d-t" : "nxc-d-t"}>{rec.title}</b>
      {rec.sub ? <p className="nxc-d-s">{rec.sub}</p> : null}

      <div className="nxc-d-facts">
        {rec.mod ? (
          <span className="nxc-d-fact">
            <em>מודול</em>
            <span className="nxc-mod">{rec.mod.split(" · ").map(modLabel).join(" · ")}</span>
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
            <span className={/^[\x20-\x7E]+$/.test(rec.rel) ? "nx-sap" : undefined}>{rec.rel}</span>
          </span>
        ) : null}
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

export function CommandSurface({
  query, onQuery, result, only, onOnly, active, onActive, onGo, onContext, onClose,
  contexts, extra, idle, navHits, navTotal, listRef, mobileInputRef,
}: {
  query: string;
  onQuery: (v: string) => void;
  result: CmdResult;
  only: CmdKind | null;
  onOnly: (k: CmdKind | null) => void;
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
}) {
  const q = query.trim();
  const rec = result.flat[active] || null;
  const ctx = rec?.ctx ? contexts[rec.ctx] || null : null;
  const indexTotal = idle.reduce((a, x) => a + x.n, 0);

  return (
    <div className="nxc" role="presentation">
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
            placeholder="טבלה · טרנזקציה · BAPI · ספר"
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

        <header className="nxc-head">
          <p className="nxc-head-t">
            {q ? (
              <>
                <b>{nf.format(result.total)}</b> תוצאות עבור <span className="nxc-q">{q}</span>
                <span className="nxc-head-sep">·</span>
                <b>{nf.format(navHits)}</b> מתוך {nf.format(navTotal)} יעדי ניווט
              </>
            ) : (
              <>
                <b>{nf.format(indexTotal)}</b> רשומות באינדקס · <b>{nf.format(navTotal)}</b> יעדי ניווט · הקלד כדי לסנן
              </>
            )}
          </p>
          {q && result.sections.length ? (
            <div className="nxc-chips" role="group" aria-label="סינון לפי סוג">
              <button
                type="button"
                className="nxc-chip"
                aria-pressed={only === null}
                onClick={() => onOnly(null)}
              >
                הכל<b>{nf.format(result.total)}</b>
              </button>
              {result.sections.map((s) => (
                <button
                  key={s.k}
                  type="button"
                  className="nxc-chip"
                  data-k={s.k}
                  aria-pressed={only === s.k}
                  onClick={() => onOnly(only === s.k ? null : s.k)}
                >
                  <Ico name={s.icon} size={12} />
                  {s.he}<b>{nf.format(s.total)}</b>
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <div className="nxc-body">
          <div
            className="nxc-results"
            id="nxc-list"
            role="listbox"
            aria-label="תוצאות חיפוש"
            ref={listRef}
          >
            {!q ? (
              <div className="nxc-idle">
                <p className="nxc-idle-h">מה יש באינדקס</p>
                <ul className="nxc-idle-grid">
                  {idle.map((x) => (
                    <li key={x.k}>
                      <button type="button" className="nxc-idle-c" onClick={() => onQuery(x.he)}>
                        <Ico name={x.icon} size={14} />
                        <b>{nf.format(x.n)}</b>
                        <span>{x.he}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : result.sections.length === 0 ? (
              <p className="nxc-none">
                אין רשומה בנתוני הפרויקט עבור «{q}». החיפוש עובר על כל האינדקס — {nf.format(indexTotal)} רשומות
                אמיתיות — ולא על טקסט חופשי.
              </p>
            ) : (
              result.sections.map((sec) => {
                let base = 0;
                for (const s of result.sections) { if (s.k === sec.k) break; base += s.rows.length; }
                return (
                  <section key={sec.k} className="nxc-sec" role="group" aria-label={sec.he}>
                    <h3 className="nxc-sec-h">
                      <Ico name={sec.icon} size={12} />
                      <span>{sec.he}</span>
                      <em>{sec.total > sec.rows.length ? `${sec.rows.length} מתוך ${nf.format(sec.total)}` : nf.format(sec.total)}</em>
                    </h3>
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
                  </section>
                );
              })
            )}
          </div>

          <aside className="nxc-detail" aria-label="הקשר התוצאה">
            <Detail rec={q ? rec : null} ctx={ctx} />
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
