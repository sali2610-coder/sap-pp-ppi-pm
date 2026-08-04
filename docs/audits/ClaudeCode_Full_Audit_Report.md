# ClaudeCode Full Audit Report

> קריאה בלבד. לא שונה / הותקן / נמחק / עודכן שום רכיב. נוצר: 2026-07-22. משתמש: Sali Halif.

---

## 1. סיכום כללי

| מדד | כמות |
|---|---|
| Plugins מותקנים | **46** (כולם enabled, 0 disabled) |
| Marketplaces | **11** (1 local-directory, 1 git, 9 GitHub) |
| Skills מ-Plugins | **232** |
| Skills מותאמים (`~/.claude/skills`) | **43** |
| Skills ברמת פרויקט (`sap/.claude/skills`) | **22** |
| Agents (מ-Plugins) | **59** |
| Slash Commands | **35** |
| MCP servers (מוגדרים) | **14** (7 connected, 3 needs-auth, 1 failed, 1 pending, 2 connector) |
| Hook configs | user-level (~30 events) + 9 plugins + 1 project |
| קבצי הגדרה | settings.json, settings.local.json, ~/.claude.json, 3 קבצי plugins |

**מצב כללי:** סביבה עשירה מאוד, ממוקדת SAP + אקדמיה + design/coloring. תקינה בעיקרה. נמצאו כפילויות (superpowers כפול, document/example skills כפולים) וכמה סיכוני אבטחה בעדיפות בינונית (auto-push, permissions רחבים, MCP מקומי מ-Downloads).

---

## 2. Plugins (46, כולם enabled)

מקור לפי marketplace. scope=user אלא אם צוין. תאריך = התקנה.

### Official (claude-plugins-official — anthropics/claude-plugins-official)
| Plugin | גרסה | רכיבים | תאריך |
|---|---|---|---|
| frontend-design | unknown (scope=local) | 1 skill | 05-02 |
| skill-creator | unknown | 1 skill | 05-02 |
| claude-md-management | 1.0.0 | 1 skill, 1 cmd | 05-02 |
| figma | 2.2.81 | 12 skills, **MCP** | 05-02 |
| vercel | 0.44.0 | 38 skills, 3 agents, 6 cmds, **hook**, **MCP**, deps | 05-02 |
| superpowers | 6.1.1 | 14 skills, hook | 06-02 |

### sap-skills (directory → ~/Downloads/sap-skills — קלון של secondsky/sap-skills v2.4.0)
19 plugins: `sap-abap` v2.4.0 · `sap-abap-cds` v2.2.2 · `sap-fiori-tools` v2.2.0 (**MCP**) · `sapui5` v2.2.0 (**MCP+hook**, 4 agents, 5 cmds) · `sapui5-cli` · `sapui5-linter` · `sap-btp-cloud-platform` v2.2.2 · `sap-btp-integration-suite` v2.2.0 · `sap-btp-developer-guide` · `sap-btp-cloud-transport-management` · `sap-btp-cloud-logging` · `sap-btp-cias` · `sap-btp-connectivity` v2.2.2 · `sap-btp-service-manager` v2.2.2 · `sap-btp-master-data-integration` v2.4.0 (1 cmd) · `sap-api-style` v2.2.2 · `sap-api-policy` v2.4.0 · `sap-sqlscript` v2.2.2 (**hook**, 3 agents, 4 cmds) · `sap-dependency-security` v2.4.0 (**hook**, 1 cmd).

### sc4sap (git → github.com/babamba2/superclaude-for-sap)
| Plugin | גרסה | רכיבים |
|---|---|---|
| sc4sap | 0.6.14 (upstream 0.6.16) | **16 skills, 26 agents, hooks (~20), MCP, deps (259M node_modules)** |

### context-engineering-kit (github NeoLabHQ/context-engineering-kit)
11 plugins: reflexion (3 skills, hook) · review (2 skills, 6 agents) · git (7) · tdd (3) · sdd (5 skills, 9 agents) · sadd (10 skills, 2 agents) · ddd · tech-stack · docs (2) · kaizen (7) · mcp (5) · customaize-agent (13).

### שאר ה-marketplaces
| Plugin | Marketplace | רכיבים |
|---|---|---|
| workato-api | grail-automation | 1 skill |
| superpowers 5.1.0 | superpowers-marketplace | 14 skills, hook ⚠️ **כפול** ל-6.1.1 |
| caveman | caveman | 7 skills, 3 agents, statusline |
| document-skills | anthropic-agent-skills | 17 skills ⚠️ |
| example-skills | anthropic-agent-skills | 17 skills ⚠️ **זהה ל-document-skills** |
| academic-research-skills | academic-research-skills | 4 skills, 3 agents, 16 cmds, hook |
| cs-academic-writing | cs-academic-writing-skill | 1 skill |
| claude-scholar | claude-scholar | 12 skills |

