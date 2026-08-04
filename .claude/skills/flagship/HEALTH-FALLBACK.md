# Flagship Health-Check, Fallback & Explain protocol (shared)

Applies to all three top-layer flagships. Each flagship's own `CAPABILITY-REGISTRY.md` lists the concrete
fallback chains; this file defines the mechanics.

## 1. Health check (run BEFORE dispatching any internal worker)

At the start of every task, the flagship runs the pre-flight probe:

```
bash .claude/skills/flagship/scripts/healthcheck.sh
```

It is READ-ONLY and prints AVAILABLE (✅) / MISSING (❌) for every internal worker + MCP status. Interpretation:
- A worker marked ❌ is **not usable** this run → skip straight to its fallback.
- `sc4sap:sap` MCP marked ❌/disconnected → live SAP access is unavailable → fall back to **pasted-evidence** mode
  (always available). Never try to connect it.
- If the probe itself can't run, degrade gracefully: assume built-in tools (WebSearch/WebFetch/Read/Grep/Glob) are
  available, treat all others as "verify before use".

Lightweight per-call check (when not re-running the whole probe): before invoking a skill, confirm it is in the
available-skills list; before an `Agent` dispatch, confirm the `subagent_type` exists; before an MCP tool, confirm
the server is connected.

## 2. Fallback (auto-switch on unavailable OR failed worker)

Every capability has an ordered **fallback chain** (primary → secondary → …) in the flagship's registry. Rule:

1. Try the primary. If health check said ❌, or the call errors / returns empty / times out → move to the next in
   the chain automatically. Do not ask the user; do not stop the task.
2. The **last link in every chain is always a built-in** (WebSearch/WebFetch for Oracle, Grep/Glob+Read for Memory,
   pasted-evidence reasoning for Sherlock) so a task never dead-ends.
3. Record every hop (which worker was tried, why it fell back) for the Explain block.
4. If even the final fallback fails, report clearly what is missing and what artifact/access would unblock it.

## 3. Explain Mode (always emitted at end of every task)

After the flagship's normal deliverable, append a compact block:

```
🔬 Explain — how this was produced
- Health: <✅ all workers up | ❌ X down → fallback used>
- Workers run (in order):
   1. <skill/agent/mcp>  — <why chosen>  — <result: ok | fell back to #2>
   2. ...
- Fallbacks triggered: <none | primary→secondary because …>
- Not used (and why): <e.g. sc4sap:sap MCP — disconnected>
```

Keep it to a few lines. It exists so Sali sees which internal workers ran and why — the workers stay invisible
during the task, but the trail is always shown at the end.

## Guardrails (unchanged)

Read-only probing only. No installs, no version changes, no SAP connection, no duplication. Flagships are the sole
user-facing entry points; every other agent/skill/MCP is an internal worker invoked silently.
