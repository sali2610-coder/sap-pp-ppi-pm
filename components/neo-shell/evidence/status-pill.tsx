/* ============================================================================
   PROJECT NEO · THE STATUS PILL — one S/4HANA status, drawn one way.
   ----------------------------------------------------------------------------
   Every surface that names a record's S/4HANA standing — the evidence block,
   the catalog rows, the ERD inspector, the search results — renders THIS, so
   the same canonical key (lib/evidence) always comes out as the same word,
   the same colour and the same glyph (design audit S5-2 / S5-3 / ACC-3).

   The glyph is the audit's "symbol and text, not colour alone": one shape per
   reading group (S4_STATUS_GROUP), so a colour-blind reader tells "keeps"
   from "gone" without the legend. A pill with no canonical key (a trust
   level, a documentation depth) keeps the plain dot + word form.

   No React import: the file is a plain function component and the JSX
   runtime is automatic, exactly like the other shell components.
   ========================================================================== */

import { ArrowRightLeft, Ban, Check, CircleHelp, Diff, History, Sparkles } from "lucide-react";
import {
  S4_STATUS_DOT, S4_STATUS_GROUP, S4_STATUS_HE, type S4Status, type S4StatusGroup,
} from "@/lib/evidence/types";

const GLYPH: Record<S4StatusGroup, typeof Check> = {
  new: Sparkles,
  keeps: Check,
  changes: Diff,
  moves: ArrowRightLeft,
  gone: Ban,
  past: History,
  open: CircleHelp,
};

/** Hebrew name of each reading group, for the tooltip. */
const GROUP_HE: Record<S4StatusGroup, string> = {
  new: "חדש ב-S/4HANA",
  keeps: "נשמר",
  changes: "משתנה",
  moves: "מוחלף",
  gone: "הוסר",
  past: "ECC בלבד",
  open: "נדרש אימות",
};

const isStatus = (s: string | undefined): s is S4Status => !!s && Object.hasOwn(S4_STATUS_GROUP, s);

export function StatusPill({
  status, label, dot, className, title,
}: {
  /** The canonical key. A string that is not a key is drawn as a plain pill. */
  status?: string;
  /** Defaults to the canonical Hebrew label of `status`. */
  label?: string;
  /** Defaults to the canonical dot colour of `status`. */
  dot?: string;
  className?: string;
  title?: string;
}) {
  const key = isStatus(status) ? status : null;
  const G = key ? GLYPH[S4_STATUS_GROUP[key]] : null;
  const text = label ?? (key ? S4_STATUS_HE[key] : "");
  const color = dot ?? (key ? S4_STATUS_DOT[key] : "var(--status-not-started)");
  const cls = ["nu-status", G ? "nu-status--g" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <span
      className={cls}
      style={{ "--s": color } as React.CSSProperties}
      title={title ?? (key ? GROUP_HE[S4_STATUS_GROUP[key]] : undefined)}
      data-status={key ?? undefined}
    >
      {G ? <G size={11} strokeWidth={2.4} aria-hidden="true" /> : null}
      {text}
    </span>
  );
}
