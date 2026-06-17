# Wave D5 — Motion & Micro-interactions

Adds the motion polish layer on top of D1–D4. Delight + enterprise restraint.
Visual only, offline, RTL, all reduced-motion safe.

## Shipped
| Focus | Implementation |
|---|---|
| Loading states | `.skeleton` shimmer utility (`globals.css`); homepage "Recent Activity" shows skeleton chips until the localStorage store hydrates (`mounted` gate) — no empty flash. |
| Scroll animations | `components/reveal.tsx` (whileInView fade-up, once) wraps homepage sections; D3 knowledge journeys already stagger on scroll. |
| Card interactions | Cursor-follow **spotlight** (`.spotlight`, radial brand glow tracking pointer) on every knowledge card; D1 `.lift` + accent edge retained. Pointer-only, GPU. |
| Search interactions | Result-count badge **pops** on change (spring, keyed); focus glow ring; clear button. |
| Page animations / navigation transitions | Existing `PageTransition` (fade + slide, expo ease) on every route; hero stat **counts animate** on arrival. |
| Hover / micro-interactions | Card lift + arrow slide, `.tap` press-scale, quick-access accent edge, nav shared-element pill (D4). |
| Transitions | Unified easing tokens (`--ease-out-expo`/`--ease-soft`), durations from D1. |

## Notes (honest)
- **Route progress bar** was prototyped (`route-progress.tsx`) then **removed** — couldn't reliably verify it renders/captures in the harness, and a 2–3px brand bar over the red header had poor contrast. `PageTransition` already covers page/navigation animation, so no capability lost. Not shipping unverifiable UI.
- **Skeleton** is pre-hydration/transient → hard to screenshot; verified in code + logic (`!mounted` branch).
- **design-taste-frontend**: spring physics, IntersectionObserver (no scroll listener), isolated client leaves, transform/opacity only. Segoe UI + lucide kept (CLAUDE.md offline mandate).
- **magic MCP**: prior pattern pulls reused; no new component/deps this wave. **Figma MCP**: reference only (no file).

## Verification
Build clean · **0 console errors · 0 page errors · 0 external requests (offline intact)** · responsive 1440/390 ✓ · reduced-motion: skeleton shimmer + spotlight disabled via global `prefers-reduced-motion` block; Reveal/count return static. CBC brand + footer + functionality unchanged.

Next: **D6 Search Experience** (global Cmd+K palette — existing `command-palette.tsx`) — pending approval.
