# מטריצת יכולות SAP (Capability Matrix)

> **מקור המידע:** `/tmp/sap-brain-facts.md` (תמונת מצב מאומתת 2026-07-23) + קבצי HQ תחת
> `~/.claude/skills/hq/references/`. שורה אחת לכל תחום. מולאו רכיבים **אמיתיים בלבד**.
> ערך שלא אומת מסומן "לא אומת". רכיב MCP שנכשל/דורש-אימות אינו מוצג כמחובר.

## מקרא סטטוס
- **מותקן** — הפלאגין/סקיל קיים במערכת (מתוך `installed_plugins.json`).
- **פעיל** — סקיל/סוכן זמין לשימוש דרך HQ.
- **מחובר** — שרת MCP במצב **✔ Connected** ב-`claude mcp list`.
- **דורש-אימות** — MCP במצב **! Needs authentication**.
- **נכשל** — MCP במצב **✘ Failed to connect** (למשל `sc4sap:sap`).

> הערה על MCP בעמודה: כברירת מחדל, תחומי SAP הפונקציונליים (PP/PM/MM/…) היו נשענים על `sc4sap:sap`
> לראיות חיות — אך הוא **נכשל/מנותק**. לכן בעמודת MCP נרשם "sc4sap:sap (נכשל)" והעבודה בפועל היא על
> ראיות מודבקות. MCP שמחובר ורלוונטי (fiori-tools, ui5-tooling) נרשם במפורש; אחרת נרשם "— (ראיות מודבקות)".

## המטריצה

| תחום | Plugins | Skills | Agents | Commands | MCP | Hooks | שימוש |
|---|---|---|---|---|---|---|---|
| **ECC** | sc4sap | `sap-ecc-troubleshooter`, `sap-abap-ecc-s4-expert` | sc4sap:sap-analyst, sap-architect | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת ECC Expert; הקשר ECC קלאסי, אבחון תקלות |
| **S/4HANA** | sc4sap, sap-abap | `sap-abap-ecc-s4-expert`, `sap-forecaster`, `sap-abap` (skill) | sc4sap:sap-architect, sap-analyst | sap-abap cmd | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת S/4HANA Expert; simplification, impact, דלתא ECC↔S/4 |
| **PP** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-pp-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת PP Expert; order/confirmation/MRP/routing/BOM/work center |
| **PP-PI** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-pp-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת PP Expert (PP-PI); process order/confirmation |
| **PM** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-pm-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת PM Expert; notification/order/equipment/func-location/status |
| **MM** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-mm-consultant, sap-stocker | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת MM Expert; material/PO/GR/stock, שגיאות M7-* |
| **SD** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-sd-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת SD Expert; sales order/delivery/billing, O2C |
| **FI** | sc4sap | — | sc4sap:sap-fi-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת FI Expert; posting/GL/AP/AR |
| **CO** | sc4sap | — | sc4sap:sap-co-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת CO Expert; cost center/order/CO-PA |
| **QM** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-qm-consultant, sap-qa-tester | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת QM Expert; inspection lot/usage decision |
| **BW** | sc4sap | — | sc4sap:sap-bw-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת Basis/דיווח; הקשר BW (דרך יועץ BW) |
| **ABAP** | sap-abap, sc4sap | `sap-abap` (skill), `sap-abap-ecc-s4-expert` | sc4sap:sap-code-reviewer, sap-debugger, sap-executor | sap-abap:sap-abap, abap-cloud-review | sc4sap:sap (נכשל) → ראיות מודבקות | sap-abap hook (לא אומת פרטני); sc4sap hook | חבילת ABAP Expert; dump/code/enhancement/debug |
| **CDS** | sap-abap-cds | `sap-abap-cds` (skill) | — | — | — (ראיות מודבקות) | — | חבילת OData/Design; CDS Views, annotations |
| **Fiori** | sap-fiori-tools | `sap-fiori-tools` (skill) | — | — | **sap-fiori-tools:fiori-tools (מחובר ✔)** | sap-fiori hook (לא אומת פרטני) | חבילת Fiori Expert; tile/UI5 error, generate/modify Fiori app |
| **UI5** | sapui5, sapui5-cli, sapui5-linter | `sapui5` (skill), `sapui5-cli`, `sapui5-linter` | sapui5:ui5-* agents (4) | sapui5 cmds (5) | **sapui5:ui5-tooling (מחובר ✔)** | sapui5 hook | scaffold/lint/api/version; ui5-code-quality-advisor |
| **BTP** | sap-btp-connectivity, -integration-suite, -service-manager, -cloud-platform, -cias, -cloud-logging, -cloud-transport-management, -developer-guide, -master-data-integration | סקילי BTP המתאימים (skill אחד לפלאגין) | — | sap-btp-master-data-integration cmd | — (ראיות מודבקות) | sap-dependency-security hook | חבילת BTP Expert; destination/connectivity/CF |
| **Integration Suite** | sap-btp-integration-suite | `sap-btp-integration-suite` (skill) | — | — | — (ראיות מודבקות) | — | חבילת PI/PO Expert; CPI/iFlow (הקשר Integration Suite) |
| **IDoc** | sc4sap | `sap-incident-commander`, `sap-ecc-troubleshooter` | sc4sap:sap-bc-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת IDOC Expert; WE02/WE05/status 51-64 |
| **RFC** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-bc-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת Basis Expert; SM58/SM59/gw, RFC-dest |
| **PI/PO** | sap-btp-integration-suite, sc4sap | `sap-btp-integration-suite`, `sap-ecc-troubleshooter` | sc4sap:sap-bc-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת PI/PO Expert; SXMB_MONI/payload/channel |
| **Gateway** | sc4sap, sap-btp-connectivity | `sap-btp-connectivity`, `sap-ecc-troubleshooter` | sc4sap:sap-bc-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sap-dependency-security hook | חבילת Gateway Expert; /IWFND/ERROR_LOG, SICF |
| **OData** | sap-api-style, sap-abap-cds, sap-fiori-tools | `sap-api-style`, `sap-abap-cds` (skills) | — | — | **sap-fiori-tools:fiori-tools (מחובר ✔)** — download_odata_service_metadata | — | חבילת OData Expert; שירות OData/$metadata |
| **Authorizations** | sc4sap | `sap-ecc-troubleshooter` | sc4sap:sap-bc-consultant | — | sc4sap:sap (נכשל) → ראיות מודבקות | sc4sap hook | חבילת Authorization Expert; SU53/SU56/ST01/PFCG + security-auditor |
| **Performance** | sc4sap, sap-sqlscript | `sap-sqlscript` (skill) | sc4sap:sap-debugger, sap-sqlscript agents (3) | sap-sqlscript cmds (4) | sc4sap:sap (נכשל) → ראיות מודבקות | sap-sqlscript hook | חבילת Performance Expert; ST05/SAT/SQLM, sqlscript-analyzer |
| **HANA** | sap-sqlscript, sap-btp-cloud-platform | `sap-sqlscript` (skill) | sap-sqlscript agents (3) | sap-sqlscript cmds (4) | — (ראיות מודבקות) | sap-sqlscript hook | ניתוח/אופטימיזציה של SQLScript על HANA. הערה: `sap-hana-cli` MCP לא הותקן במכוון (דורש creds חיים) — לא אומת |
| **SQLScript** | sap-sqlscript | `sap-sqlscript` (skill) | sqlscript-analyzer + 2 agents | sqlscript-validate, -convert, -optimize, -setup | — (ראיות מודבקות) | sap-sqlscript hook | validate/convert/optimize של SQLScript |
| **Migration** | sc4sap, sap-abap, sap-dependency-security | `sap-abap-ecc-s4-expert`, `sap-forecaster` | sc4sap:sap-architect, sap-analyst | sap-dependency-upgrade-plan | sc4sap:sap (נכשל) → ראיות מודבקות | sap-dependency-security hook | מצב Migration ECC→S/4; simplification/MATDOC/custom-code impact |
| **Testing** | sc4sap, tdd | `sap-ecc-troubleshooter` (test scenario) | sc4sap:sap-qa-tester, sap-critic | tdd cmds | — (ראיות מודבקות) | tdd (לא אומת פרטני) | תרחישי בדיקה לתקלות; QA לפני מסירה |
| **Documentation** | sc4sap, docs (context-engineering-kit) | `sap-document-intelligence`, `sap-knowledge-builder` | sc4sap:sap-doc-specialist, sap-writer | docs cmds | Google Drive/Gmail (מחובר ✔) לקלט מסמכים | — | ניתוח מסמכי SAP + בניית ידע; Documentation mode |

