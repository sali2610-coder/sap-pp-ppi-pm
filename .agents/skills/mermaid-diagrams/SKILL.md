---
name: mermaid-diagrams
description: >
  Generate and render Mermaid diagrams to SVG / PNG / PDF. Use when the user asks to
  create a diagram, flowchart, process map, swimlane, org chart, sequence diagram,
  ER diagram, architecture diagram, or SAP process flow (Order-to-Cash, Procure-to-Pay,
  PP-PI production, IDOC integration). Triggers: "diagram", "flowchart", "process map",
  "swimlane", "org chart", "mermaid", "architecture diagram".
---

# Mermaid Diagrams Skill

Author Mermaid `.mmd` text, render to vector/raster with `mmdc` (mermaid-cli).

## Engine

- Renderer: `@mermaid-js/mermaid-cli` (`mmdc`), installed under `renderer/`.
- Headless browser: system Google Chrome (no chromium download) via `renderer/puppeteer.json`.
- Render wrapper: `scripts/render.sh <input.mmd> <output.svg|png|pdf> [theme]`.

```bash
# single file
bash scripts/render.sh src/oct.mmd out/oct.svg
# batch every .mmd in a dir → SVG + PNG
bash scripts/render.sh --all <src_dir> <out_dir>
```

## Supported Diagram Types

| Type | Mermaid keyword | Use for |
|------|-----------------|---------|
| Flowchart / process map | `flowchart LR` / `TD` | Order-to-Cash, Procure-to-Pay, generic process |
| Swimlane | `flowchart` + `subgraph` lanes | Cross-department / role-based process |
| Sequence | `sequenceDiagram` | System/message exchange, IDOC handshakes |
| Architecture | `flowchart` + `subgraph` tiers | SAP landscape, integration topology |
| Org chart | `flowchart TD` tree | Reporting lines, team structure |
| ER diagram | `erDiagram` | Table relations (PLKO→PLPO, EQUI→EQKT) |
| State | `stateDiagram-v2` | Document / order status lifecycle |
| Gantt | `gantt` | Cutover / project timeline |
| Mindmap | `mindmap` | Scope decomposition |

## SAP Conventions

- Color tiers with `classDef`: ECC `#0a6ed1`, S/4 `#d62027`, middleware/PI-PO `#6a737d`, external `#107e3e`.
- Name nodes with real SAP objects: tcodes (VA01, ME21N, COR1), tables (VBAK, EKKO, AUFK), IDoc types (ORDERS05, ORDRSP), BAPIs.
- Swimlanes via `subgraph LANE["Role"]`; keep flow direction consistent (`LR` for value streams).

## Output / Export Formats

`mmdc` exports: **SVG** (vector, default), **PNG** (raster, `-s` scale for DPI), **PDF** (`-f` fit page), **Markdown** with inlined SVG. SVG is offline-safe and embeds into PPTX (ppt-master) or HTML.

See `reference.md` for ready SAP templates (OTC, PTP, PP-PI, IDOC).
