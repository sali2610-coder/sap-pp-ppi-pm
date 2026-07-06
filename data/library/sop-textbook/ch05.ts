// ===== S&OP with SAP IBP Digital Textbook — Chapter 5 =====
// Constrained Supply Planning. Every node is a complete LearningNode with the
// full 18 facets of authored Hebrew (beginner + consultant friendly).
// SAP objects kept verbatim in English; הארגון = Example Product bottling constrained
// S&OP optimizer (capacity-limited fill lines, cost minimization, fair-share).
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "תכנון אספקה מוגבל",
  titleEn: "Constrained Supply Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון-אספקה מוגבל (Constrained Supply Planning) ב-SAP IBP for Sales and Operations. בעוד תכנון בלתי-מוגבל (unconstrained) מניח קיבולת אינסופית ומראה 'מה היינו רוצים', תכנון מוגבל לוקח בחשבון את מגבלות-המציאות — קיבולת קווי-מילוי, זמינות-חומרים, תחבורה ותקציב — ומחזיר תכנית בת-ביצוע. הלב של היכולת הוא ה-S&OP Optimizer: מנוע אופטימיזציה מבוסס-תכנות-ליניארי (LP/MILP) שממקסם רווח או ממזער עלות בכפוף לאילוצים. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת הארגון, ניווט באפליקציות IBP בענן, מקטעי-ייחוס (planning levels / key figures / apps), פרטי-קונפיגורציה, תרשים-הרצת-אופטימייזר, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. SAP IBP הוא פתרון-ענן (cloud), והאובייקטים — S&OP Optimizer, hard/soft constraints, cost key figures, fair-share, product substitution, finite heuristic — נשמרים באנגלית מקורית. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1",
      titleHe: "תכנון אספקה מוגבל במבט-על",
      titleEn: "Constrained Supply Planning at a Glance",
      execHe:
        "תכנון-אספקה מוגבל הוא המעבר מ'מה היינו רוצים לספק' ל'מה אנחנו באמת יכולים לספק'. תכנון בלתי-מוגבל מתעלם מקיבולת ומחזיר תכנית-משאלות; תכנון מוגבל מכניס את מגבלות-המציאות — קיבולת, חומרים, תחבורה ותקציב — ומחזיר תכנית בת-ביצוע שאפשר להתחייב עליה ב-S&OP. זוהי נקודת-המפגש שבה מכירות, ייצור ושרשרת-אספקה מסכימים על מספר אחד.",
      beginnerHe:
        "דמיין מפעל עם ביקוש של 100 ארגזים אבל קו-מילוי שמסוגל לייצר רק 80. תכנון בלתי-מוגבל יגיד 'תכננו 100' ויתעלם מהבעיה. תכנון מוגבל יגיד 'אפשר רק 80 — הנה איך לחלק אותם בצורה החכמה ביותר'. הוא לוקח בחשבון את כל ה'קירות' — כמה הקו יכול, כמה חומר-גלם יש, כמה משאיות יש — ומחזיר תכנית שבאמת ניתן לבצע.",
      consultantHe:
        "ב-IBP for S&OP יש שני מנועים: ה-S&OP Heuristic (חישוב מבוסס-כללים שיכול לרוץ בלתי-מוגבל או, ב-Finite Heuristic, מוגבל ברמת-משאב בודד) וה-S&OP Optimizer (מנוע LP/MILP אמיתי שמאזן את כל המשאבים והאילוצים בו-זמנית ומחפש פתרון אופטימלי גלובלי). הבחירה ביניהם מוגדרת ב-Operator profile של ה-application job. תכנון מוגבל דורש מודל-נתונים עשיר: capacity supply ו-resource per product, רכיבי-עלות (cost key figures), ופרופיל-אילוצים. התוצאה — Constrained Demand, Constrained Supply ו-Capacity Utilization — נכתבת חזרה לאותם key figures שעליהם בנויות תצוגות-ה-S&OP.",
      purposeHe:
        "המטרה: לייצר תכנית-אספקה ריאלית שמשמשת בסיס להתחייבות עסקית (Supply Commit) ב-S&OP. תכנון מוגבל חושף צווארי-בקבוק מראש, מאפשר לקבל החלטות trade-off (איזה לקוח/מוצר מקבל קדימות) באופן שקוף ומבוסס-עלות, ומונע התחייבויות-יתר שמתפוצצות ברצפת-הייצור.",
      processExampleHe:
        "תהליך S&OP חודשי: (1) Demand Review מאשר תחזית; (2) הרצת Supply Planning — תחילה Heuristic בלתי-מוגבל לראות את ה'משאלה'; (3) זיהוי צווארי-בקבוק שבהם Capacity Utilization > 100%; (4) הרצת S&OP Optimizer מוגבל; (5) השוואת Unconstrained Demand מול Constrained Demand — הפער הוא הביקוש שלא ייענה; (6) Supply Review ו-Pre-S&OP מחליטים על trade-offs; (7) Executive S&OP מאשר את התכנית המוגבלת כ-commit.",
      scenarioHe:
        "בארגון: ביקוש-שיא לפני הקיץ עולה על קיבולת קווי-המילוי. הרצה בלתי-מוגבלת מציגה ביקוש של 1.2M ארגזים; קווי-המילוי מוגבלים ל-1.0M. ה-S&OP Optimizer מחזיר Constrained Demand של 1.0M, מסמן 0.2M כביקוש לא-נענה (lost demand), וממליץ אילו SKU ואילו לקוחות לתעדף לפי תרומה-לרווח — תוך שמירה על fair-share בין מפיצים אזוריים.",
      navHe: [
        "SAP IBP ► Application Jobs ► Define and run a Supply Planning Operator (Heuristic / Optimizer)",
        "SAP IBP ► Sales and Operations Planning ► Supply Planning view (Constrained Demand / Constrained Supply / Capacity Utilization)",
        "SAP IBP for Microsoft Excel ► Planning View ► run the S&OP Operator and analyze constrained results",
      ],
      tables: ["KF: CONSTRAINEDDEMAND", "KF: CONSTRAINEDSUPPLY", "KF: CAPADEMAND", "KF: CAPASUPPLY"],
      tcodes: ["IBP S&OP Heuristic", "IBP S&OP Optimizer", "Finite Heuristic"],
      fiori: ["Application Jobs", "Manage Planning Operators", "Analytics – Capacity Utilization"],
      configHe: [
        "Planning Area S&OP (SAP7/SAPIBP1) חייב לכלול את ה-key figures לאספקה מוגבלת: capacity supply, constrained demand/supply, ו-cost key figures.",
        "Operator profile: בחר S&OP Optimizer (מוגבל מלא) או Finite Heuristic (מוגבל ברמת-משאב) מול S&OP Heuristic (בלתי-מוגבל).",
        "Planning levels נדרשים: רמת PERPRODCUSTLOC לביקוש ורמת RESOURCE לקיבולת.",
      ],
      flow: [
        { he: "תחזית מאושרת (Demand Review)", code: "Demand Plan", note: "קלט" },
        { he: "הרצה בלתי-מוגבלת", code: "S&OP Heuristic", note: "ה'משאלה'" },
        { he: "זיהוי צווארי-בקבוק", code: "Capacity Utilization", note: ">100%" },
        { he: "הרצה מוגבלת", code: "S&OP Optimizer", note: "פתרון בר-ביצוע" },
        { he: "Constrained Demand vs Unconstrained", code: "Gap = lost demand" },
        { he: "אישור Supply Commit", code: "Executive S&OP" },
      ],
      masterDataHe: [
        "Resource (קו-מילוי/מכונה) עם Capacity Supply תקופתי.",
        "Production Source of Supply המקשר product↔resource עם rate/consumption.",
        "Customer / Location לחלוקת fair-share.",
      ],
      mistakesHe: [
        "הרצת Optimizer בלי לטעון Capacity Supply — התוצאה למעשה בלתי-מוגבלת.",
        "בלבול בין Heuristic בלתי-מוגבל ל-Optimizer מוגבל והשוואת תפוחים לתפוזים.",
        "התעלמות מ-lost demand (הפער) — התכנית 'נראית טוב' אך מסתירה ביקוש שלא ייענה.",
      ],
      troubleshootHe: [
        "Constrained = Unconstrained תמיד ➔ אין אילוצים פעילים / חסר Capacity Supply.",
        "התוצאה ריקה ➔ אין Source of Supply המקשר מוצר למשאב, או חסרים planning levels.",
        "Capacity Utilization לא מחושב ➔ נוסחת-key-figure או רמת-RESOURCE לא מוגדרות.",
      ],
      bestPracticeHe: [
        "הרץ תמיד גם בלתי-מוגבל וגם מוגבל — הפער הוא התובנה העסקית.",
        "התחל פשוט (Finite Heuristic) ועבור ל-Optimizer כשנדרש איזון רב-משאבי.",
        "תעד את משמעות כל cost key figure לפני שמסתמכים על תוצאת-האופטימייזר.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין תכנון בלתי-מוגבל למוגבל?", aHe: "בלתי-מוגבל מניח קיבולת אינסופית ומחזיר 'מה רוצים'; מוגבל לוקח בחשבון קיבולת/חומרים/תחבורה ומחזיר תכנית בת-ביצוע. הפער ביניהם הוא הביקוש שלא ייענה (lost demand)." },
        { qHe: "מהם שני המנועים של IBP S&OP?", aHe: "S&OP Heuristic (מבוסס-כללים, בלתי-מוגבל או Finite ברמת-משאב) ו-S&OP Optimizer (LP/MILP, מאזן את כל האילוצים בו-זמנית ומחפש אופטימום גלובלי)." },
      ],
      takeawaysHe: [
        "תכנון מוגבל = תכנית בת-ביצוע, לא תכנית-משאלות.",
        "ה-S&OP Optimizer הוא הלב; ה-Finite Heuristic הוא חלופה פשוטה יותר.",
        "הפער בין Unconstrained ל-Constrained Demand הוא הסיפור העסקי.",
      ],
      relatedHe: [
        { labelHe: "S&OP · S&OP Optimizer (5.2)", href: "/library/sop/chapter-05/#sub-5.2" },
        { labelHe: "S&OP · Finite Heuristic (5.6)", href: "/library/sop/chapter-05/#sub-5.6" },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2",
      titleHe: "ה-S&OP Optimizer",
      titleEn: "S&OP Optimizer",
      execHe:
        "ה-S&OP Optimizer הוא מנוע-האופטימיזציה המתמטי בלב התכנון-המוגבל. במקום ליישם כללים פשוטים שורה-אחר-שורה, הוא מנסח את כל בעיית-האספקה כמודל-אופטימיזציה אחד (תכנות-ליניארי / מספרים-שלמים) ומחפש את הפתרון שממקסם רווח או ממזער עלות בכפוף לכל האילוצים בו-זמנית. זהו הכלי שמאפשר החלטות-trade-off גלובליות ומבוססות-כסף.",
      beginnerHe:
        "תאר שיש לך כמה מפעלים, כמה מוצרים, כמה לקוחות ומגבלות בכל מקום — קיבולת, חומרים, משאיות. אנושית בלתי-אפשרי לחשב את החלוקה הטובה ביותר. ה-Optimizer הוא 'פותר-חידות' מתמטי: אתה נותן לו את כל המספרים (עלויות, קיבולות, ביקוש), והוא מוצא את התכנית עם העלות-הנמוכה-ביותר או הרווח-הגבוה-ביותר שעדיין מצייתת לכל הכללים.",
      consultantHe:
        "מבחינה טכנית ה-Optimizer בונה Objective Function (פונקציית-מטרה) — סכום של cost key figures (עלות-ייצור, אחסון, תחבורה, non-delivery, וכו') — וממזער אותה תחת constraints (קיבולת, מאזן-מלאי, source-of-supply). הוא רץ כ-application job עם Operator profile מסוג Optimizer. פרמטרים מרכזיים: Profit/Cost optimization, אופק-תכנון, ומשקלי-העלות. התוצאה נכתבת ל-constrained key figures. שלא כמו ה-Heuristic, ה-Optimizer יכול 'להקריב' ביקוש זול כדי לשרת ביקוש רווחי יותר — כי הוא רואה את התמונה הגלובלית.",
      purposeHe:
        "המטרה: למצוא את התכנית האופטימלית כשיש משאבים מתחרים והחלטות-trade-off רבות מדי לחישוב-ידני. ה-Optimizer הופך החלטות-עדיפות מ'תחושת-בטן' ל'מבוסס-עלות' ושקוף, ומאזן ייצור-מול-קנייה, מפעל-מול-מפעל ולקוח-מול-לקוח.",
      processExampleHe:
        "המתכנן מגדיר Operator profile מסוג S&OP Optimizer במצב Cost Minimization, קובע אופק של 18 חודשים ומשקלי-עלות. בהרצה ה-Optimizer קורא ביקוש, קיבולת ועלויות; פותר את ה-LP; ומחזיר לכל product-location-period את Constrained Supply, Production, Transport ו-Inventory, יחד עם Capacity Utilization וכל ביקוש שלא נענה (עם עלות-non-delivery בפונקציית-המטרה).",
      scenarioHe:
        "בארגון ה-Optimizer מחליט: בשיא-הקיץ, האם לייצר את ה-1.5L הרווחי במפעל הצפוני (קיבולת מוגבלת) או להעביר ייצור לדרום (עלות-תחבורה גבוהה)? הוא משקלל עלות-ייצור, עלות-תחבורה ועלות-non-delivery, ובוחר את התמהיל שממזער עלות-כוללת תוך מקסום שירות ל-SKU רווחיים.",
      navHe: [
        "SAP IBP ► Application Jobs ► Create ► Operator: S&OP Optimizer",
        "SAP IBP ► Manage Planning Operators ► define profit/cost optimization and horizon",
        "SAP IBP for Microsoft Excel ► run S&OP Optimizer on the active planning view",
      ],
      tables: ["KF: CONSTRAINEDSUPPLY", "KF: PRODUCTIONQTY", "KF: TRANSPORTQTY", "KF: INVENTORY"],
      tcodes: ["IBP S&OP Optimizer", "Application Jobs"],
      fiori: ["Application Jobs", "Manage Planning Operators", "Application Logs"],
      configHe: [
        "Operator profile = S&OP Optimizer; בחר Cost Minimization או Profit Maximization.",
        "הגדר Planning Horizon ו-Time bucket profile להרצה.",
        "ודא שכל cost key figures הרלוונטיים מאוכלסים — ערך חסר נחשב 0 ומטה את הפתרון.",
        "Optimizer Explanation ניתן להפעלה לצורך ניתוח החלטות (ראה 5.5.8).",
      ],
      flow: [
        { he: "קליטת ביקוש + קיבולת + עלויות", code: "Inputs" },
        { he: "בניית Objective Function", code: "Σ cost KFs", note: "min/max" },
        { he: "פתרון LP/MILP תחת constraints", code: "Solver" },
        { he: "כתיבת Constrained Supply/Production/Transport", code: "Outputs" },
        { he: "Capacity Utilization + lost demand", code: "KPIs" },
      ],
      masterDataHe: [
        "Production / Transportation / External Receipt sources of supply עם עלויות.",
        "Resource Capacity Supply לכל תקופה.",
        "Cost key figures: production, storage, transport, non-delivery, substitution.",
      ],
      mistakesHe: [
        "השארת cost key figures ריקים — ה-Optimizer מתייחס לערך-חסר כ-0 ומקבל החלטות מעוותות.",
        "הרצת Profit Maximization בלי revenue/price key figure — אין מה למקסם.",
        "אופק-תכנון קצר מדי — ה-Optimizer לא 'בונה מלאי' מראש לקראת שיא.",
      ],
      troubleshootHe: [
        "תוצאה לא-הגיונית ➔ בדוק משקלי-עלות; עלות-non-delivery נמוכה מדי גורמת ל'ויתור' על ביקוש.",
        "Job נכשל / infeasible ➔ אילוץ hard סותר; רכך ל-pseudo-hard או בדוק Capacity Supply.",
        "זמן-ריצה ארוך ➔ צמצם אובייקטים/אופק או עבור ל-Finite Heuristic לתרחיש מהיר.",
      ],
      bestPracticeHe: [
        "כייל את משקלי-העלות באופן יחסי — היחס ביניהם חשוב יותר מהערך המוחלט.",
        "הרץ תחילה תרחיש קטן ובדוק היגיון לפני הרצה מלאה.",
        "השתמש ב-Optimizer Explanation להבין 'למה' לפני שמסתמכים על המספר.",
      ],
      interviewHe: [
        { qHe: "מהי Objective Function ב-S&OP Optimizer?", aHe: "פונקציית-המטרה — סכום משוקלל של cost key figures (ייצור/אחסון/תחבורה/non-delivery) שה-Optimizer ממזער, או revenue פחות cost שהוא ממקסם." },
        { qHe: "במה שונה ה-Optimizer מה-Heuristic?", aHe: "ה-Heuristic מיישם כללים שורה-אחר-שורה ברצף; ה-Optimizer פותר את כל המשאבים והאילוצים בו-זמנית ומוצא אופטימום גלובלי מבוסס-עלות, כולל 'הקרבת' ביקוש זול לטובת רווחי." },
      ],
      takeawaysHe: [
        "ה-Optimizer הוא מנוע LP/MILP שממזער עלות או ממקסם רווח תחת אילוצים.",
        "התוצאה תלויה לחלוטין באיכות ה-cost key figures.",
        "הוא מקבל החלטות-trade-off גלובליות שאינן אפשריות ב-Heuristic.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Optimization Constraints (5.3)", href: "/library/sop/chapter-05/#sub-5.3" },
        { labelHe: "S&OP · Financial Modeling (5.4)", href: "/library/sop/chapter-05/#sub-5.4" },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3",
      titleHe: "אילוצי אופטימיזציה",
      titleEn: "Optimization Constraints",
      execHe:
        "האילוצים (constraints) הם החוקים שה-S&OP Optimizer חייב או מנסה לכבד. הם מגדירים את 'גבולות-הגזרה' של הפתרון — מה מותר ומה אסור. IBP מבחין בשלוש דרגות-חומרה: hard constraints (חובה, לעולם לא מופרים), pseudo-hard constraints (כמעט-חובה, מופרים רק כמוצא-אחרון בעלות-עונש גבוהה) ו-soft constraints (העדפות, שניתן להפר בעלות). הבנת ההיררכיה הזו היא המפתח לשליטה בהתנהגות ה-Optimizer.",
      beginnerHe:
        "תחשוב על אילוצים כעל סוגים שונים של חוקים. יש חוק-ברזל שאסור לשבור לעולם (לא לחרוג מקיבולת פיזית) — זה hard. יש חוק שמאוד-מאוד לא רוצים לשבור אבל במצב-קיצון אפשר, במחיר כבד — זה pseudo-hard. ויש העדפה שנחמד לקיים אבל בסדר לוותר עליה אם זה חוסך כסף — זה soft. ה-Optimizer מכבד אותם לפי סדר-החומרה הזה.",
      consultantHe:
        "ב-LP/MILP אילוץ hard הוא אילוץ-שוויון/אי-שוויון שהפתרון חייב לקיים; הפרה הופכת את הבעיה ל-infeasible. אילוץ pseudo-hard מיושם דרך משתנה-עודף (slack) עם מקדם-עלות גבוה מאוד בפונקציית-המטרה — כך מתמטית מותר להפר, אך כמעט אף-פעם לא משתלם. אילוץ soft מיושם עם slack ועלות-עונש מתונה. הסיווג נקבע בפרופיל-האילוצים ובהגדרות ה-Operator. בחירה נכונה מונעת גם תכניות בלתי-אפשריות (infeasible) וגם תכניות נוקשות-מדי שמוותרות על מכירות.",
      purposeHe:
        "המטרה: לתת למתכנן שליטה מדורגת על ההתנהגות — לבטא מה הוא חוק-טבע (קיבולת פיזית), מה כלל-עסקי-חשוב (מלאי-מינימום) ומה העדפה (תעדוף-לקוח). חלוקה נכונה בין הדרגות היא ההבדל בין Optimizer שמחזיר תכנית מועילה לבין כזה שנכשל או מתעלם מהמציאות.",
      processExampleHe:
        "מתכנן מגדיר: קיבולת קו-מילוי = hard (פיזי); מלאי-בטחון = pseudo-hard (אפשר לרדת מתחתיו רק במשבר); תעדוף לקוח-VIP = soft. בהרצה רגילה ה-Optimizer מכבד את כולם; בתרחיש-מחסור הוא ישבור קודם את ה-soft, ורק אם אין ברירה יחדור ל-pseudo-hard, אך לעולם לא יחרוג מ-hard.",
      scenarioHe:
        "בארגון: קיבולת קו-המילוי = hard (אי-אפשר לייצר יותר ממה שהמכונה מסוגלת); רמת-מלאי-בטחון של תרכיז = pseudo-hard; העדפה לספק קודם למפיץ-האזורי הגדול = soft. במחסור-קיץ ה-Optimizer מוותר תחילה על ההעדפה, שומר ככל-יכולתו על מלאי-הבטחון, ולעולם לא מתיימר לייצר מעבר לקיבולת הפיזית.",
      navHe: [
        "SAP IBP ► Manage Planning Operators ► Constraints / Constraint settings of the Optimizer",
        "SAP IBP ► Planning Area ► Key Figures ► constraint key figures (capacity, min/max inventory)",
        "SAP IBP for Excel ► review constraint key figures driving the Optimizer run",
      ],
      tables: ["KF: CAPASUPPLY (hard)", "KF: MININVENTORY", "KF: MAXINVENTORY", "KF: NONDELIVERYCOST"],
      tcodes: ["IBP S&OP Optimizer", "Manage Planning Operators"],
      fiori: ["Manage Planning Operators", "Application Jobs", "Application Logs"],
      configHe: [
        "סווג כל אילוץ ל-hard / pseudo-hard / soft בהגדרות ה-Optimizer ובמקדמי-העלות.",
        "אילוץ hard ללא slack; pseudo-hard עם עלות-עונש גבוהה מאוד; soft עם עלות מתונה.",
        "ודא עקביות — שני hard constraints סותרים יגרמו ל-infeasible.",
      ],
      flow: [
        { he: "הגדרת אילוצים", code: "hard/pseudo/soft" },
        { he: "ה-Optimizer מנסה לכבד הכל", code: "feasible region" },
        { he: "במחסור — מפר soft ראשון", code: "lowest penalty" },
        { he: "אחר-כך pseudo-hard", code: "high penalty" },
        { he: "hard לעולם לא מופר", code: "physical law" },
      ],
      mistakesHe: [
        "הגדרת כל-דבר כ-hard — מוביל בקלות ל-infeasible.",
        "הגדרת אילוצים פיזיים כ-soft — ה-Optimizer מייצר תכנית בלתי-ניתנת-לביצוע.",
        "עלויות-עונש לא-מכוילות — סדר-ההפרות יוצא הפוך מהכוונה העסקית.",
      ],
      troubleshootHe: [
        "Run infeasible ➔ יותר מדי hard constraints סותרים; רכך ל-pseudo-hard.",
        "אילוץ 'נשבר' שלא ציפית ➔ הוגדר soft במקום pseudo-hard/hard.",
        "סדר-תעדוף שגוי בין הפרות ➔ כיוּל-מחדש של עלויות-העונש.",
      ],
      bestPracticeHe: [
        "שמור hard רק לחוקי-טבע פיזיים; כל השאר pseudo-hard או soft.",
        "כייל עלויות-עונש כסדר-גודל יחסי בין דרגות-החומרה.",
        "בדוק feasibility בתרחיש קטן לפני הרצה מלאה.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש דרגות-האילוץ ב-IBP Optimizer?", aHe: "hard (חובה, לעולם לא מופר), pseudo-hard (מופר רק כמוצא-אחרון בעלות-עונש גבוהה מאוד) ו-soft (העדפה הניתנת להפרה בעלות מתונה)." },
        { qHe: "מה קורה אם מגדירים יותר מדי hard constraints?", aHe: "הבעיה עלולה להפוך ל-infeasible — אין פתרון שמקיים את כולם — וה-Optimizer נכשל. הפתרון: לרכך חלק ל-pseudo-hard." },
      ],
      takeawaysHe: [
        "שלוש דרגות: hard > pseudo-hard > soft.",
        "hard = חוק-טבע פיזי; soft = העדפה.",
        "סיווג נכון מונע גם infeasible וגם תכניות נוקשות-מדי.",
      ],
      relatedHe: [
        { labelHe: "S&OP · S&OP Optimizer (5.2)", href: "/library/sop/chapter-05/#sub-5.2" },
      ],
      children: [
        // -------------------------------------------------- 5.3.1
        {
          id: "5.3.1",
          titleHe: "אילוצים קשיחים",
          titleEn: "Hard Constraints",
          execHe:
            "Hard constraints הם חוקי-הברזל שה-S&OP Optimizer לעולם לא יפר. הם מייצגים מגבלות-מציאות פיזיות מוחלטות — בעיקר קיבולת-משאב — שאי-אפשר לחרוג מהן בשום מחיר. אם הם סותרים, הבעיה הופכת ל-infeasible.",
          beginnerHe:
            "Hard constraint הוא 'אסור בהחלט'. כמו שלא ניתן לשפוך 2 ליטר לבקבוק של 1 ליטר — קו-מילוי לא יכול לייצר יותר מהקיבולת הפיזית שלו. ה-Optimizer מתייחס לזה כקיר-בטון: הוא יסדר את כל השאר סביבו אבל לעולם לא יחצה אותו.",
          consultantHe:
            "מתמטית, hard constraint הוא אי-שוויון ללא slack-variable: Σ(production·consumption) ≤ Capacity Supply. הפרה אינה אפשרית במרחב-הפתרונות. הדוגמה הקלאסית היא Capacity Supply של resource. ב-IBP זה מוגדר על-ידי key figure של קיבולת המסומן כאילוץ-קשיח ב-Operator. החיסרון: אוסף hard constraints סותרים (למשל קיבולת קשיחה + מלאי-מינימום קשיח + ביקוש-מלא קשיח) מוביל ל-infeasibility, ולכן ביקוש לרוב אינו hard.",
          purposeHe:
            "לוודא שהתכנית לעולם אינה חוצה גבולות-מציאות פיזיים — מה שהיה הופך אותה לבלתי-ניתנת-לביצוע ברצפת-הייצור.",
          processExampleHe:
            "Capacity Supply של קו = 1,000 שעות/חודש מוגדר hard. גם אם הביקוש דורש 1,300 שעות, ה-Optimizer לעולם לא יתכנן מעבר ל-1,000; את ה-300 העודפות הוא ינתב למשאב אחר, לתקופה אחרת, או יסמן כ-lost demand.",
          scenarioHe:
            "בארגון קיבולת קו-המילוי המהיר (bottles/hour × זמינות) היא hard. ה-Optimizer לא יתיימר לייצר 1.2M ארגזים על קו שמסוגל ל-1.0M — הוא יחפש מפעל חלופי או יוותר על החלק הלא-רווחי.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► mark capacity key figure as hard constraint",
            "SAP IBP ► Planning Area ► RESOURCE level ► Capacity Supply key figure",
          ],
          tables: ["KF: CAPASUPPLY", "KF: CAPADEMAND", "Resource master data"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators", "Analytics – Capacity Utilization"],
          configHe: [
            "סמן את Capacity Supply key figure כ-hard constraint בהגדרת ה-Optimizer.",
            "ודא שערכי-הקיבולת מאוכלסים לכל תקופה — קיבולת חסרה = 0 = חסימת ייצור.",
          ],
          mistakesHe: [
            "הגדרת ביקוש-מלא כ-hard לצד קיבולת קשיחה ➔ infeasible.",
            "ערכי-קיבולת חסרים בתקופות מסוימות ➔ ה-Optimizer חוסם ייצור בהן.",
          ],
          troubleshootHe: [
            "Run infeasible ➔ אילוצים קשיחים סותרים; הסר/רכך אחד מהם.",
            "ייצור = 0 בתקופה ➔ Capacity Supply חסר/אפס באותה תקופה.",
          ],
          bestPracticeHe: [
            "שמור hard לקיבולת פיזית בלבד.",
            "ודא רציפות נתוני-קיבולת לאורך כל האופק.",
          ],
          interviewHe: [
            { qHe: "תן דוגמה ל-hard constraint.", aHe: "Capacity Supply של resource (קו-מילוי): Σ(production·consumption) ≤ קיבולת. ה-Optimizer לעולם לא יחרוג ממנה." },
            { qHe: "מדוע לרוב לא מגדירים ביקוש כ-hard?", aHe: "כי ביקוש-מלא-חובה לצד קיבולת-קשיחה במצב-מחסור הוא בלתי-פתיר (infeasible). עדיף שביקוש יהיה soft עם עלות-non-delivery." },
          ],
          takeawaysHe: [
            "Hard = לעולם לא מופר; חוק-טבע פיזי.",
            "הדוגמה הקלאסית: Capacity Supply.",
            "יותר מדי hard ➔ infeasible.",
          ],
        },
        // -------------------------------------------------- 5.3.2
        {
          id: "5.3.2",
          titleHe: "אילוצים פסבדו-קשיחים",
          titleEn: "Pseudo-Hard Constraints",
          execHe:
            "Pseudo-hard constraints הם 'כמעט-חוק'. ה-Optimizer מתייחס אליהם כאל חובה כל עוד אפשר, אך מתיר להפר אותם כמוצא-אחרון — בעלות-עונש כה גבוהה שזה כמעט אף-פעם לא משתלם. הם הפתרון האלגנטי למניעת infeasibility מבלי לוותר על נוקשות מעשית.",
          beginnerHe:
            "Pseudo-hard זה 'אסור — אלא אם אין ברירה בכלל'. כמו לרדת מתחת לרזרבת-הדלק במכונית: אתה ממש לא רוצה, אבל אם אתה תקוע במדבר, עדיף מאשר להישאר תקוע. ה-Optimizer ישבור אילוץ כזה רק אם החלופה גרועה בהרבה.",
          consultantHe:
            "מימוש: האילוץ מקבל slack-variable עם מקדם-עלות עצום בפונקציית-המטרה (סדרי-גודל מעל עלויות רגילות). מתמטית הבעיה תמיד feasible (תמיד יש פתרון, גם אם 'יקר'), אך ה-Solver יבחר להפר רק כשהאלטרנטיבה יקרה עוד יותר. השימוש הנפוץ: מלאי-מינימום/בטחון, ורצפת-ייצור-מינימלית. היתרון על-פני hard: אין סיכון ל-infeasibility; היתרון על-פני soft: כמעט תמיד מכובד.",
          purposeHe:
            "לבטא כלל-עסקי קריטי (כמו מלאי-בטחון) שאסור להפר בנסיבות רגילות, אך עדיף להפר במשבר מאשר לקבל תכנית בלתי-פתירה (infeasible).",
          processExampleHe:
            "מלאי-בטחון מוגדר pseudo-hard עם עלות-עונש גבוהה. בחודש רגיל ה-Optimizer שומר עליו בקפדנות. בחודש-מחסור חריף, אם הברירה היא לרדת מעט מתחת למלאי-הבטחון או לאבד מכירות-ענק, הוא יחדור זמנית למלאי-הבטחון — אך רק אז.",
          scenarioHe:
            "בארגון מלאי-בטחון של תרכיז מוגדר pseudo-hard. בקיץ-שיא, אם שמירה על המלאי תמנע מילוי קו רווחי, ה-Optimizer ירד מתחת למלאי-הבטחון כמינימום ההכרחי — אך רק כשאין חלופה זולה יותר.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► set very high penalty cost on the constraint key figure",
            "SAP IBP ► Planning Area ► min inventory / min production key figures",
          ],
          tables: ["KF: MININVENTORY", "KF: SAFETYSTOCK", "KF: MINPRODUCTION"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הגדר slack/violation key figure עם עלות-עונש גבוהה-מאוד (סדרי-גודל מעל עלויות רגילות).",
            "השתמש למלאי-בטחון, מלאי-מינימום ורצפת-ייצור-מינימלית.",
          ],
          mistakesHe: [
            "עלות-עונש לא-גבוהה-מספיק ➔ האילוץ מופר כמו soft.",
            "שימוש ב-pseudo-hard לקיבולת פיזית במקום hard ➔ ה-Optimizer עלול לחרוג בעלות.",
          ],
          troubleshootHe: [
            "האילוץ מופר תכופות מדי ➔ הגדל את עלות-העונש.",
            "Run infeasible למרות pseudo-hard ➔ קיים אילוץ hard סותר במקום אחר.",
          ],
          bestPracticeHe: [
            "השתמש ב-pseudo-hard למלאי-בטחון — הדרך הבטוחה למנוע infeasibility.",
            "קבע עלות-עונש בסדר-גודל ברור מעל כל עלות תפעולית רגילה.",
          ],
          interviewHe: [
            { qHe: "כיצד ממומש pseudo-hard constraint?", aHe: "באמצעות slack-variable עם מקדם-עלות עצום בפונקציית-המטרה — הבעיה נשארת feasible אך כמעט-אף-פעם לא משתלם להפר." },
            { qHe: "מתי תעדיף pseudo-hard על-פני hard?", aHe: "כשהאילוץ קריטי אך לא חוק-טבע פיזי (כמו מלאי-בטחון) — כך נמנעים מ-infeasibility אך שומרים נוקשות מעשית." },
          ],
          takeawaysHe: [
            "Pseudo-hard = כמעט-חובה; מופר רק כמוצא-אחרון.",
            "מומש כ-slack עם עלות-עונש עצומה.",
            "אידיאלי למלאי-בטחון; מונע infeasibility.",
          ],
        },
        // -------------------------------------------------- 5.3.3
        {
          id: "5.3.3",
          titleHe: "אילוצים רכים",
          titleEn: "Soft Constraints",
          execHe:
            "Soft constraints הם העדפות — דברים שה-Optimizer ינסה לכבד אך יוותר עליהם בקלות-יחסית אם זה חוסך עלות או מאפשר שירות-ביקוש טוב יותר. הם מבוטאים כעלות-עונש מתונה, ולכן הם הראשונים להישבר במצבי-מחסור.",
          beginnerHe:
            "Soft constraint זה 'נחמד-אם-אפשר'. כמו העדפה לשבת ליד החלון בטיסה — תרצה, אבל לא תוותר על הטיסה בגלל זה. ה-Optimizer יכבד soft constraint אם זה לא עולה ביוקר, וישבור אותו ראשון כשצריך לפנות מקום.",
          consultantHe:
            "מימוש: slack-variable עם מקדם-עלות מתון בפונקציית-המטרה. ה-Solver שוקל את עלות-ההפרה מול התועלת ובוחר את הזול-יותר. דוגמאות: תעדוף-לקוח, העדפת-מקור-אספקה (לייצר במפעל א' אם אפשר), חלוקת-fair-share. שלא כמו hard/pseudo-hard, soft constraints מבטאים מדיניות-עסקית גמישה, וה-Optimizer מתעדף אותם לפי גובה עלות-העונש היחסי.",
          purposeHe:
            "לבטא מדיניות והעדפות עסקיות גמישות שאפשר לוותר עליהן לטובת יעד-העל (מינימום-עלות/מקסימום-רווח) כשהמשאבים מתוחים.",
          processExampleHe:
            "העדפה לספק לקוח-A לפני לקוח-B מוגדרת soft (עלות-עונש קטנה על אי-עמידה). ברוב התרחישים A יקבל קדימות; במחסור חריף, אם שירות ל-B רווחי בהרבה, ה-Optimizer ישבור את ההעדפה ויעדיף את B.",
          scenarioHe:
            "בארגון העדפה לייצר את ה-Coke-Zero במפעל-המקומי (במקום להוביל) מוגדרת soft. כשהמקומי עמוס, ה-Optimizer ישבור את ההעדפה ויוביל מהמפעל השכן — כי עלות-התחבורה זולה מעלות-ה-non-delivery.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► moderate penalty cost on preference key figures",
            "SAP IBP ► Planning Area ► priority / preferred-source / fair-share key figures",
          ],
          tables: ["KF: CUSTOMERPRIORITY", "KF: SOURCEPREFERENCE", "KF: FAIRSHARE"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הגדר עלות-עונש מתונה ל-key figures של העדפה (priority/source/fair-share).",
            "כייל את היחס בין עלויות-העונש כדי לקבוע סדר-שבירה צפוי.",
          ],
          mistakesHe: [
            "עלות-עונש גבוהה-מדי ל-soft ➔ מתנהג כ-pseudo-hard ומגביל יתר-על-המידה.",
            "ריבוי soft constraints מתנגשים ללא כיוּל ➔ התנהגות בלתי-צפויה.",
          ],
          troubleshootHe: [
            "ההעדפה אף-פעם לא מכובדת ➔ עלות-העונש נמוכה מדי; הגדל מעט.",
            "ההעדפה לעולם לא נשברת ➔ עלות-העונש גבוהה מדי; הקטן.",
          ],
          bestPracticeHe: [
            "השתמש ב-soft למדיניות-עסקית גמישה (תעדוף/מקור/fair-share).",
            "כייל עלויות-עונש כסולם-יחסי כדי לשלוט בסדר-השבירה.",
          ],
          interviewHe: [
            { qHe: "תן דוגמאות ל-soft constraints.", aHe: "תעדוף-לקוח, העדפת-מקור-אספקה, וחלוקת-fair-share — כולם מבוטאים כעלות-עונש מתונה הניתנת לשבירה." },
            { qHe: "מה קובע איזה soft constraint יישבר ראשון?", aHe: "גובה עלות-העונש היחסי בפונקציית-המטרה — ה-Optimizer שובר תחילה את זה עם העונש הנמוך ביותר." },
          ],
          takeawaysHe: [
            "Soft = העדפה; הראשון להישבר במחסור.",
            "מומש כ-slack עם עלות-עונש מתונה.",
            "סדר-השבירה נקבע ביחס עלויות-העונש.",
          ],
        },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4",
      titleHe: "מידול פיננסי של שרשרת-האספקה",
      titleEn: "Financial Modeling of the Supply Chain",
      execHe:
        "ה-S&OP Optimizer מקבל החלטות לפי כסף, ולכן איכות התכנית תלויה כולה במידול-הפיננסי של שרשרת-האספקה. כל פעילות — ייצור, אחסון, תחבורה, אי-אספקה, החלפת-מוצר — מקבלת cost key figure. ה-Optimizer ממיר את שרשרת-האספקה הפיזית לרשת-עלויות, ופותר אותה למינימום-עלות או מקסימום-רווח. בלי מידול-פיננסי נכון, התוצאה — לא משנה כמה 'אופטימלית' מתמטית — תהיה שגויה עסקית.",
      beginnerHe:
        "ה-Optimizer לא מבין 'חשוב' או 'דחוף' — הוא מבין רק כסף. צריך לתרגם כל החלטה למחיר: כמה עולה לייצר כאן, כמה עולה לאחסן, כמה עולה להוביל, וכמה 'עולה' לא-לספק ללקוח. כשכל מספר במקומו, ה-Optimizer 'יודע' אוטומטית מה כדאי. אם תיתן עלויות שגויות — תקבל תכנית שגויה, גם אם המתמטיקה מושלמת.",
      consultantHe:
        "המידול-הפיננסי מורכב משני חלקים: (1) cost/financial key figures — מקדמי-העלות בפונקציית-המטרה (production, storage, transportation, external-receipt, non-delivery, late-delivery, substitution); (2) Optimizer parameters — פרמטרים שמכוונים את התנהגות-הפתרון (cost vs profit mode, discounting/late-fulfillment, weights). העיקרון הקריטי: ה-Optimizer מגיב ליחס בין העלויות, לא לערכים המוחלטים. עלות-non-delivery היא הפרמטר הרגיש ביותר — היא קובעת מתי 'משתלם' לוותר על ביקוש. ערך-חסר מתפרש כ-0 ועלול לעוות את כל הפתרון.",
      purposeHe:
        "לתרגם את שרשרת-האספקה למודל-כספי שמאפשר ל-Optimizer לקבל החלטות-trade-off אובייקטיביות ומבוססות-עלות, במקום כללים נוקשים או תחושת-בטן.",
      processExampleHe:
        "המתכנן מאכלס: production cost לכל source, transportation cost לכל lane, storage cost לכל location, ו-non-delivery cost לכל מוצר/לקוח (גבוהה ל-SKU רווחי). בהרצה ה-Optimizer בוחר אוטומטית את התמהיל הזול-ביותר שמכבד את האילוצים — למשל לייצר רחוק ולהוביל אם זה זול מאי-אספקה.",
      scenarioHe:
        "בארגון: production cost שונה בין מפעל ישן ליעיל; transportation cost לפי מרחק-הפצה; storage cost למחסנים-קרים; non-delivery cost גבוהה ל-SKU בעלי-מרווח-גבוה ולחשבונות-מפתח. כך ה-Optimizer 'יודע' להעדיף את המשקאות הרווחיים ואת הלקוחות החשובים — בלי שמישהו יקודד כלל ידני.",
      navHe: [
        "SAP IBP ► Planning Area ► Key Figures ► define cost/financial key figures",
        "SAP IBP ► Manage Planning Operators ► assign cost key figures to the Optimizer",
        "SAP IBP for Excel ► maintain cost key figures per product/location/lane",
      ],
      tables: ["KF: PRODUCTIONCOST", "KF: STORAGECOST", "KF: TRANSPORTCOST", "KF: NONDELIVERYCOST"],
      tcodes: ["IBP S&OP Optimizer", "Manage Planning Operators"],
      fiori: ["Configuration – Planning Areas", "Manage Planning Operators"],
      configHe: [
        "הגדר את כל ה-cost key figures ב-Planning Area וקשר אותם ל-Optimizer.",
        "אכלס ערכים בכל הרמות הרלוונטיות — ערך-חסר = 0 ומטה את הפתרון.",
        "כייל את היחס בין סוגי-העלות לפני סמיכה על התוצאה.",
      ],
      flow: [
        { he: "מיפוי פעילויות שרשרת-אספקה", code: "produce/store/move" },
        { he: "הקצאת cost key figure לכל פעילות", code: "cost KFs" },
        { he: "הגדרת non-delivery cost", code: "lost-demand price" },
        { he: "כיוּל Optimizer parameters", code: "cost/profit, weights" },
        { he: "הרצה ➔ תכנית מינימום-עלות", code: "Optimizer" },
      ],
      mistakesHe: [
        "השארת cost key figures ריקים ➔ נחשבים 0 ומעוותים את הפתרון.",
        "התעלמות מ-non-delivery cost ➔ ה-Optimizer 'מוותר' על ביקוש בחינם.",
        "ערכי-עלות מוחלטים לא-עקביים בין רמות ➔ trade-offs שגויים.",
      ],
      troubleshootHe: [
        "ה-Optimizer מוותר על ביקוש שלא ציפית ➔ non-delivery cost נמוכה מדי.",
        "ייצור מרוכז במקום לא-צפוי ➔ production/transport cost לא-מאוזנים.",
        "תוצאות בלתי-עקביות בין הרצות ➔ cost key figures חסרים בחלק מהאובייקטים.",
      ],
      bestPracticeHe: [
        "התחל מ-non-delivery cost — הוא מנוע-ההחלטות המרכזי.",
        "חשוב ביחסים, לא בערכים מוחלטים.",
        "תעד את מקור והיגיון כל cost key figure.",
      ],
      interviewHe: [
        { qHe: "מדוע מידול-פיננסי קריטי ל-Optimizer?", aHe: "ה-Optimizer מקבל החלטות אך-ורק לפי עלות; אם ה-cost key figures שגויים או חסרים, התכנית תהיה שגויה עסקית, גם אם מתמטית 'אופטימלית'." },
        { qHe: "מהי ה-cost key figure הרגישה ביותר?", aHe: "non-delivery cost — היא קובעת מתי 'משתלם' לוותר על ביקוש; ערך נמוך מדי גורם ל-Optimizer לוותר על מכירות בקלות-יתר." },
      ],
      takeawaysHe: [
        "ה-Optimizer מבין רק כסף — מַדֵּל הכל כעלות.",
        "שני חלקים: cost key figures + Optimizer parameters.",
        "non-delivery cost היא הפרמטר הרגיש ביותר; ערך-חסר = 0.",
      ],
      relatedHe: [
        { labelHe: "S&OP · S&OP Optimizer (5.2)", href: "/library/sop/chapter-05/#sub-5.2" },
        { labelHe: "S&OP · Optimizer Parameters (5.4.2)", href: "/library/sop/chapter-05/#sub-5.4.2" },
      ],
      children: [
        // -------------------------------------------------- 5.4.1
        {
          id: "5.4.1",
          titleHe: "מפתחות-כמות פיננסיים או של עלות",
          titleEn: "Financial or Cost Key Figures",
          execHe:
            "Cost (financial) key figures הם מקדמי-העלות שמרכיבים את פונקציית-המטרה של ה-Optimizer. כל סוג-פעילות בשרשרת-האספקה מקבל key figure משלו: עלות-ייצור, אחסון, תחבורה, קליטה-חיצונית, אי-אספקה, אספקה-מאוחרת והחלפת-מוצר. הם השפה שבה אומרים ל-Optimizer 'מה כדאי'.",
          beginnerHe:
            "אלה ה'תגי-מחיר' של כל פעולה. לכל דבר שה-Optimizer יכול לעשות — לייצר, לאחסן, להוביל, לא-לספק — יש מחיר. ה-Optimizer מחבר את כל המחירים ובוחר את הצירוף הזול-ביותר. אם תשכח להזין מחיר, ה-Optimizer יחשוב שהפעולה הזו חינם — ויעשה אותה בלי-הגבלה.",
          consultantHe:
            "סוגי ה-cost key figures העיקריים: Production Cost (לכל production source), Storage/Holding Cost (לכל location/period), Transportation Cost (לכל lane), External Receipt/Procurement Cost, Non-Delivery Cost (penalty על ביקוש לא-נענה), Late-Delivery Cost (penalty על אספקה-מאוחרת), ו-Substitution Cost (penalty על החלפת-מוצר). כולם נכנסים לפונקציית-המטרה כ-Σ(quantity·cost). במצב Profit Maximization מתווסף Revenue/Price key figure. הכלל: ה-Optimizer מגיב ליחסים; ערך-חסר = 0.",
          purposeHe:
            "לספק ל-Optimizer את כל תגי-המחיר הדרושים כדי לדרג חלופות — איזה מקור, איזה lane, ומתי 'כדאי' לא-לספק.",
          processExampleHe:
            "Production Cost: מפעל-יעיל 10, ישן 13. Transportation 2 ל-lane רחוק. Non-Delivery 50 ל-SKU רווחי. ה-Optimizer יעדיף לייצר ביעיל; כשעמוס יוביל מהישן (13+2=15) במקום לא-לספק (50).",
          scenarioHe:
            "בארגון כל קו-מילוי מקבל Production Cost משלו, כל נתיב-הפצה Transportation Cost, וכל SKU/לקוח Non-Delivery Cost לפי רווחיות. כך מודל-העלות לבדו מכתיב את העדפת-המשקאות הרווחיים בקיץ.",
          navHe: [
            "SAP IBP ► Planning Area ► Key Figures ► create cost key figures (production/storage/transport/non-delivery)",
            "SAP IBP ► Manage Planning Operators ► map each cost key figure to its Optimizer role",
          ],
          tables: ["KF: PRODUCTIONCOST", "KF: TRANSPORTCOST", "KF: NONDELIVERYCOST", "KF: SUBSTITUTIONCOST"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Configuration – Planning Areas", "Manage Planning Operators"],
          configHe: [
            "צור key figure לכל סוג-עלות וקשר אותו לתפקיד המתאים ב-Optimizer.",
            "אכלס ערכים בכל רמת-תכנון רלוונטית (source/lane/location/product).",
            "Profit mode דורש בנוסף Revenue/Price key figure.",
          ],
          mistakesHe: [
            "שכחת non-delivery cost ➔ אי-אספקה 'חינם'; ה-Optimizer מוותר על ביקוש.",
            "Production cost אחיד לכל המפעלים ➔ אובדן יכולת לבחור מקור זול.",
            "ערכי-עלות בסקאלות לא-עקביות ➔ trade-offs מעוותים.",
          ],
          troubleshootHe: [
            "ה-Optimizer 'מציף' מחסן אחד ➔ storage cost נמוך מדי שם.",
            "אי-אספקה מוגזמת ➔ non-delivery cost נמוך ביחס לעלויות-ייצור/תחבורה.",
            "מקור-יקר נבחר ➔ עלות-מקור-זול חסרה (=0) או lane cost שגוי.",
          ],
          bestPracticeHe: [
            "ודא שכל פעילות אפשרית נושאת cost key figure — אין 'פעולות חינם'.",
            "כייל את כל העלויות באותה סקאלה/מטבע.",
            "קבע non-delivery cost גבוה משמעותית לפעילויות-ליבה.",
          ],
          interviewHe: [
            { qHe: "מנה סוגי cost key figures מרכזיים.", aHe: "Production, Storage/Holding, Transportation, External-Receipt, Non-Delivery, Late-Delivery ו-Substitution cost — כולם מקדמים בפונקציית-המטרה." },
            { qHe: "מה קורה אם cost key figure נשאר ריק?", aHe: "ה-Optimizer מתייחס אליו כ-0, כלומר הפעולה 'חינם', ועלול לבצע אותה ללא-הגבלה — מה שמעוות את כל הפתרון." },
          ],
          takeawaysHe: [
            "Cost key figures = תגי-המחיר של כל פעילות.",
            "כולם נכנסים לפונקציית-המטרה כ-Σ(qty·cost).",
            "ערך-חסר = 0 = 'פעולה חינם' — סכנה.",
          ],
        },
        // -------------------------------------------------- 5.4.2
        {
          id: "5.4.2",
          titleHe: "פרמטרים של ה-Optimizer",
          titleEn: "Optimizer Parameters",
          execHe:
            "Optimizer parameters הם הכפתורים שמכוונים את אופן-הפתרון — לא 'כמה עולה' אלא 'איך לפתור'. הם קובעים מצב (cost-minimization מול profit-maximization), אופק-תכנון, יחס בין יעדים, התנהגות-late-fulfillment, ומשקלים גלובליים. הם משלימים את ה-cost key figures להתנהגות-Optimizer מלאה ומכוונת.",
          beginnerHe:
            "אם ה-cost key figures הם 'המחירים', ה-parameters הם 'ההגדרות' של הפותר: האם המטרה לחסוך עלות או להרוויח? עד כמה רחוק לתכנן? כמה חשוב לספק בזמן מול בזמן-מאוחר? כיוון-נכון של ההגדרות האלה משנה את אופי-התכנית כולה.",
          consultantHe:
            "פרמטרים מרכזיים ב-Operator profile: (1) Optimization Mode — Cost Minimization או Profit Maximization (האחרון דורש revenue key figure); (2) Planning Horizon ו-time-bucket; (3) Late-Demand / Discounting parameters — האם וכמה 'משתלם' לספק מאוחר; (4) Delta/weight parameters לאיזון בין יעדים מתחרים; (5) הגדרות-feasibility ו-relaxation. הפרמטרים פועלים יחד עם עלויות-העונש; שינוי mode מ-cost ל-profit יכול להפוך החלטות לחלוטין כי כעת ה-Optimizer 'רודף' אחרי revenue ולא רק נמנע מ-cost.",
          purposeHe:
            "לכוון את התנהגות-הפתרון לאסטרטגיה העסקית — למשל מקסום-רווח בשיא-ביקוש מול מינימום-עלות בעונה רגילה — ולשלוט בהיבטים כמו אספקה-מאוחרת ואופק.",
          processExampleHe:
            "בעונה רגילה: Cost Minimization, אופק 12 חודשים. לקראת שיא: מעבר ל-Profit Maximization עם revenue key figure, כדי שה-Optimizer יעדיף את ה-SKU הרווחיים גם במחיר עלות-ייצור גבוהה יותר.",
          scenarioHe:
            "בארגון המתכנן עובר ל-Profit Maximization לפני הקיץ — כך ה-Optimizer מתעדף משקאות בעלי-מרווח-גבוה על-פני זולים, גם אם עלות-הייצור שלהם גבוהה יותר, כי ה-revenue מצדיק זאת.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► Optimizer profile ► mode / horizon / late-fulfillment / weights",
            "SAP IBP ► Application Jobs ► run Optimizer with the chosen parameter profile",
          ],
          tables: ["Operator profile settings", "KF: REVENUE", "KF: PRICE", "KF: LATEDELIVERYCOST"],
          tcodes: ["IBP S&OP Optimizer", "Manage Planning Operators"],
          fiori: ["Manage Planning Operators", "Application Jobs"],
          configHe: [
            "בחר Optimization Mode: Cost Minimization או Profit Maximization (עם revenue/price).",
            "קבע Planning Horizon ו-time-bucket profile.",
            "כוון late-demand/discounting ו-weight parameters בהתאם לאסטרטגיה.",
          ],
          mistakesHe: [
            "Profit Maximization ללא revenue key figure ➔ אין מה למקסם; תוצאה שגויה.",
            "אופק קצר מדי ➔ אין pre-build לקראת שיא-ביקוש.",
            "שינוי mode בלי הבנת ההשפעה ➔ החלטות הפוכות לחלוטין.",
          ],
          troubleshootHe: [
            "תוצאות לא-משתנות בין הרצות ➔ נבחר אותו profile/parameters.",
            "אין pre-build למלאי לפני שיא ➔ הארך את ה-Planning Horizon.",
            "Profit mode מתנהג כמו cost ➔ revenue key figure ריק.",
          ],
          bestPracticeHe: [
            "התאם את ה-mode לעונה/אסטרטגיה (cost ברגיל, profit לשיא).",
            "ודא קיום revenue key figure לפני profit mode.",
            "שמור profile-ים נפרדים לתרחישים שונים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Cost Minimization ל-Profit Maximization?", aHe: "cost-min ממזער עלות-כוללת; profit-max ממקסם revenue פחות cost ודורש revenue/price key figure — הוא 'רודף' אחרי מכירות רווחיות ולא רק נמנע מעלות." },
            { qHe: "מדוע Planning Horizon הוא פרמטר חשוב?", aHe: "אופק קצר מונע מה-Optimizer לבנות מלאי מראש (pre-build) לקראת שיא-ביקוש; אופק מתאים מאפשר החלקת-קיבולת לאורך-זמן." },
          ],
          takeawaysHe: [
            "Parameters = 'איך לפתור', cost key figures = 'כמה עולה'.",
            "Mode (cost/profit) משנה החלטות מהיסוד.",
            "אופק-תכנון קובע יכולת pre-build.",
          ],
        },
      ],
    },
    // ============================================================ 5.5
    {
      id: "5.5",
      titleHe: "תכונות-Optimizer מתקדמות",
      titleEn: "Advanced Optimizer Features",
      execHe:
        "מעבר לאיזון-עלות הבסיסי, ה-S&OP Optimizer כולל סדרת יכולות-מתקדמות שמשקפות מורכבויות אמיתיות של שרשרת-אספקה: אספקה-מאוחרת, צריכת-משאב-מינימלית, חלוקה-הוגנת, אילוצים-מצרפיים, קטגוריות-ביקוש מרובות, החלפת-מוצרים, רשתות-משנה והסבר-החלטות. כל אחת מרחיבה את כוח-המודל ומקרבת את התכנית למציאות. תת-הסעיפים מפרטים כל יכולת.",
      beginnerHe:
        "אחרי שה-Optimizer יודע לאזן עלויות בסיסיות, אפשר ללמד אותו 'טריקים' מתוחכמים יותר — לספק קצת מאוחר במקום בכלל-לא, להפעיל מכונה רק אם משתלם, לחלק מחסור בהוגנות בין לקוחות, להחליף מוצר חסר באחר, ולהסביר לנו למה החליט מה שהחליט. כל אלה הופכים אותו מ'מחשבון' ל'יועץ-תכנון' אמיתי.",
      consultantHe:
        "היכולות המתקדמות מורכבות-מודלית: late-demand fulfillment דורש late-delivery/discount key figures; minimum resource consumption מצריך משתני-בינארי (MILP) ל-on/off של משאב; fair-share דורש לוגיקת-פרופורציה על מחסור; aggregate constraints מגבילים קבוצת-מוצרים/משאבים יחד; multiple demand category מתעדף סוגי-ביקוש (confirmed/forecast) עם עלויות-non-delivery שונות; product substitution מאפשר מילוי ב-SKU חלופי בעלות-substitution; subnetworks מחלקים את הבעיה לאזורים נפרדים-לפתרון; ו-Optimizer explanation חושף את תרומת-האילוצים לתוצאה. כל יכולת נדלקת בהגדרות ה-Operator ודורשת את ה-key figures התומכים.",
      purposeHe:
        "לאפשר ל-Optimizer לבטא דקויות-עסקיות אמיתיות — הוגנות, גמישות-זמן, החלפות וביקוש מדורג — שתכנון פשוט מפספס, ובכך להפיק תכנית עשירה, ריאלית וניתנת-להסבר.",
      processExampleHe:
        "במצב-מחסור ה-Optimizer מפעיל בו-זמנית כמה יכולות: מתעדף confirmed orders על forecast (multiple demand category), מחלק את היתרה ב-fair-share בין מפיצים, מציע product substitution למה שחסר, ומספק late-delivery למה שאפשר רק מאוחר — והכל מוסבר דרך Optimizer Explanation.",
      scenarioHe:
        "בארגון קיץ-מחסור: confirmed לרשתות-מזון לפני forecast לחנויות-קצה; fair-share בין מפיצים-אזוריים; substitution מ-1.5L חסר ל-2L זמין; late-delivery לרשת שמוכנה לקבל באיחור-יומיים; וכל החלטה ניתנת-להסבר להנהלה.",
      navHe: [
        "SAP IBP ► Manage Planning Operators ► enable advanced Optimizer features",
        "SAP IBP ► Planning Area ► supporting key figures (late/min-consumption/fair-share/substitution)",
        "SAP IBP ► Application Logs / Optimizer Explanation for decision transparency",
      ],
      tables: ["KF: LATEDELIVERY", "KF: FAIRSHARE", "KF: SUBSTITUTION", "KF: DEMANDCATEGORY"],
      tcodes: ["IBP S&OP Optimizer"],
      fiori: ["Manage Planning Operators", "Application Logs", "Optimizer Explanation"],
      configHe: [
        "הפעל כל יכולת-מתקדמת בנפרד בהגדרות ה-Operator וודא את ה-key figures התומכים.",
        "יכולות מבוססות-MILP (min consumption, substitution) מאריכות זמן-ריצה — הפעל בשיקול.",
      ],
      mistakesHe: [
        "הפעלת כל היכולות בבת-אחת ➔ זמן-ריצה ארוך וקושי-ניפוי.",
        "הפעלת יכולת בלי ה-key figures התומכים ➔ אין השפעה או שגיאה.",
      ],
      troubleshootHe: [
        "יכולת לא משפיעה ➔ key figure תומך חסר/ריק.",
        "זמן-ריצה התפוצץ ➔ יותר מדי יכולות-MILP פעילות; צמצם.",
      ],
      bestPracticeHe: [
        "הוסף יכולות אחת-אחת ובדוק השפעה בכל שלב.",
        "השתמש ב-Optimizer Explanation לאמת שכל יכולת פועלת כמצופה.",
      ],
      interviewHe: [
        { qHe: "מנה כמה תכונות-Optimizer מתקדמות.", aHe: "late-demand fulfillment, minimum resource consumption, fair-share distribution, aggregate constraints, multiple demand category, product substitution, subnetworks ו-Optimizer explanation." },
        { qHe: "מדוע להפעיל יכולות-מתקדמות בהדרגה?", aHe: "כל יכולת מגדילה מורכבות וזמן-ריצה (במיוחד MILP); הוספה הדרגתית מאפשרת לאמת השפעה ולנפות בעיות." },
      ],
      takeawaysHe: [
        "היכולות-המתקדמות מקרבות את התכנית למציאות-עסקית.",
        "כל יכולת דורשת key figures תומכים והפעלה ב-Operator.",
        "MILP-features מאריכות ריצה — הפעל בשיקול-דעת.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Financial Modeling (5.4)", href: "/library/sop/chapter-05/#sub-5.4" },
      ],
      children: [
        // -------------------------------------------------- 5.5.1
        {
          id: "5.5.1",
          titleHe: "מימוש ביקוש מאוחר",
          titleEn: "Late-Demand Fulfillment",
          execHe:
            "Late-demand fulfillment מאפשר ל-Optimizer לספק ביקוש מאוחר מהמועד-המבוקש במקום לוותר עליו לגמרי. זוהי גמישות-זמן: עדיף לספק שבוע באיחור מאשר לא-לספק כלל — כל עוד עלות-האיחור נמוכה מעלות-אי-האספקה.",
          beginnerHe:
            "לפעמים אי-אפשר לספק בדיוק בזמן, אבל אפשר קצת-מאוחר. במקום להגיד 'אין', ה-Optimizer יכול להגיד 'אספק בעוד שבוע'. הוא משווה: כמה 'עולה' האיחור מול כמה 'עולה' לא-לספק בכלל — ובוחר את הזול.",
          consultantHe:
            "מימוש: late-delivery cost key figure שמטיל penalty ההולך-וגדל ככל שהאיחור ארוך יותר. ה-Optimizer מאזן late-delivery cost מול non-delivery cost. לעיתים משולב עם discounting — ככל שמספקים מאוחר, ה-revenue יורד. כך נוצרת היררכיה: on-time עדיף, late עדיף על non-delivery. הפרמטרים מוגדרים ב-Operator ובאופק-התכנון.",
          purposeHe:
            "למקסם שירות-ביקוש כולל על-ידי ניצול גמישות-זמן — לספק מאוחר מה שאי-אפשר בזמן, במקום לאבד את המכירה.",
          processExampleHe:
            "ביקוש ל-100 ביוני; הקיבולת ביוני מלאה. עם late-fulfillment ה-Optimizer מספק 60 ביוני ו-40 ביולי (late-delivery cost) במקום לוותר על 40 (non-delivery cost גבוה יותר).",
          scenarioHe:
            "בארגון רשת-מזון שמוכנה לקבל באיחור-יומיים בשיא-קיץ: ה-Optimizer משבץ late-delivery במקום non-delivery, ושומר את חשבון-המפתח מרוצה.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► enable late-demand fulfillment + late-delivery cost",
            "SAP IBP ► Planning Area ► late-delivery / discounting key figures",
          ],
          tables: ["KF: LATEDELIVERYCOST", "KF: NONDELIVERYCOST", "KF: LATEDELIVERYQTY"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הפעל late-demand fulfillment ב-Operator והגדר late-delivery cost (עולה עם האיחור).",
            "ודא ש-late-delivery cost נמוך מ-non-delivery cost כדי שהאיחור 'ישתלם'.",
          ],
          mistakesHe: [
            "late-delivery cost גבוה מ-non-delivery ➔ ה-Optimizer מעדיף לא-לספק.",
            "אופק קצר מדי ➔ אין 'מקום' לספק את האיחור.",
          ],
          troubleshootHe: [
            "אין אספקה-מאוחרת למרות שצריך ➔ late-delivery cost גבוה מ-non-delivery או אופק קצר.",
            "יותר מדי איחורים ➔ late-delivery cost נמוך מדי ביחס לעלות-ייצור.",
          ],
          bestPracticeHe: [
            "דרג: on-time < late < non-delivery בעלויות.",
            "הצמד את אורך-האיחור המותר למדיניות-השירות.",
          ],
          interviewHe: [
            { qHe: "מהו late-demand fulfillment?", aHe: "יכולת לספק ביקוש מאוחר מהמועד-המבוקש (בעלות late-delivery) במקום לוותר עליו (non-delivery) — גמישות-זמן שממקסמת שירות." },
            { qHe: "מה היחס הנדרש בין late-delivery ל-non-delivery cost?", aHe: "late-delivery חייב להיות זול מ-non-delivery, אחרת ה-Optimizer יעדיף לוותר על הביקוש לגמרי." },
          ],
          takeawaysHe: [
            "Late = עדיף על non-delivery, נחות מ-on-time.",
            "מומש כ-late-delivery cost עולה-עם-האיחור.",
            "דורש אופק-תכנון מספק.",
          ],
        },
        // -------------------------------------------------- 5.5.2
        {
          id: "5.5.2",
          titleHe: "צריכת-משאב מינימלית",
          titleEn: "Minimum Resource Consumption",
          execHe:
            "Minimum resource consumption מבטא שמשאב מסוים, אם מופעל, חייב לרוץ ברמת-מינימום (למשל אצווה-מינימלית או משמרת-שלמה). זה מונע פתרונות לא-מציאותיים שבהם מכונה 'נדלקת' לכמות זעירה.",
          beginnerHe:
            "מכונה לא משתלם להפעיל בשביל בקבוק אחד — אם מדליקים אותה, צריך לייצר לפחות כמות-סבירה. ה-Optimizer צריך לדעת את זה, אחרת הוא יתכנן הפעלות-קטנטנות שאין בהן היגיון.",
          consultantHe:
            "מימוש דורש MILP: משתנה-בינארי 'משאב מופעל כן/לא', וכאשר מופעל — production ≥ minimum lot. זה minimum-with-setup קלאסי. מאריך זמן-ריצה (בגלל המספרים-השלמים) אך הכרחי למשאבים עם אצווה-מינימלית, setup יקר או הפעלת-משמרת. מוגדר דרך min-consumption/min-lot key figures והפעלת היכולת ב-Operator.",
          purposeHe:
            "למנוע תכניות עם הפעלות-משאב זעירות לא-כלכליות, ולכפות אצוות-מינימום או משמרות-שלמות.",
          processExampleHe:
            "קו עם אצווה-מינימלית 500. ה-Optimizer לא יתכנן ייצור של 50; או שהוא ייצר ≥500, או שלא יפעיל את הקו כלל ויחפש חלופה.",
          scenarioHe:
            "בארגון הפעלת קו-מילוי כרוכה ב-CIP (ניקוי) יקר; אצווה-מינימלית מבטיחה שה-Optimizer לא 'ידליק' קו לכמות זעירה אלא רק לריצה כלכלית.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► enable minimum resource consumption (MILP)",
            "SAP IBP ► Planning Area ► minimum consumption / minimum lot key figures",
          ],
          tables: ["KF: MINRESOURCECONSUMPTION", "KF: MINLOTSIZE", "Resource master data"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הפעל minimum resource consumption (MILP) והגדר min-lot/min-consumption key figure.",
            "צפה לזמן-ריצה ארוך יותר עקב המשתנים-השלמים.",
          ],
          mistakesHe: [
            "הגדרת min גבוה מדי ➔ המשאב 'נחסם' מהפעלה כלל.",
            "הפעלה גורפת על כל המשאבים ➔ זמן-ריצה מתפוצץ.",
          ],
          troubleshootHe: [
            "המשאב לא מופעל בכלל ➔ min-lot גבוה מהביקוש האפשרי.",
            "ריצה איטית מאוד ➔ צמצם משאבים עם min-consumption.",
          ],
          bestPracticeHe: [
            "הפעל רק למשאבים עם אצווה-מינימלית/setup יקר אמיתיים.",
            "כייל את ה-min-lot לערך תפעולי ריאלי.",
          ],
          interviewHe: [
            { qHe: "מהי minimum resource consumption?", aHe: "אילוץ שאם משאב מופעל, הוא חייב לרוץ ברמת-מינימום (אצווה/משמרת) — נמנע מהפעלות זעירות לא-כלכליות." },
            { qHe: "מדוע היא מאריכה זמן-ריצה?", aHe: "כי היא דורשת משתני-בינארי (MILP) ל-on/off של המשאב, וזה הופך את הבעיה מ-LP ל-mixed-integer הקשה יותר לפתרון." },
          ],
          takeawaysHe: [
            "אם מופעל — חייב לרוץ ≥ מינימום.",
            "מומש כ-MILP (binary on/off).",
            "הכרחי לאצווה-מינימלית/setup יקר; מאריך ריצה.",
          ],
        },
        // -------------------------------------------------- 5.5.3
        {
          id: "5.5.3",
          titleHe: "חלוקה הוגנת",
          titleEn: "Fair-Share Distribution",
          execHe:
            "Fair-share distribution מבטיח שבמצב-מחסור, המלאי-המוגבל מחולק בין הלקוחות/אזורים בפרופורציה הוגנת — ולא 'הכל לראשון, כלום לאחרון'. זוהי מדיניות-הוגנות שמונעת ניתוק-לקוחות-שוליים.",
          beginnerHe:
            "כשאין מספיק לכולם, מה עושים? 'fair-share' אומר: כל אחד מקבל את אותו אחוז מהביקוש שלו — אם יש 80% מהדרוש, כולם מקבלים 80%. כך אף לקוח לא נשאר עם כלום בזמן שאחר מקבל הכל.",
          consultantHe:
            "מימוש: לוגיקת-פרופורציה שמחלקת את ה-Constrained Supply בין נקודות-ביקוש מתחרות יחסית לגודל-ביקושן (או למשקל-עדיפות). ב-Optimizer זה מבוטא דרך soft constraints/penalty שמענישים סטייה מהפרופורציה ההוגנת, או דרך fair-share key figure. נבדל מתעדוף-קשיח (priority) שבו לקוח-בכיר מקבל הכל-קודם; fair-share מאזן הוגנות מול עדיפות.",
          purposeHe:
            "לחלק מחסור באופן הוגן ושקוף בין לקוחות/אזורים, לשמר יחסים מסחריים ולמנוע 'מנצח-לוקח-הכל'.",
          processExampleHe:
            "זמין 80, ביקוש: A=50, B=50. ללא fair-share A יקבל 50 ו-B 30. עם fair-share כל אחד מקבל 40 (80%) — חלוקה פרופורציונלית.",
          scenarioHe:
            "בארגון קיץ-מחסור: שלושה מפיצים-אזוריים מקבלים כל אחד את אותו אחוז מהביקוש שלו, כדי שאף אזור לא יישאר ריק בעוד אחר מלא — שמירה על נאמנות-המפיצים.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► enable fair-share distribution",
            "SAP IBP ► Planning Area ► fair-share / proportional-allocation key figures",
          ],
          tables: ["KF: FAIRSHARE", "KF: DEMAND", "KF: CONSTRAINEDSUPPLY"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators", "Analytics – Constrained Demand"],
          configHe: [
            "הפעל fair-share ב-Operator והגדר את ה-key figure/penalty השולט בפרופורציה.",
            "אזן בין fair-share לבין customer-priority לפי המדיניות העסקית.",
          ],
          mistakesHe: [
            "ערבוב fair-share עם priority קשיח ➔ אחד מבטל את השני.",
            "הזנחת מצב-מחסור ➔ fair-share לא נכנס לפעולה כשאין מחסור.",
          ],
          troubleshootHe: [
            "החלוקה לא-פרופורציונלית ➔ priority/penalty גובר על fair-share.",
            "fair-share לא משפיע ➔ אין מחסור בפועל, או key figure לא מוגדר.",
          ],
          bestPracticeHe: [
            "השתמש ב-fair-share כשהוגנות-מסחרית חשובה מתעדוף-טהור.",
            "הגדר במפורש את היחס fair-share ↔ priority.",
          ],
          interviewHe: [
            { qHe: "מהי fair-share distribution?", aHe: "חלוקת מלאי-מוגבל בין לקוחות/אזורים בפרופורציה לביקושם — כולם מקבלים אותו אחוז — במקום 'מנצח-לוקח-הכל'." },
            { qHe: "במה fair-share שונה מ-priority?", aHe: "priority נותן ללקוח-בכיר הכל-קודם; fair-share מחלק פרופורציונלית והוגן. ניתן לאזן ביניהם דרך עלויות-עונש." },
          ],
          takeawaysHe: [
            "Fair-share = חלוקה פרופורציונלית של מחסור.",
            "מונע 'מנצח-לוקח-הכל'.",
            "מאוזן מול priority דרך penalty.",
          ],
        },
        // -------------------------------------------------- 5.5.4
        {
          id: "5.5.4",
          titleHe: "אילוצים מצרפיים",
          titleEn: "Aggregate Constraints",
          execHe:
            "Aggregate constraints מגבילים קבוצה של מוצרים, משאבים או נקודות יחד — לא כל-אחד-לחוד. למשל: 'סך-הייצור על כל הקווים במפעל ≤ X', או 'תקציב-חומר-גלם משותף לכל ה-SKU'. הם תופסים מגבלות-משותפות שאילוצים-בודדים מפספסים.",
          beginnerHe:
            "לפעמים המגבלה היא על הקבוצה ולא על הפרט. דוגמה: יש כמות-מוגבלת של סוכר לכל המשקאות יחד — לא משנה לאיזה משקה, הסכום-הכולל מוגבל. aggregate constraint מבטא בדיוק את זה: גבול על הסך, לא על כל פריט.",
          consultantHe:
            "מימוש: אילוץ על סכום-משוקלל של כמה key figure-cells: Σ(group) ≤ limit. שימושים: קיבולת-משותפת (כוח-אדם משותף לכמה קווים), חומר-גלם-משותף (סוכר/תרכיז משותף), תקציב-משותף, או מגבלת-ייצור-קבוצתית. נבדל מ-capacity constraint רגיל שחל על משאב-בודד. ב-IBP מוגדר דרך key figure מצרפי וקישורו כאילוץ ב-Operator.",
          purposeHe:
            "לבטא מגבלות-משאב/תקציב משותפות לקבוצה, שלא ניתן לתאר כסכום אילוצים-בודדים.",
          processExampleHe:
            "מפעל עם 3 קווים אך כוח-אדם ל-2-בו-זמנית. aggregate constraint: סך-שעות-העבודה על שלושת הקווים ≤ קיבולת-כוח-האדם — מאלץ את ה-Optimizer לא להפעיל את כל השלושה במלואם בו-זמנית.",
          scenarioHe:
            "בארגון אספקת-תרכיז שבועית מוגבלת ומשותפת לכל ה-SKU. aggregate constraint על סך-צריכת-התרכיז מאלץ את ה-Optimizer לחלק את התרכיז המוגבל בין המשקאות לפי רווחיות.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► define aggregate constraint key figures",
            "SAP IBP ► Planning Area ► aggregate-level key figures (shared capacity/material/budget)",
          ],
          tables: ["KF: AGGCAPACITY", "KF: SHAREDMATERIAL", "KF: GROUPLIMIT"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הגדר key figure ברמת-צבירה (group) וקשר אותו כאילוץ ב-Operator.",
            "ודא שרמות-התכנון מאפשרות צבירה של הקבוצה הרצויה.",
          ],
          mistakesHe: [
            "מידול מגבלה-משותפת כסדרת אילוצים-בודדים ➔ ה-Optimizer מפעיל הכל-יחד מעבר לאפשרי.",
            "רמת-צבירה שגויה ➔ האילוץ חל על קבוצה לא-נכונה.",
          ],
          troubleshootHe: [
            "כל הקבוצה מנוצלת מעבר לאפשרי ➔ חסר aggregate constraint.",
            "האילוץ מגביל יותר-מדי ➔ רמת-הצבירה רחבה מדי.",
          ],
          bestPracticeHe: [
            "השתמש ב-aggregate constraint למשאב/תקציב באמת-משותף.",
            "התאם בקפידה את רמת-הצבירה לקבוצה העסקית.",
          ],
          interviewHe: [
            { qHe: "מהו aggregate constraint?", aHe: "מגבלה על סכום קבוצת-מוצרים/משאבים/נקודות יחד (Σgroup ≤ limit), במקום אילוץ נפרד לכל פריט — למשל חומר-גלם או כוח-אדם משותף." },
            { qHe: "תן דוגמה שבה aggregate constraint הכרחי.", aHe: "כוח-אדם משותף ל-3 קווים: אי-אפשר לתאר זאת כקיבולת-קו-בודדת; צריך אילוץ על סך-השעות של שלושתם יחד." },
          ],
          takeawaysHe: [
            "Aggregate = גבול על הקבוצה, לא על הפרט.",
            "Σ(group) ≤ limit.",
            "למשאב/חומר/תקציב משותף.",
          ],
        },
        // -------------------------------------------------- 5.5.5
        {
          id: "5.5.5",
          titleHe: "קטגוריית-ביקוש מרובה",
          titleEn: "Multiple Demand Category",
          execHe:
            "Multiple demand category מאפשר ל-Optimizer להבחין בין סוגי-ביקוש שונים — confirmed orders, forecast, safety-demand — ולתעדף ביניהם דרך עלויות-non-delivery שונות. כך הזמנות-מאושרות מקבלות עדיפות על תחזית בלבד.",
          beginnerHe:
            "לא כל ביקוש שווה. הזמנה-מאושרת מלקוח חשובה יותר מתחזית-עתידית. multiple demand category נותן לכל סוג-ביקוש 'משקל' משלו, כך שבמחסור ה-Optimizer ימלא קודם את המאושר ורק אחר-כך את התחזית.",
          consultantHe:
            "מימוש: לכל demand category (confirmed/forecast/...) key figure-ביקוש נפרד ועלות-non-delivery נפרדת. confirmed מקבל non-delivery cost גבוה; forecast נמוך יותר. ה-Optimizer בולע קודם את הביקוש היקר-לאי-אספקה. מאפשר תעדוף-מדורג של זרמי-ביקוש בלי priority נוקשה. מוגדר דרך demand-category key figures והפעלה ב-Operator.",
          purposeHe:
            "לתעדף סוגי-ביקוש לפי ודאות/חשיבות — לוודא שהזמנות-מאושרות נענות לפני תחזית — באמצעות מודל-עלות מדורג.",
          processExampleHe:
            "ביקוש: confirmed=60, forecast=40, זמין=70. עם non-delivery cost גבוה ל-confirmed ונמוך ל-forecast, ה-Optimizer ממלא 60 confirmed + 10 forecast, ומוותר על 30 forecast.",
          scenarioHe:
            "בארגון הזמנות-מאושרות של רשתות-מזון = confirmed (non-delivery גבוה); תחזית-חנויות-קצה = forecast (נמוך). במחסור הרשתות נענות במלואן, והקצה סופג את החוסר.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► configure demand categories + per-category non-delivery cost",
            "SAP IBP ► Planning Area ► confirmed / forecast demand key figures",
          ],
          tables: ["KF: CONFIRMEDDEMAND", "KF: FORECASTDEMAND", "KF: NONDELIVERYCOST"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הגדר key figure-ביקוש לכל category ועלות-non-delivery נפרדת לכל אחת.",
            "קבע non-delivery גבוה ל-confirmed, נמוך ל-forecast — כך נוצר התעדוף.",
          ],
          mistakesHe: [
            "non-delivery cost זהה לכל ה-categories ➔ אין תעדוף בפועל.",
            "ערבוב כל הביקוש ל-key figure אחד ➔ אי-אפשר להבחין בין סוגים.",
          ],
          troubleshootHe: [
            "confirmed לא מתועדף ➔ non-delivery cost שלו אינו גבוה מספיק.",
            "אין הבחנה בין סוגי-ביקוש ➔ לא הוגדרו demand-category key figures נפרדים.",
          ],
          bestPracticeHe: [
            "מַדֵּל non-delivery cost כסולם: confirmed > forecast > safety.",
            "התאם את ה-categories לתהליך-המכירות בפועל.",
          ],
          interviewHe: [
            { qHe: "מהי multiple demand category?", aHe: "יכולת להבחין בין סוגי-ביקוש (confirmed/forecast) ולתעדף ביניהם דרך עלויות-non-delivery שונות — מאושר נענה לפני תחזית." },
            { qHe: "כיצד מבטאים תעדוף בין categories?", aHe: "באמצעות non-delivery cost גבוה יותר לקטגוריה החשובה יותר; ה-Optimizer בולע קודם את הביקוש היקר-לאי-אספקה." },
          ],
          takeawaysHe: [
            "לא כל ביקוש שווה — confirmed > forecast.",
            "תעדוף דרך non-delivery cost מדורג.",
            "דורש key figures נפרדים לכל category.",
          ],
        },
        // -------------------------------------------------- 5.5.6
        {
          id: "5.5.6",
          titleHe: "החלפת מוצרים",
          titleEn: "Product Substitution",
          execHe:
            "Product substitution מאפשר ל-Optimizer למלא ביקוש למוצר-חסר באמצעות מוצר-חלופי תקף, בעלות-substitution. במקום לאבד מכירה כשה-SKU המבוקש חסר, מספקים תחליף מקובל.",
          beginnerHe:
            "אם נגמר ה-1.5L אבל יש 2L, אולי הלקוח יקבל את ה-2L במקום? product substitution אומר ל-Optimizer: 'מותר להחליף את זה בזה, במחיר-מסוים'. כך לא מאבדים את המכירה רק כי SKU מסוים חסר.",
          consultantHe:
            "מימוש: substitution relationship (מוצר-מקור→מוצר-יעד) עם substitution cost/penalty ולעיתים יחס-המרה. ה-Optimizer ישתמש בתחליף רק אם עלות-ה-substitution נמוכה מעלות-ה-non-delivery של המוצר-המקורי. ניתן לשרשר substitutions ולתחום אותם בזמן/לקוח. מוגדר דרך substitution key figures/master data והפעלה ב-Operator. נבדל מ-fair-share (חלוקה) ומ-late (זמן) — כאן מדובר בהחלפת-פריט.",
          purposeHe:
            "למקסם שירות-ביקוש על-ידי מילוי-חלופי כשה-SKU המבוקש חסר, במקום אי-אספקה — תוך שליטה בעלות/קבילות-ההחלפה.",
          processExampleHe:
            "1.5L חסר, 2L זמין, substitution מותר בעלות נמוכה. ה-Optimizer ממלא את ביקוש-ה-1.5L מ-2L (substitution cost) במקום לוותר (non-delivery גבוה יותר).",
          scenarioHe:
            "בארגון כשה-1.5L Coke חסר בשיא, ה-Optimizer מציע substitution ל-2L (אם המפיץ מאשר), ושומר על שירות במקום מדף-ריק.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► enable product substitution",
            "SAP IBP ► Planning Area / master data ► substitution relationships + substitution cost",
          ],
          tables: ["KF: SUBSTITUTIONCOST", "Substitution relationships", "KF: NONDELIVERYCOST"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators"],
          configHe: [
            "הגדר substitution relationships (source→target) עם substitution cost ויחס-המרה.",
            "ודא ש-substitution cost נמוך מ-non-delivery cost כדי שההחלפה 'תשתלם'.",
          ],
          mistakesHe: [
            "substitution cost גבוה מ-non-delivery ➔ ההחלפה לעולם לא נבחרת.",
            "יחסי-החלפה לא-תקפים עסקית ➔ תחליף לא-מקובל ללקוח.",
          ],
          troubleshootHe: [
            "אין substitution למרות חוסר ➔ cost גבוה מדי או relationship חסר.",
            "substitution מוגזם ➔ cost נמוך מדי; ה-Optimizer מחליף 'יותר-מדי'.",
          ],
          bestPracticeHe: [
            "הגדר רק החלפות-מקובלות-עסקית.",
            "דרג: original < substitution < non-delivery בעלות.",
          ],
          interviewHe: [
            { qHe: "מהי product substitution ב-Optimizer?", aHe: "מילוי ביקוש למוצר-חסר באמצעות מוצר-חלופי תקף, בעלות-substitution — נבחר רק אם זול מ-non-delivery של המוצר המקורי." },
            { qHe: "מתי ה-Optimizer יבחר substitution?", aHe: "כאשר עלות-ה-substitution נמוכה מעלות-ה-non-delivery של המוצר המבוקש, וקיים מוצר-חלופי תקף וזמין." },
          ],
          takeawaysHe: [
            "Substitution = מילוי בתחליף תקף במקום אי-אספקה.",
            "נבחר רק אם זול מ-non-delivery.",
            "דורש relationships + substitution cost.",
          ],
        },
        // -------------------------------------------------- 5.5.7
        {
          id: "5.5.7",
          titleHe: "רשתות-משנה",
          titleEn: "Subnetworks",
          execHe:
            "Subnetworks מחלקים רשת-אספקה גדולה לאזורים נפרדים-לפתרון, שאין ביניהם זרימה משמעותית. במקום לפתור בעיה-ענקית אחת, ה-Optimizer פותר כמה תת-בעיות קטנות — מהיר יותר, ולעיתים הכרחי כדי בכלל לפתור.",
          beginnerHe:
            "אם יש לך שתי רשתות-הפצה שלא 'מדברות' זו עם זו — למשל אירופה ואסיה שכל אחת עצמאית — אין טעם לפתור אותן יחד. subnetwork אומר ל-Optimizer: 'תפתור כל אזור בנפרד'. זה הרבה יותר מהיר.",
          consultantHe:
            "מימוש: זיהוי קבוצות-אובייקטים מנותקות (ללא lanes/sources משותפים) ופתרונן כתת-בעיות נפרדות. מקטין דרמטית את גודל-המודל וזמן-הריצה, ומשפר feasibility. חשוב לוודא שאין באמת תלות חוצת-תת-רשת (משאב/חומר משותף) — אחרת הפיצול שגוי. ב-IBP נשלט דרך הגדרות-scope/partitioning של ה-Operator. משלים את aggregate constraints (שכן יוצרים תלות-קבוצתית שמונעת פיצול).",
          purposeHe:
            "להאיץ את ה-Optimizer ולשפר feasibility על-ידי פירוק רשת גדולה לתת-רשתות עצמאיות.",
          processExampleHe:
            "תאגיד עם רשת-צפון-אמריקה ורשת-אירופה ללא העברות ביניהן. ה-Optimizer מפצל ל-2 subnetworks, פותר כל אחת בנפרד, וזמן-הריצה צונח.",
          scenarioHe:
            "בארגון מפעלים ואזורי-הפצה עצמאיים גיאוגרפית (אין העברות ביניהם) מפוצלים ל-subnetworks; ה-Optimizer פותר כל אזור-בקבוק לחוד ומהר.",
          navHe: [
            "SAP IBP ► Manage Planning Operators ► partitioning / subnetwork scope settings",
            "SAP IBP ► Planning Area ► verify no shared lanes/resources across regions",
          ],
          tables: ["Source of supply (lanes)", "Resource scope", "Location network"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Manage Planning Operators", "Application Logs"],
          configHe: [
            "ודא שאין lanes/sources/משאבים משותפים בין האזורים לפני פיצול.",
            "הגדר partitioning/scope ב-Operator לפתרון נפרד של כל תת-רשת.",
          ],
          mistakesHe: [
            "פיצול רשתות עם תלות-משותפת ➔ פתרון שגוי (מתעלם מהקשר).",
            "אי-פיצול רשת-ענקית מנותקת ➔ זמן-ריצה מיותר ו-feasibility ירוד.",
          ],
          troubleshootHe: [
            "תוצאה שגויה אחרי פיצול ➔ קיים משאב/חומר משותף שנשבר.",
            "ריצה איטית למרות מבנה-מנותק ➔ subnetwork partitioning לא הופעל.",
          ],
          bestPracticeHe: [
            "פצל רק רשתות באמת-מנותקות.",
            "בדוק שאין aggregate constraint חוצה-אזורים לפני הפיצול.",
          ],
          interviewHe: [
            { qHe: "מהם subnetworks?", aHe: "פירוק רשת-אספקה גדולה לאזורים מנותקים (ללא זרימה משותפת) הנפתרים כתת-בעיות נפרדות — מהיר יותר ובעל feasibility טובה יותר." },
            { qHe: "מתי אסור לפצל ל-subnetworks?", aHe: "כשקיימת תלות-חוצת-אזורים — משאב, חומר או lane משותף, או aggregate constraint גלובלי — שהפיצול היה שובר." },
          ],
          takeawaysHe: [
            "Subnetwork = פירוק רשת מנותקת לתת-בעיות.",
            "מאיץ ריצה ומשפר feasibility.",
            "אסור לפצל כשיש תלות-משותפת.",
          ],
        },
        // -------------------------------------------------- 5.5.8
        {
          id: "5.5.8",
          titleHe: "הסבר ה-Optimizer",
          titleEn: "Optimizer Explanation",
          execHe:
            "Optimizer Explanation חושף 'למה' מאחורי תוצאת-ה-Optimizer — אילו אילוצים היו מחייבים (binding), אילו עלויות הניעו את ההחלטות, ומדוע ביקוש מסוים לא נענה. הוא הופך את 'הקופסה-השחורה' לתכנית-שקופה הניתנת-להגנה בפני ההנהלה.",
          beginnerHe:
            "ה-Optimizer מחזיר מספרים, אבל לפעמים אתה שואל 'למה לא ספקנו ללקוח הזה?'. Optimizer Explanation עונה: 'כי קו-המילוי היה מלא ועלות-החלופה הייתה גבוהה מדי'. הוא מסביר את ההיגיון מאחורי כל החלטה.",
          consultantHe:
            "מימוש: לאחר הרצה, ה-Explanation מנתח את הפתרון ומדווח על binding constraints (האילוצים שהגיעו לגבול והגבילו את התוצאה), shadow prices/contributions של עלויות, וסיבות ל-non-delivery. בודקים זאת ב-Application Logs / Optimizer Explanation. כלי קריטי לכיוּל cost key figures ולזיהוי צווארי-הבקבוק האמיתיים: אם אילוץ-קיבולת הוא binding — זה צוואר-הבקבוק שכדאי להרחיב.",
          purposeHe:
            "להפוך את תוצאת-ה-Optimizer לשקופה ולברת-הגנה — להבין מה הגביל, מה הניע, ולמה — לצורך אמון-עסקי וכיוּל-מודל.",
          processExampleHe:
            "Constrained Demand נמוך מהצפוי. ה-Explanation מראה ש-Capacity Supply של קו-2 הוא binding constraint ושעלות-ה-non-delivery הניעה ויתור על SKU זול. המתכנן מבין שצריך להרחיב את קו-2.",
          scenarioHe:
            "בארגון ההנהלה שואלת למה מפיץ-X קיבל פחות. ה-Explanation מראה: קיבולת קו-המילוי הייתה binding ו-fair-share חילק את היתרה — תשובה שקופה ומבוססת-נתונים.",
          navHe: [
            "SAP IBP ► Application Jobs ► run with Optimizer Explanation enabled",
            "SAP IBP ► Application Logs ► review binding constraints + cost contributions",
          ],
          tables: ["Binding constraints log", "Shadow prices", "Non-delivery reasons"],
          tcodes: ["IBP S&OP Optimizer"],
          fiori: ["Application Logs", "Optimizer Explanation", "Manage Planning Operators"],
          configHe: [
            "הפעל Optimizer Explanation בהגדרות ה-Operator/Job.",
            "נתח את ה-Application Logs לזיהוי binding constraints וסיבות-non-delivery.",
          ],
          mistakesHe: [
            "התעלמות מ-Explanation ➔ סמיכה-עיוורת על מספרי-ה-Optimizer.",
            "אי-הפעלת Explanation ➔ אין דרך להסביר/לכייל את התוצאה.",
          ],
          troubleshootHe: [
            "לא ברור למה ביקוש לא נענה ➔ עיין ב-non-delivery reasons ב-Explanation.",
            "תוצאה לא-צפויה ➔ זהה את ה-binding constraints וכייל את ה-cost key figures.",
          ],
          bestPracticeHe: [
            "הפעל Explanation בכל הרצה משמעותית.",
            "השתמש ב-binding constraints לזיהוי צווארי-בקבוק להשקעה.",
          ],
          interviewHe: [
            { qHe: "מה מספק Optimizer Explanation?", aHe: "ניתוח 'למה' — אילו constraints היו binding, אילו עלויות הניעו החלטות, ומדוע ביקוש לא נענה — שהופך את הפתרון לשקוף ובר-הגנה." },
            { qHe: "מהו binding constraint ולמה הוא חשוב?", aHe: "אילוץ שהגיע לגבולו והגביל את התוצאה — הוא צוואר-הבקבוק האמיתי; הרחבתו (למשל קיבולת) תשפר את התכנית יותר מכל דבר אחר." },
          ],
          takeawaysHe: [
            "Explanation = ה'למה' מאחורי המספרים.",
            "Binding constraints = צווארי-הבקבוק האמיתיים.",
            "כלי קריטי לאמון-עסקי ולכיוּל-מודל.",
          ],
        },
      ],
    },
    // ============================================================ 5.6
    {
      id: "5.6",
      titleHe: "היוריסטיקה סופית",
      titleEn: "Finite Heuristic",
      execHe:
        "ה-Finite Heuristic הוא חלופה פשוטה ומהירה ל-Optimizer לתכנון-מוגבל. בניגוד ל-S&OP Heuristic הבלתי-מוגבל, הוא מכבד את קיבולת-המשאב — אך עושה זאת מבוסס-כללים, משאב-אחר-משאב, בלי אופטימיזציה גלובלית. הוא נותן תכנית בת-ביצוע מהר, כשאיזון-עלות-מלא אינו נדרש.",
      beginnerHe:
        "אם ה-Optimizer הוא 'פותר-חידות חכם אבל איטי', ה-Finite Heuristic הוא 'כלל-אצבע מהיר'. הוא דואג שלא תחרוג מהקיבולת, אבל לא מחפש את הפתרון הזול-ביותר בעולם — הוא פשוט עובר משאב-אחר-משאב ומתכנן עד-הקיבולת. מהיר, פשוט, מספיק-טוב לרוב המקרים.",
      consultantHe:
        "מימוש: heuristic מבוסס-כללים שמתכנן ביקוש כנגד קיבולת-משאב סופית, לרוב לפי priority/sequence שמוגדרים מראש, ומסיט עודף-ביקוש לתקופה/משאב אחר או ל-lost demand. הוא לא בונה Objective Function ולא פותר LP — ולכן מהיר ודטרמיניסטי, אך לא-אופטימלי גלובלית ולא מבצע trade-offs מבוססי-עלות. מוגדר כ-Operator profile מסוג Finite Heuristic. מתי לבחור בו: כשהמורכבות נמוכה, נדרש זמן-ריצה קצר, או כשרוצים תוצאה צפויה וקלה-להסבר. מתי לא: כשנדרשות החלטות-trade-off רב-משאביות מבוססות-עלות — אז Optimizer.",
      purposeHe:
        "לספק תכנון-מוגבל מהיר וקל-להבנה כשאין צורך באופטימיזציה-גלובלית מבוססת-עלות — ולשמש 'דרגת-ביניים' בין Heuristic בלתי-מוגבל ל-Optimizer מלא.",
      processExampleHe:
        "המתכנן בוחר Operator מסוג Finite Heuristic. ההרצה מתכננת כל משאב עד-קיבולתו לפי priority; עודף-ביקוש נדחה לתקופה-הבאה או מסומן lost. התוצאה מהירה ובת-ביצוע, אך ייתכן שאינה מינימום-העלות הגלובלי.",
      scenarioHe:
        "בארגון לתכנון-שבועי-מהיר של קו-מילוי בודד, ה-Finite Heuristic מספיק: הוא ממלא את הקו עד-קיבולתו לפי עדיפות-SKU ודוחה את העודף. ל-S&OP חודשי רב-מפעלי עם trade-offs — עוברים ל-Optimizer.",
      navHe: [
        "SAP IBP ► Application Jobs ► Operator: Finite Heuristic",
        "SAP IBP ► Manage Planning Operators ► define finite-heuristic profile + resource scope",
        "SAP IBP for Microsoft Excel ► run Finite Heuristic on the planning view",
      ],
      tables: ["KF: CAPASUPPLY", "KF: CONSTRAINEDSUPPLY", "KF: CONSTRAINEDDEMAND"],
      tcodes: ["IBP S&OP Heuristic", "Finite Heuristic", "IBP S&OP Optimizer"],
      fiori: ["Application Jobs", "Manage Planning Operators"],
      configHe: [
        "Operator profile = Finite Heuristic; הגדר את היקף-המשאבים ואת לוגיקת-העדיפות.",
        "אין צורך ב-cost key figures מלאים — בניגוד ל-Optimizer.",
      ],
      flow: [
        { he: "בחירת Finite Heuristic", code: "Operator" },
        { he: "תכנון משאב-אחר-משאב עד קיבולת", code: "rule-based" },
        { he: "עודף ➔ תקופה אחרת / lost", code: "spill" },
        { he: "תכנית מוגבלת מהירה", code: "Constrained Supply" },
      ],
      mistakesHe: [
        "בחירת Finite Heuristic כשנדרשים trade-offs מבוססי-עלות ➔ תוצאה נחותה.",
        "ציפייה לאופטימום גלובלי מ-Heuristic ➔ אין דבר כזה ב-Finite.",
      ],
      troubleshootHe: [
        "התוצאה לא-אופטימלית מבחינת עלות ➔ זו טבעה של Heuristic; עבור ל-Optimizer.",
        "עודף-ביקוש לא-מטופל כצפוי ➔ בדוק את לוגיקת-העדיפות/spill.",
      ],
      bestPracticeHe: [
        "השתמש ב-Finite Heuristic לתרחישים פשוטים/מהירים; Optimizer למורכבים.",
        "הגדר priority/sequence ברורים כי הם מנהיגים את התוצאה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Finite Heuristic ל-S&OP Optimizer?", aHe: "Finite Heuristic מכבד קיבולת מבוסס-כללים משאב-אחר-משאב (מהיר, לא-אופטימלי, ללא trade-offs מבוססי-עלות); ה-Optimizer פותר LP/MILP גלובלי ומאזן את כל האילוצים והעלויות בו-זמנית." },
        { qHe: "מתי תעדיף Finite Heuristic?", aHe: "כשהמורכבות נמוכה, נדרש זמן-ריצה קצר, ואין צורך באיזון-עלות רב-משאבי — או כדרגת-ביניים בין בלתי-מוגבל ל-Optimizer." },
      ],
      takeawaysHe: [
        "Finite Heuristic = תכנון-מוגבל מהיר ומבוסס-כללים.",
        "מכבד קיבולת אך אינו אופטימלי גלובלית.",
        "Optimizer למורכבות ול-trade-offs מבוססי-עלות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · S&OP Optimizer (5.2)", href: "/library/sop/chapter-05/#sub-5.2" },
        { labelHe: "S&OP · במבט-על (5.1)", href: "/library/sop/chapter-05/#sub-5.1" },
      ],
    },
    // ============================================================ 5.7
    {
      id: "5.7",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את תכנון-האספקה המוגבל ב-SAP IBP for S&OP: המעבר מתכנית-משאלות בלתי-מוגבלת לתכנית בת-ביצוע. הלב הוא ה-S&OP Optimizer — מנוע LP/MILP שממזער עלות או ממקסם רווח תחת אילוצים, לצד ה-Finite Heuristic המהיר. שליטה בשלוש דרגות-האילוץ (hard/pseudo-hard/soft), במידול-הפיננסי (cost key figures + parameters) וביכולות-המתקדמות (late, fair-share, substitution, ועוד) היא מה שהופך תכנון-מוגבל מתרגיל-טכני לכלי-החלטה-עסקי.",
      beginnerHe:
        "סיכמנו את כל הדרך: למה צריך תכנון-מוגבל (כי המציאות מוגבלת), מי עושה את העבודה (Optimizer חכם, או Finite Heuristic מהיר), אילו חוקים הוא מכבד (hard/pseudo/soft), איך 'מדברים' איתו (דרך עלויות), ואילו טריקים-מתקדמים יש לו (איחור, החלפה, חלוקה-הוגנת, הסבר). אם הבנת את ההיררכיה הזו — הבנת את הפרק.",
      consultantHe:
        "מבט-יועץ: ההצלחה במימוש תכנון-מוגבל תלויה בשלושה: (1) מודל-נתונים נכון — planning levels ל-RESOURCE/PRODUCT, sources of supply, ו-key figures מלאים; (2) מידול-עלות מכוייל — היחסים בין cost key figures (במיוחד non-delivery) קובעים את כל ההחלטות; (3) סיווג-אילוצים נבון — hard רק לפיזי, pseudo-hard למלאי-בטחון, soft להעדפות. Optimizer Explanation הוא בן-הברית לכיוּל ולאמון-עסקי. בחר Finite Heuristic לפשטות/מהירות, Optimizer לעומק/trade-offs. תמיד השווה Unconstrained ל-Constrained — הפער הוא הסיפור.",
      purposeHe:
        "לאחד את כל מרכיבי-הפרק לתמונה-אחת מעשית: מתי ואיך להפעיל תכנון-מוגבל, איזה מנוע לבחור, וכיצד לכייל אותו כך שהתכנית תהיה ריאלית, אופטימלית ובת-הגנה ב-S&OP.",
      processExampleHe:
        "מימוש מלא: הקם planning area עם RESOURCE+capacity; הגדר sources of supply ו-cost key figures; כייל non-delivery; סווג אילוצים; הרץ Heuristic בלתי-מוגבל לבסיס, ואז Optimizer מוגבל; נתח עם Explanation; אשר Constrained Plan כ-Supply Commit ב-Executive S&OP.",
      scenarioHe:
        "בארגון המסע השלם: לפני הקיץ מַדֵּלים קיבולת-קווים ועלויות, מסווגים קיבולת=hard ומלאי-בטחון=pseudo-hard, עוברים ל-Profit Maximization, מפעילים fair-share ו-substitution, מריצים Optimizer, ומסבירים להנהלה דרך Optimizer Explanation מדוע התכנית המוגבלת היא הטובה ביותר האפשרית.",
      navHe: [
        "SAP IBP ► Application Jobs ► run Heuristic then Optimizer and compare",
        "SAP IBP ► Sales and Operations Planning ► review Constrained vs Unconstrained",
        "SAP IBP ► Application Logs / Optimizer Explanation ► validate the final plan",
      ],
      tables: ["KF: CONSTRAINEDDEMAND", "KF: CONSTRAINEDSUPPLY", "KF: CAPASUPPLY", "KF: NONDELIVERYCOST"],
      tcodes: ["IBP S&OP Optimizer", "Finite Heuristic", "IBP S&OP Heuristic"],
      fiori: ["Application Jobs", "Manage Planning Operators", "Optimizer Explanation"],
      configHe: [
        "Checklist: planning levels (RESOURCE/PRODUCT) ✔ sources of supply ✔ cost key figures ✔ constraint classification ✔ Operator profile ✔.",
        "כייל non-delivery cost כפרמטר-המוביל לפני סמיכה על התוצאה.",
        "הפעל Optimizer Explanation לאימות וכיוּל.",
      ],
      mistakesHe: [
        "דילוג על השוואת Unconstrained↔Constrained ➔ אובדן התובנה העסקית.",
        "סמיכה על Optimizer בלי cost key figures מכויילים ➔ תכנית 'אופטימלית' אך שגויה.",
        "סיווג-אילוצים שגוי ➔ infeasible או תכנית נוקשה/רופפת-מדי.",
      ],
      troubleshootHe: [
        "תכנית לא-משכנעת את ההנהלה ➔ הפק Optimizer Explanation להצגת ה'למה'.",
        "Constrained=Unconstrained ➔ אין אילוצים פעילים / חסר capacity.",
        "תוצאות לא-עקביות ➔ cost key figures חסרים או אילוצים לא-מסווגים.",
      ],
      bestPracticeHe: [
        "תמיד הרץ והשווה בלתי-מוגבל מול מוגבל.",
        "התחל פשוט (Finite) ועלה למורכב (Optimizer) לפי הצורך.",
        "כייל עלויות ביחסים, סווג אילוצים בנבונות, והסבר עם Optimizer Explanation.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת מרכיבי-ההצלחה בתכנון-מוגבל?", aHe: "(1) מודל-נתונים נכון (planning levels, sources, key figures מלאים); (2) מידול-עלות מכוייל (במיוחד non-delivery); (3) סיווג-אילוצים נבון (hard לפיזי, pseudo-hard למלאי-בטחון, soft להעדפות)." },
        { qHe: "כיצד תבחר בין Finite Heuristic ל-Optimizer?", aHe: "Finite Heuristic לפשטות/מהירות/תוצאה-צפויה ללא trade-offs; Optimizer למורכבות רב-משאבית הדורשת איזון-עלות גלובלי ו-trade-offs מבוססי-כסף." },
      ],
      takeawaysHe: [
        "תכנון-מוגבל = תכנית בת-ביצוע; הפער מול בלתי-מוגבל הוא הסיפור.",
        "Optimizer (עומק/trade-offs) מול Finite Heuristic (פשטות/מהירות).",
        "ההצלחה: מודל-נתונים + מידול-עלות מכוייל + סיווג-אילוצים נבון.",
        "Optimizer Explanation = שקיפות, אמון וכיוּל.",
      ],
      relatedHe: [
        { labelHe: "S&OP · במבט-על (5.1)", href: "/library/sop/chapter-05/#sub-5.1" },
        { labelHe: "S&OP · S&OP Optimizer (5.2)", href: "/library/sop/chapter-05/#sub-5.2" },
        { labelHe: "S&OP · Finite Heuristic (5.6)", href: "/library/sop/chapter-05/#sub-5.6" },
      ],
    },
  ],
};
