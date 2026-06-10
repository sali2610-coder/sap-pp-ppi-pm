// ===== PM Digital Textbook — Chapter 8 (Academy Template, gold-standard match) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy from pm-toc.json key "8" preserved: 8.1 (+8.1.1–8.1.3),
// 8.2 (+8.2.1–8.2.8 config steps). Transformative Hebrew; SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH8: TextbookChapter = {
  n: 8,
  titleHe: "הגדרת SAP Fiori Launchpad",
  titleEn: "SAP Fiori Launchpad Configuration",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה להקמת SAP Fiori Launchpad עבור תחזוקת-מפעל (Plant Maintenance) ב-SAP S/4HANA. ה-Launchpad הוא נקודת-הכניסה היחידה (single point of entry) של טכנאי-התחזוקה למערכת — מסך אריחים (tiles) מבוסס-תפקיד, רספונסיבי, נייד וברור. כל תת-פרק וכל שלב-קונפיגורציה מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-זרימה, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המוקד הוא ה-T-Codes האמיתיים של ההקמה — SICF, /IWFND/MAINT_SERVICE, /UI2/FLPD_CUST, /UI2/FLPCM_CUST, PFCG ו-SU01 — כדי שתוכל להקים Launchpad לטכנאי-התחזוקה של CBC (יצרנית-המשקאות של קוקה-קולה) ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 8.1
    {
      id: "8.1", titleHe: "יסודות SAP Fiori", titleEn: "Basics of SAP Fiori",
      execHe:
        "SAP Fiori הוא שכבת-חוויית-המשתמש (UX) של S/4HANA — מסך-פתיחה של אריחים (tiles) המאפשר לכל משתמש להפעיל בדיוק את הפונקציות והאפליקציות שהורשו לו. מספר אפליקציות ה-Fiori גדל במהירות; ספריית-העזר (SAP Fiori apps reference library) מונה כ-15,000 אפליקציות ל-S/4HANA, מתוכן כ-250 בקו-העסקי Asset Management וכ-50 ייעודיות ממש לתחזוקה. עבור מנהל-תחזוקה, Fiori הוא המנוף להעביר טכנאים ממסכי-GUI מורכבים אל אריחים פשוטים, ניידים ומבוססי-תפקיד — קיצור זמן-הכשרה והפחתת-שגיאות.",
      beginnerHe:
        "דמיין מסך-בית של סמארטפון: כל אפליקציה היא 'אריח' שאתה לוחץ עליו. ב-SAP זה ה-Launchpad. כל טכנאי רואה רק את האריחים שמתאימים לתפקידו — דיווח-תקלה, אישור-ביצוע, חיפוש-ציוד. כשלוחצים על אריח, נפתח מסך מודרני בדפדפן (טכנולוגיית SAPUI5, מבוססת HTML5) במקום מסך-ה-GUI הישן. הטכנאי יכול אפילו לבנות לעצמו עמוד 'My Home' מהאריחים שהוא אוהב, כמו מועדפים.",
      consultantHe:
        "Fiori הוא ארכיטקטורת-UX רב-שכבתית: ה-Launchpad (FLP) רץ ב-Frontend Server ומגיש אפליקציות SAPUI5 הנשענות על OData services (Gateway) מול ה-Backend. הזיהוי לקטלוגים, קבוצות ותפקידים נשען על PFCG. בעת מימוש שים לב להבחנה בין Embedded deployment (Frontend על אותה-מערכת כ-Backend, נפוץ ב-S/4HANA on-premise) ל-Hub deployment. הבסיס הטכני: SAPUI5 (UI), OData (נתונים), ICF (תקשורת HTTP), Catalog/Group (תוכן), Role (הרשאה). הבנת ארבעת-אלה היא תנאי-סף לכל הקמת-Launchpad.",
      purposeHe:
        "המטרה: לתת לכל בעל-תפקיד נקודת-כניסה אחת, נקייה ומבוססת-הרשאה — תחת מהירות-HANA ועם נראות-מובייל. במקום ללמד טכנאי עשרות T-Codes, מציגים לו חמישה אריחים רלוונטיים. Fiori מחבר תהליך, הרשאה ונתון תחת ממשק אחיד שניתן להפעיל מכל מכשיר.",
      processExampleHe:
        "טכנאי פותח את ה-Launchpad בטאבלט בשטח: רואה אריח 'Create Maintenance Request' עם מספר-תקלות-פתוחות עליו (key figure), לוחץ, סורק ברקוד של ציוד, בוחר mode-of-failure מתוך קטלוג, מצרף תמונה ושומר. הכל ב-SAPUI5 רספונסיבי — אותו תהליך שב-GUI דורש מספר מסכי-IW21, כאן הוא אריח אחד.",
      cbcHe:
        "ב-CBC טכנאי-התחזוקה של קו-המילוי מקבל Launchpad ייעודי: אריחי 'Create Maintenance Request', 'Report and Repair Malfunction' ו-'Find Technical Object' לציוד-המפעל (ממלאים, מובילים, דוודי-CO2). במקום מסכי-GUI מלאים, הטכנאי בשטח-הייצור מדווח תקלה בטאבלט תוך שניות, מה שמקצר את זמן-ההשבתה של הקו.",
      navHe: [
        "https://fioriappslibrary.hana.ondemand.com — SAP Fiori Apps Reference Library (כ-15,000 אפליקציות)",
        "SAP Fiori Launchpad ► My Home (עמוד אישי הניתן להתאמה מאריחים)",
        "Transaction /UI2/FLP — Start SAP Fiori Launchpad",
      ],
      tables: ["AGR_USERS", "AGR_1251", "USOBT"],
      tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST", "PFCG"],
      fiori: ["F1511A", "F2023", "F2072"],
      configHe: [
        "Fiori מורכב מארבע שכבות-הקמה: OData (נתונים) · ICF (תקשורת HTTP) · Catalog/Group (תוכן) · Role (הרשאה).",
        "Deployment: Embedded (Frontend+Backend באותה מערכת, נפוץ ב-S/4HANA) מול Hub (Frontend נפרד).",
        "המשתמש בונה 'My Home' מאריחים שהורשו לו; ההרשאה נשלטת ב-PFCG, לא על-ידי המשתמש.",
        "אריח (tile) יכול להציג key figure דינמי (למשל מספר הודעות-תחזוקה פתוחות).",
      ],
      flow: [
        { he: "משתמש פותח Launchpad", code: "/UI2/FLP" },
        { he: "FLP טוען קטלוגים/קבוצות לפי תפקיד", code: "PFCG" },
        { he: "אריחים מוצגים לפי הרשאה", note: "role-based" },
        { he: "לחיצה פותחת אפליקציית SAPUI5", note: "HTML5/דפדפן" },
        { he: "האפליקציה קוראת נתונים", code: "OData" },
      ],
      mistakesHe: [
        "מתן הרשאה לכל האפליקציות 'כדי לחסוך זמן' — נוגד את עקרון-התפקיד ויוצר עומס-מסך.",
        "בלבול בין אפליקציה אמיתית-עם-ערך לפסאודו-אפליקציה (GUI עטוף) בעת תכנון ה-Launchpad.",
        "הנחה ש-Fiori מחליף כל GUI — בפועל חלק מהאפליקציות הן רק GUI/Web Dynpro ב-HTML.",
      ],
      troubleshootHe: [
        "אריח לא מופיע למשתמש ➔ חסר שיוך Catalog/Group ל-Role (PFCG) או ה-Role לא משויך למשתמש.",
        "אפליקציה נפתחת ריקה/שגיאת-מסך ➔ בדוק OData ו-ICF (השלבים בתת-פרק 8.2).",
        "המשתמש רואה יותר-מדי אריחים ➔ קטלוג רחב-מדי שויך לתפקיד.",
      ],
      bestPracticeHe: [
        "התחל מתפקיד עסקי, לא מאפליקציה — הגדר מה הטכנאי צריך ואז בחר אריחים.",
        "השתמש בספריית-העזר (reference library) כמקור-אמת לדרישות-המימוש של כל אפליקציה.",
        "שמור Launchpad רזה — מעט אריחים ממוקדים מפחיתים הכשרה ושגיאות.",
      ],
      interviewHe: [
        { qHe: "מהו SAP Fiori Launchpad?", aHe: "נקודת-הכניסה היחידה מבוססת-התפקיד ל-S/4HANA — מסך אריחים (SAPUI5) המציג לכל משתמש רק את האפליקציות שהורשו לו." },
        { qHe: "על איזו טכנולוגיה מבוססות אפליקציות Fiori?", aHe: "SAPUI5, המבוססת HTML5 ורצה בדפדפן; הנתונים מגיעים דרך OData services." },
        { qHe: "כמה אפליקציות Fiori יש ל-Asset Management?", aHe: "כ-250 בקו-העסקי Asset Management, מתוכן כ-50 ייעודיות ממש לתחזוקה (מתוך ~15,000 ל-S/4HANA כולה)." },
      ],
      takeawaysHe: [
        "Fiori = שכבת-UX של אריחים מבוססי-תפקיד מעל S/4HANA.",
        "ארבע שכבות-הקמה: OData · ICF · Catalog/Group · Role.",
        "כל משתמש רואה רק את שהורשה לו; 'My Home' ניתן להתאמה אישית.",
      ],
      relatedHe: [
        { labelHe: "PM · אפשרויות התאמה למשתמש (9.2.5)", href: "/library/pm/chapter-09/#sub-9.2.5" },
      ],
      children: [
        {
          id: "8.1.1", titleHe: "עיצוב SAP Fiori", titleEn: "SAP Fiori Design",
          execHe: "עיצוב Fiori מבוסס-אריחים (tiles): המשתמש בוחר פונקציות ואפליקציות מתוך מסך-הפתיחה, והלחיצה פותחת ממשק-קצה SAPUI5 בדפדפן. העיצוב מאחד מראה והתנהגות על פני כל המכשירים ומחליף את ריבוי-המסכים של ה-GUI במשטח-עבודה ויזואלי וברור.",
          beginnerHe: "כל פעולה היא 'כפתור-תמונה' (אריח) על מסך-בית. המשתמש יכול לבנות עמוד 'My Home' משלו מהאריחים שהורשו לו — בדיוק כמו מועדפים ב-SAP GUI. כשלוחצים על אריח, נפתח מסך מודרני בדפדפן.",
          consultantHe: "האריחים מוגשים מ-Launchpad הרץ על Frontend Server; כל אריח קשור ל-Target Mapping המפנה לאפליקציית-SAPUI5 (intent-based navigation: semantic object + action). SAPUI5 מבוססת HTML5 ומשתמשת ב-OData לקריאת-נתונים. ה-My Home הוא personalization ברמת-המשתמש הנשמר ב-Frontend.",
          purposeHe: "לספק חוויית-משתמש אחידה, ויזואלית ונגישה-ממובייל — משטח-כניסה אחד שמפשט תהליכים ומקצר הכשרה לעומת ניווט-תפריטים ב-GUI.",
          processExampleHe: "טכנאי רואה אריח 'My Home' שבנה בעצמו — שלושה אריחים שבהם הוא משתמש יומית; לחיצה על 'Create Maintenance Request' פותחת מסך-SAPUI5 רספונסיבי בדפדפן ללא פתיחת SAP GUI.",
          cbcHe: "ב-CBC טכנאי קו-המילוי מסדר ב-My Home את אריחי-התקלות שלו לפי תדירות-שימוש, כך שדיווח-תקלה בשטח הוא לחיצה אחת.",
          navHe: ["SAP Fiori Launchpad ► My Home", "SAP Fiori Launchpad ► תפריט-אריחים (tiles)"],
          tables: ["/UI2/SERV_DESC", "/UI2/CHIP"],
          tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST"],
          fiori: ["F1511A"],
          configHe: [
            "אריח קשור ל-Target Mapping (semantic object + action) המפנה לאפליקציית-SAPUI5.",
            "My Home = personalization ברמת-המשתמש; המשתמש מוסיף/מסיר אריחים מהקבוצות שהורשו.",
            "ה-UI נטען בדפדפן כ-SAPUI5 (HTML5) — אין צורך ב-SAP GUI מותקן.",
          ],
          mistakesHe: [
            "הנחה שאריח = אפליקציה תמיד — אריח יכול גם להפעיל transaction דרך mapping.",
            "השבתת personalization 'מטעמי-סדר' — שוללת מהמשתמש את עמוד-הבית האישי.",
          ],
          troubleshootHe: [
            "אריח לחיץ אך לא נפתח ➔ Target Mapping שגוי או חסר (semantic object/action).",
            "My Home ריק ➔ למשתמש אין קבוצות/אריחים מורשים בתפקיד.",
          ],
          bestPracticeHe: [
            "אפשר personalization של My Home — מעלה אימוץ ושביעות-רצון.",
            "תכנן אריחים עם key figures היכן שהמספר מנחה פעולה (תקלות-פתוחות).",
          ],
          interviewHe: [
            { qHe: "מהו My Home ב-Fiori?", aHe: "עמוד-בית אישי שהמשתמש בונה מהאריחים שהורשו לו, מקביל למועדפים ב-SAP GUI." },
            { qHe: "מה נפתח כשלוחצים על אריח?", aHe: "אפליקציית SAPUI5 (מבוססת HTML5) בדפדפן, דרך Target Mapping של האריח." },
          ],
          takeawaysHe: [
            "עיצוב Fiori = אריחים → אפליקציות SAPUI5 בדפדפן.",
            "My Home מאפשר personalization אישי.",
            "אין צורך ב-SAP GUI מותקן — הכל בדפדפן.",
          ],
        },
        {
          id: "8.1.2", titleHe: "סוגי אפליקציות SAP Fiori", titleEn: "Types of SAP Fiori Apps",
          execHe: "אפליקציות Fiori מסווגות בשלוש דרכים: לפי תוכן (Transactional / Analytical / Fact Sheet — השיטה המועדפת על SAP), לפי דינמיות (Static מול Dynamic), ולפי תוצאה (אמיתית-עם-ערך / אמיתית-ללא-ערך / פסאודו). הסיווג קובע מה האפליקציה עושה וכמה ערך היא מוסיפה מול ה-GUI.",
          beginnerHe: "יש שלושה 'טיפוסים' של אפליקציות: כאלה שמבצעות פעולה (Transactional — למשל יצירת הודעת-תקלה), כאלה שמראות מידע על אובייקט אחד (Fact Sheet — למשל ציוד), וכאלה שמנתחות ומציגות גרפים (Analytical). אפשר גם לחלק לפי האם הרשימה מתעדכנת חי (Dynamic) או רק אחרי מסך-בחירה (Static).",
          consultantHe: "סיווג-לפי-תוכן: Transactional מקבילה 1:1 ל-transaction ב-GUI (ולעיתים מאחדת כמה); Fact Sheet מציגה מידע-מפתח על אובייקט אחד; Analytical מפיקה KPIs, סטטיסטיקות ותרשימים (לרוב נשענת על CDS Analytical queries). סיווג-לפי-תוצאה קריטי לתכנון: 'אמיתית-עם-ערך' (SAPUI5 שמוסיף ערך — חילוץ-פונקציה, איחוד-transactions, פונקציות שאין ב-GUI, KPIs על אריח), 'אמיתית-ללא-ערך' (SAPUI5 אך בלי יתרון מול ה-GUI), ו'פסאודו' (לא SAPUI5 כלל — רק GUI עטוף, כמו Overall Completion שמציג את IW42).",
          purposeHe: "להבין מה כל אפליקציה נותנת לפני הקצאתה — אפליקציה אמיתית-עם-ערך מצדיקה מאמץ-הקמה; פסאודו-אפליקציה היא רק GUI ב-HTML ולא תמיד שווה הקמה נפרדת.",
          processExampleHe: "'Find Technical Object' היא אפליקציה Dynamic: שינוי הפילטר מעדכן את הרשימה מיידית, ללא חזרה למסך-בחירה. לעומתה אפליקציה Static דורשת חזרה למסך-הבחירה כדי להרחיב את הקריטריון.",
          cbcHe: "ב-CBC: 'Create Maintenance Request' = Transactional (פעולה); 'Find Technical Object' = Dynamic (חיפוש-ציוד חי); 'Maintenance Planning Overview' = Analytical (KPIs ותרשימים על עומס-התחזוקה במפעל).",
          navHe: ["https://fioriappslibrary.hana.ondemand.com — סינון לפי Application Type"],
          tables: ["/UI2/SERV_DESC"],
          tcodes: ["/UI2/FLPD_CUST"],
          fiori: ["F2072", "F2828", "F1511A"],
          configHe: [
            "Application Type בספריית-העזר: Transactional / Analytical / Fact Sheet / Web Dynpro / SAP GUI.",
            "Analytical נשענת בדרך-כלל על CDS queries; Transactional על OData transactional service.",
            "פסאודו-אפליקציה = transaction עטופה ב-HTML GUI (אין SAPUI5, אין ערך מוסף).",
          ],
          mistakesHe: [
            "התייחסות לכל 'אפליקציית Fiori' כ-SAPUI5 — חלקן פסאודו (GUI/Web Dynpro).",
            "הקמת פסאודו-אפליקציה כאילו היא אמיתית-עם-ערך, ובזבוז מאמץ.",
          ],
          troubleshootHe: [
            "אפליקציה 'לא מרגישה Fiori' ➔ ככל-הנראה פסאודו (GUI עטוף), לא SAPUI5.",
            "רשימה לא מתעדכנת בשינוי-פילטר ➔ זו אפליקציה Static ולא Dynamic.",
          ],
          bestPracticeHe: [
            "תעדף אפליקציות אמיתיות-עם-ערך לתהליכי-הליבה של הטכנאי.",
            "השתמש בסיווג-לפי-תוכן (Transactional/Analytical/Fact Sheet) לתכנון ה-Launchpad לפי תפקיד.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת סוגי-האפליקציות לפי תוכן?", aHe: "Transactional (ביצוע תהליך), Fact Sheet (מידע על אובייקט אחד), ו-Analytical (KPIs, סטטיסטיקות, תרשימים)." },
            { qHe: "מה ההבדל בין אפליקציה Static ל-Dynamic?", aHe: "Static דורשת מסך-בחירה upstream ומציגה רשימה-קבועה; Dynamic מציגה אזור-פילטר ורשימה המתעדכנת חי בשינוי-הפילטר." },
            { qHe: "מהי פסאודו-אפליקציית Fiori?", aHe: "אפליקציה שאינה SAPUI5 ואינה מוסיפה ערך — רק transaction של GUI עטופה ב-HTML, כמו Overall Completion (IW42)." },
          ],
          takeawaysHe: [
            "שלושה צירי-סיווג: תוכן · דינמיות · תוצאה.",
            "תוכן: Transactional / Fact Sheet / Analytical.",
            "תוצאה: אמיתית-עם-ערך / אמיתית-ללא-ערך / פסאודו.",
          ],
        },
        {
          id: "8.1.3", titleHe: "מאפייני SAP Fiori", titleEn: "Characteristics of SAP Fiori",
          execHe: "אפליקציות אמיתיות-עם-ערך מבוססות-SAPUI5 מקלות על המשתמש דרך מאפיינים מרכזיים: ממשק רספונסיבי המזהה את המכשיר, הפעלה אחידה (coherent) על פני כל האפליקציות, הקצאה מבוססת-תפקיד, אפשרויות-התאמה רבות, נגישות-מובייל, והרחבה לדרישות-לקוח. לצד היתרונות יש גם חסרונות יומיומיים שכדאי להכיר.",
          beginnerHe: "Fiori 'יודע' באיזה מכשיר אתה (טלפון/טאבלט/מחשב) ומתאים את עצמו (רספונסיבי). כל אפליקציה עובדת באותו אופן, אתה רואה רק מה שהורשת (לפי תפקיד), אתה יכול להתאים אישית (variants, בחירת-שדות), ולעבוד מכל מקום מהנייד. החיסרון: מסכי-SAPUI5 ארוכים עם הרבה רווח-לבן ודורשים גלילה, כי אין tabstrips כמו ב-GUI.",
          consultantHe: "responsive = זיהוי-מכשיר והתאמת-פריסה; coherent = פונקציות, מכשירים ונתונים מאוחדים בין כל האפליקציות; role-based = כל משתמש רואה רק את שהורשה (PFCG); personalization = variants ובחירת-שדות; mobile = גישה מכל מקום; extensibility = פיתוח-עצמי דרך SAP Business Application Studio (לשעבר SAP Web IDE). חסרונות-מימוש שכדאי לתעד: מסכי-SAPUI5 לא-קומפקטיים עם הרבה רווח-לבן; היעדר tabstrips (HTML5) → מידע מוצג זה-תחת-זה, מסכים ארוכים וגלילה רבה; מיקום מקשי-פונקציה עדיין לא-מתוקנן.",
          purposeHe: "לקבל החלטת-מימוש מאוזנת — לדעת מתי Fiori מוסיף ערך אמיתי (מובייל, רספונסיבי, KPIs) ומתי החסרונות (גלילה, רווח-לבן) משמעותיים לתהליך מסוים.",
          processExampleHe: "טכנאי במשמרת מקבל אריח עם key figure (מספר הודעות-תחזוקה פתוחות), פותח אפליקציה, מסנן, ושולח את הרשימה ב-email או מייצא ל-Microsoft Office — שלוש יכולות יומיומיות מובנות ב-Fiori.",
          cbcHe: "ב-CBC טכנאי בשטח-המפעל עובד מהטאבלט (mobile + responsive); מנהל-התחזוקה מקבל key figures על האריחים לראות עומס-תקלות במבט-אחד; אך מסכי-ה-SAPUI5 הארוכים דורשים גלילה — שיקול בבחירת אילו תהליכים להעביר ל-Fiori.",
          navHe: ["SAP Fiori Launchpad ► אריחים עם key figures", "SAP Business Application Studio — פיתוח אפליקציות-לקוח"],
          tables: ["/UI2/CHIP"],
          tcodes: ["/UI2/FLPD_CUST"],
          fiori: ["F1511A", "F2828"],
          configHe: [
            "responsive: זיהוי terminal device והתאמת-פריסה אוטומטית.",
            "coherent: פונקציות, מכשירים ונתונים מאוחדים בכל האפליקציות.",
            "role-based: הקצאה לפי PFCG; personalization: variants ובחירת-שדות.",
            "extensibility: פיתוח-עצמי דרך SAP Business Application Studio.",
          ],
          mistakesHe: [
            "העברת תהליך עם מסכים ארוכים-ומורכבים ל-Fiori בלי לשקול את הגלילה והרווח-הלבן.",
            "ציפייה ל-tabstrips ב-SAPUI5 — אינם קיימים, המידע זה-תחת-זה.",
          ],
          troubleshootHe: [
            "משתמש מתלונן על גלילה רבה ➔ מאפיין-Fiori מובנה (אין tabstrips); שקול אם התהליך מתאים.",
            "אפליקציה לא מתאימה למסך-נייד ➔ ודא שזו אפליקציית-SAPUI5 אמיתית (רספונסיבית), לא פסאודו.",
          ],
          bestPracticeHe: [
            "נצל key figures על אריחים להנעת-פעולה (תקלות-פתוחות, חריגות).",
            "פתח הרחבות-לקוח רק ב-SAP Business Application Studio, לא בעקיפת-תקן.",
            "בחר ל-Fiori תהליכים קצרים ומובייליים; השאר תהליכים-ארוכים-מורכבים ב-GUI היכן שמתאים.",
          ],
          interviewHe: [
            { qHe: "מה משמעות 'responsive' ב-Fiori?", aHe: "הממשק מזהה את המכשיר (טלפון/טאבלט/מחשב) ומתאים את הפריסה אליו אוטומטית." },
            { qHe: "במה Fiori שונה מ-GUI מבחינת tabstrips?", aHe: "ל-HTML5 אין tabstrips, לכן ב-Fiori המידע מוצג זה-תחת-זה — מסכים ארוכים שדורשים גלילה, לעומת ה-tabstrips הקומפקטיים של ה-GUI." },
            { qHe: "כיצד מפתחים אפליקציית-לקוח ל-Fiori?", aHe: "דרך SAP Business Application Studio (לשעבר SAP Web IDE), במסגרת ה-extensibility המובנית של Fiori." },
          ],
          takeawaysHe: [
            "Fiori = רספונסיבי, אחיד, מבוסס-תפקיד, נייד וניתן-להרחבה.",
            "חסרונות: רווח-לבן, היעדר tabstrips, גלילה רבה, מקשים לא-מתוקננים.",
            "הרחבות-לקוח דרך SAP Business Application Studio.",
          ],
        },
      ],
    },
    // ============================================================ 8.2
    {
      id: "8.2", titleHe: "כיצד להגדיר SAP Fiori Launchpad עם אפליקציות SAPUI5", titleEn: "How to Configure an SAP Fiori Launchpad with SAPUI5 Apps",
      execHe:
        "הקמת ה-Launchpad היא תהליך בן שמונה שלבים שמובילים אפליקציית-SAPUI5 מספריית-העזר אל אריח חי על מסך-המשתמש: בדיקת נתוני-מערכת, חקר ספריית-העזר, הפעלת OData services (/IWFND/MAINT_SERVICE), הפעלת ICF services (SICF), יצירת קטלוג-Launchpad (/UI2/FLPCM_CUST), יצירת קבוצה עסקית (/UI2/FLPD_CUST), יצירת תפקיד והקצאת-הרשאות (PFCG), ואתחול האפליקציה. הדוגמה המובילה: שילוב האפליקציה הסטנדרטית 'Create Maintenance Request' (F1511A) לטכנאי-תחזוקה.",
      beginnerHe:
        "כדי שאריח יופיע למשתמש צריך 'לחבר צינור' מהנתון ועד המסך. שמונה שלבים: (1) לבדוק איזו גרסת-מערכת יש לך, (2) למצוא באינטרנט מה האפליקציה דורשת, (3) להדליק את שירות-הנתונים (OData), (4) להדליק את שירות-התקשורת (ICF/SICF), (5) לבנות 'קטלוג' של אריחים, (6) לבנות 'קבוצה' שתראה למשתמש, (7) לבנות 'תפקיד' ולשייך הרשאות (PFCG), (8) לפתוח את ה-Launchpad ולראות שהאריח שם.",
      consultantHe:
        "שמונת-השלבים מקבילים לארבע-שכבות-Fiori: שלבים 3–4 = תשתית-טכנית (OData דרך /IWFND/MAINT_SERVICE + ICF דרך SICF); שלבים 5–6 = תוכן (Catalog ב-/UI2/FLPCM_CUST + Group ב-/UI2/FLPD_CUST); שלב 7 = הרשאה (Role ב-PFCG עם הקצאת Catalog+Group ב-Menu והרשאות ב-Authorizations). ה-T-Codes המרכזיים: /UI2/FLP, /IWFND/MAINT_SERVICE, /IWFND/V4_ADMIN (קבוצות-OData V4), SICF, /UI2/FLPCM_CUST, /UI2/FLPCM_CONF, /UI2/FLPD_CUST, /UI2/FLPAM, PFCG, SU01. שים לב: ICF נמסר כבוי כברירת-מחדל מטעמי-אבטחה — הפעלה ידנית חובה.",
      purposeHe:
        "לתת לטכנאי נקודת-כניסה אחת ומבוססת-תפקיד לאפליקציה הדרושה לו, תוך חיבור תקין של נתון-תקשורת-תוכן-הרשאה. שמונת-השלבים מבטיחים שאף שכבה לא נשמטת — אחרת האריח לא יופיע או לא יעבוד.",
      processExampleHe:
        "מטמיעים את 'Create Maintenance Request' (F1511A): בודקים גרסה → בספרייה רואים שצריך OData service UI_MAINTWORKREQUESTOVW_V2, ICF node /sap/bc/ui5_ui5/sap/eam_wreq_crts1, Technical Catalog SAP_TC_COMMON, Business Catalog SAP_EAM_BC_MREQ_MNG, Business Group SAP_EAM_BCG_MREQ_MNG → מפעילים OData ו-ICF → בונים קטלוג וקבוצה → יוצרים תפקיד ב-PFCG ומשייכים למשתמש KARL → פותחים Launchpad והאריח שם.",
      cbcHe:
        "ב-CBC מקימים Launchpad לטכנאי-התחזוקה במפעל-המילוי: אותם שמונה-שלבים, עם קטלוג וקבוצה ייעודיים לטכנאי (Z_CBC_MAINTTECH) ותפקיד PFCG המשויך למשתמשי-הטכנאים בקו. התוצאה: אריח 'Create Maintenance Request' זמין לכל טכנאי-קו במפעל.",
      navHe: [
        "Transaction /UI2/FLP — Start SAP Fiori Launchpad",
        "Transaction /UI2/FLPD_CUST — Start Launchpad Designer",
        "Transaction /UI2/FLPAM — SAP Fiori Launchpad App Manager",
      ],
      tables: ["AGR_1251", "AGR_USERS", "/IWFND/I_MED_SRH"],
      tcodes: ["/IWFND/MAINT_SERVICE", "SICF", "/UI2/FLPCM_CUST", "/UI2/FLPD_CUST", "PFCG", "SU01"],
      fiori: ["F1511A"],
      configHe: [
        "8 שלבים: 1-בדיקת-מערכת · 2-ספריית-עזר · 3-OData · 4-ICF · 5-קטלוג · 6-קבוצה · 7-תפקיד · 8-אתחול.",
        "T-Codes מרכזיים: /UI2/FLP, /IWFND/MAINT_SERVICE, /IWFND/V4_ADMIN, SICF, /UI2/FLPCM_CUST, /UI2/FLPCM_CONF, /UI2/FLPD_CUST, /UI2/FLPAM, PFCG, SU01.",
        "מיפוי לשכבות: 3-4 תשתית · 5-6 תוכן · 7 הרשאה · 8 אימות.",
        "האפליקציה-המובילה: Create Maintenance Request (App ID F1511A).",
      ],
      flow: [
        { he: "בדיקת נתוני-מערכת", code: "System ► Status" },
        { he: "חקר ספריית-העזר", note: "דרישות-מימוש" },
        { he: "הפעלת OData", code: "/IWFND/MAINT_SERVICE" },
        { he: "הפעלת ICF", code: "SICF" },
        { he: "קטלוג + קבוצה", code: "/UI2/FLPCM_CUST · /UI2/FLPD_CUST" },
        { he: "תפקיד + הרשאות", code: "PFCG · SU01" },
        { he: "אתחול ובדיקה", code: "/UI2/FLP" },
      ],
      mistakesHe: [
        "דילוג על שלב-ICF (SICF) — האפליקציה תיכשל בטעינה כי השירות נמסר כבוי.",
        "הפעלת OData בלבד בלי לשייך Catalog/Group ל-Role — האריח לא יופיע.",
        "ערבוב /UI2/FLPCM_CUST (client-specific) עם /UI2/FLPCM_CONF (cross-client) בטעות.",
      ],
      troubleshootHe: [
        "אריח חסר אחרי כל השלבים ➔ ודא Role משויך למשתמש (SU01) ושה-Catalog+Group ב-Menu של ה-Role.",
        "אפליקציה נטענת ריקה ➔ OData לא-פעיל (/IWFND/MAINT_SERVICE) או ICF כבוי (SICF).",
        "שינוי לא-מופץ למערכות אחרות ➔ לא הוקצה transport ב-Launchpad Designer.",
      ],
      bestPracticeHe: [
        "בצע את השלבים בסדר — תשתית (3-4) לפני תוכן (5-6) לפני הרשאה (7).",
        "תעד לכל אפליקציה את ה-OData/ICF/Catalog/Group מספריית-העזר לפני ההקמה.",
        "השתמש ב-/UI2/FLPAM כדי לאמת זמינות-אפליקציה אחרי האתחול.",
      ],
      interviewHe: [
        { qHe: "מהם שמונת-שלבי הקמת ה-Launchpad?", aHe: "בדיקת-מערכת, ספריית-עזר, OData, ICF, קטלוג, קבוצה, תפקיד+הרשאות, אתחול." },
        { qHe: "אילו שלבים שייכים לשכבת-התשתית?", aHe: "שלב 3 (OData דרך /IWFND/MAINT_SERVICE) ושלב 4 (ICF דרך SICF)." },
        { qHe: "באיזה T-Code יוצרים את התפקיד ומשייכים קטלוג וקבוצה?", aHe: "PFCG — בטאב Menu משייכים Launchpad Catalog ו-Launchpad Group, בטאב Authorizations מגדירים הרשאות, ובטאב User משייכים למשתמש." },
      ],
      takeawaysHe: [
        "8 שלבים: מערכת ► ספרייה ► OData ► ICF ► קטלוג ► קבוצה ► תפקיד ► אתחול.",
        "תשתית לפני תוכן לפני הרשאה.",
        "האפליקציה-המובילה: F1511A (Create Maintenance Request).",
      ],
      relatedHe: [
        { labelHe: "PM · הודעות-תחזוקה (5.1)", href: "/library/pm/chapter-05/#sub-5.1" },
      ],
      children: [
        {
          id: "8.2.1", titleHe: "שלב 1: בדיקת נתוני מערכת SAP", titleEn: "Step 1: Check SAP System Data",
          execHe: "השלב הראשון הוא לוודא שלמערכת יש את רכיבי-התוכנה והגרסאות הדרושים לאפליקציה. דרך System • Status נפתח חלון עם מידע-המערכת, ומשם בודקים את גרסאות רכיבי-התוכנה ואת מוצרי-המוצר המותקנים — בסיס להחלטה אם האפליקציה בכלל ניתנת למימוש.",
          beginnerHe: "לפני שמתחילים — בודקים 'מה יש לי במערכת'. דרך התפריט System ► Status נפתח חלון שמראה את גרסת-המערכת ואת הרכיבים המותקנים. אם הגרסה ישנה מדי, ייתכן שהאפליקציה לא קיימת אצלך.",
          consultantHe: "ב-System • Status, בקליק על אייקון אזור 'SAP System data' רואים את Installed Software Component Versions. הרכיבים הקריטיים לבדיקה: SAP_BASIS, SAP_UI, S4CORE, UIS4HOP1, ו-UIAPFI70 (רק אם ממומשות אפליקציות-finance). בנוסף בודקים את Installed Product Versions: On-premise SAP S/4HANA (למשל 2023 initial shipment stack) ו-SAP Fiori for SAP S/4HANA. נתונים אלה משמשים בשלב-2 להצלבה מול דרישות-האפליקציה בספריית-העזר.",
          purposeHe: "למנוע ניסיון-מימוש של אפליקציה שאינה נתמכת בגרסת-המערכת — חוסך זמן ושגיאות בהמשך התהליך.",
          processExampleHe: "לפני מימוש F1511A פותחים System • Status, רושמים SAP_BASIS, SAP_UI, S4CORE ואת מחסנית-המוצר (S/4HANA 2023), ושומרים את המספרים להצלבה מול 'Installation' של האפליקציה בספרייה.",
          cbcHe: "ב-CBC צוות-ה-Basis מוודא שמחסנית-המוצר (S/4HANA 2023) ורכיבי-ה-SAP_UI תומכים באפליקציות-התחזוקה לפני שמתחילים את ההקמה לטכנאים.",
          navHe: ["System • Status ► SAP System data ► Installed Software Component Versions", "System • Status ► Installed Product Versions"],
          tables: ["CVERS", "PRDVERS"],
          tcodes: ["SE16", "SPAM"],
          fiori: ["F1511A"],
          configHe: [
            "רכיבי-תוכנה לבדיקה: SAP_BASIS, SAP_UI, S4CORE, UIS4HOP1, UIAPFI70 (finance בלבד).",
            "מוצרים מותקנים: On-premise SAP S/4HANA ו-SAP Fiori for SAP S/4HANA (מחסנית-המשלוח).",
            "המספרים נשמרים להצלבה מול 'Installation' בספריית-העזר (שלב 2).",
          ],
          mistakesHe: [
            "דילוג על בדיקת-הגרסה והתחלת-מימוש לאפליקציה לא-נתמכת.",
            "בדיקת SAP_BASIS בלבד ושכחת SAP_UI / UIS4HOP1 הרלוונטיים לחזית.",
          ],
          troubleshootHe: [
            "אפליקציה לא נמצאת/לא נתמכת ➔ הצלב את הגרסאות שרשמת מול דרישות-הספרייה.",
            "רכיב חזית חסר ➔ נדרשת התקנת/עדכון SAP_UI או UIS4HOP1.",
          ],
          bestPracticeHe: [
            "תעד את כל ארבעת-הרכיבים ואת מחסנית-המוצר בתחילת-הפרויקט.",
            "תאם בדיקה זו עם צוות-Basis לפני מימוש-המוני של אפליקציות.",
          ],
          interviewHe: [
            { qHe: "כיצד בודקים את נתוני-המערכת ל-Fiori?", aHe: "דרך System • Status — שם רואים Installed Software Component Versions ו-Installed Product Versions." },
            { qHe: "אילו רכיבי-תוכנה בודקים?", aHe: "SAP_BASIS, SAP_UI, S4CORE, UIS4HOP1, ו-UIAPFI70 (רק לאפליקציות-finance)." },
          ],
          takeawaysHe: [
            "מתחילים בבדיקת גרסאות דרך System • Status.",
            "רכיבי-מפתח: SAP_BASIS, SAP_UI, S4CORE, UIS4HOP1.",
            "הנתונים מוצלבים מול הספרייה בשלב הבא.",
          ],
        },
        {
          id: "8.2.2", titleHe: "שלב 2: חקר ספריית האפליקציות של SAP Fiori", titleEn: "Step 2: Explore the SAP Fiori Apps Reference Library",
          execHe: "ספריית-העזר (SAP Fiori apps reference library) היא מקור-האמת לכל דרישות-המימוש של אפליקציה: סוג-האפליקציה, תאימות-גרסה, רכיבי-חזית-ועורף, וכן ה-OData, ה-ICF והקטלוגים/קבוצות הדרושים. כאן מאתרים את האפליקציה ושולפים את כל מה שצריך לשלבים הבאים.",
          beginnerHe: "נכנסים לאתר ספריית-העזר, מחפשים את האפליקציה (למשל 'Create Maintenance Request'), ורואים בצד-ימין את כל המידע: סוג, מכשירים נתמכים, App ID, ובטאב ההטמעה — איזה OData, איזה ICF ואילו קטלוגים צריך. רושמים הכל לשלבים הבאים.",
          consultantHe: "בקישור https://fioriappslibrary.hana.ondemand.com מסננים SAP Fiori apps for SAP S/4HANA ► Lines of Business • Asset Management ומחפשים את האפליקציה. בצד-ימין: Required Back-End Product, Application Type (Transactional), Database (HANA exclusive), Device Types, App ID (F1511A). בטאב IMPLEMENTATION INFORMATION בודקים תאימות-release ואת ה-Installation (רכיבי-חזית/עורף). בחלק-העליון של Configuration: SAPUI5 Application (eam_wreq_crts1, ICF path /sap/bc/ui5_ui5/sap/eam_wreq_crts1), OData Service (UI_MAINTWORKREQUESTOVW_V2), ו-OData V4 Service Group. בחלק-התחתון: Technical Catalog (SAP_TC_COMMON), Business Catalog (SAP_EAM_BC_MREQ_MNG), Business Group (SAP_EAM_BCG_MREQ_MNG).",
          purposeHe: "לאסוף בבת-אחת את כל הפרטים הטכניים של האפליקציה — בלעדיהם שלבי-ההקמה הבאים הם ניחוש. הספרייה היא 'תעודת-הזהות' של כל אפליקציה.",
          processExampleHe: "ל-F1511A הספרייה מספקת: Application Type=Transactional, App ID=F1511A, release מ-2021, OData=UI_MAINTWORKREQUESTOVW_V2, ICF=/sap/bc/ui5_ui5/sap/eam_wreq_crts1, Technical Catalog=SAP_TC_COMMON, Business Catalog=SAP_EAM_BC_MREQ_MNG, Business Group=SAP_EAM_BCG_MREQ_MNG.",
          cbcHe: "ב-CBC היועץ שולף מהספרייה את דרישות-'Create Maintenance Request', מצליב מול נתוני-המערכת משלב-1, ומאשר שהאפליקציה נתמכת לפני שמקים אריח לטכנאי-המפעל.",
          navHe: [
            "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/home",
            "SAP Fiori apps for SAP S/4HANA ► Lines of Business • Asset Management ► All Apps",
            "IMPLEMENTATION INFORMATION ► Configuration",
          ],
          tables: ["/UI2/SERV_DESC"],
          tcodes: ["/IWFND/MAINT_SERVICE", "SICF"],
          fiori: ["F1511A"],
          configHe: [
            "מידע-אפליקציה: Application Type, App ID (F1511A), Database (HANA), Device Types, Required Back-End Product.",
            "IMPLEMENTATION INFORMATION: תאימות-release + Installation (רכיבי-חזית/עורף).",
            "Configuration עליון: SAPUI5 App (eam_wreq_crts1), OData (UI_MAINTWORKREQUESTOVW_V2), OData V4 Service Group.",
            "Configuration תחתון: Technical Catalog (SAP_TC_COMMON), Business Catalog (SAP_EAM_BC_MREQ_MNG), Business Group (SAP_EAM_BCG_MREQ_MNG).",
          ],
          mistakesHe: [
            "הקמה לפי-זיכרון בלי לשלוף מהספרייה — מובילה ל-OData/ICF שגויים.",
            "התעלמות מטאב תאימות-ה-release וניסיון מימוש בגרסה לא-נתמכת.",
          ],
          troubleshootHe: [
            "לא ברור איזה OData/ICF צריך ➔ פתח את טאב Configuration של האפליקציה בספרייה.",
            "אפליקציה לא-נתמכת בגרסתך ➔ בדוק את dropdown תאימות-ה-release.",
          ],
          bestPracticeHe: [
            "השתמש בספרייה כמקור-אמת יחיד לכל פרטי-המימוש לפני נגיעה ב-Backend.",
            "רשום OData, ICF, Technical/Business Catalog ו-Business Group לכל אפליקציה.",
          ],
          interviewHe: [
            { qHe: "מהי ספריית-העזר של Fiori ולמה היא משמשת?", aHe: "מאגר-מקוון של כל אפליקציות-Fiori המספק לכל אפליקציה את סוגה, תאימותה, ואת ה-OData/ICF/קטלוגים הדרושים למימושה." },
            { qHe: "אילו אובייקטים שולפים מ-Configuration עבור F1511A?", aHe: "OData (UI_MAINTWORKREQUESTOVW_V2), ICF node (eam_wreq_crts1), Technical Catalog (SAP_TC_COMMON), Business Catalog (SAP_EAM_BC_MREQ_MNG), Business Group (SAP_EAM_BCG_MREQ_MNG)." },
          ],
          takeawaysHe: [
            "הספרייה = מקור-אמת לדרישות-מימוש.",
            "שולפים: OData, ICF, Catalogs, Group, App ID, תאימות-release.",
            "מצליבים מול נתוני-המערכת משלב-1.",
          ],
        },
        {
          id: "8.2.3", titleHe: "שלב 3: הגדרת שירותי OData", titleEn: "Step 3: Configure OData Services",
          execHe: "OData הוא ערוץ-הנתונים בין אפליקציית-SAPUI5 ל-Backend. בשלב זה מוודאים ש-OData service הדרוש פעיל; אם לא — מוסיפים ומפעילים אותו ב-/IWFND/MAINT_SERVICE. לאפליקציות V4 מוודאים גם את ה-OData Service Group ב-/IWFND/V4_ADMIN.",
          beginnerHe: "האפליקציה צריכה 'צינור-נתונים' מהמסך אל המערכת — זה ה-OData. נכנסים ל-/IWFND/MAINT_SERVICE ובודקים אם השירות כבר פעיל. אם כן — סיימנו. אם לא — מוסיפים אותו בכפתור Add Service, מקלידים את שם-השירות ו-System Alias 'LOCAL', ומפעילים.",
          consultantHe: "ב-/IWFND/MAINT_SERVICE בודקים אם UI_MAINTWORKREQUESTOVW_V2 רשום ופעיל. אם לא: + Add Service → הזנת שם + System Alias='LOCAL' → Get Services → סימון השירות → + Add Selected Services. תוצאות-אפשריות: 'No Backend Services Found' (השירות קיים רק ב-release מאוחר יותר), 'Backend Services Are Already Registered' (כבר מומש), או 'Service was created and its metadata was loaded successfully' (הצלחה). לשירותי V4 — ב-/IWFND/V4_ADMIN בודקים את ה-Service Group (למשל UI_PRIORITIZATION_PROFILE) ומפרסמים ב-Publish Service Groups אם חסר.",
          purposeHe: "לוודא שהאפליקציה תוכל לקרוא ולכתוב נתונים מול ה-Backend. ללא OData פעיל, האפליקציה תיטען ריקה או תכשל.",
          processExampleHe: "ל-F1511A: ב-/IWFND/MAINT_SERVICE מחפשים UI_MAINTWORKREQUESTOVW_V2; אם אינו פעיל — Add Service, Alias='LOCAL', Get Services, מסמנים, Add Selected Services, ומקבלים 'Service was created and its metadata was loaded successfully'.",
          cbcHe: "ב-CBC צוות-ה-Basis מפעיל את UI_MAINTWORKREQUESTOVW_V2 ב-/IWFND/MAINT_SERVICE על מערכת-הייצור, כדי שאפליקציית-דיווח-התקלות של הטכנאים תוכל לקרוא ולכתוב נתוני-בקשות-תחזוקה.",
          navHe: ["Transaction /IWFND/MAINT_SERVICE — Activate and Maintain Services", "Transaction /IWFND/V4_ADMIN — Activate OData V4 Service Groups"],
          tables: ["/IWFND/I_MED_SRH", "/IWFND/C_MGDEAM"],
          tcodes: ["/IWFND/MAINT_SERVICE", "/IWFND/V4_ADMIN"],
          fiori: ["F1511A"],
          configHe: [
            "ב-/IWFND/MAINT_SERVICE: + Add Service → שם-שירות + System Alias='LOCAL' → Get Services → + Add Selected Services.",
            "תוצאות: 'No Backend Services Found' / 'Backend Services Are Already Registered' / 'Service was created and its metadata was loaded successfully'.",
            "שירותי V4: /IWFND/V4_ADMIN → Publish Service Groups (למשל UI_PRIORITIZATION_PROFILE).",
          ],
          mistakesHe: [
            "הזנת System Alias שגוי במקום 'LOCAL' — השירות לא נמצא ב-Get Services.",
            "התעלמות מ-OData V4 Service Group — אפליקציות-V4 לא יפעלו אף שה-V2 פעיל.",
          ],
          troubleshootHe: [
            "'No Backend Services Found' ➔ השירות קיים רק ב-release מאוחר יותר מהמותקן.",
            "'Backend Services Are Already Registered' ➔ השירות כבר פעיל, אין צורך בפעולה.",
            "אפליקציה ריקה אף שה-ICF פעיל ➔ OData לא הופעל/לא נמצא ב-/IWFND/MAINT_SERVICE.",
          ],
          bestPracticeHe: [
            "השתמש תמיד ב-System Alias='LOCAL' ב-deployment משובץ (embedded).",
            "ודא גם V2 וגם V4 Service Groups לפי דרישות-הספרייה.",
            "אמת את הודעת-ההצלחה ('metadata loaded successfully') לפני המעבר ל-ICF.",
          ],
          interviewHe: [
            { qHe: "באיזה T-Code מפעילים OData service?", aHe: "/IWFND/MAINT_SERVICE — שם בודקים, מוסיפים (Add Service) ומפעילים את השירות עם System Alias='LOCAL'." },
            { qHe: "מה אומרת ההודעה 'Backend Services Are Already Registered'?", aHe: "שה-OData service כבר ממומש ופעיל, ולכן אין צורך בפעולה נוספת." },
            { qHe: "כיצד מטפלים בשירותי OData V4?", aHe: "דרך /IWFND/V4_ADMIN — בודקים את ה-Service Group ומפרסמים אותו ב-Publish Service Groups אם אינו פעיל." },
          ],
          takeawaysHe: [
            "OData = ערוץ-הנתונים; מפעילים ב-/IWFND/MAINT_SERVICE.",
            "System Alias='LOCAL' ב-embedded; Add Service → Get → Add Selected.",
            "שירותי V4 דרך /IWFND/V4_ADMIN.",
          ],
        },
        {
          id: "8.2.4", titleHe: "שלב 4: הגדרת שירותי ICF", titleEn: "Step 4: Configure ICF Services",
          execHe: "ICF (Internet Communication Framework) הוא שכבת-תקשורת-ה-HTTP שדרכה הדפדפן מגיע לאפליקציה. כל שירותי-ה-ICF נמסרים כבויים כברירת-מחדל מטעמי-אבטחה, ולכן יש להפעיל ידנית את צומת-ה-ICF של האפליקציה ב-SICF. בלי שלב זה — האפליקציה לא תיטען בדפדפן.",
          beginnerHe: "כדי שהדפדפן יוכל בכלל 'לדבר' עם האפליקציה צריך להדליק את שירות-התקשורת שלה. נכנסים ל-SICF, מאתרים את הנתיב של האפליקציה (למשל /sap/bc/ui5_ui5/sap/eam_wreq_crts1) ומפעילים אותו. כל שירותי-ICF מגיעים כבויים, אז ההפעלה הידנית חובה.",
          consultantHe: "ב-SICF מגיעים למסך Define Services. לאחר התקנת SAP NetWeaver AS for ABAP כל שירותי-ה-ICF כבויים מטעמי-אבטחה. כל צמתי-השירות בעץ-ה-SICF חייבים להיות פעילים (כי כמה שירותים מורצים בקריאת-URL). יצירה/הפעלה כוללת: יצירת-השירות, תחזוקת logon procedure, אפשרויות-שירות, דרישות-אבטחה, דפי-שגיאה, request handlers, והפעלה/השבתה. במקרה שלנו מפעילים את הצומת /sap/bc/ui5_ui5/sap/eam_wreq_crts1 עבור 'Create Maintenance Request'. (transaction של SAP GUI אינה דורשת הפעלת-ICF; Web Dynpro דורשת — למשל EAMS_WDA_JOBUC_OIF תחת /sap/bc/webdynpro/sap/...).",
          purposeHe: "לפתוח את ערוץ-ה-HTTP מהדפדפן אל ה-UI של האפליקציה. ICF כבוי = האפליקציה אינה נגישה כלל, גם אם ה-OData פעיל.",
          processExampleHe: "ל-F1511A: ב-SICF מנווטים לנתיב /sap/bc/ui5_ui5/sap/eam_wreq_crts1, יוצרים/מפעילים את השירות (Activate Service), ומוודאים שכל צמתי-העץ עד אליו פעילים.",
          cbcHe: "ב-CBC מפעילים ב-SICF את הצומת /sap/bc/ui5_ui5/sap/eam_wreq_crts1 כדי שטאבלטי-הטכנאים יוכלו לטעון את אפליקציית-דיווח-התקלות מהדפדפן.",
          navHe: ["Transaction SICF ► Define Services ► עץ /sap/bc/ui5_ui5/sap/...", "SICF ► צומת-האפליקציה ► Activate Service"],
          tables: ["ICFSERVICE", "ICFSERVLOC"],
          tcodes: ["SICF"],
          fiori: ["F1511A"],
          configHe: [
            "כל שירותי-ICF נמסרים כבויים — הפעלה ידנית חובה ב-SICF.",
            "כל צמתי-העץ עד לשירות חייבים להיות פעילים.",
            "צעדי-יצירה: service, logon procedure, service options, security, error pages, request handlers, activate.",
            "נתיב F1511A: /sap/bc/ui5_ui5/sap/eam_wreq_crts1; Web Dynpro תחת /sap/bc/webdynpro/sap/...; transaction של GUI אינה דורשת ICF.",
          ],
          mistakesHe: [
            "הפעלת צומת-האפליקציה בלבד בלי הצמתים שמעליו בעץ — השירות עדיין לא נגיש.",
            "ניסיון להפעיל ICF ל-transaction של SAP GUI — מיותר, GUI אינה דורשת ICF.",
          ],
          troubleshootHe: [
            "אפליקציה לא נטענת בדפדפן (404/שגיאה) ➔ צומת-ה-ICF כבוי או צומת-אב כבוי ב-SICF.",
            "Web Dynpro לא עולה ➔ ICF תחת /sap/bc/webdynpro/sap/... לא הופעל.",
          ],
          bestPracticeHe: [
            "הפעל רק את השירותים הדרושים — ICF כבוי הוא ברירת-מחדל-אבטחה מכוונת.",
            "ודא שכל שרשרת-הצמתים בעץ פעילה, לא רק העלה.",
            "תעד אילו צמתי-ICF הופעלו לכל אפליקציה לצורך ביקורת-אבטחה.",
          ],
          interviewHe: [
            { qHe: "מהו ICF ומדוע שירותיו כבויים כברירת-מחדל?", aHe: "Internet Communication Framework — שכבת-תקשורת-ה-HTTP; השירותים נמסרים כבויים מטעמי-אבטחה ויש להפעילם ידנית ב-SICF." },
            { qHe: "מהו נתיב-ה-ICF של 'Create Maintenance Request'?", aHe: "/sap/bc/ui5_ui5/sap/eam_wreq_crts1, המופעל ב-SICF." },
            { qHe: "האם transaction של SAP GUI דורשת הפעלת-ICF?", aHe: "לא — רק אפליקציות SAPUI5 ו-Web Dynpro דורשות ICF; transaction של GUI אינה דורשת." },
          ],
          takeawaysHe: [
            "ICF = ערוץ-HTTP; מפעילים ב-SICF.",
            "כל השירותים כבויים כברירת-מחדל-אבטחה — הפעלה ידנית חובה.",
            "כל צמתי-העץ עד לשירות חייבים להיות פעילים.",
          ],
        },
        {
          id: "8.2.5", titleHe: "שלב 5: יצירת קטלוג ל-Launchpad", titleEn: "Step 5: Create a Launchpad Catalog for the SAP Fiori Launchpad",
          execHe: "קטלוג הוא אוסף אפליקציות שניתן להעמיד לרשות תפקיד. יצירת קטלוג חדש היא שלב אופציונלי — אפשר גם להשתמש ב-Technical Catalog או ב-Business Catalogs הסטנדרטיים. כאן בונים Business Catalog חדש ומשייכים אליו אריחים מתוך ה-Technical Catalog ב-/UI2/FLPCM_CUST.",
          beginnerHe: "קטלוג = 'מחסן-אריחים' שמתוכו תפקיד יכול לבחור אפליקציות. בונים אותו ב-/UI2/FLPCM_CUST: לוחצים Create, נותנים שם, מחפשים את ה-Technical Catalog (SAP_TC_EAM_COMMON), מסמנים אריחים ומשייכים אותם לקטלוג-החדש שלנו.",
          consultantHe: "שני T-Codes ליצירת קטלוג: /UI2/FLPCM_CUST (Client-Specific) ו-/UI2/FLPCM_CONF (Cross-Client). ליצירה ברמת-client משתמשים ב-/UI2/FLPCM_CUST. בהפעלתו רואים סקירת-קטלוגים קיימים; Create → הזנת-פרטים (קטלוג לטכנאי-תחזוקה). הדרך-הקלה לאכלס תוכן: לחפש Technical Catalog (SAP_TC_EAM_COMMON), לסמן את האריחים בתחתית, וללחוץ Add Tiles/Target Mappings; במסך-הבא מחפשים את ה-Business Catalog החדש ומשייכים tile reference ב-Add Tile/TM Reference. הבחנה חשובה: Catalog = אוסף-אפליקציות לתפקיד; Group = תת-קבוצה של אריחים שמוצגת בפועל למשתמש.",
          purposeHe: "להגדיר 'מאגר-מורשה' של אפליקציות לתפקיד — מתוכו תיגזר אחר-כך הקבוצה שתוצג. הקטלוג מפריד 'מה מותר' (catalog) מ'מה מוצג' (group).",
          processExampleHe: "ב-/UI2/FLPCM_CUST יוצרים Business Catalog לטכנאי-תחזוקה במפעל-Dallas, מחפשים Technical Catalog SAP_TC_EAM_COMMON, מסמנים את אריח-'Create Maintenance Request', Add Tiles/Target Mappings, ומשייכים tile reference ל-Business Catalog החדש.",
          cbcHe: "ב-CBC יוצרים Business Catalog Z_CBC_MAINTTECH ב-/UI2/FLPCM_CUST, ומאכלסים אותו באריחי-התחזוקה (Create Maintenance Request, Report and Repair Malfunction) מתוך SAP_TC_EAM_COMMON.",
          navHe: ["Transaction /UI2/FLPCM_CUST — Launchpad Content Manager (Client-Specific)", "Transaction /UI2/FLPCM_CONF — Launchpad Content Manager (Cross-Client)"],
          tables: ["/UI2/PAGE_CATALOG", "/UI2/CHIP"],
          tcodes: ["/UI2/FLPCM_CUST", "/UI2/FLPCM_CONF"],
          fiori: ["F1511A"],
          configHe: [
            "Client-Specific: /UI2/FLPCM_CUST · Cross-Client: /UI2/FLPCM_CONF.",
            "Create → הזנת-פרטי-קטלוג → חיפוש Technical Catalog (SAP_TC_EAM_COMMON).",
            "סימון-אריחים → Add Tiles/Target Mappings → חיפוש Business Catalog → Add Tile/TM Reference.",
            "Catalog = מה מותר לתפקיד; Group = מה מוצג בפועל (שלב 6).",
          ],
          mistakesHe: [
            "שימוש ב-/UI2/FLPCM_CONF (cross-client) כשרצו שינוי client-specific בלבד.",
            "בלבול בין Catalog (אוסף-מורשה) ל-Group (תצוגה למשתמש).",
          ],
          troubleshootHe: [
            "אריחים לא נמצאים לשיוך ➔ נבחר Technical Catalog שגוי (לא SAP_TC_EAM_COMMON).",
            "שינוי-קטלוג לא נשמר/לא מופץ ➔ לא הוקצה transport מתאים.",
          ],
          bestPracticeHe: [
            "אכלס Business Catalog מ-Technical Catalog — הדרך הנקייה ביותר.",
            "שמור קטלוגים לפי תפקיד/אתר (Dallas / קו-מילוי) לתחזוקה ברורה.",
            "השתמש ב-Client-Specific (/UI2/FLPCM_CUST) לשינויים מקומיים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Catalog ל-Group ב-Fiori?", aHe: "Catalog = אוסף-האפליקציות המורשה לתפקיד (ממנו בוחרים); Group = תת-קבוצת-אריחים המוצגת בפועל למשתמש על מסך-הבית." },
            { qHe: "אילו שני T-Codes יוצרים Business Catalog?", aHe: "/UI2/FLPCM_CUST (Client-Specific) ו-/UI2/FLPCM_CONF (Cross-Client)." },
            { qHe: "האם יצירת קטלוג חדש חובה?", aHe: "לא — זהו שלב אופציונלי; אפשר להשתמש ב-Technical Catalog או ב-Business Catalogs הסטנדרטיים." },
          ],
          takeawaysHe: [
            "Catalog = מאגר-אפליקציות מורשה לתפקיד (אופציונלי ליצור חדש).",
            "/UI2/FLPCM_CUST (client) מול /UI2/FLPCM_CONF (cross-client).",
            "מאכלסים אותו מ-Technical Catalog (SAP_TC_EAM_COMMON).",
          ],
        },
        {
          id: "8.2.6", titleHe: "שלב 6: יצירת קבוצה עסקית ל-Launchpad", titleEn: "Step 6: Create a Business Group for the SAP Fiori Launchpad",
          execHe: "קבוצה עסקית (Business Group) היא תת-קבוצת אריחים מקטלוג אחד או יותר — והיא מה שמוצג בפועל על מסך-המשתמש. בונים אותה ב-Launchpad Designer (/UI2/FLPD_CUST), מוסיפים קבוצה חדשה ומשייכים אליה אריחים מה-Business Catalog שנוצר בשלב-5.",
          beginnerHe: "Group = מה שהמשתמש באמת רואה. נכנסים ל-Launchpad Designer (/UI2/FLPD_CUST), לוחצים Groups → Create, נותנים שם, ומסמנים אם לאפשר למשתמש להזיז/למחוק אריחים (personalization). אז מחפשים את ה-Business Catalog שלנו ומשייכים ממנו אריחים לקבוצה.",
          consultantHe: "ה-Launchpad Designer נפתח ב-/UI2/FLPD_CUST או בקישור https://myserver/sap/bc/ui5_ui5/sap/arsrvc_upb_admn/main.html. הוא client-specific (ה-client, למשל 201, מוצג בפינה הימנית-העליונה). שינויים מופצים דרך transports, ולכן בתחילת-הקונפיגורציה מוקצה transport order; לשינוי-מקומי בלבד לא מפיצים. Groups → Create → סימון 'Enable users to personalize their group' (מאפשר למשתמש להזיז/למחוק אריחים) → הוספת-אריחים בחיפוש-ה-Business Catalog ושיוכם לקבוצה. הבחנה: Catalog = מאגר; Group = תצוגה. ב-CBC הקבוצה תיקרא למשל Z_CBC_MAINTTECH.",
          purposeHe: "להגדיר את התצוגה-בפועל למשתמש — אילו אריחים מהמאגר יופיעו על מסך-הבית שלו, ובאיזו קיבוץ.",
          processExampleHe: "ב-/UI2/FLPD_CUST: Groups → Create → 'apps for maintenance technicians in the Dallas plant' → סימון personalization → חיפוש ה-Business Catalog שנוצר → שיוך אריח-'Create Maintenance Request' לקבוצה.",
          cbcHe: "ב-CBC יוצרים בקבוצה Z_CBC_MAINTTECH ב-/UI2/FLPD_CUST ומשייכים אליה את אריחי-התחזוקה מה-Business Catalog Z_CBC_MAINTTECH, כך שטכנאי-הקו יראו אותם על מסך-הבית.",
          navHe: ["Transaction /UI2/FLPD_CUST — Start Launchpad Designer", "https://myserver/sap/bc/ui5_ui5/sap/arsrvc_upb_admn/main.html ► Groups ► Create"],
          tables: ["/UI2/PAGE_GROUP", "/UI2/CHIP"],
          tcodes: ["/UI2/FLPD_CUST"],
          fiori: ["F1511A"],
          configHe: [
            "Launchpad Designer: /UI2/FLPD_CUST (client-specific; ה-client מוצג בפינה).",
            "שינויים מופצים דרך transports — מוקצה transport order; לשינוי-מקומי לא מפיצים.",
            "Groups → Create → 'Enable users to personalize their group' → שיוך-אריחים מה-Business Catalog.",
            "Group = תצוגה בפועל למשתמש (לעומת Catalog = מאגר).",
          ],
          mistakesHe: [
            "שכחת הקצאת transport order בתחילת-הקונפיגורציה — שינויים לא יופצו למערכות-יעד.",
            "שיוך אריחים ל-Group מקטלוג שלא שויך לתפקיד — האריחים לא יופיעו.",
          ],
          troubleshootHe: [
            "אריחי-הקבוצה לא מופיעים למשתמש ➔ ה-Catalog המקושר לא שויך ל-Role, או ה-Group לא ב-Menu של ה-Role.",
            "שינוי לא-מופץ למערכות אחרות ➔ לא הוקצה transport ב-Launchpad Designer.",
            "משתמש לא יכול להתאים אריחים ➔ לא סומן 'Enable users to personalize their group'.",
          ],
          bestPracticeHe: [
            "אפשר personalization של הקבוצה כדי שטכנאים יסדרו אריחים לפי-נוחות.",
            "הקצה transport מודע בתחילת-העבודה ב-Designer.",
            "תן שמות-קבוצה עקביים לפי תפקיד/אתר (Z_CBC_MAINTTECH).",
          ],
          interviewHe: [
            { qHe: "מהי Business Group ומה היחס שלה ל-Catalog?", aHe: "Group = תת-קבוצת-אריחים המוצגת בפועל למשתמש, נגזרת מקטלוג אחד או יותר; Catalog = המאגר-המורשה ממנו נבחרים האריחים." },
            { qHe: "באיזה T-Code יוצרים Group ומה התכונה החשובה בה?", aHe: "/UI2/FLPD_CUST (Launchpad Designer); תכונה חשובה היא 'Enable users to personalize their group' המאפשרת למשתמש להזיז/למחוק אריחים." },
            { qHe: "מדוע נדרש transport ב-Launchpad Designer?", aHe: "כי שינויי-ה-Designer מופצים למערכות-יעד דרך transports; לשינוי-מקומי בלבד לא מפיצים." },
          ],
          takeawaysHe: [
            "Group = התצוגה-בפועל למשתמש; נבנית ב-/UI2/FLPD_CUST.",
            "ה-Designer client-specific ומפיץ שינויים דרך transports.",
            "'Enable personalization' מאפשר למשתמש לסדר אריחים.",
          ],
        },
        {
          id: "8.2.7", titleHe: "שלב 7: יצירת תפקיד והקצאת הרשאות", titleEn: "Step 7: Create a Role and Assign Authorizations",
          execHe: "תפיסת-ההרשאות של S/4HANA מבוססת-תפקיד (role-based). תפקיד (Role) הוא צרור-transactions, דוחות, קישורים ואפליקציות הדרושים למשימה. ב-PFCG יוצרים תפקיד-יחיד, משייכים אליו את ה-Launchpad Catalog וה-Launchpad Group בטאב Menu, מגדירים הרשאות בטאב Authorizations, ומשייכים את התפקיד למשתמש בטאב User.",
          beginnerHe: "כדי שהמשתמש יראה את האריחים, צריך 'תפקיד' שמחבר אותו להרשאות. ב-PFCG יוצרים תפקיד-יחיד, בטאב Menu מוסיפים את הקטלוג והקבוצה שבנינו, בטאב Authorizations מייצרים את ההרשאות, ובטאב User משייכים את התפקיד למשתמש (למשל KARL).",
          consultantHe: "ב-PFCG (Role Maintenance) יוצרים Single Role: בטאב Menu משייכים Launchpad Catalog ו-Launchpad Group; בטאב Authorizations מייצרים Authorization Profile (אובייקטי-הרשאה + שדות-הרשאה, generated מהתפקיד); בטאב User משייכים למשתמש אחד או יותר. התפקיד מבוסס על מבנה-הארגון ומקשר משתמש להרשאות-המתאימות. פרופילי-ההרשאה נגזרים אוטומטית מהתפקיד-היחיד. (אובייקטי-ההרשאה של Asset Management מסוכמים ב-Appendix A.2 של הספר.) במקרה שלנו: תפקיד לטכנאי במפעל-Dallas המשויך למשתמש KARL.",
          purposeHe: "לקשור משתמש לאפליקציות ולהרשאות בצורה מבוקרת ומבוססת-תפקיד — לוודא שכל טכנאי רואה ומבצע רק את שמותר לו, ושאריחי-ה-Group בכלל מופיעים אצלו.",
          processExampleHe: "ב-PFCG יוצרים Single Role לטכנאי-Dallas: Menu ← Launchpad Catalog + Launchpad Group; Authorizations ← יצירת-פרופיל; User ← שיוך KARL. מרגע זה KARL מורשה לראות ולהפעיל את אריחי-התחזוקה.",
          cbcHe: "ב-CBC יוצרים תפקיד Z_CBC_MAINTTECH ב-PFCG, משייכים אליו את הקטלוג והקבוצה Z_CBC_MAINTTECH, ומקצים אותו למשתמשי-הטכנאים של קו-המילוי דרך טאב User (או דרך SU01).",
          navHe: ["Transaction PFCG ► Single Role ► Menu (Launchpad Catalog + Group)", "PFCG ► Authorizations", "PFCG ► User", "Transaction SU01 — Maintain Users"],
          tables: ["AGR_DEFINE", "AGR_1251", "AGR_USERS"],
          tcodes: ["PFCG", "SU01"],
          fiori: ["F1511A"],
          configHe: [
            "PFCG ► Single Role ► טאב Menu: שיוך Launchpad Catalog + Launchpad Group.",
            "טאב Authorizations: יצירת Authorization Profile (אובייקטים + שדות, generated).",
            "טאב User: שיוך התפקיד למשתמש (למשל KARL).",
            "אובייקטי-הרשאה ל-Asset Management מסוכמים ב-Appendix A.2.",
          ],
          mistakesHe: [
            "שיוך הקבוצה/קטלוג ל-Menu בלי לייצר את פרופיל-ההרשאות בטאב Authorizations.",
            "שכחת שיוך-המשתמש בטאב User — האריחים לא יופיעו לאיש.",
            "אי-הפצת התפקיד/פרופיל למערכת-היעד.",
          ],
          troubleshootHe: [
            "המשתמש לא רואה אריחים ➔ Catalog+Group לא ב-Menu, פרופיל לא-generated, או התפקיד לא משויך למשתמש.",
            "המשתמש רואה אריח אך מקבל שגיאת-הרשאה בלחיצה ➔ חסר אובייקט-הרשאה בטאב Authorizations.",
          ],
          bestPracticeHe: [
            "ייצר תמיד את פרופיל-ההרשאות (generate) אחרי שינוי-Menu.",
            "בסס תפקידים על מבנה-הארגון; השתמש בסיכום-אובייקטים שב-Appendix A.2.",
            "שייך משתמשים דרך טאב User או SU01 בעקביות.",
          ],
          interviewHe: [
            { qHe: "כיצד S/4HANA שולט בהרשאות?", aHe: "מבוסס-תפקיד (role-based): תפקיד הוא צרור transactions/אפליקציות; פרופילי-ההרשאה נגזרים מהתפקיד ומקשרים משתמש להרשאותיו." },
            { qHe: "אילו שלושה טאבים מרכזיים ב-PFCG ומה עושים בכל אחד?", aHe: "Menu (שיוך Launchpad Catalog+Group), Authorizations (יצירת פרופיל-הרשאות), ו-User (שיוך התפקיד למשתמש)." },
            { qHe: "באיזה T-Code נוסף ניתן לשייך תפקיד למשתמש?", aHe: "SU01 (Maintain Users), בנוסף לטאב User ב-PFCG." },
          ],
          takeawaysHe: [
            "הרשאות S/4HANA מבוססות-תפקיד; התפקיד נוצר ב-PFCG.",
            "Menu (קטלוג+קבוצה) · Authorizations (פרופיל) · User (שיוך).",
            "שיוך-משתמש גם דרך SU01.",
          ],
        },
        {
          id: "8.2.8", titleHe: "שלב 8: אתחול האפליקציה", titleEn: "Step 8: Initialize the App",
          execHe: "השלב האחרון הוא האימות: כשהמשתמש פותח את ה-Launchpad, הקבוצה החדשה והאריחים שלה מופיעים. זהו 'מבחן-הקצה' לכל שבעת-השלבים הקודמים — אם האריח שם ולחיץ ופותח את האפליקציה, ההקמה הושלמה בהצלחה.",
          beginnerHe: "מסיימים בבדיקה: המשתמש (למשל KARL) פותח את ה-Launchpad, ואמור לראות את הקבוצה החדשה עם אריח-'Create Maintenance Request'. אם הוא שם ועובד — סיימנו. אם לא — חוזרים לבדוק את השלבים הקודמים.",
          consultantHe: "המשתמש מפעיל את ה-Launchpad (/UI2/FLP) ורואה את הקבוצה החדשה. זהו end-to-end test של כל השרשרת: OData (3) → ICF (4) → Catalog (5) → Group (6) → Role (7). אם האריח חסר — מאבחנים אחורה: Role משויך? (SU01/PFCG-User) → Catalog+Group ב-Menu? → Group מכיל אריחים? → ICF פעיל? → OData פעיל? כלי-עזר לאימות-זמינות: /UI2/FLPAM (Launchpad App Manager). לעיתים נדרש ניקוי-cache (/UI2/INVAL_CACHES) כדי שהשינוי יופיע.",
          purposeHe: "לאמת שהשרשרת המלאה עובדת מקצה-לקצה ושהמשתמש-הסופי מקבל את האפליקציה הנכונה — לפני מסירה לייצור.",
          processExampleHe: "KARL מתחבר, פותח את ה-Launchpad ב-/UI2/FLP, רואה את הקבוצה החדשה עם אריח-'Create Maintenance Request', לוחץ, והאפליקציה נפתחת — סימן שכל שבעת-השלבים הוקמו נכון.",
          cbcHe: "ב-CBC טכנאי-קו מתחבר ל-Launchpad, רואה את קבוצת Z_CBC_MAINTTECH עם אריחי-התחזוקה, ומדווח תקלה ראשונה מהטאבלט — אימות שההקמה מוכנה לשטח-הייצור.",
          navHe: ["Transaction /UI2/FLP — Start SAP Fiori Launchpad", "Transaction /UI2/FLPAM — Launchpad App Manager", "Transaction /UI2/INVAL_CACHES — Invalidate Caches"],
          tables: ["/UI2/PAGE_GROUP", "AGR_USERS"],
          tcodes: ["/UI2/FLP", "/UI2/FLPAM", "/UI2/INVAL_CACHES"],
          fiori: ["F1511A"],
          configHe: [
            "המשתמש מפעיל /UI2/FLP ורואה את הקבוצה והאריחים החדשים.",
            "end-to-end test: OData → ICF → Catalog → Group → Role.",
            "כלי-אימות: /UI2/FLPAM; ניקוי-cache: /UI2/INVAL_CACHES.",
            "אבחון-אחורה אם אריח חסר: Role → Menu → Group → ICF → OData.",
          ],
          mistakesHe: [
            "סיום ההקמה בלי לבדוק כמשתמש-הקצה האמיתי (רק כ-admin).",
            "אי-ניקוי cache — שינוי לא מופיע אף שכל השלבים תקינים.",
          ],
          troubleshootHe: [
            "האריח לא מופיע ➔ אבחן אחורה: Role משויך? Catalog+Group ב-Menu? Group מכיל אריחים? ICF? OData?",
            "האריח מופיע אך לא נפתח ➔ ICF כבוי או OData לא-פעיל; בדוק שלבים 3-4.",
            "שינוי לא מתעדכן ➔ הרץ /UI2/INVAL_CACHES.",
          ],
          bestPracticeHe: [
            "בדוק תמיד עם משתמש-קצה אמיתי, לא עם הרשאות-admin.",
            "השתמש ב-/UI2/FLPAM לאימות-זמינות האפליקציה.",
            "נקה cache (/UI2/INVAL_CACHES) לפני שמכריזים על תקלה.",
          ],
          interviewHe: [
            { qHe: "מה מאמתים בשלב-האתחול?", aHe: "שהמשתמש-הסופי פותח את ה-Launchpad ורואה את הקבוצה והאריחים החדשים, והאפליקציה נפתחת — אימות end-to-end של כל השלבים." },
            { qHe: "אריח לא מופיע לאחר ההקמה — כיצד מאבחנים?", aHe: "אחורה לאורך השרשרת: Role משויך למשתמש? Catalog+Group ב-Menu? Group מכיל אריחים? ICF פעיל? OData פעיל? ולעיתים ניקוי-cache (/UI2/INVAL_CACHES)." },
          ],
          takeawaysHe: [
            "אתחול = אימות end-to-end מול משתמש-קצה ב-/UI2/FLP.",
            "אבחון-אחורה: Role → Menu → Group → ICF → OData.",
            "ניקוי-cache (/UI2/INVAL_CACHES) פותר 'שינוי לא-מופיע'.",
          ],
        },
      ],
    },
  ],
};
