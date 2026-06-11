# Presentation Studio Pro — Orchestration Workflow

> Design document. Sequences the 9-stage pipeline across the agents in `agents/`, defines the gates and
> typed handoffs, and routes one finalized `deck_spec` to five output formats. Diagrams in `diagrams/`.

## Pipeline (the 9 stages)

```
User Request → Research → Outline → Story Structure → Visual Design
            → Infographics → Data Visualization → Animation Planning → Final Presentation
```

Diagram: `diagrams/out/01_pipeline.png` (flow + gates) · `04_stage_agent_map.png` (stage→agent→artifact)
· `03_sequence.png` (handoffs) · `02_export_fanout.png` (multi-format export).

## Stage → agent → artifact → gate

| # | Stage | Agent | Produces | Gate |
|---|-------|-------|----------|------|
| 1 | User Request | Studio Director + Brief Analyst | `brief.json` | Brief (goal/audience/time explicit) |
| 2 | Research | Source Researcher | `evidence_ledger.json` | Evidence (no orphan claims; OCR flag) |
| 3 | Outline | presentation-architect | `outline.json` (slides + action titles) | — |
| 4 | Story Structure | presentation-architect | spine + ghost-deck pass | **⛔ Outline gate** (human-confirm >10 slides) |
| 5 | Visual Design | visual-designer | `theme.json` + per-slide layout | — |
| 6 | Infographics | infographic-designer | diagram exhibits (vector) | — |
| 7 | Data Visualization | data-storyteller | chart/table exhibits | — |
| 8 | Animation Planning | animation-director | `deck_spec.slides[].animation` | — |
| 9 | Final Presentation | Builder → academic-reviewer → Exporter | `deck.*` in 5 formats | Build + **Rigor gate** (veto) |

Stages 5–8 are a **parallel fan-out** off the approved outline (they touch disjoint slices of
`deck_spec`, so they don't collide); they **join** before build. Stages 3–4 are both the
presentation-architect (outline = the slides; story structure = the spine + ghost-deck that orders them).

## Control flow & gates

- **⛔ Outline gate (stage 4):** the only hard human stop. Ghost-deck must pass — action titles alone
  tell the argument. Nothing in stages 5–9 runs until approved. Cheapest place to fix the deck.
- **Rigor gate (stage 9):** academic-reviewer has **veto**. Any fabrication or orphan claim → FAIL,
  routed back to the responsible agent (wrong reference → Source Researcher; weak title →
  presentation-architect; clipped chart → data-storyteller). Loop until pass.
- **Resumability:** every stage persists a typed artifact in `run/<id>/`, so a run resumes at any stage
  (re-approve a tweaked `outline.json` → re-run 5–9; hand-edit `theme.json` → re-run build only).

## Multi-format export (stage 9 fan-out)

One finalized `deck_spec.json` + `theme.json` + `assets/` drives every format — author once, render
many. Diagram: `diagrams/out/02_export_fanout.png`.

| Format | Renderer (repo skill/tool) | Output | Use |
|--------|---------------------------|--------|-----|
| **PPTX** | `pptx` (pptxgenjs) / `ppt-master` (SVG→DrawingML) | `deck.pptx` (native, editable) | the editable master |
| **PDF** | LibreOffice `soffice --convert-to pdf` (from PPTX) | `deck.pdf` | handout / print / share |
| **HTML** | static self-contained generator (theme tokens → HTML/CSS) | `index.html` | offline web view, no runtime |
| **RevealJS** | reveal.js section generator (one `<section>` per slide) | `reveal/index.html` | browser talk, speaker view, fragments |
| **Frontend Slides** | React/Next slide components (deck_spec → JSX) | `slides/` components | embed in an app / design-system deck |

Export rules:
- **deck_spec is the single source of truth.** Each renderer reads the same spec; no per-format
  re-authoring. A title fix propagates to all five.
- **Animation mapping:** PPTX uses native slide animations; RevealJS uses fragments + transitions;
  HTML/Frontend use CSS transitions — all derived from `deck_spec.slides[].animation`, degrading
  gracefully where a target can't express an effect.
- **Validation per format:** opens cleanly; slide count == page/section count; offline-safe (no CDN for
  HTML/Frontend, matching the project's offline constraint); native (not flat images) for PPTX.

## Handoff contract

`reads: [declared inputs] → writes: [declared outputs]` for every agent (specified in each
`agents/*.md`). This keeps the fan-out safe to parallelize and the run debuggable: any artifact can be
inspected or replaced and the pipeline resumed from that point.

## Diagrams index (`diagrams/`)
- `01_pipeline` — end-to-end flow with the Outline ⛔ and Rigor gates + parallel produce.
- `02_export_fanout` — deck_spec → PPTX/PDF/HTML/RevealJS/Frontend with per-format validation.
- `03_sequence` — agent message sequence (par for produce, alt for QA pass/fail).
- `04_stage_agent_map` — the 9 stages mapped to owning agent and emitted artifact.
Each rendered to `.svg` (vector) and `.png` via the `mermaid-diagrams` skill; sources in `diagrams/src/`.
