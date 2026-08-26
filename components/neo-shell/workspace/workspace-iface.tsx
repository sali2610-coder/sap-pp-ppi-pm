"use client";

// Project NEO · WHAT TALKS TO THE MODULE — interfaces, CDS views, Fiori apps.
//
// Until this pass these three lived as three numbers in the hero and nowhere
// else: the workspace could tell you PM has 95 interface entries and never show
// you one of them. That is precisely the incompleteness the brief calls out, so
// all three are records now.
//
//   INTERFACES  every BAPI / FM / IDoc the dictionary names, ranked by REACH —
//               how many of the module's tables name it. The kind is
//               lib/object-intel's classifier and is labelled as derived, not
//               asserted. The name is normalised the same way the object pages
//               normalise it, so "95 entries" and "N objects" are both shown
//               with their own label instead of one standing in for the other.
//   CDS         data/cds-map is a curated classic-table -> released-view map.
//               A view appears only when one of THIS module's tables is in it.
//   FIORI       the successor app exactly as the blueprint names it, including
//               the blueprint's own "(אמת ID)" caveat where it wrote one. That
//               caveat is data and is not cleaned away.
//
// Every identifier is a .nu-chip or plain mono text — a VALUE. The project has
// no /neo destination for a single BAPI or a single CDS view, so the chapter
// carries three real registry routes instead of hundreds of dead pills.

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cable, LayoutGrid, Sigma } from "lucide-react";
import type { WsData } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";

const nf = new Intl.NumberFormat("he-IL");

const FIRST = 8;

const KIND_ROUTE: Record<string, string> = {
  BAPI: "/neo/bapi/",
  FM: "/neo/bapi/",
  IDoc: "/neo/idoc/",
};

