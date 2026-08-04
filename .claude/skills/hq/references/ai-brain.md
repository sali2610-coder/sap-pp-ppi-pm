# SAP AI Brain — HQ decision engine (dynamic, not hard routing)

HQ is not a fixed router. It is a **decision engine** that, on every `/hq`, reads two data files and decides for
itself which capability to use:
- **`SAP-HQ/brain.json`** — the RULES (intents, evidence weights, confidence bands, routing/reasoning rules).
- **`SAP-HQ/capability-registry.json`** — the live INVENTORY of what exists in this project (+ expert packs).

**Never hardcode worker names.** Resolve them at runtime: intent → expert pack (name from the registry) → workers
(from `references/expert-packs.md`). If a worker is absent, use its fallback chain; a missing worker is never fatal.

## The 7 brain steps (run in order)

1. **Intent Detection** — score the request against `brain.json.1_intentDetection.intents` (Incident · Learning ·
   Architecture · Migration · SAP Note · ABAP · Debug · Authorization · Performance · Integration · PP · PP-PI · PM ·
   MM · FI · CO · QM · BTP · Fiori · CDS · RAP …). Pick the highest-scoring; allow multi-intent (e.g. IDoc + SD).
2. **Capability Matching** — load `capability-registry.json`; select the matching **Expert Pack(s)** + managers
   dynamically. Prefer project-local, else global, else built-in. The 3 managers (Sherlock/Oracle/Memory) are fixed
   roles; their workers are resolved live.
3. **Evidence Evaluation** — classify what the user provided against `brain.json.3_evidenceEvaluation` (screenshot ·
   ST22 dump · WE02/IDoc · SM21 · SM58 · SMQ1/2 · SE16 · debug · code · SAP Note …), each with a star weight. If no
   ≥3★ evidence for the intent → mark **INSUFFICIENT**.
4. **Confidence Engine** — Low (<50) / Medium (50-69) / High (70-89) / Verified (90-100) per `brain.json`. Low →
   Never-Guess (request exact evidence). Verified needs ≥4★ evidence + a confirming Note or past match.
5. **Execution Plan** — before answering, state the plan (4 steps): Observe+Classify → Evidence+Missing-Info →
   Capability match+dispatch → Reasoning/RCA+Summary.
6. **Reasoning Tree** — record WHY each was engaged (Sherlock/Oracle/Memory/Pack), each with a basis label:
   `נבדק בפועל` / `מבוסס על קובץ` / `צילום מסך` / `ידע` / `דורש אימות במערכת SAP`.
7. **Response** — the fixed HQ Summary (Diagnosis · Confidence · Evidence · Workers · Next), Hebrew.

## Full decision flow
```
User
  ↓  /hq <request>
HQ (decision engine)
  ↓  reads brain.json + capability-registry.json
Intent Detection      → which intent(s) / mode / expert pack
  ↓
Evidence Evaluation   → what's provided (★) / what's missing
  ↓
Capability Matching   → dynamic: pack → workers (project→global→fallback)
  ↓
Routing (soft)        → Sherlock | Oracle | Memory (+ cross-calls)
  ↓
Reasoning Tree        → why each engaged + basis label + Confidence band
  ↓
Execution             → run managers/packs (or request missing evidence — Never-Guess)
  ↓
Response              → HQ Summary (Hebrew)
```

## Why this is an engine, not hard routing
- Rules live in **data** (`brain.json`), inventory in **data** (`capability-registry.json`) — behavior changes by
  editing data, not the skill logic.
- Multi-intent, evidence-weighting, and confidence bands produce a *decision*, not a fixed lookup.
- Everything degrades: absent MCP/agent/skill → fallback chain → built-in (files/web/pasted evidence). Cloud/phone
  safe. Never claims a live SAP check that did not happen; never invents a SAP Note/KBA number.
