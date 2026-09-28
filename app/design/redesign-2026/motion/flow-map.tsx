"use client";
/* Signature prototype 1: the process map draws itself in the order of the process.
   Each chain is a real FlowChain from homeData(): table after table, with the hop the
   dictionary models (direct, or through one intermediate table). A table the
   dictionary lacks is drawn hollow and says so. Pure CSS motion (transform/opacity);
   reduced motion shows the finished map at once. Replay remounts the lanes. */
import { useState } from "react";
import { RotateCcw } from "lucide-react";

export interface LabStep {
  code: string;
  label: string;
  exists: boolean;
  link: { card: string; via?: string | null } | null;
}
export interface LabChain {
  key: string;
  he: string;
  code: string;
  steps: LabStep[];
}

export function FlowMap({ chains }: { chains: LabChain[] }) {
  const [run, setRun] = useState(0);
  return (
    <div className="fm">
      <div className="fm-bar">
        <button type="button" className="ml-btn" onClick={() => setRun((n) => n + 1)}>
          <RotateCcw size={16} aria-hidden />
          <span>הפעל שוב</span>
        </button>
        <span className="fm-legend">
          <span className="fm-key fm-key--direct" aria-hidden /> קשר ישיר במילון
          <span className="fm-key fm-key--via" aria-hidden /> דרך טבלת ביניים
          <span className="fm-key fm-key--missing" aria-hidden /> לא במילון
        </span>
      </div>
      <div key={run} className="fm-lanes">
        {chains.map((c) => (
          <section key={c.key} className="fm-chain" aria-label={`תהליך ${c.he}`} data-mod={c.key} tabIndex={0}>
            <h3 className="fm-title">
              <bdi className="fm-mod">{c.code}</bdi> {c.he}
            </h3>
            <ol className="fm-lane">
              {c.steps.map((s, i) => (
                <li key={s.code} className="fm-step" style={{ ["--i" as string]: i }}>
                  <span className={`fm-node${s.exists ? "" : " fm-node--missing"}`}>
                    <bdi className="fm-code">{s.code}</bdi>
                    <span className="fm-label">{s.label}</span>
                    {!s.exists && <span className="fm-note">לא במילון</span>}
                  </span>
                  {i < c.steps.length - 1 && (
                    <span className={`fm-link${s.link?.via ? " fm-link--via" : ""}`}>
                      <span className="fm-sr">{s.link ? (s.link.via ? `קשר דרך ${s.link.via}` : "קשר ישיר") : "אין קשר מתועד"}</span>
                      <span className="fm-line" aria-hidden />
                      {s.link?.card ? <bdi className="fm-card">{s.link.card}</bdi> : null}
                      {s.link?.via ? <span className="fm-via">דרך <bdi>{s.link.via}</bdi></span> : null}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
