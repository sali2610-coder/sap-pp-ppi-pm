# Presentation Template Library

_10 templates · machine-usable tokens in `template-library.json`._

Each template defines: **colors · typography · slide layouts · chart styles · icon style · animation style.** Colors are 6-char hex (no `#`).

## 1. Academic
*Conference talks, thesis defenses, seminars — communication-first, evidence-led*

- **Colors** — primary `#1F4E79` · accent `#2E75B6` · ink `#2D2D2D` · muted `#777777` · bg `#FFFFFF`
  - semantic: good `#2E7D32` · bad `#B91C1C` · highlight `#FFF2CC`
- **Typography** — `Arial` — title 26pt / section 22pt / body 20pt / label 16pt / cite 13pt
- **Slide layouts** — title-dark · action-title+bullets · figure-left/bullets-right · two-column · references · conclusions-dark
- **Chart style** — flat-minimal; palette `#2E75B6`, `#9DC3E6`, `#1F4E79`; axis muted, gridlines value-only, labels key-only
- **Icon style** — none — no decorative icons; typography + whitespace carry hierarchy
- **Animation style** — transition fade, build per-bullet-on-click, ~0.3s

## 2. Business
*Strategy reviews, proposals, internal decks — clean corporate*

- **Colors** — primary `#1B3A5B` · accent `#2F80ED` · ink `#263238` · muted `#8A929B` · bg `#FFFFFF`
  - semantic: good `#2E7D32` · bad `#C62828` · highlight `#E8F0FE`
- **Typography** — `Calibri` — title 28pt / section 22pt / body 20pt / label 16pt / cite 12pt
- **Slide layouts** — title-banner · agenda · action-title+bullets · 3-card-row · kpi-row · two-column · closing-cta
- **Chart style** — clean-rounded; palette `#2F80ED`, `#56CCF2`, `#1B3A5B`, `#BBD2F0`; axis muted, gridlines value-only, labels auto
- **Icon style** — line (weight 1.5) — thin line icons in accent, used sparingly on section headers
- **Animation style** — transition push, build section-fade, ~0.4s

## 3. Executive
*Board/steering decks — answer-first, big numbers, minimal text*

- **Colors** — primary `#0D1B2A` · accent `#C9A227` · ink `#1B263B` · muted `#9AA5B1` · bg `#FFFFFF`
  - semantic: good `#2E7D32` · bad `#B3261E` · highlight `#F4ECCB`
- **Typography** — `Helvetica` — title 30pt / section 22pt / body 20pt / label 16pt / cite 12pt
- **Slide layouts** — title-dark-gold · answer-first-statement · big-number-hero · 1-chart-focus · decision-box · next-steps-dark
- **Chart style** — spare-high-contrast; palette `#0D1B2A`, `#C9A227`, `#6B7B8C`; axis minimal, gridlines none, labels value-large
- **Icon style** — none — numbers and whitespace are the visual; no icons
- **Animation style** — transition morph, build appear-whole-slide, ~0.3s

## 4. SAP
*SAP/Fiori functional & technical decks; ECC→S/4HANA migration*

- **Colors** — primary `#0A6ED1` · accent `#D62027` · ink `#32363A` · muted `#6A6D70` · bg `#FFFFFF`
  - semantic: good `#107E3E` · bad `#BB0000` · highlight `#FEF7E5` · ecc `#0A6ED1` · s4 `#D62027` · middleware `#6A737D`
- **Typography** — `Arial` · mono `Consolas` — title 26pt / section 22pt / body 20pt / label 16pt / code 15pt / cite 13pt  _( render tcodes/tables/IDocs in mono; keep identifiers Latin even in Hebrew decks )_
- **Slide layouts** — title-fiori · process-chain · tcode-table · before-after-s4 · architecture-tiers · swimlane · conclusions
- **Chart style** — fiori-flat; palette `#0A6ED1`, `#D62027`, `#6A737D`, `#107E3E`; axis muted, gridlines value-only, labels auto
- **Icon style** — fiori-line (weight 1.5) — SAP-icon-style line glyphs in tier color; modules/tcodes labeled in mono
- **Animation style** — transition fade, build process-step-sequential, ~0.4s

## 5. Project Management
*Status reports, roadmaps, cutover plans — timeline & RAG heavy*

- **Colors** — primary `#0F766E` · accent `#F59E0B` · ink `#1F2937` · muted `#6B7280` · bg `#FFFFFF`
  - semantic: good `#16A34A` · warn `#F59E0B` · bad `#DC2626` · highlight `#FEF3C7`
- **Typography** — `Segoe UI` — title 26pt / section 21pt / body 19pt / label 15pt / cite 12pt
- **Slide layouts** — title-banner · milestone-timeline · gantt · rag-status-board · workstream-swimlane · raid-table · next-steps
- **Chart style** — gantt+stacked-bar; palette `#0F766E`, `#F59E0B`, `#DC2626`, `#16A34A`; axis muted, gridlines both-light, labels auto
- **Icon style** — line (weight 2) — RAG status dots + milestone diamonds; line icons for workstreams
- **Animation style** — transition wipe, build timeline-left-to-right, ~0.4s

## 6. Training
*Courses, onboarding, workshops — friendly, step-by-step, learner-first*

