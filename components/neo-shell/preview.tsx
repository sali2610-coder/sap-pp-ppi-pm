"use client";

// The hover preview layer.
//
// Deliberately NOT a tooltip: it answers "what is actually in there" with real
// project records — real table names, real field counts, the real last object
// this user opened — so hovering the navigation is already a form of reading.
// Every number arrives pre-computed from the dataset; nothing here is derived
// in the browser, and nothing is invented when the dataset has no answer.

import { Ico } from "./icon";
import type { ModulePreview, PlainPreview, Preview } from "./types";

const nf = new Intl.NumberFormat("he-IL");

/** ASCII-only strings are SAP identifiers (MARA, IW31, I_Product) and belong in
 *  the mono LTR treatment. Anything carrying Hebrew is a title and must not. */
export const isTechnical = (s: string) => /^[\x20-\x7E]+$/.test(s);

function ModuleBody({ p, last }: { p: ModulePreview; last: { name: string; when: string } | null }) {
  return (
    <div className="nx-pv nx-pv--mod" style={{ "--m": `var(--mod-${p.mod === "PM" ? "pm" : "pppi"})` } as React.CSSProperties}>
      <header>
        <i aria-hidden="true" />
        <b>{p.label}</b>
        <span>{p.he}</span>
      </header>
      <div className="nx-pv-nums">
        {p.nums.map((n) => (
          <span key={n.label}><b>{nf.format(n.value)}</b>{n.label}</span>
        ))}
      </div>
      <ul className="nx-pv-list">
        {/* object hue, not module hue — the class dot is a visualisation encoding */}
        {p.tables.map((t) => (
          <li key={t.name} style={{ "--o": t.obj } as React.CSSProperties}>
            <span className="nx-pv-cls" aria-hidden="true" />
            <span className="nx-sap">{t.name}</span>
            <span>{t.he}</span>
            <em>{t.fields}</em>
          </li>
        ))}
      </ul>
      {last ? (
        <p className="nx-pv-last">
          <Ico name="History" size={11} />
          אחרון שנפתח: <span className="nx-sap">{last.name}</span>{last.when ? ` · ${last.when}` : ""}
        </p>
      ) : null}
      <p className="nx-pv-f">{p.book || "אין ספר משויך"}</p>
    </div>
  );
}

function PlainBody({ p }: { p: PlainPreview }) {
  return (
    <div className="nx-pv">
      <header>
        <i aria-hidden="true" />
        <b>{p.label}</b>
        <span>{p.group}</span>
      </header>
      <div className="nx-pv-nums">
        {p.count !== null ? (
          <span><b>{nf.format(p.count)}</b>{p.countLabel}</span>
        ) : (
          /* The honest state. A guessed number here would be indistinguishable
             from a real one, which is exactly why it is never printed. */
          <span className="nx-pv-none"><b>—</b>אין ספירה מגובה בנתוני הפרויקט</span>
        )}
      </div>
      {p.sample.length ? (
        <ul className="nx-pv-list nx-pv-list--flat">
          {/* Mono + LTR is for technical identifiers only. A Hebrew title forced
              into direction:ltr reads backwards, so the sample decides per row. */}
          {p.sample.map((x) => <li key={x}><span className={isTechnical(x) ? "nx-sap" : undefined}>{x}</span></li>)}
        </ul>
      ) : null}
    </div>
  );
}

export function PreviewPanel({ preview, last }: { preview: Preview; last: { name: string; when: string } | null }) {
  return preview.kind === "module"
    ? <ModuleBody p={preview} last={last} />
    : <PlainBody p={preview} />;
}
