# HQ Operational Intelligence (Phase 3) — Mission Control

Additive layer on top of HQ. Turns each investigation into a tracked mission with a live dashboard, timeline,
workspace, auto-runbook, knowledge graph, archive, and search. **No new plugins/MCP. Sherlock/Oracle/Memory and the
HQ Reasoning Engine are untouched** — this layer only records/organizes what they produce.

Workspace root: **`SAP-HQ/`** (created on first use). Engine script: `.claude/skills/hq/scripts/hq-ops.sh`
(writes only under `SAP-HQ`, read-only elsewhere). HQ calls it via `Bash`.

## When HQ opens vs. skips a mission
- Open a mission (workspace) for a real **incident/investigation**. For a quick question (Oracle) or a lookup
  (`/hq search …`) HQ does not create a folder.

## The 8 components

### 1. HQ Dashboard (live, CLI-friendly)
Render this block in chat and update it at each reasoning phase; persist to `<INC>/dashboard.md`.
```
HQ · <INC-id>
Incident: <title>
Phase:  ✔ Observe  ✔ Classify  🔄 Sherlock  ⏳ Oracle  ⏳ Memory
Confidence: 91%
Evidence:   █████████░
Running Workers: Sherlock · Oracle · sap-pp-consultant · sap-debugger
```
Legend: ✔ done · 🔄 running · ⏳ pending. Evidence bar = 10 blocks ≈ evidence completeness.

### 2. Investigation Timeline
Every event is timestamped: `hq-ops.sh event <INC> "<text>"` → appends `HH:MM  <text>` to `<INC>/timeline.md`.
Log: upload received, each manager start, each Note/KBA/memory hit, confidence changes, final recommendation.

### 3. SAP Workspace (per incident)
`hq-ops.sh new "<title>" <module>` scaffolds:
```
INC-000001__<slug>__<module>__<date>/
  screenshots/ st22/ sm21/ we02/ payload/ logs/ sap-notes/ evidence/
  dashboard.md timeline.md diagnosis.md root-cause.md
  recommendations.md validation.md lessons-learned.md runbook.md
```
Drop artifacts into the matching subfolder; HQ fills the `.md` files during the investigation.

### 4. Auto Runbook Generator
At incident close, HQ completes `<INC>/runbook.md` (seeded on `new`): Title · Environment · Symptoms · Business
Impact · Evidence · Root Cause · SAP Notes · KBA · Fix · Validation · Lessons Learned · Recommendations · Tags ·
Owner · Date · Confidence. Copy the finished runbook to `SAP-HQ/runbooks/` for cross-incident search.

### 5. Knowledge Graph
`hq-ops.sh graph <INC> "<from>" "<to>"` appends an edge to `SAP-HQ/knowledge-graph/graph.md`. Build chains like
`IDOC 51 → WE20 → Partner Profile → SAP Note → KBA → PI → Payload → Lessons Learned → Previous Incidents`. Over time
HQ traverses the graph to suggest "similar incident 7 months ago".

### 6. Incident Archive
Every incident gets an ID `INC-NNNNNN` and a row in `SAP-HQ/archive/index.md`: INC · Date · Module · Status ·
Confidence · Title. `hq-ops.sh status <INC> <OPEN|RESOLVED|CLOSED> <confidence>` updates it. `hq-ops.sh list` prints it.

### 7. Search Engine
`/hq search <terms>` → `hq-ops.sh search <terms>` greps runbooks, lessons-learned, incidents, archive, and the
Memory notes. Examples: `/hq search idoc 51`, `/hq search WE20`, `/hq search message RU806`, `/hq search COHV`.
HQ presents the hits and offers to open the most similar past incident.

### 8. Fixed end-of-investigation Summary (extends the HQ Summary)
```
━━━━━━━━━━━━━━━━━━━━━━
HQ Summary · <INC-id>
Diagnosis:
Confidence:            <NN%>
Evidence Used:         <★-rated list>
Workers Used:          <managers + internal workers>
SAP Notes:             <numbers>
KBA:                   <numbers>
Previous Similar Incidents: <INC ids or "none">
Root Cause:
Recommended Fix:
Validation Steps:
Next Actions:
━━━━━━━━━━━━━━━━━━━━━━
```

## HQ ops flow (per incident)
1. `hq-ops.sh new "<title>" <module>` → get INC id + folder.
2. Log intake + each phase with `event`; add `graph` edges as knowledge links appear.
3. Run the normal HQ Reasoning Engine (managers untouched); write diagnosis/root-cause/recommendations/validation
   into the workspace `.md` files as they firm up.
4. On close: complete `runbook.md`, copy to `runbooks/`, write `lessons-learned.md`, `status <INC> RESOLVED <conf>`.
5. Continuous Learning: on Sali's confirmation, Memory persists the pattern (unchanged from Phase 2).

## Guardrails
Writes only under `SAP-HQ`. Never modifies Sherlock/Oracle/Memory, the reasoning engine, plugins, MCP, or any
project. Never commit/push. Never guess (Phase 2 Never-Guess still governs the content).
