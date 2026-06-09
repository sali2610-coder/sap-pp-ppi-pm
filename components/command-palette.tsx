"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Table2, Terminal, Boxes, CornerDownLeft, ArrowLeft, BookText } from "lucide-react";
import { searchAll } from "@/lib/data";
import { lookupTCode } from "@/lib/tcode-index";
import type { Module } from "@/lib/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Highlight } from "@/components/highlight";
import { useI18n } from "@/lib/i18n";
import { playPing, playTick } from "@/lib/sound";

type FlatItem = { kind: "table" | "tcode" | "bapi" | "library"; label: string; sub: string; module: Module; href: string };

function ModuleTag({ m }: { m: Module }) {
  return (
    <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">{m}</span>
  );
}

export function CommandPalette() {
  const router = useRouter();
  const { t, pick } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

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
    if (open) playPing();
    else {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const results = useMemo(() => searchAll(q), [q]);
  const tcode = useMemo(() => lookupTCode(q), [q]);

  const GROUPS = [
    { kind: "table", title: t("search.tables"), icon: Table2 },
    { kind: "tcode", title: t("search.tcodes"), icon: Terminal },
    { kind: "bapi", title: t("search.bapis"), icon: Boxes },
    { kind: "library", title: t("search.library"), icon: BookText },
  ] as const;

  const flat = useMemo<FlatItem[]>(() => {
    const out: FlatItem[] = [];
    for (const tb of results.tables)
      out.push({ kind: "table", label: tb.tableName, sub: pick(tb.descriptionHe, tb.descriptionEn), module: tb.module, href: `/${tb.module === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(tb.tableName)}` });
    for (const c of results.tcodes) out.push({ kind: "tcode", label: c.code, sub: c.desc, module: c.module, href: c.href });
    for (const b of results.bapis) out.push({ kind: "bapi", label: b.name, sub: `${b.he} · ${b.tableName}`, module: b.module, href: b.href });
    for (const l of results.library) out.push({ kind: "library", label: l.id, sub: l.title, module: "PM", href: l.href });
    return out;
  }, [results, pick]);

  useEffect(() => setActive(0), [q]);

  function go(href: string) {
    playPing();
    setOpen(false);
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
      playTick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
      playTick();
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    }
  }

  let runningIndex = -1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden rounded-2xl p-0 glass shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Tables, T-Codes, Interfaces</DialogDescription>
        </VisuallyHidden>

        {/* input */}
        <div className="flex items-center gap-3 border-b border-border/60 px-5">
          <Search className="size-5 shrink-0 text-brand" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={t("search.placeholder")}
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-muted/70 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">ESC</kbd>
        </div>

        {/* T-Code intelligence pop-up card */}
        <AnimatePresence>
          {tcode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-border/60 bg-brand-soft/60"
            >
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="tech rounded-md bg-brand px-2 py-0.5 text-sm font-bold text-brand-foreground">{tcode.code}</span>
                    <ModuleTag m={tcode.module} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">{pick(tcode.descHe, tcode.descEn)}</p>
                  {tcode.tables.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t("tcode.usedBy")}:{" "}
                      <span className="tech font-semibold text-brand">{tcode.tables.join(", ")}</span>
                    </p>
                  )}
                </div>
                {tcode.tables.length > 0 && (
                  <button
                    onClick={() => go(tcode.href)}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark active:scale-95"
                  >
                    {t("tcode.viewTables")}
                    <ArrowLeft className="size-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {q.trim() === "" ? (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-10 text-center text-sm text-muted-foreground">
                {t("search.hint")}
              </motion.p>
            ) : flat.length === 0 ? (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-10 text-center text-sm text-muted-foreground">
                {t("search.empty")} — &quot;{q}&quot;
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
                            onClick={() => go(item.href)}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${isActive ? "bg-brand/10" : "hover:bg-muted/70"}`}
                          >
                            <span className={`tech shrink-0 text-sm font-bold ${item.kind === "table" ? "text-brand" : "text-foreground"}`}>
                              <Highlight text={item.label} query={q} />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                              <Highlight text={item.sub} query={q} />
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
            {t("search.nav")}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted/70 px-1">↵</kbd>
            {t("search.open")}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
