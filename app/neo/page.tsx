import Link from "next/link";
import { landingContent } from "@/components/neo-shell/nav-data";
import { NeoTableList } from "@/components/neo-shell/table-list";
import { modVar } from "@/components/neo-shell/mod-var";

export const metadata = {
  title: "Project NEO · שלב 1 — מעטפת וניווט",
  robots: { index: false, follow: false },
};

const nf = new Intl.NumberFormat("he-IL");

// STAGE 1. This surface exists to make the navigation reviewable, not to be the
// Home experience — that is Stage 2. It is deliberately calm: enough real
// content for the rail's counts, preview layer, context shelf and travelling
// indicator to mean something, and nothing more.
export default function NeoHome() {
  const c = landingContent();
  return (
    <>
      <header style={{ display: "grid", gap: "var(--sp-2)" }}>
        <span className="nx-eyebrow">Project NEO · שלב 1</span>
        <h1 className="nx-h1">מעטפת האפליקציה והניווט</h1>
        <p className="nx-lede">
          זהו שלב 1 של העיצוב המאושר: המעטפת והניווט בלבד, מחוברים לנתונים האמיתיים של הפרויקט.
          כל מספר בסרגל נגזר מאותו מקור שממנו נבנה העמוד המתאים לו. פריט שאין לו ספירה מגובה
          בנתונים מסומן בקו מפריד, ולא במספר משוער.
        </p>
      </header>

      <section className="nx-card nx-grid" aria-label="מספרי הפרויקט">
        {c.stats.map((s) => (
          <div key={s.label} className="nx-stat">
            <b>{nf.format(s.value)}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section aria-label="מודולים" className="nx-grid">
        {c.modules.map((m) => (
          <Link
            key={m.mod}
            prefetch={false}
            href={m.href}
            className="nx-card"
            style={{ "--m": modVar(m.mod), display: "grid", gap: "var(--sp-3)" } as React.CSSProperties}
          >
            {/* module hue — identity, on chrome only */}
            <span className="nx-modbar" aria-hidden="true" />
            <span style={{ display: "grid", gap: 2 }}>
              <b className="nx-h2">{m.label}</b>
              <span className="nx-muted">{m.he}</span>
            </span>
            <span style={{ display: "flex", gap: "var(--sp-5)" }}>
              {m.stats.map((s) => (
                <span key={s.label} className="nx-stat">
                  <b>{nf.format(s.value)}</b>
                  <span>{s.label}</span>
                </span>
              ))}
            </span>
          </Link>
        ))}
      </section>

      <section className="nx-card" aria-label="הטבלאות המתועדות ביותר" style={{ display: "grid", gap: "var(--sp-3)" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <h2 className="nx-h2">הטבלאות המתועדות ביותר</h2>
          <p className="nx-muted">
            בחירת שורה טוענת את ההקשר המלא שלה למדף שבסרגל — מודולים, טרנזקציות וקשרים עם ביטוי ה-JOIN.
            השורה גם נרשמת ברשימת האחרונים שהמוצר כבר מנהל, ולא ברשימה נפרדת.
          </p>
        </div>
        <NeoTableList rows={c.featured} />
        <div className="nx-legend" aria-label="מקרא מחלקות אובייקט">
          {c.legend.map((l) => (
            <span key={l.he} style={{ "--o": l.obj } as React.CSSProperties}>
              <i aria-hidden="true" />
              {l.he}
            </span>
          ))}
        </div>
      </section>

      <section className="nx-card" aria-label="מקלדת" style={{ display: "grid", gap: "var(--sp-2)" }}>
        <h2 className="nx-h2">מקלדת</h2>
        <div className="nx-kbdrow">
          <span><kbd>⌘K</kbd> חיפוש בניווט ובמילון</span>
          <span><kbd>⌘B</kbd> כיווץ והרחבת הסרגל</span>
          <span><kbd>↑</kbd> <kbd>↓</kbd> מעבר בין פריטי ניווט</span>
          <span><kbd>Home</kbd> <kbd>End</kbd> תחילת וסוף הרשימה</span>
          <span><kbd>Esc</kbd> סגירת חיפוש או מצב הקשר</span>
        </div>
      </section>
    </>
  );
}
