"use client";

// Project NEO · the VERBATIM SHEET.
//
// The two blueprints carry more than the table dictionary. PM also carries a
// Simplification Item List with real SAP Note ids, a SPRO configuration guide
// and a 46-row custom-code check (user exits / BAdIs). PP-PI carries a
// transaction & report directory, an implementer/Basis toolkit and a PP-vs-PP-PI
// comparison. lib/types calls all six `SAPSheet` and the extractor keeps them
// header + rows, untouched.
//
// Until this pass none of them appeared anywhere in the module workspace, which
// is exactly what the brief calls out: "EVERY important PM / PP-PI section must
// exist INSIDE the module workspace." So they are rendered here, and rendered
// the only honest way a verbatim sheet can be rendered:
//
//   · the blueprint's own column headers are the labels. Nothing is renamed.
//   · the blueprint's own row order is kept. Nothing is re-ranked.
//   · an empty cell is dropped, not filled. The row says less; it never says
//     something the sheet did not.
//   · the identity column (resolved in workspace-data.ts from the header text,
//     never from a fixed index) becomes the row's heading, so a 9-column row is
//     scannable instead of being a wall.
//
// The list opens on demand. A 46-row sheet permanently expanded is the density
// the client rejected; a 46-row sheet that cannot be reached at all is the
// incompleteness the client rejected. A disclosure is the only answer that is
// both.

import { useState } from "react";
import type { WsSheet } from "./workspace-data";

const nf = new Intl.NumberFormat("he-IL");

const FIRST = 3;

/** A cell that is a bare SAP identifier reads LTR; a Hebrew sentence does not.
 *  Decided per cell by its own content, not per column, because the blueprint
 *  mixes both inside one column (`SPRO; OIOA`, then a paragraph). */
const isCode = (s: string) => /^[A-Z0-9_\-/;.,()\s]+$/.test(s.trim()) && /[A-Z0-9]/.test(s);

export function WorkspaceSheet({ sheet, lede }: { sheet: WsSheet; lede: string }) {
  const [all, setAll] = useState(false);
  const rows = all ? sheet.rows : sheet.rows.slice(0, FIRST);

  return (
    <div className="nw-sheet">
      <p className="nw-sub-s">{lede}</p>
      <ol className="nw-sheet-l">
        {rows.map((row, i) => {
          const head = (row[sheet.keyCol] || "").trim();
          return (
            <li key={`${i}-${head}`} className="nw-sheet-r">
              <p className="nw-sheet-h">
                <span className="nw-sheet-i nw-sap" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={isCode(head) ? "nw-sap" : undefined}>{head || "–"}</span>
              </p>
              <dl className="nw-sheet-kv">
                {sheet.headers.map((h, c) => {
                  const v = (row[c] || "").trim();
                  // The ordinal column and the identity column are already the
                  // heading; an empty cell says nothing and is not printed.
                  if (!v || c === sheet.keyCol || /^מס'/.test(h)) return null;
                  return (
                    <div key={h + c}>
                      <dt>{h}</dt>
                      <dd className={isCode(v) ? "nw-sap" : undefined}>{v}</dd>
                    </div>
                  );
                })}
              </dl>
            </li>
          );
        })}
      </ol>
      {sheet.rows.length > FIRST ? (
        <button type="button" className="nu-btn2" aria-expanded={all} onClick={() => setAll((v) => !v)}>
          {all
            ? "הצגת הראשונות בלבד"
            : `הצגת כל ${nf.format(sheet.rows.length)} השורות של «${sheet.title}»`}
        </button>
      ) : null}
    </div>
  );
}
