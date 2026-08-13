import { HUB_META, NEO_HUBS, hubContent } from "@/components/neo-shell/nav-data";
import { NeoTableList } from "@/components/neo-shell/table-list";
import { modVar } from "@/components/neo-shell/mod-var";
import { ModuleWorkspace } from "@/components/neo-shell/workspace/module-workspace";
import { workspaceData } from "@/components/neo-shell/workspace/workspace-data";
import "../workspace.css";

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

// STAGE 2B. The two MODULE routes — /neo/pm/ and /neo/pp-pi/ — are real
// workspaces now. Their content is built on the server by components/neo-shell/
// workspace/workspace-data.ts and handed to a client shell as one plain
// serialisable object, so the SAP datasets stay above the client boundary
// exactly as they do on Home.
//
// Every other hub keeps the Stage-1 frame below. Those destinations exist so
// the navigation can be exercised — the active indicator travelling between
// module hues, the preview layer, the context shelf — and they say so.
export default async function NeoHub({ params }: { params: Promise<{ hub: string }> }) {
  const { hub } = await params;
  const meta = HUB_META()[hub];

  if (meta?.mod) return <ModuleWorkspace data={workspaceData(meta.mod)} />;

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
