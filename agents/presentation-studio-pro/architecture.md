# Presentation Studio Pro — Architecture

> Design document. **No implementation.** This defines the agent system, contracts, and quality bar.

## Mission

Produce world-class presentations that beat NotebookLM, Gamma, and hand-built PowerPoint — by
combining a **rigorous argument** (consulting-grade narrative), **faithful evidence** (every claim
sourced), **real editable artifacts** (native DrawingML/PPTX, not flat images), and **deliberate
design** (token-driven, communication-first), orchestrated across specialized agents instead of one
monolithic generator.

## Why a multi-agent system (not one prompt)

A single model asked to "make a great deck" averages everything: it writes okay copy, picks okay
charts, and lays out okay slides — none excellent, and nothing verified. Separating concerns lets each
agent hold one quality standard, hand a typed artifact to the next, and be **gated** before the deck
advances. The orchestrator enforces the gates; the critics enforce the bar.

## Differentiation (the bar to beat)

| Capability | NotebookLM | Gamma | Manual PPT | **Presentation Studio Pro** |
|------------|-----------|-------|------------|------------------------------|
| Argument structure (ghost-deck / action titles) | weak | weak | manual | **enforced by Narrative Architect + QA gate** |
| Source fidelity / citations | summarizes | none | manual | **evidence ledger; every claim traces to a source** |
| Editable native output | no (text) | partial | yes | **native DrawingML PPTX + PDF (real shapes/charts/tables)** |
| Data → real charts | no | basic | manual | **Data Agent builds native charts/tables from data** |
| Diagrams (flow/arch/swimlane) | no | limited | manual | **Diagram Agent (Mermaid/Excalidraw) embedded as vector** |
| Design system / brand tokens | template | template | manual | **token-driven theme; brand presets; a11y contrast checks** |
| Localization (Hebrew/RTL, code-safe) | no | no | manual | **Localizer: RTL + SAP/tech identifiers preserved** |
| Visual self-correction | no | no | human | **QA render→view→fix loop until it passes** |
| Determinism / reproducibility | no | no | n/a | **spec-driven; same deck-spec → same deck** |

## Agent roster

Each agent has: **one responsibility · typed input · typed output · a gate it must pass.**

| # | Agent | Responsibility | Consumes | Produces |
|---|-------|---------------|----------|----------|
| 0 | **Studio Director** (orchestrator) | Plan, route, enforce gates, manage state, resolve conflicts | user brief + all artifacts | run plan, gate decisions |
| 1 | **Brief Analyst** | Extract goal, audience, time limit, tone, format, constraints | raw user request + files | `brief.json` |
| 2 | **Source Researcher** | Ingest sources (PDF/DOCX/PPTX/MD), build evidence ledger; optional web research | brief + source files | `evidence_ledger.json` |
| 3 | **Narrative Architect** | Argument spine (SCR/funnel/answer-first), slide-by-slide outline, **action titles**, ghost-deck | brief + ledger | `outline.json` (deck skeleton) |
| 4 | **Content Writer** | Per-slide body copy, speaker notes, citations; ≤40 words/slide | outline + ledger | `deck_spec.slides[].content` |
| 5 | **Data Agent** | Turn data into the *right* chart/table; annotate the key finding | outline + datasets | `deck_spec.slides[].exhibit` (chart/table) |
| 6 | **Diagram Agent** | Flow/architecture/swimlane/process visuals | outline | Mermaid/Excalidraw → vector asset refs |
| 7 | **Visual Designer** | Theme tokens, layout per slide, hierarchy, whitespace, a11y contrast | outline + brand preset | `theme.json` + per-slide layout |
| 8 | **Localizer** (optional) | RTL/Hebrew; preserve SAP/technical identifiers in Latin | deck_spec + theme | localized deck_spec |
| 9 | **Builder** | Assemble native PPTX (DrawingML) from the finalized deck_spec | deck_spec + theme + assets | `deck.pptx` |
| 10 | **QA Critic** | Content QA (ghost-deck, citations) + visual QA (render→view→fix) | deck.pptx + deck_spec | QA report, pass/fail |
| 11 | **Exporter** | PPTX → PDF, thumbnails, handout; package | deck.pptx | `deck.pdf`, thumbnails, bundle |

