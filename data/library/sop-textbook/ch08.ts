// ===== S&OP with SAP IBP — Chapter 8 (Planning Simulations) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Hierarchy preserved exactly (ids + order); x.y.z nested under x.y.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH8: TextbookChapter = {
  n: 8,
  titleHe: "סימולציות תכנון",
  titleEn: "Planning Simulations",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לסימולציות תכנון ב-SAP IBP for Sales and Operations. סימולציה היא היכולת לשאול 'מה-אם' (what-if) — לשנות הנחות-יסוד של ביקוש או היצע, להריץ את התכנון מחדש, ולראות את ההשפעה על שירות-הלקוח, על המלאי ועל הרווחיות — בלי לפגוע בתוכנית הרשמית. כל תת-פרק ותת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (מפעל-מילוי של קוקה-קולה), ניווט באפליקציות IBP ובתוסף ה-Excel, טבלאות/אפליקציות/T-Codes, פרטי קונפיגורציה, תרשים-זרימה, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המוקד: versions ו-scenarios ככלי ה-what-if הרשמיים של IBP cloud — סימולציית קפיצת-ביקוש (demand surge) וסימולציית קו-מושבת (line down) במפעל CBC.",
  subchapters: [
    // ============================================================ 8.1
    {
      id: "8.1",
      titleHe: "סימולציות תכנון במבט-על",
      titleEn: "Simulation Planning at a Glance",
      execHe:
        "סימולציה ב-IBP היא הרצת תרחיש 'מה-אם' על נתוני-התכנון בלי לשנות את התוכנית הרשמית. במקום להמר על תחזית או על קיבולת, המתכנן משנה הנחות — קפיצת-ביקוש, השבתת-קו, אספקת-תרכיז מאוחרת — ורואה מיד את ההשפעה על שירות, מלאי ורווחיות. זהו הכלי שמפך את ה-S&OP מתהליך-דיווח לתהליך-החלטה: ההנהלה משווה חלופות מספריות לפני שמחייבת משאבים.",
      beginnerHe:
        "דמיין 'מה היה קורה אילו'. מה היה קורה אילו המכירות יזנקו ב-20%? אם קו-המילוי יישבת ליומיים? סימולציה נותנת לך לשנות מספר אחד או כמה, ללחוץ 'חשב', ולראות את התוצאה — בלי לשבור את התוכנית האמיתית. ב-IBP זה נעשה בעיקר דרך שני כלים: version (עותק נפרד ומלא של הנתונים) ו-scenario (שכבת-שינויים קטנה מעל ה-baseline). אתה משחק בעותק, משווה לרשמי, ואם אהבת — מאמץ.",
      consultantHe:
        "מתודולוגית, סימולציה ב-IBP נשענת על שני מנגנונים משלימים: versions (data-area-level copies — קונטיינר נתונים מלא ונפרד) ו-scenarios (delta layers מעל version, זולים ומהירים). ה-engine (supply heuristic / optimizer / time-series) מורץ על ה-version או ה-scenario הנבחר, ותוצאותיו מבודדות מ-baseline. המתכנן עובד דרך ה-Excel add-in (simulate) או דרך planner workspaces. ההבחנה הקריטית: scenario מתאים ל-what-if מהיר וקצר-טווח על מעט key figures; version מתאים לתהליך מקביל מלא (למשל תקציב מול actual, או תרחיש-צמיחה אסטרטגי). בחירה שגויה בין השניים היא מקור-תקלות נפוץ.",
      purposeHe:
        "המטרה: לאפשר קבלת-החלטות מבוססת-נתונים תחת אי-ודאות. במקום 'נחכה ונראה', ההנהלה מכמתת מראש את הסיכון וההזדמנות בכל תרחיש — כמה מכירות נאבד אם הקו מושבת, כמה מלאי-חירום צריך לקפיצת-ביקוש, ומה עלות כל חלופה — ומחליטה על בסיס מספרים, לא תחושות.",
      processExampleHe:
        "מנהלת-תכנון חוששת מקפיצת-ביקוש לקראת חג. היא יוצרת scenario מעל ה-baseline, מעלה את ה-customer demand ב-25% למשך חודש, מריצה simulate ב-Excel add-in, ובוחנת: האם ה-supply עומד? היכן נוצר מחסור? כמה מלאי-בטיחות נדרש? היא משווה את ה-scenario ל-baseline, מציגה להנהלה ב-S&OP review, וההחלטה מתקבלת.",
      cbcHe:
        "ב-CBC (מפעל-מילוי קוקה-קולה) שתי הסימולציות החוזרות: (1) demand surge — גל-חום צפוי מקפיץ ביקוש למשקאות קלים ב-30%, ובודקים אם תרכיז וקיבולת-מילוי מספיקים; (2) line down — קו-מילוי 2 מושבת לשלושה ימים לתחזוקה, ובודקים את ההשפעה על שירות-הלקוח ועל הצורך בעבודת-משמרת-נוספת. שתיהן מורצות כ-scenarios או versions ומושוות ל-baseline.",
      navHe: [
        "SAP IBP ► Web UI ► Sales and Operations Planning ► Planner Workspaces",
        "SAP IBP ► Excel Add-In ► Simulate (ribbon) ► Save Simulation / Discard",
        "SAP IBP ► Web UI ► Scenarios and Versions (overview tile)",
      ],
      tables: ["Planning Area", "Version", "Scenario", "Key Figure"],
      tcodes: ["IBP Excel Add-In", "Manage Scenarios", "Manage Versions"],
      fiori: ["Planner Workspaces", "Manage Planning Notes", "Dashboards"],
      configHe: [
        "Planning Area: הקונטיינר שמעליו רצות כל הסימולציות; מגדיר key figures, time profile ו-attributes.",
        "Baseline version: ה-version הרשמי (לרוב 'Base Version') שכל scenario נגזר ממנו.",
        "הרשאות: רק תפקידים מורשים יוצרים/מוחקים versions ו-scenarios (PFCG-like roles ב-IBP).",
        "Excel add-in: simulate mode מבודד שינויים בזיכרון עד save; אחרת אינם נשמרים.",
      ],
      flow: [
        { he: "זיהוי שאלת what-if", note: "demand surge / line down" },
        { he: "בחירת מנגנון", code: "scenario/version", note: "מהיר מול מקיף" },
        { he: "שינוי הנחות (key figures)", code: "Excel add-in" },
        { he: "הרצת simulate", code: "Simulate", note: "engine run מבודד" },
        { he: "השוואה ל-baseline", code: "Compare" },
        { he: "החלטה / אימוץ", note: "S&OP review" },
      ],
      mistakesHe: [
        "עריכת ה-baseline ישירות במקום ב-scenario — 'מזהמים' את התוכנית הרשמית.",
        "שכחת save אחרי simulate ב-Excel — השינויים אובדים בסגירה.",
        "בחירת version כבד למשימת-what-if קטנה — בזבוז משאבים וזמן-העתקה.",
        "אי-תיעוד ההנחות מאחורי הסימולציה — אי-אפשר לשחזר את ההיגיון בדיעבד.",
      ],
      troubleshootHe: [
        "התוצאה לא משתנה אחרי simulate ➔ לא בוצע save, או נערך key figure שאינו input.",
        "הסימולציה 'דולפת' ל-baseline ➔ נערך ישירות ה-Base Version במקום scenario.",
        "engine לא רץ על ה-scenario ➔ ה-scenario לא נבחר בהקשר ה-run.",
      ],
      bestPracticeHe: [
        "תמיד עבוד מעל baseline נקי דרך scenario/version — לעולם לא ישירות על הרשמי.",
        "תעד כל סימולציה ב-planning note: ההנחה, הטווח וההחלטה.",
        "השתמש ב-scenario ל-what-if מהיר ו-version לתהליך-מקביל מלא.",
        "סגור/מחק scenarios ישנים כדי לשמור על נראות ועל ביצועים.",
      ],
      interviewHe: [
        { qHe: "מהי סימולציה ב-IBP?", aHe: "הרצת תרחיש 'מה-אם' (what-if) על נתוני-התכנון בלי לשנות את התוכנית הרשמית — שינוי הנחות, הרצת engine מבודדת, והשוואה ל-baseline." },
        { qHe: "מה ההבדל המהותי בין version ל-scenario?", aHe: "version הוא עותק-נתונים מלא ונפרד (כבד, לתהליך-מקביל); scenario הוא שכבת-delta קלה מעל version (זול ומהיר, ל-what-if נקודתי)." },
      ],
      takeawaysHe: [
        "סימולציה = what-if מבודד מ-baseline.",
        "שני מנגנונים: versions (מלא) ו-scenarios (delta).",
        "ה-engine רץ על העותק; baseline נשמר נקי.",
        "המוקד: החלטה מבוססת-מספרים תחת אי-ודאות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · גרסאות (8.3)", href: "/library/sop/chapter-08/#sub-8.3" },
        { labelHe: "S&OP · תרחישים (8.4)", href: "/library/sop/chapter-08/#sub-8.4" },
      ],
      children: [
        {
          id: "8.1.1",
          titleHe: "גורמי ביקוש",
          titleEn: "Demand Factors",
          execHe:
            "גורמי-ביקוש הם המשתנים שסימולציה משנה בצד-הביקוש: תחזית-מכירות, ביקוש-לקוחות, מבצעים, עונתיות וגמישות-מחיר. שינוי שלהם מתרגם מיד ל-net demand שהמערכת מנסה לספק, ולכן הם נקודת-המוצא של רוב סימולציות ה-demand surge.",
          beginnerHe:
            "אלה ה'כפתורים' של הצד שקונה. כמה לקוחות ירצו? מה משפיע — חג, גל-חום, מבצע, מחיר? בסימולציה אתה מסובב כפתור אחד (למשל 'ביקוש +30%') ורואה אם ההיצע מצליח לעמוד.",
          consultantHe:
            "ב-IBP גורמי-הביקוש הם key figures בקטגוריית demand: Customer Demand, Sales Forecast, Promotion Uplift, Statistical Forecast. רובם input key figures שניתן לערוך ב-Excel add-in ולסמלץ עליהם. שינוים מזין מחדש את חישוב ה-Total Demand ואת ה-supply run. עונתיות ומבצעים מנוהלים לרוב כ-key figures נפרדים שמתווספים ל-baseline forecast.",
          purposeHe:
            "לכמת איך שינוי בצד-הביקוש מזיז את כל השרשרת — כמה supply, מלאי וקיבולת נדרשים — לפני שמחייבים משאבים.",
          processExampleHe:
            "המתכנן מעלה את Promotion Uplift ב-15% לחודש המבצע ב-scenario, מריץ simulate, ובוחן אם נוצר מחסור בתקופת-המבצע ומתי צריך להתחיל לבנות מלאי מקדים.",
          cbcHe:
            "ב-CBC גל-חום צפוי: המתכנן מעלה Customer Demand למשקאות-קלים ב-30% לשבועיים, ובודק אם תרכיז + קיבולת-מילוי מספיקים, או שצריך הזמנת-תרכיז דחופה.",
          navHe: [
            "SAP IBP ► Excel Add-In ► edit demand key figures ► Simulate",
            "SAP IBP ► Web UI ► Demand Planning ► Forecast key figures",
          ],
          tables: ["Customer Demand", "Sales Forecast", "Promotion Uplift"],
          tcodes: ["IBP Excel Add-In", "Manage Scenarios"],
          fiori: ["Demand Planning", "Planner Workspaces"],
          configHe: [
            "הגדר אילו demand key figures הם input (editable) ואילו calculated.",
            "Promotion / Seasonality כ-key figures נפרדים המתווספים ל-baseline forecast.",
            "ודא שה-calculation logic מעדכן Total Demand לאחר עריכה.",
          ],
          mistakesHe: [
            "עריכת key figure מחושב (calculated) במקום input — השינוי לא נתפס.",
            "שינוי ביקוש בלי לבדוק את צד-ההיצע — מקבלים תמונה חלקית.",
          ],
          troubleshootHe: [
            "Total Demand לא מתעדכן ➔ נערך key figure מחושב ולא input.",
            "המבצע לא מופיע ➔ Promotion Uplift לא משויך לתקופה/מוצר הנכונים.",
          ],
          bestPracticeHe: [
            "סמלץ גורם-ביקוש אחד בכל פעם כדי לבודד את השפעתו.",
            "תעד את מקור ההנחה (היסטוריה, מבצע, אירוע) ב-planning note.",
          ],
          interviewHe: [
            { qHe: "מהם גורמי-ביקוש לסימולציה?", aHe: "Customer Demand, Sales Forecast, Promotion Uplift, Statistical Forecast — key figures בצד-הביקוש שעריכתם מזינה מחדש את Total Demand." },
          ],
          takeawaysHe: [
            "גורמי-ביקוש = הכפתורים של צד-הביקוש.",
            "רובם input key figures הניתנים לסימולציה.",
            "demand surge מתחיל כאן.",
          ],
        },
        {
          id: "8.1.2",
          titleHe: "גורמי היתכנות היצע",
          titleEn: "Supply Feasibility Factors",
          execHe:
            "גורמי-היתכנות-היצע הם המגבלות שקובעות אם ניתן לספק את הביקוש: קיבולת-ייצור, זמינות-חומרים, lead time, מלאי-פתיחה ומגבלות-ספק. שינוי שלהם הוא לב סימולציית ה-line down — מה קורה כשקיבולת יורדת או חומר חסר.",
          beginnerHe:
            "אלה ה'כפתורים' של הצד שמייצר ומספק. כמה הקו יכול לייצר? יש מספיק תרכיז? כמה זמן לוקח להביא חומר? בסימולציה אתה יכול 'לכבות' קו או 'לקצץ' אספקה ולראות כמה ביקוש יישאר לא-מסופק.",
          consultantHe:
            "ב-IBP גורמי-ההיצע הם key figures ומאפיינים בצד-supply: Production Capacity, Resource Availability, Component Supply, Lead Time, Opening Inventory, Min/Max Stock. ה-supply heuristic או ה-optimizer צורכים אותם כ-constraints. סימולציה משנה constraint (למשל מאפסת קיבולת לקו ביום מסוים) ומריצה מחדש כדי לראות את ה-shortage / late demand שנוצר.",
          purposeHe:
            "לבחון עמידות שרשרת-האספקה תחת הפרעה — השבתה, מחסור, עיכוב — ולתכנן מענה (משמרת-נוספת, ספק-חלופי, מלאי-חירום) מראש.",
          processExampleHe:
            "המתכנן מאפס את Production Capacity של resource מסוים לשלושה ימים ב-scenario, מריץ ה-optimizer, ורואה כמה ביקוש הופך ל-late ובאילו לקוחות — ואז בוחן הסטה לקו אחר.",
          cbcHe:
            "ב-CBC קו-מילוי 2 מושבת לתחזוקה שלושה ימים: המתכנן מוריד את הקיבולת של ה-resource לאפס בתקופה, מסמלץ, ובודק אם קו 1 + משמרת-נוספת מכסים, או שיהיה מחסור ללקוחות מפתח.",
          navHe: [
            "SAP IBP ► Excel Add-In ► edit supply/capacity key figures ► Simulate",
            "SAP IBP ► Web UI ► Supply Planning ► Capacity & Constraints",
          ],
          tables: ["Production Capacity", "Component Supply", "Opening Inventory", "Lead Time"],
          tcodes: ["IBP Excel Add-In", "Supply Heuristic Run"],
          fiori: ["Supply Planning", "Planner Workspaces"],
          configHe: [
            "הגדר resources וקיבולת זמינה כ-key figures ניתנים-לעריכה.",
            "בחר engine: supply heuristic (מהיר, אינפיניטי/קונסטריינד) או optimizer (cost-based).",
            "ודא ש-constraints (capacity, supply) מסומנים כ-constraints ב-run profile.",
          ],
          mistakesHe: [
            "סימולציית-ביקוש בלי לעדכן constraints — ה-supply נראה אינפיניטי ומטעה.",
            "הרצת heuristic אינפיניטי כשנדרש constrained — לא רואים את המחסור האמיתי.",
          ],
          troubleshootHe: [
            "אין מחסור למרות השבתה ➔ ה-run אינפיניטי או הקיבולת לא אופסה בפועל.",
            "late demand לא מחושב ➔ נבחר engine שאינו צורך את ה-constraint.",
          ],
          bestPracticeHe: [
            "סמלץ תמיד עם constrained engine כדי לראות מגבלות אמיתיות.",
            "שלב גורמי-ביקוש והיצע באותה סימולציה לתמונה מלאה.",
          ],
          interviewHe: [
            { qHe: "מהם גורמי-היתכנות-היצע?", aHe: "Production Capacity, Resource Availability, Component Supply, Lead Time, Opening Inventory — constraints שה-supply engine צורך לקביעת מה ניתן לספק." },
          ],
          takeawaysHe: [
            "גורמי-היצע = המגבלות על האספקה.",
            "line down = איפוס קיבולת והרצה מחדש.",
            "חובה constrained engine כדי לראות מחסור.",
          ],
        },
        {
          id: "8.1.3",
          titleHe: "דוגמאות סימולציה",
          titleEn: "Simulation Examples",
          execHe:
            "שתי הסימולציות הקלאסיות ב-S&OP הן demand surge (קפיצת-ביקוש) ו-line down (השבתת-קו). הראשונה בוחנת אם ההיצע עומד בעלייה פתאומית; השנייה בוחנת את ההשפעה של ירידת-קיבולת על השירות. שתיהן מבטאות את ערך-הסימולציה: לכמת סיכון לפני שהוא מתממש.",
          beginnerHe:
            "שתי שאלות נפוצות: 'מה אם פתאום ירצו הרבה יותר?' (demand surge) ו'מה אם מכונה תישבת?' (line down). כל אחת היא סימולציה: משנים כפתור, מריצים, רואים תוצאה. אלה התרחישים שכל מתכנן מריץ שוב ושוב.",
          consultantHe:
            "Demand surge: מעלים demand key figures ב-scenario, מריצים constrained supply, ומזהים shortage / capacity overload. Line down: מאפסים capacity של resource לתקופה ב-scenario, מריצים, ומזהים late demand ולקוחות-מושפעים. שני התרחישים מומחשים יפה דרך version comparison (לתהליך-מקביל) או scenario comparison (ל-what-if מהיר), ומוצגים ב-S&OP review כחלופות מספריות.",
          purposeHe:
            "לתת לארגון 'תרחישי-חזרה' מוכנים — שגרת-סימולציה קבועה לאירועים הצפויים — כך שכשהם מתרחשים, התגובה כבר מתוכננת.",
          processExampleHe:
            "בישיבת-S&OP חודשית מציגים שני scenarios: 'Surge +30%' מול 'Line2 Down 3d', כל אחד מושווה ל-baseline. ההנהלה רואה את הפער בשירות ובעלות, ובוחרת מדיניות-מלאי ותגבור-משמרות.",
          cbcHe:
            "ב-CBC: scenario 'Heatwave Surge' מעלה ביקוש משקאות ב-30%; scenario 'Filler-2 Maintenance' מאפס קיבולת קו-2 לשלושה ימים. שניהם מורצים, מושווים ל-baseline, ומוצגים כ-what-if להחלטת-הנהלה.",
          navHe: [
            "SAP IBP ► Excel Add-In ► create scenario ► Simulate ► Save",
            "SAP IBP ► Web UI ► Manage Scenarios ► Compare",
          ],
          tables: ["Scenario", "Customer Demand", "Production Capacity"],
          tcodes: ["Manage Scenarios", "IBP Excel Add-In"],
          fiori: ["Planner Workspaces", "Dashboards"],
          configHe: [
            "צור scenario ייעודי לכל תרחיש (Surge, Line Down) לשחזור עתידי.",
            "הגדר charts/dashboards להשוואת scenario מול baseline.",
            "שמור scenarios חוזרים כ-templates לשגרת-S&OP.",
          ],
          mistakesHe: [
            "ערבוב שני תרחישים ב-scenario אחד — לא רואים מי גרם למה.",
            "אי-שמירת ה-scenario — אי-אפשר להציגו שוב בישיבה.",
          ],
          troubleshootHe: [
            "ההשוואה לא מציגה פער ➔ ה-scenario לא נשמר או לא נבחר ב-compare.",
            "התוצאה לא הגיונית ➔ נערך baseline ולא ה-scenario.",
          ],
          bestPracticeHe: [
            "תרחיש אחד לכל scenario — בידוד הסיבתיות.",
            "שמור תרחישים חוזרים כ-templates לישיבות-S&OP.",
          ],
          interviewHe: [
            { qHe: "תן שתי דוגמאות-סימולציה נפוצות ב-S&OP.", aHe: "demand surge — קפיצת-ביקוש שבוחנת עמידות-היצע; line down — השבתת-קו שבוחנת השפעה על שירות. שתיהן scenarios מושווים ל-baseline." },
          ],
          takeawaysHe: [
            "demand surge ו-line down = שני התרחישים הקלאסיים.",
            "תרחיש אחד לכל scenario.",
            "מוצגים כחלופות מספריות ב-S&OP review.",
          ],
        },
      ],
    },
    // ============================================================ 8.2
    {
      id: "8.2",
      titleHe: "סימולציות",
      titleEn: "Simulations",
      execHe:
        "סימולציה היא המנגנון התפעולי שבו המתכנן משנה נתונים, מריץ engine, ובוחן תוצאה — בלי לחייב את התוכנית הרשמית. ב-IBP היא מתבצעת בעיקר דרך ה-Excel add-in במצב simulate: השינויים חיים בזיכרון, נחשבים מחדש, ונשמרים רק בלחיצת save. זהו הצינור היומיומי שדרכו עוברות כל סימולציות ה-versions וה-scenarios.",
      beginnerHe:
        "סימולציה היא 'מצב-משחק': אתה משנה מספרים בגיליון ה-Excel, לוחץ simulate, והמערכת מחשבת מחדש בלי לגעת בנתונים האמיתיים. אם התוצאה טובה — לוחץ save; אם לא — discard, וכלום לא קרה. זה המקום שבו אתה עושה בפועל את ה-what-if.",
      consultantHe:
        "ה-Excel add-in הוא הממשק הראשי לסימולציה. במצב simulate, עריכות של input key figures מורצות דרך ה-calculation engine בזיכרון (in-memory) מול ה-version/scenario הנבחר; baseline אינו מושפע עד save. simulate שונה מ-edit-and-save רגיל בכך שהוא מאפשר איטרציות מהירות לפני התחייבות. ה-engine שמורץ תלוי בהקשר: time-series (demand), supply heuristic, או optimizer. תוצאות נשמרות ל-version/scenario הפעיל; אם נדרשת בידוד מלא — עובדים מעל scenario ייעודי.",
      purposeHe:
        "לתת למתכנן מרחב-ניסוי בטוח ומהיר: לבדוק רעיונות, להשוות חלופות, ולחזור על איטרציות — בלי סיכון לתוכנית הרשמית ובלי תלות ב-IT.",
      processExampleHe:
        "המתכנן פותח planning view ב-Excel, נכנס ל-simulate, מעלה ביקוש למוצר, רואה את ה-supply נחשב מחדש בזמן-אמת, מנסה ערך אחר, ולבסוף לוחץ save כדי לקבע את התרחיש ב-scenario — או discard כדי לוותר.",
      cbcHe:
        "ב-CBC המתכננת פותחת את ה-planning view של משקאות-הקיץ ב-Excel add-in, נכנסת ל-simulate, מעלה ביקוש ב-30% (demand surge), רואה את צריכת-התרכיז וקיבולת-המילוי נחשבות מחדש, ושומרת ל-scenario 'Heatwave Surge'.",
      navHe: [
        "SAP IBP ► Excel Add-In ► Planning View ► Simulate",
        "SAP IBP ► Excel Add-In ► Save Simulation / Discard Simulation",
        "SAP IBP ► Excel Add-In ► Set Context (version / scenario)",
      ],
      tables: ["Planning View", "Key Figure", "Version", "Scenario"],
      tcodes: ["IBP Excel Add-In", "Simulate", "Save Simulation"],
      fiori: ["Planner Workspaces", "Manage Planning Notes"],
      configHe: [
        "סמן input key figures כ-editable כדי שניתן יהיה לסמלץ עליהם.",
        "calculation logic חייב לחשב מחדש בזמן-simulate (in-memory).",
        "Context selection: ודא בחירת ה-version/scenario הנכון לפני simulate.",
        "הרשאות-עריכה ל-key figures דרך תפקידי-IBP.",
      ],
      flow: [
        { he: "פתיחת planning view", code: "Excel Add-In" },
        { he: "בחירת context", code: "version/scenario" },
        { he: "כניסה ל-Simulate", code: "Simulate" },
        { he: "עריכת key figures", note: "in-memory recalc" },
        { he: "בחינת תוצאה", note: "איטרציה" },
        { he: "Save / Discard", code: "Save Simulation" },
      ],
      mistakesHe: [
        "סגירת ה-Excel בלי save — כל הסימולציה אובדת.",
        "simulate על baseline במקום על scenario — סיכון ל'זיהום' התוכנית.",
        "עריכת key figure מחושב — אין השפעה ותחושת-תקלה.",
      ],
      troubleshootHe: [
        "אין recalculation בזמן simulate ➔ calculation logic לא מחושב in-memory או נערך KF מחושב.",
        "Save אפור/חסום ➔ חוסר-הרשאה ל-key figure או context שגוי.",
        "השינוי לא נשמר ➔ נלחץ discard או context לא היה הנכון.",
      ],
      bestPracticeHe: [
        "עבוד תמיד במצב simulate על scenario ייעודי, לא על baseline.",
        "שמור (save) רק אחרי שהתרחיש מאומת; אחרת discard.",
        "תעד ב-planning note מה סומלץ ולמה.",
      ],
      interviewHe: [
        { qHe: "כיצד מבצעים סימולציה ב-IBP?", aHe: "דרך ה-Excel add-in במצב simulate — עורכים input key figures, ה-engine מחשב מחדש in-memory מול ה-version/scenario, והשינוי נשמר רק ב-save." },
        { qHe: "מה ההבדל בין simulate ל-edit-and-save רגיל?", aHe: "simulate מאפשר איטרציות בזיכרון בלי לקבע, עד save/discard; edit-and-save רגיל מקבע מיד." },
      ],
      takeawaysHe: [
        "simulate ב-Excel add-in = הצינור התפעולי של כל what-if.",
        "שינויים חיים בזיכרון עד save; discard מבטל.",
        "תמיד על scenario ייעודי, לא על baseline.",
      ],
      relatedHe: [
        { labelHe: "S&OP · סקירת-על (8.1)", href: "/library/sop/chapter-08/#sub-8.1" },
        { labelHe: "S&OP · תרחישים (8.4)", href: "/library/sop/chapter-08/#sub-8.4" },
      ],
    },
    // ============================================================ 8.3
    {
      id: "8.3",
      titleHe: "גרסאות",
      titleEn: "Versions",
      execHe:
        "version ב-IBP הוא עותק-נתונים מלא ונפרד של אזור-התכנון — קונטיינר שבו ניתן לתכנן במקביל לתוכנית הרשמית בלי להשפיע עליה. version מתאים לתהליכים-מקבילים מהותיים: תקציב מול actual, תרחיש-צמיחה אסטרטגי, או baseline אלטרנטיבי. הוא כבד יותר מ-scenario אך מספק בידוד מלא ויכולת-השוואה ברמת ה-key figure לאורך כל אזור-התכנון.",
      beginnerHe:
        "version הוא 'עותק שלם' של כל נתוני-התכנון. תחשוב על 'Save As' של קובץ: עכשיו יש לך שני קבצים נפרדים — הרשמי ועותק-עבודה — ואתה יכול לשנות את העותק בלי לגעת ברשמי. כשמשווים ביניהם רואים בדיוק מה השתנה.",
      consultantHe:
        "version הוא data-area-level container. ה-Base Version הוא הרשמי; versions נוספים נוצרים דרך Manage Versions (copy). כל key figure קיים בכל version בנפרד, ולכן ההעתקה צורכת זיכרון ו-CPU. ה-engine רץ על version ספציפי, ותוצאותיו מבודדות. version comparison מציג key figures זה-לצד-זה. בניגוד ל-scenario (delta layer), version הוא עותק-מלא — לכן עדיף לתהליכים ארוכים/מקיפים ולא ל-what-if נקודתי. Version configuration קובע אילו key figures נכללים והרשאות.",
      purposeHe:
        "לאפשר תכנון-מקביל מבודד: לנהל תוכנית-תקציב, תרחיש-אסטרטגי או baseline-חלופי לצד התוכנית הרשמית, ולהשוות ביניהם ברמת ה-key figure לאורך כל האופק.",
      processExampleHe:
        "צוות-כספים יוצר version 'Budget 2027' כעותק של ה-Base Version, מתכנן בו את התקציב לאורך השנה, ובסוף-רבעון משווה Budget מול Actual (Base) ב-version comparison כדי לזהות סטיות.",
      cbcHe:
        "ב-CBC נוצר version 'Growth Scenario +10%' לתכנון-אסטרטגי שנתי במקביל ל-Base Version התפעולי; ההנהלה משווה את שניהם לקראת השקעות-קיבולת בקווי-מילוי חדשים.",
      navHe: [
        "SAP IBP ► Web UI ► Manage Versions",
        "SAP IBP ► Excel Add-In ► Set Context ► Version",
        "SAP IBP ► Web UI ► Version Comparison (analytics)",
      ],
      tables: ["Version", "Planning Area", "Key Figure"],
      tcodes: ["Manage Versions", "IBP Excel Add-In"],
      fiori: ["Manage Versions", "Planner Workspaces", "Dashboards"],
      configHe: [
        "Base Version = הרשמי; versions נוספים נוצרים כ-copies.",
        "Version configuration: אילו key figures נכללים ב-version.",
        "הרשאות: מי רשאי ליצור/לערוך/למחוק versions.",
        "engine run profile מצביע על ה-version הרצוי.",
      ],
      flow: [
        { he: "יצירת version (copy)", code: "Manage Versions" },
        { he: "בחירת version כ-context", code: "Set Context" },
        { he: "תכנון/הרצת engine", note: "מבודד מ-baseline" },
        { he: "Version Comparison", code: "Compare" },
        { he: "החלטה / מחיקה", code: "Manage Versions" },
      ],
      mistakesHe: [
        "שימוש ב-version ל-what-if נקודתי — בזבוז זיכרון; scenario מתאים יותר.",
        "ריבוי versions ננטשים — עומס זיכרון ובלבול.",
        "עבודה ב-version הלא-נכון בלי לבדוק את ה-context.",
      ],
      troubleshootHe: [
        "השינויים משפיעים על baseline ➔ נבחר Base Version כ-context בטעות.",
        "version comparison ריק ➔ version לא מכיל את ה-key figures או לא הורץ.",
        "אי-אפשר ליצור version ➔ חוסר-הרשאה או חריגת-זיכרון.",
      ],
      bestPracticeHe: [
        "השתמש ב-version רק לתהליך-מקביל מהותי; ל-what-if השתמש ב-scenario.",
        "תן שמות-version ברורים (Budget 2027, Growth +10%).",
        "מחק versions שאינם בשימוש לשמירת ביצועים.",
      ],
      interviewHe: [
        { qHe: "מהו version ב-IBP?", aHe: "עותק-נתונים מלא ונפרד של אזור-התכנון, המאפשר תכנון-מקביל מבודד מ-baseline והשוואה ברמת key figure." },
        { qHe: "מתי לבחור version ולא scenario?", aHe: "כשנדרש תהליך-מקביל מקיף וארוך (תקציב, תרחיש-אסטרטגי), עם בידוד מלא — לא ל-what-if נקודתי וזול." },
      ],
      takeawaysHe: [
        "version = עותק-נתונים מלא ונפרד.",
        "מתאים לתהליך-מקביל מהותי, לא ל-what-if נקודתי.",
        "Base Version = הרשמי; השאר copies.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תרחישים (8.4)", href: "/library/sop/chapter-08/#sub-8.4" },
        { labelHe: "S&OP · השוואת version ו-scenario (8.4.4)", href: "/library/sop/chapter-08/#sub-8.4.4" },
      ],
      children: [
        {
          id: "8.3.1",
          titleHe: "ניהול גרסאות",
          titleEn: "Manage Versions",
          execHe:
            "Manage Versions היא האפליקציה ב-IBP web UI ליצירה, העתקה, עריכה ומחיקה של versions. דרכה יוצרים את עותקי-הנתונים שעליהם רצות הסימולציות-המקבילות, ומנהלים את מחזור-חייהם — מיצירה ועד מחיקה לאחר השימוש.",
          beginnerHe:
            "זה ה'מנהל-קבצים' של ה-versions. כאן מייצרים עותק חדש מה-Base, נותנים לו שם, ובסוף מוחקים אותו כשלא צריך. כל פעולה שקשורה לקיום version עוברת דרך כאן.",
          consultantHe:
            "ב-Manage Versions בוחרים source version (לרוב Base), מגדירים שם ומאפיינים, ומריצים copy שמשכפל את ה-key figures. הפעולה אסינכרונית לאזורי-תכנון גדולים. מחיקה משחררת זיכרון. הרשאות נשלטות ברמת-תפקיד. זוהי נקודת-הכניסה התפעולית לכל ניהול-versions, לעומת Manage Scenarios שמנהלת את ה-delta layers.",
          purposeHe:
            "לתת בעלי-תפקיד שליטה מלאה ובטוחה על מחזור-חיי ה-versions — יצירה מבוקרת ומחיקה מסודרת — בלי מעורבות IT.",
          processExampleHe:
            "צוות-תכנון פותח Manage Versions, יוצר 'Budget 2027' כעותק של Base, עובד בו רבעון, ובסוף-התהליך מוחק אותו אחרי שהמסקנות אומצו.",
          cbcHe:
            "ב-CBC מנהל-התכנון יוצר ב-Manage Versions את 'Growth Scenario +10%', ובסוף סבב-התכנון-האסטרטגי מוחק אותו כדי לשמור על נראות וביצועים.",
          navHe: [
            "SAP IBP ► Web UI ► Manage Versions ► Create / Copy",
            "SAP IBP ► Web UI ► Manage Versions ► Delete",
          ],
          tables: ["Version", "Planning Area"],
          tcodes: ["Manage Versions"],
          fiori: ["Manage Versions"],
          configHe: [
            "Source version לבחירה (לרוב Base) ל-copy.",
            "שם ומאפייני version; הרשאות-תפקיד.",
            "copy אסינכרוני לאזורים גדולים; מעקב-סטטוס.",
          ],
          mistakesHe: [
            "מחיקת version פעיל בטעות — אובדן עבודת-תכנון.",
            "צבירת versions ננטשים — עומס-זיכרון.",
          ],
          troubleshootHe: [
            "copy נכשל ➔ חריגת-זיכרון או חוסר-הרשאה.",
            "אי-אפשר למחוק ➔ version נעול/בשימוש או חוסר-הרשאה.",
          ],
          bestPracticeHe: [
            "תהליך מחיקה מסודר בסוף כל סבב-תכנון.",
            "מוסכמת-שמות אחידה ל-versions.",
          ],
          interviewHe: [
            { qHe: "מה עושים ב-Manage Versions?", aHe: "יוצרים (copy), עורכים ומוחקים versions — ניהול מחזור-חיי עותקי-הנתונים שעליהם רצות סימולציות-מקבילות." },
          ],
          takeawaysHe: [
            "Manage Versions = ה-CRUD של versions.",
            "copy מ-Base; מחיקה משחררת זיכרון.",
            "נהל מחזור-חיים מסודר.",
          ],
        },
        {
          id: "8.3.2",
          titleHe: "השוואת גרסאות",
          titleEn: "Version Comparison",
          execHe:
            "Version Comparison מציג key figures של שני (או יותר) versions זה-לצד-זה לאורך אופק-התכנון — הכלי שהופך version מ'עותק-מבודד' ל'תובנה'. דרכו רואים בדיוק במה תוכנית-החלופה שונה מהרשמית: בביקוש, בהיצע, בשירות או בעלות.",
          beginnerHe:
            "זה 'compare' של שני עותקים. ה-Base מצד אחד, ה-version-החלופי מצד שני, וההפרש ביניהם בולט מיד. כך מבינים מה השתנה ואם החלופה טובה יותר.",
          consultantHe:
            "Version Comparison ממומש דרך analytics/charts ו-planner workspaces, עם key figures מרובי-version באותו view או chart. אפשר להציג delta כ-key figure מחושב. ההשוואה היא ברמת אזור-התכנון המלא (כל ה-key figures), בניגוד ל-scenario comparison שמתמקד ב-delta layer. שימושי ל-S&OP review להצגת חלופות אסטרטגיות.",
          purposeHe:
            "להפוך נתוני-version להחלטה — לראות במספרים את ההבדל בין התוכנית הרשמית לחלופה, ולבחור על בסיס עובדות.",
          processExampleHe:
            "ב-quarterly review מציגים chart המשווה 'Budget 2027' מול 'Actual (Base)' ל-key figure של revenue; הסטיות החודשיות גלויות מיד והשיחה מתמקדת בפערים.",
          cbcHe:
            "ב-CBC משווים 'Growth +10%' מול Base ל-key figures של נפח-מילוי וצריכת-תרכיז, כדי להחליט אם להשקיע בקו-מילוי שלישי.",
          navHe: [
            "SAP IBP ► Web UI ► Analytics ► multi-version chart",
            "SAP IBP ► Web UI ► Planner Workspaces ► Version Comparison",
          ],
          tables: ["Version", "Key Figure"],
          tcodes: ["Manage Versions", "Analytics"],
          fiori: ["Dashboards", "Planner Workspaces"],
          configHe: [
            "הגדר chart/analytics עם key figures מרובי-version.",
            "delta key figure מחושב להדגשת ההפרש.",
            "הרשאות-צפייה ל-versions המושווים.",
          ],
          mistakesHe: [
            "השוואת versions עם key figures שונים — אי-אפשר להשוות תפוחים לתפוחים.",
            "שכחה לכלול את ה-Base בהשוואה.",
          ],
          troubleshootHe: [
            "ההשוואה ריקה ➔ version לא הורץ או חסר key figure.",
            "delta שגוי ➔ נוסחת ה-delta key figure לא מתייחסת ל-versions הנכונים.",
          ],
          bestPracticeHe: [
            "תמיד כלול את ה-Base כעוגן-השוואה.",
            "השתמש ב-delta key figure לבהירות.",
          ],
          interviewHe: [
            { qHe: "מה מציג Version Comparison?", aHe: "key figures של שני versions או יותר זה-לצד-זה לאורך האופק, ברמת אזור-התכנון המלא — כדי לראות את ההבדל בין החלופות." },
          ],
          takeawaysHe: [
            "Version Comparison = version זה-לצד-version.",
            "ברמת אזור-התכנון המלא.",
            "תמיד עם Base כעוגן.",
          ],
        },
        {
          id: "8.3.3",
          titleHe: "קונפיגורציית גרסה",
          titleEn: "Version Configuration",
          execHe:
            "Version configuration קובע אילו key figures נכללים ב-version, אילו הרשאות חלות, וכיצד ה-version מתנהג בהעתקה ובהרצת engine. תצורה נכונה מבטיחה ש-version מכיל בדיוק את הנתונים הדרושים — לא יותר (בזבוז) ולא פחות (השוואה חסרה).",
          beginnerHe:
            "זה 'ההגדרות' של ה-version: מה ייכנס לעותק, מי יכול לגעת בו, ואיך הוא יתנהג. תצורה נכונה = version שמכיל בדיוק את מה שצריך.",
          consultantHe:
            "Version configuration נעשה ברמת אזור-התכנון: סימון אילו key figures משוכפלים ל-versions, הגדרת version-specific attributes, והרשאות-תפקיד. תצורה זו משפיעה על עלות-ההעתקה (זיכרון/זמן) ועל יכולת ה-comparison. החלטה מרכזית: לכלול את כל ה-key figures (השוואה מלאה, יקר) או תת-קבוצה (זול, מוגבל). נשלט דרך הגדרות אזור-התכנון ב-IBP web UI / configuration.",
          purposeHe:
            "לאזן בין שלמות-ההשוואה לעלות-המשאבים, ולהבטיח ממשל-נתונים נכון (מי רואה/עורך מה) על ה-versions.",
          processExampleHe:
            "האדמין מגדיר ש-version-תקציב יכלול רק key figures פיננסיים רלוונטיים, מקצר זמן-העתקה ומוקד את ההשוואה.",
          cbcHe:
            "ב-CBC version 'Growth' מוגדר לכלול רק key figures של נפח, קיבולת ותרכיז — מספיק להחלטת-השקעה, בלי לשכפל את כל אזור-התכנון.",
          navHe: [
            "SAP IBP ► Web UI ► Configuration ► Planning Areas ► Versions",
            "SAP IBP ► Web UI ► Configuration ► Key Figures (version relevance)",
          ],
          tables: ["Planning Area", "Version", "Key Figure"],
          tcodes: ["Configuration", "Manage Versions"],
          fiori: ["Planning Area Configuration"],
          configHe: [
            "סמן אילו key figures רלוונטיים ל-version (כל אזור-התכנון מול תת-קבוצה).",
            "version-specific attributes ו-engine behavior.",
            "הרשאות-תפקיד ליצירה/עריכה/צפייה.",
          ],
          mistakesHe: [
            "כלילת כל ה-key figures כברירת-מחדל — copy יקר ואיטי.",
            "החסרת key figure נדרש — השוואה חלקית ומטעה.",
          ],
          troubleshootHe: [
            "version comparison חסר key figure ➔ לא סומן רלוונטי-ל-version בתצורה.",
            "copy איטי מאוד ➔ נכללו key figures מיותרים בתצורת ה-version.",
          ],
          bestPracticeHe: [
            "כלול רק key figures הדרושים למטרת ה-version.",
            "תאם תצורה עם הרשאות-ממשל-נתונים.",
          ],
          interviewHe: [
            { qHe: "מה קובע Version configuration?", aHe: "אילו key figures נכללים ב-version, הרשאות, והתנהגות בהעתקה/הרצה — איזון בין שלמות-השוואה לעלות-משאבים." },
          ],
          takeawaysHe: [
            "Version configuration = מה נכלל ומי רשאי.",
            "איזון שלמות מול עלות-העתקה.",
            "נשלט ברמת אזור-התכנון.",
          ],
        },
      ],
    },
    // ============================================================ 8.4
    {
      id: "8.4",
      titleHe: "תרחישים",
      titleEn: "Scenarios",
      execHe:
        "scenario ב-IBP הוא שכבת-שינויים (delta layer) קלה מעל version — דרך מהירה וזולה לבדוק 'מה-אם' על מעט key figures בלי לשכפל את כל אזור-התכנון. user-defined scenario הוא הכלי המועדף ל-what-if יומיומי: יוצרים אותו, משנים הנחות, מסמלצים, משווים ל-baseline או ל-scenarios אחרים, ומוחקים כשסיימנו.",
      beginnerHe:
        "scenario הוא 'שכבת-עריכה' מעל הנתונים — לא עותק שלם כמו version, אלא רק ההבדלים שאתה מכניס. זה מהיר וקל: מתאים מצוין ל'מה אם ביקוש יקפוץ?' או 'מה אם הקו יישבת?'. עובדים בשכבה, משווים לרשמי, ומוחקים בלי שאריות.",
      consultantHe:
        "scenario הוא delta layer ברמת version: הוא שומר רק את ה-changed key figure values מעל ה-baseline של ה-version. user-defined scenarios נוצרים דרך ה-Excel add-in (Create Scenario) או ב-Manage Scenarios web UI. ה-engine רץ על ה-scenario תוך שילוב delta + baseline. מכיוון שהוא קל, אפשר להחזיק הרבה scenarios במקביל ל-what-if שונים. ההבחנה מ-version: scenario לא משכפל נתונים — זול ומהיר, אך מוגבל לטווח-שינוי ולא לתהליך-מקביל-מלא.",
      purposeHe:
        "לאפשר what-if מהיר, זול ומרובה — לבדוק עשרות תרחישים נקודתיים ביום בלי עומס-זיכרון, ולהשוות ביניהם ול-baseline לקבלת-החלטה.",
      processExampleHe:
        "המתכנן יוצר שלושה scenarios — 'Surge +20%', 'Surge +30%', 'Surge +40%' — על אותו version, מסמלץ כל אחד, משווה את ההשפעה על המלאי והשירות, ובוחר את רמת-המלאי-המקדים המתאימה.",
      cbcHe:
        "ב-CBC המתכננת מחזיקה במקביל 'Heatwave +30%' ו-'Filler-2 Down 3d' כ-scenarios מעל ה-Base Version, מסמלצת ומשווה את שניהם ל-baseline בישיבת-S&OP.",
      navHe: [
        "SAP IBP ► Excel Add-In ► Create Scenario ► Simulate ► Save",
        "SAP IBP ► Web UI ► Manage Scenarios",
        "SAP IBP ► Web UI ► Manage Scenarios ► Compare",
      ],
      tables: ["Scenario", "Version", "Key Figure"],
      tcodes: ["Manage Scenarios", "IBP Excel Add-In"],
      fiori: ["Manage Scenarios", "Planner Workspaces"],
      configHe: [
        "scenario תמיד נגזר מ-version (לרוב Base).",
        "אילו key figures ניתנים לעריכה ב-scenario (input KFs).",
        "הרשאות ליצירה/שיתוף/מחיקה של scenarios.",
        "engine run profile התומך בהרצת scenario.",
      ],
      flow: [
        { he: "יצירת scenario מ-version", code: "Create Scenario" },
        { he: "עריכת delta (key figures)", code: "Excel Add-In" },
        { he: "Simulate", code: "Simulate", note: "delta + baseline" },
        { he: "Compare (ל-baseline/scenarios)", code: "Compare" },
        { he: "אימוץ / מחיקה", code: "Manage Scenarios" },
      ],
      mistakesHe: [
        "בלבול scenario עם version — שימוש בכלי-הכבד למשימה-קלה.",
        "החזקת scenarios ישנים רבים — בלבול ועומס-נראות.",
        "אי-מחיקה אחרי החלטה — צבירת 'רעש'.",
      ],
      troubleshootHe: [
        "scenario לא משפיע ➔ נערך KF מחושב ולא input, או delta לא נשמר.",
        "scenario נעלם ➔ ה-version המקור נמחק/השתנה.",
        "compare לא מציג ➔ scenario לא נשמר או לא נבחר.",
      ],
      bestPracticeHe: [
        "השתמש ב-scenario כברירת-מחדל ל-what-if; version רק לתהליך-מקביל.",
        "מוסכמת-שמות ברורה ומחיקה אחרי החלטה.",
        "תרחיש אחד לכל scenario לבידוד הסיבתיות.",
      ],
      interviewHe: [
        { qHe: "מהו scenario ב-IBP?", aHe: "delta layer קל מעל version השומר רק את ה-key figure values ששונו — כלי ל-what-if מהיר וזול, ללא שכפול-נתונים מלא." },
        { qHe: "מתי scenario עדיף על version?", aHe: "ל-what-if נקודתי, מהיר ומרובה על מעט key figures — כשאין צורך בתהליך-מקביל-מלא ובבידוד מלא של כל אזור-התכנון." },
      ],
      takeawaysHe: [
        "scenario = delta layer קל מעל version.",
        "מהיר וזול ל-what-if מרובה.",
        "user-defined; נמחק בלי שאריות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · גרסאות (8.3)", href: "/library/sop/chapter-08/#sub-8.3" },
        { labelHe: "S&OP · סימולציות (8.2)", href: "/library/sop/chapter-08/#sub-8.2" },
      ],
      children: [
        {
          id: "8.4.1",
          titleHe: "יצירת תרחיש",
          titleEn: "Scenario Creation",
          execHe:
            "יצירת user-defined scenario נעשית בעיקר דרך ה-Excel add-in (Create Scenario) או ב-Manage Scenarios. בוחרים version-מקור, נותנים שם, ומקבלים שכבת-delta ריקה שעליה מתחילים לסמלץ. זהו הצעד הראשון בכל what-if מבוסס-scenario.",
          beginnerHe:
            "פותחים scenario חדש מעל הנתונים: בוחרים מאיזה version להתחיל, נותנים שם (למשל 'Surge +30%'), ומתחילים לשנות מספרים. השכבה ריקה עד שאתה מכניס שינוי.",
          consultantHe:
            "ב-Excel add-in: Create Scenario ► בחירת source version ► שם. השכבה היא delta ריק; כל עריכת input key figure נכנסת ל-delta. ב-Manage Scenarios web UI ניתן ליצור, לשתף ולנהל הרשאות. ה-scenario חי מעל ה-version עד מחיקה. יצירה היא זולה (אין copy של נתונים) — לכן אפשר ליצור רבים.",
          purposeHe:
            "להקים מהר ובזול את מרחב-העבודה ל-what-if נקודתי, עם שיוך ברור ל-version-מקור ולשם משמעותי.",
          processExampleHe:
            "המתכנן יוצר scenario 'Promo April +15%' מעל Base, ומיד מתחיל לערוך את ה-Promotion Uplift לחודש אפריל.",
          cbcHe:
            "ב-CBC המתכננת יוצרת scenario 'Heatwave Surge' מעל ה-Base Version לקראת גל-חום, ומכינה את שכבת-ה-delta לעריכת-הביקוש.",
          navHe: [
            "SAP IBP ► Excel Add-In ► Create Scenario",
            "SAP IBP ► Web UI ► Manage Scenarios ► Create",
          ],
          tables: ["Scenario", "Version"],
          tcodes: ["Manage Scenarios", "IBP Excel Add-In"],
          fiori: ["Manage Scenarios"],
          configHe: [
            "בחירת source version (לרוב Base).",
            "שם-scenario משמעותי וניתן-לשחזור.",
            "הרשאות ושיתוף ב-Manage Scenarios.",
          ],
          mistakesHe: [
            "יצירה מ-version שגוי — ה-delta נשען על baseline לא-נכון.",
            "שם גנרי ('Scenario1') — אי-אפשר לזהות בדיעבד.",
          ],
          troubleshootHe: [
            "Create Scenario חסום ➔ חוסר-הרשאה או context-version לא נבחר.",
            "ה-scenario נשען על נתונים לא-צפויים ➔ נבחר source version שגוי.",
          ],
          bestPracticeHe: [
            "תן שם המתאר את ההנחה (Surge +30%, Line2 Down).",
            "צור תמיד מתוך ה-version הנכון.",
          ],
          interviewHe: [
            { qHe: "כיצד יוצרים scenario?", aHe: "דרך Create Scenario ב-Excel add-in או Manage Scenarios — בוחרים source version ושם, ומקבלים שכבת-delta ריקה לסימולציה." },
          ],
          takeawaysHe: [
            "יצירה זולה — אין copy של נתונים.",
            "תמיד מ-version-מקור נכון.",
            "שם משמעותי וניתן-לשחזור.",
          ],
        },
        {
          id: "8.4.2",
          titleHe: "השוואת תרחישים",
          titleEn: "Scenario Comparison",
          execHe:
            "Scenario Comparison מציג מספר scenarios זה-לצד-זה (ולעומת baseline) לאורך אופק-התכנון, על ה-key figures שעניינם השתנה. זהו הכלי שהופך מגוון-תרחישים להחלטה: רואים מי נותן שירות טוב יותר, מלאי נמוך יותר או עלות נמוכה יותר.",
          beginnerHe:
            "כשיש לך כמה scenarios ('Surge +20/30/40%'), ה-comparison מראה את כולם ביחד ואת ההפרש מהרשמי. כך בוחרים את התרחיש הטוב ביותר.",
          consultantHe:
            "Scenario Comparison ממומש דרך charts/analytics או planner workspaces המציגים key figures מרובי-scenario. ההשוואה מתמקדת ב-delta key figures (מה שהשתנה), בניגוד ל-version comparison הרחב. שימושי במיוחד ב-S&OP review להצגת חלופות-תפעוליות. אפשר להציג גם scenario מול baseline (ראה 8.4.4).",
          purposeHe:
            "לבחור בין חלופות-what-if על בסיס מספרים — KPI-ים של שירות, מלאי ועלות — במקום אינטואיציה.",
          processExampleHe:
            "ב-S&OP review מציגים chart המשווה 'Surge +20%', '+30%', '+40%' ל-key figures של projected stock ו-non-delivery; ההנהלה בוחרת את מדיניות-המלאי המתאימה.",
          cbcHe:
            "ב-CBC משווים 'Heatwave +30%' מול 'Filler-2 Down 3d' באותו chart, ורואים איזה תרחיש פוגע יותר בשירות-הלקוח.",
          navHe: [
            "SAP IBP ► Web UI ► Manage Scenarios ► Compare",
            "SAP IBP ► Web UI ► Analytics ► multi-scenario chart",
          ],
          tables: ["Scenario", "Key Figure"],
          tcodes: ["Manage Scenarios", "Analytics"],
          fiori: ["Planner Workspaces", "Dashboards"],
          configHe: [
            "chart/analytics התומך ב-key figures מרובי-scenario.",
            "בחירת ה-scenarios וה-key figures להשוואה.",
            "delta key figures להדגשת ההפרש.",
          ],
          mistakesHe: [
            "השוואת scenarios שנגזרו מ-versions שונים — בסיס-השוואה לא-אחיד.",
            "השוואה על KF לא-רלוונטי — מסקנה מטעה.",
          ],
          troubleshootHe: [
            "ההשוואה ריקה ➔ scenarios לא נשמרו או לא הורצו.",
            "תוצאות לא-עקביות ➔ scenarios ממקורות-version שונים.",
          ],
          bestPracticeHe: [
            "השווה scenarios מאותו version-מקור.",
            "התמקד ב-KPI-החלטה: שירות, מלאי, עלות.",
          ],
          interviewHe: [
            { qHe: "מה מציג Scenario Comparison?", aHe: "מספר scenarios זה-לצד-זה (ומול baseline) על ה-key figures שהשתנו — לבחירת החלופה הטובה ביותר על בסיס מספרים." },
          ],
          takeawaysHe: [
            "Scenario Comparison = scenario מול scenario.",
            "מתמקד ב-delta key figures.",
            "השווה מאותו version-מקור.",
          ],
        },
        {
          id: "8.4.3",
          titleHe: "ניהול תרחיש",
          titleEn: "Manage Scenario",
          execHe:
            "Manage Scenarios היא האפליקציה לניהול מחזור-חיי ה-scenarios: יצירה, עריכה, שיתוף, נעילה ומחיקה. דרכה שומרים על סדר במרחב-ה-what-if — מבטיחים שתרחישים רלוונטיים זמינים, ושתרחישים ישנים נמחקים.",
          beginnerHe:
            "זה ה'מנהל' של כל ה-scenarios שלך: רואים את כולם במקום אחד, משתפים עם עמיתים, ומוחקים את מה שכבר לא צריך. כך הרשימה נשארת נקייה.",
          consultantHe:
            "ב-Manage Scenarios (web UI) רואים את כל ה-scenarios, ה-source version והבעלים. אפשר לשתף scenario עם משתמשים/תפקידים, לנעול לעריכה, ולמחוק. הניהול הזה חיוני לממשל: scenario משותף משמש לדיון-צוות; מחיקה מסודרת מונעת 'רעש'. בניגוד ל-Manage Versions (עותקים-מלאים), כאן מנהלים את שכבות-ה-delta.",
          purposeHe:
            "לשמור על מרחב-what-if מסודר, משותף ובר-ממשל — נראות מי יצר מה, מי רשאי לערוך, ומתי למחוק.",
          processExampleHe:
            "ראש-צוות פותח Manage Scenarios, משתף את 'Surge +30%' עם חברי-הצוות לדיון, ולאחר ההחלטה מוחק את ה-scenarios שלא נבחרו.",
          cbcHe:
            "ב-CBC מנהלת-התכנון משתפת את scenario 'Filler-2 Down 3d' עם מנהל-הייצור לתיאום-משמרות, ומוחקת אותו לאחר ביצוע-התחזוקה.",
          navHe: [
            "SAP IBP ► Web UI ► Manage Scenarios ► Share / Lock",
            "SAP IBP ► Web UI ► Manage Scenarios ► Delete",
          ],
          tables: ["Scenario", "Version"],
          tcodes: ["Manage Scenarios"],
          fiori: ["Manage Scenarios"],
          configHe: [
            "הרשאות שיתוף ועריכה ברמת-תפקיד.",
            "נעילת scenario למניעת עריכה מקבילה.",
            "מדיניות-מחיקה ושמירת-נראות.",
          ],
          mistakesHe: [
            "מחיקת scenario משותף שעמית עדיין צריך.",
            "אי-נעילה — עריכות מקבילות סותרות.",
          ],
          troubleshootHe: [
            "עמית לא רואה scenario ➔ לא שותף או חסר-הרשאה.",
            "אי-אפשר לערוך ➔ ה-scenario נעול על-ידי משתמש אחר.",
          ],
          bestPracticeHe: [
            "שתף scenarios לדיוני-צוות; נעל בעת-עריכה.",
            "מחק לאחר החלטה לשמירת-נראות.",
          ],
          interviewHe: [
            { qHe: "מה מנהלים ב-Manage Scenarios?", aHe: "מחזור-חיי scenarios — יצירה, שיתוף, נעילה ומחיקה — לשמירה על מרחב-what-if מסודר ובר-ממשל." },
          ],
          takeawaysHe: [
            "Manage Scenarios = CRUD + שיתוף ל-scenarios.",
            "שיתוף לדיוני-צוות; מחיקה לסדר.",
            "מנהל delta layers, לא עותקים-מלאים.",
          ],
        },
        {
          id: "8.4.4",
          titleHe: "השוואת גרסה ותרחיש",
          titleEn: "Version and Scenario Comparison",
          execHe:
            "ההשוואה המשולבת של version מול scenario (ושל baseline) היא תמונת-ההחלטה השלמה: רואים יחד את התוכנית הרשמית, את החלופה-המקבילה (version) ואת ה-what-if הנקודתי (scenario). כך ההנהלה משווה אסטרטגיה ותפעול באותו view ומחליטה במבט אחד.",
          beginnerHe:
            "לפעמים רוצים לראות הכל ביחד: הרשמי, עותק-מקביל (version) ושכבת-שינוי (scenario). ההשוואה המשולבת מציגה את שלושתם זה-לצד-זה כדי לבחור.",
          consultantHe:
            "ב-IBP אפשר להציג באותו chart/workspace key figures ממקורות שונים: baseline (Base Version), version-חלופי, ו-scenario מעל version. מכיוון ש-scenario יושב מעל version, ההשוואה המשולבת דורשת התייחסות למקור-כל-עמודה. שימושי כש-S&OP review משלב שאלה-אסטרטגית (version: Growth +10%) עם שאלה-תפעולית (scenario: Heatwave Surge) — מציגים את שתיהן מול ה-Base ומחליטים.",
          purposeHe:
            "לאחד את שתי רמות-ה-what-if — האסטרטגית (version) והתפעולית (scenario) — מול הרשמית, בתמונה אחת לקבלת-החלטה.",
          processExampleHe:
            "ב-S&OP review מציגים chart עם שלוש סדרות: Base, version 'Growth +10%', ו-scenario 'Heatwave Surge'; ההנהלה רואה את ההשפעה המשולבת על קיבולת ומחליטה על השקעה ועל מלאי-מקדים גם יחד.",
          cbcHe:
            "ב-CBC משווים Base מול version 'Growth +10%' (אסטרטגי) מול scenario 'Heatwave +30%' (תפעולי) באותו chart — ורואים אם תוכנית-הצמיחה מספיקה גם לגל-חום פתאומי.",
          navHe: [
            "SAP IBP ► Web UI ► Analytics ► combined version+scenario chart",
            "SAP IBP ► Web UI ► Planner Workspaces ► multi-source comparison",
          ],
          tables: ["Version", "Scenario", "Key Figure"],
          tcodes: ["Manage Versions", "Manage Scenarios", "Analytics"],
          fiori: ["Dashboards", "Planner Workspaces"],
          configHe: [
            "chart התומך ב-key figures ממקורות מעורבים (version + scenario + base).",
            "תיוג-ברור של מקור-כל-סדרה.",
            "הרשאות-צפייה לכל ה-versions/scenarios המוצגים.",
          ],
          mistakesHe: [
            "ערבוב-מקורות בלי תיוג — בלבול מי-מי בהשוואה.",
            "השוואת scenario מ-version אחד מול version אחר ללא הסבר — בסיס לא-אחיד.",
          ],
          troubleshootHe: [
            "סדרה חסרה ➔ ה-version/scenario לא הורץ או חסר-הרשאה.",
            "ערכים לא-מתיישבים ➔ ה-scenario יושב מעל version אחר מהמוצג.",
          ],
          bestPracticeHe: [
            "תייג בבירור את מקור-כל-סדרה (Base / Version / Scenario).",
            "השתמש בהשוואה המשולבת ל-S&OP review ברמת-הנהלה.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים בהשוואת version ו-scenario יחד?", aHe: "כשרוצים תמונת-החלטה מלאה — לראות את הרשמי, חלופה-אסטרטגית (version) ו-what-if-תפעולי (scenario) זה-לצד-זה באותו view." },
            { qHe: "מה הזהירות בהשוואה משולבת?", aHe: "scenario יושב מעל version מסוים; חובה לוודא בסיס-השוואה אחיד ולתייג את מקור-כל-סדרה." },
          ],
          takeawaysHe: [
            "השוואה משולבת = baseline + version + scenario יחד.",
            "מאחדת רמה-אסטרטגית ותפעולית בתמונה אחת.",
            "תייג מקור-כל-סדרה לבסיס אחיד.",
          ],
          relatedHe: [
            { labelHe: "S&OP · השוואת גרסאות (8.3.2)", href: "/library/sop/chapter-08/#sub-8.3.2" },
            { labelHe: "S&OP · השוואת תרחישים (8.4.2)", href: "/library/sop/chapter-08/#sub-8.4.2" },
          ],
        },
      ],
    },
    // ============================================================ 8.5
    {
      id: "8.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את סימולציות-התכנון ב-IBP for S&OP: היכולת לשאול 'מה-אם' בלי לפגוע בתוכנית הרשמית. ראינו את גורמי-הביקוש וההיצע שמניעים סימולציה, את שני התרחישים הקלאסיים (demand surge, line down), ואת שני מנגנוני ה-what-if — versions (עותק-מלא לתהליך-מקביל) ו-scenarios (delta layer קל ל-what-if מהיר) — כולל יצירה, השוואה וניהול של שניהם.",
      beginnerHe:
        "סיכום פשוט: סימולציה = 'מה אם'. עושים אותה ב-Excel add-in (simulate), ושומרים את התוצאה ב-scenario (שכבה קלה) או ב-version (עותק שלם). משווים לרשמי, מחליטים, מנקים. זהו לב ה-S&OP: החלטות לפי מספרים, לא תחושות.",
      consultantHe:
        "המסר המקצועי: בחר נכון בין version ל-scenario. scenario — delta layer, זול, ל-what-if נקודתי ומרובה; version — עותק-נתונים מלא, לתהליך-מקביל מהותי ובידוד מלא. הרץ תמיד constrained engine כדי לראות מגבלות אמיתיות, עבוד מעל baseline נקי, תעד הנחות ב-planning notes, והשתמש ב-comparisons (version, scenario, ומשולב) להצגת חלופות מספריות ב-S&OP review. ה-Excel add-in (simulate, save) הוא הצינור התפעולי; Manage Versions ו-Manage Scenarios הם כלי-הממשל.",
      purposeHe:
        "לסכם את הפרק לכדי שגרת-עבודה ישימה: מתי לסמלץ, איזה כלי לבחור, איך להשוות, ואיך להציג להחלטה.",
      processExampleHe:
        "מחזור-S&OP מלא: זיהוי שאלת-what-if ► בחירת scenario/version ► simulate ב-Excel ► comparison מול baseline ► הצגה ב-review ► החלטה ► ניקוי scenarios/versions ישנים.",
      cbcHe:
        "ב-CBC השגרה: לכל סבב-S&OP מריצים 'Heatwave Surge' ו-'Filler-2 Down' כ-scenarios, ולתכנון-שנתי מחזיקים version 'Growth +10%'; מציגים את כולם מול Base ומחליטים על מלאי, קיבולת והשקעה.",
      navHe: [
        "SAP IBP ► Excel Add-In ► Simulate / Save",
        "SAP IBP ► Web UI ► Manage Versions / Manage Scenarios",
        "SAP IBP ► Web UI ► Analytics ► Comparisons",
      ],
      tables: ["Version", "Scenario", "Key Figure", "Planning Area"],
      tcodes: ["IBP Excel Add-In", "Manage Versions", "Manage Scenarios"],
      fiori: ["Planner Workspaces", "Manage Versions", "Manage Scenarios", "Dashboards"],
      configHe: [
        "baseline נקי (Base Version) כעוגן לכל סימולציה.",
        "input key figures מסומנים editable לסימולציה.",
        "constrained engine ב-run profile לראיית-מגבלות.",
        "הרשאות-ממשל ל-versions ול-scenarios.",
      ],
      mistakesHe: [
        "בחירת version כש-scenario מספיק (ולהיפך).",
        "סימולציה אינפיניטית כשנדרשת constrained.",
        "אי-תיעוד הנחות ואי-ניקוי תרחישים ישנים.",
      ],
      troubleshootHe: [
        "תוצאות לא-משתנות ➔ KF מחושב, חוסר-save, או engine שגוי.",
        "'זיהום' התוכנית ➔ עריכה ישירה של Base במקום scenario/version.",
        "השוואות ריקות ➔ העדר run או חוסר-הרשאה/תצורה.",
      ],
      bestPracticeHe: [
        "scenario ל-what-if מהיר; version לתהליך-מקביל מהותי.",
        "constrained engine, baseline נקי, planning notes לתיעוד.",
        "comparisons להצגת-החלטה; ניקוי מסודר בסוף-סבב.",
      ],
      interviewHe: [
        { qHe: "סכם את ההבדל version מול scenario בסימולציות.", aHe: "version = עותק-נתונים מלא ונפרד (כבד, לתהליך-מקביל מבודד); scenario = delta layer קל מעל version (זול ומהיר, ל-what-if נקודתי ומרובה)." },
        { qHe: "מהן שתי הסימולציות הקלאסיות ב-S&OP?", aHe: "demand surge (קפיצת-ביקוש לבחינת עמידות-היצע) ו-line down (השבתת-קו לבחינת השפעה על שירות) — שתיהן מורצות כ-scenarios/versions ומושוות ל-baseline." },
      ],
      takeawaysHe: [
        "סימולציה = what-if מבודד מ-baseline.",
        "scenario (delta קל) מול version (עותק-מלא) — בחר לפי המשימה.",
        "constrained engine, baseline נקי, comparisons להחלטה.",
        "Excel add-in מבצע; Manage Versions/Scenarios מנהל.",
      ],
      relatedHe: [
        { labelHe: "S&OP · סקירת-על (8.1)", href: "/library/sop/chapter-08/#sub-8.1" },
        { labelHe: "S&OP · גרסאות (8.3)", href: "/library/sop/chapter-08/#sub-8.3" },
        { labelHe: "S&OP · תרחישים (8.4)", href: "/library/sop/chapter-08/#sub-8.4" },
      ],
    },
  ],
};
