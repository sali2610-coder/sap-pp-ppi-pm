"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, GraduationCap } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { SiteLogo } from "@/components/site-logo";
import dynamic from "next/dynamic";
import { OmniSearch } from "@/components/omni-search";
// Non-critical shell UI — deferred so the dataset + search engine (pulled by the
// command palette) and floating helpers stay out of the shared layout chunk and
// off the first-paint / hydration path on every page. ssr:false: none render on
// first paint, all are interaction- or effect-triggered.
const CommandPalette = dynamic(() => import("@/components/command-palette").then((m) => m.CommandPalette), { ssr: false });
const FindHighlighter = dynamic(() => import("@/components/find-highlighter").then((m) => m.FindHighlighter), { ssr: false });
const OnboardingDrawer = dynamic(() => import("@/components/onboarding-drawer").then((m) => m.OnboardingDrawer), { ssr: false });
const PageHelp = dynamic(() => import("@/components/page-help").then((m) => m.PageHelp), { ssr: false });
const UXSettings = dynamic(() => import("@/components/ux-settings").then((m) => m.UXSettings), { ssr: false });
const Mentor = dynamic(() => import("@/components/mentor").then((m) => m.Mentor), { ssr: false });
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { WowToast } from "@/components/wow-toast";
import { Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import { LangSwitch } from "@/components/lang-switch";
import { playClick } from "@/lib/sound";

function NavLink({ href, children, exact, group }: { href: string; children: React.ReactNode; exact?: boolean; group: string }) {
  const path = usePathname() || "/";
  const active = exact ? path === href : path === href || path.startsWith(href);
  return (
    <Link href={href} onClick={() => playClick()} aria-current={active ? "page" : undefined}
      className={`relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors active:scale-95 ${active ? "text-brand" : "text-white/90 hover:bg-white/15 hover:text-white"}`}>
      {active && (
        <motion.span layoutId={`nav-active-${group}`} aria-hidden
          className="absolute inset-0 -z-10 rounded-lg bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }} />
      )}
      {children}
    </Link>
  );
}

function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-gradient-to-l from-brand-dark via-brand to-brand text-brand-foreground shadow-lg shadow-brand/25 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25">
      <div className="container-app flex flex-col gap-3 py-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]" onClick={() => playClick()}>
            <SiteLogo />
          </Link>
          <div className="xl:hidden">
            <LangSwitch />
          </div>
        </div>
        <div className="xl:flex xl:flex-1 xl:justify-center">
          <OmniSearch />
        </div>
        <nav aria-label="ניווט ראשי" className="hidden shrink-0 items-center gap-1 text-sm font-medium xl:flex">
          <NavLink href="/" exact group="d">{t("nav.home")}</NavLink>
          <NavLink href="/learn/" group="d"><GraduationCap className="size-3.5" />{t("nav.learn")}</NavLink>
          <NavLink href="/pm/" group="d">{t("nav.pm")}</NavLink>
          <NavLink href="/pp-pi/" group="d">{t("nav.ppi")}</NavLink>
          <NavLink href="/sap-infrastructure/" group="d">{t("nav.infra")}</NavLink>
          <NavLink href="/library/" group="d">{t("nav.library")}</NavLink>
          <NavLink href="/knowledge/" group="d"><BrainCircuit className="size-3.5" />{t("nav.knowledge")}</NavLink>
          <NavLink href="/chat/" group="d"><Sparkles className="size-3.5" />{t("nav.chat")}</NavLink>
          <div className="ms-2">
            <LangSwitch />
          </div>
        </nav>
      </div>
      {/* mobile/tablet navigation now lives in the bottom tab bar (thumb-reachable) */}
    </header>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  // No JS-gated opacity / exit-fade wrapper here. An AnimatePresence exit
  // animation can leave (or bfcache can restore) the page at opacity:0 on
  // browser BACK navigation → permanent white screen. Content must always
  // render visible. Per-page entrance polish lives inside each page, never
  // as a global reveal gate.
  return <main id="main" className="container-app flex-1 pt-6 pb-24 sm:pt-8 xl:pb-8">{children}</main>;
}

// Omnipresent search trigger — opens ⌘K palette from any page (bottom-start,
// opposite the UX-settings dock). Reinforces search as the portal entry point.
function SearchFab() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("neo:open-palette"))}
      aria-label="חיפוש (⌘K)"
      className="no-print group fixed bottom-5 start-5 z-40 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-bold text-brand-foreground shadow-xl shadow-brand/35 transition-transform hover:scale-105 active:scale-95">
      <Search className="size-5" />
      <span className="hidden sm:inline">חיפוש</span>
      <kbd className="hidden rounded border border-white/30 bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold sm:inline">⌘K</kbd>
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-bold focus:text-brand focus:shadow-lg">דלג לתוכן</a>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      {/* secondary floating actions — desktop only; on phone/tablet they live in the bottom tab bar / "עוד" sheet */}
      <div className="max-xl:hidden">
        <SearchFab />
        <PageHelp />
        <UXSettings />
      </div>
      {/* always-mounted (modal/effect; opened via events from the tab bar on mobile) */}
      <CommandPalette />
      <FindHighlighter />
      <OnboardingDrawer />
      <Mentor />
      <WowToast />
      <MobileTabBar />
    </I18nProvider>
  );
}
