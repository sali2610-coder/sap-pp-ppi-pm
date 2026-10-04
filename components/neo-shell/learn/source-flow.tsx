import type { FlowStep } from "@/data/library/pp-textbook/types";
import { CodeCopy } from "./code-copy";

export function SourceFlow({ steps }: { steps: FlowStep[] }) {
  return <ol className="nxa-source-flow">{steps.map((s, i) => <li key={i}>
    <span className="nxa-step-n" aria-hidden="true">{i + 1}</span>
    <div><p dir="auto">{s.he}</p>{s.code ? <p><bdi dir="auto" className="nx-sap">{s.code}</bdi><CodeCopy code={s.code} /></p> : null}
      {s.note ? <p className="nx-muted" dir="auto">{s.note}</p> : null}</div>
  </li>)}</ol>;
}

