"use client";

// The domains hub list with a local search and filters (design audit §7,
// 2026-09-21: 39 rich cards and no way to narrow them). The cards are the same
// records the server hub built; nothing is re-authored here, the list is only
// narrowed, and the empty state says so in the product's own words.
//
// 2026-10 · THE TABLE LINES. What really ties the 39 domains together is the
// tables they share: 40 of the 77 run through more than one domain, and 20
// cross from PM into PP-PI. The map draws each shared table as a line across
// the domains, a dot where a domain runs through it, and picking a table
// narrows the cards to those domains. Nothing in it is ordered or grouped that
// the dataset does not order or group.

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { FlaskConical, Search, Wrench, X } from "lucide-react";
import type { DomainCard, TableLine } from "./domain-data";

const nf = new Intl.NumberFormat("he-IL");
const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "תחזוקת מפעל · PM", "PP-PI": "תעשיות תהליכיות · PP-PI" };

/** The lines drawn before the reader asks for every shared table. */
const MAIN_LINE = 4;
/** Cards per module before the reader asks for all of them. A search or a
 *  filter always shows every match. */
const FIRST_CARDS = 8;

/** "רשימות פעולות (Task Lists)": the Latin gloss is one LTR unit that moves to
 *  the next line whole instead of splitting with its brackets mirrored. */
function Title({ he }: { he: string }) {
  const m = he.match(/^(.*?)\s*(\([A-Za-z][^)]*\))\s*$/);
  if (!m) return <>{he}</>;
  return <>{m[1]} <bdi dir="ltr" className="ndm-gloss">{m[2]}</bdi></>;
}

/** One domain. The module is the group it sits in, so the card spends its
 *  space on what is particular to the domain: its name, its depth, what it is,
 *  the tables it runs through by name, and how much it holds. The title is the
 *  link; it covers the whole card, so the card is one target with a short name. */
export function Card({ c, i, hit }: { c: DomainCard; i: number; hit: string | null }) {
  // The English name is printed only when the Hebrew title does not already
  // carry it in brackets ("רשימות פעולות (Task Lists)").
  const enShown = !c.he.toLowerCase().includes(c.title.toLowerCase());
  const shared = new Set(c.sharedTables);
  return (
    <article
      className="ndm-card nm-rise nm-once"
      style={{ "--m": MOD_VAR[c.module], "--nm-i": i } as React.CSSProperties}
    >
      <div className="ndm-card-top">
        <h3 className="ndm-card-h">
          <Link href={`/neo/domain/${c.slug}/`} prefetch={false} className="ndm-card-a">
            <Title he={c.he} />
          </Link>
        </h3>
        {/* DEPTH, STATED. A card that carries the deep consultant record says
            so; one that carries only the spine says that instead of staying
            silent and letting the reader assume parity. */}
        <span className="ndm-mark" data-deep={c.deep ? "1" : "0"}>
          {c.deep ? "רשומה מלאה" : "רשומת בסיס"}
        </span>
      </div>
      {enShown ? <p className="ndm-card-en"><bdi dir="ltr">{c.title}</bdi></p> : null}
      <p className="ndm-card-sum">{c.summary}</p>
      <p className="ndm-card-tabs">
        {c.tableNames.map((t, k) => (
          <Fragment key={t}>
            {k ? " · " : ""}
            <span className="nx-sap" data-shared={shared.has(t) ? "1" : undefined} data-hit={hit === t ? "1" : undefined}>
              {t}
              {shared.has(t) ? <span className="sr-only"> (משותפת לתחום נוסף)</span> : null}
            </span>
          </Fragment>
        ))}
      </p>
      <p className="ndm-card-nums">
        <b>{nf.format(c.steps)}</b> שלבים · <b>{nf.format(c.tcodes)}</b> טרנזקציות · <b>{nf.format(c.bapis)}</b>{" "}
        <bdi dir="ltr">BAPIs</bdi>
      </p>
    </article>
  );
}

/** The shared tables as lines across the domains: PM's columns on the reading
 *  side, PP-PI's after a gutter, in the cards' own order. */
