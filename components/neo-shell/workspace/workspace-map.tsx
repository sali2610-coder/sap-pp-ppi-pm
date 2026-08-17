"use client";

// Project NEO · the module MAP — one block, three readings of one dictionary.
//
// This replaces three separate strips that used to sit side by side under the
// hero (topic density, process chain, object classes). They were three
// competing surfaces answering the same question — "where in the module am I?"
// — so they are now three views of ONE block, switched by .nu-tab. Only one is
// on screen at a time, which is the progressive disclosure the brief asks for
// and the reason the page gets its rhythm back.
//
// Every view is also a SCOPE control for the working table below: picking a
// topic or an object class narrows the table, and the block says so once, in
// its own subtitle, instead of repeating the instruction on every row.
//
// COLOUR FORM RULE: MODULE arrives as --m and is used as tint / ring / rule /
// bar fill. OBJECT arrives as --o and is the data's own encoding — class dots
// and process markers. STATUS does not appear here.

import { useId } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, GitBranch } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import type { Zone } from "@/lib/studio-graph";
import type { WsData } from "./workspace-data";
import { Chapter, type ChapterMeta } from "./workspace-chapter";
import { useWsOrigin } from "./workspace-origin";

const nf = new Intl.NumberFormat("he-IL");

/** Which reading of the map is open. Owned by ModuleWorkspace rather than by
 *  this block, because it is part of "the view I was in" and a return has to be
 *  able to put the reader back into the one they were reading. */
export type MapView = "topics" | "flow" | "classes";
type View = MapView;

const VIEWS: { k: View; he: string }[] = [
  { k: "topics", he: "נושאים" },
  { k: "flow", he: "התהליך העסקי" },
  { k: "classes", he: "מחלקות אובייקט" },
];

