// GENERATED. Node tiers and edge evidence are derived from the real dataset.
// tier=full -> dictionary+books | books -> library only | planned -> NO content (must render as בקרוב)
// edge strength=evidence -> backed by a real topic/description | speculative -> known SAP relation NOT in our data
export const UNIVERSE = {
 "nodes": [
  {
   "id": "PM",
   "he": "אחזקה",
   "en": "Plant Maintenance",
   "tier": "full",
   "topics": 12,
   "tables": 58,
   "fields": 280,
   "funcs": 95
  },
  {
   "id": "PP-PI",
   "he": "ייצור תהליכי",
   "en": "Production Planning – Process",
   "tier": "full",
   "topics": 7,
   "tables": 68,
   "fields": 326,
   "funcs": 71
  },
  {
   "id": "PP",
   "he": "תכנון ייצור",
   "en": "Production Planning",
   "tier": "books"
  },
  {
   "id": "PP/DS",
   "he": "תכנון מפורט",
   "en": "Detailed Scheduling",
   "tier": "books"
  },
  {
   "id": "MM",
   "he": "חומרים ורכש",
   "en": "Materials Management",
   "tier": "books"
  },
  {
   "id": "QM",
   "he": "ניהול איכות",
   "en": "Quality Management",
   "tier": "books"
  },
  {
   "id": "EWM",
   "he": "מחסן מתקדם",
   "en": "Extended Warehouse Mgmt",
   "tier": "books"
  },
  {
   "id": "Fiori",
   "he": "אפליקציות Fiori",
   "en": "Fiori Apps",
   "tier": "books"
  },
  {
   "id": "S&OP",
   "he": "תכנון מכר-תפעול",
   "en": "Sales & Operations Planning",
   "tier": "books"
  },
  {
   "id": "S/4",
   "he": "יסודות S/4HANA",
   "en": "S/4HANA Foundation",
   "tier": "books"
  },
  {
   "id": "WM",
   "he": "ניהול מחסן",
   "en": "Warehouse Management",
   "tier": "planned"
  },
  {
   "id": "SD",
   "he": "מכירות והפצה",
   "en": "Sales & Distribution",
   "tier": "planned"
  },
  {
   "id": "FI",
   "he": "הנהלת חשבונות",
   "en": "Financial Accounting",
   "tier": "planned"
  },
  {
   "id": "CO",
   "he": "בקרת עלויות",
   "en": "Controlling",
   "tier": "planned"
  },
  {
   "id": "BTP",
   "he": "פלטפורמה",
   "en": "Business Technology Platform",
   "tier": "planned"
  }
 ],
 "edges": [
  {
   "a": "PM",
   "b": "MM",
   "strength": "evidence",
   "note": "נושא שלם במילון: 9. אינטגרציית מלאי ורכש (PM-MM) · 6 טבלאות"
  },
  {
   "a": "PM",
   "b": "CO",
   "strength": "evidence",
   "note": "נושא שלם במילון: 10. עלויות והתחשבנות (PM-CO) · 4 טבלאות"
  },
  {
   "a": "PP-PI",
   "b": "WM",
   "strength": "evidence",
   "note": "3 אזכורים בתיאורי הטבלאות"
  },
  {
   "a": "PP-PI",
   "b": "EWM",
   "strength": "evidence",
   "note": "2 אזכורים בתיאורי הטבלאות"
  },
  {
   "a": "PP-PI",
   "b": "Fiori",
   "strength": "evidence",
   "note": "2 אזכורים · אפליקציות Fiori ממופות לטבלאות"
  },
  {
   "a": "PM",
   "b": "Fiori",
   "strength": "evidence",
   "note": "שדה fioriApp מאוכלס על טבלאות PM"
  },
  {
   "a": "PP-PI",
   "b": "QM",
   "strength": "speculative",
   "note": "קשר SAP ידוע — טרם מגובה בנתוני הפרויקט"
  },
  {
   "a": "PP",
   "b": "MM",
   "strength": "speculative",
   "note": "קשר SAP ידוע — טרם מגובה בנתוני הפרויקט"
  },
  {
   "a": "SD",
   "b": "FI",
   "strength": "speculative",
   "note": "קשר SAP ידוע — טרם מגובה בנתוני הפרויקט"
  },
  {
   "a": "PP-PI",
   "b": "PP/DS",
   "strength": "speculative",
   "note": "קשר SAP ידוע — טרם מגובה בנתוני הפרויקט"
  },
  {
   "a": "PP",
   "b": "PP-PI",
   "strength": "speculative",
   "note": "קשר SAP ידוע — טרם מגובה בנתוני הפרויקט"
  }
 ],
 "legend": {
  "full": "מילון נתונים מלא + ספרים",
  "books": "ספרייה בלבד — מילון בקרוב",
  "planned": "בתכנון — אין תוכן"
 },
 "booksByModule": {
  "PM": [
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
  "S&OP": [
   {
    "id": "book10",
    "title": "Sales and Operations Planning with SAP IBP",
    "module": "S&OP",
    "chapters": 11,
    "sections": 211,
    "hebrew": false,
    "minutes": 960
   }
  ],
  "S/4HANA": [
   {
    "id": "book11",
    "title": "Prerequisites for SAP S/4HANA End-to-End Implementation Training",
    "module": "S/4HANA",
    "chapters": 9,
    "sections": 77,
    "hebrew": false,
    "minutes": 215
   }
  ],
  "PP": [
   {
    "id": "book2",
    "title": "Production Planning with SAP S/4HANA",
    "module": "PP",
    "chapters": 15,
    "sections": 496,
    "hebrew": false,
    "minutes": 2077
   }
  ],
  "MM": [
   {
    "id": "book3",
    "title": "Sourcing and Procurement with SAP S/4HANA",
    "module": "MM",
    "chapters": 18,
    "sections": 374,
    "hebrew": false,
    "minutes": 1681
   }
  ],
  "PP/DS": [
   {
    "id": "book4",
    "title": "PP/DS with SAP S/4HANA",
    "module": "PP/DS",
    "chapters": 11,
    "sections": 195,
    "hebrew": false,
    "minutes": 1288
   }
  ],
  "QM": [
   {
    "id": "book5",
    "title": "Quality Management with SAP S/4HANA",
    "module": "QM",
    "chapters": 20,
    "sections": 502,
    "hebrew": false,
    "minutes": 1865
   }
  ],
  "EWM": [
   {
    "id": "book6",
    "title": "Integrating Warehouse Management in SAP S/4HANA",
    "module": "EWM",
    "chapters": 10,
    "sections": 88,
    "hebrew": false,
    "minutes": 765
   }
  ],
  "Fiori": [
   {
    "id": "book7",
    "title": "SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide",
    "module": "Fiori",
    "chapters": 11,
    "sections": 1689,
    "hebrew": false,
    "minutes": 2937
   }
  ]
 }
};
export default UNIVERSE;
