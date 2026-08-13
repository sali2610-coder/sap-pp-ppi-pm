// GENERATED. Tables MERGED across module occurrences (never deduped) so a shared
// table such as AUFK keeps both its PM tcodes (IW31/IW32/IW33) and its PP-PI ones.
// Every tcode->table edge is derived from the real `tcodes` field. Nothing inferred.
export const DISCOVERY = {
 "tables": [
  {
   "name": "IFLOT",
   "he": "רשומת אב של מיקום פונקציונלי",
   "en": "Functional location master record",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "IL01/IL02/IL03; IH01, IH06",
     "s4": "ללא שינוי במודל הנתונים (תואם)"
    }
   ],
   "tcodes": [
    "IL01",
    "IL02",
    "IL03",
    "IH01",
    "IH06"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 6
  },
  {
   "name": "IFLOS",
   "he": "תוויות מבנה למיקום פונקציונלי",
   "en": "Functional Location Label",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "IL01/IL02/IL03; IH06",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IL01",
    "IL02",
    "IL03",
    "IH06"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 5
  },
  {
   "name": "ILOA",
   "he": "נתוני מיקום וחיוב משותפים",
   "en": "PM object location & account assignment",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "IL02; IE02 (ירושה)",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IL02",
    "IE02"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 6
  },
  {
   "name": "CRHD",
   "he": "כותרת מרכז עבודה / משאב",
   "en": "Work center header",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "IR01/IR02/IR03; CR05, CR06",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR01, CR02, CR03, CRC1",
     "s4": "ללא שינוי מבני; Fiori 'Manage Work Centers'."
    }
   ],
   "tcodes": [
    "IR01",
    "IR02",
    "IR03",
    "CR05",
    "CR06",
    "CR01",
    "CR02",
    "CR03",
    "CRC1"
   ],
   "fiori": [
    "Manage Work Centers (אמת ID)",
    "Manage Work Centers / Resources"
   ],
   "fields": 7
  },
  {
   "name": "CRTX",
   "he": "טקסטים למרכז עבודה",
   "en": "Work center texts",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "IR02; IR03",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR01, CR02, CR03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "IR02",
    "IR03",
    "CR01",
    "CR02",
    "CR03"
   ],
   "fiori": [
    "Manage Work Centers (אמת ID)",
    "Manage Work Centers / Resources"
   ],
   "fields": 4
  },
  {
   "name": "T370T",
   "he": "טבלת טקסט להגדרות מבנה/קטגוריות PM (Customizing)",
   "en": "PM structure/category customizing text table",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "1. מבנה ארגוני ותשתית",
     "tcodes": "SPRO; OIA1, OIMR",
     "s4": "ללא שינוי (Customizing תואם)"
    }
   ],
   "tcodes": [
    "SPRO",
    "OIA1",
    "OIMR"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 3
  },
  {
   "name": "EQUI",
   "he": "רשומת אב של ציוד",
   "en": "Equipment master record",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "2. ציוד ונתוני מאסטר",
     "tcodes": "IE01/IE02/IE03; IH08, IE05",
     "s4": "ללא שינוי במודל הנתונים (תואם)"
    }
   ],
   "tcodes": [
    "IE01",
    "IE02",
    "IE03",
    "IH08",
    "IE05"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 6
  },
  {
   "name": "EQKT",
   "he": "טקסטים (תיאורים) של ציוד",
   "en": "Equipment short texts",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "2. ציוד ונתוני מאסטר",
     "tcodes": "IE02; IE03",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IE02",
    "IE03"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 3
  },
  {
   "name": "EQUZ",
   "he": "פלח זמן של ציוד (התקנות/שיוך)",
   "en": "Equipment time segment",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "2. ציוד ונתוני מאסטר",
     "tcodes": "IE02; IE4N (התקנה/פירוק)",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IE02",
    "IE4N"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 5
  },
  {
   "name": "OBJK",
   "he": "רשימת אובייקטים / מספרים סידוריים",
   "en": "Object list / serial assignment",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "2. ציוד ונתוני מאסטר",
     "tcodes": "IQ01/IQ02/IQ03; IQ08, IQ09",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IQ01",
    "IQ02",
    "IQ03",
    "IQ08",
    "IQ09"
   ],
   "fiori": [
    "Manage Technical Objects (F2079)"
   ],
   "fields": 5
  },
  {
   "name": "STKO",
   "he": "כותרת עץ מוצר (BOM)",
   "en": "BOM header",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "3. עצי מוצר של אחזקה (BOM)",
     "tcodes": "IB01/CS01; CS02/CS03",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "CS01, CS02, CS03, CS11",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "IB01",
    "CS01",
    "CS02",
    "CS03",
    "CS11"
   ],
   "fiori": [
    "Manage Bills of Material (אמת ID)",
    "Manage Bills of Material"
   ],
   "fields": 6
  },
  {
   "name": "STPO",
   "he": "פריטי עץ מוצר (BOM)",
   "en": "BOM Item",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "3. עצי מוצר של אחזקה (BOM)",
     "tcodes": "IB02/CS02; CS11, CS15",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "CS01, CS02, CS03, CS12",
     "s4": "ללא שינוי; IDNRK מורחב 18->40."
    }
   ],
   "tcodes": [
    "IB02",
    "CS02",
    "CS11",
    "CS15",
    "CS01",
    "CS03",
    "CS12"
   ],
   "fiori": [
    "Manage Bills of Material (אמת ID)",
    "Manage Bills of Material"
   ],
   "fields": 9
  },
  {
   "name": "MAST",
   "he": "שיוך עץ מוצר (BOM) לחומר",
   "en": "Material-to-BOM link",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "3. עצי מוצר של אחזקה (BOM)",
     "tcodes": "CS01; CS02/CS03",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "CS01, CS02, CS03",
     "s4": "ללא שינוי; MATNR מורחב משפיע על המפתח ועל IDNRK."
    }
   ],
   "tcodes": [
    "CS01",
    "CS02",
    "CS03"
   ],
   "fiori": [
    "Manage Bills of Material (אמת ID)",
    "Manage Bills of Material"
   ],
   "fields": 5
  },
  {
   "name": "EQST",
   "he": "קישור ציוד לעץ מוצר",
   "en": "Equipment-to-BOM link",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "3. עצי מוצר של אחזקה (BOM)",
     "tcodes": "IB01; IB02/IB03",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IB01",
    "IB02",
    "IB03"
   ],
   "fiori": [
    "Manage Bills of Material (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "TPST",
   "he": "קישור מיקום פונקציונלי לעץ מוצר",
   "en": "Functional location-to-BOM link",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "3. עצי מוצר של אחזקה (BOM)",
     "tcodes": "IB11; IB12/IB13",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IB11",
    "IB12",
    "IB13"
   ],
   "fiori": [
    "Manage Bills of Material (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "IMPTT",
   "he": "רשומת אב של נקודת מדידה / מונה",
   "en": "Measuring point master",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "4. נקודות מדידה ומונים",
     "tcodes": "IK01/IK02/IK03; IK07, IK08",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IK01",
    "IK02",
    "IK03",
    "IK07",
    "IK08"
   ],
   "fiori": [
    "Manage Measurement Documents (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "IMRG",
   "he": "מסמכי מדידה (קריאות מונה/ערך)",
   "en": "Measurement documents / readings",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "4. נקודות מדידה ומונים",
     "tcodes": "IK11/IK12/IK13; IK21, IK41",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IK11",
    "IK12",
    "IK13",
    "IK21",
    "IK41"
   ],
   "fiori": [
    "Enter Measurement Readings (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "QPCD",
   "he": "קודים בתוך קבוצת קוד",
   "en": "Codes within a code group",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "5. קטלוגים, קודים ופרופילים",
     "tcodes": "QS51; QS61",
     "s4": "ללא שינוי (Customizing/Master תואם)"
    }
   ],
   "tcodes": [
    "QS51",
    "QS61"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 4
  },
  {
   "name": "QPGR",
   "he": "קבוצות קודים לאיכות",
   "en": "Code Group (Quality)",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "5. קטלוגים, קודים ופרופילים",
     "tcodes": "QS51; QS61",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "QS51",
    "QS61"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 4
  },
  {
   "name": "T352B",
   "he": "שיוך פרופיל קטלוג לקבוצות בחירה",
   "en": "Catalog profile to selection-set link",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "5. קטלוגים, קודים ופרופילים",
     "tcodes": "OIM1; OIN4",
     "s4": "ללא שינוי (Customizing תואם)"
    }
   ],
   "tcodes": [
    "OIM1",
    "OIN4"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 4
  },
  {
   "name": "T352",
   "he": "פרופיל קטלוג (כותרת)",
   "en": "Catalog profile header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "5. קטלוגים, קודים ופרופילים",
     "tcodes": "OIM1; QCC0",
     "s4": "ללא שינוי (Customizing תואם)"
    }
   ],
   "tcodes": [
    "OIM1",
    "QCC0"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 3
  },
  {
   "name": "QMEL",
   "he": "כותרת הודעת אחזקה",
   "en": "Notification header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "IW21/IW22/IW23; IW24, IW28/IW29",
     "s4": "ללא שינוי במודל הנתונים (תואם)"
    },
    {
     "module": "PM",
     "topic": "12. היסטוריה וארכיון",
     "tcodes": "IW64; IW66/IW67",
     "s4": "ללא שינוי; ניתוח דרך Analytics/CDS"
    }
   ],
   "tcodes": [
    "IW21",
    "IW22",
    "IW23",
    "IW24",
    "IW28",
    "IW29",
    "IW64",
    "IW66",
    "IW67"
   ],
   "fiori": [
    "Report Malfunction (F2215)",
    "Maintenance Backlog (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "QMFE",
   "he": "פריטי הודעת איכות (נזק / גורם)",
   "en": "Quality Notification Item",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "IW22; IW66",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IW22",
    "IW66"
   ],
   "fiori": [
    "Find Maintenance Notification (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "QMUR",
   "he": "סיבות לליקוי",
   "en": "Notification causes",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "IW22; IW67",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IW22",
    "IW67"
   ],
   "fiori": [
    "Find Maintenance Notification (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "QMMA",
   "he": "פעולות / אמצעים בהודעת איכות",
   "en": "Notification Activity",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "IW22; IW67",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IW22",
    "IW67"
   ],
   "fiori": [
    "Report Malfunction (F2215)"
   ],
   "fields": 4
  },
  {
   "name": "QMSM",
   "he": "משימות בהודעת איכות",
   "en": "Notification Task",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "IW22; IW66",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IW22",
    "IW66"
   ],
   "fiori": [
    "Find Maintenance Notification (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "TQ80",
   "he": "סוגי הודעה (הגדרה)",
   "en": "Notification Type (Customizing)",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "6. הודעות אחזקה (Notifications)",
     "tcodes": "OIAL (פריסת מסך); SPRO, QCC0",
     "s4": "ללא שינוי (Customizing תואם)"
    }
   ],
   "tcodes": [
    "OIAL",
    "SPRO",
    "QCC0"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 4
  },
  {
   "name": "AUFK",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Order master data",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW31/IW32/IW33; IW34, IW38/IW39",
     "s4": "מותאם - מודל נתונים פשוט יותר לפקודות"
    },
    {
     "module": "PM",
     "topic": "12. היסטוריה וארכיון",
     "tcodes": "IW39; IW13",
     "s4": "מותאם; עלות ב-ACDOCA"
    },
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR1, COR2, COR3, CO01, KO04",
     "s4": "מודל מותאם; עלויות ב-ACDOCA."
    }
   ],
   "tcodes": [
    "IW31",
    "IW32",
    "IW33",
    "IW34",
    "IW38",
    "IW39",
    "IW13",
    "COR1",
    "COR2",
    "COR3",
    "CO01",
    "KO04"
   ],
   "fiori": [
    "Find Maintenance Order (F2393)",
    "Manage Process Orders"
   ],
   "fields": 5
  },
  {
   "name": "AFKO",
   "he": "נתוני כותרת פקודת ייצור / תהליך",
   "en": "Order header data",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW32; IW37N",
     "s4": "מותאם (תואם עם פישוטי תזמון)"
    },
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR1, COR2, COR3, COR6N, COHVPI",
     "s4": "מותאם (תואם)."
    }
   ],
   "tcodes": [
    "IW32",
    "IW37N",
    "COR1",
    "COR2",
    "COR3",
    "COR6N",
    "COHVPI"
   ],
   "fiori": [
    "Create Maintenance Order (אמת ID)",
    "Manage Process Orders"
   ],
   "fields": 6
  },
  {
   "name": "AFVC",
   "he": "פעולות הפקודה",
   "en": "Order Operation",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW31/IW32/IW33; IW37N, CM01",
     "s4": "מותאם (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR2, COR3, CA02",
     "s4": "מותאם (תואם)."
    }
   ],
   "tcodes": [
    "IW31",
    "IW32",
    "IW33",
    "IW37N",
    "CM01",
    "COR2",
    "COR3",
    "CA02"
   ],
   "fiori": [
    "Find Maintenance Order (F2393)",
    "Manage Process Orders"
   ],
   "fields": 6
  },
  {
   "name": "AFPO",
   "he": "פריטי פקודת ייצור",
   "en": "Order item",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW32; IW33",
     "s4": "מותאם (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR2, COR3, COHVPI",
     "s4": "מותאם (תואם)."
    }
   ],
   "tcodes": [
    "IW32",
    "IW33",
    "COR2",
    "COR3",
    "COHVPI"
   ],
   "fiori": [
    "Find Maintenance Order (F2393)",
    "Manage Process Orders"
   ],
   "fields": 5
  },
  {
   "name": "AFIH",
   "he": "כותרת פקודת אחזקה (PM)",
   "en": "Maintenance Order Header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW32; IW33",
     "s4": "מותאם (תואם)"
    }
   ],
   "tcodes": [
    "IW32",
    "IW33"
   ],
   "fiori": [
    "Find Maintenance Order (F2393)"
   ],
   "fields": 6
  },
  {
   "name": "AFWI",
   "he": "תנועות מלאי המקושרות לדיווחי ביצוע",
   "en": "Goods movements for confirmations",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "IW41; IW42",
     "s4": "מותאם (תנועת מלאי ב-MATDOC)"
    }
   ],
   "tcodes": [
    "IW41",
    "IW42"
   ],
   "fiori": [
    "Confirm Maintenance Order (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "T003O",
   "he": "סוגי פקודה (הגדרה)",
   "en": "Order Types (Customizing)",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "7. פקודות עבודה (פק\"ע)",
     "tcodes": "SPRO; OIOA, KOT2_OPA",
     "s4": "ללא שינוי (Customizing תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [
    "SPRO",
    "OIOA",
    "KOT2_OPA"
   ],
   "fiori": [
    "אין Fiori ייעודי (Customizing)"
   ],
   "fields": 4
  },
  {
   "name": "JEST",
   "he": "סטטוסי אובייקט פעילים",
   "en": "Individual object status",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "8. ניהול סטטוסים (Status Mgmt)",
     "tcodes": "BS22/BS23; IW33, IE03",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "BS22, BS23, IW33, COR3",
     "s4": "ללא שינוי; ניהול סטטוס זהה ב-S/4."
    }
   ],
   "tcodes": [
    "BS22",
    "BS23",
    "IW33",
    "IE03",
    "COR3"
   ],
   "fiori": [
    "מוטמע באפליקציות PM (אין ייעודי)"
   ],
   "fields": 4
  },
  {
   "name": "JSTO",
   "he": "פרופיל סטטוס לאובייקט",
   "en": "Status object header + profile",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "8. ניהול סטטוסים (Status Mgmt)",
     "tcodes": "BS02/BS03; OIBS",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "BS02, BS22",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "BS02",
    "BS03",
    "OIBS",
    "BS22"
   ],
   "fiori": [
    "מוטמע באפליקציות PM (אין ייעודי)"
   ],
   "fields": 4
  },
  {
   "name": "TJ02T",
   "he": "טקסטים של סטטוסי מערכת",
   "en": "System status texts",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "8. ניהול סטטוסים (Status Mgmt)",
     "tcodes": "BS23; BS22",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "BS23",
    "BS22"
   ],
   "fiori": [
    "מוטמע (אין ייעודי)"
   ],
   "fields": 4
  },
  {
   "name": "TJ30T",
   "he": "טקסטים לסטטוס משתמש",
   "en": "User status texts",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "8. ניהול סטטוסים (Status Mgmt)",
     "tcodes": "BS02; BS03",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "BS02",
    "BS03"
   ],
   "fiori": [
    "מוטמע (אין ייעודי)"
   ],
   "fields": 5
  },
  {
   "name": "TJ30",
   "he": "סטטוסי משתמש (הגדרה)",
   "en": "User Status (Customizing)",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "8. ניהול סטטוסים (Status Mgmt)",
     "tcodes": "BS02/BS03; OIBS",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "BS02",
    "BS03",
    "OIBS"
   ],
   "fiori": [
    "מוטמע באפליקציות PM (אין ייעודי)"
   ],
   "fields": 5
  },
  {
   "name": "RESB",
   "he": "הזמנת רכיבים (Reservation)",
   "en": "Reservation / dependent requirements",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "MB1A/MIGO; MB21, IW32",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR3, MB21, MB22, CO27",
     "s4": "ללא שינוי; תנועת מלאי ב-MATDOC."
    }
   ],
   "tcodes": [
    "MB1A",
    "MIGO",
    "MB21",
    "IW32",
    "COR3",
    "MB22",
    "CO27"
   ],
   "fiori": [
    "Post Goods Movement / MIGO (אמת ID)",
    "Manage Reservations"
   ],
   "fields": 6
  },
  {
   "name": "EBAN",
   "he": "דרישת רכש (Purchase Requisition)",
   "en": "Purchase requisition",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "ME51N; ME52N/ME53N, ME57",
     "s4": "מותאם (Business Partner לספקים)"
    }
   ],
   "tcodes": [
    "ME51N",
    "ME52N",
    "ME53N",
    "ME57"
   ],
   "fiori": [
    "Manage Purchase Requisitions (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "EBKN",
   "he": "חיוב דרישת רכש (לפק\"ע)",
   "en": "Requisition account assignment",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "ME51N; ME52N",
     "s4": "מותאם (חיוב ל-ACDOCA)"
    }
   ],
   "tcodes": [
    "ME51N",
    "ME52N"
   ],
   "fiori": [
    "Manage Purchase Requisitions (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "MSEG",
   "he": "פריטי מסמך חומר (תנועות מלאי)",
   "en": "Material document items",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "MIGO/MB1A; MB31, MB1C",
     "s4": "הוחלף - מסמכי חומר מאוחדים ב-MATDOC"
    }
   ],
   "tcodes": [
    "MIGO",
    "MB1A",
    "MB31",
    "MB1C"
   ],
   "fiori": [
    "Post Goods Movement (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "MKPF",
   "he": "כותרת מסמך חומר",
   "en": "Material document header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "MIGO; MB1A",
     "s4": "הוחלף - מאוחד ב-MATDOC"
    }
   ],
   "tcodes": [
    "MIGO",
    "MB1A"
   ],
   "fiori": [
    "Post Goods Movement (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "BUT000",
   "he": "נתוני אב שותף עסקי",
   "en": "Business Partner — General Data",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
     "tcodes": "BP; (ECC: XK01/MK01 לספקים)",
     "s4": "הוחלף - Business Partner מחליף ספקים/לקוחות (CVI חובה)"
    },
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "הוחלף - Business Partner חובה (CVI); ראה SAP Note 2265093."
    }
   ],
   "tcodes": [
    "BP",
    "XK01",
    "MK01"
   ],
   "fiori": [
    "Manage Business Partner Master Data (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "COSP",
   "he": "סך עלויות חיצוניות (Primary)",
   "en": "CO object cost totals - external postings",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "10. עלויות והתחשבנות (PM-CO)",
     "tcodes": "KO88/KO8G; KOB1, S_ALR_87013611",
     "s4": "הוחלף - עלויות ב-Universal Journal"
    }
   ],
   "tcodes": [
    "KO88",
    "KO8G",
    "KOB1"
   ],
   "fiori": [
    "Maintenance Order Actuals (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "COSS",
   "he": "סך עלויות פנימיות (Secondary)",
   "en": "CO object cost totals - internal postings",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "10. עלויות והתחשבנות (PM-CO)",
     "tcodes": "KO88; KOB1",
     "s4": "הוחלף - עלויות ב-Universal Journal"
    }
   ],
   "tcodes": [
    "KO88",
    "KOB1"
   ],
   "fiori": [
    "Maintenance Order Actuals (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "COBRA",
   "he": "כותרת חוק התחשבנות",
   "en": "Settlement rule header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "10. עלויות והתחשבנות (PM-CO)",
     "tcodes": "KO02; IW32",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "KO02",
    "IW32"
   ],
   "fiori": [
    "Manage Settlement Rules (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "COBRB",
   "he": "פריטי חוק התחשבנות (חוקי חלוקה)",
   "en": "Settlement / distribution rules",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "10. עלויות והתחשבנות (PM-CO)",
     "tcodes": "KO02; IW32",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "KO02",
    "IW32"
   ],
   "fiori": [
    "Manage Settlement Rules (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "PLKO",
   "he": "כותרת רשימת פעולות (Routing)",
   "en": "Task list header",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IA05/IA01/IA11; IA06, IA08",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C201, C202, C203, CA01",
     "s4": "ללא שינוי מבני; Fiori 'Manage Master Recipes'."
    }
   ],
   "tcodes": [
    "IA05",
    "IA01",
    "IA11",
    "IA06",
    "IA08",
    "C201",
    "C202",
    "C203",
    "CA01"
   ],
   "fiori": [
    "Manage Task Lists (אמת ID)",
    "Manage Master Recipes"
   ],
   "fields": 7
  },
  {
   "name": "PLPO",
   "he": "פעולות ברשימת הפעולות",
   "en": "Task list operations",
   "modules": [
    "PM",
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IA01/IA05; IA06",
     "s4": "ללא שינוי (תואם)"
    },
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C201, C202, C203, CA02",
     "s4": "ללא שינוי; ביצוע דרך Control Recipe / PI sheet."
    }
   ],
   "tcodes": [
    "IA01",
    "IA05",
    "IA06",
    "C201",
    "C202",
    "C203",
    "CA02"
   ],
   "fiori": [
    "Manage Task Lists (אמת ID)",
    "Manage Master Recipes"
   ],
   "fields": 9
  },
  {
   "name": "MPLA",
   "he": "כותרת תכנית אחזקה ונתוני תזמון",
   "en": "Maintenance plan header",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IP01/IP02/IP03; IP41, IP42",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IP01",
    "IP02",
    "IP03",
    "IP41",
    "IP42"
   ],
   "fiori": [
    "Manage Maintenance Plans (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "MPOS",
   "he": "פריט תכנית אחזקה",
   "en": "Maintenance item",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IP04; IP02",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IP04",
    "IP02"
   ],
   "fiori": [
    "Manage Maintenance Plans (אמת ID)"
   ],
   "fields": 6
  },
  {
   "name": "MHIO",
   "he": "אובייקטי קריאת תכנית האחזקה",
   "en": "Maintenance plan call objects",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IP10; IP30, IP24",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IP10",
    "IP30",
    "IP24"
   ],
   "fiori": [
    "Schedule Maintenance Plans (אמת ID)"
   ],
   "fields": 5
  },
  {
   "name": "MHIS",
   "he": "היסטוריית תזמון תכנית אחזקה",
   "en": "Maintenance plan scheduling history",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "11. אחזקה מונעת ותוכניות",
     "tcodes": "IP10; IP30",
     "s4": "ללא שינוי (תואם)"
    }
   ],
   "tcodes": [
    "IP10",
    "IP30"
   ],
   "fiori": [
    "Schedule Maintenance Plans (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "ADMI_RUN",
   "he": "ריצות ניהול ארכוב (Archiving)",
   "en": "Archiving Run",
   "modules": [
    "PM"
   ],
   "contexts": [
    {
     "module": "PM",
     "topic": "12. היסטוריה וארכיון",
     "tcodes": "SARA; AOBJ, DB15",
     "s4": "ללא שינוי; ILM אופציונלי ב-S/4"
    }
   ],
   "tcodes": [
    "SARA",
    "AOBJ",
    "DB15"
   ],
   "fiori": [
    "Data Archiving (אמת ID)"
   ],
   "fields": 4
  },
  {
   "name": "MARA",
   "he": "נתוני חומר כלליים",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03",
     "s4": "MATNR מורחב 18->40 (SAP Note 2267140); בדוק ממשקים, ברקודים והמרות EAN."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03"
   ],
   "fiori": [
    "Manage Product Master Data"
   ],
   "fields": 8
  },
  {
   "name": "MAKT",
   "he": "טקסטים לתיאור חומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03",
     "s4": "ללא שינוי; MATNR מורחב משפיע על המפתח."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03"
   ],
   "fiori": [
    "Manage Product Master Data"
   ],
   "fields": 4
  },
  {
   "name": "MARC",
   "he": "נתוני חומר ברמת מפעל",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03, MD04",
     "s4": "MRP Live מחליף MRP קלאסי; שדות תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03",
    "MD04"
   ],
   "fiori": [
    "Manage Product Master Data — Plant"
   ],
   "fields": 8
  },
  {
   "name": "MARD",
   "he": "מלאי חומר ברמת אחסון",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM03, MMBE, MB52",
     "s4": "מלאי מנוהל ב-MATDOC; MARD הופך ל-Aggregate/View."
    }
   ],
   "tcodes": [
    "MM03",
    "MMBE",
    "MB52"
   ],
   "fiori": [
    "Manage Stock"
   ],
   "fields": 5
  },
  {
   "name": "MARM",
   "he": "יחידות מידה לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03",
     "s4": "ללא שינוי מבני; אמת מקדמי עיגול (rounding) למניעת סטיות מלאי."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03"
   ],
   "fiori": [
    "Manage Product Master Data"
   ],
   "fields": 6
  },
  {
   "name": "MEAN",
   "he": "מספרי EAN / ברקוד לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03"
   ],
   "fiori": [],
   "fields": 5
  },
  {
   "name": "MBEW",
   "he": "הערכת שווי חומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM03, CK11N, CK24, MR21",
     "s4": "Material Ledger חובה ב-S/4HANA; הערכה ב-ACDOCA/ACDOCC."
    }
   ],
   "tcodes": [
    "MM03",
    "CK11N",
    "CK24",
    "MR21"
   ],
   "fiori": [
    "Manage Material Valuation"
   ],
   "fields": 6
  },
  {
   "name": "MVKE",
   "he": "נתוני מכירה לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03, VK11",
     "s4": "ללא שינוי; לקוחות דרך Business Partner."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03",
    "VK11"
   ],
   "fiori": [
    "Manage Product Master Data — Sales"
   ],
   "fields": 4
  },
  {
   "name": "MLAN",
   "he": "נתוני מס מכירה לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, MM03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "MM03"
   ],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "MLGN",
   "he": "נתוני חומר ברמת מספר מחסן (WM)",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, LS24",
     "s4": "EWM אסטרטגי; LE-WM קלאסי נתמך עם הגבלות."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "LS24"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "MLGT",
   "he": "נתוני חומר לסוג אחסון (WM)",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM01, MM02, LS24",
     "s4": "EWM אסטרטגי."
    }
   ],
   "tcodes": [
    "MM01",
    "MM02",
    "LS24"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "MDMA",
   "he": "נתוני MRP לאזור MRP",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MM02, MD04, MD61",
     "s4": "אזורי MRP פעילים כברירת מחדל ב-MRP Live."
    }
   ],
   "tcodes": [
    "MM02",
    "MD04",
    "MD61"
   ],
   "fiori": [
    "Monitor Material Coverage"
   ],
   "fields": 4
  },
  {
   "name": "QMAT",
   "he": "הגדרת בדיקת איכות לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "QM01, MM02",
     "s4": "ללא שינוי מבני."
    }
   ],
   "tcodes": [
    "QM01",
    "MM02"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "MCH1",
   "he": "נתוני אצווה לחומר (חוצה-מפעל)",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MSC1N, MSC2N, MSC3N",
     "s4": "ללא שינוי מבני; MATNR מורחב 18->40 במפתח."
    }
   ],
   "tcodes": [
    "MSC1N",
    "MSC2N",
    "MSC3N"
   ],
   "fiori": [
    "Manage Batches"
   ],
   "fields": 7
  },
  {
   "name": "MCHA",
   "he": "נתוני אצווה ברמת מפעל",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "MSC1N, MSC2N, MSC3N",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "MSC1N",
    "MSC2N",
    "MSC3N"
   ],
   "fiori": [
    "Manage Batches"
   ],
   "fields": 4
  },
  {
   "name": "T006",
   "he": "יחידת מידה",
   "en": "Unit of measure",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "1. נתוני אב חומר ויחידות מידה (",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 5
  },
  {
   "name": "STAS",
   "he": "שיוך פריטי עץ מוצר",
   "en": "BOM category",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "CS01, CS02, CS03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CS01",
    "CS02",
    "CS03"
   ],
   "fiori": [],
   "fields": 5
  },
  {
   "name": "STZU",
   "he": "ניהול והיסטוריית עץ מוצר",
   "en": "BOM category",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "CC01, CC02, CS03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CC01",
    "CC02",
    "CS03"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "STPU",
   "he": "מספר צומת פריט",
   "en": "Item node number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "KDST",
   "he": "מסמך מכירה",
   "en": "Sales document",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "2. עץ מוצר (BOM)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "PLAS",
   "he": "שיוך פעולות לרשימת פעולות",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C202, C203",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "C202",
    "C203"
   ],
   "fiori": [
    "Manage Master Recipes"
   ],
   "fields": 6
  },
  {
   "name": "PLFL",
   "he": "רצפים ברשימת פעולות",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C202, C203",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "C202",
    "C203"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "PLMZ",
   "he": "הקצאת רכיבי BOM לפעולות",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C202, CS08",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "C202",
    "CS08"
   ],
   "fiori": [],
   "fields": 5
  },
  {
   "name": "PLMK",
   "he": "מאפייני בדיקה ברשימת פעולות",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "QP01, QP02, C202",
     "s4": "ללא שינוי מבני."
    }
   ],
   "tcodes": [
    "QP01",
    "QP02",
    "C202"
   ],
   "fiori": [],
   "fields": 6
  },
  {
   "name": "MAPL",
   "he": "שיוך רשימת פעולות לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "CA01, CA02, CA03, C201",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CA01",
    "CA02",
    "CA03",
    "C201"
   ],
   "fiori": [
    "Manage Routings / Recipes"
   ],
   "fields": 5
  },
  {
   "name": "FHMI",
   "he": "אב אמצעי ייצור (PRT) — מבוסס חומר",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "CFV1, CFV2, CFV3",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CFV1",
    "CFV2",
    "CFV3"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "PLZU",
   "he": "ניהול שינויים לרשימת פעולות",
   "en": "Task list type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "C298, CC01",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "C298",
    "CC01"
   ],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "TC60",
   "he": "מפתח בקרה",
   "en": "Control key",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "TCA01",
   "he": "מזהה פרופיל",
   "en": "Profile ID",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "3. מתכון ייצור ופעולות (Master ",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "MKAL",
   "he": "גרסאות ייצור לחומר",
   "en": "Material number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "4. גרסאות ייצור (Production Ver",
     "tcodes": "C223, MM02",
     "s4": "חובה 100% ב-S/4HANA - הרץ C223 ובדוק תוקף/עקביות לכל חומר מיוצר לפני ההמרה (Pre-check קריטי)."
    }
   ],
   "tcodes": [
    "C223",
    "MM02"
   ],
   "fiori": [
    "Manage Production Versions"
   ],
   "fields": 15
  },
  {
   "name": "CRCO",
   "he": "הקצאת מרכז עלות למרכז עבודה",
   "en": "Object type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR01, CR02, KS01",
     "s4": "התחשבנות ב-Universal Journal (ACDOCA); הקצאה נשמרת."
    }
   ],
   "tcodes": [
    "CR01",
    "CR02",
    "KS01"
   ],
   "fiori": [],
   "fields": 6
  },
  {
   "name": "CRCA",
   "he": "הקצאות קיבולת למרכז עבודה",
   "en": "Object type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR11, CR12, CR13",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CR11",
    "CR12",
    "CR13"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "KAKO",
   "he": "קטגוריית קיבולת (כותרת)",
   "en": "Capacity ID",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR11, CR12, CR13",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CR11",
    "CR12",
    "CR13"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "CRFH",
   "he": "אב אמצעי ייצור (PRT) — מבוסס מרכז עבודה",
   "en": "Object type (F=PRT)",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CFC1, CFC2, CFC3",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CFC1",
    "CFC2",
    "CFC3"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "CRVD_A",
   "he": "קשרי ברירת מחדל למרכז עבודה",
   "en": "Object type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR02, CR03",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "CR02",
    "CR03"
   ],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "CSLA",
   "he": "סוג פעילות",
   "en": "Activity type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "",
     "s4": "תעריפים ב-Universal Journal; הגדרה נשמרת."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "KAZT",
   "he": "מרווחי זמן ומשמרות לקיבולת",
   "en": "Capacity ID",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "5. משאבים  מרכזי עבודה (Resourc",
     "tcodes": "CR11, CR12, CR13",
     "s4": "ללא שינוי מבני."
    }
   ],
   "tcodes": [
    "CR11",
    "CR12",
    "CR13"
   ],
   "fiori": [],
   "fields": 6
  },
  {
   "name": "AFRU",
   "he": "מספר דיווח",
   "en": "Confirmation number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "CORK, COR6N, CO11N, CO15",
     "s4": "ללא שינוי; עלויות ב-ACDOCA."
    }
   ],
   "tcodes": [
    "CORK",
    "COR6N",
    "CO11N",
    "CO15"
   ],
   "fiori": [
    "Confirm Production Operation"
   ],
   "fields": 5
  },
  {
   "name": "AFFH",
   "he": "הקצאת PRT לפעולת פקודה",
   "en": "Routing number",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR2, CFC2",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [
    "COR2",
    "CFC2"
   ],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "AFFL",
   "he": "רצף פעולות בפקודה",
   "en": "Routing number of operations",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
     "tcodes": "COR2, COR3",
     "s4": "מותאם (תואם)."
    }
   ],
   "tcodes": [
    "COR2",
    "COR3"
   ],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "T134",
   "he": "סוגי חומר (הגדרה)",
   "en": "Material type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "T134T",
   "he": "טקסטים לסוג חומר",
   "en": "Material type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "T023",
   "he": "קבוצות חומר (הגדרה)",
   "en": "Material group",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 2
  },
  {
   "name": "T023T",
   "he": "טקסטים לקבוצת חומר",
   "en": "Material group",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "T399X",
   "he": "פרמטרי בקרת MRP למפעל",
   "en": "Plant",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "TCK03",
   "he": "וריאנט תמחיר",
   "en": "Costing variant",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "תואם; הערכה ב-Material Ledger/ACDOCA."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 3
  },
  {
   "name": "T438M",
   "he": "סוג MRP",
   "en": "MRP type",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "MRP Live - חלק מהפרמטרים מותאמים; אמת מול SAP Help."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 2
  },
  {
   "name": "TCO01",
   "he": "מפעל",
   "en": "Plant",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 4
  },
  {
   "name": "TC22",
   "he": "מפתח בקרה",
   "en": "Control key",
   "modules": [
    "PP-PI"
   ],
   "contexts": [
    {
     "module": "PP-PI",
     "topic": "7. קונפיגורציה (Customizing)",
     "tcodes": "",
     "s4": "ללא שינוי (Customizing)."
    }
   ],
   "tcodes": [],
   "fiori": [],
   "fields": 4
  }
 ],
 "tcodeIndex": {
  "IL01": [
   "IFLOT",
   "IFLOS"
  ],
  "IL02": [
   "IFLOT",
   "IFLOS",
   "ILOA"
  ],
  "IL03": [
   "IFLOT",
   "IFLOS"
  ],
  "IH01": [
   "IFLOT"
  ],
  "IH06": [
   "IFLOT",
   "IFLOS"
  ],
  "IE02": [
   "ILOA",
   "EQUI",
   "EQKT",
   "EQUZ"
  ],
  "IR01": [
   "CRHD"
  ],
  "IR02": [
   "CRHD",
   "CRTX"
  ],
  "IR03": [
   "CRHD",
   "CRTX"
  ],
  "CR05": [
   "CRHD"
  ],
  "CR06": [
   "CRHD"
  ],
  "CR01": [
   "CRHD",
   "CRTX",
   "CRCO"
  ],
  "CR02": [
   "CRHD",
   "CRTX",
   "CRCO",
   "CRVD_A"
  ],
  "CR03": [
   "CRHD",
   "CRTX",
   "CRVD_A"
  ],
  "CRC1": [
   "CRHD"
  ],
  "SPRO": [
   "T370T",
   "TQ80",
   "T003O"
  ],
  "OIA1": [
   "T370T"
  ],
  "OIMR": [
   "T370T"
  ],
  "IE01": [
   "EQUI"
  ],
  "IE03": [
   "EQUI",
   "EQKT",
   "JEST"
  ],
  "IH08": [
   "EQUI"
  ],
  "IE05": [
   "EQUI"
  ],
  "IE4N": [
   "EQUZ"
  ],
  "IQ01": [
   "OBJK"
  ],
  "IQ02": [
   "OBJK"
  ],
  "IQ03": [
   "OBJK"
  ],
  "IQ08": [
   "OBJK"
  ],
  "IQ09": [
   "OBJK"
  ],
  "IB01": [
   "STKO",
   "EQST"
  ],
  "CS01": [
   "STKO",
   "STPO",
   "MAST",
   "STAS"
  ],
  "CS02": [
   "STKO",
   "STPO",
   "MAST",
   "STAS"
  ],
  "CS03": [
   "STKO",
   "STPO",
   "MAST",
   "STAS",
   "STZU"
  ],
  "CS11": [
   "STKO",
   "STPO"
  ],
  "IB02": [
   "STPO",
   "EQST"
  ],
  "CS15": [
   "STPO"
  ],
  "CS12": [
   "STPO"
  ],
  "IB03": [
   "EQST"
  ],
  "IB11": [
   "TPST"
  ],
  "IB12": [
   "TPST"
  ],
  "IB13": [
   "TPST"
  ],
  "IK01": [
   "IMPTT"
  ],
  "IK02": [
   "IMPTT"
  ],
  "IK03": [
   "IMPTT"
  ],
  "IK07": [
   "IMPTT"
  ],
  "IK08": [
   "IMPTT"
  ],
  "IK11": [
   "IMRG"
  ],
  "IK12": [
   "IMRG"
  ],
  "IK13": [
   "IMRG"
  ],
  "IK21": [
   "IMRG"
  ],
  "IK41": [
   "IMRG"
  ],
  "QS51": [
   "QPCD",
   "QPGR"
  ],
  "QS61": [
   "QPCD",
   "QPGR"
  ],
  "OIM1": [
   "T352B",
   "T352"
  ],
  "OIN4": [
   "T352B"
  ],
  "QCC0": [
   "T352",
   "TQ80"
  ],
  "IW21": [
   "QMEL"
  ],
  "IW22": [
   "QMEL",
   "QMFE",
   "QMUR",
   "QMMA",
   "QMSM"
  ],
  "IW23": [
   "QMEL"
  ],
  "IW24": [
   "QMEL"
  ],
  "IW28": [
   "QMEL"
  ],
  "IW29": [
   "QMEL"
  ],
  "IW64": [
   "QMEL"
  ],
  "IW66": [
   "QMEL",
   "QMFE",
   "QMSM"
  ],
  "IW67": [
   "QMEL",
   "QMUR",
   "QMMA"
  ],
  "OIAL": [
   "TQ80"
  ],
  "IW31": [
   "AUFK",
   "AFVC"
  ],
  "IW32": [
   "AUFK",
   "AFKO",
   "AFVC",
   "AFPO",
   "AFIH",
   "RESB",
   "COBRA",
   "COBRB"
  ],
  "IW33": [
   "AUFK",
   "AFVC",
   "AFPO",
   "AFIH",
   "JEST"
  ],
  "IW34": [
   "AUFK"
  ],
  "IW38": [
   "AUFK"
  ],
  "IW39": [
   "AUFK"
  ],
  "IW13": [
   "AUFK"
  ],
  "COR1": [
   "AUFK",
   "AFKO"
  ],
  "COR2": [
   "AUFK",
   "AFKO",
   "AFVC",
   "AFPO",
   "AFFH",
   "AFFL"
  ],
  "COR3": [
   "AUFK",
   "AFKO",
   "AFVC",
   "AFPO",
   "JEST",
   "RESB",
   "AFFL"
  ],
  "CO01": [
   "AUFK"
  ],
  "KO04": [
   "AUFK"
  ],
  "IW37N": [
   "AFKO",
   "AFVC"
  ],
  "COR6N": [
   "AFKO",
   "AFRU"
  ],
  "COHVPI": [
   "AFKO",
   "AFPO"
  ],
  "CM01": [
   "AFVC"
  ],
  "CA02": [
   "AFVC",
   "PLPO",
   "MAPL"
  ],
  "IW41": [
   "AFWI"
  ],
  "IW42": [
   "AFWI"
  ],
  "OIOA": [
   "T003O"
  ],
  "KOT2_OPA": [
   "T003O"
  ],
  "BS22": [
   "JEST",
   "JSTO",
   "TJ02T"
  ],
  "BS23": [
   "JEST",
   "TJ02T"
  ],
  "BS02": [
   "JSTO",
   "TJ30T",
   "TJ30"
  ],
  "BS03": [
   "JSTO",
   "TJ30T",
   "TJ30"
  ],
  "OIBS": [
   "JSTO",
   "TJ30"
  ],
  "MB1A": [
   "RESB",
   "MSEG",
   "MKPF"
  ],
  "MIGO": [
   "RESB",
   "MSEG",
   "MKPF"
  ],
  "MB21": [
   "RESB"
  ],
  "MB22": [
   "RESB"
  ],
  "CO27": [
   "RESB"
  ],
  "ME51N": [
   "EBAN",
   "EBKN"
  ],
  "ME52N": [
   "EBAN",
   "EBKN"
  ],
  "ME53N": [
   "EBAN"
  ],
  "ME57": [
   "EBAN"
  ],
  "MB31": [
   "MSEG"
  ],
  "MB1C": [
   "MSEG"
  ],
  "BP": [
   "BUT000"
  ],
  "XK01": [
   "BUT000"
  ],
  "MK01": [
   "BUT000"
  ],
  "KO88": [
   "COSP",
   "COSS"
  ],
  "KO8G": [
   "COSP"
  ],
  "KOB1": [
   "COSP",
   "COSS"
  ],
  "KO02": [
   "COBRA",
   "COBRB"
  ],
  "IA05": [
   "PLKO",
   "PLPO"
  ],
  "IA01": [
   "PLKO",
   "PLPO"
  ],
  "IA11": [
   "PLKO"
  ],
  "IA06": [
   "PLKO",
   "PLPO"
  ],
  "IA08": [
   "PLKO"
  ],
  "C201": [
   "PLKO",
   "PLPO",
   "MAPL"
  ],
  "C202": [
   "PLKO",
   "PLPO",
   "PLAS",
   "PLFL",
   "PLMZ",
   "PLMK"
  ],
  "C203": [
   "PLKO",
   "PLPO",
   "PLAS",
   "PLFL"
  ],
  "CA01": [
   "PLKO",
   "MAPL"
  ],
  "IP01": [
   "MPLA"
  ],
  "IP02": [
   "MPLA",
   "MPOS"
  ],
  "IP03": [
   "MPLA"
  ],
  "IP41": [
   "MPLA"
  ],
  "IP42": [
   "MPLA"
  ],
  "IP04": [
   "MPOS"
  ],
  "IP10": [
   "MHIO",
   "MHIS"
  ],
  "IP30": [
   "MHIO",
   "MHIS"
  ],
  "IP24": [
   "MHIO"
  ],
  "SARA": [
   "ADMI_RUN"
  ],
  "AOBJ": [
   "ADMI_RUN"
  ],
  "DB15": [
   "ADMI_RUN"
  ],
  "MM01": [
   "MARA",
   "MAKT",
   "MARC",
   "MARM",
   "MEAN",
   "MVKE",
   "MLAN",
   "MLGN",
   "MLGT"
  ],
  "MM02": [
   "MARA",
   "MAKT",
   "MARC",
   "MARM",
   "MEAN",
   "MVKE",
   "MLAN",
   "MLGN",
   "MLGT",
   "MDMA",
   "QMAT",
   "MKAL"
  ],
  "MM03": [
   "MARA",
   "MAKT",
   "MARC",
   "MARD",
   "MARM",
   "MEAN",
   "MBEW",
   "MVKE",
   "MLAN"
  ],
  "MD04": [
   "MARC",
   "MDMA"
  ],
  "MMBE": [
   "MARD"
  ],
  "MB52": [
   "MARD"
  ],
  "CK11N": [
   "MBEW"
  ],
  "CK24": [
   "MBEW"
  ],
  "MR21": [
   "MBEW"
  ],
  "VK11": [
   "MVKE"
  ],
  "LS24": [
   "MLGN",
   "MLGT"
  ],
  "MD61": [
   "MDMA"
  ],
  "QM01": [
   "QMAT"
  ],
  "MSC1N": [
   "MCH1",
   "MCHA"
  ],
  "MSC2N": [
   "MCH1",
   "MCHA"
  ],
  "MSC3N": [
   "MCH1",
   "MCHA"
  ],
  "CC01": [
   "STZU",
   "PLZU"
  ],
  "CC02": [
   "STZU"
  ],
  "CS08": [
   "PLMZ"
  ],
  "QP01": [
   "PLMK"
  ],
  "QP02": [
   "PLMK"
  ],
  "CA03": [
   "MAPL"
  ],
  "CFV1": [
   "FHMI"
  ],
  "CFV2": [
   "FHMI"
  ],
  "CFV3": [
   "FHMI"
  ],
  "C298": [
   "PLZU"
  ],
  "C223": [
   "MKAL"
  ],
  "KS01": [
   "CRCO"
  ],
  "CR11": [
   "CRCA",
   "KAKO",
   "KAZT"
  ],
  "CR12": [
   "CRCA",
   "KAKO",
   "KAZT"
  ],
  "CR13": [
   "CRCA",
   "KAKO",
   "KAZT"
  ],
  "CFC1": [
   "CRFH"
  ],
  "CFC2": [
   "CRFH",
   "AFFH"
  ],
  "CFC3": [
   "CRFH"
  ],
  "CORK": [
   "AFRU"
  ],
  "CO11N": [
   "AFRU"
  ],
  "CO15": [
   "AFRU"
  ]
 },
 "sharedTables": [
  "CRHD",
  "CRTX",
  "STKO",
  "STPO",
  "MAST",
  "AUFK",
  "AFKO",
  "AFVC",
  "AFPO",
  "T003O",
  "JEST",
  "JSTO",
  "TJ02T",
  "TJ30T",
  "TJ30",
  "RESB",
  "BUT000",
  "PLKO",
  "PLPO"
 ]
};
export default DISCOVERY;
