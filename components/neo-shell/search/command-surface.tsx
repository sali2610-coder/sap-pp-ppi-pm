"use client";

// Project NEO · the command surface.
//
// On a desktop it grows out of the rail's own search slot and is rendered right
// after that field, so the keyboard goes from the field into it; the page behind
// it is inert while it is open and the rail stays live. On a phone, a tablet and
// a narrow window it is a full-screen dialog that carries its own field.
//
// WHAT A ROW SAYS, AND WHY EACH PART IS THERE
//   type       the family icon and its Hebrew name.
//   module     the module code in the module's colour on a hairline.
//   context    the Hebrew line the dataset already carries for the record.
//   relation   only when the dataset really has one.
//   status     the S/4HANA pill the record's page renders, when it has one.
//   destination  the route Enter opens, or that the record has no page.
// A field the dataset cannot answer is simply not rendered, and a family the
// index does not carry is named in the footer instead of being filled with rows.
//
// ACCESSIBILITY (gate 6, blockers 6 and 7). The input is the combobox; this
// surface holds the listbox it controls, and the listbox holds only groups and
// options: each group is labelled by its heading, and the "more" row that ends
// a section is an option too, so nothing interactive sits inside an option or
// between options. The idle board and the empty state are outside the listbox,
// which is only rendered while it has options. The header readout is a status
// region, so counts and "no results" are announced on every device.

import "@/app/neo/search.css";

import { Ico } from "../icon";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { modVar } from "../mod-var";
import type { ObjectContext } from "../types";
import { BROWSE_CAP, KIND_SHAPE, kindMeta, modLabel, type CmdResult } from "./build";
import type { CmdItem, CmdKind, CmdRecord, CommandExtra } from "./types";

const nf = new Intl.NumberFormat("he-IL");

/** The one action the empty state offers (shell-client decides which). */
export type EmptyAction =
  | { t: "filter" }
  | { t: "suggest"; code: string }
  | { t: "catalogue"; label: string; q: string }
  | { t: "clear" };

/** Each family in the plural, for the sentence that states what the index
 *  holds. The same names as the kind labels in build.ts. */
const PLURAL: Record<CmdKind, string> = {
  nav: "פריטי ניווט", module: "מודולים", table: "טבלאות", object: "אובייקטים", field: "שדות",
  tcode: "טרנזקציות", bapi: "BAPI", func: "מודולי פונקציה", idoc: "סוגי הודעת IDoc",
  cds: "תצוגות CDS", fiori: "יישומי Fiori", enh: "טכניקות הרחבה", flow: "תחומים עסקיים",
  chapter: "פרקים", book: "ספרים", guide: "מושגים", center: "מרכזי עבודה", topic: "נושאי עבודה",
  bp: "שיטות עבודה", incident: "תקלות",
};

