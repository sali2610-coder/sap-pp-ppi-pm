// ===== EWM Digital Textbook — Chapter 6 (Warehouse Automation Systems) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, enough to study the topic without the book.
// Source hierarchy preserved exactly; SAP identifiers verbatim English.
// CBC = Coca-Cola bottling automated high-bay pallet warehouse (AS/RS, AGV).
import type { TextbookChapter } from "./types";

export const CH6: TextbookChapter = {
  n: 6,
  titleHe: "מערכות אוטומציה למחסן (MFS)",
  titleEn: "Warehouse Automation Systems",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לאוטומציית-מחסן ב-SAP EWM. נלמד כיצד EWM שולט ישירות בציוד-אוטומציה — מחסני-מדפים אוטומטיים (AS/RS), מסועים, רכבים אוטונומיים (AGV) ורובוטים — דרך רכיב ה-Material Flow System (MFS). כל תת-פרק הורחב ליחידה עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC ממחסן-המשטחים האוטומטי של מפעל-המשקאות, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-זרימת-טלגרמות, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לשלוט באוטומציית-EWM ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 6.1
    {
      id: "6.1",
      titleHe: "סקירת מערכות אוטומציה למחסן",
      titleEn: "Overview of Warehouse Automation Systems",
      execHe:
        "אוטומציית-מחסן מחליפה תנועות ידניות בציוד ממוכן — מסועים, מחסני-מדפים אוטומטיים (AS/RS), רכבים אוטונומיים (AGV) ורובוטים — המנוהל ישירות מ-SAP EWM. במקום מערכת-ביניים (Warehouse Control System חיצוני) EWM Embedded ב-S/4HANA שולט בציוד דרך רכיב Material Flow System (MFS), ובכך מאחד תכנון-מחסן ובקרת-ציוד במערכת אחת. התוצאה: פחות שכבות-אינטגרציה, זמן-תגובה נמוך ונראות מלאה מהזמנה ועד מיקום-המדף.",
      beginnerHe:
        "דמיין מחסן ענק שבו מנופים, מסועים ועגלות-רובוט זזים לבד. מישהו חייב לומר להם 'קח את המשטח הזה מנקודה A לתא B'. בעולם הקלאסי היה 'מתווך' חיצוני (WCS) שתרגם פקודות. ב-EWM המודרני SAP עצמו מדבר ישירות עם הציוד דרך רכיב בשם MFS — Material Flow System. כך אותה מערכת שמנהלת את המלאי גם נוהגת במכונות.",
      consultantHe:
        "ב-EWM מבחינים בשלוש ארכיטקטורות-בקרה: (1) WCS חיצוני — ציוד מנוהל על-ידי מערכת-צד-שלישי, EWM מעביר Warehouse Tasks ב-WT-confirmation; (2) MFS — EWM משמש בעצמו כ-Warehouse Control Unit ומדבר ישירות עם PLC דרך טלגרמות (Telegrams) על TCP/IP; (3) Robotics — SAP Warehouse Robotics מתזמר רובוטים אוטונומיים בענן/Edge. ההחלטה תלויה ב-throughput, בזמינות-IT וב-Total Cost of Ownership. MFS מתאים כשרוצים latency נמוך ובקרה דטרמיניסטית; WCS חיצוני מתאים כשהספק כבר מספק בקר-מאסטר.",
      purposeHe:
        "המטרה: להגדיל תפוקה, דיוק וזמינות-מלאי תוך הקטנת תלות בכוח-אדם, ולעשות זאת בלי ריבוי-מערכות. אוטומציה מנוהלת-EWM מבטיחה שהחלטות-המלאי (איזה משטח, לאן, מתי) וביצוע-הציוד (איזה מנוף, איזה מסוע) מתקבלות מאותו מקור-אמת.",
      processExampleHe:
        "משטח מוגמר יורד מקו-הייצור אל מסוע-קליטה. סורק קורא את ה-Handling Unit; EWM יוצר Warehouse Task לאחסון. אם המחסן אוטומטי, ה-WT עובר ל-MFS שמתרגם אותו לסדרת-טלגרמות אל ה-PLC: 'הזז מסוע 3 קדימה', 'הרם מנוף לתא 12-04-08'. אישורי-הציוד חוזרים כטלגרמות-מצב ו-EWM מאשר את ה-WT.",
      cbcHe:
        "ב-CBC מפעל-המשקאות מפעיל מחסן-משטחים אוטומטי בגובה-רב (high-bay): משטחי-בקבוקים מוגמרים יורדים מקווי-המילוי, נסרקים, ונכנסים למחסן-AS/RS המנוהל-MFS. רכבי-AGV מסיעים משטחים בין אזור-המילוי לאזור-המשלוח. הכול — מתכנון-המלאי ועד פקודת-המנוף — רץ ב-EWM אחד, ללא WCS חיצוני.",
      navHe: [
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Goods Issue Process ► ... (general EWM activation)",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Master Data ► Define Warehouse Number Control",
        "SCM Extended Warehouse Management ► Extended Warehouse Management ► Material Flow System (MFS) ► Master Data",
      ],
      tables: ["/SCWM/TWAREHOUSE", "/SCWM/ORDIM_O", "/SCWM/HUHDR", "/SCWM/LAGP"],
      tcodes: ["/SCWM/MON", "/SCWM/PSC1", "/SCWM/MFS", "/SCWM/RSRC"],
      fiori: ["F4090", "W0001"],
      configHe: [
        "Warehouse Number — הגדר את ה-Warehouse כ-EWM-managed; אוטומציה דורשת EWM (לא WM קלאסי).",
        "Storage Type — סמן את אזור-ה-AS/RS כ-storage type אוטומטי עם Putaway/Removal strategies מתאימות.",
        "Resource Management — הפעל Resources/Resource Types כדי לייצג ציוד-אוטומציה במערכת.",
        "MFS Activation — הפעל את רכיב ה-Material Flow System ל-Warehouse Number הרלוונטי.",
      ],
      flow: [
        { he: "משטח יורד מהייצור", code: "Inbound", note: "Handling Unit נוצר" },
        { he: "EWM יוצר Warehouse Task", code: "/SCWM/ORDIM_O" },
        { he: "ניתוב לבקר", code: "MFS / WCS / Robotics", note: "לפי ארכיטקטורה" },
        { he: "ביצוע פיזי בציוד", code: "PLC / AGV / Robot" },
        { he: "אישור WT חזרה ל-EWM", code: "WT-confirm" },
      ],
      mistakesHe: [
        "בחירת WCS חיצוני כברירת-מחדל כשה-MFS המובנה היה חוסך שכבת-אינטגרציה שלמה.",
        "אי-תכנון Resource Management — בלי משאבים אין למפות ציוד-אוטומציה לפקודות.",
        "הנחה ש-WM קלאסי תומך באוטומציה ברמת-MFS — הוא אינו; נדרש EWM.",
      ],
      troubleshootHe: [
        "ציוד לא מקבל פקודות ➔ ודא שה-Warehouse הוא EWM-managed וש-MFS/WCS מופעל ומקושר.",
        "WT נוצר אך לא מבוצע ➔ בדוק ניתוב ל-bin אוטומטי ושה-storage type מסומן אוטומטי.",
        "נראות-מלאי חלקית ➔ ודא שאישורי-הציוד חוזרים ומאשרים את ה-WT (סגירת-לולאה).",
      ],
      bestPracticeHe: [
        "מפה תחילה את כל הציוד הפיזי ל-Resources/Storage Types לפני הגדרת לוגיקת-ניתוב.",
        "העדף EWM Embedded + MFS לאינטגרציה ישירה במקום שרשרת WCS חיצונית, אלא אם הספק מחייב.",
        "תכנן closed-loop confirmation — כל פקודה מקבלת אישור-מצב מהציוד.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש ארכיטקטורות בקרת-האוטומציה ב-EWM?", aHe: "WCS חיצוני (מערכת-צד-שלישי שולטת בציוד), MFS (EWM עצמו משמש Warehouse Control Unit ומדבר ישירות עם PLC), ו-SAP Warehouse Robotics (תזמור רובוטים אוטונומיים)." },
        { qHe: "מדוע MFS מקטין מורכבות?", aHe: "הוא מבטל שכבת-WCS חיצונית — תכנון-המלאי ובקרת-הציוד יושבים באותה מערכת EWM, עם latency נמוך ומקור-אמת אחד." },
      ],
      takeawaysHe: [
        "אוטומציה ב-EWM מנוהלת דרך MFS, WCS חיצוני, או Warehouse Robotics.",
        "MFS מאפשר ל-EWM לדבר ישירות עם PLC — בלי מתווך.",
        "אוטומציה דורשת EWM (לא WM קלאסי) ומיפוי Resources/Storage Types.",
      ],
      relatedHe: [
        { labelHe: "EWM · Material Flow System (6.2)", href: "/library/wm/chapter-06/#sub-6.2" },
        { labelHe: "EWM · SAP Warehouse Robotics (6.3)", href: "/library/wm/chapter-06/#sub-6.3" },
      ],
    },
    // ============================================================ 6.2
    {
      id: "6.2",
      titleHe: "מערכת זרימת-חומרים (Material Flow System)",
      titleEn: "Material Flow System",
      execHe:
        "Material Flow System (MFS) הוא רכיב ב-EWM ההופך אותו ל-Warehouse Control Unit: הוא שולט ישירות בציוד-אוטומציה (מסועים, מנופי-AS/RS, מעליות, שערים) על-ידי החלפת טלגרמות (Telegrams) עם בקרי-PLC על-גבי TCP/IP. MFS ממיר Warehouse Tasks לפקודות-ציוד, עוקב אחר מיקום ה-Handling Unit על-המסוע בכל רגע (דרך Communication Points / Programmable Logic Controllers), ומחזיר אישורי-ביצוע ל-EWM — הכול ללא מערכת-WCS חיצונית.",
      beginnerHe:
        "MFS הוא 'המתורגמן' של EWM מול המכונות. ה-PLC הוא מחשב-בקרה זעיר שמפעיל מנוע-מסוע או מנוף. MFS ו-PLC מחליפים הודעות קצרות וקבועות-מבנה שנקראות 'טלגרמות' — כמו מברקים: 'משטח הגיע לנקודה 5', 'שלח אותו לתא 12'. כך EWM יודע בכל שנייה איפה כל משטח על המסוע ולאן להפנות אותו.",
      consultantHe:
        "מבנה MFS: Communication Point (CP) = נקודה פיזית על-המסוע שבה מתקבלת/נשלחת החלטת-ניתוב; Communication Channel = החיבור ל-PLC; Telegram Structure = הגדרת-השדות של כל הודעה; Telegram Type (sensor, action, acknowledgement, life/heartbeat). EWM מנהל את ה-HU על-המסוע כ-'Conveyor Segment' ומקבל החלטת-ניתוב ב-CP. Resource = ייצוג המנוף/הרכב. הגדרות ב-/SCWM/MFS ו-PSC (Programmable Logic Controller). MFS תומך ב-Storage Control (Layout-Oriented + Process-Oriented) לתזמור רב-שלבי. נקודה קריטית: Telegram failure ו-heartbeat — ניטור החיבור חיוני לזמינות.",
      purposeHe:
        "המטרה: לתת ל-EWM בקרה דטרמיניסטית ובזמן-אמת על ציוד-האוטומציה, עם latency נמוך ומקור-אמת אחד, במקום להסתמך על WCS חיצוני. כך כל החלטת-ניתוב מתקבלת על-בסיס נתוני-המלאי המעודכנים ביותר.",
      processExampleHe:
        "HU נכנס למסוע ועובר חיישן בנקודת-קליטה — ה-PLC שולח טלגרמת-sensor ל-MFS: 'HU בנקודת-קליטה 1'. MFS מזהה את ה-WT הפתוח, מחליט יעד, ומשיב טלגרמת-action: 'נתב לתת-מסוע 3, יעד תא 12-04'. בכל Communication Point נוסף החיישן מדווח והמערכת מאשרת. בהגעה לתא, מנוף-ה-AS/RS (Resource) מקבל פקודה, מאחסן, ומחזיר acknowledgement; EWM מאשר את ה-WT.",
      cbcHe:
        "ב-CBC מסוע מוביל משטחי-בקבוקים מקו-המילוי אל מבואת-המחסן האוטומטי. ה-PLC מדווח ל-MFS על כל משטח שעובר חיישן; MFS מנתב אוטומטית לפי סוג-המוצר ותפוסת-התאים, ושולח פקודה למנוף-AS/RS לאחסון. טלגרמת-heartbeat נשלחת כל שנייה כדי לוודא שהקו 'חי'.",
      navHe: [
        "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS) ► Master Data ► Maintain Communication Channel",
        "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS) ► Telegram ► Define Telegram Structure",
        "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS) ► Programmable Logic Controller (PLC) ► Define PLC",
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Communication Point ► Define Communication Points",
      ],
      tables: ["/SCWM/TMFS_PLC", "/SCWM/TMFS_TGT", "/SCWM/TMFS_CP", "/SCWM/ORDIM_O", "/SCWM/RSRC"],
      tcodes: ["/SCWM/MFS", "/SCWM/PSC1", "/SCWM/MON", "/SCWM/MFS_TEL"],
      fiori: ["F4090"],
      configHe: [
        "Communication Channel — הגדר חיבור TCP/IP ל-PLC (IP/Port, Socket-mode), כולל heartbeat/life-telegram.",
        "Telegram Structure — הגדר את שדות-ההודעה (HU ID, source CP, target, status) לכל Telegram Type.",
        "Programmable Logic Controller (PLC) — שייך CPs ו-Resources ל-PLC; קבע מיפוי-טלגרמות.",
        "Communication Points — הגדר נקודות-ניתוב פיזיות על-המסוע ולוגיקת-ההחלטה בכל נקודה.",
        "Storage Control — Layout-Oriented + Process-Oriented לתזמור מעבר רב-שלבי דרך נקודות-ביניים.",
      ],
      flow: [
        { he: "HU עובר חיישן", code: "sensor telegram", note: "PLC→MFS: HU בנקודה X" },
        { he: "MFS מחליט יעד", code: "Communication Point" },
        { he: "פקודת-ניתוב", code: "action telegram", note: "MFS→PLC" },
        { he: "ביצוע במנוע/מנוף", code: "PLC / Resource" },
        { he: "אישור-ביצוע", code: "acknowledgement", note: "PLC→MFS" },
        { he: "אישור WT ב-EWM", code: "WT-confirm" },
      ],
      masterDataHe: [
        "Communication Point = נקודת-החלטה פיזית על-המסוע · Communication Channel = החיבור ל-PLC.",
        "Resource = ייצוג מנוף-AS/RS / רכב · Telegram Type = sensor / action / acknowledgement / life.",
      ],
      mistakesHe: [
        "Telegram Structure לא-תואם למבנה שה-PLC שולח ➔ הודעות-זבל וכשלי-פענוח.",
        "אי-הגדרת life/heartbeat telegram ➔ נפילת-חיבור לא מזוהה בזמן.",
        "Communication Points חסרים בנקודות-החלטה ➔ HU 'נתקע' בלי יעד.",
      ],
      troubleshootHe: [
        "HU נעצר על-המסוע ➔ חסר Communication Point או החלטת-ניתוב נכשלה ב-CP.",
        "טלגרמות לא מפוענחות ➔ Telegram Structure לא-תואם לבקר; השווה byte-by-byte.",
        "החיבור 'מת' ➔ heartbeat לא מתקבל; בדוק Socket/IP/Port ב-Communication Channel.",
        "WT לא מאושר ➔ acknowledgement telegram לא חזר מה-Resource/PLC.",
      ],
      bestPracticeHe: [
        "נטר את ה-heartbeat ואת תור-הטלגרמות ב-/SCWM/MFS באופן רציף.",
        "תעד את כל מבני-הטלגרמות מול הספק וגרסת-ה-PLC לפני Go-Live.",
        "השתמש ב-Storage Control לתזמור-מעבר רב-שלבי במקום לוגיקה קשיחה ב-PLC.",
        "בצע simulation/replay של טלגרמות בבדיקות לפני חיבור-ציוד אמיתי.",
      ],
      interviewHe: [
        { qHe: "מהי טלגרמה (Telegram) ב-MFS?", aHe: "הודעה קצרה וקבועת-מבנה המוחלפת בין MFS ל-PLC על TCP/IP — סוגיה: sensor (חיישן דיווח), action (פקודה), acknowledgement (אישור) ו-life/heartbeat (חיבור-חי)." },
        { qHe: "מהו Communication Point?", aHe: "נקודה פיזית על-המסוע שבה MFS מקבל דיווח-חיישן ומחליט את יעד-הניתוב של ה-HU." },
        { qHe: "מה ההבדל בין MFS ל-WCS חיצוני?", aHe: "MFS הוא EWM עצמו כ-Warehouse Control Unit המדבר ישירות עם PLC; WCS חיצוני הוא מערכת-צד-שלישי בין EWM לציוד." },
      ],
      takeawaysHe: [
        "MFS הופך את EWM ל-Warehouse Control Unit מול ה-PLC.",
        "התקשורת = טלגרמות (sensor/action/ack/life) על TCP/IP.",
        "Communication Points הם נקודות-ההחלטה על-המסוע; ניטור heartbeat חיוני.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת אוטומציה (6.1)", href: "/library/wm/chapter-06/#sub-6.1" },
        { labelHe: "EWM · אינטגרציה AS/RS עם MFS (6.4.1)", href: "/library/wm/chapter-06/#sub-6.4.1" },
      ],
      children: [
        {
          id: "6.2.1",
          titleHe: "תהליך קליטה (Inbound)",
          titleEn: "Inbound Process",
          execHe:
            "בתהליך-הקליטה האוטומטי, סחורה נכנסת למסוע, MFS עוקב אחריה דרך נקודות-תקשורת, ו-EWM מנתב אותה אל מחסן-ה-AS/RS לאחסון אוטומטי — ללא מגע-יד. ה-Warehouse Task נסגר רק כשמנוף-ה-AS/RS מאשר שהמשטח הונח בתא.",
          beginnerHe:
            "קליטה = הכנסת-סחורה. משטח נכנס למסוע, חיישנים עוקבים, MFS מחליט לאיזה תא, ומנוף אוטומטי מניח אותו שם. הכול קורה לבד — אתה רק שם את המשטח על המסוע.",
          consultantHe:
            "זרימה: Goods Receipt → HU creation → Putaway WT → ניתוב דרך CPs → AS/RS putaway. ה-Putaway strategy (למשל empty-bin / fixed-bin) קובעת את התא; MFS מתרגם ל-target-coordinates עבור המנוף. Storage Control (Layout-Oriented) יכול לכפות מעבר דרך נקודות-ביניים (למשל תחנת-בקרת-מימדים) לפני האחסון הסופי.",
          purposeHe:
            "להכניס סחורה למחסן האוטומטי במהירות, בדיוק ובלי כוח-אדם, תוך עדכון-מלאי בזמן-אמת.",
          processExampleHe:
            "משטח מתקבל בקבלה (Goods Receipt), נוצר HU; EWM יוצר Putaway WT לתא פנוי. ה-HU נכנס למסוע, עובר תחנת-בדיקת-מימדים (CP), ו-MFS מנתב אותו אל מנוף-ה-AS/RS שמאחסן בתא ומחזיר אישור.",
          cbcHe:
            "ב-CBC משטחי-בקבוקים מקו-המילוי מתקבלים אוטומטית: סורק-ברקוד יוצר HU, תחנת-מימדים מאמתת גובה-משטח, ו-AS/RS מאחסן בתא-גובה הפנוי הראשון. משטח חורג-מימדים מנותב למסלול-דחייה.",
          navHe: [
            "SCM EWM ► Extended Warehouse Management ► Goods Receipt Process ► Inbound Delivery",
            "SCM EWM ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Storage Control",
          ],
          tables: ["/SCWM/ORDIM_O", "/SCWM/HUHDR", "/SCWM/LAGP"],
          tcodes: ["/SCWM/PRDI", "/SCWM/MON", "/SCWM/MFS"],
          fiori: ["F4090"],
          configHe: [
            "Putaway Strategy — קבע אסטרטגיית-אחסון (empty-bin / fixed-bin) לאזור-ה-AS/RS.",
            "Layout-Oriented Storage Control — כפה מעבר דרך תחנת-מימדים/בקרה לפני אחסון סופי.",
          ],
          mistakesHe: [
            "אי-בדיקת-מימדים לפני אחסון ➔ משטח חורג נתקע בתוך מחסן-ה-AS/RS.",
            "Putaway strategy שגוי ➔ ניתוב לתא לא-מתאים לגובה/משקל.",
          ],
          troubleshootHe: [
            "משטח לא מאוחסן ➔ אין תא פנוי מתאים לפי האסטרטגיה, או בדיקת-מימדים נכשלה.",
            "HU 'תקוע' בתחנת-בקרה ➔ Communication Point לא קיבל אישור-מעבר.",
          ],
          bestPracticeHe: [
            "מקם תחנת-בדיקת-מימדים לפני הכניסה ל-AS/RS כדי למנוע תקיעות-פנים.",
            "הגדר מסלול-דחייה למשטחים חורגים כחלק מ-Storage Control.",
          ],
          interviewHe: [
            { qHe: "מה קובע את תא-האחסון בקליטה אוטומטית?", aHe: "ה-Putaway strategy של ה-storage type; MFS מתרגם את התא שנבחר לקואורדינטות עבור מנוף-ה-AS/RS." },
          ],
          takeawaysHe: [
            "קליטה אוטומטית: GR → HU → Putaway WT → ניתוב CP → אחסון AS/RS.",
            "בדיקת-מימדים לפני האחסון מונעת תקיעות בתוך המחסן.",
          ],
        },
        {
          id: "6.2.2",
          titleHe: "תהליך משלוח (Outbound)",
          titleEn: "Outbound Process",
          execHe:
            "בתהליך-המשלוח האוטומטי, EWM יוצר Stock-Removal WT, מנוף-ה-AS/RS שולף את המשטח מהתא, ו-MFS מנתב אותו דרך המסועים אל אזור-המשלוח / שער-העמסה — הכול אוטומטי ובזמן-אמת לפי הזמנת-המכירה.",
          beginnerHe:
            "משלוח = הוצאת-סחורה. EWM מחליט איזה משטח נחוץ, מנוף מוציא אותו מהתא, והמסוע מוביל אותו אל הדלת שממנה ייצא. אתה רק טוען על המשאית.",
          consultantHe:
            "זרימה: Outbound Delivery → Stock-Removal WT → AS/RS retrieval → ניתוב CP → Staging/Goods Issue. ה-Stock-Removal strategy (FIFO/LIFO, SLED/shelf-life לאצוות) קובע איזה HU נשלף. MFS מקבל פקודת-retrieval עם קואורדינטות-התא ומנתב את ה-HU שנשלף אל ה-staging area. Wave/2-step picking יכול לקבץ פקודות לאופטימיזציה.",
          purposeHe:
            "להוציא את הסחורה הנכונה (לפי FIFO/shelf-life), במהירות ובדיוק, אל אזור-המשלוח — בלי משיכה ידנית.",
          processExampleHe:
            "Outbound Delivery נוצרת ל-200 משטחים; EWM מייצר Stock-Removal WTs לפי FIFO. מנוף-ה-AS/RS שולף כל משטח, MFS מנתב במסוע אל שער-ההעמסה, ובסיום מתבצע Goods Issue.",
          cbcHe:
            "ב-CBC הזמנת-לקוח גדולה נפרסת ל-Wave; AS/RS שולף משטחי-בקבוקים לפי FIFO (תאריך-ייצור מוקדם קודם), והמסוע מוביל אל שער-המשאית הנכון. אצוות עם shelf-life קצר נשלפות תחילה.",
          navHe: [
            "SCM EWM ► Extended Warehouse Management ► Goods Issue Process ► Outbound Delivery",
            "SCM EWM ► Extended Warehouse Management ► Cross-Process Settings ► Wave Management",
          ],
          tables: ["/SCWM/ORDIM_O", "/SCWM/HUHDR", "/SCWM/WAVEHDR"],
          tcodes: ["/SCWM/PRDO", "/SCWM/MON", "/SCWM/WAVE"],
          fiori: ["F4090"],
          configHe: [
            "Stock-Removal Strategy — FIFO/LIFO/SLED לבחירת ה-HU שיישלף מ-AS/RS.",
            "Wave Management — קבץ פקודות-משיכה לאופטימיזציה של תנועות-המנוף.",
          ],
          mistakesHe: [
            "אסטרטגיית-משיכה שגויה ➔ מלאי ישן נשאר ומשטחים פגי-תוקף נתקעים בתאים.",
            "אי-שימוש ב-Wave ➔ תנועות-מנוף לא-אופטימליות ותפוקה נמוכה.",
          ],
          troubleshootHe: [
            "משטח לא נשלף ➔ אין HU תואם לאסטרטגיה, או המנוף (Resource) חסום/תפוס.",
            "HU נשלף אך לא הגיע לשער ➔ ניתוב CP במסוע נכשל או יעד-staging שגוי.",
          ],
          bestPracticeHe: [
            "אכוף FIFO/shelf-life לאצוות-מזון כדי למנוע פג-תוקף בתאים.",
            "השתמש ב-Wave כדי לקבץ משיכות ולמזער נסיעות-מנוף.",
          ],
          interviewHe: [
            { qHe: "מה קובע איזה משטח נשלף מ-AS/RS במשלוח?", aHe: "ה-Stock-Removal strategy (FIFO/LIFO/SLED); MFS מקבל את קואורדינטות-התא ושולח פקודת-retrieval למנוף." },
          ],
          takeawaysHe: [
            "משלוח אוטומטי: Outbound Delivery → Removal WT → שליפת AS/RS → ניתוב CP → GI.",
            "אסטרטגיית-משיכה (FIFO/SLED) קריטית למוצרי-מזון.",
          ],
        },
      ],
    },
    // ============================================================ 6.3
    {
      id: "6.3",
      titleHe: "רובוטיקת מחסן של SAP (SAP Warehouse Robotics)",
      titleEn: "SAP Warehouse Robotics",
      execHe:
        "SAP Warehouse Robotics הוא שירות-ענן (על SAP BTP) המתזמר רובוטים אוטונומיים ניידים (AMR) של ספקים שונים ומחבר אותם ל-EWM דרך ממשק אחיד. במקום אינטגרציה נקודתית לכל יצרן-רובוט, EWM מעביר משימות לשכבת-Robotics אחת שמתרגמת לפרוטוקול הספק — תקן VDA 5050 — ומחזירה אישורי-ביצוע. כך ניתן להפעיל צי-רובוטים מעורב (multi-vendor) תחת בקרת-EWM.",
      beginnerHe:
        "רובוטים ניידים הם 'עגלות חכמות' שזזות לבד במחסן, אוספות ומובילות סחורה. הבעיה: לכל יצרן שפה משלו. SAP Warehouse Robotics הוא 'מתורגמן אוניברסלי' בענן — EWM אומר 'הבא את ההזמנה הזו', והשירות מדבר עם כל רובוט בשפתו. כך אפשר לערבב רובוטים מיצרנים שונים.",
      consultantHe:
        "SAP Warehouse Robotics רץ על BTP ומתקשר עם EWM דרך Warehouse Order/Task assignment ועם הרובוטים דרך VDA 5050 (תקן-תקשורת AMR פתוח על MQTT). EWM מטפל בלוגיקת-המלאי ובבחירת-המשימות; שכבת-ה-Robotics אחראית ל-fleet orchestration, traffic management ו-mission dispatch. ההבחנה מ-MFS: MFS שולט בציוד-קבוע (מסועים/מנופים) דרך טלגרמות-PLC, ואילו Robotics מתזמר ציוד-נייד-אוטונומי דרך ענן. שני הרכיבים יכולים לדור בכפיפה אחת.",
      purposeHe:
        "לאפשר הפעלת צי-רובוטים רב-ספקים תחת EWM אחד, להפחית עלות-אינטגרציה (תקן VDA 5050 במקום ממשק-לכל-יצרן), ולהוסיף גמישות-אוטומציה בלי לשפץ את המחסן.",
      processExampleHe:
        "הזמנת-ליקוט נוצרת ב-EWM. במקום עובד, EWM שולח את ה-Warehouse Order ל-SAP Warehouse Robotics; השירות מקצה רובוט פנוי, שולח לו mission ב-VDA 5050 'סע למיקום 12, אסוף HU, הבא ל-packing'. הרובוט מבצע, מאשר, וה-WO נסגר.",
      cbcHe:
        "ב-CBC רובוטים ניידים מסיעים משטחי-בקבוקים מאזור-ה-staging של ה-AS/RS אל קווי-ההעמסה. צי מעורב (שני יצרנים) מנוהל דרך SAP Warehouse Robotics, כך ש-EWM אינו צריך לדעת מי-יצרן-איזה-רובוט.",
      navHe: [
        "SAP BTP ► SAP Warehouse Robotics ► Robot Master / Fleet Configuration",
        "SCM EWM ► Extended Warehouse Management ► Integration ► Warehouse Robotics ► Define Robotics Communication",
      ],
      tables: ["/SCWM/ORDIM_O", "/SCWM/WHO", "/SCWM/RSRC"],
      tcodes: ["/SCWM/MON", "/SCWM/WO", "/SCWM/RSRC"],
      fiori: ["F4090"],
      configHe: [
        "Robotics Communication — הגדר את החיבור מ-EWM אל שירות SAP Warehouse Robotics ב-BTP.",
        "Resource/Resource Type — ייצג כל רובוט (או קבוצת-רובוטים) כ-Resource ב-EWM להקצאת-משימות.",
        "VDA 5050 Mapping — מיפוי ה-Warehouse Order/Task ל-mission בפרוטוקול הרובוט.",
      ],
      flow: [
        { he: "EWM יוצר Warehouse Order", code: "/SCWM/WHO" },
        { he: "שליחה ל-Robotics בענן", code: "SAP Warehouse Robotics" },
        { he: "הקצאת רובוט ו-mission", code: "VDA 5050", note: "על MQTT" },
        { he: "ביצוע אוטונומי", code: "AMR" },
        { he: "אישור וסגירת WO", code: "WT-confirm" },
      ],
      mistakesHe: [
        "ניסיון אינטגרציה נקודתית לכל יצרן-רובוט במקום שכבת-Robotics אחידה.",
        "אי-ייצוג הרובוטים כ-Resources ב-EWM ➔ אין למי להקצות משימות.",
        "התעלמות מ-traffic management ➔ רובוטים נחסמים זה את זה במסדרונות.",
      ],
      troubleshootHe: [
        "רובוט לא מקבל משימה ➔ חיבור-BTP נפל או ה-Resource לא-זמין/לא-ממופה.",
        "רובוט תקוע ➔ בעיית fleet/traffic management בשכבת-Robotics, לא ב-EWM.",
        "WO לא נסגר ➔ אישור-ה-mission (VDA 5050) לא חזר מהרובוט.",
      ],
      bestPracticeHe: [
        "השתמש ב-VDA 5050 כדי לשמור על אפשרות multi-vendor ולהימנע מ-vendor lock-in.",
        "השאר את לוגיקת-המלאי ב-EWM ואת ה-fleet orchestration בשכבת-Robotics — הפרדת-אחריות.",
        "תכנן מראש traffic-management ומסדרונות לרובוטים ניידים.",
      ],
      interviewHe: [
        { qHe: "מהו SAP Warehouse Robotics?", aHe: "שירות-ענן (BTP) המתזמר רובוטים אוטונומיים רב-ספקים ומחבר אותם ל-EWM דרך ממשק אחיד, באמצעות תקן VDA 5050." },
        { qHe: "מה ההבדל בין Warehouse Robotics ל-MFS?", aHe: "MFS שולט בציוד-קבוע (מסועים/מנופי-AS/RS) דרך טלגרמות-PLC; Robotics מתזמר ציוד-נייד-אוטונומי (AMR) דרך הענן ב-VDA 5050. שניהם יכולים לדור יחד תחת EWM." },
      ],
      takeawaysHe: [
        "SAP Warehouse Robotics = תזמור רובוטים רב-ספקים מהענן.",
        "פרוטוקול אחיד = VDA 5050 (על MQTT) → ללא vendor lock-in.",
        "EWM שומר על לוגיקת-המלאי; Robotics אחראי ל-fleet orchestration.",
      ],
      relatedHe: [
        { labelHe: "EWM · רכבים אוטונומיים AGV (6.5)", href: "/library/wm/chapter-06/#sub-6.5" },
        { labelHe: "EWM · Material Flow System (6.2)", href: "/library/wm/chapter-06/#sub-6.2" },
      ],
    },
    // ============================================================ 6.4
    {
      id: "6.4",
      titleHe: "מחסני מדפים אוטומטיים (AS/RS)",
      titleEn: "Automated Storage and Retrieval Systems",
      execHe:
        "Automated Storage and Retrieval System (AS/RS) הוא מחסן-מדפים אוטומטי — בדרך-כלל high-bay — שבו מנופי-מעבר (Stacker Cranes) מאחסנים ושולפים משטחים אוטומטית בתאי-גובה צרים. EWM מנהל את המלאי ברמת-ה-bin, ובקרת-המנוף מתבצעת דרך MFS (טלגרמות-PLC) או דרך AGV מזין. AS/RS מאפשר צפיפות-אחסון גבוהה, דיוק-מלאי כמעט-מושלם ותפוקה רציפה — אך דורש תכנון-Layout, Storage Control ובקרת-Resource מדויקים.",
      beginnerHe:
        "AS/RS = 'מחסן-רובוטי' עם מדפים גבוהים מאוד וסמטאות צרות שבהן מנוף נע אוטומטית, לוקח משטח ומכניס אותו לתא — בלי מלגזה ובלי נהג. EWM זוכר בדיוק איפה כל משטח, והמנוף עושה את העבודה הפיזית. כך מאחסנים הרבה מאוד סחורה בשטח קטן.",
      consultantHe:
        "AS/RS ב-EWM = storage type עם bin-coordinates תלת-ממדיים (aisle/level/depth). המנוף הוא Resource; הבקרה דרך MFS (Communication Channel ל-PLC של המנוף) או דרך AGV. Storage Control (Layout-Oriented) מנתב דרך נקודות-העברה (Pick-up/Drop-off — P&D points) בין המסוע למנוף. שיקולי-תכנון: single/double-deep racking, throughput-per-aisle, מדיניות-replenishment. דיוק תלוי בכיול-קואורדינטות ובסנכרון MFS↔PLC. מתאים לנפחים גבוהים, אחידי-מימדים (משטחים).",
      purposeHe:
        "למקסם ניצול-נפח (גובה), דיוק-מלאי ותפוקה רציפה 24/7, ולהפחית כוח-אדם ונזקי-טיפול — במיוחד למוצרים אחידי-מימדים בנפחים גבוהים.",
      processExampleHe:
        "משטח נכנס לנקודת-P&D בתחתית-הסמטה; MFS מורה למנוף לאסוף, לעלות לגובה הנכון ולהכניס לתא. בשליפה, ה-WT מורה למנוף להוציא מהתא ולהניח בנקודת-P&D של המסוע-היוצא. EWM מעדכן את ה-bin בזמן-אמת.",
      cbcHe:
        "ב-CBC מחסן-ה-high-bay מאחסן עשרות-אלפי משטחי-בקבוקים בסמטאות צרות; מנופי-מעבר מאחסנים ושולפים אוטומטית. תפוקה רציפה תומכת בקווי-מילוי הפועלים 24/7, וצפיפות-הגובה חוסכת שטח-רצפה יקר.",
      navHe: [
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Define Storage Type",
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Storage Bins ► Define Storage Bin Structure",
        "SCM EWM ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Storage Control",
      ],
      tables: ["/SCWM/LAGP", "/SCWM/T331", "/SCWM/RSRC", "/SCWM/ORDIM_O"],
      tcodes: ["/SCWM/LS01", "/SCWM/MON", "/SCWM/MFS", "/SCWM/RSRC"],
      fiori: ["F4090", "W0001"],
      configHe: [
        "Storage Type — הגדר את אזור-ה-AS/RS עם bin-coordinates תלת-ממדיים ואסטרטגיות-אחסון/משיכה.",
        "Storage Bin Structure — הגדר מבנה-תאים (aisle/level/depth) ו-Pick-up/Drop-off points.",
        "Layout-Oriented Storage Control — נתב דרך נקודות-P&D בין המסוע למנוף.",
        "Resource Management — ייצג כל מנוף-מעבר כ-Resource לבקרת-עומס והקצאה.",
      ],
      flow: [
        { he: "HU בנקודת-P&D", code: "Pick-up/Drop-off" },
        { he: "פקודת-מנוף", code: "MFS / AGV", note: "WT→Resource" },
        { he: "אחסון/שליפה בתא", code: "Stacker Crane" },
        { he: "עדכון bin ב-EWM", code: "/SCWM/LAGP" },
      ],
      masterDataHe: [
        "Storage Bin = תא תלת-ממדי (aisle/level/depth) · Storage Type = אזור-ה-AS/RS.",
        "Resource = מנוף-מעבר (Stacker Crane) · P&D Point = נקודת-העברה מסוע↔מנוף.",
      ],
      mistakesHe: [
        "Bin-coordinates לא-מכוילים מול הציוד ➔ המנוף פונה לתא שגוי.",
        "אי-הגדרת P&D points ➔ אין נקודת-מעבר מוגדרת בין המסוע למנוף.",
        "ערבוב מימדי-משטח באותו storage type ➔ תאים לא-מתאימים ותקיעות.",
      ],
      troubleshootHe: [
        "המנוף פונה לתא שגוי ➔ כיול bin-coordinates / סנכרון MFS↔PLC שגוי.",
        "משטח לא נכנס/נשלף ➔ Resource (מנוף) חסום, או P&D point לא-זמין.",
        "תפוקה נמוכה ➔ throughput-per-aisle נמוך; שקול double-deep / חלוקת-עומס.",
      ],
      bestPracticeHe: [
        "כייל ובדוק bin-coordinates מול הציוד הפיזי לפני Go-Live.",
        "שמור אחידות-מימדים בכל storage type של AS/RS.",
        "תכנן replenishment ו-throughput-per-aisle בהתאם לקצב-הייצור.",
      ],
      interviewHe: [
        { qHe: "מהו AS/RS?", aHe: "מחסן-מדפים אוטומטי (לרוב high-bay) שבו מנופי-מעבר מאחסנים ושולפים משטחים אוטומטית בתאי-גובה; EWM מנהל ברמת-bin והבקרה דרך MFS או AGV." },
        { qHe: "מהי נקודת-P&D?", aHe: "Pick-up/Drop-off point — נקודת-ההעברה הפיזית של ה-HU בין המסוע למנוף-המעבר." },
      ],
      takeawaysHe: [
        "AS/RS = high-bay אוטומטי עם צפיפות-אחסון ודיוק גבוהים.",
        "מנופי-מעבר = Resources; בקרה דרך MFS או AGV.",
        "כיול bin-coordinates ונקודות-P&D הם קריטיים.",
      ],
      relatedHe: [
        { labelHe: "EWM · Material Flow System (6.2)", href: "/library/wm/chapter-06/#sub-6.2" },
        { labelHe: "EWM · רכבים אוטונומיים AGV (6.5)", href: "/library/wm/chapter-06/#sub-6.5" },
      ],
      children: [
        {
          id: "6.4.1",
          titleHe: "אינטגרציה עם מערכת זרימת-חומרים (MFS)",
          titleEn: "Integration with a Material Flow System",
          execHe:
            "כאשר AS/RS משולב עם MFS, EWM שולט במנופי-המעבר ובמסועים ישירות דרך טלגרמות-PLC — בלי WCS חיצוני. ה-Warehouse Task מתורגם לקואורדינטות-תא, נשלח כטלגרמת-action ל-PLC של המנוף, וה-acknowledgement סוגר את ה-WT.",
          beginnerHe:
            "כאן ה-AS/RS וה-MFS עובדים יחד: EWM מדבר ישירות עם מנוף-המחסן בעזרת טלגרמות. אין צורך במערכת-ביניים — SAP בעצמו אומר למנוף 'לך לתא 12, קח את המשטח'.",
          consultantHe:
            "MFS מגדיר Communication Channel ל-PLC של ה-Stacker Crane; ה-WT עובר ל-MFS, מתורגם ל-target-coordinates (aisle/level/depth), ונשלח כטלגרמת-action. החיישנים על-המסוע מדווחים מיקום דרך CPs, והמנוף מחזיר acknowledgement. Layout-Oriented Storage Control מתזמר את המעבר מהמסוע לנקודת-P&D ואל המנוף. ניטור heartbeat של ה-PLC חיוני לזמינות-המחסן.",
          purposeHe:
            "לתת ל-EWM בקרה ישירה, דטרמיניסטית ובזמן-אמת על ה-AS/RS, עם latency נמוך ומקור-אמת אחד — בלי תלות ב-WCS חיצוני.",
          processExampleHe:
            "WT-אחסון נוצר; MFS מתרגם לתא 12-04-08 ושולח טלגרמת-action ל-PLC של המנוף. המנוף עולה, מכניס את המשטח, ושולח acknowledgement; EWM מאשר את ה-WT ומעדכן את ה-bin.",
          cbcHe:
            "ב-CBC המנופים במחסן-ה-high-bay מנוהלים ישירות מ-EWM דרך MFS: כל פקודת-אחסון/שליפה היא טלגרמה ל-PLC של המנוף, וה-heartbeat מנוטר כל שנייה כדי לוודא שהמחסן זמין.",
          navHe: [
            "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS) ► Master Data ► Maintain Communication Channel",
            "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS) ► Programmable Logic Controller (PLC)",
          ],
          tables: ["/SCWM/TMFS_PLC", "/SCWM/TMFS_TGT", "/SCWM/RSRC", "/SCWM/ORDIM_O"],
          tcodes: ["/SCWM/MFS", "/SCWM/PSC1", "/SCWM/MON"],
          fiori: ["F4090"],
          configHe: [
            "Communication Channel — חבר את ה-PLC של ה-Stacker Crane (TCP/IP, heartbeat).",
            "Telegram Mapping — מפה את פקודת-ה-WT לטלגרמת-action עם קואורדינטות-תא.",
          ],
          mistakesHe: [
            "מיפוי-קואורדינטות שגוי בטלגרמה ➔ המנוף פונה לתא לא-נכון.",
            "אי-ניטור heartbeat של ה-PLC ➔ נפילת-מנוף לא מזוהה בזמן.",
          ],
          troubleshootHe: [
            "המנוף לא מבצע ➔ טלגרמת-action לא נשלחה/לא-תואמת ל-PLC.",
            "WT לא נסגר ➔ acknowledgement לא חזר מהמנוף.",
          ],
          bestPracticeHe: [
            "נטר heartbeat ותור-טלגרמות של כל PLC של מנוף ברציפות.",
            "ודא התאמת Telegram Structure לקואורדינטות-התא של ה-AS/RS.",
          ],
          interviewHe: [
            { qHe: "כיצד EWM שולט ב-AS/RS דרך MFS?", aHe: "ה-WT מתורגם לקואורדינטות-תא, נשלח כטלגרמת-action ל-PLC של המנוף דרך Communication Channel, וה-acknowledgement סוגר את ה-WT — בלי WCS חיצוני." },
          ],
          takeawaysHe: [
            "AS/RS + MFS = בקרה ישירה של EWM על המנוף דרך טלגרמות-PLC.",
            "ה-WT הופך לטלגרמת-action עם קואורדינטות-תא.",
            "ניטור heartbeat = זמינות-המחסן.",
          ],
          relatedHe: [
            { labelHe: "EWM · Material Flow System (6.2)", href: "/library/wm/chapter-06/#sub-6.2" },
          ],
        },
        {
          id: "6.4.2",
          titleHe: "אינטגרציה עם רכבים אוטונומיים (AGV)",
          titleEn: "Integration with Automated Guided Vehicles",
          execHe:
            "כאשר AS/RS משולב עם AGV, רכבים אוטונומיים מזינים ומפנים משטחים אל/מנקודות-ה-P&D של המחסן-האוטומטי, ובכך מחברים את ה-AS/RS לשאר-המחסן בלי מסוע-קבוע. EWM מקצה משימות-הסעה לרכבים ומתאם בין שליפת-המנוף להובלת-הרכב.",
          beginnerHe:
            "במקום מסוע קבוע שמוביל משטחים אל המחסן-הרובוטי, אפשר להשתמש ב-AGV — עגלות-רובוט נעות — שמביאות ולוקחות משטחים מנקודת-המעבר של ה-AS/RS. כך המחסן-האוטומטי מחובר לשאר-המתקן בגמישות.",
          consultantHe:
            "ה-AGV (Resource) מקבל Warehouse Task להסעה מנקודת-מקור אל P&D point של ה-AS/RS (ולהיפך). תיאום קריטי: ה-AGV חייב להגיע בדיוק כשהמנוף מוכן (handshake בנקודת-ה-P&D). הבקרה דרך AGV-control-system (לעיתים VDA 5050) או דרך MFS אם הרכב מנוהל-טלגרמות. EWM מסנכרן את ה-WT של ה-AGV עם ה-WT של המנוף כדי למנוע 'משטח-יתום' בנקודת-המעבר.",
          purposeHe:
            "לחבר את ה-AS/RS לשאר-המחסן בגמישות (בלי תשתית-מסוע יקרה), ולאפשר ניתוב-דינמי של משטחים בין אזורים.",
          processExampleHe:
            "WT-שליפה מוציא משטח מ-AS/RS לנקודת-P&D; EWM יוצר WT-הסעה ל-AGV: 'קח מ-P&D-3 ל-staging-7'. ה-AGV מגיע, מבצע handshake, נוסע, ומאשר. אם ה-AGV מאחר, המנוף ממתין כדי למנוע גלישה.",
          cbcHe:
            "ב-CBC רכבי-AGV מסיעים משטחי-בקבוקים בין נקודות-ה-P&D של מחסן-ה-high-bay לבין אזור-המשלוח וקווי-ההעמסה, ומתאמים מול המנופים כדי שכל משטח יעבור חלק.",
          navHe: [
            "SCM EWM ► Extended Warehouse Management ► Master Data ► Resource Management ► Define Resource Types",
            "SCM EWM ► Extended Warehouse Management ► Integration ► AGV / Robotics Communication",
          ],
          tables: ["/SCWM/RSRC", "/SCWM/ORDIM_O", "/SCWM/LAGP"],
          tcodes: ["/SCWM/RSRC", "/SCWM/MON", "/SCWM/MFS"],
          fiori: ["F4090"],
          configHe: [
            "Resource Type — הגדר את ה-AGV כ-Resource Type עם יכולות-הסעה.",
            "P&D Handshake — הגדר את נקודות-המעבר וסנכרון ה-WT בין AGV למנוף.",
          ],
          mistakesHe: [
            "אי-סנכרון WT של AGV עם WT של המנוף ➔ 'משטח-יתום' בנקודת-המעבר.",
            "אי-הגדרת handshake ב-P&D ➔ גלישת-משטח או התנגשות.",
          ],
          troubleshootHe: [
            "משטח נשאר בנקודת-P&D ➔ ה-AGV לא קיבל WT-הסעה או אינו-זמין.",
            "התנגשות/המתנה ארוכה ➔ handshake/traffic-management בין AGV למנוף לא-מתואם.",
          ],
          bestPracticeHe: [
            "סנכרן תמיד את WT-ההסעה של ה-AGV עם WT-השליפה של המנוף.",
            "הגדר handshake ברור בנקודת-P&D למניעת משטחים-יתומים.",
          ],
          interviewHe: [
            { qHe: "כיצד AGV מתחבר ל-AS/RS?", aHe: "ה-AGV מקבל WT-הסעה אל/מנקודת-P&D של המחסן-האוטומטי; EWM מסנכרן את ה-WT של ה-AGV עם זה של המנוף ומבצע handshake בנקודת-המעבר." },
          ],
          takeawaysHe: [
            "AGV מזין ומפנה משטחים מנקודות-ה-P&D של ה-AS/RS.",
            "סנכרון WT (AGV↔מנוף) ו-handshake מונעים משטחים-יתומים.",
            "מחבר את ה-AS/RS לשאר-המחסן בלי מסוע-קבוע.",
          ],
          relatedHe: [
            { labelHe: "EWM · רכבים אוטונומיים AGV (6.5)", href: "/library/wm/chapter-06/#sub-6.5" },
          ],
        },
      ],
    },
    // ============================================================ 6.5
    {
      id: "6.5",
      titleHe: "רכבים אוטונומיים (Automated Guided Vehicles)",
      titleEn: "Automated Guided Vehicles",
      execHe:
        "Automated Guided Vehicle (AGV) הוא רכב-הסעה אוטונומי הנע במסלולים מוגדרים במחסן (מגנט/לייזר/ניווט-טבעי) ומבצע משימות-הובלה של משטחים בין אזורים. ב-EWM ה-AGV מיוצג כ-Resource ומקבל Warehouse Tasks; הבקרה דרך AGV-control-system חיצוני, דרך VDA 5050, או דרך MFS אם הרכב מנוהל-טלגרמות. AGV מחליף נסיעות-מלגזה ידניות בהובלה רציפה, בטוחה ומדויקת.",
      beginnerHe:
        "AGV הוא 'מלגזה ללא נהג' — רכב שזז לבד במסלולים קבועים ומעביר משטחים מנקודה לנקודה. EWM אומר לו מה להסיע ולאן, והוא עושה זאת שוב ושוב, יום ולילה, בלי לטעות-בדרך ובלי תאונות.",
      consultantHe:
        "ב-EWM ה-AGV = Resource (Resource Type עם יכולת-הסעה); ה-WT מוקצה אליו דרך Resource Management ו-Warehouse Order. ההבחנה מ-AMR/Robotics: AGV נע במסלולים-מוגדרים (fixed path) ולרוב מנוהל ע\"י AGV-control-system ייעודי; AMR נע חופשי ומנותב דינמית. EWM יכול לתקשר עם ה-AGV דרך MFS (טלגרמות) או דרך SAP Warehouse Robotics / VDA 5050. נושאים קריטיים: traffic management, battery/charging management, ו-handshake בנקודות-מסירה. ה-AGV הוא לרוב המזין של ה-AS/RS (ראה 6.4.2).",
      purposeHe:
        "להחליף הובלת-מלגזה ידנית בהסעה אוטומטית רציפה ובטוחה, להפחית תאונות ועלויות-כוח-אדם, ולאפשר זרימת-חומרים 24/7 בין אזורי-המחסן.",
      processExampleHe:
        "EWM יוצר WT-הסעה: 'משטח מ-staging-2 ל-dock-5'. Resource Management מקצה AGV פנוי; ה-AGV נוסע במסלולו, מבצע handshake בכל קצה, ומאשר. אם הסוללה נמוכה, ה-AGV-control-system מנתב אותו לעמדת-טעינה ומשחרר אחר.",
      cbcHe:
        "ב-CBC צי-AGV מסיע משטחי-בקבוקים מקווי-המילוי אל מבואת-ה-AS/RS, ומאזור-ה-staging אל שערי-המשלוח. הרכבים פועלים סביב-השעון לתמיכה בייצור רציף, עם ניהול-טעינה אוטומטי בין-משימות.",
      navHe: [
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Resource Management ► Define Resource Types",
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Resource Management ► Define Resources",
        "SCM EWM ► Extended Warehouse Management ► Integration ► AGV Communication (MFS / Robotics)",
      ],
      tables: ["/SCWM/RSRC", "/SCWM/ORDIM_O", "/SCWM/WHO", "/SCWM/LAGP"],
      tcodes: ["/SCWM/RSRC", "/SCWM/MON", "/SCWM/WO", "/SCWM/MFS"],
      fiori: ["F4090"],
      configHe: [
        "Resource Type — הגדר AGV עם יכולות-הסעה ומדיניות-הקצאה.",
        "Resource — צור Resource לכל רכב לבקרת-זמינות ועומס.",
        "AGV Communication — חבר דרך MFS (טלגרמות) או SAP Warehouse Robotics / VDA 5050.",
        "Charging/Traffic — הגדר מדיניות-טעינה ו-traffic-management בשכבת-הבקרה.",
      ],
      flow: [
        { he: "EWM יוצר WT-הסעה", code: "/SCWM/ORDIM_O" },
        { he: "הקצאה ל-AGV", code: "Resource Mgmt" },
        { he: "נסיעה במסלול + handshake", code: "AGV-control / MFS" },
        { he: "מסירה ואישור", code: "WT-confirm" },
        { he: "טעינה בין-משימות", code: "Charging", note: "battery mgmt" },
      ],
      masterDataHe: [
        "Resource = רכב-AGV בודד · Resource Type = קטגוריית-רכב עם יכולות.",
        "WT-הסעה = משימת-הובלה בין נקודות · P&D Point = נקודת-מסירה/קליטה.",
      ],
      mistakesHe: [
        "אי-ייצוג ה-AGV כ-Resource ➔ EWM לא יכול להקצות לו משימות.",
        "התעלמות מ-battery management ➔ רכבים 'מתים' באמצע-משימה.",
        "אי-הגדרת traffic-management ➔ חסימות והתנגשויות במסדרונות.",
      ],
      troubleshootHe: [
        "AGV לא מקבל משימה ➔ ה-Resource לא-זמין / לא-ממופה, או חיבור-בקרה נפל.",
        "AGV נעצר באמצע ➔ סוללה נמוכה (charging mgmt) או חסימת-traffic.",
        "משטח לא נמסר ➔ handshake בנקודת-המסירה לא הושלם.",
      ],
      bestPracticeHe: [
        "ייצג כל רכב כ-Resource ונהל זמינות/עומס דרך Resource Management.",
        "תכנן battery/charging ו-traffic-management מראש לזמינות רציפה.",
        "השתמש ב-VDA 5050 / Robotics לציי רב-ספקים; ב-MFS לרכבים מנוהלי-טלגרמות.",
      ],
      interviewHe: [
        { qHe: "מהו AGV וכיצד הוא מיוצג ב-EWM?", aHe: "רכב-הסעה אוטונומי הנע במסלולים-מוגדרים; ב-EWM הוא Resource המקבל Warehouse Tasks, ומבוקר דרך AGV-control-system, MFS או VDA 5050." },
        { qHe: "מה ההבדל בין AGV ל-AMR?", aHe: "AGV נע במסלולים-קבועים (fixed path) ומנוהל לרוב ע\"י בקר ייעודי; AMR (Autonomous Mobile Robot) נע חופשי ומנותב דינמית, ומתוזמר לרוב דרך SAP Warehouse Robotics." },
      ],
      takeawaysHe: [
        "AGV = רכב-הסעה אוטונומי במסלולים-מוגדרים, מיוצג כ-Resource ב-EWM.",
        "בקרה דרך MFS, AGV-control-system או VDA 5050.",
        "battery/charging ו-traffic-management הם קריטיים לזמינות רציפה.",
      ],
      relatedHe: [
        { labelHe: "EWM · אינטגרציה AGV עם AS/RS (6.4.2)", href: "/library/wm/chapter-06/#sub-6.4.2" },
        { labelHe: "EWM · SAP Warehouse Robotics (6.3)", href: "/library/wm/chapter-06/#sub-6.3" },
      ],
    },
    // ============================================================ 6.6
    {
      id: "6.6",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג כיצד SAP EWM שולט באוטומציית-מחסן ישירות, ללא תלות במערכות-ביניים. למדנו שלוש ארכיטקטורות-בקרה — MFS לציוד-קבוע דרך טלגרמות-PLC, SAP Warehouse Robotics לרובוטים אוטונומיים בענן, ו-AGV/AS/RS כציוד-הביצוע — וכיצד כולן מתואמות תחת מקור-אמת אחד: ה-Warehouse Task. התוצאה היא מחסן רציף, מדויק ובעל-נראות-מלאה מהזמנה ועד מיקום-מדף.",
      beginnerHe:
        "סיכמנו את כל דרכי-האוטומציה ב-EWM: MFS שמדבר עם מכונות דרך 'מברקים' (טלגרמות), רובוטים שמתוזמרים מהענן, מחסן-מדפים אוטומטי (AS/RS) עם מנופים, ועגלות-רובוט (AGV) שמסיעות משטחים. הרעיון המרכזי: EWM אחד מנהל גם את המלאי וגם את המכונות.",
      consultantHe:
        "מבט-על: MFS = EWM-as-Warehouse-Control-Unit (Communication Points, Telegrams, PLC); Robotics = orchestration בענן ב-VDA 5050; AS/RS = storage type עם bin-coordinates ו-Resources (מנופים); AGV = Resource-הסעה במסלולים-מוגדרים. ההחלטה בין MFS ל-WCS חיצוני ל-Robotics נגזרת מ-throughput, TCO, וזמינות-IT. עקרונות-מפתח לכל מימוש: מיפוי-Resources מלא, closed-loop confirmation, ניטור-heartbeat, ו-Storage Control לתזמור רב-שלבי.",
      purposeHe:
        "לקבע את התמונה-הכוללת: לדעת איזו טכנולוגיית-אוטומציה לבחור, כיצד EWM שולט בה, ואילו אובייקטי-תצורה (Resources, CPs, Telegrams, Storage Control) דרושים — כדי לתכנן מימוש-אוטומציה שלם.",
      processExampleHe:
        "מקצה-לקצה ב-CBC: משטח מקו-מילוי → AGV מסיע למבואה → MFS מנתב במסוע → מנוף-AS/RS מאחסן בתא; בהזמנה → AS/RS שולף (FIFO) → AGV/מסוע לשער → Goods Issue. כל שלב מנוהל ע\"י WT אחד וסגירת-לולאה.",
      cbcHe:
        "ב-CBC מחסן-המשטחים האוטומטי מאחד AS/RS high-bay, MFS, ו-AGV תחת EWM אחד — תומך בייצור-משקאות רציף 24/7, עם דיוק-מלאי גבוה ושטח-רצפה מינימלי.",
      navHe: [
        "SCM EWM ► Extended Warehouse Management ► Material Flow System (MFS)",
        "SCM EWM ► Extended Warehouse Management ► Master Data ► Resource Management",
        "SCM EWM ► Extended Warehouse Management ► Cross-Process Settings ► Warehouse Task ► Define Storage Control",
      ],
      tables: ["/SCWM/ORDIM_O", "/SCWM/RSRC", "/SCWM/LAGP", "/SCWM/TMFS_PLC"],
      tcodes: ["/SCWM/MFS", "/SCWM/RSRC", "/SCWM/MON", "/SCWM/WO"],
      fiori: ["F4090", "W0001"],
      configHe: [
        "בחר ארכיטקטורה: MFS (ציוד-קבוע) · Robotics (AMR בענן) · WCS חיצוני (ספק-מאסטר).",
        "מפה את כל הציוד ל-Resources / Storage Types לפני לוגיקת-ניתוב.",
        "הגדר Storage Control לתזמור-מעבר רב-שלבי בין מסועים, מנופים ורכבים.",
        "אכוף closed-loop confirmation וניטור-heartbeat לזמינות.",
      ],
      mistakesHe: [
        "בחירת-ארכיטקטורה לא-מתאימה ל-throughput/TCO ➔ עלות-יתר או צוואר-בקבוק.",
        "מימוש ללא closed-loop confirmation ➔ נראות-מלאי שגויה.",
        "הזנחת-ניטור (heartbeat/traffic/battery) ➔ נפילות לא-צפויות.",
      ],
      troubleshootHe: [
        "תקלת-אוטומציה כללית ➔ בדוק שכבה-אחר-שכבה: WT → ניתוב (MFS/Robotics) → Resource → אישור.",
        "נראות-מלאי שגויה ➔ אישורי-ציוד לא נסגרים; ודא closed-loop.",
      ],
      bestPracticeHe: [
        "בחר את הארכיטקטורה לפי throughput, TCO וזמינות-IT — לא לפי 'מה שהספק מציע'.",
        "השאר את לוגיקת-המלאי ב-EWM; שכבות-הבקרה אחראיות לתזמור-הציוד.",
        "תכנן ניטור (heartbeat/traffic/battery) ו-closed-loop confirmation כחלק מהליבה.",
      ],
      interviewHe: [
        { qHe: "כיצד בוחרים בין MFS, Robotics ו-WCS חיצוני?", aHe: "לפי throughput, Total Cost of Ownership וזמינות-IT: MFS לבקרה-ישירה דטרמיניסטית, Robotics לרובוטים-ניידים רב-ספקים בענן, ו-WCS חיצוני כשהספק מספק בקר-מאסטר." },
        { qHe: "מהו ה'דבק' המאחד את כל ארכיטקטורות-האוטומציה ב-EWM?", aHe: "ה-Warehouse Task — כל ציוד (מנוף, מסוע, AGV, רובוט) מקבל ומאשר WTs, כך ש-EWM נשאר מקור-האמת היחיד עם closed-loop confirmation." },
      ],
      takeawaysHe: [
        "שלוש ארכיטקטורות: MFS (טלגרמות-PLC), Robotics (ענן/VDA 5050), WCS חיצוני.",
        "AS/RS ו-AGV הם ציוד-הביצוע; EWM מתאם דרך Warehouse Tasks.",
        "עקרונות-ליבה: מיפוי-Resources, closed-loop confirmation, ניטור-heartbeat, Storage Control.",
      ],
      relatedHe: [
        { labelHe: "EWM · סקירת אוטומציה (6.1)", href: "/library/wm/chapter-06/#sub-6.1" },
        { labelHe: "EWM · Material Flow System (6.2)", href: "/library/wm/chapter-06/#sub-6.2" },
      ],
    },
  ],
};
