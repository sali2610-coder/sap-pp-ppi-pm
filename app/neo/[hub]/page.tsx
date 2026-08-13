import { HUB_META, NEO_HUBS, hubContent } from "@/components/neo-shell/nav-data";
import { NeoTableList } from "@/components/neo-shell/table-list";
import { modVar } from "@/components/neo-shell/mod-var";

// One route generates every navigation destination in the namespace. That is
// not a shortcut: scripts/crawl-dead-links.mjs exits 1 on any internal href in
// out/ with no generated page, so deriving the params from the SAME list the
// rail is built from (NEO_HUBS) makes a dead nav link structurally impossible.
export const dynamicParams = false;

export function generateStaticParams() {
  return NEO_HUBS.map((hub) => ({ hub }));
}

export async function generateMetadata({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params;
  const meta = HUB_META()[hub];
  return {
    title: `${meta?.label ?? "NEO"} · Project NEO`,
    robots: { index: false, follow: false },
  };
}

const nf = new Intl.NumberFormat("he-IL");

// Deliberately simple. These pages exist so the navigation can be exercised —
// the active indicator travelling between module hues, the preview layer, the
// context shelf — not to be the finished destinations.
export default async function NeoHub({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params;
  const c = hubContent(hub);

  return (
    <>
      <header
        style={{ display: "grid", gap: "var(--sp-2)", ...(c.mod ? { "--m": modVar(c.mod) } : {}) } as React.CSSProperties}
      >
        {c.mod ? <span className="nx-modbar" aria-hidden="true" /> : null}
        <span className="nx-eyebrow">{c.group}</span>
        <h1 className="nx-h1">{c.label}</h1>
        <p className="nx-lede">{c.lede}</p>
      </header>

      {c.stats.length ? (
        <section className="nx-card nx-grid" aria-label="מספרים">
          {c.stats.map((s) => (
            <div key={s.label} className="nx-stat">
              <b>{nf.format(s.value)}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </section>
      ) : null}

      {c.tables.length ? (
        <section className="nx-card" aria-label="טבלאות" style={{ display: "grid", gap: "var(--sp-3)" }}>
          <h2 className="nx-h2">טבלאות</h2>
          <NeoTableList rows={c.tables} />
        </section>
      ) : null}

      {c.list.length ? (
        <section className="nx-card" aria-label={c.listTitle} style={{ display: "grid", gap: "var(--sp-3)" }}>
          <h2 className="nx-h2">{c.listTitle}</h2>
          <ul style={{ display: "grid", gap: "var(--sp-2)" }}>
            {c.list.map((r) => (
              <li key={r.t} style={{ display: "grid", gap: 2, fontSize: "var(--t-xs)" }}>
                <b className={r.m ? "nx-sap" : undefined} style={{ color: "var(--ink-1)" }}>{r.t}</b>
                <span className="nx-muted">{r.s}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