function TableMap({
  pm, pp, lines, total, active, onPick,
}: {
  pm: DomainCard[];
  pp: DomainCard[];
  lines: TableLine[];
  total: number;
  active: string | null;
  onPick: (t: string) => void;
}) {
  const [all, setAll] = useState(false);
  // What the caption names: the row or the single dot under the pointer or the
  // focus, otherwise the picked table.
  const [peek, setPeek] = useState<{ t: string; slug?: string } | null>(null);
  const col = new Map<string, number>([
    ...pm.map((c, i) => [c.slug, i + 1] as const),
    ...pp.map((c, i) => [c.slug, pm.length + 2 + i] as const),
  ]);
  const he = new Map([...pm, ...pp].map((c) => [c.slug, c.he]));
  const main = lines.filter((l) => l.slugs.length >= MAIN_LINE);
  const shown = all || main.length === 0 ? lines : main;
  const cross = lines.filter((l) => l.pm && l.pp).length;
  const picked = active ? lines.find((l) => l.t === active) : null;
  const shownLine = peek ? lines.find((l) => l.t === peek.t) : picked;
  const names = (l: TableLine) => l.slugs.map((s) => he.get(s)).join(" · ");
  const vars = { "--pm": pm.length, "--pp": pp.length } as React.CSSProperties;

  return (
    <section className="ndm-map" aria-labelledby="ndm-map-h">
      <div className="ndm-map-head">
        <h2 className="ndm-map-h" id="ndm-map-h">קווי הטבלאות</h2>
        <p className="ndm-map-s">
          {nf.format(lines.length)} מתוך {nf.format(total)} הטבלאות משותפות ליותר מתחום אחד, ו־{nf.format(cross)} מהן
          חוצות בין <bdi dir="ltr">PM</bdi> ל־<bdi dir="ltr">PP-PI</bdi>. כל קו הוא טבלה, וכל נקודה עליו היא תחום שעובר
          דרכה; העמודות הן התחומים, באותו סדר כמו הכרטיסים שלמטה. בחירת טבלה מציגה רק את התחומים שלה.
        </p>
      </div>

      <div className="ndm-map-body" style={vars}>
        <div className="ndm-map-row ndm-map-row--mods" aria-hidden="true">
          <span />
          <span className="ndm-map-track">
            <span className="ndm-map-mod" data-mod="PM" style={{ gridColumn: `1 / span ${pm.length}` }}>
              <i className="ndm-map-key" data-mod="PM" />
              <Wrench size={12} strokeWidth={2} /> <bdi dir="ltr">PM</bdi> · {nf.format(pm.length)}
            </span>
            <span className="ndm-map-mod" data-mod="PP-PI" style={{ gridColumn: `${pm.length + 2} / span ${pp.length}` }}>
              <i className="ndm-map-key" data-mod="PP-PI" />
              <FlaskConical size={12} strokeWidth={2} /> <bdi dir="ltr">PP-PI</bdi> · {nf.format(pp.length)}
            </span>
          </span>
        </div>

        {shown.map((l) => {
          const cols = l.slugs.map((s) => col.get(s) || 0).filter(Boolean).sort((a, b) => a - b);
          return (
            <div
              key={l.t}
              className="ndm-map-row"
              data-on={active === l.t ? "1" : undefined}
              data-peek={peek?.t === l.t ? "1" : undefined}
              onMouseEnter={() => setPeek({ t: l.t })}
              onMouseLeave={() => setPeek(null)}
            >
              <button
                type="button"
                className="ndm-map-t"
                aria-pressed={active === l.t}
                aria-describedby={`ndm-map-d-${l.t}`}
                onClick={() => onPick(l.t)}
                onFocus={() => setPeek({ t: l.t })}
                onBlur={() => setPeek(null)}
              >
                <b className="nx-sap">{l.t}</b>{" "}
                <em>{nf.format(l.slugs.length)} תחומים</em>
              </button>
              <span className="sr-only" id={`ndm-map-d-${l.t}`}>{names(l)}</span>
              <span className="ndm-map-track" aria-hidden="true">
                <i className="ndm-map-line" style={{ gridColumn: `${cols[0]} / ${cols[cols.length - 1] + 1}` }} />
                {l.slugs.map((s) => (
                  <i
                    key={s}
                    className="ndm-map-dot"
                    data-mod={pm.some((c) => c.slug === s) ? "PM" : "PP-PI"}
                    data-peek={peek?.t === l.t && peek.slug === s ? "1" : undefined}
                    style={{ gridColumn: col.get(s) }}
                    onMouseEnter={() => setPeek({ t: l.t, slug: s })}
                  />
                ))}
              </span>
            </div>
          );
        })}
      </div>

      <div className="ndm-map-foot">
        {lines.length > main.length && main.length ? (
          <button type="button" className="nu-link" aria-expanded={all} onClick={() => setAll((v) => !v)}>
            {all
              ? `הצגת ${nf.format(main.length)} הטבלאות המשותפות ביותר בלבד`
              : `הצגת כל ${nf.format(lines.length)} הטבלאות המשותפות`}
          </button>
        ) : null}
        {/* Visual only: the table buttons describe their domains to assistive
            technology, and the card count announces a picked table. */}
        <p className="ndm-map-cap" aria-hidden="true">
          {shownLine ? (
            peek?.slug ? (
              <>
                <b className="nx-sap">{shownLine.t}</b> · {he.get(peek.slug)}
              </>
            ) : (
              <>
                <b className="nx-sap">{shownLine.t}</b> עוברת ב־{nf.format(shownLine.slugs.length)} תחומים: {names(shownLine)}
              </>
            )
          ) : (
            "מעבר על קו או על נקודה מציג את שמות התחומים."
          )}
        </p>
      </div>
    </section>
  );
}

