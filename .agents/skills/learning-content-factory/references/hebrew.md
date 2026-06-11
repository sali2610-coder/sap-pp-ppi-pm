# Hebrew Learning Notes — Rules

Hebrew learners of SAP/technical material need the *explanation* in Hebrew but the *identifiers* intact.
A tcode, table name, command, or API is a literal token — translating or transliterating it breaks it.

## Core rules
1. **Translate the explanation, keep identifiers in Latin.** Hebrew prose; SAP/technical tokens stay
   exactly as written: `VA01`, `EKKO`, `BAPI_SALESORDER_CREATEFROMDAT2`, `kubectl get pods`, `SPRO`.
   - Good: `כדי ליצור הזמנת מכר משתמשים ב-VA01; הכותרת נשמרת בטבלה VBAK.`
   - Bad: `משתמשים ב"וי-איי-אפס-אחת"` (transliterated tcode — now useless).
2. **RTL with embedded LTR.** Hebrew runs right-to-left; Latin codes are LTR islands. Wrap codes so
   they read cleanly — in Markdown, backticks (`` `VA01` ``) keep them as atomic LTR units.
3. **Numbers, versions, paths stay as-is** (`ECC 6.0`, `S/4HANA 2023`, `OSS Note 1234567`).
4. **Define the term once in Hebrew, then use the code.** First mention: `הזמנת מכר (Sales Order) — ...`,
   afterwards just `VA01` / `VBAK`.
5. **Don't machine-translate menu paths or field labels** the user will see on a real (often English)
   system — give the Hebrew meaning *and* the literal label: `הנתיב ב-SPRO:  Sales and Distribution → ...`.

## Structure of a Hebrew note
```
## <נושא בעברית>  (English term)
הסבר קצר בעברית — מה זה ולמה זה חשוב.

נקודות מפתח:
- ...
- ...

מונחים:
- הזמנת מכר (Sales Order) — בקשת לקוח לאספקת טובין. יצירה: `VA01`, טבלה `VBAK`.
```

## Quick check
- Could a learner copy every code/command straight onto a real system? If a token got translated, fix it.
- Is the connective prose actually Hebrew (not English with a few Hebrew words)? Write for a Hebrew reader.
