"use client";

/* ============================================================================
   PROJECT NEO · /neo/incidents — the incident catalogue.
   ----------------------------------------------------------------------------
   Real troubleshooting records, listed the way a consultant actually triages
   them: what stops work first, in which module, with which symptom.

   THE SHAPE (2026-10) is the Reference catalogs' (components/neo-shell/data/
   catalog-kit.tsx): a hero whose ledger counts are the views themselves, one
   signature band, the count line with removable tokens, and the records as
   aligned rows under a sticky column head that become cards on a narrow width.

   THE SIGNATURE is the triage itself: the business-impact tags the records
   carry, in the order a reader triages them, against the modules. Every one of
   its 45 counts is the real number of records in that slice, and every cell,
   row head and column head is the filter it counts. Under it, the diagnostic
   transactions the records send you to most often, each one an exact filter
   on the record's own transaction list (not a text search, so the number on
   the button is the number of rows it leaves).

   COLOUR
     MODULE is a ring and a tint on its own chip, never a stripe. "Cross" is not
     a module and stays neutral.
     STATUS is used for one thing only: the record's OWN impact tag, a dot plus
     its word. The word carries the meaning; the dot only says "this is a state".
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from "react";
import { Bug, Search, Terminal, X } from "lucide-react";
import {
  OriginLink, SmartReturn, consumeReturn, restoreScroll, scrollOffset, useReturnPacket,
} from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { CatalogFoot, CatalogHero, Cell, Cols, Ledger, RankList, Sig, fmt } from "../data/catalog-kit";
import { learnModVar } from "./mod";
import { IMPACT_UNTAGGED, type IncidentRow, type IncidentsData } from "./incidents-data";

const SURFACE = "neo:incidents";
const PAGE = 40;
/** How many of the most-cited diagnostic transactions the signature names. */
const TOP_TX = 10;
const NONE = "לא קיים תיעוד מאומת במאגר";

/** A type alias rather than an interface: only an alias picks up the implicit
 *  index signature that satisfies the smart-return module's OriginState. */
type ListState = { view: string; q: string; mod: string; imp: string; tx: string; limit: number; y: number; slug: string };

type View = "all" | "s4" | "prevent";

const VIEW_HE: Record<View, string> = {
  all: "כל הקטלוג",
  s4: "עם הבחנה בין ECC ל-S/4HANA",
  prevent: "עם צעדי מניעה",
};

/** Severity is not invented here. The record's own tag chooses the dot; the
 *  Hebrew word next to it carries the whole meaning. */
const IMPACT_DOT: Record<string, string> = {
  BLOCKING: "var(--status-in-analysis)",
  "FINANCIAL POSTING RISK": "var(--status-in-analysis)",
  FINANCIAL: "var(--status-in-conversion)",
  "DATA INCONSISTENCY": "var(--status-in-conversion)",
  // --status-tested is violet, and this product draws no violet: the two lower
  // tiers share the neutral dot with monitoring, and their words tell them apart.
  PARTIAL: "var(--status-not-started)",
  "USER-SPECIFIC": "var(--status-not-started)",
  "MONITORING NOISE": "var(--status-not-started)",
  MONITORING: "var(--status-not-started)",
};
const dotOf = (kind: string) => IMPACT_DOT[kind] || "var(--status-not-started)";

/** 37 of the catalogue's codes are written "IWO10009 verify SE93": the code,
 *  and the transaction the source asks you to verify it in (SE93 transactions,
 *  SE18 BAdIs, SE91 message classes). The code is the code; the rest is said. */
const VERIFY = /^(\S+)\s+verify\s+(SE\d\d)$/i;
const splitCode = (raw: string): { code: string; at: string } => {
  const m = raw.match(VERIFY);
  return m ? { code: m[1], at: m[2].toUpperCase() } : { code: raw, at: "" };
};

const COLS = [
  { k: "id", l: "תקלה" },
  { k: "he", l: "סימפטום" },
  { k: "mod", l: "מודול" },
  { k: "st", l: "השפעה" },
  { k: "dx", l: "אבחון" },
];

