import { ShieldCheck, ShieldAlert, ShieldX, Tag } from "lucide-react";
import { TRUST_META, SOURCE_HE, type Trust } from "@/lib/trust";

const ICON = { GREEN: ShieldCheck, YELLOW: ShieldAlert, RED: ShieldX } as const;

export function TrustBadge({ trust }: { trust: Trust }) {
  const m = TRUST_META[trust.level];
  const I = ICON[trust.level];
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" dir="rtl">
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ color: m.color, background: m.bg }}>
        <I className="size-3.5" />{trust.level} · {m.he}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
        <Tag className="size-3" />{SOURCE_HE[trust.source]}
      </span>
    </span>
  );
}