**עדכונים זמינים:** `sap-abap-cds`/`sap-btp-*`/`sapui5*` וכו' על v2.2.x בעוד הקטלוג המקומי v2.4.0 → עדכון זמין. `sc4sap` 0.6.14 → 0.6.16 upstream. `academic-research-skills` 3.18.0 → 3.19.0.

---

## 3. Skills

### 3a. Custom (`~/.claude/skills`, 43)
SAP: `sap-abap-ecc-s4-expert`, `sap-ecc-troubleshooter`, `sap-incident-commander`, `sap-forecaster`, `sap-function-finder`, `sap-knowledge-builder`, `sap-document-intelligence`, `sap-israel-knowledge`, `abap-migration`.
אקדמיה: `academic-orchestrator`, `-reviewer`, `-grader`, `-challenger`, `-hebrew-editor`, `-final-approval`, `-suite-auditor`, `review-paper*`(4), `review-grant`, `grill-me`.
Design/Content: `banner-design`, `brand`, `design`, `design-system`, `design-taste-frontend`, `high-end-visual-design`, `ui-styling`, `ui-ux-pro-max`, `slides`, `frontend-slides`, `d3-viz`, `deck-edit-mode`, `redesign-existing-projects`, `remotion-best-practices`, `premium-coloring-style-guide`, `world-class-coloring-book`, `human`, `notebooklm`, `dream`, `find-skills`, `vibesec-skill`.
(3 מהם symlinks ל-`~/.agents/skills`: dream, find-skills, grill-me, notebooklm, vibesec-skill.)

### 3b. Project (`~/Desktop/My-Projects/sap/.claude/skills`, 22)
NEO reviewers: `neo-enterprise-ux-auditor`, `neo-accessibility-reviewer`, `neo-architecture-studio-reviewer`, `neo-documentation-guardian`, `neo-sap-content-quality-reviewer`, `neo-sap-visual-designer`, `neo-search-experience-reviewer`, `enterprise-adaptive-ui-reviewer`, `enterprise-performance-reviewer`, `enterprise-ux-reviewer` + `NEO-REVIEWERS.md`.
תוכן: `academic-pptx`, `docx`, `pdf`, `pptx`, `ppt-master`, `excalidraw-diagram`, `mermaid-diagrams`, `knowledge-library-builder`, `learning-content-factory`, `research-academic-engine`, `sap-knowledge-architect`.

### 3c. מ-Plugins (232)
עיקריים: document-skills+example-skills (17+17, **זהים**), vercel (38), figma (12), claude-scholar (12), customaize-agent (13), superpowers (14×2, **כפול**), sadd (10), git (7), kaizen (7), caveman (7).

**כפילויות skills (המלצה):**
| כפילות | פירוט | המלצה |
|---|---|---|
| `document-skills` == `example-skills` | 17 skills זהים (docx/pdf/pptx/xlsx/frontend-design/skill-creator...) פעמיים דרך anthropic-agent-skills | להשבית אחד |
| `superpowers` 5.1.0 vs 6.1.1 | שני plugins, 14 skills כל אחד, שניהם enabled | להשבית 5.1.0 (הישן) |
| `docx`/`pdf`/`pptx` | קיימים ב-anthropic skills, ב-project skills, וב-fa0fa64 sets | לאחד למקור אחד |
| `skill-creator` | official plugin + anthropic sets | להשאיר אחד |

---

## 4. Agents (59 מ-Plugins)

| Plugin | # | דוגמאות |
|---|---|---|
| **sc4sap** | 26 | sap-executor(R/W), sap-debugger(R/W), sap-qa-tester(R/W), sap-code-reviewer, sap-architect, sap-analyst, + 14 יועצי מודול (FI/CO/MM/SD/**PP**/**PM**/**QM**/WM/PS/TM/TR/HCM/BW/Ariba), sap-bc, sap-stocker, sap-writer, sap-planner, sap-critic, sap-doc-specialist |
| sdd | 9 | business-analyst, developer, qa-engineer, software-architect, tech-lead... |
| review | 6 | bug-hunter, code-reviewer, security-auditor, contracts-reviewer, test-coverage-reviewer, historical-context |
| sapui5 | 4 | ui5-api-explorer, ui5-app-scaffolder, ui5-code-quality-advisor, ui5-migration-specialist |
| vercel | 3 | ai-architect, deployment-expert, performance-optimizer |
| caveman | 3 | cavecrew-builder, -investigator, -reviewer |
| academic-research-skills | 3 | synthesis, research_architect, report_compiler |
| sap-sqlscript | 3 | amdp-helper, procedure-generator, sqlscript-analyzer |
| sadd | 2 | judge, meta-judge |

