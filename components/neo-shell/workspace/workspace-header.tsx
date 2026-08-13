"use client";

// Project NEO · Stage 2B — the module masthead.
//
// This band FRAMES the working table. It is not a dashboard: there is no grid
// of equal cards, no gauge and no widget. It is one editorial masthead with
// four instruments hung off it — the density strip (which is also the topic
// scope control), the process strip, the relationship read and a context
// column of recents / transactions / books.
//
// COLOUR FORM RULE (app/globals.css, above --mod-pm), obeyed literally:
//   MODULE hue → surface tint, ring, line, edge, section marker. Never a small
//                standalone dot. Here: the ambient light, the masthead edge,
//                the density fill, the strip rules, the code mark.
//   STATUS hue → only a small filled dot immediately followed by its word. It
//                does not appear in this file at all; it lives on the S/4HANA
//                column of the working table.
//   OBJECT hue → the data itself: class dots, process nodes, hub markers.

import Link from "next/link";
import { BookOpen, FlaskConical, GitBranch, Layers, Terminal, Waypoints, Wrench } from "lucide-react";
import type { WsData } from "./workspace-data";
import { WorkspaceRecent } from "./workspace-recent";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceHeader({
  d,
  topic,
  onTopic,
}: {
  d: WsData;
  topic: number | null;
  onTopic: (idx: number) => void;
}) {
  const moduleNames = new Set(d.rows.map((r) => r.n));

  // Every figure below is read straight off the server-built object. The four
  // "second numbers" are shown next to their headline rather than instead of
  // it, because the dictionary genuinely holds two different counts.
  const stats: { n: number; l: string; sub?: string }[] = [
    { n: d.counts.topics, l: "נושאים" },
    { n: d.counts.rows, l: "שורות מילון", sub: `${nf.format(d.counts.tables)} טבלאות ייחודיות` },
    { n: d.counts.fields, l: "שדות מתועדים", sub: `${nf.format(d.counts.pk)} PK · ${nf.format(d.counts.fk)} FK` },
    {
      n: d.counts.funcEntries,
      l: "רשומות ממשק",
      // The kind split is over the NORMALISED objects, so when normalisation
      // actually collapses entries (PP-PI: 71 → 53) the two numbers are stated
      // together instead of one quietly standing in for the other.
      sub: [
        d.counts.funcObjects === d.counts.funcEntries
          ? null
          : `${nf.format(d.counts.funcObjects)} אובייקטים אחרי נרמול`,
        d.counts.bapis ? `${nf.format(d.counts.bapis)} BAPI` : null,
        d.counts.fms ? `${nf.format(d.counts.fms)} FM` : null,
        d.counts.idocs ? `${nf.format(d.counts.idocs)} IDoc` : null,
      ]
        .filter(Boolean)
        .join(" · "),
    },
    { n: d.counts.tcodes, l: "טרנזקציות" },
    { n: d.counts.edges, l: "קשרים ממודלים" },
    { n: d.counts.cds, l: "CDS Views" },
    { n: d.counts.fiori, l: "Fiori Apps" },
  ];

  const flowGaps = d.flow.filter((s) => !s.exists).length;

  return (
    <header className="nw-head">
      <div className="nw-mast">
        <p className="nw-eye">
          CBC ISRAEL · PROJECT NEO
          <i aria-hidden="true" />
          סביבת עבודה · מודול
        </p>

        <div className="nw-id">
          <span className="nw-mark nw-sap" aria-hidden="true">{d.code}</span>
          <div className="nw-idtext">
            <h1 className="nw-title">
              {d.he}
              <span className="nw-code nw-sap">{d.code}</span>
            </h1>
            <p className="nw-en nw-sap">{d.en}</p>
          </div>
          <span className="nw-idicon" aria-hidden="true">
            {d.key === "PM" ? (
              <Wrench size={22} strokeWidth={1.5} />
            ) : (
              <FlaskConical size={22} strokeWidth={1.5} />
            )}
          </span>
        </div>

        <p className="nw-lede">{d.lede}</p>

        <dl className="nw-stats">
          {stats.map((s) => (
            <div key={s.l} className="nw-stat">
              <dt>{s.l}</dt>
              <dd>
                <b className="nw-sap">{nf.format(s.n)}</b>
                {s.sub ? <em>{s.sub}</em> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* -------------------------------------------------- context column */}
      <aside className="nw-aside" aria-label="הקשר של המודול">
        <WorkspaceRecent names={moduleNames} rows={d.rows} />

        <section className="nw-panel" aria-labelledby={`nw-tc-${d.key}`}>
          <h2 className="nw-panel-h" id={`nw-tc-${d.key}`}>
            <Terminal size={14} strokeWidth={1.75} aria-hidden="true" />
            טרנזקציות נפוצות
            <Link className="nw-more" href="/neo/transactions/" prefetch={false}>
              המרשם המלא · {nf.format(d.counts.tcodes)}
            </Link>
          </h2>
          <ul className="nw-tclist">
            {d.tcodes.map((t) => (
              <li key={t.code}>
                <b className="nw-sap">{t.code}</b>
                <span className="nw-bars" aria-hidden="true">
                  {Array.from({ length: t.n }, (_, i) => (
                    <i key={i} />
                  ))}
                </span>
                <em>{t.n} טבלאות</em>
              </li>
            ))}
          </ul>
          <p className="nw-fine">הדירוג הוא מספר הטבלאות במילון שמצביעות על הקוד, ולא תדירות שימוש בפועל.</p>
        </section>

        <section className="nw-panel" aria-labelledby={`nw-bk-${d.key}`}>
          <h2 className="nw-panel-h" id={`nw-bk-${d.key}`}>
            <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
            ספרים קשורים
            <Link className="nw-more" href="/neo/library/" prefetch={false}>
              הספרייה
            </Link>
          </h2>
          {d.books.length ? (
            <ul className="nw-bklist">
              {d.books.map((b) => (
                <li key={b.id}>
                  <b>{b.he}</b>
                  <span className="nw-sap">{b.title}</span>
                  <em>
                    {b.publisher} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                  </em>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nw-fine">אין ספר בספרייה המשויך למודול הזה.</p>
          )}
          {d.courses.length ? (
            <>
              <p className="nw-panel-sub">
                ספרי לימוד באקדמיה
                <Link className="nw-more" href="/neo/academy/" prefetch={false}>
                  האקדמיה
                </Link>
              </p>
              <ul className="nw-cslist">
                {d.courses.map((c) => (
                  <li key={c.id}>
                    <b>{c.he}</b>
                    <em className="nw-sap">
                      {c.module} · {nf.format(c.chapters)} פרקים
                    </em>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </aside>

      {/* ----------------------------------------- the density strip / scope */}
      <section className="nw-dens" aria-labelledby={`nw-dn-${d.key}`}>
        <h2 className="nw-strip-h" id={`nw-dn-${d.key}`}>
          <Layers size={14} strokeWidth={1.75} aria-hidden="true" />
          צפיפות לפי נושא
          <span className="nw-strip-n">
            {nf.format(d.counts.topics)} נושאים · הרחב ביותר מחזיק {nf.format(d.maxTopicTables)} טבלאות
          </span>
        </h2>
        {/* Width = share of the module's dictionary rows. Fill height = tables
            in the topic against the largest topic. Both are real ratios; no
            normalisation flattens the difference between them. */}
        <ul className="nw-densbar">
          {d.topics.map((t) => (
            <li key={t.idx} style={{ "--w": t.tables, "--p": t.tables / d.maxTopicTables } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => onTopic(t.idx)}
                data-on={topic === t.idx ? "1" : undefined}
                aria-pressed={topic === t.idx}
                title={`${t.title} — ${t.tables} טבלאות · ${t.fields} שדות`}
              >
                <span className="nw-dens-fill" aria-hidden="true" />
                <span className="nw-dens-i nw-sap">{String(t.idx).padStart(2, "0")}</span>
                <span className="nw-dens-t">{t.title}</span>
                <span className="nw-dens-n nw-sap">
                  {t.tables}
                  <em>/{t.fields}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="nw-fine">
          רוחב הפלח הוא חלקו של הנושא בשורות המילון; גובה המילוי הוא מספר הטבלאות שלו מול הנושא הגדול ביותר.
          לחיצה מצמצמת את טבלת העבודה לנושא הזה.
        </p>
      </section>

      {/* --------------------------------------------------- process + graph */}
      <div className="nw-lower">
        <section className="nw-flow" aria-labelledby={`nw-fl-${d.key}`}>
          <h2 className="nw-strip-h" id={`nw-fl-${d.key}`}>
            <Waypoints size={14} strokeWidth={1.75} aria-hidden="true" />
            התהליך של המודול
            <span className="nw-strip-n">
              {nf.format(d.flow.length)} שלבים ·{" "}
              {flowGaps === 0 ? "כולם מתועדים במילון" : `${nf.format(flowGaps)} ללא טבלה במילון של המודול`}
            </span>
          </h2>
          <ol className="nw-steps">
            {d.flow.map((s) => (
              <li key={s.code} style={{ "--o": s.obj } as React.CSSProperties}>
                <span className="nw-step" data-missing={s.exists ? undefined : "1"}>
                  <i className="nw-cls" aria-hidden="true" />
                  <b className="nw-sap">{s.code}</b>
                  <span className="nw-step-he">{s.label}</span>
                  <span className="nw-step-n nw-sap">
                    {s.exists ? `${s.f} שדות · ${s.rel} קשרים` : "לא במילון"}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <p className="nw-fine">
            שרשרת התהליך מגיעה ממפת התהליכים של הפרויקט. שלב שהמילון של המודול אינו מחזיק לו טבלה מוצג כפער
            מקווקו, ולא כקופסה עם מספרים מומצאים.
          </p>
        </section>

        <section className="nw-rel" aria-labelledby={`nw-rl-${d.key}`}>
          <h2 className="nw-strip-h" id={`nw-rl-${d.key}`}>
            <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" />
            קשרים
            <Link className="nw-more" href="/neo/domain-model/" prefetch={false}>
              מודל הנתונים
            </Link>
          </h2>
          <p className="nw-relline">
            <b className="nw-sap">{nf.format(d.rel.edges)}</b> קשרים ממודלים,{" "}
            <b className="nw-sap">{nf.format(d.rel.inside)}</b> מהם אל טבלה שהמודול עצמו מתעד.{" "}
            {d.rel.cards.length ? (
              <>
                קרדינליות:{" "}
                {d.rel.cards.map((c, i) => (
                  <span key={c.label}>
                    {i > 0 ? " · " : ""}
                    <span className="nw-sap">{c.label}</span> ×{nf.format(c.n)}
                  </span>
                ))}
                {d.rel.none > 0 ? <> · ללא ציון ×{nf.format(d.rel.none)}</> : null}
              </>
            ) : (
              <>המילון אינו מציין קרדינליות לאף אחד מהם.</>
            )}
          </p>
          <ul className="nw-hubs">
            {d.rel.hubs.map((h) => (
              <li
                key={h.n}
                style={{ "--o": h.obj, "--p": h.deg / (d.rel.hubs[0]?.deg || 1) } as React.CSSProperties}
              >
                <i className="nw-cls" aria-hidden="true" />
                <b className="nw-sap">{h.n}</b>
                <span className="nw-hub-bar" aria-hidden="true">
                  <i />
                </span>
                <em className="nw-sap">{h.deg}</em>
              </li>
            ))}
          </ul>
          <p className="nw-fine">הצמתים העמוסים ביותר — מספר השכנים הישירים שהמילון מחזיק לכל טבלה.</p>
        </section>
      </div>
    </header>
  );
}
