# קטלוג תוספי ה-SAP (SAP Plugins Catalog)

> **מקור הנתונים:** snapshot מאומת מ-`/tmp/sap-brain-facts.md` (2026-07-23) + קריאה ישירה (read-only) של `~/Downloads/sap-skills/`.
> **כלל ברזל:** כל עובדה מצוינת עם מקורה. ערך שלא אומת מסומן "לא אומת". לא הומצאו רכיבים, גרסאות, הערות SAP או מספרים.
> **מקרא סטטוס:** *מותקן* = קיים ב-`installed_plugins.json` · *פעיל* = ה-Skill/הפקודה זמינים לשימוש · *מחובר* = ה-MCP שלו מדווח Connected · *דורש-אימות* = Needs authentication · *נכשל* = Failed to connect.

---

## מהו "תוסף" (Plugin) בהקשר הזה?

תוסף (plugin) הוא חבילה שמתקינים ממרקטפלייס (marketplace). כל תוסף יכול לארוז בתוכו כמה סוגי רכיבים:
- **skills** — מיומנויות (הידע/ההוראות שקלוד טוען לפי הצורך).
- **agents** — סוכנים (תת-מומחים ייעודיים).
- **commands** — פקודות סלאש (למשל `/sqlscript-validate`).
- **hooks** — הוקים (קוד שרץ אוטומטית באירועים מסוימים).
- **mcp** — שרת MCP (גשר לכלי/מערכת חיצונית).

בעולם ה-SAP מותקנים כרגע **20 תוספי SAP**: 19 מהמרקטפלייס `sap-skills` + התוסף `sc4sap` ממרקטפלייס נפרד.

---

## מהו מרקטפלייס `sap-skills` — והיכן מקורו

- **שם המרקטפלייס:** `sap-skills`
- **סוג המקור:** `directory` (ספרייה מקומית) — **`/Users/salihalif/Downloads/sap-skills`**
  *(מקור: `known_marketplaces.json` → `sap-skills | directory | /Users/salihalif/Downloads/sap-skills`)*
- **מקור upstream (הריפו הציבורי):** `secondsky/sap-skills` — GitHub, בעלים Eduard Jiglau
  *(מקור: `~/Downloads/sap-skills/.claude-plugin/marketplace.json` → `"repository": "https://github.com/secondsky/sap-skills"`)*
- **גרסת מרקטפלייס:** `2.4.0` · עודכן `2026-07-19` · מכריז על **40 תוספים** זמינים
  *(מקור: `marketplace.json` metadata)*
- **חשוב:** מותקנים אצל Sali רק **19** מתוך 40 התוספים הזמינים במרקטפלייס. 21 הנותרים זמינים אך לא מותקנים.

> נקודה מהותית: המרקטפלייס מוגדר כ**ספרייה מקומית** ב-`~/Downloads`, לא כ-git remote. משמעות מעשית — עדכונים לא מגיעים אוטומטית מ-GitHub; יש למשוך/לרענן את הספרייה המקומית ידנית כדי לקבל גרסאות חדשות. (השוואת גרסאות מול upstream = **לא אומת** מסביבה זו.)

**40 התוספים הזמינים במרקטפלייס** (מתוך סריקת `~/Downloads/sap-skills/plugins/`):
sap-abap · sap-abap-cds · sap-ai-core · sap-api-policy · sap-api-style · sap-browser-automation · sap-btp-best-practices · sap-btp-build-work-zone-advanced · sap-btp-business-application-studio · sap-btp-cias · sap-btp-cloud-identity-services · sap-btp-cloud-logging · sap-btp-cloud-platform · sap-btp-cloud-transport-management · sap-btp-connectivity · sap-btp-developer-guide · sap-btp-integration-suite · sap-btp-intelligent-situation-automation · sap-btp-job-scheduling · sap-btp-master-data-integration · sap-btp-service-manager · sap-bw-query · sap-cap-capire · sap-cloud-sdk-ai · sap-cloud-sdk-ai-python · sap-datasphere · sap-dependency-security · sap-fiori-tools · sap-hana-cli · sap-hana-cloud-data-intelligence · sap-hana-ml · sap-rpt1 · sap-sac-custom-widget · sap-sac-planning · sap-sac-scripting · sap-sac-test-automation · sap-sqlscript · sapui5 · sapui5-cli · sapui5-linter