**MCP/Hooks לפי agent:** רק סוכני `sc4sap`, `sapui5`, `sap-sqlscript`, `figma`, `vercel`, `fiori-tools` מפעילים MCP. סוכני SAP consultants = R/O (Get* בלבד); רק sc4sap sap-executor/-debugger/-qa-tester כותבים (חסום כי MCP מנותק).

---

## 5. Slash Commands (35)

| Plugin | Commands |
|---|---|
| academic-research-skills | 16 × `/ars-*` (full, plan, outline, revision, reviewer, abstract, lit-review, 3w, citation-check, disclosure, format-convert, mark-read, unmark-read, cache-invalidate, revision-coach, rebuttal-audit) |
| vercel | 6 (bootstrap, deploy, env, marketplace, status...) |
| sapui5 | 5 (ui5-mcp-tools, ui5-scaffold, ui5-lint, ui5-api, ui5-version) |
| sap-sqlscript | 4 (validate, convert, optimize, setup) |
| sc4sap | `/sc4sap:*` (setup, mcp-setup, analyze-code, create-program, sap-doctor, team...) |
| claude-md-management | 1 (revise-claude-md) |
| sap-dependency-security | 1 (sap-dependency-upgrade-plan) |
| sap-btp-master-data-integration | 1 (mdi-replication-check) |
| built-in | /plugin, /mcp, /caveman, /loop, /schedule, /code-review, /security-review... |

---

## 6. MCP Servers (14)

| Server | מקור | פקודה | סטטוס | R/W | Credentials |
|---|---|---|---|---|---|
| figma | plugin figma | https://mcp.figma.com/mcp (HTTP) | ✔ connected | R/W design | OAuth |
| vercel | plugin vercel | https://mcp.vercel.com (HTTP) | ! needs-auth | R/W | OAuth |
| sc4sap:sap | plugin sc4sap | `node bridge/mcp-server.cjs` | ✘ **failed** | R/W SAP ADT | SAP (keychain) |
| fiori-tools | plugin sap-fiori-tools | `npx @sap-ux/fiori-mcp-server@1.4.0` | ✔ connected | R/W (scaffold) | — |
| ui5-tooling | plugin sapui5 | `npx @ui5/mcp-server@0.2.11` | ✔ connected | R/O + scaffold | — |
| magic | user | `npx @21st-dev/magic` (⚠️ floating) | ✔ connected | R/O gen | API key |
| mobbin | user | https://api.mobbin.com/mcp | ✔ connected | R/O | — |
| browser-use | user | `uvx browser-use[cli]` | ✔ connected | R/W browser | — |
| pptxgenjs | project (sap/.agents) | `node .../pptxgenjs-mcp-server` | ⏸ pending approval | R/W files | — |
| Google Drive | claude.ai connector | HTTP | ✔ connected | R/W | OAuth |
| Gmail | claude.ai connector | HTTP | ✔ connected | R/W | OAuth |
| Google Calendar | claude.ai connector | HTTP | ✔ connected | R/W | OAuth |
| Microsoft 365 | claude.ai connector | HTTP | ! needs-auth | R/W | OAuth |
| Make | claude.ai connector | HTTP | ! needs-auth | R/W | OAuth |

**קריאה-בלבד בפועל:** mobbin, magic. **כתיבה:** figma, vercel, sc4sap(SAP), fiori-tools, browser-use, Google/MS connectors. **sc4sap:sap כרגע מנותק** — אין גישת כתיבה ל-SAP.

---

## 7. Hooks

