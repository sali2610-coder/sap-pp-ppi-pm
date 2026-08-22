/* ============================================================================
   PROJECT NEO · THE THREE POPULATIONS, AS TABLES
   ----------------------------------------------------------------------------
   WHY THIS REPLACES THE DOT FIELD

     The membership story — 37 PM-only, 19 shared, 49 PP-PI-only — was drawn as
     105 circles joined by hairlines. Every mark was true, and the picture still
     failed: a reader had to COUNT to learn anything, and the first impression
     of the product's most important page was "a site about dots".

     A table is not a circle. It has a name, a Hebrew meaning, a field count and
     a class, and those are the things a consultant actually recognises. So the
     scene is drawn as what it is: three populations of NAMED TABLES, each in
     its own colour world, with the count stated once in type large enough to
     read rather than implied by a quantity of dots.

   WHAT IS ON SCREEN IS WHAT IS IN THE DICTIONARY

     name        the table's real SAP identifier, LTR-isolated inside RTL
     meaning     the dictionary's own Hebrew line, never paraphrased
     fields      its documented field count
     class       its functional zone, as a colour
     count       the full population of the band, not the number of cards shown

     The cards shown are the most connected members of each band, and the
     remainder is stated plainly rather than hidden — "+22 נוספות" is part of
     the truth, not a UI convenience. Nothing here is invented: if the
     dictionary has no Hebrew for a table, the card shows the name alone.
   ========================================================================== */

import type { HomeDot } from "./home-data";
import { ZONE_HE, zoneVar } from "./home-data";

const BAND_LABEL: Record<0 | 1 | 2, { he: string; sub: string }> = {
  0: { he: "PM בלבד", sub: "אחזקת מפעל" },
  1: { he: "ליבה משותפת", sub: "שני המודולים" },
  2: { he: "PP-PI בלבד", sub: "ייצור תהליכי" },
};

/** One table, as an object a consultant recognises.
 *
 *  HOVER SAYS WHAT THE MARK IS. The field count and the class colour are
 *  legible but not self-explaining — "6" and a teal bar do not announce
 *  themselves. The title carries the full reading in the dictionary's own
 *  terms, so the card can stay compact without becoming a puzzle. Native
 *  `title` rather than a custom tooltip on purpose: it works on keyboard
 *  focus, it works for assistive tech, and it costs no JavaScript on the
 *  product's heaviest page. */
function TableCard({ d, dim = false }: { d: HomeDot; dim?: boolean }) {
  const zone = ZONE_HE[d.z] || d.z;
  const rel = d.r === 0 ? "אין קשר ER ממודל" : `${d.r} קשרי ER`;
  const tc = d.t === 0 ? "ללא טרנזקציה ממופה" : `${d.t} טרנזקציות`;
  return (
    <li
      className="nz-card"
      data-dim={dim ? "1" : "0"}
      style={{ "--z": zoneVar(d.z) } as React.CSSProperties}
      title={`${d.n}${d.he ? ` · ${d.he}` : ""}\n${zone} · ${d.f} שדות מתועדים · ${rel} · ${tc}`}
    >
      <i className="nz-card-z" aria-hidden="true" />
      <b className="nz-card-n nx-sap" dir="ltr">{d.n}</b>
      {d.he ? <em className="nz-card-he">{d.he}</em> : null}
      <span className="nz-card-f nx-sap">{d.f}</span>
    </li>
  );
}

export function HomeZones({
  dots,
  show = 8,
  bands = [0, 1, 2],
  className = "",
}: {
  dots: HomeDot[];
  /** Cards printed per band. The rest is COUNTED, never dropped silently. */
  show?: number;
  bands?: readonly (0 | 1 | 2)[];
  className?: string;
}) {
  const byBand = (b: 0 | 1 | 2) =>
    dots.filter((d) => d.b === b).sort((x, y) => y.r - x.r || y.f - x.f || x.n.localeCompare(y.n));

  return (
    <div className={`nz ${className}`} data-bands={bands.length}>
      {bands.map((b) => {
        const all = byBand(b);
        const head = all.slice(0, show);
        const rest = all.length - head.length;
        return (
          <section className="nz-zone" key={b} data-band={b} aria-label={`${BAND_LABEL[b].he}: ${all.length} טבלאות`}>
            <header className="nz-head">
              <span className="nz-count nx-sap">{all.length}</span>
              <span className="nz-lbl">
                <b>{BAND_LABEL[b].he}</b>
                <em>{BAND_LABEL[b].sub}</em>
              </span>
            </header>
            <ul className="nz-list">
              {head.map((d) => (
                <TableCard key={d.n} d={d} />
              ))}
            </ul>
            {rest > 0 ? (
              <p className="nz-rest">
                <span className="nx-sap">+{rest}</span> נוספות בקבוצה הזאת
              </p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
