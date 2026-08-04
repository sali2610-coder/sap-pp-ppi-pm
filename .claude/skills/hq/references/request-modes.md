# HQ Request Modes — knowledge center + investigation center

Before routing, HQ detects the **request type** and adapts behavior. All modes use existing managers + Expert Packs
(`expert-packs.md`) — no new workers. **Incident mode is unchanged** (Interactive Investigation + reasoning engine).

## 1. Auto-detect the mode
Classify the request as one of:

| # | Mode | Signals | Manager(s) | Expert Packs |
|---|---|---|---|---|
| 1 | **Incident** | fault/dump/stuck/error/"תחקור"/tcode+status | **Sherlock** | per fault (PP/PM/IDOC/Auth/…) |
| 2 | **Learning** | "תסביר", "מה זה", "איך עובד", "למד אותי" | **Oracle** (+Memory) | domain of the topic |
| 3 | **Architecture** | "איך לתכנן", "ארכיטקטורה", integration design | **Oracle** | ECC/S4 + BTP + relevant module |
| 4 | **Design** | object/solution design (CDS/RAP/interface) | **Oracle** | ABAP + OData + module |
| 5 | **SAP Note** | "מה אומר Note", find/compare Notes/KBA | **Oracle** | domain of the Note |
| 6 | **Business Process** | "איך עובד תהליך…", O2C/P2P/PP flow | **Oracle** (+Memory) | module (SD/MM/PP/…) |
| 7 | **Interview** | "תראיין אותי", prep, Q&A drill | **HQ-led** (+Oracle) | domain chosen |
| 8 | **Migration ECC→S/4** | "מעבר ל-S/4", simplification, impact | **Oracle** | S/4HANA + ECC + module |
| 9 | **Development** | write/how ABAP/CDS/OData/BAPI/FM | **Oracle** | ABAP + OData |
| 10 | **Performance Review** | analyze/improve performance | **Sherlock** (if live) / Oracle | Performance |
| 11 | **Authorization Analysis** | roles/auth design or a live auth block | **Sherlock** (live) / Oracle | Authorization |
| 12 | **Configuration Help** | "איך להגדיר…", SPRO/customizing | **Oracle** | module |

Rules:
- Ambiguous incident-shaped → **Incident** (Interactive Mode).
- Knowledge-shaped (2-9, 12) → answer directly with Oracle + packs; do NOT open an incident workspace or run the
  Missing-Info gate. No `hq-ops.sh new`.
- HQ still auto-selects the Expert Pack(s); Sali never chooses.
- Every factual claim cites a source or says "לא נמצא מקור" (Oracle discipline). Never fabricate Note numbers.

## 2. Learning Mode (teach like a patient senior mentor)
When mode = Learning (or Business Process / Interview lean), teach in **plain Hebrew**:
1. **הסבר שלב-אחר-שלב** — break the topic into ordered steps, simplest first.
2. **דוגמאות** — a concrete SAP example for each concept (real tcode/table/object).
3. **ECC מול S/4HANA** — always contrast: what's the same, what changed, why (delegate depth to
   `sap-abap-ecc-s4-expert`).
4. **הסבר את האובייקטים** — relevant Tables · Transactions · BAPIs · Function Modules · IDocs · business process.
5. **תרשים זרימה טקסטואלי** — when a flow helps, draw it in text (`A → B → C`), e.g.
   `ORDERS IDoc → IDOC_INPUT_ORDERS → VA01 sales order → ATP → delivery`.
6. **שאלות המשך / תרגול** — offer a follow-up question or a small practice task if it fits ("רוצה תרגיל קצר?").
Keep turns readable — teach in digestible pieces, invite questions; don't dump a textbook at once.

## 3. Incident Mode — UNCHANGED
Exactly as today: Interactive Investigation (`interactive-investigation.md`) + 10-step reasoning engine
(`reasoning-engine.md`) + Operational Intelligence + Knowledge Evolution. This mode is not modified.

## Guardrails
Orchestrator only. No new plugins/MCP/agents/skills. Managers + reasoning engine untouched. `sc4sap:sap` MCP stays
disconnected (pasted evidence for live incidents). Knowledge modes are read-only and never open an incident folder.