export function WorkspaceIface({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const [allFn, setAllFn] = useState(false);
  const [allCds, setAllCds] = useState(false);
  const [allApp, setAllApp] = useState(false);

  const fns = allFn ? d.ifaces : d.ifaces.slice(0, FIRST);
  const cds = allCds ? d.cds : d.cds.slice(0, FIRST);
  const apps = allApp ? d.fiori : d.fiori.slice(0, FIRST);

  return (
    <Chapter
      meta={meta}
      icon={<Cable size={17} strokeWidth={1.75} />}
      lede={
        <>
          <b className="nw-sap">{nf.format(d.counts.funcEntries)}</b> רשומות ממשק במילון, שמצטמצמות
          ל-<b className="nw-sap">{nf.format(d.counts.funcObjects)}</b> אובייקטים אחרי נרמול השמות.
          לצידן <b className="nw-sap">{nf.format(d.counts.cds)}</b> תצוגות CDS ו-
          <b className="nw-sap">{nf.format(d.counts.fiori)}</b> אפליקציות Fiori שהתכנון מציין בשם.
        </>
      }
      lead={
        <Link className="nu-btn2" href="/neo/bapi/" prefetch={false}>
          <Cable size={15} strokeWidth={1.75} aria-hidden="true" />
          מרשם ה-BAPI וה-FM של הפרויקט
        </Link>
      }
    >
      {/* ------------------------------------------------------- interfaces */}
      <Sub
        id={`${meta.id}-fn`}
        icon={<Cable size={13} strokeWidth={1.75} />}
        title="BAPI · FM · IDoc"
        note={`מדורג לפי כמה מטבלאות המודול רושמות את האובייקט. הפילוח לסוגים: ${nf.format(d.counts.bapis)} BAPI · ${nf.format(d.counts.fms)} FM · ${nf.format(d.counts.idocs)} IDoc. הסיווג נגזר משם האובייקט ולא נכתב במקור.`}
      >
        {d.ifaces.length ? (
          <>
            <ul className="nw-fnlist">
              {fns.map((f) => (
                <li key={f.n}>
                  <span className="nw-kind nw-sap">{f.k}</span>
                  <b className="nw-sap">{f.n}</b>
                  <span className="nw-fn-he">{f.he || "המילון אינו מחזיק תיאור לרשומה הזאת."}</span>
                  <em className="nw-sap">
                    {nf.format(f.tables)}
                    <span>טבלאות</span>
                  </em>
                </li>
              ))}
            </ul>
            {d.ifaces.length > FIRST ? (
              <button type="button" className="nu-btn2" aria-expanded={allFn} onClick={() => setAllFn((v) => !v)}>
                {allFn ? "הצג רק את הראשונים" : `הצג את כל ${nf.format(d.ifaces.length)} אובייקטי הממשק`}
              </button>
            ) : null}
            <p className="nw-links">
              <Link className="nu-link" href={KIND_ROUTE.BAPI} prefetch={false}>
                מרשם BAPI / FM
                <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
              {d.counts.idocs ? (
                <Link className="nu-link" href={KIND_ROUTE.IDoc} prefetch={false}>
                  מרשם ה-IDoc
                  <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              ) : null}
            </p>
          </>
        ) : (
          <p className="nw-fine">המילון של המודול אינו מחזיק אובייקטי ממשק.</p>
        )}
      </Sub>

      {/* -------------------------------------------------------------- CDS */}
      <Sub
        id={`${meta.id}-cds`}
        icon={<Sigma size={13} strokeWidth={1.75} />}
        title="תצוגות CDS מעל טבלאות המודול"
        note="מיפוי מתוחזק של טבלה קלאסית לתצוגת CDS משוחררת ב-S/4HANA. תצוגה מופיעה רק כשאחת מטבלאות המודול נמצאת בה."
      >
        {d.cds.length ? (
          <>
            <ul className="nw-cdslist">
              {cds.map((v) => (
                <li key={v.view}>
                  <b className="nw-sap">{v.view}</b>
                  <span className="nw-fn-he">{v.he}</span>
                  <span className="nw-cds-t">
                    {v.tables.map((t) => (
                      <span key={t} className="nu-chip is-sap">{t}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            {d.cds.length > FIRST ? (
              <button type="button" className="nu-btn2" aria-expanded={allCds} onClick={() => setAllCds((v) => !v)}>
                {allCds ? "הצג רק את הראשונות" : `הצג את כל ${nf.format(d.cds.length)} התצוגות`}
              </button>
            ) : null}
            <Link className="nu-link" href="/neo/cds/" prefetch={false}>
              מרשם ה-CDS המלא
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </>
        ) : (
          <p className="nw-fine">אין תצוגת CDS ממופה לטבלאות המודול הזה.</p>
        )}
      </Sub>

      {/* ------------------------------------------------------------ Fiori */}
      <Sub
        id={`${meta.id}-fiori`}
        icon={<LayoutGrid size={13} strokeWidth={1.75} />}
        title="אפליקציות Fiori שהתכנון מציין"
        note="השם מוצג כפי שנכתב בגיליון, כולל הסתייגות «אמת ID» היכן שהמקור עצמו רשם אותה. ההסתייגות היא נתון ולא רעש, ולכן אינה מנוקה."
      >
        {d.fiori.length ? (
          <>
            <ul className="nw-applist">
              {apps.map((a) => (
                <li key={a.app}>
                  <b className="nw-sap">{a.app}</b>
                  <span className="nw-cds-t">
                    {a.tables.map((t) => (
                      <span key={t} className="nu-chip is-sap">{t}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            {d.fiori.length > FIRST ? (
              <button type="button" className="nu-btn2" aria-expanded={allApp} onClick={() => setAllApp((v) => !v)}>
                {allApp ? "הצג רק את הראשונות" : `הצג את כל ${nf.format(d.fiori.length)} האפליקציות`}
              </button>
            ) : null}
            <Link className="nu-link" href="/neo/fiori-apps/" prefetch={false}>
              מרשם ה-Fiori של הפרויקט
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </>
        ) : (
          <p className="nw-fine">התכנון של המודול הזה אינו מציין אפליקציית Fiori לאף טבלה.</p>
        )}
      </Sub>
    </Chapter>
  );
}