/** What the parent hands each row: the origin record for THIS view, built at
 *  click time so the query and the scroll offset are the ones true on leaving. */
type MakeOrigin = (slug: string) => {
  href: string; label: string; detail: string; surface: string; state: ListState;
};

/* -------------------------------------------------------------------- row */

function Row({ r, impactHe, makeOrigin, landed }: {
  r: IncidentRow; impactHe: string; makeOrigin: MakeOrigin; landed: boolean;
}) {
  return (
    <li
      className="nxd-item"
      data-slug={r.slug}
      data-back={landed ? "1" : undefined}
      style={{ "--m": learnModVar(r.module) } as React.CSSProperties}
    >
      <OriginLink href={r.href} className="nxd-row" origin={() => makeOrigin(r.slug)}>
        <span className="nxd-c" data-k="id">
          <span className="nxd-lead">{r.he}</span>
          {/* "C2 144 verify SE91", "M7053 / תקופת רישום אינה פתוחה": the line
              takes the direction of its first letter, so a clamp cuts its end */}
          {r.error ? <span className="nxd-sub" dir="auto">{r.error}</span> : null}
        </span>

        <span className="nxd-c" data-k="he">
          <span className="nxd-he nxd-he--soft"><Rtl s={r.symptom || NONE} /></span>
          {/* The one line a triager wants next: where the record splits ECC
              from S/4HANA, or else the first root cause it names. */}
          {r.hasS4 ? (
            <span className="nxd-sub">
              <span className="nxd-sub-l">{r.s4 ? "S/4HANA" : "ECC"}</span>{" "}
              <Rtl s={r.s4 || r.ecc} />
            </span>
          ) : r.rootCauses.length ? (
            <span className="nxd-sub">
              <span className="nxd-sub-l">סיבה ראשונה</span>{" "}
              <Rtl s={r.rootCauses[0]} />
            </span>
          ) : null}
        </span>

        <Cell k="mod" l="מודול" sr="מודול ">
          <span className="nxd-mods">
            <span className="nxd-mod" title={r.moduleHe || undefined}>{r.module}</span>
          </span>
        </Cell>

        <Cell k="st" l="השפעה" sr="השפעה עסקית: ">
          {r.impactKind
            ? <span className="nu-status" style={{ "--s": dotOf(r.impactKind) } as React.CSSProperties}>{impactHe}</span>
            : <span className="nxd-nil">ללא תג השפעה</span>}
        </Cell>

        <Cell k="dx" l="אבחון" sr="טרנזקציות לאבחון: ">
          {r.tcodes.length ? (
            <span className="nxd-codes">
              {r.tcodes.slice(0, 3).map((c) => {
                const s = splitCode(c.code);
                return (
                  <span key={c.code} className="nxd-code-v">
                    <bdi>{s.code}</bdi>
                    {s.at ? <>{" "}<span className="nxd-vfy">לאימות ב-<bdi>{s.at}</bdi></span></> : null}
                  </span>
                );
              })}
              {r.tcodes.length > 3 ? <bdi dir="ltr" className="nxd-more-n">+{fmt(r.tcodes.length - 3)}</bdi> : null}
            </span>
          ) : <span className="nxd-nil">לא צוינו טרנזקציות</span>}
          <small>
            {r.rootCauses.length ? <>{fmt(r.rootCauses.length)} סיבות שורש{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}
            {fmt(r.fix.length)} צעדי תיקון
          </small>
        </Cell>
      </OriginLink>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function IncidentsSurface({ data }: { data: IncidentsData }) {
  const { rows, modules, impacts, totals } = data;

  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [imp, setImp] = useState("");
  const [tx, setTx] = useState("");
  const [limit, setLimit] = useState(PAGE);
  /** A phone's impact list shows its first four bars until asked for all. */
  const [allImp, setAllImp] = useState(false);

  const impactHe = useMemo(
    () => Object.fromEntries(impacts.map((f) => [f.id, f.he])) as Record<string, string>,
    [impacts],
  );

  /* TRIAGE ORDER. The records arrive in the order the source files list them;
     the catalogue is read the way a consultant triages: what stops work first.
     The impact facets already come in that order (incidents-data.ts), and a
     record with no tag goes last. Stable within a tag. */
  const ordered = useMemo(() => {
    const rank = new Map(impacts.map((f, i) => [f.id, i]));
    return rows
      .map((r, i) => ({ r, i, k: rank.get(r.impactKind || IMPACT_UNTAGGED) ?? impacts.length }))
      .sort((a, b) => a.k - b.k || a.i - b.i)
      .map((x) => x.r);
  }, [rows, impacts]);

  const list = useMemo(() => {
    let out = ordered;
    if (view === "s4") out = out.filter((r) => r.hasS4);
    else if (view === "prevent") out = out.filter((r) => r.prevention.length > 0);
    if (mod) out = out.filter((r) => r.module === mod);
    if (imp) out = out.filter((r) => (r.impactKind || IMPACT_UNTAGGED) === imp);
    if (tx) out = out.filter((r) => r.tcodes.some((c) => splitCode(c.code).code === tx));
    const s = q.trim().toLowerCase();
    if (s) {
      const tokens = s.split(/\s+/).filter(Boolean);
      out = out.filter((r) => tokens.every((t) => r.hay.includes(t)));
    }
    return out;
  }, [ordered, view, mod, imp, tx, q]);

  /* ------------------------------------------------------ the signature
     Impact × module, counted from the records, every count a slice. */
  const cell = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) {
      const k = `${r.impactKind || IMPACT_UNTAGGED}|${r.module}`;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  }, [rows]);
  const maxCell = Math.max(1, ...cell.values());
  const maxImpact = Math.max(1, ...impacts.map((f) => f.n));

  /** The diagnostic transactions the catalogue names most often. */
  const topTx = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of rows) {
      // a record names a code once, whether or not it asks to verify it
      for (const code of new Set(r.tcodes.map((c) => splitCode(c.code).code))) m.set(code, (m.get(code) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, TOP_TX);
  }, [rows]);

  const withError = useMemo(() => rows.filter((r) => r.error).length, [rows]);
  /* "Cross" is a bucket, not a module (see the header): counted apart. */
  const realMods = modules.filter((m) => m.id !== "Cross").length;
  const hasCross = modules.some((m) => m.id === "Cross");
  const areasHe = `${fmt(realMods)} מודולים${hasCross ? " ו-Cross" : ""}`;
  const untagged = totals.incidents - rows.filter((r) => r.impactKind).length;

  const shown = list.slice(0, limit);
  const dirty = !!q || !!mod || !!imp || !!tx;
  const reset = () => { setQ(""); setMod(""); setImp(""); setTx(""); setView("all"); setLimit(PAGE); };
  const onView = (v: View) => { setView((cur) => (cur === v ? "all" : v)); setLimit(PAGE); };
  const pickMod = (m: string) => { setMod((cur) => (cur === m ? "" : m)); setLimit(PAGE); };
  const pickImp = (f: string) => { setImp((cur) => (cur === f ? "" : f)); setLimit(PAGE); };
  const pickSlice = (f: string, m: string) => {
    const on = imp === f && mod === m;
    setImp(on ? "" : f); setMod(on ? "" : m); setLimit(PAGE);
  };
  const pickTx = (c: string) => { setTx((cur) => (cur === c ? "" : c)); setLimit(PAGE); };

  /* "show more" puts the keyboard on the first row it added. */
  const firstNew = useRef<number | null>(null);
  const showMore = () => { firstNew.current = shown.length; setLimit((n) => n + PAGE); };
  useEffect(() => {
    if (firstNew.current === null) return;
    const i = firstNew.current;
    firstNew.current = null;
    document.querySelectorAll<HTMLElement>(".nxd[data-surface='incidents'] .nxd-list > .nxd-item > .nxd-row")[i]?.focus();
  }, [limit]);

  /* -------------------------------------------------------- smart return */

  const makeOrigin: MakeOrigin = (slug) => {
    const parts = [
      mod ? modules.find((m) => m.id === mod)?.he || mod : "",
      imp ? impactHe[imp] || "" : "",
      tx ? `טרנזקציה ${tx}` : "",
      view === "all" ? "" : VIEW_HE[view],
      q.trim() ? `חיפוש «${q.trim()}»` : "",
    ].filter(Boolean);
    return {
      href: "/neo/incidents/",
      label: "תקלות ופתרון בעיות",
      detail: parts.join(" · "),
      surface: SURFACE,
      state: { view, q, mod, imp, tx, limit, y: scrollOffset(), slug },
    };
  };

  const packet = useReturnPacket(SURFACE);
  const [seededAt, setSeededAt] = useState(0);
  const [back, setBack] = useState<ListState | null>(null);
  if (packet && packet.at !== seededAt) {
    setSeededAt(packet.at);
    const s = packet.state as ListState;
    setBack(s);
    setView((Object.hasOwn(VIEW_HE, s.view) ? s.view : "all") as View);
    setQ(s.q || "");
    setMod(s.mod || "");
    setImp(s.imp || "");
    setTx(s.tx || "");
    setLimit(Math.max(PAGE, Number(s.limit) || PAGE));
  }
  useEffect(() => { if (packet) consumeReturn(SURFACE); }, [packet]);
  useEffect(() => {
    if (!back) return;
    return restoreScroll(Number(back.y) || 0, back.slug ? `.nxd-item[data-slug="${CSS.escape(back.slug)}"]` : undefined);
  }, [back]);

  const surfaceMod = mod && mod !== "Cross" ? mod : undefined;

  const tokens = [
    ...(view !== "all" ? [{ k: "v", he: VIEW_HE[view], off: () => setView("all") }] : []),
    ...(mod ? [{ k: "m", he: mod, off: () => setMod("") }] : []),
    ...(imp ? [{ k: "i", he: impactHe[imp] || imp, off: () => setImp("") }] : []),
    ...(tx ? [{ k: "t", he: tx, off: () => setTx("") }] : []),
    ...(q.trim() ? [{ k: "q", he: `«${q.trim()}»`, off: () => setQ("") }] : []),
  ];

  return (
    <div
      className="nxd nm-scene"
      data-scene="cream"
      data-surface="incidents"
      style={surfaceMod ? ({ "--m": learnModVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<Bug size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="ידע ולמידה · Troubleshooting"
        title="תקלות ופתרון בעיות"
        lede={
          <>
            קטלוג של {fmt(totals.incidents)} תקלות מתועדות ב-{fmt(realMods)} מודולים{hasCross ? " ובתחום חוצה-מודולים" : ""}: סימפטום,
            {" "}סיבות שורש, טרנזקציות לאבחון, טבלאות לבדיקה וצעדי תיקון. כל תקלה נפתחת לרשומה המלאה.
          </>
        }
        facts={[
          { v: totals.withFix, l: "עם צעדי תיקון" },
          { v: totals.withScenario, l: "עם תרחיש" },
          { v: withError, l: "עם הודעת שגיאה" },
          { v: totals.tcodes, l: "טרנזקציות אבחון" },
          { v: totals.tables, l: "טבלאות לבדיקה" },
          { v: totals.exits, l: "יציאות ו-BAdIs קשורים" },
        ]}
      >
        <Ledger
          label="הקטלוג במספרים. כל מספר מציג את התקלות שהוא סופר"
          items={[
            { v: totals.incidents, l: "תקלות בקטלוג", on: !dirty && view === "all", onClick: reset },
            { v: totals.withPrevention, l: VIEW_HE.prevent, on: view === "prevent", onClick: () => onView("prevent") },
            { v: totals.withS4, l: VIEW_HE.s4, on: view === "s4", onClick: () => onView("s4") },
            { v: totals.modules, l: `תחומים: ${areasHe}`, href: "#nxd-sig" },
          ]}
        />
      </CatalogHero>

      <Sig
        id="nxd-sig"
        icon={<Bug size={15} strokeWidth={1.75} />}
        title="השפעה עסקית לפי מודול"
        count={`${fmt(impacts.length)} תגי השפעה · ${areasHe}`}
        lede="מה עוצר עבודה קודם, ובאיזה מודול. כל מספר הוא מספר התקלות בחתך; לחיצה על תא, על שורה או על עמודה מסננת את הרשימה."
      >
        <div className="nxd-mxw" data-alt="1">
          <table className="nxd-mx nxd-mx--dense">
            <caption className="nx-sr">תקלות לפי תג ההשפעה העסקית ולפי מודול</caption>
            <thead>
              <tr>
                <th scope="col">השפעה</th>
                {modules.map((m) => (
                  <th key={m.id} scope="col">
                    <button
                      type="button"
                      aria-pressed={mod === m.id}
                      onClick={() => pickMod(m.id)}
                      aria-label={`${m.id}${m.id !== "Cross" ? ` · ${m.he}` : ""}: ${fmt(m.n)} תקלות`}
                    >
                      <span className="nxd-mod" style={{ "--m": learnModVar(m.id) } as React.CSSProperties}>{m.id}</span>
                      <b className="nx-sap">{fmt(m.n)}</b>
                    </button>
                  </th>
                ))}
                <th scope="col">סה״כ</th>
              </tr>
            </thead>
            <tbody>
              {impacts.map((f) => (
                <tr key={f.id}>
                  <th scope="row">
                    <button type="button" aria-pressed={imp === f.id} onClick={() => pickImp(f.id)}>
                      {f.id === IMPACT_UNTAGGED
                        ? <span className="nxd-nil">{f.he}</span>
                        : <span className="nu-status" style={{ "--s": dotOf(f.id) } as React.CSSProperties}>{f.he}</span>}
                    </button>
                  </th>
                  {modules.map((m) => {
                    const n = cell.get(`${f.id}|${m.id}`) ?? 0;
                    const on = imp === f.id && mod === m.id;
                    return (
                      <td key={m.id} data-l={m.id} data-zero={n ? undefined : "1"}>
                        <button
                          type="button"
                          aria-pressed={on}
                          disabled={!n}
                          aria-label={`${f.he}, ${m.id}: ${fmt(n)} תקלות`}
                          onClick={() => pickSlice(f.id, m.id)}
                        >
                          <b className="nx-sap">{fmt(n)}</b>
                          <span className="nxd-mx-bar" aria-hidden="true"><i style={{ inlineSize: `${(n / maxCell) * 100}%` }} /></span>
                        </button>
                      </td>
                    );
                  })}
                  <td data-l="סה״כ">
                    <span className="nxd-mx-tot">
                      <b className="nx-sap">{fmt(f.n)}</b>
                      <span className="nxd-mx-bar" aria-hidden="true"><i style={{ inlineSize: `${(f.n / maxImpact) * 100}%` }} /></span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* A PHONE cannot hold 45 cells. The same two filters, ranked: the
            impact tags as bars, the modules as a row under them. Choosing one
            of each is the matrix's slice. */}
        <div className="nxd-mx-alt">
          <RankList
            label="תקלות לפי תג השפעה"
            fold
            open={allImp}
            onToggle={() => setAllImp((o) => !o)}
            moreLabel={`הצגת כל ${fmt(impacts.length)} תגי ההשפעה`}
            items={impacts.map((f) => ({
              id: f.id,
              label: f.id === IMPACT_UNTAGGED
                ? <span className="nxd-nil">{f.he}</span>
                : <span className="nu-status" style={{ "--s": dotOf(f.id) } as React.CSSProperties}>{f.he}</span>,
              n: f.n,
              on: imp === f.id,
              onClick: () => pickImp(f.id),
            }))}
          />
          <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
            <span className="nxd-facet-l">מודול</span>
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                className="nu-filter"
                style={{ "--m": learnModVar(m.id) } as React.CSSProperties}
                aria-pressed={mod === m.id}
                onClick={() => pickMod(m.id)}
              >
                {m.id}<b>{fmt(m.n)}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="nxd-facet nxd-txs" role="group" aria-label="טרנזקציות האבחון השכיחות בקטלוג">
          <span className="nxd-facet-l"><Terminal size={13} strokeWidth={1.75} aria-hidden="true" /> טרנזקציות האבחון השכיחות</span>
          {topTx.map(([c, n]) => (
            <button
              key={c}
              type="button"
              className="nu-filter"
              aria-pressed={tx === c}
              onClick={() => pickTx(c)}
              aria-label={`${c}: ${fmt(n)} תקלות מפנות אליה`}
            >
              <bdi className="nx-sap">{c}</bdi><b>{fmt(n)}</b>
            </button>
          ))}
        </div>
      </Sig>

      <div className="nxd-tools nm-fade nm-once">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder="סימפטום · הודעת שגיאה · טרנזקציה (COGI) · טבלה (AFFW)"
            aria-label="חיפוש תקלות"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="nxd-count">
        <p>
          <b aria-live="polite">{fmt(list.length)}</b> מתוך {fmt(totals.incidents)} תקלות
        </p>
        {tokens.length ? (
          <div className="nxd-toks" role="group" aria-label="הסינון הפעיל">
            {tokens.map((tk) => (
              <button key={tk.k} type="button" className="nu-ghost nxd-tok" onClick={tk.off} aria-label={`הסרת הסינון ${tk.he}`}>
                <X size={12} strokeWidth={2} aria-hidden="true" />{tk.he}
              </button>
            ))}
            <button type="button" className="nu-ghost nxd-tok-all" onClick={reset}>ניקוי הסינון</button>
          </div>
        ) : null}
      </div>

      <div className="nxd-results" data-cols="incidents">
        {list.length === 0 ? (
          <div className="nxd-none">
            <p><b>לא נמצאו תוצאות התואמות לסינון שנבחר</b></p>
            <p className="nx-muted">
              החיפוש מכסה את הכותרת, הסימפטום, הודעת השגיאה, סיבות השורש, צעדי התיקון והמניעה, וקודי
              {" "}הטרנזקציות והטבלאות שברשומה.
            </p>
            <div className="nxd-none-a">
              <button type="button" className="nu-btn2" onClick={reset}>הצגת כל הקטלוג</button>
              {q ? <button type="button" className="nu-ghost" onClick={() => setQ("")}>ניקוי החיפוש בלבד</button> : null}
            </div>
          </div>
        ) : (
          <>
            <div className="nxd-table">
              <Cols cols={COLS} />
              <ul className="nxd-list">
                {shown.map((r) => (
                  <Row
                    key={r.slug}
                    r={r}
                    impactHe={impactHe[r.impactKind] || r.impactKind}
                    makeOrigin={makeOrigin}
                    landed={!!back && back.slug === r.slug}
                  />
                ))}
              </ul>
            </div>
            {list.length > shown.length ? (
              <div className="nxd-page">
                <button type="button" className="nu-btn2" onClick={showMore}>
                  הצגת עוד {fmt(Math.min(PAGE, list.length - shown.length))}
                  <span className="nxd-page-n">· נותרו {fmt(list.length - shown.length)}</span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <CatalogFoot
        notes={[
          <>
            תווית ההשפעה נלקחת מהרשומה כפי שתועדה.
            {" "}{fmt(untagged)} רשומות ללא תג מסומנות «ללא תג השפעה».
          </>,
        ]}
      >
        מקור: <span className="nx-sap">data/troubleshooting.ts</span>: תיעוד פתרון בעיות מאומת, שאינו מחובר
        {" "}למערכת SAP. הרשומות כוללות מילות חיפוש ל-SAP Notes, ללא מספרי Note.
      </CatalogFoot>
    </div>
  );
}
