"use client";

/**
 * Project NEO — deterministic book identity system.
 * Pure-CSS, 100% offline (no images/fonts): every book gets a premium editorial
 * cover + a physical shelf spine generated from its metadata alone
 * (module → cloth color, title → foil, publisher → foot, pages → spine width).
 * Reusable across the whole Library (home shelf, landing hero, resume card).
 */

export const MODULE_COLORS: Record<string, string> = {
  PP: "#d62027", PM: "#f97316", "PP-PI": "#6d28d9", QM: "#059669",
  MM: "#d97706", WM: "#7c3aed", IBP: "#0891b2", Fiori: "#db2777", Foundation: "#475569",
};
export const moduleColor = (m?: string) => (m && MODULE_COLORS[m]) || "#64748b";

/* darker "cloth" base so the module hue reads as bound book fabric, not a flat swatch */
const cloth = (c: string) =>
  `radial-gradient(130% 120% at 82% -8%, color-mix(in srgb, ${c} 92%, #fff) 0%, ${c} 34%, color-mix(in srgb, ${c} 62%, #0b0c0e) 100%)`;

export interface CoverBook {
  title: string;        // Hebrew title (hero)
  titleEn?: string;
  module: string;
  publisher?: string;
  pages?: number;
  chapters?: number;
}

