/* ============================================================================
   PROJECT NEO · THE STATUS PILL — one S/4HANA status, drawn one way.
   ----------------------------------------------------------------------------
   Every surface that names a record's S/4HANA standing — the evidence block,
   the catalog rows, the ERD inspector, the search results — renders THIS, so
   the same canonical key (lib/evidence) always comes out as the same word,
   the same colour and the same glyph (design audit S5-2 / S5-3 / ACC-3).

   The glyph is the audit's "symbol and text, not colour alone": one shape per
   reading group (S4_STATUS_READING), so a colour-blind reader tells "keeps"
   from "gone" without the legend. The tooltip is the key's own short word
   from the dictionary, never the group's name: "מוגבל" is not "משתנה" and
   "לא רלוונטי" is not "נדרש אימות". A pill with no canonical key (a trust
   level, a documentation depth) keeps the plain dot + word form.

   No React import: the file is a plain function component and the JSX
   runtime is automatic, exactly like the other shell components.
   ========================================================================== */

import { enLang } from "../lang";
import { ArrowRightLeft, Ban, Check, CircleHelp, Diff, History, Hourglass, Sparkles } from "lucide-react";
import {
  S4_STATUS_DOT, S4_STATUS_HE, S4_STATUS_READING, S4_STATUS_WORD, type S4Reading, type S4Status,
} from "@/lib/evidence/types";

const GLYPH: Record<S4Reading, typeof Check> = {
  new: Sparkles,
  keeps: Check,
  changes: Diff,
  moves: ArrowRightLeft,
  notStrategic: Hourglass,
  gone: Ban,
  past: History,
  open: CircleHelp,
};

const isStatus = (s: string | undefined): s is S4Status => !!s && Object.hasOwn(S4_STATUS_READING, s);

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
  const G = key ? GLYPH[S4_STATUS_READING[key]] : null;
  const text = label ?? (key ? S4_STATUS_HE[key] : "");
  const color = dot ?? (key ? S4_STATUS_DOT[key] : "var(--status-not-started)");
  const cls = ["nu-status", G ? "nu-status--g" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <span
      className={cls}
      style={{ "--s": color } as React.CSSProperties}
      title={title ?? (key ? S4_STATUS_WORD[key] : undefined)}
      data-status={key ?? undefined}
      lang={enLang(text)}
    >
      {G ? <G size={11} strokeWidth={2.4} aria-hidden="true" /> : null}
      {text}
    </span>
  );
}
