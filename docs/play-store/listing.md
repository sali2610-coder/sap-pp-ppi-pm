# Google Play — Store Listing (ready to paste)

All text is ready to copy into the Play Console once the account is open.
Language: Hebrew (primary), with English fallbacks.

---

## App details

| Field | Value |
|-------|-------|
| **App name** (≤30) | `SAP by Sali · Project NEO` |
| **Package name** | `app.sapbysali.twa` |
| **Category** | Education (secondary: Business) |
| **Content rating** | Everyone / כל הגילאים |
| **Contains ads** | No |
| **In-app purchases** | No |
| **Website** | https://sapbysali.app |
| **Privacy policy** | https://sapbysali.app/privacy/ |
| **Support email** | sali2610@gmail.com |

## Short description (≤80 chars)

> פלטפורמת ידע ל-SAP: אחזקה (PM), ייצור (PP-PI), טבלאות, תהליכים ומעבר ל-S/4HANA.

(78 chars.)

English fallback (≤80):
> SAP knowledge platform — PM, PP-PI, tables, processes, S/4HANA migration.

## Full description (≤4000 chars)

> **SAP by Sali · Project NEO** היא פלטפורמת הידע האינטראקטיבית ל-SAP — לאנשי אחזקה (PM), ייצור (PP-PI), יועצים, מפתחי ABAP ואנשי מקצוע שרוצים להבין את SAP לעומק ולהתכונן למעבר ל-S/4HANA.
>
> הכול עובד גם ללא רשת (Offline-First), בלי חשבון, בלי פרסומות ובלי איסוף מידע.
>
> **מה יש בפנים:**
> • חוקר טבלאות מתקדם — כל טבלאות ה-PM/PP-PI עם שדות, מפתחות, קשרים, CDS ומעבר ECC↔S/4.
> • Architecture Studio — מפת קשרים אינטראקטיבית בין טבלאות, BAPIs, CDS ואובייקטים.
> • מרכזי ידע — טרנזקציות, BAPIs/FMs, IDocs, User-Exits/BAdIs, Enhancements, Fiori Apps.
> • תהליכים מקצה-לקצה — בלופרינטים, מדריכי תהליך, MRP/MPS, קונפיגורציה (SPRO).
> • פתרון תקלות — קטלוג תקלות, נתיבי פתרון, SAP Notes ו-Debugging.
> • מעבר ל-S/4HANA — מה נשאר, מה השתנה, מה הוסר, והשפעת המיגרציה.
> • SAP Academy — מסלולי לימוד מובנים עם מעקב התקדמות מקומי.
>
> **למה זה שונה:**
> • 100% אופליין — נטען מהיר, עובד גם בלי אינטרנט.
> • פרטיות מלאה — אפס עוקבים, אפס SDK, אפס איסוף מידע. ההתקדמות נשמרת רק במכשיר.
> • ממשק מקצועי ב-RTL עברית, מותאם לטלפון, טאבלט ומסך גדול.
>
> נבנה על ידי Sali Halif.

## Promo text (≤170 chars, optional)

> כל הידע של SAP PM ו-PP-PI במקום אחד — טבלאות, תהליכים, תקלות ומעבר ל-S/4HANA. אופליין, פרטי, מהיר.

## ASO keywords (for reference — Play has no keyword field)

SAP, PP-PI, Plant Maintenance, PM, Production Planning, S/4HANA, ABAP, Fiori,
BAPI, IDoc, CDS, SAP tables, SAP transactions, SAP learning, ECC, migration,
טבלאות SAP, אחזקה, ייצור, יועץ SAP

---

## Graphic assets (in this folder)

| Asset | File | Spec |
|-------|------|------|
| App icon (hi-res) | `play-icon-512.png` | 512×512 PNG, full-bleed (Play masks) |
| Feature graphic | `feature-graphic.png` | 1024×500 PNG |
| Phone screenshots | `../../public/screenshots/phone-*.png` | 1080×1920 (≥2 required) |
| Tablet screenshots | `tablet-*.png` | 1600×2560 / 2560×1600 (7"+10") |

Phone screenshots live in `public/screenshots/` (also referenced by the web
manifest). Tablet screenshots + the two store graphics live here.

## Data Safety form answers

- Does your app collect or share user data? **No.**
- Data processed only on device (progress/settings via localStorage) — not
  "collected" per Play's definition (never leaves the device).
- Encryption in transit: **Yes** (HTTPS only).
- Users can request deletion: **N/A** — nothing is stored off-device; users can
  clear local data anytime from within the app / browser settings.