export function WorkspaceMap({
  d,
  meta,
  topic,
  zone,
  view,
  onView,
  onTopic,
  onZone,
}: {
  d: WsData;
  meta: ChapterMeta;
  topic: number | null;
  zone: Zone | null;
  view: View;
  onView: (v: View) => void;
  onTopic: (idx: number) => void;
  onZone: (z: Zone) => void;
}) {
  const uid = useId();
  const origin = useWsOrigin();

  const flowGaps = d.flow.filter((s) => !s.exists).length;
  const maxZone = Math.max(1, ...d.zones.map((z) => z.n));
  const count: Record<View, number> = {
    topics: d.counts.topics,
    flow: d.flow.length,
    classes: d.zones.length,
  };

  return (
    <Chapter
      meta={meta}
      icon={<Compass size={17} strokeWidth={1.75} />}
      lede={
        <>
          לפי נושא, לפי שלב בתהליך, או לפי מחלקת אובייקט — שלוש קריאות של אותו מילון. בחירה כאן מצמצמת
          את טבלת העבודה בפרק הבא, ולא פותחת מסך נוסף.
        </>
      }
      lead={
        <Link className="nu-link" href="/neo/erd/" prefetch={false}>
          תרשים ה-ER המלא של הפרויקט
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      }
    >
      <div className="nw-tabs" role="tablist" aria-label="תצוגת מפת המודול">
        {VIEWS.map((v) => (
          <button
            key={v.k}
            type="button"
            role="tab"
            id={`${uid}-t-${v.k}`}
            className="nu-tab"
            aria-selected={view === v.k}
            aria-controls={`${uid}-p-${v.k}`}
            onClick={() => onView(v.k)}
          >
            {v.he}
            <em className="nw-sap">{nf.format(count[v.k])}</em>
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------ topics */}
      {view === "topics" ? (
        <div className="nw-view" role="tabpanel" id={`${uid}-p-topics`} aria-labelledby={`${uid}-t-topics`}>
          <ul className="nw-rank">
            {d.topics.map((t) => (
              <li key={t.idx}>
                <button
                  type="button"
                  className="nu-card nw-rankrow"
                  data-on={topic === t.idx ? "1" : undefined}
                  aria-pressed={topic === t.idx}
                  onClick={() => onTopic(t.idx)}
                >
                  <span className="nw-rank-i nw-sap">{String(t.idx).padStart(2, "0")}</span>
                  <span className="nw-rank-t">{t.title}</span>
                  {/* MODULE as a bar fill — a line/surface, never a dot. Its
                      length is the topic's tables against the largest topic. */}
                  <span className="nw-bar" aria-hidden="true">
                    <i style={{ "--p": t.tables / d.maxTopicTables } as React.CSSProperties} />
                  </span>
                  <span className="nw-rank-n nw-sap">
                    {nf.format(t.tables)}
                    <em>טבלאות · {nf.format(t.fields)} שדות</em>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="nw-fine">
            אורך הפס הוא מספר הטבלאות בנושא מול הנושא הרחב ביותר במודול, שמחזיק {nf.format(d.maxTopicTables)} טבלאות.
          </p>
        </div>
      ) : null}

      {/* -------------------------------------------------------------- flow */}
      {view === "flow" ? (
        <div className="nw-view" role="tabpanel" id={`${uid}-p-flow`} aria-labelledby={`${uid}-t-flow`}>
          <ol className="nw-chain">
            {d.flow.map((s) => (
              <li key={s.code} style={{ "--o": s.obj } as React.CSSProperties}>
                {s.href ? (
                  <OriginLink
                    className="nu-card nw-steprow"
                    href={s.href}
                    origin={() => origin(s.code)}
                  >
                    <i className="nw-cls" aria-hidden="true" />
                    <b className="nw-sap">{s.code}</b>
                    <span className="nw-step-he">{s.label}</span>
                    <em className="nw-sap">
                      {nf.format(s.f ?? 0)} שדות · {nf.format(s.rel)} קשרים
                    </em>
                    <ArrowLeft className="nu-arw nw-steparw" size={14} strokeWidth={2} aria-hidden="true" />
                  </OriginLink>
                ) : (
                  // A real process step the module's dictionary does not
                  // document. It is drawn as a gap, never as a node with
                  // invented numbers, and it is not a link to nowhere.
                  <div className="nw-steprow nw-steprow--gap">
                    <i className="nw-cls" aria-hidden="true" />
                    <b className="nw-sap">{s.code}</b>
                    <span className="nw-step-he">{s.label}</span>
                    <em>לא במילון של המודול</em>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="nw-fine">
            שרשרת התהליך מגיעה ממפת התהליכים של הפרויקט. {nf.format(d.flow.length)} שלבים,{" "}
            {flowGaps === 0
              ? "כולם מתועדים במילון של המודול"
              : `${nf.format(flowGaps)} מהם ללא טבלה במילון של המודול`}
            . שלב מתועד נפתח בעמוד האובייקט המלא שלו.
          </p>
        </div>
      ) : null}

      {/* ----------------------------------------------------------- classes */}
      {view === "classes" ? (
        <div className="nw-view" role="tabpanel" id={`${uid}-p-classes`} aria-labelledby={`${uid}-t-classes`}>
          <ul className="nw-rank">
            {d.zones.map((z) => (
              <li key={z.id} style={{ "--o": z.obj } as React.CSSProperties}>
                <button
                  type="button"
                  className="nu-card nw-rankrow nw-rankrow--obj"
                  data-on={zone === z.id ? "1" : undefined}
                  aria-pressed={zone === z.id}
                  onClick={() => onZone(z.id)}
                >
                  <i className="nw-cls" aria-hidden="true" />
                  <span className="nw-rank-t">{z.he}</span>
                  <span className="nw-bar nw-bar--obj" aria-hidden="true">
                    <i style={{ "--p": z.n / maxZone } as React.CSSProperties} />
                  </span>
                  <span className="nw-rank-n nw-sap">
                    {nf.format(z.n)}
                    <em>טבלאות</em>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="nw-fine">
            המחלקה נגזרת משם הטבלה באותה מפה שממנה נבנים גם ה-ERD ועמוד הבית, כך שטבלה מסווגת אותו דבר בכל
            המערכת. {nf.format(d.counts.tables)} טבלאות ייחודיות מחולקות ל-{nf.format(d.zones.length)} מחלקות.
          </p>
        </div>
      ) : null}

      <p className="nw-links">
        <Link className="nu-link" href="/neo/erd/" prefetch={false}>
          מודל התחומים
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
        <Link className="nu-link" href="/neo/tables/" prefetch={false}>
          <GitBranch size={13} strokeWidth={1.75} aria-hidden="true" />
          מילון הטבלאות של הפרויקט
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </p>
    </Chapter>
  );
}
