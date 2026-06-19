// ===== PP/DS Digital Textbook — Chapter 3 (Configuration) =====
// Every node is a complete 18-facet LearningNode of authored Hebrew —
// beginner + consultant friendly, config-heavy with rich SPRO navigation.
// Source hierarchy preserved exactly; x.y.z nested under x.y.
// Transformative Hebrew prose; SAP identifiers verbatim EN. CBC = Coca-Cola bottling.
import type { TextbookChapter } from "./types";

export const CH3: TextbookChapter = {
  n: 3,
  titleHe: "קונפיגורציה",
  titleEn: "Configuration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לקונפיגורציה של PP/DS המוטמע (Embedded PP/DS) ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל-מילוי משקאות), ניווט ו-SPRO מפורט, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הפרק מכסה את הפעלת PP/DS, הגדרות-בסיס (Model 000, אינטגרציה, העברת-נתונים, סכמת-קונפיגורציה, פרמטרים גלובליים, נתוני-אב), היוריסטיקות, נהלי-תכנון, תצוגת-הזמנות, לוח-התזמון המפורט (DS Board), יומני-יישום והאופטימייזר. המטרה: לשלוט בקונפיגורציה של PP/DS ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 3.1
    {
      id: "3.1",
      titleHe: "הפעלת PP/DS ב-SAP S/4HANA",
      titleEn: "Activating PP/DS in SAP S/4HANA",
      execHe:
        "הפעלת PP/DS היא צעד-הפתיחה שהופך את רכיב-התכנון-המתקדם מ-add-on נפרד (כפי שהיה ב-SAP APO) ל-Embedded PP/DS הרץ בתוך ליבת ה-S/4HANA על אותו בסיס-נתונים. ההפעלה נעשית דרך Business Function ו-scope item, ופותחת את עצי-ה-SPRO של Advanced Planning. ללא הפעלה זו אף הגדרת-PP/DS אינה זמינה — זהו 'מתג-הראשי' של כל הפרק.",
      beginnerHe:
        "תאר את PP/DS כמנוע-תכנון-מתקדם שכבר 'יושב בתוך' SAP S/4HANA, אך מגיע כבוי. לפני שאפשר להגדיר היוריסטיקות, אופטימייזר או לוח-תזמון, צריך להדליק אותו. ההדלקה היא הפעלת Business Function ייעודית והפעלת scope item של Advanced Planning. רק אחרי שהמתג דלוק, תפריטי ה-SPRO של 'Advanced Planning' מופיעים.",
      consultantHe:
        "Embedded PP/DS מופעל דרך ה-Business Function ובאמצעות scope item של Advanced Planning ב-Best Practices. נדרש רישוי (Advanced Planning license) והפעלת ה-Business Function אינה הפיכה (irreversible) — לכן בודקים תחילה בסביבת-בדק. לאחר ההפעלה נפתח ענף ה-SPRO תחת Advanced Planning ובו תת-הענף Production Planning and Detailed Scheduling (PP/DS). בניגוד ל-SAP APO הקלאסי, אין כאן מערכת liveCache נפרדת לתחזק כ-add-on — ה-liveCache משולב ב-S/4HANA. שים לב: ההפעלה רק 'פותחת' את הקומפוננטה; שום חומר אינו מתוכנן ב-PP/DS עד שמסומן Advanced Planning באב-החומר ומוגדר Model/Version.",
      purposeHe:
        "המטרה: להפוך תכנון-מתקדם (תזמון-סדר-עדינות, אופטימיזציה, פיזור-עומס) לזמין בתוך ה-ERP בלי מערכת חיצונית, אינטגרציית core-interface כבדה או סנכרון-נתונים בין שתי מערכות. כך מתקבל planning בזמן-אמת על נתוני-הליבה.",
      processExampleHe:
        "ארגון העובר מ-ECC עם APO נפרד מטמיע S/4HANA: צוות-הבסיס מפעיל את ה-Business Function ואת scope item של Advanced Planning בסביבת-QA, מאמת שתפריטי ה-SPRO של PP/DS נפתחו, ורק אז משכפל לסביבת-הייצור. מכאן ואילך הצוות-הפונקציונלי מגדיר Model 000, אינטגרציה ונתוני-אב.",
      cbcHe:
        "ב-CBC ההחלטה להפעיל PP/DS נובעת מהצורך לתזמן בעדינות החלפות-טעם וניקויי-CIP בין מוצרים על קווי-המילוי — דבר שתכנון-MRP בסיסי אינו עושה. צוות-הבסיס מפעיל את הקומפוננטה, ולאחר-מכן מסומנים המשקאות המוגמרים (FERT) לתכנון מתקדם.",
      navHe: [
        "SPRO ► SAP Reference IMG ► Advanced Planning (ענף-העל הנפתח לאחר ההפעלה)",
        "Activate Business Function for Advanced Planning (transaction SFW5 / scope item של Advanced Planning ב-SAP Best Practices)",
        "Advanced Planning ► Basic Settings (תת-ענף ה-Embedded PP/DS)",
      ],
      tables: ["TCAPP", "/SAPAPO/MATKEY", "/SAPAPO/MATMAP"],
      tcodes: ["SFW5", "SPRO", "/SAPAPO/RRP_NETCH"],
      fiori: ["F1605", "F2101"],
      configHe: [
        "Business Function: הפעלה דרך SFW5 / scope item של Advanced Planning — לא-הפיכה, תחילה בסביבת-בדק.",
        "רישוי: נדרש Advanced Planning license; ללא רישוי הקומפוננטה אינה זמינה לשימוש פרודקטיבי.",
        "אימות: לאחר ההפעלה ודא שענף ה-SPRO 'Advanced Planning ► Production Planning and Detailed Scheduling' נפתח.",
        "liveCache משולב: אין צורך להתקין/לתחזק liveCache נפרד כפי שב-APO הקלאסי.",
      ],
      flow: [
        { he: "בדיקת רישוי Advanced Planning", note: "תנאי-סף" },
        { he: "הפעלת Business Function", code: "SFW5", note: "לא-הפיכה" },
        { he: "אימות ענף SPRO נפתח", code: "SPRO" },
        { he: "מעבר להגדרות-בסיס", note: "Model 000 + אינטגרציה" },
      ],
      mistakesHe: [
        "הפעלת ה-Business Function ישירות בסביבת-ייצור — היא לא-הפיכה; תמיד בודקים ב-QA קודם.",
        "ציפייה שחומרים יתוכננו ב-PP/DS מיד לאחר ההפעלה — נדרש גם סימון Advanced Planning באב-החומר.",
        "התעלמות מדרישת-הרישוי — שימוש לא-מורשה ב-Advanced Planning.",
      ],
      troubleshootHe: [
        "תפריטי PP/DS לא מופיעים ב-SPRO ➔ ה-Business Function לא הופעל או scope item לא הוטמע.",
        "אין אפשרות לסמן חומר ל-Advanced Planning ➔ הקומפוננטה לא פעילה במלואה / חסר רישוי.",
        "שגיאת-הרשאה ➔ ודא שה-Business Function עבר activate מלא ולא נשאר ב-planned.",
      ],
      bestPracticeHe: [
        "הפעל ובדוק בסביבת-QA לפני ייצור; תעד את scope item שהוטמע.",
        "תאם עם צוות-הבסיס וה-Licensing לפני ההפעלה הלא-הפיכה.",
        "אמת מיידית שענפי ה-SPRO נפתחו — לפני שמתחילים הגדרות-בסיס.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין PP/DS ב-APO לבין Embedded PP/DS ב-S/4HANA?", aHe: "ב-APO זו מערכת נפרדת עם liveCache ו-CIF משלה; ב-S/4HANA זה רכיב מוטמע הרץ על ליבת-ה-ERP ועל אותו בסיס-נתונים, ללא מערכת חיצונית." },
        { qHe: "כיצד מפעילים PP/DS ב-S/4HANA?", aHe: "דרך הפעלת Business Function (SFW5) ו/או scope item של Advanced Planning. ההפעלה לא-הפיכה ודורשת רישוי." },
        { qHe: "האם הפעלת הקומפוננטה מספיקה כדי שחומר יתוכנן ב-PP/DS?", aHe: "לא — צריך גם לסמן את החומר ל-Advanced Planning באב-החומר ולהגדיר Model/Version ואינטגרציה." },
      ],
      takeawaysHe: [
        "PP/DS ב-S/4HANA הוא Embedded — רץ בתוך הליבה, ללא APO/liveCache נפרדים.",
        "הפעלה דרך Business Function (לא-הפיכה) + scope item של Advanced Planning, ודורשת רישוי.",
        "ההפעלה רק פותחת את הקומפוננטה; תכנון בפועל דורש סימון-חומר והגדרות-בסיס.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הגדרות-בסיס (3.2)", href: "/library/ppds/chapter-03/#sub-3.2" },
        { labelHe: "PP · אב חומר לייצור", href: "/library/pp/chapter-03/#sub-3.1" },
      ],
    },
    // ============================================================ 3.2
    {
      id: "3.2",
      titleHe: "הגדרות בסיס ל-PP/DS המוטמע",
      titleEn: "Basic Settings for Embedded PP/DS",
      execHe:
        "הגדרות-הבסיס הן התשתית שעליה כל תכנון-PP/DS עומד: ניהול-גרסת-המודל (Model 000 / Version 000), הגדרות-אינטגרציה בין הליבה ל-PP/DS, העברת נתוני-תנועה, סכמת-הקונפיגורציה של המערכת, פרמטרים גלובליים וברירות-מחדל, והגדרות נתוני-אב. בלי שכבה זו אין מה לתכנן ואין מודל-תכנון שיכיל את האובייקטים.",
      beginnerHe:
        "לפני שמתכננים, צריך 'מגרש-משחקים' שבו חיים כל אובייקטי-התכנון: חומרים, מרכזי-עבודה, הזמנות. ב-PP/DS המגרש הזה נקרא Model ו-Version, ותמיד עובדים עם Model 000 ו-Version 000 הפעילים. הגדרות-הבסיס גם קובעות אילו נתונים זורמים מהליבה לתוך המנוע, אילו ערכי-ברירת-מחדל חלים, וכיצד נתוני-האב מתנהגים. זו 'ההתקנה הראשונית' של המנוע.",
      consultantHe:
        "ב-Embedded PP/DS שכבת ה-Master Data Layer (אובייקטים בטבלאות /SAPAPO/*) נטענת אוטומטית מהליבה דרך מנגנון Production Data Structure / RTO, בלי CIF מלא כמו ב-APO. ה-Active Model תמיד 000 וה-Active Planning Version תמיד 000 — הם המודל היחיד שעליו מריצים תכנון פרודקטיבי. הגדרות-הבסיס כוללות: Global Parameters and Default Values, Integration Settings (אילו נתוני-תנועה ועסקה מועברים), ו-Configuration Schema. הבנת היחס Model↔Version והעובדה ש-000 הוא הפרודקטיבי היא קריטית למניעת תכנון 'בריק'.",
      purposeHe:
        "המטרה: לבסס סביבת-תכנון אחת, עקבית ומסונכרנת עם הליבה, שבה כל האובייקטים קיימים, ברירות-המחדל מוגדרות, והאינטגרציה מבטיחה שכל שינוי בליבה משתקף בתכנון ולהפך.",
      processExampleHe:
        "בהקמת PP/DS היועץ מאמת ש-Model 000/Version 000 פעילים, מגדיר אילו נתוני-תנועה מועברים, קובע פרמטרים גלובליים (אופק-תכנון, אזור-זמן), ומוודא שנתוני-האב (location, product, resource) נוצרים אוטומטית מהליבה. רק אז ניתן להריץ היוריסטיקה ראשונה.",
      cbcHe:
        "ב-CBC כל המפעלים, קווי-המילוי והמשקאות חיים תחת Model 000/Version 000 יחיד. שינוי בקיבולת-קו בליבה (במרכז-העבודה) משתקף אוטומטית כ-resource ב-PP/DS, ולכן הגדרות-האינטגרציה הנכונות הן תנאי לתכנון מהימן.",
      navHe: [
        "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) ► Basic Settings",
        "Advanced Planning ► Basic Settings ► Maintain Global Parameters and Default Values",
        "Advanced Planning ► Basic Settings ► Configure Integration (Transfer of Master and Transaction Data)",
      ],
      tables: ["/SAPAPO/MARM", "/SAPAPO/LOC", "/SAPAPO/MATKEY", "/SAPAPO/ORDMAP"],
      tcodes: ["/SAPAPO/MVM", "/SAPAPO/CP1", "/SAPAPO/RRP3"],
      fiori: ["F2101", "F1605"],
      configHe: [
        "Model/Version: Model 000 + Planning Version 000 הם הפרודקטיביים היחידים; אין צורך ליצור מודלים נוספים לתכנון רגיל.",
        "Integration Settings: קובעות אילו נתוני-אב ונתוני-תנועה מועברים אוטומטית מהליבה ל-PP/DS.",
        "Global Parameters: אופק-תכנון, אזור-זמן, התנהגות-ברירת-מחדל של אובייקטים.",
        "Master Data: אובייקטי location/product/resource נוצרים מהליבה — לא מוזנים ידנית.",
      ],
      flow: [
        { he: "אימות Model 000/Version 000", code: "/SAPAPO/MVM" },
        { he: "הגדרת אינטגרציה", note: "נתוני-אב + תנועה" },
        { he: "פרמטרים גלובליים", note: "אופק/אזור-זמן" },
        { he: "טעינת נתוני-אב מהליבה", note: "location/product/resource" },
        { he: "מוכן להיוריסטיקה ראשונה", code: "/SAPAPO/RRP3" },
      ],
      masterDataHe: [
        "Model 000 = מכל-העל הלוגי; Planning Version 000 = הגרסה הפעילה היחידה לתכנון פרודקטיבי.",
        "אובייקטי-אב (location/product/resource/PPM) נטענים אוטומטית מהליבה ומשויכים ל-Model 000.",
      ],
      mistakesHe: [
        "יצירת מודל/גרסה משלך לתכנון פרודקטיבי במקום שימוש ב-000.",
        "הזנת נתוני-אב ידנית ב-PP/DS במקום להסתמך על האינטגרציה מהליבה.",
        "אי-הגדרת פרמטרים גלובליים (אופק/אזור-זמן) — תכנון בטווח שגוי.",
      ],
      troubleshootHe: [
        "אובייקט לא מופיע ב-PP/DS ➔ הגדרת-אינטגרציה חסרה או חומר לא מסומן ל-Advanced Planning.",
        "תכנון בטווח שגוי ➔ פרמטר אופק-תכנון גלובלי לא-מוגדר נכון.",
        "תכנון 'בריק'/לא משפיע ➔ עובדים בגרסה שאינה 000.",
      ],
      bestPracticeHe: [
        "השאר את התכנון הפרודקטיבי ב-Model 000/Version 000; השתמש בגרסאות-עבודה לסימולציה בלבד.",
        "הגדר אינטגרציה מלאה לפני טעינת נתוני-אב.",
        "תעד את הפרמטרים הגלובליים — הם משפיעים על כל ההיוריסטיקות.",
      ],
      interviewHe: [
        { qHe: "מהו ה-Model וה-Version הפרודקטיביים ב-PP/DS?", aHe: "Model 000 ו-Planning Version 000 — הם היחידים שעליהם מריצים תכנון פרודקטיבי." },
        { qHe: "כיצד מגיעים נתוני-האב ל-Embedded PP/DS?", aHe: "אוטומטית מהליבה דרך מנגנון האינטגרציה (RTO/PDS), ללא CIF מלא כמו ב-APO." },
      ],
      takeawaysHe: [
        "הגדרות-הבסיס מבססות את סביבת-התכנון: Model 000/Version 000.",
        "נתוני-אב נטענים מהליבה — לא מוזנים ידנית.",
        "פרמטרים גלובליים ואינטגרציה הם תנאי לתכנון מהימן.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · ניהול גרסת-מודל (3.2.1)", href: "/library/ppds/chapter-03/#sub-3.2.1" },
        { labelHe: "PP/DS · היוריסטיקות (3.3)", href: "/library/ppds/chapter-03/#sub-3.3" },
      ],
      children: [
        {
          id: "3.2.1",
          titleHe: "ניהול גרסת מודל",
          titleEn: "Model Version Management",
          execHe: "ניהול-גרסת-המודל קובע את ה-Model וה-Planning Version שעליהם מתבצע התכנון. Model 000 ו-Version 000 הם הפרודקטיביים; גרסאות נוספות משמשות לסימולציה ('what-if') בלבד. זהו המכל הלוגי של כל אובייקטי-התכנון.",
          beginnerHe: "Model הוא ה'עולם' שמכיל את כל החומרים, הקווים וההזמנות; Version הוא 'תמונת-מצב' של העולם הזה. תמיד מתכננים בפועל ב-Model 000/Version 000, וגרסאות אחרות הן רק 'מה-היה-אם'.",
          consultantHe: "ב-/SAPAPO/MVM מנהלים את ה-Model ואת ה-Versions. Version 000 קשורה ל-Active Model 000 ומסונכרנת עם הליבה (liveCache). גרסאות-סימולציה הן עותקים שאינם משפיעים על הליבה. שכפול-גרסה (Version copy) מאפשר בדיקת-תרחישים בלי לפגוע בתכנון הפרודקטיבי.",
          purposeHe: "להפריד תכנון-פרודקטיבי (000) מתרחישי-סימולציה, ולשמור על מקור-אמת יחיד ומסונכרן עם הליבה.",
          processExampleHe: "מתכנן רוצה לבחון השפעת תוספת-קו: הוא משכפל את Version 000 לגרסת-סימולציה, מריץ שם תכנון, משווה תוצאות, ורק אם משתכנע מיישם בליבה — בלי שהסימולציה נגעה בתכנון הפעיל.",
          cbcHe: "ב-CBC כל קווי-המילוי והמשקאות חיים ב-Model 000/Version 000. בחינת תוספת-משמרת-לילה נעשית בגרסת-סימולציה משוכפלת, ללא סיכון לתכנון השוטף.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► Model and Version Management",
            "Advanced Planning ► Master Data ► Model and Version Management ► Manage Models / Planning Versions (/SAPAPO/MVM)",
          ],
          tables: ["/SAPAPO/MODEL", "/SAPAPO/VRSIO", "/SAPAPO/MATKEY"],
          tcodes: ["/SAPAPO/MVM", "/SAPAPO/VERCOP"],
          fiori: ["F2101"],
          configHe: [
            "Active Model = 000, Active Planning Version = 000 (פרודקטיבי).",
            "Version copy: שכפול 000 לגרסת-סימולציה לבחינת-תרחישים.",
            "גרסאות-סימולציה אינן מסונכרנות עם הליבה ואינן משפיעות עליה.",
          ],
          mistakesHe: [
            "תכנון פרודקטיבי בגרסה שאינה 000 — לא משפיע על הליבה.",
            "מחיקת/שינוי Model 000 בטעות — קטסטרופלי לכל התכנון.",
          ],
          troubleshootHe: [
            "תוצאות-תכנון לא מגיעות לליבה ➔ עובדים בגרסת-סימולציה ולא ב-000.",
            "אובייקט לא נמצא במודל ➔ לא משויך ל-Model 000.",
          ],
          bestPracticeHe: [
            "השאר את 000 קדוש לפרודקשן; כל ניסוי בגרסה משוכפלת.",
            "תעד מטרת כל גרסת-סימולציה ומחק כשלא בשימוש.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Model ל-Version?", aHe: "Model = המכל הלוגי של אובייקטי-התכנון; Version = תמונת-מצב ספציפית של המודל. 000/000 הם הפרודקטיביים." },
            { qHe: "למה משמשות גרסאות שאינן 000?", aHe: "לסימולציה ('what-if') בלבד — הן אינן מסונכרנות עם הליבה ואינן משפיעות על התכנון הפעיל." },
          ],
          takeawaysHe: [
            "Model 000/Version 000 = הפרודקטיביים היחידים.",
            "גרסאות נוספות = סימולציה בלבד.",
            "שכפל-גרסה לבחינת-תרחישים בלי לסכן את 000.",
          ],
        },
        {
          id: "3.2.2",
          titleHe: "הגדרות אינטגרציה",
          titleEn: "Integration Settings",
          execHe: "הגדרות-האינטגרציה קובעות אילו נתוני-אב ונתוני-תנועה זורמים בין ליבת-ה-S/4HANA לבין שכבת-ה-PP/DS, ולאילו חומרים/מפעלים. הן ה'צינור' שמסנכרן את שני העולמות ומבטיח תמונת-תכנון עדכנית.",
          beginnerHe: "כדי שהמנוע יתכנן חומר, החומר ונתוניו צריכים 'להיכנס' אליו מהליבה. הגדרות-האינטגרציה קובעות מה נכנס, למי, ומתי — כמו רשימת-תפוצה של נתונים.",
          consultantHe: "ב-Embedded PP/DS האינטגרציה מבוססת על Real-Time Integration ועל סימון Advanced Planning באב-החומר (MRP 4 view). מודל-האינטגרציה מגדיר אילו location/product/PDS מועברים. בניגוד ל-APO, אין צורך להקים ולנטר תור-CIF; הסנכרון מיידי. עדיין מגדירים אילו סוגי-נתונים (קיבולת, מלאי, הזמנות) רלוונטיים לתכנון-מתקדם.",
          purposeHe: "להבטיח שכל אובייקט הרלוונטי לתכנון-מתקדם, ורק הוא, יהיה זמין ב-PP/DS עם נתונים עדכניים.",
          processExampleHe: "חומר מסומן Advanced Planning בליבה; מנגנון-האינטגרציה יוצר אוטומטית את ה-product וה-PDS ב-PP/DS, וכל שינוי-מלאי/הזמנה משתקף מיד.",
          cbcHe: "ב-CBC רק המשקאות (FERT) וחצאי-המוצר (HALB) הרלוונטיים לתזמון-עדין מסומנים Advanced Planning; חומרי-גלם פשוטים נשארים בתכנון-MRP רגיל כדי לא להעמיס את המנוע.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► Integration ► Configure Transfer of Master Data",
            "Advanced Planning ► Integration ► Set Up Advanced Planning Relevance (Material Master MRP 4: Advanced Planning indicator)",
          ],
          tables: ["/SAPAPO/MATMAP", "/SAPAPO/LOCMAP", "MARC"],
          tcodes: ["/SAPAPO/CP1", "/SAPAPO/CSE_DELETE", "MM02"],
          fiori: ["F1605", "F1602A"],
          configHe: [
            "Advanced Planning indicator (MARC, MRP 4 view): מסמן חומר לתכנון מתקדם — תנאי-סף לאינטגרציה.",
            "Master Data transfer: location/product/resource/PDS נוצרים אוטומטית מהליבה.",
            "Transaction data: מלאי, הזמנות-תכנון ופק\"ע מסונכרנים בזמן-אמת.",
          ],
          mistakesHe: [
            "סימון יתר של חומרים ל-Advanced Planning — עומס מיותר על המנוע.",
            "אי-סימון חומר הרלוונטי לתזמון — הוא לא יתוכנן ב-PP/DS.",
          ],
          troubleshootHe: [
            "חומר לא מתוכנן ב-PP/DS ➔ Advanced Planning indicator לא מסומן (MRP 4).",
            "נתון לא מסונכרן ➔ בעיית-אינטגרציה; בדוק PDS ומיפוי location.",
          ],
          bestPracticeHe: [
            "סמן Advanced Planning רק לחומרים הזקוקים לתזמון-עדין/אופטימיזציה.",
            "ודא קיום PDS תקין לכל חומר מתוכנן.",
          ],
          interviewHe: [
            { qHe: "כיצד מסמנים חומר לתכנון ב-PP/DS?", aHe: "באמצעות Advanced Planning indicator בתצוגת MRP 4 של אב-החומר; זהו תנאי-סף לאינטגרציה ולתכנון." },
            { qHe: "במה שונה האינטגרציה ב-Embedded PP/DS מ-APO?", aHe: "אין CIF/תור לנטר; הסנכרון מיידי על אותו בסיס-נתונים, מבוסס RTO ו-PDS." },
          ],
          takeawaysHe: [
            "האינטגרציה = הצינור בין הליבה ל-PP/DS.",
            "Advanced Planning indicator (MRP 4) הוא תנאי-הסף.",
            "סנכרון מיידי, ללא CIF.",
          ],
        },
        {
          id: "3.2.3",
          titleHe: "העברת נתוני תנועה",
          titleEn: "Transaction Data Transfer",
          execHe: "העברת נתוני-תנועה מבטיחה שכל ההזמנות, הדרישות, המלאי והפעילויות הרלוונטיות זמינות ב-PP/DS לתכנון. בניגוד לנתוני-אב (סטטיים), נתוני-התנועה דינמיים ומשתנים מתמיד, ולכן חייבים סנכרון מהיר ואמין.",
          beginnerHe: "נתוני-אב הם 'מי' (החומר, הקו); נתוני-תנועה הם 'מה קורה עכשיו' — כמה במלאי, אילו הזמנות פתוחות, מה הדרישות. כדי לתכנן נכון, המנוע צריך את התמונה העדכנית של 'מה קורה עכשיו'.",
          consultantHe: "ב-Embedded PP/DS נתוני-התנועה (orders, stocks, requirements) מסונכרנים ל-liveCache בזמן-אמת. כלי-תיקון כמו /SAPAPO/CCR (Reconciliation) ו-/SAPAPO/OM17 (liveCache consistency) מאתרים אי-התאמות בין הליבה ל-liveCache. בעת הקמה או לאחר תקלה מריצים העברה-מחדש (initial transfer) של נתוני-התנועה לגרסה 000.",
          purposeHe: "לוודא שהתכנון מבוסס על תמונת-מצב נכונה ועדכנית של מלאי, הזמנות ודרישות.",
          processExampleHe: "לאחר הקמת חומר חדש מריצים העברת-נתוני-תנועה ראשונית; המלאי וההזמנות הפתוחות מופיעים ב-/SAPAPO/RRP3, והמתכנן רואה תמונת-תכנון מלאה.",
          cbcHe: "ב-CBC, אחרי downtime של liveCache, מריצים /SAPAPO/CCR כדי לאמת שכל פקודות-המילוי הפתוחות והמלאי-בפועל תואמים בין הליבה ל-PP/DS לפני שמתזמנים מחדש.",
          navHe: [
            "SPRO ► Advanced Planning ► Basic Settings ► Integration ► Transfer Transaction Data",
            "Advanced Planning ► Integration Tools ► Reconcile Transaction Data (/SAPAPO/CCR)",
          ],
          tables: ["/SAPAPO/ORDMAP", "/SAPAPO/ORDKEY", "RESB"],
          tcodes: ["/SAPAPO/CCR", "/SAPAPO/OM17", "/SAPAPO/RRP_NETCH"],
          fiori: ["F1605"],
          configHe: [
            "Initial transfer: העברת מלאי/הזמנות/דרישות ראשונית לגרסה 000.",
            "/SAPAPO/CCR: השוואת נתוני-תנועה בין הליבה ל-liveCache ותיקון פערים.",
            "/SAPAPO/OM17: בדיקת-עקביות של liveCache.",
          ],
          mistakesHe: [
            "דילוג על reconciliation לאחר תקלת-liveCache — תכנון על נתונים שגויים.",
            "אי-העברת-נתוני-תנועה ראשונית לחומר חדש — תמונת-תכנון חסרה.",
          ],
          troubleshootHe: [
            "מלאי/הזמנה לא מופיעים ב-PP/DS ➔ הרץ initial transfer / /SAPAPO/CCR.",
            "אי-התאמה בין ליבה ל-PP/DS ➔ הרץ /SAPAPO/OM17 ו-/SAPAPO/CCR.",
          ],
          bestPracticeHe: [
            "הרץ /SAPAPO/CCR מחזורית כבדיקת-תקינות.",
            "לאחר כל downtime של liveCache — reconciliation לפני תכנון.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין נתוני-אב לנתוני-תנועה ב-PP/DS?", aHe: "נתוני-אב סטטיים (חומר/קו); נתוני-תנועה דינמיים (מלאי/הזמנות/דרישות) ומסונכרנים בזמן-אמת ל-liveCache." },
            { qHe: "מה תפקיד /SAPAPO/CCR?", aHe: "Reconciliation — השוואת נתוני-התנועה בין הליבה ל-liveCache ותיקון אי-התאמות." },
          ],
          takeawaysHe: [
            "נתוני-תנועה = תמונת ה'עכשיו' לתכנון.",
            "/SAPAPO/CCR ו-/SAPAPO/OM17 מאמתים עקביות.",
            "תמיד reconciliation לאחר תקלת-liveCache.",
          ],
        },
        {
          id: "3.2.4",
          titleHe: "סכמת הקונפיגורציה של מערכת ה-PP/DS",
          titleEn: "Configuration Schema of the PP/DS System",
          execHe: "סכמת-הקונפיגורציה היא מפת-העל של הגדרות-PP/DS: כיצד מתחברים זה-לזה Global Settings, Heuristics, Planning Procedures, Strategy Profiles, ופרופילי-ה-DS Board. הבנת הסכמה מונעת הגדרות-מנותקות ומבטיחה שכל רכיב 'מדבר' עם השני.",
          beginnerHe: "ב-PP/DS יש הרבה הגדרות שונות, וקל לאבד את התמונה. הסכמה היא 'מפה' שמראה איך ההגדרות מתחברות: מה גלובלי, מה לכל חומר, מה לכל הרצה, ומה לכל לוח-תזמון.",
          consultantHe: "הסכמה משקפת את היררכיית-ההגדרות: (1) Global Parameters (אזור-זמן, אופק); (2) Master-data-level (Planning Procedure, PP/DS-relevant horizon, Strategy Profile לכל product/location); (3) Run-level (Heuristics + Planning Procedures שמופעלות בהרצה); (4) Interactive-level (DS Board profiles). חשוב להבין אילו הגדרות 'גוברות' על מי — למשל פרמטרי-הרצה גוברים על ברירות-מחדל-גלובליות.",
          purposeHe: "לספק תמונה אחודה של אופן-עבודת המערכת, לאתר חוסר-עקביות, ולתכנן הגדרה מסודרת מלמעלה-למטה.",
          processExampleHe: "בתחילת מימוש היועץ משרטט את הסכמה: פרמטרים גלובליים → נתוני-אב לכל חומר → היוריסטיקות ונהלי-תכנון → פרופילי-לוח. כל הגדרה חדשה ממוקמת בסכמה ובודקים את השפעתה כלפי מטה.",
          cbcHe: "ב-CBC הסכמה מתעדת: אזור-זמן-מפעל גלובלי → Planning Procedure לכל משקה → היוריסטיקת SAP_PP_002 בהרצת-הלילה → פרופיל-DS-Board לראש-הקו. מסמך אחד שמראה איך הכל מתחבר.",
          navHe: [
            "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) (ענף-העל של כל ההגדרות)",
            "Advanced Planning ► PP/DS ► Global Settings / Heuristics / Planning Procedure / Detailed Scheduling (תתי-הענפים)",
          ],
          tables: ["/SAPAPO/PPDSSET", "/SAPAPO/HEUR", "/SAPAPO/PLPRO"],
          tcodes: ["SPRO", "/SAPAPO/CDPSC0", "/SAPAPO/CDPSC1"],
          fiori: ["F2101"],
          configHe: [
            "Global level: אזור-זמן, אופק-תכנון, ברירות-מחדל כלל-מערכתיות.",
            "Master-data level: Planning Procedure + Strategy Profile + PP/DS horizon לכל product/location.",
            "Run level: אילו Heuristics ו-Planning Procedures מופעלות בכל הרצה.",
            "Interactive level: פרופילי-DS Board (Overall/Time/Work Area/Planning Board).",
          ],
          flow: [
            { he: "פרמטרים גלובליים", note: "אזור-זמן/אופק" },
            { he: "הגדרות נתוני-אב", note: "Planning Procedure/Strategy" },
            { he: "הגדרות-הרצה", note: "Heuristics/Procedures" },
            { he: "הגדרות אינטראקטיביות", note: "DS Board profiles" },
          ],
          mistakesHe: [
            "הגדרה נקודתית בלי לראות את השפעתה על שאר-הסכמה.",
            "פרמטרים גלובליים סותרים הגדרות נתוני-אב.",
          ],
          troubleshootHe: [
            "התנהגות-תכנון בלתי-צפויה ➔ עקוב אחר הסכמה: איזו רמה גוברת.",
            "הגדרה 'לא נתפסת' ➔ נדרסת על-ידי הגדרה ברמה גבוהה/נמוכה יותר.",
          ],
          bestPracticeHe: [
            "שרטט את הסכמה בתחילת המימוש ועדכן אותה בכל שינוי.",
            "הגדר מלמעלה-למטה: גלובלי → אב → הרצה → אינטראקטיבי.",
          ],
          interviewHe: [
            { qHe: "מהן רמות-ההגדרה ב-PP/DS?", aHe: "גלובלי, רמת-נתוני-אב, רמת-הרצה ורמה-אינטראקטיבית (DS Board) — היררכיה שבה רמות נמוכות/ספציפיות גוברות על ברירות-מחדל." },
          ],
          takeawaysHe: [
            "הסכמה = מפת-העל של כל הגדרות-PP/DS.",
            "ארבע רמות: גלובלי, אב, הרצה, אינטראקטיבי.",
            "הגדר מלמעלה-למטה ועקוב מי-גובר-על-מי.",
          ],
        },
        {
          id: "3.2.5",
          titleHe: "פרמטרים גלובליים וערכי ברירת מחדל",
          titleEn: "Global Parameters and Default Values",
          execHe: "הפרמטרים הגלובליים קובעים את התנהגות-ברירת-המחדל של PP/DS בכל המערכת: אזור-זמן לתצוגה ולתזמון, אופק-תכנון (PP/DS horizon), טיפול-בחריגות, וברירות-מחדל לאובייקטים. הם 'הקול-קורא' של המערכת לפני שמגדירים ברמת-החומר.",
          beginnerHe: "אלה ההגדרות ה'גדולות' שחלות על הכל אלא-אם נדרס במקום ספציפי — למשל באיזה אזור-זמן מציגים תאריכים, ועד כמה רחוק קדימה המנוע מתכנן בעדינות.",
          consultantHe: "בהגדרות הגלובליות מגדירים PP/DS horizon (האופק שבו מתבצע תכנון-DS לעומת תכנון-גס מעבר לו), time zone, ו-default planning behavior. ה-PP/DS horizon הוא קריטי: דרישות בתוכו מתוזמנות במדויק על-ידי המנוע; מעבר לו מטופלות כדרישות-PP רגילות. הגדרה זו משפיעה ישירות על ביצועי-המנוע (אופק קצר = פחות עומס).",
          purposeHe: "לקבוע התנהגות-בסיס עקבית ולהגדיר עד-כמה-רחוק מתבצע תכנון-מתקדם, באיזון בין דיוק לבין עומס-מערכת.",
          processExampleHe: "מגדירים PP/DS horizon של 30 יום: דרישות ב-30 הימים הקרובים מתוזמנות עדין על-ידי המנוע; מעבר לכך נשארות הזמנות-תכנון רגילות עד שייכנסו לאופק.",
          cbcHe: "ב-CBC מגדירים PP/DS horizon של ~3-4 שבועות לקווי-המילוי — מספיק כדי לתזמן רצפי-מוצרים והחלפות-טעם, בלי להעמיס את המנוע בתכנון-עדין של חודשים קדימה.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Global Settings ► Maintain Global Parameters and Default Values",
            "Advanced Planning ► PP/DS ► Global Settings ► Specify PP/DS Horizon and Time Zone",
          ],
          tables: ["/SAPAPO/PPDSSET", "/SAPAPO/MATLOC", "MARC"],
          tcodes: ["/SAPAPO/RRPLOG1", "SPRO", "MM02"],
          fiori: ["F2101"],
          configHe: [
            "PP/DS Horizon: טווח התכנון-העדין; דרישות בתוכו מתוזמנות מדויק, מעבר לו תכנון-גס.",
            "Time Zone: אזור-הזמן לתצוגת/תזמון אובייקטים.",
            "Default Values: ברירות-מחדל להתנהגות-תכנון של אובייקטים חדשים.",
          ],
          masterDataHe: [
            "PP/DS horizon ניתן להגדרה גלובלית וגם ברמת-חומר (MARC) — הספציפי גובר.",
          ],
          mistakesHe: [
            "PP/DS horizon ארוך מדי ➔ עומס-מנוע ותכנון-עדין מיותר.",
            "PP/DS horizon קצר מדי ➔ דרישות לא מתוזמנות בעדינות בזמן.",
            "אזור-זמן שגוי ➔ תאריכי-תזמון מוצגים/מחושבים שגוי.",
          ],
          troubleshootHe: [
            "דרישה לא מתוזמנת עדין ➔ היא מחוץ ל-PP/DS horizon.",
            "תאריכים נראים מוזרים ➔ הגדרת time zone שגויה.",
          ],
          bestPracticeHe: [
            "כוונן PP/DS horizon כך שיכסה את טווח-התזמון-העדין בלבד.",
            "התאם time zone למפעל הפיזי.",
          ],
          interviewHe: [
            { qHe: "מהו ה-PP/DS horizon ומדוע הוא חשוב?", aHe: "הטווח שבו מתבצע תכנון-DS עדין; דרישות בתוכו מתוזמנות מדויק, מעבר לו נשארות תכנון-גס. הוא מאזן בין דיוק לעומס-מנוע." },
          ],
          takeawaysHe: [
            "הפרמטרים הגלובליים = התנהגות-ברירת-מחדל כלל-מערכתית.",
            "PP/DS horizon מאזן דיוק-תזמון מול עומס.",
            "ניתן לדרוס ברמת-חומר.",
          ],
        },
        {
          id: "3.2.6",
          titleHe: "הגדרות נתוני אב",
          titleEn: "Master Data Settings",
          execHe: "הגדרות נתוני-האב קובעות את התכונות הספציפיות-ל-PP/DS של product, location, resource ו-PDS: Planning Procedure, Strategy Profile, PP/DS horizon לכל חומר, ופרמטרי-תזמון. כאן 'מתלבשות' ההגדרות הגלובליות על האובייקט הבודד.",
          beginnerHe: "אחרי שקבענו את הכללים הגדולים, צריך לקבוע לכל חומר ולכל קו את ההתנהגות שלו: איך הוא מתוכנן, באיזו אסטרטגיה, ובאיזה אופק. אלה ההגדרות הספציפיות שיושבות על האובייקט.",
          consultantHe: "האובייקטים (location/product/resource/PDS) נטענים מהליבה, אך נושאים שדות PP/DS ייעודיים: Planning Procedure (איך החומר מגיב לאירועי-תכנון), Strategy Profile (כיצד המנוע משבץ הזמנות), PP/DS horizon ספציפי, Planning Group. ה-resource (מתורגם ממרכז-העבודה) נושא הגדרות-קיבולת ולוח-זמינות. הגדרות-אלה גוברות על ברירות-המחדל הגלובליות לאותו אובייקט.",
          purposeHe: "להתאים את התנהגות-התכנון לכל חומר/קו ספציפי — אסטרטגיה, אופק ונוהל — מעבר לברירות-המחדל הכלליות.",
          processExampleHe: "מוצר מהיר-תנועה מקבל Planning Procedure שמפעיל תכנון-מיידי בכל שינוי-דרישה, ו-Strategy Profile שמעדיף שיבוץ-לאחור; מוצר איטי מקבל נוהל המתבסס על הרצת-לילה בלבד.",
          cbcHe: "ב-CBC משקה-דגל מקבל Planning Procedure לתכנון-מיידי ו-Strategy Profile למזעור-החלפות-טעם; משקה-עונתי מקבל נוהל מבוסס-הרצת-לילה ואופק קצר יותר.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Maintain Settings at Master-Data Level",
            "Advanced Planning ► Master Data ► Product (/SAPAPO/MAT1) / Resource (/SAPAPO/RES01)",
          ],
          tables: ["/SAPAPO/MATLOC", "/SAPAPO/RESOURCE", "/SAPAPO/PLPRO"],
          tcodes: ["/SAPAPO/MAT1", "/SAPAPO/RES01", "/SAPAPO/CDPSC5"],
          fiori: ["F1605", "F2336"],
          configHe: [
            "Product: Planning Procedure, Strategy Profile, PP/DS horizon, Planning Group, lot-size settings.",
            "Resource: Capacity, Available-capacity profile, finite/infinite, factory calendar.",
            "PDS: מבנה-המוצר-לתכנון הנגזר מ-BOM+Routing+Production Version.",
          ],
          masterDataHe: [
            "Product (/SAPAPO/MAT1) = שדות-תכנון ברמת-חומר/location.",
            "Resource (/SAPAPO/RES01) = קיבולת ולוח-זמינות (ממרכז-העבודה).",
            "PDS = ה-source-of-supply המתוכנן (BOM+Routing+Production Version).",
          ],
          mistakesHe: [
            "Planning Procedure לא-מתאים ➔ תכנון-מיידי מיותר או חוסר-תגובה לדרישות.",
            "Resource ללא לוח-זמינות תקין ➔ תזמון שגוי.",
            "PDS חסר/שגוי ➔ אין source-of-supply, ההזמנה לא משובצת.",
          ],
          troubleshootHe: [
            "הזמנה לא משובצת ל-resource ➔ PDS חסר או Strategy Profile שגוי.",
            "חומר לא מגיב לדרישה ➔ Planning Procedure לא-מתאים.",
          ],
          bestPracticeHe: [
            "התאם Planning Procedure ו-Strategy Profile לאופי-החומר (מהיר/איטי).",
            "ודא קיום PDS תקין לכל חומר מתוכנן.",
          ],
          interviewHe: [
            { qHe: "מהו PDS ב-PP/DS?", aHe: "Production Data Structure — ה-source-of-supply המתוכנן הנגזר מ-BOM+Routing+Production Version של הליבה; בלעדיו אין כיצד לשבץ הזמנה." },
            { qHe: "מה קובע Planning Procedure ברמת-חומר?", aHe: "כיצד החומר מגיב לאירועי-תכנון — תכנון-מיידי, סימון-לתכנון, או טיפול בהרצה בלבד." },
          ],
          takeawaysHe: [
            "נתוני-האב נושאים שדות-PP/DS ייעודיים (Procedure/Strategy/Horizon).",
            "Resource = קיבולת; PDS = source-of-supply.",
            "הגדרות-אב גוברות על ברירות-המחדל הגלובליות.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · נהלי-תכנון (3.4)", href: "/library/ppds/chapter-03/#sub-3.4" },
          ],
        },
      ],
    },
    // ============================================================ 3.3
    {
      id: "3.3",
      titleHe: "קונפיגורציית היוריסטיקות",
      titleEn: "Heuristics Configuration",
      execHe:
        "היוריסטיקה (Heuristic) היא אלגוריתם-תכנון שמטפל בקבוצת-אובייקטים לפי כלל מוגדר — למשל 'תכנן צרכים סטנדרטי' (SAP_PP_002) או 'תזמן לאחור'. היוריסטיקות הן ליבת התכנון האוטומטי ב-PP/DS: הן מה שהמערכת מריצה כדי לייצר ולתזמן הזמנות. הגדרתן הנכונה קובעת את איכות-התכנון כולה.",
      beginnerHe:
        "היוריסטיקה היא 'מתכון-תכנון' — סדרת-צעדים שהמערכת מבצעת על קבוצת-חומרים. במקום שאדם יחליט ידנית לכל חומר, מריצים היוריסטיקה שעושה זאת אוטומטית לפי הכלל שהוגדר. SAP מספקת היוריסטיקות מוכנות (כמו SAP_PP_002 לתכנון-צרכים), ואפשר גם להעתיק ולהתאים אותן.",
      consultantHe:
        "היוריסטיקות מסווגות לפי אובייקט-היעד: product heuristics (למשל SAP_PP_002 — Plan Standard Lots), service heuristics (תזמון/dissolve), ו-flow-control. כל היוריסטיקה נושאת settings (lot-size, אופק, scheduling mode) ופרמטרים אלגוריתמיים. ב-/SAPAPO/CDPSC1 מגדירים/מעתיקים היוריסטיקה. היוריסטיקות מקובצות ל-Heuristic Profiles המופעלות בהרצת-תכנון או אינטראקטיבית ב-DS Board. הבחנה קריטית: היוריסטיקה מטפלת בקבוצה לפי כלל, בעוד האופטימייזר ממזער פונקציית-מטרה.",
      purposeHe:
        "המטרה: לאוטמט את התכנון לפי כללים עסקיים מוגדרים, באופן עקבי ומהיר, על-פני אלפי-חומרים, בלי החלטה-ידנית לכל אחד.",
      processExampleHe:
        "הרצת-לילה מפעילה את SAP_PP_002 על כל מוצרי-המפעל: ההיוריסטיקה סורקת דרישות, יוצרת הזמנות-תכנון לפי lot-size, ומתזמנת אותן. בבוקר המתכנן רואה תכנית מלאה ומטפל רק בחריגות.",
      cbcHe:
        "ב-CBC הרצת-הלילה מפעילה SAP_PP_002 על המשקאות; לאחריה מופעלת היוריסטיקת-תזמון שמסדרת את ההזמנות על קווי-המילוי כך שמוצרים דומים (אותו טעם) רצים ברצף — לצמצום ניקויי-CIP.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Heuristics ► Maintain Heuristics",
        "SPRO ► Advanced Planning ► PP/DS ► Heuristics ► Define Heuristic Profiles",
        "Advanced Planning ► PP/DS ► Heuristics ► Maintain Settings (/SAPAPO/CDPSC1)",
      ],
      tables: ["/SAPAPO/HEUR", "/SAPAPO/HEUR_PRO", "/SAPAPO/HEUSET"],
      tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/CDPSC11", "/SAPAPO/RRP_HEUR"],
      fiori: ["F2101", "F4006"],
      configHe: [
        "Maintain Heuristics: הגדר/העתק היוריסטיקה (למשל SAP_PP_002), קבע אלגוריתם וסוג-אובייקט.",
        "Heuristic settings: lot-size, scheduling mode (forward/backward), אופק, טיפול-בקיבולת.",
        "Heuristic Profiles: קיבוץ היוריסטיקות לסדר-הפעלה בהרצה.",
        "אל תשנה היוריסטיקות SAP_* מקוריות — העתק לשם Z* ושנה את ההעתק.",
      ],
      flow: [
        { he: "בחירת/העתקת היוריסטיקה", code: "/SAPAPO/CDPSC1", note: "SAP_PP_002" },
        { he: "הגדרת settings", note: "lot-size/scheduling" },
        { he: "קיבוץ ל-Heuristic Profile", code: "/SAPAPO/CDPSC11" },
        { he: "הפעלה בהרצה/DS Board", code: "/SAPAPO/RRP_HEUR" },
      ],
      mistakesHe: [
        "שינוי היוריסטיקת SAP_* מקורית במקום העתקה ל-Z*.",
        "Scheduling mode שגוי (forward במקום backward) ➔ תזמון לא-רצוי.",
        "הפעלת היוריסטיקה על קבוצת-אובייקטים שגויה.",
      ],
      troubleshootHe: [
        "ההיוריסטיקה לא יוצרת הזמנות ➔ אובייקט/חומר מחוץ לקבוצת-היעד או PDS חסר.",
        "תזמון לא-רצוי ➔ scheduling mode או settings שגויים.",
        "שינוי-היוריסטיקה נעלם בעדכון ➔ שונתה SAP_* מקורית במקום העתק.",
      ],
      bestPracticeHe: [
        "תמיד העתק SAP_* ל-Z* לפני התאמה.",
        "בנה Heuristic Profile ברור לפי שלבי-התכנון.",
        "תעד מה כל היוריסטיקה עושה ועל אילו אובייקטים.",
      ],
      interviewHe: [
        { qHe: "מהי היוריסטיקה ב-PP/DS?", aHe: "אלגוריתם-תכנון המטפל בקבוצת-אובייקטים לפי כלל מוגדר — יצירה/תזמון של הזמנות. דוגמה: SAP_PP_002 לתכנון-צרכים." },
        { qHe: "מה ההבדל בין היוריסטיקה לאופטימייזר?", aHe: "היוריסטיקה מיישמת כלל על קבוצה; האופטימייזר ממזער פונקציית-מטרה (עלות/זמן) על-פני תרחישים — איטי וכבד יותר." },
        { qHe: "מדוע לא לשנות SAP_PP_002 ישירות?", aHe: "כי עדכוני-SAP ידרסו את השינוי; מעתיקים ל-Z* ומשנים את ההעתק." },
      ],
      takeawaysHe: [
        "היוריסטיקה = מתכון-תכנון אוטומטי על קבוצת-אובייקטים.",
        "SAP_PP_002 = תכנון-צרכים סטנדרטי; העתק ל-Z* להתאמה.",
        "מקובצות ל-Heuristic Profiles המופעלות בהרצה/DS Board.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · נהלי-תכנון (3.4)", href: "/library/ppds/chapter-03/#sub-3.4" },
        { labelHe: "PP/DS · אופטימייזר (3.8)", href: "/library/ppds/chapter-03/#sub-3.8" },
      ],
      children: [
        {
          id: "3.3.1",
          titleHe: "הגדרות היוריסטיקה",
          titleEn: "Heuristic Settings",
          execHe: "הגדרות-ההיוריסטיקה קובעות את התנהגות-האלגוריתם הספציפי: סוג-האובייקט (product/operation/order), אופן-התזמון (forward/backward), טיפול-בקיבולת (finite/infinite), lot-size ואופק. שינוי בהגדרות משנה מהותית את תוצאת-התכנון.",
          beginnerHe: "כל היוריסטיקה מגיעה עם 'כפתורים' שאפשר לכוונן: על מה היא פועלת, האם תזמון קדימה או אחורה, האם מתחשבת בקיבולת, ומה גודל-האצווה. ההגדרות הן הכפתורים האלה.",
          consultantHe: "ב-/SAPAPO/CDPSC1 בוחרים היוריסטיקה ומגדירים את ה-Algorithm ואת הפרמטרים: scheduling direction, finite/infinite, lot-size procedure, ו-planning horizon. עבור SAP_PP_002 מגדירים אם ליצור הזמנות-תכנון לכל הדרישות ומה מצב-התזמון. הגדרות-אלה נשמרות עם ה-Heuristic ID ומשמשות בכל מקום שבו ההיוריסטיקה מופעלת.",
          purposeHe: "להתאים את האלגוריתם-הגנרי להתנהגות-העסקית הרצויה — דיוק-תזמון, התחשבות-בקיבולת וגודל-אצווה.",
          processExampleHe: "מגדירים את SAP_PP_002 עם backward scheduling ו-infinite capacity: ההזמנות מתוזמנות לאחור מתאריך-הדרישה בלי להגביל קיבולת; שלב-תזמון-סופי נפרד יישב על הקו עם קיבולת-סופית.",
          cbcHe: "ב-CBC היוריסטיקת-התזמון של קווי-המילוי מוגדרת finite (קיבולת-סופית) כדי שלא יתוזמנו שתי פקודות-מילוי על אותו קו בו-זמנית.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Heuristics ► Maintain Heuristics (Settings)",
            "Advanced Planning ► PP/DS ► Heuristics ► Define Heuristic Settings (/SAPAPO/CDPSC1)",
          ],
          tables: ["/SAPAPO/HEUR", "/SAPAPO/HEUSET"],
          tcodes: ["/SAPAPO/CDPSC1"],
          fiori: ["F2101"],
          configHe: [
            "Algorithm + object type: product/operation/order.",
            "Scheduling: forward / backward / finite / infinite.",
            "Lot-size procedure + planning horizon.",
          ],
          mistakesHe: [
            "Finite/Infinite שגוי ➔ overload לא-מטופל או תזמון איטי מיותר.",
            "אופק-היוריסטיקה לא תואם PP/DS horizon.",
          ],
          troubleshootHe: [
            "הזמנות נופלות זו-על-זו ➔ היוריסטיקה מוגדרת infinite היכן שצריך finite.",
            "תוצאות לא-עקביות ➔ scheduling direction שונה מהמצופה.",
          ],
          bestPracticeHe: [
            "התאם finite/infinite לשלב (יצירה=infinite, תזמון-סופי=finite).",
            "סנכרן אופק-היוריסטיקה עם PP/DS horizon.",
          ],
          interviewHe: [
            { qHe: "מהי המשמעות של finite מול infinite בהיוריסטיקה?", aHe: "Infinite מתעלם ממגבלות-קיבולת (לתכנון-כמות); finite מכבד את הקיבולת ומונע overload (לתזמון-סופי)." },
          ],
          takeawaysHe: [
            "ההגדרות = הכפתורים של האלגוריתם.",
            "scheduling direction + finite/infinite הם המכריעים.",
            "סנכרן אופק עם PP/DS horizon.",
          ],
        },
        {
          id: "3.3.2",
          titleHe: "פרופילי היוריסטיקה",
          titleEn: "Heuristics Profiles",
          execHe: "Heuristic Profile מקבץ מספר היוריסטיקות לסדר-הפעלה אחד, כך שהרצת-תכנון או לחצן ב-DS Board מפעילים רצף-היוריסטיקות מסודר (למשל: תכנון-כמות → תזמון → תזמון-סופי) במקום הפעלה ידנית של כל אחת.",
          beginnerHe: "במקום להריץ היוריסטיקה אחר-היוריסטיקה ידנית, מקבצים אותן ל'חבילה' אחת בסדר הנכון. לוחצים פעם אחת — וכל הרצף רץ.",
          consultantHe: "ב-/SAPAPO/CDPSC11 מגדירים Heuristic Profile ובו רשימת-היוריסטיקות לפי סדר-ביצוע. הפרופיל משויך ללחצן ב-DS Board (דרך ה-Overall Profile) או נקרא בהרצת-תכנון. סדר-הביצוע קריטי: תכנון-כמות חייב לקדום לתזמון-סופי. ניתן להגדיר פרופילים שונים לתפקידים שונים.",
          purposeHe: "לארוז רצף-תכנון מורכב לפעולה אחת עקבית, להבטיח סדר-ביצוע נכון ולפשט את עבודת-המתכנן.",
          processExampleHe: "פרופיל 'תכנון-יומי' מכיל: (1) SAP_PP_002 תכנון-כמות; (2) היוריסטיקת-תזמון-לאחור; (3) תזמון-סופי על הקו. לחיצה אחת מריצה את שלושתם בסדר.",
          cbcHe: "ב-CBC פרופיל 'קו-מילוי' מקבץ: תכנון-כמות → תזמון → מיון-לפי-טעם להפחתת-CIP. ראש-הקו מפעיל אותו מה-DS Board בלחיצה.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Heuristics ► Define Heuristic Profiles",
            "Advanced Planning ► PP/DS ► Heuristics ► Assign Profile to DS Board (/SAPAPO/CDPSC11)",
          ],
          tables: ["/SAPAPO/HEUR_PRO", "/SAPAPO/HEUR"],
          tcodes: ["/SAPAPO/CDPSC11", "/SAPAPO/CDPS0"],
          fiori: ["F2101"],
          configHe: [
            "צור Heuristic Profile והוסף היוריסטיקות בסדר-הביצוע הרצוי.",
            "שייך את הפרופיל ל-Overall Profile של ה-DS Board או להרצת-תכנון.",
            "הגדר פרופילים שונים לתפקידים/אזורים שונים.",
          ],
          mistakesHe: [
            "סדר-היוריסטיקות שגוי ➔ תזמון לפני תכנון-כמות = תוצאה ריקה.",
            "פרופיל אחד 'ענק' לכל המצבים במקום פרופילים ממוקדים.",
          ],
          troubleshootHe: [
            "הרצף נותן תוצאה חלקית ➔ סדר-ההיוריסטיקות בפרופיל שגוי.",
            "לחצן ב-DS Board לא מפעיל את הרצף ➔ הפרופיל לא משויך ל-Overall Profile.",
          ],
          bestPracticeHe: [
            "סדר תמיד: תכנון-כמות → תזמון → תזמון-סופי.",
            "בנה פרופילים ממוקדים-תפקיד במקום פרופיל-על אחד.",
          ],
          interviewHe: [
            { qHe: "מהו Heuristic Profile ולמה הוא משמש?", aHe: "קיבוץ היוריסטיקות לרצף-הפעלה מסודר, המופעל בלחיצה אחת מהרצה או מ-DS Board; מבטיח סדר-ביצוע נכון." },
          ],
          takeawaysHe: [
            "פרופיל = רצף-היוריסטיקות בלחיצה אחת.",
            "סדר-הביצוע קריטי (כמות לפני תזמון).",
            "משויך ל-DS Board או להרצה.",
          ],
        },
      ],
    },
    // ============================================================ 3.4
    {
      id: "3.4",
      titleHe: "נהלי תכנון",
      titleEn: "Planning Procedures",
      execHe:
        "Planning Procedure (נוהל-תכנון) מוגדר לכל חומר וקובע כיצד המערכת מגיבה לאירועי-תכנון: האם לתכנן מיד (immediate), לסמן לתכנון (mark for planning), או להשאיר להרצה. הוא ה'מתג-התגובתיות' של החומר — ההבדל בין תכנון בזמן-אמת לבין תכנון-אצווה לילי.",
      beginnerHe:
        "כשמשהו משתנה (דרישה חדשה, ביטול-הזמנה), המערכת צריכה להחליט: לתכנן מחדש עכשיו, רק לסמן 'צריך-תכנון', או לחכות להרצת-הלילה? נוהל-התכנון הוא ההחלטה הזו לכל חומר. מוצר חשוב ← תכנון-מיידי; מוצר רגיל ← סימון-להרצה.",
      consultantHe:
        "Planning Procedure מוגדר ברמת-product (master data) ומכיל reactions לאירועים (creation/change/deletion of requirement/receipt). אופציות: '1 - no automatic planning', '3 - automatic planning immediately', '4 - planning in planning run' ועוד. בנוסף הוא מצביע על היוריסטיקה שתופעל. בהגדרות ה-PP/DS מגדירים את הנוהל ומשייכים לחומרים. בחירת-נוהל משפיעה ישירות על עומס-המערכת: immediate planning על אלפי-חומרים = עומס כבד.",
      purposeHe:
        "לאזן בין תגובתיות-תכנון (זמן-אמת) לבין עומס-מערכת — לתת תכנון-מיידי רק היכן שצריך, ולהשאיר את השאר להרצות-אצווה.",
      processExampleHe:
        "מוצר-דגל בנוהל immediate: דרישה חדשה מפעילה מיד היוריסטיקה ויוצרת הזמנת-תכנון. מוצר-רגיל בנוהל planning-run: הדרישה רק מסומנת, וההרצה הלילית תטפל בה.",
      cbcHe:
        "ב-CBC משקאות-דגל בנוהל תכנון-מיידי כדי להגיב מהר לשינויי-ביקוש; משקאות-עונתיים בנוהל מבוסס-הרצה כדי לא להעמיס את המערכת בכל שינוי-קטן.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Planning Procedure ► Maintain Planning Procedures",
        "Advanced Planning ► PP/DS ► Planning Procedure ► Assign Planning Procedure to Products",
      ],
      tables: ["/SAPAPO/PLPRO", "/SAPAPO/MATLOC", "/SAPAPO/PPDSPLPR"],
      tcodes: ["/SAPAPO/CDPSC5", "/SAPAPO/MAT1"],
      fiori: ["F2101", "F1605"],
      configHe: [
        "Maintain Planning Procedure: הגדר reactions לאירועי-תכנון (immediate / planning-run / no automatic).",
        "שייך היוריסטיקה לנוהל (איזה אלגוריתם מופעל בתגובה).",
        "שייך נוהל לחומרים ברמת-product (/SAPAPO/MAT1).",
      ],
      flow: [
        { he: "הגדרת נוהל-תכנון", code: "/SAPAPO/CDPSC5", note: "reactions" },
        { he: "שיוך היוריסטיקה לנוהל", note: "אלגוריתם-תגובה" },
        { he: "שיוך נוהל לחומר", code: "/SAPAPO/MAT1" },
        { he: "תגובה לאירוע-תכנון", note: "immediate/run" },
      ],
      masterDataHe: [
        "Planning Procedure מוגדר ברמת-product (/SAPAPO/MATLOC) — לכל חומר/location.",
        "הנוהל מצביע על ההיוריסטיקה המופעלת בתגובה לאירוע.",
      ],
      mistakesHe: [
        "Immediate planning על יותר-מדי חומרים ➔ עומס-מערכת כבד.",
        "נוהל 'no automatic' לחומר שצריך תגובה ➔ דרישות לא מטופלות.",
      ],
      troubleshootHe: [
        "חומר לא מגיב לדרישה חדשה ➔ נוהל-תכנון 'no automatic' או לא משויך.",
        "המערכת איטית מאוד ➔ יותר-מדי חומרים ב-immediate planning.",
      ],
      bestPracticeHe: [
        "השתמש ב-immediate planning רק לחומרים קריטיים/מהירים.",
        "השאר את הרוב ל-planning-run להפחתת-עומס.",
      ],
      interviewHe: [
        { qHe: "מה קובע Planning Procedure?", aHe: "כיצד חומר מגיב לאירועי-תכנון: תכנון-מיידי, סימון-להרצה, או ללא-תגובה-אוטומטית; וגם איזו היוריסטיקה מופעלת." },
        { qHe: "מה הסיכון בתכנון-מיידי גורף?", aHe: "עומס-מערכת כבד — כל שינוי-קטן מפעיל היוריסטיקה; מיועד רק לחומרים קריטיים." },
      ],
      takeawaysHe: [
        "Planning Procedure = מתג-התגובתיות של החומר.",
        "immediate / planning-run / no-automatic.",
        "אזן תגובתיות מול עומס-מערכת.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · היוריסטיקות (3.3)", href: "/library/ppds/chapter-03/#sub-3.3" },
      ],
      children: [
        {
          id: "3.4.1",
          titleHe: "הגדרות נוהל התכנון",
          titleEn: "Planning Procedure Settings",
          execHe: "הגדרות-נוהל-התכנון מפרטות, לכל סוג-אירוע (יצירת/שינוי/מחיקת דרישה או היצע), מהי התגובה ואיזו היוריסטיקה מופעלת. כך נשלטת התנהגות-החומר ברזולוציה של אירוע-בודד.",
          beginnerHe: "כל נוהל מורכב מטבלת 'אם-אז': אם נוצרה דרישה ← תעשה X; אם נמחקה הזמנה ← תעשה Y. ההגדרות הן מילוי הטבלה הזו.",
          consultantHe: "ב-/SAPAPO/CDPSC5 מגדירים לכל נוהל את ה-reaction-to-events: לכל event-type בוחרים אחת מאפשרויות-התגובה (1/3/4...) ומשייכים היוריסטיקה. ניתן להפעיל גם 'planning in planning run' לאירועים מסוימים ו-'immediate' לאחרים — שליטה דקה. הנוהל גם קובע אם נדרש re-planning של pegging-relationships.",
          purposeHe: "לאפשר שליטה מדויקת בהתנהגות-תכנון לכל סוג-אירוע, ולא רק החלטה גורפת אחת.",
          processExampleHe: "נוהל שמגדיר: יצירת-דרישה ← immediate; שינוי-כמות ← mark for planning-run; מחיקה ← no action. כך אירועים-חשובים מטופלים מיד והשאר נצברים להרצה.",
          cbcHe: "ב-CBC נוהל קו-המילוי: דרישת-מכירה חדשה ← immediate (להגיב מהר); שינוי-תאריך קטן ← planning-run הלילית.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Planning Procedure ► Maintain Planning Procedure (Reactions)",
            "Advanced Planning ► PP/DS ► Planning Procedure ► Define Reactions to Events (/SAPAPO/CDPSC5)",
          ],
          tables: ["/SAPAPO/PLPRO", "/SAPAPO/PLPROREAC"],
          tcodes: ["/SAPAPO/CDPSC5"],
          fiori: ["F2101"],
          configHe: [
            "לכל event-type הגדר reaction (1/3/4) והיוריסטיקה מופעלת.",
            "קבע אם נדרש re-planning של pegging.",
            "שלב immediate ו-planning-run לאירועים שונים באותו נוהל.",
          ],
          mistakesHe: [
            "תגובה אחידה לכל האירועים במקום הבחנה לפי-חשיבות.",
            "שיוך היוריסטיקה לא-מתאימה לאירוע.",
          ],
          troubleshootHe: [
            "אירוע מסוים לא מטופל ➔ reaction מוגדר 'no action' לאותו event-type.",
            "תכנון-מחדש מיותר ➔ re-planning של pegging מופעל ללא-צורך.",
          ],
          bestPracticeHe: [
            "הבחן בין אירועים-חשובים (immediate) לזניחים (planning-run).",
            "תעד את מטריצת ה'אם-אז' של כל נוהל.",
          ],
          interviewHe: [
            { qHe: "כיצד שולטים בתגובה לאירוע-תכנון ספציפי?", aHe: "בהגדרות-הנוהל לכל event-type בוחרים reaction (immediate/planning-run/none) ומשייכים היוריסטיקה — שליטה ברזולוציית-אירוע." },
          ],
          takeawaysHe: [
            "הנוהל = מטריצת 'אם-אז' לאירועי-תכנון.",
            "reaction + היוריסטיקה לכל event-type.",
            "הבחן לפי-חשיבות-האירוע.",
          ],
        },
        {
          id: "3.4.2",
          titleHe: "הגדרות להרצות תכנון ייצור ב-PP/DS",
          titleEn: "Settings for Production Planning Runs in PP/DS",
          execHe: "הרצת-תכנון-ייצור (Production Planning Run) היא הביצוע-האצווה של היוריסטיקות על אוכלוסיית-חומרים גדולה — בדרך-כלל בלילה. ההגדרות קובעות את היקף-ההרצה (net-change/regenerative), את ה-Heuristic Profile המופעל, ואת קבוצת-החומרים והמיקומים.",
          beginnerHe: "במקום לתכנן כל חומר ידנית, מריצים 'הרצה גדולה' שעוברת על כל החומרים ומפעילה עליהם היוריסטיקות. ההגדרות קובעות מה נכלל בהרצה ומה היא עושה.",
          consultantHe: "ב-/SAPAPO/CDPSB0 (Production Planning Run) מגדירים variant: planning scope (net change בלבד מול regenerative מלא), Heuristic Profile, propagation range (אילו חומרים/location), ו-planning mode. Net-change מתכנן רק מה שהשתנה (מהיר); regenerative מתכנן הכל מחדש (כבד, לאתחול). ההרצה מתועדת ב-Application Log. לרוב מתזמנים אותה ב-background job לילי.",
          purposeHe: "לתכנן ביעילות אוכלוסיית-חומרים גדולה באצווה, תוך בחירת-היקף שמאזן בין שלמות לבין זמן-ריצה.",
          processExampleHe: "Variant לילי: net-change + Heuristic Profile 'תכנון-יומי' + propagation range של כל המפעל. ה-job רץ ב-02:00, ובבוקר התכנית מעודכנת.",
          cbcHe: "ב-CBC הרצת-net-change לילית מפעילה את פרופיל קו-המילוי על כל המשקאות; הרצת-regenerative מלאה מורצת רק בסופי-שבוע לאיפוס-מלא של התכנית.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Planning Procedure ► Define Settings for Production Planning Run",
            "Advanced Planning ► PP/DS ► Production Planning Run (/SAPAPO/CDPSB0) ► Define Planning Variant",
          ],
          tables: ["/SAPAPO/PPRUN", "/SAPAPO/PROPRANGE", "/SAPAPO/HEUR_PRO"],
          tcodes: ["/SAPAPO/CDPSB0", "/SAPAPO/RRP_NETCH", "/SAPAPO/CDPSB1"],
          fiori: ["F2101", "F4006"],
          configHe: [
            "Planning scope: net-change (רק שינויים) מול regenerative (הכל מחדש).",
            "Heuristic Profile: אילו היוריסטיקות ובאיזה סדר.",
            "Propagation range: אילו חומרים/location נכללים.",
            "תזמון ב-background job (לילי) + תיעוד ב-Application Log.",
          ],
          flow: [
            { he: "הגדרת variant", code: "/SAPAPO/CDPSB0", note: "scope+profile" },
            { he: "בחירת net-change/regenerative", note: "מהיר/מלא" },
            { he: "propagation range", note: "חומרים/location" },
            { he: "תזמון background job", note: "לילי" },
            { he: "בדיקת Application Log", code: "/SAPAPO/RRPLOG1" },
          ],
          mistakesHe: [
            "regenerative יומי ➔ זמן-ריצה ארוך מיותר; השתמש ב-net-change.",
            "propagation range רחב מדי ➔ הרצה איטית.",
            "Heuristic Profile שגוי בהרצה ➔ תכנון לא-נכון בקנה-מידה.",
          ],
          troubleshootHe: [
            "ההרצה ארוכה מאוד ➔ regenerative במקום net-change או range רחב.",
            "חומרים לא-מתוכננים בהרצה ➔ מחוץ ל-propagation range.",
            "תוצאות שגויות ➔ Heuristic Profile לא-מתאים; בדוק Application Log.",
          ],
          bestPracticeHe: [
            "net-change לילי שגרתי; regenerative מדי-פעם לאיפוס.",
            "צמצם propagation range לרלוונטי בלבד.",
            "נטר את Application Log לאחר כל הרצה.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין net-change ל-regenerative planning run?", aHe: "net-change מתכנן רק חומרים שהשתנו (מהיר, ליום-יום); regenerative מתכנן הכל מחדש (כבד, לאיפוס/אתחול)." },
            { qHe: "כיצד מתזמנים הרצת-תכנון-ייצור?", aHe: "מגדירים variant (scope+Heuristic Profile+propagation range) ומתזמנים כ-background job, בדרך-כלל לילי, ומנטרים את ה-Application Log." },
          ],
          takeawaysHe: [
            "הרצת-תכנון = ביצוע-אצווה של היוריסטיקות בקנה-מידה.",
            "net-change ליום-יום, regenerative לאיפוס.",
            "Heuristic Profile + propagation range קובעים מה ההרצה עושה.",
          ],
          relatedHe: [
            { labelHe: "PP/DS · יומני-יישום (3.7)", href: "/library/ppds/chapter-03/#sub-3.7" },
          ],
        },
      ],
    },
    // ============================================================ 3.5
    {
      id: "3.5",
      titleHe: "הגדרות תצוגת ההזמנה",
      titleEn: "Order View Settings",
      execHe:
        "תצוגת-ההזמנה (Order View) קובעת כיצד המתכנן רואה ומנהל הזמנות-תכנון, פק\"עות והזמנות-רכש בכלי-התכנון (Product View /SAPAPO/RRP3 ו-Receipts View). ההגדרות שולטות באילו עמודות, שדות, צבעים ופעולות זמינים — כלי-העבודה היומיומי של המתכנן.",
      beginnerHe:
        "כשהמתכנן פותח חומר, הוא רואה רשימת-הזמנות עם עמודות (תאריך, כמות, סטטוס). תצוגת-ההזמנה קובעת אילו עמודות מוצגות, באיזה סדר, ומה אפשר לעשות מהמסך. זה 'המסך הראשי' של המתכנן.",
      consultantHe:
        "Order View profiles (ב-/SAPAPO/RRP3 ובהגדרות) מגדירים את ה-layout: עמודות, קיבוץ, מיון, סינון לפי order-type, וצבעי-חריגה (alerts). ניתן להגדיר פרופילי-תצוגה שונים לתפקידים שונים. התצוגה קשורה ל-Alert Monitor — חריגות מסומנות בצבע. הגדרה טובה מקצרת משמעותית את זמן-טיפול-המתכנן בחריגות.",
      purposeHe:
        "לתת למתכנן מסך-עבודה ממוקד, שמדגיש את מה שדורש-טיפול (חריגות) ומסתיר רעש, ומאפשר פעולות-תכנון ישירות.",
      processExampleHe:
        "המתכנן פותח את ה-Product View, רואה את כל ההיצע-מול-דרישה לחומר, עם הזמנות-באיחור מסומנות אדום; הוא גורר תאריך או מפעיל היוריסטיקה ישירות מהמסך.",
      cbcHe:
        "ב-CBC תצוגת-המתכנן מציגה לכל משקה את פקודות-המילוי הקרובות, עם התרעה אדומה על מחסור-תרכיז או חריגת-קיבולת-קו; המתכנן מתעדף לפי הצבעים.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Order View / Product View ► Define Order View Profile",
        "Advanced Planning ► PP/DS ► Interactive Planning ► Product Planning Table / Product View (/SAPAPO/RRP3)",
      ],
      tables: ["/SAPAPO/ORDVIEW", "/SAPAPO/ALERTPRO", "/SAPAPO/ORDMAP"],
      tcodes: ["/SAPAPO/RRP3", "/SAPAPO/RRP4", "/SAPAPO/AMON1"],
      fiori: ["F2101", "F4006"],
      configHe: [
        "Order View profile: עמודות, סדר, קיבוץ ומיון של הזמנות.",
        "סינון לפי order-type (planned order / process order / purchase req).",
        "Alert integration: צבעי-חריגה מ-Alert Monitor.",
        "פרופילי-תצוגה שונים לתפקידי-מתכנן שונים.",
      ],
      mistakesHe: [
        "תצוגה עמוסת-עמודות ➔ המתכנן מתקשה לאתר חריגות.",
        "ללא חיבור Alert ➔ חריגות לא בולטות.",
      ],
      troubleshootHe: [
        "עמודה חסרה בתצוגה ➔ לא נכללה ב-Order View profile.",
        "חריגות לא צבועות ➔ Alert profile לא משויך לתצוגה.",
      ],
      bestPracticeHe: [
        "הצג רק עמודות רלוונטיות; הדגש חריגות בצבע.",
        "התאם פרופיל-תצוגה לכל תפקיד-מתכנן.",
      ],
      interviewHe: [
        { qHe: "מה קובעת תצוגת-ההזמנה ב-PP/DS?", aHe: "את ה-layout של הזמנות במסכי-התכנון — עמודות, מיון, סינון וצבעי-חריגה; כלי-העבודה היומיומי של המתכנן." },
        { qHe: "כיצד מודגשות חריגות בתצוגה?", aHe: "דרך אינטגרציה ל-Alert Monitor — הזמנות חורגות נצבעות, והמתכנן מתעדף לפי-צבע." },
      ],
      takeawaysHe: [
        "תצוגת-ההזמנה = מסך-העבודה של המתכנן.",
        "עמודות + סינון + צבעי-חריגה.",
        "התאמה לתפקיד מקצרת טיפול-בחריגות.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · לוח-התזמון המפורט (3.6)", href: "/library/ppds/chapter-03/#sub-3.6" },
        { labelHe: "PP/DS · יומני-יישום (3.7)", href: "/library/ppds/chapter-03/#sub-3.7" },
      ],
    },
    // ============================================================ 3.6
    {
      id: "3.6",
      titleHe: "לוח התכנון לתזמון מפורט",
      titleEn: "Detailed Scheduling Planning Board",
      execHe:
        "לוח-התזמון-המפורט (Detailed Scheduling Planning Board, DS Board, /SAPAPO/CDPS0) הוא הכלי הגרפי-האינטראקטיבי המרכזי של PP/DS: גאנט שבו המתכנן רואה הזמנות על-גבי משאבים לאורך-ציר-זמן, וגורר/מתזמן/מיישב התנגשויות ידנית. הוא 'חדר-הבקרה' של רצפת-הייצור.",
      beginnerHe:
        "ה-DS Board הוא תרשים-גאנט: שורות = קווים/מכונות, ציר-אופקי = זמן, ומלבנים = הזמנות. המתכנן רואה מתי כל הזמנה רצה על כל קו, גורר אותן בעכבר, ופותר התנגשויות (שתי הזמנות על אותו קו). זה הכלי הויזואלי המרכזי לתזמון.",
      consultantHe:
        "ה-DS Board נשלט על-ידי Overall Profile (/SAPAPO/CDPSC0) המאגד את כל תתי-הפרופילים: Time Profile (אופק-תצוגה), Work Area (אילו משאבים/מוצרים), Planning Board Profile (פריסת-גרפיקה), Strategy Profile (חוקי-תזמון בגרירה), Heuristic Profile, ו-Optimization Profile. הפעלה דרך /SAPAPO/CDPS0. מ-DS Board מפעילים היוריסטיקות, אופטימייזר, ו-deallocation. הבנת מבנה-הפרופילים היא המפתח להגדרת-הלוח.",
      purposeHe:
        "לתת למתכנן שליטה גרפית מלאה על התזמון — לראות עומסים, לפתור התנגשויות, ולהפעיל אוטומציות — במקום אחד אינטראקטיבי.",
      processExampleHe:
        "המתכנן פותח את ה-DS Board, רואה שעל קו-1 שתי הזמנות חופפות; הוא גורר אחת לקו-2, מפעיל היוריסטיקת-תזמון לסידור-מחדש, ולבסוף אופטימייזר למזעור-זמני-מעבר.",
      cbcHe:
        "ב-CBC ראש-המשמרת פותח את ה-DS Board לקווי-המילוי, רואה את רצף-המוצרים ליום, גורר כדי לקבץ אותו-טעם יחד (פחות CIP), ומפעיל אופטימייזר למזעור החלפות-טעם וזמני-ניקוי.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► Detailed Scheduling Planning Board ► Maintain Overall Profile (/SAPAPO/CDPSC0)",
        "Advanced Planning ► PP/DS ► Detailed Scheduling ► Detailed Scheduling Planning Board (/SAPAPO/CDPS0)",
      ],
      tables: ["/SAPAPO/CDPSPROF", "/SAPAPO/DS_TPROF", "/SAPAPO/DS_WAREA"],
      tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSC0", "/SAPAPO/CDPSC2"],
      fiori: ["F2101", "F4006"],
      configHe: [
        "Overall Profile (/SAPAPO/CDPSC0): מאגד Time/Work Area/Planning Board/Strategy/Heuristic/Optimization profiles.",
        "הפעלה: /SAPAPO/CDPS0 עם Overall Profile נבחר.",
        "פעולות מהלוח: גרירה, היוריסטיקות, אופטימייזר, deallocation, fixing.",
      ],
      flow: [
        { he: "Overall Profile", code: "/SAPAPO/CDPSC0", note: "מאגד תתי-פרופילים" },
        { he: "Time Profile", note: "אופק-תצוגה" },
        { he: "Work Area", note: "משאבים/מוצרים" },
        { he: "Planning Board Profile", note: "גרפיקה" },
        { he: "פתיחת הלוח", code: "/SAPAPO/CDPS0" },
      ],
      mistakesHe: [
        "Overall Profile חסר תת-פרופיל ➔ הלוח לא נפתח/חלקי.",
        "Work Area רחב מדי ➔ לוח עמוס ואיטי.",
      ],
      troubleshootHe: [
        "הלוח לא נפתח ➔ Overall Profile לא-שלם או לא-נבחר.",
        "משאב/הזמנה חסרים בלוח ➔ Work Area לא כולל אותם.",
      ],
      bestPracticeHe: [
        "בנה Overall Profiles ממוקדי-תפקיד/אזור.",
        "צמצם את ה-Work Area למשאבים הרלוונטיים בלבד.",
      ],
      interviewHe: [
        { qHe: "מהו ה-DS Board וכיצד הוא מופעל?", aHe: "כלי-גאנט גרפי-אינטראקטיבי לתזמון הזמנות על משאבים; מופעל ב-/SAPAPO/CDPS0 עם Overall Profile (/SAPAPO/CDPSC0)." },
        { qHe: "מה מאגד ה-Overall Profile?", aHe: "את כל תתי-הפרופילים: Time, Work Area, Planning Board, Strategy, Heuristic ו-Optimization." },
      ],
      takeawaysHe: [
        "DS Board = חדר-הבקרה הגרפי לתזמון (/SAPAPO/CDPS0).",
        "Overall Profile מאגד את כל תתי-הפרופילים.",
        "ממנו מפעילים גרירה, היוריסטיקות ואופטימייזר.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · אופטימייזר (3.8)", href: "/library/ppds/chapter-03/#sub-3.8" },
        { labelHe: "PP/DS · היוריסטיקות (3.3)", href: "/library/ppds/chapter-03/#sub-3.3" },
      ],
      children: [
        {
          id: "3.6.1",
          titleHe: "פרופיל-על",
          titleEn: "Overall Profile",
          execHe: "ה-Overall Profile הוא פרופיל-העל של ה-DS Board: הוא מצביע על כל תתי-הפרופילים (Time, Work Area, Planning Board, Strategy, Heuristic, Optimization) ומגדיר את חוויית-העבודה השלמה. בחירת Overall Profile בכניסה ל-/SAPAPO/CDPS0 קובעת מה המתכנן יראה ויוכל לעשות.",
          beginnerHe: "במקום להגדיר עשרה פרופילים בכל פתיחת-לוח, ה-Overall Profile 'אורז' את כולם לאחד. בוחרים אותו פעם — והלוח נפתח עם כל ההגדרות הנכונות.",
          consultantHe: "ב-/SAPAPO/CDPSC0 מגדירים Overall Profile ומשייכים לו: Time Profile, Work Area, Planning Board Profile, Strategy Profile, Heuristic Profile ו-Optimization Profile. ניתן ליצור Overall Profiles רבים לתפקידים/אזורים שונים. זהו ה'מנהל' של כל שאר-הפרופילים.",
          purposeHe: "לארוז את כל הגדרות-הלוח לישות-אחת ניתנת-לבחירה, ולתת חוויות-עבודה שונות לתפקידים שונים בלחיצה.",
          processExampleHe: "מגדירים Overall Profile 'מתכנן-מילוי' עם Work Area של קווי-המילוי, Time Profile של שבוע, ו-Heuristic Profile מתאים; המתכנן בוחר אותו וכל הלוח מוכן.",
          cbcHe: "ב-CBC קיימים Overall Profiles נפרדים: 'מילוי', 'ערבוב' ו-'אריזה' — כל אחד עם המשאבים, האופק וההיוריסטיקות שלו.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► DS Board ► Maintain Overall Profile (/SAPAPO/CDPSC0)",
          ],
          tables: ["/SAPAPO/CDPSPROF"],
          tcodes: ["/SAPAPO/CDPSC0", "/SAPAPO/CDPS0"],
          fiori: ["F2101"],
          configHe: [
            "צור Overall Profile ושייך: Time / Work Area / Planning Board / Strategy / Heuristic / Optimization profiles.",
            "צור פרופילים שונים לתפקידים/אזורי-ייצור שונים.",
          ],
          mistakesHe: [
            "Overall Profile חסר תת-פרופיל חובה ➔ הלוח לא נפתח כראוי.",
            "פרופיל-על אחד גנרי לכל התפקידים.",
          ],
          troubleshootHe: [
            "הלוח לא נפתח ➔ תת-פרופיל חסר/שגוי ב-Overall Profile.",
          ],
          bestPracticeHe: [
            "בנה Overall Profile לכל תפקיד/אזור.",
            "ודא שכל תתי-הפרופילים מוגדרים לפני השיוך.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-Overall Profile ב-DS Board?", aHe: "לאגד את כל תתי-הפרופילים (Time/Work Area/Planning Board/Strategy/Heuristic/Optimization) לישות-בחירה אחת בכניסה ללוח." },
          ],
          takeawaysHe: [
            "Overall Profile = פרופיל-העל המאגד את כולם.",
            "מוגדר ב-/SAPAPO/CDPSC0.",
            "פרופיל לכל תפקיד/אזור.",
          ],
        },
        {
          id: "3.6.2",
          titleHe: "פרופיל זמן",
          titleEn: "Time Profile",
          execHe: "ה-Time Profile קובע את אופק-הזמן המוצג בלוח: תאריך-התחלה (יחסי/מוחלט), אורך-הצגה, ופירוט-ציר-הזמן (שעות/ימים/שבועות). הוא קובע 'כמה רחוק' ו'באיזו רזולוציה' רואים את הגאנט.",
          beginnerHe: "כמו זום על ציר-הזמן: ה-Time Profile מחליט אם רואים יום (בפירוט-שעות) או חודש (בפירוט-ימים), ומאיזה תאריך מתחילים.",
          consultantHe: "ב-/SAPAPO/CDPSC2 מגדירים Time Profile: Planning period (start/end יחסיים, למשל 'מהיום עד +14 יום'), Display period, ו-Time bucket granularity. אופק קצר ומפורט = תזמון-עדין; אופק ארוך = תמונה-רחבה. ה-Time Profile משויך ל-Overall Profile.",
          purposeHe: "להתאים את חלון-הזמן ואת רזולוציית-התצוגה למשימה — תזמון-עדין-יומי מול תכנון-שבועי.",
          processExampleHe: "Time Profile 'יומי-מפורט': מהיום עד +3 ימים, ברזולוציית-שעות — מתאים לתזמון-עדין של רצף-קו.",
          cbcHe: "ב-CBC ראש-המשמרת משתמש ב-Time Profile של 24-48 שעות ברזולוציית-שעות לתזמון-מדויק של רצף-המילוי; מנהל-התכנון משתמש ב-Time Profile שבועי לתמונה-רחבה.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► DS Board ► Maintain Time Profile (/SAPAPO/CDPSC2)",
          ],
          tables: ["/SAPAPO/DS_TPROF"],
          tcodes: ["/SAPAPO/CDPSC2", "/SAPAPO/CDPS0"],
          fiori: ["F2101"],
          configHe: [
            "Planning/Display period: התחלה/סוף יחסיים (למשל היום עד +14).",
            "Time bucket granularity: שעות / ימים / שבועות.",
            "שייך ל-Overall Profile.",
          ],
          mistakesHe: [
            "אופק ארוך ברזולוציית-שעות ➔ לוח כבד ואיטי.",
            "אופק קצר מדי ➔ לא רואים הזמנות-עתידיות רלוונטיות.",
          ],
          troubleshootHe: [
            "הזמנות לא נראות בלוח ➔ הן מחוץ ל-Time Profile period.",
            "הלוח איטי ➔ רזולוציה עדינה-מדי על אופק-ארוך.",
          ],
          bestPracticeHe: [
            "התאם אופק+רזולוציה למשימה (תזמון יומי מול שבועי).",
            "השתמש בתאריכים יחסיים כדי שהפרופיל יהיה רב-שימושי.",
          ],
          interviewHe: [
            { qHe: "מה קובע ה-Time Profile?", aHe: "את אופק-הזמן המוצג בלוח (תקופת-תכנון/תצוגה) ואת רזולוציית-ציר-הזמן (שעות/ימים/שבועות)." },
          ],
          takeawaysHe: [
            "Time Profile = חלון-הזמן ורזולוציית-הלוח.",
            "תאריכים יחסיים = פרופיל רב-שימושי.",
            "אזן אופק מול רזולוציה לביצועים.",
          ],
        },
        {
          id: "3.6.3",
          titleHe: "אזור עבודה",
          titleEn: "Work Area",
          execHe: "ה-Work Area מגדיר אילו אובייקטים מוצגים בלוח: אילו resources (קווים/מכונות), אילו products, ואילו order-types. הוא ה'חתך' של עולם-התכנון שהמתכנן רואה — מסנן את הרלוונטי-לו בלבד.",
          beginnerHe: "במפעל יש עשרות קווים ומאות מוצרים. אף מתכנן לא צריך לראות הכל. ה-Work Area הוא ה'מסנן' שמחליט אילו קווים ומוצרים יופיעו על הלוח שלו.",
          consultantHe: "ב-/SAPAPO/CDPSC4 מגדירים Work Area עם selection של resources/products (לפי PPM, location, planner) ו-order categories. ניתן להגדיר selection דינמי (לפי MRP controller) או סטטי (רשימה). ה-Work Area הוא הקובע-המרכזי של ביצועי-הלוח — Work Area ממוקד = לוח מהיר ונקי.",
          purposeHe: "להציג למתכנן רק את המשאבים והמוצרים שבאחריותו, לשיפור-מיקוד וביצועי-לוח.",
          processExampleHe: "Work Area 'קווי-מילוי-משקה-קל' כולל רק את 3 קווי-המילוי הרלוונטיים ואת המשקאות הרצים עליהם — המתכנן לא נחשף לקווי-ערבוב.",
          cbcHe: "ב-CBC כל ראש-קו מקבל Work Area של הקווים שלו בלבד; מנהל-המפעל מקבל Work Area רחב הכולל את כל קווי-המילוי לתמונה-מלאה.",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► DS Board ► Maintain Work Area (/SAPAPO/CDPSC4)",
          ],
          tables: ["/SAPAPO/DS_WAREA", "/SAPAPO/RESOURCE"],
          tcodes: ["/SAPAPO/CDPSC4", "/SAPAPO/CDPS0"],
          fiori: ["F2336"],
          configHe: [
            "Selection: resources/products לפי location/planner/PPM (סטטי או דינמי).",
            "Order categories: אילו סוגי-הזמנות מוצגים.",
            "שייך ל-Overall Profile.",
          ],
          mistakesHe: [
            "Work Area רחב מדי ➔ לוח עמוס ואיטי.",
            "Work Area חסר משאב רלוונטי ➔ המתכנן 'עיוור' אליו.",
          ],
          troubleshootHe: [
            "משאב/מוצר חסר בלוח ➔ לא נכלל ב-Work Area selection.",
            "הלוח איטי ➔ Work Area רחב מדי.",
          ],
          bestPracticeHe: [
            "הגדר Work Area לפי-אחריות (ראש-קו מול מנהל).",
            "העדף selection דינמי (לפי planner) לתחזוקה קלה.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר ה-Work Area?", aHe: "אילו resources, products ו-order-types מוצגים בלוח — החתך הרלוונטי למתכנן; משפיע מהותית על ביצועי-הלוח." },
          ],
          takeawaysHe: [
            "Work Area = מסנן המשאבים/מוצרים בלוח.",
            "ממוקד = לוח מהיר ונקי.",
            "הגדר לפי-אחריות, העדף selection דינמי.",
          ],
        },
        {
          id: "3.6.4",
          titleHe: "פרופיל לוח התכנון",
          titleEn: "Planning Board Profile",
          execHe: "ה-Planning Board Profile קובע את הפריסה הגרפית של הלוח: אילו charts/rows מוצגים, צבעים, סמלים, מקרא, ואיזה מידע מופיע על-גבי מלבני-ההזמנה. הוא קובע את 'איך נראה' הלוח, להבדיל מ'מה מוצג בו' (Work Area) ו'מתי' (Time Profile).",
          beginnerHe: "אחרי שקבענו אילו קווים (Work Area) ואיזה טווח-זמן (Time Profile), ה-Planning Board Profile קובע את העיצוב: אילו צבעים, מה כתוב על כל מלבן-הזמנה, ואילו שורות-גרף נראות.",
          consultantHe: "ב-/SAPAPO/CDPSC1 (Planning Board section) מגדירים את ה-charts (resource chart, product chart, order chart), את graphical objects (צבעים לפי order-type/status), את ה-text שעל ה-operations, ואת ה-tooltips. הגדרת-תצוגה טובה הופכת חריגות לבולטות-עין. הפרופיל משויך ל-Overall Profile.",
          purposeHe: "לעצב לוח-קריא שמדגיש את המידע-החשוב (סטטוס, חריגה, מוצר) ויזואלית, להאצת-קבלת-החלטות.",
          processExampleHe: "Planning Board Profile צובע הזמנות-באיחור באדום, הזמנות-קבועות (fixed) באפור, ומציג על כל מלבן את מספר-המוצר וכמות — המתכנן 'קורא' את הלוח במבט.",
          cbcHe: "ב-CBC הלוח צובע כל טעם-משקה בצבע-שונה, כך שרצף-מוצרים-מאותו-טעם נראה כגוש-צבע אחיד — וניתן לזהות במבט היכן נדרש ניקוי-CIP (מעבר-צבע).",
          navHe: [
            "SPRO ► Advanced Planning ► PP/DS ► Detailed Scheduling ► DS Board ► Maintain Planning Board Profile (Charts & Graphics)",
          ],
          tables: ["/SAPAPO/CDPSPBPRO", "/SAPAPO/CDPSPROF"],
          tcodes: ["/SAPAPO/CDPSC1", "/SAPAPO/CDPS0"],
          fiori: ["F2101"],
          configHe: [
            "Charts: resource / product / order charts מוצגים.",
            "Graphical objects: צבעים לפי order-type/status.",
            "Text & tooltips: איזה מידע מופיע על מלבן-ההזמנה.",
            "שייך ל-Overall Profile.",
          ],
          mistakesHe: [
            "יותר-מדי מידע על מלבני-ההזמנה ➔ לוח עמוס וקשה-לקריאה.",
            "צבעים לא-עקביים ➔ בלבול בזיהוי-סטטוס.",
          ],
          troubleshootHe: [
            "מידע חסר על הזמנה ➔ לא הוגדר ב-text של הפרופיל.",
            "צבעים לא נכונים ➔ graphical-object mapping שגוי.",
          ],
          bestPracticeHe: [
            "השתמש בצבעים עקביים ומשמעותיים (אדום=חריגה).",
            "הצג מינימום-טקסט נחוץ על המלבנים.",
          ],
          interviewHe: [
            { qHe: "מה קובע ה-Planning Board Profile?", aHe: "את הפריסה הגרפית — charts, צבעים, טקסט ו-tooltips על ההזמנות; ה'איך נראה' הלוח, להבדיל מה-Work Area וה-Time Profile." },
          ],
          takeawaysHe: [
            "Planning Board Profile = העיצוב הגרפי של הלוח.",
            "charts + צבעים + טקסט על ההזמנות.",
            "עיצוב טוב הופך חריגות לבולטות-עין.",
          ],
        },
      ],
    },
    // ============================================================ 3.7
    {
      id: "3.7",
      titleHe: "יומני יישום ל-PP/DS",
      titleEn: "Application Logs for PP/DS",
      execHe:
        "יומני-היישום (Application Logs) מתעדים מה קרה בכל הרצת-תכנון, הפעלת-היוריסטיקה או אופטימיזציה: אילו הזמנות נוצרו, אילו אזהרות/שגיאות עלו, וכמה זמן ארך. הם כלי-האבחון המרכזי כשהתכנון 'לא עשה מה שציפינו'.",
      beginnerHe:
        "אחרי כל הרצה, המערכת רושמת 'יומן' של מה שקרה — הצלחות, אזהרות ושגיאות. כשמשהו משתבש, פותחים את היומן כדי לראות בדיוק מה המנוע עשה ולמה.",
      consultantHe:
        "ב-/SAPAPO/RRPLOG1 (PP/DS application log) ובהגדרות מגדירים את רמת-הרישום (log level) ואת תקופת-השמירה. הלוגים מקבצים messages לפי run/object. רמת-לוג גבוהה מדי = עומס-אחסון; נמוכה מדי = חוסר-מידע לאבחון. הלוגים נמחקים מחזורית דרך housekeeping job. שילוב עם ה-Production Planning Run וה-Optimizer חיוני לתחקור-תקלות.",
      purposeHe:
        "לספק שקיפות-מלאה ויכולת-אבחון לכל פעולת-תכנון אוטומטית, ולאתר במהירות מדוע תוצאה אינה כמצופה.",
      processExampleHe:
        "הרצת-לילה לא יצרה הזמנות לחומר מסוים; המתכנן פותח /SAPAPO/RRPLOG1, מאתר את ה-run, ורואה הודעת-שגיאה 'No source of supply' — מבין שה-PDS חסר ומתקן.",
      cbcHe:
        "ב-CBC לאחר הרצת-תכנון לילית, האחראי בודק את ה-Application Log לאיתור משקאות שלא-תוכננו (חסר-PDS/מחסור-תרכיז) לפני תחילת-המשמרת, וכך מונע הפתעות ברצפה.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Global Settings ► Configure Application Log (Log Level & Retention)",
        "Advanced Planning ► PP/DS ► Reporting ► Display Application Log (/SAPAPO/RRPLOG1)",
      ],
      tables: ["BALHDR", "BALDAT", "/SAPAPO/RRPLOG"],
      tcodes: ["/SAPAPO/RRPLOG1", "SLG1", "/SAPAPO/RRPLOGDEL"],
      fiori: ["F2101"],
      configHe: [
        "Log level: רמת-פירוט הרישום (errors-only עד full-detail).",
        "Retention: תקופת-שמירת-לוגים.",
        "Housekeeping: job מחזורי למחיקת לוגים ישנים (/SAPAPO/RRPLOGDEL).",
        "צפייה: /SAPAPO/RRPLOG1 (PP/DS) או SLG1 (כללי) לפי object.",
      ],
      mistakesHe: [
        "Log level גבוה תמידית ➔ ניפוח-אחסון.",
        "אי-הרצת housekeeping ➔ הלוגים תופחים ופוגעים בביצועים.",
        "התעלמות מאזהרות בלוג ➔ בעיות מצטברות.",
      ],
      troubleshootHe: [
        "תכנון לא יצר הזמנה ➔ פתח /SAPAPO/RRPLOG1; חפש 'No source of supply'/PDS חסר.",
        "הרצה איטית ➔ בדוק זמני-שלבים בלוג.",
        "לוג ריק ➔ log level נמוך מדי או הרישום כבוי.",
      ],
      bestPracticeHe: [
        "החזק log level מאוזן; העלה זמנית רק לאבחון.",
        "תזמן housekeeping job למחיקת לוגים ישנים.",
        "סקור את הלוג אחרי כל הרצת-תכנון מרכזית.",
      ],
      interviewHe: [
        { qHe: "לְמה משמשים יומני-היישום ב-PP/DS?", aHe: "לתיעוד ואבחון של הרצות-תכנון/היוריסטיקות/אופטימיזציה — אילו הזמנות נוצרו ואילו שגיאות/אזהרות עלו. נצפים ב-/SAPAPO/RRPLOG1." },
        { qHe: "מה הסיכון ברמת-לוג גבוהה תמידית?", aHe: "ניפוח-אחסון ופגיעה-בביצועים; מעלים log level רק זמנית לצורך-אבחון, ומריצים housekeeping." },
      ],
      takeawaysHe: [
        "Application Logs = שקיפות ואבחון לכל פעולת-תכנון.",
        "/SAPAPO/RRPLOG1 הוא הכלי המרכזי.",
        "אזן log level והרץ housekeeping.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הרצות-תכנון (3.4.2)", href: "/library/ppds/chapter-03/#sub-3.4.2" },
        { labelHe: "PP/DS · אופטימייזר (3.8)", href: "/library/ppds/chapter-03/#sub-3.8" },
      ],
    },
    // ============================================================ 3.8
    {
      id: "3.8",
      titleHe: "הגדרות אופטימייזר ב-PP/DS",
      titleEn: "PP/DS Optimizer Settings",
      execHe:
        "האופטימייזר (PP/DS Optimizer) הוא מנוע מתמטי שממזער פונקציית-מטרה (משוקללת מ-זמני-מעבר, איחורים, עלויות-עיכוב והפרת-תאריכים) על-פני תרחישי-תזמון, ומחזיר תכנית-תזמון אופטימלית. בניגוד להיוריסטיקה (כלל-פשוט), הוא 'מחשב' את הפתרון הטוב-ביותר — כבד יותר אך חזק יותר.",
      beginnerHe:
        "היוריסטיקה עוקבת אחר כלל קבוע; האופטימייזר 'חושב' — הוא בודק הרבה סידורים אפשריים ובוחר את הזול/המהיר ביותר לפי משקלות שהגדרנו. למשל: סדר את ההזמנות כך שיהיו הכי-מעט החלפות-טעם וכמה-שפחות איחורים.",
      consultantHe:
        "ה-Optimizer נשלט ע\"י Optimization Profile (cost functions + horizon) ו-Optimizer Settings (זמן-ריצה מקסימלי, runtime mode). פונקציית-המטרה משקללת: total lead time, setup time/cost, delays, max lateness, mode-costs. נדרש שרת-אופטימיזציה (Optimization server / APO Optimizer engine) המוגדר ב-RFC. מגדירים גם setup matrices (זמני/עלויות-מעבר בין מוצרים). האופטימייזר מופעל מ-DS Board או בהרצה. כיוונון-המשקלות הוא אמנות: משקל-יתר על setup עלול לדחות הזמנות.",
      purposeHe:
        "להפיק תכנית-תזמון אופטימלית-מתמטית היכן שמורכבות-הרצף (setup-dependent) גבוהה ופתרון-ידני/היוריסטי אינו מספיק — מזעור עלויות-מעבר ואיחורים בו-זמנית.",
      processExampleHe:
        "קו עם 10 מוצרים וזמני-החלפה תלויי-רצף: האופטימייזר, עם setup matrix, מסדר אותם כך שסך-זמני-ההחלפה מינימלי ואף-הזמנה לא מאחרת מעבר-לסף — בתוך זמן-ריצה של 5 דקות שהוגדר.",
      cbcHe:
        "ב-CBC זהו ה-use-case המובהק: לכל קו-מילוי setup matrix של זמני-ניקוי-CIP בין טעמים (מעבר מכהה-לבהיר=ניקוי-ארוך). האופטימייזר מסדר את רצף-המשקאות היומי כך שסך-זמני-הניקוי מינימלי, תוך עמידה בתאריכי-אספקה.",
      navHe: [
        "SPRO ► Advanced Planning ► PP/DS ► Optimization ► Maintain Optimization Profile (Cost Functions)",
        "SPRO ► Advanced Planning ► PP/DS ► Optimization ► Define Setup Matrix / Setup Groups",
        "Advanced Planning ► PP/DS ► Optimization ► Configure Optimization Server (RFC)",
      ],
      tables: ["/SAPAPO/OPTPROF", "/SAPAPO/SETMATRIX", "/SAPAPO/OPTSERVER"],
      tcodes: ["/SAPAPO/CDPSC3", "/SAPAPO/OPT11", "/SAPAPO/CDPSB2"],
      fiori: ["F2101", "F4006"],
      configHe: [
        "Optimization Profile: cost functions ומשקלותיהן (lead time / setup / delay / max-lateness).",
        "Optimizer Settings: זמן-ריצה מקסימלי, runtime mode, finite/horizon.",
        "Setup Matrix / Setup Groups: זמני/עלויות-מעבר תלויי-רצף בין מוצרים.",
        "Optimization Server: שרת-אופטימיזציה מוגדר ב-RFC destination.",
      ],
      flow: [
        { he: "הגדרת cost functions", code: "/SAPAPO/CDPSC3", note: "משקלות-מטרה" },
        { he: "Setup Matrix", note: "זמני-מעבר/CIP" },
        { he: "Optimizer Settings", note: "זמן-ריצה/mode" },
        { he: "חיבור Optimization Server", note: "RFC" },
        { he: "הפעלה מ-DS Board/הרצה", code: "/SAPAPO/CDPS0" },
      ],
      mistakesHe: [
        "משקל-יתר על setup ➔ האופטימייזר דוחה הזמנות (איחורים).",
        "זמן-ריצה קצר מדי ➔ פתרון לא-אופטימלי/לא-מתכנס.",
        "Setup matrix חסר/שגוי ➔ רצף לא-מיטבי, זמני-ניקוי גבוהים.",
        "שרת-אופטימיזציה לא-מוגדר (RFC) ➔ האופטימייזר לא רץ.",
      ],
      troubleshootHe: [
        "האופטימייזר לא רץ ➔ Optimization Server / RFC לא-מוגדר או לא-זמין.",
        "הזמנות מאחרות אחרי אופטימיזציה ➔ משקל-setup גבוה מדי מול delay.",
        "פתרון לא-מתכנס ➔ הארך זמן-ריצה מקסימלי.",
        "זמני-מעבר לא-נכונים ➔ Setup matrix שגוי/חסר.",
      ],
      bestPracticeHe: [
        "כייל cost functions בהדרגה; בחן השפעת-משקלות על תרחיש-אמת.",
        "תחזק Setup matrix מדויק — הוא לב-האופטימיזציה.",
        "הקצה זמן-ריצה ריאלי; אזן איכות מול זמן.",
        "השתמש באופטימייזר רק היכן שהרצף תלוי-setup מהותית.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין האופטימייזר להיוריסטיקה?", aHe: "היוריסטיקה מיישמת כלל פשוט; האופטימייזר ממזער פונקציית-מטרה משוקללת (זמן/setup/איחורים) על-פני תרחישים — חזק אך כבד, ודורש שרת-אופטימיזציה." },
        { qHe: "מהו setup matrix ומדוע הוא קריטי לאופטימייזר?", aHe: "מטריצת זמני/עלויות-מעבר תלויי-רצף בין מוצרים; היא הקלט המרכזי למזעור-זמני-המעבר — למשל זמני-ניקוי-CIP בין טעמים." },
        { qHe: "מה קורה אם משקל-ה-setup גבוה מדי בפונקציית-המטרה?", aHe: "האופטימייזר יעדיף לקבץ מוצרים-דומים עד-כדי דחיית-הזמנות וגרימת-איחורים; צריך לאזן מול משקל-delay." },
      ],
      takeawaysHe: [
        "האופטימייזר ממזער פונקציית-מטרה משוקללת — חזק יותר מהיוריסטיקה.",
        "Setup matrix (זמני-CIP) הוא הקלט המרכזי.",
        "דורש Optimization Server (RFC) וכיול-משקלות זהיר.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · היוריסטיקות (3.3)", href: "/library/ppds/chapter-03/#sub-3.3" },
        { labelHe: "PP/DS · לוח-התזמון המפורט (3.6)", href: "/library/ppds/chapter-03/#sub-3.6" },
      ],
    },
    // ============================================================ 3.9
    {
      id: "3.9",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את מלוא קונפיגורציית PP/DS המוטמע ב-S/4HANA: מהפעלת-הקומפוננטה, דרך הגדרות-בסיס (Model 000/Version 000, אינטגרציה, נתוני-תנועה, סכמה, פרמטרים גלובליים, נתוני-אב), היוריסטיקות ופרופיליהן, נהלי-תכנון והרצות-ייצור, תצוגת-הזמנות, לוח-התזמון-המפורט וכל פרופיליו, יומני-יישום, ועד האופטימייזר. יחד אלה מרכיבים מערכת-תכנון-מתקדמת מלאה.",
      beginnerHe:
        "התחלנו ב'הדלקת' PP/DS, בנינו את 'מגרש-המשחקים' (Model 000), חיברנו אותו לליבה, הגדרנו את כללי-התכנון האוטומטיים (היוריסטיקות ונהלים), נתנו למתכנן מסך-עבודה (תצוגת-הזמנה) וכלי-גרפי (DS Board), הוספנו יומנים-לאבחון, ולבסוף את המנוע-החכם (אופטימייזר). זו התמונה השלמה של איך מקימים PP/DS.",
      consultantHe:
        "הרצף הקונפיגורטיבי: (1) הפעלת Business Function; (2) Model 000/Version 000 + אינטגרציה + נתוני-תנועה; (3) פרמטרים גלובליים ו-PP/DS horizon; (4) נתוני-אב (Planning Procedure/Strategy/PDS); (5) היוריסטיקות → Heuristic Profiles; (6) Planning Procedures → Production Planning Run (net-change/regenerative); (7) Order View; (8) DS Board (Overall→Time/Work Area/Planning Board profiles); (9) Application Logs; (10) Optimizer (cost functions + setup matrix + RFC server). זכור את היררכיית-הסכמה ואת ההבחנה היוריסטיקה-מול-אופטימייזר.",
      purposeHe:
        "לקבע את התמונה-הכוללת ואת סדר-המימוש הנכון, כדי שהיועץ ידע להקים PP/DS מקצה-לקצה ולאתר היכן כל הגדרה משתבצת.",
      processExampleHe:
        "מימוש מלא: צוות-בסיס מפעיל את הקומפוננטה; היועץ מאמת Model 000, מגדיר אינטגרציה ופרמטרים, מקים נתוני-אב, בונה היוריסטיקות ונהלים, מתזמן הרצת-לילה, מגדיר תצוגות ו-DS Board, מפעיל אופטימייזר לקווים תלויי-setup, ומנטר Application Logs.",
      cbcHe:
        "ב-CBC התוצר הוא מערכת המתזמנת אוטומטית את רצף-המשקאות על קווי-המילוי: היוריסטיקות יוצרות פקודות-מילוי, האופטימייזר ממזער זמני-ניקוי-CIP לפי setup matrix, וה-DS Board נותן לראש-המשמרת שליטה-גרפית — הכל מתועד ביומנים.",
      navHe: [
        "SPRO ► Advanced Planning ► Production Planning and Detailed Scheduling (PP/DS) (ענף-העל — סיכום כל הענפים)",
        "Advanced Planning ► PP/DS ► Global Settings / Heuristics / Planning Procedure / Detailed Scheduling / Optimization",
      ],
      tables: ["/SAPAPO/MATLOC", "/SAPAPO/HEUR", "/SAPAPO/PLPRO", "/SAPAPO/CDPSPROF", "/SAPAPO/OPTPROF"],
      tcodes: ["/SAPAPO/CDPS0", "/SAPAPO/CDPSB0", "/SAPAPO/RRP3", "/SAPAPO/RRPLOG1"],
      fiori: ["F2101", "F4006", "F1605"],
      configHe: [
        "סדר-מימוש: הפעלה → בסיס → גלובלי → נתוני-אב → היוריסטיקות → נהלים/הרצות → תצוגות → DS Board → לוגים → אופטימייזר.",
        "היררכיית-סכמה: גלובלי → אב → הרצה → אינטראקטיבי.",
        "הבחנה מרכזית: היוריסטיקה (כלל) מול אופטימייזר (מזעור-פונקציית-מטרה).",
      ],
      mistakesHe: [
        "הקמה לא-לפי-הסדר ➔ הגדרות מנותקות ותכנון לא-עקבי.",
        "ערבוב בין תפקיד-היוריסטיקה לתפקיד-אופטימייזר.",
        "התעלמות מ-Application Logs בתחקור-תקלות.",
      ],
      troubleshootHe: [
        "תכנון לא-עובד מקצה-לקצה ➔ עקוב אחר הרצף: הפעלה→בסיס→אב→היוריסטיקה.",
        "תוצאה לא-צפויה ➔ בדוק היררכיית-סכמה ו-Application Logs.",
      ],
      bestPracticeHe: [
        "מַמֵש מלמעלה-למטה לפי סדר-הסכמה.",
        "תעד כל פרופיל והגדרה; שמור Model 000 פרודקטיבי בלבד.",
        "השתמש באופטימייזר רק היכן שנדרש; היוריסטיקות לרוב-המקרים.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-המימוש הנכון של PP/DS?", aHe: "הפעלת-קומפוננטה → הגדרות-בסיס (Model 000/אינטגרציה) → פרמטרים גלובליים → נתוני-אב → היוריסטיקות → נהלים/הרצות → תצוגות → DS Board → לוגים → אופטימייזר." },
        { qHe: "מה ההבחנה המרכזית שיש לזכור מהפרק?", aHe: "היוריסטיקה מיישמת כלל על קבוצת-אובייקטים; האופטימייזר ממזער פונקציית-מטרה — שניהם מופעלים מהרצה או מה-DS Board." },
      ],
      takeawaysHe: [
        "PP/DS מוקם בסדר: הפעלה→בסיס→גלובלי→אב→היוריסטיקות→נהלים→תצוגות→DS Board→לוגים→אופטימייזר.",
        "היררכיית-סכמה: גלובלי → אב → הרצה → אינטראקטיבי.",
        "היוריסטיקה=כלל, אופטימייזר=מזעור-מטרה; Model 000 פרודקטיבי בלבד.",
      ],
      relatedHe: [
        { labelHe: "PP/DS · הפעלת PP/DS (3.1)", href: "/library/ppds/chapter-03/#sub-3.1" },
        { labelHe: "PP/DS · אופטימייזר (3.8)", href: "/library/ppds/chapter-03/#sub-3.8" },
      ],
    },
  ],
};
