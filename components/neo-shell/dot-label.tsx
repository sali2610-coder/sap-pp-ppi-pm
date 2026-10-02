import { Fragment } from "react";

/* A dotted label ("PM · תחזוקת מפעל", "מודל הנתונים · ERD") rendered as its
   parts, the separator in a span of its own and the spaces outside it. The
   text is unchanged everywhere; the Editorial pilot (editorial.css) sets a
   Latin code part as a plate and drops the dot beside it (brand QA,
   2026-10-02). */
const CODE = /^[A-Z][A-Z0-9 /-]*$/;

export function DotLabel({ label }: { label: string }) {
  const parts = label.split(" · ");
  if (parts.length < 2) return <>{label}</>;
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 ? (
            <>
              {" "}
              <span className="nx-sep" data-code={CODE.test(p) || CODE.test(parts[i - 1]) || undefined}>·</span>
              {" "}
            </>
          ) : null}
          <span className={CODE.test(p) ? "nx-code-part" : undefined}>{p}</span>
        </Fragment>
      ))}
    </>
  );
}
