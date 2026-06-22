// ===== S&OP with SAP IBP — Chapter 3 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Topic: Demand Planning with SAP IBP. Hierarchy and ids preserved exactly;
// SAP objects kept verbatim in English (Holt-Winters, Croston, AR statistical
// models, Manage Forecast Models, demand sensing, ABC/XYZ, key figures). IBP cloud.
import type { TextbookChapter } from "./types";

export const CH3: TextbookChapter = {
  n: 3,
  titleHe: "תכנון ביקושים (Demand Planning)",
  titleEn: "Demand Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון-הביקושים (Demand Planning) ב-SAP IBP — הצעד הראשון והקובע בתהליך ה-S&OP. כאן הופכים היסטוריית-מכירות לתחזית-ביקוש מהימנה, באמצעות מודלים סטטיסטיים (Holt-Winters, Croston, AR ועוד), תכנון מבוסס-מניעים (driver-based), חיזוי-ביקוש בטווח-קצר (demand sensing), ומודל-פיננסי-משתף הממיר את התחזית התפעולית לתחזית-הכנסות ורווח. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (מפעל-מילוי משקאות מבית Coca-Cola, עם עונתיות ומבצעים), ניווט באפליקציות IBP (Manage Forecast Models, Excel add-in), אובייקטים ו-key figures, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לבנות תחזית-ביקוש מקצה-לקצה ב-IBP ללא הספר המקורי. אובייקטי-SAP נשמרים באנגלית מקור (Holt-Winters, Croston, AR, Manage Forecast Models, demand sensing, ABC/XYZ).",
  subchapters: [
    // ============================================================ 3.1
    {
      id: "3.1",
      titleHe: "מבט-על על תכנון ביקושים",
      titleEn: "Demand Planning at a Glance",
      execHe:
        "תכנון-ביקושים הוא תהליך יצירת תחזית-ביקוש מאוחדת, המשמשת כקלט הקובע לכל שאר ה-S&OP — אספקה, מלאי וכספים. ב-SAP IBP מודול ה-Demand מאחד תחזית סטטיסטית, תכנון-שיווק/מבצעים, ושיתוף-פעולה אנושי, אל תוך מספר-תחזית אחד מוסכם (consensus demand). תחזית טובה מקטינה מלאי-עודף ומחסור גם-יחד, ולכן היא הנכס בעל-הרגישות-הגבוהה-ביותר בכל שרשרת-האספקה: שגיאת-תחזית של אחוזים בודדים מתורגמת ישירות לעלויות ולשירות-לקוח.",
      beginnerHe:
        "תכנון-ביקושים פירושו 'לנחש בצורה חכמה כמה יימכר'. במקום ניחוש בעלמא, IBP מסתכל על מה שנמכר בעבר (היסטוריה), מזהה דפוסים (מגמה, עונתיות), ומחשב תחזית למה שיימכר בעתיד. אחר-כך אנשים-אמיתיים מתערבים: השיווק מוסיף מבצע, מנהל-מכירות מתקן לפי ידע-שטח. התוצאה היא 'מספר אחד מוסכם' שכולם עובדים לפיו. זה הצעד הראשון — כל השאר (כמה לייצר, כמה להחזיק במלאי) נגזר ממנו.",
      consultantHe:
        "ב-SAP IBP for demand, תכנון-הביקושים נשען על המבנה הסטנדרטי: planning area (לדוגמה SAPIBP1), key figures לכל סוג-ביקוש (Actuals Qty, Statistical Forecast Qty, Consensus Demand Qty), ו-planning levels בגרנולריות Product/Customer/Location/Month. שלושה מנגנונים מרכזיים: (1) Statistical Forecasting — operator שמפעיל forecast models על היסטוריה; (2) Demand Sensing — תיקון תחזית קצר-טווח לפי אותות-ביקוש עדכניים (open orders, POS); (3) consensus — שיתוף-פעולה אנושי ב-Excel/Web UI. ה-key figure calculations וה-time profile הם הבסיס; ה-snapshots (כגון Statistical Forecast snapshot) מאפשרים מדידת-דיוק (forecast error) לאורך-זמן.",
      purposeHe:
        "המטרה: לייצר מספר-ביקוש אחד, מהימן ומשותף, שיהווה את הקלט היחיד לתכנון-האספקה ולתכנון הפיננסי. תחזית מאוחדת מונעת 'מספרים מתחרים' בין מחלקות, מקטנת bias, ומאפשרת קבלת-החלטות מבוססת-נתונים בישיבת ה-S&OP.",
      processExampleHe:
        "בחברת-מוצרי-צריכה: מערכת מושכת 36 חודשי-מכירות היסטוריים ל-IBP; ה-Statistical Forecasting operator מריץ Holt-Winters ומפיק תחזית-בסיס ל-18 חודשים; השיווק מוסיף uplift למבצע-קיץ; מנהלי-המכירות מתקנים אזורית ב-Excel add-in; התחזיות מתאחדות ל-Consensus Demand, שננעל ומועבר כקלט ל-Supply Planning.",
      cbcHe:
        "ב-CBC (מפעל-מילוי משקאות): הביקוש למשקאות-קלים עונתי בחדות — שיא בקיץ ובחגים. תכנון-הביקושים מתחיל מ-Statistical Forecast לכל SKU×לקוח×אזור, מוסיף uplift למבצעי-קמעונאות (1+1, מדפים), ומאחד ל-Consensus Demand שמזין את תכנון-קווי-המילוי. דיוק-התחזית נמדד מול Actuals כדי לכוונן את המודלים מדי-עונה.",
      navHe: [
        "SAP Fiori Launchpad ► Demand Planning ► Manage Forecast Models",
        "Excel ► SAP IBP ribbon ► New View ► טעינת Actuals + Statistical Forecast + Consensus Demand",
        "SAP Fiori Launchpad ► Application Jobs ► Statistical Forecasting (תזמון/ניטור הרצה)",
      ],
      tables: ["Planning Area SAPIBP1", "Actuals Qty", "Statistical Forecast Qty", "Consensus Demand Qty"],
      tcodes: ["Manage Forecast Models", "Statistical Forecasting", "Excel add-in", "Application Jobs"],
      fiori: ["Manage Forecast Models", "Application Jobs", "Demand Planning"],
      configHe: [
        "planning area הכולל key figures לכל שלב: Actuals Qty, Statistical Forecast Qty, Consensus Demand Qty.",
        "time profile (לדוגמה Technical Week / Month / Quarter) — הגרנולריות שעליה רץ החיזוי.",
        "planning levels בגרנולריות Product-Customer-Location-Month לתחזית מפורטת.",
        "snapshots key figures (Statistical Forecast snapshot) למדידת forecast error לאורך-זמן.",
      ],
      flow: [
        { he: "טעינת היסטוריה (Actuals)", code: "CI-DS", note: "מ-S/4HANA" },
        { he: "תחזית סטטיסטית", code: "Statistical Forecasting", note: "forecast model" },
        { he: "התאמות שיווק/מבצעים", code: "Excel add-in", note: "uplift" },
        { he: "איחוד (Consensus)", code: "Consensus Demand", note: "מספר אחד" },
        { he: "מסירה ל-Supply", code: "Handover", note: "קלט לתכנון-אספקה" },
      ],
      masterDataHe: [
        "Product / Customer / Location / Product Family — אטריביוטים לגרנולריות התחזית.",
        "Actuals Qty = key figure היסטוריה · Statistical Forecast Qty · Consensus Demand Qty.",
        "ABC/XYZ classification key figures — לסיווג מוצרים לפי נפח ותנודתיות.",
      ],
      mistakesHe: [
        "ערבוב כמה 'מספרי-תחזית' בין מחלקות במקום consensus אחד — מוביל לאי-אמון בנתונים.",
        "תכנון בגרנולריות עדינה-מדי שאין בה מספיק היסטוריה — מודלים סטטיסטיים מתפרקים.",
        "אי-מדידת forecast error — אין דרך לדעת אם התחזית משתפרת או מדרדרת.",
      ],
      troubleshootHe: [
        "התחזית לא מתעדכנת ➔ בדוק שה-Statistical Forecasting job רץ והצליח ב-Application Jobs.",
        "Consensus ריק ➔ ה-key figure calculation לא מאחד את שכבות-הקלט; בדוק נוסחאות-איחוד.",
        "מספרים לא תואמים בין Excel ל-Web UI ➔ planning area / version שונים נטענו.",
      ],
      bestPracticeHe: [
        "הגדר 'מספר אחד מוסכם' (single consensus number) ועבוד אך-ורק לפיו במורד-הזרם.",
        "מדוד forecast error (MAPE/bias) באמצעות snapshots וכוונן מודלים מדי-מחזור.",
        "התחל בגרנולריות שיש בה היסטוריה מספקת; פצל למטה רק כשהנתונים תומכים.",
      ],
      interviewHe: [
        { qHe: "מהו consensus demand?", aHe: "מספר-ביקוש אחד מוסכם המאחד תחזית סטטיסטית, התאמות-שיווק ושיתוף-פעולה אנושי, ומשמש כקלט היחיד לתכנון-האספקה." },
        { qHe: "אילו שלושה מנגנוני-ביקוש מספק IBP for demand?", aHe: "Statistical Forecasting (מודלים על היסטוריה), Demand Sensing (תיקון קצר-טווח לפי אותות), ו-consensus (שיתוף-פעולה אנושי)." },
        { qHe: "מדוע מודדים forecast error?", aHe: "כדי לדעת אם התחזית משתפרת, לזהות bias, ולכוונן בחירת-מודלים — בלי מדידה אין שיפור." },
      ],
      takeawaysHe: [
        "תכנון-ביקושים = הקלט הקובע לכל ה-S&OP.",
        "המטרה: מספר אחד מוסכם (consensus) מאוחד.",
        "סטטיסטי + שיווק + אנושי → תחזית אחת.",
        "מדידת forecast error היא תנאי לשיפור מתמשך.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מודל וניווט IBP (פרק 2)", href: "/library/sop/chapter-02/" },
        { labelHe: "S&OP · תכנון אספקה", href: "/library/sop/chapter-04/" },
      ],
      children: [
        {
          id: "3.1.1",
          titleHe: "גישת חיזוי הביקוש",
          titleEn: "Demand Forecasting Approach",
          execHe:
            "גישת-החיזוי קובעת כיצד מפיקים את תחזית-הבסיס: סטטיסטית-טהורה (מבוססת-היסטוריה), מבוססת-מניעים (driver-based), חיזוי-קצר-טווח (demand sensing), או שילוב. הבחירה תלויה בזמינות-היסטוריה, באופק-התכנון, וביציבות-הביקוש. גישה נכונה היא ההבדל בין תחזית שמתעדכנת לבדה לבין תחזית שדורשת תיקון-ידני מתמיד.",
          beginnerHe:
            "יש כמה דרכים 'לחזות': להסתכל רק על העבר (סטטיסטי), להסתכל על דברים שמשפיעים על המכירות כמו מחיר ומזג-אוויר (מבוסס-מניעים), או להגיב מהר מאוד למה שקורה השבוע (demand sensing). בוחרים את הדרך לפי כמה היסטוריה יש ולכמה זמן קדימה מתכננים.",
          consultantHe:
            "ב-IBP מיושמות הגישות דרך operators שונים: Statistical Forecasting (univariate — Holt-Winters/Croston/AR), multiple linear regression / gradient boosting ל-driver-based, ו-Demand Sensing operator לטווח-הקצר. בדרך-כלל בונים תהליך היברידי: סטטיסטי לאופק-בינוני, driver-based היכן שיש מניעים מובהקים, ו-demand sensing לתיקון 1–8 שבועות. הבחירה מעוגנת ב-ABC/XYZ: פריטי AX (נפח-גבוה/יציב) מתאימים לסטטיסטי, CZ (נפח-נמוך/תנודתי) לעיתים ל-Croston או לתכנון-ידני.",
          purposeHe:
            "להתאים את שיטת-החיזוי לאופי-הביקוש ולאופק, כדי למקסם דיוק ולמזער התערבות-ידנית.",
          processExampleHe:
            "מוצר נפוץ ויציב מקבל Holt-Winters אוטומטי; מוצר תלוי-מחיר מקבל מודל driver-based עם מחיר ומבצע כ-drivers; מוצר עם sales-orders פתוחים מקבל demand sensing לתיקון 4 השבועות הקרובים.",
          cbcHe:
            "ב-CBC: משקה-דגל יציב → Holt-Winters; משקה-מבצע תלוי-קמעונאות → driver-based (מחיר, מבצע, חג); מוצר-נישה אזורי → Croston (ביקוש מקוטע).",
          navHe: [
            "SAP Fiori Launchpad ► Demand Planning ► Manage Forecast Models ► בחירת Forecasting Approach",
            "Excel ► SAP IBP ► Statistical Forecasting ► בחירת model/operator",
          ],
          tables: ["Statistical Forecast Qty", "ABC Code", "XYZ Code"],
          tcodes: ["Manage Forecast Models", "Statistical Forecasting"],
          fiori: ["Manage Forecast Models"],
          configHe: [
            "בחירת operator: Statistical Forecasting (univariate) מול driver-based מול Demand Sensing.",
            "שיוך גישה לפי segment (ABC/XYZ) — מודל אחר לכל קבוצת-מוצרים.",
          ],
          mistakesHe: [
            "הפעלת מודל-סטטיסטי על פריט מקוטע (intermittent) במקום Croston — תחזית מנופחת.",
            "שימוש ב-driver-based ללא drivers אמינים — רעש במקום אות.",
          ],
          troubleshootHe: [
            "תחזית 'שטוחה' למוצר עונתי ➔ נבחרה גישה לא-עונתית; עבור ל-Holt-Winters.",
            "תחזית קופצת לפריט-נישה ➔ univariate על intermittent; עבור ל-Croston.",
          ],
          bestPracticeHe: [
            "מַפֶּה גישה לכל segment של ABC/XYZ במקום מודל-יחיד-לכולם.",
            "הותר ל-Best-Fit לבחור, אך ודא שמרחב-המודלים מתאים לסוג-הביקוש.",
          ],
          interviewHe: [
            { qHe: "מתי בוחרים driver-based על-פני סטטיסטי?", aHe: "כשקיימים מניעים חיצוניים מובהקים (מחיר, מבצע, מזג-אוויר) עם היסטוריה אמינה שמסבירה את הביקוש." },
            { qHe: "כיצד ABC/XYZ מנחה את בחירת-הגישה?", aHe: "AX (נפח-גבוה/יציב) → סטטיסטי; intermittent/CZ → Croston או ידני; מובלי-מבצע → driver-based." },
          ],
          takeawaysHe: [
            "אין גישה-אחת-לכולם — מתאימים לפי אופי-הביקוש.",
            "סטטיסטי / driver-based / demand sensing — שלושת העמודים.",
            "ABC/XYZ הוא המדריך לבחירת-גישה.",
          ],
        },
        {
          id: "3.1.2",
          titleHe: "אסטרטגיית תכנון הביקוש",
          titleEn: "Demand Planning Strategy",
          execHe:
            "אסטרטגיית-תכנון-הביקוש מגדירה את מסגרת-העבודה: אופק-תכנון (planning horizon), פרק-זמן (bucket — שבוע/חודש), גרנולריות (planning level), תדירות-מחזור (planning cycle), ותפקידי בעלי-העניין. היא ה'חוקה' שלפיה נבנה כל התהליך, ומבטיחה שהתחזית תתאים לקצב-ההחלטות העסקי.",
          beginnerHe:
            "לפני שמתחילים לחזות, מחליטים על 'כללי-המשחק': לכמה זמן קדימה מתכננים? ביחידות של שבועות או חודשים? באיזו רמת-פירוט (כל מוצר? כל משפחה?)? כל כמה זמן מרעננים? ומי אחראי על מה? כל ההחלטות האלה ביחד הן האסטרטגיה.",
          consultantHe:
            "ב-IBP האסטרטגיה מתממשת דרך הגדרות-מודל: time profile (levels של Week/Month/Quarter), planning area horizon, key figure ל-Consensus Demand בגרנולריות מתאימה, ו-planning views ב-Excel המותאמים לתפקיד. תדירות-המחזור (לדוגמה monthly S&OP cycle) מתואמת עם snapshots וגרסאות (versions/scenarios). החלטה קריטית: lowest planning level — נמוך-מדי שובר את הסטטיסטיקה, גבוה-מדי מאבד שליטה.",
          purposeHe:
            "ליצור מסגרת-תכנון עקבית התואמת את מחזור-ההחלטות העסקי, כך שהתחזית תהיה רלוונטית, ניתנת-לתחזוקה, וברת-מדידה.",
          processExampleHe:
            "חברה קובעת: אופק 18 חודשים, bucket חודשי, גרנולריות Product×Customer×Location, מחזור חודשי. כל חודש מורצת תחזית, מתאחד consensus, ננעלת גרסה, ונמדד דיוק מול הגרסה הקודמת.",
          cbcHe:
            "ב-CBC: אופק 18 חודשים ל-S&OP אך demand sensing ל-8 שבועות; bucket חודשי לתכנון, שבועי לביצוע; גרנולריות SKU×לקוח-מפתח×אזור-הפצה; מחזור חודשי המתואם עם לוח-מבצעי-הקמעונאות.",
          navHe: [
            "SAP Fiori Launchpad ► Configuration ► Time Profiles / Planning Areas (הגדרת אופק ו-buckets)",
            "Excel ► SAP IBP ► New View ► Planning Level (בחירת גרנולריות)",
          ],
          tables: ["Time Profile", "Planning Level", "Consensus Demand Qty", "Version"],
          tcodes: ["Configuration", "Manage Planning Area", "Excel add-in"],
          fiori: ["Configuration", "Manage Planning Area"],
          configHe: [
            "time profile עם levels (Week/Month/Quarter) — קובע buckets ואופק.",
            "lowest planning level לתחזית — איזון בין דיוק-סטטיסטי לשליטה.",
            "planning cycle ו-versions/scenarios לניהול מחזורי-התכנון.",
          ],
          mistakesHe: [
            "אופק ארוך-מדי שאין בו ערך-החלטה — בזבוז-חישוב ורעש.",
            "בחירת lowest level נמוך-מדי ששובר את הסטטיסטיקה.",
            "חוסר-תיאום בין מחזור-התכנון ללוח-ההחלטות העסקי.",
          ],
          troubleshootHe: [
            "תחזית רועשת מאוד ➔ גרנולריות נמוכה-מדי; שקול תכנון ברמה גבוהה יותר ו-disaggregation.",
            "ישיבת S&OP עם נתונים לא-עדכניים ➔ מחזור-התכנון לא מתואם עם לוח-הישיבות.",
          ],
          bestPracticeHe: [
            "התאם את מחזור-התכנון בדיוק ללוח-ה-S&OP החודשי.",
            "תכנן ברמה שיש בה אות, ופזר (disaggregate) ל-SKU לצורך-ביצוע.",
            "הקפא גרסה בכל מחזור (version) למדידת-דיוק עקבית.",
          ],
          interviewHe: [
            { qHe: "מה כוללת אסטרטגיית תכנון-ביקוש?", aHe: "אופק, bucket, גרנולריות (planning level), תדירות-מחזור ותפקידים — מסגרת-העבודה הכוללת." },
            { qHe: "מהי הסכנה בגרנולריות נמוכה-מדי?", aHe: "מעט היסטוריה לכל צומת שובר את המודלים הסטטיסטיים ויוצר תחזית רועשת ולא-יציבה." },
          ],
          takeawaysHe: [
            "אסטרטגיה = אופק + bucket + גרנולריות + מחזור + תפקידים.",
            "תכנן ברמה שיש בה אות, פזר ל-SKU.",
            "תאם את המחזור ללוח-ה-S&OP.",
          ],
        },
        {
          id: "3.1.3",
          titleHe: "תהליך תכנון הביקוש",
          titleEn: "Demand Planning Process",
          execHe:
            "תהליך-תכנון-הביקוש הוא רצף חוזר: טעינת-היסטוריה ← ניקוי/הכנת-נתונים ← הרצת-תחזית-סטטיסטית ← התאמות (שיווק/מכירות/מבצעים) ← איחוד-consensus ← אישור ונעילה ← מסירה ל-Supply ← מדידת-דיוק. כל מחזור מזין את הבא, וכך התחזית משתפרת לאורך-זמן.",
          beginnerHe:
            "התהליך הוא 'מתכון בשלבים' שחוזר על עצמו כל חודש: מביאים נתוני-עבר, מנקים אותם, נותנים למחשב לחזות, אנשים מתקנים, מאחדים למספר אחד, מאשרים, ומעבירים הלאה. בסוף בודקים כמה דייקנו — וכך לומדים לחזות טוב יותר בפעם הבאה.",
          consultantHe:
            "ב-IBP התהליך מאורגן סביב Application Jobs (chained jobs): preprocessing (outlier correction, realignment), Statistical Forecasting, snapshot, ו-disaggregation. ההתאמות נעשות ב-Excel add-in / Web UI על key figures ייעודיים (Marketing Uplift, Sales Override) שמתאחדים ב-key figure calculation ל-Consensus Demand. נעילה דרך version, ומדידה דרך snapshots (forecast vs actuals). אוטומציה מירבית מפחיתה touch-time ומשאירה לתכננים רק את החריגים (management by exception).",
          purposeHe:
            "להפוך את תכנון-הביקוש לתהליך מובנה, חוזר וניתן-למדידה, במקום מאמץ-אד-הוק חודשי.",
          processExampleHe:
            "יום 1: job-שרשרת מנקה outliers ומריץ Holt-Winters. ימים 2–4: שיווק ומכירות מתקנים ב-Excel. יום 5: ה-consensus מתאחד אוטומטית. יום 6: מנהל-הביקוש מאשר ונועל גרסה. יום 7: מסירה ל-Supply. בתחילת-המחזור-הבא: snapshot של דיוק מול actuals.",
          cbcHe:
            "ב-CBC: תהליך חודשי — preprocessing מנקה outlier של שיטפון-הזמנות חד-פעמי; Holt-Winters רץ לכל SKU; מנהלי-אזור מוסיפים uplift למבצעי-קיץ; consensus מתאחד; ננעל ונשלח לתכנון-קווי-המילוי; דיוק נמדד מול מכירות-בפועל.",
          navHe: [
            "SAP Fiori Launchpad ► Application Jobs ► Schedule (preprocessing → forecasting → snapshot)",
            "Excel ► SAP IBP ► עריכת Marketing Uplift / Sales Override ← Consensus Demand",
            "SAP Fiori Launchpad ► Manage Forecast Error (Forecast vs Actuals)",
          ],
          tables: ["Actuals Qty", "Statistical Forecast Qty", "Consensus Demand Qty", "Marketing Uplift"],
          tcodes: ["Application Jobs", "Statistical Forecasting", "Excel add-in", "Manage Forecast Error"],
          fiori: ["Application Jobs", "Manage Forecast Error", "Demand Planning"],
          configHe: [
            "chained Application Jobs: preprocessing → Statistical Forecasting → snapshot → disaggregation.",
            "key figures להתאמות: Marketing Uplift, Sales Override; key figure calculation ל-Consensus Demand.",
            "version לנעילת-מחזור ו-snapshots למדידת-דיוק.",
          ],
          flow: [
            { he: "טעינה + ניקוי", code: "preprocessing", note: "outlier/realignment" },
            { he: "תחזית סטטיסטית", code: "Statistical Forecasting" },
            { he: "התאמות אנושיות", code: "Excel add-in", note: "uplift/override" },
            { he: "איחוד", code: "Consensus Demand" },
            { he: "אישור + נעילה", code: "version" },
            { he: "מסירה + מדידה", code: "snapshot", note: "forecast vs actuals" },
          ],
          mistakesHe: [
            "הרצת-תחזית על נתונים שלא נוקו (outliers) — תחזית מוטה.",
            "התאמות-ידניות שלא מתועדות ב-key figure נפרד — אובדן-שקיפות מקור-השינוי.",
            "דילוג על snapshot — אין מדידת-דיוק במחזור הבא.",
          ],
          troubleshootHe: [
            "ה-consensus לא משקף התאמות ➔ key figure calculation לא כולל את ה-override; בדוק נוסחה.",
            "ה-chained job נכשל באמצע ➔ בדוק תלות בין ה-jobs ב-Application Jobs log.",
            "אין נתוני-דיוק ➔ snapshot לא רץ או לא נשמר לגרסת-המדידה.",
          ],
          bestPracticeHe: [
            "אוטומט את ה-preprocessing וה-forecasting ב-chained jobs; השאר לתכננים חריגים בלבד.",
            "תעד כל התאמה ב-key figure ייעודי (uplift/override) לשקיפות.",
            "צלם snapshot בכל מחזור — בלעדיו אין למידה.",
          ],
          interviewHe: [
            { qHe: "מהם שלבי תהליך תכנון-הביקוש?", aHe: "טעינה→ניקוי→תחזית-סטטיסטית→התאמות→איחוד→אישור/נעילה→מסירה→מדידת-דיוק; מחזורי." },
            { qHe: "מהו management by exception בהקשר זה?", aHe: "אוטומציה מטפלת ברוב-הפריטים; התכננים מתערבים רק בחריגים (שגיאת-דיוק/אירוע חריג)." },
          ],
          takeawaysHe: [
            "התהליך חוזר ומדיד — לא אד-הוק.",
            "אוטומט עם chained Application Jobs.",
            "snapshot בכל מחזור = למידה מתמשכת.",
          ],
        },
      ],
    },
    // ============================================================ 3.2
    {
      id: "3.2",
      titleHe: "קלט החיזוי באמצעות נתונים היסטוריים",
      titleEn: "Forecasting Input with Historical Data",
      execHe:
        "כל מודל-חיזוי טוב הוא רק כמו הנתונים שהוא מקבל. שלב זה עוסק בהכנת-ההיסטוריה: טעינת actuals מ-S/4HANA, ניקוי-חריגים (outlier correction), טיפול בחוסרים, ו-realignment (העברת-היסטוריה ממוצר/לקוח ישן לחדש). היסטוריה נקייה ומיושרת היא תנאי-הכרחי לתחזית מהימנה — 'garbage in, garbage out' תקף כאן במלוא-עוצמתו.",
      beginnerHe:
        "לפני שהמחשב מנבא, צריך לתת לו נתוני-עבר 'נקיים'. אם פעם-אחת הייתה הזמנה-ענקית חריגה (לקוח חדש שעשה מלאי-ראשוני), צריך 'לרכך' אותה כדי שהמחשב לא יחשוב שזה קורה כל-חודש. אם חסרים נתונים — משלימים. ואם מוצר-ישן הוחלף בחדש — מעבירים את ההיסטוריה אליו. ככה התחזית מבוססת על תמונה אמיתית.",
      consultantHe:
        "ב-IBP זמינים pre-processing steps כחלק מ-Statistical Forecasting: Outlier Correction (Variance Test / Inter-Quartile Range / Median methods), Missing Value handling, ו-Promotion Sales Lift removal (ניכוי-מבצעים מההיסטוריה לפני חיזוי-בסיס). Realignment / Copy operator מעביר actuals מ-source-attribute ל-target (Product transition). מומלץ לחשב baseline (cleansed history) ב-key figure נפרד (Cleansed Actuals), כך שהמקור (Actuals Qty) נשמר ללא-שינוי וניתן לביקורת. demand sensing נשען על short-term signals (open orders, deliveries) בנוסף להיסטוריה.",
      purposeHe:
        "לספק למודלים קלט נקי, רציף ומיושר, כדי שהדפוסים שהם לומדים (מגמה, עונתיות) ישקפו ביקוש-אמיתי ולא רעש או אירועים חד-פעמיים.",
      processExampleHe:
        "מערכת טוענת 36 חודשי-מכירות. ה-outlier correction מזהה חודש עם הזמנת-ענק חד-פעמית ומרכך אותו לערך-צפוי. חודש עם נתון-חסר מושלם באינטרפולציה. מבצע-עבר נוכה מההיסטוריה כדי שתחזית-הבסיס לא תכלול אותו. התוצאה: Cleansed Actuals מוכן לחיזוי.",
      cbcHe:
        "ב-CBC: הזמנת-מלאי-ראשוני ענקית של רשת-קמעונאות חדשה מזוהה כ-outlier ומרוככת; ביקוש-שיא של מבצע-קיץ קודם מנוכה מההיסטוריה לפני חישוב-בסיס; היסטוריית-מוצר שהוחלף (אריזה ישנה→חדשה) מועברת ב-realignment ל-SKU החדש.",
      navHe: [
        "SAP Fiori Launchpad ► Manage Forecast Models ► Preprocessing Steps (Outlier/Missing)",
        "Excel ► SAP IBP ► Statistical Forecasting ► Data Cleansing options",
        "SAP Fiori Launchpad ► Application Jobs ► Realignment / Copy Operator",
      ],
      tables: ["Actuals Qty", "Cleansed Actuals Qty", "Open Orders Qty", "Realignment"],
      tcodes: ["Manage Forecast Models", "Statistical Forecasting", "Application Jobs", "Excel add-in"],
      fiori: ["Manage Forecast Models", "Application Jobs"],
      configHe: [
        "Outlier Correction method: Variance Test / Inter-Quartile Range / Median + sigma factor.",
        "Missing Value handling (interpolation / zero) — טיפול בחוסרים בהיסטוריה.",
        "Promotion Sales Lift removal — ניכוי-מבצעים לפני חיזוי-בסיס.",
        "Realignment/Copy operator — העברת actuals מ-source ל-target attribute (Product transition).",
        "Cleansed Actuals כ-key figure נפרד — שמירת המקור Actuals Qty ללא-שינוי.",
      ],
      flow: [
        { he: "טעינת actuals", code: "CI-DS", note: "מ-S/4HANA" },
        { he: "תיקון outliers", code: "Outlier Correction" },
        { he: "השלמת חוסרים", code: "Missing Value" },
        { he: "ניכוי מבצעי-עבר", code: "Lift removal" },
        { he: "יישור היסטוריה", code: "Realignment", note: "מוצר/לקוח חדש" },
        { he: "Cleansed Actuals", code: "baseline", note: "מוכן לחיזוי" },
      ],
      masterDataHe: [
        "Actuals Qty = ההיסטוריה הגולמית (לא-נוגעים, ניתן-לביקורת).",
        "Cleansed Actuals Qty = ההיסטוריה לאחר ניקוי — הקלט בפועל לחיזוי.",
        "Open Orders / Deliveries = אותות קצרי-טווח ל-demand sensing.",
      ],
      mistakesHe: [
        "חיזוי על Actuals גולמי ללא ניקוי — outlier אחד מעוות עונה שלמה.",
        "מחיקת/דריסת המקור Actuals — אובדן יכולת-ביקורת ושחזור.",
        "אי-ניכוי מבצעי-עבר — תחזית-בסיס 'יורשת' שיאי-מבצע שלא יחזרו.",
        "אי-ביצוע realignment בהחלפת-מוצר — המוצר החדש מתחיל ללא היסטוריה.",
      ],
      troubleshootHe: [
        "תחזית מנופחת בעונה מסוימת ➔ outlier לא תוקן או מבצע-עבר לא נוכה.",
        "מוצר חדש בלי תחזית ➔ לא בוצע realignment מההיסטוריה של קודמו.",
        "פערים בין Actuals ל-Cleansed ➔ בדוק את שיטת ה-outlier ואת sigma factor.",
      ],
      bestPracticeHe: [
        "שמור תמיד Actuals גולמי לחוד ועבוד על Cleansed Actuals.",
        "כייל את שיטת ה-outlier (IQR/Median) ואת ה-sigma לפי תנודתיות-הקטגוריה.",
        "נכה מבצעי-עבר לפני חיזוי-בסיס, והוסף אותם בחזרה כ-uplift מתוכנן.",
        "בצע realignment כחלק מתהליך-החלפת-מוצר/לקוח, לא בדיעבד.",
      ],
      interviewHe: [
        { qHe: "מהו outlier correction ולמה הוא חשוב?", aHe: "זיהוי וריכוך ערכים-חריגים בהיסטוריה (IQR/Median/Variance) כדי שאירוע חד-פעמי לא יעוות את התחזית." },
        { qHe: "מהו realignment?", aHe: "העברת היסטוריית-מכירות מ-attribute מקור ל-יעד (למשל מוצר-ישן→חדש) כדי שלמוצר-החדש תהיה בסיס-חיזוי." },
        { qHe: "מדוע מנכים מבצעי-עבר מההיסטוריה?", aHe: "כדי שתחזית-הבסיס תשקף ביקוש-רגיל; המבצעים מתווספים בנפרד כ-uplift מתוכנן." },
      ],
      takeawaysHe: [
        "Garbage in, garbage out — הקלט קובע.",
        "נקה outliers, השלם חוסרים, נכה מבצעי-עבר.",
        "שמור Actuals גולמי; עבוד על Cleansed Actuals.",
        "realignment מעביר היסטוריה למוצר/לקוח חדש.",
      ],
      relatedHe: [
        { labelHe: "S&OP · יצירת תחזית סטטיסטית (3.3)", href: "/library/sop/chapter-03/#sub-3.3" },
        { labelHe: "S&OP · מודל וניווט IBP (פרק 2)", href: "/library/sop/chapter-02/" },
      ],
    },
    // ============================================================ 3.3
    {
      id: "3.3",
      titleHe: "יצירת תחזית באמצעות מידול סטטיסטי",
      titleEn: "Forecast Generation through Statistical Modeling",
      execHe:
        "ליבת תכנון-הביקושים: הפעלת מודלים סטטיסטיים על ההיסטוריה הנקייה כדי להפיק תחזית-בסיס אובייקטיבית. SAP IBP מספק ספריית-מודלים עשירה (Holt-Winters לעונתיות, Croston לביקוש-מקוטע, AR/ARIMA לאוטו-קורלציה ועוד) ויכולת Best-Fit הבוחרת אוטומטית את המודל המדויק-ביותר. זוהי הנקודה שבה IBP נותן ערך-מוסף מובהק על-פני גיליונות-Excel ידניים.",
      beginnerHe:
        "כאן המחשב 'לומד' מההיסטוריה ומפיק תחזית. יש כמה 'מתכונים' (מודלים): אחד טוב למוצרים עם עונתיות (קיץ/חורף), אחד למוצרים שנמכרים מדי-פעם, אחד למגמת-עלייה. IBP יכול אפילו לנסות את כולם ולבחור את הטוב-ביותר לבד (Best-Fit). אתה מגדיר מודל, מריץ — והתחזית מוכנה.",
      consultantHe:
        "ב-IBP ה-Statistical Forecasting operator מריץ forecast models המוגדרים ב-Manage Forecast Models. כל model הוא רצף-צעדים: preprocessing → forecasting algorithm → postprocessing. אלגוריתמים מרכזיים: Single/Double/Triple Exponential Smoothing (Holt / Holt-Winters), Croston ו-Croston-TSB ל-intermittent, Auto-Regressive (AR), ARIMA, Multiple Linear Regression (MLR) ו-Gradient Boosting של machine learning. Best-Fit/Automated Model Selection בוחר לפי error-measure (MAPE/MASE). הפרמטרים (alpha/beta/gamma, periods, history horizon) נקבעים אוטומטית (optimized) או ידנית. התוצאה נכתבת ל-Statistical Forecast Qty.",
      purposeHe:
        "להפיק תחזית-בסיס אובייקטיבית, חוזרת וניתנת-להסבר, שמשחררת את התכננים מחישוב-ידני ומאפשרת להם להתמקד בהוספת תובנה עסקית.",
      processExampleHe:
        "תכנן מגדיר forecast model עם Holt-Winters ו-Best-Fit; מריץ על 36 חודשי-Cleansed Actuals; IBP מאתר עונתיות שנתית, מכייל alpha/beta/gamma, ומפיק 18 חודשי-תחזית ל-Statistical Forecast Qty; ה-system מדווח MAPE לכל פריט.",
      cbcHe:
        "ב-CBC: למשקאות-דגל עם עונתיות-קיץ חדה רץ Holt-Winters; לטעמים-נישה שנמכרים לסירוגין רץ Croston; ה-Best-Fit בוחר אוטומטית בין המודלים לכל SKU; MAPE נמדד כדי לזהות פריטים שדורשים תכנון-ידני.",
      navHe: [
        "SAP Fiori Launchpad ► Demand Planning ► Manage Forecast Models ► Create Forecast Model",
        "SAP Fiori Launchpad ► Application Jobs ► Statistical Forecasting ► Schedule Run",
        "Excel ► SAP IBP ► Statistical Forecasting ► Run interactively",
      ],
      tables: ["Statistical Forecast Qty", "Cleansed Actuals Qty", "Forecast Error (MAPE)"],
      tcodes: ["Manage Forecast Models", "Statistical Forecasting", "Application Jobs", "Excel add-in"],
      fiori: ["Manage Forecast Models", "Application Jobs"],
      configHe: [
        "Forecast Model = preprocessing + algorithm + postprocessing steps.",
        "Algorithm: Holt-Winters / Croston / AR / ARIMA / MLR / Gradient Boosting.",
        "Best-Fit / Automated Model Selection לפי error measure (MAPE/MASE).",
        "history horizon + forecast horizon + buckets לעיבוד.",
      ],
      flow: [
        { he: "Cleansed Actuals", code: "input", note: "היסטוריה נקייה" },
        { he: "בחירת מודל", code: "Manage Forecast Models" },
        { he: "Best-Fit / כיול", code: "Auto Model Selection", note: "alpha/beta/gamma" },
        { he: "הרצה", code: "Statistical Forecasting" },
        { he: "תחזית-בסיס", code: "Statistical Forecast Qty" },
        { he: "מדידת-שגיאה", code: "MAPE/MASE" },
      ],
      mistakesHe: [
        "מודל-יחיד-לכל-הפריטים — Holt-Winters על intermittent מנפח תחזית.",
        "history horizon קצר-מדי לזיהוי עונתיות (פחות מ-2 מחזורים שלמים).",
        "התעלמות מ-error-measure — אין דרך לדעת איזה מודל ניצח.",
      ],
      troubleshootHe: [
        "תחזית עונתית שטוחה ➔ נבחר מודל לא-עונתי או היסטוריה < 2 שנים.",
        "MAPE גבוה מאוד ➔ Best-Fit על מרחב-מודלים לא-מתאים; הוסף Croston/MLR.",
        "ה-job נכשל ➔ פרמטרים לא-תקפים או חוסר-נתונים ב-Cleansed Actuals.",
      ],
      bestPracticeHe: [
        "הפעל Best-Fit על מרחב-מודלים מותאם-segment, לא על הכול.",
        "ודא history horizon ≥ 2 מחזורי-עונה לזיהוי עונתיות.",
        "עקוב אחר MAPE/MASE ונתב פריטים בעלי-שגיאה-גבוהה לתכנון-ידני.",
      ],
      interviewHe: [
        { qHe: "מהו Best-Fit ב-IBP?", aHe: "Automated Model Selection — IBP מריץ מספר מודלים ובוחר את בעל error-measure הנמוך-ביותר (MAPE/MASE) לכל פריט." },
        { qHe: "מהם השלבים בתוך forecast model?", aHe: "preprocessing (ניקוי) → forecasting algorithm → postprocessing — רצף-צעדים מוגדר ב-Manage Forecast Models." },
      ],
      takeawaysHe: [
        "מידול-סטטיסטי = ערך-הליבה של IBP מעל Excel.",
        "ספריית-מודלים: Holt-Winters/Croston/AR/ARIMA/MLR/GB.",
        "Best-Fit בוחר אוטומטית לפי MAPE/MASE.",
        "מדוד שגיאה ונתב חריגים לתכנון-ידני.",
      ],
      relatedHe: [
        { labelHe: "S&OP · קלט היסטורי (3.2)", href: "/library/sop/chapter-03/#sub-3.2" },
        { labelHe: "S&OP · תכנון מבוסס-מניעים (3.4)", href: "/library/sop/chapter-03/#sub-3.4" },
      ],
      children: [
        {
          id: "3.3.1",
          titleHe: "מודלים סטטיסטיים",
          titleEn: "Statistical Models",
          execHe:
            "סקירת ספריית-המודלים הסטטיסטיים ב-IBP ומתי להשתמש בכל אחד. Exponential Smoothing (כולל Holt-Winters) למגמה ועונתיות; Croston/Croston-TSB לביקוש-מקוטע (intermittent); AR/ARIMA לאוטו-קורלציה; MLR ו-Gradient Boosting למודלים מבוססי-מניעים. הבנת-החוזקות של כל מודל היא הבסיס לבחירה נכונה ולתחזית מדויקת.",
          beginnerHe:
            "כל מודל הוא 'כלי' שמתאים לסוג-נתונים מסוים. Holt-Winters טוב כשיש עונות (יותר בקיץ); Croston טוב כשנמכר מדי-פעם עם אפסים באמצע; AR טוב כשהחודש-הבא דומה לחודשים-קודמים. כמו ארגז-כלים — בוחרים את הכלי לפי העבודה.",
          consultantHe:
            "פירוט: (1) Simple/Constant — לביקוש-יציב ללא-מגמה; (2) Single Exponential Smoothing (alpha) — ביקוש-יציב עם רעש; (3) Double / Holt (alpha,beta) — מגמה; (4) Triple / Holt-Winters (alpha,beta,gamma) — מגמה+עונתיות (additive/multiplicative); (5) Croston ו-Croston-TSB — intermittent (מפריד בין גודל-ביקוש לתדירותו); (6) AR / ARIMA — אוטו-רגרסיה ל-time-series עם אוטו-קורלציה; (7) Multiple Linear Regression — driver-based; (8) Gradient Boosting (ML) — non-linear driver-based. Croston-TSB עדיף על Croston הקלאסי כי הוא מטפל ב-bias של פריטים-מתיישנים.",
          purposeHe:
            "להתאים מודל לאופי-הסדרה (מגמה/עונתיות/קיטוע/מניעים) כדי למקסם דיוק — אין מודל-אחד-טוב-לכול.",
          processExampleHe:
            "מוצר עם מגמת-עלייה ועונתיות → Holt-Winters multiplicative; מוצר שנמכר 3 פעמים ברבעון עם אפסים → Croston-TSB; מוצר תלוי-מחיר → MLR עם מחיר כ-driver.",
          cbcHe:
            "ב-CBC: משקה-דגל עונתי → Holt-Winters; טעם-נישה לסירוגין → Croston-TSB; מארז-מבצע → MLR/Gradient Boosting עם מחיר ומבצע כ-drivers.",
          navHe: [
            "SAP Fiori Launchpad ► Manage Forecast Models ► Add Algorithm Step (בחירת מודל)",
            "Excel ► SAP IBP ► Statistical Forecasting ► Algorithm parameters",
          ],
          tables: ["Statistical Forecast Qty", "Algorithm Parameters"],
          tcodes: ["Manage Forecast Models", "Statistical Forecasting"],
          fiori: ["Manage Forecast Models"],
          configHe: [
            "Exponential Smoothing: alpha (level), beta (trend), gamma (seasonality); additive/multiplicative.",
            "Croston / Croston-TSB: לביקוש-מקוטע; פרמטר-החלקה נפרד לגודל ולתדירות.",
            "AR / ARIMA: סדרי p,d,q לאוטו-קורלציה.",
            "MLR / Gradient Boosting: drivers + תקופת-אימון.",
          ],
          mistakesHe: [
            "Holt-Winters על ביקוש-מקוטע — מנפח תחזית; הנכון Croston.",
            "Croston על ביקוש-רציף-עונתי — מאבד את העונתיות.",
            "Triple smoothing ללא 2 מחזורי-עונה — gamma לא מתכייל.",
          ],
          troubleshootHe: [
            "תחזית 'קופצת' לפריט-נדיר ➔ univariate במקום Croston/Croston-TSB.",
            "עונתיות לא נלכדת ➔ Single/Double במקום Triple (Holt-Winters).",
            "bias למעלה בפריט-מתיישן ➔ עבור מ-Croston ל-Croston-TSB.",
          ],
          bestPracticeHe: [
            "מַפֶּה משפחת-מודלים לכל segment של ABC/XYZ.",
            "השתמש ב-Croston-TSB במקום Croston הקלאסי לפריטים-מקוטעים.",
            "ל-driver-based העדף MLR לפרשנות, Gradient Boosting ל-non-linear.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-Holt-Winters?", aHe: "כשהסדרה מציגה גם מגמה וגם עונתיות; שלושת הפרמטרים alpha/beta/gamma לומדים level/trend/season." },
            { qHe: "מתי Croston מתאים?", aHe: "לביקוש-מקוטע (intermittent) עם אפסים רבים; הוא מפריד בין גודל-הביקוש לבין תדירותו." },
            { qHe: "במה Croston-TSB עדיף על Croston?", aHe: "הוא מתקן את ה-bias כלפי-מעלה לפריטים שביקושם דועך/מתיישן." },
          ],
          takeawaysHe: [
            "ארגז-כלים: Smoothing/Holt-Winters/Croston/AR/ARIMA/MLR/GB.",
            "מגמה+עונתיות → Holt-Winters; מקוטע → Croston-TSB.",
            "driver-based → MLR / Gradient Boosting.",
          ],
        },
        {
          id: "3.3.2",
          titleHe: "הגדרה והרצה של מודלי חיזוי",
          titleEn: "Configuring and Executing Forecasting Models",
          execHe:
            "ההיבט המעשי: כיצד מגדירים forecast model ב-Manage Forecast Models, מצמידים אותו ל-key figures, וכיצד מריצים אותו — אינטראקטיבית ב-Excel או מתוזמן דרך Application Jobs. הגדרה נכונה (history/forecast horizon, assignment, error-measure) ותזמון-אמין הם ההבדל בין תחזית שמתחדשת לבדה לבין תהליך-ידני שביר.",
          beginnerHe:
            "כאן 'בונים את המכונה ומדליקים אותה'. במסך Manage Forecast Models מגדירים מה המודל יעשה, על אילו נתונים, ולכמה זמן קדימה. אחר-כך אפשר ללחוץ 'הרץ' ב-Excel ולראות תוצאה מיד, או לתזמן את ההרצה שתקרה אוטומטית כל לילה דרך Application Jobs.",
          consultantHe:
            "ב-Manage Forecast Models מגדירים: input/output key figures (Cleansed Actuals → Statistical Forecast Qty), preprocessing/algorithm/postprocessing steps, history & forecast periods, ו-forecast error key figure. ההרצה: (1) interactive מתוך ה-Excel add-in (Statistical Forecasting button) לבדיקה; (2) batch דרך Application Jobs (Statistical Forecasting job template) עם scheduling וכבילה (chaining) ל-preprocessing ו-snapshot. הקצאת-המודל יכולה להיות גלובלית או per-segment דרך attribute selection. תמיד לבדוק את ה-application log לאחר הרצה.",
          purposeHe:
            "להפוך את החיזוי לתהליך מוגדר, חוזר ומתוזמן, עם שקיפות מלאה (logs) ויכולת-מדידה (forecast error key figure).",
          processExampleHe:
            "תכנן יוצר model 'Beverages-HW' עם Holt-Winters, input=Cleansed Actuals, output=Statistical Forecast Qty, history=36m, forecast=18m. בודק interactively ב-Excel על SKU-מדגם, ואז מתזמן Application Job לילי שמריץ preprocessing→forecasting→snapshot לכל הפורטפוליו.",
          cbcHe:
            "ב-CBC: model נפרד לכל segment — 'HW-Seasonal' למשקאות-דגל, 'TSB-Intermittent' לטעמי-נישה; ה-Application Job רץ לילית לפני ישיבת-הביקוש, וה-log נבדק בבוקר לפני שחרור-התחזית לתכננים.",
          navHe: [
            "SAP Fiori Launchpad ► Demand Planning ► Manage Forecast Models ► Create / Edit / Assign",
            "Excel ► SAP IBP ► Statistical Forecasting ► Run (interactive)",
            "SAP Fiori Launchpad ► Application Jobs ► Statistical Forecasting ► Schedule + Log",
          ],
          tables: ["Cleansed Actuals Qty", "Statistical Forecast Qty", "Forecast Error (MAPE)", "Application Log"],
          tcodes: ["Manage Forecast Models", "Statistical Forecasting", "Application Jobs", "Excel add-in"],
          fiori: ["Manage Forecast Models", "Application Jobs"],
          configHe: [
            "input/output key figures: Cleansed Actuals → Statistical Forecast Qty.",
            "steps: preprocessing + algorithm + postprocessing; history & forecast periods.",
            "forecast error key figure (MAPE/MASE) לכתיבת-תוצאת-הדיוק.",
            "assignment גלובלי או per-segment דרך attribute selection.",
            "execution: interactive (Excel) או batch (Application Jobs) עם chaining.",
          ],
          flow: [
            { he: "הגדרת model", code: "Manage Forecast Models" },
            { he: "הצמדת key figures", code: "input/output" },
            { he: "בדיקה interactive", code: "Excel add-in" },
            { he: "תזמון batch", code: "Application Jobs", note: "chaining" },
            { he: "בדיקת log + דיוק", code: "Application Log", note: "MAPE" },
          ],
          mistakesHe: [
            "הרצה ידנית-בלבד מ-Excel ללא תזמון — תהליך שביר ולא-חוזר.",
            "input key figure שגוי (Actuals גולמי במקום Cleansed) — חיזוי על רעש.",
            "חוסר-בדיקת application log — כשלים שקטים עוברים מתחת-לרדאר.",
          ],
          troubleshootHe: [
            "אין תחזית לפריטים מסוימים ➔ assignment של ה-model לא מכסה את ה-segment.",
            "ה-job 'הצליח' אך התחזית ריקה ➔ input key figure ריק או periods לא-תקפים.",
            "תוצאת-Excel שונה מ-batch ➔ גרסה/selection שונים בין ההרצות.",
          ],
          bestPracticeHe: [
            "בדוק interactively על מדגם, ואז עבור ל-batch מתוזמן עם chaining.",
            "כבול preprocessing→forecasting→snapshot ב-Application Job יחיד.",
            "בדוק תמיד את ה-application log אחרי כל הרצה.",
          ],
          interviewHe: [
            { qHe: "כיצד מריצים תחזית ב-IBP?", aHe: "interactive מ-Excel add-in לבדיקה, או batch מתוזמן דרך Application Jobs (Statistical Forecasting) עם chaining ל-preprocessing ו-snapshot." },
            { qHe: "מה מגדירים ב-Manage Forecast Models?", aHe: "input/output key figures, preprocessing/algorithm/postprocessing steps, history/forecast horizons, error-measure ו-assignment." },
          ],
          takeawaysHe: [
            "Manage Forecast Models = הגדרת המודל וההצמדה.",
            "הרצה: interactive (Excel) או batch (Application Jobs).",
            "כבול את הצעדים ובדוק log בכל הרצה.",
          ],
        },
      ],
    },
    // ============================================================ 3.4
    {
      id: "3.4",
      titleHe: "תכנון מבוסס-מניעים (Driver-Based Planning)",
      titleEn: "Driver-Based Planning",
      execHe:
        "תכנון-מבוסס-מניעים חוזה ביקוש לא רק מהעבר אלא מתוך גורמים-מסבירים (drivers): מחיר, מבצעים, מזג-אוויר, אירועי-שוק, תקציב-פרסום. ב-IBP זה ממומש דרך Multiple Linear Regression ו-Gradient Boosting, וכן דרך key figure calculations מבוססות-מניעים. גישה זו מצטיינת היכן שמניעים חיצוניים שולטים בביקוש — בדיוק שם שבו חיזוי-מבוסס-היסטוריה נכשל.",
      beginnerHe:
        "במקום לחזות רק לפי 'מה היה', תכנון-מבוסס-מניעים שואל 'מה משפיע?'. אם הורדת-מחיר מעלה מכירות, או מבצע 1+1 מקפיץ ביקוש, או חום מעלה צריכת-משקאות — אלה ה'מניעים'. המודל לומד את הקשר בין המניעים למכירות, וכשאתה משנה מניע (מתכנן מבצע), התחזית מגיבה.",
      consultantHe:
        "ב-IBP, driver-based planning מתבצע בשני אופנים: (1) statistical — MLR/Gradient Boosting ב-Statistical Forecasting, עם ה-drivers כ-key figures-קלט נוספים מעבר להיסטוריה; (2) deterministic — key figure calculations המגדירות נוסחה מפורשת (לדוגמה Demand = Base × Price-Elasticity × Promo-Factor). ה-drivers נטענים כ-key figures (Price, Promotion Flag, Marketing Spend, Temperature) ברמת-התכנון המתאימה. חשוב להבחין בין causal forecasting (לומד מקדמים) לבין planning-driver formulas (מקדמים נתונים). יש לוודא היסטוריה מספקת ל-drivers, ולהיזהר מ-multicollinearity ב-MLR.",
      purposeHe:
        "לחזות ביקוש שמושפע-בעיקר ממניעים-ניתנים-לתכנון (מחיר/מבצע) ולאפשר what-if: 'מה יקרה לביקוש אם נעשה מבצע?'.",
      processExampleHe:
        "צוות-שיווק מתכנן הורדת-מחיר 10% למוצר. מודל ה-MLR (שלמד price-elasticity מההיסטוריה) מתרגם זאת ל-uplift של 18% בביקוש. התחזית מתעדכנת אוטומטית, ותכנון-האספקה מקבל את הכמות-המוגדלת.",
      cbcHe:
        "ב-CBC: drivers = מחיר-מדף, דגל-מבצע (1+1/מחיר-מבצע), טמפרטורה-עונתית, חגים. Gradient Boosting לומד את הקשר הלא-לינארי בין חום-קיצוני למכירות-משקאות; תכנון-מבצע-קמעונאות מתורגם אוטומטית ל-uplift בתחזית.",
      navHe: [
        "SAP Fiori Launchpad ► Manage Forecast Models ► Add MLR / Gradient Boosting Step + assign drivers",
        "SAP Fiori Launchpad ► Configuration ► Key Figures ► driver key figures + calculations",
        "Excel ► SAP IBP ► עריכת drivers (Price/Promotion/Spend) ← תחזית מגיבה",
      ],
      tables: ["Price", "Promotion Flag", "Marketing Spend", "Statistical Forecast Qty"],
      tcodes: ["Manage Forecast Models", "Configuration", "Statistical Forecasting", "Excel add-in"],
      fiori: ["Manage Forecast Models", "Configuration"],
      configHe: [
        "drivers כ-key figures-קלט: Price, Promotion Flag, Marketing Spend, Temperature.",
        "statistical: MLR / Gradient Boosting step עם driver assignment.",
        "deterministic: key figure calculation מפורשת (Base × elasticity × promo-factor).",
        "training period + driver history — לכיול-מקדמים אמין.",
      ],
      flow: [
        { he: "טעינת drivers", code: "key figures", note: "Price/Promo/Spend" },
        { he: "אימון מודל", code: "MLR / GB", note: "לומד מקדמים" },
        { he: "תכנון מניע", code: "what-if", note: "שינוי מחיר/מבצע" },
        { he: "תחזית מגיבה", code: "Statistical Forecast Qty" },
      ],
      masterDataHe: [
        "Price / Promotion Flag / Marketing Spend / Temperature = driver key figures.",
        "Statistical Forecast Qty = פלט; Consensus Demand מאחד עם uplift-מתוכנן.",
      ],
      mistakesHe: [
        "drivers ללא היסטוריה מספקת — מקדמים לא-אמינים ורעש.",
        "multicollinearity ב-MLR (drivers מתואמים-זה-לזה) — מקדמים מטעים.",
        "ערבוב causal forecasting עם planning-driver formula בלי הבחנה ברורה.",
      ],
      troubleshootHe: [
        "התחזית לא מגיבה לשינוי-מחיר ➔ ה-driver לא מוקצה למודל או חסר היסטוריה.",
        "מקדם price-elasticity לא-הגיוני ➔ multicollinearity או training period קצר.",
        "uplift כפול ➔ גם המודל למד מבצע וגם נוסף uplift ידני לאותו אירוע.",
      ],
      bestPracticeHe: [
        "ודא היסטוריית-drivers ארוכה ואיכותית לפני causal forecasting.",
        "בדוק multicollinearity ובחר drivers בלתי-תלויים.",
        "הבחן בבירור בין מבצע-שנלמד-מהמודל לבין uplift-מתוכנן-ידנית כדי למנוע כפל.",
        "השתמש ב-driver-based ל-what-if של מחיר/מבצע מול תכנון-האספקה.",
      ],
      interviewHe: [
        { qHe: "מהו driver-based planning?", aHe: "חיזוי ביקוש מתוך גורמים-מסבירים (מחיר/מבצע/מזג-אוויר) באמצעות MLR/Gradient Boosting או נוסחאות-מפורשות, במקום מהיסטוריה בלבד." },
        { qHe: "מתי הוא עדיף על סטטיסטי-טהור?", aHe: "כשמניעים-חיצוניים ניתנים-לתכנון שולטים בביקוש, ובמיוחד ל-what-if של החלטות-מחיר/מבצע." },
        { qHe: "מהי סכנת ה-multicollinearity?", aHe: "כש-drivers מתואמים זה-לזה ב-MLR, המקדמים נעשים לא-יציבים ומטעים." },
      ],
      takeawaysHe: [
        "מנבא לפי 'מה משפיע', לא רק 'מה היה'.",
        "MLR / Gradient Boosting + driver key figures.",
        "מצטיין ב-what-if של מחיר ומבצעים.",
        "היזהר ממקדמים לא-אמינים ומ-multicollinearity.",
      ],
      relatedHe: [
        { labelHe: "S&OP · יצירת תחזית סטטיסטית (3.3)", href: "/library/sop/chapter-03/#sub-3.3" },
        { labelHe: "S&OP · מודל פיננסי משתף (3.5)", href: "/library/sop/chapter-03/#sub-3.5" },
      ],
    },
    // ============================================================ 3.5
    {
      id: "3.5",
      titleHe: "מידול פיננסי משתף של תחזית הביקוש",
      titleEn: "Collaborative Financial Modeling of Demand Forecast",
      execHe:
        "תחזית-ביקוש ביחידות (cases/liters) הופכת בעלת-ערך-מנהלי כשהיא מתורגמת לכסף: הכנסות, עלות-מכר, ורווח. מידול-פיננסי-משתף ב-IBP מחבר את התחזית התפעולית למודל-פיננסי — דוח רווח-והפסד (Income Statement) ויחסים-פיננסיים — כך שמכירות, תפעול וכספים מתכננים על אותו מודל. זהו הגשר בין ה-S&OP התפעולי ל-IBP (Integrated Business Planning) במובן המלא: תכנון תפעולי ופיננסי מאוחד.",
      beginnerHe:
        "תחזית של 'מיליון בקבוקים' לא אומרת הרבה למנכ\"ל; 'הכנסות של 5 מיליון ש\"ח ורווח של 800 אלף' — כן. מידול-פיננסי לוקח את תחזית-הכמויות, מכפיל במחירים ועלויות, ומראה את התמונה הכספית. כך כולם — מכירות, תפעול וכספים — מדברים באותה שפה ומתכננים יחד על אותו מודל.",
      consultantHe:
        "ב-IBP זה ממומש דרך key figures פיננסיים ו-key figure calculations מעל מודל-הביקוש: Revenue = Consensus Demand × Price; COGS = Demand × Unit Cost; Gross Margin = Revenue − COGS. ניתן לבנות שכבות נוספות (operating expenses, contribution margin) ל-Income Statement מלא, ולחשב יחסים (gross margin %, ROS). הכל באותו planning area, בגרנולריות מתאימה (Product/Customer/Time), עם versions/scenarios להשוואת-תרחישים. האינטגרציה עם FP&A/financial systems נעשית דרך CI-DS. היתרון: financial sign-off הופך לחלק מ-S&OP, לא לתהליך נפרד.",
      purposeHe:
        "לחבר את התכנון-התפעולי לתכנון-הפיננסי במודל-אחד, כך שהחלטות-ביקוש נבחנות מיד דרך השפעתן על הכנסות ורווח, ובעלי-העניין מכל הפונקציות מתכננים יחד.",
      processExampleHe:
        "Consensus Demand של 1M יח' מוכפל במחיר-ממוצע ל-Revenue; מוכפל ב-unit cost ל-COGS; Gross Margin מחושב אוטומטית. בישיבת-S&OP בוחנים תרחיש-מבצע: התחזית עולה אך ה-margin% יורד — וההחלטה מתקבלת על-בסיס הרווח, לא הנפח.",
      cbcHe:
        "ב-CBC: תחזית-משקאות (cases) → Revenue לפי מחיר-לפי-ערוץ; COGS לפי עלות-תרכיז+אריזה+מילוי; Gross Margin לכל מותג. מבצע-קיץ מגדיל נפח אך לוחץ margin — הנהלת-האזור מחליטה על-בסיס תרומה-לרווח, לא רק נפח-מכירות.",
      navHe: [
        "SAP Fiori Launchpad ► Configuration ► Key Figures ► Revenue / COGS / Gross Margin calculations",
        "Excel ► SAP IBP ► Planning View עם Demand + Revenue + Margin",
        "SAP Fiori Launchpad ► Dashboards ► Financial S&OP view",
      ],
      tables: ["Consensus Demand Qty", "Revenue", "COGS", "Gross Margin", "Price", "Unit Cost"],
      tcodes: ["Configuration", "Manage Planning Area", "Excel add-in", "Dashboards"],
      fiori: ["Configuration", "Dashboards"],
      configHe: [
        "key figures פיננסיים: Revenue, COGS, Gross Margin, Operating Expense.",
        "key figure calculations: Revenue = Demand × Price; COGS = Demand × Unit Cost; Margin = Revenue − COGS.",
        "Price / Unit Cost כ-master/key figures בגרנולריות מתאימה.",
        "versions/scenarios להשוואת-תרחישים פיננסיים.",
      ],
      flow: [
        { he: "Consensus Demand (יח')", code: "input" },
        { he: "× מחיר", code: "Revenue" },
        { he: "× עלות-יחידה", code: "COGS" },
        { he: "Revenue − COGS", code: "Gross Margin" },
        { he: "תרחישים", code: "scenarios", note: "השוואה פיננסית" },
      ],
      masterDataHe: [
        "Price / Unit Cost = ה-key figures הפיננסיים המכפילים את הכמות.",
        "Revenue / COGS / Gross Margin = פלטי-החישוב.",
        "Consensus Demand Qty = הגשר מהתפעולי לפיננסי.",
      ],
      mistakesHe: [
        "תכנון פיננסי בגרנולריות שלא תואמת את גרנולריות-הביקוש — אי-התאמות-איחוד.",
        "מחיר/עלות לא-מעודכנים — Revenue/COGS שגויים אך 'נראים אמינים'.",
        "בחינת-מבצע לפי נפח-בלבד בלי לבדוק את ה-margin.",
      ],
      troubleshootHe: [
        "Revenue לא תואם תחזית ➔ Price ב-key figure ריק/לא-מעודכן או גרנולריות שונה.",
        "Gross Margin שלילי לא-צפוי ➔ Unit Cost שגוי או מטבע/יחידות לא-תואמים.",
        "תרחישים לא נשמרים ➔ version/scenario לא הוגדר נכון.",
      ],
      bestPracticeHe: [
        "תחזק Price/Unit Cost כ-key figures מעודכנים ומבוקרים.",
        "תכנן פיננסית באותה גרנולריות (או באיחוד-נקי) של הביקוש.",
        "בחן כל תרחיש-מבצע גם דרך margin ולא רק דרך נפח.",
        "השתמש ב-versions/scenarios להשוואת-תרחישים בישיבת-S&OP.",
      ],
      interviewHe: [
        { qHe: "מדוע ממדלים את תחזית-הביקוש פיננסית?", aHe: "כדי לתרגם כמויות לכסף (Revenue/COGS/Margin), לקבל החלטות מבוססות-רווח, ולאחד תכנון תפעולי ופיננסי במודל-אחד." },
        { qHe: "כיצד מחושב Gross Margin ב-IBP?", aHe: "דרך key figure calculations: Revenue = Demand × Price, COGS = Demand × Unit Cost, Gross Margin = Revenue − COGS." },
      ],
      takeawaysHe: [
        "מתרגם כמויות לכסף — הגשר ל-IBP מלא.",
        "Revenue/COGS/Gross Margin דרך key figure calculations.",
        "מאחד מכירות+תפעול+כספים על מודל-אחד.",
        "החלטות לפי רווח, לא רק נפח.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תכנון מבוסס-מניעים (3.4)", href: "/library/sop/chapter-03/#sub-3.4" },
        { labelHe: "S&OP · סקירה ואיחוד התוכנית (3.6)", href: "/library/sop/chapter-03/#sub-3.6" },
      ],
      children: [
        {
          id: "3.5.1",
          titleHe: "מודל פיננסי של דוח רווח-והפסד ב-SAP IBP",
          titleEn: "Income Statement Financial Model in SAP IBP",
          execHe:
            "בניית דוח רווח-והפסד (Income Statement) מתוך תחזית-הביקוש: שכבות Revenue ← COGS ← Gross Margin ← Operating Expenses ← Operating Profit, כולן כ-key figures מחושבים מעל הביקוש. כך ישיבת-S&OP רואה לא רק כמויות אלא P&L-מתוכנן מלא, בזמן-אמת, לכל תרחיש.",
          beginnerHe:
            "דוח רווח-והפסד הוא 'הסיכום הכספי': כמה הכנסנו (Revenue), כמה עלה לייצר (COGS), כמה נשאר (Gross Margin), כמה הוצאנו על תפעול, וכמה רווח בסוף. כאן בונים אותו ב-IBP ישירות מתחזית-הכמויות — כך שכל שינוי-תחזית מעדכן את ה-P&L מיד.",
          consultantHe:
            "ב-IBP בונים שרשרת key figure calculations: Net Revenue = Σ(Demand × Net Price); COGS = Σ(Demand × Unit Cost); Gross Margin = Net Revenue − COGS; Operating Profit = Gross Margin − Operating Expenses. אפשר להוסיף discounts/rebates, freight, ו-overheads כ-key figures. הגרנולריות צריכה לתמוך באיחוד נקי ל-P&L (Product→Family→Total). versions/scenarios מאפשרים P&L-מתוכנן מול baseline. אינטגרציה ל-FP&A דרך CI-DS מאפשרת השוואה מול תקציב.",
          purposeHe:
            "לתת להנהלה תמונת-רווחיות-מלאה מתוכננת הנגזרת ישירות מהביקוש, ככלי-החלטה מרכזי בישיבת-S&OP.",
          processExampleHe:
            "תחזית מעודכנת מקפיצה Net Revenue ב-3%; COGS עולה ב-2.5%; ה-Operating Profit במודל עולה ב-5% — וההנהלה מאשרת את תוכנית-הביקוש על-בסיס שיפור-הרווח.",
          cbcHe:
            "ב-CBC: P&L לכל מותג — Net Revenue (אחרי הנחות-סחר), COGS (תרכיז+אריזה+מילוי+הפצה), Gross Margin, ו-Operating Profit אחרי שיווק. מבצע-קיץ נבחן דרך השפעתו על Operating Profit של המותג.",
          navHe: [
            "SAP Fiori Launchpad ► Configuration ► Key Figures ► Income Statement calculations",
            "Excel ► SAP IBP ► Planning View ► P&L layout (Revenue→COGS→Margin→Profit)",
            "SAP Fiori Launchpad ► Dashboards ► Planned P&L",
          ],
          tables: ["Net Revenue", "COGS", "Gross Margin", "Operating Expense", "Operating Profit"],
          tcodes: ["Configuration", "Excel add-in", "Dashboards"],
          fiori: ["Configuration", "Dashboards"],
          configHe: [
            "שרשרת key figure calculations: Net Revenue → COGS → Gross Margin → Operating Profit.",
            "key figures לרכיבים: Net Price, Unit Cost, Discounts/Rebates, Operating Expense.",
            "גרנולריות תומכת-איחוד ל-P&L (Product→Family→Total).",
            "versions/scenarios ל-P&L-מתוכנן מול baseline/budget.",
          ],
          flow: [
            { he: "Demand × Net Price", code: "Net Revenue" },
            { he: "Demand × Unit Cost", code: "COGS" },
            { he: "Revenue − COGS", code: "Gross Margin" },
            { he: "− Operating Expenses", code: "Operating Profit" },
          ],
          mistakesHe: [
            "דילוג על discounts/rebates — Net Revenue מנופח.",
            "גרנולריות שלא מתאחדת נקי ל-P&L — סכומים שגויים.",
            "P&L ללא version-baseline — אין מול-מה להשוות.",
          ],
          troubleshootHe: [
            "Operating Profit לא מתעדכן ➔ שרשרת ה-key figure calculation שבורה בשלב מסוים.",
            "Net Revenue גבוה-מדי ➔ הנחות-סחר לא נוכו.",
            "סכומי-P&L לא מסתדרים ➔ גרנולריות/יחידות/מטבע לא-עקביים.",
          ],
          bestPracticeHe: [
            "בנה את ה-P&L כשרשרת-שכבות מפורשת וניתנת-לבדיקה.",
            "כלול discounts/rebates ו-overheads לקבלת Net Revenue ו-profit מציאותיים.",
            "השווה תמיד P&L-מתוכנן מול baseline/budget דרך versions.",
          ],
          interviewHe: [
            { qHe: "כיצד בונים Income Statement ב-IBP?", aHe: "שרשרת key figure calculations מעל הביקוש: Net Revenue→COGS→Gross Margin→Operating Profit, כולן בגרנולריות תומכת-איחוד." },
            { qHe: "מדוע לכלול discounts/rebates?", aHe: "כדי שה-Net Revenue ישקף הכנסה-אמיתית ולא מחיר-מחירון מנופח." },
          ],
          takeawaysHe: [
            "P&L-מתוכנן נגזר ישירות מהביקוש.",
            "שרשרת: Net Revenue→COGS→Margin→Operating Profit.",
            "כלול הנחות/overheads והשווה מול baseline.",
          ],
        },
        {
          id: "3.5.2",
          titleHe: "יחסים פיננסיים ואנליטיקה ב-SAP IBP",
          titleEn: "Financial Ratios and Analytics in SAP IBP",
          execHe:
            "מעבר ל-P&L המוחלט, IBP מחשב יחסים-פיננסיים (gross margin %, return on sales, contribution margin %) ומציג אותם ב-dashboards ו-analytics. יחסים אלה הופכים מספרים-גולמיים לתובנות-החלטה: לא 'כמה רווח' אלא 'כמה רווחי', ומאפשרים השוואה בין מוצרים, ערוצים ותרחישים על בסיס-אחיד.",
          beginnerHe:
            "יחס-פיננסי הוא 'אחוז' שמספר סיפור: אם הרווח-הגולמי הוא 30% מההכנסות, זה אומר על כל שקל-מכירה נשארים 30 אגורות. יחסים מאפשרים להשוות מוצר-יקר-ורווחי למוצר-זול-ופחות-רווחי על בסיס הוגן, ולראות מיד אם תרחיש מסוים פוגע ברווחיות.",
          consultantHe:
            "ב-IBP מחושבים ratios כ-key figure calculations: Gross Margin % = Gross Margin / Net Revenue; ROS = Operating Profit / Net Revenue; Contribution Margin % = (Revenue − Variable Cost) / Revenue. אלה מוצגים ב-Analytics (Advanced/Custom charts) וב-Dashboards של ה-Web UI, ולעיתים ב-Excel add-in. חשוב: יחסים אינם מתאחדים אדיטיבית — יש לחשבם ברמת-האיחוד מהמונים והמכנים, לא לסכם אחוזים. alerts/Case Management יכולים לסמן יחס שחורג מסף.",
          purposeHe:
            "להפוך נתונים-פיננסיים-מוחלטים ליחסים-מנהליים בני-השוואה, ולספק לישיבת-S&OP תובנות-רווחיות מיידיות וניתנות-להשוואה.",
          processExampleHe:
            "Dashboard מציג Gross Margin % לכל קטגוריה; תרחיש-מבצע מראה נפח +12% אך Gross Margin % יורד מ-32% ל-27%; ההנהלה מחליטה למקד את המבצע במוצרים בעלי-margin-גבוה בלבד.",
          cbcHe:
            "ב-CBC: dashboard של Gross Margin % ו-ROS לכל מותג-וערוץ; מבצע-קמעונאות שמקפיץ נפח אך שוחק margin% מתחת לסף מפעיל alert; ההחלטה מתקבלת לפי contribution לרווח, לא לפי נפח.",
          navHe: [
            "SAP Fiori Launchpad ► Analytics ► Create Chart (Gross Margin % / ROS)",
            "SAP Fiori Launchpad ► Dashboards ► Financial Ratios dashboard",
            "SAP Fiori Launchpad ► Manage Cases / Alerts ► ratio threshold alerts",
          ],
          tables: ["Gross Margin %", "Return on Sales", "Contribution Margin %", "Operating Profit"],
          tcodes: ["Analytics", "Dashboards", "Manage Cases", "Excel add-in"],
          fiori: ["Analytics", "Dashboards", "Manage Cases"],
          configHe: [
            "ratio key figure calculations: Gross Margin % = Gross Margin / Net Revenue; ROS = Operating Profit / Net Revenue.",
            "חישוב ברמת-איחוד מהמונה/מכנה (לא סכימת-אחוזים).",
            "Analytics/Dashboards להצגה; Alerts/Case Management לסף-יחס.",
          ],
          flow: [
            { he: "Gross Margin / Net Revenue", code: "Gross Margin %" },
            { he: "Operating Profit / Net Revenue", code: "ROS" },
            { he: "הצגה", code: "Dashboards/Analytics" },
            { he: "חריגה מסף", code: "Alert", note: "Case Management" },
          ],
          mistakesHe: [
            "סכימת-אחוזים בין רמות במקום חישוב-מחדש מהמונה/מכנה — יחס שגוי.",
            "השוואת מוצרים לפי רווח-מוחלט במקום לפי margin% — מסקנה מטעה.",
            "dashboard ללא alerts — חריגות-רווחיות נעלמות.",
          ],
          troubleshootHe: [
            "Gross Margin % לא-הגיוני באיחוד ➔ חושב כסכימת-אחוזים במקום מהמונה/מכנה.",
            "Alert לא נורה ➔ סף ה-ratio או ה-Case לא הוגדרו.",
            "ratio ריק ➔ מכנה (Net Revenue) אפס/ריק בצומת.",
          ],
          bestPracticeHe: [
            "חשב יחסים ברמת-האיחוד מהמונה/מכנה, לעולם לא כסכימת-אחוזים.",
            "הצג יחסים-מרכזיים ב-dashboard קבוע לישיבת-S&OP.",
            "הגדר alerts על ספי-רווחיות לזיהוי-חריגות אוטומטי.",
          ],
          interviewHe: [
            { qHe: "מדוע אסור לסכם אחוזי-margin בין רמות?", aHe: "יחס אינו אדיטיבי; יש לחשבו מחדש ברמת-האיחוד מסך-המונה חלקי סך-המכנה." },
            { qHe: "אילו יחסים נפוצים ב-IBP?", aHe: "Gross Margin %, Return on Sales (ROS), ו-Contribution Margin % — כ-key figure calculations המוצגים ב-Analytics/Dashboards." },
          ],
          takeawaysHe: [
            "יחסים הופכים מספרים לתובנות בנות-השוואה.",
            "חשב מהמונה/מכנה ברמת-איחוד, לא סכימת-אחוזים.",
            "Dashboards + Alerts לרווחיות בזמן-אמת.",
          ],
        },
      ],
    },
    // ============================================================ 3.6
    {
      id: "3.6",
      titleHe: "סקירה, שיתוף-פעולה ואיחוד תוכנית הביקוש",
      titleEn: "Review, Collaboration, and Finalization of the Demand Plan",
      execHe:
        "השלב הסוגר: הפיכת תחזית-הבסיס הסטטיסטית והפיננסית לתוכנית-ביקוש מאוחדת ומאושרת. כאן בעלי-העניין (מכירות, שיווק, כספים, תפעול) סוקרים, מתעדים-הנחות, מתקנים בשיתוף-פעולה, ומגיעים ל-consensus demand נעול שמועבר ל-Supply. כלי IBP — Excel add-in, Web UI, Case Management, ו-versions — הם תשתית-השיתוף.",
      beginnerHe:
        "אחרי שהמחשב חזה והכספים תרגמו לכסף, מגיעים בני-אדם ומסכמים: צוות-המכירות, השיווק והתפעול יושבים יחד (פיזית או דרך IBP), בודקים את התחזית, מוסיפים מה שהם יודעים שהמחשב לא יודע (חוזה-ענק חדש, השקה), ומסכימים על מספר-אחד-סופי. את המספר הזה 'נועלים' ומעבירים הלאה לייצור/אספקה.",
      consultantHe:
        "ה-finalization נשען על: (1) collaborative editing ב-Excel add-in / Web UI על Consensus Demand, עם override key figures שקופים; (2) Case Management / collaboration לתיעוד-הנחות, החלטות ופעולות; (3) versions/scenarios להקפאת-תוכנית מאושרת ולהשוואת-תרחישים; (4) approval workflow (לעיתים דרך process management / IBP for S&OP process); (5) handover ל-Supply דרך key figure copy. snapshot של ה-consensus הסופי נשמר למדידת-דיוק עתידית. ה-demand review הוא הצעד הראשון במחזור ה-S&OP החודשי (לפני supply review ו-management business review).",
      purposeHe:
        "להמיר קלט סטטיסטי + פיננסי + ידע-עסקי לתוכנית-ביקוש אחת, מאושרת, מתועדת וננעלת — שתשמש כקלט-יחיד אמין לכל מורד-הזרם.",
      processExampleHe:
        "ב-demand review החודשי: התחזית הסטטיסטית מוצגת; מכירות מוסיפות חוזה-לקוח-חדש כ-override; שיווק מאשר uplift-מבצע; כספים בוחנים את השפעת-ה-P&L; הקבוצה מסכימה; מנהל-הביקוש נועל version 'Approved Demand' ומעביר ל-Supply Planning.",
      cbcHe:
        "ב-CBC: demand review אזורי לפני ה-S&OP הגלובלי; מנהלי-מדינות מוסיפים ידע-שטח (אירוע-ספורט, גל-חום צפוי) כ-override שקוף; הנחות מתועדות ב-Case Management; version 'Approved' ננעלת ומוזנת לתכנון-קווי-המילוי.",
      navHe: [
        "Excel ► SAP IBP ► Collaborative editing על Consensus Demand (override key figures)",
        "SAP Fiori Launchpad ► Manage Cases / Collaboration ► תיעוד-הנחות והחלטות",
        "SAP Fiori Launchpad ► Manage Versions / Scenarios ► נעילת 'Approved Demand' + handover",
      ],
      tables: ["Consensus Demand Qty", "Sales Override", "Marketing Uplift", "Version (Approved)"],
      tcodes: ["Excel add-in", "Manage Cases", "Manage Versions", "Application Jobs"],
      fiori: ["Manage Cases", "Dashboards", "Manage Versions"],
      configHe: [
        "override key figures שקופים (Sales Override, Marketing Uplift) → Consensus Demand.",
        "Case Management / collaboration לתיעוד-הנחות והחלטות.",
        "versions/scenarios להקפאת 'Approved Demand' ולהשוואה.",
        "handover ל-Supply (key figure copy) + snapshot של ה-consensus הסופי.",
      ],
      flow: [
        { he: "הצגת תחזית", code: "Excel/Web UI" },
        { he: "override שקוף", code: "Sales/Marketing", note: "ידע-עסקי" },
        { he: "תיעוד-הנחות", code: "Case Management" },
        { he: "איחוד + אישור", code: "Consensus Demand" },
        { he: "נעילה", code: "version", note: "Approved Demand" },
        { he: "מסירה ל-Supply", code: "handover + snapshot" },
      ],
      masterDataHe: [
        "Consensus Demand Qty = הפלט הסופי הנעול.",
        "Sales Override / Marketing Uplift = שכבות-קלט שקופות.",
        "Version (Approved) = הקפאת-התוכנית למדידה והשוואה.",
      ],
      mistakesHe: [
        "override 'ישירות על ה-consensus' בלי key figure נפרד — אובדן-שקיפות מי-שינה-מה.",
        "אי-תיעוד-הנחות — אי-אפשר להבין בדיעבד מדוע התחזית הזו.",
        "אי-נעילת version — התוכנית 'זזה' אחרי האישור.",
        "דילוג על snapshot — אין מדידת-דיוק במחזור הבא.",
      ],
      troubleshootHe: [
        "התחזית השתנתה אחרי האישור ➔ version לא ננעלה; הקפא version.",
        "לא ברור מקור-שינוי ➔ override נכתב ישירות במקום ב-key figure ייעודי.",
        "Supply לא קיבל את התחזית ➔ ה-handover (key figure copy) לא רץ.",
      ],
      bestPracticeHe: [
        "כל override בשכבת key figure שקופה ונפרדת — שקיפות-מלאה.",
        "תעד הנחות והחלטות ב-Case Management לכל מחזור.",
        "נעל version 'Approved' לפני handover, וצלם snapshot.",
        "הפעל את demand review כצעד-ראשון מסודר במחזור-ה-S&OP.",
      ],
      interviewHe: [
        { qHe: "מהו demand review במחזור ה-S&OP?", aHe: "הצעד-הראשון: בעלי-העניין סוקרים את התחזית הסטטיסטית/פיננסית, מוסיפים ידע-עסקי, ומאחדים ל-consensus demand מאושר." },
        { qHe: "מדוע override בשכבת key figure נפרדת?", aHe: "לשקיפות — לדעת מי-שינה-מה וכמה, ולשמר את תחזית-הבסיס לביקורת ולמדידה." },
        { qHe: "מדוע נועלים version בסוף?", aHe: "כדי שהתוכנית-המאושרת לא 'תזוז', ולאפשר handover יציב ל-Supply ומדידת-דיוק מול actuals." },
      ],
      takeawaysHe: [
        "השלב הסוגר: מ-תחזית ל-תוכנית-מאושרת.",
        "override שקוף + תיעוד-הנחות ב-Case Management.",
        "נעל version 'Approved', צלם snapshot, מסור ל-Supply.",
        "demand review = הצעד-הראשון במחזור-ה-S&OP.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מודל פיננסי משתף (3.5)", href: "/library/sop/chapter-03/#sub-3.5" },
        { labelHe: "S&OP · תכנון אספקה", href: "/library/sop/chapter-04/" },
      ],
    },
    // ============================================================ 3.7
    {
      id: "3.7",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה בנה את תכנון-הביקושים ב-SAP IBP מקצה-לקצה: ממבט-העל וגישות-החיזוי, דרך הכנת-נתונים-היסטוריים ומידול-סטטיסטי (Holt-Winters/Croston/AR), אל תכנון-מבוסס-מניעים, מידול-פיננסי-משתף (P&L ויחסים), ועד סקירה, שיתוף-פעולה ואיחוד ל-consensus demand מאושר. המסר המרכזי: תכנון-ביקוש מצוין משלב אובייקטיביות-סטטיסטית, תובנה-עסקית-אנושית, והקשר-פיננסי — והכול במודל-IBP אחד, מדיד וניתן-לחזרה.",
      beginnerHe:
        "סיכמנו את כל המסע של תכנון-ביקושים: הבאנו נתוני-עבר וניקינו אותם, נתנו למחשב לחזות עם מודלים מתאימים, הוספנו השפעות כמו מחיר ומבצע, תרגמנו את התחזית לכסף, ולבסוף בני-אדם סקרו, תיקנו והסכימו על מספר-אחד-סופי. עכשיו יש לנו תחזית-ביקוש אמינה שאפשר לבנות עליה את כל שאר התכנון.",
      consultantHe:
        "מתודולוגית, פרק-הביקוש מבסס את ה-foundation לכל IBP: planning area + key figures (Actuals→Cleansed→Statistical Forecast→Consensus Demand→Revenue/COGS/Margin), forecast models (Manage Forecast Models), Application Jobs מתוזמנים ושרשורים, snapshots למדידת-forecast-error, versions/scenarios, ו-collaboration (Excel/Web UI/Case Management). שליטה בנקודות-אלה — בחירת-מודל לפי ABC/XYZ, ניקוי-נתונים, driver-based ל-what-if, חישוב-יחסים-נכון, ונעילת-version — היא ההבדל בין מימוש-IBP מצליח לכושל. הצעד-הבא הוא Supply Planning, שמקבל את ה-Approved Demand כקלט.",
      purposeHe:
        "לקבע את עקרונות-העל של תכנון-הביקוש כבסיס למחזורי-S&OP חוזרים ולשאר מודולי-IBP.",
      processExampleHe:
        "מחזור-S&OP מלא: היסטוריה נקייה → Holt-Winters → uplift-מבצע (driver-based) → תרגום-פיננסי → demand review → Approved Demand נעול → handover ל-Supply → snapshot למדידה — ומכאן מתחיל המחזור הבא, מדויק יותר.",
      cbcHe:
        "ב-CBC: המחזור החודשי למשקאות — עונתיות ב-Holt-Winters, uplift למבצעי-קמעונאות, P&L לכל מותג, demand review אזורי, ונעילת 'Approved Demand' לקווי-המילוי. דיוק-התחזית משתפר מעונה-לעונה דרך snapshots.",
      navHe: [
        "SAP Fiori Launchpad ► Demand Planning ► Manage Forecast Models",
        "SAP Fiori Launchpad ► Application Jobs ► Statistical Forecasting + snapshots",
        "Excel ► SAP IBP ► Consensus Demand → handover ל-Supply",
      ],
      tables: ["Actuals Qty", "Statistical Forecast Qty", "Consensus Demand Qty", "Revenue", "Gross Margin"],
      tcodes: ["Manage Forecast Models", "Statistical Forecasting", "Application Jobs", "Manage Versions"],
      fiori: ["Manage Forecast Models", "Application Jobs", "Dashboards"],
      configHe: [
        "שרשרת key figures: Actuals→Cleansed→Statistical Forecast→Consensus Demand→Revenue/COGS/Margin.",
        "Manage Forecast Models + Application Jobs מתוזמנים ושרשורים.",
        "snapshots ל-forecast error; versions/scenarios; collaboration.",
      ],
      flow: [
        { he: "ניקוי היסטוריה", code: "3.2" },
        { he: "מידול-סטטיסטי", code: "3.3" },
        { he: "driver-based", code: "3.4" },
        { he: "מידול-פיננסי", code: "3.5" },
        { he: "סקירה + איחוד", code: "3.6" },
        { he: "Approved Demand → Supply", code: "handover" },
      ],
      mistakesHe: [
        "התייחסות לתחזית כאל אירוע-חד-פעמי במקום מחזור-מדיד-וחוזר.",
        "הזנחת מדידת-דיוק (snapshots) — אין שיפור-מתמשך.",
        "ערבוב שכבות-קלט במקום key figures שקופים ומובחנים.",
      ],
      troubleshootHe: [
        "התחזית לא משתפרת לאורך-זמן ➔ חסרות snapshots / אין כיול-מודלים מחזורי.",
        "Supply מקבל מספר לא-מעודכן ➔ handover/version לא ננעלו נכון.",
        "פערים בין מודולים ➔ planning area / גרנולריות לא-עקביים.",
      ],
      bestPracticeHe: [
        "נהל את תכנון-הביקוש כמחזור חוזר, אוטומטי ומדיד.",
        "צלם snapshot וכייל מודלים בכל מחזור.",
        "שמור שקיפות-מלאה בשכבות-הקלט ובנעילת-versions.",
        "מסור Approved Demand נקי ל-Supply כקלט-יחיד.",
      ],
      interviewHe: [
        { qHe: "מהם השלבים העיקריים בתכנון-ביקוש ב-IBP?", aHe: "מבט-על וגישות → ניקוי-היסטוריה → מידול-סטטיסטי → driver-based → מידול-פיננסי → סקירה ואיחוד ל-Approved Demand → handover ל-Supply." },
        { qHe: "מה מבדיל תכנון-ביקוש מצוין?", aHe: "שילוב אובייקטיביות-סטטיסטית, תובנה-עסקית-אנושית והקשר-פיננסי, במחזור אחד מדיד וחוזר על מודל-IBP יחיד." },
      ],
      takeawaysHe: [
        "תכנון-ביקוש = סטטיסטיקה + תובנה-אנושית + הקשר-פיננסי.",
        "מודל-IBP אחד: Actuals→Forecast→Consensus→P&L.",
        "מדיד (snapshots) וחוזר (מחזור-S&OP).",
        "הפלט: Approved Demand — קלט-יחיד ל-Supply Planning.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מבט-על על תכנון-ביקוש (3.1)", href: "/library/sop/chapter-03/#sub-3.1" },
        { labelHe: "S&OP · תכנון אספקה", href: "/library/sop/chapter-04/" },
        { labelHe: "S&OP · מודל וניווט IBP (פרק 2)", href: "/library/sop/chapter-02/" },
      ],
    },
  ],
};
