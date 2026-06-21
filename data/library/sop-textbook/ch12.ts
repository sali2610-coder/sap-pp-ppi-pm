// ===== S&OP with SAP IBP Digital Textbook — Chapter 12 =====
// Key Performance Indicators and Performance Monitoring.
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly. SAP objects verbatim English (KPI, MAPE,
// bias, balanced scorecard, DMAIC). CBC = Coca-Cola bottling S&OP KPIs.
import type { TextbookChapter } from "./types";

export const CH12: TextbookChapter = {
  n: 12,
  titleHe: "מדדי-ביצוע וניטור (KPIs)",
  titleEn: "Key Performance Indicators and Performance Monitoring",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למדדי-ביצוע (KPIs) ולניטור-ביצועים בתהליך ה-S&OP עם SAP IBP. מדד-ביצוע הוא המספר שמתרגם תוכנית להישג מדיד: בלעדיו ה-S&OP הופך לדיון-דעות, ועם מדדים נכונים הוא הופך לתהליך-ניהול מבוסס-עובדות. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (מפעל-מילוי משקאות של Coca-Cola), ניווט בעצי-היישומים של IBP, מדדים/אובייקטים/אפליקציות, פרטי הגדרה, תרשים-זרימה, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד למדוד, לנטר ולשפר את ה-S&OP — מ-forecast accuracy (MAPE/bias) דרך fill rate ו-OTIF ועד inventory — ללא הספר המקורי. SAP IBP הוא פתרון-ענן (cloud), והמדדים נצרכים דרך Analytics, Dashboards ו-Excel add-in.",
  subchapters: [
    // ============================================================ 12.1
    {
      id: "12.1",
      titleHe: "מדדי-ביצוע ב-SAP IBP",
      titleEn: "Key Performance Indicators in SAP IBP",
      execHe:
        "KPI (Key Performance Indicator) הוא מדד נבחר שמכמת עד כמה תהליך ה-S&OP מצליח להשיג את יעדיו. ב-SAP IBP מדדים אינם נספח — הם מנוע-הניהול: כל מפגש-סקירה (Demand, Supply, Operating, Executive) נפתח בלוח-מדדים, וכל החלטה נמדדת מול היעד. מדד נכון הופך דיון-דעות לתהליך מבוסס-עובדות; מדד שגוי מוביל את הארגון לכיוון הלא-נכון בביטחון מלא.",
      beginnerHe:
        "תחשוב על KPI כמו על מד-מהירות ומד-דלק ברכב: מספר בודד שאומר לך בכל רגע אם אתה בכיוון הנכון. ב-S&OP אנחנו רוצים לדעת: האם התחזית מדויקת? האם סיפקנו ללקוחות בזמן? האם המלאי גבוה מדי? כל שאלה כזו הופכת ל-KPI — מספר שמתעדכן בכל מחזור-תכנון. ב-IBP המספרים האלה מחושבים אוטומטית מהנתונים ומוצגים בלוחות-מחוונים (dashboards).",
      consultantHe:
        "ב-IBP מדד הוא Key Figure מחושב בתוך Planning Area, המוגדר ב-Configuration (Web UI) עם Calculation Level, Aggregation/Disaggregation ונוסחה (calculation). מדדי-דיוק (forecast accuracy) נשענים על השוואת actuals מול שכבת-תחזית שננעלה ב-snapshot/version מתאים — לכן ניהול snapshots וגרסאות הוא תנאי-סף למדידה הוגנת. המדדים נצרכים דרך Analytics (charts), Dashboards, ה-Excel add-in (Planning View) ו-Custom Alerts. שגיאת-יסוד נפוצה: השוואת תחזית מול actuals באותה שכבה ללא נעילה, מה שמייפה את הדיוק.",
      purposeHe:
        "המטרה: לתת לכל שלב ב-S&OP שפה כמותית משותפת — שכל מחלקה (Demand, Supply, Finance, Operations) תדון באותם מספרים, תזהה פערים, ותקבל החלטות מבוססות-נתונים במקום תחושות-בטן. KPIs גם מחברים את התוכנית-התפעולית ליעדים-העסקיים (הכנסות, שירות, הון-חוזר).",
      processExampleHe:
        "מחזור-S&OP חודשי: בתחילת החודש נסגר snapshot של התחזית הקודמת. עם סגירת-החודש נטענים actuals. IBP מחשב אוטומטית forecast accuracy (1 − MAPE) ו-bias לכל מוצר/לקוח, fill rate ו-OTIF מנתוני-ההזמנות, ורמות-inventory מול היעד. לוח-המדדים מסמן בצבעים (Alerts) היכן חרגנו מהסף, וכל מפגש-סקירה מתחיל מהחריגות.",
      cbcHe:
        "ב-CBC (מפעל-מילוי Coca-Cola) ארבעת מדדי-הליבה: (1) forecast accuracy = 1 − MAPE לכל SKU-משקה, (2) fill rate — אחוז הזמנות-קמעונאים שסופקו במלואן, (3) OTIF — On-Time-In-Full ללקוחות-רשת, (4) inventory — Days of Supply של מוצר-מוגמר וחומרי-אריזה. מדדים אלה נסקרים בכל מחזור-S&OP, מפולחים לפי מותג, אריזה ואזור-הפצה.",
      navHe: [
        "SAP IBP Web UI ► Configuration ► Planning Areas ► Key Figures (הגדרת KPI כ-Key Figure מחושב)",
        "SAP IBP Web UI ► Analytics ► Analytics Stories / Charts (תצוגת KPI)",
        "SAP IBP Web UI ► Dashboards (הרכבת לוח-מדדים למפגש-סקירה)",
        "SAP IBP for Excel ► Planning View (צריכת KPI בגיליון)",
      ],
      tables: ["Planning Area", "Key Figure", "Time Profile", "Planning Level", "Version", "Snapshot"],
      tcodes: ["Configuration", "Analytics", "Dashboards", "Manage KPIs", "Custom Alerts"],
      fiori: ["Analytics", "Dashboards", "Custom Alerts", "Manage Forecast Models"],
      configHe: [
        "Key Figure (KPI): הגדר Calculation Level, Aggregation Mode, ונוסחת-חישוב (למשל 1 − MAPE) ב-Planning Area Configuration.",
        "Snapshot/Version: הקפא שכבת-תחזית לפני טעינת actuals — תנאי-סף למדידת forecast accuracy הוגנת.",
        "Analytics & Dashboards: הרכב Chart/Story לכל KPI והצמד אותו ל-Dashboard של מפגש-הסקירה.",
        "Custom Alerts: הגדר ספים (thresholds) שיסמנו חריגות-KPI אוטומטית.",
      ],
      flow: [
        { he: "הגדרת KPI כ-Key Figure", code: "Configuration", note: "נוסחה + Calculation Level" },
        { he: "נעילת snapshot של התחזית", code: "Snapshot", note: "לפני actuals" },
        { he: "טעינת actuals", code: "Data Integration" },
        { he: "חישוב אוטומטי", code: "Key Figure Calc", note: "MAPE / bias / fill rate" },
        { he: "תצוגה ב-Dashboard", code: "Analytics" },
        { he: "התראה על חריגה", code: "Custom Alert" },
      ],
      masterDataHe: [
        "Planning Area = מאגר ה-Key Figures והממדים; כל KPI חי בתוכו.",
        "Time Profile + Planning Levels קובעים את גרעיניות-המדידה (יום/שבוע/חודש; SKU/מותג/אזור).",
        "Version/Snapshot = השכבה שמולה נמדד הדיוק.",
      ],
      mistakesHe: [
        "בחירת יותר מדי KPIs — לוח עמוס ש'אף-אחד-לא-מסתכל-עליו' במקום מעט מדדים-מנחים.",
        "מדידת forecast accuracy ללא snapshot — התחזית מתעדכנת ומיופה רטרואקטיבית.",
        "הצגת מדד בלי יעד וסף — מספר ללא הקשר אינו מניע פעולה.",
        "ערבוב גרעיניות — השוואת תחזית-SKU מול actuals ברמת-מותג מעוותת את הדיוק.",
      ],
      troubleshootHe: [
        "forecast accuracy נראה 'טוב מדי' ➔ אין snapshot/נעילה; התחזית נמדדת מול עצמה המעודכנת.",
        "KPI ריק ב-Dashboard ➔ Calculation Level/Key Figure לא תואם ל-Planning Level של התצוגה.",
        "מדד לא מתעדכן ➔ actuals לא נטענו או job של החישוב לא רץ.",
        "ערכים חריגים-קיצוניים ➔ נתוני-actuals מלוכלכים (יחידות/החזרות) — נקה לפני המדידה.",
      ],
      bestPracticeHe: [
        "בחר מעט KPIs קריטיים לכל מפגש-סקירה — איכות על-פני כמות.",
        "לכל KPI הגדר יעד (target), סף (threshold) ובעלים (owner).",
        "נהל snapshots/versions בקפדנות — בסיס לכל מדידת-דיוק.",
        "הצג מגמה לאורך-זמן, לא רק נקודה בודדת — מדד הוא סיפור, לא תצלום.",
      ],
      interviewHe: [
        { qHe: "מהו KPI בהקשר S&OP?", aHe: "Key Performance Indicator — מדד נבחר שמכמת עד כמה תהליך ה-S&OP משיג יעד מסוים (דיוק-תחזית, שירות-לקוח, מלאי). הוא הופך דיון-דעות לתהליך מבוסס-עובדות." },
        { qHe: "כיצד מיוצג KPI ב-SAP IBP?", aHe: "כ-Key Figure מחושב בתוך Planning Area, עם Calculation Level ונוסחה, ונצרך דרך Analytics, Dashboards וה-Excel add-in." },
        { qHe: "מדוע snapshot הכרחי למדידת forecast accuracy?", aHe: "כדי לקבע את התחזית שהבטחנו לפני שה-actuals מגיעים; בלעדיו התחזית מתעדכנת ומיופה רטרואקטיבית, וה-accuracy מטעה." },
      ],
      takeawaysHe: [
        "KPI = מנוע-הניהול של ה-S&OP, לא נספח.",
        "ב-IBP כל KPI הוא Key Figure מחושב הנצרך דרך Analytics/Dashboards/Excel.",
        "מדידת-דיוק דורשת snapshot/version לנעילת התחזית.",
        "מעט מדדים, עם יעד וסף ובעלים — מניעים פעולה.",
      ],
      children: [
        {
          id: "12.1.1",
          titleHe: "כיצד עובדים מדדי-ביצוע",
          titleEn: "How KPIs Work",
          execHe:
            "KPI עובד בשלושה רכיבים: מדידה (מה אנחנו סופרים), יעד (מה רצינו) וסף (מתי להתריע). מדד-ביצוע אפקטיבי הוא SMART — ספציפי, מדיד, בר-השגה, רלוונטי ותחום-בזמן — ותמיד צמוד למחזור-תכנון קבוע ולבעלים אחראי. ללא יעד וסף, KPI הוא רק מספר; איתם הוא הופך למנגנון-בקרה.",
          beginnerHe:
            "כל KPI שואל שלוש שאלות: כמה? (המדידה), כמה רצינו? (היעד), ומתי לדאוג? (הסף). למשל forecast accuracy: מדדנו 82%, היעד 90%, הסף הוא 85% — אז מתחת ל-85% נדלקת נורה-אדומה. בלי היעד והסף, '82%' לא אומר אם זה טוב או רע.",
          consultantHe:
            "ב-IBP המדידה מתממשת כנוסחת Key Figure (calculation) על-פני Planning Levels וזמן. שני מדדי-הדיוק המרכזיים: MAPE (Mean Absolute Percentage Error) = ממוצע ה-|actual − forecast| / actual, ו-bias = הטיה ממוצעת (חתומה) שמראה אם אנחנו עקבית מעל או מתחת לתחזית. accuracy מוגדר לרוב כ-1 − MAPE. הסף ממומש כ-Custom Alert. חשוב לבחור lag (מרחק-תחזית, למשל lag-1 חודש) עקבי, כי דיוק תלוי-lag.",
          purposeHe:
            "להבטיח שכל מדד ניתן-לפעולה: לא רק לדעת 'מה קרה' אלא 'האם זה בסדר' ו'מי אחראי לתקן'. מבנה המדידה-יעד-סף הוא מה שהופך נתון להחלטה.",
          processExampleHe:
            "בסוף החודש IBP משווה את התחזית-שננעלה (lag-1) מול ה-actuals: |1000 − 850| / 850 = 17.6% שגיאה → MAPE; accuracy = 82.4%. ה-bias שלילי (חזינו יותר ממה שנמכר) → נטייה לעודף-תחזית. Custom Alert בסף 85% נדלק ומפנה את צוות-הביקוש לתחקיר.",
          cbcHe:
            "ב-CBC: forecast accuracy ל-SKU 'פחית 330 מ\"ל' = 1 − MAPE, נמדד ב-lag-1; bias חיובי עקבי מגלה ש'אנחנו תמיד מתחת לתחזית' לקראת הקיץ — תובנה שמובילה לעדכון מוקדם של תכנית-הקיץ. היעד 90%, הסף 85%.",
          navHe: [
            "SAP IBP Web UI ► Configuration ► Key Figures ► Calculation (נוסחת MAPE/bias)",
            "SAP IBP Web UI ► Custom Alerts ► Define Alerts (סף KPI)",
            "SAP IBP for Excel ► Planning View ► Forecast Error Key Figures",
          ],
          tables: ["Key Figure", "Calculation Level", "Lag", "Version", "Snapshot"],
          tcodes: ["Configuration", "Custom Alerts", "Manage Forecast Models"],
          fiori: ["Custom Alerts", "Analytics", "Manage Forecast Models"],
          configHe: [
            "MAPE/bias: הגדר Key Figures לחישוב שגיאת-תחזית (Absolute Error, MAPE, bias) ברמת-החישוב הנכונה.",
            "Lag: קבע lag עקבי (למשל lag-1) להשוואת התחזית-ההיסטורית מול actuals.",
            "SMART target: לכל KPI הגדר יעד מספרי, סף-התראה ובעלים.",
            "Custom Alert: חבר את הסף ל-Alert אוטומטי במחזור-התכנון.",
          ],
          flow: [
            { he: "הגדרת המדידה (נוסחה)", code: "Key Figure", note: "MAPE / bias" },
            { he: "קביעת יעד", code: "Target" },
            { he: "קביעת סף", code: "Threshold" },
            { he: "חישוב מול actuals", code: "Calc @ lag" },
            { he: "השוואה ליעד/סף", code: "Compare" },
            { he: "התראה + בעלים", code: "Custom Alert" },
          ],
          masterDataHe: [
            "Snapshot/Version קובע את התחזית-ההיסטורית למדידת lag.",
            "Calculation Level קובע את גרעיניות ה-MAPE (SKU/מותג/אזור).",
          ],
          mistakesHe: [
            "מדידה ללא יעד וסף — מספר חסר-משמעות.",
            "השוואת תחזית ו-actuals ב-lag לא-עקבי — דיוק לא-בר-השוואה בין מחזורים.",
            "בלבול בין MAPE (גודל-שגיאה) ל-bias (כיוון-שגיאה).",
            "מדד ללא בעלים — אף-אחד לא פועל על חריגה.",
          ],
          troubleshootHe: [
            "MAPE קופץ בלי הסבר ➔ actuals חלקיים/מלוכלכים או חלוקה-באפס (מכירות=0).",
            "accuracy 'מושלם' ➔ lag=0 (משווים תחזית מעודכנת מול עצמה).",
            "Alert לא נדלק ➔ הסף או ה-Custom Alert לא הוגדרו על ה-Key Figure הנכון.",
          ],
          bestPracticeHe: [
            "הגדר KPIs לפי SMART — ספציפי, מדיד, בר-השגה, רלוונטי, תחום-בזמן.",
            "מדוד MAPE ו-bias יחד — גודל-שגיאה וכיוון-שגיאה משלימים.",
            "טפל בחלוקה-באפס (mASE/WMAPE) כשמכירות נמוכות/אפסיות.",
            "צמד כל KPI לבעלים ולמחזור-תכנון קבוע.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת רכיבי KPI אפקטיבי?", aHe: "מדידה (מה סופרים), יעד (מה רצינו) וסף (מתי להתריע). בלעדיהם המספר אינו מניע פעולה." },
            { qHe: "מה ההבדל בין MAPE ל-bias?", aHe: "MAPE מודד את גודל-השגיאה (חיובי תמיד); bias מודד את כיוון-השגיאה (חתום) — האם חוזים עקבית מעל או מתחת. צריך את שניהם." },
            { qHe: "מהו lag במדידת דיוק-תחזית ולמה הוא חשוב?", aHe: "המרחק בין מועד-התחזית למועד-המכירה (למשל lag-1 חודש). הדיוק תלוי-lag, ולכן יש למדוד ב-lag עקבי כדי להשוות בין מחזורים." },
          ],
          takeawaysHe: [
            "KPI = מדידה + יעד + סף + בעלים.",
            "MAPE = גודל-שגיאה; bias = כיוון-שגיאה — שניהם נחוצים.",
            "מדוד דיוק ב-lag עקבי מול snapshot.",
            "מדד אפקטיבי הוא SMART.",
          ],
        },
        {
          id: "12.1.2",
          titleHe: "שימוש במדדי-ביצוע ב-SAP IBP",
          titleEn: "Using KPIs in SAP IBP",
          execHe:
            "ב-SAP IBP צורכים KPIs דרך ארבעה ערוצים: Analytics (charts ו-stories), Dashboards (לוחות למפגשי-סקירה), Excel add-in (Planning View בגיליון) ו-Custom Alerts (התראות-חריגה). הבחירה בערוץ נגזרת מהקהל: מנהלים → Dashboard, מתכננים → Excel, חריגות → Alerts.",
          beginnerHe:
            "אחרי שהגדרנו KPI, צריך לראות אותו. ב-IBP יש כמה דרכים: גרפים יפים (Analytics), לוח-מחוונים לפגישה (Dashboard), טבלה בתוך Excel למתכנן שעובד עם מספרים, והתראות אוטומטיות כשמשהו חורג. אותו מדד — תצוגות שונות לקהלים שונים.",
          consultantHe:
            "Analytics ב-IBP מבוסס על Charts המוגדרים מעל Key Figures ו-Attributes, ונארזים ל-Analytics Stories. Dashboards מאגדים Charts מרובים עם פילטרים גלובליים. ה-Excel add-in (IBP for Excel) מושך KPIs לתוך Planning View עם favorites/templates. Custom Alerts מריצים בדיקות-סף תקופתיות ויוצרים רשימת-חריגות הניתנת-לתחקיר (drill-down). הרשאות (Visibility Filters / Authorization) קובעות מי רואה אילו נתחים.",
          purposeHe:
            "להנגיש את אותם מדדים לכל בעל-עניין בפורמט המתאים לו, תוך שמירה על 'מקור-אמת-יחיד' — כולם רואים את אותו Key Figure, רק בתצוגה שונה.",
          processExampleHe:
            "לקראת מפגש Demand Review: המתכנן מנתח חריגות-accuracy ב-Excel add-in, מנהל-הביקוש סוקר את אותם מדדים בלוח-Dashboard, ו-Custom Alert כבר סימן את עשרת ה-SKUs הגרועים. כולם — אותו Key Figure, אותו snapshot.",
          cbcHe:
            "ב-CBC מנהל-תפעול רואה Dashboard עם fill rate, OTIF ו-inventory לפי אזור-הפצה; מתכנן-הביקוש עובד ב-Excel add-in על forecast accuracy ברמת-SKU; Custom Alert שולח רשימת SKUs שחרגו מ-85% accuracy לפני המפגש.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Manage Charts / Stories",
            "SAP IBP Web UI ► Dashboards ► Create Dashboard",
            "SAP IBP for Excel ► Favorites / Templates (Planning View)",
            "SAP IBP Web UI ► Custom Alerts ► Monitor Alerts",
          ],
          tables: ["Chart", "Analytics Story", "Dashboard", "Planning View", "Alert"],
          tcodes: ["Analytics", "Dashboards", "Custom Alerts", "IBP for Excel"],
          fiori: ["Analytics", "Dashboards", "Custom Alerts", "Intelligent Visibility"],
          configHe: [
            "Charts: בנה Chart מעל Key Figure + Attributes (סוג: bar/line/heatmap) ב-Analytics.",
            "Dashboard: אגד Charts עם פילטרים גלובליים לקהל-הסקירה.",
            "Excel add-in: שמור Templates/Favorites של Planning View לכל תפקיד.",
            "Custom Alerts: הגדר תדירות, סף ונמענים; אפשר drill-down לחריגות.",
          ],
          flow: [
            { he: "Key Figure מחושב", code: "Configuration" },
            { he: "תצוגה ויזואלית", code: "Analytics", note: "Charts/Stories" },
            { he: "אגד ללוח", code: "Dashboard" },
            { he: "טבלה למתכנן", code: "Excel add-in" },
            { he: "התראת-חריגה", code: "Custom Alert" },
            { he: "תחקיר (drill-down)", code: "Analytics" },
          ],
          masterDataHe: [
            "Authorization / Visibility Filters קובעים אילו נתחי-KPI כל משתמש רואה.",
            "Templates/Favorites של Excel add-in נשמרים פר-משתמש/פר-תפקיד.",
          ],
          mistakesHe: [
            "בניית Dashboard עמוס מ-20 Charts — מסיט מהמדדים-המנחים.",
            "תצוגות שונות מבוססות snapshots שונים — 'מספרים-שונים-בכל-מסך'.",
            "התעלמות מהרשאות — חשיפת נתחים רגישים לקהל הלא-נכון.",
            "שימוש ב-Excel add-in ככלי-דיווח בלבד בלי לנצל את יכולת-התכנון.",
          ],
          troubleshootHe: [
            "מספרים שונים בין Dashboard ל-Excel ➔ snapshot/version או lag שונים בין התצוגות.",
            "Chart ריק ➔ אי-התאמה בין Planning Level של ה-Chart ל-Key Figure.",
            "Alert לא מגיע לנמען ➔ הגדרת-נמענים/הרשאות ב-Custom Alert.",
            "Excel add-in איטי ➔ Planning View רחב מדי; צמצם ממדים/תקופות.",
          ],
          bestPracticeHe: [
            "התאם ערוץ לקהל: Dashboard למנהלים, Excel למתכננים, Alerts לחריגות.",
            "שמור 'מקור-אמת-יחיד' — כל התצוגות על אותו Key Figure ו-snapshot.",
            "תכנן Dashboards סביב מפגשי-הסקירה (Demand/Supply/Operating/Executive).",
            "הגדר הרשאות-נראות לפני שמפיצים מדדים.",
          ],
          interviewHe: [
            { qHe: "אילו ערוצים לצריכת KPIs קיימים ב-IBP?", aHe: "Analytics (charts/stories), Dashboards, ה-Excel add-in (Planning View) ו-Custom Alerts. הבחירה נגזרת מהקהל ומהמטרה." },
            { qHe: "מתי תעדיף Dashboard ומתי Excel add-in?", aHe: "Dashboard למנהלים ולמפגשי-סקירה (ויזואלי, מאגד); Excel add-in למתכננים שעובדים על המספרים ומבצעים תכנון בפועל." },
            { qHe: "כיצד שומרים על עקביות-מספרים בין תצוגות?", aHe: "כל התצוגות נשענות על אותו Key Figure ואותו snapshot/version; שוני נובע לרוב מ-lag/snapshot שונה." },
          ],
          takeawaysHe: [
            "ארבעה ערוצים: Analytics, Dashboards, Excel add-in, Custom Alerts.",
            "התאם ערוץ לקהל ולמטרה.",
            "מקור-אמת-יחיד = אותו Key Figure ו-snapshot בכל מסך.",
            "Custom Alerts הופכים מדדים לפעולה אוטומטית.",
          ],
        },
        {
          id: "12.1.3",
          titleHe: "מדדי סקירת-ביקוש",
          titleEn: "Demand Review KPIs",
          execHe:
            "סקירת-הביקוש (Demand Review) מתמקדת באיכות-התחזית. מדדי-הליבה: forecast accuracy (1 − MAPE), bias (הטיה), ו-demand plan attainment (עמידת-המכירות-בפועל בתוכנית). מדדים אלה קובעים אם 'מספר-הביקוש' שעליו בנויה כל שרשרת-האספקה אמין.",
          beginnerHe:
            "בסקירת-הביקוש שואלים: 'כמה טובה התחזית שלנו?'. אם התחזית גרועה, כל מה שבא אחריה (ייצור, מלאי, רכש) ייכשל. לכן מודדים את הדיוק (MAPE), את ההטיה (האם תמיד גבוה/נמוך מדי), ואת היכולת לעמוד בתוכנית.",
          consultantHe:
            "המדדים מחושבים ברמות-פילוח שונות: SKU, מותג, לקוח, אזור — כי MAPE מצרפי (aggregate) תמיד נראה טוב יותר מ-MAPE ברמת-SKU. כדאי להוסיף WMAPE (משוקלל-נפח) כדי שמוצרים גדולים ישפיעו יותר, ולנטר bias כדי לזהות הטיה-שיטתית הניתנת-לתיקון. ב-IBP מודדים גם forecast value added (FVA) — האם התערבות-ידנית שיפרה את התחזית-הסטטיסטית או הזיקה.",
          purposeHe:
            "לוודא שמספר-הביקוש המוסכם אמין, לזהות היכן התחזית נכשלת, ולכוון מאמצי-שיפור (מודלים, התערבות-ידנית, נתוני-קלט) למקום שבו הם משפיעים על העסק.",
          processExampleHe:
            "Demand Review: הצוות סוקר accuracy ברמת-מותג (88%) ומגלה שמותג-אחד מושך מטה (72%). drill-down ל-SKU מראה bias חיובי עקבי — התחזית-הידנית מנופחת. FVA שלילי מאשר שההתערבות הזיקה; ההחלטה: לחזור למודל-הסטטיסטי לאותו מותג.",
          cbcHe:
            "ב-CBC Demand Review סוקר forecast accuracy לפי מותג ואריזה: 'דיאט בפחית' מדויק (91%) אך 'מהדורה-מוגבלת' גרוע (65%) עקב מבצעים. bias מגלה ניפוח-תחזית למבצעים; FVA מנחה אם להמשיך בהתערבות-הידנית.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Demand Review Dashboard",
            "SAP IBP for Excel ► Forecast Error / FVA Key Figures",
            "SAP IBP Web UI ► Manage Forecast Models ► Statistical Forecasting",
          ],
          tables: ["Forecast Error", "MAPE", "bias", "WMAPE", "FVA"],
          tcodes: ["Analytics", "Manage Forecast Models", "Custom Alerts"],
          fiori: ["Analytics", "Manage Forecast Models", "Custom Alerts"],
          configHe: [
            "Key Figures: forecast accuracy (1 − MAPE), bias, WMAPE, FVA ברמות-פילוח SKU/מותג/לקוח.",
            "FVA: השווה תחזית-סטטיסטית מול תחזית-לאחר-התערבות מול actuals.",
            "Dashboard ייעודי ל-Demand Review עם פילוח לפי מותג/אזור.",
            "Alerts על SKUs מתחת לסף-accuracy.",
          ],
          flow: [
            { he: "נעילת snapshot של התחזית", code: "Snapshot" },
            { he: "טעינת actuals", code: "Data Integration" },
            { he: "accuracy + bias", code: "Key Figure", note: "1 − MAPE" },
            { he: "FVA", code: "Calc", note: "סטטיסטי מול ידני" },
            { he: "סקירה ב-Dashboard", code: "Analytics" },
            { he: "החלטת-שיפור", code: "Demand Review" },
          ],
          masterDataHe: [
            "Forecast Model (statistical) הוא הבסיס למדידת FVA.",
            "Product/Customer Attributes מאפשרים פילוח ה-accuracy.",
          ],
          mistakesHe: [
            "מדידת accuracy רק ברמה-מצרפית — מסתירה כשלי-SKU.",
            "התעלמות מ-bias — הטיה-שיטתית שלא מתוקנת.",
            "המשך התערבות-ידנית עם FVA שלילי.",
            "MAPE לא-משוקלל — מוצר-קטן 'גורר' את הממוצע.",
          ],
          troubleshootHe: [
            "accuracy גבוה מצרפית אך שירות נמוך ➔ מדוד ברמת-SKU, לא רק מותג.",
            "FVA שלילי ➔ ההתערבות-הידנית מזיקה; חזור למודל-הסטטיסטי.",
            "bias עקבי ➔ הטיה שיטתית; כייל מודל או נקה נתוני-מבצעים.",
          ],
          bestPracticeHe: [
            "מדוד accuracy בכמה רמות-פילוח, לא רק מצרפי.",
            "נטר bias לצד accuracy לזיהוי הטיה-שיטתית.",
            "השתמש ב-FVA לבחון אם התערבות-ידנית מוסיפה ערך.",
            "שקלל לפי נפח (WMAPE) כדי לתעדף את החשוב.",
          ],
          interviewHe: [
            { qHe: "מהם מדדי-הליבה של Demand Review?", aHe: "forecast accuracy (1 − MAPE), bias, ו-demand plan attainment; לעיתים גם WMAPE ו-FVA." },
            { qHe: "מהו FVA (Forecast Value Added)?", aHe: "מדד שבוחן האם התערבות (ידנית או צעד-מודל) שיפרה את התחזית מול הבייסליין הסטטיסטי. FVA שלילי = ההתערבות הזיקה." },
            { qHe: "מדוע MAPE מצרפי מטעה?", aHe: "צירוף מקזז שגיאות חיוביות ושליליות, ולכן ה-MAPE המצרפי תמיד נמוך (טוב) יותר מ-MAPE ברמת-SKU. צריך למדוד גם ברמה-פרטנית." },
          ],
          takeawaysHe: [
            "Demand Review מודד את איכות-התחזית.",
            "accuracy + bias + plan attainment הם הליבה.",
            "FVA בוחן אם התערבות-ידנית מוסיפה ערך.",
            "מדוד פרטני (SKU) ומשוקלל (WMAPE), לא רק מצרפי.",
          ],
        },
        {
          id: "12.1.4",
          titleHe: "מדדי סקירת-אספקה",
          titleEn: "Supply Review KPIs",
          execHe:
            "סקירת-האספקה (Supply Review) בוחנת אם ביכולתנו לספק את הביקוש. מדדי-הליבה: production plan adherence (עמידה-בתוכנית-ייצור), capacity utilization (ניצולת-קיבולת), supply plan feasibility, ו-inventory מול היעד. כאן מתאזנים שירות, עלות וזמינות-קיבולת.",
          beginnerHe:
            "בסקירת-האספקה שואלים: 'האם נוכל לייצר ולספק את מה שצריך?'. מודדים אם עמדנו בתוכנית-הייצור, כמה מהקיבולת ניצלנו (לא מעט מדי ולא בחנק), והאם רמות-המלאי נכונות — לא חוסר ולא עודף.",
          consultantHe:
            "ב-IBP for Supply (Time-Series או Order-Based) המדדים מחושבים מתוצאות ה-supply planning run: capacity utilization = עומס מול זמין למרכז-משאב; constrained vs. unconstrained gap מצביע על צווארי-בקבוק; projected inventory ו-Days of Supply (DoS) נגזרים מתוכנית-האספקה. plan adherence משווה תוכנית מול ביצוע (actual production). ניטור supply shortage/excess הוא מדד-חריגה מרכזי.",
          purposeHe:
            "לוודא שתוכנית-האספקה ריאלית (feasible), לזהות צווארי-בקבוק-קיבולת מראש, ולאזן בין רמת-שירות לבין עלות-מלאי וניצולת.",
          processExampleHe:
            "Supply Review: ה-run מראה capacity utilization 105% בקו-מילוי בשבוע-שיא — אי-אפשר לספק. הצוות בוחן אלטרנטיבות: build-ahead (להקדים ייצור ולהגדיל מלאי), משמרת-נוספת, או דחיית-ביקוש. DoS הצפוי לאחר build-ahead נבדק מול יעד-המלאי.",
          cbcHe:
            "ב-CBC Supply Review: ניצולת-קווי-המילוי לקראת הקיץ מגיעה ל-110% — צוואר-בקבוק. ההחלטה: build-ahead של מותגי-ליבה בחורף כדי להגדיל DoS לפני השיא, תוך ניטור עלות-המלאי הנוסף מול סיכון-fill-rate.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Supply Review Dashboard",
            "SAP IBP Web UI ► Application Jobs ► Supply Planning Run (Heuristic / Optimizer)",
            "SAP IBP for Excel ► Capacity / Projected Inventory Key Figures",
          ],
          tables: ["Capacity Utilization", "Projected Inventory", "Days of Supply", "Plan Adherence", "Supply Shortage"],
          tcodes: ["Application Jobs", "Analytics", "Custom Alerts"],
          fiori: ["Analytics", "Application Jobs", "Custom Alerts"],
          configHe: [
            "Key Figures: capacity utilization, projected inventory, Days of Supply, plan adherence, shortage/excess.",
            "Supply run: Time-Series Heuristic/Optimizer או Order-Based; המדדים נגזרים מהתוצאה.",
            "Dashboard ל-Supply Review עם פילוח לפי מרכז-משאב/מפעל.",
            "Alerts על utilization > 100% ועל shortage.",
          ],
          flow: [
            { he: "supply planning run", code: "Application Job" },
            { he: "ניצולת-קיבולת", code: "Key Figure", note: "עומס מול זמין" },
            { he: "מלאי-צפוי + DoS", code: "Projected Inv" },
            { he: "זיהוי צווארי-בקבוק", code: "Constrained gap" },
            { he: "תרחישי-איזון", code: "Scenario", note: "build-ahead/משמרת" },
            { he: "סקירה והחלטה", code: "Supply Review" },
          ],
          masterDataHe: [
            "Resource/Capacity master + Production Source of Supply מזינים את ה-run.",
            "Target inventory / safety stock policy קובעים את יעד-ה-DoS.",
          ],
          mistakesHe: [
            "מדידת plan adherence ללא נעילת-תוכנית — אין מול-מה להשוות.",
            "התעלמות מ-unconstrained gap — לא רואים את צוואר-הבקבוק האמיתי.",
            "יעד-utilization 100% נוקשה — אין כרית לתנודתיות.",
            "DoS אחיד לכל המוצרים — מתעלם משונות-ביקוש.",
          ],
          troubleshootHe: [
            "utilization > 100% ➔ צוואר-בקבוק; בחן build-ahead/משמרת/מקור-חלופי.",
            "shortage למרות מלאי ➔ פיזור-מלאי שגוי בין מיקומים.",
            "plan adherence נמוך ➔ הפרעות-רצפה או תוכנית לא-ריאלית; השווה constrained מול actual.",
          ],
          bestPracticeHe: [
            "השווה constrained מול unconstrained לחשיפת צווארי-בקבוק.",
            "הגדר יעדי-DoS דיפרנציאליים לפי שונות-ביקוש.",
            "נעל את תוכנית-האספקה (snapshot) למדידת adherence.",
            "אזן שירות-עלות-קיבולת בתרחישים, לא בהחלטה בודדת.",
          ],
          interviewHe: [
            { qHe: "מהם מדדי-הליבה של Supply Review?", aHe: "production plan adherence, capacity utilization, supply feasibility ו-inventory/Days of Supply מול היעד." },
            { qHe: "מהו ההבדל בין constrained ל-unconstrained plan?", aHe: "unconstrained מתעלם ממגבלות-קיבולת ומראה את הביקוש המלא; constrained מיישם מגבלות. הפער ביניהם חושף את צווארי-הבקבוק." },
            { qHe: "מהו Days of Supply (DoS)?", aHe: "מספר הימים שהמלאי הנוכחי/הצפוי יספיק לפי קצב-הביקוש. מדד-מלאי מנורמל המאפשר השוואה בין מוצרים." },
          ],
          takeawaysHe: [
            "Supply Review בוחן יכולת-אספקה מול ביקוש.",
            "capacity utilization + plan adherence + inventory/DoS הם הליבה.",
            "פער constrained/unconstrained חושף צווארי-בקבוק.",
            "אזן שירות-עלות-קיבולת בתרחישים.",
          ],
        },
        {
          id: "12.1.5",
          titleHe: "מדדי סקירה-תפעולית",
          titleEn: "Operating Review KPIs",
          execHe:
            "הסקירה-התפעולית (Operating / Pre-S&OP Review) מאחדת ביקוש ואספקה לתוכנית-מאוזנת אחת, ומדדיה הם מדדי-שירות וכספים-תפעוליים: fill rate, OTIF, demand-supply gap, ו-inventory turns. כאן מוודאים שהתוכנית עומדת ביעדי-השירות ובמסגרת-העלות לפני ההגעה למפגש-ההנהלה.",
          beginnerHe:
            "הסקירה-התפעולית מחברת את 'מה רוצים' (ביקוש) עם 'מה אפשר' (אספקה) לתוכנית אחת. מודדים האם נספק ללקוחות בזמן ובמלואו (OTIF), כמה מההזמנות נמלא (fill rate), היכן יש פער ביקוש-אספקה, וכמה פעמים המלאי 'מתגלגל' בשנה (inventory turns).",
          consultantHe:
            "fill rate = יחידות-שסופקו / יחידות-שהוזמנו (line/case fill); OTIF = % הזמנות שסופקו במלואן ובזמן (מדד מכפלתי — נכשל אם אחד מהשניים נכשל). demand-supply gap = הביקוש שלא מכוסה בתוכנית-האספקה. inventory turns = COGS / מלאי-ממוצע. ב-IBP אלה Key Figures שמאגדים את תוצאות שתי הסקירות; הסקירה-התפעולית מנהלת trade-offs ומכינה סוגיות-החלטה ל-Executive Review.",
          purposeHe:
            "להגיע לתוכנית-יחידה מאוזנת ומוסכמת, לזהות את הפערים שדורשים הכרעת-הנהלה, ולוודא עמידה ביעדי-שירות ובמסגרת-הון-חוזר.",
          processExampleHe:
            "Operating Review: התוכנית המאוחדת מראה OTIF צפוי 94% מול יעד 97% עקב demand-supply gap בשני מותגים. הצוות מציע: הסטת-קיבולת ממותג-איטי, או קבלת ירידת-מלאי. הסוגיה (עלות מול שירות) מועברת כהחלטה ל-Executive Review.",
          cbcHe:
            "ב-CBC Operating Review מאחד תכנית-ביקוש-קיץ עם קיבולת-המילוי: fill rate צפוי 96%, OTIF 93% לרשתות עקב צוואר-בקבוק. inventory turns יורד עקב build-ahead. ה-trade-off (שירות-לרשתות מול הון-חוזר) מוכן להכרעת-ההנהלה.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Operating / Pre-S&OP Review Dashboard",
            "SAP IBP Web UI ► Scenarios / Versions (השוואת תרחישי-איזון)",
            "SAP IBP for Excel ► Fill Rate / OTIF / Inventory Turns Key Figures",
          ],
          tables: ["Fill Rate", "OTIF", "Demand-Supply Gap", "Inventory Turns", "Scenario"],
          tcodes: ["Analytics", "Scenarios", "Custom Alerts"],
          fiori: ["Analytics", "Dashboards", "Custom Alerts"],
          configHe: [
            "Key Figures: fill rate, OTIF, demand-supply gap, inventory turns ברמת-לקוח/מותג/אזור.",
            "Scenarios/Versions: צור תרחישי-איזון להשוואת trade-offs.",
            "Dashboard מאחד ביקוש+אספקה לתוכנית-יחידה.",
            "Alerts על OTIF/fill rate מתחת ליעד.",
          ],
          flow: [
            { he: "איחוד ביקוש+אספקה", code: "Operating Review" },
            { he: "fill rate + OTIF", code: "Key Figure" },
            { he: "demand-supply gap", code: "Gap" },
            { he: "בניית תרחישים", code: "Scenario", note: "trade-offs" },
            { he: "סוגיות-החלטה", code: "Issues" },
            { he: "מעבר ל-Executive", code: "Hand-off" },
          ],
          masterDataHe: [
            "Customer/Order data מזינים את חישוב fill rate ו-OTIF.",
            "Financial attributes (COGS, ערך) מזינים inventory turns.",
          ],
          mistakesHe: [
            "מדידת fill rate בלבד בלי OTIF — מתעלמים ממימד-הזמן.",
            "הצגת ממוצע-OTIF ארגוני שמסתיר כשל אצל לקוח-מפתח.",
            "אי-הכנת trade-offs מספריים ל-Executive Review.",
            "inventory turns כללי בלי פילוח מהיר/איטי.",
          ],
          troubleshootHe: [
            "OTIF נמוך אך fill rate גבוה ➔ הבעיה בזמן (on-time), לא בכמות (in-full).",
            "gap למרות מלאי ➔ מלאי במיקום/SKU הלא-נכון; בחן פיזור.",
            "inventory turns נמוך פתאום ➔ build-ahead או מלאי-מת; פלח.",
          ],
          bestPracticeHe: [
            "מדוד OTIF ו-fill rate יחד — כמות וזמן.",
            "פלח שירות לפי לקוחות-מפתח, לא רק ממוצע.",
            "הכן trade-offs כמותיים (שירות מול עלות) ל-Executive.",
            "עקוב אחר inventory turns לצד שירות לאיזון הון-חוזר.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין fill rate ל-OTIF?", aHe: "fill rate = אחוז הכמות שסופקה מתוך שהוזמן (מימד-כמות); OTIF = אחוז הזמנות שסופקו במלואן ובזמן (כמות + זמן, מדד מכפלתי מחמיר יותר)." },
            { qHe: "מה תפקיד הסקירה-התפעולית ב-S&OP?", aHe: "לאחד ביקוש ואספקה לתוכנית-יחידה מאוזנת, לנהל trade-offs, ולהכין את סוגיות-ההחלטה ל-Executive Review." },
            { qHe: "מהו inventory turns ולמה הוא חשוב?", aHe: "COGS חלקי מלאי-ממוצע — כמה פעמים המלאי מתחלף בשנה. מדד יעילות הון-חוזר; turns גבוה = פחות הון כלוא, אך מסכן שירות אם גבוה מדי." },
          ],
          takeawaysHe: [
            "הסקירה-התפעולית מאחדת ביקוש ואספקה לתוכנית-יחידה.",
            "fill rate + OTIF + gap + inventory turns הם הליבה.",
            "OTIF מחמיר מ-fill rate — מוסיף מימד-זמן.",
            "כאן מכינים trade-offs להכרעת-ההנהלה.",
          ],
        },
        {
          id: "12.1.6",
          titleHe: "מדדי סקירה-ניהולית",
          titleEn: "Executive Review KPIs",
          execHe:
            "הסקירה-הניהולית (Executive S&OP Review) היא מפגש-ההכרעה הבכיר, ומדדיה הם מדדים-עסקיים-אסטרטגיים: revenue / volume attainment מול התוכנית-העסקית, margin, working capital / cash, ו-customer service ברמה-ארגונית. כאן הופכים תוכנית-תפעולית לתוכנית-פיננסית מאושרת.",
          beginnerHe:
            "במפגש-ההנהלה הבכיר לא דנים בפרטי-SKU אלא בתמונה-הגדולה: האם נעמוד ביעדי-ההכנסות? מה הרווחיות? כמה כסף כלוא במלאי? איך השירות-הכולל ללקוחות? כאן ההנהלה מאשרת את התוכנית או מבקשת לשנותה.",
          consultantHe:
            "ב-IBP הקישור הפיננסי נעשה דרך Key Figures כספיים (revenue = volume × price, margin, inventory value, working capital) המאגדים את התוכנית-התפעולית לרמה-עסקית, לרוב בהשוואה ל-Business Plan / budget version. מדדים אלה מאפשרים השוואת תרחישים (scenario comparison) ברמת-הנהלה והכרעה על trade-offs אסטרטגיים (שירות מול מזומן מול רווח). הסקירה מאשרת את ה-consensus plan.",
          purposeHe:
            "לאשר תוכנית-S&OP אחת, מאוזנת ומיושרת ליעדים-הפיננסיים; להכריע ב-trade-offs שלא נפתרו בסקירה-התפעולית; ולספק כיוון-אסטרטגי לשרשרת-האספקה.",
          processExampleHe:
            "Executive Review: ההנהלה רואה revenue attainment 98% מול תוכנית אך margin מתחת ליעד עקב עלות build-ahead. שני תרחישים מוצגים: 'שירות-מקסימלי' (OTIF 97%, מזומן נמוך) מול 'מזומן-מאוזן' (OTIF 94%, מלאי נמוך). ההנהלה בוחרת ומאשרת את ה-consensus plan.",
          cbcHe:
            "ב-CBC Executive Review: revenue/volume attainment לקיץ, margin אחרי עלות-build-ahead, working capital כלוא במלאי-משקאות, ו-OTIF ארגוני לרשתות. ההנהלה מכריעה בין שירות-לרשתות-המפתח לבין יעד-המזומן, ומאשרת תוכנית אחת.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Executive S&OP Dashboard",
            "SAP IBP Web UI ► Versions / Scenarios (Business Plan מול S&OP)",
            "SAP IBP for Excel ► Financial Key Figures (revenue/margin/working capital)",
          ],
          tables: ["Revenue", "Margin", "Working Capital", "Volume Attainment", "Business Plan Version"],
          tcodes: ["Analytics", "Versions", "Scenarios"],
          fiori: ["Analytics", "Dashboards"],
          configHe: [
            "Financial Key Figures: revenue (volume × price), margin, inventory value, working capital.",
            "Versions: השווה S&OP plan מול Business Plan/budget.",
            "Executive Dashboard מצרפי, ברמת-עסק/קטגוריה/אזור.",
            "Scenario comparison לתמיכה בהכרעת-trade-offs.",
          ],
          flow: [
            { he: "איגוד התוכנית-התפעולית", code: "Aggregate" },
            { he: "תרגום פיננסי", code: "Key Figure", note: "revenue/margin" },
            { he: "השוואה ל-Business Plan", code: "Versions" },
            { he: "השוואת תרחישים", code: "Scenario" },
            { he: "הכרעת-trade-off", code: "Decision" },
            { he: "אישור consensus plan", code: "Approve" },
          ],
          masterDataHe: [
            "Price/Cost attributes מזינים את ה-Key Figures הכספיים.",
            "Business Plan/Budget version משמש בסיס-השוואה.",
          ],
          mistakesHe: [
            "הצפת ההנהלה בפרטי-SKU במקום מדדים-אסטרטגיים.",
            "הצגת תוכנית-תפעולית בלי תרגום פיננסי — ההנהלה לא יכולה להכריע.",
            "מדד-יחיד (שירות) בלי מימד-מזומן/רווח — החלטה לא-מאוזנת.",
            "אי-השוואה ל-Business Plan — חסר עוגן.",
          ],
          troubleshootHe: [
            "revenue attainment טוב אך margin נמוך ➔ תמהיל/עלות (build-ahead, מבצעים).",
            "תרחישים לא-בני-השוואה ➔ versions על snapshots/הנחות שונים.",
            "החלטה 'תקועה' ➔ trade-off לא הוצג כמותית; הוסף מימד מזומן/שירות.",
          ],
          bestPracticeHe: [
            "הצג מדדים-אסטרטגיים מצרפיים, לא פרטי-SKU.",
            "תרגם כל תוכנית-תפעולית לשפה פיננסית (revenue/margin/cash).",
            "הצג trade-offs כתרחישים בני-השוואה.",
            "עגן תמיד מול Business Plan.",
          ],
          interviewHe: [
            { qHe: "מהם מדדי Executive S&OP Review?", aHe: "מדדים-אסטרטגיים: revenue/volume attainment, margin, working capital/cash, ו-customer service ארגוני — מול ה-Business Plan." },
            { qHe: "כיצד IBP מקשר תוכנית-תפעולית לפיננסים?", aHe: "דרך Key Figures כספיים (volume × price = revenue, margin, inventory value) המאגדים את התוכנית לרמה-עסקית להשוואה מול budget/Business Plan." },
            { qHe: "מה התוצר של Executive Review?", aHe: "אישור consensus plan אחד, מאוזן ומיושר ליעדים-הפיננסיים, והכרעה ב-trade-offs האסטרטגיים." },
          ],
          takeawaysHe: [
            "Executive Review = מפגש-ההכרעה והאישור הבכיר.",
            "מדדים: revenue/margin/working capital/service ברמה-אסטרטגית.",
            "IBP מתרגם תוכנית-תפעולית לשפה פיננסית מול Business Plan.",
            "התוצר: consensus plan מאושר.",
          ],
        },
      ],
    },
    // ============================================================ 12.2
    {
      id: "12.2",
      titleHe: "מדדי-ביצוע לקיימות שרשרת-האספקה",
      titleEn: "KPIs for Supply Chain Sustainability",
      execHe:
        "קיימות (sustainability) הפכה לממד רביעי ב-S&OP לצד שירות, עלות ומלאי. מדדי-הקיימות מכמתים את ההשפעה-הסביבתית של תוכנית-שרשרת-האספקה: carbon footprint (CO2e), צריכת-אנרגיה ומים, אחוז-מיחזור/פסולת, ו-supplier sustainability score. ב-SAP IBP ניתן לשלב מדדים אלה כ-Key Figures לצד המדדים-המסחריים, כך שכל החלטת-תכנון נשקלת גם בעדשה-סביבתית.",
      beginnerHe:
        "עד עכשיו מדדנו אם סיפקנו בזמן ובעלות נכונה. קיימות מוסיפה שאלה: 'כמה זה עלה לסביבה?'. מודדים פליטות-פחמן, צריכת-אנרגיה ומים, פסולת-אריזה ומיחזור. ב-IBP אפשר להוסיף את המדדים האלה לאותם לוחות, כך שתוכנית 'זולה' שמזהמת הרבה כבר לא נראית 'טובה' אוטומטית.",
      consultantHe:
        "מדדי-קיימות ממומשים ב-IBP כ-Key Figures מחושבים: למשל carbon footprint = Σ(volume × emission-factor) לכל שלב (ייצור, אחסון, הובלה), כאשר ה-emission-factors הם נתוני-אב. ניתן לשלבם ב-supply optimizer כ-constraint או כרכיב במשקל-העלות (cost-to-serve מורחב), ולנטרם ב-Analytics לצד OTIF/inventory. שילוב עם נתוני-קיימות חיצוניים (למשל SAP Sustainability Footprint Management / scope 1-2-3) מתבצע דרך Data Integration.",
      purposeHe:
        "להפוך קיימות מ'דוח-שנתי נפרד' לחלק מהחלטת-ה-S&OP השוטפת: לבחור תרחיש שמאזן שירות, עלות וטביעת-רגל-פחמנית, ולעמוד ביעדי-ESG ורגולציה תוך שמירה על ביצועים-מסחריים.",
      processExampleHe:
        "תרחיש-אספקה: build-ahead מרכזי מקטין עלות-ייצור אך מגדיל הובלות-חירום (פליטות גבוהות). ה-Operating Review משווה שני תרחישים גם ב-carbon footprint: התרחיש ה'זול' מזהם 12% יותר. ההנהלה בוחרת תרחיש-ביניים שעומד גם ביעד-הפליטות.",
      cbcHe:
        "ב-CBC מדדי-קיימות: CO2e לליטר-משקה (ייצור+הובלה), אחוז-PET-ממוחזר באריזה, צריכת-מים-לליטר (water ratio) ופסולת-לפסולת-אפס. תוכנית-קיץ עם build-ahead נבחנת גם מול יעד-הפליטות; אופטימיזציה של רשת-ההפצה מצמצמת ק\"מ-משאית ופליטות.",
      navHe: [
        "SAP IBP Web UI ► Configuration ► Key Figures (Sustainability KPIs — CO2e/energy/water)",
        "SAP IBP Web UI ► Analytics ► Sustainability Dashboard",
        "SAP IBP ► Data Integration ► Emission Factors / Sustainability Footprint",
      ],
      tables: ["Carbon Footprint", "Emission Factor", "Energy/Water Consumption", "Recycling Rate", "Supplier Score"],
      tcodes: ["Configuration", "Analytics", "Data Integration", "Custom Alerts"],
      fiori: ["Analytics", "Dashboards", "Custom Alerts"],
      configHe: [
        "Key Figures: carbon footprint (CO2e), energy/water, recycling/waste %, supplier sustainability score.",
        "Emission factors כנתוני-אב; carbon = Σ(volume × factor) לפי שלב.",
        "שילוב ב-supply optimizer כ-constraint או כרכיב-עלות מורחב.",
        "Data Integration לנתוני scope 1-2-3 / SAP Sustainability Footprint Management.",
      ],
      flow: [
        { he: "טעינת emission factors", code: "Data Integration" },
        { he: "carbon = volume × factor", code: "Key Figure" },
        { he: "שילוב בתכנון", code: "Optimizer", note: "constraint/עלות" },
        { he: "ניטור לצד מסחרי", code: "Analytics" },
        { he: "השוואת תרחישים", code: "Scenario", note: "שירות/עלות/CO2e" },
        { he: "החלטה מאוזנת", code: "Review" },
      ],
      masterDataHe: [
        "Emission factors לכל שלב (ייצור/אחסון/הובלה) הם נתוני-אב קריטיים.",
        "Supplier sustainability scores מוזנים מהערכת-ספקים חיצונית.",
      ],
      mistakesHe: [
        "ניהול קיימות בדוח נפרד ולא כ-KPI בתוך ה-S&OP — לא משפיע על החלטות.",
        "emission factors לא-מעודכנים — מדד-פחמן שגוי.",
        "בחירת תרחיש לפי עלות בלבד בלי עדשת-פחמן.",
        "מדידת scope 1-2 בלבד והתעלמות מ-scope 3 (שרשרת-האספקה).",
      ],
      troubleshootHe: [
        "carbon footprint לא-סביר ➔ emission factors שגויים או יחידות לא-תואמות.",
        "הקיימות לא משפיעה על התוכנית ➔ לא שולבה כ-constraint/עלות ב-optimizer.",
        "פערים מול דוח-ESG ➔ scope/גבולות-מדידה שונים בין IBP למקור-החיצוני.",
      ],
      bestPracticeHe: [
        "הטמע מדדי-קיימות כ-Key Figures לצד שירות/עלות/מלאי — לא בנפרד.",
        "השווה תרחישים גם בעדשת-פחמן, לא רק עלות.",
        "תחזק emission factors מעודכנים כנתוני-אב.",
        "כלול scope 3 (שרשרת-אספקה) ולא רק 1-2.",
      ],
      interviewHe: [
        { qHe: "כיצד משלבים קיימות ב-S&OP עם IBP?", aHe: "כ-Key Figures מחושבים (CO2e/energy/water) המנוטרים לצד מדדים-מסחריים, וכן כ-constraint או רכיב-עלות ב-supply optimizer, כך שכל תרחיש נשקל גם סביבתית." },
        { qHe: "כיצד מחושב carbon footprint ב-IBP?", aHe: "Σ(volume × emission-factor) לכל שלב (ייצור, אחסון, הובלה), כש-emission factors הם נתוני-אב, לרוב מוזרמים דרך Data Integration." },
        { qHe: "מהו ההבדל בין scope 1-2 ל-scope 3?", aHe: "scope 1-2 = פליטות ישירות ואנרגיה-נרכשת של הארגון; scope 3 = פליטות שרשרת-הערך (ספקים, הובלה, שימוש). ב-S&OP scope 3 הוא לרוב הגדול והקשה-למדידה." },
      ],
      takeawaysHe: [
        "קיימות = ממד רביעי ב-S&OP לצד שירות/עלות/מלאי.",
        "ב-IBP מדדי-קיימות הם Key Figures (CO2e/energy/water/recycling).",
        "שלב אותם בתכנון (constraint/עלות), לא רק בניטור.",
        "כלול scope 3 ותחזק emission factors מעודכנים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Operating Review KPIs (12.1.5)", href: "/library/sop/chapter-12/#sub-12.1.5" },
      ],
    },
    // ============================================================ 12.3
    {
      id: "12.3",
      titleHe: "ניטור ושיפור מתמיד",
      titleEn: "Monitoring and Continuous Improvement",
      execHe:
        "מדידה היא רק חצי מהסיפור; הניטור-והשיפור-המתמיד הופך מדדים לפעולה. פרק זה מציג שלוש מסגרות משלימות: balanced scorecard (תרגום אסטרטגיה למדדים מאוזנים), root-cause analysis (איתור שורש-הבעיה מאחורי חריגת-KPI), ו-DMAIC (Define, Measure, Analyze, Improve, Control — מתודולוגיית-שיפור מובנית). יחד הן סוגרות את לולאת-המשוב של ה-S&OP.",
      beginnerHe:
        "אחרי שמדדנו וראינו ש-KPI חורג, מה עושים? לא מספיק להגיד 'המספר אדום'. צריך לדעת למה (root-cause), לוודא שאנחנו מודדים את הדברים-הנכונים ובאיזון (balanced scorecard), ולנהל תהליך-שיפור מסודר עד שהבעיה נפתרת ולא חוזרת (DMAIC). אלה הכלים שהופכים מדידה לשיפור-אמיתי.",
      consultantHe:
        "ב-IBP לולאת-השיפור נתמכת ב-Custom Alerts (זיהוי-חריגה), Analytics drill-down (ניתוח), ו-Process Management / case management חיצוני למעקב-משימות. החשוב הוא ממשל (governance): לכל KPI חורג מוגדרים בעלים, action item, מועד-יעד ובקרת-סגירה. השיפור-המתמיד הוא חלק מ-S&OP maturity — מעבר מתגובתי (לכבות שריפות) למניעתי (לתקן שורשים). שלוש המסגרות נטועות ב-Lean/Six Sigma ובניהול-איכות.",
      purposeHe:
        "לסגור את הפער בין 'לדעת שיש בעיה' לבין 'לפתור אותה לתמיד': לתרגם חריגות-KPI לפעולות-שיפור מנוהלות, ולהבטיח שהשיפור נשמר לאורך-זמן (sustained, לא חד-פעמי).",
      processExampleHe:
        "Custom Alert מסמן ירידת-OTIF. במקום תיקון-נקודתי, הצוות מפעיל root-cause (5 Whys) ומגלה כשל-תזמון-חוזר; פותח פרויקט-DMAIC קצר; מוסיף את ה-OTIF ל-balanced scorecard עם בעלים ויעד; ובקרת-ה-Control מוודאת שהשיפור נשמר במחזורים הבאים.",
      cbcHe:
        "ב-CBC ירידה-חוזרת ב-fill rate של מותג-קיץ מנוהלת בלולאה: Alert ➔ root-cause (חוסר-בקבוקים מספק) ➔ DMAIC (חוזה-אספקה + safety stock) ➔ balanced scorecard מאזן שירות/עלות/קיימות ➔ Control מוודא יציבות לאורך הקיץ.",
      navHe: [
        "SAP IBP Web UI ► Custom Alerts ► Monitor & Manage",
        "SAP IBP Web UI ► Analytics ► Drill-Down (Root-Cause)",
        "SAP IBP ► Process Management / Tasks (governance של action items)",
      ],
      tables: ["Alert", "Action Item", "Balanced Scorecard", "Root Cause", "DMAIC Project"],
      tcodes: ["Custom Alerts", "Analytics", "Process Management"],
      fiori: ["Custom Alerts", "Analytics", "Process Management"],
      configHe: [
        "Custom Alerts לזיהוי-חריגה אוטומטי בכל מחזור.",
        "Analytics drill-down לניתוח שורש-הבעיה.",
        "Governance: בעלים, action item, מועד-יעד ובקרת-סגירה לכל KPI חורג.",
        "מסגרות-שיפור (scorecard/RCA/DMAIC) משולבות בקצב-ה-S&OP.",
      ],
      flow: [
        { he: "זיהוי חריגה", code: "Custom Alert" },
        { he: "ניתוח שורש", code: "Root-Cause", note: "5 Whys/Fishbone" },
        { he: "תיעדוף לפי scorecard", code: "Balanced Scorecard" },
        { he: "פרויקט-שיפור", code: "DMAIC" },
        { he: "בקרת-קיימות", code: "Control" },
        { he: "סגירה ולמידה", code: "Governance" },
      ],
      masterDataHe: [
        "מבנה ממשל (owners/action items) הוא 'נתון-אב' תהליכי של השיפור.",
        "Scorecard targets קושרים מדדים לאסטרטגיה.",
      ],
      mistakesHe: [
        "תיקון-תסמין במקום שורש — הבעיה חוזרת.",
        "חריגות בלי בעלים ומועד — 'מי-שמע-מי-ראה'.",
        "השמטת שלב-Control — השיפור דועך.",
        "scorecard חד-ממדי (רק כספים) — אופטימיזציה-מקומית.",
      ],
      troubleshootHe: [
        "אותו KPI חורג שוב ושוב ➔ טופל התסמין; הפעל RCA ו-DMAIC.",
        "פעולות-שיפור לא נסגרות ➔ חסר ממשל (owner/מועד/בקרה).",
        "שיפור דעך אחרי חודש ➔ דלג על שלב-Control.",
      ],
      bestPracticeHe: [
        "נהל לולאת-משוב: Alert ➔ RCA ➔ DMAIC ➔ Control.",
        "לכל חריגה — בעלים, action item ומועד-יעד.",
        "אזן את ה-scorecard בין כספים, לקוח, תהליך וקיימות.",
        "מדוד את בשלות (maturity) ה-S&OP ושאף למניעתי.",
      ],
      interviewHe: [
        { qHe: "מהי לולאת השיפור-המתמיד ב-S&OP?", aHe: "זיהוי-חריגה (Alert) ➔ ניתוח-שורש (RCA) ➔ פרויקט-שיפור מובנה (DMAIC) ➔ בקרת-קיימות (Control) ➔ ממשל וסגירה. כך מדידה הופכת לשיפור-נשמר." },
        { qHe: "מהן שלוש מסגרות-השיפור בפרק זה?", aHe: "balanced scorecard (מדדים מאוזנים ליישור-אסטרטגי), root-cause analysis (איתור שורש-הבעיה), ו-DMAIC (מתודולוגיית-שיפור מובנית)." },
        { qHe: "מדוע שלב Control קריטי?", aHe: "בלעדיו השיפור חד-פעמי ודועך; Control מקבע את התהליך-המשופר (בקרות/ניטור) כך שהבעיה לא חוזרת." },
      ],
      takeawaysHe: [
        "ניטור-ושיפור הופך מדידה לפעולה-נשמרת.",
        "שלוש מסגרות: balanced scorecard, root-cause analysis, DMAIC.",
        "כל חריגה דורשת בעלים, action item ובקרת-סגירה.",
        "שאף ממעבר תגובתי למניעתי (S&OP maturity).",
      ],
      children: [
        {
          id: "12.3.1",
          titleHe: "כרטיס-ניקוד מאוזן",
          titleEn: "Balanced Scorecard",
          execHe:
            "ה-balanced scorecard מתרגם את האסטרטגיה למערך-מדדים מאוזן בארבעה מבטים: פיננסי, לקוח, תהליכים-פנימיים, ולמידה-וצמיחה. הוא מונע 'אופטימיזציה-של-מדד-יחיד' (כמו עלות בלבד) ומבטיח שכל מדדי-ה-S&OP מיושרים ליעד-האסטרטגי, מאוזנים זה מול זה.",
          beginnerHe:
            "אם מודדים רק עלות, יחתכו במלאי עד שהשירות יקרוס. ה-balanced scorecard אומר: מדוד ארבעה דברים יחד — כסף (פיננסי), שביעות-רצון-לקוח, יעילות-תהליכים, ויכולת-להשתפר (אנשים/מערכות). כך אף מבט לא 'נמחץ' לטובת אחר.",
          consultantHe:
            "ארבעת המבטים (Kaplan & Norton): Financial (revenue/margin/working capital), Customer (OTIF/fill rate/שביעות-רצון), Internal Process (forecast accuracy/plan adherence/cycle time), Learning & Growth (S&OP maturity/הכשרה/אימוץ-מערכת). ב-IBP כל מבט מיוצג ב-Dashboard עם Key Figures, ולכל מדד יעד-אסטרטגי. ה-scorecard מקשר cause-and-effect: למידה→תהליך→לקוח→פיננסי.",
          purposeHe:
            "להבטיח יישור-אסטרטגי ואיזון — שתוכנית-ה-S&OP תקדם את כל המבטים-העסקיים, ולא תשפר מדד-אחד על-חשבון אחר.",
          processExampleHe:
            "Executive Review סוקר scorecard: Financial ירוק, אך Customer (OTIF) אדום ו-Internal Process (accuracy) צהוב. הקשר-הסיבתי מצביע: accuracy-נמוך ➔ OTIF-נמוך. ההחלטה ממקדת השקעה בשיפור-accuracy (מבט-תהליך) כדי לרפא את מבט-הלקוח.",
          cbcHe:
            "ב-CBC scorecard ל-S&OP: Financial = margin-לליטר; Customer = OTIF-לרשתות; Process = forecast accuracy ו-line adherence; Learning & Growth = אימוץ-IBP ובשלות-S&OP. קיימות מתווספת כמבט-חמישי (CO2e לליטר).",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Balanced Scorecard Dashboard",
            "SAP IBP Web UI ► Dashboards (ארבעה מבטים)",
          ],
          tables: ["Financial Perspective", "Customer Perspective", "Internal Process", "Learning & Growth", "Strategic Target"],
          tcodes: ["Analytics", "Dashboards"],
          fiori: ["Analytics", "Dashboards"],
          configHe: [
            "הגדר Key Figures לכל מבט: Financial/Customer/Internal Process/Learning & Growth.",
            "לכל מדד — יעד-אסטרטגי וסף.",
            "Dashboard המאגד את ארבעת המבטים בתצוגה אחת.",
            "מפה קשרי cause-and-effect בין המבטים.",
          ],
          flow: [
            { he: "תרגום אסטרטגיה", code: "Strategy" },
            { he: "ארבעה מבטים", code: "Perspectives" },
            { he: "Key Figures + יעדים", code: "Targets" },
            { he: "מפת cause-and-effect", code: "Map" },
            { he: "סקירה מאוזנת", code: "Dashboard" },
          ],
          masterDataHe: [
            "Strategic targets לכל מבט הם 'נתון-האב' של ה-scorecard.",
            "מיפוי cause-and-effect מקשר מדדים בין מבטים.",
          ],
          mistakesHe: [
            "מדידת מבט-יחיד (פיננסי) — מפר את האיזון.",
            "ריבוי-מדדים בכל מבט — מאבד מיקוד.",
            "מדדים בלי קשרי-סיבתיות — אוסף-מספרים ולא אסטרטגיה.",
            "scorecard סטטי שלא מתעדכן עם האסטרטגיה.",
          ],
          troubleshootHe: [
            "מבט-אחד תמיד אדום ➔ בדוק קשר-סיבתי למבט-מקור (למשל accuracy→OTIF).",
            "scorecard 'יפה' אך עסק מדשדש ➔ מדדים לא מיושרים לאסטרטגיה.",
            "מבט learning & growth ריק ➔ חסרים מדדי-בשלות/אימוץ.",
          ],
          bestPracticeHe: [
            "אזן בין ארבעת המבטים — אל תעדיף אחד.",
            "מעט מדדים-מנחים לכל מבט.",
            "מפה קשרי cause-and-effect מפורשים.",
            "עדכן את ה-scorecard עם שינויי-אסטרטגיה; שקול מבט-קיימות חמישי.",
          ],
          interviewHe: [
            { qHe: "מהם ארבעת המבטים של balanced scorecard?", aHe: "Financial, Customer, Internal Process, ו-Learning & Growth. הם מאזנים מדדים-כספיים מול לקוח, תהליך ויכולת-התפתחות." },
            { qHe: "מדוע balanced scorecard מתאים ל-S&OP?", aHe: "S&OP מאזן שירות, עלות ומלאי; ה-scorecard מבטיח שהמדדים מיושרים-לאסטרטגיה ומאוזנים, ומונע אופטימיזציה של מדד-יחיד." },
            { qHe: "מהו קשר cause-and-effect ב-scorecard?", aHe: "שרשרת-לוגית בין המבטים — למידה→תהליך→לקוח→פיננסי — המסבירה כיצד שיפור-מדד-אחד מניע אחר." },
          ],
          takeawaysHe: [
            "balanced scorecard = ארבעה מבטים מאוזנים.",
            "מונע אופטימיזציה של מדד-יחיד.",
            "כל מדד מיושר לאסטרטגיה עם יעד.",
            "קשרי cause-and-effect הופכים מספרים לאסטרטגיה.",
          ],
        },
        {
          id: "12.3.2",
          titleHe: "ניתוח שורש-הבעיה",
          titleEn: "Root-Cause Analysis",
          execHe:
            "root-cause analysis (RCA) הוא תהליך מובנה לאיתור הסיבה-השורשית מאחורי חריגת-KPI, במקום טיפול-בתסמין. כלים מרכזיים: 5 Whys (חמש 'למה' רצופות) ו-Fishbone / Ishikawa diagram (תרשים סיבה-ותוצאה לפי קטגוריות). RCA מבטיח שהבעיה נפתרת בשורש ולא חוזרת.",
          beginnerHe:
            "כש-KPI אדום, הפיתוי הוא לתקן את התסמין ('חסר מלאי — נזמין עוד'). RCA אומר: שאל 'למה?' שוב ושוב עד שמגיעים לסיבה-האמיתית. אולי המלאי חסר כי התחזית שגויה, כי נתוני-המבצע לא הגיעו בזמן — וזו הבעיה שצריך לתקן.",
          consultantHe:
            "5 Whys: שואלים 'למה' ~5 פעמים עד הסיבה-השורשית. Fishbone מארגן סיבות-אפשריות לקטגוריות (לרוב 6M: Man, Machine, Method, Material, Measurement, Mother-Nature/Environment). ב-S&OP מקורות-שורש נפוצים: data quality, master data שגוי, תהליך-לא-מתואם, מודל-תחזית לא-מתאים. ב-IBP, Analytics drill-down ו-Alert root-cause מספקים את הראיות-הכמותיות שמזינות את ה-RCA.",
          purposeHe:
            "למנוע חזרת-בעיות: לזהות ולתקן את הסיבה-השורשית של חריגת-KPI, במקום לכבות-שריפות שוב ושוב על אותו תסמין.",
          processExampleHe:
            "OTIF צנח. 5 Whys: למה? משלוחים-מאוחרים. למה? חוסר-מלאי-מוגמר. למה? תחזית-נמוכה-מדי. למה? לא שוקלל מבצע. למה? נתוני-המבצע לא הגיעו ל-Demand Planning בזמן ➔ שורש = ממשק-נתונים. התיקון: אוטומציית-ממשק, לא רק 'להזמין-עוד'.",
          cbcHe:
            "ב-CBC נפילת fill rate בקיץ: Fishbone חושף — Material (חוסר-בקבוקים מספק), Method (safety stock נמוך), Measurement (תחזית-מבצע שגויה). השורש הדומיננטי: חוזה-אספקת-בקבוקים לא-מותאם-לשיא. תיקון בשורש מונע חזרה בקיץ הבא.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Drill-Down (ראיות כמותיות)",
            "SAP IBP Web UI ► Custom Alerts ► Alert Root-Cause",
          ],
          tables: ["5 Whys", "Fishbone / Ishikawa", "Root Cause", "Data Quality", "Master Data"],
          tcodes: ["Analytics", "Custom Alerts"],
          fiori: ["Analytics", "Custom Alerts"],
          configHe: [
            "השתמש ב-Analytics drill-down לאיסוף ראיות כמותיות לחריגה.",
            "5 Whys: תעד שרשרת-'למה' עד השורש.",
            "Fishbone: ארגן סיבות לקטגוריות 6M.",
            "תעד שורש ➔ פעולת-תיקון ➔ בעלים (חיבור ל-governance).",
          ],
          flow: [
            { he: "חריגת-KPI", code: "Alert" },
            { he: "איסוף ראיות", code: "Drill-Down" },
            { he: "5 Whys", code: "5 Whys" },
            { he: "מיפוי סיבות", code: "Fishbone", note: "6M" },
            { he: "זיהוי שורש", code: "Root Cause" },
            { he: "פעולת-תיקון", code: "Action" },
          ],
          masterDataHe: [
            "Master data ו-data quality הם מקורות-שורש נפוצים — בדוק אותם ראשונים.",
            "תיעוד ה-RCA נשמר כ'נכס-ידע' למניעת-חזרה.",
          ],
          mistakesHe: [
            "עצירה בתסמין הראשון בלי להמשיך לשאול 'למה'.",
            "האשמת-אנשים (Man) במקום תהליך/נתונים.",
            "RCA בלי ראיות כמותיות — ניחוש.",
            "אי-תיעוד השורש — הבעיה חוזרת בלי זיכרון.",
          ],
          troubleshootHe: [
            "אותה חריגה חוזרת ➔ טופל תסמין; חזור על 5 Whys עד שורש-אמיתי.",
            "RCA 'תקוע' ➔ חסרות ראיות; הפעל drill-down ב-Analytics.",
            "ריבוי שורשים-אפשריים ➔ Fishbone לתיעדוף לפי השפעה.",
          ],
          bestPracticeHe: [
            "המשך 5 Whys עד שהשורש בר-תיקון-תהליכי.",
            "בסס RCA על ראיות כמותיות מ-Analytics.",
            "בדוק data quality / master data כחשודים-ראשונים ב-S&OP.",
            "תעד שורש ופעולה — בנה זיכרון-ארגוני.",
          ],
          interviewHe: [
            { qHe: "מהו 5 Whys?", aHe: "טכניקת-RCA שבה שואלים 'למה?' חמש פעמים (בערך) עד הסיבה-השורשית, במקום לעצור בתסמין." },
            { qHe: "מהו Fishbone / Ishikawa diagram?", aHe: "תרשים סיבה-ותוצאה הממיין סיבות-אפשריות לקטגוריות (6M: Man/Machine/Method/Material/Measurement/Environment) לזיהוי שיטתי של השורש." },
            { qHe: "מהם מקורות-שורש נפוצים ב-S&OP?", aHe: "data quality, master data שגוי, תהליך-לא-מתואם בין מחלקות, ומודל-תחזית לא-מתאים." },
          ],
          takeawaysHe: [
            "RCA מטפל בשורש, לא בתסמין.",
            "כלים: 5 Whys ו-Fishbone (6M).",
            "בסס על ראיות כמותיות מ-Analytics.",
            "בדוק תחילה data quality ו-master data.",
          ],
        },
        {
          id: "12.3.3",
          titleHe: "הגדרה, מדידה, ניתוח, שיפור ובקרה",
          titleEn: "Define, Measure, Analyze, Improve, and Control",
          execHe:
            "DMAIC (Define, Measure, Analyze, Improve, Control) היא מתודולוגיית-השיפור המובנית של Six Sigma, מותאמת לשיפור-תהליכי-S&OP. היא מובילה פרויקט-שיפור בחמישה שלבים ממושמעים — מהגדרת-הבעיה ועד קיבוע-הפתרון — ומבטיחה שיפור מבוסס-נתונים ונשמר-לאורך-זמן.",
          beginnerHe:
            "DMAIC הוא מתכון בן חמישה צעדים לתקן בעיה ולוודא שהיא לא חוזרת: Define (מה הבעיה?), Measure (מה המצב-הנוכחי במספרים?), Analyze (מה השורש?), Improve (מה הפתרון ויישומו?), Control (איך נשמור שזה יישאר טוב?).",
          consultantHe:
            "Define — אמנת-פרויקט, היקף, KPI-מטרה (CTQ). Measure — איסוף-נתוני-בסיס (baseline) ויכולת-תהליך. Analyze — RCA (5 Whys/Fishbone) ואימות-שורש סטטיסטי. Improve — עיצוב-פתרון, פיילוט ויישום. Control — תכנית-בקרה, ניטור-מתמשך ותקנון. ב-IBP: Measure/Control נשענים על Key Figures ו-Custom Alerts; Analyze על Analytics drill-down; ה-baseline נשמר ב-snapshot. DMAIC משלים את RCA (שהוא ה-Analyze) וניזון מה-balanced scorecard (בחירת-המטרה).",
          purposeHe:
            "לנהל שיפור-תהליכי בצורה ממושמעת ומבוססת-נתונים, כך שהשיפור אמיתי, נמדד, ונשמר — ולא יוזמה חד-פעמית שדועכת.",
          processExampleHe:
            "פרויקט-DMAIC לשיפור forecast accuracy: Define — accuracy 78%, יעד 90% למותג-מפתח. Measure — baseline + פילוח-שגיאה. Analyze — RCA: מבצעים לא-משוקללים. Improve — שילוב לוח-מבצעים בתחזית; פיילוט. Control — Custom Alert על accuracy + תקנון-תהליך-מבצעים. accuracy עלה ל-89% ונשמר.",
          cbcHe:
            "ב-CBC DMAIC לשיפור fill rate בקיץ: Define (fill rate 91%→97%); Measure (baseline + פילוח-מותג); Analyze (חוסר-בקבוקים); Improve (חוזה-אספקה + safety stock דינמי); Control (Alert על DoS-בקבוקים ותקנון-הזמנה). השיפור נשמר לאורך הקיץ.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Baseline & Drill-Down (Measure/Analyze)",
            "SAP IBP Web UI ► Custom Alerts (Control)",
            "SAP IBP ► Process Management / Tasks (Define/Improve governance)",
          ],
          tables: ["Define", "Measure", "Analyze", "Improve", "Control"],
          tcodes: ["Analytics", "Custom Alerts", "Process Management"],
          fiori: ["Analytics", "Custom Alerts", "Process Management"],
          configHe: [
            "Define: אמנת-פרויקט, KPI-מטרה (CTQ), היקף ובעלים.",
            "Measure: baseline מ-snapshot + פילוח-Key Figures.",
            "Analyze: RCA (5 Whys/Fishbone) + drill-down ב-Analytics.",
            "Improve + Control: יישום-פתרון; Custom Alerts ותקנון לקיבוע.",
          ],
          flow: [
            { he: "Define — הגדרת בעיה+יעד", code: "Define", note: "CTQ" },
            { he: "Measure — baseline", code: "Measure", note: "snapshot" },
            { he: "Analyze — שורש", code: "Analyze", note: "RCA" },
            { he: "Improve — פתרון+פיילוט", code: "Improve" },
            { he: "Control — קיבוע+ניטור", code: "Control", note: "Alert" },
          ],
          masterDataHe: [
            "baseline (snapshot) הוא נקודת-הייחוס למדידת-השיפור.",
            "תכנית-בקרה (Control plan) מקבעת את התהליך-המשופר.",
          ],
          mistakesHe: [
            "דילוג ל-Improve בלי Measure/Analyze — פתרון-לבעיה-הלא-נכונה.",
            "Define מעורפל — היקף-זוחל וכישלון-פרויקט.",
            "השמטת Control — השיפור דועך.",
            "Improve בלי פיילוט — סיכון בקנה-מידה-מלא.",
          ],
          troubleshootHe: [
            "השיפור לא מחזיק ➔ שלב Control חלש; הוסף Alert ותקנון.",
            "הפתרון לא עזר ➔ Analyze שגוי; חזור ל-RCA.",
            "הפרויקט נתקע ➔ Define לא-חד; חדד CTQ והיקף.",
          ],
          bestPracticeHe: [
            "אל תדלג שלבים — סדר ה-DMAIC הוא המשמעת.",
            "בסס Measure/Control על Key Figures ו-Custom Alerts ב-IBP.",
            "השתמש ב-RCA כליבת ה-Analyze.",
            "קבע Control plan לפני סגירת-הפרויקט.",
          ],
          interviewHe: [
            { qHe: "מהם חמשת שלבי DMAIC?", aHe: "Define (הגדרת-בעיה+יעד), Measure (baseline), Analyze (שורש), Improve (פתרון+יישום), Control (קיבוע+ניטור)." },
            { qHe: "כיצד DMAIC מתחבר ל-RCA?", aHe: "ה-RCA (5 Whys/Fishbone) הוא ליבת שלב ה-Analyze — שם מאתרים ומאמתים את הסיבה-השורשית לפני עיצוב-הפתרון." },
            { qHe: "מדוע שלב Control מבדיל בין שיפור-נשמר לבין יוזמה-שדועכת?", aHe: "Control מקבע את התהליך-המשופר בבקרות ובניטור-מתמשך (ב-IBP: Custom Alerts ותקנון), כך שהשיפור לא נסוג למצב-הקודם." },
          ],
          takeawaysHe: [
            "DMAIC = Define, Measure, Analyze, Improve, Control.",
            "מתודולוגיית-שיפור מובנית מבוססת-נתונים.",
            "Analyze נשען על RCA; Measure/Control על Key Figures ו-Alerts.",
            "Control הוא מה שהופך שיפור לנשמר.",
          ],
          relatedHe: [
            { labelHe: "S&OP · Root-Cause Analysis (12.3.2)", href: "/library/sop/chapter-12/#sub-12.3.2" },
          ],
        },
      ],
    },
    // ============================================================ 12.4
    {
      id: "12.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד מדדי-ביצוע (KPIs) וניטור הופכים את ה-S&OP מתהליך-תכנון לתהליך-ניהול מבוסס-עובדות. ראינו כיצד KPIs עובדים (מדידה+יעד+סף), כיצד נצרכים ב-SAP IBP (Analytics/Dashboards/Excel/Alerts), אילו מדדים שייכים לכל מפגש-סקירה, כיצד הקיימות מתווספת כממד, וכיצד balanced scorecard, root-cause analysis ו-DMAIC סוגרים את לולאת-השיפור-המתמיד.",
      beginnerHe:
        "סיכום הפרק: KPI הוא מספר עם יעד וסף שאומר אם אנחנו בכיוון. ב-IBP רואים אותו בגרפים, לוחות, Excel והתראות. לכל פגישה (ביקוש, אספקה, תפעולית, הנהלה) יש המדדים שלה. הוספנו ממד-קיימות. וכשמשהו חורג — מנתחים שורש, מתקנים ב-DMAIC, ומאזנים עם scorecard כדי שהשיפור יישאר.",
      consultantHe:
        "מבחינת-מימוש: כל KPI הוא Key Figure ב-Planning Area עם נוסחה, Calculation Level ו-snapshot/version לנעילת-דיוק. forecast accuracy (1−MAPE) ו-bias שייכים ל-Demand Review; capacity/adherence/DoS ל-Supply Review; fill rate/OTIF/turns ל-Operating Review; revenue/margin/working capital ל-Executive Review; CO2e/scope-3 לקיימות. הניטור נשען על Custom Alerts ו-Analytics drill-down, והשיפור על RCA ו-DMAIC תחת balanced scorecard וממשל. זו לולאת ה-S&OP המלאה: plan → measure → analyze → improve → control.",
      purposeHe:
        "לקשור את כל חלקי-הפרק לתמונה-אחת: מדידה נכונה, צריכה נכונה, מדדים-נכונים-לכל-מפגש, ממד-קיימות, ולולאת-שיפור-מתמיד — כדי שה-S&OP יהיה לא רק מתואם אלא גם משתפר-מחזור-אחר-מחזור.",
      processExampleHe:
        "מחזור-S&OP שלם בעדשת-מדדים: snapshot ➔ actuals ➔ accuracy/bias (Demand) ➔ utilization/DoS (Supply) ➔ fill rate/OTIF (Operating) ➔ revenue/margin (Executive) ➔ CO2e (קיימות) ➔ Alert על חריגה ➔ RCA+DMAIC ➔ scorecard מאוזן ➔ מחזור משופר.",
      cbcHe:
        "ב-CBC המסע: forecast accuracy לפי מותג ➔ ניצולת-קווי-מילוי ➔ fill rate ו-OTIF לרשתות ➔ margin אחרי build-ahead ➔ CO2e לליטר ➔ Alert+RCA+DMAIC על fill-rate-קיץ ➔ scorecard המאזן שירות/עלות/קיימות. כל קיץ טוב מהקודם.",
      navHe: [
        "SAP IBP Web UI ► Analytics / Dashboards (כל מדדי-הפרק)",
        "SAP IBP Web UI ► Custom Alerts (ניטור)",
        "SAP IBP ► Configuration ► Key Figures (הגדרת KPIs)",
      ],
      tables: ["KPI", "Key Figure", "Balanced Scorecard", "DMAIC", "Custom Alert"],
      tcodes: ["Analytics", "Dashboards", "Custom Alerts", "Configuration"],
      fiori: ["Analytics", "Dashboards", "Custom Alerts"],
      configHe: [
        "כל KPI = Key Figure עם נוסחה + Calculation Level + snapshot/version.",
        "מדדים מותאמים לכל מפגש-סקירה (Demand/Supply/Operating/Executive) + קיימות.",
        "ניטור: Custom Alerts; ניתוח: Analytics drill-down.",
        "שיפור: balanced scorecard + RCA + DMAIC תחת ממשל.",
      ],
      flow: [
        { he: "מדידה", code: "Key Figure" },
        { he: "צריכה", code: "Analytics/Excel" },
        { he: "מדדים-לכל-מפגש", code: "Reviews" },
        { he: "ממד-קיימות", code: "CO2e" },
        { he: "ניטור+שיפור", code: "Alert/DMAIC" },
        { he: "מחזור משופר", code: "Continuous" },
      ],
      masterDataHe: [
        "Planning Area + Key Figures + snapshots הם תשתית כל המדידה.",
        "ממשל (owners/targets) הוא תשתית כל השיפור.",
      ],
      mistakesHe: [
        "מדידה בלי שיפור — מספרים-יפים ללא פעולה.",
        "מדדים אחידים לכל המפגשים במקום מדדים-מותאמים.",
        "התעלמות מקיימות כממד-החלטה.",
        "שיפור בלי Control — דועך.",
      ],
      troubleshootHe: [
        "ה-S&OP לא משתפר בין מחזורים ➔ חסרה לולאת RCA→DMAIC→Control.",
        "מפגשים דנים בדעות ➔ חסרים KPIs מותאמים עם יעד/סף.",
        "מספרים-שונים-בכל-מסך ➔ snapshot/version לא-עקבי.",
      ],
      bestPracticeHe: [
        "סגור את הלולאה: plan→measure→analyze→improve→control.",
        "התאם מדדים לכל מפגש-סקירה.",
        "כלול קיימות כממד-החלטה לצד שירות/עלות/מלאי.",
        "נהל מדידה ושיפור תחת balanced scorecard וממשל.",
      ],
      interviewHe: [
        { qHe: "מהי לולאת ה-S&OP המלאה בעדשת-מדדים?", aHe: "plan → measure (KPIs) → analyze (RCA) → improve (DMAIC) → control, תחת balanced scorecard וממשל — כך ה-S&OP משתפר מחזור-אחר-מחזור." },
        { qHe: "אילו מדדים שייכים לכל מפגש-סקירה?", aHe: "Demand: accuracy/bias; Supply: utilization/adherence/DoS; Operating: fill rate/OTIF/turns; Executive: revenue/margin/working capital; וקיימות: CO2e/scope-3." },
        { qHe: "מה הופך מדידה לשיפור-נשמר?", aHe: "ניטור (Custom Alerts) שמזהה חריגה, RCA שמאתר שורש, DMAIC שמתקן בצורה ממושמעת, ו-Control + balanced scorecard ששומרים על האיזון לאורך-זמן." },
      ],
      takeawaysHe: [
        "KPIs הופכים את ה-S&OP לתהליך-ניהול מבוסס-עובדות.",
        "ב-IBP כל KPI = Key Figure; נצרך דרך Analytics/Dashboards/Excel/Alerts.",
        "לכל מפגש-סקירה מדדים-מותאמים; קיימות = ממד רביעי.",
        "balanced scorecard + RCA + DMAIC סוגרים את לולאת-השיפור-המתמיד.",
      ],
      relatedHe: [
        { labelHe: "S&OP · KPIs in SAP IBP (12.1)", href: "/library/sop/chapter-12/#sub-12.1" },
        { labelHe: "S&OP · Continuous Improvement (12.3)", href: "/library/sop/chapter-12/#sub-12.3" },
      ],
    },
  ],
};
