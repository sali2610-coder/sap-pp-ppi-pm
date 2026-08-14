"use client";

// Project NEO · /neo/transactions — the canonical transaction registry, carried
// into the NEO shell.
//
// WHAT IS REUSED, NOT REBUILT
//   lib/tx-registry      the ONE canonical registry the live Transaction Center
//                        is built on (TX_INTEL → TRANSACTIONS → TCODE_DIRECTORY
//                        → TCODE_CATALOG, deduplicated, deep-first).
//   lib/tx-intel         the real popularity index and the deep intelligence
//                        record (Fiori successor, related tables).
//   lib/tx-facets        the conservative Topic / Object classification.
//   lib/tx-prefs         the product's real favourites and recently-viewed
//                        lists — the same localStorage keys the live centre and
//                        every /tcode page already read and write.
//   /tcode/<CODE>/       the destination. Every row opens the real transaction
//                        page: the full intelligence page when the code is
//                        authored, the verified-breadth page otherwise.
// This file imports those on the CLIENT, exactly as components/transaction-
// workspace.tsx does, so the two centres share one chunk instead of shipping a
// second copy of the registry inside an RSC payload.
//
// CONTROL LANGUAGE (app/neo/ui.css)
//   .nu-tab     switches which slice of the registry is listed.
//   .nu-filter  narrows it. Counts on a filter are always the real count.
//   .nu-chip    a value — module, area, Fiori successor. Never clickable.
//   .nu-status  dot + word. Used for one thing only: how deeply the registry
//               documents the code, which is a real state of the record.
//   .nu-card    the row, which opens /tcode/<CODE>/.
//   .nu-ghost   the row's second action: favourite / unfavourite.
//   .nu-btn2    show more results — a real action, replacing the dead
//               "showing the first 300" note.

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AppWindow, ArrowLeft, Clock, Flame, Layers, Search, SlidersHorizontal,
  Star, Terminal, X,
} from "lucide-react";
import { TX_INTEL } from "@/data/tx-intel";
import { txPopularity, txMostPopular } from "@/lib/tx-intel";
import { registryStats, txRegistry, type RegistryTx } from "@/lib/tx-registry";
import { facetsOf, presentFacets } from "@/lib/tx-facets";
import { toggleTxFavorite, useRecentTx, useTxFavorites } from "@/lib/tx-prefs";
import { MOD_HE, modVar } from "../mod-var";

const nf = new Intl.NumberFormat("he-IL");
const PAGE = 120;

type View = "all" | "popular" | "deep" | "fav" | "recent";

const VIEWS: { v: View; he: string }[] = [
  { v: "all", he: "כל המאגר" },
  { v: "popular", he: "הנפוצות" },
  { v: "deep", he: "מתועדות לעומק" },
  { v: "fav", he: "מועדפים" },
  { v: "recent", he: "נצפו לאחרונה" },
];

/* --------------------------------------------------------------- matching
   Typo-tolerant, in the same three tiers the live centre uses: prefix beats an
   inner substring beats an in-order subsequence. Every token has to land, so a
   two-word query narrows instead of widening. */

function tokenScore(hay: string, q: string): number {
  const i = hay.indexOf(q);
  if (i === 0) return 100;
  if (i > 0) return 70 - Math.min(i, 30);
  let qi = 0;
  for (let h = 0; h < hay.length && qi < q.length; h++) if (hay[h] === q[qi]) qi++;
  return qi === q.length ? 28 : 0;
}

