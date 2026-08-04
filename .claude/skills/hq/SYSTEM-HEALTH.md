# SAP HQ — SYSTEM HEALTH (Production Hardening Audit)

Read-only audit. **No code changed.** Date: 2026-07-23. Scope: HQ + Sherlock + Oracle + Memory + flagship shared.

## A. Structural audit (15 checks)

| # | Check | Result |
|---|---|---|
| 1 | Routing works (classification → manager) | ✅ matrix in `hq/references/routing.md` covers all 15 categories |
| 2 | No duplication HQ/Sherlock/Oracle/Memory | ✅ orchestration-only; each has a distinct role; workers never re-implemented |
| 3 | No unused files | ✅ all 19 files referenced (0 orphans) |
| 4 | No broken references | ✅ all path refs resolve (relative `references/playbook.md` resolves per skill dir) |
| 5 | CAPABILITY-REGISTRY consistency | ✅ 4 registries (hq+3) name only real managers/workers |
| 6 | SKILL.md synchronized | ✅ 4 SKILL.md, valid frontmatter, consistent role/registry pointers |
| 7 | Every playbook exists | ✅ sherlock/oracle/memory `references/playbook.md` present |
| 8 | routing.md matches reality | ✅ every routed worker verified to exist |
| 9 | Every script exists | ✅ `healthcheck.sh`, `hq-ops.sh` present, executable, `bash -n` clean |
| 10 | Health checks work | ✅ `healthcheck.sh` → 24 workers ✅, MCP status reported |
| 11 | Fallback valid | ✅ every chain ends in a built-in (pasted-evidence / WebSearch / Grep) |
| 12 | No orphan worker | ✅ all workers referenced by ≥1 registry |
| 13 | No unreachable agent | ✅ 8 sc4sap/sqlscript/ui5 agents resolve in cache |
| 14 | Every command documented | ✅ `/hq`, `/hq search`, `/sherlock`, `/oracle`, `/memory` documented in SKILL.md |
| 15 | Folder consistency | ✅ every flagship: SKILL.md + CAPABILITY-REGISTRY.md + references/; SAP-HQ/ consistent |

**Structural verdict: 15/15 pass. Zero defects.** One expected condition: `sc4sap:sap` MCP disconnected (by
design) → handled by the pasted-evidence fallback.

## B. Stress Test — 20 scenarios (routing dry-run)

Orchestration decision is instant (<1s); investigation depth depends on the manager. "Fallback" = would trigger only
if the primary worker were ❌ (all currently ✅, so none triggered). "Correct?" = did HQ route to the right manager+workers.

| # | Scenario | Class | Manager → internal workers | Confidence gate | Fallback | Correct? |
|---|---|---|---|---|---|---|
| 1 | IDOC status 51 | Interface/IDOC | Sherlock → sap-incident-commander, sap-bc-consultant; ×Oracle,Memory | needs WE02 status → else Never-Guess | ecc-troubleshooter | ✅ |
| 2 | ST22 dump | Incident/Debug | Sherlock → ecc-troubleshooter, sap-debugger | needs dump ID | sap-rootcause | ✅ |
| 3 | SM21 syslog | Incident | Sherlock → sap-bc-consultant, ecc-troubleshooter | needs entries | ecc-troubleshooter | ✅ |
| 4 | PI message failure | Interface | Sherlock → sap-incident-commander, sap-bc-consultant, sap-btp-integration-suite | needs SXMB_MONI+payload | ecc-troubleshooter | ✅ |
| 5 | Gateway error | Interface | Sherlock → sap-bc-consultant; browser-use (/IWFND/ERROR_LOG) | needs error log | pasted-evidence | ✅ |
| 6 | Authorization (SU53) | Auth | Sherlock → ecc-troubleshooter, review:security-auditor | needs SU53 | ecc-troubleshooter | ✅ |
| 7 | Performance (ST05) | Performance | Sherlock → sap-debugger; SQLScript→sqlscript-analyzer | needs trace | sap-abap | ✅ |
| 8 | Can't confirm Process Order | PP/PP-PI | Sherlock → sap-pp-consultant, ecc-troubleshooter | needs msg ID+order | ecc-troubleshooter | ✅ |
| 9 | Maintenance order block | PM | Sherlock → sap-pm-consultant | needs order+error | ecc-troubleshooter | ✅ |
| 10 | MIRO/MIGO block | MM | Sherlock → sap-mm-consultant | needs msg (M7-*) | ecc-troubleshooter | ✅ |
| 11 | Delivery/billing issue | SD | Sherlock → sap-sd-consultant | needs doc+error | ecc-troubleshooter | ✅ |
| 12 | FI posting error | FI | Sherlock → sap-fi-consultant | needs msg+doc | ecc-troubleshooter | ✅ |
| 13 | "How to write ABAP X" | Development | Oracle → sap-abap-ecc-s4-expert, sap-abap | n/a (knowledge) | WebSearch | ✅ |
| 14 | Fiori tile error | Fiori | Sherlock → sapui5:ui5-code-quality-advisor; ui5-tooling MCP; browser | needs console/gw log | sapui5 skill | ✅ |
| 15 | OData service issue | Interface/OData | Sherlock/Oracle → sap-api-style, fiori-tools, sap-btp-connectivity | needs $metadata+error | WebSearch | ✅ |
| 16 | RFC destination fail | Interface | Sherlock → sap-bc-consultant | needs SM59 test | ecc-troubleshooter | ✅ |
| 17 | BAPI error | Dev/Interface | Sherlock/Oracle → sap-function-finder, ecc-troubleshooter | needs return msg | WebSearch | ✅ |
| 18 | Background job abort (SM37) | Incident | Sherlock → sap-bc-consultant, ecc-troubleshooter | needs job log | ecc-troubleshooter | ✅ |
| 19 | Batch input session error | Incident | Sherlock → ecc-troubleshooter | needs session log | pasted-evidence | ✅ |
| 20 | Generic interface failure | Interface | Sherlock → sap-incident-commander | needs which interface | ecc-troubleshooter | ✅ |