const listHe = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ו${xs[xs.length - 1]}`);

/** "תוצאה אחת" rather than "1 תוצאות" (gate 6, minor 25). */
function Count({ n, one, many }: { n: number; one: string; many: string }) {
  return n === 1 ? <>{one}</> : <><b>{nf.format(n)}</b> {many}</>;
}

/** A row's module hue. A record shared by two modules is tinted by the first —
 *  the chip next to it still names both, so nothing is hidden by the choice. */
const rowMod = (r: CmdRecord) => (r.mod ? r.mod.split(" · ")[0] : undefined);

/** A relationship line that is pure ASCII is a SAP identifier and has to be
 *  LTR-isolated; a Hebrew one must not be. */
const isSap = (s: string) => /^[\x20-\x7E]+$/.test(s);

/* ------------------------------------------------------------------- row */

function Row({
  r, i, active, onGo, onHover,
}: {
  r: CmdRecord;
  i: number;
  active: boolean;
  onGo: () => void;
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
      style={{
        "--m": modVar(m),
        ...(r.obj ? { "--o": r.obj } : null),
      } as React.CSSProperties}
      onPointerMove={() => onHover(i)}
      onClick={onGo}
    >
      <span className="nxc-row-k" aria-hidden="true"><Ico name={meta.icon} size={14} /></span>

      <span className="nxc-row-main">
        <span className="nxc-row-t">
          <span className={r.mono ? "nx-sap nxc-row-id" : "nxc-row-name"}>{r.title}</span>
          <span className="nxc-row-kind">{r.kindHe ?? meta.he}</span>
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
        {/* THE S/4HANA STANDING, when the record has one: the same word, colour
            and glyph its page renders (design audit ACC-3). */}
        {r.st ? <StatusPill status={r.st} className="nxc-st" /> : null}
        {/* THE DESTINATION. The actual route Enter opens, printed on the row, so
            a reader never has to guess where a result leads. A record the
            project has no page for says exactly that instead. */}
        <span className="nxc-dest" data-none={r.dest ? "0" : "1"}>
          <Ico name={r.dest ? "ChevronLeft" : "CircleHelp"} size={11} />
          {r.dest ? <span className="nx-sap">{r.dest}</span> : <span>אין עמוד ייעודי</span>}
        </span>
      </span>

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
        <p>בחירת תוצאה תציג את ההקשר שלה.</p>
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
        {rec.kindHe ?? meta.he}
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
            : <span className="nxc-d-dest" data-none="1">לרשומה זו אין עמוד ייעודי</span>}
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
                {/* A table can relate to the same partner twice (two joins, two
                    cardinalities), so the key is the position as well. */}
                {ctx.relations.map((r, i) => (
                  <li key={`${r.table}:${i}`}>
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
        {rec.href
          ? rec.ctx ? "Enter פותח את היעד וטוען את הטבלה למדף ההקשר" : "Enter פותח את היעד"
          : "לרשומה זו אין עמוד ייעודי"}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- surface */

export function CommandSurface({
  sheet, query, onQuery, onKey, result, only, onOnly, modOnly, onModOnly,
  active, onActive, onItem, onClose,
  contexts, extra, idle, emptyAction, onEmptyAction, listRef, mobileInputRef, surfaceMod,
}: {
  /** Full-screen dialog with its own field (phone, tablet, narrow window). */
  sheet: boolean;
  query: string;
  onQuery: (v: string) => void;
  /** The SAME key handler the rail's field uses. Without it the sheet field's
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
  onItem: (it: CmdItem) => void;
  onClose: () => void;
  contexts: Record<string, ObjectContext>;
  extra: CommandExtra;
  /** Real per-family totals across the whole index — the idle readout. */
  idle: { k: CmdKind; he: string; icon: string; n: number }[];
  emptyAction: EmptyAction | null;
  onEmptyAction: () => void;
  listRef: React.RefObject<HTMLDivElement | null>;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
  /** The module the whole surface takes on, when one module owns the answer. */
  surfaceMod?: string;
}) {
  const q = query.trim();
  const live = !!q || result.browse;
  const expanded = live && result.items.length > 0;
  const item = expanded ? result.items[active] : undefined;
  const rec = item?.rec ?? null;
  const ctx = rec?.ctx ? contexts[rec.ctx] || null : null;
  const indexTotal = idle.reduce((a, x) => a + x.n, 0);
  const onlyMeta = only ? kindMeta(only) : null;

  /* The filters stay on screen, pressed and clearable, even when they leave
     nothing to show (gate 6, major 15): the active family and the active module
     are listed with the families and modules the matches really have. */
  const kinds: { k: CmdKind; he: string; icon: string; n: number; mod?: string }[] =
    result.sections.map((s) => ({ k: s.k, he: s.he, icon: s.icon, n: s.total, mod: s.mod }));
  if (only && !kinds.some((x) => x.k === only)) kinds.push({ ...kindMeta(only), n: 0 });
  // Only modules that really own matches become facets. Never a fixed PM/PP-PI
  // pair that pretends both are present when one of them is not.
  const facets = Object.entries(result.modCounts).sort((a, b) => b[1] - a[1]);
  if (modOnly && !facets.some(([m]) => m === modOnly)) facets.push([modOnly, 0]);
  const filterHe = `${onlyMeta ? ` מסוג ${onlyMeta.he}` : ""}${modOnly ? ` במודול ${modLabel(modOnly)}` : ""}`;

  let n = 0; // the keyboard index of the next option, in render order
  return (
    <div
      className="nxc nxc--r"
      data-live={live ? "1" : "0"}
      data-mod={surfaceMod ? "1" : "0"}
      style={{ "--sm": modVar(surfaceMod) } as React.CSSProperties}
      role={sheet ? "dialog" : undefined}
      aria-modal={sheet || undefined}
      aria-label={sheet ? "חיפוש בניווט ובתיעוד" : undefined}
    >
      {/* A click beside the panel closes it and returns focus (gate 6, minor
          18). It is a pointer target only; the keyboard closes with Escape. */}
      {sheet ? null : (
        <button type="button" className="nxc-wash" tabIndex={-1} aria-hidden="true" onClick={onClose} />
      )}

      <div className="nxc-panel">
        {sheet ? (
          <div className="nxc-mfield">
            <span className="nxc-mfield-i"><Ico name="Search" size={16} /></span>
            <input
              ref={mobileInputRef}
              type="search"
              className="nxc-minput"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              onKeyDown={onKey}
              placeholder="קוד טבלה או טרנזקציה, שם שדה, או מושג בעברית"
              aria-label="חיפוש בניווט ובתיעוד"
              role="combobox"
              aria-expanded={expanded}
              aria-controls={expanded ? "nxc-list" : undefined}
              aria-autocomplete="list"
              aria-activedescendant={item ? `nxc-o-${active}` : undefined}
            />
            <button type="button" className="nx-iconbtn nxc-close" aria-label="סגירת החיפוש" onClick={onClose}>
              <Ico name="X" size={16} />
            </button>
          </div>
        ) : null}

        {/* Header geometry is FIXED. The readout is one line and the scope strip
            is one line, so the result list never moves under the cursor while
            the query is being typed. */}
        <header className="nxc-head">
          <p className="nxc-head-t" role="status">
            {q ? (
              result.total ? (
                <>
                  <Count n={result.total} one="תוצאה אחת" many="תוצאות" /> עבור <span className="nxc-q">{q}</span>{filterHe}
                </>
              ) : (
                <>אין תוצאות עבור <span className="nxc-q">{q}</span>{filterHe}</>
              )
            ) : result.browse && onlyMeta ? (
              <>
                <Count n={result.total} one="רשומה אחת" many="רשומות" />{filterHe} · אפשר להקליד כדי לסנן
              </>
            ) : (
              <>
                <Count n={indexTotal} one="רשומה אחת" many="רשומות" /> באינדקס · אפשר להקליד כדי לסנן
              </>
            )}
          </p>

          <div className="nxc-scope">
            {live && kinds.length ? (
              <div className="nxc-chips" role="group" aria-label="סינון לפי סוג">
                <button
                  type="button"
                  className="nxc-chip"
                  data-all=""
                  aria-pressed={only === null}
                  onClick={() => onOnly(null)}
                >
                  הכל<b>{nf.format(q ? result.total : indexTotal)}</b>
                </button>
                {kinds.map((s) => (
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
                    {s.he}<b>{nf.format(s.n)}</b>
                  </button>
                ))}
              </div>
            ) : !live ? (
              <p className="nxc-scope-hint">בחירת סוג מציגה את כל הרשומות שלו.</p>
            ) : (
              <span className="nxc-scope-hint" aria-hidden="true" />
            )}

            {/* MODULE facet. Present when the matches belong to more than one
                module, and whenever a module filter is on. */}
            {live && (facets.length > 1 || modOnly) ? (
              <div className="nxc-mods" role="group" aria-label="סינון לפי מודול">
                <button
                  type="button"
                  className="nxc-modchip"
                  aria-pressed={modOnly === null}
                  onClick={() => onModOnly(null)}
                >
                  כל המודולים
                </button>
                {facets.map(([m, c]) => (
                  <button
                    key={m}
                    type="button"
                    className="nxc-modchip"
                    style={{ "--m": modVar(m) } as React.CSSProperties}
                    aria-pressed={modOnly === m}
                    onClick={() => onModOnly(modOnly === m ? null : m)}
                  >
                    <i aria-hidden="true" />
                    {modLabel(m)}<b>{nf.format(c)}</b>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="nxc-body">
          {/* While it lists options the results box holds nothing focusable
              (the options follow aria-activedescendant), so the box itself is
              a tab stop, and a keyboard can scroll it (axe
              scrollable-region-focusable). */}
          <div className="nxc-results" ref={listRef} tabIndex={expanded ? 0 : undefined}>
            {!live ? (
              <div className="nxc-idle">
                <p className="nxc-idle-h">מה יש באינדקס: בחירת סוג מציגה את כל הרשומות שלו</p>
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
                  <Count n={indexTotal} one="רשומה אחת" many="רשומות" /> באינדקס.
                </p>
              </div>
            ) : !expanded ? (
              /* ONE sentence that says what the index holds, and ONE action
                 (gate 6, major 14; DESIGN-SPEC §1). */
              <div className="nxc-none">
                <p>
                  {filterHe
                    ? <>לא נמצאו תוצאות עבור «{q || onlyMeta?.he}»{filterHe}.</>
                    : <>לא נמצאו תוצאות עבור «{q}» בין {nf.format(indexTotal)} הרשומות באינדקס: {listHe(idle.map((x) => PLURAL[x.k]))}.</>}
                </p>
                {emptyAction ? (
                  <button type="button" className="nxc-none-a" onClick={onEmptyAction}>
                    {emptyAction.t === "filter" ? "ניקוי המסנן"
                      : emptyAction.t === "suggest" ? <>האם התכוונת ל-<bdi className="nx-sap">{emptyAction.code}</bdi>?</>
                      : emptyAction.t === "catalogue" ? <>חיפוש «<bdi className="nx-sap">{emptyAction.q}</bdi>» בקטלוג {emptyAction.label}</>
                      : "ניקוי החיפוש"}
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="nxc-list" role="listbox" id="nxc-list" aria-label="תוצאות חיפוש">
                {result.sections.map((sec) => (
                  <div
                    key={sec.k}
                    className="nxc-sec"
                    role="group"
                    aria-labelledby={`nxc-g-${sec.k}`}
                    data-k={sec.k}
                    data-shape={KIND_SHAPE[sec.k]}
                    data-mod={sec.mod ? "1" : "0"}
                    style={{ "--m": modVar(sec.mod) } as React.CSSProperties}
                  >
                    <div className="nxc-sec-h" role="presentation" id={`nxc-g-${sec.k}`}>
                      <i className="nxc-sec-mark" aria-hidden="true" />
                      <Ico name={sec.icon} size={12} />
                      <span>{sec.he}</span>
                      {sec.mod ? <span className="nxc-sec-mod">{modLabel(sec.mod)}</span> : null}
                      <em>{sec.total > sec.rows.length ? `${nf.format(sec.rows.length)} מתוך ${nf.format(sec.total)}` : nf.format(sec.total)}</em>
                    </div>
                    <div className="nxc-sec-body" role="presentation">
                      {sec.rows.map((r) => {
                        const i = n++;
                        return (
                          <Row
                            key={r.id}
                            r={r}
                            i={i}
                            active={i === active}
                            onGo={() => onItem({ rec: r })}
                            onHover={onActive}
                          />
                        );
                      })}
                      {sec.more ? (() => {
                        const i = n++;
                        const rest = sec.total - sec.rows.length;
                        const it: CmdItem = { more: sec.k, next: sec.more === "next", total: sec.total, shown: sec.rows.length };
                        return (
                          <div
                            id={`nxc-o-${i}`}
                            role="option"
                            aria-selected={i === active}
                            className="nxc-more"
                            data-active={i === active ? "1" : "0"}
                            onPointerMove={() => onActive(i)}
                            onClick={() => onItem(it)}
                          >
                            {sec.more === "next"
                              ? `הצגת עוד ${nf.format(Math.min(BROWSE_CAP, rest))} · מוצגות ${nf.format(sec.rows.length)} מתוך ${nf.format(sec.total)}`
                              : `הצגת כל ${nf.format(sec.total)} התוצאות מסוג ${sec.he}`}
                          </div>
                        );
                      })() : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="nxc-detail" aria-label="הקשר התוצאה">
            <Detail rec={rec} ctx={ctx} />
          </aside>
        </div>

        <footer className="nxc-foot">
          <span className="nxc-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> מעבר</span>
            <span><kbd>Home</kbd><kbd>End</kbd> ראשון ואחרון</span>
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