function fuzzyScore(hay: string, query: string): number {
  let total = 0;
  for (const t of query.split(/\s+/).filter(Boolean)) {
    const s = tokenScore(hay, t);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

/* -------------------------------------------------------------------- row */

function Row({ t, fav }: { t: RegistryTx; fav: boolean }) {
  const deep = t.depth === "deep";
  const intel = TX_INTEL[t.code];
  const fiori = intel?.fiori?.trim() || "";
  const pop = txPopularity(t.code);
  const f = facetsOf(t.code);
  return (
    <li className="nxd-item" style={{ "--m": modVar(t.module) } as React.CSSProperties}>
      <Link href={t.href} className="nu-card nxd-row nxd-row--tx" prefetch={false}>
        <span className="nxd-mark" aria-hidden="true" />

        <span className="nxd-id">
          <b className="nx-sap">{t.code}</b>
          <span className="nu-chip nxd-mod" style={{ "--m": modVar(t.module) } as React.CSSProperties}>
            <i aria-hidden="true" />
            {t.module}
            {MOD_HE[t.module] ? <em>{MOD_HE[t.module]}</em> : null}
          </span>
        </span>

        <span className="nxd-body">
          <span className="nxd-he">{t.he || t.en || "אין כותרת במאגר"}</span>
          <span className="nxd-sub">
            {t.en ? <span dir="ltr" className="nxd-en">{t.en}</span> : null}
            {t.en && t.area ? <span className="nxd-dot" aria-hidden="true">·</span> : null}
            {t.area ? <span>{t.area}</span> : null}
          </span>
        </span>

        <span className="nxd-nums">
          <span className="nu-status" style={{ "--s": deep ? "var(--status-done)" : "var(--status-not-started)" } as React.CSSProperties}>
            {deep ? "מתועדת לעומק" : "מאומתת"}
          </span>
          {fiori ? <span className="nu-chip"><AppWindow size={11} strokeWidth={1.75} /><span className="nx-sr">יורש Fiori </span>{fiori}</span> : null}
          {pop > 0 ? <span className="nu-chip"><Flame size={11} strokeWidth={1.75} /><span className="nx-sr">הפניות מתוך המאגר </span>{nf.format(pop)}</span> : null}
          {f.topics[0] ? <span className="nu-chip">{f.topics[0]}</span> : null}
          {f.objects[0] ? <span className="nu-chip">{f.objects[0]}</span> : null}
        </span>

        <span className="nxd-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>

      <button
        type="button"
        className="nu-ghost nxd-ctx nxd-star"
        aria-pressed={fav}
        aria-label={fav ? `הסר את ${t.code} מהמועדפים` : `הוסף את ${t.code} למועדפים`}
        onClick={() => toggleTxFavorite(t.code)}
      >
        <Star size={13} strokeWidth={1.75} />
        <span>{fav ? "במועדפים" : "מועדף"}</span>
      </button>
    </li>
  );
}

/* ---------------------------------------------------------------- surface */

export function TransactionsSurface() {
  const reg = useMemo(() => txRegistry(), []);
  const all = useMemo(() => [...reg.values()], [reg]);
  const stats = useMemo(() => registryStats(), []);
  const popular = useMemo(() => txMostPopular(60), []);
  const facets = useMemo(() => presentFacets(all.map((t) => t.code)), [all]);
  const modules = useMemo(
    () => Object.keys(stats.byModule).sort((a, b) => stats.byModule[b] - stats.byModule[a]),
    [stats],
  );

  const favs = useTxFavorites();
  const recent = useRecentTx();

  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [topic, setTopic] = useState("");
  const [obj, setObj] = useState("");
  const [fiori, setFiori] = useState(false);
  const [more, setMore] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    let base: RegistryTx[];
    if (view === "fav") base = favs.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "recent") base = recent.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "popular") base = popular.map((c) => reg.get(c)).filter(Boolean) as RegistryTx[];
    else if (view === "deep") base = all.filter((t) => t.depth === "deep");
    else base = all;

    let rows = base;
    if (mod) rows = rows.filter((t) => t.module === mod);
    if (topic) rows = rows.filter((t) => facetsOf(t.code).topics.includes(topic));
    if (obj) rows = rows.filter((t) => facetsOf(t.code).objects.includes(obj));
    if (fiori) rows = rows.filter((t) => !!TX_INTEL[t.code]?.fiori?.trim());

    const s = q.trim().toLowerCase();
    if (s) {
      rows = rows
        .map((t) => ({ t, sc: fuzzyScore(`${t.code} ${t.area} ${t.he} ${t.en} ${t.module}`.toLowerCase(), s) }))
        .filter((x) => x.sc > 0)
        .sort((a, b) => b.sc - a.sc || txPopularity(b.t.code) - txPopularity(a.t.code))
        .map((x) => x.t);
    } else if (view === "all" || view === "deep") {
      rows = [...rows].sort(
        (a, b) =>
          (b.depth === "deep" ? 1 : 0) - (a.depth === "deep" ? 1 : 0) ||
          txPopularity(b.code) - txPopularity(a.code) ||
          a.code.localeCompare(b.code),
      );
    }
    return rows;
  }, [all, reg, view, favs, recent, popular, mod, topic, obj, fiori, q]);

  const shown = list.slice(0, limit);
  const dirty = !!q || !!mod || !!topic || !!obj || fiori;
  const reset = () => { setQ(""); setMod(""); setTopic(""); setObj(""); setFiori(false); setLimit(PAGE); };
  const onView = (v: View) => { setView(v); setLimit(PAGE); };

  const surfaceMod = mod || undefined;

  const emptyCopy: Record<View, { t: string; h: string }> = {
    all: { t: "אין טרנזקציה במאגר שעונה על הסינון", h: "החיפוש עובר על הקוד, השם העברי, השם האנגלי, האזור והמודול — ולא על טקסט חופשי." },
    popular: { t: "אין התאמה בין הנפוצות", h: "«נפוצות» נגזר מספירת ההפניות בתוך המאגר עצמו, לא מהערכה." },
    deep: { t: "אין התאמה בין המתועדות לעומק", h: `${nf.format(stats.deep)} קודים מתועדים לעומק כעמודי Wiki מלאים.` },
    fav: { t: "אין מועדפים עדיין", h: "סמן «מועדף» על שורה כאן או בעמוד הטרנזקציה — הרשימה נשמרת במכשיר." },
    recent: { t: "לא נצפו טרנזקציות עדיין", h: "כל טרנזקציה שתפתח תופיע כאן, באותה רשימה שעמודי /tcode כותבים אליה." },
  };

  return (
    <div
      className="nxd"
      data-surface="transactions"
      style={surfaceMod ? ({ "--m": modVar(surfaceMod) } as React.CSSProperties) : undefined}
    >
      <header className="nxd-head">
        {surfaceMod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">עיון · Reference</span>
        <h1 className="nx-h1">טרנזקציות</h1>
        <p className="nx-lede">
          רישום קנוני אחד — {nf.format(stats.total)} טרנזקציות SAP מאומתות מ-{nf.format(modules.length)} מודולים,
          {" "}מתוכן {nf.format(stats.deep)} מתועדות לעומק. כל שורה נפתחת לעמוד הטרנזקציה האמיתי שלה
          {" "}ב-<span className="nx-sap">/tcode/</span>.
        </p>
      </header>

      <section className="nx-card nxd-stats" aria-label="מספרי המאגר">
        {[
          { v: stats.total, l: "טרנזקציות במאגר", i: <Terminal size={14} strokeWidth={1.75} /> },
          { v: stats.deep, l: "מתועדות לעומק", i: <Layers size={14} strokeWidth={1.75} /> },
          { v: stats.light, l: "רשומות אימות", i: <Search size={14} strokeWidth={1.75} /> },
          { v: modules.length, l: "מודולים", i: <SlidersHorizontal size={14} strokeWidth={1.75} /> },
          { v: facets.topics.length, l: "נושאים מסווגים", i: <Flame size={14} strokeWidth={1.75} /> },
          { v: facets.objects.length, l: "אובייקטים עסקיים", i: <AppWindow size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxd-stat">
            <span className="nxd-stat-i" aria-hidden="true">{s.i}</span>
            <b>{nf.format(s.v)}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <div className="nxd-tools">
        <div className="nxd-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }}
            placeholder="קוד (IW31) · שם עברי · שם אנגלי · אזור"
            aria-label="חיפוש טרנזקציות"
          />
          {q ? (
            <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <div className="nxd-tabs" role="tablist" aria-label="תצוגה">
          {VIEWS.map((x) => (
            <button
              key={x.v}
              type="button"
              role="tab"
              className="nu-tab"
              aria-selected={view === x.v}
              onClick={() => onView(x.v)}
            >
              {x.v === "popular" ? <Flame size={13} strokeWidth={1.75} />
                : x.v === "deep" ? <Layers size={13} strokeWidth={1.75} />
                : x.v === "fav" ? <Star size={13} strokeWidth={1.75} />
                : x.v === "recent" ? <Clock size={13} strokeWidth={1.75} />
                : <Terminal size={13} strokeWidth={1.75} />}
              {x.he}
              {x.v === "fav" && favs.length ? <b>{nf.format(favs.length)}</b> : null}
              {x.v === "recent" && recent.length ? <b>{nf.format(recent.length)}</b> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="nxd-facets">
        <div className="nxd-facet" role="group" aria-label="סינון לפי מודול">
          <span className="nxd-facet-l">מודול</span>
          {modules.slice(0, more ? modules.length : 8).map((m) => (
            <button
              key={m}
              type="button"
              className="nu-filter"
              style={{ "--m": modVar(m) } as React.CSSProperties}
              aria-pressed={mod === m}
              onClick={() => { setMod(mod === m ? "" : m); setLimit(PAGE); }}
            >
              {m}<b>{nf.format(stats.byModule[m])}</b>
            </button>
          ))}
          <button
            type="button"
            className="nu-filter"
            aria-pressed={fiori}
            onClick={() => { setFiori((f) => !f); setLimit(PAGE); }}
          >
            <AppWindow size={13} strokeWidth={1.75} />יש יורש Fiori
          </button>
          <button
            type="button"
            className="nu-btn2 nxd-more"
            aria-expanded={more}
            onClick={() => setMore((o) => !o)}
          >
            <SlidersHorizontal size={13} strokeWidth={1.75} />
            {more ? "פחות מסננים" : "עוד מסננים"}
          </button>
        </div>

        {more ? (
          <>
            {facets.topics.length ? (
              <div className="nxd-facet" role="group" aria-label="סינון לפי נושא">
                <span className="nxd-facet-l">נושא</span>
                {facets.topics.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="nu-filter"
                    aria-pressed={topic === x}
                    onClick={() => { setTopic(topic === x ? "" : x); setLimit(PAGE); }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            ) : null}
            {facets.objects.length ? (
              <div className="nxd-facet" role="group" aria-label="סינון לפי אובייקט עסקי">
                <span className="nxd-facet-l">אובייקט</span>
                {facets.objects.map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="nu-filter"
                    aria-pressed={obj === x}
                    onClick={() => { setObj(obj === x ? "" : x); setLimit(PAGE); }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <p className="nxd-count" aria-live="polite">
        <b>{nf.format(list.length)}</b> תוצאות
        {view === "all" && !dirty ? <> מתוך {nf.format(stats.total)}</> : null}
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>נקה סינון</button></> : null}
      </p>

      {list.length === 0 ? (
        <div className="nx-card nxd-none">
          <p><b>{emptyCopy[view].t}</b></p>
          <p className="nx-muted">{emptyCopy[view].h}</p>
          <div className="nxd-none-a">
            {dirty ? <button type="button" className="nu-btn" onClick={reset}>נקה את הסינון</button> : null}
            {view !== "all" ? <button type="button" className="nu-btn2" onClick={() => onView("all")}>הצג את כל המאגר</button> : null}
          </div>
        </div>
      ) : (
        <>
          <ul className="nxd-list">
            {shown.map((t) => <Row key={t.code} t={t} fav={favs.includes(t.code)} />)}
          </ul>
          {list.length > shown.length ? (
            <div className="nxd-page">
              <button type="button" className="nu-btn2" onClick={() => setLimit((n) => n + PAGE)}>
                הצג עוד {nf.format(Math.min(PAGE, list.length - shown.length))}
                <span className="nxd-page-n">· נותרו {nf.format(list.length - shown.length)}</span>
              </button>
            </div>
          ) : null}
        </>
      )}

      <p className="nxd-foot">
        המאגר מאחד ארבעה מקורות מאומתים לרישום אחד, ללא כפילויות. קוד ללא כותרת אנגלית מוצג בלעדיה
        {" "}— היא פשוט אינה קיימת במקור, ולא הומצאה כאן.
      </p>
    </div>
  );
}
