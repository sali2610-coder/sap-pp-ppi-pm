"use client";

// The signature band of each reference directory: the directory's shape at a
// glance, built only from fields the builders already carry, and every part of
// it a way into the list below.
//
//   bapi          the business areas, ranked, BAPI and FM counted apart. A bar
//                 opens the grouped view at that area.
//   cds           the VDM route: the classic tables the views cover, the two
//                 Interface kinds, the Consumption layer and the Fiori apps.
//                 Each station is the filter it counts.
//   fiori-apps    the deployment matrix: module × On-Premise / Public Cloud.
//                 A cell selects exactly that slice.
//   enhancements  the technique ladder, classic exits → BAdI → frameworks, in
//                 the order the record itself lists them, every technique a
//                 link with its S/4HANA standing.
// The IDoc directory brings its own route from the server (the `top` slot).

import Link from "next/link";
import { useState } from "react";
import { Boxes, LayoutGrid, Puzzle, Sigma } from "lucide-react";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { RankList, Sig, fmt } from "../data/catalog-kit";
import type { RefDir, RefRow } from "./types";

export interface SigState {
  mods: string[];
  kinds: string[];
  caps: string[];
  toggleKind: (k: string) => void;
  toggleCap: (c: string) => void;
  /** Replace the module and deployment slice in one step (the Fiori matrix). */
  slice: (mods: string[], caps: string[]) => void;
  /** Open the grouped view at one group (the BAPI areas). */
  openGroup: (label: string) => void;
  onOpen: (id: string) => void;
}

export function RefSignature({ dir, s }: { dir: RefDir; s: SigState }) {
  switch (dir.id) {
    case "bapi": return <BapiAreas dir={dir} s={s} />;
    case "cds": return <CdsRoute dir={dir} s={s} />;
    case "fiori-apps": return <FioriMatrix dir={dir} s={s} />;
    case "enhancements": return <EnhLadder dir={dir} s={s} />;
    default: return null;
  }
}

/* ------------------------------------------------------------------ BAPI */

function BapiAreas({ dir, s }: { dir: RefDir; s: SigState }) {
  const [open, setOpen] = useState(false);
  const by = new Map<string, { n: number; bapi: number; fm: number }>();
  for (const r of dir.rows) {
    const k = r.group || "ללא סיווג במאגר";
    const e = by.get(k) || { n: 0, bapi: 0, fm: 0 };
    e.n++;
    if (r.kind === "BAPI") e.bapi++;
    else if (r.kind === "FM") e.fm++;
    by.set(k, e);
  }
  const areas = [...by.entries()].sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0], "he"));
  return (
    <Sig
      id="nxd-sig"
      icon={<Boxes size={15} strokeWidth={1.75} />}
      title="התחומים העסקיים"
      count={`${fmt(areas.length)} תחומים`}
      lede="אורך הפס הוא מספר הרשומות בתחום, והחלק המודגש הוא ה-BAPIs. לחיצה פותחת את התחום ברשימה."
    >
      <RankList
        label="התחומים העסקיים לפי מספר הרשומות"
        cols
        fold
        open={open}
        onToggle={() => setOpen((o) => !o)}
        moreLabel={`הצגת כל ${fmt(areas.length)} התחומים`}
        items={areas.map(([label, e]) => ({
          id: label,
          label: <Rtl s={label} />,
          n: e.n,
          part: e.bapi,
          sub: <><bdi>BAPI</bdi> {fmt(e.bapi)} · <bdi>FM</bdi> {fmt(e.fm)}</>,
          onClick: () => s.openGroup(label),
          title: `פתיחת התחום ${label} ברשימה`,
        }))}
      />
    </Sig>
  );
}

/* ------------------------------------------------------------------- CDS */

function CdsRoute({ dir, s }: { dir: RefDir; s: SigState }) {
  const covered = dir.stats.find((x) => x.i === "table");
  const cap = (id: string) => dir.caps.find((c) => c.id === id);
  const cons = cap("consumption");
  const fiori = cap("fiori");
  return (
    <Sig
      id="nxd-sig"
      icon={<Sigma size={15} strokeWidth={1.75} />}
      title="מסלול ה-VDM"
      count={`${fmt(dir.rows.length)} תצוגות`}
      lede="מהטבלאות הקלאסיות, דרך תצוגות ה-Interface, אל שכבת ה-Consumption והיישומים. כל תחנה היא סינון של הרשימה."
    >
      <ol className="nxd-route">
        {covered ? (
          <li data-side="ecc">
            <Link href="/neo/tables/" prefetch={false} className="nxd-stn">
              <b className="nx-sap">{fmt(covered.v)}</b>
              <span>{covered.l}</span>
              <em>ECC · מעבר לקטלוג הטבלאות</em>
            </Link>
          </li>
        ) : null}
        {dir.kinds.map((k) => (
          <li key={k.id} data-side="s4">
            <button type="button" className="nxd-stn" aria-pressed={s.kinds.includes(k.id)} onClick={() => s.toggleKind(k.id)}>
              <b className="nx-sap">{fmt(k.n)}</b>
              <span><Rtl s={k.he} /></span>
              <em>VDM</em>
            </button>
          </li>
        ))}
        {[cons, fiori].filter(Boolean).map((c) => (
          <li key={c!.id} data-side="s4">
            <button type="button" className="nxd-stn" aria-pressed={s.caps.includes(c!.id)} onClick={() => s.toggleCap(c!.id)}>
              <b className="nx-sap">{fmt(c!.n)}</b>
              <span><Rtl s={c!.he} /></span>
              <em>{c!.id === "fiori" ? "צריכה ביישום" : "שכבת צריכה"}</em>
            </button>
          </li>
        ))}
      </ol>
    </Sig>
  );
}

