"use client";

/* ============================================================================
   PROJECT NEO · ARCHITECTURE STUDIO — the explanation panel
   ----------------------------------------------------------------------------
   With nothing selected it explains the picture: what the view shows, how to
   read it, what is drawn, what is on screen now, and its busiest objects.
   With an object selected it is that object's card: what it is, where it
   stands, the blueprint's own words on it, every relation it has (drawn or
   not), and the way to its own NEO page when there is one.
   Every number here is counted from the picture or the graph; every sentence
   about the data is the blueprint's, verbatim.
   ========================================================================== */

import { ArrowLeft, Crosshair, Focus, X } from "lucide-react";
import type { StudioModule } from "./studio-data";
import { KIND_HE, KIND_HE_PLURAL, type BuiltView, type Graph, type Kind, type ViewDef } from "./studio-views";
import { KindGlyph, S4Glyph, s4Word } from "./studio-stage";

const KIND_ORDER: Kind[] = ["table", "tcode", "bapi", "fm", "idoc", "cds", "fiori"];

interface Props {
  G: Graph;
  mod: StudioModule;
  view: ViewDef;
  built: BuiltView;
  sel: string | null;
  iso: boolean;
  onPick: (id: string) => void;
  onClear: () => void;
  onIsolate: () => void;
  onCenter: () => void;
}

/** Bring a section to the top of the panel's own scroller (never the page). */
function toSection(id: string) {
  const el = document.getElementById(id);
  const box = el?.closest<HTMLElement>(".nst-panel-in");
  if (!el || !box) return;
  box.scrollTo({ top: box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - 8 });
  el.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
}

