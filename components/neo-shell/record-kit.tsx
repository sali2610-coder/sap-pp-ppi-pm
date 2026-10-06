// Project NEO · the record kit (2026-10) — what the record pages share, so a
// table, a transaction, a BAPI, a concept, an incident, a practice and a work
// topic read as one product with the catalogs they are opened from.
//
//   RecordHead   the identity: the catalog hero's eyebrow, the record's name
//                (an SAP id in its own face and direction, or a Hebrew name),
//                its other names, a lede, the status line and an optional
//                verdict, on the scene's own ground (no card, no stripe).
//
// The ledger (Ledger), the section bands (Sig) and the foot with the credit
// (CatalogFoot) are the catalog kit's own (./data/catalog-kit.tsx). Presentational
// only: no state, no data access; a server component.

import type { ReactNode } from "react";
import { CopyId } from "./copy-id";

/** A record's eyebrow is "<kind> · <module…>" ("טרנזקציה · PM", "BAPI · PM ·
 *  PP-PI", "יישום Fiori · PM · תחזוקת מפעל"): the kind, then the rest after the
 *  catalog hero's short rule. The rest is marked English only when it has no
 *  Hebrew in it. */
function splitEyebrow(s: string): [string, string, boolean] {
  const i = s.indexOf(" · ");
  if (i < 0) return [s, "", false];
  const rest = s.slice(i + 3);
  return [s.slice(0, i), rest, !/[֐-׿]/.test(rest)];
}

/** "ביצוע · PM · PP-PI": each Latin token its own LTR isolate, so an RTL
 *  reader meets the tokens in their written order. */
function isolate(rest: string): ReactNode {
  return rest.split(" · ").map((t, i) => (
    <span key={i}>
      {i ? " · " : null}
      {/[֐-׿]/.test(t) ? t : <bdi dir="ltr">{t}</bdi>}
    </span>
  ));
}

export function RecordHead({
  icon, eyebrow, title, mono, sub, copy, copyLabel, he, en, enAbsent, lede, meta, verdict, actions, children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  /** The title is an SAP id: its own face, LTR, with the copy control. */
  mono?: boolean;
  /** The SAP id under a Hebrew title (a Fiori app's business name leads). */
  sub?: string;
  copy?: string;
  copyLabel?: string;
  he?: ReactNode;
  en?: string;
  enAbsent?: string;
  lede?: ReactNode;
  meta?: ReactNode;
  verdict?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const [eyeKind, eyeRest, restLatin] = splitEyebrow(eyebrow);
  return (
    <header className="nxd-hero nrc-hero nm-rise nm-once">
      <p className="nxd-eye">
        {icon}
        <span>{eyeKind}</span>
        {eyeRest ? <><i aria-hidden="true" />{restLatin ? <bdi dir="ltr" lang="en">{eyeRest}</bdi> : <span>{isolate(eyeRest)}</span>}</> : null}
      </p>
      {/* The name, its other names, then the record's actions: the reading
          order on a phone. Where there is room the actions sit beside the
          name (record.css, .nrc-top). */}
      <div className="nrc-top" data-acts={actions ? "1" : undefined}>
        <div className="nrc-id">
          {mono
            ? <h1 className="nrc-code nx-sap">{title}</h1>
            : <h1 className="nx-h1 nxd-h1">{title}</h1>}
          {sub ? <span className="nrc-sub">{sub}</span> : null}
          {copy ? <CopyId value={copy} label={copyLabel || "העתקת המזהה הטכני"} compact /> : null}
        </div>
        {he || en || enAbsent ? (
          <div className="nrc-names">
            {he ? <p className="nrc-he">{he}</p> : null}
            {en
              ? <p className="nrc-en" dir="ltr">{en}</p>
              : enAbsent ? <p className="nrc-en nrc-absent">{enAbsent}</p> : null}
          </div>
        ) : null}
        {actions ? <div className="nrc-acts">{actions}</div> : null}
      </div>
      {lede ? <p className="nx-lede nxd-lede">{lede}</p> : null}
      {meta ? <div className="nrc-meta">{meta}</div> : null}
      {verdict ? <p className="nrc-verdict">{verdict}</p> : null}
      {children}
    </header>
  );
}
