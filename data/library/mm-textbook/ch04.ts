// ===== MM Digital Textbook — Chapter 4 (Master Data) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly (ids + order); SAP identifiers verbatim EN.
// CBC context: Coca-Cola bottling material masters (ROH concentrate/packaging)
// + suppliers as Business Partners.
import type { TextbookChapter } from "./types";

export const CH4: TextbookChapter = {
  n: 4,
  titleHe: "נתוני אב",
  titleEn: "Master Data",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לנתוני-האב של רכש ומקורות-אספקה (Sourcing & Procurement) ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הנושאים: אב-החומר וקבוצות-חומר, ניהול-אצוות וסיריאליזציה, ומודל ה-Business Partner שבו ספקים מנוהלים כ-Business Partners עם CVI. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 4.1
    {
      id: "4.1",
      titleHe: "אבות-חומר וקבוצות-חומר",
      titleEn: "Material Masters and Material Groups",
      execHe:
        "אב-החומר הוא רשומת-העל של כל פריט הנרכש, מאוחסן או נצרך בארגון, וקבוצת-החומר היא הסיווג הרוחבי המקבץ חומרים דומים לצורכי רכש, דיווח ובקרה. בהקשר של Sourcing & Procurement אב-החומר מגדיר כיצד החומר נרכש (Procurement Type), מי הספק, מהי יחידת-ההזמנה, וכיצד הוא מוערך כספית. זהו הנכס הקריטי ביותר בנתוני-האב של MM — כל מסמך-רכש, כל קביעת-מקור וכל תנועת-מלאי נשענים עליו.",
      beginnerHe:
        "דמיין כרטיס-זהות לכל מוצר שהארגון קונה או מחזיק. הכרטיס מחולק ל'תצוגות' (Views) — כל תצוגה שייכת למחלקה אחרת: Basic Data (כללי), Purchasing (רכש), MRP (תכנון), Accounting (כספים), Storage (אחסון). אותו מספר-חומר נושא את כל המידע, אך כל מחלקה רואה ומתחזקת רק את התצוגה שלה. קבוצת-החומר היא 'תווית' שמקבצת חומרים דומים — למשל 'חומרי-אריזה' — כדי לדווח ולקנות אותם יחד.",
      consultantHe:
        "אב-החומר מאוחסן בכמה רמות: MARA (רמת-לקוח, כלל-ארגוני), MARC (רמת-מפעל), MARD (רמת-מחסן), MBEW (רמת-הערכה), MVKE (מכירות) ו-MLAN (מס). תצוגת ה-Purchasing מוסיפה Purchasing Group, Order Unit ו-Material Group (MARA-MATKL). Material Type (MTART) קובע מסכים, טווחי-מספרים, סוגי-רכש מותרים ו-Price Control. ב-S/4HANA מספר-החומר הורחב ל-40 תווים (SAP Note 2267140), ו-Lean Services הוסיף Product Type SERV לשירותים. קבוצת-החומר מקושרת ל-Valuation Class ול-Account Determination, ולכן בחירתה משפיעה ישירות על הנהלת-החשבונות.",
      purposeHe:
        "המטרה: לתת לרכש את כל הפרמטרים לרכוש נכון — מה (תיאור, יחידה), מאיפה (Purchasing Group/Source), כמה (Order Unit/EOQ) ובאיזו עלות (Valuation). קבוצת-החומר מאפשרת ניתוח-הוצאות (Spend Analysis), בקרת-תקציב והקצאת-חשבון אוטומטית.",
      processExampleHe:
        "רכש מתחיל מ-Purchase Requisition לחומר: המערכת קוראת את אב-החומר, שולפת Material Group, Purchasing Group ו-Order Unit, מבצעת Source Determination (Info Record/Contract), ויוצרת Purchase Order. ב-Goods Receipt תנועת-המלאי מעדכנת את MARD ואת MBEW לפי ה-Valuation Class הנגזר מקבוצת-החומר.",
      cbcHe:
        "ב-CBC: התרכיז (Concentrate) והסוכר = ROH מנוהלי-אצווה; בקבוקים, פקקים, תוויות וקרטונים = ROH/VERP חומרי-אריזה. כל ROH נדרש לתצוגות Basic + Purchasing + MRP + Accounting. קבוצות-חומר: 'Concentrate', 'Sugar', 'Packaging-Glass', 'Packaging-PET' — מאפשרות ניתוח-הוצאות מול הספקים ובקרת-עלות-חומר למשקה.",
      navHe: [
        "Logistics – General ► Material Master ► Basic Settings ► Material Types ► Define Attributes of Material Types (OMS2)",
        "Logistics – General ► Material Master ► Settings for Key Fields ► Define Material Groups (OMSF)",
        "Logistics – General ► Material Master ► Field Selection ► Assign Fields to Field Selection Groups (OMSR)",
      ],
      tables: ["MARA", "MARC", "MARD", "MBEW", "MAKT", "T023", "T023T"],
      tcodes: ["MM01", "MM02", "MM03", "MM17", "MM50", "OMSF", "OMS2"],
      fiori: ["F1602A", "F0247", "F1422"],
      configHe: [
        "Material Type (OMS2): קובע אילו תצוגות נפתחות, Number Range (פנימי/חיצוני), Procurement Type מותר ו-Price Control (S/V).",
        "Material Groups (OMSF/T023): הגדרת מפתח קבוצת-חומר + תיאור; בסיס לסיווג-רכש ולהקצאת-חשבון.",
        "Field Selection (OMSR): לכל שדה — חובה / אופציונלי / לקריאה / מוסתר, לפי Field Selection Group.",
        "Purchasing Value Key + Purchasing Group: ברירות-מחדל לתזכורות, סטיות-כמות ויחס-רכש בתצוגת ה-Purchasing.",
      ],
      flow: [
        { he: "בחירת Material Type", code: "OMS2", note: "תצוגות + טווח-מספרים" },
        { he: "יצירת אב-חומר", code: "MM01" },
        { he: "תצוגת Purchasing + Material Group", code: "MATKL" },
        { he: "תצוגת Accounting", code: "MBEW", note: "Valuation Class" },
        { he: "זמין לרכש", code: "ME21N" },
      ],
      masterDataHe: [
        "MARA-MATKL = Material Group · MARA-MTART = Material Type · MARA-MEINS = Base UoM.",
        "MARC-EKGRP = Purchasing Group · MARC-BESKZ = Procurement Type · MARC-DISMM = MRP Type.",
        "MBEW-BKLAS = Valuation Class · MBEW-VPRSV = Price Control (S/V) · MBEW-STPRS/VERPR = Standard/Moving price.",
      ],
      mistakesHe: [
        "יצירת חומר ללא תצוגת Purchasing/Accounting במפעל הרלוונטי — אי-אפשר ליצור עבורו PO.",
        "קבוצת-חומר שגויה — הקצאת-חשבון ו-Spend Analysis מתעוותים.",
        "Price Control V לחומר-גלם בעל מחיר-תקן מתוכנן — סטיות-עלות לא מנותחות.",
        "שימוש ב-Material Type לא-נכון — חוסם סוגי-רכש או פותח תצוגות מיותרות.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור PO לחומר ➔ חסרה תצוגת Purchasing במפעל או חסר Purchasing Group.",
        "שגיאת-הקצאה ב-GR/IR ➔ Valuation Class חסר או לא תואם את קבוצת-החומר.",
        "החומר לא נמצא בחיפוש ➔ חסר במפעל/מחסן (MM50) או תצוגה לא הורחבה (MM01 extension).",
        "מחיר שגוי בהזמנה ➔ Info Record או Price Control לא תואמים.",
      ],
      bestPracticeHe: [
        "השתמש ב-Mass Maintenance (MM17) להזנת Purchasing Group/Material Group אחידים.",
        "תקנן עץ קבוצות-חומר היררכי ומתואם עם FI (Valuation Classes).",
        "הגדר Material Type Strategy אחידה לכל סוג-חומר (ROH/HALB/FERT/VERP/SERV).",
        "בנה Checklist לפתיחת-חומר-נרכש: Basic + Purchasing + MRP + Accounting — אל תסמוך על זיכרון.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין MARA ל-MARC באב-החומר?", aHe: "MARA = נתונים ברמת-לקוח (כלל-ארגוני, למשל UoM ו-Material Group); MARC = נתונים ברמת-מפעל (Purchasing Group, Procurement Type, MRP). אותו חומר יכול להירכש שונה בכל מפעל דרך MARC." },
        { qHe: "מה תפקיד קבוצת-החומר (Material Group)?", aHe: "סיווג-רוחב המקבץ חומרים דומים לצורכי רכש, Spend Analysis והקצאת-חשבון; השדה MARA-MATKL." },
        { qHe: "כיצד נקבעת ההקצאה החשבונאית לחומר?", aHe: "דרך Valuation Class (MBEW-BKLAS) ב-Account Determination (OBYC), המושפע מ-Material Type ומקבוצת-החומר." },
      ],
      takeawaysHe: [
        "אב-החומר הוא נקודת-הפתיחה של כל מימוש MM — שגיאה כאן מתפשטת לכל מקום.",
        "כמה רמות: MARA (לקוח), MARC (מפעל), MBEW (הערכה); תצוגת Purchasing מאפשרת רכש.",
        "קבוצת-החומר מחברת רכש ל-FI דרך Valuation Class.",
        "תצוגות Purchasing + Accounting הן תנאי-סף ליצירת PO.",
      ],
      relatedHe: [
        { labelHe: "MM · רשומת-מידע ספק", href: "/library/mm/object/EINA/" },
        { labelHe: "אובייקט · MARA", href: "/library/mm/object/MARA/" },
        { labelHe: "אובייקט · T023", href: "/library/mm/object/T023/" },
      ],
      children: [
        {
          id: "4.1.1",
          titleHe: "הפעלת שדה באב-החומר",
          titleEn: "Activating a Material Master Field",
          execHe:
            "הפעלת שדה משמעה הפיכת שדה מסוים באב-החומר לחובה, אופציונלי, לקריאה-בלבד או מוסתר, באמצעות Field Selection. זו השליטה המרכזית באיכות-הנתונים — מבטיחה שמשתמשים ימלאו שדות-חיוניים ולא יראו שדות לא-רלוונטיים.",
          beginnerHe:
            "לא כל שדה צריך להופיע לכל אחד. 'הפעלת שדה' אומרת ל-SAP אם שדה מסוים יהיה חובה (אי-אפשר לשמור בלעדיו), אופציונלי, לקריאה או מוסתר. כך הטופס מותאם לכל סוג-חומר ולכל תפקיד.",
          consultantHe:
            "השליטה היא דרך Field Selection Groups: כל שדה משויך לקבוצה (OMSR), ולכל קבוצה נקבע סטטוס (חובה/אופציונלי/הצגה/הסתרה) המושפע מ-Field References המקושרים ל-Material Type, ל-Transaction (Create/Change/Display) ול-Industry Sector. הסטטוס המחמיר מבין המקורות מנצח. ב-S/4HANA אפשר גם דרך Customizing של MDG/Fiori.",
          purposeHe:
            "לאכוף איכות-נתונים: שדות קריטיים לרכש (Purchasing Group, Material Group) חובה, שדות לא-רלוונטיים מוסתרים — פחות שגיאות, פחות עומס-מסך.",
          processExampleHe:
            "מנהל-נתונים קובע ש-Purchasing Group יהיה חובה ל-ROH. מרגע זה, יצירת ROH ב-MM01 ללא Purchasing Group נחסמת בהודעת-שגיאה, ומבטיחה רכש תקין.",
          cbcHe:
            "ב-CBC שדה Batch Management Indicator הופך לחובה עבור ROH (תרכיז/סוכר) דרך Field Selection, כדי שאף חומר-גלם לא ייפתח בלי ניהול-אצווה.",
          navHe: [
            "Logistics – General ► Material Master ► Field Selection ► Assign Fields to Field Selection Groups (OMSR)",
            "Logistics – General ► Material Master ► Field Selection ► Maintain Field Selection for Data Screens (OMS9)",
          ],
          tables: ["T130F", "T130M", "T162"],
          tcodes: ["OMSR", "OMS9", "MM01"],
          fiori: ["F1602A"],
          configHe: [
            "ב-OMSR שייך את השדה ל-Field Selection Group.",
            "ב-OMS9 קבע לכל קבוצה סטטוס (Required/Optional/Display/Hide) לכל Field Reference.",
            "הסטטוס המחמיר מבין כל ה-References (Material Type/Transaction/Sector) הוא הקובע.",
          ],
          mistakesHe: [
            "הסתרת שדה-חובה לתהליך במורד-הזרם — נתונים חסרים מתגלים מאוחר.",
            "הגדרת חובה גורפת — חוסם יצירת-חומר לתרחישים שאינם זקוקים לשדה.",
          ],
          troubleshootHe: [
            "שדה אינו מופיע ב-MM01 ➔ מוגדר Hide באחד ה-Field References.",
            "שדה-חובה לא נאכף ➔ Field Selection Group או Reference שגויים.",
          ],
          bestPracticeHe: [
            "מפה שדות-חובה לפי Material Type לפני ההגדרה.",
            "השתמש בסטטוס המחמיר במודע — בדוק את כל ה-References המשפיעים.",
          ],
          interviewHe: [
            { qHe: "כיצד הופכים שדה באב-החומר לחובה?", aHe: "דרך Field Selection: משייכים את השדה ל-Field Selection Group (OMSR) וקובעים סטטוס Required ל-Field Reference המתאים (OMS9)." },
            { qHe: "מה קורה כשמקורות שונים נותנים סטטוס שונה לשדה?", aHe: "הסטטוס המחמיר מנצח (Hide גובר על Display, שגובר על Required, שגובר על Optional בסדר-העדיפויות של SAP)." },
          ],
          takeawaysHe: [
            "Field Selection שולט ב-חובה/אופציונלי/הצגה/הסתרה לכל שדה.",
            "מבוסס Field Selection Groups + Field References.",
            "הסטטוס המחמיר הוא הקובע.",
          ],
        },
        {
          id: "4.1.2",
          titleHe: "יצירת אב-חומר",
          titleEn: "Creating a Material Master",
          execHe:
            "יצירת אב-חומר היא הפעולה התשתיתית שמכניסה פריט חדש למערכת. היא נעשית ב-MM01 דרך בחירת Material Type, Industry Sector ומילוי התצוגות הרלוונטיות. ללא אב-חומר תקין אי-אפשר לרכוש, לאחסן או לנהל מלאי.",
          beginnerHe:
            "כדי שהמערכת תכיר מוצר חדש, פותחים לו אב-חומר ב-MM01. בוחרים את סוג-החומר (ROH/FERT…), את הענף, ואז ממלאים מסך אחר מסך: שם, יחידה, נתוני-רכש, נתוני-מלאי, נתוני-כספים. בסוף מקבלים מספר-חומר.",
          consultantHe:
            "ב-MM01 בוחרים MTART + Industry Sector, ואז Organizational Levels (Plant, Storage Location, Purchasing Org, Sales Org) הקובעים לאילו רמות יישמרו הנתונים. הנתונים מתפצלים: MARA (לקוח), MARC (מפעל), MARD (מחסן), MBEW (הערכה). אפשר ליצור עם Reference (העתקה מחומר קיים), עם MM01 לפתיחת-תצוגה נוספת (Extension), ובכמות דרך Migration Cockpit/MM17.",
          purposeHe:
            "לייצר רשומת-אב עקבית שכל התהליכים (רכש, מלאי, תכנון, כספים) נשענים עליה, ברמות-הארגון הנכונות.",
          processExampleHe:
            "מנהל-נתונים פותח ROH חדש: בוחר Material Type ROH, מפעל, מחסן ו-Purchasing Org; ממלא Basic (שם, UoM), Purchasing (Purchasing Group, Material Group), MRP ו-Accounting (Valuation Class, מחיר). מתקבל מספר-חומר זמין לרכש מיידי.",
          cbcHe:
            "ב-CBC פתיחת בקבוק-PET חדש: Material Type ROH/VERP, Material Group 'Packaging-PET', יחידת-בסיס EA, Batch Management כבוי לאריזה אך מופעל לתרכיז. נוצר ברמת-המפעל של מתקן-המילוי.",
          navHe: [
            "Logistics ► Materials Management ► Material Master ► Material ► Create (General) ► Immediately (MM01)",
            "Logistics – General ► Material Master ► Basic Settings ► Define Output Format of Material Number",
          ],
          tables: ["MARA", "MARC", "MARD", "MBEW", "MAKT"],
          tcodes: ["MM01", "MM02", "MMSC", "MM17", "MM50"],
          fiori: ["F1602A", "F1422"],
          configHe: [
            "Material Type ו-Industry Sector קובעים את התצוגות ואת השדות הנפתחים.",
            "Organizational Levels (Plant/SLoc/Purch.Org) קובעים את רמות-השמירה.",
            "Number Range (פנימי/חיצוני) נגזר מ-Material Type (OMS2).",
          ],
          masterDataHe: [
            "MARA = רמת-לקוח · MARC = מפעל · MARD = מחסן · MBEW = הערכה.",
            "Create with Reference מעתיק תצוגות מחומר קיים לקיצור-הזנה.",
          ],
          mistakesHe: [
            "שכחת רמת-ארגון (מחסן/Purchasing Org) — תצוגה חסרה לתהליך.",
            "בחירת Material Type שגוי שאי-אפשר לשנות בקלות אחר-כך.",
          ],
          troubleshootHe: [
            "תצוגה חסרה לחומר קיים ➔ הרחב דרך MM01 (Extend) או MMSC למחסן.",
            "לא ניתן לשמור ➔ שדה-חובה לפי Field Selection ריק.",
          ],
          bestPracticeHe: [
            "השתמש ב-Create with Reference לעקביות בין חומרים דומים.",
            "הזן בכמות גדולה דרך Migration Cockpit/MM17, לא ידנית.",
          ],
          interviewHe: [
            { qHe: "מהן רמות-הארגון בעת יצירת אב-חומר?", aHe: "Plant, Storage Location, Purchasing Org ו-Sales Org — הן קובעות לאילו רמות (MARC/MARD/…) יישמרו הנתונים." },
            { qHe: "כיצד מוסיפים תצוגה לחומר קיים?", aHe: "דרך MM01 במצב Extension — בוחרים את החומר הקיים ואת התצוגה/רמת-הארגון החדשה." },
          ],
          takeawaysHe: [
            "MM01 = יצירת אב-חומר; בחירת Material Type + Industry Sector ראשונה.",
            "רמות-הארגון קובעות אילו טבלאות מתמלאות.",
            "Create with Reference וטעינה-המונית מקצרים הזנה.",
          ],
        },
        {
          id: "4.1.3",
          titleHe: "יצירת קבוצת-חומר",
          titleEn: "Creating a Material Group",
          execHe:
            "קבוצת-חומר היא מפתח-סיווג המקבץ חומרים בעלי מאפיינים דומים לצורכי רכש, דיווח והקצאת-חשבון. יצירתה היא הגדרת-Customizing פשוטה (T023) אך בעלת השפעה רוחבית על ניתוח-הוצאות ובקרת-עלות.",
          beginnerHe:
            "קבוצת-חומר היא 'תווית-קיבוץ'. במקום להסתכל על אלף חומרים בנפרד, מקבצים אותם — 'חומרי-ניקוי', 'אריזה', 'תרכיז' — וכך אפשר לדווח ולקנות לפי קבוצה. יוצרים אותה פעם אחת ב-Customizing ואז משייכים חומרים אליה.",
          consultantHe:
            "קבוצת-חומר נשמרת ב-T023 (מפתח) ו-T023T (תיאור), ומשויכת לחומר דרך MARA-MATKL. היא משמשת: Source Determination ללא חומר (PR/PO עם Material Group בלבד), Account Assignment דרך Valuation Class group, ו-Purchasing Info System לניתוח-הוצאות. אפשר לקשר Material Group ל-Valuation Class (OMQW) להקצאה אוטומטית של חשבון-G/L.",
          purposeHe:
            "לאפשר ניתוח-הוצאות (Spend), בקרת-תקציב, קביעת-מקור ברמת-קבוצה והקצאת-חשבון עקבית — בלי לתחזק כל חומר בנפרד.",
          processExampleHe:
            "רכש-שירות ללא אב-חומר נוצר עם Material Group 'Cleaning-Services'; ה-Account Determination גוזר חשבון-G/L מהקבוצה, וה-Spend Report מקבץ את כל ההוצאה תחת אותה קבוצה.",
          cbcHe:
            "ב-CBC נפתחות קבוצות 'Concentrate', 'Sugar', 'Packaging-Glass', 'Packaging-PET', 'CO2'. הן מאפשרות לנתח עלות-חומר למשקה ולנהל מו\"מ-ספקים לפי קטגוריה.",
          navHe: [
            "Logistics – General ► Material Master ► Settings for Key Fields ► Define Material Groups (OMSF)",
            "Materials Management ► Purchasing ► Material Master ► Entry Aids for Items Without a Material Master (OMSF)",
          ],
          tables: ["T023", "T023T", "MARA"],
          tcodes: ["OMSF", "MM01", "MM02"],
          fiori: ["F1602A"],
          configHe: [
            "ב-OMSF/T023 הגדר מפתח קבוצת-חומר + תיאור (T023T) רב-שפתי.",
            "שייך את הקבוצה לחומרים דרך MARA-MATKL בתצוגת ה-Purchasing.",
            "אופציונלי: קשר Material Group ל-Valuation Class (OMQW) להקצאת-חשבון בפריטים ללא חומר.",
          ],
          mistakesHe: [
            "ריבוי קבוצות-חומר מיותרות — מקשה דיווח ובחירה.",
            "שינוי שיוך קבוצת-חומר בדיעבד — מעוות דוחות-הוצאות היסטוריים.",
          ],
          troubleshootHe: [
            "Spend Report לא מקבץ נכון ➔ חומרים משויכים לקבוצה שגויה (MATKL).",
            "אין הקצאת-חשבון לפריט-ללא-חומר ➔ חסר קישור Material Group↔Valuation Class.",
          ],
          bestPracticeHe: [
            "בנה היררכיית-קבוצות מתואמת עם Category Management וה-FI.",
            "תעד את הגיון-החלוקה ושמור על מספר קבוצות מנוהל.",
          ],
          interviewHe: [
            { qHe: "באילו טבלאות נשמרת קבוצת-חומר?", aHe: "T023 (מפתח) ו-T023T (תיאור); השיוך לחומר ב-MARA-MATKL." },
            { qHe: "כיצד קבוצת-חומר משפיעה על הנהלת-חשבונות?", aHe: "ניתן לקשר אותה ל-Valuation Class (OMQW), כך שפריטי-רכש ללא אב-חומר מקבלים חשבון-G/L אוטומטי." },
          ],
          takeawaysHe: [
            "קבוצת-חומר = מפתח-סיווג רוחבי לרכש ולדיווח.",
            "נשמרת ב-T023/T023T, משויכת דרך MARA-MATKL.",
            "מאפשרת Spend Analysis והקצאת-חשבון ברמת-קבוצה.",
          ],
          relatedHe: [{ labelHe: "אובייקט · T023", href: "/library/mm/object/T023/" }],
        },
        {
          id: "4.1.4",
          titleHe: "Lean Services",
          titleEn: "Lean Services",
          execHe:
            "Lean Services הוא מודל מפושט ב-S/4HANA לרכש שירותים, המבוסס על Material Master מסוג Product Type SERV במקום על Service Master המסורתי (MM-SRV) וגיליונות-שירות קלאסיים. הוא מפשט את תהליך רכש-השירותים ומאחד אותו עם רכש-חומרים.",
          beginnerHe:
            "בעבר שירותים (כמו תחזוקה, ייעוץ) נוהלו במנגנון נפרד ומסובך. Lean Services אומר: נתייחס לשירות כמו למוצר — ניצור לו אב-חומר מסוג SERV ונרכוש אותו בדומה לחומר רגיל. זה פשוט יותר וגם עובד יפה ב-Fiori.",
          consultantHe:
            "Lean Services משתמש ב-Material Type בעל Product Type SERV ובפריטי-PO רגילים. אין יותר Service Master (ML-ASMD) ולא Service Specifications היררכיים בתהליך הרזה; במקום Service Entry Sheet קלאסי (ML81N) באים Lean Service Entry Sheets המבוססי-Fiori. זהו ה-target model ב-S/4HANA; ה-MM-SRV הקלאסי עדיין נתמך אך אינו אסטרטגי.",
          purposeHe:
            "לפשט ולאחד את רכש-השירותים עם רכש-החומרים, להפחית מורכבות-Customizing ולנצל את חוויית-ה-Fiori ל-Service Procurement.",
          processExampleHe:
            "רכש שירות-תחזוקה: יוצרים PO עם פריט-שירות (חומר SERV), נותן-השירות מבצע, ומוזן Lean Service Entry Sheet המאשר את הביצוע; קליטת-השירות מפעילה את חשבונית-הספק.",
          cbcHe:
            "ב-CBC שירותי-ניקוי-מתקנים ותחזוקת-קווי-מילוי נרכשים כ-Lean Services: אב-חומר SERV לכל שירות, PO עם פריט-שירות, ו-Lean Service Entry Sheet לאישור הביצוע במקום ML81N הישן.",
          navHe: [
            "Materials Management ► External Services Management ► (Lean Services / Service Procurement settings)",
            "Logistics – General ► Material Master ► Basic Settings ► Material Types ► Define Attributes of Material Types (OMS2) — Product Type SERV",
          ],
          tables: ["MARA", "ESLL", "ESSR"],
          tcodes: ["MM01", "ME21N", "ME23N"],
          fiori: ["F1648", "F2027", "F0848A"],
          configHe: [
            "הגדר Material Type עם Product Type SERV (OMS2).",
            "הפעל את מודל ה-Lean Services / Service Procurement בהתאם להגדרות ה-External Services Management.",
            "השתמש ב-Lean Service Entry Sheets (Fiori) במקום ML81N הקלאסי.",
          ],
          mistakesHe: [
            "ערבוב המודל הקלאסי (Service Master/ML81N) עם Lean Services באותו תהליך.",
            "פתיחת חומר-שירות ללא Product Type SERV — אינו מתנהג כשירות רזה.",
          ],
          troubleshootHe: [
            "אי-אפשר ליצור Lean Service Entry Sheet ➔ Product Type של החומר אינו SERV או המודל הרזה לא הופעל.",
            "פריט-השירות מתנהג כחומר רגיל ➔ הגדרת Material Type שגויה.",
          ],
          bestPracticeHe: [
            "אמץ את Lean Services כמודל-יעד ב-S/4HANA לרכש-שירותים חדש.",
            "הימנע מהמודל הקלאסי MM-SRV אלא אם נדרשת תאימות-אחורה.",
          ],
          interviewHe: [
            { qHe: "מהו Lean Services ב-S/4HANA?", aHe: "מודל מפושט לרכש-שירותים המבוסס על Material Master מסוג Product Type SERV ועל Lean Service Entry Sheets, במקום Service Master ו-ML81N הקלאסיים." },
            { qHe: "מהי החלופה ל-Service Entry Sheet הקלאסי?", aHe: "Lean Service Entry Sheet מבוסס-Fiori, המאשר את ביצוע-השירות מול פריט ה-PO." },
          ],
          takeawaysHe: [
            "Lean Services = שירותים כ-Material Master מסוג SERV.",
            "מחליף את Service Master ו-ML81N הקלאסיים.",
            "מודל-היעד ל-Service Procurement ב-S/4HANA.",
          ],
        },
        {
          id: "4.1.5",
          titleHe: "הגדרת Lean Services: סוג-מוצר שירות (SERV)",
          titleEn: "Configuring Lean Services: Product Services Type (SERV)",
          execHe:
            "ההגדרה הליבתית של Lean Services היא יצירת/הקצאת Material Type בעל Product Type SERV. ה-Product Type מבדיל בין מוצר פיזי (PHYS) לשירות (SERV) וקובע התנהגות-רכש, מסכים ומנגנון-קליטה.",
          beginnerHe:
            "כדי שהמערכת תדע ש'זה שירות ולא מוצר פיזי', מסמנים את אב-החומר ב-Product Type = SERV. הסימון הזה הוא מה שמפעיל את כל ההתנהגות של Lean Services.",
          consultantHe:
            "Product Type הוא תכונה של Material Type (OMS2) ב-S/4HANA המקבלת ערך PHYS או SERV. SERV גורם לחומר להתנהג כשירות בפריטי-PO, מאפשר Lean Service Entry Sheet ומשפיע על ה-Item Categories המותרות. בניגוד ל-DIEN הקלאסי, ה-SERV הוא חלק מהמודל הרזה ומשתלב עם Fiori ועם Sourcing & Procurement החדש.",
          purposeHe:
            "להבדיל שירותים ממוצרים פיזיים ברמת-אב-החומר, ולהפעיל את מנגנון רכש-השירותים הרזה.",
          processExampleHe:
            "מגדירים Material Type 'SRVC' עם Product Type SERV; כל חומר שנפתח תחתיו מתנהג כשירות — PO עם פריט-שירות ו-Lean Service Entry Sheet במקום קליטת-מלאי.",
          cbcHe:
            "ב-CBC נפתח Material Type לשירותי-תחזוקה עם Product Type SERV; שירותי כיול-מכונות וניקוי-מתקנים נפתחים תחתיו ונרכשים כשירותים רזים.",
          navHe: [
            "Logistics – General ► Material Master ► Basic Settings ► Material Types ► Define Attributes of Material Types (OMS2)",
            "Materials Management ► External Services Management ► (Service Procurement / Product Type settings)",
          ],
          tables: ["T134", "MARA"],
          tcodes: ["OMS2", "MM01"],
          fiori: ["F1648"],
          configHe: [
            "ב-OMS2 הגדר/בחר Material Type וקבע Product Type = SERV.",
            "ודא שה-Item Categories והמסכים הרלוונטיים מותרים לסוג זה.",
            "שייך טווח-מספרים ופרמטרי-רכש מתאימים לשירותים.",
          ],
          mistakesHe: [
            "הגדרת Product Type PHYS לשירות — מבטל את התנהגות Lean Services.",
            "שימוש ב-DIEN הקלאסי כשנדרש SERV הרזה.",
          ],
          troubleshootHe: [
            "השירות מתנהג כמוצר פיזי ➔ Product Type אינו SERV.",
            "אי-אפשר לפתוח חומר-שירות ➔ Material Type לא מוגדר עם SERV או מסכים חסומים.",
          ],
          bestPracticeHe: [
            "הקצה Material Type ייעודי לשירותים עם Product Type SERV.",
            "תקנן את סוגי-השירות במספר Material Types מצומצם.",
          ],
          interviewHe: [
            { qHe: "מה קובע Product Type SERV?", aHe: "שהחומר הוא שירות (ולא מוצר פיזי), ובכך מפעיל את התנהגות Lean Services — פריטי-שירות ב-PO ו-Lean Service Entry Sheet." },
            { qHe: "היכן מגדירים Product Type?", aHe: "כתכונה של Material Type ב-OMS2." },
          ],
          takeawaysHe: [
            "Product Type SERV = סימון אב-החומר כשירות.",
            "מוגדר ב-OMS2 כתכונת Material Type.",
            "תנאי-הפעלה ל-Lean Services.",
          ],
        },
        {
          id: "4.1.6",
          titleHe: "בחירת אפשרויות-קונפיגורציה לאב-החומר",
          titleEn: "Select Material Master Configuration Options",
          execHe:
            "אב-החומר מציע מגוון אפשרויות-קונפיגורציה — Material Types, Field Selection, Number Ranges, Screen Sequences, Output Format של מספר-החומר — שיש לבחור ביניהן בהתאם לדרישות-הארגון. בחירה נכונה מאזנת בין גמישות, איכות-נתונים ופשטות-תחזוקה.",
          beginnerHe:
            "לאב-החומר יש הרבה 'מתגי-הגדרה': אילו סוגי-חומר קיימים, אילו שדות חובה, איך נראה מספר-החומר, איזה מסכים מופיעים. בשלב-העיצוב בוחרים אילו מתגים להפעיל כדי שהמערכת תתאים לארגון.",
          consultantHe:
            "ההחלטות המרכזיות: (1) Material Types וטווחי-מספרים (OMS2); (2) Field Selection — חובה/אופציונלי (OMS9/OMSR); (3) Screen Sequence ו-Screen References לפי Industry/User (OMT3E); (4) Output Format של מספר-החומר — Lexicographical/אורך (SAP Note 2267140 להרחבה ל-40); (5) Material Status ו-Mass Maintenance. כל החלטה מתועדת ב-Customizing ומשפיעה על כל מחזור-חיי-החומר.",
          purposeHe:
            "להתאים את אב-החומר לתהליכי-הארגון: לאזן איכות-נתונים (חובה), נוחות-משתמש (מסכים) וגמישות (טווחי-מספרים, אורך).",
          processExampleHe:
            "צוות-המימוש מחליט: ROH עם טווח-מספרים פנימי, Purchasing Group חובה, מסכי-MRP מוסתרים לחומרי-מסחר, ופורמט מספר-חומר ללא Lexicographical — ומגדיר הכל ב-OMS2/OMS9/OMT3E.",
          cbcHe:
            "ב-CBC נבחר: ROH פנימי, חובה על Batch Management ו-Purchasing Group, הסתרת תצוגות-מכירה לחומרי-גלם, ופורמט מספר-חומר אחיד מול הקבוצה הגלובלית של Coca-Cola.",
          navHe: [
            "Logistics – General ► Material Master ► Basic Settings ► Material Types ► Define Attributes of Material Types (OMS2)",
            "Logistics – General ► Material Master ► Configuring the Material Master ► Maintain Order of Main and Additional Screens (OMT3E)",
            "Logistics – General ► Material Master ► Basic Settings ► Define Output Format of Material Number (OMSL)",
          ],
          tables: ["T134", "T130F", "T100C", "TMCNV"],
          tcodes: ["OMS2", "OMS9", "OMT3E", "OMSL"],
          fiori: ["F1602A"],
          configHe: [
            "Material Types + Number Ranges (OMS2).",
            "Field Selection — Required/Optional/Display/Hide (OMS9/OMSR).",
            "Screen Sequence + Screen References (OMT3E).",
            "Output Format של מספר-החומר — אורך ו-Lexicographical (OMSL).",
          ],
          mistakesHe: [
            "החלטות לא-מתואמות בין צוותים — Field Selection סותר את Screen Sequence.",
            "אי-תיעוד הבחירות — קושי-תחזוקה בהמשך.",
          ],
          troubleshootHe: [
            "מסך/שדה לא מתנהג כמצופה ➔ קונפליקט בין OMS9 ל-OMT3E.",
            "מספר-חומר בפורמט לא-צפוי ➔ הגדרת Output Format/Lexicographical שגויה.",
          ],
          bestPracticeHe: [
            "קבע מסמך-עיצוב לאב-החומר לפני ההגדרה.",
            "תקנן Material Types ו-Field Selection בין מפעלים.",
          ],
          interviewHe: [
            { qHe: "אילו אזורי-קונפיגורציה מרכזיים יש לאב-החומר?", aHe: "Material Types/Number Ranges (OMS2), Field Selection (OMS9), Screen Sequence (OMT3E) ו-Output Format של מספר-החומר (OMSL)." },
            { qHe: "מה משפיע על אילו שדות חובה?", aHe: "Field Selection דרך Field Selection Groups ו-Field References (Material Type/Transaction/Industry)." },
          ],
          takeawaysHe: [
            "אב-החומר נשלט דרך אשכול החלטות-Customizing.",
            "מאזן איכות-נתונים, נוחות וגמישות.",
            "תעד ותקנן את הבחירות בין מפעלים.",
          ],
        },
        {
          id: "4.1.7",
          titleHe: "הרחבת תווי-שדה באב-החומר ב-SAP S/4HANA",
          titleEn: "Material Master Field Character Expansion in SAP S/4HANA",
          execHe:
            "ב-S/4HANA הורחבו שדות מסוימים באב-החומר — בראשם מספר-החומר (MATNR) שהורחב מ-18 ל-40 תווים. ההרחבה מאפשרת מספרי-חומר ארוכים/בעלי-משמעות אך מחייבת בדיקת-השפעה על ממשקים, פיתוחים-מותאמים והרחבות.",
          beginnerHe:
            "פעם מספר-החומר היה מוגבל ל-18 תווים. ב-S/4HANA אפשר עד 40 תווים. זה נוח (מספרים ארוכים יותר), אבל צריך לבדוק שכל הממשקים והתוכנות-המותאמות יודעים להתמודד עם השדה הארוך.",
          consultantHe:
            "ההרחבה (Extended Material Number, SAP Note 2267140) מאריכה את MATNR ל-CHAR40 ומחייבת הפעלה מודעת. אם מופעלת, נדרשת בדיקת Custom Code (כל DATA המוגדר MATNR18, מבני-INTERFACE, IDocs כמו MATMAS, ו-CDS/AMDP). יש להריץ את כלי ה-Simplification Item ולבדוק SI-checks. ברירת-המחדל ברוב המימושים נשארת 18 אלא אם יש צורך עסקי מובהק.",
          purposeHe:
            "לאפשר מספרי-חומר ארוכים/בעלי-משמעות וקיבולת גדולה יותר, תוך שמירה על תאימות-ממשקים.",
          processExampleHe:
            "ארגון מחליט להרחיב MATNR ל-40 תווים: מפעיל את ה-Extended Material Number, מריץ Custom Code Analysis, מתקן פיתוחים שמניחים 18 תווים, ובודק IDocs/ממשקים מול מערכות-לוויין.",
          cbcHe:
            "ב-CBC הרחבת MATNR נשקלת כדי ליישר מספרי-חומר עם מערך-קוד גלובלי של Coca-Cola; לפני הפעלה נבדקים ה-IDocs MATMAS וממשקי ה-Zetes/Daymax שאינם מניחים 18 תווים.",
          navHe: [
            "Logistics – General ► Material Master ► Basic Settings ► Define Output Format of Material Number (OMSL)",
            "SAP S/4HANA ► Simplification List ► Extended Material Number (SAP Note 2267140)",
          ],
          tables: ["MARA", "TMCNV", "T100O"],
          tcodes: ["OMSL", "SE38", "SPRO"],
          fiori: ["F1602A"],
          configHe: [
            "בדוק/הפעל Extended Material Number (CHAR40) לפי SAP Note 2267140.",
            "הרץ Custom Code Analysis ל-MATNR18 ולמבני-ממשק.",
            "בדוק IDocs (MATMAS) וממשקים חיצוניים לתאימות-אורך.",
          ],
          mistakesHe: [
            "הפעלת ההרחבה ללא בדיקת Custom Code — שגיאות-קיצוץ (truncation) בממשקים.",
            "הנחת 18 תווים בפיתוחים-מותאמים לאחר ההרחבה.",
          ],
          troubleshootHe: [
            "מספר-חומר נקטע בממשק ➔ קוד/IDoc מניח MATNR18 ולא הותאם.",
            "Dump בעיבוד-חומר ➔ מבנה-נתונים מותאם לא הורחב ל-CHAR40.",
          ],
          bestPracticeHe: [
            "הפעל הרחבה רק עם צורך עסקי ברור ולאחר ניתוח-השפעה מלא.",
            "בצע Custom Code Analysis ובדיקות-ממשק לפני go-live.",
          ],
          interviewHe: [
            { qHe: "לכמה תווים הורחב MATNR ב-S/4HANA?", aHe: "מ-18 ל-40 תווים (Extended Material Number, SAP Note 2267140), בהפעלה מודעת." },
            { qHe: "מהי הסכנה העיקרית בהרחבת מספר-החומר?", aHe: "קיצוץ (truncation) ושגיאות בפיתוחים-מותאמים, IDocs (MATMAS) וממשקים שמניחים 18 תווים — נדרש Custom Code Analysis." },
          ],
          takeawaysHe: [
            "ב-S/4HANA MATNR ניתן להרחבה ל-40 תווים.",
            "הפעלה מודעת בלבד, אחרי ניתוח Custom Code.",
            "בדוק IDocs וממשקים מפני קיצוץ.",
          ],
          relatedHe: [{ labelHe: "אובייקט · MARA", href: "/library/mm/object/MARA/" }],
        },
      ],
    },
    // ============================================================ 4.2
    {
      id: "4.2",
      titleHe: "ניהול-אצוות וסיריאליזציה",
      titleEn: "Batch Management and Serialization",
      execHe:
        "ניהול-אצוות (Batch Management) וסיריאליזציה (Serialization) הם שני מנגנונים לעקיבות (Traceability) ברמת-החומר: אצווה מזהה כמות-חומר בעלת מאפיינים אחידים (תאריך-ייצור, תוקף, מקור), וסיריאל מזהה יחידה בודדת. שניהם קריטיים לרגולציה, להחזרות (Recall) ולבקרת-איכות.",
      beginnerHe:
        "אצווה היא 'קבוצת-יחידות מאותו ייצור' — למשל כל הבקבוקים שיצאו ממילוי אחד; כולם חולקים תאריך-תפוגה ומקור. סיריאל הוא 'מספר-זהות ייחודי ליחידה אחת' — כמו מספר-מנוע. אצווה למעקב-המוני, סיריאל למעקב-פרטני.",
      consultantHe:
        "Batch Management מופעל דרך MARC-XCHPF ומנוהל ב-MCH1/MCHA/MCHB; הוא תומך ב-Batch Determination, ב-Classification (Class type 023) וב-Shelf Life. Serialization מבוססת Serial Number Profile (OIS2) ורשומות OBJK/SER01. ב-S/4HANA Batch אפשר Plant-level/Material-level/Client-level uniqueness. לרכש: אצוות נקלטות ב-GR, נושאות מאפיינים, ומשמשות ל-FIFO/FEFO ולחסימת-איכות.",
      purposeHe:
        "להבטיח עקיבות מלאה משדה-לרכש ומרכש-לייצור: לדעת מאיזו אצווה/יחידה הגיע כל פריט, לתמוך ב-Recall ממוקד ולעמוד ברגולציית-מזון/תרופות.",
      processExampleHe:
        "GR לתרכיז: נקלטת אצווה חדשה עם תאריך-ייצור, תוקף ומספר-אצווה-ספק; Batch Determination בוחר את האצווה ב-FEFO לצריכה; אם מתגלה בעיה — Recall מזהה את כל המוצרים שצרכו אותה אצווה.",
      cbcHe:
        "ב-CBC כל ROH (תרכיז/סוכר/CO2) מנוהל-אצווה לעקיבות-מזון; כל אצווה נושאת תוקף ומקור-ספק, ובחירת-אצווה FEFO מבטיחה צריכת-המלאי הקרוב-לפוג ראשון. ציוד-מילוי קריטי מסוריאלי לעקיבות-תחזוקה.",
      navHe: [
        "Logistics – General ► Batch Management ► Specify Batch Level and Activate Status Management",
        "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► Serial Number Management ► Define Serial Number Profiles (OIS2)",
      ],
      tables: ["MCH1", "MCHA", "MCHB", "OBJK", "SER01", "EQUI"],
      tcodes: ["MSC1N", "MSC2N", "MSC3N", "IQ01", "IQ02", "OIS2"],
      fiori: ["F1576", "F2352"],
      configHe: [
        "Batch Level (Client/Plant/Material) — קובע היכן מספר-האצווה ייחודי.",
        "Batch Number Range + Internal/External assignment.",
        "Serial Number Profile (OIS2) — קובע התנהגות-סיריאל בתנועות (GR/GI/מלאי).",
        "Batch Classification (Class type 023) — מאפייני-אצווה לבחירה (תוקף, מקור).",
      ],
      flow: [
        { he: "הפעלת Batch/Serial לחומר", code: "MM02", note: "XCHPF / Serial Profile" },
        { he: "GR — קליטת אצווה/סיריאל", code: "MIGO" },
        { he: "Classification (מאפיינים)", code: "MSC2N" },
        { he: "Batch Determination (FEFO)", code: "GI/Order" },
        { he: "עקיבות/Recall", code: "MB56" },
      ],
      masterDataHe: [
        "MCH1/MCHA/MCHB = אצווה (לקוח/מפעל/מחסן) · MARC-XCHPF = Batch Management active.",
        "Serial Number Profile + OBJK/SER01/EQUI = רשומות-סיריאל.",
      ],
      mistakesHe: [
        "הפעלת Batch לחומר עם מלאי קיים ללא Conversion — שגיאות-מלאי.",
        "Batch Level שגוי (Plant במקום Material) — אי-עקביות בין מפעלים.",
        "Serial Profile לא-מתאים לתנועות — חסימת GR/GI.",
      ],
      troubleshootHe: [
        "אי-אפשר לקלוט אצווה ➔ Batch Management לא הופעל בתצוגת המפעל, או Batch Level שגוי.",
        "Batch Determination לא בוחר ➔ חסר Classification או Selection/Sort Strategy.",
        "GR נחסם לחומר-מסוריאל ➔ Serial Number Profile דורש סיריאל שלא הוזן.",
      ],
      bestPracticeHe: [
        "קבע Batch Level=Material לעקביות גלובלית, אלא אם נדרש אחרת.",
        "השתמש ב-Batch Classification ל-FEFO ולבחירה אוטומטית.",
        "הגבל סיריאליזציה לפריטים שבאמת דורשים מעקב-יחידה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Batch ל-Serial Number?", aHe: "Batch מזהה כמות-חומר בעלת מאפיינים אחידים (מקור/תוקף); Serial מזהה יחידה בודדת. אצווה למעקב-המוני, סיריאל למעקב-פרטני." },
        { qHe: "מהן רמות ה-Batch Level?", aHe: "Client, Plant ו-Material — קובעות באיזו רמה מספר-האצווה חייב להיות ייחודי." },
        { qHe: "מהו FEFO ואיך משיגים אותו?", aHe: "First-Expired-First-Out — בחירת האצווה הקרובה-לפוג ראשונה, דרך Batch Determination המבוססת Shelf Life Expiration Date ב-Classification." },
      ],
      takeawaysHe: [
        "Batch = עקיבות-כמות; Serial = עקיבות-יחידה.",
        "Batch Level (Client/Plant/Material) קובע ייחודיות.",
        "Batch Determination + Classification מאפשרים FEFO/FIFO.",
      ],
      relatedHe: [
        { labelHe: "אובייקט · MCH1", href: "/library/mm/object/MCH1/" },
        { labelHe: "אובייקט · EQUI", href: "/library/mm/object/EQUI/" },
      ],
      children: [
        {
          id: "4.2.1",
          titleHe: "הגדרת מספרי-אצווה",
          titleEn: "Configuring Batch Numbers",
          execHe:
            "הגדרת מספרי-אצווה כוללת קביעת Batch Level (היכן המספר ייחודי), הקצאת-מספר (פנימית/חיצונית), טווח-מספרים ו-Status Management. ההגדרות קובעות כיצד אצוות נוצרות, ממוספרות ונשלטות לאורך מחזור-חייהן.",
          beginnerHe:
            "לכל אצווה צריך מספר. כאן מחליטים: האם SAP ייתן מספר אוטומטית או שהמשתמש יזין; האם המספר ייחודי לכל המערכת, למפעל או לחומר; ומאיזה טווח-מספרים. כך כל אצווה מקבלת זהות ברורה.",
          consultantHe:
            "Batch Level נקבע ב-SPRO (Specify Batch Level): Client/Plant/Material. Internal Batch Number Assignment מופעל לאוטומציה (אחרת המשתמש מזין). Batch Number Range מוגדר ב-OMAD/SNRO (object BATCH_CLT). Status Management (Restricted/Unrestricted) מאפשר חסימת-אצווה לאיכות. שינוי Batch Level בדיעבד מחייב Conversion ומורכב — לכן מחליטים מוקדם.",
          purposeHe:
            "להבטיח זהות-אצווה עקבית וייחודית, אוטומציה של ההקצאה, ויכולת לחסום אצוות פגומות.",
          processExampleHe:
            "GR לתרכיז יוצר אצווה אוטומטית (Internal Assignment) מתוך טווח-מספרים; האצווה נכנסת בסטטוס Unrestricted, אך QA יכול להעבירה ל-Restricted עד אישור-בדיקה.",
          cbcHe:
            "ב-CBC Batch Level=Material והקצאה פנימית; אצוות-תרכיז נקלטות ב-Restricted עד שחרור-QA, ורק אז זמינות לצריכה בקווי-המילוי.",
          navHe: [
            "Logistics – General ► Batch Management ► Specify Batch Level and Activate Status Management",
            "Logistics – General ► Batch Management ► Batch Number Assignment ► Activate Internal Batch Number Assignment",
          ],
          tables: ["MCH1", "MCHA", "MCHB", "TCURM"],
          tcodes: ["MSC1N", "MSC2N", "OMAD", "SNRO"],
          fiori: ["F1576"],
          configHe: [
            "Specify Batch Level (Client/Plant/Material).",
            "Activate Internal Batch Number Assignment (אוטומטי) או חיצוני.",
            "Batch Number Range (object BATCH_CLT, OMAD/SNRO).",
            "Activate Status Management — Restricted/Unrestricted.",
          ],
          mistakesHe: [
            "בחירת Batch Level שגוי — שינוי בדיעבד מחייב Conversion יקר.",
            "אי-הפעלת Status Management — אי-אפשר לחסום אצוות פגומות.",
          ],
          troubleshootHe: [
            "אצווה לא נוצרת אוטומטית ➔ Internal Assignment כבוי.",
            "מספר-אצווה כפול בין מפעלים ➔ Batch Level=Plant במקום Material.",
          ],
          bestPracticeHe: [
            "החלט Batch Level מוקדם (לרוב Material) והימנע משינוי בדיעבד.",
            "הפעל Status Management לחומרי-איכות/מזון.",
          ],
          interviewHe: [
            { qHe: "מהן שלוש רמות ה-Batch Level?", aHe: "Client, Plant ו-Material; הן קובעות את היקף הייחודיות של מספר-האצווה." },
            { qHe: "מה מאפשר Batch Status Management?", aHe: "להעביר אצווה בין Unrestricted ל-Restricted — חסימת-אצווה עד אישור-איכות." },
          ],
          takeawaysHe: [
            "Batch Level קובע ייחודיות (Client/Plant/Material).",
            "הקצאה פנימית מאוטמת את המספור.",
            "Status Management חוסם אצוות לא-מאושרות.",
          ],
        },
        {
          id: "4.2.2",
          titleHe: "הגדרת מספרי-סיריאל",
          titleEn: "Configuring Serial Numbers",
          execHe:
            "הגדרת מספרי-סיריאל מבוססת על Serial Number Profile הקובע אילו תנועות (GR/GI, מלאי, מסירה) מחייבות סיריאל ומהי רמת-ניהול-המלאי-הסיריאלי. הסיריאל מקשר כל יחידה לרשומת-Equipment ולהיסטוריית-תחזוקה.",
          beginnerHe:
            "סיריאל הוא מספר ייחודי ליחידה אחת. ה-Profile אומר מתי חובה להזין סיריאל — בקליטה, בהוצאה, במסירה — ומה SAP עושה איתו. כך אפשר לעקוב אחרי יחידה ספציפית לכל אורך-חייה.",
          consultantHe:
            "Serial Number Profile (OIS2) נושא Serializing Procedures (MMSL — מלאי, PPSL — ייצור, SDAU — מסירה) עם SerUsage (Optional/Obligatory/Automatic/None). הסיריאל יוצר OBJK + EQUI (אם Equipment Requirement מופעל). StockCheck מבטיח התאמת-סיריאל למלאי. משויך לחומר בתצוגת General Plant/Work Scheduling (MARC-SERNP).",
          purposeHe:
            "לאפשר מעקב-יחידה מלא — איתור, אחריות, תחזוקה והיסטוריה — לפריטים שבהם זהות-יחידה קריטית.",
          processExampleHe:
            "GR לרכיב-ציוד יקר: ה-Profile (Obligatory) מחייב הזנת סיריאל; נוצרת רשומת-Equipment; בהוצאה למתקן הסיריאל עוקב, ובתחזוקה מאוחרת ההיסטוריה זמינה לפי אותו סיריאל.",
          cbcHe:
            "ב-CBC חלקי-ציוד קריטיים בקווי-המילוי (משאבות, ראשי-מילוי) מסוריאליים: כל יחידה מקושרת ל-Equipment, וכך עקיבות-תחזוקה והחלפות מנוהלות ברמת-היחידה.",
          navHe: [
            "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► Serial Number Management ► Define Serial Number Profiles (OIS2)",
            "Plant Maintenance and Customer Service ► Master Data in PM and CS ► Technical Objects ► Serial Number Management ► Serializing Procedures",
          ],
          tables: ["OBJK", "SER01", "SER03", "EQUI", "MARC"],
          tcodes: ["OIS2", "IQ01", "IQ02", "IQ03"],
          fiori: ["F2352"],
          configHe: [
            "Define Serial Number Profile (OIS2).",
            "הגדר Serializing Procedures + SerUsage (Optional/Obligatory/Automatic/None) לכל תנועה.",
            "Equipment Requirement — האם נוצרת רשומת-Equipment.",
            "שייך Profile לחומר (MARC-SERNP).",
          ],
          mistakesHe: [
            "Profile Obligatory לכל התנועות — חיכוך מיותר בקליטה/הוצאה.",
            "אי-שיוך Profile לחומר — סיריאליזציה לא מופעלת בפועל.",
          ],
          troubleshootHe: [
            "GR/GI נחסם בדרישת-סיריאל ➔ SerUsage=Obligatory ולא הוזן סיריאל.",
            "סיריאל לא יוצר Equipment ➔ Equipment Requirement כבוי ב-Profile.",
          ],
          bestPracticeHe: [
            "הגבל Obligatory לתנועות שבהן הסיריאל באמת נדרש.",
            "סוריאל רק פריטים בעלי-ערך/קריטיים-לתחזוקה.",
          ],
          interviewHe: [
            { qHe: "מה קובע Serial Number Profile?", aHe: "אילו תנועות (מלאי/ייצור/מסירה) מחייבות סיריאל ומה ה-SerUsage (Optional/Obligatory/Automatic/None), וכן האם נוצרת רשומת-Equipment." },
            { qHe: "כיצד משייכים סיריאליזציה לחומר?", aHe: "דרך Serial Number Profile בשדה MARC-SERNP בתצוגת ה-General Plant/Work Scheduling." },
          ],
          takeawaysHe: [
            "Serial Profile (OIS2) קובע מתי סיריאל נדרש.",
            "סיריאל מקשר יחידה ל-Equipment ולעקיבות-תחזוקה.",
            "משויך לחומר דרך MARC-SERNP.",
          ],
          relatedHe: [{ labelHe: "אובייקט · EQUI", href: "/library/mm/object/EQUI/" }],
        },
      ],
    },
    // ============================================================ 4.3
    {
      id: "4.3",
      titleHe: "מודל ה-Business Partner ב-SAP S/4HANA",
      titleEn: "SAP S/4HANA Business Partner Model",
      execHe:
        "ב-S/4HANA ה-Business Partner (BP) הוא נקודת-הכניסה היחידה והחובה לניהול ספקים ולקוחות — רשומה מרכזית אחת המחזיקה תפקידים (Roles) מרובים. עסקאות הספק/לקוח הקלאסיות (XK01/XD01) הוחלפו ב-BP transaction, וה-CVI (Customer/Vendor Integration) מסנכרן את ה-BP לטבלאות LFA1/KNA1.",
      beginnerHe:
        "במקום לנהל ספק ולקוח בשתי מערכות-מסכים נפרדות, S/4HANA אומר: יש ישות אחת — Business Partner — שיכולה לשחק כמה תפקידים: ספק, לקוח, נמען-תשלום. פותחים אותה פעם אחת ב-BP, מוסיפים תפקיד 'Supplier', והמערכת בונה אוטומטית את רשומת-הספק הישנה מאחורי-הקלעים.",
      consultantHe:
        "ה-BP הוא ה-leading object; הנתונים נשמרים ב-BUT000 (כללי), BUT0BK (בנק) ועוד, ומסונכרנים ל-LFA1/LFB1/LFM1 (ספק) ו-KNA1/KNB1/KNVV (לקוח) דרך CVI. ה-CVI מבוסס PPO (Post Processing Office) לטיפול-שגיאות, ו-Number Range Synchronization בין BP ל-Vendor/Customer. BP Roles (FLVN00/FLVN01 לספק, FLCU00/FLCU01 ללקוח) קובעים אילו תצוגות נפתחות. ב-S/4HANA זהו mandatory model — XK01/XD01 חסומות.",
      purposeHe:
        "לאחד את ניהול-השותפים-העסקיים לרשומה אחת רב-תפקידית, למנוע כפילות-נתונים בין ספק ללקוח, ולספק תשתית אחידה ל-Sourcing & Procurement ול-Sales.",
      processExampleHe:
        "פתיחת ספק חדש: ב-BP transaction בוחרים Organization, ממלאים נתונים כלליים (BUT000), מוסיפים BP Role 'Supplier (FLVN00)' ו-'Supplier (Fin.Accounting) FLVN01', ממלאים Purchasing/Company Code data; ה-CVI מייצר אוטומטית את LFA1/LFB1/LFM1 והספק זמין ל-PO.",
      cbcHe:
        "ב-CBC כל ספקי-התרכיז, הסוכר והאריזות מנוהלים כ-Business Partners: רשומת-BP אחת לכל ספק, עם תפקיד Supplier ל-Purchasing Org של מתקן-המילוי. ספק שהוא גם לקוח (החזרי-בקבוקים) מקבל גם תפקיד Customer — באותה רשומת-BP.",
      navHe: [
        "Cross-Application Components ► SAP Business Partner ► Business Partner ► Basic Settings ► Number Ranges and Groupings",
        "Cross-Application Components ► Master Data Synchronization ► Customer/Vendor Integration ► Business Partner Settings",
      ],
      tables: ["BUT000", "BUT0BK", "LFA1", "LFB1", "LFM1", "CVI_VEND_LINK"],
      tcodes: ["BP", "MK03", "FK03", "MDS_LOAD_COCKPIT"],
      fiori: ["F0850A", "F3163", "F1053"],
      configHe: [
        "BP Roles + Groupings + Number Ranges (BP Customizing).",
        "CVI — Activate Synchronization Options (BP→Vendor/Customer).",
        "Number Range Synchronization בין BP ל-Vendor/Customer (Same/Different).",
        "Field Mapping + PPO (Post Processing Office) לטיפול-שגיאות-סנכרון.",
      ],
      flow: [
        { he: "יצירת BP (Organization)", code: "BP", note: "BUT000" },
        { he: "הוספת Role: Supplier", code: "FLVN00/FLVN01" },
        { he: "מילוי Purchasing/Company data", code: "LFM1/LFB1" },
        { he: "CVI Synchronization", code: "Auto" },
        { he: "ספק זמין ל-PO", code: "ME21N" },
      ],
      masterDataHe: [
        "BUT000 = נתוני-BP כלליים · BUT0BK = פרטי-בנק.",
        "LFA1 (כללי) · LFB1 (Company Code) · LFM1 (Purchasing Org) — נגזרים מה-BP דרך CVI.",
        "CVI_VEND_LINK = קישור BP↔Vendor.",
      ],
      mistakesHe: [
        "ניסיון להשתמש ב-XK01/XD01 — חסומות ב-S/4HANA.",
        "אי-הפעלת CVI כראוי — ה-BP נוצר אך LFA1/LFB1 לא מסונכרנים.",
        "Number Range לא-מסונכרן בין BP ל-Vendor — אי-התאמת-מספרים.",
      ],
      troubleshootHe: [
        "ספק נוצר ב-BP אך לא זמין ל-PO ➔ חסר תפקיד Purchasing (FLVN00) או CVI נכשל (בדוק PPO).",
        "שגיאת-סנכרון BP→Vendor ➔ Field Mapping/חובה חסר; בדוק ב-MDS_PPO2.",
        "מספרי BP ו-Vendor לא תואמים ➔ Number Range Synchronization לא הוגדר Same.",
      ],
      bestPracticeHe: [
        "אמץ BP כמודל-יחיד; בטל לחלוטין שימוש ב-XK01/XD01.",
        "הגדר Number Range Synchronization 'Same' לפשטות-תפעול.",
        "נטר את PPO באופן שוטף לאיתור-שגיאות-סנכרון.",
      ],
      interviewHe: [
        { qHe: "מהו ה-Business Partner ב-S/4HANA ולמה הוא חובה?", aHe: "רשומה מרכזית אחת רב-תפקידית לספקים ולקוחות; ב-S/4HANA הוא ה-leading object וה-mandatory model — XK01/XD01 חסומות, והכל עובר דרך BP." },
        { qHe: "מהו CVI?", aHe: "Customer/Vendor Integration — מנגנון הסנכרון שמייצר/מעדכן אוטומטית את LFA1/LFB1/LFM1 (ו-KNA1/…) מתוך ה-BP." },
        { qHe: "מה תפקיד ה-PPO ב-CVI?", aHe: "Post Processing Office — מטפל בשגיאות-סנכרון BP↔Vendor/Customer ומאפשר תיקון ידני (MDS_PPO2)." },
      ],
      takeawaysHe: [
        "BP = הרשומה המרכזית היחידה לספקים/לקוחות ב-S/4HANA.",
        "תפקידים (Roles) קובעים אילו תצוגות נפתחות.",
        "CVI מסנכרן BP→LFA1/LFB1/LFM1; XK01/XD01 חסומות.",
      ],
      relatedHe: [
        { labelHe: "אובייקט · BUT000", href: "/library/mm/object/BUT000/" },
        { labelHe: "אובייקט · LFA1", href: "/library/mm/object/LFA1/" },
      ],
      children: [
        {
          id: "4.3.1",
          titleHe: "ספקים כ-Business Partners",
          titleEn: "Suppliers as Business Partners",
          execHe:
            "ב-S/4HANA ספק אינו עוד רשומה עצמאית אלא תפקיד (Role) של Business Partner. רשומת-BP אחת מקבלת BP Role 'Supplier', וה-CVI גוזר ממנה את רשומת-הספק הקלאסית — איחוד המבטל כפילות בין ספק ללקוח.",
          beginnerHe:
            "ספק הוא 'כובע' שה-Business Partner חובש. פותחים BP, ומוסיפים לו את תפקיד 'Supplier' — מאותו רגע הוא ספק לכל דבר. אותו BP יכול לחבוש גם כובע 'Customer' אם הוא גם לקוח.",
          consultantHe:
            "תפקידי-ספק: FLVN00 (Supplier — Purchasing) ו-FLVN01 (Supplier — Fin.Accounting). כל תפקיד פותח תצוגות שונות וממפה לטבלאות שונות: General→LFA1, Company Code→LFB1, Purchasing Org→LFM1. ה-BP Category (Organization/Person/Group) נקבע ביצירה. תלות-תפקידים: לא ניתן למלא Purchasing Org data בלי תפקיד Purchasing.",
          purposeHe:
            "לנהל ספק כתפקיד בתוך מודל-שותפים אחיד, למנוע כפל-נתונים ולאפשר לישות אחת לשמש ספק ולקוח בו-זמנית.",
          processExampleHe:
            "ספק-תרכיז קיים כ-BP; מוסיפים תפקיד FLVN00 ל-Purchasing Org ו-FLVN01 ל-Company Code; ה-CVI מייצר LFA1/LFM1/LFB1, והספק זמין מיידית ל-PO ולתשלום.",
          cbcHe:
            "ב-CBC ספק-הסוכר מנוהל כ-BP עם תפקיד Supplier ל-Purchasing Org של המתקן; אם אותו ספק קונה מ-CBC בקבוקים-ריקים, מוסיפים לו תפקיד Customer — באותו BP.",
          navHe: [
            "Cross-Application Components ► SAP Business Partner ► Business Partner ► Basic Settings ► Business Partner Roles ► Define BP Roles",
            "SAP Easy Access ► Logistics ► Materials Management ► Purchasing ► Master Data ► Business Partner ► Maintain (BP)",
          ],
          tables: ["BUT000", "LFA1", "LFB1", "LFM1"],
          tcodes: ["BP", "MK03", "FK03"],
          fiori: ["F0850A", "F1053"],
          configHe: [
            "Define/assign BP Roles: FLVN00 (Purchasing), FLVN01 (Fin.Accounting).",
            "Number Ranges + Groupings לספקים-BP.",
            "ודא Role↔טבלה mapping (General/Company/Purchasing).",
          ],
          mistakesHe: [
            "הוספת תפקיד Fin.Accounting בלבד ללא Purchasing — אי-אפשר ליצור PO.",
            "פתיחת BP כ-Person במקום Organization לספק-תאגיד.",
          ],
          troubleshootHe: [
            "אין נתוני Purchasing Org לספק ➔ חסר תפקיד FLVN00.",
            "אין נתוני Company Code ➔ חסר תפקיד FLVN01.",
          ],
          bestPracticeHe: [
            "הוסף את כל תפקידי-הספק הנדרשים בפתיחה (Purchasing + Fin.Accounting).",
            "בחר BP Category נכון (Organization לספק עסקי).",
          ],
          interviewHe: [
            { qHe: "אילו BP Roles הופכים BP לספק?", aHe: "FLVN00 (Supplier — Purchasing) ו-FLVN01 (Supplier — Financial Accounting); הם פותחים את תצוגות ה-Purchasing וה-Company Code." },
            { qHe: "האם BP אחד יכול להיות גם ספק וגם לקוח?", aHe: "כן — מוסיפים לאותו BP גם תפקיד Supplier וגם Customer; זו מהות מודל ה-Business Partner." },
          ],
          takeawaysHe: [
            "ספק = BP Role (FLVN00/FLVN01).",
            "כל תפקיד ממפה לטבלה (LFA1/LFB1/LFM1).",
            "BP יחיד יכול לשמש ספק ולקוח כאחד.",
          ],
        },
        {
          id: "4.3.2",
          titleHe: "טעינת רשומות-ספק",
          titleEn: "Loading Supplier Records",
          execHe:
            "טעינת ספקים ל-S/4HANA חייבת לעבור דרך מודל ה-BP — ולא ישירות ל-LFA1. הכלי המרכזי הוא SAP S/4HANA Migration Cockpit (LTMC/Fiori), שטוען BP עם תפקידי-ספק וה-CVI מייצר את רשומות-הספק הקלאסיות אוטומטית.",
          beginnerHe:
            "כשמעבירים אלפי ספקים מ-ECC ל-S/4HANA, לא מקלידים ידנית. משתמשים בכלי-מיגרציה שטוען את כולם כ-Business Partners; המערכת בונה לכל אחד את רשומת-הספק שמאחורי-הקלעים.",
          consultantHe:
            "המיגרציה משתמשת ב-Migration Cockpit (object 'Supplier') או ב-MDS_LOAD_COCKPIT לסנכרון-המוני קיים. הטעינה ממלאת BUT000 + תפקידים, וה-CVI מייצר LFA1/LFB1/LFM1. נדרשת Number Range Synchronization מוקדמת ו-Field Mapping תקין; שגיאות נופלות ל-PPO. בהמרת-מערכת (Conversion) ה-CVI מופעל כצעד-חובה לפני ה-go-live.",
          purposeHe:
            "להעביר/לטעון אוכלוסיית-ספקים גדולה בעקביות ובאיכות, תוך הבטחת סנכרון מלא BP↔Vendor.",
          processExampleHe:
            "צוות-המיגרציה טוען קובץ-ספקים ל-Migration Cockpit (object Supplier); המערכת יוצרת BP לכל ספק עם תפקידי FLVN00/FLVN01; ה-CVI מסנכרן ל-LFA1/LFM1, ושגיאות נבדקות ב-PPO לפני אישור.",
          cbcHe:
            "ב-CBC כל ספקי-הקבוצה הועברו מ-ECC דרך Migration Cockpit כ-BPs; ספקי-תרכיז גלובליים נטענו עם תפקידי Purchasing לכל Purchasing Org של מתקני-המילוי.",
          navHe: [
            "SAP S/4HANA Migration Cockpit ► Migration Object: Supplier (LTMC)",
            "Cross-Application Components ► Master Data Synchronization ► Synchronization Cockpit (MDS_LOAD_COCKPIT)",
          ],
          tables: ["BUT000", "LFA1", "LFB1", "LFM1", "CVI_VEND_LINK"],
          tcodes: ["LTMC", "LTMOM", "MDS_LOAD_COCKPIT", "MDS_PPO2"],
          fiori: ["F3163", "F2249"],
          configHe: [
            "השתמש ב-Migration Cockpit, Migration Object 'Supplier'.",
            "ודא Number Range Synchronization + CVI Activation לפני טעינה.",
            "MDS_LOAD_COCKPIT לסנכרון-המוני של רשומות קיימות.",
            "בדוק שגיאות ב-PPO (MDS_PPO2).",
          ],
          mistakesHe: [
            "ניסיון לטעון ישירות ל-LFA1 בלי BP — לא-נתמך ב-S/4HANA.",
            "טעינה לפני הפעלת-CVI — ה-BP נוצר ללא רשומת-ספק.",
          ],
          troubleshootHe: [
            "ספק נטען אך אין LFA1 ➔ CVI לא הופעל או נכשל; בדוק PPO.",
            "כשל-טעינה ב-Migration Cockpit ➔ Field Mapping/חובה חסר באובייקט Supplier.",
          ],
          bestPracticeHe: [
            "הפעל ובדוק CVI ו-Number Range Sync לפני טעינה-המונית.",
            "בצע load בסביבת-בדיקה ונקה PPO לפני ה-production load.",
          ],
          interviewHe: [
            { qHe: "כיצד טוענים ספקים ל-S/4HANA?", aHe: "דרך מודל ה-BP — באמצעות Migration Cockpit (object Supplier) או MDS_LOAD_COCKPIT; ה-CVI מייצר את LFA1/LFB1/LFM1, לא טעינה ישירה ל-LFA1." },
            { qHe: "מה בודקים אחרי טעינת-ספקים?", aHe: "את ה-PPO (MDS_PPO2) לשגיאות-סנכרון, ואת קיום LFA1/LFM1 לכל BP שנטען." },
          ],
          takeawaysHe: [
            "טעינת-ספקים עוברת תמיד דרך ה-BP.",
            "Migration Cockpit / MDS_LOAD_COCKPIT הם הכלים.",
            "CVI + PPO מבטיחים סנכרון תקין ל-LFA1.",
          ],
        },
        {
          id: "4.3.3",
          titleHe: "הקמת אב-הספק",
          titleEn: "Setting Up the Supplier Master",
          execHe:
            "הקמת אב-הספק ב-S/4HANA היא הזנת נתוני-הספק בשלוש רמות דרך ה-BP: General (LFA1), Company Code (LFB1) ו-Purchasing Org (LFM1). כל רמה משויכת לתפקיד-BP ולתחום-אחריות (רכש מול כספים).",
          beginnerHe:
            "אב-הספק בנוי משלוש 'שכבות': כללי (כתובת, שם), כספי (תנאי-תשלום, חשבון-מפתח) ורכש (תנאי-רכש, מטבע-הזמנה). ממלאים אותן דרך BP, וכל שכבה שייכת למחלקה אחרת.",
          consultantHe:
            "General data (LFA1) — כתובת, מס, בנק; Company Code data (LFB1) — Reconciliation Account, Payment Terms, Payment Methods; Purchasing Org data (LFM1) — Order Currency, Incoterms, Schema Group, GR-Based IV. ה-Partner Functions (VN/OA/PI/RS) מוגדרים ברמת-הרכש. ה-CVI ממפה כל שכבה לטבלתה. שדות-מפתח: LFB1-AKONT (Recon.Acct), LFM1-WAERS (Order Currency).",
          purposeHe:
            "לספק לכל תחום (רכש, כספים) את נתוני-הספק הדרושים לתפעול: הזמנה, קליטה, חשבונית ותשלום.",
          processExampleHe:
            "הקמת ספק-אריזות: General — כתובת ובנק; Company Code — Recon.Account 160000 ו-Payment Terms NT30; Purchasing Org — מטבע EUR, Incoterms FOB, GR-Based IV פעיל; הספק מוכן ל-PO ולתשלום.",
          cbcHe:
            "ב-CBC ספק-הבקבוקים מוקם עם Purchasing data לכל מתקן-מילוי (מטבע, Incoterms), Company Code data לחברת-הבת המקומית, ו-Partner Functions (OA הזמנה, PI חשבונית, RS נמען-תשלום).",
          navHe: [
            "SAP Easy Access ► Logistics ► Materials Management ► Purchasing ► Master Data ► Business Partner ► Maintain (BP)",
            "Materials Management ► Purchasing ► Partner Determination ► Define Partner Schemas",
          ],
          tables: ["LFA1", "LFB1", "LFM1", "WYT3", "BUT000"],
          tcodes: ["BP", "MK03", "FK03", "ME03"],
          fiori: ["F0850A", "F1053", "F1981"],
          configHe: [
            "מלא General (LFA1), Company Code (LFB1), Purchasing Org (LFM1) דרך BP Roles.",
            "Reconciliation Account (LFB1-AKONT) + Payment Terms/Methods.",
            "Order Currency, Incoterms, Schema Group, GR-Based IV (LFM1).",
            "Partner Functions (WYT3) — OA/PI/RS/VN.",
          ],
          mistakesHe: [
            "חסר Reconciliation Account — אי-אפשר לרשום חשבונית-ספק.",
            "חסר Purchasing Org data — אי-אפשר ליצור PO.",
            "Partner Functions לא-מוגדרים — בעיות בקביעת-נמענים.",
          ],
          troubleshootHe: [
            "אי-אפשר לרשום FI לספק ➔ חסר LFB1/Recon.Account.",
            "אי-אפשר ליצור PO ➔ חסר LFM1/Order Currency.",
            "נמען-חשבונית שגוי ➔ Partner Function PI לא הוגדר.",
          ],
          bestPracticeHe: [
            "מלא את שלוש הרמות בפתיחה לפי Checklist.",
            "תקנן Payment Terms ו-Schema Groups בין ספקים.",
          ],
          interviewHe: [
            { qHe: "מהן שלוש רמות אב-הספק?", aHe: "General (LFA1), Company Code (LFB1) ו-Purchasing Org (LFM1) — נתוני-כלל, נתוני-כספים ונתוני-רכש." },
            { qHe: "מהו Reconciliation Account ולמה הוא קריטי?", aHe: "LFB1-AKONT — חשבון-המפתח המקשר את ספר-הספקים ל-G/L; בלעדיו אי-אפשר לרשום חשבונית-ספק." },
          ],
          takeawaysHe: [
            "אב-הספק = שלוש רמות (LFA1/LFB1/LFM1) דרך BP.",
            "Recon.Account חובה לכספים; Order Currency חובה לרכש.",
            "Partner Functions קובעים נמענים בתהליך-הרכש.",
          ],
          relatedHe: [{ labelHe: "אובייקט · LFM1", href: "/library/mm/object/LFM1/" }],
        },
        {
          id: "4.3.4",
          titleHe: "ביצוע Customer/Vendor Integration",
          titleEn: "Performing Customer/Vendor Integration",
          execHe:
            "CVI (Customer/Vendor Integration) הוא מנגנון-הסנכרון הדו-כיווני בין ה-Business Partner לרשומות-הספק/לקוח הקלאסיות. הפעלתו היא צעד-חובה ב-S/4HANA — בלעדיו ה-BP נוצר אך LFA1/KNA1 אינם מתעדכנים. זהו לב-המודל.",
          beginnerHe:
            "CVI הוא 'הגשר' בין הרשומה החדשה (BP) לרשומות הישנות (Vendor/Customer). כל פעם שמשנים BP, ה-CVI דואג שגם רשומת-הספק תתעדכן — אוטומטית. בלי הגשר הזה, חצי מהמערכת לא תדע על הספק.",
          consultantHe:
            "CVI כולל: Activation of Synchronization (BP→Vendor, Vendor→BP), Number Range Synchronization (Same/Different), Field Mapping, ו-PPO לטיפול-שגיאות. בהמרת-מערכת מריצים Pre-Checks (תיקון-נתונים ב-ECC) ואז את ה-Synchronization Cockpit (MDS_LOAD_COCKPIT) להמרת-ספקים-קיימים ל-BPs. שגיאות-סנכרון נחקרות ב-MDS_PPO2. תיאום ה-Account Groups ל-BP Groupings קריטי.",
          purposeHe:
            "להבטיח עקביות-נתונים מלאה בין ה-BP לרשומות-הספק/לקוח, ולאפשר את כל תהליכי ה-MM/SD/FI שעדיין קוראים את LFA1/KNA1.",
          processExampleHe:
            "בפרויקט-המרה: מריצים Pre-Checks ב-ECC, מתקנים ספקים פגומים, מפעילים CVI ב-S/4HANA, מריצים MDS_LOAD_COCKPIT להמרת כל הספקים ל-BPs, ובודקים PPO עד אפס-שגיאות לפני go-live.",
          cbcHe:
            "ב-CBC במהלך ה-Conversion הופעל CVI ונבדק ב-PPO; כל ספקי-התרכיז והאריזה הומרו ל-BPs עם Number Range Synchronization 'Same', כך שמספר-הספק נשמר זהה למספר-ה-BP.",
          navHe: [
            "Cross-Application Components ► Master Data Synchronization ► Customer/Vendor Integration ► Business Partner Settings ► Settings for Vendor Integration",
            "Cross-Application Components ► Master Data Synchronization ► Synchronization Control ► Activate Synchronization Options",
          ],
          tables: ["CVI_VEND_LINK", "CVI_CUST_LINK", "BUT000", "LFA1", "KNA1"],
          tcodes: ["MDS_LOAD_COCKPIT", "MDS_PPO2", "CVI_FS_CHECK_CUSTOMIZING", "BP"],
          fiori: ["F3163"],
          configHe: [
            "Activate Synchronization Options (BP→Vendor, Vendor→BP).",
            "Number Range Synchronization בין BP ל-Vendor (Same/Different).",
            "Field Mapping + Account Groups↔BP Groupings.",
            "PPO (MDS_PPO2) לטיפול-שגיאות-סנכרון.",
          ],
          flow: [
            { he: "Pre-Checks ב-ECC", code: "תיקון-נתונים" },
            { he: "Activate Synchronization", code: "BP↔Vendor" },
            { he: "Number Range Sync", code: "Same/Diff" },
            { he: "Synchronization Cockpit", code: "MDS_LOAD_COCKPIT" },
            { he: "טיפול-שגיאות", code: "MDS_PPO2" },
          ],
          masterDataHe: [
            "CVI_VEND_LINK = קישור BP↔Vendor · CVI_CUST_LINK = קישור BP↔Customer.",
            "Account Group↔BP Grouping mapping קובע טווחי-מספרים.",
          ],
          mistakesHe: [
            "הפעלת CVI חלקית (כיוון אחד בלבד) — סנכרון לא-מלא.",
            "אי-תיאום Account Groups ל-BP Groupings — שגיאות-טווח-מספרים.",
            "התעלמות מ-PPO — שגיאות-סנכרון מצטברות בשקט.",
          ],
          troubleshootHe: [
            "BP לא מסונכרן ל-Vendor ➔ Synchronization כבוי בכיוון BP→Vendor; בדוק PPO.",
            "שגיאת-טווח בהמרה ➔ Account Group↔BP Grouping לא תואמים.",
            "המרה נכשלת ב-Cockpit ➔ נתוני-מקור פגומים; הרץ Pre-Checks שוב.",
          ],
          bestPracticeHe: [
            "הרץ Pre-Checks ותקן נתונים ב-ECC לפני ההמרה.",
            "השתמש ב-Number Range Sync 'Same' לשמירת מספרי-ספק היסטוריים.",
            "נקה את PPO לאפס-שגיאות לפני go-live.",
          ],
          interviewHe: [
            { qHe: "מהו CVI ולמה הוא חובה ב-S/4HANA?", aHe: "Customer/Vendor Integration — מסנכרן את ה-BP לרשומות-הספק/לקוח (LFA1/KNA1). חובה, כי בלעדיו ה-BP נוצר אך תהליכי ה-MM/FI הקוראים LFA1 לא יעבדו." },
            { qHe: "מהו תפקיד ה-Synchronization Cockpit (MDS_LOAD_COCKPIT)?", aHe: "להמיר/לסנכרן בכמות רשומות-ספק/לקוח קיימות ל-BPs בעת המרת-מערכת, עם דיווח-שגיאות ל-PPO." },
            { qHe: "מה ההבדל בין Number Range Synchronization 'Same' ל-'Different'?", aHe: "'Same' שומר על מספר-ספק זהה למספר-BP (פשוט ומומלץ); 'Different' מאפשר טווחים נפרדים אך מסבך את ההתאמה." },
          ],
          takeawaysHe: [
            "CVI = הגשר הדו-כיווני BP↔Vendor/Customer; חובה ב-S/4HANA.",
            "Number Range Sync 'Same' שומר מספרי-ספק היסטוריים.",
            "MDS_LOAD_COCKPIT ממיר בכמות; PPO מטפל בשגיאות.",
          ],
          relatedHe: [
            { labelHe: "אובייקט · CVI_VEND_LINK", href: "/library/mm/object/CVI_VEND_LINK/" },
            { labelHe: "אובייקט · LFA1", href: "/library/mm/object/LFA1/" },
          ],
        },
      ],
    },
    // ============================================================ 4.4
    {
      id: "4.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את שלושת עמודי-התווך של נתוני-האב ב-Sourcing & Procurement: אב-החומר וקבוצות-החומר (כולל Lean Services והרחבת מספר-החומר ל-40 תווים), ניהול-אצוות וסיריאליזציה לעקיבות, ומודל ה-Business Partner שבו ספקים מנוהלים כתפקיד-BP עם סנכרון CVI לרשומות-הספק הקלאסיות.",
      beginnerHe:
        "סיכמנו שלושה נושאים: (1) אב-החומר — כרטיס-הזהות של כל פריט, וקבוצות-חומר לקיבוץ; (2) אצוות וסיריאלים — מעקב אחרי כמות או אחרי יחידה; (3) Business Partner — הרשומה האחת לספקים ולקוחות, עם CVI שמחבר אותה לרשומות הישנות. כל אלה הם הבסיס שכל רכש נשען עליו.",
      consultantHe:
        "מבחינת-מימוש: אב-החומר נשלט דרך Material Types, Field Selection ו-Screen Sequences; קבוצת-החומר מחברת רכש ל-FI דרך Valuation Class; Batch/Serial מספקים עקיבות דרך Batch Level ו-Serial Profile; וה-BP הוא ה-mandatory model ב-S/4HANA — XK01/XD01 חסומות, ה-CVI סוגר את הפער ל-LFA1/LFB1/LFM1, וה-PPO מנהל שגיאות-סנכרון. שליטה בנושאים אלה היא תנאי-סף לכל מימוש MM.",
      purposeHe:
        "לעגן את התשתית של נתוני-האב לפני המעבר לתהליכים העסקיים (רכש, חשבונית, מלאי): בלי אב-חומר, קבוצות, עקיבות וספקים-כ-BP — אין על מה לבנות.",
      processExampleHe:
        "מסלול שלם: פותחים אב-חומר ROH מנוהל-אצווה, משייכים Material Group, מקימים את הספק כ-BP עם תפקידי-ספק ו-CVI, ואז יוצרים PO — כל נתוני-האב מתכנסים לכדי עסקת-רכש אחת.",
      cbcHe:
        "ב-CBC: ROH (תרכיז/סוכר/אריזה) מנוהלי-אצווה, מסווגים בקבוצות-חומר, נרכשים מספקים שכולם Business Partners מסונכרני-CVI — תשתית-נתוני-האב המלאה שעליה רץ רכש-מתקני-המילוי.",
      navHe: [
        "Logistics – General ► Material Master (אב-חומר וקבוצות)",
        "Logistics – General ► Batch Management / PM ► Serial Number Management (עקיבות)",
        "Cross-Application Components ► SAP Business Partner / CVI (ספקים)",
      ],
      tables: ["MARA", "T023", "MCH1", "OBJK", "BUT000", "LFA1"],
      tcodes: ["MM01", "OMSF", "MSC1N", "OIS2", "BP", "MDS_LOAD_COCKPIT"],
      fiori: ["F1602A", "F1576", "F0850A", "F3163"],
      configHe: [
        "אב-חומר: Material Types (OMS2), Field Selection (OMS9), Material Groups (OMSF).",
        "עקיבות: Batch Level + Number Range, Serial Number Profile (OIS2).",
        "ספקים: BP Roles + Groupings, CVI Activation + Number Range Sync.",
      ],
      mistakesHe: [
        "טיפול בנתוני-אב כב'משני' — שגיאות-אב מתפשטות לכל התהליכים.",
        "דילוג על הפעלת-CVI — ספקים נוצרים אך אינם תפעוליים.",
      ],
      troubleshootHe: [
        "תהליך-רכש נכשל ➔ חזור לנתוני-האב: תצוגת-חומר, קבוצה, או BP/CVI חסרים.",
        "עקיבות חסרה ➔ Batch/Serial לא הופעלו או לא הוגדרו נכון.",
      ],
      bestPracticeHe: [
        "בסס נתוני-אב נקיים ומתוקננים לפני go-live של תהליכים.",
        "אמץ את ה-BP ואת CVI כמודל-יחיד; בטל זרימות-Vendor קלאסיות.",
        "נהל עקיבות (Batch/Serial) רק היכן שהיא נדרשת באמת.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת עמודי-התווך של נתוני-האב ב-MM?", aHe: "אב-החומר (+קבוצות-חומר), ניהול-אצוות/סיריאליזציה (עקיבות), ומודל ה-Business Partner (ספקים) עם CVI." },
        { qHe: "מהו השינוי המהותי ביותר ב-S/4HANA בנתוני-האב של ספקים?", aHe: "המעבר ל-Business Partner כ-mandatory model: XK01/XD01 חסומות, וה-CVI מסנכרן את ה-BP ל-LFA1/LFB1/LFM1." },
      ],
      takeawaysHe: [
        "נתוני-אב = הבסיס לכל תהליכי-הרכש; שגיאה כאן מתפשטת לכל מקום.",
        "אב-חומר + קבוצות, אצוות + סיריאלים, ו-BP + CVI — שלושת עמודי-התווך.",
        "ב-S/4HANA ה-BP חובה; CVI מחבר אותו לרשומות-הספק הקלאסיות.",
      ],
      relatedHe: [
        { labelHe: "MM · אבות-חומר (4.1)", href: "/library/mm/chapter-04/#sub-4.1" },
        { labelHe: "MM · מודל Business Partner (4.3)", href: "/library/mm/chapter-04/#sub-4.3" },
      ],
    },
  ],
};
