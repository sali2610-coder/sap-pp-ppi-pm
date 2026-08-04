# HQ — User Guide (v1.0)

Your single door to everything SAP. Type `/hq` + what you need. HQ figures out the rest.

## How to start HQ
- **`/hq <your request>`** — the main entry. Works in every project (global skill + command).
- `/hq search <terms>` — search past incidents / runbooks / lessons / Notes / memory.
- Also available directly: `/sherlock` (investigate), `/oracle` (knowledge), `/memory` (history).
- First time after install: restart Claude Code so `/hq` appears in the `/` autocomplete.

## What HQ handles (12 request modes — auto-detected)
Incident · Learning · Architecture · Design · SAP Note · Business Process · Interview · Migration ECC→S/4 ·
Development (ABAP/CDS/OData/BAPI/FM) · Performance Review · Authorization Analysis · Configuration Help. You never
pick the mode or the experts — HQ decides.

## Architecture (short)
```
/hq → Reasoning Engine → Sherlock / Oracle / Memory → Expert Packs → Playbooks → Final Recommendation
```

## Examples

### Incident
```
/hq יש IDoc בסטטוס 51, inbound ORDERS, לא נרשם
```
HQ: identifies IDoc fault → asks ONLY what's missing (status-51 text + IDoc number + partner/basic type) → waits →
runs Sherlock (IDOC + SD packs) → RCA in plain Hebrew → HQ Summary → offers to save a playbook.

### Learning
```
/hq תסביר לי מה זה CDS View ומתי משתמשים בו
```
HQ: teaches step-by-step in Hebrew, gives examples, contrasts ECC vs S/4, explains tables/tcodes/annotations, draws a
text flow, and offers a short practice question. No investigation, no workspace.

### Architecture
```
/hq איך לתכנן ממשק בין S/4 לצד שלישי דרך BTP
```
HQ (Architecture mode → Oracle + BTP/ECC-S4 packs): options (IDoc/OData/RAP/Integration Suite), trade-offs, ECC vs
S/4 delta, security/destinations, a recommended pattern with sources.

### Migration ECC → S/4HANA
```
/hq מה ההשפעה של המעבר ל-S/4 על טבלאות MM
```
HQ (Migration mode → sap-forecaster + sap-abap-ecc-s4-expert): simplification items, MATDOC/BSEG changes, custom-code
impact, what breaks, what to test.

### Interview
```
/hq תראיין אותי על PP-PI לקראת ראיון עבודה
```
HQ (Interview mode): asks graded questions, checks answers, explains gaps, ramps difficulty.

### Business Process
```
/hq תסביר את תהליך Order-to-Cash ב-SD
```
HQ (Business Process mode → SD pack): the end-to-end flow as a text diagram (order→delivery→PGI→billing→FI) with the
key tcodes/tables/BAPIs at each step, ECC vs S/4 notes.

## Best Practices
- Paste the **evidence** HQ asks for (ST22/WE02/SU53/payload…) — it will not guess without it.
- For a live incident, give the exact **message ID + screenshot** first; that jumps confidence fastest.
- Let HQ save a **playbook** when a fix works — the next similar incident gets solved much faster.
- Use `/hq search` before a new investigation — you may have solved it already.
- Keep one incident per `/hq` thread so the workspace/timeline stays clean.

## Do's & Don'ts
**Do**
- Do start everything SAP with `/hq`.
- Do trust the auto-mode + auto-expert selection.
- Do approve saving lessons to Memory after a real fix.
- Do connect a **DEV** sc4sap profile (later) if you want live read-only SAP evidence.

**Don't**
- Don't expect a certain fix at low confidence — HQ will say "אני צריך עוד ראיות" on purpose.
- Don't connect sc4sap to QA/PRD — writes are blocked by design; keep it DEV-only.
- Don't hand-edit files under `SAP-HQ/` mid-incident — let HQ manage them.
- Don't bypass HQ to memorize the dozens of sub-agents — that's HQ's job.

## Where things live
- System: `.claude/skills/{hq,flagship,sherlock,oracle,memory}/` · command: `~/.claude/commands/hq.md`
- Runtime data: `SAP-HQ/` (incidents, archive, runbooks, playbooks, knowledge-graph, lessons-learned)
- Health probe: `.claude/skills/flagship/scripts/healthcheck.sh`