type Mod = "PM" | "PP-PI";
type Depth = "deep" | "base";

export function DomainHubList({ cards, lines, tables }: { cards: DomainCard[]; lines: TableLine[]; tables: number }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<Mod | null>(null);
  const [depth, setDepth] = useState<Depth | null>(null);
  const [table, setTable] = useState<string | null>(null);

  const [open, setOpen] = useState<Record<string, boolean>>({});
  // MOST CONNECTED FIRST: by the number of other domains a domain shares a
  // table with, then in the dataset's order. The map's columns follow the same
  // order, so a card and its column sit in the same place.
  const ranked = useMemo(
    () => cards.map((c, k) => ({ c, k })).sort((a, b) => b.c.ties - a.c.ties || a.k - b.k).map(({ c }) => c),
    [cards],
  );
  const pm = useMemo(() => ranked.filter((c) => c.module === "PM"), [ranked]);
  const pp = useMemo(() => ranked.filter((c) => c.module === "PP-PI"), [ranked]);
  const deepN = cards.filter((c) => c.deep).length;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ranked.filter((c) =>
      (!mod || c.module === mod) &&
      (!depth || (depth === "deep") === c.deep) &&
      (!table || c.tableNames.includes(table)) &&
      (!needle || [c.he, c.title, c.summary, c.slug, ...c.tableNames, ...c.tcodeNames].join(" ").toLowerCase().includes(needle)));
  }, [ranked, q, mod, depth, table]);

  const groups = (["PM", "PP-PI"] as const)
    .map((m) => ({ m, list: shown.filter((c) => c.module === m) }))
    .filter((g) => g.list.length > 0);
  const active = !!q.trim() || !!mod || !!depth || !!table;
  const clear = () => { setQ(""); setMod(null); setDepth(null); setTable(null); };

  return (
    <>
      <TableMap pm={pm} pp={pp} lines={lines} total={tables} active={table} onPick={(t) => setTable((cur) => (cur === t ? null : t))} />

      <div className="ndm-tools" role="search">
        <label className="ndm-find">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש תחום · שם, תיאור, טבלה או טרנזקציה"
            aria-label="חיפוש בתחומים העסקיים"
            dir="auto"
          />
          {q ? (
            <button type="button" className="nu-ghost" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <div className="ndm-seg" role="group" aria-label="סינון לפי מודול">
          <button type="button" aria-pressed={!mod} onClick={() => setMod(null)}>הכול</button>
          {(["PM", "PP-PI"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mod === m}
              onClick={() => setMod((cur) => (cur === m ? null : m))}
              style={{ "--m": MOD_VAR[m] } as React.CSSProperties}
            >
              {m === "PM" ? <Wrench size={13} strokeWidth={1.75} aria-hidden="true" /> : <FlaskConical size={13} strokeWidth={1.75} aria-hidden="true" />}
              <bdi dir="ltr">{m}</bdi>
              <em className="nx-sap">{nf.format((m === "PM" ? pm : pp).length)}</em>
            </button>
          ))}
        </div>
        <div className="ndm-seg" role="group" aria-label="סינון לפי עומק הרשומה">
          <button type="button" aria-pressed={!depth} onClick={() => setDepth(null)}>הכול</button>
          <button type="button" aria-pressed={depth === "deep"} onClick={() => setDepth((cur) => (cur === "deep" ? null : "deep"))}>
            רשומה מלאה <em className="nx-sap">{nf.format(deepN)}</em>
          </button>
          <button type="button" aria-pressed={depth === "base"} onClick={() => setDepth((cur) => (cur === "base" ? null : "base"))}>
            רשומת בסיס <em className="nx-sap">{nf.format(cards.length - deepN)}</em>
          </button>
        </div>
      </div>

      {/* THE DEPTH LEGEND, in the words the hub always used. A stated gap is
          information, not an error. */}
      <ul className="ndm-legend">
        <li data-deep="1">
          <b>{nf.format(deepN)}</b> מהם כוללים גם רשומה מלאה: נתוני אב, User Exits ו-BAdIs, תרחישי בדיקה, תקלות
          מהשטח, תרחיש מהמפעל והכרעת מעבר ל-S/4HANA.
        </li>
        {lines[0] ? (
          <li data-key="shared">
            <span className="nx-sap ndm-key-shared" aria-hidden="true">{lines[0].t}</span>
            שם טבלה צבוע בכרטיס הוא טבלה שתחום נוסף עובר בה, כלומר קו במפה שלמעלה.
          </li>
        ) : null}
        {cards.length > deepN ? (
          <li data-deep="0">
            <b>{nf.format(cards.length - deepN)}</b> תחומים כוללים רשומת בסיס בלבד, והם מסומנים כך בכרטיס ובעמוד. לרשומה
            המלאה שלהם לא קיים תיעוד מאומת במאגר.
          </li>
        ) : null}
      </ul>

      <p className="ndm-count">
        <span aria-live="polite">
          {active
            ? <>{nf.format(shown.length)} מתוך {nf.format(cards.length)} תחומים{mod ? ` · ${MOD_HE[mod]}` : ""}{depth ? ` · ${depth === "deep" ? "רשומה מלאה" : "רשומת בסיס"}` : ""}{table ? <> · <bdi dir="ltr">{table}</bdi></> : null}{q.trim() ? <> · «<bdi>{q.trim()}</bdi>»</> : null}</>
            : <>{nf.format(cards.length)} תחומים · ללא סינון</>}
        </span>
        {active ? (
          <button type="button" className="nu-ghost" onClick={clear}>
            <X size={13} strokeWidth={2} aria-hidden="true" /> ניקוי הסינון
          </button>
        ) : null}
      </p>

      {groups.length ? groups.map(({ m, list }) => {
        const capped = !active && !open[m] && list.length > FIRST_CARDS;
        const cut = capped ? list.slice(0, FIRST_CARDS) : list;
        return (
          <section key={m} className="ndm-mod" style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
            <h2 className="ndm-mod-h">
              {m === "PM" ? <Wrench size={16} strokeWidth={1.75} aria-hidden="true" /> : <FlaskConical size={16} strokeWidth={1.75} aria-hidden="true" />}
              {MOD_HE[m]}
              <span className="ndm-mod-n">
                {capped
                  ? `${nf.format(FIRST_CARDS)} המקושרים ביותר מתוך ${nf.format(list.length)}`
                  : `${nf.format(list.length)} תחומים`}
              </span>
            </h2>
            <div className="ndm-grid">
              {cut.map((c, i) => <Card key={c.slug} c={c} i={i} hit={table} />)}
            </div>
            {!active && list.length > FIRST_CARDS ? (
              <button
                type="button"
                className="nu-btn2 ndm-more"
                aria-expanded={!capped}
                onClick={() => setOpen((o) => ({ ...o, [m]: !o[m] }))}
              >
                {capped
                  ? `הצגת כל ${nf.format(list.length)} התחומים של ${m}`
                  : `הצגת ${nf.format(FIRST_CARDS)} המקושרים ביותר בלבד`}
              </button>
            ) : null}
          </section>
        );
      }) : (
        <div className="nx-card ndm-none">
          <p><b>לא נמצאו תחומים מתאימים. נסה חיפוש אחר או נקה מסננים.</b></p>
          <button type="button" className="nu-btn2" onClick={clear}>הצגת כל התחומים</button>
        </div>
      )}
    </>
  );
}
