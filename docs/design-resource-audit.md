# NEO — Design Resource Audit (pre-redesign)

Honest inventory of design capabilities actually available in this session. No redesign performed.
Legend: ✅ Available · ⚠️ Partial / conditional · ❌ Not available.

## 1–4. Design / UX / UI / Design-System skills

| Skill | Purpose | Status | Recommended use for NEO |
|---|---|---|---|
| `high-end-visual-design` | Agency-grade visual standards: fonts, spacing, shadows, card structure, animation; blocks generic AI defaults | ✅ | **Core visual language.** Define NEO's "expensive" look (type scale, shadow system, card depth). |
| `redesign-existing-projects` | Audit existing app, find generic patterns, apply premium standards without breaking functionality | ✅ | **Redesign methodology** — run its audit on current `/knowledge` + centers. |
| `design-taste-frontend` | Senior UI/UX engineer rules: metric-based layout, component architecture, CSS hardware-accel, perf | ✅ | Enforce taste + performance budget on every component. |
| `ui-ux-pro-max` | 50+ styles, 161 palettes, 57 font pairings, 99 UX guidelines, 25 chart types, command-palette/dashboard patterns | ✅ | **IA + UX patterns + palette/type selection**; command-palette & dashboard guidelines. |
| `ui-styling` | shadcn/ui (Radix+Tailwind) components, dark mode, accessible primitives, canvas visuals | ✅ | **Component implementation** — matches NEO stack (Radix + Tailwind v4 + shadcn-style). |
| `design-system` | 3-layer tokens (primitive→semantic→component), spacing/type scales, component specs | ✅ | **Token architecture** in `app/globals.css` (extend existing). |
| `design` | Logo (55 styles), CIP, icons (SVG, Gemini), banners, social, slides | ✅ (logo/icon needs Gemini key) | Brand marks + custom iconography for centers. |
| `brand` | Brand voice, visual identity, messaging frameworks | ✅ | Brand layer: NEO tone, naming, consistency rules. |
| `d3-viz` | Bespoke interactive D3 (graphs, networks, custom SVG) | ✅ | **Knowledge-graph UX** + dashboard charts (beyond current static SVG). |
| `banner-design` | Social/web/print banners (22 styles) | ✅ | Hero/marketing assets (low priority for app UX). |
| `remotion-best-practices` | Programmatic video/motion, RTL Hebrew | ⚠️ video-focused | Motion **principles** reference (not app micro-interactions). |
| `mermaid-diagrams` / `excalidraw-diagram` | Diagrams / IA maps / process flows | ✅ | Design-phase IA maps + process diagrams (artifacts, not runtime). |
| `frontend-slides` / `slides` / `ppt-master` / `academic-pptx` | Presentations | ✅ | Out of scope (not app UI). |
| `figma:figma-generate-design / -library / -use / -diagram` | Figma design generation & sync | ⚠️ needs Figma MCP auth/desktop | Only if user authenticates Figma (see §5). |

## 5. Figma-related MCP

| MCP | Purpose | Status | Use |
|---|---|---|---|
| `mcp__plugin_figma_figma__authenticate` / `complete_authentication` | OAuth to Figma MCP (`mcp.figma.com`) | ⚠️ installed, **NOT authenticated** | Real Figma tools appear only after the user completes OAuth. Headless session can't auth alone → treat as **not available now**. |
| `figma:*` skills | Generate/use Figma files, code-connect | ⚠️ depend on above | Blocked until auth. |

## 6. Design MCPs

| MCP | Purpose | Status | Use |
|---|---|---|---|
| `mcp__magic__21st_magic_component_builder` | Generate premium React UI components (21st.dev) | ✅ confirmed | **Primary component generator** — command palette, nav, cards, empty states. |
| `mcp__magic__21st_magic_component_refiner` | Redesign/refine an existing component | ✅ | Refine current NEO components to premium. |
| `mcp__magic__21st_magic_component_inspiration` | Fetch component inspiration/previews | ✅ | Explore patterns (Linear/Vercel-style) before building. |
| `mcp__magic__logo_search` | Company logos (SVG/JSX) | ✅ | Benchmark/brand logos (offline note: do not ship remote assets). |
| `mcp__plugin_sapui5_ui5-tooling__get_guidelines` / `get_integration_cards_guidelines` / `get_api_reference` | SAP Fiori/UI5 design guidelines + cards | ✅ | **SAP design-language reference** (Fiori/Joule alignment) — NEO is custom React, use as guidance only. |
| `mcp__Claude_in_Chrome__*` / `mcp__Claude_Preview__*` | Live browser preview, screenshot, inspect | ✅ | **Visual QA loop** — screenshot-diff redesign vs benchmarks. |
| `mcp__mcp-registry__*` | Discover/suggest more MCP connectors | ✅ | Find additional design MCPs if needed. |

## 7. Specialized design agents

**Honest finding: NO dedicated UX / UI / Product / Interaction / IA / Visual / Motion / Dashboard agent types are installed.** Closest available, used as proxies:

| Discipline | Dedicated agent? | Proxy (agent + skill) |
|---|---|---|
| UX | ❌ | `general-purpose` + `ui-ux-pro-max` |
| UI | ❌ | `general-purpose` + `ui-styling` + `magic` MCP |
| Product Design | ❌ | `Plan` + `ui-ux-pro-max` |
| Interaction Design | ❌ | `general-purpose` + `design-taste-frontend` |
| Information Architecture | ❌ | `Plan` + `ui-ux-pro-max` (IA guidelines) |
| Visual Design | ❌ | `general-purpose` + `high-end-visual-design` |
| Motion Design | ❌ | `general-purpose` + `design-taste-frontend` (framer-motion already in stack) |
| Dashboard Design | ❌ | `general-purpose` + `d3-viz` + `ui-ux-pro-max` (chart guidelines) |
| Accessibility/Quality | ⚠️ | `sapui5:ui5-code-quality-advisor`, `review:code-reviewer` |
| Multi-agent orchestration | ✅ | `sadd:*` patterns, `Workflow` tool (with opt-in) |

## Net assessment
- **Strong:** skills cover visual/UX/design-system/components; `magic` MCP for generation; browser preview for QA; SAP Fiori guidelines for domain alignment.
- **Gap:** no first-class design-discipline agents (use general-purpose personas + skills); Figma needs user OAuth.
- **Offline constraint stays:** any generated component must be vendored locally — no remote CDNs/assets (NEO is `output:'export'`, 100% offline).
