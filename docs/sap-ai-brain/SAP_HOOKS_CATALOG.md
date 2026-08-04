# קטלוג Hooks במערכת ה‑SAP AI

> **מקור האמת:** קריאה‑בלבד של `~/.claude/settings.json` (‏hooks של המשתמש), קובצי `hooks/hooks.json` של התוספים תחת `~/.claude/plugins/cache/`, וקבצי הפרויקט תחת `/Users/salihalif/Desktop/My-Projects/sap/.claude/`. אין המצאת אירוע, סקריפט או התנהגות.
> **הבחנה חשובה:** Hook יכול להיות **רשום** (מופיע ב‑`hooks.json` פעיל של תוסף/משתמש → מופעל בפועל) או **רדום** (הקובץ קיים אך אינו רשום בשום `hooks` block → **אינו רץ**). המסמך מסמן זאת מפורשות.

מבנה כל רשומה: שם · מקור · מיקום · אירוע · פעולה · קורא? · כותב? · רשת? · חוסם? · על‑כשל · סיכון.

---

## 1. Hooks של המשתמש — `notify.sh` (מרכזי ההתראות)

- **מקור:** מוגדר ידנית ב‑`~/.claude/settings.json`.
- **מיקום הסקריפט:** `~/.claude/notify/notify.sh` (מגדרה קונפיג ב‑`~/.claude/notify/config.sh`).
- **אירועים (רבים):** ה‑snapshot מאשר events פעילים ב‑settings של המשתמש —
  `Stop`, `SubagentStop`, `SubagentStart`, `PermissionRequest`, `PermissionDenied`, `Notification`, `PostToolUse`, `PostToolUseFailure`, `PreToolUse`, `UserPromptSubmit`, `SessionStart`, `SessionEnd`, `StopFailure`, `PreCompact`, `PostCompact`, `PostToolBatch`, `Elicitation`, `ElicitationResult`, `TaskCreated`, `TaskCompleted`.
- **פעולה לפי תת‑פקודה:** `approval` (ping מושהה + daemon תזכורת ל‑PermissionRequest) · `input` (ping מיידי ל‑Notification) · `complete` (ping סיום + כיבוי תזכורות ב‑Stop) · `error` (ping שגיאה ב‑PostToolUseFailure) · `cancel` (כיבוי daemon התזכורת) · `log <EV>` (רישום דיאגנוסטי לכל אירוע). בנוסף מוגדרים צלילים (`afplay ... Glass.aiff` ב‑Stop, `Tink.aiff` ב‑SubagentStop).
- **קורא?** כן — קורא JSON של ה‑hook מ‑stdin (מחלץ `session_id`).
- **כותב?** כן — כותב קבצי מצב מקומיים (‏`$STATE_DIR`, PID/msg/t0), לוגים והיסטוריה.
- **רשת?** אופציונלי — push לטלפון דרך `ntfy` רק אם `NTFY_TOPIC` מוגדר (‏curl ל‑`$NTFY_SERVER`). אחרת מקומי בלבד (התראות macOS).
- **חוסם?** לא — התראתי בלבד; אינו מחזיר decision של deny.
- **על‑כשל:** שקט/סלחני (‏`|| true`, ‏`2>/dev/null`) — לא מפיל את הרּיצה.
- **סיכון:** נמוך. אין אכיפה, אין נגיעה ב‑SAP; רק התראות ולוגים מקומיים (+push אופציונלי).

> הערה: ב‑`settings.json` של המשתמש מוגדר גם hook ל‑`/dream` ב‑Stop (`should-dream.sh` → יוצר `.dream-pending`). אינו קשור ל‑SAP; מוזכר לשלמות.

---

## 2. Hooks של תוספים (Plugin hooks)

### 2.1 sc4sap — כ‑20 סקריפטים (התזמורת המרכזית של SAP)

- **מקור:** תוסף `sc4sap@sc4sap` v0.6.14.
- **מיקום:** `~/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/hooks/hooks.json` → מריץ סקריפטים תחת `scripts/` ו‑`scripts/hooks/` דרך `scripts/run.cjs`.
- **רשום ופעיל:** כן (‏hooks.json מלא, אירועים מרובים).