---

## טבלת-על: 20 תוספי ה-SAP המותקנים

הספירות (skills/agents/cmds/hooks/mcp) לקוחות מסריקת ה-cache ב-snapshot. "עדכון זמין?" מול upstream = **לא אומת** (המרקטפלייס מקומי).

| # | תוסף | גרסה | מרקטפלייס | סטטוס | skills | agents | cmds | hooks | mcp | תחום SAP עיקרי |
|---|------|------|-----------|-------|:---:|:---:|:---:|:---:|:---:|------|
| 1 | **sc4sap** | 0.6.14 | sc4sap (git) | מותקן · MCP **נכשל** | 16 | 28 | 0 | 1 | 1 | פונקציונלי רוחבי + ABAP (28 סוכני מודול) |
| 2 | **sap-abap** | 2.4.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 1 | 0 | 0 | פיתוח ABAP (קלאסי + Cloud/RAP) |
| 3 | **sap-abap-cds** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | מידול נתונים CDS |
| 4 | **sap-fiori-tools** | 2.2.0 | sap-skills (dir) | מותקן · MCP **מחובר** | 1 | 0 | 0 | 0 | 1 | פיתוח אפליקציות Fiori |
| 5 | **sapui5** | 2.2.0 | sap-skills (dir) | מותקן · MCP **מחובר** | 1 | 4 | 5 | 1 | 1 | פיתוח UI5 (frontend) |
| 6 | **sapui5-cli** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | כלי CLI ל-UI5 |
| 7 | **sapui5-linter** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | בדיקת קוד UI5 (lint) |
| 8 | **sap-sqlscript** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 3 | 4 | 1 | 0 | SQLScript ל-HANA |
| 9 | **sap-btp-integration-suite** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | אינטגרציה (Integration Suite/CPI) |
| 10 | **sap-btp-connectivity** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | קישוריות BTP (Cloud Connector וכו') |
| 11 | **sap-api-style** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | סגנון/עיצוב API |
| 12 | **sap-api-policy** | 2.4.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | תאימות מדיניות SAP API |
| 13 | **sap-dependency-security** | 2.4.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 1 | 1 | 0 | אבטחת תלויות/שרשרת אספקה |
| 14 | **sap-btp-master-data-integration** | 2.4.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 1 | 0 | 0 | שילוב מאסטר-דאטה (MDI) |
| 15 | **sap-btp-cias** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | Cloud Integration Automation Service |
| 16 | **sap-btp-cloud-logging** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | Cloud Logging (BTP) |
| 17 | **sap-btp-cloud-transport-management** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | Transport Management (BTP) |
| 18 | **sap-btp-developer-guide** | 2.2.0 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | מדריך מפתח BTP |
| 19 | **sap-btp-service-manager** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | Service Manager (BTP) |
| 20 | **sap-btp-cloud-platform** | 2.2.2 | sap-skills (dir) | מותקן · פעיל | 1 | 0 | 0 | 0 | 0 | פלטפורמת BTP (כללי) |

> **הערת גרסאות:** גרסאות התוספים אינן אחידות — חלק ב-2.4.0, חלק ב-2.2.2, חלק ב-2.2.0. גרסת המרקטפלייס עצמה היא 2.4.0. אי-אחידות זו נובעת מכך שכל תוסף מתוארך למועד ההתקנה שלו (ראו עמודת install date ב-snapshot). האם קיים "עדכון זמין" בפועל = **לא אומת** (מרקטפלייס מקומי, ללא בדיקת remote).

### כפילויות (duplicates)
- **אין כפילות בתוך תוספי ה-SAP** — כל 20 התוספים ייחודיים בשמם ובתחומם.
- כפילות קיימת מחוץ ל-SAP במערכת הכללית: `superpowers` מותקן פעמיים (מ-`claude-plugins-official` v6.1.1 וגם מ-`superpowers-marketplace` v5.1.0). **זה לא נוגע לתוספי SAP** ומוזכר רק לשלמות התמונה.
- חפיפה פונקציונלית (לא כפילות ממש): `sc4sap` כולל סוכני ABAP/CDS משלו (`sap-code-reviewer`, `sap-debugger`) שחופפים בתחום ל-`sap-abap` ו-`sap-abap-cds`. אלה משלימים, לא מתנגשים — ראו המלצות למטה.

---

## סקשנים עמוקים לפי תוסף

### 1. sc4sap (SuperClaude for SAP) — התוסף הפונקציונלי הגדול
- **גרסה:** 0.6.14 · **מרקטפלייס:** `sc4sap` · **סוג מקור:** `git` → `https://github.com/babamba2/superclaude-for-sap.git` *(מקור: known_marketplaces.json)*
- **סטטוס:** *מותקן* ופעיל כ-Skills/Agents, אבל שרת ה-MCP שלו **נכשל בחיבור**.
  *(מקור: `claude mcp list` → `plugin:sc4sap:sap ... ✘ Failed to connect`; healthcheck → `❌ DISCONNECTED (fallback: pasted evidence)`)*
- **רכיבים:** 16 skills · **28 agents** · 0 cmds · 1 hook · 1 mcp (המרובה ביותר במערכת).
- **28 הסוכנים** *(מקור: snapshot "sc4sap AGENTS")*:
  sap-analyst · sap-architect · sap-ariba-consultant · sap-bc-consultant · sap-bw-consultant · sap-co-consultant · sap-code-reviewer · sap-critic · sap-debugger · sap-doc-specialist · sap-executor · sap-fi-consultant · sap-hcm-consultant · sap-mm-consultant · sap-planner · sap-pm-consultant · sap-pp-consultant · sap-ps-consultant · sap-qa-tester · sap-qm-consultant · sap-sd-consultant · sap-stocker · sap-tm-consultant · sap-tr-consultant · sap-wm-consultant · sap-writer *(רשומים 26 שמות ב-snapshot; ספירת cache=28 — הפער לא אומת, כנראה שני סוכנים נוספים לא ב-top-level)*.
- **תלויות:** שרת ה-MCP (`bridge/mcp-server.cjs`) דורש חיבור למערכת SAP חיה — **דורש-אימות/הגדרה**, וכרגע נכשל. הסוכנים והמיומנויות עובדים גם בלי ה-MCP (fallback: הדבקת ראיות ידנית).
- **תחומי SAP:** רוחבי — PP, PM, MM, SD, FI, CO, QM, PS, TM, WM, TR, HCM, BW, Basis, ארכיטקטורה, ABAP, ניפוי, QA, תיעוד.
- **עדכון זמין?** מקור git — ניתן עקרונית למשוך עדכון; אם קיים בפועל = **לא אומת**.
- **כפילות?** לא כפילות; חפיפה תחומית עם `sap-abap`/`sap-abap-cds` (ראו למטה).
- **המלצה:** ⚠️ **ה-MCP נכשל — אין להציג כמחובר בשום דוח.** התוסף עצמו יקר-ערך בזכות 28 סוכני-המודול הפונקציונליים (במיוחד PP/PM/QM/MM הרלוונטיים ל-NEO). מומלץ להמשיך לצרוך אותו כ-Skills/Agents בלבד, ולתקן/להגדיר את ה-MCP בנפרד לפני הסתמכות עליו לחיבור מערכת חיה. **אין להריץ setup/חיבור כאן.**

---

### 2. מרקטפלייס secondsky/sap-skills — הבסיס ל-19 התוספים
- כפי שפורט למעלה: מקור **ספרייה מקומית** `~/Downloads/sap-skills`, upstream `secondsky/sap-skills`, גרסה 2.4.0, 40 תוספים זמינים, 19 מותקנים.
- **מאפיין משותף לכל 19:** לרובם skill יחיד ("skills=1"), מיעוטם מוסיפים agents/commands/hooks/mcp. הרישיון של תוספים אלה **GPL-3.0** *(מקור: marketplace.json → `"license": "GPL-3.0"`)*.
- **תלות משותפת:** תוכן ה-skill פורטבילי; רכיבי Claude (agents/hooks/commands/mcp) פעילים ב-Claude Code. שני תוספים מריצים שרת MCP (ראו למטה).

---

### 3. sap-abap
- **גרסה:** 2.4.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · **1 command** (`abap-cloud-review`) · 0 hooks · 0 mcp.
- **תפקיד:** פיתוח ABAP מקיף — טבלאות פנימיות, מבנים, ABAP SQL, OOP, RAP, CDS, EML, ABAP Cloud, RTTI/RTTC, field symbols, טיפול בחריגות, ABAP Unit. מכסה ABAP קלאסי + ABAP for Cloud *(מקור: marketplace.json description)*.
- **תחום SAP:** ABAP (רלוונטי ל-ECC6 ול-S/4 On-Prem, כולל Clean Core).
- **תלויות:** אין תלות חיצונית קשיחה; הפקודה `abap-cloud-review` היא validator/prompt.
- **כפילות?** חפיפה תחומית עם סוכני ABAP של sc4sap; אינו כפול.
- **המלצה:** להשאיר — הבסיס ל-review/כתיבת ABAP במסגרת מיגרציית ECC→S/4.

---

### 4. sap-abap-cds
- **גרסה:** 2.2.2 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · 0 mcp. *(הערה: marketplace.json מציין פקודה `abap-cds-model-check`; ספירת ה-cache ב-snapshot רשמה 0 — הפער **לא אומת**.)*
- **תפקיד:** מידול נתונים ב-CDS — view entities, annotations, associations/cardinality, input parameters, DCL, CURR/QUAN, שאילתות CDS מ-ABAP, SALV IDA. ABAP 7.4+ עד ABAP Cloud.
- **תחום SAP:** מידול נתונים / CDS.
- **כפילות?** משלים ל-sap-abap; חופף בתחום לסוכני sc4sap. לא כפול.
- **המלצה:** להשאיר — נדרש לעבודת מידול ב-S/4.

---

### 5. sap-fiori-tools
- **גרסה:** 2.2.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · שרת MCP **מחובר**.
  *(מקור: `claude mcp list` → `plugin:sap-fiori-tools:fiori-tools: npx ... @sap-ux/fiori-mcp-server@1.4.0 ... ✔ Connected`)*
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · **1 mcp**.
- **תפקיד:** בניית/עריכת אפליקציות Fiori — יצירת אפליקציה מ-OData/CAP, שינוי אפליקציות קיימות (workflow תלת-שלבי: list_functionality → get_functionality_details → execute_functionality), הורדת מטא-דאטה של OData.
- **תלויות:** שרת MCP חיצוני (`@sap-ux/fiori-mcp-server@1.4.0`) שרץ דרך npx — **מחובר**. פרוטוקול קפדני: יש לקרוא inputSchema לפני כל קריאת כלי.
- **תחום SAP:** Fiori / UX (רלוונטי ל-NEO Cockpit ולאפליקציות S/4).
- **המלצה:** להשאיר — אחד משני ה-MCP המחוברים והשימושיים בפועל.

---

### 6. sapui5
- **גרסה:** 2.2.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · שרת MCP **מחובר**.
  *(מקור: `claude mcp list` → `plugin:sapui5:ui5-tooling: npx -y @ui5/mcp-server@0.2.11 ... ✔ Connected`)*
- **רכיבים:** 1 skill · **4 agents** · **5 cmds** · 1 hook · **1 mcp** — התוסף העשיר ביותר מבין ה-19 של sap-skills.
- **תפקיד:** פיתוח UI5 מלא — יצירת אפליקציית UI5/Integration Card, api reference, guidelines, המרת TypeScript, ולידציית manifest, הרצת UI5 linter, version info.
- **תלויות:** שרת MCP (`@ui5/mcp-server@0.2.11`) דרך npx — **מחובר**.
- **תחום SAP:** SAPUI5 / frontend.
- **המלצה:** להשאיר — משלים ל-fiori-tools לצד ה-frontend.

---

### 7. sap-sqlscript
- **גרסה:** 2.2.2 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · **3 agents** · **4 cmds** · 1 hook · 0 mcp.
- **פקודות זמינות:** `sqlscript-validate`, `sqlscript-convert`, `sqlscript-optimize`, `sqlscript-setup` *(מקור: רשימת ה-skills הזמינה)*.
- **תפקיד:** כתיבה/אימות/אופטימיזציה/המרה של SQLScript ל-HANA (פרוצדורות, פונקציות טבלה).
- **תחום SAP:** HANA / SQLScript (רלוונטי בשכבת ה-DB של S/4).
- **המלצה:** להשאיר — יש hook פעיל; לוודא שאינו מפריע ל-workflow אם עורכים קבצי SQL בפרויקט.

---

### 8. sap-btp-integration-suite
- **גרסה:** 2.2.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · 0 mcp.
- **תפקיד:** SAP Integration Suite / Cloud Integration (CPI) — iFlows, אדפטרים, תבניות אינטגרציה.
- **תחום SAP:** אינטגרציה/ממשקים — **רלוונטי מאוד** לדגש הפרויקט על interfaces (IDoc/PI/PO).
- **המלצה:** להשאיר — ליבה לעבודת ממשקים בסביבת ענן/היברידית.

---

### 9. sap-btp-connectivity
- **גרסה:** 2.2.2 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · 0 mcp.
- **תפקיד:** קישוריות BTP — Cloud Connector, Destinations, principal propagation, חיבור On-Prem↔Cloud.
- **תחום SAP:** קישוריות/ממשקים היברידיים (רלוונטי לחיבור ECC/S/4 On-Prem ל-BTP).
- **המלצה:** להשאיר — משלים ל-integration-suite.

---

### 10. sap-api-style
- **גרסה:** 2.2.2 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · 0 mcp.
- **תפקיד:** קונבנציות סגנון/עיצוב ל-API (עקביות, שמות, מבנה).
- **תחום SAP:** תכן API / ממשקים.
- **המלצה:** להשאיר — משלים ל-api-policy (סגנון מול תאימות).

---

### 11. sap-api-policy
- **גרסה:** 2.4.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · 0 cmds · 0 hooks · 0 mcp.
- **תפקיד:** הערכה מבוססת-ראיות של תאימות שימוש ב-API/ממשק למדיניות SAP API (v.4.2026a) — Published מול private API, "Documented Use", האם iPaaS/RPA/AI-agent/MCP רשאים לקרוא ל-SAP, חילוץ נתונים בכמות, עטיפות Z/Y OData/RFC/BAPI ו-Clean Core, ODP-RFC, RISE. מפיק הערכה טכנית עם רמת ביטחון — **מפורשות לא ייעוץ משפטי ולא החלטת תאימות סופית** *(מקור: marketplace.json description)*.
- **תחום SAP:** ממשל/תאימות ממשקים.
- **המלצה:** להשאיר — חשוב במיוחד למיגרציה ולשאלות Clean Core.

---

### 12. sap-dependency-security
- **גרסה:** 2.4.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · **1 cmd** (`sap-dependency-upgrade-plan`) · **1 hook** · 0 mcp.
- **תפקיד:** אבטחת תלויות ושרשרת אספקה — זיהוי חבילות פגיעות, תכנון שדרוג.
- **תחום SAP:** אבטחה / DevSecOps.
- **המלצה:** להשאיר — לשים לב ל-hook הפעיל (עלול לרוץ בעריכות תלויות).

---

### 13. sap-btp-master-data-integration
- **גרסה:** 2.4.0 · **מרקטפלייס:** sap-skills (dir) · **סטטוס:** מותקן · פעיל.
- **רכיבים:** 1 skill · 0 agents · **1 cmd** (`mdi-replication-check`) · 0 hooks · 0 mcp.
- **תפקיד:** SAP Master Data Integration — רפליקציית מאסטר-דאטה בין מערכות, בדיקות רפליקציה.
- **תחום SAP:** מאסטר-דאטה/אינטגרציה — רלוונטי למיגרציה (עקביות נתוני-אב בין ECC ל-S/4).
- **המלצה:** להשאיר.

---

### שאר תוספי BTP המותקנים (14–20)
כל אחד: 1 skill, ללא agents/cmds/hooks/mcp אלא אם צוין. כולם *מותקן · פעיל*, מרקטפלייס sap-skills (dir).

| תוסף | גרסה | תפקיד | תחום SAP |
|------|------|-------|----------|
| **sap-btp-cias** | 2.2.0 | Cloud Integration Automation Service — אוטומציית תרחישי אינטגרציה | אינטגרציה/BTP |
| **sap-btp-cloud-logging** | 2.2.0 | Cloud Logging — ניטור/לוגים בענן | תפעול/BTP |
| **sap-btp-cloud-transport-management** | 2.2.0 | Transport Management Service — ניהול טרנספורטים בענן | ALM/BTP |
| **sap-btp-developer-guide** | 2.2.0 | מדריך מפתח BTP — best practices, ארכיטקטורה | פיתוח/BTP |
| **sap-btp-service-manager** | 2.2.2 | Service Manager — ניהול שירותים/מופעים ב-BTP | תפעול/BTP |
| **sap-btp-cloud-platform** | 2.2.2 | פלטפורמת BTP כללי — קונספטים רוחביים | BTP (כללי) |

**המלצה לקבוצה זו:** להשאיר את כולם; הם קלי-משקל (skill יחיד, ללא רכיבים פעילים-אוטומטית) ומספקים כיסוי BTP רחב. אם רוצים לצמצם רעש, הם מועמדים ראשונים ל"כיבוי לפי צורך" כי אין להם hooks/MCP שרצים ברקע — אך אין סיבה דחופה להסירם.

---

## סיכום ממצאים והמלצות-על

1. **סטטוס MCP — קריטי לדיוק:** מבין תוספי SAP, רק **שניים** מריצים MCP מחובר: `sap-fiori-tools` ו-`sapui5`. **`sc4sap:sap` נכשל בחיבור (Failed to connect)** — אין להציגו כמחובר בשום מקום. שאר 17 תוספי SAP אינם מפעילים MCP כלל.
2. **כפילויות:** אין כפילות ממש בין תוספי ה-SAP. הכפילות היחידה במערכת (`superpowers` ×2) מחוץ ל-SAP. חפיפה תחומית מבורכת (משלימה) בין sc4sap לבין sap-abap/sap-abap-cds.
3. **גרסאות ועדכונים:** גרסאות לא אחידות (2.2.0/2.2.2/2.4.0). מכיוון שהמרקטפלייס `sap-skills` הוא **ספרייה מקומית**, "עדכון זמין" בפועל **לא אומת** — אין בדיקת remote מסביבה זו. כדי ליישר לגרסת 2.4.0 יש לרענן ידנית את `~/Downloads/sap-skills` ולהתקין מחדש (לא בוצע ולא יבוצע כאן).
4. **רלוונטיות לפרויקט NEO (PP/PP-PI/PM + ממשקים):** הנכסים היקרים ביותר — סוכני sc4sap הפונקציונליים (sap-pp/pm/qm/mm-consultant), `sap-btp-integration-suite` + `sap-btp-connectivity` לממשקים, ו-`sap-abap`/`sap-abap-cds` למיגרציה.
5. **hooks פעילים לתשומת לב:** `sap-sqlscript`, `sap-dependency-security`, `sapui5`, ו-`sc4sap` מריצים hook. כדאי לוודא שאינם מפעילים validators לא-רצויים בזמן עריכת קבצי הפרויקט.

> **תזכורת ציות:** לא בוצע חיבור SAP, setup, התקנה, עדכון, מחיקה, commit או push. כל הנתונים read-only מה-snapshot ומ-`~/Downloads/sap-skills`. ערכים לא-מאומתים סומנו במפורש "לא אומת".
