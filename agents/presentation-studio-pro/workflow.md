# Presentation Studio Pro — Workflow

> Design document. Sequences the agents from `architecture.md`. **No implementation.**

## Pipeline at a glance

```
Phase 0  Intake        Studio Director + Brief Analyst        → brief.json            [Brief gate]
Phase 1  Research       Source Researcher                      → evidence_ledger.json  [Evidence gate]
Phase 2  Narrative      Narrative Architect                    → outline.json          [⛔ Outline gate]
Phase 3  Produce        Writer · Data · Diagram · Designer      → deck_spec.json + theme.json + assets/   (parallel)
Phase 4  Localize       Localizer (optional)                   → localized deck_spec
Phase 5  Build          Builder                                → deck.pptx             [Build gate]
Phase 6  QA             QA Critic (render→view→fix loop)        → qa_report.json        [QA gate]
Phase 7  Export         Exporter                               → deck.pdf + bundle
```

Serial spine: 0→1→2, then **fan-out** at 3, **join**, then 4→5→6→7. The only ⛔ hard-stop for the user
is the **Outline gate** — everything else flows automatically once the outline is approved.

---

## Phase 0 — Intake
**Goal:** know exactly what success looks like before producing anything.
- Studio Director receives the user request + any files.
- Brief Analyst extracts: objective, audience + expertise, time limit / slide budget, tone, format
  (16:9 default), brand, language, must-include / must-avoid.
- **Brief gate:** if objective, audience, or time limit is missing → ask the user. Don't guess these;
  they change every downstream decision.
- **Out:** `brief.json` (`templates/brief.template.json`).

## Phase 1 — Research
**Goal:** a faithful evidence base so nothing downstream is invented.
- Source Researcher ingests each source to Markdown (PDF/DOCX/PPTX via `ingest.py`; MD direct).
- Builds the **evidence ledger**: one row per claim → evidence → source locator → cite key. Optional
  web research when the brief allows and sources are thin.
- **Evidence gate:** scanned/no-text PDF → request OCR; never fabricate.
- **Out:** `evidence_ledger.json`.

## Phase 2 — Narrative  (the make-or-break phase)
**Goal:** a deck that *argues*. Structure before pixels.
- Narrative Architect picks a spine (SCR / funnel / answer-first by audience) and writes the
  slide-by-slide **outline**: per slide an **action title** (a full-sentence takeaway), its role, and
  the intended exhibit type (chart / table / diagram / quote / none).
- Runs the **ghost-deck test**: read titles alone — do they tell the complete argument? If not, fix the
  outline.
- **⛔ Outline gate (human-confirm for >10 slides):** present the outline; wait for explicit approval.
  This is the cheapest place to fix the deck and the most expensive place to get wrong.
- **Out:** `outline.json`.

## Phase 3 — Produce  (parallel fan-out from the approved outline)
All four read the **same approved outline**, so they're independent and safe to run together. Each
writes only its slice of `deck_spec`.
- **Content Writer** — body copy + speaker notes + in-text citations; ≤~40 words of body per slide
  (slides support speech, not replace it).
- **Data Agent** — for each data slide, the *right* exhibit (graph over table for trends), key finding
  annotated directly on the chart, source line.
- **Diagram Agent** — flow/architecture/swimlane/process visuals as vector (Mermaid/Excalidraw).
- **Visual Designer** — `theme.json` (palette, type scale, spacing) + per-slide layout (figure-left /
  bullets-right, hierarchy, whitespace); checks color-contrast for accessibility.
- **Join:** Studio Director merges the slices into one `deck_spec.json` and resolves any overlap
  (e.g., a slide that got both a chart and a diagram → pick one exhibit per slide).
- **Out:** `deck_spec.json`, `theme.json`, `assets/`.

## Phase 4 — Localize  (optional)
- If the brief's language is Hebrew (or bilingual): translate prose to RTL Hebrew, **keep all
  SAP/technical identifiers in Latin** (VA01, EKKO, `kubectl`). Mirror layout for RTL.
- **Out:** localized `deck_spec.json`.

## Phase 5 — Build
**Goal:** real, editable artifact.
- Builder validates `deck_spec` against the schema, then assembles **native PPTX** (DrawingML shapes,
  text frames, native charts/tables) — not screenshots.
- **Build gate:** schema-valid; every asset/citation reference resolves.
- **Out:** `deck.pptx`.

## Phase 6 — QA  (render → view → fix loop)
**Goal:** catch what JSON can't show.
- QA Critic runs **content QA** (ghost-deck still holds, every borrowed fact cited, References slide,
  Conclusions last) and **visual QA** (render to image, inspect: no clipped/overlapping text, arrows
  land right, balanced composition, ≥20pt body, contrast).
- Failures route back to the **specific** responsible agent (targeted fix), then re-render.
- **QA gate:** loop until a full pass reveals no new defects (typically 2–4 iterations). Same defect
  twice → escalate to the user with the rendered evidence.
- **Out:** `qa_report.json`.

## Phase 7 — Export
- Exporter: PPTX → PDF (LibreOffice), generate thumbnails + optional handout, package the bundle.
- **Out:** `deck.pdf`, `thumbnails/`, run bundle.

---

## Handoff contract (every phase)
`reads: [declared inputs] → writes: [declared outputs]`. An agent never reaches outside its contract —
that's what makes Phase 3 safe to parallelize and the whole run debuggable. State lives in `run/<id>/`;
any artifact can be inspected or hand-edited and the pipeline resumed from that point.

## Resumability
Because each phase persists a typed artifact, a run can resume at any phase: re-approve a tweaked
`outline.json` and re-run Phase 3+, or hand-edit `theme.json` and re-run Build+QA, without redoing
research. Same `deck_spec` + `theme` → same deck (deterministic build).

## Where the time goes (guidance)
Narrative (Phase 2) and QA (Phase 6) deserve the most care — they are what separate this from
template generators. Producing pixels is cheap; arguing well and self-correcting is the moat.