רשימת ה‑hooks לפי אירוע (מאומת מ‑`hooks.json`):

| אירוע | סקריפטים |
|---|---|
| `UserPromptSubmit` | `keyword-detector.mjs`, `skill-injector.mjs`, `spro-injector.mjs` |
| `SessionStart` | `session-start.mjs`, `project-memory-session.mjs`, `legacy-migration-banner.mjs` (+ matcher `init` → `setup-init.mjs`; matcher `maintenance` → `setup-maintenance.mjs`) |
| `PreToolUse` | `pre-tool-enforcer.mjs`, `transport-validator.mjs` |
| `PermissionRequest` (Bash) | `permission-handler.mjs` |
| `PostToolUse` | `post-tool-verifier.mjs`, `project-memory-posttool.mjs`, `activation-trigger.mjs` |
| `PostToolUseFailure` | `post-tool-use-failure.mjs`, `syntax-checker.mjs` |
| `SubagentStart` / `SubagentStop` | `subagent-tracker.mjs start/stop`, `verify-deliverables.mjs` |
| `PreCompact` | `pre-compact.mjs`, `project-memory-precompact.mjs` |
| `Stop` | `context-guard-stop.mjs`, `persistent-mode.cjs`, `code-simplifier.mjs` |
| `SessionEnd` | `session-end.mjs` |

בנוסף, תחת `scripts/hooks/` שני **שומרי הבטיחות הקריטיים** (ראו §3):
- `tier-readonly-guard.mjs`
- `block-forbidden-tables.mjs`
(וכן `prefer-sqlquery-explicit-fields.mjs`).