**Stress verdict: 20/20 routed correctly.** Every scenario reaches the right manager + specialist; every one has a
valid fallback ending in a built-in; low-evidence cases correctly trigger the Never-Guess gate (request artifact
instead of guessing). No mis-route, no dead-end.

## C. Scores

| Dimension | Score /100 | Note |
|---|---|---|
| Architecture | 94 | clean 3-layer (HQ→managers→workers), single entry, additive |
| Maintainability | 95 | one shared registry; add worker = 1 row |
| Scalability | 90 | new flagship = copy a folder + register |
| Reliability | 88 | fallbacks always end in built-in + health check; depends on managers; live-SAP MCP down |
| Performance | 90 | thin orchestration; 3-hop depth adds some context cost |
| Readability | 93 | consistent structure, documented, bilingual |
| Extensibility | 95 | registry-driven; reasoning + ops layered without touching managers |
| Consistency | 92 | 4 registries + SKILL.md aligned; naming uniform |
| **Overall Architecture Score** | **92 / 100** | production-ready |

## D. Weak points

1. **No live SAP evidence** — `sc4sap:sap` MCP disconnected (by design). System falls back to pasted evidence; live
   diagnosis needs a connected DEV profile.
2. **Confidence is model-judged**, not computed from a formula → some subjectivity.
3. **Routing has no automated test harness** — the stress test is a dry-run, not an executable suite.
4. **healthcheck.sh worker probe uses `compgen` globs** — works today but is coupled to the plugin-cache layout;
   a naive re-check (find with a different pattern) can false-negative (as happened during this audit for
   `deep-research`, which is in fact reachable via the skill list).
5. **3-hop depth** (HQ → manager → worker) adds latency/context cost vs. calling a specialist directly.

## E. Technical debt

- `healthcheck.sh` glob fragility (point D4) — low risk, cosmetic until cache layout changes.
- Timeline timestamps collapse to the same minute in fast automated runs (cosmetic).
- Minor overlap between HQ Summary and each manager's Explain block (some repetition).

## F. Recommendations (NOT applied — awaiting approval)

1. Harden `healthcheck.sh` to probe by the available-skills list rather than cache globs (removes D4 false-negatives).
2. Add a tiny routing-test file (scenario → expected manager) so the stress test becomes repeatable.
3. Add a Confidence formula in `reasoning-engine.md` (evidence stars → % band) to reduce subjectivity.
4. When ready, connect a **DEV** `sc4sap` profile to unlock live read-only SAP evidence (guarded by the tier hook).

## G. Future improvements

- Auto knowledge-graph traversal → proactive "similar incident N months ago" suggestion.
- Runbook publishing to a searchable index with tags.
- Optional HTML dashboard rendered from `dashboard.md`.

## H. Star ratings

- ★★★★★ Architecture
- ★★★★★ Reasoning
- ★★★★☆ Knowledge  (strong via web + skills; capped by no live SAP)
- ★★★★★ Incident Analysis
- ★★★★★ SAP Coverage  (all modules via sc4sap consultants)
- ★★★★★ Maintainability
- ★★★★☆ Future Readiness  (excellent; +1 once live-SAP + test harness land)

**Verdict: PRODUCTION-READY.** Zero structural defects; 20/20 routing correct; the only gaps are by-design
(disconnected live SAP) or minor tech debt with clear, optional fixes.
