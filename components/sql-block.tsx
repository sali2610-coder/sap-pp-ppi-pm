"use client";

import { useMemo } from "react";
import { CopyButton } from "@/components/copy-button";

// Pseudo syntax-highlight for SQL — pure CSS spans, no external highlighter
// (offline). Highlights keywords / identifiers / strings without a parser.
const KEYWORDS =
  /\b(SELECT|FROM|JOIN|LEFT|RIGHT|INNER|OUTER|ON|WHERE|AND|OR|AS|GROUP BY|ORDER BY|HAVING|UNION|INSERT|UPDATE|DELETE|SET|VALUES|DISTINCT|COUNT|SUM|MAX|MIN|AVG|IN|NOT|NULL|LIKE|BETWEEN)\b/gi;

function highlight(line: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  KEYWORDS.lastIndex = 0;
  while ((m = KEYWORDS.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    out.push(
      <span key={`${m.index}-k`} className="font-semibold text-[#569cd6]">
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export function SqlBlock({ code }: { code: string }) {
  const lines = useMemo(() => code.split("\n"), [code]);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-[#1e1e2e] shadow-lg shadow-slate-900/20">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-slate-700/50 bg-[#181825] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f56]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" />
          <span className="tech ms-2 text-[11px] text-slate-400">SQL · JOIN</span>
        </div>
        <CopyButton text={code} label="העתק" />
      </div>
      {/* code */}
      <div className="overflow-x-auto">
        <pre className="tech p-4 text-xs leading-relaxed text-[#d4d4d4]">
          {lines.map((ln, i) => (
            <div key={i} className="flex gap-3">
              <span className="select-none text-slate-600">{String(i + 1).padStart(2, " ")}</span>
              <span className="whitespace-pre">{highlight(ln)}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