export function StudioPanel({ G, mod, view, built, sel, iso, onPick, onClear, onIsolate, onCenter }: Props) {
  const layout = built.layout;
  const drawn = new Set(layout.nodes.map((n) => n.id));
  const zoneHe = new Map(G.g.zones.map((z) => [z.id as string, z.he]));
  const node = sel ? G.byId.get(sel) : undefined;

  if (node) {
    const rel = [...(G.adj.get(node.id) || [])].map((id) => G.byId.get(id)!).filter(Boolean);
    const byKind = KIND_ORDER.map((k) => ({ k, list: rel.filter((n) => n.k === k).sort((a, b) => a.l.localeCompare(b.l)) })).filter((x) => x.list.length);
    const name = node.he || node.en || "";
    return (
      <div className="nst-panel-in">
        <div className="nst-card-h">
          <span className="nst-kind"><KindGlyph kind={node.k} />{KIND_HE[node.k]}</span>
          <button type="button" className="nu-ghost nst-clear" onClick={onClear}>
            <X size={14} strokeWidth={2} aria-hidden="true" />ניקוי הבחירה · Esc
          </button>
        </div>
        <h2 className="nst-card-id nx-sap" dir="ltr">{node.l}</h2>
        {name ? <p className="nst-card-he">{name}</p> : null}

        <dl className="nst-facts">
          {node.k === "table" && node.z ? <div><dt>אזור עסקי</dt><dd>{zoneHe.get(node.z) ?? node.z}</dd></div> : null}
          {node.k === "table" ? (
            <div>
              <dt>S/4HANA</dt>
              <dd className="nst-verdict"><S4Glyph k={node.s4} />{s4Word(node.s4)}</dd>
            </div>
          ) : null}
          {node.note ? <div className="is-quote"><dt>מהבלופרינט</dt><dd>{node.note}</dd></div> : null}
          {node.fi ? <div className="is-quote"><dt>Fiori לפי הבלופרינט</dt><dd>{node.fi}</dd></div> : null}
          {node.none ? <div className="is-quote"><dt>Fiori לפי הבלופרינט</dt><dd>{node.l}</dd></div> : null}
        </dl>

        {byKind.length ? (
          <ul className="nst-chips" aria-label="קשרים לפי סוג: מעבר לרשימה">
            {byKind.map((x) => (
              <li key={x.k}>
                <button type="button" className="nst-chip" onClick={() => toSection(`nst-rel-${x.k}`)}>
                  {KIND_HE_PLURAL[x.k]} <b dir="ltr">{x.list.length}</b>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="nst-acts">
          {node.href ? (
            <a className="nu-link nst-open" href={node.href}>
              פתיחת דף הרשומה
              <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" className="nu-arw" />
            </a>
          ) : (
            <p className="nst-muted">לאובייקט זה אין דף רשומה ב-NEO.</p>
          )}
          <div className="nst-acts-row">
            <button type="button" className="nu-btn2" aria-pressed={iso} onClick={onIsolate}>
              <Focus size={14} strokeWidth={2} aria-hidden="true" />
              {iso ? "יציאה מהתמקדות · Esc" : "התמקדות בשכנות"}
            </button>
            {drawn.has(node.id) ? (
              <button type="button" className="nu-ghost" onClick={onCenter}>
                <Crosshair size={14} strokeWidth={2} aria-hidden="true" />
                מרכוז בתרשים
              </button>
            ) : null}
          </div>
        </div>

        <h3 className="nst-h3">קשרים · {rel.length}</h3>
        {byKind.length ? byKind.map((x) => (
          <section key={x.k} className="nst-rel" id={`nst-rel-${x.k}`} aria-label={KIND_HE_PLURAL[x.k]}>
            <h4 className="nst-h4"><KindGlyph kind={x.k} size={13} />{KIND_HE_PLURAL[x.k]}</h4>
            <ul>
              {x.list.map((n) => {
                const here = drawn.has(n.id);
                return (
                  <li key={n.id}>
                    <button type="button" onClick={() => onPick(n.id)}>
                      <b className="nx-sap" dir="ltr">{n.l}</b>
                      <span className="nst-rel-he">{n.he || n.en || ""}</span>
                      {!here ? <em className="nst-off">מחוץ לתצוגה{n.z ? ` · ${zoneHe.get(n.z) ?? ""}` : ""}</em> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )) : <p className="nst-muted">לאובייקט זה אין קשרים מתועדים במודול.</p>}
      </div>
    );
  }

  /* --------------------------------------------- nothing selected: explain */
  const kinds = KIND_ORDER.filter((k) => layout.nodes.some((n) => G.byId.get(n.id)?.k === k));
  const counts = KIND_ORDER.map((k) => ({ k, n: layout.nodes.filter((n) => G.byId.get(n.id)?.k === k).length })).filter((x) => x.n);
  const degree = (id: string) => [...(G.adj.get(id) || [])].filter((n) => drawn.has(n)).length;
  const hubs = [...layout.nodes].map((n) => ({ id: n.id, d: degree(n.id) })).filter((x) => x.d > 0)
    .sort((a, b) => b.d - a.d || a.id.localeCompare(b.id)).slice(0, 5);
  const objectKinds = view.objects.filter((k) => k !== "table");
  const atRest = layout.edges.filter((e) => e.kind === "in").length;
  const onHover = layout.edges.length - atRest;
  const noIdoc = view.id === "integration" && !G.g.nodes.some((n) => n.k === "idoc");

  return (
    <div className="nst-panel-in">
      <section aria-labelledby="nst-about">
        <h2 className="nst-h2" id="nst-about">{view.he}</h2>
        <p className="nst-p">{view.about}</p>
      </section>

      <section aria-labelledby="nst-read">
        <h3 className="nst-h3" id="nst-read">איך לקרוא</h3>
        <ul className="nst-list">
          {view.read.map((line) => <li key={line}>{line}</li>)}
          {layout.blocks.length ? <li>מסגרת מקווקוות ליד טבלה מרכזת את הטבלאות שקשורות רק אליה.</li> : null}
          {layout.loose.length ? <li>&quot;ללא קשר בתוך המסגרת&quot; מרכז טבלאות שאין להן קשר לטבלה אחרת במסגרת שלהן.</li> : null}
          <li>לחיצה בוחרת ומדגישה את השכנים, לחיצה כפולה מתמקדת בשכנות, ו-Esc מחזיר צעד אחד.</li>
        </ul>
      </section>

      <section aria-labelledby="nst-key">
        <h3 className="nst-h3" id="nst-key">מקרא</h3>
        <ul className="nst-legend">
          {kinds.map((k) => <li key={k}><KindGlyph kind={k} />{KIND_HE[k]}</li>)}
          <li><span className="nst-line" aria-hidden="true" />קשר בתוך מסגרת</li>
          {layout.blocks.length ? <li><span className="nst-blockkey" aria-hidden="true" />טבלאות שקשורות רק לטבלה שלידן</li> : null}
          {built.columns ? <li><span className="nst-stepkey" aria-hidden="true">1</span>מספר השלב בתהליך</li> : null}
        </ul>
        {built.verdicts ? (
          <ul className="nst-legend is-verdicts">
            {built.verdicts.map((v) => <li key={String(v.k)}><S4Glyph k={v.k} />{v.he}<b dir="ltr">{v.n}</b></li>)}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="nst-now">
        <h3 className="nst-h3" id="nst-now">במסך עכשיו</h3>
        <ul className="nst-counts">
          {counts.map((x) => <li key={x.k}><b dir="ltr">{x.n}</b>{KIND_HE_PLURAL[x.k]}{x.k === "table" ? <span className="nst-of"> מתוך {G.tables.length} במודול</span> : null}</li>)}
          <li><b dir="ltr">{layout.edges.length}</b>קשרים</li>
        </ul>
        {layout.edges.length ? (
          <p className="nst-muted">
            {atRest ? `${atRest} מהם מצוירים במנוחה; ` : "אף קשר אינו מצויר במנוחה; "}
            {onHover ? `${onHover} מופיעים כשמצביעים על כרטיס או בוחרים בו.` : "כל הקשרים מצוירים."}
          </p>
        ) : null}
        {built.columns ? (
          <p className="nst-muted">{built.columns.length} שלבים בתהליך של {mod}; {built.columns.filter((c) => !c.inGraph).length ? `${built.columns.filter((c) => !c.inGraph).map((c) => c.code).join(", ")} אינו טבלה של המודול.` : "לכל שלב יש טבלה במודול."}</p>
        ) : null}
        {noIdoc ? <p className="nst-muted">במודול זה לא מתועד IDoc.</p> : null}
        {built.noApp?.length ? <p className="nst-muted">לפי הבלופרינט, ל-{built.noApp.length} טבלאות אין יישום Fiori ייעודי.</p> : null}
        {built.without?.length ? (
          <div className="nst-without">
            <p className="nst-muted">ללא {objectKinds.map((k) => KIND_HE[k]).join(" או ")} מתועד: {built.without.length} טבלאות</p>
            <ul>
              {built.without.map((id) => (
                <li key={id}><button type="button" className="nst-pill nx-sap" dir="ltr" onClick={() => onPick(id)}>{G.byId.get(id)?.l ?? id}</button></li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {hubs.length ? (
        <section aria-labelledby="nst-hubs">
          <h3 className="nst-h3" id="nst-hubs">מוקדים · הכרטיסים עם מירב הקשרים בתרשים</h3>
          <ol className="nst-hubs">
            {hubs.map((h) => {
              const n = G.byId.get(h.id)!;
              return (
                <li key={h.id}>
                  <button type="button" onClick={() => onPick(h.id)}>
                    <KindGlyph kind={n.k} />
                    <b className="nx-sap" dir="ltr">{n.l}</b>
                    <span className="nst-rel-he">{n.he || n.en || ""}</span>
                    <em>{h.d} קשרים</em>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