- **קורא?** כן — קוראים payload מ‑stdin, קובצי פרופיל (`.sc4sap/active-profile.txt`, `~/.sc4sap/profiles/<alias>/sap.env`, `config.json`), וקבצי blocklist (`exceptions/*.md`).
- **כותב?** כן — זיכרון‑פרויקט, מעקב subagent, באנרים; חלקם רק קוראים.
- **רשת?** ה‑hooks עצמם מקומיים. גישת רשת ל‑SAP מתבצעת רק דרך שרת ה‑MCP (‏sc4sap:sap) — שכרגע מנותק.
- **חוסם?** כן — `tier-readonly-guard` ו‑`block-forbidden-tables` מחזירים `permissionDecision: "deny"` / `"ask"`. `pre-tool-enforcer` ו‑`transport-validator` יכולים לחסום פעולות לא‑תקינות.
- **על‑כשל:** **fail‑open** בשומרים (שגיאת parse/IO → מאפשר) — כי שכבת ה‑MCP (L2) עדיין אוכפת. שאר ה‑hooks עם timeout קצר (‏3–60ש') ולא מפילים.
- **סיכון:** בינוני‑מבוקר. הרבה סקריפטים רצים על כל אירוע (עלול להאט UX), אך תפקידם הגנתי. אין נגיעה ב‑SAP חי בזמן שהגשר מנותק.

### 2.2 sap-sqlscript — ולידטור SQLScript

- **מקור:** `sap-sqlscript@sap-skills` v2.2.2.
- **מיקום:** `~/.claude/plugins/cache/sap-skills/sap-sqlscript/2.2.2/hooks/hooks.json` → `./hooks/dispatch.sh`.
- **אירוע:** `PostToolUse` על matcher `Write|Edit` (timeout 45ש').
- **פעולה:** ולידציית איכות קוד SQLScript ל‑SAP HANA לאחר עריכה/כתיבה של קובץ.
- **קורא?** כן (הקובץ שנערך). **כותב?** לא (ולידציה/דיווח). **רשת?** לא.
- **חוסם?** לא חוסם קשיח (‏PostToolUse — הקובץ כבר נכתב); מדווח בעיות.
- **על‑כשל:** timeout/כשל אינו מפיל את הריצה.
- **סיכון:** נמוך; מקומי.

### 2.3 sap-dependency-security — ולידטור אבטחת תלויות ו‑MCP

- **מקור:** `sap-dependency-security@sap-skills` v2.4.0.
- **מיקום:** `~/.claude/plugins/cache/sap-skills/sap-dependency-security/2.4.0/hooks/hooks.json` → `node hooks/validator.mjs`.
- **אירועים:** `PreToolUse` (‏`Write|Edit|MultiEdit` timeout 30ש', ‏`Bash` timeout 15ש') וגם `PostToolUse` (‏`Write|Edit|MultiEdit` timeout 15ש').
- **פעולה:** בדיקת אבטחה של תלויות וקונפיגורציית MCP — לזהות תלות/פקודה מסוכנת לפני ואחרי כתיבה.
- **קורא?** כן. **כותב?** לא (ולידציה). **רשת?** לא (בדיקה מקומית).
- **חוסם?** כן — כ‑`PreToolUse` יכול להחזיר deny על תלות/פקודה חשודה.
- **על‑כשל:** לא מפיל את הריצה.
- **סיכון:** נמוך; הגנתי.

### 2.4 sapui5 — ולידטור best‑practice ל‑UI5

- **מקור:** `sapui5@sap-skills` v2.2.0.
- **מיקום:** `~/.claude/plugins/cache/sap-skills/sapui5/2.2.0/hooks/hooks.json` → `./hooks/dispatch.sh`.
- **אירועים:** `PreToolUse` (‏`Write|Edit` 30ש', ‏`Bash` 15ש') ו‑`PostToolUse` (‏`Write|Edit` 15ש').
- **פעולה:** אכיפת best‑practices בפיתוח SAPUI5 בעת עריכת קבצים.
- **קורא?** כן. **כותב?** לא. **רשת?** לא.
- **חוסם?** אפשרי בשלב `PreToolUse` (ולידציה מקדימה).
- **על‑כשל:** לא מפיל.
- **סיכון:** נמוך.

### 2.5 Hooks נוספים לא‑SAP (לשלמות)

מאומת מ‑`hooks.json` של תוספים לא‑SAP; מוזכרים כי הם רצים בסביבה אך אינם נוגעים ב‑SAP:
- **impeccable** — `PostToolUse` (‏`Edit|Write|MultiEdit`) + `Stop` → בדיקת עיצוב UI (`skills/impeccable/scripts/hook.mjs`). קורא/מדווח, לא חוסם, סיכון נמוך.
- **reflexion** — `Stop` + `UserPromptSubmit` → `bun hooks/src/index.ts` (רק אם `bun` קיים; אחרת `|| true`). זיכרון/רפלקציה, לא חוסם.
- **watch** — `SessionStart` → `check-setup.sh`. בדיקת התקנה, לא חוסם.
- **superpowers** — `SessionStart` (‏startup/clear/compact) → `run-hook.cmd session-start`. הזרקת הקשר, לא חוסם.
- **vercel** — `SessionStart` (‏startup/resume/clear/compact) → `session-start-seen-skills.mjs`, `session-start-profiler.mjs`, `inject-claude-md.mjs`; וגם `SessionEnd`. הזרקה/פרופיילינג, לא חוסם.

כולם מקומיים, ‏fail‑soft, סיכון נמוך; אינם קשורים ל‑SAP.

---

## 3. הגנת QA / PRD — ההסבר המלא (שומרי sc4sap)

זהו החלק החשוב ביותר. לפרופילי **QA ו‑PRD** קיימת הגנה **דו‑שכבתית** שמונעת שינוי/הרצת קוד על מערכות רגישות. עקיפת שכבה אחת אינה עוקפת את השנייה.

### 3.1 `tier-readonly-guard.mjs` — חסימת מוטציה/הרצה לפי מדרג

- **מיקום:** `~/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/scripts/hooks/tier-readonly-guard.mjs`.
- **אירוע:** `PreToolUse` (שכבה 1). שכבה 2 = שומר זהה בתוך שרת ה‑MCP (‏`readonlyGuard`).
- **פעולה:** קורא את הפרופיל הפעיל (`.sc4sap/active-profile.txt` → `~/.sc4sap/profiles/<alias>/sap.env` → מחלץ `SAP_TIER`; נפילה לאחור ל‑`.sc4sap/sap.env` legacy, ברירת מחדל `DEV`), ואוכף מטריצת חסימה:
  - **PRD:** חוסם `Create*`, `Update*`, `Delete*`, `RunUnitTest`, `RuntimeRunProgramWithProfiling`, `RuntimeRunClassWithProfiling`.
  - **QA:** חוסם `Create*`, `Update*`, `Delete*`, ‏`RuntimeRun*WithProfiling` (‏`RunUnitTest` **מותר**).
  - **DEV:** לא חוסם דבר. `ReloadProfile` תמיד מותר.
- **קורא?** כן (payload + קובצי פרופיל). **כותב?** לא. **רשת?** לא.
- **חוסם?** כן — מחזיר `permissionDecision: "deny"` עם הודעה שמפרטת tool/profile/tier/סיבה, וממליץ לעבור לפרופיל DEV דרך `/sc4sap:sap-option`.
- **על‑כשל:** **fail‑open** — כל שגיאת parse/IO → מאפשר, כי שכבת ה‑MCP (L2) עדיין אוכפת. "‏hook חסר = UX איטי, לא חוסר‑בטיחות".
- **סיכון:** נמוך — הגנתי. השילוב עם L2 מבטיח ש"עקיפת ה‑hook אינה עוקפת את האכיפה".

### 3.2 `block-forbidden-tables.mjs` — חסימת שליפת שורות מטבלאות רגישות

- **מיקום:** `~/.claude/plugins/cache/sc4sap/sc4sap/0.6.14/scripts/hooks/block-forbidden-tables.mjs`.
- **אירוע:** `PreToolUse` — מיירט רק כלים בשם `GetTableContents` / `GetSqlQuery` (כולל חילוץ טבלאות מ‑`FROM`/`JOIN` ב‑SQL).
- **פעולה:** בודק את הטבלאות מול `exceptions/*.md` לפי פרופיל blocklist:
  - `minimal` (רק PII + credentials) · `standard` (‏+ Protected Business Data) · `strict` (הכול, **ברירת מחדל**) · `custom` (רק `.sc4sap/blocklist-custom.txt`). כל פרופיל מכבד גם `.sc4sap/blocklist-extend.txt`.
  - קדימות החלטה: **deny > warn > first**.
- **קורא?** כן (payload + קובצי blocklist + config). **כותב?** לא. **רשת?** לא.
- **חוסם?** כן — טבלת `deny` (PII/סודות) → `permissionDecision: "deny"`; טבלת `warn` ("Protected Business Data") → `permissionDecision: "ask"` (דורש אישור מפורש של המשתמש). מפנה לחלופות: תצוגות CDS משוחררות, נתוני בדיקה אנונימיים, ‏COUNT/SUM.
- **על‑כשל:** **fail‑open** — קובץ blocklist שבור → מאפשר (‏L1 agents ו‑L2 CLAUDE.md עדיין אוכפים מדיניות).
- **סיכון:** נמוך — הגנתי; מונע דלף PII/נתונים עסקיים.

### 3.3 סיכום ההגנה
- **שתי שכבות:** hook ב‑client (‏L1) + שומר בשרת ה‑MCP (‏L2). L1 יכול להיכשל‑פתוח בבטחה כי L2 אוכף בכל מקרה.
- **QA:** קריאה בלבד למעשה — חסום Create/Update/Delete והרצת‑קוד‑מתפרופל, ‏RunUnitTest מותר.
- **PRD:** קריאה בלבד מלאה — חסום Create/Update/Delete וכל הרצת קוד (כולל RunUnitTest).
- **DEV:** פתוח לפיתוח מלא.

---

## 4. Hook של הפרויקט — `auto-push.sh` (קיים אך רדום)

- **שם:** `auto-push.sh`.
- **מקור/מיקום:** `/Users/salihalif/Desktop/My-Projects/sap/.claude/hooks/auto-push.sh`.
- **אירוע מיועד:** `Stop` (לפי הכותרת בקובץ: "Stop hook: auto‑commit + push to origin/main on every change").
- **פעולה (אילו היה רשום):** אם `git status --porcelain` לא ריק → `git add -A` → commit `chore: auto-sync <timestamp>` (בזהות `sali2610-coder`) → `git push origin <branch>`. no‑op כשהעץ נקי.
- **קורא?** כן (מצב git). **כותב?** כן — **יוצר commit ומבצע push** (אילו היה פעיל). **רשת?** כן — push ל‑`origin` (GitHub), אילו היה פעיל.
- **חוסם?** לא (מחזיר `systemMessage`, לא decision).
- **על‑כשל:** ‏`set -euo pipefail`; אם push נכשל (offline/auth) → הודעת כשל ו"ינסה שוב בשינוי הבא".

### 4.1 מצב רישום — **רדום (NOT registered)**
מאומת:
- ‏`snapshot`: "project hooks registered: NONE".
- קריאה ישירה: ב‑`.claude/settings.json` של הפרויקט בלוק `hooks` **ריק** (‏`[]`), וב‑`settings.local.json` אין בלוק `hooks` (‏`None`).
- המחרוזת `auto-push` מופיעה **רק** בתוך רשומות **הרשאות** (‏`Bash(bash .claude/hooks/auto-push.sh)` ופקודות `node -e` להוספת ה‑hook), **לא** כ‑hook רשום.

**מסקנה:** הקובץ קיים אך אינו מחובר לשום אירוע → **הוא אינו רץ ואינו דוחף כרגע** לאוטומטי.

### 4.2 המלצה
- **להשאיר מושבת (מומלץ).** auto‑push על כל `Stop` מבצע commit+push אוטומטי ל‑`origin` ללא בקרת גרסה/סקירה — מסוכן לזרימת עבודה עם branchים ו‑PRים (למשל הענף הנוכחי `feat/book5-ewm-enrichment`). commit ו‑push צריכים להישאר פעולה מפורשת של המשתמש.
- אם בכל זאת יופעל בעתיד — לצמצם ל‑branch ייעודי ולא ל‑`main`, ולוודא בקרת סודות לפני push.

---

## 5. סיכום מהיר

| Hook | מקור | אירוע עיקרי | חוסם? | מצב |
|---|---|---|---|---|
| `notify.sh` | משתמש | events מרובים | לא | פעיל |
| sc4sap (‏~20 סקריפטים) | תוסף sc4sap | כל האירועים | חלקם (guards) | פעיל |
| `tier-readonly-guard` | sc4sap | PreToolUse | כן (QA/PRD) | פעיל |
| `block-forbidden-tables` | sc4sap | PreToolUse | כן (טבלאות) | פעיל |
| sap-sqlscript validator | תוסף | PostToolUse | לא | פעיל |
| sap-dependency-security validator | תוסף | Pre/PostToolUse | כן (Pre) | פעיל |
| sapui5 validator | תוסף | Pre/PostToolUse | אפשרי | פעיל |
| `auto-push.sh` | פרויקט | Stop (מיועד) | לא | **רדום — לא רשום, לא דוחף** |

---

*מקורות: קריאה‑בלבד של `~/.claude/settings.json`, `~/.claude/notify/notify.sh`, `hooks/hooks.json` של sc4sap ו‑sap-skills (sqlscript / dependency-security / sapui5), `scripts/hooks/{tier-readonly-guard,block-forbidden-tables}.mjs`, ו‑`sap/.claude/{settings.json,settings.local.json,hooks/auto-push.sh}`; אימות מצב ב‑`/tmp/sap-brain-facts.md`. ערכים שלא נמצא להם מקור ודאי סומנו "לא אומת". אין הצגת סודות.*
