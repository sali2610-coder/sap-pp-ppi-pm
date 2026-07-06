// ===== PM User-Guide Digital Textbook — Chapter 2 (Organizational Structures) =====
// Gold-standard learning chapter. Every node is a complete LearningNode with the
// full 18 facets of authored Hebrew (executive / beginner / consultant friendly).
// Hierarchy follows the source exactly:
//   2.1 SAP Organizational Units
//     2.1.1 The Plant from a Maintenance Perspective
//     2.1.2 Maintenance-Specific Organizational Units
//     2.1.3 Other General Organizational Units
//     2.1.4 Plant-Specific and Cross-Plant Maintenance
//   2.2 Work Centers
//   2.3 Summary
// SAP identifiers kept verbatim in English; הארגון = Example Product bottling PM org.
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "מבנים ארגוניים",
  titleEn: "Organizational Structures",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבנים הארגוניים של אחזקת מפעלים (Plant Maintenance) ב-SAP. לפני שניגעים בהזמנת-עבודה, בהודעת-תקלה או בציוד אחד, חובה להבין על איזו 'מפה ארגונית' הכול יושב: מהו Maintenance Plant, מהו Maintenance Planning Plant, מהו Planner Group, וכיצד מרכז-עבודה (Work Center) מחבר את התחזוקה לתזמון, לקיבולת ולעלות. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט במבנה הארגוני של PM ללא הספר המקורי, מנקודת-מבט של משתמש-עסקי ושל יועץ כאחד.",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1",
      titleHe: "יחידות ארגוניות ב-SAP",
      titleEn: "SAP Organizational Units",
      execHe:
        "היחידות הארגוניות הן השלד שעליו נבנה כל תהליך-אחזקה. הן קובעות היכן הציוד מותקן (Maintenance Plant), מי מתכנן את העבודה (Maintenance Planning Plant), מי אחראי על הביצוע (Planner Group, Work Center), ולאיזה ספר-עלויות נזקפת התחזוקה. הגדרה נכונה כאן = דיווח, תכנון ועלות מדויקים; הגדרה שגויה מחלחלת לכל הזמנת-עבודה בארגון.",
      beginnerHe:
        "דמיין את הארגון כשרשרת של 'מגירות' מקוננות: Company Code (חברה משפטית) ► Plant (אתר פיזי) ► מתחתיו אובייקטי-התחזוקה. SAP חייב לדעת לאיזו מגירה כל ציוד וכל הזמנת-עבודה שייכים, אחרת אי-אפשר לתכנן, לדווח או לחייב. בפרק זה לומדים מהן המגירות החשובות לתחזוקה ואיך הן מתחברות זו לזו.",
      consultantHe:
        "ב-PM היחידות הקריטיות הן: Maintenance Plant (שדה IWERK / SWERK באובייקט-התחזוקה — היכן הציוד עומד), Maintenance Planning Plant (היכן מתוכננת העבודה, נשמר ב-T399I לכל מפעל), Planner Group (INGRP ב-T024I — קבוצת-מתכננים בתוך מפעל-התכנון), Plant Section (BEBER — אזור-אחריות תפעולי), ו-Work Center (CRHD/CRTX). מעל אלה יושבים ה-Enterprise Structure הכללי: Company Code, Plant, Storage Location, ובצד ה-CO ה-Controlling Area ו-Cost Center. ההבחנה החשובה ביותר היא Maintenance Plant מול Maintenance Planning Plant — היא קובעת תרחישי תכנון מרכזי מול מבוזר (ראה 2.1.4).",
      purposeHe:
        "המטרה: למפות את הציוד הפיזי, את אחריות-התכנון ואת אחריות-העלות לרשת אחת קוהרנטית, כך שכל הודעה והזמנה יֵדעו מאליהן היכן, מי ולחשבון מי. ללא מבנה זה אין אפשרות לסנן עבודה לפי אתר, לאחד תכנון בין אתרים, או לחייב Cost Center נכון.",
      processExampleHe:
        "ציוד נכשל באתר. הטכנאי פותח Notification; SAP שואב מהציוד את ה-Maintenance Plant, ממנו גוזר את ה-Maintenance Planning Plant ואת ה-Planner Group, וכך ההזמנה הנגזרת מנותבת למתכנן הנכון, למרכז-העבודה הנכון, ולעלות הנזקפת ל-Cost Center של אותו אתר.",
      scenarioHe:
        "בארגון (מפעל-מילוי משקאות) כל אתר-בקבוק הוא Plant נפרד; קווי-המילוי, הציוד והמכלים יושבים כ-Maintenance Plant של אותו אתר. תכנון-האחזקה עשוי להתבצע מרכזית במטה (Maintenance Planning Plant אחד) או מקומית בכל אתר — שתי החלופות נלמדות ב-2.1.4.",
      navHe: [
        "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant (OX10)",
        "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► General Data ► Set Up Maintenance Plant (Assign Planning Plant) ► T399I",
        "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► General Data ► Define Planner Groups (T024I)",
      ],
      tables: ["T001W", "T399I", "T024I", "CRHD", "TVKO"],
      tcodes: ["OX10", "OX18", "SPRO", "IL01", "IE01"],
      fiori: ["F2730", "F1582"],
      configHe: [
        "Plant (OX10): מגדירים את האתר הפיזי ומשייכים ל-Company Code; זהו ה-Maintenance Plant של הציוד היושב בו.",
        "Maintenance Planning Plant (T399I): לכל Plant מסמנים האם הוא מתכנן בעצמו ו/או מתוכנן ע\"י מפעל אחר — בסיס לתכנון מרכזי/מבוזר.",
        "Planner Group (T024I): קבוצת-מתכננים (INGRP) בתוך מפעל-תכנון, עם תיאור וטלפון.",
        "Plant Section (BEBER): אזור-אחריות בתוך המפעל, מקושר ל-Person Responsible.",
      ],
      flow: [
        { he: "Company Code", code: "OX02", note: "ישות משפטית" },
        { he: "Maintenance Plant", code: "OX10", note: "היכן הציוד" },
        { he: "Maintenance Planning Plant", code: "T399I", note: "היכן מתכננים" },
        { he: "Planner Group", code: "T024I", note: "מי מתכנן" },
        { he: "Work Center", code: "CR01", note: "מי מבצע" },
      ],
      masterDataHe: [
        "T001W = Plant · T399I = שיוך Maintenance Plant ► Planning Plant · T024I = Planner Groups.",
        "אובייקט-התחזוקה (EQUI/ILOA) נושא IWERK (Planning Plant) ו-SWERK (Maintenance Plant) — שניהם מאוכלסים אוטומטית בהודעה/הזמנה.",
      ],
      mistakesHe: [
        "בלבול בין Maintenance Plant (היכן הציוד) ל-Maintenance Planning Plant (היכן מתכננים) — מוביל לניתוב-עבודה שגוי.",
        "אי-שיוך Planning Plant ב-T399I — לא ניתן ליצור הזמנת-עבודה לאותו מפעל.",
        "הגדרת Plant נפרד לכל קו-ייצור במקום Plant Section — מנפח את המבנה הארגוני שלא לצורך.",
        "שכחת שיוך Cost Center למפעל/מרכז-עבודה — עלות-התחזוקה לא נזקפת.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור הזמנת-עבודה למפעל ➔ ה-Maintenance Plant אינו משויך ל-Planning Plant ב-T399I.",
        "ההזמנה מנותבת למתכנן שגוי ➔ Planner Group שגוי באובייקט-התחזוקה.",
        "עלות-תחזוקה לא מופיעה ב-CO ➔ חסר Cost Center באובייקט/מרכז-העבודה.",
        "ציוד 'לא נמצא' בסינון-אתר ➔ SWERK (Maintenance Plant) ריק או שגוי בכרטיס-הציוד.",
      ],
      bestPracticeHe: [
        "החליטו מוקדם בין תכנון מרכזי למבוזר — זה משפיע על מספר ה-Planning Plants ועל T399I.",
        "השתמשו ב-Plant Section כדי לחלק אחריות בתוך מפעל במקום ליצור מפעלים מלאכותיים.",
        "תקננו מוסכמת-שמות אחידה ל-Planner Groups בין כל האתרים.",
        "תאמו את שיוכי ה-Cost Center עם ה-CO לפני go-live כדי שעלויות-אחזקה ייזקפו נכון.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Maintenance Plant ל-Maintenance Planning Plant?", aHe: "Maintenance Plant הוא היכן שהציוד מותקן פיזית (SWERK); Maintenance Planning Plant הוא היכן שעבודת-התחזוקה מתוכננת ומנוהלת (IWERK). מפעל-תכנון אחד יכול לשרת כמה Maintenance Plants — בסיס לתכנון מרכזי." },
        { qHe: "היכן נשמר שיוך מפעל-תחזוקה למפעל-תכנון?", aHe: "בטבלת T399I, המוגדרת ב-SPRO תחת Set Up Maintenance Plant." },
        { qHe: "מהו Planner Group ולמה הוא חשוב?", aHe: "Planner Group (INGRP, T024I) הוא קבוצת-המתכננים האחראית בתוך מפעל-תכנון; הוא מנתב הודעות/הזמנות לאחראי הנכון ומשמש לסינון ולדיווח." },
      ],
      takeawaysHe: [
        "המבנה הארגוני הוא השלד של כל תהליך-PM — נקבע לפני כל אובייקט טכני.",
        "ההבחנה הקריטית: Maintenance Plant (היכן) מול Maintenance Planning Plant (מי מתכנן).",
        "T399I קושר ביניהם; T024I מגדיר Planner Groups; CRHD מגדיר Work Centers.",
        "שיוך Cost Center נכון = זקיפת עלות-תחזוקה מדויקת.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · T399I", href: "/library/pm/object/T399I/" },
      ],
      children: [
        // -------------------------------------------------- 2.1.1
        {
          id: "2.1.1",
          titleHe: "המפעל מנקודת מבט של אחזקה",
          titleEn: "The Plant from a Maintenance Perspective",
          execHe:
            "ב-PM ל-Plant יש משמעות כפולה: הוא גם ה-Maintenance Plant (האתר הפיזי שבו הציוד עומד) וגם — אם הוגדר כך — ה-Maintenance Planning Plant (האתר שמתכנן את האחזקה). הבנת שני התפקידים היא הבסיס לכל החלטת-מבנה ב-PM.",
          beginnerHe:
            "במכירות 'מפעל' הוא מחסן; בייצור הוא קו-ייצור; בתחזוקה הוא בעיקר 'המקום שבו הציוד מותקן'. כשהציוד מתקלקל, SAP צריך לדעת באיזה מפעל הוא נמצא — וזה ה-Maintenance Plant.",
          consultantHe:
            "ה-Plant מוגדר ב-Enterprise Structure (OX10) ומשויך ל-Company Code. בכרטיס-הציוד (EQUI) ובמיקום-הפונקציונלי (IFLOT) הוא נשמר בשדה SWERK (Maintenance Plant) דרך מבנה-הכתובת ILOA. שדה ה-IWERK (Planning Plant) נגזר ממנו דרך T399I. אותו Plant יכול לשרת בו-זמנית כ-Maintenance Plant וכ-Planning Plant (תכנון מבוזר) או רק כאחד מהם.",
          purposeHe:
            "לקבע את העוגן הגאוגרפי של כל אובייקט-תחזוקה — היכן הוא עומד — כדי לאפשר סינון, דיווח, ושיוך-עלות לפי אתר.",
          processExampleHe:
            "מתקינים ציוד חדש ב-IE01: בוחרים Maintenance Plant; SAP מאכלס SWERK בכרטיס-הציוד וגוזר את ה-Planning Plant מ-T399I, כך שכל הודעה עתידית כבר תדע לאן לפנות.",
          scenarioHe:
            "בארגון אתר-המילוי בבאר-שבע הוא Plant אחד; כל מכונות-המילוי, המדחסים והמכלים נושאים אותו כ-Maintenance Plant (SWERK), בלי קשר לשאלה אם התכנון מקומי או מטה.",
          navHe: [
            "Enterprise Structure ► Definition ► Logistics – General ► Define, copy, delete, check plant (OX10)",
            "Enterprise Structure ► Assignment ► Logistics – General ► Assign plant to company code (OX18)",
          ],
          tables: ["T001W", "ILOA", "EQUI", "IFLOT"],
          tcodes: ["OX10", "OX18", "IE01", "IL01"],
          fiori: ["F2730"],
          configHe: [
            "מגדירים Plant ב-OX10 (כתובת, גורם-בקרת-לוח-שנה).",
            "משייכים את ה-Plant ל-Company Code ב-OX18 — תנאי לזקיפת-עלות.",
            "ה-Plant הופך זמין כ-Maintenance Plant באובייקטי-התחזוקה דרך מבנה-הכתובת ILOA (שדה SWERK).",
          ],
          mistakesHe: [
            "שימוש ב-Plant לוגיסטי קיים בלי לוודא שהוא משויך נכון ל-Company Code — חוסם זקיפת-עלות.",
            "אי-מילוי Maintenance Plant בכרטיס-הציוד — הציוד 'יתום' מאתר.",
          ],
          troubleshootHe: [
            "ציוד לא מופיע בסינון-אתר ➔ SWERK ריק/שגוי בכרטיס-הציוד.",
            "שגיאת-זקיפת-עלות ➔ ה-Plant לא משויך ל-Company Code (OX18).",
          ],
          bestPracticeHe: [
            "השתמשו ב-Plants לוגיסטיים קיימים גם כ-Maintenance Plants במקום ליצור כפילויות.",
            "ודאו שכל Plant של תחזוקה משויך ל-Company Code לפני הקמת ציוד.",
          ],
          interviewHe: [
            { qHe: "מה המשמעות של Plant ב-PM לעומת מודולים אחרים?", aHe: "ב-PM ה-Plant הוא בעיקר ה-Maintenance Plant — האתר הפיזי שבו הציוד מותקן (SWERK) — ויכול גם לשמש כ-Maintenance Planning Plant." },
            { qHe: "באיזה שדה נשמר ה-Maintenance Plant באובייקט-התחזוקה?", aHe: "בשדה SWERK, דרך מבנה-הכתובת ILOA המשותף לכרטיס-הציוד ולמיקום-הפונקציונלי." },
          ],
          takeawaysHe: [
            "ב-PM ה-Plant = בראש ובראשונה ה-Maintenance Plant (היכן הציוד).",
            "נשמר ב-SWERK דרך ILOA; ה-Planning Plant נגזר דרך T399I.",
            "חייב להיות משויך ל-Company Code לזקיפת-עלות.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
          ],
        },
        // -------------------------------------------------- 2.1.2
        {
          id: "2.1.2",
          titleHe: "יחידות ארגוניות ייעודיות לאחזקה",
          titleEn: "Maintenance-Specific Organizational Units",
          execHe:
            "מעבר ל-Plant הכללי, ל-PM יש יחידות ארגוניות ייחודיות: Maintenance Planning Plant, Maintenance Planner Group ו-Plant Section. הן קובעות מי מתכנן, מי אחראי, ולאיזה אזור-תפעול שייכת העבודה.",
          beginnerHe:
            "אלה ה'תפקידים' של עולם-התחזוקה: היכן מתכננים (Planning Plant), מי המתכנן (Planner Group), ובאיזה אזור פיזי בתוך המפעל (Plant Section). הם עונים על 'מי אחראי על מה'.",
          consultantHe:
            "Maintenance Planning Plant מסומן ב-T399I; Maintenance Planner Group (INGRP) מוגדר ב-T024I לכל מפעל-תכנון ונושא תיאור וטלפון; Plant Section (BEBER) מוגדר ב-SPRO ומקושר ל-Person Responsible. כל אלה מאוכלסים אוטומטית מהציוד אל ה-Notification וה-Order ומשמשים לניתוב, סינון, ודיווח (למשל בכל רשימות ה-IW-).",
          purposeHe:
            "להגדיר את שרשרת-האחריות של התחזוקה: מי מתכנן, מי מבצע-מנהל, ולאיזה אזור-אחריות שייך הציוד — בלי תלות במבנה הלוגיסטי.",
          processExampleHe:
            "הזמנת-עבודה נפתחת; ה-Planner Group נשאב מהציוד ומופיע בכותרת-ההזמנה, כך שהמתכנן רואה את כל עבודתו ברשימת IW38 לפי קבוצתו, וה-Plant Section מאפשר לדווח עלויות לפי אזור.",
          scenarioHe:
            "בארגון: Planner Group 'מכונות-מילוי' מול 'מערכות-קירור'; Plant Section 'אזור-מילוי' מול 'חדר-דוודים' — כך אחראי-האזור מקבל רק את הקריאות הרלוונטיות לו.",
          navHe: [
            "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► General Data ► Define Planner Groups (T024I)",
            "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► General Data ► Define Plant Sections",
          ],
          tables: ["T399I", "T024I", "T357", "ILOA"],
          tcodes: ["SPRO", "OIAS", "IE02", "IL02"],
          fiori: ["F1582"],
          configHe: [
            "Maintenance Planning Plant (T399I): סמן Plant כמפעל-תכנון וקבע אילו Maintenance Plants הוא משרת.",
            "Planner Group (T024I): הזן קוד INGRP, תיאור וטלפון לכל מפעל-תכנון.",
            "Plant Section (BEBER, T357): הגדר אזורי-אחריות וקשר Person Responsible.",
          ],
          flow: [
            { he: "מפעל-תכנון", code: "T399I" },
            { he: "Planner Group", code: "T024I", note: "INGRP" },
            { he: "Plant Section", code: "T357", note: "BEBER" },
            { he: "מאוכלס בציוד ► הזמנה", code: "IE02" },
          ],
          masterDataHe: [
            "INGRP (Planner Group) ו-BEBER (Plant Section) נשמרים בכרטיס-הציוד (דרך ILOA) ומועתקים להודעה/הזמנה.",
          ],
          mistakesHe: [
            "הגדרת Planner Groups לא-עקבית בין מפעלי-תכנון — מקשה דיווח רוחבי.",
            "אי-שימוש ב-Plant Section — אובדן יכולת לדווח עלות לפי אזור פיזי.",
          ],
          troubleshootHe: [
            "הזמנה ללא Planner Group ➔ הציוד נפתח ללא INGRP.",
            "אי-אפשר לבחור Planner Group ➔ לא הוגדר ב-T024I למפעל-התכנון הנכון.",
          ],
          bestPracticeHe: [
            "תקננו Planner Groups לפי דיסציפלינה (מכני/חשמלי/קירור) ולא לפי שמות-אנשים.",
            "השתמשו ב-Plant Section לדיווח-עלות ולניתוב-אחריות בתוך אתר גדול.",
          ],
          interviewHe: [
            { qHe: "מהן שלוש היחידות הייעודיות של PM?", aHe: "Maintenance Planning Plant, Maintenance Planner Group (INGRP) ו-Plant Section (BEBER)." },
            { qHe: "מה ההבדל בין Planner Group ל-Plant Section?", aHe: "Planner Group הוא קבוצת-המתכננים האחראית (מי מתכנן); Plant Section הוא אזור-אחריות פיזי בתוך המפעל (היכן/אחראי-תפעול)." },
          ],
          takeawaysHe: [
            "Planning Plant (T399I), Planner Group (T024I), Plant Section (T357) = שלשת היחידות הייעודיות.",
            "כולן מאוכלסות מהציוד אל ההודעה/ההזמנה.",
            "משמשות לניתוב, סינון ודיווח-עלות.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
            { labelHe: "אובייקט · T024I", href: "/library/pm/object/T024I/" },
          ],
        },
        // -------------------------------------------------- 2.1.3
        {
          id: "2.1.3",
          titleHe: "יחידות ארגוניות כלליות נוספות",
          titleEn: "Other General Organizational Units",
          execHe:
            "התחזוקה אינה חיה לבדה: היא נשענת על יחידות-על כלליות מ-FI/CO ומלוגיסטיקה — Company Code, Controlling Area, Cost Center, Storage Location ו-Sales Organization (ב-CS). הן קובעות לאיזה ספר נזקפת העלות ומאיזה מחסן נמשכים חלפים.",
          beginnerHe:
            "מעבר למפעל ולמתכננים יש 'מגירות-כסף' ו'מגירות-מלאי': Cost Center (לאן הולכת העלות), Storage Location (מאיפה לוקחים חלקי-חילוף), ו-Company Code (החברה המשפטית). התחזוקה מתחברת לכולן.",
          consultantHe:
            "Controlling Area + Cost Center (CSKS) הם יעד-העלות של הזמנת-התחזוקה (Settlement); Company Code (T001) הוא הישות המשפטית; Storage Location (T001L) מנהל את מלאי-החלפים; ב-Customer Service מצטרפים Sales Organization / Distribution Channel (TVKO/TVTW) לחיוב-לקוח. שיוך Plant ► Company Code ► Controlling Area הוא תנאי-סף ל-Settlement תקין של הזמנות-PM.",
          purposeHe:
            "לחבר את התחזוקה הפיזית למערכת-העלויות ולשרשרת-החלפים: כל שעת-עבודה וכל חלק שנמשך מקבלים בית-עלות ובית-מלאי.",
          processExampleHe:
            "הזמנת-תחזוקה צורכת חלף מ-Storage Location ועבודה ממרכז-עבודה; בסגירה היא מבצעת Settlement ל-Cost Center של מחלקת-האחזקה, וה-Company Code רושם את ההוצאה ב-FI.",
          scenarioHe:
            "בארגון חלקי-חילוף למכונות-המילוי יושבים ב-Storage Location ייעודי; עלות-התחזוקה נזקפת ל-Cost Center 'אחזקת-ייצור' תחת Controlling Area של הקבוצה.",
          navHe: [
            "Enterprise Structure ► Definition ► Financial Accounting ► Define Company Code (OX02)",
            "Enterprise Structure ► Definition ► Controlling ► Maintain Controlling Area (OKKP)",
            "Enterprise Structure ► Definition ► Materials Management ► Maintain Storage Location (OX09)",
          ],
          tables: ["T001", "TKA01", "CSKS", "T001L", "TVKO"],
          tcodes: ["OX02", "OKKP", "OX09", "KS01", "OVXB"],
          fiori: ["F0750", "F1582"],
          configHe: [
            "Company Code (OX02): הישות המשפטית; כל Plant חייב להשתייך לאחת.",
            "Controlling Area (OKKP): מסגרת ה-CO; מקשרת Company Code ל-Cost Centers.",
            "Cost Center (KS01): יעד-ה-Settlement של הזמנות-התחזוקה.",
            "Storage Location (OX09): מחסן-החלפים בתוך ה-Plant.",
          ],
          masterDataHe: [
            "Cost Center (CSKS) משויך לאובייקט-התחזוקה/מרכז-העבודה ומשמש כיעד-ברירת-מחדל ל-Settlement.",
            "Storage Location (T001L) קובע מאיזה מלאי נמשכים חלפים בהזמנה.",
          ],
          mistakesHe: [
            "Plant ללא Controlling Area תואם — Settlement נכשל.",
            "Cost Center לא משויך לאובייקט/מרכז-עבודה — עלות נשארת תקועה בהזמנה.",
            "ערבוב מלאי-חלפים עם מלאי-ייצור באותו Storage Location.",
          ],
          troubleshootHe: [
            "Settlement נכשל ➔ Cost Center חסר/לא-תקף או חוסר התאמה Controlling Area↔Company Code.",
            "אי-אפשר למשוך חלף ➔ Storage Location לא מוגדר ל-Plant.",
          ],
          bestPracticeHe: [
            "הקצו Storage Location נפרד לחלקי-חילוף של אחזקה.",
            "ודאו שרשרת שיוך תקינה Plant ► Company Code ► Controlling Area לפני go-live.",
            "הגדירו Cost Center ברירת-מחדל למרכזי-העבודה של האחזקה.",
          ],
          interviewHe: [
            { qHe: "אילו יחידות-על כלליות חיוניות ל-PM?", aHe: "Company Code, Controlling Area, Cost Center, Storage Location, ובהקשר CS גם Sales Organization." },
            { qHe: "מדוע שיוך Plant ► Company Code ► Controlling Area קריטי?", aHe: "הוא תנאי-סף ל-Settlement תקין של הזמנות-PM — בלעדיו העלות לא נזקפת ל-Cost Center." },
          ],
          takeawaysHe: [
            "PM נשען על יחידות-על מ-FI/CO ומלוגיסטיקה.",
            "Cost Center = יעד-Settlement; Storage Location = מלאי-חלפים.",
            "שרשרת Plant ► Company Code ► Controlling Area חייבת להיות תקינה.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
          ],
        },
        // -------------------------------------------------- 2.1.4
        {
          id: "2.1.4",
          titleHe: "אחזקה ייחודית-למפעל ואחזקה חוצת-מפעלים",
          titleEn: "Plant-Specific and Cross-Plant Maintenance",
          execHe:
            "שתי תפיסות-תכנון מנוגדות: אחזקה ייחודית-למפעל (Plant-Specific) — כל Plant מתכנן את עצמו; ואחזקה חוצת-מפעלים (Cross-Plant / מרכזית) — Maintenance Planning Plant אחד מתכנן כמה Maintenance Plants. הבחירה ביניהן נקבעת כולה דרך T399I והיא החלטת-העל של מבנה-PM.",
          beginnerHe:
            "האם כל אתר מתכנן את האחזקה שלו בעצמו, או שמטה אחד מתכנן עבור כמה אתרים? הראשון הוא 'מבוזר' (כל Plant מתכנן את עצמו); השני 'מרכזי' (Planning Plant אחד לכולם).",
          consultantHe:
            "בתכנון מבוזר (Plant-Specific) כל Plant הוא גם Maintenance Plant וגם Planning Plant של עצמו (IWERK = SWERK). בתכנון מרכזי (Cross-Plant) מסמנים Planning Plant אחד ב-T399I ומשייכים אליו כמה Maintenance Plants (IWERK ≠ SWERK). תכנון מרכזי מאפשר Planner Groups ומרכזי-עבודה משותפים בין אתרים, אך מחייב שכל ה-Maintenance Plants יהיו תחת אותו Company Code (או טיפול חוצה-חברות). זו ההכרעה שמבדילה בין 2.1.1 ל-2.1.4.",
          purposeHe:
            "להתאים את מודל-התכנון למבנה-הארגון: ביזור לאוטונומיה אתרית, ריכוז לחיסכון-תקן, סטנדרטיזציה ושיתוף-משאבים בין אתרים.",
          processExampleHe:
            "בתרחיש מרכזי: ציוד נכשל באתר-צפון (Maintenance Plant 2000), אך ה-Notification מנותב ל-Planning Plant 1000 (המטה); מתכנן במטה רואה את כל הקריאות מכל האתרים ברשימה אחת ומקצה משאבים בין-אתרית.",
          scenarioHe:
            "בארגון עם כמה אתרי-מילוי: מודל מרכזי מאפשר ל-COE-אחזקה במטה לתכנן עבור כל האתרים (Planning Plant אחד), בעוד הציוד נשאר ב-Maintenance Plant של כל אתר — איזון בין סטנדרטיזציה לאוטונומיה מקומית.",
          navHe: [
            "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► General Data ► Set Up Maintenance Plant (T399I)",
            "Plant Maintenance and Customer Service ► Organization ► Maintenance Plants ► Maintain assignment Planning Plant to Maintenance Plant",
          ],
          tables: ["T399I", "T001W", "ILOA"],
          tcodes: ["SPRO", "IE03", "IL03", "IW38"],
          fiori: ["F1582", "F2730"],
          configHe: [
            "מבוזר: סמן כל Plant גם כ-Maintenance Plant וגם כ-Planning Plant של עצמו (T399I).",
            "מרכזי: סמן Planning Plant אחד ושייך אליו כמה Maintenance Plants (T399I).",
            "ודא שכל ה-Maintenance Plants המשויכים תחת Company Code תואם ל-Settlement.",
          ],
          flow: [
            { he: "החלטה: מבוזר/מרכזי", note: "החלטת-על" },
            { he: "מבוזר: IWERK = SWERK", code: "T399I" },
            { he: "מרכזי: IWERK ≠ SWERK", code: "T399I", note: "Planning Plant אחד" },
            { he: "ניתוב הודעות/הזמנות", code: "IW38" },
          ],
          masterDataHe: [
            "T399I קובע את היחס Maintenance Plant ↔ Planning Plant לכל אתר.",
            "באובייקט: IWERK (Planning) ו-SWERK (Maintenance) — שווים במבוזר, שונים במרכזי.",
          ],
          mistakesHe: [
            "מעבר מאוחר ממבוזר למרכזי אחרי שכבר נוצרו אובייקטים — דורש המרת-נתונים מורכבת.",
            "ניסיון תכנון חוצה-מפעלים כשה-Maintenance Plants תחת Company Codes שונים בלי תכנון חוצה-חברות.",
          ],
          troubleshootHe: [
            "מתכנן-מטה לא רואה קריאות מאתר ➔ ה-Maintenance Plant לא משויך ל-Planning Plant המרכזי ב-T399I.",
            "Settlement חוצה-אתרים נכשל ➔ Maintenance Plants תחת Company Codes שונים.",
          ],
          bestPracticeHe: [
            "הכריעו על מודל-התכנון בשלב-העיצוב — קשה מאוד לשנות אחרי go-live.",
            "מודל מרכזי מתאים כשיש סטנדרטיזציה גבוהה ושיתוף-משאבים בין אתרים.",
            "מודל מבוזר מתאים כשאתרים אוטונומיים עם צוותי-אחזקה עצמאיים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין תכנון מבוזר למרכזי ב-PM?", aHe: "במבוזר כל Plant מתכנן את עצמו (IWERK = SWERK); במרכזי Planning Plant אחד מתכנן כמה Maintenance Plants (IWERK ≠ SWERK)." },
            { qHe: "כיצד מגדירים תכנון חוצה-מפעלים?", aHe: "מסמנים Planning Plant יחיד ב-T399I ומשייכים אליו את כל ה-Maintenance Plants הרצויים, בתנאי התאמת Company Code/Controlling Area." },
          ],
          takeawaysHe: [
            "Plant-Specific = מבוזר (IWERK=SWERK); Cross-Plant = מרכזי (IWERK≠SWERK).",
            "הכל נקבע ב-T399I — החלטת-העל של מבנה-PM.",
            "מרכזי = שיתוף Planner Groups/Work Centers; מבוזר = אוטונומיה אתרית.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
            { labelHe: "אובייקט · T399I", href: "/library/pm/object/T399I/" },
          ],
        },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2",
      titleHe: "מרכזי עבודה (Work Centers)",
      titleEn: "Work Centers",
      execHe:
        "מרכז-העבודה (Work Center) הוא היחידה הארגונית שמייצגת 'מי מבצע את העבודה' — צוות-אחזקה, סדנה או מכונה. הוא מחבר את הזמנת-העבודה לשלוש יכולות: תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing). ב-PM הוא Work Center של תחזוקה (Maintenance Work Center) — נקודת-החיבור בין התכנון לביצוע בפועל.",
      beginnerHe:
        "מרכז-עבודה הוא 'הצוות או התחנה שעושים את העבודה'. כשפותחים הזמנת-תחזוקה, כל פעולה (Operation) מצביעה על מרכז-עבודה: כך SAP יודע כמה זמן זה ייקח, מי פנוי (קיבולת), וכמה זה עולה. לדוגמה, מרכז-העבודה IR01 יכול לייצג את צוות-המכונאים.",
      consultantHe:
        "מרכז-עבודה של תחזוקה מוגדר ב-IR01/IR02/IR03 ונשמר ב-CRHD (כותרת) + CRTX (טקסטים) + CRCO (שיוך Cost Center/Activity Types) + CRCA (יכולות). הקטגוריה הרלוונטית ל-PM היא 0005 (Maintenance Work Center). הוא נושא: Person Responsible, Plant, Usage (לאיזה Task List מותר), Standard Value Key, נוסחאות-תזמון/קיבולת, ושיוך ל-Cost Center עם Activity Types (KP26) לתמחיר. ה-Control Key בפעולה (PM01 פנימי, PM02 חיצוני) קובע אילו יכולות פעילות. שדה ה-VERWE (Usage) ב-CRHD מגביל באילו רשימות-משימות המרכז מותר.",
      purposeHe:
        "לתרגם פעולות-תחזוקה למשך-עבודה (תזמון), לעומס על הצוות (קיבולת) ולעלות-עבודה (Costing). מרכז-עבודה מוגדר נכון = הזמנה מתוזמנת ומתומחרת נכון; מוגדר שגוי = משך אפס או עלות אפס.",
      processExampleHe:
        "בהזמנת-תחזוקה הפעולה מצביעה על Work Center IR01 ונושאת Work=4 שעות; נוסחת-התזמון של המרכז מתרגמת למשך-פעולה ולתאריכים, נוסחת-הקיבולת מטילה עומס על הצוות (Capacity 002 כוח-אדם), ובסגירה נוסחת-העלות מכפילה את השעות בתעריף-ה-Activity Type (KP26) — וכך נזקפת עלות-העבודה ל-Cost Center.",
      scenarioHe:
        "בארגון: Work Center IR01 = 'צוות-מכונאים-מילוי'; Work Center IR02 = 'חשמלאי-בקרה'. כל מרכז משויך ל-Cost Center של מחלקת-האחזקה עם Activity Type לשעת-עבודה ותעריף KP26, כך שעלות תיקון מכונת-מילוי נזקפת אוטומטית.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Define Work Center Category (OP40)",
        "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Define Standard Value Key (OP19)",
        "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Define Formulas for Work Centers (OP21)",
      ],
      tables: ["CRHD", "CRTX", "CRCO", "CRCA", "KAKO"],
      tcodes: ["IR01", "IR02", "IR03", "CR05", "KP26"],
      fiori: ["F2336", "F4006"],
      configHe: [
        "Work Center Category (OP40): לתחזוקה משתמשים בקטגוריה 0005; קובעת מסכים, Standard Value Key ויישומי-Task-List מותרים.",
        "Standard Value Key (OP19): אילו ערכי-זמן נאספים בפעולה (לרוב Work/Labor לתחזוקה).",
        "Formulas (OP21): נוסחאות נפרדות לתזמון, קיבולת ועלות.",
        "שיוך Cost Center + Activity Types ל-Costing, ותעריפים ב-KP26.",
      ],
      flow: [
        { he: "קטגוריה 0005", code: "OP40", note: "Maintenance WC" },
        { he: "Standard Value Key", code: "OP19" },
        { he: "נוסחאות", code: "OP21", note: "תזמון/קיבולת/עלות" },
        { he: "Cost Center + Activity", code: "KP26", note: "תעריפים" },
        { he: "יצירת מרכז-עבודה", code: "IR01" },
        { he: "שימוש בהזמנה/Task List", code: "IA01/IW31" },
      ],
      masterDataHe: [
        "CRHD = כותרת (Plant, Category, Usage/VERWE, Person Responsible) · CRTX = טקסטים.",
        "CRCO = שיוך Cost Center + Activity Type · CRCA = יכולות · KAKO = קיבולת זמינה.",
        "Capacity Category 002 (כוח-אדם) נפוצה לתחזוקה; Available Capacity + Utilization %.",
      ],
      mistakesHe: [
        "שימוש בקטגוריית-מרכז של ייצור במקום 0005 (Maintenance) — מסכים ושדות לא-מתאימים.",
        "Control Key ללא 'Costing' בפעולה — עבודת-התחזוקה לא מתומחרת.",
        "Activity Type ללא תעריף (KP26) — עלות-עבודה אפס.",
        "Usage (VERWE) שגוי — אי-אפשר לבחור את המרכז ב-Task List/הזמנה.",
      ],
      troubleshootHe: [
        "אי-אפשר לבחור מרכז-עבודה בהזמנת-PM ➔ Usage (VERWE) ב-CRHD לא מתיר את היישום.",
        "תזמון-הזמנה שגוי ➔ נוסחאות (OP21) או Standard Values שגויים.",
        "עלות-עבודה אפס ➔ Activity Type ללא תעריף (KP26) או Control Key ללא Costing.",
        "אין עומס-קיבולת ➔ Control Key ללא Capacity או קיבולת לא-מוגדרת (KAKO).",
      ],
      bestPracticeHe: [
        "השתמשו בקטגוריה 0005 לכל מרכזי-העבודה של תחזוקה.",
        "הגדירו מרכז-עבודה לכל צוות-אחזקה (מכני/חשמלי/קירור) במקום אחד גנרי.",
        "תאמו Activity Types ותעריפי KP26 עם ה-CO לפני go-live.",
        "השתמשו ב-Standard Value Key הסטנדרטי; נוסחאות-מותאמות רק בצורך אמיתי.",
      ],
      interviewHe: [
        { qHe: "אילו שלוש יכולות מספק מרכז-עבודה?", aHe: "תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing)." },
        { qHe: "באיזו קטגוריה משתמשים למרכז-עבודה של תחזוקה?", aHe: "קטגוריה 0005 (Maintenance Work Center), המוגדרת ב-OP40 ומשמשת ב-IR01." },
        { qHe: "כיצד מרכז-עבודה מחבר את התחזוקה לעלות?", aHe: "דרך שיוך Cost Center + Activity Types ב-CRCO; נוסחת-העלות מכפילה את ערכי-העבודה בתעריף-ה-Activity Type (KP26)." },
        { qHe: "מה תפקיד ה-Usage (VERWE) במרכז-עבודה?", aHe: "הוא מגביל באילו רשימות-משימות והזמנות מותר להשתמש במרכז — חיוני שיתאים ליישומי-PM." },
      ],
      takeawaysHe: [
        "Work Center = 'מי מבצע' — צוות/סדנה/מכונה; מוגדר ב-IR01, קטגוריה 0005.",
        "מספק תזמון + קיבולת + עלות; נשמר ב-CRHD/CRTX/CRCO/CRCA.",
        "מתחבר לעלות דרך Cost Center + Activity Types (KP26).",
        "Usage (VERWE) ו-Control Key קובעים היכן המרכז מותר ואילו יכולות פעילות.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
        { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
        { labelHe: "אובייקט · CRHD", href: "/library/pm/object/CRHD/" },
      ],
    },
    // ============================================================ 2.3
    {
      id: "2.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "המבנה הארגוני של PM הוא התשתית שעליה נשען כל תהליך-אחזקה. הוא עונה על ארבע שאלות: היכן הציוד (Maintenance Plant), מי מתכנן (Maintenance Planning Plant + Planner Group), מי מבצע (Work Center), ולחשבון מי (Cost Center). שליטה במבנה זה היא תנאי-סף לכל מה שיבוא בפרקים הבאים — אובייקטים טכניים, הודעות, הזמנות ואחזקה מונעת.",
      beginnerHe:
        "סיכמנו את 'המפה הארגונית' של התחזוקה: Plant (היכן), Planning Plant + Planner Group (מי מתכנן), Work Center (מי מבצע), Cost Center (לאן הולכת העלות). כשהמפה הזו ברורה, כל הזמנת-עבודה יודעת מאליה לאן היא שייכת.",
      consultantHe:
        "מבחינה טכנית: ה-Plant (T001W) משויך ל-Company Code; T399I קושר Maintenance Plant ל-Maintenance Planning Plant וקובע מבוזר/מרכזי; T024I מגדיר Planner Groups (INGRP); Plant Section (BEBER) מגדיר אזורי-אחריות; ו-CRHD מגדיר Work Centers (קטגוריה 0005) המחוברים ל-Cost Center דרך Activity Types. כל אלה מאוכלסים מהאובייקט הטכני (ILOA) אל ההודעה וההזמנה. שגיאת-מבנה כאן מחלחלת לניתוב, לתזמון, לקיבולת ולעלות.",
      purposeHe:
        "לקבע בראש-הלומד מודל-מנטלי שלם של הרשת הארגונית, כך שכל מושג עתידי ב-PM ייקשר למקומו הנכון במבנה.",
      processExampleHe:
        "מציוד שנכשל ועד ל-Settlement: SWERK (Maintenance Plant) ► IWERK (Planning Plant, T399I) ► INGRP (Planner Group) ► Work Center IR01 ► Cost Center — שרשרת אחת שמקשרת היכן, מי-מתכנן, מי-מבצע ולחשבון-מי.",
      scenarioHe:
        "בארגון כל אתר-מילוי הוא Maintenance Plant; התכנון מרוכז במטה (Planning Plant אחד) או מקומי; Planner Groups לפי דיסציפלינה; Work Centers לפי צוות; ועלות נזקפת ל-Cost Center של אחזקת-הייצור.",
      navHe: [
        "Plant Maintenance and Customer Service ► Organization ► (כל ה-SPRO של פרק זה)",
      ],
      tables: ["T001W", "T399I", "T024I", "CRHD", "CSKS"],
      tcodes: ["OX10", "T399I", "T024I", "IR01", "KS01"],
      fiori: ["F1582", "F2336"],
      configHe: [
        "סדר-הקמה מומלץ: Company Code ► Plant (OX10) ► Maintenance Planning Plant (T399I) ► Planner Groups (T024I) ► Plant Sections ► Work Centers (IR01) ► Cost Centers (KS01).",
        "כל שלב הוא תנאי-סף לבא אחריו.",
      ],
      flow: [
        { he: "Company Code" },
        { he: "Maintenance Plant", code: "OX10" },
        { he: "Planning Plant", code: "T399I" },
        { he: "Planner Group", code: "T024I" },
        { he: "Work Center", code: "IR01" },
        { he: "Cost Center", code: "KS01" },
      ],
      masterDataHe: [
        "כל היחידות (SWERK, IWERK, INGRP, BEBER, Work Center, Cost Center) מתלכדות באובייקט הטכני דרך ILOA ומחלחלות להודעה/הזמנה.",
      ],
      mistakesHe: [
        "דילוג על החלטת מבוזר/מרכזי לפני הקמת אובייקטים — קשה לתקן בדיעבד.",
        "אי-תיאום שיוכי Cost Center עם ה-CO — עלויות-אחזקה לא נזקפות.",
        "חוסר-עקביות בשמות Planner Groups ו-Work Centers בין אתרים.",
      ],
      troubleshootHe: [
        "תופעות שונות (ניתוב/תזמון/עלות שגויים) ➔ ברוב המקרים שורש-הבעיה הוא שיוך-מבנה חסר: T399I, T024I, CRHD או Cost Center.",
        "כשהזמנה 'לא מתנהגת' — בדקו תחילה את שרשרת המבנה הארגוני שמאחוריה.",
      ],
      bestPracticeHe: [
        "תכננו את כל המבנה הארגוני בשלב-העיצוב כיחידה אחת, לא בטלאים.",
        "תקננו מוסכמות-שמות אחידות בין כל האתרים.",
        "תַעֲדו את מודל-התכנון (מבוזר/מרכזי) ואת היגיון ה-Planner Groups.",
      ],
      interviewHe: [
        { qHe: "מהן ארבע השאלות שהמבנה הארגוני של PM עונה עליהן?", aHe: "היכן הציוד (Maintenance Plant), מי מתכנן (Planning Plant + Planner Group), מי מבצע (Work Center), ולחשבון מי (Cost Center)." },
        { qHe: "מהו סדר-ההקמה הנכון של היחידות הארגוניות?", aHe: "Company Code ► Plant ► Maintenance Planning Plant (T399I) ► Planner Groups ► Plant Sections ► Work Centers ► Cost Centers — כל שלב תנאי-סף לבא אחריו." },
      ],
      takeawaysHe: [
        "המבנה הארגוני עונה על: היכן / מי-מתכנן / מי-מבצע / לחשבון-מי.",
        "T399I (מבוזר/מרכזי), T024I (Planner Groups), CRHD (Work Centers) הם צירי-המבנה.",
        "הכל מתלכד באובייקט הטכני (ILOA) ומחלחל להודעה ולהזמנה.",
        "שליטה במבנה זה היא תנאי-סף לכל הפרקים הבאים ב-PM.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · מבנים ארגוניים", href: "/library/pm-academy/chapter-02/" },
        { labelHe: "PMU · אובייקטים טכניים (פרק 3)", href: "/library/pmu/chapter-03/" },
      ],
    },
  ],
};