### User-level (`~/.claude/settings.json`)
- **notify.sh** — רשום על ~30 אירועים (Stop/PostToolUse/UserPromptSubmit/SessionStart/Subagent*/Task*/...). מפעיל `~/.claude/notify/notify.sh` (התראות/לוג מקומי). לא רשת, מקומי.
- **dream** — `Stop`: `should-dream.sh && touch ~/.claude/.dream-pending` (קונסולידציית זיכרון 24ש').
- **afplay** — צלילים (Glass/Tink) על Stop/SubagentStop.
- statusLine — **לא מוגדר** (badge של caveman מבוקש אך חסר).

### Plugin hooks (9)
- **sc4sap** — הכבד ביותר: ~20 סקריפטים על כל אירוע (UserPromptSubmit/SessionStart/PreToolUse/PostToolUse/Subagent*/Stop/PreCompact/SessionEnd) דרך `scripts/run.cjs`. מקומי, fail-clean. + guards: tier-readonly (חוסם mutation ב-QA/PRD), block-forbidden-tables (חוסם PII).
- **sap-sqlscript** — PostToolUse validator (ניתוח סטטי SQL, בלי רשת).
- **sap-dependency-security** — Pre/PostToolUse validator (supply-chain; **תפס @latest באודיט הזה** — עובד).
- vercel, sapui5, superpowers(×2), reflexion, ARS — hook יחיד כל אחד.

### Project hook (`sap/.claude/hooks`)
- ⚠️ **auto-push.sh** — דוחף אוטומטית ל-git. **מנוגד לכלל "אל תבצע push"** — לבדוק מתי מופעל.

**רשת:** אף hook מקומי לא שולח החוצה, פרט ל-HUD של sc4sap (statusline → Anthropic usage API, לא פעיל כי statusLine לא רשום).

---

## 8. Marketplaces (11)

| שם | סוג | מקור |
|---|---|---|
| claude-plugins-official | GitHub | anthropics/claude-plugins-official |
| **sap-skills** | **Directory (local)** | **~/Downloads/sap-skills** (קלון secondsky/sap-skills) |
| sc4sap | Git | github.com/babamba2/superclaude-for-sap |
| grail-automation | GitHub | grailautomation/claude-plugins |
| superpowers-marketplace | GitHub | obra/superpowers-marketplace |
| context-engineering-kit | GitHub | NeoLabHQ/context-engineering-kit |
| caveman | GitHub | JuliusBrussee/caveman |
| anthropic-agent-skills | GitHub | anthropics/skills |
| academic-research-skills | GitHub | Imbad0202/academic-research-skills |
| cs-academic-writing-skill | GitHub | wawabinger/cs-academic-writing-claude-skill |
| claude-scholar | GitHub | yy/claude-scholar |

⚠️ `sap-skills` הוא **תיקייה מקומית ב-Downloads** — שביר (מחיקה ידנית תשבור 19 plugins).

---

## 9. SAP Audit

### רכיבי SAP
- **Plugins (21):** 19 מ-sap-skills + sc4sap + (sap-fiori-tools/sapui5 נספרים בתוך 19).
- **Custom SAP skills (9):** sap-abap-ecc-s4-expert, sap-ecc-troubleshooter, sap-incident-commander, sap-forecaster, sap-function-finder, sap-knowledge-builder, sap-document-intelligence, sap-israel-knowledge, abap-migration.
- **Agents:** 26 (sc4sap) + 4 (sapui5) + 3 (sap-sqlscript) = 33.
- **MCP:** sc4sap:sap (failed), fiori-tools (✔), ui5-tooling (✔).
- **Commands:** /sc4sap:*, sap-sqlscript(4), sap-dependency-security(1), mdi(1).
- **Hooks:** sc4sap(~20), sap-sqlscript, sap-dependency-security.

### מיפוי לתחומים
| תחום | כיסוי |
|---|---|
| ECC | sc4sap (ECC-first), sap-ecc-troubleshooter, sap-incident-commander, sap-abap-ecc-s4-expert |
| S/4HANA | sc4sap, sap-abap 2.4.0, sap-abap-ecc-s4-expert |
| ABAP | sap-abap, sc4sap (executor/reviewer/debugger) |
| CDS | sap-abap-cds, sc4sap architect |
| Fiori | sap-fiori-tools (MCP), sc4sap |
| UI5 | sapui5 (MCP), sapui5-cli, sapui5-linter, 4 agents |
| BTP | 10× sap-btp-* (connectivity, integration-suite, service-manager, MDI, cloud-platform...) |
| HANA | sap-sqlscript, (sap-hana-cli לא מותקן) |
| SQLScript | sap-sqlscript (skill+3 agents+4 cmds+hook) |
| Integration Suite | sap-btp-integration-suite, sap-btp-connectivity, MDI |
| OData / API | sap-api-style, sap-api-policy, fiori-tools |
| **PP / PP-PI** | sc4sap: **sap-pp-consultant** (R/O) |
| **PM** | sc4sap: **sap-pm-consultant** (R/O) |
| **MM** | sc4sap: sap-mm-consultant |
| SD/FI/CO/QM/BW | sc4sap: יועצי מודול ייעודיים (R/O) |

---

## 10. Security

| ממצא | חומרה | פירוט |
|---|---|---|
| superpowers כפול (5.1.0+6.1.1) | בינוני | שניהם enabled → 28 skills חופפים, בזבוז context |
| document-skills == example-skills | בינוני | 17 skills זהים פעמיים |
| **project auto-push.sh** | **גבוה** | דוחף אוטומטית ל-git — מנוגד לכללי no-push, לבדוק trigger |
| permissions 111 allow / 0 deny | בינוני | allowlist רחב מאוד, אין deny/ask — שטח תקיפה |
| sap-skills = local Downloads dir | בינוני | 19 plugins תלויים בתיקייה בת-מחיקה |
| sc4sap MCP failed | נמוך | מנותק (טוב — אין SAP); אך רשום ומריץ `npm install` ריצתי בעליה |
| magic MCP floating (@latest) | נמוך | executable לא מוצמד — supply-chain |
| pptxgenjs pending approval | מידע | MCP פרויקטלי ממתין |
| vercel/M365/Make needs-auth | מידע | לא מחוברים |
| sc4sap node_modules 259M | מידע | תלות כבדה מקומית |

**Plugins לא חתומים:** כל ה-plugins מ-marketplaces של צד-שלישי (לא חתומים דיגיטלית — סטנדרטי ל-Claude Code). **הרשאות חריגות:** אין deny rules כלל.

---

## 11. Dependencies

| רכיב | חבילות | הערה |
|---|---|---|
| sc4sap | @anthropic-ai/sdk, @modelcontextprotocol/sdk, better-sqlite3, commander, zod | node_modules **259M**, בלי install scripts |
| vercel | minisearch | קל |
| caveman / superpowers | — | ללא deps |
| MCP (npx/uvx, ריצתי) | @sap-ux/fiori-mcp-server@1.4.0, @ui5/mcp-server@0.2.11, @21st-dev/magic (floating), browser-use[cli] (uvx) | נמשכים בזמן ריצה |
| sap-sqlscript / sap-dependency-security | node/python hooks (ללא deps) | ניתוח סטטי |

אין preinstall/postinstall בשום plugin. סיכון עיקרי = חבילות MCP הריצתיות (npx/uvx) + `@latest` של magic.

---

## 12. כפילויות (ריכוז)

1. `superpowers` 5.1.0 + 6.1.1 — להשבית 5.1.0.
2. `document-skills` + `example-skills` — זהים, להשבית אחד.
3. `docx`/`pdf`/`pptx`/`xlsx` — מופיעים ב-anthropic sets, project skills, ו-fa0fa64 sets.
4. `dependency-upgrade` → כבר הוסר (הוחלף ב-sap-dependency-security).
5. skills מ-sap-skills מול custom (`sap-abap` plugin מול `sap-abap-ecc-s4-expert` custom) — משלימים, לא כפילות.

---

## 13. מה חסר + המלצות לשיפור

**חסר:**
- statusLine לא מוגדר (badge caveman).
- Vercel CLI לא מותקן.
- `sap-hana-cli` לא מותקן (דורש MCP+HANA creds — נדחה בכוונה).
- אין deny rules ב-permissions.

**המלצות (לא בוצעו — קריאה בלבד):**
1. להשבית `superpowers@superpowers-marketplace` (5.1.0) ואחד מ-document/example-skills — להסיר כפילות.
2. לבדוק/להשבית את `sap/.claude/hooks/auto-push.sh` (סיכון push לא מבוקר).
3. לעדכן plugins של sap-skills מ-v2.2.x ל-v2.4.0 (`plugin update`), ו-sc4sap ל-0.6.16.
4. לשקול העברת marketplace `sap-skills` מ-`~/Downloads` לתיקייה יציבה / רישום מ-GitHub.
5. להצמיד את `@21st-dev/magic` לגרסה מדויקת (לא @latest).
6. להוסיף deny rules בסיסיים ב-permissions (למשל push/deploy).
7. sc4sap MCP — להשאיר מנותק עד חיבור SAP DEV מבוקר (כמתוכנן).

---

*מקור נתונים: `installed_plugins.json`, `known_marketplaces.json`, `settings.json`, `claude mcp list`, סריקת `~/.claude/plugins/cache`. לא שונה שום קובץ. הדוח נשמר ב-`~/ClaudeCode_Full_Audit_Report.md`.*