---

## הבהרות שקיפות (חשוב)

1. **`sc4sap:sap` מנותק.** בכל שורה שבה נרשם "sc4sap:sap (נכשל)", אין חיבור חי ל-SAP. סוכני sc4sap
   עדיין זמינים כידע פונקציונלי, אך המערכת עובדת על **ראיות מודבקות** שהמשתמש מספק. זה מצב ה-fallback המתוכנן.

2. **MCP מחוברים ורלוונטיים ל-SAP:** רק `sap-fiori-tools:fiori-tools` ו-`sapui5:ui5-tooling` מחוברים (✔).
   שאר החיבורים המחוברים (Google Drive, Gmail, Calendar, Figma, magic, mobbin, browser-use) אינם ליבת SAP
   אך משמשים ל-Documentation/קלט מסמכים.

3. **Hooks פרטניים לא אומתו לרמת האירוע.** מתמונת המצב ידוע אילו פלאגינים כוללים hook (למשל sap-sqlscript,
   sap-dependency-security, sapui5, sc4sap), אך המיפוי המדויק של סוג ה-event לכל תחום סומן "לא אומת" היכן שלא נבדק.

4. **חבילות המומחים (Expert Packs)** אינן מוסיפות יכולת חדשה — הן רק בוחרות אילו עובדים קיימים HQ מפעיל
   לכל תחום (מקור: `references/expert-packs.md`, 20 חבילות).

5. **BW** מיוצג באמצעות `sc4sap:sap-bw-consultant` בלבד; אין סקיל/MCP ייעודי ל-BW — היכולת היא ברמת יידע יועץ.

---

*סביבות: ECC6 + S/4HANA On-Premise. דגש: PP / PP-PI / PM / ממשקים / troubleshooting. כל הרכיבים אמיתיים; לא הומצאו רכיבים, גרסאות או מספרים.*