/* ============================ FACE-OUT COVER ============================ */
/* Editorial portrait cover (aspect 3:4). Title is the hero, set in foil. */
export function BookCover({ book, className = "", size = "md" }: { book: CoverBook; className?: string; size?: "sm" | "md" | "lg" }) {
  const c = moduleColor(book.module);
  const glyph = (book.module || "SAP").slice(0, 3).toUpperCase();
  const titleClamp = size === "lg" ? "text-[clamp(1.15rem,1.1rem+0.9vw,1.9rem)]" : size === "sm" ? "text-[13px]" : "text-[clamp(0.95rem,0.9rem+0.4vw,1.25rem)]";
  return (
    <div
      dir="rtl"
      aria-label={`${book.title}${book.publisher ? " · " + book.publisher : ""}`}
      className={`neo-cover group/cover relative aspect-[3/4] w-full select-none overflow-hidden rounded-l-[6px] rounded-r-[3px] text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.6)] ${className}`}
      style={{ background: cloth(c)}}
    >
      {/* binding (spine) on the RTL right edge */}
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[7%] min-w-[7px] bg-gradient-to-l from-black/35 via-black/10 to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-[7%] w-px bg-white/25" />
      {/* fore-edge pages on the RTL left */}
      <span className="pointer-events-none absolute inset-y-[3%] left-0 w-[3px] rounded-s-sm bg-gradient-to-r from-white/70 to-white/10" />
      {/* head sheen */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/22 to-transparent" />
      {/* diagonal foil glint on hover */}
      <span className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-700 group-hover/cover:opacity-100" />
      {/* big watermark module glyph */}
      <span className="pointer-events-none absolute -bottom-4 -left-2 font-display text-[42%] font-black leading-none tracking-tighter text-white/10 [font-size:min(42cqw,7rem)]" style={{ containerType: "inline-size" } as React.CSSProperties}>{glyph}</span>

      <div className="relative flex h-full flex-col p-[7%] pr-[11%]">
        {/* publisher head */}
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
          <span>{book.publisher || "SAP"}</span>
          <span className="rounded-[3px] bg-white/15 px-1.5 py-0.5 text-white/90">{book.module}</span>
        </div>
        {/* title — the hero, foil-embossed */}
        <div className="mt-auto">
          <span className="block h-px w-8 bg-white/50" />
          <h3 className={`mt-2 font-display font-black leading-[1.12] tracking-tight [text-shadow:0_1px_0_rgba(0,0,0,0.25)] ${titleClamp}`} style={{ display: "-webkit-box", WebkitLineClamp: size === "sm" ? 3 : 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {book.title}
          </h3>
          {size !== "sm" && book.titleEn && <p dir="ltr" className="mt-1.5 line-clamp-1 text-[10px] font-medium uppercase tracking-wide text-white/55">{book.titleEn}</p>}
          <div className="mt-2 flex items-center gap-2 text-[9.5px] font-semibold text-white/60">
            {book.pages ? <span>{book.pages} עמ׳</span> : null}
            {book.pages && book.chapters ? <span className="size-1 rounded-full bg-white/40" /> : null}
            {book.chapters ? <span>{book.chapters} פרקים</span> : null}
          </div>
        </div>
      </div>
      {/* inner emboss frame */}
      <span className="pointer-events-none absolute inset-0 rounded-l-[6px] rounded-r-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-16px_30px_-24px_rgba(0,0,0,0.7)]" />
    </div>
  );
}

/* ============================ SHELF SPINE ============================ */
/* Upright bound volume standing on a shelf. Width scales with page count. */
export function BookSpine({ book, onOpen, tall = false, active = false, id }: { book: CoverBook; onOpen?: () => void; tall?: boolean; active?: boolean; id?: string }) {
  const c = moduleColor(book.module);
  // thickness from pages, hard-clamped so the shelf never becomes a picket fence
  const w = Math.round(Math.max(38, Math.min(64, 34 + (book.pages || 300) / 26)));
  const h = tall ? 232 : 200;
  return (
    <button
      type="button"
      onClick={onOpen}
      data-book-id={id}
      aria-current={active ? "true" : undefined}
      aria-label={`${book.title} — ${book.module}${book.pages ? " · " + book.pages + " עמודים" : ""}${active ? " · נפתח לאחרונה" : ""}`}
      title={active ? `${book.title} · נפתח לאחרונה` : book.title}
      className={`neo-spine group/spine relative shrink-0 origin-bottom overflow-hidden rounded-t-[4px] text-white outline-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-2.5 focus-visible:-translate-y-2.5 ${active ? "-translate-y-2" : ""}`}
      style={{ width: w, height: h, background: cloth(c), boxShadow: active ? `0 18px 26px -14px rgba(15,23,42,0.75), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 2px ${c}, 0 0 0 4px color-mix(in srgb, ${c} 28%, transparent)` : "0 14px 22px -14px rgba(15,23,42,0.7), inset 0 1px 0 rgba(255,255,255,0.28)" }}
    >
      {active && <span className="pointer-events-none absolute inset-x-0 top-1 flex justify-center"><span className="size-1.5 rounded-full bg-white shadow" /></span>}
      {/* head/tail bands */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-black/25" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-black/30" />
      {/* raised hubs (bound look) */}
      <span className="pointer-events-none absolute inset-x-0 top-[22%] h-px bg-white/25" />
      <span className="pointer-events-none absolute inset-x-0 bottom-[22%] h-px bg-white/25" />
      {/* spine gloss */}
      <span className="pointer-events-none absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      {/* module foot chip */}
      <span className="pointer-events-none absolute inset-x-0 bottom-2.5 text-center text-[8px] font-black uppercase tracking-wider text-white/75">{book.module}</span>
      {/* vertical foil title */}
      <span className="absolute inset-0 flex items-center justify-center px-1">
        <span className="max-h-[64%] truncate font-display text-[12px] font-bold tracking-tight [text-shadow:0_1px_0_rgba(0,0,0,0.3)] [writing-mode:vertical-rl]">{book.title}</span>
      </span>
    </button>
  );
}

/* ============================ SHELF LEDGE ============================ */
/* A row of spines standing on a premium wood/graphite ledge with depth. */
export function Shelf({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* spines rail — horizontal scroll on overflow, RTL-correct */}
      <div dir="rtl" className="chip-rail flex items-end gap-2 overflow-x-auto px-1.5 pb-0 pt-6 [scrollbar-width:thin]">
        {children}
      </div>
      {/* the ledge */}
      <div className="relative -mt-px h-4 rounded-b-lg bg-gradient-to-b from-[#e7e2d8] to-[#d6cfc0] shadow-[0_10px_18px_-10px_rgba(15,23,42,0.45)]">
        <span className="absolute inset-x-0 top-0 h-px bg-white/70" />
        <span className="absolute inset-x-0 top-[3px] h-1 bg-gradient-to-b from-black/12 to-transparent" />
        <span className="absolute inset-x-2 -bottom-1 h-2 rounded-b-lg bg-black/10 blur-md" />
      </div>
    </div>
  );
}
