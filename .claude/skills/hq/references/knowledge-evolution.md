# Phase 3 — Knowledge Evolution (every resolved incident makes the next one faster)

Runs automatically at incident close, on top of Operational Intelligence (Phase 3 workspace) + Memory. Uses only
existing tooling (`hq-ops.sh`, Memory, `reflexion:memorize`). No new agents/MCP/plugins.

## The evolution pipeline (auto, at RESOLVED)

```
Incident → Evidence → Root Cause → SAP Notes → Recommendations → Runbook →
Lessons Learned → Knowledge Graph → Pattern → Future Prevention → Memory → Reusable Playbook
```

Step-by-step, each mapped to an existing action:

| Stage | Action (existing) | Artifact |
|---|---|---|
| Incident | already open | `SAP-HQ/incidents/INC-*/` |
| Evidence | dropped in subfolders + timeline | `evidence/ st22/ we02/ … timeline.md` |
| Root Cause | Sherlock's single conclusion | `root-cause.md` |
| SAP Notes | Oracle findings | `sap-notes/` + `runbook.md` (Notes/KBA) |
| Recommendations | HQ Explain-Why | `recommendations.md` |
| Runbook | HQ completes it | `runbook.md` → copy to `SAP-HQ/runbooks/` |
| Lessons Learned | what worked / didn't | `lessons-learned.md` |
| Knowledge Graph | link the nodes | `hq-ops.sh graph <INC> "<from>" "<to>"` |
| **Pattern** | generalize the signature | one line: `<fault signature> ⇒ <root cause> ⇒ <fix>` |
| Future Prevention | config/monitor/check | in `runbook.md` + `lessons-learned.md` |
| Memory | persist on approval | `reflexion:memorize` / project `MEMORY.md` |
| **Reusable Playbook** | generalized runbook | `SAP-HQ/playbooks/<pattern>.md` (write via the Write tool; `mkdir -p SAP-HQ/playbooks` first) |

## Reusable Playbook format (`SAP-HQ/playbooks/<pattern>.md`)
```
# Playbook: <fault pattern, e.g. IDoc-51-inbound-ORDERS-partner-not-found>
Trigger signature: <how to recognize it fast>
Ask-for (Phase 1): <the minimal evidence to request>
Expert Pack (Phase 2): <which existing workers>
Root cause (typical): <...>
Fix: <steps>
Validation: <how to confirm>
Prevention: <config/monitor>
SAP Notes/KBA: <numbers>
Seen in: <INC ids>
```

## How the next incident gets faster
On a new incident, HQ (via **Memory** + `hq-ops.sh search`) checks `SAP-HQ/playbooks/` and the knowledge graph
first. If the fault signature matches a playbook → HQ says "ראיתי תבנית דומה (INC-XXXX)" and jumps straight to the
known ask-for + likely root cause + fix (still confirming with evidence — Never-Guess holds). Each resolved incident
adds or sharpens a playbook, so coverage compounds.

## Guardrails
Read-only until Sali approves the Memory/playbook write. Writes only under `SAP-HQ/`. Never modifies HQ core,
Sherlock/Oracle/Memory, the reasoning engine, plugins, or MCP.
