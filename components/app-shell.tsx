"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { SiteLogo } from "@/components/site-logo";
import { OmniSearch } from "@/components/omni-search";
import { CommandPalette } from "@/components/command-palette";
import { UXSettings } from "@/components/ux-settings";
import { Footer } from "@/components/Footer";
import { LangSwitch } from "@/components/lang-switch";
import { playClick } from "@/lib/sound";

function NavLink({ href, children, exact }: { href: string; children: React.ReactNode; exact?: boolean }) {
  const path = usePathname() || "/";
  const active = exact ? path === href : path === href || path.startsWith(href);
  return (
    <Link href={href} onClick={() => playClick()}
      className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all active:scale-95 ${active ? "bg-white text-brand shadow-sm" : "hover:bg-white/15"}`}>
      {children}
    </Link>
  );
}

function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-l from-brand-dark via-brand to-brand text-brand-foreground shadow-lg shadow-brand/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]" onClick={() => playClick()}>
            <SiteLogo />
          </Link>
          <div className="lg:hidden">
            <LangSwitch />
          </div>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-center">
          <OmniSearch />
        </div>
        <nav aria-label="ניווט ראשי" className="hidden shrink-0 items-center gap-1 text-sm font-medium lg:flex">
          <NavLink href="/" exact>{t("nav.home")}</NavLink>
          <NavLink href="/pm/">{t("nav.pm")}</NavLink>
          <NavLink href="/pp-pi/">{t("nav.ppi")}</NavLink>
          <NavLink href="/sap-infrastructure/">{t("nav.infra")}</NavLink>
          <NavLink href="/library/">{t("nav.library")}</NavLink>
          <NavLink href="/chat/"><Sparkles className="size-3.5" />{t("nav.chat")}</NavLink>
          <div className="ms-2">
            <LangSwitch />
          </div>
        </nav>
      </div>
      <nav aria-label="ניווט נייד" className="flex items-center gap-1.5 overflow-x-auto px-4 pb-2.5 text-sm font-medium lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <NavLink href="/" exact>{t("nav.home")}</NavLink>
        <NavLink href="/pm/">{t("nav.pm")}</NavLink>
        <NavLink href="/pp-pi/">{t("nav.ppi")}</NavLink>
        <NavLink href="/sap-infrastructure/">{t("nav.infra")}</NavLink>
        <NavLink href="/library/">{t("nav.library")}</NavLink>
        <NavLink href="/chat/"><Sparkles className="size-3.5" />{t("nav.chat")}</NavLink>
      </nav>
    </header>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>;
  return (
    <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div key={path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-brand focus:shadow-lg">דלג לתוכן</a>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <CommandPalette />
      <UXSettings />
    </I18nProvider>
  );
}
