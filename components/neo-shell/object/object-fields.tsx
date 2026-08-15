"use client";

// Project NEO · the object's FIELDS.
//
// The brief on this section is specific: "Primary Key must be obvious. Foreign
// Key must be obvious. Critical fields must be easy to scan." The previous table
// answered none of the three — the key column was SIXTH of seven, its badge was
// a 10px outline, and a 40-row table had no way to get to the four rows that
// matter. Three changes, in that order of importance:
//
//   1  THE KEY BAND. Before the table, the primary key is spelled out in full:
//      every PK field with its Hebrew name and its type, in blueprint order, as
//      the compound key it actually is. The foreign keys follow. This is the
//      answer to "obvious" — the keys are read before the table, not found in
//      it. Both lists come from ErdNode.pk / .fk, which are the blueprint's own
//      `key` column, so nothing here is inferred from a field name.
//   2  THE KEY COLUMN MOVED FIRST and the badge became a real one: PK is
//      filled in the OBJECT hue (the object palette is allowed solid form), FK
//      is the same badge outlined and dashed. A key row also carries a leading
//      EDGE, which is what makes the table scannable at a glance rather than
//      readable cell by cell.
//   3  A SCOPE. .nu-filter toggles between all fields, keys only, PK only and
//      FK only. It is a real filter over real rows and the count next to each
//      option is computed from the rows on screen, so it can never claim a
//      subset the table does not hold.
//
// COLOUR FORM RULE: OBJECT hue (--o) is the data's own class and is allowed the
// solid/dot form; it carries PK. MODULE hue (--m) stays a line/tint and carries
// the per-module marker. STATUS never appears in this file.

import { useMemo, useState } from "react";
import { KeyRound, Link2 } from "lucide-react";
import type { FieldRow } from "./object-data";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

type Scope = "all" | "keys" | "pk" | "fk";

const isPk = (f: FieldRow) => f.key === "PK";
const isFk = (f: FieldRow) => f.key === "FK";

export function ObjectFields({ fields, name }: { fields: FieldRow[]; name: string }) {
  const [scope, setScope] = useState<Scope>("all");

  const counts = useMemo(
    () => ({
      all: fields.length,
      keys: fields.filter((f) => isPk(f) || isFk(f)).length,
      pk: fields.filter(isPk).length,
      fk: fields.filter(isFk).length,
    }),
    [fields],
  );

  const rows = useMemo(() => {
    switch (scope) {
      case "keys": return fields.filter((f) => isPk(f) || isFk(f));
      case "pk": return fields.filter(isPk);
      case "fk": return fields.filter(isFk);
      default: return fields;
    }
  }, [fields, scope]);

  const pk = fields.filter(isPk);
  const fk = fields.filter(isFk);

  const SCOPES: { k: Scope; he: string; n: number }[] = [
    { k: "all", he: "כל השדות", n: counts.all },
    { k: "keys", he: "שדות מפתח בלבד", n: counts.keys },
    { k: "pk", he: "מפתח ראשי", n: counts.pk },
    { k: "fk", he: "מפתח זר", n: counts.fk },
  ];

  return (
    <div className="no-fields">
      {/* ==================================================== 1 · the keys */}
      <div className="no-keys">
        <section className="no-keyg" data-k="PK">
          <h4>
            <KeyRound size={14} strokeWidth={2} aria-hidden="true" />
            מפתח ראשי
            <em className="nx-sap">{nf.format(pk.length)}</em>
          </h4>
          {pk.length ? (
            <ol className="no-keyl">
              {pk.map((f, i) => (
                <li key={f.tech}>
                  <span className="no-keyn nx-sap" aria-hidden="true">{i + 1}</span>
                  <b className="nx-sap">{f.tech}</b>
                  <span>{f.he || f.en || "—"}</span>
                  <em className="nx-sap">{[f.dt, f.len].filter(Boolean).join(" ") || "—"}</em>
                </li>
              ))}
            </ol>
          ) : (
            <p className="no-none">
              המילון אינו מסמן שדה מפתח ראשי ל־{name}. זה מצב של המקור, ולא נגזר משם השדה.
            </p>
          )}
        </section>

        <section className="no-keyg" data-k="FK">
          <h4>
            <Link2 size={14} strokeWidth={2} aria-hidden="true" />
            מפתחות זרים
            <em className="nx-sap">{nf.format(fk.length)}</em>
          </h4>
          {fk.length ? (
            <ol className="no-keyl">
              {fk.map((f, i) => (
                <li key={f.tech}>
                  <span className="no-keyn nx-sap" aria-hidden="true">{i + 1}</span>
                  <b className="nx-sap">{f.tech}</b>
                  <span>{f.he || f.en || "—"}</span>
                  <em className="nx-sap">{[f.dt, f.len].filter(Boolean).join(" ") || "—"}</em>
                </li>
              ))}
            </ol>
          ) : (
            <p className="no-none">המילון אינו מסמן שדה מפתח זר לטבלה הזאת.</p>
          )}
        </section>
      </div>

      {/* =================================================== 2 · the scope */}
      <div className="no-scope" role="group" aria-label="סינון השדות">
        {SCOPES.map((s) => (
          <button
            key={s.k}
            type="button"
            className="nu-filter"
            aria-pressed={scope === s.k}
            data-on={scope === s.k ? "1" : undefined}
            disabled={s.n === 0}
            onClick={() => setScope(s.k)}
          >
            {s.he}
            <em className="nx-sap">{nf.format(s.n)}</em>
          </button>
        ))}
      </div>

      {/* =================================================== 3 · the table */}
      <div className="no-tw">
        <table className="no-table">
          <caption className="no-cap">
            איחוד השדות שכל תכנון מתעד לטבלה, בסדר שנכתב. עמודת המודול מראה מי תיעד את השדה — שדה שתועד
            במודול אחד בלבד נשמר ומסומן ככזה. מוצגים {nf.format(rows.length)} מתוך {nf.format(fields.length)}.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="no-c-k">מפתח</th>
              <th scope="col">שדה</th>
              <th scope="col">תיאור</th>
              <th scope="col">EN</th>
              <th scope="col">טיפוס</th>
              <th scope="col">אורך</th>
              <th scope="col">מודול</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.tech} data-key={isPk(f) || isFk(f) ? f.key : ""}>
                <td className="no-c-k" data-l="מפתח">
                  {isPk(f) || isFk(f) ? (
                    <span className="no-key" data-k={f.key}>{f.key}</span>
                  ) : (
                    <span className="no-dim">—</span>
                  )}
                </td>
                <th scope="row" className="nx-sap" data-l="שדה">{f.tech}</th>
                <td data-l="תיאור">{f.he || "—"}</td>
                <td className="nx-sap no-dim" data-l="EN">{f.en || "—"}</td>
                <td className="nx-sap" data-l="טיפוס">{f.dt || "—"}</td>
                <td className="nx-sap" data-l="אורך">{f.len || "—"}</td>
                <td data-l="מודול">
                  <span className="no-modtag">
                    {f.mods.map((m) => (
                      <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
