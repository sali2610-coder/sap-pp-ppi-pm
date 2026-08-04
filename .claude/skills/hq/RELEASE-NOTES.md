# HQ v1.0 — Production Ready · Release Notes

**Release:** HQ v1.0 – Production Ready · **Date:** 2026-07-23 · **Owner:** Sali Halif · **Tag:** `hq-v1.0`

SAP HQ is a single-entry SAP AI system: one door (`/hq`) that thinks like a senior SAP consultant, investigates
incidents end-to-end, teaches, and turns every solved incident into reusable knowledge — built **entirely on top of
already-installed skills/agents/MCP**. No new plugins, MCP, or agents were created.

## Architecture (layer order)

```
/hq  (single entry — command + skill)
  ↓  Request-Mode detection (12 modes)
Reasoning Engine  (Observe→Classify→Hypotheses→Evidence★→RCA→Missing-Info→Confidence→Explain-Why→Never-Guess)
  ↓  routes to managers (orchestration only)
Sherlock (investigate) │ Oracle (knowledge) │ Memory (history)
  ↓  auto-selects
Expert Packs  (PP/PM/MM/SD/FI/CO/QM/ABAP/Auth/IDOC/Gateway/OData/Fiori/Workflow/Perf/Basis/PI-PO/BTP/ECC/S4)
  ↓  map to EXISTING workers (sc4sap agents, sap-abap, sap-ecc-troubleshooter, …)
Playbooks + Knowledge Graph  (SAP-HQ/)
  ↓
Final Recommendation + HQ Summary
```

## Capabilities added

### Flagship layer
- **HQ** — top orchestrator + single entry point (`/hq`, `@hq`). Orchestration only.
- **Sherlock** — incident investigation lead (multi-format intake → RCA).
- **Oracle** — SAP knowledge (Notes/KBA/Help/Community, deep-research).
- **Memory** — organizational history (past incidents, lessons, playbooks).
- Shared: `flagship/CAPABILITY-REGISTRY.md`, `HEALTH-FALLBACK.md`, `scripts/healthcheck.sh`, `ARCHITECTURE.md`.

### Reasoning Engine (Phase 2)
10-step senior-consultant chain with ranked evidence (★★★★★ Notes/KBA … ★ Guess), Confidence Engine, Explain-Why
(Why·Evidence·Risk·Impact·Next Step), and the **Never-Guess** gate (<70% not certain, <50% "אני צריך עוד ראיות").

### Interactive Investigation
Ask-then-wait cadence: identify fault → request only the missing evidence → wait → advance one step. Plain-Hebrew
6-answer RCA (מה קרה · למה · איך הוכחנו · סיכון · פתרון · מניעה).

### Request Modes (12)
Incident · Learning · Architecture · Design · SAP Note · Business Process · Interview · Migration ECC→S/4 ·
Development (ABAP/CDS/OData/BAPI/FM) · Performance Review · Authorization Analysis · Configuration Help. HQ auto-picks
the mode + packs. **Learning mode** teaches step-by-step with examples, ECC-vs-S/4 contrast, tables/tcodes/BAPIs/FMs/
IDocs/process, text flow diagrams, and optional practice.

### Phase 1 — Auto Investigation
Per-fault evidence catalog (IDOC→WE02/WE05/BD87/WE09/payload/partner/basic-type · Auth→SU53/SU56/ST01/PFCG · Dump→
ST22/SM21/trace · Update→SM13 · RFC→SM58/SM59 · Gateway/OData→/IWFND|/IWBEP/ERROR_LOG/SICF · Perf→ST12/SAT/ST05/SQLM ·
PI/PO→SXMB_MONI · PP/PM/QM/MM/SD). Requests only what's missing.

### Phase 2 — Expert Packs
20 domain packs; each = existing workers only. HQ selects automatically; the user never chooses.

### Phase 3 — Knowledge Evolution
At RESOLVED: Evidence→Root Cause→Notes→Runbook→Lessons→Knowledge Graph→**Pattern**→Prevention→Memory→**Reusable
Playbook** (`SAP-HQ/playbooks/`). Each incident makes the next faster.

### Operational Intelligence (Mission Control)
Per-incident workspace (`SAP-HQ/incidents/INC-NNNNNN/`), live dashboard, timeline, auto-runbook, knowledge graph,
INC archive, `/hq search`. Engine: `hq/scripts/hq-ops.sh` (writes only under `SAP-HQ/`).

### Memory Integration
Continuous Learning: on user confirmation, persist Problem·Solution·SAP version·Components·Notes·Lessons·Pattern via
`reflexion:memorize` / project MEMORY.md. Read-only until approved.

### HQ Commands
- `/hq <request>` — main entry (command `~/.claude/commands/hq.md` → skill `hq`).
- `/hq search <terms>` — search runbooks/lessons/incidents/archive/memory.
- Backward compatible: `/sherlock`, `/oracle`, `/memory` still work standalone.

### Health Check
`flagship/scripts/healthcheck.sh` — read-only pre-flight; probes 24 internal workers + MCP status; drives the
fallback chains (every chain ends in a built-in, so nothing dead-ends).

## Regression status
✅ PASS. 4 flagship skills discovery-enabled · 8 hq references present · 0 orphans · 0 real broken refs · `/hq`
command intact · both scripts syntax-ok · 24 workers ✅ · playbooks dir present. The only non-green item is by design:
`sc4sap:sap` MCP disconnected → handled by the pasted-evidence fallback.

## Guardrails (unchanged across all versions)
Orchestration only · no new plugins/MCP/agents/skills · Sherlock/Oracle/Memory/Reasoning-Engine never modified after
their creation · `sc4sap:sap` MCP stays disconnected until an approved DEV connection · never commit/push without
approval.
