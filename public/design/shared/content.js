// GENERATED from the shipping dataset. Every SAP string here is real.
// Do not hand-edit and do not invent additional SAP objects.
// `migration` + the s4* fields are generated from shared/neo-real-content.json:
//   s4Note      = the S/4HANA note of that table, VERBATIM.
//   s4Impact    = derived from the note's opening words only (compat/adapted/replaced/action).
//   s4AltTable  = uppercase tokens in the note that ARE tables in our own dataset.
//   s4AltTcode  = uppercase tokens in the note that ARE transactions in our own dataset.
//   s4Mentions  = other technical tokens quoted from the note, NOT cross-verified.
//   s4Notes     = SAP Note numbers quoted verbatim inside the note text.
export const NEO = {
 "brand": {
  "name": "SAP by Sali",
  "product": "PROJECT NEO",
  "credit": "Built by Sali Halif"
 },
 "modules": [
  {
   "id": "pm",
   "code": "PM",
   "he": "אחזקה",
   "en": "Plant Maintenance",
   "topics": 12,
   "tables": 58,
   "fields": 280,
   "funcs": 95
  },
  {
   "id": "pp-pi",
   "code": "PP-PI",
   "he": "ייצור",
   "en": "Production Planning – Process Industries",
   "topics": 7,
   "tables": 68,
   "fields": 326,
   "funcs": 71
  }
 ],
 "pmTopics": [
  {
   "idx": 1,
   "title": "1. מבנה ארגוני ותשתית",
   "tables": 6
  },
  {
   "idx": 2,
   "title": "2. ציוד ונתוני מאסטר",
   "tables": 4
  },
  {
   "idx": 3,
   "title": "3. עצי מוצר של אחזקה (BOM)",
   "tables": 5
  },
  {
   "idx": 4,
   "title": "4. נקודות מדידה ומונים",
   "tables": 2
  },
  {
   "idx": 5,
   "title": "5. קטלוגים, קודים ופרופילים",
   "tables": 4
  },
  {
   "idx": 6,
   "title": "6. הודעות אחזקה (Notifications)",
   "tables": 6
  },
  {
   "idx": 7,
   "title": "7. פקודות עבודה (פק\"ע)",
   "tables": 7
  },
  {
   "idx": 8,
   "title": "8. ניהול סטטוסים (Status Mgmt)",
   "tables": 5
  },
  {
   "idx": 9,
   "title": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "tables": 6
  },
  {
   "idx": 10,
   "title": "10. עלויות והתחשבנות (PM-CO)",
   "tables": 4
  },
  {
   "idx": 11,
   "title": "11. אחזקה מונעת ותוכניות",
   "tables": 6
  },
  {
   "idx": 12,
   "title": "12. היסטוריה וארכיון",
   "tables": 3
  }
 ],
 "ppTopics": [
  {
   "idx": 1,
   "title": "1. נתוני אב חומר ויחידות מידה (",
   "tables": 16
  },
  {
   "idx": 2,
   "title": "2. עץ מוצר (BOM)",
   "tables": 7
  },
  {
   "idx": 3,
   "title": "3. מתכון ייצור ופעולות (Master ",
   "tables": 11
  },
  {
   "idx": 4,
   "title": "4. גרסאות ייצור (Production Ver",
   "tables": 1
  },
  {
   "idx": 5,
   "title": "5. משאבים  מרכזי עבודה (Resourc",
   "tables": 9
  },
  {
   "idx": 6,
   "title": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "tables": 8
  },
  {
   "idx": 7,
   "title": "7. קונפיגורציה (Customizing)",
   "tables": 16
  }
 ],
 "pmTables": [
  {
   "name": "IFLOT",
   "he": "רשומת אב של מיקום פונקציונלי",
   "en": "Functional location master record",
   "tcodes": "IL01/IL02/IL03; IH01, IH06",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 6,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי במודל הנתונים (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "EQUI",
   "he": "רשומת אב של ציוד",
   "en": "Equipment master record",
   "tcodes": "IE01/IE02/IE03; IH08, IE05",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 6,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי במודל הנתונים (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "EQKT",
   "he": "טקסטים (תיאורים) של ציוד",
   "en": "Equipment short texts",
   "tcodes": "IE02; IE03",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 3,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "QMEL",
   "he": "כותרת הודעת אחזקה",
   "en": "Notification header",
   "tcodes": "IW21/IW22/IW23; IW24, IW28/IW29",
   "fiori": "Report Malfunction (F2215)",
   "fields": 6,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי; ניתוח דרך Analytics/CDS",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "AUFK",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Order master data",
   "tcodes": "IW31/IW32/IW33; IW34, IW38/IW39",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 5,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מודל מותאם; עלויות ב-ACDOCA.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "עלויות מומרות ל-Universal Journal (ACDOCA) ב-SUM. COSP/COSS הופכים ל-Views. התאם דוחות עלות מותאמים והרצות התחשבנות.",
   "migrationStatus": "Not started",
   "s4Impact": "action"
  },
  {
   "name": "AFIH",
   "he": "כותרת פקודת אחזקה (PM)",
   "en": "Maintenance Order Header",
   "tcodes": "IW32; IW33",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 6,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "אין המרת טבלה הרסנית, אך מודל הנתונים מותאם - הרץ Regression Test ובדוק User Exits/דוחות מותאמים.",
   "migrationStatus": "Not started",
   "s4Impact": "adapted"
  },
  {
   "name": "MPOS",
   "he": "פריט תכנית אחזקה",
   "en": "Maintenance item",
   "tcodes": "IP04; IP02",
   "fiori": "Manage Maintenance Plans (אמת ID)",
   "fields": 6,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "MHIS",
   "he": "היסטוריית תזמון תכנית אחזקה",
   "en": "Maintenance plan scheduling history",
   "tcodes": "IP10; IP30",
   "fiori": "Schedule Maintenance Plans (אמת ID)",
   "fields": 4,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "OBJK",
   "he": "רשימת אובייקטים / מספרים סידוריים",
   "en": "Object list / serial assignment",
   "tcodes": "IQ01/IQ02/IQ03; IQ08, IQ09",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 5,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי (תואם)",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "JEST",
   "he": "סטטוסי אובייקט פעילים",
   "en": "Individual object status",
   "tcodes": "BS22/BS23; IW33, IE03",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "fields": 4,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי; ניהול סטטוס זהה ב-S/4.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  }
 ],
 "ppTables": [
  {
   "name": "MARA",
   "he": "נתוני חומר כלליים",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "fields": 8,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "MATNR מורחב 18->40 (SAP Note 2267140); בדוק ממשקים, ברקודים והמרות EAN.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "",
   "migrationStatus": "Not started",
   "s4Impact": "action"
  },
  {
   "name": "MARC",
   "he": "נתוני חומר ברמת מפעל",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03, MD04",
   "fiori": "Manage Product Master Data — Plant",
   "fields": 8,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "MRP Live מחליף MRP קלאסי; שדות תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "",
   "migrationStatus": "Not started",
   "s4Impact": "action"
  },
  {
   "name": "PLKO",
   "he": "כותרת רשימת פעולות (Routing)",
   "en": "Task list type (2=recipe)",
   "tcodes": "C201, C202, C203, CA01",
   "fiori": "Manage Master Recipes",
   "fields": 7,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי מבני; Fiori 'Manage Master Recipes'.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "PLPO",
   "he": "פעולות ברשימת הפעולות",
   "en": "Task list type",
   "tcodes": "C201, C202, C203, CA02",
   "fiori": "Manage Master Recipes",
   "fields": 9,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי; ביצוע דרך Control Recipe / PI sheet.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "MAPL",
   "he": "שיוך רשימת פעולות לחומר",
   "en": "Material number",
   "tcodes": "CA01, CA02, CA03, C201",
   "fiori": "Manage Routings / Recipes",
   "fields": 5,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "MKAL",
   "he": "גרסאות ייצור לחומר",
   "en": "Material number",
   "tcodes": "C223, MM02",
   "fiori": "Manage Production Versions",
   "fields": 15,
   "topic": "4. גרסאות ייצור (Production Ver",
   "s4Note": "חובה 100% ב-S/4HANA - הרץ C223 ובדוק תוקף/עקביות לכל חומר מיוצר לפני ההמרה (Pre-check קריטי).",
   "s4AltTable": [],
   "s4AltTcode": [
    "C223"
   ],
   "sumNote": "",
   "migrationStatus": "Not started",
   "s4Impact": "action"
  },
  {
   "name": "AFPO",
   "he": "פריטי פקודת ייצור",
   "en": "Order number",
   "tcodes": "COR2, COR3, COHVPI",
   "fiori": "Manage Process Orders",
   "fields": 5,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מותאם (תואם).",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "אין המרת טבלה הרסנית, אך מודל הנתונים מותאם - הרץ Regression Test ובדוק User Exits/דוחות מותאמים.",
   "migrationStatus": "Not started",
   "s4Impact": "adapted"
  },
  {
   "name": "AFRU",
   "he": "מספר דיווח",
   "en": "Confirmation number",
   "tcodes": "CORK, COR6N, CO11N, CO15",
   "fiori": "Confirm Production Operation",
   "fields": 5,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "ללא שינוי; עלויות ב-ACDOCA.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "CRHD",
   "he": "כותרת מרכז עבודה / משאב",
   "en": "Object type (A=work center)",
   "tcodes": "CR01, CR02, CR03, CRC1",
   "fiori": "Manage Work Centers / Resources",
   "fields": 7,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי מבני; Fiori 'Manage Work Centers'.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "STKO",
   "he": "כותרת עץ מוצר (BOM)",
   "en": "BOM category",
   "tcodes": "CS01, CS02, CS03, CS11",
   "fiori": "Manage Bills of Material",
   "fields": 6,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  },
  {
   "name": "STPO",
   "he": "פריטי עץ מוצר (BOM)",
   "en": "BOM category",
   "tcodes": "CS01, CS02, CS03, CS12",
   "fiori": "Manage Bills of Material",
   "fields": 9,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי; IDNRK מורחב 18->40.",
   "s4AltTable": [],
   "s4AltTcode": [],
   "sumNote": "ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה.",
   "migrationStatus": "Not started",
   "s4Impact": "compat"
  }
 ],
 "funcs": [
  {
   "name": "BAPI_FUNCLOC_CREATE",
   "he": "יצירת מיקום פונקציונלי דרך ממשק תקני"
  },
  {
   "name": "BAPI_FUNCLOC_CHANGE",
   "he": "שינוי מיקום פונקציונלי"
  },
  {
   "name": "BAPI_FUNCLOC_GETDETAIL",
   "he": "שליפת פרטי מיקום כולל תוויות"
  },
  {
   "name": "ISU_FUNCLOC_GETLIST",
   "he": "שליפת רשימת מיקומים לפי בחירה"
  },
  {
   "name": "FUNC_LOCATION_LABEL_READ",
   "he": "קריאת תווית מיקום פונקציונלי"
  },
  {
   "name": "ILOA_READ",
   "he": "קריאת נתוני מיקום/חיוב"
  },
  {
   "name": "ILOA_UPDATE",
   "he": "עדכון נתוני מיקום/חיוב"
  },
  {
   "name": "ILOA_INHERIT_FROM_FUNCLOC",
   "he": "ירושת נתונים מהמיקום לציוד"
  },
  {
   "name": "BAPI_MATERIAL_SAVEDATA",
   "he": "יצירה/עדכון אב חומר - ליבת הטעינה ההמונית והממשקים"
  },
  {
   "name": "BAPI_MATERIAL_GET_DETAIL",
   "he": "שליפת נתוני חומר לדוחות/ממשקים"
  },
  {
   "name": "MATMAS (MATMAS05)",
   "he": "הפצת אב חומר ל/מ-מערכות חיצוניות (Zetes/Daymax)"
  },
  {
   "name": "MARA_SINGLE_READ / MARC_SINGLE_READ",
   "he": "קריאת חומר/מפעל בודד"
  },
  {
   "name": "BAPI_MATERIAL_SAVEDATA - עדכון תיאורי חומר",
   "he": ""
  },
  {
   "name": "MAKT_SINGLE_READ - קריאת תיאור חומר",
   "he": ""
  }
 ],
 "books": [
  {
   "id": "book1",
   "title": "Configuring Plant Maintenance in SAP S/4HANA",
   "module": "PM",
   "chapters": 9,
   "sections": 140,
   "hebrew": false,
   "minutes": 1206
  },
  {
   "id": "book10",
   "title": "Sales and Operations Planning with SAP IBP",
   "module": "S&OP",
   "chapters": 11,
   "sections": 211,
   "hebrew": false,
   "minutes": 960
  },
  {
   "id": "book11",
   "title": "Prerequisites for SAP S/4HANA End-to-End Implementation Training",
   "module": "S/4HANA",
   "chapters": 9,
   "sections": 77,
   "hebrew": false,
   "minutes": 215
  },
  {
   "id": "book2",
   "title": "Production Planning with SAP S/4HANA",
   "module": "PP",
   "chapters": 15,
   "sections": 496,
   "hebrew": false,
   "minutes": 2077
  },
  {
   "id": "book3",
   "title": "Sourcing and Procurement with SAP S/4HANA",
   "module": "MM",
   "chapters": 18,
   "sections": 374,
   "hebrew": false,
   "minutes": 1681
  },
  {
   "id": "book4",
   "title": "PP/DS with SAP S/4HANA",
   "module": "PP/DS",
   "chapters": 11,
   "sections": 195,
   "hebrew": false,
   "minutes": 1288
  },
  {
   "id": "book5",
   "title": "Quality Management with SAP S/4HANA",
   "module": "QM",
   "chapters": 20,
   "sections": 502,
   "hebrew": false,
   "minutes": 1865
  },
  {
   "id": "book6",
   "title": "Integrating Warehouse Management in SAP S/4HANA",
   "module": "EWM",
   "chapters": 10,
   "sections": 88,
   "hebrew": false,
   "minutes": 765
  },
  {
   "id": "book7",
   "title": "SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide",
   "module": "Fiori",
   "chapters": 11,
   "sections": 1689,
   "hebrew": false,
   "minutes": 2937
  },
  {
   "id": "book8",
   "title": "Plant Maintenance with SAP S/4HANA — Business User Guide",
   "module": "PM",
   "chapters": 10,
   "sections": 271,
   "hebrew": true,
   "minutes": 478
  },
  {
   "id": "book9",
   "title": "Plant Maintenance with SAP S/4HANA: Business User Guide",
   "module": "PM",
   "chapters": 10,
   "sections": 271,
   "hebrew": false,
   "minutes": 1287
  }
 ],
 "portalSections": [
  "סקירה",
  "תהליך עסקי",
  "נתוני אב",
  "טרנזקציות",
  "טבלאות",
  "קשרים",
  "תצורה",
  "אינטגרציה",
  "BAPIs / FMs",
  "CDS Views",
  "Fiori Apps",
  "Enhancements",
  "תקלות",
  "אובייקטים קשורים",
  "Best Practices"
 ],
 "navGroups": [
  {
   "he": "מודולים",
   "items": [
    "אחזקה · PM",
    "ייצור · PP-PI",
    "מודל נתונים"
   ]
  },
  {
   "he": "עיון · Reference",
   "items": [
    "טבלאות",
    "טרנזקציות",
    "BAPIs / FMs",
    "IDocs",
    "CDS Views",
    "Fiori Apps",
    "Enhancements"
   ]
  },
  {
   "he": "ספרייה",
   "items": [
    "ספרייה דיגיטלית",
    "שאל את הספרייה"
   ]
  },
  {
   "he": "ידע ולמידה",
   "items": [
    "מרכז ידע",
    "SAP Academy",
    "תקלות",
    "הסמכה"
   ]
  },
  {
   "he": "כלים",
   "items": [
    "Architecture Studio"
   ]
  },
  {
   "he": "עוזר SAP",
   "items": [
    "צ׳אט AI"
   ]
  }
 ],
 "entities": [
  {
   "name": "IFLOT",
   "module": "PM",
   "he": "רשומת אב של מיקום פונקציונלי",
   "en": "Functional location master record",
   "topic": "1. מבנה ארגוני ותשתית",
   "fields": 6,
   "tcodes": "IL01/IL02/IL03; IH01, IH06",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "IFLOS",
     "card": "1:1",
     "join": "IFLOS.TPLNR = IFLOT.TPLNR",
     "desc": "תווית מיקום פונקציונלי מצורפת לרשומת האב"
    },
    {
     "role": "child",
     "table": "JSTO",
     "card": "1:1",
     "join": "IFLOT.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של המיקום הפונקציונלי"
    },
    {
     "role": "parent",
     "table": "ILOA",
     "card": "N:1",
     "join": "ILOA.TPLNR = IFLOT.TPLNR",
     "desc": "נתוני מיקום/חיוב משויכים למיקום הפונקציונלי"
    },
    {
     "role": "parent",
     "table": "TPST",
     "card": "N:1",
     "join": "TPST.TPLNR = IFLOT.TPLNR",
     "desc": "עץ המוצר של המיקום הפונקציונלי"
    },
    {
     "role": "parent",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMEL.TPLNR = IFLOT.TPLNR",
     "desc": "ההודעה מתייחסת למיקום פונקציונלי"
    },
    {
     "role": "parent",
     "table": "AFIH",
     "card": "N:1",
     "join": "AFIH.TPLNR = IFLOT.TPLNR",
     "desc": "הפק\"ע מתייחסת למיקום פונקציונלי"
    }
   ]
  },
  {
   "name": "EQUI",
   "module": "PM",
   "he": "רשומת אב של ציוד",
   "en": "Equipment master record",
   "topic": "2. ציוד ונתוני מאסטר",
   "fields": 6,
   "tcodes": "IE01/IE02/IE03; IH08, IE05",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "EQKT",
     "card": "N:1",
     "join": "EQKT.EQUNR = EQUI.EQUNR",
     "desc": "טקסטים של הציוד (לפי שפה)"
    },
    {
     "role": "parent",
     "table": "EQUZ",
     "card": "N:1",
     "join": "EQUZ.EQUNR = EQUI.EQUNR",
     "desc": "פלחי זמן של הציוד (התקנות לאורך זמן)"
    },
    {
     "role": "parent",
     "table": "EQUZ",
     "card": "N:1",
     "join": "EQUZ.HEQUI = EQUI.EQUNR",
     "desc": "ציוד עליון בהיררכיה (self-join דרך EQUI)"
    },
    {
     "role": "child",
     "table": "JSTO",
     "card": "1:1",
     "join": "EQUI.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של הציוד"
    },
    {
     "role": "parent",
     "table": "OBJK",
     "card": "N:1",
     "join": "OBJK.EQUNR = EQUI.EQUNR",
     "desc": "מספר סידורי משויך לרשומת ציוד"
    },
    {
     "role": "parent",
     "table": "EQST",
     "card": "N:1",
     "join": "EQST.EQUNR = EQUI.EQUNR",
     "desc": "עץ המוצר של הציוד"
    },
    {
     "role": "parent",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMEL.EQUNR = EQUI.EQUNR",
     "desc": "ההודעה מתייחסת לציוד"
    },
    {
     "role": "parent",
     "table": "AFIH",
     "card": "N:1",
     "join": "AFIH.EQUNR = EQUI.EQUNR",
     "desc": "הפק\"ע מתייחסת לציוד"
    },
    {
     "role": "parent",
     "table": "MPOS",
     "card": "N:1",
     "join": "MPOS.EQUNR = EQUI.EQUNR",
     "desc": "פריט התכנית מתייחס לציוד"
    }
   ]
  },
  {
   "name": "EQKT",
   "module": "PM",
   "he": "טקסטים (תיאורים) של ציוד",
   "en": "Equipment short texts",
   "topic": "2. ציוד ונתוני מאסטר",
   "fields": 3,
   "tcodes": "IE02; IE03",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "EQKT.EQUNR = EQUI.EQUNR",
     "desc": "טקסטים של הציוד (לפי שפה)"
    }
   ]
  },
  {
   "name": "QMEL",
   "module": "PM",
   "he": "הודעות (כולל היסטוריות) לניתוח אמינות",
   "en": "Notifications incl. historical",
   "topic": "12. היסטוריה וארכיון",
   "fields": 5,
   "tcodes": "IW64; IW66/IW67",
   "fiori": "Maintenance Backlog (אמת ID)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "QMFE",
     "card": "N:1",
     "join": "QMFE.QMNUM = QMEL.QMNUM",
     "desc": "פריטי הליקוי תחת ההודעה"
    },
    {
     "role": "parent",
     "table": "QMMA",
     "card": "N:1",
     "join": "QMMA.QMNUM = QMEL.QMNUM",
     "desc": "פעילויות שבוצעו תחת ההודעה"
    },
    {
     "role": "parent",
     "table": "QMSM",
     "card": "N:1",
     "join": "QMSM.QMNUM = QMEL.QMNUM",
     "desc": "משימות לטיפול תחת ההודעה"
    },
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "QMEL.EQUNR = EQUI.EQUNR",
     "desc": "ההודעה מתייחסת לציוד"
    },
    {
     "role": "child",
     "table": "IFLOT",
     "card": "N:1",
     "join": "QMEL.TPLNR = IFLOT.TPLNR",
     "desc": "ההודעה מתייחסת למיקום פונקציונלי"
    },
    {
     "role": "child",
     "table": "JSTO",
     "card": "1:1",
     "join": "QMEL.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של ההודעה"
    },
    {
     "role": "child",
     "table": "TQ80",
     "card": "N:1",
     "join": "QMEL.QMART = TQ80.QMART",
     "desc": "סוג ההודעה מגדיר פריסת מסך ופרופיל קטלוג"
    }
   ]
  },
  {
   "name": "AUFK",
   "module": "PM",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Orders incl. historical",
   "topic": "12. היסטוריה וארכיון",
   "fields": 5,
   "tcodes": "IW39; IW13",
   "fiori": "Find Maintenance Order (F2393)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "AFKO",
     "card": "1:1",
     "join": "AFKO.AUFNR = AUFK.AUFNR",
     "desc": "כותרת נתוני האחזקה/ייצור של הפק\"ע"
    },
    {
     "role": "parent",
     "table": "AFPO",
     "card": "N:1",
     "join": "AFPO.AUFNR = AUFK.AUFNR",
     "desc": "פריטי הפק\"ע"
    },
    {
     "role": "parent",
     "table": "AFIH",
     "card": "1:1",
     "join": "AFIH.AUFNR = AUFK.AUFNR",
     "desc": "כותרת נתוני האחזקה (PM) של הפק\"ע"
    },
    {
     "role": "child",
     "table": "JSTO",
     "card": "1:1",
     "join": "AUFK.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס/CO של הפק\"ע"
    },
    {
     "role": "child",
     "table": "T003O",
     "card": "N:1",
     "join": "AUFK.AUART = T003O.AUART",
     "desc": "סוג הפקודה מגדיר פרמטרים, טווח מספרים ופרופיל סטטוס"
    },
    {
     "role": "parent",
     "table": "RESB",
     "card": "N:1",
     "join": "RESB.AUFNR = AUFK.AUFNR",
     "desc": "הזמנות רכיבים של הפק\"ע"
    },
    {
     "role": "parent",
     "table": "MSEG",
     "card": "N:1",
     "join": "MSEG.AUFNR = AUFK.AUFNR",
     "desc": "תנועת המלאי מחויבת לפק\"ע"
    },
    {
     "role": "parent",
     "table": "EBKN",
     "card": "N:1",
     "join": "EBKN.AUFNR = AUFK.AUFNR",
     "desc": "דרישת הרכש מחויבת לפק\"ע"
    },
    {
     "role": "parent",
     "table": "COSP",
     "card": "N:1",
     "join": "COSP.OBJNR = AUFK.OBJNR",
     "desc": "סך עלויות חיצוניות לפי אובייקט הפק\"ע"
    },
    {
     "role": "parent",
     "table": "COSS",
     "card": "N:1",
     "join": "COSS.OBJNR = AUFK.OBJNR",
     "desc": "סך עלויות פנימיות לפי אובייקט הפק\"ע"
    },
    {
     "role": "parent",
     "table": "COBRA",
     "card": "1:1",
     "join": "COBRA.OBJNR = AUFK.OBJNR",
     "desc": "כותרת חוק ההתחשבנות של הפק\"ע"
    },
    {
     "role": "parent",
     "table": "MHIO",
     "card": "N:1",
     "join": "MHIO.AUFNR = AUFK.AUFNR",
     "desc": "הפק\"ע שנוצרה מהקריאה"
    }
   ]
  },
  {
   "name": "AFIH",
   "module": "PM",
   "he": "כותרת פקודת אחזקה (PM)",
   "en": "Maintenance Order Header",
   "topic": "7. פקודות עבודה (פק\"ע)",
   "fields": 6,
   "tcodes": "IW32; IW33",
   "fiori": "Find Maintenance Order (F2393)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "1:1",
     "join": "AFIH.AUFNR = AUFK.AUFNR",
     "desc": "כותרת נתוני האחזקה (PM) של הפק\"ע"
    },
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "AFIH.EQUNR = EQUI.EQUNR",
     "desc": "הפק\"ע מתייחסת לציוד"
    },
    {
     "role": "child",
     "table": "IFLOT",
     "card": "N:1",
     "join": "AFIH.TPLNR = IFLOT.TPLNR",
     "desc": "הפק\"ע מתייחסת למיקום פונקציונלי"
    }
   ]
  },
  {
   "name": "MPOS",
   "module": "PM",
   "he": "פריט תכנית אחזקה",
   "en": "Maintenance item",
   "topic": "11. אחזקה מונעת ותוכניות",
   "fields": 6,
   "tcodes": "IP04; IP02",
   "fiori": "Manage Maintenance Plans (אמת ID)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "MPLA",
     "card": "N:1",
     "join": "MPOS.WARPL = MPLA.WARPL",
     "desc": "פריטי תכנית האחזקה"
    },
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "MPOS.EQUNR = EQUI.EQUNR",
     "desc": "פריט התכנית מתייחס לציוד"
    },
    {
     "role": "child",
     "table": "PLKO",
     "card": "N:1",
     "join": "MPOS.PLNNR = PLKO.PLNNR",
     "desc": "רשימת הפעולות המשויכת לפריט"
    }
   ]
  },
  {
   "name": "MHIS",
   "module": "PM",
   "he": "היסטוריית תזמון תכנית אחזקה",
   "en": "Maintenance plan scheduling history",
   "topic": "11. אחזקה מונעת ותוכניות",
   "fields": 4,
   "tcodes": "IP10; IP30",
   "fiori": "Schedule Maintenance Plans (אמת ID)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "MPLA",
     "card": "N:1",
     "join": "MHIS.WARPL = MPLA.WARPL",
     "desc": "היסטוריית התזמון של התכנית"
    }
   ]
  },
  {
   "name": "OBJK",
   "module": "PM",
   "he": "רשימת אובייקטים / מספרים סידוריים",
   "en": "Object list / serial assignment",
   "topic": "2. ציוד ונתוני מאסטר",
   "fields": 5,
   "tcodes": "IQ01/IQ02/IQ03; IQ08, IQ09",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "OBJK.EQUNR = EQUI.EQUNR",
     "desc": "מספר סידורי משויך לרשומת ציוד"
    }
   ]
  },
  {
   "name": "JEST",
   "module": "PM",
   "he": "סטטוסי אובייקט פעילים",
   "en": "Individual object status",
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "fields": 4,
   "tcodes": "BS22/BS23; IW33, IE03",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "JSTO",
     "card": "N:1",
     "join": "JEST.OBJNR = JSTO.OBJNR",
     "desc": "סטטוסים פעילים תחת אובייקט הסטטוס"
    }
   ]
  },
  {
   "name": "MARA",
   "module": "PP-PI",
   "he": "נתוני חומר כלליים",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 8,
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "MAKT",
     "card": "",
     "join": "FROM MAKT JOIN MARA ON MAKT.MATNR = MARA.MATNR",
     "desc": "תיאורי חומר (טקסטים)"
    },
    {
     "role": "parent",
     "table": "MARC",
     "card": "",
     "join": "FROM MARC JOIN MARA ON MARC.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מפעל"
    },
    {
     "role": "parent",
     "table": "MARM",
     "card": "",
     "join": "FROM MARM JOIN MARA ON MARM.MATNR = MARA.MATNR",
     "desc": "המרות יחידות מידה חלופיות"
    },
    {
     "role": "parent",
     "table": "MEAN",
     "card": "",
     "join": "FROM MEAN JOIN MARA ON MEAN.MATNR = MARA.MATNR",
     "desc": "ברקודים / EAN לחומר"
    },
    {
     "role": "parent",
     "table": "MBEW",
     "card": "",
     "join": "FROM MBEW JOIN MARA ON MBEW.MATNR = MARA.MATNR",
     "desc": "הערכת חומר (Valuation)"
    },
    {
     "role": "parent",
     "table": "MVKE",
     "card": "",
     "join": "FROM MVKE JOIN MARA ON MVKE.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מכירות"
    },
    {
     "role": "parent",
     "table": "MLAN",
     "card": "",
     "join": "FROM MLAN JOIN MARA ON MLAN.MATNR = MARA.MATNR",
     "desc": "נתוני מס לחומר (לפי מדינה)"
    },
    {
     "role": "parent",
     "table": "MLGN",
     "card": "",
     "join": "FROM MLGN JOIN MARA ON MLGN.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מחסן (WM)"
    },
    {
     "role": "parent",
     "table": "MCH1",
     "card": "",
     "join": "FROM MCH1 JOIN MARA ON MCH1.MATNR = MARA.MATNR",
     "desc": "אצוות חומר (Batches)"
    },
    {
     "role": "parent",
     "table": "MAST",
     "card": "",
     "join": "FROM MAST JOIN MARA ON MAST.MATNR = MARA.MATNR",
     "desc": "קישור חומר לעץ מוצר"
    }
   ]
  },
  {
   "name": "MARC",
   "module": "PP-PI",
   "he": "נתוני חומר ברמת מפעל",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 8,
   "tcodes": "MM01, MM02, MM03, MD04",
   "fiori": "Manage Product Master Data — Plant",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MARC JOIN MARA ON MARC.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מפעל"
    },
    {
     "role": "parent",
     "table": "MARD",
     "card": "",
     "join": "FROM MARD JOIN MARC ON MARD.MATNR = MARC.MATNR AND MARD.WERKS = MARC.WERKS",
     "desc": "נתוני חומר ברמת מחסן/מלאי"
    },
    {
     "role": "parent",
     "table": "MDMA",
     "card": "",
     "join": "FROM MDMA JOIN MARC ON MDMA.MATNR = MARC.MATNR AND MDMA.WERKS = MARC.WERKS",
     "desc": "אזורי MRP לחומר"
    },
    {
     "role": "parent",
     "table": "QMAT",
     "card": "",
     "join": "FROM QMAT JOIN MARC ON QMAT.MATNR = MARC.MATNR AND QMAT.WERKS = MARC.WERKS",
     "desc": "הגדרות בדיקת איכות לחומר"
    },
    {
     "role": "parent",
     "table": "MAPL",
     "card": "",
     "join": "FROM MAPL JOIN MARC ON MAPL.MATNR = MARC.MATNR AND MAPL.WERKS = MARC.WERKS",
     "desc": "שיוך חומר למתכון/רשימת פעולות"
    },
    {
     "role": "parent",
     "table": "MKAL",
     "card": "",
     "join": "FROM MKAL JOIN MARC ON MKAL.MATNR = MARC.MATNR AND MKAL.WERKS = MARC.WERKS",
     "desc": "גרסאות ייצור לחומר"
    }
   ]
  },
  {
   "name": "PLKO",
   "module": "PP-PI",
   "he": "כותרת רשימת פעולות (Routing)",
   "en": "Task list type (2=recipe)",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 7,
   "tcodes": "C201, C202, C203, CA01",
   "fiori": "Manage Master Recipes",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "MAPL",
     "card": "",
     "join": "FROM PLKO JOIN MAPL ON PLKO.PLNTY = MAPL.PLNTY AND PLKO.PLNNR = MAPL.PLNNR",
     "desc": "כותרת מתכון ייצור / רשימת פעולות"
    },
    {
     "role": "parent",
     "table": "PLAS",
     "card": "",
     "join": "FROM PLAS JOIN PLKO ON PLAS.PLNTY = PLKO.PLNTY AND PLAS.PLNNR = PLKO.PLNNR",
     "desc": "שיוך/בחירת פעולות לרשימה"
    },
    {
     "role": "parent",
     "table": "PLFL",
     "card": "",
     "join": "FROM PLFL JOIN PLKO ON PLFL.PLNNR = PLKO.PLNNR",
     "desc": "רצפים במתכון"
    },
    {
     "role": "parent",
     "table": "PLZU",
     "card": "",
     "join": "FROM PLZU JOIN PLKO ON PLZU.PLNNR = PLKO.PLNNR",
     "desc": "קישור היסטוריית רשימת פעולות"
    }
   ]
  },
  {
   "name": "PLPO",
   "module": "PP-PI",
   "he": "פעולות ברשימת הפעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 9,
   "tcodes": "C201, C202, C203, CA02",
   "fiori": "Manage Master Recipes",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "PLAS",
     "card": "",
     "join": "FROM PLPO JOIN PLAS ON PLPO.PLNTY = PLAS.PLNTY AND PLPO.PLNNR = PLAS.PLNNR AND PLPO.PLNKN = PLAS.PLNKN",
     "desc": "פעולות/פאזות במתכון"
    },
    {
     "role": "parent",
     "table": "PLMZ",
     "card": "",
     "join": "FROM PLMZ JOIN PLPO ON PLMZ.PLNKN = PLPO.PLNKN",
     "desc": "שיוך רכיבים לפעולות"
    },
    {
     "role": "parent",
     "table": "PLMK",
     "card": "",
     "join": "FROM PLMK JOIN PLPO ON PLMK.PLNKN = PLPO.PLNKN",
     "desc": "מאפייני בדיקה במתכון"
    },
    {
     "role": "parent",
     "table": "FHMI",
     "card": "",
     "join": "FROM FHMI JOIN PLPO ON FHMI.PLNKN = PLPO.PLNKN",
     "desc": "שיוך כלי עזר ייצור (PRT) לפעולה"
    }
   ]
  },
  {
   "name": "MAPL",
   "module": "PP-PI",
   "he": "שיוך רשימת פעולות לחומר",
   "en": "Material number",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 5,
   "tcodes": "CA01, CA02, CA03, C201",
   "fiori": "Manage Routings / Recipes",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "PLKO",
     "card": "",
     "join": "FROM PLKO JOIN MAPL ON PLKO.PLNTY = MAPL.PLNTY AND PLKO.PLNNR = MAPL.PLNNR",
     "desc": "כותרת מתכון ייצור / רשימת פעולות"
    },
    {
     "role": "child",
     "table": "MARC",
     "card": "",
     "join": "FROM MAPL JOIN MARC ON MAPL.MATNR = MARC.MATNR AND MAPL.WERKS = MARC.WERKS",
     "desc": "שיוך חומר למתכון/רשימת פעולות"
    }
   ]
  },
  {
   "name": "MKAL",
   "module": "PP-PI",
   "he": "גרסאות ייצור לחומר",
   "en": "Material number",
   "topic": "4. גרסאות ייצור (Production Ver",
   "fields": 15,
   "tcodes": "C223, MM02",
   "fiori": "Manage Production Versions",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "MARC",
     "card": "",
     "join": "FROM MKAL JOIN MARC ON MKAL.MATNR = MARC.MATNR AND MKAL.WERKS = MARC.WERKS",
     "desc": "גרסאות ייצור לחומר"
    }
   ]
  },
  {
   "name": "AFPO",
   "module": "PM",
   "he": "פריטי פקודת ייצור",
   "en": "Order item",
   "topic": "7. פקודות עבודה (פק\"ע)",
   "fields": 4,
   "tcodes": "IW32; IW33",
   "fiori": "Find Maintenance Order (F2393)",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "AFPO.AUFNR = AUFK.AUFNR",
     "desc": "פריטי הפק\"ע"
    }
   ]
  },
  {
   "name": "AFRU",
   "module": "PP-PI",
   "he": "מספר דיווח",
   "en": "Confirmation number",
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "fields": 5,
   "tcodes": "CORK, COR6N, CO11N, CO15",
   "fiori": "Confirm Production Operation",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "AFKO",
     "card": "",
     "join": "FROM AFRU JOIN AFKO ON AFRU.AUFNR = AFKO.AUFNR",
     "desc": "דיווחי ביצוע פק\"ע"
    }
   ]
  },
  {
   "name": "CRHD",
   "module": "PM",
   "he": "כותרת מרכז עבודה / משאב",
   "en": "Work center header",
   "topic": "1. מבנה ארגוני ותשתית",
   "fields": 6,
   "tcodes": "IR01/IR02/IR03; CR05, CR06",
   "fiori": "Manage Work Centers (אמת ID)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "ILOA",
     "card": "N:1",
     "join": "ILOA.GEWRK = CRHD.OBJID",
     "desc": "מרכז עבודה ראשי אחראי"
    },
    {
     "role": "parent",
     "table": "CRTX",
     "card": "N:1",
     "join": "CRTX.OBJID = CRHD.OBJID",
     "desc": "טקסטים של מרכז העבודה (לפי שפה)"
    },
    {
     "role": "parent",
     "table": "AFVC",
     "card": "N:1",
     "join": "AFVC.ARBID = CRHD.OBJID",
     "desc": "מרכז העבודה המבצע את הפעולה"
    },
    {
     "role": "parent",
     "table": "PLPO",
     "card": "N:1",
     "join": "PLPO.ARBID = CRHD.OBJID",
     "desc": "מרכז העבודה של הפעולה ברשימה"
    }
   ]
  },
  {
   "name": "STKO",
   "module": "PM",
   "he": "כותרת עץ מוצר (BOM)",
   "en": "BOM header",
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "fields": 5,
   "tcodes": "IB01/CS01; CS02/CS03",
   "fiori": "Manage Bills of Material (אמת ID)",
   "seed": true,
   "relations": [
    {
     "role": "parent",
     "table": "STPO",
     "card": "N:1",
     "join": "STPO.STLNR = STKO.STLNR",
     "desc": "פריטי עץ המוצר תחת הכותרת"
    },
    {
     "role": "parent",
     "table": "MAST",
     "card": "N:1",
     "join": "MAST.STLNR = STKO.STLNR",
     "desc": "קישור חומר לכותרת עץ המוצר"
    },
    {
     "role": "parent",
     "table": "EQST",
     "card": "N:1",
     "join": "EQST.STLNR = STKO.STLNR",
     "desc": "קישור ציוד לעץ המוצר"
    },
    {
     "role": "parent",
     "table": "TPST",
     "card": "N:1",
     "join": "TPST.STLNR = STKO.STLNR",
     "desc": "קישור מיקום לעץ המוצר"
    }
   ]
  },
  {
   "name": "STPO",
   "module": "PP-PI",
   "he": "פריטי עץ מוצר (BOM)",
   "en": "BOM category",
   "topic": "2. עץ מוצר (BOM)",
   "fields": 9,
   "tcodes": "CS01, CS02, CS03, CS12",
   "fiori": "Manage Bills of Material",
   "seed": true,
   "relations": [
    {
     "role": "child",
     "table": "STKO",
     "card": "",
     "join": "FROM STPO JOIN STKO ON STPO.STLNR = STKO.STLNR AND STPO.STLTY = STKO.STLTY",
     "desc": "פריטי עץ מוצר (רכיבים)"
    },
    {
     "role": "parent",
     "table": "STPU",
     "card": "",
     "join": "FROM STPU JOIN STPO ON STPU.STLKN = STPO.STLKN",
     "desc": "טקסטים ארוכים לפריט עץ מוצר"
    }
   ]
  },
  {
   "name": "IFLOS",
   "module": "PM",
   "he": "תוויות מבנה למיקום פונקציונלי",
   "en": "Functional Location Label",
   "topic": "1. מבנה ארגוני ותשתית",
   "fields": 5,
   "tcodes": "IL01/IL02/IL03; IH06",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "IFLOT",
     "card": "1:1",
     "join": "IFLOS.TPLNR = IFLOT.TPLNR",
     "desc": "תווית מיקום פונקציונלי מצורפת לרשומת האב"
    }
   ]
  },
  {
   "name": "JSTO",
   "module": "PM",
   "he": "פרופיל סטטוס לאובייקט",
   "en": "Status object header + profile",
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "fields": 4,
   "tcodes": "BS02/BS03; OIBS",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "seed": false,
   "relations": [
    {
     "role": "parent",
     "table": "IFLOT",
     "card": "1:1",
     "join": "IFLOT.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של המיקום הפונקציונלי"
    },
    {
     "role": "parent",
     "table": "EQUI",
     "card": "1:1",
     "join": "EQUI.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של הציוד"
    },
    {
     "role": "parent",
     "table": "QMEL",
     "card": "1:1",
     "join": "QMEL.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס של ההודעה"
    },
    {
     "role": "parent",
     "table": "AUFK",
     "card": "1:1",
     "join": "AUFK.OBJNR = JSTO.OBJNR",
     "desc": "אובייקט הסטטוס/CO של הפק\"ע"
    },
    {
     "role": "parent",
     "table": "JEST",
     "card": "N:1",
     "join": "JEST.OBJNR = JSTO.OBJNR",
     "desc": "סטטוסים פעילים תחת אובייקט הסטטוס"
    }
   ]
  },
  {
   "name": "ILOA",
   "module": "PM",
   "he": "נתוני מיקום וחיוב משותפים",
   "en": "PM object location & account assignment",
   "topic": "1. מבנה ארגוני ותשתית",
   "fields": 6,
   "tcodes": "IL02; IE02 (ירושה)",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "IFLOT",
     "card": "N:1",
     "join": "ILOA.TPLNR = IFLOT.TPLNR",
     "desc": "נתוני מיקום/חיוב משויכים למיקום הפונקציונלי"
    },
    {
     "role": "child",
     "table": "CRHD",
     "card": "N:1",
     "join": "ILOA.GEWRK = CRHD.OBJID",
     "desc": "מרכז עבודה ראשי אחראי"
    },
    {
     "role": "parent",
     "table": "EQUZ",
     "card": "N:1",
     "join": "EQUZ.ILOAN = ILOA.ILOAN",
     "desc": "נתוני מיקום/חיוב של הציוד בפלח הזמן"
    }
   ]
  },
  {
   "name": "TPST",
   "module": "PM",
   "he": "קישור מיקום פונקציונלי לעץ מוצר",
   "en": "Functional location-to-BOM link",
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "fields": 4,
   "tcodes": "IB11; IB12/IB13",
   "fiori": "Manage Bills of Material (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "STKO",
     "card": "N:1",
     "join": "TPST.STLNR = STKO.STLNR",
     "desc": "קישור מיקום לעץ המוצר"
    },
    {
     "role": "child",
     "table": "IFLOT",
     "card": "N:1",
     "join": "TPST.TPLNR = IFLOT.TPLNR",
     "desc": "עץ המוצר של המיקום הפונקציונלי"
    }
   ]
  },
  {
   "name": "EQUZ",
   "module": "PM",
   "he": "פלח זמן של ציוד (התקנות/שיוך)",
   "en": "Equipment time segment",
   "topic": "2. ציוד ונתוני מאסטר",
   "fields": 5,
   "tcodes": "IE02; IE4N (התקנה/פירוק)",
   "fiori": "Manage Technical Objects (F2079)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "EQUZ.EQUNR = EQUI.EQUNR",
     "desc": "פלחי זמן של הציוד (התקנות לאורך זמן)"
    },
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "EQUZ.HEQUI = EQUI.EQUNR",
     "desc": "ציוד עליון בהיררכיה (self-join דרך EQUI)"
    },
    {
     "role": "child",
     "table": "ILOA",
     "card": "N:1",
     "join": "EQUZ.ILOAN = ILOA.ILOAN",
     "desc": "נתוני מיקום/חיוב של הציוד בפלח הזמן"
    }
   ]
  },
  {
   "name": "EQST",
   "module": "PM",
   "he": "קישור ציוד לעץ מוצר",
   "en": "Equipment-to-BOM link",
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "fields": 4,
   "tcodes": "IB01; IB02/IB03",
   "fiori": "Manage Bills of Material (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "STKO",
     "card": "N:1",
     "join": "EQST.STLNR = STKO.STLNR",
     "desc": "קישור ציוד לעץ המוצר"
    },
    {
     "role": "child",
     "table": "EQUI",
     "card": "N:1",
     "join": "EQST.EQUNR = EQUI.EQUNR",
     "desc": "עץ המוצר של הציוד"
    }
   ]
  },
  {
   "name": "QMFE",
   "module": "PM",
   "he": "פריטי הודעת איכות (נזק / גורם)",
   "en": "Quality Notification Item",
   "topic": "6. הודעות אחזקה (Notifications)",
   "fields": 6,
   "tcodes": "IW22; IW66",
   "fiori": "Find Maintenance Notification (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMFE.QMNUM = QMEL.QMNUM",
     "desc": "פריטי הליקוי תחת ההודעה"
    }
   ]
  },
  {
   "name": "QMMA",
   "module": "PM",
   "he": "פעולות / אמצעים בהודעת איכות",
   "en": "Notification Activity",
   "topic": "6. הודעות אחזקה (Notifications)",
   "fields": 4,
   "tcodes": "IW22; IW67",
   "fiori": "Report Malfunction (F2215)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMMA.QMNUM = QMEL.QMNUM",
     "desc": "פעילויות שבוצעו תחת ההודעה"
    }
   ]
  },
  {
   "name": "QMSM",
   "module": "PM",
   "he": "משימות בהודעת איכות",
   "en": "Notification Task",
   "topic": "6. הודעות אחזקה (Notifications)",
   "fields": 5,
   "tcodes": "IW22; IW66",
   "fiori": "Find Maintenance Notification (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMSM.QMNUM = QMEL.QMNUM",
     "desc": "משימות לטיפול תחת ההודעה"
    }
   ]
  },
  {
   "name": "TQ80",
   "module": "PM",
   "he": "סוגי הודעה (הגדרה)",
   "en": "Notification Type (Customizing)",
   "topic": "6. הודעות אחזקה (Notifications)",
   "fields": 4,
   "tcodes": "OIAL (פריסת מסך); SPRO, QCC0",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "seed": false,
   "relations": [
    {
     "role": "parent",
     "table": "QMEL",
     "card": "N:1",
     "join": "QMEL.QMART = TQ80.QMART",
     "desc": "סוג ההודעה מגדיר פריסת מסך ופרופיל קטלוג"
    },
    {
     "role": "child",
     "table": "T003O",
     "card": "N:1",
     "join": "TQ80.AUART = T003O.AUART",
     "desc": "סוג ההודעה מגדיר סוג פק\"ע ברירת מחדל"
    }
   ]
  },
  {
   "name": "AFKO",
   "module": "PP-PI",
   "he": "נתוני כותרת פקודת ייצור / תהליך",
   "en": "Order number",
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "fields": 6,
   "tcodes": "COR1, COR2, COR3, COR6N, COHVPI",
   "fiori": "Manage Process Orders",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "",
     "join": "FROM AFKO JOIN AUFK ON AFKO.AUFNR = AUFK.AUFNR",
     "desc": "כותרת פקודת ייצור"
    },
    {
     "role": "parent",
     "table": "AFPO",
     "card": "",
     "join": "FROM AFPO JOIN AFKO ON AFPO.AUFNR = AFKO.AUFNR",
     "desc": "פריט פקודת ייצור"
    },
    {
     "role": "parent",
     "table": "AFVC",
     "card": "",
     "join": "FROM AFVC JOIN AFKO ON AFVC.AUFPL = AFKO.AUFPL",
     "desc": "פעולות פקודת הייצור"
    },
    {
     "role": "parent",
     "table": "RESB",
     "card": "",
     "join": "FROM RESB JOIN AFKO ON RESB.AUFNR = AFKO.AUFNR",
     "desc": "הזמנת רכיבים לפק\"ע"
    },
    {
     "role": "parent",
     "table": "AFRU",
     "card": "",
     "join": "FROM AFRU JOIN AFKO ON AFRU.AUFNR = AFKO.AUFNR",
     "desc": "דיווחי ביצוע פק\"ע"
    }
   ]
  },
  {
   "name": "T003O",
   "module": "PM",
   "he": "סוגי פקודה (הגדרה)",
   "en": "Order Types (Customizing)",
   "topic": "7. פקודות עבודה (פק\"ע)",
   "fields": 4,
   "tcodes": "SPRO; OIOA, KOT2_OPA",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "seed": false,
   "relations": [
    {
     "role": "parent",
     "table": "TQ80",
     "card": "N:1",
     "join": "TQ80.AUART = T003O.AUART",
     "desc": "סוג ההודעה מגדיר סוג פק\"ע ברירת מחדל"
    },
    {
     "role": "parent",
     "table": "AUFK",
     "card": "N:1",
     "join": "AUFK.AUART = T003O.AUART",
     "desc": "סוג הפקודה מגדיר פרמטרים, טווח מספרים ופרופיל סטטוס"
    }
   ]
  },
  {
   "name": "RESB",
   "module": "PM",
   "he": "הזמנת רכיבים (Reservation)",
   "en": "Reservation / dependent requirements",
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "fields": 6,
   "tcodes": "MB1A/MIGO; MB21, IW32",
   "fiori": "Post Goods Movement / MIGO (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "RESB.AUFNR = AUFK.AUFNR",
     "desc": "הזמנות רכיבים של הפק\"ע"
    }
   ]
  },
  {
   "name": "MSEG",
   "module": "PM",
   "he": "פריטי מסמך חומר (תנועות מלאי)",
   "en": "Material document items",
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "fields": 6,
   "tcodes": "MIGO/MB1A; MB31, MB1C",
   "fiori": "Post Goods Movement (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "MSEG.AUFNR = AUFK.AUFNR",
     "desc": "תנועת המלאי מחויבת לפק\"ע"
    }
   ]
  },
  {
   "name": "EBKN",
   "module": "PM",
   "he": "חיוב דרישת רכש (לפק\"ע)",
   "en": "Requisition account assignment",
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "fields": 5,
   "tcodes": "ME51N; ME52N",
   "fiori": "Manage Purchase Requisitions (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "EBKN.AUFNR = AUFK.AUFNR",
     "desc": "דרישת הרכש מחויבת לפק\"ע"
    }
   ]
  },
  {
   "name": "COSP",
   "module": "PM",
   "he": "סך עלויות חיצוניות (Primary)",
   "en": "CO object cost totals - external postings",
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "fields": 5,
   "tcodes": "KO88/KO8G; KOB1, S_ALR_87013611",
   "fiori": "Maintenance Order Actuals (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "COSP.OBJNR = AUFK.OBJNR",
     "desc": "סך עלויות חיצוניות לפי אובייקט הפק\"ע"
    }
   ]
  },
  {
   "name": "COSS",
   "module": "PM",
   "he": "סך עלויות פנימיות (Secondary)",
   "en": "CO object cost totals - internal postings",
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "fields": 5,
   "tcodes": "KO88; KOB1",
   "fiori": "Maintenance Order Actuals (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "COSS.OBJNR = AUFK.OBJNR",
     "desc": "סך עלויות פנימיות לפי אובייקט הפק\"ע"
    }
   ]
  },
  {
   "name": "COBRA",
   "module": "PM",
   "he": "כותרת חוק התחשבנות",
   "en": "Settlement rule header",
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "fields": 4,
   "tcodes": "KO02; IW32",
   "fiori": "Manage Settlement Rules (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AUFK",
     "card": "1:1",
     "join": "COBRA.OBJNR = AUFK.OBJNR",
     "desc": "כותרת חוק ההתחשבנות של הפק\"ע"
    }
   ]
  },
  {
   "name": "MHIO",
   "module": "PM",
   "he": "אובייקטי קריאת תכנית האחזקה",
   "en": "Maintenance plan call objects",
   "topic": "11. אחזקה מונעת ותוכניות",
   "fields": 5,
   "tcodes": "IP10; IP30, IP24",
   "fiori": "Schedule Maintenance Plans (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MPLA",
     "card": "N:1",
     "join": "MHIO.WARPL = MPLA.WARPL",
     "desc": "אובייקטי קריאת התכנית"
    },
    {
     "role": "child",
     "table": "AUFK",
     "card": "N:1",
     "join": "MHIO.AUFNR = AUFK.AUFNR",
     "desc": "הפק\"ע שנוצרה מהקריאה"
    }
   ]
  },
  {
   "name": "MPLA",
   "module": "PM",
   "he": "כותרת תכנית אחזקה ונתוני תזמון",
   "en": "Maintenance plan header",
   "topic": "11. אחזקה מונעת ותוכניות",
   "fields": 5,
   "tcodes": "IP01/IP02/IP03; IP41, IP42",
   "fiori": "Manage Maintenance Plans (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "parent",
     "table": "MPOS",
     "card": "N:1",
     "join": "MPOS.WARPL = MPLA.WARPL",
     "desc": "פריטי תכנית האחזקה"
    },
    {
     "role": "parent",
     "table": "MHIO",
     "card": "N:1",
     "join": "MHIO.WARPL = MPLA.WARPL",
     "desc": "אובייקטי קריאת התכנית"
    },
    {
     "role": "parent",
     "table": "MHIS",
     "card": "N:1",
     "join": "MHIS.WARPL = MPLA.WARPL",
     "desc": "היסטוריית התזמון של התכנית"
    }
   ]
  },
  {
   "name": "MAKT",
   "module": "PP-PI",
   "he": "טקסטים לתיאור חומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 4,
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MAKT JOIN MARA ON MAKT.MATNR = MARA.MATNR",
     "desc": "תיאורי חומר (טקסטים)"
    }
   ]
  },
  {
   "name": "MARM",
   "module": "PP-PI",
   "he": "יחידות מידה לחומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 6,
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MARM JOIN MARA ON MARM.MATNR = MARA.MATNR",
     "desc": "המרות יחידות מידה חלופיות"
    }
   ]
  },
  {
   "name": "MEAN",
   "module": "PP-PI",
   "he": "מספרי EAN / ברקוד לחומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 5,
   "tcodes": "MM01, MM02, MM03",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MEAN JOIN MARA ON MEAN.MATNR = MARA.MATNR",
     "desc": "ברקודים / EAN לחומר"
    }
   ]
  },
  {
   "name": "MBEW",
   "module": "PP-PI",
   "he": "הערכת שווי חומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 6,
   "tcodes": "MM03, CK11N, CK24, MR21",
   "fiori": "Manage Material Valuation",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MBEW JOIN MARA ON MBEW.MATNR = MARA.MATNR",
     "desc": "הערכת חומר (Valuation)"
    }
   ]
  },
  {
   "name": "MVKE",
   "module": "PP-PI",
   "he": "נתוני מכירה לחומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 4,
   "tcodes": "MM01, MM02, MM03, VK11",
   "fiori": "Manage Product Master Data — Sales",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MVKE JOIN MARA ON MVKE.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מכירות"
    }
   ]
  },
  {
   "name": "MLAN",
   "module": "PP-PI",
   "he": "נתוני מס מכירה לחומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 3,
   "tcodes": "MM01, MM02, MM03",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MLAN JOIN MARA ON MLAN.MATNR = MARA.MATNR",
     "desc": "נתוני מס לחומר (לפי מדינה)"
    }
   ]
  },
  {
   "name": "MLGN",
   "module": "PP-PI",
   "he": "נתוני חומר ברמת מספר מחסן (WM)",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 4,
   "tcodes": "MM01, MM02, LS24",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MLGN JOIN MARA ON MLGN.MATNR = MARA.MATNR",
     "desc": "נתוני חומר ברמת מחסן (WM)"
    }
   ]
  },
  {
   "name": "MCH1",
   "module": "PP-PI",
   "he": "נתוני אצווה לחומר (חוצה-מפעל)",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 7,
   "tcodes": "MSC1N, MSC2N, MSC3N",
   "fiori": "Manage Batches",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MCH1 JOIN MARA ON MCH1.MATNR = MARA.MATNR",
     "desc": "אצוות חומר (Batches)"
    }
   ]
  },
  {
   "name": "MAST",
   "module": "PP-PI",
   "he": "שיוך עץ מוצר (BOM) לחומר",
   "en": "Material number",
   "topic": "2. עץ מוצר (BOM)",
   "fields": 5,
   "tcodes": "CS01, CS02, CS03",
   "fiori": "Manage Bills of Material",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARA",
     "card": "",
     "join": "FROM MAST JOIN MARA ON MAST.MATNR = MARA.MATNR",
     "desc": "קישור חומר לעץ מוצר"
    },
    {
     "role": "parent",
     "table": "STKO",
     "card": "",
     "join": "FROM STKO JOIN MAST ON STKO.STLNR = MAST.STLNR",
     "desc": "כותרת עץ מוצר"
    }
   ]
  },
  {
   "name": "MARD",
   "module": "PP-PI",
   "he": "מלאי חומר ברמת אחסון",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 5,
   "tcodes": "MM03, MMBE, MB52",
   "fiori": "Manage Stock",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARC",
     "card": "",
     "join": "FROM MARD JOIN MARC ON MARD.MATNR = MARC.MATNR AND MARD.WERKS = MARC.WERKS",
     "desc": "נתוני חומר ברמת מחסן/מלאי"
    }
   ]
  },
  {
   "name": "MDMA",
   "module": "PP-PI",
   "he": "נתוני MRP לאזור MRP",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 4,
   "tcodes": "MM02, MD04, MD61",
   "fiori": "Monitor Material Coverage",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARC",
     "card": "",
     "join": "FROM MDMA JOIN MARC ON MDMA.MATNR = MARC.MATNR AND MDMA.WERKS = MARC.WERKS",
     "desc": "אזורי MRP לחומר"
    }
   ]
  },
  {
   "name": "QMAT",
   "module": "PP-PI",
   "he": "הגדרת בדיקת איכות לחומר",
   "en": "Material number",
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "fields": 4,
   "tcodes": "QM01, MM02",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "MARC",
     "card": "",
     "join": "FROM QMAT JOIN MARC ON QMAT.MATNR = MARC.MATNR AND QMAT.WERKS = MARC.WERKS",
     "desc": "הגדרות בדיקת איכות לחומר"
    }
   ]
  },
  {
   "name": "PLAS",
   "module": "PP-PI",
   "he": "שיוך פעולות לרשימת פעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 6,
   "tcodes": "C202, C203",
   "fiori": "Manage Master Recipes",
   "seed": false,
   "relations": [
    {
     "role": "parent",
     "table": "PLPO",
     "card": "",
     "join": "FROM PLPO JOIN PLAS ON PLPO.PLNTY = PLAS.PLNTY AND PLPO.PLNNR = PLAS.PLNNR AND PLPO.PLNKN = PLAS.PLNKN",
     "desc": "פעולות/פאזות במתכון"
    },
    {
     "role": "child",
     "table": "PLKO",
     "card": "",
     "join": "FROM PLAS JOIN PLKO ON PLAS.PLNTY = PLKO.PLNTY AND PLAS.PLNNR = PLKO.PLNNR",
     "desc": "שיוך/בחירת פעולות לרשימה"
    }
   ]
  },
  {
   "name": "PLFL",
   "module": "PP-PI",
   "he": "רצפים ברשימת פעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 4,
   "tcodes": "C202, C203",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "PLKO",
     "card": "",
     "join": "FROM PLFL JOIN PLKO ON PLFL.PLNNR = PLKO.PLNNR",
     "desc": "רצפים במתכון"
    }
   ]
  },
  {
   "name": "PLZU",
   "module": "PP-PI",
   "he": "ניהול שינויים לרשימת פעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 3,
   "tcodes": "C298, CC01",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "PLKO",
     "card": "",
     "join": "FROM PLZU JOIN PLKO ON PLZU.PLNNR = PLKO.PLNNR",
     "desc": "קישור היסטוריית רשימת פעולות"
    }
   ]
  },
  {
   "name": "PLMZ",
   "module": "PP-PI",
   "he": "הקצאת רכיבי BOM לפעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 5,
   "tcodes": "C202, CS08",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "PLPO",
     "card": "",
     "join": "FROM PLMZ JOIN PLPO ON PLMZ.PLNKN = PLPO.PLNKN",
     "desc": "שיוך רכיבים לפעולות"
    }
   ]
  },
  {
   "name": "PLMK",
   "module": "PP-PI",
   "he": "מאפייני בדיקה ברשימת פעולות",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 6,
   "tcodes": "QP01, QP02, C202",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "PLPO",
     "card": "",
     "join": "FROM PLMK JOIN PLPO ON PLMK.PLNKN = PLPO.PLNKN",
     "desc": "מאפייני בדיקה במתכון"
    }
   ]
  },
  {
   "name": "FHMI",
   "module": "PP-PI",
   "he": "אב אמצעי ייצור (PRT) — מבוסס חומר",
   "en": "Task list type",
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "fields": 4,
   "tcodes": "CFV1, CFV2, CFV3",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "PLPO",
     "card": "",
     "join": "FROM FHMI JOIN PLPO ON FHMI.PLNKN = PLPO.PLNKN",
     "desc": "שיוך כלי עזר ייצור (PRT) לפעולה"
    }
   ]
  },
  {
   "name": "CRTX",
   "module": "PM",
   "he": "טקסטים למרכז עבודה",
   "en": "Work center texts",
   "topic": "1. מבנה ארגוני ותשתית",
   "fields": 3,
   "tcodes": "IR02; IR03",
   "fiori": "Manage Work Centers (אמת ID)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "CRHD",
     "card": "N:1",
     "join": "CRTX.OBJID = CRHD.OBJID",
     "desc": "טקסטים של מרכז העבודה (לפי שפה)"
    }
   ]
  },
  {
   "name": "AFVC",
   "module": "PM",
   "he": "פעולות הפקודה",
   "en": "Order Operation",
   "topic": "7. פקודות עבודה (פק\"ע)",
   "fields": 6,
   "tcodes": "IW31/IW32/IW33; IW37N, CM01",
   "fiori": "Find Maintenance Order (F2393)",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "AFKO",
     "card": "N:1",
     "join": "AFVC.AUFPL = AFKO.AUFPL",
     "desc": "פעולות הפק\"ע תחת תוכנית הפעולות"
    },
    {
     "role": "child",
     "table": "CRHD",
     "card": "N:1",
     "join": "AFVC.ARBID = CRHD.OBJID",
     "desc": "מרכז העבודה המבצע את הפעולה"
    }
   ]
  },
  {
   "name": "STPU",
   "module": "PP-PI",
   "he": "מספר צומת פריט",
   "en": "Item node number",
   "topic": "2. עץ מוצר (BOM)",
   "fields": 3,
   "tcodes": "",
   "fiori": "",
   "seed": false,
   "relations": [
    {
     "role": "child",
     "table": "STPO",
     "card": "",
     "join": "FROM STPU JOIN STPO ON STPU.STLKN = STPO.STLKN",
     "desc": "טקסטים ארוכים לפריט עץ מוצר"
    }
   ]
  }
 ],
 "migration": [
  {
   "name": "IFLOT",
   "mod": "pm",
   "he": "רשומת אב של מיקום פונקציונלי",
   "en": "Functional location master record",
   "tcodes": "IL01/IL02/IL03; IH01, IH06",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 6,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי במודל הנתונים (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "IFLOS",
   "mod": "pm",
   "he": "תוויות מבנה למיקום פונקציונלי",
   "en": "Functional Location Label",
   "tcodes": "IL01/IL02/IL03; IH06",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 5,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "ILOA",
   "mod": "pm",
   "he": "נתוני מיקום וחיוב משותפים",
   "en": "PM object location & account assignment",
   "tcodes": "IL02; IE02 (ירושה)",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 6,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRHD",
   "mod": "pm",
   "he": "כותרת מרכז עבודה / משאב",
   "en": "Work center header",
   "tcodes": "IR01/IR02/IR03; CR05, CR06",
   "fiori": "Manage Work Centers (אמת ID)",
   "fields": 6,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRTX",
   "mod": "pm",
   "he": "טקסטים למרכז עבודה",
   "en": "Work center texts",
   "tcodes": "IR02; IR03",
   "fiori": "Manage Work Centers (אמת ID)",
   "fields": 3,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T370T",
   "mod": "pm",
   "he": "טבלת טקסט להגדרות מבנה/קטגוריות PM (Customizing)",
   "en": "PM structure/category customizing text table",
   "tcodes": "SPRO; OIA1, OIMR",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 3,
   "topic": "1. מבנה ארגוני ותשתית",
   "s4Note": "ללא שינוי (Customizing תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EQUI",
   "mod": "pm",
   "he": "רשומת אב של ציוד",
   "en": "Equipment master record",
   "tcodes": "IE01/IE02/IE03; IH08, IE05",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 6,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי במודל הנתונים (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EQKT",
   "mod": "pm",
   "he": "טקסטים (תיאורים) של ציוד",
   "en": "Equipment short texts",
   "tcodes": "IE02; IE03",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 3,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EQUZ",
   "mod": "pm",
   "he": "פלח זמן של ציוד (התקנות/שיוך)",
   "en": "Equipment time segment",
   "tcodes": "IE02; IE4N (התקנה/פירוק)",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 5,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "OBJK",
   "mod": "pm",
   "he": "רשימת אובייקטים / מספרים סידוריים",
   "en": "Object list / serial assignment",
   "tcodes": "IQ01/IQ02/IQ03; IQ08, IQ09",
   "fiori": "Manage Technical Objects (F2079)",
   "fields": 5,
   "topic": "2. ציוד ונתוני מאסטר",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "STKO",
   "mod": "pm",
   "he": "כותרת עץ מוצר (BOM)",
   "en": "BOM header",
   "tcodes": "IB01/CS01; CS02/CS03",
   "fiori": "Manage Bills of Material (אמת ID)",
   "fields": 5,
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "STPO",
   "mod": "pm",
   "he": "פריטי עץ מוצר (BOM)",
   "en": "BOM Item",
   "tcodes": "IB02/CS02; CS11, CS15",
   "fiori": "Manage Bills of Material (אמת ID)",
   "fields": 5,
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MAST",
   "mod": "pm",
   "he": "שיוך עץ מוצר (BOM) לחומר",
   "en": "Material-to-BOM link",
   "tcodes": "CS01; CS02/CS03",
   "fiori": "Manage Bills of Material (אמת ID)",
   "fields": 5,
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EQST",
   "mod": "pm",
   "he": "קישור ציוד לעץ מוצר",
   "en": "Equipment-to-BOM link",
   "tcodes": "IB01; IB02/IB03",
   "fiori": "Manage Bills of Material (אמת ID)",
   "fields": 4,
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TPST",
   "mod": "pm",
   "he": "קישור מיקום פונקציונלי לעץ מוצר",
   "en": "Functional location-to-BOM link",
   "tcodes": "IB11; IB12/IB13",
   "fiori": "Manage Bills of Material (אמת ID)",
   "fields": 4,
   "topic": "3. עצי מוצר של אחזקה (BOM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "IMPTT",
   "mod": "pm",
   "he": "רשומת אב של נקודת מדידה / מונה",
   "en": "Measuring point master",
   "tcodes": "IK01/IK02/IK03; IK07, IK08",
   "fiori": "Manage Measurement Documents (אמת ID)",
   "fields": 6,
   "topic": "4. נקודות מדידה ומונים",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "IMRG",
   "mod": "pm",
   "he": "מסמכי מדידה (קריאות מונה/ערך)",
   "en": "Measurement documents / readings",
   "tcodes": "IK11/IK12/IK13; IK21, IK41",
   "fiori": "Enter Measurement Readings (אמת ID)",
   "fields": 6,
   "topic": "4. נקודות מדידה ומונים",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QPCD",
   "mod": "pm",
   "he": "קודים בתוך קבוצת קוד",
   "en": "Codes within a code group",
   "tcodes": "QS51; QS61",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 4,
   "topic": "5. קטלוגים, קודים ופרופילים",
   "s4Note": "ללא שינוי (Customizing/Master תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QPGR",
   "mod": "pm",
   "he": "קבוצות קודים לאיכות",
   "en": "Code Group (Quality)",
   "tcodes": "QS51; QS61",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 4,
   "topic": "5. קטלוגים, קודים ופרופילים",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T352B",
   "mod": "pm",
   "he": "שיוך פרופיל קטלוג לקבוצות בחירה",
   "en": "Catalog profile to selection-set link",
   "tcodes": "OIM1; OIN4",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 4,
   "topic": "5. קטלוגים, קודים ופרופילים",
   "s4Note": "ללא שינוי (Customizing תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T352",
   "mod": "pm",
   "he": "פרופיל קטלוג (כותרת)",
   "en": "Catalog profile header",
   "tcodes": "OIM1; QCC0",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 3,
   "topic": "5. קטלוגים, קודים ופרופילים",
   "s4Note": "ללא שינוי (Customizing תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMEL",
   "mod": "pm",
   "he": "כותרת הודעת אחזקה",
   "en": "Notification header",
   "tcodes": "IW21/IW22/IW23; IW24, IW28/IW29",
   "fiori": "Report Malfunction (F2215)",
   "fields": 6,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי במודל הנתונים (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMFE",
   "mod": "pm",
   "he": "פריטי הודעת איכות (נזק / גורם)",
   "en": "Quality Notification Item",
   "tcodes": "IW22; IW66",
   "fiori": "Find Maintenance Notification (אמת ID)",
   "fields": 6,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMUR",
   "mod": "pm",
   "he": "סיבות לליקוי",
   "en": "Notification causes",
   "tcodes": "IW22; IW67",
   "fiori": "Find Maintenance Notification (אמת ID)",
   "fields": 5,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMMA",
   "mod": "pm",
   "he": "פעולות / אמצעים בהודעת איכות",
   "en": "Notification Activity",
   "tcodes": "IW22; IW67",
   "fiori": "Report Malfunction (F2215)",
   "fields": 4,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMSM",
   "mod": "pm",
   "he": "משימות בהודעת איכות",
   "en": "Notification Task",
   "tcodes": "IW22; IW66",
   "fiori": "Find Maintenance Notification (אמת ID)",
   "fields": 5,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TQ80",
   "mod": "pm",
   "he": "סוגי הודעה (הגדרה)",
   "en": "Notification Type (Customizing)",
   "tcodes": "OIAL (פריסת מסך); SPRO, QCC0",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 4,
   "topic": "6. הודעות אחזקה (Notifications)",
   "s4Note": "ללא שינוי (Customizing תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AUFK",
   "mod": "pm",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Order master data",
   "tcodes": "IW31/IW32/IW33; IW34, IW38/IW39",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 5,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם - מודל נתונים פשוט יותר לפקודות",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFKO",
   "mod": "pm",
   "he": "נתוני כותרת פקודת ייצור / תהליך",
   "en": "Order header data",
   "tcodes": "IW32; IW37N",
   "fiori": "Create Maintenance Order (אמת ID)",
   "fields": 5,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תואם עם פישוטי תזמון)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFVC",
   "mod": "pm",
   "he": "פעולות הפקודה",
   "en": "Order Operation",
   "tcodes": "IW31/IW32/IW33; IW37N, CM01",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 6,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תואם)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFPO",
   "mod": "pm",
   "he": "פריטי פקודת ייצור",
   "en": "Order item",
   "tcodes": "IW32; IW33",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 4,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תואם)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFIH",
   "mod": "pm",
   "he": "כותרת פקודת אחזקה (PM)",
   "en": "Maintenance Order Header",
   "tcodes": "IW32; IW33",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 6,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תואם)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFWI",
   "mod": "pm",
   "he": "תנועות מלאי המקושרות לדיווחי ביצוע",
   "en": "Goods movements for confirmations",
   "tcodes": "IW41; IW42",
   "fiori": "Confirm Maintenance Order (אמת ID)",
   "fields": 4,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "מותאם (תנועת מלאי ב-MATDOC)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATDOC"
   ],
   "s4Notes": []
  },
  {
   "name": "T003O",
   "mod": "pm",
   "he": "סוגי פקודה (הגדרה)",
   "en": "Order Types (Customizing)",
   "tcodes": "SPRO; OIOA, KOT2_OPA",
   "fiori": "אין Fiori ייעודי (Customizing)",
   "fields": 4,
   "topic": "7. פקודות עבודה (פק\"ע)",
   "s4Note": "ללא שינוי (Customizing תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "JEST",
   "mod": "pm",
   "he": "סטטוסי אובייקט פעילים",
   "en": "Individual object status",
   "tcodes": "BS22/BS23; IW33, IE03",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "fields": 4,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "JSTO",
   "mod": "pm",
   "he": "פרופיל סטטוס לאובייקט",
   "en": "Status object header + profile",
   "tcodes": "BS02/BS03; OIBS",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "fields": 4,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ02T",
   "mod": "pm",
   "he": "טקסטים של סטטוסי מערכת",
   "en": "System status texts",
   "tcodes": "BS23; BS22",
   "fiori": "מוטמע (אין ייעודי)",
   "fields": 4,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ30T",
   "mod": "pm",
   "he": "טקסטים לסטטוס משתמש",
   "en": "User status texts",
   "tcodes": "BS02; BS03",
   "fiori": "מוטמע (אין ייעודי)",
   "fields": 5,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ30",
   "mod": "pm",
   "he": "סטטוסי משתמש (הגדרה)",
   "en": "User Status (Customizing)",
   "tcodes": "BS02/BS03; OIBS",
   "fiori": "מוטמע באפליקציות PM (אין ייעודי)",
   "fields": 5,
   "topic": "8. ניהול סטטוסים (Status Mgmt)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "RESB",
   "mod": "pm",
   "he": "הזמנת רכיבים (Reservation)",
   "en": "Reservation / dependent requirements",
   "tcodes": "MB1A/MIGO; MB21, IW32",
   "fiori": "Post Goods Movement / MIGO (אמת ID)",
   "fields": 6,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EBAN",
   "mod": "pm",
   "he": "דרישת רכש (Purchase Requisition)",
   "en": "Purchase requisition",
   "tcodes": "ME51N; ME52N/ME53N, ME57",
   "fiori": "Manage Purchase Requisitions (אמת ID)",
   "fields": 5,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "מותאם (Business Partner לספקים)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "EBKN",
   "mod": "pm",
   "he": "חיוב דרישת רכש (לפק\"ע)",
   "en": "Requisition account assignment",
   "tcodes": "ME51N; ME52N",
   "fiori": "Manage Purchase Requisitions (אמת ID)",
   "fields": 5,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "מותאם (חיוב ל-ACDOCA)",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "MSEG",
   "mod": "pm",
   "he": "פריטי מסמך חומר (תנועות מלאי)",
   "en": "Material document items",
   "tcodes": "MIGO/MB1A; MB31, MB1C",
   "fiori": "Post Goods Movement (אמת ID)",
   "fields": 6,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "הוחלף - מסמכי חומר מאוחדים ב-MATDOC",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATDOC"
   ],
   "s4Notes": []
  },
  {
   "name": "MKPF",
   "mod": "pm",
   "he": "כותרת מסמך חומר",
   "en": "Material document header",
   "tcodes": "MIGO; MB1A",
   "fiori": "Post Goods Movement (אמת ID)",
   "fields": 5,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "הוחלף - מאוחד ב-MATDOC",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATDOC"
   ],
   "s4Notes": []
  },
  {
   "name": "BUT000",
   "mod": "pm",
   "he": "נתוני אב שותף עסקי",
   "en": "Business Partner — General Data",
   "tcodes": "BP; (ECC: XK01/MK01 לספקים)",
   "fiori": "Manage Business Partner Master Data (אמת ID)",
   "fields": 5,
   "topic": "9. אינטגרציית מלאי ורכש (PM-MM)",
   "s4Note": "הוחלף - Business Partner מחליף ספקים/לקוחות (CVI חובה)",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "CVI"
   ],
   "s4Notes": []
  },
  {
   "name": "COSP",
   "mod": "pm",
   "he": "סך עלויות חיצוניות (Primary)",
   "en": "CO object cost totals - external postings",
   "tcodes": "KO88/KO8G; KOB1, S_ALR_87013611",
   "fiori": "Maintenance Order Actuals (אמת ID)",
   "fields": 5,
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "s4Note": "הוחלף - עלויות ב-Universal Journal",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "COSS",
   "mod": "pm",
   "he": "סך עלויות פנימיות (Secondary)",
   "en": "CO object cost totals - internal postings",
   "tcodes": "KO88; KOB1",
   "fiori": "Maintenance Order Actuals (אמת ID)",
   "fields": 5,
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "s4Note": "הוחלף - עלויות ב-Universal Journal",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "COBRA",
   "mod": "pm",
   "he": "כותרת חוק התחשבנות",
   "en": "Settlement rule header",
   "tcodes": "KO02; IW32",
   "fiori": "Manage Settlement Rules (אמת ID)",
   "fields": 4,
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "COBRB",
   "mod": "pm",
   "he": "פריטי חוק התחשבנות (חוקי חלוקה)",
   "en": "Settlement / distribution rules",
   "tcodes": "KO02; IW32",
   "fiori": "Manage Settlement Rules (אמת ID)",
   "fields": 5,
   "topic": "10. עלויות והתחשבנות (PM-CO)",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLKO",
   "mod": "pm",
   "he": "כותרת רשימת פעולות (Routing)",
   "en": "Task list header",
   "tcodes": "IA05/IA01/IA11; IA06, IA08",
   "fiori": "Manage Task Lists (אמת ID)",
   "fields": 5,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLPO",
   "mod": "pm",
   "he": "פעולות ברשימת הפעולות",
   "en": "Task list operations",
   "tcodes": "IA01/IA05; IA06",
   "fiori": "Manage Task Lists (אמת ID)",
   "fields": 6,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MPLA",
   "mod": "pm",
   "he": "כותרת תכנית אחזקה ונתוני תזמון",
   "en": "Maintenance plan header",
   "tcodes": "IP01/IP02/IP03; IP41, IP42",
   "fiori": "Manage Maintenance Plans (אמת ID)",
   "fields": 5,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MPOS",
   "mod": "pm",
   "he": "פריט תכנית אחזקה",
   "en": "Maintenance item",
   "tcodes": "IP04; IP02",
   "fiori": "Manage Maintenance Plans (אמת ID)",
   "fields": 6,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MHIO",
   "mod": "pm",
   "he": "אובייקטי קריאת תכנית האחזקה",
   "en": "Maintenance plan call objects",
   "tcodes": "IP10; IP30, IP24",
   "fiori": "Schedule Maintenance Plans (אמת ID)",
   "fields": 5,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MHIS",
   "mod": "pm",
   "he": "היסטוריית תזמון תכנית אחזקה",
   "en": "Maintenance plan scheduling history",
   "tcodes": "IP10; IP30",
   "fiori": "Schedule Maintenance Plans (אמת ID)",
   "fields": 4,
   "topic": "11. אחזקה מונעת ותוכניות",
   "s4Note": "ללא שינוי (תואם)",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "QMEL",
   "mod": "pm",
   "he": "הודעות (כולל היסטוריות) לניתוח אמינות",
   "en": "Notifications incl. historical",
   "tcodes": "IW64; IW66/IW67",
   "fiori": "Maintenance Backlog (אמת ID)",
   "fields": 5,
   "topic": "12. היסטוריה וארכיון",
   "s4Note": "ללא שינוי; ניתוח דרך Analytics/CDS",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "CDS"
   ],
   "s4Notes": []
  },
  {
   "name": "AUFK",
   "mod": "pm",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Orders incl. historical",
   "tcodes": "IW39; IW13",
   "fiori": "Find Maintenance Order (F2393)",
   "fields": 5,
   "topic": "12. היסטוריה וארכיון",
   "s4Note": "מותאם; עלות ב-ACDOCA",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "ADMI_RUN",
   "mod": "pm",
   "he": "ריצות ניהול ארכוב (Archiving)",
   "en": "Archiving Run",
   "tcodes": "SARA; AOBJ, DB15",
   "fiori": "Data Archiving (אמת ID)",
   "fields": 4,
   "topic": "12. היסטוריה וארכיון",
   "s4Note": "ללא שינוי; ILM אופציונלי ב-S/4",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ILM"
   ],
   "s4Notes": []
  },
  {
   "name": "MARA",
   "mod": "pp-pi",
   "he": "נתוני חומר כלליים",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "fields": 8,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "MATNR מורחב 18->40 (SAP Note 2267140); בדוק ממשקים, ברקודים והמרות EAN.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATNR",
    "EAN"
   ],
   "s4Notes": [
    "2267140"
   ]
  },
  {
   "name": "MAKT",
   "mod": "pp-pi",
   "he": "טקסטים לתיאור חומר",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי; MATNR מורחב משפיע על המפתח.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATNR"
   ],
   "s4Notes": []
  },
  {
   "name": "MARC",
   "mod": "pp-pi",
   "he": "נתוני חומר ברמת מפעל",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03, MD04",
   "fiori": "Manage Product Master Data — Plant",
   "fields": 8,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "MRP Live מחליף MRP קלאסי; שדות תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MRP",
    "MATDOC",
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "MARD",
   "mod": "pp-pi",
   "he": "מלאי חומר ברמת אחסון",
   "en": "Material number",
   "tcodes": "MM03, MMBE, MB52",
   "fiori": "Manage Stock",
   "fields": 5,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "מלאי מנוהל ב-MATDOC; MARD הופך ל-Aggregate/View.",
   "s4Impact": "action",
   "s4AltTable": [
    "MARD"
   ],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATDOC"
   ],
   "s4Notes": []
  },
  {
   "name": "MARM",
   "mod": "pp-pi",
   "he": "יחידות מידה לחומר",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "Manage Product Master Data",
   "fields": 6,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי מבני; אמת מקדמי עיגול (rounding) למניעת סטיות מלאי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MEAN",
   "mod": "pp-pi",
   "he": "מספרי EAN / ברקוד לחומר",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "",
   "fields": 5,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MBEW",
   "mod": "pp-pi",
   "he": "הערכת שווי חומר",
   "en": "Material number",
   "tcodes": "MM03, CK11N, CK24, MR21",
   "fiori": "Manage Material Valuation",
   "fields": 6,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "Material Ledger חובה ב-S/4HANA; הערכה ב-ACDOCA/ACDOCC.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA",
    "ACDOCC"
   ],
   "s4Notes": []
  },
  {
   "name": "MVKE",
   "mod": "pp-pi",
   "he": "נתוני מכירה לחומר",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03, VK11",
   "fiori": "Manage Product Master Data — Sales",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי; לקוחות דרך Business Partner.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MLAN",
   "mod": "pp-pi",
   "he": "נתוני מס מכירה לחומר",
   "en": "Material number",
   "tcodes": "MM01, MM02, MM03",
   "fiori": "",
   "fields": 3,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MLGN",
   "mod": "pp-pi",
   "he": "נתוני חומר ברמת מספר מחסן (WM)",
   "en": "Material number",
   "tcodes": "MM01, MM02, LS24",
   "fiori": "",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "EWM אסטרטגי; LE-WM קלאסי נתמך עם הגבלות.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "EWM"
   ],
   "s4Notes": []
  },
  {
   "name": "MLGT",
   "mod": "pp-pi",
   "he": "נתוני חומר לסוג אחסון (WM)",
   "en": "Material number",
   "tcodes": "MM01, MM02, LS24",
   "fiori": "",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "EWM אסטרטגי.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "EWM"
   ],
   "s4Notes": []
  },
  {
   "name": "MDMA",
   "mod": "pp-pi",
   "he": "נתוני MRP לאזור MRP",
   "en": "Material number",
   "tcodes": "MM02, MD04, MD61",
   "fiori": "Monitor Material Coverage",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "אזורי MRP פעילים כברירת מחדל ב-MRP Live.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MRP"
   ],
   "s4Notes": []
  },
  {
   "name": "QMAT",
   "mod": "pp-pi",
   "he": "הגדרת בדיקת איכות לחומר",
   "en": "Material number",
   "tcodes": "QM01, MM02",
   "fiori": "",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי מבני.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MCH1",
   "mod": "pp-pi",
   "he": "נתוני אצווה לחומר (חוצה-מפעל)",
   "en": "Material number",
   "tcodes": "MSC1N, MSC2N, MSC3N",
   "fiori": "Manage Batches",
   "fields": 7,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי מבני; MATNR מורחב 18->40 במפתח.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATNR"
   ],
   "s4Notes": []
  },
  {
   "name": "MCHA",
   "mod": "pp-pi",
   "he": "נתוני אצווה ברמת מפעל",
   "en": "Material number",
   "tcodes": "MSC1N, MSC2N, MSC3N",
   "fiori": "Manage Batches",
   "fields": 4,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T006",
   "mod": "pp-pi",
   "he": "יחידת מידה",
   "en": "Unit of measure",
   "tcodes": "",
   "fiori": "",
   "fields": 5,
   "topic": "1. נתוני אב חומר ויחידות מידה (",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MAST",
   "mod": "pp-pi",
   "he": "שיוך עץ מוצר (BOM) לחומר",
   "en": "Material number",
   "tcodes": "CS01, CS02, CS03",
   "fiori": "Manage Bills of Material",
   "fields": 5,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי; MATNR מורחב משפיע על המפתח ועל IDNRK.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATNR",
    "IDNRK"
   ],
   "s4Notes": []
  },
  {
   "name": "STKO",
   "mod": "pp-pi",
   "he": "כותרת עץ מוצר (BOM)",
   "en": "BOM category",
   "tcodes": "CS01, CS02, CS03, CS11",
   "fiori": "Manage Bills of Material",
   "fields": 6,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "STPO",
   "mod": "pp-pi",
   "he": "פריטי עץ מוצר (BOM)",
   "en": "BOM category",
   "tcodes": "CS01, CS02, CS03, CS12",
   "fiori": "Manage Bills of Material",
   "fields": 9,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי; IDNRK מורחב 18->40.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "IDNRK"
   ],
   "s4Notes": []
  },
  {
   "name": "STAS",
   "mod": "pp-pi",
   "he": "שיוך פריטי עץ מוצר",
   "en": "BOM category",
   "tcodes": "CS01, CS02, CS03",
   "fiori": "",
   "fields": 5,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "STZU",
   "mod": "pp-pi",
   "he": "ניהול והיסטוריית עץ מוצר",
   "en": "BOM category",
   "tcodes": "CC01, CC02, CS03",
   "fiori": "",
   "fields": 4,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "STPU",
   "mod": "pp-pi",
   "he": "מספר צומת פריט",
   "en": "Item node number",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "KDST",
   "mod": "pp-pi",
   "he": "מסמך מכירה",
   "en": "Sales document",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "2. עץ מוצר (BOM)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLKO",
   "mod": "pp-pi",
   "he": "כותרת רשימת פעולות (Routing)",
   "en": "Task list type (2=recipe)",
   "tcodes": "C201, C202, C203, CA01",
   "fiori": "Manage Master Recipes",
   "fields": 7,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי מבני; Fiori 'Manage Master Recipes'.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLPO",
   "mod": "pp-pi",
   "he": "פעולות ברשימת הפעולות",
   "en": "Task list type",
   "tcodes": "C201, C202, C203, CA02",
   "fiori": "Manage Master Recipes",
   "fields": 9,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי; ביצוע דרך Control Recipe / PI sheet.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLAS",
   "mod": "pp-pi",
   "he": "שיוך פעולות לרשימת פעולות",
   "en": "Task list type",
   "tcodes": "C202, C203",
   "fiori": "Manage Master Recipes",
   "fields": 6,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLFL",
   "mod": "pp-pi",
   "he": "רצפים ברשימת פעולות",
   "en": "Task list type",
   "tcodes": "C202, C203",
   "fiori": "",
   "fields": 4,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLMZ",
   "mod": "pp-pi",
   "he": "הקצאת רכיבי BOM לפעולות",
   "en": "Task list type",
   "tcodes": "C202, CS08",
   "fiori": "",
   "fields": 5,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLMK",
   "mod": "pp-pi",
   "he": "מאפייני בדיקה ברשימת פעולות",
   "en": "Task list type",
   "tcodes": "QP01, QP02, C202",
   "fiori": "",
   "fields": 6,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי מבני.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MAPL",
   "mod": "pp-pi",
   "he": "שיוך רשימת פעולות לחומר",
   "en": "Material number",
   "tcodes": "CA01, CA02, CA03, C201",
   "fiori": "Manage Routings / Recipes",
   "fields": 5,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "FHMI",
   "mod": "pp-pi",
   "he": "אב אמצעי ייצור (PRT) — מבוסס חומר",
   "en": "Task list type",
   "tcodes": "CFV1, CFV2, CFV3",
   "fiori": "",
   "fields": 4,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "PLZU",
   "mod": "pp-pi",
   "he": "ניהול שינויים לרשימת פעולות",
   "en": "Task list type",
   "tcodes": "C298, CC01",
   "fiori": "",
   "fields": 3,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TC60",
   "mod": "pp-pi",
   "he": "מפתח בקרה",
   "en": "Control key",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TCA01",
   "mod": "pp-pi",
   "he": "מזהה פרופיל",
   "en": "Profile ID",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "3. מתכון ייצור ופעולות (Master ",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "MKAL",
   "mod": "pp-pi",
   "he": "גרסאות ייצור לחומר",
   "en": "Material number",
   "tcodes": "C223, MM02",
   "fiori": "Manage Production Versions",
   "fields": 15,
   "topic": "4. גרסאות ייצור (Production Ver",
   "s4Note": "חובה 100% ב-S/4HANA - הרץ C223 ובדוק תוקף/עקביות לכל חומר מיוצר לפני ההמרה (Pre-check קריטי).",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [
    "C223"
   ],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRHD",
   "mod": "pp-pi",
   "he": "כותרת מרכז עבודה / משאב",
   "en": "Object type (A=work center)",
   "tcodes": "CR01, CR02, CR03, CRC1",
   "fiori": "Manage Work Centers / Resources",
   "fields": 7,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי מבני; Fiori 'Manage Work Centers'.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRTX",
   "mod": "pp-pi",
   "he": "טקסטים למרכז עבודה",
   "en": "Object type",
   "tcodes": "CR01, CR02, CR03",
   "fiori": "Manage Work Centers / Resources",
   "fields": 4,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRCO",
   "mod": "pp-pi",
   "he": "הקצאת מרכז עלות למרכז עבודה",
   "en": "Object type",
   "tcodes": "CR01, CR02, KS01",
   "fiori": "",
   "fields": 6,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "התחשבנות ב-Universal Journal (ACDOCA); הקצאה נשמרת.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "CRCA",
   "mod": "pp-pi",
   "he": "הקצאות קיבולת למרכז עבודה",
   "en": "Object type",
   "tcodes": "CR11, CR12, CR13",
   "fiori": "",
   "fields": 4,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "KAKO",
   "mod": "pp-pi",
   "he": "קטגוריית קיבולת (כותרת)",
   "en": "Capacity ID",
   "tcodes": "CR11, CR12, CR13",
   "fiori": "",
   "fields": 4,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRFH",
   "mod": "pp-pi",
   "he": "אב אמצעי ייצור (PRT) — מבוסס מרכז עבודה",
   "en": "Object type (F=PRT)",
   "tcodes": "CFC1, CFC2, CFC3",
   "fiori": "",
   "fields": 4,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CRVD_A",
   "mod": "pp-pi",
   "he": "קשרי ברירת מחדל למרכז עבודה",
   "en": "Object type",
   "tcodes": "CR02, CR03",
   "fiori": "",
   "fields": 3,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "CSLA",
   "mod": "pp-pi",
   "he": "סוג פעילות",
   "en": "Activity type",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "תעריפים ב-Universal Journal; הגדרה נשמרת.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "KAZT",
   "mod": "pp-pi",
   "he": "מרווחי זמן ומשמרות לקיבולת",
   "en": "Capacity ID",
   "tcodes": "CR11, CR12, CR13",
   "fiori": "",
   "fields": 6,
   "topic": "5. משאבים  מרכזי עבודה (Resourc",
   "s4Note": "ללא שינוי מבני.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AUFK",
   "mod": "pp-pi",
   "he": "נתוני אב של פקודה (כותרת ארגונית)",
   "en": "Order number",
   "tcodes": "COR1, COR2, COR3, CO01, KO04",
   "fiori": "Manage Process Orders",
   "fields": 5,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מודל מותאם; עלויות ב-ACDOCA.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "AFKO",
   "mod": "pp-pi",
   "he": "נתוני כותרת פקודת ייצור / תהליך",
   "en": "Order number",
   "tcodes": "COR1, COR2, COR3, COR6N, COHVPI",
   "fiori": "Manage Process Orders",
   "fields": 6,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מותאם (תואם).",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFPO",
   "mod": "pp-pi",
   "he": "פריטי פקודת ייצור",
   "en": "Order number",
   "tcodes": "COR2, COR3, COHVPI",
   "fiori": "Manage Process Orders",
   "fields": 5,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מותאם (תואם).",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFVC",
   "mod": "pp-pi",
   "he": "פעולות הפקודה",
   "en": "Routing number of operations",
   "tcodes": "COR2, COR3, CA02",
   "fiori": "Manage Process Orders",
   "fields": 6,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מותאם (תואם).",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "RESB",
   "mod": "pp-pi",
   "he": "מספר הזמנה",
   "en": "Reservation number",
   "tcodes": "COR3, MB21, MB22, CO27",
   "fiori": "Manage Reservations",
   "fields": 6,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "ללא שינוי; תנועת מלאי ב-MATDOC.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MATDOC"
   ],
   "s4Notes": []
  },
  {
   "name": "AFRU",
   "mod": "pp-pi",
   "he": "מספר דיווח",
   "en": "Confirmation number",
   "tcodes": "CORK, COR6N, CO11N, CO15",
   "fiori": "Confirm Production Operation",
   "fields": 5,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "ללא שינוי; עלויות ב-ACDOCA.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "AFFH",
   "mod": "pp-pi",
   "he": "הקצאת PRT לפעולת פקודה",
   "en": "Routing number",
   "tcodes": "COR2, CFC2",
   "fiori": "",
   "fields": 3,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "AFFL",
   "mod": "pp-pi",
   "he": "רצף פעולות בפקודה",
   "en": "Routing number of operations",
   "tcodes": "COR2, COR3",
   "fiori": "",
   "fields": 4,
   "topic": "6. פק\"ע ייצור ומתכון בקרה (Proc",
   "s4Note": "מותאם (תואם).",
   "s4Impact": "adapted",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T134",
   "mod": "pp-pi",
   "he": "סוגי חומר (הגדרה)",
   "en": "Material type",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T134T",
   "mod": "pp-pi",
   "he": "טקסטים לסוג חומר",
   "en": "Material type",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T023",
   "mod": "pp-pi",
   "he": "קבוצות חומר (הגדרה)",
   "en": "Material group",
   "tcodes": "",
   "fiori": "",
   "fields": 2,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T023T",
   "mod": "pp-pi",
   "he": "טקסטים לקבוצת חומר",
   "en": "Material group",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "T399X",
   "mod": "pp-pi",
   "he": "פרמטרי בקרת MRP למפעל",
   "en": "Plant",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TCK03",
   "mod": "pp-pi",
   "he": "וריאנט תמחיר",
   "en": "Costing variant",
   "tcodes": "",
   "fiori": "",
   "fields": 3,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "תואם; הערכה ב-Material Ledger/ACDOCA.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "ACDOCA"
   ],
   "s4Notes": []
  },
  {
   "name": "T438M",
   "mod": "pp-pi",
   "he": "סוג MRP",
   "en": "MRP type",
   "tcodes": "",
   "fiori": "",
   "fields": 2,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "MRP Live - חלק מהפרמטרים מותאמים; אמת מול SAP Help.",
   "s4Impact": "action",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "MRP"
   ],
   "s4Notes": []
  },
  {
   "name": "T003O",
   "mod": "pp-pi",
   "he": "סוגי פקודה (הגדרה)",
   "en": "Order type",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TCO01",
   "mod": "pp-pi",
   "he": "מפעל",
   "en": "Plant",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ30",
   "mod": "pp-pi",
   "he": "סטטוסי משתמש (הגדרה)",
   "en": "Status profile",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ30T",
   "mod": "pp-pi",
   "he": "טקסטים לסטטוס משתמש",
   "en": "Status profile",
   "tcodes": "",
   "fiori": "",
   "fields": 5,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "BUT000",
   "mod": "pp-pi",
   "he": "נתוני אב שותף עסקי",
   "en": "Business partner number",
   "tcodes": "",
   "fiori": "",
   "fields": 5,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "הוחלף - Business Partner חובה (CVI); ראה SAP Note 2265093.",
   "s4Impact": "replaced",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [
    "CVI"
   ],
   "s4Notes": [
    "2265093"
   ]
  },
  {
   "name": "TC22",
   "mod": "pp-pi",
   "he": "מפתח בקרה",
   "en": "Control key",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי (Customizing).",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "JEST",
   "mod": "pp-pi",
   "he": "סטטוסי אובייקט פעילים",
   "en": "Object number",
   "tcodes": "BS22, BS23, IW33, COR3",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי; ניהול סטטוס זהה ב-S/4.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "JSTO",
   "mod": "pp-pi",
   "he": "פרופיל סטטוס לאובייקט",
   "en": "Object number",
   "tcodes": "BS02, BS22",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  },
  {
   "name": "TJ02T",
   "mod": "pp-pi",
   "he": "סטטוס מערכת פנימי",
   "en": "Internal system status",
   "tcodes": "",
   "fiori": "",
   "fields": 4,
   "topic": "7. קונפיגורציה (Customizing)",
   "s4Note": "ללא שינוי.",
   "s4Impact": "compat",
   "s4AltTable": [],
   "s4AltTcode": [],
   "s4Mentions": [],
   "s4Notes": []
  }
 ],
 "migrationLegend": {
  "compat": "ללא שינוי / תואם",
  "adapted": "מותאם",
  "replaced": "הוחלף",
  "action": "דורש פעולה או בדיקה"
 },
 "migrationSource": "הערות S/4HANA מועתקות מילה במילה מהמאגר (shared/neo-real-content.json). הסיווג נגזר מפתיח ההערה בלבד."
};
export default NEO;