- **Colors** — primary `#2563EB` · accent `#F97316` · ink `#111827` · muted `#6B7280` · bg `#FFFFFF`
  - semantic: good `#22C55E` · bad `#EF4444` · highlight `#FFF7ED`
- **Typography** — `Verdana` — title 28pt / section 22pt / body 20pt / label 17pt / cite 13pt
- **Slide layouts** — title-friendly · learning-objectives · concept-with-analogy · numbered-steps · exercise-card · knowledge-check · recap-takeaways
- **Chart style** — rounded-friendly; palette `#2563EB`, `#F97316`, `#22C55E`, `#A78BFA`; axis muted, gridlines value-only, labels auto
- **Icon style** — rounded-filled (weight 0) — friendly filled icons in accent circles on step/objective cards
- **Animation style** — transition fade, build step-reveal-on-click, ~0.5s

## 7. Data Analytics
*Dashboards, metrics readouts, model results — dense, dark, chart-forward*

- **Colors** — primary `#0F172A` · accent `#14B8A6` · ink `#E2E8F0` · muted `#94A3B8` · bg `#0B1220`
  - semantic: good `#22C55E` · bad `#F43F5E` · highlight `#1E293B`
- **Typography** — `Segoe UI` · mono `Cascadia Mono` — title 26pt / section 20pt / body 18pt / label 14pt / code 14pt / cite 12pt
- **Slide layouts** — title-dark · kpi-grid-2x2 · dashboard-3up · 1-big-chart · chart+insight-rail · table-heatmap · method-notes
- **Chart style** — dark-modern; palette `#14B8A6`, `#5EEAD4`, `#38BDF8`, `#A78BFA`, `#F472B6`; axis muted-light, gridlines value-subtle, labels on-hover-or-key
- **Icon style** — line (weight 1.5) — minimal line icons on KPI tiles; color = metric trend
- **Animation style** — transition fade, build chart-series-stagger, ~0.4s

## 8. Financial
*Earnings, budgets, FP&A — conservative, precise, table & waterfall heavy*

- **Colors** — primary `#14532D` · accent `#1D4ED8` · ink `#1F2937` · muted `#6B7280` · bg `#FFFFFF`
  - semantic: good `#15803D` · bad `#B91C1C` · highlight `#ECFDF5`
- **Typography** — `Georgia` · mono `Consolas` — title 26pt / section 21pt / body 19pt / label 15pt / num 18pt / cite 12pt  _( use mono/tabular figures for aligned numbers )_
- **Slide layouts** — title-conservative · exec-summary-kpis · pnl-table · waterfall-bridge · variance-bar · trend-line · assumptions-footnotes
- **Chart style** — waterfall+grouped-bar; palette `#14532D`, `#1D4ED8`, `#B91C1C`, `#9CA3AF`; axis precise, gridlines value-only, labels value-exact
- **Icon style** — none — no icons; numbers, tables, and a single accent for variance carry meaning
- **Animation style** — transition fade, build appear-whole-slide, ~0.3s

## 9. Startup Pitch
*Investor / demo-day decks — bold, narrative, image-forward, high energy*

- **Colors** — primary `#6D28D9` · accent `#F43F5E` · ink `#0F172A` · muted `#64748B` · bg `#FFFFFF`
  - semantic: good `#10B981` · bad `#EF4444` · highlight `#F5F3FF`
- **Typography** — `Montserrat` — title 40pt / section 26pt / body 22pt / label 16pt / cite 12pt  _( oversized titles; one bold statement per slide )_
- **Slide layouts** — title-bold-fullbleed · problem-statement · solution-hero · market-size-tam · traction-metrics · business-model · team · the-ask
- **Chart style** — bold-minimal; palette `#6D28D9`, `#F43F5E`, `#A78BFA`, `#FB7185`; axis minimal, gridlines none, labels value-large
- **Icon style** — duotone (weight 0) — duotone icons in primary/accent for problem/solution/market beats
- **Animation style** — transition slide, build statement-then-evidence, ~0.5s

## 10. Technical Architecture
*System design, integration, infra decks — diagram-heavy, precise, code-aware*

- **Colors** — primary `#1E293B` · accent `#6366F1` · ink `#0F172A` · muted `#64748B` · bg `#F8FAFC`
  - semantic: good `#059669` · bad `#DC2626` · highlight `#EEF2FF` · external `#059669` · service `#6366F1` · datastore `#F59E0B`
- **Typography** — `Segoe UI` · mono `JetBrains Mono` — title 26pt / section 20pt / body 18pt / label 14pt / code 14pt / cite 12pt  _( mono for components, endpoints, config keys, commands — preserve exactly )_
- **Slide layouts** — title-blueprint · context-c4 · container-diagram · sequence-flow · data-model-er · deployment-topology · tradeoffs-table · decisions-adr
- **Chart style** — diagram-first; palette `#6366F1`, `#059669`, `#F59E0B`, `#64748B`; axis muted, gridlines value-only, labels auto
- **Icon style** — line (weight 1.5) — node-type glyphs (service/datastore/queue/external) colored by tier; render as vector diagrams
- **Animation style** — transition fade, build diagram-progressive-reveal, ~0.4s

