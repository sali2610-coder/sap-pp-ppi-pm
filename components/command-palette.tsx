"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Table2, Terminal, Boxes, CornerDownLeft } from "lucide-react";
import { searchAll } from "@/lib/data";
import type { Module } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type FlatItem =
  | { kind: "table"; label: string; sub: string; module: Module; href: string }
  | { kind: "tcode"; label: string; sub: string; module: Module; href: string }
  | { kind: "bapi"; label: string; sub: string; module: Module; href: string };

const GROUPS = [
  { kind: "table", title: "טבלאות (Tables Found)", icon: Table2 },
  { kind: "tcode", title: "טרנזקציות (T-Codes Found)", icon: Terminal },
  { kind: "bapi", title: "ממשקים (BAPIs Found)", icon: Boxes },
] as const;

function ModuleTag({ m }: { m: Module }) {
  return (
    <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
      {m}
    </span>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("neo:open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("neo:open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const results = useMemo(() => searchAll(q), [q]);

  const flat = useMemo<FlatItem[]>(() => {
    const out: FlatItem[] = [];
    for (const t of results.tables)
      out.push({ kind: "table", label: t.tableName, sub: t.descriptionHe, module: t.module, href: `/${t.module === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(t.tableName)}` });
    for (const c of results.tcodes)
      out.push({ kind: "tcode", label: c.code, sub: c.desc, module: c.module, href: c.href });
    for (const b of results.bapis)
      out.push({ kind: "bapi", label: b.name, sub: `${b.he} · ${b.tableName}`, module: b.module, href: b.href });
    return out;
  }, [results]);

  useEffect(() => setActive(0), [q]);

  function go(item: FlatItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  }

  let runningIndex = -1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden rounded-2xl p-0 glass">
        <VisuallyHidden>
          <DialogTitle>חיפוש מהיר</DialogTitle>
          <DialogDescription>חיפוש טבלאות, טרנזקציות וממשקים</DialogDescription>
        </VisuallyHidden>

        {/* input */}
        <div className="flex items-center gap-3 border-b border-border/60 px-5">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="חיפוש טבלה, T-Code, BAPI…"
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-muted/70 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        {/* results */}
        <div className="max-h-[55vh] overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {q.trim() === "" ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-10 text-center text-sm text-muted-foreground"
              >
                הקלד כדי לחפש בכל מסד הנתונים — 126 טבלאות, PM ו-PP-PI.
              </motion.p>
            ) : flat.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-10 text-center text-sm text-muted-foreground"
              >
                לא נמצאו תוצאות עבור &quot;{q}&quot;.
              </motion.p>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                {GROUPS.map(({ kind, title, icon: Icon }) => {
                  const items = flat.filter((f) => f.kind === kind);
                  if (!items.length) return null;
                  return (
                    <div key={kind} className="mb-1">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        <Icon className="size-3.5" />
                        {title}
                        <span className="text-muted-foreground/60">· {items.length}</span>
                      </div>
                      {items.map((item) => {
                        runningIndex++;
                        const idx = runningIndex;
                        const isActive = idx === active;
                        return (
                          <button
                            key={`${item.kind}-${item.label}-${idx}`}
                            onMouseEnter={() => setActive(idx)}
                            onClick={() => go(item)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${
                              isActive ? "bg-brand/10" : "hover:bg-muted/70"
                            }`}
                          >
                            <span
                              className={`tech shrink-0 text-sm font-bold ${
                                item.kind === "table" ? "text-brand" : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                              {item.sub}
                            </span>
                            <ModuleTag m={item.module} />
                            {isActive && <CornerDownLeft className="size-3.5 shrink-0 text-brand" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* footer hint */}
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-muted/70 px-1">↑</kbd>
            <kbd className="rounded border border-border bg-muted/70 px-1">↓</kbd>
            ניווט
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted/70 px-1">↵</kbd>
            פתח
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
