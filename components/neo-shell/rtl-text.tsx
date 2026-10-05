// A record sentence as it should read in an RTL page. Display only: the text
// itself is never changed, only how its runs are isolated.
//
//   · Every maximal Latin run ("OData API_PROCESS_ORDER_2_SRV; PP-DS/aATP",
//     "_INTERN", "MES (CO53)") is one LTR unit, so its own punctuation stays in
//     place and a multi-word phrase keeps its order. A run keeps a closing
//     bracket only when the bracket closes one the run opened, so a Hebrew
//     parenthesis around a code ("פקודת תהליך (COR1)") stays Hebrew.
//   · An arrow between Hebrew words points forward in RTL (←); an arrow inside
//     a Latin run (CRTD→REL) keeps its own direction.
//
// The parent of <Rtl> must not be a flex or grid container: there every <bdi>
// would become an item of its own and the sentence would break into lines.

import { Fragment } from "react";
import { rtlRuns } from "./rtl-runs";

export function Rtl({ s }: { s: string }) {
  return (
    <>
      {rtlRuns(s).map((r, i) =>
        r.latin
          ? <bdi key={i} dir="ltr">{r.t}</bdi>
          : <Fragment key={i}>{r.t.replace(/→/g, "←")}</Fragment>,
      )}
    </>
  );
}