## Orchestration topology

Hybrid **pipeline with fan-out and a verify loop** (not a free-for-all):

```
Brief Analyst → Source Researcher → Narrative Architect ──(outline GATE)──┐
                                                                          ▼
        ┌──────────────── fan-out from the approved outline ─────────────┐
        Content Writer        Data Agent        Diagram Agent        Visual Designer
        └──────────────── join into one deck_spec ──────────────────────┘
                                     │
                          (optional) Localizer
                                     ▼
                                  Builder → deck.pptx
                                     ▼
                              QA Critic ──fail──► back to the responsible agent (targeted)
                                     │pass
                                     ▼
                                  Exporter → deck.pdf + bundle
```

- **Fan-out** (4,5,6,7) is parallel and independent — they all key off the **approved outline**, so they
  don't collide. They join into one `deck_spec`.
- **Verify loop**: QA failures route back to the *specific* agent at fault (a clipped chart → Data
  Agent; a weak title → Narrative Architect), not a full rebuild.

## Quality gates (the orchestrator blocks until each passes)

1. **Brief gate** — goal, audience, and time limit are explicit (ask the user if missing).
2. **Outline gate (⛔ human-confirm for >10 slides)** — ghost-deck test passes: action titles alone tell
   the whole argument. Nothing downstream runs until the outline is approved.
3. **Evidence gate** — every factual slide cites a ledger row; no orphan claims, no invented numbers.
4. **Build gate** — deck_spec validates against the schema; assets resolve.
5. **QA gate** — content + visual checklist pass (see `templates/qa-checklist.md`); the render→view→fix
   loop is exhausted of defects.

## Shared state & artifacts

One run directory is the single source of truth. Agents communicate only through typed files, so any
agent (or a human) can inspect/replace any stage:

```
run/<id>/
  brief.json            # Brief Analyst
  evidence_ledger.json  # Source Researcher
  outline.json          # Narrative Architect  (GATE)
  deck_spec.json        # joined: content + exhibits + layout   (templates/deck-spec.schema.json)
  theme.json            # Visual Designer
  assets/               # charts, diagrams (svg/png), images
  deck.pptx             # Builder
  qa_report.json        # QA Critic
  deck.pdf, thumbnails/ # Exporter
```

**Contract rule:** an agent may only read its declared inputs and write its declared outputs. This keeps
the system debuggable and lets fan-out run safely in parallel.

## Technology mapping (reuses existing repo skills — design only)

| Concern | Backing skill/tool (already in this repo) |
|---------|-------------------------------------------|
| Source ingest (PDF/DOCX/PPTX→MD) | `research-academic-engine` / `learning-content-factory` `ingest.py` (markitdown) |
| Evidence ledger, citations | `research-academic-engine` (APA/IEEE/Harvard) |
| Narrative/content standards | `academic-pptx` (action titles, ghost-deck, slide patterns) |
| Native PPTX build | `pptx` (pptxgenjs) or `ppt-master` (SVG→DrawingML) |
| Charts/tables | `pptx` chart/table API |
| Diagrams | `mermaid-diagrams`, `excalidraw-diagram` |
| PDF export | LibreOffice `soffice` (as used by `academic-pptx`) |
| Localization | `learning-content-factory` Hebrew rules (RTL + code-preservation) |

Studio Director composes these; it does not reinvent them. Agent system prompts live in `prompts/`,
the data contracts in `templates/`, and a worked design in `examples/`.

## Failure handling & escalation

- Missing brief fields → ask the user (don't guess goal/audience).
- Scanned/image PDF with no text layer → request OCR; never fabricate source content.
- Conflicting sources → surface the conflict in the ledger; Narrative Architect decides how to present it.
- QA loop stalls (same defect twice) → escalate to the user with the rendered evidence.

## Non-goals (this document)

No code, no built deck. This is the blueprint: agents, contracts, gates, topology, and the quality bar.
`workflow.md` sequences it; `prompts/` specifies each agent; `templates/` fixes the data contracts.