/* ----------------------------------------------------------------- Fiori */

const DEPLOY = [
  { id: "onprem", he: "On-Premise" },
  { id: "cloud", he: "Public Cloud" },
];

function FioriMatrix({ dir, s }: { dir: RefDir; s: SigState }) {
  const deploy = DEPLOY.filter((d) => dir.caps.some((c) => c.id === d.id));
  const count = (m: string | null, d: string | null) =>
    dir.rows.filter((r) => (!m || r.mods.includes(m)) && (!d || r.caps.includes(d))).length;
  const onlyMod = s.mods.length === 1 ? s.mods[0] : null;
  const onlyDep = deploy.filter((d) => s.caps.includes(d.id));
  const others = s.caps.filter((c) => !deploy.some((d) => d.id === c));
  return (
    <Sig
      id="nxd-sig"
      icon={<LayoutGrid size={15} strokeWidth={1.75} />}
      title="זמינות לפי מודול"
      count={`${fmt(dir.rows.length)} יישומים`}
      lede="כמה יישומים זמינים ב-On-Premise וכמה ב-Public Cloud, לכל מודול. תא בוחר בדיוק את החתך שלו."
    >
      <div className="nxd-mxw">
        <table className="nxd-mx">
          <caption className="nx-sr">יישומי Fiori לפי מודול ולפי סביבת הפריסה</caption>
          <thead>
            <tr>
              <th scope="col">מודול</th>
              {deploy.map((d) => (
                <th key={d.id} scope="col">
                  <button type="button" aria-pressed={s.caps.includes(d.id)} onClick={() => s.toggleCap(d.id)}>
                    <bdi>{d.he}</bdi> <b className="nx-sap">{fmt(count(null, d.id))}</b>
                  </button>
                </th>
              ))}
              <th scope="col">סה״כ</th>
            </tr>
          </thead>
          <tbody>
            {dir.mods.map((m) => (
              <tr key={m.id}>
                <th scope="row">
                  <button type="button" aria-pressed={onlyMod === m.id} onClick={() => s.slice(onlyMod === m.id ? [] : [m.id], s.caps)}>
                    <Rtl s={m.he} />
                  </button>
                </th>
                {deploy.map((d) => {
                  const n = count(m.id, d.id);
                  const on = onlyMod === m.id && onlyDep.length === 1 && onlyDep[0].id === d.id;
                  return (
                    <td key={d.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        disabled={!n}
                        aria-label={`${m.he}, ${d.he}: ${fmt(n)} יישומים`}
                        onClick={() => s.slice(on ? [] : [m.id], on ? others : [...others, d.id])}
                      >
                        <b className="nx-sap">{fmt(n)}</b>
                        <span className="nxd-mx-bar" aria-hidden="true"><i style={{ inlineSize: `${m.n ? (n / m.n) * 100 : 0}%` }} /></span>
                      </button>
                    </td>
                  );
                })}
                <td><b className="nx-sap">{fmt(m.n)}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sig>
  );
}

/* --------------------------------------------------------- Enhancements */

function EnhLadder({ dir, s }: { dir: RefDir; s: SigState }) {
  // The rungs in the order the record itself lists the techniques.
  const order: string[] = [];
  for (const r of dir.rows) if (r.kind && !order.includes(r.kind)) order.push(r.kind);
  const rung = (k: string): RefRow[] => dir.rows.filter((r) => r.kind === k);
  return (
    <Sig
      id="nxd-sig"
      icon={<Puzzle size={15} strokeWidth={1.75} />}
      title="סולם הטכניקות"
      count={`${fmt(dir.rows.length)} טכניקות`}
      lede="שלושה סוגי מנגנון, בסדר שבו הרשומה מציגה אותם. כותרת סוג מסננת את הרשימה, וכל טכניקה נפתחת לעמוד שלה; המעמד ב-S/4HANA מופיע ברשימה שמתחת."
    >
      <ol className="nxd-ladder">
        {order.map((k, i) => {
          const list = rung(k);
          return (
            <li key={k} className="nxd-rung">
              <button type="button" className="nxd-rung-h" aria-pressed={s.kinds.includes(k)} onClick={() => s.toggleKind(k)}>
                <i aria-hidden="true">{i + 1}</i>
                <span><Rtl s={k} /></span>
                <b className="nx-sap">{fmt(list.length)}</b>
              </button>
              <ul>
                {list.map((r) => (
                  <li key={r.id}>
                    <Link href={r.href} prefetch={false} onClick={() => s.onOpen(r.id)}>
                      <bdi className="nxd-rung-n">{r.name}</bdi>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Sig>
  );
}
